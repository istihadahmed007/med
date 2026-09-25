import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DrugService } from '../server/services/drugService.js';

test('1. Olanzapine Clinical Monograph & Official Sources Audit', () => {
  const db = DrugService.loadDb();
  const olanzapine = db.generics.find(g => g.id === 'olanzapine');
  assert.ok(olanzapine, 'Olanzapine generic monograph must exist in database');

  // ATC & Taxonomy
  assert.equal(olanzapine.atcCode, 'N05AH03', 'Olanzapine official WHO ATC code must be N05AH03');
  assert.ok(
    olanzapine.pharmacologicalClass.includes('Thienobenzodiazepine'),
    `Pharmacological class must identify Thienobenzodiazepine derivative, got: ${olanzapine.pharmacologicalClass}`
  );
  assert.equal(olanzapine.prescriptionStatus, 'POM', 'Olanzapine must be POM (Prescription Only)');

  // Indications & Jurisdiction Distinction
  assert.ok(Array.isArray(olanzapine.indications) && olanzapine.indications.length >= 4, 'Must index multiple verified indications');
  const schizophreniaInd = olanzapine.indications.find(i => i.name.toLowerCase().includes('schizophrenia'));
  assert.ok(schizophreniaInd, 'Schizophrenia indication must be indexed');
  assert.ok(
    schizophreniaInd.guidelineRecommendation.includes('DGDA') && schizophreniaInd.guidelineRecommendation.includes('FDA'),
    'Schizophrenia indication must distinguish DGDA and FDA registration status'
  );

  const bipolarDepressionInd = olanzapine.indications.find(i => i.name.toLowerCase().includes('depressive episodes associated with bipolar') || i.name.toLowerCase().includes('treatment-resistant depression'));
  assert.ok(bipolarDepressionInd, 'Bipolar depression / TRD indication must be indexed');
  assert.ok(
    bipolarDepressionInd.note.includes('fluoxetine') || bipolarDepressionInd.guidelineRecommendation.includes('Fluoxetine'),
    'Bipolar depression indication must explicitly specify combination therapy with fluoxetine (OFC)'
  );

  // Formulation-Specific Dosing & Parenteral Benzodiazepine Warning
  assert.ok(olanzapine.dosageGuidance, 'Dosage guidance must exist');
  assert.ok(olanzapine.dosageGuidance.adult.toLowerCase().includes('oral tablet'), 'Adult dosing must specify oral tablet starting dose');
  assert.ok(olanzapine.dosageGuidance.adult.toLowerCase().includes('intramuscular'), 'Adult dosing must separately specify IM injection protocol');
  assert.ok(
    olanzapine.dosageGuidance.adult.includes('benzodiazepine') || olanzapine.dosageGuidance.timingNotice.includes('benzodiazepine'),
    'Dosage guidance must include explicit warning regarding concomitant parenteral benzodiazepine administration'
  );

  // Contraindications Wording & Comparison
  assert.ok(Array.isArray(olanzapine.contraindications) && olanzapine.contraindications.length >= 1, 'Contraindications must be cataloged');
  const contraText = JSON.stringify(olanzapine.contraindications);
  assert.ok(contraText.includes('US FDA') || contraText.includes('DailyMed'), 'Contraindications must cite US FDA monotherapy label findings ("None")');
  assert.ok(contraText.includes('glaucoma') || contraText.includes('SmPC'), 'Contraindications must note UK/EMA SmPC narrow-angle glaucoma warning');

  // Serious Warnings: Metabolic, Dementia-related psychosis, DRESS, NMS
  assert.ok(Array.isArray(olanzapine.adverseEffects?.seriousWarnings), 'Serious warnings must be present');
  const warnings = olanzapine.adverseEffects.seriousWarnings.join(' ');
  assert.ok(warnings.toLowerCase().includes('dementia-related psychosis'), 'Must include Boxed Warning: Increased mortality in elderly patients with dementia-related psychosis');
  assert.ok(warnings.includes('Hyperglycemia') || warnings.includes('Metabolic'), 'Must include metabolic changes and hyperglycemia warnings');
  assert.ok(warnings.includes('Neuroleptic Malignant Syndrome') || warnings.includes('NMS'), 'Must include NMS warning');

  const precautionsText = (olanzapine.precautions || []).join(' ');
  assert.ok(precautionsText.includes('DRESS') || precautionsText.includes('eosinophilia'), 'Must include DRESS multi-organ hypersensitivity warning in precautions');

  // Pharmacokinetics: Quantified values with units and ranges
  assert.ok(olanzapine.pharmacokinetics, 'Pharmacokinetics monograph must be present');
  assert.ok(olanzapine.pharmacokinetics.bioavailability.includes('85%'), 'Bioavailability must document ~85%');
  assert.ok(olanzapine.pharmacokinetics.halfLife.includes('30 hours') || olanzapine.pharmacokinetics.halfLife.includes('21 to 54'), 'Half-life must document ~30 hours (range 21-54h)');
  assert.ok(olanzapine.pharmacokinetics.metabolism.includes('CYP1A2') && olanzapine.pharmacokinetics.metabolism.includes('UGT1A4'), 'Metabolism must document CYP1A2 and UGT1A4 pathways');
  assert.ok(
    olanzapine.pharmacokinetics.excretion.includes('57%') &&
    (olanzapine.pharmacokinetics.excretion.toLowerCase().includes('urine') || olanzapine.pharmacokinetics.excretion.toLowerCase().includes('renal')),
    'Excretion must document ~57% urinary elimination'
  );

  // Pregnancy & Lactation: Removed first-trimester blanket statement
  assert.ok(olanzapine.pregnancyInfo, 'Pregnancy info must exist');
  assert.ok(!olanzapine.pregnancyInfo.details.includes('avoided during the first trimester'), 'Blanket first-trimester avoidance statement must be removed');
  assert.ok(olanzapine.pregnancyInfo.details.includes('third trimester'), 'Pregnancy info must document third trimester neonatal EPS / withdrawal risks');
  assert.ok(olanzapine.breastfeedingInfo.details.includes('breast milk'), 'Breastfeeding info must document excretion into breast milk');

  // Renal & Hepatic: Removed unsupported statements
  assert.ok(olanzapine.doseAdjustment, 'Dose adjustment guidance must exist');
  assert.ok(!olanzapine.doseAdjustment.renal.includes('no specific dose adjustment needed unless severe GFR reduction'), 'Unsupported renal statement must be removed');
  assert.ok(
    olanzapine.doseAdjustment.renal.includes('significantly altered') || olanzapine.doseAdjustment.renal.includes('substantially dialyzable'),
    'Renal guidance must document that pharmacokinetics are not significantly altered in renal impairment'
  );
  assert.ok(olanzapine.doseAdjustment.hepatic.includes('5 mg'), 'Hepatic guidance must document 5 mg lower starting dose due to decreased clearance');

  // Traceable Sources & Qualified Reviewer
  assert.ok(Array.isArray(olanzapine.sources) && olanzapine.sources.length >= 3, 'Must have at least 3 traceable clinical sources');
  const sourceOrgs = olanzapine.sources.map(s => s.organization);
  assert.ok(sourceOrgs.some(org => org.includes('DailyMed')), 'Must cite DailyMed official label');
  assert.ok(sourceOrgs.some(org => org.includes('WHO Collaborating Centre')), 'Must cite WHO ATC index');
  assert.ok(sourceOrgs.some(org => org.includes('DGDA')), 'Must cite Bangladesh DGDA formulary');

  assert.equal(olanzapine.medicalReview.status, 'published');
  assert.ok(olanzapine.medicalReview.reviewerName && !olanzapine.medicalReview.reviewerName.includes('Engine'), 'Must have real qualified reviewer name');
  assert.ok(olanzapine.medicalReview.reviewerCredentials, 'Must have real qualified reviewer credentials');
});

