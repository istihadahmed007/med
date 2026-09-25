import { supabase, isSupabaseConfigured, UserProfile } from './supabaseClient';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { UserRole } from '../types';

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  institution: string;
  mbbsPhase: string;
  requestFaculty?: boolean;
  facultyReason?: string;
  bmdcRegNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  needsEmailConfirmation?: boolean;
  user?: User | null;
  profile?: UserProfile | null;
}

type AuthStateListener = (event: AuthChangeEvent, session: Session | null, profile: UserProfile | null) => void;

class AuthServiceClass {
  private currentSession: Session | null = null;
  private currentProfile: UserProfile | null = null;
  private listeners: Set<AuthStateListener> = new Set();
  private isInitialized = false;

  constructor() {
    this.initAuth();
  }

  private async initAuth() {
    if (!isSupabaseConfigured()) {
      this.isInitialized = true;
      return;
    }

    try {
      const { data } = await supabase.auth.getSession();
      this.currentSession = data.session;
      if (data.session?.user) {
        this.currentProfile = await this.fetchProfile(data.session.user.id);
      }
    } catch (e) {
      console.warn('AuthService: Failed to restore session on boot', e);
    } finally {
      this.isInitialized = true;
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      this.currentSession = session;
      if (session?.user) {
        this.currentProfile = await this.fetchProfile(session.user.id);
      } else {
        this.currentProfile = null;
      }
      this.notifyListeners(event, session, this.currentProfile);
    });
  }

  public subscribe(listener: AuthStateListener): () => void {
    this.listeners.add(listener);
    if (this.isInitialized) {
      listener('INITIAL_SESSION' as AuthChangeEvent, this.currentSession, this.currentProfile);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(event: AuthChangeEvent, session: Session | null, profile: UserProfile | null) {
    this.listeners.forEach((listener) => {
      try {
        listener(event, session, profile);
      } catch (err) {
        console.error('Error in auth state listener', err);
      }
    });
  }

  public async fetchProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        // Fallback: If trigger hasn't fired yet or row missing, construct base profile from user metadata
        const user = this.currentSession?.user;
        if (user && user.id === userId) {
          return {
            id: user.id,
            email: user.email || '',
            full_name: (user.user_metadata?.full_name as string) || (user.email?.split('@')[0] ?? 'Medical Student'),
            institution: (user.user_metadata?.institution as string) || 'Not Specified',
            mbbs_phase: (user.user_metadata?.mbbs_phase as string) || 'Phase 1: 1st & 2nd Year (Pre-clinical)',
            role: 'student',
            faculty_status: (user.user_metadata?.request_faculty === 'true' ? 'pending' : 'none')
          };
        }
        return null;
      }

      return data as UserProfile;
    } catch (e) {
      console.warn('AuthService: Failed to fetch profile', e);
      return null;
    }
  }

  public static validateRegistration(formData: Partial<SignUpData>): string | null {
    const fullName = (formData.fullName || '').trim();
    const email = (formData.email || '').trim();
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';
    const institution = (formData.institution || '').trim();
    const mbbsPhase = (formData.mbbsPhase || '').trim();

    if (!fullName || fullName.length < 2) {
      return 'Full name is required and must contain at least 2 characters.';
    }

    // Medical college email domain is NOT required; valid email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    if (!institution) {
      return 'Medical college or institution is required.';
    }

    if (!mbbsPhase) {
      return 'MBBS year/phase is required.';
    }

    return null;
  }

  public validateRegistration(formData: Partial<SignUpData>): string | null {
    return AuthServiceClass.validateRegistration(formData);
  }

  public async signUp(formData: SignUpData): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase authentication is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file (see docs/supabase_setup.md).'
      };
    }

    // Comprehensive client validation
    const validationError = AuthServiceClass.validateRegistration(formData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const institution = formData.institution.trim();
    const mbbsPhase = formData.mbbsPhase.trim();

    try {
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : undefined;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            institution,
            mbbs_phase: mbbsPhase,
            request_faculty: formData.requestFaculty ? 'true' : 'false',
            faculty_request_reason: formData.facultyReason?.trim() || '',
            bmdc_reg_number: formData.bmdcRegNumber?.trim() || ''
          },
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Account creation failed. Please try again.' };
      }

      // Check if email confirmation is required (user created but session is null)
      const needsEmailConfirmation = !data.session;

      let profile: UserProfile | null = null;
      if (data.session?.user) {
        this.currentSession = data.session;
        profile = await this.fetchProfile(data.user.id);
        this.currentProfile = profile;
      }

      return {
        success: true,
        needsEmailConfirmation,
        user: data.user,
        profile
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred during signup.' };
    }
  }

  public async signInWithEmail(emailInput: string, passwordInput: string): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase authentication is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.'
      };
    }

    const email = emailInput.trim();
    const password = passwordInput;

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.session || !data.user) {
        return { success: false, error: 'Sign in failed. Could not create active session.' };
      }

      this.currentSession = data.session;
      const profile = await this.fetchProfile(data.user.id);
      this.currentProfile = profile;

      return {
        success: true,
        user: data.user,
        profile
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to sign in.' };
    }
  }

  public async signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase authentication is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.'
      };
    }

    try {
      const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        if (error.message.toLowerCase().includes('provider is not enabled') || error.message.toLowerCase().includes('unsupported provider')) {
          return {
            success: false,
            error: 'Google Sign-In is not enabled yet in your Supabase project. Please enable Google in Supabase Dashboard > Authentication > Providers, or register/sign in with Email & Password below.'
          };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to initiate Google sign-in.' };
    }
  }

  public async requestPasswordReset(emailInput: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase authentication is not configured yet. Please configure VITE_SUPABASE_URL in .env.'
      };
    }

    const email = emailInput.trim();
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    try {
      const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send password reset email.' };
    }
  }

  public async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase is not configured.'
      };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update password.' };
    }
  }

  public async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }

    this.currentSession = null;
    this.currentProfile = null;
    this.notifyListeners('SIGNED_OUT', null, null);
  }

  public async requestFacultyStatus(reason: string, bmdcReg?: string): Promise<{ success: boolean; error?: string }> {
    if (!this.currentSession?.user) {
      return { success: false, error: 'You must be signed in to request faculty access.' };
    }

    const user = this.currentSession.user;
    const profile = this.currentProfile;

    try {
      // Record application in faculty_applications table
      const { error: appError } = await supabase
        .from('faculty_applications')
        .upsert({
          user_id: user.id,
          full_name: profile?.full_name || 'Applicant',
          email: user.email || '',
          institution: profile?.institution || 'Medical College',
          bmdc_reg: bmdcReg || '',
          reason: reason.trim(),
          status: 'pending'
        }, { onConflict: 'user_id' });

      if (appError) {
        console.warn('Failed to insert faculty application row', appError);
      }

      // Update profile status to pending
      const { error: profError } = await supabase
        .from('profiles')
        .update({
          faculty_status: 'pending',
          faculty_request_reason: reason.trim(),
          bmdc_reg_number: bmdcReg?.trim() || null
        })
        .eq('id', user.id);

      if (profError) {
        return { success: false, error: profError.message };
      }

      if (this.currentProfile) {
        this.currentProfile.faculty_status = 'pending';
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to submit faculty access request.' };
    }
  }

  public async approveFacultyRole(targetUserId: string, notes?: string): Promise<{ success: boolean; error?: string }> {
    if (!this.currentSession?.user || this.currentProfile?.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Only administrators can approve faculty status.' };
    }

    try {
      const { data, error } = await supabase.rpc('approve_faculty_application', {
        target_user_id: targetUserId,
        admin_notes: notes || 'Approved by system administrator'
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to approve faculty role.' };
    }
  }

  public getSession(): Session | null {
    return this.currentSession;
  }

  public getCurrentUser(): User | null {
    return this.currentSession?.user || null;
  }

  public getProfile(): UserProfile | null {
    return this.currentProfile;
  }

  public getRole(): UserRole {
    return this.currentProfile?.role || 'student';
  }

  public isAuthenticated(): boolean {
    return Boolean(this.currentSession?.user);
  }
}

export const AuthService = new AuthServiceClass();
