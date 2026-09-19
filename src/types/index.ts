export type NavigationView =
  | 'dashboard'
  | 'learn'
  | 'across-books'
  | 'textbook-library'
  | 'visual-lab'
  | 'cases'
  | 'practice'
  | 'revision'
  | 'progress'
  | 'faculty-admin'
  | 'video-studio'
  | 'drug-reference'
  | 'drugs'
  // Direct sub-routes for deep linking & backwards compatibility
  | 'home'
  | '3d-anatomy'
  | 'physiology'
  | 'pathology'
  | 'pharmacology'
  | 'clinical-exam'
  | 'ospe'
  | 'osce'
  | 'procedures'
  | 'investigations'
  | 'treatment'
  | 'questions'
  | 'ai-viva'
  | 'ai-tutor'
  | 'histology'
  | 'surgery'
  | 'diagrams'
  | 'textbook'
  | 'comparison'
  | 'visual-engine';

export * from './videoStudio';
export * from './textbook';
export * from './drug';

export type UserRole = 'student' | 'faculty' | 'author' | 'reviewer' | 'admin';

export type LessonStatus = 'draft' | 'in_review' | 'published' | 'archived';

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

export type BodySystem = 
  | 'cardiovascular'
  | 'respiratory'
  | 'nervous'
  | 'digestive'
  | 'urinary'
  | 'endocrine'
  | 'musculoskeletal'
  | 'reproductive'
  | 'hematology'
  | 'immune'
  | 'general';

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
  titleBn?: string;
  system: BodySystem;
  isHighYield: boolean;
  has3DModel: boolean;
  hasSimulation: boolean;
  isPublished?: boolean;
  lessonId?: string;
}

// 5-Stage Lesson Model: Learn -> Explore -> Apply -> Practice -> Revise
export interface BmdcLesson {
  id: string;
  title: string;
  titleBn?: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4';
  subjectId: string;
  subjectName: string;
  chapterId: string;
  system: BodySystem;
  learningObjectives: string[];
  prerequisites?: string[];
  estimatedMinutes: number;
  status: LessonStatus;
  version: string;
  author: {
    name: string;
    designation: string;
    institution: string;
  };
  reviewer?: {
    name: string;
    designation: string;
    institution: string;
    reviewDate?: string;
  };
  stages: {
    learn: {
      overviewEn: string;
      overviewBn: string;
      detailedContentEn: string;
      detailedContentBn: string;
      keyTakeaways: string[];
    };
    explore: {
      visualType: '3d-model' | 'interactive-diagram' | 'histology-slide' | 'ecg-trace' | 'xray-dicom' | 'comparison-slider' | 'video-animation';
      visualTargetId?: string;
      description: string;
      interactiveCheckpoints?: {
        name: string;
        nameBn?: string;
        note: string;
        coords?: { x: number; y: number };
      }[];
    };
    apply: {
      clinicalCorrelations: string[];
      linkedInvestigations?: {
        type: string;
        finding: string;
        significance: string;
      }[];
      emergencyRedFlags?: string[];
      pharmacologyLinks?: {
        drug: string;
        mechanism: string;
        indication: string;
      }[];
    };
    practice: {
      mcqIds: string[];
      vivaPrompts?: {
        prompt: string;
        keyPointsToMention: string[];
        reference: string;
      }[];
    };
    revise: {
      highYieldPearls: string[];
      flashcards: {
        front: string;
        back: string;
      }[];
    };
  };
  references: string[];
  lastUpdated: string;
}

// Mistake Notebook & Spaced Repetition Models
export interface MistakeEntry {
  id: string;
  questionId: string;
  subject: string;
  phase: string;
  topic: string;
  questionStem: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
  reviewed: boolean;
  reviewCount: number;
}

export interface SpacedRepetitionCard {
  id: string;
  lessonId: string;
  title: string;
  subject: string;
  phase: string;
  front: string;
  back: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  dueDate: number;
  lastReviewedDate?: number;
}

export interface LessonBookmark {
  lessonId: string;
  title: string;
  subject: string;
  phase: string;
  lastStep: 'learn' | 'explore' | 'apply' | 'practice' | 'revise';
  scrollPercentage: number;
  savedAt: number;
}

// Question Bank Item
export interface QuestionBankItem {
  id: string;
  subject: string;
  phase: string;
  topic: string;
  system?: BodySystem;
  type: 'MCQ' | 'SAQ' | 'VIVA' | 'IMAGE_BASED';
  questionStem: string;
  questionStemBn?: string;
  options?: string[];
  correctOptionIndex?: number;
  explanation: string;
  explanationBn?: string;
  bmdcReference: string;
  highYieldPearl?: string;
  imageUrl?: string;
  imageStructureTarget?: string;
}

// OSPE & OSCE Station Interfaces
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

// Clinical Case Engine Interface
export interface ClinicalCase {
  id: string;
  title: string;
  difficulty: 'Year 3' | 'Year 4' | 'Final Year MBBS';
  phase?: string;
  system?: BodySystem;
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
    type: 'ECG' | 'Chest X-Ray' | 'Blood Gas' | 'CBC' | 'Cardiac Enzymes' | 'Electrolytes' | 'Echocardiogram';
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

// Student Progress Interface
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
  completedLessonIds?: string[];
  quizAttemptsCount?: number;
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

// User & Auth State
export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  currentPhase: string;
  institution: string;
  token?: string;
}

// Physiology Interfaces
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
  ventricularPressure: number;
  aorticPressure: number;
  atrialPressure: number;
  ventricularVolume: number;
  heartSound: string;
  description: string;
  clinicalPearls: string;
  coronaryFlowPercent: number;
  atrialWave?: 'a wave' | 'c wave' | 'v wave' | 'x descent' | 'y descent' | 'none';
}

export interface PvLoopParameters {
  preloadEdv: number;
  afterloadMap: number;
  inotropyPercent: number;
  heartRateBpm: number;
}

export interface CardiacPathologyPreset {
  id: string;
  name: string;
  subtitle: string;
  murmurType: string;
  classicSign: string;
  bmdcExamYield: string;
  wiggersFeatures: string[];
  pvLoopChanges: string[];
  auscultationArea: 'aortic' | 'pulmonic' | 'mitral' | 'tricuspid' | 'erbs';
  soundGenerator: 'as' | 'ar' | 'ms' | 'mr' | 's3' | 's4' | 'normal';
}

export interface AuscultationSite {
  id: 'aortic' | 'pulmonic' | 'erbs' | 'tricuspid' | 'mitral';
  name: string;
  anatomicalLocation: string;
  ribSpace: string;
  primarySoundHeard: string;
  bestManeuver: string;
  radiationTo: string;
  coordinates: { x: number; y: number };
}

export interface CardiacVivaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  guytonCitation: string;
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
  x: number;
  y: number;
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

export * from './anatomy';
