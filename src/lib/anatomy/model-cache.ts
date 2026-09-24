import * as THREE from "three";

export type LoadedOrgan = {
  id: string;
  url: string;
  pivot: THREE.Group;
  meshes: THREE.Mesh[];
  mixer: THREE.AnimationMixer | null;
  lastUsed: number;
};

const DEFAULT_CACHE_LIMIT = 5;

class ModelCacheManager {
  private cache = new Map<string, LoadedOrgan>();
  private cacheLimit = DEFAULT_CACHE_LIMIT;

  public get(id: string): LoadedOrgan | undefined {
    const organ = this.cache.get(id);
    if (organ) {
      organ.lastUsed = Date.now();
      // Move to most recent in Map
      this.cache.delete(id);
      this.cache.set(id, organ);
      this.resetMaterials(organ);
      return organ;
    }
    return undefined;
  }

  public set(id: string, organ: LoadedOrgan) {
    organ.lastUsed = Date.now();
    this.cache.set(id, organ);
    this.evict();
  }

  public has(id: string): boolean {
    return this.cache.has(id);
  }

  public delete(id: string) {
    const organ = this.cache.get(id);
    if (organ) {
      this.destroy(organ);
      this.cache.delete(id);
    }
  }

  public clear() {
    this.cache.forEach((organ) => this.destroy(organ));
    this.cache.clear();
  }

  public resetMaterials(organ: LoadedOrgan) {
    organ.pivot.rotation.set(0, 0, 0);
    organ.pivot.position.set(0, 0, 0);
    organ.meshes.forEach((mesh) => {
      this.forEachMaterial(mesh, (material) => {
        material.transparent = false;
        material.opacity = 1;
        material.depthWrite = true;
        material.depthTest = true;
        material.side = THREE.DoubleSide;
        material.clippingPlanes = null;
        if (material instanceof THREE.MeshStandardMaterial) {
          material.wireframe = false;
        }
        material.needsUpdate = true;
      });
    });
  }

  private forEachMaterial(mesh: THREE.Mesh, fn: (material: THREE.Material) => void) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(fn);
    } else if (mesh.material) {
      fn(mesh.material);
    }
  }

  private evict() {
    while (this.cache.size > this.cacheLimit) {
      const oldestKey = this.cache.keys().next().value;
      if (!oldestKey) break;
      const organ = this.cache.get(oldestKey);
      if (organ) {
        this.destroy(organ);
      }
      this.cache.delete(oldestKey);
    }
  }

  private destroy(organ: LoadedOrgan) {
    try {
      organ.mixer?.stopAllAction();
      organ.mixer?.uncacheRoot(organ.pivot);
      organ.pivot.removeFromParent();

      organ.pivot.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              this.disposeMaterial(mat);
            });
          } else if (child.material) {
            this.disposeMaterial(child.material);
          }
        }
      });
    } catch {
      // Ignore disposal cleanup errors
    }
  }

  private disposeMaterial(mat: THREE.Material) {
    if ("map" in mat && mat.map) (mat.map as THREE.Texture).dispose();
    if ("normalMap" in mat && mat.normalMap) (mat.normalMap as THREE.Texture).dispose();
    if ("roughnessMap" in mat && mat.roughnessMap) (mat.roughnessMap as THREE.Texture).dispose();
    if ("metalnessMap" in mat && mat.metalnessMap) (mat.metalnessMap as THREE.Texture).dispose();
    if ("emissiveMap" in mat && mat.emissiveMap) (mat.emissiveMap as THREE.Texture).dispose();
    if ("aoMap" in mat && mat.aoMap) (mat.aoMap as THREE.Texture).dispose();
    mat.dispose();
  }
}

export const modelCache = new ModelCacheManager();
