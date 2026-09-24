import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  GraduationCap, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '../../types';
import { StorageService } from '../../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSignOut?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  onSignOut,
}) => {
  const [email, setEmail] = useState('istihad.ahmed@student.dmc.edu.bd');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid academic or medical email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    onRoleChange(selectedRole);
    setSuccessMessage(`Signed in successfully as ${selectedRole.toUpperCase()}`);
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 800);
  };

  const handleQuickPersona = (role: UserRole) => {
    setSelectedRole(role);
    onRoleChange(role);
    setSuccessMessage(`Switched active persona to ${role.toUpperCase()}`);
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 600);
  };

  const personas = [
    {
      id: 'student' as UserRole,
      title: 'MBBS Student',
      institution: 'Dhaka Medical College (Phase 4)',
      badge: 'Core Student',
      desc: 'Access to learning curriculum, question bank, 3D visual lab, and personal revision notes.'
    },
    {
      id: 'faculty' as UserRole,
      title: 'Medical Faculty',
      institution: 'BM&DC Academic Contributor',
      badge: 'Authoring',
      desc: 'Author clinical cases, submit educational videos, and review curriculum modules.'
    },
    {
      id: 'reviewer' as UserRole,
      title: 'External Medical Reviewer',
      institution: 'BM&DC Curriculum Governance',
      badge: 'Peer Review',
      desc: 'Perform formal peer review, verify medical guidelines, and authorize publications.'
    },
    {
      id: 'admin' as UserRole,
      title: 'System Administrator',
      institution: 'MEDX Technical & Content Admin',
      badge: 'Governance',
      desc: 'Manage textbook imports, drug databases, video processing daemon, and audit logs.'
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Account and Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#06172E] border border-[rgba(190,225,255,0.22)] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#08AFC1] to-[#10b981] p-[1.5px] shadow-[0_0_15px_rgba(8,175,193,0.4)]">
              <div className="w-full h-full bg-[#06172E] rounded-[9px] flex items-center justify-center text-[#08AFC1]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#F5F9FF] font-sans">
                MEDX Account & Persona
              </h2>
              <p className="text-xs text-[#8EACCF] font-sans">
                Authentic role authentication and governance persona
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-2 rounded-xl text-[#C4D4EA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback banners */}
        {errorMessage && (
          <div role="alert" className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div role="status" className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Role Persona Cards */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8EACCF] block">
            Select Active Medical Persona
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {personas.map((p) => {
              const isSelected = selectedRole === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickPersona(p.id)}
                  aria-pressed={isSelected}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer select-none flex flex-col justify-between gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#08AFC1]/20 to-[#0694a2]/10 border-[#08AFC1] shadow-[0_0_15px_rgba(8,175,193,0.3)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-[#F5F9FF]">{p.title}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-[#08AFC1] text-[#06172E]' : 'bg-white/10 text-[#8EACCF]'
                    }`}>
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#C4D4EA] line-clamp-2 leading-tight">
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSignIn} className="space-y-4 pt-2 border-t border-white/10">
          <div>
            <label htmlFor="auth-email" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
              BM&DC Registered Email / Student ID
            </label>
            <div className="relative">
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                placeholder="name@student.dmc.edu.bd"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full min-h-[44px] pl-3.5 pr-11 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8EACCF] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#08AFC1]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            {onSignOut && (
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            )}

            <button
              type="submit"
              className="flex-1 min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#06172E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,175,193,0.4)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ml-auto"
            >
              <span>Confirm & Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
