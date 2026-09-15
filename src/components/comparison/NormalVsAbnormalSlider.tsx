import React, { useState } from 'react';
import { SplitSquareVertical, ArrowLeftRight, CheckCircle2, AlertTriangle, BookOpen, Layers } from 'lucide-react';

interface ComparisonPair {
  id: string;
  organ: string;
  normalTitle: string;
  pathologyTitle: string;
  normalMetrics: { label: string; value: string }[];
  pathologicalMetrics: { label: string; value: string }[];
  normalDescription: string;
  pathologicalDescription: string;
  mechanism: string;
  references: string;
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'heart-cardiomyopathy',
    organ: 'Heart & Ventricular Myocardium',
    normalTitle: 'Normal Ventricular Architecture',
    pathologyTitle: 'Dilated Cardiomyopathy & Biventricular Hypertrophy',
    normalMetrics: [
      { label: 'Ejection Fraction (LVEF)', value: '55 - 70%' },
      { label: 'Left Ventricular EDD', value: '35 - 52 mm' },
      { label: 'Interventricular Septum', value: '6 - 11 mm' },
      { label: 'Myocyte Alignment', value: 'Uniform branching syncytium' }
    ],
    pathologicalMetrics: [
      { label: 'Ejection Fraction (LVEF)', value: '<30% (Severe Systolic Deficit)' },
      { label: 'Left Ventricular EDD', value: '>65 mm (Marked Dilatation)' },
      { label: 'Interventricular Septum', value: 'Thin, stretched wall / Fibrosis' },
      { label: 'Myocyte Alignment', value: 'Marked myocyte hypertrophy & interstitial fibrosis' }
    ],
    normalDescription: 'Elliptical left ventricle with normal concentric wall thickness and coordinated apical-to-base wringing contraction during systole.',
    pathologicalDescription: 'Globular, ballooned 4-chamber dilatation with apical thinning, mural thrombi, secondary functional mitral/tricuspid regurgitation, and impaired contractility.',
    mechanism: 'Defective force generation or transmission (e.g. TTN titin mutations, post-viral myocarditis, anthracycline toxicity, or chronic alcohol consumption) leading to progressive systolic dysfunction and compensatory chamber dilatation.',
    references: 'Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 12; Braunwald’s Heart Disease, 12th Ed.'
  },
  {
    id: 'lung-emphysema',
    organ: 'Lung Parenchyma & Alveoli',
    normalTitle: 'Normal Alveolar Septa & Elastic Meshwork',
    pathologyTitle: 'Severe Centriacinar Pulmonary Emphysema',
    normalMetrics: [
      { label: 'FEV1 / FVC Ratio', value: '75 - 80%' },
      { label: 'Alveolar Surface Area', value: '~100 m² for gas exchange' },
      { label: 'Radial Traction on Airways', value: 'Normal tethering prevents collapse' },
      { label: 'Diffusing Capacity (DLCO)', value: 'Normal (100% predicted)' }
    ],
    pathologicalMetrics: [
      { label: 'FEV1 / FVC Ratio', value: '<50% (Severe Fixed Obstruction)' },
      { label: 'Alveolar Surface Area', value: 'Severely reduced (<40 m²)' },
      { label: 'Radial Traction on Airways', value: 'Loss of elastic recoil causes dynamic expiratory collapse' },
      { label: 'Diffusing Capacity (DLCO)', value: 'Markedly reduced (<40% predicted)' }
    ],
    normalDescription: 'Intricate network of delicate interalveolar septa lined by type I pneumocytes and surfactant-secreting type II pneumocytes with rich pulmonary capillary bed.',
    pathologicalDescription: 'Permanent enlargement of airspaces distal to terminal bronchioles accompanied by destruction of alveolar walls without obvious fibrosis, forming confluent bullae.',
    mechanism: 'Protease-antiprotease imbalance (cigarette smoke recruits neutrophils releasing elastase exceeding alpha-1 antitrypsin protective capacity) + oxidant-antioxidant imbalance causing enzymatic digestion of elastin.',
    references: 'Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 15; West’s Respiratory Physiology, 10th Ed.'
  },
  {
    id: 'kidney-nephrosclerosis',
    organ: 'Renal Cortex & Glomeruli',
    normalTitle: 'Normal Glomerular Filtration Unit',
    pathologyTitle: 'Advanced Diabetic Glomerulosclerosis (Kimmelstiel-Wilson)',
    normalMetrics: [
      { label: 'Glomerular Filtration Rate', value: '90 - 120 mL/min/1.73m²' },
      { label: '24-hour Albuminuria', value: '<30 mg/24h (Normal)' },
      { label: 'GBM Thickness', value: '300 - 350 nm' },
      { label: 'Mesangial Matrix', value: 'Normal basal cellularity' }
    ],
    pathologicalMetrics: [
      { label: 'Glomerular Filtration Rate', value: '<15 mL/min (ESRD Stage 5)' },
      { label: '24-hour Albuminuria', value: '>3500 mg/24h (Nephrotic-range)' },
      { label: 'GBM Thickness', value: '>600 nm (Marked diffuse thickening)' },
      { label: 'Mesangial Matrix', value: 'Nodular glomerulosclerosis (KW nodules)' }
    ],
    normalDescription: 'Smooth thin glomerular basement membrane with fenestrated endothelial cells, intact slit diaphragms of podocytes, and patent capillary lumina.',
    pathologicalDescription: 'Diffuse glomerulosclerosis with pathognomonic ovoid or spherical, laminated, PAS-positive acellular nodular accumulations of matrix in the mesangium (Kimmelstiel-Wilson nodules), accompanied by arteriolar hyalinosis of both afferent and efferent arterioles.',
    mechanism: 'Non-enzymatic glycation of proteins forming Advanced Glycation End-products (AGEs), trapping plasma proteins, cross-linking collagen, and hyperfiltration injury mediated by efferent arteriolar vasoconstriction.',
    references: 'Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 20; Brenner & Rector’s The Kidney, 11th Ed.'
  }
];

