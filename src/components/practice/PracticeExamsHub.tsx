import React, { useState } from 'react';
import { 
  HelpCircle, 
  ClipboardList, 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter,
  ShieldCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { NavigationView } from '../../types';
import { QuestionBankView } from '../questions/QuestionBankView';
import { OspeEngine } from '../practical/OspeEngine';
import { OsceEngine } from '../practical/OsceEngine';
import { AiVivaExaminer } from '../ai/AiVivaExaminer';

interface PracticeExamsHubProps {
  initialSubTab?: PracticeTab;
}

export type PracticeTab = 'questions' | 'ospe' | 'osce' | 'ai-viva';

const PRACTICE_TABS: { id: PracticeTab; label: string; icon: any; badge?: string }[] = [
  { id: 'questions', label: 'BM&DC Question Bank', icon: HelpCircle, badge: 'MCQ & SAQ' },
  { id: 'ospe', label: 'OSPE Practical Stations', icon: ClipboardList, badge: 'Timed 3m' },
  { id: 'osce', label: 'OSCE Clinical Stations', icon: Award, badge: 'Rubric' },
  { id: 'ai-viva', label: 'AI Viva Practice Examiner', icon: Sparkles, badge: 'Voice / Prep' }
];

export const PracticeExamsHub: React.FC<PracticeExamsHubProps> = ({ initialSubTab = 'questions' }) => {
  const [activeTab, setActiveTab] = useState<PracticeTab>(initialSubTab);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              BM&DC Examination & Practical Assessment Center
            </span>
            <span className="text-xs text-emerald-400 font-mono">Verified Pilot Stations</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2">
            Practice Assessment & Clinical Exam Simulator
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Test your clinical knowledge with high-yield MCQs, timed OSPE specimen stations, standardized OSCE rubrics, and AI Viva preparation.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
        {PRACTICE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 font-black shadow-glow-cyan'
                  : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-cyan-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Area */}
      <div className="w-full">
        {activeTab === 'questions' && <QuestionBankView />}
        {activeTab === 'ospe' && <OspeEngine />}
        {activeTab === 'osce' && <OsceEngine />}
        {activeTab === 'ai-viva' && <AiVivaExaminer />}
      </div>
    </div>
  );
};
