import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  Archive,
  Edit3,
  Trash2,
  ShieldCheck,
  Search,
  Filter,
  FileText,
  AlertTriangle,
  Send,
  Save,
} from 'lucide-react';
import { STUDY_SUBJECTS } from '../../data/studyMaterialsData';
import { ContentVerificationStatus } from '../../types/study';
import '../study/studyMaterials.css';

interface ManagedContentRecord {
  id: string;
  title: string;
  type: 'subject' | 'unit' | 'topic' | 'medicine' | 'document';
  subjectName: string;
  authorName: string;
  source: string;
  createdDate: string;
  lastUpdated: string;
  status: ContentVerificationStatus;
  summary: string;
}

const INITIAL_MANAGED_RECORDS: ManagedContentRecord[] = [
  {
    id: 'rec-01',
    title: 'Pharmacology: Diuretics (Loop, Thiazide & K-Sparing)',
    type: 'topic',
    subjectName: 'Pharmacology',
    authorName: 'Dr. Tariqul Islam (Assistant Prof, DMC)',
    source: 'Rang & Dale Pharmacology 9th Ed / Bangladesh National Formulary',
    createdDate: '2026-09-10',
    lastUpdated: '2026-09-20',
    status: 'verified',
    summary: 'Clinical mechanisms, nephron transport kinetics, and adverse electrolyte derangements.',
  },
  {
    id: 'rec-02',
    title: 'Anatomy: Brachial Plexus Trunks, Divisions & Cords',
    type: 'topic',
    subjectName: 'Anatomy',
    authorName: 'Dr. Nahid Sultana (Lecturer, DMC)',
    source: 'BD Chaurasia Human Anatomy Vol 1 (8th Ed)',
    createdDate: '2026-09-12',
    lastUpdated: '2026-09-18',
    status: 'needs_review',
    summary: 'Supraclavicular branches, motor innervation maps, and clinical injury patterns (Erb vs Klumpke).',
  },
  {
    id: 'rec-03',
    title: 'Medicine: Essential Hypertension Initial Pharmacotherapy Step 1-4',
    type: 'topic',
    subjectName: 'Medicine',
    authorName: 'Prof. M. A. Jalil (Cardiology Dept)',
    source: 'WHO 2021 Adult Hypertension Guidelines / NICE NG136',
    createdDate: '2026-09-14',
    lastUpdated: '2026-09-22',
    status: 'verified',
    summary: 'Threshold BP targets, ACEi vs ARB selection, calcium channel blockers, and thiazide diuretics.',
  },
  {
    id: 'rec-04',
    title: 'Pathology: Acute Appendicitis Pathophysiology & Complications',
    type: 'topic',
    subjectName: 'Pathology',
    authorName: 'Dr. Farhana Ahmed',
    source: 'Robbins & Cotran Pathologic Basis of Disease 10th Ed',
    createdDate: '2026-09-15',
    lastUpdated: '2026-09-15',
    status: 'incomplete',
    summary: 'Luminal obstruction, microbial invasion, mucosal ischemic gangrene, and perforation risk.',
  },
];

