import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AnatomicalStructure, AnatomicalSystemId, SystemLayerState } from '../../types/anatomy';

export interface AnatomyHotspot {
  id: string;
  name: string;
  latinName?: string;
  system: AnatomicalSystemId;
  position: [number, number, number]; // 3D world coordinates
}

// Curated high-yield MBBS anatomical landmarks
export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  { id: 'brain', name: 'Cerebrum & Brain', latinName: 'Encephalon', system: 'nervous', position: [0.0, 1.68, 0.02] },
  { id: 'heart', name: 'Heart & Ventricles', latinName: 'Cor', system: 'cardiovascular', position: [0.02, 1.25, 0.06] },
  { id: 'aorta', name: 'Ascending Aorta', latinName: 'Aorta ascendens', system: 'cardiovascular', position: [0.01, 1.33, 0.04] },
  { id: 'lung-left', name: 'Left Lung', latinName: 'Pulmo sinister', system: 'respiratory', position: [0.11, 1.26, 0.03] },
  { id: 'lung-right', name: 'Right Lung', latinName: 'Pulmo dexter', system: 'respiratory', position: [-0.11, 1.26, 0.03] },
  { id: 'liver', name: 'Liver', latinName: 'Hepar', system: 'digestive', position: [-0.08, 1.08, 0.07] },
  { id: 'stomach', name: 'Stomach', latinName: 'Gaster', system: 'digestive', position: [0.07, 1.08, 0.06] },
  { id: 'kidney-left', name: 'Left Kidney', latinName: 'Ren sinister', system: 'urinary', position: [0.08, 0.98, -0.04] },
  { id: 'femur', name: 'Femur (Thigh Bone)', latinName: 'Os femoris', system: 'skeletal', position: [0.12, 0.58, 0.03] }
];

interface AnatomyLabelsProps {
  camera: THREE.Camera | null;
  containerWidth: number;
  containerHeight: number;
  layers: Record<AnatomicalSystemId, SystemLayerState>;
  selectedStructureId?: string | null;
  onSelectHotspot: (hotspot: AnatomyHotspot) => void;
  visible?: boolean;
}

export const AnatomyLabels: React.FC<AnatomyLabelsProps> = ({
  camera,
  containerWidth,
  containerHeight,
  layers,
  selectedStructureId,
  onSelectHotspot,
  visible = true
}) => {
  if (!visible || !camera || containerWidth <= 0 || containerHeight <= 0) return null;

  // Project 3D hotspot positions to 2D screen space
  const projectedHotspots = useMemo(() => {
    const tempVec = new THREE.Vector3();
    const results: {
      hotspot: AnatomyHotspot;
      screenX: number;
      screenY: number;
      isVisible: boolean;
      distance: number;
    }[] = [];

    const camPos = camera.position;

    ANATOMY_HOTSPOTS.forEach((spot) => {
      // Check if system layer is visible
      const layer = layers[spot.system];
      if (layer && !layer.visible) return;

      tempVec.set(spot.position[0], spot.position[1], spot.position[2]);
      const distance = camPos.distanceTo(tempVec);

      // Occlusion: Hide labels if camera is zoomed out too far (> 4.5 units) to prevent clutter
      if (distance > 4.5) return;

      // Project to Normalized Device Coordinates (-1 to +1)
      tempVec.project(camera);

      // Check if within camera frustum
      if (tempVec.z > 1.0 || tempVec.z < -1.0) return;

      const screenX = ((tempVec.x + 1) * containerWidth) / 2;
      const screenY = ((-tempVec.y + 1) * containerHeight) / 2;

      // Ensure inside viewport bounds
      if (screenX >= 20 && screenX <= containerWidth - 20 && screenY >= 20 && screenY <= containerHeight - 20) {
        results.push({
          hotspot: spot,
          screenX,
          screenY,
          isVisible: true,
          distance
        });
      }
    });

    return results;
  }, [camera, containerWidth, containerHeight, layers]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {projectedHotspots.map(({ hotspot, screenX, screenY, distance }) => {
        const isSelected = selectedStructureId === hotspot.id;
        // Subtle distance attenuation for opacity
        const opacity = Math.max(0.4, 1.0 - (distance - 1.2) / 3.0);

        return (
          <div
            key={hotspot.id}
            style={{
              transform: `translate3d(${screenX}px, ${screenY}px, 0)`,
              opacity
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer transition-transform duration-150 hover:scale-105"
            onClick={() => onSelectHotspot(hotspot)}
          >
            {/* Interactive Pulse Pin */}
            <div className="relative flex items-center justify-center">
              <span className={`absolute w-4 h-4 rounded-full animate-ping opacity-60 ${
                isSelected ? 'bg-cyan-400' : 'bg-sky-400'
              }`} />
              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg transition-colors ${
                isSelected ? 'bg-cyan-400 ring-4 ring-cyan-500/40' : 'bg-sky-500 group-hover:bg-cyan-300'
              }`} />
            </div>

            {/* Callout Badge */}
            <div className={`absolute left-4 -top-2 px-2.5 py-1 rounded-lg glass-panel border shadow-xl flex flex-col whitespace-nowrap transition-all duration-200 ${
              isSelected 
                ? 'bg-slate-950/95 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'bg-slate-950/80 border-sky-500/30 group-hover:border-sky-400/60'
            }`}>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  {hotspot.name}
                </span>
              </div>
              {hotspot.latinName && (
                <span className="text-[9px] text-cyan-300/80 italic font-serif">
                  {hotspot.latinName}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
