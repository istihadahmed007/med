import React, { useState } from 'react';
import { DrugGeneric, DrugInteraction, InteractionCheckResponse } from '../../types/drug';
import { DrugClientService } from '../../services/drugService';

interface InteractionCheckerModalProps {
  initialGenericId?: string;
  allGenerics: DrugGeneric[];
  onClose: () => void;
  onOpenGeneric: (id: string) => void;
}

export const InteractionCheckerModal: React.FC<InteractionCheckerModalProps> = ({
  initialGenericId,
  allGenerics,
  onClose,
  onOpenGeneric
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialGenericId ? [initialGenericId] : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [checkResult, setCheckResult] = useState<InteractionCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const availableGenerics = allGenerics.filter(
    g => !selectedIds.includes(g.id) &&
      (g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (g.nameBn && g.nameBn.includes(searchTerm)))
  );

  const handleAddDrug = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setSearchTerm('');
      setCheckResult(null);
    }
  };

  const handleRemoveDrug = (id: string) => {
    setSelectedIds(selectedIds.filter(item => item !== id));
    setCheckResult(null);
  };

  const handleRunCheck = async () => {
    if (selectedIds.length < 2) return;
    setLoading(true);
    try {
      const res = await DrugClientService.checkInteractions(selectedIds);
      setCheckResult(res);
    } catch (e) {
      console.error('Interaction evaluation failed', e);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'major':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'minor':
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="interaction-modal-title">
      <div className="monograph-content-card max-w-3xl">
        {/* Header Bar */}
        <div className="monograph-header-bar">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Safety Reference Tool
              </span>
              <span className="text-xs text-slate-400">BM&DC / WHO Standards</span>
            </div>
            <h2 id="interaction-modal-title" className="mt-1 flex items-center gap-2">
              <span>⚡</span> Multi-Drug Interaction Checker
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Evaluates pharmacokinetic and pharmacodynamic interactions among concurrent medications.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="monograph-body-content space-y-5">
          {/* Selected Medicine Chips */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Selected Medicines ({selectedIds.length})
            </label>
            {selectedIds.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                No medicines selected yet. Search and add at least 2 medicines to evaluate drug interactions.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedIds.map(id => {
                  const gen = allGenerics.find(g => g.id === id);
                  return (
                    <div
                      key={id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-sm font-semibold text-white shadow-sm"
                    >
                      <span>{gen ? gen.name : id}</span>
                      <button
                        onClick={() => handleRemoveDrug(id)}
                        className="text-slate-400 hover:text-rose-400 transition ml-1 text-xs"
                        aria-label={`Remove ${id}`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search to add medicine */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Type to search and add generic medicine..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 transition"
            />
            {searchTerm && availableGenerics.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl max-h-48 overflow-y-auto shadow-2xl z-20">
                {availableGenerics.slice(0, 8).map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleAddDrug(g.id)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-600/20 text-sm text-slate-200 border-b border-slate-800 last:border-none flex justify-between items-center transition"
                  >
                    <div>
                      <div className="font-bold text-white">{g.name}</div>
                      <div className="text-xs text-slate-400">{g.pharmacologicalClass}</div>
                    </div>
                    <span className="text-xs text-sky-400 font-semibold">+ Add</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Evaluate Action Button */}
          <div>
            <button
              onClick={handleRunCheck}
              disabled={selectedIds.length < 2 || loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Evaluating Combinations...</span>
              ) : (
                <span>Check Interactions for {selectedIds.length} Medicines →</span>
              )}
            </button>
          </div>

          {/* Results Area */}
          {checkResult && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* Duplicate Therapy Warnings */}
              {checkResult.duplicateBrandWarnings && checkResult.duplicateBrandWarnings.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs space-y-1">
                  <div className="font-bold text-sm flex items-center gap-1.5 text-amber-300">
                    <span>⚠️</span> Duplicate Active Ingredient Alert
                  </div>
                  {checkResult.duplicateBrandWarnings.map((dup, i) => (
                    <p key={i}>{dup.message}</p>
                  ))}
                </div>
              )}

              {/* Interaction List */}
              {checkResult.interactions.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Documented Clinical Interactions ({checkResult.interactions.length})
                  </div>

                  {checkResult.interactions.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="font-bold text-white text-base">
                          <span className="text-sky-400">{item.genericA}</span>
                          <span className="text-slate-400 mx-2">⚡</span>
                          <span className="text-indigo-400">{item.genericB}</span>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getSeverityBadgeClass(
                            item.severity
                          )}`}
                        >
                          {item.severity} Severity
                        </span>
                      </div>

                      <div className="text-sm text-slate-200">
                        <span className="text-xs font-semibold text-slate-400 uppercase block">Clinical Effect:</span>
                        {item.clinicalEffect}
                      </div>

                      <div className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border-l-2 border-sky-400">
                        <strong>Pharmacological Mechanism:</strong> {item.mechanism}
                      </div>

                      <div className="text-xs text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30">
                        <strong>Recommended Clinical Management:</strong> {item.management}
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                        <span>Source: {item.evidenceSource}</span>
                        <span>Reviewed: {item.reviewedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : checkResult.dataStatus === 'insufficient_data' ? (
                <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 text-left">
                  <div className="text-amber-300 font-bold text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-base">⚠️</span> Insufficient Interaction Data for Evaluated Selection
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed mb-2.5">
                    {checkResult.disclaimer || 'One or more of the selected medicines are draft catalog records awaiting formal clinical monograph review. Absence of documented interactions in this unreviewed dataset does NOT confirm safety.'}
                  </p>
                  {checkResult.unreviewedGenerics && checkResult.unreviewedGenerics.length > 0 && (
                    <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-amber-400">Records Awaiting Review:</strong>{' '}
                      <span className="capitalize">{checkResult.unreviewedGenerics.join(', ')}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-emerald-400 font-bold text-sm mb-1">
                    ✓ No Documented Interaction in Reviewed Dataset
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                    {checkResult.disclaimer}
                  </p>
                </div>
              )}

              {/* Mandatory Negative Clinical Safety Disclaimer */}
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-slate-400 leading-relaxed">
                <strong>Safety Governance Protocol:</strong> Interaction absence does not guarantee complete metabolic safety. Always account for patient renal function (eGFR), electrolyte balance, hepatic status, and concomitant OTC remedies.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
