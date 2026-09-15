import { AnatomicalStructure } from '../types/anatomy';

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // ==========================================================================
  // 1. CARDIOVASCULAR SYSTEM (System: cardiovascular)
  // ==========================================================================
  {
    id: 'left-ventricle',
    name: 'Left Ventricle',
    latinName: 'Ventriculus sinister cordis',
    commonName: 'Systemic Pumping Chamber',
    system: 'cardiovascular',
    subsystem: 'Heart Chambers',
    region: 'thorax',
    meshIds: ['mesh_left_ventricle', 'lv_myocardium'],
    category: 'Cardiac Chambers',
    location: 'Forms the apex of the heart and the major portion of the sternocostal and diaphragmatic surfaces.',
    structureDescription: 'Thick muscular chamber (wall thickness 8–12 mm, three times thicker than right ventricle). Interior lined by trabeculae carneae, with anterior and posterior papillary muscles giving chordae tendineae to the bicuspid mitral valve.',
    function: 'Pumps oxygenated blood under high systemic pressure (120 mmHg systolic) into the ascending aorta to supply all systemic vascular beds.',
    bloodSupply: 'Left Anterior Descending (LAD) and Circumflex branch of the Left Coronary Artery (LCA).',
    venousDrainage: 'Great Cardiac Vein draining into the Coronary Sinus (entering right atrium).',
    innervation: 'Cardiac plexus (sympathetic from T1–T4 segments via cervical/thoracic ganglia; parasympathetic via cardiac branches of Vagus nerve CN X).',
    nerveSupply: 'Cardiac plexus (sympathetic T1–T4, parasympathetic CN X)',
    lymphaticDrainage: 'Subepicardial lymphatic plexus draining along coronary sulcus to inferior tracheobronchial lymph nodes.',
    relations: {
      anterior: 'Left lung and pleura, anterior thoracic wall (left 5th intercostal space 9 cm from midsternal line).',
      posterior: 'Left atrium, coronary sinus, descending thoracic aorta, and esophagus.',
      medial: 'Interventricular septum (muscular part and membranous part).',
      lateral: 'Left lung (cardiac impression on mediastinal surface).',
      superior: 'Left atrium and Left Atrioventricular (Mitral) orifice.',
      inferior: 'Central tendon of diaphragm (separated by diaphragmatic pericardium).'
    },
    clinicalImportance: 'Site of left ventricular hypertrophy (LVH) in chronic systemic hypertension and aortic stenosis. Anterior wall myocardial infarction follows LAD thrombotic occlusion.',
    clinicalRelevance: 'Hypertrophy occurs in hypertension and aortic stenosis; LAD occlusion causes anterior wall STEMI.',
    commonConditions: ['Anterior Wall STEMI', 'Left Ventricular Failure (Congestive Heart Failure)', 'Hypertensive Cardiomyopathy', 'Aortic Stenosis with Concentric LVH'],
    associatedDiseases: ['Anterior Wall STEMI', 'Left Ventricular Failure', 'Hypertensive Heart Disease', 'Dilated Cardiomyopathy'],
    mbbsExamPoints: [
      'Why is the left ventricular wall 3 times thicker than the right ventricle? (Must mention high peripheral vascular resistance).',
      'What are the boundaries of the Left Ventricular Outflow Tract (LVOT)?',
      'Name the papillary muscles of the left ventricle and explain the consequence of papillary muscle rupture following STEMI (acute severe mitral regurgitation).'
    ],
    vivaQuestions: [
      'Why is the wall of the left ventricle 3 times thicker than the right ventricle?',
      'What are the boundaries of the Left Ventricular Outflow Tract (LVOT)?',
      'Name the papillary muscles of the left ventricle and their blood supply.'
    ],
    ospeNotes: [
      'Identified by forming the anatomical cardiac apex.',
      'Bicuspid mitral valve with thick chordae tendineae visible on coronal section.',
      'Myocardial wall thickness measures 8-12 mm.'
    ],
    clinicalConnections: {
      diseases: ['Acute Myocardial Infarction', 'Acute Pulmonary Edema', 'Aortic Valve Disease', 'Hypertrophic Cardiomyopathy'],
      symptoms: ['Exertional dyspnea', 'Orthopnea', 'Paroxysmal Nocturnal Dyspnea (PND)', 'Angina pectoris'],
      clinicalExam: ['Displaced, heaving apex beat in LVH', 'S3 gallop rhythm in volume overload', 'S4 gallop in pressure overload'],
      investigations: ['12-lead ECG (Sokolow-Lyon index > 35 mm)', 'Transthoracic Echocardiography (EF < 40%)', 'Troponin-I / CK-MB', 'Coronary Angiography'],
      procedures: ['Percutaneous Coronary Intervention (PCI)', 'Coronary Artery Bypass Graft (CABG)', 'Left Ventricular Assist Device (LVAD)'],
      management: ['Dual antiplatelet therapy (Aspirin + Clopidogrel)', 'ACE inhibitors (Ramipril)', 'Beta-blockers (Bisoprolol)', 'Statin therapy (Atorvastatin 80mg)']
    },
    defaultPosition: [-0.35, -0.3, 0.25],
    color: '#e11d48',
    explodedOffset: [-0.6, -0.2, 0.4]
  },
  {
    id: 'right-ventricle',
    name: 'Right Ventricle',
    latinName: 'Ventriculus dexter cordis',
    commonName: 'Pulmonary Pumping Chamber',
    system: 'cardiovascular',
    subsystem: 'Heart Chambers',
    region: 'thorax',
    meshIds: ['mesh_right_ventricle', 'rv_myocardium'],
    category: 'Cardiac Chambers',
    location: 'Forms the largest portion of the anterior (sternocostal) surface of the heart, lying immediately behind the body of the sternum.',
    structureDescription: 'Crescentic in cross-section wrapping anterior to the left ventricle. Wall thickness 3–5 mm. Divided into an inflow trabeculated tract with moderator band (trabecula septomarginalis) and a smooth-walled outflow infundibulum (conus arteriosus).',
    function: 'Pumps deoxygenated systemic venous blood under low pulmonary pressure (25/10 mmHg) through the pulmonary valve into the pulmonary trunk.',
    bloodSupply: 'Right Coronary Artery (RCA) via its acute marginal branch and posterior descending artery (PDA in 85-90% right-dominant hearts).',
    venousDrainage: 'Small Cardiac Vein and Anterior Cardiac Veins draining directly into right atrium.',
    innervation: 'Superficial and deep cardiac plexuses (sympathetic T1–T4, parasympathetic via CN X).',
    nerveSupply: 'Superficial and deep cardiac plexuses',
    lymphaticDrainage: 'Right anterior mediastinal lymph nodes.',
    relations: {
      anterior: 'Body of sternum and left 4th–5th costal cartilages (separated by anterior recesses of pleura and lungs).',
      posterior: 'Left ventricle across the convex interventricular septum.',
      medial: 'Interventricular septum.',
      lateral: 'Right atrium and right coronary sulcus.',
      superior: 'Infundibulum leading into pulmonary orifice.',
      inferior: 'Diaphragm (central tendon).'
    },
    clinicalImportance: 'Contains the moderator band carrying the right branch of the AV bundle (Bundle of His). Prone to right heart failure (Cor Pulmonale) in chronic obstructive pulmonary disease (COPD).',
    clinicalRelevance: 'Moderator band carries conduction fibers; acute dilatation occurs in massive saddle pulmonary embolism.',
    commonConditions: ['Cor Pulmonale', 'Right Ventricular Infarction', 'Arrhythmogenic Right Ventricular Dysplasia (ARVD)', 'Ventricular Septal Defect (VSD)'],
    associatedDiseases: ['Right Heart Failure / Cor Pulmonale', 'Pulmonary Embolism (McConnell sign)', 'Ventricular Septal Defect (VSD)'],
    mbbsExamPoints: [
      'What is the functional and anatomical significance of the moderator band (septomarginal trabecula)?',
      'Describe the developmental origin of the smooth infundibulum (bulbus cordis).',
      'Explain the anatomical basis of cyanosis in Tetralogy of Fallot (VSD, Overriding aorta, Pulmonary stenosis, RVH).'
    ],
    vivaQuestions: [
      'What is the functional importance of the moderator band (septomarginal trabecula)?',
      'What is the infundibulum (conus arteriosus) and its embryological origin?',
      'How does the interior of the right ventricle differ from the left ventricle?'
    ],
    ospeNotes: [
      'Crescent-shaped cavity with moderator band spanning from septum to anterior papillary muscle.',
      'Tricuspid valve has three cusps (anterior, posterior, septal).',
      'Conus arteriosus is smooth-walled leading to pulmonary trunk.'
    ],
    clinicalConnections: {
      diseases: ['Cor Pulmonale', 'Pulmonary Embolism', 'Tetralogy of Fallot', 'Pulmonary Arterial Hypertension'],
      symptoms: ['Bilateral pedal edema', 'Right upper quadrant hepatic tenderness', 'Fatigue', 'Abdominal distension (ascites)'],
      clinicalExam: ['Raised Jugular Venous Pressure (JVP) with prominent V wave in tricuspid regurgitation', 'Left parasternal heave', 'Pulsatile hepatomegaly'],
      investigations: ['ECG (Right axis deviation, tall R in V1, P pulmonale)', 'Echocardiography (TAPSE < 17 mm)', 'CT Pulmonary Angiography (CTPA)'],
      procedures: ['Right heart catheterization (Swan-Ganz)', 'Pericardiocentesis', 'Pulmonary embolectomy'],
      management: ['Diuretics (Furosemide + Spironolactone)', 'Long-term oxygen therapy for COPD', 'Anticoagulation for PE']
    },
    defaultPosition: [0.35, -0.25, 0.35],
    color: '#3b82f6',
    explodedOffset: [0.6, -0.2, 0.5]
  },
  {
    id: 'ascending-aorta',
    name: 'Ascending Aorta & Aortic Root',
    latinName: 'Aorta ascendens',
    commonName: 'Aortic Root & Great Trunk',
    system: 'cardiovascular',
    subsystem: 'Great Vessels',
    region: 'thorax',
    meshIds: ['mesh_ascending_aorta', 'aortic_root'],
    category: 'Great Arteries',
    location: 'Originates at the aortic orifice at the base of the left ventricle at the level of the lower border of the 3rd left costal cartilage.',
    structureDescription: 'Large elastic artery approximately 5 cm in length and 3 cm in diameter. Possesses three dilations (aortic sinuses of Valsalva) above the semilunar cusps.',
    function: 'Distributes oxygenated blood under pulsatile hydraulic pressure into systemic circulation and supplies coronary arteries during diastole.',
    bloodSupply: 'Vasa vasorum within the tunica adventitia.',
    venousDrainage: 'Vasa vasorum veins draining into coronary sinus and brachiocephalic veins.',
    innervation: 'Cardiac autonomic plexus; aortic baroreceptors innervated by the aortic depressor nerve (branch of CN X).',
    nerveSupply: 'Aortic baroreceptor branch of CN X',
    lymphaticDrainage: 'Anterior mediastinal lymph nodes and tracheobronchial nodes.',
    relations: {
      anterior: 'Pulmonary trunk, right auricle, sternum, and left pleural margin.',
      posterior: 'Left atrium, transverse pericardial sinus, right pulmonary artery, and right principal bronchus.',
      medial: 'Superior Vena Cava (to its right).',
      lateral: 'Pulmonary trunk (to its left).',
      superior: 'Continuous with arch of aorta at the level of the sternal angle of Louis (T4/T5 disc).',
      inferior: 'Fibrous aortic ring of the cardiac skeleton.'
    },
    clinicalImportance: 'Site of catastrophic Stanford Type A aortic dissection requiring emergency operative repair. Prone to aneurysm formation in Marfan syndrome and bicuspid aortic valve.',
    clinicalRelevance: 'Type A dissection is a surgical emergency; coronary arteries arise from its anterior and left posterior sinuses.',
    commonConditions: ['Stanford Type A Aortic Dissection', 'Aortic Root Aneurysm', 'Aortic Regurgitation', 'Syphilitic Aortitis'],
    associatedDiseases: ['Aortic Dissection (Type A)', 'Aortic Regurgitation', 'Aortic Aneurysm', 'Syphilitic Aortitis'],
    mbbsExamPoints: [
      'Name the aortic sinuses of Valsalva and identify which coronary artery arises from each sinus.',
      'Distinguish Stanford Type A from Type B dissection regarding anatomical location and management.',
      'What are the boundaries and clinical significance of the transverse pericardial sinus?'
    ],
    vivaQuestions: [
      'What are the aortic sinuses of Valsalva and what arises from them?',
      'What constitutes the fibrous skeleton of the heart?',
      'Distinguish Stanford Type A from Type B aortic dissection.'
    ],
    ospeNotes: [
      'Arises anterior and to the right of the pulmonary trunk origin.',
      'Enclosed in a common sheath of serous pericardium with the pulmonary trunk.',
      'Coronary ostia visible inside the anterior and left posterior aortic sinuses.'
    ],
    clinicalConnections: {
      diseases: ['Aortic Dissection', 'Aortic Valve Insufficiency', 'Marfan Syndrome', 'Bicuspid Aortic Valve Disease'],
      symptoms: ['Tearing retrosternal chest pain radiating to the back', 'Syncope', 'Hypotension'],
      clinicalExam: ['Blood pressure discrepancy > 20 mmHg between upper extremities', 'Early diastolic decrescendo murmur of aortic regurgitation'],
      investigations: ['CT Angiography of Thoracic Aorta (intimal flap)', 'Transesophageal Echocardiography (TEE)', 'Chest X-ray (widened mediastinum > 8 cm)'],
      procedures: ['Bentall procedure (aortic root replacement with composite graft)', 'Aortic valve replacement (AVR)'],
      management: ['IV Labetalol or Esmolol (target systolic BP 100-120 mmHg and HR < 60 bpm)', 'Immediate cardiothoracic surgical consultation']
    },
    defaultPosition: [0, 0.65, 0.05],
    color: '#ef4444',
    explodedOffset: [0, 0.7, -0.2]
  },
  {
    id: 'left-anterior-descending',
    name: 'Left Anterior Descending (LAD) Coronary Artery',
    latinName: 'Ramus interventricularis anterior arteriae coronariae sinistrae',
    commonName: 'Anterior Interventricular Artery ("The Widow-Maker")',
    system: 'cardiovascular',
    subsystem: 'Coronary Vasculature',
    region: 'thorax',
    meshIds: ['mesh_lad_artery'],
    category: 'Coronary Arteries',
    location: 'Courses inferiorly within the anterior interventricular sulcus toward the cardiac apex.',
    structureDescription: 'Major terminal branch of the Left Main Coronary Artery (LMCA). Gives off diagonal branches to the LV anterolateral wall and septal perforating branches into the anterior 2/3 of the interventricular septum.',
    function: 'Supplies the most critical functional region of the left ventricle: anterolateral wall, apex, anterior two-thirds of the interventricular septum, and bundle branches of His.',
    bloodSupply: 'Arises directly from the Left Main Coronary Artery (from left posterior aortic sinus).',
    venousDrainage: 'Accompanied by the Great Cardiac Vein (Vena cordis magna).',
    innervation: 'Cardiac autonomic plexus running in perivascular adventitial coat.',
    nerveSupply: 'Perivascular cardiac autonomic plexus',
    lymphaticDrainage: 'Subepicardial lymphatic channels to tracheobronchial lymph nodes.',
    relations: {
      anterior: 'Epicardium, anterior chest wall (overlain by pericardium).',
      posterior: 'Anterior interventricular groove and muscular interventricular septum.',
      medial: 'Right ventricle anterior wall.',
      lateral: 'Left ventricle anterior wall and Great Cardiac Vein.',
      superior: 'Bifurcation of Left Main Coronary Artery behind the pulmonary trunk.',
      inferior: 'Anastomoses around the cardiac apex with the Posterior Descending Artery (PDA).'
    },
    clinicalImportance: 'The single most commonly occluded coronary artery in myocardial infarction (approx. 50% of all STEMIs). Acute occlusion causes extensive anterior wall MI and cardiogenic shock.',
    clinicalRelevance: 'Occlusion causes anterior STEMI (leads V1–V4); supplies conduction bundle branches.',
    commonConditions: ['Anterior Wall STEMI', 'Extensive Anterolateral MI', 'Complete Heart Block (Septal perforation)', 'Left Ventricular Free Wall Rupture'],
    associatedDiseases: ['Anterior STEMI', 'Coronary Artery Disease', 'Ischemic Cardiomyopathy'],
    mbbsExamPoints: [
      'What areas of the cardiac conducting system are supplied by septal branches of the LAD?',
      'Which ECG leads show ST elevation in acute LAD occlusion? (Leads V1 to V4/V6).',
      'Define "coronary dominance" and state which vessel determines it.'
    ],
    vivaQuestions: [
      'What are the branches of the Left Coronary Artery?',
      'Which leads on a 12-lead ECG monitor LAD perfusion territory?',
      'Why is acute occlusion of the LAD associated with ventricular arrhythmias and pump failure?'
    ],
    ospeNotes: [
      'Located in the anterior interventricular sulcus running toward the apex.',
      'Accompanied on its left by the Great Cardiac Vein.',
      'Gives diagonal branches traversing across the anterior surface of the left ventricle.'
    ],
    clinicalConnections: {
      diseases: ['Coronary Artery Atherosclerosis', 'Acute Anterior STEMI', 'Ventricular Septal Rupture'],
      symptoms: ['Crushing substernal chest pain radiating to left jaw or arm', 'Diaphoresis', 'Nausea'],
      clinicalExam: ['Hypotension and tachycardia (cardiogenic shock signs)', 'Basal pulmonary rales'],
      investigations: ['12-lead ECG: ST elevation in leads V1–V4, reciprocal depression in II, III, aVF', 'Cardiac Troponin I / T', 'Emergency Coronary Angiogram'],
      procedures: ['Primary Percutaneous Coronary Intervention (pPCI) with Drug-Eluting Stent (DES)', 'CABG (LIMA to LAD anastomosis)'],
      management: ['Aspirin 300 mg + Ticagrelor 180 mg loading dose', 'Unfractionated Heparin', 'High-intensity Statin', 'Immediate door-to-balloon time < 90 min']
    },
    defaultPosition: [-0.2, 0.05, 0.42],
    color: '#dc2626',
    explodedOffset: [-0.4, 0.1, 0.6]
  },

  // ==========================================================================
  // 2. RESPIRATORY SYSTEM (System: respiratory)
  // ==========================================================================
  {
    id: 'trachea-carina',
    name: 'Trachea & Carina',
    latinName: 'Trachea et Carina tracheae',
    commonName: 'Windpipe & Bronchial Bifurcation',
    system: 'respiratory',
    subsystem: 'Conducting Airway',
    region: 'thorax',
    meshIds: ['mesh_trachea', 'carina_ring'],
    category: 'Airway',
    location: 'Extends from lower border of cricoid cartilage (C6 level) through the superior mediastinum to the sternal angle of Louis (T4/T5 disc level).',
    structureDescription: 'Fibrocartilaginous tube 10–12 cm long composed of 16–20 C-shaped hyaline cartilage rings deficient posteriorly where the trachealis smooth muscle lies against the esophagus. The carina is a ridge of cartilage at the bifurcation.',
    function: 'Conducts inspired and expired air between the larynx and principal bronchi; mucociliary clearance escalator clears inhaled particulate matter.',
    bloodSupply: 'Inferior thyroid arteries (cervical part) and bronchial arteries (thoracic part).',
    venousDrainage: 'Inferior thyroid venous plexus into brachiocephalic veins.',
    innervation: 'Recurrent laryngeal nerves (branches of Vagus CN X) providing parasympathetic secretomotor and sensory fibers; sympathetic fibers from thoracic sympathetic trunk.',
    nerveSupply: 'Recurrent laryngeal nerves (CN X) and sympathetic trunk',
    lymphaticDrainage: 'Pretracheal and paratracheal lymph nodes draining to deep cervical and mediastinal nodes.',
    relations: {
      anterior: 'Manubrium sterni, thymus, left brachiocephalic vein, arch of aorta, brachiocephalic artery, left common carotid artery.',
      posterior: 'Esophagus and left recurrent laryngeal nerve.',
      medial: 'Median plane position.',
      lateral: 'Right side: right lung, pleura, right vagus nerve, azygos vein arch. Left side: aortic arch, left common carotid, left subclavian artery.',
      superior: 'Cricoid cartilage (C6 vertebral level).',
      inferior: 'Bifurcates at T4/T5 into Right and Left Main (Principal) Bronchi.'
    },
    clinicalImportance: 'The carina is the most sensitive cough-reflex zone. Carinal distortion or splaying on bronchoscopy signifies subcarinal lymphadenopathy (frequently bronchogenic carcinoma metastasis). Site for emergency tracheostomy and endotracheal intubation.',
    clinicalRelevance: 'Carinal widening indicates subcarinal lymphadenopathy; deficient posteriorly for esophageal expansion.',
    commonConditions: ['Tracheobronchitis', 'Tracheal Stenosis post-intubation', 'Subcarinal Lymphadenopathy', 'Tracheoesophageal Fistula'],
    associatedDiseases: ['Tracheal Stenosis', 'Bronchogenic Carcinoma', 'Inhaled Foreign Body'],
    mbbsExamPoints: [
      'At what vertebral level does the trachea commence and terminate? (C6 to T4/T5 disc).',
      'Why are tracheal rings C-shaped and incomplete posteriorly? (Allows expansion of esophagus during swallowing bolus).',
      'Describe the structures related anteriorly to the thoracic trachea in the superior mediastinum.'
    ],
    vivaQuestions: [
      'What are the vertebral levels of the origin and bifurcation of the trachea?',
      'Why is the posterior wall of the trachea devoid of cartilage?',
      'What structures must be retracted or divided during an emergency tracheostomy?'
    ],
    ospeNotes: [
      'Identified by U-shaped anterior cartilage rings and smooth posterior trachealis muscle.',
      'Internal ridge of carina separates the two principal bronchial orifices.',
      'Sits directly anterior to the esophagus.'
    ],
    clinicalConnections: {
      diseases: ['Tracheal Stenosis', 'Tracheobronchial Foreign Body', 'Laryngeal/Tracheal Trauma'],
      symptoms: ['Inspiratory stridor', 'Persistent barking cough', 'Choking sensation', 'Dyspnea'],
      clinicalExam: ['Tracheal tug sign', 'Tracheal deviation in tension pneumothorax / massive pleural effusion'],
      investigations: ['Rigid or Flexible Fiberoptic Bronchoscopy', 'Chest Radiograph (PA & Lateral)', 'Contrast CT Thorax'],
      procedures: ['Tracheostomy (through 2nd and 3rd tracheal rings)', 'Endotracheal Intubation', 'Bronchoscopic foreign body extraction'],
      management: ['Airway stabilization', 'Supplemental oxygen', 'Emergency surgical airway if upper obstruction exists']
    },
    defaultPosition: [0, 1.3, -0.05],
    color: '#06b6d4',
    explodedOffset: [0, 0.8, -0.4]
  },
  {
    id: 'right-lung',
    name: 'Right Lung & Lobes',
    latinName: 'Pulmo dexter',
    commonName: 'Right Lung (3 Lobes: Superior, Middle, Inferior)',
    system: 'respiratory',
    subsystem: 'Pulmonary Parenchyma',
    region: 'thorax',
    meshIds: ['mesh_right_lung', 'right_middle_lobe', 'right_lower_lobe'],
    category: 'Respiratory Viscera',
    location: 'Occupies the right pleural hemithorax, resting on the right dome of the diaphragm.',
    structureDescription: 'Heavier (approx. 625g) and broader than the left lung. Possesses 3 lobes (Superior, Middle, Inferior) demarcated by the Oblique fissure and Horizontal fissure. Hilum contains from above downward: Eparterial bronchus, Pulmonary artery, Hyparterial bronchus, and Inferior pulmonary vein.',
    function: 'External gas exchange: oxygenation of mixed venous blood and elimination of carbon dioxide via the alveolar-capillary membrane.',
    bloodSupply: 'One single right bronchial artery (usually arising from 3rd posterior intercostal artery or upper left bronchial artery).',
    venousDrainage: 'Bronchial veins draining into the Azygos vein.',
    innervation: 'Anterior and posterior pulmonary plexuses (sympathetic T2–T5 causing bronchodilation and vasoconstriction; parasympathetic CN X causing bronchoconstriction and secretomotor stimulation).',
    nerveSupply: 'Pulmonary plexuses (sympathetic T2–T5, parasympathetic CN X)',
    lymphaticDrainage: 'Bronchopulmonary (hilar) lymph nodes draining to tracheobronchial nodes and bronchomediastinal trunk.',
    relations: {
      anterior: 'Anterior thoracic wall, costal cartilages, internal thoracic vessels.',
      posterior: 'Thoracic vertebral bodies, sympathetic trunk, posterior intercostal vessels.',
      medial: 'Right atrium, superior vena cava, inferior vena cava, azygos vein arch, esophagus, and phrenic nerve.',
      lateral: 'Ribs and intercostal muscles lined by parietal costal pleura.',
      superior: 'Apex projects 2.5 cm above the medial third of the clavicle into root of neck.',
      inferior: 'Right copula of diaphragm separating it from right lobe of liver.'
    },
    clinicalImportance: 'The right main bronchus is wider and steeper, so aspirated foreign bodies lodge here. Middle lobe syndrome: bronchial compression by enlarged hilar lymph nodes causes recurrent middle lobe collapse.',
    clinicalRelevance: '3 lobes, 2 fissures; foreign bodies aspirate preferentially into right bronchial tree.',
    commonConditions: ['Right Lobar Pneumonia', 'Pulmonary Tuberculosis (Apical/Post-apical segment)', 'Bronchogenic Carcinoma', 'Right Pleural Effusion'],
    associatedDiseases: ['Lobar Pneumonia', 'Pulmonary Tuberculosis', 'Aspiration Pneumonia'],
    mbbsExamPoints: [
      'Name the lobes and fissures of the right lung and give their surface markings.',
      'Enumerate the structures in the hilum of the right lung from above downward (Eparterial bronchus, pulmonary artery, hyparterial bronchus, inferior pulmonary vein).',
      'Name the 10 bronchopulmonary segments of the right lung.'
    ],
    vivaQuestions: [
      'How do you distinguish between the right lung and left lung on a gross specimen?',
      'What are the contents and arrangement in the hilum of the right lung?',
      'Why is aspiration pneumonia predominantly a disease of the right lung?'
    ],
    ospeNotes: [
      'Identified by having 3 lobes and two fissures (oblique and horizontal).',
      'Hilar arrangement features an eparterial bronchus located above the pulmonary artery.',
      'Cardiac impression on mediastinal surface is shallow and accommodates the right atrium.'
    ],
    clinicalConnections: {
      diseases: ['Community-Acquired Pneumonia', 'Pulmonary Tuberculosis', 'Aspiration Pneumonitis', 'Pleural Effusion'],
      symptoms: ['Productive cough with purulent/rusty sputum', 'High-grade fever with chills', 'Pleuritic chest pain', 'Hemoptysis'],
      clinicalExam: ['Dull percussion note over affected lobe', 'Bronchial breathing and increased vocal resonance / egophony', 'Coarse inspiratory crackles'],
      investigations: ['Chest Radiograph PA View (homogenous consolidation with air bronchograms)', 'Sputum for AFB / GeneXpert', 'High-Resolution CT Thorax'],
      procedures: ['Thoracocentesis (pleural tap in 7th/8th ICS midaxillary line)', 'Intercostal chest drain (ICD) insertion in safety triangle', 'Flexible Bronchoscopy'],
      management: ['Appropriate empiric antibiotics (Amoxicillin/Clavulanate + Azithromycin)', 'Chest physiotherapy and postural drainage', 'Hydration and antipyretics']
    },
    defaultPosition: [0.75, 0.3, 0],
    color: '#38bdf8',
    explodedOffset: [1.2, 0.3, 0]
  },

  // ==========================================================================
  // 3. NERVOUS SYSTEM (System: nervous)
  // ==========================================================================
  {
    id: 'circle-of-willis',
    name: 'Circle of Willis (Arterial Circle)',
    latinName: 'Circulus arteriosus cerebri',
    commonName: 'Cerebral Arterial Polygon of Willis',
    system: 'nervous',
    subsystem: 'Cerebrovascular Circulation',
    region: 'neuroanatomy',
    meshIds: ['mesh_circle_of_willis', 'basilar_artery', 'ica_terminals'],
    category: 'Cerebral Vasculature',
    location: 'Located in the subarachnoid interpeduncular cistern at the base of the brain, surrounding the optic chiasma, infundibulum, and mammillary bodies.',
    structureDescription: 'Heptagonal arterial anastomosis connecting the internal carotid (anterior) and vertebrobasilar (posterior) systems. Formed by: Anterior Communicating, 2 Anterior Cerebrals, 2 Internal Carotids, 2 Posterior Communicating, and 2 Posterior Cerebrals (terminal branches of Basilar).',
    function: 'Equalizes cerebral perfusion pressure between both hemispheres and provides vital collateral pathway should one major supplying artery become occluded.',
    bloodSupply: 'Internal Carotid Arteries and Vertebral Arteries (uniting into Basilar Artery).',
    venousDrainage: 'Superficial and deep cerebral veins draining into Dural Venous Sinuses (Superior Sagittal, Straight, and Cavernous Sinuses).',
    innervation: 'Perivascular autonomic plexus (sympathetic from superior cervical ganglion; parasympathetic via facial nerve CN VII).',
    nerveSupply: 'Perivascular sympathetic/parasympathetic plexus',
    lymphaticDrainage: 'Cerebrospinal fluid drains into dural venous sinuses via arachnoid granulations; glymphatic system cleanses interstitium.',
    relations: {
      anterior: 'Optic chiasma and lamina terminalis.',
      posterior: 'Pons, cerebral peduncles, and basilar artery on clivus.',
      medial: 'Pituitary stalk (infundibulum), tuber cinereum, and mammillary bodies.',
      lateral: 'Uncus of temporal lobes and oculomotor nerve (CN III passing between PCA and SCA).',
      superior: 'Hypothalamus and floor of the third ventricle.',
      inferior: 'Sella turcica, cavernous sinuses, and body of sphenoid bone.'
    },
    clinicalImportance: 'The principal site of congenital saccular (berry) aneurysms (most commonly AComm ~40%, PComm ~30%, MCA bifurcation ~20%). Aneurysmal rupture causes catastrophic Subarachnoid Hemorrhage (SAH) with "thunderclap" headache.',
    clinicalRelevance: 'Primary site of berry aneurysms causing SAH; provides critical collateral flow in ischemic stroke.',
    commonConditions: ['Subarachnoid Hemorrhage (SAH)', 'Ruptured Saccular Berry Aneurysm', 'Ischemic Stroke (MCA/ACA territory)', 'Oculomotor Nerve Palsy (PComm aneurysm compression)'],
    associatedDiseases: ['Berry Aneurysm', 'Subarachnoid Hemorrhage', 'Ischemic Stroke', 'Transient Ischemic Attack'],
    mbbsExamPoints: [
      'Draw and label the arterial Circle of Willis indicating all 9 anastomotic components.',
      'Which cranial nerve passes between the posterior cerebral artery and superior cerebellar artery? (CN III Oculomotor; compressed by PComm or PCA aneurysm causing ptosis and mydriasis).',
      'What is the commonest site of berry aneurysm and its clinical presentation?'
    ],
    vivaQuestions: [
      'Name all arteries contributing directly to the Circle of Willis.',
      'What are the clinical manifestations of rupture of a berry aneurysm of the anterior communicating artery?',
      'Which arteries supply the posterior 1/3 of the cerebral cortex?'
    ],
    ospeNotes: [
      'Situated at the base of the brain around the optic chiasma and mammillary bodies.',
      'Basilar artery bifurcates at the upper border of the pons into the two Posterior Cerebral Arteries.',
      'CN III emerges between the Posterior Cerebral Artery and Superior Cerebellar Artery.'
    ],
    clinicalConnections: {
      diseases: ['Intracranial Aneurysm', 'Subarachnoid Hemorrhage', 'Acute Ischemic Stroke'],
      symptoms: ['Sudden explosive "worst headache of life"', 'Photophobia', 'Neck stiffness', 'Loss of consciousness'],
      clinicalExam: ['Meningism: Positive Kernig and Brudzinski signs', 'Unilateral pupil dilation (CN III compression from PComm aneurysm)'],
      investigations: ['Non-contrast CT Brain (hyperdense blood in basal cisterns)', 'Lumbar Puncture (xanthochromia after 12h)', 'CT Angiography / Digital Subtraction Angiography (DSA)'],
      procedures: ['Endovascular coiling of intracranial aneurysm', 'Microsurgical clipping via craniotomy'],
      management: ['Nimodipine 60 mg every 4 hours (prevents vasospasm)', 'Strict blood pressure control', 'Neurosurgical clipping/coiling within 24–72 hours']
    },
    defaultPosition: [0, 0.45, 0.1],
    color: '#8b5cf6',
    explodedOffset: [0, 0.8, 0.3]
  },

  // ==========================================================================
  // 4. DIGESTIVE SYSTEM (System: digestive)
  // ==========================================================================
  {
    id: 'vermiform-appendix',
    name: 'Vermiform Appendix',
    latinName: 'Appendix vermiformis',
    commonName: 'Appendix ("Abdominal Tonsil")',
    system: 'digestive',
    subsystem: 'Gastrointestinal Viscera',
    region: 'abdomen',
    meshIds: ['mesh_appendix', 'mesoappendix'],
    category: 'Abdominal Viscera',
    location: 'Arises from the posteromedial aspect of the caecum, approximately 2 cm below the ileocaecal junction in the right iliac fossa.',
    structureDescription: 'Narrow, worm-shaped tubular diverticulum 8–10 cm in length. Characterized by convergence of the three taeniae coli at its base. Contains abundant lymphoid tissue in its submucosa. Suspended by a triangular peritoneal fold, the mesoappendix.',
    function: 'Secondary lymphoid organ populated by B and T lymphocytes; acts as a reservoir for commensal gut microflora.',
    bloodSupply: 'Appendicular artery (a terminal branch of the inferior division of the ileocolic artery from the Superior Mesenteric Artery). Runs in the free border of the mesoappendix.',
    venousDrainage: 'Appendicular vein draining into ileocolic vein and thence into the Portal Vein.',
    innervation: 'Sympathetic fibers from T10 spinal segment via superior mesenteric plexus (explaining initial periumbilical referred pain); parasympathetic via CN X.',
    nerveSupply: 'Sympathetic T10 segment, parasympathetic CN X',
    lymphaticDrainage: 'Ileocolic lymph nodes along the ileocolic artery to superior mesenteric nodes.',
    relations: {
      anterior: 'Anterior abdominal wall, coils of small intestine (ileum), greater omentum.',
      posterior: 'Psoas major muscle, femoral nerve, genitofemoral nerve, iliac vessels (in retrocaecal position).',
      medial: 'Ileocaecal valve and terminal ileum.',
      lateral: 'Caecum and lateral paracolic gutter.',
      superior: 'Base attached to caecal fundus where taeniae coli converge.',
      inferior: 'External iliac vessels and pelvic brim (in pelvic position).'
    },
    clinicalImportance: 'Acute appendicitis is the commonest emergency surgical abdomen. Appendicular artery is an anatomic end artery; luminal obstruction by a faecolith causes vascular thrombosis, gangrene, and perforation.',
    clinicalRelevance: 'End artery supply causes rapid gangrene; pain shifts from T10 periumbilical to McBurney point.',
    commonConditions: ['Acute Appendicitis', 'Appendicular Abscess', 'Perforated Appendix with Peritonitis', 'Carcinoid Tumor of the Appendix'],
    associatedDiseases: ['Acute Appendicitis', 'Peritonitis', 'Carcinoid Tumor'],
    mbbsExamPoints: [
      'Describe the anatomical positions of the appendix with their relative frequencies (Retrocaecal 65%, Pelvic 31%, Subcaecal 2%, Pre-ileal 1%, Post-ileal 0.5%).',
      'Explain the anatomical basis of pain migration in acute appendicitis (Visceral pain via T10 sympathetic fibers referred to umbilicus; somatic pain localized to McBurney point when parietal peritoneum is inflamed).',
      'State the surface marking of McBurney’s point.'
    ],
    vivaQuestions: [
      'How does the surgeon identify the base of the appendix during surgery? (Follow taeniae coli to point of convergence).',
      'What type of artery is the appendicular artery and what is the surgical implication?',
      'Why does pelvic appendicitis cause diarrhea or urinary frequency?'
    ],
    ospeNotes: [
      'Base is identified where three taeniae coli (libera, mesocolica, omentalis) converge.',
      'Appendicular artery lies in the free edge of the triangular mesoappendix.',
      'Tip is the most mobile part and can point in 6 anatomical directions (clock-face analogy).'
    ],
    clinicalConnections: {
      diseases: ['Acute Appendicitis', 'Appendicular Mucocele', 'Neuroendocrine Carcinoid Tumor'],
      symptoms: ['Periumbilical dull ache migrating to sharp right iliac fossa pain within 12 hours', 'Anorexia ("hamburger sign")', 'Nausea and vomiting', 'Low-grade fever'],
      clinicalExam: ['Tenderness at McBurney’s point', 'Rebound tenderness (Blumberg sign)', 'Rovsing sign (left iliac fossa pressure causes RIF pain)', 'Psoas sign (retrocaecal) and Obturator sign (pelvic)'],
      investigations: ['Complete Blood Count (leukocytosis with left shift)', 'High-resolution Ultrasonography of RIF (non-compressible target lesion > 6 mm)', 'Contrast CT Abdomen'],
      procedures: ['Laparoscopic or Open Appendectomy (via McBurney or Lanz muscle-splitting incision)'],
      management: ['IV fluid resuscitation', 'Broad-spectrum IV antibiotics (Ceftriaxone + Metronidazole)', 'Emergency appendectomy within 12–24 hours']
    },
    defaultPosition: [0.45, -0.65, 0.25],
    color: '#f59e0b',
    explodedOffset: [0.8, -0.7, 0.5]
  },
  {
    id: 'liver-porta-hepatis',
    name: 'Liver & Porta Hepatis',
    latinName: 'Hepar et Porta hepatis',
    commonName: 'Liver & The Hepatic Hilum',
    system: 'digestive',
    subsystem: 'Hepatobiliary System',
    region: 'abdomen',
    meshIds: ['mesh_liver', 'porta_hepatis', 'gallbladder'],
    category: 'Digestive Glands',
    location: 'Occupies the right hypochondrium, greater part of the epigastrium, and extends into the left hypochondrium.',
    structureDescription: 'Largest internal organ (1.5 kg). The porta hepatis is a deep transverse fissure (5 cm long) on the visceral surface between the quadrate lobe anteriorly and caudate lobe posteriorly. Contains the Portal Triad structures.',
    function: 'Metabolic homeostasis, bile synthesis, plasma protein (albumin, clotting factors) synthesis, glycogen storage, and detoxification.',
    bloodSupply: 'Dual blood supply: Hepatic Artery Proper (30% oxygen-rich blood) and Portal Vein (70% nutrient-rich venous blood from GI tract).',
    venousDrainage: 'Right, middle, and left Hepatic Veins draining directly into the Inferior Vena Cava (IVC).',
    innervation: 'Hepatic plexus (sympathetic from celiac ganglion T7–T10; parasympathetic from anterior and posterior vagal trunks).',
    nerveSupply: 'Hepatic plexus (celiac sympathetic T7–T10, vagal trunks)',
    lymphaticDrainage: 'Hepatic lymph nodes in the lesser omentum draining to celiac nodes.',
    relations: {
      anterior: 'Diaphragm, anterior abdominal wall, 7th–11th ribs and costal cartilages.',
      posterior: 'Diaphragm, IVC, aorta, lower thoracic vertebrae, esophagus.',
      medial: 'Midline structures: stomach and lesser omentum.',
      lateral: 'Right thoracic wall and right costodiaphragmatic recess.',
      superior: 'Diaphragm conforming to domes (related to pericardium and lungs).',
      inferior: 'Visceral surface relates to stomach, duodenum, hepatic flexure of colon, right kidney, and gallbladder.'
    },
    clinicalImportance: 'At the porta hepatis, the arrangement of structures from anterior to posterior is: Duct (Common Hepatic/Bile), Artery (Hepatic Artery Proper), and Vein (Portal Vein) - mnemonic D-A-V. Pringle maneuver compresses this triad to arrest liver hemorrhage.',
    clinicalRelevance: 'D-A-V relationship in free edge of lesser omentum; target of Pringle maneuver in trauma.',
    commonConditions: ['Cirrhosis of Liver with Portal Hypertension', 'Hepatocellular Carcinoma (HCC)', 'Hepatic Abscess (Amoebic/Pyogenic)', 'Choledocholithiasis'],
    associatedDiseases: ['Liver Cirrhosis', 'Portal Hypertension', 'Hepatocellular Carcinoma'],
    mbbsExamPoints: [
      'Enumerate the structures entering and leaving the porta hepatis.',
      'What is the arrangement of structures in the free border of the lesser omentum? (Duct on right anterior, Artery on left anterior, Portal vein posterior).',
      'Name the sites of portosystemic anastomosis and explain the clinical consequences of portal hypertension (Esophageal varices, caput medusae, rectal hemorrhoids).'
    ],
    vivaQuestions: [
      'Describe the Couinaud functional segmentation of the liver based on vascular distribution.',
      'What is the surgical significance of the Pringle maneuver?',
      'Why does cirrhosis lead to ascites, jaundice, and coagulopathy?'
    ],
    ospeNotes: [
      'Identified by falciform ligament dividing anatomical right and left lobes on anterior surface.',
      'Porta hepatis located on visceral surface between caudate and quadrate lobes.',
      'Gallbladder fossa lies on the inferior surface of the right lobe.'
    ],
    clinicalConnections: {
      diseases: ['Decompensated Liver Cirrhosis', 'Hepatic Encephalopathy', 'Amoebic Liver Abscess'],
      symptoms: ['Jaundice (icterus)', 'Abdominal distension (ascites)', 'Hematemesis (ruptured esophageal varices)', 'Pruritus'],
      clinicalExam: ['Stigmata of chronic liver disease (spider naevi, palmar erythema, gynecomastia)', 'Hepatomegaly / Shrunken liver with splenomegaly', 'Flapping tremor (asterixis)'],
      investigations: ['Liver Function Tests (Bilirubin, ALT, AST, Alkaline Phosphatase, Albumin, PT/INR)', 'Abdominal Ultrasound with Doppler', 'Triphasic CT Liver'],
      procedures: ['Endoscopic Variceal Ligation (EVL)', 'Diagnostic/Therapeutic Paracentesis', 'Transjugular Intrahepatic Portosystemic Shunt (TIPS)'],
      management: ['Lactulose + Rifaximin for hepatic encephalopathy', 'Spironolactone + Furosemide for ascites', 'Terlipressin + IV Ceftriaxone for variceal bleeding']
    },
    defaultPosition: [0.15, -0.2, 0.1],
    color: '#b45309',
    explodedOffset: [0.4, -0.1, -0.3]
  },

  // ==========================================================================
  // 5. URINARY SYSTEM (System: urinary)
  // ==========================================================================
  {
    id: 'right-kidney',
    name: 'Right Kidney & Hilum',
    latinName: 'Ren dexter',
    commonName: 'Right Kidney',
    system: 'urinary',
    subsystem: 'Upper Urinary Tract',
    region: 'abdomen',
    meshIds: ['mesh_right_kidney', 'right_renal_pelvis', 'right_ureter'],
    category: 'Urinary Viscera',
    location: 'Retroperitoneal on the posterior abdominal wall, spanning from T12 to L3 vertebral levels (sits approximately 1.25 cm lower than left kidney due to liver).',
    structureDescription: 'Bean-shaped organ 11 cm long, 6 cm wide, 3 cm thick (weight ~150g). The renal hilum on the medial concave border contains from anterior to posterior: Renal Vein, Renal Artery, Renal Pelvis (V-A-P). Surrounded by fibrous capsule, perirenal fat, renal fascia of Gerota, and pararenal fat.',
    function: 'Filtration of metabolic waste products (urea, creatinine), fluid-electrolyte osmoregulation, acid-base homeostasis, renin secretion (BP regulation), and erythropoietin secretion.',
    bloodSupply: 'Right Renal Artery (branch of Abdominal Aorta at L1/L2 level; passes posterior to IVC).',
    venousDrainage: 'Right Renal Vein draining directly into the Inferior Vena Cava (IVC).',
    innervation: 'Renal plexus derived from celiac plexus and least splanchnic nerve (T10–T12 sympathetic vasoconstrictors).',
    nerveSupply: 'Renal plexus (T10–T12 least splanchnic nerve)',
    lymphaticDrainage: 'Lateral aortic (para-aortic) and precaval lymph nodes.',
    relations: {
      anterior: 'Right suprarenal gland, right lobe of liver (hepatorenal pouch of Morison), descending duodenum (2nd part), hepatic flexure of colon, small intestine.',
      posterior: 'Diaphragm, 12th rib, psoas major, quadratus lumborum, transversus abdominis, subcostal vessels/nerve, iliohypogastric and ilioinguinal nerves.',
      medial: 'Renal hilum (V-A-P arrangement), IVC, right ureter.',
      lateral: 'Lateral abdominal wall.',
      superior: 'Right suprarenal gland capping upper pole.',
      inferior: 'Extends to within 2.5 cm of the iliac crest.'
    },
    clinicalImportance: 'Hepatorenal pouch of Morison is the most dependent peritoneal space in supine posture where pus or blood accumulates. Arrangement of hilar structures (V-A-P) is an absolute must-know viva question. Renal angle tenderness indicates acute pyelonephritis.',
    clinicalRelevance: 'Hilar arrangement anterior to posterior is V-A-P; lowest point of supine peritoneum is Morison pouch.',
    commonConditions: ['Renal Calculi (Nephrolithiasis)', 'Acute Pyelonephritis', 'Renal Cell Carcinoma (Grawitz tumor)', 'Polycystic Kidney Disease (ADPKD)'],
    associatedDiseases: ['Nephrolithiasis', 'Acute Pyelonephritis', 'Renal Cell Carcinoma'],
    mbbsExamPoints: [
      'What is the arrangement of structures in the hilum of the kidney from anterior to posterior? (Renal Vein, Renal Artery, Renal Pelvis - V-A-P).',
      'Name the coverings of the kidney from within outward (Fibrous capsule, perirenal fat, renal fascia of Gerota, pararenal fat).',
      'Why is the right kidney positioned lower than the left kidney? (Bulk of the right lobe of the liver).'
    ],
    vivaQuestions: [
      'What are the anterior relations of the right kidney versus left kidney?',
      'Describe the arterial segmentation of the kidney and define an anatomical Brodel line.',
      'Where is the renal angle located and what does tenderness there signify?'
    ],
    ospeNotes: [
      'Identified by bean shape with concave medial hilum.',
      'Renal vein is most anterior, followed by renal artery, with the trumpet-shaped renal pelvis posterior.',
      'Upper pole capped by triangular right suprarenal gland.'
    ],
    clinicalConnections: {
      diseases: ['Renal Colic (Ureteric calculus)', 'Acute Pyelonephritis', 'Renal Cell Carcinoma'],
      symptoms: ['Excruciating loin-to-groin spasmodic pain', 'Hematuria (gross or microscopic)', 'Fever with rigors and dysuria'],
      clinicalExam: ['Renal angle tenderness on gentle fist percussion (Murphy punch sign)', 'Bimanually palpable enlarged kidney'],
      investigations: ['Non-contrast CT KUB (gold standard for stones)', 'Ultrasonography of KUB (hydronephrosis, parenchymal thickness)', 'Urine R/M/E and Culture/Sensitivity', 'Serum Creatinine & eGFR'],
      procedures: ['Extracorporeal Shock Wave Lithotripsy (ESWL)', 'Percutaneous Nephrolithotomy (PCNL)', 'DJ (Double-J) Ureteric Stenting'],
      management: ['Analgesia (NSAIDs like Ketorolac or Diclofenac)', 'IV hydration and alpha-blocker (Tamsulosin) for stone expulsion', 'Empiric antibiotics for pyelonephritis (Ceftriaxone)']
    },
    defaultPosition: [0.45, -0.4, -0.2],
    color: '#ca8a04',
    explodedOffset: [0.8, -0.4, -0.5]
  },

  // ==========================================================================
  // 6. SKELETAL SYSTEM (System: skeletal)
  // ==========================================================================
  {
    id: 'thoracic-rib-cage',
    name: 'Thoracic Cage & Ribs',
    latinName: 'Cavea thoracis',
    commonName: 'Bony Rib Cage & Sternum',
    system: 'skeletal',
    subsystem: 'Axial Skeleton',
    region: 'thorax',
    meshIds: ['mesh_ribcage', 'mesh_sternum', 'mesh_thoracic_vertebrae'],
    category: 'Axial Skeleton',
    location: 'Forms the skeletal framework of the chest between the neck above and abdomen below.',
    structureDescription: 'Composed of 12 thoracic vertebrae posteriorly, 12 pairs of ribs and costal cartilages laterally, and the sternum (manubrium, body, xiphoid) anteriorly. True ribs (1–7), False ribs (8–10), and Floating ribs (11–12).',
    function: 'Protects vital thoracic and upper abdominal organs (heart, lungs, liver, spleen), supports shoulder girdle, and facilitates respiratory mechanics during ventilatory pump excursions.',
    bloodSupply: 'Posterior intercostal arteries (branches of thoracic aorta) and Anterior intercostal arteries (branches of internal thoracic and musculophrenic arteries).',
    venousDrainage: 'Intercostal veins draining into Azygos vein (right), Hemiazygos/Accessory hemiazygos veins (left), and Internal Thoracic veins.',
    innervation: 'Intercostal nerves (anterior rami of T1–T11 spinal thoracic nerves; subcostal nerve T12).',
    nerveSupply: 'Intercostal nerves (T1–T11)',
    lymphaticDrainage: 'Parasternal (internal mammary) and posterior intercostal lymph nodes.',
    relations: {
      anterior: 'Skin, superficial fascia, pectoralis major/minor, rectus abdominis.',
      posterior: 'Erector spinae, trapezius, latissimus dorsi, rhomboids.',
      medial: 'Mediastinum and pericardial cavity.',
      lateral: 'Serratus anterior, latissimus dorsi, subcutaneous tissue.',
      superior: 'Superior thoracic aperture (thoracic inlet).',
      inferior: 'Inferior thoracic aperture (thoracic outlet) closed by the diaphragm.'
    },
    clinicalImportance: 'Sternal angle of Louis (manubriosternal joint at T4/T5 disc) is the primary clinical landmark for rib counting, tracheal bifurcation, and aortic arch demarcation. Intercostal neurovascular bundle runs in the costal groove along the lower border of each rib from superior to inferior as V-A-N (Vein, Artery, Nerve). Needle decompression is performed immediately ABOVE the lower rib to avoid V-A-N injury.',
    clinicalRelevance: 'Costal groove contains V-A-N; needle insertion must hug the upper border of the lower rib.',
    commonConditions: ['Rib Fractures & Flail Chest', 'Costochondritis (Tietze syndrome)', 'Thoracic Outlet Syndrome', 'Sternal Fracture'],
    associatedDiseases: ['Flail Chest', 'Pneumothorax', 'Hemothorax'],
    mbbsExamPoints: [
      'Name 5 anatomical events that occur at the level of the sternal angle of Louis (T4/T5 disc level).',
      'What is the arrangement of the neurovascular bundle in the intercostal space? (From above downward: Intercostal Vein, Artery, Nerve - V-A-N in costal groove).',
      'Where is the safe site for inserting an intercostal chest drainage tube? (Safety triangle: 5th ICS anterior to midaxillary line, bounded by pectoralis major anteriorly and latissimus dorsi posteriorly).'
    ],
    vivaQuestions: [
      'Distinguish typical ribs from atypical ribs (Atypical: 1st, 2nd, 10th, 11th, 12th).',
      'What is "flail chest" and how does it affect respiratory mechanics?',
      'Why is bone marrow aspiration performed from the sternal body?'
    ],
    ospeNotes: [
      'Identified by sternal angle of Louis marking junction of manubrium with sternal body.',
      'Typical ribs have a head with two facets, neck, tubercle with articular facet, and costal groove on internal inferior margin.',
      '1st rib is flat, shortest, most curved, with scalene tubercle on superior surface.'
    ],
    clinicalConnections: {
      diseases: ['Flail Chest', 'Tension Pneumothorax', 'Traumatic Hemothorax'],
      symptoms: ['Severe localized chest wall pain exacerbated by inspiration and coughing', 'Paradoxical breathing in flail chest', 'Shortness of breath'],
      clinicalExam: ['Bony crepitus on gentle rib palpation', 'Hyperresonance on percussion in pneumothorax; stony dullness in hemothorax', 'Subcutaneous emphysema'],
      investigations: ['Chest Radiograph PA and Oblique Views', 'CT Thorax (detects occult pneumothorax, pulmonary contusion)'],
      procedures: ['Needle decompression (2nd ICS midclavicular line or 5th ICS anterior axillary line)', 'Intercostal Tube Thoracostomy', 'Surgical rib plating'],
      management: ['Multimodal analgesia (thoracic epidural or paravertebral block)', 'Positive pressure mechanical ventilation if respiratory failure supervenes']
    },
    defaultPosition: [0, 0.2, 0],
    color: '#e2e8f0',
    explodedOffset: [0, 0.4, 0.4]
  },

  // ==========================================================================
  // 7. MUSCULAR SYSTEM (System: muscular)
  // ==========================================================================
  {
    id: 'diaphragm',
    name: 'Thoracoabdominal Diaphragm',
    latinName: 'Diaphragma',
    commonName: 'Diaphragm (Primary Muscle of Respiration)',
    system: 'muscular',
    subsystem: 'Respiratory Musculature',
    region: 'thorax',
    meshIds: ['mesh_diaphragm', 'central_tendon'],
    category: 'Respiratory Muscles',
    location: 'Domes upward into the thoracic cage, separating thoracic and abdominal cavities.',
    structureDescription: 'Dome-shaped musculofibrous partition with peripheral muscular fibers originating from sternal, costal, and lumbar origins, converging onto a trifoliate aponeurotic Central Tendon.',
    function: 'Principal muscle of inspiration (accounts for ~75% of resting tidal volume). Contraction flattens domes, increasing vertical thoracic diameter and drawing air into lungs.',
    bloodSupply: 'Superior phrenic, Inferior phrenic (from abdominal aorta), Musculophrenic, and Pericardiacophrenic arteries.',
    venousDrainage: 'Inferior phrenic veins (right into IVC, left into left renal vein) and musculophrenic/pericardiacophrenic veins.',
    innervation: 'Phrenic nerves (anterior rami of C3, C4, C5: "C3, 4, 5 keeps the diaphragm alive") providing 100% of motor supply and sensory to central part. Lower 6 intercostal nerves provide sensory supply to peripheral margins.',
    nerveSupply: 'Phrenic nerve (C3, C4, C5)',
    lymphaticDrainage: 'Phrenic, parasternal, and posterior mediastinal lymph nodes.',
    relations: {
      anterior: 'Xiphoid process and costal cartilages.',
      posterior: 'Lumbar vertebrae (L1–L3 by right crus, L1–L2 by left crus), aorta, esophagus.',
      medial: 'Central tendon under heart and fibrous pericardium.',
      lateral: 'Lower 6 ribs and costal margins.',
      superior: 'Bases of both lungs, costodiaphragmatic recesses, fibrous pericardium fused with central tendon.',
      inferior: 'Liver, stomach, spleen, kidneys, and suprarenal glands.'
    },
    clinicalImportance: 'Major diaphragmatic openings (must-know mnemonic): Vena Caval opening at T8 (in central tendon; widens with inspiration); Esophageal hiatus at T10 (in right crus with vagal trunks); Aortic hiatus at T12 (behind median arcuate ligament with thoracic duct and azygos vein). Diaphragmatic hernias occur through esophageal hiatus (sliding/rolling) or congenital defects (Bochdalek/Morgagni).',
    clinicalRelevance: 'Major openings: T8 (IVC), T10 (Esophagus), T12 (Aorta); motor innervation exclusively by phrenic nerve.',
    commonConditions: ['Hiatus Hernia (Sliding vs Paraesophageal)', 'Congenital Diaphragmatic Hernia (Bochdalek)', 'Phrenic Nerve Palsy (Hemidiaphragmatic eventration)', 'Singultus (Hiccups)'],
    associatedDiseases: ['Hiatal Hernia', 'Diaphragmatic Rupture', 'Phrenic Nerve Injury'],
    mbbsExamPoints: [
      'Name the three major openings of the diaphragm and state their vertebral levels and transmitted structures (T8 IVC, T10 Esophagus/vagus, T12 Aorta/thoracic duct).',
      'What is the nerve supply of the diaphragm and what is the clinical significance of its embryonic origin from C3-C5? (Referred diaphragmatic pain to tip of shoulder via supraclavicular nerves C3, C4).',
      'Describe the developmental components of the diaphragm (Septum transversum, pleuroperitoneal membranes, dorsal mesentery of esophagus, muscular ingrowth from body wall).'
    ],
    vivaQuestions: [
      'Why does inflammation of the diaphragmatic pleura cause pain referred to the tip of the shoulder?',
      'Which diaphragmatic crus forms the sling around the esophageal hiatus and prevents acid reflux?',
      'How does diaphragmatic movement affect inferior vena caval venous return during inspiration?'
    ],
    ospeNotes: [
      'Trifoliate central tendon with glistening aponeurotic fibers.',
      'Vena caval foramen pierces the central tendon at T8 level.',
      'Right crus is larger and splits to surround the esophageal hiatus at T10.'
    ],
    clinicalConnections: {
      diseases: ['Gastroesophageal Reflux Disease (GERD) with Hiatus Hernia', 'Traumatic Diaphragmatic Rupture', 'Congenital Diaphragmatic Hernia'],
      symptoms: ['Heartburn and acid regurgitation worse on lying flat', 'Dyspnea and bowel sounds in chest in traumatic rupture', 'Epigastric postprandial fullness'],
      clinicalExam: ['Paradoxical abdominal motion in bilateral phrenic palsy', 'Bowel sounds auscultated over left hemithorax in rupture'],
      investigations: ['Barium Swallow fluoroscopy', 'High-resolution CT Thorax and Abdomen', 'Chest Radiograph (elevated hemidiaphragm or gas bubble in thorax)'],
      procedures: ['Laparoscopic Nissen Fundoplication for hiatus hernia', 'Surgical repair of diaphragmatic rupture with mesh'],
      management: ['Proton Pump Inhibitors (Esomeprazole 40 mg daily)', 'Elevation of head of bed', 'Emergency surgical reduction and closure for acute herniation']
    },
    defaultPosition: [0, -0.05, -0.05],
    color: '#f43f5e',
    explodedOffset: [0, -0.3, 0]
  },

  // ==========================================================================
  // 8. LYMPHATIC SYSTEM (System: lymphatic)
  // ==========================================================================
  {
    id: 'spleen',
    name: 'Spleen',
    latinName: 'Lien',
    commonName: 'Spleen ("The Erythrocyte Graveyard")',
    system: 'lymphatic',
    subsystem: 'Secondary Lymphoid Organs',
    region: 'abdomen',
    meshIds: ['mesh_spleen', 'splenic_artery', 'splenic_vein'],
    category: 'Lymphoid Organs',
    location: 'Lies in the left hypochondrium, wedged between the gastric fundus and the diaphragm, underneath ribs 9, 10, and 11.',
    structureDescription: 'Soft, vascular, purplish organ 1x3x5 inches (weight ~7 oz, relates to ribs 9–11: Harris 1-3-5-7-9-11 rule). Has an anterior notched border. Contains white pulp (lymphoid follicles with central arterioles) and red pulp (splenic cords of Billroth and sinusoids).',
    function: 'Filtration of blood, culling and pitting of senescent erythrocytes, immune surveillance against encapsulated bacteria (Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae), and reservoir for platelets.',
    bloodSupply: 'Splenic Artery (largest, highly tortuous branch of the Celiac Trunk). Divides into 5–6 segmental branches at the splenic hilum.',
    venousDrainage: 'Splenic Vein (courses straight behind pancreas to unite with Superior Mesenteric Vein behind neck of pancreas to form the Portal Vein).',
    innervation: 'Celiac autonomic plexus (sympathetic vasoconstrictor fibers).',
    nerveSupply: 'Celiac autonomic plexus',
    lymphaticDrainage: 'Pancreaticosplenic lymph nodes draining to celiac nodes.',
    relations: {
      anterior: 'Stomach fundus and body across the gastrosplenic ligament containing short gastric and left gastroepiploic vessels.',
      posterior: 'Left dome of diaphragm separating it from left pleura, lung, and 9th, 10th, and 11th ribs.',
      medial: 'Left kidney across splenorenal (lienorenal) ligament containing splenic vessels and tail of pancreas.',
      lateral: 'Phrenicocolic ligament ("sustentaculum lienis") and left colic (splenic) flexure.',
      superior: 'Conforms to diaphragmatic concavity.',
      inferior: 'Rests on the splenic flexure of the colon.'
    },
    clinicalImportance: 'Fracture of the left 9th, 10th, or 11th ribs can rupture the spleen causing life-threatening intraperitoneal hemoperitoneum. Kehr sign: left shoulder tip pain due to phrenic nerve irritation by hemoperitoneum. Post-splenectomy patients are vulnerable to Overwhelming Post-Splenectomy Infection (OPSI).',
    clinicalRelevance: 'Harris rule 1-3-5-7-9-11; rupture produces Kehr sign; tail of pancreas reaches hilum.',
    commonConditions: ['Traumatic Splenic Rupture', 'Splenomegaly in Malaria/Kala-Azar/Thalassemia', 'Hypersplenism', 'Splenic Infarction'],
    associatedDiseases: ['Splenic Rupture', 'Splenomegaly', 'Hemoperitoneum', 'OPSI'],
    mbbsExamPoints: [
      'State Harris’ rule of odd numbers for the spleen (1x3x5 inches, 7 ounces weight, relates to ribs 9 to 11).',
      'What are the contents of the gastrosplenic and splenorenal ligaments? (Gastrosplenic: Short gastric & left gastroepiploic vessels; Splenorenal: Splenic vessels & tail of pancreas).',
      'Why is the spleen notched on its superior/anterior border? (Remnant of fetal lobulation; allows clinical palpation distinguishing spleen from left kidney).'
    ],
    vivaQuestions: [
      'How do you clinically distinguish an enlarged spleen from an enlarged left kidney on palpation?',
      'Why are splenectomized patients given vaccinations against encapsulated bacteria?',
      'What is Kehr sign and what is its neurological mechanism?'
    ],
    ospeNotes: [
      'Identified by prominent notched anterior/superior border.',
      'Visceral surface shows gastric, renal, and colic impressions.',
      'Hilum transmits the tortuous splenic artery and straight splenic vein.'
    ],
    clinicalConnections: {
      diseases: ['Splenic Trauma / Subcapsular Hematoma', 'Tropical Splenomegaly Syndrome (Malaria / Visceral Leishmaniasis)', 'Beta-Thalassemia Major'],
      symptoms: ['Left upper quadrant abdominal pain and fullness', 'Left shoulder tip pain (Kehr sign)', 'Dizziness and fainting from internal bleeding'],
      clinicalExam: ['Palpable spleen edge with notches emerging under left costal margin (must enlarge 2-3x normal before palpable)', 'Dullness in Traube space'],
      investigations: ['FAST Ultrasound in trauma (free fluid in splenorenal recess)', 'Contrast-Enhanced CT Abdomen (grading splenic lacerations I–V)', 'Complete Blood Count (pancytopenia in hypersplenism)'],
      procedures: ['Splenectomy (open or laparoscopic)', 'Splenic artery embolization for conservative trauma management'],
      management: ['Hemodynamically unstable trauma: immediate emergency laparotomy', 'Post-splenectomy immunization: Pneumococcal, Meningococcal, and Hib vaccines', 'Life-long prophylactic oral Penicillin V in children']
    },
    defaultPosition: [-0.55, -0.25, -0.15],
    color: '#a855f7',
    explodedOffset: [-0.8, -0.3, -0.4]
  },

  // ==========================================================================
  // 9. SKIN / INTEGUMENTARY SYSTEM (System: skin)
  // ==========================================================================
  {
    id: 'skin-integument',
    name: 'Skin & Integumentary Layers',
    latinName: 'Integumentum commune',
    commonName: 'Human Skin & Dermal Architecture',
    system: 'skin',
    subsystem: 'Cutaneous Organ',
    region: 'whole-body',
    meshIds: ['mesh_skin_surface', 'dermal_strata'],
    category: 'Integument',
    location: 'Envelopes the entire external surface of the human body (surface area 1.5–2.0 m²).',
    structureDescription: 'Consists of the stratified squamous keratinized Epidermis (strata: basale, spinosum, granulosum, lucidum, corneum), dense irregular fibrous Dermis (papillary and reticular dermis with skin appendages), and Subcutis / Hypodermis.',
    function: 'Physical, microbiological, and chemical barrier; thermoregulation via sweat glands and arteriovenous anastomoses; tactile and nociceptive sensation; vitamin D3 synthesis.',
    bloodSupply: 'Cutaneous plexuses (subpapillary plexus and dermal-hypodermal plexus) fed by perforating musculocutaneous and fasciocutaneous arteries.',
    venousDrainage: 'Dermal venous plexuses draining to superficial subcutaneous veins (e.g. Cephalic, Basilic, Great and Small Saphenous veins).',
    innervation: 'Somatic sensory afferents via cutaneous nerves (Meissner corpuscles, Pacinian corpuscles, Merkel disks, free nerve endings) and sympathetic postganglionic sudomotor/vasomotor/pilomotor fibers.',
    nerveSupply: 'Cutaneous sensory nerves (dermatomal distribution) and sympathetic autonomics',
    lymphaticDrainage: 'Extensive dermal lymphatic capillaries draining into regional lymph node basins (Cervical, Axillary, Inguinal).',
    relations: {
      anterior: 'External environment.',
      posterior: 'Superficial fascia, deep investing fascia, muscles, and bones.',
      medial: 'Body surfaces.',
      lateral: 'Body contours.',
      superior: 'Scalp and crown.',
      inferior: 'Plantar and digital surfaces.'
    },
    clinicalImportance: 'Dermatomal mapping (Head: CN V; Nipple: T4; Xiphoid: T7; Umbilicus: T10; Inguinal fold: L1) is vital for spinal cord injury localization. Langer lines (cleavage lines) dictate surgical skin incision orientation for minimal scarring.',
    clinicalRelevance: 'Dermatomes T4 (nipple) and T10 (umbilicus); surgical incisions follow Langer lines.',
    commonConditions: ['Burns (Wallace Rule of Nines)', 'Malignant Melanoma', 'Basal Cell Carcinoma', 'Cellulitis', 'Psoriasis'],
    associatedDiseases: ['Burns', 'Melanoma', 'Cellulitis', 'Pressure Ulcers'],
    mbbsExamPoints: [
      'Describe the Wallace Rule of Nines for estimating total body surface area (TBSA) in thermal burns.',
      'State the landmark dermatomes: T4 (nipple level), T10 (umbilicus), L1 (inguinal ligament), S1 (lateral aspect of foot).',
      'What are Langer’s cleavage lines and why are elective surgical incisions placed along them?'
    ],
    vivaQuestions: [
      'Name the cellular layers of thick skin versus thin skin.',
      'What cells reside in the epidermis other than keratinocytes? (Melanocytes, Langerhans cells, Merkel cells).',
      'How does the skin regulate body temperature in fever versus hypothermia?'
    ],
    ospeNotes: [
      'Epidermis shows keratinized stratified squamous epithelium.',
      'Dermal papillae interdigitate with epidermal rete pegs.',
      'Pilosebaceous units and eccrine sweat glands visible in reticular dermis.'
    ],
    clinicalConnections: {
      diseases: ['Second and Third Degree Thermal Burns', 'Necrotizing Fasciitis', 'Malignant Melanoma'],
      symptoms: ['Erythema, blistering, desquamation', 'Severe local pain or anesthesia in full-thickness burn', 'Purulent discharge'],
      clinicalExam: ['ABCDE criteria for melanoma (Asymmetry, Border irregularity, Color variegation, Diameter > 6 mm, Evolution)', 'Dermatomal sensory testing with cotton wisp and pinprick'],
      investigations: ['Skin punch / excisional biopsy with histopathology', 'Wound swab microscopy and culture'],
      procedures: ['Split-Thickness Skin Graft (STSG)', 'Full-Thickness Skin Graft (FTSG)', 'Escharotomy for circumferential burns'],
      management: ['Parkland formula for burn fluid resuscitation: 4 mL x kg x % TBSA in first 24 hours', 'Topical silver sulfadiazine / antiseptic dressing']
    },
    defaultPosition: [0, 0, 0.45],
    color: '#fed7aa',
    explodedOffset: [0, 0, 0.9]
  },

  // ==========================================================================
  // 10. REPRODUCTIVE SYSTEM (System: reproductive)
  // ==========================================================================
  {
    id: 'uterus-pelvis',
    name: 'Uterus & Pelvic Viscera',
    latinName: 'Uterus',
    commonName: 'Uterus (Womb) & Fallopian Tubes',
    system: 'reproductive',
    subsystem: 'Female Pelvic Viscera',
    region: 'pelvis-perineum',
    meshIds: ['mesh_uterus', 'fallopian_tubes', 'ovaries'],
    category: 'Reproductive Viscera',
    location: 'Lies in the true pelvic cavity between the urinary bladder anteriorly and the rectum posteriorly.',
    structureDescription: 'Hollow, thick-walled, pear-shaped muscular organ 7.5 cm long, 5 cm wide, 2.5 cm thick. Normal anatomical position is Anteverted (90° angle of anteversion between vagina and cervix) and Anteflexed (170° angle of anteflexion between cervix and body). Composed of perimetrium, myometrium (smooth muscle), and endometrium.',
    function: 'Receives fertilized blastocyst, provides gestational nutritional environment, and expels fetus during labor via oxytocin-induced myometrial contractions.',
    bloodSupply: 'Uterine Arteries (branches of Anterior division of Internal Iliac Artery) and Ovarian Arteries (from Abdominal Aorta at L2).',
    venousDrainage: 'Uterine venous plexus draining into Internal Iliac Veins.',
    innervation: 'Uterovaginal autonomic plexus (Frankenhäuser plexus) derived from inferior hypogastric plexus (sympathetic T12–L1, parasympathetic S2–S4 via pelvic splanchnic nerves).',
    nerveSupply: 'Uterovaginal plexus (sympathetic T12–L1, parasympathetic S2–S4)',
    lymphaticDrainage: 'Body drains to external and internal iliac nodes; fundus to para-aortic nodes; round ligament region to superficial inguinal nodes.',
    relations: {
      anterior: 'Uterovesical pouch and posterosuperior surface of urinary bladder.',
      posterior: 'Rectouterine pouch of Douglas and anterior surface of rectum.',
      medial: 'Midline position in pelvic cavity.',
      lateral: 'Broad ligament, uterine artery crossing superior to ureter ("water under the bridge"), and pelvic sidewall.',
      superior: 'Fallopian tubes, round ligaments, and coils of ileum/sigmoid colon resting on fundus.',
      inferior: 'Internal os leading through cervix into vaginal fornices.'
    },
    clinicalImportance: 'The Uterine Artery crosses immediately SUPERIOR to the Ureter 1.5–2 cm lateral to the supravaginal cervix (surgical axiom: "water flows under the bridge"). Inadvertent ureteric ligation is the classic catastrophic hazard of hysterectomy. Rectouterine Pouch of Douglas is the lowest peritoneal cavity in women; accessed via posterior colpotomy.',
    clinicalRelevance: 'Uterine artery crosses superior to ureter ("water under the bridge"); Douglas pouch accessed via posterior fornix.',
    commonConditions: ['Uterine Leiomyoma (Fibroids)', 'Endometrial Carcinoma', 'Ectopic Pregnancy (Tubal rupture)', 'Pelvic Inflammatory Disease (PID)'],
    associatedDiseases: ['Uterine Fibroids', 'Cervical Carcinoma', 'Ectopic Pregnancy', 'Endometriosis'],
    mbbsExamPoints: [
      'Define anteversion and anteflexion of the uterus and state their normal angles (Anteversion 90°, Anteflexion 170°).',
      'Describe the surgical relationship between the uterine artery and ureter ("Water under the bridge").',
      'Name the primary and secondary supports of the uterus (Primary: Pelvic diaphragm/Levator ani, Perineal body, Uterosacral, Cardinal/Mackenrodt, and Pubocervical ligaments).'
    ],
    vivaQuestions: [
      'What are the boundaries and clinical importance of the Pouch of Douglas?',
      'Which ligament carries the ovarian neurovascular bundle? (Infundibulopelvic / Suspensory ligament of the ovary).',
      'Why is carcinoma of the cervix staged clinically while endometrial carcinoma is staged surgically?'
    ],
    ospeNotes: [
      'Pear-shaped organ with thick myometrium and slit-like endometrial cavity.',
      'Uterine artery runs tortuously along the lateral border within the broad ligament.',
      'Cervix projects into the upper vagina forming anterior, posterior, and two lateral fornices.'
    ],
    clinicalConnections: {
      diseases: ['Uterine Fibroids (Leiomyomata)', 'Ruptured Tubal Ectopic Pregnancy', 'Endometriosis', 'Cervical Dysplasia / Carcinoma'],
      symptoms: ['Menorrhagia (heavy menstrual bleeding) and dysmenorrhea', 'Acute severe lower abdominal pain with syncope in ectopic rupture', 'Pelvic pressure / mass feeling'],
      clinicalExam: ['Bimanual pelvic examination (palpable enlarged, irregular, firm uterus)', 'Cervical motion tenderness (chandelier sign in PID or ectopic pregnancy)'],
      investigations: ['Transvaginal Ultrasonography (TVS)', 'Serum beta-hCG titer (quantitative)', 'Pipelle Endometrial Biopsy', 'Pelvic MRI'],
      procedures: ['Total Abdominal / Vaginal / Laparoscopic Hysterectomy', 'Myomectomy', 'Diagnostic Laparoscopy and dye hydrotubation'],
      management: ['Medical: Tranexamic acid, Oral Contraceptive Pills, GnRH agonists', 'Surgical: Myomectomy or Hysterectomy depending on fertility desires']
    },
    defaultPosition: [0, -0.65, -0.05],
    color: '#ec4899',
    explodedOffset: [0, -0.7, -0.4]
  }
];
