import { QuestionBankItem } from '../types';

export const QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'q-mcq-01',
    subject: 'Anatomy',
    phase: 'Phase 1: 1st & 2nd Year',
    topic: 'Cardiovascular Anatomy',
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
    phase: 'Phase 3: 4th Year',
    topic: 'Renal Pharmacology',
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
    topic: 'Cardiology',
    type: 'MCQ',
    questionStem: 'On precordial examination of a 32-year-old female, you identify a tapping apex beat, an opening snap, and a low-pitched mid-diastolic murmur with presystolic accentuation. What is the most likely diagnosis?',
    options: [
      'Aortic Regurgitation',
      'Mitral Stenosis',
      'Mitral Regurgitation',
      'Aortic Stenosis',
      'Ventricular Septal Defect'
    ],
    correctOptionIndex: 1,
    explanation: 'The classic clinical triad of Mitral Stenosis is a tapping apex beat (palpable S1), an opening snap closely following S2, and a localized low-pitched rumbling mid-diastolic murmur with presystolic accentuation best heard in the left lateral position.',
    bmdcReference: 'Davidson Principles and Practice of Medicine 24th ed. Chapter 16; Hutchison Clinical Methods.'
  },
  {
    id: 'q-saq-01',
    subject: 'Pathology',
    phase: 'Phase 3: 4th Year',
    topic: 'Vascular Pathology',
    type: 'SAQ',
    questionStem: 'Describe the sequence of cellular and morphologic events in the pathogenesis of atherosclerosis from endothelial injury to plaque rupture (Response-to-Injury Hypothesis).',
    explanation: 'Key points required by BM&DC examiner: 1) Endothelial dysfunction -> increased permeability and leukocyte adhesion; 2) Lipoprotein accumulation (oxidized LDL) in intima; 3) Monocyte adhesion and transmigration -> transformation into macrophages; 4) Foam cell formation via scavenger receptor uptake of oxLDL -> Fatty streak; 5) Platelet activation and growth factor (PDGF) release; 6) Smooth muscle recruitment from media to intima with extracellular matrix (collagen) synthesis -> Fibrofatty plaque; 7) Fibrous cap thinning via matrix metalloproteinases (MMPs) -> Plaque rupture and occlusive thrombosis.',
    bmdcReference: 'Robbins & Cotran Pathologic Basis of Disease 10th ed. Chapter 11.'
  },
  {
    id: 'q-viva-01',
    subject: 'Medicine & Surgery',
    phase: 'Phase 4: 5th Year',
    topic: 'Emergency Medicine',
    type: 'VIVA',
    questionStem: 'Examiner asks: "How do you clinically distinguish between Stanford Type A and Type B aortic dissection, and how does your emergency management differ?"',
    explanation: 'Model Viva Answer: "Sir, Stanford Type A involves the ascending aorta (proximal to the origin of the left subclavian artery), whereas Type B involves only the descending aorta distal to the left subclavian. Type A requires urgent surgical repair (Bentall or hemiarch replacement) to prevent fatal hemopericardium, tamponade, or acute aortic regurgitation. Type B is primarily managed medically with aggressive intravenous blood pressure and heart rate control (IV Labetalol or Esmolol targeting SBP 100-120 mmHg and HR < 60 bpm), reserving endovascular repair (TEVAR) for complicated cases."',
    bmdcReference: 'Oxford Handbook of Clinical Medicine 10th ed. Section on Cardiovascular Emergencies.'
  }
];
