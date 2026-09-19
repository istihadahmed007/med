import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Import server service directly
import { TextbookService } from '../server/services/textbookService.js';

test('Textbook Catalog contains 96 verified MBBS records across all 11 subject categories', () => {
  const catalog = TextbookService.loadCatalog();
  assert.equal(catalog.length, 96, 'Catalog must have exactly 96 verified records');

  const subjects = new Set(catalog.map(b => b.subjectId));
  const expectedSubjects = [
    'anatomy',
    'physiology',
    'biochemistry',
    'pharmacology',
    'forensic-medicine',
    'community-medicine',
    'pathology',
    'microbiology',
    'medicine',
    'surgery',
    'obstetrics-gynaecology',
    'paediatrics',
    'ent',
    'ophthalmology',
    'orthopaedics'
  ];

  for (const subj of expectedSubjects) {
    assert.ok(subjects.has(subj), `Catalog must contain textbooks for subject: ${subj}`);
  }

  // Check required bibliographic fields on all records
  for (const book of catalog) {
    assert.ok(book.id, 'Book ID is required');
    assert.ok(book.title, `Title is required for ${book.id}`);
    assert.ok(book.authors && book.authors.length > 0, `Authors required for ${book.id}`);
    assert.ok(book.edition, `Edition required for ${book.id}`);
    assert.ok(book.publicationYear > 1950, `Valid publication year required for ${book.id}`);
    assert.ok(book.publisher, `Publisher required for ${book.id}`);
    assert.ok(book.subjectId, `Subject ID required for ${book.id}`);
    assert.ok(book.phase, `Curriculum Phase required for ${book.id}`);
    assert.ok(book.officialPublisherUrl, `Official publisher URL required for ${book.id}`);
    assert.ok(book.verificationDate, `Verification date required for ${book.id}`);
    assert.ok(['read_in_medx', 'preview_available', 'external_access'].includes(book.accessType), `Valid accessType for ${book.id}`);
  }
});

test('Accurate access states: read_in_medx, preview_available, and external_access counts', () => {
  const catalog = TextbookService.loadCatalog();
  const readInMedx = catalog.filter(b => b.accessType === 'read_in_medx');
  const preview = catalog.filter(b => b.accessType === 'preview_available');
  const external = catalog.filter(b => b.accessType === 'external_access');

  assert.equal(readInMedx.length, 2, '2 titles permitted for full-text in-app hosting');
  assert.ok(readInMedx.some(b => b.id === 'openstax-anatomy-and-physiology-2e'), 'OpenStax A&P 2e is open-access');
  assert.ok(readInMedx.some(b => b.id === 'dghs-bangladesh-dengue-guideline-2024'), 'DGHS National Dengue Guidelines 2024 is public domain open-access');

  // Verify licensed sections have dual page indexing and licensed flag
  for (const book of readInMedx) {
    assert.ok(book.tableOfContents && book.tableOfContents.length > 0, `${book.id} must have table of contents sections`);
    for (const sec of book.tableOfContents) {
      assert.ok(typeof sec.pageIndex === 'number', `Digital page index must be a number in ${sec.id}`);
      assert.ok(sec.printedPageLabel, `Printed page label must be present in ${sec.id}`);
      assert.ok(sec.content && sec.content.length > 50, `Section content must be populated in ${sec.id}`);
    }
  }

  assert.equal(preview.length, 3, '3 preview-available titles with authorized limits');
  assert.equal(external.length, 91, '91 external verified publisher/institution entries');
});

test('ISBN deduplication and edition separation', () => {
  const catalog = TextbookService.loadCatalog();
  const isbnMap = new Map();

  for (const book of catalog) {
    if (book.isbn13) {
      if (isbnMap.has(book.isbn13)) {
        const prev = isbnMap.get(book.isbn13);
        assert.fail(`Duplicate ISBN-13 found: ${book.isbn13} on "${book.title}" and "${prev.title}"`);
      }
      isbnMap.set(book.isbn13, book);
    }
  }
  assert.ok(isbnMap.size >= 80, 'At least 80 unique verified ISBN-13 records present');
});

