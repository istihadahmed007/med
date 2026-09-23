import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search,
  ChevronDown,
  BookOpen,
  FlaskConical,
  Stethoscope,
  CheckSquare,
  Pill,
  Library,
  Bookmark,
  Sparkles,
  UserCheck,
  User
} from 'lucide-react';
import { NavigationView, UserRole } from '../../types';
import { getStoredStudentProfile } from '../../data/dashboardMockData';

interface NavbarProps {
  currentView: NavigationView;
  onNavigate: (view: NavigationView) => void;
  onOpenSearch: () => void;
  onOpenVoice: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  mobileMenuOpen,
  onToggleMobileMenu,
  role,
  onRoleChange,
}) => {
  const [currentLang, setCurrentLang] = useState<'en' | 'bn'>('en');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'learn' | 'practice' | 'reference' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profile = getStoredStudentProfile();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const navCategories = [
    {
      id: 'learn' as const,
      label: currentLang === 'bn' ? 'শিখুন' : 'Learn',
      activeViews: ['learn', 'across-books', 'visual-lab', '3d-anatomy', 'physiology', 'pathology'],
      items: [
        { id: 'learn' as NavigationView, label: 'Curriculum Subjects', sub: 'Anatomy, Physio, Biochem & more', icon: BookOpen },
        { id: 'across-books' as NavigationView, label: 'Concepts Workspace', sub: 'Cross-book synthesis & notes', icon: Sparkles },
        { id: 'visual-lab' as NavigationView, label: '3D Visual Lab', sub: 'Anatomy, physiology simulations', icon: FlaskConical },
      ],
    },
    {
      id: 'practice' as const,
      label: currentLang === 'bn' ? 'অনুশীলন' : 'Practice',
      activeViews: ['cases', 'practice', 'questions', 'ospe', 'osce', 'ai-viva'],
      items: [
        { id: 'cases' as NavigationView, label: 'Clinical Cases', sub: 'Interactive bedside patient scenarios', icon: Stethoscope },
        { id: 'practice' as NavigationView, label: 'Quizzes & BMDC Exams', sub: 'MCQ & SBA practice engine', icon: CheckSquare },
        { id: 'practice' as NavigationView, label: 'OSPE / OSCE Stations', sub: 'Practical exam stations & checklists', icon: Sparkles },
      ],
    },
    {
      id: 'reference' as const,
      label: currentLang === 'bn' ? 'রেফারেন্স' : 'Reference',
      activeViews: ['drug-reference', 'textbook-library', 'textbook', 'study-materials', 'revision'],
      items: [
        { id: 'drug-reference' as NavigationView, label: 'Bangladesh Drug Reference', sub: '21,000+ brands, generics, interactions', icon: Pill },
        { id: 'textbook-library' as NavigationView, label: 'Textbook Library', sub: 'Standard MBBS reference library', icon: Library },
        { id: 'study-materials' as NavigationView, label: 'Curriculum & Notes', sub: 'Subject study guides & materials', icon: Bookmark },
      ],
    },
  ];

  return (
    <header 
      ref={dropdownRef}
      className="w-full px-4 sm:px-8 pt-4 sm:pt-6 pb-2 max-w-[1440px] mx-auto z-40 relative"
      aria-label="Main Site Navigation"
    >
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Icon & MEDX Wordmark */}
        <div className="flex items-center gap-6 lg:gap-10">
          <div
            onClick={() => onNavigate('dashboard')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('dashboard');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="MEDX Homepage"
            className="flex items-center gap-2.5 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] rounded-xl p-1"
          >
            {/* Turquoise Medical Cross Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#08AFC1] to-[#10b981] p-[1.5px] shadow-[0_0_15px_rgba(8,175,193,0.5)] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#06172E] rounded-[10px] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#08AFC1]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                </svg>
              </div>
            </div>

            <span className="text-xl font-black tracking-wider text-[#F5F9FF] font-sans">
              MEDX
            </span>
          </div>

          {/* Center-Left 3 Simplified Nav Categories (Learn, Practice, Reference) */}
          <nav 
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-2 lg:gap-4"
          >
            {navCategories.map((cat) => {
              const isCatActive = cat.activeViews.includes(currentView);
              const isDropdownOpen = openDropdown === cat.id;

              return (
                <div key={cat.id} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isDropdownOpen ? null : cat.id)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-sans select-none flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                      isCatActive
                        ? 'text-[#F5F9FF] font-bold bg-white/10 shadow-sm'
                        : 'text-[#C4D4EA] hover:text-[#F5F9FF] hover:bg-white/5 font-medium'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#08AFC1]' : 'opacity-70'}`} />
                  </button>

                  {/* Accessible Category Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      role="menu"
                      className="absolute left-0 top-full mt-2 w-72 bg-[rgba(10,36,74,0.96)] backdrop-blur-2xl rounded-2xl border border-[rgba(190,225,255,0.25)] p-2 shadow-2xl z-50 animate-fadeIn space-y-1"
                    >
                      <div className="px-3 py-1 text-[10px] font-mono text-[#8eaecf] uppercase tracking-wider">
                        {cat.label} Hubs
                      </div>
                      {cat.items.map((item, idx) => {
                        const ItemIcon = item.icon;
                        const isItemActive = currentView === item.id;
                        return (
                          <button
                            key={idx}
                            role="menuitem"
                            onClick={() => {
                              onNavigate(item.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                              isItemActive
                                ? 'bg-[#08AFC1]/20 text-white font-semibold'
                                : 'text-[#C4D4EA] hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#08AFC1] shrink-0 mt-0.5">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#F5F9FF]">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#8eaecf] line-clamp-1">
                                {item.sub}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Global Search, Language Toggle, User/Role Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Medical Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#C4D4EA] hover:text-[#F5F9FF] transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Search topics, medicines, cases, or anatomy (Ctrl + K)"
            aria-label="Open global medical search"
          >
            <Search className="w-4 h-4 text-[#08AFC1]" />
            <span className="hidden xl:inline text-xs">
              {currentLang === 'bn' ? 'অনুসন্ধান...' : 'Search medicines, topics, anatomy...'}
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300">
              Ctrl+K
            </kbd>
          </button>

          {/* EN / বাংলা Language Switcher */}
          <button
            onClick={() => setCurrentLang(currentLang === 'en' ? 'bn' : 'en')}
            className="min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-sans text-[#C4D4EA] hover:text-[#F5F9FF] hover:bg-white/5 transition-colors select-none font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Switch language (English / বাংলা)"
            aria-label="Switch interface language"
          >
            {currentLang === 'en' ? 'EN / বাংলা' : 'বাংলা / EN'}
          </button>

          <span className="hidden sm:inline w-px h-5 bg-white/20" aria-hidden="true" />

          {/* Student Profile / Role Persona Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              aria-expanded={showRoleMenu}
              aria-label="User profile and role menu"
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-white/20 hover:border-[#08AFC1]/60 bg-white/5 hover:bg-white/10 text-[#F5F9FF] text-xs sm:text-sm font-medium transition-all shadow-sm select-none flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <div className="w-6 h-6 rounded-full bg-[#08AFC1]/25 border border-[#08AFC1]/50 flex items-center justify-center text-[#08AFC1] text-[11px] font-bold">
                A
              </div>
              <span className="hidden sm:inline font-semibold">
                {profile.isLoggedIn ? 'Dr. Ayesha' : 'Guest'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showRoleMenu && (
              <div 
                role="menu"
                className="absolute right-0 top-full mt-2 w-52 bg-[rgba(10,36,74,0.96)] backdrop-blur-2xl rounded-2xl border border-[rgba(190,225,255,0.25)] p-2 shadow-2xl z-50 animate-fadeIn space-y-1"
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <div className="text-xs font-bold text-[#F5F9FF]">
                    {profile.name}
                  </div>
                  <div className="text-[11px] text-[#8eaecf]">
                    {profile.year} • DMC
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('progress');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#C4D4EA] hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#08AFC1]" />
                  <span>My Learning Progress</span>
                </button>

                <div className="px-3 pt-2 text-[10px] font-mono text-[#8eaecf] uppercase tracking-wider">
                  Role Persona
                </div>
                {(['student', 'faculty', 'reviewer', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs capitalize transition-colors flex items-center justify-between ${
                      role === r 
                        ? 'bg-[#08AFC1] text-[#06172E] font-bold' 
                        : 'text-[#C4D4EA] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle Mobile Navigation Drawer"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-[#C4D4EA] hover:text-white md:hidden transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
