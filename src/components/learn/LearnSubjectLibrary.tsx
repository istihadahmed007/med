import React, { useState, useEffect } from 'react';
import { BMDC_SUBJECTS } from '../../data/bmdcCurriculum';
import { BmdcPhase, BmdcSubject, BodySystem, BmdcLesson, NavigationView } from '../../types';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Activity, 
  Brain, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Filter,
  Bookmark
} from 'lucide-react';
import { LessonViewerModal } from './LessonViewerModal';
import { CARDIOVASCULAR_PILOT_LESSONS } from '../../data/cardiovascularPilotData';
import { StorageService } from '../../services/storageService';
import { ApiService } from '../../services/apiService';

interface LearnSubjectLibraryProps {
  onSelectTopic: (topicId: string) => void;
  onNavigateView: (view: NavigationView) => void;
  selectedLessonId?: string | null;
}

const PHASES: { id: BmdcPhase; label: string; short: string; desc: string }[] = [
  { id: 'Phase 1: 1st & 2nd Year (Pre-clinical)', label: 'Phase 1 (Pre-clinical)', short: 'Phase 1', desc: 'Anatomy, Physiology, Biochemistry' },
  { id: 'Phase 2: 3rd Year (Para-clinical)', label: 'Phase 2 (Para-clinical)', short: 'Phase 2', desc: 'Pharmacology, Forensic Medicine' },
  { id: 'Phase 3: 4th Year (Para-clinical)', label: 'Phase 3 (Para-clinical)', short: 'Phase 3', desc: 'Pathology, Microbiology, Community Medicine' },
  { id: 'Phase 4: 5th Year (Clinical)', label: 'Phase 4 (Clinical)', short: 'Phase 4', desc: 'Medicine, Surgery, Obs & Gynae, Paediatrics' }
];

const BODY_SYSTEMS: { id: BodySystem | 'all'; label: string }[] = [
  { id: 'all', label: 'All Body Systems' },
  { id: 'cardiovascular', label: 'Cardiovascular (Pilot)' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'nervous', label: 'Nervous & Brain' },
  { id: 'digestive', label: 'Digestive & Hepato' },
  { id: 'urinary', label: 'Renal & Urinary' },
  { id: 'endocrine', label: 'Endocrine & Metabolic' }
];

