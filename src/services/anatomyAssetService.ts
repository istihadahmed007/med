import * as THREE from 'three';
import type { Group, MeshStandardMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { AnatomicalSystemId, Anatomy3DAssetInfo } from '../types/anatomy';

export interface ManifestOrgan {
  organ_id: string;
  ta2_latin: string;
  name_en: string;
  system: string;
  mesh_file: string;
  node: string;
  path?: string[];
}

/**
 * Authentic Medical Color Palette (Netter / Z-Anatomy standard)
 */
export const SYSTEM_COLORS: Record<string, string> = {
  skeletal: '#e8e2d2',       // Warm cortical bone ivory
  articular: '#bfcbd1',      // Articular cartilage / ligament pearl
  muscular: '#a83c44',       // Deep specimen striated muscle red
  cardiovascular: '#b83038', // Arterial red (venous blue overridden below)
  nervous: '#e6d87e',        // Buttery nerve yellow-gold
  lymphatic: '#8fb583',      // Atlas lymphatic green
  digestive: '#c08a63',      // Visceral gut mucosa tan
  respiratory: '#d3a0a3',    // Pulmonary tissue pink-grey
  urinary: '#9c5344',        // Renal cortex reddish-brown
  skin: '#dfb098',           // Translucent anatomical surface silhouette
  regional: '#dfb098',       // Regional body surface
  endocrine: '#d3a03f'       // Endocrine gland amber
};

export class AnatomyAssetService {
  private static instance: AnatomyAssetService;
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private modelCache: Map<string, Group> = new Map();
  private materialCache: Map<string, MeshStandardMaterial> = new Map();
  private assetRegistry: Map<AnatomicalSystemId, Anatomy3DAssetInfo> = new Map();
  private manifestOrgans: Map<string, ManifestOrgan> = new Map();
  private manifestLoaded = false;

  private constructor() {
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(`${base}draco/gltf/`);
    this.dracoLoader.setDecoderConfig({ type: 'wasm' });

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.initAssetRegistry();
    this.loadManifest();
  }

  public static getInstance(): AnatomyAssetService {
    if (!AnatomyAssetService.instance) {
      AnatomyAssetService.instance = new AnatomyAssetService();
    }
    return AnatomyAssetService.instance;
  }

  private initAssetRegistry() {
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    const systems: { id: AnatomicalSystemId; name: string; file: string }[] = [
      { id: 'skeletal', name: 'Skeletal Framework (Bones)', file: `${base}anatomy/skeletal_male.glb` },
      { id: 'articular', name: 'Articular System (Joints & Ligaments)', file: `${base}anatomy/articular_male.glb` },
      { id: 'muscular', name: 'Muscular System (Full Body Musculature)', file: `${base}anatomy/muscular_male.glb` },
      { id: 'cardiovascular', name: 'Cardiovascular System (Heart & Vessels)', file: `${base}anatomy/cardiovascular_male.glb` },
      { id: 'nervous', name: 'Nervous System (Brain, Cord & Nerves)', file: `${base}anatomy/nervous_male.glb` },
      { id: 'digestive', name: 'Digestive System (GI Tract & Viscera)', file: `${base}anatomy/digestive_male.glb` },
      { id: 'respiratory', name: 'Respiratory System (Lungs & Airways)', file: `${base}anatomy/respiratory_male.glb` },
      { id: 'urinary', name: 'Urinary System (Kidneys & Bladder)', file: `${base}anatomy/renal_male.glb` },
      { id: 'lymphatic', name: 'Lymphatic System (Nodes & Spleen)', file: `${base}anatomy/lymphatic_male.glb` },
      { id: 'skin', name: 'Integumentary Surface (Translucent Body)', file: `${base}anatomy/regional_male.glb` },
      { id: 'reproductive', name: 'Visceral Organs (Thoracoabdominal)', file: `${base}anatomy/visceral_male.glb` }
    ];

    systems.forEach((sys) => {
      this.assetRegistry.set(sys.id, {
        id: sys.id,
        name: sys.name,
        systemId: sys.id,
        modelUrl: sys.file,
        assetSource: 'BodyParts3D (DBCLS) / Z-Anatomy Open Medical Standard (CC-BY-SA)',
        license: 'CC-BY-SA 2.1 JP / GNU GPL / Educational Use',
        format: 'glb',
        meshCount: 0,
        dracoCompressed: true,
        status: 'unloaded'
      });
    });
  }

  public async loadSystem(systemId: AnatomicalSystemId): Promise<Group> {
    const res = await this.loadSystemModel(systemId);
    return res.group || new THREE.Group();
  }

  private async loadManifest() {
    if (this.manifestLoaded) return;
    try {
      const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
      const res = await fetch(`${base}anatomy/manifest.json`);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.toLowerCase().includes('application/json')) {
        const data = await res.json();
        if (data && Array.isArray(data.organs)) {
          data.organs.forEach((org: ManifestOrgan) => {
            if (org.node) {
              this.manifestOrgans.set(org.node.toLowerCase(), org);
            }
            if (org.organ_id) {
              this.manifestOrgans.set(org.organ_id.toLowerCase(), org);
            }
          });
          this.manifestLoaded = true;
        }
      }
    } catch {
      // Offline fallback
    }
  }

  public getOrganByNodeName(nodeName: string): ManifestOrgan | undefined {
    return this.manifestOrgans.get(nodeName.toLowerCase());
  }

  public getAssetInfo(systemId: AnatomicalSystemId): Anatomy3DAssetInfo | undefined {
    return this.assetRegistry.get(systemId);
  }

  public getAllAssetInfos(): Anatomy3DAssetInfo[] {
    return Array.from(this.assetRegistry.values());
  }

  public getMaterialForSystem(systemId: string, nodeName: string = ''): MeshStandardMaterial {
    let matKey = systemId;
    let baseColor = SYSTEM_COLORS[systemId] || '#94a3b8';
    let roughness = 0.45;
    let metalness = 0.05;
    let transparent = false;
    let opacity = 1.0;
    let depthWrite = true;

    const nameLower = (nodeName || '').toLowerCase();

    if (systemId === 'cardiovascular') {
      if (
        nameLower.includes('vein') ||
        nameLower.includes('vena') ||
        nameLower.includes('sinus') ||
        nameLower.includes('jugular') ||
        nameLower.includes('pulmonary trunk')
      ) {
        matKey = 'cardio_vein';
        baseColor = '#2563eb'; // Royal venous blue
      } else if (
        nameLower.includes('artery') ||
        nameLower.includes('aorta') ||
        nameLower.includes('carotid') ||
        nameLower.includes('arteria')
      ) {
        matKey = 'cardio_artery';
        baseColor = '#dc2626'; // Vivid oxygenated arterial red
      } else {
        matKey = 'cardio_heart';
        baseColor = '#b91c1c'; // Myocardial muscle red
      }
    } else if (systemId === 'skin') {
      matKey = 'skin_glass';
      baseColor = '#fed7aa';
      opacity = 0.18;
      roughness = 0.25;
      metalness = 0.1;
      transparent = true;
      depthWrite = false;
    } else if (systemId === 'skeletal') {
      matKey = 'skeletal_bone';
      baseColor = '#f5f0e6'; // Warm ivory bone
      roughness = 0.55;
      metalness = 0.03;
    } else if (systemId === 'muscular') {
      matKey = 'muscular_specimen';
      baseColor = '#991b1b'; // Striated muscle red
      roughness = 0.48;
      metalness = 0.06;
      opacity = 0.75;
      transparent = true;
    } else if (systemId === 'articular') {
      matKey = 'articular_ligament';
      baseColor = '#cbd5e1'; // Pearl ligament
      roughness = 0.35;
      opacity = 0.85;
      transparent = true;
    } else if (systemId === 'nervous') {
      matKey = 'nervous_tree';
      baseColor = '#eab308'; // Vibrant nerve yellow-gold
      roughness = 0.38;
      metalness = 0.08;
    } else if (systemId === 'lymphatic') {
      matKey = 'lymphatic_tree';
      baseColor = '#10b981'; // Emerald lymphatic green
      roughness = 0.4;
    } else if (systemId === 'respiratory') {
      matKey = 'respiratory_lung';
      baseColor = '#fda4af'; // Pulmonary pink
      roughness = 0.5;
    } else if (systemId === 'digestive') {
      matKey = 'digestive_viscera';
      baseColor = '#c2410c'; // Visceral gut tan
      roughness = 0.42;
    } else if (systemId === 'urinary') {
      matKey = 'urinary_renal';
      baseColor = '#d97706'; // Renal cortex amber
      roughness = 0.45;
    }

    let mat = this.materialCache.get(matKey);
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(baseColor),
        roughness,
        metalness,
        transparent,
        opacity,
        depthWrite,
        side: THREE.DoubleSide
      });
      this.materialCache.set(matKey, mat);
    }
    return mat;
  }

  /**
   * Load an authentic GLB model for an anatomical system with medical shader configuration
   */
  public async loadSystemModel(
    systemId: AnatomicalSystemId,
    onProgress?: (percent: number) => void
  ): Promise<{ group: Group | null; status: 'ready' | 'not_found' | 'error'; error?: string }> {
    const cached = this.modelCache.get(systemId);
    if (cached) {
      return { group: cached.clone(), status: 'ready' };
    }

    const assetInfo = this.assetRegistry.get(systemId);
    if (!assetInfo) {
      return { group: null, status: 'error', error: `System ${systemId} not registered.` };
    }

    assetInfo.status = 'loading';

    return new Promise((resolve) => {
      this.gltfLoader.load(
        assetInfo.modelUrl,
        (gltf) => {
          const group = gltf.scene;
          let meshCount = 0;

          group.traverse((child) => {
            if ((child as any).isMesh) {
              meshCount++;
              const mesh = child as Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              // Tag mesh with system & identification
              mesh.userData.systemId = systemId;
              mesh.userData.nodeName = child.name;

              // Use high-performance shared medical material
              const mat = this.getMaterialForSystem(systemId, child.name);
              mesh.material = mat;
              mesh.userData.originalMaterial = mat;
            }
          });

          assetInfo.status = 'ready';
          assetInfo.meshCount = meshCount;
          this.modelCache.set(systemId, group);
          resolve({ group, status: 'ready' });
        },
        (xhr) => {
          if (xhr.total > 0 && onProgress) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            onProgress(percent);
          }
        },
        (error) => {
          assetInfo.status = 'not_found';
          assetInfo.errorMessage = `Failed to load authentic 3D model for ${systemId}: ${error}`;
          resolve({ group: null, status: 'not_found', error: assetInfo.errorMessage });
        }
      );
    });
  }

  public registerCustomModelUrl(systemId: AnatomicalSystemId, url: string) {
    const existing = this.assetRegistry.get(systemId);
    if (existing) {
      existing.modelUrl = url;
      existing.status = 'unloaded';
      this.modelCache.delete(systemId);
    }
  }
}

export const anatomyAssetService = AnatomyAssetService.getInstance();
