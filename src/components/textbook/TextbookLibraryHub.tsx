import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Layers, 
  Upload, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BookMarked, 
  ChevronRight, 
  Eye, 
  Info,
  GraduationCap
} from 'lucide-react';
import { TextbookRecord, TextbookAccessType } from '../../types/textbook';
import { FrontendTextbookService } from '../../services/textbookService';
import { TextbookDetailModal } from './TextbookDetailModal';
import { TextbookReaderView } from './TextbookReaderView';
import { TextbookImportModal } from './TextbookImportModal';
import './textbook.css';

interface Props {
  onNavigateAcrossBooks: (topicId?: string) => void;
}

export const TextbookLibraryHub: React.FC<Props> = ({ onNavigateAcrossBooks }) => {
  const [textbooks, setTextbooks] = useState<TextbookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedAccessType, setSelectedAccessType] = useState<string>('all');
  const [savedOnly, setSavedOnly] = useState(false);

  // Modals & Reader state
  const [detailBook, setDetailBook] = useState<TextbookRecord | null>(null);
  const [readingBook, setReadingBook] = useState<TextbookRecord | null>(null);
  const [readingSectionId, setReadingSectionId] = useState<string | undefined>(undefined);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Load books
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    setIsLoading(true);
    try {
      const data = await FrontendTextbookService.getTextbooks();
      setTextbooks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const bookmarks = useMemo(() => FrontendTextbookService.getBookmarks(), []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return textbooks.filter(book => {
      if (selectedPhase !== 'all' && book.phase !== selectedPhase) return false;
      if (selectedSubject !== 'all' && book.subjectId !== selectedSubject) return false;
      if (selectedAccessType !== 'all' && book.accessType !== selectedAccessType) return false;
      if (savedOnly && !bookmarks.some(b => b.bookId === book.id)) return false;

      if (!terms.length) return true;

      const searchable = [
        book.title,
        book.titleBn || '',
        book.publisher,
        book.edition,
        book.isbn13 || '',
        book.subjectId,
        ...book.authors,
        ...(book.editors || []),
        ...(book.connectedTopicIds || []),
        ...book.tableOfContents.map(t => t.title + ' ' + (t.titleBn || ''))
      ].join(' ').toLowerCase();

      return terms.every(term => searchable.includes(term));
    });
  }, [textbooks, searchQuery, selectedPhase, selectedSubject, selectedAccessType, savedOnly, bookmarks]);

  // Phase options
  const phases = [
    { id: 'all', label: 'All Phases' },
    { id: 'Phase 1', label: 'Phase 1: Pre-clinical' },
    { id: 'Phase 2', label: 'Phase 2: Para-clinical' },
    { id: 'Phase 3', label: 'Phase 3: Para-clinical' },
    { id: 'Phase 4', label: 'Phase 4: Clinical' }
  ];

  // Subject options
  const subjects = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'anatomy', label: 'Anatomy & Embryology' },
    { id: 'physiology', label: 'Physiology' },
    { id: 'biochemistry', label: 'Biochemistry' },
    { id: 'community-medicine', label: 'Community Medicine' },
    { id: 'forensic-medicine', label: 'Forensic Medicine' },
    { id: 'pathology', label: 'Pathology' },
    { id: 'pharmacology', label: 'Pharmacology' },
    { id: 'microbiology', label: 'Microbiology' },
    { id: 'medicine', label: 'Medicine & Clinics' },
    { id: 'surgery', label: 'Surgery' },
    { id: 'obstetrics-gynaecology', label: 'Obs & Gynae' },
    { id: 'paediatrics', label: 'Paediatrics' },
    { id: 'orthopaedics', label: 'Orthopaedics' },
    { id: 'ophthalmology', label: 'Ophthalmology' },
    { id: 'ent', label: 'ENT & Head-Neck' }
  ];

  // Statistics counts
  const stats = useMemo(() => {
    return {
      total: textbooks.length,
      inAppRead: textbooks.filter(b => b.accessType === 'read_in_medx').length,
      preview: textbooks.filter(b => b.accessType === 'preview_available').length,
      external: textbooks.filter(b => b.accessType === 'external_access').length,
      bmdcCore: textbooks.filter(b => b.isBangladeshiCurriculumCore).length
    };
  }, [textbooks]);

  // If reading view is active, render the reader!
  if (readingBook) {
    return (
      <TextbookReaderView
        book={readingBook}
        initialSectionId={readingSectionId}
        onBack={() => setReadingBook(null)}
        onNavigateAcrossBooks={onNavigateAcrossBooks}
      />
    );
  }

  return (
    <div className="tb-library-root space-y-6 pb-20">
      {/* 1. Hero Banner */}
      <div className="tb-hero-banner">
        <div className="tb-hero-pattern" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="tb-badge">
                <GraduationCap className="w-3.5 h-3.5" /> BM&DC Curriculum Reference Library
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Editions
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              MBBS Textbook Library <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                & Multi-Perspective Study Hub
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#C4D4EA] leading-relaxed font-sans">
              Authoritative medical textbook families across Phase 1 to Phase 4. Verified titles, confirmed ISBN-13s, and direct integration with <strong>Across books</strong> for cohesive clinical learning.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 text-xs sm:text-sm text-[#8EACCF]">
              <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                <BookOpen className="w-4 h-4 text-cyan-400" /> {stats.total} Verified Textbooks
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {stats.inAppRead} In-App Full Text
              </span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">
                {stats.preview} Chapter Previews
              </span>
              <span>•</span>
              <span className="text-sky-400 font-semibold">
                {stats.external} Publisher Access
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigateAcrossBooks()}
              className="tb-btn-primary min-h-[44px] !py-2.5 !px-5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <Layers className="w-4 h-4" />
              Study Across Books
            </button>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="tb-btn-secondary min-h-[44px] !py-2.5 !px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              Import & Verify Material
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search & Toolbar */}
      <div className="tb-glass-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="tb-search-box flex-1">
            <Search className="w-4 h-4 tb-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, subject, topic, or ISBN (e.g., Guyton, Robbins, Abdullah, 978-0323...)"
              className="tb-search-input min-h-[44px] text-xs sm:text-sm"
            />
          </div>

          {/* Saved Filter Pill */}
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`tb-pill-tab min-h-[44px] shrink-0 flex items-center gap-2 px-4 py-2 cursor-pointer ${savedOnly ? 'active' : ''}`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={savedOnly ? 'currentColor' : 'none'} />
            <span className="text-xs sm:text-sm font-semibold">Bookmarked ({bookmarks.length})</span>
          </button>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-2 shrink-0">
            Phase:
          </span>
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`tb-pill-tab ${selectedPhase === p.id ? 'active' : ''}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Access Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-2 shrink-0">
            Access:
          </span>
          {[
            { id: 'all', label: 'All Access States' },
            { id: 'read_in_medx', label: 'Read in MEDX' },
            { id: 'preview_available', label: 'Preview Available' },
            { id: 'external_access', label: 'External Access' }
          ].map(acc => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccessType(acc.id)}
              className={`tb-pill-tab ${selectedAccessType === acc.id ? 'active' : ''}`}
            >
              {acc.label}
            </button>
          ))}
        </div>

        {/* Discipline Filter Horizontal Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-xs border-t border-white/5">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-2 shrink-0">
            Discipline:
          </span>
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`tb-pill-tab !text-[11px] !py-1 !px-2.5 ${selectedSubject === s.id ? 'active' : ''}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Showing {filteredBooks.length} of {textbooks.length} Verified Textbooks
        </h2>
        <span className="text-xs text-slate-400">
          Hierarchy: Library → Subject → Book → Section
        </span>
      </div>

      {/* 4. Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="tb-glass-card p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No matching textbooks found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms or clearing the phase/subject filters. You can also import verified materials via the import button.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPhase('all');
              setSelectedSubject('all');
              setSelectedAccessType('all');
              setSavedOnly(false);
            }}
            className="tb-btn-secondary text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map(book => {
            const isBookmarkedBook = bookmarks.some(b => b.bookId === book.id);
            return (
              <article key={book.id} className="tb-glass-card tb-book-card group">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="tb-badge !text-[10px] !py-0.5">
                    {book.phase} • {book.subjectId}
                  </span>

                  {/* Access Status Badge */}
                  {book.accessType === 'read_in_medx' ? (
                    <span className="tb-access-badge tb-access-read">
                      <CheckCircle2 className="w-3 h-3" /> Read in MEDX
                    </span>
                  ) : book.accessType === 'preview_available' ? (
                    <span className="tb-access-badge tb-access-preview">
                      <Eye className="w-3 h-3" /> Preview
                    </span>
                  ) : (
                    <span className="tb-access-badge tb-access-external">
                      <ShieldCheck className="w-3 h-3" /> Publisher
                    </span>
                  )}
                </div>

                {/* Title & Bengali Translation */}
                <h3
                  onClick={() => setDetailBook(book)}
                  className="tb-book-title cursor-pointer group-hover:text-cyan-300 transition-colors"
                >
                  {book.title}
                </h3>
                {book.titleBn && (
                  <p className="text-xs text-cyan-400/80 font-medium mb-1 line-clamp-1">
                    {book.titleBn}
                  </p>
                )}

                {/* Authors */}
                <p className="tb-book-authors line-clamp-1">
                  By {book.authors.join(', ')}
                </p>

                {/* Bibliographic summary */}
                <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                  <p>
                    <strong className="text-slate-300">{book.edition}</strong> ({book.publicationYear}) • {book.publisher}
                  </p>
                  {book.isbn13 && (
                    <p className="font-mono text-slate-500">
                      ISBN: <span className="text-cyan-400/90">{book.isbn13}</span>
                    </p>
                  )}
                </div>

                {/* Connected Across-Books Topic Badge (if present) */}
                {book.connectedTopicIds && book.connectedTopicIds.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() => onNavigateAcrossBooks(book.connectedTopicIds[0])}
                      className="w-full text-left p-2 rounded-lg bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between gap-2 transition-colors"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Layers className="w-3.5 h-3.5 shrink-0" />
                        <span className="capitalize truncate">
                          Across Books: {book.connectedTopicIds[0].replace(/-/g, ' ')}
                        </span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="tb-book-footer">
                  <button
                    onClick={() => setDetailBook(book)}
                    className="tb-btn-link text-xs flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    <Info className="w-3.5 h-3.5" /> Details
                  </button>

                  <div className="flex items-center gap-2">
                    {book.accessType === 'read_in_medx' ? (
                      <button
                        onClick={() => {
                          setReadingBook(book);
                          setReadingSectionId(undefined);
                        }}
                        className="tb-btn-primary text-xs !py-1.5 !px-3"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Read
                      </button>
                    ) : book.accessType === 'preview_available' ? (
                      <button
                        onClick={() => {
                          setReadingBook(book);
                          setReadingSectionId(undefined);
                        }}
                        className="tb-btn-primary text-xs !py-1.5 !px-3"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                    ) : book.officialPublisherUrl ? (
                      <a
                        href={book.officialPublisherUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tb-btn-secondary text-xs !py-1.5 !px-3"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Publisher
                      </a>
                    ) : (
                      <button
                        onClick={() => setDetailBook(book)}
                        className="tb-btn-secondary text-xs !py-1.5 !px-3"
                      >
                        Citations
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {detailBook && (
        <TextbookDetailModal
          book={detailBook}
          onClose={() => setDetailBook(null)}
          onRead={(bookId, sectionId) => {
            setReadingBook(detailBook);
            setReadingSectionId(sectionId);
            setDetailBook(null);
          }}
          onNavigateAcrossBooks={onNavigateAcrossBooks}
        />
      )}

      {/* Import & Verification Modal */}
      {isImportModalOpen && (
        <TextbookImportModal
          onClose={() => setIsImportModalOpen(false)}
          onImportComplete={() => loadCatalog()}
        />
      )}
    </div>
  );
};