export const LearnSubjectLibrary: React.FC<LearnSubjectLibraryProps> = ({
  onSelectTopic,
  onNavigateView,
  selectedLessonId
}) => {
  const [selectedPhase, setSelectedPhase] = useState<BmdcPhase>(PHASES[0].id);
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState<BmdcLesson | null>(null);
  const [allLessons, setAllLessons] = useState<BmdcLesson[]>(CARDIOVASCULAR_PILOT_LESSONS);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    ApiService.getLessons().then((lessons) => {
      if (lessons) setAllLessons(lessons);
    });
    const progress = StorageService.getProgress();
    setCompletedLessonIds(progress.completedLessonIds || []);

    if (selectedLessonId) {
      const found = CARDIOVASCULAR_PILOT_LESSONS.find((l) => l.id === selectedLessonId);
      if (found) setActiveLesson(found);
    }
  }, [selectedLessonId]);

  const currentPhaseShort = selectedPhase.includes('Phase 1') ? 'Phase 1' :
                           selectedPhase.includes('Phase 2') ? 'Phase 2' :
                           selectedPhase.includes('Phase 3') ? 'Phase 3' : 'Phase 4';

  const phaseSubjects = BMDC_SUBJECTS.filter((s) => s.phase === selectedPhase);

  // Filter lessons
  const filteredLessons = allLessons.filter((lesson) => {
    const matchesPhase = lesson.phase === currentPhaseShort;
    const matchesSystem = selectedSystem === 'all' || lesson.system === selectedSystem;
    const matchesSearch = !searchQuery || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSystem && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              BM&DC National Curriculum (2020 / 2026)
            </span>
            <span className="text-xs text-emerald-400 font-mono">12 Verified Pilot Lessons</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2">
            MBBS Integrated Curriculum & Lesson Hub
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Structured by professional phase, subject, and organ systems. Includes verified 5-stage interactive lessons with English/Bangla medical explanations.
          </p>
        </div>
      </div>

      <a href="#across-books" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-cyan-300/25 bg-cyan-950/30 hover:border-cyan-300/60 transition-colors group">
        <div className="flex gap-4 items-start">
          <BookOpen className="w-6 h-6 text-cyan-200 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-white">Study a topic across books</h2>
            <p className="text-sm text-slate-300 mt-1">Connect your textbook reading, compare perspectives and practise recall in one place.</p>
          </div>
        </div>
        <span className="text-sm text-cyan-200 font-semibold flex items-center gap-2 shrink-0">Explore topics <ArrowRight className="w-4 h-4" /></span>
      </a>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PHASES.map((p) => {
          const isActive = selectedPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 border-cyan-400 text-white shadow-glow-cyan font-bold'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-black">
                  {p.short}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  MBBS
                </span>
              </div>
              <div className="text-sm font-bold block mt-1">
                {p.label}
              </div>
              <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-slate-100' : 'text-slate-500'}`}>
                {p.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filter Bar (System Selector & Search) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* System Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {BODY_SYSTEMS.map((sys) => {
            const isSelected = selectedSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => setSelectedSystem(sys.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-glow-cyan'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {sys.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic or lesson..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Verified Published Lessons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Verified Interactive 5-Stage Lessons in {currentPhaseShort}
            </h2>
            <p className="text-xs text-slate-400">
              Click on any lesson to open the 5-stage interactive reading, visual checkpoints, and clinical questions.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            {filteredLessons.length} Lessons Available
          </span>
        </div>

        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const isSaved = StorageService.isBookmarked(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-glow-cyan/10"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                        {lesson.subjectName}
                      </span>
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedMinutes}m
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {lesson.title}
                    </h3>

                    {lesson.titleBn && (
                      <p className="text-xs text-slate-400 font-serif">
                        {lesson.titleBn}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {lesson.stages.learn.overviewEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {lesson.learningObjectives.length} Objectives • v{lesson.version}
                    </span>

                    <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Start Lesson
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-semibold text-slate-300">No published lessons match the selected filter</div>
            <p className="text-xs text-slate-500">
              Try selecting "All Body Systems" or check another professional phase.
            </p>
          </div>
        )}
      </div>

      {/* Curriculum Subject & Chapter Structure */}
      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Layers className="w-4 h-4 text-purple-400" />
          Full BM&DC Subject & Chapter Mapping ({currentPhaseShort})
        </h2>

        <div className="space-y-6">
          {phaseSubjects.map((sub) => (
            <div key={sub.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {sub.name}
                    </h3>
                    {sub.bengaliName && (
                      <span className="text-xs text-slate-400 font-serif">
                        ({sub.bengaliName})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {sub.description}
                  </p>
                </div>

                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 shrink-0">
                  {sub.chapters.length} Chapters
                </span>
              </div>

              {/* Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sub.chapters.map((chap) => (
                  <div key={chap.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                      {chap.title}
                    </h4>
                    <div className="space-y-1.5">
                      {chap.topics.map((t) => {
                        const hasLesson = allLessons.some((l) => l.chapterId === chap.id || l.title.toLowerCase().includes(t.title.toLowerCase().split(' ')[0]));
                        return (
                          <div
                            key={t.id}
                            onClick={() => {
                              const matchingLesson = allLessons.find((l) => l.title.toLowerCase().includes(t.title.toLowerCase().split(' ')[0]));
                              if (matchingLesson) setActiveLesson(matchingLesson);
                              else onSelectTopic(t.id);
                            }}
                            className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
                          >
                            <div>
                              <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                                {t.title}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1">
                                {t.isHighYield && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                                    High Yield
                                  </span>
                                )}
                                {hasLesson ? (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-semibold">
                                    Published Lesson
                                  </span>
                                ) : (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                    Planned Topic
                                  </span>
                                )}
                              </div>
                            </div>

                            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Viewer Modal */}
      {activeLesson && (
        <LessonViewerModal
          lesson={activeLesson}
          isOpen={!!activeLesson}
          onClose={() => setActiveLesson(null)}
          onNavigateToVisualLab={(targetId) => onNavigateView(targetId as NavigationView)}
        />
      )}
    </div>
  );
};
