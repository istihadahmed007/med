import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  User
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
    { id: 'learn', label: 'Learn', labelBn: 'শিখুন' },
    { id: 'visual-lab', label: 'Visual Lab', labelBn: 'ভিজ্যুয়াল ল্যাব' },
    { id: 'cases', label: 'Clinical Cases', labelBn: 'ক্লিনিক্যাল কেস' },
    { id: 'practice', label: 'Practice', labelBn: 'অনুশীলন' },
  ];

  return (
    <header className="w-full px-4 sm:px-8 pt-4 sm:pt-6 pb-2 max-w-[1440px] mx-auto z-40 relative">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Turquoise 3D Cross Badge & Brand MEDX */}
        <div className="flex items-center gap-6 sm:gap-10">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            {/* Turquoise Medical Cross Icon matching concept */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#08AFC1] to-[#10b981] p-[1.5px] shadow-[0_0_15px_rgba(8,175,193,0.5)] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#06172E] rounded-[10px] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#08AFC1]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                </svg>
              </div>
            </div>

            <span className="text-xl font-black tracking-wider text-[#F5F9FF] font-sans">
              MEDX
            </span>
          </div>

          {/* Center-Left Navigation Links matching concept */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.id || (link.id === 'learn' && currentView === 'across-books');
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm transition-colors font-sans select-none ${
                    isActive
                      ? 'text-[#F5F9FF] font-bold'
                      : 'text-[#C4D4EA] hover:text-[#F5F9FF] font-medium'
                  }`}
                >
                  {currentLang === 'bn' ? link.labelBn : link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: EN / বাংলা, separator, Sign in */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* EN / বাংলা Language Toggle */}
          <button
            onClick={() => setCurrentLang(currentLang === 'en' ? 'bn' : 'en')}
            className="text-xs sm:text-sm font-sans text-[#C4D4EA] hover:text-[#F5F9FF] transition-colors select-none font-medium"
            title="Switch language (English / বাংলা)"
          >
            {currentLang === 'en' ? 'EN / বাংলা' : 'বাংলা / EN'}
          </button>

          {/* Thin Vertical Divider matching concept */}
          <span className="hidden sm:inline w-px h-4 bg-white/25" />

          {/* Sign in / User Button matching concept */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="px-5 py-1.5 sm:py-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-[#F5F9FF] text-xs sm:text-sm font-medium transition-all shadow-sm select-none"
            >
              <span>{role === 'student' ? 'Sign in' : role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </button>

            {/* Role dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[rgba(10,36,74,0.95)] backdrop-blur-2xl rounded-2xl border border-[rgba(190,225,255,0.25)] p-1.5 shadow-2xl z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-mono text-[#C4D4EA]/60 uppercase tracking-wider">
                  Select Persona
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
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl text-[#C4D4EA] hover:text-white md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
