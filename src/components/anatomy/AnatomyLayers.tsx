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
  Crosshair
} from 'lucide-react';
import { AnatomicalSystemId, SystemLayerState } from '../../types/anatomy';

interface AnatomyLayersProps {
  layers: Record<AnatomicalSystemId, SystemLayerState>;
  onToggleVisibility: (id: AnatomicalSystemId) => void;
  onToggleIsolate: (id: AnatomicalSystemId) => void;
  onChangeOpacity: (id: AnatomicalSystemId, opacity: number) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  onResetLayers: () => void;
  onApplyPreset?: (preset: 'all' | 'visceral' | 'musculoskeletal' | 'neurovascular') => void;
  isOpen?: boolean;
  onToggleOpen?: () => void;
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

export const AnatomyLayers: React.FC<AnatomyLayersProps> = ({
  layers,
  onToggleVisibility,
  onToggleIsolate,
  onChangeOpacity,
  onShowAll,
  onHideAll,
  onResetLayers,
  onApplyPreset
}) => {
  const layerList: SystemLayerState[] = Object.values(layers) as SystemLayerState[];
  const anyIsolated = layerList.some((l) => l.isolated);

  return (
    <div className="w-full h-full flex flex-col p-3 bg-slate-950/90 text-slate-100 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Anatomical Layers
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onShowAll}
            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            All
          </button>
          <button
            onClick={onResetLayers}
            className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
            title="Reset default opacities"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick MBBS Clinical Presets */}
      {onApplyPreset && (
        <div className="grid grid-cols-2 gap-1.5 mb-3 pb-3 border-b border-slate-800/60">
          <button
            onClick={() => onApplyPreset('visceral')}
            className="px-2 py-1 rounded-lg text-[10px] font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-all text-left"
          >
            🫀 Visceral Organs
          </button>
          <button
            onClick={() => onApplyPreset('musculoskeletal')}
            className="px-2 py-1 rounded-lg text-[10px] font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all text-left"
          >
            🦴 Musculoskeletal
          </button>
          <button
            onClick={() => onApplyPreset('neurovascular')}
            className="px-2 py-1 rounded-lg text-[10px] font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all text-left"
          >
            ⚡ Neurovascular
          </button>
          <button
            onClick={() => onApplyPreset('all')}
            className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-left"
          >
            🌐 Full Anatomy
          </button>
        </div>
      )}

      {/* System Layers List */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {layerList.map((layer) => {
          const Icon = SYSTEM_ICONS[layer.id] || Layers;
          const isFaded = anyIsolated && !layer.isolated;

          return (
            <div
              key={layer.id}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                layer.isolated
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : layer.visible
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900/60 opacity-40'
              } ${isFaded ? 'opacity-30' : ''}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: layer.color }}
                  />
                  <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200 truncate">
                    {layer.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Solo / Isolate Toggle */}
                  <button
                    onClick={() => onToggleIsolate(layer.id)}
                    className={`p-1 rounded text-[10px] transition-colors ${
                      layer.isolated
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
                    }`}
                    title={layer.isolated ? 'Unisolate' : 'Isolate (Solo) this system'}
                  >
                    <Crosshair className="w-3 h-3" />
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => onToggleVisibility(layer.id)}
                    className={`p-1 rounded transition-colors ${
                      layer.visible
                        ? 'text-cyan-400 hover:bg-slate-800'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={layer.visible ? 'Hide layer' : 'Show layer'}
                  >
                    {layer.visible ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Opacity Slider */}
              {layer.visible && (
                <div className="flex items-center gap-2 pt-1">
                  <Sliders className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={layer.opacity}
                    onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <span className="text-[9px] font-mono text-slate-400 w-6 text-right">
                    {Math.round(layer.opacity * 100)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
