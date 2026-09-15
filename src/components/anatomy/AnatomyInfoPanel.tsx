import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Activity, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  Stethoscope, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Crosshair,
  ChevronRight,
  Droplets,
  Zap,
  BookOpen
} from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';

interface AnatomyInfoPanelProps {
  structure: AnatomicalStructure | null;
  onClose: () => void;
  onFocus3D: (structure: AnatomicalStructure) => void;
  onIsolate3D: (structure: AnatomicalStructure) => void;
  onStartViva?: (structureId: string) => void;
  onOpenClinicalCase?: (caseId: string) => void;
}

import { ANATOMY_METADATA } from './AnatomyMetadata';
import { Volume2 } from 'lucide-react';

export const AnatomyInfoPanel: React.FC<AnatomyInfoPanelProps> = ({
  structure,
  onClose,
  onFocus3D,
  onIsolate3D,
  onStartViva,
  onOpenClinicalCase
}) => {
  const [activeTab, setActiveTab] = useState<'morphology' | 'neurovascular' | 'exam' | 'clinical'>('morphology');

  if (!structure) return null;

  const meta = ANATOMY_METADATA[structure.id];
  const latin = structure.latinName || meta?.latinName;

  const handlePronounce = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const text = latin || structure.name;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for clear anatomical diction
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full md:w-96 glass-panel-elevated rounded-2xl border border-sky-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/90 flex flex-col max-h-[85vh] overflow-hidden pointer-events-auto transition-all animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {structure.system}
            </span>
            <span className="text-[11px] text-slate-400 capitalize">
              {structure.region}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white leading-tight truncate">
              {structure.name}
            </h2>
            <button
              onClick={handlePronounce}
              className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors shrink-0"
              title="Pronounce Latin name"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {latin && (
            <p className="text-xs italic text-cyan-400/80 mt-0.5 font-serif">
              {latin}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Strip */}
      <div className="px-3 py-2 border-b border-slate-800/60 bg-slate-900/30 flex items-center justify-between gap-1.5 text-xs">
        <button
          onClick={() => onFocus3D(structure)}
          className="px-2.5 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 flex items-center gap-1 transition-colors font-medium text-[11px]"
        >
          <Crosshair className="w-3.5 h-3.5" />
          Focus 3D
        </button>

        <button
          onClick={() => onIsolate3D(structure)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors font-medium text-[11px]"
        >
          <Layers className="w-3.5 h-3.5" />
          Isolate
        </button>

        {onStartViva && (
          <button
            onClick={() => onStartViva(structure.id)}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1 transition-colors font-medium text-[11px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Viva
          </button>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="grid grid-cols-4 border-b border-slate-800 text-[11px] font-semibold bg-slate-950">
        <button
          onClick={() => setActiveTab('morphology')}
          className={`py-2 px-1 text-center transition-colors border-b-2 ${
            activeTab === 'morphology'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Anatomy
        </button>
        <button
          onClick={() => setActiveTab('neurovascular')}
          className={`py-2 px-1 text-center transition-colors border-b-2 ${
            activeTab === 'neurovascular'
              ? 'border-rose-400 text-rose-300 bg-rose-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Vessels/Nerves
        </button>
        <button
          onClick={() => setActiveTab('exam')}
          className={`py-2 px-1 text-center transition-colors border-b-2 ${
            activeTab === 'exam'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          MBBS Viva
        </button>
        <button
          onClick={() => setActiveTab('clinical')}
          className={`py-2 px-1 text-center transition-colors border-b-2 ${
            activeTab === 'clinical'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Clinical
        </button>
      </div>

      {/* Tab Content Container */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
        {/* TAB 1: MORPHOLOGY */}
        {activeTab === 'morphology' && (
          <div className="space-y-3.5">
            <div>
              <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Location & Boundaries
              </h3>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {structure.location}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Structure & Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {structure.structureDescription}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Physiological Function
              </h3>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {structure.function}
              </p>
            </div>

            {/* Anatomical Relations */}
            {structure.relations && (
              <div>
                <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Anatomical Relations
                </h3>
                <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                  {structure.relations.anterior && (
                    <div><span className="font-bold text-slate-400">Anterior:</span> <span className="text-slate-200">{structure.relations.anterior}</span></div>
                  )}
                  {structure.relations.posterior && (
                    <div><span className="font-bold text-slate-400">Posterior:</span> <span className="text-slate-200">{structure.relations.posterior}</span></div>
                  )}
                  {structure.relations.medial && (
                    <div><span className="font-bold text-slate-400">Medial:</span> <span className="text-slate-200">{structure.relations.medial}</span></div>
                  )}
                  {structure.relations.lateral && (
                    <div><span className="font-bold text-slate-400">Lateral:</span> <span className="text-slate-200">{structure.relations.lateral}</span></div>
                  )}
                  {structure.relations.superior && (
                    <div><span className="font-bold text-slate-400">Superior:</span> <span className="text-slate-200">{structure.relations.superior}</span></div>
                  )}
                  {structure.relations.inferior && (
                    <div><span className="font-bold text-slate-400">Inferior:</span> <span className="text-slate-200">{structure.relations.inferior}</span></div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEUROVASCULAR */}
        {activeTab === 'neurovascular' && (
          <div className="space-y-3.5">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-rose-950/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                <Droplets className="w-3.5 h-3.5" />
                Arterial Blood Supply
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {structure.bloodSupply}
              </p>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-blue-950/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                <Droplets className="w-3.5 h-3.5" />
                Venous Drainage
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {structure.venousDrainage}
              </p>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-amber-950/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Zap className="w-3.5 h-3.5" />
                Innervation / Nerve Supply
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {structure.innervation || structure.nerveSupply}
              </p>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-950/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Lymphatic Drainage
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {structure.lymphaticDrainage}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: MBBS EXAM & VIVA */}
        {activeTab === 'exam' && (
          <div className="space-y-3.5">
            {/* High-Yield Prof Questions */}
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-2">
                <Award className="w-4 h-4" />
                1st Prof Viva High-Yield Questions
              </div>
              <div className="space-y-2">
                {(structure.mbbsExamPoints || structure.vivaQuestions || []).map((q, idx) => (
                  <div key={idx} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-1">
                    <span className="font-bold text-amber-300">Q{idx + 1}: </span>
                    <span className="text-slate-200">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OSPE Spotting Notes */}
            {structure.ospeNotes && structure.ospeNotes.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs mb-2">
                  <BookOpen className="w-4 h-4" />
                  OSPE Spotting Identification Marks
                </div>
                <ul className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px] list-disc list-inside text-slate-300">
                  {structure.ospeNotes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CLINICAL CONNECTIONS */}
        {activeTab === 'clinical' && (
          <div className="space-y-3.5">
            <div>
              <h3 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                Clinical Relevance & Pathology
              </h3>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {structure.clinicalImportance || structure.clinicalRelevance}
              </p>
            </div>

            {structure.commonConditions && structure.commonConditions.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                  Common Clinical Conditions
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {structure.commonConditions.map((cond, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {structure.clinicalConnections && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                {structure.clinicalConnections.clinicalExam && (
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                    <div className="font-bold text-emerald-400 mb-1">Bedside Physical Examination:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                      {structure.clinicalConnections.clinicalExam.map((sign, idx) => (
                        <li key={idx}>{sign}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {structure.clinicalConnections.investigations && (
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                    <div className="font-bold text-sky-400 mb-1">Diagnostic Investigations:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                      {structure.clinicalConnections.investigations.map((inv, idx) => (
                        <li key={idx}>{inv}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
