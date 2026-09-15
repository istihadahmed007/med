export type NavigationView =
  | 'home'
  | 'learn'
  | '3d-anatomy'
  | 'physiology'
  | 'pathology'
  | 'pharmacology'
  | 'clinical-exam'
  | 'ospe'
  | 'osce'
  | 'procedures'
  | 'cases'
  | 'investigations'
  | 'treatment'
  | 'questions'
  | 'ai-viva'
  | 'ai-tutor'
  | 'progress'
  | 'faculty-admin'
  | 'histology'
  | 'surgery'
  | 'diagrams'
  | 'textbook'
  | 'comparison'
  | 'visual-engine';

export type UserRole = 'student' | 'faculty' | 'reviewer' | 'admin';

export type LearningMode = 
  | 'read' 
  | 'watch' 
  | 'interactive' 
  | 'practice' 
  | 'exam' 
  | 'revision';

export type BmdcPhase = 
  | 'Phase 1: 1st & 2nd Year (Pre-clinical)'
  | 'Phase 2: 3rd Year (Para-clinical)'
  | 'Phase 3: 4th Year (Para-clinical)'
  | 'Phase 4: 5th Year (Clinical)';

export interface BmdcSubject {
  id: string;
  name: string;
  bengaliName?: string;
  phase: BmdcPhase;
  icon: string;
  description: string;
  topicsCount: number;
  chapters: BmdcChapter[];
}

export interface BmdcChapter {
  id: string;
  title: string;
  topics: BmdcTopicSummary[];
}

export interface BmdcTopicSummary {
  id: string;
  title: string;
  system: string;
  isHighYield: boolean;
  has3DModel: boolean;
  hasSimulation: boolean;
}

export * from './anatomy';

export interface CardiacCyclePhase {
  id: number;
  name: string;
  shortCode: string;
  durationMs: number;
  ecgState: string;
  mitralValve: 'open' | 'closed';
  aorticValve: 'open' | 'closed';
  tricuspidValve: 'open' | 'closed';
  pulmonaryValve: 'open' | 'closed';
  ventricularPressure: number; // mmHg
  aorticPressure: number; // mmHg
  atrialPressure: number; // mmHg
  ventricularVolume: number; // mL
  heartSound: 'S1 (LUB)' | 'S2 (DUB)' | 'S3' | 'S4' | 'None';
  description: string;
  clinicalPearls: string;
}

export interface PathologyStage {
  stageNumber: number;
  title: string;
  subTitle: string;
  cellularChanges: string;
  grossMorphology: string;
  hemodynamicEffect: string;
  clinicalSymptoms: string[];
  investigationFindings: string[];
  complications: string[];
  vivaQuestion: string;
}

export interface DrugJourney {
  id: string;
  genericName: string;
  tradeNamesInBD: string[];
  drugClass: string;
  route: string;
  absorptionSite: string;
  distributionAndProteinBinding: string;
  targetReceptorOrEnzyme: string;
  molecularMechanism: string;
  physiologicalEffect: string;
  clinicalIndications: string[];
  contraindications: string[];
  adverseEffects: string[];
  monitoringParameters: string[];
  highYieldExamPoints: string[];
}

export interface ClinicalExamStep {
  stepId: string;
  stepNumber: number;
  category: 'introduction' | 'inspection' | 'palpation' | 'percussion' | 'auscultation' | 'conclusion';
  title: string;
  description: string;
  correctTechnique: string;
  studentActionRequired: string;
  normalFinding: string;
  abnormalFinding: string;
  examinerCritique: string;
}

export interface OspeStation {
  id: string;
  phase: string;
  subject: string;
  stationNumber: number;
  title: string;
  instructions: string;
  timeSeconds: number;
  specimenType: '3d-heart' | '3d-brain' | '3d-lungs' | 'histology-slide' | 'radiograph' | 'instrument';
  markedStructureId: string;
  questions: {
    id: string;
    prompt: string;
    marks: number;
    acceptableAnswers: string[];
    explanation: string;
  }[];
}

