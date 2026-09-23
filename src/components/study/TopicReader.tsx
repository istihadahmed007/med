import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Clock,
  Share2,
  Printer,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  GraduationCap,
  StickyNote,
  Pill,
} from 'lucide-react';
import { StudyService } from '../../services/studyService';
import { CrossLinkService } from '../../services/crossLinkService';
import { SECTION_TYPE_LABELS, StudySectionType } from '../../types/study';
import './studyMaterials.css';

interface TopicReaderProps {
  topicId: string;
  onBack: () => void;
  onNavigateToSubjects: () => void;
  onNavigateToTopic?: (topicId: string, slug: string) => void;
}

// Standard medical textbook sections
const STANDARD_SECTIONS: { type: StudySectionType; title: string }[] = [
  { type: 'overview', title: 'Overview' },
  { type: 'definition', title: 'Definition' },
  { type: 'classification', title: 'Classification' },
  { type: 'pathophysiology', title: 'Pathophysiology' },
  { type: 'etiology', title: 'Etiology' },
  { type: 'clinical_features', title: 'Clinical Features' },
  { type: 'diagnosis', title: 'Diagnosis' },
  { type: 'investigations', title: 'Investigations' },
  { type: 'management', title: 'Management' },
  { type: 'complications', title: 'Complications' },
  { type: 'prevention', title: 'Prevention' },
  { type: 'key_points', title: 'Key Points' },
  { type: 'exam_notes', title: 'Exam Notes' },
  { type: 'references', title: 'References' },
];

