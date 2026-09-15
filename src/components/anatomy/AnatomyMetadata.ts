import { AnatomicalSystemId, AnatomicalRegion, AnatomicalStructure } from '../../types/anatomy';

export interface ExtendedAnatomyMetadata extends Partial<AnatomicalStructure> {
  id: string;
  name: string;
  system: AnatomicalSystemId;
  region: AnatomicalRegion;
  aliases: string[];
  ta2_latin: string;
  subsystem?: string;
  nerveSupply?: string;
  lymphaticDrainage?: string;
  clinicalSignificance?: string;
  examNotes?: string;
  ospeQuestion?: {
    question: string;
    answer: string;
    vivaPoints: string[];
  };
  clinicalScenario?: {
    disease: string;
    presentation: string;
    mechanism: string;
    treatmentPearl: string;
  };
}

export const ANATOMY_METADATA_REGISTRY: Record<string, ExtendedAnatomyMetadata> = {

  // 1. Cardiovascular System
  heart: {
    id: 'heart',
    name: 'Heart',
    latinName: 'Cor',
    ta2_latin: 'Cor humanum',
    system: 'cardiovascular',
    region: 'thorax',
    aliases: ['cor', 'cardiac', 'myocardium', 'cardiac organ', 'pericardium'],
    category: 'Cardiovascular Organ',
    location: 'Middle mediastinum, resting on the central tendon of the diaphragm',
    structureDescription: 'Conical hollow muscular organ with four chambers that powers systemic and pulmonary circulation.',
    function: 'Pumps oxygenated blood to systemic tissues and deoxygenated blood to the lungs.',
    bloodSupply: 'Right and Left Coronary Arteries (arising from aortic sinuses)',
    venousDrainage: 'Coronary sinus draining into the Right Atrium',
    nerveSupply: 'Cardiac plexus (sympathetic T1-T4, parasympathetic Vagus nerve CN X)',
    lymphaticDrainage: 'Tracheobronchial and anterior mediastinal lymph nodes',
    meshIds: ['Heart', 'Cardiovascular', 'Myocardium'],
    clinicalSignificance: 'Myocardial infarction due to coronary artery occlusion; cardiac tamponade; infective endocarditis.',
    examNotes: 'MBBS Viva: Bound by fibrous pericardium. Right border formed by SVC, RA, IVC. Apex formed by LV at left 5th intercostal space mid-clavicular line.',
    ospeQuestion: {
      question: 'Identify the marked conical apex of the heart and name its surface landmark.',
      answer: 'Apex of the Heart. Located in the left 5th intercostal space, 9cm (or 3.5 inches) from the midsternal line.',
      vivaPoints: ['Formed entirely by the left ventricle', 'Point of maximum impulse (PMI)', 'Auscultatory area for the mitral valve']
    },
    clinicalScenario: {
      disease: 'Acute Myocardial Infarction (STEMI)',
      presentation: 'Crushing substernal chest pain radiating to the left arm and jaw, diaphoresis, dyspnea.',
      mechanism: 'Atheromatous plaque rupture in coronary artery resulting in acute thrombosis and transmural ischemia.',
      treatmentPearl: 'Immediate primary PCI within 90 minutes or thrombolysis (Alteplase/Tenecteplase) within 30 minutes.'
    }
  },

  aorta: {
    id: 'aorta',
    name: 'Aorta',
    latinName: 'Aorta thoracica',
    ta2_latin: 'Aorta ascendens et Arcus aortae',
    system: 'cardiovascular',
    region: 'thorax',
    aliases: ['ascending aorta', 'aortic arch', 'descending aorta', 'thoracic aorta'],
    category: 'Great Vessel',
    location: 'Superior and posterior mediastinum, originating from the left ventricle at the aortic orifice',
    structureDescription: 'Main trunk of systemic arterial circulation, subdivided into ascending aorta, aortic arch, and descending thoracic aorta.',
    function: 'Distributes oxygen-rich blood from the left ventricle at high pressure to all systemic capillary beds.',
    bloodSupply: 'Vasa vasorum',
    venousDrainage: 'Vasa vasorum into azygos and hemiazygos veins',
    nerveSupply: 'Aortic plexus and baroreceptor fibers of CN X (Vagus)',
    meshIds: ['Aorta', 'Arcus_aortae', 'Arteria_aorta'],
    clinicalSignificance: 'Aortic dissection (Stanford Type A vs B); aortic aneurysm; coarctation of aorta in Turner syndrome.',
    examNotes: 'MBBS Viva: Branches of aortic arch: Brachiocephalic artery, Left Common Carotid, Left Subclavian artery. Sternal angle (T4/T5) marks start and end of aortic arch.',
    ospeQuestion: {
      question: 'Name the three major arterial branches originating directly from the marked aortic arch.',
      answer: '1. Brachiocephalic trunk, 2. Left common carotid artery, 3. Left subclavian artery.',
      vivaPoints: ['Ligamentum arteriosum attaches inferior surface to pulmonary trunk', 'Left recurrent laryngeal nerve hooks beneath arch']
    }
  },

  // 2. Respiratory System
  lungs: {
    id: 'lungs',
    name: 'Lungs & Tracheobronchial Tree',
    latinName: 'Pulmones',
    ta2_latin: 'Pulmo dexter et sinister',
    system: 'respiratory',
    region: 'thorax',
    aliases: ['pulmo', 'pulmones', 'respiratory organs', 'bronchi', 'lung lobes'],
    category: 'Respiratory Organ',
    location: 'Pleural cavities of the thoracic cavity on either side of the mediastinum',
    structureDescription: 'Spongy, paired cone-shaped organs of respiration. Right lung has 3 lobes; Left lung has 2 lobes and a cardiac notch.',
    function: 'Gas exchange: oxygenates pulmonary capillary blood and excretes carbon dioxide.',
    bloodSupply: 'Bronchial arteries (nutrition to parenchyma) and Pulmonary arteries (functional gas exchange)',
    venousDrainage: 'Pulmonary veins (into Left Atrium) and Bronchial veins (into Azygos/Hemiazygos)',
    nerveSupply: 'Pulmonary plexus (sympathetic dilation, parasympathetic bronchoconstriction via Vagus)',
    meshIds: ['Lungs', 'Pulmo', 'Bronchi', 'Trachea'],
    clinicalSignificance: 'Pneumothorax, lobar pneumonia, chronic obstructive pulmonary disease (COPD), bronchogenic carcinoma.',
    examNotes: 'MBBS Viva: Right lung has 10 bronchopulmonary segments, horizontal and oblique fissures. Left lung has 8-10 segments and lingula.',
    ospeQuestion: {
      question: 'Identify the marked fissure on the right lung separating the superior and middle lobes.',
      answer: 'Horizontal fissure of the right lung (runs horizontally along the 4th costal cartilage).',
      vivaPoints: ['Right lung has 3 lobes (Superior, Middle, Inferior)', 'Eparterial bronchus is unique to right lung root']
    }
  },

  // 3. Digestive System
  liver: {
    id: 'liver',
    name: 'Liver',
    latinName: 'Hepar',
    ta2_latin: 'Hepar humanum',
    system: 'digestive',
    region: 'abdomen',
    aliases: ['hepar', 'hepatic organ', 'hepatic lobes'],
    category: 'Digestive & Metabolic Gland',
    location: 'Right hypochondrium and epigastrium, extending into the left hypochondrium below the diaphragm',
    structureDescription: 'Largest internal organ and gland in the body, with anatomically defined right, left, quadrate, and caudate lobes.',
    function: 'Bile production, glycogen storage, plasma protein synthesis, and detoxification of metabolic byproducts.',
    bloodSupply: 'Dual supply: Portal vein (75% volume, nutrient-rich) and Hepatic artery proper (25% volume, oxygen-rich)',
    venousDrainage: 'Hepatic veins (Right, Middle, Left) directly draining into Inferior Vena Cava (IVC)',
    nerveSupply: 'Hepatic plexus (sympathetic from celiac plexus, parasympathetic from vagal trunks)',
    meshIds: ['Liver', 'Hepar', 'Digestive'],
    clinicalSignificance: 'Cirrhosis with portal hypertension, hepatocellular carcinoma, amoebic liver abscess, viral hepatitis.',
    examNotes: 'MBBS Viva: Couinaud functional classification divides liver into 8 independent segments based on portal triads. Bare area of liver is in direct contact with diaphragm without peritoneum.',
    ospeQuestion: {
      question: 'Identify the marked visceral surface structure transmitting the hepatic artery, portal vein, and bile duct.',
      answer: 'Porta Hepatis (hilum of the liver).',
      vivaPoints: ['Arrangement anterior to posterior: Bile duct, Hepatic artery, Portal vein (D-A-V)', 'Contained within free margin of lesser omentum']
    }
  },

  stomach: {
    id: 'stomach',
    name: 'Stomach',
    latinName: 'Gaster / Ventriculus',
    ta2_latin: 'Gaster',
    system: 'digestive',
    region: 'abdomen',
    aliases: ['gaster', 'gastric', 'ventriculus', 'stomach mucosa'],
    category: 'Digestive Hollow Viscus',
    location: 'Left hypochondriac, epigastric, and umbilical regions of the abdomen',
    structureDescription: 'J-shaped muscular dilated reservoir between the esophagus and duodenum, featuring fundus, body, antrum, and pylorus.',
    function: 'Mechanical and chemical digestion of food into acid chyme via pepsin, HCl, and gastric lipase.',
    bloodSupply: 'Right and left gastric, right and left gastroepiploic, and short gastric arteries (all from Celiac Trunk)',
    venousDrainage: 'Directly or indirectly into Portal Vein',
    nerveSupply: 'Anterior and posterior Vagal trunks (CN X) and Celiac sympathetic plexus',
    meshIds: ['Stomach', 'Gaster'],
    clinicalSignificance: 'Peptic ulcer disease (H. pylori or NSAIDs), gastric adenocarcinoma, pyloric stenosis in infants.',
    examNotes: 'MBBS Viva: Lesser curvature is attached to lesser omentum; Greater curvature gives origin to greater omentum. Stomach bed structures: pancreas, spleen, left kidney, left suprarenal gland.',
    ospeQuestion: {
      question: 'Identify the marked thick muscular ring at the junction of the stomach and duodenum.',
      answer: 'Pyloric sphincter (Pylorus).',
      vivaPoints: ['Palpable olive-like mass in congenital hypertrophic pyloric stenosis', 'Supplied by pyloric branches of gastroduodenal artery']
    }
  },

  // 4. Urinary System
  kidneys: {
    id: 'kidneys',
    name: 'Kidneys',
    latinName: 'Renes',
    ta2_latin: 'Ren dexter et sinister',
    system: 'urinary',
    region: 'abdomen',
    aliases: ['ren', 'renes', 'renal', 'renal organ', 'kidney'],
    category: 'Urinary Organ',
    location: 'Retroperitoneal on the posterior abdominal wall on each side of the vertebral column (T12-L3)',
    structureDescription: 'Bean-shaped excretory organs encased in fibrous renal capsule, perirenal fat, and Gerota renal fascia.',
    function: 'Filters metabolic waste, regulates electrolyte balance, controls blood pressure via RAAS, produces erythropoietin.',
    bloodSupply: 'Right and Left Renal Arteries directly from Abdominal Aorta',
    venousDrainage: 'Renal veins draining directly into Inferior Vena Cava (Left renal vein crosses anterior to aorta)',
    nerveSupply: 'Renal plexus derived from celiac and abdominopelvic splanchnic nerves',
    meshIds: ['Kidneys', 'Ren', 'Renal'],
    clinicalSignificance: 'Renal calculi (nephrolithiasis), chronic kidney disease (CKD), polycystic kidney disease, renal cell carcinoma.',
    examNotes: 'MBBS Viva: Right kidney is lower than left due to the liver. Renal hilum arrangement from anterior to posterior: Renal Vein, Renal Artery, Renal Pelvis (V-A-P).',
    ospeQuestion: {
      question: 'Identify the marked structure at the renal hilum transmitting urine to the urinary bladder.',
      answer: 'Renal Pelvis / Ureter.',
      vivaPoints: ['Arrangement at hilum: Vein, Artery, Pelvis (anterior to posterior)', '3 anatomical constrictions where calculi frequently lodge']
    }
  },

  // 5. Skeletal System
  skeleton: {
    id: 'skeleton',
    name: 'Skeletal Framework',
    latinName: 'Systema skeletale',
    ta2_latin: 'Skeleton humanum',
    system: 'skeletal',
    region: 'whole-body',
    aliases: ['bones', 'axial skeleton', 'appendicular skeleton', 'skull', 'ribcage', 'vertebral column'],
    category: 'Skeletal Framework',
    location: 'Central axial axis and appendicular limbs supporting the entire body',
    structureDescription: 'Rigid framework composed of 206 articulated cortical bones, axial vertebrae, skull, ribcage, and limb girdles.',
    function: 'Mechanical protection of vital organs, structural locomotion, calcium homeostasis, and hematopoiesis in marrow.',
    bloodSupply: 'Nutrient arteries and periosteal vascular network',
    venousDrainage: 'Emissary, nutrient, and periosteal veins',
    nerveSupply: 'Periosteal sensory nerves (intensely pain-sensitive)',
    meshIds: ['Skeleton', 'Skeletal', 'Bone', 'Bones'],
    clinicalSignificance: 'Osteoporosis, fractures (Colles, neck of femur), osteomyelitis, osteosarcoma, rickets.',
    examNotes: 'MBBS Viva: 33 vertebrae (7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, 4 fused coccygeal). Pterion of skull overlies anterior branch of middle meningeal artery.',
    ospeQuestion: {
      question: 'Identify the marked bony suture junction on the lateral skull and state its clinical danger.',
      answer: 'Pterion (junction of frontal, parietal, sphenoid, and temporal bones). Fracture risks epidural hematoma from middle meningeal artery laceration.',
      vivaPoints: ['H-shaped junction', 'Overlies anterior division of middle meningeal artery', 'Thin bone easily fractured by lateral temple blows']
    }
  },

  // 6. Muscular System
  muscles: {
    id: 'muscles',
    name: 'Muscular System',
    latinName: 'Systema musculare',
    ta2_latin: 'Musculi skeletales',
    system: 'muscular',
    region: 'whole-body',
    aliases: ['muscles', 'musculature', 'striated muscles', 'skeletal muscles'],
    category: 'Musculoskeletal System',
    location: 'Attached to bones via tendons throughout head, neck, trunk, and extremities',
    structureDescription: 'Over 600 voluntary skeletal muscles composed of striated contractile fibers organized into motor units.',
    function: 'Generates joint movements, stabilizes posture, maintains core stability, and produces body heat.',
    bloodSupply: 'Segmental muscular arteries with rich anastomotic capillary beds',
    venousDrainage: 'Venae comitantes accompanying muscular arteries',
    nerveSupply: 'Somatic motor innervation from cranial and spinal alpha motor neurons',
    meshIds: ['Muscular', 'Muscles', 'Musculi'],
    clinicalSignificance: 'Compartment syndrome, muscular dystrophies (Duchenne), myasthenia gravis, tendon ruptures.',
    examNotes: 'MBBS Viva: Rotator cuff muscles (SITS): Supraspinatus, Infraspinatus, Teres minor, Subscapularis. Deltoid muscle is innervated by Axillary nerve (C5, C6).',
    ospeQuestion: {
      question: 'Identify the marked shoulder muscle and state its nerve supply and primary action.',
      answer: 'Deltoid Muscle. Innervated by the Axillary Nerve (C5, C6). Initiates powerful abduction of the arm from 15° to 90°.',
      vivaPoints: ['Supraspinatus initiates first 0°-15° of abduction', 'Intramuscular injection site in its middle third']
    }
  },

  // 7. Nervous System
  brain: {
    id: 'brain',
    name: 'Brain & Central Nervous System',
    latinName: 'Encephalon',
    ta2_latin: 'Encephalon et Medulla spinalis',
    system: 'nervous',
    region: 'head-neck',
    aliases: ['brain', 'cerebrum', 'cerebellum', 'brainstem', 'cns', 'encephalon'],
    category: 'Neuroanatomy Central Organ',
    location: 'Cranial cavity within the skull, continuous inferiorly with the spinal cord at foramen magnum',
    structureDescription: 'Complex organ of nervous tissue consisting of cerebrum (cerebral hemispheres), diencephalon, cerebellum, and brainstem.',
    function: 'Coordinates sensory perception, motor control, cognitive integration, autonomic homeostasis, and consciousness.',
    bloodSupply: 'Circle of Willis (Internal Carotid Arteries and Vertebrobasilar system)',
    venousDrainage: 'Dural venous sinuses draining into Internal Jugular Veins',
    nerveSupply: '12 pairs of cranial nerves emerging from brain and brainstem',
    meshIds: ['Brain', 'Nervous', 'Encephalon'],
    clinicalSignificance: 'Ischemic stroke (MCA infarction), intracranial hemorrhage, meningitis, Parkinson disease, glioblastoma.',
    examNotes: 'MBBS Viva: Circle of Willis formed at base of brain. Broca area (speech production) in left inferior frontal gyrus; Wernicke area (comprehension) in superior temporal gyrus.',
    ospeQuestion: {
      question: 'Identify the marked arterial anastomotic ring at the base of the brain.',
      answer: 'Circle of Willis (Circulus arteriosus cerebri).',
      vivaPoints: ['Formed by Anterior & Posterior communicating arteries, Anterior & Posterior cerebral arteries, and Internal Carotid arteries', 'Frequent site of saccular berry aneurysms causing subarachnoid hemorrhage']
    }
  }
};

/**
 * Fuzzy search helper resolving aliases and medical names
 */
export function searchAnatomicalMetadata(query: string): ExtendedAnatomyMetadata[] {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  return Object.values(ANATOMY_METADATA_REGISTRY).filter((item) => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.latinName && item.latinName.toLowerCase().includes(q)) return true;
    if (item.ta2_latin && item.ta2_latin.toLowerCase().includes(q)) return true;
    if (item.aliases.some((a) => a.toLowerCase().includes(q))) return true;
    if (item.category.toLowerCase().includes(q)) return true;
    if (item.clinicalSignificance && item.clinicalSignificance.toLowerCase().includes(q)) return true;
    return false;
  });
}

export const ANATOMY_METADATA = ANATOMY_METADATA_REGISTRY;

