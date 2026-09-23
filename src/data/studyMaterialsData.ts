/**
 * MEDX Study Materials Data
 *
 * Defines the structural hierarchy for all 25 medical subjects.
 * Subject → Unit/System → Topic
 *
 * IMPORTANT: No fabricated medical content. Only structural metadata (names,
 * hierarchy, difficulty levels) is populated. Content sections are initialized
 * as null/incomplete and must be populated via verified medical sources through
 * the CMS.
 */

import { StudySubject } from '../types/study';

export const STUDY_SUBJECTS: StudySubject[] = [
  // ═══════════════════════════════════════
  // Phase 1: Pre-clinical (1st & 2nd Year)
  // ═══════════════════════════════════════
  {
    id: 'anatomy',
    name: 'Anatomy',
    nameBn: 'শারীরস্থানবিদ্যা',
    slug: 'anatomy',
    phase: 'Phase 1',
    icon: 'Brain',
    color: '#6366f1',
    description: 'Gross anatomy, neuroanatomy, embryology, histology, and surface markings.',
    totalTopics: 0,
    units: [
      {
        id: 'anat-upper-limb', subjectId: 'anatomy', title: 'Upper Limb', slug: 'upper-limb', sortOrder: 1,
        topics: [
          { id: 'anat-brachial-plexus', unitId: 'anat-upper-limb', subjectId: 'anatomy', title: 'Brachial Plexus', slug: 'brachial-plexus', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-shoulder-joint', unitId: 'anat-upper-limb', subjectId: 'anatomy', title: 'Shoulder Joint', slug: 'shoulder-joint', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-hand-muscles', unitId: 'anat-upper-limb', subjectId: 'anatomy', title: 'Muscles of the Hand', slug: 'hand-muscles', difficulty: 'Advanced', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-lower-limb', subjectId: 'anatomy', title: 'Lower Limb', slug: 'lower-limb', sortOrder: 2,
        topics: [
          { id: 'anat-femoral-triangle', unitId: 'anat-lower-limb', subjectId: 'anatomy', title: 'Femoral Triangle & Canal', slug: 'femoral-triangle', difficulty: 'Intermediate', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-knee-joint', unitId: 'anat-lower-limb', subjectId: 'anatomy', title: 'Knee Joint', slug: 'knee-joint', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-thorax', subjectId: 'anatomy', title: 'Thorax', slug: 'thorax', sortOrder: 3,
        topics: [
          { id: 'anat-heart-morphology', unitId: 'anat-thorax', subjectId: 'anatomy', title: 'Heart: External & Internal Features', slug: 'heart-morphology', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-mediastinum', unitId: 'anat-thorax', subjectId: 'anatomy', title: 'Mediastinum & Its Divisions', slug: 'mediastinum', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-lungs-pleura', unitId: 'anat-thorax', subjectId: 'anatomy', title: 'Lungs, Pleura & Bronchopulmonary Segments', slug: 'lungs-pleura', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-abdomen', subjectId: 'anatomy', title: 'Abdomen & Pelvis', slug: 'abdomen-pelvis', sortOrder: 4,
        topics: [
          { id: 'anat-liver-biliary', unitId: 'anat-abdomen', subjectId: 'anatomy', title: 'Liver, Biliary Apparatus & Portal Vein', slug: 'liver-biliary', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-kidney', unitId: 'anat-abdomen', subjectId: 'anatomy', title: 'Kidneys & Suprarenal Glands', slug: 'kidney', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-stomach', unitId: 'anat-abdomen', subjectId: 'anatomy', title: 'Stomach: Bed, Blood Supply & Lymphatics', slug: 'stomach', difficulty: 'Intermediate', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-head-neck', subjectId: 'anatomy', title: 'Head & Neck', slug: 'head-neck', sortOrder: 5,
        topics: [
          { id: 'anat-cranial-nerves', unitId: 'anat-head-neck', subjectId: 'anatomy', title: 'Cranial Nerves: 12 Pairs', slug: 'cranial-nerves', difficulty: 'Advanced', estimatedReadingMinutes: 35, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-circle-of-willis', unitId: 'anat-head-neck', subjectId: 'anatomy', title: 'Circle of Willis & Cerebral Circulation', slug: 'circle-of-willis', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-neuro', subjectId: 'anatomy', title: 'Neuroanatomy', slug: 'neuroanatomy', sortOrder: 6,
        topics: [
          { id: 'anat-cerebrum', unitId: 'anat-neuro', subjectId: 'anatomy', title: 'Cerebral Hemispheres: Sulci, Gyri & Functional Areas', slug: 'cerebrum', difficulty: 'Advanced', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-brainstem', unitId: 'anat-neuro', subjectId: 'anatomy', title: 'Brainstem & Fourth Ventricle', slug: 'brainstem', difficulty: 'Advanced', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'anat-embryo', subjectId: 'anatomy', title: 'Embryology', slug: 'embryology', sortOrder: 7,
        topics: [
          { id: 'anat-heart-dev', unitId: 'anat-embryo', subjectId: 'anatomy', title: 'Development of Heart & Great Vessels', slug: 'heart-development', difficulty: 'Advanced', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anat-gut-dev', unitId: 'anat-embryo', subjectId: 'anatomy', title: 'Development of GI Tract', slug: 'gut-development', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: false, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'physiology',
    name: 'Physiology',
    nameBn: 'শারীরবৃত্তবিদ্যা',
    slug: 'physiology',
    phase: 'Phase 1',
    icon: 'Activity',
    color: '#ec4899',
    description: 'Organ systems function, cellular transport, biophysics, and feedback mechanisms.',
    totalTopics: 0,
    units: [
      {
        id: 'phys-cvs', subjectId: 'physiology', title: 'Cardiovascular Physiology', slug: 'cardiovascular', sortOrder: 1,
        topics: [
          { id: 'phys-cardiac-cycle', unitId: 'phys-cvs', subjectId: 'physiology', title: 'Cardiac Cycle & Wiggers Diagram', slug: 'cardiac-cycle', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-bp-regulation', unitId: 'phys-cvs', subjectId: 'physiology', title: 'Blood Pressure Regulation (Baroreceptors / RAAS)', slug: 'bp-regulation', difficulty: 'Advanced', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-ecg', unitId: 'phys-cvs', subjectId: 'physiology', title: 'Electrocardiography (ECG) Basics', slug: 'ecg-basics', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'phys-renal', subjectId: 'physiology', title: 'Renal Physiology', slug: 'renal', sortOrder: 2,
        topics: [
          { id: 'phys-gfr', unitId: 'phys-renal', subjectId: 'physiology', title: 'Glomerular Filtration & Tubular Transport', slug: 'glomerular-filtration', difficulty: 'Advanced', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-acid-base', unitId: 'phys-renal', subjectId: 'physiology', title: 'Acid-Base Balance', slug: 'acid-base-balance', difficulty: 'Advanced', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'phys-resp', subjectId: 'physiology', title: 'Respiratory Physiology', slug: 'respiratory', sortOrder: 3,
        topics: [
          { id: 'phys-lung-volumes', unitId: 'phys-resp', subjectId: 'physiology', title: 'Lung Volumes & Capacities', slug: 'lung-volumes', difficulty: 'Intermediate', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-gas-exchange', unitId: 'phys-resp', subjectId: 'physiology', title: 'Gas Exchange & Transport', slug: 'gas-exchange', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'phys-neuro', subjectId: 'physiology', title: 'Neurophysiology', slug: 'neurophysiology', sortOrder: 4,
        topics: [
          { id: 'phys-action-potential', unitId: 'phys-neuro', subjectId: 'physiology', title: 'Action Potential & Synaptic Transmission', slug: 'action-potential', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-sensory', unitId: 'phys-neuro', subjectId: 'physiology', title: 'Sensory Physiology', slug: 'sensory-physiology', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: false, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'phys-gi', subjectId: 'physiology', title: 'Gastrointestinal Physiology', slug: 'gastrointestinal', sortOrder: 5,
        topics: [
          { id: 'phys-gastric-secretion', unitId: 'phys-gi', subjectId: 'physiology', title: 'Gastric Secretion & Regulation', slug: 'gastric-secretion', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'phys-endo', subjectId: 'physiology', title: 'Endocrine Physiology', slug: 'endocrine', sortOrder: 6,
        topics: [
          { id: 'phys-thyroid', unitId: 'phys-endo', subjectId: 'physiology', title: 'Thyroid Hormones', slug: 'thyroid-hormones', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'phys-adrenal', unitId: 'phys-endo', subjectId: 'physiology', title: 'Adrenal Cortex & Medulla', slug: 'adrenal', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    nameBn: 'জৈবরসায়ন',
    slug: 'biochemistry',
    phase: 'Phase 1',
    icon: 'FlaskConical',
    color: '#f59e0b',
    description: 'Molecular biology, enzyme kinetics, metabolism, and clinical biochemistry.',
    totalTopics: 0,
    units: [
      {
        id: 'bio-enzymes', subjectId: 'biochemistry', title: 'Enzymes & Kinetics', slug: 'enzymes', sortOrder: 1,
        topics: [
          { id: 'bio-enzyme-kinetics', unitId: 'bio-enzymes', subjectId: 'biochemistry', title: 'Enzyme Kinetics & Inhibition', slug: 'enzyme-kinetics', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'bio-metabolism', subjectId: 'biochemistry', title: 'Metabolism', slug: 'metabolism', sortOrder: 2,
        topics: [
          { id: 'bio-glycolysis', unitId: 'bio-metabolism', subjectId: 'biochemistry', title: 'Glycolysis & Gluconeogenesis', slug: 'glycolysis', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'bio-tca-cycle', unitId: 'bio-metabolism', subjectId: 'biochemistry', title: 'TCA Cycle & Oxidative Phosphorylation', slug: 'tca-cycle', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'bio-lipid-meta', unitId: 'bio-metabolism', subjectId: 'biochemistry', title: 'Lipid Metabolism', slug: 'lipid-metabolism', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'bio-molecular', subjectId: 'biochemistry', title: 'Molecular Biology', slug: 'molecular-biology', sortOrder: 3,
        topics: [
          { id: 'bio-dna-replication', unitId: 'bio-molecular', subjectId: 'biochemistry', title: 'DNA Replication & Repair', slug: 'dna-replication', difficulty: 'Advanced', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'bio-protein-synthesis', unitId: 'bio-molecular', subjectId: 'biochemistry', title: 'Protein Synthesis (Transcription & Translation)', slug: 'protein-synthesis', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  // ═══════════════════════════════════════
  // Phase 2: Para-clinical (3rd Year)
  // ═══════════════════════════════════════
  {
    id: 'pathology',
    name: 'Pathology',
    nameBn: 'রোগবিদ্যা',
    slug: 'pathology',
    phase: 'Phase 2',
    icon: 'Microscope',
    color: '#ef4444',
    description: 'General & systemic pathology, haematology, and clinical pathology.',
    totalTopics: 0,
    units: [
      {
        id: 'path-general', subjectId: 'pathology', title: 'General Pathology', slug: 'general-pathology', sortOrder: 1,
        topics: [
          { id: 'path-cell-injury', unitId: 'path-general', subjectId: 'pathology', title: 'Cell Injury, Adaptation & Death', slug: 'cell-injury', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'path-inflammation', unitId: 'path-general', subjectId: 'pathology', title: 'Acute & Chronic Inflammation', slug: 'inflammation', difficulty: 'Intermediate', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'path-neoplasia', unitId: 'path-general', subjectId: 'pathology', title: 'Neoplasia: Benign & Malignant', slug: 'neoplasia', difficulty: 'Advanced', estimatedReadingMinutes: 35, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'path-haem', subjectId: 'pathology', title: 'Haematology', slug: 'haematology', sortOrder: 2,
        topics: [
          { id: 'path-anaemia', unitId: 'path-haem', subjectId: 'pathology', title: 'Anaemia: Classification & Approach', slug: 'anaemia', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'path-leukaemia', unitId: 'path-haem', subjectId: 'pathology', title: 'Leukaemias & Lymphomas', slug: 'leukaemia', difficulty: 'Advanced', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology',
    nameBn: 'ভেষজবিদ্যা',
    slug: 'pharmacology',
    phase: 'Phase 2',
    icon: 'Pill',
    color: '#10b981',
    description: 'General & systematic pharmacology aligned with BM&DC MBBS curriculum.',
    totalTopics: 0,
    units: [
      {
        id: 'pharm-general', subjectId: 'pharmacology', title: 'General Pharmacology', slug: 'general-pharmacology', sortOrder: 1,
        topics: [
          { id: 'pharm-pharmacokinetics', unitId: 'pharm-general', subjectId: 'pharmacology', title: 'Pharmacokinetics (ADME)', slug: 'pharmacokinetics', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-pharmacodynamics', unitId: 'pharm-general', subjectId: 'pharmacology', title: 'Pharmacodynamics & Drug-Receptor Interactions', slug: 'pharmacodynamics', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'pharm-ans', subjectId: 'pharmacology', title: 'Autonomic Nervous System', slug: 'autonomic-nervous-system', sortOrder: 2,
        topics: [
          { id: 'pharm-cholinergic', unitId: 'pharm-ans', subjectId: 'pharmacology', title: 'Cholinergic Drugs', slug: 'cholinergic-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-anticholinergic', unitId: 'pharm-ans', subjectId: 'pharmacology', title: 'Anticholinergic Drugs', slug: 'anticholinergic-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-adrenergic', unitId: 'pharm-ans', subjectId: 'pharmacology', title: 'Adrenergic Agonists & Antagonists', slug: 'adrenergic-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'pharm-cvs', subjectId: 'pharmacology', title: 'Cardiovascular Drugs', slug: 'cardiovascular-drugs', sortOrder: 3,
        topics: [
          { id: 'pharm-antihypertensives', unitId: 'pharm-cvs', subjectId: 'pharmacology', title: 'Antihypertensive Drugs', slug: 'antihypertensives', difficulty: 'Intermediate', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-diuretics', unitId: 'pharm-cvs', subjectId: 'pharmacology', title: 'Diuretics', slug: 'diuretics', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-antianginal', unitId: 'pharm-cvs', subjectId: 'pharmacology', title: 'Antianginal & Anti-ischaemic Drugs', slug: 'antianginal-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'pharm-antimicrobial', subjectId: 'pharmacology', title: 'Antimicrobial Drugs', slug: 'antimicrobial-drugs', sortOrder: 4,
        topics: [
          { id: 'pharm-antibiotics', unitId: 'pharm-antimicrobial', subjectId: 'pharmacology', title: 'Antibiotics: Classification & Mechanism', slug: 'antibiotics', difficulty: 'Intermediate', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-antifungals', unitId: 'pharm-antimicrobial', subjectId: 'pharmacology', title: 'Antifungal Drugs', slug: 'antifungal-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: false, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'pharm-cns', subjectId: 'pharmacology', title: 'CNS Drugs', slug: 'cns-drugs', sortOrder: 5,
        topics: [
          { id: 'pharm-analgesics', unitId: 'pharm-cns', subjectId: 'pharmacology', title: 'Analgesics: NSAIDs & Opioids', slug: 'analgesics', difficulty: 'Intermediate', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-antiepileptics', unitId: 'pharm-cns', subjectId: 'pharmacology', title: 'Antiepileptic Drugs', slug: 'antiepileptic-drugs', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'pharm-endo-drugs', subjectId: 'pharmacology', title: 'Endocrine Pharmacology', slug: 'endocrine-pharmacology', sortOrder: 6,
        topics: [
          { id: 'pharm-insulin', unitId: 'pharm-endo-drugs', subjectId: 'pharmacology', title: 'Insulin & Oral Hypoglycaemics', slug: 'insulin-hypoglycaemics', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'pharm-corticosteroids', unitId: 'pharm-endo-drugs', subjectId: 'pharmacology', title: 'Corticosteroids', slug: 'corticosteroids', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'microbiology',
    name: 'Microbiology',
    nameBn: 'অণুজীববিদ্যা',
    slug: 'microbiology',
    phase: 'Phase 2',
    icon: 'Bug',
    color: '#8b5cf6',
    description: 'Bacteriology, virology, mycology, parasitology, and immunology.',
    totalTopics: 0,
    units: [
      {
        id: 'micro-general', subjectId: 'microbiology', title: 'General Microbiology', slug: 'general-microbiology', sortOrder: 1,
        topics: [
          { id: 'micro-bacterial-morpho', unitId: 'micro-general', subjectId: 'microbiology', title: 'Bacterial Morphology & Classification', slug: 'bacterial-morphology', difficulty: 'Basic', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'micro-sterilization', unitId: 'micro-general', subjectId: 'microbiology', title: 'Sterilization & Disinfection', slug: 'sterilization', difficulty: 'Basic', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'micro-bacteriology', subjectId: 'microbiology', title: 'Systematic Bacteriology', slug: 'bacteriology', sortOrder: 2,
        topics: [
          { id: 'micro-gram-pos', unitId: 'micro-bacteriology', subjectId: 'microbiology', title: 'Gram-Positive Cocci (Staphylococcus, Streptococcus)', slug: 'gram-positive-cocci', difficulty: 'Intermediate', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'micro-gram-neg', unitId: 'micro-bacteriology', subjectId: 'microbiology', title: 'Gram-Negative Bacilli (E. coli, Salmonella, Shigella)', slug: 'gram-negative-bacilli', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'micro-mycobacteria', unitId: 'micro-bacteriology', subjectId: 'microbiology', title: 'Mycobacteria (TB & Leprosy)', slug: 'mycobacteria', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'micro-virology', subjectId: 'microbiology', title: 'Virology', slug: 'virology', sortOrder: 3,
        topics: [
          { id: 'micro-hepatitis', unitId: 'micro-virology', subjectId: 'microbiology', title: 'Hepatitis Viruses (A, B, C, D, E)', slug: 'hepatitis-viruses', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'micro-hiv', unitId: 'micro-virology', subjectId: 'microbiology', title: 'HIV & AIDS', slug: 'hiv-aids', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'forensic-medicine',
    name: 'Forensic Medicine',
    nameBn: 'ফরেনসিক মেডিসিন',
    slug: 'forensic-medicine',
    phase: 'Phase 2',
    icon: 'Scale',
    color: '#64748b',
    description: 'Medicolegal aspects, toxicology, and forensic examination.',
    totalTopics: 0,
    units: [
      {
        id: 'forensic-general', subjectId: 'forensic-medicine', title: 'General Forensic Medicine', slug: 'general-forensic', sortOrder: 1,
        topics: [
          { id: 'forensic-death', unitId: 'forensic-general', subjectId: 'forensic-medicine', title: 'Death & Postmortem Changes', slug: 'death-postmortem', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'forensic-injuries', unitId: 'forensic-general', subjectId: 'forensic-medicine', title: 'Mechanical Injuries & Wounds', slug: 'injuries-wounds', difficulty: 'Intermediate', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'forensic-toxicology', subjectId: 'forensic-medicine', title: 'Toxicology', slug: 'toxicology', sortOrder: 2,
        topics: [
          { id: 'forensic-poisoning', unitId: 'forensic-toxicology', subjectId: 'forensic-medicine', title: 'General Principles of Poisoning', slug: 'poisoning', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'community-medicine',
    name: 'Community Medicine',
    nameBn: 'কমিউনিটি মেডিসিন',
    slug: 'community-medicine',
    phase: 'Phase 2',
    icon: 'Users',
    color: '#0ea5e9',
    description: 'Preventive medicine, epidemiology, biostatistics, and public health.',
    totalTopics: 0,
    units: [
      {
        id: 'comm-epidemiology', subjectId: 'community-medicine', title: 'Epidemiology', slug: 'epidemiology', sortOrder: 1,
        topics: [
          { id: 'comm-study-designs', unitId: 'comm-epidemiology', subjectId: 'community-medicine', title: 'Study Designs in Epidemiology', slug: 'study-designs', difficulty: 'Intermediate', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'comm-disease-measures', unitId: 'comm-epidemiology', subjectId: 'community-medicine', title: 'Measures of Disease Frequency', slug: 'disease-measures', difficulty: 'Intermediate', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'comm-nutrition', subjectId: 'community-medicine', title: 'Nutrition', slug: 'nutrition', sortOrder: 2,
        topics: [
          { id: 'comm-malnutrition', unitId: 'comm-nutrition', subjectId: 'community-medicine', title: 'Protein-Energy Malnutrition', slug: 'malnutrition', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  // ═══════════════════════════════════════
  // Phase 3: Para-clinical (4th Year)
  // ═══════════════════════════════════════
  {
    id: 'medicine',
    name: 'Medicine',
    nameBn: 'মেডিসিন',
    slug: 'medicine',
    phase: 'Phase 3',
    icon: 'Stethoscope',
    color: '#2563eb',
    description: 'Internal medicine: cardiology, gastroenterology, nephrology, neurology, endocrinology, and more.',
    totalTopics: 0,
    units: [
      {
        id: 'med-cardiology', subjectId: 'medicine', title: 'Cardiology', slug: 'cardiology', sortOrder: 1,
        topics: [
          { id: 'med-heart-failure', unitId: 'med-cardiology', subjectId: 'medicine', title: 'Heart Failure', slug: 'heart-failure', difficulty: 'Clinical', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-ihd', unitId: 'med-cardiology', subjectId: 'medicine', title: 'Ischaemic Heart Disease', slug: 'ischaemic-heart-disease', difficulty: 'Clinical', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-hypertension', unitId: 'med-cardiology', subjectId: 'medicine', title: 'Hypertension', slug: 'hypertension', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'med-gastro', subjectId: 'medicine', title: 'Gastroenterology', slug: 'gastroenterology', sortOrder: 2,
        topics: [
          { id: 'med-liver-cirrhosis', unitId: 'med-gastro', subjectId: 'medicine', title: 'Liver Cirrhosis', slug: 'liver-cirrhosis', difficulty: 'Clinical', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-peptic-ulcer', unitId: 'med-gastro', subjectId: 'medicine', title: 'Peptic Ulcer Disease', slug: 'peptic-ulcer', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'med-nephrology', subjectId: 'medicine', title: 'Nephrology', slug: 'nephrology', sortOrder: 3,
        topics: [
          { id: 'med-ckd', unitId: 'med-nephrology', subjectId: 'medicine', title: 'Chronic Kidney Disease', slug: 'chronic-kidney-disease', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-nephrotic', unitId: 'med-nephrology', subjectId: 'medicine', title: 'Nephrotic Syndrome', slug: 'nephrotic-syndrome', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'med-endo', subjectId: 'medicine', title: 'Endocrinology', slug: 'endocrinology', sortOrder: 4,
        topics: [
          { id: 'med-diabetes', unitId: 'med-endo', subjectId: 'medicine', title: 'Diabetes Mellitus', slug: 'diabetes-mellitus', difficulty: 'Clinical', estimatedReadingMinutes: 30, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-thyroid-disorder', unitId: 'med-endo', subjectId: 'medicine', title: 'Thyroid Disorders', slug: 'thyroid-disorders', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'med-neurology', subjectId: 'medicine', title: 'Neurology', slug: 'neurology', sortOrder: 5,
        topics: [
          { id: 'med-stroke', unitId: 'med-neurology', subjectId: 'medicine', title: 'Stroke (CVA)', slug: 'stroke', difficulty: 'Clinical', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'med-epilepsy', unitId: 'med-neurology', subjectId: 'medicine', title: 'Epilepsy', slug: 'epilepsy', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'surgery',
    name: 'Surgery',
    nameBn: 'সার্জারি',
    slug: 'surgery',
    phase: 'Phase 3',
    icon: 'Syringe',
    color: '#dc2626',
    description: 'General surgery, speciality surgery, and surgical principles.',
    totalTopics: 0,
    units: [
      {
        id: 'surg-general', subjectId: 'surgery', title: 'General Surgery', slug: 'general-surgery', sortOrder: 1,
        topics: [
          { id: 'surg-appendicitis', unitId: 'surg-general', subjectId: 'surgery', title: 'Acute Appendicitis', slug: 'appendicitis', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'surg-hernia', unitId: 'surg-general', subjectId: 'surgery', title: 'Inguinal Hernia', slug: 'inguinal-hernia', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'surg-cholecystitis', unitId: 'surg-general', subjectId: 'surgery', title: 'Gallstone Disease & Cholecystitis', slug: 'cholecystitis', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'surg-principles', subjectId: 'surgery', title: 'Surgical Principles', slug: 'surgical-principles', sortOrder: 2,
        topics: [
          { id: 'surg-wound-healing', unitId: 'surg-principles', subjectId: 'surgery', title: 'Wound Healing', slug: 'wound-healing', difficulty: 'Intermediate', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'surg-shock', unitId: 'surg-principles', subjectId: 'surgery', title: 'Surgical Shock', slug: 'surgical-shock', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    nameBn: 'প্রসূতি ও স্ত্রীরোগবিদ্যা',
    slug: 'obstetrics-gynecology',
    phase: 'Phase 3',
    icon: 'Baby',
    color: '#f472b6',
    description: 'Obstetric care, gynaecological conditions, and reproductive health.',
    totalTopics: 0,
    units: [
      {
        id: 'obs-antenatal', subjectId: 'obstetrics-gynaecology', title: 'Antenatal Care', slug: 'antenatal-care', sortOrder: 1,
        topics: [
          { id: 'obs-normal-pregnancy', unitId: 'obs-antenatal', subjectId: 'obstetrics-gynaecology', title: 'Normal Pregnancy & Antenatal Care', slug: 'normal-pregnancy', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'obs-eclampsia', unitId: 'obs-antenatal', subjectId: 'obstetrics-gynaecology', title: 'Pre-eclampsia & Eclampsia', slug: 'pre-eclampsia', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'gyn-conditions', subjectId: 'obstetrics-gynaecology', title: 'Gynaecological Conditions', slug: 'gynaecological-conditions', sortOrder: 2,
        topics: [
          { id: 'gyn-fibroid', unitId: 'gyn-conditions', subjectId: 'obstetrics-gynaecology', title: 'Uterine Fibroids', slug: 'uterine-fibroids', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    nameBn: 'শিশুরোগবিদ্যা',
    slug: 'pediatrics',
    phase: 'Phase 3',
    icon: 'Baby',
    color: '#06b6d4',
    description: 'Neonatology, growth & development, common paediatric conditions.',
    totalTopics: 0,
    units: [
      {
        id: 'peds-neonatal', subjectId: 'pediatrics', title: 'Neonatology', slug: 'neonatology', sortOrder: 1,
        topics: [
          { id: 'peds-neonatal-jaundice', unitId: 'peds-neonatal', subjectId: 'pediatrics', title: 'Neonatal Jaundice', slug: 'neonatal-jaundice', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'peds-rds', unitId: 'peds-neonatal', subjectId: 'pediatrics', title: 'Respiratory Distress Syndrome', slug: 'respiratory-distress', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'peds-common', subjectId: 'pediatrics', title: 'Common Paediatric Conditions', slug: 'common-paediatric', sortOrder: 2,
        topics: [
          { id: 'peds-diarrhoea', unitId: 'peds-common', subjectId: 'pediatrics', title: 'Acute Diarrhoeal Disease & Dehydration', slug: 'diarrhoea', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'peds-pneumonia', unitId: 'peds-common', subjectId: 'pediatrics', title: 'Childhood Pneumonia', slug: 'childhood-pneumonia', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  // ═══════════════════════════════════════
  // Phase 4: Clinical (5th Year)
  // ═══════════════════════════════════════
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    nameBn: 'চক্ষুবিদ্যা',
    slug: 'ophthalmology',
    phase: 'Phase 4',
    icon: 'Eye',
    color: '#0284c7',
    description: 'Eye disorders, refraction, and ophthalmic surgery.',
    totalTopics: 0,
    units: [
      {
        id: 'ophthal-general', subjectId: 'ophthalmology', title: 'General Ophthalmology', slug: 'general-ophthalmology', sortOrder: 1,
        topics: [
          { id: 'ophthal-glaucoma', unitId: 'ophthal-general', subjectId: 'ophthalmology', title: 'Glaucoma', slug: 'glaucoma', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'ophthal-cataract', unitId: 'ophthal-general', subjectId: 'ophthalmology', title: 'Cataract', slug: 'cataract', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'ent',
    name: 'ENT',
    nameBn: 'নাক-কান-গলা',
    slug: 'ent',
    phase: 'Phase 4',
    icon: 'Ear',
    color: '#7c3aed',
    description: 'Ear, nose, and throat disorders.',
    totalTopics: 0,
    units: [
      {
        id: 'ent-ear', subjectId: 'ent', title: 'Otology', slug: 'otology', sortOrder: 1,
        topics: [
          { id: 'ent-otitis-media', unitId: 'ent-ear', subjectId: 'ent', title: 'Otitis Media', slug: 'otitis-media', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'ent-throat', subjectId: 'ent', title: 'Laryngology', slug: 'laryngology', sortOrder: 2,
        topics: [
          { id: 'ent-tonsillitis', unitId: 'ent-throat', subjectId: 'ent', title: 'Tonsillitis & Adenoids', slug: 'tonsillitis', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    nameBn: 'অর্থোপেডিক্স',
    slug: 'orthopedics',
    phase: 'Phase 4',
    icon: 'Bone',
    color: '#d97706',
    description: 'Musculoskeletal disorders, fractures, and orthopaedic surgery.',
    totalTopics: 0,
    units: [
      {
        id: 'ortho-fractures', subjectId: 'orthopedics', title: 'Fractures', slug: 'fractures', sortOrder: 1,
        topics: [
          { id: 'ortho-fracture-healing', unitId: 'ortho-fractures', subjectId: 'orthopedics', title: 'Fracture Healing & Principles', slug: 'fracture-healing', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'ortho-colles', unitId: 'ortho-fractures', subjectId: 'orthopedics', title: 'Colles Fracture', slug: 'colles-fracture', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    nameBn: 'চর্মবিদ্যা',
    slug: 'dermatology',
    phase: 'Phase 4',
    icon: 'Fingerprint',
    color: '#ea580c',
    description: 'Skin disorders, sexually transmitted infections, and dermatological treatments.',
    totalTopics: 0,
    units: [
      {
        id: 'derm-infections', subjectId: 'dermatology', title: 'Skin Infections', slug: 'skin-infections', sortOrder: 1,
        topics: [
          { id: 'derm-fungal', unitId: 'derm-infections', subjectId: 'dermatology', title: 'Fungal Skin Infections', slug: 'fungal-infections', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'derm-scabies', unitId: 'derm-infections', subjectId: 'dermatology', title: 'Scabies & Pediculosis', slug: 'scabies', difficulty: 'Clinical', estimatedReadingMinutes: 15, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    nameBn: 'মনোরোগবিদ্যা',
    slug: 'psychiatry',
    phase: 'Phase 4',
    icon: 'Brain',
    color: '#a855f7',
    description: 'Mental health disorders, psychopharmacology, and psychiatric assessment.',
    totalTopics: 0,
    units: [
      {
        id: 'psych-mood', subjectId: 'psychiatry', title: 'Mood Disorders', slug: 'mood-disorders', sortOrder: 1,
        topics: [
          { id: 'psych-depression', unitId: 'psych-mood', subjectId: 'psychiatry', title: 'Major Depressive Disorder', slug: 'depression', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'psych-bipolar', unitId: 'psych-mood', subjectId: 'psychiatry', title: 'Bipolar Disorder', slug: 'bipolar-disorder', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: false, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'psych-psychotic', subjectId: 'psychiatry', title: 'Psychotic Disorders', slug: 'psychotic-disorders', sortOrder: 2,
        topics: [
          { id: 'psych-schizophrenia', unitId: 'psych-psychotic', subjectId: 'psychiatry', title: 'Schizophrenia', slug: 'schizophrenia', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'radiology',
    name: 'Radiology',
    nameBn: 'রেডিওলজি',
    slug: 'radiology',
    phase: 'Phase 4',
    icon: 'ScanLine',
    color: '#475569',
    description: 'Diagnostic imaging, X-ray interpretation, CT, MRI, and ultrasound.',
    totalTopics: 0,
    units: [
      {
        id: 'radio-chest', subjectId: 'radiology', title: 'Chest Radiology', slug: 'chest-radiology', sortOrder: 1,
        topics: [
          { id: 'radio-chest-xray', unitId: 'radio-chest', subjectId: 'radiology', title: 'Chest X-Ray Interpretation', slug: 'chest-xray', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'anesthesiology',
    name: 'Anesthesiology',
    nameBn: 'অ্যানেসথেসিওলজি',
    slug: 'anesthesiology',
    phase: 'Phase 4',
    icon: 'Wind',
    color: '#0891b2',
    description: 'General & regional anaesthesia, pain management, and ICU care.',
    totalTopics: 0,
    units: [
      {
        id: 'anaes-general', subjectId: 'anesthesiology', title: 'General Anaesthesia', slug: 'general-anaesthesia', sortOrder: 1,
        topics: [
          { id: 'anaes-ga-principles', unitId: 'anaes-general', subjectId: 'anesthesiology', title: 'Principles of General Anaesthesia', slug: 'ga-principles', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'anaes-airway', unitId: 'anaes-general', subjectId: 'anesthesiology', title: 'Airway Management', slug: 'airway-management', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    nameBn: 'জরুরি চিকিৎসা',
    slug: 'emergency-medicine',
    phase: 'Phase 4',
    icon: 'Siren',
    color: '#b91c1c',
    description: 'Emergency assessment, trauma, resuscitation, and critical care.',
    totalTopics: 0,
    units: [
      {
        id: 'emerg-resus', subjectId: 'emergency-medicine', title: 'Resuscitation', slug: 'resuscitation', sortOrder: 1,
        topics: [
          { id: 'emerg-bls-acls', unitId: 'emerg-resus', subjectId: 'emergency-medicine', title: 'BLS & ACLS', slug: 'bls-acls', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'emerg-shock-mgmt', unitId: 'emerg-resus', subjectId: 'emergency-medicine', title: 'Shock Management', slug: 'shock-management', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'dental',
    name: 'Dental',
    nameBn: 'দন্তচিকিৎসা',
    slug: 'dental',
    phase: 'Phase 4',
    icon: 'SmilePlus',
    color: '#14b8a6',
    description: 'Basic dental sciences, oral pathology, and dental emergencies.',
    totalTopics: 0,
    units: [
      {
        id: 'dental-oral-path', subjectId: 'dental', title: 'Oral Pathology', slug: 'oral-pathology', sortOrder: 1,
        topics: [
          { id: 'dental-oral-cancer', unitId: 'dental-oral-path', subjectId: 'dental', title: 'Oral Cancer & Pre-malignant Lesions', slug: 'oral-cancer', difficulty: 'Clinical', estimatedReadingMinutes: 20, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'medical-ethics',
    name: 'Medical Ethics',
    nameBn: 'চিকিৎসা নীতিশাস্ত্র',
    slug: 'medical-ethics',
    phase: 'Phase 4',
    icon: 'Shield',
    color: '#6b7280',
    description: 'Bioethics, medical law, patient rights, and professional conduct.',
    totalTopics: 0,
    units: [
      {
        id: 'ethics-principles', subjectId: 'medical-ethics', title: 'Ethical Principles', slug: 'ethical-principles', sortOrder: 1,
        topics: [
          { id: 'ethics-informed-consent', unitId: 'ethics-principles', subjectId: 'medical-ethics', title: 'Informed Consent', slug: 'informed-consent', difficulty: 'Basic', estimatedReadingMinutes: 15, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'ethics-confidentiality', unitId: 'ethics-principles', subjectId: 'medical-ethics', title: 'Confidentiality & Data Protection', slug: 'confidentiality', difficulty: 'Basic', estimatedReadingMinutes: 12, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'clinical-skills',
    name: 'Clinical Skills',
    nameBn: 'ক্লিনিক্যাল দক্ষতা',
    slug: 'clinical-skills',
    phase: 'Phase 4',
    icon: 'HeartPulse',
    color: '#059669',
    description: 'History taking, physical examination, clinical procedures, and communication.',
    totalTopics: 0,
    units: [
      {
        id: 'cskill-history', subjectId: 'clinical-skills', title: 'History Taking', slug: 'history-taking', sortOrder: 1,
        topics: [
          { id: 'cskill-chest-pain', unitId: 'cskill-history', subjectId: 'clinical-skills', title: 'History: Chest Pain', slug: 'chest-pain-history', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'cskill-abdominal-pain', unitId: 'cskill-history', subjectId: 'clinical-skills', title: 'History: Abdominal Pain', slug: 'abdominal-pain-history', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'cskill-examination', subjectId: 'clinical-skills', title: 'Physical Examination', slug: 'physical-examination', sortOrder: 2,
        topics: [
          { id: 'cskill-cvs-exam', unitId: 'cskill-examination', subjectId: 'clinical-skills', title: 'Cardiovascular Examination', slug: 'cardiovascular-examination', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'cskill-resp-exam', unitId: 'cskill-examination', subjectId: 'clinical-skills', title: 'Respiratory Examination', slug: 'respiratory-examination', difficulty: 'Clinical', estimatedReadingMinutes: 22, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'examination-preparation',
    name: 'Examination Preparation',
    nameBn: 'পরীক্ষা প্রস্তুতি',
    slug: 'examination-preparation',
    phase: 'Phase 4',
    icon: 'GraduationCap',
    color: '#f43f5e',
    description: 'Exam strategies, high-yield revision, and professional examination tips.',
    totalTopics: 0,
    units: [
      {
        id: 'exam-strategy', subjectId: 'examination-preparation', title: 'Exam Strategy', slug: 'exam-strategy', sortOrder: 1,
        topics: [
          { id: 'exam-mcq-strategy', unitId: 'exam-strategy', subjectId: 'examination-preparation', title: 'MCQ Answering Strategy', slug: 'mcq-strategy', difficulty: 'Basic', estimatedReadingMinutes: 15, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'exam-viva-prep', unitId: 'exam-strategy', subjectId: 'examination-preparation', title: 'Viva Voce Preparation', slug: 'viva-preparation', difficulty: 'Basic', estimatedReadingMinutes: 15, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
  {
    id: 'critical-care',
    name: 'Critical Care Medicine',
    nameBn: 'ক্রিটিকাল কেয়ার মেডিসিন',
    slug: 'critical-care',
    phase: 'Phase 4',
    icon: 'Activity',
    color: '#0284c7',
    description: 'ICU management, shock resuscitation, mechanical ventilation, and multi-organ failure support.',
    totalTopics: 0,
    units: [
      {
        id: 'cc-shock', subjectId: 'critical-care', title: 'Shock & Resuscitation', slug: 'shock-resuscitation', sortOrder: 1,
        topics: [
          { id: 'cc-septic-shock', unitId: 'cc-shock', subjectId: 'critical-care', title: 'Septic Shock & Sepsis-3 Guidelines', slug: 'septic-shock', difficulty: 'Clinical', estimatedReadingMinutes: 25, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
          { id: 'cc-anaphylaxis', unitId: 'cc-shock', subjectId: 'critical-care', title: 'Anaphylaxis Management Protocol', slug: 'anaphylaxis', difficulty: 'Clinical', estimatedReadingMinutes: 18, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
      {
        id: 'cc-ventilation', subjectId: 'critical-care', title: 'Airway & Ventilation', slug: 'airway-ventilation', sortOrder: 2,
        topics: [
          { id: 'cc-ards-management', unitId: 'cc-ventilation', subjectId: 'critical-care', title: 'Acute Respiratory Distress Syndrome (ARDS)', slug: 'ards-management', difficulty: 'Advanced', estimatedReadingMinutes: 28, isHighYield: true, verificationStatus: 'incomplete', hasContent: false },
        ]
      },
    ]
  },
];

// Compute totalTopics for each subject
STUDY_SUBJECTS.forEach(subject => {
  subject.totalTopics = subject.units.reduce((sum, unit) => sum + unit.topics.length, 0);
});

/**
 * Get all topics across all subjects as a flat array (for search)
 */
export function getAllTopicsFlat() {
  const topics: Array<{ id: string; title: string; slug: string; subjectId: string; subjectName: string; unitTitle: string; difficulty: string; isHighYield: boolean }> = [];
  for (const subject of STUDY_SUBJECTS) {
    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        topics.push({
          id: topic.id,
          title: topic.title,
          slug: topic.slug,
          subjectId: subject.id,
          subjectName: subject.name,
          unitTitle: unit.title,
          difficulty: topic.difficulty,
          isHighYield: topic.isHighYield,
        });
      }
    }
  }
  return topics;
}

/**
 * Find a subject by slug
 */
export function getSubjectBySlug(slug: string): StudySubject | undefined {
  return STUDY_SUBJECTS.find(s => s.slug === slug);
}

/**
 * Find a topic by its ID across all subjects
 */
export function getTopicById(topicId: string) {
  for (const subject of STUDY_SUBJECTS) {
    for (const unit of subject.units) {
      const topic = unit.topics.find(t => t.id === topicId);
      if (topic) return { topic, unit, subject };
    }
  }
  return null;
}

/**
 * Search study materials
 */
export function searchStudyMaterials(query: string, limit = 20) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results: Array<{ type: 'subject' | 'topic'; id: string; title: string; subtitle: string; slug: string }> = [];

  for (const subject of STUDY_SUBJECTS) {
    if (subject.name.toLowerCase().includes(q) || (subject.nameBn && subject.nameBn.includes(q))) {
      results.push({ type: 'subject', id: subject.id, title: subject.name, subtitle: subject.phase, slug: subject.slug });
    }
    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        if (topic.title.toLowerCase().includes(q)) {
          results.push({ type: 'topic', id: topic.id, title: topic.title, subtitle: `${subject.name} → ${unit.title}`, slug: `${subject.slug}/${topic.slug}` });
        }
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
}
