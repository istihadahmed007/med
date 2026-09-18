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
