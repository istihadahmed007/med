import React from "react";
import {
  RotateCcw,
  Play,
  Pause,
  Maximize,
  Minimize,
  Sliders,
  Eye,
  EyeOff,
  MapPin,
  Box,
} from "lucide-react";

interface AnatomyControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
  crossSection: boolean;
  onToggleCrossSection: () => void;
  crossSectionValue: number;
  onChangeCrossSection: (val: number) => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  showHotspots: boolean;
  onToggleShowHotspots: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const AnatomyControls: React.FC<AnatomyControlsProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onResetCamera,
  crossSection,
  onToggleCrossSection,
  crossSectionValue,
  onChangeCrossSection,
  wireframe,
  onToggleWireframe,
  showHotspots,
  onToggleShowHotspots,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
      {/* Left tool cluster */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-med-900/85 backdrop-blur-md border border-slate-700/60 shadow-glass">
        <button
          onClick={onToggleAutoRotate}
          title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
          className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            autoRotate
              ? "bg-med-accent-cyan/20 text-med-accent-cyan border border-med-accent-cyan/40"
              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Rotate</span>
        </button>

        <button
          onClick={onResetCamera}
          title="Reset Camera View"
          className="p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        <button
          onClick={onToggleShowHotspots}
          title={showHotspots ? "Hide Anatomical Pins" : "Show Anatomical Pins"}
          className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            showHotspots
              ? "bg-med-accent-blue/20 text-med-accent-blue border border-med-accent-blue/40"
              : "text-slate-400 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pins</span>
        </button>

        <button
          onClick={onToggleWireframe}
          title={wireframe ? "Solid Mesh Mode" : "Wireframe Mode"}
          className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            wireframe
              ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
              : "text-slate-400 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        <button
          onClick={onToggleCrossSection}
          title={crossSection ? "Disable Cross-Section" : "Enable Cross-Section"}
          className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            crossSection
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              : "text-slate-400 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Section</span>
        </button>
      </div>

      {/* Cross-section depth slider when active */}
      {crossSection && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-med-900/90 backdrop-blur-md border border-amber-500/40 shadow-glass animate-in fade-in duration-200">
          <span className="text-[11px] font-medium text-amber-400">Slice Plane:</span>
          <input
            type="range"
            min="-1.9"
            max="1.9"
            step="0.05"
            value={crossSectionValue}
            onChange={(e) => onChangeCrossSection(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-amber-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      )}

      {/* Right controls */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-med-900/85 backdrop-blur-md border border-slate-700/60 shadow-glass">
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
