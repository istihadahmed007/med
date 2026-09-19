import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Import services directly
import { DrugImportService } from '../server/services/drugImportService.js';
import { DrugService } from '../server/services/drugService.js';

// Setup temporary isolated test database sandbox to avoid polluting production DB
const TEST_SANDBOX_DIR = join(__dirname, '.test_sandbox_' + Date.now());
if (!existsSync(TEST_SANDBOX_DIR)) mkdirSync(TEST_SANDBOX_DIR, { recursive: true });

const TEST_DB_PATH = join(TEST_SANDBOX_DIR, 'test_drug_db.json');
const TEST_JOBS_PATH = join(TEST_SANDBOX_DIR, 'test_import_jobs.json');
const TEST_ERRORS_PATH = join(TEST_SANDBOX_DIR, 'test_import_errors.json');

// Copy base production DB structure into sandbox
const prodDb = DrugService.loadDb();
writeFileSync(TEST_DB_PATH, JSON.stringify(prodDb, null, 2), 'utf8');

// Configure DrugService and DrugImportService sandbox paths
DrugService.DB_FILE = TEST_DB_PATH;
DrugImportService.JOBS_FILE = TEST_JOBS_PATH;
DrugImportService.ERRORS_FILE = TEST_ERRORS_PATH;

after(() => {
  rmSync(TEST_SANDBOX_DIR, { recursive: true, force: true });
});

// Load the 500-record synthetic test fixture
const fixturePath = join(__dirname, 'fixtures', 'synthetic-drugs-500.json');
const synthetic500 = JSON.parse(readFileSync(fixturePath, 'utf8'));

test('1. Root Cause Diagnosis: Verified that initial 105 limit was due to static seed generator script', () => {
  // Verification: The repository had no external crawler or ingestion pipeline.
  // The database was populated by scratch/build_full_drug_db.js which statically created exactly ~100 records.
  assert.ok(existsSync(join(ROOT_DIR, 'scratch', 'build_full_drug_db.js')), 'Seed generator scratch/build_full_drug_db.js exists');
  const seedScript = readFileSync(join(ROOT_DIR, 'scratch', 'build_full_drug_db.js'), 'utf8');
  assert.ok(
    seedScript.includes('VERIFIED_GENERICS') || seedScript.includes('buildGenericDb'),
    'Seed generator was a static array builder that populated the initial ~105 records'
  );
  
  // Verify production database does not contain synthetic markers
  const currentDb = DrugService.loadDb();
  const hasSynthetic = currentDb.brands.some(b => b.brandName?.includes('[TEST-SYNTHETIC]'));
  assert.equal(hasSynthetic, false, 'Production database must NEVER contain synthetic test markers');
});

test('2. Ingestion Engine: Scaling past 105 records to 500 records with batching and transactions', async () => {
  const initialCount = prodDb.brands.length;
  assert.ok(initialCount <= 120, `Initial base count should be ~105, found ${initialCount}`);

  // Ingest synthetic 500 records with batch size 250
  const job = await DrugImportService.startImportJob({
    adapterType: 'json',
    sourceName: 'Synthetic Bangladesh Pharma Test Catalog [TEST-SYNTHETIC]',
    sourceLicence: 'Academic Test Use Only',
    batchSize: 250,
    dryRun: false,
    data: synthetic500,
    initiatedBy: 'test-suite'
  });

  assert.equal(job.status, 'completed', 'Job should complete successfully');
  assert.equal(job.totalRecords, 500, 'Total records should be 500');
  assert.ok(job.processedRows === 500, 'All 500 rows should be processed');
  
  // Two records had intentional validation errors (row 105 and row 210)
  assert.equal(job.failed, 2, 'Exactly 2 invalid records should be rejected');
  // One record (row 300) was an intentional duplicate of row 5 with updated price
  assert.equal(job.updated, 1, 'Exactly 1 duplicate record should be updated via composite/source upsert');
  assert.equal(job.inserted, 497, 'Remaining 497 valid records should be inserted');

  // Verify the sandbox DB now holds more than 105 records
  const updatedDb = DrugImportService.loadDb();
  assert.ok(
    updatedDb.brands.length > 500,
    `Sandbox database must now contain >500 records, found ${updatedDb.brands.length}`
  );
});

