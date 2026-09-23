import React from 'react';
import { ShieldCheck, BookOpen, AlertCircle, FileText, HelpCircle, MessageSquare } from 'lucide-react';
import { NavigationView } from '../../types';

interface TrustFooterProps {
  onNavigate: (view: NavigationView) => void;
}

export const TrustFooter: React.FC<TrustFooterProps> = ({ onNavigate }) => {
  return (
    <footer 
      aria-label="Educational Disclaimer and Trust Information"
      className="mt-12 pt-8 pb-14 border-t border-[rgba(190,225,255,0.14)] text-xs text-[#8eaecf] space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Intended Audience & Curriculum Alignment */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#F5F9FF] font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#08AFC1]" />
            <span>Target Audience & Curriculum</span>
          </div>
          <p className="leading-relaxed text-[#C4D4EA]">
            Engineered specifically for undergraduate <strong>Bangladesh MBBS students</strong> across 1st to 5th Year. Aligned with the national MBBS curriculum, professional OSPE/OSCE standards, and clinical bedside practices.
          </p>
        </div>

        {/* Column 2: Content Provenance & Medical Review */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#F5F9FF] font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-[#08AFC1]" />
            <span>Academic Integrity & Verification</span>
          </div>
          <p className="leading-relaxed text-[#C4D4EA]">
            Content is verified against standard medical textbooks (Gray’s Anatomy, Guyton & Hall Physiology, Robbins Pathology, Katzung Pharmacology, and BMDC therapeutic guidelines). Updated on a continuous revision cycle.
          </p>
        </div>

        {/* Column 3: Educational-Use Medical Disclaimer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#F5F9FF] font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Educational Use Disclaimer</span>
          </div>
          <p className="leading-relaxed text-[#C4D4EA]">
            MEDX is an interactive educational simulation companion for medical students and trainee doctors. It does not constitute formal medical diagnosis or patient treatment advice.
          </p>
        </div>

      </div>

      {/* Footer Utility Links & Copyright */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7fa3d1]">
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            MEDX BD
          </button>
          <span>•</span>
          <button 
            onClick={() => onNavigate('study-materials')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Curriculum Guide
          </button>
          <span>•</span>
          <a 
            href="#help" 
            onClick={(e) => { e.preventDefault(); alert('MEDX Student Support: support@vartualtutor.com'); }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Help & FAQs
          </a>
          <span>•</span>
          <a 
            href="#feedback" 
            onClick={(e) => { e.preventDefault(); alert('Thank you for contributing feedback to improve MEDX for MBBS students.'); }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Feedback
          </a>
          <span>•</span>
          <a 
            href="#privacy" 
            onClick={(e) => { e.preventDefault(); alert('Student study progress and private notes remain stored locally in your browser.'); }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </a>
          <span>•</span>
          <a 
            href="#terms" 
            onClick={(e) => { e.preventDefault(); alert('MEDX Academic Terms: strictly for educational non-commercial study use.'); }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Use
          </a>
        </div>

        <div>
          © {new Date().getFullYear()} MEDX Bangladesh • Medical Learning Companion
        </div>
      </div>
    </footer>
  );
};
