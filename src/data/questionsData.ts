import { QuestionBankItem } from '../types';
import { CARDIOVASCULAR_PILOT_QUESTIONS } from './cardiovascularPilotData';

const BASE_QUESTIONS: QuestionBankItem[] = [
  {
    id: 'q-mcq-01',
    subject: 'Anatomy',
    phase: 'Phase 1: 1st & 2nd Year',
    topic: 'Cardiovascular Anatomy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A 60-year-old man suffers an acute myocardial infarction involving the posterior one-third of the interventricular septum. Which of the following coronary arteries is most likely occluded?',
    options: [
      'Left anterior descending artery',
      'Posterior descending artery',
      'Circumflex artery',
      'Right marginal artery',
      'Left acute marginal artery'
    ],
    correctOptionIndex: 1,
    explanation: 'The posterior descending artery (PDA), which arises from the Right Coronary Artery in ~85-90% of individuals (right-dominant circulation), supplies the posterior one-third of the interventricular septum and inferior wall of both ventricles.',
    bmdcReference: 'Datta AK Essentials of Human Anatomy; Snell Clinical Anatomy by Regions 9th ed.'
  },
  {
    id: 'q-mcq-02',
    subject: 'Physiology',
    phase: 'Phase 1: 1st & 2nd Year',
    topic: 'Cardiovascular Physiology',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'During which phase of the cardiac cycle is coronary blood flow to the left ventricular subendocardium at its maximum?',
    options: [
      'Isovolumetric contraction',
      'Rapid ventricular ejection',
      'Reduced ventricular ejection',
      'Early diastole (isovolumetric relaxation and rapid filling)',
      'Atrial systole'
    ],
    correctOptionIndex: 3,
    explanation: 'During left ventricular systole, high intramyocardial pressure compresses subendocardial blood vessels, substantially reducing or arresting coronary flow. Peak left ventricular coronary perfusion occurs during early diastole when the myocardium relaxes while aortic diastolic pressure remains elevated.',
    bmdcReference: 'Guyton & Hall Textbook of Medical Physiology 14th ed. Chapter 21.'
  },
  {
    id: 'q-mcq-03',
    subject: 'Pharmacology',
    phase: 'Phase 2: 3rd Year',
    topic: 'Renal Pharmacology',
    system: 'urinary',
    type: 'MCQ',
    questionStem: 'A 55-year-old patient with congestive heart failure receiving aggressive IV diuretic therapy develops severe muscle weakness, hypokalemia, and metabolic alkalosis. Which transporter was primarily blocked by the offending agent?',
    options: [
      'Na+/glucose cotransporter 2 (SGLT2)',
      'Na+-K+-2Cl- cotransporter 2 (NKCC2)',
      'Na+/Cl- cotransporter (NCCT)',
      'Epithelial sodium channel (ENaC)',
      'H+/K+ ATPase pump'
    ],
    correctOptionIndex: 1,
    explanation: 'Loop diuretics such as Furosemide block the apical Na+-K+-2Cl- (NKCC2) cotransporter in the thick ascending limb of Henle, producing marked natriuresis, chloriuresis, and downstream kaliuresis with hypokalemic metabolic alkalosis.',
    bmdcReference: 'Katzung Basic & Clinical Pharmacology 15th ed. Chapter 15.'
  },
  {
    id: 'q-mcq-04',
    subject: 'Medicine',
    phase: 'Phase 4: 5th Year',
    topic: 'Respiratory Medicine',
    system: 'respiratory',
    type: 'MCQ',
    questionStem: 'A 24-year-old female presents to the emergency room with an acute severe exacerbation of bronchial asthma. Arterial Blood Gas (ABG) analysis shows: pH 7.38, PaCO2 42 mmHg, PaO2 62 mmHg on room air. How should the "normal" PaCO2 be interpreted in this clinical context?',
    options: [
      'Reassuring sign indicating adequate gas exchange and mild disease',
      'Ominous warning sign of impending respiratory muscle fatigue and life-threatening failure',
      'Normal physiological finding during any acute asthma attack',
      'Artifact of ABG collection requiring immediate repeat',
      'Indication to administer sedatives to reduce work of breathing'
    ],
    correctOptionIndex: 1,
    explanation: 'In early acute asthma, tachypnea and hyperventilation drive PaCO2 down (respiratory alkalosis). A "normal" or rising PaCO2 (≥40 mmHg) with tachypnea indicates severe airflow obstruction, respiratory muscle fatigue, and impending fatal respiratory arrest (GINA guidelines life-threatening feature).',
    bmdcReference: 'Davidson\'s Principles and Practice of Medicine 24th ed.; GINA 2024 Guidelines.'
  },
  {
    id: 'q-saq-01',
    subject: 'Pathology',
    phase: 'Phase 3: 4th Year',
    topic: 'Cellular Pathology',
    system: 'general',
    type: 'SAQ',
    questionStem: 'Define Granuloma. List four diagnostic causes of granulomatous inflammation according to BM&DC curriculum.',
    explanation: 'A granuloma is a focus of chronic inflammation consisting of a microscopic aggregation of activated macrophages (epithelioid cells) collared by lymphocytes, plasma cells, and often multinucleated giant cells. Causes: 1) Tuberculosis (Mycobacterium tuberculosis), 2) Leprosy (Mycobacterium leprae), 3) Sarcoidosis, 4) Foreign body reaction (talc, suture), 5) Histoplasmosis.',
    bmdcReference: 'Robbins & Cotran Pathologic Basis of Disease 10th ed. Chapter 3.'
  },
  {
    id: 'q-viva-01',
    subject: 'Medicine',
    phase: 'Phase 4: 5th Year',
    topic: 'Valvular Heart Disease',
    system: 'cardiovascular',
    type: 'VIVA',
    questionStem: 'Examiner: "Candidate, describe the peripheral signs of severe chronic aortic regurgitation (water-hammer pulse, Corrigan sign, Traube sign, Duroziez sign, de Musset sign)."',
    explanation: 'Peripheral signs in severe AR stem from wide pulse pressure: 1) Water-hammer (Watson) pulse, 2) Corrigan visible carotid pulsation, 3) Traube pistol-shot over femoral artery, 4) Duroziez systolic & diastolic murmur over compressed femoral artery, 5) de Musset head bobbing in synchrony with systole, 6) Quincke capillary pulsation under nailbed.',
    bmdcReference: 'MacLeod\'s Clinical Examination 15th ed.; Oxford Handbook of Clinical Medicine 10th ed.'
  }
];

export const QUESTION_BANK: QuestionBankItem[] = [
  ...CARDIOVASCULAR_PILOT_QUESTIONS,
  ...BASE_QUESTIONS
];
