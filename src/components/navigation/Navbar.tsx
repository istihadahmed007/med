import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search,
  ChevronDown
} from 'lucide-react';
import { NavigationView, UserRole } from '../../types';

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

  const navLinks: { id: NavigationView; label: string; labelBn: string }[] = [
    { id: 'study-materials', label: 'Study Materials', labelBn: 'পাঠ্য উপকরণ' },
    { id: 'learn', label: 'Learn', labelBn: 'শিখুন' },
    { id: 'textbook-library', label: 'Library', labelBn: 'লাইব্রেরি' },
    { id: 'drug-reference', label: 'Drug Reference', labelBn: 'ওষুধ নির্দেশিকা' },
    { id: 'visual-lab', label: 'Visual Lab', labelBn: 'ভিজ্যুয়াল ল্যাব' },
    { id: 'cases', label: 'Clinical Cases', labelBn: 'ক্লিনিক্যাল কেস' },
    { id: 'practice', label: 'Practice', labelBn: 'অনুশীলন' },
  ];

  return (
    <header className="w-full px-4 sm:px-8 pt-4 sm:pt-6 pb-2 max-w-[1440px] mx-auto z-40 relative">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Turquoise 3D Cross Badge & Brand MEDX */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
          <button
            onClick={() => onNavigate('dashboard')}
            aria-label="Go to MEDX Dashboard"
            className="flex items-center gap-2.5 cursor-pointer select-none group text-left rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
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
          </button>

          {/* Center-Left Navigation Links (Original 7 routes preserved) */}
          {/* Center-Left Navigation Links (Original 7 routes preserved) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id || 
                (link.id === 'learn' && currentView === 'across-books') || 
                (link.id === 'textbook-library' && currentView === 'textbook');
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-sm transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                    currentLang === 'bn' ? 'font-bengali' : 'font-sans'
                  } ${
                    isActive
                      ? 'text-[#F5F9FF] font-bold bg-white/10 shadow-sm'
                      : 'text-[#C4D4EA] hover:text-[#F5F9FF] hover:bg-white/5 font-medium'
                  }`}
                >
                  {currentLang === 'bn' ? link.labelBn : link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Search, EN / বাংলা, separator, Sign in */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Medical Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="min-h-[44px] flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-[#C4D4EA] hover:text-[#F5F9FF] transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Search medicines, study materials, topics (Ctrl + K)"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4 text-[#08AFC1]" aria-hidden="true" />
            <span className={`hidden sm:inline ${currentLang === 'bn' ? 'font-bengali text-sm' : 'font-sans text-xs sm:text-sm'}`}>
              {currentLang === 'bn' ? 'অনুসন্ধান...' : 'Search medicines, topics...'}
            </span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[11px] font-mono bg-white/10 rounded text-[#C4D4EA]/80 ml-1">
              Ctrl+K
            </kbd>
          </button>

          {/* EN / বাংলা Language Toggle */}
          <button
            onClick={() => setCurrentLang(currentLang === 'en' ? 'bn' : 'en')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans text-[#C4D4EA] hover:text-[#F5F9FF] hover:bg-white/5 transition-colors select-none font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Switch language (English / বাংলা)"
            aria-label="Switch interface language"
          >
            {currentLang === 'en' ? 'EN / বাংলা' : 'বাংলা / EN'}
          </button>

          {/* Thin Vertical Divider */}
          <span className="hidden sm:inline w-px h-5 bg-white/20" aria-hidden="true" />

          {/* Sign in / Role Persona Selector */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              aria-expanded={showRoleMenu}
              aria-label="Select role persona"
              className="min-h-[44px] px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-[#F5F9FF] text-xs sm:text-sm font-medium transition-all shadow-sm select-none flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <span>{role === 'student' ? 'Sign in' : role.charAt(0).toUpperCase() + role.slice(1)}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            </button>

            {/* Role dropdown */}
            {showRoleMenu && (
              <div 
                role="menu"
                className="absolute right-0 top-full mt-2 w-48 bg-[rgba(10,36,74,0.95)] backdrop-blur-2xl rounded-2xl border border-[rgba(190,225,255,0.25)] p-1.5 shadow-2xl z-50 animate-fadeIn"
              >
                <div className="px-3 py-1.5 text-[11px] font-mono text-[#C4D4EA]/70 uppercase tracking-wider">
                  Select Persona
                </div>
                {(['student', 'faculty', 'reviewer', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    role="menuitem"
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm capitalize transition-colors flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                      role === r 
                        ? 'bg-[#08AFC1] text-[#06172E] font-bold' 
                        : 'text-[#C4D4EA] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <span className="text-xs" aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-[#C4D4EA] hover:text-white lg:hidden transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
