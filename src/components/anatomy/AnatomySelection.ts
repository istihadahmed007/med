import * as THREE from 'three';

export interface SelectionHit {
  object: THREE.Object3D;
  mesh: THREE.Mesh;
  point: THREE.Vector3;
  distance: number;
  structureId: string;
  name: string;
  systemId?: string;
  boundingBox: THREE.Box3;
  boundingSphere: THREE.Sphere;
  worldPosition: THREE.Vector3;
}

export class AnatomySelectionManager {
  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;
  private hoveredMesh: THREE.Mesh | null = null;
  private selectedMesh: THREE.Mesh | null = null;
  
  // Cache original material so we don't bleed highlights into shared material pool
  private originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();

  // Highlight colors
  private hoverEmissive = new THREE.Color(0x0284c7); // Medical sky cyan
  private selectEmissive = new THREE.Color(0x06b6d4); // Vivid teal/cyan
  private originalEmissives: Map<THREE.Mesh, THREE.Color> = new Map();

  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Line = { threshold: 0.1 };
    this.pointer = new THREE.Vector2();
  }

  /**
   * Raycast from normalized screen coordinates (-1 to +1) against candidate meshes
   */
  public raycast(
    normalizedCoords: { x: number; y: number },
    camera: THREE.Camera,
    candidateObjects: THREE.Object3D[]
  ): SelectionHit | null {
    this.pointer.set(normalizedCoords.x, normalizedCoords.y);
    this.raycaster.setFromCamera(this.pointer, camera);

    const intersects = this.raycaster.intersectObjects(candidateObjects, true);

    for (const hit of intersects) {
      // Must be a visible mesh
      if (hit.object instanceof THREE.Mesh && hit.object.visible) {
        const mesh = hit.object;
        const bounds = this.computeBounds(mesh);
        const structureId = (mesh.userData?.organId || mesh.userData?.structureId || mesh.name || 'structure') as string;
        const name = (mesh.userData?.organName || mesh.userData?.structureName || mesh.name || 'Anatomical Structure') as string;
        const systemId = mesh.userData?.systemId as string | undefined;

        return {
          object: mesh,
          mesh,
          point: hit.point,
          distance: hit.distance,
          structureId,
          name,
          systemId,
          boundingBox: bounds.box,
          boundingSphere: bounds.sphere,
          worldPosition: bounds.center
        };
      }
    }

    return null;
  }

  /**
   * Highlight a mesh on pointer hover without altering other meshes in the material pool
   */
  public highlightHover(mesh: THREE.Mesh | null): void {
    if (this.hoveredMesh === mesh) return;

    // Reset previous hovered mesh if not currently selected
    if (this.hoveredMesh && this.hoveredMesh !== this.selectedMesh) {
      this.restoreMeshMaterial(this.hoveredMesh);
    }

    this.hoveredMesh = mesh;

    // If new hover mesh is valid and not selected, apply hover highlight
    if (mesh && mesh !== this.selectedMesh) {
      this.applyHighlight(mesh, this.hoverEmissive, 0.45);
    }
  }

  /**
   * Select a mesh, persisting strong highlight
   */
  public select(mesh: THREE.Mesh | null): SelectionHit | null {
    // Restore previous selected mesh if different
    if (this.selectedMesh && this.selectedMesh !== mesh) {
      this.restoreMeshMaterial(this.selectedMesh);
    }

    this.selectedMesh = mesh;

    if (!mesh) return null;

    // Apply selection highlight
    this.applyHighlight(mesh, this.selectEmissive, 0.75);

    const bounds = this.computeBounds(mesh);
    const structureId = (mesh.userData?.organId || mesh.userData?.structureId || mesh.name || 'structure') as string;
    const name = (mesh.userData?.organName || mesh.userData?.structureName || mesh.name || 'Anatomical Structure') as string;
    const systemId = mesh.userData?.systemId as string | undefined;

    return {
      object: mesh,
      mesh,
      point: bounds.center,
      distance: 0,
      structureId,
      name,
      systemId,
      boundingBox: bounds.box,
      boundingSphere: bounds.sphere,
      worldPosition: bounds.center
    };
  }

  public clearSelection(): void {
    if (this.selectedMesh) {
      this.restoreMeshMaterial(this.selectedMesh);
      this.selectedMesh = null;
    }
    if (this.hoveredMesh) {
      this.restoreMeshMaterial(this.hoveredMesh);
      this.hoveredMesh = null;
    }
  }

  public getSelectedMesh(): THREE.Mesh | null {
    return this.selectedMesh;
  }

  /**
   * Calculate exact world BoundingBox and BoundingSphere for framing camera
   */
  public computeBounds(object: THREE.Object3D): { box: THREE.Box3; sphere: THREE.Sphere; center: THREE.Vector3 } {
    const box = new THREE.Box3().setFromObject(object);
    const sphere = new THREE.Sphere();
    const center = new THREE.Vector3();

    if (!box.isEmpty()) {
      box.getCenter(center);
      box.getBoundingSphere(sphere);
    } else {
      object.getWorldPosition(center);
      sphere.set(center, 0.2);
      box.setFromCenterAndSize(center, new THREE.Vector3(0.4, 0.4, 0.4));
    }

    return { box, sphere, center };
  }

  private applyHighlight(mesh: THREE.Mesh, emissiveColor: THREE.Color, intensity: number): void {
    if (!mesh.material) return;

    // Store original material if not already cached
    if (!this.originalMaterials.has(mesh)) {
      this.originalMaterials.set(mesh, mesh.material);
    }

    // Clone material specifically for this mesh to avoid contaminating shared material pool
    if (Array.isArray(mesh.material)) {
      mesh.material = mesh.material.map((mat) => {
        const cloned = mat.clone() as THREE.MeshStandardMaterial;
        if ('emissive' in cloned) {
          cloned.emissive.copy(emissiveColor);
          cloned.emissiveIntensity = intensity;
        }
        return cloned;
      });
    } else {
      const cloned = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
      if ('emissive' in cloned) {
        cloned.emissive.copy(emissiveColor);
        cloned.emissiveIntensity = intensity;
      }
      mesh.material = cloned;
    }
  }

  private restoreMeshMaterial(mesh: THREE.Mesh): void {
    const original = this.originalMaterials.get(mesh);
    if (original) {
      // Dispose the cloned material we created for highlight
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else if (mesh.material) {
        mesh.material.dispose();
      }
      mesh.material = original;
      this.originalMaterials.delete(mesh);
    }
  }

  public dispose(): void {
    this.clearSelection();
    this.originalMaterials.clear();
  }
}
