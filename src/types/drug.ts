/**
 * Comprehensive Bangladesh Drug Reference & Pharmacology Study Centre Types
 * 
 * Aligned with BM&DC MBBS curriculum, Bangladesh DGDA regulatory standards,
 * and international nonproprietary names (INN).
 */

export type PrescriptionStatus = 
  | 'POM'              // Prescription Only Medicine
  | 'OTC'              // Over The Counter
  | 'Schedule G'        // Hormones/Steroids
  | 'Restricted'        // Specialist hospital only (e.g. ICU/Oncology)
  | 'Controlled';       // Narcotics / Controlled substances

export type MedicalReviewStatus = 
  | 'draft' 
  | 'clinical_review' 
  | 'approved' 
  | 'published' 
  | 'superseded' 
  | 'archived';

export type InteractionSeverity = 'major' | 'moderate' | 'minor';

export type BreastfeedingSafety = 'compatible' | 'caution' | 'contraindicated' | 'insufficient_data';

export type AdministrationRoute = 
  | 'Oral' 
  | 'IV' 
  | 'IM' 
  | 'SC' 
  | 'Inhalation' 
  | 'Sublingual' 
  | 'Topical' 
  | 'Rectal' 
  | 'Ophthalmic' 
  | 'Otic'
  | 'Nasal';

export interface ProvenanceSource {
  organization: string;
  title: string;
  url: string;
  publicationDate: string;
  jurisdiction: string;
  fetchedDate: string;
  version: string;
  notes?: string;
}

export interface MedicalReviewMetadata {
  status: MedicalReviewStatus;
  reviewerName: string;
  reviewerCredentials: string;
  reviewDate: string;
  lastUpdated: string;
  contentVersion: string;
}

export interface StructuredContraindication {
  condition: string;
  type: 'absolute' | 'relative';
  reason: string;
  explanation?: string;
  clinicalExplanationBn?: string;
}

export interface StructuredIndication {
  id: string;
  name: string;
  nameBn?: string;
  isPrimary: boolean;
  guidelineRecommendation?: string;
  note?: string;
  notes?: string;
  evidenceLevel?: string | number;
}

export interface MonitoringParameter {
  parameter: string;
  parameterBn?: string;
  frequency: string;
  targetOrClinicalAction: string;
}

export interface VivaQuestion {
  question: string;
  questionBn?: string;
  modelAnswer: string;
  highYieldPearl: string;
}

export interface DrugRecallCard {
  id: string;
  front: string;
  back: string;
  topic: string;
  highYield: boolean;
}

export interface DrugSbaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bmdcFocus: string;
}

export interface DrugClinicalCase {
  title: string;
  patientProfile: string;
  presentation: string;
  clinicalQuestion: string;
  discussion: string;
}

export interface TextbookRef {
  bookTitle: string;
  edition: string;
  chapterOrSection: string;
  verifiedTextbookId?: string;
}

export interface PharmacologyLearningModule {
  pathwaySummary: string;
  receptorTarget: string;
  receptorDiagramType?: string;
  vivaQuestions: VivaQuestion[];
  recallFlashcards: DrugRecallCard[];
  practiceSba: DrugSbaQuestion[];
  clinicalCaseScenario: DrugClinicalCase;
  textbookReferences: TextbookRef[];
  acrossBooksTopicIds: string[];
}

export interface DrugGeneric {
  id: string;                               // e.g. 'furosemide'
  name: string;                             // INN (e.g. "Furosemide")
  nameBn: string;                           // Phonetic alias (e.g. "ফিউরোসেমাইড")
  normalizedName: string;                   // 'furosemide'
  pharmacologicalClass: string;             // e.g. "Loop Diuretic (High-ceiling NKCC2 inhibitor)"
  therapeuticClass: string;                 // e.g. "Cardiovascular & Renal"
  therapeuticClassId: string;               // e.g. 'cardiovascular-renal'
  atcCode: string;                          // e.g. "C03CA01"
  prescriptionStatus: PrescriptionStatus;
  bmdcCurriculumPhase: string;              // e.g. "Phase 2 & Phase 4"
  mechanismOfAction: string;                // Detailed step-by-step physiological mechanism
  receptorOrTarget: string;                 // e.g. "Na+/K+/2Cl- cotransporter (NKCC2)"
  indications: StructuredIndication[];
  contraindications: StructuredContraindication[];
  dosageGuidance: {
    adult: string;
    paediatric?: string;
    pediatric?: string;
    geriatric?: string;
    routes: AdministrationRoute[];
    timingNotice?: string;
    administrationNotes?: string;
  };
  doseAdjustment: {
    renal: string;
    hepatic: string;
  };
  adverseEffects: {
    common: string[];
    uncommon: string[];
    rare: string[];
    seriousWarnings: string[];              // Black box / emergency warnings
  };
  precautions: string[];
  monitoringRequirements: MonitoringParameter[];
  foodInteractions: string;
  pregnancyInfo: {
    category: string;
    details: string;
    trimesterWarnings?: string;
  };
  breastfeedingInfo: {
    safety: BreastfeedingSafety;
    details: string;
  };
  paediatricConsiderations: string;
  geriatricConsiderations: string;
  overdoseInformation: {
    symptoms: string;
    management: string;
    antidote?: string;
  };
  storageInformation: string;
  sources: ProvenanceSource[];
  medicalReview: MedicalReviewMetadata;
  bilingualNotes: {
    classBn: string;
    mechanismSummaryBn: string;
    patientCounsellingBn: string;
    criticalWarningBn: string;
  };
  pharmacologyLearning: PharmacologyLearningModule;
  slug?: string;
  pharmacology?: string;
  pharmacokinetics?: {
    bioavailability?: string;
    halfLife?: string;
    metabolism?: string;
    excretion?: string;
  };
  overdoseInfo?: {
    symptoms?: string;
    management?: string;
    antidote?: string;
  };
  storageConditions?: string;
  keyInteractions?: Array<{
    genericB: string;
    severity: string;
    clinicalEffect: string;
    recommendation: string;
  }>;
}