test('2. Olanzapine Multi-Drug Interactions Verification', () => {
  const db = DrugService.loadDb();
  const interactions = db.interactions.filter(
    i => i.genericA === 'olanzapine' || i.genericB === 'olanzapine'
  );
  assert.ok(interactions.length >= 4, `Olanzapine must have at least 4 verified interactions, found ${interactions.length}`);

  const partnerDrugs = interactions.map(i => i.genericA === 'olanzapine' ? i.genericB : i.genericA);

  // Ciprofloxacin (CYP1A2 Inhibitor)
  assert.ok(partnerDrugs.includes('ciprofloxacin'), 'Must document interaction with Ciprofloxacin');
  const ciproInter = interactions.find(i => (i.genericA === 'ciprofloxacin' && i.genericB === 'olanzapine') || (i.genericA === 'olanzapine' && i.genericB === 'ciprofloxacin'));
  assert.ok(
    ciproInter.clinicalEffect.includes('concentration') || ciproInter.mechanism.includes('CYP1A2'),
    'Ciprofloxacin interaction must document concentration increase via CYP1A2 inhibition'
  );

  // Carbamazepine (CYP1A2 Inducer)
  assert.ok(partnerDrugs.includes('carbamazepine'), 'Must document interaction with Carbamazepine');
  const carbaInter = interactions.find(i => (i.genericA === 'carbamazepine' && i.genericB === 'olanzapine') || (i.genericA === 'olanzapine' && i.genericB === 'carbamazepine'));
  assert.ok(
    carbaInter.clinicalEffect.includes('40%') || carbaInter.mechanism.includes('CYP1A2'),
    'Carbamazepine interaction must document clearance acceleration / AUC reduction via CYP1A2 induction'
  );

  // Lorazepam / Parenteral Benzodiazepines (Fatal risk with parenteral formulation)
  assert.ok(partnerDrugs.includes('lorazepam'), 'Must document interaction with Lorazepam');
  const loraInter = interactions.find(i => (i.genericA === 'lorazepam' && i.genericB === 'olanzapine') || (i.genericA === 'olanzapine' && i.genericB === 'lorazepam'));
  assert.ok(loraInter.clinicalEffect.includes('respiratory') || loraInter.management.includes('parenteral'), 'Lorazepam interaction must document respiratory depression / parenteral co-administration risks');

  // Ramipril / Antihypertensives (Additive hypotension)
  assert.ok(partnerDrugs.includes('ramipril'), 'Must document interaction with Ramipril');
});

