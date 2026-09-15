import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AnatomyModel, Hotspot } from "../../lib/anatomy/anatomy-models";
import { anatomyModelLoader } from "../../lib/anatomy/model-loader";
import { LoadedOrgan } from "../../lib/anatomy/model-cache";
import { getDevicePerformanceProfile, disposeObject3D } from "../../lib/anatomy/model-performance";
import { AnatomyLoading } from "./AnatomyLoading";
import { AnatomyControls } from "./AnatomyControls";
import {
  Info,
  Layers,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Crosshair,
  BookOpen,
} from "lucide-react";

interface AnatomyViewerProps {
  model: AnatomyModel;
  onSelectHotspot?: (hotspot: Hotspot | null) => void;
  selectedHotspotId?: string | null;
  className?: string;
  onOpenHistology?: () => void;
  onOpenPathology?: () => void;
}

const CAMERA_FOV = 35;
const HOME_CAMERA = { x: 0, y: 1.05, z: 8.2 };
const HOME_TARGET = { x: 0, y: 0.02, z: 0 };

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({
  model,
  onSelectHotspot,
  selectedHotspotId,
  className = "",
  onOpenHistology,
  onOpenPathology,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentOrganRef = useRef<LoadedOrgan | null>(null);
  const animFrameRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());

  // Hotspot meshes group
  const hotspotsGroupRef = useRef<THREE.Group | null>(null);

  // Clipping plane
  const clipPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0));

  // UI state
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [crossSection, setCrossSection] = useState(false);
  const [crossSectionValue, setCrossSectionValue] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isolatedStructure, setIsolatedStructure] = useState(false);

  // Synchronize external hotspot selection
  useEffect(() => {
    if (!selectedHotspotId) {
      setSelectedHotspot(null);
      return;
    }
    const found = model.hotspots?.find((h) => h.id === selectedHotspotId) || null;
    setSelectedHotspot(found);
  }, [selectedHotspotId, model.hotspots]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const profile = getDevicePerformanceProfile();

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(HOME_CAMERA.x, HOME_CAMERA.y, HOME_CAMERA.z);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: profile.enableAntialias,
      alpha: true,
      powerPreference: "high-performance",
      depth: true,
    });
    renderer.setPixelRatio(profile.maxPixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.localClippingEnabled = true;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    rendererRef.current = renderer;

    anatomyModelLoader.setMaxAnisotropy(profile.recommendedAnisotropy);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = true;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.65;
    controls.target.set(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z);
    controlsRef.current = controls;

    // 5. Lighting & Studio Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Subtle anatomical contact shadow plinth
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, "rgba(0,0,0,0.45)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.15)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.1;
    scene.add(contactShadow);

    // Hotspot Group
    const hotspotsGroup = new THREE.Group();
    hotspotsGroup.name = "hotspots-group";
    scene.add(hotspotsGroup);
    hotspotsGroupRef.current = hotspotsGroup;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      controls.update();

      if (currentOrganRef.current?.mixer) {
        currentOrganRef.current.mixer.update(delta);
      }

      // Billboard hotspots to always face the camera
      if (hotspotsGroupRef.current && cameraRef.current) {
        hotspotsGroupRef.current.children.forEach((child) => {
          child.quaternion.copy(cameraRef.current!.quaternion);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      disposeObject3D(scene);
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      currentOrganRef.current = null;
    };
  }, []);

  // Load / Swap 3D Model with Cache Integration
  useEffect(() => {
    if (!sceneRef.current) return;

    let isSubscribed = true;
    setLoading(true);
    setLoadProgress(0.05);
    setError(null);
    setSelectedHotspot(null);

    // Detach previous organ pivot
    if (currentOrganRef.current && sceneRef.current) {
      sceneRef.current.remove(currentOrganRef.current.pivot);
    }

    // Clear previous hotspots
    if (hotspotsGroupRef.current) {
      while (hotspotsGroupRef.current.children.length > 0) {
        const c = hotspotsGroupRef.current.children[0];
        hotspotsGroupRef.current.remove(c);
      }
    }

    if (!model.available || !model.model) {
      setLoading(false);
      return;
    }

    anatomyModelLoader
      .loadModel(model.id, model.model, (progress) => {
        if (isSubscribed) {
          setLoadProgress(progress);
        }
      })
      .then((loadedOrgan) => {
        if (!isSubscribed || !sceneRef.current) return;

        currentOrganRef.current = loadedOrgan;
        sceneRef.current.add(loadedOrgan.pivot);

        // Apply active tool states (wireframe & cross-section)
        loadedOrgan.meshes.forEach((mesh) => {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.wireframe = wireframe;
            }
            if (crossSection) {
              mat.clippingPlanes = [clipPlaneRef.current];
            } else {
              mat.clippingPlanes = null;
            }
            mat.needsUpdate = true;
          });
        });

        // Build 3D hotspot pins
        buildHotspots(model.hotspots || [], loadedOrgan.pivot);

        setLoading(false);
        setLoadProgress(1);
      })
      .catch((err) => {
        if (isSubscribed) {
          console.error("Failed to load anatomy model:", err);
          setError("3D Model could not be loaded. Please verify connection.");
          setLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [model.id, model.model, model.available]);

  // Build 3D Hotspot Pins in scene
  const buildHotspots = useCallback((hotspots: Hotspot[], organPivot: THREE.Group) => {
    if (!hotspotsGroupRef.current) return;

    while (hotspotsGroupRef.current.children.length > 0) {
      hotspotsGroupRef.current.remove(hotspotsGroupRef.current.children[0]);
    }

    hotspots.forEach((spot) => {
      const pinGroup = new THREE.Group();
      pinGroup.name = `pin-${spot.id}`;

      // Outer glow disc
      const outerGeo = new THREE.RingGeometry(0.08, 0.14, 24);
      const outerMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color || "#06b6d4"),
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthTest: false,
      });
      const outerRing = new THREE.Mesh(outerGeo, outerMat);

      // Inner core sphere
      const innerGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        depthTest: false,
      });
      const innerSphere = new THREE.Mesh(innerGeo, innerMat);

      pinGroup.add(outerRing);
      pinGroup.add(innerSphere);

      pinGroup.position.set(spot.position[0], spot.position[1], spot.position[2]);
      pinGroup.userData = { hotspot: spot };

      hotspotsGroupRef.current?.add(pinGroup);
    });
  }, []);

  // Wireframe toggle effect
  useEffect(() => {
    if (!currentOrganRef.current) return;
    currentOrganRef.current.meshes.forEach((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.wireframe = wireframe;
          mat.needsUpdate = true;
        }
      });
    });
  }, [wireframe]);

  // Cross-section clipping effect
  useEffect(() => {
    if (!currentOrganRef.current) return;
    clipPlaneRef.current.constant = crossSectionValue;
    currentOrganRef.current.meshes.forEach((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        if (crossSection) {
          mat.clippingPlanes = [clipPlaneRef.current];
        } else {
          mat.clippingPlanes = null;
        }
        mat.needsUpdate = true;
      });
    });
  }, [crossSection, crossSectionValue]);

  // Auto-rotate toggle effect
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(HOME_CAMERA.x, HOME_CAMERA.y, HOME_CAMERA.z);
    controlsRef.current.target.set(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z);
    controlsRef.current.update();
  };

  // Focus Camera onto selected hotspot
  const focusHotspot = (spot: Hotspot) => {
    setSelectedHotspot(spot);
    onSelectHotspot?.(spot);

    if (!cameraRef.current || !controlsRef.current) return;

    // Smoothly pan target to hotspot position
    const target = new THREE.Vector3(spot.position[0], spot.position[1], spot.position[2]);
    controlsRef.current.target.lerp(target, 0.85);

    // Keep camera at comfortable inspection distance
    const dir = cameraRef.current.position.clone().sub(target).normalize();
    cameraRef.current.position.copy(target.clone().add(dir.multiplyScalar(4.8)));
    controlsRef.current.update();
  };

  // Canvas Click / Tap Raycaster for 3D Hotspot selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cameraRef.current || !hotspotsGroupRef.current || !showHotspots) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(hotspotsGroupRef.current.children, true);
    if (intersects.length > 0) {
      let topObj: THREE.Object3D | null = intersects[0].object;
      while (topObj && !topObj.userData?.hotspot && topObj.parent) {
        topObj = topObj.parent;
      }
      if (topObj?.userData?.hotspot) {
        focusHotspot(topObj.userData.hotspot);
        setAutoRotate(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[580px] lg:h-[650px] rounded-2xl overflow-hidden bg-gradient-to-b from-med-900 via-med-950 to-[#03060f] border border-slate-800/80 shadow-2xl select-none ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Loading Overlay */}
      {loading && (
        <AnatomyLoading
          modelName={model.name}
          systemName={model.system}
          progress={loadProgress}
        />
      )}

      {/* Professional "3D Model Unavailable" Fallback (Strictly NO fake SVG / emoji anatomy) */}
      {!loading && (!model.available || error) && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-med-950/90 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-2xl bg-med-900/90 border border-slate-700/60 shadow-glass text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              3D Specimen Unavailable
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              An authentic 3D digital reconstruction for{" "}
              <span className="text-white font-medium">{model.name}</span> is currently
              undergoing high-fidelity medical digitisation. Placeholder or synthetic meshes are omitted to uphold BM&DC clinical fidelity.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>System:</span>
                <span className="text-slate-200">{model.system}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Scientific Name:</span>
                <span className="text-slate-200 italic">{model.scientificName || "N/A"}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Clinical Standard:</span>
                <span className="text-emerald-400">Terminologia Anatomica (TA2)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specimen Header Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-med-900/85 backdrop-blur-md border border-slate-700/60 shadow-glass pointer-events-auto">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: model.accent || "#06b6d4" }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">{model.name}</h2>
              {model.scientificName && (
                <span className="text-xs italic text-slate-400 font-serif">
                  ({model.scientificName})
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">{model.system}</p>
          </div>
        </div>
      </div>

      {/* Quick Specimen Actions (Histology & Pathology integration) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-auto">
        {model.illustrations?.microscopic && onOpenHistology && (
          <button
            onClick={onOpenHistology}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-med-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:border-med-accent-cyan/50 transition-all shadow-glass"
            title="Open Microscopic Histology Specimen"
          >
            <Layers className="w-3.5 h-3.5 text-med-accent-cyan" />
            <span className="hidden md:inline">Histology</span>
          </button>
        )}

        {model.illustrations?.compare && onOpenPathology && (
          <button
            onClick={onOpenPathology}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-med-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:border-med-accent-rose/50 transition-all shadow-glass"
            title="Open Clinical Pathology Comparison"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Pathology</span>
          </button>
        )}
      </div>

      {/* Structure Information Card (When a 3D hotspot is clicked) */}
      {selectedHotspot && (
        <div className="absolute top-20 right-4 z-10 max-w-xs w-full p-4 rounded-2xl bg-med-900/95 backdrop-blur-xl border border-med-accent-cyan/40 shadow-glow-cyan animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-med-accent-cyan font-semibold">
                Anatomical Structure
              </span>
              <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                {selectedHotspot.label}
              </h4>
              <p className="text-xs italic text-slate-400 font-serif mt-0.5">
                {selectedHotspot.ta}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedHotspot(null);
                onSelectHotspot?.(null);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
            {selectedHotspot.detail}
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[11px]">
            <button
              onClick={() => focusHotspot(selectedHotspot)}
              className="flex items-center gap-1 text-med-accent-cyan hover:underline font-medium"
            >
              <Crosshair className="w-3 h-3" />
              Re-center View
            </button>
            <span className="text-slate-500 font-mono text-[10px]">
              TA2 Standard
            </span>
          </div>
        </div>
      )}

      {/* Viewer Floating HUD Controls */}
      <AnatomyControls
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onResetCamera={handleResetCamera}
        crossSection={crossSection}
        onToggleCrossSection={() => setCrossSection(!crossSection)}
        crossSectionValue={crossSectionValue}
        onChangeCrossSection={setCrossSectionValue}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(!wireframe)}
        showHotspots={showHotspots}
        onToggleShowHotspots={() => {
          setShowHotspots(!showHotspots);
          if (hotspotsGroupRef.current) {
            hotspotsGroupRef.current.visible = !showHotspots;
          }
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
};
