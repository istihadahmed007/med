import { TextbookRecord, TextbookBookmark, TextbookStudentNote, ImportJob, TextbookFilterOptions } from '../types/textbook';
import { VERIFIED_TEXTBOOKS, searchVerifiedTextbooks, getVerifiedTextbookById } from '../data/verifiedTextbooksData';

const BOOKMARKS_KEY = 'medx_textbook_bookmarks_v1';
const NOTES_KEY = 'medx_textbook_notes_v1';
const READER_PREFS_KEY = 'medx_textbook_reader_prefs_v1';
const LOCAL_JOBS_KEY = 'medx_local_textbook_jobs_v1';

export interface ReaderPreferences {
  fontSize: number; // 14 - 24
  fontFamily: 'sans' | 'serif';
  lineHeight: 'normal' | 'relaxed' | 'loose';
  theme: 'dark' | 'high-contrast' | 'sepia' | 'glass';
  focusMode: boolean;
}

export const DEFAULT_READER_PREFS: ReaderPreferences = {
  fontSize: 16,
  fontFamily: 'sans',
  lineHeight: 'relaxed',
  theme: 'glass',
  focusMode: false
};

export class FrontendTextbookService {
  // =========================================================================
  // Catalog Methods
  private static catalogCache: TextbookRecord[] | null = null;