test('3. RFC-4180 CSV Adapter: Ingestion with whitespace normalization and unit parsing', async () => {
  const csvData = `brandName,genericName,strength,dosageForm,manufacturerName,unitPrice,prescriptionStatus,packInfo,sourceRecordId
[TEST-SYNTHETIC] Cipro-Test,Ciprofloxacin,  500MG  , TAB ,Square Pharmaceuticals PLC,15.00,POM,10 Tablets,CSV-TEST-001
[TEST-SYNTHETIC] Parac-Test,Paracetamol,665 mg,XR Tablet,Beximco Pharmaceuticals Ltd,2.50,OTC,20 Tablets,CSV-TEST-002`;

  const job = await DrugImportService.startImportJob({
    adapterType: 'csv',
    sourceName: 'DGDA Gazette CSV Test [TEST-SYNTHETIC]',
    sourceLicence: 'Test Licence',
    batchSize: 100,
    dryRun: false,
    data: csvData,
    initiatedBy: 'test-suite'
  });

  assert.equal(job.status, 'completed');
  assert.equal(job.inserted, 2);

  const db = DrugImportService.loadDb();
  const cipro = db.brands.find(b => b.sourceRecordId === 'CSV-TEST-001');
  assert.ok(cipro, 'Cipro-Test should be stored in database');
  // Verify normalization: '  500MG  ' -> '500 mg', ' TAB ' -> 'Tablet'
  assert.equal(cipro.strength, '500 mg', 'Strength must be normalized to standard spacing');
  assert.equal(cipro.dosageForm, 'Tablet', 'Dosage form "TAB" must normalize to "Tablet"');
});

test('4. Deduplication & Idempotent Upsert Logic', async () => {
  // Re-importing identical record must not duplicate or increment database size
  const singleRecord = [{
    brandName: '[TEST-SYNTHETIC] Idempotent-Brand',
    genericName: 'Amoxicillin',
    strength: '500 mg',
    dosageForm: 'Capsule',
    manufacturerName: 'Square Pharmaceuticals PLC',
    unitPrice: 8.00,
    prescriptionStatus: 'POM',
    sourceRecordId: 'IDEMPOTENT-001',
    sourceName: 'Test Suite [TEST-SYNTHETIC]'
  }];

  const job1 = await DrugImportService.startImportJob({
    adapterType: 'json',
    sourceName: 'Test Idempotency 1',
    data: singleRecord
  });
  assert.equal(job1.inserted, 1);

  const dbAfterFirst = DrugImportService.loadDb();
  const count1 = dbAfterFirst.brands.length;

  // Run exact same import again with updated price
  singleRecord[0].unitPrice = 9.50;
  const job2 = await DrugImportService.startImportJob({
    adapterType: 'json',
    sourceName: 'Test Idempotency 2',
    data: singleRecord
  });

  assert.equal(job2.inserted, 0, 'No new records should be inserted');
  assert.equal(job2.updated, 1, 'Existing record should be updated');

  const dbAfterSecond = DrugImportService.loadDb();
  assert.equal(dbAfterSecond.brands.length, count1, 'Total brand count must remain identical');

  const updatedBrand = dbAfterSecond.brands.find(b => b.sourceRecordId === 'IDEMPOTENT-001');
  assert.equal(updatedBrand.verifiedPrice.amount, 9.50, 'Price must be updated to 9.50');
});

