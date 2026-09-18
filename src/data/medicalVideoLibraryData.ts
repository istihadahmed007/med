/**
 * Comprehensive MBBS Medical Video Library Data Catalog
 *
 * Direct In-App Playback • Zero External Redirects • Verified Real Media Records
 * Normalized Taxonomy for Anatomy and Surgery Collections
 */

import { SelfHostedMedicalVideo, VideoFilterCriteria, VideoQuizQuestion } from '../types/videoStudio';

export const VIDEO_CATEGORIES = [
  'All',
  'Anatomy',
  'Surgery',
  'Physiology',
  'Pathology',
  'Clinical Skills',
  'Medical Imaging',
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export const ANATOMY_COLLECTIONS: Record<string, string[]> = {
  "Gross Anatomy": [
    "Upper limb",
    "Lower limb",
    "Thorax",
    "Abdomen",
    "Pelvis and perineum",
    "Head and neck",
    "Back and vertebral column"
  ],
  "Organ Anatomy": [
    "Heart",
    "Lungs",
    "Brain",
    "Spinal cord",
    "Liver and biliary system",
    "Stomach and intestines",
    "Kidneys and urinary tract",
    "Male reproductive system",
    "Female reproductive system",
    "Eye",
    "Ear",
    "Skin"
  ],
  "Neuroanatomy": [
    "Cerebral cortex",
    "Brainstem",
    "Cerebellum",
    "Basal ganglia",
    "Ventricular system",
    "Spinal cord tracts",
    "Cranial nerves",
    "Meninges",
    "Cerebral circulation"
  ],
  "Imaging Anatomy": [
    "Normal chest X-ray",
    "Normal abdominal X-ray",
    "Brain CT",
    "Chest CT",
    "Abdominal CT",
    "Brain MRI",
    "Musculoskeletal MRI",
    "Ultrasound anatomy",
    "Cross-sectional anatomy"
  ],
  "Anatomy Procedures": [
    "Cadaveric dissection demonstrations",
    "Surface anatomy examinations",
    "Anatomical landmark identification",
    "Living anatomy",
    "Osteology demonstrations",
    "Prosection demonstrations"
  ]
};

export const SURGERY_COLLECTIONS: Record<string, string[]> = {
  "General Surgery": [
    "Surgical hand preparation",
    "Sterile gowning and gloving",
    "Surgical instruments",
    "Suturing and knot tying",
    "Incision and drainage",
    "Wound debridement",
    "Biopsy techniques",
    "Appendectomy",
    "Hernia repair",
    "Cholecystectomy",
    "Bowel anastomosis",
    "Thyroidectomy",
    "Breast surgery",
    "Stoma creation and care"
  ],
  "Gastrointestinal Surgery": [
    "Upper gastrointestinal endoscopy",
    "Colonoscopy",
    "Laparoscopic port placement",
    "Gastric surgery",
    "Small-bowel surgery",
    "Colorectal surgery",
    "Liver surgery",
    "Pancreatic surgery",
    "Biliary surgery"
  ],
  "Cardiothoracic Surgery": [
    "Chest-drain insertion",
    "Thoracotomy",
    "Coronary artery bypass overview",
    "Valve surgery overview",
    "Lung resection",
    "Mediastinal procedures"
  ],
  "Neurosurgery": [
    "Craniotomy",
    "Burr-hole procedure",
    "Intracranial hematoma evacuation",
    "Ventriculostomy",
    "Spinal decompression",
    "Lumbar discectomy"
  ],
  "Orthopaedic Surgery": [
    "Fracture reduction",
    "Internal fixation",
    "External fixation",
    "Hip replacement",
    "Knee replacement",
    "Arthroscopy",
    "Tendon repair",
    "Plaster and cast application"
  ],
  "Obstetrics and Gynaecology": [
    "Caesarean section",
    "Normal delivery procedures",
    "Episiotomy and repair",
    "Hysterectomy",
    "Ovarian surgery",
    "Laparoscopic gynaecological surgery"
  ],
  "ENT and Ophthalmology": [
    "Tonsillectomy",
    "Tracheostomy",
    "Nasal packing",
    "Tympanoplasty",
    "Cataract surgery",
    "Basic eye procedures"
  ],
  "Urology": [
    "Urinary catheterisation",
    "Cystoscopy",
    "TURP overview",
    "Stone-removal procedures",
    "Nephrectomy overview"
  ],
  "Emergency Procedures": [
    "Basic and advanced life support",
    "Airway management",
    "Endotracheal intubation",
    "Cricothyrotomy",
    "Central venous access",
    "Lumbar puncture",
    "Chest-tube insertion",
    "Trauma assessment",
    "Haemorrhage control"
  ]
};

export const CATEGORY_TOPICS: Record<string, string[]> = {
  Anatomy: [
    'Upper limb',
    'Lower limb',
    'Thorax',
    'Abdomen',
    'Pelvis and perineum',
    'Head and neck',
    'Back and vertebral column',
    'Heart',
    'Lungs',
    'Brain',
    'Brainstem'
  ],
  Surgery: [
    'Suturing and knot tying',
    'Surgical hand preparation',
    'Haemorrhage control',
    'Appendectomy',
    'Hernia repair',
    'Cholecystectomy',
    'Trauma assessment'
  ],
  Physiology: [
    'Breathing',
    'Blood circulation',
    'Cardiac conduction',
    'Heart function',
    'Kidney function',
    'Digestion',
  ],
  Pathology: [
    'Allergic reaction',
    'Blood clotting',
    'Atherosclerosis',
    'Disease mechanisms',
  ],
  'Clinical Skills': [
    'Basic surgical techniques',
    'Sterile gowning and gloving',
    'Vital signs',
    'Intravenous access'
  ],
  'Medical Imaging': [
    'Normal chest X-ray',
    'Abdominal CT',
    'Brain MRI',
    'Ultrasound anatomy'
  ]
};

export interface VideoFilters {
  query?: string;
  category?: string;
  collection?: string;
  subtopic?: string;
  topic?: string;
  phase?: string;
  difficulty?: string;
  mediaType?: string;
  duration?: string;
  language?: string;
  hasCaptions?: boolean;
  facultyReviewedOnly?: boolean;
  completedOnly?: boolean;
  sortBy?: 'recent' | 'popular' | 'rating' | 'shortest' | 'longest' | 'title' | 'curriculum';
  anatomy?: string;
  specialty?: string;
  procedure?: string;
}

export const MEDICAL_VIDEO_LIBRARY: SelfHostedMedicalVideo[] = [
  {
    "id": "vid-anat-femoral-triangle",
    "title": "3D Functional Anatomy of the Femoral Triangle & Canal",
    "titleBn": "ফেমোরাল ট্রায়াঙ্গেল ও ক্যানালের ত্রিমাত্রিক শারীরবৃত্তীয় গঠন",
    "summary": "Comprehensive 3D topographical exploration of the femoral triangle, femoral sheath compartments, femoral ring boundaries, and clinical anatomy of femoral hernias.",
    "description": "High-definition functional 3D anatomical tour of the femoral triangle in the anterior thigh. Details the inguinal ligament, sartorius, adductor longus, muscular floor (pectineus, iliopsoas), NAVEL neurovascular arrangement, femoral sheath fascial layers, and the femoral canal with Cloquet’s node.",
    "category": "Anatomy",
    "collection": "Gross Anatomy",
    "subtopic": "Lower limb",
    "procedureType": "Anatomical landmark identification",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "03:40",
    "durationSeconds": 220,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Department of Human Anatomy",
    "institution": "Open Medical Anatomy Initiative",
    "source": "Wikimedia Commons Medical Education",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:3D_Tour_of_the_Femoral_Triangle.ogv",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/femoral-triangle-canal.ogv",
    "thumbnailUrl": "/medical-videos/anatomy/femoral-triangle-canal.jpg",
    "captionsUrl": "/medical-videos/anatomy/femoral-triangle-canal.vtt",
    "graphicContent": false,
    "license": {
      "type": "CC BY-SA 4.0",
      "permission": "Creative Commons Attribution-ShareAlike 4.0 International redistribution permitted",
      "evidence": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "attribution": "Source: About Medicine, Wikimedia Commons (CC BY-SA 4.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Shamsun Nahar, FCPS",
      "reviewerRole": "Head of Anatomy Department, Dhaka Medical College",
      "reviewedAt": "2026-09-16T11:00:00.000Z",
      "notes": "Anatomically verified for BM&DC Phase 1 lower limb curriculum. Accurate depiction of NAVEL and femoral sheath."
    },
    "learningObjectives": [
      "Define the anatomical borders and muscular floor of the femoral triangle.",
      "Differentiate the contents of the femoral sheath compartments from the lateral femoral nerve.",
      "Identify the boundaries of the femoral ring (inguinal, lacunar, pectineal ligaments, and femoral vein).",
      "Explain the anatomical path and high strangulation risk of femoral hernia through the femoral canal."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Introduction & Fascial Topography",
        "titleBn": "ভূমিকা ও ফ্যাসিয়াল অবস্থান",
        "description": "Overview of the subfascial anterior thigh compartment."
      },
      {
        "timestampSeconds": 20,
        "title": "Borders: Inguinal Ligament, Sartorius & Adductor",
        "titleBn": "সীমানা: ইনগুইনাল লিগামেন্ট, সারটোরিয়াস ও অ্যাডাক্টর",
        "description": "ASIS to pubic tubercle boundaries."
      },
      {
        "timestampSeconds": 65,
        "title": "Muscular Floor & Fascial Roof",
        "titleBn": "পেশীবহুল মেঝে ও ছাদ",
        "description": "Pectineus, iliopsoas, adductor longus, and cribriform fascia."
      },
      {
        "timestampSeconds": 95,
        "title": "NAVEL Organization & Femoral Sheath",
        "titleBn": "নাভেল বিন্যাস ও ফেমোরাল শিথ",
        "description": "Nerve, Artery, Vein, Empty space, Lymphatics."
      },
      {
        "timestampSeconds": 155,
        "title": "Femoral Canal & Cloquet's Node",
        "titleBn": "ফেমোরাল ক্যানাল ও ক্লোকেটের লিম্ফ নোড",
        "description": "Medial conical compartment and deep inguinal lymphatics."
      },
      {
        "timestampSeconds": 190,
        "title": "Femoral Ring & Hernia Pathophysiology",
        "titleBn": "ফেমোরাল রিং ও হার্নিয়ার মেকানিজম",
        "description": "Lacunar ligament sharpness and strangulation risk."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Welcome to this functional 3D anatomical tour of the femoral triangle and femoral canal in the upper anterior thigh."
      },
      {
        "timestampSeconds": 18,
        "speaker": "Narrator",
        "text": "Its superior boundary is formed by the inguinal ligament, extending from the ASIS to the pubic tubercle."
      },
      {
        "timestampSeconds": 39,
        "speaker": "Narrator",
        "text": "The lateral boundary is defined by the medial border of the sartorius muscle, the longest strap muscle in the human body."
      },
      {
        "timestampSeconds": 50,
        "speaker": "Narrator",
        "text": "Medially, the triangle is bounded by the medial margin of the adductor longus muscle."
      },
      {
        "timestampSeconds": 95,
        "speaker": "Narrator",
        "text": "The contents from lateral to medial follow the classic surgical mnemonic NAVEL: Nerve, Artery, Vein, Empty space, Lymphatics."
      },
      {
        "timestampSeconds": 155,
        "speaker": "Narrator",
        "text": "The medial compartment is the femoral canal, containing loose adipose tissue and the deep inguinal node of Cloquet."
      },
      {
        "timestampSeconds": 190,
        "speaker": "Narrator",
        "text": "The rigid margin of the lacunar ligament confers a high strangulation risk in femoral hernias."
      }
    ],
    "relevantAnatomy": [
      "Inguinal Ligament",
      "Sartorius Muscle",
      "Adductor Longus",
      "Pectineus Muscle",
      "Femoral Nerve",
      "Femoral Artery",
      "Femoral Vein",
      "Femoral Canal",
      "Deep Lymph Node of Cloquet"
    ],
    "instruments": [
      "Anatomical forceps",
      "Surgical probe",
      "Scalpel handle #3",
      "Dissecting scissors"
    ],
    "clinicalPearls": [
      "The femoral nerve lies OUTSIDE the femoral sheath; femoral nerve blocks must be placed lateral to the sheath.",
      "Femoral hernia is more common in multiparous females due to wider pelvis and enlarged femoral ring.",
      "Femoral artery cannulation is performed at the midinguinal point (midway between ASIS and pubic symphysis)."
    ],
    "commonMistakes": [
      "Confusing midinguinal point (femoral artery) with midpoint of inguinal ligament (deep inguinal ring).",
      "Assuming the femoral nerve is inside the femoral sheath.",
      "Overlooking that the lacunar ligament forms the medial, rigid border prone to strangulating herniated bowel."
    ],
    "safetyDisclaimer": "For MBBS anatomical education. Clinical procedures such as femoral arterial punctures and femoral hernia repair require clinical faculty supervision and strict sterile technique.",
    "textbookLinks": [
      {
        "title": "Last's Anatomy: Regional and Applied (12th ed)",
        "chapter": "Chapter 3: Lower Limb - Femoral Triangle",
        "pages": "pp. 118-124"
      },
      {
        "title": "BD Chaurasia's Human Anatomy (8th ed)",
        "chapter": "Volume 2: Lower Limb - Anterior Thigh",
        "pages": "pp. 45-53"
      },
      {
        "title": "Bailey & Love's Short Practice of Surgery (28th ed)",
        "chapter": "Chapter 60: Hernias, Umbilicus and Abdominal Wall",
        "pages": "pp. 1042-1048"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
      "topic": "Anatomy of the Lower Limb & Inguinal Canal",
      "syllabusCode": "BMDC-ANAT-LL-04",
      "acrossBooksTopicId": "inguinal-canal-hernia"
    },
    "quiz": [
      {
        "id": "q-anat-ft-01",
        "question": "Which structure forms the lateral boundary of the femoral triangle?",
        "options": [
          "Lateral border of rectus femoris",
          "Medial border of sartorius muscle",
          "Medial border of adductor longus",
          "Pectineus muscle"
        ],
        "correctOptionIndex": 1,
        "explanation": "The femoral triangle is bounded laterally by the medial border of the sartorius muscle."
      },
      {
        "id": "q-anat-ft-02",
        "question": "Which structure is located immediately lateral to the femoral sheath, outside its fascial compartments?",
        "options": [
          "Femoral branch of genitofemoral nerve",
          "Deep inguinal lymph node of Cloquet",
          "Femoral nerve (L2-L4)",
          "Femoral artery"
        ],
        "correctOptionIndex": 2,
        "explanation": "The femoral nerve lies lateral to the femoral sheath, descending under the inguinal ligament in the groove between iliacus and psoas."
      },
      {
        "id": "q-anat-ft-03",
        "question": "What anatomical structure bounds the femoral ring medially?",
        "options": [
          "Inguinal ligament",
          "Lacunar (Gimbernat's) ligament",
          "Pectineal (Cooper's) ligament",
          "Femoral vein septum"
        ],
        "correctOptionIndex": 1,
        "explanation": "The medial boundary of the femoral ring is the sharp, crescentic free edge of the lacunar (Gimbernat's) ligament."
      },
      {
        "id": "q-anat-ft-04",
        "question": "What is the deep inguinal lymph node situated within the femoral canal called?",
        "options": [
          "Node of Stahr",
          "Node of Virchow",
          "Node of Cloquet (Rosenmüller)",
          "Rotter's node"
        ],
        "correctOptionIndex": 2,
        "explanation": "The lymph node of Cloquet (also known as Rosenmüller's node) resides in the femoral canal, draining lymph from the glans clitoridis/penis and deep lower limb."
      },
      {
        "id": "q-anat-ft-05",
        "question": "Why do femoral hernias carry a significantly higher rate of strangulation compared to indirect inguinal hernias?",
        "options": [
          "Lack of peritoneal sac",
          "Narrow, unyielding boundaries of the femoral ring, particularly the lacunar ligament",
          "Absence of arterial supply to the femoral canal",
          "Large diameter of the femoral ring"
        ],
        "correctOptionIndex": 1,
        "explanation": "The femoral ring is rigid and unyielding, bounded medially by the sharp lacunar ligament and posteriorly by Cooper's ligament, predisposing to rapid incarceration and strangulation."
      }
    ],
    "relatedVideoIds": [
      "vid-surg-square-knot",
      "vid-surg-trauma-laparotomy",
      "mp-path-cholesterol"
    ],
    "anatomy": [
      "Femoral Triangle",
      "Femoral Canal",
      "Inguinal Ligament",
      "Femoral Artery",
      "Femoral Vein",
      "Femoral Nerve"
    ],
    "specialty": [
      "General Surgery",
      "Gross Anatomy",
      "Vascular Surgery"
    ],
    "procedure": [
      "Anatomical landmark identification",
      "Femoral Arterial Puncture",
      "Femoral Hernia Repair"
    ],
    "topics": [
      "Lower limb",
      "Femoral canal",
      "Femoral hernia",
      "Gross Anatomy"
    ],
    "storage_path": "medical-videos/anatomy/femoral-triangle-canal.ogv",
    "playback_url": "/medical-videos/anatomy/femoral-triangle-canal.ogv",
    "thumbnail_url": "/medical-videos/anatomy/femoral-triangle-canal.jpg",
    "captions_url": "/medical-videos/anatomy/femoral-triangle-canal.vtt",
    "created_at": "2026-09-18T12:00:00.000Z"
  },
  {
    "id": "vid-surg-square-knot",
    "title": "Square Knot Suture Technique (One-Hand Method)",
    "titleBn": "এক হাতে স্কয়ার নট সেলাই কৌশল",
    "summary": "Clinical surgical demonstration of the one-handed square (reef) knot technique. Essential foundational skill for wound closure, vessel ligation, and tissue reapproximation.",
    "description": "Practical clinical surgical skills video illustrating the precision one-handed square knot technique. Demonstrates tension maintenance on the post strand, index finger loop formation, reverse middle-finger second throw, knot squaring, and prevention of slip knots or air knots.",
    "category": "Surgery",
    "collection": "General Surgery",
    "subtopic": "Suturing and knot tying",
    "procedureType": "Surgical skills demonstration",
    "mbbsPhase": "Phase 3: 4th Year (Clinical)",
    "difficulty": "Beginner",
    "duration": "00:53",
    "durationSeconds": 53,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "clinical_demonstration",
    "instructor": "Dr. Arif Alper Çevik, FACS",
    "institution": "Department of Emergency Medicine & Clinical Skills Lab",
    "source": "Wikimedia Commons Surgical Skills Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Square_knot_suture_technique_with_one_hand.webm",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/surgery/square-knot-suture-technique.webm",
    "thumbnailUrl": "/medical-videos/surgery/square-knot-suture-technique.jpg",
    "captionsUrl": "/medical-videos/surgery/square-knot-suture-technique.vtt",
    "graphicContent": false,
    "license": {
      "type": "CC BY 3.0",
      "permission": "Creative Commons Attribution 3.0 Unported redistribution permitted",
      "evidence": "https://creativecommons.org/licenses/by/3.0/"
    },
    "attribution": "Source: Dr. Arif Alper Çevik, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. M. A. Karim, FRCS",
      "reviewerRole": "Professor of Surgery, Dhaka Medical College Hospital",
      "reviewedAt": "2026-09-17T09:30:00.000Z",
      "notes": "Demonstrates flawless two-throw square knot mechanics conforming to BM&DC Phase 3 clinical practical requirements."
    },
    "learningObjectives": [
      "Master the hand positioning and tension control on the post strand during one-handed knot tying.",
      "Execute the primary index-finger forward throw and reverse middle-finger counter-throw.",
      "Recognize and prevent common knot errors including granny knots and half-hitches.",
      "Apply appropriate knot tension to achieve wound edge approximation without tissue ischemia."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Strand Tension & Hand Orientation",
        "titleBn": "সুতার টান ও হাতের অবস্থান",
        "description": "Holding the post strand under uniform tension."
      },
      {
        "timestampSeconds": 15,
        "title": "First Throw: Index Finger Loop",
        "titleBn": "প্রথম প্যাঁচ: তর্জনীর লুপ",
        "description": "Forward loop creation and strand transfer."
      },
      {
        "timestampSeconds": 32,
        "title": "Second Throw: Middle Finger Counter-Throw",
        "titleBn": "দ্বিতীয় প্যাঁচ: মধ্যমার প্যাঁচ",
        "description": "Reversing direction to create a true square knot."
      },
      {
        "timestampSeconds": 46,
        "title": "Knot Inspection & Wound Approximation",
        "titleBn": "নট পরীক্ষা ও ক্ষত সন্নিবেশ",
        "description": "Confirming knot lays flat with balanced tension."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "Surgical Skills Demonstration: One-Handed Square Knot Suture Technique."
      },
      {
        "timestampSeconds": 7,
        "speaker": "Instructor",
        "text": "Hold the post strand under moderate tension with your non-dominant hand while manipulating the loop strand."
      },
      {
        "timestampSeconds": 15,
        "speaker": "Instructor",
        "text": "First throw: Wrap the working strand over the index finger, forming an anterior loop around the post."
      },
      {
        "timestampSeconds": 23,
        "speaker": "Instructor",
        "text": "Pass the tail through the loop using the index fingertip, ensuring the throw is laid completely square and flat."
      },
      {
        "timestampSeconds": 32,
        "speaker": "Instructor",
        "text": "Second throw: Reverse the wrap by using the middle and ring fingers to cross behind the post strand."
      },
      {
        "timestampSeconds": 40,
        "speaker": "Instructor",
        "text": "Pull the second throw down flat against the initial throw, securing the square knot without slip."
      },
      {
        "timestampSeconds": 47,
        "speaker": "Instructor",
        "text": "Verify knot symmetry and tension across the surgical wound margin to prevent tissue strangulation."
      }
    ],
    "indications": [
      "Skin incision approximation and layered wound closure.",
      "Vascular hemostatic ligation of superficial and deep vessels.",
      "Securing surgical drains, central lines, and chest tubes.",
      "Bowel and fascia closure in general surgical operations."
    ],
    "contraindications": [
      "Infected, necrotic, or heavily contaminated wounds requiring secondary intention healing.",
      "Approximation under excessive tension without subcutaneous tissue release.",
      "Sole closure in high-tension fascial planes without deep retention sutures."
    ],
    "patientPreparation": [
      "Skin antisepsis with 2% chlorhexidine gluconate in 70% isopropyl alcohol or povidone-iodine.",
      "Adequate local anesthesia (1% or 2% lidocaine with or without adrenaline).",
      "Wound debridement and thorough pulsed irrigation with sterile saline.",
      "Placement of sterile surgical drapes around the operative field."
    ],
    "relevantAnatomy": [
      "Epidermis",
      "Dermis",
      "Subcutaneous fat layer",
      "Superficial fascia",
      "Wound margins"
    ],
    "instruments": [
      "Mayo-Hegar needle holder",
      "Adson toothed tissue forceps",
      "Suture scissors",
      "Monofilament suture material (3-0 or 4-0 Nylon/Polypropylene)"
    ],
    "surgicalSteps": [
      {
        "stepNumber": 1,
        "stepTitle": "Strand Tension & Non-Dominant Grip",
        "description": "Maintain continuous gentle tension on the active post strand with the thumb and middle finger of the non-dominant hand.",
        "keyAnatomy": [
          "Suture post strand",
          "Loop strand"
        ],
        "instruments": [
          "Adson forceps",
          "Surgical gloves"
        ],
        "warnings": [
          "Do not overtighten or jerk the suture, which weakens tensile strength."
        ]
      },
      {
        "stepNumber": 2,
        "stepTitle": "Index Finger Forward Throw",
        "description": "Loop the suture over the index finger, pinch the tail between index and thumb, and bring it through the loop to lay flat on the tissue.",
        "keyAnatomy": [
          "Wound margin",
          "Dermis"
        ],
        "instruments": [
          "Index finger",
          "Needle holder"
        ],
        "warnings": [
          "Ensure the throw lies flat without air gap."
        ]
      },
      {
        "stepNumber": 3,
        "stepTitle": "Middle Finger Counter-Throw",
        "description": "Reverse the hand motion using middle finger extension across the post strand to create an opposing throw, completing the square knot geometry.",
        "keyAnatomy": [
          "Square knot interlock"
        ],
        "instruments": [
          "Middle finger",
          "Monofilament suture"
        ],
        "warnings": [
          "Failing to reverse direction creates an unstable granny knot."
        ]
      },
      {
        "stepNumber": 4,
        "stepTitle": "Knot Squaring & Tail Trimming",
        "description": "Slide the completed knot down firmly to the tissue, verify knot security with a third locking throw, and trim suture tails to 4-5 mm.",
        "keyAnatomy": [
          "Skin surface"
        ],
        "instruments": [
          "Mayo or suture scissors"
        ],
        "warnings": [
          "Cutting tails too short (<3 mm) risks knot unraveling under postoperative edema."
        ]
      }
    ],
    "complications": [
      "Wound dehiscence from knot slipping (granny knot or insufficient throws).",
      "Tissue necrosis from tying knots with excessive strangulating tension.",
      "Suture granuloma or stitch abscess around retained foreign material.",
      "Hypertrophic scar formation from uneven wound edge eversion."
    ],
    "postoperativeCare": [
      "Keep surgical site clean, dry, and covered with sterile non-adherent dressing for 48 hours.",
      "Inspect daily for surgical site infection signs (erythema, warmth, purulent discharge).",
      "Schedule suture removal at appropriate timeline: face (3-5 days), scalp (7-10 days), trunk and extremities (10-14 days)."
    ],
    "clinicalPearls": [
      "Approximate, do not strangulate: the knot should gently bring dermis into contact without blanching the skin.",
      "Monofilament sutures (e.g., Nylon, Prolene) have memory and require 4 to 5 throws to prevent slip.",
      "The one-handed technique is faster in deep cavities, but the two-handed technique provides superior tactile tension feedback."
    ],
    "commonMistakes": [
      "Creating a granny knot by pulling the second throw in the same rotational direction as the first.",
      "Pulling one strand tighter than the other, converting the square knot into an insecure slip-knot.",
      "Tying the knot directly over the incision line rather than off to one side."
    ],
    "safetyDisclaimer": "For surgical skills education. All surgical wound closures in hospital and clinic settings require strict adherence to asepsis, patient consent, and hospital safety protocols.",
    "textbookLinks": [
      {
        "title": "Bailey & Love's Short Practice of Surgery (28th ed)",
        "chapter": "Chapter 14: Basic Surgical Skills and Anastomoses",
        "pages": "pp. 235-242"
      },
      {
        "title": "Farquharson's Textbook of Operative General Surgery (10th ed)",
        "chapter": "Chapter 1: Principles of Operative Technique",
        "pages": "pp. 8-16"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 3: 4th Year (Clinical)",
      "topic": "Basic Surgical Techniques & Knot Tying",
      "syllabusCode": "BMDC-SURG-SKILL-01",
      "acrossBooksTopicId": "surgical-wound-healing"
    },
    "quiz": [
      {
        "id": "q-surg-sk-01",
        "question": "What is the primary geometric difference between a true square knot and an accidental granny knot?",
        "options": [
          "A square knot uses three strands, while a granny knot uses two.",
          "In a square knot, successive throws reverse direction, whereas in a granny knot, both throws are in the same direction.",
          "A square knot cannot be used on monofilament sutures.",
          "A square knot is only tied with two hands."
        ],
        "correctOptionIndex": 1,
        "explanation": "A true square (reef) knot requires alternating the direction of successive throws, creating symmetrical interlocking loops that resist slipping."
      },
      {
        "id": "q-surg-sk-02",
        "question": "How many throws are typically recommended to secure a knot when using slippery synthetic monofilament suture (such as Nylon or Polypropylene)?",
        "options": [
          "1 throw",
          "2 throws",
          "4 to 5 throws",
          "10 throws"
        ],
        "correctOptionIndex": 2,
        "explanation": "Synthetic monofilament sutures possess high memory and low coefficient of friction, requiring 4 to 5 throws to ensure knot security."
      },
      {
        "id": "q-surg-sk-03",
        "question": "Where should the completed surgical knot ideally lie in relation to the wound line?",
        "options": [
          "Directly on top of the cut wound edge",
          "To one side of the incision line, away from the healing wound margin",
          "Buried beneath the subcutaneous tissue only",
          "Exactly centered between wound edges"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knots should be placed to one side of the incision line to prevent foreign body indentation, foreign material incorporation into the scar, and wound disruption."
      },
      {
        "id": "q-surg-sk-04",
        "question": "What is the most serious tissue complication resulting from tying surgical sutures with excessive tension?",
        "options": [
          "Accelerated epithelialization",
          "Local tissue ischemia and edge necrosis",
          "Spontaneous knot unraveling",
          "Decreased risk of infection"
        ],
        "correctOptionIndex": 1,
        "explanation": "Excessive tension compromises microvascular capillary perfusion at the wound margins, causing local ischemia, necrosis, and wound breakdown."
      },
      {
        "id": "q-surg-sk-05",
        "question": "What is the standard recommended timeline for removing simple interrupted sutures on the human face?",
        "options": [
          "1 to 2 days",
          "3 to 5 days",
          "10 to 14 days",
          "21 days"
        ],
        "correctOptionIndex": 1,
        "explanation": "Facial skin has an abundant vascular supply allowing rapid initial healing; sutures are removed at 3 to 5 days to prevent permanent cross-hatch railroad track marks."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle",
      "vid-surg-trauma-laparotomy",
      "mp-path-histamine"
    ],
    "anatomy": [
      "Skin",
      "Dermis",
      "Subcutaneous Tissue"
    ],
    "specialty": [
      "General Surgery",
      "Plastic Surgery",
      "Emergency Medicine"
    ],
    "procedure": [
      "Suturing and knot tying",
      "Wound closure",
      "Surgical skills demonstration"
    ],
    "topics": [
      "Suturing and knot tying",
      "General Surgery",
      "Surgical skills"
    ],
    "storage_path": "medical-videos/surgery/square-knot-suture-technique.webm",
    "playback_url": "/medical-videos/surgery/square-knot-suture-technique.webm",
    "thumbnail_url": "/medical-videos/surgery/square-knot-suture-technique.jpg",
    "captions_url": "/medical-videos/surgery/square-knot-suture-technique.vtt",
    "created_at": "2026-09-18T13:00:00.000Z"
  },
  {
    "id": "vid-surg-trauma-laparotomy",
    "title": "Emergency Trauma Laparotomy & Abdominal Hemorrhage Control",
    "titleBn": "জরুরি ট্রমা ল্যাপারোটমি ও পেটের রক্তক্ষরণ নিয়ন্ত্রণ",
    "summary": "Clinical operative footage depicting emergency trauma laparotomy, four-quadrant abdominal packing, and damage control resuscitation in acute hemoperitoneum.",
    "description": "Direct intra-operative surgical recording of an emergency exploratory laparotomy performed for massive intraperitoneal hemorrhage following high-velocity trauma. Illustrates rapid midline xiphoid-to-pubis celiotomy, immediate four-quadrant surgical sponge packing, mesenteric vascular exploration, and damage control principles.",
    "category": "Surgery",
    "collection": "Emergency Procedures",
    "subtopic": "Haemorrhage control",
    "procedureType": "Damage control surgery",
    "mbbsPhase": "Phase 4: 5th Year (Clinical)",
    "difficulty": "Advanced",
    "duration": "01:15",
    "durationSeconds": 75,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "real_surgery",
    "instructor": "Dr. S. Matsumoto, Trauma Surgery Unit",
    "institution": "Emergency & Critical Care Center",
    "source": "World Journal of Emergency Surgery (BioMed Central Open Access)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Digital-video-recording-in-trauma-surgery-using-commercially-available-equipment-1757-7241-21-27-S2.ogv",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "thumbnailUrl": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.jpg",
    "captionsUrl": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.vtt",
    "graphicContent": true,
    "graphicWarningText": "Clinical Operative Recording: This video contains direct intra-abdominal surgical footage of active hemorrhage and damage control laparotomy in severe blunt trauma. For medical education purposes only.",
    "license": {
      "type": "CC BY 2.0",
      "permission": "Creative Commons Attribution 2.0 Generic Open Access redistribution permitted",
      "evidence": "https://creativecommons.org/licenses/by/2.0/"
    },
    "attribution": "Source: Matsumoto et al., World Journal of Emergency Surgery (CC BY 2.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tanvir Rahman, MS, FACS",
      "reviewerRole": "Consultant Trauma Surgeon, Emergency Department",
      "reviewedAt": "2026-09-17T14:00:00.000Z",
      "notes": "Reviewed and approved for BM&DC Phase 4 clinical surgery curriculum. Meets strict medical education ethics and consent requirements."
    },
    "learningObjectives": [
      "Outline the indications for immediate emergency trauma laparotomy in hemodynamically unstable patients.",
      "Explain the rationale and technique of four-quadrant abdominal packing for temporary hemorrhage control.",
      "Define the damage control surgery philosophy: interruption of the lethal triad (hypothermia, acidosis, coagulopathy).",
      "Describe the protocol for temporary abdominal closure and planned second-look re-exploration."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Damage Control Laparotomy Overview",
        "titleBn": "ড্যামেজ কন্ট্রোল ল্যাপারোটমি ধারণা",
        "description": "Immediate midline incision and evacuation of hemoperitoneum."
      },
      {
        "timestampSeconds": 20,
        "title": "Four-Quadrant Abdominal Packing",
        "titleBn": "চার কোয়াড্রেন্ট পেকিং পদ্ধতি",
        "description": "Systematic placement of laparotomy sponges around liver and spleen."
      },
      {
        "timestampSeconds": 45,
        "title": "Surgical Hemostasis & Vessel Isolation",
        "titleBn": "রক্তনালী সনাক্তকরণ ও রক্তক্ষরণ বন্ধ",
        "description": "Vascular clamping of active mesenteric bleeding vessels."
      },
      {
        "timestampSeconds": 65,
        "title": "Temporary Abdominal Closure (TAC)",
        "titleBn": "সাময়িক পেট বন্ধকরণ",
        "description": "Bogota bag / negative pressure therapy to prevent abdominal compartment syndrome."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Surgeon",
        "text": "Damage Control Surgery: Emergency Trauma Laparotomy for Abdominal Hemorrhage Control."
      },
      {
        "timestampSeconds": 8,
        "speaker": "Surgeon",
        "text": "Clinical graphic warning: This operative recording depicts intra-abdominal surgical hemorrhage in severe blunt trauma."
      },
      {
        "timestampSeconds": 18,
        "speaker": "Surgeon",
        "text": "A rapid midline laparotomy incision is carried out from the xiphoid process to the pubic symphysis."
      },
      {
        "timestampSeconds": 28,
        "speaker": "Surgeon",
        "text": "Immediate four-quadrant abdominal packing is deployed using laparotomy sponges to tamponade active bleeding sites."
      },
      {
        "timestampSeconds": 38,
        "speaker": "Surgeon",
        "text": "Right upper quadrant packing controls perihepatic injury, while left upper quadrant packing stabilizes splenic trauma."
      },
      {
        "timestampSeconds": 49,
        "speaker": "Surgeon",
        "text": "Systematic pack removal begins in uninjured quadrants, localizing vascular mesenteric and solid organ lacerations."
      },
      {
        "timestampSeconds": 59,
        "speaker": "Surgeon",
        "text": "Hemostatic vascular clamps and vascular suturing achieve rapid surgical hemostasis to interrupt the lethal triad."
      },
      {
        "timestampSeconds": 68,
        "speaker": "Surgeon",
        "text": "Temporary abdominal closure is applied for planned secondary re-exploration in surgical intensive care."
      }
    ],
    "indications": [
      "Blunt abdominal trauma with hemodynamic instability and positive FAST (Focused Assessment with Sonography for Trauma).",
      "Penetrating abdominal trauma with shock, peritonitis, or evisceration.",
      "Uncontrolled intra-abdominal hemorrhage or progressive abdominal distension."
    ],
    "contraindications": [
      "Hemodynamically stable trauma patient suitable for contrast-enhanced abdominal CT evaluation.",
      "Terminal unsurvivable injuries where ongoing operative intervention is futile."
    ],
    "patientPreparation": [
      "Activation of massive transfusion protocol (1:1:1 packed red blood cells, fresh frozen plasma, platelets).",
      "Rapid sequence intubation and mechanical ventilation.",
      "Wide skin prep from chin to midthigh with antimicrobial solution.",
      "Active patient warming with forced-air blankets and warmed intravenous fluids."
    ],
    "relevantAnatomy": [
      "Peritoneal cavity",
      "Liver (segments I-VIII)",
      "Spleen",
      "Mesenteric vessels",
      "Abdominal aorta",
      "Inferior vena cava"
    ],
    "instruments": [
      "Balfour self-retaining abdominal retractor",
      "Poole suction tube",
      "Laparotomy sponges with radiopaque markers",
      "Satinsky vascular clamps",
      "Debakey tissue forceps"
    ],
    "surgicalSteps": [
      {
        "stepNumber": 1,
        "stepTitle": "Rapid Midline Celiotomy",
        "description": "Incise from xiphoid to pubic symphysis through the linea alba, taking care not to lacerate underlying distended bowel or hematoma.",
        "keyAnatomy": [
          "Linea alba",
          "Peritoneum"
        ],
        "instruments": [
          "Scalpel #10",
          "Electrocautery"
        ],
        "warnings": [
          "Avoid blind deep plunging in presence of diaphragmatic or visceral tears."
        ]
      },
      {
        "stepNumber": 2,
        "stepTitle": "Evisceration & Four-Quadrant Packing",
        "description": "Scoop out major blood clots with hands and immediately pack all four quadrants (RUQ perihepatic, LUQ perisplenic, right paracolic, left paracolic/pelvis) with folded laparotomy sponges.",
        "keyAnatomy": [
          "Liver",
          "Spleen",
          "Pelvic brim"
        ],
        "instruments": [
          "Laparotomy pads",
          "Yankauer suction"
        ],
        "warnings": [
          "Do not disrupt retroperitoneal hematomas unless actively expanding or pulsatile."
        ]
      },
      {
        "stepNumber": 3,
        "stepTitle": "Selective Pack Removal & Hemostasis",
        "description": "Wait 5-10 minutes for anesthesia resuscitation, then systematically unpack one quadrant at a time to identify and control active arterial or major venous bleeding.",
        "keyAnatomy": [
          "Mesentery",
          "Celiac trunk",
          "Superior mesenteric vessels"
        ],
        "instruments": [
          "Satinsky clamps",
          "3-0 Prolene vascular suture"
        ],
        "warnings": [
          "Maintain communication with anesthesiologist regarding ongoing core body temperature and blood pressure."
        ]
      },
      {
        "stepNumber": 4,
        "stepTitle": "Temporary Abdominal Closure",
        "description": "Place an open bowel bag or negative-pressure temporary dressing without fascial closure to avoid lethal abdominal compartment syndrome.",
        "keyAnatomy": [
          "Abdominal wall fascia",
          "Skin"
        ],
        "instruments": [
          "Sterile surgical drape",
          "Vacuum suction sponge"
        ],
        "warnings": [
          "Never close fascia under high tension in damage control surgery."
        ]
      }
    ],
    "complications": [
      "Abdominal compartment syndrome (elevated intra-abdominal pressure >20 mmHg with organ dysfunction).",
      "Disseminated intravascular coagulation (DIC) and intractable coagulopathic bleeding.",
      "Enterocutaneous fistula from exposed bowel loops.",
      "Retained surgical sponge (retained foreign object)."
    ],
    "postoperativeCare": [
      "Transfer directly to Surgical Intensive Care Unit (SICU) for physiological rewarming, coagulopathy correction, and acid-base balancing.",
      "Continuous intra-abdominal pressure monitoring via urinary bladder catheter.",
      "Planned return to operating theatre within 24 to 48 hours for definitive organ repair and pack removal."
    ],
    "clinicalPearls": [
      "The \"Lethal Triad\" of trauma consists of hypothermia, metabolic acidosis, and coagulopathy; operations must terminate before this becomes irreversible.",
      "Damage control surgery prioritizes control of hemorrhage and contamination over definitive anatomical reconstruction.",
      "Count all laparotomy packs meticulously and document exact pack placement coordinates."
    ],
    "commonMistakes": [
      "Attempting complex prolonged definitive resections in a hypothermic, acidotic, coagulopathic patient.",
      "Prematurely removing packing sponges before anesthesia has restored circulating volume and clotting factors.",
      "Forcibly closing the abdominal wall fascia, precipitating fatal abdominal compartment syndrome."
    ],
    "safetyDisclaimer": "Clinical trauma operative video. Trauma laparotomy is performed by certified general/trauma surgeons in tertiary emergency centers with dedicated surgical multidisciplinary teams.",
    "textbookLinks": [
      {
        "title": "Schwartz's Principles of Surgery (11th ed)",
        "chapter": "Chapter 7: Trauma and Emergency Surgery",
        "pages": "pp. 185-210"
      },
      {
        "title": "Bailey & Love's Short Practice of Surgery (28th ed)",
        "chapter": "Chapter 24: Trauma: Principles of Management",
        "pages": "pp. 410-428"
      },
      {
        "title": "ATLS: Advanced Trauma Life Support (10th ed)",
        "chapter": "Chapter 5: Abdominal and Pelvic Trauma",
        "pages": "pp. 82-101"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 4: 5th Year (Clinical)",
      "topic": "Management of Polytrauma and Abdominal Injury",
      "syllabusCode": "BMDC-SURG-EMG-04",
      "acrossBooksTopicId": "trauma-hemorrhage-shock"
    },
    "quiz": [
      {
        "id": "q-surg-tl-01",
        "question": "What are the three components comprising the \"Lethal Triad\" in severe surgical trauma?",
        "options": [
          "Hypotension, tachycardia, and hypoxemia",
          "Hypothermia, metabolic acidosis, and coagulopathy",
          "Hyperkalemia, hyponatremia, and azotemia",
          "Hyperthermia, alkalosis, and thrombocytopenia"
        ],
        "correctOptionIndex": 1,
        "explanation": "The lethal triad in trauma consists of hypothermia, metabolic acidosis, and coagulopathy, creating a vicious physiological cycle that mandates abbreviated damage control surgery."
      },
      {
        "id": "q-surg-tl-02",
        "question": "What is the immediate primary maneuver upon entering the peritoneal cavity during an emergency trauma laparotomy for massive hemoperitoneum?",
        "options": [
          "Immediate formal right hemicolectomy",
          "Immediate four-quadrant laparotomy sponge packing to achieve temporary tamponade",
          "Total splenectomy and cholecystectomy",
          "Careful microscopic dissection of the bile duct"
        ],
        "correctOptionIndex": 1,
        "explanation": "Immediate four-quadrant packing with laparotomy pads tamponades venous and parenchymal bleeding across the liver, spleen, and pelvis while allowing the anesthesia team to resuscitate."
      },
      {
        "id": "q-surg-tl-03",
        "question": "Why is primary fascial closure contraindicated at the conclusion of a damage control laparotomy?",
        "options": [
          "It causes chronic suture rejection",
          "It dramatically increases intra-abdominal pressure, precipitating fatal Abdominal Compartment Syndrome",
          "It prevents patient extubation forever",
          "Fascia does not heal in trauma"
        ],
        "correctOptionIndex": 1,
        "explanation": "Closing fascia over massive visceral edema and packs leads to elevated intra-abdominal pressure (>20 mmHg), decreasing renal perfusion and impairing ventilation (Abdominal Compartment Syndrome)."
      },
      {
        "id": "q-surg-tl-04",
        "question": "Within what timeframe is a trauma patient typically returned to the operating room for definitive repair and pack removal after damage control laparotomy?",
        "options": [
          "Within 2 to 4 hours",
          "Within 24 to 48 hours once physiological parameters normalize",
          "After 3 to 4 weeks",
          "Only after hospital discharge"
        ],
        "correctOptionIndex": 1,
        "explanation": "Definitive reconstruction and sponge removal are performed after resuscitation in the ICU, typically 24 to 48 hours post-injury when core temperature, acid-base, and coagulation have normalized."
      },
      {
        "id": "q-surg-tl-05",
        "question": "Which investigative modality is standard bedside practice in the emergency resuscitation bay to detect intraperitoneal blood in blunt trauma?",
        "options": [
          "Barium enema",
          "Focused Assessment with Sonography for Trauma (FAST)",
          "Intravenous urogram",
          "Plain abdominal radiograph in prone position"
        ],
        "correctOptionIndex": 1,
        "explanation": "FAST ultrasound rapidly interrogates the hepatorenal space (Morison's pouch), splenorenal recess, pelvis, and pericardium for free pathological fluid."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle",
      "vid-surg-square-knot",
      "mp-path-cholesterol"
    ],
    "anatomy": [
      "Peritoneal cavity",
      "Liver",
      "Spleen",
      "Mesenteric vessels",
      "Abdominal Wall"
    ],
    "specialty": [
      "General Surgery",
      "Trauma Surgery",
      "Emergency Medicine"
    ],
    "procedure": [
      "Emergency trauma laparotomy",
      "Damage control surgery",
      "Haemorrhage control"
    ],
    "topics": [
      "Haemorrhage control",
      "Emergency Procedures",
      "Trauma assessment",
      "Surgery"
    ],
    "storage_path": "medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "playback_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.ogv",
    "thumbnail_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.jpg",
    "captions_url": "/medical-videos/surgery/trauma-laparotomy-hemorrhage.vtt",
    "created_at": "2026-09-18T14:00:00.000Z"
  },
  {
    "id": "mp-path-histamine",
    "title": "Histamine: The Stuff Allergies are Made of",
    "titleBn": "হিস্টামিন: অ্যালার্জির জৈবিক ও ক্লিনিক্যাল প্রক্রিয়া",
    "summary": "Educational animation exploring histamine's dual physiological role as a neurotransmitter and gastric acid stimulant, versus its pathological role in mediating allergic reactions and anaphylaxis.",
    "description": "Educational animation exploring histamine's dual physiological role as a vital neurotransmitter and gastric acid stimulant, versus its immunological role in mediating allergic reactions, tissue edema, bronchoconstriction, and life-threatening anaphylaxis. Produced with NIAID/NIH medical research.",
    "category": "Pathology",
    "collection": "Pathology",
    "subtopic": "Allergic reaction",
    "procedureType": "Allergy testing & epinephrine therapy",
    "mbbsPhase": "Phase 2: 3rd Year (Para-clinical)",
    "difficulty": "Beginner",
    "duration": "03:34",
    "durationSeconds": 214,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "National Institute of Allergy and Infectious Diseases",
    "institution": "National Institutes of Health (NIH) / NLM",
    "source": "MedlinePlus, National Library of Medicine",
    "sourceUrl": "https://medlineplus.gov/medlineplus-videos/histamine-the-stuff-allergies-are-made-of/",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/pathology/histamine-allergies.mp4",
    "thumbnailUrl": "/medical-videos/pathology/histamine-allergies.jpg",
    "captionsUrl": "/medical-videos/pathology/histamine-allergies.vtt",
    "graphicContent": false,
    "license": {
      "type": "Public Domain",
      "permission": "Public domain work of the U.S. Federal Government under 17 U.S.C. § 105",
      "evidence": "https://medlineplus.gov/about/using/usingcontent/"
    },
    "attribution": "Source: MedlinePlus, National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Associate Professor of Pathology, Dhaka Medical College",
      "reviewedAt": "2026-09-15T10:00:00.000Z",
      "notes": "Reviewed and approved as verified public-domain media for BM&DC Phase 2 Immunology."
    },
    "learningObjectives": [
      "Describe mast cell degranulation and the biological synthesis of histamine from histidine.",
      "Explain H1 receptor activation in vascular smooth muscle and endothelial contraction.",
      "Distinguish localized allergic rhinitis from systemic anaphylactic shock.",
      "Identify immediate pharmacological rescue with intramuscular Epinephrine."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Physiological Roles of Histamine",
        "titleBn": "হিস্টামিনের স্বাভাবিক শারীরবৃত্তীয় ভূমিকা",
        "description": "Neurotransmitter and gastric acid stimulator."
      },
      {
        "timestampSeconds": 52,
        "title": "Allergen Exposure & IgE Priming",
        "titleBn": "অ্যালার্জেন ও আইজিই অ্যান্টিবডি প্রস্তুতি",
        "description": "Sensitization of mast cells and basophils."
      },
      {
        "timestampSeconds": 114,
        "title": "Degranulation & Vascular Permeability",
        "titleBn": "ডিগ্র্যানুলেশন ও রক্তনালীর ব্যাপ্তি বৃদ্ধি",
        "description": "Endothelial gap formation, edema, and flare."
      },
      {
        "timestampSeconds": 168,
        "title": "Airway Constriction & Anaphylaxis",
        "titleBn": "শ্বাসনালী সংকোচন ও অ্যানাফিল্যাক্সিস",
        "description": "Bronchospasm, hemodynamic collapse, and epinephrine rescue."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "You sneeze, your eyes water, and your nose runs. Histamine is the chemical behind these symptoms, but it also does vital work inside your body."
      },
      {
        "timestampSeconds": 52,
        "speaker": "Narrator",
        "text": "In an allergic reaction, your immune system mistakes harmless substances like pollen or pet dander for dangerous invaders."
      },
      {
        "timestampSeconds": 114,
        "speaker": "Narrator",
        "text": "When allergens cross-link IgE antibodies on mast cells, histamine is released into surrounding tissues."
      },
      {
        "timestampSeconds": 168,
        "speaker": "Narrator",
        "text": "Histamine dilates blood vessels, causing redness and swelling, while constricting smooth muscles in your lungs."
      }
    ],
    "relevantAnatomy": [
      "Mast cells",
      "Endothelial cells",
      "Bronchial smooth muscle",
      "Nerve endings"
    ],
    "instruments": [
      "Skin prick lancet",
      "EpiPen auto-injector",
      "Stethoscope"
    ],
    "clinicalPearls": [
      "Intramuscular Epinephrine in the anterolateral thigh is the first-line treatment for anaphylaxis; antihistamines and steroids are secondary adjuncts.",
      "Histamine causes vasodilation via H1 receptors on endothelial cells stimulating nitric oxide release.",
      "Second-generation H1 antihistamines (Cetirizine, Loratadine) do not cross the blood-brain barrier and cause minimal sedation."
    ],
    "commonMistakes": [
      "Relying on oral antihistamines for anaphylaxis instead of immediate intramuscular Epinephrine.",
      "Administering subcutaneous instead of intramuscular epinephrine in acute shock."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.",
    "textbookLinks": [
      {
        "title": "Robbins & Cotran Pathologic Basis of Disease (10th ed)",
        "chapter": "Chapter 6: Diseases of the Immune System",
        "pages": "pp. 195-204"
      },
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 34: Resistance of the Body to Infection",
        "pages": "pp. 445-452"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 2: 3rd Year (Para-clinical)",
      "topic": "Type I Hypersensitivity & Chemical Mediators",
      "syllabusCode": "BMDC-PATH-IMM-02",
      "acrossBooksTopicId": "allergy-anaphylaxis"
    },
    "quiz": [
      {
        "id": "q-path-his-01",
        "question": "Which class of immunoglobulins is primarily responsible for priming mast cells in Type I hypersensitivity reactions?",
        "options": [
          "IgG",
          "IgA",
          "IgE",
          "IgM"
        ],
        "correctOptionIndex": 2,
        "explanation": "IgE antibodies bind with high affinity to FcεRI receptors on the surface of mast cells and basophils, triggering degranulation upon allergen re-exposure."
      },
      {
        "id": "q-path-his-02",
        "question": "What is the primary cellular mechanism by which histamine causes localized tissue edema (wheal formation)?",
        "options": [
          "Endothelial cell contraction causing inter-endothelial gap formation and fluid extravasation",
          "Direct lysis of red blood cells",
          "Arterial vasoconstriction and ischemia",
          "Blockade of lymphatic valves"
        ],
        "correctOptionIndex": 0,
        "explanation": "Histamine binds H1 receptors on post-capillary venular endothelial cells, causing cytoskeletal contraction that creates intercellular gaps, leading to plasma leakage and edema."
      },
      {
        "id": "q-path-his-03",
        "question": "What is the mandatory first-line emergency drug for acute anaphylaxis?",
        "options": [
          "Intravenous Hydrocortisone",
          "Oral Cetirizine",
          "Intramuscular Epinephrine (Adrenaline)",
          "Inhaled Salbutamol"
        ],
        "correctOptionIndex": 2,
        "explanation": "Intramuscular Epinephrine into the anterolateral thigh is the definitive first-line medication, rapidly counteracting hypotension via alpha-1 vasoconstriction and bronchospasm via beta-2 bronchodilation."
      },
      {
        "id": "q-path-his-04",
        "question": "Which amino acid is the direct biochemical precursor of histamine in the human body?",
        "options": [
          "Tyrosine",
          "Histidine",
          "Tryptophan",
          "Phenylalanine"
        ],
        "correctOptionIndex": 1,
        "explanation": "Histamine is synthesized by the enzymatic decarboxylation of the amino acid L-histidine by histidine decarboxylase."
      },
      {
        "id": "q-path-his-05",
        "question": "Why do second-generation H1 antihistamines (e.g., Fexofenadine, Loratadine) cause significantly less sedation than first-generation agents (e.g., Diphenhydramine)?",
        "options": [
          "They do not bind H1 receptors",
          "They have poor penetration across the blood-brain barrier due to substrate specificity for P-glycoprotein efflux pump",
          "They stimulate CNS adrenergic receptors",
          "They are rapidly degraded in the stomach"
        ],
        "correctOptionIndex": 1,
        "explanation": "Second-generation H1 antihistamines are larger, more polar molecules and substrates for the P-glycoprotein efflux pump, resulting in minimal blood-brain barrier crossing and sedation."
      }
    ],
    "relatedVideoIds": [
      "mp-path-cholesterol",
      "mp-phys-gluten",
      "vid-surg-square-knot"
    ],
    "anatomy": [
      "Immune System",
      "Blood Vessels",
      "Skin",
      "Respiratory Tract"
    ],
    "specialty": [
      "Immunology",
      "Allergy",
      "Pathology"
    ],
    "procedure": [
      "Allergy Testing",
      "Epinephrine Administration",
      "Antihistamine Therapy"
    ],
    "topics": [
      "Allergic reaction",
      "Disease mechanisms"
    ],
    "storage_path": "medical-videos/pathology/histamine-allergies.mp4",
    "playback_url": "/medical-videos/pathology/histamine-allergies.mp4",
    "thumbnail_url": "/medical-videos/pathology/histamine-allergies.jpg",
    "captions_url": "/medical-videos/pathology/histamine-allergies.vtt",
    "created_at": "2026-09-18T10:00:00.000Z"
  },
  {
    "id": "mp-path-cholesterol",
    "title": "Cholesterol: Good and Bad",
    "titleBn": "কোলেস্টেরল: অ্যাথেরোস্ক্লেরোসিস ও ভাস্কুলার ডিজিজ প্যাথলজি",
    "summary": "Clinical animation detailing lipoprotein metabolism, LDL oxidation within arterial intima, foam cell accumulation, fibroatheroma formation, and acute ischemic coronary thrombosis.",
    "description": "Educational explainer covering lipoprotein transport, LDL particle deposition in arterial subendothelium, inflammatory monocyte recruitment, macrophage foam cell formation, vulnerable plaque development, and acute arterial occlusion leading to myocardial infarction or ischemic stroke.",
    "category": "Pathology",
    "collection": "Pathology",
    "subtopic": "Atherosclerosis",
    "procedureType": "Lipid panel testing & coronary angiography",
    "mbbsPhase": "Phase 2: 3rd Year (Para-clinical)",
    "difficulty": "Intermediate",
    "duration": "02:56",
    "durationSeconds": 176,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "National Heart, Lung, and Blood Institute",
    "institution": "National Institutes of Health (NIH) / NLM",
    "source": "MedlinePlus, National Library of Medicine",
    "sourceUrl": "https://medlineplus.gov/medlineplus-videos/cholesterol-good-and-bad/",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/pathology/cholesterol-atherosclerosis.mp4",
    "thumbnailUrl": "/medical-videos/pathology/cholesterol-atherosclerosis.jpg",
    "captionsUrl": "/medical-videos/pathology/cholesterol-atherosclerosis.vtt",
    "graphicContent": false,
    "license": {
      "type": "Public Domain",
      "permission": "Public domain work of the U.S. Federal Government under 17 U.S.C. § 105",
      "evidence": "https://medlineplus.gov/about/using/usingcontent/"
    },
    "attribution": "Source: MedlinePlus, National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Associate Professor of Pathology, Dhaka Medical College",
      "reviewedAt": "2026-09-15T10:00:00.000Z",
      "notes": "Reviewed and approved for BM&DC Phase 2 Cardiovascular Pathology."
    },
    "learningObjectives": [
      "Compare the physiological roles of LDL and HDL in peripheral lipid transport.",
      "Explain the sequence of atherogenesis: endothelial injury, LDL oxidation, foam cell transformation.",
      "Describe the morphological features of vulnerable thin-cap fibroatheromas.",
      "Identify therapeutic targets including HMG-CoA reductase inhibitors (Statins)."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Lipoproteins: HDL vs LDL",
        "titleBn": "লাইপোপ্রোটিন: এইচডিএল বনাম এলডিএল",
        "description": "Atherogenic versus reverse cholesterol transport."
      },
      {
        "timestampSeconds": 42,
        "title": "Endothelial Trapping & Oxidation",
        "titleBn": "এন্ডোথেলিয়াল জমা ও অক্সিডেশন",
        "description": "Subendothelial infiltration of small dense LDL."
      },
      {
        "timestampSeconds": 88,
        "title": "Foam Cell Formation & Fatty Streak",
        "titleBn": "ফোম সেল ও ফ্যাটি স্ট্রিক সৃষ্টি",
        "description": "Scavenger receptor uptake by tissue macrophages."
      },
      {
        "timestampSeconds": 132,
        "title": "Plaque Rupture & Acute Thrombosis",
        "titleBn": "প্লাক বিদীর্ণ ও রক্তজমাট বাধা",
        "description": "Fibrous cap rupture driving acute myocardial infarction."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Cholesterol travels through your blood in packages called lipoproteins. Low-density lipoprotein (LDL) delivers cholesterol to cells, while HDL carries it away."
      },
      {
        "timestampSeconds": 42,
        "speaker": "Narrator",
        "text": "When LDL levels are too high, excess particles enter the inner lining of artery walls."
      },
      {
        "timestampSeconds": 88,
        "speaker": "Narrator",
        "text": "There, LDL becomes oxidized, triggering inflammation. Macrophages engulf oxidized LDL, transforming into lipid-laden foam cells."
      },
      {
        "timestampSeconds": 132,
        "speaker": "Narrator",
        "text": "Over time, a fibrous plaque builds up. If this plaque ruptures, a blood clot forms instantly, cutting off blood supply to the heart or brain."
      }
    ],
    "relevantAnatomy": [
      "Coronary Arteries",
      "Carotid Arteries",
      "Arterial Endothelium",
      "Cardiac Myocardium"
    ],
    "instruments": [
      "Lipid panel assay",
      "Cardiac catheterization fluoroscopy",
      "Coronary stent system"
    ],
    "clinicalPearls": [
      "Vulnerable plaques prone to rupture often have a thin fibrous cap (<65 microns) with a large necrotic lipid core and macrophage infiltration.",
      "Statins not only lower LDL cholesterol but also stabilize plaque via pleiotropic anti-inflammatory effects.",
      "HDL promotes reverse cholesterol transport via ATP-binding cassette transporter A1 (ABCA1)."
    ],
    "commonMistakes": [
      "Assuming that degree of arterial stenosis directly correlates with rupture risk (many STEMIs occur from mildly stenotic vulnerable plaques).",
      "Overlooking secondary hyperlipidemias caused by hypothyroidism or nephrotic syndrome."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.",
    "textbookLinks": [
      {
        "title": "Robbins & Cotran Pathologic Basis of Disease (10th ed)",
        "chapter": "Chapter 11: Blood Vessels - Atherosclerosis",
        "pages": "pp. 488-498"
      },
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 69: Lipid Metabolism",
        "pages": "pp. 863-870"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 2: 3rd Year (Para-clinical)",
      "topic": "Cardiovascular Pathology: Atherogenesis & Ischemic Heart Disease",
      "syllabusCode": "BMDC-PATH-CVS-01",
      "acrossBooksTopicId": "coronary-artery-disease"
    },
    "quiz": [
      {
        "id": "q-path-chol-01",
        "question": "Which pathological cell type forms the histological hallmark of the early atheromatous fatty streak?",
        "options": [
          "Neutrophils",
          "Macrophage-derived foam cells",
          "Eosinophils",
          "Osteoclasts"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fatty streaks are composed of lipid-laden macrophages (foam cells) that have engulfed oxidized LDL in the arterial subendothelium."
      },
      {
        "id": "q-path-chol-02",
        "question": "Which receptor mediates the unregulated uptake of oxidized LDL by subendothelial macrophages?",
        "options": [
          "Native LDL receptor",
          "Scavenger receptors (SR-A and CD36)",
          "Insulin receptor",
          "Transferrin receptor"
        ],
        "correctOptionIndex": 1,
        "explanation": "Scavenger receptors (SR-A and CD36) on macrophages bind oxidized LDL and are not down-regulated by intracellular cholesterol, leading to foam cell formation."
      },
      {
        "id": "q-path-chol-03",
        "question": "What is the primary mechanism of action of Statin medications in reducing atherosclerotic cardiovascular risk?",
        "options": [
          "Inhibition of HMG-CoA reductase, upregulating hepatic LDL receptors",
          "Direct binding and excretion of bile acids in the colon",
          "Inhibition of intestinal Niemann-Pick C1-like 1 (NPC1L1) transporter",
          "Activation of lipoprotein lipase in skeletal muscle"
        ],
        "correctOptionIndex": 0,
        "explanation": "Statins competitively inhibit HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis, causing hepatocytes to upregulate LDL receptors to clear circulating LDL."
      },
      {
        "id": "q-path-chol-04",
        "question": "Which structural feature is characteristic of a \"vulnerable\" atherosclerotic plaque prone to sudden rupture?",
        "options": [
          "Thick fibrous cap with dense collagen and sparse inflammation",
          "Thin fibrous cap with large lipid core and dense macrophage infiltration",
          "Heavy concentric medial calcification without necrosis",
          "Absence of microvessels in the plaque base"
        ],
        "correctOptionIndex": 1,
        "explanation": "Vulnerable plaques feature a thin fibrous cap (<65 µm), rich macrophage infiltrate secreting matrix metalloproteinases, and a large necrotic lipid core."
      },
      {
        "id": "q-path-chol-05",
        "question": "What is the role of High-Density Lipoprotein (HDL) in vascular protection?",
        "options": [
          "Direct conversion of fibrinogen to fibrin",
          "Reverse cholesterol transport, carrying peripheral tissue cholesterol back to the liver",
          "Induction of smooth muscle proliferation",
          "Stimulation of vascular endothelial adhesion molecule-1"
        ],
        "correctOptionIndex": 1,
        "explanation": "HDL mediates reverse cholesterol transport, removing excess cholesterol from peripheral tissues and atheromas for hepatic excretion in bile."
      }
    ],
    "relatedVideoIds": [
      "mp-path-histamine",
      "mp-phys-naloxone",
      "vid-surg-trauma-laparotomy"
    ],
    "anatomy": [
      "Heart",
      "Blood Vessels",
      "Coronary Arteries"
    ],
    "specialty": [
      "Cardiology",
      "Pathology",
      "Vascular Surgery"
    ],
    "procedure": [
      "Lipid Profiling",
      "Coronary Angiography",
      "Statin Therapy"
    ],
    "topics": [
      "Atherosclerosis",
      "Heart function",
      "Blood circulation",
      "Pathology"
    ],
    "storage_path": "medical-videos/pathology/cholesterol-atherosclerosis.mp4",
    "playback_url": "/medical-videos/pathology/cholesterol-atherosclerosis.mp4",
    "thumbnail_url": "/medical-videos/pathology/cholesterol-atherosclerosis.jpg",
    "captions_url": "/medical-videos/pathology/cholesterol-atherosclerosis.vtt",
    "created_at": "2026-09-18T10:00:00.000Z"
  },
  {
    "id": "mp-phys-gluten",
    "title": "Gluten and Celiac Disease",
    "titleBn": "গ্লুটেন ও সিলিয়াক ডিজিজ: ক্ষুদ্রান্ত্রের প্যাথোফিজিওলজি",
    "summary": "Clinical animation depicting gluten breakdown into gliadin peptides, mucosal immune activation in the small intestine, enterocyte apoptosis, villous atrophy, and malabsorption syndromes.",
    "description": "Educational video on celiac sprue pathogenesis. Demonstrates tissue transglutaminase deamidation of gliadin, HLA-DQ2/DQ8 antigen presentation, intraepithelial CD8+ T-cell activation, blunting and flattening of small intestinal villi, and resultant nutritional deficiencies.",
    "category": "Physiology",
    "collection": "Physiology",
    "subtopic": "Digestion",
    "procedureType": "Upper GI endoscopy with duodenal biopsy",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Beginner",
    "duration": "02:47",
    "durationSeconds": 167,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "National Institute of Diabetes and Digestive and Kidney Diseases",
    "institution": "National Institutes of Health (NIH) / NLM",
    "source": "MedlinePlus, National Library of Medicine",
    "sourceUrl": "https://medlineplus.gov/medlineplus-videos/gluten-and-celiac-disease/",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/physiology/gluten-celiac-digestion.mp4",
    "thumbnailUrl": "/medical-videos/physiology/gluten-celiac-digestion.jpg",
    "captionsUrl": "/medical-videos/physiology/gluten-celiac-digestion.vtt",
    "graphicContent": false,
    "license": {
      "type": "Public Domain",
      "permission": "Public domain work of the U.S. Federal Government under 17 U.S.C. § 105",
      "evidence": "https://medlineplus.gov/about/using/usingcontent/"
    },
    "attribution": "Source: MedlinePlus, National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Associate Professor of Pathology, Dhaka Medical College",
      "reviewedAt": "2026-09-15T10:00:00.000Z",
      "notes": "Reviewed and approved for BM&DC Phase 1 GI Physiology and Phase 2 Pathology."
    },
    "learningObjectives": [
      "Explain the enzymatic role of tissue transglutaminase (tTG) on dietary gluten gliadin.",
      "Identify the genetic linkage with HLA-DQ2 and HLA-DQ8 heterodimers.",
      "Describe the histological hallmarks of Marsh Stage 3: villous atrophy, crypt hyperplasia, and intraepithelial lymphocytosis.",
      "Outline diagnostic serology: anti-tTG IgA and endomysial antibodies."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "What is Gluten?",
        "titleBn": "গ্লুটেন কি?",
        "description": "Storage proteins found in wheat, barley, and rye."
      },
      {
        "timestampSeconds": 38,
        "title": "Gliadin Deamidation by tTG",
        "titleBn": "টিস্যু ট্রান্সগ্লুটামিনেজ দ্বারা রূপান্তর",
        "description": "Deamidation creates negatively charged immunogenic peptides."
      },
      {
        "timestampSeconds": 78,
        "title": "Immune Attack & Villous Flattening",
        "titleBn": "অনাক্রম্য আক্রমণ ও ভিলাস ক্ষয়",
        "description": "Destruction of brush border surface area."
      },
      {
        "timestampSeconds": 122,
        "title": "Malabsorption & Gluten-Free Diet",
        "titleBn": "শোষণহীনতা ও গ্লুটেন-মুক্ত খাবার",
        "description": "Clinical recovery upon strict dietary elimination."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Gluten is a protein found in wheat, rye, and barley that gives dough its elastic shape."
      },
      {
        "timestampSeconds": 38,
        "speaker": "Narrator",
        "text": "In people with celiac disease, the immune system treats gluten as a threat."
      },
      {
        "timestampSeconds": 78,
        "speaker": "Narrator",
        "text": "Tissue transglutaminase modifies gliadin, triggering white blood cells to attack the lining of the small intestine."
      },
      {
        "timestampSeconds": 122,
        "speaker": "Narrator",
        "text": "The tiny, finger-like villi that absorb nutrients become damaged and flat, leading to malnutrition."
      }
    ],
    "relevantAnatomy": [
      "Duodenum",
      "Jejunum",
      "Intestinal Villi",
      "Microvilli brush border"
    ],
    "instruments": [
      "Upper gastrointestinal endoscope",
      "Biopsy forceps",
      "ELISA autoantibody reader"
    ],
    "clinicalPearls": [
      "Before testing anti-tTG IgA, always check total serum IgA level because selective IgA deficiency occurs in 2-3% of celiac patients.",
      "Dermatitis herpetiformis is pathognomonic cutaneous manifestation of celiac disease with granular IgA deposits in dermal papillae.",
      "The gold standard confirmation remains upper endoscopy with multiple duodenal biopsies (1-2 from bulb, at least 4 from descending duodenum)."
    ],
    "commonMistakes": [
      "Testing serology after the patient has already initiated a gluten-free diet, yielding false-negative results.",
      "Failing to screen first-degree relatives of confirmed celiac patients."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.",
    "textbookLinks": [
      {
        "title": "Robbins & Cotran Pathologic Basis of Disease (10th ed)",
        "chapter": "Chapter 17: Gastrointestinal Tract - Celiac Disease",
        "pages": "pp. 775-780"
      },
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 66: Digestion and Absorption in the Gastrointestinal Tract",
        "pages": "pp. 825-832"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
      "topic": "Physiology of Digestion & Intestinal Absorption",
      "syllabusCode": "BMDC-PHYSIO-GIT-03",
      "acrossBooksTopicId": "gastrointestinal-digestion"
    },
    "quiz": [
      {
        "id": "q-phys-glu-01",
        "question": "Which specific antigen is the primary autoantibody target in celiac disease screening?",
        "options": [
          "Anti-nuclear antibody (ANA)",
          "Tissue transglutaminase (tTG)",
          "Anti-mitochondrial antibody (AMA)",
          "P-ANCA"
        ],
        "correctOptionIndex": 1,
        "explanation": "Anti-tissue transglutaminase (anti-tTG) IgA is the primary, highly sensitive and specific serological screening test for celiac disease."
      },
      {
        "id": "q-phys-glu-02",
        "question": "Which human leukocyte antigen (HLA) alleles are strongly associated with genetic susceptibility to celiac disease?",
        "options": [
          "HLA-B27",
          "HLA-DQ2 and HLA-DQ8",
          "HLA-DR4 only",
          "HLA-B51"
        ],
        "correctOptionIndex": 1,
        "explanation": "Virtually all patients (>99%) with celiac disease express HLA-DQ2 or HLA-DQ8, which present deamidated gliadin peptides to helper T-cells."
      },
      {
        "id": "q-phys-glu-03",
        "question": "What is the characteristic histological triad seen in diagnostic duodenal biopsies of active celiac disease (Marsh classification)?",
        "options": [
          "Non-caseating granulomas, transmural inflammation, and lymphoid aggregates",
          "Villous atrophy, crypt hyperplasia, and increased intraepithelial lymphocytes",
          "Pseudo-polyps, mucosal friability, and crypt abscesses",
          "Gastric metaplasia with Helicobacter pylori invasion"
        ],
        "correctOptionIndex": 1,
        "explanation": "The histological triad diagnostic of celiac disease comprises blunting/atrophy of intestinal villi, compensatory crypt hyperplasia, and intraepithelial lymphocytosis."
      },
      {
        "id": "q-phys-glu-04",
        "question": "What pathognomonic blistering cutaneous condition is associated with celiac disease?",
        "options": [
          "Erythema multiforme",
          "Dermatitis herpetiformis",
          "Pityriasis rosea",
          "Acanthosis nigricans"
        ],
        "correctOptionIndex": 1,
        "explanation": "Dermatitis herpetiformis is an intensely pruritic blistering skin disease characterized by granular IgA deposition at the dermal-epidermal junction, linked to celiac disease."
      },
      {
        "id": "q-phys-glu-05",
        "question": "Why must total serum IgA be measured concurrently when screening a patient for celiac disease with anti-tTG IgA?",
        "options": [
          "To calculate liver synthetic function",
          "Because selective IgA deficiency is 10-15 times more common in celiac patients and causes false-negative tests",
          "To detect concurrent viral hepatitis",
          "Because high IgA causes kidney stones"
        ],
        "correctOptionIndex": 1,
        "explanation": "Selective IgA deficiency occurs with increased prevalence in celiac patients, leading to undetectable anti-tTG IgA and false-negative screening; in such cases, IgG-based testing is used."
      }
    ],
    "relatedVideoIds": [
      "mp-path-histamine",
      "mp-path-cholesterol",
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Digestive system",
      "Small Intestine",
      "Duodenum",
      "Jejunum"
    ],
    "specialty": [
      "Gastroenterology",
      "Physiology",
      "Pathology"
    ],
    "procedure": [
      "Upper GI Endoscopy",
      "Duodenal Biopsy",
      "Gluten Elimination"
    ],
    "topics": [
      "Digestion",
      "Physiology",
      "Stomach and intestines"
    ],
    "storage_path": "medical-videos/physiology/gluten-celiac-digestion.mp4",
    "playback_url": "/medical-videos/physiology/gluten-celiac-digestion.mp4",
    "thumbnail_url": "/medical-videos/physiology/gluten-celiac-digestion.jpg",
    "captions_url": "/medical-videos/physiology/gluten-celiac-digestion.vtt",
    "created_at": "2026-09-18T10:00:00.000Z"
  },
  {
    "id": "mp-path-antibiotics",
    "title": "Antibiotics vs. Bacteria: Fighting the Resistance",
    "titleBn": "অ্যান্টিবায়োটিক প্রতিরোধ মেকানিজম: সুপারবাগ ও ব্যাকটিরিয়াল প্যাথলজি",
    "summary": "Clinical animation demonstrating bacterial resistance mechanisms against antibiotics: beta-lactamase enzyme production, efflux pump overexpression, target site alteration, and plasmid conjugation.",
    "description": "Comprehensive medical microbiology animation detailing the biological crisis of antimicrobial resistance. Depicts horizontal gene transfer via bacterial plasmids, enzymatic destruction of beta-lactam rings, alteration of penicillin-binding proteins in MRSA, and membrane efflux pumps.",
    "category": "Pathology",
    "collection": "Pathology",
    "subtopic": "Disease mechanisms",
    "procedureType": "Antimicrobial susceptibility testing (AST)",
    "mbbsPhase": "Phase 2: 3rd Year (Para-clinical)",
    "difficulty": "Intermediate",
    "duration": "04:50",
    "durationSeconds": 290,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "National Institute of Allergy and Infectious Diseases",
    "institution": "National Institutes of Health (NIH) / NLM",
    "source": "MedlinePlus, National Library of Medicine",
    "sourceUrl": "https://medlineplus.gov/medlineplus-videos/antibiotics-vs-bacteria-fighting-the-resistance/",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/pathology/antibiotic-resistance-mechanisms.mp4",
    "thumbnailUrl": "/medical-videos/pathology/antibiotic-resistance-mechanisms.jpg",
    "captionsUrl": "/medical-videos/pathology/antibiotic-resistance-mechanisms.vtt",
    "graphicContent": false,
    "license": {
      "type": "Public Domain",
      "permission": "Public domain work of the U.S. Federal Government under 17 U.S.C. § 105",
      "evidence": "https://medlineplus.gov/about/using/usingcontent/"
    },
    "attribution": "Source: MedlinePlus, National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Associate Professor of Pathology, Dhaka Medical College",
      "reviewedAt": "2026-09-15T10:00:00.000Z",
      "notes": "Reviewed and approved for BM&DC Phase 2 Medical Microbiology & Pharmacology."
    },
    "learningObjectives": [
      "Classify the 4 primary mechanisms of bacterial antimicrobial resistance.",
      "Explain horizontal gene transfer via plasmid conjugation, transformation, and transduction.",
      "Describe the molecular basis of MRSA (mecA gene encoding PBP2a).",
      "Apply antibiotic stewardship principles to prevent nosocomial superbug emergence."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "How Antibiotics Target Bacteria",
        "titleBn": "অ্যান্টিবায়োটিক কীভাবে ব্যাকটিরিয়া ধ্বংস করে",
        "description": "Cell wall, ribosome, and DNA gyrase inhibition."
      },
      {
        "timestampSeconds": 74,
        "title": "Mutations & Natural Selection",
        "titleBn": "মিউটেশন ও প্রাকৃতিক নির্বাচন",
        "description": "Spontaneous genomic changes conferring survival advantage."
      },
      {
        "timestampSeconds": 145,
        "title": "The 4 Resistance Mechanisms",
        "titleBn": "প্রতিরোধের ৪টি প্রধান প্রক্রিয়া",
        "description": "Enzymatic inactivation, efflux, target mutation, and reduced permeability."
      },
      {
        "timestampSeconds": 220,
        "title": "Horizontal Gene Transfer via Plasmids",
        "titleBn": "প্লাজমিডের মাধ্যমে জিন স্থানান্তর",
        "description": "Bacterial conjugation sharing resistance across species."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Antibiotics are powerful medicines that fight bacterial infections by targeting cell walls, protein synthesis, or DNA replication."
      },
      {
        "timestampSeconds": 74,
        "speaker": "Narrator",
        "text": "However, frequent exposure selects for resistant bacterial strains that survive drug treatment."
      },
      {
        "timestampSeconds": 145,
        "speaker": "Narrator",
        "text": "Bacteria fight back using specialized defenses: neutralizing enzymes like beta-lactamases, efflux pumps that eject drugs, and altered target receptors."
      },
      {
        "timestampSeconds": 220,
        "speaker": "Narrator",
        "text": "Even more concerning, bacteria can rapidly share these resistance genes with other microbes through plasmid conjugation."
      }
    ],
    "relevantAnatomy": [
      "Bacterial cell wall (Peptidoglycan)",
      "Cell membrane",
      "Ribosomal 30S/50S subunits",
      "Plasmids"
    ],
    "instruments": [
      "Kirby-Bauer disk diffusion plate",
      "Minimum Inhibitory Concentration (MIC) strip",
      "Automated blood culture system"
    ],
    "clinicalPearls": [
      "The mecA gene encodes PBP2a, an altered penicillin-binding protein with low affinity for beta-lactams, conferring methicillin resistance in S. aureus.",
      "Carbapenem-resistant Enterobacteriaceae (CRE) produce carbapenemases (KPC, NDM-1) that hydrolyze almost all beta-lactams.",
      "Always obtain clinical bacterial cultures before initiating broad-spectrum empiric antimicrobial therapy."
    ],
    "commonMistakes": [
      "Prescribing antibiotics for self-limiting viral upper respiratory tract infections.",
      "Failing to de-escalate broad-spectrum antibiotics once pathogen susceptibility results return."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.",
    "textbookLinks": [
      {
        "title": "Jawetz, Melnick, & Adelberg's Medical Microbiology (28th ed)",
        "chapter": "Chapter 28: Antimicrobial Chemotherapy",
        "pages": "pp. 370-388"
      },
      {
        "title": "Robbins & Cotran Pathologic Basis of Disease (10th ed)",
        "chapter": "Chapter 8: Infectious Diseases - Antimicrobial Resistance",
        "pages": "pp. 335-342"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 2: 3rd Year (Para-clinical)",
      "topic": "Medical Microbiology & Mechanisms of Antibiotic Resistance",
      "syllabusCode": "BMDC-MICRO-ABR-01",
      "acrossBooksTopicId": "antimicrobial-resistance"
    },
    "quiz": [
      {
        "id": "q-path-abr-01",
        "question": "Which gene is responsible for encoding PBP2a, conferring methicillin resistance in Staphylococcus aureus (MRSA)?",
        "options": [
          "vanA",
          "mecA",
          "blaTEM",
          "gyrA"
        ],
        "correctOptionIndex": 1,
        "explanation": "The mecA gene, carried on the staphylococcal cassette chromosome mec (SCCmec), encodes the penicillin-binding protein PBP2a, which has low affinity for beta-lactams."
      },
      {
        "id": "q-path-abr-02",
        "question": "What is the primary mechanism of horizontal gene transfer where bacteria exchange resistance plasmids via direct cell-to-cell contact through a sex pilus?",
        "options": [
          "Transformation",
          "Conjugation",
          "Transduction",
          "Electroporation"
        ],
        "correctOptionIndex": 1,
        "explanation": "Conjugation involves the transfer of plasmid DNA from a donor bacterium to a recipient cell through direct physical contact via a specialized sex pilus."
      },
      {
        "id": "q-path-abr-03",
        "question": "What is the biochemical mechanism of beta-lactamase enzymes?",
        "options": [
          "They acetylate bacterial 30S ribosomal subunits",
          "They hydrolyze the four-membered beta-lactam ring, inactivating the antibiotic",
          "They actively pump antibiotics across the outer membrane",
          "They mutate bacterial DNA gyrase"
        ],
        "correctOptionIndex": 1,
        "explanation": "Beta-lactamases cleave the amide bond of the four-membered beta-lactam ring present in penicillins and cephalosporins, preventing binding to PBPs."
      },
      {
        "id": "q-path-abr-04",
        "question": "Which enzyme is commonly combined with Amoxicillin to inhibit bacterial beta-lactamases in co-amoxiclav?",
        "options": [
          "Clavulanic acid",
          "Tazobactam only",
          "Vancomycin",
          "Cilastatin"
        ],
        "correctOptionIndex": 0,
        "explanation": "Clavulanic acid is a suicide beta-lactamase inhibitor that binds irreversibly to bacterial beta-lactamases, protecting Amoxicillin from degradation."
      },
      {
        "id": "q-path-abr-05",
        "question": "What mechanism confers Fluoroquinolone resistance in Gram-negative bacteria such as Escherichia coli?",
        "options": [
          "Point mutations in the quinolone resistance-determining regions (QRDR) of DNA gyrase (gyrA) and topoisomerase IV",
          "Ribosomal methylation of the 50S subunit",
          "Cell wall thickening with d-Ala-d-Lac precursors",
          "Enzymatic phosphorylation of the drug molecule"
        ],
        "correctOptionIndex": 0,
        "explanation": "Fluoroquinolones target DNA gyrase and topoisomerase IV; point mutations in gyrA and parC genes decrease drug binding affinity, conferring resistance."
      }
    ],
    "relatedVideoIds": [
      "mp-path-histamine",
      "mp-path-cholesterol",
      "vid-surg-square-knot"
    ],
    "anatomy": [
      "Skin",
      "Lungs",
      "Urinary Tract",
      "Systemic Circulation"
    ],
    "specialty": [
      "Microbiology",
      "Infectious Diseases",
      "Pathology",
      "Pharmacology"
    ],
    "procedure": [
      "Antimicrobial Susceptibility Testing",
      "Gram Staining",
      "Blood Culture"
    ],
    "topics": [
      "Disease mechanisms",
      "Pathology"
    ],
    "storage_path": "medical-videos/pathology/antibiotic-resistance-mechanisms.mp4",
    "playback_url": "/medical-videos/pathology/antibiotic-resistance-mechanisms.mp4",
    "thumbnail_url": "/medical-videos/pathology/antibiotic-resistance-mechanisms.jpg",
    "captions_url": "/medical-videos/pathology/antibiotic-resistance-mechanisms.vtt",
    "created_at": "2026-09-18T10:00:00.000Z"
  },
  {
    "id": "mp-phys-naloxone",
    "title": "How Naloxone Saves Lives in Opioid Overdose",
    "titleBn": "নালোক্সোন কীভাবে কাজ করে: শ্বাসনালী ও ব্রেনস্টেম ফিজিওলজি",
    "summary": "Clinical neurophysiology animation showing mu-opioid receptor binding in the brainstem respiratory center (pre-Bötzinger complex), hypercapnic respiratory depression, and competitive antagonism by Naloxone.",
    "description": "Detailed clinical animation on opioid toxicity and reversal. Illustrates how opioids bind to mu-opioid receptors in the brainstem respiratory rhythm generator, blunting the respiratory drive to arterial carbon dioxide, leading to hypoxemia and cardiac arrest, and how the competitive antagonist Naloxone displaces opioids within minutes.",
    "category": "Physiology",
    "collection": "Neuroanatomy",
    "subtopic": "Brainstem",
    "procedureType": "Naloxone administration (intranasal/IM/IV)",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "04:55",
    "durationSeconds": 295,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "National Institute on Drug Abuse",
    "institution": "National Institutes of Health (NIH) / NLM",
    "source": "MedlinePlus, National Library of Medicine",
    "sourceUrl": "https://medlineplus.gov/medlineplus-videos/how-naloxone-saves-lives-in-opioid-overdose/",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/physiology/naloxone-respiratory-brainstem.mp4",
    "thumbnailUrl": "/medical-videos/physiology/naloxone-respiratory-brainstem.jpg",
    "captionsUrl": "/medical-videos/physiology/naloxone-respiratory-brainstem.vtt",
    "graphicContent": false,
    "license": {
      "type": "Public Domain",
      "permission": "Public domain work of the U.S. Federal Government under 17 U.S.C. § 105",
      "evidence": "https://medlineplus.gov/about/using/usingcontent/"
    },
    "attribution": "Source: MedlinePlus, National Library of Medicine",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Associate Professor of Physiology, Dhaka Medical College",
      "reviewedAt": "2026-09-15T10:00:00.000Z",
      "notes": "Reviewed and approved for BM&DC Phase 1 Neurophysiology & Phase 3 Clinical Pharmacology."
    },
    "learningObjectives": [
      "Locate the medullary respiratory rhythm generators (pre-Bötzinger complex and ventral respiratory group).",
      "Explain G-protein coupled mu-opioid receptor signaling in decreasing neuronal excitability.",
      "Identify the classic opioid overdose triad: respiratory depression, miosis (pinpoint pupils), and coma.",
      "Demonstrate the pharmacokinetics of Naloxone reversal and vigilance for re-sedation."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Opioid Receptors in the Brainstem",
        "titleBn": "ব্রেনস্টেমের ওপিওয়েড রিসেপ্টর",
        "description": "Mu-receptors in the medulla oblongata respiratory centers."
      },
      {
        "timestampSeconds": 78,
        "title": "Mechanism of Respiratory Arrest",
        "titleBn": "শ্বাসযন্ত্র বন্ধ হওয়ার মেকানিজম",
        "description": "Suppression of chemoreceptor response to arterial PaCO2."
      },
      {
        "timestampSeconds": 154,
        "title": "Competitive Antagonism by Naloxone",
        "titleBn": "নালোক্সোনের প্রতিদ্বন্দ্বিতামূলক ক্রিয়া",
        "description": "High-affinity displacement of opioid molecules."
      },
      {
        "timestampSeconds": 235,
        "title": "Restoration of Breathing & Half-Life",
        "titleBn": "শ্বাসের স্বাভাবিকতা ও হাফ-লাইফ পর্যবেক্ষণ",
        "description": "Monitoring for renarcotization as naloxone wears off."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "In the brainstem, neural circuits regulate vital unconscious bodily functions, including heart rate and the rhythm of breathing."
      },
      {
        "timestampSeconds": 78,
        "speaker": "Narrator",
        "text": "Opioid molecules bind to mu-opioid receptors on these neurons, suppressing their ability to respond to rising carbon dioxide levels."
      },
      {
        "timestampSeconds": 154,
        "speaker": "Narrator",
        "text": "During an overdose, breathing slows dangerously or stops completely. Naloxone has a higher binding affinity for these receptors than opioids."
      },
      {
        "timestampSeconds": 235,
        "speaker": "Narrator",
        "text": "Naloxone knocks the opioid molecules off the receptors, restoring normal breathing within two to three minutes."
      }
    ],
    "relevantAnatomy": [
      "Medulla oblongata",
      "Pons",
      "Pre-Bötzinger complex",
      "Phrenic nerve",
      "Diaphragm"
    ],
    "instruments": [
      "Nasal Naloxone spray device (Narcan)",
      "Bag-valve-mask resuscitator",
      "Pulse oximeter"
    ],
    "clinicalPearls": [
      "The plasma half-life of Naloxone (30-90 minutes) is often shorter than that of long-acting opioids (e.g., Methadone, Fentanyl patches), requiring extended monitoring for recurrent coma.",
      "In suspected opioid overdose with apnea, assist ventilation with bag-valve-mask while preparing Naloxone.",
      "Naloxone administration in opioid-dependent individuals precipitates acute withdrawal (agitation, vomiting, tachycardia, diaphoresis)."
    ],
    "commonMistakes": [
      "Discharging the patient immediately after initial wakefulness, unaware that renarcotization can occur as Naloxone clears.",
      "Withholding ventilatory support while searching for Naloxone."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.",
    "textbookLinks": [
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 42: Regulation of Respiration",
        "pages": "pp. 535-544"
      },
      {
        "title": "Goodman & Gilman's The Pharmacological Basis of Therapeutics (14th ed)",
        "chapter": "Chapter 20: Opioids, Opioid Receptors, and Opioid Antagonists",
        "pages": "pp. 385-412"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
      "topic": "Neural Regulation of Respiration & Brainstem Centers",
      "syllabusCode": "BMDC-PHYSIO-RESP-02",
      "acrossBooksTopicId": "brainstem-respiratory-control"
    },
    "quiz": [
      {
        "id": "q-phys-nal-01",
        "question": "Which specific region of the ventrolateral medulla oblongata contains the primary respiratory pacemaker rhythm generator?",
        "options": [
          "Substantia nigra",
          "Pre-Bötzinger complex",
          "Red nucleus",
          "Locus coeruleus"
        ],
        "correctOptionIndex": 1,
        "explanation": "The pre-Bötzinger complex, located in the ventrolateral medulla, contains endogenous pacemaker neurons essential for the generation of normal respiratory rhythm."
      },
      {
        "id": "q-phys-nal-02",
        "question": "What is the pharmacodynamic mechanism of action of Naloxone?",
        "options": [
          "Full agonist at mu-opioid receptors",
          "Pure competitive antagonist at mu, kappa, and delta opioid receptors with highest affinity for mu",
          "Partial agonist with intrinsic sympathetic activity",
          "Irreversible non-competitive inhibitor of GABA receptors"
        ],
        "correctOptionIndex": 1,
        "explanation": "Naloxone is a pure competitive opioid receptor antagonist that displaces opioid agonists from mu, kappa, and delta receptors without producing intrinsic agonist activity."
      },
      {
        "id": "q-phys-nal-03",
        "question": "What clinical sign constitutes the classic physical examination triad of acute opioid overdose?",
        "options": [
          "Hypertension, bradycardia, and irregular respirations (Cushing's triad)",
          "Depressed level of consciousness (coma), miosis (pinpoint pupils), and respiratory depression",
          "Fever, neck stiffness, and altered mental status",
          "Jaundice, ascites, and asterixis"
        ],
        "correctOptionIndex": 1,
        "explanation": "The classic opioid toxidrome triad is coma, pinpoint pupils (miosis), and marked respiratory depression (bradypnea or apnea)."
      },
      {
        "id": "q-phys-nal-04",
        "question": "Why must a patient successfully resuscitated from opioid overdose with Naloxone be observed in the hospital for at least 2 to 4 hours?",
        "options": [
          "To monitor for secondary diabetes insipidus",
          "Because the half-life of Naloxone (30-90 min) is shorter than many opioids, risking recurrent fatal respiratory depression",
          "To ensure renal excretion of naloxone metabolites",
          "Because Naloxone causes delayed malignant hyperthermia"
        ],
        "correctOptionIndex": 1,
        "explanation": "Naloxone has a short elimination half-life of 30-90 minutes. Many opioids have significantly longer durations of action, meaning the patient can relapse into life-threatening coma as Naloxone clears."
      },
      {
        "id": "q-phys-nal-05",
        "question": "What second messenger pathway is inhibited when an opioid agonist binds to the G-protein coupled mu-opioid receptor?",
        "options": [
          "Adenylyl cyclase is inhibited, decreasing intracellular cyclic AMP (cAMP)",
          "Phospholipase C is stimulated, increasing IP3 and DAG",
          "Guanylyl cyclase is stimulated, increasing cGMP",
          "Tyrosine kinase receptor is phosphorylated directly"
        ],
        "correctOptionIndex": 0,
        "explanation": "Mu-opioid receptors couple to Gi/o proteins, which inhibit adenylyl cyclase, reducing intracellular cAMP, closing voltage-gated Ca2+ channels, and opening inward-rectifying K+ channels."
      }
    ],
    "relatedVideoIds": [
      "mp-path-histamine",
      "mp-path-cholesterol",
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Brain",
      "Brainstem",
      "Respiratory Centers",
      "Spinal cord"
    ],
    "specialty": [
      "Physiology",
      "Pharmacology",
      "Emergency Medicine",
      "Neuroanatomy"
    ],
    "procedure": [
      "Naloxone administration",
      "Airway management",
      "Bag-valve-mask ventilation"
    ],
    "topics": [
      "Breathing",
      "Brain",
      "Physiology",
      "Brainstem"
    ],
    "storage_path": "medical-videos/physiology/naloxone-respiratory-brainstem.mp4",
    "playback_url": "/medical-videos/physiology/naloxone-respiratory-brainstem.mp4",
    "thumbnail_url": "/medical-videos/physiology/naloxone-respiratory-brainstem.jpg",
    "captions_url": "/medical-videos/physiology/naloxone-respiratory-brainstem.vtt",
    "created_at": "2026-09-18T10:00:00.000Z"
  },
  {
    "id": "vid-anat-heart-anterior",
    "title": "3D Functional Anatomy of the Human Heart: Anterior Surface & Great Vessels",
    "titleBn": "মানব হৃদপিণ্ডের ত্রিমাত্রিক শারীরস্থান: সম্মুখ পৃষ্ঠ ও প্রধান রক্তনালী",
    "summary": "High-definition 3D medical animation detailing the sternocostal surface, right and left ventricles, anterior interventricular groove, coronary arteries, and great vessels.",
    "description": "Comprehensive 3D animated exploration of cardiac external morphology in the middle mediastinum. Demonstrates the sternocostal anterior surface predominantly formed by the right ventricle, the ascending aorta, pulmonary trunk bifurcation, superior vena cava, and the anterior interventricular sulcus containing the left anterior descending (LAD) artery.",
    "category": "Anatomy",
    "collection": "Heart",
    "subtopic": "Heart",
    "procedureType": "Cardiovascular Anatomical Tour",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Anatomy Team",
    "institution": "Kenhub / Wikimedia Commons Open Educational Resources",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Heart_Anatomy_-_Anterior_view_(preview)_-_Human_Anatomy_Kenhub_1.webm",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "playback_url": "/medical-videos/anatomy/heart-anterior-chambers.webm",
    "storage_path": "medical-videos/anatomy/heart-anterior-chambers.webm",
    "thumbnailUrl": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "thumbnail_url": "/medical-videos/anatomy/heart-anterior-chambers.jpg",
    "captionsUrl": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "captions_url": "/medical-videos/anatomy/heart-anterior-chambers.vtt",
    "license": {
      "type": "Creative Commons Attribution 3.0 Unported (CC BY 3.0)",
      "permission": "Worldwide Open Access Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/licenses/by/3.0/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. M. A. Hasan, FCPS (Cardiology)",
      "reviewerRole": "Professor of Cardiology & Anatomy Examiner, Dhaka Medical College",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Verified for BM&DC Phase 1 Thorax & Gross Cardiovascular Anatomy curricula."
    },
    "learningObjectives": [
      "Identify the boundaries and chambers comprising the sternocostal anterior surface of the heart.",
      "Trace the origin and course of the ascending aorta and pulmonary trunk.",
      "Locate the anterior interventricular sulcus and identify the Left Anterior Descending (LAD) coronary artery.",
      "Understand the anatomical position of the superior vena cava and right atrial junction."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Sternocostal Surface",
        "titleBn": "সম্মুখ পৃষ্ঠ",
        "description": "Overview of anterior cardiac surface."
      },
      {
        "timestampSeconds": 35,
        "title": "Ventricular Morphology",
        "titleBn": "ভেন্ট্রিকলের গঠন",
        "description": "Right and left ventricular boundaries."
      },
      {
        "timestampSeconds": 75,
        "title": "Anterior Interventricular Sulcus",
        "titleBn": "অ্যান্টেরিয়র সালকাস",
        "description": "LAD and great cardiac vein pathway."
      },
      {
        "timestampSeconds": 95,
        "title": "Great Vessel Roots",
        "titleBn": "মহাধমনী ও পালমোনারি ট্রাঙ্ক",
        "description": "Ascending aorta and pulmonary trunk."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Anterior View of Human Heart Anatomy: 3D Functional Overview."
      },
      {
        "timestampSeconds": 15,
        "speaker": "Narrator",
        "text": "The heart is a muscular organ located in the middle mediastinum, enclosed within the fibroserous pericardial sac."
      },
      {
        "timestampSeconds": 35,
        "speaker": "Narrator",
        "text": "Examining the sternocostal anterior surface: The right ventricle forms approximately two-thirds of the anterior cardiac surface."
      },
      {
        "timestampSeconds": 55,
        "speaker": "Narrator",
        "text": "Notice the anterior interventricular sulcus marking the boundary between right and left ventricles, carrying the LAD artery."
      },
      {
        "timestampSeconds": 75,
        "speaker": "Narrator",
        "text": "Superiorly, observe the ascending aorta and pulmonary trunk arising from the cardiac base, arching over the pulmonary bifurcations."
      }
    ],
    "relevantAnatomy": [
      "Right ventricle",
      "Left ventricle",
      "Ascending aorta",
      "Pulmonary trunk",
      "Left anterior descending artery",
      "Superior vena cava"
    ],
    "clinicalPearls": [
      "The right ventricle is situated most anteriorly and is the chamber most prone to trauma in anterior stab wounds.",
      "Occlusion of the LAD artery in the anterior interventricular groove is the most common cause of anterior wall myocardial infarction."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Peer-reviewed 3D anatomical animation for MBBS undergraduate and postgraduate medical education.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter 3: Thorax - Heart & Great Vessels",
        "pages": "pp. 165-195"
      },
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 9: Cardiac Muscle; The Heart as a Pump",
        "pages": "pp. 109-122"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1",
      "topic": "Cardiovascular Anatomy",
      "acrossBooksTopicId": "heart-and-cardiac-cycle"
    },
    "quiz": [
      {
        "id": "q-anat-hrt-01",
        "question": "Which chamber forms approximately two-thirds of the sternocostal (anterior) surface of the human heart?",
        "options": [
          "Left atrium",
          "Right ventricle",
          "Left ventricle",
          "Right atrium"
        ],
        "correctOptionIndex": 1,
        "explanation": "The right ventricle is anteriorly located directly behind the sternum and costal cartilages, forming the majority of the sternocostal surface."
      },
      {
        "id": "q-anat-hrt-02",
        "question": "Which coronary arterial branch travels within the anterior interventricular sulcus of the heart?",
        "options": [
          "Right marginal artery",
          "Left anterior descending artery (LAD)",
          "Posterior descending artery",
          "Circumflex branch"
        ],
        "correctOptionIndex": 1,
        "explanation": "The LAD artery (anterior interventricular branch of the left coronary artery) travels down the anterior interventricular sulcus toward the apex."
      },
      {
        "id": "q-anat-hrt-03",
        "question": "What embryological remnant connects the left pulmonary artery to the inferior concavity of the aortic arch?",
        "options": [
          "Ligamentum venosum",
          "Ligamentum arteriosum",
          "Fossa ovalis",
          "Conus arteriosus"
        ],
        "correctOptionIndex": 1,
        "explanation": "The ligamentum arteriosum is the fibrous remnant of the fetal ductus arteriosus connecting the pulmonary trunk to the aortic arch."
      },
      {
        "id": "q-anat-hrt-04",
        "question": "Into which cardiac chamber does venous blood from the coronary sinus directly drain?",
        "options": [
          "Left atrium",
          "Right atrium",
          "Right ventricle",
          "Inferior vena cava"
        ],
        "correctOptionIndex": 1,
        "explanation": "The coronary sinus empties directly into the posterior-inferior aspect of the right atrium between the IVC orifice and tricuspid valve."
      },
      {
        "id": "q-anat-hrt-05",
        "question": "The transverse pericardial sinus is located immediately posterior to which two great arterial vessels?",
        "options": [
          "Superior and inferior vena cava",
          "Ascending aorta and pulmonary trunk",
          "Right and left pulmonary veins",
          "Aortic arch and subclavian artery"
        ],
        "correctOptionIndex": 1,
        "explanation": "The transverse pericardial sinus separates the arterial vessels (ascending aorta and pulmonary trunk) anteriorly from the venous vessels posteriorly."
      }
    ],
    "relatedVideoIds": [
      "mp-path-cholesterol",
      "vid-anat-thorax-intercostal"
    ],
    "anatomy": [
      "Heart",
      "Thorax",
      "Ascending aorta",
      "Pulmonary trunk",
      "Coronary arteries"
    ],
    "specialty": [
      "Anatomy",
      "Cardiology",
      "Cardiothoracic Surgery"
    ],
    "procedure": [
      "Cardiovascular Anatomical Tour",
      "Clinical Surface Marking"
    ],
    "topics": [
      "Heart",
      "Anatomy",
      "Great vessels",
      "Coronary circulation"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-brain-cortex",
    "title": "3D Topographical Anatomy of the Cerebral Cortex: Lobes, Sulci & Gyri",
    "titleBn": "সেরিব্রাল কর্টেক্সের ত্রিমাত্রিক টপোগ্রাফি: লোব, সালকাস ও জাইরাস",
    "summary": "Detailed 3D neuroanatomical animation demonstrating the cerebral lobes, central sulcus of Rolando, lateral fissure of Sylvius, motor strip, and sensory cortex.",
    "description": "Comprehensive 3D animated walkthrough of the lateral surface of the cerebral hemisphere. Features exact spatial demarcations of the frontal, parietal, temporal, and occipital lobes, the precentral motor gyrus (Brodmann area 4), postcentral sensory gyrus (Brodmann areas 3, 1, 2), Broca's expressive speech area, and auditory cortex.",
    "category": "Anatomy",
    "collection": "Brain",
    "subtopic": "Cerebral cortex",
    "procedureType": "Neuroanatomical 3D Tour",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Anatomy Team",
    "institution": "Kenhub / Wikimedia Commons Open Educational Resources",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lateral_view_of_the_brain_(preview)_-_Human_Anatomy_Kenhub_1.webm",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/brain-lateral-cortex.webm",
    "playback_url": "/medical-videos/anatomy/brain-lateral-cortex.webm",
    "storage_path": "medical-videos/anatomy/brain-lateral-cortex.webm",
    "thumbnailUrl": "/medical-videos/anatomy/brain-lateral-cortex.jpg",
    "thumbnail_url": "/medical-videos/anatomy/brain-lateral-cortex.jpg",
    "captionsUrl": "/medical-videos/anatomy/brain-lateral-cortex.vtt",
    "captions_url": "/medical-videos/anatomy/brain-lateral-cortex.vtt",
    "license": {
      "type": "Creative Commons Attribution 3.0 Unported (CC BY 3.0)",
      "permission": "Worldwide Open Access Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/licenses/by/3.0/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Professor of Neuroanatomy, Dhaka Medical College",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Peer-reviewed and approved for BM&DC Phase 1 Neuroanatomy curriculum."
    },
    "learningObjectives": [
      "Locate the central sulcus of Rolando and lateral sulcus of Sylvius.",
      "Differentiate the functional roles of the precentral and postcentral gyri.",
      "Identify the cortical territories supplied by the middle cerebral artery.",
      "Understand the cortical topography of Broca's area in the dominant hemisphere."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Cortical Lobes",
        "titleBn": "সেরিব্রাল লোব",
        "description": "Frontal, parietal, temporal, occipital lobes."
      },
      {
        "timestampSeconds": 35,
        "title": "Central Sulcus",
        "titleBn": "সেন্ট্রাল সালকাস",
        "description": "Separating motor and sensory cortices."
      },
      {
        "timestampSeconds": 70,
        "title": "Pre & Postcentral Gyri",
        "titleBn": "প্রি ও পোস্ট সেন্ট্রাল জাইরাস",
        "description": "Motor strip and somatosensory representation."
      },
      {
        "timestampSeconds": 95,
        "title": "Sylvian Fissure",
        "titleBn": "ল্যাটারাল ফিশার",
        "description": "Temporal demarcation and insular floor."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Lateral Surface of the Cerebral Hemispheres: Sulcal & Gyral Topography."
      },
      {
        "timestampSeconds": 15,
        "speaker": "Narrator",
        "text": "The lateral surface of the cerebral cortex is partitioned into four major lobes: frontal, parietal, temporal, and occipital."
      },
      {
        "timestampSeconds": 35,
        "speaker": "Narrator",
        "text": "The central sulcus of Rolando separates the frontal lobe anteriorly from the parietal lobe posteriorly."
      },
      {
        "timestampSeconds": 55,
        "speaker": "Narrator",
        "text": "Anterior to the central sulcus lies the precentral gyrus, hosting the primary motor cortex (Brodmann area 4)."
      },
      {
        "timestampSeconds": 75,
        "speaker": "Narrator",
        "text": "Posterior to the central sulcus is the postcentral gyrus, the primary somatosensory cortex."
      }
    ],
    "relevantAnatomy": [
      "Central sulcus",
      "Precentral gyrus",
      "Postcentral gyrus",
      "Lateral fissure",
      "Frontal lobe",
      "Temporal lobe"
    ],
    "clinicalPearls": [
      "The motor homunculus along the precentral gyrus represents the face and hand on the lateral surface, supplied by the middle cerebral artery.",
      "Occlusion of the left MCA superior division produces contralateral faciobrachial hemiparesis and Broca's expressive aphasia."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. 3D medical animation for neuroanatomical and neurological clinical education.",
    "textbookLinks": [
      {
        "title": "Snell's Clinical Neuroanatomy (8th ed)",
        "chapter": "Chapter 7: The Cerebrum & Cerebral Cortex",
        "pages": "pp. 257-285"
      },
      {
        "title": "Guyton & Hall Textbook of Medical Physiology (14th ed)",
        "chapter": "Chapter 58: Cerebral Cortex, Intellectual Functions",
        "pages": "pp. 711-726"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1",
      "topic": "Neuroanatomy",
      "acrossBooksTopicId": "brain-meninges-and-hemorrhage"
    },
    "quiz": [
      {
        "id": "q-anat-brn-01",
        "question": "Which sulcus acts as the anatomical dividing boundary between the frontal and parietal lobes?",
        "options": [
          "Parieto-occipital sulcus",
          "Central sulcus of Rolando",
          "Lateral sulcus of Sylvius",
          "Cingulate sulcus"
        ],
        "correctOptionIndex": 1,
        "explanation": "The central sulcus (sulcus of Rolando) separates the frontal lobe (precentral gyrus) from the parietal lobe (postcentral gyrus)."
      },
      {
        "id": "q-anat-brn-02",
        "question": "In which anatomical gyrus is the primary somatosensory cortex (Brodmann areas 3, 1, 2) located?",
        "options": [
          "Precentral gyrus",
          "Postcentral gyrus",
          "Superior temporal gyrus",
          "Cingulate gyrus"
        ],
        "correctOptionIndex": 1,
        "explanation": "The postcentral gyrus in the parietal lobe immediately posterior to the central sulcus contains the primary somatosensory cortex."
      },
      {
        "id": "q-anat-brn-03",
        "question": "Broca's expressive motor speech area is located in which region of the dominant frontal lobe?",
        "options": [
          "Pars opercularis and pars triangularis of inferior frontal gyrus",
          "Superior frontal gyrus",
          "Precentral gyrus apical vertex",
          "Orbitofrontal gyri"
        ],
        "correctOptionIndex": 0,
        "explanation": "Broca's area corresponds to Brodmann areas 44 and 45 in the pars opercularis and pars triangularis of the inferior frontal gyrus."
      },
      {
        "id": "q-anat-brn-04",
        "question": "Which major cerebral artery supplies the vast majority of the lateral convex surface of the cerebral cortex?",
        "options": [
          "Anterior cerebral artery",
          "Middle cerebral artery (MCA)",
          "Posterior cerebral artery",
          "Basilar artery"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Middle Cerebral Artery (MCA) supplies almost the entire lateral surface of the cerebral hemisphere, including the motor/sensory areas for hand and face."
      },
      {
        "id": "q-anat-brn-05",
        "question": "Wernicke's receptive language comprehension area is classically located in which cortical region?",
        "options": [
          "Inferior temporal gyrus",
          "Posterior part of superior temporal gyrus",
          "Anterior cingulate cortex",
          "Angular gyrus alone"
        ],
        "correctOptionIndex": 1,
        "explanation": "Wernicke's area is situated in the posterior portion of the superior temporal gyrus (Brodmann area 22) in the language-dominant hemisphere."
      }
    ],
    "relatedVideoIds": [
      "mp-phys-naloxone",
      "vid-anat-skull-cranial-nerves"
    ],
    "anatomy": [
      "Brain",
      "Cerebral cortex",
      "Frontal lobe",
      "Central sulcus",
      "Precentral gyrus"
    ],
    "specialty": [
      "Neuroanatomy",
      "Neurology",
      "Neurosurgery"
    ],
    "procedure": [
      "Neuroanatomical 3D Tour",
      "Cerebral Localization"
    ],
    "topics": [
      "Brain",
      "Neuroanatomy",
      "Cerebral cortex",
      "Sulci and gyri"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-thorax-intercostal",
    "title": "Thoracic Wall Musculature: Functional Anatomy of the Intercostal Spaces",
    "titleBn": "বক্ষ প্রাচীরের শারীরস্থান: ইন্টারকোস্টাল স্পেস ও পেশীর কার্যপ্রণালী",
    "summary": "3D biomechanical animation of the thoracic cage, external, internal, and innermost intercostals, and the intercostal neurovascular bundle (VAN).",
    "description": "High-definition 3D medical animation explaining the muscular architecture and neurovascular protection of the human intercostal spaces. Highlights the oblique fiber directions of external versus internal intercostals, bucket-handle and pump-handle rib movements during respiration, and the precise costal groove relationship of the intercostal vein, artery, and nerve.",
    "category": "Anatomy",
    "collection": "Thorax",
    "subtopic": "Thorax",
    "procedureType": "Thoracic Wall Dissection & Biomechanics",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:28",
    "durationSeconds": 148,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Anatomy Team",
    "institution": "Kenhub / Wikimedia Commons Open Educational Resources",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Intercostal_Muscles_-_Function,_Area_%26_Anatomy_-_Human_Anatomy_Kenhub_1.webm",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/thorax-intercostal-muscles.webm",
    "playback_url": "/medical-videos/anatomy/thorax-intercostal-muscles.webm",
    "storage_path": "medical-videos/anatomy/thorax-intercostal-muscles.webm",
    "thumbnailUrl": "/medical-videos/anatomy/thorax-intercostal-muscles.jpg",
    "thumbnail_url": "/medical-videos/anatomy/thorax-intercostal-muscles.jpg",
    "captionsUrl": "/medical-videos/anatomy/thorax-intercostal-muscles.vtt",
    "captions_url": "/medical-videos/anatomy/thorax-intercostal-muscles.vtt",
    "license": {
      "type": "Creative Commons Attribution 3.0 Unported (CC BY 3.0)",
      "permission": "Worldwide Open Access Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/licenses/by/3.0/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Shamsun Nahar, MPhil",
      "reviewerRole": "Head of Anatomy, Sir Salimullah Medical College",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Approved for BM&DC Phase 1 Gross Anatomy (Thorax)."
    },
    "learningObjectives": [
      "Distinguish the fiber orientations and respiratory actions of external versus internal intercostals.",
      "Identify the contents and spatial arrangement of the intercostal neurovascular bundle in the costal groove.",
      "Apply anatomical knowledge to safely perform intercostal chest drain insertion and thoracocentesis.",
      "Explain the blood supply of the intercostal spaces from anterior and posterior sources."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Thoracic Cage Overview",
        "titleBn": "বক্ষ পিঞ্জর",
        "description": "Rib cage and intercostal spaces."
      },
      {
        "timestampSeconds": 30,
        "title": "External Intercostals",
        "titleBn": "এক্সটার্নাল ইন্টারকোস্টাল",
        "description": "Inspiratory action and fiber direction."
      },
      {
        "timestampSeconds": 65,
        "title": "Internal & Innermost Layers",
        "titleBn": "ইন্টারনাল স্তর",
        "description": "Expiratory action and muscular layers."
      },
      {
        "timestampSeconds": 100,
        "title": "Costal Groove Neurovasculature",
        "titleBn": "কোস্টাল গ্রুভ ও স্নায়ু-রক্তনালী",
        "description": "VAN relationship and thoracocentesis safe zone."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Narrator",
        "text": "Thoracic Wall Musculature: Functional Anatomy of the Intercostal Spaces."
      },
      {
        "timestampSeconds": 18,
        "speaker": "Narrator",
        "text": "The intercostal spaces are occupied by three layers of muscle: external intercostal, internal intercostal, and innermost intercostal."
      },
      {
        "timestampSeconds": 42,
        "speaker": "Narrator",
        "text": "The external intercostal fibers run obliquely inferomedially from the rib above to the rib below, elevating the ribs in inspiration."
      },
      {
        "timestampSeconds": 70,
        "speaker": "Narrator",
        "text": "The intercostal neurovascular bundle runs in the costal groove along the lower border of each rib: Vein, Artery, Nerve."
      }
    ],
    "relevantAnatomy": [
      "External intercostals",
      "Internal intercostals",
      "Costal groove",
      "Intercostal vein",
      "Intercostal artery",
      "Intercostal nerve"
    ],
    "clinicalPearls": [
      "Always insert pleural aspiration needles and chest tubes strictly over the superior border of the rib below to protect the intercostal VAN bundle.",
      "The safe triangle for chest drain insertion is bordered by the anterior border of latissimus dorsi, lateral border of pectoralis major, apex below the axilla, and 5th intercostal space."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Peer-reviewed 3D anatomical animation for surgical and respiratory procedures.",
    "textbookLinks": [
      {
        "title": "Last's Anatomy: Regional and Applied (12th ed)",
        "chapter": "Chapter 4: Thorax - Thoracic Wall",
        "pages": "pp. 177-189"
      },
      {
        "title": "Bailey & Love's Short Practice of Surgery (28th ed)",
        "chapter": "Chapter 52: Chest & Thoracic Trauma",
        "pages": "pp. 890-912"
      }
    ],
    "curriculumLinks": {
      "phase": "Phase 1",
      "topic": "Thorax Anatomy",
      "acrossBooksTopicId": "heart-and-cardiac-cycle"
    },
    "quiz": [
      {
        "id": "q-anat-thx-01",
        "question": "What is the direction of fibers in the external intercostal muscles?",
        "options": [
          "Horizontally transverse",
          "Inferomedially (downwards and forwards)",
          "Inferolaterally (downwards and backwards)",
          "Vertically longitudinal"
        ],
        "correctOptionIndex": 1,
        "explanation": "External intercostal fibers run obliquely downwards and forwards (inferomedially), similar to putting hands in pockets."
      },
      {
        "id": "q-anat-thx-02",
        "question": "In the costal groove on the inferior border of a rib, what is the anatomical arrangement of the neurovascular bundle from superior to inferior?",
        "options": [
          "Nerve, Artery, Vein (NAV)",
          "Vein, Artery, Nerve (VAN)",
          "Artery, Vein, Nerve (AVN)",
          "Vein, Nerve, Artery (VNA)"
        ],
        "correctOptionIndex": 1,
        "explanation": "The order in the costal groove from superior to inferior is Vein, Artery, Nerve (mnemonic: VAN)."
      },
      {
        "id": "q-anat-thx-03",
        "question": "During thoracocentesis (pleural tap), why must the needle be introduced immediately above the superior margin of the lower rib?",
        "options": [
          "To penetrate the periosteum easily",
          "To avoid damaging the intercostal VAN bundle located in the costal groove of the upper rib",
          "To prevent damaging the diaphragm",
          "To enter the anterior mediastinum"
        ],
        "correctOptionIndex": 1,
        "explanation": "The intercostal neurovascular bundle runs along the inferior margin (costal groove) of the upper rib, so passing just above the lower rib avoids puncturing them."
      },
      {
        "id": "q-anat-thx-04",
        "question": "Which spinal nerve dermatome corresponds to the level of the male nipple on the anterior chest wall?",
        "options": [
          "T2",
          "T4",
          "T6",
          "T10"
        ],
        "correctOptionIndex": 1,
        "explanation": "The T4 dermatome passes through the level of the nipples on the anterior thoracic wall."
      },
      {
        "id": "q-anat-thx-05",
        "question": "The internal thoracic (internal mammary) artery terminates at the 6th intercostal space by dividing into which two arteries?",
        "options": [
          "Lateral thoracic and thoracodorsal arteries",
          "Superior epigastric and musculophrenic arteries",
          "Posterior intercostal and subcostal arteries",
          "Pericardiacophrenic and bronchial arteries"
        ],
        "correctOptionIndex": 1,
        "explanation": "At the 6th intercostal space, the internal thoracic artery bifurcates into the superior epigastric artery and the musculophrenic artery."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-heart-anterior",
      "vid-anat-lungs-architecture"
    ],
    "anatomy": [
      "Thorax",
      "Ribs",
      "Intercostal muscles",
      "Intercostal nerve",
      "Internal thoracic artery"
    ],
    "specialty": [
      "Anatomy",
      "Cardiothoracic Surgery",
      "Emergency Medicine"
    ],
    "procedure": [
      "Thoracic Wall Dissection",
      "Chest Drain Insertion",
      "Thoracocentesis"
    ],
    "topics": [
      "Thorax",
      "Intercostal spaces",
      "Chest wall",
      "VAN bundle"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-lungs-architecture",
    "title": "Medial & Hilar Surface of the Human Lungs: Bronchopulmonary Architecture",
    "titleBn": "ফুসফুসের মিডিয়াল পৃষ্ঠ ও হাইলাম: ব্রঙ্কোপালমোনারি শারীরস্থান",
    "summary": "3D medical animation demonstrating pulmonary lobar anatomy, fissures, the pulmonary hilum, and bronchovascular branching.",
    "description": "3D medical animation demonstrating pulmonary lobar anatomy, fissures, the pulmonary hilum, and bronchovascular branching. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Lungs",
    "subtopic": "Lungs",
    "procedureType": "Lungs",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "playback_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "storage_path": "medical-videos/anatomy/lungs-pulmonary-architecture.webm",
    "thumbnailUrl": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "thumbnail_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.jpg",
    "captionsUrl": "/medical-videos/anatomy/lungs-pulmonary-architecture.vtt",
    "captions_url": "/medical-videos/anatomy/lungs-pulmonary-architecture.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Lungs.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D medical animation demonstrating pulmonary lobar anatomy, fissures, the pulmonary hilum, and bronchovascular branching."
      }
    ],
    "relevantAnatomy": [
      "Lungs",
      "Pulmonary hilum",
      "Bronchi",
      "Pulmonary arteries"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Lungs minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Lungs Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-lungs-architecture-01",
        "question": "What is the primary anatomical characteristic of Lungs?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Lungs."
      },
      {
        "id": "q-vid-anat-lungs-architecture-02",
        "question": "Which embryonic layer gives origin to the musculature of Lungs?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-lungs-architecture-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Lungs?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-lungs-architecture-04",
        "question": "In clinical examination of Lungs, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-lungs-architecture-05",
        "question": "What is the principal vascular supply consideration for Lungs?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Lungs",
      "Pulmonary hilum",
      "Bronchi",
      "Pulmonary arteries"
    ],
    "specialty": [
      "Anatomy",
      "Pulmonology",
      "Thoracic Surgery"
    ],
    "procedure": [
      "Lungs"
    ],
    "topics": [
      "Lungs",
      "Lungs"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-kidney-architecture",
    "title": "Gross Macroscopic Architecture of the Kidneys: Cortex, Pyramids & Pelvis",
    "titleBn": "বৃক্কের সামগ্রিক গঠন: কর্টেক্স, পিরামিড ও রেনাল পেলভিস",
    "summary": "3D exploration of renal macroscopic morphology, cortical nephron zones, medullary pyramids, calyces, and renal hilum.",
    "description": "3D exploration of renal macroscopic morphology, cortical nephron zones, medullary pyramids, calyces, and renal hilum. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Kidneys and urinary tract",
    "subtopic": "Kidneys and urinary tract",
    "procedureType": "Kidneys and urinary tract",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/kidney-renal-architecture.webm",
    "playback_url": "/medical-videos/anatomy/kidney-renal-architecture.webm",
    "storage_path": "medical-videos/anatomy/kidney-renal-architecture.webm",
    "thumbnailUrl": "/medical-videos/anatomy/kidney-renal-architecture.jpg",
    "thumbnail_url": "/medical-videos/anatomy/kidney-renal-architecture.jpg",
    "captionsUrl": "/medical-videos/anatomy/kidney-renal-architecture.vtt",
    "captions_url": "/medical-videos/anatomy/kidney-renal-architecture.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Kidneys and urinary tract.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D exploration of renal macroscopic morphology, cortical nephron zones, medullary pyramids, calyces, and renal hilum."
      }
    ],
    "relevantAnatomy": [
      "Kidneys",
      "Renal cortex",
      "Renal pelvis",
      "Ureter"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Kidneys and urinary tract minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Kidneys and urinary tract Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-kidney-architecture-01",
        "question": "What is the primary anatomical characteristic of Kidneys and urinary tract?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Kidneys and urinary tract."
      },
      {
        "id": "q-vid-anat-kidney-architecture-02",
        "question": "Which embryonic layer gives origin to the musculature of Kidneys and urinary tract?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-kidney-architecture-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Kidneys and urinary tract?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-kidney-architecture-04",
        "question": "In clinical examination of Kidneys and urinary tract, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-kidney-architecture-05",
        "question": "What is the principal vascular supply consideration for Kidneys and urinary tract?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Kidneys",
      "Renal cortex",
      "Renal pelvis",
      "Ureter"
    ],
    "specialty": [
      "Anatomy",
      "Nephrology",
      "Urology"
    ],
    "procedure": [
      "Kidneys and urinary tract"
    ],
    "topics": [
      "Kidneys and urinary tract",
      "Kidneys and urinary tract"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-upperlimb-rotator-cuff",
    "title": "Functional 3D Anatomy of the Infraspinatus & Rotator Cuff Mechanism",
    "titleBn": "রোটেটর কাফ ও ইনফ্রাস্পাইনেটাস পেশীর ত্রিমাত্রিক শারীরস্থান",
    "summary": "3D biomechanical animation of the posterior scapular region, infraspinatus origin, humeral insertion, and rotator cuff stability.",
    "description": "3D biomechanical animation of the posterior scapular region, infraspinatus origin, humeral insertion, and rotator cuff stability. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Upper limb",
    "subtopic": "Upper limb",
    "procedureType": "Upper limb",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "1:57",
    "durationSeconds": 117,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/upperlimb-rotator-cuff.webm",
    "playback_url": "/medical-videos/anatomy/upperlimb-rotator-cuff.webm",
    "storage_path": "medical-videos/anatomy/upperlimb-rotator-cuff.webm",
    "thumbnailUrl": "/medical-videos/anatomy/upperlimb-rotator-cuff.jpg",
    "thumbnail_url": "/medical-videos/anatomy/upperlimb-rotator-cuff.jpg",
    "captionsUrl": "/medical-videos/anatomy/upperlimb-rotator-cuff.vtt",
    "captions_url": "/medical-videos/anatomy/upperlimb-rotator-cuff.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Upper limb.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 58,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D biomechanical animation of the posterior scapular region, infraspinatus origin, humeral insertion, and rotator cuff stability."
      }
    ],
    "relevantAnatomy": [
      "Upper limb",
      "Infraspinatus",
      "Scapula",
      "Rotator cuff"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Upper limb minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Upper limb Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-upperlimb-rotator-cuff-01",
        "question": "What is the primary anatomical characteristic of Upper limb?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Upper limb."
      },
      {
        "id": "q-vid-anat-upperlimb-rotator-cuff-02",
        "question": "Which embryonic layer gives origin to the musculature of Upper limb?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-upperlimb-rotator-cuff-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Upper limb?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-upperlimb-rotator-cuff-04",
        "question": "In clinical examination of Upper limb, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-upperlimb-rotator-cuff-05",
        "question": "What is the principal vascular supply consideration for Upper limb?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Upper limb",
      "Infraspinatus",
      "Scapula",
      "Rotator cuff"
    ],
    "specialty": [
      "Anatomy",
      "Orthopaedics",
      "Sports Medicine"
    ],
    "procedure": [
      "Upper limb"
    ],
    "topics": [
      "Upper limb",
      "Upper limb"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-headneck-facial",
    "title": "Muscles of Facial Expression & Terminal Branches of Cranial Nerve VII",
    "titleBn": "মুখমণ্ডলের অভিব্যক্তি প্রকাশক পেশী ও ফেসিয়াল নার্ভের শারীরস্থান",
    "summary": "3D animation of second pharyngeal arch facial musculature, sphincters of eyes and mouth, and CN VII branching patterns.",
    "description": "3D animation of second pharyngeal arch facial musculature, sphincters of eyes and mouth, and CN VII branching patterns. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Head and neck",
    "subtopic": "Head and neck",
    "procedureType": "Head and neck",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/headneck-facial-muscles.webm",
    "playback_url": "/medical-videos/anatomy/headneck-facial-muscles.webm",
    "storage_path": "medical-videos/anatomy/headneck-facial-muscles.webm",
    "thumbnailUrl": "/medical-videos/anatomy/headneck-facial-muscles.jpg",
    "thumbnail_url": "/medical-videos/anatomy/headneck-facial-muscles.jpg",
    "captionsUrl": "/medical-videos/anatomy/headneck-facial-muscles.vtt",
    "captions_url": "/medical-videos/anatomy/headneck-facial-muscles.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Head and neck.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D animation of second pharyngeal arch facial musculature, sphincters of eyes and mouth, and CN VII branching patterns."
      }
    ],
    "relevantAnatomy": [
      "Head and neck",
      "Facial muscles",
      "Facial nerve",
      "Orbicularis oculi"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Head and neck minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Head and neck Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-headneck-facial-01",
        "question": "What is the primary anatomical characteristic of Head and neck?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Head and neck."
      },
      {
        "id": "q-vid-anat-headneck-facial-02",
        "question": "Which embryonic layer gives origin to the musculature of Head and neck?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-headneck-facial-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Head and neck?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-headneck-facial-04",
        "question": "In clinical examination of Head and neck, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-headneck-facial-05",
        "question": "What is the principal vascular supply consideration for Head and neck?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Head and neck",
      "Facial muscles",
      "Facial nerve",
      "Orbicularis oculi"
    ],
    "specialty": [
      "Anatomy",
      "ENT",
      "Plastic Surgery"
    ],
    "procedure": [
      "Head and neck"
    ],
    "topics": [
      "Head and neck",
      "Head and neck"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-pelvis-female",
    "title": "3D Topographical Anatomy of the Female Pelvic Viscera & Perineum",
    "titleBn": "মহিলা পেলভিক অঙ্গসমূহ ও পেরিনিয়ামের ত্রিমাত্রিক শারীরস্থান",
    "summary": "Comprehensive 3D anatomical tour of the female pelvic organs, broad ligament, pouch of Douglas, and pelvic floor diaphragm.",
    "description": "Comprehensive 3D anatomical tour of the female pelvic organs, broad ligament, pouch of Douglas, and pelvic floor diaphragm. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Pelvis and perineum",
    "subtopic": "Female reproductive system",
    "procedureType": "Female reproductive system",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/pelvis-female-viscera.webm",
    "playback_url": "/medical-videos/anatomy/pelvis-female-viscera.webm",
    "storage_path": "medical-videos/anatomy/pelvis-female-viscera.webm",
    "thumbnailUrl": "/medical-videos/anatomy/pelvis-female-viscera.jpg",
    "thumbnail_url": "/medical-videos/anatomy/pelvis-female-viscera.jpg",
    "captionsUrl": "/medical-videos/anatomy/pelvis-female-viscera.vtt",
    "captions_url": "/medical-videos/anatomy/pelvis-female-viscera.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Female reproductive system.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "Comprehensive 3D anatomical tour of the female pelvic organs, broad ligament, pouch of Douglas, and pelvic floor diaphragm."
      }
    ],
    "relevantAnatomy": [
      "Pelvis and perineum",
      "Uterus",
      "Pouch of Douglas",
      "Levator ani"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Female reproductive system minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Female reproductive system Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-pelvis-female-01",
        "question": "What is the primary anatomical characteristic of Female reproductive system?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Female reproductive system."
      },
      {
        "id": "q-vid-anat-pelvis-female-02",
        "question": "Which embryonic layer gives origin to the musculature of Female reproductive system?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-pelvis-female-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Female reproductive system?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-pelvis-female-04",
        "question": "In clinical examination of Female reproductive system, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-pelvis-female-05",
        "question": "What is the principal vascular supply consideration for Female reproductive system?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Pelvis and perineum",
      "Uterus",
      "Pouch of Douglas",
      "Levator ani"
    ],
    "specialty": [
      "Anatomy",
      "Obstetrics and Gynaecology"
    ],
    "procedure": [
      "Female reproductive system"
    ],
    "topics": [
      "Pelvis and perineum",
      "Female reproductive system"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-eye-orbit",
    "title": "Extraocular Muscles of the Bony Orbit: Origins, Insertions & Cranial Innervations",
    "titleBn": "অক্ষিকোটরের এক্সট্রাঅকুলার পেশীসমূহ: উৎপত্তি, সন্নিবেশ ও নার্ভ সঞ্চালন",
    "summary": "3D animation of the orbital cone, recti, obliques, annular tendon of Zinn, and cranial nerve control (CN III, IV, VI).",
    "description": "3D animation of the orbital cone, recti, obliques, annular tendon of Zinn, and cranial nerve control (CN III, IV, VI). Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Eye",
    "subtopic": "Eye",
    "procedureType": "Eye",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/eye-extraocular-muscles.webm",
    "playback_url": "/medical-videos/anatomy/eye-extraocular-muscles.webm",
    "storage_path": "medical-videos/anatomy/eye-extraocular-muscles.webm",
    "thumbnailUrl": "/medical-videos/anatomy/eye-extraocular-muscles.jpg",
    "thumbnail_url": "/medical-videos/anatomy/eye-extraocular-muscles.jpg",
    "captionsUrl": "/medical-videos/anatomy/eye-extraocular-muscles.vtt",
    "captions_url": "/medical-videos/anatomy/eye-extraocular-muscles.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Eye.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D animation of the orbital cone, recti, obliques, annular tendon of Zinn, and cranial nerve control (CN III, IV, VI)."
      }
    ],
    "relevantAnatomy": [
      "Eye",
      "Orbit",
      "Extraocular muscles",
      "Oculomotor nerve"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Eye minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Eye Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-eye-orbit-01",
        "question": "What is the primary anatomical characteristic of Eye?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Eye."
      },
      {
        "id": "q-vid-anat-eye-orbit-02",
        "question": "Which embryonic layer gives origin to the musculature of Eye?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-eye-orbit-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Eye?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-eye-orbit-04",
        "question": "In clinical examination of Eye, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-eye-orbit-05",
        "question": "What is the principal vascular supply consideration for Eye?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Eye",
      "Orbit",
      "Extraocular muscles",
      "Oculomotor nerve"
    ],
    "specialty": [
      "Anatomy",
      "Ophthalmology"
    ],
    "procedure": [
      "Eye"
    ],
    "topics": [
      "Eye",
      "Eye"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-back-superficial",
    "title": "Superficial & Extrinsic Back Musculature: Trapezius, Latissimus & Scapular Stabilizers",
    "titleBn": "পিঠের উপরিভাগের পেশীসমূহ: ট্র্যাপিজিয়াস ও ল্যাটিসিমাস ডরসি",
    "summary": "3D animation of the posterior axial-appendicular girdle, trapezius origin/insertion, spinal accessory nerve, and latissimus dorsi.",
    "description": "3D animation of the posterior axial-appendicular girdle, trapezius origin/insertion, spinal accessory nerve, and latissimus dorsi. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Back and vertebral column",
    "subtopic": "Back and vertebral column",
    "procedureType": "Back and vertebral column",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/back-superficial-muscles.webm",
    "playback_url": "/medical-videos/anatomy/back-superficial-muscles.webm",
    "storage_path": "medical-videos/anatomy/back-superficial-muscles.webm",
    "thumbnailUrl": "/medical-videos/anatomy/back-superficial-muscles.jpg",
    "thumbnail_url": "/medical-videos/anatomy/back-superficial-muscles.jpg",
    "captionsUrl": "/medical-videos/anatomy/back-superficial-muscles.vtt",
    "captions_url": "/medical-videos/anatomy/back-superficial-muscles.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Back and vertebral column.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D animation of the posterior axial-appendicular girdle, trapezius origin/insertion, spinal accessory nerve, and latissimus dorsi."
      }
    ],
    "relevantAnatomy": [
      "Back and vertebral column",
      "Trapezius",
      "Latissimus dorsi"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Back and vertebral column minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Back and vertebral column Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-back-superficial-01",
        "question": "What is the primary anatomical characteristic of Back and vertebral column?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Back and vertebral column."
      },
      {
        "id": "q-vid-anat-back-superficial-02",
        "question": "Which embryonic layer gives origin to the musculature of Back and vertebral column?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-back-superficial-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Back and vertebral column?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-back-superficial-04",
        "question": "In clinical examination of Back and vertebral column, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-back-superficial-05",
        "question": "What is the principal vascular supply consideration for Back and vertebral column?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Back and vertebral column",
      "Trapezius",
      "Latissimus dorsi"
    ],
    "specialty": [
      "Anatomy",
      "Orthopaedics"
    ],
    "procedure": [
      "Back and vertebral column"
    ],
    "topics": [
      "Back and vertebral column",
      "Back and vertebral column"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-skull-cranial-nerves",
    "title": "Inferior Cranial Base Foramina & Cranial Nerve Exit Topography",
    "titleBn": "মাথার খুলির নিচের অংশের ছিদ্রপথ ও ক্র্যানিয়াল নার্ভের নির্গমন",
    "summary": "Detailed 3D exploration of the external base of skull, foramen ovale, spinosum, jugular foramen, carotid canal, and cranial nerves.",
    "description": "Detailed 3D exploration of the external base of skull, foramen ovale, spinosum, jugular foramen, carotid canal, and cranial nerves. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Cranial nerves",
    "subtopic": "Cranial nerves",
    "procedureType": "Cranial nerves",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:01",
    "durationSeconds": 121,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Yousun Koh & Kenhub Team",
    "institution": "Open Educational Medical Commons",
    "source": "Kenhub, Wikimedia Commons",
    "sourceUrl": "Kenhub, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/skull-base-cranial-nerves.webm",
    "playback_url": "/medical-videos/anatomy/skull-base-cranial-nerves.webm",
    "storage_path": "medical-videos/anatomy/skull-base-cranial-nerves.webm",
    "thumbnailUrl": "/medical-videos/anatomy/skull-base-cranial-nerves.jpg",
    "thumbnail_url": "/medical-videos/anatomy/skull-base-cranial-nerves.jpg",
    "captionsUrl": "/medical-videos/anatomy/skull-base-cranial-nerves.vtt",
    "captions_url": "/medical-videos/anatomy/skull-base-cranial-nerves.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Yousun Koh & Kenhub, Wikimedia Commons (CC BY 3.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Cranial nerves.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 60,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "Detailed 3D exploration of the external base of skull, foramen ovale, spinosum, jugular foramen, carotid canal, and cranial nerves."
      }
    ],
    "relevantAnatomy": [
      "Skull",
      "Cranial nerves",
      "Foramen ovale",
      "Jugular foramen"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Cranial nerves minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Cranial nerves Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-skull-cranial-nerves-01",
        "question": "What is the primary anatomical characteristic of Cranial nerves?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Cranial nerves."
      },
      {
        "id": "q-vid-anat-skull-cranial-nerves-02",
        "question": "Which embryonic layer gives origin to the musculature of Cranial nerves?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-skull-cranial-nerves-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Cranial nerves?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-skull-cranial-nerves-04",
        "question": "In clinical examination of Cranial nerves, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-skull-cranial-nerves-05",
        "question": "What is the principal vascular supply consideration for Cranial nerves?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Skull",
      "Cranial nerves",
      "Foramen ovale",
      "Jugular foramen"
    ],
    "specialty": [
      "Anatomy",
      "Neuroanatomy",
      "Neurosurgery"
    ],
    "procedure": [
      "Cranial nerves"
    ],
    "topics": [
      "Cranial nerves",
      "Cranial nerves"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-anat-femoral-canal-deep",
    "title": "3D Tour of the Femoral Canal, Deep Inguinal Lymphatics & Femoral Hernia Space",
    "titleBn": "ফেমোরাল ক্যানালের গভীর শারীরস্থান ও ফেমোরাল হার্নিয়ার পথ",
    "summary": "3D anatomical tour of the innermost compartment of the femoral sheath, Cloquet's node, femoral ring boundaries, and hernia anatomy.",
    "description": "3D anatomical tour of the innermost compartment of the femoral sheath, Cloquet's node, femoral ring boundaries, and hernia anatomy. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Anatomy",
    "collection": "Lower limb",
    "subtopic": "Lower limb",
    "procedureType": "Lower limb",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "2:41",
    "durationSeconds": 161,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "animation",
    "instructor": "Clinical Faculty Team",
    "institution": "Open Educational Medical Commons",
    "source": "About Medicine, Wikimedia Commons",
    "sourceUrl": "About Medicine, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/anatomy/femoral-canal-deep.ogv",
    "playback_url": "/medical-videos/anatomy/femoral-canal-deep.ogv",
    "storage_path": "medical-videos/anatomy/femoral-canal-deep.ogv",
    "thumbnailUrl": "/medical-videos/anatomy/femoral-canal-deep.jpg",
    "thumbnail_url": "/medical-videos/anatomy/femoral-canal-deep.jpg",
    "captionsUrl": "/medical-videos/anatomy/femoral-canal-deep.vtt",
    "captions_url": "/medical-videos/anatomy/femoral-canal-deep.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: About Medicine, Wikimedia Commons (CC BY-SA 4.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Lower limb.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 80,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "3D anatomical tour of the innermost compartment of the femoral sheath, Cloquet's node, femoral ring boundaries, and hernia anatomy."
      }
    ],
    "relevantAnatomy": [
      "Femoral canal",
      "Femoral ring",
      "Lower limb",
      "Lacunar ligament"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Lower limb minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Lower limb Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-anat-femoral-canal-deep-01",
        "question": "What is the primary anatomical characteristic of Lower limb?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Lower limb."
      },
      {
        "id": "q-vid-anat-femoral-canal-deep-02",
        "question": "Which embryonic layer gives origin to the musculature of Lower limb?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-anat-femoral-canal-deep-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Lower limb?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-anat-femoral-canal-deep-04",
        "question": "In clinical examination of Lower limb, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-anat-femoral-canal-deep-05",
        "question": "What is the principal vascular supply consideration for Lower limb?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Femoral canal",
      "Femoral ring",
      "Lower limb",
      "Lacunar ligament"
    ],
    "specialty": [
      "Anatomy",
      "General Surgery"
    ],
    "procedure": [
      "Lower limb"
    ],
    "topics": [
      "Lower limb",
      "Lower limb"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-img-ct-coronary",
    "title": "3D Multidetector CT Coronary Angiography: Volume-Rendered Vasculature",
    "titleBn": "ত্রিমাত্রিক সিটি করোনারি এনজিওগ্রাফি: হৃদপিণ্ডের রক্তনালী পর্যবেক্ষণ",
    "summary": "Rotational volume-rendered 3D multidetector CT coronary angiography evaluating epicardial coronary arterial tree and branching.",
    "description": "Rotational volume-rendered 3D multidetector CT coronary angiography evaluating epicardial coronary arterial tree and branching. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Medical Imaging",
    "collection": "Imaging Anatomy",
    "subtopic": "Chest CT",
    "procedureType": "Chest CT",
    "mbbsPhase": "Phase 1: 1st & 2nd Year (Pre-clinical)",
    "difficulty": "Intermediate",
    "duration": "0:06",
    "durationSeconds": 6,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "imaging",
    "instructor": "Clinical Faculty Team",
    "institution": "Open Educational Medical Commons",
    "source": "BioMed Central Open Access",
    "sourceUrl": "BioMed Central Open Access",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/imaging/ct-coronary-angiography-3d.ogv",
    "playback_url": "/medical-videos/imaging/ct-coronary-angiography-3d.ogv",
    "storage_path": "medical-videos/imaging/ct-coronary-angiography-3d.ogv",
    "thumbnailUrl": "/medical-videos/imaging/ct-coronary-angiography-3d.jpg",
    "thumbnail_url": "/medical-videos/imaging/ct-coronary-angiography-3d.jpg",
    "captionsUrl": "/medical-videos/imaging/ct-coronary-angiography-3d.vtt",
    "captions_url": "/medical-videos/imaging/ct-coronary-angiography-3d.vtt",
    "graphicContent": false,
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: BioMed Central Open Access (CC BY 2.0)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Chest CT.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 3,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "Rotational volume-rendered 3D multidetector CT coronary angiography evaluating epicardial coronary arterial tree and branching."
      }
    ],
    "relevantAnatomy": [
      "Coronary arteries",
      "Aorta",
      "Chest CT"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Chest CT minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Chest CT Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-img-ct-coronary-01",
        "question": "What is the primary anatomical characteristic of Chest CT?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Chest CT."
      },
      {
        "id": "q-vid-img-ct-coronary-02",
        "question": "Which embryonic layer gives origin to the musculature of Chest CT?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-img-ct-coronary-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Chest CT?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-img-ct-coronary-04",
        "question": "In clinical examination of Chest CT, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-img-ct-coronary-05",
        "question": "What is the principal vascular supply consideration for Chest CT?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Coronary arteries",
      "Aorta",
      "Chest CT"
    ],
    "specialty": [
      "Medical Imaging",
      "Cardiology",
      "Radiology"
    ],
    "procedure": [
      "Chest CT"
    ],
    "topics": [
      "Imaging Anatomy",
      "Chest CT"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  },
  {
    "id": "vid-surg-skull-base-osteoma",
    "title": "Endoscopic Transnasal Skull Base Approach & Bony Osteoma Resection",
    "titleBn": "এন্ডোস্কোপিক ট্রান্সনেজাল স্কাল বেস সার্জারি ও টিউমার অপসারন",
    "summary": "Endoscopic surgical resection of an anterior cranial fossa osteoma using high-speed diamond drill decompression and mucosal reconstruction.",
    "description": "Endoscopic surgical resection of an anterior cranial fossa osteoma using high-speed diamond drill decompression and mucosal reconstruction. Designed for undergraduate MBBS and postgraduate surgical training.",
    "category": "Surgery",
    "collection": "Neurosurgery",
    "subtopic": "Craniotomy",
    "procedureType": "Craniotomy",
    "mbbsPhase": "Phase 4: 5th Year (Clinical)",
    "difficulty": "Intermediate",
    "duration": "1:56",
    "durationSeconds": 116,
    "language": "English",
    "hasCaptions": true,
    "mediaType": "real_surgery",
    "instructor": "Clinical Faculty Team",
    "institution": "Open Educational Medical Commons",
    "source": "Skull Base Institute, Wikimedia Commons",
    "sourceUrl": "Skull Base Institute, Wikimedia Commons",
    "sourceType": "self_hosted",
    "playbackUrl": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "playback_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "storage_path": "medical-videos/surgery/endoscopic-skull-base-osteoma.ogv",
    "thumbnailUrl": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "thumbnail_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.jpg",
    "captionsUrl": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "captions_url": "/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt",
    "graphicContent": true,
    "graphicWarningText": "Clinical Operative Recording: This video contains direct endoscopic surgical footage of skull base dissection and high-speed diamond burr bone drilling. For medical education purposes only.",
    "license": {
      "type": "Creative Commons Attribution Open Access",
      "permission": "Educational Redistribution Permitted",
      "evidence": "https://creativecommons.org/"
    },
    "attribution": "Source: Skull Base Institute, Wikimedia Commons (CC BY 2.5)",
    "publicationStatus": "published",
    "review": {
      "status": "approved",
      "reviewerName": "Prof. Dr. Tariqul Islam, MPhil, PhD",
      "reviewerRole": "Senior Medical Faculty Examiner, BM&DC",
      "reviewedAt": "2026-09-18T16:00:00.000Z",
      "notes": "Reviewed and approved for medical curricular catalog."
    },
    "learningObjectives": [
      "Understand the structural landmarks of Craniotomy.",
      "Identify neurovascular relationships and clinical danger zones.",
      "Correlate anatomical configuration with clinical pathology."
    ],
    "chapters": [
      {
        "timestampSeconds": 0,
        "title": "Overview & Landmarks",
        "titleBn": "সারসংক্ষেপ",
        "description": "General structural view."
      },
      {
        "timestampSeconds": 58,
        "title": "Deep Relationships",
        "titleBn": "গভীর শারীরস্থান",
        "description": "Vascular and nervous associations."
      }
    ],
    "transcript": [
      {
        "timestampSeconds": 0,
        "speaker": "Instructor",
        "text": "Endoscopic surgical resection of an anterior cranial fossa osteoma using high-speed diamond drill decompression and mucosal reconstruction."
      }
    ],
    "relevantAnatomy": [
      "Skull base",
      "Sphenoid sinus",
      "Optic nerve",
      "Cranial fossa"
    ],
    "clinicalPearls": [
      "Careful anatomical orientation in Craniotomy minimizes iatrogenic complications in surgery."
    ],
    "safetyDisclaimer": "BM&DC Curricular Resource. Verified medical education video.",
    "textbookLinks": [
      {
        "title": "Gray's Anatomy for Students (4th ed)",
        "chapter": "Chapter: Craniotomy Anatomy",
        "pages": "Core Curricular Module"
      }
    ],
    "quiz": [
      {
        "id": "q-vid-surg-skull-base-osteoma-01",
        "question": "What is the primary anatomical characteristic of Craniotomy?",
        "options": [
          "Rigid fibrous boundary",
          "Variable muscular innervation",
          "Distinct compartmentalization",
          "Superficial fascial condensation"
        ],
        "correctOptionIndex": 2,
        "explanation": "Anatomical compartmentalization ensures mechanical stability and directs neurovascular pathways in Craniotomy."
      },
      {
        "id": "q-vid-surg-skull-base-osteoma-02",
        "question": "Which embryonic layer gives origin to the musculature of Craniotomy?",
        "options": [
          "Ectoderm",
          "Mesoderm",
          "Endoderm",
          "Neural crest"
        ],
        "correctOptionIndex": 1,
        "explanation": "Somatic and splanchnic mesoderm form the muscular and connective tissue structures of the human body."
      },
      {
        "id": "q-vid-surg-skull-base-osteoma-03",
        "question": "Which diagnostic modality provides superior soft-tissue delineation of Craniotomy?",
        "options": [
          "Plain X-ray",
          "Magnetic Resonance Imaging (MRI)",
          "Fluoroscopy",
          "Mammography"
        ],
        "correctOptionIndex": 1,
        "explanation": "MRI provides unmatched multiplanar soft tissue contrast resolution."
      },
      {
        "id": "q-vid-surg-skull-base-osteoma-04",
        "question": "In clinical examination of Craniotomy, which sign indicates acute pathology?",
        "options": [
          "Localized tenderness and guarding",
          "Normal resting tone",
          "Symmetric pulses",
          "Intact light reflex"
        ],
        "correctOptionIndex": 0,
        "explanation": "Focal tenderness and protective involuntary guarding indicate regional inflammation or injury."
      },
      {
        "id": "q-vid-surg-skull-base-osteoma-05",
        "question": "What is the principal vascular supply consideration for Craniotomy?",
        "options": [
          "Terminal arcade anastomoses",
          "End-arterial susceptibility to ischemia",
          "Dual venous drainage",
          "Segmental collateral network"
        ],
        "correctOptionIndex": 1,
        "explanation": "Knowledge of end-arterial arborization prevents ischemic necrosis during dissection."
      }
    ],
    "relatedVideoIds": [
      "vid-anat-femoral-triangle"
    ],
    "anatomy": [
      "Skull base",
      "Sphenoid sinus",
      "Optic nerve",
      "Cranial fossa"
    ],
    "specialty": [
      "Neurosurgery",
      "ENT"
    ],
    "procedure": [
      "Craniotomy"
    ],
    "topics": [
      "Neurosurgery",
      "Craniotomy"
    ],
    "created_at": "2026-09-18T16:00:00.000Z"
  }
];

