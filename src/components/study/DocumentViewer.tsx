import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Bookmark,
  BookmarkCheck,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye,
  Filter,
} from 'lucide-react';
import './studyMaterials.css';

export interface MedicalDocument {
  id: string;
  title: string;
  subject: string;
  category: 'curriculum' | 'guideline' | 'pharmacopoeia' | 'protocol';
  sourceOrganization: string;
  publicationYear: number;
  fileUrl: string;
  pageCount: number;
  downloadPermitted: boolean;
  summary: string;
}

const VERIFIED_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'bmdc-curriculum-mbbs',
    title: 'BM&DC MBBS Curriculum & Examination Regulations',
    subject: 'General / Governance',
    category: 'curriculum',
    sourceOrganization: 'Bangladesh Medical & Dental Council (BM&DC)',
    publicationYear: 2021,
    fileUrl: '/docs/bmdc-mbbs-curriculum.pdf',
    pageCount: 184,
    downloadPermitted: true,
    summary: 'Official curriculum framework for MBBS course across all four phases in Bangladesh medical colleges.',
  },
  {
    id: 'dgda-national-formulary',
    title: 'National Formulary of Bangladesh — Core Reference',
    subject: 'Pharmacology',
    category: 'pharmacopoeia',
    sourceOrganization: 'Directorate General of Drug Administration (DGDA)',
    publicationYear: 2022,
    fileUrl: '/docs/dgda-national-formulary.pdf',
    pageCount: 312,
    downloadPermitted: true,
    summary: 'Standard reference formulary of approved generic and active pharmaceutical agents in Bangladesh.',
  },
  {
    id: 'who-hypertension-guidelines',
    title: 'WHO Guideline for Pharmacological Treatment of Hypertension in Adults',
    subject: 'Medicine',
    category: 'guideline',
    sourceOrganization: 'World Health Organization (WHO)',
    publicationYear: 2021,
    fileUrl: 'https://iris.who.int/bitstream/handle/10665/344424/971240034440-eng.pdf',
    pageCount: 72,
    downloadPermitted: true,
    summary: 'Evidence-based recommendations on initiation of pharmacotherapy, blood pressure thresholds, and drug combination classes.',
  },
  {
    id: 'who-asthma-management',
    title: 'GINA Global Strategy for Asthma Management and Prevention',
    subject: 'Medicine',
    category: 'guideline',
    sourceOrganization: 'Global Initiative for Asthma (GINA)',
    publicationYear: 2023,
    fileUrl: 'https://ginasthma.org/wp-content/uploads/2023/07/GINA-2023-Pocket-Guide-WMS.pdf',
    pageCount: 44,
    downloadPermitted: true,
    summary: 'Practical clinical guideline for the assessment, symptom control, and stepped pharmacotherapy of bronchial asthma.',
  },
  {
    id: 'dgda-essential-drugs-list',
    title: 'National Essential Drugs List of Bangladesh (NEDL)',
    subject: 'Pharmacology',
    category: 'pharmacopoeia',
    sourceOrganization: 'Ministry of Health and Family Welfare Bangladesh',
    publicationYear: 2022,
    fileUrl: '/docs/bangladesh-essential-drugs-list.pdf',
    pageCount: 28,
    downloadPermitted: true,
    summary: 'Gazette prioritized essential medications for primary, secondary, and tertiary health delivery levels in Bangladesh.',
  },
  {
    id: 'who-surgical-safety-checklist',
    title: 'WHO Surgical Safety Checklist Implementation Manual',
    subject: 'Surgery',
    category: 'protocol',
    sourceOrganization: 'World Health Organization (WHO) Patient Safety',
    publicationYear: 2020,
    fileUrl: 'https://iris.who.int/bitstream/handle/10665/44186/9789241598590_eng.pdf',
    pageCount: 32,
    downloadPermitted: true,
    summary: 'Standard 3-phase surgical checklist (Sign In, Time Out, Sign Out) for operating theater safety.',
  },
];

export const DocumentViewer: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPageBookmarks, setSavedPageBookmarks] = useState<Record<string, number[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem('medx_doc_bookmarks') || '{}');
    } catch {
      return {};
    }
  });

  const subjects = ['all', 'General / Governance', 'Pharmacology', 'Medicine', 'Surgery'];

  const filteredDocs = VERIFIED_DOCUMENTS.filter(doc => {
    if (selectedSubject !== 'all' && doc.subject !== selectedSubject) return false;
    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.sourceOrganization.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleBookmarkPage = (docId: string, page: number) => {
    const next = { ...savedPageBookmarks };
    const current = next[docId] || [];
    if (current.includes(page)) {
      next[docId] = current.filter(p => p !== page);
    } else {
      next[docId] = [...current, page].sort((a, b) => a - b);
    }
    setSavedPageBookmarks(next);
    localStorage.setItem('medx_doc_bookmarks', JSON.stringify(next));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f4a]/90 via-[#071330]/90 to-[#040d21]/90 border border-blue-500/20 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                Official Clinical Documents
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Medical Documents & Clinical Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Verified clinical guidelines, BM&DC regulations, WHO manuals, and national formularies. All documents comply with fair educational reference standards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Verified Public Domain
            </span>
          </div>
        </div>
      </div>

      {/* Reader Modal / View */}
      {selectedDoc ? (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <button
              onClick={() => setSelectedDoc(null)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Document Catalog
            </button>

            <div className="flex items-center gap-2">
              {selectedDoc.downloadPermitted && (
                <a
                  href={selectedDoc.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              )}
            </div>
          </div>

          {/* Document Header */}
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
              {selectedDoc.category}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{selectedDoc.title}</h2>
            <p className="text-xs text-slate-400">
              Source: <strong className="text-slate-300">{selectedDoc.sourceOrganization}</strong> • Published {selectedDoc.publicationYear} • {selectedDoc.pageCount} pages
            </p>
          </div>

          {/* Embedded Viewer Container */}
          <div className="w-full h-[650px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative shadow-inner">
            <iframe
              src={`${selectedDoc.fileUrl}#toolbar=1&navpanes=0`}
              title={selectedDoc.title}
              className="w-full h-full border-0"
            />
          </div>

          {/* Document Footer Disclaimer */}
          <p className="text-[11px] text-slate-500 italic">
            This document is hosted for educational purposes under fair use. Copyright remains with {selectedDoc.sourceOrganization}.
          </p>
        </div>
      ) : (
        <>
          {/* Controls Bar: Search & Subject Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search guidelines, documents, issuing organizations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {subjects.map(subj => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                    selectedSubject === subj
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {subj === 'all' ? 'All Subjects' : subj}
                </button>
              ))}
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-4 group shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                      {doc.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {doc.publicationYear}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                    {doc.sourceOrganization}
                  </span>

                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
