/**
 * MEDX Study Materials Type Definitions
 *
 * Types for the medical study materials system including subjects,
 * chapters/units, topics, sections, notes, bookmarks, and progress tracking.
 */

export type ContentVerificationStatus =
  | 'verified'
  | 'needs_review'
  | 'incomplete'
  | 'archived'
  | 'draft';

export type StudyDifficulty = 'Basic' | 'Intermediate' | 'Advanced' | 'Clinical';

export type BmdcPhaseShort = 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4';

export interface StudySubject {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  phase: BmdcPhaseShort;
  icon: string;
  color: string;
  description: string;
  totalTopics: number;
  units: StudyUnit[];
}

export interface StudyUnit {
  id: string;
  subjectId: string;
  title: string;
  slug: string;
  description?: string;
  sortOrder: number;
  topics: StudyTopicSummary[];
}

export interface StudyTopicSummary {
  id: string;
  unitId: string;
  subjectId: string;
  title: string;
  slug: string;
  difficulty: StudyDifficulty;
  estimatedReadingMinutes: number;
  isHighYield: boolean;
  verificationStatus: ContentVerificationStatus;
  hasContent: boolean;
}

export interface StudyTopic {
  id: string;
  unitId: string;
  subjectId: string;
  subjectName: string;
  unitTitle: string;
  title: string;
  slug: string;
  difficulty: StudyDifficulty;
  estimatedReadingMinutes: number;
  isHighYield: boolean;
  verificationStatus: ContentVerificationStatus;
  lastUpdated: string;
  author?: {
    name: string;
    designation?: string;
    institution?: string;
  };
  reviewer?: {
    name: string;
    designation?: string;
    reviewDate?: string;
  };
  sections: StudySection[];
  references?: string[];
  relatedTopicIds?: string[];
  relatedGenericIds?: string[];
  tags?: string[];
}

export type StudySectionType =
  | 'overview'
  | 'definition'
  | 'classification'
  | 'pathophysiology'
  | 'etiology'
  | 'clinical_features'
  | 'diagnosis'
  | 'investigations'
  | 'management'
  | 'complications'
  | 'prevention'
  | 'key_points'
  | 'exam_notes'
  | 'references'
  | 'custom';

export interface StudySection {
  id: string;
  type: StudySectionType;
  title: string;
  content: string | null;
  subSections?: StudySubSection[];
  tables?: StudyTable[];
  clinicalPearls?: string[];
  warnings?: string[];
  definitions?: StudyDefinition[];
  verificationStatus: ContentVerificationStatus;
  source?: string;
}

export interface StudySubSection {
  title: string;
  content: string;
}

export interface StudyTable {
  caption?: string;
  headers: string[];
  rows: string[][];
  source?: string;
}

export interface StudyDefinition {
  term: string;
  definition: string;
  source?: string;
}

// Student-specific types

export interface StudyBookmark {
  id: string;
  type: 'topic' | 'medicine' | 'condition' | 'document';
  targetId: string;
  title: string;
  subtitle?: string;
  savedAt: number;
}

export interface StudyReadingProgress {
  topicId: string;
  subjectId: string;
  title: string;
  scrollPercentage: number;
  lastReadAt: number;
  completed: boolean;
  timeSpentSeconds: number;
}

export interface StudyHistoryEntry {
  type: 'topic' | 'medicine' | 'search' | 'document';
  targetId: string;
  title: string;
  subtitle?: string;
  timestamp: number;
}

export interface StudyNote {
  id: string;
  topicId: string;
  topicTitle: string;
  subjectId: string;
  type: 'quick' | 'detailed' | 'exam' | 'clinical_pearl' | 'key_fact' | 'common_mistake' | 'high_yield';
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface StudentStudyState {
  bookmarks: StudyBookmark[];
  readingProgress: Record<string, StudyReadingProgress>;
  history: StudyHistoryEntry[];
  notes: StudyNote[];
  recentSearches: string[];
  completedTopicIds: string[];
  favoriteSubjectIds: string[];
}

// Section title map for display
export const SECTION_TYPE_LABELS: Record<StudySectionType, string> = {
  overview: 'Overview',
  definition: 'Definition',
  classification: 'Classification',
  pathophysiology: 'Pathophysiology',
  etiology: 'Etiology',
  clinical_features: 'Clinical Features',
  diagnosis: 'Diagnosis',
  investigations: 'Investigations',
  management: 'Management',
  complications: 'Complications',
  prevention: 'Prevention',
  key_points: 'Key Points',
  exam_notes: 'Exam Notes',
  references: 'References',
  custom: 'Notes',
};