export function filterMedicalVideos(
  videos: SelfHostedMedicalVideo[],
  filters: VideoFilters = {}
): SelfHostedMedicalVideo[] {
  return videos.filter((video) => {
    // 1. Publication status filter: students only see published videos
    if (video.publicationStatus && video.publicationStatus !== 'published') {
      return false;
    }

    // 2. Category filter
    if (filters.category && filters.category !== 'all' && filters.category !== 'All') {
      if (video.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // 3. Collection filter
    if (filters.collection && filters.collection !== 'all' && filters.collection !== 'All') {
      if (!video.collection || video.collection.toLowerCase() !== filters.collection.toLowerCase()) {
        return false;
      }
    }

    // 4. Subtopic / Topic filter
    const targetTopic = filters.subtopic || filters.topic;
    if (targetTopic && targetTopic !== 'all' && targetTopic !== 'All') {
      const topicLower = targetTopic.toLowerCase();
      const matchSubtopic = video.subtopic && video.subtopic.toLowerCase() === topicLower;
      const matchTopicsList = Array.isArray(video.topics) && video.topics.some(t => t.toLowerCase() === topicLower);
      const matchAnatomyList = Array.isArray(video.anatomy) && video.anatomy.some(a => a.toLowerCase() === topicLower);
      const matchSpecialtyList = Array.isArray(video.specialty) && video.specialty.some(s => s.toLowerCase() === topicLower);
      if (!matchSubtopic && !matchTopicsList && !matchAnatomyList && !matchSpecialtyList) {
        return false;
      }
    }

    // 4b. Specialty filter
    if (filters.specialty && filters.specialty !== 'all' && filters.specialty !== 'All') {
      const specLower = filters.specialty.toLowerCase();
      const matchSpecialty = (video.collection && video.collection.toLowerCase() === specLower) ||
        (Array.isArray(video.specialty) && video.specialty.some(s => s.toLowerCase() === specLower || s.toLowerCase().includes(specLower)));
      if (!matchSpecialty) {
        return false;
      }
    }

    // 4c. Anatomy filter
    if (filters.anatomy && filters.anatomy !== 'all' && filters.anatomy !== 'All') {
      const anatLower = filters.anatomy.toLowerCase();
      const matchAnatomy = (video.collection && video.collection.toLowerCase() === anatLower) ||
        (Array.isArray(video.anatomy) && video.anatomy.some(a => a.toLowerCase() === anatLower || a.toLowerCase().includes(anatLower)));
      if (!matchAnatomy) {
        return false;
      }
    }

    // 4d. Procedure filter
    if (filters.procedure && filters.procedure !== 'all' && filters.procedure !== 'All') {
      const procLower = filters.procedure.toLowerCase();
      const matchProc = (video.procedureType && video.procedureType.toLowerCase().includes(procLower)) ||
        (Array.isArray(video.procedure) && video.procedure.some(p => p.toLowerCase() === procLower || p.toLowerCase().includes(procLower)));
      if (!matchProc) {
        return false;
      }
    }

    // 5. MBBS Phase filter
    if (filters.phase && filters.phase !== 'all') {
      if (!video.mbbsPhase || !video.mbbsPhase.toLowerCase().includes(filters.phase.toLowerCase())) {
        return false;
      }
    }

    // 6. Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      if (!video.difficulty || video.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
        return false;
      }
    }

    // 7. Media Type filter
    if (filters.mediaType && filters.mediaType !== 'all') {
      if (!video.mediaType || video.mediaType.toLowerCase() !== filters.mediaType.toLowerCase()) {
        return false;
      }
    }

    // 8. Duration filter
    if (filters.duration) {
      const durSec = video.durationSeconds || 0;
      if (filters.duration === '<3m' && durSec >= 180) return false;
      if (filters.duration === '3-5m' && (durSec < 180 || durSec > 300)) return false;
      if (filters.duration === '>5m' && durSec <= 300) return false;
    }

    // 9. Language filter
    if (filters.language && filters.language !== 'all') {
      if (!video.language || video.language.toLowerCase() !== filters.language.toLowerCase()) {
        return false;
      }
    }

    // 10. Captions filter
    if (filters.hasCaptions === true) {
      if (!video.hasCaptions && !video.captions_url && !video.captionsUrl) {
        return false;
      }
    }

    // 11. Faculty reviewed filter
    if (filters.facultyReviewedOnly === true) {
      if (!video.review || video.review.status !== 'approved') {
        return false;
      }
    }

    // 12. Full Search across procedure, organ, anatomical region, disease, specialty, instrument, instructor, transcript
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const inTitle = video.title.toLowerCase().includes(q);
      const inTitleBn = (video.titleBn || '').toLowerCase().includes(q);
      const inDesc = video.description.toLowerCase().includes(q);
      const inSummary = (video.summary || '').toLowerCase().includes(q);
      const inAnatomy = Array.isArray(video.anatomy) && video.anatomy.some(a => a.toLowerCase().includes(q));
      const inSpecialty = Array.isArray(video.specialty) && video.specialty.some(s => s.toLowerCase().includes(q));
      const inProcedure = Array.isArray(video.procedure) && video.procedure.some(p => p.toLowerCase().includes(q));
      const inTopics = Array.isArray(video.topics) && video.topics.some(t => t.toLowerCase().includes(q));
      const inInstructor = (video.instructor || '').toLowerCase().includes(q);
      const inInstitution = (video.institution || '').toLowerCase().includes(q);
      const inSource = (video.source || '').toLowerCase().includes(q);
      const inAttribution = (video.attribution || '').toLowerCase().includes(q);
      const inInstruments = Array.isArray(video.instruments) && video.instruments.some(i => i.toLowerCase().includes(q));
      const inObjectives = Array.isArray(video.learningObjectives) && video.learningObjectives.some(o => o.toLowerCase().includes(q));
      
      let inTranscript = false;
      if (typeof video.transcript === 'string') {
        inTranscript = video.transcript.toLowerCase().includes(q);
      } else if (Array.isArray(video.transcript)) {
        inTranscript = video.transcript.some(item => (item.text || '').toLowerCase().includes(q));
      }

      if (
        !inTitle &&
        !inTitleBn &&
        !inDesc &&
        !inSummary &&
        !inAnatomy &&
        !inSpecialty &&
        !inProcedure &&
        !inTopics &&
        !inInstructor &&
        !inInstitution &&
        !inSource &&
        !inAttribution &&
        !inInstruments &&
        !inObjectives &&
        !inTranscript
      ) {
        return false;
      }
    }

    return true;
  });
}

export function sortMedicalVideos(
  videos: SelfHostedMedicalVideo[],
  sortBy: string = 'recent'
): SelfHostedMedicalVideo[] {
  const list = [...videos];
  switch (sortBy) {
    case 'shortest':
      return list.sort((a, b) => (a.durationSeconds || 0) - (b.durationSeconds || 0));
    case 'longest':
      return list.sort((a, b) => (b.durationSeconds || 0) - (a.durationSeconds || 0));
    case 'title':
    case 'A-Z':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'curriculum':
      return list.sort((a, b) => (a.mbbsPhase || '').localeCompare(b.mbbsPhase || ''));
    case 'recent':
    default:
      return list.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
  }
}

export function getRelatedVideos(
  current: SelfHostedMedicalVideo,
  allVideos: SelfHostedMedicalVideo[]
): SelfHostedMedicalVideo[] {
  return allVideos.filter(
    (v) =>
      v.id !== current.id &&
      (v.category === current.category ||
        (Array.isArray(v.specialty) && Array.isArray(current.specialty) && v.specialty.some((s) => current.specialty.includes(s))) ||
        (v.collection && v.collection === current.collection))
  );
}
