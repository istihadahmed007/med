import { VisualFormat, TargetAudience, VideoChapter, TimestampedQuestion } from '../types/videoStudio';

export interface LessonVideoTemplate {
  lessonId: string;
  lessonTitle: string;
  phase: string;
  subject: string;
  animationType: 'action-potential' | 'atherosclerosis' | 'coronary-circulation' | 'nitrate-mechanism' | 'heart-failure' | 'cabg-surgery' | 'cardiac-cycle';
  defaultPrompt: string;
  learningObjective: string;
  references: string[];
  visualFormat: VisualFormat;
  targetAudience: TargetAudience;
  requiredStructures: string[];
  durationSeconds: number;
  resolution: '832x480' | '720x480';
  seed: number;
  posterUrl: string;
  videoUrl: string;
  videoTitleEn: string;
  videoTitleBn: string;
  chapters: VideoChapter[];
  questions: TimestampedQuestion[];
  transcriptEn: string;
  transcriptBn: string;
  subtitles: {
    startSeconds: number;
    endSeconds: number;
    textEn: string;
    textBn: string;
  }[];
}

export const LESSON_VIDEO_TEMPLATES: Record<string, LessonVideoTemplate> = {
  // 1. Anatomy: External/Internal Features & Coronary Anatomy
  'cvs-anat-heart-morphology': {
    lessonId: 'cvs-anat-heart-morphology',
    lessonTitle: 'Heart: External & Internal Features and Coronary Circulation',
    phase: 'Phase 1',
    subject: 'Anatomy & Embryology',
    animationType: 'coronary-circulation',
    defaultPrompt: 'High-definition 3D medical illustration of the external and internal cardiac anatomy and coronary arterial tree. Coronal dissection reveals the right atrium, crista terminalis, fossa ovalis, right ventricle with moderator band, and thick left ventricle. Animated contrast highlights the LAD, LCx, RCA, and coronary sinus perfusion zones.',
    learningObjective: 'Identify the origin, anatomical course, major branches (LAD, LCx, RCA, PDA), and territories of the coronary circulation.',
    references: ['BM&DC National MBBS Curriculum 2026', 'Vishram Singh Clinical Anatomy of Thorax, Ch. 18', 'Datta Essentials of Human Anatomy, Vol. 1'],
    visualFormat: '3d-macro',
    targetAudience: 'undergraduate-mbbs',
    requiredStructures: ['Right Coronary Artery (RCA)', 'Left Anterior Descending (LAD)', 'Left Circumflex (LCx)', 'Moderator Band', 'Crista Terminalis'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 2048,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: '3D Coronary Circulation & Myocardial Perfusion Architecture',
    videoTitleBn: 'ত্রিমাত্রিক করোনারি রক্ত সংবহন ও মায়োকার্ডিয়াল পারফিউশন কাঠামো',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Aortic Sinuses & Coronary Arterial Origins',
        titleBn: 'অ্যাওর্টিক সাইনাস ও করোনারি ধমনীর উৎপত্তি',
        description: 'Right and Left coronary arteries emerge from the anterior and left posterior aortic sinuses.'
      },
      {
        timestampSeconds: 6,
        title: 'LAD & LCx Anterior-Lateral Perfusion',
        titleBn: 'এলএডি ও এলসিএক্স অ্যান্টেরিয়র-ল্যাটারাল রক্ত সরবরাহ',
        description: 'LAD traverses the anterior interventricular groove to supply the anterior septum and apex beat region.'
      },
      {
        timestampSeconds: 12,
        title: 'RCA, SA/AV Nodes & Posterior Descending Branch',
        titleBn: 'আরসিএ, এসএ/এভি নোড ও পোস্টেরিয়র ডিসেন্ডিং শাখা',
        description: 'RCA travels in the atrioventricular groove supplying nodal pacemakers and the diaphragmatic surface.'
      }
    ],
    questions: [
      {
        id: 'vq-anat-01',
        timestampSeconds: 7,
        prompt: 'Which coronary artery branch supplies the anterior two-thirds of the interventricular septum and cardiac apex?',
        promptBn: 'কোন করোনারি ধমনী ইন্টারভেন্ট্রিকুলার সেপ্টামের অ্যান্টেরিয়র দুই-তৃতীয়াংশ এবং কার্ডিয়াক এপেক্সে রক্ত সরবরাহ করে?',
        options: [
          'Left Anterior Descending Artery (LAD)',
          'Right Marginal Artery',
          'Left Circumflex Artery (LCx)',
          'Posterior Interventricular Artery (PDA)'
        ],
        correctOptionIndex: 0,
        explanation: 'The LAD (often called the artery of sudden death) travels in the anterior interventricular groove, supplying the apex, anterior LV wall, and the anterior 2/3 of the septum.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'Coronary arteries arise from the aortic sinuses right above the aortic valve cusps. The Left Anterior Descending artery courses down the anterior interventricular sulcus providing vital blood supply to the apex and conduction bundle branches. The Right Coronary Artery winds around the right atrioventricular groove to perfuse the SA node, AV node, and diaphragmatic surface.',
    transcriptBn: 'করোনারি ধমনীগুলো মহাধমনীর ভালভের উপরে অবস্থিত অ্যাওর্টিক সাইনাস থেকে উৎপত্তি লাভ করে। বাম অ্যান্টেরিয়র ডিসেন্ডিং ধমনী শীর্ষবিন্দু এবং পরিবাহী তন্তুতে রক্ত সরবরাহ করে। ডান করোনারি ধমনী এসএ নোড এবং এভি নোডে রক্ত পৌঁছে দেয়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Right and Left coronary arteries originate from anterior and left posterior aortic sinuses during diastole.',
        textBn: 'ডান ও বাম করোনারি ধমনী ডায়াস্টোলের সময় অ্যাওর্টিক সাইনাস থেকে উৎপত্তি লাভ করে।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'The Left Anterior Descending (LAD) artery courses towards the apex, supplying the anterior 2/3 of the septum.',
        textBn: 'বাম অ্যান্টেরিয়র ডিসেন্ডিং (LAD) ধমনী এপেক্সের দিকে ধাবিত হয়ে সেপ্টামের দুই-তৃতীয়াংশে রক্ত জোগায়।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'The Right Coronary Artery (RCA) supplies the SA node in 60% and AV node in 90% of individuals.',
        textBn: 'ডান করোনারি ধমনী (RCA) ৬০% ক্ষেত্রে এসএ নোড এবং ৯০% ক্ষেত্রে এভি নোডে রক্ত সরবরাহ করে।'
      }
    ]
  },

  // 2. Physiology: Cardiac Cycle & Wiggers Diagram
  'cvs-physio-cardiac-cycle-wiggers': {
    lessonId: 'cvs-physio-cardiac-cycle-wiggers',
    lessonTitle: 'The Cardiac Cycle, Pressure-Volume Loops & Heart Sounds',
    phase: 'Phase 1',
    subject: 'Physiology',
    animationType: 'cardiac-cycle',
    defaultPrompt: 'High-definition medical illustration of human cardiac ventricles during systole. Coronal cross-section. Thick left ventricular myocardium contracts vigorously. Mitral valve snaps shut; semilunar aortic valve opens with high-velocity blood ejection. Educational textbook animation.',
    learningObjective: 'Correlate ventricular pressure, volume, valve dynamics, and heart sounds during isovolumetric contraction and ejection.',
    references: ['Guyton & Hall Textbook of Medical Physiology 14th ed, Ch. 9', 'Ganong’s Review of Medical Physiology 26th ed'],
    visualFormat: '3d-macro',
    targetAudience: 'undergraduate-mbbs',
    requiredStructures: ['Left Ventricle', 'Mitral Valve', 'Aortic Valve', 'Ascending Aorta'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 1042,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Cardiac Ventricular Systole & Valvular Dynamics',
    videoTitleBn: 'কার্ডিয়াক ভেন্ট্রিকুলার সিস্টোল এবং ভালভুলার গতিশীলতা',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Isovolumetric Contraction Phase',
        titleBn: 'আইসোভলিউমেট্রিক সংকোচন পর্যায়',
        description: 'All 4 cardiac valves closed; intraventricular pressure spikes steeply from 10 to 80 mmHg.'
      },
      {
        timestampSeconds: 6,
        title: 'Rapid Systolic Ejection',
        titleBn: 'দ্রুত সিস্টোলিক রক্ত নির্গমন',
        description: 'LV pressure exceeds 80 mmHg; semilunar aortic cusps open briskly with peak ejection.'
      },
      {
        timestampSeconds: 12,
        title: 'Reduced Ejection & Protodiastole',
        titleBn: 'হ্রাসপ্রাপ্ত নির্গমন ও প্রোটোডায়াস্টোল',
        description: 'Myocardial relaxation initiates; aortic pressure gradient reverses causing S2 closure.'
      }
    ],
    questions: [
      {
        id: 'vq-phys-01',
        timestampSeconds: 6,
        prompt: 'During the cardiac cycle, what mechanical event occurs immediately when left ventricular pressure exceeds ascending aortic diastolic pressure (~80 mmHg)?',
        promptBn: 'বাম ভেন্ট্রিকলের চাপ মহাধমনীর ডায়াস্টোলিক চাপ (~৮০ mmHg) অতিক্রম করার সাথে সাথে কোন যান্ত্রিক ঘটনাটি ঘটে?',
        options: [
          'Mitral valve opens widely',
          'Aortic valve opens and rapid ejection begins',
          'First heart sound (S1) is generated',
          'Isovolumetric relaxation begins'
        ],
        correctOptionIndex: 1,
        explanation: 'When left ventricular pressure exceeds the 80 mmHg systemic diastolic pressure in the aorta, the aortic valve cusps are forced open and rapid ventricular ejection commences.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'During ventricular systole, electrical depolarization spreads through the bundle of His and Purkinje network, triggering uniform myocardial contraction. The mitral and tricuspid valves close tightly to create the first heart sound. During isovolumetric contraction, pressure surges without volume change until the semilunar aortic valve opens, propelling blood into systemic circulation.',
    transcriptBn: 'ভেন্ট্রিকুলার সিস্টোলের সময় বৈদ্যুতিক ডিপোলারাইজেশন পারকিঞ্জে ফাইবারের মাধ্যমে ছড়িয়ে পড়ে সমন্বিত সংকোচন ঘটায়। মাইট্রাল ও ট্রাইকাস্পিড ভালভ দৃঢ়ভাবে বন্ধ হয়ে প্রথম হৃদধ্বনি (S1) সৃষ্টি করে। আইসোভলিউমেট্রিক সংকোচনের পর মহাধমনীর ভালভ উন্মুক্ত হয়ে রক্ত সঞ্চালিত হয়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Ventricular systole begins: AV valves snap shut creating S1; pressure surges during isovolumetric contraction.',
        textBn: 'ভেন্ট্রিকুলার সিস্টোল শুরু: এভি ভালভ বন্ধ হয়ে S1 সৃষ্টি করে এবং আইসোভলিউমেট্রিক সংকোচন ঘটে।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'Left ventricular pressure exceeds 80 mmHg; the aortic valve opens with high-velocity rapid ejection.',
        textBn: 'বাম নিলয়ের চাপ ৮০ mmHg অতিক্রম করায় অ্যাওর্টিক ভালভ খুলে দ্রুত রক্ত নির্গমন শুরু হয়।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'Ejection concludes as myocardium repolarizes; aortic valve snaps shut generating the S2 heart sound.',
        textBn: 'রিপোলারাইজেশনের সাথে নির্গমন সমাপ্ত হয় এবং অ্যাওর্টিক ভালভ বন্ধ হয়ে S2 ধ্বনি তৈরি করে।'
      }
    ]
  },

  // 3. Physiology: Action Potential & Electrophysiology
  'cvs-physio-action-potential': {
    lessonId: 'cvs-physio-action-potential',
    lessonTitle: 'Cardiac Electrophysiology, Action Potentials & Arrhythmias',
    phase: 'Phase 1',
    subject: 'Physiology',
    animationType: 'action-potential',
    defaultPrompt: 'Microscopic biophysical animation of ventricular myocyte action potential phases 0 to 4. Fast voltage-gated Na+ channels open with steep Phase 0 spike to +20mV, transient outward K+ channels activate Phase 1, L-type Ca2+ channels open maintaining the Phase 2 plateau, followed by delayed rectifier K+ channels driving Phase 3 rapid repolarization back to -90mV resting potential.',
    learningObjective: 'Differentiate ventricular fast-response action potentials from SA nodal pacemaker prepotentials, describing ion conductance during Phases 0–4.',
    references: ['Guyton & Hall 14th ed, Ch. 10', 'Katz Physiology of the Heart 5th ed'],
    visualFormat: 'cellular-micro',
    targetAudience: 'undergraduate-mbbs',
    requiredStructures: ['Voltage-Gated Na+ Channel (Nav1.5)', 'L-Type Ca2+ Channel (Cav1.2)', 'Delayed Rectifier K+ Channel (IKr/IKs)', 'Na+/K+ ATPase Pump'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 3105,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Ventricular Action Potential: Ionic Currents & Refractory States',
    videoTitleBn: 'ভেন্ট্রিকুলার অ্যাকশন পটেনশিয়াল: আয়নিক প্রবাহ ও রিফ্র্যাক্টরি পর্যায়',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Phase 0: Rapid Depolarization (INa)',
        titleBn: 'পর্যায় ০: দ্রুত ডিপোলারাইজেশন (সোডিয়াম প্রবাহ)',
        description: 'Activation of fast voltage-gated Na+ channels produces a steep upstroke from -90 mV to +20 mV.'
      },
      {
        timestampSeconds: 6,
        title: 'Phase 1 & 2: Notch and Plateau (ICa-L vs IK)',
        titleBn: 'পর্যায় ১ ও ২: প্লাটো বা সমতল পর্যায় (ক্যালসিয়াম বনাম পটাসিয়াম)',
        description: 'L-type Ca2+ influx balances delayed K+ efflux, prolonging absolute refractory period.'
      },
      {
        timestampSeconds: 12,
        title: 'Phase 3 & 4: Rapid Repolarization and Resting Potential',
        titleBn: 'পর্যায় ৩ ও ৪: দ্রুত রিপোলারাইজেশন ও বিশ্রাম পর্যায়',
        description: 'IK channels predominate to restore negative resting membrane potential maintained by Na+/K+ ATPase.'
      }
    ],
    questions: [
      {
        id: 'vq-ap-01',
        timestampSeconds: 8,
        prompt: 'Which ion channel current is primarily responsible for the prolonged plateau phase (Phase 2) of the ventricular action potential?',
        promptBn: 'ভেন্ট্রিকুলার অ্যাকশন পটেনশিয়ালের দীর্ঘায়িত প্লাটো পর্যায়ের (পর্যায় ২) জন্য প্রধানত কোন আয়ন চ্যানেল দায়ী?',
        options: [
          'Fast Voltage-Gated Na+ Influx (INa)',
          'L-Type Ca2+ Influx (ICa-L)',
          'Funny Current (If)',
          'Transient Outward K+ Efflux (Ito)'
        ],
        correctOptionIndex: 1,
        explanation: 'The Phase 2 plateau is maintained by inward Ca2+ current through L-type calcium channels (Cav1.2) counterbalancing outward K+ currents, allowing sustained excitation-contraction coupling.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'In ventricular myocytes, electrical stimulation activates fast voltage-gated sodium channels, driving rapid phase 0 depolarization. Transient potassium outflow creates phase 1 early notch. In phase 2, L-type calcium channels open, allowing calcium influx that triggers calcium-induced calcium release while prolonging the refractory period to prevent tetanic contraction. Delayed rectifier potassium currents then restore the resting membrane potential in phase 3.',
    transcriptBn: 'ভেন্ট্রিকুলার মায়োসাইটে দ্রুত সোডিয়াম প্রবেশের মাধ্যমে ফেজ ০ ডিপোলারাইজেশন ঘটে। ফেজ ২ প্লাটো পর্যায়ে এল-টাইপ ক্যালসিয়াম চ্যানেলের মাধ্যমে ক্যালসিয়াম প্রবেশ করে যা হৃদপেশির টিটেনাস প্রতিরোধে দীর্ঘায়িত রিফ্র্যাক্টরি সময় তৈরি করে। ফেজ ৩ এ পটাসিয়াম নির্গমনের মাধ্যমে বিশ্রাম ভোল্টেজ ফিরে আসে।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Phase 0: Fast voltage-gated Na+ channels open, generating a steep spike from -90 mV to +20 mV.',
        textBn: 'পর্যায় ০: দ্রুত সোডিয়াম চ্যানেল খুলে -৯০ mV থেকে +২০ mV পর্যন্ত উল্লম্ব ভোল্টেজ তৈরি করে।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'Phase 2: L-type Ca2+ channel opening creates the plateau phase, ensuring heart muscle cannot be tetanized.',
        textBn: 'পর্যায় ২: এল-টাইপ ক্যালসিয়াম প্রবেশ করে প্লাটো তৈরি করে, যা হৃদপেশির খিঁচুনি প্রতিরোধ করে।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'Phase 3: Delayed rectifier K+ channels open, driving rapid repolarization back to -90 mV resting potential.',
        textBn: 'পর্যায় ৩: পটাসিয়াম চ্যানেল খুলে কোষকে দ্রুত -৯০ mV বিশ্রাম ভোল্টেজে ফিরিয়ে আনে।'
      }
    ]
  },

  // 4. Pathology: Atherosclerosis & MI
  'cvs-path-atherosclerosis-cad': {
    lessonId: 'cvs-path-atherosclerosis-cad',
    lessonTitle: 'Atherosclerosis, Coronary Artery Disease & Myocardial Infarction',
    phase: 'Phase 2',
    subject: 'Pathology',
    animationType: 'atherosclerosis',
    defaultPrompt: 'Pathophysiological cross-sectional animation of a human coronary artery undergoing atherogenesis. Endothelial injury, subendothelial accumulation of oxLDL, macrophage foam cell formation, expanding necrotic lipid core, thin fibrous cap, acute plaque rupture with platelet aggregation and occlusive thrombus formation leading to transmural ischemia.',
    learningObjective: 'Trace the sequence of atheroma formation, plaque vulnerability factors, and acute coronary thrombosis triggering STEMI.',
    references: ['Robbins & Cotran Pathologic Basis of Disease 10th ed, Ch. 11', 'BM&DC Pathology Syllabus 2026'],
    visualFormat: 'cellular-micro',
    targetAudience: 'undergraduate-mbbs',
    requiredStructures: ['Coronary Endothelium', 'Oxidized LDL Particles', 'Macrophage Foam Cells', 'Necrotic Lipid Core', 'Fibrous Cap', 'Platelet Fibrin Thrombus'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 4501,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Atherogenesis, Plaque Rupture & Acute Coronary Occlusion',
    videoTitleBn: 'অ্যাথেরোজেনেসিস, প্লাক ফাটল ও তীব্র করোনারি নালিকা বন্ধ হওয়া',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Endothelial Injury & Lipid Trapping',
        titleBn: 'এন্ডোথেলিয়াল আঘাত ও লিপিড জমা',
        description: 'Chronic shear stress causes endothelial permeability; LDL enters tunica intima and undergoes oxidation.'
      },
      {
        timestampSeconds: 6,
        title: 'Foam Cell Formation & Core Expansion',
        titleBn: 'ফোম সেল তৈরি ও কোর বৃদ্ধি',
        description: 'Macrophages engulf oxLDL via scavenger receptors forming fatty streaks and necrotic lipid pool.'
      },
      {
        timestampSeconds: 12,
        title: 'Plaque Rupture & Occlusive Thrombosis',
        titleBn: 'প্লাক বিদীর্ণ ও রক্তজমাট বাধা',
        description: 'Matrix metalloproteinases degrade fibrous cap; collagen exposure sparks rapid platelet thrombus.'
      }
    ],
    questions: [
      {
        id: 'vq-path-01',
        timestampSeconds: 12,
        prompt: 'What primary pathological event precipitates acute transmural ST-elevation myocardial infarction (STEMI)?',
        promptBn: 'তীব্র একিউট এসটি-এলিভেশন মায়োকার্ডিয়াল ইনফার্কশন (STEMI) এর সূচনা করে কোন প্রধান প্যাথলজিক্যাল ঘটনাটি?',
        options: [
          'Gradual concentric intimal thickening over decades',
          'Acute rupture or erosion of a thin-cap fibroatheroma with occlusive thrombosis',
          'Chronic collateral vascular angiogenesis',
          'Medial Mönckeberg calcific sclerosis'
        ],
        correctOptionIndex: 1,
        explanation: 'Acute STEMI occurs when an unstable, thin-cap atheromatous plaque ruptures, exposing prothrombotic subendothelial core elements that drive instant occlusive platelet-fibrin thrombus formation.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'Atherogenesis begins with endothelial dysfunction provoked by hypertension, smoking, or dyslipidemia. Circulating LDL enters the intima where it becomes oxidized. Monocytes recruit, differentiate into macrophages, and gorge on oxidized lipids to become foam cells. Over years, smooth muscle cells lay down a fibrous cap. If inflammatory metalloproteinases degrade this cap, sudden rupture exposes tissue factor, triggering rapid platelet aggregation and total coronary occlusion.',
    transcriptBn: 'ধূমপান বা উচ্চ রক্তচাপের কারণে করোনারি রক্তনালীর এন্ডোথেলিয়ামে ক্ষত সৃষ্টি হলে এলডিএল জমা হয়ে অক্সিডাইজড হয়। ম্যাক্রোফেজগুলো এই লিপিড গিলে ফোম সেল তৈরি করে। পরবর্তীতে ফাইব্রাস ক্যাপ ফেটে রক্তজমাট বেঁধে সম্পূর্ণ করোনারি ধমনী বন্ধ করে হার্ট অ্যাটাক ঘটায়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Endothelial dysfunction permits subendothelial infiltration and oxidation of low-density lipoproteins (oxLDL).',
        textBn: 'এন্ডোথেলিয়ামের ক্ষতি হলে লিপিড কণা প্রবেশ করে অক্সিডাইজড এলডিএল-এ পরিণত হয়।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'Macrophages engulf oxLDL to form foam cells, expanding the necrotic lipid core beneath a fibrous cap.',
        textBn: 'ম্যাক্রোফেজ অক্সিডাইজড চর্বি গিলে ফোম সেল ও প্লাক তৈরি করে ফাইব্রাস ক্যাপের নিচে জমা হয়।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'Thin fibrous cap ruptures: exposed tissue factor sparks instant platelet thrombus and coronary occlusion.',
        textBn: 'পাতলা ক্যাপ ফেটে গেলে থ্রম্বোসাইট জমাট বেঁধে সম্পূর্ণ রক্তনালী বন্ধ করে মায়োকার্ডিয়াল ইনফার্কশন ঘটায়।'
      }
    ]
  },

  // 5. Pharmacology: Antianginal Drugs & Nitrates
  'cvs-pharm-antianginals-nitrates': {
    lessonId: 'cvs-pharm-antianginals-nitrates',
    lessonTitle: 'Antianginal Drugs: Nitrates, Beta-Blockers & Calcium Channel Blockers',
    phase: 'Phase 2',
    subject: 'Pharmacology',
    animationType: 'nitrate-mechanism',
    defaultPrompt: 'Pharmacodynamic mechanism of glyceryl trinitrate (GTN) on vascular smooth muscle. Organic nitrate denitration releases nitric oxide (NO), stimulating soluble guanylyl cyclase (sGC) to convert GTP to cyclic GMP (cGMP). cGMP activates Protein Kinase G (PKG), promoting myosin light chain dephosphorylation, systemic venodilation, marked preload reduction, and decreased myocardial wall stress.',
    learningObjective: 'Explain the enzymatic release of NO from organic nitrates, cGMP second-messenger pathway, and venous capacitance dilation reducing cardiac oxygen demand.',
    references: ['Katzung Basic & Clinical Pharmacology 15th ed, Ch. 12', 'Rang & Dale’s Pharmacology 9th ed'],
    visualFormat: 'cellular-micro',
    targetAudience: 'undergraduate-mbbs',
    requiredStructures: ['Vascular Smooth Muscle Cell', 'Nitric Oxide (NO)', 'Soluble Guanylyl Cyclase (sGC)', 'Cyclic GMP (cGMP)', 'Myosin Light Chain Phosphatase (MLCP)', 'Peripheral Venous Bed'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 5204,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Nitroglycerin & Nitrates: NO-cGMP Smooth Muscle Vasodilation',
    videoTitleBn: 'নাইট্রোগ্লিসারিন ও নাইট্রেটস: এনও-সিজিএমপি মসৃণ পেশী প্রসারণ ক্রিয়া',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Nitrate Denitration & Nitric Oxide Release',
        titleBn: 'নাইট্রেট রূপান্তর ও নাইট্রিক অক্সাইড নির্গমন',
        description: 'Mitochondrial aldehyde dehydrogenase (ALDH-2) denitrates GTN into reactive Nitric Oxide (NO).'
      },
      {
        timestampSeconds: 6,
        title: 'sGC Activation & cGMP Synthesis Cascade',
        titleBn: 'এসজিসি সক্রিয়করণ ও সিজিএমপি বৃদ্ধি',
        description: 'NO stimulates soluble guanylyl cyclase, generating cGMP which activates Protein Kinase G (PKG).'
      },
      {
        timestampSeconds: 12,
        title: 'MLCP Dephosphorylation & Systemic Venodilation',
        titleBn: 'মায়োসিন ডিফসফোরাইলেশন ও ভেনোডাইলেটেশন',
        description: 'Dephosphorylation of myosin light chains causes smooth muscle relaxation, reducing preload and wall tension.'
      }
    ],
    questions: [
      {
        id: 'vq-pharm-01',
        timestampSeconds: 10,
        prompt: 'What is the primary hemodynamic mechanism by which sublingual Nitroglycerin relieves anginal chest pain?',
        promptBn: 'জিহ্বার নিচে নাইট্রোগ্লিসারিন ব্যবহারের মাধ্যমে কোন প্রধান মেকানিজমে অ্যানজাইনার বুকব্যথা উপশম হয়?',
        options: [
          'Direct coronary vasospasm constriction',
          'Marked systemic venodilation reducing venous return, preload, and myocardial oxygen demand',
          'Inotropic stimulation of cardiac contractility',
          'Direct thrombolytic dissolution of coronary fibrin clots'
        ],
        correctOptionIndex: 1,
        explanation: 'At clinical doses, nitrates act predominantly on systemic capacitance veins, decreasing venous return (preload) and ventricular end-diastolic wall tension, thereby sharply reducing myocardial oxygen consumption.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'Glyceryl trinitrate undergoes bioactivation by mitochondrial aldehyde dehydrogenase in vascular smooth muscle, releasing free nitric oxide. Nitric oxide diffuses into cytoplasm and activates soluble guanylyl cyclase. The resulting elevation in cyclic GMP stimulates protein kinase G, activating myosin light chain phosphatase and sequestering intracellular calcium. This produces potent relaxation of systemic capacitance veins, decreasing venous return and lowering ventricular wall tension.',
    transcriptBn: 'নাইট্রোগ্লিসারিন রক্তনালীর মসৃণ পেশীতে পরিবর্তিত হয়ে নাইট্রিক অক্সাইড নির্গমন করে। এটি সিজিএমপি বৃদ্ধি করে ক্যালসিয়াম কমিয়ে রক্তনালীর প্রসারণ ঘটায়। এর ফলে প্রি-লোড বা হৃদপিণ্ডের রক্তচাপ হ্রাস পেয়ে অ্যানজাইনা দ্রুত ভালো হয়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Nitroglycerin is denitrated in vascular smooth muscle to release active Nitric Oxide (NO).',
        textBn: 'রক্তনালীর মসৃণ পেশীতে নাইট্রোগ্লিসারিন ভেঙে নাইট্রিক অক্সাইড (NO) নির্গত হয়।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'Nitric oxide activates soluble guanylyl cyclase, converting GTP to cGMP and triggering Protein Kinase G.',
        textBn: 'নাইট্রিক অক্সাইড গুয়ানিলাইল সাইক্লেজকে সক্রিয় করে সিজিএমপি (cGMP) বৃদ্ধি করে।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'cGMP dephosphorylates myosin light chains, dilating systemic veins and dropping cardiac preload.',
        textBn: 'সিজিএমপি রক্তনালী প্রসারিত করে প্রি-লোড হ্রাস করে এবং হৃদপিণ্ডের অক্সিজেনের চাহিদা কমায়।'
      }
    ]
  },

  // 6. Medicine: Heart Failure & Remodeling
  'cvs-med-heart-failure': {
    lessonId: 'cvs-med-heart-failure',
    lessonTitle: 'Congestive Heart Failure: Classification, Pathophysiology & Management',
    phase: 'Phase 4',
    subject: 'Medicine & Allied Specialties',
    animationType: 'heart-failure',
    defaultPrompt: 'Pathophysiological animation of Heart Failure with Reduced Ejection Fraction (HFrEF) and progressive ventricular remodeling. Demonstrating eccentric left ventricular dilatation, wall thinning, diminished systolic fractional shortening, elevated left ventricular end-diastolic pressure (LVEDP), secondary functional mitral regurgitation, pulmonary capillary congestion, and neurohormonal RAAS activation.',
    learningObjective: 'Analyze ventricular remodeling, neurohormonal decompensation (RAAS and Sympathetic), and hemodynamic consequences of HFrEF.',
    references: ['Davidson’s Principles and Practice of Medicine 24th ed, Ch. 18', 'Kumar & Clark’s Clinical Medicine 10th ed'],
    visualFormat: 'clinical-bedside',
    targetAudience: 'clinical-intern',
    requiredStructures: ['Dilated Left Ventricle', 'Attenuated Myocardium', 'Mitral Valve Annulus', 'Pulmonary Venous Bed', 'Sympathetic / RAAS Receptors'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 6810,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Heart Failure with Reduced Ejection Fraction (HFrEF) & Remodeling',
    videoTitleBn: 'হ্রাসপ্রাপ্ত ইজেকশন ফ্র্যাকশন হার্ট ফেইলিউর (HFrEF) ও রিমডেলিং প্রক্রিয়া',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Chamber Dilatation & Systolic Hypokinesia',
        titleBn: 'নিলয় প্রসারণ ও সংকোচন দুর্বলতা',
        description: 'Progressive myocyte apoptosis and collagen slippage trigger eccentric left ventricular chamber dilatation.'
      },
      {
        timestampSeconds: 6,
        title: 'Elevated LVEDP & Functional Mitral Regurgitation',
        titleBn: 'উচ্চ এলভি চাপ ও মাইট্রাল রিগারজিটেশন',
        description: 'Incomplete ventricular emptying drives LVEDP above 25 mmHg, creating mitral annular dilatation.'
      },
      {
        timestampSeconds: 12,
        title: 'Pulmonary Venous Congestion & Clinical S3 Gallop',
        titleBn: 'ফুসফুসে রক্তজমাট ও এস৩ হৃদধ্বনি',
        description: 'Retrograde pulmonary capillary hypertension leads to alveolar fluid transudation and S3 gallop sound.'
      }
    ],
    questions: [
      {
        id: 'vq-med-01',
        timestampSeconds: 11,
        prompt: 'In chronic HFrEF, what clinical physical finding directly reflects elevated left ventricular filling pressure during early rapid ventricular diastole?',
        promptBn: 'দীর্ঘমেয়াদী HFrEF রোগে ডায়াস্টোলের শুরুতে কোন শারীরিক লক্ষণটি উচ্চ ভেন্ট্রিকুলার চাপ নির্দেশ করে?',
        options: [
          'Opening snap of mitral stenosis',
          'Third heart sound (S3 gallop)',
          'Ejection systolic click',
          'Fixed splitting of second heart sound'
        ],
        correctOptionIndex: 1,
        explanation: 'An S3 gallop is generated during early diastole when rapid blood inflow from high-pressure atria impacts a compliant, volume-overloaded, dilated ventricle in heart failure.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'In Heart Failure with reduced ejection fraction, progressive loss of functional myocardium triggers chronic ventricular remodeling. The left ventricle dilates eccentrically with thinning of its muscular walls. Fractional shortening drops below normal, and ejection fraction declines under forty percent. Because the ventricle fails to empty effectively, left ventricular end-diastolic pressure escalates. Elevated backwards pressure transmits through the left atrium to pulmonary capillaries, producing dyspnea, orthopnea, and pulmonary crackles.',
    transcriptBn: 'হার্ট ফেইলিউরে হৃদপেশি পাতলা ও প্রসারিত হয়ে রক্তের নির্গমন ক্ষমতা ৪০% এর নিচে নেমে যায়। এর ফলে হৃদপিণ্ডে রক্ত জমে ফুসফুসে চাপ সৃষ্টি হয় এবং রোগীর শ্বাসকষ্ট ও কাশি দেখা দেয়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Myocardial injury causes eccentric ventricular dilatation and marked reduction in systolic ejection fraction.',
        textBn: 'হৃদপেশির ক্ষতের কারণে নিলয় প্রসারিত হয়ে রক্তের নির্গমন ক্ষমতা বা ইজেকশন ফ্র্যাকশন কমে যায়।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'Incomplete ejection elevates left ventricular end-diastolic pressure, causing mitral annular regurgitation.',
        textBn: 'অসম্পূর্ণ নির্গমনের ফলে হৃদপিণ্ডের ডায়াস্টোলিক চাপ বেড়ে গিয়ে মাইট্রাল কপাটিকা দিয়ে রক্ত উল্টোদিকে প্রবাহিত হয়।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'Elevated backward pressure congests pulmonary veins, causing dyspnea and pathognomonic S3 gallop rhythm.',
        textBn: 'ফুসফুসের রক্তনালীতে চাপ বেড়ে রোগীর শ্বাসকষ্ট হয় এবং তৃতীয় হৃদধ্বনি (S3) সৃষ্টি হয়।'
      }
    ]
  },

  // 7. Surgery: CABG & Valve Surgeries
  'cvs-surg-cabg-valvular': {
    lessonId: 'cvs-surg-cabg-valvular',
    lessonTitle: 'Coronary Artery Bypass Grafting (CABG) & Valve Replacements',
    phase: 'Phase 4',
    subject: 'Surgery & Allied Specialties',
    animationType: 'cabg-surgery',
    defaultPrompt: 'Surgical planes 3D orientation of Coronary Artery Bypass Grafting (CABG) and aortic valve replacement. Demonstrating Left Internal Mammary Artery (LIMA) anastomosed end-to-side to the Left Anterior Descending (LAD) artery, reversed saphenous vein graft from ascending aorta to distal RCA, alongside cardiopulmonary bypass cannulation.',
    learningObjective: 'Demonstrate surgical anatomy of conduits (LIMA, Radial Artery, Great Saphenous Vein) and graft geometry in multivessel revascularization.',
    references: ['Bailey & Love’s Short Practice of Surgery 28th ed, Ch. 52', 'Kirklin/Barratt-Boyes Cardiac Surgery 4th ed'],
    visualFormat: 'surgical-orientation',
    targetAudience: 'postgraduate-fellow',
    requiredStructures: ['Left Internal Mammary Artery (LIMA)', 'Left Anterior Descending (LAD)', 'Great Saphenous Vein Graft (SVG)', 'Ascending Aorta', 'Cardiopulmonary Bypass Cannulae'],
    durationSeconds: 18,
    resolution: '832x480',
    seed: 7903,
    posterUrl: '/anatomy/heart/organ.webp',
    videoUrl: '/media/cardiac_cycle_systole.mp4',
    videoTitleEn: 'Coronary Artery Bypass Grafting (CABG) & Valve Prostheses',
    videoTitleBn: 'করোনারি আর্টারি বাইপাস গ্রাফটিং (সিএবিজি) ও ভালভ প্রতিস্থাপন সার্জারি',
    chapters: [
      {
        timestampSeconds: 0,
        title: 'Median Sternotomy & Conduit Harvesting',
        titleBn: 'স্টার্নোটমি ও গ্রাফট সংগ্রহ',
        description: 'Surgical exposure reveals anterior pericardium; LIMA is pedicled from the chest wall.'
      },
      {
        timestampSeconds: 6,
        title: 'LIMA-to-LAD In-Situ Anastomosis',
        titleBn: 'লিমা থেকে এলএডি অ্যানাস্টোমোসিস',
        description: 'End-to-side microscopic arteriotomy creates gold-standard durable conduit to the LAD.'
      },
      {
        timestampSeconds: 12,
        title: 'Aortocoronary Saphenous Vein Bridge',
        titleBn: 'অ্যাওর্টোকরোনাই স্যাফেনাস ভেইন ব্রিজ',
        description: 'Proximal punch aortotomy delivers oxygenated perfusion around distal coronary stenoses.'
      }
    ],
    questions: [
      {
        id: 'vq-surg-01',
        timestampSeconds: 8,
        prompt: 'Why is the Left Internal Mammary Artery (LIMA) the conduit of choice for bypassing the Left Anterior Descending (LAD) artery?',
        promptBn: 'এলএডি (LAD) ধমনী বাইপাস করার জন্য বাম ইন্টারনাল ম্যামারি আর্টারি (LIMA) কেন শ্রেষ্ঠ কনডুইট?',
        options: [
          'It is easier to harvest than the radial artery',
          'It exhibits superior 10-year patency rates exceeding 90% due to native endothelial nitric oxide production',
          'It has a thicker muscular media than saphenous vein',
          'It requires systemic anticoagulation with warfarin'
        ],
        correctOptionIndex: 1,
        explanation: 'The in-situ LIMA has a 10-year patency rate over 90% because its internal elastic lamina is resistant to atherosclerosis and its healthy endothelium produces continuous nitric oxide.',
        bmdcMark: 1
      }
    ],
    transcriptEn: 'Coronary Artery Bypass Grafting establishes new conduits to restore blood flow past severe arterial obstructions. The Left Internal Mammary Artery is mobilized from the chest wall and anastomosed in-situ to the Left Anterior Descending artery, conferring exceptional long-term patency. Autologous saphenous vein segments are harvested from the lower extremity, reversed, and sewn proximally to the aorta and distally beyond RCA and LCx lesions.',
    transcriptBn: 'সিএবিজি সার্জারিতে বন্ধ হয়ে যাওয়া করোনারি ধমনী বাইপাস করার জন্য বিকল্প রক্তনালী ব্যবহার করা হয়। বুকের দেয়ালের এলআইএমএ ধমনী সরাসরি এলএডি ধমনীর সাথে সেলাই করা হয় যার দীর্ঘস্থায়ী সাফল্য ৯০% এর বেশি। এছাড়া পায়ের স্যাফেনাস ভেইন ব্যবহার করে অন্যান্য ব্লকে রক্ত সরবরাহ চালু করা হয়।',
    subtitles: [
      {
        startSeconds: 0,
        endSeconds: 6,
        textEn: 'Median sternotomy provides exposure; the Left Internal Mammary Artery (LIMA) is harvested with its pedicle.',
        textBn: 'বুকের মধ্যভাগে স্টার্নোটমির মাধ্যমে এলআইএমএ (LIMA) রক্তনালীটি অপারেশনের জন্য প্রস্তুত করা হয়।'
      },
      {
        startSeconds: 6,
        endSeconds: 12,
        textEn: 'LIMA is anastomosed end-to-side to the LAD, delivering durable arterial inflow with >90% 10-year patency.',
        textBn: 'এলআইএমএ রক্তনালীটি এলএডি ধমনীর সাথে যুক্ত হয়ে হার্টে তাজা রক্ত সরবরাহ নিশ্চিত করে।'
      },
      {
        startSeconds: 12,
        endSeconds: 18,
        textEn: 'Reversed saphenous vein grafts bridge the aorta to distal coronary targets, restoring total myocardial perfusion.',
        textBn: 'পায়ের স্যাফেনাস ভেইন ব্যবহার করে মহাধমনী থেকে অন্যান্য ব্লকের পরে রক্ত সংযোগ স্থাপন করা হয়।'
      }
    ]
  }
};

