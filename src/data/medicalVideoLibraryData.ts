/**
 * Comprehensive MBBS Medical Video Library Data Catalog
 *
 * Direct In-App Playback • Zero External Redirects • Verified Real Media Records
 * 20 Mandatory Medical Sections • Verified Educational Media Collection
 */

import { SelfHostedMedicalVideo, VideoQuizQuestion } from '../types/videoStudio';

export const MANDATORY_20_SECTIONS = [
  "Anatomy and Organ Function",
  "Physiology",
  "General Surgery",
  "Cardiothoracic Surgery",
  "Neurosurgery",
  "Orthopaedic Surgery",
  "Gastrointestinal Surgery",
  "Urology",
  "Obstetrics and Gynaecology",
  "ENT Surgery",
  "Ophthalmology",
  "Plastic and Reconstructive Surgery",
  "Anaesthesia and Critical Care",
  "Clinical Procedures",
  "Radiology and Medical Imaging",
  "Pathology and Disease Mechanisms",
  "Emergency Medicine",
  "Paediatrics",
  "Internal Medicine",
  "Community Medicine and Prevention"
] as const;

export type MandatorySection = (typeof MANDATORY_20_SECTIONS)[number];

export const VIDEO_CATEGORIES = [
  'All',
  ...MANDATORY_20_SECTIONS
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export const ANATOMY_COLLECTIONS: Record<string, string[]> = {
  "Gross Anatomy": ["Upper limb", "Lower limb", "Thorax", "Abdomen", "Pelvis and perineum", "Head and neck"],
  "Organ Anatomy": ["Heart", "Lungs", "Brain", "Kidneys and urinary tract"],
  "Neuroanatomy": ["Cerebral cortex", "Brainstem", "Cerebellum", "Cranial nerves"],
  "Imaging Anatomy": ["Brain CT", "Chest CT", "3D CT Angiography"],
  "Anatomy Procedures": ["Cadaveric dissection demonstrations", "Living anatomy"]
};

export const SURGERY_COLLECTIONS: Record<string, string[]> = {
  "General Surgery": ["Suturing and knot tying", "Appendectomy", "Cholecystectomy", "Hernia repair"],
  "Emergency Procedures": ["Haemorrhage control", "Airway management"],
  "Cardiothoracic Surgery": ["Coronary Artery Bypass Grafting", "Aortic Valve Replacement", "Chest-drain insertion"],
  "Gastrointestinal Surgery": ["Laparoscopic Cholecystectomy", "Appendectomy", "Colorectal surgery"],
  "Neurosurgery": ["Craniotomy", "Skull Base Surgery"],
  "Orthopaedic Surgery": ["Fracture reduction", "Intramedullary nailing"],
  "Obstetrics and Gynaecology": ["Caesarean section", "Normal delivery procedures"]
};

export const CATEGORY_TOPICS: Record<string, string[]> = {
  "Anatomy and Organ Function": ["Heart", "Brain", "Abdomen"],
  "Physiology": ["Breathing", "Kidney function", "Cardiac Cycle"],
  "General Surgery": ["Suturing and knot tying", "Cholecystectomy", "Hernia repair"],
  "Cardiothoracic Surgery": ["Coronary Artery Bypass Grafting", "Aortic Valve Replacement", "Chest-tube insertion"],
  "Neurosurgery": ["Craniotomy", "Skull Base Surgery"]
};

export interface VideoFilters {
  searchQuery?: string;
  query?: string;
  category?: VideoCategory | string;
  section?: string;
  collection?: string;
  specialty?: string;
  subtopic?: string;
  mbbsPhase?: string;
  phase?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  duration?: string;
  contentType?: string;
  mediaType?: string;
  verifiedOnly?: boolean;
  sortBy?: 'recent' | 'duration' | 'shortest' | 'longest' | 'title';
}

export const MEDICAL_VIDEO_LIBRARY_DATA: SelfHostedMedicalVideo[] = [];

export const MEDICAL_VIDEO_LIBRARY: SelfHostedMedicalVideo[] = MEDICAL_VIDEO_LIBRARY_DATA;

export function filterMedicalVideos(
  videos: SelfHostedMedicalVideo[],
  filters: VideoFilters
): SelfHostedMedicalVideo[] {
  return videos.filter((video) => {
    // Exclude draft or archived videos unless published or approved
    if (video.publicationStatus && video.publicationStatus !== 'published' && video.publicationStatus !== 'approved') {
      return false;
    }

    // 1. Search query filter
    const queryStr = filters.searchQuery || filters.query;
    if (queryStr) {
      const q = queryStr.toLowerCase().trim();
      const matchTitle = video.title?.toLowerCase().includes(q) || video.titleBn?.toLowerCase().includes(q);
      const matchDesc = video.description?.toLowerCase().includes(q) || video.descriptionBn?.toLowerCase().includes(q) || video.summary?.toLowerCase().includes(q);
      const matchTopic = video.topic?.toLowerCase().includes(q) || video.section?.toLowerCase().includes(q) || (video.topics && video.topics.some(t => t.toLowerCase().includes(q)));
      const matchSpec = Array.isArray(video.specialty) 
        ? video.specialty.some((s) => s.toLowerCase().includes(q))
        : video.specialty?.toLowerCase().includes(q);
      const matchPub = video.instructorOrPublisher?.toLowerCase().includes(q) || video.sourceName?.toLowerCase().includes(q) || video.source?.toLowerCase().includes(q);
      const matchProc = video.procedureName?.toLowerCase().includes(q) || video.organSystem?.toLowerCase().includes(q) || (video.procedure && video.procedure.some(p => p.toLowerCase().includes(q)));
      const matchAnat = video.anatomy && video.anatomy.some(a => a.toLowerCase().includes(q));
      const matchInst = video.surgicalSteps && video.surgicalSteps.some(s => s.instruments?.some(i => i.toLowerCase().includes(q)));
      const matchObj = video.learningObjectives && video.learningObjectives.some(o => o.toLowerCase().includes(q));

      if (!matchTitle && !matchDesc && !matchTopic && !matchSpec && !matchPub && !matchProc && !matchAnat && !matchInst && !matchObj) {
        return false;
      }
    }

    // 2. Category / Section filter
    if (filters.category && filters.category !== 'All') {
      const cat = filters.category.toLowerCase();
      const vidCat = (video.category || video.section || '').toLowerCase();
      const vidSec = (video.section || '').toLowerCase();
      const vidSpecs = Array.isArray(video.specialty) 
        ? video.specialty.map((s) => s.toLowerCase())
        : [(video.specialty || '').toLowerCase()];
      
      if (vidCat !== cat && vidSec !== cat && !vidSpecs.includes(cat) && !vidSec.includes(cat)) {
        return false;
      }
    }

    // 3. Section filter
    if (filters.section) {
      if (video.section?.toLowerCase() !== filters.section.toLowerCase()) {
        return false;
      }
    }

    // 4. Specialty filter
    if (filters.specialty) {
      const spec = filters.specialty.toLowerCase();
      const vidSpecs = Array.isArray(video.specialty)
        ? video.specialty.map((s) => s.toLowerCase())
        : [(video.specialty || '').toLowerCase()];
      if (!vidSpecs.includes(spec)) {
        return false;
      }
    }

    // 5. Collection filter
    if (filters.collection) {
      const col = filters.collection.toLowerCase();
      const vidCol = (video.collection || '').toLowerCase();
      if (vidCol !== col) {
        return false;
      }
    }

    // 6. Phase filter
    if (filters.phase || filters.mbbsPhase) {
      const targetPhase = (filters.phase || filters.mbbsPhase || '').toLowerCase();
      const vidPhase = (video.mbbsPhase || video.mbbsYear || '').toLowerCase();
      if (!vidPhase.includes(targetPhase)) {
        return false;
      }
    }

    // 7. Difficulty filter
    if (filters.difficulty) {
      if (video.difficulty !== filters.difficulty) {
        return false;
      }
    }

    // 8. Media type filter
    if (filters.mediaType) {
      if (video.mediaType !== filters.mediaType) {
        return false;
      }
    }

    // 9. Content type filter
    if (filters.contentType) {
      if (video.contentType !== filters.contentType) {
        return false;
      }
    }

    // 10. Verified only filter
    if (filters.verifiedOnly && !video.verified) {
      return false;
    }

    return true;
  });
}

export function sortMedicalVideos(
  videos: SelfHostedMedicalVideo[],
  sortBy: 'recent' | 'duration' | 'shortest' | 'longest' | 'title' = 'recent'
): SelfHostedMedicalVideo[] {
  const sorted = [...videos];
  if (sortBy === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'shortest') {
    sorted.sort((a, b) => (a.durationSeconds || 0) - (b.durationSeconds || 0));
  } else if (sortBy === 'longest' || sortBy === 'duration') {
    sorted.sort((a, b) => (b.durationSeconds || 0) - (a.durationSeconds || 0));
  } else {
    sorted.sort((a, b) => new Date(b.createdAt || b.created_at || 0).getTime() - new Date(a.createdAt || a.created_at || 0).getTime());
  }
  return sorted;
}

export function getRelatedVideos(
  currentVideo: SelfHostedMedicalVideo,
  allVideos: SelfHostedMedicalVideo[]
): SelfHostedMedicalVideo[] {
  return allVideos
    .filter((v) => v.id !== currentVideo.id && (v.section === currentVideo.section || v.topic === currentVideo.topic))
    .slice(0, 4);
}
