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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#08AFC1] uppercase tracking-widest bg-[rgba(8,175,193,0.12)] px-3 py-1 rounded-full border border-[rgba(8,175,193,0.3)]">
              BM&DC Examination & Practical Assessment Center
            </span>
            <span className="text-xs text-emerald-400 font-mono">Verified Pilot Stations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Practice Assessment & Clinical Exam Simulator
          </h1>
          <p className="text-[#C4D4EA] text-sm sm:text-base max-w-3xl leading-relaxed">
            Test your clinical knowledge with high-yield MCQs, timed OSPE specimen stations, standardized OSCE rubrics, and AI Viva preparation.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto scrollbar-thin">
        {PRACTICE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-[#08AFC1] text-white border-[#08AFC1] font-bold shadow-glow-cyan'
                  : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-[#08AFC1]'
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
