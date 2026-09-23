import { NavigationView } from '../types';

export interface WeeklyDayActivity {
  day: string;
  shortLabel: string;
  active: boolean;
  minutes: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  greetingName: string;
  year: string;
  institution: string;
  isLoggedIn: boolean;
  streakDays: number;
  recommendationHeadline: string;
  weeklyGoal: {
    targetHours: number;
    completedHours: number;
    percent: number;
    daysActiveThisWeek: number;
    weekDays: WeeklyDayActivity[];
  };
}

export interface ContinueTopic {
  id: string;
  title: string;
  system: string;
  subject: string;
  phaseLabel: string;
  progressPercent: number;
  timeRemainingMinutes: number;
  lessonId: string;
  thumbnail: string;
  summary: string;
}

export interface RecommendedActivityItem {
  id: string;
  title: string;
  subject: string;
  type: 'quiz' | 'case' | 'ospe' | 'revision';
  badge: string;
  durationMinutes: number;
  questionCount?: number;
  targetView: NavigationView;
  targetLessonId?: string;
  description: string;
}

export interface SubjectProgressItem {
  id: string;
  title: string;
  subtitle: string;
  phaseIndex: number;
  progressPercent: number;
  completedTopics: number;
  totalTopics: number;
  nextTopic: string;
  durationMinutes: number;
  image?: string;
  isEcg?: boolean;
  isRecommended?: boolean;
  lessonId: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  subject: string;
  timestamp: string;
  scoreOrStatus: string;
  type: 'lesson' | 'case' | 'quiz' | 'revision';
  targetView: NavigationView;
  lessonId?: string;
}

export interface SavedStudyItem {
  id: string;
  title: string;
  subject: string;
  tag: string;
  view: NavigationView;
}

// Default initial student profile
const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'mbbs-user-ayesha',
  name: 'Ayesha Rahman',
  greetingName: 'Ayesha',
  year: '3rd Year MBBS',
  institution: 'Dhaka Medical College, Bangladesh',
  isLoggedIn: true,
  streakDays: 5,
  recommendationHeadline: 'Continue your cardiovascular revision.',
  weeklyGoal: {
    targetHours: 12,
    completedHours: 8.2,
    percent: 68,
    daysActiveThisWeek: 5,
    weekDays: [
      { day: 'Sat', shortLabel: 'S', active: true, minutes: 95 },
      { day: 'Sun', shortLabel: 'S', active: true, minutes: 110 },
      { day: 'Mon', shortLabel: 'M', active: true, minutes: 80 },
      { day: 'Tue', shortLabel: 'T', active: true, minutes: 120 },
      { day: 'Wed', shortLabel: 'W', active: true, minutes: 90 },
      { day: 'Thu', shortLabel: 'T', active: false, minutes: 0 },
      { day: 'Fri', shortLabel: 'F', active: false, minutes: 0 },
    ],
  },
};

export const MOCK_CONTINUE_TOPIC: ContinueTopic = {
  id: 'cvs-conduction-system',
  title: 'Cardiac Conduction System & Coronary Circulation',
  system: 'Cardiovascular System',
  subject: 'Anatomy',
  phaseLabel: 'Phase I (Pre-clinical)',
  progressPercent: 68,
  timeRemainingMinutes: 12,
  lessonId: 'cvs-anat-heart-morphology',
  thumbnail: '/anatomy/heart_preview.png',
  summary: 'SA node, AV node, Bundle of His, and coronary artery branching patterns for BMDC viva & professional exams.',
};

export const MOCK_RECOMMENDED_ACTIVITY: RecommendedActivityItem = {
  id: 'act-cardiac-cycle-quiz',
  title: 'Cardiac Cycle & Wiggers Diagram Practice Questions',
  subject: 'Physiology',
  type: 'quiz',
  badge: 'High Yield Exam Prep',
  durationMinutes: 15,
  questionCount: 10,
  targetView: 'practice',
  targetLessonId: 'cvs-physio-cardiac-cycle-wiggers',
  description: 'Test your understanding of ventricular systole, pressure tracings, and valve closure timings.',
};

