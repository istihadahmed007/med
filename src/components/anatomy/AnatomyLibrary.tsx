import React, { useState } from "react";
import {
  ANATOMY_MODELS,
  ALL_BODY_SYSTEMS,
  AnatomyModel,
} from "../../lib/anatomy/anatomy-models";
import { prefetchModel } from "../../lib/anatomy/model-prefetch";
import { AnatomySearch } from "./AnatomySearch";
import {
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";

interface AnatomyLibraryProps {
  activeModelId: string;
  onSelectModel: (model: AnatomyModel) => void;
  onOpenAttribution: () => void;
}

export const AnatomyLibrary: React.FC<AnatomyLibraryProps> = ({
  activeModelId,
  onSelectModel,
  onOpenAttribution,
}) => {
  const [selectedSystem, setSelectedSystem] = useState("All Systems");

  const filteredModels = ANATOMY_MODELS.filter((model) => {
    if (selectedSystem === "All Systems") return true;
    return model.system.toLowerCase().includes(selectedSystem.toLowerCase());
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Anatomical Specimen Library
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-med-accent-cyan/15 text-med-accent-cyan border border-med-accent-cyan/30">
              {ANATOMY_MODELS.length} Verified 3D Models
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authentic, peer-reviewed 3D human anatomy reconstructions with Terminologia Anatomica standard labelling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AnatomySearch
            onSelectModel={onSelectModel}
            activeModelId={activeModelId}
          />
          <button
            onClick={onOpenAttribution}
            className="text-xs px-3 py-2 rounded-xl bg-med-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600 transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
            title="View 3D Model Sources & Attribution"
          >
            <Info className="w-3.5 h-3.5 text-med-accent-cyan" />
            <span className="hidden sm:inline">Sources & Attribution</span>
          </button>
        </div>
      </div>

      {/* System Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {ALL_BODY_SYSTEMS.map((system) => (
          <button
            key={system}
            onClick={() => setSelectedSystem(system)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
              selectedSystem === system
                ? "bg-med-accent-blue text-white shadow-glow-blue"
                : "bg-med-900/70 text-slate-400 hover:text-slate-200 hover:bg-med-850 border border-slate-800"
            }`}
          >
            {system}
          </button>
        ))}
      </div>

      {/* Specimen Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredModels.map((model) => {
          const isActive = model.id === activeModelId;

          return (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              onMouseEnter={() => prefetchModel(model.model)}
              onFocus={() => prefetchModel(model.model)}
              tabIndex={0}
              role="button"
              className={`group relative p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${
                isActive
                  ? "bg-med-850/90 border-med-accent-cyan/60 shadow-glow-cyan"
                  : "bg-med-900/60 hover:bg-med-850/70 border-slate-800 hover:border-slate-700/80 hover:shadow-lg"
              }`}
            >
              <div>
                {/* Thumbnail Image Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-3 flex items-center justify-center">
                  {model.thumbnail ? (
                    <img
                      src={model.thumbnail}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-1 p-4">
                      <Layers className="w-8 h-8 opacity-40" />
                      <span className="text-[10px]">3D Model</span>
                    </div>
                  )}

                  {/* 3D Badge */}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-med-950/85 backdrop-blur-md text-med-accent-cyan border border-med-accent-cyan/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    3D GLB
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/90 text-white shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Active
                    </span>
                  )}
                </div>

                {/* Organ Name & Latin Name */}
                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-med-accent-cyan transition-colors">
                    {model.name}
                  </h3>
                  {model.scientificName && (
                    <span className="text-[11px] font-serif italic text-slate-400">
                      {model.scientificName}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {model.system}
                </p>

                {/* Brief description */}
                <p className="text-xs text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>
              </div>

              {/* Card Footer: Hotspots count & view action */}
              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-[10px] text-slate-400">
                  {model.hotspots?.length || 0} Pin Structures
                </span>
                <span className="flex items-center gap-0.5 text-med-accent-cyan group-hover:translate-x-0.5 transition-transform font-medium">
                  Inspect 3D
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
