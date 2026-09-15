import React, { useState } from 'react';
import { BMDC_SUBJECTS } from '../../data/bmdcCurriculum';
import { BmdcPhase, BmdcSubject, NavigationView } from '../../types';
import { BookOpen, Search, ArrowRight, Sparkles, Layers, Activity, Brain } from 'lucide-react';

interface LearnSubjectLibraryProps {
  onSelectTopic: (topicId: string) => void;
  onNavigateView: (view: NavigationView) => void;
}

const PHASES: BmdcPhase[] = [
  'Phase 1: 1st & 2nd Year (Pre-clinical)',
  'Phase 2: 3rd Year (Para-clinical)',
  'Phase 3: 4th Year (Para-clinical)',
  'Phase 4: 5th Year (Clinical)'
];

export const LearnSubjectLibrary: React.FC<LearnSubjectLibraryProps> = ({
  onSelectTopic,
  onNavigateView,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<BmdcPhase>(PHASES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const phaseSubjects = BMDC_SUBJECTS.filter((s) => s.phase === selectedPhase);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            BM&DC Curriculum Library
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Bangladesh MBBS Digital Medical Library
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Structured according to Bangladesh Medical & Dental Council syllabus across 4 professional phases and 17 core subjects.
          </p>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {PHASES.map((p) => {
          const isActive = selectedPhase === p;
          return (
            <button
              key={p}
              onClick={() => setSelectedPhase(p)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 border-cyan-400 text-white shadow-glow-cyan font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono block uppercase opacity-75">
                {p.split(':')[0]}
              </span>
              <span className="text-xs font-bold block mt-0.5 truncate">
                {p.split(':')[1]?.trim() || p}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subjects & Chapter Hierarchy */}
      <div className="space-y-6">
        {phaseSubjects.map((sub) => (
          <div key={sub.id} className="glass-panel-elevated p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">
                    {sub.name}
                  </h2>
                  {sub.bengaliName && (
                    <span className="text-xs text-slate-400 font-medium">
                      ({sub.bengaliName})
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {sub.description}
                </p>
              </div>

              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 shrink-0">
                {sub.topicsCount} Topics
              </span>
            </div>

            {/* Chapters & Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sub.chapters.map((chap) => (
                <div key={chap.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2.5">
                  <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    {chap.title}
                  </h3>
                  <div className="space-y-1.5">
                    {chap.topics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectTopic(t.id);
                          onNavigateView('learn');
                        }}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
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
                            {t.has3DModel && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-500/30">
                                3D Model
                              </span>
                            )}
                            {t.hasSimulation && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                                Interactive Sim
                              </span>
                            )}
                          </div>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
