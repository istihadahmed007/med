import React, { useState } from 'react';
import { UserRole } from '../../types';
import { StorageService } from '../../services/storageService';
import { ShieldCheck, Plus, CheckCircle2, Clock, XCircle, FileText, AlertCircle, Users, Settings } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'Clinical Case' | 'OSPE Station' | 'Treatment Algorithm' | '3D Anatomy Asset';
  authorName: string;
  submittedDate: string;
  status: 'Draft' | 'Under Faculty Review' | 'Approved' | 'Published';
  reviewerName?: string;
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
  const [currentRole, setCurrentRole] = useState<UserRole>(StorageService.getRole());
  const [items, setItems] = useState<ContentItem[]>(SAMPLE_CONTENT_PIPELINE);
  const [activeTab, setActiveTab] = useState<'review' | 'create' | 'audit'>('review');

  // Form State for creating new item
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Clinical Case' | 'OSPE Station' | 'Treatment Algorithm'>('Clinical Case');

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    StorageService.setRole(role);
  };

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Published', reviewerName: 'Prof. Reviewer (Approved)' } : item
      )
    );
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ContentItem = {
      id: `cnt-${Date.now()}`,
      title: newTitle,
      type: newType as any,
      authorName: 'Dr. Istihad Ahmed (Faculty Contributor)',
      submittedDate: '15 Sept 2026',
      status: 'Under Faculty Review',
      reviewerName: 'Assigned for Peer Review'
    };

    setItems([newItem, ...items]);
    setNewTitle('');
    setActiveTab('review');
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
            Academic Content Review & Authoring Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Author and review clinical cases, OSPE stations, and treatment algorithms under the BM&DC peer review workflow.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-slate-800">
          {(['student', 'faculty', 'reviewer', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                currentRole === r
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'review'
              ? 'bg-purple-600 text-white shadow-glow-blue'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Review Pipeline ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'create'
              ? 'bg-purple-600 text-white shadow-glow-blue'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Author New Module
        </button>
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
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
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
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Module to Faculty Peer Review</span>
          </button>
        </form>
      )}
    </div>
  );
};
