import React, { useState, useEffect } from 'react';
import { DrugGeneric, DrugComparisonMatrix } from '../../types/drug';
import { DrugClientService } from '../../services/drugService';

interface DrugComparisonModalProps {
  initialGenericIds?: string[];
  allGenerics: DrugGeneric[];
  onClose: () => void;
  onOpenGeneric: (id: string) => void;
}

export const DrugComparisonModal: React.FC<DrugComparisonModalProps> = ({
  initialGenericIds = [],
  allGenerics,
  onClose,
  onOpenGeneric
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialGenericIds.length >= 2 ? initialGenericIds.slice(0, 4) : ['enalapril', 'losartan']
  );
  const [preconfiguredList, setPreconfiguredList] = useState<any[]>([]);
  const [matrixData, setMatrixData] = useState<DrugComparisonMatrix | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    DrugClientService.getPreconfiguredComparisons().then(setPreconfiguredList);
  }, []);

  useEffect(() => {
    if (selectedIds.length >= 2) {
      loadComparison(selectedIds);
    }
  }, [selectedIds]);

  const loadComparison = async (ids: string[]) => {
    setLoading(true);
    try {
      const data = await DrugClientService.compareDrugs(ids);
      setMatrixData(data);
    } catch (e) {
      console.error('Comparison error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreconfigured = (genericIds: string[]) => {
    setSelectedIds(genericIds);
  };

  const handleAddGeneric = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setSearchTerm('');
    }
  };

  const handleRemoveGeneric = (id: string) => {
    if (selectedIds.length > 2) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  const availableGenerics = allGenerics.filter(
    g => !selectedIds.includes(g.id) &&
      (g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (g.nameBn && g.nameBn.includes(searchTerm)))
  );

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="compare-modal-title">
      <div className="monograph-content-card max-w-5xl">
        {/* Header Bar */}
        <div className="monograph-header-bar">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                Pharmacology Study Tool
              </span>
              <span className="text-xs text-slate-400">Side-by-Side Analysis (2-4 Drugs)</span>
            </div>
            <h2 id="compare-modal-title" className="mt-1 flex items-center gap-2">
              <span>⚖️</span> Drug-Class Comparative Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Compare molecular mechanisms, clinical ceiling efficacy, adverse profiles, and renal parameters.
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
          {/* High-Yield Preconfigured Presets */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              MBBS High-Yield Clinical Pairs (One-Click Load)
            </label>
            <div className="flex flex-wrap gap-2">
              {preconfiguredList.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectPreconfigured(item.genericIds)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    JSON.stringify(selectedIds.slice().sort()) === JSON.stringify(item.genericIds.slice().sort())
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-sky-400/50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Currently Selected Generic Chips & Search Adder */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400">
                Compared Generics ({selectedIds.length}/4) — Minimum 2, Maximum 4:
              </span>
              {selectedIds.length < 4 && (
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="+ Add another generic to compare..."
                    className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 w-64"
                  />
                  {searchTerm && availableGenerics.length > 0 && (
                    <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-lg max-h-48 overflow-y-auto shadow-2xl z-30">
                      {availableGenerics.slice(0, 6).map(g => (
                        <button
                          key={g.id}
                          onClick={() => handleAddGeneric(g.id)}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-600/20 text-xs text-slate-200 border-b border-slate-800 last:border-none flex justify-between"
                        >
                          <span className="font-semibold">{g.name}</span>
                          <span className="text-sky-400">+ Add</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedIds.map(id => {
                const gen = allGenerics.find(g => g.id === id);
                return (
                  <div
                    key={id}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/70 border border-blue-500/40 text-xs font-bold text-white"
                  >
                    <span>{gen ? gen.name : id}</span>
                    {selectedIds.length > 2 && (
                      <button
                        onClick={() => handleRemoveGeneric(id)}
                        className="text-slate-400 hover:text-rose-400 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preconfigured Clinical Verdict Summary if applicable */}
          {matrixData?.preconfiguredComparison && (
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wide mb-1">
                Clinical Key Difference Verdict
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {matrixData.preconfiguredComparison.clinicalVerdict}
              </p>
              <div className="mt-2 text-xs text-amber-300 font-semibold">
                Core Distinction: {matrixData.preconfiguredComparison.keyDifferencesSummary}
              </div>
            </div>
          )}

          {/* Comparison Matrix Table */}
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Loading structured comparative parameters...
            </div>
          ) : matrixData ? (
            <div className="comparison-table-wrapper">
              <table className="comparison-matrix-table">
                <thead>
                  <tr>
                    <th>Clinical Parameter</th>
                    {matrixData.comparedGenerics.map(g => (
                      <th key={g.id}>
                        <div className="text-base font-extrabold text-white">{g.name}</div>
                        {g.nameBn && <div className="text-xs text-sky-300 font-normal">{g.nameBn}</div>}
                        <button
                          onClick={() => onOpenGeneric(g.id)}
                          className="mt-1 text-[11px] text-sky-400 hover:underline block"
                        >
                          View Full Monograph →
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixData.matrixRows.map(row => (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      {row.values.map((val, idx) => (
                        <td key={idx} className="text-slate-300 text-xs leading-relaxed">
                          {val || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