export const MOCK_PHASE_EXPLANATIONS = [
  {
    phase: 0,
    id: 'phase-1',
    label: 'Phase I',
    curriculumYear: '1st & 2nd Year MBBS',
    category: 'Pre-clinical Foundation',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry'],
    description: 'Master anatomical structures, physiological regulation, and biochemical cellular mechanisms required for the 1st Professional MBBS Exam.',
  },
  {
    phase: 1,
    id: 'phase-2',
    label: 'Phase II',
    curriculumYear: '3rd Year MBBS',
    category: 'Para-clinical Diagnostics',
    subjects: ['Pharmacology & Therapeutics', 'Forensic Medicine & Toxicology'],
    description: 'Drug mechanisms, pharmacokinetics, adverse effects, legal medicine, autopsy findings, and toxicology for the 2nd Professional MBBS Exam.',
  },
  {
    phase: 2,
    id: 'phase-3',
    label: 'Phase III',
    curriculumYear: '4th Year MBBS',
    category: 'Para-clinical Pathology & Health',
    subjects: ['Pathology', 'Microbiology', 'Community Medicine'],
    description: 'Disease mechanisms, infectious pathogens, epidemiology, preventive healthcare, and public health in Bangladesh for the 3rd Professional MBBS Exam.',
  },
  {
    phase: 3,
    id: 'phase-4',
    label: 'Phase IV',
    curriculumYear: '5th Year MBBS (Final Year)',
    category: 'Clinical Mastery & Bedside',
    subjects: ['Medicine & Allied', 'Surgery & Allied', 'Obstetrics & Gynaecology'],
    description: 'Bedside diagnosis, acute management, operative techniques, and maternal-fetal healthcare for the Final Professional MBBS Examination.',
  },
];

export const MOCK_SUBJECT_PROGRESS: SubjectProgressItem[] = [
  // Phase 1: Pre-clinical
  {
    id: 'anatomy',
    title: 'Anatomy',
    subtitle: 'Gross, histology & embryology',
    phaseIndex: 0,
    progressPercent: 65,
    completedTopics: 14,
    totalTopics: 22,
    nextTopic: 'Thorax and mediastinum',
    durationMinutes: 12,
    image: '/anatomy/heart_preview.png',
    isRecommended: true,
    lessonId: 'cvs-anat-heart-morphology',
  },
  {
    id: 'physiology',
    title: 'Physiology',
    subtitle: 'Systemic functions & control',
    phaseIndex: 0,
    progressPercent: 48,
    completedTopics: 11,
    totalTopics: 23,
    nextTopic: 'Cardiac cycle & heart sounds',
    durationMinutes: 15,
    isEcg: true,
    isRecommended: false,
    lessonId: 'cvs-physio-cardiac-cycle-wiggers',
  },
  {
    id: 'biochemistry',
    title: 'Biochemistry',
    subtitle: 'Metabolism & clinical enzymes',
    phaseIndex: 0,
    progressPercent: 72,
    completedTopics: 16,
    totalTopics: 22,
    nextTopic: 'Cardiac biomarkers (Troponin & CK-MB)',
    durationMinutes: 10,
    image: '/anatomy/biochem_molecule.png',
    isRecommended: false,
    lessonId: 'cvs-biochem-cardiac-biomarkers',
  },

  // Phase 2: 3rd Year
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    subtitle: 'Mechanisms & therapeutics',
    phaseIndex: 1,
    progressPercent: 54,
    completedTopics: 12,
    totalTopics: 22,
    nextTopic: 'Autonomic nervous system drugs',
    durationMinutes: 18,
    image: '/anatomy/biochem_molecule.png',
    isRecommended: true,
    lessonId: 'pharm-autonomic-drugs',
  },
  {
    id: 'forensic',
    title: 'Forensic Medicine',
    subtitle: 'Legal medicine & toxicology',
    phaseIndex: 1,
    progressPercent: 35,
    completedTopics: 7,
    totalTopics: 20,
    nextTopic: 'Mechanical injuries & asphyxia',
    durationMinutes: 14,
    image: '/anatomy/heart_preview.png',
    isRecommended: false,
    lessonId: 'forensic-asphyxia',
  },

  // Phase 3: 4th Year
  {
    id: 'pathology',
    title: 'Pathology',
    subtitle: 'General & systemic pathology',
    phaseIndex: 2,
    progressPercent: 62,
    completedTopics: 15,
    totalTopics: 24,
    nextTopic: 'Myocardial infarction & atheroma',
    durationMinutes: 16,
    image: '/anatomy/heart_preview.png',
    isRecommended: true,
    lessonId: 'path-myocardial-infarction',
  },
  {
    id: 'microbiology',
    title: 'Microbiology',
    subtitle: 'Bacteriology, virology & parasitology',
    phaseIndex: 2,
    progressPercent: 50,
    completedTopics: 11,
    totalTopics: 22,
    nextTopic: 'Hospital-acquired pathogens',
    durationMinutes: 14,
    image: '/anatomy/biochem_molecule.png',
    isRecommended: false,
    lessonId: 'micro-bacterial-infections',
  },
  {
    id: 'community-medicine',
    title: 'Community Medicine',
    subtitle: 'Epidemiology & health programs',
    phaseIndex: 2,
    progressPercent: 40,
    completedTopics: 8,
    totalTopics: 20,
    nextTopic: 'Maternal health indicators in BD',
    durationMinutes: 12,
    image: '/anatomy/torso_hero.png',
    isRecommended: false,
    lessonId: 'com-epidemiology-bd',
  },

  // Phase 4: Final Year
  {
    id: 'medicine',
    title: 'Medicine & Allied',
    subtitle: 'Internal medicine & bedside care',
    phaseIndex: 3,
    progressPercent: 58,
    completedTopics: 18,
    totalTopics: 31,
    nextTopic: 'Acute heart failure presentation',
    durationMinutes: 20,
    image: '/anatomy/heart_preview.png',
    isRecommended: true,
    lessonId: 'med-heart-failure',
  },
  {
    id: 'surgery',
    title: 'Surgery & Allied',
    subtitle: 'Operative & emergency care',
    phaseIndex: 3,
    progressPercent: 44,
    completedTopics: 13,
    totalTopics: 30,
    nextTopic: 'Acute abdomen differential diagnosis',
    durationMinutes: 22,
    image: '/anatomy/torso_hero.png',
    isRecommended: false,
    lessonId: 'surg-acute-abdomen',
  },
  {
    id: 'gynae',
    title: 'Obstetrics & Gynaecology',
    subtitle: 'Maternal, fetal & female reproductive health',
    phaseIndex: 3,
    progressPercent: 60,
    completedTopics: 15,
    totalTopics: 25,
    nextTopic: 'Antenatal care & high-risk pregnancy',
    durationMinutes: 15,
    image: '/anatomy/biochem_molecule.png',
    isRecommended: false,
    lessonId: 'gynae-antenatal-care',
  },
];

