import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Compass, 
  Layers, 
  Search, 
  BookOpen, 
  Award, 
  Stethoscope, 
  Sparkles, 
  HelpCircle, 
  Sliders, 
  Info,
  Maximize2,
  ChevronRight
} from 'lucide-react';
import { 
  AnatomicalStructure, 
  AnatomicalSystemId, 
  AnatomicalRegion,
  SystemLayerState, 
  CameraViewPreset,
  AnatomyMode,
  OspeStation,
  GuidedTourStep
} from '../../types/anatomy';
import { ANATOMICAL_STRUCTURES } from '../../data/anatomyData';
import { AnatomyViewer } from './AnatomyViewer';
import { AnatomyLayerPanel } from './AnatomyLayerPanel';
import { AnatomyControls } from './AnatomyControls';
import { AnatomySearch } from './AnatomySearch';
import { AnatomyInfoPanel } from './AnatomyInfoPanel';
import { AnatomySystems } from './AnatomySystems';
import { AnatomyOSPE } from './AnatomyOSPE';
import { ClinicalAnatomyPanel } from './ClinicalAnatomyPanel';
import { LearnAnatomyTour } from './LearnAnatomyTour';

interface AnatomyCanvasProps {
  initialOrgan?: string;
  onNavigateToCase?: (caseId: string) => void;
  onStartViva?: (structureId: string) => void;
}

