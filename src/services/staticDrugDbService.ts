/**
 * Static Drug Database Service
 *
 * Provides instant, zero-backend, client-side querying of the full Bangladesh
 * Medicine Dataset (21,226 brands, 1,519 generics, 236 manufacturers, 35 dosage forms).
 *
 * Ensures identical search, monograph, and A-Z directory data across:
 * - Localhost dev server
 * - Live production website (https://medx.vartualtutor.com)
 * - GitHub Pages (https://istihadahmed007.github.io/med)
 * - Offline / PWA environments
 */

import {
  DrugGeneric,
  DrugBrand,
  Manufacturer,
  TherapeuticClass,
  DiseaseGuideline,
  ClinicalInvestigation,
  DrugComparisonMatrix,
  DrugSearchResponse,
  DatabaseStatistics,
  DosageFormRecord,
  BrandDetailResponse,
  AdministrationRoute,
  BreastfeedingSafety,
  ClinicalCoverageReport,
  MedicalReviewStatus
} from '../types/drug';

import {
  VERIFIED_GENERICS,
  VERIFIED_BRANDS,
  VERIFIED_MANUFACTURERS,
  VERIFIED_THERAPEUTIC_CLASSES,
  VERIFIED_GUIDELINES,
  VERIFIED_INVESTIGATIONS,
  PRECONFIGURED_COMPARISONS,
  getVerifiedGenericById,
  getVerifiedBrandsForGeneric,
  getVerifiedBrandById,
  searchVerifiedDrugs
} from '../data/bangladeshDrugData';

interface DrugReferenceDbSchema {
  generics: DrugGeneric[];
  brands: DrugBrand[];
  manufacturers: Manufacturer[];
  therapeuticClasses?: TherapeuticClass[];
  dosageForms?: DosageFormRecord[];
  interactions?: any[];
  guidelines?: DiseaseGuideline[];
  investigations?: ClinicalInvestigation[];
  comparisons?: DrugComparisonMatrix[];
}

export class StaticDrugDbService {
  private static db: DrugReferenceDbSchema | null = null;
  private static loadPromise: Promise<DrugReferenceDbSchema | null> | null = null;

  // Index maps for sub-millisecond retrieval
  private static genericById = new Map<string, DrugGeneric>();
  private static brandById = new Map<string, DrugBrand>();
  private static brandsByGenericId = new Map<string, DrugBrand[]>();
  private static manufacturerById = new Map<string, Manufacturer>();
  private static dosageFormsList: DosageFormRecord[] = [];

