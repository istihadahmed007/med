import React, { useState } from 'react';
import { DRUG_JOURNEYS } from '../../data/pharmacologyData';
import { Pill, ArrowRight, ShieldCheck, AlertTriangle, Activity, BookOpen, CheckCircle2 } from 'lucide-react';

export const DrugJourneyVisualizer: React.FC = () => {
  const [selectedDrugId, setSelectedDrugId] = useState<string>('furosemide');
  const drug = DRUG_JOURNEYS.find((d) => d.id === selectedDrugId) || DRUG_JOURNEYS[0];

  const pipelineSteps = [
    { label: 'Administration', detail: drug.route, color: 'text-blue-400' },
    { label: 'Absorption', detail: drug.absorptionSite, color: 'text-cyan-400' },
    { label: 'Distribution', detail: drug.distributionAndProteinBinding, color: 'text-purple-400' },
    { label: 'Target / Receptor', detail: drug.targetReceptorOrEnzyme, color: 'text-amber-400' },
    { label: 'Molecular Action', detail: drug.molecularMechanism, color: 'text-emerald-400' },
    { label: 'Physiologic Effect', detail: drug.physiologicalEffect, color: 'text-rose-400' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            Pharmacology Visualizer
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Drug Journey & Molecular Mechanism Pipeline
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Trace pharmacokinetics, receptor interactions, second messenger cascades, and high-yield BM&DC exam points.
          </p>
        </div>

        {/* Drug Selector */}
        <div className="flex items-center gap-2">
          {DRUG_JOURNEYS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDrugId(d.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedDrugId === d.id
                  ? 'bg-purple-600 text-white border-purple-400 shadow-glow-blue'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>{d.genericName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Drug Hero Banner */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-purple-400 font-semibold tracking-wider uppercase">
            {drug.drugClass}
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">
            {drug.genericName}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-400">Available Brands in Bangladesh:</span>
            {drug.tradeNamesInBD.map((brand, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 block">Primary Target / Enzyme:</span>
          <span className="text-emerald-400 font-mono font-bold">{drug.targetReceptorOrEnzyme}</span>
        </div>
      </div>

      {/* Interactive Step-by-Step Drug Journey Pipeline */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Pharmacokinetic & Pharmacodynamic Journey
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 relative flex flex-col justify-between group hover:border-cyan-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-500">STEP 0{idx + 1}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${step.color}`}>
                  {step.label}
                </h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-2 line-clamp-4 group-hover:line-clamp-none transition-all">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Indications, Contraindications, Adverse Effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Clinical Indications */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 space-y-3">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Clinical Indications
          </span>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {drug.clinicalIndications.map((ind, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contraindications */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 space-y-3">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Contraindications
          </span>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {drug.contraindications.map((contra, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>{contra}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Adverse Effects & Monitoring */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-amber-400" />
            Adverse Effects & Monitoring
          </span>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {drug.adverseEffects.map((adv, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* High-Yield Exam Points */}
      <div className="glass-panel-elevated p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20">
        <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          High-Yield BM&DC Exam Pearls
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-200">
          {drug.highYieldExamPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
