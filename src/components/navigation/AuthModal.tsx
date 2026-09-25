import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Mail,
  Building2,
  Lock,
  Calendar,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { UserRole } from '../../types';
import { AuthService, SignUpData } from '../../services/authService';
import { isSupabaseConfigured, UserProfile } from '../../services/supabaseClient';

export type AuthModalMode = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'account-details';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
  onAuthStateChanged?: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthStateChanged,
}) => {
  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up Form
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [mbbsPhase, setMbbsPhase] = useState('Phase 1: 1st & 2nd Year (Pre-clinical)');
  const [requestFaculty, setRequestFaculty] = useState(false);
  const [facultyReason, setFacultyReason] = useState('');
  const [bmdcRegNumber, setBmdcRegNumber] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Forgot / Reset Password Form
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Faculty Request (when signed in)
  const [applyReason, setApplyReason] = useState('');
  const [applyBmdc, setApplyBmdc] = useState('');
  const [showFacultyForm, setShowFacultyForm] = useState(false);

  // Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);

  // Current session/profile
  const [profile, setProfile] = useState<UserProfile | null>(AuthService.getProfile());
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      setEmailConfirmationRequired(false);
      const currProfile = AuthService.getProfile();
      setProfile(currProfile);
      if (AuthService.isAuthenticated() && initialMode !== 'reset-password') {
        setMode('account-details');
      } else {
        setMode(initialMode);
      }
    }
  }, [isOpen, initialMode]);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = AuthService.subscribe((event, session, userProfile) => {
      setProfile(userProfile);
      if (event === 'PASSWORD_RECOVERY') {
        setMode('reset-password');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const res = await AuthService.signInWithEmail(loginEmail, loginPassword);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to sign in. Please verify your email and password.');
      return;
    }

    setSuccessMessage('Signed in successfully! Welcome back to MEDX.');
    setProfile(res.profile || null);
    if (onAuthStateChanged && res.profile) {
      onAuthStateChanged(res.profile.role);
    }
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmailConfirmationRequired(false);

    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password fields.');
      return;
    }

    setLoading(true);

    const payload: SignUpData = {
      fullName,
      email: signupEmail,
      password: signupPassword,
      confirmPassword,
      institution,
      mbbsPhase,
      requestFaculty,
      facultyReason,
      bmdcRegNumber
    };

    const res = await AuthService.signUp(payload);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Account creation failed. Please review your entries.');
      return;
    }

    if (res.needsEmailConfirmation) {
      setEmailConfirmationRequired(true);
      setSuccessMessage(`Account created! A confirmation link has been sent to ${signupEmail}. Please verify your email to log in.`);
      return;
    }

    setSuccessMessage('Account created successfully! Welcome to MEDX.');
    setProfile(res.profile || null);
    if (onAuthStateChanged && res.profile) {
      onAuthStateChanged(res.profile.role);
    }
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    const res = await AuthService.signInWithGoogle();
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || 'Google sign-in could not be initiated.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const res = await AuthService.requestPasswordReset(resetEmail);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Could not send password reset email.');
      return;
    }

    setSuccessMessage(`Password reset link sent to ${resetEmail}. Check your inbox or spam folder.`);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await AuthService.updatePassword(newPassword);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to update password.');
      return;
    }

    setSuccessMessage('Password updated successfully! You may now sign in with your new password.');
    setTimeout(() => {
      setMode('login');
      setSuccessMessage(null);
    }, 1500);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await AuthService.signOut();
    setLoading(false);
    setProfile(null);
    if (onAuthStateChanged) {
      onAuthStateChanged('student');
    }
    onClose();
  };

  const handleFacultyRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyReason.trim()) {
      setErrorMessage('Please provide your academic department and teaching credentials.');
      return;
    }

    setLoading(true);
    const res = await AuthService.requestFacultyStatus(applyReason, applyBmdc);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to submit faculty access request.');
      return;
    }

    setSuccessMessage('Faculty access request submitted! Your application is pending review by the Academic Council.');
    setShowFacultyForm(false);
    const updated = await AuthService.fetchProfile(AuthService.getCurrentUser()?.id || '');
    setProfile(updated);
  };

  const mbbsPhaseOptions = [
    'Phase 1: 1st & 2nd Year (Pre-clinical)',
    'Phase 2: 3rd Year (Para-clinical)',
    'Phase 3: 4th Year (Para-clinical)',
    'Phase 4: 5th Year (Clinical)',
    'Intern Doctor (Post-MBBS)',
    'Medical Officer / Resident / Post-graduate',
    'Faculty / Medical Teacher'
  ];

  const configured = isSupabaseConfigured();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Account and Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#06172E] border border-[rgba(190,225,255,0.22)] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] p-5 sm:p-7 space-y-5 z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#08AFC1] to-[#10b981] p-[1.5px] shadow-[0_0_15px_rgba(8,175,193,0.4)] shrink-0">
              <div className="w-full h-full bg-[#06172E] rounded-[9px] flex items-center justify-center text-[#08AFC1]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#F5F9FF] font-sans tracking-tight">
                {mode === 'login' && 'Sign in to MEDX'}
                {mode === 'signup' && 'Create MEDX Account'}
                {mode === 'forgot-password' && 'Reset Your Password'}
                {mode === 'reset-password' && 'Set New Password'}
                {mode === 'account-details' && 'Your MEDX Profile'}
              </h2>
              <p className="text-xs text-[#8EACCF] font-sans">
                {mode === 'login' && 'Access personal revision decks, mistake logs, and bookmarks'}
                {mode === 'signup' && 'Register your verified student profile under Bangladesh BM&DC curriculum'}
                {mode === 'forgot-password' && 'Enter your account email to receive recovery instructions'}
                {mode === 'reset-password' && 'Choose a strong replacement password for your account'}
                {mode === 'account-details' && 'Authenticated user credentials and governance status'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-[#C4D4EA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Supabase unconfigured warning banner */}
        {!configured && (
          <div className="p-3.5 rounded-2xl bg-amber-950/70 border border-amber-500/40 text-xs text-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Supabase Backend Configuration Required</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-200/90">
              Live authentication requires Supabase environment variables. Set <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">VITE_SUPABASE_URL</code> and <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">VITE_SUPABASE_ANON_KEY</code> in your <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">.env</code> file. See <strong className="text-white">docs/supabase_setup.md</strong>.
            </p>
          </div>
        )}

        {/* Feedback Banners */}
        {errorMessage && (
          <div role="alert" className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div role="status" className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-200 flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{successMessage}</span>
          </div>
        )}

        {emailConfirmationRequired && (
          <div className="p-4 rounded-2xl bg-[#08AFC1]/15 border border-[#08AFC1]/40 text-xs text-cyan-100 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-[#08AFC1]">
              <Mail className="w-4 h-4" />
              <span>Email Confirmation Link Sent</span>
            </div>
            <p className="text-[11px] text-[#C4D4EA] leading-relaxed">
              We dispatched an activation link to <strong className="text-white">{signupEmail}</strong>. Click the link in your email to verify your address, then sign in below.
            </p>
            <button
              onClick={() => {
                setMode('login');
                setEmailConfirmationRequired(false);
              }}
              className="text-xs text-[#08AFC1] hover:underline font-semibold cursor-pointer"
            >
              Proceed to Sign In &rarr;
            </button>
          </div>
        )}

        {/* View Mode Switcher (Login / Signup) */}
        {!isAuthenticated && (mode === 'login' || mode === 'signup') && (
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`min-h-[40px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-[#08AFC1] to-[#0694a2] text-[#06172E] shadow-sm'
                  : 'text-[#C4D4EA] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`min-h-[40px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-[#08AFC1] to-[#0694a2] text-[#06172E] shadow-sm'
                  : 'text-[#C4D4EA] hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* 1. SIGN IN VIEW */}
        {mode === 'login' && !isAuthenticated && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                  placeholder="name@example.com"
                />
                <Mail className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-xs font-medium text-[#C4D4EA]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot-password');
                    setResetEmail(loginEmail);
                    setErrorMessage(null);
                  }}
                  className="text-xs text-[#08AFC1] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full min-h-[44px] pl-10 pr-11 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                  placeholder="Enter your password"
                />
                <Lock className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8EACCF] hover:text-white transition-colors cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#06172E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,175,193,0.35)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Signing In…' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex items-center justify-center pt-2">
              <span className="w-full border-t border-white/10" />
              <span className="px-3 bg-[#06172E] text-[11px] font-mono text-[#8EACCF] uppercase">Or</span>
              <span className="w-full border-t border-white/10" />
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full min-h-[44px] px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-[#F5F9FF] text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>
        )}

        {/* 2. CREATE ACCOUNT VIEW */}
        {mode === 'signup' && !isAuthenticated && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label htmlFor="reg-fullname" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                  placeholder="e.g. Istihad Ahmed"
                />
                <User className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                Email Address
                <span className="text-[10px] text-[#8EACCF] font-normal ml-1.5">(Any academic or personal email accepted)</span>
              </label>
              <div className="relative">
                <input
                  id="reg-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                  placeholder="your.email@domain.com"
                />
                <Mail className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-password" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full min-h-[42px] pl-10 pr-10 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                    placeholder="Min 6 chars"
                  />
                  <Lock className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    aria-label="Toggle password view"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8EACCF] hover:text-white cursor-pointer"
                  >
                    {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="reg-confirm-password" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="reg-confirm-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                    placeholder="Repeat password"
                  />
                  <Lock className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="reg-institution" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                Medical College or Institution
              </label>
              <div className="relative">
                <input
                  id="reg-institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                  className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] placeholder:text-slate-500"
                  placeholder="e.g. Dhaka Medical College / DMC"
                />
                <Building2 className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-phase" className="text-xs font-medium text-[#C4D4EA] block mb-1">
                MBBS Year / Phase
              </label>
              <div className="relative">
                <select
                  id="reg-phase"
                  value={mbbsPhase}
                  onChange={(e) => setMbbsPhase(e.target.value)}
                  className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-[#091f3a] border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                >
                  {mbbsPhaseOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#06172E] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <Calendar className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Optional Faculty Request Flag */}
            <div className="pt-1.5 border-t border-white/10 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#C4D4EA] select-none">
                <input
                  type="checkbox"
                  checked={requestFaculty}
                  onChange={(e) => setRequestFaculty(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-white/5 text-[#08AFC1] focus:ring-[#08AFC1]"
                />
                <span>I am a medical teacher / faculty applicant requesting contributor access</span>
              </label>

              {requestFaculty && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Faculty Verification Workflow</span>
                  </div>
                  <p className="text-[11px] text-purple-200/80 leading-tight">
                    New accounts strictly receive the <strong>Student</strong> role. Your faculty application will remain <em>pending</em> until verified and approved by the Academic Administrator.
                  </p>
                  <input
                    type="text"
                    value={bmdcRegNumber}
                    onChange={(e) => setBmdcRegNumber(e.target.value)}
                    placeholder="BM&DC Registration Number (optional)"
                    className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black/30 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    value={facultyReason}
                    onChange={(e) => setFacultyReason(e.target.value)}
                    placeholder="Academic Department & Teaching Role (e.g. Lecturer, Anatomy)"
                    className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black/30 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#06172E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,175,193,0.35)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Creating Profile…' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD VIEW */}
        {mode === 'forgot-password' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
                Registered Account Email
              </label>
              <div className="relative">
                <input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                  placeholder="name@example.com"
                />
                <Mail className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-xs text-[#8EACCF] hover:text-white transition-colors cursor-pointer"
              >
                &larr; Back to Sign In
              </button>

              <button
                type="submit"
                disabled={loading}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#06172E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(8,175,193,0.3)] transition-all cursor-pointer disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Sending…' : 'Send Recovery Link'}</span>
              </button>
            </div>
          </form>
        )}

        {/* 4. SET NEW PASSWORD VIEW (after clicking recovery link) */}
        {mode === 'reset-password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
                New Password (Minimum 6 characters)
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                  placeholder="Enter new password"
                />
                <Lock className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-new-password" className="text-xs font-medium text-[#C4D4EA] block mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F5F9FF] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1]"
                  placeholder="Repeat new password"
                />
                <Lock className="w-4 h-4 text-[#8EACCF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#06172E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,175,193,0.35)] transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{loading ? 'Saving…' : 'Update Password & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 5. ACCOUNT DETAILS VIEW (Signed-in User) */}
        {mode === 'account-details' && isAuthenticated && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {profile?.full_name || AuthService.getCurrentUser()?.email?.split('@')[0] || 'Medical Learner'}
                  </h3>
                  <p className="text-xs text-[#8EACCF]">
                    {AuthService.getCurrentUser()?.email}
                  </p>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  profile?.role === 'admin'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : profile?.role === 'faculty' || profile?.role === 'reviewer'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-[#08AFC1]/20 text-[#08AFC1] border border-[#08AFC1]/40'
                }`}>
                  {profile?.role || 'student'}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 text-xs space-y-1 text-[#C4D4EA]">
                <div><strong className="text-white">Institution:</strong> {profile?.institution || 'Not configured'}</div>
                <div><strong className="text-white">MBBS Phase:</strong> {profile?.mbbs_phase || 'Phase 1'}</div>
                {profile?.faculty_status === 'pending' && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>Faculty Contributor application is pending Academic Administrator review.</span>
                  </div>
                )}
                {profile?.faculty_status === 'approved' && (
                  <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Verified Medical Faculty Contributor.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Request Faculty Status (for students) */}
            {profile?.role === 'student' && profile?.faculty_status !== 'pending' && (
              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">Are you a medical faculty member?</span>
                  <button
                    type="button"
                    onClick={() => setShowFacultyForm(!showFacultyForm)}
                    className="text-xs text-[#08AFC1] hover:underline cursor-pointer"
                  >
                    {showFacultyForm ? 'Cancel' : 'Request Faculty Access'}
                  </button>
                </div>

                {showFacultyForm && (
                  <form onSubmit={handleFacultyRequestSubmit} className="pt-2 space-y-2.5 animate-fadeIn">
                    <input
                      type="text"
                      value={applyBmdc}
                      onChange={(e) => setApplyBmdc(e.target.value)}
                      placeholder="BM&DC Reg Number (e.g. A-54123)"
                      className="w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-black/30 border border-purple-500/40 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                    <textarea
                      value={applyReason}
                      onChange={(e) => setApplyReason(e.target.value)}
                      required
                      placeholder="Academic Department, Medical College, and teaching designation"
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-black/30 border border-purple-500/40 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[38px] rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{loading ? 'Submitting…' : 'Submit Faculty Verification Request'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