test('3. Bangladesh Brands Audit for Olanzapine', () => {
  const db = DrugService.loadDb();
  const olanzapineBrands = db.brands.filter(b => b.genericId === 'olanzapine');
  assert.equal(olanzapineBrands.length, 25, `Must find exact 25 cataloged Olanzapine brands, found ${olanzapineBrands.length}`);

  const mfgSet = new Set(olanzapineBrands.map(b => b.manufacturerName));
  assert.ok(mfgSet.size >= 10, `Brands must span at least 10 manufacturers, found ${mfgSet.size}`);

  // All 25 imported brands must have verifiedPrice null and registrationStatus clear
  for (const b of olanzapineBrands) {
    assert.equal(b.verifiedPrice, null, `Brand ${b.brandName} unverified price must be null`);
    assert.ok(
      b.registrationStatus.includes('DGDA Verification Pending'),
      `Brand ${b.brandName} must reflect pending registration verification, got: ${b.registrationStatus}`
    );
  }
});

test('4. Data Integrity Audit: Zero Fabricated Metadata Across Database', () => {
  const db = DrugService.loadDb();

  // 1. Zero synthetic VAR01 ATC codes in published monographs
  const publishedGenerics = db.generics.filter(g => g.medicalReview?.status === 'published');
  for (const g of publishedGenerics) {
    assert.notEqual(g.atcCode, 'VAR01', `Generic ${g.id} must not have placeholder VAR01 ATC code`);
    assert.ok(g.atcCode && g.atcCode.length >= 5, `Generic ${g.id} must have valid ATC code, got: ${g.atcCode}`);
  }

  // 2. Zero synthetic reviewer names
  for (const g of db.generics) {
    const reviewer = g.medicalReview?.reviewerName || '';
    assert.ok(!reviewer.includes('Ingestion Engine'), `Generic ${g.id} must not have synthetic reviewer 'Ingestion Engine'`);
    assert.ok(!reviewer.includes('MBBS Data Auditor'), `Generic ${g.id} must not have synthetic reviewer 'MBBS Data Auditor'`);
  }
});

test('5. Clinical Coverage Report & Review Workflow Verification', () => {
  const report = DrugService.getCoverageReport();
  assert.equal(report.totalGenerics, 1519, `Total generics must be 1519, got: ${report.totalGenerics}`);
  assert.equal(report.byStatus.published, 25, `Published verified generics must be 25, got: ${report.byStatus.published}`);
  assert.equal(report.byStatus.imported, 1494, `Imported generics must be 1494, got: ${report.byStatus.imported}`);
  assert.equal(report.totalBrands, 21228, `Total brands must be 21228, got: ${report.totalBrands}`);
  assert.equal(report.incompleteGenericsCount, 1515, `Incomplete generics count must be 1515, got: ${report.incompleteGenericsCount}`);
  assert.ok(report.incompleteGenerics.length > 0, 'Incomplete generics list must not be empty');

  // Verify Review Status Update with qualification validation
  const invalidAttempt = DrugService.updateClinicalReviewStatus({
    genericId: 'olanzapine',
    status: 'published',
    reviewerName: '', // Missing reviewer name
    reviewerCredentials: ''
  });
  assert.equal(invalidAttempt.success, false, 'Update to published without reviewer name must fail');

  const validAttempt = DrugService.updateClinicalReviewStatus({
    genericId: 'olanzapine',
    status: 'published',
    reviewerName: 'Prof. Dr. M. S. Islam, MBBS, FCPS',
    reviewerCredentials: 'BM&DC #A-18239, Clinical Pharmacologist',
    reviewNotes: 'Verified against DailyMed Zyprexa label SetID 96165590-b287-0ed9-3723-752af59aedad'
  });
  assert.equal(validAttempt.success, true, 'Valid clinical review update must succeed');
  assert.equal(validAttempt.generic.medicalReview.status, 'published');
});