/**
 * Retrieve template by lesson ID with robust alias and keyword matching.
 */
export function getLessonVideoTemplate(lessonId?: string): LessonVideoTemplate {
  if (!lessonId) {
    return LESSON_VIDEO_TEMPLATES['cvs-physio-cardiac-cycle-wiggers'];
  }

  // Direct match
  if (LESSON_VIDEO_TEMPLATES[lessonId]) {
    return LESSON_VIDEO_TEMPLATES[lessonId];
  }

  // Alias & topic matching for pilot lessons
  if (lessonId === 'cvs-path-atherosclerosis-mi' || lessonId.includes('athero') || lessonId.includes('path')) {
    return LESSON_VIDEO_TEMPLATES['cvs-path-atherosclerosis-cad'];
  }
  if (lessonId === 'cvs-pharm-antianginal-heartfailure' || lessonId.includes('pharm') || lessonId.includes('nitrate')) {
    return LESSON_VIDEO_TEMPLATES['cvs-pharm-antianginals-nitrates'];
  }
  if (lessonId === 'cvs-surg-cabg-valvular-surgery' || lessonId.includes('surg') || lessonId.includes('cabg')) {
    return LESSON_VIDEO_TEMPLATES['cvs-surg-cabg-valvular'];
  }
  if (lessonId === 'cvs-med-acute-coronary-syndrome' || lessonId.includes('heart-failure') || lessonId.includes('congestive')) {
    return LESSON_VIDEO_TEMPLATES['cvs-med-heart-failure'];
  }
  if (lessonId === 'cvs-anat-heart-morphology' || lessonId.includes('anat') || lessonId.includes('coronary')) {
    return LESSON_VIDEO_TEMPLATES['cvs-anat-heart-morphology'];
  }
  if (lessonId.includes('action-potential') || lessonId.includes('electro') || lessonId === 'cvs-biochem-cardiac-biomarkers') {
    return LESSON_VIDEO_TEMPLATES['cvs-physio-action-potential'];
  }

  return LESSON_VIDEO_TEMPLATES['cvs-physio-cardiac-cycle-wiggers'];
}

// Alias for convenience
export const getVideoTemplateForLesson = getLessonVideoTemplate;
