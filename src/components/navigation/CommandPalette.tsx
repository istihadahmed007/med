import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, Activity, Layers, Stethoscope, Pill, HelpCircle, FileText, X, ArrowRight } from 'lucide-react';
import { NavigationView } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: NavigationView) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  view: NavigationView;
  shortcut?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: 'across-books', title: 'Study a topic across books: connected reading, comparison and notes', category: 'Learn', view: 'across-books', shortcut: 'BOOKS' },
  { id: 'visual-engine', title: 'The Visual Medicine Engine (12-Step Continuous Journey)', category: 'Visual Engine', view: 'visual-engine', shortcut: 'VISUAL' },
  { id: '3d-heart', title: '3D Anatomy: Heart & Great Vessels', category: '3D Anatomy', view: '3d-anatomy', shortcut: '3D' },
  { id: '3d-brain', title: '3D Anatomy: Brain & Brainstem', category: '3D Anatomy', view: '3d-anatomy' },
  { id: 'histology-lab', title: 'Virtual Histology Lab: 4x-100x Objective & Split Comparison', category: 'Histology Lab', view: 'histology', shortcut: 'HISTO' },
  { id: 'cardiac-cycle', title: 'Cardiac Cycle & Synchronized Wiggers Diagram', category: 'Physiology Lab', view: 'physiology', shortcut: 'PHYS' },
  { id: 'athero-slider', title: 'Atherosclerosis Disease Transformation Slider', category: 'Pathology Lab', view: 'pathology', shortcut: 'PATH' },
  { id: 'normal-vs-abnormal', title: 'Normal vs Abnormal Dual Comparison Slider', category: 'Pathology Lab', view: 'comparison', shortcut: 'SPLIT' },
  { id: 'diagram-engine', title: 'Medical Diagram Engine: Cardiac Conduction & Circle of Willis', category: 'Diagrams', view: 'diagrams', shortcut: 'DIAG' },
  { id: 'surgery-procedures', title: 'Surgical Procedures: Laparoscopic Appendectomy & Chest Drain', category: 'Surgery & Skills', view: 'surgery', shortcut: 'SURG' },
  { id: 'textbook-reader', title: 'MBBS Digital Textbook & Clinical Pearl Annotations', category: 'Digital Textbook', view: 'textbook', shortcut: 'BOOK' },
  { id: 'furosemide-journey', title: 'Pharmacology: Loop Diuretic (Furosemide) Journey', category: 'Pharmacology', view: 'pharmacology', shortcut: 'PHARM' },
  { id: 'precordial-exam', title: 'Clinical Examination: Precordium Bedside Simulator', category: 'Clinical Examination', view: 'clinical-exam', shortcut: 'EXAM' },
  { id: 'ospe-stations', title: 'OSPE Practical Stations (Timed 3-Minute Stations)', category: 'Practical Lab', view: 'ospe', shortcut: 'OSPE' },
  { id: 'osce-stations', title: 'OSCE Clinical & Counseling Multi-Stations', category: 'Practical Lab', view: 'osce', shortcut: 'OSCE' },
  { id: 'case-stemi', title: 'Virtual Patient Case: Acute Anterior STEMI', category: 'Clinical Cases', view: 'cases', shortcut: 'CASE' },
  { id: 'case-asthma', title: 'Virtual Patient Case: Acute Severe Asthma', category: 'Clinical Cases', view: 'cases' },
  { id: 'ecg-viewer', title: '12-Lead ECG Calibrated Viewer & Ruler', category: 'Investigation Lab', view: 'investigations', shortcut: 'ECG' },
  { id: 'cxr-viewer', title: 'Digital Chest Radiograph (CXR) & Abnormality Challenge', category: 'Investigation Lab', view: 'investigations' },
  { id: 'treatment-asthma', title: 'Treatment Algorithm: Acute Severe Asthma BTS Protocol', category: 'Treatment', view: 'treatment', shortcut: 'RX' },
  { id: 'ai-viva', title: 'AI Viva Voce Oral Examiner (Progressive Difficulty)', category: 'AI Viva', view: 'ai-viva', shortcut: 'VIVA' },
  { id: 'ai-tutor', title: 'Verified AI Medical Tutor & Flowchart Generator', category: 'AI Tutor', view: 'ai-tutor' },
  { id: 'question-bank', title: 'BM&DC Single Best Answer (SBA) MCQs & SAQs', category: 'Question Bank', view: 'questions', shortcut: 'QBANK' },
  { id: 'progress', title: 'Personalized Learning Analytics & Weak Areas Radar', category: 'My Progress', view: 'progress' },
  { id: 'faculty-admin', title: 'Faculty Authoring & Content Peer Review Pipeline', category: 'Governance', view: 'faculty-admin' },
  { id: 'video-studio', title: 'Medical Video Library: 3D Organ Function, Surgical & Pathology Animations', category: 'Video Library', view: 'video-studio', shortcut: 'VIDEOS' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectView,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelectView(filtered[selectedIndex].view);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl glass-panel-elevated rounded-3xl border border-cyan-500/40 shadow-glow-cyan overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search subjects, 3D organs, cases, ECG, OSPE, or viva (Ctrl + K)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No medical modules or topics matched "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.view);
                    onClose();
                  }}
                  className={`px-4 py-3 rounded-2xl cursor-pointer text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-glow-cyan'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                      isSelected
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-slate-900 border-slate-800 text-cyan-400'
                    }`}>
                      {item.category}
                    </span>
                    <span className="font-semibold text-white">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800">
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation: <kbd className="px-1 py-0.5 bg-slate-900 rounded border border-slate-800 font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-slate-900 rounded border border-slate-800 font-mono">↓</kbd></span>
            <span>Select: <kbd className="px-1 py-0.5 bg-slate-900 rounded border border-slate-800 font-mono">↵</kbd></span>
          </div>
          <span>Esc to dismiss</span>
        </div>
      </div>
    </div>
  );
};
