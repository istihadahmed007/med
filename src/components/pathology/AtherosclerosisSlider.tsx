import React, { useState } from 'react';
import { PathologyStage } from '../../types';
import { ChevronLeft, ChevronRight, Activity, AlertCircle, HelpCircle, ShieldAlert } from 'lucide-react';

const ATHERO_STAGES: PathologyStage[] = [
  {
    stageNumber: 1,
    title: 'Normal Intact Endothelium',
    subTitle: 'Healthy Muscular/Elastic Artery',
    cellularChanges: 'Continuous non-thrombogenic monolayer of endothelial cells. Intact internal elastic lamina, thin tunica intima, and normal quiescent vascular smooth muscle cells (VSMCs) in tunica media.',
    grossMorphology: 'Glistening, smooth, uniform yellow-pink luminal surface with zero luminal obstruction or calcification.',
    hemodynamicEffect: 'Laminar blood flow; normal shear stress; preserved nitric oxide (NO) and prostacyclin (PGI2) vasodilatory tone.',
    clinicalSymptoms: ['Completely asymptomatic', 'Normal exercise tolerance', 'Normal ankle-brachial index (ABI 1.0 - 1.2)'],
    investigationFindings: ['Normal 12-lead ECG', 'Normal coronary CT angiography (calcium score = 0)', 'Normal treadmill test (TMT)'],
    complications: ['None'],
    vivaQuestion: 'What are the main functions of normal vascular endothelium in preventing thrombosis?'
  },
  {
    stageNumber: 2,
    title: 'Endothelial Injury & Fatty Streak',
    subTitle: 'Early Infiltration (Type II Lesion)',
    cellularChanges: 'Chronic endothelial injury (due to smoking, hypertension, hyperglycemia). Increased vascular permeability allows LDL particles into intima, where they undergo oxidation. Monocytes adhere, transmigrate, and ingest oxLDL via scavenger receptors, becoming lipid-laden foam cells.',
    grossMorphology: 'Flat or slightly raised yellow lipid streaks (1-2 mm wide) along the thoracic and abdominal aorta, present even in children and young adults.',
    hemodynamicEffect: 'Minimal or no disturbance of laminar flow; preserved lumen diameter.',
    clinicalSymptoms: ['Clinically silent; universal in modern adult populations'],
    investigationFindings: ['Elevated serum LDL-C (> 3.0 mmol/L)', 'Elevated hs-CRP indicating low-grade vascular inflammation'],
    complications: ['Potentially reversible with aggressive lipid-lowering and smoking cessation.'],
    vivaQuestion: 'What is the origin of foam cells in fatty streaks, and why do scavenger receptors not downregulate?'
  },
  {
    stageNumber: 3,
    title: 'Fibrous Plaque & Luminal Stenosis',
    subTitle: 'Advanced Atheroma (Type IV-V Lesion)',
    cellularChanges: 'Recruitment and phenotypic switching of medial VSMCs into proliferating synthetic cells. Secretion of abundant extracellular matrix (collagen, elastin) forming a dense fibrous cap overlying a necrotic lipid core of cholesterol crystals and cellular debris.',
    grossMorphology: 'Firm, raised, pearly-white or yellow-grey eccentrically bulging plaques. Luminal cross-sectional area reduced by 50% to 75%.',
    hemodynamicEffect: 'Turbulent flow distal to stenosis. Critical coronary stenosis occurs when lumen diameter is reduced by ≥ 70%, preventing exercise-induced hyperemia.',
    clinicalSymptoms: [
      'Stable Angina Pectoris (substernal tightness predictable on exertion, relieved in 5 mins by rest/GTN)',
      'Intermittent Claudication (calf pain on walking fixed distances)'
    ],
    investigationFindings: [
      'Resting ECG usually normal; Exercise stress test (TMT) shows ≥ 1 mm horizontal/downsloping ST depression',
      'Coronary angiogram reveals fixed discrete luminal stenosis'
    ],
    complications: ['Progressive chronic ischemia', 'Collateral vessel formation', 'Secondary calcification'],
    vivaQuestion: 'What defines a "vulnerable" versus a "stable" atherosclerotic plaque?'
  },
  {
    stageNumber: 4,
    title: 'Plaque Rupture & Acute Thrombosis',
    subTitle: 'Complicated Lesion (Type VI / ACS)',
    cellularChanges: 'Matrix metalloproteinases (MMPs) from activated macrophages degrade collagen in the thin fibrous cap. The cap fissures or ruptures, exposing highly thrombogenic subendothelial tissue factor and collagen to flowing platelets. Massive platelet activation, von Willebrand binding, and thrombin generation create an occlusive red/white thrombus.',
    grossMorphology: 'Ulcerated, hemorrhagic plaque with overlying gelatinous dark red occlusive thrombus plugging the vessel lumen 100%.',
    hemodynamicEffect: 'Complete arrest of blood flow (TIMI-0 flow) to downstream myocardium, precipitating transmural myocardial ischemia and necrosis.',
    clinicalSymptoms: [
      'Acute crushing retrosternal chest pain at rest > 20 minutes',
      'Radiation to left arm and jaw',
      'Profuse diaphoresis, dyspnea, presyncope, nausea'
    ],
    investigationFindings: [
      'ECG: Hyperacute T waves, ST-segment elevation (STEMI), pathological Q waves',
      'Cardiac biomarkers: High-sensitivity Troponin I/T markedly elevated'
    ],
    complications: [
      'Ventricular fibrillation and sudden cardiac death',
      'Cardiogenic shock (Killip Class IV)',
      'Ventricular free wall rupture or ventricular septal defect (VSD)'
    ],
    vivaQuestion: 'Explain the mechanism of plaque rupture and the biochemical role of matrix metalloproteinases (MMPs).'
  }
];

