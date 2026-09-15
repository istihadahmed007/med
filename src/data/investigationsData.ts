import { EcgTestCase } from '../types';

export const ECG_TEST_CASES: EcgTestCase[] = [
  {
    id: 'ecg-normal',
    name: 'Normal 12-Lead Sinus Rhythm',
    heartRate: 72,
    rhythm: 'Regular sinus rhythm (upright P wave in lead II, followed by QRS)',
    axis: 'Normal cardiac axis (+45°: positive QRS in Lead I, II, and aVF)',
    pWave: 'Normal morphology (duration < 0.12s, amplitude < 2.5 mm in lead II)',
    prInterval: '0.16 seconds (Normal range: 0.12 – 0.20s)',
    qrsDuration: '0.08 seconds (Normal narrow QRS < 0.12s)',
    stSegment: 'Isoelectric with no elevation or depression',
    tWave: 'Concordant, positive in I, II, V3–V6; inverted in aVR',
    diagnosis: 'Normal 12-Lead Electrocardiogram',
    highYieldPearl: 'Standard calibration: paper speed 25 mm/sec (1 small box = 0.04s, 1 large box = 0.20s), voltage 10 mm/mV (1 small box = 0.1 mV).'
  },
  {
    id: 'ecg-anterior-stemi',
    name: 'Acute Extensive Anterior ST-Elevation Myocardial Infarction',
    heartRate: 98,
    rhythm: 'Sinus tachycardia with frequent ventricular ectopics',
    axis: 'Normal to left axis',
    pWave: 'Normal sinus P waves present',
    prInterval: '0.15 seconds',
    qrsDuration: '0.09 seconds with developing pathologic Q waves in V1–V3',
    stSegment: '4–5 mm convex "tombstone" ST-segment elevation in precordial leads V1 through V5; reciprocal ST depression in leads II, III, and aVF',
    tWave: 'Hyperacute positive T waves merging with elevated ST segment',
    diagnosis: 'Acute Extensive Anterior STEMI due to Proximal LAD Occlusion',
    highYieldPearl: 'Reciprocal changes in inferior leads (II, III, aVF) confirm acute transmural ischemia and differentiate STEMI from benign pericarditis.'
  },
  {
    id: 'ecg-afib',
    name: 'Atrial Fibrillation with Rapid Ventricular Response',
    heartRate: 135,
    rhythm: 'Irregularly irregular rhythm with fluctuating R-R intervals',
    axis: 'Normal axis',
    pWave: 'Absent discrete P waves; chaotic baseline fibrillatory ("f") waves',
    prInterval: 'Not measurable due to absence of coordinated atrial depolarization',
    qrsDuration: '0.08 seconds (Narrow complex QRS)',
    stSegment: 'Nonspecific ST-T flattening',
    tWave: 'Variable morphology',
    diagnosis: 'Atrial Fibrillation (AF) with Rapid Ventricular Response (RVR)',
    highYieldPearl: 'Stroke prevention requires CHA2DS2-VASc score calculation and oral anticoagulation (Warfarin or DOAC) in eligible patients.'
  },
  {
    id: 'ecg-hyperkalemia',
    name: 'Severe Hyperkalemia (Serum K+ > 7.2 mmol/L)',
    heartRate: 54,
    rhythm: 'Sinus bradycardia transitioning to sinoventricular rhythm',
    axis: 'Left axis deviation',
    pWave: 'Markedly flattened, widened, or absent P waves',
    prInterval: 'Prolonged (> 0.24s) where identifiable',
    qrsDuration: '0.16 seconds (Markedly widened QRS merging into sine-wave pattern)',
    stSegment: 'Obscured by wide QRS and tall T wave transition',
    tWave: 'Tall, narrow-based, symmetrical "tented" peaked T waves across V2–V5',
    diagnosis: 'Severe Hyperkalemia: Sine Wave Pre-Arrest Pattern',
    highYieldPearl: 'Immediate emergency antidote is IV Calcium Gluconate 10% (10 mL over 5 min) to stabilize myocardial membrane excitability, followed by insulin-dextrose and salbutamol.'
  }
];

export interface XrayCase {
  id: string;
  name: string;
  projection: 'PA Erect' | 'AP Supine';
  radiologicalSigns: string[];
  anatomicalLandmarks: { name: string; position: { x: number; y: number } }[];
  diagnosis: string;
  pathologyExplanation: string;
  clinicalNextStep: string;
}

