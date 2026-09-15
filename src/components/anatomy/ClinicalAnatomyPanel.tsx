import React from 'react';
import { 
  Activity, 
  Stethoscope, 
  Search, 
  Award, 
  Pill, 
  ArrowRight, 
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';

interface ClinicalAnatomyPanelProps {
  structure: AnatomicalStructure | null;
  onClose: () => void;
  onNavigateToCase?: (caseId: string) => void;
}

export const ClinicalAnatomyPanel: React.FC<ClinicalAnatomyPanelProps> = ({
  structure,
  onClose,
  onNavigateToCase
}) => {
  if (!structure) return null;

  const conn = structure.clinicalConnections;

  return (
    <div className="w-full md:w-[420px] glass-panel-elevated rounded-2xl border border-emerald-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/95 flex flex-col max-h-[85vh] overflow-hidden pointer-events-auto transition-all animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-emerald-950/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Clinical Correlation
            </div>
            <div className="text-sm font-bold text-white truncate">
              {structure.name}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
        {/* Primary Clinical Significance */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Core Clinical Principle:
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {structure.clinicalImportance || structure.clinicalRelevance}
          </p>
        </div>

        {/* 1. Pathology & Associated Diseases */}
        {structure.commonConditions && structure.commonConditions.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              Pathology & Common Diseases
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {structure.commonConditions.map((condition, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 2. Bedside Physical Examination */}
        {conn?.clinicalExam && (
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              Bedside Clinical Signs & Examination
            </h4>
            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
              {conn.clinicalExam.map((exam, idx) => (
                <li key={idx} className="leading-relaxed">{exam}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Diagnostic Investigations */}
        {conn?.investigations && (
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-sky-400 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Investigations & Imaging
            </h4>
            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
              {conn.investigations.map((inv, idx) => (
                <li key={idx} className="leading-relaxed">{inv}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Surgical Procedures */}
        {conn?.procedures && (
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Operative & Interventional Procedures
            </h4>
            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
              {conn.procedures.map((proc, idx) => (
                <li key={idx} className="leading-relaxed">{proc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. Medical Management */}
        {conn?.management && (
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5" />
              Pharmacotherapy & Management
            </h4>
            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
              {conn.management.map((mgmt, idx) => (
                <li key={idx} className="leading-relaxed">{mgmt}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      {onNavigateToCase && (
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end">
          <button
            onClick={() => onNavigateToCase(structure.id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            Launch Virtual Clinical Case
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
