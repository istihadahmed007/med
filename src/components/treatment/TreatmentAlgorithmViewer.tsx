import React, { useState } from 'react';
import { TREATMENT_ALGORITHMS } from '../../data/treatmentAlgorithmsData';
import { ShieldCheck, AlertTriangle, ArrowRight, BookOpen, Clock, Activity, CheckCircle2 } from 'lucide-react';

export const TreatmentAlgorithmViewer: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('rx-asthma-protocol');
  const [selectedSeverity, setSelectedSeverity] = useState<'Moderate' | 'Severe / Life-Threatening'>('Severe / Life-Threatening');

  const algorithm = TREATMENT_ALGORITHMS.find((a) => a.id === selectedAlgoId) || TREATMENT_ALGORITHMS[0];
  const currentSeverityLevel = algorithm.severityLevels.find((s) => s.level === selectedSeverity) || algorithm.severityLevels[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Clinical Treatment Decision Engine
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Evidence-Based Treatment Algorithms
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Standardized guideline trees with severity stratification, escalation triggers, and verified national & international citations.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex items-center gap-2">
          {TREATMENT_ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgoId(algo.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedAlgoId === algo.id
                  ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-glow-blue'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {algo.conditionName.split('in')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Protocol Authority Card */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            Source: {algorithm.authorityGuideline}
          </span>
          <h2 className="text-xl font-bold text-white mt-2">
            {algorithm.conditionName}
          </h2>
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
            <span>Last Reviewed: {algorithm.lastReviewed}</span>
            <span>•</span>
            <span>Reviewer: {algorithm.reviewerName}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-amber-300/90 flex items-center gap-2 max-w-sm">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Educational simulation only. Not a substitute for direct clinical supervision.</span>
        </div>
      </div>

      {/* Severity Stratification Switcher */}
      <div className="flex items-center gap-2">
        {algorithm.severityLevels.map((lvl) => (
          <button
            key={lvl.level}
            onClick={() => setSelectedSeverity(lvl.level as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSeverity === lvl.level
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-glow-cyan'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Stratum: {lvl.level}
          </button>
        ))}
      </div>

      {/* Stepwise Decision Flowchart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Triage & Diagnostic Criteria */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            1. Severity Assessment Criteria
          </span>
          <ul className="space-y-2 text-xs text-slate-200">
            {currentSeverityLevel.criteria.map((crit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. First-Line Pharmacotherapy */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            2. First-Line Emergency Interventions
          </span>
          <ul className="space-y-2 text-xs text-slate-200">
            {currentSeverityLevel.firstLineManagement.map((mgt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{mgt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Monitoring & Escalation */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 space-y-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
            3. Monitoring & Escalation Triggers
          </span>
          <div className="space-y-2 text-xs text-slate-200">
            {currentSeverityLevel.monitoring.map((mon, idx) => (
              <p key={idx} className="text-slate-300">
                <strong className="text-slate-400">Monitor: </strong> {mon}
              </p>
            ))}
            <div className="mt-3 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
              <strong className="text-rose-300 block mb-0.5">Escalation Trigger:</strong>
              <span className="text-rose-100 text-[11px]">{currentSeverityLevel.escalationTrigger}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Referral Criteria & Authority References */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-2">
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Immediate ICU / Specialist Referral Criteria
          </span>
          <ul className="space-y-1.5 text-xs text-rose-100">
            {algorithm.emergencyReferralCriteria.map((ref, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20 space-y-2">
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Authoritative Guidelines & Citations
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {algorithm.references.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
