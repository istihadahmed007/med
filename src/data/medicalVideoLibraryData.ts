/**
 * Self-Hosted Medical Video Library Catalog
 *
 * Core Requirement:
 * Cloud Storage -> MEDX Video Player (No redirects, no third-party iframes).
 * All media stored in self-hosted storage: medical-videos/{anatomy,physiology,pathology,surgery}/
 *
 * Copyright Filter:
 * Only verified public-domain medical videos produced by the U.S. National Library
 * of Medicine (MedlinePlus / NIH) where redistribution is explicitly permitted.
 * Attribution: "Source: MedlinePlus, National Library of Medicine"
 */

export const VIDEO_CATEGORIES = [
  "Physiology",
  "Pathology",
  "Anatomy",
  "Surgery",
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export const CATEGORY_TOPICS: Record<VideoCategory, string[]> = {
  Physiology: [
    "Breathing",
    "Blood circulation",
    "Cardiac conduction",
    "Heart function",
    "Kidney function",
    "Digestion",
  ],
  Pathology: [
    "Allergic reaction",
    "Blood clotting",
    "Atherosclerosis",
    "Disease mechanisms",
  ],
  Anatomy: [
    "Brain",
    "Heart",
    "Lungs",
    "Kidney",
    "Eye",
    "Digestive system",
  ],
  Surgery: [
    "General Surgery",
    "Laparoscopic Surgery",
    "Cardiac Surgery",
    "Neurosurgery",
  ],
};

export interface SelfHostedMedicalVideo {
  id: string;
  title: string;
  description: string;
  category: VideoCategory | string;
  anatomy: string[];
  specialty: string[];
  procedure: string[];
  topics: string[];
  storage_path: string;
  playback_url: string;
  thumbnail_url: string;
  duration: string;
  source: string;
  license: string;
  attribution: string;
  captions_url: string;
  created_at: string;
  chapters?: {
    timestampSeconds: number;
    title: string;
  }[];
  transcript?: string;
}

export type MedicalVideoItem = SelfHostedMedicalVideo;

export interface VideoFilters {
  query?: string;
  category?: VideoCategory | "all";
  topic?: string;
  anatomy?: string;
  specialty?: string;
  procedure?: string;
}

export const MEDICAL_VIDEO_LIBRARY: SelfHostedMedicalVideo[] = [
  {
    id: "mp-path-histamine",
    title: "Histamine: The Stuff Allergies are Made of",
    description:
      "Educational animation exploring histamine's dual physiological role as a vital neurotransmitter and gastric acid stimulant, versus its immunological role in mediating allergic reactions, tissue edema, bronchoconstriction, and life-threatening anaphylaxis. Produced with NIAID/NIH medical research.",
    category: "Pathology",
    anatomy: ["Immune System", "Blood Vessels", "Skin", "Respiratory Tract"],
    specialty: ["Immunology", "Allergy", "Pathology"],
    procedure: ["Allergy Testing", "Epinephrine Administration", "Antihistamine Therapy"],
    topics: ["Allergic reaction", "Disease mechanisms"],
    storage_path: "medical-videos/pathology/histamine-allergies.mp4",
    playback_url: "/medical-videos/pathology/histamine-allergies.mp4",
    thumbnail_url: "/medical-videos/pathology/histamine-allergies.jpg",
    duration: "03:34",
    source: "MedlinePlus, National Library of Medicine",
    license: "Public Domain (U.S. Government Work - NLM/NIH)",
    attribution: "Source: MedlinePlus, National Library of Medicine",
    captions_url: "/medical-videos/pathology/histamine-allergies.vtt",
    created_at: "2017-09-08T00:00:00.000Z",
    chapters: [
      { timestampSeconds: 27, title: "Prevalence of Allergic Conditions" },
      { timestampSeconds: 50, title: "Histamine as a Cellular Signalling Molecule" },
      { timestampSeconds: 74, title: "Immune System Defense Against Parasites" },
      { timestampSeconds: 85, title: "B-cells and IgE Antibody Sensitization" },
      { timestampSeconds: 99, title: "Mast Cell & Basophil Degranulation" },
      { timestampSeconds: 123, title: "Immune Response & Microvascular Leakage" },
      { timestampSeconds: 132, title: "Common Environmental & Food Allergens" },
      { timestampSeconds: 137, title: "Clinical Symptoms Across Organs" },
      { timestampSeconds: 156, title: "Anaphylactic Shock Pathophysiology" },
      { timestampSeconds: 173, title: "Therapy: Antihistamines & Epinephrine" },
      { timestampSeconds: 199, title: "NIAID & NIH Medical Research" },
    ],
    transcript:
      "Histamine is an essential chemical mediator in the body. While best known for triggering allergies, it functions normally as a signaling molecule in the brain promoting wakefulness and in the stomach stimulating acid production. In the immune system, B-cells generate specific IgE antibodies that prime mast cells and basophils. Upon re-exposure to allergens, these cells release histamine, causing vascular dilation, increased permeability, mucosal congestion, bronchospasm, and potentially anaphylaxis requiring emergency intramuscular epinephrine.",
  },
  {
    id: "mp-path-cholesterol",
    title: "Cholesterol: Good and Bad",
    description:
      "Explains cholesterol lipid biochemistry, normal cellular membrane stability, and how excessive circulating low-density lipoprotein (LDL) leads to endothelial lipid deposition, atherosclerotic plaque buildup, coronary occlusion, myocardial infarction, and cerebrovascular stroke.",
    category: "Pathology",
    anatomy: ["Heart", "Coronary Arteries", "Blood Vessels", "Liver"],
    specialty: ["Cardiology", "Pathology", "Internal Medicine"],
    procedure: ["Lipid Panel Blood Test", "Cardiovascular Risk Assessment"],
    topics: ["Atherosclerosis", "Blood circulation", "Heart function"],
    storage_path: "medical-videos/pathology/cholesterol-atherosclerosis.mp4",
    playback_url: "/medical-videos/pathology/cholesterol-atherosclerosis.mp4",
    thumbnail_url: "/medical-videos/pathology/cholesterol-atherosclerosis.jpg",
    duration: "02:56",
    source: "MedlinePlus, National Library of Medicine",
    license: "Public Domain (U.S. Government Work - NLM/NIH)",
    attribution: "Source: MedlinePlus, National Library of Medicine",
    captions_url: "/medical-videos/pathology/cholesterol-atherosclerosis.vtt",
    created_at: "2018-06-26T00:00:00.000Z",
    chapters: [
      { timestampSeconds: 3, title: "Membrane Structure & Steroid Precursors" },
      { timestampSeconds: 22, title: "Atherosclerosis & Endothelial Plaque" },
      { timestampSeconds: 52, title: "Coronary Arteries & Myocardial Infarction" },
      { timestampSeconds: 59, title: "Carotid Arteries & Cerebrovascular Stroke" },
      { timestampSeconds: 66, title: "Peripheral Artery Disease (Claudication)" },
      { timestampSeconds: 88, title: "Low-Density Lipoprotein (LDL) Transport" },
      { timestampSeconds: 101, title: "High-Density Lipoprotein (HDL) Reverse Transport" },
      { timestampSeconds: 133, title: "Cardiovascular Risk Modification" },
      { timestampSeconds: 163, title: "NHLBI Clinical Research Guidelines" },
    ],
    transcript:
      "Cholesterol is a lipid molecule synthesized in the liver and incorporated into cell membranes and steroid hormones. Low-density lipoprotein (LDL) transports cholesterol to peripheral tissues; excess LDL undergoes oxidative modification and uptake by macrophages, forming foam cells and atherosclerotic fibrous plaques in coronary and cerebral arteries. Rupture of these plaques precipitates acute thrombosis, causing heart attacks or ischemic strokes. High-density lipoprotein (HDL) mediates reverse cholesterol transport to the liver for excretion.",
  },
  {
    id: "mp-phys-gluten",
    title: "Gluten and Celiac Disease",
    description:
      "Educational medical animation demonstrating gastrointestinal physiology, gluten protein breakdown, and the autoimmune pathophysiology of celiac disease in the small intestine, leading to enterocyte villous atrophy, severe nutrient malabsorption, and systemic complications.",
    category: "Physiology",
    anatomy: ["Digestive System", "Small Intestine", "Intestinal Villi"],
    specialty: ["Gastroenterology", "Physiology", "Pathology"],
    procedure: ["Endoscopic Intestinal Biopsy", "tTGA Serology Testing"],
    topics: ["Digestion", "Digestive system"],
    storage_path: "medical-videos/physiology/gluten-celiac-digestion.mp4",
    playback_url: "/medical-videos/physiology/gluten-celiac-digestion.mp4",
    thumbnail_url: "/medical-videos/physiology/gluten-celiac-digestion.jpg",
    duration: "02:47",
    source: "MedlinePlus, National Library of Medicine",
    license: "Public Domain (U.S. Government Work - NLM/NIH)",
    attribution: "Source: MedlinePlus, National Library of Medicine",
    captions_url: "/medical-videos/physiology/gluten-celiac-digestion.vtt",
    created_at: "2017-09-19T00:00:00.000Z",
    chapters: [
      { timestampSeconds: 10, title: "Dietary Gluten Composition (Wheat, Barley, Rye)" },
      { timestampSeconds: 37, title: "Pathophysiology of Celiac Enteropathy" },
      { timestampSeconds: 46, title: "Epidemiology & Genetic Predisposition" },
      { timestampSeconds: 57, title: "Intestinal Villous Blunting & Nutrient Loss" },
      { timestampSeconds: 77, title: "Gastrointestinal & Extraintestinal Signs" },
      { timestampSeconds: 99, title: "Long-term Malabsorption (Anemia, Osteopenia)" },
      { timestampSeconds: 107, title: "Diagnostic Serology (tTGA) & Upper Endoscopy" },
      { timestampSeconds: 130, title: "Gluten-Free Dietary Management" },
      { timestampSeconds: 150, title: "NIDDK & NIH Digestive Research" },
    ],
    transcript:
      "The small intestinal mucosa features microscopic finger-like projections called villi that maximize absorption of carbohydrates, proteins, fats, vitamins, and minerals. In celiac disease, ingestion of gluten triggers an inappropriate T-cell mediated autoimmune reaction in genetically susceptible individuals (HLA-DQ2/DQ8). The inflammatory infiltrate blunts and flattens the intestinal villi, resulting in impaired absorption, steatorrhea, microcytic or macrocytic anemia, osteopenia, and dermatitis herpetiformis. Confirmation is achieved via anti-tissue transglutaminase (tTGA) antibodies and duodenal endoscopic mucosal biopsy.",
  },
  {
    id: "mp-path-antibiotics",
    title: "Antibiotics vs. Bacteria: Fighting the Resistance",
    description:
      "Comprehensive medical tutorial illustrating bacterial cellular structures, mechanism of action of major antimicrobial classes, and evolutionary resistance adaptations such as enzymatic degradation, target alteration, and active efflux pumps.",
    category: "Pathology",
    anatomy: ["Cellular Structure", "Bacterial Cell Wall", "Respiratory Tract"],
    specialty: ["Microbiology", "Infectious Diseases", "Pharmacology"],
    procedure: ["Antimicrobial Susceptibility Testing", "Culture and Sensitivity"],
    topics: ["Disease mechanisms"],
    storage_path: "medical-videos/pathology/antibiotic-resistance-mechanisms.mp4",
    playback_url: "/medical-videos/pathology/antibiotic-resistance-mechanisms.mp4",
    thumbnail_url: "/medical-videos/pathology/antibiotic-resistance-mechanisms.jpg",
    duration: "04:50",
    source: "MedlinePlus, National Library of Medicine",
    license: "Public Domain (U.S. Government Work - NLM/NIH)",
    attribution: "Source: MedlinePlus, National Library of Medicine",
    captions_url: "/medical-videos/pathology/antibiotic-resistance-mechanisms.vtt",
    created_at: "2018-03-14T00:00:00.000Z",
    chapters: [
      { timestampSeconds: 38, title: "Global Antimicrobial Resistance Burden" },
      { timestampSeconds: 62, title: "Priority Pathogens (CDC & NIAID)" },
      { timestampSeconds: 71, title: "Multidrug-Resistant Tuberculosis (MDR-TB)" },
      { timestampSeconds: 91, title: "Plasmid-Mediated Resistance in Gonorrhea" },
      { timestampSeconds: 106, title: "Methicillin-Resistant S. Aureus (MRSA)" },
      { timestampSeconds: 133, title: "Four Core Cellular Resistance Mechanisms" },
      { timestampSeconds: 205, title: "Antimicrobial Stewardship & Infection Prevention" },
      { timestampSeconds: 272, title: "Bacteriophage & Novel Molecule Research at NIAID" },
    ],
    transcript:
      "Antimicrobial agents selectively target bacterial physiology, such as peptidoglycan cell wall synthesis, 30S/50S ribosomal protein translation, and DNA gyrase replication. Selective antibiotic pressure selects for resistant variants. Key resistance mechanisms include enzymatic modification (beta-lactamases), target modification (mutated penicillin-binding proteins in MRSA), decreased outer membrane permeability, and active drug extrusion via multidrug resistance efflux pumps. NIAID conducts ongoing research into alternative therapies including bacteriophages and engineered adjuvants.",
  },
  {
    id: "mp-phys-naloxone",
    title: "How Naloxone Saves Lives in Opioid Overdose",
    description:
      "Explores opioid receptor neurophysiology in the central nervous system, depression of the medullary pontine respiratory pacemaker during severe intoxication, and competitive opioid receptor displacement by naloxone to rapidly re-establish spontaneous ventilation.",
    category: "Physiology",
    anatomy: ["Brain", "Brainstem Respiratory Center", "Nervous System"],
    specialty: ["Emergency Medicine", "Neurophysiology", "Clinical Pharmacology"],
    procedure: ["Naloxone Intranasal Administration", "Emergency Airway Management"],
    topics: ["Breathing", "Brain"],
    storage_path: "medical-videos/physiology/naloxone-respiratory-brainstem.mp4",
    playback_url: "/medical-videos/physiology/naloxone-respiratory-brainstem.mp4",
    thumbnail_url: "/medical-videos/physiology/naloxone-respiratory-brainstem.jpg",
    duration: "04:55",
    source: "MedlinePlus, National Library of Medicine",
    license: "Public Domain (U.S. Government Work - NLM/NIH)",
    attribution: "Source: MedlinePlus, National Library of Medicine",
    captions_url: "/medical-videos/physiology/naloxone-respiratory-brainstem.vtt",
    created_at: "2019-01-15T00:00:00.000Z",
    chapters: [
      { timestampSeconds: 18, title: "Opioid Classes (Heroin, Fentanyl, Oxycodone)" },
      { timestampSeconds: 41, title: "Naloxone as an Opioid Antagonist" },
      { timestampSeconds: 59, title: "Clinical Signs of Acute Overdose" },
      { timestampSeconds: 85, title: "Intranasal & Intramuscular Administration" },
      { timestampSeconds: 110, title: "Competitive Receptor Displacement Dynamics" },
      { timestampSeconds: 133, title: "Brainstem Medullary Center & Respiratory Depression" },
      { timestampSeconds: 184, title: "Acute Receptor Rebound & Withdrawal Symptoms" },
      { timestampSeconds: 198, title: "Tolerance & Pharmacological Dependence" },
      { timestampSeconds: 212, title: "Respiratory Arrest & Hypoxic Brain Injury" },
      { timestampSeconds: 279, title: "NIH HEAL Initiative & NIDA Harm Reduction" },
    ],
    transcript:
      "Opioids bind to mu, delta, and kappa G-protein-coupled opioid receptors in the brain, spinal cord, and gastrointestinal tract. In the brainstem respiratory centers (pre-Botzinger complex), exogenous opioids profoundly blunt the ventilatory response to hypercapnia and hypoxia, producing respiratory depression and fatal asphyxia. Naloxone possesses an exceptionally high binding affinity for mu-opioid receptors without intrinsic agonist activity, displacing opioids within two to three minutes to restore normal spontaneous diaphragmatic breathing.",
  },
];

export function filterMedicalVideos(
  videos: SelfHostedMedicalVideo[],
  filters: VideoFilters,
): SelfHostedMedicalVideo[] {
  return videos.filter((video) => {
    if (filters.category && filters.category !== "all" && video.category !== filters.category) {
      return false;
    }
    if (filters.topic && !video.topics.includes(filters.topic)) {
      return false;
    }
    if (filters.anatomy && !video.anatomy.includes(filters.anatomy)) {
      return false;
    }
    if (filters.specialty && !video.specialty.includes(filters.specialty)) {
      return false;
    }
    if (filters.procedure && !video.procedure.includes(filters.procedure)) {
      return false;
    }
    if (filters.query) {
      const q = filters.query.toLowerCase().trim();
      const match =
        video.title.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q) ||
        video.anatomy.some((a) => a.toLowerCase().includes(q)) ||
        video.specialty.some((s) => s.toLowerCase().includes(q)) ||
        video.procedure.some((p) => p.toLowerCase().includes(q)) ||
        video.topics.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
}

export function getRelatedVideos(
  currentVideo: SelfHostedMedicalVideo,
  allVideos: SelfHostedMedicalVideo[] = MEDICAL_VIDEO_LIBRARY,
): SelfHostedMedicalVideo[] {
  return allVideos
    .filter((v) => v.id !== currentVideo.id)
    .filter(
      (v) =>
        v.category === currentVideo.category ||
        v.anatomy.some((a) => currentVideo.anatomy.includes(a)) ||
        v.specialty.some((s) => currentVideo.specialty.includes(s)),
    );
}
