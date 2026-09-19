import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Import server service directly
import { DrugService } from '../server/services/drugService.js';

// Transpile acrossBooksData for test validation
const scratch = mkdtempSync(join(tmpdir(), 'medx-drug-test-'));
after(() => rmSync(scratch, { recursive: true, force: true }));
writeFileSync(join(scratch, 'package.json'), '{"type":"module"}');
for (const file of ['data/cardiovascularPilotData', 'data/verifiedTextbooksData', 'data/acrossBooksData']) {
  const source = readFileSync(new URL(`../src/${file}.ts`, import.meta.url), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
    .replace(/from '(\.[^']+)'/g, "from '$1.js'");
  const path = join(scratch, `${file}.js`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, output);
}
const { CROSS_BOOK_TOPICS } = await import(pathToFileURL(join(scratch, 'data/acrossBooksData.js')));

test('1. Database Integrity: Verified generics, brands, manufacturers and classes', () => {
  const db = DrugService.loadDb();
  assert.ok(db.generics.length >= 20, `Database must contain at least 20 verified generics, found ${db.generics.length}`);
  assert.ok(db.brands.length >= 90, `Database must contain at least 90 verified Bangladesh brands, found ${db.brands.length}`);
  assert.ok(db.manufacturers.length >= 10, `Database must contain at least 10 manufacturers, found ${db.manufacturers.length}`);
  assert.ok(db.therapeuticClasses.length >= 6, `Database must contain at least 6 therapeutic classes, found ${db.therapeuticClasses.length}`);
  assert.ok(db.interactions.length >= 25, `Database must contain at least 25 reviewed interactions, found ${db.interactions.length}`);
  assert.ok(db.guidelines.length >= 4, `Database must contain at least 4 guidelines, found ${db.guidelines.length}`);
  assert.ok(db.investigations.length >= 6, `Database must contain at least 6 investigations, found ${db.investigations.length}`);
  assert.ok(db.comparisons.length >= 5, `Database must contain 5 preconfigured comparisons, found ${db.comparisons.length}`);
});

test('2. Generic & Brand Search: English, Bangla aliases, and Typo Tolerance', () => {
  // English generic search
  const furoSearch = DrugService.searchDrugs({ query: 'furosemide' });
  assert.ok(furoSearch.results.generics.length > 0, 'Must find Furosemide by English generic name');
  assert.equal(furoSearch.results.generics[0].id, 'furosemide');

  // Bangla brand search (নাপা -> Napa)
  const napaSearch = DrugService.searchDrugs({ query: 'নাপা' });
  assert.ok(napaSearch.results.brands.length > 0, 'Must find Napa brands by Bangla query "নাপা"');
  assert.ok(napaSearch.results.brands.some(b => b.brandName.toLowerCase().includes('napa')));

  // Typo tolerance ("furossemide" -> Furosemide)
  const typoSearch = DrugService.searchDrugs({ query: 'furosemid' });
  assert.ok(typoSearch.results.generics.length > 0, 'Typo search "furosemid" must match Furosemide');
  assert.equal(typoSearch.results.generics[0].id, 'furosemide');

  // Combination drug search
  const comboSearch = DrugService.searchDrugs({ query: 'paracetamol-caffeine' });
  assert.ok(comboSearch.results.generics.length > 0, 'Must find Paracetamol + Caffeine combination');
});

test('3. Source Provenance & Medical Review Standards', () => {
  const db = DrugService.loadDb();
  for (const gen of db.generics) {
    // Provenance sources
    assert.ok(gen.sources && gen.sources.length >= 2, `Generic ${gen.id} must have at least 2 verified sources`);
    for (const src of gen.sources) {
      assert.ok(src.organization, `Source organization required for ${gen.id}`);
      assert.ok(src.title, `Source title required for ${gen.id}`);
      assert.ok(src.url, `Source URL required for ${gen.id}`);
      assert.ok(src.publicationDate, `Source date required for ${gen.id}`);
    }

    // Medical Review
    assert.ok(gen.medicalReview, `Medical review metadata required for ${gen.id}`);
    assert.equal(gen.medicalReview.status, 'published', `Generic ${gen.id} must be in published status`);
    assert.ok(gen.medicalReview.reviewerName, `Reviewer name required for ${gen.id}`);
    assert.ok(gen.medicalReview.reviewerCredentials, `Reviewer credentials required for ${gen.id}`);
    assert.ok(gen.medicalReview.contentVersion, `Content version required for ${gen.id}`);

    // High-Yield Pharmacology Learning
    assert.ok(gen.pharmacologyLearning, `Learning module required for ${gen.id}`);
    assert.ok(gen.pharmacologyLearning.vivaQuestions.length >= 1, `Viva questions required for ${gen.id}`);
    assert.ok(gen.pharmacologyLearning.recallFlashcards.length >= 1, `Flashcards required for ${gen.id}`);
  }
});

