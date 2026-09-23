import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Layers,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  Type,
  X,
  ZoomIn,
} from 'lucide-react';
import { TextbookRecord, TextbookSection } from '../../types/textbook';
import { FrontendTextbookService } from '../../services/textbookService';
import './whiteLiquidReader.css';

interface Props {
  book: TextbookRecord;
  initialSectionId?: string;
  onBack: () => void;
  onNavigateAcrossBooks: (topicId: string) => void;
}

interface LightboxState {
  isOpen: boolean;
  src: string;
  alt: string;
  caption?: string;
}

export const TextbookReaderView: React.FC<Props> = ({
  book,
  initialSectionId,
  onBack,
  onNavigateAcrossBooks
}) => {
  // ── Chapter / Section State ──
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    if (initialSectionId && book.tableOfContents.some(s => s.id === initialSectionId)) {
      return initialSectionId;
    }
    return book.tableOfContents[0]?.id || '';
  });

  const activeSection: TextbookSection | undefined =
    book.tableOfContents.find(s => s.id === activeSectionId) || book.tableOfContents[0];

  const currentSectionIndex = book.tableOfContents.findIndex(s => s.id === activeSectionId);

  // ── Reader UI Controls State ──
  const [fontSize, setFontSize] = useState<number>(18); // Default 18px desktop
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Desktop sidebar
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false); // Mobile drawer
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);

  // ── Bookmarking & Notes State ──
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);

  // ── Reading Progress & Scroll Position ──
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const readingPanelRef = useRef<HTMLDivElement>(null);

  // ── Image Zoom / Lightbox State ──
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: '',
    alt: '',
    caption: ''
  });

  // ── Sync Notes & Bookmarks when Chapter changes ──
  useEffect(() => {
    if (!activeSection) return;
    setIsBookmarked(FrontendTextbookService.isBookmarked(book.id, activeSection.id));
    const existingNotes = FrontendTextbookService.getNotes(book.id, activeSection.id);
    setNoteText(existingNotes[0]?.noteText || '');
  }, [activeSectionId, book.id]);

  // ── Restore Saved Reading Position ──
  useEffect(() => {
    if (!activeSection) return;
    const storageKey = `medx_scroll_pos_${book.id}_${activeSection.id}`;
    const savedPos = localStorage.getItem(storageKey);
    if (savedPos) {
      const y = parseInt(savedPos, 10);
      if (!isNaN(y) && y > 40) {
        const timer = setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSectionId, book.id]);

  // ── Track Scroll Reading Progress & Save Position ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setReadingProgress(progress);
      }
      if (activeSection) {
        const storageKey = `medx_scroll_pos_${book.id}_${activeSection.id}`;
        localStorage.setItem(storageKey, String(Math.round(scrollTop)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [book.id, activeSectionId]);

  // ── Keyboard Listener for Lightbox Close (Escape) ──
  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox({ isOpen: false, src: '', alt: '', caption: '' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen]);

  // ── Handlers ──
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

  const toggleFocusMode = () => {
    const currentY = window.scrollY;
    setIsFocusMode(prev => !prev);
    setTimeout(() => {
      window.scrollTo({ top: currentY, behavior: 'auto' });
    }, 40);
  };

  const openLightbox = (src: string, alt: string, caption?: string) => {
    setLightbox({ isOpen: true, src, alt, caption: caption || alt });
  };

  const handleSelectChapter = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setIsMobileDrawerOpen(false);
  };

  // ── Medical Markdown & Table Parsing Engine ──
  const renderFormattedContent = (content: string) => {
    // Check if content has markdown tables
    const tableRegex = /\|(.+)\|[\r\n]+\|[-:| ]+\|[\r\n]+((?:\|.+[\r\n]*)+)/;
    const hasTable = tableRegex.test(content);

    if (hasTable) {
      // Split by table
      const match = content.match(tableRegex);
      if (match) {
        const fullTable = match[0];
        const beforeTable = content.slice(0, match.index);
        const afterTable = content.slice((match.index || 0) + fullTable.length);

        return (
          <>
            {renderTextBlocks(beforeTable)}
            {renderMarkdownTable(fullTable)}
            {renderTextBlocks(afterTable)}
          </>
        );
      }
    }

    return renderTextBlocks(content);
  };

  const renderMarkdownTable = (tableMarkdown: string) => {
    const lines = tableMarkdown.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 3) return null;

    const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
    const rowLines = lines.slice(2);

    return (
      <div className="liquid-table-container">
        <table className="liquid-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLines.map((rowStr, rIdx) => {
              const cells = rowStr.split('|').slice(1, -1).map(c => c.trim());
              return (
                <tr key={rIdx}>
                  {cells.map((cell, cIdx) => (
                    <td key={cIdx}>{renderInline(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTextBlocks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={idx} />;

      // Markdown image: ![caption](url)
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const caption = imgMatch[1];
        const src = imgMatch[2];
        return (
          <figure key={idx} className="liquid-image-figure">
            <img
              src={src}
              alt={caption}
              onClick={() => openLightbox(src, caption)}
              title="Click to view full diagram"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(src, caption); }}
            />
            {caption && <figcaption className="liquid-image-caption">{caption}</figcaption>}
          </figure>
        );
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx}>{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('#### ')) {
        return <h4 key={idx}>{trimmed.replace('#### ', '')}</h4>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx}>{trimmed.replace('## ', '')}</h2>;
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc">
            {renderInline(trimmed.replace(/^[-*]\s+/, ''))}
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(trimmed)) {
        return (
          <li key={idx} className="ml-4 list-decimal">
            {renderInline(trimmed.replace(/^\d+\.\s+/, ''))}
          </li>
        );
      }

      // Medical callout syntax: > [!NOTE] or > [!WARNING]
      if (trimmed.startsWith('> [!NOTE]') || trimmed.startsWith('> [!INFO]')) {
        return (
          <div key={idx} className="liquid-callout-info">
            {renderInline(trimmed.replace(/^>\s*\[!(NOTE|INFO)\]\s*/i, ''))}
          </div>
        );
      }
      if (trimmed.startsWith('> [!WARNING]') || trimmed.startsWith('> [!CAUTION]')) {
        return (
          <div key={idx} className="liquid-callout-warning">
            {renderInline(trimmed.replace(/^>\s*\[!(WARNING|CAUTION)\]\s*/i, ''))}
          </div>
        );
      }
      if (trimmed.startsWith('> [!CLINICAL]') || trimmed.startsWith('> [!TIP]')) {
        return (
          <div key={idx} className="liquid-callout-clinical">
            {renderInline(trimmed.replace(/^>\s*\[!(CLINICAL|TIP)\]\s*/i, ''))}
          </div>
        );
      }

      return <p key={idx}>{renderInline(line)}</p>;
    });
  };

  const renderInline = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\$[^\$]+\$|\[[^\]]+\]\([^\)]+\))/g);
    return parts.map((part, index) => {
      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-[#0F172A] font-bold">{part.slice(2, -2)}</strong>;
      }
      // Italic
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="italic text-[#334155]">{part.slice(1, -1)}</em>;
      }
      // Code / Medical notation
      if (part.startsWith('$') && part.endsWith('$')) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      // Markdown link: [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="medx-white-liquid-reader">
      {/* ── 1. Liquid Ambient Gradient Background Shapes ── */}
      <div className="liquid-bg-shape liquid-shape-1" aria-hidden="true" />
      <div className="liquid-bg-shape liquid-shape-2" aria-hidden="true" />
      <div className="liquid-bg-shape liquid-shape-3" aria-hidden="true" />

      {/* ── 4. Slim Sticky Glass Toolbar ── */}
      <header className="liquid-glass-toolbar">
        {/* Real-time reading progress bar */}
        <div
          className="h-[3px] bg-[#2563EB] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
          role="progressbar"
          aria-valuenow={readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Left: Back Button & Chapter Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBack}
              aria-label="Back to Library"
              className="p-2 rounded-xl text-[#334155] hover:text-[#0F172A] hover:bg-slate-100/80 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Library</span>
            </button>

            <span className="w-px h-4 bg-slate-200 hidden sm:inline" />

            {/* Chapter Sidebar / Drawer Toggle */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileDrawerOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              aria-label="Toggle Chapter Navigation"
              className="p-2 rounded-xl text-xs font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-100/80 flex items-center gap-1.5 transition-colors shrink-0"
            >
              <BookOpen className="w-4 h-4 text-[#2563EB]" />
              <span className="hidden md:inline">Chapters</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 font-mono">
                {currentSectionIndex + 1}/{book.tableOfContents.length}
              </span>
            </button>

            {/* Current Chapter Title */}
            {activeSection && (
              <div className="min-w-0 truncate">
                <h1 className="text-sm font-semibold text-[#0F172A] truncate" title={activeSection.title}>
                  {activeSection.title}
                </h1>
              </div>
            )}
          </div>

          {/* Right: Controls (Bookmark, Text Size, Notes, Focus Mode) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Bookmark Button */}
            <button
              onClick={handleToggleBookmark}
              aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark this chapter'}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isBookmarked
                  ? 'bg-blue-50 text-[#2563EB] border border-blue-200 shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100/80'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              <span className="hidden lg:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            {/* Desktop Text Size Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 rounded-xl p-1 border border-slate-200/60">
              <button
                disabled={fontSize <= 15}
                onClick={() => setFontSize(prev => Math.max(15, prev - 1))}
                aria-label="Decrease text size"
                className="w-7 h-7 rounded-lg text-xs font-bold text-[#334155] hover:bg-white disabled:opacity-30 transition-all flex items-center justify-center"
              >
                A-
              </button>
              <span className="text-[11px] font-mono font-medium text-[#64748B] px-1 min-w-[28px] text-center">
                {fontSize}px
              </span>
              <button
                disabled={fontSize >= 24}
                onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                aria-label="Increase text size"
                className="w-7 h-7 rounded-lg text-xs font-bold text-[#334155] hover:bg-white disabled:opacity-30 transition-all flex items-center justify-center"
              >
                A+
              </button>
            </div>

            {/* Personal Notes Toggle */}
            <button
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              aria-label="Personal Notes"
              className={`p-2 rounded-xl text-xs font-semibold hidden md:flex items-center gap-1.5 transition-all ${
                showNotesDrawer
                  ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100/80'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Notes</span>
            </button>

            {/* Focus Mode Button */}
            <button
              onClick={toggleFocusMode}
              aria-label={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
              title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isFocusMode
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100/80'
              }`}
            >
              {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden xl:inline">{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>

            {/* Small Screen Secondary Menu */}
            <div className="relative sm:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="More reading options"
                className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100/80"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMobileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 p-3 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-[#0F172A]">Text Size</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setFontSize(prev => Math.max(15, prev - 1))}
                        className="w-6 h-6 rounded bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono">{fontSize}px</span>
                      <button
                        onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                        className="w-6 h-6 rounded bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowNotesDrawer(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left text-xs text-slate-700 font-medium py-1.5 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Personal Notes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── 6. Focus Mode Obvious Exit Floating Bar ── */}
      {isFocusMode && (
        <div className="liquid-focus-bar">
          <button
            onClick={toggleFocusMode}
            className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Focus Mode</span>
          </button>
        </div>
      )}

      {/* ── Main Layout: Sidebar & Centered Glass Reading Panel ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-10 relative z-10 flex gap-8 justify-center">
        {/* ── 5. Collapsible Desktop Chapter Sidebar ── */}
        {!isFocusMode && isSidebarOpen && (
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-3 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <div className="liquid-glass-sidebar p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Table of Contents
                </span>
                <span className="text-xs font-mono text-[#2563EB] font-semibold">
                  {book.tableOfContents.length} Chapters
                </span>
              </div>

              <nav className="space-y-1" aria-label="Book chapters">
                {book.tableOfContents.map((section, idx) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSelectChapter(section.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                        isActive
                          ? 'bg-blue-50/90 text-[#2563EB] font-bold border-l-4 border-[#2563EB] shadow-sm'
                          : 'text-[#334155] hover:bg-slate-100/70 hover:text-[#0F172A]'
                      }`}
                    >
                      <div className="min-w-0 pr-1">
                        <span className="block truncate">
                          {String(idx + 1).padStart(2, '0')}. {section.title}
                        </span>
                        {section.titleBn && (
                          <span className="block text-[11px] font-normal text-slate-400 truncate mt-0.5">
                            {section.titleBn}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 pt-0.5">
                        p.{section.printedPageLabel}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        {/* ── 2. Glass Reading Panel ── */}
        <main
          ref={readingPanelRef}
          className="liquid-glass-panel"
          style={{ fontSize: `${fontSize}px` }}
        >
          {/* Dual Page Index & Provenance Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-6 border-b border-slate-200/80 text-xs">
            <div className="flex items-center gap-2">
              {book.accessType === 'read_in_medx' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Full Text Licensed in MEDX
                </span>
              )}
              {book.accessType === 'preview_available' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  <Eye className="w-3.5 h-3.5" /> Chapter Preview (Limited)
                </span>
              )}
              {book.accessType === 'external_access' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Publisher Outline
                </span>
              )}
            </div>

            {activeSection && (
              <div className="flex items-center gap-2 font-mono text-[#64748B]">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700" title="Original printed book page">
                  Page: <strong>{activeSection.printedPageLabel}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700" title="Digital document index">
                  Index: <strong>#{activeSection.pageIndex}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Chapter Heading Banner */}
          {activeSection && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-1.5 uppercase tracking-wider">
                <span>{book.phase}</span>
                <span>•</span>
                <span>{book.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {activeSection.title}
              </h1>
              {activeSection.titleBn && (
                <p className="text-base font-semibold text-[#475569] mt-1.5 font-['Noto_Sans_Bengali']">
                  {activeSection.titleBn}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#64748B]">
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

          {/* ── 3. Comfortable Reading Body Content ── */}
          <div className="liquid-reading-body">
            {book.accessType === 'read_in_medx' && activeSection?.content ? (
              renderFormattedContent(activeSection.content)
            ) : book.accessType === 'preview_available' && activeSection?.content ? (
              <div>
                <div className="liquid-callout-info mb-6">
                  <p className="font-bold text-[#1E3A8A] mb-1">Authorized Sample Preview:</p>
                  <p className="text-sm">
                    This chapter sample is provided for MBBS curriculum evaluation under educational fair practice. Complete text is available via {book.publisher}.
                  </p>
                </div>
                {renderFormattedContent(activeSection.content)}
              </div>
            ) : (
              /* External Copyright Protected Textbook View */
              <div className="py-6 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  <ShieldCheck className="w-12 h-12 text-[#2563EB] mx-auto" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Commercial Copyright Protected</h3>
                    <p className="text-sm text-[#475569] max-w-md mx-auto mt-1 leading-relaxed">
                      Under copyright law and BM&DC standards, full-text reproduction of <strong>{book.title}</strong> is reserved by {book.publisher}. MEDX connects verified citations and learning points without copyright infringement.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    {book.officialPublisherUrl && (
                      <a
                        href={book.officialPublisherUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Access on {book.publisher} Portal
                      </a>
                    )}
                    {activeSection?.mappedTopicIds?.[0] && (
                      <button
                        onClick={() => onNavigateAcrossBooks(activeSection.mappedTopicIds![0])}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#334155] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Layers className="w-4 h-4 text-[#2563EB]" />
                        Study Connected Lesson in Across Books
                      </button>
                    )}
                  </div>
                </div>

                {activeSection?.summary && (
                  <div className="liquid-callout-info">
                    <h5 className="font-bold text-[#1E3A8A] text-sm mb-1">Section Summary & Learning Objectives</h5>
                    <p className="text-sm leading-relaxed">{activeSection.summary}</p>
                  </div>
                )}

                {book.bmdcCurriculumRelevance && (
                  <div className="liquid-callout-clinical">
                    <h5 className="font-bold text-[#065F46] text-sm mb-1">BM&DC Syllabus Alignment</h5>
                    <p className="text-sm leading-relaxed">{book.bmdcCurriculumRelevance}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Across Books CTA Banner */}
          {activeSection?.mappedTopicIds && activeSection.mappedTopicIds.length > 0 && (
            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Study This Topic Across Textbooks</h4>
                  <p className="text-xs text-[#64748B]">
                    Cross-reference this chapter with anatomy, physiology, pathology, and pharmacology perspectives.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateAcrossBooks(activeSection.mappedTopicIds![0])}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Across Books</span>
              </button>
            </div>
          )}

          {/* ── 5. Chapter Navigation (Previous / Next Chapter Buttons) ── */}
          <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              disabled={currentSectionIndex <= 0}
              onClick={() => {
                if (currentSectionIndex > 0) {
                  setActiveSectionId(book.tableOfContents[currentSectionIndex - 1].id);
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#334155] hover:bg-slate-50 hover:text-[#0F172A] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <span className="text-xs text-[#64748B] font-medium font-mono">
              Chapter {currentSectionIndex + 1} of {book.tableOfContents.length}
            </span>

            <button
              disabled={currentSectionIndex >= book.tableOfContents.length - 1}
              onClick={() => {
                if (currentSectionIndex < book.tableOfContents.length - 1) {
                  setActiveSectionId(book.tableOfContents[currentSectionIndex + 1].id);
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#334155] hover:bg-slate-50 hover:text-[#0F172A] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* ── Personal Notes Drawer (Right Sidebar on Desktop) ── */}
        {showNotesDrawer && !isFocusMode && (
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-3 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="liquid-glass-sidebar p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Personal Notes
                </span>
                <button
                  onClick={() => setShowNotesDrawer(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#64748B]">
                Private study notes for this chapter. Stored securely on your device.
              </p>

              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Write your clinical connections, exam viva points, or questions..."
                rows={9}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#64748B]">
                  {noteSavedFeedback ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  ) : (
                    `${noteText.length} characters`
                  )}
                </span>
                <button
                  onClick={handleSaveNote}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
                >
                  Save Note
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── 5. Mobile Chapter Drawer (Modal Sheet) ── */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-[82vw] max-w-sm bg-white p-5 shadow-2xl flex flex-col z-10 animate-slideRight">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Table of Contents</h3>
                <p className="text-[11px] text-[#64748B] truncate max-w-[220px]">{book.title}</p>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 space-y-1" aria-label="Mobile chapter drawer">
              {book.tableOfContents.map((section, idx) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSelectChapter(section.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-blue-50 text-[#2563EB] font-bold border-l-4 border-[#2563EB]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <span className="block font-medium truncate">
                        {String(idx + 1).padStart(2, '0')}. {section.title}
                      </span>
                      {section.titleBn && (
                        <span className="block text-[11px] text-slate-400 truncate mt-0.5">
                          {section.titleBn}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      p.{section.printedPageLabel}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* ── 7. Image & Diagram Tap-to-Enlarge Lightbox Modal ── */}
      {lightbox.isOpen && (
        <div
          className="liquid-lightbox-overlay"
          onClick={() => setLightbox({ isOpen: false, src: '', alt: '', caption: '' })}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged medical diagram"
        >
          <div
            className="liquid-lightbox-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightbox({ isOpen: false, src: '', alt: '', caption: '' })}
              aria-label="Close enlarged view"
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />

            {/* Caption */}
            {lightbox.caption && (
              <p className="liquid-lightbox-caption">
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
