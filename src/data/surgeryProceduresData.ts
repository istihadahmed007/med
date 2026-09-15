import { SurgicalProcedure } from '../types';

export const SURGICAL_PROCEDURES: SurgicalProcedure[] = [
  {
    id: 'laparoscopic-appendectomy',
    title: 'Laparoscopic Appendectomy',
    specialty: 'General Surgery',
    indication: 'Acute appendicitis (uncomplicated or phlegmonous), failed conservative management, or suspected appendicitis in fertile female.',
    anesthesiaType: 'General Anaesthesia with Endotracheal Intubation & Muscle Relaxation',
    positioning: 'Supine initially; Trendelenburg position (15-20°) with left lateral tilt (10-15°) after port insertion to displace small bowel loops away from right iliac fossa.',
    steps: [
      {
        stepNumber: 1,
        title: 'Patient Positioning & Skin Preparation',
        actionSummary: 'Patient catheterized to decompress urinary bladder; skin prepped from epigastrium to pubic symphysis with 10% Povidone-Iodine; draped in sterile fashion.',
        anatomicalExplanation: 'Decompression of bladder prevents inadvertent trocar perforation during supra-pubic port placement.',
        instrumentsRequired: ['Foley catheter (14-16 Fr)', 'Povidone-iodine / Chlorhexidine', 'Sterile surgical drapes'],
        keyAnatomicalLandmark: 'Umbilicus, Pubic symphysis, Anterior Superior Iliac Spine (ASIS)',
        surgicalRiskToAvoid: 'Full bladder puncture during sub-umbilical or suprapubic port insertion.',
        clinicalPearls: 'Always decompress stomach with NG tube if distended to prevent aspiration and improve visualization.'
      },
      {
        stepNumber: 2,
        title: 'Primary Port Insertion & Pneumoperitoneum Creation',
        actionSummary: 'Sub-umbilical curvilinear incision (10mm). Creation of pneumoperitoneum using Veress needle or open Hasson cut-down technique. CO2 insufflated to target 12-14 mmHg.',
        anatomicalExplanation: 'Umbilicus is the thinnest part of anterior abdominal wall where skin, linea alba, and peritoneum converge without intervening subcutaneous fat.',
        instrumentsRequired: ['Veress needle / Hasson trocar (10-12 mm)', 'High-flow CO2 insufflator', '10mm 30-degree laparoscope'],
        keyAnatomicalLandmark: 'Inferior border of umbilicus, Linea alba, Peritoneal membrane',
        surgicalRiskToAvoid: 'Aortic or inferior vena caval injury if Veress needle is inserted at steep 90° angle in thin patients.',
        clinicalPearls: 'Confirm intraperitoneal placement with saline drop test and initial low intra-abdominal pressure (<5 mmHg) at low flow.'
      },
      {
        stepNumber: 3,
        title: 'Secondary Port Placement & Diagnostic Laparoscopy',
        actionSummary: 'Insert 5mm port in left iliac fossa (suprapubic midline alternate) and 5mm port in right iliac fossa under direct vision. Systematic four-quadrant inspection.',
        anatomicalExplanation: 'Triangulation principle: camera between two working instruments at 60° angle to prevent "sword-fighting" of laparoscopic instruments.',
        instrumentsRequired: ['Two 5mm trocars', 'Laparoscopic atraumatic bowel graspers', 'Suction-irrigation cannula'],
        keyAnatomicalLandmark: 'Inferior epigastric vessels running along lateral edge of rectus abdominis.',
        surgicalRiskToAvoid: 'Injury to Inferior Epigastric Artery during lateral port placement. Transilluminate abdominal wall before trocar entry.',
        clinicalPearls: 'Examine terminal ileum for Meckel diverticulum (2 feet proximal to ileocecal valve) and pelvic organs in females (ovary, fallopian tubes).'
      },
      {
        stepNumber: 4,
        title: 'Mobilization & Exposure of Appendix',
        actionSummary: 'Identify the caecum; follow anterior taenia coli (taenia libera) inferiorly to where all three taeniae converge at the base of the appendix.',
        anatomicalExplanation: 'Convergence of taeniae coli is the single most reliable anatomical landmark to locate the appendiceal base regardless of anatomical variation (retrocaecal, pelvic, retroileal).',
        instrumentsRequired: ['Babcock laparoscopic grasper', 'Atraumatic Maryland dissector'],
        keyAnatomicalLandmark: 'Taenia libera (anterior taenia), Ileocecal junction, Retrocaecal space',
        surgicalRiskToAvoid: 'Avulsion of inflamed, friable appendix tip causing purulent contamination of the peritoneal cavity.',
        clinicalPearls: 'Grasp the mesoappendix or periappendiceal fat, never grasp the inflamed necrotic wall directly.'
      },
      {
        stepNumber: 5,
        title: 'Mesoappendix Dissection & Appendicular Artery Control',
        actionSummary: 'Create a window in the mesoappendix near base of appendix. Divide mesoappendix and appendicular artery using bipolar diathermy, harmonic scalpel, or surgical clips.',
        anatomicalExplanation: 'The appendicular artery is an end-artery, a branch of the inferior division of the ileocolic artery, running in the free border of the mesoappendix.',
        instrumentsRequired: ['Laparoscopic bipolar forceps / Ultrasonic shear (Harmonic)', 'Titanium clip applier (medium/large)'],
        keyAnatomicalLandmark: 'Mesoappendix (mesentery of appendix), Appendicular artery, Cecal wall junction',
        surgicalRiskToAvoid: 'Slippage of clips on appendicular artery leading to severe post-operative hemoperitoneum.',
        clinicalPearls: 'Ensure clean skeletalization right down to the true junction of cecal muscularis and appendix base.'
      },
      {
        stepNumber: 6,
        title: 'Appendiceal Base Ligation',
        actionSummary: 'Place two pre-tied loops (Roeder knot / Endoloop vicryl) at the base of the appendix, 5mm from caecum. Place a third loop 10mm distally.',
        anatomicalExplanation: 'Must ligate flush with caecum without encroaching on cecal lumen, preventing "retained appendiceal stump" which causes stump appendicitis.',
        instrumentsRequired: ['Endoloop ligatures (0 or 2-0 Vicryl/PDS)', 'Knot pusher', 'Laparoscopic curved scissors'],
        keyAnatomicalLandmark: 'Cecal-appendiceal junction, Normal healthy cecal wall cuff',
        surgicalRiskToAvoid: 'Leaving a long stump (>5mm) or strangulating cecal pole causing fecal fistula.',
        clinicalPearls: 'Transect between second and third loop with scissors; cautery should NOT be applied close to the knot.'
      },
      {
        stepNumber: 7,
        title: 'Specimen Extraction via Endobag',
        actionSummary: 'Introduce sterile retrieval bag (Endobag) via 10mm umbilical port; place appendix inside bag; close drawstring; extract bag through port under direct vision.',
        anatomicalExplanation: 'Direct contact of purulent specimen with abdominal wall skin causes port-site surgical site infection (SSI).',
        instrumentsRequired: ['Laparoscopic specimen retrieval pouch (Endobag)', 'Strong grasper'],
        keyAnatomicalLandmark: 'Umbilical fascial opening',
        surgicalRiskToAvoid: 'Bag rupture or spilling infected mucus/fecolith into the subcutaneous tissue.',
        clinicalPearls: 'Inspect the appendix specimen on the back table to verify complete excision including base.'
      },
      {
        stepNumber: 8,
        title: 'Hemostasis Check & Peritoneal Toilet',
        actionSummary: 'Reduce intra-abdominal pressure to 8 mmHg to inspect for venous oozing. Irrigate right paracolic gutter and pelvis with warm sterile saline; suction dry.',
        anatomicalExplanation: 'High intra-abdominal pressure (14 mmHg) can tamponade venous bleeding during surgery, which then bleeds post-operatively when desufflated.',
        instrumentsRequired: ['Suction-irrigation cannula', 'Warm normal saline (0.9% NaCl)'],
        keyAnatomicalLandmark: 'Pouch of Douglas / Rectovesical pouch, Right paracolic gutter',
        surgicalRiskToAvoid: 'Retained intra-abdominal collection or abscess in the pelvis.',
        clinicalPearls: 'Routine pelvic drainage is NOT indicated in uncomplicated appendicitis (BM&DC / Bailey & Love guideline).'
      },
      {
        stepNumber: 9,
        title: 'Desufflation & Port Closure',
        actionSummary: 'Remove instruments under vision. Evacuate CO2 gas completely. Close umbilical sheath defect (>10mm) with 0-Vicryl or PDS. Close skin with subcuticular monocryl.',
        anatomicalExplanation: 'Failure to close fascial defects ≥10mm risks Richter hernia or port-site incisional hernia containing omentum or bowel.',
        instrumentsRequired: ['J-needle or Deschamps needle', '0-Vicryl suture', '3-0 Monocryl skin suture'],
        keyAnatomicalLandmark: 'Umbilical rectus sheath, Linea alba',
        surgicalRiskToAvoid: 'Port-site incisional hernia; retained CO2 causing shoulder-tip referred pain (diaphragmatic phrenic nerve irritation).',
        clinicalPearls: 'Evacuate pelvic gas thoroughly before closing trocars to prevent post-op shoulder tip pain.'
      }
    ],
    postOperativeCare: [
      'Early mobilization within 4-6 hours post-op',
      'Oral sips of water after recovery from anesthesia; soft diet on Day 1',
      'Analgesia with IV/oral Paracetamol and NSAIDs (unless contraindicated)',
      'Monitor temperature, pulse, abdominal tenderness, and wound sites',
      'Discharge usually within 24-48 hours if afebrile and tolerating oral intake'
    ],
    references: 'Bailey & Love’s Short Practice of Surgery, 28th Ed, Ch. 72; Oxford Handbook of Operative Surgery, 3rd Ed.'
  },
  {
    id: 'chest-tube-insertion',
    title: 'Intercostal Chest Drain (Tube Thoracostomy)',
    specialty: 'Emergency Medicine & Trauma',
    indication: 'Tension pneumothorax (after needle decompression), massive hemothorax, large traumatic/spontaneous pneumothorax, symptomatic pleural effusion, empyema.',
    anesthesiaType: 'Local Infiltration Anesthesia (1% or 2% Lidocaine with Epinephrine, up to 3 mg/kg)',
    positioning: 'Patient semi-recumbent at 45° with ipsilateral arm abducted and hand placed behind head to expose axilla.',
    steps: [
      {
        stepNumber: 1,
        title: 'Landmark Identification (The Safe Triangle)',
        actionSummary: 'Identify borders of British Thoracic Society (BTS) "Safe Triangle": anterior border of latissimus dorsi, lateral border of pectoralis major, apex below axilla, 5th intercostal space.',
        anatomicalExplanation: 'The safe triangle minimizes risk of injury to major neurovascular bundles, internal thoracic vessels, long thoracic nerve, and subdiaphragmatic viscera (liver/spleen).',
        instrumentsRequired: ['Surgical skin marker', 'Centimeter tape'],
        keyAnatomicalLandmark: '5th Intercostal Space, Mid-axillary line, Nipple line (4th ICS in males)',
        surgicalRiskToAvoid: 'Inserting below 5th ICS risks puncturing elevated diaphragm, lacerating liver on right or spleen on left.',
        clinicalPearls: 'Always palpate 5th intercostal space carefully anterior to midaxillary line.'
      },
      {
        stepNumber: 2,
        title: 'Local Anesthetic Infiltration',
        actionSummary: 'Infiltrate skin, subcutaneous tissue, periosteum of upper border of 6th rib, intercostal muscles, and parietal pleura with 10-15 mL of 1% Lidocaine.',
        anatomicalExplanation: 'The parietal pleura has rich sensory somatic innervation (intercostal nerves) and is exquisitely sensitive to sharp pain.',
        instrumentsRequired: ['21G & 25G needles', '20 mL syringe', '1% Lidocaine'],
        keyAnatomicalLandmark: 'Superior border of the lower rib (6th rib)',
        surgicalRiskToAvoid: 'Intravascular injection of lidocaine into intercostal vein.',
        clinicalPearls: 'Aspirate air or blood into syringe before injecting pleura to confirm entry into pleural cavity.'
      },
      {
        stepNumber: 3,
        title: 'Skin Incision & Blunt Dissection',
        actionSummary: 'Make a 2-3 cm transverse incision parallel to rib over 6th rib. Use curved Kelly/artery forceps to bluntly dissect a subcutaneous tunnel upwards into 5th ICS.',
        anatomicalExplanation: 'Creating a stepped, oblique subcutaneous tunnel creates an airtight flap valve preventing air re-entry when tube is removed.',
        instrumentsRequired: ['Scalpel with No. 10 or 11 blade', 'Curved Kelly artery forceps (8 inch)'],
        keyAnatomicalLandmark: 'Superior border of 6th rib, 5th intercostal space',
        surgicalRiskToAvoid: 'Dissecting beneath the inferior border of rib where the Intercostal Neurovascular Bundle (VAN: Vein, Artery, Nerve) runs in the costal groove.',
        clinicalPearls: 'Always "walk" instruments over the SUPERIOR border of the rib to avoid VAN damage.'
      },
      {
        stepNumber: 4,
        title: 'Pleural Penetration & Finger Sweep',
        actionSummary: 'Push closed Kelly forceps gently through parietal pleura; feel sudden "give" / rush of air or fluid. Insert gloved index finger into pleural cavity to confirm entry.',
        anatomicalExplanation: 'Finger sweep 360 degrees verifies that the lung is not adherent to the chest wall and confirms you are inside the pleural cavity, not extrapleural or peritoneal.',
        instrumentsRequired: ['Sterile gloves', 'Artery forceps'],
        keyAnatomicalLandmark: 'Parietal pleura, Visceral pleura of lung',
        surgicalRiskToAvoid: 'Laceration of lung parenchyma by using sharp trocar instead of blunt finger dissection.',
        clinicalPearls: 'Never use a sharp trocar to pierce the chest wall (ATLS guideline).'
      },
      {
        stepNumber: 5,
        title: 'Tube Insertion & Orientation',
        actionSummary: 'Grasp tip of chest tube (28-32 Fr for hemothorax, 20-24 Fr for pneumothorax) with forceps and advance through tract into pleural space. Direct tube apically for air, basally for fluid.',
        anatomicalExplanation: 'Air rises to the apex of the hemithorax in semi-erect posture; fluid collects dependent at the diaphragmatic sulcus.',
        instrumentsRequired: ['Chest drain tube (24-32 Fr)', 'Large curved clamp'],
        keyAnatomicalLandmark: 'Apical vs basal pleural recesses',
        surgicalRiskToAvoid: 'Side holes of chest tube lying outside pleural cavity in subcutaneous tissue causing massive subcutaneous emphysema.',
        clinicalPearls: 'Ensure ALL side fenestrations are at least 3-5 cm inside the pleural cavity before securing.'
      },
      {
        stepNumber: 6,
        title: 'Connection to Underwater Seal & Suture Fixation',
        actionSummary: 'Connect tube immediately to underwater seal bottle. Secure tube to skin with 0-Silk mattress suture and wrap with purse-string or "Roman sandal" wrap.',
        anatomicalExplanation: 'Underwater seal provides a one-way valve: air and fluid escape during expiration/cough, but water column prevents atmospheric air drawn back during inspiration.',
        instrumentsRequired: ['0-Silk / Mersilk suture with curved cutting needle', 'Underwater drainage system', 'Sterile occlusive dressing'],
        keyAnatomicalLandmark: 'Chest tube entry site at skin',
        surgicalRiskToAvoid: 'Dislodgement of tube with resultant open pneumothorax (sucking chest wound).',
        clinicalPearls: 'Verify "swinging" of water column with respiration (patency) and "bubbling" during cough (active air leak).'
      }
    ],
    postOperativeCare: [
      'Immediate post-procedure erect Chest X-Ray to confirm tube position and lung re-expansion',
      'Drain bottle must ALWAYS remain below the level of the patient chest (never lift above bed)',
      'Record drainage volume every hour for hemothorax (>200 mL/hr for 3-4 consecutive hours = indication for thoracotomy)',
      'Administer adequate systemic analgesia to allow deep breathing and chest physiotherapy',
      'Remove tube when lung is fully expanded on CXR and drainage is <50-100 mL/24h without air leak'
    ],
    references: 'ATLS (Advanced Trauma Life Support) 10th Ed; British Thoracic Society (BTS) Pleural Disease Guideline; Bailey & Love 28th Ed.'
  }
];
