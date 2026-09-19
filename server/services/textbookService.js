import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const CATALOG_FILE = path.join(DATA_DIR, 'textbooks_catalog.json');
const JOBS_FILE = path.join(DATA_DIR, 'textbook_import_jobs.json');
const PRIVATE_UPLOADS_FILE = path.join(DATA_DIR, 'textbook_private_uploads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class TextbookService {
  static loadCatalog() {
    try {
      if (fs.existsSync(CATALOG_FILE)) {
        return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load textbooks_catalog.json, defaulting to empty array', e);
    }
    return [];
  }

  static saveCatalog(catalog) {
    try {
      fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save textbooks catalog', e);
      return false;
    }
  }

  static loadJobs() {
    try {
      if (fs.existsSync(JOBS_FILE)) {
        return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load jobs file', e);
    }
    return [];
  }

  static saveJobs(jobs) {
    try {
      fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save jobs file', e);
      return false;
    }
  }

  static loadPrivateUploads() {
    try {
      if (fs.existsSync(PRIVATE_UPLOADS_FILE)) {
        return JSON.parse(fs.readFileSync(PRIVATE_UPLOADS_FILE, 'utf-8'));
      }
    } catch (e) {
      console.warn('Failed to load private uploads file', e);
    }
    return [];
  }

  static savePrivateUploads(uploads) {
    try {
      fs.writeFileSync(PRIVATE_UPLOADS_FILE, JSON.stringify(uploads, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed to save private uploads file', e);
      return false;
    }
  }

  // =========================================================================
  // Catalog Queries & Filtering
  // =========================================================================
  static getTextbooks({ query = '', phase = 'all', subject = 'all', accessType = 'all', userId = null, includePrivate = false }) {
    let books = this.loadCatalog();

    if (includePrivate && userId) {
      const privateUploads = this.loadPrivateUploads().filter(u => u.ownerId === userId);
      books = [...books, ...privateUploads];
    }

    if (phase && phase !== 'all') {
      books = books.filter(b => b.phase === phase);
    }
    if (subject && subject !== 'all') {
      books = books.filter(b => b.subjectId === subject);
    }
    if (accessType && accessType !== 'all') {
      books = books.filter(b => b.accessType === accessType);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      const terms = q.split(/\s+/).filter(Boolean);
      books = books.filter(b => {
        const text = [
          b.title,
          b.titleBn || '',
          b.publisher,
          b.edition,
          b.isbn13 || '',
          b.subjectId,
          ...(b.authors || []),
          ...(b.editors || []),
          ...(b.connectedTopicIds || []),
          ...(b.tableOfContents || []).map(t => t.title + ' ' + (t.titleBn || ''))
        ].join(' ').toLowerCase();
        return terms.every(term => text.includes(term));
      });
    }

    return books;
  }

  static getTextbookById(id, userId = null) {
    const catalog = this.loadCatalog();
    const found = catalog.find(b => b.id === id);
    if (found) return found;

    if (userId) {
      const privateUploads = this.loadPrivateUploads();
      const privateBook = privateUploads.find(b => b.id === id && b.ownerId === userId);
      if (privateBook) return privateBook;
    }
    return null;
  }

  // =========================================================================
  // SSRF Protection Engine
  // =========================================================================
  static validateUrlSafety(urlStr) {
    try {
      const parsed = new URL(urlStr);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { safe: false, reason: 'Invalid protocol. Only HTTP and HTTPS are permitted.' };
      }

      const hostname = parsed.hostname.toLowerCase();

      // Block localhost, loopbacks, and local domain patterns
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1' ||
        hostname.endsWith('.localhost') ||
        hostname.endsWith('.local') ||
        hostname.endsWith('.internal')
      ) {
        return { safe: false, reason: 'SSRF blocked: Requests to localhost and local networks are strictly prohibited.' };
      }

      // Block AWS/GCP/Azure link-local cloud metadata service IP
      if (hostname === '169.254.169.254' || hostname.startsWith('169.254.')) {
        return { safe: false, reason: 'SSRF blocked: Requests to cloud metadata services are strictly prohibited.' };
      }

      // Block RFC 1918 Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
      const ipMatch = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
      if (ipMatch) {
        const oct1 = parseInt(ipMatch[1], 10);
        const oct2 = parseInt(ipMatch[2], 10);

        if (oct1 === 10) {
          return { safe: false, reason: 'SSRF blocked: Private network IP address (10.x.x.x) is prohibited.' };
        }
        if (oct1 === 172 && oct2 >= 16 && oct2 <= 31) {
          return { safe: false, reason: 'SSRF blocked: Private network IP address (172.16-31.x.x) is prohibited.' };
        }
        if (oct1 === 192 && oct2 === 168) {
          return { safe: false, reason: 'SSRF blocked: Private network IP address (192.168.x.x) is prohibited.' };
        }
        if (oct1 === 0 || oct1 === 127) {
          return { safe: false, reason: 'SSRF blocked: Reserved IP network address is prohibited.' };
        }
      }

      return { safe: true, parsedUrl: parsed };
    } catch (err) {
      return { safe: false, reason: 'Malformed URL: ' + err.message };
    }
  }

  // =========================================================================
  // Safe File Validation
  // =========================================================================
  static validateFilePayload({ fileName, fileSizeBytes, mimeType, fileBuffer = null }) {
    const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
    const ALLOWED_MIMES = [
      'application/pdf',
      'application/epub+zip',
      'text/plain',
      'text/markdown'
    ];

    if (!fileName || typeof fileName !== 'string') {
      return { valid: false, reason: 'Invalid file name.' };
    }

    if (!fileSizeBytes || fileSizeBytes <= 0) {
      return { valid: false, reason: 'File is empty (0 bytes).' };
    }

    if (fileSizeBytes > MAX_SIZE_BYTES) {
      return { valid: false, reason: `File size (${(fileSizeBytes / 1024 / 1024).toFixed(1)}MB) exceeds maximum permitted limit of 50MB.` };
    }

    const ext = path.extname(fileName).toLowerCase();
    const allowedExts = ['.pdf', '.epub', '.txt', '.md'];
    if (!allowedExts.includes(ext)) {
      return { valid: false, reason: `File extension '${ext}' is not supported. Only PDF, EPUB, TXT, and Markdown files are accepted.` };
    }

    if (mimeType && !ALLOWED_MIMES.includes(mimeType.toLowerCase())) {
      return { valid: false, reason: `Unsupported MIME type: '${mimeType}'.` };
    }

    // Simulated Antivirus / Malware signature scan
    if (fileBuffer) {
      const header = fileBuffer.slice(0, 4).toString('utf-8');
      if (header.includes('EICAR') || header.includes('MZ') && ext === '.pdf') {
        return { valid: false, reason: 'Security alert: Potentially malicious signature detected during scan.' };
      }
    }

    return { valid: true };
  }

  // =========================================================================
  // Deduplication Engine
  // =========================================================================
  static checkForDuplicate({ isbn13, title, edition }) {
    const catalog = this.loadCatalog();

    // 1. Exact ISBN-13 match
    if (isbn13) {
      const cleanIsbn = isbn13.replace(/[^0-9X]/gi, '');
      const match = catalog.find(b => b.isbn13 && b.isbn13.replace(/[^0-9X]/gi, '') === cleanIsbn);
      if (match) {
        return {
          isDuplicate: true,
          matchedBook: match,
          reason: `Duplicate detected: Existing textbook '${match.title}' has identical ISBN-13 (${match.isbn13}).`
        };
      }
    }

    // 2. Matching Title and Edition
    if (title && edition) {
      const cleanTitle = title.toLowerCase().trim();
      const cleanEd = edition.toLowerCase().trim();
      const match = catalog.find(b => 
        b.title.toLowerCase().trim() === cleanTitle && 
        b.edition.toLowerCase().trim() === cleanEd
      );
      if (match) {
        return {
          isDuplicate: true,
          matchedBook: match,
          reason: `Duplicate detected: '${match.title}' (${match.edition}) is already in the library catalog.`
        };
      }
    }

    return { isDuplicate: false };
  }

  // =========================================================================
  // Open Library / Bibliographic Metadata Fetcher
  // =========================================================================
  static async fetchOnlineMetadata(queryOrIsbn) {
    const catalog = this.loadCatalog();
    const clean = queryOrIsbn.trim();

    // Check if user passed an ISBN directly
    const isIsbn = /^[0-9-]{10,17}[0-9X]?$/i.test(clean);

    let apiUrl = '';
    if (isIsbn) {
      const digits = clean.replace(/[^0-9X]/gi, '');
      apiUrl = `https://openlibrary.org/search.json?isbn=${digits}&limit=3`;
    } else {
      const encoded = encodeURIComponent(clean);
      apiUrl = `https://openlibrary.org/search.json?q=${encoded}&limit=5`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Open Library API responded with HTTP status ${response.status}`);
      }

      const data = await response.json();
      const docs = data.docs || [];

      if (!docs.length) {
        // Fallback: search local verified catalog
        const localMatches = catalog.filter(b => 
          b.title.toLowerCase().includes(clean.toLowerCase()) ||
          b.authors.some(a => a.toLowerCase().includes(clean.toLowerCase())) ||
          (b.isbn13 && b.isbn13.includes(clean))
        );
        return {
          source: 'local_verified_repository',
          query: clean,
          results: localMatches.map(b => ({
            title: b.title,
            titleBn: b.titleBn,
            authors: b.authors,
            edition: b.edition,
            publicationYear: b.publicationYear,
            publisher: b.publisher,
            isbn13: b.isbn13,
            subjectId: b.subjectId,
            phase: b.phase,
            accessType: b.accessType,
            officialPublisherUrl: b.officialPublisherUrl,
            sourceUrl: b.sourceUrl,
            verified: true,
            isCatalogued: true,
            catalogId: b.id
          }))
        };
      }

      const results = docs.map(doc => {
        const foundIsbn = (doc.isbn || []).find(i => i.length === 13) || doc.isbn?.[0];
        const year = doc.first_publish_year || (doc.publish_year ? Math.max(...doc.publish_year) : 2020);
        const title = doc.title || clean;
        const authors = doc.author_name || ['Medical Faculty Author'];
        const publisher = (doc.publisher || [])[0] || 'Medical Academic Publisher';
        const coverId = doc.cover_i;
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : undefined;

        // Check if already in catalog
        const existing = catalog.find(b => 
          (foundIsbn && b.isbn13 === foundIsbn) || 
          b.title.toLowerCase() === title.toLowerCase()
        );

        return {
          title,
          authors,
          publicationYear: year,
          publisher,
          isbn13: foundIsbn,
          edition: 'Verified Edition',
          coverImageUrl: coverUrl,
          sourceUrl: `https://openlibrary.org${doc.key || ''}`,
          verified: true,
          isCatalogued: !!existing,
          catalogId: existing?.id
        };
      });

      return {
        source: 'open_library_api',
        query: clean,
        results
      };
    } catch (err) {
      clearTimeout(timeout);
      // Fallback to local verified catalog
      const localMatches = catalog.filter(b => 
        b.title.toLowerCase().includes(clean.toLowerCase()) ||
        b.authors.some(a => a.toLowerCase().includes(clean.toLowerCase())) ||
        (b.isbn13 && b.isbn13.includes(clean))
      );
      return {
        source: 'local_verified_repository (network fallback)',
        query: clean,
        warning: 'Live metadata API timed out or is rate-limited; displaying matching verified records from local registry.',
        results: localMatches.map(b => ({
          title: b.title,
          titleBn: b.titleBn,
          authors: b.authors,
          edition: b.edition,
          publicationYear: b.publicationYear,
          publisher: b.publisher,
          isbn13: b.isbn13,
          subjectId: b.subjectId,
          phase: b.phase,
          accessType: b.accessType,
          officialPublisherUrl: b.officialPublisherUrl,
          sourceUrl: b.sourceUrl,
          verified: true,
          isCatalogued: true,
          catalogId: b.id
        }))
      };
    }
  }

  // =========================================================================
  // Import Jobs Workflow
  // =========================================================================
  static submitJob({
    type,
    targetTitle,
    targetIsbn,
    sourceUrl,
    fileName,
    fileSizeBytes,
    mimeType,
    ownerId = 'std-bmdc-2026-0891',
    ownerRole = 'student',
    isPrivateUpload = false,
    extractedMetadata = null
  }) {
    // 1. Validate safety
    if (type === 'url_import' && sourceUrl) {
      const urlSafety = this.validateUrlSafety(sourceUrl);
      if (!urlSafety.safe) {
        throw new Error(urlSafety.reason);
      }
    }

    if (type === 'file_upload') {
      const fileSafety = this.validateFilePayload({ fileName, fileSizeBytes, mimeType });
      if (!fileSafety.valid) {
        throw new Error(fileSafety.reason);
      }
    }

    // 2. Deduplication check (for public library additions)
    if (!isPrivateUpload) {
      const dup = this.checkForDuplicate({
        isbn13: targetIsbn || extractedMetadata?.isbn13,
        title: targetTitle || extractedMetadata?.title,
        edition: extractedMetadata?.edition
      });
      if (dup.isDuplicate) {
        throw new Error(dup.reason);
      }
    }

    const jobs = this.loadJobs();
    const jobId = `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newJob = {
      id: jobId,
      type,
      status: 'queued',
      targetTitle: targetTitle || fileName || 'Medical Document Import',
      targetIsbn: targetIsbn || undefined,
      ownerId,
      ownerRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      retryCount: 0,
      maxRetries: 3,
      sourceUrl: sourceUrl || undefined,
      fileName: fileName || undefined,
      fileSizeBytes: fileSizeBytes || undefined,
      mimeType: mimeType || undefined,
      isPrivateUpload: !!isPrivateUpload,
      extractedMetadata: extractedMetadata || {},
      editorialReviewStatus: isPrivateUpload ? 'approved' : 'pending_review'
    };

    jobs.unshift(newJob);
    this.saveJobs(jobs);

    // Process job asynchronously
    this.processJob(jobId);

    return newJob;
  }

  static createImportJob(params) {
    return this.submitJob(params);
  }

  static processJobSync(jobId) {
    const jobs = this.loadJobs();
    const currentJob = jobs.find(j => j.id === jobId);
    if (!currentJob) return null;

    currentJob.status = 'processing';
    currentJob.updatedAt = new Date().toISOString();

    const isScanned = currentJob.fileName?.toLowerCase().includes('scanned') || false;
    const ocrScore = isScanned ? 78 : 98;

    const sections = [
      {
        id: `sec-${jobId}-01`,
        chapterNumber: 1,
        title: currentJob.targetTitle + ' — Chapter 1: Introduction & Fundamentals',
        pageIndex: 0,
        printedPageLabel: '1',
        ocrConfidence: ocrScore,
        isOcr: isScanned,
        isFlaggedLowConfidence: ocrScore < 80,
        previewAllowed: true,
        summary: 'Initial orientation, definitions, and foundational concepts for MBBS students.'
      },
      {
        id: `sec-${jobId}-02`,
        chapterNumber: 2,
        title: currentJob.targetTitle + ' — Chapter 2: Clinical Practice & Exam Correlates',
        pageIndex: 12,
        printedPageLabel: '13',
        ocrConfidence: 96,
        isOcr: isScanned,
        isFlaggedLowConfidence: false,
        previewAllowed: true,
        summary: 'Clinical procedures, high-yield examination notes, and BM&DC relevance.'
      }
    ];

    currentJob.extractedMetadata = {
      ...currentJob.extractedMetadata,
      id: `book-import-${jobId}`,
      title: currentJob.targetTitle,
      authors: currentJob.extractedMetadata?.authors || ['Medical Author'],
      edition: currentJob.extractedMetadata?.edition || 'Imported Edition',
      publicationYear: currentJob.extractedMetadata?.publicationYear || new Date().getFullYear(),
      publisher: currentJob.extractedMetadata?.publisher || 'Institutional Repository',
      isbn13: currentJob.targetIsbn || currentJob.extractedMetadata?.isbn13,
      subjectId: currentJob.extractedMetadata?.subjectId || 'medicine',
      phase: currentJob.extractedMetadata?.phase || 'phase-4',
      accessType: currentJob.isPrivateUpload ? 'read_in_medx' : 'preview_available',
      verificationDate: new Date().toISOString().split('T')[0],
      license: {
        licenseType: currentJob.isPrivateUpload ? 'Private Student Upload' : 'Institutional Educational Fair Use',
        attribution: `Imported by ${currentJob.ownerRole} (${currentJob.ownerId})`,
        allowedAudience: currentJob.isPrivateUpload ? 'private-owner' : 'undergraduate-mbbs',
        indexingPermitted: true,
        aiProcessingPermitted: true
      },
      tableOfContents: sections,
      connectedTopicIds: ['heart-failure'],
      isUserUpload: true,
      ownerId: currentJob.ownerId,
      isPrivate: currentJob.isPrivateUpload
    };

    if (currentJob.isPrivateUpload) {
      currentJob.status = 'published';
      currentJob.completedAt = new Date().toISOString();
      const privates = this.loadPrivateUploads();
      privates.unshift(currentJob.extractedMetadata);
      this.savePrivateUploads(privates);
    } else {
      currentJob.status = 'awaiting_review';
    }

    this.saveJobs(jobs);
    return currentJob;
  }

  static processJob(jobId) {
    setTimeout(() => {
      const jobs = this.loadJobs();
      const job = jobs.find(j => j.id === jobId);
      if (!job) return;

      job.status = 'processing';
      job.updatedAt = new Date().toISOString();
      this.saveJobs(jobs);

      // Simulate parsing, indexing, and OCR pipeline (1.2 seconds)
      setTimeout(() => {
        const freshJobs = this.loadJobs();
        const currentJob = freshJobs.find(j => j.id === jobId);
        if (!currentJob) return;

        // Perform simulated OCR analysis
        const isScanned = currentJob.fileName?.toLowerCase().includes('scanned') || false;
        const ocrScore = isScanned ? 78 : 98; // If scanned, flag if <80

        const sections = [
          {
            id: `sec-${jobId}-01`,
            chapterNumber: 1,
            title: currentJob.targetTitle + ' — Chapter 1: Introduction & Fundamentals',
            pageIndex: 0,
            printedPageLabel: '1',
            ocrConfidence: ocrScore,
            isOcr: isScanned,
            isFlaggedLowConfidence: ocrScore < 80,
            previewAllowed: true,
            summary: 'Initial orientation, definitions, and foundational concepts for MBBS students.'
          },
          {
            id: `sec-${jobId}-02`,
            chapterNumber: 2,
            title: currentJob.targetTitle + ' — Chapter 2: Clinical Practice & Exam Correlates',
            pageIndex: 12,
            printedPageLabel: '13',
            ocrConfidence: 96,
            isOcr: isScanned,
            isFlaggedLowConfidence: false,
            previewAllowed: true,
            summary: 'Clinical procedures, high-yield examination notes, and BM&DC relevance.'
          }
        ];

        currentJob.extractedMetadata = {
          ...currentJob.extractedMetadata,
          id: `book-import-${jobId}`,
          title: currentJob.targetTitle,
          authors: currentJob.extractedMetadata?.authors || ['Medical Author'],
          edition: currentJob.extractedMetadata?.edition || 'Imported Edition',
          publicationYear: currentJob.extractedMetadata?.publicationYear || new Date().getFullYear(),
          publisher: currentJob.extractedMetadata?.publisher || 'Institutional Repository',
          isbn13: currentJob.targetIsbn || currentJob.extractedMetadata?.isbn13,
          subjectId: currentJob.extractedMetadata?.subjectId || 'medicine',
          phase: currentJob.extractedMetadata?.phase || 'Phase 4',
          accessType: currentJob.isPrivateUpload ? 'read_in_medx' : 'preview_available',
          verificationDate: new Date().toISOString().split('T')[0],
          license: {
            licenseType: currentJob.isPrivateUpload ? 'Private Student Upload' : 'Institutional Educational Fair Use',
            attribution: `Imported by ${currentJob.ownerRole} (${currentJob.ownerId})`,
            allowedAudience: currentJob.isPrivateUpload ? 'private-owner' : 'undergraduate-mbbs',
            indexingPermitted: true,
            aiProcessingPermitted: true
          },
          tableOfContents: sections,
          connectedTopicIds: ['heart-failure'],
          isUserUpload: true,
          ownerId: currentJob.ownerId,
          isPrivate: currentJob.isPrivateUpload
        };

        if (currentJob.isPrivateUpload) {
          currentJob.status = 'published';
          currentJob.completedAt = new Date().toISOString();

          // Save to private uploads collection
          const privateUploads = this.loadPrivateUploads();
          privateUploads.unshift(currentJob.extractedMetadata);
          this.savePrivateUploads(privateUploads);
        } else {
          // Public library import requires faculty editorial review
          currentJob.status = 'awaiting_review';
          currentJob.editorialReviewStatus = 'pending_review';
        }

        currentJob.updatedAt = new Date().toISOString();
        this.saveJobs(freshJobs);
      }, 1200);
    }, 150);
  }

  static retryJob(jobId) {
    const jobs = this.loadJobs();
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error('Import job not found.');
    }

    if (job.retryCount >= job.maxRetries) {
      throw new Error(`Maximum retries (${job.maxRetries}) reached for this job.`);
    }

    job.retryCount += 1;
    job.status = 'queued';
    job.failureReason = undefined;
    job.updatedAt = new Date().toISOString();
    this.saveJobs(jobs);

    this.processJob(jobId);
    return job;
  }

  static reviewJob(jobId, action, reviewerNotes, reviewer) {
    const jobs = this.loadJobs();
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    if (action === 'approve') {
      job.status = 'published';
      job.editorialReviewStatus = 'approved';
      job.reviewerId = reviewer?.name || 'Faculty Medical Reviewer';
      job.reviewNotes = reviewerNotes || 'Approved for MBBS student reference library.';
      job.completedAt = new Date().toISOString();

      // Add to public catalog
      if (job.extractedMetadata) {
        const catalog = this.loadCatalog();
        catalog.unshift(job.extractedMetadata);
        this.saveCatalog(catalog);
      }
    } else if (action === 'reject') {
      job.status = 'failed';
      job.editorialReviewStatus = 'rejected';
      job.failureReason = reviewerNotes || 'Declined during medical faculty review.';
      job.reviewerId = reviewer?.name;
    }

    job.updatedAt = new Date().toISOString();
    this.saveJobs(jobs);
    return job;
  }

  static getJobs({ ownerId = null, role = 'student' }) {
    const jobs = this.loadJobs();
    if (role === 'faculty' || role === 'admin' || role === 'reviewer') {
      return jobs;
    }
    return jobs.filter(j => j.ownerId === ownerId);
  }

  static getUserUploads(userId) {
    const uploads = this.loadPrivateUploads();
    return uploads.filter(u => u.ownerId === userId);
  }
}
