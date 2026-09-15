import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Info,
  HelpCircle,
  Activity,
  Heart,
  Stethoscope,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sliders,
  ChevronRight
} from 'lucide-react';
import {
  CardiacCyclePhase,
  PvLoopParameters,
  CardiacPathologyPreset,
  AuscultationSite,
  CardiacVivaQuestion
} from '../../types';
import { audioService } from '../../services/audioService';

// The 7 Authentic Medical Phases of the Cardiac Cycle (Guyton & Hall, 14th Ed. / Ganong's)
const CARDIAC_PHASES: CardiacCyclePhase[] = [
  {
    id: 1,
    name: 'Atrial Systole',
    shortCode: 'AS',
    durationMs: 100,
    ecgState: 'P Wave (Atrial Depolarization)',
    mitralValve: 'open',
    aorticValve: 'closed',
    tricuspidValve: 'open',
    pulmonaryValve: 'closed',
    ventricularPressure: 10,
    aorticPressure: 82,
    atrialPressure: 8,
    ventricularVolume: 120, // End-Diastolic Volume (EDV)
    heartSound: 'S4 (Atrial Gallop if Stiff LV)',
    atrialWave: 'a wave',
    coronaryFlowPercent: 10,
    description: 'Atria contract actively, forcing the remaining 20–30% of blood into relaxed ventricles ("atrial kick"). End-diastolic volume reaches ~120 mL.',
    clinicalPearls: 'Loss of atrial kick in Atrial Fibrillation reduces cardiac output by 20–25%. In Mitral Stenosis, this sudden loss frequently precipitates acute pulmonary edema.'
  },
  {
    id: 2,
    name: 'Isovolumetric Contraction',
    shortCode: 'IC',
    durationMs: 50,
    ecgState: 'QRS Complex (Ventricular Depolarization)',
    mitralValve: 'closed',
    aorticValve: 'closed',
    tricuspidValve: 'closed',
    pulmonaryValve: 'closed',
    ventricularPressure: 78,
    aorticPressure: 80,
    atrialPressure: 4,
    ventricularVolume: 120,
    heartSound: 'S1 (LUB: M1 + T1)',
    atrialWave: 'c wave',
    coronaryFlowPercent: 3,
    description: 'Ventricular pressure rises sharply above atrial pressure, snapping AV valves shut (producing S1). All 4 cardiac valves are closed; ventricular volume is constant while pressure skyrockets.',
    clinicalPearls: 'S1 is composed of Mitral (M1) and Tricuspid (T1) closure. Loud S1 indicates pliable valves in early Mitral Stenosis; soft S1 indicates calcified leaflets or Mitral Regurgitation.'
  },
  {
    id: 3,
    name: 'Rapid Ventricular Ejection',
    shortCode: 'RE',
    durationMs: 150,
    ecgState: 'ST Segment (Ventricular Plateau Phase)',
    mitralValve: 'closed',
    aorticValve: 'open',
    tricuspidValve: 'closed',
    pulmonaryValve: 'open',
    ventricularPressure: 120,
    aorticPressure: 120,
    atrialPressure: 5,
    ventricularVolume: 75,
    heartSound: 'None',
    atrialWave: 'x descent',
    coronaryFlowPercent: 5,
    description: 'Ventricular pressure exceeds aortic pressure (80 mmHg). Semilunar valves burst open; rapid ejection of ~70% of stroke volume into the aorta and pulmonary trunk.',
    clinicalPearls: 'Peak systolic pressure is achieved (~120 mmHg). The harsh crescendo-decrescendo ejection systolic murmur of Aortic Stenosis peaks during this phase.'
  },
  {
    id: 4,
    name: 'Reduced Ventricular Ejection',
    shortCode: 'RDE',
    durationMs: 150,
    ecgState: 'T Wave Peak (Ventricular Repolarization)',
    mitralValve: 'closed',
    aorticValve: 'open',
    tricuspidValve: 'closed',
    pulmonaryValve: 'open',
    ventricularPressure: 95,
    aorticPressure: 98,
    atrialPressure: 7,
    ventricularVolume: 50, // End-Systolic Volume (ESV)
    heartSound: 'None',
    atrialWave: 'v wave',
    coronaryFlowPercent: 7,
    description: 'Ventricular repolarization begins. Ventricular pressure falls while arterial runoff continues into peripheral vasculature. Minimum volume reached: End-Systolic Volume (ESV ~50 mL).',
    clinicalPearls: 'Normal Stroke Volume = EDV (120 mL) - ESV (50 mL) = 70 mL. Normal Ejection Fraction (EF) = 70/120 ≈ 58% (Normal range: 55–70%).'
  },
  {
    id: 5,
    name: 'Isovolumetric Relaxation',
    shortCode: 'IR',
    durationMs: 80,
    ecgState: 'End of T Wave',
    mitralValve: 'closed',
    aorticValve: 'closed',
    tricuspidValve: 'closed',
    pulmonaryValve: 'closed',
    ventricularPressure: 20,
    aorticPressure: 90,
    atrialPressure: 8,
    ventricularVolume: 50,
    heartSound: 'S2 (DUB: A2 + P2)',
    atrialWave: 'v wave',
    coronaryFlowPercent: 15,
    description: 'Ventricular pressure falls below aortic pressure. Momentum of blood creates retrograde flow, snapping semilunar valves shut (S2) and causing the dicrotic notch (incisura). All 4 valves closed.',
    clinicalPearls: 'S2 physiological splitting: during inspiration, venous return to the right heart delays P2 closure, widening the A2–P2 split. Fixed splitting of S2 is the hallmark of Atrial Septal Defect (ASD).'
  },
  {
    id: 6,
    name: 'Rapid Ventricular Filling',
    shortCode: 'RF',
    durationMs: 120,
    ecgState: 'TP Segment (Electrically Quiet Baseline)',
    mitralValve: 'open',
    aorticValve: 'closed',
    tricuspidValve: 'open',
    pulmonaryValve: 'closed',
    ventricularPressure: 5,
    aorticPressure: 84,
    atrialPressure: 3,
    ventricularVolume: 105,
    heartSound: 'S3 (Ventricular Gallop)',
    atrialWave: 'y descent',
    coronaryFlowPercent: 30,
    description: 'Ventricular pressure drops below atrial pressure. AV valves open, blood rushes passively into relaxed ventricles (~70% of filling). Coronary perfusion surges as intramyocardial vessels relax.',
    clinicalPearls: 'An abnormal S3 gallop occurs during rapid passive filling when ventricular compliance is reduced, as in Dilated Cardiomyopathy or severe congestive heart failure. Normal in young athletes and pregnancy.'
  },
  {
    id: 7,
    name: 'Reduced Ventricular Filling (Diastasis)',
    shortCode: 'DF',
    durationMs: 150,
    ecgState: 'Late TP Segment Baseline',
    mitralValve: 'open',
    aorticValve: 'closed',
    tricuspidValve: 'open',
    pulmonaryValve: 'closed',
    ventricularPressure: 6,
    aorticPressure: 80,
    atrialPressure: 4,
    ventricularVolume: 115,
    heartSound: 'None',
    atrialWave: 'none',
    coronaryFlowPercent: 30,
    description: 'Passive slow filling of ventricles as venous return flows directly through the atria into the ventricles (adds ~10% volume). This phase is the first to be severely shortened during tachycardia.',
    clinicalPearls: 'When heart rate exceeds 160 bpm, diastasis is virtually eliminated, impairing ventricular filling and critically dropping stroke volume and coronary perfusion time.'
  }
];

