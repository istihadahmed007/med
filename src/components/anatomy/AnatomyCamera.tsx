import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CameraViewPreset } from '../../types/anatomy';

export class AnatomyCameraController {
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  // Animation interpolation state
  private isAnimating: boolean = false;
  private startPosition: THREE.Vector3 = new THREE.Vector3();
  private targetPosition: THREE.Vector3 = new THREE.Vector3();
  private startTarget: THREE.Vector3 = new THREE.Vector3();
  private targetLookAt: THREE.Vector3 = new THREE.Vector3();
  private animStartTime: number = 0;
  private animDuration: number = 800; // ms

  // Default scene framing
  private defaultTarget: THREE.Vector3 = new THREE.Vector3(0, 0.95, 0);
  private defaultDistance: number = 2.4;

  constructor(camera: THREE.PerspectiveCamera, controls: OrbitControls) {
    this.camera = camera;
    this.controls = controls;

    // Configure OrbitControls for smooth medical atlas navigation
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 0.25;
    this.controls.maxDistance = 6.0;
    this.controls.maxPolarAngle = Math.PI - 0.05; // Prevent flipping under ground
    this.controls.minPolarAngle = 0.05;
    this.controls.target.copy(this.defaultTarget);
  }

  /**
   * Smoothly frame and focus an anatomical structure based on its 3D bounds
   */
  public focusOnBounds(box: THREE.Box3, sphere: THREE.Sphere, durationMs: number = 750): void {
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Calculate radius with fallback
    const radius = Math.max(sphere.radius, 0.08);

    // Compute comfortable viewing distance from FOV
    const fov = (this.camera.fov * Math.PI) / 180;
    const fitHeightDistance = radius / (2 * Math.atan(fov / 2));
    const fitWidthDistance = radius / (2 * Math.atan((fov * this.camera.aspect) / 2));
    const distance = Math.max(fitHeightDistance, fitWidthDistance) * 2.2;

    // Preserve the current camera direction relative to target to avoid disorienting flips
    const currentDirection = new THREE.Vector3()
      .subVectors(this.camera.position, this.controls.target)
      .normalize();

    // If current direction is degenerate, default to slightly elevated frontal angle
    if (currentDirection.lengthSq() < 0.001) {
      currentDirection.set(0, 0.2, 1).normalize();
    }

    const newPosition = center.clone().add(currentDirection.multiplyScalar(Math.max(distance, 0.4)));

    // Prevent clipping: adjust camera near/far planes according to distance
    this.camera.near = Math.max(0.01, radius * 0.05);
    this.camera.far = Math.max(50, distance * 10);
    this.camera.updateProjectionMatrix();

    this.startCameraTween(newPosition, center, durationMs);
  }

  /**
   * Set standard anatomical view presets (Anterior, Posterior, Lateral, Superior, etc.)
   */
  public setPreset(preset: CameraViewPreset, sceneCenter?: THREE.Vector3, durationMs: number = 650): void {
    const center = sceneCenter ? sceneCenter.clone() : this.defaultTarget.clone();
    const dist = this.defaultDistance;
    const targetPos = new THREE.Vector3();

    switch (preset) {
      case 'anterior':
        // Frontal view
        targetPos.set(center.x, center.y, center.z + dist);
        break;
      case 'posterior':
        // Back view
        targetPos.set(center.x, center.y, center.z - dist);
        break;
      case 'lateral-left':
        // Patient's left / Viewer's right
        targetPos.set(center.x + dist, center.y, center.z);
        break;
      case 'lateral-right':
        // Patient's right / Viewer's left
        targetPos.set(center.x - dist, center.y, center.z);
        break;
      case 'superior':
        // Top-down view
        targetPos.set(center.x, center.y + dist * 1.1, center.z + 0.01);
        break;
      case 'inferior':
        // Bottom-up view
        targetPos.set(center.x, center.y - dist * 1.1, center.z + 0.01);
        break;
      case 'isometric':
      case 'reset':
      default:
        // Ergonomic 3/4 anterolateral perspective
        targetPos.set(center.x + dist * 0.55, center.y + dist * 0.25, center.z + dist * 0.85);
        break;
    }

    this.startCameraTween(targetPos, center, durationMs);
  }

  private startCameraTween(targetCamPos: THREE.Vector3, targetLookAt: THREE.Vector3, duration: number): void {
    this.startPosition.copy(this.camera.position);
    this.targetPosition.copy(targetCamPos);

    this.startTarget.copy(this.controls.target);
    this.targetLookAt.copy(targetLookAt);

    this.animStartTime = performance.now();
    this.animDuration = duration;
    this.isAnimating = true;
  }

  /**
   * Call inside Three.js animation loop.
   * Returns true if camera is currently animating.
   */
  public update(): boolean {
    if (this.isAnimating) {
      const now = performance.now();
      const elapsed = now - this.animStartTime;
      const progress = Math.min(1.0, elapsed / this.animDuration);

      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(this.startPosition, this.targetPosition, ease);
      this.controls.target.lerpVectors(this.startTarget, this.targetLookAt, ease);

      if (progress >= 1.0) {
        this.isAnimating = false;
      }
    }

    this.controls.update();
    return this.isAnimating;
  }

  public getControls(): OrbitControls {
    return this.controls;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public reset(): void {
    this.setPreset('reset');
  }

  public dispose(): void {
    this.controls.dispose();
  }
}

// React component wrapper if invoked directly inside R3F / React context
export const AnatomyCamera: React.FC = () => {
  return null;
};
