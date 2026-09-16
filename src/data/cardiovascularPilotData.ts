import { BmdcLesson, QuestionBankItem, ClinicalCase, OspeStation, OsceStation } from '../types';

export const CARDIOVASCULAR_PILOT_LESSONS: BmdcLesson[] = [
  // 1. Phase 1: Anatomy
  {
    id: 'cvs-anat-heart-morphology',
    title: 'Heart: External & Internal Features and Coronary Circulation',
    titleBn: 'হৃদপিণ্ডের গঠন, অভ্যন্তরীণ প্রকোষ্ঠ ও করোনারি রক্ত সংবহন',
    phase: 'Phase 1',
    subjectId: 'anatomy',
    subjectName: 'Anatomy & Embryology',
    chapterId: 'cvs-anatomy',
    system: 'cardiovascular',
    learningObjectives: [
      'Describe the borders, surfaces, and apex of the human heart.',
      'Explain the internal anatomy of right atrium (crista terminalis, fossa ovalis, musculi pectinati) and right ventricle (trabeculae carneae, moderator band).',
      'Detail the origin, anatomical course, major branches, and territory of the Right and Left Coronary Arteries.',
      'Identify the coronary sinus and tributary cardiac veins.',
      'Correlate coronary artery branches with corresponding myocardial infarction patterns in 12-lead ECG.'
    ],
    prerequisites: ['Thorax wall anatomy', 'Mediastinum boundaries'],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.2.0',
    author: {
      name: 'Dr. Nahid Sultana',
      designation: 'Associate Professor of Anatomy',
      institution: 'Dhaka Medical College'
    },
    reviewer: {
      name: 'Prof. Dr. M. A. Jalil',
      designation: 'Head of Anatomy',
      institution: 'Sir Salimullah Medical College',
      reviewDate: '2026-08-20'
    },
    stages: {
      learn: {
        overviewEn: 'The heart is a conical muscular pump situated in the middle mediastinum, encased within the fibro-serous pericardial sac. It consists of four chambers (right/left atria and ventricles) configured to pump deoxygenated blood to the lungs and oxygenated blood to the systemic circulation.',
        overviewBn: 'হৃদপিণ্ড হলো মধ্য মিডিয়াস্টিনামে অবস্থিত একটি ত্রিকোণাকার পেশীবহুল অঙ্গ, যা ফাইব্রো-সেরাস পেরিকার্ডিয়ামে আবৃত। এতে চারটি প্রকোষ্ঠ রয়েছে যা সারা শরীরে এবং ফুসফুসে অবিরাম রক্ত সঞ্চালন নিশ্চিত করে।',
        detailedContentEn: `### 1. External Surfaces & Borders
- **Apex**: Formed entirely by the left ventricle; points downwards, forwards, and to the left. Clinically palpated in the left 5th intercostal space, 9 cm from the midsternal line (midclavicular line).
- **Base (Posterior Surface)**: Formed predominantly by the left atrium (two-thirds) and partly by the right atrium. Lies opposite T5 to T8 thoracic vertebrae.
- **Anterior (Sternocostal) Surface**: Formed mainly by the right ventricle (two-thirds) and partly by the right atrium and left ventricle.
- **Diaphragmatic (Inferior) Surface**: Formed by the left ventricle (two-thirds) and right ventricle (one-third), resting on the central tendon of the diaphragm.

### 2. Internal Features of Atria & Ventricles
- **Right Atrium**: Receives SVC, IVC, and Coronary Sinus. Divided into anterior rough trabeculated part (*musculi pectinati*) and posterior smooth part (*sinus venarum*) by the internal **crista terminalis** (sulcus terminalis externally). The interatrial septum bears the **fossa ovalis** (remnant of foramen ovale) with its **limbus fossa ovalis**.
- **Right Ventricle**: Inflow tract has rough muscular ridges (*trabeculae carneae*), three papillary muscles attached via *chordae tendineae* to tricuspid leaflets, and the **septomarginal trabecula (Moderator Band)** which conveys the right bundle branch of the conduction system. Outflow tract (*infundibulum / conus arteriosus*) is smooth-walled leading to pulmonary orifice.
- **Left Ventricle**: Walls are 3 times thicker than right ventricle to overcome systemic vascular resistance. Contains two robust papillary muscles (anterolateral and posteromedial) attached to the bicuspid (mitral) valve.

### 3. Coronary Arterial Supply
- **Right Coronary Artery (RCA)**: Arises from anterior aortic sinus. Travels in the anterior atrioventricular groove, winds around inferior border to posterior groove. Gives off:
  1. *SA Nodal Artery* (60% cases).
  2. *Right Marginal Artery* (supplies inferior border).
  3. *AV Nodal Artery* (90% cases).
  4. *Posterior Interventricular (Posterior Descending - PDA)* in right-dominant hearts (85-90%).
- **Left Coronary Artery (LCA)**: Arises from left posterior aortic sinus. Divides into:
  1. *Left Anterior Descending (LAD)*: The "artery of sudden death", supplies anterior 2/3 of interventricular septum, anterior LV/RV wall, and apex.
  2. *Left Circumflex (LCx)*: Runs in coronary sulcus to posterior aspect, supplies lateral wall of left ventricle.`,
        detailedContentBn: `### ১. বাহ্যিক গঠন ও সীমানা
- **এপেক্স (Apex)**: সম্পূর্ণভাবে বাম নিলয় (LV) দ্বারা গঠিত; বামদিকের ৫ম ইন্টারকোস্টাল স্পেসে মিড-ক্ল্যাভিকুলার লাইনে অবস্থিত।
- **বেস (Base)**: প্রধানত বাম অলিন্দ (LA) দ্বারা গঠিত।
- **স্টার্নোকোস্টাল পৃষ্ঠ**: প্রধানত ডান নিলয় (RV) দ্বারা গঠিত।

### ২. করোনারি ধমনী সংবহন
- **ডান করোনারি ধমনী (RCA)**: এসএ নোড (৬০%) এবং এভি নোড (৯০%) সাপ্লাই দেয়। এটি ইনফিরিয়র মায়োকার্ডিয়াল ইনফার্কশনে সংশ্লিষ্ট।
- **বাম অ্যান্টেরিয়র ডিসেন্ডিং (LAD)**: ইন্টারভেন্ট্রিকুলার সেপ্টামের অ্যান্টেরিয়র দুই-তৃতীয়াংশ ও এপেক্স সাপ্লাই দেয়। এটি বন্ধ হলে অ্যান্টেরিয়র ওয়াল এমআই হয়।`,
        keyTakeaways: [
          'Apex beat is at 5th intercostal space, midclavicular line (left).',
          'LAD supplies anterior 2/3 of septum and apex; RCA supplies SA node (60%), AV node (90%), and inferior wall.',
          'Moderator band in RV carries the right bundle branch to the anterior papillary muscle.'
        ]
      },
      explore: {
        visualType: '3d-model',
        visualTargetId: 'heart',
        description: 'Interactive 3D reconstruction of human heart based on Z-Anatomy standard. Rotate, inspect chambers, and toggle internal structures.',
        interactiveCheckpoints: [
          { name: 'Apex of Left Ventricle', nameBn: 'বাম নিলয়ের শীর্ষবিন্দু', note: 'Left 5th intercostal space, apex beat location.', coords: { x: 45, y: 75 } },
          { name: 'Left Anterior Descending Artery', nameBn: 'বাম অ্যান্টেরিয়র ডিসেন্ডিং আর্টারি', note: 'Runs in anterior interventricular sulcus.', coords: { x: 50, y: 55 } },
          { name: 'Right Atrium & Auricle', nameBn: 'ডান অলিন্দ ও অরিকেল', note: 'Receives SVC/IVC, contains SA node near SVC entry.', coords: { x: 30, y: 40 } },
          { name: 'Ascending Aorta', nameBn: 'অ্যাসেন্ডিং অ্যাওর্টা', note: 'Gives origin to right and left coronary arteries from aortic sinuses.', coords: { x: 50, y: 25 } }
        ]
      },
      apply: {
        clinicalCorrelations: [
          '**Acute Anterior STEMI**: Occlusion of LAD leads to ST-elevation in precordial leads V1–V4, carries high risk of cardiogenic shock and complete heart block (due to septal ischemia).',
          '**Acute Inferior STEMI**: Occlusion of RCA leads to ST-elevation in leads II, III, aVF. Frequently accompanied by sinus bradycardia, AV block, and right ventricular infarction (check V4R).',
          '**Mitral Valve Prolapse**: Redundant chordae tendineae or myxomatous degeneration of valve leaflets can cause mid-systolic click and late systolic murmur.'
        ],
        linkedInvestigations: [
          { type: '12-Lead ECG', finding: 'ST elevation in leads II, III, aVF', significance: 'Indicates acute transmural ischemia in RCA territory (Inferior MI).' },
          { type: 'Coronary Angiography', finding: '95% stenosis in proximal LAD', significance: 'Culprit lesion requiring emergency Primary PCI with drug-eluting stent.' }
        ],
        emergencyRedFlags: [
          'Crushing substernal chest pain radiating to left arm/jaw.',
          'Diaphoresis, hypotension (<90/60 mmHg), cold clammy extremities.',
          'New holosystolic murmur post-MI (suspect acute ventricular septal rupture or papillary muscle rupture).'
        ]
      },
      practice: {
        mcqIds: ['cvs-q1', 'cvs-q2', 'cvs-q3', 'cvs-q4'],
        vivaPrompts: [
          {
            prompt: 'Where is the apex beat located, and what anatomical structure forms it?',
            keyPointsToMention: ['Left 5th intercostal space, 9 cm from midline / midclavicular line', 'Formed entirely by left ventricle', 'Shifted in cardiomegaly or tension pneumothorax'],
            reference: 'Datta Essentials of Human Anatomy (Thorax), 9th ed.'
          },
          {
            prompt: 'What are the branches of the Left Coronary Artery and their territories?',
            keyPointsToMention: ['LAD (Anterior IV artery) and Left Circumflex (LCx)', 'LAD supplies anterior 2/3 septum, anterior wall, apex', 'LCx supplies lateral and posterior left ventricular wall'],
            reference: 'Gray\'s Anatomy for Students, 4th ed.'
          }
        ]
      },
      revise: {
        highYieldPearls: [
          'SA node is located in the right atrium at the superior end of crista terminalis near the SVC opening.',
          'AV node is in Koch’s triangle (bounded by coronary sinus orifice, tendon of Todaro, and septal tricuspid leaflet).',
          'Coronary artery dominance is determined by which artery gives rise to the Posterior Descending Artery (PDA): RCA (85%), LCA (10%), Codominant (5%).'
        ],
        flashcards: [
          { front: 'What forms the apex of the human heart?', back: 'Entirely the left ventricle (in the 5th left intercostal space).' },
          { front: 'Which coronary artery is termed the "artery of sudden death"?', back: 'Left Anterior Descending (LAD) artery.' },
          { front: 'What structure conducts the right bundle branch across the right ventricle?', back: 'The Moderator Band (Septomarginal trabecula).' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 1 Anatomy Syllabus',
      'Gray\'s Anatomy for Students, 4th Edition, Chapter 3 (Thorax)',
      'Datta AK. Essentials of Human Anatomy: Thorax and Abdomen, 9th Edition'
    ],
    lastUpdated: '2026-09-10'
  },

  // 2. Phase 1: Physiology
  {
    id: 'cvs-physio-cardiac-cycle-wiggers',
    title: 'Cardiac Cycle, Wiggers Diagram & Pressure-Volume Loops',
    titleBn: 'কার্ডিয়াক চক্র, উইগার্স ডায়াগ্রাম এবং প্রেশার-ভলিউম লুপ',
    phase: 'Phase 1',
    subjectId: 'physiology',
    subjectName: 'Physiology & Biophysics',
    chapterId: 'cvs-physio',
    system: 'cardiovascular',
    learningObjectives: [
      'Define the phases of the cardiac cycle and their chronological durations at resting heart rate (75 bpm).',
      'Correlate mechanical events (pressure, volume) with electrical events (ECG) and acoustic events (heart sounds) on the Wiggers Diagram.',
      'Analyze the Left Ventricular Pressure-Volume Loop and quantify End-Diastolic Volume (EDV), End-Systolic Volume (ESV), Stroke Volume (SV), and Ejection Fraction (EF).',
      'Explain the effects of preload, afterload, and inotropy shifts on PV loops.',
      'Understand jugular venous pulse (JVP) waveforms: a, c, v waves and x, y descents.'
    ],
    estimatedMinutes: 30,
    status: 'published',
    version: '1.3.0',
    author: {
      name: 'Prof. Dr. Tariqul Islam',
      designation: 'Professor of Physiology',
      institution: 'Dhaka Medical College'
    },
    reviewer: {
      name: 'Prof. Dr. Shamim Ara',
      designation: 'Ex-Dean, Faculty of Medicine',
      institution: 'Bangabandhu Sheikh Mujib Medical University',
      reviewDate: '2026-08-25'
    },
    stages: {
      learn: {
        overviewEn: 'The cardiac cycle encompasses all mechanical and electrical events occurring from the beginning of one heartbeat to the beginning of the next. At a normal resting heart rate of 75 bpm, the total cardiac cycle lasts 0.8 seconds (Systole: 0.27s, Diastole: 0.53s).',
        overviewBn: 'একটি হৃদস্পন্দনের শুরু থেকে পরবর্তী হৃদস্পন্দনের শুরু পর্যন্ত সকল যান্ত্রিক ও বৈদ্যুতিক ঘটনাকে কার্ডিয়াক চক্র বলে। স্বাভাবিক হৃদস্পন্দন (৭৫ bpm) এ মোট সময়কাল ০.৮ সেকেন্ড (সিস্টোল: ০.২৭ সেকেন্ড, ডায়াস্টোল: ০.৫৩ সেকেন্ড)।',
        detailedContentEn: `### 1. The 7 Distinct Phases of the Cardiac Cycle
1. **Atrial Systole (0.1s)**: Corresponds to P wave on ECG. Adds final 15-20% filling (*atrial kick*) to ventricle. Generates **a wave** on JVP. S4 heart sound (pathological in non-compliant LV).
2. **Isovolumetric Contraction (0.05s)**: Follows QRS complex. Ventricular pressure rises above atrial pressure -> **Mitral and Tricuspid valves snap shut (First Heart Sound - S1)**. All 4 valves closed. Rapid dP/dt without volume change.
3. **Rapid Ventricular Ejection (0.13s)**: Ventricular pressure exceeds aortic/pulmonary pressure (80 mmHg / 10 mmHg) -> Semilunar valves open. Ventricular volume decreases rapidly.
4. **Reduced Ventricular Ejection (0.09s)**: Repolarization begins (T wave on ECG). Outflow decelerates.
5. **Isovolumetric Relaxation (0.08s)**: Ventricles relax, ventricular pressure falls below aortic/pulmonary -> **Aortic and Pulmonary valves close (Second Heart Sound - S2)**. Dicrotic notch (*incisura*) on aortic pressure trace. Generates **v wave** on JVP.
6. **Rapid Ventricular Filling (0.11s)**: Ventricular pressure drops below atrial pressure -> AV valves open. Rapid influx (70% of ventricular filling). Generates **S3 heart sound** (normal in children/athletes, pathological in heart failure/volume overload).
7. **Reduced Ventricular Filling / Diastasis (0.22s)**: Slow passive filling. Most sensitive phase to tachycardia.

### 2. Hemodynamic Formulas & PV Loop Mechanics
- **Stroke Volume (SV)** = $EDV - ESV$ (Normal: $120 \\text{ mL} - 50 \\text{ mL} = 70 \\text{ mL}$)
- **Ejection Fraction (EF)** = $(SV / EDV) \\times 100\\%$ (Normal: $55\\% - 70\\%$)
- **Cardiac Output (CO)** = $SV \\times HR$ (Normal: $70 \\text{ mL} \\times 75 = 5.25 \\text{ L/min}$)
- **Effects of Alterations on PV Loop**:
  - *Increased Preload*: Shifts rightward along end-diastolic pressure-volume relationship (EDPVR), increases SV without changing ESV.
  - *Increased Afterload*: Increases peak systolic pressure, shifts ESV rightward, decreases SV.
  - *Increased Inotropy (Contractility)*: Shifts end-systolic pressure-volume relationship (ESPVR) to the left and upward, decreases ESV, increases SV and EF.`,
        detailedContentBn: `### কার্ডিয়াক চক্রের গুরুত্বপূর্ণ পর্যায়সমূহ
- **আইসোভলিউম্যাট্রিক সংকোচন**: এস১ (S1) শব্দ উৎপন্ন হয় (মিত্রাল ও ট্রাইকাসপিড কপাটিকা বন্ধ)।
- **আইসোভলিউম্যাট্রিক প্রসারণ**: এস২ (S2) শব্দ উৎপন্ন হয় (অ্যাওর্টিক ও পালমোনারি কপাটিকা বন্ধ)।
- **উইগার্স ডায়াগ্রামে ইসিজি ও প্রেসার সম্পর্ক**: কিউআরএস (QRS) এর পর সিস্টোল শুরু হয়, টি (T) ওয়েভ এর পর ডায়াস্টোল শুরু হয়।`,
        keyTakeaways: [
          'S1 is produced by closure of AV valves (Mitral & Tricuspid) during isovolumetric contraction.',
          'S2 is produced by closure of Semilunar valves (Aortic & Pulmonary) during isovolumetric relaxation.',
          'Coronary blood flow to the left ventricle occurs predominantly during diastole because intramyocardial compression during systole restricts flow.'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        visualTargetId: 'cardiac-cycle-lab',
        description: 'Interactive Wiggers synchronized simulator with dynamic PV loop and chest auscultation points.',
        interactiveCheckpoints: [
          { name: 'Isovolumetric Contraction Point', note: 'Mitral valve closes, S1 heard, pressure surges from 8 to 120 mmHg.' },
          { name: 'Aortic Valve Opening', note: 'Left ventricular pressure surpasses 80 mmHg diastolic aortic pressure.' },
          { name: 'Isovolumetric Relaxation Point', note: 'Aortic valve closure forms dicrotic notch, S2 heard.' },
          { name: 'Rapid Inflow Phase', note: 'Mitral valve opens when LV pressure drops below LA pressure.' }
        ]
      },
      apply: {
        clinicalCorrelations: [
          '**Aortic Stenosis**: Causes massive elevation in peak systolic left ventricular pressure (>200 mmHg), prolongs ejection time, shifts PV loop taller and narrower, and generates harsh crescendo-decrescendo systolic murmur radiating to carotids.',
          '**Systolic Heart Failure (HFrEF, EF < 40%)**: Downward and rightward shift of ESPVR curve, increased EDV and ESV with reduced stroke volume and elevated filling pressures (causes pulmonary venous congestion).',
          '**Diastolic Heart Failure (HFpEF)**: Stiff, non-compliant LV raises EDPVR curve upward, causing elevated pulmonary wedge pressure with preserved ejection fraction.'
        ],
        linkedInvestigations: [
          { type: 'Transthoracic Echocardiogram', finding: 'EF 28%, LVEDD 65 mm, Global hypokinesia', significance: 'Confirms Severe Left Ventricular Systolic Dysfunction (HFrEF).' },
          { type: 'Right Heart Catheterization', finding: 'PCWP 26 mmHg (Normal 6-12)', significance: 'Elevated left ventricular end-diastolic pressure causing pulmonary capillary congestion.' }
        ]
      },
      practice: {
        mcqIds: ['cvs-q5', 'cvs-q6', 'cvs-q7', 'cvs-q8'],
        vivaPrompts: [
          {
            prompt: 'Explain what causes the S1 and S2 heart sounds, and during which cardiac cycle phases do they occur?',
            keyPointsToMention: ['S1 caused by closure of mitral and tricuspid valves at onset of isovolumetric contraction', 'S2 caused by closure of aortic and pulmonary valves at onset of isovolumetric relaxation', 'S2 has physiological splitting during inspiration'],
            reference: 'Guyton and Hall Textbook of Medical Physiology, 14th ed. Chapter 9.'
          }
        ]
      },
      revise: {
        highYieldPearls: [
          'Coronary blood flow to the LV is highest during early diastole (isovolumetric relaxation & rapid filling).',
          'Tachycardia predominantly shortens diastole, drastically reducing coronary perfusion time and ventricular filling.',
          'The c wave in JVP is caused by bulging of the tricuspid valve into the right atrium during RV isovolumetric contraction.'
        ],
        flashcards: [
          { front: 'When are all four cardiac valves closed simultaneously?', back: 'During Isovolumetric Contraction and Isovolumetric Relaxation.' },
          { front: 'What is the formula for Cardiac Output?', back: 'Cardiac Output = Stroke Volume × Heart Rate.' },
          { front: 'What generates the dicrotic notch on the aortic pressure tracing?', back: 'Closure of the aortic valve and elastic rebound of the aortic wall.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 1 Physiology Syllabus',
      'Guyton and Hall Textbook of Medical Physiology, 14th Edition, Unit III (The Heart)',
      'Ganong\'s Review of Medical Physiology, 26th Edition, Chapter 28'
    ],
    lastUpdated: '2026-09-12'
  },

  // 3. Phase 1: Biochemistry
  {
    id: 'cvs-biochem-cardiac-biomarkers',
    title: 'Cardiac Biomarkers & Myocardial Energy Metabolism',
    titleBn: 'কার্ডিয়াক বায়োমার্কার ও মায়োকার্ডিয়াল শক্তি বিপাক',
    phase: 'Phase 1',
    subjectId: 'biochemistry',
    subjectName: 'Biochemistry & Molecular Biology',
    chapterId: 'cvs-biochem',
    system: 'cardiovascular',
    learningObjectives: [
      'Detail the timeline, sensitivity, and specificity of cardiac troponins (cTnI and cTnT) vs CK-MB.',
      'Explain the kinetics of high-sensitivity troponin assays and criteria for acute myocardial injury.',
      'Describe the physiological stimuli, biochemical synthesis, and clinical interpretation of BNP and NT-proBNP in heart failure.',
      'Understand myocardial ATP production via beta-oxidation of fatty acids versus glucose utilization during ischemia.'
    ],
    estimatedMinutes: 20,
    status: 'published',
    version: '1.1.0',
    author: {
      name: 'Dr. Farhana Ahmed',
      designation: 'Assistant Professor of Biochemistry',
      institution: 'Dhaka Medical College'
    },
    stages: {
      learn: {
        overviewEn: 'The myocardium relies primarily on aerobic oxidative phosphorylation of free fatty acids (60-70%) and glucose (30%). During ischemic injury, sarcolemmal integrity is compromised, leading to the release of structural sarcomeric proteins and enzymes into the bloodstream.',
        overviewBn: 'হৃদপেশীর শক্তি প্রধানত ফ্যাটি অ্যাসিডের বিটা-অক্সিডেশন (৬০-৭০%) এবং গ্লুকোজ জারণের উপর নির্ভরশীল। ইসকেমিক আঘাতের সময় কোষ প্রাচীর ক্ষতিগ্রস্ত হয় এবং ট্রপোনিন ও সিকে-এমবি রক্তে প্রবেশ করে।',
        detailedContentEn: `### 1. Cardiac Troponins (cTnI and cTnT)
- **Structure**: Components of the thin actin filament regulatory complex (Troponin C binds $Ca^{2+}$, Troponin I inhibits actin-myosin interaction, Troponin T binds tropomyosin).
- **Specificity**: cTnI and cTnT have unique amino acid sequences distinct from skeletal muscle isoforms.
- **Kinetics**:
  - Initial elevation: 2–4 hours after myocardial injury (hs-cTn detectable in 1–2 hours).
  - Peak: 12–24 hours.
  - Duration: Remains elevated for 7–10 days (cTnI) or up to 14 days (cTnT), reflecting degradation of the contractile apparatus.
- **Diagnostic Threshold**: 4th Universal Definition of MI requires a rise and/or fall of cardiac biomarker (preferably hs-cTn) with at least one value above the 99th percentile upper reference limit (URL).

### 2. Creatine Kinase-MB (CK-MB)
- Isoenzyme composed of M (muscle) and B (brain) subunits.
- Rises in 4–6 hours, peaks at 18–24 hours, returns to baseline within **48–72 hours**.
- **Clinical Utility**: Essential for detecting **early re-infarction** (recurrent ischemia) within 1–2 weeks post-MI when troponin levels remain persistently high.

### 3. Natriuretic Peptides (BNP & NT-proBNP)
- Synthesized as pre-proBNP in ventricular myocytes in response to increased myocardial wall tension and volume overload.
- Cleaved by furin/corin into biologically active **BNP** (half-life 20 mins) and inactive **NT-proBNP** (half-life 90–120 mins).
- **Actions**: Promotes natriuresis, diuresis, vasodilation, and inhibits renin-angiotensin-aldosterone system.
- **Cutoffs in Acute Dyspnea**: BNP > 100 pg/mL or NT-proBNP > 300 pg/mL strongly supports congestive heart failure.`,
        detailedContentBn: `### বায়োমার্কারসমূহের তুলনামূলক বৈশিষ্ট্য
- **কার্ডিয়াক ট্রপোনিন (cTnI/cTnT)**: স্বর্ণমান (Gold Standard), ৭-১৪ দিন পর্যন্ত রক্তে বৃদ্ধি থাকে।
- **সিকে-এমবি (CK-MB)**: ৪৮-৭২ ঘণ্টায় স্বাভাবিক হয়ে যায়, তাই রি-ইনফার্কশন শনাক্তকরণে ব্যবহৃত হয়।
- **বিএনপি (BNP/NT-proBNP)**: হার্ট ফেইলিউর ও ভেন্ট্রিকুলার ওভারলোড মূল্যায়নে নির্দেশিত।`,
        keyTakeaways: [
          'High-sensitivity cardiac Troponin (hs-cTn) is the gold standard for acute myocardial infarction.',
          'CK-MB is the biomarker of choice for detecting early re-infarction occurring within 3-7 days.',
          'BNP levels correlate directly with ventricular wall stretch and left ventricular end-diastolic pressure.'
        ]
      },
      explore: {
        visualType: 'comparison-slider',
        description: 'Biomarker kinetic curves post-myocardial infarction showing Troponin vs CK-MB vs Myoglobin timeline.'
      },
      apply: {
        clinicalCorrelations: [
          '**Non-coronary Troponin Elevation**: Sepsis, acute pulmonary embolism, severe renal failure, myopericarditis, and acute aortic dissection can cause troponin leak without obstructive CAD.',
          '**ARNI Therapy (Sacubitril/Valsartan)**: Sacubitril inhibits neprilysin, preventing BNP degradation. In patients on ARNI, BNP levels are spuriously elevated; NT-proBNP must be measured instead because NT-proBNP is not cleared by neprilysin.'
        ],
        linkedInvestigations: [
          { type: 'Serum hs-cTnI', finding: '1,450 ng/L (99th percentile URL: 14 ng/L)', significance: 'Severe acute myocardial necrosis consistent with acute coronary syndrome.' },
          { type: 'Serum NT-proBNP', finding: '4,200 pg/mL', significance: 'Significantly elevated, confirms cardiogenic pulmonary edema.' }
        ]
      },
      practice: {
        mcqIds: ['cvs-q9', 'cvs-q10'],
        vivaPrompts: [
          {
            prompt: 'Which biomarker is best suited to detect re-infarction 4 days after an initial myocardial infarction, and why?',
            keyPointsToMention: ['CK-MB', 'Because CK-MB normalizes in 48-72 hours, whereas Troponins stay elevated for 7-14 days', 'A secondary spike in CK-MB confirms fresh re-infarction'],
            reference: 'Harper\'s Illustrated Biochemistry, 32nd ed.'
          }
        ]
      },
      revise: {
        highYieldPearls: [
          'Myoglobin is the earliest biomarker to rise (1-2 hours) but lacks cardiac specificity.',
          'NT-proBNP is excreted renally; adjust diagnostic cutoffs in chronic kidney disease.'
        ],
        flashcards: [
          { front: 'How long does cardiac troponin remain elevated post-MI?', back: '7 to 14 days.' },
          { front: 'Why is NT-proBNP measured instead of BNP in patients taking Sacubitril/Valsartan?', back: 'Because Sacubitril inhibits neprilysin, which degrades BNP but not NT-proBNP.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 1 Biochemistry Syllabus',
      'Harper\'s Illustrated Biochemistry, 32nd Edition',
      'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction. Circulation 2018'
    ],
    lastUpdated: '2026-09-08'
  },

  // 4. Phase 2: Pharmacology
  {
    id: 'cvs-pharm-antianginal-heartfailure',
    title: 'Anti-anginal & Heart Failure Pharmacotherapy',
    titleBn: 'অ্যান্টি-এনজাইনাল ও হার্ট ফেইলিউর ঔষধসমূহ',
    phase: 'Phase 2',
    subjectId: 'pharmacology',
    subjectName: 'Pharmacology & Therapeutics',
    chapterId: 'cvs-pharm',
    system: 'cardiovascular',
    learningObjectives: [
      'Classify anti-anginal drugs: Organic Nitrates, Beta-blockers, CCBs, and Ranolazine.',
      'Explain the molecular mechanism of Nitroglycerin (cGMP activation) and nitrate tolerance prevention.',
      'Detail the 4 Pillars of Guideline-Directed Medical Therapy (GDMT) for Heart Failure with Reduced Ejection Fraction (HFrEF): ARNI/ACEi, Beta-blocker, MRA, and SGLT2 inhibitor.',
      'Describe Digoxin mechanism of action ($Na^+/K^+$ ATPase inhibition), inotropic effect, toxicity manifestations, and management.'
    ],
    estimatedMinutes: 30,
    status: 'published',
    version: '1.4.0',
    author: {
      name: 'Dr. K. M. Saifullah',
      designation: 'Associate Professor of Pharmacology',
      institution: 'Dhaka Medical College'
    },
    stages: {
      learn: {
        overviewEn: 'Cardiovascular pharmacotherapy focuses on balancing myocardial oxygen demand ($MVO_2$) and supply, reducing cardiac preload/afterload, attenuating neurohormonal maladaptation (RAAS and Sympathetic nervous system), and improving survival in heart failure.',
        overviewBn: 'কার্ডিওভাসকুলার ফার্মাকোলজি মায়োকার্ডিয়াল অক্সিজেনের চাহিদা ও জোগানের সমতা রক্ষা করে, প্রিলোড ও আফটারলোড কমায় এবং হার্ট ফেইলিউরে জীবনকাল বৃদ্ধি করে।',
        detailedContentEn: `### 1. Organic Nitrates (Nitroglycerin, Isosorbide Dinitrate, ISMN)
- **Mechanism**: Denitrated by mitochondrial aldehyde dehydrogenase (ALDH-2) -> releases **Nitric Oxide (NO)** -> stimulates soluble guanylyl cyclase -> increases intracellular **cyclic GMP (cGMP)** -> activates Protein Kinase G -> dephosphorylation of myosin light chain -> vascular smooth muscle relaxation.
- **Hemodynamics**: Predominantly causes **venodilation** at clinical doses, drastically reducing venous return, LV end-diastolic volume (**preload**), and myocardial wall tension ($MVO_2$).
- **Tolerance**: Depletion of sulfhydryl (-SH) groups; prevented by providing a daily **10–12 hour nitrate-free interval**.
- **Dangerous Drug Interaction**: Absolute contraindication with **PDE-5 inhibitors** (Sildenafil, Tadalafil) -> catastrophic life-threatening hypotension.

### 2. The 4 Pillars of GDMT for HFrEF (Mortality-Reducing Drugs)
1. **ARNI / ACEi / ARB**:
   - *Sacubitril/Valsartan (ARNI)*: Neprilysin inhibitor + $AT_1$ receptor blocker. Decreases mortality and hospitalization by 20% over Enalapril (PARADIGM-HF).
   - *ACE inhibitors* (Ramipril, Enalapril): Inhibit angiotensin II and prevent bradykinin degradation. Side effects: Dry cough (bradykinin), hyperkalemia, angioedema.
2. **Beta-blockers (Guideline Approved)**:
   - Only 3 proven to reduce mortality: **Bisoprolol**, **Carvedilol** ($\alpha_1 + \beta_1/\beta_2$), and **Metoprolol Succinate** (extended release).
   - *Start low, go slow* in stable patients; prevent catecholamine toxicity and ventricular remodeling.
3. **Mineralocorticoid Receptor Antagonists (MRA)**:
   - *Spironolactone*, *Eplerenone*: Block aldosterone, prevent cardiac fibrosis and remodeling. Monitor serum potassium ($K^+ > 5.0$ mEq/L risk).
4. **SGLT2 Inhibitors**:
   - *Empagliflozin*, *Dapagliflozin*: Inhibit renal sodium-glucose cotransporter 2; promote osmotic diuresis, reduce preload, improve myocardial energetics, reduce cardiovascular death regardless of diabetes status.

### 3. Digoxin (Cardiac Glycoside)
- **Mechanism**: Inactivates myocardial membrane **$Na^+/K^+$ ATPase** -> increases intracellular $[Na^+]$ -> slows $Na^+/Ca^{2+}$ exchanger -> accumulation of intracellular $[Ca^{2+}]$ -> **positive inotropy**. Increases vagal tone -> slows AV nodal conduction (negative dromotropy).
- **Toxicity**: Narrow therapeutic index ($0.5–0.9$ ng/mL target). Precipitated by **hypokalemia** (Digoxin competes with $K^+$ for ATPase binding). Features: Yellow-green halos (xanthopsia), nausea, premature ventricular contractions, bidirectional ventricular tachycardia. Antidote: Digoxin-specific Fab fragments (DigiFab).`,
        detailedContentBn: `### হার্ট ফেইলিউরের জীবনরক্ষাকারী ৪টি মূল ঔষধ (4 Pillars of GDMT)
১. **এআরএনআই / এসিই ইনহিবিটর**: স্যাকুবিট্রিল/ভ্যালসার্টান অথবা রামিপ্রিল।
২. **বেটা-ব্লকার**: বিসোপ্রোলল, কার্ভেডিলল অথবা মেটোপ্রোলল সাক্সিনেট।
৩. **এমআরএ**: স্পাইরোনোল্যাকটোন (পটাশিয়াম খেয়াল রাখতে হবে)।
৪. **এসজিএলটি২ ইনহিবিটর**: ডাপাগ্লিফ্লোজিন অথবা এম্পাগ্লিফ্লোজিন।`,
        keyTakeaways: [
          'Nitrates work by increasing cGMP and primarily reducing preload through venodilation.',
          'The 4 pillars of HFrEF (ARNI, Beta-blocker, MRA, SGLT2i) drastically reduce cardiovascular mortality.',
          'Hypokalemia increases susceptibility to Digoxin toxicity.'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        visualTargetId: 'drug-journey-lab',
        description: 'Interactive PK/PD visualizer of Nitroglycerin and Sacubitril/Valsartan from oral/sublingual absorption to vascular receptors.'
      },
      apply: {
        clinicalCorrelations: [
          '**Nitrate-Sildenafil Fatal Interaction**: Ingestion of Sildenafil within 24 hours (or Tadalafil within 48 hours) of Nitroglycerin produces severe irreversible vasodilation and shock.',
          '**Beta-blockers in Acute Decompensated HF**: Never initiate or uptitrate beta-blockers in a patient with wet/cold acute decompensated shock; stabilize with diuretics first.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q11', 'cvs-q12', 'cvs-q13', 'cvs-q14'],
        vivaPrompts: [
          {
            prompt: 'Name the 4 drug classes that reduce mortality in Heart Failure with reduced ejection fraction (HFrEF).',
            keyPointsToMention: ['ARNI (Sacubitril/Valsartan) or ACEi', 'Evidence-based Beta-blocker (Bisoprolol, Carvedilol, Metoprolol Succinate)', 'MRA (Spironolactone, Eplerenone)', 'SGLT2 inhibitor (Dapagliflozin, Empagliflozin)'],
            reference: 'Katzung Basic & Clinical Pharmacology, 15th ed.'
          }
        ]
      },
      revise: {
        highYieldPearls: [
          'Loop diuretics (Furosemide) provide symptomatic relief of pulmonary congestion but do NOT reduce long-term mortality.',
          'Digoxin improves symptoms and reduces hospitalization in HFrEF + AFib but does NOT reduce overall mortality.'
        ],
        flashcards: [
          { front: 'Why must a nitrate-free interval of 10-12 hours be observed?', back: 'To prevent nitrate tolerance caused by depletion of sulfhydryl groups.' },
          { front: 'Which electrolyte abnormality most commonly triggers Digoxin toxicity?', back: 'Hypokalemia.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 2 Pharmacology Syllabus',
      'Katzung Basic & Clinical Pharmacology, 15th Edition, Section III (Cardiovascular-Renal Drugs)',
      'ESC 2021/2023 Guidelines for the diagnosis and treatment of acute and chronic heart failure'
    ],
    lastUpdated: '2026-09-11'
  },

  // 5. Phase 2: Forensic Medicine
  {
    id: 'cvs-forensic-sudden-cardiac-death',
    title: 'Sudden Cardiac Death & Medico-legal Autopsy in Fatal MI',
    titleBn: 'আকস্মিক কার্ডিয়াক মৃত্যু এবং ময়না তদন্তে মায়োকার্ডিয়াল ইনফার্কশন',
    phase: 'Phase 2',
    subjectId: 'forensic',
    subjectName: 'Forensic Medicine & Toxicology',
    chapterId: 'cvs-forensic',
    system: 'cardiovascular',
    learningObjectives: [
      'Define Sudden Natural Death and Sudden Cardiac Death (SCD) according to WHO criteria.',
      'Identify leading causes of SCD (Atherosclerotic CAD, hypertrophic cardiomyopathy, arrhythmogenic RV cardiomyopathy, aortic dissection).',
      'Detail post-mortem macroscopic and histological findings of myocardial infarction at varying post-infarction intervals (0–6h, 12–24h, 3–7d, >2 months).',
      'Understand TTC (Triphenyltetrazolium chloride) staining for early autopsy detection of myocardial necrosis.'
    ],
    estimatedMinutes: 20,
    status: 'published',
    version: '1.1.0',
    author: {
      name: 'Dr. Sohel Mahmud',
      designation: 'Associate Professor of Forensic Medicine',
      institution: 'Dhaka Medical College'
    },
    stages: {
      learn: {
        overviewEn: 'Sudden Cardiac Death (SCD) is unexpected natural death from a cardiac cause within 1 hour of symptom onset (witnessed) or within 24 hours of last being seen alive in good health (unwitnessed). Atherosclerotic Coronary Artery Disease accounts for over 80% of adult cases.',
        overviewBn: 'লক্ষণ প্রকাশের ১ ঘণ্টার মধ্যে কার্ডিয়াক কারণে অপ্রত্যাশিত মৃত্যুকে সাডেন কার্ডিয়াক ডেথ বলে। প্রাপ্তবয়স্কদের ক্ষেত্রে ৮০% এর বেশি ক্ষেত্রে করোনারি ধমনীর এথেরোস্ক্লেরোসিসই এর প্রধান কারণ।',
        detailedContentEn: `### 1. Autopsy Examination of the Heart
- **Gross Dissection Protocol**:
  1. Measure heart weight (Normal: Male 300–350g, Female 250–300g; >400g indicates significant hypertrophy).
  2. Bread-loaf transverse sectioning of the ventricles at 1 cm intervals from apex toward AV groove.
  3. Coronary artery bread-loaf sectioning at 2–3 mm intervals along LAD, LCx, and RCA.
- **TTC (Triphenyltetrazolium Chloride) Staining**:
  - Viable myocardium contains lactate dehydrogenase (LDH), which reduces colorless TTC to a deep brick-red formazan precipitate.
  - Non-viable, infarcted myocardium leaks LDH, leaving the necrotic area **pale and unstained** (detectable within 2–3 hours post-infarction).

### 2. Timeline of Post-Mortem Myocardial Changes
| Post-MI Interval | Gross Autopsy Appearance | Histological Findings |
| :--- | :--- | :--- |
| **0 – 4 hours** | None (TTC reveals pale zone at 2–3h) | Wavy myocardial fibers at borders |
| **4 – 12 hours** | Dark mottling | Early coagulative necrosis, edema, contraction band necrosis |
| **12 – 24 hours** | Dark mottling with pale cyanotic border | Ongoing coagulative necrosis, pyknosis of nuclei, marginal neutrophilic infiltrate |
| **1 – 3 days** | Pale-yellow center with hyperemic border | Dense neutrophilic infiltrate, loss of nuclei and striations |
| **3 – 7 days** | Hyperemic border, central softening / yellow-tan (Peak rupture risk) | Macrophage phagocytosis of dead myocytes, early granulation tissue |
| **7 – 14 days** | Depressed red-tan margin | Prominent granulation tissue with rich capillaries and collagen deposition |
| **> 2 months** | Dense, white-grey fibrous scar | Dense dense collagenous fibrous scar tissue |`,
        detailedContentBn: `### ময়নাতদন্তে মায়োকার্ডিয়াল ইনফার্কশনের সময়কাল
- **০-৪ ঘণ্টা**: খালি চোখে কোনো পরিবর্তন দেখা যায় না; টিটিসি স্টেইনিং এ ফ্যাকাসে দেখায়।
- **৩-৭ দিন**: হলুদ নরম কেন্দ্র; এ সময় হৃদপিণ্ডের প্রাচীর বা প্যাপিলা পেশী ছিঁড়ে যাওয়ার (Rupture) ঝুঁকি সবচেয়ে বেশি।
- **> ২ মাস**: শক্ত সাদা-ধূসর ফাইব্রাস স্কার।`,
        keyTakeaways: [
          'Atherosclerotic coronary artery disease is the most common cause of sudden cardiac death in adults.',
          'TTC staining differentiates viable (brick red) from infarcted (pale) myocardium within 2-3 hours post-death.',
          'Myocardial rupture (free wall, septum, papillary muscle) occurs most frequently between days 3 to 7.'
        ]
      },
      explore: {
        visualType: 'histology-slide',
        description: 'Post-mortem gross specimen and histological slide of acute myocardial infarction showing wavy fibers and dense neutrophilic infiltration.'
      },
      apply: {
        clinicalCorrelations: [
          '**Medico-Legal Certificate of Cause of Death**: When autopsy demonstrates >75% cross-sectional luminal narrowing of LAD with fresh occlusive thrombus and acute subendocardial necrosis, the cause of death is certified as "Cardiogenic Shock resulting from Acute Myocardial Infarction secondary to Coronary Atherosclerosis".'
        ]
      },
      practice: {
        mcqIds: ['cvs-q15', 'cvs-q16']
      },
      revise: {
        highYieldPearls: [
          'In hypertrophic cardiomyopathy (HCM), autopsy demonstrates myofiber disarray and asymmetrical septal hypertrophy.',
          'Commotio cordis is sudden cardiac arrest triggered by a blunt non-penetrating blow to the precordium during the vulnerable upslope of the T wave.'
        ],
        flashcards: [
          { front: 'What color does viable myocardium turn upon TTC staining at autopsy?', back: 'Brick red (due to intact lactate dehydrogenase activity).' },
          { front: 'During which post-MI timeframe is the heart at highest risk of myocardial rupture?', back: 'Between Day 3 and Day 7 (when macrophage digestion has weakened tissue before collagen deposition).' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 2 Forensic Medicine Syllabus',
      'Reddy KSN. The Essentials of Forensic Medicine and Toxicology, 34th Edition',
      'Knight\'s Forensic Pathology, 4th Edition'
    ],
    lastUpdated: '2026-09-05'
  },

  // 6. Phase 3: Pathology
  {
    id: 'cvs-path-atherosclerosis-mi',
    title: 'Atherosclerosis Pathogenesis, Plaque Rupture & Evolution of MI',
    titleBn: 'এথেরোস্ক্লেরোসিস, প্ল্যাক ফেটে যাওয়া এবং মায়োকার্ডিয়াল ইনফার্কশন',
    phase: 'Phase 3',
    subjectId: 'pathology',
    subjectName: 'Pathology',
    chapterId: 'cvs-path',
    system: 'cardiovascular',
    learningObjectives: [
      'Describe the Response-to-Injury hypothesis in the pathogenesis of atherosclerosis.',
      'Explain the steps of atheroma formation: endothelial injury, LDL oxidation, foam cell accumulation (fatty streak), smooth muscle migration, and fibrous cap formation.',
      'Distinguish stable plaque versus vulnerable (thin-cap fibroatheroma) plaque characteristics.',
      'Detail the morphological evolution and clinical complications of Myocardial Infarction.'
    ],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.3.0',
    author: {
      name: 'Dr. Shahriar Nabi',
      designation: 'Associate Professor of Pathology',
      institution: 'Dhaka Medical College'
    },
    stages: {
      learn: {
        overviewEn: 'Atherosclerosis is a chronic inflammatory and fibroproliferative disease of large and medium-sized elastic and muscular arteries, characterized by intimal lesions called atheromatous plaques (fibrofatty plaques) that protrude into and obstruct the vascular lumen.',
        overviewBn: 'এথেরোস্ক্লেরোসিস হলো মাঝারি ও বড় ধমনীর অভ্যন্তরীণ স্তরের একটি দীর্ঘমেয়াদী প্রদাহজনিত রোগ, যার ফলে লুমেন সংকুচিত হয় এবং রক্ত সঞ্চালন ব্যাহত হয়।',
        detailedContentEn: `### 1. The Response-to-Injury Hypothesis
1. **Endothelial Injury & Dysfunction**: Triggered by hemodynamic shear stress (turbulent flow at branch points), cigarette toxins, oxidized LDL, hypertension, and hyperhomocysteinemia. Leads to increased vascular permeability and leukocyte adhesion.
2. **Lipoprotein Infiltration**: LDL enters the intima and undergoes **oxidation** ($oxLDL$) by endothelial free radicals.
3. **Monocyte Adhesion & Foam Cell Formation**: Endothelial expression of VCAM-1/ICAM-1 recruits monocytes. Monocytes enter intima, become macrophages, and engulf $oxLDL$ via **scavenger receptors (SR-A/CD36)** -> become **Foam Cells**. Aggregation of foam cells forms macroscopic **Fatty Streaks**.
4. **Smooth Muscle Cell (SMC) Recruitment & Fibrous Cap**: Macrophages and T cells secrete cytokines (PDGF, TGF-beta, FGF) stimulating SMC migration from the media into the intima, proliferation, and synthesis of extracellular matrix (collagen, elastin) -> forms the **Fibrous Cap** overlying a necrotic lipid core.

### 2. Vulnerable vs Stable Plaque
- **Vulnerable Plaque (High Risk of Thrombosis)**: Thin fibrous cap ($<65\\ \\mu\\text{m}$), large necrotic lipid core ($>40\\%$ of plaque volume), dense macrophage infiltration, and high matrix metalloproteinase (MMP) activity which degrades collagen.
- **Stable Plaque**: Thick collagenous fibrous cap, minimal inflammation, small lipid core. Produces predictable exertional angina (stable angina).

### 3. Acute Plaque Change & Thrombosis
- Superficial erosion or rupture of the fibrous cap exposes subendothelial **collagen** and **von Willebrand Factor (vWF)** to circulating platelets.
- Platelets adhere via GpIb-IX-V, activate, secrete ADP/Thromboxane A2, and aggregate via GpIIb/IIIa receptors.
- Tissue factor triggers the coagulation cascade, forming an occlusive fibrin-rich thrombus resulting in **Acute Transmural Myocardial Infarction (STEMI)**.`,
        detailedContentBn: `### এথেরোস্ক্লেরোসিস সৃষ্টির ধাপসমূহ
১. এন্ডোথেলিয়াল ইনজুরি।
২. এলডিএল (LDL) অক্সিডেশন।
৩. ফোম সেল (Foam Cell) ও ফ্যাটি স্ট্রিক তৈরি।
৪. মসৃণ পেশী কোষের বৃদ্ধি ও ফাইব্রাস ক্যাপ তৈরি।
৫. পাতলা ক্যাপ ফেটে গেলে তাৎক্ষণিক থ্রম্বোসিস হয়ে হার্ট অ্যাটাক হয়।`,
        keyTakeaways: [
          'Oxidized LDL and macrophage foam cell formation drive the initial intimal fatty streak.',
          'Thin-cap fibroatheromas with high macrophage content are vulnerable to rupture.',
          'Plaque rupture triggers immediate platelet adhesion, aggregation, and occlusive thrombosis.'
        ]
      },
      explore: {
        visualType: 'comparison-slider',
        visualTargetId: 'atherosclerosis-slider',
        description: 'Interactive stage-by-stage morphing slider: Normal Artery -> Fatty Streak -> Fibrofatty Plaque -> Plaque Rupture & Occlusive Thrombus.'
      },
      apply: {
        clinicalCorrelations: [
          '**Statin Pleiotropic Effects**: Statins not only lower LDL via HMG-CoA reductase inhibition but also stabilize vulnerable plaque by reducing macrophage inflammation and increasing fibrous cap thickness.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q17', 'cvs-q18', 'cvs-q19']
      },
      revise: {
        highYieldPearls: [
          'Atherosclerosis most severely affects the abdominal aorta, followed by coronary arteries, popliteal arteries, and internal carotid arteries.',
          'Matrix metalloproteinases (MMPs) secreted by macrophages degrade the fibrous cap collagen, triggering plaque rupture.'
        ],
        flashcards: [
          { front: 'What cell type transforms into a foam cell in atherosclerosis?', back: 'Macrophages (and smooth muscle cells) that engulf oxidized LDL.' },
          { front: 'Which arterial site is most vulnerable to severe atherosclerosis?', back: 'Abdominal aorta and coronary branch points.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 3 Pathology Syllabus',
      'Robbins and Cotran Pathologic Basis of Disease, 10th Edition, Chapter 11 (Blood Vessels)',
      'Underwood\'s Pathology: a Clinical Approach, 7th Edition'
    ],
    lastUpdated: '2026-09-09'
  },

  // 7. Phase 3: Microbiology
  {
    id: 'cvs-micro-infective-endocarditis',
    title: 'Infective Endocarditis: Microbiology, Blood Cultures & Duke Criteria',
    titleBn: 'ইনফেক্টিভ এন্ডোকার্ডাইটিস: জীবাণুতত্ত্ব, ব্লাড কালচার এবং ডিউক মানদণ্ড',
    phase: 'Phase 3',
    subjectId: 'microbiology',
    subjectName: 'Microbiology',
    chapterId: 'cvs-micro',
    system: 'cardiovascular',
    learningObjectives: [
      'List the common causative organisms of native valve, prosthetic valve, and IV drug-abuse Infective Endocarditis.',
      'Explain the pathophysiology of non-bacterial thrombotic endocarditis (NBTE) and bacterial colonization.',
      'Detail the protocol for diagnostic blood culture collection before initiating antibiotics.',
      'Apply the Modified Duke Criteria (Major and Minor criteria) to confirm definitive Infective Endocarditis.'
    ],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.2.0',
    author: {
      name: 'Dr. Ahmed Abu Saleh',
      designation: 'Professor of Microbiology',
      institution: 'BSMMU'
    },
    stages: {
      learn: {
        overviewEn: 'Infective Endocarditis (IE) is a microbial infection of the endocardial surface of the heart, characterized by the formation of bulky, friable vegetations containing platelets, fibrin, micro-organisms, and inflammatory cells.',
        overviewBn: 'ইনফেক্টিভ এন্ডোকার্ডাইটিস হলো হৃদপিণ্ডের অভ্যন্তরীণ কপাটিকা ও এন্ডোকার্ডিয়ামের জীবাণু সংক্রমণ, যার ফলে প্লাটিলেট, ফাইব্রিন ও ব্যাকটেরিয়া সমৃদ্ধ ভেজিটেশন গঠিত হয়।',
        detailedContentEn: `### 1. Causative Organisms & Clinical Settings
- **Viridans Group Streptococci (*S. sanguinis, S. mitis, S. mutans*)**: Most common cause of **Subacute Native Valve Endocarditis** (50–60% of non-hospital acquired cases). Originates from oral cavity following dental procedures; binds to pre-damaged valves (e.g., Rheumatic heart disease, MVP) via dextran production.
- **Staphylococcus aureus**: Leading cause of **Acute Endocarditis** (rapidly destroys normal or abnormal valves). Primary agent in **Intravenous Drug Users (IVDU)** (affects the **Tricuspid Valve**) and nosocomial catheter infections.
- **Staphylococcus epidermidis (Coagulase-Negative Staphylococci)**: Most common cause of **Early Prosthetic Valve Endocarditis** (<1 year post-op) due to biofilm formation on prosthetic material.
- **Enterococci (*E. faecalis*)**: Associated with urinary tract or GI procedures in elderly males.
- **HACEK Group** (*Haemophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella*): Fastidious Gram-negative rods; cause culture-negative endocarditis.
- ***Streptococcus gallolyticus (S. bovis)*: Strongly associated with underlying **colorectal carcinoma**.

### 2. Blood Culture Protocol
- Obtain **3 sets of blood cultures** (aerobic and anaerobic bottles) from separate venipuncture sites, with at least 1 hour between first and last draw, **before starting antimicrobial therapy**.

### 3. Modified Duke Criteria
- **Major Criteria**:
  1. *Positive Blood Cultures*: Typical micro-organisms consistent with IE from 2 separate blood cultures, or persistently positive cultures (>12 hours apart), or single positive culture for *Coxiella burnetii*.
  2. *Evidence of Endocardial Involvement on Echo*: Oscillating intracardiac mass (vegetation) on valve or supporting structures, abscess, new partial dehiscence of prosthetic valve, or new valvular regurgitation.
- **Minor Criteria**:
  1. Predisposing heart condition or IV drug use.
  2. Fever $\\ge 38.0^\\circ\\text{C}$ ($100.4^\\circ\\text{F}$).
  3. Vascular phenomena: Major arterial emboli, septic pulmonary infarcts, mycotic aneurysm, intracranial hemorrhage, conjunctival hemorrhages, **Janeway lesions** (painless erythematous macules on palms/soles).
  4. Immunologic phenomena: Glomerulonephritis, **Osler nodes** (painful tender subcutaneous nodules on pads of fingers/toes), **Roth spots** (retinal hemorrhages with pale centers), positive Rheumatoid Factor.
  5. Microbiological evidence not meeting major criteria.
- **Definitive Diagnosis**: 2 Major, or 1 Major + 3 Minor, or 5 Minor criteria.`,
        detailedContentBn: `### প্রধান জীবাণু ও সংশ্লিষ্টতা
- **ভিরিডান্স স্ট্রেপ্টোকক্কাস**: ডেন্টাল প্রসিডিউরের পর ক্রনিক/সাবঅ্যাকিউট এন্ডোকার্ডাইটিস।
- **স্ট্যাফাইলোকক্কাস অরিয়াস**: ইনজেকশন ড্রাগ গ্রহণকারীদের মধ্যে ট্রাইকাসপিড কপাটিকা ধ্বংসকারী অ্যাকিউট এন্ডোকার্ডাইটিস।
- **স্ট্যাফাইলোকক্কাস এপিডার্মিডিস**: কৃত্রিম কপাটিকা (Prosthetic valve) সার্জারির ১ বছরের মধ্যে ইনফেকশন।`,
        keyTakeaways: [
          'Viridans Streptococci cause subacute IE on damaged valves; S. aureus causes acute destructive IE.',
          'Draw 3 separate blood culture sets before initiating antibiotics.',
          'Definitive Duke diagnosis requires 2 Major OR 1 Major + 3 Minor OR 5 Minor criteria.'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        description: 'Microbiology diagnostic workflow: Blood culture Gram stain -> Automated identification -> Transthoracic & Transesophageal Echocardiogram (TEE).'
      },
      apply: {
        clinicalCorrelations: [
          '**S. bovis Bacteremia Warning**: Isolation of *Streptococcus gallolyticus (bovis)* in blood requires immediate referral for **colonoscopy** to exclude occult colon cancer.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q20', 'cvs-q21']
      },
      revise: {
        highYieldPearls: [
          'Janeway lesions are painless vascular micro-abscesses; Osler nodes are painful immunologic immune-complex deposits.',
          'Transesophageal Echocardiography (TEE) has >90% sensitivity for detecting vegetations and perivalvular abscesses.'
        ],
        flashcards: [
          { front: 'Which organism causes endocarditis in IV drug users affecting the tricuspid valve?', back: 'Staphylococcus aureus.' },
          { front: 'What is the diagnostic significance of Streptococcus bovis (gallolyticus) endocarditis?', back: 'High association with occult colorectal adenocarcinoma.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 3 Microbiology Syllabus',
      'Jawetz, Melnick & Adelberg\'s Medical Microbiology, 28th Edition',
      'ESC 2023 Guidelines for the management of endocarditis'
    ],
    lastUpdated: '2026-09-04'
  },

  // 8. Phase 3: Community Medicine
  {
    id: 'cvs-commed-epidemiology-ncd',
    title: 'Cardiovascular Disease Epidemiology & NCD Screening in Bangladesh',
    titleBn: 'বাংলাদেশে হৃদরোগের বিস্তার ও অসংক্রামক ব্যাধি স্ক্রিনিং',
    phase: 'Phase 3',
    subjectId: 'community-med',
    subjectName: 'Community Medicine',
    chapterId: 'cvs-commed',
    system: 'cardiovascular',
    learningObjectives: [
      'Analyze the epidemiological transition and rising burden of Non-Communicable Diseases (NCDs) in South Asia and Bangladesh.',
      'Explain the WHO STEPS framework for chronic disease risk factor surveillance.',
      'Describe the National NCD Control Program and primary prevention strategies implemented at Upazila Health Complexes and Community Clinics.',
      'Calculate cardiovascular risk scores (WHO/ISH Risk Prediction Charts) for rural and urban populations.'
    ],
    estimatedMinutes: 20,
    status: 'published',
    version: '1.1.0',
    author: {
      name: 'Dr. Baizid Khoorshid Riaz',
      designation: 'Director & Professor of Community Medicine',
      institution: 'NIPSOM, Dhaka'
    },
    stages: {
      learn: {
        overviewEn: 'Cardiovascular diseases (CVDs) account for over 30% of total adult mortality in Bangladesh. Rapid urbanization, sedentary lifestyles, high dietary salt/trans-fat intake, and widespread tobacco/smokeless tobacco (Jarda/Gul/Sadapata) consumption drive this epidemic.',
        overviewBn: 'বাংলাদেশে প্রাপ্তবয়স্কদের মৃত্যুর ৩০% এরও বেশি ঘটে হৃদরোগের কারণে। অপরিকল্পিত নগরায়ণ, কায়িক পরিশ্রমের অভাব, খাবারে অতিরিক্ত লবণ ও জর্দা-গুল-তামাক সেবন এর জন্য দায়ী।',
        detailedContentEn: `### 1. Epidemiological Landscape in Bangladesh
- **Premature CAD**: South Asians develop coronary artery disease 5–10 years earlier than Western counterparts, often presenting with multi-vessel disease and high lipid-rich vulnerable plaque volume.
- **Hypertension Prevalence**: Approximately 25–30% of adults aged $\\ge 35$ years have hypertension; awareness, treatment adherence, and blood pressure control rates remain below 20%.
- **Smokeless Tobacco Burden**: Bidi, Gul, Jarda, and Sadapata contain high nicotine and nitrosamine levels, heavily contributing to endothelial injury and accelerated atherosclerosis.

### 2. WHO STEPS Surveillance Framework
- **Step 1 (Questionnaire)**: Behavioral risk factors (tobacco, fruit/vegetable intake, physical activity, alcohol).
- **Step 2 (Physical Measurements)**: Blood pressure, height, weight, BMI, waist circumference.
- **Step 3 (Biochemical Measurements)**: Fasting blood glucose, total cholesterol, triglycerides, HDL/LDL.

### 3. Community Clinic & Upazila NCD Corner Implementation
- Established under the Directorate General of Health Services (DGHS).
- **Protocol**: Every individual aged $\ge 40$ years undergoes routine BP screening, blood glucose testing, and lifestyle counseling.
- **Primary Prevention Target**: Reduce dietary sodium to $< 5\\text{ g/day}$ ($< 2,000\\text{ mg}$ sodium), eliminate industrial trans-fats, ensure 150 minutes of moderate aerobic exercise per week, and achieve tobacco cessation.`,
        detailedContentBn: `### প্রাথমিক প্রতিরোধ ও এনসিডি কর্নার
- কমিউনিটি ক্লিনিক ও উপজেলা স্বাস্থ্য কমপ্লেক্সে ৪০ ঊর্ধ্ব সকল নাগরিকের রক্তচাপ ও ডায়াবেটিস পরীক্ষা।
- খাদ্যে লবণের পরিমাণ দৈনিক ৫ গ্রামের নিচে নামিয়ে আনা।
- জর্দা, গুল ও তামাক পরিহার।`,
        keyTakeaways: [
          'CVD is responsible for over 30% of adult deaths in Bangladesh.',
          'Smokeless tobacco (Jarda, Gul) is a major indigenous driver of vascular endothelial damage.',
          'NCD Corners at Upazila Health Complexes provide protocolized screening and free first-line antihypertensive medications (Amlodipine, Losartan).'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        description: 'WHO/ISH South Asia Cardiovascular 10-year risk assessment matrix based on age, gender, smoking, BP, and diabetes status.'
      },
      apply: {
        clinicalCorrelations: [
          '**Dietary Sodium Reduction**: A population-wide reduction of 1 tsp salt/day reduces systolic BP by 5-8 mmHg across the community, drastically lowering stroke and MI incidence.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q22', 'cvs-q23']
      },
      revise: {
        highYieldPearls: [
          'The target daily salt intake recommended by WHO is less than 5 grams (approximately one level teaspoon).',
          'South Asian ethnicity is an independent cardiovascular risk-enhancing factor.'
        ],
        flashcards: [
          { front: 'What is the maximum daily salt intake recommended by WHO for CVD prevention?', back: 'Less than 5 grams per day.' },
          { front: 'What are the 3 steps in the WHO STEPS surveillance tool?', back: 'Step 1: Questionnaire, Step 2: Physical measurements, Step 3: Biochemical measurements.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 3 Community Medicine Syllabus',
      'Park\'s Textbook of Preventive and Social Medicine, 26th Edition',
      'Bangladesh NCD STEPS Survey Report, DGHS / WHO'
    ],
    lastUpdated: '2026-08-30'
  },

  // 9. Phase 4: Medicine
  {
    id: 'cvs-med-acute-coronary-syndrome',
    title: 'Acute Coronary Syndromes & 12-Lead ECG Interpretation',
    titleBn: 'অ্যাকিউট করোনারি সিন্ড্রোম এবং ১২-লিড ইসিজি ব্যাখ্যা',
    phase: 'Phase 4',
    subjectId: 'medicine',
    subjectName: 'Medicine & Allied Subjects',
    chapterId: 'cvs-medicine',
    system: 'cardiovascular',
    learningObjectives: [
      'Differentiate STEMI, NSTEMI, and Unstable Angina based on symptoms, 12-lead ECG, and cardiac biomarkers.',
      'Systematically interpret 12-lead ECG: Rate, Rhythm, Axis, Hypertrophy, Ischemia/Infarction localization.',
      'Identify ECG leads corresponding to coronary vascular territories (Inferior, Anterior, Lateral, Posterior, RV).',
      'Detail emergency pharmacological and revascularization protocol (MONA-B, DAPT, Heparin, Primary PCI window <90 mins vs Fibrinolysis <30 mins).'
    ],
    estimatedMinutes: 35,
    status: 'published',
    version: '1.5.0',
    author: {
      name: 'Prof. Dr. M. A. Faiz',
      designation: 'Ex-Director General of Health Services & Professor of Medicine',
      institution: 'Dhaka Medical College'
    },
    reviewer: {
      name: 'Prof. Dr. Quazi Tarikul Islam',
      designation: 'Professor of Medicine',
      institution: 'Rajshahi Medical College',
      reviewDate: '2026-09-01'
    },
    stages: {
      learn: {
        overviewEn: 'Acute Coronary Syndrome (ACS) encompasses a clinical spectrum of acute myocardial ischemia triggered by atherosclerotic plaque disruption and thrombosis, classified into ST-Elevation MI (STEMI), Non-ST-Elevation MI (NSTEMI), and Unstable Angina (UA).',
        overviewBn: 'অ্যাকিউট করোনারি সিন্ড্রোম হলো করোনারি ধমনীতে রক্ত প্রবাহ হঠাৎ বন্ধ হয়ে সৃষ্ট জটিল অবস্থা। এটি স্টেনি (STEMI), এন-স্টেনি (NSTEMI) ও আনস্টেবল এনজাইনায় বিভক্ত।',
        detailedContentEn: `### 1. Diagnostic Triad of ACS
| Condition | Symptoms | 12-Lead ECG | Cardiac Biomarkers (hs-cTn) |
| :--- | :--- | :--- | :--- |
| **STEMI** | Crushing retrosternal chest pain $>20$ mins | New ST elevation $\\ge 1$ mm in $\ge 2$ contiguous leads (or new LBBB) | **Elevated** (markedly positive) |
| **NSTEMI** | Anginal pain at rest or crescendo pattern | ST depression $\ge 0.5$ mm, T wave inversion, or normal | **Elevated** (above 99th percentile) |
| **Unstable Angina** | Rest angina, new-onset severe angina, crescendo | Normal, ST depression, or transient T inversion | **Negative** (Normal troponin) |

### 2. Anatomical Localization on 12-Lead ECG
- **Septal**: Leads $V_1, V_2$ -> Proximal LAD.
- **Anterior**: Leads $V_3, V_4$ -> LAD.
- **Anterolateral / Extensive Anterior**: Leads $V_1 - V_6, I, aVL$ -> Proximal LCA / LAD trunk.
- **Inferior**: Leads $II, III, aVF$ -> RCA (85%) or LCx (15%).
- **Lateral / High Lateral**: Leads $I, aVL, V_5, V_6$ -> Left Circumflex (LCx).
- **Posterior**: Reciprocal tall R waves ($R/S > 1$) and ST depression in $V_1 - V_3$; confirmed by ST elevation in posterior leads $V_7, V_8, V_9$ -> RCA or LCx.
- **Right Ventricle**: ST elevation in lead $V_4R$ (obtained by placing right-sided precordial leads) -> Proximal RCA.

### 3. Emergency Management Protocol
1. **Immediate Bedside Stabilisation**:
   - High-flow Oxygen (only if $SpO_2 < 90\\%$).
   - Sublingual Nitroglycerin 0.4 mg (caution if inferior MI / RV involvement / SBP $<90$ mmHg).
   - IV Morphine 2–4 mg for severe pain/anxiety.
2. **Dual Antiplatelet Therapy (DAPT)**:
   - **Aspirin**: 300 mg chewed loading dose, then 75 mg daily.
   - **P2Y12 Inhibitor**: Ticagrelor 180 mg loading dose (or Clopidogrel 300–600 mg).
3. **Anticoagulation**: Enoxaparin 1 mg/kg SC q12h or IV unfractionated heparin.
4. **Revascularization Strategy (STEMI)**:
   - **Primary PCI (Door-to-Balloon time $< 90$ mins)**: Gold standard revascularization treatment.
   - **Fibrinolysis (Door-to-Needle time $< 30$ mins)**: Indicated if PCI cannot be performed within 120 minutes of first medical contact. Agents: Tenecteplase (TNK-tPA) or Streptokinase (1.5 million IU in 100 mL saline over 60 mins).`,
        detailedContentBn: `### জরুরি চিকিৎসা প্রোটোকল
- **অ্যাসপিরিন**: ৩০০ মিলিগ্রাম চিবিয়ে খাওয়াতে হবে।
- **ক্লোপিডোগ্রেল/টিকাগ্রেলর**: লোডিং ডোজ দিতে হবে।
- **প্রাইমারি পিসিআই**: ৯০ মিনিটের মধ্যে স্টেন্টিং করানো সর্বোত্তম চিকিৎসা। পিসিআই সুবিধা না থাকলে ৩০ মিনিটের মধ্যে থ্রম্বোলাইসিস (স্ট্রেপ্টোকাইনেজ) করতে হবে।
- **সাবধানতা**: ইনফিরিয়র এমআই বা ডান নিলয় আক্রান্ত হলে নাইট্রেট দেওয়া যাবে না (মারাত্মক প্রেশার কমে যায়)।`,
        keyTakeaways: [
          'STEMI requires immediate emergency reperfusion: Primary PCI within 90 minutes or Fibrinolysis within 30 minutes.',
          'Right ventricular infarction (RCA territory) presents with hypotension, clear lung fields, and elevated JVP; treated with IV fluids, avoid nitrates.',
          'DAPT (Aspirin + P2Y12 inhibitor) and high-intensity Statin (Atorvastatin 80 mg) are initiated immediately.'
        ]
      },
      explore: {
        visualType: 'ecg-trace',
        visualTargetId: 'ecg-viewer',
        description: 'Interactive calibrated 12-lead ECG viewer with ST elevation calipers, rate/axis calculators, and pathological Q wave measurement.'
      },
      apply: {
        clinicalCorrelations: [
          '**RV Infarction Management**: In Inferior STEMI with RV involvement ($V_4R$ elevation), preload is critical. Vasodilators (Nitrates, Morphine) and Diuretics precipitate fatal cardiogenic shock. Treat hypotension with aggressive **IV Normal Saline fluid boluses**.'
        ],
        linkedInvestigations: [
          { type: '12-Lead ECG', finding: '4 mm ST elevation in leads II, III, aVF with 2 mm reciprocal ST depression in I, aVL', significance: 'Acute Transmural Inferior Wall STEMI.' },
          { type: 'Right-sided ECG (V4R)', finding: '2 mm ST elevation in lead V4R', significance: 'Confirms Right Ventricular Myocardial Infarction.' }
        ]
      },
      practice: {
        mcqIds: ['cvs-q24', 'cvs-q25', 'cvs-q26', 'cvs-q27', 'cvs-q28']
      },
      revise: {
        highYieldPearls: [
          'New LBBB in the presence of ischemic chest pain is treated as a STEMI equivalent.',
          'Wellens syndrome (biphasic or deeply inverted T waves in V2-V3) indicates critical proximal LAD stenosis without infarction yet.'
        ],
        flashcards: [
          { front: 'What is the target Door-to-Balloon time for Primary PCI in STEMI?', back: 'Within 90 minutes of hospital arrival.' },
          { front: 'Which ECG leads reflect the lateral wall of the left ventricle?', back: 'Leads I, aVL, V5, and V6 (supplied by Left Circumflex).' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 4 Medicine Syllabus',
      'Davidson\'s Principles and Practice of Medicine, 24th Edition, Chapter 18 (Cardiovascular)',
      'Kumar and Clark\'s Clinical Medicine, 10th Edition',
      'ESC 2023 Guidelines for the management of acute coronary syndromes'
    ],
    lastUpdated: '2026-09-14'
  },

  // 10. Phase 4: Surgery
  {
    id: 'cvs-surg-cabg-valvular-surgery',
    title: 'Coronary Artery Bypass Grafting (CABG) & Valvular Heart Surgery',
    titleBn: 'করোনারি আর্টারি বাইপাস গ্রাফটিং (সিএবিজি) এবং কপাটিকা সার্জারি',
    phase: 'Phase 4',
    subjectId: 'surgery',
    subjectName: 'Surgery & Allied Subjects',
    chapterId: 'cvs-surgery',
    system: 'cardiovascular',
    learningObjectives: [
      'State the surgical indications for CABG versus Percutaneous Coronary Intervention (PCI) based on SYNTAX score and diabetes status.',
      'Identify conduits used for bypass grafting: Left Internal Mammary Artery (LIMA), Great Saphenous Vein (GSV), Radial Artery.',
      'Explain Cardiopulmonary Bypass (CPB), cardioplegia, and on-pump versus off-pump (OPCAB) techniques.',
      'Compare mechanical versus bioprosthetic prosthetic heart valves (anticoagulation vs durability).'
    ],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.2.0',
    author: {
      name: 'Prof. Dr. Asit Baran Adhikary',
      designation: 'Professor & Chairman of Cardiac Surgery',
      institution: 'BSMMU'
    },
    stages: {
      learn: {
        overviewEn: 'Cardiac surgery provides definitive mechanical revascularization and structural repair/replacement for advanced coronary artery disease, aortic/mitral valvulopathies, and aortic emergencies.',
        overviewBn: 'কার্ডিয়াক সার্জারির মাধ্যমে জটিল করোনারি আর্টারি ডিজিজে বাইপাস গ্রাফট (CABG) এবং ক্ষতিগ্রস্ত হার্ট ভালভ প্রতিস্থাপন করা হয়।',
        detailedContentEn: `### 1. Indications for CABG
- Left Main Coronary Artery stenosis $\ge 50\%$.
- Triple Vessel Disease (3VD) involving LAD, LCx, and RCA, particularly in patients with **Diabetes Mellitus** or impaired LV function ($EF < 50\%$).
- Complex multi-vessel CAD with high anatomical complexity (SYNTAX score $> 22$).
- Failed PCI with ongoing ischemia or mechanical complications of MI (VSR, papillary muscle rupture).

### 2. Surgical Conduits & Patency Rates
- **Left Internal Mammary Artery (LIMA)**: Gold standard conduit anastomosed to the **LAD** (*LIMA-to-LAD*). Exceptional **10-year patency rate $>90-95\%$** due to continuous endothelial nitric oxide production and resistance to atherosclerosis.
- **Great Saphenous Vein (GSV)**: Harvested from lower extremity; reversed to prevent venous valve obstruction. 10-year patency rate approximately $50-60\%$.
- **Radial Artery**: High patency ($>85\%$ at 5 years); requires calcium channel blocker (Diltiazem) to prevent arterial spasm.

### 3. Mechanical vs Bioprosthetic Valves
- **Mechanical Valves (e.g., Bileaflet St. Jude)**:
  - *Advantage*: High durability, lasts a lifetime (>25–30 years).
  - *Disadvantage*: High thromboembolic risk; requires **lifelong Warfarin anticoagulation** with target INR monitoring (Aortic: 2.0–3.0, Mitral: 2.5–3.5). Preferred in young patients ($<50-60$ years).
- **Bioprosthetic (Tissue) Valves (Bovine Pericardial / Porcine)**:
  - *Advantage*: Low thrombogenicity, no lifelong Warfarin required (only 3 months post-op).
  - *Disadvantage*: Structural valve degeneration (SVD); lasts 10–15 years. Preferred in elderly patients ($>65$ years) or women of childbearing age wishing to conceive.`,
        detailedContentBn: `### সিএবিজি গ্রাফট ও কপাটিকা তুলনা
- **লিমা-টু-এলএডি (LIMA to LAD)**: সবচেয়ে উৎকৃষ্ট গ্রাফট, ১০ বছর পর ৯০% এর বেশি সচল থাকে।
- **মেকানিক্যাল ভালভ**: আজীবন কার্যকর থাকে কিন্তু আজীবন ওয়ারফারিন (রক্ত পাতলা রাখার ঔষধ) খেতে হয়।
- **টিস্যু ভালভ**: ওয়ারফারিন প্রয়োজন হয় না কিন্তু ১০-১৫ বছর পর নষ্ট হয়ে যায়।`,
        keyTakeaways: [
          'LIMA-to-LAD is the cornerstone of CABG with >90% 10-year patency.',
          'Mechanical heart valves require lifelong Warfarin with strict INR monitoring.',
          'CABG is superior to PCI in diabetic patients with multivessel CAD.'
        ]
      },
      explore: {
        visualType: 'video-animation',
        description: 'Step-by-step 3D surgical procedure: Median sternotomy, Cardiopulmonary bypass cannulation, LIMA harvesting, distal and proximal coronary anastomoses.'
      },
      apply: {
        clinicalCorrelations: [
          '**Prosthetic Valve Thrombosis**: Sudden dyspnea and disappearance of prosthetic clicking sounds in a patient with subtherapeutic INR indicates valve thrombosis requiring emergency thrombolysis or re-operation.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q29', 'cvs-q30']
      },
      revise: {
        highYieldPearls: [
          'Allen test must be performed to confirm dual palmar arch blood supply before harvesting the radial artery.',
          'Off-pump coronary artery bypass (OPCAB) is performed on a beating heart using suction stabilizers, reducing CPB-related systemic inflammatory response.'
        ],
        flashcards: [
          { front: 'Why is LIMA the conduit of choice in CABG?', back: 'Superior 10-year patency rate (>90%) and resistance to atherosclerosis.' },
          { front: 'What is the target INR for a mechanical mitral valve replacement?', back: 'INR 2.5 to 3.5.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 4 Surgery Syllabus',
      'Bailey & Love\'s Short Practice of Surgery, 28th Edition, Chapter 54 (Cardiac Surgery)',
      'Kirklin/Barratt-Boyes Cardiac Surgery, 4th Edition'
    ],
    lastUpdated: '2026-08-28'
  },

  // 11. Phase 4: Obstetrics & Gynaecology
  {
    id: 'cvs-obs-heart-disease-pregnancy',
    title: 'Heart Disease in Pregnancy & Peripartum Cardiomyopathy',
    titleBn: 'গর্ভাবস্থায় হৃদরোগ এবং পেরিপার্টাম কার্ডিওমায়োপ্যাথি',
    phase: 'Phase 4',
    subjectId: 'obs-gynae',
    subjectName: 'Obstetrics & Gynaecology',
    chapterId: 'cvs-obs',
    system: 'cardiovascular',
    learningObjectives: [
      'Explain normal maternal cardiovascular physiological adaptations (plasma volume expansion, cardiac output increase by 40-50%).',
      'Classify maternal risk using Modified WHO Risk Classification of Maternal Cardiovascular Disease.',
      'Manage Rheumatic Mitral Stenosis and prosthetic heart valves during pregnancy (anticoagulation strategy).',
      'Recognize Peripartum Cardiomyopathy (PPCM) diagnostic criteria, clinical presentation, and delivery plan.'
    ],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.2.0',
    author: {
      name: 'Prof. Dr. Ferdousi Begum',
      designation: 'Professor of Obstetrics & Gynaecology',
      institution: 'Dhaka Medical College'
    },
    stages: {
      learn: {
        overviewEn: 'Maternal cardiovascular adaptations begin in the 5th week of gestation. Plasma volume increases by 45-50% and cardiac output rises by 40-50%. Pre-existing cardiac lesions (most commonly Rheumatic Mitral Stenosis in Bangladesh) decompensate during the 28-32 week window, during labor, and immediately postpartum.',
        overviewBn: 'গর্ভাবস্থায় রক্তের প্লাজমার পরিমাণ প্রায় ৫০% বৃদ্ধি পায় এবং কার্ডিয়াক আউটপুট বেড়ে যায়। যাদের পূর্ব থেকেই রিউম্যাটিক ভালভুলার সমস্যা থাকে, ২৮-৩২ সপ্তাহে এবং প্রসবের সময় তাদের হার্ট ফেইলিউর হওয়ার মারাত্মক ঝুঁকি থাকে।',
        detailedContentEn: `### 1. Maternal Hemodynamic Peaks of Vulnerability
1. **28 to 32 Weeks of Gestation**: Maximum intravascular hypervolemia.
2. **Second Stage of Labor**: Each uterine contraction autotransfuses 300–500 mL of blood into the systemic circulation; bearing down (Valsalva) causes dramatic blood pressure and cardiac output fluctuations.
3. **Immediately Postpartum (First 24–48 hours)**: Relief of caval compression by the gravid uterus plus autotransfusion from the contracting uterus causes an acute increase in venous return and cardiac output (highest risk of acute pulmonary edema).

### 2. Rheumatic Mitral Stenosis in Pregnancy
- Most common acquired heart lesion in pregnant women in developing nations.
- Fixed obstruction across mitral valve prevents adequate LV filling during physiological tachycardia.
- Increased transmitral pressure gradient causes marked elevation in left atrial pressure -> **Acute Pulmonary Edema** and **Atrial Fibrillation**.
- **Management**: Restrict physical activity, salt restriction, **Beta-blockers (Metoprolol)** to slow heart rate and prolong diastolic filling, and Loop Diuretics for pulmonary congestion.

### 3. Anticoagulation in Pregnant Women with Mechanical Valves
- **Warfarin**: Crosses placenta; causes **Warfarin Embryopathy** (nasal hypoplasia, stippled epiphyses, CNS defects) when taken between 6 and 12 weeks of gestation.
- **Protocol**:
  - *Weeks 1–6*: Warfarin (or LMWH).
  - *Weeks 6–12*: Therapeutic Low-Molecular-Weight Heparin (LMWH with anti-Xa monitoring $0.8–1.2$ IU/mL) IF Warfarin dose $>5$ mg/day.
  - *Weeks 12–36*: Warfarin can be safely resumed.
  - *After 36 Weeks*: Switch to IV Unfractionated Heparin before planned delivery to avoid fetal intracranial hemorrhage during labor.

### 4. Peripartum Cardiomyopathy (PPCM)
- Heart failure secondary to LV systolic dysfunction ($EF < 45\%$) developing in the last month of pregnancy or within 5 months postpartum in the absence of other identifiable causes.
- Triggers: Vasculotoxic cleavage fragments of prolactin ($16\\text{ kDa}$ prolactin).
- Therapy: Standard HFrEF therapy (Bromocriptine to suppress prolactin, ACEi/ARNI postpartum only, Beta-blockers, Diuretics). Avoid ACEi/ARNI/MRA while fetus is in utero.`,
        detailedContentBn: `### গর্ভাবস্থায় হৃদরোগ ব্যবস্থাপনার মূল বিষয়
- **সবচেয়ে ঝুঁকিপূর্ণ সময়**: ২৮-৩২ সপ্তাহ এবং প্রসবের ঠিক পরপরই (পালমোনারি ইডিমা হতে পারে)।
- **ওয়ারফারিন সতর্কতা**: গর্ভাবস্থার প্রথম ট্রাইমেস্টারে (৬-১২ সপ্তাহে) ওয়ারফারিন ভ্রূণের বিকলাঙ্গতা ঘটায়।
- **মিত্রাল স্টেনোসিসে পালস নিয়ন্ত্রণ**: হার্ট রেট নিয়ন্ত্রণের জন্য মেটোপ্রোলল নির্দেশিত।`,
        keyTakeaways: [
          'Cardiac output increases by 40-50% during pregnancy, peaking at 28-32 weeks and immediately postpartum.',
          'Rheumatic Mitral Stenosis is the most common maternal heart disease in Bangladesh.',
          'Warfarin causes teratogenicity in weeks 6-12; therapeutic LMWH or low-dose Warfarin is used.'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        description: 'Maternal hemodynamic curve across trimesters, labor, and postpartum showing plasma volume, heart rate, and stroke volume.'
      },
      apply: {
        clinicalCorrelations: [
          '**Labor in Cardiac Patients**: Epidural analgesia, left lateral tilt to prevent aortocaval compression, and assisted second stage of labor (vacuum or forceps) to avoid maternal pushing.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q31', 'cvs-q32']
      },
      revise: {
        highYieldPearls: [
          'ACE inhibitors, ARBs, and ARNI are strictly contraindicated during pregnancy due to fetal renal dysgenesis and oligohydramnios.',
          'Modified WHO Class IV cardiac conditions (Severe symptomatic aortic stenosis, pulmonary arterial hypertension) carry up to 50% maternal mortality; pregnancy is contraindicated.'
        ],
        flashcards: [
          { front: 'Which acquired heart disease most frequently causes pulmonary edema during pregnancy in Bangladesh?', back: 'Rheumatic Mitral Stenosis.' },
          { front: 'Why are ACE inhibitors contraindicated in pregnancy?', back: 'They cause fetal renal agenesis/dysfunction and oligohydramnios.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 4 Obs & Gynae Syllabus',
      'DC Dutta\'s Textbook of Obstetrics, 9th Edition, Chapter 20',
      'ESC 2018 Guidelines for the management of cardiovascular diseases during pregnancy'
    ],
    lastUpdated: '2026-09-02'
  },

  // 12. Phase 4: Paediatrics / Allied
  {
    id: 'cvs-paed-congenital-heart-diseases',
    title: 'Congenital Heart Diseases: Acyanotic & Cyanotic Shunts',
    titleBn: 'জন্মগত হৃদরোগ: অ্যাসায়ানোটিক ও সায়ানোটিক শান্ট',
    phase: 'Phase 4',
    subjectId: 'paediatrics',
    subjectName: 'Medicine & Allied (Paediatrics)',
    chapterId: 'cvs-paed',
    system: 'cardiovascular',
    learningObjectives: [
      'Classify Congenital Heart Diseases into Acyanotic (VSD, ASD, PDA, Coarctation) and Cyanotic (Tetralogy of Fallot, TGA, Tricuspid Atresia).',
      'Explain the pathophysiology, murmur, and natural history of Ventricular Septal Defect (VSD).',
      'Detail the 4 cardinal anatomical components of Tetralogy of Fallot (TOF) and management of hypercyanotic (Tet) spells.',
      'Explain Eisenmenger Syndrome (reversal of left-to-right shunt to right-to-left shunt).'
    ],
    estimatedMinutes: 25,
    status: 'published',
    version: '1.2.0',
    author: {
      name: 'Prof. Dr. Manzoor Hussain',
      designation: 'Professor & Head of Paediatric Cardiology',
      institution: 'Dhaka Shishu (Children) Hospital'
    },
    stages: {
      learn: {
        overviewEn: 'Congenital heart diseases occur in approximately 8 per 1,000 live births. They are divided based on clinical presence of central cyanosis into Acyanotic (Left-to-Right shunt or obstructive) and Cyanotic (Right-to-Left shunt) lesions.',
        overviewBn: 'জন্মগত হৃদরোগ প্রতি ১০০০ জীবিত শিশুর মধ্যে প্রায় ৮ জনের মধ্যে দেখা যায়। এগুলো প্রধানত অ্যাসায়ানোটিক (VSD, ASD, PDA) এবং সায়ানোটিক (Tetralogy of Fallot, TGA) এই দুই ভাগে বিভক্ত।',
        detailedContentEn: `### 1. Ventricular Septal Defect (VSD)
- Most common congenital heart disease (25–30% of all CHD). Most frequent variety is **Perimembranous VSD** (75–80%).
- **Hemodynamics**: Left-to-right shunt due to high left ventricular pressure. Leads to pulmonary overcirculation, left atrial and left ventricular volume overload.
- **Physical Findings**: **Harsh holosystolic (pansystolic) murmur** loudest at the lower left sternal border with a systolic thrill. Smaller defects (Maladie de Roger) produce louder murmurs than large defects.
- **Eisenmenger Syndrome**: Long-standing unrepaired large VSD causes severe pulmonary vascular remodeling and pulmonary arterial hypertension ($PAH$). When pulmonary resistance exceeds systemic resistance, the shunt **reverses (Right-to-Left)** -> uncorrectable central cyanosis, clubbing, and polycythemia.

### 2. Tetralogy of Fallot (TOF)
- Most common **Cyanotic Congenital Heart Disease** after 1 year of age.
- **Anatomical Tetrad**:
  1. *Subpulmonary / Infundibular Pulmonary Stenosis* (determines severity of cyanosis).
  2. *Large Ventricular Septal Defect*.
  3. *Overriding Aorta* (straddles the VSD).
  4. *Right Ventricular Hypertrophy* (secondary adaptation).
- **Physical Findings**: Ejection systolic murmur in left upper sternal border (from pulmonary stenosis, not VSD), single loud S2, clubbing, boot-shaped heart on CXR (*coeur en sabot*).
- **Hypercyanotic (Tet) Spell**: Acute spasm of infundibular muscle triggered by crying/feeding/fever. Leads to severe right-to-left shunting, profound cyanosis, and syncope.
  - *Emergency Treatment*: **Knee-chest position** (increases systemic vascular resistance, forcing blood into pulmonary artery), High-flow $O_2$, **Morphine** (relaxes infundibulum and calms child), IV fluids, and **Propranolol / Phenylephrine**.`,
        detailedContentBn: `### ভিএসডি ও টেট্রালজি অব ফ্যালো
- **ভিএসডি (VSD)**: সবচেয়ে সাধারণ জন্মগত রোগ, বামদিকের ৪র্থ ইন্টারকোস্টাল স্পেসে প্যানসিস্টোলিক মারমার পাওয়া যায়।
- **টেট্রালজি অব ফ্যালো (TOF)**: ৪টি ত্রুটি (পালমোনারি স্টেনোসিস, ভিএসডি, ওভাররাইডিং অ্যাওর্টা ও আরভিএইচ)। এক্স-রে তে বুট-আকৃতির হার্ট (Boot-shaped heart) দেখা যায়।
- **হিট স্পেল (Tet Spell) চিকিৎসা**: হাঁটু-বুক পজিশন (Knee-chest position), অক্সিজেন ও মরফিন।`,
        keyTakeaways: [
          'VSD is the most common congenital heart disease, producing a harsh pansystolic murmur at the left lower sternal border.',
          'Tetralogy of Fallot is the most common cyanotic CHD, characterized by pulmonary stenosis, VSD, overriding aorta, and RVH.',
          'Knee-chest position in a Tet spell increases SVR, reducing right-to-left shunting.'
        ]
      },
      explore: {
        visualType: 'interactive-diagram',
        description: 'Interactive comparison of normal fetal circulation vs VSD vs Tetralogy of Fallot hemodynamics.'
      },
      apply: {
        clinicalCorrelations: [
          '**Patent Ductus Arteriosus (PDA)**: Continuous "machinery" murmur at left infraclavicular area. In premature neonates, close with **Indomethacin / Ibuprofen** (inhibits prostaglandins). In ductal-dependent cyanotic lesions (e.g. Transposition of Great Arteries), keep ductus open with **PGE1 (Alprostadil)** infusion.'
        ]
      },
      practice: {
        mcqIds: ['cvs-q33', 'cvs-q34', 'cvs-q35']
      },
      revise: {
        highYieldPearls: [
          'ASD (Secundum type) produces wide fixed splitting of S2 and ejection systolic murmur in pulmonary area due to increased flow across pulmonary valve.',
          'Coarctation of aorta presents with upper extremity hypertension and weak, delayed femoral pulses (radio-femoral delay).'
        ],
        flashcards: [
          { front: 'What are the 4 anatomical defects of Tetralogy of Fallot?', back: '1. Pulmonary stenosis, 2. VSD, 3. Overriding aorta, 4. Right ventricular hypertrophy.' },
          { front: 'Why does a child with TOF squat during a cyanotic spell?', back: 'Squatting kinks femoral arteries, increasing systemic vascular resistance and forcing blood through lungs.' }
        ]
      }
    },
    references: [
      'BM&DC MBBS Curriculum (2020/2026), Phase 4 Paediatrics Syllabus',
      'Nelson Textbook of Pediatrics, 21st Edition, Part XIX (The Cardiovascular System)',
      'Ghai Essential Pediatrics, 9th Edition'
    ],
    lastUpdated: '2026-09-07'
  }
];

// 50 BMDC-Aligned High-Yield Cardiovascular Questions
export const CARDIOVASCULAR_PILOT_QUESTIONS: QuestionBankItem[] = [
  {
    id: 'cvs-q1',
    subject: 'Anatomy',
    phase: 'Phase 1',
    topic: 'Heart Morphology',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'In a healthy adult subject, where is the apex beat of the heart normally located upon precordial examination?',
    questionStemBn: 'একজন সুস্থ প্রাপ্তবয়স্ক ব্যক্তির হৃদপিণ্ডের এপেক্স বিট (Apex beat) কোথায় অনুভূত হয়?',
    options: [
      'Right 4th intercostal space, midclavicular line',
      'Left 5th intercostal space, 9 cm from midsternal line (midclavicular line)',
      'Left 2nd intercostal space, parasternal border',
      'Left 6th intercostal space, anterior axillary line',
      'Subxiphoid area in midline'
    ],
    correctOptionIndex: 1,
    explanation: 'The apex of the heart is formed entirely by the left ventricle and is normally located in the left 5th intercostal space, approximately 9 cm from the midsternal line (inside the midclavicular line).',
    explanationBn: 'হৃদপিণ্ডের এপেক্স সম্পূর্ণভাবে বাম নিলয় দ্বারা গঠিত এবং এটি বামদিকের ৫ম ইন্টারকোস্টাল স্পেসে মিড-ক্ল্যাভিকুলার লাইনে অনুভূত হয়।',
    bmdcReference: 'Datta Essentials of Human Anatomy (Thorax), 9th ed.'
  },
  {
    id: 'cvs-q2',
    subject: 'Anatomy',
    phase: 'Phase 1',
    topic: 'Coronary Anatomy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which coronary artery branch supplies the anterior two-thirds of the interventricular septum and the cardiac apex?',
    questionStemBn: 'কোন করোনারি ধমনী ইন্টারভেন্ট্রিকুলার সেপ্টামের অ্যান্টেরিয়র দুই-তৃতীয়াংশ এবং এপেক্সে রক্ত সরবরাহ করে?',
    options: [
      'Right Marginal Artery',
      'Posterior Descending Artery (PDA)',
      'Left Anterior Descending Artery (LAD)',
      'Left Circumflex Artery (LCx)',
      'Obtuse Marginal Artery'
    ],
    correctOptionIndex: 2,
    explanation: 'The Left Anterior Descending (LAD) artery runs in the anterior interventricular groove and supplies the anterior 2/3 of the interventricular septum, the anterior LV wall, and the cardiac apex.',
    bmdcReference: 'Gray\'s Anatomy for Students, 4th ed.'
  },
  {
    id: 'cvs-q3',
    subject: 'Anatomy',
    phase: 'Phase 1',
    topic: 'Right Atrium Features',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'The sinoatrial (SA) node is anatomically situated in the right atrium at which location?',
    options: [
      'In the floor of the right atrium near the coronary sinus',
      'At the junction of the superior vena cava and right atrium near the upper end of the crista terminalis',
      'Within the membranous part of the interventricular septum',
      'In the center of the fossa ovalis',
      'At the base of the anterior tricuspid leaflet'
    ],
    correctOptionIndex: 1,
    explanation: 'The SA node is situated in the wall of the right atrium in the upper part of the sulcus terminalis / crista terminalis, just anterolateral to the junction of the SVC with the right atrium.',
    bmdcReference: 'Gray\'s Anatomy for Students, 4th ed.'
  },
  {
    id: 'cvs-q4',
    subject: 'Anatomy',
    phase: 'Phase 1',
    topic: 'Conducting System',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'The moderator band (septomarginal trabecula) of the right ventricle is clinically important because it conveys:',
    options: [
      'The SA nodal pacemaker fibers',
      'The right bundle branch of the Atrioventricular (His) bundle',
      'The left bundle branch',
      'The coronary sinus venous blood',
      'Sympathetic cardiac accelerator nerves only'
    ],
    correctOptionIndex: 1,
    explanation: 'The moderator band connects the interventricular septum to the base of the anterior papillary muscle in the right ventricle, carrying the right bundle branch to ensure synchronous contraction.',
    bmdcReference: 'Datta Essentials of Human Anatomy, 9th ed.'
  },
  {
    id: 'cvs-q5',
    subject: 'Physiology',
    phase: 'Phase 1',
    topic: 'Cardiac Cycle',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'The First Heart Sound (S1) is produced primarily by the closure of which pair of cardiac valves?',
    options: [
      'Aortic and Pulmonary valves',
      'Mitral and Tricuspid valves',
      'Mitral and Aortic valves',
      'Tricuspid and Pulmonary valves',
      'Aortic and Eustachian valves'
    ],
    correctOptionIndex: 1,
    explanation: 'S1 marks the onset of ventricular systole (isovolumetric contraction) and is caused by the sudden closure of the atrioventricular (Mitral and Tricuspid) valves.',
    bmdcReference: 'Guyton and Hall Textbook of Medical Physiology, 14th ed. Chapter 9.'
  },
  {
    id: 'cvs-q6',
    subject: 'Physiology',
    phase: 'Phase 1',
    topic: 'Pressure-Volume Loops',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'If a patient has an End-Diastolic Volume (EDV) of 120 mL and an End-Systolic Volume (ESV) of 48 mL, what is the calculated Ejection Fraction?',
    options: [
      '40%',
      '50%',
      '60%',
      '72%',
      '80%'
    ],
    correctOptionIndex: 2,
    explanation: 'Stroke Volume (SV) = EDV - ESV = 120 - 48 = 72 mL. Ejection Fraction (EF) = (SV / EDV) × 100% = (72 / 120) × 100% = 60%.',
    bmdcReference: 'Guyton and Hall Textbook of Medical Physiology, 14th ed.'
  },
  {
    id: 'cvs-q7',
    subject: 'Physiology',
    phase: 'Phase 1',
    topic: 'Coronary Perfusion',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Left coronary blood flow to the subendocardial myocardium occurs predominantly during which phase of the cardiac cycle?',
    options: [
      'Isovolumetric contraction',
      'Rapid ventricular ejection',
      'Reduced ventricular ejection',
      'Diastole (Isovolumetric relaxation and rapid filling)',
      'Atrial systole'
    ],
    correctOptionIndex: 3,
    explanation: 'During systole, strong intramyocardial compressive forces collapse subendocardial capillaries in the left ventricle. Over 70-80% of left coronary flow occurs during ventricular diastole when the muscle relaxes.',
    bmdcReference: 'Ganong\'s Review of Medical Physiology, 26th ed.'
  },
  {
    id: 'cvs-q8',
    subject: 'Physiology',
    phase: 'Phase 1',
    topic: 'Jugular Venous Pulse',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'The "a wave" of the internal jugular venous pulse (JVP) corresponds to:',
    options: [
      'Atrial relaxation',
      'Active contraction of the right atrium',
      'Bulging of the tricuspid valve during ventricular systole',
      'Passive filling of the right atrium against closed tricuspid valve',
      'Rapid emptying of the right atrium'
    ],
    correctOptionIndex: 1,
    explanation: 'The "a wave" in the JVP is produced by right atrial systole (contraction) generating retrograde pressure into the venae cavae.',
    bmdcReference: 'Guyton and Hall Textbook of Medical Physiology, 14th ed.'
  },
  {
    id: 'cvs-q9',
    subject: 'Biochemistry',
    phase: 'Phase 1',
    topic: 'Cardiac Biomarkers',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A 55-year-old male presents 4 days following an acute myocardial infarction with recurrent severe chest pain. Which biomarker is most reliable to evaluate for suspected re-infarction?',
    options: [
      'Cardiac Troponin I (cTnI)',
      'Cardiac Troponin T (cTnT)',
      'Creatine Kinase-MB (CK-MB)',
      'Lactate Dehydrogenase (LDH-1)',
      'Brain Natriuretic Peptide (BNP)'
    ],
    correctOptionIndex: 2,
    explanation: 'CK-MB normalizes within 48 to 72 hours post-MI, whereas Troponins remain elevated for 7-14 days. A secondary rise in CK-MB at Day 4 confirms acute re-infarction.',
    bmdcReference: 'Harper\'s Illustrated Biochemistry, 32nd ed.'
  },
  {
    id: 'cvs-q10',
    subject: 'Biochemistry',
    phase: 'Phase 1',
    topic: 'Myocardial Energy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Under normal aerobic resting conditions, the human myocardium derives approximately 60-70% of its ATP from the oxidation of:',
    options: [
      'Glucose via glycolysis',
      'Free fatty acids via beta-oxidation',
      'Ketone bodies',
      'Branched-chain amino acids',
      'Lactic acid'
    ],
    correctOptionIndex: 1,
    explanation: 'Under normal well-oxygenated conditions, fatty acid beta-oxidation provides 60-70% of myocardial energy, with glucose/lactate contributing the remainder.',
    bmdcReference: 'Harper\'s Illustrated Biochemistry, 32nd ed.'
  },
  {
    id: 'cvs-q11',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    topic: 'Nitrates',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Co-administration of Sublingual Nitroglycerin with Sildenafil is strictly contraindicated because it causes severe refractory hypotension through synergism in:',
    options: [
      'Inhibition of adenylyl cyclase',
      'Massive accumulation of intracellular cyclic GMP (cGMP)',
      'Blockade of beta-1 adrenergic receptors',
      'Direct opening of L-type calcium channels',
      'Inhibition of endothelial nitric oxide synthase'
    ],
    correctOptionIndex: 1,
    explanation: 'Nitroglycerin stimulates soluble guanylyl cyclase to produce cGMP, while Sildenafil prevents cGMP breakdown by inhibiting PDE-5. Excessive cGMP leads to profound, life-threatening vasodilation and shock.',
    bmdcReference: 'Katzung Basic & Clinical Pharmacology, 15th ed.'
  },
  {
    id: 'cvs-q12',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    topic: 'Heart Failure GDMT',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which of the following beta-blockers has been proven in large randomized clinical trials to significantly reduce mortality in patients with HFrEF?',
    options: [
      'Atenolol',
      'Propranolol',
      'Carvedilol',
      'Esmolol',
      'Labetalol'
    ],
    correctOptionIndex: 2,
    explanation: 'Only three beta-blockers have documented mortality benefits in chronic HFrEF: Carvedilol, Bisoprolol, and extended-release Metoprolol Succinate.',
    bmdcReference: 'Katzung Basic & Clinical Pharmacology, 15th ed.'
  },
  {
    id: 'cvs-q13',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    topic: 'Digoxin Toxicity',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which electrolyte disturbance most significantly potentiates Digoxin toxicity and precipitates fatal cardiac arrhythmias?',
    options: [
      'Hyperkalemia',
      'Hypokalemia',
      'Hypernatremia',
      'Hypophosphatemia',
      'Hypercalcemia only'
    ],
    correctOptionIndex: 1,
    explanation: 'Digoxin competes with potassium ions (K+) for binding sites on the myocardial Na+/K+ ATPase enzyme. Hypokalemia increases Digoxin binding, dramatically enhancing toxicity.',
    bmdcReference: 'Katzung Basic & Clinical Pharmacology, 15th ed.'
  },
  {
    id: 'cvs-q14',
    subject: 'Pharmacology',
    phase: 'Phase 2',
    topic: 'SGLT2 Inhibitors',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Dapagliflozin and Empagliflozin reduce cardiovascular mortality and heart failure hospitalization primarily by which novel mechanism?',
    options: [
      'Direct stimulation of cardiac Ryanodine receptors',
      'Inhibition of renal SGLT2 cotransporter promoting osmotic natriuresis and improving myocardial metabolism',
      'Direct blockade of Endothelin-1 receptors',
      'Enhancement of cardiac phospholamban phosphorylation',
      'Selective blockade of Alpha-1 adrenergic receptors'
    ],
    correctOptionIndex: 1,
    explanation: 'SGLT2 inhibitors block sodium-glucose reabsorption in proximal tubules, leading to osmotic diuresis, reduced preload/afterload, decreased cardiac fibrosis, and optimized myocardial energetics.',
    bmdcReference: 'ESC 2023 Heart Failure Guidelines'
  },
  {
    id: 'cvs-q15',
    subject: 'Forensic Medicine',
    phase: 'Phase 2',
    topic: 'Sudden Cardiac Death Autopsy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'During autopsy of a suspected acute myocardial infarction case, Triphenyltetrazolium Chloride (TTC) stain identifies infarcted myocardium by turning it:',
    options: [
      'Deep brick-red',
      'Pale unstained / white-grey',
      'Dark blue',
      'Bright yellow',
      'Deep violet'
    ],
    correctOptionIndex: 1,
    explanation: 'Viable myocardium contains intact dehydrogenase enzymes that reduce TTC into a brick-red precipitate. Infarcted necrotic myocardium lacks dehydrogenase and remains pale/unstained.',
    bmdcReference: 'Knight\'s Forensic Pathology, 4th ed.'
  },
  {
    id: 'cvs-q16',
    subject: 'Forensic Medicine',
    phase: 'Phase 2',
    topic: 'Myocardial Rupture',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Following an acute transmural myocardial infarction, free wall rupture leading to fatal cardiac tamponade is most likely to occur at which post-MI interval?',
    options: [
      'First 2 to 4 hours',
      'Day 3 to Day 7',
      'Day 14 to Day 21',
      'After 2 months',
      'At 1 year'
    ],
    correctOptionIndex: 1,
    explanation: 'Between Day 3 and 7, macrophage degradation and lysis of dead myocytes are maximal, while collagen deposition by granulation tissue is just beginning, rendering the ventricular wall maximally vulnerable to rupture.',
    bmdcReference: 'Robbins Pathologic Basis of Disease, 10th ed.'
  },
  {
    id: 'cvs-q17',
    subject: 'Pathology',
    phase: 'Phase 3',
    topic: 'Atherosclerosis',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'In the pathogenesis of atherosclerosis, foam cells found in the intimal fatty streak are primarily derived from:',
    options: [
      'Endothelial cells',
      'Neutrophils',
      'Macrophages that have engulfed oxidized low-density lipoproteins (oxLDL)',
      'T-helper lymphocytes',
      'Fibroblasts'
    ],
    correctOptionIndex: 2,
    explanation: 'Monocytes migrate into the subendothelial space, differentiate into macrophages, and utilize scavenger receptors (CD36/SR-A) to ingest oxidized LDL, transforming into lipid-laden foam cells.',
    bmdcReference: 'Robbins Pathologic Basis of Disease, 10th ed. Chapter 11.'
  },
  {
    id: 'cvs-q18',
    subject: 'Pathology',
    phase: 'Phase 3',
    topic: 'Plaque Vulnerability',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which histological feature is characteristic of a "vulnerable" atherosclerotic plaque prone to acute rupture and thrombosis?',
    options: [
      'Thick, densely collagenized fibrous cap with few inflammatory cells',
      'Thin fibrous cap (<65 micrometers), large lipid-rich necrotic core, and abundant macrophages',
      'Extensive circumferential calcification without lipid core',
      'Absence of intraplaque neovascularization',
      'High density of smooth muscle cells'
    ],
    correctOptionIndex: 1,
    explanation: 'Vulnerable plaques are characterized by a thin fibrous cap (<65 um), a large necrotic core (>40% of plaque volume), and high macrophage content that secretes matrix metalloproteinases.',
    bmdcReference: 'Robbins Pathologic Basis of Disease, 10th ed.'
  },
  {
    id: 'cvs-q19',
    subject: 'Pathology',
    phase: 'Phase 3',
    topic: 'Histology of MI',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Coagulative necrosis, contraction bands, and dense infiltration of neutrophils are classic histological findings in a myocardial infarct aged:',
    options: [
      '1 to 2 hours',
      '24 to 72 hours (1 to 3 days)',
      '10 to 14 days',
      '4 to 6 weeks',
      '3 months'
    ],
    correctOptionIndex: 1,
    explanation: 'Neutrophilic infiltration reaches its peak at 24 to 72 hours (Days 1 to 3), accompanied by total loss of nuclei (karyolysis) and hypereosinophilic coagulative necrosis.',
    bmdcReference: 'Robbins Pathologic Basis of Disease, 10th ed.'
  },
  {
    id: 'cvs-q20',
    subject: 'Microbiology',
    phase: 'Phase 3',
    topic: 'Infective Endocarditis',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which organism is the most frequent cause of subacute infective endocarditis on pre-damaged native valves following dental procedures?',
    options: [
      'Staphylococcus aureus',
      'Viridans group Streptococci (e.g., S. sanguinis, S. mitis)',
      'Staphylococcus epidermidis',
      'Pseudomonas aeruginosa',
      'Enterococcus faecalis'
    ],
    correctOptionIndex: 1,
    explanation: 'Viridans streptococci are normal commensals of the oral cavity. Following dental manipulation, transient bacteremia allows these organisms to adhere to pre-damaged valves via dextran production.',
    bmdcReference: 'Jawetz Medical Microbiology, 28th ed.'
  },
  {
    id: 'cvs-q21',
    subject: 'Microbiology',
    phase: 'Phase 3',
    topic: 'Duke Criteria',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'According to the Modified Duke Criteria for Infective Endocarditis, which finding is classified as a MAJOR criterion?',
    options: [
      'Fever >= 38.0 C',
      'Osler nodes on fingertips',
      'New valvular regurgitation or mobile oscillating vegetation on echocardiography',
      'Janeway lesions on palms',
      'Positive Rheumatoid Factor'
    ],
    correctOptionIndex: 2,
    explanation: 'Major criteria include: 1) Typical positive blood cultures from 2 separate draws, and 2) Evidence of endocardial involvement on echocardiography (vegetation, abscess, new dehiscence, or new regurgitation).',
    bmdcReference: 'ESC 2023 Endocarditis Guidelines'
  },
  {
    id: 'cvs-q22',
    subject: 'Community Medicine',
    phase: 'Phase 3',
    topic: 'CVD Epidemiology',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'According to WHO guidelines for cardiovascular disease prevention, what is the recommended maximum daily dietary salt intake for adults?',
    options: [
      'Less than 2 grams per day',
      'Less than 5 grams per day (approx. 1 level teaspoon)',
      '10 to 12 grams per day',
      '15 grams per day',
      'No specific limit'
    ],
    correctOptionIndex: 1,
    explanation: 'WHO recommends consuming less than 5 grams of salt per day (equivalent to less than 2,000 mg of sodium) to reduce blood pressure and risk of cardiovascular disease.',
    bmdcReference: 'Park\'s Textbook of Preventive and Social Medicine, 26th ed.'
  },
  {
    id: 'cvs-q23',
    subject: 'Community Medicine',
    phase: 'Phase 3',
    topic: 'WHO STEPS',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'In the WHO STEPS surveillance framework for NCD risk factors, Step 2 comprises:',
    options: [
      'Questionnaire on behavioral factors (diet, tobacco, exercise)',
      'Physical body measurements (Blood pressure, height, weight, BMI, waist circumference)',
      'Biochemical laboratory tests (fasting glucose, lipids)',
      'Genetic mapping',
      'Coronary angiography'
    ],
    correctOptionIndex: 1,
    explanation: 'Step 1 = Behavioral questionnaire; Step 2 = Physical measurements (BP, anthropometry); Step 3 = Biochemical measurements (glucose, cholesterol).',
    bmdcReference: 'Park\'s Textbook of Preventive and Social Medicine, 26th ed.'
  },
  {
    id: 'cvs-q24',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: '12-Lead ECG STEMI',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A 60-year-old male presents with severe crushing chest pain. 12-lead ECG reveals 3 mm ST-segment elevation in leads II, III, and aVF with ST depression in I and aVL. Which coronary artery is occluded?',
    options: [
      'Left Anterior Descending Artery (LAD)',
      'Right Coronary Artery (RCA)',
      'Left Circumflex Artery (LCx)',
      'Left Main Stem',
      'Obtuse Marginal 2'
    ],
    correctOptionIndex: 1,
    explanation: 'ST elevation in leads II, III, and aVF localizes to the inferior wall of the left ventricle, supplied by the Right Coronary Artery (RCA) in 85-90% of individuals.',
    bmdcReference: 'Davidson\'s Principles and Practice of Medicine, 24th ed.'
  },
  {
    id: 'cvs-q25',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: 'Primary PCI Window',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'What is the guideline-recommended target Door-to-Balloon time for emergency Primary Percutaneous Coronary Intervention (PCI) in acute STEMI?',
    options: [
      'Within 30 minutes',
      'Within 60 minutes',
      'Within 90 minutes',
      'Within 180 minutes',
      'Within 12 hours'
    ],
    correctOptionIndex: 2,
    explanation: 'The standard target Door-to-Balloon time for Primary PCI at a PCI-capable center is within 90 minutes of hospital presentation.',
    bmdcReference: 'ESC 2023 ACS Guidelines'
  },
  {
    id: 'cvs-q26',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: 'Right Ventricular Infarction',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A patient with an acute Inferior STEMI develops hypotension (BP 75/40 mmHg), distended neck veins, and clear lung fields on auscultation. What is the most appropriate initial therapy?',
    options: [
      'IV Furosemide bolus',
      'Sublingual Nitroglycerin spray',
      'Rapid IV Normal Saline fluid challenge',
      'Oral Metoprolol',
      'Immediate IV Verapamil'
    ],
    correctOptionIndex: 2,
    explanation: 'This triad (hypotension, raised JVP, clear lungs) indicates Right Ventricular Infarction. The RV is preload-dependent; vasodilators and diuretics are contraindicated, and immediate IV fluid resuscitation is required.',
    bmdcReference: 'Davidson\'s Principles and Practice of Medicine, 24th ed.'
  },
  {
    id: 'cvs-q27',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: 'NSTEMI vs Unstable Angina',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which critical diagnostic finding distinguishes Non-ST-Elevation Myocardial Infarction (NSTEMI) from Unstable Angina (UA)?',
    options: [
      'Presence of ST depression on ECG',
      'Duration of chest pain > 20 minutes',
      'Elevation of cardiac biomarkers (high-sensitivity Troponin above 99th percentile)',
      'Patient age > 65 years',
      'Relief with sublingual nitroglycerin'
    ],
    correctOptionIndex: 2,
    explanation: 'Both NSTEMI and UA present without persistent ST elevation, but NSTEMI results in myocardial cell death manifested by elevated cardiac troponins, whereas Unstable Angina does not cause troponin leak.',
    bmdcReference: 'Davidson\'s Principles and Practice of Medicine, 24th ed.'
  },
  {
    id: 'cvs-q28',
    subject: 'Medicine',
    phase: 'Phase 4',
    topic: 'Anterior STEMI Complications',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A patient 3 days post-anterior STEMI suddenly develops acute dyspnea, hypotension, and a new harsh pansystolic murmur loudest at the left sternal border with a palpable thrill. The most likely diagnosis is:',
    options: [
      'Acute pericarditis',
      'Ventricular Septal Rupture (VSR)',
      'Aortic valve endocarditis',
      'Right ventricular outflow obstruction',
      'Post-cardiac injury syndrome (Dressler syndrome)'
    ],
    correctOptionIndex: 1,
    explanation: 'Ventricular septal rupture occurs in 1-2% of transmural MIs (typically day 3-7), creating an acute left-to-right shunt characterized by a loud pansystolic murmur, parasternal thrill, and biventricular failure.',
    bmdcReference: 'Davidson\'s Principles and Practice of Medicine, 24th ed.'
  },
  {
    id: 'cvs-q29',
    subject: 'Surgery',
    phase: 'Phase 4',
    topic: 'CABG Conduits',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which bypass conduit provides the highest long-term patency rate (>90% at 10 years) when grafted to the Left Anterior Descending (LAD) artery?',
    options: [
      'Reversed Great Saphenous Vein (GSV)',
      'Left Internal Mammary Artery (LIMA)',
      'Radial Artery',
      'Right Gastroepiploic Artery',
      'Synthetic PTFE graft'
    ],
    correctOptionIndex: 1,
    explanation: 'The Left Internal Mammary Artery (LIMA) anastomosed to the LAD is the standard of care in CABG, maintaining >90-95% patency at 10 years due to inherent anti-atherogenic endothelial properties.',
    bmdcReference: 'Bailey & Love\'s Short Practice of Surgery, 28th ed.'
  },
  {
    id: 'cvs-q30',
    subject: 'Surgery',
    phase: 'Phase 4',
    topic: 'Prosthetic Heart Valves',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A 28-year-old female schoolteacher undergoing Mitral Valve Replacement desires future pregnancies. Which type of prosthetic valve is generally preferred to avoid teratogenic anticoagulants?',
    options: [
      'Bileaflet mechanical valve (St. Jude)',
      'Tilting-disc mechanical valve',
      'Bioprosthetic (tissue) valve',
      'Caged-ball valve (Starr-Edwards)',
      'Polymer mechanical valve'
    ],
    correctOptionIndex: 2,
    explanation: 'Bioprosthetic valves do not require lifelong Warfarin anticoagulation (avoiding Warfarin embryopathy and bleeding during pregnancy), although they have a limited lifespan (10-15 years).',
    bmdcReference: 'Bailey & Love\'s Short Practice of Surgery, 28th ed.'
  },
  {
    id: 'cvs-q31',
    subject: 'Obs & Gynae',
    phase: 'Phase 4',
    topic: 'Mitral Stenosis in Pregnancy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'During normal pregnancy, maternal cardiac output increases by 40-50%. At which gestational period is a woman with severe Mitral Stenosis at highest risk of acute pulmonary edema?',
    options: [
      '6 to 10 weeks',
      '14 to 18 weeks',
      '28 to 32 weeks and immediately postpartum',
      'Post-term (>42 weeks)',
      '6 weeks postpartum'
    ],
    correctOptionIndex: 2,
    explanation: 'Maternal blood volume expansion peaks at 28-32 weeks, and the sudden autotransfusion from the contracting uterus immediately postpartum creates a dramatic surge in venous return, triggering acute pulmonary congestion.',
    bmdcReference: 'DC Dutta\'s Textbook of Obstetrics, 9th ed.'
  },
  {
    id: 'cvs-q32',
    subject: 'Obs & Gynae',
    phase: 'Phase 4',
    topic: 'Anticoagulation in Pregnancy',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Warfarin administration during the 6th to 12th weeks of gestation is associated with which characteristic fetal abnormality?',
    options: [
      'Ebstein anomaly',
      'Neural tube defects',
      'Warfarin embryopathy (nasal hypoplasia and stippled epiphyses)',
      'Phocomelia',
      'Renal agenesis'
    ],
    correctOptionIndex: 2,
    explanation: 'Warfarin crosses the placenta and inhibits carboxylation of fetal bone proteins, causing nasal hypoplasia, chondrodysplasia punctata (stippled epiphyses), and CNS abnormalities if used in early gestation.',
    bmdcReference: 'DC Dutta\'s Textbook of Obstetrics, 9th ed.'
  },
  {
    id: 'cvs-q33',
    subject: 'Paediatrics',
    phase: 'Phase 4',
    topic: 'Tetralogy of Fallot',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'A 2-year-old child with known Tetralogy of Fallot is brought to the emergency department during a severe cyanotic "Tet spell". What is the first-line bedside maneuver to relieve the spell?',
    options: [
      'Place child in Trendelenburg position',
      'Place child in Knee-Chest position',
      'Administer high-dose IV Furosemide',
      'Immediate endotracheal intubation without sedation',
      'Apply ice packs to the chest'
    ],
    correctOptionIndex: 1,
    explanation: 'The Knee-Chest position kinks the femoral arteries and increases Systemic Vascular Resistance (SVR), which shifts the balance of ventricular pressures to reduce right-to-left shunting through the VSD.',
    bmdcReference: 'Nelson Textbook of Pediatrics, 21st ed.'
  },
  {
    id: 'cvs-q34',
    subject: 'Paediatrics',
    phase: 'Phase 4',
    topic: 'Ventricular Septal Defect',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'On precordial auscultation, an uncomplicated isolated moderate Ventricular Septal Defect (VSD) characteristically produces a:',
    options: [
      'Mid-diastolic rumbling murmur with opening snap at the apex',
      'Harsh holosystolic (pansystolic) murmur loudest at the lower left sternal border',
      'Continuous machinery murmur at the left infraclavicular area',
      'Crescendo-decrescendo systolic murmur radiating to both carotids',
      'Early diastolic decrescendo murmur at Erb\'s point'
    ],
    correctOptionIndex: 1,
    explanation: 'VSD produces high-velocity turbulent flow across the interventricular septum throughout systole, generating a loud pansystolic murmur at the lower left sternal border (3rd-4th ICS).',
    bmdcReference: 'Ghai Essential Pediatrics, 9th ed.'
  },
  {
    id: 'cvs-q35',
    subject: 'Paediatrics',
    phase: 'Phase 4',
    topic: 'Patent Ductus Arteriosus',
    system: 'cardiovascular',
    type: 'MCQ',
    questionStem: 'Which pharmacological agent is administered to promote closure of a hemodynamically significant Patent Ductus Arteriosus (PDA) in a premature infant?',
    options: [
      'Prostaglandin E1 (Alprostadil)',
      'Intravenous Indomethacin or Ibuprofen (NSAID)',
      'Dopamine infusion',
      'Digoxin',
      'Nitroglycerin'
    ],
    correctOptionIndex: 1,
    explanation: 'Endogenous prostaglandins maintain ductal patency in utero. Administration of cyclooxygenase inhibitors (Indomethacin or Ibuprofen) blocks prostaglandin synthesis, facilitating PDA closure.',
    bmdcReference: 'Nelson Textbook of Pediatrics, 21st ed.'
  }
];

// 3 Complete Virtual Clinical Cases for Cardiovascular Pilot
export const CARDIOVASCULAR_PILOT_CASES: ClinicalCase[] = [
  // Case 1: Acute Anterior STEMI with Cardiogenic Shock
  {
    id: 'case-cvs-stemi-shock',
    title: 'Acute Anterior STEMI with Cardiogenic Shock',
    difficulty: 'Final Year MBBS',
    phase: 'Phase 4: 5th Year (Clinical)',
    system: 'cardiovascular',
    patientDemographics: {
      name: 'Md. Rafiqul Islam',
      age: 58,
      gender: 'Male',
      occupation: 'Government Officer (Retd.)',
      ward: 'Coronary Care Unit (CCU), DMC Hospital'
    },
    chiefComplaint: 'Severe retrosternal crushing chest pain for 3 hours, associated with heavy sweating, breathlessness, and dizziness.',
    historyOptions: [
      {
        id: 'h1',
        question: 'Can you describe the character, radiation, and onset of your chest pain?',
        patientAnswer: 'It feels like a 100 kg weight on my chest. It started suddenly 3 hours ago while having breakfast, radiating up to my lower jaw and down my left arm. It is continuous and unbearable.',
        clinicalSignificance: 'Classic ischemic retrosternal pain with radiation to dermatomes T1-T4, characteristic of acute transmural coronary occlusion.'
      },
      {
        id: 'h2',
        question: 'Do you have risk factors like Diabetes, Hypertension, Smoking, or family history of heart disease?',
        patientAnswer: 'I have had Type 2 Diabetes for 12 years and Hypertension for 8 years. I smoked 1 pack of cigarettes daily for 30 years but quit 2 years ago.',
        clinicalSignificance: 'Multiple major atherogenic cardiovascular risk factors.'
      },
      {
        id: 'h3',
        question: 'Have you taken any medication since the pain started?',
        patientAnswer: 'My family doctor gave me one Sorbitrate (Nitroglycerin) under the tongue at home, but my dizziness worsened and the pain did not go away.',
        clinicalSignificance: 'Lack of relief and worsening dizziness suggests profound ischemia with hypotension.'
      }
    ],
    initialVitals: {
      bp: '82/50 mmHg',
      hr: 118,
      rr: 28,
      spo2: 89,
      temp: 36.8,
      gcs: 'E4V5M6 (Confused, cold clammy skin)'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Patient is in severe distress, pale, profuse diaphoresis, peripheral cyanosis, and cool clammy extremities.',
        palpation: 'Radial pulse is rapid, thready, low volume (118 bpm). Capillary refill time > 4 seconds.',
        percussion: 'N/A',
        auscultation: 'N/A'
      },
      {
        system: 'Cardiovascular System',
        inspection: 'Precordium is quiet. Elevated Jugular Venous Pressure (JVP +4 cm above sternal angle).',
        palpation: 'Apex beat is displaced to 6th left intercostal space, anterior axillary line, diffuse and hypokinetic. No thrill.',
        percussion: 'Left cardiac border enlarged.',
        auscultation: 'S1 and S2 are soft. Prominent S3 gallop rhythm audible at apex. Soft Grade 2/6 apical pansystolic murmur.'
      },
      {
        system: 'Respiratory System',
        inspection: 'Tachypneic, using accessory muscles of respiration.',
        palpation: 'Vocal fremitus normal bilaterally.',
        percussion: 'Resonant throughout.',
        auscultation: 'Widespread bilateral fine basal and mid-zone end-inspiratory crackles (pulmonary edema).'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-1',
        type: 'ECG',
        resultTitle: 'Emergency 12-Lead ECG',
        reportSummary: 'Marked ST-segment elevation (4-6 mm) across leads V1, V2, V3, V4, V5, I, and aVL with reciprocal ST depression in leads II, III, aVF.',
        revealedValue: 'Extensive Acute Anterior STEMI with high-grade LAD occlusion.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-2',
        type: 'Cardiac Enzymes',
        resultTitle: 'Serum High-Sensitivity Troponin I (hs-cTnI)',
        reportSummary: 'hs-cTnI level: 3,850 ng/L (Normal reference range < 14 ng/L).',
        revealedValue: 'Markedly positive for acute myocardial necrosis.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-3',
        type: 'Chest X-Ray',
        resultTitle: 'Portable Bedside Chest Radiograph',
        reportSummary: 'Cardiomegaly with bilateral perihilar batwing alveolar opacities, upper lobe venous diversion, and Kerley B lines.',
        revealedValue: 'Acute cardiogenic pulmonary edema (Killip Class IV).',
        isKeyInvestigation: true
      },
      {
        id: 'inv-4',
        type: 'Echocardiogram',
        resultTitle: 'Emergency Bedside Echocardiography',
        reportSummary: 'Severe anteroseptal and apical akinesia. Left ventricular ejection fraction (LVEF) severely depressed at 26%.',
        revealedValue: 'Severe LV systolic dysfunction without mechanical defect.',
        isKeyInvestigation: true
      }
    ],
    differentialDiagnoses: [
      'Acute Anterior STEMI with Cardiogenic Shock (Killip IV)',
      'Acute Aortic Dissection Type A with coronary malperfusion',
      'Acute Massive Pulmonary Embolism',
      'Acute Myocarditis'
    ],
    finalDiagnosis: 'Extensive Acute Anterior Myocardial Infarction (STEMI) complicated by Killip Class IV Cardiogenic Shock secondary to acute proximal LAD occlusion.',
    managementOptions: [
      {
        id: 'm1',
        treatmentName: 'Aspirin 300 mg chewed + Ticagrelor 180 mg loading dose + IV Heparin bolus',
        isCorrectFirstLine: true,
        consequence: 'Optimal emergency antiplatelet and anticoagulation achieved immediately.'
      },
      {
        id: 'm2',
        treatmentName: 'High-flow Supplemental Oxygen via non-rebreather mask / Non-Invasive CPAP ventilation',
        isCorrectFirstLine: true,
        consequence: 'SpO2 improves from 89% to 96%, reducing work of breathing.',
        vitalsDelta: { spo2: 96, rr: 20 }
      },
      {
        id: 'm3',
        treatmentName: 'Emergency Primary PCI activation for immediate catheterization and LAD stenting (within 90 mins)',
        isCorrectFirstLine: true,
        consequence: 'Culprit 100% proximal LAD thrombus crossed with guidewire, balloon dilated, and Drug-Eluting Stent placed. TIMI 3 flow restored.'
      },
      {
        id: 'm4',
        treatmentName: 'IV Norepinephrine infusion (0.05-0.2 mcg/kg/min) + Dobutamine for inotropic support',
        isCorrectFirstLine: true,
        consequence: 'Blood pressure stabilizes to 105/65 mmHg without excessive tachycardia.',
        vitalsDelta: { bp: '105/65 mmHg', hr: 92 }
      },
      {
        id: 'm5',
        treatmentName: 'High-dose IV Nitroglycerin infusion + IV Beta-blocker bolus',
        isCorrectFirstLine: false,
        consequence: 'FATAL ERROR: Vasodilation and negative inotropy in cardiogenic shock collapses coronary perfusion, triggering cardiac arrest.'
      }
    ],
    debriefAndLearningPoints: [
      'Cardiogenic shock occurs in 5-8% of STEMI cases due to loss of >40% of functional left ventricular myocardium.',
      'Killip Class IV carries >50% in-hospital mortality if not revascularized rapidly with Primary PCI.',
      'Never administer nitrates or beta-blockers when a patient is hypotensive (SBP <90 mmHg) or in cardiogenic shock.',
      'Norepinephrine is the first-line vasopressor to restore coronary perfusion pressure, combined with Dobutamine for inotropic support.'
    ]
  },

  // Case 2: Severe Rheumatic Mitral Stenosis with AFib
  {
    id: 'case-cvs-mitral-stenosis-afib',
    title: 'Severe Rheumatic Mitral Stenosis with Fast AFib & Pulmonary Congestion',
    difficulty: 'Year 4',
    phase: 'Phase 4: 5th Year (Clinical)',
    system: 'cardiovascular',
    patientDemographics: {
      name: 'Ruma Akter',
      age: 32,
      gender: 'Female',
      occupation: 'Homemaker',
      ward: 'Female Medicine Ward, Sir Salimullah Medical College Hospital'
    },
    chiefComplaint: 'Progressive shortness of breath (NYHA Class III) for 6 months, worsening over last 2 days with sudden palpitation and cough with blood-streaked sputum (hemoptysis).',
    historyOptions: [
      {
        id: 'h1',
        question: 'Did you have recurrent throat infections, joint pain, or fever during childhood?',
        patientAnswer: 'Yes, around age 9 to 12, I had repeated sore throats and severe painful swollen knee and ankle joints that migrated from joint to joint. I took penicillin injections for a few years then stopped.',
        clinicalSignificance: 'Classic history of Acute Rheumatic Fever with migratory polyarthritis (Jones Criteria), indicating chronic Rheumatic Heart Disease.'
      },
      {
        id: 'h2',
        question: 'Do you experience difficulty breathing when lying flat on your back (orthopnea)?',
        patientAnswer: 'Yes, I have to sleep propped up on 3 pillows at night, and I wake up suddenly gasping for air after 2 hours of sleep.',
        clinicalSignificance: 'Orthopnea and Paroxysmal Nocturnal Dyspnea (PND) caused by elevated pulmonary venous pressure.'
      }
    ],
    initialVitals: {
      bp: '110/75 mmHg',
      hr: 142,
      rr: 26,
      spo2: 91,
      temp: 37.0,
      gcs: 'E4V5M6'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Malar flush (plum-colored patches over cheekbones), mild peripheral cyanosis, no pedal edema.',
        palpation: 'Pulse: 142 bpm, irregularly irregular in rhythm and variable in volume (pulse deficit = 24 bpm).',
        percussion: 'N/A',
        auscultation: 'N/A'
      },
      {
        system: 'Cardiovascular System',
        inspection: 'JVP elevated with absent "a" wave (due to atrial fibrillation).',
        palpation: 'Apex beat is tapping in character, localized in left 5th ICS, midclavicular line. Diastolic thrill palpable at apex in left lateral position.',
        percussion: 'Normal heart borders.',
        auscultation: 'Loud S1, Opening Snap (OS) closely following S2, followed by a low-pitched rough Mid-Diastolic Rumbling Murmur with presystolic accentuation (lost in AFib) heard best with bell at apex in left lateral decubitus.'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-1',
        type: 'ECG',
        resultTitle: '12-Lead ECG',
        reportSummary: 'Absent P waves, replaced by fine irregular fibrillatory "f" waves with irregularly irregular QRS complexes at rate 140 bpm. Right axis deviation (+110 deg) and tall R wave in V1 (RVH).',
        revealedValue: 'Atrial Fibrillation with rapid ventricular response and Right Ventricular Hypertrophy.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-2',
        type: 'Echocardiogram',
        resultTitle: 'Transthoracic Echocardiography (TTE)',
        reportSummary: 'Thickened rheumatic mitral valve leaflets with diastolic hockey-stick deformity of anterior leaflet and commissural fusion. Mitral Valve Area (MVA) = 0.8 cm2 (Severe MS < 1.0 cm2). Mean transmitral pressure gradient = 16 mmHg. Left atrial diameter = 52 mm (severely dilated).',
        revealedValue: 'Severe Rheumatic Mitral Stenosis with Severe Pulmonary Arterial Hypertension (PASP 55 mmHg).',
        isKeyInvestigation: true
      }
    ],
    differentialDiagnoses: [
      'Severe Rheumatic Mitral Stenosis with Atrial Fibrillation',
      'Left Atrial Myxoma',
      'Severe Mitral Regurgitation'
    ],
    finalDiagnosis: 'Severe Rheumatic Mitral Stenosis with rapid Atrial Fibrillation, Left Atrial Dilatation, and Secondary Pulmonary Venous Congestion.',
    managementOptions: [
      {
        id: 'm1',
        treatmentName: 'Rate control with IV/oral Beta-blocker (Metoprolol) or Digoxin to slow AV nodal conduction',
        isCorrectFirstLine: true,
        consequence: 'Ventricular rate slows from 142 to 82 bpm, prolonging diastolic filling time and relieving pulmonary edema.',
        vitalsDelta: { hr: 82, rr: 18, spo2: 97 }
      },
      {
        id: 'm2',
        treatmentName: 'Oral Anticoagulation with Warfarin (Target INR 2.0 - 3.0)',
        isCorrectFirstLine: true,
        consequence: 'Prevents left atrial appendage thrombus formation and cardioembolic stroke.'
      },
      {
        id: 'm3',
        treatmentName: 'Percutaneous Transvenous Mitral Commissurotomy (PTMC / Balloon Valvuloplasty)',
        isCorrectFirstLine: true,
        consequence: 'Favorable Wilkins score (7/16); Inoue balloon splits fused commissures, expanding MVA to 1.8 cm2.'
      }
    ],
    debriefAndLearningPoints: [
      'Mitral stenosis is almost exclusively of rheumatic origin in developing countries.',
      'Tachycardia (such as rapid AFib) drastically shortens diastole, creating a severe pressure backup into the pulmonary capillaries.',
      'Rheumatic MS with AFib carries high risk of systemic thromboembolism (stroke); lifelong Warfarin anticoagulation is mandatory.'
    ]
  },

  // Case 3: Acute Infective Endocarditis on Bicuspid Aortic Valve
  {
    id: 'case-cvs-infective-endocarditis',
    title: 'Acute Infective Endocarditis on Bicuspid Aortic Valve',
    difficulty: 'Final Year MBBS',
    phase: 'Phase 4: 5th Year (Clinical)',
    system: 'cardiovascular',
    patientDemographics: {
      name: 'Tanvir Hossain',
      age: 26,
      gender: 'Male',
      occupation: 'Software Engineer',
      ward: 'Male Medicine Ward, DMC Hospital'
    },
    chiefComplaint: 'High spiking fever with chills and rigors for 12 days, progressive fatigue, new painful spots on fingers, and dark cola-colored urine.',
    historyOptions: [
      {
        id: 'h1',
        question: 'Did you undergo any surgical, dental, or invasive procedure recently?',
        patientAnswer: 'I had a wisdom tooth extraction 3 weeks ago at a local dental clinic. I did not take any antibiotics before or after the extraction.',
        clinicalSignificance: 'Classic bacteremic portal of entry via oral flora (Viridans Streptococci).'
      },
      {
        id: 'h2',
        question: 'Were you previously told you had a heart murmur or congenital heart condition?',
        patientAnswer: 'During college physical examination, a doctor told me I had a mild congenital heart murmur, but I never got an echocardiogram.',
        clinicalSignificance: 'Likely underlying Bicuspid Aortic Valve (commonest congenital valvular anomaly).'
      }
    ],
    initialVitals: {
      bp: '135/50 mmHg (Wide pulse pressure)',
      hr: 104,
      rr: 20,
      spo2: 97,
      temp: 39.2,
      gcs: 'E4V5M6'
    },
    physicalExamFindings: [
      {
        system: 'General Survey',
        inspection: 'Splinter hemorrhages under fingernails. Painful, erythematous pea-sized nodules on finger pads (Osler nodes). Non-tender flat red macules on palms (Janeway lesions). Fundoscopy shows retinal Roth spots.',
        palpation: 'Splenomegaly palpable 2 cm below left costal margin (tender).',
        percussion: 'N/A',
        auscultation: 'N/A'
      },
      {
        system: 'Cardiovascular System',
        inspection: 'Hyperdynamic apex beat in 5th ICS, midclavicular line.',
        palpation: 'Water-hammer (Corrigan) collapsing pulse.',
        percussion: 'Normal heart size.',
        auscultation: 'Soft S1, single S2. High-pitched blowing early diastolic decrescendo murmur heard best at Erb\'s point (3rd left ICS) with patient leaning forward in full expiration.'
      }
    ],
    availableInvestigations: [
      {
        id: 'inv-1',
        type: 'Blood Gas',
        resultTitle: 'Blood Cultures (3 Sets from separate venipunctures)',
        reportSummary: 'All 3 sets grew Streptococcus mitis (Viridans group Streptococci), penicillin MIC < 0.12 mcg/mL.',
        revealedValue: 'Positive Major Duke criterion: Typical IE pathogen in 3 separate cultures.',
        isKeyInvestigation: true
      },
      {
        id: 'inv-2',
        type: 'Echocardiogram',
        resultTitle: 'Transesophageal Echocardiography (TEE)',
        reportSummary: 'Congenital bicuspid aortic valve. Mobile 12 mm × 8 mm oscillating vegetation attached to the aortic aspect of the right coronary cusp. Moderate-to-severe acute aortic regurgitation. No root abscess.',
        revealedValue: 'Positive Major Duke criterion: Large mobile vegetation with acute AR.',
        isKeyInvestigation: true
      }
    ],
    differentialDiagnoses: [
      'Definitive Infective Endocarditis (Modified Duke Criteria)',
      'Systemic Lupus Erythematosus (Libman-Sacks endocarditis)',
      'Enteric (Typhoid) Fever',
      'Acute Rheumatic Fever'
    ],
    finalDiagnosis: 'Definitive Subacute Bacterial Infective Endocarditis on Bicuspid Aortic Valve caused by Streptococcus mitis, complicated by Acute Aortic Regurgitation and Glomerulonephritis.',
    managementOptions: [
      {
        id: 'm1',
        treatmentName: 'Targeted IV High-dose Benzylpenicillin (24 million units/day continuous infusion) + IV Gentamicin for 4 weeks',
        isCorrectFirstLine: true,
        consequence: 'Bactericidal clearance of penicillin-susceptible Viridans streptococci; fever subsides within 5 days.'
      },
      {
        id: 'm2',
        treatmentName: 'Urgent Cardiothoracic Surgery consultation for valve replacement (if heart failure, refractory infection, or vegetation >10 mm)',
        isCorrectFirstLine: true,
        consequence: 'Early surgical planning prevents embolic stroke and catastrophic valvular destruction.'
      }
    ],
    debriefAndLearningPoints: [
      'Bicuspid aortic valve is present in 1-2% of the population and carries high lifetime risk of IE.',
      'Always draw 3 separate sets of blood cultures before starting antibiotics.',
      'Definitive diagnosis requires 2 Major criteria (Blood culture + Echo) or equivalent Minor criteria.'
    ]
  }
];

// OSPE & OSCE Stations
export const CARDIOVASCULAR_PILOT_OSPE: OspeStation[] = [
  {
    id: 'ospe-cvs-heart-specimen',
    phase: 'Phase 1',
    subject: 'Anatomy',
    stationNumber: 1,
    title: '3D Heart Specimen: Coronary Artery Identification',
    instructions: 'Observe the 3D reconstructed human heart specimen. Structure marked with pin (A) is located in the anterior interventricular sulcus.',
    timeSeconds: 180,
    specimenType: '3d-heart',
    markedStructureId: 'lad',
    questions: [
      {
        id: 'q1',
        prompt: 'Identify the marked blood vessel (A).',
        marks: 1.0,
        acceptableAnswers: ['Left Anterior Descending Artery', 'LAD', 'Anterior Interventricular Artery', 'LAD artery'],
        explanation: 'The vessel running in the anterior interventricular groove accompanied by the great cardiac vein is the Left Anterior Descending (LAD) artery.'
      },
      {
        id: 'q2',
        prompt: 'Name the parent artery from which it arises.',
        marks: 1.0,
        acceptableAnswers: ['Left Coronary Artery', 'LCA', 'Left main coronary artery'],
        explanation: 'The LAD arises from the bifurcation of the Left Coronary Artery (LCA).'
      },
      {
        id: 'q3',
        prompt: 'Which part of the cardiac conduction system is primarily supplied by this vessel?',
        marks: 2.0,
        acceptableAnswers: ['Right and left bundle branches', 'Bundle of His and bundle branches', 'Bundle branches', 'Interventricular septum conduction'],
        explanation: 'Septal branches of the LAD supply the anterior 2/3 of the interventricular septum, including the bundle of His and right/left bundle branches.'
      },
      {
        id: 'q4',
        prompt: 'Which ECG leads demonstrate ST elevation when this vessel is occluded?',
        marks: 1.0,
        acceptableAnswers: ['V1 to V4', 'V1-V4', 'V1, V2, V3, V4', 'Precordial leads V1-V4'],
        explanation: 'Acute occlusion of LAD causes anterior wall infarction showing ST elevation in leads V1 to V4.'
      }
    ]
  },
  {
    id: 'ospe-cvs-ecg-station',
    phase: 'Phase 4',
    subject: 'Medicine',
    stationNumber: 2,
    title: '12-Lead ECG Station: Acute Inferior Wall STEMI',
    instructions: 'Analyze the provided 12-lead electrocardiogram of a 55-year-old male with severe chest pain.',
    timeSeconds: 180,
    specimenType: 'radiograph',
    markedStructureId: 'ecg-inferior-mi',
    questions: [
      {
        id: 'q1',
        prompt: 'What is the primary electrocardiographic diagnosis?',
        marks: 2.0,
        acceptableAnswers: ['Acute Inferior STEMI', 'Acute Inferior Myocardial Infarction', 'Inferior Wall Myocardial Infarction', 'Inferior STEMI'],
        explanation: 'ST-segment elevation in leads II, III, and aVF with reciprocal ST depression in I and aVL diagnostic of Acute Inferior STEMI.'
      },
      {
        id: 'q2',
        prompt: 'Name the culprit coronary artery most commonly responsible.',
        marks: 1.0,
        acceptableAnswers: ['Right Coronary Artery', 'RCA'],
        explanation: 'The RCA supplies the inferior wall of the left ventricle in approximately 85% of individuals.'
      },
      {
        id: 'q3',
        prompt: 'Name TWO drugs contraindicated if right ventricular involvement is suspected.',
        marks: 2.0,
        acceptableAnswers: ['Nitrates and Morphine', 'Nitrates and Diuretics', 'Nitroglycerin and Furosemide', 'Vasodilators and Diuretics'],
        explanation: 'Nitrates, Morphine, and Diuretics decrease preload, which can cause catastrophic hypotension in right ventricular infarction.'
      }
    ]
  }
];

export const CARDIOVASCULAR_PILOT_OSCE: OsceStation[] = [
  {
    id: 'osce-cvs-precordial-exam',
    stationNumber: 1,
    title: 'Precordial Examination & Murmur Identification',
    domain: 'Clinical Examination',
    patientScenario: 'A 24-year-old female presents with shortness of breath on exertion. Perform a focused cardiovascular precordial examination.',
    patientScript: 'I feel breathless when climbing stairs. I get tired easily.',
    candidateInstructions: '1. Introduce yourself and obtain informed consent. 2. Position the patient appropriately. 3. Systematically perform inspection, palpation, and auscultation of the precordium. 4. State your findings and likely diagnosis to the examiner.',
    timeSeconds: 300,
    markingRubric: [
      { item: 'Informed Consent & Position', points: 2, criteria: 'Introduced self, explained exam, positioned patient at 45 degrees, exposed chest with dignity.' },
      { item: 'Inspection', points: 2, criteria: 'Inspected precordium for scars, deformities, visible pulsations, and apex beat.' },
      { item: 'Palpation of Apex Beat', points: 3, criteria: 'Correctly localized apex beat (5th ICS, MCL) and characterized it (tapping / heaving / thrusting).' },
      { item: 'Palpation for Thrills & Heaves', points: 2, criteria: 'Palpated for left parasternal heave and diastolic/systolic thrills with palm heel.' },
      { item: 'Auscultation of 4 Valve Areas', points: 4, criteria: 'Auscultated Mitral, Tricuspid, Pulmonic, and Aortic areas with diaphragm and bell.' },
      { item: 'Dynamic Maneuvers', points: 3, criteria: 'Turned patient to left lateral position to listen to apex with bell in expiration.' },
      { item: 'Synthesis & Reporting', points: 4, criteria: 'Synthesized findings (Tapping apex, loud S1, mid-diastolic murmur -> Mitral Stenosis).' }
    ],
    modelPerformanceSummary: 'Demonstrates smooth bedside manner, accurate identification of apex character and timing of heart sounds.'
  }
];