test('4. Safe Multi-Drug Interaction Checker: Deduplication & Negative Disclaimer', () => {
  // Known interaction: Furosemide + Spironolactone
  const checkKnown = DrugService.checkInteractions(['furosemide', 'spironolactone']);
  assert.ok(checkKnown.hasInteractions, 'Must detect interaction between furosemide and spironolactone');
  assert.ok(checkKnown.interactions.length >= 1);
  assert.ok(['major', 'moderate', 'minor'].includes(checkKnown.interactions[0].severity));
  assert.ok(checkKnown.interactions[0].management, 'Interaction must provide clinical management guidance');

  // Brand Deduplication: Selecting Napa + Ace should flag duplicate paracetamol active ingredient
  const checkDups = DrugService.checkInteractions(['Napa', 'Ace']);
  assert.ok(checkDups.hasDuplicateTherapy, 'Must identify duplicate therapy for Napa and Ace');
  assert.ok(checkDups.duplicateBrandWarnings.length > 0);
  assert.ok(checkDups.duplicateBrandWarnings[0].message.includes('Duplicate active ingredient alert'));

  // Negative Interaction: Unknown combination returns mandatory disclaimer
  const checkNegative = DrugService.checkInteractions(['salbutamol', 'pantoprazole']);
  assert.equal(checkNegative.hasInteractions, false, 'No interaction expected between salbutamol and pantoprazole');
  assert.ok(
    checkNegative.disclaimer.includes('No verified interaction was found in the available database. This does NOT prove that no interaction exists.'),
    'Negative result must display mandatory safety disclaimer'
  );
});

test('5. Drug-Class Comparison: 2 to 4 drugs and preconfigured MBBS clinical pairs', () => {
  // Valid comparison: Enalapril vs Losartan
  const comp = DrugService.compareDrugs(['enalapril', 'losartan']);
  assert.equal(comp.comparedGenerics.length, 2);
  assert.ok(comp.matrixRows.length >= 10, 'Matrix must have at least 10 clinical rows');
  assert.ok(comp.preconfiguredComparison, 'Must link to preconfigured comparison for ACEI vs ARB');

  // Reject < 2 drugs
  assert.throws(() => {
    DrugService.compareDrugs(['furosemide']);
  }, /between 2 and 4 generic medicines/);

  // Reject > 4 drugs
  assert.throws(() => {
    DrugService.compareDrugs(['furosemide', 'hydrochlorothiazide', 'spironolactone', 'enalapril', 'losartan']);
  }, /Maximum 4 generic medicines/);

  // Validate all 5 preconfigured comparison pairs exist
  const expectedPairs = [
    'acei-vs-arb',
    'loop-vs-thiazide',
    'heparin-vs-warfarin',
    'omeprazole-vs-pantoprazole',
    'amoxicillin-vs-azithromycin'
  ];
  const preconfigured = DrugService.getPreconfiguredComparisons();
  for (const pairId of expectedPairs) {
    const found = preconfigured.find(p => p.id === pairId);
    assert.ok(found, `Preconfigured comparison pair ${pairId} must exist`);
    assert.ok(found.clinicalVerdict, `Clinical verdict required for ${pairId}`);
  }
});

test('6. User Bookmarks, Notes, and Governance Auditing', () => {
  const testUserId = 'student-test-999';

  // Bookmark toggle
  const bm1 = DrugService.toggleUserBookmark(testUserId, { type: 'generic', id: 'furosemide' });
  assert.equal(bm1.bookmarked, true, 'First toggle must bookmark item');
  const bm2 = DrugService.toggleUserBookmark(testUserId, { type: 'generic', id: 'furosemide' });
  assert.equal(bm2.bookmarked, false, 'Second toggle must unbookmark item');

  // Private notes
  const note = DrugService.saveUserNote(testUserId, 'spironolactone', 'Remember gynecomastia and hyperkalemia risk.');
  assert.equal(note.note, 'Remember gynecomastia and hyperkalemia risk.');
  const userNotes = DrugService.getUserNotes(testUserId);
  assert.equal(userNotes['spironolactone'].note, 'Remember gynecomastia and hyperkalemia risk.');

  // Governance correction report
  const report = DrugService.reportCorrection(testUserId, {
    drugId: 'furosemide',
    drugType: 'generic',
    section: 'dosing',
    description: 'High-dose infusion rate should specify 4 mg/min ceiling for ototoxicity prevention.',
    evidenceSource: 'https://bnf.nice.org.uk/drugs/furosemide/'
  });
  assert.ok(report.id, 'Report must generate an ID');
  assert.equal(report.status, 'pending_review');

  const auditLogs = DrugService.getAuditLogs();
  assert.ok(auditLogs.length > 0, 'Audit logs must be populated');
});

test('7. Cross-Book Topics Integration', () => {
  const db = DrugService.loadDb();
  const linkedGenerics = db.generics.filter(g => g.pharmacologyLearning?.acrossBooksTopicIds?.length > 0);
  assert.ok(linkedGenerics.length >= 5, 'At least 5 generics must be linked to Across Books topics');

  const validTopicIds = new Set(CROSS_BOOK_TOPICS.map(t => t.id));
  for (const g of linkedGenerics) {
    for (const tId of g.pharmacologyLearning.acrossBooksTopicIds) {
      assert.ok(validTopicIds.has(tId), `Generic ${g.id} references across-books topic ${tId} which must exist in catalog`);
    }
  }
});
