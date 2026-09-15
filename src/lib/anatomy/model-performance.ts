import * as THREE from "three";

export type DevicePerformanceProfile = {
  isLowPower: boolean;
  maxPixelRatio: number;
  recommendedAnisotropy: number;
  enableAntialias: boolean;
};

/**
 * Evaluates hardware concurrency, screen dimensions, and power profile
 */
export function getDevicePerformanceProfile(): DevicePerformanceProfile {
  if (typeof window === "undefined") {
    return {
      isLowPower: false,
      maxPixelRatio: 2,
      recommendedAnisotropy: 4,
      enableAntialias: true,
    };
  }

  const isSmallScreen = window.matchMedia("(max-width: 780px)").matches;
  const lowCores = (navigator.hardwareConcurrency ?? 8) < 6;
  const isLowPower = isSmallScreen || lowCores;

  return {
    isLowPower,
    maxPixelRatio: Math.min(window.devicePixelRatio || 1, isLowPower ? 1.5 : 2),
    recommendedAnisotropy: isLowPower ? 2 : 8,
    enableAntialias: !isLowPower,
  };
}

/**
 * Recursively disposes all geometry, textures, and materials in a Three.js hierarchy
 */
export function disposeObject3D(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (Array.isArray(child.material)) {
        child.material.forEach(disposeSingleMaterial);
      } else if (child.material) {
        disposeSingleMaterial(child.material);
      }
    }
  });
}

function disposeSingleMaterial(mat: THREE.Material): void {
  const standard = mat as THREE.MeshStandardMaterial;
  if (standard.map) standard.map.dispose();
  if (standard.normalMap) standard.normalMap.dispose();
  if (standard.roughnessMap) standard.roughnessMap.dispose();
  if (standard.metalnessMap) standard.metalnessMap.dispose();
  if (standard.aoMap) standard.aoMap.dispose();
  if (standard.emissiveMap) standard.emissiveMap.dispose();
  mat.dispose();
}
