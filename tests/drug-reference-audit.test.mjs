import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DrugService } from '../server/services/drugService.js';

test('1. Acarbose Clinical Monograph & Bangladesh Brands Audit', () => {
  const db = DrugService.loadDb();
  const acarbose = db.generics.find(g => g.id === 'acarbose');
  assert.ok(acarbose, 'Acarbose generic monograph must exist');

  // Clinical completeness & verified classifications
  assert.equal(acarbose.prescriptionStatus, 'POM', 'Acarbose must be POM (Prescription Only), never OTC');
  assert.equal(acarbose.atcCode, 'A10BF01', 'Acarbose must have verified ATC code A10BF01');
  assert.equal(acarbose.pharmacologicalClass, 'Alpha-Glucosidase Inhibitor');
  assert.equal(acarbose.medicalReview.status, 'published');
  assert.ok(acarbose.medicalReview.reviewerName, 'Monograph must have documented reviewer');

  // Indications & Dosing
  assert.ok(acarbose.indications.length > 0, 'Indications must not be empty');
  assert.ok(acarbose.indications.some(i => i.name.toLowerCase().includes('diabetes')), 'Must index Type 2 Diabetes indication');
  assert.ok(acarbose.dosageGuidance.adult.includes('25 mg'), 'Adult dosage must specify initial 25 mg dosing with meals');
  assert.deepEqual(acarbose.dosageGuidance.routes, ['Oral'], 'Acarbose route must be strictly Oral');

  // Safety Pearl
  assert.ok(
    acarbose.precautions.some(p => p.toLowerCase().includes('dextrose') || p.toLowerCase().includes('glucose')),
    'Precautions must note hypoglycemia must be treated with dextrose/glucose, not sucrose'
  );

  // Linked commercial brands
  const brands = db.brands.filter(b => b.genericId === 'acarbose');
  assert.ok(brands.length >= 3, `Must have registered Acarbose brands, found ${brands.length}`);
  for (const b of brands) {
    assert.equal(b.route, 'Oral', `Brand ${b.brandName} route must be Oral`);
    assert.ok(!b.packInfo.includes('-mg'), `Brand ${b.brandName} packInfo must be clean, found: ${b.packInfo}`);
  }
});

test('2. Furosemide Pharmacokinetics, Interactions & Formulation Routes Audit', () => {
  const db = DrugService.loadDb();
  const furo = db.generics.find(g => g.id === 'furosemide');
  assert.ok(furo, 'Furosemide generic monograph must exist');

  // Pharmacokinetics verification
  assert.ok(furo.pharmacokinetics, 'Furosemide must have pharmacokinetics monograph');
  assert.ok(furo.pharmacokinetics.bioavailability.includes('50'), 'Bioavailability must document 50-70%');
  assert.ok(furo.pharmacokinetics.halfLife.includes('0.5'), 'Half-life must document 0.5-2 hours');
  assert.ok(furo.pharmacokinetics.excretion.toLowerCase().includes('renal'), 'Excretion must document renal elimination');

  // Interactions verification
  const furoInteractions = db.interactions.filter(
    i => i.genericA === 'furosemide' || i.genericB === 'furosemide'
  );
  assert.ok(furoInteractions.length >= 5, `Furosemide must have at least 5 documented interactions, found ${furoInteractions.length}`);
  const interactingPartners = furoInteractions.map(i => i.genericA === 'furosemide' ? i.genericB : i.genericA);
  assert.ok(interactingPartners.includes('gentamicin'), 'Must document interaction with Aminoglycosides (Gentamicin)');
  assert.ok(interactingPartners.includes('digoxin'), 'Must document interaction with Digoxin');
  assert.ok(interactingPartners.includes('indomethacin'), 'Must document interaction with NSAIDs (Indomethacin)');
  assert.ok(interactingPartners.includes('lithium'), 'Must document interaction with Lithium');
  assert.ok(interactingPartners.includes('ramipril'), 'Must document interaction with ACE inhibitors (Ramipril)');

  // Lasix Tablet vs Injection Route isolation
  const lasixTab = DrugService.getBrandDetail('lasix-tab-40mg');
  assert.ok(lasixTab, 'Lasix 40 mg tablet must exist');
  assert.equal(lasixTab.brand.route, 'Oral', 'Lasix 40 mg tablet route must be strictly "Oral", NOT "Oral, IV, IM"');

  const lasixInj = DrugService.getBrandDetail('lasix-inj-20mg-2ml');
  assert.ok(lasixInj, 'Lasix injection must exist');
  assert.equal(lasixInj.brand.route, 'IV, IM', 'Lasix injection route must be "IV, IM"');
});

test('3. Frudema Pack Info, Pricing & Regulatory Status Audit', () => {
  const db = DrugService.loadDb();
  const frudema = db.brands.find(b => b.brandName.toLowerCase() === 'frudema' || b.id.toLowerCase().includes('frudema'));
  assert.ok(frudema, 'Frudema brand must exist in database');

  // Pack info must not be concatenated slug
  assert.ok(!frudema.packInfo.includes('frudematablet40-mg'), 'Frudema packInfo must not contain raw concatenated slug');
  assert.ok(frudema.packInfo.toLowerCase().includes('strip') || frudema.packInfo.toLowerCase().includes('pack'), 'Frudema packInfo must be readable text');

  // Price must be null/unverified, NOT false "Gazette Regulated"
  assert.equal(frudema.verifiedPrice, null, 'Frudema without gazetted retail price must have verifiedPrice null');

  // Route must be Oral
  assert.equal(frudema.route, 'Oral', 'Frudema tablet route must be strictly Oral');

  // Source must not falsely claim DGDA Verified when registration is pending
  assert.ok(
    frudema.registrationStatus.toLowerCase().includes('pending') ||
    frudema.registrationStatus.toLowerCase().includes('imported'),
    'Frudema registrationStatus must honestly reflect pending verification'
  );
});

