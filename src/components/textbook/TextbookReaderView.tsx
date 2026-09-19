import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookOpen, 
  Check, 
  ExternalLink, 
  Eye, 
  FileText, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Settings2, 
  ShieldCheck, 
  Type, 
  ChevronRight,
  ChevronLeft,
  Share2,
  Sparkles
} from 'lucide-react';
import { TextbookRecord, TextbookSection } from '../../types/textbook';
import { FrontendTextbookService, ReaderPreferences } from '../../services/textbookService';

interface Props {
  book: TextbookRecord;
  initialSectionId?: string;
  onBack: () => void;
  onNavigateAcrossBooks: (topicId: string) => void;
}

export const TextbookReaderView: React.FC<Props> = ({
  book,
  initialSectionId,
  onBack,
  onNavigateAcrossBooks
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    if (initialSectionId && book.tableOfContents.some(s => s.id === initialSectionId)) {
      return initialSectionId;
    }
    return book.tableOfContents[0]?.id || '';
  });

  const [prefs, setPrefs] = useState<ReaderPreferences>(FrontendTextbookService.getReaderPrefs());
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const activeSection: TextbookSection | undefined = 
    book.tableOfContents.find(s => s.id === activeSectionId) || book.tableOfContents[0];

  const currentSectionIndex = book.tableOfContents.findIndex(s => s.id === activeSectionId);

  // Sync notes and bookmarks when section changes
  useEffect(() => {
    if (!activeSection) return;
    setIsBookmarked(FrontendTextbookService.isBookmarked(book.id, activeSection.id));
    const existingNotes = FrontendTextbookService.getNotes(book.id, activeSection.id);
    setNoteText(existingNotes[0]?.noteText || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionId, book.id]);

  const handleToggleBookmark = () => {
    if (!activeSection) return;
    const nowSaved = FrontendTextbookService.toggleBookmark({
      bookId: book.id,
      sectionId: activeSection.id,
      bookTitle: book.title,
      sectionTitle: activeSection.title,
      subjectId: book.subjectId,
      pageIndex: activeSection.pageIndex,
      printedPageLabel: activeSection.printedPageLabel
    });
    setIsBookmarked(nowSaved);
  };

  const handleSaveNote = () => {
    if (!activeSection) return;
    FrontendTextbookService.saveNote({
      bookId: book.id,
      sectionId: activeSection.id,
      bookTitle: book.title,
      sectionTitle: activeSection.title,
      noteText
    });
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const updatePref = (patch: Partial<ReaderPreferences>) => {
    const updated = FrontendTextbookService.saveReaderPrefs(patch);
    setPrefs(updated);
  };

  const themeClass = 
    prefs.theme === 'dark' ? 'tb-theme-dark' :
    prefs.theme === 'high-contrast' ? 'tb-theme-high-contrast' :
    prefs.theme === 'sepia' ? 'tb-theme-sepia' :
    'tb-theme-glass';

  const fontClass = prefs.fontFamily === 'serif' ? 'tb-serif-font' : 'tb-sans-font';

  // Render markdown text formatting cleanly
  const renderStudyText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={idx} />;

      if (trimmed.startsWith('### ')) {
        return <h3 key={idx}>{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('#### ')) {
        return <h4 key={idx}>{trimmed.replace('#### ', '')}</h4>;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc">
            {renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''))}
          </li>
        );
      }
      if (/^\d+\.\s+/.test(trimmed)) {
        return (
          <li key={idx} className="ml-4 list-decimal">
            {renderInlineMarkdown(trimmed.replace(/^\d+\.\s+/, ''))}
          </li>
        );
      }
      return <p key={idx}>{renderInlineMarkdown(line)}</p>;
    });
  };

  const renderInlineMarkdown = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\$[^\$]+\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="text-cyan-200 italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        return <code key={index} className="px-1 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-mono text-xs">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className={`tb-reader-container ${prefs.focusMode ? 'tb-focus-mode' : 'pb-16'}`}>
      {/* Reader Sticky Header Bar */}
      <header className="sticky top-0 z-30 mb-6 px-4 py-3 bg-[#040d21]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
        {/* Left: Back and Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Library</span>
          </button>

          <span className="w-px h-4 bg-white/20 hidden sm:inline" />

          <div className="min-w-0 truncate">
            <div className="flex items-center gap-2">
              <span className="tb-badge !text-[10px] !py-0.5">{book.phase}</span>
              <span className="text-xs text-slate-400 font-medium truncate">{book.title}</span>
            </div>
            {activeSection && (
              <h1 className="text-sm font-bold text-white truncate mt-0.5">
                {activeSection.title}
              </h1>
            )}
          </div>
        </div>

        {/* Right: Controls & Preferences */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Table of Contents Button */}
          <button
            onClick={() => setShowToc(!showToc)}
            aria-label="Table of Contents"
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showToc ? 'bg-[#08AFC1] text-[#040d21]' : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Contents</span>
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            aria-label="Personal Notes"
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showNotes ? 'bg-[#08AFC1] text-[#040d21]' : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Notes</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Section'}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              isBookmarked ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Typography Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Reading Typography Settings"
            className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Focus Mode Button */}
          <button
            onClick={() => updatePref({ focusMode: !prefs.focusMode })}
            title={prefs.focusMode ? 'Exit Focus Mode' : 'Focus Reading Mode'}
            className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {prefs.focusMode ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Settings Dropdown Panel */}
      {showSettings && (
        <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-[#081a38] border border-cyan-500/30 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Reading Preferences
            </span>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white text-xs">
              Done
            </button>
          </div>

          {/* Font Family */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-300">Typeface</span>
            <div className="flex gap-2">
              <button
                onClick={() => updatePref({ fontFamily: 'sans' })}
                className={`px-3 py-1 rounded-lg text-xs font-medium font-sans ${
                  prefs.fontFamily === 'sans' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                }`}
              >
                Sans-Serif (Inter)
              </button>
              <button
                onClick={() => updatePref({ fontFamily: 'serif' })}
                className={`px-3 py-1 rounded-lg text-xs font-medium font-serif ${
                  prefs.fontFamily === 'serif' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                }`}
              >
                Serif (Merriweather)
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-300">Size ({prefs.fontSize}px)</span>
            <div className="flex items-center gap-2">
              <button
                disabled={prefs.fontSize <= 14}
                onClick={() => updatePref({ fontSize: Math.max(14, prefs.fontSize - 1) })}
                className="w-7 h-7 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-30 text-xs font-bold"
              >
                A-
              </button>
              <button
                disabled={prefs.fontSize >= 22}
                onClick={() => updatePref({ fontSize: Math.min(22, prefs.fontSize + 1) })}
                className="w-7 h-7 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-30 text-xs font-bold"
              >
                A+
              </button>
            </div>
          </div>

          {/* Theme Palette */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-300">Theme</span>
            <div className="flex gap-1.5">
              {[
                { id: 'glass', label: 'Glass' },
                { id: 'dark', label: 'Dark' },
                { id: 'high-contrast', label: 'OLED' },
                { id: 'sepia', label: 'Warm' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => updatePref({ theme: t.id as any })}
                  className={`px-2.5 py-1 rounded-lg text-xs ${
                    prefs.theme === t.id ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left TOC Drawer (optional), Center Reading Canvas, Right Notes Drawer (optional) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-2 sm:px-4">
        {/* Table of Contents Column (when toggled on desktop) */}
        {showToc && (
          <aside className="lg:col-span-3 space-y-2 p-4 rounded-xl bg-[#081a38]/90 border border-white/10 max-h-[80vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Table of Contents
              </span>
              <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>
            <div className="space-y-1">
              {book.tableOfContents.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setShowToc(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 ${
                    activeSectionId === section.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">
                    {idx + 1}. {section.title}
                  </span>
                  <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                    p.{section.printedPageLabel}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Center Reading Canvas */}
        <main className={`${showToc && showNotes ? 'lg:col-span-6' : showToc || showNotes ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          <div
            className={`tb-reader-canvas ${themeClass} ${fontClass}`}
            style={{ fontSize: `${prefs.fontSize}px` }}
          >
            {/* Dual Page Index & Access State Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                {book.accessType === 'read_in_medx' && (
                  <span className="tb-access-badge tb-access-read">
                    <Check className="w-3 h-3" /> Full Text Licensed in MEDX
                  </span>
                )}
                {book.accessType === 'preview_available' && (
                  <span className="tb-access-badge tb-access-preview">
                    <Eye className="w-3 h-3" /> Chapter Preview (Limited)
                  </span>
                )}
                {book.accessType === 'external_access' && (
                  <span className="tb-access-badge tb-access-external">
                    <ShieldCheck className="w-3 h-3" /> Verified Publisher Access Only
                  </span>
                )}
              </div>

              {activeSection && (
                <div className="flex items-center gap-2 font-mono text-slate-400">
                  <span className="tb-page-badge" title="Original printed book page">
                    Book Page: <strong>{activeSection.printedPageLabel}</strong>
                  </span>
                  <span className="tb-page-badge" title="Digital document page index">
                    Doc Index: <strong>#{activeSection.pageIndex}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* OCR Notice if applicable */}
            {activeSection?.isFlaggedLowConfidence && (
              <div className="mb-6 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span>Notice: This section was transcribed from a permitted scanned source with {activeSection.ocrConfidence}% OCR confidence. Flagged for faculty review.</span>
              </div>
            )}

            {/* Chapter Header */}
            {activeSection && (
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
                  {activeSection.title}
                </h2>
                {activeSection.titleBn && (
                  <p className="text-sm font-semibold text-cyan-300 mt-1">
                    {activeSection.titleBn}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span>{book.edition}</span>
                  <span>•</span>
                  <span>{book.publisher}</span>
                  {activeSection.readTimeMinutes && (
                    <>
                      <span>•</span>
                      <span>~{activeSection.readTimeMinutes} min read</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Main Reading Body */}
            <div className="tb-reader-body leading-relaxed">
              {book.accessType === 'read_in_medx' && activeSection?.content ? (
                renderStudyText(activeSection.content)
              ) : book.accessType === 'preview_available' && activeSection?.content ? (
                <div>
                  <div className="mb-6 p-4 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-slate-300">
                    <p className="font-semibold text-cyan-300 mb-1">Authorized Sample Preview:</p>
                    <p>This chapter sample is provided for MBBS curriculum evaluation under educational fair practice. Complete text is available via {book.publisher}.</p>
                  </div>
                  {renderStudyText(activeSection.content)}
                </div>
              ) : (
                /* External commercial textbook fallback with rich syllabus outline & publisher portal */
                <div className="py-6 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#04122b]/90 border border-cyan-500/30 text-center space-y-4">
                    <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Commercial Copyright Protected</h3>
                      <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                        Under copyright law and BM&DC standards, full-text reproduction of <strong>{book.title}</strong> is reserved by {book.publisher}. MEDX connects verified citations and learning points without copyright infringement.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      {book.officialPublisherUrl && (
                        <a
                          href={book.officialPublisherUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tb-btn-primary"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Access on {book.publisher} Portal
                        </a>
                      )}
                      {activeSection?.mappedTopicIds?.[0] && (
                        <button
                          onClick={() => onNavigateAcrossBooks(activeSection.mappedTopicIds![0])}
                          className="tb-btn-secondary"
                        >
                          <Layers className="w-4 h-4 text-cyan-400" />
                          Study Connected Lesson in Across Books
                        </button>
                      )}
                    </div>
                  </div>

                  {activeSection?.summary && (
                    <div className="tb-clinical-box">
                      <h5>Section Summary & Learning Objectives</h5>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        {activeSection.summary}
                      </p>
                    </div>
                  )}

                  {book.bmdcCurriculumRelevance && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-2">
                      <h5 className="font-bold text-emerald-300 uppercase tracking-wide">
                        BM&DC Syllabus Alignment
                      </h5>
                      <p className="leading-relaxed">{book.bmdcCurriculumRelevance}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Study Across Books CTA Banner (if section is mapped to a topic) */}
            {activeSection?.mappedTopicIds && activeSection.mappedTopicIds.length > 0 && (
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-950/70 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Study This Topic Across Textbooks</h4>
                    <p className="text-xs text-slate-300">
                      Connect this reading with anatomy, physiology, pathology, and pharmacology perspectives.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateAcrossBooks(activeSection.mappedTopicIds![0])}
                  className="tb-btn-primary shrink-0 text-xs !py-2 !px-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Open Across Books
                </button>
              </div>
            )}

            {/* Bottom Section Navigator */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                disabled={currentSectionIndex <= 0}
                onClick={() => {
                  if (currentSectionIndex > 0) {
                    setActiveSectionId(book.tableOfContents[currentSectionIndex - 1].id);
                  }
                }}
                className="tb-btn-secondary text-xs disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Section
              </button>

              <span className="text-xs text-slate-400 font-medium">
                {currentSectionIndex + 1} of {book.tableOfContents.length} sections
              </span>

              <button
                disabled={currentSectionIndex >= book.tableOfContents.length - 1}
                onClick={() => {
                  if (currentSectionIndex < book.tableOfContents.length - 1) {
                    setActiveSectionId(book.tableOfContents[currentSectionIndex + 1].id);
                  }
                }}
                className="tb-btn-secondary text-xs disabled:opacity-30 disabled:pointer-events-none"
              >
                Next Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Right Personal Notes Drawer */}
        {showNotes && (
          <aside className="lg:col-span-3 space-y-3 p-4 rounded-xl bg-[#081a38]/90 border border-white/10 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Personal Notes
              </span>
              <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Private study notes for this section. Stored securely on your device.
            </p>

            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Write your clinical connections, exam viva points, or questions..."
              rows={10}
              className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                {noteSavedFeedback ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Saved!
                  </span>
                ) : (
                  `${noteText.length} chars`
                )}
              </span>
              <button
                onClick={handleSaveNote}
                className="tb-btn-primary text-xs !py-1.5 !px-3"
              >
                Save Note
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