export const ContentManagement: React.FC = () => {
  const [records, setRecords] = useState<ManagedContentRecord[]>(() => {
    try {
      const stored = localStorage.getItem('medx_cms_records');
      return stored ? JSON.parse(stored) : INITIAL_MANAGED_RECORDS;
    } catch {
      return INITIAL_MANAGED_RECORDS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    type: 'subject' | 'unit' | 'topic' | 'medicine' | 'document';
    subjectName: string;
    authorName: string;
    source: string;
    summary: string;
    status: ContentVerificationStatus;
  }>({
    title: '',
    type: 'topic',
    subjectName: 'Pharmacology',
    authorName: '',
    source: '',
    summary: '',
    status: 'needs_review',
  });

  const saveRecordsToStorage = (newRecords: ManagedContentRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('medx_cms_records', JSON.stringify(newRecords));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.source) {
      alert('Title and Source reference are required.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newRecord: ManagedContentRecord = {
      id: `cms-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      subjectName: formData.subjectName,
      authorName: formData.authorName || 'Faculty Contributor',
      source: formData.source,
      createdDate: today,
      lastUpdated: today,
      status: formData.status,
      summary: formData.summary,
    };

    saveRecordsToStorage([newRecord, ...records]);
    setIsCreating(false);
    setFormData({
      title: '',
      type: 'topic',
      subjectName: 'Pharmacology',
      authorName: '',
      source: '',
      summary: '',
      status: 'needs_review',
    });
  };

  const handleStatusChange = (id: string, newStatus: ContentVerificationStatus) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = records.map(r => {
      if (r.id === id) {
        return { ...r, status: newStatus, lastUpdated: today };
      }
      return r;
    });
    saveRecordsToStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this content record?')) {
      saveRecordsToStorage(records.filter(r => r.id !== id));
    }
  };

  const filtered = records.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.authorName.toLowerCase().includes(q) ||
        r.subjectName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f4a]/90 via-[#071330]/90 to-[#040d21]/90 border border-blue-500/20 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                Faculty & Admin CMS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Medical Content Management System
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Author, verify, review, and publish study materials, medical topics, and drug monographs. Strict traceability prevents unverified content deployment.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreating ? 'Cancel' : 'Author New Content'}</span>
          </button>
        </div>
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4 shadow-2xl animate-fadeIn">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            Author New Study Material / Reference Entry
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-semibold block">Title / Topic Name *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Pharmacology: Beta-2 Agonists in Asthma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Content Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="topic">Study Topic</option>
                <option value="unit">Subject Unit / Chapter</option>
                <option value="subject">Subject</option>
                <option value="medicine">Drug Reference Monograph</option>
                <option value="document">Clinical Guideline / PDF</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Primary Subject</label>
              <select
                value={formData.subjectName}
                onChange={e => setFormData({ ...formData, subjectName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              >
                {STUDY_SUBJECTS.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.phase})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Author / Faculty Reviewer</label>
              <input
                type="text"
                value={formData.authorName}
                onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="e.g. Dr. A. Rahman (Associate Professor)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Verified Medical Source / Citation *</label>
              <input
                type="text"
                required
                value={formData.source}
                onChange={e => setFormData({ ...formData, source: e.target.value })}
                placeholder="e.g. British National Formulary 84 / WHO Guidelines"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-semibold block">Educational Overview / Summary</label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Summarize the core clinical learning objectives, indications, or anatomical landmarks..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Content Entry
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search managed topics, authors, sources, subjects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {['all', 'verified', 'needs_review', 'incomplete', 'archived'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Managed Records Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Title & Overview</th>
              <th className="py-3 px-3">Subject / Type</th>
              <th className="py-3 px-3">Author & Source</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map(record => (
              <tr key={record.id} className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 space-y-1">
                  <span className="font-bold text-white block text-sm">{record.title}</span>
                  <p className="text-slate-400 line-clamp-1 text-[11px]">{record.summary}</p>
                  <span className="text-[10px] text-slate-500 font-mono">Updated: {record.lastUpdated}</span>
                </td>

                <td className="py-3.5 px-3 space-y-1">
                  <span className="text-white font-medium block">{record.subjectName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-cyan-300 border border-slate-700 inline-block">
                    {record.type}
                  </span>
                </td>

                <td className="py-3.5 px-3 space-y-1">
                  <span className="text-slate-300 font-semibold block">{record.authorName}</span>
                  <span className="text-slate-400 text-[11px] block line-clamp-1" title={record.source}>
                    Source: {record.source}
                  </span>
                </td>

                <td className="py-3.5 px-3">
                  <select
                    value={record.status}
                    onChange={e => handleStatusChange(record.id, e.target.value as ContentVerificationStatus)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none capitalize ${
                      record.status === 'verified'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                        : record.status === 'needs_review'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                        : record.status === 'incomplete'
                        ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <option value="verified">Verified</option>
                    <option value="needs_review">Needs Review</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
