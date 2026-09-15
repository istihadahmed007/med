// Centralized Anatomy Model Registry & Metadata
// Incorporating authentic 3D models & Terminologia Anatomica (TA2) from Anatomy Atelier (thebuggeddev/anatomy) & BodyParts3D/Z-Anatomy

export type Hotspot = {
  id: string;
  /** Terminologia Anatomica (TA2) international standard Latin anatomical designation */
  ta: string;
  label: string;
  detail: string;
  position: [number, number, number];
  color: string;
};

export type AnatomyModel = {
  id: string;
  name: string;
  system: string;
  model: string;
  thumbnail?: string;
  description?: string;
  scientificName?: string;
  poetic?: string;
  size?: string;
  weight?: string;
  location?: string;
  function?: string;
  dailyFact?: string;
  medical?: string;
  bloodSupply?: string;
  funFact?: string;
  tissue?: string;
  comparison?: string;
  conditions?: string[];
  hotspots?: Hotspot[];
  available: boolean;
  accent?: string;
  illustrations?: {
    organ?: string;
    thumb?: string;
    microscopic?: string;
    location?: string;
    compare?: string;
  };
};

export const ANATOMY_MODELS: AnatomyModel[] = [
  {
    id: "heart",
    name: "Heart",
    system: "Cardiovascular System",
    model: "/models/heart.glb",
    scientificName: "Cor",
    poetic: "The tireless pump",
    thumbnail: "/anatomy/heart/thumb.webp",
    description: "A muscular pump that coordinates systemic and pulmonary circulation, propelling oxygenated blood to tissues.",
    size: "Approx. 12 × 8.5 × 6 cm (fist-sized)",
    weight: "250–350 g",
    location: "Middle mediastinum, behind sternum, tilted left",
    function: "Circulates oxygenated blood through cardiac cycle",
    dailyFact: "Beats ~100,000 times, pumping ~7,200 L of blood daily",
    medical: "Intrinsic cardiac conduction (SA node, AV node, His-Purkinje) maintains rhythmic electromechanical coupling.",
    bloodSupply: "Left and right coronary arteries (LCA & RCA)",
    funFact: "Generates its own electrical impulses and can continue beating briefly outside the body if supplied with oxygen.",
    tissue: "Striated cardiac muscle (myocardium) with intercalated discs",
    comparison: "Heart vs. Brain metabolic consumption",
    conditions: [
      "Coronary Artery Disease (CAD)",
      "Myocardial Infarction",
      "Heart Failure (HFrEF/HFpEF)",
      "Atrial Fibrillation",
      "Mitral Valve Regurgitation/Stenosis",
      "Infective Endocarditis",
      "Dilated Cardiomyopathy",
      "Ventricular Septal Defect (VSD)"
    ],
    accent: "#f43f5e",
    available: true,
    illustrations: {
      organ: "/anatomy/heart/organ.webp",
      thumb: "/anatomy/heart/thumb.webp",
      microscopic: "/anatomy/heart/microscopic.webp",
      location: "/anatomy/heart/location.webp",
      compare: "/anatomy/heart/compare.webp"
    },
    hotspots: [
      { id: "aorta", ta: "Aorta", label: "Aorta", detail: "Main systemic trunk delivering oxygenated blood", position: [-0.35, 1.65, 0.55], color: "#ee7c6a" },
      { id: "left-atrium", ta: "Atrium sinistrum", label: "Left Atrium", detail: "Receives pulmonary venous return", position: [0.82, 0.65, 0.5], color: "#f2a33b" },
      { id: "right-atrium", ta: "Atrium dextrum", label: "Right Atrium", detail: "Receives systemic venous return from SVC/IVC", position: [-0.9, 0.35, 0.55], color: "#6393d8" },
      { id: "left-ventricle", ta: "Ventriculus sinister", label: "Left Ventricle", detail: "High-pressure chamber pumping to systemic circulation", position: [0.7, -0.75, 0.65], color: "#f2a33b" },
      { id: "right-ventricle", ta: "Ventriculus dexter", label: "Right Ventricle", detail: "Pumps venous blood into pulmonary artery", position: [-0.65, -0.68, 0.66], color: "#ee7c6a" },
      { id: "mitral", ta: "Valva atrioventricularis sinistra", label: "Mitral Valve", detail: "Bicuspid atrioventricular valve preventing backflow", position: [0.18, -1.35, 0.48], color: "#d89bc4" }
    ]
  },
  {
    id: "brain",
    name: "Brain",
    system: "Nervous System",
    model: "/models/brain.glb",
    scientificName: "Encephalon",
    poetic: "The universe within",
    thumbnail: "/anatomy/brain/thumb.webp",
    description: "The primary control center of the central nervous system, integrating sensory perception, cognitive thought, and motor control.",
    size: "Approx. 1,400 cm³ volume",
    weight: "1.3–1.4 kg",
    location: "Cranial cavity, surrounded by meninges and CSF",
    function: "Processes and coordinates neural signals and consciousness",
    dailyFact: "Consumes ~20% of total basal oxygen and glucose",
    medical: "Over 86 billion neurons interconnected by trillions of synaptic terminals orchestrate neuroplastic circuits.",
    bloodSupply: "Internal carotid arteries & vertebral arteries (Circle of Willis)",
    funFact: "Has no intrinsic nociceptors (pain receptors) — headaches originate in meninges, vessels, and cranial nerves.",
    tissue: "Grey matter (neuronal somas) and white matter (myelinated tracts)",
    comparison: "Brain vs. Eye neural integration",
    conditions: [
      "Ischaemic Stroke & TIA",
      "Intracerebral Haemorrhage",
      "Alzheimer's Disease & Dementia",
      "Epilepsy & Status Epilepticus",
      "Parkinson's Disease",
      "Meningitis & Encephalitis",
      "Traumatic Brain Injury",
      "Multiple Sclerosis"
    ],
    accent: "#a855f7",
    available: true,
    illustrations: {
      organ: "/anatomy/brain/organ.webp",
      thumb: "/anatomy/brain/thumb.webp",
      microscopic: "/anatomy/brain/microscopic.webp",
      location: "/anatomy/brain/location.webp",
      compare: "/anatomy/brain/compare.webp"
    },
    hotspots: [
      { id: "frontal", ta: "Lobus frontalis", label: "Frontal Lobe", detail: "Executive function, motor cortex, speech (Broca's area)", position: [-0.7, 0.65, 0.8], color: "#ee7c6a" },
      { id: "parietal", ta: "Lobus parietalis", label: "Parietal Lobe", detail: "Somatosensory cortex, spatial cognition, language", position: [0.15, 1.1, 0.65], color: "#f2a33b" },
      { id: "temporal", ta: "Lobus temporalis", label: "Temporal Lobe", detail: "Auditory processing, memory encoding (hippocampus)", position: [0.75, -0.1, 0.82], color: "#6393d8" },
      { id: "cerebellum", ta: "Cerebellum", label: "Cerebellum", detail: "Coordination, fine motor tuning, and vestibular balance", position: [0.72, -0.9, 0.55], color: "#d89bc4" }
    ]
  },
  {
    id: "lungs",
    name: "Lungs",
    system: "Respiratory System",
    model: "/models/lungs.glb",
    scientificName: "Pulmones",
    poetic: "The breath of life",
    thumbnail: "/anatomy/lungs/thumb.webp",
    description: "Paired respiratory organs executing blood gas exchange through millions of microscopic alveolar capillary units.",
    size: "Approx. 25 cm height each",
    weight: "Right ~620 g, Left ~570 g",
    location: "Thoracic cavity, lateral to mediastinum",
    function: "External respiration (oxygen uptake, CO₂ elimination)",
    dailyFact: "Ventilates ~11,000 L of air through ~20,000 breaths daily",
    medical: "Alveoli create an estimated 70–100 m² alveolar-capillary membrane surface area.",
    bloodSupply: "Pulmonary circulation (gas exchange) & Bronchial arteries (nutrition)",
    funFact: "The right lung has three lobes while the left has only two, accommodating the cardiac notch.",
    tissue: "Simple squamous alveolar epithelium (Type I & Type II pneumocytes)",
    comparison: "Lungs vs. Heart cardiopulmonary coupling",
    conditions: [
      "Chronic Obstructive Pulmonary Disease (COPD)",
      "Bronchial Asthma",
      "Community-Acquired Pneumonia",
      "Pulmonary Embolism (PE)",
      "Pulmonary Tuberculosis",
      "Pleural Effusion & Pneumothorax",
      "Idiopathic Pulmonary Fibrosis",
      "Acute Respiratory Distress Syndrome (ARDS)"
    ],
    accent: "#06b6d4",
    available: true,
    illustrations: {
      organ: "/anatomy/lungs/organ.webp",
      thumb: "/anatomy/lungs/thumb.webp",
      microscopic: "/anatomy/lungs/microscopic.webp",
      location: "/anatomy/lungs/location.webp",
      compare: "/anatomy/lungs/compare.webp"
    },
    hotspots: [
      { id: "trachea", ta: "Trachea", label: "Trachea", detail: "Cartilaginous windpipe branching into principal bronchi", position: [0, 1.6, 0.2], color: "#6393d8" },
      { id: "right-lung", ta: "Pulmo dexter", label: "Right Lung", detail: "Three lobes (superior, middle, inferior) divided by fissures", position: [-1.2, 0.1, 0.7], color: "#ee7c6a" },
      { id: "left-lung", ta: "Pulmo sinister", label: "Left Lung", detail: "Two lobes with cardiac notch and lingula", position: [1.2, 0.1, 0.7], color: "#f2a33b" },
      { id: "bronchus", ta: "Bronchus principalis", label: "Principal Bronchi", detail: "Primary airways entering the pulmonary hilum", position: [-0.03, 0.3, 0.35], color: "#d89bc4" },
      { id: "base", ta: "Basis pulmonis", label: "Lung Base", detail: "Diaphragmatic surface conforming to thoracic diaphragm", position: [-1.14, -1.2, 1], color: "#7fa88a" }
    ]
  },
  {
    id: "liver",
    name: "Liver",
    system: "Digestive System",
    model: "/models/liver.glb",
    scientificName: "Hepar",
    poetic: "The quiet alchemist",
    thumbnail: "/anatomy/liver/thumb.webp",
    description: "The largest internal metabolic and exocrine organ, performing bile production, glycogen storage, and drug biotransformation.",
    size: "Approx. 21–23 cm transverse diameter",
    weight: "1.4–1.6 kg",
    location: "Right hypochondrium and epigastrium, under right hemidiaphragm",
    function: "Detoxification, protein synthesis, carbohydrate metabolism, bile secretion",
    dailyFact: "Carries out over 500 vital biochemical functions continuously",
    medical: "Hepatocytes can regenerate substantial resected or injured parenchyma via hepatocyte hyperplasia.",
    bloodSupply: "Dual supply: 75% Portal Vein (nutrient-rich), 25% Hepatic Artery (oxygen-rich)",
    funFact: "Can regenerate back to full functioning mass from as little as 25–30% of healthy tissue.",
    tissue: "Classical hepatic lobules with central vein, sinusoids, and portal triads",
    comparison: "Liver vs. Intestine enterohepatic axis",
    conditions: [
      "Metabolic Dysfunction-Associated Steatohepatitis (MASH)",
      "Viral Hepatitis (A, B, C, D, E)",
      "Cirrhosis & Portal Hypertension",
      "Hepatocellular Carcinoma (HCC)",
      "Cholelithiasis & Choledocholithiasis",
      "Hepatic Encephalopathy",
      "Drug-Induced Liver Injury (DILI)",
      "Haemochromatosis & Wilson's Disease"
    ],
    accent: "#eab308",
    available: true,
    illustrations: {
      organ: "/anatomy/liver/organ.webp",
      thumb: "/anatomy/liver/thumb.webp",
      microscopic: "/anatomy/liver/microscopic.webp",
      location: "/anatomy/liver/location.webp",
      compare: "/anatomy/liver/compare.webp"
    },
    hotspots: [
      { id: "right-lobe", ta: "Lobus hepatis dexter", label: "Right Lobe", detail: "Largest anatomic lobe, divided into segments V-VIII", position: [-0.75, 0.35, 0.75], color: "#ee7c6a" },
      { id: "left-lobe", ta: "Lobus hepatis sinister", label: "Left Lobe", detail: "Extends across epigastrium into segments II-IV", position: [0.85, 0.25, 0.75], color: "#f2a33b" },
      { id: "portal", ta: "Vena portae hepatis", label: "Portal Vein", detail: "Transports absorbed intestinal nutrients into hepatic sinusoids", position: [0.1, -0.3, 0.82], color: "#6393d8" }
    ]
  },
  {
    id: "kidneys",
    name: "Kidneys",
    system: "Urinary System",
    model: "/models/kidneys.glb",
    scientificName: "Renes",
    poetic: "The master filters",
    thumbnail: "/anatomy/kidneys/thumb.webp",
    description: "Retroperitoneal paired organs maintaining electrolyte homeodynamics, acid-base equilibrium, fluid balance, and blood pressure.",
    size: "10–12 cm length × 5–7 cm width",
    weight: "120–170 g each",
    location: "Retroperitoneal, T12–L3 vertebral levels on posterior abdominal wall",
    function: "Glomerular filtration, tubular reabsorption/secretion, erythropoietin production",
    dailyFact: "Filters ~180 litres of plasma daily, reabsorbing >99% back into circulation",
    medical: "Houses roughly 1 to 1.2 million microscopic functional nephrons in each renal unit.",
    bloodSupply: "Renal arteries receiving ~20–25% of cardiac output at rest",
    funFact: "Right kidney sits slightly lower than the left due to the mass of the overlying liver.",
    tissue: "Renal cortex (glomeruli/convoluted tubules) and medullary pyramids (loops of Henle/collecting ducts)",
    comparison: "Kidneys vs. Liver excretory balance",
    conditions: [
      "Acute Kidney Injury (AKI)",
      "Chronic Kidney Disease (CKD)",
      "Diabetic Nephropathy",
      "Nephrolithiasis (Renal Calculi)",
      "Glomerulonephritis (e.g. IgA, Post-strep)",
      "Polycystic Kidney Disease (ADPKD)",
      "Pyelonephritis",
      "Renal Cell Carcinoma"
    ],
    accent: "#10b981",
    available: true,
    illustrations: {
      organ: "/anatomy/kidneys/organ.webp",
      thumb: "/anatomy/kidneys/thumb.webp",
      microscopic: "/anatomy/kidneys/microscopic.webp",
      location: "/anatomy/kidneys/location.webp",
      compare: "/anatomy/kidneys/compare.webp"
    },
    hotspots: [
      { id: "cortex", ta: "Cortex renalis", label: "Renal Cortex", detail: "Outer functional layer containing renal corpuscles", position: [-0.9, 0.55, 0.7], color: "#ee7c6a" },
      { id: "medulla", ta: "Medulla renalis", label: "Renal Medulla", detail: "Inner pyramids establishing hypertonic countercurrent gradient", position: [0.85, 0.2, 0.7], color: "#f2a33b" },
      { id: "ureter", ta: "Ureter", label: "Ureter", detail: "Muscular duct channeling urine peristaltically to urinary bladder", position: [0.4, -1.1, 0.5], color: "#6393d8" }
    ]
  },
  {
    id: "eyeball",
    name: "Eye",
    system: "Sensory System",
    model: "/models/eyeball.glb",
    scientificName: "Oculus",
    poetic: "A window made of light",
    thumbnail: "/anatomy/eyeball/thumb.webp",
    description: "Specialized photoreceptive sensory organ focusing photons onto the neurosensory retina for cortical vision.",
    size: "Approx. 24 mm anteroposterior diameter",
    weight: "Approx. 7.5 g",
    location: "Orbital cavity, cushioned by retrobulbar adipose tissue",
    function: "Phototransduction and primary visual sensation",
    dailyFact: "Executes over 100,000 saccadic and smooth pursuit movements daily",
    medical: "The retina contains ~120 million rods and ~6 million cones converting light into electrical action potentials.",
    bloodSupply: "Ophthalmic artery (branch of internal carotid) & Central retinal artery",
    funFact: "The cornea is avascular, receiving oxygen directly from tears and ambient atmospheric air.",
    tissue: "Fibrous tunic (sclera/cornea), vascular uvea (iris/ciliary/choroid), and neural retina",
    comparison: "Eye vs. Brain visual cortex mapping",
    conditions: [
      "Cataract",
      "Glaucoma (Open-angle / Closed-angle)",
      "Diabetic Retinopathy",
      "Age-Related Macular Degeneration (AMD)",
      "Retinal Detachment",
      "Refractive Errors (Myopia, Hyperopia, Astigmatism)",
      "Corneal Ulceration & Keratitis",
      "Uveitis"
    ],
    accent: "#38bdf8",
    available: true,
    illustrations: {
      organ: "/anatomy/eyeball/organ.webp",
      thumb: "/anatomy/eyeball/thumb.webp",
      microscopic: "/anatomy/eyeball/microscopic.webp",
      location: "/anatomy/eyeball/location.webp",
      compare: "/anatomy/eyeball/compare.webp"
    },
    hotspots: [
      { id: "cornea", ta: "Cornea", label: "Cornea", detail: "Transparent anterior refractive dome providing ~70% dioptric power", position: [-0.94, 0.05, 1.47], color: "#6393d8" },
      { id: "iris", ta: "Iris", label: "Iris", detail: "Contractile pigmented diaphragm regulating pupillary aperture", position: [-1.22, -0.53, 1.15], color: "#f2a33b" },
      { id: "optic", ta: "Nervus opticus", label: "Optic Nerve (CN II)", detail: "Axonal bundle conveying retinal signals to lateral geniculate nucleus", position: [1.61, -0.18, 0.54], color: "#d89bc4" }
    ]
  },
  {
    id: "intestine",
    name: "Intestine",
    system: "Digestive System",
    model: "/models/intestine.glb",
    scientificName: "Intestinum",
    poetic: "The inner garden",
    thumbnail: "/anatomy/intestine/thumb.webp",
    description: "Convoluted tubular gastrointestinal tract carrying out enzymatic breakdown, nutrient assimilation, water resorption, and microbial fermentation.",
    size: "Small intestine ~6 m; Large intestine ~1.5 m",
    weight: "Approx. 1.8–2.2 kg empty",
    location: "Central and lower abdominal/pelvic cavities",
    function: "Digestive transit, macronutrient absorption, immunologic surveillance, microbiome habitat",
    dailyFact: "Houses over 38 trillion commensal microorganisms comprising the gut microbiome",
    medical: "Gut-associated lymphoid tissue (GALT / Peyer's patches) forms the body's largest immune sentinel station.",
    bloodSupply: "Superior mesenteric artery (SMA) & Inferior mesenteric artery (IMA)",
    funFact: "Its epithelial lining turns over completely every 4–5 days, representing the fastest cell turnover in human tissue.",
    tissue: "Mucosa with villi and crypts of Lieberkühn, circular/longitudinal muscularis externa",
    comparison: "Intestine vs. Liver portal circulation",
    conditions: [
      "Inflammatory Bowel Disease (Crohn's Disease / Ulcerative Colitis)",
      "Irritable Bowel Syndrome (IBS)",
      "Acute Appendicitis",
      "Intestinal Obstruction & Volvulus",
      "Celiac Disease",
      "Colorectal Adenocarcinoma",
      "Diverticular Disease",
      "Gastroenteritis & Enteric Infections"
    ],
    accent: "#fb923c",
    available: true,
    illustrations: {
      organ: "/anatomy/intestine/organ.webp",
      thumb: "/anatomy/intestine/thumb.webp",
      microscopic: "/anatomy/intestine/microscopic.webp",
      location: "/anatomy/intestine/location.webp",
      compare: "/anatomy/intestine/compare.webp"
    },
    hotspots: [
      { id: "duodenum", ta: "Duodenum", label: "Duodenum", detail: "C-shaped initial segment receiving pancreatic enzymes and bile", position: [0.6, 0.8, 0.75], color: "#f2a33b" },
      { id: "jejunum", ta: "Jejunum", label: "Jejunum", detail: "Primary vascularized zone for nutrient and vitamin absorption", position: [-0.45, 0.1, 0.82], color: "#ee7c6a" },
      { id: "colon", ta: "Colon", label: "Colon", detail: "Large bowel responsible for water reclamation and faecal consolidation", position: [0.75, -0.55, 0.72], color: "#6393d8" }
    ]
  },
  {
    id: "pancreas",
    name: "Pancreas",
    system: "Endocrine & Digestive System",
    model: "/models/pancreas.glb",
    scientificName: "Pancreas",
    poetic: "The quiet regulator",
    thumbnail: "/anatomy/pancreas/thumb.webp",
    description: "Retroperitoneal dual-function gland secreting digestive proenzymes into the duodenum and glucose-regulating hormones into blood.",
    size: "Approx. 12–15 cm long",
    weight: "70–100 g",
    location: "Retroperitoneal, posterior to stomach, nestled in duodenal loop",
    function: "Exocrine enzyme synthesis (lipase, amylase, proteases) and endocrine glucose regulation (insulin, glucagon)",
    dailyFact: "Produces 1.2–1.5 L of bicarbonate-rich pancreatic juice daily",
    medical: "Endocrine Islets of Langerhans (beta, alpha, delta cells) maintain tight systemic glycaemic homeostasis.",
    bloodSupply: "Splenic artery, superior and inferior pancreaticoduodenal arteries",
    funFact: "Exocrine tissue constitutes >98% of total pancreatic mass; hormone-producing islets make up less than 2%.",
    tissue: "Serous acini with zymogen granules and interlobular Islets of Langerhans",
    comparison: "Pancreas vs. Liver carbohydrate regulation",
    conditions: [
      "Acute Pancreatitis",
      "Chronic Pancreatitis",
      "Type 1 & Type 2 Diabetes Mellitus",
      "Pancreatic Ductal Adenocarcinoma (PDAC)",
      "Pancreatic Exocrine Insufficiency (PEI)",
      "Pancreatic Pseudocyst",
      "Neuroendocrine Tumours (Insulinoma, Gastrinoma)",
      "Cystic Fibrosis Pancreatic Involvement"
    ],
    accent: "#f59e0b",
    available: true,
    illustrations: {
      organ: "/anatomy/pancreas/organ.webp",
      thumb: "/anatomy/pancreas/thumb.webp",
      microscopic: "/anatomy/pancreas/microscopic.webp",
      location: "/anatomy/pancreas/location.webp",
      compare: "/anatomy/pancreas/compare.webp"
    },
    hotspots: [
      { id: "head", ta: "Caput pancreatis", label: "Pancreatic Head", detail: "Medial expanded portion cradled in the duodenal sweep", position: [-1.32, -0.36, 0.55], color: "#ee7c6a" },
      { id: "body", ta: "Corpus pancreatis", label: "Pancreatic Body", detail: "Central segment traversing anterior to the abdominal aorta", position: [0.05, 0.25, 0.45], color: "#f2a33b" },
      { id: "tail", ta: "Cauda pancreatis", label: "Pancreatic Tail", detail: "Tapered lateral end abutting the splenic hilum", position: [1.55, 0.3, 0.35], color: "#6393d8" },
      { id: "duct", ta: "Ductus pancreaticus", label: "Main Pancreatic Duct (Wirsung)", detail: "Conveys exocrine secretion to ampulla of Vater", position: [-0.61, 0.39, 0.5], color: "#d89bc4" }
    ]
  },
  {
    id: "skin",
    name: "Skin",
    system: "Integumentary System",
    model: "/models/skin.glb",
    scientificName: "Integumentum",
    poetic: "The living boundary",
    thumbnail: "/anatomy/skin/thumb.webp",
    description: "The body's largest organ, forming a multilayered protective barrier that senses stimuli, prevents desiccation, and thermoregulates.",
    size: "Approx. 1.8–2.0 m² surface area",
    weight: "3.5–5 kg (~16% of body mass)",
    location: "External body surface continuous with mucosal orifices",
    function: "Physical barrier, thermoregulation, tactile sensation, vitamin D synthesis",
    dailyFact: "Sheds 30,000–40,000 dead keratinocytes per minute (~4 kg in a lifetime)",
    medical: "Comprises stratified keratinized epidermis, dense irregular fibrous dermis, and subcutaneous hypodermal fat.",
    bloodSupply: "Extensive cutaneous vascular plexuses (deep and superficial)",
    funFact: "A single square centimetre contains ~100 sweat glands, 15 sebaceous glands, and meters of microvessels.",
    tissue: "Stratified squamous keratinizing epithelium over fibroelastic dermis",
    comparison: "Skin vs. Intestine mucosal vs cutaneous barrier",
    conditions: [
      "Atopic Dermatitis (Eczema)",
      "Psoriasis Vulgaris",
      "Malignant Melanoma & Non-Melanoma Skin Cancers (BCC/SCC)",
      "Burns (Partial & Full Thickness)",
      "Cellulitis & Erysipelas",
      "Acne Vulgaris",
      "Stevens-Johnson Syndrome (SJS / TEN)",
      "Vitiligo & Alopecia"
    ],
    accent: "#ec4899",
    available: true,
    illustrations: {
      organ: "/anatomy/skin/organ.webp",
      thumb: "/anatomy/skin/thumb.webp",
      microscopic: "/anatomy/skin/microscopic.webp",
      location: "/anatomy/skin/location.webp",
      compare: "/anatomy/skin/compare.webp"
    },
    hotspots: [
      { id: "epidermis", ta: "Epidermis", label: "Epidermis", detail: "Avascular superficial stratum with keratinocytes and melanocytes", position: [-0.05, 0.88, 1.4], color: "#ee7c6a" },
      { id: "dermis", ta: "Dermis", label: "Dermis", detail: "Collagenous structural layer with nerves, vessels, and skin appendages", position: [0.29, 0.05, 1.4], color: "#f2a33b" },
      { id: "hypodermis", ta: "Tela subcutanea", label: "Hypodermis", detail: "Subcutaneous adipose connective tissue providing insulation and cushioning", position: [-0.39, -1.15, 1.4], color: "#6393d8" },
      { id: "follicle", ta: "Folliculus pili", label: "Hair Follicle Unit", detail: "Pilosebaceous apparatus with arrector pili muscle", position: [0.89, -0.44, 1.4], color: "#d89bc4" }
    ]
  },
  {
    id: "human_body",
    name: "Full Body Framework",
    system: "Full Body Anatomy",
    model: "/models/human_body.glb",
    scientificName: "Corpus Humanum",
    poetic: "The architectural synthesis",
    thumbnail: "/anatomy/regional_male.webp",
    description: "Complete systemic framework demonstrating spatial relationships between skeletal, muscular, visceral, and nervous architecture.",
    size: "Standard anatomical proportion (175 cm)",
    weight: "Full anatomical scale",
    location: "Global anatomical coordinates",
    function: "Integrates all twelve organ systems into a unified functional organism",
    dailyFact: "Coordinates autonomic balance and systemic homeostasis continuously",
    medical: "Based on the international open anatomical standard BodyParts3D and Z-Anatomy.",
    bloodSupply: "Systemic and pulmonary cardiovascular networks",
    funFact: "The human skeleton replaces itself completely roughly once every ten years through bone remodelling.",
    tissue: "Integrated systemic tissues (epithelial, connective, muscular, nervous)",
    comparison: "Full Body Systemic Integration",
    conditions: [
      "Polytrauma & Emergency Triage",
      "Systemic Inflammatory Response Syndrome (SIRS)",
      "Septic Shock",
      "Multisystem Organ Failure",
      "Systemic Lupus Erythematosus (SLE)",
      "Amyloidosis",
      "Metabolic Syndrome",
      "Anaphylaxis"
    ],
    accent: "#6366f1",
    available: true,
    hotspots: [
      { id: "cranium", ta: "Cranium", label: "Cranium & Encephalon", detail: "Protects cerebral hemispheres and sensory organs", position: [0, 1.6, 0.1], color: "#a855f7" },
      { id: "thorax", ta: "Thorax", label: "Thoracic Cage", detail: "Houses cardiopulmonary apparatus within protective ribs", position: [0, 0.8, 0.2], color: "#f43f5e" },
      { id: "abdomen", ta: "Abdomen", label: "Abdominal Viscera", detail: "Contains digestive, hepatic, and renal organs", position: [0, 0.1, 0.15], color: "#eab308" },
      { id: "pelvis", ta: "Pelvis", label: "Pelvic Girdle", detail: "Supports visceral loads and anchors lower extremity biomechanics", position: [0, -0.4, 0.1], color: "#10b981" }
    ]
  }
];

export const ALL_BODY_SYSTEMS = [
  "All Systems",
  "Cardiovascular System",
  "Nervous System",
  "Respiratory System",
  "Digestive System",
  "Urinary System",
  "Sensory System",
  "Endocrine & Digestive System",
  "Integumentary System",
  "Full Body Anatomy"
];
