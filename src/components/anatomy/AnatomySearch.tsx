import React, { useState, useMemo } from "react";
import { Search, X, Layers, ExternalLink } from "lucide-react";
import { ANATOMY_MODELS, AnatomyModel } from "../../lib/anatomy/anatomy-models";
import { prefetchModel } from "../../lib/anatomy/model-prefetch";

interface AnatomySearchProps {
  onSelectModel: (model: AnatomyModel) => void;
  activeModelId: string;
}

export const AnatomySearch: React.FC<AnatomySearchProps> = ({
  onSelectModel,
  activeModelId,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return ANATOMY_MODELS.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchSystem = item.system.toLowerCase().includes(q);
      const matchLatin = item.scientificName?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCondition = item.conditions?.some((c) => c.toLowerCase().includes(q));
      const matchHotspot = item.hotspots?.some(
        (h) => h.label.toLowerCase().includes(q) || h.ta.toLowerCase().includes(q)
      );

      return matchName || matchSystem || matchLatin || matchDesc || matchCondition || matchHotspot;
    });
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search organs, structures, systems, conditions..."
          className="w-full pl-10 pr-9 py-2.5 bg-med-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-med-accent-cyan/60 focus:ring-1 focus:ring-med-accent-cyan/50 transition-all shadow-inner"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant search autocomplete dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 z-30 max-h-80 overflow-y-auto rounded-xl bg-med-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl divide-y divide-slate-800">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => prefetchModel(item.model)}
                onClick={() => {
                  onSelectModel(item);
                  setQuery("");
                  setIsOpen(false);
                }}
                className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  item.id === activeModelId
                    ? "bg-med-accent-cyan/15 hover:bg-med-accent-cyan/20"
                    : "hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover bg-slate-950 border border-slate-800"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                      <Layers className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-sm font-semibold text-white">{item.name}</h5>
                      {item.scientificName && (
                        <span className="text-xs text-slate-400 font-serif italic">
                          ({item.scientificName})
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{item.system}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    3D Ready
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">
              No anatomical models matched "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
