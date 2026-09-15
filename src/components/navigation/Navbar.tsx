import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Mic, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  User,
  ShieldCheck,
  BookOpen,
  Eye,
  Sliders,
  Award,
  CheckCircle2,
  Info
} from 'lucide-react';
import { NavigationView, UserRole, LearningMode } from '../../types';
import { audioService } from '../../services/audioService';

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
  onOpenVoice,
  mobileMenuOpen,
  onToggleMobileMenu,
  role,
  onRoleChange,
}) => {
  const [isMuted, setIsMuted] = useState(audioService.isSoundMuted());
  const [learningMode, setLearningMode] = useState<LearningMode>('interactive');
  const [showSourcesModal, setShowSourcesModal] = useState<boolean>(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    audioService.setMuted(next);
    setIsMuted(next);
  };

  const learningModes: { id: LearningMode; label: string; icon: any }[] = [
    { id: 'interactive', label: 'Interactive', icon: Sliders },
    { id: 'read', label: 'Read Mode', icon: BookOpen },
    { id: 'watch', label: 'Watch 3D', icon: Eye },
    { id: 'practice', label: 'Practice', icon: Activity },
    { id: 'exam', label: 'Exam Mode', icon: Award },
    { id: 'revision', label: 'Revision', icon: Sparkles },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 glass-panel-elevated border-b border-cyan-500/20 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 p-[1.5px] shadow-glow-cyan">
              <div className="w-full h-full bg-med-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-white flex items-center gap-1">
                MEDX <span className="text-cyan-400 font-extrabold">BD</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 block -mt-1 uppercase">
                MBBS Simulation Campus
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Trigger) */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 w-64 lg:w-72 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="flex-1 text-left truncate">Search subjects, 3D organs...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono border border-slate-800">
            Ctrl K
          </kbd>
        </button>

        {/* Center / Right Learning Mode Selector Pill */}
        <div className="hidden xl:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {learningModes.map((m) => {
            const Icon = m.icon;
            const isSel = learningMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setLearningMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                  isSel
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Sources & Trust System Trigger */}
          <button
            onClick={() => setShowSourcesModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-colors"
            title="Verified Scientific Sources & Trust"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Sources & Trust</span>
          </button>

          {/* Voice Medical Assistant Trigger */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-glow-cyan transition-all"
            title="Voice Medical Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden md:inline">Voice AI</span>
          </button>

          {/* Audio sound toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-colors ${
              !isMuted
                ? 'bg-slate-900 border-cyan-500/30 text-cyan-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-500'
            }`}
            title={isMuted ? 'Unmute heart sounds' : 'Mute heart sounds'}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Role Selector Badge */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="capitalize">{role}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 glass-panel-elevated rounded-xl border border-slate-800 p-1 hidden group-hover:block z-50">
              {(['student', 'faculty', 'reviewer', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                    role === r ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Sources & Trust Modal */}
      {showSourcesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowSourcesModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Sources, Scientific Integrity & Trust Architecture
                </h2>
                <p className="text-xs text-slate-400">
                  Zero hallucination policy. All content conforms to BM&DC curriculum guidelines and internationally recognized medical textbooks.
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 text-xs text-slate-300">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-indigo-300 uppercase tracking-wide">
                  1. TEXTBOOK REFERENCES & CURRICULUM
                </div>
                <ul className="space-y-1 text-slate-400">
                  <li>• <strong>Internal Medicine:</strong> Davidson’s Principles and Practice of Medicine, 24th Edition (2022)</li>
                  <li>• <strong>Pathology:</strong> Robbins & Cotran Pathologic Basis of Disease, 10th Edition (2020)</li>
                  <li>• <strong>Physiology:</strong> Guyton & Hall Textbook of Medical Physiology, 14th Edition (2020)</li>
                  <li>• <strong>General Surgery:</strong> Bailey & Love’s Short Practice of Surgery, 28th Edition (2023)</li>
                  <li>• <strong>Clinical Anatomy:</strong> Snell’s Clinical Anatomy by Regions, 9th Edition</li>
                  <li>• <strong>Histology:</strong> Wheater’s Functional Histology, 6th Edition</li>
                  <li>• <strong>National Syllabus:</strong> Bangladesh Medical & Dental Council (BM&DC) MBBS Curriculum</li>
                </ul>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-300 uppercase tracking-wide">
                  2. CLINICAL GUIDELINES & PROTOCOLS
                </div>
                <ul className="space-y-1 text-slate-400">
                  <li>• European Society of Cardiology (ESC) 2023 ACS & Valvular Guidelines</li>
                  <li>• Global Initiative for Asthma (GINA) 2024 Report</li>
                  <li>• Advanced Trauma Life Support (ATLS) 10th Edition</li>
                  <li>• WHO & Directorate General of Health Services (DGHS) Bangladesh Dengue Clinical Protocol</li>
                </ul>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-300 uppercase tracking-wide">
                  3. ANATOMICAL & CONCEPTUAL MODEL ACCURACY
                </div>
                <p className="text-slate-400 leading-relaxed">
                  3D anatomical meshes are mathematically mapped to clinical landmarks (e.g. coronary arteries, heart valves, conduction pathways). Procedural animations accurately depict anatomical planes and avoid aesthetic distortions.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowSourcesModal(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