export interface OsceStation {
  id: string;
  stationNumber: number;
  title: string;
  domain: 'History Taking' | 'Clinical Examination' | 'Communication & Counseling' | 'Procedure Demonstration';
  patientScenario: string;
  patientScript: string;
  candidateInstructions: string;
  timeSeconds: number;
  markingRubric: {
    item: string;
    points: number;
    criteria: string;
  }[];
  modelPerformanceSummary: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  difficulty: 'Year 3' | 'Year 4' | 'Final Year MBBS';
  patientDemographics: {
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    occupation: string;
    ward: string;
  };
  chiefComplaint: string;
  historyOptions: {
    id: string;
    question: string;
    patientAnswer: string;
    clinicalSignificance: string;
  }[];
  initialVitals: {
    bp: string;
    hr: number;
    rr: number;
    spo2: number;
    temp: number;
    gcs: string;
  };
  physicalExamFindings: {
    system: string;
    inspection: string;
    palpation: string;
    percussion: string;
    auscultation: string;
  }[];
  availableInvestigations: {
    id: string;
    type: 'ECG' | 'Chest X-Ray' | 'Blood Gas' | 'CBC' | 'Cardiac Enzymes' | 'Electrolytes';
    resultTitle: string;
    reportSummary: string;
    revealedValue: string;
    isKeyInvestigation: boolean;
  }[];
  differentialDiagnoses: string[];
  finalDiagnosis: string;
  managementOptions: {
    id: string;
    treatmentName: string;
    isCorrectFirstLine: boolean;
    consequence: string;
    vitalsDelta?: Partial<{ bp: string; hr: number; rr: number; spo2: number }>;
  }[];
  debriefAndLearningPoints: string[];
}

export interface TreatmentAlgorithm {
  id: string;
  conditionName: string;
  authorityGuideline: string;
  lastReviewed: string;
  reviewerName: string;
  severityLevels: {
    level: 'Mild' | 'Moderate' | 'Severe / Life-Threatening';
    criteria: string[];
    firstLineManagement: string[];
    monitoring: string[];
    escalationTrigger: string;
  }[];
  emergencyReferralCriteria: string[];
  references: string[];
}

export interface EcgTestCase {
  id: string;
  name: string;
  heartRate: number;
  rhythm: string;
  axis: string;
  pWave: string;
  prInterval: string;
  qrsDuration: string;
  stSegment: string;
  tWave: string;
  diagnosis: string;
  highYieldPearl: string;
}

export interface QuestionBankItem {
  id: string;
  subject: string;
  phase: string;
  topic: string;
  type: 'MCQ' | 'SAQ' | 'VIVA';
  questionStem: string;
  options?: string[];
  correctOptionIndex?: number;
  explanation: string;
  bmdcReference: string;
}

export interface StudentProgress {
  userId: string;
  name: string;
  email: string;
  currentPhase: string;
  university: string;
  streakDays: number;
  overallReadinessScore: number;
  topicsStudied: number;
  casesCompleted: number;
  ospeStationsAttempted: number;
  accuracyRate: number;
  weakAreas: {
    subject: string;
    topic: string;
    accuracyPercent: number;
    recommendedAction: string;
  }[];
  spacedRepetitionDue: {
    topicId: string;
    topicTitle: string;
    phase: string;
    dueInHours: number;
    intervalDays: number;
  }[];
}

// NEW INTERFACES FOR EXTENDED VISUAL MEDICINE PLATFORM

export interface HistologySlide {
  id: string;
  organ: string;
  stain: string;
  normalTitle: string;
  pathologicalTitle: string;
  clinicalContext: string;
  magnificationAvailable: ('4x' | '10x' | '40x' | '100x')[];
  normalFeatures: {
    name: string;
    description: string;
    coords: { x: number; y: number };
  }[];
  pathologicalFeatures: {
    name: string;
    description: string;
    coords: { x: number; y: number };
  }[];
  hallmarkMicroscopicFinding: string;
  bmdcExamPearls: string;
  references: string;
}

export interface SurgicalStep {
  stepNumber: number;
  title: string;
  actionSummary: string;
  anatomicalExplanation: string;
  instrumentsRequired: string[];
  keyAnatomicalLandmark: string;
  surgicalRiskToAvoid: string;
  clinicalPearls: string;
}

export interface SurgicalProcedure {
  id: string;
  title: string;
  specialty: 'General Surgery' | 'Emergency Medicine & Trauma' | 'Anaesthesiology';
  indication: string;
  anesthesiaType: string;
  positioning: string;
  steps: SurgicalStep[];
  postOperativeCare: string[];
  references: string;
}

export interface DiagramLabel {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  clinicalPearl: string;
}

export interface MedicalDiagram {
  id: string;
  title: string;
  category: string;
  subTitle: string;
  labels: DiagramLabel[];
  clinicalSignificance: string;
  highYieldViva: string;
  references: string;
}

export interface TextbookChapter {
  id: string;
  subjectId: string;
  title: string;
  readTimeMinutes: number;
  learningObjectives: string[];
  sections: {
    heading: string;
    content: string;
    clinicalBox?: {
      title: string;
      text: string;
    };
    diagramRef?: string;
  }[];
  references: string[];
}