export const AnatomyCanvas: React.FC<AnatomyCanvasProps> = ({
  initialOrgan,
  onNavigateToCase,
  onStartViva
}) => {
  // Master Mode State
  const [activeMode, setActiveMode] = useState<AnatomyMode>('explore');

  // Classification & Filters
  const [activeClassification, setActiveClassification] = useState<'systemic' | 'regional'>('systemic');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<AnatomicalSystemId | 'all'>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<AnatomicalRegion | 'all'>('all');

  // Selection & Hover
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const [hoveredStructure, setHoveredStructure] = useState<AnatomicalStructure | null>(null);

  // Search & UI Panels
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState<boolean>(true);
  const [activeOspeStation, setActiveOspeStation] = useState<OspeStation | null>(null);
  const [focusedCameraTarget, setFocusedCameraTarget] = useState<{ position: [number, number, number]; target: [number, number, number] } | null>(null);

  // 3D Viewport Controls
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>('isometric');
  const [explodedAmount, setExplodedAmount] = useState<number>(0);
  const [crossSectionEnabled, setCrossSectionEnabled] = useState<boolean>(false);
  const [crossSectionPlane, setCrossSectionPlane] = useState<'axial' | 'sagittal' | 'coronal'>('axial');
  const [crossSectionDepth, setCrossSectionDepth] = useState<number>(0);
  const [xrayMode, setXrayMode] = useState<boolean>(false);

  // 10 Anatomical Systems Layer States
  const [layers, setLayers] = useState<Record<AnatomicalSystemId, SystemLayerState>>(() => {
    const initial: Record<AnatomicalSystemId, SystemLayerState> = {
      skeletal: { id: 'skeletal', name: 'Skeletal Framework', visible: true, opacity: 1.0, isolated: false, structureCount: 335, color: '#f1f5f9' },
      muscular: { id: 'muscular', name: 'Muscular System', visible: true, opacity: 0.35, isolated: false, structureCount: 1388, color: '#f43f5e' },
      cardiovascular: { id: 'cardiovascular', name: 'Cardiovascular System', visible: true, opacity: 1.0, isolated: false, structureCount: 676, color: '#e11d48' },
      nervous: { id: 'nervous', name: 'Nervous & Brain', visible: true, opacity: 1.0, isolated: false, structureCount: 860, color: '#eab308' },
      digestive: { id: 'digestive', name: 'Digestive & Viscera', visible: true, opacity: 1.0, isolated: false, structureCount: 75, color: '#f59e0b' },
      respiratory: { id: 'respiratory', name: 'Respiratory System', visible: true, opacity: 0.95, isolated: false, structureCount: 35, color: '#06b6d4' },
      articular: { id: 'articular', name: 'Articular & Ligaments', visible: true, opacity: 0.85, isolated: false, structureCount: 413, color: '#94a3b8' },
      lymphatic: { id: 'lymphatic', name: 'Lymphatic & Spleen', visible: true, opacity: 0.85, isolated: false, structureCount: 163, color: '#10b981' },
      urinary: { id: 'urinary', name: 'Urinary & Kidneys', visible: true, opacity: 1.0, isolated: false, structureCount: 8, color: '#d97706' },
      reproductive: { id: 'reproductive', name: 'Pelvic Viscera', visible: true, opacity: 1.0, isolated: false, structureCount: 24, color: '#ec4899' },
      skin: { id: 'skin', name: 'Integumentary Surface', visible: true, opacity: 0.18, isolated: false, structureCount: 256, color: '#fed7aa' }
    };
    return initial;
  });

  // Filter structures based on active filters
  const displayedStructures = useMemo(() => {
    return ANATOMICAL_STRUCTURES.filter((s) => {
      if (activeClassification === 'systemic') {
        if (selectedSystemFilter !== 'all' && s.system !== selectedSystemFilter) return false;
      } else {
        if (selectedRegionFilter !== 'all' && s.region !== selectedRegionFilter) return false;
      }
      return true;
    });
  }, [activeClassification, selectedSystemFilter, selectedRegionFilter]);

  // Global Keyboard listener for Search (`/` or `Ctrl + F`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Layer Actions
  const handleToggleVisibility = useCallback((id: AnatomicalSystemId) => {
    setLayers((prev) => ({
      ...prev,
      [id]: { ...prev[id], visible: !prev[id].visible }
    }));
  }, []);

  const handleToggleIsolate = useCallback((id: AnatomicalSystemId) => {
    setLayers((prev) => {
      const isCurrentlyIsolated = prev[id].isolated;
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const sysKey = key as AnatomicalSystemId;
        next[sysKey] = {
          ...next[sysKey],
          isolated: !isCurrentlyIsolated && sysKey === id
        };
      });
      return next;
    });
  }, []);

  const handleChangeOpacity = useCallback((id: AnatomicalSystemId, opacity: number) => {
    setLayers((prev) => ({
      ...prev,
      [id]: { ...prev[id], opacity }
    }));
  }, []);

  const handleShowAll = useCallback(() => {
    setLayers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const sysKey = key as AnatomicalSystemId;
        next[sysKey] = { ...next[sysKey], visible: true, isolated: false };
      });
      return next;
    });
  }, []);

  const handleHideAll = useCallback(() => {
    setLayers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const sysKey = key as AnatomicalSystemId;
        next[sysKey] = { ...next[sysKey], visible: false, isolated: false };
      });
      return next;
    });
  }, []);

  const handleResetLayers = useCallback(() => {
    setLayers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const sysKey = key as AnatomicalSystemId;
        next[sysKey] = {
          ...next[sysKey],
          visible: sysKey !== 'skin',
          opacity: 1.0,
          isolated: false
        };
      });
      return next;
    });
    setExplodedAmount(0);
    setCrossSectionEnabled(false);
    setXrayMode(false);
    setCameraPreset('isometric');
  }, []);

  // Structure Focus in 3D
  const handleFocusStructureIn3D = useCallback((structure: AnatomicalStructure) => {
    const pos = structure.defaultPosition || [0, 0, 0];
    setFocusedCameraTarget({
      position: [pos[0] * 1.5, pos[1] + 0.4, pos[2] + 2.2],
      target: [pos[0], pos[1], pos[2]]
    });
  }, []);

  // Isolate Structure in 3D
  const handleIsolateStructureIn3D = useCallback((structure: AnatomicalStructure) => {
    handleToggleIsolate(structure.system);
    handleFocusStructureIn3D(structure);
  }, [handleToggleIsolate, handleFocusStructureIn3D]);

  // Guided Tour Step Change Handler
  const handleTourStepChange = useCallback((step: GuidedTourStep) => {
    const targetStructure = ANATOMICAL_STRUCTURES.find((s) => s.id === step.structureId);
    if (targetStructure) {
      setSelectedStructure(targetStructure);
    }
    setFocusedCameraTarget({
      position: step.cameraPosition,
      target: step.cameraTarget
    });
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] min-h-[640px] rounded-3xl overflow-hidden border border-slate-800 bg-med-950 flex flex-col shadow-2xl">
      {/* 1. Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Mode Switcher */}
        <div className="glass-panel p-1 rounded-2xl border border-sky-500/20 bg-slate-950/85 backdrop-blur-md flex items-center gap-1 pointer-events-auto shadow-xl">
          <button
            onClick={() => setActiveMode('explore')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'explore'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            3D Explorer
          </button>

          <button
            onClick={() => setActiveMode('learn')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'learn'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-glow-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Learn Tour
          </button>

          <button
            onClick={() => setActiveMode('ospe')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'ospe'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-glow-rose'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            OSPE Exam
          </button>

          <button
            onClick={() => setActiveMode('clinical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'clinical'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Clinical Mode
          </button>
        </div>

        {/* Center: Systemic / Regional Anatomy Filter */}
        <AnatomySystems
          activeClassification={activeClassification}
          onChangeClassification={setActiveClassification}
          selectedSystem={selectedSystemFilter}
          onSelectSystem={setSelectedSystemFilter}
          selectedRegion={selectedRegionFilter}
          onSelectRegion={setSelectedRegionFilter}
        />

        {/* Right: Search Trigger */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="glass-panel px-3.5 py-2 rounded-xl border border-sky-500/20 bg-slate-950/80 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center gap-2 shadow-lg transition-all"
            title="Search Anatomy (Press '/')"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Search Anatomy...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
              /
            </kbd>
          </button>
        </div>
      </div>

      {/* 2. Main 3D Viewport */}
      <div className="flex-1 w-full h-full relative">
        <AnatomyViewer
          structures={displayedStructures}
          selectedStructure={selectedStructure}
          hoveredStructure={hoveredStructure}
          onSelectStructure={(struct) => setSelectedStructure(struct)}
          onHoverStructure={(struct) => setHoveredStructure(struct)}
          layers={layers}
          cameraPreset={cameraPreset}
          explodedAmount={explodedAmount}
          crossSectionEnabled={crossSectionEnabled}
          crossSectionPlane={crossSectionPlane}
          crossSectionDepth={crossSectionDepth}
          xrayMode={xrayMode}
          activeOspeStation={activeMode === 'ospe' ? activeOspeStation : null}
          focusedCameraTarget={focusedCameraTarget}
        />

        {/* 3. Left Overlay: AnatomyLayerPanel */}
        <div className="absolute top-20 left-4 z-20 pointer-events-none">
          <AnatomyLayerPanel
            layers={layers}
            onToggleVisibility={handleToggleVisibility}
            onToggleIsolate={handleToggleIsolate}
            onChangeOpacity={handleChangeOpacity}
            onShowAll={handleShowAll}
            onHideAll={handleHideAll}
            onResetLayers={handleResetLayers}
            isOpen={isLayersPanelOpen}
            onToggleOpen={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
          />
        </div>

        {/* 4. Right Overlays according to Active Mode */}
        <div className="absolute top-20 right-4 z-20 pointer-events-none">
          {activeMode === 'explore' && selectedStructure && (
            <AnatomyInfoPanel
              structure={selectedStructure}
              onClose={() => setSelectedStructure(null)}
              onFocus3D={handleFocusStructureIn3D}
              onIsolate3D={handleIsolateStructureIn3D}
              onStartViva={onStartViva}
              onOpenClinicalCase={onNavigateToCase}
            />
          )}

          {activeMode === 'learn' && (
            <LearnAnatomyTour
              onStepChange={handleTourStepChange}
              onCloseTour={() => setActiveMode('explore')}
            />
          )}

          {activeMode === 'ospe' && (
            <AnatomyOSPE
              onSelectStation={(station) => setActiveOspeStation(station)}
              onCloseOSPE={() => {
                setActiveOspeStation(null);
                setActiveMode('explore');
              }}
            />
          )}

          {activeMode === 'clinical' && (
            <ClinicalAnatomyPanel
              structure={selectedStructure || displayedStructures[0]}
              onClose={() => setActiveMode('explore')}
              onNavigateToCase={onNavigateToCase}
            />
          )}
        </div>

        {/* 5. Bottom HUD Controls Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center pointer-events-none">
          <AnatomyControls
            onSetCameraView={(preset) => {
              setFocusedCameraTarget(null);
              setCameraPreset(preset);
            }}
            explodedAmount={explodedAmount}
            onExplodedChange={setExplodedAmount}
            crossSectionEnabled={crossSectionEnabled}
            onToggleCrossSection={() => setCrossSectionEnabled(!crossSectionEnabled)}
            crossSectionPlane={crossSectionPlane}
            onChangeCrossSectionPlane={setCrossSectionPlane}
            crossSectionDepth={crossSectionDepth}
            onChangeCrossSectionDepth={setCrossSectionDepth}
            xrayMode={xrayMode}
            onToggleXray={() => setXrayMode(!xrayMode)}
            onResetCamera={handleResetLayers}
          />
        </div>
      </div>

      {/* 6. Global Search Modal */}
      <AnatomySearch
        structures={ANATOMICAL_STRUCTURES}
        onSelectStructure={(struct) => {
          setSelectedStructure(struct);
          handleFocusStructureIn3D(struct);
        }}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
