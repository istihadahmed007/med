import { TextbookChapter } from '../types';

export const TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  {
    id: 'ch-mitral-stenosis',
    subjectId: 'medicine',
    title: 'Mitral Stenosis: Pathogenesis, Hemodynamics & Management',
    readTimeMinutes: 12,
    learningObjectives: [
      'Understand the autoimmune pathogenesis of post-streptococcal rheumatic carditis and valve deformation.',
      'Explain the hemodynamic consequences of restricted mitral orifice on left atrial pressure, pulmonary vasculature, and right heart.',
      'Correlate physical signs (malar flush, tapping apex beat, opening snap, mid-diastolic murmur) with pathophysiologic events.',
      'Interpret investigations including 12-lead ECG, chest radiograph, and transthoracic echocardiography (Wilkins score).',
      'Formulate evidence-based medical and interventional management (Percutaneous Balloon Mitral Valvotomy vs Surgical Replacement).'
    ],
    sections: [
      {
        heading: '1. Etiology & Rheumatic Pathogenesis',
        content: `Rheumatic fever following untreated Group A Beta-Hemolytic Streptococcal (GABHS) pharyngeal infection accounts for >95% of mitral stenosis cases worldwide, particularly prevalent across South Asia including Bangladesh. Molecular mimicry between streptococcal M-protein and human cardiac myosin triggers a cross-reactive CD4+ T-cell and B-cell autoimmune cascade, leading to chronic rheumatic endocarditis.

Repeated episodes of subclinical rheumatic carditis produce progressive leaflet thickening, commissural fusion, chordal shortening, and dystrophic calcification over a latent period of 10 to 20 years. This culminates in the classic "fish-mouth" or "buttonhole" rigid stenotic mitral orifice. Congenital mitral stenosis (parachute mitral valve), senile annular calcification, and systemic lupus erythematosus (Libman-Sacks endocarditis) represent rare alternative etiologies.`,
        clinicalBox: {
          title: 'Clinical Pearl: The Latency Period',
          text: 'Patients frequently report acute rheumatic fever during school age (5-15 years), remaining asymptomatic until their 3rd or 4th decade when pregnancy, atrial fibrillation, or infection increases heart rate and shortens diastolic filling time, precipitating acute pulmonary edema.'
        }
      },
      {
        heading: '2. Pathophysiology & Hemodynamic Cascade',
        content: `The normal adult mitral valve orifice area measures 4.0 to 6.0 cm². Significant hemodynamic impairment emerges when the orifice area narrows to ≤2.0 cm² (moderate stenosis) and becomes critical at ≤1.5 cm² (severe stenosis) or ≤1.0 cm² (very severe).

To maintain forward stroke volume across the narrowed valve during diastole, left atrial pressure (LAP) rises progressively, creating a transvalvular diastolic pressure gradient. The chronic elevation of LAP produces:
1. Left Atrial Dilatation & Hypertrophy: Predisposes to atrial fibrillation, atrial standstill, and mural thrombus formation in the left atrial appendage.
2. Retrograde Pulmonary Venous Hypertension: Elevated capillary hydrostatic pressure exceeding plasma oncotic pressure (25 mmHg) causes interstitial transudation, pulmonary edema, and dyspnea.
3. Reactive Pulmonary Arterial Vasoconstriction & Obliterative Remodeling: Secondary pulmonary hypertension develops, leading to right ventricular hypertrophy, dilatation, tricuspid regurgitation, and congestive hepatosplenomegaly.`,
        diagramRef: 'cardiac-conduction'
      },
      {
        heading: '3. Physical Examination Hallmarks',
        content: `Physical examination provides profound clinical clues that directly reflect the underlying hemodynamics:
- Inspection: Malar flush (mitral facies - plum-colored cyanotic erythema over malar eminences due to low cardiac output and peripheral vasoconstriction).
- Palpation: "Tapping" apex beat (palpable first heart sound due to sudden closure of pliable leaflets) without left ventricular enlargement. Right ventricular heave at left parasternal border in severe pulmonary hypertension. Diastolic thrill palpable at the apex in the left lateral position.
- Auscultation:
  * Loud First Heart Sound (S1): Abrupt closure of rigid but mobile leaflets against high LAP.
  * Opening Snap (OS): High-pitched snap following S2, caused by sudden tensing of fused valve leaflets as they open into the LV during early diastole. The shorter the A2-OS interval, the higher the LAP and more severe the stenosis.
  * Mid-Diastolic Rumbling Murmur: Low-pitched rumbling murmur with presystolic accentuation (if in sinus rhythm) best heard at the apex using the bell in the left lateral decubitus position during expiration.`,
        clinicalBox: {
          title: 'Exam Viva Trap: Presystolic Accentuation in AF',
          text: 'Presystolic accentuation requires active atrial contraction. When a patient with mitral stenosis develops atrial fibrillation, presystolic accentuation disappears, although the mid-diastolic murmur persists.'
        }
      },
      {
        heading: '4. Diagnostic Investigations',
        content: `Diagnostic evaluation confirms severity and assesses suitability for percutaneous intervention:
1. 12-Lead ECG: "P mitrale" (bifid broad P wave >0.12s in lead II and biphasic P in V1 with deep negative deflection) reflecting left atrial enlargement. Atrial fibrillation is present in 40-50% of symptomatic patients.
2. Chest Radiography: Straightening of left cardiac border (prominent pulmonary artery and enlarged left atrial appendage), double heart border (enlarged LA projecting behind RA), kerley B lines (interstitial pulmonary edema), and cephalization of pulmonary vasculature.
3. Transthoracic & Transesophageal Echocardiography: Gold standard. Measures planimetered valve area, mean transvalvular pressure gradient, and Wilkins Score (mobility, subvalvular thickening, leaflet thickening, and calcification - score ≤8 favors percutaneous balloon mitral valvotomy). Rules out left atrial appendage thrombus prior to valvotomy.`
      },
      {
        heading: '5. Management Strategy',
        content: `Medical therapy focuses on symptom control and stroke prevention:
- Rate Control: Beta-blockers (e.g. Bisoprolol, Metoprolol) or non-dihydropyridine calcium channel blockers (Verapamil, Diltiazem) to prolong diastole and reduce LAP.
- Diuretics: Loop diuretics (Furosemide) for pulmonary congestion.
- Anticoagulation: Lifelong Vitamin K Antagonist (Warfarin, target INR 2.0-3.0) for patients with atrial fibrillation or prior thromboembolism. (Direct oral anticoagulants are NOT approved for moderate-to-severe rheumatic MS).

Definitive Interventions:
- Percutaneous Balloon Mitral Valvotomy (PBMV / PTMC): Procedure of choice for symptomatic patients with pliable, non-calcified valves (Wilkins score ≤8) and absence of left atrial thrombus or moderate-to-severe mitral regurgitation.
- Surgical Mitral Valve Replacement (MVR): Mechanical or bioprosthetic valve replacement indicated when valve anatomy is unfavorable for PBMV, severe subvalvular fusion/calcification exists, or concomitant severe MR is present.`
      }
    ],
    references: [
      'Davidson’s Principles and Practice of Medicine, 24th Ed, Chapter 18: Cardiovascular Disease',
      'Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Chapter 12: The Heart',
      '2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease (Circulation)',
      'BM&DC Curriculum for Undergraduate Medical Education in Bangladesh'
    ]
  },
  {
    id: 'ch-acute-coronary-syndrome',
    subjectId: 'medicine',
    title: 'Acute Coronary Syndromes: STEMI, NSTEMI & Unstable Angina',
    readTimeMinutes: 15,
    learningObjectives: [
      'Distinguish the pathophysiology of plaque rupture and intracoronary thrombus in STEMI vs NSTEMI.',
      'Rapidly interpret ST-elevation patterns and localize the culprit coronary artery on 12-lead ECG.',
      'Understand high-sensitivity Cardiac Troponin kinetics and risk stratification using TIMI/GRACE scores.',
      'Implement acute emergency pharmacology (MONA, DAPT, Anticoagulation) and reperfusion strategy (Primary PCI vs Fibrinolysis).',
      'Recognize mechanical, arrhythmic, and hemodynamic complications of acute myocardial infarction.'
    ],
    sections: [
      {
        heading: '1. Pathophysiology: Plaque Rupture to Occlusive Thrombosis',
        content: `Acute Coronary Syndrome (ACS) encompasses a spectrum of clinical conditions resulting from acute myocardial ischemia, divided into:
- ST-Elevation Myocardial Infarction (STEMI): Complete and persistent occlusive thrombosis of a major epicardial coronary artery producing transmural myocardial necrosis.
- Non-ST-Elevation Myocardial Infarction (NSTEMI): Subtotal occlusive or intermittent thrombosis causing subendocardial ischemia and necrosis (troponin positive).
- Unstable Angina (UA): Acute ischemia without myocyte necrosis (normal biomarkers).

Pathologically, vulnerable atheromatous plaques feature a thin fibrous cap (<65 µm), a large lipid-rich necrotic core, and intense inflammatory infiltration of macrophages releasing matrix metalloproteinases. Cap disruption exposes thrombogenic subendothelial collagen and tissue factor to flowing blood, triggering platelet adhesion (von Willebrand factor to GpIb), activation (thromboxane A2 and ADP release), and aggregation (fibrinogen cross-linking GpIIb/IIIa receptors), crowned by thrombin generation and fibrin clot formation.`,
        clinicalBox: {
          title: 'Clinical Alert: The Ischemic Cascade',
          text: 'Myocellular ischemia begins within seconds of occlusion. ATP depletion occurs within 1 minute; contractile dysfunction within 2 minutes; irreversible microvascular and myocyte necrosis begins at 20-30 minutes, progressing from subendocardium to subepicardium in a wavefront pattern.'
        }
      },
      {
        heading: '2. ECG Localization of Infarct & Culprit Vessels',
        content: `Immediate 12-lead ECG (within 10 minutes of arrival) is the crucial triage tool:
- Anterior / Anteroseptal (V1-V4): Left Anterior Descending (LAD) artery. High risk of cardiogenic shock, ventricular septal rupture, and bundle branch block.
- Inferior (II, III, aVF): Right Coronary Artery (RCA, 85%) or Left Circumflex (LCx, 15%). Look for reciprocal ST depression in I, aVL. Must obtain right-sided leads (V4R) to exclude Right Ventricular Infarction!
- Lateral (I, aVL, V5, V6): Left Circumflex Artery (LCx) or diagonal branch of LAD.
- Posterior (tall R, ST depression, upright T in V1-V3): Posterior Descending Artery (PDA) / LCx; confirmed by ST elevation in posterior leads V7-V9.`,
        diagramRef: 'cardiac-conduction'
      },
      {
        heading: '3. Acute Emergency Triage & Pharmacology',
        content: `Immediate Initial Resuscitation (Within 10 minutes):
1. Aspirin: 300 mg chewed or crushed immediately (blocks Thromboxane A2 synthesis).
2. Second Antiplatelet (P2Y12 Inhibitor): Ticagrelor 180 mg loading dose (or Clopidogrel 300-600 mg if Ticagrelor unavailable).
3. Analgesia & Vasodilation: IV Morphine 2-4 mg with antiemetic (Metoclopramide 10 mg) for severe chest pain; sublingual Nitroglycerin 0.4 mg (avoid if SBP <90 mmHg, RV infarction, or PDE-5 inhibitor use within 24-48 hours).
4. Oxygen: Reserved ONLY for patients with arterial SpO2 <90% or respiratory distress (routine hyperoxia causes coronary vasoconstriction).

Reperfusion Strategy for STEMI:
- Primary PCI (Percutaneous Coronary Intervention): Treatment of choice if door-to-balloon time ≤90 minutes (or ≤120 minutes from first medical contact).
- Intravenous Fibrinolysis (Streptokinase or Alteplase/Tenecteplase): Indicated if PCI cannot be achieved within 120 minutes. Door-to-needle time target ≤30 minutes. Absolute contraindications include previous hemorrhagic stroke, ischemic stroke within 6 months, known CNS neoplasm, or active internal bleeding.`,
        clinicalBox: {
          title: 'BM&DC Emergency Protocol Note',
          text: 'In district and Upazila hospitals across Bangladesh where catheterization labs are distant, prompt administration of IV Streptokinase 1.5 million units in 100 mL 0.9% saline over 60 minutes saves lives when administered within the 12-hour therapeutic window.'
        }
      }
    ],
    references: [
      'Davidson’s Principles and Practice of Medicine, 24th Ed, Chapter 18: Cardiovascular Disease',
      '2023 ESC Guidelines for the Management of Acute Coronary Syndromes (European Heart Journal)',
      'National Heart Foundation Hospital & Research Institute (NHFH&RI) Bangladesh STEMI Protocol'
    ]
  }
];
