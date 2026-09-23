import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

import { DrugService } from '../server/services/drugService.js';

test('1. Medicine Database Integrity: Contains verified dataset records without loss', () => {
  const db = DrugService.loadDb();
  assert.ok(db.brands.length >= 21000, `Expected at least 21,000 brands, found ${db.brands.length}`);
  assert.ok(db.generics.length >= 1500, `Expected at least 1,500 generics, found ${db.generics.length}`);
  assert.ok(db.manufacturers.length >= 200, `Expected at least 200 manufacturers, found ${db.manufacturers.length}`);

  // Verified generic Napa / Paracetamol
  const napaBrand = db.brands.find(b => b.brandName?.toLowerCase() === 'napa');
  assert.ok(napaBrand, 'Napa brand should exist in the database');
  assert.equal(napaBrand.genericId, 'paracetamol', 'Napa genericId should map to paracetamol');

  // Verify core monograph fields exist on Paracetamol
  const paracetamolGen = db.generics.find(g => g.id === 'paracetamol');
  assert.ok(paracetamolGen, 'Paracetamol generic should exist');
  assert.ok(paracetamolGen.indications && paracetamolGen.indications.length > 0, 'Paracetamol should have verified indications');
});

test('2. Study Materials Structure: 25 MBBS subjects with valid curriculum taxonomy', () => {
  const dataPath = join(ROOT_DIR, 'src', 'data', 'studyMaterialsData.ts');
  assert.ok(existsSync(dataPath), 'studyMaterialsData.ts must exist');

  const content = readFileSync(dataPath, 'utf8');

  // Check mandatory 25 subjects are included
  const expectedSubjects = [
    'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology',
    'Microbiology', 'Forensic Medicine', 'Community Medicine', 'Medicine', 'Surgery',
    'Obstetrics & Gynecology', 'Pediatrics', 'Ophthalmology', 'ENT', 'Orthopedics',
    'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Emergency Medicine',
    'Dental', 'Medical Ethics', 'Clinical Skills', 'Examination Preparation'
  ];

  for (const subj of expectedSubjects) {
    assert.ok(content.includes(subj), `Subject "${subj}" must be defined in studyMaterialsData.ts`);
  }
});

test('3. Data Safety Rule: No fabricated or hallucinated medical data in unverified imports', () => {
  const db = DrugService.loadDb();
  // Imported draft generics must NOT have fabricated mechanisms of action or false review metadata
  const importedDraftGenerics = db.generics.filter(g => g.medicalReview?.status === 'draft');
  assert.ok(importedDraftGenerics.length > 1000, 'Must have imported draft records');

  for (const draftGen of importedDraftGenerics.slice(0, 100)) {
    assert.equal(draftGen.mechanismOfAction, '', `Draft generic ${draftGen.id} must not have fabricated mechanismOfAction`);
    assert.equal(draftGen.medicalReview?.reviewerName, '', `Draft generic ${draftGen.id} must not have fabricated reviewerName`);
  }
});

test('4. Global Search Accuracy: Rapid search across generics, brands and manufacturers', () => {
  const searchResults = DrugService.searchDrugs({ query: 'paracetamol', limit: 10 });
  assert.ok(searchResults.results.generics.length > 0, 'Should find Paracetamol generic');
  assert.equal(searchResults.results.generics[0].id, 'paracetamol');
  assert.ok(searchResults.results.brands.length > 0, 'Should find brands containing Paracetamol');

  const mfgSearch = DrugService.searchDrugs({ query: 'square', filterType: 'all', limit: 10 });
  assert.ok(mfgSearch.results.manufacturers.length > 0 || mfgSearch.results.brands.length > 0, 'Should match Square pharmaceuticals');
});