export const AtherosclerosisSlider: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(2); // Stage 3: Fibrous Plaque default
  const stage = ATHERO_STAGES[currentStageIndex];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">
          Pathology Transformation Engine
        </span>
        <h1 className="text-3xl font-bold text-white mt-2">
          Atherosclerosis: From Healthy Artery to Occlusive Thrombosis
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Interactive stage-by-stage progression comparing cellular histology, gross arterial cross-section, hemodynamics, and clinical presentation.
        </p>
      </div>

      {/* Stage Progression Slider */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">
            Disease Progression Timeline
          </span>
          <span className="text-rose-400 font-bold font-mono">
            Stage {stage.stageNumber} of 4: {stage.title}
          </span>
        </div>

        {/* Stepper buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ATHERO_STAGES.map((s, idx) => {
            const isActive = idx === currentStageIndex;
            return (
              <button
                key={s.stageNumber}
                onClick={() => setCurrentStageIndex(idx)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-rose-950/60 border-rose-500 text-white shadow-glow-rose'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] font-bold block uppercase text-rose-400">
                  Stage 0{s.stageNumber}
                </span>
                <span className="text-xs font-bold truncate block mt-0.5">
                  {s.title.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continuous Range Scrubber */}
        <div className="pt-2">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={currentStageIndex}
            onChange={(e) => setCurrentStageIndex(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1">
            <span>Normal Intact</span>
            <span>Fatty Streak</span>
            <span>Fibrous Plaque</span>
            <span>Rupture & STEMI</span>
          </div>
        </div>
      </div>

      {/* Cross-Section Graphical Visualization & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Simulated Lumen Cross-section (4 cols) */}
        <div className="lg:col-span-5 glass-panel-elevated p-6 rounded-2xl border border-rose-500/20 flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
            Arterial Lumen Cross-Section
          </span>

          {/* SVG Arterial Wall representation */}
          <div className="w-56 h-56 relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Tunica Adventitia Outer Ring */}
              <circle cx="100" cy="100" r="92" fill="none" stroke="#334155" strokeWidth="6" />
              {/* Tunica Media Muscular Layer */}
              <circle cx="100" cy="100" r="84" fill="#1e1b4b" stroke="#4338ca" strokeWidth="8" />

              {/* Stage-dependent Plaque and Lumen representation */}
              {currentStageIndex === 0 && (
                /* Normal wide open lumen */
                <circle cx="100" cy="100" r="76" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
              )}

              {currentStageIndex === 1 && (
                /* Fatty streak in subendothelium */
                <>
                  <circle cx="100" cy="100" r="74" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 60 45 Q 100 65 140 45" fill="none" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
                </>
              )}

              {currentStageIndex === 2 && (
                /* Fibrous Plaque narrowing 70% */
                <>
                  <circle cx="100" cy="100" r="74" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  {/* Large atheroma bulge */}
                  <path d="M 30 100 Q 100 20 170 100 Q 100 125 30 100 Z" fill="#ca8a04" opacity="0.8" />
                  {/* Fibrous cap */}
                  <path d="M 30 100 Q 100 125 170 100" fill="none" stroke="#f8fafc" strokeWidth="4" />
                  {/* Residual narrow lumen */}
                  <ellipse cx="100" cy="140" rx="35" ry="18" fill="#0284c7" opacity="0.6" />
                </>
              )}

              {currentStageIndex === 3 && (
                /* Ruptured plaque with occlusive red thrombus */
                <>
                  <circle cx="100" cy="100" r="74" fill="#450a0a" stroke="#ef4444" strokeWidth="3" />
                  {/* Ruptured plaque bed */}
                  <path d="M 30 100 Q 100 20 170 100 Q 100 125 30 100 Z" fill="#854d0e" opacity="0.85" />
                  {/* Fissured cap rupture */}
                  <path d="M 90 120 L 110 115" stroke="#ef4444" strokeWidth="5" />
                  {/* 100% Occlusive Thrombus */}
                  <circle cx="100" cy="138" r="26" fill="#dc2626" />
                  <circle cx="100" cy="138" r="14" fill="#991b1b" />
                </>
              )}
            </svg>
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-white block">
              {stage.subTitle}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Hemodynamics: {stage.hemodynamicEffect}
            </span>
          </div>
        </div>

        {/* Clinical & Pathophysiological Correlation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Cellular Changes & Gross Morphology */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                Cellular & Molecular Pathogenesis
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {stage.cellularChanges}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Gross Autopsy / Specimen Morphology
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {stage.grossMorphology}
              </p>
            </div>
          </div>

          {/* Clinical Presentation & Diagnostics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-400" />
                Clinical Presentation
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {stage.clinicalSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                Diagnostic Investigations
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {stage.investigationFindings.map((inv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-400">•</span>
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Viva Examination Highlight */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              BM&DC Viva Question
            </span>
            <p className="text-xs text-amber-100 font-medium">
              "{stage.vivaQuestion}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