  private static async loadStaticCatalog(): Promise<TextbookRecord[] | null> {
    if (this.catalogCache) return this.catalogCache;
    try {
      const candidates = ['./data/textbooks_catalog.json', 'data/textbooks_catalog.json', '/data/textbooks_catalog.json'];
      const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '';
      if (base && base !== './' && base !== '/') {
        candidates.unshift(`${base.replace(/\/$/, '')}/data/textbooks_catalog.json`);
      }
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              this.catalogCache = data;
              return data;
            }
          }
        } catch {}
      }
    } catch {}
    return null;
  }

  static async getTextbooks(options?: Partial<TextbookFilterOptions>): Promise<TextbookRecord[]> {
    const query = options?.query || '';
    const phase = options?.phase || 'all';
    const subject = options?.subject || 'all';
    const accessType = options?.accessType || 'all';

    try {
      const params = new URLSearchParams({
        query,
        phase,
        subject,
        accessType,
        includePrivate: 'true'
      });
      const res = await fetch(`/api/textbooks?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (e) {
      // Offline or network error - fallback to local verified dataset
    }

    const staticCatalog = await this.loadStaticCatalog();
    if (staticCatalog) {
      return staticCatalog.filter(book => {
        if (phase !== 'all' && book.phase !== phase) return false;
        if (subject !== 'all' && book.subjectId !== subject) return false;
        if (accessType !== 'all' && book.accessType !== accessType) return false;
        if (query) {
          const q = query.toLowerCase();
          const matchTitle = (book.title || '').toLowerCase().includes(q);
          const matchAuthor = (book.authors || []).some(a => a.toLowerCase().includes(q));
          const matchSubject = (book.subjectId || '').toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchSubject) return false;
        }
        return true;
      });
    }

    return searchVerifiedTextbooks(query, phase, subject, accessType);
  }

  static async getTextbookById(id: string): Promise<TextbookRecord | undefined> {
    try {
      const res = await fetch(`/api/textbooks/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) return data;
      }
    } catch (e) {
      // fallback
    }

    const staticCatalog = await this.loadStaticCatalog();
    if (staticCatalog) {
      const book = staticCatalog.find(b => b.id === id);
      if (book) return book;
    }

    return getVerifiedTextbookById(id);
  }

  // =========================================================================
  // Bookmarking System (Preserving Existing User Data)
  // =========================================================================
  static getBookmarks(): TextbookBookmark[] {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static isBookmarked(bookId: string, sectionId: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(b => b.bookId === bookId && b.sectionId === sectionId);
  }

  static toggleBookmark(bookmark: Omit<TextbookBookmark, 'savedAt'>): boolean {
    try {
      const bookmarks = this.getBookmarks();
      const existingIdx = bookmarks.findIndex(
        b => b.bookId === bookmark.bookId && b.sectionId === bookmark.sectionId
      );

      let isNowSaved = false;
      if (existingIdx >= 0) {
        bookmarks.splice(existingIdx, 1);
        isNowSaved = false;
      } else {
        bookmarks.unshift({
          ...bookmark,
          savedAt: Date.now()
        });
        isNowSaved = true;
      }

      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      return isNowSaved;
    } catch {
      return false;
    }
  }

  // =========================================================================
  // Personal Student Notes System
  // =========================================================================
  static getNotes(bookId?: string, sectionId?: string): TextbookStudentNote[] {
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      if (!raw) return [];
      const notes: TextbookStudentNote[] = JSON.parse(raw);

      if (bookId && sectionId) {
        return notes.filter(n => n.bookId === bookId && n.sectionId === sectionId);
      }
      if (bookId) {
        return notes.filter(n => n.bookId === bookId);
      }
      return notes;
    } catch {
      return [];
    }
  }

  static saveNote(note: Omit<TextbookStudentNote, 'id' | 'updatedAt'> & { id?: string }): TextbookStudentNote {
    const notes = this.getNotes();
    const id = note.id || `note-${Date.now()}`;
    const entry: TextbookStudentNote = {
      ...note,
      id,
      updatedAt: Date.now()
    };

    const existingIndex = notes.findIndex(n => n.id === id);
    if (existingIndex >= 0) {
      notes[existingIndex] = entry;
    } else {
      notes.unshift(entry);
    }

    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save student note to localStorage', e);
    }

    return entry;
  }

  static deleteNote(noteId: string): boolean {
    try {
      const notes = this.getNotes().filter(n => n.id !== noteId);
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return true;
    } catch {
      return false;
    }
  }

  // =========================================================================
  // Reader Preferences
  // =========================================================================
  static getReaderPrefs(): ReaderPreferences {
    try {
      const raw = localStorage.getItem(READER_PREFS_KEY);
      if (!raw) return DEFAULT_READER_PREFS;
      return { ...DEFAULT_READER_PREFS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_READER_PREFS;
    }
  }

  static saveReaderPrefs(prefs: Partial<ReaderPreferences>): ReaderPreferences {
    const current = this.getReaderPrefs();
    const updated = { ...current, ...prefs };
    try {
      localStorage.setItem(READER_PREFS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save reader preferences', e);
    }
    return updated;
  }

  // =========================================================================
  // Import Jobs API & Fallback
  // =========================================================================
  static async fetchOnlineMetadata(queryOrIsbn: string) {
    try {
      const res = await fetch('/api/textbook-import/fetch-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryOrIsbn })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }

    // Local fallback search
    const results = searchVerifiedTextbooks(queryOrIsbn).slice(0, 5);
    return {
      source: 'local_offline_verified_dataset',
      query: queryOrIsbn,
      results: results.map(b => ({
        title: b.title,
        titleBn: b.titleBn,
        authors: b.authors,
        edition: b.edition,
        publicationYear: b.publicationYear,
        publisher: b.publisher,
        isbn13: b.isbn13,
        subjectId: b.subjectId,
        phase: b.phase,
        accessType: b.accessType,
        officialPublisherUrl: b.officialPublisherUrl,
        sourceUrl: b.sourceUrl,
        verified: true,
        isCatalogued: true,
        catalogId: b.id
      }))
    };
  }

  static async submitImportJob(payload: {
    type: 'metadata_fetch' | 'file_upload' | 'url_import';
    targetTitle: string;
    targetIsbn?: string;
    sourceUrl?: string;
    fileName?: string;
    fileSizeBytes?: number;
    mimeType?: string;
    isPrivateUpload?: boolean;
    extractedMetadata?: any;
  }): Promise<{ success: boolean; job: ImportJob }> {
    try {
      const res = await fetch('/api/textbook-import/submit-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
      const err = await res.json();
      throw new Error(err.error || 'Import submission failed.');
    } catch (err: any) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
    }

    // Offline simulation fallback
    const jobId = `local-job-${Date.now()}`;
    const job: ImportJob = {
      id: jobId,
      type: payload.type,
      status: 'processing',
      targetTitle: payload.targetTitle,
      targetIsbn: payload.targetIsbn,
      ownerId: 'std-bmdc-2026-0891',
      ownerRole: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      retryCount: 0,
      maxRetries: 3,
      fileName: payload.fileName,
      fileSizeBytes: payload.fileSizeBytes,
      isPrivateUpload: payload.isPrivateUpload,
      editorialReviewStatus: payload.isPrivateUpload ? 'approved' : 'pending_review'
    };

    const localJobs = this.getLocalJobs();
    localJobs.unshift(job);
    this.saveLocalJobs(localJobs);

    setTimeout(() => {
      const current = this.getLocalJobs();
      const target = current.find(j => j.id === jobId);
      if (target) {
        target.status = payload.isPrivateUpload ? 'published' : 'awaiting_review';
        target.updatedAt = new Date().toISOString();
        this.saveLocalJobs(current);
      }
    }, 1500);

    return { success: true, job };
  }

  static async getImportJobs(): Promise<ImportJob[]> {
    try {
      const res = await fetch('/api/textbook-import/jobs');
      if (res.ok) {
        const jobs = await res.json();
        if (Array.isArray(jobs) && jobs.length > 0) return jobs;
      }
    } catch (e) {}

    return this.getLocalJobs();
  }

  static async retryImportJob(jobId: string): Promise<ImportJob> {
    try {
      const res = await fetch(`/api/textbook-import/jobs/${jobId}/retry`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        return data.job;
      }
      const err = await res.json();
      throw new Error(err.error || 'Retry failed');
    } catch (err: any) {
      if (!err.message.includes('fetch')) throw err;
    }

    const local = this.getLocalJobs();
    const target = local.find(j => j.id === jobId);
    if (!target) throw new Error('Job not found');
    target.retryCount += 1;
    target.status = 'processing';
    target.updatedAt = new Date().toISOString();
    this.saveLocalJobs(local);
    return target;
  }

  private static getLocalJobs(): ImportJob[] {
    try {
      const raw = localStorage.getItem(LOCAL_JOBS_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private static saveLocalJobs(jobs: ImportJob[]) {
    try {
      localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(jobs));
    } catch (e) {}
  }
}
