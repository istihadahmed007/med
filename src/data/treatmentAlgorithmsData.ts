import { TreatmentAlgorithm } from '../types';

export const TREATMENT_ALGORITHMS: TreatmentAlgorithm[] = [
  {
    id: 'rx-asthma-protocol',
    conditionName: 'Acute Severe & Life-Threatening Asthma in Adults',
    authorityGuideline: 'British Thoracic Society (BTS) / SIGN / BM&DC National Respiratory Protocol',
    lastReviewed: 'March 2026',
    reviewerName: 'Prof. Dr. M. A. Jalil (Pulmonologist & Faculty Reviewer)',
    severityLevels: [
      {
        level: 'Moderate',
        criteria: [
          'Increasing symptoms with PEFR 50–75% best/predicted',
          'Respiratory rate < 25 breaths/min',
          'Heart rate < 110 beats/min',
          'Able to complete sentences in one breath'
        ],
        firstLineManagement: [
          'High-flow oxygen via nasal cannula/mask to maintain SpO2 94–98%',
          'Inhaled SABA: Salbutamol 4–10 puffs via spacer or 5 mg nebulized with oxygen',
          'Oral Prednisolone 40–50 mg daily for at least 5 days'
        ],
        monitoring: [
          'Reassess PEFR and vitals every 15–30 minutes',
          'If PEFR remains < 75% after 1 hour, escalate to severe pathway'
        ],
        escalationTrigger: 'PEFR drops < 50%, inability to speak in sentences, or tachycardia > 110 bpm'
      },
      {
        level: 'Severe / Life-Threatening',
        criteria: [
          'PEFR < 50% predicted (Severe) or PEFR < 33% (Life-threatening)',
          'Tachypnea RR ≥ 25/min, Tachycardia HR ≥ 110 bpm',
          'Life-Threatening Red Flags: Silent chest, cyanosis, feeble respiratory effort, bradycardia, confusion, exhaustion',
          'Blood Gas Danger: PaCO2 normal (35-45 mmHg) or elevated (> 45 mmHg) signifies impending respiratory arrest!'
        ],
        firstLineManagement: [
          'Oxygen via high-concentration mask (10–15 L/min with reservoir bag)',
          'Nebulized Salbutamol 5 mg driven by oxygen, repeated every 15–20 minutes',
          'Add Nebulized Ipratropium Bromide 0.5 mg every 4–6 hours',
          'Intravenous Hydrocortisone 100 mg stat, or oral Prednisolone 40–50 mg',
          'Intravenous Magnesium Sulphate 1.2–2 g infusion in 100 mL 0.9% NaCl over 20 minutes',
          'Maintain IV access and monitor continuous cardiac telemetry'
        ],
        monitoring: [
          'Repeat PEFR 15–30 minutes after each nebulizer',
          'Arterial blood gas at 60 minutes if PaO2 < 60 mmHg or patient fatiguing',
          'Continuous pulse oximetry and ECG monitoring'
        ],
        escalationTrigger: 'Rising PaCO2, worsening acidemia (pH < 7.25), hemodynamic instability, or deteriorating consciousness'
      }
    ],
    emergencyReferralCriteria: [
      'Failed response to repeated bronchodilators and IV magnesium within 60 minutes',
      'Exhaustion, drowsiness, or delirium',
      'Silent chest upon auscultation with absent breath sounds',
      'Immediate alert to ICU / Critical Care Team for rapid sequence endotracheal intubation'
    ],
    references: [
      'BTS/SIGN British Guideline on the Management of Asthma (SIGN 158), updated 2023/2024',
      'Global Initiative for Asthma (GINA) Global Strategy for Asthma Management and Prevention',
      'Bangladesh College of Physicians & Surgeons (BCPS) Clinical Guidelines in Medicine'
    ]
  },
  {
    id: 'rx-stemi-protocol',
    conditionName: 'Acute ST-Elevation Myocardial Infarction (STEMI)',
    authorityGuideline: 'ESC / ACC / AHA Guidelines for the Management of Acute Myocardial Infarction',
    lastReviewed: 'January 2026',
    reviewerName: 'Dr. S. K. Roy (Interventional Cardiologist)',
    severityLevels: [
      {
        level: 'Severe / Life-Threatening',
        criteria: [
          'Persistent ischemic chest pain > 20 minutes',
          'ECG: ST elevation at J-point ≥ 2.5 mm in men < 40y, ≥ 2 mm in men ≥ 40y, or ≥ 1.5 mm in women in leads V2–V3; or ≥ 1 mm in other contiguous leads',
          'New Left Bundle Branch Block (LBBB) with Sgarbossa criteria',
          'Killip Classification: Class I (no rales) to Class IV (cardiogenic shock BP < 90 mmHg)'
        ],
        firstLineManagement: [
          'Dual Antiplatelet Therapy (DAPT): Aspirin 300 mg chewed stat + Ticagrelor 180 mg (or Clopidogrel 300–600 mg)',
          'High-intensity Statin: Atorvastatin 80 mg orally stat',
          'Pain relief: Sublingual GTN (0.4 mg) unless systolic BP < 90 mmHg or RV infarction; IV Morphine 3–5 mg with antiemetic',
          'Oxygen ONLY if SpO2 < 90% (avoid hyperoxia-induced coronary vasoconstriction)',
          'Reperfusion Choice: Primary PCI (Door-to-balloon < 90 mins) is gold standard; if PCI transfer > 120 mins, administer IV Streptokinase (1.5 million units in 100 mL saline over 60 mins) within 12 hours of symptom onset'
        ],
        monitoring: [
          'Continuous 12-lead ECG telemetry for ventricular fibrillation and heart blocks',
          'Blood pressure and rhythm checks every 15 minutes during thrombolytic infusion'
        ],
        escalationTrigger: 'Persistent ST elevation without 50% resolution at 90 minutes post-thrombolysis (requires rescue PCI)'
      }
    ],
    emergencyReferralCriteria: [
      'Cardiogenic shock (Killip IV) requiring emergency inotropes (Norepinephrine) and intra-aortic balloon pump (IABP)',
      'Mechanical complications: Ventricular septal rupture, acute severe mitral regurgitation due to papillary muscle rupture, or cardiac tamponade'
    ],
    references: [
      '2023 ESC Guidelines for the management of acute coronary syndromes',
      'ACC/AHA Guideline for the Management of Patients With ST-Elevation Myocardial Infarction',
      'National Heart Foundation Hospital & Research Institute Bangladesh Clinical Protocols'
    ]
  }
];
