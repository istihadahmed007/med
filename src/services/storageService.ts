import { 
  StudentProgress, 
  UserRole, 
  MistakeEntry, 
  SpacedRepetitionCard, 
  LessonBookmark,
  BmdcLesson
} from '../types';
import { CARDIOVASCULAR_PILOT_LESSONS, CARDIOVASCULAR_PILOT_QUESTIONS } from '../data/cardiovascularPilotData';

const PROGRESS_STORAGE_KEY = 'medx_bd_student_progress_v2';
const ROLE_STORAGE_KEY = 'medx_bd_current_role_v2';
const MISTAKES_STORAGE_KEY = 'medx_bd_mistakes_v2';
const SPACED_CARDS_STORAGE_KEY = 'medx_bd_spaced_cards_v2';
const BOOKMARKS_STORAGE_KEY = 'medx_bd_bookmarks_v2';
const NOTES_STORAGE_KEY = 'medx_bd_notes_v2';
const ACTIVE_PHASE_KEY = 'medx_bd_active_phase_v2';
const USER_ACCOUNT_KEY = 'medx_bd_user_account_v2';

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  userId: 'std-bmdc-2026-0891',
  name: 'Istihad Ahmed',
  email: 'istihad.ahmed@student.dmc.edu.bd',
  currentPhase: 'Phase 4: 5th Year (Clinical)',
  university: 'Dhaka Medical College (University of Dhaka)',
  streakDays: 14,
  overallReadinessScore: 78,
  topicsStudied: 38,
  casesCompleted: 9,
  ospeStationsAttempted: 16,
  accuracyRate: 84,
  completedLessonIds: ['cvs-anat-heart-morphology', 'cvs-physio-cardiac-cycle-wiggers'],
  quizAttemptsCount: 65,
  weakAreas: [
    {
      subject: 'Physiology',
      topic: 'Cardiac Electrophysiology & Wiggers Diagram',
      accuracyPercent: 54,
      recommendedAction: 'Interactive Cardiac Cycle Lab + 5 MCQs'
    },
    {
      subject: 'Pharmacology',
      topic: 'Renal Loop & Thiazide Diuretics',
      accuracyPercent: 62,
      recommendedAction: 'Drug Journey: Furosemide vs Hydrochlorothiazide'
    },
    {
      subject: 'Medicine',
      topic: 'Auscultation of Rheumatic Valvular Lesions',
      accuracyPercent: 68,
      recommendedAction: 'Clinical Exam Simulator: Precordial Auscultation'
    }
  ],
  spacedRepetitionDue: [
    {
      topicId: 'cvs-anat-heart-morphology',
      topicTitle: 'Heart: External & Internal Features & Coronary Anatomy',
      phase: 'Phase 1',
      dueInHours: 0,
      intervalDays: 3
    },
    {
      topicId: 'cvs-physio-cardiac-cycle-wiggers',
      topicTitle: 'Cardiac Cycle & Left Ventricular PV Loops',
      phase: 'Phase 1',
      dueInHours: 4,
      intervalDays: 7
    },
    {
      topicId: 'cvs-med-acute-coronary-syndrome',
      topicTitle: 'Acute Anterior STEMI Emergency Protocol',
      phase: 'Phase 4',
      dueInHours: 12,
      intervalDays: 14
    }
  ]
};

export const INITIAL_SPACED_CARDS: SpacedRepetitionCard[] = [
  {
    id: 's-card-1',
    lessonId: 'cvs-anat-heart-morphology',
    title: 'Cardiac Apex Formation',
    subject: 'Anatomy',
    phase: 'Phase 1',
    front: 'What anatomical structure entirely forms the apex of the human heart?',
    back: 'The Left Ventricle (palpated in left 5th intercostal space, midclavicular line).',
    intervalDays: 3,
    easeFactor: 2.5,
    repetitions: 2,
    dueDate: Date.now() - 3600000, // Due now
  },
  {
    id: 's-card-2',
    lessonId: 'cvs-anat-heart-morphology',
    title: 'Coronary Artery Dominance',
    subject: 'Anatomy',
    phase: 'Phase 1',
    front: 'How is coronary artery dominance defined?',
    back: 'By which artery gives origin to the Posterior Descending Artery (PDA): RCA (85%), LCA (10%), or Codominant (5%).',
    intervalDays: 7,
    easeFactor: 2.5,
    repetitions: 3,
    dueDate: Date.now() + 86400000 * 2,
  },
  {
    id: 's-card-3',
    lessonId: 'cvs-physio-cardiac-cycle-wiggers',
    title: 'Heart Sounds Mechanics',
    subject: 'Physiology',
    phase: 'Phase 1',
    front: 'What mechanical event produces the First (S1) and Second (S2) heart sounds?',
    back: 'S1: Closure of AV valves (Mitral/Tricuspid) at isovolumetric contraction onset. S2: Closure of Semilunar valves (Aortic/Pulmonary) at isovolumetric relaxation onset.',
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 1,
    dueDate: Date.now() - 7200000, // Due now
  },
  {
    id: 's-card-4',
    lessonId: 'cvs-pharm-antianginal-heartfailure',
    title: 'Nitrate Tolerance Mechanism',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    front: 'Why must a daily 10-12 hour nitrate-free interval be maintained?',
    back: 'To prevent nitrate tolerance caused by intracellular depletion of sulfhydryl (-SH) groups.',
    intervalDays: 4,
    easeFactor: 2.5,
    repetitions: 2,
    dueDate: Date.now() + 86400000 * 3,
  },
  {
    id: 's-card-5',
    lessonId: 'cvs-med-acute-coronary-syndrome',
    title: 'Right Ventricular Infarction Management',
    subject: 'Medicine',
    phase: 'Phase 4',
    front: 'What is the first-line treatment for hypotension in RV Infarction, and which drugs are contraindicated?',
    back: 'Treatment: Rapid IV Normal Saline bolus. Contraindicated: Nitrates, Morphine, and Diuretics (cause fatal preload collapse).',
    intervalDays: 14,
    easeFactor: 2.6,
    repetitions: 4,
    dueDate: Date.now() + 86400000 * 10,
  }
];

