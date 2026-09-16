import React from 'react';
import { AnatomicalStructure } from '../../types';
import { X, ExternalLink, BookOpen, Activity, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface StructureInfoPanelProps {
  structure: AnatomicalStructure | null;
  onClose: () => void;
  onNavigateToCase?: (caseId: string) => void;
  onStartViva?: (structureId: string) => void;
}

export const StructureInfoPanel: React.FC<StructureInfoPanelProps> = ({
  structure,
  onClose,
  onNavigateToCase,
  onStartViva,
}) => {
  if (!structure) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] glass-panel-elevated rounded-2xl p-6 overflow-y-auto z-20 flex flex-col border border-cyan-500/30 shadow-glow-cyan animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
            {structure.organ} • {structure.system}
          </span>
          <h2 className="text-2xl font-bold text-white mt-2 leading-tight">
            {structure.name}
          </h2>
          {structure.latinName && (
            <p className="text-xs italic text-slate-400 mt-0.5">
              {structure.latinName}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content sections */}
      <div className="space-y-5 py-4 text-sm flex-1">
        {/* Location & Function */}
        <div>
          <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Anatomical Location & Function
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed mb-2">
            {structure.location}
          </p>
          <p className="text-slate-200 text-xs font-medium bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
            {structure.function}
          </p>
        </div>

        {/* Blood & Nerve Supply */}
        <div className="grid grid-cols-1 gap-2.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
          <div>
            <span className="text-xs font-medium text-rose-400">Arterial & Venous Supply:</span>
            <p className="text-xs text-slate-300 mt-0.5">{structure.bloodSupply}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-amber-400">Innervation:</span>
            <p className="text-xs text-slate-300 mt-0.5">{structure.nerveSupply}</p>
          </div>
        </div>

        {/* Anatomical Relations */}
        {structure.relations && Object.keys(structure.relations).length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
              Anatomical Relations
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.entries(structure.relations).map(([relKey, relValue]) => {
                if (!relValue) return null;
                return (
                  <div key={relKey} className="text-xs bg-slate-900/40 p-2 rounded-lg border border-slate-800/80 text-slate-300">
                    <span className="font-semibold text-cyan-400 capitalize mr-1.5">{relKey}:</span>
                    <span>{relValue}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Clinical Relevance */}
        <div className="bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-xl">
          <h3 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            BM&DC Clinical Pearl
          </h3>
          <p className="text-xs text-rose-100/90 leading-relaxed">
            {structure.clinicalRelevance || structure.clinicalImportance}
          </p>
          {(structure.associatedDiseases || structure.commonConditions || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {(structure.associatedDiseases || structure.commonConditions || []).map((d, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-rose-900/50 text-rose-200 border border-rose-500/40">
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Viva Questions */}
        {(structure.vivaQuestions || structure.mbbsExamPoints || []).length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Frequently Asked Viva Questions
            </h3>
            <div className="space-y-2">
              {(structure.vivaQuestions || structure.mbbsExamPoints || []).map((q, idx) => (
                <div key={idx} className="text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                  <span className="font-semibold text-amber-400 mr-1.5">Q{idx + 1}:</span>
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-cyan-500/20 flex flex-col gap-2">
        <button
          onClick={() => onStartViva && onStartViva(structure.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
        >
          <Activity className="w-4 h-4" />
          Test in AI Viva Examiner
        </button>
      </div>
    </div>
  );
};