  /**
   * Asynchronously load the static database JSON from public assets
   */
  static async loadDb(): Promise<DrugReferenceDbSchema | null> {
    if (this.db) return this.db;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      const candidates = [
        './data/drug_reference_db.json',
        'data/drug_reference_db.json',
        '/data/drug_reference_db.json'
      ];

      // If Vite BASE_URL is set, prepend it
      const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '';
      if (base && base !== './' && base !== '/') {
        candidates.unshift(`${base.replace(/\/$/, '')}/data/drug_reference_db.json`);
      }

      for (const url of candidates) {
        try {
          const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
          if (res.ok) {
            const data: DrugReferenceDbSchema = await res.json();
            if (data && Array.isArray(data.brands) && data.brands.length > 0) {
              this.initializeIndexes(data);
              this.db = data;
              return data;
            }
          }
        } catch {
          // try next candidate
        }
      }

      console.warn('[StaticDrugDbService] Could not fetch public/data/drug_reference_db.json, using bundled core dataset');
      return null;
    })();

    return this.loadPromise;
  }

  /**
   * Build fast indexing maps
   */
  private static initializeIndexes(data: DrugReferenceDbSchema) {
    this.genericById.clear();
    this.brandById.clear();
    this.brandsByGenericId.clear();
    this.manufacturerById.clear();

    // Index generics
    for (const g of (data.generics || [])) {
      if (g.id) this.genericById.set(g.id.toLowerCase(), g);
      if (g.name) this.genericById.set(g.name.toLowerCase().trim(), g);
    }

    // Index manufacturers
    for (const m of (data.manufacturers || [])) {
      if (m.id) this.manufacturerById.set(m.id.toLowerCase(), m);
      if (m.name) this.manufacturerById.set(m.name.toLowerCase().trim(), m);
    }

    // Index brands
    for (const b of (data.brands || [])) {
      if (b.id) this.brandById.set(b.id.toLowerCase(), b);
      if (b.slug) this.brandById.set(b.slug.toLowerCase(), b);

      if (b.genericId) {
        const gid = b.genericId.toLowerCase();
        let list = this.brandsByGenericId.get(gid);
        if (!list) {
          list = [];
          this.brandsByGenericId.set(gid, list);
        }
        list.push(b);
      }
    }

    // Compute or extract dosage forms
    if (data.dosageForms && data.dosageForms.length > 0) {
      this.dosageFormsList = data.dosageForms;
    } else {
      const counts = new Map<string, number>();
      for (const b of (data.brands || [])) {
        const form = (b.dosageForm || 'Other').trim();
        counts.set(form, (counts.get(form) || 0) + 1);
      }
      this.dosageFormsList = Array.from(counts.entries())
        .map(([name, count]) => ({
          form: name,
          name,
          count
        }))
        .sort((a, b) => b.count - a.count);
    }
  }

  /**
   * Search drugs with full filtering, identical to the backend API
   */
  static async searchDrugs(params: {
    query?: string;
    filterType?: 'all' | 'generics' | 'brands' | string;
    therapeuticClass?: string;
    indication?: string;
    manufacturerId?: string;
    letter?: string;
    dosageForm?: string;
    strength?: string;
    prescriptionStatus?: string;
    activeStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<DrugSearchResponse> {
    const data = await this.loadDb();
    if (!data) {
      // Fallback to bundled dataset if data file cannot be fetched
      const local = searchVerifiedDrugs(params.query || '');
      return {
        query: params.query || '',
        pagination: {
          page: params.page || 1,
          limit: params.limit || 15,
          totalResults: local.generics.length + local.brands.length,
          totalGenerics: local.generics.length,
          totalBrands: local.brands.length,
          totalPages: Math.max(1, Math.ceil(Math.max(local.generics.length, local.brands.length) / (params.limit || 15)))
        },
        suggestions: [],
        results: {
          generics: local.generics.slice(0, params.limit || 15),
          brands: local.brands.slice(0, params.limit || 15),
          manufacturers: local.manufacturers,
          classes: local.classes
        }
      };
    }

    const q = (params.query || '').trim().toLowerCase();
    const filterType = params.filterType || 'all';
    const letter = (params.letter || '').trim().toLowerCase();
    const therapeuticClass = (params.therapeuticClass || '').trim().toLowerCase();
    const manufacturerId = (params.manufacturerId || '').trim().toLowerCase();
    const dosageForm = (params.dosageForm || '').trim().toLowerCase();
    const prescriptionStatus = (params.prescriptionStatus || '').trim().toLowerCase();
    const page = params.page || 1;
    const limit = params.limit || 15;

    let matchedGenerics: DrugGeneric[] = [];
    let matchedBrands: DrugBrand[] = [];

    // Filter Generics
    if (filterType === 'all' || filterType === 'generics' || filterType === 'generic') {
      matchedGenerics = (data.generics || []).filter(g => {
        if (letter && !g.name.toLowerCase().startsWith(letter)) return false;
        if (therapeuticClass && therapeuticClass !== 'all') {
          const tc = (g.therapeuticClass || '').toLowerCase();
          const tcid = (g.therapeuticClassId || '').toLowerCase();
          const pc = (g.pharmacologicalClass || '').toLowerCase();
          if (!tc.includes(therapeuticClass) && !tcid.includes(therapeuticClass) && !pc.includes(therapeuticClass)) {
            return false;
          }
        }
        if (q) {
          const matchName = (g.name || '').toLowerCase().includes(q);
          const matchBn = (g.nameBn || '').toLowerCase().includes(q);
          const matchIndication = (g.indications || []).some(ind => {
            const str = typeof ind === 'string' ? ind : (ind as any)?.name || '';
            return str.toLowerCase().includes(q);
          });
          const matchClass = (g.therapeuticClass || '').toLowerCase().includes(q);
          if (!matchName && !matchBn && !matchIndication && !matchClass) return false;
        }
        return true;
      });
    }

    // Filter Brands
    if (filterType === 'all' || filterType === 'brands' || filterType === 'brand') {
      matchedBrands = (data.brands || []).filter(b => {
        if (letter && !b.brandName.toLowerCase().startsWith(letter)) return false;
        if (manufacturerId && manufacturerId !== 'all') {
          const mfgId = (b.manufacturerId || '').toLowerCase();
          const mfgName = (b.manufacturerName || '').toLowerCase();
          if (mfgId !== manufacturerId && !mfgName.includes(manufacturerId)) return false;
        }
        if (dosageForm && dosageForm !== 'all') {
          if ((b.dosageForm || '').toLowerCase() !== dosageForm) return false;
        }
        if (prescriptionStatus && prescriptionStatus !== 'all') {
          const isRx = b.prescriptionStatus === 'POM' || b.prescriptionStatus === 'prescription_only';
          if (prescriptionStatus === 'prescription' && !isRx) return false;
          if (prescriptionStatus === 'otc' && isRx) return false;
        }
        if (q) {
          const matchBrand = (b.brandName || '').toLowerCase().includes(q);
          const matchGeneric = (b.genericId || '').toLowerCase().includes(q);
          const matchMfg = (b.manufacturerName || '').toLowerCase().includes(q);
          if (!matchBrand && !matchGeneric && !matchMfg) return false;
        }
        return true;
      });
    }

    const totalGenerics = matchedGenerics.length;
    const totalBrands = matchedBrands.length;
    const startIndex = (page - 1) * limit;

    return {
      query: q,
      pagination: {
        page,
        limit,
        totalResults: totalGenerics + totalBrands,
        totalGenerics,
        totalBrands,
        totalPages: Math.max(1, Math.ceil(Math.max(totalGenerics, totalBrands) / limit))
      },
      suggestions: [],
      results: {
        generics: matchedGenerics.slice(startIndex, startIndex + limit),
        brands: matchedBrands.slice(startIndex, startIndex + limit),
        manufacturers: data.manufacturers || VERIFIED_MANUFACTURERS,
        classes: data.therapeuticClasses || VERIFIED_THERAPEUTIC_CLASSES
      }
    };
  }

  /**
   * Fast generic monograph lookup
   */
  static async getGeneric(slugOrId: string): Promise<DrugGeneric | null> {
    await this.loadDb();
    const key = (slugOrId || '').toLowerCase().trim();
    const found = this.genericById.get(key);
    if (found) return found;
    return getVerifiedGenericById(slugOrId) || null;
  }

  /**
   * Fast brands-for-generic lookup
   */
  static async getBrandsForGeneric(genericSlugOrId: string): Promise<DrugBrand[]> {
    await this.loadDb();
    const key = (genericSlugOrId || '').toLowerCase().trim();
    const list = this.brandsByGenericId.get(key);
    if (list && list.length > 0) return list;
    return getVerifiedBrandsForGeneric(genericSlugOrId);
  }

  /**
   * Fast brand product lookup
   */
  static async getBrand(brandSlugOrId: string): Promise<DrugBrand | null> {
    await this.loadDb();
    const key = (brandSlugOrId || '').toLowerCase().trim();

    const BRAND_ALIASES: Record<string, string> = {
      'lasix-tablet-40-mg': 'lasix-tab-40mg',
      'lasix-injection-20-mg-2-ml': 'lasix-inj-20mg-2ml',
      'neofloxin-tablet-500-mg': 'neofloxin-tab-500mg',
      'losectil-capsule-20-mg': 'losectil-cap-20mg',
      'proceptin-capsule-20-mg': 'proceptin-cap-20mg',
      'napa-tablet-500-mg': 'napa-tab-500mg',
      'renova-tablet-500-mg': 'renova-tab-500mg',
      'napa-extra-tablet-500-mg-65-mg': 'napa-extra-tab'
    };

    const targetKey = BRAND_ALIASES[key] || key;
    const found = this.brandById.get(targetKey);
    if (found) return found;
    return getVerifiedBrandById(targetKey) || null;
  }

  /**
   * Full brand detail response with generic monograph and alternatives
   */
  static async getBrandDetail(slugOrId: string): Promise<BrandDetailResponse | null> {
    await this.loadDb();
    let brand = await this.getBrand(slugOrId);
    if (!brand) {
      const gen = await this.getGeneric(slugOrId);
      if (gen) {
        const brandsForGen = await this.getBrandsForGeneric(gen.id);
        if (brandsForGen && brandsForGen.length > 0) {
          brand = brandsForGen[0];
        } else {
          brand = {
            id: gen.id,
            genericId: gen.id,
            brandName: gen.name,
            manufacturerId: 'dgda-registered',
            manufacturerName: 'Bangladesh Registered Formulations',
            dosageForm: 'Oral / Standard Formulation',
            strength: 'Standard',
            route: 'Oral',
            packInfo: 'Commercial packaging',
            registrationStatus: 'DGDA Registered INN'
          };
        }
      }
    }
    if (!brand) return null;

    const saltParentMap: Record<string, string> = {
      'azithromycin-dihydrate': 'azithromycin',
      'azithromycin-dihydrate-ophthalmic': 'azithromycin',
      'amoxicillin-trihydrate': 'amoxicillin',
      'amoxicillin-clavulanic-acid': 'amoxicillin',
      'metformin-hydrochloride': 'metformin',
      'ceftriaxone-sodium': 'ceftriaxone',
      'pantoprazole-sodium-sesquihydrate': 'pantoprazole',
      'losartan-potassium': 'losartan',
      'losartan-potassium-hydrochlorothiazide': 'losartan',
      'doxycycline-hydrochloride': 'doxycycline',
      'clopidogrel-bisulphate': 'clopidogrel',
      'clopidogrel-aspirin': 'clopidogrel',
      'enalapril-maleate': 'enalapril',
      'warfarin-sodium': 'warfarin',
      'heparin-sodium': 'heparin',
      'paracetamol-iv-infusion': 'paracetamol',
      'paracetamol-tramadol-hydrochloride': 'paracetamol',
      'omeprazole-mups-tablet': 'omeprazole',
      'furosemide-spironolactone': 'furosemide',
      'ramipril-hydrochlorothiazide': 'ramipril'
    };

    let generic = await this.getGeneric(brand.genericId);
    if (saltParentMap[brand.genericId.toLowerCase()]) {
      const parentGeneric = await this.getGeneric(saltParentMap[brand.genericId.toLowerCase()]);
      if (parentGeneric && parentGeneric.indications && parentGeneric.indications.length > 0) {
        generic = {
          ...parentGeneric,
          id: brand.genericId,
          name: generic?.name || parentGeneric.name
        };
      }
    }

    if (!generic) {
      const genName = brand.genericId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      const defaultRoute: AdministrationRoute = (brand.route as AdministrationRoute) || 'Oral';
      generic = {
        id: brand.genericId,
        name: genName,
        nameBn: '',
        normalizedName: brand.genericId.toLowerCase(),
        pharmacologicalClass: 'Pharmaceutical Active Substance (Pending Monograph)',
        therapeuticClass: 'General Medicine & Therapeutics',
        therapeuticClassId: 'general',
        atcCode: '',
        prescriptionStatus: 'POM',
        bmdcCurriculumPhase: '',
        mechanismOfAction: '',
        receptorOrTarget: '',
        indications: [],
        contraindications: [],
        dosageGuidance: {
          adult: '',
          routes: [defaultRoute]
        },
        doseAdjustment: {
          renal: '',
          hepatic: ''
        },
        adverseEffects: {
          common: [],
          uncommon: [],
          rare: [],
          seriousWarnings: []
        },
        precautions: [],
        monitoringRequirements: [],
        foodInteractions: '',
        pregnancyInfo: {
          category: '',
          details: ''
        },
        breastfeedingInfo: {
          safety: 'insufficient_data' as BreastfeedingSafety,
          details: ''
        },
        paediatricConsiderations: '',
        geriatricConsiderations: '',
        overdoseInformation: {
          symptoms: '',
          management: ''
        },
        storageInformation: '',
        sources: brand.source ? [{
          organization: brand.source,
          title: 'Imported Brand Catalog Entry',
          url: '',
          publicationDate: brand.lastVerifiedDate || '',
          jurisdiction: 'Bangladesh',
          fetchedDate: brand.lastVerifiedDate || '',
          version: '1.0-catalog'
        }] : [],
        medicalReview: {
          status: 'imported',
          reviewerName: '',
          reviewerCredentials: '',
          reviewDate: '',
          lastUpdated: '',
          contentVersion: '1.0-unreviewed'
        },
        bilingualNotes: {
          classBn: '',
          mechanismSummaryBn: '',
          patientCounsellingBn: '',
          criticalWarningBn: ''
        },
        pharmacologyLearning: {
          pathwaySummary: '',
          receptorTarget: '',
          vivaQuestions: [],
          recallFlashcards: [],
          practiceSba: [],
          clinicalCaseScenario: {
            title: '',
            patientProfile: '',
            presentation: '',
            clinicalQuestion: '',
            discussion: ''
          },
          textbookReferences: [],
          acrossBooksTopicIds: []
        }
      };
    }

    // Attach verified key interactions to generic
    let enrichedGeneric: DrugGeneric = { ...generic };
    if (this.db && Array.isArray(this.db.interactions)) {
      const gId = (enrichedGeneric.id || '').toLowerCase();
      const directInteractions = this.db.interactions.filter(i =>
        i.genericA.toLowerCase() === gId || i.genericB.toLowerCase() === gId
      ).map(i => ({
        ...i,
        genericB: i.genericA.toLowerCase() === gId ? i.genericB : i.genericA
      }));
      enrichedGeneric.keyInteractions = directInteractions;
    }

    const allForGeneric = await this.getBrandsForGeneric(brand.genericId);
    const otherBrands = allForGeneric.filter(b => b.id !== brand.id && b.brandName.toLowerCase() !== brand.brandName.toLowerCase());
    
    // Canonical deduplication of available strengths and formulations
    const seenForms = new Map<string, string>();
    for (const b of allForGeneric) {
      if (!b.dosageForm && !b.strength) continue;
      const s = (b.strength || '').trim().replace(/(\d+)\s*(mg|mcg|g|ml|iu|%)/gi, '$1 $2').replace(/(\d+)-mg/gi, '$1 mg');
      const df = (b.dosageForm || '').trim();
      const label = `${df} ${s}`.trim();
      const key = label.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seenForms.has(key)) {
        seenForms.set(key, label);
      }
    }
    const availableStrengths = Array.from(seenForms.values()).sort((a, b) => a.localeCompare(b));

    const resolvedBrand: DrugBrand = {
      ...brand,
      route: brand.route || (brand.dosageForm?.toLowerCase().includes('inj') ? 'IV, IM' : 'Oral')
    };

    return {
      brand: resolvedBrand,
      generic: enrichedGeneric,
      otherBrandsWithSameGeneric: otherBrands,
      availableStrengths,
      relatedClasses: [
        {
          id: generic.therapeuticClassId || 'unassigned',
          name: generic.therapeuticClass || 'Pharmacology Reference',
          slug: generic.therapeuticClassId || 'unassigned'
        }
      ]
    };
  }

  /**
   * Fast database statistics matching exact loaded numbers
   */
  static async getDatabaseStats(): Promise<DatabaseStatistics> {
    const data = await this.loadDb();
    if (!data) {
      return {
        totalBrands: VERIFIED_BRANDS.length,
        totalGenerics: VERIFIED_GENERICS.length,
        totalManufacturers: VERIFIED_MANUFACTURERS.length,
        totalClasses: VERIFIED_THERAPEUTIC_CLASSES.length,
        totalTherapeuticClasses: VERIFIED_THERAPEUTIC_CLASSES.length,
        updatedThisMonth: 24,
        recordsUpdatedThisMonth: 24,
        lastSynchronized: new Date().toISOString()
      };
    }

    const totalGenerics = (data.generics || []).length;
    const totalBrands = (data.brands || []).length;
    const totalManufacturers = (data.manufacturers || []).length;

    const currentMonth = new Date().toISOString().slice(0, 7);
    const updatedGenerics = (data.generics || []).filter(g =>
      g.medicalReview?.status === 'published' &&
      ((g.medicalReview?.lastUpdated || g.medicalReview?.reviewDate || '').startsWith(currentMonth))
    ).length;
    const updatedBrands = (data.brands || []).filter(b =>
      b.registrationStatus === 'DGDA Active' &&
      ((b.lastVerifiedDate || '').startsWith(currentMonth))
    ).length;
    const realUpdated = updatedGenerics + updatedBrands;

    return {
      totalBrands,
      totalGenerics,
      totalManufacturers,
      totalClasses: (data.therapeuticClasses || VERIFIED_THERAPEUTIC_CLASSES).length,
      totalTherapeuticClasses: (data.therapeuticClasses || VERIFIED_THERAPEUTIC_CLASSES).length,
      updatedThisMonth: realUpdated,
      recordsUpdatedThisMonth: realUpdated,
      lastSynchronized: new Date().toISOString()
    };
  }

  /**
   * Fast distinct dosage forms list
   */
  static async getDosageForms(): Promise<DosageFormRecord[]> {
    await this.loadDb();
    return this.dosageFormsList;
  }

  /**
   * Fast global search across generics, brands, and manufacturers
   */
  static async globalSearch(query: string, limit: number = 10): Promise<{
    generics: Array<{ id: string; title: string; subtitle: string; type: 'generic' }>;
    brands: Array<{ id: string; title: string; subtitle: string; type: 'brand'; genericId: string }>;
    manufacturers: Array<{ id: string; title: string; subtitle: string; type: 'manufacturer' }>;
  }> {
    const data = await this.loadDb();
    const q = (query || '').trim().toLowerCase();
    const empty = { generics: [], brands: [], manufacturers: [] };
    if (!q || q.length < 2 || !data) return empty;

    const generics: Array<{ id: string; title: string; subtitle: string; type: 'generic' }> = [];
    for (const g of (data.generics || [])) {
      if (generics.length >= limit) break;
      if ((g.name || '').toLowerCase().includes(q) || (g.nameBn || '').includes(q)) {
        generics.push({
          id: g.id,
          title: g.name,
          subtitle: g.therapeuticClass || g.pharmacologicalClass || '',
          type: 'generic'
        });
      }
    }

    const brands: Array<{ id: string; title: string; subtitle: string; type: 'brand'; genericId: string }> = [];
    for (const b of (data.brands || [])) {
      if (brands.length >= limit) break;
      if ((b.brandName || '').toLowerCase().includes(q)) {
        brands.push({
          id: b.id,
          title: b.brandName,
          subtitle: `${b.strength || ''} ${b.dosageForm || ''} — ${b.manufacturerName || ''}`.trim(),
          type: 'brand',
          genericId: b.genericId
        });
      }
    }

    const manufacturers: Array<{ id: string; title: string; subtitle: string; type: 'manufacturer' }> = [];
    for (const m of (data.manufacturers || [])) {
      if (manufacturers.length >= limit) break;
      if ((m.name || '').toLowerCase().includes(q) || (m.shortName || '').toLowerCase().includes(q)) {
        manufacturers.push({
          id: m.id,
          title: m.name,
          subtitle: m.headquarters || '',
          type: 'manufacturer'
        });
      }
    }

    return { generics, brands, manufacturers };
  }

  /**
   * Static Coverage Report
   */
  static async getCoverageReport(): Promise<ClinicalCoverageReport> {
    const data = await this.loadDb();
    const generics = data?.generics || VERIFIED_GENERICS;
    const brands = data?.brands || VERIFIED_BRANDS;

    const statusCounts = {
      imported: 0,
      source_matched: 0,
      clinical_review: 0,
      published: 0,
      other: 0
    };

    const fieldCompleteness = {
      atcCode: 0,
      indications: 0,
      dosageGuidance: 0,
      contraindications: 0,
      adverseEffects: 0,
      seriousWarnings: 0,
      mechanismOfAction: 0,
      pharmacokinetics: 0,
      pregnancyInfo: 0,
      renalHepatic: 0,
      sources: 0
    };

    const incompleteGenerics: Array<{
      id: string;
      name: string;
      status: string;
      missingFields: string[];
      brandCount: number;
    }> = [];

    for (const g of generics) {
      const status = (g.medicalReview?.status || 'imported').toLowerCase();
      if (status === 'published' || status === 'approved') statusCounts.published++;
      else if (status === 'clinical_review') statusCounts.clinical_review++;
      else if (status === 'source_matched') statusCounts.source_matched++;
      else if (status === 'imported' || status === 'draft') statusCounts.imported++;
      else statusCounts.other++;

      const hasAtc = !!g.atcCode && g.atcCode !== 'VAR01' && g.atcCode.trim().length >= 5;
      const hasIndications = Array.isArray(g.indications) && g.indications.length > 0 && !g.indications.some(i => i.id === 'ind-default');
      const hasDosage = !!g.dosageGuidance?.adult && g.dosageGuidance.adult.trim().length > 0 && !g.dosageGuidance.adult.includes('As directed by physician');
      const hasContra = Array.isArray(g.contraindications) && g.contraindications.length > 0;
      const hasAdverse = (Array.isArray(g.adverseEffects?.common) && g.adverseEffects.common.length > 0) || (Array.isArray(g.adverseEffects?.seriousWarnings) && g.adverseEffects.seriousWarnings.length > 0);
      const hasSeriousWarnings = Array.isArray(g.adverseEffects?.seriousWarnings) && g.adverseEffects.seriousWarnings.length > 0;
      const hasMoa = !!g.mechanismOfAction && g.mechanismOfAction.trim().length > 0 && !g.mechanismOfAction.includes('Functions per official pharmacological class mechanism');
      const hasPk = !!g.pharmacokinetics && (!!g.pharmacokinetics.bioavailability || !!g.pharmacokinetics.halfLife);
      const hasPreg = !!g.pregnancyInfo?.details && g.pregnancyInfo.details.trim().length > 0 && !g.pregnancyInfo.details.includes('Evaluate risk-benefit');
      const hasRenalHepatic = (!!g.doseAdjustment?.renal && g.doseAdjustment.renal.trim().length > 0 && !g.doseAdjustment.renal.includes('None noted')) ||
                              (!!g.doseAdjustment?.hepatic && g.doseAdjustment.hepatic.trim().length > 0 && !g.doseAdjustment.hepatic.includes('None noted'));
      const hasSources = Array.isArray(g.sources) && g.sources.length > 0 && g.sources.some(s => s.organization && !s.organization.includes('CSV Import'));

      if (hasAtc) fieldCompleteness.atcCode++;
      if (hasIndications) fieldCompleteness.indications++;
      if (hasDosage) fieldCompleteness.dosageGuidance++;
      if (hasContra) fieldCompleteness.contraindications++;
      if (hasAdverse) fieldCompleteness.adverseEffects++;
      if (hasSeriousWarnings) fieldCompleteness.seriousWarnings++;
      if (hasMoa) fieldCompleteness.mechanismOfAction++;
      if (hasPk) fieldCompleteness.pharmacokinetics++;
      if (hasPreg) fieldCompleteness.pregnancyInfo++;
      if (hasRenalHepatic) fieldCompleteness.renalHepatic++;
      if (hasSources) fieldCompleteness.sources++;

      const missingFields: string[] = [];
      if (!hasAtc) missingFields.push('ATC Code');
      if (!hasIndications) missingFields.push('Indications');
      if (!hasDosage) missingFields.push('Dosage');
      if (!hasContra) missingFields.push('Contraindications');
      if (!hasAdverse) missingFields.push('Adverse Effects');
      if (!hasMoa) missingFields.push('Mechanism');
      if (!hasPk) missingFields.push('Pharmacokinetics');
      if (!hasPreg) missingFields.push('Pregnancy/Lactation');
      if (!hasRenalHepatic) missingFields.push('Renal/Hepatic');
      if (!hasSources) missingFields.push('Sources');

      if (missingFields.length > 0 || status !== 'published') {
        incompleteGenerics.push({
          id: g.id,
          name: g.name,
          status,
          missingFields,
          brandCount: brands.filter(b => b.genericId.toLowerCase() === g.id.toLowerCase()).length
        });
      }
    }

    const verifiedBrands = brands.filter(b => b.registrationStatus && !b.registrationStatus.includes('Pending') && !b.registrationStatus.includes('Imported') && b.verifiedPrice?.amount).length;
    const pendingBrands = brands.length - verifiedBrands;

    return {
      totalGenerics: generics.length,
      byStatus: statusCounts,
      fieldCompleteness,
      totalBrands: brands.length,
      verifiedBrands,
      pendingBrands,
      incompleteGenericsCount: incompleteGenerics.length,
      incompleteGenerics: incompleteGenerics.slice(0, 100),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Static Review Status Update
   */
  static async updateClinicalReviewStatus(genericId: string, reviewPayload: {
    status: MedicalReviewStatus;
    reviewerName?: string;
    reviewerCredentials?: string;
    reviewNotes?: string;
  }): Promise<{ success: boolean; generic?: DrugGeneric }> {
    const data = await this.loadDb();
    const g = (data?.generics || []).find(item => item.id.toLowerCase() === genericId.toLowerCase());
    if (!g) return { success: false };

    g.medicalReview = {
      status: reviewPayload.status,
      reviewerName: reviewPayload.reviewerName || '',
      reviewerCredentials: reviewPayload.reviewerCredentials || '',
      reviewDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      contentVersion: reviewPayload.status === 'published' ? '2.1-reviewed' : (g.medicalReview?.contentVersion || '1.0-draft')
    };

    return { success: true, generic: g };
  }
}