export const INITIAL_MISTAKES: MistakeEntry[] = [
  {
    id: 'mst-1',
    questionId: 'cvs-q13',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    topic: 'Digoxin Toxicity',
    questionStem: 'Which electrolyte disturbance most significantly potentiates Digoxin toxicity?',
    selectedAnswer: 'Hyperkalemia',
    correctAnswer: 'Hypokalemia',
    explanation: 'Digoxin competes with K+ for binding sites on the Na+/K+ ATPase enzyme. Hypokalemia increases Digoxin binding, dramatically enhancing toxicity.',
    timestamp: Date.now() - 86400000 * 2,
    reviewed: false,
    reviewCount: 0
  },
  {
    id: 'mst-2',
    questionId: 'cvs-q24',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: '12-Lead ECG Localization',
    questionStem: 'ST elevation in leads II, III, and aVF localizes to which myocardial wall?',
    selectedAnswer: 'Anterior Wall',
    correctAnswer: 'Inferior Wall (supplied by RCA)',
    explanation: 'Leads II, III, and aVF look at the inferior (diaphragmatic) surface of the heart, supplied by the Right Coronary Artery.',
    timestamp: Date.now() - 86400000 * 4,
    reviewed: false,
    reviewCount: 0
  }
];

export class StorageService {
  // Student Progress
  static getProgress(): StudentProgress {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!data) {
        this.saveProgress(INITIAL_STUDENT_PROGRESS);
        return INITIAL_STUDENT_PROGRESS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('StorageService: Failed to read progress', e);
      return INITIAL_STUDENT_PROGRESS;
    }
  }

  static saveProgress(progress: StudentProgress): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('StorageService: Failed to save progress', e);
    }
  }

  // Active Phase Selector
  static getActivePhase(): string {
    try {
      return localStorage.getItem(ACTIVE_PHASE_KEY) || 'Phase 4: 5th Year (Clinical)';
    } catch {
      return 'Phase 4: 5th Year (Clinical)';
    }
  }

  static setActivePhase(phase: string): void {
    try {
      localStorage.setItem(ACTIVE_PHASE_KEY, phase);
      const progress = this.getProgress();
      progress.currentPhase = phase;
      this.saveProgress(progress);
    } catch (e) {
      console.error('StorageService: Failed to set active phase', e);
    }
  }

  // User Role (Client helper; server validates actual role)
  static getRole(): UserRole {
    try {
      const role = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
      return role || 'student';
    } catch {
      return 'student';
    }
  }

  static setRole(role: UserRole): void {
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch (e) {
      console.error('StorageService: Failed to save role', e);
    }
  }

  // Bookmarks & Lesson Resume
  static getBookmarks(): LessonBookmark[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (!data) {
        const defaults: LessonBookmark[] = [
          {
            lessonId: 'cvs-anat-heart-morphology',
            title: 'Heart: External & Internal Features and Coronary Circulation',
            subject: 'Anatomy',
            phase: 'Phase 1',
            lastStep: 'explore',
            scrollPercentage: 45,
            savedAt: Date.now() - 3600000
          },
          {
            lessonId: 'cvs-med-acute-coronary-syndrome',
            title: 'Acute Coronary Syndromes & 12-Lead ECG Interpretation',
            subject: 'Medicine',
            phase: 'Phase 4',
            lastStep: 'learn',
            scrollPercentage: 70,
            savedAt: Date.now() - 7200000
          }
        ];
        this.saveBookmarks(defaults);
        return defaults;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static saveBookmarks(bookmarks: LessonBookmark[]): void {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('StorageService: Bookmark save failed', e);
    }
  }

  static toggleBookmark(lesson: BmdcLesson, currentStep: any = 'learn'): boolean {
    const bookmarks = this.getBookmarks();
    const existingIndex = bookmarks.findIndex((b) => b.lessonId === lesson.id);
    let isBookmarked = false;

    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      bookmarks.unshift({
        lessonId: lesson.id,
        title: lesson.title,
        subject: lesson.subjectName,
        phase: lesson.phase,
        lastStep: currentStep,
        scrollPercentage: 0,
        savedAt: Date.now()
      });
      isBookmarked = true;
    }
    this.saveBookmarks(bookmarks);
    return isBookmarked;
  }

  static isBookmarked(lessonId: string): boolean {
    return this.getBookmarks().some((b) => b.lessonId === lessonId);
  }

  // Mistake Notebook
  static getMistakes(): MistakeEntry[] {
    try {
      const data = localStorage.getItem(MISTAKES_STORAGE_KEY);
      if (!data) {
        this.saveMistakes(INITIAL_MISTAKES);
        return INITIAL_MISTAKES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MISTAKES;
    }
  }

  static saveMistakes(mistakes: MistakeEntry[]): void {
    try {
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes));
    } catch (e) {
      console.error('StorageService: Failed to save mistakes', e);
    }
  }

  static recordMistake(mistake: Omit<MistakeEntry, 'id' | 'timestamp' | 'reviewed' | 'reviewCount'>): void {
    const mistakes = this.getMistakes();
    const existing = mistakes.find((m) => m.questionId === mistake.questionId);
    if (!existing) {
      const newEntry: MistakeEntry = {
        ...mistake,
        id: `mst-${Date.now()}`,
        timestamp: Date.now(),
        reviewed: false,
        reviewCount: 0
      };
      mistakes.unshift(newEntry);
      this.saveMistakes(mistakes);
    }
  }

  static markMistakeResolved(id: string): void {
    const mistakes = this.getMistakes();
    const updated = mistakes.map((m) =>
      m.id === id ? { ...m, reviewed: true, reviewCount: m.reviewCount + 1 } : m
    );
    this.saveMistakes(updated);
  }

  // Spaced Repetition Flashcards
  static getSpacedCards(): SpacedRepetitionCard[] {
    try {
      const data = localStorage.getItem(SPACED_CARDS_STORAGE_KEY);
      if (!data) {
        this.saveSpacedCards(INITIAL_SPACED_CARDS);
        return INITIAL_SPACED_CARDS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SPACED_CARDS;
    }
  }

  static saveSpacedCards(cards: SpacedRepetitionCard[]): void {
    try {
      localStorage.setItem(SPACED_CARDS_STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('StorageService: Failed to save spaced cards', e);
    }
  }

  // SuperMemo-2 Spaced Repetition Calculation
  static recordCardReview(cardId: string, rating: 'again' | 'hard' | 'good' | 'easy'): void {
    const cards = this.getSpacedCards();
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    let { intervalDays, easeFactor, repetitions } = card;

    if (rating === 'again') {
      repetitions = 0;
      intervalDays = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else if (rating === 'hard') {
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
    } else if (rating === 'good') {
      repetitions += 1;
      if (repetitions === 1) intervalDays = 1;
      else if (repetitions === 2) intervalDays = 3;
      else intervalDays = Math.round(intervalDays * easeFactor);
    } else if (rating === 'easy') {
      repetitions += 1;
      if (repetitions === 1) intervalDays = 3;
      else if (repetitions === 2) intervalDays = 7;
      else intervalDays = Math.round(intervalDays * easeFactor * 1.3);
      easeFactor += 0.15;
    }

    card.intervalDays = intervalDays;
    card.easeFactor = easeFactor;
    card.repetitions = repetitions;
    card.dueDate = Date.now() + intervalDays * 86400000;
    card.lastReviewedDate = Date.now();

    this.saveSpacedCards(cards);
  }

  // Record Quiz Score
  static recordQuizCompletion(subject: string, scorePercent: number, correctCount: number, totalCount: number): void {
    const progress = this.getProgress();
    progress.quizAttemptsCount = (progress.quizAttemptsCount || 0) + 1;
    progress.accuracyRate = Math.round((progress.accuracyRate * 4 + scorePercent) / 5);
    progress.overallReadinessScore = Math.min(100, Math.round(progress.overallReadinessScore + 0.4));
    this.saveProgress(progress);
  }

  // Mark Lesson as Read/Completed
  static markLessonCompleted(lessonId: string): void {
    const progress = this.getProgress();
    if (!progress.completedLessonIds) progress.completedLessonIds = [];
    if (!progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
      progress.topicsStudied += 1;
      this.saveProgress(progress);
    }
  }

  // Get active user credentials
  static getUser(): { id: string; name: string; email: string } {
    const p = this.getProgress();
    return {
      id: p.userId || 'std-istihad-dmc',
      name: p.name || 'Dr. Istihad Ahmed',
      email: p.email || 'istihad.ahmed@student.dmc.edu.bd'
    };
  }
}
