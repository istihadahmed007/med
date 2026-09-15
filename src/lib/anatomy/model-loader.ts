import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { modelCache, type LoadedOrgan } from "./model-cache";

export const FIT_SIZE = 3.8;

export class AnatomyModelLoader {
  private static instance: AnatomyModelLoader;
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private inflight = new Map<string, Promise<LoadedOrgan>>();
  private maxAnisotropy = 8;

  private constructor() {
    this.dracoLoader = new DRACOLoader();
    const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    this.dracoLoader.setDecoderPath(`${base}draco/gltf/`);
    this.dracoLoader.setDecoderConfig({ type: "wasm" });

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  }

  public static getInstance(): AnatomyModelLoader {
    if (!AnatomyModelLoader.instance) {
      AnatomyModelLoader.instance = new AnatomyModelLoader();
    }
    return AnatomyModelLoader.instance;
  }

  public setMaxAnisotropy(anisotropy: number) {
    this.maxAnisotropy = Math.min(8, Math.max(1, anisotropy));
  }

  /**
   * Loads or retrieves a cached anatomical model with progress reporting
   */
  public async loadModel(
    id: string,
    modelUrl: string,
    onProgress?: (progress: number) => void
  ): Promise<LoadedOrgan> {
    // 1. Instant Cache Hit
    const cached = modelCache.get(id);
    if (cached) {
      onProgress?.(1);
      return cached;
    }

    // 2. Inflight deduplication: reuse in-flight load if already downloading
    const cacheKey = `${id}:${modelUrl}`;
    const pending = this.inflight.get(cacheKey);
    if (pending) {
      return pending;
    }

    const fullUrl = modelUrl.startsWith("http")
      ? modelUrl
      : `${import.meta.env.BASE_URL.replace(/\/$/, "")}${modelUrl}`;

    const loadPromise = this.parseGLTF(id, fullUrl, onProgress);
    this.inflight.set(cacheKey, loadPromise);

    try {
      const organ = await loadPromise;
      modelCache.set(id, organ);
      return organ;
    } finally {
      this.inflight.delete(cacheKey);
    }
  }

  private async parseGLTF(
    id: string,
    url: string,
    onProgress?: (progress: number) => void
  ): Promise<LoadedOrgan> {
    const gltf = await this.gltfLoader.loadAsync(url, (event) => {
      if (event.total > 0) {
        onProgress?.(event.loaded / event.total);
      }
    });

    const model = gltf.scene;

    // Normalise bounding box into FIT_SIZE space
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const scale = FIT_SIZE / maxDim;

    model.scale.setScalar(scale);
    model.position.copy(center.multiplyScalar(-scale));

    // Create normalized pivot for rotation and hotspot tracking
    const pivot = new THREE.Group();
    pivot.name = `organ-pivot-${id}`;
    pivot.add(model);
    pivot.rotation.set(0.05, -0.28, 0);

    const meshes: THREE.Mesh[] = [];

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      meshes.push(child);
      child.frustumCulled = false;
      child.castShadow = false;
      child.receiveShadow = false;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        material.transparent = false;
        material.opacity = 1;
        material.depthWrite = true;
        material.depthTest = true;
        material.side = THREE.FrontSide;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = THREE.MathUtils.clamp(material.roughness ?? 0.5, 0.42, 0.62);
          material.metalness = 0;
          material.envMapIntensity = 0.35;
          material.emissive.set(0x000000);
          material.emissiveIntensity = 0;

          if (material.map) {
            material.map.colorSpace = THREE.SRGBColorSpace;
          }

          for (const map of [
            material.map,
            material.normalMap,
            material.roughnessMap,
            material.metalnessMap,
            material.aoMap,
          ]) {
            if (!map) continue;
            map.anisotropy = this.maxAnisotropy;
            map.generateMipmaps = true;
            map.minFilter = THREE.LinearMipmapLinearFilter;
            map.magFilter = THREE.LinearFilter;
            map.needsUpdate = true;
          }
        }
        material.needsUpdate = true;
      });
    });

    let mixer: THREE.AnimationMixer | null = null;
    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer?.clipAction(clip).play();
      });
    }

    return {
      id,
      url,
      pivot,
      meshes,
      mixer,
      lastUsed: Date.now(),
    };
  }
}

export const anatomyModelLoader = AnatomyModelLoader.getInstance();
