import { OspeStation, OsceStation } from '../types';

export const OSPE_STATIONS: OspeStation[] = [
  {
    id: 'ospe-anatomy-01',
    phase: 'Phase 1: 1st & 2nd Year',
    subject: 'Anatomy',
    stationNumber: 1,
    title: 'Gross Anatomy of the Heart: Marked Structure',
    instructions: 'Examine the marked pointer on the 3D cardiac specimen. Answer the questions on your answer sheet within the 3-minute station limit.',
    timeSeconds: 180,
    specimenType: '3d-heart',
    markedStructureId: 'left-ventricle',
    questions: [
      {
        id: 'q1',
        prompt: '1. Identify the marked anatomical chamber and the artery coursing along its anterior surface.',
        marks: 2,
        acceptableAnswers: ['Left ventricle', 'Left anterior descending artery', 'LAD', 'Anterior interventricular artery'],
        explanation: 'The pointer points to the left ventricle (forming the cardiac apex) and the Left Anterior Descending (LAD) branch of the left coronary artery.'
      },
      {
        id: 'q2',
        prompt: '2. State two important anatomical relations of the posterior surface of this organ.',
        marks: 2,
        acceptableAnswers: ['Esophagus', 'Descending thoracic aorta', 'Thoracic duct', 'Left atrium'],
        explanation: 'Posterior relations of the heart include the esophagus, descending thoracic aorta, azygos vein, and thoracic duct in the posterior mediastinum.'
      },
      {
        id: 'q3',
        prompt: '3. What is the clinical significance of occlusion of the marked artery?',
        marks: 1,
        acceptableAnswers: ['Anterior wall myocardial infarction', 'STEMI', 'Cardiogenic shock', 'Heart attack'],
        explanation: 'LAD occlusion leads to acute extensive anterior wall STEMI, potentially complicated by cardiogenic shock and bundle branch blocks.'
      }
    ]
  },
  {
    id: 'ospe-pathology-02',
    phase: 'Phase 3: 4th Year',
    subject: 'Pathology',
    stationNumber: 2,
    title: 'Vascular Pathology: Gross & Microscopic Specimen',
    instructions: 'Identify the demonstrated arterial cross-section specimen. Answer all parts accurately.',
    timeSeconds: 180,
    specimenType: 'histology-slide',
    markedStructureId: 'atheroma-plaque',
    questions: [
      {
        id: 'q1',
        prompt: '1. Identify the underlying pathological process shown in the arterial lumen.',
        marks: 2,
        acceptableAnswers: ['Atherosclerosis', 'Atheromatous plaque', 'Atheroma', 'Fibrofatty plaque'],
        explanation: 'The specimen shows advanced atherosclerosis with necrotic lipid core, fibrous cap, and luminal stenosis.'
      },
      {
        id: 'q2',
        prompt: '2. Name the hallmark foam cells and their cellular origin.',
        marks: 2,
        acceptableAnswers: ['Macrophage', 'Smooth muscle cell', 'Lipid-laden macrophage'],
        explanation: 'Foam cells are lipid-laden macrophages and modified vascular smooth muscle cells that have ingested oxidized LDL particles.'
      },
      {
        id: 'q3',
        prompt: '3. State two acute catastrophic complications of this lesion.',
        marks: 1,
        acceptableAnswers: ['Plaque rupture', 'Acute thrombosis', 'Myocardial infarction', 'Aneurysm', 'Embolization'],
        explanation: 'Complications include plaque rupture with superimposed occlusive thrombosis, intraplaque hemorrhage, and aneurysmal thinning.'
      }
    ]
  },
  {
    id: 'ospe-pharmacology-03',
    phase: 'Phase 3: 4th Year',
    subject: 'Pharmacology',
    stationNumber: 3,
    title: 'Emergency Drug Ampoule: Identification & Clinical Use',
    instructions: 'Observe the labeled emergency drug vial (Injection Furosemide 20mg/2ml). Answer the questions.',
    timeSeconds: 180,
    specimenType: 'instrument',
    markedStructureId: 'furosemide-ampoule',
    questions: [
      {
        id: 'q1',
        prompt: '1. State the pharmacological class and primary site of action of this drug in the nephron.',
        marks: 2,
        acceptableAnswers: ['Loop diuretic', 'Thick ascending limb of Loop of Henle', 'NKCC2 symporter'],
        explanation: 'Furosemide is a loop diuretic that reversibly inhibits the Na+-K+-2Cl- (NKCC2) cotransporter in the thick ascending limb of Henle.'
      },
      {
        id: 'q2',
        prompt: '2. Name two life-saving acute clinical indications.',
        marks: 2,
        acceptableAnswers: ['Acute pulmonary edema', 'Acute left ventricular failure', 'Severe hypercalcemia', 'Hypertensive encephalopathy'],
        explanation: 'Indications include acute cardiogenic pulmonary edema, decompensated heart failure, and refractory ascites.'
      },
      {
        id: 'q3',
        prompt: '3. Mention two serious electrolyte abnormalities caused by rapid high-dose intravenous administration.',
        marks: 1,
        acceptableAnswers: ['Hypokalemia', 'Hyponatremia', 'Hypomagnesemia', 'Hypocalcemia', 'Metabolic alkalosis', 'Ototoxicity'],
        explanation: 'High doses cause profound hypokalemia, hypomagnesemic arrhythmias, and transient or permanent ototoxicity (deafness).'
      }
    ]
  }
];

