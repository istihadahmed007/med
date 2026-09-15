import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Tag, Activity, Sparkles, Volume2 } from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';
import { ANATOMY_METADATA, resolveAnatomyAlias } from './AnatomyMetadata';

interface AnatomySearchProps {
  structures: AnatomicalStructure[];
  onSelectStructure: (structure: AnatomicalStructure) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AnatomySearch: React.FC<AnatomySearchProps> = ({
  structures,
  onSelectStructure,
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    // Check alias resolution first
    const aliasResolvedId = resolveAnatomyAlias(q);

    return structures.filter((s) => {
      if (aliasResolvedId && s.id === aliasResolvedId) return true;
      const meta = ANATOMY_METADATA[s.id];
      const matchAlias = meta?.aliases?.some((a) => a.toLowerCase().includes(q));
      const matchName = s.name.toLowerCase().includes(q);
      const matchLatin = (s.latinName || meta?.latinName)?.toLowerCase().includes(q);
      const matchSystem = s.system.toLowerCase().includes(q);
      const matchCategory = s.category?.toLowerCase().includes(q);
      const matchConditions = s.commonConditions?.some((c) => c.toLowerCase().includes(q));
      const matchClinical = meta?.clinicalRelevance?.some((c) => c.toLowerCase().includes(q));

      return matchAlias || matchName || matchLatin || matchSystem || matchCategory || matchConditions || matchClinical;
    }).slice(0, 8);
  }, [query, structures]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl glass-panel-elevated rounded-2xl border border-sky-500/30 shadow-2xl bg-slate-950/95 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anatomy by name, Latin, aliases (e.g. renal, aorta, hepar)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-slate-800/60 p-2">
          {query && filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching anatomical structures found for "{query}".
            </div>
          )}

          {filtered.map((structure) => {
            const meta = ANATOMY_METADATA[structure.id];
            return (
              <div
                key={structure.id}
                onClick={() => {
                  onSelectStructure(structure);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-sky-950/40 hover:border-sky-500/30 border border-transparent transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {structure.system}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">
                      {structure.region}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {structure.name}
                  </h4>
                  {(structure.latinName || meta?.latinName) && (
                    <p className="text-xs text-cyan-400/80 italic font-serif">
                      {structure.latinName || meta?.latinName}
                    </p>
                  )}
                  {meta?.clinicalRelevance && meta.clinicalRelevance[0] && (
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      ⚠️ {meta.clinicalRelevance[0]}
                    </p>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
