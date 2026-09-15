import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  AnatomicalStructure, 
  AnatomicalSystemId, 
  SystemLayerState, 
  CameraViewPreset,
  OspeStation
} from '../../types/anatomy';
import { ANATOMICAL_STRUCTURES } from '../../data/anatomyData';
import { SYSTEM_COLORS } from '../../services/anatomyAssetService';
import { AnatomySceneManager } from './AnatomyScene';
import { AnatomyCameraController } from './AnatomyCamera';
import { AnatomyModelManager } from './AnatomyModel';
import { AnatomySelectionManager, SelectionHit } from './AnatomySelection';
import { AnatomyLoader } from './AnatomyLoader';
import { AnatomyLabels, ANATOMY_HOTSPOTS, AnatomyHotspot } from './AnatomyLabels';
import { AnatomyControls } from './AnatomyControls';
import { AnatomyLayers } from './AnatomyLayers';
import { AnatomySearch } from './AnatomySearch';
import { AnatomyInfoPanel } from './AnatomyInfoPanel';
import { AnatomyPerformanceManager, PerformanceTier } from './AnatomyPerformance';
import { ANATOMY_METADATA } from './AnatomyMetadata';

export interface AnatomyViewerProps {
  initialSystem?: AnatomicalSystemId;
  targetSystems?: AnatomicalSystemId[];
  structures?: AnatomicalStructure[];
  selectedStructure?: AnatomicalStructure | null;
  hoveredStructure?: AnatomicalStructure | null;
  onSelectStructure?: (structure: AnatomicalStructure | null) => void;
  onHoverStructure?: (structure: AnatomicalStructure | null) => void;
  layers?: Record<AnatomicalSystemId, SystemLayerState>;
  onLayersChange?: (layers: Record<AnatomicalSystemId, SystemLayerState>) => void;
  cameraPreset?: CameraViewPreset;
  explodedAmount?: number;
  crossSectionEnabled?: boolean;
  crossSectionPlane?: 'axial' | 'sagittal' | 'coronal';
  crossSectionDepth?: number;
  xrayMode?: boolean;
  activeOspeStation?: OspeStation | null;
  focusedCameraTarget?: { position: [number, number, number]; target: [number, number, number] } | null;
  onStartViva?: (structureId: string) => void;
  onNavigateToCase?: (caseId: string) => void;
}

