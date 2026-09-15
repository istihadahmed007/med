import { DrugJourney } from '../types';

export const DRUG_JOURNEYS: DrugJourney[] = [
  {
    id: 'furosemide',
    genericName: 'Furosemide',
    tradeNamesInBD: ['Lasix', 'Fusid', 'Uritone', 'Edemide'],
    drugClass: 'High-Ceiling Loop Diuretic (Sulfonamide derivative)',
    route: 'Oral (40–80 mg) or Intravenous (20–100 mg slow bolus)',
    absorptionSite: 'Upper gastrointestinal tract (bioavailability approx. 50–60%; IV onset within 5 minutes).',
    distributionAndProteinBinding: 'Extensively bound to plasma albumin (> 95%); actively secreted into proximal tubule lumen via organic acid transporter (OAT).',
    targetReceptorOrEnzyme: 'Na+-K+-2Cl- (NKCC2) cotransporter in the apical membrane of the Thick Ascending Limb (TAL) of Loop of Henle.',
    molecularMechanism: 'Competitively blocks the chloride binding site of the NKCC2 symporter. Abolishes the medullary hypertonic osmotic gradient and reduces lumen-positive transepithelial potential.',
    physiologicalEffect: 'Inhibits reabsorption of 20–25% of filtered sodium load; increases excretion of Na+, Cl-, K+, Ca2+, and Mg2+; promotes marked water diuresis and induces renal prostaglandin synthesis (venodilation).',
    clinicalIndications: [
      'Acute Cardiogenic Pulmonary Edema (IV bolus creates immediate venodilation within minutes)',
      'Chronic Congestive Cardiac Failure (symptomatic fluid retention)',
      'Cirrhotic Ascites (combined with Spironolactone)',
      'Nephrotic Syndrome and Acute Oliguric Renal Failure',
      'Severe Acute Hypercalcemia (with IV normal saline)'
    ],
    contraindications: [
      'Anuria refractory to test dose',
      'Severe hypokalemia (< 3.0 mmol/L) or hyponatremia',
      'Pre-renal hypovolemic shock or severe dehydration',
      'Sulfonamide hypersensitivity allergy'
    ],
    adverseEffects: [
      'Profound hypokalemic metabolic alkalosis',
      'Hyponatremia, hypomagnesemia, hypocalcemia',
      'Hyperuricemia (competes with uric acid for tubular secretion -> triggers acute gout)',
      'Ototoxicity (tinnitus, reversible or irreversible deafness, especially when co-administered with Aminoglycosides)',
      'Orthostatic hypotension'
    ],
    monitoringParameters: [
      'Daily serum electrolytes (Na+, K+, Mg2+)',
      'Serum Creatinine & Blood Urea Nitrogen (BUN)',
      'Daily fluid intake/output chart and body weight',
      'Blood pressure (sitting and standing)'
    ],
    highYieldExamPoints: [
      'Loop of Henle accounts for reabsorption of ~25% of filtered sodium.',
      'Unlike Thiazides which cause hypercalcemia, Furosemide causes HYPOCALCEMIA ("Loops lose calcium").',
      'IV Furosemide improves dyspnea in acute pulmonary edema within 5 minutes due to prostaglandin-mediated venodilation BEFORE diuresis begins at 20 minutes.'
    ]
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    tradeNamesInBD: ['Ventolin', 'Sultolin', 'Asthalin', 'Brodil'],
    drugClass: 'Short-Acting Selective Beta-2 Adrenergic Agonist (SABA)',
    route: 'Inhaled MDI (100–200 mcg per puff), Nebulized (2.5–5 mg), Oral (2–4 mg), IV (emergency)',
    absorptionSite: 'Pulmonary deposition (~10–20% reaches lower bronchial tree; swallowed fraction undergoes first-pass hepatic metabolism).',
    distributionAndProteinBinding: 'Widely distributed; crosses placenta and enters breast milk in trace amounts.',
    targetReceptorOrEnzyme: 'Beta-2 Adrenergic G-protein Coupled Receptors (Gs) on bronchial smooth muscle cells.',
    molecularMechanism: 'Binding activates adenylate cyclase -> converts ATP to cyclic AMP (cAMP) -> activates Protein Kinase A (PKA) -> phosphorylates myosin light chain kinase (MLCK) -> reduces intracellular Ca2+ -> bronchial smooth muscle relaxation.',
    physiologicalEffect: 'Potent and rapid bronchodilation (onset 2–5 min, duration 4–6 hours); stimulates mucociliary clearance; inhibits mediator release from mast cells; drives K+ into intracellular compartments.',
    clinicalIndications: [
      'Immediate relief of acute bronchospasm in Bronchial Asthma',
      'Acute Exacerbation of Chronic Obstructive Pulmonary Disease (COPD)',
      'Prevention of Exercise-Induced Bronchoconstriction (EIB)',
      'Emergency adjunctive treatment of Severe Hyperkalemia (shifts potassium into cells)'
    ],
    contraindications: [
      'Hypersensitivity to salbutamol',
      'Uncontrolled severe tachyarrhythmias or thyrotoxicosis'
    ],
    adverseEffects: [
      'Fine skeletal muscle tremor (due to stimulation of beta-2 receptors in skeletal muscle spindle)',
      'Tachycardia, palpitations, and peripheral vasodilation',
      'Hypokalemia (drives K+ into skeletal muscle)',
      'Hyperglycemia and transient lactic acidemia with high doses',
      'Paradoxical bronchospasm (rare, idiosyncratic)'
    ],
    monitoringParameters: [
      'Peak Expiratory Flow Rate (PEFR)',
      'Pulse rate and heart rhythm',
      'Serum potassium levels in hospitalized patients receiving frequent nebulizations'
    ],
    highYieldExamPoints: [
      'Skeletal muscle tremor is the most common and dose-limiting side effect.',
      'Nebulized high-dose Salbutamol is used alongside IV Calcium and Insulin-Dextrose for life-threatening hyperkalemia.',
      'Regular overuse of SABA without inhaled corticosteroid (ICS) is associated with beta-receptor downregulation and increased asthma mortality.'
    ]
  }
];
