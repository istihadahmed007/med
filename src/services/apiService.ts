import { 
  BmdcLesson, 
  QuestionBankItem, 
  ClinicalCase, 
  StudentProgress, 
  UserRole,
  UserAccount,
  MistakeEntry,
  SpacedRepetitionCard
} from '../types';
import { StorageService } from './storageService';
import { 
  CARDIOVASCULAR_PILOT_LESSONS, 
  CARDIOVASCULAR_PILOT_QUESTIONS, 
  CARDIOVASCULAR_PILOT_CASES 
} from '../data/cardiovascularPilotData';

const API_BASE = '/api';

export class ApiService {
  private static isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  // Server health check
  static async checkHealth(): Promise<{ status: string; version: string; database: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (res.ok) return await res.json();
      throw new Error('Server returned non-200');
    } catch {
      return { status: 'offline_mode', version: '2.0.0-local', database: 'browser_storage' };
    }
  }

  // Authentication & Role
  static async getCurrentUser(): Promise<UserAccount> {
    try {
      const res = await fetch(`${API_BASE}/auth/me`);
      if (res.ok) return await res.json();
      throw new Error('Auth fallback');
    } catch {
      const role = StorageService.getRole();
      const progress = StorageService.getProgress();
      return {
        id: progress.userId,
        name: progress.name,
        email: progress.email,
        role: role,
        currentPhase: progress.currentPhase,
        institution: progress.university
      };
    }
  }

  static async setRole(role: UserRole): Promise<UserRole> {
    StorageService.setRole(role);
    try {
      await fetch(`${API_BASE}/auth/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
    } catch {
      // Handled in local storage
    }
    return role;
  }

  // Lessons & Curriculum
  static async getLessons(filter?: { phase?: string; system?: string }): Promise<BmdcLesson[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.phase) params.append('phase', filter.phase);
      if (filter?.system) params.append('system', filter.system);
      
      const res = await fetch(`${API_BASE}/lessons?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
      throw new Error('Fallback to local lessons');
    } catch {
      let results = [...CARDIOVASCULAR_PILOT_LESSONS];
      if (filter?.phase) {
        results = results.filter((l) => l.phase.toLowerCase().includes(filter.phase!.toLowerCase()));
      }
      if (filter?.system) {
        results = results.filter((l) => l.system === filter.system);
      }
      return results;
    }
  }

  static async getLessonById(id: string): Promise<BmdcLesson | undefined> {
    try {
      const res = await fetch(`${API_BASE}/lessons/${id}`);
      if (res.ok) return await res.json();
      throw new Error('Lesson fallback');
    } catch {
      return CARDIOVASCULAR_PILOT_LESSONS.find((l) => l.id === id);
    }
  }

  // Questions & Assessment
  static async getQuestions(topic?: string, phase?: string): Promise<QuestionBankItem[]> {
    try {
      const res = await fetch(`${API_BASE}/questions`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
      throw new Error('Questions fallback');
    } catch {
      return CARDIOVASCULAR_PILOT_QUESTIONS;
    }
  }

  // Clinical Cases
  static async getCases(): Promise<ClinicalCase[]> {
    try {
      const res = await fetch(`${API_BASE}/cases`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
      throw new Error('Cases fallback');
    } catch {
      return CARDIOVASCULAR_PILOT_CASES;
    }
  }

  // Progress & Analytics
  static async getProgress(): Promise<StudentProgress> {
    try {
      const res = await fetch(`${API_BASE}/progress`);
      if (res.ok) return await res.json();
      throw new Error('Progress fallback');
    } catch {
      return StorageService.getProgress();
    }
  }

  static async updateProgress(progress: StudentProgress): Promise<void> {
    StorageService.saveProgress(progress);
    try {
      await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress)
      });
    } catch {
      // Sync queue handled locally
    }
  }

  // AI Tutor RAG
  static async askAiTutor(query: string, language: 'en' | 'bn' = 'en'): Promise<{
    answer: string;
    citations: string[];
    visualCascade?: string[];
    isConfigured: boolean;
  }> {
    try {
      const res = await fetch(`${API_BASE}/ai-tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language })
      });
      if (res.ok) return await res.json();
      throw new Error('AI API unavailable');
    } catch (e) {
      // Deterministic evidence-grounded search over published lessons
      const q = query.toLowerCase();
      const matchedLesson = CARDIOVASCULAR_PILOT_LESSONS.find((l) =>
        l.title.toLowerCase().includes(q) ||
        l.stages.learn.detailedContentEn.toLowerCase().includes(q) ||
        l.learningObjectives.some((obj) => obj.toLowerCase().includes(q))
      );

      if (matchedLesson) {
        return {
          answer: language === 'bn'
            ? `**${matchedLesson.titleBn || matchedLesson.title}** সম্পর্কিত অনুমোদিত পাঠ্যক্রম তথ্য:\n\n${matchedLesson.stages.learn.overviewBn}\n\n**মূল শিক্ষণীয় বিষয় (Key Points):**\n${matchedLesson.stages.learn.keyTakeaways.map(p => `• ${p}`).join('\n')}`
            : `**From Verified Lesson: ${matchedLesson.title}**\n\n${matchedLesson.stages.learn.overviewEn}\n\n**Key Evidence Takeaways:**\n${matchedLesson.stages.learn.keyTakeaways.map(p => `• ${p}`).join('\n')}`,
          citations: matchedLesson.references,
          visualCascade: [
            '1. Primary Anatomical/Physiological Substrate',
            '2. Pathophysiological Alteration & Cellular Changes',
            '3. Hemodynamic / Clinical Manifestation',
            '4. Confirmatory Diagnostic Workup',
            '5. Guideline-Directed Clinical Management'
          ],
          isConfigured: false // Highlights that live Gemini API key is not yet set on server
        };
      }

      return {
        answer: language === 'bn'
          ? 'এই বিষয়ে অনুমোদিত পাঠ্যক্রমে সরাসরি তথ্য পাওয়া যায়নি। অনুগ্রহ করে BM&DC পাঠ্যবই (ডেভিডসন, গাইটন, রবিন্স) অনুসরণ করুন।'
          : 'No directly matching approved lesson found in the current verified database. Please reference accredited BM&DC textbooks (Davidson, Guyton, Robbins, Katzung).',
        citations: ['BM&DC National MBBS Syllabus 2026', 'Davidson\'s Principles of Medicine 24th ed.'],
        isConfigured: false
      };
    }
  }
}
