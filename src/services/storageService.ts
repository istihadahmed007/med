import { StudentProgress, UserRole } from '../types';

const PROGRESS_STORAGE_KEY = 'medx_bd_student_progress_v1';
const ROLE_STORAGE_KEY = 'medx_bd_current_role_v1';
const BOOKMARKS_STORAGE_KEY = 'medx_bd_bookmarks_v1';
const NOTES_STORAGE_KEY = 'medx_bd_notes_v1';

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
      topicId: 'mitral-stenosis',
      topicTitle: 'Mitral Stenosis: Auscultation & Hemodynamics',
      phase: 'Phase 4',
      dueInHours: 4,
      intervalDays: 3
    },
    {
      topicId: 'acute-severe-asthma',
      topicTitle: 'Life-Threatening Asthma ABG Criteria',
      phase: 'Phase 4',
      dueInHours: 12,
      intervalDays: 7
    },
    {
      topicId: 'opc-poisoning',
      topicTitle: 'OPC Poisoning & Atropinization Protocol',
      phase: 'Phase 2',
      dueInHours: 24,
      intervalDays: 14
    }
  ]
};

export class StorageService {
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

  static getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return data ? JSON.parse(data) : ['mitral-stenosis', 'acute-severe-asthma', 'heart-morphology'];
    } catch {
      return [];
    }
  }

  static toggleBookmark(id: string): string[] {
    const bookmarks = this.getBookmarks();
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('StorageService: Bookmark toggle failed', e);
    }
    return updated;
  }

  static getNotes(): Record<string, string> {
    try {
      const data = localStorage.getItem(NOTES_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  static saveNote(topicId: string, text: string): void {
    const notes = this.getNotes();
    notes[topicId] = text;
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('StorageService: Save note failed', e);
    }
  }

  static recordQuizCompletion(subject: string, scorePercent: number): void {
    const progress = this.getProgress();
    progress.topicsStudied += 1;
    progress.accuracyRate = Math.round((progress.accuracyRate * 4 + scorePercent) / 5);
    progress.overallReadinessScore = Math.min(100, Math.round(progress.overallReadinessScore + 0.5));
    this.saveProgress(progress);
  }
}