export interface VerifiedPrice {
  amount: number;
  unit: string;
  source: string;
  verifiedDate: string;
}

export interface DrugBrand {
  id: string;                               // e.g. 'lasix-tab-40mg'
  slug?: string;
  name?: string;
  genericId: string;                        // foreign key to DrugGeneric
  brandName: string;                        // e.g. "Lasix"
  brandNameBn?: string;                     // e.g. "লাসিক্স"
  manufacturerId: string;                   // foreign key to Manufacturer
  manufacturerName: string;                 // Denormalized for display
  dosageForm: string;                       // e.g. "Tablet", "Injection", "Syrup"
  strength: string;                         // e.g. "40 mg", "20 mg / 2 ml"
  route?: string;
  packInfo: string;                         // e.g. "10 x 10's Blister Pack"
  registrationStatus?: string;              // e.g. "DGDA Active Marketing Authorization"
  prescriptionStatus?: PrescriptionStatus | string;
  activeStatus?: string;
  availability?: 'widely_available' | 'prescription_restricted' | 'hospital_only' | 'discontinued' | string;
  verifiedSource?: string;
  source?: string;
  sourceRecordId?: string;
  sourceUrl?: string;
  lastVerifiedDate?: string;
  lastSynchronizedDate?: string;
  registrationNumber?: string;
  unitPrice?: number;
  verifiedPrice?: VerifiedPrice;
}

export interface Manufacturer {
  id: string;                               // e.g. 'square'
  name: string;                             // e.g. "Square Pharmaceuticals PLC"
  shortName: string;                        // "Square"
  nameBn?: string;                          // "স্কয়ার ফার্মাসিউটিক্যালস"
  headquarters: string;                     // "Dhaka, Bangladesh"
  dgdaStatus: string;                       // "Active GMP Certified Manufacturer"
  website: string;
  totalVerifiedBrands?: number;
}

export interface TherapeuticClass {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  subclasses: string[];
}

export interface DrugInteraction {
  id: string;
  genericA: string;                         // Generic ID (normalized alphabetically)
  genericB: string;                         // Generic ID
  severity: InteractionSeverity;
  clinicalEffect: string;
  mechanism: string;
  management: string;
  evidenceSource: string;
  reviewedDate: string;
}

export interface DiseaseGuideline {
  id: string;
  title: string;
  titleBn: string;
  issuingOrganization: string;
  jurisdiction: string;
  publicationDate: string;
  version: string;
  officialLink: string;
  summary: string;
  firstLineGenerics: string[];
  secondLineGenerics: string[];
  contraindicatedGenerics: string[];
  reviewStatus: 'verified_official';
}

export interface ClinicalInvestigation {
  id: string;
  name: string;
  nameBn: string;
  specimen: string;
  purpose: string;
  normalReference: string;
  drugsCausingElevation: string[];
  drugsCausingReduction: string[];
  monitoringRole: string;
}

export interface DrugComparisonParameter {
  label: string;
  key: keyof DrugGeneric | 'mechanism' | 'seriousWarnings' | 'pregnancy' | 'renal' | 'monitoring' | 'interactions';
}

export interface UserDrugBookmarks {
  generics: string[];
  brands: string[];
}

export interface UserDrugNote {
  drugId: string;
  note: string;
  updatedAt: string;
}

export interface ReportedCorrection {
  id: string;
  userId: string;
  drugId: string;
  drugType: string;
  section: string;
  description: string;
  evidenceSource?: string;
  proposedCorrection?: string;
  status: string;
  createdAt: string;
}

