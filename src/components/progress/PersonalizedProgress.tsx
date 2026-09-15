import React from 'react';
import { StorageService } from '../../services/storageService';
import { TrendingUp, Clock, BookOpen, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface PersonalizedProgressProps {
  onNavigateToTopic?: (topicId: string) => void;
  onNavigateToView?: (view: string) => void;
}

export const PersonalizedProgress: React.FC<PersonalizedProgressProps> = ({
  onNavigateToTopic,
  onNavigateToView,
}) => {
  const progress = StorageService.getProgress();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Profile Banner */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 shadow-glow-cyan flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            BM&DC Personalized Learning Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Student Performance & Exam Readiness
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {progress.name} • {progress.currentPhase} • {progress.university}
          </p>
        </div>

        {/* Exam Readiness Score Meter */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.5"
                strokeDasharray={`${progress.overallReadinessScore}, 100`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white font-mono">
              {progress.overallReadinessScore}%
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Exam Readiness
            </span>
            <span className="text-[11px] text-slate-400">
              BM&DC Professional Exam readiness indicator
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Study Streak
          </span>
          <span className="text-2xl font-bold text-amber-400 font-mono mt-1 block">
            {progress.streakDays} Days 🔥
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Topics Mastered
          </span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">
            {progress.topicsStudied} Topics
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Virtual Cases Solved
          </span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
            {progress.casesCompleted} Cases
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Practical Accuracy
          </span>
          <span className="text-2xl font-bold text-purple-400 font-mono mt-1 block">
            {progress.accuracyRate}%
          </span>
        </div>
      </div>

      {/* Weak Areas Targeted Prescription (Section 20 requirement) */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-rose-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Targeted Weak Area Prescriptions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized revision pathways generated from repeated MCQ errors and missed OSPE steps.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {progress.weakAreas.map((weak, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{weak.topic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {weak.subject}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold">
                    {weak.accuracyPercent}% Accuracy
                  </span>
                </div>
                <p className="text-xs text-cyan-300/90 mt-1">
                  <strong>Prescribed Action: </strong>
                  {weak.recommendedAction}
                </p>
              </div>

              <button
                onClick={() => onNavigateToView && onNavigateToView('physiology')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shrink-0 shadow-glow-cyan"
              >
                Start Remedial Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Spaced Repetition Review Engine (Section 21 requirement) */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-blue-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Spaced Repetition Schedule (SM-2 Engine)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Performance-driven memory retention scheduling for long-term MBBS clinical recall.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {progress.spacedRepetitionDue.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Due in {item.dueInHours}h
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Interval: {item.intervalDays}d
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">
                {item.topicTitle}
              </h4>
              <button
                onClick={() => onNavigateToView && onNavigateToView('learn')}
                className="w-full mt-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1"
              >
                <span>Review Concept</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
