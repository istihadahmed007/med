import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { AuthService } from '../../services/authService';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import { 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  AlertCircle, 
  Users, 
  Settings,
  GraduationCap,
  ShieldAlert
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'Clinical Case' | 'OSPE Station' | 'Treatment Algorithm' | '3D Anatomy Asset';
  authorName: string;
  submittedDate: string;
  status: 'Draft' | 'Under Faculty Review' | 'Approved' | 'Published';
  reviewerName?: string;
}

interface FacultyApplicant {
  userId: string;
  fullName: string;
  email: string;
  institution: string;
  bmdcReg?: string;
  reason?: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const SAMPLE_CONTENT_PIPELINE: ContentItem[] = [
  {
    id: 'cnt-01',
    title: 'Acute Decompensated Heart Failure (Warm & Wet vs Cold & Wet)',
    type: 'Clinical Case',
    authorName: 'Dr. Tariqul Islam (Assistant Prof, DMC)',
    submittedDate: '12 Sept 2026',
    status: 'Approved',
    reviewerName: 'Prof. M. A. Jalil'
  },
  {
    id: 'cnt-02',
    title: 'Anatomy OSPE: Cranial Nerve Foramina of Skull Base',
    type: 'OSPE Station',
    authorName: 'Dr. Nahid Sultana (Lecturer, Anatomy)',
    submittedDate: '14 Sept 2026',
    status: 'Under Faculty Review',
    reviewerName: 'Pending Review'
  },
  {
    id: 'cnt-03',
    title: 'DKA Management Algorithm in Pediatric Patients',
    type: 'Treatment Algorithm',
    authorName: 'Dr. Farhana Ahmed (Registrar, Paediatrics)',
    submittedDate: '14 Sept 2026',
    status: 'Published',
    reviewerName: 'Prof. S. K. Roy'
  }
];

export const FacultyAdminPortal: React.FC = () => {
  const currentRole = AuthService.getRole();
  const profile = AuthService.getProfile();
  const [items, setItems] = useState<ContentItem[]>(SAMPLE_CONTENT_PIPELINE);
  const [applicants, setApplicants] = useState<FacultyApplicant[]>([
    {
      userId: 'usr-app-01',
      fullName: 'Dr. Rafiqul Hassan',
      email: 'rafiqul.hassan@dmc.edu.bd',
      institution: 'Dhaka Medical College',
      bmdcReg: 'A-49821',
      reason: 'Assistant Professor of Medicine teaching 4th & 5th year MBBS students.',
      appliedDate: '24 Sept 2026',
      status: 'pending'
    }
  ]);
  const [activeTab, setActiveTab] = useState<'review' | 'create' | 'applicants'>('review');

  // Form State for creating new item
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Clinical Case' | 'OSPE Station' | 'Treatment Algorithm'>('Clinical Case');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    // If Supabase is configured and caller is admin, fetch real applicants from faculty_applications table
    if (isSupabaseConfigured() && currentRole === 'admin') {
      supabase
        .from('faculty_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped: FacultyApplicant[] = data.map((d: any) => ({
              userId: d.user_id,
              fullName: d.full_name,
              email: d.email,
              institution: d.institution,
              bmdcReg: d.bmdc_reg,
              reason: d.reason,
              appliedDate: new Date(d.created_at).toLocaleDateString(),
              status: d.status
            }));
            setApplicants(mapped);
          }
        });
    }
  }, [currentRole]);

  const handleApprove = (id: string) => {
    const reviewer = profile?.full_name || 'Academic Reviewer';
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Published', reviewerName: `${reviewer} (Approved)` } : item
      )
    );
    setActionFeedback(`Module approved and published to BM&DC student curriculum.`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleApproveFaculty = async (applicant: FacultyApplicant) => {
    if (isSupabaseConfigured()) {
      await AuthService.approveFacultyRole(applicant.userId, 'Approved via Faculty Governance Portal');
    }
    setApplicants((prev) =>
      prev.map((a) => (a.userId === applicant.userId ? { ...a, status: 'approved' } : a))
    );
    setActionFeedback(`Faculty applicant ${applicant.fullName} has been approved as Medical Faculty.`);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleRejectFaculty = (applicant: FacultyApplicant) => {
    setApplicants((prev) =>
      prev.map((a) => (a.userId === applicant.userId ? { ...a, status: 'rejected' } : a))
    );
    setActionFeedback(`Faculty application for ${applicant.fullName} declined.`);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const author = profile?.full_name || 'Faculty Contributor';
    const newItem: ContentItem = {
      id: `cnt-${Date.now()}`,
      title: newTitle,
      type: newType,
      authorName: `${author} (${profile?.institution || 'Medical Faculty'})`,
      submittedDate: 'Just now',
      status: 'Under Faculty Review',
      reviewerName: 'Assigned for Peer Review'
    };

    setItems([newItem, ...items]);
    setNewTitle('');
    setActiveTab('review');
    setActionFeedback('New module authored and submitted into the BM&DC peer review pipeline.');
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            Faculty & Curriculum Governance Portal
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Academic Content Review & Governance Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Author and peer-review clinical cases, OSPE stations, and treatment algorithms under BM&DC guidelines.
          </p>
        </div>

        {/* Verified Role Badge (No client-controlled switching) */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <div className="text-left">
            <div className="text-[11px] font-mono text-purple-200 font-bold uppercase tracking-wider">
              Verified Session
            </div>
            <div className="text-xs text-purple-300 font-semibold capitalize">
              {currentRole} Role Enforced
            </div>
          </div>
        </div>
      </div>

      {actionFeedback && (
        <div role="status" className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'review'
              ? 'bg-purple-600 text-white shadow-glow-blue'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Review Pipeline ({items.length})
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'create'
              ? 'bg-purple-600 text-white shadow-glow-blue'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Author New Module
        </button>

        {currentRole === 'admin' && (
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applicants'
                ? 'bg-purple-600 text-white shadow-glow-blue'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty Applications ({applicants.filter(a => a.status === 'pending').length} pending)</span>
          </button>
        )}
      </div>

      {/* Tab 1: Review Pipeline */}
      {activeTab === 'review' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-purple-500/20 space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-500/30">
                      {item.type}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold border ${
                      item.status === 'Published'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : item.status === 'Approved'
                        ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                        : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Submitted by: {item.authorName} • Date: {item.submittedDate} • Reviewer: {item.reviewerName || 'Unassigned'}
                  </p>
                </div>

                {/* Faculty Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {item.status !== 'Published' && (currentRole === 'reviewer' || currentRole === 'admin' || currentRole === 'faculty') && (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Create Module */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreateItem} className="glass-panel-elevated p-6 rounded-2xl border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Author New Medical Module
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Module Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Acute Appendicitis: Alvarado Scoring & Pre-Op Workup"
                className="w-full bg-slate-950 border border-slate-800 focus:border-purple-400 rounded-xl p-3 text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Module Type:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-purple-400 rounded-xl p-3 text-white outline-none"
              >
                <option value="Clinical Case">Clinical Virtual Patient Case</option>
                <option value="OSPE Station">OSPE Practical Station</option>
                <option value="Treatment Algorithm">Treatment Decision Algorithm</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Module to Faculty Peer Review</span>
          </button>
        </form>
      )}

      {/* Tab 3: Faculty Applications (Admin Only) */}
      {activeTab === 'applicants' && currentRole === 'admin' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Faculty Access Requests & Administrative Governance
          </h3>
          <p className="text-xs text-slate-400">
            Review submitted medical college teaching credentials. Approving promotes the user account from student to verified faculty contributor.
          </p>

          <div className="space-y-3 pt-2">
            {applicants.map((applicant) => (
              <div
                key={applicant.userId}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{applicant.fullName}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      applicant.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : applicant.status === 'rejected'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {applicant.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {applicant.institution} {applicant.bmdcReg && `• BM&DC Reg: ${applicant.bmdcReg}`} • Applied: {applicant.appliedDate}
                  </p>
                  {applicant.reason && (
                    <p className="text-xs text-purple-200/90 italic">
                      &ldquo;{applicant.reason}&rdquo;
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 font-mono">
                    Email: {applicant.email}
                  </p>
                </div>

                {applicant.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApproveFaculty(applicant)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Role</span>
                    </button>
                    <button
                      onClick={() => handleRejectFaculty(applicant)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
