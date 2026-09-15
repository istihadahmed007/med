import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Layers, 
  Sliders, 
  RotateCcw, 
  ShieldAlert, 
  Heart, 
  Wind, 
  Brain, 
  Utensils, 
  Droplet, 
  Bone, 
  Activity, 
  Feather, 
  Sparkles, 
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AnatomicalSystemId, SystemLayerState } from '../../types/anatomy';

interface AnatomyLayerPanelProps {
  layers: Record<AnatomicalSystemId, SystemLayerState>;
  onToggleVisibility: (id: AnatomicalSystemId) => void;
  onToggleIsolate: (id: AnatomicalSystemId) => void;
  onChangeOpacity: (id: AnatomicalSystemId, opacity: number) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  onResetLayers: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const SYSTEM_ICONS: Record<AnatomicalSystemId, React.ComponentType<{ className?: string }>> = {
  skin: Feather,
  skeletal: Bone,
  articular: ShieldAlert,
  muscular: Activity,
  cardiovascular: Heart,
  nervous: Brain,
  respiratory: Wind,
  digestive: Utensils,
  urinary: Droplet,
  reproductive: Users,
  lymphatic: Sparkles
};

export const AnatomyLayerPanel: React.FC<AnatomyLayerPanelProps> = ({
  layers,
  onToggleVisibility,
  onToggleIsolate,
  onChangeOpacity,
  onShowAll,
  onHideAll,
  onResetLayers,
  isOpen,
  onToggleOpen
}) => {
  const layerList = Object.values(layers);

  return (
    <div className={`transition-all duration-300 pointer-events-auto ${isOpen ? 'w-80' : 'w-14'}`}>
      <div className="glass-panel rounded-2xl border border-sky-500/20 shadow-2xl backdrop-blur-xl bg-slate-950/85 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Panel Header */}
        <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <button 
            onClick={onToggleOpen}
            className="flex items-center gap-2.5 text-left w-full text-slate-200 hover:text-cyan-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            {isOpen && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">System Layers</div>
                <div className="text-[11px] text-slate-400 truncate">10 Anatomical Systems</div>
              </div>
            )}
          </button>

          {isOpen && (
            <button
              onClick={onToggleOpen}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              title="Collapse Panel"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>

        {isOpen && (
          <>
            {/* Quick Bulk Actions */}
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between gap-1.5 text-[11px] bg-slate-900/30">
              <button
                onClick={onShowAll}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                Show All
              </button>
              <button
                onClick={onHideAll}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                Hide All
              </button>
              <button
                onClick={onResetLayers}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                title="Reset opacities and visibility"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Systems Scrollable List */}
            <div className="p-2.5 space-y-2 overflow-y-auto custom-scrollbar flex-1">
              {layerList.map((layer) => {
                const IconComponent = SYSTEM_ICONS[layer.id] || Layers;
                return (
                  <div
                    key={layer.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      layer.isolated
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-glow-amber'
                        : layer.visible
                        ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div 
                          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 border"
                          style={{ 
                            backgroundColor: `${layer.color}20`,
                            borderColor: `${layer.color}60`,
                            color: layer.color
                          }}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1.5">
                            {layer.name}
                            {layer.isolated && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/30 text-amber-300 font-bold">
                                SOLO
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {layer.structureCount} structures
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Isolate (Solo) Button */}
                        <button
                          onClick={() => onToggleIsolate(layer.id)}
                          className={`px-1.5 py-1 rounded text-[10px] font-bold transition-colors border ${
                            layer.isolated
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
                          }`}
                          title="Isolate this system"
                        >
                          SOLO
                        </button>

                        {/* Visibility Toggle */}
                        <button
                          onClick={() => onToggleVisibility(layer.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            layer.visible
                              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25'
                              : 'bg-slate-800/60 border-slate-850 text-slate-500 hover:text-slate-300'
                          }`}
                          title={layer.visible ? 'Hide System' : 'Show System'}
                        >
                          {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Opacity Slider (visible only if layer is visible) */}
                    {layer.visible && (
                      <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 shrink-0">Opacity</span>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.05"
                          value={layer.opacity}
                          onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <span className="text-[10px] text-slate-400 font-mono w-7 text-right shrink-0">
                          {Math.round(layer.opacity * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
