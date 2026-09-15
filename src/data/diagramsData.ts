import { MedicalDiagram } from '../types';

export const MEDICAL_DIAGRAMS: MedicalDiagram[] = [
  {
    id: 'cardiac-conduction',
    title: 'Cardiac Conduction System',
    category: 'Cardiology & Anatomy',
    subTitle: 'Specialized electrical pathway coordinating rhythmic myocardial contraction',
    labels: [
      {
        id: 'sa-node',
        name: 'Sinoatrial (SA) Node',
        x: 38,
        y: 24,
        description: 'The natural primary pacemaker (intrinsic rate 60-100 bpm) located in right atrial wall near junction of superior vena cava and crista terminalis.',
        clinicalPearl: 'Supplied by SA nodal artery (branch of RCA in 60%, LCx in 40%). Damage leads to Sick Sinus Syndrome.'
      },
      {
        id: 'internodal-tracts',
        name: 'Internodal Pathways (Bachmann, Wenckebach, Thorel)',
        x: 48,
        y: 35,
        description: 'Three preferential pathways conducting electrical impulses from SA node across right and left atria to the AV node.',
        clinicalPearl: 'Bachmann bundle carries impulses across the interatrial septum to activate the left atrium synchronously.'
      },
      {
        id: 'av-node',
        name: 'Atrioventricular (AV) Node',
        x: 52,
        y: 48,
        description: 'Located in Triangle of Koch (coronary sinus orifice, tendon of Todaro, septal leaflet of tricuspid valve). Intrinsic rate 40-60 bpm.',
        clinicalPearl: 'Physiological AV delay (~0.12 sec) allows complete atrial emptying before ventricular systole. Represented by PR interval.'
      },
      {
        id: 'bundle-of-his',
        name: 'Atrioventricular Bundle of His',
        x: 52,
        y: 58,
        description: 'Only physiological electrical connection penetrating through the fibrous skeleton of the heart into the membranous interventricular septum.',
        clinicalPearl: 'Accessory bypass pathways (e.g. Bundle of Kent) cause pre-excitation (Wolff-Parkinson-White syndrome with delta wave).'
      },
      {
        id: 'left-bundle-branch',
        name: 'Left Bundle Branch (LBB)',
        x: 62,
        y: 68,
        description: 'Bifurcates into Left Anterior Fascicle (thin, single blood supply) and Left Posterior Fascicle (broad, dual blood supply).',
        clinicalPearl: 'LBBB on ECG (broad notched R in I, aVL, V5-V6) usually signifies serious underlying organic heart disease (CAD, dilated cardiomyopathy).'
      },
      {
        id: 'right-bundle-branch',
        name: 'Right Bundle Branch (RBB)',
        x: 42,
        y: 68,
        description: 'Courses along the right septal surface and crosses through the moderator band (septomarginal trabecula) to the anterior papillary muscle.',
        clinicalPearl: 'RBBB produces "rabbit ears" rsR\' pattern in V1-V2. May occur in healthy young adults or pulmonary embolism (acute right heart strain).'
      },
      {
        id: 'purkinje-fibers',
        name: 'Purkinje Fiber Network',
        x: 52,
        y: 85,
        description: 'Subendocardial specialized conduction myofibers with rapid conduction velocity (4 m/s) ensuring synchronized apical-to-base ventricular contraction.',
        clinicalPearl: 'Fast conduction mediated by high density of voltage-gated Na+ channels and abundant Cx40/Cx43 gap junctions.'
      }
    ],
    clinicalSignificance: 'Understanding conduction anatomy is essential for localizing heart blocks (Mobitz I vs II), bundle branch blocks, and ventricular pre-excitation on 12-lead ECG.',
    highYieldViva: 'What is the Triangle of Koch? Name its boundaries and what structure lies at its apex (AV Node). How does carotid sinus massage slow down heart rate? (Stimulates CN IX/X parasympathetic discharge to SA & AV nodes).',
    references: 'Guyton & Hall Textbook of Medical Physiology, 14th Ed, Ch. 10; Snell’s Clinical Anatomy by Regions, 9th Ed.'
  },
  {
    id: 'circle-of-willis',
    title: 'Circle of Willis (Circulus Arteriosus Cerebri)',
    category: 'Neuroanatomy',
    subTitle: 'Polygonal arterial anastomotic ring at base of brain in interpeduncular fossa',
    labels: [
      {
        id: 'ant-communicating',
        name: 'Anterior Communicating Artery',
        x: 50,
        y: 20,
        description: 'Short bridge (2-3 mm) connecting the bilateral anterior cerebral arteries (A1 segments).',
        clinicalPearl: 'Most common site for saccular (berry) intracranial aneurysms (~30-35%). Rupture causes subarachnoid hemorrhage.'
      },
      {
        id: 'ant-cerebral',
        name: 'Anterior Cerebral Artery (ACA)',
        x: 42,
        y: 28,
        description: 'Arises from Internal Carotid Artery; runs in longitudinal cerebral fissure around corpus callosum to supply medial surface of frontal and parietal lobes.',
        clinicalPearl: 'ACA stroke causes contralateral motor and sensory loss predominantly affecting the leg and foot (paracentral lobule).'
      },
      {
        id: 'internal-carotid',
        name: 'Internal Carotid Artery (ICA - Terminal)',
        x: 35,
        y: 42,
        description: 'Terminal bifurcation into ACA and MCA after emerging from cavernous sinus medial to anterior clinoid process.',
        clinicalPearl: 'Atherosclerotic carotid stenosis at bifurcation is the leading cause of transient ischemic attacks (TIA) and ischemic stroke.'
      },
      {
        id: 'middle-cerebral',
        name: 'Middle Cerebral Artery (MCA)',
        x: 22,
        y: 45,
        description: 'Largest branch of ICA; passes into lateral sulcus (Sylvian fissure) to supply majority of lateral convexities of cerebral hemisphere.',
        clinicalPearl: 'Most common territory for ischemic stroke. Causes contralateral hemiplegia and hemisensory loss (face and arm > leg) + Aphasia (if dominant hemisphere).'
      },
      {
        id: 'post-communicating',
        name: 'Posterior Communicating Artery (PCoA)',
        x: 40,
        y: 54,
        description: 'Connects ICA to Posterior Cerebral Artery (PCA), linking anterior and posterior cerebral circulations.',
        clinicalPearl: 'PCoA aneurysm compresses adjacent Oculomotor Nerve (CN III) causing ipsilateral ptosis, dilated pupil, and "down and out" eye.'
      },
      {
        id: 'post-cerebral',
        name: 'Posterior Cerebral Artery (PCA)',
        x: 58,
        y: 64,
        description: 'Terminal bifurcation of basilar artery; winds around midbrain to supply occipital lobe and inferomedial temporal lobe.',
        clinicalPearl: 'PCA infarction causes contralateral homonymous hemianopia with macular sparing (dual supply from MCA at occipital pole).'
      },
      {
        id: 'basilar-artery',
        name: 'Basilar Artery',
        x: 50,
        y: 75,
        description: 'Formed at inferior border of pons by confluence of right and left vertebral arteries; ascends in basilar groove.',
        clinicalPearl: 'Basilar artery occlusion ("top of the basilar" thrombosis) causes Locked-in Syndrome (quadriplegia and aphonia with preserved vertical eye movement).'
      },
      {
        id: 'vertebral-arteries',
        name: 'Vertebral Arteries',
        x: 50,
        y: 90,
        description: 'Branches of 1st part of subclavian artery; ascend through foramina transversaria of C6-C1 vertebrae and enter cranium via foramen magnum.',
        clinicalPearl: 'Posterior Inferior Cerebellar Artery (PICA) branch occlusion causes Lateral Medullary Syndrome (Wallenberg syndrome).'
      }
    ],
    clinicalSignificance: 'Anatomical collateral reservoir: if one carotid artery is occluded, blood flows across the communicating arteries to maintain cerebral perfusion.',
    highYieldViva: 'What constitutes the Circle of Willis? (Anterior communicating, ACA, ICA, Posterior communicating, PCA). Which major cerebral artery is NOT part of the circle itself? (Middle Cerebral Artery).',
    references: 'Snell’s Clinical Neuroanatomy, 8th Ed, Ch. 18; Davidson’s Principles and Practice of Medicine, 24th Ed, Ch. 26.'
  },
  {
    id: 'nephron-transport',
    title: 'Nephron Transport & Countercurrent System',
    category: 'Renal Physiology',
    subTitle: 'Segmental electrolyte reabsorption, water handling, and diuretic drug targets',
    labels: [
      {
        id: 'glomerulus',
        name: 'Glomerulus & Bowman Capsule',
        x: 25,
        y: 20,
        description: 'Filtration barrier (fenestrated endothelium, GBM, podocyte slit diaphragms) producing 180 L/day of ultrafiltrate (GFR ~125 mL/min).',
        clinicalPearl: 'Proteinuria (>150 mg/day) indicates disruption of podocyte slit diaphragms (nephrotic) or GBM charge/pore selectivity.'
      },
      {
        id: 'pct',
        name: 'Proximal Convoluted Tubule (PCT)',
        x: 40,
        y: 26,
        description: 'Reabsorbs 65% of filtered Na+, H2O, Cl-, 100% of glucose (via SGLT2) and amino acids, and 85-90% of filtered bicarbonate (via Carbonic Anhydrase).',
        clinicalPearl: 'Target of SGLT2 inhibitors (Dapagliflozin/Empagliflozin) for diabetes & heart failure, and Acetazolamide (carbonic anhydrase inhibitor).'
      },
      {
        id: 'descending-limb',
        name: 'Thin Descending Limb of Henle',
        x: 42,
        y: 55,
        description: 'Highly permeable to water via Aquaporin-1 (AQP1); impermeable to NaCl. Tubular fluid becomes hypertonic (up to 1200 mOsm/kg at hairpin turn).',
        clinicalPearl: 'Contributes to countercurrent multiplication by equilibrating with hyperosmolar medullary interstitium.'
      },
      {
        id: 'thick-ascending-limb',
        name: 'Thick Ascending Limb of Henle (TAL)',
        x: 58,
        y: 55,
        description: 'Impermeable to water; actively reabsorbs 25% of filtered Na+, K+, and 2 Cl- via the apical NKCC2 cotransporter. Drives lumen-positive potential.',
        clinicalPearl: 'Inhibited by Loop Diuretics (Furosemide). Reabsorbs Ca2+ and Mg2+ paracellularly driven by positive luminal voltage.'
      },
      {
        id: 'dct',
        name: 'Distal Convoluted Tubule (DCT)',
        x: 72,
        y: 35,
        description: 'Reabsorbs 5-7% of filtered Na+ and Cl- via the Na-Cl cotransporter (NCC). Parathyroid hormone (PTH) stimulates active Ca2+ reabsorption here.',
        clinicalPearl: 'Inhibited by Thiazide Diuretics (Hydrochlorothiazide). Thiazides increase Ca2+ reabsorption, useful in recurrent renal calcium stones.'
      },
      {
        id: 'collecting-duct',
        name: 'Cortical & Medullary Collecting Duct',
        x: 85,
        y: 60,
        description: 'Principal cells express ENaC channels (aldosterone-dependent) and Aquaporin-2 (ADH/Vasopressin-dependent). Intercalated cells regulate acid-base.',
        clinicalPearl: 'Spironolactone blocks mineralocorticoid receptors. Potassium-sparing diuretics (Amiloride) block ENaC directly. ADH controls final urine concentration.'
      }
    ],
    clinicalSignificance: 'Understanding nephron segments explains electrolyte derangements (hypokalemia with furosemide, hyperkalemia with spironolactone, SIADH vs Diabetes Insipidus).',
    highYieldViva: 'How does the countercurrent multiplier work? What maintains the medullary osmotic gradient? (Vasa recta countercurrent exchanger). Which diuretic causes hypocalcemia? (Loop diuretics - "Loops Lose calcium").',
    references: 'Guyton & Hall Textbook of Medical Physiology, 14th Ed, Ch. 27-29; Katzung Basic & Clinical Pharmacology, 15th Ed.'
  }
];