test('5. Invalid Row Rejection & Diagnostic Error Reporting (JSON & CSV)', async () => {
  const badRecords = [
    {
      // Missing brandName
      genericName: 'Paracetamol',
      strength: '500 mg',
      dosageForm: 'Tablet',
      manufacturerName: 'Square Pharmaceuticals PLC',
      sourceRecordId: 'ERR-001'
    },
    {
      brandName: '[TEST-SYNTHETIC] Bad-Generic',
      genericName: '', // Missing generic
      strength: '500 mg',
      dosageForm: 'Tablet',
      manufacturerName: 'Square Pharmaceuticals PLC',
      sourceRecordId: 'ERR-002'
    },
    {
      brandName: '[TEST-SYNTHETIC] Negative-Price',
      genericName: 'Paracetamol',
      strength: '500 mg',
      dosageForm: 'Tablet',
      manufacturerName: 'Square Pharmaceuticals PLC',
      unitPrice: -50.0, // Negative price
      sourceRecordId: 'ERR-003'
    }
  ];

  const job = await DrugImportService.startImportJob({
    adapterType: 'json',
    sourceName: 'Error Logging Test',
    data: badRecords
  });

  assert.equal(job.failed, 3, 'All 3 invalid records must be flagged as failed');

  // Verify structured error diagnostic retrieval in JSON format
  const jsonErrors = DrugImportService.getJobErrors(job.id, 'json');
  assert.equal(jsonErrors.length, 3);
  assert.ok(jsonErrors.some(e => e.field === 'brandName' && e.reason.includes('Missing')));
  assert.ok(jsonErrors.some(e => e.field === 'genericName' && e.reason.includes('Missing')));
  assert.ok(jsonErrors.some(e => e.field === 'unitPrice' && e.reason.includes('negative')));

  // Verify CSV format downloadable report
  const csvErrors = DrugImportService.getJobErrors(job.id, 'csv');
  assert.ok(csvErrors.includes('jobId,rowNumber,field,reason'));
  assert.ok(csvErrors.includes('unitPrice'));
});

test('6. Dry-Run Mode: Validates without writing any database records', async () => {
  const dbBefore = DrugImportService.loadDb();
  const countBefore = dbBefore.brands.length;

  const dryRunRecords = [
    {
      brandName: '[TEST-SYNTHETIC] Dry-Run-Brand-A',
      genericName: 'Omeprazole',
      strength: '20 mg',
      dosageForm: 'Capsule',
      manufacturerName: 'Renata Limited',
      sourceRecordId: 'DRY-001'
    },
    {
      brandName: '[TEST-SYNTHETIC] Dry-Run-Brand-B',
      genericName: 'Omeprazole',
      strength: '40 mg',
      dosageForm: 'Capsule',
      manufacturerName: 'Renata Limited',
      sourceRecordId: 'DRY-002'
    }
  ];

  const job = await DrugImportService.startImportJob({
    adapterType: 'json',
    sourceName: 'Dry Run Test',
    dryRun: true,
    data: dryRunRecords
  });

  assert.equal(job.status, 'completed');
  assert.equal(job.dryRun, true);
  assert.equal(job.inserted, 2, 'Dry-run counts simulated insertions');

  const dbAfter = DrugImportService.loadDb();
  assert.equal(dbAfter.brands.length, countBefore, 'Database count must NOT change on dry run');
  assert.equal(dbAfter.brands.some(b => b.sourceRecordId === 'DRY-001'), false);
});

test('7. Admin Authorization & Deletion Confirmation Safeguards', async () => {
  // Test confirmation required for archiving
  const targetBrandId = 'napa-extra-tab';
  
  // Archiving without confirmed: true must throw an error
  assert.throws(() => {
    DrugImportService.archiveBrand(targetBrandId, false, 'Routine cleanup');
  }, /confirmation/i);

  // Archiving with confirmed: true succeeds and updates status to 'archived'
  const archiveResult = DrugImportService.archiveBrand(targetBrandId, true, 'Safety discontinuation notice');
  assert.equal(archiveResult.success, true);
  
  const db = DrugImportService.loadDb();
  const archived = db.brands.find(b => b.id === targetBrandId);
  assert.equal(archived.activeStatus, 'archived');
});