test('SSRF Protection engine strictly rejects private networks, localhost and cloud metadata', () => {
  const disallowedUrls = [
    'http://localhost:3000/api/keys',
    'http://127.0.0.1:8080/admin',
    'http://127.0.0.1:22',
    'http://::1/test',
    'http://internal.service.local/dump',
    'http://169.254.169.254/latest/meta-data/',
    'http://169.254.1.1/secret',
    'http://10.0.0.5/api/docs',
    'http://172.16.0.22/database',
    'http://172.31.255.254/server',
    'http://192.168.1.1/router',
    'http://192.168.100.50/private.pdf',
    'ftp://public.mirror.org/book.pdf',
    'file:///C:/Windows/System32/drivers/etc/hosts',
    'gopher://evil.com/'
  ];

  for (const url of disallowedUrls) {
    const res = TextbookService.validateUrlSafety(url);
    assert.equal(res.safe, false, `URL should be blocked for SSRF: ${url}`);
  }

  const allowedUrls = [
    'https://openlibrary.org/api/books?bibkeys=ISBN:9780702077050',
    'https://openstax.org/books/anatomy-and-physiology-2e',
    'https://dghs.gov.bd/guidelines/dengue-2024.pdf',
    'https://shop.elsevier.com/books/guyton-and-hall-textbook-of-medical-physiology/hall/978-0-323-59712-8'
  ];

  for (const url of allowedUrls) {
    const res = TextbookService.validateUrlSafety(url);
    assert.equal(res.safe, true, `Legitimate public URL should be allowed: ${url}`);
  }
});

test('Safe file validation protects against oversized files and executable payloads', () => {
  // Safe PDF
  const safePdf = TextbookService.validateFilePayload({
    fileName: 'student_anatomy_notes.pdf',
    fileSizeBytes: 1024 * 1024 * 5, // 5MB
    mimeType: 'application/pdf'
  });
  assert.equal(safePdf.valid, true);

  // Oversized file (>50MB)
  const oversized = TextbookService.validateFilePayload({
    fileName: 'large_atlas.pdf',
    fileSizeBytes: 60 * 1024 * 1024, // 60MB
    mimeType: 'application/pdf'
  });
  assert.equal(oversized.valid, false);
  assert.ok(oversized.reason.includes('exceeds maximum permitted limit of 50MB'));

  // Executable script disguised as PDF
  const dangerousScript = TextbookService.validateFilePayload({
    fileName: 'trojan_installer.pdf.exe',
    fileSizeBytes: 1024,
    mimeType: 'application/octet-stream'
  });
  assert.equal(dangerousScript.valid, false);

  // Magic byte checking for ELF/Windows Executable
  const exeBuffer = Buffer.from([0x4D, 0x5A, 0x90, 0x00]); // MZ header
  const fakePdf = TextbookService.validateFilePayload({
    fileName: 'notes.pdf',
    fileSizeBytes: 1024,
    mimeType: 'application/pdf',
    fileBuffer: exeBuffer
  });
  assert.equal(fakePdf.valid, false);
  assert.ok(fakePdf.reason.includes('Security alert'));
});

test('Import Job state machine handles queued -> processing -> published/failed & retry', () => {
  // Create job
  const job = TextbookService.createImportJob({
    type: 'file_upload',
    fileName: 'dmc_notes.pdf',
    fileSizeBytes: 1024 * 200,
    mimeType: 'application/pdf',
    targetTitle: 'DMC Physiology Lecture Compendium 2026',
    isPrivateUpload: true,
    ownerId: 'test-student-404'
  });

  assert.equal(job.status, 'queued');
  assert.ok(job.id);
  assert.equal(job.ownerId, 'test-student-404');
  assert.equal(job.isPrivateUpload, true);

  // Process job synchronously
  const processed = TextbookService.processJobSync(job.id);
  assert.ok(['published', 'awaiting_review'].includes(processed.status));

  // Verify retry on a failed job
  const failedJob = {
    ...job,
    id: 'failed-job-test-' + Date.now(),
    status: 'failed',
    failureReason: 'Network timeout during OCR parse'
  };
  const jobs = TextbookService.loadJobs();
  jobs.push(failedJob);
  TextbookService.saveJobs(jobs);

  const retried = TextbookService.retryJob(failedJob.id);
  assert.equal(retried.status, 'queued');
  assert.equal(retried.failureReason, undefined);
});

