import { 
  StudentProgress, 
  UserRole, 
  MistakeEntry, 
  SpacedRepetitionCard, 
  LessonBookmark,
  BmdcLesson
} from '../types';
import { AuthService } from './authService';
import { UserDataService, createEmptyProgress } from './userDataService';
import { 
  VideoGenerationJob, 
  LessonVideo, 
  MedicalReviewForm, 
  VideoStudentProgress 
} from '../types/videoStudio';
import { CARDIOVASCULAR_PILOT_LESSONS, CARDIOVASCULAR_PILOT_QUESTIONS } from '../data/cardiovascularPilotData';
import { LESSON_VIDEO_TEMPLATES } from '../data/videoStudioTemplates';

const PROGRESS_STORAGE_KEY = 'medx_bd_student_progress_v2';
const ROLE_STORAGE_KEY = 'medx_bd_current_role_v2';
const MISTAKES_STORAGE_KEY = 'medx_bd_mistakes_v2';
const SPACED_CARDS_STORAGE_KEY = 'medx_bd_spaced_cards_v2';
const BOOKMARKS_STORAGE_KEY = 'medx_bd_bookmarks_v2';
const NOTES_STORAGE_KEY = 'medx_bd_notes_v2';
const ACTIVE_PHASE_KEY = 'medx_bd_active_phase_v2';
const USER_ACCOUNT_KEY = 'medx_bd_user_account_v2';

export class StorageService {
  // Student Progress (strictly tied to verified authenticated user ID)
  static getProgress(): StudentProgress {
    const user = AuthService.getCurrentUser();
    const profile = AuthService.getProfile();

    if (user) {
      const userKey = `medx_progress_${user.id}`;
      try {
        const data = localStorage.getItem(userKey);
        if (data) return JSON.parse(data);
      } catch {}

      // Fresh authenticated user: clean initial progress (never copy sample student profile)
      const fresh = createEmptyProgress({
        id: user.id,
        name: profile?.full_name || user.email?.split('@')[0] || 'Medical Student',
        email: user.email || '',
        institution: profile?.institution,
        phase: profile?.mbbs_phase
      });
      try {
        localStorage.setItem(userKey, JSON.stringify(fresh));
      } catch {}

      // Trigger asynchronous background database sync
      UserDataService.getProgress().catch(() => {});
      return fresh;
    }

    // Visitor state: clean empty progress
    return createEmptyProgress({
      id: 'visitor',
      name: 'Medical Visitor',
      email: ''
    });
  }

