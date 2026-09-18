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

export type MedicalContentType = 
  | 'Anatomy animation' 
  | 'Physiology animation' 
  | 'Disease mechanism' 
  | 'Surgical animation' 
  | 'Real surgical recording' 
  | 'Clinical examination' 
  | 'Bedside procedure' 
  | 'Diagnostic imaging' 
  | 'Lecture' 
  | 'Case discussion';

export interface SelfHostedMedicalVideo {
  // Required 28-field schema
  id: string;
  title: string;
  titleBn?: string;
  slug?: string;
  description: string;
  descriptionBn?: string;
  youtubeVideoId?: string;
  embedUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  sourceType?: 'self_hosted' | 'hls' | 'permitted_embed' | 'youtube_nocookie' | string;
  specialty: string | string[];
  section: string;
  topic: string;
  procedureName?: string;
  organSystem?: string;
  mbbsYear?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  language?: string;
  instructorOrPublisher?: string;
  thumbnailUrl: string;
  transcript?: string | {
    timestampSeconds: number;
    speaker: string;
    text: string;
  }[];
  learningObjectives?: string[];
  keySteps?: string[];
  clinicalPearls?: string[];
  prerequisiteTopics?: string[];
  contentType?: MedicalContentType | string;
  graphicContent?: boolean;
  verified?: boolean;
  embeddingAllowed?: boolean;
  published?: boolean;
  lastVerifiedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  // Legacy / Supplemental properties for catalog compatibility
  summary?: string;
  category?: 'Anatomy' | 'Physiology' | 'Pathology' | 'Surgery' | 'Clinical Skills' | 'Medical Imaging' | string;
  collection?: string;
  subtopic?: string;
  procedureType?: string;
  mbbsPhase?: string;
  durationSeconds?: number;
  hasCaptions?: boolean;
  mediaType?: 'animation' | 'cadaveric' | 'clinical_demonstration' | 'imaging' | 'real_surgery';
  instructor?: string;
  institution?: string;
  source?: string;
  playbackUrl?: string;
  captionsUrl?: string;
  hlsUrl?: string;
  graphicWarningText?: string;
  license?: string | {
    type: string;
    permission: string;
    evidence: string;
  };
  attribution?: string;
  publicationStatus?: VideoPublicationStatus;
  review?: {
    status: string;
    reviewerName: string;
    reviewerRole: string;
    reviewedAt: string;
    notes?: string;
  };
  chapters?: {
    timestampSeconds: number;
    title: string;
    titleBn?: string;
    description?: string;
  }[];
  surgicalSteps?: {
    stepNumber: number;
    stepTitle: string;
    description: string;
    keyAnatomy: string[];
    instruments: string[];
    warnings?: string[];
  }[];
  indications?: string[];
  contraindications?: string[];
  patientPreparation?: string[];
  relevantAnatomy?: string[];
  instruments?: string[];
  commonMistakes?: string[];
  complications?: string[];
  postoperativeCare?: string[];
  safetyDisclaimer?: string;
  textbookLinks?: {
    title: string;
    chapter: string;
    pages?: string;
  }[];
  curriculumLinks?: {
    phase: string;
    topic: string;
    syllabusCode?: string;
    acrossBooksTopicId?: string;
  };
  quiz?: VideoQuizQuestion[];
  relatedVideoIds?: string[];
  anatomy?: string[];
  procedure?: string[];
  topics?: string[];
  storage_path?: string;
  playback_url?: string;
  thumbnail_url?: string;
  captions_url?: string;
  created_at?: string;
}

export type ComprehensiveMedicalVideo = SelfHostedMedicalVideo;

export interface VideoQuizQuestion {
  id: string;
  question: string;
  questionBn?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  bmdcMark?: number;
}

export interface VideoTaxonomy {
  anatomy: Record<string, string[]>;
  surgery: Record<string, string[]>;
  physiology: Record<string, string[]>;
  pathology: Record<string, string[]>;
  clinicalSkills: Record<string, string[]>;
  imaging: Record<string, string[]>;
}

export interface VideoFilterCriteria {
  query?: string;
  category?: string;
  collection?: string;
  subtopic?: string;
  phase?: string;
  difficulty?: string;
  mediaType?: string;
  durationRange?: 'short' | 'medium' | 'long' | string;
  language?: string;
  hasCaptions?: boolean;
  facultyReviewedOnly?: boolean;
  completedOnly?: boolean;
  sortBy?: 'recent' | 'popular' | 'rating' | 'shortest' | 'longest' | 'title' | 'curriculum';
}

export interface VokaSyncReport {
  discovered: number;
  videosDiscovered?: number;
  newCandidates: number;
  existingVideos: number;
  rejectedShorts: number;
  embeddingDisabled: number;
  irrelevantVideos: number;
  errors: string[];
  apiErrors?: string[];
  channelHandle?: string;
  syncTimestamp?: string;
}

export interface VokaCandidateVideo extends SelfHostedMedicalVideo {
  classificationConfidence?: number;
  matchedRule?: string;
}

export interface VokaPublishPayload {
  id?: string;
  youtubeVideoId: string;
  title?: string;
  section: string;
  specialty?: string[];
  topic?: string;
  graphicContent?: boolean;
  reviewerName?: string;
  reviewerRole?: string;
  notes?: string;
}

