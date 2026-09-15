import React from 'react';
import { 
  Compass, 
  RotateCcw, 
  Maximize2, 
  Scissors, 
  Layers, 
  Sliders, 
  Eye, 
  Crosshair, 
  SplitSquareVertical,
  Activity,
  Tag,
  Gauge,
  Sparkles
} from 'lucide-react';
import { CameraViewPreset } from '../../types/anatomy';
import { PerformanceTier } from './AnatomyPerformance';

interface AnatomyControlsProps {
  onSetCameraView: (preset: CameraViewPreset) => void;
  explodedAmount: number;
  onExplodedChange: (amount: number) => void;
  crossSectionEnabled: boolean;
  onToggleCrossSection: () => void;
  crossSectionPlane: 'axial' | 'sagittal' | 'coronal';
  onChangeCrossSectionPlane: (plane: 'axial' | 'sagittal' | 'coronal') => void;
  crossSectionDepth: number;
  onChangeCrossSectionDepth: (depth: number) => void;
  xrayMode: boolean;
  onToggleXray: () => void;
  onResetCamera: () => void;
  showLabels?: boolean;
  onToggleLabels?: () => void;
  performanceTier?: PerformanceTier;
  onChangePerformanceTier?: (tier: PerformanceTier) => void;
}

export const AnatomyControls: React.FC<AnatomyControlsProps> = ({
  onSetCameraView,
  explodedAmount,
  onExplodedChange,
  crossSectionEnabled,
  onToggleCrossSection,
  crossSectionPlane,
  onChangeCrossSectionPlane,
  crossSectionDepth,
  onChangeCrossSectionDepth,
  xrayMode,
  onToggleXray,
  onResetCamera,
  showLabels = true,
  onToggleLabels,
  performanceTier = 'AUTO',
  onChangePerformanceTier
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto max-w-full">
      {/* 1. Camera Orientation Presets */}
      <div className="glass-panel px-3 py-1.5 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-1 shadow-lg">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline flex items-center gap-1">
          <Compass className="w-3 h-3 text-cyan-400" />
          View
        </span>
        <button
          onClick={() => onSetCameraView('anterior')}
          className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors"
          title="Anterior (Frontal) View"
        >
          Ant
        </button>
        <button
          onClick={() => onSetCameraView('posterior')}
          className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors"
          title="Posterior (Dorsal) View"
        >
          Post
        </button>
        <button
          onClick={() => onSetCameraView('lateral-left')}
          className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors hidden xs:inline"
          title="Lateral (Left) View"
        >
          Lat L
        </button>
        <button
          onClick={() => onSetCameraView('lateral-right')}
          className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors hidden xs:inline"
          title="Lateral (Right) View"
        >
          Lat R
        </button>
        <button
          onClick={() => onSetCameraView('superior')}
          className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors hidden sm:inline"
          title="Superior (Cranial) View"
        >
          Sup
        </button>
        <button
          onClick={onResetCamera}
          className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
          title="Reset Camera Framing"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Interactive Exploded View Slider */}
      <div className="glass-panel px-3 py-1.5 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-2 shadow-lg">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:inline flex items-center gap-1">
          <SplitSquareVertical className="w-3 h-3 text-cyan-400" />
          Explode
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={explodedAmount}
          onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
          className="w-20 sm:w-28 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          title={`Exploded view: ${Math.round(explodedAmount * 100)}%`}
        />
        <span className="text-[10px] font-mono text-cyan-400 w-7 text-right">
          {Math.round(explodedAmount * 100)}%
        </span>
      </div>

      {/* 3. Medical X-Ray Mode Toggle */}
      <button
        onClick={onToggleXray}
        className={`glass-panel px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-[11px] font-semibold shadow-lg ${
          xrayMode
            ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            : 'bg-slate-950/80 border-sky-500/20 text-slate-300 hover:border-sky-500/40 hover:text-white'
        }`}
        title="Toggle Medical X-Ray Transparency"
      >
        <Activity className={`w-3.5 h-3.5 ${xrayMode ? 'text-cyan-300' : 'text-slate-400'}`} />
        <span>X-Ray</span>
      </button>

      {/* 4. Cross Section / Clinical Plane */}
      <div className="glass-panel px-2.5 py-1.5 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
        <button
          onClick={onToggleCrossSection}
          className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-all ${
            crossSectionEnabled
              ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
              : 'bg-slate-800/80 text-slate-300 hover:text-white'
          }`}
          title="Toggle Anatomical Cross-Section Cut"
        >
          <Scissors className="w-3 h-3" />
          <span>Section</span>
        </button>

        {crossSectionEnabled && (
          <div className="flex items-center gap-1 pl-1 border-l border-slate-800 animate-in fade-in duration-200">
            <button
              onClick={() => onChangeCrossSectionPlane('axial')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                crossSectionPlane === 'axial'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ax
            </button>
            <button
              onClick={() => onChangeCrossSectionPlane('sagittal')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                crossSectionPlane === 'sagittal'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sag
            </button>
            <button
              onClick={() => onChangeCrossSectionPlane('coronal')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                crossSectionPlane === 'coronal'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cor
            </button>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={crossSectionDepth}
              onChange={(e) => onChangeCrossSectionDepth(parseFloat(e.target.value))}
              className="w-14 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 ml-1"
            />
          </div>
        )}
      </div>

      {/* 5. Anatomical Labels Toggle */}
      {onToggleLabels && (
        <button
          onClick={onToggleLabels}
          className={`glass-panel px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 text-[11px] font-semibold shadow-lg ${
            showLabels
              ? 'bg-sky-500/20 border-sky-400 text-sky-300'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle 3D Anatomy Landmark Pins"
        >
          <Tag className="w-3 h-3" />
          <span className="hidden sm:inline">Pins</span>
        </button>
      )}

      {/* 6. Performance Tier */}
      {onChangePerformanceTier && (
        <div className="glass-panel px-2 py-1.5 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-1 text-[10px] text-slate-400 shadow-lg hidden lg:flex">
          <Gauge className="w-3 h-3 text-cyan-400" />
          <select
            value={performanceTier}
            onChange={(e) => onChangePerformanceTier(e.target.value as PerformanceTier)}
            className="bg-transparent text-slate-300 text-[10px] font-mono focus:outline-none cursor-pointer"
          >
            <option value="AUTO" className="bg-slate-900 text-white">AUTO</option>
            <option value="HIGH" className="bg-slate-900 text-white">HIGH (60fps)</option>
            <option value="MEDIUM" className="bg-slate-900 text-white">MED</option>
            <option value="LOW" className="bg-slate-900 text-white">LOW (30fps)</option>
          </select>
        </div>
      )}
    </div>
  );
};