export const XRAY_CASES: XrayCase[] = [
  {
    id: 'cxr-tension-pneumothorax',
    name: 'Tension Pneumothorax (Right Hemithorax)',
    projection: 'PA Erect',
    radiologicalSigns: [
      'Hyperlucent right hemithorax devoid of bronchovascular lung markings',
      'Completely collapsed right lung margin forming a dense visceral pleural line at hilum',
      'Marked contralateral tracheal and mediastinal shift to the left',
      'Flattening and depression of the right hemidiaphragm'
    ],
    anatomicalLandmarks: [
      { name: 'Shifted Trachea', position: { x: 42, y: 18 } },
      { name: 'Collapsed Lung Edge', position: { x: 62, y: 48 } },
      { name: 'Hyperlucent Space', position: { x: 75, y: 55 } },
      { name: 'Depressed Diaphragm', position: { x: 70, y: 85 } }
    ],
    diagnosis: 'Right-sided Tension Pneumothorax',
    pathologyExplanation: 'One-way valve mechanism traps inspired air inside the pleural space during every breath, generating positive intrathoracic pressure that compresses the vena cava and arrests venous return, causing fatal cardiovascular collapse.',
    clinicalNextStep: 'Do NOT wait for CXR if clinically diagnosed! Perform immediate emergency needle thoracocentesis (large bore cannula in 2nd intercostal space midclavicular line or 5th intercostal space midaxillary line), followed by underwater seal chest drain.'
  },
  {
    id: 'cxr-lobar-pneumonia',
    name: 'Right Middle Lobe Lobar Pneumonia',
    projection: 'PA Erect',
    radiologicalSigns: [
      'Dense homogeneous triangular opacity in right lower/mid zone',
      'Loss of right heart border clarity (Positive Silhouette Sign)',
      'Sharp superior boundary formed by the horizontal fissure',
      'Presence of air bronchograms (air-filled bronchi inside consolidated alveoli)'
    ],
    anatomicalLandmarks: [
      { name: 'Horizontal Fissure', position: { x: 65, y: 42 } },
      { name: 'Silhouetted Right Heart Border', position: { x: 56, y: 62 } },
      { name: 'Air Bronchograms', position: { x: 68, y: 58 } }
    ],
    diagnosis: 'Right Middle Lobe Consolidation (Streptococcus pneumoniae)',
    pathologyExplanation: 'Alveolar air spaces are filled with inflammatory exudate, neutrophils, fibrin, and erythrocytes (red/grey hepatization phases of lobar pneumonia).',
    clinicalNextStep: 'Initiate empirical antibiotic coverage (e.g. Amoxicillin/Clavulanate or Ceftriaxone + Azithromycin according to BM&DC national guidelines) and assess CURB-65 pneumonia severity score.'
  }
];

export interface LabPanelTest {
  testName: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  clinicalImplication: string;
}

export const SAMPLE_LAB_DATA = {
  cbcSepsis: [
    { testName: 'Hemoglobin', value: 11.2, unit: 'g/dL', normalRange: '13.0 - 17.0', status: 'low', clinicalImplication: 'Mild normocytic normochromic anemia of chronic disease or acute infection.' },
    { testName: 'Total Leukocyte Count (WBC)', value: 21400, unit: '/mm³', normalRange: '4,000 - 11,000', status: 'critical', clinicalImplication: 'Severe leukocytosis indicating bacterial sepsis or systemic inflammatory response.' },
    { testName: 'Neutrophils', value: 89, unit: '%', normalRange: '40 - 75', status: 'high', clinicalImplication: 'Neutrophilia with toxic granulations and left shift (> 80% band forms).' },
    { testName: 'Platelets', value: 92000, unit: '/mm³', normalRange: '150,000 - 450,000', status: 'low', clinicalImplication: 'Thrombocytopenia, potential early disseminated intravascular coagulation (DIC) or consumptive sepsis.' },
    { testName: 'ESR (1st hour)', value: 85, unit: 'mm', normalRange: '< 15', status: 'high', clinicalImplication: 'Marked acute phase reactant elevation.' }
  ] as LabPanelTest[],
  abgAcidosis: [
    { testName: 'pH', value: 7.15, unit: '', normalRange: '7.35 - 7.45', status: 'critical', clinicalImplication: 'Severe acidemia; impairs cardiac contractility and vascular tone responsiveness.' },
    { testName: 'PaCO2', value: 22, unit: 'mmHg', normalRange: '35 - 45', status: 'low', clinicalImplication: 'Compensatory respiratory alkalosis (blowing off CO2 via hyperventilation).' },
    { testName: 'PaO2', value: 94, unit: 'mmHg', normalRange: '80 - 100', status: 'normal', clinicalImplication: 'Adequate oxygenation on room air.' },
    { testName: 'HCO3- (Bicarbonate)', value: 9.2, unit: 'mmol/L', normalRange: '22 - 26', status: 'critical', clinicalImplication: 'Severe primary metabolic acidosis.' },
    { testName: 'Serum Lactate', value: 6.8, unit: 'mmol/L', normalRange: '0.5 - 2.0', status: 'critical', clinicalImplication: 'Type A lactic acidosis from severe tissue hypoperfusion in septic/cardiogenic shock.' }
  ] as LabPanelTest[]
};
