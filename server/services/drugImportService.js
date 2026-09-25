import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DrugService } from './drugService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const JOBS_FILE = path.join(DATA_DIR, 'drug_import_jobs.json');
const ERRORS_FILE = path.join(DATA_DIR, 'drug_import_errors.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class DrugImportService {
  static JOBS_FILE = JOBS_FILE;
  static ERRORS_FILE = ERRORS_FILE;

  /**
   * Load import jobs list
   */
  static loadJobs() {
    const jobsFile = this.JOBS_FILE || JOBS_FILE;
    try {
      if (fs.existsSync(jobsFile)) {
        return JSON.parse(fs.readFileSync(jobsFile, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load drug_import_jobs.json', e);
    }
    return [];
  }

  static saveJobs(jobs) {
    const jobsFile = this.JOBS_FILE || JOBS_FILE;
    try {
      fs.writeFileSync(jobsFile, JSON.stringify(jobs, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save drug_import_jobs.json', e);
      return false;
    }
  }

  /**
   * Load import errors list
   */
  static loadErrors() {
    const errFile = this.ERRORS_FILE || ERRORS_FILE;
    try {
      if (fs.existsSync(errFile)) {
        return JSON.parse(fs.readFileSync(errFile, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load drug_import_errors.json', e);
    }
    return [];
  }

  static saveErrors(errors) {
    const errFile = this.ERRORS_FILE || ERRORS_FILE;
    try {
      fs.writeFileSync(errFile, JSON.stringify(errors, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save drug_import_errors.json', e);
      return false;
    }
  }

  static loadDb() {
    return DrugService.loadDb();
  }

  static saveDb(db) {
    return DrugService.saveDb(db);
  }

  static getImportJobs() {
    return this.loadJobs();
  }

  static getJobErrors(jobId, format = 'json') {
    if (format === 'csv') {
      return this.getJobErrorsCsv(jobId);
    }
    return this.loadErrors().filter(e => e.jobId === jobId);
  }

  static archiveBrand(brandId, confirmationFlag, reason = '', adminUser = { name: 'Admin' }) {
    return this.archiveBrandRecord(brandId, confirmationFlag, reason, adminUser);
  }

  // =========================================================================
  // Normalization Helpers
  // =========================================================================

  /**
   * Normalize dosage form names to standard terminology
   */
  static normalizeDosageForm(rawForm) {
    if (!rawForm || typeof rawForm !== 'string') return 'Tablet';
    const clean = rawForm.trim().toUpperCase();

    if (clean.includes('TAB') || clean === 'T' || clean.includes('CAPLET')) return 'Tablet';
    if (clean.includes('CAP') || clean === 'C') return 'Capsule';
    if (clean.includes('SYR') || clean.includes('LIQ')) return 'Syrup';
    if (clean.includes('SUSP')) return 'Suspension';
    if (clean.includes('INJ') || clean.includes('IV INF') || clean.includes('VIAL') || clean.includes('AMP')) return 'Injection';
    if (clean.includes('OINT')) return 'Ointment';
    if (clean.includes('CREAM')) return 'Cream';
    if (clean.includes('GEL')) return 'Gel';
    if (clean.includes('DROP') || clean.includes('OPHTH') || clean.includes('OTIC')) return 'Eye/Ear Drops';
    if (clean.includes('INH') || clean.includes('MDI') || clean.includes('RESP') || clean.includes('AEROSOL')) return 'Inhaler';
    if (clean.includes('SUPP') || clean.includes('RECT')) return 'Suppository';
    if (clean.includes('SOLN') || clean.includes('SOLUTION')) return 'Oral Solution';
    if (clean.includes('POWDER') || clean.includes('SACHET')) return 'Powder for Suspension';

    // Capitalize first letter of each word
    return rawForm.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }

  /**
   * Normalize strength string (e.g. "500MG" -> "500 mg", "10 MG" -> "10 mg")
   */
  static normalizeStrength(rawStrength) {
    if (!rawStrength || typeof rawStrength !== 'string') return '';
    let s = rawStrength.trim();
    // Normalize spacing between numbers and units
    s = s.replace(/(\d+(?:\.\d+)?)\s*(mg|mcg|g|ml|iu|u|%)/gi, '$1 $2');
    // Normalize unit casing
    s = s.replace(/\bmg\b/gi, 'mg')
         .replace(/\bmcg\b/gi, 'mcg')
         .replace(/\bg\b/gi, 'g')
         .replace(/\bml\b/gi, 'mL')
         .replace(/\biu\b/gi, 'IU');
    return s;
  }

  /**
   * Normalize text whitespace & casing
   */
  static normalizeText(str) {
    if (!str || typeof str !== 'string') return '';
    return str.trim().replace(/\s+/g, ' ');
  }

  /**
   * Generate URL-friendly slug
   */
  static slugify(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\+\/\\]+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Create a deterministic composite identity for a brand formulation
   * brand + generic + strength + dosageForm + manufacturer
   */
  static generateCompositeKey(record) {
    const brand = this.slugify(record.brandName || '');
    const generic = this.slugify(record.genericId || record.genericName || '');
    const strength = this.slugify(this.normalizeStrength(record.strength || ''));
    const form = this.slugify(this.normalizeDosageForm(record.dosageForm || ''));
    const mfg = this.slugify(record.manufacturerId || record.manufacturerName || '');

    return `${brand}--${generic}--${strength}--${form}--${mfg}`;
  }

  // =========================================================================
  // Validation Engine
  // =========================================================================

  /**
   * Validate a single drug brand record
   */
  static validateBrandRecord(record, existingGenerics = [], existingManufacturers = []) {
    const errors = [];

    // 1. Brand Name
    if (!record.brandName || typeof record.brandName !== 'string' || record.brandName.trim().length < 2) {
      errors.push({ field: 'brandName', reason: 'Missing brand name: Brand name is required and must be at least 2 characters.' });
    }

    // 2. Generic Name / Generic ID
    const genIdentifier = (record.genericId || record.genericName || '').trim().toLowerCase();
    if (!genIdentifier) {
      const targetField = record.genericName !== undefined ? 'genericName' : 'genericId';
      errors.push({ field: targetField, reason: 'Missing generic name: Generic identification (genericId or genericName) is required.' });
    }

    // 3. Strength
    if (!record.strength || typeof record.strength !== 'string' || record.strength.trim().length === 0) {
      errors.push({ field: 'strength', reason: 'Missing strength: Strength specification is required (e.g. 500 mg, 10 mg).' });
    }

    // 4. Dosage Form
    if (!record.dosageForm || typeof record.dosageForm !== 'string' || record.dosageForm.trim().length === 0) {
      errors.push({ field: 'dosageForm', reason: 'Missing dosage form: Dosage form is required (e.g. Tablet, Syrup, Injection).' });
    }

    // 5. Price validation
    if (record.unitPrice !== undefined && record.unitPrice !== null) {
      const priceNum = parseFloat(record.unitPrice);
      if (isNaN(priceNum) || priceNum < 0) {
        errors.push({ field: 'unitPrice', reason: 'Invalid negative unit price: Unit price must be a non-negative number.' });
      }
    }

    // 6. Source Attribution Check
    const src = record.source || record.sourceName;
    if (!src || typeof src !== 'string' || src.trim().length < 2) {
      errors.push({ field: 'source', reason: 'Missing source: Source organization or document reference is required for medical traceability.' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // =========================================================================
  // Parsers & Source Adapters
  // =========================================================================

  /**
   * RFC-compliant CSV line parser handling quotes, commas, and escapes
   */
  static parseCsv(csvText) {
    if (!csvText || typeof csvText !== 'string') return [];
    const lines = [];
    let currentLine = [];
    let currentField = '';
    let inQuotes = false;

    // Detect delimiter from first row (comma, semicolon, or tab)
    const firstLine = csvText.split(/\r?\n/)[0] || '';
    let delimiter = ',';
    if (firstLine.includes('\t') && (firstLine.match(/\t/g) || []).length > (firstLine.match(/,/g) || []).length) {
      delimiter = '\t';
    } else if (firstLine.includes(';') && (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length) {
      delimiter = ';';
    }

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentField += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        currentLine.push(currentField.trim());
        currentField = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        currentLine.push(currentField.trim());
        if (currentLine.some(f => f.length > 0)) {
          lines.push(currentLine);
        }
        currentLine = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }

    if (currentField.length > 0 || currentLine.length > 0) {
      currentLine.push(currentField.trim());
      if (currentLine.some(f => f.length > 0)) {
        lines.push(currentLine);
      }
    }

    if (lines.length < 2) return [];

    // Map headers to normalized keys
    const rawHeaders = lines[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const rows = [];

    for (let r = 1; r < lines.length; r++) {
      const line = lines[r];
      const obj = {};
      rawHeaders.forEach((header, idx) => {
        const val = line[idx] || '';
        // Map common column aliases (specific matches first)
        if (header.includes('sourcerecordid') || header === 'id' || header.includes('recordid')) obj.sourceRecordId = val;
        else if (header.includes('source') || header === 'provenance') obj.source = val;
        else if (header.includes('brand') || header === 'name' || header === 'tradename') obj.brandName = val;
        else if (header.includes('generic') || header === 'inn') obj.genericName = val;
        else if (header.includes('strength') || header === 'dose') obj.strength = val;
        else if (header.includes('dosageform') || header === 'form' || header === 'type') obj.dosageForm = val;
        else if (header.includes('manufacturer') || header.includes('company')) obj.manufacturerName = val;
        else if (header.includes('pack') || header === 'packsize') obj.packInfo = val;
        else if (header.includes('price') || header === 'unitprice') obj.unitPrice = val;
        else if (header.includes('prescription') || header === 'otc') obj.prescriptionStatus = val;
        else if (header.includes('dar') || header.includes('reg') || header === 'registration') obj.registrationNumber = val;
        else if (header.includes('route')) obj.route = val;
        else obj[header] = val;
      });
      rows.push(obj);
    }

    return rows;
  }

  /**
   * JSON dataset parser supporting both direct array and object with data/items/records
   */
  static parseJson(jsonStringOrObj) {
    let data = jsonStringOrObj;
    if (typeof jsonStringOrObj === 'string') {
      try {
        data = JSON.parse(jsonStringOrObj);
      } catch (e) {
        throw new Error(`JSON parse failure: ${e.message}`);
      }
    }

    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      if (Array.isArray(data.brands)) return data.brands;
      if (Array.isArray(data.records)) return data.records;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.items)) return data.items;
      if (Array.isArray(data.drugs)) return data.drugs;
    }

    throw new Error('JSON format invalid: expected an array of drug records or an object containing a records/data array.');
  }

  /**
   * Excel / Tabular file parser
   * Handles CSV formatted spreadsheets and tabular text exports
   */
  static parseExcel(fileBufferOrText) {
    let text = '';
    if (Buffer.isBuffer(fileBufferOrText)) {
      text = fileBufferOrText.toString('utf-8');
    } else {
      text = String(fileBufferOrText);
    }

    // For CSV/Tabular exports, use robust parseCsv
    return this.parseCsv(text);
  }

  /**
   * Paginated REST API Adapter
   * Follows nextPage / nextCursor / offset with exponential backoff and rate limit delay
   */
  static async fetchFromRestApi({
    endpointUrl,
    authToken = '',
    customHeaders = {},
    cursorParam = 'cursor',
    pageParam = 'page',
    limitParam = 'limit',
    batchSize = 250,
    maxPages = 50,
    rateLimitDelayMs = 250
  }) {
    const allRecords = [];
    let currentCursor = null;
    let currentPage = 1;
    let hasMore = true;
    let pageCount = 0;

    while (hasMore && pageCount < maxPages) {
      pageCount++;

      // Construct paginated URL
      const url = new URL(endpointUrl);
      url.searchParams.set(limitParam, String(batchSize));
      if (currentCursor) {
        url.searchParams.set(cursorParam, currentCursor);
      } else {
        url.searchParams.set(pageParam, String(currentPage));
      }

      const headers = {
        'Accept': 'application/json',
        'User-Agent': 'MEDX-DrugReference-Ingestion/2.4',
        ...customHeaders
      };

      if (authToken) {
        headers['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
      }

      let response = null;
      let retries = 0;
      const maxRetries = 3;

      while (retries <= maxRetries) {
        try {
          response = await fetch(url.toString(), { headers });
          if (response.ok) break;

          if (response.status === 429) {
            // Rate limited: backoff exponentially
            const backoffTime = Math.pow(2, retries) * 1000;
            await new Promise(r => setTimeout(r, backoffTime));
            retries++;
          } else {
            throw new Error(`API responded with HTTP status ${response.status}: ${response.statusText}`);
          }
        } catch (err) {
          retries++;
          if (retries > maxRetries) throw err;
          await new Promise(r => setTimeout(r, Math.pow(2, retries) * 500));
        }
      }

      const json = await response.json();
      const records = Array.isArray(json) ? json : (json.data || json.records || json.items || json.brands || []);

      if (!records || records.length === 0) {
        hasMore = false;
        break;
      }

      allRecords.push(...records);

      // Extract next cursor or page indicator
      if (json.nextCursor) {
        currentCursor = json.nextCursor;
      } else if (json.next_cursor) {
        currentCursor = json.next_cursor;
      } else if (json.pagination?.nextCursor) {
        currentCursor = json.pagination.nextCursor;
      } else if (json.nextPage || json.hasMore === true || records.length >= batchSize) {
        currentPage++;
      } else {
        hasMore = false;
      }

      // Respect source rate limits
      if (rateLimitDelayMs > 0) {
        await new Promise(r => setTimeout(r, rateLimitDelayMs));
      }
    }

    return {
      records: allRecords,
      totalPagesFetched: pageCount,
      lastCursor: currentCursor
    };
  }

  // =========================================================================
  // Ingestion Pipeline with Atomic Batches & Upsert Logic
  // =========================================================================

  /**
   * Start a managed import job
   */
  static async startImportJob(options = {}) {
    const {
      adapterType = 'json', // 'rest_api' | 'rest' | 'csv' | 'excel' | 'json' | 'manual'
      sourceName = 'Official Government / Verified Source',
      sourceLicence = 'Open Government / Permitted Institutional Use',
      records = [],
      data,
      filePath,
      restConfig = null,
      apiConfig = null,
      batchSize = 250,
      dryRun = false,
      resumeJobId = null,
      adminUser = { id: 'admin', name: 'System Administrator' },
      initiatedBy
    } = options;

    const db = DrugService.loadDb();
    const existingGenerics = db.generics || [];
    const existingManufacturers = db.manufacturers || [];

    const jobId = resumeJobId || `job-import-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const allJobs = this.loadJobs();
    let job = allJobs.find(j => j.id === jobId);

    if (!job) {
      job = {
        id: jobId,
        adapterType,
        sourceName,
        sourceLicence,
        status: 'running',
        dryRun,
        batchSize: Math.max(50, Math.min(500, batchSize)),
        totalRecords: 0,
        processedRows: 0,
        inserted: 0,
        updated: 0,
        unchanged: 0,
        skipped: 0,
        failed: 0,
        cursor: null,
        startedAt: new Date().toISOString(),
        completedAt: null,
        initiatedBy: (typeof adminUser === 'string' ? adminUser : adminUser?.name) || initiatedBy || 'Administrator',
        summary: ''
      };
      allJobs.unshift(job);
    } else {
      job.status = 'running';
    }

    this.saveJobs(allJobs);

    // If REST API adapter, fetch records first
    let rawRecords = (records && records.length > 0) ? records : (data !== undefined ? data : []);
    if (typeof rawRecords === 'string') {
      if (adapterType === 'csv') {
        rawRecords = this.parseCsv(rawRecords);
      } else {
        try {
          rawRecords = JSON.parse(rawRecords);
        } catch (e) {
          rawRecords = [];
        }
      }
    } else if (filePath && fs.existsSync(filePath)) {
      if (adapterType === 'csv' || filePath.endsWith('.csv')) {
        rawRecords = this.parseCsv(fs.readFileSync(filePath, 'utf-8'));
      } else {
        rawRecords = this.parseJsonChunks(filePath);
      }
    }

    const restCfg = restConfig || apiConfig;
    if ((adapterType === 'rest_api' || adapterType === 'rest') && restCfg && (restCfg.endpointUrl || restCfg.endpoint)) {
      try {
        const fetchResult = await this.fetchFromRestApi({
          endpointUrl: restCfg.endpointUrl || restCfg.endpoint,
          authToken: restCfg.authToken || (restCfg.authHeader ? restCfg.authHeader.replace(/^Bearer\s+/i, '') : undefined),
          customHeaders: restCfg.customHeaders,
          cursorParam: restCfg.cursorParam || 'cursor',
          pageParam: restCfg.pageParam || 'page',
          batchSize: job.batchSize,
          maxPages: restCfg.maxPages || 50,
          rateLimitDelayMs: restCfg.rateLimitDelayMs || 250
        });
        rawRecords = fetchResult.records;
        job.cursor = fetchResult.lastCursor;
      } catch (err) {
        job.status = 'failed';
        job.summary = `REST API Ingestion failed: ${err.message}`;
        this.saveJobs(allJobs);
        throw err;
      }
    }

    if (!Array.isArray(rawRecords)) {
      rawRecords = [];
    }

    job.totalRecords = rawRecords.length;

    // Load existing errors for this job or initialize
    const allErrors = this.loadErrors();
    const jobErrors = allErrors.filter(e => e.jobId === jobId);

    // Build lookup index for existing brands to support O(1) upsert
    // Index by: sourceRecordId AND composite key
    const sourceIdMap = new Map();
    const compositeMap = new Map();

    (db.brands || []).forEach(b => {
      if (b.sourceRecordId) {
        sourceIdMap.set(String(b.sourceRecordId).toLowerCase(), b);
      }
      const compKey = this.generateCompositeKey(b);
      compositeMap.set(compKey, b);
    });

    // Start processing in batches
    const startRow = job.processedRows || 0;
    const batchSizeToUse = job.batchSize;
    let currentBatch = [];
    const modifiedBrands = [...(db.brands || [])];
    const newManufacturers = [...(db.manufacturers || [])];

    for (let i = startRow; i < rawRecords.length; i++) {
      const raw = rawRecords[i];
      const rowNum = i + 1;

      // 1. Normalize Record
      const brandName = this.normalizeText(raw.brandName);
      const strength = this.normalizeStrength(raw.strength);
      const dosageForm = this.normalizeDosageForm(raw.dosageForm);
      const mfgName = this.normalizeText(raw.manufacturerName || raw.company || 'Square Pharmaceuticals PLC');
      const mfgId = this.slugify(raw.manufacturerId || mfgName);

      // Resolve generic
      const genIdentifier = (raw.genericId || raw.genericName || '').trim().toLowerCase();
      const matchedGen = existingGenerics.find(g =>
        g.id.toLowerCase() === genIdentifier ||
        g.name.toLowerCase() === genIdentifier ||
        g.normalizedName?.toLowerCase() === genIdentifier
      );

      const normalizedRecord = {
        ...raw,
        brandName,
        strength,
        dosageForm,
        manufacturerId: mfgId,
        manufacturerName: mfgName,
        genericId: matchedGen ? matchedGen.id : (raw.genericId || this.slugify(raw.genericName || '')),
        source: raw.source || sourceName,
        sourceRecordId: raw.sourceRecordId || raw.id || null
      };

      // 2. Validate Record
      const validation = this.validateBrandRecord(normalizedRecord, existingGenerics, existingManufacturers);
      if (!validation.isValid) {
        job.failed++;
        allErrors.push({
          id: `err-${jobId}-${rowNum}`,
          jobId,
          rowNumber: rowNum,
          rawData: JSON.stringify(raw),
          field: validation.errors.map(e => e.field).join(', '),
          reason: validation.errors.map(e => e.reason).join(' | '),
          rejectedAt: new Date().toISOString()
        });
        job.processedRows = rowNum;
        continue;
      }

      // Ensure generic exists or register
      let genObj = existingGenerics.find(g =>
        g.id.toLowerCase() === normalizedRecord.genericId.toLowerCase() ||
        g.name.toLowerCase() === (raw.genericName || '').toLowerCase()
      );
      if (!genObj) {
        const slugId = normalizedRecord.genericId;
        genObj = {
          id: slugId,
          name: raw.genericName || this.normalizeText(slugId.replace(/-/g, ' ')),
          normalizedName: slugId,
          therapeuticClass: raw.therapeuticClass || 'General Medicine',
          therapeuticClassId: this.slugify(raw.therapeuticClass || 'general-medicine'),
          pharmacologicalClass: raw.pharmacologicalClass || 'Pharmaceutical Active Substance (Pending Monograph)',
          prescriptionStatus: raw.prescriptionStatus || 'POM',
          atcCode: '',
          bmdcCurriculumPhase: '',
          mechanismOfAction: '',
          receptorOrTarget: '',
          indications: [],
          contraindications: [],
          dosageGuidance: { adult: '', routes: [raw.route || 'Oral'] },
          doseAdjustment: { renal: '', hepatic: '' },
          adverseEffects: { common: [], uncommon: [], rare: [], seriousWarnings: [] },
          precautions: [],
          monitoringRequirements: [],
          foodInteractions: '',
          pregnancyInfo: { category: '', details: '' },
          breastfeedingInfo: { safety: 'insufficient_data', details: '' },
          paediatricConsiderations: '',
          geriatricConsiderations: '',
          overdoseInformation: { symptoms: '', management: '' },
          storageInformation: '',
          sources: [{ organization: sourceName, title: 'Registered Ingestion Catalog', url: '', publicationDate: new Date().toISOString() }],
          medicalReview: {
            status: 'imported',
            reviewerName: '',
            reviewerCredentials: '',
            reviewDate: '',
            contentVersion: '1.0-imported'
          },
          bilingualNotes: { classBn: '', mechanismSummaryBn: '', patientCounsellingBn: '', criticalWarningBn: '' }
        };
        existingGenerics.push(genObj);
        db.generics.push(genObj);
      }

      // Ensure manufacturer exists or track new
      let mfgObj = newManufacturers.find(m => m.id === mfgId);
      if (!mfgObj) {
        mfgObj = {
          id: mfgId,
          name: mfgName,
          slug: mfgId,
          country: 'Bangladesh',
          website: '',
          active: true
        };
        newManufacturers.push(mfgObj);
      }

      // 3. Upsert Evaluation (Composite Key or Source ID)
      const compKey = this.generateCompositeKey(normalizedRecord);
      const existingBrand = (normalizedRecord.sourceRecordId && sourceIdMap.get(String(normalizedRecord.sourceRecordId).toLowerCase())) ||
                            compositeMap.get(compKey);

      const priceAmount = raw.unitPrice ? parseFloat(raw.unitPrice) : (raw.verifiedPrice?.amount || undefined);
      const verifiedPriceObj = priceAmount !== undefined ? {
        amount: priceAmount,
        unit: 'unit',
        source: sourceName,
        verifiedDate: new Date().toISOString().split('T')[0]
      } : undefined;

      const brandSlug = `${this.slugify(brandName)}-${this.slugify(strength)}-${this.slugify(dosageForm)}`;
      const brandId = raw.id || brandSlug;

      if (existingBrand) {
        // Check if anything actually changed
        const isChanged = 
          existingBrand.strength !== strength ||
          existingBrand.dosageForm !== dosageForm ||
          existingBrand.packInfo !== (raw.packInfo || existingBrand.packInfo) ||
          (verifiedPriceObj && existingBrand.verifiedPrice?.amount !== verifiedPriceObj.amount);

        if (isChanged) {
          if (!dryRun) {
            existingBrand.brandName = brandName;
            existingBrand.strength = strength;
            existingBrand.dosageForm = dosageForm;
            existingBrand.packInfo = raw.packInfo || existingBrand.packInfo;
            if (verifiedPriceObj) existingBrand.verifiedPrice = verifiedPriceObj;
            existingBrand.lastVerifiedDate = new Date().toISOString().split('T')[0];
            existingBrand.verifiedSource = sourceName;
          }
          job.updated++;
        } else {
          job.unchanged++;
        }
      } else {
        // Insert new brand record
        const resolvedGenericId = genObj ? genObj.id : (matchedGen ? matchedGen.id : normalizedRecord.genericId);
        const newBrand = {
          id: `${resolvedGenericId}-${this.slugify(dosageForm)}-${this.slugify(brandName)}`,
          genericId: resolvedGenericId,
          brandName,
          brandNameBn: raw.brandNameBn || '',
          manufacturerId: mfgId,
          manufacturerName: mfgName,
          dosageForm,
          strength,
          packInfo: raw.packInfo || "Standard Pack",
          registrationStatus: raw.registrationNumber ? `DGDA Reg: ${raw.registrationNumber}` : 'DGDA Registered',
          availability: 'widely_available',
          verifiedSource: sourceName,
          lastVerifiedDate: new Date().toISOString().split('T')[0],
          verifiedPrice: verifiedPriceObj,
          sourceRecordId: normalizedRecord.sourceRecordId
        };

        if (!dryRun) {
          modifiedBrands.push(newBrand);
          sourceIdMap.set(String(newBrand.id).toLowerCase(), newBrand);
          compositeMap.set(compKey, newBrand);
        }
        job.inserted++;
      }

      job.processedRows = rowNum;

      // Batch transaction commit point
      if (rowNum % batchSizeToUse === 0 || rowNum === rawRecords.length) {
        if (!dryRun) {
          db.brands = modifiedBrands;
          db.manufacturers = newManufacturers;
          DrugService.saveDb(db);
        }
        this.saveJobs(allJobs);
        this.saveErrors(allErrors);
      }
    }

    job.status = 'completed';
    job.completedAt = new Date().toISOString();
    job.summary = `${dryRun ? '[DRY RUN] ' : ''}Processed ${job.processedRows} records: ${job.inserted} inserted, ${job.updated} updated, ${job.unchanged} unchanged, ${job.failed} failed.`;

    // Add audit log for governance
    if (!dryRun && (job.inserted > 0 || job.updated > 0)) {
      db.auditLogs = db.auditLogs || [];
      db.auditLogs.unshift({
        id: `audit-${jobId}`,
        entityType: 'import_job',
        entityId: jobId,
        editorName: adminUser.name || 'System Administrator',
        editorRole: 'Data Quality / Administrative Editor',
        timestamp: new Date().toISOString(),
        action: 'import_upsert',
        reason: job.summary
      });
      DrugService.saveDb(db);
    }

    this.saveJobs(allJobs);
    this.saveErrors(allErrors);

    return job;
  }

  /**
   * Generate CSV error report for an import job
   */
  static getJobErrorsCsv(jobId) {
    const allErrors = this.loadErrors().filter(e => e.jobId === jobId);
    const headers = ['id', 'jobId', 'rowNumber', 'field', 'reason', 'rejectedAt', 'rawData'];
    const rows = allErrors.map(e => [
      `"${e.id}"`,
      `"${e.jobId}"`,
      e.rowNumber,
      `"${(e.field || '').replace(/"/g, '""')}"`,
      `"${(e.reason || '').replace(/"/g, '""')}"`,
      `"${e.rejectedAt}"`,
      `"${(e.rawData || '').replace(/"/g, '""')}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  /**
   * Retry failed rows from an interrupted or errored job
   */
  static async retryJobErrors(jobId, correctionsMap = {}) {
    const allErrors = this.loadErrors();
    const jobErrors = allErrors.filter(e => e.jobId === jobId);
    if (jobErrors.length === 0) {
      return { success: true, message: 'No failed records found for this job.', count: 0 };
    }

    const correctedRecords = [];
    jobErrors.forEach(err => {
      try {
        const raw = JSON.parse(err.rawData);
        const correction = correctionsMap[err.id] || correctionsMap[err.rowNumber];
        const fixed = correction ? { ...raw, ...correction } : raw;
        correctedRecords.push(fixed);
      } catch (e) {}
    });

    return this.startImportJob({
      adapterType: 'manual',
      sourceName: `Retry of Job ${jobId}`,
      records: correctedRecords,
      dryRun: false
    });
  }

  /**
   * Archive or delete a brand record with mandatory confirmation safety check
   */
  static archiveBrandRecord(brandId, confirmationFlag, reason = '', adminUser = { name: 'Admin' }) {
    if (confirmationFlag !== true && confirmationFlag !== 'CONFIRM_ARCHIVE') {
      throw new Error('Administrative confirmation required: You must explicitly confirm archive or deletion operations to prevent accidental data loss.');
    }

    const db = DrugService.loadDb();
    const idx = (db.brands || []).findIndex(b => b.id.toLowerCase() === brandId.trim().toLowerCase());
    if (idx === -1) {
      throw new Error(`Brand '${brandId}' not found.`);
    }

    const brand = db.brands[idx];
    brand.availability = 'discontinued';
    brand.activeStatus = 'archived';
    brand.registrationStatus = 'Archived / Suspended';

    // Governance audit log
    db.auditLogs = db.auditLogs || [];
    db.auditLogs.unshift({
      id: `audit-archive-${Date.now()}`,
      entityType: 'brand',
      entityId: brand.id,
      editorName: adminUser.name || 'Administrator',
      editorRole: 'Administrative Editor',
      timestamp: new Date().toISOString(),
      action: 'archive',
      reason: reason || 'Administrative archive confirmed.'
    });

    DrugService.saveDb(db);
    return { success: true, brand };
  }
}
