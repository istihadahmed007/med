import React from "react";
import {
  RotateCcw,
  Play,
  Pause,
  Maximize,
  Minimize,
  Sliders,
  MapPin,
  Box,
  ListFilter,
} from "lucide-react";

export type SlicePlaneType = "sagittal" | "axial" | "coronal";

interface AnatomyControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
  crossSection: boolean;
  onToggleCrossSection: () => void;
  crossSectionValue: number;
  onChangeCrossSection: (val: number) => void;
  crossSectionPlane?: SlicePlaneType;
  onChangeCrossSectionPlane?: (plane: SlicePlaneType) => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  showHotspots: boolean;
  onToggleShowHotspots: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  landmarksOpen?: boolean;
  onToggleLandmarks?: () => void;
  hotspotCount?: number;
}

export const AnatomyControls: React.FC<AnatomyControlsProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onResetCamera,
  crossSection,
  onToggleCrossSection,
  crossSectionValue,
  onChangeCrossSection,
  crossSectionPlane = "sagittal",
  onChangeCrossSectionPlane,
  wireframe,
  onToggleWireframe,
  showHotspots,
  onToggleShowHotspots,
  isFullscreen,
  onToggleFullscreen,
  landmarksOpen = false,
  onToggleLandmarks,
  hotspotCount = 0,
}) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
      {/* Left tool cluster */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-med-900/90 backdrop-blur-md border border-slate-700/60 shadow-glass">
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

        {onToggleLandmarks && hotspotCount > 0 && (
          <button
            onClick={onToggleLandmarks}
            title={landmarksOpen ? "Hide Landmarks List" : "Show Landmarks Guide"}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              landmarksOpen
                ? "bg-cyan-500/25 text-cyan-300 border border-cyan-500/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Guide</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-cyan-300 font-mono">
              {hotspotCount}
            </span>
          </button>
        )}

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

      {/* Cross-section depth slider and plane picker when active */}
      {crossSection && (
        <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-med-900/95 backdrop-blur-md border border-amber-500/40 shadow-glass animate-in fade-in duration-200">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-medium text-amber-400">Plane:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-900 text-[10px]">
              {(["sagittal", "axial", "coronal"] as SlicePlaneType[]).map((plane) => (
                <button
                  key={plane}
                  onClick={() => onChangeCrossSectionPlane?.(plane)}
                  className={`px-2 py-0.5 capitalize transition-colors ${
                    crossSectionPlane === plane
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {plane === "sagittal" ? "Sagittal (X)" : plane === "axial" ? "Axial (Y)" : "Coronal (Z)"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400">Slice:</span>
            <input
              type="range"
              min="-1.9"
              max="1.9"
              step="0.05"
              value={crossSectionValue}
              onChange={(e) => onChangeCrossSection(parseFloat(e.target.value))}
              className="w-20 sm:w-28 accent-amber-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-amber-300 w-8 text-right">
              {crossSectionValue.toFixed(1)}
            </span>
          </div>
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
