import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  Star,
  GraduationCap,
  Filter,
  Bookmark,
  ArrowLeft,
  FileText,
  Zap,
  UserCheck,
  ShieldAlert,
  Settings,
} from 'lucide-react';
import { StudySubject, StudyTopicSummary, BmdcPhaseShort } from '../../types/study';
import { STUDY_SUBJECTS, getTopicById } from '../../data/studyMaterialsData';
import { StudyService } from '../../services/studyService';
import { StorageService } from '../../services/storageService';
import { SubjectView } from './SubjectView';
import { TopicReader } from './TopicReader';
import { MyStudyDashboard } from './MyStudyDashboard';
import { DocumentViewer } from './DocumentViewer';
import { StudyRevisionMode } from './StudyRevisionMode';
import { ContentManagement } from '../faculty/ContentManagement';
import './studyMaterials.css';

interface StudyMaterialsHubProps {
  onNavigate?: (view: string) => void;
}

type ViewMode = 'hub' | 'subject-detail' | 'topic-reader';
type HubTab = 'subjects' | 'my-study' | 'revision' | 'documents' | 'cms';

const PHASE_LABELS: Record<string, string> = {
  'all': 'All Phases',
  'Phase 1': 'Phase 1: Pre-clinical',
  'Phase 2': 'Phase 2: Para-clinical',
  'Phase 3': 'Phase 3: Clinical (4th Year)',
  'Phase 4': 'Phase 4: Clinical (5th Year)',
};