export interface InteractionCheckResponse {
  evaluatedGenericsCount: number;
  evaluatedGenericIds: string[];
  hasInteractions: boolean;
  hasDuplicateTherapy: boolean;
  duplicateBrandWarnings: Array<{
    genericId: string;
    genericName: string;
    selectedBrands: string[];
    message: string;
  }>;
  interactions: DrugInteraction[];
  disclaimer: string;
  checkedAt: string;
}

export interface DrugComparisonMatrix {
  comparedGenerics: DrugGeneric[];
  preconfiguredComparison?: {
    id: string;
    title: string;
    titleBn: string;
    genericIds: string[];
    clinicalVerdict: string;
    keyDifferencesSummary: string;
  } | null;
  matrixRows: Array<{
    label: string;
    key: string;
    values: string[];
  }>;
}

export interface DrugSearchResponse {
  query: string;
  pagination: {
    page: number;
    limit: number;
    totalResults: number;
    totalGenerics: number;
    totalBrands: number;
    totalPages: number;
  };
  suggestions: string[];
  results: {
    generics: DrugGeneric[];
    brands: DrugBrand[];
    manufacturers: Manufacturer[];
    classes: TherapeuticClass[];
  };
}

export interface StudentDrugBookmark {
  id: string;
  userId: string;
  type: 'generic' | 'brand';
  targetId: string;
  title: string;
  subtitle?: string;
  savedAt: string;
}

export interface StudentDrugNote {
  id: string;
  userId: string;
  genericId: string;
  genericName: string;
  content: string;
  updatedAt: string;
}

export interface OfflineMonograph {
  genericId: string;
  genericName: string;
  downloadedAt: string;
  contentVersion: string;
  data: DrugGeneric;
  brands?: DrugBrand[];
  isOutdated?: boolean;
  latestVersionAvailable?: string;
}

export interface MedicalAuditLog {
  id: string;
  entityType: 'generic' | 'brand' | 'interaction' | 'guideline';
  entityId: string;
  editorName: string;
  editorRole: string;
  timestamp: string;
  action: 'create' | 'update' | 'review' | 'publish' | 'report_correction';
  changedFields?: Record<string, { old: any; new: any }>;
  reason: string;
  reviewerDecision?: string;
}

export interface DrugSearchResult {
  type: 'generic' | 'brand' | 'class' | 'indication' | 'manufacturer';
  id: string;
  title: string;
  titleBn?: string;
  subtitle: string;
  badge?: string;
  genericId?: string;
  highlights?: string[];
}

export type ImportAdapterType = 'rest' | 'rest_api' | 'csv' | 'excel' | 'json' | 'manual';
export type DrugImportJobStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed';

export interface DrugImportJob {
  id: string;
  adapterType: ImportAdapterType;
  sourceName: string;
  sourceLicence: string;
  status: DrugImportJobStatus;
  dryRun: boolean;
  batchSize: number;
  totalRecords: number;
  processedRows: number;
  inserted: number;
  updated: number;
  unchanged: number;
  skipped: number;
  failed: number;
  recordsInserted?: number;
  recordsUpdated?: number;
  recordsSkipped?: number;
  recordsFailed?: number;
  cursor?: string | null;
  startedAt: string;
  completedAt?: string | null;
  initiatedBy: string;
  summary: string;
}

export interface DrugImportError {
  id: string;
  jobId: string;
  rowNumber: number;
  rawData: string;
  field: string;
  reason: string;
  rejectedAt: string;
}

export interface DatabaseStatistics {
  totalBrands: number;
  totalGenerics: number;
  totalManufacturers: number;
  totalClasses?: number;
  totalTherapeuticClasses?: number;
  updatedThisMonth: number;
  recordsUpdatedThisMonth?: number;
  lastSynchronized?: string;
}

export interface DosageFormRecord {
  form: string;
  count: number;
  name?: string;
}

export interface BrandDetailResponse {
  brand: DrugBrand;
  generic: DrugGeneric | null;
  manufacturer?: Manufacturer | null;
  therapeuticClass?: TherapeuticClass | null;
  alternativeBrands?: Array<{
    id: string;
    brandName: string;
    brandNameBn?: string;
    manufacturerId?: string;
    manufacturerName?: string;
    strength?: string;
    dosageForm?: string;
    packInfo?: string;
    verifiedPrice?: VerifiedPrice;
    registrationStatus?: string;
    availability?: string;
  }>;
  otherBrandsWithSameGeneric?: DrugBrand[];
  availableStrengths?: string[];
  relatedClasses?: Array<{ id: string; name: string; slug?: string }>;
  sameFamilyFormulations?: DrugBrand[];
}

export interface DrugSearchParams {
  query?: string;
  filterType?: 'all' | 'generic' | 'brand' | 'class' | 'indication' | 'manufacturer';
  therapeuticClass?: string;
  indication?: string;
  manufacturerId?: string;
  letter?: string;
  dosageForm?: string;
  strength?: string;
  prescriptionStatus?: string;
  activeStatus?: string;
  page?: number;
  limit?: number;
}