// Pathological Presets with authentic hemodynamics and clinical hallmarks
const PATHOLOGY_PRESETS: CardiacPathologyPreset[] = [
  {
    id: 'normal',
    name: 'Normal Healthy Heart',
    subtitle: '75 bpm • Normal Hemodynamics & Valve Competence',
    murmurType: 'None (Clean physiological S1 and S2)',
    classicSign: 'Clear S1 and S2 with physiological inspiratory splitting',
    bmdcExamYield: 'Standard baseline: SV 70 mL, EDV 120 mL, ESV 50 mL, EF 58%, BP 120/80 mmHg.',
    wiggersFeatures: [
      'Normal dicrotic notch on aortic pressure curve',
      'LV peak pressure matches aortic systolic peak (120 mmHg)',
      'Normal a, c, and v atrial pressure waves'
    ],
    pvLoopChanges: [
      'Rectangular loop bounded between 50 mL and 120 mL volume',
      'Normal ESPVR slope (contractility) and EDPVR curve'
    ],
    auscultationArea: 'mitral',
    soundGenerator: 'normal'
  },
  {
    id: 'aortic-stenosis',
    name: 'Aortic Valve Stenosis (AS)',
    subtitle: 'Calcific or Bicuspid • Severe Outflow Obstruction',
    murmurType: 'Crescendo-decrescendo harsh ejection systolic murmur (radiates to carotids)',
    classicSign: 'Pulsus parvus et tardus (slow-rising, low-amplitude pulse), delayed A2',
    bmdcExamYield: 'Classic triad: Angina, Syncope on exertion, Dyspnea (Heart failure). Sad triad predicts mortality.',
    wiggersFeatures: [
      'Massive systolic pressure gradient: LV pressure rises to 200 mmHg while Aortic pressure struggles to reach 100 mmHg',
      'Slow upstroke (anacrotic limb) on the aortic pressure tracing',
      'Soft or absent A2 component of S2 due to immobile calcified cusps'
    ],
    pvLoopChanges: [
      'Loop shifted markedly upward to very high peak systolic pressure (>200 mmHg)',
      'Stroke volume reduced; left ventricular hypertrophy reduces compliance (steeper EDPVR)'
    ],
    auscultationArea: 'aortic',
    soundGenerator: 'as'
  },
  {
    id: 'aortic-regurgitation',
    name: 'Aortic Regurgitation (AR)',
    subtitle: 'Aortic Root Dilation / Rheumatic • Severe Diastolic Backflow',
    murmurType: 'Early diastolic high-pitched decrescendo blowing murmur (best heard at Erb\'s point leaning forward in expiration)',
    classicSign: 'Water-hammer (Corrigan) collapsing pulse, wide pulse pressure (e.g. 160/40 mmHg)',
    bmdcExamYield: 'Eponymous signs: De Musset sign (head nodding), Quincke sign (capillary nailbed pulsation), Duroziez sign (femoral double murmur).',
    wiggersFeatures: [
      'Loss of distinct dicrotic notch due to incompetent aortic valve',
      'Precipitous drop in aortic diastolic pressure down to 40 mmHg due to runoff back into LV',
      'Hyperdynamic systolic ejection with elevated aortic peak (~160 mmHg)'
    ],
    pvLoopChanges: [
      'Loss of true isovolumetric relaxation phase (blood enters LV during diastole from aorta)',
      'Huge rightward expansion: EDV jumps to 180 mL; enormous total stroke volume'
    ],
    auscultationArea: 'erbs',
    soundGenerator: 'ar'
  },
  {
    id: 'mitral-stenosis',
    name: 'Mitral Valve Stenosis (MS)',
    subtitle: 'Post-Rheumatic (#1 in Bangladesh) • Impaired LV Inflow',
    murmurType: 'Opening Snap (OS) followed by low-pitched mid-diastolic rumble with presystolic accentuation',
    classicSign: 'Malar flush (mitral facies), tapping apex beat, loud S1',
    bmdcExamYield: 'Shorter A2-to-Opening Snap interval signifies more severe stenosis (higher LA pressure pushes valve open earlier).',
    wiggersFeatures: [
      'Huge diastolic pressure gradient between Left Atrium (>25 mmHg) and Left Ventricle (~5 mmHg)',
      'Giant atrial "a" wave on left atrial and JVP pressure tracings',
      'Opening snap audible right after S2 at start of rapid filling'
    ],
    pvLoopChanges: [
      'Loop shifted to the left with reduced EDV (~90 mL) due to impaired filling',
      'Decreased stroke volume and cardiac output'
    ],
    auscultationArea: 'mitral',
    soundGenerator: 'ms'
  },
  {
    id: 'mitral-regurgitation',
    name: 'Mitral Regurgitation (MR)',
    subtitle: 'MVP / Ischemic Papillary Dysfunction • Systolic Incompetence',
    murmurType: 'High-pitched blowing holosystolic (pansystolic) murmur radiating to left axilla',
    classicSign: 'Displaced hyperdynamic apex beat, soft S1, prominent S3 gallop',
    bmdcExamYield: 'Handgrip exercise increases systemic afterload and intensifies MR murmur; Valsalva decreases venous return and softens MR murmur.',
    wiggersFeatures: [
      'Giant regurgitant "v" wave in Left Atrium reaching 35–40 mmHg during ventricular systole',
      'Loss of true isovolumetric contraction phase (blood escapes into low-pressure LA immediately)',
      'Early aortic valve closure because blood has two escape routes'
    ],
    pvLoopChanges: [
      'No vertical isovolumetric contraction limb (diagonal slope into ejection)',
      'High EDV with enlarged loop, but effective forward stroke volume is reduced'
    ],
    auscultationArea: 'mitral',
    soundGenerator: 'mr'
  },
  {
    id: 'heart-failure',
    name: 'Systolic Heart Failure / Dilated Cardiomyopathy',
    subtitle: 'Severely Depressed Contractility (HFrEF, EF ~28%)',
    murmurType: 'Pathological S3 Ventricular Gallop (KEN-TUCK-Y cadence)',
    classicSign: 'Bilateral basal crepitations, raised JVP, S3 gallop, hepatojugular reflux',
    bmdcExamYield: 'S3 gallop is caused by rapid deceleration of inflow into a dilated, non-compliant, volume-overloaded ventricle.',
    wiggersFeatures: [
      'Blunted LV peak systolic pressure (~90 mmHg)',
      'Chronically elevated LV end-diastolic pressure (>20 mmHg)',
      'Prominent S3 waveform on phonocardiogram during early rapid filling'
    ],
    pvLoopChanges: [
      'Massive rightward shift: EDV 170 mL, ESV 125 mL (EF = 45/170 ≈ 26%)',
      'Severely depressed ESPVR slope reflecting compromised inotropy'
    ],
    auscultationArea: 'mitral',
    soundGenerator: 's3'
  },
  {
    id: 'hypertension-lvh',
    name: 'Hypertensive Heart Disease / Stiff Non-Compliant LV',
    subtitle: 'Concentric LVH • High Afterload with Diastolic Dysfunction',
    murmurType: 'Pathological S4 Atrial Gallop (TEN-NES-SEE cadence)',
    classicSign: 'Heaving sustained apex beat, prominent palpable S4, elevated blood pressure',
    bmdcExamYield: 'S4 is never heard in Atrial Fibrillation because it strictly requires active atrial contraction.',
    wiggersFeatures: [
      'Elevated aortic and LV systolic peak (>160 mmHg)',
      'Prominent pre-systolic atrial "a" wave spike',
      'Prominent S4 sound occurring just before S1 during late diastole'
    ],
    pvLoopChanges: [
      'Steeper EDPVR curve reflecting non-compliant, stiff ventricular wall',
      'Elevated peak systolic pressure with high afterload'
    ],
    auscultationArea: 'mitral',
    soundGenerator: 's4'
  }
];