export const StudyMaterialsHub: React.FC<StudyMaterialsHubProps> = ({ onNavigate }) => {
  // Parse sub-route from hash
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'subjects' as HubTab };
    const hash = window.location.hash.replace('#study-materials', '').replace(/^\//, '');
    const parts = hash.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const subject = STUDY_SUBJECTS.find(s => s.slug === parts[0]);
      if (subject) {
        for (const unit of subject.units) {
          const topic = unit.topics.find(t => t.slug === parts[1]);
          if (topic) return { mode: 'topic-reader' as ViewMode, subjectSlug: parts[0], topicId: topic.id, tab: 'subjects' as HubTab };
        }
        return { mode: 'subject-detail' as ViewMode, subjectSlug: parts[0], topicId: '', tab: 'subjects' as HubTab };
      }
    }
    if (parts.length === 1) {
      if (parts[0] === 'my-study') return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'my-study' as HubTab };
      if (parts[0] === 'revision') return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'revision' as HubTab };
      if (parts[0] === 'documents') return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'documents' as HubTab };
      if (parts[0] === 'cms') return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'cms' as HubTab };
      return { mode: 'subject-detail' as ViewMode, subjectSlug: parts[0], topicId: '', tab: 'subjects' as HubTab };
    }
    return { mode: 'hub' as ViewMode, subjectSlug: '', topicId: '', tab: 'subjects' as HubTab };
  };

  const initial = getInitialRoute();
  const [viewMode, setViewMode] = useState<ViewMode>(initial.mode);
  const [activeTab, setActiveTab] = useState<HubTab>(initial.tab);
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState(initial.subjectSlug);
  const [selectedTopicId, setSelectedTopicId] = useState(initial.topicId);
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');

  const currentRole = StorageService.getRole();
  const completedIds = useMemo(() => StudyService.getCompletedTopicIds(), []);

  const filteredSubjects = useMemo(() => {
    let subjects = STUDY_SUBJECTS;
    if (phaseFilter !== 'all') {
      subjects = subjects.filter(s => s.phase === phaseFilter);
    }
    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase();
      subjects = subjects.filter(s =>
        s.name.toLowerCase().includes(q) ||
        (s.nameBn && s.nameBn.includes(q)) ||
        s.units.some(u =>
          u.title.toLowerCase().includes(q) ||
          u.topics.some(t => t.title.toLowerCase().includes(q))
        )
      );
    }
    return subjects;
  }, [phaseFilter, searchQuery]);

  const handleSelectSubject = (subject: StudySubject) => {
    setSelectedSubjectSlug(subject.slug);
    setViewMode('subject-detail');
    window.history.replaceState(null, '', `#study-materials/${subject.slug}`);
    document.title = `${subject.name} — MEDX Study Materials`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string, subjectSlug: string, topicSlug: string) => {
    setSelectedTopicId(topicId);
    setSelectedSubjectSlug(subjectSlug);
    setViewMode('topic-reader');
    window.history.replaceState(null, '', `#study-materials/${subjectSlug}/${topicSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTopicById = (topicId: string) => {
    const found = getTopicById(topicId);
    if (found) {
      setSelectedTopicId(topicId);
      setSelectedSubjectSlug(found.subject.slug);
      setViewMode('topic-reader');
      window.history.replaceState(null, '', `#study-materials/${found.subject.slug}/${found.topic.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHub = () => {
    setViewMode('hub');
    setSelectedSubjectSlug('');
    setSelectedTopicId('');
    window.history.replaceState(null, '', '#study-materials');
    document.title = 'Study Materials — MEDX';
  };

  const handleBackToSubject = () => {
    setViewMode('subject-detail');
    setSelectedTopicId('');
    window.history.replaceState(null, '', `#study-materials/${selectedSubjectSlug}`);
    const subject = STUDY_SUBJECTS.find(s => s.slug === selectedSubjectSlug);
    if (subject) document.title = `${subject.name} — MEDX Study Materials`;
  };

  // ──────────────────────────────────────────
  // Topic Reader View
  // ──────────────────────────────────────────
  if (viewMode === 'topic-reader' && selectedTopicId) {
    return (
      <TopicReader
        topicId={selectedTopicId}
        onBack={handleBackToSubject}
        onNavigateToSubjects={handleBackToHub}
        onNavigateToTopic={(tId, tSlug) => handleSelectTopic(tId, selectedSubjectSlug, tSlug)}
      />
    );
  }

  // ──────────────────────────────────────────
  // Subject Detail View (Units & Topics)
  // ──────────────────────────────────────────
  if (viewMode === 'subject-detail' && selectedSubjectSlug) {
    const subject = STUDY_SUBJECTS.find(s => s.slug === selectedSubjectSlug);
    if (!subject) {
      handleBackToHub();
      return null;
    }
    return (
      <SubjectView
        subject={subject}
        completedTopicIds={completedIds}
        onBack={handleBackToHub}
        onSelectTopic={(topicId, topicSlug) => handleSelectTopic(topicId, subject.slug, topicSlug)}
      />
    );
  }

  // ──────────────────────────────────────────
  // Main Hub View with Tabs
  // ──────────────────────────────────────────
  const totalTopics = STUDY_SUBJECTS.reduce((sum, s) => sum + s.totalTopics, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#08AFC1]/20 to-[#10b981]/20 border border-[#08AFC1]/20">
            <BookOpen className="w-6 h-6 text-[#08AFC1]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F9FF] tracking-tight font-sans">
              Study Materials
            </h1>
            <p className="text-sm text-[#94a3b8] font-sans mt-0.5">
              {STUDY_SUBJECTS.length} MBBS subjects · {totalTopics} topics · Verified clinical knowledge base
            </p>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'subjects', label: '25 MBBS Subjects', icon: BookOpen },
          { id: 'my-study', label: 'My Study & Progress', icon: UserCheck },
          { id: 'revision', label: 'Exam Revision Mode', icon: Zap },
          { id: 'documents', label: 'Clinical Guidelines & PDFs', icon: FileText },
          ...(currentRole === 'faculty' || currentRole === 'admin'
            ? [{ id: 'cms', label: 'Content CMS', icon: Settings }]
            : []),
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as HubTab);
                window.history.replaceState(null, '', `#study-materials/${tab.id === 'subjects' ? '' : tab.id}`);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition select-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 25 MBBS SUBJECTS */}
      {activeTab === 'subjects' && (
        <div className="space-y-6">
          {/* Search Bar & Phase Filters */}
          <div className="space-y-3">
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search 25 subjects, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.15)] text-[#e2e8f0] placeholder-[#64748b] font-sans text-sm focus:outline-none focus:border-[#08AFC1]/40 focus:ring-1 focus:ring-[#08AFC1]/20 transition-all"
              />
            </div>

            {/* Phase Filter Pills */}
            <div className="study-phase-pills">
              {['all', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map(phase => (
                <button
                  key={phase}
                  onClick={() => setPhaseFilter(phase)}
                  className={`study-phase-pill ${phaseFilter === phase ? 'active' : ''}`}
                >
                  {PHASE_LABELS[phase]}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Grid */}
          {filteredSubjects.length === 0 ? (
            <div className="study-no-content">
              <div className="icon">🔍</div>
              <p>No subjects match your search. Try a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map(subject => {
                const completedCount = subject.units
                  .flatMap(u => u.topics)
                  .filter(t => completedIds.includes(t.id)).length;

                return (
                  <button
                    key={subject.id}
                    onClick={() => handleSelectSubject(subject)}
                    className="study-subject-card text-left w-full group"
                    style={{ '--subject-color': subject.color } as React.CSSProperties}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                        style={{ background: `${subject.color}18`, color: subject.color }}
                      >
                        {subject.name.charAt(0)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#94a3b8] uppercase">
                          {subject.phase}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-[#F5F9FF] mb-0.5 font-sans group-hover:text-[#38bdf8] transition-colors">
                      {subject.name}
                    </h3>
                    {subject.nameBn && (
                      <p className="text-xs text-[#64748b] mb-2 font-sans">{subject.nameBn}</p>
                    )}
                    <p className="text-xs text-[#94a3b8] line-clamp-2 mb-3 font-sans leading-relaxed">
                      {subject.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-[#64748b] font-sans">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {subject.totalTopics} topics
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {subject.units.length} units
                        </span>
                      </div>
                      {completedCount > 0 && (
                        <span className="text-[10px] font-mono text-[#10b981] font-bold">
                          {completedCount}/{subject.totalTopics}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    {completedCount > 0 && (
                      <div className="mt-2.5 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#08AFC1] transition-all"
                          style={{ width: `${Math.round((completedCount / subject.totalTopics) * 100)}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY STUDY DASHBOARD */}
      {activeTab === 'my-study' && (
        <MyStudyDashboard
          onOpenTopic={handleOpenTopicById}
          onNavigateToSubject={(slug) => {
            const subj = STUDY_SUBJECTS.find(s => s.slug === slug);
            if (subj) handleSelectSubject(subj);
          }}
        />
      )}

      {/* TAB 3: REVISION MODE */}
      {activeTab === 'revision' && (
        <StudyRevisionMode />
      )}

      {/* TAB 4: CLINICAL DOCUMENTS & PDFS */}
      {activeTab === 'documents' && (
        <DocumentViewer />
      )}

      {/* TAB 5: CONTENT MANAGEMENT CMS */}
      {activeTab === 'cms' && (
        <ContentManagement />
      )}

      {/* Medical Disclaimer Footer */}
      <div className="study-disclaimer mt-10">
        <strong>Medical Disclaimer:</strong> MEDX is an educational and reference platform. Information
        is provided for learning and reference purposes and is not a substitute for professional
        medical judgment, diagnosis, or treatment. Always consult qualified healthcare providers
        for clinical decisions.
      </div>
    </div>
  );
};

export default StudyMaterialsHub;