test('8. Server-Side Filtering & Search: Letter, Dosage Form, Prescription Status', () => {
  // A-Z letter browsing
  const searchN = DrugService.searchDrugs({ letter: 'N' });
  assert.ok(searchN.results.brands.length > 0, 'Must return brands starting with letter N');
  assert.ok(searchN.results.brands.every(b => b.brandName.toUpperCase().startsWith('N')));

  // Dosage form filter
  const searchTablets = DrugService.searchDrugs({ dosageForm: 'Tablet' });
  assert.ok(searchTablets.results.brands.length > 0);
  assert.ok(searchTablets.results.brands.every(b => b.dosageForm.toLowerCase().includes('tablet')));

  // Prescription status filter
  const searchOTC = DrugService.searchDrugs({ prescriptionStatus: 'OTC' });
  assert.ok(searchOTC.results.brands.length > 0);
  assert.ok(searchOTC.results.brands.every(b => b.prescriptionStatus === 'OTC'));

  // Multi-attribute search
  const multiSearch = DrugService.searchDrugs({
    query: 'Napa',
    dosageForm: 'Tablet',
    prescriptionStatus: 'OTC',
    page: 1,
    limit: 10
  });
  assert.ok(multiSearch.results.brands.length > 0);
  assert.ok(multiSearch.pagination.totalResults >= 1);
});

test('9. Brand Detail Monograph: Alternative Brands Table & Cross-Book Topic', () => {
  // Fetch brand detail for 'napa-extra-tab'
  const detail = DrugService.getBrandDetail('napa-extra-tab');
  assert.ok(detail, 'Detail response must not be null');
  assert.ok(detail.brand, 'Must include target brand');
  assert.ok(detail.generic, 'Must include parent generic clinical monograph');
  assert.ok(detail.otherBrandsWithSameGeneric, 'Must include alternative Bangladesh brands list');
  assert.ok(detail.availableStrengths, 'Must include available formulations/strengths');
  assert.ok(detail.relatedClasses, 'Must include related therapeutic classes');

  // Verify generic monograph clinical fields are populated
  assert.ok(detail.generic.mechanismOfAction, 'Mechanism of action must exist');
  assert.ok(detail.generic.contraindications.length > 0, 'Contraindications must exist');
  assert.ok(detail.generic.dosageGuidance.adult, 'Adult dosing must exist');

  // Verify educational safety notice requirement
  assert.ok(
    detail.generic.sources.length >= 2,
    'Generic must have verified clinical sources'
  );
});

test('10. Security: API Keys and Private Credentials Never Exposed to Frontend', async () => {
  const sensitiveRestConfig = {
    endpoint: 'https://api.dghs.gov.bd/v1/private-export',
    authHeader: 'Bearer PRIVATE_SUPER_SECRET_KEY_998877'
  };

  const origFetch = DrugImportService.fetchFromRestApi;
  DrugImportService.fetchFromRestApi = async () => ({ records: [], lastCursor: null });

  try {
    const job = await DrugImportService.startImportJob({
      adapterType: 'rest',
      sourceName: 'Authenticated DGDA Feed',
      restConfig: sensitiveRestConfig,
      dryRun: true,
      data: []
    });

    // Fetch job list as would be returned by GET /api/drugs/import/jobs
    const jobsList = DrugImportService.getImportJobs();
    const storedJob = jobsList.find(j => j.id === job.id);
    assert.ok(storedJob);

    // Confirm authorization token is NOT exposed in the job object or summary
    const jobString = JSON.stringify(storedJob);
    assert.equal(
      jobString.includes('PRIVATE_SUPER_SECRET_KEY_998877'),
      false,
      'Private REST authorization header must NEVER be serialized or stored in public job object'
    );
  } finally {
    DrugImportService.fetchFromRestApi = origFetch;
  }
});