// Auscultation Sites on the Anterior Human Chest
const AUSCULTATION_SITES: AuscultationSite[] = [
  {
    id: 'aortic',
    name: 'Aortic Area',
    ribSpace: '2nd Right Intercostal Space',
    anatomicalLocation: 'Right sternal border, 2nd intercostal space',
    primarySoundHeard: 'A2 component of S2, ejection clicks, Aortic Stenosis murmur',
    bestManeuver: 'Patient sitting upright, leaning forward, deep expiration',
    radiationTo: 'Carotid arteries (neck)',
    coordinates: { x: 38, y: 32 }
  },
  {
    id: 'pulmonic',
    name: 'Pulmonic Area',
    ribSpace: '2nd Left Intercostal Space',
    anatomicalLocation: 'Left sternal border, 2nd intercostal space',
    primarySoundHeard: 'P2 component of S2, physiological splitting, Pulmonic Stenosis',
    bestManeuver: 'Normal breathing to evaluate inspiratory widening of S2 splitting',
    radiationTo: 'Left shoulder / back',
    coordinates: { x: 62, y: 32 }
  },
  {
    id: 'erbs',
    name: 'Erb\'s Point',
    ribSpace: '3rd Left Intercostal Space',
    anatomicalLocation: 'Left sternal border, 3rd intercostal space',
    primarySoundHeard: 'Aortic Regurgitation early diastolic murmur, Hypertrophic Cardiomyopathy',
    bestManeuver: 'Sitting forward with breath held in expiration (high-frequency diaphragm)',
    radiationTo: 'Left lower sternal border towards the apex',
    coordinates: { x: 58, y: 44 }
  },
  {
    id: 'tricuspid',
    name: 'Tricuspid Area',
    ribSpace: '4th & 5th Left Intercostal Space',
    anatomicalLocation: 'Lower left sternal border',
    primarySoundHeard: 'T1 component of S1, Tricuspid Regurgitation (Carvallo sign), VSD murmur',
    bestManeuver: 'Inspiration (increases right-sided murmurs: Carvallo\'s sign)',
    radiationTo: 'Right sternal border / epigastrium',
    coordinates: { x: 55, y: 56 }
  },
  {
    id: 'mitral',
    name: 'Mitral / Apex Area',
    ribSpace: '5th Left Intercostal Space',
    anatomicalLocation: 'Midclavicular line, 5th intercostal space (Apex Beat)',
    primarySoundHeard: 'M1 component of S1, Mitral Stenosis rumble & OS, Mitral Regurgitation, S3 & S4 gallops',
    bestManeuver: 'Left lateral decubitus position with bell of stethoscope lightly applied',
    radiationTo: 'Left axilla (for Mitral Regurgitation)',
    coordinates: { x: 70, y: 66 }
  }
];

// BM&DC & Guyton & Hall High-Yield Exam Viva Questions
const VIVA_QUESTIONS: CardiacVivaQuestion[] = [
  {
    id: 'q1',
    question: 'In which phase of the cardiac cycle does peak left coronary artery blood flow occur?',
    options: [
      'Rapid ventricular ejection (systole)',
      'Isovolumetric contraction',
      'Rapid ventricular filling & early diastole',
      'Atrial systole'
    ],
    correctIndex: 2,
    explanation: 'During ventricular systole, strong intramyocardial compression constricts intramyocardial coronary vessels, reducing left coronary blood flow. In diastole, the myocardium relaxes, allowing coronary perfusion pressure to drive ~70–80% of total left ventricular coronary blood flow.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 21: Muscle Blood Flow and Cardiac Output During Exercise; the Coronary Circulation.'
  },
  {
    id: 'q2',
    question: 'What physiological event is directly responsible for the dicrotic notch (incisura) on the aortic pressure tracing?',
    options: [
      'Rapid inflow of blood into the left atrium',
      'Closure of the aortic valve and momentary elastic recoil of blood against the leaflets',
      'Contraction of the papillary muscles pulling chordae tendineae',
      'Opening of the mitral valve at the start of rapid filling'
    ],
    correctIndex: 1,
    explanation: 'As left ventricular pressure falls below aortic pressure at the end of systole, blood briefly flows retrograde towards the heart, snapping the aortic valve shut. The elastic rebound of blood against closed cusps and the aortic wall causes the sharp dicrotic notch.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: Cardiac Muscle; The Heart as a Pump.'
  },
  {
    id: 'q3',
    question: 'What is the pathophysiological mechanism responsible for the third heart sound (S3 gallop)?',
    options: [
      'Vibration of calcified aortic leaflets during ejection',
      'Rapid passive deceleration of blood into a dilated, volume-overloaded, non-compliant ventricle',
      'Atrial contraction forcing blood against a stiff hypertrophied ventricular wall',
      'Closure of the pulmonary valve after the aortic valve'
    ],
    correctIndex: 1,
    explanation: 'S3 occurs during the rapid ventricular filling phase of early diastole (~0.12–0.18s after S2). It is caused by sudden deceleration of inflow as it strikes a dilated ventricle with high filling pressure, characteristic of systolic heart failure or dilated cardiomyopathy.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 23: Heart Sounds; Valvular and Congenital Heart Defects.'
  },
  {
    id: 'q4',
    question: 'During Isovolumetric Contraction, which of the following statements is TRUE?',
    options: [
      'Aortic valve is open and mitral valve is closed',
      'All 4 cardiac valves are closed and ventricular volume remains unchanged',
      'Ventricular pressure is lower than atrial pressure',
      'Coronary blood flow is at its peak'
    ],
    correctIndex: 1,
    explanation: 'Isovolumetric contraction begins with closure of the AV valves (producing S1). The semilunar valves have not yet opened (since LV pressure is still below the ~80 mmHg aortic pressure). With all 4 valves closed, volume is locked constant (~120 mL) while tension and pressure escalate rapidly.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: The Cardiac Cycle.'
  },
  {
    id: 'q5',
    question: 'What physiological event generates the "a" wave on the left atrial and central venous pressure (JVP) curves?',
    options: [
      'Atrial active contraction (atrial systole)',
      'Bulging of the tricuspid/mitral valve into the atrium during isovolumetric contraction',
      'Passive filling of the atrium against closed AV valves',
      'Rapid emptying of the atrium into the ventricle'
    ],
    correctIndex: 0,
    explanation: 'The "a" wave is produced by active atrial contraction (systole). The "c" wave is produced by bulging of the AV valves back into the atria during isovolumetric ventricular contraction. The "v" wave is caused by venous filling against closed AV valves.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: Rhythmical Contraction of the Heart.'
  },
  {
    id: 'q6',
    question: 'Why is the fourth heart sound (S4) never heard in patients with Atrial Fibrillation?',
    options: [
      'Because the mitral valve fails to close completely in atrial fibrillation',
      'Because S4 is generated by active atrial kick, which is absent in atrial fibrillation',
      'Because ventricular compliance is always normal in atrial fibrillation',
      'Because aortic pressure is too low in atrial fibrillation'
    ],
    correctIndex: 1,
    explanation: 'S4 is a pre-systolic sound caused by active contraction of the atria pushing blood into a stiff, non-compliant ventricle (as in concentric LVH or hypertension). In atrial fibrillation, synchronized active atrial contraction is absent; hence, an S4 can never occur.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 23: Heart Murmurs and Abnormal Heart Sounds.'
  },
  {
    id: 'q7',
    question: 'How does severe tachycardia (e.g. heart rate = 175 bpm) primarily compromise cardiac output and coronary perfusion?',
    options: [
      'By selectively prolonging isovolumetric contraction',
      'By markedly shortening diastole (especially diastasis and slow filling), reducing EDV and coronary perfusion time',
      'By decreasing myocardial oxygen demand',
      'By opening semilunar valves prematurely'
    ],
    correctIndex: 1,
    explanation: 'As heart rate rises, systole shortens slightly, but diastole shortens drastically (from ~500 ms at 75 bpm down to <150 ms at 180 bpm). Diastasis is eliminated and rapid filling is compromised, dropping EDV and reducing time for left coronary perfusion.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: Effect of Heart Rate on Cycle Duration.'
  },
  {
    id: 'q8',
    question: 'According to the Frank-Starling Law of the Heart, what is the primary consequence of increasing End-Diastolic Volume (Preload)?',
    options: [
      'Decreased stroke volume and increased end-systolic volume',
      'Increased stretch of ventricular myocytes leading to increased force of contraction and greater stroke volume',
      'Immediate drop in aortic systolic blood pressure',
      'Permanent closure of the aortic valve'
    ],
    correctIndex: 1,
    explanation: 'The Frank-Starling mechanism states that within physiological limits, the greater the heart muscle is stretched during filling (increased preload / EDV), the greater the force of contraction and the greater the quantity of blood pumped into the aorta.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: Frank-Starling Mechanism of the Heart.'
  },
  {
    id: 'q9',
    question: 'Which physical exam maneuver classically increases the intensity of the early diastolic murmur of Aortic Regurgitation?',
    options: [
      'Valsalva maneuver (strain phase)',
      'Standing up suddenly',
      'Patient sitting upright, leaning forward, with full held expiration',
      'Inspiration (Carvallo\'s maneuver)'
    ],
    correctIndex: 2,
    explanation: 'Sitting upright and leaning forward brings the aortic root closer to the anterior chest wall. Full expiration minimizes air in the lung parenchyma, reducing acoustic dampening and making the high-frequency decrescendo blowing murmur best audible at Erb\'s point using the diaphragm.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 23: Clinical Examination of Valvular Lesions.'
  },
  {
    id: 'q10',
    question: 'In a patient with End-Diastolic Volume (EDV) of 130 mL and End-Systolic Volume (ESV) of 52 mL, what is the calculated Ejection Fraction?',
    options: [
      '40% (Borderline / Mild dysfunction)',
      '60% (Normal healthy ejection fraction)',
      '78% (Hyperdynamic state)',
      '50% (Low normal)'
    ],
    correctIndex: 1,
    explanation: 'Stroke Volume (SV) = EDV - ESV = 130 - 52 = 78 mL. Ejection Fraction (EF) = (SV / EDV) * 100% = (78 / 130) * 100% = 60%. Normal healthy resting EF is 55% to 70%.',
    guytonCitation: 'Guyton & Hall Physiology 14th Ed., Chapter 9: Estimation of Cardiac Pumping Function.'
  }
];

