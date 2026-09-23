import React from 'react';
import { Home, BookOpen, CheckSquare, Search, User } from 'lucide-react';
import { NavigationView } from '../../types';

interface MobileBottomNavProps {
  currentView: NavigationView;
  onNavigate: (view: NavigationView) => void;
  onOpenSearch?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
}) => {
  const tabs = [
    {
      id: 'dashboard' as const,
      label: 'Home',
      icon: Home,
      isActive: currentView === 'dashboard' || currentView === 'home',
      action: () => onNavigate('dashboard'),
    },
    {
      id: 'learn' as const,
      label: 'Learn',
      icon: BookOpen,
      isActive: ['learn', 'across-books', 'visual-lab', 'textbook-library', 'textbook', 'study-materials'].includes(currentView),
      action: () => onNavigate('learn'),
    },
    {
      id: 'practice' as const,
      label: 'Practice',
      icon: CheckSquare,
      isActive: ['practice', 'cases', 'questions', 'ospe', 'osce', 'ai-viva'].includes(currentView),
      action: () => onNavigate('practice'),
    },
    {
      id: 'search' as const,
      label: 'Search',
      icon: Search,
      isActive: false,
      action: () => {
        if (onOpenSearch) onOpenSearch();
      },
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: User,
      isActive: currentView === 'progress' || currentView === 'revision',
      action: () => onNavigate('progress'),
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-auto"
    >
      <div className="bg-[rgba(10,36,74,0.85)] backdrop-blur-2xl border border-[rgba(190,225,255,0.25)] border-t-[rgba(255,255,255,0.35)] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.5)] p-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              onClick={tab.action}
              aria-label={tab.label}
              aria-current={tab.isActive ? 'page' : undefined}
              className={`min-h-[48px] flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                tab.isActive
                  ? 'text-[#08AFC1] font-bold'
                  : 'text-[#C4D4EA]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`relative p-1 rounded-lg transition-transform ${tab.isActive ? 'scale-110 bg-[#08AFC1]/15 text-[#08AFC1]' : ''}`}>
                <Icon className="w-5 h-5" />
                {tab.isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#08AFC1] shadow-[0_0_8px_#08AFC1]" />
                )}
              </div>
              <span className={`text-[10px] tracking-wide ${tab.isActive ? 'font-bold text-[#F5F9FF]' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
