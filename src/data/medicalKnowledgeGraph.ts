export interface TopicUniverseNode {
  id: string;
  title: string;
  category: 'Cardiovascular' | 'Respiratory' | 'Renal' | 'Gastrointestinal' | 'Neurology';
  bmdcPhase: string;
  overview: string;
  anatomyLink: {
    structureName: string;
    organ: string;
    highlightKey: string;
    description: string;
  };
  physiologyLink: {
    mechanismName: string;
    parameterChanges: string;
    graphType: 'Wiggers' | 'Spirometry' | 'Nephron';
  };
  pathologyLink: {
    stageTitle: string;
    grossAndMicro: string;
    hallmarkLesion: string;
  };
  clinicalFeatures: {
    symptoms: string[];
    signs: string[];
    auscultationOrPalpation: string;
  };
  examinationProtocol: {
    system: string;
    keyManeuver: string;
    pathognomonicSign: string;
  };
  investigations: {
    goldStandard: string;
    ecgChanges?: string;
    radiologyFindings?: string;
    labMarkers?: string;
  };
  pharmacology: {
    firstLineDrug: string;
    drugClass: string;
    mechanism: string;
    antidoteOrCautions: string;
  };
  treatmentAlgorithmId: string;
  linkedClinicalCaseId: string;
  linkedOspeId?: string;
  linkedOsceId?: string;
  highYieldVivaQuestions: string[];
  sampleMcqsCount: number;
}

