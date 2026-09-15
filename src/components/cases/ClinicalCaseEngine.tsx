import React, { useState } from 'react';
import { CLINICAL_CASES } from '../../data/clinicalCasesData';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Wind, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Stethoscope, 
  Search, 
  FileText, 
  Pill, 
  TrendingUp, 
  RotateCcw,
  User
} from 'lucide-react';
import { audioService } from '../../services/audioService';

export const ClinicalCaseEngine: React.FC = () => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const activeCase = CLINICAL_CASES[currentCaseIndex];

  // Dynamic Case State
  const [currentTab, setCurrentTab] = useState<'history' | 'exam' | 'investigations' | 'diagnosis' | 'treatment' | 'debrief'>('history');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [orderedInvestigations, setOrderedInvestigations] = useState<string[]>([]);
  const [selectedDifferential, setSelectedDifferential] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [treatmentConsequence, setTreatmentConsequence] = useState<string | null>(null);

  // Dynamic Vitals responding to student intervention
  const [vitals, setVitals] = useState(activeCase.initialVitals);

  const handleSelectCase = (idx: number) => {
    setCurrentCaseIndex(idx);
    setCurrentTab('history');
    setAskedQuestions([]);
    setOrderedInvestigations([]);
    setSelectedDifferential(null);
    setSelectedTreatment(null);
    setTreatmentConsequence(null);
    setVitals(CLINICAL_CASES[idx].initialVitals);
  };

  const handleAskQuestion = (qid: string) => {
    if (!askedQuestions.includes(qid)) {
      setAskedQuestions([...askedQuestions, qid]);
    }
  };

  const handleOrderInvestigation = (invid: string) => {
    if (!orderedInvestigations.includes(invid)) {
      setOrderedInvestigations([...orderedInvestigations, invid]);
      audioService.playSuccessTone();
    }
  };

  const handleApplyTreatment = (treatmentId: string) => {
    const selected = activeCase.managementOptions.find((m) => m.id === treatmentId);
    if (!selected) return;

    setSelectedTreatment(treatmentId);
    setTreatmentConsequence(selected.consequence);

    if (selected.isCorrectFirstLine) {
      audioService.playSuccessTone();
      // Dynamically improve vitals
      if (selected.vitalsDelta) {
        setVitals((prev) => ({
          ...prev,
          ...selected.vitalsDelta,
        }));
      }
    } else {
      audioService.playAlertBeep();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Patient Header Monitor & Banner */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/30 shadow-glow-cyan space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {activeCase.patientDemographics.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {activeCase.patientDemographics.age}y • {activeCase.patientDemographics.gender}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold">
                  {activeCase.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeCase.patientDemographics.occupation} • Location: {activeCase.patientDemographics.ward}
              </p>
            </div>
          </div>

          {/* Case Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {CLINICAL_CASES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleSelectCase(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                  i === currentCaseIndex
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Case 0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Dynamic Vitals Monitor Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-rose-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">BP</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.bp}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-500" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">HR</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.hr} bpm</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Wind className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">RR</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.rr} /min</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">SpO2</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.spo2}%</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">TEMP</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.temp} °C</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">GCS</span>
              <span className="text-xs font-bold text-white font-mono">{vitals.gcs}</span>
            </div>
          </div>
        </div>

        {/* Chief Complaint Callout */}
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block mb-0.5">
            Chief Complaint:
          </span>
          <p className="text-xs text-rose-100 font-medium">
            "{activeCase.chiefComplaint}"
          </p>
        </div>
      </div>

      {/* Clinical Workflow Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-slate-800 overflow-x-auto">
        {[
          { id: 'history', label: '1. History Taking', icon: FileText },
          { id: 'exam', label: '2. Physical Exam', icon: Stethoscope },
          { id: 'investigations', label: '3. Investigations', icon: Search },
          { id: 'diagnosis', label: '4. Diagnosis Formulation', icon: Activity },
          { id: 'treatment', label: '5. Emergency Treatment', icon: Pill },
          { id: 'debrief', label: '6. Case Debrief', icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: History Taking */}
      {currentTab === 'history' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Take Patient History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select targeted clinical inquiries to elicit symptoms, chronology, and risk factors.
            </p>
          </div>

          <div className="space-y-3">
            {activeCase.historyOptions.map((opt) => {
              const isAsked = askedQuestions.includes(opt.id);
              return (
                <div key={opt.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-cyan-300">
                      Doctor: "{opt.question}"
                    </span>
                    {!isAsked && (
                      <button
                        onClick={() => handleAskQuestion(opt.id)}
                        className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shrink-0"
                      >
                        Ask Patient
                      </button>
                    )}
                  </div>

                  {isAsked && (
                    <div className="space-y-2 pt-2 border-t border-slate-800 animate-in fade-in duration-200">
                      <p className="text-xs italic text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        {opt.patientAnswer}
                      </p>
                      <div className="text-[11px] text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-2 rounded-lg">
                        <strong>Clinical Insight: </strong>
                        {opt.clinicalSignificance}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Physical Exam */}
      {currentTab === 'exam' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Physical Examination Findings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Systematic bedside inspection, palpation, percussion, and auscultation findings.
            </p>
          </div>

          <div className="space-y-3">
            {activeCase.physicalExamFindings.map((sys, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  {sys.system}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">Inspection:</strong>
                    {sys.inspection}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">Palpation:</strong>
                    {sys.palpation}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">Percussion:</strong>
                    {sys.percussion}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">Auscultation:</strong>
                    {sys.auscultation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Investigations */}
      {currentTab === 'investigations' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Diagnostic Investigations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Order laboratory tests, ECG, or diagnostic imaging to confirm the underlying pathology.
            </p>
          </div>

          <div className="space-y-3">
            {activeCase.availableInvestigations.map((inv) => {
              const isOrdered = orderedInvestigations.includes(inv.id);
              return (
                <div key={inv.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        {inv.type}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {inv.resultTitle}
                      </h4>
                    </div>

                    {!isOrdered ? (
                      <button
                        onClick={() => handleOrderInvestigation(inv.id)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-glow-cyan"
                      >
                        Order Test
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Result Available
                      </span>
                    )}
                  </div>

                  {isOrdered && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Formal Report:</span>
                        <span className="text-rose-400 font-bold font-mono">{inv.revealedValue}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {inv.reportSummary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Diagnosis Formulation */}
      {currentTab === 'diagnosis' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Formulate Clinical Diagnosis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your primary working diagnosis from the differential possibilities.
            </p>
          </div>

          <div className="space-y-2">
            {activeCase.differentialDiagnoses.map((diff, i) => {
              const isSelected = selectedDifferential === diff;
              const isCorrect = diff === activeCase.finalDiagnosis;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDifferential(diff)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{diff}</span>
                  {isSelected && (
                    isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedDifferential && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              selectedDifferential === activeCase.finalDiagnosis
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500 text-rose-200'
            }`}>
              <strong className="block mb-1">
                {selectedDifferential === activeCase.finalDiagnosis ? 'Correct Working Diagnosis!' : 'Incorrect Diagnosis'}
              </strong>
              {selectedDifferential === activeCase.finalDiagnosis
                ? `You correctly identified: ${activeCase.finalDiagnosis}. Proceed to the Emergency Treatment tab to stabilize the patient.`
                : `Review the history and key investigation findings to refine your differential.`}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Emergency Treatment */}
      {currentTab === 'treatment' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Emergency Clinical Management
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select the appropriate first-line pharmacotherapy and management protocol.
            </p>
          </div>

          <div className="space-y-3">
            {activeCase.managementOptions.map((opt) => {
              const isSelected = selectedTreatment === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleApplyTreatment(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? opt.isCorrectFirstLine
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold leading-relaxed">{opt.treatmentName}</span>
                    {isSelected && (
                      opt.isCorrectFirstLine ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>

                  {isSelected && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                      <strong className="text-white block mb-0.5">Patient Hemodynamic Response:</strong>
                      <p className="text-slate-300">{opt.consequence}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 6: Case Debrief */}
      {currentTab === 'debrief' && (
        <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">
              Case Completed — Learning Points & Clinical Debrief
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
              High-Yield BM&DC Takeaways:
            </span>
            <ul className="space-y-2 text-xs text-slate-200">
              {activeCase.debriefAndLearningPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