test('Private student uploads remain strictly isolated to the owner', () => {
  const studentA = 'student-dmc-101';
  const studentB = 'student-ssmc-202';

  // Save private upload for Student A
  const privateDocA = {
    id: 'private-doc-a-' + Date.now(),
    title: 'DMC Batch K-80 Dissection Viva Logbook',
    authors: ['Tonmoy & Study Group'],
    edition: '2026 Batch Record',
    publicationYear: 2026,
    publisher: 'Personal Notebook',
    subjectId: 'anatomy',
    phase: 'Phase 1',
    accessType: 'read_in_medx',
    isPrivateUpload: true,
    ownerId: studentA,
    verificationStatus: 'verified',
    verificationDate: '2026-09-19',
    officialPublisherUrl: 'https://medx.bd/private/' + studentA,
    tableOfContents: [
      {
        id: 'sec-1',
        title: 'Femoral Triangle & Sheath Viva Pearls',
        pageIndex: 0,
        printedPageLabel: '1',
        content: 'Contents of femoral sheath: femoral artery, femoral vein, femoral canal. Note: Femoral nerve lies outside!'
      }
    ]
  };

  const uploads = TextbookService.loadPrivateUploads();
  uploads.push(privateDocA);
  TextbookService.savePrivateUploads(uploads);

  // Student A querying with includePrivate should find their document
  const studentAResults = TextbookService.getTextbooks({
    query: 'Dissection Viva',
    userId: studentA,
    includePrivate: true
  });
  assert.ok(studentAResults.some(b => b.id === privateDocA.id), 'Owner must see their private document');

  // Student B querying MUST NOT see Student A document
  const studentBResults = TextbookService.getTextbooks({
    query: 'Dissection Viva',
    userId: studentB,
    includePrivate: true
  });
  assert.ok(!studentBResults.some(b => b.id === privateDocA.id), 'Other students must NEVER see private document');

  // Public/Anonymous search MUST NOT see Student A document
  const publicResults = TextbookService.getTextbooks({
    query: 'Dissection Viva',
    includePrivate: false
  });
  assert.ok(!publicResults.some(b => b.id === privateDocA.id), 'Public catalog search must NEVER expose private upload');

  // getTextbookById check
  assert.ok(TextbookService.getTextbookById(privateDocA.id, studentA), 'Owner can get book by ID');
  assert.equal(TextbookService.getTextbookById(privateDocA.id, studentB), null, 'Non-owner gets null');
  assert.equal(TextbookService.getTextbookById(privateDocA.id, null), null, 'Anonymous gets null');
});

test('Catalog search supports English titles, Bengali synonyms, author surnames and topics', () => {
  // Search Guyton
  const guyton = TextbookService.getTextbooks({ query: 'Guyton' });
  assert.ok(guyton.length >= 1);
  assert.ok(guyton.some(b => b.title.includes('Guyton and Hall')));

  // Search BD Chaurasia
  const bdc = TextbookService.getTextbooks({ query: 'Chaurasia' });
  assert.ok(bdc.length >= 1);
  assert.ok(bdc.some(b => b.authors.includes('B. D. Chaurasia')));

  // Search Bengali term (সার্জারি / Surgery)
  const bengaliSearch = TextbookService.getTextbooks({ query: 'সার্জারি' });
  assert.ok(bengaliSearch.length >= 1);
  assert.ok(bengaliSearch.some(b => b.titleBn && b.titleBn.includes('সার্জারি')));

  // Filter by Phase & Subject
  const phase1Anatomy = TextbookService.getTextbooks({ phase: 'Phase 1', subject: 'anatomy' });
  assert.ok(phase1Anatomy.length >= 5);
  assert.ok(phase1Anatomy.every(b => b.phase === 'Phase 1' && b.subjectId === 'anatomy'));
});
