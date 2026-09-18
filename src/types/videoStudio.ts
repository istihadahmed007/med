export type VideoJobStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export type VideoPublicationStatus = 
  | 'draft' 
  | 'in_review' 
  | 'approved' 
  | 'published' 
  | 'rejected' 
  | 'archived';

export type VideoVisualFormat = 
  | '3d-macro' 
  | 'endoscopic' 
  | 'microscopic-histology' 
  | 'schematic-animation'
  | 'cellular-micro'
  | 'clinical-bedside'
  | 'surgical-orientation';

export type VisualFormat = VideoVisualFormat;

export type TargetAudience = 
  | 'undergraduate-mbbs' 
  | 'clinical-intern' 
  | 'postgraduate-fellow'
  | 'intern'
  | 'postgraduate';

export interface MedicalReviewChecklist {
  anatomicalCorrectness: boolean;
  sequenceAndMovement?: boolean;
  correctSequenceAndMovement?: boolean;
  objectiveConsistency?: boolean;
  consistencyWithObjective?: boolean;
  absenceOfArtifacts?: boolean;
  absenceOfMisleadingArtifacts?: boolean;
  captionAccuracy?: boolean;
  captionAndAnnotationAccuracy?: boolean;
  levelSuitability?: boolean;
  suitabilityForMbbsLevel?: boolean;
  comments?: string;
}

export interface VideoReview {
  id: string;
  jobId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: 'reviewer' | 'admin' | 'faculty';
  decision: 'approved' | 'revision_requested' | 'rejected' | 'archived';
  checklist: MedicalReviewChecklist;
  reviewedAt: string;
  videoVersion: string;
}

export interface MedicalReviewForm {
  jobId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerDesignation?: string;
  reviewerInstitution?: string;
  decision: 'approved' | 'rejected' | 'archived';
  checklist: {
    anatomicalCorrectness: boolean;
    correctSequenceAndMovement: boolean;
    consistencyWithObjective: boolean;
    absenceOfMisleadingArtifacts: boolean;
    captionAndAnnotationAccuracy: boolean;
    suitabilityForMbbsLevel: boolean;
  };
  comments: string;
  exactVideoVersion: string;
}

export interface VideoChapter {
  timestampSeconds: number;
  title: string;
  titleBn?: string;
  description?: string;
}

export interface TimestampedQuestion {
  id: string;
  timestampSeconds: number;
  prompt: string;
  promptBn?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  bmdcMark: number;
}

export type VideoQuestion = TimestampedQuestion;

export interface VideoGenerationJob {
  id: string;
  lessonId: string;
  lessonTitle: string;
  phase: string;
  subject: string;
  learningObjective: string;
  references: string[];
  prompt: string;
  negativePrompt?: string;
  visualFormat: VideoVisualFormat;
  targetAudience: TargetAudience;
  requiredStructures: string[];
  status: VideoJobStatus;
  publicationStatus: VideoPublicationStatus;
  authorId: string;
  authorName: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  videoUrl?: string;
  posterUrl?: string;
  durationSeconds?: number;
  resolution?: string;
  retryCount: number;
  maxRetries: number;
  error?: string;
  failureReason?: string;
  review?: VideoReview;
  telemetry?: {
    model_identifier: string;
    model_revision: string;
    base_architecture: string;
    is_verified_medical_weights: boolean;
    seed: number;
    duration_seconds: number;
    peak_vram_mb?: number;
    resolution: string;
    frame_count: number;
  };
}

export interface CreateVideoJobRequest {
  lessonId: string;
  lessonTitle: string;
  phase: string;
  subject: string;
  learningObjective: string;
  references: string[];
  prompt: string;
  visualFormat: VideoVisualFormat;
  targetAudience: TargetAudience;
  requiredStructures: string[];
  resolution?: string;
  seed?: number;
}

export interface LessonVideo {
  id: string;
  jobId?: string;
  lessonId: string;
  title: string;
  titleBn?: string;
  animationType?: string;
  videoUrl: string;
  lowBandwidthUrl?: string;
  posterUrl: string;
  durationSeconds: number;
  publicationStatus: VideoPublicationStatus;
  disclaimer: string;
  chapters: VideoChapter[];
  questions: TimestampedQuestion[];
  subtitles?: {
    startSeconds: number;
    endSeconds: number;
    textEn: string;
    textBn: string;
  }[];
  englishCaptionsVtt?: string;
  banglaCaptionsVtt?: string;
  transcriptEn: string;
  transcriptBn: string;
  reviewedBy?: string;
  approvedDate?: string;
  videoVersion: string;
}

export type LessonVideoAsset = LessonVideo;

export interface VideoStudentProgress {
  videoId: string;
  studentId: string;
  playbackPositionSeconds?: number;
  lastPositionSeconds: number;
  highestPositionSeconds?: number;
  watchedSeconds?: number;
  demonstratedUnderstanding?: boolean;
  completed: boolean;
  lastWatchedAt: string;
  answeredQuestionIds: string[];
  bookmarked: boolean;
}

export interface SelfHostedMedicalVideo {
  id: string;
  title: string;
  description: string;
  category: 'Anatomy' | 'Physiology' | 'Pathology' | 'Surgery' | string;
  anatomy: string[];
  specialty: string[];
  procedure: string[];
  topics: string[];
  storage_path: string;
  playback_url: string;
  thumbnail_url: string;
  duration: string;
  source: string;
  license: string;
  attribution: string;
  captions_url: string;
  created_at: string;
  chapters?: {
    timestampSeconds: number;
    title: string;
  }[];
  transcript?: string;
}
