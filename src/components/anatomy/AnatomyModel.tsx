import * as THREE from 'three';
import { AnatomicalSystemId, SystemLayerState } from '../../types/anatomy';
import { anatomyAssetService, SYSTEM_COLORS } from '../../services/anatomyAssetService';
import { AnatomyPerformanceManager } from './AnatomyPerformance';

export interface ModelOptions {
  rootGroup: THREE.Group;
  clipPlane: THREE.Plane;
  onProgress?: (progress: number, loadedCount: number, systemName: string) => void;
  onSystemLoaded?: (systemId: AnatomicalSystemId, group: THREE.Group) => void;
  onError?: (err: Error) => void;
}

export class AnatomyModelManager {
  private rootGroup: THREE.Group;
  private clipPlane: THREE.Plane;
  private systemGroups: Map<AnatomicalSystemId, THREE.Group> = new Map();
  private allMeshes: THREE.Mesh[] = [];

  // Exploded view base offsets (along X-axis)
  private explodedOffsets: Record<string, number> = {
    skin: -0.85,
    regional: -0.85,
    muscular: -0.55,
    articular: -0.25,
    skeletal: 0.0,
    respiratory: 0.20,
    cardiovascular: 0.45,
    nervous: 0.70,
    digestive: 0.95,
    visceral: 0.95,
    urinary: 0.30,
    renal: 0.30,
    lymphatic: -0.10
  };

  private onProgress?: (progress: number, loadedCount: number, systemName: string) => void;
  private onSystemLoaded?: (systemId: AnatomicalSystemId, group: THREE.Group) => void;

  constructor(options: ModelOptions) {
    this.rootGroup = options.rootGroup;
    this.clipPlane = options.clipPlane;
    this.onProgress = options.onProgress;
    this.onSystemLoaded = options.onSystemLoaded;
  }

  /**
   * Load either the full anatomical model suite or a targeted subset (e.g. for /anatomy/heart)
   */
  public async loadSystems(targetSystems?: AnatomicalSystemId[]): Promise<void> {
    const assets = anatomyAssetService.getAllAssetInfos();
    const toLoad = targetSystems 
      ? assets.filter((a) => targetSystems.includes(a.id) || a.id === 'skeletal')
      : assets;

    let loadedCount = 0;
    const totalCount = toLoad.length;

    for (const asset of toLoad) {
      try {
        const group = await anatomyAssetService.loadSystem(asset.id);
        
        // Tag all meshes with system identity and attach clipping plane
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.systemId = asset.id;
            this.allMeshes.push(child);

            // Enable local clipping plane
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                m.clippingPlanes = [this.clipPlane];
                m.clipShadows = true;
              });
            } else if (child.material) {
              child.material.clippingPlanes = [this.clipPlane];
              child.material.clipShadows = true;
            }
          }
        });

        this.systemGroups.set(asset.id, group);
        this.rootGroup.add(group);

        loadedCount++;
        const percent = Math.round((loadedCount / totalCount) * 100);
        this.onProgress?.(percent, loadedCount, asset.name);
        this.onSystemLoaded?.(asset.id, group);
      } catch (err) {
        console.warn(`[AnatomyModelManager] Failed to load system ${asset.id}:`, err);
      }
    }
  }

  /**
   * Update layer states (visibility, opacity, isolation, fading)
   */
  public updateLayers(layers: Record<AnatomicalSystemId, SystemLayerState>, xrayMode: boolean): void {
    const hasIsolated = Object.values(layers).some((l) => l.isolated);

    this.systemGroups.forEach((group, systemId) => {
      const layer = layers[systemId];
      if (!layer) return;

      if (!layer.visible) {
        group.visible = false;
        return;
      }

      group.visible = true;

      // Determine effective opacity
      let targetOpacity = layer.opacity;

      if (hasIsolated) {
        targetOpacity = layer.isolated ? 1.0 : 0.08;
      } else if (xrayMode) {
        // Medical X-Ray preset: Skeleton stays prominent, soft tissues become translucent
        if (systemId === 'skeletal') {
          targetOpacity = 1.0;
        } else if (systemId === 'skin') {
          targetOpacity = 0.05;
        } else if (systemId === 'muscular') {
          targetOpacity = 0.12;
        } else {
          targetOpacity = 0.35;
        }
      }

      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => {
            if ('opacity' in m && 'transparent' in m) {
              m.transparent = targetOpacity < 0.98;
              m.opacity = targetOpacity;
              m.depthWrite = targetOpacity > 0.65;
            }
          });
        }
      });
    });
  }

  /**
   * Apply exploded view spatial separation
   */
  public updateExplodedAmount(amount: number): void {
    this.systemGroups.forEach((group, systemId) => {
      const baseOffset = this.explodedOffsets[systemId] || 0;
      // Smooth horizontal offset
      group.position.x = baseOffset * amount * 1.25;
    });
  }

  public getMeshList(): THREE.Mesh[] {
    return this.allMeshes;
  }

  public getSystemGroup(systemId: AnatomicalSystemId): THREE.Group | undefined {
    return this.systemGroups.get(systemId);
  }

  public dispose(): void {
    this.systemGroups.forEach((group) => {
      this.rootGroup.remove(group);
      AnatomyPerformanceManager.disposeObject(group);
    });
    this.systemGroups.clear();
    this.allMeshes = [];
  }
}

export const AnatomyModel: React.FC = () => null;
