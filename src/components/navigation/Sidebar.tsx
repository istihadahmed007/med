import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  Activity, 
  HelpCircle, 
  RotateCcw, 
  TrendingUp, 
  ShieldCheck,
  Bot,
  Heart,
  Layers,
  Search,
  Stethoscope,
  ChevronRight,
  Video,
  BookMarked
} from 'lucide-react';
import { NavigationView } from '../../types';

interface SidebarProps {
  currentView: NavigationView;
  onNavigate: (view: NavigationView) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationView;
  label: string;
  icon: any;
  badge?: string;
  description: string;
}

const PRIMARY_HUBS: NavItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    badge: 'Hub',
    description: 'Command center & milestones'
  },
  { 
    id: 'learn', 
    label: 'Learn (Curriculum)', 
    icon: BookOpen, 
    badge: 'BM&DC',
    description: 'Phase I-IV 5-stage lessons'
  },
  {
    id: 'across-books',
    label: 'Across books',
    icon: Layers,
    description: 'Connect a topic across textbooks'
  },
  {
    id: 'textbook-library',
    label: 'Textbook Library',
    icon: BookMarked,
    badge: 'Library',
    description: 'Verified MBBS textbooks & import'
  },
  { 
    id: 'visual-lab',
    label: 'Visual Lab', 
    icon: Sparkles, 
    badge: '3D/DICOM',
    description: '3D Anatomy, Wiggers & X-Ray'
  },
  { 
    id: 'cases', 
    label: 'Clinical Cases', 
    icon: Activity, 
    badge: 'Live',
    description: 'Virtual patient simulations'
  },
  { 
    id: 'practice', 
    label: 'Practice & Exams', 
    icon: HelpCircle, 
    badge: 'OSPE/MCQ',
    description: 'Question Bank & OSPE/OSCE'
  },
  { 
    id: 'revision', 
    label: 'Revision', 
    icon: RotateCcw, 
    badge: 'SM-2',
    description: 'Spaced flashcards & mistakes'
  },
  { 
    id: 'progress', 
    label: 'My Progress', 
    icon: TrendingUp, 
    description: 'Readiness radar & analytics'
  },
];

const SECONDARY_TOOLS = [
  { id: 'video-studio', label: 'Medical Video Library', icon: Video, badge: 'Medical Videos' },
  { id: 'ai-tutor', label: 'AI Medical Tutor', icon: Bot, badge: 'RAG' },
  { id: 'faculty-admin', label: 'Faculty Governance', icon: ShieldCheck, badge: 'Review' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) => {
  // Map any legacy or sub-view to its primary parent hub for active highlight
  const getIsActive = (hubId: NavigationView) => {
    if (currentView === hubId) return true;
    if (hubId === 'dashboard' && currentView === 'home') return true;
    if (hubId === 'visual-lab' && [
      '3d-anatomy', 'physiology', 'pathology', 'pharmacology', 
      'histology', 'comparison', 'diagrams', 'surgery', 'investigations', 'treatment'
    ].includes(currentView)) return true;
    if (hubId === 'practice' && ['questions', 'ospe', 'osce', 'ai-viva', 'clinical-exam'].includes(currentView)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Clean 7-Hub Navigation Sidebar with royal blue translucent glass */}
      <aside
        className={`fixed top-20 bottom-3 left-3 z-40 w-64 bg-[rgba(6,23,46,0.80)] border border-[rgba(190,225,255,0.20)] border-t-[rgba(255,255,255,0.28)] rounded-3xl backdrop-blur-2xl flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-[0_12px_36px_rgba(0,0,0,0.5)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[#C4D4EA]/60 font-bold">
            Core MBBS Companion
          </div>

          {PRIMARY_HUBS.map((hub) => {
            const Icon = hub.icon;
            const isActive = getIsActive(hub.id);

            return (
              <button
                key={hub.id}
                onClick={() => {
                  onNavigate(hub.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs transition-all group border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#08AFC1] to-[#0694a2] text-[#06172E] border-[#08AFC1] font-bold shadow-[0_0_20px_rgba(8,175,193,0.35)]'
                    : 'bg-transparent text-[#C4D4EA] border-transparent hover:bg-white/5 hover:text-white hover:border-[rgba(190,225,255,0.15)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-[#06172E]/20 text-[#06172E]' : 'bg-white/5 text-[#08AFC1] group-hover:bg-white/10'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className={`font-bold text-xs ${isActive ? 'text-[#06172E]' : 'text-[#F5F9FF]'}`}>
                      {hub.label}
                    </div>
                    <div className={`text-[10px] truncate max-w-[120px] ${isActive ? 'text-[#06172E]/80' : 'text-[#C4D4EA]/60'}`}>
                      {hub.description}
                    </div>
                  </div>
                </div>

                {hub.badge && (
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      isActive
                        ? 'bg-[#06172E]/25 text-[#06172E]'
                        : 'bg-white/5 text-[#08AFC1] border border-[#08AFC1]/30'
                    }`}
                  >
                    {hub.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold border-t border-slate-800/80 mt-2">
            Intelligence & Faculty
          </div>

          {SECONDARY_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = currentView === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  onNavigate(tool.id as NavigationView);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs transition-all group border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 font-bold shadow-glow-cyan'
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-900/90 hover:text-slate-100 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:text-purple-400 group-hover:bg-slate-850'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-slate-200">{tool.label}</span>
                </div>

                {tool.badge && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center space-y-0.5 bg-slate-950">
          <div className="text-slate-400 font-bold">MedX MBBS Companion</div>
          <div>BM&DC 2026 Curriculum Standard</div>
        </div>
      </aside>
    </>
  );
};
