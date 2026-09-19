export type TextbookAccessType = 'read_in_medx' | 'preview_available' | 'external_access';

export type ImportJobStatus = 'queued' | 'processing' | 'awaiting_review' | 'published' | 'failed';

export type ImportJobType = 'metadata_fetch' | 'file_upload' | 'url_import';

export type EditorialReviewStatus = 'approved' | 'pending_review' | 'rejected';

export interface LicenseInfo {
  licenseType: string; // e.g. 'CC-BY-4.0', 'Commercial (All Rights Reserved)', 'Open Government/Public Health', 'Private User Upload'
  attribution: string;
  allowedAudience: 'all' | 'undergraduate-mbbs' | 'verified-faculty' | 'private-owner';
  indexingPermitted: boolean;
  aiProcessingPermitted: boolean;
  termsUrl?: string;
}

export interface TextbookSection {
  id: string;
  chapterNumber?: number;
  title: string;
  titleBn?: string;
  pageIndex: number; // 0-based document page index
  printedPageLabel: string; // e.g. "ix", "142", "215"
  summary?: string;
  content?: string; // Present only when licensed for in-app reading
  ocrConfidence?: number; // 0-100 score if scanned, <80 flagged
  isOcr?: boolean;
  isFlaggedLowConfidence?: boolean;
  mappedTopicIds?: string[]; // Connected Across-Books permanent topic IDs
  previewAllowed?: boolean;
  readTimeMinutes?: number;
}

export interface TextbookRecord {
  id: string;
  title: string;
  titleBn?: string;
  subtitle?: string;
  authors: string[];
  editors?: string[];
  edition: string; // e.g. "14th Edition", "8th Edition"
  editionNumber?: number;
  publicationYear: number;
  publisher: string;
  isbn13?: string;
  isbn10?: string;
  subjectId: string; // e.g. 'anatomy', 'physiology', 'medicine', etc.
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4';
  accessType: TextbookAccessType;
  officialPublisherUrl?: string;
  authorizedAccessUrl?: string;
  coverImageUrl?: string;
  coverAttribution?: string;
  sourceUrl?: string;
  verificationDate: string; // ISO date format YYYY-MM-DD
  license: LicenseInfo;
  tableOfContents: TextbookSection[];
  connectedTopicIds: string[]; // Across-Books permanent topic IDs
  description?: string;
  descriptionBn?: string;
  bmdcCurriculumRelevance?: string;
  isBangladeshiCurriculumCore?: boolean;
  citationStandard?: string; // Formatted bibliographic citation (e.g. NLM / Vancouver)
  isUserUpload?: boolean;
  ownerId?: string;
  isPrivate?: boolean;
}

export interface ImportJob {
  id: string;
  type: ImportJobType;
  status: ImportJobStatus;
  targetTitle: string;
  targetIsbn?: string;
  ownerId: string;
  ownerRole: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  retryCount: number;
  maxRetries: number;
  failureReason?: string;
  diagnostics?: string;
  sourceUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  extractedMetadata?: Partial<TextbookRecord>;
  editorialReviewStatus?: EditorialReviewStatus;
  reviewerId?: string;
  reviewNotes?: string;
  isPrivateUpload?: boolean;
}

export interface TextbookBookmark {
  bookId: string;
  sectionId: string;
  bookTitle: string;
  sectionTitle: string;
  subjectId: string;
  pageIndex: number;
  printedPageLabel: string;
  savedAt: number;
}

export interface TextbookStudentNote {
  id: string;
  bookId: string;
  sectionId?: string;
  bookTitle: string;
  sectionTitle?: string;
  noteText: string;
  tags?: string[];
  updatedAt: number;
}

export interface TextbookFilterOptions {
  query: string;
  phase: string;
  subject: string;
  accessType: string;
  savedOnly?: boolean;
}
