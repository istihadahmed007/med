export type VideoCategory = 'organ-function' | 'surgical-animations' | 'pathology-disease';

export type OrganSystem = 
  | 'cardiovascular' 
  | 'respiratory' 
  | 'nervous' 
  | 'renal' 
  | 'hepatobiliary' 
  | 'gastrointestinal' 
  | 'endocrine' 
  | 'immune' 
  | 'surgical' 
  | 'oncology';

export interface MedicalVideoItem {
  id: string;
  title: string;
  titleBn: string;
  category: VideoCategory;
  categoryName: string;
  categoryNameBn: string;
  system: OrganSystem;
  systemName: string;
  duration: string;
  durationSeconds: number;
  has3DAnimation: boolean;
  animationType: string;
  thumbnailUrl: string;
  videoUrl?: string;
  embedUrl?: string;
  youtubeId?: string;
  description: string;
  relatedAnatomy: string[];
  whatYouWillLearn: string[];
  attribution: string;
  attributionUrl?: string;
  chapters: {
    timestampSeconds: number;
    title: string;
    titleBn?: string;
    description?: string;
  }[];
  subtitles: {
    startSeconds: number;
    endSeconds: number;
    textEn: string;
    textBn: string;
  }[];
}

export const MEDICAL_VIDEO_LIBRARY: MedicalVideoItem[] = [
  // ==========================================
  // CATEGORY 1: ORGAN FUNCTION (11 items)
  // ==========================================
  {
    id: 'vid-organ-heart',
    title: 'Heart — How the Heart Pumps Blood',
    titleBn: 'হৃৎপিণ্ড — রক্ত সঞ্চালন ও পাম্প প্রক্রিয়া',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'cardiovascular',
    systemName: 'Cardiovascular System',
    duration: '4:30',
    durationSeconds: 270,
    has3DAnimation: true,
    animationType: 'cardiac-cycle',
    thumbnailUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/JBB9bA-gB4c?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'JBB9bA-gB4c',
    description: 'Dynamic 3D visualization of four-chamber synchrony, atrioventricular (mitral/tricuspid) and semilunar (aortic/pulmonary) valve mechanics, and Wiggers ventricular pressure-volume curves during systole and diastole.',
    relatedAnatomy: [
      'Right Atrium',
      'Tricuspid Valve',
      'Right Ventricle',
      'Pulmonary Artery',
      'Left Atrium',
      'Mitral Valve',
      'Left Ventricle',
      'Aortic Valve',
      'Ascending Aorta'
    ],
    whatYouWillLearn: [
      'Sequence of cardiac excitation from SA node through AV node and Purkinje fibers',
      'Isovolumetric ventricular contraction vs rapid ejection mechanics',
      'Acoustic origin of S1 (mitral/tricuspid closure) and S2 (aortic/pulmonary closure) heart sounds',
      'Frank-Starling relationship governing stroke volume and myocardial contractility'
    ],
    attribution: 'Nucleus Medical Media & BM&DC Cardiovascular Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=JBB9bA-gB4c',
    chapters: [
      { timestampSeconds: 0, title: 'Atrial Filling & AV Inflow', titleBn: 'অ্যাট্রিয়াল ফিলিং ও রক্তপ্রবাহ' },
      { timestampSeconds: 65, title: 'Isovolumetric Contraction (S1)', titleBn: 'আইসোভলিউমেট্রিক সংকোচন' },
      { timestampSeconds: 140, title: 'Rapid Aortic Ejection', titleBn: 'মহাধমনীতে দ্রুত রক্ত নির্গমন' },
      { timestampSeconds: 210, title: 'Ventricular Relaxation & Diastole', titleBn: 'ভেন্ট্রিকুলার শিথিলকরণ ও ডায়াস্টোল' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 25, textEn: 'Deoxygenated venous blood enters the right atrium through the venae cavae while oxygenated blood fills the left atrium.', textBn: 'ভেনাস রক্ত ভেনা কাভার মাধ্যমে ডান অলিন্দে এবং অক্সিজেনযুক্ত রক্ত বাম অলিন্দে প্রবেশ করে।' },
      { startSeconds: 25, endSeconds: 65, textEn: 'Ventricular systole begins with isovolumetric contraction; rising left ventricular pressure abruptly closes the mitral and tricuspid valves (S1).', textBn: 'ভেন্ট্রিকুলার সিস্টোল শুরু হলে বাম ভেন্ট্রিকলের চাপ বৃদ্ধির সাথে সাথে মাইট্রাল ও ট্রাইকাসপিড কপাটিকা বন্ধ হয়ে প্রথম হৃদধ্বনি (S1) সৃষ্টি হয়।' },
      { startSeconds: 65, endSeconds: 140, textEn: 'As left ventricular pressure exceeds 80 mmHg, the aortic valve opens, propelling stroke volume into the systemic circulation.', textBn: 'ভেন্ট্রিকলের চাপ ৮০ মিলিমিটার পারদ অতিক্রম করলে মহাধমনী কপাটিকা খুলে সারা দেহে রক্ত সঞ্চালিত হয়।' },
      { startSeconds: 140, endSeconds: 210, textEn: 'During diastole, ventricular pressure plummets below aortic pressure, snapping shut the aortic valve (S2) and allowing coronary perfusion.', textBn: 'ডায়াস্টোলের সময় চাপ হ্রাস পেলে মহাধমনী কপাটিকা বন্ধ হয়ে দ্বিতীয় হৃদধ্বনি (S2) হয় এবং করোনারি ধমনীতে রক্তপ্রবাহ নিশ্চিত হয়।' }
    ]
  },
  {
    id: 'vid-organ-lungs',
    title: 'Lungs — Breathing and Gas Exchange',
    titleBn: 'ফুসফুস — শ্বাসপ্রশ্বাস ও গ্যাস বিনিময় প্রক্রিয়া',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'respiratory',
    systemName: 'Respiratory System',
    duration: '4:15',
    durationSeconds: 255,
    has3DAnimation: true,
    animationType: 'lungs-alveoli',
    thumbnailUrl: '/anatomy/lungs/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/b4N4qNq9h6E?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'b4N4qNq9h6E',
    description: 'High-definition 3D animation illustrating diaphragm and intercostal mechanics, negative intrapleural pressure generation, and microscopic alveolar-capillary oxygen and carbon dioxide diffusion.',
    relatedAnatomy: [
      'Trachea',
      'Mainstem Bronchi',
      'Terminal Bronchioles',
      'Alveolar Sacs',
      'Type I & Type II Pneumocytes',
      'Pulmonary Capillary Bed',
      'Diaphragm'
    ],
    whatYouWillLearn: [
      'Boyle’s law governing negative intrathoracic pressure during inspiration',
      'Fick’s law of diffusion across the 0.5 μm alveolar-capillary membrane',
      'Role of pulmonary surfactant secreted by Type II pneumocytes in preventing alveolar atelectasis',
      'Ventilation-perfusion (V/Q) ratio matching across apical and basilar pulmonary zones'
    ],
    attribution: 'Nucleus Medical Media & Guyton Physiology Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=b4N4qNq9h6E',
    chapters: [
      { timestampSeconds: 0, title: 'Thoracic Expansion & Negative Pressure', titleBn: 'বক্ষপিঞ্জরের প্রসারণ ও ঋণাত্মক চাপ' },
      { timestampSeconds: 60, title: 'Bronchial Airflow Dynamics', titleBn: 'শ্বাসনালীর বায়ুপ্রবাহ' },
      { timestampSeconds: 130, title: 'Alveolar-Capillary Gas Diffusion', titleBn: 'অ্যালভিওলার গ্যাস বিনিময়' },
      { timestampSeconds: 200, title: 'Surfactant & Passive Expiration', titleBn: 'সারফ্যাক্ট্যান্ট ও নিঃশ্বাস ত্যাগ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Diaphragmatic contraction pulls the thoracic floor downward, lowering intrapleural pressure to negative 8 cmH2O.', textBn: 'ডায়াফ্রামের সংকোচনে বক্ষ গহ্বরের আয়তন বাড়ে এবং ইন্ট্রাপ্লুরাল চাপ ঋণাত্মক হয়ে বাইরে থেকে বাতাস প্রবেশ করে।' },
      { startSeconds: 30, endSeconds: 90, textEn: 'Inhaled air travels through 23 generations of branching airways to reach over 300 million micro-alveoli.', textBn: 'শ্বাসের বাতাস ২৩ বার শাখান্বিত হয়ে প্রায় ৩০ কোটি অ্যালভিওলাইতে পৌঁছায়।' },
      { startSeconds: 90, endSeconds: 160, textEn: 'Oxygen diffuses down its partial pressure gradient from alveoli (100 mmHg) into capillary erythrocytes, binding to hemoglobin.', textBn: 'অক্সিজেন উচ্চ চাপযুক্ত অ্যালভিওলাস থেকে রক্তকণিকায় ব্যাপিত হয়ে হিমোগ্লোবিনের সাথে যুক্ত হয়।' },
      { startSeconds: 160, endSeconds: 255, textEn: 'Simultaneously, dissolved CO2 moves across the respiratory membrane into the alveolus to be expired.', textBn: 'একই সাথে কার্বন ডাই অক্সাইড রক্ত থেকে অ্যালভিওলাসে ব্যাপিত হয়ে নিঃশ্বাসের সাথে বের হয়ে যায়।' }
    ]
  },
  {
    id: 'vid-organ-brain',
    title: 'Brain — Neural Signaling and Brain Function',
    titleBn: 'মস্তিষ্ক — নিউরাল সিগন্যালিং ও মস্তিষ্কের কার্যকারিতা',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'nervous',
    systemName: 'Nervous System',
    duration: '5:10',
    durationSeconds: 310,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/brain/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/saF-H8C8_8I?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'saF-H8C8_8I',
    description: 'Detailed microscopic visualization of action potential propagation along myelinated axons, saltatory conduction at nodes of Ranvier, and neurotransmitter exocytosis at the synaptic cleft.',
    relatedAnatomy: [
      'Cerebral Cortex',
      'Pyramidal Neurons',
      'Axon Hillock',
      'Myelin Sheaths',
      'Nodes of Ranvier',
      'Presynaptic Terminal',
      'Synaptic Cleft',
      'Postsynaptic Dendritic Spine'
    ],
    whatYouWillLearn: [
      'Ionic basis of resting membrane potential (-70 mV maintained by Na+/K+ ATPase)',
      'Voltage-gated sodium channel activation triggering rapid Phase 0 depolarization',
      'Calcium-mediated vesicular exocytosis of acetylcholine and glutamate',
      'Excitatory (EPSP) vs inhibitory (IPSP) spatial and temporal summation'
    ],
    attribution: 'Nucleus Medical Media & NIH National Institute of Neurological Disorders',
    attributionUrl: 'https://www.youtube.com/watch?v=saF-H8C8_8I',
    chapters: [
      { timestampSeconds: 0, title: 'Resting Membrane Potential (-70 mV)', titleBn: 'বিশ্রামকালীন ঝিল্লি বিভব' },
      { timestampSeconds: 70, title: 'Voltage-Gated Na+ Influx (Depolarization)', titleBn: 'সোডিয়াম প্রবেশ ও ডিপোলারাইজেশন' },
      { timestampSeconds: 150, title: 'Saltatory Conduction & Myelin', titleBn: 'র‌্যানভিয়ারের নোডে লাফিয়ে বিদ্যুৎ প্রবাহ' },
      { timestampSeconds: 230, title: 'Synaptic Transmission & Neurotransmitters', titleBn: 'সিন্যাপটিক নিউরোট্রান্সমিটার নিঃসরণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Neurons maintain a resting electrical polarity of negative 70 millivolts through the active Na+/K+ ATPase pump.', textBn: 'নিউরন সোডিয়াম-পটাশিয়াম পাম্পের মাধ্যমে কোষের অভ্যন্তরে মাইনাস ৭০ মিলিভোল্ট বিভব বজায় রাখে।' },
      { startSeconds: 35, endSeconds: 85, textEn: 'Threshold depolarization to -55 mV opens voltage-gated sodium channels, driving a surge of positive charge into the cell.', textBn: 'বিভব মাইনাস ৫৫ মিলিভোল্টে পৌঁছালে ভোল্টেজ-গেটেড সোডিয়াম চ্যানেল খুলে অ্যাকশন পটেনশিয়াল শুরু হয়।' },
      { startSeconds: 85, endSeconds: 170, textEn: 'Myelin insulation forces the impulse to leap between nodes of Ranvier, accelerating conduction velocity up to 120 meters per second.', textBn: 'মায়েলিন আবরণের কারণে স্নায়ু উদ্দীপনা নোড অব র‍্যানভিয়ারে লাফিয়ে প্রতি সেকেন্ডে ১২০ মিটার গতিতে চলে।' },
      { startSeconds: 170, endSeconds: 310, textEn: 'At the synaptic bouton, influx of calcium triggers SNARE proteins to fuse vesicles and release neurotransmitters across the synaptic cleft.', textBn: 'সিন্যাপটিক প্রান্তে ক্যালসিয়ামের প্রভাবে নিউরোট্রান্সমিটার বের হয়ে পরবর্তী নিউরনের রিসেপ্টরে সংকেত পাঠায়।' }
    ]
  },
  {
    id: 'vid-organ-kidney',
    title: 'Kidney — Filtration and Urine Formation',
    titleBn: 'বৃক্ক — পরিস্রাবণ ও মূত্র উৎপাদন প্রক্রিয়া',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'renal',
    systemName: 'Renal System',
    duration: '4:45',
    durationSeconds: 285,
    has3DAnimation: true,
    animationType: 'kidney-nephron',
    thumbnailUrl: '/anatomy/kidneys/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/CShAIAD-ask?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'CShAIAD-ask',
    description: 'High-definition 3D medical animation of renal function (Nucleus Medical Media): glomerular capillary filtration across podocyte slit diaphragms, tubular reabsorption along the loop of Henle, and hormone-mediated water balance.',
    relatedAnatomy: [
      'Renal Cortex & Medulla',
      'Afferent & Efferent Arterioles',
      'Glomerulus',
      'Bowman Capsule & Podocytes',
      'Proximal Convoluted Tubule (PCT)',
      'Loop of Henle (Descending/Ascending)',
      'Distal Convoluted Tubule',
      'Collecting Duct'
    ],
    whatYouWillLearn: [
      'Starling forces determining Glomerular Filtration Rate (GFR ~125 mL/min)',
      'Obligate reabsorption of glucose, amino acids, and 65% of sodium in the PCT',
      'Countercurrent multiplier mechanism establishing the hypertonic medullary gradient',
      'Actions of Aldosterone and Antidiuretic Hormone (ADH/Vasopressin) on aquaporin-2 channels'
    ],
    attribution: 'Nucleus Medical Media & BM&DC Renal Physiology Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=CShAIAD-ask',
    chapters: [
      { timestampSeconds: 0, title: 'Glomerular Ultrafiltration (Starling Forces)', titleBn: 'গ্লোমেরুলার আল্ট্রাফিল্ট্রেশন' },
      { timestampSeconds: 75, title: 'PCT Nutrient & Electrolyte Reabsorption', titleBn: 'পিসিটিতে পুষ্টি ও লবণ পুনঃশোষণ' },
      { timestampSeconds: 155, title: 'Loop of Henle Countercurrent Multiplier', titleBn: 'লুপ অব হেনলেতে ঘনত্বের গ্রেডিয়েন্ট' },
      { timestampSeconds: 220, title: 'ADH & Aldosterone Fine-Tuning in Collecting Duct', titleBn: 'হরমোন দ্বারা মূত্রের ঘনত্ব নিয়ন্ত্রণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The kidneys receive 20% of cardiac output, filtering 180 liters of blood plasma daily through 2 million microscopic nephrons.', textBn: 'প্রতিদিন বৃক্ক ১৮০ লিটার রক্তরস ছেঁকে শরীরের বর্জ্য পদার্থ মূত্র আকারে অপসারণ করে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'High hydrostatic pressure in glomerular capillaries forces fluid through podocyte slit diaphragms into Bowman’s space, retaining albumin and cells.', textBn: 'গ্লোমেরুলাসের উচ্চ চাপে রক্তরস ছেঁকে বোম্যান্স ক্যাপসুলে প্রবেশ করে, প্রোটিন ও রক্তকণিকা রক্তেই থেকে যায়।' },
      { startSeconds: 85, endSeconds: 175, textEn: 'The proximal tubule reabsorbs 100% of filtered glucose via SGLT2 cotransporters alongside 65% of sodium and water.', textBn: 'প্রক্সিমাল টিউবিউল শতভাগ গ্লুকোজ এবং ৬৫ ভাগ সোডিয়াম ও পানি রক্তে ফিরিয়ে নেয়।' },
      { startSeconds: 175, endSeconds: 285, textEn: 'The thick ascending limb pumps NaCl into the renal medulla, creating an osmotic gradient that allows ADH to concentrate final urine.', textBn: 'লুপ অব হেনলে ও কালেক্টিং ডাক্টে এডিএইচ হরমোনের মাধ্যমে পানির ভারসাম্য নিয়ন্ত্রিত হয়ে চূড়ান্ত মূত্র তৈরি হয়।' }
    ]
  },
  {
    id: 'vid-organ-liver',
    title: 'Liver — Metabolism and Detoxification',
    titleBn: 'যকৃৎ — বিপাক, পিত্ত নিঃসরণ ও বিষাক্ত পদার্থ নিষ্কাশন',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'hepatobiliary',
    systemName: 'Hepatobiliary System',
    duration: '4:20',
    durationSeconds: 260,
    has3DAnimation: true,
    animationType: 'digestion-peristalsis',
    thumbnailUrl: '/anatomy/liver/organ.webp',
    description: 'Anatomical and biochemical overview of the hepatic lobule, dual blood supply via the portal vein and hepatic artery, cytochrome P450 drug clearance, and bile synthesis.',
    relatedAnatomy: [
      'Hepatic Lobule & Portal Triad',
      'Portal Vein',
      'Hepatic Artery Proper',
      'Hepatic Sinusoids',
      'Kupffer Cells (Macrophages)',
      'Hepatocytes & Space of Disse',
      'Bile Canaliculi & Common Bile Duct',
      'Central Vein'
    ],
    whatYouWillLearn: [
      'Significance of dual blood supply (75% nutrient-rich portal, 25% oxygenated arterial)',
      'First-pass hepatic metabolism and Phase I/Phase II cytochrome P450 oxidation-conjugation',
      'Urea cycle converting neurotoxic ammonia into excretable urea',
      'Bile acid synthesis from cholesterol and lipid emulsification in the duodenum'
    ],
    attribution: 'MedlinePlus / U.S. National Library of Medicine & Robbins Pathology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000079.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Hepatic Lobule Architecture & Portal Triad', titleBn: 'যকৃতের গঠন ও পোর্টাল ট্রায়াড' },
      { timestampSeconds: 65, title: 'Glycogen Storage & Protein Synthesis', titleBn: 'গ্লাইকোজেন সঞ্চয় ও প্রোটিন সংশ্লেষণ' },
      { timestampSeconds: 135, title: 'Cytochrome P450 Detoxification Pathways', titleBn: 'টক্সিন ও ওষুধের বিপাক' },
      { timestampSeconds: 200, title: 'Bile Production & Gallbladder Storage', titleBn: 'পিত্তরস উৎপাদন ও সঞ্চয়' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The liver is the central metabolic processing facility of the human body, receiving 1.5 liters of blood every minute.', textBn: 'যকৃৎ মানবদেহের প্রধান বিপাকীয় গবেষণাগার, যা প্রতি মিনিটে দেড় লিটার রক্ত পরিশোধন করে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Nutrient-rich blood from the digestive tract flows through sinusoidal channels lined by phagocytic Kupffer cells.', textBn: 'অন্ত্র থেকে আসা পুষ্টিসমৃদ্ধ রক্ত হেপাটিক সাইনুসয়েডের মধ্য দিয়ে প্রবাহিত হয়ে কোষে প্রবেশ করে।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'Hepatocytes neutralize xenobiotics and drugs through Phase I cytochrome P450 oxidation and Phase II glucuronidation.', textBn: 'হেপাটোসাইট সাইটোক্রোম পি-৪৫০ এনজাইমের মাধ্যমে বিষাক্ত পদার্থ ও ওষুধকে জলীয় দ্রবণীয় করে নিষ্কাশন করে।' },
      { startSeconds: 165, endSeconds: 260, textEn: 'Bile acids conjugated by liver cells drain into bile canaliculi to emulsify dietary lipids in the small intestine.', textBn: 'কোষ থেকে তৈরি পিত্তরস ক্যানালিকুলিতে জমা হয়ে চর্বি জাতীয় খাদ্য পরিপাকে সহায়তা করে।' }
    ]
  },
  {
    id: 'vid-organ-stomach',
    title: 'Stomach — Digestion',
    titleBn: 'পাকস্থলী — খাদ্য পরিপাক ও হাইড্রোক্লোরিক এসিড নিঃসরণ',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'gastrointestinal',
    systemName: 'Gastrointestinal System',
    duration: '3:50',
    durationSeconds: 230,
    has3DAnimation: true,
    animationType: 'digestion-peristalsis',
    thumbnailUrl: '/anatomy/intestine/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/s71Q04S2WjM?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 's71Q04S2WjM',
    description: 'Cinematic medical animation showing gastric rugae, parietal cell proton pumps secreting hydrochloric acid, chief cells activating pepsinogen, and antral retropulsion grinding.',
    relatedAnatomy: [
      'Lower Esophageal Sphincter',
      'Cardia, Fundus & Body',
      'Gastric Antrum & Pylorus',
      'Gastric Pits & Parietal Cells',
      'Chief Cells & G-Cells',
      'Mucosal Barrier'
    ],
    whatYouWillLearn: [
      'Cephalic, gastric, and intestinal phases of gastric acid secretion',
      'Biochemistry of H+/K+ ATPase proton pump generating pH 1.5–2.0',
      'Conversion of inactive pepsinogen to active endopeptidase pepsin',
      'Antral grinding and retropulsion reducing food boluses into 1–2 mm acidic chyme'
    ],
    attribution: 'MedlinePlus / ADAM Medical Education & Guyton Physiology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000122.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Gastric Anatomy & Mucosal Rugae', titleBn: 'পাকস্থলীর গঠন ও মিউকোসা' },
      { timestampSeconds: 55, title: 'Parietal Cell Acid Secretion (H+/K+ ATPase)', titleBn: 'প্রোটন পাম্প ও হাইড্রোক্লোরিক এসিড' },
      { timestampSeconds: 120, title: 'Pepsin Activation & Protein Breakdown', titleBn: 'পেপসিন ও প্রোটিন পরিপাক' },
      { timestampSeconds: 180, title: 'Antral Grinding & Pyloric Emptying', titleBn: 'কাইম তৈরি ও পাইলোরিক নির্গমন' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The stomach expands to accommodate food, utilizing muscular contractions to grind food into a semi-liquid suspension called chyme.', textBn: 'পাকস্থলীর পেশিবহুল প্রাচীর সংকুচিত হয়ে খাদ্যকে পিষে কাইম বা মণ্ডে পরিণত করে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Parietal cells in gastric glands utilize H+/K+ ATPase proton pumps to pump hydrogen ions into the lumen, achieving an acidic pH below 2.0.', textBn: 'প্যারাইটাল কোষ প্রোটন পাম্পের মাধ্যমে শক্তিশালী হাইড্রোক্লোরিক এসিড নিঃসরণ করে জীবাণু ধ্বংস করে।' },
      { startSeconds: 85, endSeconds: 155, textEn: 'This extreme acidity cleaves inactive pepsinogen into pepsin, initiating primary protein denaturation and digestion.', textBn: 'অম্লীয় পরিবেশে পেপসিনোজেন সক্রিয় পেপসিনে রূপান্তরিত হয়ে প্রোটিনের বন্ধন ভেঙে দেয়।' },
      { startSeconds: 155, endSeconds: 230, textEn: 'A thick bicarbonate-rich mucus layer shields the gastric mucosa from self-digestion as chyme is metered through the pylorus.', textBn: 'বাইকার্বোনেট সমৃদ্ধ মিউকাস পাকস্থলীকে নিজের এসিড থেকে রক্ষা করে এবং কাইম ক্ষুদ্রান্ত্রে প্রবাহিত হয়।' }
    ]
  },
  {
    id: 'vid-organ-small-intestine',
    title: 'Small Intestine — Nutrient Absorption',
    titleBn: 'ক্ষুদ্রান্ত্র — পুষ্টি উপাদান শোষণ ও মাইক্রোভিলি',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'gastrointestinal',
    systemName: 'Gastrointestinal System',
    duration: '4:00',
    durationSeconds: 240,
    has3DAnimation: true,
    animationType: 'digestion-peristalsis',
    thumbnailUrl: '/anatomy/intestine/microscopic.webp',
    description: 'Microscopic 3D journey through circular plicae, villi, and microvillar brush border, highlighting carbohydrate SGLT1 transport, peptide symport, and lacteal lipid absorption.',
    relatedAnatomy: [
      'Duodenum, Jejunum, Ileum',
      'Plicae Circulares (Valves of Kerckring)',
      'Intestinal Villi',
      'Enterocyte Microvilli Brush Border',
      'Central Lacteal (Lymphatic)',
      'Mesenteric Capillaries',
      'Crypts of Lieberkühn'
    ],
    whatYouWillLearn: [
      'Surface area amplification (over 250 m2) provided by circular folds, villi, and microvilli',
      'Sodium-glucose linked transporter 1 (SGLT1) secondary active transport mechanism',
      'Micellar absorption of fatty acids and chylomicron packaging into lacteal lymphatics',
      'Selective terminal ileal absorption of Vitamin B12-intrinsic factor complexes and bile salts'
    ],
    attribution: 'MedlinePlus / NIH National Institute of Diabetes and Digestive and Kidney Diseases',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000078.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Intestinal Villi Surface Amplification', titleBn: 'ভিলি ও মাইক্রোভিলির গঠন' },
      { timestampSeconds: 60, title: 'Brush Border Carbohydrate & Protein Transport', titleBn: 'শর্করা ও আমিষ শোষণ' },
      { timestampSeconds: 130, title: 'Lipid Micelle Uptake & Chylomicrons', titleBn: 'লিপিড ও কাইলোমাইক্রন শোষণ' },
      { timestampSeconds: 190, title: 'Terminal Ileum B12 & Bile Salt Resorption', titleBn: 'ভিটামিন বি১২ ও পিত্ত লবণ পুনঃশোষণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The small intestine spans six meters, amplified by villi and microvilli to provide an absorptive surface area matching a tennis court.', textBn: 'ক্ষুদ্রান্ত্রের ভিলি ও মাইক্রোভিলি এর অভ্যন্তরীণ ক্ষেত্রফল বহুগুণ বাড়িয়ে দ্রুত পুষ্টি শোষণে সাহায্য করে।' },
      { startSeconds: 30, endSeconds: 90, textEn: 'Enterocyte brush border enzymes break disaccharides and peptides into absorbable monosaccharides and amino acids.', textBn: 'ব্রাশ বর্ডার এনজাইম খাদ্য উপাদানকে ভেঙে গ্লুকোজ ও অ্যামিনো এসিডে রূপান্তর করে।' },
      { startSeconds: 90, endSeconds: 165, textEn: 'Monosaccharides enter bloodstream capillaries via SGLT1 and GLUT2, while re-esterified fatty acids enter central lacteal lymphatics as chylomicrons.', textBn: 'গ্লুকোজ রক্তনালীতে এবং ফ্যাট কাইলোমাইক্রন হিসেবে ল্যাকটিয়েল লসিকানালীতে প্রবেশ করে।' },
      { startSeconds: 165, endSeconds: 240, textEn: 'In the terminal ileum, specialized receptors recover 95% of bile salts for the enterohepatic circulation.', textBn: 'টার্মিনাল ইলিয়ামে ভিটামিন বি১২ ও ৯৫ ভাগ পিত্ত লবণ পুনঃশোষিত হয়ে যকৃতে ফিরে যায়।' }
    ]
  },
  {
    id: 'vid-organ-pancreas',
    title: 'Pancreas — Insulin and Digestion',
    titleBn: 'অগ্ন্যাশয় — ইনসুলিন ক্ষরণ ও পরিপাক রস নিঃসরণ',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'endocrine',
    systemName: 'Endocrine & Digestive',
    duration: '4:10',
    durationSeconds: 250,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/pancreas/organ.webp',
    description: 'Dual exocrine and endocrine functional animation detailing acinar zymogen secretion and islet beta-cell insulin exocytosis triggered by ATP-sensitive potassium channel closure.',
    relatedAnatomy: [
      'Pancreatic Head, Body & Tail',
      'Main Pancreatic Duct of Wirsung',
      'Acinar Units & Intercalated Ducts',
      'Islets of Langerhans',
      'Beta Cells (Insulin)',
      'Alpha Cells (Glucagon)',
      'Major Duodenal Papilla (Ampulla of Vater)'
    ],
    whatYouWillLearn: [
      'Biphasic insulin exocytosis triggered by intracellular ATP/ADP ratio and K_ATP channel closure',
      'Exocrine pro-enzyme secretion (trypsinogen, chymotrypsinogen, amylase, lipase)',
      'Duodenal enterokinase activation of trypsin preventing autodigestive pancreatitis',
      'Secretin-induced ductal bicarbonate secretion neutralizing gastric acid'
    ],
    attribution: 'MedlinePlus / NIH & Endocrine Society Educational Resources',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000096.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Dual Glandular Architecture (Exocrine vs Endocrine)', titleBn: 'বহিঃক্ষরা ও অন্তঃক্ষরা অংশ' },
      { timestampSeconds: 65, title: 'Acinar Enzyme Synthesis & Bicarbonate Secretion', titleBn: 'পরিপাক এনজাইম ও বাইকার্বোনেট' },
      { timestampSeconds: 135, title: 'Beta-Cell Glucose Sensing & Insulin Secretion', titleBn: 'বিটা কোষ ও ইনসুলিন নিঃসরণ' },
      { timestampSeconds: 200, title: 'Trypsinogen Activation in Duodenum', titleBn: 'ডিওডেনামে এনজাইম সক্রিয়করণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The pancreas is a master metabolic gland containing 98% exocrine digestive tissue and 2% endocrine hormone islets.', textBn: 'অগ্ন্যাশয় একই সাথে পরিপাক রস এবং রক্তের গ্লুকোজ নিয়ন্ত্রক হরমোন উৎপাদন করে।' },
      { startSeconds: 30, endSeconds: 90, textEn: 'Acinar cells produce inactive zymogens including trypsinogen and lipase, buffered by ductal bicarbonate to neutralize gastric acid.', textBn: 'অ্যাসিনার কোষ নিষ্ক্রিয় এনজাইম এবং ডাক্ট কোষ বাইকার্বোনেট তৈরি করে এসিড প্রশমিত করে।' },
      { startSeconds: 90, endSeconds: 175, textEn: 'Rising blood glucose enters islet beta cells via GLUT2; ATP generated from glycolysis closes K_ATP channels, triggering calcium influx and insulin exocytosis.', textBn: 'রক্তে গ্লুকোজ বাড়লে বিটা কোষে এটিপি তৈরি হয়ে ক্যালসিয়াম চ্যানেলের মাধ্যমে ইনসুলিন নিঃসৃত হয়।' },
      { startSeconds: 175, endSeconds: 250, textEn: 'Insulin signals muscle and adipose tissues via receptor tyrosine kinases to translocate GLUT4 transporters and clear glucose.', textBn: 'ইনসুলিন রক্ত থেকে গ্লুকোজ কোষে প্রবেশ করিয়ে শক্তি উৎপাদন ও সঞ্চয় নিশ্চিত করে।' }
    ]
  },
  {
    id: 'vid-organ-blood-circulation',
    title: 'Blood Circulation',
    titleBn: 'রক্ত সঞ্চালনতন্ত্র — সিস্টেমিক ও পালমোনারি সংবহন',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'cardiovascular',
    systemName: 'Cardiovascular System',
    duration: '4:40',
    durationSeconds: 280,
    has3DAnimation: true,
    animationType: 'coronary-circulation',
    thumbnailUrl: '/anatomy/heart_preview.jpg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/F38Bmk2wO24?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'F38Bmk2wO24',
    description: 'Comprehensive 3D vascular simulation tracing complete systemic and pulmonary circuits, arteriolar resistance regulation, capillary fluid filtration, and venous return.',
    relatedAnatomy: [
      'Aorta & Major Elastic Arteries',
      'Muscular Conduit Arteries',
      'Arterioles (Resistance Vessels)',
      'Continuous, Fenestrated & Sinusoidal Capillaries',
      'Post-capillary Venules & Veins',
      'Superior & Inferior Vena Cava'
    ],
    whatYouWillLearn: [
      'Dual-circuit systemic high-pressure vs pulmonary low-pressure hemodynamics',
      'Poiseuille’s law governing vascular resistance ($R \propto 1/r^4$)',
      'Starling forces controlling transcapillary fluid exchange and lymph return',
      'Venous muscle pump, respiratory pump, and venous valve unidirectionality'
    ],
    attribution: 'MEDX Cardiovascular Simulation & Guyton & Hall Medical Physiology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000030.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Systemic vs Pulmonary Circuit Architecture', titleBn: 'সিস্টেমিক ও পালমোনারি সংবহন' },
      { timestampSeconds: 70, title: 'Arteriolar Resistance & Autoregulation', titleBn: 'ধমনীর প্রতিরোধ ও রক্তচাপ' },
      { timestampSeconds: 150, title: 'Capillary Microvascular Fluid Exchange', titleBn: 'কৈশিক জালকে তরল বিনিময়' },
      { timestampSeconds: 220, title: 'Venous Capacitance & Skeletal Muscle Pump', titleBn: 'ভেনাস রিটার্ন ও পেশি পাম্প' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The circulatory system pumps 5 liters of blood per minute through a 100,000-kilometer vascular network.', textBn: 'সংবহনতন্ত্র প্রতি মিনিটে প্রায় ৫ লিটার রক্ত এক লক্ষ কিলোমিটার দীর্ঘ রক্তনালীতে সঞ্চালিত করে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Elastic recoil of the aorta maintains diastolic perfusion, while small arterioles regulate peripheral resistance and blood pressure.', textBn: 'মহাধমনীর স্থিতিস্থাপকতা ডায়াস্টোলে রক্তপ্রবাহ ধরে রাখে এবং আর্টারিওল রক্তচাপ নিয়ন্ত্রণ করে।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'At the capillary bed, hydrostatic pressure drives nutrient filtration into interstitium, balanced by oncotic pressure from albumin.', textBn: 'কৈশিক জালকে হাইড্রোস্ট্যাটিক চাপ পুষ্টি বের করে এবং অ্যালবুমিনের অনকোটিক চাপ তরল ফিরিয়ে নেয়।' },
      { startSeconds: 165, endSeconds: 280, textEn: 'Skeletal muscle contractions compress deep veins, propelling blood past one-way valves back toward the right atrium.', textBn: 'পেশির সংকোচন এবং কপাটিকা রক্তকে মাধ্যাকর্ষণের বিপরীতে হৃৎপিণ্ডে ফিরিয়ে আনে।' }
    ]
  },
  {
    id: 'vid-organ-immune-system',
    title: 'Immune System — Cellular Defense & Antibody Response',
    titleBn: 'রোগ প্রতিরোধ ব্যবস্থা — সহজাত ও অর্জিত প্রতিরক্ষা',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'immune',
    systemName: 'Immune System',
    duration: '5:00',
    durationSeconds: 300,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/torso_hero.jpg',
    description: 'Dynamic immunological animation illustrating macrophage phagocytosis, dendritic cell antigen presentation on MHC-II, CD4+ helper T cell activation, and B cell clonal selection.',
    relatedAnatomy: [
      'Bone Marrow & Thymus (Primary Lymphoid)',
      'Spleen & Lymph Nodes (Secondary Lymphoid)',
      'Neutrophils & Macrophages',
      'Dendritic Antigen-Presenting Cells',
      'CD4+ Helper T Cells & CD8+ Cytotoxic T Cells',
      'Plasma B Cells & Antibodies (IgM/IgG)'
    ],
    whatYouWillLearn: [
      'Innate immunity (barriers, phagocytosis, toll-like receptors) vs adaptive immunity',
      'Antigen processing and presentation on MHC-I (endogenous) and MHC-II (exogenous)',
      'Cytokine cascades (IL-1, IL-6, TNF-alpha) mediating acute phase inflammation',
      'Plasma cell antibody class switching and long-lived memory cell preservation'
    ],
    attribution: 'NIH National Institute of Allergy and Infectious Diseases & MedlinePlus',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000073.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Innate Immune Barrier & Phagocytosis', titleBn: 'সহজাত প্রতিরক্ষা ও ফ্যাগোসাইটোসিস' },
      { timestampSeconds: 75, title: 'Dendritic Cell Antigen Presentation (MHC-II)', titleBn: 'অ্যান্টিজেন প্রেজেন্টেশন ও এমএইচসি' },
      { timestampSeconds: 155, title: 'Helper T-Cell Clonal Activation', titleBn: 'হেল্পার টি-কোষ সক্রিয়করণ' },
      { timestampSeconds: 230, title: 'B-Cell Antibody Affinity Maturation & Memory', titleBn: 'অ্যান্টিবডি তৈরি ও মেমরি কোষ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The immune system orchestrates multi-tiered cellular defenses to distinguish self from pathogenic invaders.', textBn: 'প্রতিরোধ ব্যবস্থা নিজস্ব ও বহিরাগত জীবাণুর মধ্যে পার্থক্য করে দেহকে সুস্থ রাখে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Resident macrophages recognize conserved microbial molecular patterns via Toll-like receptors, engulfing bacteria into phagolysosomes.', textBn: 'ম্যাক্রোফেজ রিসেপ্টরের মাধ্যমে ব্যাকটেরিয়ার উপস্থিতি শনাক্ত করে গিলে ফেলে ধ্বংস করে।' },
      { startSeconds: 85, endSeconds: 175, textEn: 'Dendritic cells migrate to regional lymph nodes, presenting digested peptides on MHC Class II molecules to naive CD4+ helper T cells.', textBn: 'ডেনড্রাইটিক কোষ লিম্ফ নোডে গিয়ে টি-কোষকে অ্যান্টিজেন প্রদর্শন করে সাহায্যকারী সংকেত পাঠায়।' },
      { startSeconds: 175, endSeconds: 300, textEn: 'Activated T cells stimulate antigen-specific B cells to proliferate into plasma cells producing high-affinity neutralizing antibodies.', textBn: 'সক্রিয় টি-কোষ বি-কোষকে প্লাজমা কোষে রূপান্তর করে লক্ষ্যভেদী অ্যান্টিবডি তৈরি করায়।' }
    ]
  },
  {
    id: 'vid-organ-endocrine-system',
    title: 'Endocrine System — Hormonal Signaling & Feedback',
    titleBn: 'অন্তঃক্ষরা গ্রন্থিতন্ত্র — হরমোন নিঃসরণ ও ফিডব্যাক নিয়ন্ত্রণ',
    category: 'organ-function',
    categoryName: 'Organ Function',
    categoryNameBn: 'অঙ্গ প্রত্যঙ্গের শারীরবৃত্ত',
    system: 'endocrine',
    systemName: 'Endocrine System',
    duration: '4:25',
    durationSeconds: 265,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/pancreas/compare.webp',
    description: 'Visualization of the master hypothalamic-pituitary axis, negative feedback regulation loops, thyroid and adrenal corticosteroid secretion, and intracellular hormone receptor cascades.',
    relatedAnatomy: [
      'Hypothalamus',
      'Anterior & Posterior Pituitary Gland',
      'Hypophyseal Portal System',
      'Thyroid Gland (Follicular Cells)',
      'Adrenal Cortex (Glomerulosa, Fasciculata, Reticularis)',
      'Parathyroid Glands'
    ],
    whatYouWillLearn: [
      'Hypothalamic releasing hormones (TRH, CRH, GnRH) and hypophyseal portal transit',
      'Negative feedback inhibition maintaining physiological hormone set points',
      'Steroid hormone lipid solubility and nuclear receptor transcription factors',
      'Peptide hormone GPCR second messenger signaling (cAMP, IP3/DAG cascades)'
    ],
    attribution: 'MedlinePlus / U.S. National Library of Medicine & Guyton Physiology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000048.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Hypothalamic-Pituitary Master Control', titleBn: 'হাইপোথ্যালামাস ও পিটুইটারি অক্ষ' },
      { timestampSeconds: 65, title: 'Thyroid Axis (TRH-TSH-T3/T4 Regulation)', titleBn: 'থাইরয়েড হরমোন নিয়ন্ত্রণ' },
      { timestampSeconds: 135, title: 'Adrenal Axis (HPA & Cortisol Feedback)', titleBn: 'অ্যাড্রেনাল ও কর্টিসল নিয়ন্ত্রণ' },
      { timestampSeconds: 200, title: 'GPCR vs Nuclear Receptor Signaling', titleBn: 'হরমোনের কোষীয় সিগন্যালিং' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'The endocrine system coordinates long-range body homeostasis through chemical messengers released directly into blood.', textBn: 'অন্তঃক্ষরা গ্রন্থি রক্তে হরমোন নিঃসরণের মাধ্যমে দেহের বিভিন্ন অঙ্গের মধ্যে সমন্বয় রক্ষা করে।' },
      { startSeconds: 30, endSeconds: 80, textEn: 'The hypothalamus samples systemic blood, releasing minute concentrations of releasing hormones into the hypophyseal portal plexus.', textBn: 'হাইপোথ্যালামাস পিটুইটারি গ্রন্থিকে উদ্দীপিত করার জন্য নিয়ন্ত্রক হরমোন পাঠায়।' },
      { startSeconds: 80, endSeconds: 160, textEn: 'Anterior pituitary tropic hormones stimulate peripheral target glands like the thyroid and adrenals to produce metabolic steroids and thyroxine.', textBn: 'পিটুইটারি থেকে নিঃসৃত হরমোন থাইরয়েড ও অ্যাড্রেনাল গ্রন্থিকে হরমোন তৈরিতে উদ্দীপ্ত করে।' },
      { startSeconds: 160, endSeconds: 265, textEn: 'Rising circulating hormone levels exert negative feedback on the hypothalamus and pituitary, automatically shutting down upstream release.', textBn: 'রক্তে হরমোনের মাত্রা বৃদ্ধি পেলে ফিডব্যাক প্রক্রিয়ায় অতিরিক্ত ক্ষরণ নিজে থেকেই বন্ধ হয়।' }
    ]
  },

  // ==========================================
  // CATEGORY 2: SURGICAL ANIMATIONS (13 items)
  // ==========================================
  {
    id: 'vid-surg-appendectomy',
    title: 'Appendectomy — Laparoscopic & Open Surgical Technique',
    titleBn: 'অ্যাপেন্ডেক্টমি — ল্যাপারোস্কোপিক ও ওপেন অস্ত্রোপচার',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'General Surgery',
    duration: '5:15',
    durationSeconds: 315,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/intestine/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/E1ljClS0DhM?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'E1ljClS0DhM',
    description: 'High-precision 3D surgical animation of laparoscopic appendectomy: port placement triangulation, identification of taenia coli convergence, mesoappendix skeletonization, and appendiceal base ligating loops.',
    relatedAnatomy: [
      'Caecum & Taenia Libera',
      'Mesoappendix & Appendicular Artery',
      'Appendiceal Base & Cecal Junction',
      'Ileocecal Valve',
      'Inferior Epigastric Vessels'
    ],
    whatYouWillLearn: [
      'Following the taenia libera as the definitive surgical guide to the appendiceal base',
      'Safe devascularization of the end-artery appendicular branch using bipolar diathermy or clips',
      'Application of double endoloop ligatures to avoid stump leak and postoperative peritonitis',
      'Systematic four-quadrant inspection for Meckel’s diverticulum and pelvic pathologies'
    ],
    attribution: 'Nucleus Health & BM&DC Operative Surgery Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=E1ljClS0DhM',
    chapters: [
      { timestampSeconds: 0, title: 'Pneumoperitoneum & Port Triangulation', titleBn: 'নিউমোপেরিটোনিয়াম ও পোর্ট স্থাপন' },
      { timestampSeconds: 70, title: 'Identification of Taenia Coli Convergence', titleBn: 'অ্যাপেন্ডিক্সের গোড়া শনাক্তকরণ' },
      { timestampSeconds: 150, title: 'Mesoappendix Dissection & Artery Control', titleBn: 'অ্যাপেন্ডিকুলার ধমনী লাইগেশন' },
      { timestampSeconds: 230, title: 'Endoloop Base Ligation & Extraction', titleBn: 'বেস লাইগেশন ও অঙ্গ অপসারণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Laparoscopic appendectomy commences with a sub-umbilical 10mm Hasson port creating a 12 mmHg pneumoperitoneum.', textBn: 'নাভির নিচে ১০ মিমি পোর্ট দিয়ে ১২ মিলিমিটার পারদ চাপে গ্যাস প্রবেশ করিয়ে পেট ফোলানো হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'The surgeon identifies the caecum and traces the anterior taenia libera inferiorly to reach the origin of the appendix.', textBn: 'সার্জন সিকাম শনাক্ত করে টিনিয়া কোলাই অনুসরণ করে অ্যাপেন্ডিক্সের সংযোগস্থলে পৌঁছান।' },
      { startSeconds: 85, endSeconds: 175, textEn: 'A window is created in the mesoappendix; the appendicular artery is skeletonized and controlled with titanium clips.', textBn: 'মেসোঅ্যাপেন্ডিক্সে ছিদ্র করে অ্যাপেন্ডিকুলার ধমনীকে ক্লিপ দিয়ে রক্তপাত বন্ধ করা হয়।' },
      { startSeconds: 175, endSeconds: 315, textEn: 'Two absorbable Endoloops are secured at the appendiceal base 3mm from the caecum, and the specimen is retrieved in an endobag.', textBn: 'অ্যাপেন্ডিক্সের গোড়ায় দুটি এন্ডোলুপ দিয়ে বেঁধে কেটে এন্ডোব্যাগে করে নিরাপদে বের করা হয়।' }
    ]
  },
  {
    id: 'vid-surg-cholecystectomy',
    title: 'Cholecystectomy — Laparoscopic Critical View of Safety',
    titleBn: 'কোলেসিস্টেক্টমি — ল্যাপারোস্কোপিক পিত্তথলি অপসারণ',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'General Surgery',
    duration: '5:45',
    durationSeconds: 345,
    has3DAnimation: true,
    animationType: 'cholecystectomy-cvs',
    thumbnailUrl: '/anatomy/liver/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/ffoKThdqo4I?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'ffoKThdqo4I',
    description: 'Gold-standard 3D surgical animation demonstrating Strasberg’s Critical View of Safety (CVS): clearing Calot’s triangle, unroofing the cystic plate, and isolating the cystic duct and artery before clipping.',
    relatedAnatomy: [
      'Gallbladder (Fundus, Body, Infundibulum)',
      'Calot Triangle (Hepatocystic Triangle)',
      'Cystic Duct & Cystic Artery',
      'Common Bile Duct (CBD)',
      'Cystic Plate & Rouvière Sulcus'
    ],
    whatYouWillLearn: [
      'The three mandatory criteria of Strasberg’s Critical View of Safety (CVS)',
      'Anatomical hazards: aberrant right hepatic artery and accessory biliary ducts (Luschka)',
      'Safe clip application sequence to prevent catastrophic Common Bile Duct transection',
      'Hook electrocautery technique for dissecting the gallbladder out of the hepatic fossa'
    ],
    attribution: 'Nucleus Medical Media & SAGES Laparoscopic Surgery Guild',
    attributionUrl: 'https://www.youtube.com/watch?v=ffoKThdqo4I',
    chapters: [
      { timestampSeconds: 0, title: 'Fundic Traction & Exposure of Calot Triangle', titleBn: 'ক্যালট ট্রায়াঙ্গেল উন্মোচন' },
      { timestampSeconds: 85, title: 'Dissection to Achieve Critical View of Safety (CVS)', titleBn: 'ক্রিটিক্যাল ভিউ অব সেফটি নিশ্চিতকরণ' },
      { timestampSeconds: 180, title: 'Cystic Duct & Artery Clipping', titleBn: 'সিস্টিক নালী ও ধমনী ক্লিপিং' },
      { timestampSeconds: 260, title: 'Hepatic Fossa Dissection & Hemostasis', titleBn: 'যকৃৎ শয্যা থেকে পিত্তথলি পৃথকীকরণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Cephalic fundus traction and lateral infundibulum retraction open the hepatocystic triangle of Calot.', textBn: 'পিত্তথলি টেনে ধরে ক্যালট ট্রায়াঙ্গেলের সংযোগস্থল স্পষ্ট করা হয়।' },
      { startSeconds: 35, endSeconds: 110, textEn: 'Dissection removes all fibrofatty tissue in Calot’s triangle and unroofs the lower third of the gallbladder from the liver bed.', textBn: 'ক্যালট ট্রায়াঙ্গেলের চর্বি পরিষ্কার করে যকৃৎ থেকে পিত্তথলির নিচের অংশ আলগা করা হয়।' },
      { startSeconds: 110, endSeconds: 195, textEn: 'The Critical View of Safety is achieved: only two structures (cystic duct and cystic artery) enter the gallbladder.', textBn: 'ক্রিটিক্যাল ভিউ নিশ্চিত হয়: কেবল সিস্টিক ডাক্ট ও সিস্টিক আর্টারি পিত্তথলিতে প্রবেশ করছে দেখা যায়।' },
      { startSeconds: 195, endSeconds: 345, textEn: 'Three clips are placed on the duct and artery before transection; the gallbladder is dissected out of the liver bed.', textBn: 'দুটি ক্লিপ নিচে ও একটি উপরে দিয়ে কেটে পিত্তথলিটি যকৃৎ থেকে আলাদা করে বের করে আনা হয়।' }
    ]
  },
  {
    id: 'vid-surg-hernia-repair',
    title: 'Hernia Repair — Inguinal Mesh Hernioplasty & TAPP',
    titleBn: 'হার্নিয়া রিপেয়ার — ইনগুইনাল মেশ হার্নিওপ্লাস্টি ও টিএপিপি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'General Surgery',
    duration: '4:50',
    durationSeconds: 290,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/torso_hero.jpg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/R6pwlIVQPVA?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'R6pwlIVQPVA',
    description: 'High-precision 3D surgical animation of inguinal hernia repair (Nucleus Medical Media): anatomy of the myopectineal orifice of Fruchaud, peritoneal sac reduction, and tension-free mesh reinforcement.',
    relatedAnatomy: [
      'Inguinal Ligament (Poupart)',
      'Conjoint Tendon & Transversalis Fascia',
      'Deep & Superficial Inguinal Rings',
      'Inferior Epigastric Artery & Vein',
      'Triangle of Doom (Iliac Vessels)',
      'Triangle of Pain (Femoral & Cutaneous Nerves)'
    ],
    whatYouWillLearn: [
      'Direct (Hesselbach triangle) vs Indirect (internal ring lateral to inferior epigastrics) hernia paths',
      'Boundaries of the Triangle of Doom containing external iliac artery and vein',
      'Boundaries of the Triangle of Pain containing lateral cutaneous nerve of the thigh and femoral branch of genitofemoral',
      'Tension-free placement of synthetic polypropylene mesh covering all potential hernia orifices'
    ],
    attribution: 'Nucleus Medical Media & BM&DC Operative Surgery Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=R6pwlIVQPVA',
    chapters: [
      { timestampSeconds: 0, title: 'Anatomy of the Myopectineal Orifice', titleBn: 'ইনগুইনাল নালী ও হেসেলবাক ট্রায়াঙ্গেল' },
      { timestampSeconds: 70, title: 'Hernia Sac Reduction & Cord Skeletonization', titleBn: 'হার্নিয়া স্যাক ভেতরের দিকে টেনে আনা' },
      { timestampSeconds: 150, title: 'Navigating the Triangles of Doom & Pain', titleBn: 'রক্তনালী ও স্নায়ুর ঝুঁকি অঞ্চল রক্ষা' },
      { timestampSeconds: 220, title: 'Mesh Fixation & Peritoneal Closure', titleBn: 'মেশ স্থাপন ও পেরিটোনিয়াম বন্ধকরণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Inguinal hernias occur through natural weakness in the lower abdominal wall transversalis fascia.', textBn: 'তলপেটের দুর্বল অংশ দিয়ে অন্ত্র বাইরে বের হয়ে এলে ইনগুইনাল হার্নিয়া সৃষ্টি হয়।' },
      { startSeconds: 30, endSeconds: 90, textEn: 'The surgeon reduces the peritoneal hernia sac away from the spermatic cord and inferior epigastric vessels.', textBn: 'সার্জন সাবধানে হার্নিয়ার থলে রক্তনালী থেকে আলাদা করে পেটের ভেতরে ফিরিয়ে নেন।' },
      { startSeconds: 90, endSeconds: 175, textEn: 'Careful avoidance of the Triangle of Doom prevents major iliac vessel injury, while avoiding the Triangle of Pain prevents chronic neuralgia.', textBn: 'ট্রায়াঙ্গেল অব ডুম ও পেইন বাঁচিয়ে কাজ করা হয় যাতে প্রধান রক্তনালী বা স্নায়ু ক্ষতিগ্রস্ত না হয়।' },
      { startSeconds: 175, endSeconds: 290, textEn: 'A 10x15 cm lightweight polypropylene mesh is contoured over the myopectineal orifice to reinforce the floor.', textBn: 'একটি কৃত্রিম মেশ স্থাপন করে পেট প্রাচীর মজবুত করা হয় যাতে হার্নিয়া আর ফিরে না আসে।' }
    ]
  },
  {
    id: 'vid-surg-heart-bypass',
    title: 'Heart Bypass — Coronary Artery Bypass Grafting (CABG)',
    titleBn: 'হার্ট বাইপাস — করোনারি আর্টারি বাইপাস গ্রাফটিং (সিএবিজি)',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Cardiothoracic Surgery',
    duration: '5:30',
    durationSeconds: 330,
    has3DAnimation: true,
    animationType: 'cabg-surgery',
    thumbnailUrl: '/anatomy/heart/organ.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kxc22Fjd1NQ?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'kxc22Fjd1NQ',
    description: 'High-precision 3D surgical animation of on-pump CABG (Heart Bypass Surgery): median sternotomy, cardiopulmonary bypass initiation, pedicled in-situ Left Internal Mammary Artery (LIMA) to LAD anastomosis, and reversed saphenous vein grafting.',
    relatedAnatomy: [
      'Left Internal Mammary Artery (LIMA)',
      'Left Anterior Descending (LAD) Artery',
      'Ascending Aorta',
      'Great Saphenous Vein (GSV)',
      'Right Coronary Artery (RCA) & Circumflex'
    ],
    whatYouWillLearn: [
      'Superiority of LIMA-to-LAD arterial grafting with over 90% 10-year patency rates',
      'Aortic cross-clamping and hyperkalemic cardioplegic cold arrest mechanism',
      'End-to-side microvascular continuous anastomosis using 7-0 and 8-0 monofilament Prolene sutures',
      'Weaning from cardiopulmonary bypass and protamine reversal of systemic heparinization'
    ],
    attribution: 'Nucleus Medical Media & BM&DC Cardiothoracic Surgery Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=kxc22Fjd1NQ',
    chapters: [
      { timestampSeconds: 0, title: 'Median Sternotomy & LIMA Harvesting', titleBn: 'স্টার্নোটমি ও লিমা ধমনী সংগ্রহ' },
      { timestampSeconds: 80, title: 'Cardiopulmonary Bypass & Cardioplegia', titleBn: 'বাইপাস মেশিন ও হার্ট থামানো' },
      { timestampSeconds: 160, title: 'Microvascular LIMA-to-LAD Anastomosis', titleBn: 'লিমা ও এলএডি ধমনী জোড়া লাগানো' },
      { timestampSeconds: 245, title: 'Aortic Cross-Clamp Release & Reperfusion', titleBn: 'ক্ল্যাম্প উন্মুক্তকরণ ও রক্তপ্রবাহ পুনঃস্থাপন' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'CABG revascularizes ischemic myocardium beyond critical coronary plaques using harvested arterial and venous conduits.', textBn: 'করোনারি ধমনীতে ব্লক থাকলে বিকল্প রক্তনালী জোড়া দিয়ে হৃদপেশিতে রক্তপ্রবাহ ফেরানো হয়।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'The pedicled Left Internal Mammary Artery is dissected off the chest wall while preserving its subclavian origin.', textBn: 'বুকের ভেতর থেকে বাম ইন্টারনাল ম্যামারি ধমনী প্রস্তুত করে মুক্ত করা হয়।' },
      { startSeconds: 95, endSeconds: 185, textEn: 'Under hypothermic cardioplegic arrest, a 1.5mm arteriotomy is made in the LAD; LIMA is sewn end-to-side with continuous 8-0 Prolene.', textBn: 'হার্ট সাময়িক থামিয়ে ৮-০ সুতা দিয়ে অণুবীক্ষণিক দক্ষতায় এলএডি ধমনীর সাথে লিমা জোড়া লাগানো হয়।' },
      { startSeconds: 185, endSeconds: 330, textEn: 'Upon cross-clamp removal, warm blood reperfuses the myocardium; ischemic cyanosis immediately turns into healthy red perfusion.', textBn: 'ক্ল্যাম্প খুলে দিলে নতুন বাইপাস দিয়ে অক্সিজেনযুক্ত রক্ত পৌঁছে হৃদপেশির সজীবতা ফিরিয়ে দেয়।' }
    ]
  },
  {
    id: 'vid-surg-heart-valve-replacement',
    title: 'Heart Valve Replacement — Surgical & TAVR Techniques',
    titleBn: 'হার্ট ভালভ প্রতিস্থাপন — কৃত্রিম কপাটিকা সংযোজন ও টেভার',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Cardiothoracic Surgery',
    duration: '4:55',
    durationSeconds: 295,
    has3DAnimation: true,
    animationType: 'cardiac-cycle',
    thumbnailUrl: '/anatomy/heart/location.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/iMXj0e1e5G8?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'iMXj0e1e5G8',
    description: 'High-precision 3D surgical animation of Aortic Valve Replacement (Nucleus Medical Media): calcified leaflet excision, annular sizing, pledgeted mattress suture seating, and TAVR techniques.',
    relatedAnatomy: [
      'Aortic Annulus & Sinuses of Valsalva',
      'Coronary Ostia (Left & Right)',
      'Calcified Bicuspid/Tricuspid Leaflets',
      'Mitral Subvalvular Apparatus',
      'Atrioventricular Node & Bundle of His'
    ],
    whatYouWillLearn: [
      'Biomechanical trade-offs: Mechanical (lifelong durability, warfarin required) vs Bioprosthetic (tissue, no anticoagulation, 12–15 yr lifespan)',
      'Preserving adequate clearance below coronary ostia during annular seating',
      'Avoiding conduction blocks by placing sutures away from the membranous septum',
      'Transcatheter aortic valve implantation (TAVI/TAVR) balloon-expandable transfemoral deployment'
    ],
    attribution: 'Nucleus Medical Media & Thoracic Surgery Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=iMXj0e1e5G8',
    chapters: [
      { timestampSeconds: 0, title: 'Aortotomy & Leaflet Excision', titleBn: 'মহাধমনী খোলা ও ক্ষতিগ্রস্ত ভালভ কাটা' },
      { timestampSeconds: 70, title: 'Annular Decalcification & Sizing', titleBn: 'ক্যালসিয়াম পরিষ্কার ও ভালভ সাইজিং' },
      { timestampSeconds: 150, title: 'Pledgeted Suture Placement & Seating', titleBn: 'কৃত্রিম ভালভ সেলাই করে বসানো' },
      { timestampSeconds: 220, title: 'Transcatheter (TAVR) Alternate Approach', titleBn: 'ক্যাথেটার দিয়ে টেভার পদ্ধতি' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Severe aortic stenosis restricts systolic outflow, triggering compensatory concentric left ventricular hypertrophy.', textBn: 'মহাধমনীর কপাটিকা সংকুচিত হয়ে শক্ত হয়ে গেলে হৃৎপিণ্ডের রক্ত পাম্প করতে চরম কষ্ট হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Following aortotomy, calcified leaflets are sharply excised, clearing calcium debris to create a smooth circular annulus.', textBn: 'সার্জন সাবধানে ক্যালসিফায়েড ক্ষতিগ্রস্ত কপাটিকা কেটে পরিষ্কার পরিচ্ছন্ন রিং তৈরি করেন।' },
      { startSeconds: 85, endSeconds: 175, textEn: 'Circumferential 2-0 braided polyester mattress sutures with Teflon pledgets seat the bileaflet mechanical or bovine pericardial valve.', textBn: 'টেফলন প্যাডযুক্ত শক্তিশালী সুতা দিয়ে কৃত্রিম কপাটিকাটি দৃঢ়ভাবে খাঁজে বসানো হয়।' },
      { startSeconds: 175, endSeconds: 295, textEn: 'In high-risk patients, TAVR delivers a crimped bioprosthesis via femoral catheter, expanding it within the native annulus without open surgery.', textBn: 'বয়স্ক ও ঝুঁকিপূর্ণ রোগীর ক্ষেত্রে কোনো কাটাছেঁড়া ছাড়াই ক্যাথেটারের মাধ্যমে নতুন ভালভ বসানো হয়।' }
    ]
  },
  {
    id: 'vid-surg-cesarean-section',
    title: 'Cesarean Section — Lower Segment Transverse Technique',
    titleBn: 'সিজারিয়ান সেকশন — লোয়ার সেগমেন্ট সিজারিয়ান অপারেশন',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Obstetrics & Gynecology',
    duration: '4:40',
    durationSeconds: 280,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/torso_hero.jpg',
    description: 'Obstetric surgical animation demonstrating Pfannenstiel transverse laparotomy, rectus fascial mobilization, bladder flap creation, lower uterine segment hysterotomy (Kerr incision), fetal delivery, and two-layer uterine closure.',
    relatedAnatomy: [
      'Pfannenstiel Suprapubic Skin Line',
      'Rectus Abdominis Muscle & Sheath',
      'Vesicouterine Peritoneal Fold & Bladder',
      'Lower Uterine Segment',
      'Uterine Arteries & Veins'
    ],
    whatYouWillLearn: [
      'Layer-by-layer entry: skin, Camper/Scarpa fascia, anterior rectus sheath, pyramidalis muscle separation',
      'Mobilization and downward reflection of the bladder flap to protect the bladder from hysterotomy injury',
      'Blunt digital lateral extension of the uterine incision to prevent laceration of ascending uterine vessels',
      'Synthetic absorbable continuous two-layer hysterorrhaphy and active management of third stage labor'
    ],
    attribution: 'MedlinePlus / NIH & Royal College of Obstetricians and Gynaecologists',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000025.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Pfannenstiel Laparotomy & Rectus Sheath Incision', titleBn: 'ত্বক ও রেকটাস শীত উন্মোচন' },
      { timestampSeconds: 65, title: 'Bladder Flap Reflection', titleBn: 'মূত্রথলি নিচের দিকে নামিয়ে রক্ষা' },
      { timestampSeconds: 130, title: 'Lower Segment Hysterotomy & Cephalic Delivery', titleBn: 'জরায়ু কাটা ও নবজাতক প্রসব' },
      { timestampSeconds: 205, title: 'Placental Extraction & Two-Layer Uterine Closure', titleBn: 'ফুল অপসারণ ও জরায়ু সেলাই' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Cesarean delivery is performed through a low transverse suprapubic incision two centimeters above the pubic symphysis.', textBn: 'তলপেটে আড়াআড়ি কসমেটিক ইনসিশন দিয়ে সিজারিয়ান অস্ত্রোপচার শুরু করা হয়।' },
      { startSeconds: 30, endSeconds: 80, textEn: 'The rectus sheath is incised transversely and peeled off the rectus muscles; the vesicouterine peritoneum is opened to lower the bladder.', textBn: 'পেশির আবরণ সরিয়ে মূত্রথলির পর্দা আলাদা করে নিচে নামিয়ে নিরাপদ ক্ষেত্র তৈরি করা হয়।' },
      { startSeconds: 80, endSeconds: 155, textEn: 'A curved horizontal incision is made in the lower uterine segment, followed by controlled blunt digital extension.', textBn: 'জরায়ুর নিচের পাতলা অংশে সাবধানে কেটে আঙুল দিয়ে প্রসারণ করা হয় যাতে রক্তনালী না কাটে।' },
      { startSeconds: 155, endSeconds: 280, textEn: 'The fetal head is gently elevated through the hysterotomy; following placental delivery, the uterine muscularis is closed in two continuous layers.', textBn: 'নবজাতকের মাথা আলতোভাবে বের করে এনে নাভি কেটে আলাদা করা হয় এবং জরায়ু শক্ত করে সেলাই করা হয়।' }
    ]
  },
  {
    id: 'vid-surg-hysterectomy',
    title: 'Hysterectomy — Total Laparoscopic Hysterectomy (TLH)',
    titleBn: 'হিস্টেরেক্টমি — সম্পূর্ণ ল্যাপারোস্কোপিক জরায়ু অপসারণ',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Obstetrics & Gynecology',
    duration: '5:20',
    durationSeconds: 320,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/torso_hero.jpg',
    description: 'Comprehensive surgical animation of total laparoscopic hysterectomy: desiccation of round and infundibulopelvic ligaments, bladder dissection, uterine artery skeletonization, colpotomy, and vaginal cuff closure.',
    relatedAnatomy: [
      'Uterus, Cervix & Fallopian Tubes',
      'Round Ligament & Broad Ligament',
      'Infundibulopelvic (IP) Ligament (Ovarian Vessels)',
      'Uterine Artery & Cardinal Ligament',
      'Ureter ("Water under the bridge")',
      'Uterosacral Ligament & Vagina'
    ],
    whatYouWillLearn: [
      'Retroperitoneal identification of the ureter crossing under the uterine artery at the ischial spine',
      'Selective desiccation of uterine pedicles while lateralizing the ureter by at least 1.5 cm',
      'Circumferential colpotomy over a vaginal manipulator cup using monopolar hook diathermy',
      'Endoscopic barbed suture closure of the vaginal vault to maintain pelvic organ support'
    ],
    attribution: 'Toronto Video Atlas of Surgery (TVASurg) - University of Toronto',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Ligament Coagulation & Peritoneal Opening', titleBn: 'লিগামেন্ট পৃথকীকরণ' },
      { timestampSeconds: 80, title: 'Retroperitoneal Ureter Identification', titleBn: 'ইউরেটার শনাক্ত করে নিরাপদে রাখা' },
      { timestampSeconds: 160, title: 'Uterine Artery Desiccation & Skeletonization', titleBn: 'জরায়ুর ধমনী বন্ধ করা' },
      { timestampSeconds: 240, title: 'Colpotomy & Vaginal Cuff Suture', titleBn: 'কলপোটমি ও ভ্যাজাইনাল কাফ সেলাই' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Total laparoscopic hysterectomy allows complete removal of the uterus and cervix through minimally invasive keyhole ports.', textBn: 'ল্যাপারোস্কোপিক হিস্টেরেক্টমির মাধ্যমে জরায়ু ও জরায়ুমুখ ক্ষুদ্র ছিদ্রে অপসারণ করা হয়।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'Bipolar energy divides the round ligaments, opening the broad ligament leaves to access the pelvic retroperitoneum.', textBn: 'লিগামেন্ট কেটে পেলভিসের ভেতরের স্থান উন্মুক্ত করা হয়।' },
      { startSeconds: 95, endSeconds: 180, textEn: 'The surgeon directly visualizes the ureter running beneath the uterine artery, ensuring a wide safety margin before vessel sealing.', textBn: 'সার্জন সরাসরি ইউরেটার দেখে নিশ্চিত হন যে রক্তনালী কাটার সময় ইউরেটারে আঁচ লাগবে না।' },
      { startSeconds: 180, endSeconds: 320, textEn: 'Circumferential colpotomy separates the cervix from the vagina; the specimen is removed and the vaginal vault is closed with barbed sutures.', textBn: 'জরায়ুমুখ যোনিপথ থেকে আলাদা করে বের করা হয় এবং বার্বড সুতা দিয়ে যোনিপথ শক্ত করে সেলাই করা হয়।' }
    ]
  },
  {
    id: 'vid-surg-kidney-surgery',
    title: 'Kidney Surgery — Laparoscopic Radical Nephrectomy',
    titleBn: 'কিডনি সার্জারি — ল্যাপারোস্কোপিক নেফ্রেক্টমি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Urology',
    duration: '5:10',
    durationSeconds: 310,
    has3DAnimation: true,
    animationType: 'kidney-nephron',
    thumbnailUrl: '/anatomy/kidneys/organ.webp',
    description: 'Detailed urological surgical animation demonstrating colon medialization, exposure of Gerota’s fascia, early vascular control of the renal artery and vein with vascular endostaplers, and intact specimen retrieval.',
    relatedAnatomy: [
      'Gerota’s Fascia & Perinephric Fat',
      'White Line of Toldt',
      'Renal Artery & Renal Vein',
      'Left Gonadal & Adrenal Vein Branches',
      'Ureter & Psoas Muscle'
    ],
    whatYouWillLearn: [
      'Incision along the avascular line of Toldt to mobilize the ascending/descending colon medially',
      'Principle of early vascular control: isolating and ligating the renal artery prior to the renal vein to prevent graft engorgement',
      'Vascular stapler deployment (tri-staple technology) across high-flow renal pedicles',
      'Dissection of Gerota’s fascia outside the perinephric fat envelope for oncological clearance'
    ],
    attribution: 'TVASurg - University of Toronto & European Association of Urology',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Colon Medialization (Line of Toldt)', titleBn: 'অন্ত্র ভেতরের দিকে সরানো' },
      { timestampSeconds: 75, title: 'Hilar Dissection & Renal Artery Isolation', titleBn: 'বৃক্কের ধমনী ও শিরা পৃথকীকরণ' },
      { timestampSeconds: 160, title: 'Endostapler Vascular Ligation', titleBn: 'ভাস্কুলার স্টেপলার দিয়ে রক্তনালী বন্ধ' },
      { timestampSeconds: 235, title: 'Gerota En-Bloc Dissection & Retrieval', titleBn: 'টিউমারসহ সম্পূর্ণ কিডনি অপসারণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Laparoscopic nephrectomy provides oncological cure for localized renal cell carcinoma with minimal morbidity.', textBn: 'কিডনি ক্যান্সারের ক্ষেত্রে ল্যাপারোস্কোপিক পদ্ধতিতে সম্পূর্ণ কিডনি অপসারণ একটি নিরাপদ চিকিৎসা।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'The colon is reflected medially off Gerota’s fascia along the white line of Toldt, exposing the psoas muscle and retroperitoneum.', textBn: 'বৃহদন্ত্র সরিয়ে কিডনি ঢেকে রাখা জেরোটা ফাসা উন্মুক্ত করা হয়।' },
      { startSeconds: 95, endSeconds: 185, textEn: 'The renal hilum is approached; the posterior renal artery is identified, clipped, and divided before dividing the main renal vein.', textBn: 'কিডনির প্রধান ধমনী প্রথমে শনাক্ত করে ক্লিপ দিয়ে কেটে তারপর শিরা আলাদা করা হয়।' },
      { startSeconds: 185, endSeconds: 310, textEn: 'The ureter is divided low, and the kidney is dissected en-bloc within Gerota’s envelope, extracted in an entrapment sack.', textBn: 'ইউরেটার কেটে সম্পূর্ণ কিডনি অক্ষত অবস্থায় একটি বিশেষ ব্যাগে ভরে বাইরে আনা হয়।' }
    ]
  },
  {
    id: 'vid-surg-liver-surgery',
    title: 'Liver Surgery — Anatomical Hepatectomy & Segmentectomy',
    titleBn: 'লিভার সার্জারি — হেপাটেক্টমি ও যকৃতের সেগমেন্টেক্টমি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Surgical Oncology',
    duration: '5:50',
    durationSeconds: 350,
    has3DAnimation: true,
    animationType: 'cholecystectomy-cvs',
    thumbnailUrl: '/anatomy/liver/organ.webp',
    description: 'Advanced hepato-pancreato-biliary surgical animation illustrating Couinaud segmental anatomy, Glissonian pedicle isolation, Pringle maneuver inflow control, and Cavitron Ultrasonic Surgical Aspirator (CUSA) parenchymal transection.',
    relatedAnatomy: [
      'Couinaud Liver Segments (I–VIII)',
      'Cantlie’s Line (Midplane of Liver)',
      'Glissonian Pedicles (Artery, Portal Vein, Bile Duct)',
      'Right, Middle & Left Hepatic Veins',
      'Inferior Vena Cava (IVC)'
    ],
    whatYouWillLearn: [
      'Cantlie’s anatomical line dividing the liver into functional right and left hemilivers',
      'Pringle maneuver: temporary cross-clamping of the hepatoduodenal ligament to arrest blood inflow',
      'Parenchymal transection plane preservation using ultrasonic aspiration (CUSA) and bipolar coagulators',
      'Managing low central venous pressure (CVP < 5 mmHg) to minimize hepatic venous back-bleeding'
    ],
    attribution: 'Toronto Video Atlas of Surgery (TVASurg) - University of Toronto',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Couinaud Segmental Anatomy & Inflow Control', titleBn: 'যকৃতের সেগমেন্ট ও রক্তপ্রবাহ নিয়ন্ত্রণ' },
      { timestampSeconds: 85, title: 'Pringle Maneuver Clamping', titleBn: 'প্রিঙ্গল ম্যানুভার দিয়ে সাময়িক রক্ত বন্ধ' },
      { timestampSeconds: 175, title: 'CUSA Ultrasonic Parenchymal Transection', titleBn: 'আল্ট্রাসনিক অ্যাসপিরেটর দিয়ে লিভার কাটা' },
      { timestampSeconds: 265, title: 'Major Hepatic Vein Ligation & Hemostasis', titleBn: 'প্রধান শিরা লাইগেশন ও রক্তপাত বন্ধ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Anatomical hepatectomy requires precise knowledge of the eight independent functional Couinaud segments.', textBn: 'যকৃতের অস্ত্রোপচারের জন্য আটটি স্বাধীন সেগমেন্ট ও তাদের নিজস্ব রক্তপ্রবাহ বোঝা আবশ্যক।' },
      { startSeconds: 35, endSeconds: 105, textEn: 'The Pringle maneuver cross-clamps the portal triad for 15-minute cycles, dramatically reducing intraoperative blood loss.', textBn: 'পোর্টাল ট্রায়াডে ক্ল্যাম্প লাগিয়ে সাময়িকভাবে রক্ত বন্ধ রেখে রক্তপাত নিয়ন্ত্রণ করা হয়।' },
      { startSeconds: 105, endSeconds: 200, textEn: 'The CUSA ultrasonic aspirator selectively fragments soft hepatocytes while skeletonizing and preserving vital intrahepatic vessels.', textBn: 'আল্ট্রাসনিক অ্যাসপিরেটর যকৃতের নরম কোষ পরিষ্কার করে রক্তনালীগুলোকে অক্ষত রেখে দেয়।' },
      { startSeconds: 200, endSeconds: 350, textEn: 'Vessels are ligated with clips or vascular endostaplers along Cantlie’s line, leaving a clean, hemostatic resection bed.', textBn: 'রক্তনালীগুলো ক্লিপ বা স্টেপলার দিয়ে সিল করে টিউমারযুক্ত অংশ নিখুঁতভাবে অপসারণ করা হয়।' }
    ]
  },
  {
    id: 'vid-surg-lung-surgery',
    title: 'Lung Surgery — Video-Assisted Thoracoscopic (VATS) Lobectomy',
    titleBn: 'ফুসফুস সার্জারি — ভিএটিএস লোবেকটমি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Thoracic Surgery',
    duration: '5:05',
    durationSeconds: 305,
    has3DAnimation: true,
    animationType: 'lungs-alveoli',
    thumbnailUrl: '/anatomy/lungs/organ.webp',
    description: 'Minimally invasive thoracic surgical animation showing anatomical right upper lobectomy via uniportal VATS: individual dissection and stapling of pulmonary vein branches, pulmonary arterial truncus, and lobar bronchus.',
    relatedAnatomy: [
      'Superior Pulmonary Vein',
      'Truncus Anterior (Pulmonary Artery)',
      'Right Upper Lobe Bronchus',
      'Azygos Vein & Phrenic Nerve',
      'Mediastinal Lymph Node Stations'
    ],
    whatYouWillLearn: [
      'Single-lung ventilation utilizing a double-lumen endotracheal tube',
      'The critical order of anatomical division: pulmonary vein first, followed by pulmonary arterial branches, then bronchus',
      'Endoscopic linear stapler selection (vascular white/gray vs thick bronchial black/green loads)',
      'Water submersion air leak testing under re-expansion before chest tube placement'
    ],
    attribution: 'Thoracic Surgery Video Atlas & Society of Thoracic Surgeons',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Port Insertion & Single-Lung Collapse', titleBn: 'পোর্ট স্থাপন ও এক ফুসফুস ডিফ্লেশন' },
      { timestampSeconds: 70, title: 'Pulmonary Vein Dissection & Stapling', titleBn: 'পালমোনারি ভেইন স্টেপলিং' },
      { timestampSeconds: 155, title: 'Arterial Branch & Bronchial Division', titleBn: 'ধমনীর শাখা ও ব্রংকাস বিভাজন' },
      { timestampSeconds: 230, title: 'Mediastinal Lymphadenectomy & Air Leak Check', titleBn: 'লিম্ফ নোড পরিষ্কার ও বাতাস লিক পরীক্ষা' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'VATS lobectomy offers curative resection for early-stage lung cancer without rib spreading or thoracotomy.', textBn: 'ভিএটিএস পদ্ধতিতে বুক না কেটে ক্যামেরার সাহায্যে ফুসফুসের টিউমারযুক্ত লোব অপসারণ করা হয়।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'Under single-lung ventilation, the superior pulmonary vein is mobilized and divided with a vascular endostapler.', textBn: 'এক ফুসফুস বাতাসহীন রেখে প্রথমে পালমোনারি শিরা ভাস্কুলার স্টেপলার দিয়ে কাটা হয়।' },
      { startSeconds: 95, endSeconds: 180, textEn: 'The truncus anterior branch of the pulmonary artery is carefully skeletonized, followed by the upper lobe bronchus.', textBn: 'পালমোনারি ধমনীর শাখা এবং ব্রংকাস আলাদা করে স্টেপলার দিয়ে নিরাপদে সিল করা হয়।' },
      { startSeconds: 180, endSeconds: 305, textEn: 'The resected lobe is retrieved in a bag; warm saline is instilled to verify zero bronchial air leak under 25 cmH2O pressure.', textBn: 'অপসারিত লোব বের করে স্যালাইন দিয়ে পরীক্ষা করা হয় যেন কোনো বাতাস লিক না থাকে।' }
    ]
  },
  {
    id: 'vid-surg-brain-surgery',
    title: 'Brain Surgery — Image-Guided Craniotomy & Microneurosurgery',
    titleBn: 'মস্তিষ্ক সার্জারি — ক্র্যানিওটমি ও মাইক্রো-নিউরোসার্জারি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Neurosurgery',
    duration: '5:40',
    durationSeconds: 340,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/brain/organ.webp',
    description: 'High-definition neurosurgical animation detailing Mayfield headpin fixation, neuronavigation coregistration, high-speed pneumatic craniotome bone flap creation, dural opening, and ultrasonic aspirator tumor debulking.',
    relatedAnatomy: [
      'Pterion & Middle Meningeal Artery',
      'Dura Mater & Arachnoid Membrane',
      'Cortical Gyri & Sulci',
      'Sylvian Fissure',
      'Internal Carotid & Middle Cerebral Arteries',
      'Eloquent Motor & Speech Cortex'
    ],
    whatYouWillLearn: [
      'Frameless optical stereotactic neuronavigation alignment with preoperative 3D MRI',
      'Safe placement of burr holes and cutting the bone flap without tearing underlying dural venous sinuses',
      'Microsurgical arachnoid dissection planes under high magnification operating microscopes',
      'Watertight dural closure with pericranial patch to prevent postoperative cerebrospinal fluid (CSF) leaks'
    ],
    attribution: 'MedlinePlus / NIH & World Federation of Neurosurgical Societies',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000037.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Neuronavigation & Pterional Craniotomy', titleBn: 'নিউরোনেভিগেশন ও মাথার খুলি উন্মোচন' },
      { timestampSeconds: 85, title: 'Dural Opening & Brain Relaxation', titleBn: 'ডুরা মেটার খোলা ও ব্রেইন শিথিলকরণ' },
      { timestampSeconds: 175, title: 'Microsurgical Arachnoid Dissection', titleBn: 'অ্যারাকনয়েড পর্দার ভেতর দিয়ে প্রবেশ' },
      { timestampSeconds: 260, title: 'Ultrasonic Tumor Resection & Watertight Closure', titleBn: 'টিউমার অপসারণ ও ডুরা সেলাই' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Microsurgical craniotomy combines high-power optics and stereotactic neuronavigation to access deep intracranial pathologies.', textBn: 'আধুনিক ক্র্যানিওটমিতে কম্পিউটার নেভিগেশন ও অণুবীক্ষণ যন্ত্রের মাধ্যমে মস্তিষ্কের গভীরে পৌঁছানো হয়।' },
      { startSeconds: 35, endSeconds: 105, textEn: 'A high-speed craniotome creates a temporary bone flap; intravenous mannitol relaxes the brain to prevent cortical herniation.', textBn: 'মাথার খুলির একটি অংশ সাবধানে কেটে আলাদা করা হয় এবং ব্রেনের ফোলা কমাতে ওষুধ প্রয়োগ করা হয়।' },
      { startSeconds: 105, endSeconds: 210, textEn: 'Under the microscope, sharp dissection through natural arachnoid fissures reveals the lesion without injuring normal brain tissue.', textBn: 'অণুবীক্ষণ যন্ত্রের নিচে প্রাকৃতিক ফাঁক দিয়ে মস্তিষ্কের সুস্থ কোষ না ছুঁয়ে টিউমারের কাছে যাওয়া হয়।' },
      { startSeconds: 210, endSeconds: 340, textEn: 'The tumor is debulked using the Cavitron Ultrasonic Aspirator; the dura is closed watertight with non-absorbable monofilament.', textBn: 'আল্ট্রাসনিক অ্যাসপিরেটরে টিউমার টুকরো করে শুষে নেওয়া হয় এবং মস্তিষ্কের পর্দা শক্ত করে সেলাই করা হয়।' }
    ]
  },
  {
    id: 'vid-surg-laparoscopic-surgery',
    title: 'Laparoscopic Surgery — Fundamentals, Triangulation & Ergonomics',
    titleBn: 'ল্যাপারোস্কোপিক সার্জারি — ট্রায়াঙ্গুলেশন, এরগোনোমিক্স ও মূলনীতি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'General Surgery',
    duration: '4:35',
    durationSeconds: 275,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/torso_hero.jpg',
    description: 'Educational core animation for surgical residents explaining the optical axis, 60-degree triangulation principle, the fulcrum effect at the abdominal wall, and electrosurgical safety.',
    relatedAnatomy: [
      'Anterior Abdominal Wall Layers',
      'Linea Alba & Umbilicus',
      'Inferior Epigastric Vessels',
      'Pneumoperitoneum (CO2 12–15 mmHg)',
      'Trocar Entry Vectors'
    ],
    whatYouWillLearn: [
      'The optical axis principle: keeping the camera centered between working instruments',
      'Ideal 60-degree instrument angle to optimize ergonomics and prevent sword-fighting',
      'Mastering the fulcrum effect (inverting hand motion vectors across the abdominal wall pivot point)',
      'Preventing unintended electrosurgical injuries caused by capacitive coupling and insulation failure'
    ],
    attribution: 'SAGES (Society of American Gastrointestinal and Endoscopic Surgeons)',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Safe Trocar Entry & Veress Needle Physics', titleBn: 'ভেরেজ নিডল ও নিরাপদ ট্রোকার প্রবেশ' },
      { timestampSeconds: 65, title: 'Triangulation & Ergonomic Geometry', titleBn: 'ট্রায়াঙ্গুলেশন ও ৬০ ডিগ্রি কোণ' },
      { timestampSeconds: 140, title: 'Overcoming the Fulcrum Effect', titleBn: 'ফুলক্রাম ইফেক্ট ও বিপরীত হাত নড়াচড়া' },
      { timestampSeconds: 215, title: 'Monopolar vs Bipolar Electrosurgical Safety', titleBn: 'ইলেকট্রোসার্জারির নিরাপত্তা ও ঝুঁকি' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Laparoscopic surgery transforms abdominal procedures by inserting long instruments through 5mm and 10mm ports.', textBn: 'ল্যাপারোস্কোপিক সার্জারিতে পেটে বড় কাটাকাটি না করে কয়েক মিলিমিটার ছিদ্র দিয়ে অপারেশন করা হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Proper triangulation positions the laparoscope between two active instruments at an internal working angle of approximately 60 degrees.', textBn: 'ক্যামেরা মাঝখানে রেখে দুই পাশে ৬০ ডিগ্রি কোণে দুটি ইনস্ট্রুমেন্ট রাখলে কাজ করা সবচেয়ে সহজ হয়।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'The abdominal wall acts as a pivot fulcrum: moving the external handle right drives the internal tip left, requiring neuro-motor adaptation.', textBn: 'পেটের প্রাচীর ফুলক্রাম হিসেবে কাজ করে, তাই হাত ডানে নিলে ভেতরের অগ্রভাগ বামে যায়।' },
      { startSeconds: 165, endSeconds: 275, textEn: 'Maintaining a clear visual field and inspecting instrument insulation prevents stray electrical currents and visceral burns.', textBn: 'যন্ত্রপাতির সঠিক ইনসুলেশন বজায় রাখলে কোনো অপ্রয়োজনীয় বিদ্যুতায়িত অঙ্গক্ষতি হয় না।' }
    ]
  },
  {
    id: 'vid-surg-robotic-surgery',
    title: 'Robotic Surgery — Multi-Axis Endowrist & Console Precision',
    titleBn: 'রোবটিক সার্জারি — মাল্টি-অ্যাক্সিস এন্ডোরিস্ট ও নির্ভুল প্রযুক্তি',
    category: 'surgical-animations',
    categoryName: 'Surgical Animations',
    categoryNameBn: 'অস্ত্রোপচার অ্যানিমেশন',
    system: 'surgical',
    systemName: 'Robotic Surgery',
    duration: '5:00',
    durationSeconds: 300,
    has3DAnimation: true,
    animationType: 'laparoscopy-triangulation',
    thumbnailUrl: '/anatomy/torso_concept.jpg',
    description: 'Cutting-edge animation illustrating the multi-arm surgical robot, master console 3D stereoscopic vision, tremor cancellation algorithms, and articulating Endowrist technology offering 7 degrees of freedom.',
    relatedAnatomy: [
      'Patient Cart & Robotic Arms',
      'Surgeon Console & Master Tool Manipulators',
      'High-Definition 3D Stereo Endoscope',
      'Articulating Endowrist Instruments',
      'Pelvic & Mediastinal Confined Spaces'
    ],
    whatYouWillLearn: [
      'The 7 degrees of freedom articulating Endowrist exceeding the human wrist in tight operative fields',
      'Optical motion scaling (translating 3 cm hand motion to 1 mm surgical tip motion)',
      'Sub-millimeter physiological tremor filtration for microvascular and nerve-sparing dissections',
      'Console ergonomics reducing physical surgeon fatigue during lengthy oncological resections'
    ],
    attribution: 'TVASurg - University of Toronto & Academic Robotic Surgery Curriculum',
    attributionUrl: 'https://tvasurg.ca/',
    chapters: [
      { timestampSeconds: 0, title: 'Robot Architecture: Cart, Tower & Console', titleBn: 'রোবট সিস্টেমের ৩টি প্রধান অংশ' },
      { timestampSeconds: 70, title: 'Endowrist 7 Degrees of Freedom Geometry', titleBn: 'হাতের কবজির চেয়েও বেশি ঘূর্ণন ক্ষমতা' },
      { timestampSeconds: 155, title: 'Motion Scaling & Tremor Cancellation', titleBn: 'হাত কাঁপুনি দূর ও সূক্ষ্ম স্কেলিং' },
      { timestampSeconds: 230, title: 'Nerve-Sparing Precision in Confined Cavities', titleBn: 'সংকীর্ণ জায়গায় স্নায়ু বাঁচিয়ে অপারেশন' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Robotic surgical systems act as master-slave tele-manipulators, reproducing the surgeon’s hand gestures with enhanced precision.', textBn: 'রোবটিক সার্জারিতে সার্জন কনসোলে বসে যে নির্দেশ দেন, রোবটের বাহু অবিকল সেই কাজ করে।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'Unlike rigid straight laparoscopic tools, robotic Endowrist instruments flex and rotate through 7 complete degrees of freedom.', textBn: 'রোবটের বিশেষ এন্ডোরিস্ট যন্ত্র মানুষের কবজির চেয়েও বেশি কোণে সহজে ঘুরতে পারে।' },
      { startSeconds: 95, endSeconds: 180, textEn: 'Digital algorithms filter out physiological hand tremors and scale movements, allowing micro-suturing with sub-millimeter precision.', textBn: 'কম্পিউটার হাতের ক্ষুদ্র কাঁপুনি বাদ দিয়ে মিলিমিটারের ভগ্নাংশে সূক্ষ্ম সেলাই সম্পন্ন করে।' },
      { startSeconds: 180, endSeconds: 300, textEn: 'High-definition 3D stereoscopy enhances depth perception, enabling nerve-sparing pelvic and thoracic oncological procedures.', textBn: 'ত্রিমাত্রিক এইচডি ভিশনে স্নায়ু ও সূক্ষ্ম রক্তনালী বাঁচিয়ে সফল অস্ত্রোপচার সম্পন্ন হয়।' }
    ]
  },

  // ==========================================
  // CATEGORY 3: PATHOLOGY & DISEASE (9 items)
  // ==========================================
  {
    id: 'vid-path-heart-attack',
    title: 'Heart Attack — Acute Myocardial Infarction & Ischemic Wavefront',
    titleBn: 'হার্ট অ্যাটাক — একিউট মায়োকার্ডিয়াল ইনফার্কশন ও থ্রম্বোসিস',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'cardiovascular',
    systemName: 'Cardiovascular Pathology',
    duration: '4:50',
    durationSeconds: 290,
    has3DAnimation: true,
    animationType: 'atherosclerosis',
    thumbnailUrl: '/anatomy/heart/compare.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/zEzDcElrYgs?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'zEzDcElrYgs',
    description: 'High-definition 3D medical animation of acute myocardial infarction (Nucleus Health): atheromatous plaque rupture, occlusive platelet-fibrin thrombus, transmural myocardial necrosis wavefront, and ECG changes.',
    relatedAnatomy: [
      'Coronary Artery Intima & Media',
      'Vulnerable Fibrous Cap',
      'Lipid Necrotic Core',
      'Platelet-Fibrin Thrombus',
      'Left Ventricular Myocardium',
      'Conducting System'
    ],
    whatYouWillLearn: [
      'Plaque erosion/rupture exposing subendothelial collagen and tissue factor',
      'Rapid platelet adhesion (GpIb-vWF) and aggregation (GpIIb/IIIa cross-linked by fibrinogen)',
      'The ischemic wavefront of necrosis progressing from endocardium to epicardium over 6 hours',
      'Diagnostic biomarkers: cardiac troponin I/T kinetics and STEMI vs NSTEMI criteria'
    ],
    attribution: 'Nucleus Health & Robbins Pathology Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=zEzDcElrYgs',
    chapters: [
      { timestampSeconds: 0, title: 'Coronary Plaque Rupture & Thrombus', titleBn: 'করোনারি প্লাক ফেটে রক্ত জমাট বাঁধা' },
      { timestampSeconds: 70, title: 'Ischemic Cellular Energy Collapse', titleBn: 'কোষীয় এটিপি বিনাশ ও অক্সিজেন ঘাটতি' },
      { timestampSeconds: 150, title: 'Wavefront of Coagulative Necrosis', titleBn: 'হৃদপেশি মৃত্যুর তরঙ্গ' },
      { timestampSeconds: 220, title: 'ECG ST-Elevation & Troponin Release', titleBn: 'ইসিজি পরিবর্তন ও ট্রপোনিন নিঃসরণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'An acute myocardial infarction begins when a vulnerable, thin-cap coronary atheromatous plaque fissures and ruptures.', textBn: 'করোনারি ধমনীর ভেতরের চর্বির আবরণ ফেটে গেলে রক্ত জমাট বাঁধার প্রক্রিয়া শুরু হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Circulating platelets adhere and cross-link via fibrinogen, forming an occlusive red thrombus that completely arrests coronary blood flow.', textBn: 'অনুচক্রিকা ও ফাইব্রিন মিলে রক্তনালীতে রক্ত চলাচল পুরোপুরি বন্ধ করে দেয়।' },
      { startSeconds: 85, endSeconds: 170, textEn: 'Deprived of oxygen, myocyte oxidative phosphorylation halts within 8 seconds; ATP depletion causes irreversible coagulative necrosis starting in 20 minutes.', textBn: 'অক্সিজেন না পেয়ে ২০ মিনিটের মধ্যে হৃদপেশির কোষগুলো চিরতরে ধ্বংস হতে শুরু করে।' },
      { startSeconds: 170, endSeconds: 290, textEn: 'Membrane disruption leaks troponin I and CK-MB into the circulation while transmural currents manifest as ST-segment elevation on ECG.', textBn: 'মৃত কোষ থেকে ট্রপোনিন রক্তে মেশে এবং ইসিজিতে এসটি এলিভেশন বা হার্ট অ্যাটাক ধরা পড়ে।' }
    ]
  },
  {
    id: 'vid-path-stroke',
    title: 'Stroke — Ischemic Infarction vs Intracranial Hemorrhage',
    titleBn: 'স্ট্রোক — ইসকেমিক ও হেমোরেজিক মস্তিষ্কাঘাত',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'nervous',
    systemName: 'Neurological Pathology',
    duration: '4:45',
    durationSeconds: 285,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/brain/compare.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/eTqOHWNYG5w?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'eTqOHWNYG5w',
    description: 'High-definition 3D medical animation of stroke pathophysiology (Nucleus Health): thromboembolic infarction vs intracranial hemorrhage, ischemic penumbra salvage, and rapid intervention.',
    relatedAnatomy: [
      'Internal Carotid & Middle Cerebral Artery (MCA)',
      'Circle of Willis',
      'Ischemic Core (Irreversible)',
      'Ischemic Penumbra (Salvageable)',
      'Blood-Brain Barrier & Astrocytic End-Feet'
    ],
    whatYouWillLearn: [
      'Embolic occlusion of cerebral arterioles shutting down Na+/K+ ATPases and triggering glutamate excitotoxicity',
      'The "Time is Brain" principle: saving the ischemic penumbra during the 4.5-hour IV tPA thrombolysis window',
      'Pathophysiology of hemorrhagic stroke secondary to Charcot-Bouchard microaneurysm rupture',
      'Cytotoxic edema vs vasogenic edema leading to mass effect and tentorial herniation'
    ],
    attribution: 'Nucleus Health & Clinical Neurology Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=eTqOHWNYG5w',
    chapters: [
      { timestampSeconds: 0, title: 'Thromboembolic MCA Occlusion', titleBn: 'মস্তিষ্কের ধমনীতে রক্ত জমাট বাঁধা' },
      { timestampSeconds: 65, title: 'Ischemic Core vs Penumbra', titleBn: 'মৃত অংশ বনাম বাঁচানো সম্ভব পেনাম্ব্রা' },
      { timestampSeconds: 135, title: 'Glutamate Excitotoxicity & Calcium Cascade', titleBn: 'গ্লুটামেট টক্সিসিটি ও নিউরন ক্ষতি' },
      { timestampSeconds: 210, title: 'IV Thrombolysis (tPA) & Mechanical Thrombectomy', titleBn: 'ক্লট গলানো ও ক্যাথেটারে জমাট রক্ত অপসারণ' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'An ischemic stroke occurs when a dislodged thromboembolism suddenly blocks a cerebral artery, most frequently the middle cerebral artery.', textBn: 'মস্তিষ্কের রক্তনালী হঠাৎ কোনো রক্তপিণ্ডে বন্ধ হয়ে গেলে ইসকেমিক স্ট্রোক ঘটে।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Within the central ischemic core, neurons perish in minutes; surrounding this lies the ischemic penumbra, salvageable if flow is restored.', textBn: 'মূল অংশের কোষগুলো দ্রুত মারা গেলেও আশপাশের পেনাম্ব্রা অঞ্চলের কোষ কয়েক ঘণ্টার মধ্যে রক্ত পেলে বাঁচে।' },
      { startSeconds: 85, endSeconds: 170, textEn: 'Energy failure depolarizes neurons, causing massive release of glutamate and toxic calcium influx that triggers apoptotic enzymatic destruction.', textBn: 'শক্তি না পেয়ে অতিরিক্ত গ্লুটামেট ও ক্যালসিয়াম ঢুকে নিউরনগুলোকে ভেতর থেকে ধ্বংস করে।' },
      { startSeconds: 170, endSeconds: 285, textEn: 'Emergency administration of tissue plasminogen activator (tPA) within 4.5 hours dissolves the fibrin clot to salvage brain function.', textBn: 'সাড়ে চার ঘণ্টার মধ্যে বিশেষ ওষুধ প্রয়োগ করে রক্তপিণ্ড গলিয়ে রোগীকে প্যারালাইসিস থেকে বাঁচানো যায়।' }
    ]
  },
  {
    id: 'vid-path-cancer-development',
    title: 'Cancer Development — Carcinogenesis, Angiogenesis & Metastasis',
    titleBn: 'ক্যান্সারের উৎপত্তি — কোষ রূপান্তর, অ্যাঞ্জিওজেনেসিস ও মেটাস্ট্যাসিস',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'oncology',
    systemName: 'Oncology & Cellular Pathology',
    duration: '5:15',
    durationSeconds: 315,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/torso_concept.jpg',
    description: 'Cellular pathology animation illustrating multistep carcinogenesis: oncogene activation, loss of TP53 tumor suppression, sustained angiogenesis via VEGF, epithelial-mesenchymal transition, and metastatic extravasation.',
    relatedAnatomy: [
      'Cellular DNA & Proto-Oncogenes',
      'TP53 & RB Tumor Suppressor Genes',
      'Tumor Microenvironment',
      'Tumor Capillaries (VEGF Angiogenesis)',
      'Basement Membrane & Extracellular Matrix',
      'Regional Lymph Nodes & Distant Organs'
    ],
    whatYouWillLearn: [
      'The Hallmarks of Cancer (Hanahan & Weinberg): evasion of apoptosis and limitless replicative potential via telomerase',
      'Role of VEGF in sprouting aberrant, hyperpermeable tumor neo-vasculature',
      'Epithelial-Mesenchymal Transition (EMT) and matrix metalloproteinase (MMP) basement membrane degradation',
      'Metastatic cascade: intravasation, circulation survival, arrest, and colonization of distant organs'
    ],
    attribution: 'National Cancer Institute (NCI) / NIH & Robbins Basic Pathology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000017.htm',
    chapters: [
      { timestampSeconds: 0, title: 'DNA Damage & Driver Mutations', titleBn: 'ডিএনএ ক্ষতি ও ক্যান্সার জিনের রূপান্তর' },
      { timestampSeconds: 75, title: 'Evasion of Apoptosis & Clonal Proliferation', titleBn: 'কোষ মৃত্যুর প্রক্রিয়া অকার্যকর হওয়া' },
      { timestampSeconds: 155, title: 'Tumor Angiogenesis (VEGF Sprouting)', titleBn: 'টিউমারের নিজস্ব রক্তনালী তৈরি' },
      { timestampSeconds: 235, title: 'Invasion, Intravasation & Metastatic Seeding', titleBn: 'অন্যান্য অঙ্গে ক্যান্সারের বিস্তার' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 35, textEn: 'Carcinogenesis begins with sequential DNA mutations that activate proto-oncogenes while disabling tumor suppressor genes like TP53.', textBn: 'ডিএনএ পরিবর্তনের মাধ্যমে কোষের নিয়ন্ত্রণহীন বিভাজন শুরু হয়ে ক্যান্সার সৃষ্টি হয়।' },
      { startSeconds: 35, endSeconds: 95, textEn: 'Malignant cells evade programmed cell death (apoptosis) and reactivate telomerase enzymes to achieve infinite replicative immortality.', textBn: 'ক্যান্সার কোষ স্বাভাবিক কোষের মতো মারা যায় না বরং অনবরত বিভাজিত হতে থাকে।' },
      { startSeconds: 95, endSeconds: 185, textEn: 'Hypoxic tumor centers secrete Vascular Endothelial Growth Factor (VEGF), stimulating disorganized new vessels that feed the growing neoplasm.', textBn: 'টিউমার ভেইজিএফ প্রোটিন নিঃসরণ করে নিজের জন্য নতুন রক্তনালী তৈরি করে পুষ্টি জোগাড় করে।' },
      { startSeconds: 185, endSeconds: 315, textEn: 'Tumor cells degrade the extracellular matrix with matrix metalloproteinases, entering capillaries to colonize distant lymph nodes and organs.', textBn: 'ক্যান্সার কোষ আশপাশের পর্দা ভেদ করে রক্তে মিশে লিভার, ফুসফুস ও হাড়ে ছড়িয়ে পড়ে।' }
    ]
  },
  {
    id: 'vid-path-kidney-stones',
    title: 'Kidney Stones — Nephrolithiasis & Ureteric Colic',
    titleBn: 'কিডনি পাথর — নেফ্রোলিথিয়াসিস ও মূত্রনালীর বাধা',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'renal',
    systemName: 'Renal Pathology',
    duration: '4:15',
    durationSeconds: 255,
    has3DAnimation: true,
    animationType: 'kidney-nephron',
    thumbnailUrl: '/anatomy/kidneys/compare.webp',
    embedUrl: 'https://www.youtube-nocookie.com/embed/YvXzIRNGfDo?autoplay=1&rel=0&modestbranding=1',
    youtubeId: 'YvXzIRNGfDo',
    description: 'High-definition 3D medical animation of kidney stones and ESWL lithotripsy (Nucleus Medical Media): urinary supersaturation, calculus formation, ureteric colic, and shock wave treatment.',
    relatedAnatomy: [
      'Renal Calyces (Minor & Major)',
      'Renal Papillae & Randall’s Plaques',
      'Renal Pelvis',
      'Pelviureteric Junction (PUJ)',
      'Crossing of Iliac Vessels',
      'Vesicoureteric Junction (VUJ)'
    ],
    whatYouWillLearn: [
      'Physicochemical supersaturation of calcium oxalate, phosphate, and uric acid',
      'The 3 anatomical narrowings of the ureter prone to stone impaction (PUJ, iliac crossing, VUJ)',
      'Pathophysiology of severe ureteric colic caused by prostaglandin-mediated hyperperistalsis',
      'Proximal urinary back-pressure causing calyceal dilation and acute hydronephrosis'
    ],
    attribution: 'Nucleus Medical Media & Urological Surgery Curriculum',
    attributionUrl: 'https://www.youtube.com/watch?v=YvXzIRNGfDo',
    chapters: [
      { timestampSeconds: 0, title: 'Crystal Supersaturation & Randall’s Plaque Nucleation', titleBn: 'স্ফটিক জমাট ও পাথরের সূচনা' },
      { timestampSeconds: 65, title: 'Stone Migration into Renal Pelvis', titleBn: 'কিডনির পেলভিসে পাথরের চলাচল' },
      { timestampSeconds: 130, title: 'Ureteric Impaction & Acute Colic Spasm', titleBn: 'মূত্রনালীতে পাথর আটকে তীব্র ব্যথা' },
      { timestampSeconds: 195, title: 'Hydronephrosis & Shockwave Lithotripsy (ESWL)', titleBn: 'হাইড্রোনেফ্রোসিস ও শকওয়েভে পাথর ভাঙা' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Kidney stones develop when urine becomes supersaturated with insoluble salts like calcium oxalate and uric acid.', textBn: 'প্রস্রাবে পানির তুলনায় ক্যালসিয়াম অক্সালেট ও ইউরিক এসিডের মাত্রা বেশি হলে পাথরের উৎপত্তি হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Microscopic crystals aggregate over subepithelial calcium phosphate deposits known as Randall’s plaques on renal papillae.', textBn: 'বৃক্কের প্যাপিলার ওপর ক্যালসিয়ামের ক্ষুদ্র কণা একত্রিত হয়ে ক্রমে শক্ত পাথরে রূপ নেয়।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'When stones break loose and enter the narrow ureter, muscular spasms and obstruction trigger excruciating loin-to-groin colic.', textBn: 'পাথর যখন সরু মূত্রনালীতে আটকে যায় তখন তীব্র ব্যথার সৃষ্টি হয়।' },
      { startSeconds: 165, endSeconds: 255, textEn: 'Urinary backup dilates the renal pelvis (hydronephrosis); acoustic shockwaves or ureteroscopy are deployed to fragment the calculus.', textBn: 'প্রস্রাব জমে কিডনি ফুলে যায়, যা শকওয়েভ বা লেজারের সাহায্যে ভেঙে অপসারণ করা হয়।' }
    ]
  },
  {
    id: 'vid-path-liver-cirrhosis',
    title: 'Liver Cirrhosis — Fibrosis, Stellate Activation & Portal HTN',
    titleBn: 'লিভার সিরোসিস — ফাইব্রোসিস, নোডিউল ও পোর্টাল উচ্চ রক্তচাপ',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'hepatobiliary',
    systemName: 'Hepatobiliary Pathology',
    duration: '4:40',
    durationSeconds: 280,
    has3DAnimation: true,
    animationType: 'cholecystectomy-cvs',
    thumbnailUrl: '/anatomy/liver/compare.webp',
    description: 'Cellular pathology animation of hepatic cirrhosis: chronic injury activating hepatic stellate cells into myofibroblasts, diffuse collagen I/III deposition, regenerative nodule formation, and sinusoidal capillarization.',
    relatedAnatomy: [
      'Hepatic Stellate Cells (Ito Cells)',
      'Space of Disse',
      'Sinusoidal Endothelial Fenestrations',
      'Regenerative Parenchymal Nodules',
      'Portal Vein & Collateral Varices'
    ],
    whatYouWillLearn: [
      'Transformation of quiescent vitamin-A storing stellate cells into collagen-secreting myofibroblasts',
      'Loss of sinusoidal fenestrations ("capillarization") preventing nutrient/protein exchange',
      'Hemodynamic progression of portal hypertension (>10 mmHg hepatic venous pressure gradient)',
      'Complications: esophageal varices, ascites (Starling forces & RAAS activation), and hepatic encephalopathy'
    ],
    attribution: 'MedlinePlus / NIH & American Association for the Study of Liver Diseases',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000080.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Chronic Hepatocyte Injury & Inflammation', titleBn: 'দীর্ঘমেয়াদী প্রদাহ ও কোষের ক্ষতি' },
      { timestampSeconds: 70, title: 'Stellate Cell Activation & Collagen Deposition', titleBn: 'ফাইব্রোসিস ও অতিরিক্ত কোলাজেন জমা' },
      { timestampSeconds: 150, title: 'Sinusoidal Capillarization & Parenchymal Nodules', titleBn: 'সাইনুসয়েড বিকৃতি ও সিরোটিক নোডিউল' },
      { timestampSeconds: 220, title: 'Portal Hypertension & Variceal Collaterals', titleBn: 'পোর্টাল হাইপারটেনশন ও খাদ্যনালীর ভ্যারিক্স' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Liver cirrhosis is the final common pathological pathway of chronic hepatic injury from hepatitis viruses, alcohol, or metabolic dysfunction.', textBn: 'হেপাটাইটিস বা অতিরিক্ত অ্যালকোহলের কারণে যকৃতে দীর্ঘমেয়াদী প্রদাহ থেকে সিরোসিস হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Chronic inflammation triggers hepatic stellate cells in the space of Disse to lose Vitamin A and become contractile myofibroblasts.', textBn: 'প্রদাহের ফলে স্ট্যালেট কোষগুলো রূপান্তরিত হয়ে প্রচুর কোলাজেন ফাইবার তৈরি করে।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'Dense collagen bands encircle surviving hepatocytes, forming nodular architecture while obliterating sinusoidal fenestrations.', textBn: 'কোলাজেনের শক্ত বাঁধন যকৃতকে শক্ত ও এবড়োখেবড়ো নোডিউলে পরিণত করে।' },
      { startSeconds: 165, endSeconds: 280, textEn: 'Marked resistance to portal blood flow elevates portal pressure, forcing blood into fragile esophageal collateral varices prone to rupture.', textBn: 'রক্তপ্রবাহ ব্যাহত হয়ে পোর্টাল চাপ বাড়ে এবং খাদ্যনালীর শিরা ফুলে গিয়ে রক্তবমির ঝুঁকি তৈরি হয়।' }
    ]
  },
  {
    id: 'vid-path-diabetes',
    title: 'Diabetes — Type 1 vs Type 2 Cellular Pathophysiology',
    titleBn: 'ডায়াবেটিস — টাইপ ১ ও টাইপ ২ রোগতত্ত্ব ও কোষীয় পরিবর্তন',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'endocrine',
    systemName: 'Endocrine Pathology',
    duration: '4:55',
    durationSeconds: 295,
    has3DAnimation: true,
    animationType: 'action-potential',
    thumbnailUrl: '/anatomy/pancreas/microscopic.webp',
    description: 'Detailed comparative animation of diabetes mellitus: autoimmune T-cell insulitis destroying beta cells (Type 1) vs peripheral insulin receptor substrate down-regulation and amyloid islet deposition (Type 2).',
    relatedAnatomy: [
      'Pancreatic Islets of Langerhans',
      'Insulin Receptor (Tyrosine Kinase)',
      'GLUT4 Glucose Transporters',
      'Skeletal Muscle & Adipocytes',
      'Vascular Endothelium (Microvascular Damage)'
    ],
    whatYouWillLearn: [
      'Type 1: HLA-DR3/DR4 linkage, autoimmune insulitis, absolute insulin deficiency, and diabetic ketoacidosis (DKA)',
      'Type 2: Post-receptor signaling defects (IRS-1 serine phosphorylation), relative insulin deficiency, and hyperosmolar hyperglycemic state (HHS)',
      'Osmotic diuresis pathophysiology causing classic polyuria, polydipsia, and weight loss',
      'Advanced Glycation End-products (AGEs) driving microvascular retinopathy, nephropathy, and neuropathy'
    ],
    attribution: 'MedlinePlus / NIH & American Diabetes Association (ADA)',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000041.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Type 1 Autoimmune Beta-Cell Destruction', titleBn: 'টাইপ ১ অটোইমিউন বিটা কোষ ধ্বংস' },
      { timestampSeconds: 70, title: 'Type 2 Peripheral Insulin Resistance & GLUT4 Defect', titleBn: 'টাইপ ২ ইনসুলিন রেজিস্ট্যান্স' },
      { timestampSeconds: 150, title: 'Systemic Hyperglycemia & Osmotic Diuresis', titleBn: 'উচ্চ রক্তে শর্করা ও অতিরিক্ত প্রস্রাব' },
      { timestampSeconds: 225, title: 'Advanced Glycation (AGEs) & Chronic Complications', titleBn: 'চোখ, কিডনি ও স্নায়ুর জটিলতা' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Diabetes mellitus represents a global metabolic disorder characterized by chronic hyperglycemia from defective insulin secretion or action.', textBn: 'ডায়াবেটিসে ইনসুলিনের অভাব বা অকার্যকারিতার কারণে রক্তে শর্করার মাত্রা অস্বাভাবিক বেড়ে যায়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'In Type 1 diabetes, autoreactive T lymphocytes destroy insulin-producing beta cells, leaving the body with absolute insulin deficiency.', textBn: 'টাইপ ১ ডায়াবেটিসে দেহের নিজস্ব ইমিউন সিস্টেম অগ্ন্যাশয়ের বিটা কোষ ধ্বংস করে ফেলে।' },
      { startSeconds: 85, endSeconds: 170, textEn: 'In Type 2 diabetes, chronic caloric excess leads to insulin receptor resistance in muscle and fat; GLUT4 transporters fail to translocate.', textBn: 'টাইপ ২ ডায়াবেটিসে কোষের ইনসুলিন রিসেপ্টর কাজ না করায় গ্লুকোজ কোষে ঢুকতে পারে না।' },
      { startSeconds: 170, endSeconds: 295, textEn: 'Excess glucose binds proteins forming Advanced Glycation End-products (AGEs), thickening capillary basements and causing organ damage.', textBn: 'অতিরিক্ত গ্লুকোজ রক্তনালী ক্ষতিগ্রস্ত করে অন্ধত্ব, কিডনি বিকল ও হার্ট অ্যাটাকের ঝুঁকি বাড়ায়।' }
    ]
  },
  {
    id: 'vid-path-pneumonia',
    title: 'Pneumonia — Alveolar Consolidation & Inflammatory Exudate',
    titleBn: 'নিউমোনিয়া — অ্যালভিওলার ইনফেকশন ও ফুসফুসের শক্ত হওয়া',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'respiratory',
    systemName: 'Respiratory Pathology',
    duration: '4:20',
    durationSeconds: 260,
    has3DAnimation: true,
    animationType: 'lungs-alveoli',
    thumbnailUrl: '/anatomy/lungs/compare.webp',
    description: 'Pathological visualization of lobar pneumonia through the four classical stages: congestion, red hepatization, gray hepatization, and resolution, detailing intrapulmonary shunting and hypoxemia.',
    relatedAnatomy: [
      'Alveolar Sacs & Pores of Kohn',
      'Pulmonary Capillary Endothelium',
      'Neutrophil Extravasation',
      'Fibrinous Alveolar Exudate',
      'Visceral Pleural Membrane'
    ],
    whatYouWillLearn: [
      'The 4 classic stages of lobar pneumonia (Congestion $\rightarrow$ Red Hepatization $\rightarrow$ Gray Hepatization $\rightarrow$ Resolution)',
      'Alveolar consolidation with neutrophils, RBCs, and fibrin converting spongy parenchyma into liver-like solid tissue',
      'Intrapulmonary right-to-left shunting: perfused alveoli lacking ventilation ($V/Q = 0$) causing refractory hypoxemia',
      'Physical signs: dullness on percussion, increased tactile vocal fremitus, and bronchial breath sounds'
    ],
    attribution: 'MedlinePlus / NIH National Heart, Lung, and Blood Institute & Robbins Pathology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000104.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Bacterial Invasion & Congestion Stage', titleBn: 'জীবাণু সংক্রমণ ও কনজেশন ধাপ' },
      { timestampSeconds: 65, title: 'Red Hepatization (Massive Exudate & RBCs)', titleBn: 'লাল হেপাটাইজেশন ও ফুসফুসের শক্ত হওয়া' },
      { timestampSeconds: 135, title: 'Gray Hepatization & Fibrin Meshwork', titleBn: 'ধূসর হেপাটাইজেশন ও নিউট্রোফিল' },
      { timestampSeconds: 200, title: 'Macrophage Enzymatic Resolution', titleBn: 'রিজল্যুশন ও ফুসফুসের স্বাভাবিক অবস্থা' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Pneumonia is an acute inflammatory infection of pulmonary parenchyma triggered by bacteria like Streptococcus pneumoniae.', textBn: 'নিউমোনিয়া হলো ফুসফুসের অ্যালভিওলাইতে তীব্র প্রদাহ ও সংক্রমণজনিত রোগ।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Bacterial proliferation releases cytokines, causing intense capillary congestion; red blood cells, neutrophils, and fibrin flood into alveoli.', textBn: 'জীবাণুর প্রভাবে কৈশিক নালী থেকে প্রচুর শ্বেতকণিকা, রক্ত ও তরল অ্যালভিওলাসে জমা হয়।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'During red and gray hepatization, the air-filled lung turns solid and liver-like, preventing gas exchange across consolidated lobes.', textBn: 'বাতাসের বদলে পুঁজ জমে ফুসফুসের অংশটি শক্ত হয়ে যায়, ফলে অক্সিজেন আদান-প্রদান বন্ধ হয়।' },
      { startSeconds: 165, endSeconds: 260, textEn: 'Blood flowing through non-ventilated alveoli cannot be oxygenated, creating an intrapulmonary shunt that induces severe hypoxemia.', textBn: 'অক্সিজেনহীন রক্ত সরাসরি শরীরে চলে যাওয়ায় রোগীর শ্বাসকষ্ট ও অক্সিজেনের ঘাটতি দেখা দেয়।' }
    ]
  },
  {
    id: 'vid-path-atherosclerosis',
    title: 'Atherosclerosis — Endothelial Injury & Plaque Rupture',
    titleBn: 'অ্যাথেরোস্ক্লেরোসিস — রক্তনালীর চর্বি জমা ও প্লাক ফাটল',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'cardiovascular',
    systemName: 'Cardiovascular Pathology',
    duration: '4:45',
    durationSeconds: 285,
    has3DAnimation: true,
    animationType: 'atherosclerosis',
    thumbnailUrl: '/anatomy/heart/microscopic.webp',
    description: 'Dynamic vascular cross-section animation showing turbulent shear stress, oxidized LDL subendothelial entry, macrophage scavenger uptake forming foam cells, smooth muscle fibrous cap proliferation, and plaque rupture.',
    relatedAnatomy: [
      'Vascular Endothelium & Glycocalyx',
      'Tunica Intima, Media & Adventitia',
      'Oxidized Low-Density Lipoprotein (oxLDL)',
      'Macrophage Foam Cells & Fatty Streaks',
      'Smooth Muscle Cells & Collagen Fibrous Cap',
      'Extracellular Lipid Necrotic Core'
    ],
    whatYouWillLearn: [
      'The "Response-to-Injury" hypothesis: chronic endothelial damage from smoking, hypertension, and hyperglycemia',
      'Uncontrolled uptake of oxidized LDL via macrophage scavenger receptors (SR-A/CD36) creating foam cells',
      'Phenotypic switching of vascular smooth muscle cells migrating from media to intima to synthesize collagen',
      'Determinants of plaque vulnerability: large lipid core (>40%), thin fibrous cap (<65 μm), and high macrophage matrix metalloproteinase activity'
    ],
    attribution: 'MEDX 3D Simulation & MedlinePlus / NIH National Heart, Lung, and Blood Institute',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000004.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Endothelial Dysfunction & oxLDL Infiltration', titleBn: 'এন্ডোথেলিয়ামের ক্ষতি ও চর্বি প্রবেশ' },
      { timestampSeconds: 70, title: 'Foam Cell Formation & Fatty Streak Stage', titleBn: 'ফোম সেল তৈরি ও ফ্যাটি স্ট্রিক' },
      { timestampSeconds: 145, title: 'Fibrous Cap Synthesis & Plaque Maturation', titleBn: 'ফাইব্রাস ক্যাপ ও প্লাক বৃদ্ধি' },
      { timestampSeconds: 215, title: 'MMP Cap Thinning & Acute Plaque Rupture', titleBn: 'প্লাক ফেটে রক্তনালী বন্ধ হওয়া' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Atherosclerosis is a chronic inflammatory disease of medium and large arteries, initiating with endothelial injury at branch points.', textBn: 'ধমনীর অন্তর্বর্তী পর্দায় ক্ষতি ও প্রদাহের মাধ্যমে দীর্ঘমেয়াদী অ্যাথেরোস্ক্লেরোসিস শুরু হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Circulating LDL enters the subendothelial space, undergoing oxidation; monocytes migrate inside and engulf oxLDL to become foam cells.', textBn: 'খারাপ চর্বি রক্তনালীর প্রাচীরে ঢুকে অক্সিডাইজড হয় এবং ম্যাক্রোফেজ তা খেয়ে ফোম সেলে পরিণত হয়।' },
      { startSeconds: 85, endSeconds: 170, textEn: 'Vascular smooth muscle cells migrate into the intima, synthesizing a protective collagen fibrous cap over the necrotic lipid core.', textBn: 'মসৃণ পেশি কোষ কোলাজেন আবরণ তৈরি করে চর্বির স্তূপকে ঢেকে রাখার চেষ্টা করে।' },
      { startSeconds: 170, endSeconds: 285, textEn: 'Macrophage collagenases erode the fibrous cap; sudden rupture exposes thrombogenic lipid to platelets, causing immediate occlusion.', textBn: 'প্রদাহের কারণে ক্যাপ পাতলা হয়ে ফেটে গেলে রক্ত জমাট বেঁধে সম্পূর্ণ রক্তনালী বন্ধ করে দেয়।' }
    ]
  },
  {
    id: 'vid-path-blood-clot',
    title: 'Blood Clot Formation — Hemostasis, Thrombosis & Virchow’s Triad',
    titleBn: 'রক্ত জমাট বাঁধা — হেমোস্ট্যাসিস, থ্রম্বোসিস ও ভার্চো ট্রায়াড',
    category: 'pathology-disease',
    categoryName: 'Pathology & Disease',
    categoryNameBn: 'রোগতত্ত্ব ও প্যাথলজি',
    system: 'cardiovascular',
    systemName: 'Hematology & Pathology',
    duration: '4:30',
    durationSeconds: 270,
    has3DAnimation: true,
    animationType: 'thrombosis',
    thumbnailUrl: '/anatomy/heart_preview.jpg',
    description: 'High-speed molecular animation illustrating primary hemostasis (von Willebrand factor, platelet shape change, ADP/TxA2 release), secondary coagulation cascade generating thrombin, cross-linked fibrin meshwork, and Virchow’s triad.',
    relatedAnatomy: [
      'Subendothelial Collagen & von Willebrand Factor',
      'Platelet Surface Receptors (GpIb, GpIIb/IIIa)',
      'Tissue Factor & Factor VIIa (Extrinsic Pathway)',
      'Tenase Complex & Prothrombinase Complex',
      'Thrombin & Fibrin Monomers (Factor XIIIa)',
      'Deep Veins of Lower Limb & Heart Valves'
    ],
    whatYouWillLearn: [
      'Primary hemostasis: platelet adhesion via GpIb-vWF, activation (granule release), and aggregation via GpIIb/IIIa',
      'Secondary hemostasis: convergence of intrinsic and extrinsic pathways on Factor X activation',
      'Thrombin burst converting soluble fibrinogen into insoluble cross-linked fibrin mesh',
      'Virchow’s Triad: endothelial injury, stasis/turbulent flow, and hypercoagulability predisposing to DVT and pulmonary embolism'
    ],
    attribution: 'MedlinePlus / NIH National Heart, Lung, and Blood Institute & Robbins Pathology',
    attributionUrl: 'https://medlineplus.gov/ency/anatomyvideos/000019.htm',
    chapters: [
      { timestampSeconds: 0, title: 'Endothelial Disruption & Platelet Adhesion', titleBn: 'রক্তনালীর ক্ষত ও অনুচক্রিকা সংযুক্তি' },
      { timestampSeconds: 65, title: 'Platelet Activation & Primary Hemostatic Plug', titleBn: 'অ্যাক্টিভেশন ও প্রাথমিক প্লাগ তৈরি' },
      { timestampSeconds: 140, title: 'Coagulation Cascade & Thrombin Generation', titleBn: 'ক্লটিং ফ্যাক্টর ও থ্রম্বিন সক্রিয়করণ' },
      { timestampSeconds: 210, title: 'Fibrin Mesh Cross-Linking & Virchow’s Triad', titleBn: 'ফাইব্রিন জালিকা ও ভার্চো ট্রায়াড' }
    ],
    subtitles: [
      { startSeconds: 0, endSeconds: 30, textEn: 'Hemostasis is a finely balanced physiological defense arresting blood loss after vascular trauma.', textBn: 'রক্তক্ষরণ বন্ধ করার জন্য দেহে দ্রুত রক্ত জমাট বাঁধার স্বয়ংক্রিয় প্রক্রিয়া চালু হয়।' },
      { startSeconds: 30, endSeconds: 85, textEn: 'Exposed subendothelial collagen binds von Willebrand factor, which anchors circulating platelets via their GpIb surface receptors.', textBn: 'ক্ষতিগ্রস্ত রক্তনালীর কোলাজেনে ভন উইলিব্র্যান্ড ফ্যাক্টরের সাহায্যে অনুচক্রিকা আটকে যায়।' },
      { startSeconds: 85, endSeconds: 165, textEn: 'Tissue factor activates the coagulation cascade; prothrombinase rapidly cleaves prothrombin into active thrombin enzymes.', textBn: 'ক্লটিং ফ্যাক্টরগুলো একে একে সক্রিয় হয়ে প্রোথ্রম্বিনকে শক্তিশালী থ্রম্বিনে রূপান্তর করে।' },
      { startSeconds: 165, endSeconds: 270, textEn: 'Thrombin cleaves fibrinogen into fibrin monomers, which cross-link under Factor XIIIa to form a stable red clot entrapping erythrocytes.', textBn: 'থ্রম্বিন ফাইব্রিন জালিকা বুনে রক্তকণিকাগুলোকে আটকে একটি মজবুত সিল তৈরি করে রক্তপাত বন্ধ করে।' }
    ]
  }
];

export function getMedicalVideoById(id: string): MedicalVideoItem | undefined {
  return MEDICAL_VIDEO_LIBRARY.find(v => v.id === id);
}

export function getVideosByCategory(category: VideoCategory): MedicalVideoItem[] {
  return MEDICAL_VIDEO_LIBRARY.filter(v => v.category === category);
}

export function searchMedicalVideos(query: string, categoryFilter?: VideoCategory | 'all'): MedicalVideoItem[] {
  const q = query.trim().toLowerCase();
  return MEDICAL_VIDEO_LIBRARY.filter(v => {
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || v.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      v.title.toLowerCase().includes(q) ||
      v.titleBn.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.relatedAnatomy.some(a => a.toLowerCase().includes(q)) ||
      v.whatYouWillLearn.some(w => w.toLowerCase().includes(q)) ||
      v.systemName.toLowerCase().includes(q)
    );
  });
}
