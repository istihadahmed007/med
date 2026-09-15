import React from 'react';
import { 
  Home, 
  BookOpen, 
  Heart, 
  Activity, 
  Layers, 
  Pill, 
  Stethoscope, 
  Award, 
  Search, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  ClipboardList,
  Network
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
  category?: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Command Center', icon: Home },
  { id: 'visual-engine', label: 'Visual Medicine Engine', icon: Sparkles, badge: 'Journey' },
  { id: 'learn', label: 'MBBS Curriculum', icon: BookOpen, badge: '20 Subs' },
  
  // Simulation Labs
  { id: '3d-anatomy', label: '3D Anatomy Studio', icon: Heart, category: 'Simulation Labs', badge: '3D' },
  { id: 'histology', label: 'Virtual Histology Lab', icon: Layers, category: 'Simulation Labs', badge: 'Micro' },
  { id: 'physiology', label: 'Living Physiology', icon: Activity, category: 'Simulation Labs' },
  { id: 'pathology', label: 'Pathology Transform', icon: Layers, category: 'Simulation Labs' },
  { id: 'comparison', label: 'Normal vs Abnormal', icon: Sliders, category: 'Simulation Labs', badge: 'Split' },
  { id: 'diagrams', label: 'Interactive Diagrams', icon: Network, category: 'Simulation Labs' },
  { id: 'pharmacology', label: 'Drug Journey Lab', icon: Pill, category: 'Simulation Labs' },
  
  // Practical & Clinical Skills
  { id: 'clinical-exam', label: 'Bedside Examination', icon: Stethoscope, category: 'Clinical Practice' },
  { id: 'surgery', label: 'Surgery & Procedures', icon: Award, category: 'Clinical Practice', badge: 'Steps' },
  { id: 'ospe', label: 'OSPE Station Engine', icon: ClipboardList, category: 'Clinical Practice', badge: 'Timed' },
  { id: 'osce', label: 'OSCE Clinical Stations', icon: Award, category: 'Clinical Practice' },
  { id: 'cases', label: 'Virtual Patient Cases', icon: Activity, category: 'Clinical Practice', badge: 'Live' },
  
  // Diagnostics & Textbooks
  { id: 'investigations', label: 'Radiology & ECG Lab', icon: Search, category: 'Diagnostics', badge: 'CXR/CT' },
  { id: 'treatment', label: 'Treatment Algorithms', icon: Sliders, category: 'Diagnostics' },
  { id: 'textbook', label: 'MBBS Digital Textbook', icon: BookOpen, category: 'Diagnostics', badge: 'Reader' },
  
  // Testing & AI
  { id: 'questions', label: 'Question Bank', icon: HelpCircle, category: 'Evaluation & AI', badge: 'BM&DC' },
  { id: 'ai-viva', label: 'AI Viva Examiner', icon: Award, category: 'Evaluation & AI', badge: 'Voice' },
  { id: 'ai-tutor', label: 'Verified AI Tutor', icon: Sparkles, category: 'Evaluation & AI' },
  { id: 'progress', label: 'My Progress Radar', icon: TrendingUp, category: 'Evaluation & AI' },
  { id: 'faculty-admin', label: 'Faculty Governance', icon: ShieldCheck, category: 'Governance' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 glass-panel border-r border-cyan-500/20 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isFirstOfCategory =
              item.category && (index === 0 || NAV_ITEMS[index - 1].category !== item.category);

            return (
              <React.Fragment key={item.id}>
                {isFirstOfCategory && (
                  <div className="pt-3 pb-1 px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                    {item.category}
                  </div>
                )}
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-glow-cyan font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
          MEDX BD v1.0 • BM&DC 2026 Compliant
        </div>
      </aside>
    </>
  );
};