export const TOPIC_UNIVERSES: TopicUniverseNode[] = [
  {
    id: 'mitral-stenosis',
    title: 'Mitral Stenosis (Rheumatic Heart Disease)',
    category: 'Cardiovascular',
    bmdcPhase: 'Phase 4: 5th Year (Clinical)',
    overview: 'Narrowing of the mitral valve orifice (normal 4–6 cm²; severe < 1.0 cm²) almost universally caused by post-streptococcal chronic Rheumatic Carditis. Results in elevated left atrial pressure, pulmonary venous hypertension, and atrial fibrillation.',
    anatomyLink: {
      structureName: 'Mitral (Bicuspid) Valve & Left Atrium',
      organ: 'Heart',
      highlightKey: 'left-atrium-mitral',
      description: 'The mitral valve consists of anterior and posterior leaflets anchored by chordae tendineae to two papillary muscles. Chronic rheumatic inflammation causes commissural fusion and calcification ("fish-mouth" or "buttonhole" orifice).'
    },
    physiologyLink: {
      mechanismName: 'Elevated Left Atrial & Pulmonary Wedge Pressure',
      parameterChanges: 'Large pressure gradient between LA and LV during diastole. Increased LA pressure leads to pulmonary capillary wedge pressure > 25 mmHg, causing pulmonary congestion and dyspnea.',
      graphType: 'Wiggers'
    },
    pathologyLink: {
      stageTitle: 'Chronic Rheumatic Endocarditis with Aschoff Nodules',
      grossAndMicro: 'Fibrous thickening, commissural fusion, shortening of chordae tendineae, and subendocardial MacCallum patch. Histology demonstrates pathognomonic Aschoff bodies containing Anitschkow "caterpillar" cells.',
      hallmarkLesion: 'Fish-mouth / buttonhole stenotic valve orifice'
    },
    clinicalFeatures: {
      symptoms: [
        'Exertional dyspnea (most common early symptom)',
        'Orthopnea and Paroxysmal Nocturnal Dyspnea (PND)',
        'Hemoptysis (due to rupture of thin-walled pulmonary-bronchial venous varices)',
        'Palpitations and thromboembolic stroke from Atrial Fibrillation'
      ],
      signs: [
        'Malar flush (mitral facies: pinkish-purple patch on cheekbones from systemic vasoconstriction)',
        'Tapping apex beat (palpable first heart sound S1)',
        'Right ventricular heave at left parasternal border',
        'Diastolic thrill at apex in left lateral position'
      ],
      auscultationOrPalpation: 'Loud tapping S1, sharp Opening Snap (OS) following S2, and a low-pitched, rumbling Mid-Diastolic Murmur with presystolic accentuation best heard at the apex with the bell in expiration.'
    },
    examinationProtocol: {
      system: 'Cardiovascular Precordial Examination',
      keyManeuver: 'Roll patient onto left lateral decubitus position and auscultate the apex using the bell of the stethoscope during full held expiration.',
      pathognomonicSign: 'Tapping S1 + Opening Snap + Low-pitched Mid-Diastolic Murmur'
    },
    investigations: {
      goldStandard: 'Transthoracic Echocardiography (TTE) with Doppler',
      ecgChanges: 'P-mitrale (notched, broad P wave > 0.12s in lead II) and Atrial Fibrillation with absent P waves.',
      radiologyFindings: 'CXR: Straightening of left cardiac border (prominent left atrial appendage), double right heart border (enlarged LA), and Kerley B lines.',
      labMarkers: 'ASO titer (elevated in recent streptococcal infection), Throat swab culture.'
    },
    pharmacology: {
      firstLineDrug: 'Benzathine Penicillin G (Secondary Prophylaxis) + Rate Control (Digoxin / Beta-blocker) + Anticoagulation (Warfarin)',
      drugClass: 'Beta-lactam Antibiotic & Anticoagulant',
      mechanism: 'Monthly intramuscular Benzathine Penicillin prevents recurrent streptococcal pharyngitis; Warfarin prevents cardioembolic strokes from LA thrombus.',
      antidoteOrCautions: 'Target INR 2.0–3.0 with Warfarin; do not use DOACs in moderate-to-severe rheumatic mitral stenosis!'
    },
    treatmentAlgorithmId: 'rx-mitral-stenosis',
    linkedClinicalCaseId: 'case-stemi-01',
    linkedOspeId: 'ospe-anatomy-01',
    linkedOsceId: 'osce-cvs-exam-01',
    highYieldVivaQuestions: [
      'What are the auscultatory hallmarks of Mitral Stenosis and how do you accentuate them at the bedside?',
      'What determines the timing of the Opening Snap relative to S2?',
      'Name Jones major and minor criteria for the diagnosis of acute rheumatic fever.',
      'Why is secondary penicillin prophylaxis mandatory and what is its duration?'
    ],
    sampleMcqsCount: 15
  },

  {
    id: 'acute-severe-asthma',
    title: 'Bronchial Asthma & Acute Exacerbation',
    category: 'Respiratory',
    bmdcPhase: 'Phase 4: 5th Year (Clinical)',
    overview: 'Chronic inflammatory disorder of the airways characterized by reversible airway hyperresponsiveness, smooth muscle bronchospasm, mucus hypersecretion, and airway remodeling.',
    anatomyLink: {
      structureName: 'Tracheobronchial Tree & Terminal Bronchioles',
      organ: 'Lungs',
      highlightKey: 'trachea-bronchi',
      description: 'Extends through cartilaginous bronchi down to smooth-muscle rich non-cartilaginous terminal and respiratory bronchioles, where circumferential smooth muscle contraction occludes airflow.'
    },
    physiologyLink: {
      mechanismName: 'Dynamic Airway Compression & Expiratory Flow Limitation',
      parameterChanges: 'Marked reduction in FEV1 and FEV1/FVC ratio (< 70%). Expiratory air trapping leads to hyperinflation, increased residual volume (RV), and functional residual capacity (FRC).',
      graphType: 'Spirometry'
    },
    pathologyLink: {
      stageTitle: 'Airway Remodeling & Type I Hypersensitivity',
      grossAndMicro: 'Epithelial denudation, goblet cell hyperplasia, subepithelial basement membrane thickening, smooth muscle hypertrophy, and eosinophilic infiltration. Sputum reveals Curschmann spirals and Charcot-Leyden crystals.',
      hallmarkLesion: 'Mucus plugs with eosinophilic bronchial infiltration'
    },
    clinicalFeatures: {
      symptoms: [
        'Episodic wheezing, chest tightness, and breathlessness',
        'Nocturnal and early morning cough',
        'Inability to speak sentences in severe exacerbation'
      ],
      signs: [
        'Tachypnea (RR > 25/min), Tachycardia (HR > 110/min)',
        'Tripod posture, use of sternocleidomastoid accessory muscles',
        'Pulsus paradoxus > 15 mmHg'
      ],
      auscultationOrPalpation: 'Bilateral expiratory prolonged polyphonic wheezing (rhonchi); in near-fatal asthma, airway flow is so critically reduced that wheezing ceases completely ("silent chest").'
    },
    examinationProtocol: {
      system: 'Respiratory Bedside Examination',
      keyManeuver: 'Measure Peak Expiratory Flow Rate (PEFR) before and after bronchodilator inhalation; inspect for intercostal indrawing and tracheal tug.',
      pathognomonicSign: 'Reversible expiratory wheeze with PEFR responsiveness > 12% and 200 mL'
    },
    investigations: {
      goldStandard: 'Spirometry with Pre- and Post-Bronchodilator Reversibility Test',
      ecgChanges: 'Sinus tachycardia, P-pulmonale, or acute right ventricular strain in life-threatening episodes.',
      radiologyFindings: 'CXR: Bilateral hyperinflated lung fields, low flat diaphragms, increased retrosternal airspace.',
      labMarkers: 'Eosinophil count, Serum total IgE, Arterial Blood Gas (ABG).'
    },
    pharmacology: {
      firstLineDrug: 'Inhaled Short-Acting Beta-2 Agonist (Salbutamol) + Inhaled / Systemic Corticosteroid (Budesonide / Prednisolone)',
      drugClass: 'Selective Beta-2 Adrenoceptor Agonist & Glucocorticoid',
      mechanism: 'Stimulates adenylate cyclase -> increases cAMP -> protein kinase A activation -> smooth muscle relaxation and bronchodilation.',
      antidoteOrCautions: 'High doses cause fine muscle tremor, hypokalemia, and tachycardia.'
    },
    treatmentAlgorithmId: 'rx-asthma-protocol',
    linkedClinicalCaseId: 'case-asthma-02',
    linkedOspeId: 'ospe-pharmacology-03',
    highYieldVivaQuestions: [
      'What are the objective clinical and arterial blood gas criteria of Life-Threatening Asthma?',
      'Why is a "normal" PaCO2 in a severely tachypneic asthmatic an alarming red flag?',
      'What are the microscopic findings in the sputum of an asthmatic patient?',
      'Describe the pharmacological step-ladder management of asthma according to GINA.'
    ],
    sampleMcqsCount: 18
  }
];