export const CardiacCycleLab: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'wiggers' | 'pv-loop' | 'pathology' | 'auscultation' | 'viva'>('wiggers');

  // Wiggers cycle state
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(1); // default to Isovolumetric Contraction
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [timelineScrubMs, setTimelineScrubMs] = useState<number>(120); // 0 to 800 ms
  const timerRef = useRef<number | null>(null);

  // PV Loop Interactive Modifiers
  const [pvParams, setPvParams] = useState<PvLoopParameters>({
    preloadEdv: 120,
    afterloadMap: 100,
    inotropyPercent: 100,
    heartRateBpm: 75
  });

  // Pathology Tab State
  const [selectedPathologyId, setSelectedPathologyId] = useState<string>('normal');

  // Auscultation Tab State
  const [selectedAuscultationSite, setSelectedAuscultationSite] = useState<AuscultationSite>(AUSCULTATION_SITES[4]); // default Mitral/Apex
  const [stethoscopeFilter, setStethoscopeFilter] = useState<'bell' | 'diaphragm'>('diaphragm');

  // Viva Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [id: string]: boolean }>({});

  const phase = CARDIAC_PHASES[currentPhaseIndex];
  const activePathology = PATHOLOGY_PRESETS.find((p) => p.id === selectedPathologyId) || PATHOLOGY_PRESETS[0];

  // Trigger heart sound on phase entry
  useEffect(() => {
    if (!soundEnabled) return;
    if (phase.heartSound.includes('S1')) {
      audioService.playS1();
    } else if (phase.heartSound.includes('S2')) {
      audioService.playS2();
    } else if (phase.heartSound.includes('S3')) {
      audioService.playS3();
    } else if (phase.heartSound.includes('S4')) {
      audioService.playS4();
    }
  }, [currentPhaseIndex, soundEnabled, phase.heartSound]);

  // Animation cycle loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const duration = phase.durationMs / playbackSpeed;
    timerRef.current = window.setTimeout(() => {
      setCurrentPhaseIndex((prev) => (prev + 1) % CARDIAC_PHASES.length);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPhaseIndex, playbackSpeed, phase.durationMs]);

  // Play sound for specific pathology
  const handlePlayPathologySound = (generator: string) => {
    if (!soundEnabled) return;
    switch (generator) {
      case 'as':
        audioService.playS1();
        audioService.playAorticStenosisMurmur();
        setTimeout(() => audioService.playS2(), 350);
        break;
      case 'ar':
        audioService.playS1();
        setTimeout(() => {
          audioService.playS2();
          audioService.playAorticRegurgitationMurmur();
        }, 300);
        break;
      case 'ms':
        audioService.playS1();
        setTimeout(() => {
          audioService.playS2();
          audioService.playMitralStenosisMurmur();
        }, 320);
        break;
      case 'mr':
        audioService.playS1();
        audioService.playMitralRegurgitationMurmur();
        setTimeout(() => audioService.playS2(), 380);
        break;
      case 's3':
        audioService.playS1();
        setTimeout(() => {
          audioService.playS2();
          setTimeout(() => audioService.playS3(), 140);
        }, 300);
        break;
      case 's4':
        audioService.playS4();
        setTimeout(() => {
          audioService.playS1();
          setTimeout(() => audioService.playS2(), 300);
        }, 120);
        break;
      default:
        audioService.playS1();
        setTimeout(() => audioService.playS2(), 300);
        break;
    }
  };

  // Play sound for auscultation site
  const handleAuscultateSite = (site: AuscultationSite) => {
    setSelectedAuscultationSite(site);
    if (!soundEnabled) return;
    if (selectedPathologyId !== 'normal') {
      handlePlayPathologySound(activePathology.soundGenerator);
    } else {
      audioService.playS1();
      setTimeout(() => audioService.playS2(), 300);
    }
  };

  // Compute live PV Loop calculations
  // SV = EDV - ESV
  // ESV depends on Afterload / Inotropy: base ESV ~ 50. High afterload increases ESV; High inotropy decreases ESV.
  const calculatedEsv = Math.max(
    25,
    Math.min(
      pvParams.preloadEdv - 15,
      Math.round(50 * (pvParams.afterloadMap / 100) * (100 / pvParams.inotropyPercent))
    )
  );
  const calculatedSv = pvParams.preloadEdv - calculatedEsv;
  const calculatedEf = Math.round((calculatedSv / pvParams.preloadEdv) * 100);
  const calculatedCo = ((calculatedSv * pvParams.heartRateBpm) / 1000).toFixed(2);
  const calculatedSw = Math.round((calculatedSv * (pvParams.afterloadMap - 10)) / 100);

  // Handle Viva Quiz Answer
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const q = VIVA_QUESTIONS[currentQuestionIndex];
    if (index === q.correctIndex && !answeredQuestions[q.id]) {
      setQuizScore((prev) => prev + 1);
      audioService.playSuccessTone();
    } else if (index !== q.correctIndex) {
      audioService.playAlertBeep();
    }
    setAnsweredQuestions((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < VIVA_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-500/40 flex items-center gap-1.5 shadow-glow-cyan">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Living Physiology Simulation Lab • BM&DC Curriculum
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Guyton & Hall / Ganong Correlated
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Cardiac Cycle & Hemodynamics Suite
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Continuous synchronized Wiggers diagram, dynamic Pressure-Volume (PV) loops, 4-valve mechanical animations, virtual chest auscultation, and clinical pathology simulations.
          </p>
        </div>

        {/* Global Controls: Audio & Playback */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              soundEnabled
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-glow-cyan'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle synthesized Web Audio heart sounds & murmurs"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Acoustics ON' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-glow-cyan'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Cycle' : 'Run Cycle'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentPhaseIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset Cycle to Phase 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('wiggers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'wiggers'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-glow-cyan'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Wiggers Diagram & 7 Phases</span>
        </button>

        <button
          onClick={() => setActiveTab('pv-loop')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'pv-loop'
              ? 'bg-blue-600 text-white border-blue-400 shadow-glow-blue'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-blue-400" />
          <span>Pressure-Volume (PV) Loop Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('pathology')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'pathology'
              ? 'bg-rose-600 text-white border-rose-400 shadow-glow-rose'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Valvular & Myocardial Pathology</span>
        </button>

        <button
          onClick={() => setActiveTab('auscultation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'auscultation'
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-glow-emerald'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-emerald-400" />
          <span>Virtual Auscultation & Stethoscope</span>
        </button>

        <button
          onClick={() => setActiveTab('viva')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'viva'
              ? 'bg-purple-600 text-white border-purple-400'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Viva & OSPE Exam Station ({quizScore}/10)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: WIGGERS DIAGRAM & 7 CARDIAC PHASES */}
      {/* ========================================================================= */}
      {activeTab === 'wiggers' && (
        <div className="space-y-6">
          {/* Phase scrubber bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {CARDIAC_PHASES.map((p, idx) => {
              const isActive = idx === currentPhaseIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPhaseIndex(idx)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-glow-cyan scale-[1.02]'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                      Phase 0{p.id}
                    </span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                      {p.durationMs}ms
                    </span>
                  </div>
                  <div className="font-bold text-xs truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{p.shortCode} • {p.ecgState.split('(')[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Master Wiggers SVG Canvas & Waveforms */}
          <div className="glass-panel-elevated p-5 md:p-6 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Synchronized Wiggers Diagram (800 ms Total Cycle)
                </span>
                <span className="text-slate-400 font-mono hidden md:inline">
                  Active Phase: {phase.shortCode} ({phase.name})
                </span>
              </div>

              {/* Legends */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  LV Pressure (mmHg)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  Aorta (Incisura)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                  LA Pressure (a, c, v)
                </span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                  LV Volume (mL)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  ECG (mV)
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
                  Phono (Sound)
                </span>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="w-full h-80 bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden select-none">
              {/* Vertical Phase Partition Lines */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 800 320" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cursorGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="60" x2="800" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="800" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="800" y2="180" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="240" x2="800" y2="240" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Phase dividing vertical markers:
                    AS: 0-100 (100)
                    IC: 100-150 (150)
                    RE: 150-300 (300)
                    RDE: 300-450 (450)
                    IR: 450-530 (530)
                    RF: 530-650 (650)
                    DF: 650-800 (800)
                */}
                {[100, 150, 300, 450, 530, 650].map((xVal) => (
                  <line key={xVal} x1={xVal} y1="0" x2={xVal} y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                ))}

                {/* --- 1. AORTIC PRESSURE (mmHg) curve in Amber --- */}
                {/* 80 -> drops slightly in AS -> aortic valve opens at 150ms -> peaks 120 at 220ms -> 100 at 450ms -> incisura notch at 460ms -> slow runoff to 80 at 800ms */}
                <path
                  d="M 0 100 L 100 102 L 150 105 Q 220 20 300 35 Q 380 50 450 75 L 460 68 L 470 76 Q 630 92 800 100"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                {/* --- 2. LEFT VENTRICULAR PRESSURE (mmHg) curve in Rose --- */}
                {/* Diastole ~5-10 mmHg -> Atrial kick spike at 50ms -> Isovolumetric sharp rise 100-150ms from 10 to 80 -> Ejection peaks 120 at 220ms -> Falls to 95 at 450ms -> Isovolumetric relaxation plummets to 10 at 530ms -> baseline 5 mmHg */}
                <path
                  d="M 0 165 Q 50 160 100 165 L 100 165 L 150 105 Q 220 20 300 35 Q 380 50 450 80 L 530 168 Q 650 170 800 165"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3"
                />

                {/* --- 3. LEFT ATRIAL PRESSURE with a, c, v waves in Cyan --- */}
                {/* a wave (50ms), c wave (120ms), x descent (200ms), v wave (450ms), y descent (550ms) */}
                <path
                  d="M 0 170 Q 50 162 100 170 Q 125 164 150 170 Q 250 174 350 170 Q 450 160 480 170 Q 550 175 650 172 L 800 170"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                />

                {/* --- 4. VENTRICULAR VOLUME (mL) in Blue --- */}
                {/* 120 mL EDV -> remains 120 in IC -> plunges 120 to 75 in RE -> drops to 50 ESV in RDE -> remains 50 in IR -> rapid rise 50 to 105 in RF -> slow rise to 115 in DF */}
                <path
                  d="M 0 195 Q 50 190 100 190 L 150 190 Q 220 220 300 230 Q 380 240 450 250 L 530 250 Q 590 210 650 200 Q 725 195 800 195"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />

                {/* --- 5. ELECTROCARDIOGRAM (ECG) in Emerald --- */}
                {/* P wave (30-80ms), PR (80-110ms), QRS (110-145ms), ST (145-300ms), T wave (300-430ms), Baseline (430-800ms) */}
                <path
                  d="M 0 275 L 30 275 Q 55 267 80 275 L 115 275 L 120 278 L 128 252 L 136 284 L 142 275 L 290 275 Q 365 264 440 275 L 800 275"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* --- 6. PHONOCARDIOGRAM in Purple --- */}
                {/* S4 (60ms), S1 (110-150ms), S2 (450-480ms), S3 (570ms) */}
                {/* S1 oscillations */}
                <path d="M 115 305 L 120 298 L 125 312 L 130 296 L 135 314 L 140 305" fill="none" stroke="#a855f7" strokeWidth="1.8" />
                {/* S2 oscillations */}
                <path d="M 450 305 L 455 299 L 460 311 L 465 299 L 470 305" fill="none" stroke="#a855f7" strokeWidth="1.8" />

                {/* Waveform Annotations */}
                <text x="55" y="157" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="monospace">a wave</text>
                <text x="125" y="158" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="monospace">c wave</text>
                <text x="445" y="155" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="monospace">v wave</text>
                <text x="465" y="60" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">incisura</text>
                <text x="128" y="247" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">QRS</text>
                <text x="125" y="320" fill="#a855f7" fontSize="9" fontWeight="bold" fontFamily="monospace">S1</text>
                <text x="455" y="320" fill="#a855f7" fontSize="9" fontWeight="bold" fontFamily="monospace">S2</text>

                {/* Interactive Playhead / Scrubber Line */}
                {/* Phase Centers: AS: 50, IC: 125, RE: 225, RDE: 375, IR: 490, RF: 590, DF: 725 */}
                {(() => {
                  const phaseCenterMap = [50, 125, 225, 375, 490, 590, 725];
                  const cursorX = phaseCenterMap[currentPhaseIndex] || 125;
                  return (
                    <g>
                      <rect x={cursorX - 25} y="0" width="50" height="320" fill="url(#cursorGlow)" opacity="0.3" />
                      <line x1={cursorX} y1="0" x2={cursorX} y2="320" stroke="#06b6d4" strokeWidth="2.5" />
                      <polygon points={`${cursorX - 5},0 ${cursorX + 5},0 ${cursorX},8`} fill="#06b6d4" />
                      <circle cx={cursorX} cy="15" r="3" fill="#ffffff" />
                    </g>
                  );
                })()}
              </svg>

              {/* Time markers bar on bottom */}
              <div className="absolute bottom-1 inset-x-0 flex justify-between px-3 text-[9px] font-mono text-slate-500 pointer-events-none">
                <span>0 ms (P wave)</span>
                <span>100 ms (AV closes)</span>
                <span>150 ms (Aortic opens)</span>
                <span>300 ms (Peak Systole)</span>
                <span>450 ms (Aortic closes)</span>
                <span>530 ms (Mitral opens)</span>
                <span>650 ms (Diastasis)</span>
                <span>800 ms</span>
              </div>
            </div>

            {/* Click to scrub time bar */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] font-semibold text-slate-400">Interactive Scrubber:</span>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={currentPhaseIndex}
                onChange={(e) => {
                  setCurrentPhaseIndex(parseInt(e.target.value, 10));
                  setIsPlaying(false);
                }}
                className="flex-1 accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-cyan-400 min-w-[70px]">
                {phase.shortCode} ({phase.durationMs}ms)
              </span>
            </div>
          </div>

          {/* Real-time Hemodynamics & 4-Valve Mechanical Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Hemodynamic Gauges (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel-elevated p-5 rounded-2xl border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Real-Time Hemodynamics
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    Phase {phase.id}/7
                  </span>
                </div>

                {/* Left Ventricular Pressure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">LV Chamber Pressure:</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{phase.ventricularPressure} mmHg</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-200 rounded-full"
                      style={{ width: `${Math.min(100, (phase.ventricularPressure / 130) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Aortic Pressure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Aortic Root Pressure:</span>
                    <span className="text-amber-400 font-bold font-mono text-sm">{phase.aorticPressure} mmHg</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-200 rounded-full"
                      style={{ width: `${Math.min(100, (phase.aorticPressure / 130) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Left Atrial Pressure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Left Atrial Pressure:</span>
                    <span className="text-cyan-400 font-bold font-mono text-sm">
                      {phase.atrialPressure} mmHg {phase.atrialWave && phase.atrialWave !== 'none' ? `(${phase.atrialWave})` : ''}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-200 rounded-full"
                      style={{ width: `${Math.min(100, (phase.atrialPressure / 20) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Left Ventricular Volume */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">LV Volume (Filling):</span>
                    <span className="text-blue-400 font-bold font-mono text-sm">{phase.ventricularVolume} mL</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-200 rounded-full"
                      style={{ width: `${Math.min(100, (phase.ventricularVolume / 140) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>ESV: 50 mL</span>
                    <span>SV: 70 mL</span>
                    <span>EDV: 120 mL</span>
                  </div>
                </div>

                {/* Left Coronary Perfusion Indicator (Guyton Viva Gold) */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Coronary Perfusion Rate:
                    </span>
                    <span className="text-amber-300 font-bold font-mono">{phase.coronaryFlowPercent}% of cycle</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-amber-500 transition-all duration-200 rounded-full"
                      style={{ width: `${(phase.coronaryFlowPercent / 35) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {phase.coronaryFlowPercent > 15
                      ? 'High flow: intramyocardial compression is relieved during ventricular diastole.'
                      : 'Low flow: contracting ventricular myocardium constricts intramyocardial coronary vessels.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle & Right: 4-Valve Mechanics & Clinical Pearls (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* 4-Valve Mechanical Cross-Section */}
              <div className="glass-panel-elevated p-5 rounded-2xl border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Cardiac Valve Mechanics & State
                  </h3>
                  <span className="text-xs font-bold text-rose-400 font-mono">
                    Sound: {phase.heartSound}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Mitral Valve */}
                  <div className={`p-3 rounded-xl border text-center transition-all ${
                    phase.mitralValve === 'open'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] uppercase font-mono tracking-wider mb-1">Left AV</div>
                    <div className="font-bold text-xs">Mitral (Bicuspid)</div>
                    <div className="text-sm font-extrabold font-mono mt-1 uppercase">
                      {phase.mitralValve}
                    </div>
                  </div>

                  {/* Aortic Valve */}
                  <div className={`p-3 rounded-xl border text-center transition-all ${
                    phase.aorticValve === 'open'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] uppercase font-mono tracking-wider mb-1">Left Semilunar</div>
                    <div className="font-bold text-xs">Aortic Valve</div>
                    <div className="text-sm font-extrabold font-mono mt-1 uppercase">
                      {phase.aorticValve}
                    </div>
                  </div>

                  {/* Tricuspid Valve */}
                  <div className={`p-3 rounded-xl border text-center transition-all ${
                    phase.tricuspidValve === 'open'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] uppercase font-mono tracking-wider mb-1">Right AV</div>
                    <div className="font-bold text-xs">Tricuspid Valve</div>
                    <div className="text-sm font-extrabold font-mono mt-1 uppercase">
                      {phase.tricuspidValve}
                    </div>
                  </div>

                  {/* Pulmonary Valve */}
                  <div className={`p-3 rounded-xl border text-center transition-all ${
                    phase.pulmonaryValve === 'open'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] uppercase font-mono tracking-wider mb-1">Right Semilunar</div>
                    <div className="font-bold text-xs">Pulmonary Valve</div>
                    <div className="text-sm font-extrabold font-mono mt-1 uppercase">
                      {phase.pulmonaryValve}
                    </div>
                  </div>
                </div>

                {/* Phase Description */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Physiological Mechanism:
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      ECG Correlation: {phase.ecgState}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {/* Clinical Pearl Box */}
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-1">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    High-Yield BM&DC Viva & Exam Pearl:
                  </div>
                  <p className="text-xs text-cyan-100/90 leading-relaxed">
                    {phase.clinicalPearls}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PRESSURE-VOLUME (PV) LOOP SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'pv-loop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Sliders & Parameter Modifiers (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel-elevated p-5 rounded-2xl border border-blue-500/30 space-y-4">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-400" />
                Hemodynamic Parameter Controls
              </h3>

              {/* Preload Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">1. Preload (EDV):</span>
                  <span className="text-cyan-400 font-bold font-mono">{pvParams.preloadEdv} mL</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="160"
                  step="5"
                  value={pvParams.preloadEdv}
                  onChange={(e) => setPvParams({ ...pvParams, preloadEdv: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Venous return & filling. Increases stroke volume via the Frank-Starling mechanism.
                </p>
              </div>

              {/* Afterload Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">2. Afterload (MAP):</span>
                  <span className="text-rose-400 font-bold font-mono">{pvParams.afterloadMap} mmHg</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="160"
                  step="5"
                  value={pvParams.afterloadMap}
                  onChange={(e) => setPvParams({ ...pvParams, afterloadMap: parseInt(e.target.value, 10) })}
                  className="w-full accent-rose-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Total Peripheral Resistance (TPR) / Aortic pressure. High afterload increases ESV & decreases SV.
                </p>
              </div>

              {/* Inotropy (Contractility) Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">3. Myocardial Inotropy:</span>
                  <span className="text-amber-400 font-bold font-mono">{pvParams.inotropyPercent}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={pvParams.inotropyPercent}
                  onChange={(e) => setPvParams({ ...pvParams, inotropyPercent: parseInt(e.target.value, 10) })}
                  className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Sympathetic tone & contractility. Shifts ESPVR slope up (steepened) and reduces ESV.
                </p>
              </div>

              {/* Heart Rate Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">4. Heart Rate:</span>
                  <span className="text-emerald-400 font-bold font-mono">{pvParams.heartRateBpm} bpm</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="5"
                  value={pvParams.heartRateBpm}
                  onChange={(e) => setPvParams({ ...pvParams, heartRateBpm: parseInt(e.target.value, 10) })}
                  className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={() => setPvParams({ preloadEdv: 120, afterloadMap: 100, inotropyPercent: 100, heartRateBpm: 75 })}
                className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Baseline (Normal)
              </button>
            </div>

            {/* Calculated Metrics */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Calculated Functional Metrics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Stroke Volume:</span>
                  <span className="text-white font-mono font-bold text-sm">{calculatedSv} mL</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Ejection Fraction:</span>
                  <span className={`font-mono font-bold text-sm ${calculatedEf >= 55 ? 'text-emerald-400' : calculatedEf >= 45 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {calculatedEf}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Cardiac Output:</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{calculatedCo} L/min</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">End-Systolic Vol:</span>
                  <span className="text-slate-300 font-mono font-bold text-sm">{calculatedEsv} mL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic SVG PV Loop Graph (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-panel-elevated p-6 rounded-2xl border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Left Ventricular Pressure-Volume Loop
                  </h3>
                  <span className="text-xs text-slate-400">
                    Real-time demonstration of EDPVR, ESPVR, Stroke Volume, and Stroke Work
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Stroke Work: ~{calculatedSw} mmHg•mL
                </span>
              </div>

              {/* PV Loop Canvas */}
              <div className="w-full h-80 bg-slate-950/90 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full p-4" viewBox="0 0 500 320" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="60" y1="40" x2="480" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="60" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="60" y1="160" x2="480" y2="160" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="60" y1="220" x2="480" y2="220" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="60" y1="280" x2="480" y2="280" stroke="#334155" strokeWidth="2" />
                  <line x1="60" y1="20" x2="60" y2="280" stroke="#334155" strokeWidth="2" />

                  {/* Axis labels */}
                  <text x="220" y="305" fill="#94a3b8" fontSize="10" fontFamily="monospace">LV Volume (mL)</text>
                  <text x="10" y="160" fill="#94a3b8" fontSize="10" fontFamily="monospace" transform="rotate(-90 20,160)">LV Pressure (mmHg)</text>

                  {/* Volume tick labels */}
                  <text x="120" y="295" fill="#64748b" fontSize="9" fontFamily="monospace">50</text>
                  <text x="240" y="295" fill="#64748b" fontSize="9" fontFamily="monospace">100</text>
                  <text x="360" y="295" fill="#64748b" fontSize="9" fontFamily="monospace">150</text>

                  {/* Pressure tick labels */}
                  <text x="35" y="225" fill="#64748b" fontSize="9" fontFamily="monospace">50</text>
                  <text x="30" y="165" fill="#64748b" fontSize="9" fontFamily="monospace">100</text>
                  <text x="30" y="105" fill="#64748b" fontSize="9" fontFamily="monospace">150</text>
                  <text x="30" y="45" fill="#64748b" fontSize="9" fontFamily="monospace">200</text>

                  {/* Calculate coordinates:
                      x = 60 + (volume / 180) * 400
                      y = 280 - (pressure / 220) * 260
                  */}
                  {(() => {
                    const xEsv = 60 + (calculatedEsv / 180) * 400;
                    const xEdv = 60 + (pvParams.preloadEdv / 180) * 400;
                    const yDiastolicLow = 280 - (8 / 220) * 260;
                    const yDiastolicHigh = 280 - (12 / 220) * 260;
                    const yAorticOpen = 280 - (80 / 220) * 260;
                    const yPeakSystolic = 280 - (pvParams.afterloadMap / 220) * 260;

                    // ESPVR dotted line (slope proportional to inotropy)
                    const espvrSlopeX = 60 + ((pvParams.afterloadMap / (1.6 * (pvParams.inotropyPercent / 100))) / 180) * 400;

                    return (
                      <g>
                        {/* ESPVR line */}
                        <line
                          x1="70"
                          y1="280"
                          x2={Math.min(480, xEsv + 80)}
                          y2={Math.max(20, yPeakSystolic - 40)}
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <text x={xEsv - 10} y={yPeakSystolic - 15} fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                          ESPVR (Inotropy)
                        </text>

                        {/* EDPVR curve */}
                        <path
                          d="M 60 278 Q 200 276 400 260"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <text x="360" y="255" fill="#a855f7" fontSize="9" fontWeight="bold" fontFamily="monospace">
                          EDPVR
                        </text>

                        {/* The PV Loop Polygon */}
                        <path
                          d={`
                            M ${xEdv} ${yDiastolicHigh}
                            L ${xEdv} ${yAorticOpen}
                            Q ${(xEdv + xEsv) / 2} ${yPeakSystolic - 15} ${xEsv} ${yPeakSystolic}
                            L ${xEsv} ${yDiastolicLow}
                            Q ${(xEsv + xEdv) / 2} ${yDiastolicLow + 1} ${xEdv} ${yDiastolicHigh}
                            Z
                          `}
                          fill="rgba(37, 99, 235, 0.25)"
                          stroke="#38bdf8"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />

                        {/* Corner Markers: Mitral & Aortic Valve Events */}
                        {/* Point A: Mitral opens */}
                        <circle cx={xEsv} cy={yDiastolicLow} r="4" fill="#10b981" />
                        <text x={xEsv - 45} y={yDiastolicLow - 5} fill="#10b981" fontSize="9" fontWeight="bold">
                          Mitral Opens
                        </text>

                        {/* Point B: Mitral closes (EDV) */}
                        <circle cx={xEdv} cy={yDiastolicHigh} r="4" fill="#f43f5e" />
                        <text x={xEdv + 8} y={yDiastolicHigh + 2} fill="#f43f5e" fontSize="9" fontWeight="bold">
                          Mitral Closes (S1)
                        </text>

                        {/* Point C: Aortic opens */}
                        <circle cx={xEdv} cy={yAorticOpen} r="4" fill="#38bdf8" />
                        <text x={xEdv + 8} y={yAorticOpen + 4} fill="#38bdf8" fontSize="9" fontWeight="bold">
                          Aortic Opens
                        </text>

                        {/* Point D: Aortic closes (ESV) */}
                        <circle cx={xEsv} cy={yPeakSystolic} r="4" fill="#f59e0b" />
                        <text x={xEsv - 45} y={yPeakSystolic - 5} fill="#f59e0b" fontSize="9" fontWeight="bold">
                          Aortic Closes (S2)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Guyton Educational Note on PV Loops */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-400 block">Phase 1: Filling (A → B)</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Begins at ESV (~50 mL) with mitral opening; filling proceeds until EDV (~120 mL). Ends with S1.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 block">Phase 2: Isovolumetric (B → C)</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    All valves closed. Pressure rises from 10 mmHg to 80 mmHg with zero volume change.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">Phase 3 & 4: Ejection & IR</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Ejection (C → D) empties stroke volume. Aortic valve closes (S2), followed by isovolumetric relaxation (D → A).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VALVULAR & MYOCARDIAL PATHOLOGY */}
      {/* ========================================================================= */}
      {activeTab === 'pathology' && (
        <div className="space-y-6">
          {/* Pathology Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {PATHOLOGY_PRESETS.map((item) => {
              const isSelected = item.id === selectedPathologyId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPathologyId(item.id)}
                  className={`p-3.5 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-rose-600/20 border-rose-500 text-white shadow-glow-rose scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold truncate text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">{item.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pathology In-Depth Card */}
          <div className="glass-panel-elevated p-6 rounded-2xl border border-rose-500/30 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">
                  Pathophysiology & Auscultation Profile
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {activePathology.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activePathology.subtitle}
                </p>
              </div>

              {/* Murmur Audio Play Button */}
              <button
                onClick={() => handlePlayPathologySound(activePathology.soundGenerator)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-glow-rose transition-all self-start md:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Simulate Auscultation Acoustic</span>
              </button>
            </div>

            {/* Diagnostic Hallmark & Murmur Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Auscultation & Murmur Characteristics
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activePathology.murmurType}
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="font-semibold text-white">Classic Physical Finding: </span>
                  {activePathology.classicSign}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  High-Yield BM&DC Exam Yield
                </span>
                <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                  {activePathology.bmdcExamYield}
                </p>
              </div>
            </div>

            {/* Wiggers & PV Loop Alterations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider block">
                  Wiggers Diagram Alterations
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {activePathology.wiggersFeatures.map((f, i) => (
                    <li key={i} className="leading-relaxed">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 uppercase tracking-wider block">
                  Pressure-Volume (PV) Loop Deformations
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {activePathology.pvLoopChanges.map((f, i) => (
                    <li key={i} className="leading-relaxed">{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: VIRTUAL STETHOSCOPE & AUSCULTATION */}
      {/* ========================================================================= */}
      {activeTab === 'auscultation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Human Chest Auscultation Map (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel-elevated p-6 rounded-2xl border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Interactive Chest Auscultation Map
                  </h3>
                  <span className="text-xs text-slate-400">
                    Click any landmark to position the stethoscope and listen
                  </span>
                </div>

                {/* Stethoscope Bell / Diaphragm Filter Toggle */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setStethoscopeFilter('diaphragm')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      stethoscopeFilter === 'diaphragm'
                        ? 'bg-emerald-600 text-white shadow-glow-emerald'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Diaphragm (High Pitch)
                  </button>
                  <button
                    onClick={() => setStethoscopeFilter('bell')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      stethoscopeFilter === 'bell'
                        ? 'bg-emerald-600 text-white shadow-glow-emerald'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bell (Low: S3/S4/MS)
                  </button>
                </div>
              </div>

              {/* Visual Chest Diagram SVG with Clickable Auscultation Targets */}
              <div className="w-full h-96 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Chest Ribcage Silhouette */}
                  <path
                    d="M 120 40 Q 200 50 280 40 Q 320 120 310 260 Q 280 360 200 380 Q 120 360 90 260 Q 80 120 120 40 Z"
                    fill="#0a1222"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                  {/* Sternum */}
                  <rect x="194" y="60" width="12" height="180" rx="4" fill="#1e293b" />
                  <circle cx="200" cy="55" r="8" fill="#334155" /> {/* Manubrium notch */}

                  {/* Rib shadows */}
                  {[90, 130, 170, 210, 250].map((yRib, i) => (
                    <g key={i} opacity="0.3">
                      <path d={`M 194 ${yRib} Q 140 ${yRib - 10} 100 ${yRib + 25}`} stroke="#475569" strokeWidth="3" fill="none" />
                      <path d={`M 206 ${yRib} Q 260 ${yRib - 10} 300 ${yRib + 25}`} stroke="#475569" strokeWidth="3" fill="none" />
                    </g>
                  ))}

                  {/* Auscultation Hotspots */}
                  {AUSCULTATION_SITES.map((site) => {
                    const isSelected = selectedAuscultationSite.id === site.id;
                    const cx = (site.coordinates.x / 100) * 400;
                    const cy = (site.coordinates.y / 100) * 400;

                    return (
                      <g
                        key={site.id}
                        onClick={() => handleAuscultateSite(site)}
                        className="cursor-pointer group"
                      >
                        {/* Outer pulsating ring if selected */}
                        {isSelected && (
                          <circle cx={cx} cy={cy} r="24" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping opacity-40" />
                        )}

                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 18 : 14}
                          fill={isSelected ? '#10b981' : '#047857'}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          className="transition-all duration-300 group-hover:scale-110"
                        />

                        <Stethoscope
                          x={cx - 7}
                          y={cy - 7}
                          width="14"
                          height="14"
                          className="text-white pointer-events-none"
                        />

                        {/* Text Label */}
                        <text
                          x={cx}
                          y={cy + 26}
                          fill={isSelected ? '#34d399' : '#94a3b8'}
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {site.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Auscultation Clinical Findings (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel-elevated p-6 rounded-2xl border border-emerald-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Active Auscultation Site
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-0.5">
                    {selectedAuscultationSite.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedAuscultationSite.ribSpace} ({selectedAuscultationSite.anatomicalLocation})
                  </span>
                </div>

                <button
                  onClick={() => handleAuscultateSite(selectedAuscultationSite)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-glow-emerald"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Again</span>
                </button>
              </div>

              {/* Sound Profile */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block">Primary Sounds & Murmurs Evaluated:</span>
                  <p className="text-slate-100 font-medium leading-relaxed">
                    {selectedAuscultationSite.primarySoundHeard}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block">Optimal Physical Examination Maneuver:</span>
                  <p className="text-emerald-300 font-medium leading-relaxed">
                    {selectedAuscultationSite.bestManeuver}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block">Pathological Radiation Landmark:</span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedAuscultationSite.radiationTo}
                  </p>
                </div>

                {/* Stethoscope Piece Guide */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[11px]">
                    Bell vs. Diaphragm Stethoscope Guide:
                  </span>
                  <p className="text-emerald-100/90 text-[11px] leading-relaxed">
                    • <strong>Diaphragm (firm pressure):</strong> Best for high-pitched sounds: S1, S2, ejection clicks, and regurgitant murmurs (AR, MR).<br />
                    • <strong>Bell (light pressure):</strong> Best for low-pitched sounds: S3 gallop, S4 gallop, and Mitral Stenosis diastolic rumble. Firm pressure turns skin into a diaphragm, extinguishing low frequencies!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: VIVA & OSPE EXAM STATION */}
      {/* ========================================================================= */}
      {activeTab === 'viva' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass-panel-elevated p-6 rounded-2xl border border-purple-500/30 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
                  BM&DC Professional Exam Prep • Guyton Viva Station
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Question {currentQuestionIndex + 1} of {VIVA_QUESTIONS.length}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Exam Score</span>
                <span className="text-lg font-extrabold text-purple-400 font-mono">
                  {quizScore} / {VIVA_QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-base font-semibold text-white leading-relaxed">
                {VIVA_QUESTIONS[currentQuestionIndex].question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {VIVA_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === VIVA_QUESTIONS[currentQuestionIndex].correctIndex;
                let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold shadow-glow-emerald';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(idx)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {selectedAnswer !== null && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* In-depth Explanation Box */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-purple-400" />
                  Viva Examiner Explanation:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {VIVA_QUESTIONS[currentQuestionIndex].explanation}
                </p>
                <div className="pt-2 border-t border-purple-500/20 text-[11px] text-purple-300 font-mono">
                  Citation: {VIVA_QUESTIONS[currentQuestionIndex].guytonCitation}
                </div>
              </div>
            )}

            {/* Question Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous Question
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === VIVA_QUESTIONS.length - 1}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
