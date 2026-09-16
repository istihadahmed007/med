import { ClinicalCase } from '../types';
import { CARDIOVASCULAR_PILOT_CASES } from './cardiovascularPilotData';

const BASE_CASES: ClinicalCase[] = [
  {
    id: 'case-stemi-01',
    title: '52-year-old Male with Crushing Retrosternal Chest Pain (STEMI)',
    difficulty: 'Final Year MBBS',
    phase: 'Phase 4: 5th Year (Clinical)',
    system: 'cardiovascular',
    patientDemographics: {
      name: 'Md. Rafiqul Islam',
      age: 52,
      gender: 'Male',
      occupation: 'Bank Manager',
      ward: 'Coronary Care Unit (CCU), Dhaka Medical College Hospital'
    },
    chiefComplaint: 'Severe retrosternal chest tightness radiating to the left arm and jaw for the past 2.5 hours, accompanied by profuse sweating and nausea.',
    historyOptions: [
      {
        id: 'hx-pain-char',
        question: 'Can you describe the character, duration, and radiation of the pain?',
        patientAnswer: '"Doctor, it feels like a heavy elephant is sitting directly on my chest. It started 2.5 hours ago while I was climbing stairs. It radiates straight into my left shoulder, inner arm, and lower jaw. Rest did not relieve it at all."',
        clinicalSignificance: 'Classic ischemic cardiac pain; heavy pressure sensation radiating to ulnar border of left arm and jaw is pathognomonic for Acute Coronary Syndrome.'
      },
      {
        id: 'hx-risk-factors',
        question: 'Do you have diabetes, high blood pressure, or a smoking history?',
        patientAnswer: '"Yes doctor, I have had Type 2 Diabetes for 8 years and Hypertension for 5 years. I also smoke 1 pack of cigarettes a day for the last 25 years. My father died suddenly of a heart attack at age 48."',
        clinicalSignificance: 'Multiple major Framingham cardiovascular risk factors: diabetes, hypertension, heavy smoking, and premature family history of CAD.'
      },
      {
        id: 'hx-contraindications',
        question: 'Have you ever had a bleeding ulcer, recent surgery, or any stroke / bleeding in the brain?',
        patientAnswer: '"No doctor, never had any stroke, brain bleed, or stomach ulcers. No recent surgeries."',
        clinicalSignificance: 'Rule out absolute contraindications to thrombolysis (e.g. streptokinase) if primary PCI is unavailable.'
      }
    ],
    initialVitals: {
      bp: '160/95 mmHg',
      hr: 104,
      rr: 22,
      spo2: 95,
      temp: 37.1,
      gcs: '15/15'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Patient looks acutely distressed, pale, diaphoretic (sweaty), clutching his chest (Levine sign).',
        palpation: 'Peripheral pulses rapid and regular, cold clammy extremities.',
        percussion: 'Normal.',
        auscultation: 'Respiratory rate 22/min, shallow.'
      },
      {
        system: 'Cardiovascular System',
        inspection: 'No visible precordial pulsations, JVP not elevated initially.',
        palpation: 'Apex beat in left 5th intercostal space within midclavicular line, normal character.',
        percussion: 'Cardiac dullness within normal limits.',
        auscultation: 'S1, S2 audible; soft S4 gallop present reflecting decreased left ventricular compliance. No murmurs or pericardial friction rub.'
      },
      {
        system: 'Respiratory System',
        inspection: 'Tachypneic, vesicular breath sounds.',
        palpation: 'Vocal resonance normal.',
        percussion: 'Resonant throughout.',
        auscultation: 'Vesicular breath sounds bilaterally, faint bibasilar end-inspiratory crackles (Killip Class II).'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-ecg-01',
        type: 'ECG',
        resultTitle: 'Emergency 12-Lead Electrocardiogram',
        reportSummary: '4 mm convex-upward ST-segment elevation in leads V1-V4, with reciprocal ST depression in leads II, III, aVF.',
        revealedValue: 'Extensive Acute Anterior ST-Elevation Myocardial Infarction (STEMI). Culprit: Proximal LAD occlusion.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-trop-01',
        type: 'Cardiac Enzymes',
        resultTitle: 'High-Sensitivity Cardiac Troponin I (hs-cTnI)',
        reportSummary: 'hs-cTnI level: 1,840 ng/L (Normal reference < 14 ng/L).',
        revealedValue: 'Markedly elevated above 99th percentile, confirming ongoing myocardial necrosis.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-cxr-01',
        type: 'Chest X-Ray',
        resultTitle: 'Portable Bedside Chest Radiograph (CXR)',
        reportSummary: 'Cardiothoracic ratio normal (0.48). Mild pulmonary venous congestion in upper lobes.',
        revealedValue: 'No pneumothorax or mediastinal widening (rules out acute aortic dissection).',
        isKeyInvestigation: false
      }
    ],
    differentialDiagnoses: [
      'Acute Anterior ST-Elevation Myocardial Infarction (STEMI)',
      'Acute Aortic Dissection (Stanford Type A)',
      'Acute Pulmonary Embolism',
      'Acute Pericarditis',
      'Boerhaave Syndrome (Esophageal Rupture)'
    ],
    finalDiagnosis: 'Acute Extensive Anterior Myocardial Infarction (STEMI) secondary to acute atherothrombotic occlusion of Left Anterior Descending (LAD) Coronary Artery (Killip Class II).',
    managementOptions: [
      {
        id: 'tx-loading-dapt',
        treatmentName: 'Aspirin 300 mg (chewed) + Ticagrelor 180 mg loading dose + Atorvastatin 80 mg',
        isCorrectFirstLine: true,
        consequence: 'Optimal dual antiplatelet inhibition and plaque stabilization initiated immediately.',
        vitalsDelta: { hr: 96 }
      },
      {
        id: 'tx-revasc-pci',
        treatmentName: 'Emergency Primary Percutaneous Coronary Intervention (PCI) within 90 minutes door-to-balloon',
        isCorrectFirstLine: true,
        consequence: 'Angiography confirms 100% proximal LAD thrombus. Drug-Eluting Stent placed with TIMI 3 flow restored. Chest pain resolves completely.',
        vitalsDelta: { bp: '125/80 mmHg', hr: 78, rr: 16 }
      },
      {
        id: 'tx-thrombolysis',
        treatmentName: 'Streptokinase 1.5 million units IV in 100 mL Normal Saline over 60 mins (if Primary PCI unavailable within 120 mins)',
        isCorrectFirstLine: true,
        consequence: 'Thrombolytic therapy successfully lyses coronary clot; ST segments resolve by >50% within 90 minutes.'
      },
      {
        id: 'tx-harmful-nsaid',
        treatmentName: 'IM Diclofenac Sodium 75 mg for pain relief',
        isCorrectFirstLine: false,
        consequence: 'CRITICAL ERROR: Traditional NSAIDs increase myocardial rupture risk and platelet aggregation in acute MI, and IM injections preclude systemic thrombolysis/anticoagulation.'
      }
    ],
    debriefAndLearningPoints: [
      'Time is muscle: Primary PCI within 90 minutes is the gold standard for acute STEMI.',
      'DAPT (Aspirin + Ticagrelor/Clopidogrel) and high-dose Statin must be given before catheterization.',
      'Always obtain right-sided ECG leads (V4R) if inferior MI is present to exclude right ventricular infarction.'
    ]
  }
];

export const CLINICAL_CASES: ClinicalCase[] = [
  ...CARDIOVASCULAR_PILOT_CASES,
  ...BASE_CASES
];
