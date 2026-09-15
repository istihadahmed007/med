// ============================================================================
// Types for Production-Quality Interactive 3D Human Anatomy Module
// Tailored for Bangladesh MBBS Curriculum (BMDC) & Professional Medical Education
// ============================================================================

export type AnatomicalSystemId =
  | 'skin'            // 1. Skin / External anatomy (Integumentary)
  | 'skeletal'        // 2. Skeleton (Axial & Appendicular)
  | 'articular'       // 3. Articular & Ligaments (Joints, Capsules, Ligaments)
  | 'muscular'        // 4. Muscular system
  | 'cardiovascular'  // 5. Cardiovascular system (Heart, Great Vessels, Coronary Circulation)
  | 'nervous'         // 6. Nervous system (Brain, Cranial Nerves, Spinal Cord, Plexuses)
  | 'respiratory'     // 7. Respiratory system (Larynx, Trachea, Lungs, Bronchial Tree)
  | 'digestive'       // 8. Digestive system (GI Tract, Liver, Biliary, Pancreas)
  | 'urinary'         // 9. Urinary system (Kidneys, Ureters, Bladder, Urethra)
  | 'reproductive'    // 10. Reproductive system (Male & Female Pelvic Viscera)
  | 'lymphatic';      // 11. Lymphatic system (Spleen, Thymus, Lymph Node Chains)

export type AnatomicalRegion =
  | 'head-neck'
  | 'thorax'
  | 'abdomen'
  | 'pelvis-perineum'
  | 'upper-limb'
  | 'lower-limb'
  | 'neuroanatomy'
  | 'whole-body';

export interface AnatomicalRelations {
  anterior?: string;
  posterior?: string;
  medial?: string;
  lateral?: string;
  superior?: string;
  inferior?: string;
}

export interface ClinicalConnections {
  diseases: string[];
  symptoms: string[];
  clinicalExam: string[];
  investigations: string[];
  procedures: string[];
  management: string[];
}

export interface AnatomicalStructure {
  id: string;
  name: string;
  latinName?: string;
  commonName?: string;
  system: AnatomicalSystemId;
  subsystem?: string;
  region: AnatomicalRegion;
  meshIds: string[];          // Target mesh/node IDs in authentic GLTF/GLB models
  category: string;
  location: string;
  structureDescription: string;
  function: string;
  bloodSupply: string;
  venousDrainage: string;
  innervation: string;
  nerveSupply?: string;       // Backward compatibility alias for innervation
  lymphaticDrainage: string;
  relations: AnatomicalRelations;
  clinicalImportance: string;
  clinicalRelevance?: string; // Backward compatibility alias for clinicalImportance
  commonConditions: string[];
  associatedDiseases?: string[]; // Backward compatibility alias for commonConditions
  mbbsExamPoints: string[];   // High-yield Prof viva & written examination questions
  vivaQuestions?: string[];   // Backward compatibility alias for mbbsExamPoints
  ospeNotes: string[];        // Spotting tips, key identification marks
  organ?: string;             // Parent organ name
  meshKey?: string;           // Key mapping to Three.js mesh
  clinicalConnections?: ClinicalConnections;
  guidedTours?: string[];     // IDs of tours this structure participates in
  tags?: string[];
  has3DModel?: boolean;
  defaultPosition?: [number, number, number];
  color?: string;
  explodedOffset?: [number, number, number]; // Offset vector when exploded view is engaged
}

export type AnatomyMode = 'explore' | 'learn' | 'ospe' | 'clinical';

export type CameraViewPreset = 
  | 'anterior' 
  | 'posterior' 
  | 'left' 
  | 'right' 
  | 'superior' 
  | 'inferior' 
  | 'isometric'
  | 'reset';

export interface SystemLayerState {
  id: AnatomicalSystemId;
  name: string;
  visible: boolean;
  opacity: number;          // 0.0 to 1.0
  isolated: boolean;
  structureCount: number;
  color: string;
}

export interface GuidedTourStep {
  stepNumber: number;
  title: string;
  structureId: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  description: string;
  clinicalPearl: string;
  focusMeshId?: string;
}

export interface GuidedTour {
  id: string;
  title: string;
  system: AnatomicalSystemId;
  region: AnatomicalRegion;
  estimatedMinutes: number;
  description: string;
  steps: GuidedTourStep[];
}

export interface OspeStationQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  clinicalRelevance: string;
  bmdcMarks: number;
}

export interface OspeStation {
  id: string;
  stationNumber: number;
  targetStructureId: string;
  targetStructureName: string;
  pinLabel: string;
  pinColor: string;
  pinPosition: [number, number, number];
  system: AnatomicalSystemId;
  questions: OspeStationQuestion[];
}

export interface Anatomy3DAssetInfo {
  systemId: AnatomicalSystemId;
  modelUrl: string;
  assetSource: string;
  license: string;
  format: 'glb' | 'gltf';
  meshCount: number;
  dracoCompressed: boolean;
  status: 'unloaded' | 'loading' | 'ready' | 'not_found' | 'error';
  errorMessage?: string;
}