test('4. Cardace Identity, Ramipril Monograph & Tritace Brands Audit', () => {
  const db = DrugService.loadDb();

  // Ramipril clinical monograph
  const ramipril = db.generics.find(g => g.id === 'ramipril');
  assert.ok(ramipril, 'Ramipril generic monograph must exist');
  assert.equal(ramipril.atcCode, 'C09AA05', 'Ramipril ATC code must be C09AA05');
  assert.equal(ramipril.prescriptionStatus, 'POM', 'Ramipril must be POM');
  assert.ok(ramipril.indications.some(i => i.name.toLowerCase().includes('cardiovascular') || i.name.toLowerCase().includes('hypertension')));
  assert.ok(ramipril.adverseEffects.seriousWarnings.some(w => w.toLowerCase().includes('fetal') || w.toLowerCase().includes('pregnancy')));

  // Cardace ingredient audit
  const cardace = db.brands.find(b => b.brandName.toLowerCase().includes('cardace'));
  assert.ok(cardace, 'Cardace record must exist');
  assert.equal(cardace.genericId, 'ramipril', 'Cardace active generic must be Ramipril, NOT Enalapril');
  assert.ok(!cardace.brandName.includes('(Enalapril Formulation)'), 'Misleading label "(Enalapril Formulation)" must be removed');
  assert.ok((cardace.notes || cardace.provenanceNote || '').includes('Tritace'), 'Notes must state Synovia Pharma markets Ramipril under Tritace in Bangladesh');

  // Bangladesh Synovia Tritace brands
  const tritaceBrands = db.brands.filter(b => b.brandName.toLowerCase().startsWith('tritace'));
  assert.ok(tritaceBrands.length >= 3, `Must register Synovia Tritace strengths (1.25mg, 2.5mg, 5mg), found ${tritaceBrands.length}`);
  for (const tb of tritaceBrands) {
    assert.equal(tb.genericId, 'ramipril');
    assert.ok(tb.verifiedPrice?.amount > 0, `Tritace ${tb.strength} must have verified gazetted price`);
  }
});

test('5. Available Formulations Deduplication Audit', () => {
  const lasixTab = DrugService.getBrandDetail('lasix-tab-40mg');
  assert.ok(lasixTab.availableStrengths, 'availableStrengths must be returned');

  // Check there are no duplicate entries with differing whitespace or capitalization
  const normalized = lasixTab.availableStrengths.map(s => s.toLowerCase().replace(/\s+/g, ' ').trim());
  const uniqueNormalized = new Set(normalized);
  assert.equal(normalized.length, uniqueNormalized.size, 'availableStrengths must not contain duplicated formulation entries');
});

test('6. Multi-Drug Interaction Checker Clinical Logic Audit', () => {
  // Case A: Reviewed drugs with documented interaction
  const checkFound = DrugService.checkInteractions(['furosemide', 'ramipril']);
  assert.equal(checkFound.dataStatus, 'interactions_found', 'Must detect interactions for Furosemide + Ramipril');
  assert.ok(checkFound.interactions.length > 0, 'Must return documented interaction list');

  // Case B: Reviewed drugs with no documented interactions
  const checkNone = DrugService.checkInteractions(['paracetamol', 'salbutamol']);
  assert.equal(checkNone.dataStatus, 'no_documented_interaction', 'Must return no_documented_interaction for clean combination');
  assert.equal(checkNone.interactions.length, 0);

  // Case C: Selection with unreviewed / draft imported generic
  const checkInsufficient = DrugService.checkInteractions(['furosemide', 'abacavir']);
  assert.equal(checkInsufficient.dataStatus, 'insufficient_data', 'Must return insufficient_data when evaluating unreviewed drug');
  assert.ok(checkInsufficient.unreviewedGenerics.includes('abacavir'), 'Must identify Abacavir as awaiting review');
  assert.ok(checkInsufficient.disclaimer.toLowerCase().includes('draft') || checkInsufficient.disclaimer.toLowerCase().includes('awaiting'));
});

test('7. Truth in Labeling & No Data Fabrication Audit', () => {
  const stats = DrugService.getDatabaseStats();
  assert.ok(stats.totalBrands > 20000, 'Must reflect 21,000+ brands');
  assert.ok(stats.totalGenerics > 1500, 'Must reflect 1,500+ generics');
  assert.ok(stats.updatedThisMonth <= 150 && stats.updatedThisMonth >= 24, `updatedThisMonth must reflect verified records, found ${stats.updatedThisMonth}`);

  // Audit that unreviewed generic records do not fabricate reviewer credentials
  const db = DrugService.loadDb();
  const draftGen = db.generics.find(g => g.medicalReview?.status === 'draft');
  if (draftGen) {
    assert.ok(
      !draftGen.medicalReview.reviewerName || draftGen.medicalReview.reviewerName === '',
      `Draft generic ${draftGen.id} must not have a fabricated reviewer name`
    );
  }
});
