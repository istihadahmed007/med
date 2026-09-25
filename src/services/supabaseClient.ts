import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  institution: string;
  mbbs_phase: string;
  role: UserRole;
  faculty_status: 'none' | 'pending' | 'approved' | 'rejected';
  faculty_request_reason?: string;
  bmdc_reg_number?: string;
  created_at?: string;
  updated_at?: string;
}

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseAnonKey.startsWith('your_') &&
    supabaseAnonKey.length > 20
  );
};

// Safe client instantiation: if not configured yet, create client with dummy values so calls don't crash
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key-medx-unconfigured',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'medx_supabase_auth_session'
    }
  }
);
