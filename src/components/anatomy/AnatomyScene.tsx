import * as THREE from 'three';
import { AnatomyPerformanceManager } from './AnatomyPerformance';

export interface SceneOptions {
  container: HTMLElement;
  crossSectionEnabled?: boolean;
  crossSectionPlane?: 'axial' | 'sagittal' | 'coronal';
  crossSectionDepth?: number;
}

export class AnatomySceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public clipPlane: THREE.Plane;

  // Lights
  private keyLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private ambientLight: THREE.HemisphereLight;
  private groundPlane: THREE.Mesh | null = null;

  constructor(options: SceneOptions) {
    const { container } = options;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const perf = AnatomyPerformanceManager.getInstance().getProfile();

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040914); // Deep surgical navy
    this.scene.fog = new THREE.FogExp2(0x040914, 0.08);

    // 2. Camera Setup (FOV 34 matches reference project for minimal distortion)
    this.camera = new THREE.PerspectiveCamera(34, width / height, 0.05, 50);
    this.camera.position.set(0.65, 1.25, 2.4);

    // 3. Clipping Plane for cross-sections
    this.clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.0); // Off by default

    // 4. Renderer Setup with ACES Filmic Tone Mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: perf.antialias,
      powerPreference: 'high-performance',
      alpha: false,
      logarithmicDepthBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(perf.pixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.localClippingEnabled = true;

    // 5. Medical 3-Point Studio Lighting
    // Ambient Hemisphere: soft sky blue to slate ground
    this.ambientLight = new THREE.HemisphereLight(0xe0f2fe, 0x090d16, 0.75);
    this.scene.add(this.ambientLight);

    // Key Light: crisp frontal-upper illumination
    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    this.keyLight.position.set(2.0, 3.5, 3.0);
    this.scene.add(this.keyLight);

    // Fill Light: softer cyan-tinted lateral fill
    this.fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.85);
    this.fillLight.position.set(-2.5, 1.8, 1.5);
    this.scene.add(this.fillLight);

    // Rim Light: high-intensity posterior backlight for anatomical contour definition
    this.rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    this.rimLight.position.set(0.0, 2.5, -3.0);
    this.scene.add(this.rimLight);

    // 6. Ground Pedestal / Soft Contact Shadow Grid
    this.setupGround();

    // Attach to DOM
    container.appendChild(this.renderer.domElement);
  }

  private setupGround(): void {
    // Subtle radial gradient circle under feet
    const groundGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.22)');
      grad.addColorStop(0.4, 'rgba(6, 182, 212, 0.08)');
      grad.addColorStop(1, 'rgba(4, 9, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const groundMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });
    this.groundPlane = new THREE.Mesh(groundGeo, groundMat);
    this.groundPlane.rotation.x = -Math.PI / 2;
    this.groundPlane.position.y = -0.01;
    this.scene.add(this.groundPlane);
  }

  public updateClippingPlane(enabled: boolean, plane: 'axial' | 'sagittal' | 'coronal', depth: number): void {
    if (!enabled) {
      // Move clip plane out of range
      this.clipPlane.constant = 1000;
      return;
    }

    switch (plane) {
      case 'axial': // Horizontal transverse cut
        this.clipPlane.normal.set(0, -1, 0);
        this.clipPlane.constant = 0.95 + depth * 0.9;
        break;
      case 'sagittal': // Median sagittal cut (left/right)
        this.clipPlane.normal.set(-1, 0, 0);
        this.clipPlane.constant = depth * 0.45;
        break;
      case 'coronal': // Frontal cut (anterior/posterior)
        this.clipPlane.normal.set(0, 0, -1);
        this.clipPlane.constant = depth * 0.35;
        break;
    }
  }

  public resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    if (this.groundPlane) {
      this.groundPlane.geometry.dispose();
      (this.groundPlane.material as THREE.Material).dispose();
      this.scene.remove(this.groundPlane);
    }
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}

export const AnatomyScene: React.FC = () => null;
