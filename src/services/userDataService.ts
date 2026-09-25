import { supabase, isSupabaseConfigured, UserProfile } from './supabaseClient';
import { StudentProgress, LessonBookmark, MistakeEntry, SpacedRepetitionCard, BmdcLesson } from '../types';
import { AuthService } from './authService';

export const createEmptyProgress = (user: { id: string; name: string; email: string; institution?: string; phase?: string }): StudentProgress => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  currentPhase: user.phase || 'Phase 1: 1st & 2nd Year (Pre-clinical)',
  university: user.institution || 'Medical College',
  streakDays: 0,
  overallReadinessScore: 0,
  topicsStudied: 0,
  casesCompleted: 0,
  ospeStationsAttempted: 0,
  accuracyRate: 0,
  completedLessonIds: [],
  quizAttemptsCount: 0,
  weakAreas: [],
  spacedRepetitionDue: []
});

class UserDataServiceClass {
  // 1. User Progress
  public async getProgress(): Promise<StudentProgress | null> {
    const user = AuthService.getCurrentUser();
    const profile = AuthService.getProfile();

    if (!user) {
      return null;
    }

    const cacheKey = `medx_progress_${user.id}`;
    let cached: StudentProgress | null = null;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {}

    if (!isSupabaseConfigured()) {
      if (cached) return cached;
      const initial = createEmptyProgress({
        id: user.id,
        name: profile?.full_name || 'Medical Student',
        email: user.email || '',
        institution: profile?.institution,
        phase: profile?.mbbs_phase
      });
      this.saveLocalProgress(user.id, initial);
      return initial;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('Failed to fetch remote user progress', error);
      }

      if (data) {
        const progress: StudentProgress = {
          userId: user.id,
          name: profile?.full_name || 'Medical Student',
          email: user.email || '',
          currentPhase: profile?.mbbs_phase || 'Phase 1',
          university: profile?.institution || 'Medical College',
          streakDays: data.streak_days || 0,
          overallReadinessScore: data.overall_readiness_score || 0,
          topicsStudied: data.topics_studied || 0,
          casesCompleted: data.cases_completed || 0,
          ospeStationsAttempted: data.ospe_stations_attempted || 0,
          accuracyRate: data.accuracy_rate || 0,
          completedLessonIds: Array.isArray(data.completed_lesson_ids) ? data.completed_lesson_ids : [],
          quizAttemptsCount: data.quiz_attempts_count || 0,
          weakAreas: Array.isArray(data.weak_areas) ? data.weak_areas : [],
          spacedRepetitionDue: Array.isArray(data.spaced_repetition_due) ? data.spaced_repetition_due : []
        };
        this.saveLocalProgress(user.id, progress);
        return progress;
      }

      // Fresh authenticated user: Create empty progress row, strictly no sample student data
      const initial = createEmptyProgress({
        id: user.id,
        name: profile?.full_name || 'Medical Student',
        email: user.email || '',
        institution: profile?.institution,
        phase: profile?.mbbs_phase
      });

      await supabase.from('user_progress').insert({
        user_id: user.id,
        streak_days: 0,
        overall_readiness_score: 0,
        topics_studied: 0,
        cases_completed: 0,
        ospe_stations_attempted: 0,
        accuracy_rate: 0,
        completed_lesson_ids: [],
        quiz_attempts_count: 0,
        weak_areas: [],
        spaced_repetition_due: []
      });

      this.saveLocalProgress(user.id, initial);
      return initial;
    } catch (e) {
      console.warn('Error syncing progress with database', e);
      return cached || createEmptyProgress({
        id: user.id,
        name: profile?.full_name || 'Medical Student',
        email: user.email || ''
      });
    }
  }

  public async saveProgress(progress: StudentProgress): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) return;

    this.saveLocalProgress(user.id, progress);

    if (!isSupabaseConfigured()) return;

    try {
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        streak_days: progress.streakDays,
        overall_readiness_score: progress.overallReadinessScore,
        topics_studied: progress.topicsStudied,
        cases_completed: progress.casesCompleted,
        ospe_stations_attempted: progress.ospeStationsAttempted,
        accuracy_rate: progress.accuracyRate,
        completed_lesson_ids: progress.completedLessonIds,
        quiz_attempts_count: progress.quizAttemptsCount,
        weak_areas: progress.weakAreas,
        spaced_repetition_due: progress.spacedRepetitionDue,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('Failed to upsert user progress to Supabase', e);
    }
  }

  private saveLocalProgress(userId: string, progress: StudentProgress) {
    try {
      localStorage.setItem(`medx_progress_${userId}`, JSON.stringify(progress));
    } catch {}
  }

  // 2. User Bookmarks
  public async getBookmarks(): Promise<LessonBookmark[]> {
    const user = AuthService.getCurrentUser();
    if (!user) return [];

    const cacheKey = `medx_bookmarks_${user.id}`;
    let cached: LessonBookmark[] = [];
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {}

    if (!isSupabaseConfigured()) return cached;

    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Failed to fetch bookmarks', error);
        return cached;
      }

      const bookmarks: LessonBookmark[] = (data || []).map((row) => ({
        lessonId: row.lesson_id,
        title: row.title,
        subject: row.subject,
        phase: row.phase,
        lastStep: row.last_step,
        scrollPercentage: row.scroll_percentage,
        savedAt: new Date(row.created_at).getTime()
      }));

      try {
        localStorage.setItem(cacheKey, JSON.stringify(bookmarks));
      } catch {}

      return bookmarks;
    } catch (e) {
      return cached;
    }
  }

  public async toggleBookmark(lesson: BmdcLesson, currentStep: any = 'learn'): Promise<boolean> {
    const user = AuthService.getCurrentUser();
    if (!user) return false;

    const currentBookmarks = await this.getBookmarks();
    const exists = currentBookmarks.some((b) => b.lessonId === lesson.id);

    if (exists) {
      const updated = currentBookmarks.filter((b) => b.lessonId !== lesson.id);
      try {
        localStorage.setItem(`medx_bookmarks_${user.id}`, JSON.stringify(updated));
      } catch {}

      if (isSupabaseConfigured()) {
        await supabase
          .from('user_bookmarks')
          .delete()
          .match({ user_id: user.id, lesson_id: lesson.id });
      }
      return false;
    } else {
      const newBookmark: LessonBookmark = {
        lessonId: lesson.id,
        title: lesson.title,
        subject: lesson.subjectName,
        phase: lesson.phase,
        lastStep: currentStep,
        scrollPercentage: 0,
        savedAt: Date.now()
      };
      const updated = [newBookmark, ...currentBookmarks];
      try {
        localStorage.setItem(`medx_bookmarks_${user.id}`, JSON.stringify(updated));
      } catch {}

      if (isSupabaseConfigured()) {
        await supabase
          .from('user_bookmarks')
          .insert({
            user_id: user.id,
            lesson_id: lesson.id,
            title: lesson.title,
            subject: lesson.subjectName,
            phase: lesson.phase,
            last_step: currentStep,
            scroll_percentage: 0
          });
      }
      return true;
    }
  }

  // 3. User Notes
  public async getNotes(): Promise<Record<string, string>> {
    const user = AuthService.getCurrentUser();
    if (!user) return {};

    const cacheKey = `medx_notes_${user.id}`;
    let cached: Record<string, string> = {};
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {}

    if (!isSupabaseConfigured()) return cached;

    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id);

      if (error) return cached;

      const notesMap: Record<string, string> = {};
      (data || []).forEach((row) => {
        notesMap[row.item_id] = row.note;
      });

      try {
        localStorage.setItem(cacheKey, JSON.stringify(notesMap));
      } catch {}

      return notesMap;
    } catch {
      return cached;
    }
  }

  public async saveNote(itemType: 'drug' | 'lesson' | 'topic', itemId: string, note: string): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) return;

    const current = await this.getNotes();
    current[itemId] = note;
    try {
      localStorage.setItem(`medx_notes_${user.id}`, JSON.stringify(current));
    } catch {}

    if (!isSupabaseConfigured()) return;

    try {
      await supabase.from('user_notes').upsert({
        user_id: user.id,
        item_type: itemType,
        item_id: itemId,
        note: note,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id, item_type, item_id' });
    } catch (e) {
      console.warn('Failed to save note to Supabase', e);
    }
  }

  // 4. User Mistakes
  public async getMistakes(): Promise<MistakeEntry[]> {
    const user = AuthService.getCurrentUser();
    if (!user) return [];

    const cacheKey = `medx_mistakes_${user.id}`;
    let cached: MistakeEntry[] = [];
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {}

    if (!isSupabaseConfigured()) return cached;

    try {
      const { data, error } = await supabase
        .from('user_mistakes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) return cached;

      const mistakes: MistakeEntry[] = (data || []).map((row) => ({
        id: row.id,
        questionId: row.question_id,
        subject: row.subject,
        phase: row.phase,
        topic: row.topic,
        questionStem: row.question_stem || row.topic || '',
        selectedAnswer: row.user_selected_answer || '',
        correctAnswer: row.correct_answer,
        explanation: row.explanation,
        timestamp: new Date(row.created_at).getTime(),
        reviewed: row.reviewed,
        reviewCount: row.review_count
      }));

      try {
        localStorage.setItem(cacheKey, JSON.stringify(mistakes));
      } catch {}

      return mistakes;
    } catch {
      return cached;
    }
  }

  public async recordMistake(mistake: Omit<MistakeEntry, 'id' | 'timestamp' | 'reviewed' | 'reviewCount'>): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) return;

    const currentMistakes = await this.getMistakes();
    const existing = currentMistakes.find((m) => m.questionId === mistake.questionId);
    if (existing) return;

    const newEntry: MistakeEntry = {
      ...mistake,
      id: `mst-${Date.now()}`,
      timestamp: Date.now(),
      reviewed: false,
      reviewCount: 0
    };

    const updated = [newEntry, ...currentMistakes];
    try {
      localStorage.setItem(`medx_mistakes_${user.id}`, JSON.stringify(updated));
    } catch {}

    if (!isSupabaseConfigured()) return;

    try {
      await supabase.from('user_mistakes').insert({
        user_id: user.id,
        question_id: mistake.questionId,
        subject: mistake.subject,
        phase: mistake.phase,
        topic: mistake.topic,
        user_selected_answer: mistake.selectedAnswer,
        correct_answer: mistake.correctAnswer,
        explanation: mistake.explanation,
        reviewed: false,
        review_count: 0
      });
    } catch (e) {
      console.warn('Failed to insert mistake', e);
    }
  }

  // 5. Drug Bookmarks
  public async getDrugBookmarks(): Promise<{ brands: string[]; generics: string[] }> {
    const user = AuthService.getCurrentUser();
    if (!user) return { brands: [], generics: [] };

    const cacheKey = `medx_drug_bkmk_${user.id}`;
    let cached = { brands: [] as string[], generics: [] as string[] };
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {}

    if (!isSupabaseConfigured()) return cached;

    try {
      const { data, error } = await supabase
        .from('user_drug_bookmarks')
        .select('*')
        .eq('user_id', user.id);

      if (error) return cached;

      const brands: string[] = [];
      const generics: string[] = [];
      (data || []).forEach((row) => {
        if (row.item_type === 'brand') brands.push(row.item_id);
        else if (row.item_type === 'generic') generics.push(row.item_id);
      });

      const result = { brands, generics };
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch {}

      return result;
    } catch {
      return cached;
    }
  }

  public async toggleDrugBookmark(type: 'brand' | 'generic', id: string): Promise<boolean> {
    const user = AuthService.getCurrentUser();
    if (!user) return false;

    const current = await this.getDrugBookmarks();
    const list = type === 'brand' ? current.brands : current.generics;
    const exists = list.includes(id);

    let bookmarked = false;
    if (exists) {
      const updatedList = list.filter((item) => item !== id);
      if (type === 'brand') current.brands = updatedList;
      else current.generics = updatedList;
      bookmarked = false;

      if (isSupabaseConfigured()) {
        await supabase
          .from('user_drug_bookmarks')
          .delete()
          .match({ user_id: user.id, item_type: type, item_id: id });
      }
    } else {
      list.push(id);
      bookmarked = true;

      if (isSupabaseConfigured()) {
        await supabase
          .from('user_drug_bookmarks')
          .insert({ user_id: user.id, item_type: type, item_id: id });
      }
    }

    try {
      localStorage.setItem(`medx_drug_bkmk_${user.id}`, JSON.stringify(current));
    } catch {}

    return bookmarked;
  }
}

export const UserDataService = new UserDataServiceClass();