export const TopicReader: React.FC<TopicReaderProps> = ({
  topicId,
  onBack,
  onNavigateToSubjects,
  onNavigateToTopic,
}) => {
  const topicData = useMemo(() => StudyService.getTopicById(topicId), [topicId]);
  const [isBookmarked, setIsBookmarked] = useState(() => StudyService.isBookmarked(topicId));
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showMobileToc, setShowMobileToc] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());

  // Track reading progress
  useEffect(() => {
    startTimeRef.current = Date.now();

    const handleScroll = () => {
      if (!contentRef.current || !topicData) return;
      const el = contentRef.current;
      const scrollTop = window.scrollY - el.offsetTop;
      const scrollHeight = el.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100));
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);

      StudyService.updateReadingProgress(
        topicId,
        topicData.subject.id,
        topicData.topic.title,
        pct,
        elapsed
      );
    };

    const throttled = throttle(handleScroll, 2000);
    window.addEventListener('scroll', throttled);

    // Add to history
    if (topicData) {
      StudyService.addToHistory({
        type: 'topic',
        targetId: topicId,
        title: topicData.topic.title,
        subtitle: `${topicData.subject.name} → ${topicData.unit.title}`,
      });
      document.title = `${topicData.topic.title} — ${topicData.subject.name} — MEDX`;
    }

    return () => {
      window.removeEventListener('scroll', throttled);
      // Save final progress on unmount
      handleScroll();
    };
  }, [topicId, topicData]);

  const handleBookmark = useCallback(() => {
    if (!topicData) return;
    const result = StudyService.toggleBookmark({
      type: 'topic',
      targetId: topicId,
      title: topicData.topic.title,
      subtitle: `${topicData.subject.name} → ${topicData.unit.title}`,
    });
    setIsBookmarked(result);
  }, [topicId, topicData]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: topicData ? `${topicData.topic.title} — MEDX` : 'MEDX Study Material',
          url,
        });
      } catch {}
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  if (!topicData) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="study-no-content">
          <div className="icon">📚</div>
          <p className="mb-3">Topic not found.</p>
          <button onClick={onBack} className="text-[#38bdf8] hover:underline text-sm font-sans">
            ← Back to subject
          </button>
        </div>
      </div>
    );
  }

  const { topic, unit, subject } = topicData;

  // Find related topics in the same unit
  const relatedTopics = unit.topics.filter(t => t.id !== topicId);
  const relatedDrugs = useMemo(() => CrossLinkService.getRelatedDrugsForTopic(topic.title), [topic.title]);

  return (
    <div className="flex gap-8 max-w-7xl mx-auto relative">
      {/* Main Content */}
      <article className="flex-1 min-w-0" ref={contentRef}>
        {/* Breadcrumbs */}
        <div className="study-breadcrumbs">
          <button onClick={onNavigateToSubjects}>Study Materials</button>
          <span className="sep">›</span>
          <button onClick={onBack}>{subject.name}</button>
          <span className="sep">›</span>
          <span className="current">{unit.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#94a3b8] hover:text-[#38bdf8] transition-colors mb-5 font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          {subject.name}
        </button>

        {/* Topic Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F9FF] tracking-tight font-sans leading-tight mb-3">
            {topic.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-lg"
              style={{ background: `${subject.color}18`, color: subject.color }}
            >
              {subject.name}
            </span>
            <span className={`study-difficulty ${topic.difficulty.toLowerCase()}`}>
              {topic.difficulty}
            </span>
            {topic.isHighYield && <span className="study-high-yield">High Yield</span>}
            <span className="text-xs text-[#64748b] font-sans flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {topic.estimatedReadingMinutes} min read
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                isBookmarked
                  ? 'bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/30'
                  : 'bg-white/5 text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:border-[#f59e0b]/30 hover:text-[#fbbf24]'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-white/5 text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:text-[#e2e8f0] transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-white/5 text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:text-[#e2e8f0] transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>

          {/* Mobile TOC Toggle */}
          <button
            onClick={() => setShowMobileToc(!showMobileToc)}
            className="mt-4 w-full lg:hidden flex items-center justify-between p-3 rounded-xl bg-[rgba(15,23,42,0.5)] border border-[rgba(148,163,184,0.1)] text-sm font-sans text-[#94a3b8]"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Table of Contents
            </span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showMobileToc ? 'rotate-90' : ''}`} />
          </button>

          {/* Mobile TOC Content */}
          {showMobileToc && (
            <nav className="lg:hidden mt-2 mb-4">
              <div className="study-toc" style={{ position: 'static', maxHeight: 'none' }}>
                {STANDARD_SECTIONS.map(sec => (
                  <a
                    key={sec.type}
                    href={`#section-${sec.type}`}
                    className={`study-toc-item ${activeSection === sec.type ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMobileToc(false);
                      document.getElementById(`section-${sec.type}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </header>

        {/* Content Body — Medical Textbook Style */}
        <div className="study-reader">
          {/* Since no content has been populated yet, show structured empty sections */}
          {STANDARD_SECTIONS.map(sec => (
            <section key={sec.type} id={`section-${sec.type}`} className="scroll-mt-24 mb-6">
              <h2>{sec.title}</h2>
              <div className="study-no-content">
                <div className="icon">📋</div>
                <p className="text-[#64748b]">
                  Content for <strong className="text-[#94a3b8]">{sec.title}</strong> is not yet available
                  in the MEDX verified database.
                </p>
                <p className="text-xs text-[#475569] mt-2">
                  This section will be populated with verified medical content through the MEDX content management system.
                </p>
              </div>
            </section>
          ))}

          {/* Verification Status Notice */}
          <div className="mt-8 p-4 rounded-xl bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)]">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-sans font-bold text-[#fbbf24] mb-1">Content Status: Pending Review</p>
                <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                  This topic's study material has not yet been reviewed and verified by medical faculty.
                  Content will be added through the MEDX content management system with proper medical references
                  and faculty review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Cross-Links: Verified Medicines */}
        {relatedDrugs.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[rgba(148,163,184,0.1)]">
            <h3 className="text-sm font-bold text-[#F5F9FF] font-sans mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#10b981]" />
              Related Bangladesh Verified Medicines (Drug Reference)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {relatedDrugs.map(drug => (
                <a
                  key={drug.id}
                  href={drug.url}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between group text-decoration-none"
                >
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition block">
                      {drug.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {drug.badge || 'Generic Medicine'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <div className="mt-10 pt-8 border-t border-[rgba(148,163,184,0.1)]">
            <h3 className="text-sm font-bold text-[#F5F9FF] font-sans mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#08AFC1]" />
              More in {unit.title}
            </h3>
            <div className="space-y-1">
              {relatedTopics.map(t => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTopic?.(t.id, t.slug)}
                  className="study-topic-item w-full text-left group"
                >
                  <span className="text-sm text-[#e2e8f0] font-sans group-hover:text-[#38bdf8] transition-colors">
                    {t.title}
                  </span>
                  <div className="flex items-center gap-2">
                    {t.isHighYield && <span className="study-high-yield">HY</span>}
                    <span className={`study-difficulty ${t.difficulty.toLowerCase()}`}>
                      {t.difficulty}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="study-disclaimer">
          <strong>Medical Disclaimer:</strong> MEDX is an educational and reference platform. Information
          is provided for learning and reference purposes and is not a substitute for professional
          medical judgment, diagnosis, or treatment.
        </div>
      </article>

      {/* Desktop Sticky TOC — Right Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <nav className="study-toc">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] font-bold mb-3 px-3">
            Table of Contents
          </div>
          {STANDARD_SECTIONS.map(sec => (
            <a
              key={sec.type}
              href={`#section-${sec.type}`}
              className={`study-toc-item ${activeSection === sec.type ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(sec.type);
                document.getElementById(`section-${sec.type}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
};

// Utility: Simple throttle
function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => { timer = null; }, ms);
    fn(...args);
  }) as T;
}
