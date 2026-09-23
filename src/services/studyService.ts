/**
 * MEDX Study Materials Client Service
 *
 * Handles study material data access, bookmarks, reading progress,
 * and student study state using localStorage with API sync support.
 */

import {
  StudyBookmark,
  StudyReadingProgress,
  StudyHistoryEntry,
  StudyNote,
  StudentStudyState,
} from '../types/study';
import {
  STUDY_SUBJECTS,
  getSubjectBySlug,
  getTopicById,
  getAllTopicsFlat,
  searchStudyMaterials,
} from '../data/studyMaterialsData';

const STUDY_STATE_KEY = 'medx_study_state_v1';
const MAX_HISTORY = 50;
const MAX_RECENT_SEARCHES = 20;

function loadState(): StudentStudyState {
  try {
    const raw = localStorage.getItem(STUDY_STATE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    bookmarks: [],
    readingProgress: {},
    history: [],
    notes: [],
    recentSearches: [],
    completedTopicIds: [],
    favoriteSubjectIds: [],
  };
}

function saveState(state: StudentStudyState) {
  try {
    localStorage.setItem(STUDY_STATE_KEY, JSON.stringify(state));
  } catch {}
}

export class StudyService {
  // ─── Data Access ─────────────────────────────

  static getSubjects() {
    return STUDY_SUBJECTS;
  }

  static getSubjectBySlug(slug: string) {
    return getSubjectBySlug(slug);
  }

  static getTopicById(id: string) {
    return getTopicById(id);
  }

  static getAllTopics() {
    return getAllTopicsFlat();
  }

  static search(query: string, limit = 20) {
    return searchStudyMaterials(query, limit);
  }

  static getSubjectsByPhase(phase: string) {
    return STUDY_SUBJECTS.filter(s => s.phase === phase);
  }

  // ─── Bookmarks ────────────────────────────────

  static getBookmarks(): StudyBookmark[] {
    return loadState().bookmarks;
  }

  static isBookmarked(targetId: string): boolean {
    return loadState().bookmarks.some(b => b.targetId === targetId);
  }

  static toggleBookmark(bookmark: Omit<StudyBookmark, 'id' | 'savedAt'>): boolean {
    const state = loadState();
    const existing = state.bookmarks.findIndex(b => b.targetId === bookmark.targetId && b.type === bookmark.type);
    if (existing >= 0) {
      state.bookmarks.splice(existing, 1);
      saveState(state);
      return false;
    }
    state.bookmarks.unshift({
      ...bookmark,
      id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: Date.now(),
    });
    saveState(state);
    return true;
  }

  // ─── Reading Progress ─────────────────────────

  static getReadingProgress(): Record<string, StudyReadingProgress> {
    return loadState().readingProgress;
  }

  static getTopicProgress(topicId: string): StudyReadingProgress | null {
    return loadState().readingProgress[topicId] || null;
  }

  static updateReadingProgress(topicId: string, subjectId: string, title: string, scrollPercentage: number, timeSpentSeconds: number) {
    const state = loadState();
    const existing = state.readingProgress[topicId];
    state.readingProgress[topicId] = {
      topicId,
      subjectId,
      title,
      scrollPercentage,
      lastReadAt: Date.now(),
      completed: scrollPercentage >= 95 || (existing?.completed ?? false),
      timeSpentSeconds: (existing?.timeSpentSeconds ?? 0) + timeSpentSeconds,
    };
    if (scrollPercentage >= 95 && !state.completedTopicIds.includes(topicId)) {
      state.completedTopicIds.push(topicId);
    }
    saveState(state);
  }

  static getRecentlyRead(limit = 10): StudyReadingProgress[] {
    const state = loadState();
    return Object.values(state.readingProgress)
      .sort((a, b) => b.lastReadAt - a.lastReadAt)
      .slice(0, limit);
  }

  static getContinueReading(): StudyReadingProgress | null {
    const state = loadState();
    const incomplete = Object.values(state.readingProgress)
      .filter(p => !p.completed)
      .sort((a, b) => b.lastReadAt - a.lastReadAt);
    return incomplete[0] || null;
  }

  // ─── History ──────────────────────────────────

  static getHistory(limit = 20): StudyHistoryEntry[] {
    return loadState().history.slice(0, limit);
  }

  static addToHistory(entry: Omit<StudyHistoryEntry, 'timestamp'>) {
    const state = loadState();
    // Remove duplicate
    state.history = state.history.filter(
      h => !(h.targetId === entry.targetId && h.type === entry.type)
    );
    state.history.unshift({ ...entry, timestamp: Date.now() });
    if (state.history.length > MAX_HISTORY) {
      state.history = state.history.slice(0, MAX_HISTORY);
    }
    saveState(state);
  }

  // ─── Notes ────────────────────────────────────

  static getNotes(topicId?: string): StudyNote[] {
    const state = loadState();
    if (topicId) return state.notes.filter(n => n.topicId === topicId);
    return state.notes;
  }

  static saveNote(note: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>): StudyNote {
    const state = loadState();
    const newNote: StudyNote = {
      ...note,
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    state.notes.unshift(newNote);
    saveState(state);
    return newNote;
  }

  static deleteNote(noteId: string) {
    const state = loadState();
    state.notes = state.notes.filter(n => n.id !== noteId);
    saveState(state);
  }

  // ─── Recent Searches ─────────────────────────

  static getRecentSearches(): string[] {
    return loadState().recentSearches;
  }

  static addRecentSearch(query: string) {
    if (!query || query.length < 2) return;
    const state = loadState();
    state.recentSearches = [
      query,
      ...state.recentSearches.filter(s => s !== query),
    ].slice(0, MAX_RECENT_SEARCHES);
    saveState(state);
  }

  // ─── Completed Topics ────────────────────────

  static getCompletedTopicIds(): string[] {
    return loadState().completedTopicIds;
  }

  static getCompletionStats() {
    const state = loadState();
    const allTopics = getAllTopicsFlat();
    return {
      total: allTopics.length,
      completed: state.completedTopicIds.length,
      percentage: allTopics.length > 0 ? Math.round((state.completedTopicIds.length / allTopics.length) * 100) : 0,
    };
  }

  // ─── Favorites ───────────────────────────────

  static isFavoriteSubject(subjectId: string): boolean {
    return loadState().favoriteSubjectIds.includes(subjectId);
  }

  static toggleFavoriteSubject(subjectId: string): boolean {
    const state = loadState();
    const idx = state.favoriteSubjectIds.indexOf(subjectId);
    if (idx >= 0) {
      state.favoriteSubjectIds.splice(idx, 1);
      saveState(state);
      return false;
    }
    state.favoriteSubjectIds.push(subjectId);
    saveState(state);
    return true;
  }
}