interface HoveredTooltipInfo {
  name: string;
  latinName?: string;
  system: string;
  systemColor: string;
  screenX: number;
  screenY: number;
}

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({
  initialSystem,
  targetSystems,
  structures = ANATOMICAL_STRUCTURES,
  selectedStructure: externalSelectedStructure,
  onSelectStructure: externalOnSelectStructure,
  onHoverStructure: externalOnHoverStructure,
  layers: externalLayers,
  onLayersChange,
  cameraPreset: externalCameraPreset = 'isometric',
  explodedAmount: externalExplodedAmount = 0,
  crossSectionEnabled: externalCrossSectionEnabled = false,
  crossSectionPlane: externalCrossSectionPlane = 'axial',
  crossSectionDepth: externalCrossSectionDepth = 0,
  xrayMode: externalXrayMode = false,
  activeOspeStation,
  focusedCameraTarget,
  onStartViva,
  onNavigateToCase
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Internal layer state if not provided externally
  const [internalLayers, setInternalLayers] = useState<Record<AnatomicalSystemId, SystemLayerState>>(() => ({
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
  }));

  const activeLayers = externalLayers || internalLayers;

  // Local interaction controls state
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>(externalCameraPreset);
  const [explodedAmount, setExplodedAmount] = useState<number>(externalExplodedAmount);
  const [crossSectionEnabled, setCrossSectionEnabled] = useState<boolean>(externalCrossSectionEnabled);
  const [crossSectionPlane, setCrossSectionPlane] = useState<'axial' | 'sagittal' | 'coronal'>(externalCrossSectionPlane);
  const [crossSectionDepth, setCrossSectionDepth] = useState<number>(externalCrossSectionDepth);
  const [xrayMode, setXrayMode] = useState<boolean>(externalXrayMode);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('AUTO');

  // Selection & UI Panels
  const [internalSelectedStructure, setInternalSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const selectedStructure = externalSelectedStructure !== undefined ? externalSelectedStructure : internalSelectedStructure;
  const [hoveredTooltip, setHoveredTooltip] = useState<HoveredTooltipInfo | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Asset Loading
  const [loadProgress, setLoadProgress] = useState<number>(10);
  const [loadedSystemsCount, setLoadedSystemsCount] = useState<number>(0);
  const [currentLoadingName, setCurrentLoadingName] = useState<string>('Skeletal Framework');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Engine Manager Instances
  const sceneManagerRef = useRef<AnatomySceneManager | null>(null);
  const cameraControllerRef = useRef<AnatomyCameraController | null>(null);
  const modelManagerRef = useRef<AnatomyModelManager | null>(null);
  const selectionManagerRef = useRef<AnatomySelectionManager>(new AnatomySelectionManager());
  const rootGroupRef = useRef<THREE.Group>(new THREE.Group());
  const animationFrameId = useRef<number | null>(null);

  // Viewport Dimensions for Projected Labels
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });

  // 1. Initialize Engine on Mount
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // A. Setup Scene, Lights, ACES Tone Mapping
    const sceneMgr = new AnatomySceneManager({ container });
    sceneManagerRef.current = sceneMgr;
    sceneMgr.scene.add(rootGroupRef.current);

    // B. Setup Camera Controller
    const controls = new OrbitControls(sceneMgr.camera, sceneMgr.renderer.domElement);
    const camController = new AnatomyCameraController(sceneMgr.camera, controls);
    cameraControllerRef.current = camController;

    // Apply default camera angle
    camController.setPreset(externalCameraPreset);

    // C. Setup Model Manager
    const modelMgr = new AnatomyModelManager({
      rootGroup: rootGroupRef.current,
      clipPlane: sceneMgr.clipPlane,
      onProgress: (percent, loadedCount, systemName) => {
        setLoadProgress(percent);
        setLoadedSystemsCount(loadedCount);
        setCurrentLoadingName(systemName);
        if (percent >= 100) {
          setIsStreaming(false);
        }
      }
    });
    modelManagerRef.current = modelMgr;

    // Determine target systems to load
    const systemsToLoad = targetSystems || (initialSystem ? [initialSystem] : undefined);
    modelMgr.loadSystems(systemsToLoad);

    // D. Viewport Resize Handler
    const updateDimensions = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      setViewportDimensions({ width: w, height: h });
      sceneMgr.resize(w, h);
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    // E. Three.js Render Loop (Decoupled from React)
    const animate = () => {
      camController.update();
      sceneMgr.renderer.render(sceneMgr.scene, sceneMgr.camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on unmount
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      camController.dispose();
      modelMgr.dispose();
      selectionManagerRef.current.dispose();
      sceneMgr.dispose();
    };
  }, []);

  // 2. Sync Layer Visibility & Opacity
  useEffect(() => {
    if (modelManagerRef.current) {
      modelManagerRef.current.updateLayers(activeLayers, xrayMode);
    }
  }, [activeLayers, xrayMode]);

  // 3. Sync Exploded View
  useEffect(() => {
    if (modelManagerRef.current) {
      modelManagerRef.current.updateExplodedAmount(explodedAmount);
    }
  }, [explodedAmount]);

  // 4. Sync Cross-Section Plane
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.updateClippingPlane(crossSectionEnabled, crossSectionPlane, crossSectionDepth);
    }
  }, [crossSectionEnabled, crossSectionPlane, crossSectionDepth]);

  // 5. Sync Camera Preset
  useEffect(() => {
    if (cameraControllerRef.current) {
      cameraControllerRef.current.setPreset(cameraPreset);
    }
  }, [cameraPreset]);

  // 6. Pointer Move -> Raycast Hover
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const container = mountRef.current;
    const sceneMgr = sceneManagerRef.current;
    const modelMgr = modelManagerRef.current;
    if (!container || !sceneMgr || !modelMgr) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const hit = selectionManagerRef.current.raycast({ x, y }, sceneMgr.camera, modelMgr.getMeshList());

    if (hit) {
      selectionManagerRef.current.highlightHover(hit.mesh);
      container.style.cursor = 'pointer';

      // Look up organ metadata
      const sysId = (hit.systemId || 'skeletal') as AnatomicalSystemId;
      const meta = ANATOMY_METADATA[hit.structureId];
      const color = SYSTEM_COLORS[sysId]?.hex || '#38bdf8';

      setHoveredTooltip({
        name: hit.name,
        latinName: meta?.latinName,
        system: sysId.toUpperCase(),
        systemColor: color,
        screenX: e.clientX - rect.left,
        screenY: e.clientY - rect.top
      });

      if (externalOnHoverStructure) {
        const struct = structures.find((s) => s.id === hit.structureId) || null;
        externalOnHoverStructure(struct);
      }
    } else {
      selectionManagerRef.current.highlightHover(null);
      container.style.cursor = 'default';
      setHoveredTooltip(null);
      if (externalOnHoverStructure) externalOnHoverStructure(null);
    }
  }, [structures, externalOnHoverStructure]);

  // 7. Pointer Click -> Select & Frame Structure
  const handlePointerClick = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const container = mountRef.current;
    const sceneMgr = sceneManagerRef.current;
    const modelMgr = modelManagerRef.current;
    const camController = cameraControllerRef.current;
    if (!container || !sceneMgr || !modelMgr || !camController) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const hit = selectionManagerRef.current.raycast({ x, y }, sceneMgr.camera, modelMgr.getMeshList());

    if (hit) {
      selectionManagerRef.current.select(hit.mesh);
      camController.focusOnBounds(hit.boundingBox, hit.boundingSphere);

      // Find matching structure data or generate rich fallback from metadata
      const matched = structures.find((s) => s.id === hit.structureId) || {
        id: hit.structureId,
        name: hit.name,
        latinName: ANATOMY_METADATA[hit.structureId]?.latinName,
        system: (hit.systemId || 'skeletal') as AnatomicalSystemId,
        category: 'major-organ',
        region: 'thorax',
        location: ANATOMY_METADATA[hit.structureId]?.location || 'Human anatomical cavity',
        structureDescription: ANATOMY_METADATA[hit.structureId]?.function || 'Essential anatomical structure.',
        function: ANATOMY_METADATA[hit.structureId]?.function || 'Maintains human physiology.',
        clinicalSignificance: ANATOMY_METADATA[hit.structureId]?.clinicalRelevance?.join(' ') || 'High clinical relevance in MBBS curricula.',
        bmdcTopics: ['Gross Anatomy', 'Clinical Correlates'],
        modelNodeName: hit.mesh.name
      } as AnatomicalStructure;

      if (externalOnSelectStructure) {
        externalOnSelectStructure(matched);
      } else {
        setInternalSelectedStructure(matched);
      }
    } else {
      selectionManagerRef.current.clearSelection();
      if (externalOnSelectStructure) {
        externalOnSelectStructure(null);
      } else {
        setInternalSelectedStructure(null);
      }
    }
  }, [structures, externalOnSelectStructure]);

  // 8. Select from Labels or Hotspots
  const handleSelectHotspot = useCallback((hotspot: AnatomyHotspot) => {
    const camController = cameraControllerRef.current;
    const modelMgr = modelManagerRef.current;
    if (!camController) return;

    const pos = new THREE.Vector3(hotspot.position[0], hotspot.position[1], hotspot.position[2]);
    const box = new THREE.Box3().setFromCenterAndSize(pos, new THREE.Vector3(0.25, 0.25, 0.25));
    const sphere = new THREE.Sphere(pos, 0.18);

    camController.focusOnBounds(box, sphere);

    const matched = structures.find((s) => s.id === hotspot.id) || {
      id: hotspot.id,
      name: hotspot.name,
      latinName: hotspot.latinName || ANATOMY_METADATA[hotspot.id]?.latinName,
      system: hotspot.system,
      category: 'major-organ',
      region: 'thorax',
      location: ANATOMY_METADATA[hotspot.id]?.location || 'Thoracoabdominal anatomy',
      structureDescription: ANATOMY_METADATA[hotspot.id]?.function || 'Vital organ.',
      function: ANATOMY_METADATA[hotspot.id]?.function || 'Key physiological organ.',
      clinicalSignificance: ANATOMY_METADATA[hotspot.id]?.clinicalRelevance?.join(' ') || 'High yield MBBS exam structure.',
      bmdcTopics: ['Anatomy', 'Clinical Medicine']
    } as AnatomicalStructure;

    if (externalOnSelectStructure) {
      externalOnSelectStructure(matched);
    } else {
      setInternalSelectedStructure(matched);
    }
  }, [structures, externalOnSelectStructure]);

  // Layer manipulation helpers
  const handleToggleLayerVisibility = (id: AnatomicalSystemId) => {
    const next = {
      ...activeLayers,
      [id]: { ...activeLayers[id], visible: !activeLayers[id].visible }
    };
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleToggleLayerIsolate = (id: AnatomicalSystemId) => {
    const currentlyIsolated = activeLayers[id].isolated;
    const next = { ...activeLayers };
    Object.keys(next).forEach((key) => {
      const k = key as AnatomicalSystemId;
      next[k] = { ...next[k], isolated: !currentlyIsolated && k === id };
    });
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleChangeLayerOpacity = (id: AnatomicalSystemId, opacity: number) => {
    const next = {
      ...activeLayers,
      [id]: { ...activeLayers[id], opacity }
    };
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleShowAllLayers = () => {
    const next = { ...activeLayers };
    Object.keys(next).forEach((key) => {
      const k = key as AnatomicalSystemId;
      next[k] = { ...next[k], visible: true, isolated: false };
    });
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleHideAllLayers = () => {
    const next = { ...activeLayers };
    Object.keys(next).forEach((key) => {
      const k = key as AnatomicalSystemId;
      next[k] = { ...next[k], visible: false, isolated: false };
    });
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleResetLayers = () => {
    const next = { ...activeLayers };
    Object.keys(next).forEach((key) => {
      const k = key as AnatomicalSystemId;
      next[k] = {
        ...next[k],
        visible: true,
        isolated: false,
        opacity: k === 'skin' ? 0.18 : k === 'muscular' ? 0.35 : 1.0
      };
    });
    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  const handleApplyLayerPreset = (preset: 'all' | 'visceral' | 'musculoskeletal' | 'neurovascular') => {
    const next = { ...activeLayers };
    Object.keys(next).forEach((key) => {
      const k = key as AnatomicalSystemId;
      let visible = false;
      let opacity = 1.0;

      if (preset === 'all') {
        visible = true;
        opacity = k === 'skin' ? 0.18 : k === 'muscular' ? 0.35 : 1.0;
      } else if (preset === 'visceral') {
        visible = ['digestive', 'respiratory', 'urinary', 'cardiovascular', 'skeletal'].includes(k);
        opacity = k === 'skeletal' ? 0.25 : 1.0;
      } else if (preset === 'musculoskeletal') {
        visible = ['skeletal', 'articular', 'muscular'].includes(k);
        opacity = 1.0;
      } else if (preset === 'neurovascular') {
        visible = ['cardiovascular', 'nervous', 'skeletal'].includes(k);
        opacity = k === 'skeletal' ? 0.15 : 1.0;
      }

      next[k] = { ...next[k], visible, opacity, isolated: false };
    });

    if (onLayersChange) onLayersChange(next);
    else setInternalLayers(next);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex overflow-hidden bg-[#040914] select-none">
      {/* 1. Loading Feedback */}
      <AnatomyLoader
        progress={loadProgress}
        loadedSystemsCount={loadedSystemsCount}
        totalSystemsCount={10}
        currentSystemName={currentLoadingName}
        isStreaming={isStreaming}
      />

      {/* 2. Interactive 3D Canvas Viewport */}
      <div 
        ref={mountRef}
        onPointerMove={handlePointerMove}
        onClick={handlePointerClick}
        className="w-full h-full relative cursor-grab active:cursor-grabbing outline-none"
      />

      {/* 3. Projected 3D-to-2D Interactive Labels */}
      {sceneManagerRef.current && (
        <AnatomyLabels
          camera={sceneManagerRef.current.camera}
          containerWidth={viewportDimensions.width}
          containerHeight={viewportDimensions.height}
          layers={activeLayers}
          selectedStructureId={selectedStructure?.id}
          onSelectHotspot={handleSelectHotspot}
          visible={showLabels}
        />
      )}

      {/* 4. Hover Tooltip */}
      {hoveredTooltip && (
        <div
          style={{
            left: `${hoveredTooltip.screenX + 16}px`,
            top: `${hoveredTooltip.screenY - 12}px`
          }}
          className="absolute z-30 pointer-events-none transition-all duration-75"
        >
          <div className="glass-panel-elevated px-3 py-1.5 rounded-xl border border-sky-500/40 bg-slate-950/90 shadow-2xl backdrop-blur-md flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hoveredTooltip.systemColor }}
              />
              <span className="text-[9px] font-bold tracking-wider text-slate-300">
                {hoveredTooltip.system}
              </span>
            </div>
            <span className="text-xs font-bold text-white leading-tight">
              {hoveredTooltip.name}
            </span>
            {hoveredTooltip.latinName && (
              <span className="text-[10px] text-cyan-300 italic font-serif">
                {hoveredTooltip.latinName}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 5. Bottom Navigation & Tools Bar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[95%]">
        <AnatomyControls
          onSetCameraView={(preset) => {
            setCameraPreset(preset);
            cameraControllerRef.current?.setPreset(preset);
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
          onResetCamera={() => cameraControllerRef.current?.reset()}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels(!showLabels)}
          performanceTier={performanceTier}
          onChangePerformanceTier={(tier) => {
            setPerformanceTier(tier);
            const prof = AnatomyPerformanceManager.getInstance().setTier(tier);
            if (sceneManagerRef.current) {
              sceneManagerRef.current.renderer.setPixelRatio(prof.pixelRatio);
            }
          }}
        />
      </div>

      {/* 6. Left Side: Layers Drawer (Desktop) - Only when used standalone without external controller */}
      {!externalLayers && (
        <div className="absolute top-4 left-4 z-20 w-64 max-h-[calc(100%-110px)] hidden md:block rounded-2xl glass-panel-elevated border border-sky-500/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto">
          <AnatomyLayers
            layers={activeLayers}
            onToggleVisibility={handleToggleLayerVisibility}
            onToggleIsolate={handleToggleLayerIsolate}
            onChangeOpacity={handleChangeLayerOpacity}
            onShowAll={handleShowAllLayers}
            onHideAll={handleHideAllLayers}
            onResetLayers={handleResetLayers}
            onApplyPreset={handleApplyLayerPreset}
          />
        </div>
      )}

      {/* 7. Right Side: Structure Info Panel (Desktop & Mobile) - Only when used standalone */}
      {selectedStructure && !externalOnSelectStructure && (
        <div className="absolute top-4 right-4 z-30 max-h-[calc(100%-110px)] pointer-events-auto">
          <AnatomyInfoPanel
            structure={selectedStructure}
            onClose={() => {
              setInternalSelectedStructure(null);
              selectionManagerRef.current.clearSelection();
            }}
            onFocus3D={(s) => {
              const mesh = selectionManagerRef.current.getSelectedMesh();
              if (mesh && cameraControllerRef.current) {
                const bounds = selectionManagerRef.current.computeBounds(mesh);
                cameraControllerRef.current.focusOnBounds(bounds.box, bounds.sphere);
              }
            }}
            onIsolate3D={(s) => {
              handleToggleLayerIsolate(s.system);
            }}
            onStartViva={onStartViva}
            onOpenClinicalCase={onNavigateToCase}
          />
        </div>
      )}

      {/* 8. Global Anatomy Search Modal */}
      <AnatomySearch
        structures={structures}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStructure={(struct) => {
          if (externalOnSelectStructure) externalOnSelectStructure(struct);
          else setInternalSelectedStructure(struct);
          // Find matching hotspot or mesh and focus
          const spot = ANATOMY_HOTSPOTS.find((h) => h.id === struct.id);
          if (spot) {
            handleSelectHotspot(spot);
          }
        }}
      />
    </div>
  );
};