export const OSCE_STATIONS: OsceStation[] = [
  {
    id: 'osce-cvs-exam-01',
    stationNumber: 1,
    title: 'Cardiovascular System: Examination of Precordium',
    domain: 'Clinical Examination',
    patientScenario: 'A 38-year-old male presents with exertional breathlessness and easy fatiguability. Examine his cardiovascular system (precordium).',
    patientScript: 'Lie comfortably at 45 degrees, relax chest, follow candidate requests politely.',
    candidateInstructions: 'Perform focused examination of the precordium including inspection, palpation, and auscultation. You have 5 minutes. Verbalize your findings to the examiner.',
    timeSeconds: 300,
    markingRubric: [
      { item: 'Informed Consent & Positioning', points: 2, criteria: 'Greets patient, explains procedure, washes hands, positions at 45° with adequate chest exposure.' },
      { item: 'Precordial Inspection', points: 3, criteria: 'Inspects for precordial scars, dilated veins, skeletal deformity, and apical impulse visible location.' },
      { item: 'Palpation of Apex Beat', points: 4, criteria: 'Palpates apex beat with palm, localizes with finger in left 5th ICS MCL; comments on tapping or heaving character.' },
      { item: 'Palpation for Parasternal Heave & Thrills', points: 3, criteria: 'Uses heel of hand at left sternal border (parasternal heave), palpates for diastolic/systolic thrill at apex and base.' },
      { item: 'Auscultation of 4 Cardiac Areas', points: 5, criteria: 'Auscultates with diaphragm & bell at Mitral, Tricuspid, Pulmonary, and Aortic areas; syncs with carotid pulse.' },
      { item: 'Special Maneuvers (Mitral/Aortic)', points: 3, criteria: 'Turns patient to left lateral position to listen to apex with bell in expiration; sits patient forward in full expiration for aortic area.' }
    ],
    modelPerformanceSummary: 'Demonstrates professional bedside manner, systematic inspection -> palpation -> auscultation, correct positioning of diaphragm and bell, and identifies tapping apex beat with mid-diastolic murmur of mitral stenosis.'
  },
  {
    id: 'osce-dots-counseling-02',
    stationNumber: 2,
    title: 'Counseling on Anti-Tubercular Therapy (DOTS Program)',
    domain: 'Communication & Counseling',
    patientScenario: 'A 28-year-old schoolteacher was diagnosed with Sputum Smear-Positive Pulmonary Tuberculosis. He is anxious about medications and transmission.',
    patientScript: 'Ask if TB is incurable, ask if pills will harm your liver, ask why urine turned orange, ask if family will catch it.',
    candidateInstructions: 'Counsel the patient regarding his diagnosis, DOTS treatment regimen (4FDC: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol), duration, side effects, and household safety.',
    timeSeconds: 300,
    markingRubric: [
      { item: 'Empathy & Rapport', points: 3, criteria: 'Establishes warm empathetic communication, validates patient distress, assures that TB is 100% curable with complete treatment.' },
      { item: 'DOTS Regimen Explanation', points: 4, criteria: 'Explains 2 months Intensive Phase (4FDC) followed by 4 months Continuation Phase (2FDC); stresses zero missed doses to prevent MDR-TB.' },
      { item: 'Explanation of Benign Red/Orange Urine', points: 3, criteria: 'Proactively warns patient that Rifampicin turns urine, sweat, and tears harmless orange/reddish, reassuring no cause for panic.' },
      { item: 'Adverse Effects & Red Flags', points: 4, criteria: 'Educates on symptoms of hepatotoxicity (jaundice, nausea, dark urine), peripheral neuropathy (gives Pyridoxine with INH), and visual changes (Ethambutol).' },
      { item: 'Infection Control & Family Screening', points: 4, criteria: 'Instructs cough hygiene, well-ventilated room, and immediate screening of household contacts, especially under-5 children for IPT.' },
      { item: 'Opportunity for Questions & Summary', points: 2, criteria: 'Checks comprehension, asks patient to summarize key points, provides national DOTS center follow-up appointment.' }
    ],
    modelPerformanceSummary: 'Exemplary patient-centered counseling adhering to National Tuberculosis Control Program (NTP) Bangladesh guidelines.'
  }
];
