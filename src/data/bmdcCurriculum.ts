import { BmdcSubject } from '../types';

export const BMDC_SUBJECTS: BmdcSubject[] = [
  // Phase 1 (1st & 2nd Year)
  {
    id: 'anatomy',
    name: 'Anatomy & Embryology',
    bengaliName: 'শারীরস্থানবিদ্যা',
    phase: 'Phase 1: 1st & 2nd Year (Pre-clinical)',
    icon: 'Brain',
    description: 'Gross anatomy, neuroanatomy, embryology, histology, and surface markings according to BM&DC syllabus.',
    topicsCount: 42,
    chapters: [
      {
        id: 'cvs-anatomy',
        title: 'Cardiovascular System Anatomy',
        topics: [
          { id: 'heart-morphology', title: 'Heart: External & Internal Features', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'coronary-circulation', title: 'Coronary Arteries & Cardiac Veins', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'conducting-system', title: 'Conducting System of the Heart', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'great-vessels', title: 'Aorta & Superior Vena Cava', system: 'cardiovascular', isHighYield: false, has3DModel: true, hasSimulation: false },
        ]
      },
      {
        id: 'neuroanatomy',
        title: 'Neuroanatomy & Cranial Nerves',
        topics: [
          { id: 'cerebral-hemispheres', title: 'Cerebrum: Sulci, Gyri & Functional Areas', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'brainstem-cross-sections', title: 'Brainstem & Fourth Ventricle', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'cranial-nerves-pathways', title: 'Cranial Nerves: 12 Pairs & Foramina', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'circle-of-willis', title: 'Arterial Supply of Brain (Circle of Willis)', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: false },
        ]
      },
      {
        id: 'thorax-respiratory',
        title: 'Thorax & Respiratory Anatomy',
        topics: [
          { id: 'lungs-bronchial-tree', title: 'Lungs, Pleura & Bronchopulmonary Segments', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'mediastinum-divisions', title: 'Mediastinum & Thoracic Duct', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'intercostal-spaces', title: 'Thoracic Wall & Intercostal Space', system: 'respiratory', isHighYield: false, has3DModel: true, hasSimulation: false },
        ]
      },
      {
        id: 'abdomen-viscera',
        title: 'Abdomen & Pelvis',
        topics: [
          { id: 'stomach-bed', title: 'Stomach: Bed, Blood Supply & Lymphatics', system: 'digestive', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'liver-segments', title: 'Liver, Biliary Apparatus & Portal Vein', system: 'digestive', isHighYield: true, has3DModel: true, hasSimulation: false },
          { id: 'kidney-ureter', title: 'Kidneys, Suprarenal Glands & Ureters', system: 'urinary', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'physiology',
    name: 'Physiology & Biophysics',
    bengaliName: 'শারীরবৃত্তবিদ্যা',
    phase: 'Phase 1: 1st & 2nd Year (Pre-clinical)',
    icon: 'Activity',
    description: 'Dynamic organ systems function, cellular transport, biophysics, and feedback mechanisms.',
    topicsCount: 38,
    chapters: [
      {
        id: 'cvs-physio',
        title: 'Cardiovascular Physiology',
        topics: [
          { id: 'cardiac-cycle', title: 'Cardiac Cycle & Wiggers Diagram', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'cardiac-action-potential', title: 'Cardiac Electrophysiology & Pacemaker', system: 'cardiovascular', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'blood-pressure-regulation', title: 'Short & Long-term BP Regulation (Baroreceptors / RAAS)', system: 'cardiovascular', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      },
      {
        id: 'renal-physio',
        title: 'Renal Physiology',
        topics: [
          { id: 'nephron-transport', title: 'Glomerular Filtration & Tubular Transport (NKCC2 / ENaC)', system: 'urinary', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'countercurrent-mechanism', title: 'Countercurrent Multiplier & Medullary Osmotic Gradient', system: 'urinary', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'acid-base-balance', title: 'Acid-Base Buffering & Henderson-Hasselbalch', system: 'urinary', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry & Molecular Biology',
    bengaliName: 'প্রাণরসায়ন',
    phase: 'Phase 1: 1st & 2nd Year (Pre-clinical)',
    icon: 'Dna',
    description: 'Enzyme kinetics, metabolic pathways, molecular genetics, and clinical chemistry markers.',
    topicsCount: 30,
    chapters: [
      {
        id: 'metabolism',
        title: 'Carbohydrate & Lipid Metabolism',
        topics: [
          { id: 'glycolysis-tca', title: 'Glycolysis, TCA Cycle & Oxidative Phosphorylation', system: 'digestive', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'diabetic-ketoacidosis-biochem', title: 'Ketogenesis & DKA Pathobiochemistry', system: 'endocrine', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },

  // Phase 2 (3rd Year)
  {
    id: 'community-medicine',
    name: 'Community Medicine',
    bengaliName: 'কমিউনিটি মেডিসিন',
    phase: 'Phase 2: 3rd Year (Para-clinical)',
    icon: 'Users',
    description: 'Epidemiology, biostatistics, public health programs of Bangladesh (EPI, maternal health).',
    topicsCount: 26,
    chapters: [
      {
        id: 'epidemiology',
        title: 'Epidemiology & Infectious Disease Control',
        topics: [
          { id: 'epi-bangladesh', title: 'Expanded Programme on Immunization (EPI) in Bangladesh', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: false },
          { id: 'dengue-outbreak-control', title: 'Dengue & Vector-Borne Disease Control in BD', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'forensic-medicine',
    name: 'Forensic Medicine & Toxicology',
    bengaliName: 'ফরেনসিক মেডিসিন',
    phase: 'Phase 2: 3rd Year (Para-clinical)',
    icon: 'ShieldAlert',
    description: 'Medical jurisprudence, post-mortem examination, thanatology, and toxicology (OPC, snake bite).',
    topicsCount: 28,
    chapters: [
      {
        id: 'toxicology',
        title: 'Clinical Toxicology in Bangladesh',
        topics: [
          { id: 'opc-poisoning', title: 'Organophosphorus Compound (OPC) Poisoning & Atropinization', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'snake-bite-bd', title: 'Venomous Snakebite Envenomation (Viper vs Krait vs Cobra)', system: 'cardiovascular', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },

  // Phase 3 (4th Year)
  {
    id: 'pathology',
    name: 'Pathology',
    bengaliName: 'রোগতত্ত্ব',
    phase: 'Phase 3: 4th Year (Para-clinical)',
    icon: 'Microscope',
    description: 'General pathology, hemodynamic disorders, neoplasia, and systemic organ pathology.',
    topicsCount: 45,
    chapters: [
      {
        id: 'vascular-pathology',
        title: 'Hemodynamics & Vascular Pathology',
        topics: [
          { id: 'atherosclerosis-pathology', title: 'Atherosclerosis: From Fatty Streak to Thrombosis', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'myocardial-infarction-path', title: 'Myocardial Infarction: Gross, Microscopic & Evolution', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'rheumatic-heart-disease-path', title: 'Rheumatic Fever, Aschoff Bodies & Mitral Stenosis', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      },
      {
        id: 'respiratory-pathology',
        title: 'Respiratory Pathology',
        topics: [
          { id: 'pneumonia-stages', title: 'Lobar Pneumonia: Congestion, Red & Grey Hepatization', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'bronchial-asthma-path', title: 'Bronchial Asthma: Airway Remodeling & Curschmann Spirals', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'pulmonary-tb-path', title: 'Tuberculosis: Ghon Complex & Caseous Necrosis', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology & Therapeutics',
    bengaliName: 'ঔষধবিজ্ঞান',
    phase: 'Phase 3: 4th Year (Para-clinical)',
    icon: 'Pill',
    description: 'Pharmacokinetics, pharmacodynamics, autonomic, cardiovascular, antimicrobial & emergency drugs.',
    topicsCount: 50,
    chapters: [
      {
        id: 'autonomic-drugs',
        title: 'Autonomic & Respiratory Pharmacology',
        topics: [
          { id: 'salbutamol-journey', title: 'Beta-2 Agonists (Salbutamol): Mechanism & Nebulization', system: 'respiratory', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'atropine-pralidoxime', title: 'Anticholinergics & Oximes: Atropine & Pralidoxime in OPC', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      },
      {
        id: 'renal-cvs-drugs',
        title: 'Renal & Cardiovascular Pharmacology',
        topics: [
          { id: 'furosemide-journey', title: 'Loop Diuretics (Furosemide): NKCC2 Target & Diuresis', system: 'urinary', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'ace-inhibitors-arbs', title: 'RAAS Blockers: Enalapril, Losartan & Renal Protection', system: 'cardiovascular', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'microbiology',
    name: 'Microbiology & Immunology',
    bengaliName: 'অণুজীববিজ্ঞান',
    phase: 'Phase 3: 4th Year (Para-clinical)',
    icon: 'Bug',
    description: 'Bacteriology, virology, mycology, parasitology, and immunological hypersensitivity reactions.',
    topicsCount: 35,
    chapters: [
      {
        id: 'bacteriology-clinical',
        title: 'Clinical Bacteriology in BD',
        topics: [
          { id: 'salmonella-typhi', title: 'Enteric Fever: Salmonella Typhi & Widal/Blood Culture', system: 'digestive', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'mycobacterium-tb', title: 'Mycobacterium tuberculosis & GeneXpert MTB/RIF', system: 'respiratory', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },

  // Phase 4 (Final Year)
  {
    id: 'medicine',
    name: 'Medicine & Allied Specialties',
    bengaliName: 'মেডিসিন',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Stethoscope',
    description: 'Internal medicine, cardiology, pulmonology, neurology, nephrology, endocrinology, and infectious diseases.',
    topicsCount: 65,
    chapters: [
      {
        id: 'cardiology-clinical',
        title: 'Clinical Cardiology',
        topics: [
          { id: 'acute-coronary-syndrome', title: 'Acute Coronary Syndrome (STEMI vs NSTEMI)', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'mitral-stenosis-clinical', title: 'Mitral Stenosis: Auscultation & Management', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'heart-failure-decompensated', title: 'Acute Decompensated Heart Failure', system: 'cardiovascular', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      },
      {
        id: 'pulmonology-clinical',
        title: 'Clinical Pulmonology',
        topics: [
          { id: 'acute-severe-asthma', title: 'Acute Severe Asthma: Assessment & Emergency Protocol', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'copd-acute-exacerbation', title: 'COPD Exacerbation & NIV Criteria', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'pleural-effusion', title: 'Pleural Effusion: Transudate vs Exudate & Paracentesis', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'surgery',
    name: 'Surgery & Allied Specialties',
    bengaliName: 'সার্জারি',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Scissors',
    description: 'General surgery, surgical oncology, acute abdomen, orthopaedics, urology, and trauma.',
    topicsCount: 55,
    chapters: [
      {
        id: 'acute-abdomen-surgery',
        title: 'Emergency Surgery & Acute Abdomen',
        topics: [
          { id: 'acute-appendicitis', title: 'Acute Appendicitis: Alvarado Score & Laparoscopic Appendectomy', system: 'digestive', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'intestinal-obstruction', title: 'Intestinal Obstruction: Strangulation vs Simple', system: 'digestive', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'obs-gynae',
    name: 'Obstetrics & Gynaecology',
    bengaliName: 'ধাত্রীবিদ্যা ও স্ত্রীরোগবিজ্ঞান',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Baby',
    description: 'Antenatal care, obstetric emergencies (PPH, Eclampsia), partograph, and benign/malignant gynaecology.',
    topicsCount: 40,
    chapters: [
      {
        id: 'obstetric-emergencies',
        title: 'High-Yield Obstetric Emergencies',
        topics: [
          { id: 'postpartum-haemorrhage', title: 'Postpartum Haemorrhage (PPH): 4Ts & Uterine Balloon Tamponade', system: 'reproductive', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'severe-preeclampsia-eclampsia', title: 'Severe Pre-eclampsia & Eclampsia: MgSO4 Pritchard Regimen', system: 'reproductive', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Child Health',
    bengaliName: 'শিশুস্বাস্থ্যবিজ্ঞান',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'HeartHandshake',
    description: 'Neonatal resuscitation, severe acute malnutrition (SAM), IMCI guidelines, and pediatric emergencies.',
    topicsCount: 36,
    chapters: [
      {
        id: 'neonatology-sam',
        title: 'Neonatal Care & SAM',
        topics: [
          { id: 'severe-acute-malnutrition', title: 'Severe Acute Malnutrition (SAM): 10 Steps Protocol & F-75/F-100', system: 'digestive', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'neonatal-sepsis', title: 'Neonatal Sepsis & Jaundice (Phototherapy vs Exchange)', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Traumatology',
    bengaliName: 'অস্থিবিদ্যা ও ট্রমাটোলজি',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Bone',
    description: 'Fracture management, dislocations, osteomyelitis, septic arthritis, and pediatric bone deformities.',
    topicsCount: 32,
    chapters: [
      {
        id: 'fractures-trauma',
        title: 'Principles of Fractures & Healing',
        topics: [
          { id: 'fracture-healing-stages', title: 'Stages of Bone Healing (Hematoma to Remodeling)', system: 'musculoskeletal', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'compartment-syndrome', title: 'Acute Compartment Syndrome: 5 Ps & Emergent Fasciotomy', system: 'musculoskeletal', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'ent',
    name: 'Otorhinolaryngology (ENT)',
    bengaliName: 'নাক, কান ও গলা রোগবিদ্যা',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Ear',
    description: 'CSOM, hearing loss, epistaxis, tonsillitis, and head & neck malignancies.',
    topicsCount: 28,
    chapters: [
      {
        id: 'otology-csom',
        title: 'Otology & Middle Ear Disorders',
        topics: [
          { id: 'csom-tubotympanic-atticoantral', title: 'CSOM: Tubotympanic (Safe) vs Atticoantral (Cholesteatoma)', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'epistaxis-management', title: 'Epistaxis: Little’s Area & Anterior/Posterior Nasal Packing', system: 'respiratory', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    bengaliName: 'চক্ষুবিজ্ঞান',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Eye',
    description: 'Cataract, glaucoma, corneal ulcer, diabetic retinopathy, and red eye differentials.',
    topicsCount: 30,
    chapters: [
      {
        id: 'lens-cataract-glaucoma',
        title: 'Cataract & Glaucoma',
        topics: [
          { id: 'acute-angle-closure-glaucoma', title: 'Acute Angle-Closure Glaucoma: Triage & Emergency IOP Reduction', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'cataract-sics-phaco', title: 'Senile Cataract: SICS vs Phacoemulsification', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: false },
        ]
      }
    ]
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Venereology',
    bengaliName: 'চর্ম ও যৌনব্যাধি',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Layers',
    description: 'Scabies, superficial fungal infections, psoriasis, eczema, acne vulgaris, and sexually transmitted infections.',
    topicsCount: 25,
    chapters: [
      {
        id: 'papulosquamous-infectious',
        title: 'Common Dermatological Disorders in BD',
        topics: [
          { id: 'scabies-infestation', title: 'Scabies: Sarcoptes scabiei Burrows & Permethrin 5% Regimen', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: false },
          { id: 'psoriasis-vulgaris', title: 'Psoriasis: Plaque Morphology, Auspitz Sign & Koebner Phenomenon', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Behavioral Sciences',
    bengaliName: 'মনোরোগবিদ্যা',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Smile',
    description: 'Depressive disorders, schizophrenia, anxiety & panic disorders, bipolar affective disorder, and substance abuse.',
    topicsCount: 22,
    chapters: [
      {
        id: 'mood-psychotic-disorders',
        title: 'Major Psychiatric Syndromes',
        topics: [
          { id: 'major-depressive-disorder', title: 'Major Depressive Episode: Diagnostic Criteria & Suicide Risk Triage', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'schizophrenia-psychosis', title: 'Schizophrenia: Schneider’s First-Rank Symptoms & Antipsychotics', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: false },
        ]
      }
    ]
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging',
    bengaliName: 'রেডিওলজি ও মেডিকেল ইমেজিং',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Radio',
    description: 'Systematic chest X-ray interpretation, CT scan brain, emergency abdominal radiographs, and ultrasound.',
    topicsCount: 30,
    chapters: [
      {
        id: 'emergency-imaging',
        title: 'Emergency Radiography & Cross-Sectional Imaging',
        topics: [
          { id: 'cxr-systematic-reading', title: 'Chest Radiograph: ABCDE Method & Common Pathologies', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'head-ct-stroke-trauma', title: 'Non-Contrast Head CT: Ischemic Infarct vs Intracerebral Hemorrhage', system: 'nervous', isHighYield: true, has3DModel: true, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'anaesthesiology',
    name: 'Anaesthesiology & Critical Care',
    bengaliName: 'অবেদনবিজ্ঞান ও ক্রিটিক্যাল কেয়ার',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Shield',
    description: 'Pre-operative assessment, general & spinal anesthesia, airway management, ICU monitoring, and CPR/BLS/ACLS.',
    topicsCount: 24,
    chapters: [
      {
        id: 'airway-spinal-anesthesia',
        title: 'Airway & Regional Anesthesia',
        topics: [
          { id: 'difficult-airway-mallampati', title: 'Airway Assessment: Mallampati Class & Endotracheal Intubation', system: 'respiratory', isHighYield: true, has3DModel: true, hasSimulation: true },
          { id: 'subarachnoid-block-spinal', title: 'Spinal Anesthesia: L3-L4 Interspace & Post-Dural Puncture Headache', system: 'nervous', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine & Disaster Care',
    bengaliName: 'জরুরি চিকিৎসাবিদ্যা',
    phase: 'Phase 4: 5th Year (Clinical)',
    icon: 'Zap',
    description: 'Triage systems, cardiopulmonary resuscitation (CPR), anaphylaxis, hemorrhagic shock resuscitation, and disaster triage.',
    topicsCount: 28,
    chapters: [
      {
        id: 'acute-resuscitation',
        title: 'Shock & Resuscitation Protocols',
        topics: [
          { id: 'anaphylactic-shock-epinephrine', title: 'Anaphylaxis Protocol: Intramuscular Adrenaline 1:1000 Dosage', system: 'immune', isHighYield: true, has3DModel: false, hasSimulation: true },
          { id: 'hypovolemic-shock-atls', title: 'Classes of Hemorrhagic Shock & Massive Transfusion Protocol', system: 'cardiovascular', isHighYield: true, has3DModel: false, hasSimulation: true },
        ]
      }
    ]
  }
];
