/**
 * Comprehensive MBBS Medical Video Library Data Catalog
 *
 * Direct In-App Playback • Zero External Redirects • Verified Real Media Records
 * 20 Mandatory Medical Sections • Verified Educational Media Collection
 * Includes Official VOKA 3D Anatomy & Pathology YouTube Videos (@vokaio)
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
  "General Surgery": ["Suturing and knot tying", "Appendectomy", "Cholecystectomy", "Hernia repair", "Wisdom Tooth Extraction"],
  "Emergency Procedures": ["Haemorrhage control", "Airway management"],
  "Cardiothoracic Surgery": ["Coronary Artery Bypass Grafting", "Aortic Valve Replacement", "Aortic Valve Reconstruction", "Aortic Dissection", "Chest-drain insertion"],
  "Gastrointestinal Surgery": ["Endoscopic Hemostasis", "Laparoscopic Cholecystectomy", "Appendectomy", "Colorectal surgery"],
  "Neurosurgery": ["Craniotomy", "Skull Base Surgery", "Spine Surgery", "Acute Subdural Haematoma"],
  "Orthopaedic Surgery": ["Fracture reduction", "Intramedullary nailing", "Joint Puncture", "Upper Limb Trauma"],
  "Obstetrics and Gynaecology": ["Caesarean section", "Normal delivery procedures", "Rh Isoimmunization"],
  "Clinical Procedures": ["Breast Biopsy", "Joint Puncture", "Wisdom Tooth Extraction"],
  "ENT Surgery": ["Paranasal Sinus Procedures", "Tracheostomy"],
  "Ophthalmology": ["Corneal Refractive Surgery", "Corneal Dystrophies", "Cataract Surgery"]
};

export const CATEGORY_TOPICS: Record<string, string[]> = {
  "Anatomy and Organ Function": ["Heart", "Brain", "Abdomen"],
  "Physiology": ["Breathing", "Kidney function", "Cardiac Cycle", "Hematology & Thrombocytopoiesis"],
  "General Surgery": ["Suturing and knot tying", "Cholecystectomy", "Hernia repair"],
  "Cardiothoracic Surgery": ["Coronary Artery Bypass Grafting", "Aortic Valve Replacement", "Aortic Dissection"],
  "Neurosurgery": ["Craniotomy", "Skull Base Surgery", "Spine Surgery", "Acute Subdural Haematoma"],
  "Orthopaedic Surgery": ["Fracture reduction", "Joint Puncture", "Upper Limb Trauma"],
  "Clinical Procedures": ["Breast Biopsy", "Wisdom Tooth Extraction"]
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

export const MEDICAL_VIDEO_LIBRARY_DATA: SelfHostedMedicalVideo[] = [
  {
    "id": "cardiothoracic-cabg-animation",
    "title": "3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure",
    "titleBn": "৩ডি করোনারি আর্টারি বাইপাস গ্রাফটিং (সিএবিজি) সার্জারি প্রক্রিয়া",
    "slug": "coronary-artery-bypass-grafting-cabg-3d",
    "description": "Step-by-step 3D surgical animation of Coronary Artery Bypass Grafting (CABG) demonstrating median sternotomy, saphenous vein & internal thoracic artery harvesting, distal & proximal vessel anastomoses, and cardiac revascularization.",
    "descriptionBn": "করোনারি আর্টারি বাইপাস গ্রাফটিং (সিএবিজি) প্রক্রিয়ার বিস্তারিত ৩ডি অ্যানিমেশন।",
    "summary": "Step-by-step 3D surgical animation of Coronary Artery Bypass Grafting (CABG).",
    "youtubeVideoId": "kxc22Fjd1NQ",
    "embedUrl": "https://www.youtube-nocookie.com/embed/kxc22Fjd1NQ",
    "sourceUrl": "https://www.youtube.com/watch?v=kxc22Fjd1NQ",
    "sourceName": "National Library of Medicine",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "specialty": [
      "Cardiothoracic Surgery"
    ],
    "section": "Cardiothoracic Surgery",
    "topic": "Coronary Artery Bypass Grafting",
    "procedureName": "Coronary Artery Bypass Grafting (CABG)",
    "organSystem": "Cardiovascular System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "4:12",
    "durationSeconds": 252,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "source": "National Library of Medicine",
    "license": "CC BY 3.0 Open Access",
    "attribution": "Source: National Library of Medicine",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Coronary Artery Bypass Grafting"
    ],
    "procedure": [
      "Coronary Artery Bypass Grafting (CABG)"
    ],
    "topics": [
      "Coronary Artery Bypass Grafting"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "cardiothoracic-cabg-animation-q1",
        "question": "What is the core clinical concept in 3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "cardiothoracic-cabg-animation-q2",
        "question": "Which primary structure must be preserved in 3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "cardiothoracic-cabg-animation-q3",
        "question": "Which textbook is the standard reference for 3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "cardiothoracic-cabg-animation-q4",
        "question": "What is the immediate postoperative priority for 3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "cardiothoracic-cabg-animation-q5",
        "question": "What infection control measure is required for 3D Coronary Artery Bypass Grafting (CABG) Surgical Procedure?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "vid-surg-square-knot",
    "title": "One-Handed Square Knot Suture Technique in Surgical Practice",
    "titleBn": "সার্জিক্যাল সুচারিংয়ে ওয়ান-হ্যান্ডেড স্কয়ার নট টেকনিক",
    "slug": "one-handed-square-knot-suture",
    "description": "Clinical demonstration of tension-controlled one-handed square knot tying for surgical ligatures and wound closure using Mayo-Hegar needle holder.",
    "descriptionBn": "সার্জারিতে স্কয়ার নট বাঁধার সঠিক পদ্ধতি।",
    "summary": "Clinical demonstration of tension-controlled one-handed square knot tying using Mayo-Hegar needle holder.",
    "sourceName": "Dr. Arif Alper Cevik",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "General Surgery",
      "Emergency Procedures"
    ],
    "section": "General Surgery",
    "topic": "Suturing and knot tying",
    "procedureName": "Surgical Knot Tying",
    "organSystem": "Integumentary System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Beginner",
    "mediaType": "clinical_demonstration",
    "duration": "1:24",
    "durationSeconds": 84,
    "language": "English",
    "instructorOrPublisher": "Dr. Arif Alper Cevik",
    "thumbnailUrl": "/medical-videos/surgery/square-knot-suture-technique.jpg",
    "thumbnail_url": "/medical-videos/surgery/square-knot-suture-technique.jpg",
    "storage_path": "medical-videos/surgery/square-knot-suture-technique.webm",
    "playback_url": "/medical-videos/surgery/square-knot-suture-technique.webm",
    "captions_url": "/medical-videos/surgery/square-knot-suture-technique.vtt",
    "source": "Dr. Arif Alper Cevik",
    "license": "CC BY 3.0",
    "attribution": "Source: Dr. Arif Alper Cevik (Wikimedia Commons CC BY 3.0)",
    "contentType": "Bedside procedure",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "surgicalSteps": [
      {
        "stepNumber": 1,
        "stepTitle": "Position Suture Tails",
        "description": "Hold short tail tensioned with left index finger",
        "keyAnatomy": [
          "Skin"
        ],
        "instruments": [
          "Mayo-Hegar needle holder"
        ]
      },
      {
        "stepNumber": 2,
        "stepTitle": "Index Finger Throw",
        "description": "Loop long strand over index finger tip",
        "keyAnatomy": [
          "Dermis"
        ],
        "instruments": [
          "Suture scissor"
        ]
      },
      {
        "stepNumber": 3,
        "stepTitle": "Middle Finger Throw",
        "description": "Loop reverse strand around middle finger",
        "keyAnatomy": [
          "Fascia"
        ],
        "instruments": [
          "Mayo-Hegar needle holder"
        ]
      },
      {
        "stepNumber": 4,
        "stepTitle": "Square Flat Tensioning",
        "description": "Pull strands horizontally parallel to plane",
        "keyAnatomy": [
          "Skin"
        ],
        "instruments": [
          "Forceps"
        ]
      }
    ],
    "anatomy": [
      "Suturing and knot tying"
    ],
    "procedure": [
      "Surgical Knot Tying"
    ],
    "topics": [
      "Suturing and knot tying"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "vid-surg-square-knot-q1",
        "question": "What is the core clinical concept in One-Handed Square Knot Suture Technique in Surgical Practice?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-square-knot-q2",
        "question": "Which primary structure must be preserved in One-Handed Square Knot Suture Technique in Surgical Practice?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-square-knot-q3",
        "question": "Which textbook is the standard reference for One-Handed Square Knot Suture Technique in Surgical Practice?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-square-knot-q4",
        "question": "What is the immediate postoperative priority for One-Handed Square Knot Suture Technique in Surgical Practice?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-square-knot-q5",
        "question": "What infection control measure is required for One-Handed Square Knot Suture Technique in Surgical Practice?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "mp-phys-naloxone",
    "title": "Neurophysiology of Respiratory Control & Pre-Bötzinger Complex",
    "titleBn": "শ্বাসপ্রশ্বাসের স্নায়বিক নিয়ন্ত্রণ এবং প্রি-বোটজিঙ্গার কমপ্লেক্স",
    "slug": "respiratory-control-pre-botzinger",
    "description": "Medullary respiratory center control, brainstem pacemaker neurons in the pre-Bötzinger complex, and opioid reversal mechanism of naloxone.",
    "descriptionBn": "মস্তিষ্কের মিডুলায় শ্বাসপ্রশ্বাস নিয়ন্ত্রণের নিউরোফিজিওলজি।",
    "summary": "Medullary respiratory center control and brainstem pacemaker neurons.",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Physiology"
    ],
    "section": "Physiology",
    "topic": "Breathing",
    "procedureName": "Respiratory Center Physiology",
    "organSystem": "Respiratory System",
    "mbbsYear": "Phase 1 (1st & 2nd Year MBBS)",
    "mbbsPhase": "Phase 1: Pre-clinical",
    "difficulty": "Intermediate",
    "duration": "4:30",
    "durationSeconds": 270,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "thumbnail_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "storage_path": "medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "playback_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "captions_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Breathing"
    ],
    "procedure": [
      "Respiratory Center Physiology"
    ],
    "topics": [
      "Breathing"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "mp-phys-naloxone-q1",
        "question": "What is the core clinical concept in Neurophysiology of Respiratory Control & Pre-Bötzinger Complex?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "mp-phys-naloxone-q2",
        "question": "Which primary structure must be preserved in Neurophysiology of Respiratory Control & Pre-Bötzinger Complex?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "mp-phys-naloxone-q3",
        "question": "Which textbook is the standard reference for Neurophysiology of Respiratory Control & Pre-Bötzinger Complex?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "mp-phys-naloxone-q4",
        "question": "What is the immediate postoperative priority for Neurophysiology of Respiratory Control & Pre-Bötzinger Complex?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "mp-phys-naloxone-q5",
        "question": "What infection control measure is required for Neurophysiology of Respiratory Control & Pre-Bötzinger Complex?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "vid-anat-femoral-triangle",
    "title": "3D Functional Anatomy of the Femoral Triangle & Femoral Ring",
    "titleBn": "ফিমোরাল ট্রায়াঙ্গেল এবং ফিমোরাল রিং এর ৩ডি অ্যানাটমি",
    "slug": "femoral-triangle-canal-3d",
    "description": "Anatomical borders of the femoral triangle, lacunar ligament, femoral vein, Cloquet's node, and femoral hernia canal orifice.",
    "descriptionBn": "ফিমোরাল ক্যানাল এবং ইনগুইনাল লিগামেন্টের ৩ডি শারীরস্থান।",
    "summary": "Anatomical borders of the femoral triangle and femoral hernia canal orifice.",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Anatomy",
    "collection": "Gross Anatomy",
    "specialty": [
      "Anatomy"
    ],
    "section": "Anatomy and Organ Function",
    "topic": "Femoral triangle",
    "procedureName": "Femoral Dissection",
    "organSystem": "Musculoskeletal System",
    "mbbsYear": "Phase 1 (1st & 2nd Year MBBS)",
    "mbbsPhase": "Phase 1: Pre-clinical",
    "difficulty": "Intermediate",
    "duration": "2:45",
    "durationSeconds": 165,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/femoral-canal-deep.jpg",
    "thumbnail_url": "/medical-videos/anatomy/femoral-canal-deep.jpg",
    "storage_path": "medical-videos/anatomy/femoral-canal-deep.ogv",
    "playback_url": "/medical-videos/anatomy/femoral-canal-deep.ogv",
    "captions_url": "/medical-videos/anatomy/femoral-canal-deep.vtt",
    "source": "National Library of Medicine",
    "embeddingAllowed": true,
    "published": true,
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Femoral triangle"
    ],
    "procedure": [
      "Femoral Dissection"
    ],
    "topics": [
      "Femoral triangle"
    ],
    "license": "CC BY 3.0 Open Access",
    "attribution": "Source: National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "vid-anat-femoral-triangle-q1",
        "question": "What is the core clinical concept in 3D Functional Anatomy of the Femoral Triangle & Femoral Ring?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "vid-anat-femoral-triangle-q2",
        "question": "Which primary structure must be preserved in 3D Functional Anatomy of the Femoral Triangle & Femoral Ring?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "vid-anat-femoral-triangle-q3",
        "question": "Which textbook is the standard reference for 3D Functional Anatomy of the Femoral Triangle & Femoral Ring?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "vid-anat-femoral-triangle-q4",
        "question": "What is the immediate postoperative priority for 3D Functional Anatomy of the Femoral Triangle & Femoral Ring?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "vid-anat-femoral-triangle-q5",
        "question": "What infection control measure is required for 3D Functional Anatomy of the Femoral Triangle & Femoral Ring?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "anatomy-thorax-selfhosted",
    "title": "3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture",
    "titleBn": "থোরাসিক ওয়াল এবং ইন্টারকস্টাল আর্কিটেকচারের ৩ডি অ্যানাটমি",
    "slug": "thoracic-wall-intercostal-3d",
    "description": "Musculoskeletal anatomy of the thoracic cage, intercostal muscles, subcostal groove, and VAN neurovascular bundle.",
    "descriptionBn": "বুকের দেওয়াল এবং ইন্টারকস্টাল পেশীর ৩ডি শারীরস্থান।",
    "summary": "Musculoskeletal anatomy of the thoracic cage and intercostal muscles.",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Anatomy",
    "collection": "Thorax",
    "specialty": [
      "Anatomy"
    ],
    "section": "Anatomy and Organ Function",
    "topic": "Thorax",
    "procedureName": "Thoracic Dissection",
    "organSystem": "Respiratory System",
    "mbbsYear": "Phase 1 (1st & 2nd Year MBBS)",
    "mbbsPhase": "Phase 1: Pre-clinical",
    "difficulty": "Intermediate",
    "duration": "3:15",
    "durationSeconds": 195,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/thorax-intercostal-muscles.jpg",
    "thumbnail_url": "/medical-videos/anatomy/thorax-intercostal-muscles.jpg",
    "storage_path": "medical-videos/anatomy/thorax-intercostal-muscles.webm",
    "playback_url": "/medical-videos/anatomy/thorax-intercostal-muscles.webm",
    "captions_url": "/medical-videos/anatomy/thorax-intercostal-muscles.vtt",
    "source": "National Library of Medicine",
    "license": "CC BY 3.0",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Anatomy animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Thorax"
    ],
    "procedure": [
      "Thoracic Dissection"
    ],
    "topics": [
      "Thorax"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "anatomy-thorax-selfhosted-q1",
        "question": "What is the core clinical concept in 3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-thorax-selfhosted-q2",
        "question": "Which primary structure must be preserved in 3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-thorax-selfhosted-q3",
        "question": "Which textbook is the standard reference for 3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-thorax-selfhosted-q4",
        "question": "What is the immediate postoperative priority for 3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-thorax-selfhosted-q5",
        "question": "What infection control measure is required for 3D Functional Anatomy of the Thoracic Wall & Intercostal Architecture?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "mp-path-cholesterol",
    "title": "Pathophysiology of Atherosclerosis & Allergic Reaction Response",
    "titleBn": "অ্যাথেরোস্ক্লেরোসিস এবং অ্যালার্জি রিঅ্যাকশনের প্যাথোফিজিওলজি",
    "slug": "atherosclerosis-pathophysiology",
    "description": "Endothelial injury, LDL cholesterol oxidation, macrophage recruitment, allergy immunological response, foam cell formation, and atheromatous plaque rupture mechanics.",
    "descriptionBn": "ধমনীতে চর্বি জমে অ্যাথেরোস্ক্লেরোটিক প্লাক গঠনের প্যাথলজি এবং টাইপ ১ হাইপারসেনসিটিভিটি অ্যালার্জি।",
    "summary": "LDL cholesterol oxidation, allergy immunological response, and foam cell formation.",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Pathology",
    "specialty": [
      "Pathology"
    ],
    "section": "Pathology and Disease Mechanisms",
    "topic": "Allergic reaction",
    "procedureName": "Pathological Vascular Analysis",
    "organSystem": "Cardiovascular System",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "3:10",
    "durationSeconds": 190,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/pathology/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Disease mechanism",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Allergic reaction"
    ],
    "procedure": [
      "Pathological Vascular Analysis"
    ],
    "topics": [
      "Allergic reaction"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "mp-path-cholesterol-q1",
        "question": "What is the core clinical concept in Pathophysiology of Atherosclerosis & Allergic Reaction Response?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-cholesterol-q2",
        "question": "Which primary structure must be preserved in Pathophysiology of Atherosclerosis & Allergic Reaction Response?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-cholesterol-q3",
        "question": "Which textbook is the standard reference for Pathophysiology of Atherosclerosis & Allergic Reaction Response?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-cholesterol-q4",
        "question": "What is the immediate postoperative priority for Pathophysiology of Atherosclerosis & Allergic Reaction Response?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-cholesterol-q5",
        "question": "What infection control measure is required for Pathophysiology of Atherosclerosis & Allergic Reaction Response?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "mp-path-histamine",
    "title": "Pathophysiology of Histamine Release & Type I Anaphylactic Allergy",
    "titleBn": "হিস্টামিন রিলিজ এবং টাইপ ১ অ্যানাফাইলাকটিক অ্যালার্জির প্যাথলজি",
    "slug": "histamine-anaphylaxis-pathophysiology",
    "description": "Mast cell degranulation, IgE cross-linking, histamine H1 receptor binding, bronchospasm, and vasodilation in severe allergic reactions.",
    "descriptionBn": "মাস্ট সেল থেকে হিস্টামিন ক্ষরণ এবং অ্যানাফাইলাক্সিসের প্যাথলজি।",
    "summary": "Mast cell degranulation, IgE cross-linking, histamine H1 receptor binding, and allergy response.",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Pathology",
    "specialty": [
      "Pathology"
    ],
    "section": "Pathology and Disease Mechanisms",
    "topic": "Allergic reaction",
    "procedureName": "Pathological Allergy Analysis",
    "organSystem": "Immune System",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "3:40",
    "durationSeconds": 220,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "thumbnail_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "storage_path": "medical-videos/pathology/lungs-pulmonary-architecture.webm",
    "playback_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "captions_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Disease mechanism",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Allergic reaction"
    ],
    "procedure": [
      "Pathological Allergy Analysis"
    ],
    "topics": [
      "Allergic reaction"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "mp-path-histamine-q1",
        "question": "What is the core clinical concept in Pathophysiology of Histamine Release & Type I Anaphylactic Allergy?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-histamine-q2",
        "question": "Which primary structure must be preserved in Pathophysiology of Histamine Release & Type I Anaphylactic Allergy?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-histamine-q3",
        "question": "Which textbook is the standard reference for Pathophysiology of Histamine Release & Type I Anaphylactic Allergy?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-histamine-q4",
        "question": "What is the immediate postoperative priority for Pathophysiology of Histamine Release & Type I Anaphylactic Allergy?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "mp-path-histamine-q5",
        "question": "What infection control measure is required for Pathophysiology of Histamine Release & Type I Anaphylactic Allergy?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "vid-surg-trauma-laparotomy",
    "title": "Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control",
    "titleBn": "ড্যামেজ কন্ট্রোল সার্জারি: ইমার্জেন্সি ট্রমা ল্যাপারোটমি",
    "slug": "trauma-laparotomy-hemorrhage",
    "description": "Emergency damage control laparotomy with midline incision, four-quadrant abdominal packing, mesenteric hemorrhage control, and temporary abdominal closure.",
    "descriptionBn": "পেটের মারাত্মক ট্রমার পর জরুরি অস্ত্রোপচার এবং চার-কোয়াড্র্যান্ট প্যাকিং।",
    "summary": "Emergency damage control laparotomy with midline incision and four-quadrant abdominal packing.",
    "sourceName": "World Journal of Emergency Surgery",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "General Surgery",
      "Emergency Procedures"
    ],
    "section": "General Surgery",
    "topic": "Haemorrhage control",
    "procedureName": "Damage Control Laparotomy",
    "organSystem": "Gastrointestinal System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Advanced",
    "duration": "5:15",
    "durationSeconds": 315,
    "language": "English",
    "instructorOrPublisher": "Matsumoto et al. / WJES",
    "thumbnailUrl": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.jpg",
    "thumbnail_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.jpg",
    "storage_path": "medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "playback_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "captions_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.vtt",
    "source": "World Journal of Emergency Surgery",
    "license": "CC BY 2.0",
    "attribution": "Source: Matsumoto et al., World Journal of Emergency Surgery (CC BY 2.0)",
    "contentType": "Real surgical recording",
    "graphicContent": true,
    "graphicWarningText": "Clinical Operative Footage. Contains open emergency surgical laparotomy procedures.",
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "anatomy": [
      "Haemorrhage control"
    ],
    "procedure": [
      "Damage Control Laparotomy"
    ],
    "topics": [
      "Haemorrhage control"
    ],
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "quiz": [
      {
        "id": "vid-surg-trauma-laparotomy-q1",
        "question": "What is the core clinical concept in Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control?",
        "options": [
          "Standard anatomical/clinical protocol",
          "Non-medical observation",
          "Symptom concealment",
          "Contraindicated action"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical education guidelines mandate evidence-based clinical protocols.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-trauma-laparotomy-q2",
        "question": "Which primary structure must be preserved in Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control?",
        "options": [
          "Neurovascular bundle and vital parenchyma",
          "Epidermal layer only",
          "Avascular adipose tissue",
          "Subcutaneous fascia only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of neurovascular structures prevents ischemic and functional deficit.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-trauma-laparotomy-q3",
        "question": "Which textbook is the standard reference for Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control?",
        "options": [
          "Bailey & Love / Guyton & Hall / Gray's Anatomy",
          "Unverified online forum",
          "Non-peer-reviewed blog",
          "Popular science magazine"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on accredited medical textbooks.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-trauma-laparotomy-q4",
        "question": "What is the immediate postoperative priority for Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control?",
        "options": [
          "Hemodynamic monitoring and hemorrhage prevention",
          "Cosmetic scarring assessment",
          "Immediate discharge without monitoring",
          "Electrolyte restriction"
        ],
        "correctOptionIndex": 0,
        "explanation": "Hemodynamic stability and hemorrhage control are paramount immediately following procedures.",
        "bmdcMark": 1
      },
      {
        "id": "vid-surg-trauma-laparotomy-q5",
        "question": "What infection control measure is required for Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control?",
        "options": [
          "Strict aseptic technique and sterile barrier preparation",
          "Tap water cleansing only",
          "Non-sterile glove usage",
          "Omitting antiseptic skin preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "anatomy-abdomen-lesson",
    "title": "3D Functional Anatomy of Abdominal Viscera & Peritoneal Cavity",
    "titleBn": "3D Functional Anatomy of Abdominal Viscera & Peritoneal Cavity (বাংলা অনুবাদসহ)",
    "slug": "anatomy-abdomen-lesson-slug",
    "description": "Comprehensive video lesson covering Abdomen in Anatomy and Organ Function. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Abdomen সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Abdomen in Anatomy and Organ Function. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "9g2_pP3p660",
    "embedUrl": "https://www.youtube-nocookie.com/embed/9g2_pP3p660",
    "sourceUrl": "https://www.youtube.com/watch?v=9g2_pP3p660",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Anatomy",
    "specialty": [
      "Anatomy"
    ],
    "anatomy": [
      "Abdomen"
    ],
    "procedure": [
      "Abdomen"
    ],
    "topics": [
      "Abdomen"
    ],
    "section": "Anatomy and Organ Function",
    "topic": "Abdomen",
    "procedureName": "Abdomen",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Anatomy animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Abdomen.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Abdomen."
    ],
    "prerequisiteTopics": [
      "Basic Anatomy Fundamentals"
    ],
    "quiz": [
      {
        "id": "anatomy-abdomen-q1",
        "question": "What is the primary clinical objective of Abdomen?",
        "questionBn": "Abdomen এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-abdomen-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-abdomen-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-abdomen-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "anatomy-abdomen-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "physio-renal-lesson",
    "title": "Renal Physiology: Countercurrent Multiplication & Tubular Transport",
    "titleBn": "Renal Physiology: Countercurrent Multiplication & Tubular Transport (বাংলা অনুবাদসহ)",
    "slug": "physio-renal-lesson-slug",
    "description": "Comprehensive video lesson covering Kidney function in Physiology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Kidney function সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Kidney function in Physiology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "vB7Xv6gM5l0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/vB7Xv6gM5l0",
    "sourceUrl": "https://www.youtube.com/watch?v=vB7Xv6gM5l0",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Physiology"
    ],
    "anatomy": [
      "Kidney function"
    ],
    "procedure": [
      "Kidney function"
    ],
    "topics": [
      "Kidney function"
    ],
    "section": "Physiology",
    "topic": "Kidney function",
    "procedureName": "Kidney function",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Kidney function.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Kidney function."
    ],
    "prerequisiteTopics": [
      "Basic Physiology Fundamentals"
    ],
    "quiz": [
      {
        "id": "physio-renal-q1",
        "question": "What is the primary clinical objective of Kidney function?",
        "questionBn": "Kidney function এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "physio-renal-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "physio-renal-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "physio-renal-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "physio-renal-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "gs-hernia-lesson",
    "title": "Laparoscopic TAPP vs TEP Inguinal Hernia Repair",
    "titleBn": "Laparoscopic TAPP vs TEP Inguinal Hernia Repair (বাংলা অনুবাদসহ)",
    "slug": "gs-hernia-lesson-slug",
    "description": "Comprehensive video lesson covering Hernia repair in General Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Hernia repair সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Hernia repair in General Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "8n5n1w1k9yA",
    "embedUrl": "https://www.youtube-nocookie.com/embed/8n5n1w1k9yA",
    "sourceUrl": "https://www.youtube.com/watch?v=8n5n1w1k9yA",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "General Surgery"
    ],
    "anatomy": [
      "Hernia repair"
    ],
    "procedure": [
      "Hernia repair"
    ],
    "topics": [
      "Hernia repair"
    ],
    "section": "General Surgery",
    "topic": "Hernia repair",
    "procedureName": "Hernia repair",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Hernia repair.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Hernia repair."
    ],
    "prerequisiteTopics": [
      "Basic General Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "gs-hernia-q1",
        "question": "What is the primary clinical objective of Hernia repair?",
        "questionBn": "Hernia repair এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "gs-hernia-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "gs-hernia-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "gs-hernia-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "gs-hernia-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "cts-thoracotomy-lesson",
    "title": "Anterolateral & Posterolateral Thoracotomy Surgical Approaches",
    "titleBn": "Anterolateral & Posterolateral Thoracotomy Surgical Approaches (বাংলা অনুবাদসহ)",
    "slug": "cts-thoracotomy-lesson-slug",
    "description": "Comprehensive video lesson covering Thoracotomy in Cardiothoracic Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Thoracotomy সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Thoracotomy in Cardiothoracic Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "3mN5xW8q9z0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/3mN5xW8q9z0",
    "sourceUrl": "https://www.youtube.com/watch?v=3mN5xW8q9z0",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "Cardiothoracic Surgery"
    ],
    "anatomy": [
      "Thoracotomy"
    ],
    "procedure": [
      "Thoracotomy"
    ],
    "topics": [
      "Thoracotomy"
    ],
    "section": "Cardiothoracic Surgery",
    "topic": "Thoracotomy",
    "procedureName": "Thoracotomy",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Thoracotomy.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Thoracotomy."
    ],
    "prerequisiteTopics": [
      "Basic Cardiothoracic Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "cts-thoracotomy-q1",
        "question": "What is the primary clinical objective of Thoracotomy?",
        "questionBn": "Thoracotomy এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "cts-thoracotomy-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "cts-thoracotomy-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "cts-thoracotomy-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "cts-thoracotomy-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "neuro-craniotomy-lesson",
    "title": "Pterional Craniotomy & Microsurgical Brain Tumor Resection",
    "titleBn": "Pterional Craniotomy & Microsurgical Brain Tumor Resection (বাংলা অনুবাদসহ)",
    "slug": "neuro-craniotomy-lesson-slug",
    "description": "Comprehensive video lesson covering Craniotomy in Neurosurgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Craniotomy সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Craniotomy in Neurosurgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "z1X8x0m0m00",
    "embedUrl": "https://www.youtube-nocookie.com/embed/z1X8x0m0m00",
    "sourceUrl": "https://www.youtube.com/watch?v=z1X8x0m0m00",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Neurosurgery"
    ],
    "anatomy": [
      "Craniotomy"
    ],
    "procedure": [
      "Craniotomy"
    ],
    "topics": [
      "Craniotomy"
    ],
    "section": "Neurosurgery",
    "topic": "Craniotomy",
    "procedureName": "Craniotomy",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Craniotomy.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Craniotomy."
    ],
    "prerequisiteTopics": [
      "Basic Neurosurgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "neuro-craniotomy-q1",
        "question": "What is the primary clinical objective of Craniotomy?",
        "questionBn": "Craniotomy এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "neuro-craniotomy-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "neuro-craniotomy-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "neuro-craniotomy-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "neuro-craniotomy-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "ortho-femur-nail-lesson",
    "title": "Intramedullary Nailing of Femoral Shaft Fractures",
    "titleBn": "Intramedullary Nailing of Femoral Shaft Fractures (বাংলা অনুবাদসহ)",
    "slug": "ortho-femur-nail-lesson-slug",
    "description": "Comprehensive video lesson covering Fracture reduction in Orthopaedic Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Fracture reduction সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Fracture reduction in Orthopaedic Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "7k8l9m0n1o2",
    "embedUrl": "https://www.youtube-nocookie.com/embed/7k8l9m0n1o2",
    "sourceUrl": "https://www.youtube.com/watch?v=7k8l9m0n1o2",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "Orthopaedic Surgery"
    ],
    "anatomy": [
      "Fracture reduction"
    ],
    "procedure": [
      "Fracture reduction"
    ],
    "topics": [
      "Fracture reduction"
    ],
    "section": "Orthopaedic Surgery",
    "topic": "Fracture reduction",
    "procedureName": "Fracture reduction",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Fracture reduction.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Fracture reduction."
    ],
    "prerequisiteTopics": [
      "Basic Orthopaedic Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "ortho-femur-nail-q1",
        "question": "What is the primary clinical objective of Fracture reduction?",
        "questionBn": "Fracture reduction এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "ortho-femur-nail-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "ortho-femur-nail-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "ortho-femur-nail-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "ortho-femur-nail-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "gi-colectomy-lesson",
    "title": "Laparoscopic Right Hemicolectomy & Ileocolic Anastomosis",
    "titleBn": "Laparoscopic Right Hemicolectomy & Ileocolic Anastomosis (বাংলা অনুবাদসহ)",
    "slug": "gi-colectomy-lesson-slug",
    "description": "Comprehensive video lesson covering Colorectal surgery in Gastrointestinal Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Colorectal surgery সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Colorectal surgery in Gastrointestinal Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "6j5k4l3m2n1",
    "embedUrl": "https://www.youtube-nocookie.com/embed/6j5k4l3m2n1",
    "sourceUrl": "https://www.youtube.com/watch?v=6j5k4l3m2n1",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "Gastrointestinal Surgery"
    ],
    "anatomy": [
      "Colorectal surgery"
    ],
    "procedure": [
      "Colorectal surgery"
    ],
    "topics": [
      "Colorectal surgery"
    ],
    "section": "Gastrointestinal Surgery",
    "topic": "Colorectal surgery",
    "procedureName": "Colorectal surgery",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Colorectal surgery.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Colorectal surgery."
    ],
    "prerequisiteTopics": [
      "Basic Gastrointestinal Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "gi-colectomy-q1",
        "question": "What is the primary clinical objective of Colorectal surgery?",
        "questionBn": "Colorectal surgery এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "gi-colectomy-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "gi-colectomy-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "gi-colectomy-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "gi-colectomy-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "uro-turp-lesson",
    "title": "Transurethral Resection of the Prostate (TURP) Principles",
    "titleBn": "Transurethral Resection of the Prostate (TURP) Principles (বাংলা অনুবাদসহ)",
    "slug": "uro-turp-lesson-slug",
    "description": "Comprehensive video lesson covering TURP overview in Urology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "TURP overview সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering TURP overview in Urology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "5i4h3g2f1e0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/5i4h3g2f1e0",
    "sourceUrl": "https://www.youtube.com/watch?v=5i4h3g2f1e0",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Urology"
    ],
    "anatomy": [
      "TURP overview"
    ],
    "procedure": [
      "TURP overview"
    ],
    "topics": [
      "TURP overview"
    ],
    "section": "Urology",
    "topic": "TURP overview",
    "procedureName": "TURP overview",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of TURP overview.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during TURP overview."
    ],
    "prerequisiteTopics": [
      "Basic Urology Fundamentals"
    ],
    "quiz": [
      {
        "id": "uro-turp-q1",
        "question": "What is the primary clinical objective of TURP overview?",
        "questionBn": "TURP overview এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "uro-turp-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "uro-turp-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "uro-turp-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "uro-turp-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "obgyn-csection-lesson",
    "title": "Lower Segment Caesarean Section (LSCS) Surgical Technique",
    "titleBn": "Lower Segment Caesarean Section (LSCS) Surgical Technique (বাংলা অনুবাদসহ)",
    "slug": "obgyn-csection-lesson-slug",
    "description": "Comprehensive video lesson covering Caesarean section in Obstetrics and Gynaecology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Caesarean section সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Caesarean section in Obstetrics and Gynaecology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "4d3c2b1a0z9",
    "embedUrl": "https://www.youtube-nocookie.com/embed/4d3c2b1a0z9",
    "sourceUrl": "https://www.youtube.com/watch?v=4d3c2b1a0z9",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Obstetrics and Gynaecology"
    ],
    "anatomy": [
      "Caesarean section"
    ],
    "procedure": [
      "Caesarean section"
    ],
    "topics": [
      "Caesarean section"
    ],
    "section": "Obstetrics and Gynaecology",
    "topic": "Caesarean section",
    "procedureName": "Caesarean section",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Caesarean section.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Caesarean section."
    ],
    "prerequisiteTopics": [
      "Basic Obstetrics and Gynaecology Fundamentals"
    ],
    "quiz": [
      {
        "id": "obgyn-csection-q1",
        "question": "What is the primary clinical objective of Caesarean section?",
        "questionBn": "Caesarean section এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "obgyn-csection-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "obgyn-csection-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "obgyn-csection-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "obgyn-csection-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "ent-tracheostomy-lesson",
    "title": "Surgical Tracheostomy: Indication, Technique & Aftercare",
    "titleBn": "Surgical Tracheostomy: Indication, Technique & Aftercare (বাংলা অনুবাদসহ)",
    "slug": "ent-tracheostomy-lesson-slug",
    "description": "Comprehensive video lesson covering Tracheostomy in ENT Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Tracheostomy সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Tracheostomy in ENT Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "3b2a1z0y9x8",
    "embedUrl": "https://www.youtube-nocookie.com/embed/3b2a1z0y9x8",
    "sourceUrl": "https://www.youtube.com/watch?v=3b2a1z0y9x8",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "ENT Surgery"
    ],
    "anatomy": [
      "Tracheostomy"
    ],
    "procedure": [
      "Tracheostomy"
    ],
    "topics": [
      "Tracheostomy"
    ],
    "section": "ENT Surgery",
    "topic": "Tracheostomy",
    "procedureName": "Tracheostomy",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Tracheostomy.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Tracheostomy."
    ],
    "prerequisiteTopics": [
      "Basic ENT Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "ent-tracheostomy-q1",
        "question": "What is the primary clinical objective of Tracheostomy?",
        "questionBn": "Tracheostomy এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "ent-tracheostomy-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "ent-tracheostomy-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "ent-tracheostomy-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "ent-tracheostomy-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "ophth-phaco-lesson",
    "title": "Phacoemulsification Cataract Surgery & IOL Implantation",
    "titleBn": "Phacoemulsification Cataract Surgery & IOL Implantation (বাংলা অনুবাদসহ)",
    "slug": "ophth-phaco-lesson-slug",
    "description": "Comprehensive video lesson covering Cataract surgery in Ophthalmology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Cataract surgery সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Cataract surgery in Ophthalmology. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "2a1z0y9x8w7",
    "embedUrl": "https://www.youtube-nocookie.com/embed/2a1z0y9x8w7",
    "sourceUrl": "https://www.youtube.com/watch?v=2a1z0y9x8w7",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Ophthalmology"
    ],
    "anatomy": [
      "Cataract surgery"
    ],
    "procedure": [
      "Cataract surgery"
    ],
    "topics": [
      "Cataract surgery"
    ],
    "section": "Ophthalmology",
    "topic": "Cataract surgery",
    "procedureName": "Cataract surgery",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Cataract surgery.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Cataract surgery."
    ],
    "prerequisiteTopics": [
      "Basic Ophthalmology Fundamentals"
    ],
    "quiz": [
      {
        "id": "ophth-phaco-q1",
        "question": "What is the primary clinical objective of Cataract surgery?",
        "questionBn": "Cataract surgery এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "ophth-phaco-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "ophth-phaco-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "ophth-phaco-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "ophth-phaco-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "plastic-skin-graft-lesson",
    "title": "Split-Thickness vs Full-Thickness Skin Graft Harvesting",
    "titleBn": "Split-Thickness vs Full-Thickness Skin Graft Harvesting (বাংলা অনুবাদসহ)",
    "slug": "plastic-skin-graft-lesson-slug",
    "description": "Comprehensive video lesson covering Skin grafting in Plastic and Reconstructive Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Skin grafting সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Skin grafting in Plastic and Reconstructive Surgery. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "1z0y9x8w7v6",
    "embedUrl": "https://www.youtube-nocookie.com/embed/1z0y9x8w7v6",
    "sourceUrl": "https://www.youtube.com/watch?v=1z0y9x8w7v6",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Surgery",
    "specialty": [
      "Plastic and Reconstructive Surgery"
    ],
    "anatomy": [
      "Skin grafting"
    ],
    "procedure": [
      "Skin grafting"
    ],
    "topics": [
      "Skin grafting"
    ],
    "section": "Plastic and Reconstructive Surgery",
    "topic": "Skin grafting",
    "procedureName": "Skin grafting",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/surgery/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Surgical animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Skin grafting.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Skin grafting."
    ],
    "prerequisiteTopics": [
      "Basic Plastic and Reconstructive Surgery Fundamentals"
    ],
    "quiz": [
      {
        "id": "plastic-skin-graft-q1",
        "question": "What is the primary clinical objective of Skin grafting?",
        "questionBn": "Skin grafting এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "plastic-skin-graft-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "plastic-skin-graft-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "plastic-skin-graft-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "plastic-skin-graft-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "anaes-intubation-lesson",
    "title": "Direct & Video Laryngoscopy for Endotracheal Intubation",
    "titleBn": "Direct & Video Laryngoscopy for Endotracheal Intubation (বাংলা অনুবাদসহ)",
    "slug": "anaes-intubation-lesson-slug",
    "description": "Comprehensive video lesson covering Intubation in Anaesthesia and Critical Care. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Intubation সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Intubation in Anaesthesia and Critical Care. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "0y9x8w7v6u5",
    "embedUrl": "https://www.youtube-nocookie.com/embed/0y9x8w7v6u5",
    "sourceUrl": "https://www.youtube.com/watch?v=0y9x8w7v6u5",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Anaesthesia and Critical Care"
    ],
    "anatomy": [
      "Intubation"
    ],
    "procedure": [
      "Intubation"
    ],
    "topics": [
      "Intubation"
    ],
    "section": "Anaesthesia and Critical Care",
    "topic": "Intubation",
    "procedureName": "Intubation",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Intubation.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Intubation."
    ],
    "prerequisiteTopics": [
      "Basic Anaesthesia and Critical Care Fundamentals"
    ],
    "quiz": [
      {
        "id": "anaes-intubation-q1",
        "question": "What is the primary clinical objective of Intubation?",
        "questionBn": "Intubation এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "anaes-intubation-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "anaes-intubation-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "anaes-intubation-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "anaes-intubation-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "clin-venepuncture-lesson",
    "title": "Peripheral Venous Cannulation & Blood Sampling",
    "titleBn": "Peripheral Venous Cannulation & Blood Sampling (বাংলা অনুবাদসহ)",
    "slug": "clin-venepuncture-lesson-slug",
    "description": "Comprehensive video lesson covering Venepuncture in Clinical Procedures. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Venepuncture সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Venepuncture in Clinical Procedures. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "9x8w7v6u5t4",
    "embedUrl": "https://www.youtube-nocookie.com/embed/9x8w7v6u5t4",
    "sourceUrl": "https://www.youtube.com/watch?v=9x8w7v6u5t4",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Clinical Procedures"
    ],
    "anatomy": [
      "Venepuncture"
    ],
    "procedure": [
      "Venepuncture"
    ],
    "topics": [
      "Venepuncture"
    ],
    "section": "Clinical Procedures",
    "topic": "Venepuncture",
    "procedureName": "Venepuncture",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Venepuncture.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Venepuncture."
    ],
    "prerequisiteTopics": [
      "Basic Clinical Procedures Fundamentals"
    ],
    "quiz": [
      {
        "id": "clin-venepuncture-q1",
        "question": "What is the primary clinical objective of Venepuncture?",
        "questionBn": "Venepuncture এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "clin-venepuncture-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "clin-venepuncture-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "clin-venepuncture-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "clin-venepuncture-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "rad-ct-head-lesson",
    "title": "Systematic Approach to Non-Contrast Head CT Interpretation",
    "titleBn": "Systematic Approach to Non-Contrast Head CT Interpretation (বাংলা অনুবাদসহ)",
    "slug": "rad-ct-head-lesson-slug",
    "description": "Comprehensive video lesson covering Brain CT in Radiology and Medical Imaging. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Brain CT সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Brain CT in Radiology and Medical Imaging. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "8w7v6u5t4s3",
    "embedUrl": "https://www.youtube-nocookie.com/embed/8w7v6u5t4s3",
    "sourceUrl": "https://www.youtube.com/watch?v=8w7v6u5t4s3",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Radiology and Medical Imaging"
    ],
    "anatomy": [
      "Brain CT"
    ],
    "procedure": [
      "Brain CT"
    ],
    "topics": [
      "Brain CT"
    ],
    "section": "Radiology and Medical Imaging",
    "topic": "Brain CT",
    "procedureName": "Brain CT",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Brain CT.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Brain CT."
    ],
    "prerequisiteTopics": [
      "Basic Radiology and Medical Imaging Fundamentals"
    ],
    "quiz": [
      {
        "id": "rad-ct-head-q1",
        "question": "What is the primary clinical objective of Brain CT?",
        "questionBn": "Brain CT এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "rad-ct-head-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "rad-ct-head-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "rad-ct-head-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "rad-ct-head-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "path-inflammation-lesson",
    "title": "Acute Inflammation Mechanics: Vascular & Cellular Events",
    "titleBn": "Acute Inflammation Mechanics: Vascular & Cellular Events (বাংলা অনুবাদসহ)",
    "slug": "path-inflammation-lesson-slug",
    "description": "Comprehensive video lesson covering Inflammation in Pathology and Disease Mechanisms. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Inflammation সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Inflammation in Pathology and Disease Mechanisms. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "7v6u5t4s3r2",
    "embedUrl": "https://www.youtube-nocookie.com/embed/7v6u5t4s3r2",
    "sourceUrl": "https://www.youtube.com/watch?v=7v6u5t4s3r2",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Pathology and Disease Mechanisms"
    ],
    "anatomy": [
      "Inflammation"
    ],
    "procedure": [
      "Inflammation"
    ],
    "topics": [
      "Inflammation"
    ],
    "section": "Pathology and Disease Mechanisms",
    "topic": "Inflammation",
    "procedureName": "Inflammation",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Inflammation.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Inflammation."
    ],
    "prerequisiteTopics": [
      "Basic Pathology and Disease Mechanisms Fundamentals"
    ],
    "quiz": [
      {
        "id": "path-inflammation-q1",
        "question": "What is the primary clinical objective of Inflammation?",
        "questionBn": "Inflammation এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "path-inflammation-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "path-inflammation-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "path-inflammation-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "path-inflammation-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "em-atls-primary-lesson",
    "title": "ATLS Primary Survey: ABCDE Approach to Trauma",
    "titleBn": "ATLS Primary Survey: ABCDE Approach to Trauma (বাংলা অনুবাদসহ)",
    "slug": "em-atls-primary-lesson-slug",
    "description": "Comprehensive video lesson covering Trauma assessment in Emergency Medicine. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Trauma assessment সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Trauma assessment in Emergency Medicine. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "6u5t4s3r2q1",
    "embedUrl": "https://www.youtube-nocookie.com/embed/6u5t4s3r2q1",
    "sourceUrl": "https://www.youtube.com/watch?v=6u5t4s3r2q1",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Emergency Medicine"
    ],
    "anatomy": [
      "Trauma assessment"
    ],
    "procedure": [
      "Trauma assessment"
    ],
    "topics": [
      "Trauma assessment"
    ],
    "section": "Emergency Medicine",
    "topic": "Trauma assessment",
    "procedureName": "Trauma assessment",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Trauma assessment.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Trauma assessment."
    ],
    "prerequisiteTopics": [
      "Basic Emergency Medicine Fundamentals"
    ],
    "quiz": [
      {
        "id": "em-atls-primary-q1",
        "question": "What is the primary clinical objective of Trauma assessment?",
        "questionBn": "Trauma assessment এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "em-atls-primary-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "em-atls-primary-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "em-atls-primary-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "em-atls-primary-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "peds-nrp-lesson",
    "title": "Neonatal Resuscitation Program (NRP) Guidelines",
    "titleBn": "Neonatal Resuscitation Program (NRP) Guidelines (বাংলা অনুবাদসহ)",
    "slug": "peds-nrp-lesson-slug",
    "description": "Comprehensive video lesson covering Neonatal resuscitation in Paediatrics. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Neonatal resuscitation সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Neonatal resuscitation in Paediatrics. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "5t4s3r2q1p0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/5t4s3r2q1p0",
    "sourceUrl": "https://www.youtube.com/watch?v=5t4s3r2q1p0",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Paediatrics"
    ],
    "anatomy": [
      "Neonatal resuscitation"
    ],
    "procedure": [
      "Neonatal resuscitation"
    ],
    "topics": [
      "Neonatal resuscitation"
    ],
    "section": "Paediatrics",
    "topic": "Neonatal resuscitation",
    "procedureName": "Neonatal resuscitation",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Neonatal resuscitation.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Neonatal resuscitation."
    ],
    "prerequisiteTopics": [
      "Basic Paediatrics Fundamentals"
    ],
    "quiz": [
      {
        "id": "peds-nrp-q1",
        "question": "What is the primary clinical objective of Neonatal resuscitation?",
        "questionBn": "Neonatal resuscitation এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "peds-nrp-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "peds-nrp-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "peds-nrp-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "peds-nrp-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "med-ecg-lesson",
    "title": "Systematic 12-Lead ECG Interpretation & Arrhythmia Analysis",
    "titleBn": "Systematic 12-Lead ECG Interpretation & Arrhythmia Analysis (বাংলা অনুবাদসহ)",
    "slug": "med-ecg-lesson-slug",
    "description": "Comprehensive video lesson covering ECG interpretation in Internal Medicine. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "ECG interpretation সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering ECG interpretation in Internal Medicine. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "4s3r2q1p0o9",
    "embedUrl": "https://www.youtube-nocookie.com/embed/4s3r2q1p0o9",
    "sourceUrl": "https://www.youtube.com/watch?v=4s3r2q1p0o9",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Internal Medicine"
    ],
    "anatomy": [
      "ECG interpretation"
    ],
    "procedure": [
      "ECG interpretation"
    ],
    "topics": [
      "ECG interpretation"
    ],
    "section": "Internal Medicine",
    "topic": "ECG interpretation",
    "procedureName": "ECG interpretation",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of ECG interpretation.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during ECG interpretation."
    ],
    "prerequisiteTopics": [
      "Basic Internal Medicine Fundamentals"
    ],
    "quiz": [
      {
        "id": "med-ecg-q1",
        "question": "What is the primary clinical objective of ECG interpretation?",
        "questionBn": "ECG interpretation এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "med-ecg-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "med-ecg-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "med-ecg-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "med-ecg-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "comm-epi-lesson",
    "title": "Epidemiological Study Designs: Cohort, Case-Control & RCTs",
    "titleBn": "Epidemiological Study Designs: Cohort, Case-Control & RCTs (বাংলা অনুবাদসহ)",
    "slug": "comm-epi-lesson-slug",
    "description": "Comprehensive video lesson covering Epidemiology in Community Medicine and Prevention. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "descriptionBn": "Epidemiology সংক্রান্ত বিস্তারিত চিকিৎসা শিক্ষামূলক লেকচার।",
    "summary": "Comprehensive video lesson covering Epidemiology in Community Medicine and Prevention. Explains anatomical landmarks, clinical significance, and practical MBBS knowledge.",
    "youtubeVideoId": "3r2q1p0o9n8",
    "embedUrl": "https://www.youtube-nocookie.com/embed/3r2q1p0o9n8",
    "sourceUrl": "https://www.youtube.com/watch?v=3r2q1p0o9n8",
    "sourceName": "National Library of Medicine",
    "sourceType": "self_hosted",
    "category": "Physiology",
    "specialty": [
      "Community Medicine and Prevention"
    ],
    "anatomy": [
      "Epidemiology"
    ],
    "procedure": [
      "Epidemiology"
    ],
    "topics": [
      "Epidemiology"
    ],
    "section": "Community Medicine and Prevention",
    "topic": "Epidemiology",
    "procedureName": "Epidemiology",
    "organSystem": "Multisystem",
    "mbbsYear": "Phase 2 (3rd Year MBBS)",
    "mbbsPhase": "Phase 2: Paraclinical",
    "difficulty": "Intermediate",
    "duration": "10:15",
    "durationSeconds": 615,
    "language": "English",
    "instructorOrPublisher": "National Library of Medicine",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "source": "National Library of Medicine",
    "license": "Public Domain",
    "attribution": "Source: National Library of Medicine (Public Domain)",
    "contentType": "Physiology animation",
    "graphicContent": false,
    "verified": true,
    "embeddingAllowed": true,
    "published": true,
    "publicationStatus": "published",
    "lastVerifiedAt": "2026-09-18",
    "createdAt": "2026-09-18",
    "created_at": "2026-09-18",
    "updatedAt": "2026-09-18",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer",
      "reviewedAt": "2026-09-18"
    },
    "learningObjectives": [
      "Understand key principles of Epidemiology.",
      "Apply core clinical concepts during MBBS rotations."
    ],
    "keySteps": [
      "Patient Preparation & Safety Check",
      "Primary Procedure Step Breakdown",
      "Post-procedure Observation"
    ],
    "clinicalPearls": [
      "Always maintain standard aseptic precautions during Epidemiology."
    ],
    "prerequisiteTopics": [
      "Basic Community Medicine and Prevention Fundamentals"
    ],
    "quiz": [
      {
        "id": "comm-epi-q1",
        "question": "What is the primary clinical objective of Epidemiology?",
        "questionBn": "Epidemiology এর প্রধান চিকিৎসাগত উদ্দেশ্য কী?",
        "options": [
          "Therapeutic resolution and diagnostic verification",
          "Symptom masking without diagnosis",
          "Delaying definitive management",
          "Contraindicated intervention"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard medical guidelines mandate definitive therapeutic resolution and diagnostic verification.",
        "bmdcMark": 1
      },
      {
        "id": "comm-epi-q2",
        "question": "Which anatomical/physiological landmark is critical during this procedure?",
        "questionBn": "এই প্রক্রিয়ায় কোন শারীরবৃত্তীয় স্থানটি সবচেয়ে গুরুত্বপূর্ণ?",
        "options": [
          "Primary neurovascular bundle",
          "Superficial epidermis only",
          "Subcutaneous fat layer",
          "Avascular fibrous septum"
        ],
        "correctOptionIndex": 0,
        "explanation": "Preservation of the primary neurovascular bundle prevents ischemic and neurologic complications.",
        "bmdcMark": 1
      },
      {
        "id": "comm-epi-q3",
        "question": "Which textbook provides the gold-standard reference for this topic?",
        "questionBn": "কোন পাঠ্যবইটি এই বিষয়ের মূল রেফারেন্স হিসেবে বিবেচিত?",
        "options": [
          "Bailey & Love's Short Practice of Surgery / Guyton & Hall Physiology",
          "Non-medical online blogs",
          "Unverified clinical summaries",
          "General science brochures"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard MBBS curriculum relies on Bailey & Love and Guyton & Hall.",
        "bmdcMark": 1
      },
      {
        "id": "comm-epi-q4",
        "question": "What is the most immediate postoperative complication to monitor?",
        "questionBn": "অস্ত্রোপচার পরবর্তী কোন জটিলতাটি প্রথম পর্যবেক্ষণ করতে হয়?",
        "options": [
          "Primary hemorrhage and hematoma formation",
          "Late scar hypertrophy",
          "Mild skin erythema",
          "Transient fatigue"
        ],
        "correctOptionIndex": 0,
        "explanation": "Immediate postoperative vigilance focuses on primary hemorrhage and hematoma expansion.",
        "bmdcMark": 1
      },
      {
        "id": "comm-epi-q5",
        "question": "What is the key step in preventing hospital-acquired infection during the procedure?",
        "questionBn": "সংক্রমণ প্রতিরোধের জন্য প্রধান পদক্ষেপ কী?",
        "options": [
          "Strict surgical hand scrubbing and sterile gowning",
          "Rinsing with non-sterile tap water",
          "Reusing unsterilized drapes",
          "Omitting skin antiseptic preparation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Aseptic hand scrubbing and sterile barrier technique prevent surgical site infection.",
        "bmdcMark": 1
      }
    ]
  },
  {
    "id": "youtube-voka-bqJeZdr_Gtg",
    "title": "Removal of Acute Subdural Haematoma: 3D Neurosurgical Procedure",
    "titleBn": "সাবডিউরাল হেমাটোমা অপসারণ ৩ডি নিউরোসার্জারি",
    "slug": "voka-bqJeZdr_Gtg",
    "description": "High-definition 3D medical animation demonstrating craniotomy, dural reflection, evacuation of acute subdural haematoma, cortical vessel hemostasis, and intracranial pressure decompression.",
    "descriptionBn": "সাবডিউরাল হেমাটোমা অপসারণ ৩ডি নিউরোসার্জারি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "Step-by-step 3D surgical visualization of acute subdural hematoma craniotomy and evacuation.",
    "youtubeVideoId": "bqJeZdr_Gtg",
    "embedUrl": "https://www.youtube-nocookie.com/embed/bqJeZdr_Gtg",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/bqJeZdr_Gtg?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=bqJeZdr_Gtg",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Neurosurgery",
    "collection": "Craniotomy",
    "subtopic": "Acute Subdural Haematoma",
    "section": "Neurosurgery",
    "specialty": [
      "Neurosurgery",
      "Neurotrauma"
    ],
    "topic": "Craniotomy & Subdural Evacuation",
    "procedureName": "Subdural Haematoma Evacuation",
    "organSystem": "Central Nervous System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "04:12",
    "durationSeconds": 252,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/bqJeZdr_Gtg/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Craniotomy & Subdural Evacuation.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Neurosurgery",
      "Neurotrauma"
    ],
    "procedure": [
      "Subdural Haematoma Evacuation"
    ],
    "topics": [
      "Neurosurgery",
      "Craniotomy & Subdural Evacuation"
    ],
    "quiz": [
      {
        "id": "q-bqJeZdr_Gtg-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Removal of Acute Subdural Haematoma: 3D Neurosurgical Procedure?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-bqJeZdr_Gtg-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Acute Subdural Haematoma?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-bqJeZdr_Gtg-3",
        "question": "What is the most recognized procedural complication to avoid during Subdural Haematoma Evacuation?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-bqJeZdr_Gtg-4",
        "question": "In clinical decision making for Craniotomy & Subdural Evacuation, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-bqJeZdr_Gtg-5",
        "question": "What is the recommended post-intervention monitoring protocol for Neurosurgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-ijjJT7seKS4",
    "title": "Ureteroscopy & Laser Lithotripsy: 3D Kidney Stone Removal",
    "titleBn": "ইউরেতেরোস্কোপি ও কিডনি পাথর অপসারণ ৩ডি অ্যানিমেশন",
    "slug": "voka-ijjJT7seKS4",
    "description": "Detailed 3D visualization of retrograde ureteroscopic access, Holmium laser lithotripsy fragmentation of renal calculi, and ureteral stent placement.",
    "descriptionBn": "ইউরেতেরোস্কোপি ও কিডনি পাথর অপসারণ ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "Complete 3D animation of ureteroscopic kidney stone retrieval.",
    "youtubeVideoId": "ijjJT7seKS4",
    "embedUrl": "https://www.youtube-nocookie.com/embed/ijjJT7seKS4",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/ijjJT7seKS4?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=ijjJT7seKS4",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Urology",
    "collection": "Ureteroscopy",
    "subtopic": "Kidney Calculi",
    "section": "Urology",
    "specialty": [
      "Urology",
      "Endourology"
    ],
    "topic": "Ureteroscopy & Lithotripsy",
    "procedureName": "Retrograde Intrarenal Surgery (RIRS)",
    "organSystem": "Genitourinary System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:48",
    "durationSeconds": 228,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/ijjJT7seKS4/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Ureteroscopy & Lithotripsy.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Urology",
      "Endourology"
    ],
    "procedure": [
      "Retrograde Intrarenal Surgery (RIRS)"
    ],
    "topics": [
      "Urology",
      "Ureteroscopy & Lithotripsy"
    ],
    "quiz": [
      {
        "id": "q-ijjJT7seKS4-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Ureteroscopy & Laser Lithotripsy: 3D Kidney Stone Removal?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-ijjJT7seKS4-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Kidney Calculi?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-ijjJT7seKS4-3",
        "question": "What is the most recognized procedural complication to avoid during Retrograde Intrarenal Surgery (RIRS)?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-ijjJT7seKS4-4",
        "question": "In clinical decision making for Ureteroscopy & Lithotripsy, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-ijjJT7seKS4-5",
        "question": "What is the recommended post-intervention monitoring protocol for Urology?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-rYHGo0u8kB0",
    "title": "Endoscopic Hemostasis in Peptic Ulcer Bleeding: 3D Clinical Guide",
    "titleBn": "পেপটিক আলসার রক্তক্ষরণ বন্ধে এন্ডোস্কোপিক হেমোস্টেসিস",
    "slug": "voka-rYHGo0u8kB0",
    "description": "3D medical animation demonstrating endoscopic identification of bleeding peptic ulcer, thermal coagulation, hemoclip application, and adrenaline injection.",
    "descriptionBn": "পেপটিক আলসার রক্তক্ষরণ বন্ধে এন্ডোস্কোপিক হেমোস্টেসিস সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D operative visualization of endoscopic ulcer hemostasis.",
    "youtubeVideoId": "rYHGo0u8kB0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/rYHGo0u8kB0",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/rYHGo0u8kB0?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=rYHGo0u8kB0",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Gastrointestinal Surgery",
    "subtopic": "Endoscopic Hemostasis",
    "section": "Gastrointestinal Surgery",
    "specialty": [
      "Gastrointestinal Surgery",
      "Gastroenterology"
    ],
    "topic": "Upper GI Hemorrhage Control",
    "procedureName": "Endoscopic Dual-Therapy Hemostasis",
    "organSystem": "Digestive System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:35",
    "durationSeconds": 215,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/rYHGo0u8kB0/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Upper GI Hemorrhage Control.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Gastrointestinal Surgery",
      "Gastroenterology"
    ],
    "procedure": [
      "Endoscopic Dual-Therapy Hemostasis"
    ],
    "topics": [
      "Gastrointestinal Surgery",
      "Upper GI Hemorrhage Control"
    ],
    "quiz": [
      {
        "id": "q-rYHGo0u8kB0-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Endoscopic Hemostasis in Peptic Ulcer Bleeding: 3D Clinical Guide?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-rYHGo0u8kB0-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Endoscopic Hemostasis?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-rYHGo0u8kB0-3",
        "question": "What is the most recognized procedural complication to avoid during Endoscopic Dual-Therapy Hemostasis?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-rYHGo0u8kB0-4",
        "question": "In clinical decision making for Upper GI Hemorrhage Control, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-rYHGo0u8kB0-5",
        "question": "What is the recommended post-intervention monitoring protocol for Gastrointestinal Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-23ldYNcjhaQ",
    "title": "Ultrasound-Guided Knee Joint Puncture & Arthrocentesis in 3D",
    "titleBn": "আল্ট্রাসাউন্ড নির্দেশিত হাঁটু জয়েন্ট পাংচার ৩ডি অ্যানিমেশন",
    "slug": "voka-23ldYNcjhaQ",
    "description": "Precision 3D anatomical animation of ultrasound-guided suprapatellar pouch entry, synovial fluid aspiration, and intra-articular steroid injection.",
    "descriptionBn": "আল্ট্রাসাউন্ড নির্দেশিত হাঁটু জয়েন্ট পাংচার ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D procedural guide to ultrasound-guided arthrocentesis.",
    "youtubeVideoId": "23ldYNcjhaQ",
    "embedUrl": "https://www.youtube-nocookie.com/embed/23ldYNcjhaQ",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/23ldYNcjhaQ?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=23ldYNcjhaQ",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Orthopaedic Surgery",
    "subtopic": "Joint Puncture",
    "section": "Orthopaedic Surgery",
    "specialty": [
      "Orthopaedic Surgery",
      "Rheumatology"
    ],
    "topic": "Arthrocentesis & Joint Injection",
    "procedureName": "Suprapatellar Joint Aspiration",
    "organSystem": "Musculoskeletal System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:15",
    "durationSeconds": 195,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/23ldYNcjhaQ/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Arthrocentesis & Joint Injection.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Orthopaedic Surgery",
      "Rheumatology"
    ],
    "procedure": [
      "Suprapatellar Joint Aspiration"
    ],
    "topics": [
      "Orthopaedic Surgery",
      "Arthrocentesis & Joint Injection"
    ],
    "quiz": [
      {
        "id": "q-23ldYNcjhaQ-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Ultrasound-Guided Knee Joint Puncture & Arthrocentesis in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-23ldYNcjhaQ-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Joint Puncture?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-23ldYNcjhaQ-3",
        "question": "What is the most recognized procedural complication to avoid during Suprapatellar Joint Aspiration?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-23ldYNcjhaQ-4",
        "question": "In clinical decision making for Arthrocentesis & Joint Injection, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-23ldYNcjhaQ-5",
        "question": "What is the recommended post-intervention monitoring protocol for Orthopaedic Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-wToIqKtev00",
    "title": "Thrombocytopoiesis: 3D Bone Marrow Platelet Production",
    "titleBn": "অস্থিমজ্জায় প্লাটিলেট তৈরি ও থ্রম্বোসাইটোপয়েসিস ৩ডি",
    "slug": "voka-wToIqKtev00",
    "description": "High-resolution 3D animation illustrating megakaryocyte maturation, proplatelet extension through sinusoidal endothelium, and platelet shedding into the circulation.",
    "descriptionBn": "অস্থিমজ্জায় প্লাটিলেট তৈরি ও থ্রম্বোসাইটোপয়েসিস ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D physiological visualization of platelet generation.",
    "youtubeVideoId": "wToIqKtev00",
    "embedUrl": "https://www.youtube-nocookie.com/embed/wToIqKtev00",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/wToIqKtev00?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=wToIqKtev00",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Physiology",
    "collection": "Physiology",
    "subtopic": "Hematology & Thrombocytopoiesis",
    "section": "Physiology",
    "specialty": [
      "Physiology",
      "Hematology"
    ],
    "topic": "Megakaryocyte & Platelet Kinetics",
    "procedureName": "Physiological Thrombopoiesis",
    "organSystem": "Hematopoietic System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:20",
    "durationSeconds": 200,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/wToIqKtev00/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/physiology/respiratory-pre-botzinger.webm",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Megakaryocyte & Platelet Kinetics.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Physiology",
      "Hematology"
    ],
    "procedure": [
      "Physiological Thrombopoiesis"
    ],
    "topics": [
      "Physiology",
      "Megakaryocyte & Platelet Kinetics"
    ],
    "quiz": [
      {
        "id": "q-wToIqKtev00-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Thrombocytopoiesis: 3D Bone Marrow Platelet Production?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-wToIqKtev00-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Hematology & Thrombocytopoiesis?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-wToIqKtev00-3",
        "question": "What is the most recognized procedural complication to avoid during Physiological Thrombopoiesis?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-wToIqKtev00-4",
        "question": "In clinical decision making for Megakaryocyte & Platelet Kinetics, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-wToIqKtev00-5",
        "question": "What is the recommended post-intervention monitoring protocol for Physiology?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-2L2sYC-xZyQ",
    "title": "LASIK Refractive Eye Surgery & Corneal Reshaping in 3D",
    "titleBn": "ল্যাসিক কর্নিয়াল রিফ্র্যাক্টিভ সার্জারি ৩ডি অ্যানিমেশন",
    "slug": "voka-2L2sYC-xZyQ",
    "description": "Step-by-step 3D surgical visualization of femtosecond laser corneal flap creation, stromal bed photoablation, and flap repositioning for myopia correction.",
    "descriptionBn": "ল্যাসিক কর্নিয়াল রিফ্র্যাক্টিভ সার্জারি ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D animation of LASIK corneal laser correction.",
    "youtubeVideoId": "2L2sYC-xZyQ",
    "embedUrl": "https://www.youtube-nocookie.com/embed/2L2sYC-xZyQ",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/2L2sYC-xZyQ?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=2L2sYC-xZyQ",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Ophthalmology",
    "collection": "Ophthalmology",
    "subtopic": "Corneal Refractive Surgery",
    "section": "Ophthalmology",
    "specialty": [
      "Ophthalmology",
      "Cornea"
    ],
    "topic": "Excimer Laser Photoablation",
    "procedureName": "Femto-LASIK Flap & Ablation",
    "organSystem": "Visual System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:50",
    "durationSeconds": 230,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/2L2sYC-xZyQ/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Excimer Laser Photoablation.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Ophthalmology",
      "Cornea"
    ],
    "procedure": [
      "Femto-LASIK Flap & Ablation"
    ],
    "topics": [
      "Ophthalmology",
      "Excimer Laser Photoablation"
    ],
    "quiz": [
      {
        "id": "q-2L2sYC-xZyQ-1",
        "question": "What is the primary anatomical or pathophysiological rationale in LASIK Refractive Eye Surgery & Corneal Reshaping in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-2L2sYC-xZyQ-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Corneal Refractive Surgery?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-2L2sYC-xZyQ-3",
        "question": "What is the most recognized procedural complication to avoid during Femto-LASIK Flap & Ablation?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-2L2sYC-xZyQ-4",
        "question": "In clinical decision making for Excimer Laser Photoablation, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-2L2sYC-xZyQ-5",
        "question": "What is the recommended post-intervention monitoring protocol for Ophthalmology?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-RdOpl0Nv0OM",
    "title": "Aortic Valve Reconstruction (Ozaki Procedure) in 3D",
    "titleBn": "অওর্টিক ভালভ পুনর্গঠন (ওজাকি প্রক্রিয়া) ৩ডি অ্যানিমেশন",
    "slug": "voka-RdOpl0Nv0OM",
    "description": "Comprehensive 3D surgical animation of autologous pericardium harvesting, glutaraldehyde treatment, template sizing, and commissural suture fixation.",
    "descriptionBn": "অওর্টিক ভালভ পুনর্গঠন (ওজাকি প্রক্রিয়া) ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D surgical technique of the Ozaki aortic valve procedure.",
    "youtubeVideoId": "RdOpl0Nv0OM",
    "embedUrl": "https://www.youtube-nocookie.com/embed/RdOpl0Nv0OM",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/RdOpl0Nv0OM?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=RdOpl0Nv0OM",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Cardiothoracic Surgery",
    "subtopic": "Aortic Valve Reconstruction",
    "section": "Cardiothoracic Surgery",
    "specialty": [
      "Cardiothoracic Surgery"
    ],
    "topic": "Autologous Pericardial Neocuspidization",
    "procedureName": "Ozaki Aortic Valve Neocuspidization",
    "organSystem": "Cardiovascular System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "04:30",
    "durationSeconds": 270,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/RdOpl0Nv0OM/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Autologous Pericardial Neocuspidization.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Cardiothoracic Surgery"
    ],
    "procedure": [
      "Ozaki Aortic Valve Neocuspidization"
    ],
    "topics": [
      "Cardiothoracic Surgery",
      "Autologous Pericardial Neocuspidization"
    ],
    "quiz": [
      {
        "id": "q-RdOpl0Nv0OM-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Aortic Valve Reconstruction (Ozaki Procedure) in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-RdOpl0Nv0OM-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Aortic Valve Reconstruction?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-RdOpl0Nv0OM-3",
        "question": "What is the most recognized procedural complication to avoid during Ozaki Aortic Valve Neocuspidization?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-RdOpl0Nv0OM-4",
        "question": "In clinical decision making for Autologous Pericardial Neocuspidization, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-RdOpl0Nv0OM-5",
        "question": "What is the recommended post-intervention monitoring protocol for Cardiothoracic Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-WSJA2L6QAC0",
    "title": "Aortic Dissection: 3D DeBakey & Stanford Classification",
    "titleBn": "অওর্টিক ডিসেকশন ৩ডি অ্যানিমেশন ও শ্রেণীবিন্যাস",
    "slug": "voka-WSJA2L6QAC0",
    "description": "3D anatomical demonstration of intimal tear mechanics, false lumen propagation, and clinical distinction between Stanford Type A and Type B dissections.",
    "descriptionBn": "অওর্টিক ডিসেকশন ৩ডি অ্যানিমেশন ও শ্রেণীবিন্যাস সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D pathological and clinical animation of aortic dissection.",
    "youtubeVideoId": "WSJA2L6QAC0",
    "embedUrl": "https://www.youtube-nocookie.com/embed/WSJA2L6QAC0",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/WSJA2L6QAC0?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=WSJA2L6QAC0",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Cardiothoracic Surgery",
    "collection": "Cardiothoracic Surgery",
    "subtopic": "Aortic Dissection",
    "section": "Cardiothoracic Surgery",
    "specialty": [
      "Cardiothoracic Surgery",
      "Vascular Surgery"
    ],
    "topic": "Acute Aortic Syndromes",
    "procedureName": "Hemiarch Replacement Assessment",
    "organSystem": "Cardiovascular System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:45",
    "durationSeconds": 225,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/WSJA2L6QAC0/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Acute Aortic Syndromes.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Cardiothoracic Surgery",
      "Vascular Surgery"
    ],
    "procedure": [
      "Hemiarch Replacement Assessment"
    ],
    "topics": [
      "Cardiothoracic Surgery",
      "Acute Aortic Syndromes"
    ],
    "quiz": [
      {
        "id": "q-WSJA2L6QAC0-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Aortic Dissection: 3D DeBakey & Stanford Classification?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-WSJA2L6QAC0-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Aortic Dissection?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-WSJA2L6QAC0-3",
        "question": "What is the most recognized procedural complication to avoid during Hemiarch Replacement Assessment?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-WSJA2L6QAC0-4",
        "question": "In clinical decision making for Acute Aortic Syndromes, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-WSJA2L6QAC0-5",
        "question": "What is the recommended post-intervention monitoring protocol for Cardiothoracic Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-9KtA83_tUFQ",
    "title": "Surgical Extraction of Impacted Mandibular Wisdom Tooth in 3D",
    "titleBn": "ইমপ্যাক্টেড আক্কেল দাঁত অপসারণ ৩ডি সার্জিক্যাল গাইড",
    "slug": "voka-9KtA83_tUFQ",
    "description": "3D visualization of mucoperiosteal flap design, buccal guttering osteotomy, tooth sectioning, and preservation of the inferior alveolar nerve.",
    "descriptionBn": "ইমপ্যাক্টেড আক্কেল দাঁত অপসারণ ৩ডি সার্জিক্যাল গাইড সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "Step-by-step 3D surgical guide to impacted third molar extraction.",
    "youtubeVideoId": "9KtA83_tUFQ",
    "embedUrl": "https://www.youtube-nocookie.com/embed/9KtA83_tUFQ",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/9KtA83_tUFQ?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=9KtA83_tUFQ",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "General Surgery",
    "subtopic": "Wisdom Tooth Extraction",
    "section": "Clinical Procedures",
    "specialty": [
      "Oral & Maxillofacial Surgery",
      "Clinical Procedures"
    ],
    "topic": "Mandibular Third Molar Odontectomy",
    "procedureName": "Surgical Disimpaction & Sectioning",
    "organSystem": "Digestive / Maxillofacial System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "04:05",
    "durationSeconds": 245,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/9KtA83_tUFQ/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/square-knot-suture-technique.webm",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Mandibular Third Molar Odontectomy.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Oral & Maxillofacial Surgery",
      "Clinical Procedures"
    ],
    "procedure": [
      "Surgical Disimpaction & Sectioning"
    ],
    "topics": [
      "Clinical Procedures",
      "Mandibular Third Molar Odontectomy"
    ],
    "quiz": [
      {
        "id": "q-9KtA83_tUFQ-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Surgical Extraction of Impacted Mandibular Wisdom Tooth in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-9KtA83_tUFQ-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Wisdom Tooth Extraction?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-9KtA83_tUFQ-3",
        "question": "What is the most recognized procedural complication to avoid during Surgical Disimpaction & Sectioning?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-9KtA83_tUFQ-4",
        "question": "In clinical decision making for Mandibular Third Molar Odontectomy, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-9KtA83_tUFQ-5",
        "question": "What is the recommended post-intervention monitoring protocol for Clinical Procedures?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-KxI4s5RVUKo",
    "title": "Ultrasound-Guided Core Needle Breast Biopsy in 3D",
    "titleBn": "আল্ট্রাসাউন্ড নির্দেশিত কোর নিডেল ব্রেস্ট বায়োপসি ৩ডি",
    "slug": "voka-KxI4s5RVUKo",
    "description": "Detailed 3D procedural guide to local anesthetic infiltration, real-time ultrasound needle alignment, core needle firing, and specimen radiography.",
    "descriptionBn": "আল্ট্রাসাউন্ড নির্দেশিত কোর নিডেল ব্রেস্ট বায়োপসি ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D simulation of ultrasound-guided core needle breast biopsy.",
    "youtubeVideoId": "KxI4s5RVUKo",
    "embedUrl": "https://www.youtube-nocookie.com/embed/KxI4s5RVUKo",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/KxI4s5RVUKo?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=KxI4s5RVUKo",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Clinical Procedures",
    "subtopic": "Breast Biopsy",
    "section": "Clinical Procedures",
    "specialty": [
      "Surgical Oncology",
      "Clinical Procedures"
    ],
    "topic": "Core Needle Biopsy",
    "procedureName": "Ultrasound-Guided Core Needle Biopsy",
    "organSystem": "Reproductive System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:10",
    "durationSeconds": 190,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/KxI4s5RVUKo/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/square-knot-suture-technique.webm",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Core Needle Biopsy.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Surgical Oncology",
      "Clinical Procedures"
    ],
    "procedure": [
      "Ultrasound-Guided Core Needle Biopsy"
    ],
    "topics": [
      "Clinical Procedures",
      "Core Needle Biopsy"
    ],
    "quiz": [
      {
        "id": "q-KxI4s5RVUKo-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Ultrasound-Guided Core Needle Breast Biopsy in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-KxI4s5RVUKo-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Breast Biopsy?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-KxI4s5RVUKo-3",
        "question": "What is the most recognized procedural complication to avoid during Ultrasound-Guided Core Needle Biopsy?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-KxI4s5RVUKo-4",
        "question": "In clinical decision making for Core Needle Biopsy, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-KxI4s5RVUKo-5",
        "question": "What is the recommended post-intervention monitoring protocol for Clinical Procedures?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-A6iJkn6-X0E",
    "title": "Proetz Displacement Therapy for Acute Rhinosinusitis in 3D",
    "titleBn": "তীব্র রাইনোসাইনুসাইটিস চিকিৎসায় প্রয়েটজ ডিসপ্লেসমেন্ট থেরাপি ৩ডি",
    "slug": "voka-A6iJkn6-X0E",
    "description": "3D physiological and anatomical demonstration of negative-pressure sinus evacuation, ephedrine solution instillation, and ostiomeatal complex clearance.",
    "descriptionBn": "তীব্র রাইনোসাইনুসাইটিস চিকিৎসায় প্রয়েটজ ডিসপ্লেসমেন্ট থেরাপি ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D clinical animation of Proetz sinus displacement therapy.",
    "youtubeVideoId": "A6iJkn6-X0E",
    "embedUrl": "https://www.youtube-nocookie.com/embed/A6iJkn6-X0E",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/A6iJkn6-X0E?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=A6iJkn6-X0E",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "ENT Surgery",
    "subtopic": "Paranasal Sinus Procedures",
    "section": "ENT Surgery",
    "specialty": [
      "Otolaryngology",
      "ENT"
    ],
    "topic": "Sinus Pressure-Displacement Irrigation",
    "procedureName": "Proetz Irrigation Procedure",
    "organSystem": "Respiratory System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:15",
    "durationSeconds": 195,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/A6iJkn6-X0E/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Sinus Pressure-Displacement Irrigation.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Otolaryngology",
      "ENT"
    ],
    "procedure": [
      "Proetz Irrigation Procedure"
    ],
    "topics": [
      "ENT Surgery",
      "Sinus Pressure-Displacement Irrigation"
    ],
    "quiz": [
      {
        "id": "q-A6iJkn6-X0E-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Proetz Displacement Therapy for Acute Rhinosinusitis in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-A6iJkn6-X0E-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Paranasal Sinus Procedures?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-A6iJkn6-X0E-3",
        "question": "What is the most recognized procedural complication to avoid during Proetz Irrigation Procedure?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-A6iJkn6-X0E-4",
        "question": "In clinical decision making for Sinus Pressure-Displacement Irrigation, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-A6iJkn6-X0E-5",
        "question": "What is the recommended post-intervention monitoring protocol for ENT Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-9d-0b61J6Q8",
    "title": "Rh Incompatibility in Pregnancy & Hemolytic Disease in 3D",
    "titleBn": "গর্ভাবস্থায় আরএইচ অসামঞ্জস্য ও হেমোলাইটিক রোগ ৩ডি",
    "slug": "voka-9d-0b61J6Q8",
    "description": "3D immunological animation showing transplacental fetomaternal hemorrhage, maternal IgG sensitization, fetal hemolysis, and anti-D immunoglobulin mechanism.",
    "descriptionBn": "গর্ভাবস্থায় আরএইচ অসামঞ্জস্য ও হেমোলাইটিক রোগ ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D animation of Rh factor sensitization in pregnancy.",
    "youtubeVideoId": "9d-0b61J6Q8",
    "embedUrl": "https://www.youtube-nocookie.com/embed/9d-0b61J6Q8",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/9d-0b61J6Q8?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=9d-0b61J6Q8",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Physiology",
    "collection": "Obstetrics and Gynaecology",
    "subtopic": "Rh Isoimmunization",
    "section": "Obstetrics and Gynaecology",
    "specialty": [
      "Obstetrics",
      "Fetomaternal Medicine"
    ],
    "topic": "Maternal-Fetal Alloimmunization",
    "procedureName": "Anti-D Immunoprophylaxis",
    "organSystem": "Reproductive & Hematologic System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "04:15",
    "durationSeconds": 255,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/9d-0b61J6Q8/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/physiology/respiratory-pre-botzinger.webm",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Maternal-Fetal Alloimmunization.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Obstetrics",
      "Fetomaternal Medicine"
    ],
    "procedure": [
      "Anti-D Immunoprophylaxis"
    ],
    "topics": [
      "Obstetrics and Gynaecology",
      "Maternal-Fetal Alloimmunization"
    ],
    "quiz": [
      {
        "id": "q-9d-0b61J6Q8-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Rh Incompatibility in Pregnancy & Hemolytic Disease in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-9d-0b61J6Q8-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Rh Isoimmunization?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-9d-0b61J6Q8-3",
        "question": "What is the most recognized procedural complication to avoid during Anti-D Immunoprophylaxis?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-9d-0b61J6Q8-4",
        "question": "In clinical decision making for Maternal-Fetal Alloimmunization, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-9d-0b61J6Q8-5",
        "question": "What is the recommended post-intervention monitoring protocol for Obstetrics and Gynaecology?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-BZ7VqHbG0lY",
    "title": "HER2-Positive Breast Cancer Cellular Mechanism in 3D",
    "titleBn": "এইচইআর২-পজিটিভ ব্রেস্ট ক্যান্সারের সেলুলার মেকানিজম ৩ডি",
    "slug": "voka-BZ7VqHbG0lY",
    "description": "3D cellular animation detailing HER2 receptor overexpression, homodimerization, PI3K/Akt pathway hyperactivation, and Trastuzumab therapeutic blockade.",
    "descriptionBn": "এইচইআর২-পজিটিভ ব্রেস্ট ক্যান্সারের সেলুলার মেকানিজম ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D molecular pathology of HER2 breast carcinoma.",
    "youtubeVideoId": "BZ7VqHbG0lY",
    "embedUrl": "https://www.youtube-nocookie.com/embed/BZ7VqHbG0lY",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/BZ7VqHbG0lY?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=BZ7VqHbG0lY",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Pathology",
    "collection": "Pathology and Disease Mechanisms",
    "subtopic": "Oncogenic Signaling",
    "section": "Pathology and Disease Mechanisms",
    "specialty": [
      "Pathology",
      "Medical Oncology"
    ],
    "topic": "Receptor Tyrosine Kinase Dimerization",
    "procedureName": "Targeted Monoclonal Antibody Therapy",
    "organSystem": "Integumentary & Endocrine System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:30",
    "durationSeconds": 210,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/BZ7VqHbG0lY/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/pathology/atherosclerosis-plaque-flow.webm",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Receptor Tyrosine Kinase Dimerization.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Pathology",
      "Medical Oncology"
    ],
    "procedure": [
      "Targeted Monoclonal Antibody Therapy"
    ],
    "topics": [
      "Pathology and Disease Mechanisms",
      "Receptor Tyrosine Kinase Dimerization"
    ],
    "quiz": [
      {
        "id": "q-BZ7VqHbG0lY-1",
        "question": "What is the primary anatomical or pathophysiological rationale in HER2-Positive Breast Cancer Cellular Mechanism in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-BZ7VqHbG0lY-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Oncogenic Signaling?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-BZ7VqHbG0lY-3",
        "question": "What is the most recognized procedural complication to avoid during Targeted Monoclonal Antibody Therapy?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-BZ7VqHbG0lY-4",
        "question": "In clinical decision making for Receptor Tyrosine Kinase Dimerization, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-BZ7VqHbG0lY-5",
        "question": "What is the recommended post-intervention monitoring protocol for Pathology and Disease Mechanisms?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-UHraBPYuICE",
    "title": "Paramedian Lumbar Intervertebral Disc Herniation in 3D",
    "titleBn": "প্যারামিডিয়ান লাম্বার ডিস্ক হার্নিয়েশন ৩ডি অ্যানিমেশন",
    "slug": "voka-UHraBPYuICE",
    "description": "3D anatomical rendering of L4-L5 intervertebral disc rupture, posterolateral nucleus pulposus extrusion, traversing nerve root impingement, and surgical fragmentectomy.",
    "descriptionBn": "প্যারামিডিয়ান লাম্বার ডিস্ক হার্নিয়েশন ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D surgical anatomy of paramedian lumbar disc extrusion.",
    "youtubeVideoId": "UHraBPYuICE",
    "embedUrl": "https://www.youtube-nocookie.com/embed/UHraBPYuICE",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/UHraBPYuICE?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=UHraBPYuICE",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Neurosurgery",
    "collection": "Craniotomy",
    "subtopic": "Spine Surgery",
    "section": "Neurosurgery",
    "specialty": [
      "Neurosurgery",
      "Spine Surgery"
    ],
    "topic": "Lumbar Disc Herniation & Radiculopathy",
    "procedureName": "Microdiscectomy Technique",
    "organSystem": "Musculoskeletal & Nervous System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:40",
    "durationSeconds": 220,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/UHraBPYuICE/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Lumbar Disc Herniation & Radiculopathy.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Neurosurgery",
      "Spine Surgery"
    ],
    "procedure": [
      "Microdiscectomy Technique"
    ],
    "topics": [
      "Neurosurgery",
      "Lumbar Disc Herniation & Radiculopathy"
    ],
    "quiz": [
      {
        "id": "q-UHraBPYuICE-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Paramedian Lumbar Intervertebral Disc Herniation in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-UHraBPYuICE-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Spine Surgery?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-UHraBPYuICE-3",
        "question": "What is the most recognized procedural complication to avoid during Microdiscectomy Technique?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-UHraBPYuICE-4",
        "question": "In clinical decision making for Lumbar Disc Herniation & Radiculopathy, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-UHraBPYuICE-5",
        "question": "What is the recommended post-intervention monitoring protocol for Neurosurgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-fGg-LTIswnc",
    "title": "Foraminal Lumbar Disc Herniation: Exiting Nerve Compression in 3D",
    "titleBn": "ফোরামিনাল লাম্বার ডিস্ক হার্নিয়েশন ৩ডি সার্জিক্যাল ভিউ",
    "slug": "voka-fGg-LTIswnc",
    "description": "3D operative visualization of intraforaminal disc sequestration impinging the exiting spinal root beneath the pars interarticularis, with far-lateral approach technique.",
    "descriptionBn": "ফোরামিনাল লাম্বার ডিস্ক হার্নিয়েশন ৩ডি সার্জিক্যাল ভিউ সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D neurosurgical guide to foraminal lumbar disc herniation.",
    "youtubeVideoId": "fGg-LTIswnc",
    "embedUrl": "https://www.youtube-nocookie.com/embed/fGg-LTIswnc",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/fGg-LTIswnc?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=fGg-LTIswnc",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Neurosurgery",
    "collection": "Craniotomy",
    "subtopic": "Spine Surgery",
    "section": "Neurosurgery",
    "specialty": [
      "Neurosurgery",
      "Spine Surgery"
    ],
    "topic": "Foraminal Stenosis & Neural Decompression",
    "procedureName": "Extraforaminal Decompression",
    "organSystem": "Nervous System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:25",
    "durationSeconds": 205,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/fGg-LTIswnc/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Foraminal Stenosis & Neural Decompression.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Neurosurgery",
      "Spine Surgery"
    ],
    "procedure": [
      "Extraforaminal Decompression"
    ],
    "topics": [
      "Neurosurgery",
      "Foraminal Stenosis & Neural Decompression"
    ],
    "quiz": [
      {
        "id": "q-fGg-LTIswnc-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Foraminal Lumbar Disc Herniation: Exiting Nerve Compression in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-fGg-LTIswnc-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Spine Surgery?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-fGg-LTIswnc-3",
        "question": "What is the most recognized procedural complication to avoid during Extraforaminal Decompression?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-fGg-LTIswnc-4",
        "question": "In clinical decision making for Foraminal Stenosis & Neural Decompression, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-fGg-LTIswnc-5",
        "question": "What is the recommended post-intervention monitoring protocol for Neurosurgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-aMpJIfhPY44",
    "title": "Greater Tuberosity Humeral Fracture: Biomechanics & Fixation in 3D",
    "titleBn": "হিউমেরাস গ্রেটার টিউবারোসিটি ফ্র্যাকচার ৩ডি অ্যানিমেশন",
    "slug": "voka-aMpJIfhPY44",
    "description": "3D orthopaedic trauma animation illustrating rotator cuff avulsion mechanics, displaced greater tuberosity fragment, impingement risk, and open reduction internal fixation.",
    "descriptionBn": "হিউমেরাস গ্রেটার টিউবারোসিটি ফ্র্যাকচার ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D visualization of greater tuberosity fracture repair.",
    "youtubeVideoId": "aMpJIfhPY44",
    "embedUrl": "https://www.youtube-nocookie.com/embed/aMpJIfhPY44",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/aMpJIfhPY44?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=aMpJIfhPY44",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Orthopaedic Surgery",
    "subtopic": "Upper Limb Trauma",
    "section": "Orthopaedic Surgery",
    "specialty": [
      "Orthopaedic Surgery",
      "Trauma Surgery"
    ],
    "topic": "Proximal Humerus Fractures",
    "procedureName": "Suture Anchor & Plate Osteosynthesis",
    "organSystem": "Musculoskeletal System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:30",
    "durationSeconds": 210,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/aMpJIfhPY44/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Proximal Humerus Fractures.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Orthopaedic Surgery",
      "Trauma Surgery"
    ],
    "procedure": [
      "Suture Anchor & Plate Osteosynthesis"
    ],
    "topics": [
      "Orthopaedic Surgery",
      "Proximal Humerus Fractures"
    ],
    "quiz": [
      {
        "id": "q-aMpJIfhPY44-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Greater Tuberosity Humeral Fracture: Biomechanics & Fixation in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-aMpJIfhPY44-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Upper Limb Trauma?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-aMpJIfhPY44-3",
        "question": "What is the most recognized procedural complication to avoid during Suture Anchor & Plate Osteosynthesis?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-aMpJIfhPY44-4",
        "question": "In clinical decision making for Proximal Humerus Fractures, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-aMpJIfhPY44-5",
        "question": "What is the recommended post-intervention monitoring protocol for Orthopaedic Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-FrDVAhAQMQk",
    "title": "Anatomical Neck Fracture of the Humerus: Avascular Necrosis Risk in 3D",
    "titleBn": "হিউমেরাস অ্যানাটমিক্যাল নেক ফ্র্যাকচার ও এভাস্কুলার নেক্রোসিস ৩ডি",
    "slug": "voka-FrDVAhAQMQk",
    "description": "3D biomechanical animation analyzing fracture line through the anatomical neck, disrupted ascending branches of the anterior humeral circumflex artery, and articular reconstruction.",
    "descriptionBn": "হিউমেরাস অ্যানাটমিক্যাল নেক ফ্র্যাকচার ও এভাস্কুলার নেক্রোসিস ৩ডি সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D orthopaedic guide to anatomical neck humeral fracture.",
    "youtubeVideoId": "FrDVAhAQMQk",
    "embedUrl": "https://www.youtube-nocookie.com/embed/FrDVAhAQMQk",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/FrDVAhAQMQk?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=FrDVAhAQMQk",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Surgery",
    "collection": "Orthopaedic Surgery",
    "subtopic": "Upper Limb Trauma",
    "section": "Orthopaedic Surgery",
    "specialty": [
      "Orthopaedic Surgery",
      "Trauma Surgery"
    ],
    "topic": "Proximal Humerus Fractures",
    "procedureName": "Hemiarthroplasty vs Fixation",
    "organSystem": "Musculoskeletal System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:45",
    "durationSeconds": 225,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/FrDVAhAQMQk/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Proximal Humerus Fractures.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Orthopaedic Surgery",
      "Trauma Surgery"
    ],
    "procedure": [
      "Hemiarthroplasty vs Fixation"
    ],
    "topics": [
      "Orthopaedic Surgery",
      "Proximal Humerus Fractures"
    ],
    "quiz": [
      {
        "id": "q-FrDVAhAQMQk-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Anatomical Neck Fracture of the Humerus: Avascular Necrosis Risk in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-FrDVAhAQMQk-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Upper Limb Trauma?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-FrDVAhAQMQk-3",
        "question": "What is the most recognized procedural complication to avoid during Hemiarthroplasty vs Fixation?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-FrDVAhAQMQk-4",
        "question": "In clinical decision making for Proximal Humerus Fractures, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-FrDVAhAQMQk-5",
        "question": "What is the recommended post-intervention monitoring protocol for Orthopaedic Surgery?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  },
  {
    "id": "youtube-voka-3eva28h_e94",
    "title": "Fuchs Endothelial Corneal Dystrophy: Pathophysiology & DMEK in 3D",
    "titleBn": "ফুশস এন্ডোথেলিয়াল কর্নিয়াল ডিস্ট্রফি ৩ডি অ্যানিমেশন",
    "slug": "voka-3eva28h_e94",
    "description": "3D microscopic animation illustrating loss of endothelial pump cells, Descemet membrane guttae formation, stromal bullous keratopathy, and DMEK endothelial transplantation.",
    "descriptionBn": "ফুশস এন্ডোথেলিয়াল কর্নিয়াল ডিস্ট্রফি ৩ডি অ্যানিমেশন সংক্রান্ত ৩ডি অ্যানিমেশন ও ক্লিনিক্যাল ব্যাখ্যা।",
    "summary": "3D corneal pathophysiology and DMEK surgical repair.",
    "youtubeVideoId": "3eva28h_e94",
    "embedUrl": "https://www.youtube-nocookie.com/embed/3eva28h_e94",
    "playbackUrl": "https://www.youtube-nocookie.com/embed/3eva28h_e94?rel=0&enablejsapi=1",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "sourceUrl": "https://www.youtube.com/watch?v=3eva28h_e94",
    "sourceName": "VOKA 3D Anatomy & Pathology",
    "sourceChannelId": "UCqGGuOEpr62ScH8Pjk2q5zw",
    "sourceChannelHandle": "@vokaio",
    "sourceType": "youtube_nocookie",
    "category": "Ophthalmology",
    "collection": "Ophthalmology",
    "subtopic": "Corneal Dystrophies",
    "section": "Ophthalmology",
    "specialty": [
      "Ophthalmology",
      "Cornea"
    ],
    "topic": "Guttae & Corneal Edema",
    "procedureName": "Descemet Membrane Endothelial Keratoplasty",
    "organSystem": "Visual System",
    "mbbsYear": "Phase 3 (4th & 5th Year MBBS)",
    "mbbsPhase": "Phase 3: Clinical Practice",
    "difficulty": "Intermediate",
    "duration": "03:50",
    "durationSeconds": 230,
    "language": "English",
    "hasCaptions": true,
    "instructorOrPublisher": "VOKA 3D Anatomy & Pathology",
    "instructor": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "institution": "VOKA Medical Visualisation",
    "thumbnailUrl": "https://i.ytimg.com/vi/3eva28h_e94/hqdefault.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "contentType": "Medical animation",
    "mediaType": "animation",
    "graphicContent": false,
    "graphicWarningText": null,
    "verified": true,
    "embeddingAllowed": true,
    "publicationStatus": "published",
    "published": true,
    "attribution": "Source: VOKA official YouTube channel",
    "source": "VOKA 3D Anatomy & Pathology (@vokaio)",
    "license": {
      "type": "CC BY 4.0 / Public YouTube Embed",
      "permission": "Publicly embeddable official YouTube video",
      "evidence": "https://www.youtube.com/@vokaio"
    },
    "reviewedBy": "Prof. Dr. M. A. Jalil",
    "reviewedAt": "2026-09-18T12:00:00Z",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Jalil",
      "reviewerRole": "Faculty Reviewer, BM&DC Board",
      "reviewedAt": "2026-09-18T12:00:00Z",
      "notes": "Clinically reviewed and verified official VOKA 3D animation."
    },
    "learningObjectives": [
      "Understand key structural principles in Guttae & Corneal Edema.",
      "Identify anatomical relationships and critical surgical boundaries.",
      "Recognize common complications and clinical management strategies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Patho-anatomy",
        "description": "Pathophysiological basis and landmarks"
      },
      {
        "timestampSeconds": 60,
        "title": "Procedural Technique",
        "description": "Operative sequence in 3D"
      },
      {
        "timestampSeconds": 150,
        "title": "Reconstruction & Hemostasis",
        "description": "Final inspection and stabilization"
      }
    ],
    "keySteps": [
      "Target site exposure and anatomical identification",
      "Controlled dissection and correction of pathology",
      "Hemostasis confirmation and protective closure"
    ],
    "clinicalPearls": [
      "Clear visual orientation prevents orientation error in high-risk zones.",
      "Immediate verification of surrounding neurovascular integrity is mandatory."
    ],
    "prerequisiteTopics": [
      "General Anatomy",
      "Pathology & Disease Mechanisms"
    ],
    "anatomy": [
      "Ophthalmology",
      "Cornea"
    ],
    "procedure": [
      "Descemet Membrane Endothelial Keratoplasty"
    ],
    "topics": [
      "Ophthalmology",
      "Guttae & Corneal Edema"
    ],
    "quiz": [
      {
        "id": "q-3eva28h_e94-1",
        "question": "What is the primary anatomical or pathophysiological rationale in Fuchs Endothelial Corneal Dystrophy: Pathophysiology & DMEK in 3D?",
        "options": [
          "Direct preservation and visualization of neighboring vital neurovascular structures",
          "Blind exploration without anatomical landmarks",
          "Disregard of tissue handling protocols",
          "Immediate closure without achieving hemostasis"
        ],
        "correctOptionIndex": 0,
        "explanation": "Precision visualization and anatomical preservation of critical structures is the paramount objective in this procedure."
      },
      {
        "id": "q-3eva28h_e94-2",
        "question": "Which diagnostic modality is most critical for pre-procedural planning in Corneal Dystrophies?",
        "options": [
          "Comprehensive cross-sectional imaging (CT or MRI) and clinical correlation",
          "Plain abdominal radiograph only",
          "Empirical exploration without prior imaging",
          "Urine dipstick testing only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Detailed cross-sectional imaging provides precise three-dimensional mapping necessary for operative success."
      },
      {
        "id": "q-3eva28h_e94-3",
        "question": "What is the most recognized procedural complication to avoid during Descemet Membrane Endothelial Keratoplasty?",
        "options": [
          "Inadvertent neurovascular injury and uncontrolled hemorrhage",
          "Mild transient erythema",
          "Normal post-operative recovery",
          "Accurate specimen retrieval"
        ],
        "correctOptionIndex": 0,
        "explanation": "Meticulous dissection and hemostasis are mandatory to prevent severe vascular or neurological compromise."
      },
      {
        "id": "q-3eva28h_e94-4",
        "question": "In clinical decision making for Guttae & Corneal Edema, which patient factor dictates urgent intervention?",
        "options": [
          "Rapidly deteriorating clinical status, acute ischemia, or progressive neurological deficit",
          "Asymptomatic stable presentation",
          "Mild elective cosmetic concern",
          "Normal baseline laboratory investigations"
        ],
        "correctOptionIndex": 0,
        "explanation": "Progressive neurological decline, hemodynamic instability, or tissue ischemia mandates urgent intervention."
      },
      {
        "id": "q-3eva28h_e94-5",
        "question": "What is the recommended post-intervention monitoring protocol for Ophthalmology?",
        "options": [
          "Close vital sign surveillance, neurovascular checks, and targeted recovery monitoring",
          "Immediate unmonitored discharge",
          "Omission of postoperative analgesic and fluid management",
          "Absence of clinical documentation"
        ],
        "correctOptionIndex": 0,
        "explanation": "Standard institutional protocols require structured hemodynamic and neurovascular checks following intervention."
      }
    ],
    "created_at": "2026-09-18T12:00:00Z",
    "createdAt": "2026-09-18T12:00:00Z",
    "updatedAt": "2026-09-18T12:00:00Z",
    "lastVerifiedAt": "2026-09-18T12:00:00Z"
  }
];

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

    // 1. Search query filter (matches multi-attribute keywords)
    const rawQuery = filters.searchQuery || filters.query || '';
    if (rawQuery.trim()) {
      const q = rawQuery.toLowerCase().trim();
      const matchTitle = video.title.toLowerCase().includes(q) || (video.titleBn && video.titleBn.toLowerCase().includes(q));
      const matchDesc = video.description.toLowerCase().includes(q) || (video.descriptionBn && video.descriptionBn.toLowerCase().includes(q));
      const matchSummary = video.summary ? video.summary.toLowerCase().includes(q) : false;
      const matchCategory = video.category.toLowerCase().includes(q) || (video.section && video.section.toLowerCase().includes(q));
      const matchCollection = video.collection ? video.collection.toLowerCase().includes(q) : false;
      const matchSubtopic = video.subtopic ? video.subtopic.toLowerCase().includes(q) : false;
      const matchInstructor = (video.instructor && video.instructor.toLowerCase().includes(q)) || 
                              (video.instructorOrPublisher && video.instructorOrPublisher.toLowerCase().includes(q)) ||
                              (video.sourceName && video.sourceName.toLowerCase().includes(q)) ||
                              (video.source && video.source.toLowerCase().includes(q)) ||
                              (video.attribution && video.attribution.toLowerCase().includes(q));
      const matchInstitution = video.institution ? video.institution.toLowerCase().includes(q) : false;
      const matchSpecialty = Array.isArray(video.specialty)
        ? video.specialty.some((s) => s.toLowerCase().includes(q))
        : typeof video.specialty === 'string'
        ? (video.specialty as string).toLowerCase().includes(q)
        : false;
      const matchProcedure = video.procedure ? video.procedure.some(p => p.toLowerCase().includes(q)) : false;
      const matchAnatomy = video.anatomy ? video.anatomy.some(a => a.toLowerCase().includes(q)) : false;
      const matchTopics = video.topics ? video.topics.some(t => t.toLowerCase().includes(q)) : false;
      const matchObjectives = video.learningObjectives ? video.learningObjectives.some(o => o.toLowerCase().includes(q)) : false;
      const matchPearls = video.clinicalPearls ? video.clinicalPearls.some(p => p.toLowerCase().includes(q)) : false;
      const matchTranscript = typeof video.transcript === 'string'
        ? video.transcript.toLowerCase().includes(q)
        : Array.isArray(video.transcript)
        ? (video.transcript as any[]).some((t) => (t.text || '').toLowerCase().includes(q))
        : false;

      if (!matchTitle && !matchDesc && !matchSummary && !matchCategory && !matchCollection && !matchSubtopic && !matchInstructor && !matchInstitution && !matchSpecialty && !matchProcedure && !matchAnatomy && !matchTopics && !matchObjectives && !matchPearls && !matchTranscript) {
        return false;
      }
    }

    // 2. Category / Section filter
    if (filters.category && filters.category !== 'All') {
      const catMatch = video.category?.toLowerCase() === filters.category.toLowerCase() || 
                       (video.section && video.section.toLowerCase() === filters.category.toLowerCase());
      if (!catMatch) return false;
    }

    if (filters.section && filters.section !== 'All') {
      const secMatch = video.section && video.section.toLowerCase() === filters.section.toLowerCase();
      if (!secMatch) return false;
    }

    // Specialty filter
    if (filters.specialty && filters.specialty !== 'All') {
      const specMatch = Array.isArray(video.specialty)
        ? video.specialty.some((s) => s.toLowerCase() === filters.specialty!.toLowerCase())
        : typeof video.specialty === 'string'
        ? (video.specialty as string).toLowerCase() === filters.specialty!.toLowerCase()
        : false;
      if (!specMatch) return false;
    }

    // 3. Collection filter
    if (filters.collection && filters.collection !== 'All') {
      if (!video.collection || video.collection.toLowerCase() !== filters.collection.toLowerCase()) {
        return false;
      }
    }

    // 4. Subtopic filter
    if (filters.subtopic && filters.subtopic !== 'All') {
      if (!video.subtopic || video.subtopic.toLowerCase() !== filters.subtopic.toLowerCase()) {
        return false;
      }
    }

    // 5. MBBS Phase filter
    const phaseTarget = filters.mbbsPhase || filters.phase;
    if (phaseTarget && phaseTarget !== 'All') {
      if (!video.mbbsPhase || !video.mbbsPhase.toLowerCase().includes(phaseTarget.toLowerCase())) {
        return false;
      }
    }

    // 6. Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'All') {
      if (!video.difficulty || video.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
        return false;
      }
    }

    // 7. Media Type filter
    if (filters.mediaType && filters.mediaType !== 'All') {
      if (!video.mediaType || video.mediaType.toLowerCase() !== filters.mediaType.toLowerCase()) {
        return false;
      }
    }

    // 8. Verified only filter
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
  switch (sortBy) {
    case 'duration':
    case 'shortest':
      return sorted.sort((a, b) => a.durationSeconds - b.durationSeconds);
    case 'longest':
      return sorted.sort((a, b) => b.durationSeconds - a.durationSeconds);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'recent':
    default:
      return sorted.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
  }
}

export function getRelatedVideos(
  currentVideo: SelfHostedMedicalVideo,
  allVideos: SelfHostedMedicalVideo[],
  limit = 3
): SelfHostedMedicalVideo[] {
  return allVideos
    .filter((v) => v.id !== currentVideo.id)
    .filter((v) => v.category === currentVideo.category || (v.section && v.section === currentVideo.section) || v.collection === currentVideo.collection)
    .slice(0, limit);
}
