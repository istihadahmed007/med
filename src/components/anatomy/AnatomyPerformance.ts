import * as THREE from 'three';

export type PerformanceTier = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface PerformanceProfile {
  tier: PerformanceTier;
  pixelRatio: number;
  antialias: boolean;
  shadows: boolean;
  maxAnisotropy: number;
  targetFps: number;
  renderOnDemand: boolean;
}

export class AnatomyPerformanceManager {
  private static instance: AnatomyPerformanceManager;
  private currentTier: PerformanceTier = 'AUTO';
  private resolvedProfile: PerformanceProfile;

  private constructor() {
    this.resolvedProfile = this.detectOptimalProfile();
  }

  public static getInstance(): AnatomyPerformanceManager {
    if (!AnatomyPerformanceManager.instance) {
      AnatomyPerformanceManager.instance = new AnatomyPerformanceManager();
    }
    return AnatomyPerformanceManager.instance;
  }

  /**
   * Intelligently detects hardware capabilities (desktop vs mobile, cores, memory)
   */
  public detectOptimalProfile(): PerformanceProfile {
    const isMobile = typeof window !== 'undefined' && 
      (window.matchMedia('(max-width: 768px)').matches || /iPhone|iPad|Android/i.test(navigator.userAgent));
    
    const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    let tier: PerformanceTier = 'HIGH';

    if (isMobile) {
      tier = cores < 6 ? 'LOW' : 'MEDIUM';
    } else {
      tier = cores < 4 ? 'MEDIUM' : 'HIGH';
    }

    return this.getProfileForTier(tier, devicePixelRatio);
  }

  public setTier(tier: PerformanceTier): PerformanceProfile {
    this.currentTier = tier;
    if (tier === 'AUTO') {
      this.resolvedProfile = this.detectOptimalProfile();
    } else {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      this.resolvedProfile = this.getProfileForTier(tier, dpr);
    }
    return this.resolvedProfile;
  }

  public getProfile(): PerformanceProfile {
    return this.resolvedProfile;
  }

  private getProfileForTier(tier: PerformanceTier, dpr: number): PerformanceProfile {
    switch (tier) {
      case 'LOW':
        return {
          tier: 'LOW',
          pixelRatio: Math.min(dpr, 1.0),
          antialias: false,
          shadows: false,
          maxAnisotropy: 1,
          targetFps: 30,
          renderOnDemand: true
        };
      case 'MEDIUM':
        return {
          tier: 'MEDIUM',
          pixelRatio: Math.min(dpr, 1.5),
          antialias: true,
          shadows: false,
          maxAnisotropy: 4,
          targetFps: 60,
          renderOnDemand: false
        };
      case 'HIGH':
      default:
        return {
          tier: 'HIGH',
          pixelRatio: Math.min(dpr, 2.0),
          antialias: true,
          shadows: true,
          maxAnisotropy: 8,
          targetFps: 60,
          renderOnDemand: false
        };
    }
  }

  /**
   * Deep disposal helper inspired by thebuggeddev/anatomy dispose.ts
   * Thoroughly releases WebGL buffers, geometry, textures, and material shaders
   */
  public static disposeObject(obj: THREE.Object3D): void {
    if (!obj) return;

    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => AnatomyPerformanceManager.disposeMaterial(mat));
          } else {
            AnatomyPerformanceManager.disposeMaterial(mesh.material);
          }
        }
      }
    });

    if (obj.parent) {
      obj.parent.remove(obj);
    }
  }

  public static disposeMaterial(mat: THREE.Material): void {
    if (!mat) return;
    mat.dispose();

    // Dispose all assigned textures
    const stdMat = mat as any;
    const textures = [
      stdMat.map,
      stdMat.normalMap,
      stdMat.roughnessMap,
      stdMat.metalnessMap,
      stdMat.emissiveMap,
      stdMat.aoMap,
      stdMat.alphaMap
    ];

    textures.forEach((tex) => {
      if (tex && tex.isTexture) {
        tex.dispose();
      }
    });
  }
}

export const anatomyPerformance = AnatomyPerformanceManager.getInstance();
