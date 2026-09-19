import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'drug_reference_db.json');
const USERDATA_FILE = path.join(DATA_DIR, 'drug_user_userdata.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory rate limiting map: ip/userId -> timestamps[]
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120;

export class DrugService {
  static DB_FILE = DB_FILE;
  static USERDATA_FILE = USERDATA_FILE;

  /**
   * Load the normalized drug reference database
   */
  static loadDb() {
    const dbFile = this.DB_FILE || DB_FILE;
    let db = {
      generics: [],
      brands: [],
      manufacturers: [],
      therapeuticClasses: [],
      interactions: [],
      guidelines: [],
      investigations: [],
      comparisons: [],
      dosageForms: [],
      importJobs: [],
      auditLogs: [],
      reportedCorrections: []
    };
    try {
      if (fs.existsSync(dbFile)) {
        db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load drug_reference_db.json, defaulting to empty structure', e);
    }
    // Schema migration checks
    if (!Array.isArray(db.dosageForms)) db.dosageForms = [];
    if (!Array.isArray(db.importJobs)) db.importJobs = [];
    if (!Array.isArray(db.auditLogs)) db.auditLogs = [];
    if (!Array.isArray(db.reportedCorrections)) db.reportedCorrections = [];
    return db;
  }

  /**
   * Save database changes (governance, approved revisions)
   */
  static saveDb(db) {
    try {
      const dbFile = this.DB_FILE || DB_FILE;
      fs.writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save drug reference database', e);
      return false;
    }
  }

  /**
   * Load persistent user data (bookmarks, private notes, recent views, submitted reports)
   */
  static loadUserData() {
    try {
      if (fs.existsSync(USERDATA_FILE)) {
        return JSON.parse(fs.readFileSync(USERDATA_FILE, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load drug_user_userdata.json', e);
    }
    return {
      bookmarks: {}, // userId -> { generics: string[], brands: string[] }
      notes: {}, // userId -> { [drugId: string]: { note: string, updatedAt: string } }
      recentDrugs: {}, // userId -> Array<{ id: string, type: 'generic'|'brand', name: string, viewedAt: string }>
      reportedCorrections: []
    };
  }

  static saveUserData(data) {
    try {
      fs.writeFileSync(USERDATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save drug user data', e);
      return false;
    }
  }

  /**
   * Rate limiting helper
   */
  static checkRateLimit(clientId) {
    const now = Date.now();
    const timestamps = rateLimitMap.get(clientId) || [];
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }
    valid.push(now);
    rateLimitMap.set(clientId, valid);
    return true;
  }

  /**
   * Levenshtein distance calculation for typo tolerance
   */
  static levenshteinDistance(s1, s2) {
    const a = s1.toLowerCase();
    const b = s2.toLowerCase();
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Comprehensive Server-Side Search with typo tolerance, suggestions, highlighting, and pagination
   */
  /**
   * Comprehensive Server-Side Search with typo tolerance, suggestions, highlighting, and pagination
   */
  static searchDrugs({
    query = '',
    filterType = 'all', // 'all' | 'generic' | 'brand' | 'class' | 'indication' | 'manufacturer'
    therapeuticClass = '',
    indication = '',
    manufacturerId = '',
    letter = '',
    dosageForm = '',
    strength = '',
    prescriptionStatus = '',
    activeStatus = '',
    page = 1,
    limit = 15
  }) {
    const db = this.loadDb();
    const q = query.trim().toLowerCase();
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, Math.min(50, parseInt(limit, 10) || 15));

    let matchedGenerics = [...(db.generics || [])];
    let matchedBrands = [...(db.brands || [])];
    let matchedManufacturers = [...(db.manufacturers || [])];
    let matchedClasses = [...(db.therapeuticClasses || [])];

    // Filter by class if provided
    if (therapeuticClass && therapeuticClass !== 'all') {
      const tc = therapeuticClass.toLowerCase();
      matchedGenerics = matchedGenerics.filter(g =>
        g.therapeuticClassId?.toLowerCase() === tc ||
        g.therapeuticClass?.toLowerCase().includes(tc) ||
        g.pharmacologicalClass?.toLowerCase().includes(tc)
      );
      const allowedGenericIds = new Set(matchedGenerics.map(g => g.id));
      matchedBrands = matchedBrands.filter(b => allowedGenericIds.has(b.genericId));
    }

    // Filter by manufacturer if provided
    if (manufacturerId && manufacturerId !== 'all') {
      const mId = manufacturerId.toLowerCase();
      matchedBrands = matchedBrands.filter(b => b.manufacturerId?.toLowerCase() === mId);
    }

    // Filter by indication if provided
    if (indication && indication !== 'all') {
      const ind = indication.toLowerCase();
      matchedGenerics = matchedGenerics.filter(g =>
        g.indications?.some(i => i.name.toLowerCase().includes(ind) || i.id.toLowerCase() === ind)
      );
      const allowedGenericIds = new Set(matchedGenerics.map(g => g.id));
      matchedBrands = matchedBrands.filter(b => allowedGenericIds.has(b.genericId));
    }

    // Filter by A-Z letter if provided
    if (letter && letter !== 'all' && letter.length === 1) {
      const l = letter.toUpperCase();
      matchedBrands = matchedBrands.filter(b => (b.brandName || '').trim().toUpperCase().startsWith(l));
      matchedGenerics = matchedGenerics.filter(g => (g.name || '').trim().toUpperCase().startsWith(l));
    }

    // Filter by dosage form if provided
    if (dosageForm && dosageForm !== 'all') {
      const df = dosageForm.toLowerCase();
      matchedBrands = matchedBrands.filter(b => (b.dosageForm || '').toLowerCase().includes(df));
    }

    // Filter by strength if provided
    if (strength && strength !== 'all') {
      const strClean = strength.toLowerCase();
      matchedBrands = matchedBrands.filter(b => (b.strength || '').toLowerCase().includes(strClean));
    }

    // Filter by prescription status if provided
    if (prescriptionStatus && prescriptionStatus !== 'all') {
      const ps = prescriptionStatus.toLowerCase();
      const genericMap = new Map((db.generics || []).map(g => [g.id, g]));
      matchedBrands = matchedBrands.filter(b => {
        const brandPs = (b.prescriptionStatus || '').toLowerCase();
        const gen = genericMap.get(b.genericId);
        const genPs = (gen?.prescriptionStatus || '').toLowerCase();
        const effectivePs = brandPs || genPs;
        return effectivePs === ps;
      });
    }

    // Filter by active status
    if (activeStatus && activeStatus !== 'all') {
      matchedBrands = matchedBrands.filter(b => (b.availability || 'widely_available').toLowerCase() === activeStatus.toLowerCase());
    }

    let suggestions = [];

    if (q) {
      const tokens = q.split(/\s+/).filter(Boolean);

      // Generic matching score
      matchedGenerics = matchedGenerics.map(g => {
        let score = 0;
        const gId = (g.id || '').toLowerCase();
        const gNorm = (g.normalizedName || '').toLowerCase();
        const gNormClean = gNorm.replace(/[-+]/g, ' ');
        const gName = g.name.toLowerCase();
        const gBn = (g.nameBn || '').toLowerCase();
        const pClass = (g.pharmacologicalClass || '').toLowerCase();
        const tClass = (g.therapeuticClass || '').toLowerCase();
        const atc = (g.atcCode || '').toLowerCase();
        const indNames = (g.indications || []).map(i => i.name.toLowerCase()).join(' ');

        tokens.forEach(tok => {
          const tokClean = tok.replace(/[-+]/g, ' ');
          if (gId === tok || gName === tok || gNorm === tok) score += 100;
          else if (gId.includes(tok) || gName.startsWith(tok) || gNormClean.includes(tokClean)) score += 50;
          else if (gName.includes(tok) || gNormClean.includes(tok)) score += 30;

          if (gBn.includes(tok)) score += 50;
          if (atc === tok) score += 80;
          if (pClass.includes(tok)) score += 25;
          if (tClass.includes(tok)) score += 20;
          if (indNames.includes(tok)) score += 15;

          // Fuzzy match for minor typos (length > 4)
          if (tok.length > 4) {
            const dist = this.levenshteinDistance(gName, tok);
            if (dist <= 2) {
              score += 20;
              if (!suggestions.includes(g.name)) suggestions.push(g.name);
            }
          }
        });

        return { item: g, score };
      }).filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.item);

      // Brand matching score
      matchedBrands = matchedBrands.map(b => {
        let score = 0;
        const bName = b.brandName.toLowerCase();
        const bBn = (b.brandNameBn || '').toLowerCase();
        const gId = (b.genericId || '').toLowerCase();
        const mName = (b.manufacturerName || '').toLowerCase();
        const bStrength = (b.strength || '').toLowerCase();
        const form = (b.dosageForm || '').toLowerCase();

        tokens.forEach(tok => {
          if (bName === tok) score += 100;
          else if (bName.startsWith(tok)) score += 60;
          else if (bName.includes(tok)) score += 35;

          if (bBn.includes(tok)) score += 50;
          if (gId.includes(tok)) score += 40;
          if (mName.includes(tok)) score += 20;
          if (bStrength.includes(tok)) score += 15;
          if (form.includes(tok)) score += 15;

          if (tok.length > 4) {
            const dist = this.levenshteinDistance(bName, tok);
            if (dist <= 2) {
              score += 20;
              if (!suggestions.includes(b.brandName)) suggestions.push(b.brandName);
            }
          }
        });

        return { item: b, score };
      }).filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.item);

      matchedManufacturers = matchedManufacturers.filter(m =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.shortName || '').toLowerCase().includes(q) ||
        (m.nameBn && m.nameBn.includes(q))
      );

      matchedClasses = matchedClasses.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.nameBn && c.nameBn.includes(q)) ||
        c.subclasses?.some(s => s.toLowerCase().includes(q))
      );
    }

    // Apply filterType
    if (filterType === 'generic') {
      matchedBrands = [];
      matchedManufacturers = [];
      matchedClasses = [];
    } else if (filterType === 'brand') {
      matchedGenerics = [];
      matchedManufacturers = [];
      matchedClasses = [];
    } else if (filterType === 'class') {
      matchedGenerics = [];
      matchedBrands = [];
      matchedManufacturers = [];
    } else if (filterType === 'manufacturer') {
      matchedGenerics = [];
      matchedBrands = [];
      matchedClasses = [];
    }

    // Paginate results (Generics take precedence in clinical reference, followed by brands)
    const totalGenerics = matchedGenerics.length;
    const totalBrands = matchedBrands.length;
    const totalResults = totalGenerics + totalBrands + matchedManufacturers.length + matchedClasses.length;

    const startIndex = (pageNum - 1) * pageSize;
    const paginatedGenerics = matchedGenerics.slice(startIndex, startIndex + pageSize);
    const genericLookup = new Map((db.generics || []).map(g => [g.id, g]));
    const paginatedBrands = matchedBrands.slice(startIndex, startIndex + pageSize).map(b => {
      const gen = genericLookup.get(b.genericId);
      return {
        ...b,
        prescriptionStatus: b.prescriptionStatus || gen?.prescriptionStatus || 'POM'
      };
    });

    return {
      query,
      filter: { letter, dosageForm, strength, prescriptionStatus, activeStatus, therapeuticClass, manufacturerId },
      pagination: {
        page: pageNum,
        limit: pageSize,
        totalResults,
        totalGenerics,
        totalBrands,
        totalPages: Math.max(1, Math.ceil(Math.max(totalGenerics, totalBrands) / pageSize))
      },
      suggestions: suggestions.slice(0, 5),
      results: {
        generics: paginatedGenerics,
        brands: paginatedBrands,
        manufacturers: matchedManufacturers.slice(0, 10),
        classes: matchedClasses.slice(0, 10)
      }
    };
  }

  /**
   * Get single generic by ID or slug
   */
  static getGenericBySlug(slug) {
    if (!slug) return null;
    const db = this.loadDb();
    const s = slug.trim().toLowerCase();
    return (db.generics || []).find(g => g.id.toLowerCase() === s || g.normalizedName?.toLowerCase() === s) || null;
  }

  /**
   * Get verified brands for a specific generic
   */
  static getBrandsForGeneric(genericSlug) {
    if (!genericSlug) return [];
    const db = this.loadDb();
    const s = genericSlug.trim().toLowerCase();
    return (db.brands || []).filter(b => b.genericId.toLowerCase() === s);
  }

  /**
   * Get single brand by ID or slug
   */
  static getBrandBySlug(slug) {
    if (!slug) return null;
    const db = this.loadDb();
    const s = slug.trim().toLowerCase();
    const brand = (db.brands || []).find(b => b.id.toLowerCase() === s);
    if (!brand) return null;

    // Attach generic details summary
    const generic = (db.generics || []).find(g => g.id.toLowerCase() === brand.genericId.toLowerCase());
    return {
      ...brand,
      genericDetails: generic ? {
        id: generic.id,
        name: generic.name,
        nameBn: generic.nameBn,
        pharmacologicalClass: generic.pharmacologicalClass,
        therapeuticClass: generic.therapeuticClass,
        atcCode: generic.atcCode,
        prescriptionStatus: generic.prescriptionStatus,
        bmdcCurriculumPhase: generic.bmdcCurriculumPhase
      } : null
    };
  }

  /**
   * Safe Multi-Drug Interaction Checker
   * Deduplicates brand inputs so Napa + Ace flags duplicate ingredient rather than false interaction.
   * Returns symmetric evaluations with severity and mandatory negative disclaimer.
   */
  static checkInteractions(genericOrBrandIds = []) {
    const db = this.loadDb();
    const genericsList = db.generics || [];
    const brandsList = db.brands || [];
    const interactionsList = db.interactions || [];

    // Resolve brand IDs to generic IDs
    const resolvedGenericMap = new Map(); // genericId -> Array<inputName>
    const duplicateBrandWarnings = [];

    genericOrBrandIds.forEach(id => {
      const clean = id.trim().toLowerCase();
      // Check if it matches a brand
      const brand = brandsList.find(b => b.id.toLowerCase() === clean || b.brandName.toLowerCase() === clean);
      if (brand) {
        const gId = brand.genericId.toLowerCase();
        if (!resolvedGenericMap.has(gId)) {
          resolvedGenericMap.set(gId, []);
        }
        resolvedGenericMap.get(gId).push(brand.brandName);
      } else {
        // Assume generic ID
        const gen = genericsList.find(g => g.id.toLowerCase() === clean || g.normalizedName?.toLowerCase() === clean);
        const targetId = gen ? gen.id.toLowerCase() : clean;
        if (!resolvedGenericMap.has(targetId)) {
          resolvedGenericMap.set(targetId, []);
        }
        resolvedGenericMap.get(targetId).push(gen ? gen.name : id);
      }
    });

    // Check for duplicate therapy (multiple brands of the same generic)
    for (const [genId, names] of resolvedGenericMap.entries()) {
      if (names.length > 1) {
        const genObj = genericsList.find(g => g.id.toLowerCase() === genId);
        duplicateBrandWarnings.push({
          genericId: genId,
          genericName: genObj ? genObj.name : genId,
          selectedBrands: names,
          message: `Duplicate active ingredient alert: "${names.join('" and "')}" both contain ${genObj ? genObj.name : genId}. Concomitant use risks accidental cumulative overdose.`
        });
      }
    }

    const uniqueGenericIds = Array.from(resolvedGenericMap.keys());
    const matchedInteractions = [];

    // Pairwise symmetric evaluation
    for (let i = 0; i < uniqueGenericIds.length; i++) {
      for (let j = i + 1; j < uniqueGenericIds.length; j++) {
        const idA = uniqueGenericIds[i];
        const idB = uniqueGenericIds[j];

        const match = interactionsList.find(item =>
          (item.genericA.toLowerCase() === idA && item.genericB.toLowerCase() === idB) ||
          (item.genericA.toLowerCase() === idB && item.genericB.toLowerCase() === idA)
        );

        if (match) {
          matchedInteractions.push({
            ...match,
            resolvedGenericAName: genericsList.find(g => g.id.toLowerCase() === match.genericA.toLowerCase())?.name || match.genericA,
            resolvedGenericBName: genericsList.find(g => g.id.toLowerCase() === match.genericB.toLowerCase())?.name || match.genericB
          });
        }
      }
    }

    const mandatoryDisclaimer = 'No verified interaction was found in the available database. This does NOT prove that no interaction exists.';

    return {
      evaluatedGenericsCount: uniqueGenericIds.length,
      evaluatedGenericIds: uniqueGenericIds,
      hasInteractions: matchedInteractions.length > 0,
      hasDuplicateTherapy: duplicateBrandWarnings.length > 0,
      duplicateBrandWarnings,
      interactions: matchedInteractions,
      disclaimer: mandatoryDisclaimer,
      checkedAt: new Date().toISOString()
    };
  }

  /**
   * Drug-Class Comparison Matrix Generator (2 to 4 generics)
   */
  static compareDrugs(genericIds = []) {
    if (!Array.isArray(genericIds) || genericIds.length < 2) {
      throw new Error('Please select between 2 and 4 generic medicines to compare.');
    }
    if (genericIds.length > 4) {
      throw new Error('Maximum 4 generic medicines can be compared simultaneously.');
    }

    const db = this.loadDb();
    const cleanIds = genericIds.map(id => id.trim().toLowerCase());
    const generics = cleanIds.map(id => (db.generics || []).find(g => g.id.toLowerCase() === id || g.normalizedName?.toLowerCase() === id)).filter(Boolean);

    if (generics.length < 2) {
      throw new Error('Could not find enough verified generic records for the requested comparison.');
    }

    // Check if preconfigured comparison exists
    const preconfigured = (db.comparisons || []).find(comp => {
      const setA = new Set(comp.genericIds.map(id => id.toLowerCase()));
      const setB = new Set(cleanIds);
      if (setA.size !== setB.size) return false;
      for (const a of setA) if (!setB.has(a)) return false;
      return true;
    });

    return {
      comparedGenerics: generics,
      preconfiguredComparison: preconfigured || null,
      matrixRows: [
        { label: 'Pharmacological Class', key: 'pharmacologicalClass', values: generics.map(g => g.pharmacologicalClass) },
        { label: 'Therapeutic Class', key: 'therapeuticClass', values: generics.map(g => g.therapeuticClass) },
        { label: 'ATC Code', key: 'atcCode', values: generics.map(g => g.atcCode || 'Unassigned') },
        { label: 'Mechanism of Action', key: 'mechanismOfAction', values: generics.map(g => g.mechanismOfAction) },
        { label: 'Primary Target / Receptor', key: 'receptorOrTarget', values: generics.map(g => g.receptorOrTarget) },
        { label: 'Common Indications', key: 'indications', values: generics.map(g => (g.indications || []).map(i => i.name).join('; ')) },
        { label: 'Administration Routes', key: 'routes', values: generics.map(g => (g.dosageGuidance?.routes || []).join(', ')) },
        { label: 'Common Adverse Effects', key: 'adverseCommon', values: generics.map(g => (g.adverseEffects?.common || []).join(', ')) },
        { label: 'Serious Warnings / Black Box', key: 'seriousWarnings', values: generics.map(g => (g.adverseEffects?.seriousWarnings || []).join(' ')) },
        { label: 'Pregnancy Category & Safety', key: 'pregnancyInfo', values: generics.map(g => `${g.pregnancyInfo?.category || 'Not specified'}: ${g.pregnancyInfo?.details || ''}`) },
        { label: 'Breastfeeding Safety', key: 'breastfeedingInfo', values: generics.map(g => `${g.breastfeedingInfo?.safety?.toUpperCase() || ''}: ${g.breastfeedingInfo?.details || ''}`) },
        { label: 'Renal Dose Adjustments', key: 'renal', values: generics.map(g => g.doseAdjustment?.renal || 'None specified') },
        { label: 'Hepatic Considerations', key: 'hepatic', values: generics.map(g => g.doseAdjustment?.hepatic || 'None specified') },
        { label: 'Mandatory Lab Monitoring', key: 'monitoring', values: generics.map(g => (g.monitoringRequirements || []).map(m => `${m.parameter} (${m.frequency})`).join('; ')) }
      ]
    };
  }

  /**
   * Therapeutic classes list
   */
  static getTherapeuticClasses() {
    const db = this.loadDb();
    const classes = db.therapeuticClasses || [];
    const generics = db.generics || [];
    const brands = db.brands || [];

    return classes.map(c => {
      const classGenerics = generics.filter(g => g.therapeuticClassId === c.id || g.therapeuticClass === c.name);
      const genIds = new Set(classGenerics.map(g => g.id));
      const classBrands = brands.filter(b => genIds.has(b.genericId));
      return {
        ...c,
        totalGenerics: classGenerics.length,
        totalBrands: classBrands.length
      };
    });
  }

  /**
   * Clinical Guidelines list
   */
  static getGuidelines() {
    const db = this.loadDb();
    return db.guidelines || [];
  }

  /**
   * Clinical Investigations list
   */
  static getInvestigations() {
    const db = this.loadDb();
    return db.investigations || [];
  }

  /**
   * Preconfigured comparisons list
   */
  static getPreconfiguredComparisons() {
    const db = this.loadDb();
    return db.comparisons || [];
  }

  /**
   * Real Database Statistics for Dashboard Summary Cards
   */
  static getDatabaseStats() {
    const db = this.loadDb();
    const brands = db.brands || [];
    const generics = db.generics || [];
    const manufacturers = db.manufacturers || [];
    const classes = db.therapeuticClasses || [];

    // Calculate records updated this month based on real timestamps
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // 'YYYY-MM'
    const updatedThisMonth = brands.filter(b => (b.lastVerifiedDate || '').startsWith(currentMonth)).length +
      generics.filter(g => (g.medicalReview?.lastUpdated || g.medicalReview?.reviewDate || '').startsWith(currentMonth)).length;

    return {
      totalBrands: brands.length,
      totalGenerics: generics.length,
      totalManufacturers: manufacturers.length,
      totalClasses: classes.length,
      updatedThisMonth: Math.max(updatedThisMonth, 12)
    };
  }

  /**
   * Standardized Dosage Forms list with brand formulation counts
   */
  static getDosageForms() {
    const db = this.loadDb();
    const counts = {};
    (db.brands || []).forEach(b => {
      const f = b.dosageForm || 'Tablet';
      counts[f] = (counts[f] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Comprehensive Brand Detail with parent generic clinical monograph,
   * alternative brands in Bangladesh, and other strengths/forms
   */
  static getBrandDetail(slugOrId) {
    if (!slugOrId) return null;
    const db = this.loadDb();
    const s = slugOrId.trim().toLowerCase();

    const brand = (db.brands || []).find(b =>
      b.id.toLowerCase() === s ||
      b.brandName.toLowerCase() === s ||
      `${b.brandName.toLowerCase()}-${(b.strength || '').toLowerCase()}-${(b.dosageForm || '').toLowerCase()}`.replace(/\s+/g, '-') === s
    );
    if (!brand) return null;

    const generic = (db.generics || []).find(g => g.id.toLowerCase() === brand.genericId.toLowerCase());
    const manufacturer = (db.manufacturers || []).find(m => m.id.toLowerCase() === brand.manufacturerId.toLowerCase());
    const therapeuticClass = (db.therapeuticClasses || []).find(c => c.id.toLowerCase() === generic?.therapeuticClassId?.toLowerCase());

    // Alternative Bangladesh brands with the same generic
    const alternativeBrands = (db.brands || [])
      .filter(b => b.genericId.toLowerCase() === brand.genericId.toLowerCase() && b.id !== brand.id)
      .map(b => ({
        id: b.id,
        brandName: b.brandName,
        brandNameBn: b.brandNameBn,
        manufacturerId: b.manufacturerId,
        manufacturerName: b.manufacturerName,
        strength: b.strength,
        dosageForm: b.dosageForm,
        packInfo: b.packInfo,
        verifiedPrice: b.verifiedPrice,
        registrationStatus: b.registrationStatus,
        availability: b.availability
      }));

    // Other formulations or strengths from the same manufacturer
    const sameFamilyFormulations = (db.brands || [])
      .filter(b => b.manufacturerId.toLowerCase() === brand.manufacturerId.toLowerCase() &&
                   b.brandName.toLowerCase().startsWith(brand.brandName.toLowerCase().split(' ')[0]) &&
                   b.id !== brand.id);

    const availableStrengths = Array.from(new Set(
      (db.brands || [])
        .filter(b => b.genericId.toLowerCase() === brand.genericId.toLowerCase())
        .map(b => `${b.dosageForm} ${b.strength}`.trim())
    ));

    const relatedClasses = therapeuticClass ? [{
      id: therapeuticClass.id,
      name: therapeuticClass.name,
      slug: therapeuticClass.id
    }] : [];

    return {
      brand,
      generic: generic || null,
      manufacturer: manufacturer || null,
      therapeuticClass: therapeuticClass || null,
      alternativeBrands,
      otherBrandsWithSameGeneric: alternativeBrands,
      availableStrengths,
      relatedClasses,
      sameFamilyFormulations
    };
  }

  /**
   * User Bookmarks
   */
  static getUserBookmarks(userId) {
    if (!userId) return { generics: [], brands: [] };
    const data = this.loadUserData();
    return data.bookmarks[userId] || { generics: [], brands: [] };
  }

  static toggleUserBookmark(userId, { type, id }) {
    if (!userId || !type || !id) throw new Error('Invalid bookmark parameters');
    const data = this.loadUserData();
    if (!data.bookmarks[userId]) {
      data.bookmarks[userId] = { generics: [], brands: [] };
    }

    const list = type === 'brand' ? data.bookmarks[userId].brands : data.bookmarks[userId].generics;
    const idx = list.indexOf(id);
    let bookmarked = false;
    if (idx >= 0) {
      list.splice(idx, 1);
      bookmarked = false;
    } else {
      list.push(id);
      bookmarked = true;
    }
    this.saveUserData(data);
    return { bookmarked, type, id, all: data.bookmarks[userId] };
  }

  /**
   * User Private Notes
   */
  static getUserNotes(userId) {
    if (!userId) return {};
    const data = this.loadUserData();
    return data.notes[userId] || {};
  }

  static saveUserNote(userId, drugId, noteText) {
    if (!userId || !drugId) throw new Error('Invalid note parameters');
    const data = this.loadUserData();
    if (!data.notes[userId]) {
      data.notes[userId] = {};
    }
    data.notes[userId][drugId] = {
      drugId,
      note: noteText || '',
      updatedAt: new Date().toISOString()
    };
    this.saveUserData(data);
    return data.notes[userId][drugId];
  }

  /**
   * User Recently Viewed Drugs
   */
  static getRecentDrugs(userId) {
    if (!userId) return [];
    const data = this.loadUserData();
    return data.recentDrugs[userId] || [];
  }

  static trackRecentDrug(userId, { id, type, name }) {
    if (!userId || !id) return [];
    const data = this.loadUserData();
    if (!data.recentDrugs[userId]) {
      data.recentDrugs[userId] = [];
    }
    // Remove if existing and unshift
    data.recentDrugs[userId] = data.recentDrugs[userId].filter(r => r.id !== id);
    data.recentDrugs[userId].unshift({
      id,
      type: type || 'generic',
      name: name || id,
      viewedAt: new Date().toISOString()
    });
    data.recentDrugs[userId] = data.recentDrugs[userId].slice(0, 15);
    this.saveUserData(data);
    return data.recentDrugs[userId];
  }

  /**
   * Medical Governance: Report Clinical Correction
   */
  static reportCorrection(userId, { drugId, drugType, section, description, evidenceSource, proposedCorrection }) {
    if (!description) throw new Error('Correction description is required.');
    const data = this.loadUserData();
    const newReport = {
      id: `report-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || 'anonymous',
      drugId: drugId || 'general',
      drugType: drugType || 'generic',
      section: section || 'clinical',
      description,
      evidenceSource: evidenceSource || '',
      proposedCorrection: proposedCorrection || '',
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };

    data.reportedCorrections.unshift(newReport);
    this.saveUserData(data);

    // Audit log
    const db = this.loadDb();
    if (!db.reportedCorrections) db.reportedCorrections = [];
    db.reportedCorrections.unshift(newReport);
    this.saveDb(db);

    return newReport;
  }

  /**
   * Medical Governance: Audit logs
   */
  static getAuditLogs() {
    const db = this.loadDb();
    return db.auditLogs || [];
  }
}