export const MOCK_RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: 'rec-1',
    title: 'Thorax & Superior Mediastinum Boundaries',
    subject: 'Anatomy',
    timestamp: 'Today, 2:40 PM',
    scoreOrStatus: 'Lesson Completed (100%)',
    type: 'lesson',
    targetView: 'learn',
    lessonId: 'cvs-anat-heart-morphology',
  },
  {
    id: 'rec-2',
    title: 'Acute Coronary Syndrome Clinical Station',
    subject: 'Clinical Cases',
    timestamp: 'Yesterday, 8:15 PM',
    scoreOrStatus: 'Case Cleared (88% Accuracy)',
    type: 'case',
    targetView: 'cases',
  },
  {
    id: 'rec-3',
    title: 'Antiarrhythmic Drug Classification Flashcards',
    subject: 'Revision Hub',
    timestamp: '2 days ago',
    scoreOrStatus: '16 Cards Spaced Reviewed',
    type: 'revision',
    targetView: 'revision',
  },
];

export const MOCK_SAVED_ITEMS: SavedStudyItem[] = [
  {
    id: 'save-1',
    title: 'Coronary Artery Branching & Dominance Viva Card',
    subject: 'Anatomy',
    tag: 'High-Yield Viva',
    view: 'revision',
  },
  {
    id: 'save-2',
    title: 'Wiggers Diagram Pressure-Volume Loop Cheat Sheet',
    subject: 'Physiology',
    tag: 'OSPE Core',
    view: 'practice',
  },
  {
    id: 'save-3',
    title: 'Bangladesh Essential Drugs List (BMDC Standard)',
    subject: 'Drug Reference',
    tag: 'Clinical Reference',
    view: 'drug-reference',
  },
];

const STORAGE_KEY_PROFILE = 'medx_student_profile';

export const getStoredStudentProfile = (): StudentProfile => {
  if (typeof window === 'undefined') return DEFAULT_STUDENT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) return DEFAULT_STUDENT_PROFILE;
    return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STUDENT_PROFILE;
  }
};

export const saveStoredStudentProfile = (profile: StudentProfile): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.warn('Could not save student profile to localStorage:', err);
  }
};