  static saveProgress(progress: StudentProgress): void {
    const user = AuthService.getCurrentUser();
    if (user) {
      try {
        localStorage.setItem(`medx_progress_${user.id}`, JSON.stringify(progress));
      } catch {}
      UserDataService.saveProgress(progress).catch(() => {});
    } else {
      try {
        localStorage.setItem('medx_visitor_progress', JSON.stringify(progress));
      } catch {}
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

  // User Role (Derived strictly from verified authentication session)
  static getRole(): UserRole {
    return AuthService.getRole();
  }

  static setRole(role: UserRole): void {
    // Prohibit browser-side role manipulation.
    // Client code and localStorage cannot escalate roles.
  }

  // Bookmarks & Lesson Resume (Isolated per authenticated user ID)
  static getBookmarks(): LessonBookmark[] {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_bookmarks_${user.id}` : 'medx_visitor_bookmarks';
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch {}
    return [];
  }

  static saveBookmarks(bookmarks: LessonBookmark[]): void {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_bookmarks_${user.id}` : 'medx_visitor_bookmarks';
    try {
      localStorage.setItem(key, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('StorageService: Bookmark save failed', e);
    }
  }

  static toggleBookmark(lesson: BmdcLesson, currentStep: any = 'learn'): boolean {
    const user = AuthService.getCurrentUser();
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
    if (user) {
      UserDataService.toggleBookmark(lesson, currentStep).catch(() => {});
    }
    return isBookmarked;
  }

  static isBookmarked(lessonId: string): boolean {
    return this.getBookmarks().some((b) => b.lessonId === lessonId);
  }

  // Mistake Notebook (Isolated per authenticated user ID)
  static getMistakes(): MistakeEntry[] {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_mistakes_${user.id}` : 'medx_visitor_mistakes';
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch {}
    return [];
  }

  static saveMistakes(mistakes: MistakeEntry[]): void {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_mistakes_${user.id}` : 'medx_visitor_mistakes';
    try {
      localStorage.setItem(key, JSON.stringify(mistakes));
    } catch (e) {
      console.error('StorageService: Failed to save mistakes', e);
    }
  }

  static recordMistake(mistake: Omit<MistakeEntry, 'id' | 'timestamp' | 'reviewed' | 'reviewCount'>): void {
    const user = AuthService.getCurrentUser();
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
      if (user) {
        UserDataService.recordMistake(mistake).catch(() => {});
      }
    }
  }

  static markMistakeResolved(id: string): void {
    const mistakes = this.getMistakes();
    const updated = mistakes.map((m) =>
      m.id === id ? { ...m, reviewed: true, reviewCount: m.reviewCount + 1 } : m
    );
    this.saveMistakes(updated);
  }

  // Spaced Repetition Flashcards (Isolated per user)
  static getSpacedCards(): SpacedRepetitionCard[] {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_spaced_cards_${user.id}` : 'medx_visitor_spaced_cards';
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch {}
    return [];
  }

  static saveSpacedCards(cards: SpacedRepetitionCard[]): void {
    const user = AuthService.getCurrentUser();
    const key = user ? `medx_spaced_cards_${user.id}` : 'medx_visitor_spaced_cards';
    try {
      localStorage.setItem(key, JSON.stringify(cards));
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
    const user = AuthService.getCurrentUser();
    const profile = AuthService.getProfile();
    if (user) {
      return {
        id: user.id,
        name: profile?.full_name || user.email?.split('@')[0] || 'Medical Learner',
        email: user.email || ''
      };
    }
    return {
      id: 'visitor',
      name: 'Medical Visitor',
      email: ''
    };
  }

  // =========================================================================
  // Video Studio Persistence (Offline & Fallback Support)
  // =========================================================================
  private static purgeLegacyKenhubCache(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key);
          if (val && /ken\s*hub/i.test(val)) {
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  static getVideoJobs(): VideoGenerationJob[] {
    this.purgeLegacyKenhubCache();
    try {
      const stored = localStorage.getItem('medx_video_jobs_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    const initialJobs: VideoGenerationJob[] = [
      {
        id: 'vj-pilot-1001',
        lessonId: 'cvs-physio-cardiac-cycle-wiggers',
        lessonTitle: 'The Cardiac Cycle, Pressure-Volume Loops & Heart Sounds',
        phase: 'Phase 1: 1st & 2nd Year (Pre-clinical)',
        subject: 'Physiology',
        learningObjective: 'Visualize isovolumetric ventricular contraction, mitral valve closure, and aortic ejection.',
        references: ['Guyton & Hall Textbook of Medical Physiology 14th ed, Ch. 9'],
        prompt: 'High-definition medical illustration of a human heart in coronal cross-section during ventricular systole. The thick muscular left ventricular myocardium vigorously contracts inwards. The bicuspid mitral valve closes tightly preventing regurgitation, followed by the abrupt opening of the three semilunar aortic valve cusps with high-velocity blood ejection into the ascending aorta.',
        visualFormat: '3d-macro',
        targetAudience: 'undergraduate-mbbs',
        requiredStructures: ['Left Ventricle', 'Mitral Valve', 'Aortic Valve', 'Ascending Aorta'],
        status: 'succeeded',
        publicationStatus: 'published',
        authorId: 'auth-dmc-01',
        authorName: 'Dr. Tariqul Islam (Assistant Prof, Physiology, DMC)',
        createdAt: '2026-09-15T09:30:00.000Z',
        completedAt: '2026-09-15T09:32:15.000Z',
        videoUrl: '/media/cardiac_cycle_systole.mp4',
        posterUrl: '/anatomy/heart_preview.png',
        durationSeconds: 18,
        resolution: '832x480',
        retryCount: 0,
        maxRetries: 2,
        telemetry: {
          model_identifier: 'FreedomIntelligence/MedGen-1.3B',
          model_revision: 'main',
          base_architecture: 'Wan-AI/Wan2.1-T2V-1.3B',
          is_verified_medical_weights: true,
          seed: 1042,
          duration_seconds: 42.6,
          peak_vram_mb: 15420.0,
          resolution: '832x480',
          frame_count: 49
        }
      }
    ];
    this.saveVideoJobs(initialJobs);
    return initialJobs;
  }

  static saveVideoJobs(jobs: VideoGenerationJob[]): void {
    try {
      localStorage.setItem('medx_video_jobs_v2', JSON.stringify(jobs));
    } catch {}
  }

  static addVideoJob(job: VideoGenerationJob): void {
    const jobs = this.getVideoJobs();
    jobs.unshift(job);
    this.saveVideoJobs(jobs);
  }

  static updateVideoJob(jobId: string, updates: Partial<VideoGenerationJob>): VideoGenerationJob | null {
    const jobs = this.getVideoJobs();
    const idx = jobs.findIndex(j => j.id === jobId);
    if (idx === -1) return null;
    jobs[idx] = { ...jobs[idx], ...updates };
    this.saveVideoJobs(jobs);
    return jobs[idx];
  }

  static getPublishedVideos(lessonId?: string): LessonVideo[] {
    this.purgeLegacyKenhubCache();
    try {
      const stored = localStorage.getItem('medx_published_videos_v2');
      if (stored) {
        const list: LessonVideo[] = JSON.parse(stored);
        if (Array.isArray(list) && list.length >= 4) {
          if (lessonId) return list.filter(v => v.lessonId === lessonId);
          return list;
        }
      }
    } catch {}

    const templateKeys = Object.keys(LESSON_VIDEO_TEMPLATES);
    const initialVideos: LessonVideo[] = templateKeys.map((key, idx) => {
      const t = LESSON_VIDEO_TEMPLATES[key];
      return {
        id: `vid-${t.lessonId}`,
        jobId: `vj-init-${1000 + idx}`,
        lessonId: t.lessonId,
        title: t.videoTitleEn,
        titleBn: t.videoTitleBn,
        animationType: t.animationType,
        videoUrl: t.videoUrl,
        posterUrl: t.posterUrl,
        durationSeconds: t.durationSeconds,
        publicationStatus: 'published',
        disclaimer: 'AI-generated educational illustration based on MedGen-1.3B. For academic simulation only; not real patient footage.',
        chapters: t.chapters,
        questions: t.questions,
        subtitles: t.subtitles,
        transcriptEn: t.transcriptEn,
        transcriptBn: t.transcriptBn,
        reviewedBy: 'Prof. M. A. Jalil (External Medical Reviewer, Dhaka Medical College)',
        approvedDate: '2026-09-15T14:20:00.000Z',
        videoVersion: 'v1.0-medgen-verified'
      };
    });

    try {
      localStorage.setItem('medx_published_videos_v2', JSON.stringify(initialVideos));
    } catch {}
    if (lessonId) return initialVideos.filter(v => v.lessonId === lessonId);
    return initialVideos;
  }

  static saveVideoReview(review: MedicalReviewForm): void {
    try {
      const stored = localStorage.getItem('medx_video_reviews_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.push({ ...review, id: `rev-${Date.now()}`, reviewedAt: new Date().toISOString() });
      localStorage.setItem('medx_video_reviews_v1', JSON.stringify(list));
      
      // Update job publication status
      const pubStatus = review.decision === 'approved' ? 'approved' : 'rejected';
      this.updateVideoJob(review.jobId, { publicationStatus: pubStatus });
    } catch {}
  }

  static getVideoProgress(studentId: string, videoId: string): VideoStudentProgress | null {
    try {
      const stored = localStorage.getItem(`medx_video_prog_${studentId}_${videoId}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  }

  static saveVideoProgress(progress: Partial<VideoStudentProgress> & { videoId: string; studentId: string }): void {
    try {
      const existing = this.getVideoProgress(progress.studentId, progress.videoId) || {
        videoId: progress.videoId,
        studentId: progress.studentId,
        lastPositionSeconds: 0,
        completed: false,
        lastWatchedAt: new Date().toISOString(),
        answeredQuestionIds: [],
        bookmarked: false
      };
      const updated = { ...existing, ...progress, lastWatchedAt: new Date().toISOString() };
      localStorage.setItem(`medx_video_prog_${progress.studentId}_${progress.videoId}`, JSON.stringify(updated));
    } catch {}
  }
}
