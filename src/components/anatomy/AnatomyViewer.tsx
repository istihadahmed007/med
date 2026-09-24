import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AnatomyModel, Hotspot } from "../../lib/anatomy/anatomy-models";
import { anatomyModelLoader } from "../../lib/anatomy/model-loader";
import { LoadedOrgan } from "../../lib/anatomy/model-cache";
import { getDevicePerformanceProfile } from "../../lib/anatomy/model-performance";
import { AnatomyLoading } from "./AnatomyLoading";
import { AnatomyControls, SlicePlaneType } from "./AnatomyControls";
import {
  Layers,
  Sparkles,
  AlertCircle,
  Crosshair,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  X,
  Stethoscope,
  Info,
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
const HOME_CAMERA = { x: 2.2, y: 1.2, z: 8.0 };
const HOME_TARGET = { x: 0, y: 0.0, z: 0 };

// Smooth cubic easing for broadcast-quality camera glides
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

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

  // Hotspot meshes group (attached inside the loaded organ pivot)
  const hotspotsGroupRef = useRef<THREE.Group | null>(null);

  // Clipping plane
  const clipPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0));

  // Camera glide animation state
  const cameraAnimRef = useRef<{
    active: boolean;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    progress: number;
    duration: number;
  }>({
    active: false,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    progress: 0,
    duration: 0.7,
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [crossSection, setCrossSection] = useState(false);
  const [crossSectionValue, setCrossSectionValue] = useState(0);
  const [crossSectionPlane, setCrossSectionPlane] = useState<SlicePlaneType>("sagittal");
  const [wireframe, setWireframe] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [isLandmarksOpen, setIsLandmarksOpen] = useState(false);

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

  // Update clipping plane direction and constant
  const applyClippingPlane = useCallback(
    (enabled: boolean, planeType: SlicePlaneType, val: number) => {
      if (!clipPlaneRef.current) return;

      switch (planeType) {
        case "sagittal":
          clipPlaneRef.current.normal.set(-1, 0, 0);
          clipPlaneRef.current.constant = val;
          break;
        case "axial":
          clipPlaneRef.current.normal.set(0, -1, 0);
          clipPlaneRef.current.constant = val;
          break;
        case "coronal":
          clipPlaneRef.current.normal.set(0, 0, -1);
          clipPlaneRef.current.constant = val;
          break;
      }

      if (currentOrganRef.current) {
        currentOrganRef.current.meshes.forEach((mesh) => {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.clippingPlanes = enabled ? [clipPlaneRef.current] : null;
              mat.side = THREE.DoubleSide;
              mat.clipShadows = true;
              mat.needsUpdate = true;
            }
          });
        });
      }
    },
    []
  );

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const profile = getDevicePerformanceProfile();
    const width = Math.max(10, containerRef.current.clientWidth || 800);
    const height = Math.max(10, containerRef.current.clientHeight || 580);

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, width / height, 0.1, 100);
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
    renderer.toneMappingExposure = 1.1;
    renderer.localClippingEnabled = true;
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    anatomyModelLoader.setMaxAnisotropy(profile.recommendedAnisotropy);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = true;
    controls.minDistance = 1.8;
    controls.maxDistance = 15;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.65;
    controls.target.set(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z);
    controlsRef.current = controls;

    // Gracefully pause auto-rotation when user starts dragging
    const handleControlStart = () => {
      setAutoRotate(false);
    };
    controls.addEventListener("start", handleControlStart);

    // 5. Medical Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.75);
    fillLight.position.set(-6, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0, 7, -6);
    scene.add(rimLight);

    // Subtle anatomical contact shadow plinth
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
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
    contactShadow.position.y = -2.05;
    scene.add(contactShadow);

    // Hotspots Group
    const hotspotsGroup = new THREE.Group();
    hotspotsGroup.name = "hotspots-group";
    hotspotsGroupRef.current = hotspotsGroup;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w > 0 && h > 0) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();

      // Camera smooth glide interpolation
      const anim = cameraAnimRef.current;
      if (anim.active && cameraRef.current && controlsRef.current) {
        anim.progress += delta / anim.duration;
        const t = Math.min(1, anim.progress);
        const ease = easeInOutCubic(t);

        cameraRef.current.position.lerpVectors(anim.startPos, anim.endPos, ease);
        controlsRef.current.target.lerpVectors(anim.startTarget, anim.endTarget, ease);

        if (t >= 1) {
          anim.active = false;
        }
      }

      controls.update();

      if (currentOrganRef.current?.mixer) {
        currentOrganRef.current.mixer.update(delta);
      }

      // Billboard hotspots to face the camera, taking organ pivot rotation into account
      if (hotspotsGroupRef.current && cameraRef.current) {
        const camQuat = cameraRef.current.quaternion;
        hotspotsGroupRef.current.children.forEach((child) => {
          if (child.parent) {
            const parentWorldQuat = new THREE.Quaternion();
            child.parent.getWorldQuaternion(parentWorldQuat);
            child.quaternion.copy(parentWorldQuat.invert().multiply(camQuat));
          } else {
            child.quaternion.copy(camQuat);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      controls.removeEventListener("start", handleControlStart);
      controls.dispose();

      // CRITICAL: Detach cached organ pivot before disposing scene so cached models are NOT destroyed!
      if (currentOrganRef.current && sceneRef.current) {
        sceneRef.current.remove(currentOrganRef.current.pivot);
      }

      // Dispose only scene helper objects (shadow, lights)
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      currentOrganRef.current = null;
    };
  }, []);

  // Smooth camera glide trigger
  const glideCameraTo = useCallback(
    (targetPos: THREE.Vector3, targetLook: THREE.Vector3, duration = 0.7) => {
      if (!cameraRef.current || !controlsRef.current) return;
      const anim = cameraAnimRef.current;
      anim.active = true;
      anim.progress = 0;
      anim.duration = duration;
      anim.startPos.copy(cameraRef.current.position);
      anim.endPos.copy(targetPos);
      anim.startTarget.copy(controlsRef.current.target);
      anim.endTarget.copy(targetLook);
    },
    []
  );

  // Build 3D Hotspot Pins in scene
  const buildHotspots = useCallback((hotspots: Hotspot[], organPivot: THREE.Group) => {
    if (!hotspotsGroupRef.current) return;

    // Clear previous pins
    while (hotspotsGroupRef.current.children.length > 0) {
      const child = hotspotsGroupRef.current.children[0];
      hotspotsGroupRef.current.remove(child);
    }

    // Attach hotspotsGroup inside organPivot so pins move & scale with the organ!
    if (hotspotsGroupRef.current.parent !== organPivot) {
      organPivot.add(hotspotsGroupRef.current);
    }

    hotspots.forEach((spot) => {
      const pinGroup = new THREE.Group();
      pinGroup.name = `pin-${spot.id}`;

      // Outer glow disc
      const outerGeo = new THREE.RingGeometry(0.08, 0.16, 24);
      const outerMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color || "#06b6d4"),
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthTest: true,
      });
      const outerRing = new THREE.Mesh(outerGeo, outerMat);

      // Inner core sphere
      const innerGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        depthTest: true,
      });
      const innerSphere = new THREE.Mesh(innerGeo, innerMat);

      // Small anchor stem connecting marker to the anatomical structure
      const stemGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8);
      const stemMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color || "#06b6d4"),
        transparent: true,
        opacity: 0.7,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = -0.07;

      // Invisible hit-sphere (radius 0.3) for effortless clicking on desktop & touch
      const hitGeo = new THREE.SphereGeometry(0.3, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({
        visible: false,
      });
      const hitSphere = new THREE.Mesh(hitGeo, hitMat);
      hitSphere.userData = { hotspot: spot };

      pinGroup.add(outerRing);
      pinGroup.add(innerSphere);
      pinGroup.add(stem);
      pinGroup.add(hitSphere);

      pinGroup.position.set(spot.position[0], spot.position[1], spot.position[2]);
      pinGroup.userData = { hotspot: spot };

      hotspotsGroupRef.current?.add(pinGroup);
    });
  }, []);

  // Load / Swap 3D Model with Cache Integration
  useEffect(() => {
    if (!sceneRef.current) return;

    let isSubscribed = true;
    setLoading(true);
    setLoadProgress(0.05);
    setError(null);
    setSelectedHotspot(null);
    setHoveredHotspot(null);

    // Detach previous organ pivot safely (without destroying it in cache!)
    if (currentOrganRef.current && sceneRef.current) {
      sceneRef.current.remove(currentOrganRef.current.pivot);
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
              mat.side = THREE.DoubleSide;
              if (crossSection) {
                mat.clippingPlanes = [clipPlaneRef.current];
              } else {
                mat.clippingPlanes = null;
              }
              mat.needsUpdate = true;
            }
          });
        });

        // Build 3D hotspot pins inside organ pivot
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
  }, [model.id, model.model, model.available, buildHotspots]);

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
    applyClippingPlane(crossSection, crossSectionPlane, crossSectionValue);
  }, [crossSection, crossSectionPlane, crossSectionValue, applyClippingPlane]);

  // Auto-rotate toggle effect
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Reset Camera View with smooth glide
  const handleResetCamera = () => {
    glideCameraTo(
      new THREE.Vector3(HOME_CAMERA.x, HOME_CAMERA.y, HOME_CAMERA.z),
      new THREE.Vector3(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z),
      0.65
    );
  };

  // Focus Camera smoothly onto selected hotspot
  const focusHotspot = useCallback(
    (spot: Hotspot) => {
      setSelectedHotspot(spot);
      onSelectHotspot?.(spot);
      setAutoRotate(false);

      if (!cameraRef.current || !controlsRef.current) return;

      const target = new THREE.Vector3(spot.position[0], spot.position[1], spot.position[2]);
      const dir = cameraRef.current.position.clone().sub(target).normalize();
      const newCamPos = target.clone().add(dir.multiplyScalar(4.5));

      glideCameraTo(newCamPos, target, 0.7);
    },
    [glideCameraTo, onSelectHotspot]
  );

  // Navigate to previous / next hotspot
  const handleStepHotspot = (direction: "next" | "prev") => {
    const list = model.hotspots || [];
    if (!list.length) return;
    const currentIndex = selectedHotspot ? list.findIndex((h) => h.id === selectedHotspot.id) : -1;
    let nextIndex = 0;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % list.length;
    } else {
      nextIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
    }
    focusHotspot(list[nextIndex]);
  };

  // Canvas Mouse Move / Hover Raycaster
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cameraRef.current || !hotspotsGroupRef.current || !showHotspots) {
      if (hoveredHotspot) setHoveredHotspot(null);
      return;
    }

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
        setHoveredHotspot(topObj.userData.hotspot);
        if (canvasRef.current) canvasRef.current.style.cursor = "pointer";
        return;
      }
    }

    if (hoveredHotspot) setHoveredHotspot(null);
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
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
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[580px] lg:h-[660px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#060b18] via-[#040813] to-[#02040a] border border-slate-800/80 shadow-2xl select-none ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => {
          setHoveredHotspot(null);
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
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

      {/* Professional Fallback when model is unavailable */}
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
        <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-glass pointer-events-auto">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all shadow-glass"
            title="Open Microscopic Histology Specimen"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Histology</span>
          </button>
        )}

        {model.illustrations?.compare && onOpenPathology && (
          <button
            onClick={onOpenPathology}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:border-rose-400/50 transition-all shadow-glass"
            title="Open Clinical Pathology Comparison"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Pathology</span>
          </button>
        )}
      </div>

      {/* Hover Tooltip when cursor is over a 3D hotspot pin */}
      {hoveredHotspot && !selectedHotspot && (
        <div className="absolute top-16 left-4 z-10 p-2.5 px-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-400/50 shadow-glow-cyan pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hoveredHotspot.color || "#06b6d4" }}
            />
            <span className="text-xs font-bold text-white">{hoveredHotspot.label}</span>
          </div>
          <span className="text-[10px] text-cyan-300 italic font-serif block mt-0.5">
            {hoveredHotspot.ta}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Click to inspect landmark
          </span>
        </div>
      )}

      {/* Structure Information Card (When a 3D hotspot is clicked) */}
      {selectedHotspot && (
        <div className="absolute top-16 right-4 z-10 max-w-xs w-full p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-400/40 shadow-glow-cyan animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                  Anatomical Landmark
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-400/30 font-mono">
                  TA2
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight mt-1">
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
              title="Close structure details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {selectedHotspot.detail}
          </p>

          {/* Step through landmarks */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800 text-[11px]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleStepHotspot("prev")}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Previous landmark"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStepHotspot("next")}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Next landmark"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => focusHotspot(selectedHotspot)}
              className="flex items-center gap-1 text-cyan-400 hover:underline font-medium"
            >
              <Crosshair className="w-3 h-3" />
              Re-center
            </button>
          </div>
        </div>
      )}

      {/* Interactive Landmarks Drawer / List */}
      {isLandmarksOpen && model.hotspots && model.hotspots.length > 0 && (
        <div className="absolute top-16 left-4 z-10 max-w-xs w-full max-h-[460px] overflow-y-auto p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-700/60 shadow-glass animate-in fade-in slide-in-from-left-2 duration-200 pointer-events-auto scrollbar-thin">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
            <div className="flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Key Landmarks ({model.hotspots.length})
              </h4>
            </div>
            <button
              onClick={() => setIsLandmarksOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {model.hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => focusHotspot(spot)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2 border ${
                    isSelected
                      ? "bg-cyan-950/70 border-cyan-400/60 text-white shadow-glow-cyan"
                      : "bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: spot.color || "#06b6d4" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{spot.label}</div>
                    <div className="text-[10px] text-slate-400 italic font-serif truncate">
                      {spot.ta}
                    </div>
                  </div>
                </button>
              );
            })}
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
        crossSectionPlane={crossSectionPlane}
        onChangeCrossSectionPlane={setCrossSectionPlane}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(!wireframe)}
        showHotspots={showHotspots}
        onToggleShowHotspots={() => {
          const next = !showHotspots;
          setShowHotspots(next);
          if (hotspotsGroupRef.current) {
            hotspotsGroupRef.current.visible = next;
          }
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        landmarksOpen={isLandmarksOpen}
        onToggleLandmarks={() => setIsLandmarksOpen(!isLandmarksOpen)}
        hotspotCount={model.hotspots?.length || 0}
      />
    </div>
  );
};