export const NormalVsAbnormalSlider: React.FC = () => {
  const [selectedPairId, setSelectedPairId] = useState<string>(COMPARISON_PAIRS[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100

  const pair = COMPARISON_PAIRS.find(p => p.id === selectedPairId) || COMPARISON_PAIRS[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/50 to-slate-900 border border-rose-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
              <SplitSquareVertical className="w-3.5 h-3.5" />
              PATHOPHYSIOLOGICAL COMPARISON ENGINE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Normal Anatomy vs. Pathological Transformation
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Drag the interactive split curtain to observe real-time structural transformation, hemodynamic changes, and cellular remodeling across major human diseases.
            </p>
          </div>

          {/* Organ Switcher */}
          <div className="flex flex-wrap gap-2">
            {COMPARISON_PAIRS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPairId(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedPairId === p.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {p.organ.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Interactive Split Slider Visualizer */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full aspect-[16/10] bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden select-none shadow-2xl">
            {/* Background Layer: Pathological View */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-950/50 to-slate-950 p-6 flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wide">
                  {pair.pathologyTitle}
                </span>
              </div>

              {/* Pathological Visual Render */}
              <div className="w-full flex items-center justify-center my-auto">
                <svg className="w-64 h-64 max-h-[300px]" viewBox="0 0 100 100">
                  {pair.id === 'heart-cardiomyopathy' ? (
                    <>
                      {/* Dilated Thin Globular Heart */}
                      <path
                        d="M 50,15 C 20,-5 0,25 10,65 C 20,88 50,98 50,98 C 50,98 80,88 90,65 C 100,25 80,-5 50,15 Z"
                        fill="#7f1d1d"
                        stroke="#ef4444"
                        strokeWidth="2.5"
                        opacity="0.85"
                      />
                      {/* Huge dilated LV chamber */}
                      <ellipse cx="50" cy="55" rx="30" ry="25" fill="#1c1917" stroke="#dc2626" strokeWidth="1" />
                      <text x="50" y="58" fill="#fca5a5" fontSize="5" textAnchor="middle" fontWeight="bold">DILATED CHAMBER</text>
                    </>
                  ) : pair.id === 'lung-emphysema' ? (
                    <>
                      {/* Large confluent destroyed bullae */}
                      <rect x="15" y="15" width="70" height="70" rx="15" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                      <circle cx="35" cy="40" r="16" fill="#3f1d24" stroke="#e11d48" strokeWidth="1.2" />
                      <circle cx="65" cy="45" r="18" fill="#3f1d24" stroke="#e11d48" strokeWidth="1.2" />
                      <circle cx="48" cy="65" r="14" fill="#3f1d24" stroke="#e11d48" strokeWidth="1.2" />
                      <text x="50" y="50" fill="#fda4af" fontSize="4.5" textAnchor="middle">CONFLUENT BULLAE</text>
                    </>
                  ) : (
                    <>
                      {/* Diabetic Kimmelstiel-Wilson Glomerulus */}
                      <circle cx="50" cy="50" r="38" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                      {/* Nodular Mesangial Expansions (KW nodules) */}
                      <circle cx="38" cy="40" r="11" fill="#991b1b" stroke="#fca5a5" strokeWidth="1.5" />
                      <circle cx="62" cy="45" r="13" fill="#991b1b" stroke="#fca5a5" strokeWidth="1.5" />
                      <circle cx="45" cy="65" r="10" fill="#991b1b" stroke="#fca5a5" strokeWidth="1.5" />
                      <text x="50" y="85" fill="#fecaca" fontSize="4" textAnchor="middle">KW NODULES</text>
                    </>
                  )}
                </svg>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-rose-300/80 font-mono">
                  Pathological Remodeling
                </span>
              </div>
            </div>

            {/* Foreground Layer: Normal View (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-br from-emerald-950/50 to-slate-950 p-6 flex flex-col justify-between overflow-hidden border-r-2 border-cyan-400"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="w-[600px] flex justify-start">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wide">
                  {pair.normalTitle}
                </span>
              </div>

              {/* Normal Visual Render */}
              <div className="w-[600px] flex items-center justify-center my-auto">
                <svg className="w-64 h-64 max-h-[300px]" viewBox="0 0 100 100">
                  {pair.id === 'heart-cardiomyopathy' ? (
                    <>
                      {/* Normal Elliptical Heart */}
                      <path
                        d="M 50,20 C 35,5 15,20 20,48 C 25,72 50,90 50,90 C 50,90 75,72 80,48 C 85,20 65,5 50,20 Z"
                        fill="#064e3b"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        opacity="0.85"
                      />
                      {/* Normal LV lumen */}
                      <ellipse cx="50" cy="55" rx="16" ry="16" fill="#022c22" stroke="#059669" strokeWidth="1" />
                      <text x="50" y="57" fill="#6ee7b7" fontSize="4.5" textAnchor="middle" fontWeight="bold">NORMAL LV CAVITY</text>
                    </>
                  ) : pair.id === 'lung-emphysema' ? (
                    <>
                      {/* Delicate honeycomb alveolar lattice */}
                      <rect x="15" y="15" width="70" height="70" rx="15" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                      {[25, 40, 55, 70].map(x => (
                        <line key={x} x1={x} y1="15" x2={x} y2="85" stroke="#047857" strokeWidth="0.8" strokeDasharray="3 3" />
                      ))}
                      {[25, 40, 55, 70].map(y => (
                        <line key={y} x1="15" y1={y} x2="85" y2={y} stroke="#047857" strokeWidth="0.8" strokeDasharray="3 3" />
                      ))}
                      <text x="50" y="50" fill="#6ee7b7" fontSize="4.5" textAnchor="middle">HOMOGENEOUS SEPTA</text>
                    </>
                  ) : (
                    <>
                      {/* Normal Glomerulus */}
                      <circle cx="50" cy="50" r="38" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <circle cx="50" cy="50" r="28" fill="#022c22" stroke="#059669" strokeWidth="1" />
                      <text x="50" y="52" fill="#6ee7b7" fontSize="4.5" textAnchor="middle">PATENT CAPILLARIES</text>
                    </>
                  )}
                </svg>
              </div>

              <div className="w-[600px] text-left">
                <span className="text-[11px] text-emerald-300/80 font-mono">
                  Physiological Baseline
                </span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-cyan-400 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-xl">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Native Invisible Range Input for Smooth Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              title="Drag horizontally to compare"
            />
          </div>

          {/* Guidance Callout */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>← Slide left for Pathological View</span>
            <span className="font-mono text-cyan-400 font-semibold">{sliderPos}% Normal / {100 - sliderPos}% Pathology</span>
            <span>Slide right for Normal View →</span>
          </div>
        </div>

        {/* Right 4 cols: Quantitative Metrics & Molecular Mechanism */}
        <div className="lg:col-span-4 space-y-4">
          {/* Comparative Metrics Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              CLINICAL & PHYSIOLOGICAL METRICS:
            </span>

            <div className="space-y-2">
              {pair.normalMetrics.map((norm, idx) => {
                const path = pair.pathologicalMetrics[idx];
                return (
                  <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <div className="font-bold text-slate-300">{norm.label}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-emerald-400">Normal: {norm.value}</span>
                      <span className="text-rose-400">Disease: {path?.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Molecular Pathogenesis Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              PATHOPHYSIOLOGICAL MECHANISM
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {pair.mechanism}
            </p>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{pair.references}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
