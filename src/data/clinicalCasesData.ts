import { ClinicalCase } from '../types';

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-stemi-01',
    title: '52-year-old Male with Crushing Retrosternal Chest Pain',
    difficulty: 'Final Year MBBS',
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
        inspection: 'Bilateral symmetrical chest expansion.',
        palpation: 'Vocal fremitus normal bilaterally.',
        percussion: 'Resonant throughout all lung fields.',
        auscultation: 'Vesicular breath sounds; minimal fine bibasilar end-inspiratory crackles (Killip Class I-II).'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-ecg-stemi',
        type: 'ECG',
        resultTitle: '12-Lead Emergency Electrocardiogram',
        reportSummary: 'Hyperacute T waves followed by 4 mm ST-segment elevation in leads V1–V4 with reciprocal ST depression in inferior leads (II, III, aVF).',
        revealedValue: 'Acute Extensive Anterior Wall STEMI (LAD Occlusion)',
        isKeyInvestigation: true
      },
      {
        id: 'inv-trop-stemi',
        type: 'Cardiac Enzymes',
        resultTitle: 'High-Sensitivity Troponin I (hs-cTnI)',
        reportSummary: 'Markedly elevated at 4,850 ng/L (Reference: < 14 ng/L).',
        revealedValue: '4,850 ng/L (Severely positive)',
        isKeyInvestigation: true
      },
      {
        id: 'inv-cxr-stemi',
        type: 'Chest X-Ray',
        resultTitle: 'Portable Erect Chest Radiograph',
        reportSummary: 'Normal cardiothoracic ratio (CTR < 50%), mild upper lobe venous diversion, no gross alveolar pulmonary edema.',
        revealedValue: 'Mild pulmonary venous congestion, no pneumonia or pneumothorax',
        isKeyInvestigation: false
      }
    ],
    differentialDiagnoses: [
      'Acute Anterior ST-Elevation Myocardial Infarction (STEMI)',
      'Acute Aortic Dissection (Stanford Type A)',
      'Acute Pulmonary Embolism',
      'Acute Pericarditis',
      'Gastroesophageal Reflux Disease (GERD) / Esophageal Spasm'
    ],
    finalDiagnosis: 'Acute Anterior Wall ST-Elevation Myocardial Infarction (STEMI) within 12 hours of onset (Killip Class I)',
    managementOptions: [
      {
        id: 'rx-mona-loading',
        treatmentName: 'Administer Dual Antiplatelet Loading (Aspirin 300mg chewed + Clopidogrel 300-600mg) + High-dose Statin (Atorvastatin 80mg) + Sublingual Glyceryl Trinitrate (GTN)',
        isCorrectFirstLine: true,
        consequence: 'Crucial first-line emergency pharmacotherapy: inhibits platelet aggregation and reduces coronary ischemia.',
        vitalsDelta: { bp: '138/84 mmHg', hr: 92, spo2: 97 }
      },
      {
        id: 'rx-primary-pci',
        treatmentName: 'Activate Cardiac Catheterization Lab for Emergency Primary PCI (Door-to-Balloon < 90 mins) or Streptokinase thrombolysis if PCI unavailable',
        isCorrectFirstLine: true,
        consequence: 'Gold-standard reperfusion therapy restores TIMI-3 epicardial coronary flow in LAD, preserving left ventricular myocardium.',
        vitalsDelta: { hr: 78, rr: 18 }
      },
      {
        id: 'rx-inappropriate-nsaid',
        treatmentName: 'Prescribe intramuscular Diclofenac for pain relief and send patient home with antacids',
        isCorrectFirstLine: false,
        consequence: 'FATAL ERROR: NSAIDs increase thrombotic risk and cardiac rupture in STEMI; missing reperfusion window leads to irreversible myocardial necrosis and ventricular fibrillation!'
      }
    ],
    debriefAndLearningPoints: [
      'Time is Muscle: Door-to-ECG must be under 10 minutes; Door-to-Balloon (PCI) under 90 minutes; or Door-to-Needle (Thrombolysis) under 30 minutes.',
      'Always obtain a 12-lead ECG immediately in any patient presenting with acute chest discomfort or angina equivalents.',
      'Remember the initial emergency bundle: Dual Antiplatelet Therapy (DAPT), high-intensity statin, pain relief, and immediate reperfusion strategy.'
    ]
  },

  {
    id: 'case-asthma-02',
    title: '24-year-old Female with Acute Breathlessness and Inability to Speak in Sentences',
    difficulty: 'Year 4',
    patientDemographics: {
      name: 'Nusrat Jahan',
      age: 24,
      gender: 'Female',
      occupation: 'University Student',
      ward: 'Emergency Department, Sir Salimullah Medical College (Mitford Hospital)'
    },
    chiefComplaint: 'Acute onset severe breathlessness, dry cough, and wheezing since last night, progressively worsening. Unable to complete full sentences in one breath.',
    historyOptions: [
      {
        id: 'hx-asthma-onset',
        question: 'When did this episode start and how frequently have you used your inhaler?',
        patientAnswer: '"Doctor... (gasping) started yesterday after cleaning the dust in my hostel room... I used my blue Salbutamol inhaler 8 times today... but no relief... cannot catch my breath..."',
        clinicalSignificance: 'Severe exacerbation triggered by allergen/dust exposure refractory to repeated short-acting beta-2 agonist (SABA) puffs.'
      },
      {
        id: 'hx-asthma-past',
        question: 'Have you ever been admitted to the ICU or required mechanical ventilation for asthma?',
        patientAnswer: '"I was hospitalized once 2 years ago in the high dependency ward... but never put on a breathing machine."',
        clinicalSignificance: 'Prior hospital admission indicates brittle asthma with high risk of near-fatal exacerbation.'
      }
    ],
    initialVitals: {
      bp: '135/88 mmHg',
      hr: 122,
      rr: 34,
      spo2: 90,
      temp: 36.9,
      gcs: '15/15'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Patient is sitting upright, leaning forward (tripod position), using accessory muscles of respiration (sternocleidomastoid and intercostal indrawing). Agitated and speaking in broken phrases.',
        palpation: 'Pulsus paradoxus > 15 mmHg present.',
        percussion: 'Hyperresonant throughout.',
        auscultation: 'Respiratory rate 34/min, marked expiratory wheezing heard without stethoscope.'
      },
      {
        system: 'Respiratory System',
        inspection: 'Bilateral tachypneic hyperinflation, intercostal recession.',
        palpation: 'Trachea central, chest expansion reduced symmetrically.',
        percussion: 'Hyperresonant bilaterally; liver dullness shifted down.',
        auscultation: 'Widespread polyphonic expiratory and inspiratory wheeze bilaterally with prolonged expiratory phase.'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-abg-asthma',
        type: 'Blood Gas',
        resultTitle: 'Arterial Blood Gas (Room Air)',
        reportSummary: 'pH 7.39, PaCO2 40 mmHg, PaO2 62 mmHg, HCO3- 24 mmol/L. Note: A "normal" PaCO2 in a severely tachypneic patient signifies impending respiratory exhaustion and life-threatening failure!',
        revealedValue: 'PaCO2 40 mmHg (Pseudonormalization indicating respiratory muscle exhaustion)',
        isKeyInvestigation: true
      },
      {
        id: 'inv-pefr-asthma',
        type: 'Blood Gas',
        resultTitle: 'Peak Expiratory Flow Rate (PEFR)',
        reportSummary: '160 L/min (Predicted: 450 L/min, ~35% of predicted/personal best).',
        revealedValue: 'PEFR 35% (< 50% classifies as Acute Severe Asthma)',
        isKeyInvestigation: true
      },
      {
        id: 'inv-cxr-asthma',
        type: 'Chest X-Ray',
        resultTitle: 'Chest Radiograph (PA View)',
        reportSummary: 'Hyperinflated lung fields, low flat diaphragms, no pneumothorax or consolidation.',
        revealedValue: 'Hyperinflation consistent with acute airway obstruction',
        isKeyInvestigation: false
      }
    ],
    differentialDiagnoses: [
      'Acute Severe Bronchial Asthma',
      'Acute Exacerbation of COPD',
      'Foreign Body Aspiration',
      'Acute Laryngeal Edema / Anaphylaxis',
      'Spontaneous Pneumothorax'
    ],
    finalDiagnosis: 'Acute Severe Bronchial Asthma with impending respiratory muscle exhaustion (PEFR < 50%, RR > 25, HR > 110, inability to speak in sentences)',
    managementOptions: [
      {
        id: 'rx-asthma-emergency',
        treatmentName: 'High-flow controlled oxygen (target SpO2 94-98%) + Back-to-back Nebulization with Salbutamol 5mg + Ipratropium Bromide 0.5mg + IV Hydrocortisone 100-200mg (or Oral Prednisolone 40mg)',
        isCorrectFirstLine: true,
        consequence: 'Rapid airway bronchodilation and reduction of mucosal inflammation. Wheezing decreases, PEFR improves.',
        vitalsDelta: { hr: 98, rr: 20, spo2: 96 }
      },
      {
        id: 'rx-asthma-magnesium',
        treatmentName: 'If poor response after 20 minutes, administer single IV infusion of Magnesium Sulphate 1.2–2 g over 20 minutes',
        isCorrectFirstLine: true,
        consequence: 'Inhibits smooth muscle calcium influx, producing profound rescue bronchodilation in severe exacerbations.',
        vitalsDelta: { rr: 16, spo2: 98 }
      },
      {
        id: 'rx-asthma-sedative-error',
        treatmentName: 'Administer Diazepam or Morphine to calm the anxious patient and induce sleep',
        isCorrectFirstLine: false,
        consequence: 'LETHAL CONTRAINDICATION: Sedatives depress respiratory drive in asthma, causing hypercapnic respiratory arrest and death!'
      }
    ],
    debriefAndLearningPoints: [
      'A "normal" or rising PaCO2 in a severely dyspneic asthmatic is NOT reassuring — it indicates respiratory muscle fatigue and impending cardiac/respiratory arrest requiring immediate ICU alert.',
      'Always assess objective severity: PEFR < 50% = Acute Severe; PEFR < 33%, silent chest, cyanosis, or exhaustion = Life-Threatening.',
      'Systemic corticosteroids (oral prednisolone or IV hydrocortisone) must be administered early in all severe exacerbations.'
    ]
  },

  {
    id: 'case-dka-03',
    title: '19-year-old Male with Vomiting, Abdominal Pain, and Deep Sighing Respirations',
    difficulty: 'Year 4',
    patientDemographics: {
      name: 'Tanvir Hossain',
      age: 19,
      gender: 'Male',
      occupation: 'College Student',
      ward: 'Medicine Ward, Chittagong Medical College Hospital'
    },
    chiefComplaint: 'Frequent vomiting, generalized abdominal pain, extreme thirst, and deep rapid breathing for 24 hours.',
    historyOptions: [
      {
        id: 'hx-dka-polyuria',
        question: 'Have you noticed increased urination or weight loss over recent weeks?',
        patientAnswer: '"Yes doctor, for the last 3 weeks I was drinking liters of water and waking up 5 times at night to urinate. I lost almost 6 kg of weight despite feeling hungry."',
        clinicalSignificance: 'Classic triad of polyuria, polydipsia, and weight loss heralds new-onset Type 1 Diabetes Mellitus.'
      },
      {
        id: 'hx-dka-breath',
        question: 'Did your family notice any unusual smell on your breath or drowsiness?',
        patientAnswer: '"My mother said my breath smelled like rotting sweet apples (fruity acetone), and I felt so exhausted I could barely keep my eyes open."',
        clinicalSignificance: 'Kussmaul breathing with sweet acetone breath characteristic of metabolic ketoacidosis.'
      }
    ],
    initialVitals: {
      bp: '90/60 mmHg',
      hr: 128,
      rr: 32,
      spo2: 98,
      temp: 36.8,
      gcs: '13/15 (Lethargic)'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Dry tongue, sunken eyeballs, poor skin turgor (severe dehydration ~10% fluid deficit). Deep rapid regular respirations (Kussmaul breathing). Sweet fruity odor.',
        palpation: 'Radial pulse rapid, low volume, thready.',
        percussion: 'Normal.',
        auscultation: 'Lungs clear.'
      },
      {
        system: 'Abdomen',
        inspection: 'Slightly scaphoid.',
        palpation: 'Diffuse non-localized abdominal tenderness without guarding (pseudo-peritonitis from ketosis and dehydration).',
        percussion: 'Tympanitic.',
        auscultation: 'Hypoactive bowel sounds.'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-rbs-dka',
        type: 'Blood Gas',
        resultTitle: 'Random Blood Sugar (RBS) & Urine Ketones',
        reportSummary: 'RBS: 28.6 mmol/L (515 mg/dL). Urine Dipstick: Ketones ++++ (strongly positive), Glucose ++++.',
        revealedValue: 'RBS 28.6 mmol/L with massive Ketone ++++',
        isKeyInvestigation: true
      },
      {
        id: 'inv-abg-dka',
        type: 'Blood Gas',
        resultTitle: 'Arterial Blood Gas (ABG)',
        reportSummary: 'pH 7.12, PaCO2 20 mmHg (compensatory hyperventilation), HCO3- 8 mmol/L, Anion Gap 26 mEq/L (High Anion Gap Metabolic Acidosis).',
        revealedValue: 'Severe High Anion Gap Metabolic Acidosis (pH 7.12, HCO3- 8)',
        isKeyInvestigation: true
      },
      {
        id: 'inv-electrolytes-dka',
        type: 'Electrolytes',
        resultTitle: 'Serum Electrolytes',
        reportSummary: 'Sodium: 132 mmol/L, Potassium: 5.4 mmol/L (falsely normal/high due to extracellular shift, despite total body K+ deficit), Creatinine: 1.6 mg/dL (pre-renal azotemia).',
        revealedValue: 'K+ 5.4 mmol/L, Creatinine 1.6 mg/dL',
        isKeyInvestigation: true
      }
    ],
    differentialDiagnoses: [
      'Diabetic Ketoacidosis (DKA)',
      'Hyperosmolar Hyperglycemic State (HHS)',
      'Acute Appendicitis / Peritonitis',
      'Acute Gastroenteritis with Dehydration',
      'Lactic Acidosis / Sepsis'
    ],
    finalDiagnosis: 'Severe Diabetic Ketoacidosis (DKA) precipitated by new-onset Type 1 Diabetes Mellitus',
    managementOptions: [
      {
        id: 'rx-dka-fluids',
        treatmentName: 'Aggressive IV fluid resuscitation: 0.9% Normal Saline 1 Liter in 1st hour, followed by structured deficit replacement (1L in 2h, 1L in 4h, 1L in 8h)',
        isCorrectFirstLine: true,
        consequence: 'Restores circulating intravascular volume, restores renal perfusion, and lowers counter-regulatory stress hormones.',
        vitalsDelta: { bp: '112/74 mmHg', hr: 96 }
      },
      {
        id: 'rx-dka-insulin',
        treatmentName: 'Fixed rate IV regular insulin infusion at 0.1 units/kg/hour (or 6 units/hour) AFTER verifying K+ > 3.5 mmol/L',
        isCorrectFirstLine: true,
        consequence: 'Inhibits hepatic ketogenesis, suppresses lipolysis, and drives glucose into cells while resolving acidosis.',
        vitalsDelta: { rr: 20 }
      },
      {
        id: 'rx-dka-bolus-insulin-error',
        treatmentName: 'Give massive rapid IV bolus of 50 units Regular Insulin immediately without intravenous fluids',
        isCorrectFirstLine: false,
        consequence: 'CRITICAL ERROR: Large insulin bolus without fluid expansion triggers profound hypovolemic shock, fatal hypokalemic arrhythmias, and cerebral edema!'
      }
    ],
    debriefAndLearningPoints: [
      'Fluid resuscitation always takes precedence: Never administer insulin until hypovolemic shock is actively being resuscitated.',
      'Beware total body potassium deficit: Serum K+ may appear high or normal initially, but insulin and rehydration will drive K+ rapidly into cells; add KCl as soon as K+ drops below 5.5 mmol/L.',
      'When blood glucose falls below 14 mmol/L (250 mg/dL), switch IV fluids to 5% or 10% Dextrose Saline to prevent hypoglycemia while continuing insulin to clear ketoacidosis.'
    ]
  }
];
