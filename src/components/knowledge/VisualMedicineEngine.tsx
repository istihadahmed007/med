import React, { useState } from 'react';
import { 
  Network, Search, ArrowRight, ArrowDown, CheckCircle2, ChevronRight, 
  Layers, Activity, AlertTriangle, Stethoscope, FileText, CheckSquare, 
  Pill, Scissors, ShieldAlert, Award, HelpCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { TOPIC_UNIVERSES, TopicUniverseNode } from '../../data/medicalKnowledgeGraph';
import { NavigationView } from '../../types';

interface StepDetail {
  stepIndex: number;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  title: string;
  summary: string;
  details: string[];
  actionLabel?: string;
  targetView?: NavigationView;
}

interface VisualMedicineEngineProps {
  onNavigate?: (view: NavigationView) => void;
}

export const VisualMedicineEngine: React.FC<VisualMedicineEngineProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState<string>('Mitral stenosis');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('mitral-stenosis');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const topic: TopicUniverseNode = TOPIC_UNIVERSES.find(t => t.id === selectedTopicId) || TOPIC_UNIVERSES[0];

  // 12-step journey definition for the active topic
  const steps: StepDetail[] = [
    {
      stepIndex: 1,
      label: 'NORMAL ANATOMY',
      category: 'Gross & Structural Anatomy',
      icon: Layers,
      accentColor: 'from-blue-600 to-indigo-600',
      title: topic.anatomyLink.structureName,
      summary: topic.anatomyLink.description,
      details: [
        'Anatomical location: Left atrioventricular junction',
        'Leaflets: Anterior (aortic) & Posterior (mural) leaflets',
        'Subvalvular apparatus: Chordae tendineae anchored to anterolateral and posteromedial papillary muscles',
        'Coronary supply: LCx artery circumflex branch runs in left AV groove'
      ],
      actionLabel: 'Open 3D Anatomy Atlas',
      targetView: '3d-anatomy'
    },
    {
      stepIndex: 2,
      label: 'NORMAL PHYSIOLOGY',
      category: 'Hemodynamics & Pressure Curves',
      icon: Activity,
      accentColor: 'from-cyan-600 to-blue-600',
      title: 'Diastolic Left Ventricular Inflow',
      summary: 'Normal mitral valve area is 4.0 - 6.0 cm². During ventricular diastole, the valve opens fully with a negligible (<1-2 mmHg) transvalvular pressure gradient.',
      details: [
        'Rapid ventricular filling phase (E-wave on echo)',
        'Diastasis: period of slow passive flow',
        'Atrial systole (A-wave): contributes last 15-20% of LV end-diastolic volume',
        'Normal left atrial mean pressure: 4 - 10 mmHg'
      ],
      actionLabel: 'Open Physiology Cardiac Lab',
      targetView: 'physiology'
    },
    {
      stepIndex: 3,
      label: 'PATHOLOGICAL CHANGE',
      category: 'Macroscopic & Histopathology',
      icon: AlertTriangle,
      accentColor: 'from-rose-600 to-red-600',
      title: topic.pathologyLink.stageTitle,
      summary: topic.pathologyLink.grossAndMicro,
      details: [
        'Hallmark macroscopic lesion: ' + topic.pathologyLink.hallmarkLesion,
        'Commissural fusion leading to rigid, funnel-shaped orifice',
        'Thickening and shortening of chordae tendineae',
        'Aschoff bodies with central fibrinoid necrosis and Anitschkow cells'
      ],
      actionLabel: 'Open Histology Lab',
      targetView: 'histology'
    },
    {
      stepIndex: 4,
      label: 'MECHANISM',
      category: 'Pathophysiological Cascade',
      icon: Network,
      accentColor: 'from-amber-600 to-orange-600',
      title: topic.physiologyLink.mechanismName,
      summary: topic.physiologyLink.parameterChanges,
      details: [
        'Valvular stenosis -> diastolic barrier to LV filling',
        'Left atrial pressure rises to 20-30 mmHg to maintain cardiac output',
        'Retrograde transmission -> pulmonary venous congestion -> pulmonary capillary transudation',
        'Tachycardia (shortened diastole) markedly worsens LA hypertension'
      ],
      actionLabel: 'Compare Normal vs Abnormal',
      targetView: 'comparison'
    },
    {
      stepIndex: 5,
      label: 'CLINICAL FEATURES',
      category: 'Bedside Symptoms & Physical Signs',
      icon: Stethoscope,
      accentColor: 'from-emerald-600 to-teal-600',
      title: 'Symptoms, Auscultation & Examination',
      summary: topic.clinicalFeatures.auscultationOrPalpation,
      details: [
        ...topic.clinicalFeatures.symptoms.map(s => 'Symptom: ' + s),
        ...topic.clinicalFeatures.signs.map(s => 'Sign: ' + s)
      ],
      actionLabel: 'Simulate Clinical Precordial Exam',
      targetView: 'clinical-exam'
    },
    {
      stepIndex: 6,
      label: 'INVESTIGATIONS',
      category: 'Diagnostic Confirmation',
      icon: FileText,
      accentColor: 'from-sky-600 to-cyan-600',
      title: 'ECG, Imaging & Echocardiography',
      summary: `Gold standard: ${topic.investigations.goldStandard}. ECG: ${topic.investigations.ecgChanges || 'N/A'}.`,
      details: [
        `Echocardiography: Planimetered MVA ≤1.5 cm² = Severe, Mean gradient >10 mmHg`,
        `ECG: ${topic.investigations.ecgChanges || 'Broad notched P mitrale'}`,
        `Radiology: ${topic.investigations.radiologyFindings || 'Straightening of left cardiac border'}`
      ],
      actionLabel: 'Examine Diagnostic ECGs & Scans',
      targetView: 'investigations'
    },
    {
      stepIndex: 7,
      label: 'DIAGNOSIS',
      category: 'Clinical Decision & Criteria',
      icon: CheckSquare,
      accentColor: 'from-violet-600 to-purple-600',
      title: `Confirmed Diagnosis: ${topic.title}`,
      summary: 'Confirmation of severe rheumatic mitral stenosis with pulmonary hypertension and secondary atrial fibrillation.',
      details: [
        'Severity grading: Normal (4-6 cm²) -> Moderate (1.5-2.0 cm²) -> Severe (≤1.5 cm²)',
        'Wilkins Echo Score assessment: Leaflet mobility, thickening, calcification, subvalvular thickening',
        'Screening for left atrial appendage thrombus prior to mechanical intervention'
      ],
      actionLabel: 'Open Clinical Case Simulator',
      targetView: 'cases'
    },
    {
      stepIndex: 8,
      label: 'TREATMENT',
      category: 'Evidence-Based Pharmacology',
      icon: Pill,
      accentColor: 'from-teal-600 to-emerald-600',
      title: topic.pharmacology.firstLineDrug,
      summary: `Mechanism: ${topic.pharmacology.mechanism}`,
      details: [
        'Rate Control: Beta-blocker (Bisoprolol) to prolong diastole and lower LAP',
        'Decongestion: Loop diuretics (Furosemide) for acute pulmonary edema',
        'Stroke Prevention: Oral Anticoagulation (Warfarin, target INR 2.0-3.0)',
        'Secondary Rheumatic Prophylaxis: IM Benzathine Penicillin G 1.2 MU monthly'
      ],
      actionLabel: 'Open Drug Mechanism Lab',
      targetView: 'pharmacology'
    },
    {
      stepIndex: 9,
      label: 'PROCEDURES',
      category: 'Surgical & Percutaneous Intervention',
      icon: Scissors,
      accentColor: 'from-pink-600 to-rose-600',
      title: 'PBMV vs. Surgical Mitral Valve Replacement',
      summary: 'Percutaneous Balloon Mitral Valvotomy (Inoue balloon technique) is first-line for pliable, non-calcified valves (Wilkins score ≤8).',
      details: [
        'Femoral venous access -> transseptal puncture into left atrium',
        'Inoue balloon advanced across mitral valve and inflated to split fused commissures',
        'Surgical Mitral Valve Replacement (MVR) required if severe calcification or significant MR is present',
        'Lifelong anticoagulation needed for mechanical prostheses (target INR 2.5-3.5)'
      ],
      actionLabel: 'Open Surgical Procedure Viewer',
      targetView: 'surgery'
    },
    {
      stepIndex: 10,
      label: 'COMPLICATIONS',
      category: 'Long-Term Morbidity & Sequelae',
      icon: ShieldAlert,
      accentColor: 'from-orange-600 to-amber-600',
      title: 'Atrial Fibrillation & Pulmonary Hypertension',
      summary: 'Chronic high atrial tension produces electrophysiological remodeling, progressive fibrosis, and thromboembolism.',
      details: [
        'Systemic arterial embolism: Cerebral stroke (MCA territory), mesenteric ischemia',
        'Pulmonary hypertension and right-sided congestive heart failure',
        'Infective endocarditis on damaged leaflets',
        'Ortner syndrome (hoarseness due to recurrent laryngeal nerve compression by giant LA)'
      ]
    },
    {
      stepIndex: 11,
      label: 'OSPE / VIVA',
      category: 'BM&DC Examination Stations',
      icon: Award,
      accentColor: 'from-indigo-600 to-blue-600',
      title: 'High-Yield Examiner Questions',
      summary: topic.highYieldVivaQuestions[0] || 'Explain the anatomical triangle of Koch and the auscultatory findings.',
      details: topic.highYieldVivaQuestions.map((q, i) => `Q${i+1}: ${q}`),
      actionLabel: 'Launch AI Viva Examiner',
      targetView: 'ai-viva'
    },
    {
      stepIndex: 12,
      label: 'MCQs & REVISION',
      category: 'Self-Assessment & Mastery',
      icon: HelpCircle,
      accentColor: 'from-purple-600 to-pink-600',
      title: `Single Best Answer (SBA) MCQs (${topic.sampleMcqsCount} Questions)`,
      summary: 'Test your grasp across all 12 interconnected domains with BM&DC past paper questions.',
      details: [
        'Stem 1: Which of the following is an absolute contraindication for Percutaneous Balloon Mitral Valvotomy? (Left atrial thrombus)',
        'Stem 2: The classic auscultatory opening snap in mitral stenosis corresponds to what event? (Tensing of pliable anterior mitral leaflet during early diastole)',
        'Stem 3: What is the recommended target INR for anticoagulation in mitral stenosis with AF? (INR 2.0 - 3.0)'
      ],
      actionLabel: 'Take Topic MCQ Quiz',
      targetView: 'questions'
    }
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              THE VISUAL MEDICINE ENGINE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Unified 12-Stage Medical Knowledge Journey
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Don't study medicine in disconnected fragments. Follow any medical condition through its complete, uninterrupted scientific pathway from cell anatomy to definitive surgery and board exams.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Mitral stenosis, Asthma..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-indigo-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 shadow-inner"
            />
          </div>
        </div>

        {/* Topic Quick Chips */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-mono py-1">POPULAR TOPIC UNIVERSES:</span>
          {TOPIC_UNIVERSES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopicId(t.id);
                setActiveStepIndex(0);
                setSearchQuery(t.title);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTopicId === t.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/50'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              {t.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* The 12-Step Horizontal Subway Map Navigation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[1000px] justify-between">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <React.Fragment key={s.stepIndex}>
                <button
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 group flex-1 ${
                    isActive
                      ? 'bg-indigo-600/20 border border-indigo-500/50 shadow-lg scale-105'
                      : 'hover:bg-slate-800/50 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                      isActive
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-500/20'
                        : isCompleted
                        ? 'bg-emerald-600/80 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.stepIndex}
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-tight text-center truncate max-w-[80px] ${
                      isActive ? 'text-indigo-300' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Interactive Visual Canvas & Core Mechanisms */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${currentStep.accentColor} text-white shadow-lg`}>
                  {React.createElement(currentStep.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest block">
                    STAGE {currentStep.stepIndex} OF 12 • {currentStep.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {currentStep.title}
                  </h2>
                </div>
              </div>

              {currentStep.actionLabel && currentStep.targetView && onNavigate && (
                <button
                  onClick={() => onNavigate(currentStep.targetView!)}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>{currentStep.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Scientific Explanation Paragraph */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {currentStep.summary}
              </p>
            </div>

            {/* Structured Medical Findings Bullet Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                SCIENTIFIC CRITERIA & EVIDENCE BASE:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentStep.details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => Math.max(prev - 1, 0))}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous Stage
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {activeStepIndex + 1} / {steps.length}
              </span>

              <button
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex(prev => Math.min(prev + 1, steps.length - 1))}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Connected Knowledge Node Graph */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Jump Action Card */}
          {currentStep.actionLabel && currentStep.targetView && onNavigate && (
            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                INTERACTIVE SIMULATOR LINK
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Launch the dedicated, full-screen clinical simulation engine for this stage of learning:
              </p>
              <button
                onClick={() => onNavigate(currentStep.targetView!)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>{currentStep.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Connected Pathway Tree Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              FULL KNOWLEDGE CHAIN ({topic.title}):
            </span>

            <div className="space-y-1.5">
              {steps.map((st, i) => (
                <button
                  key={st.stepIndex}
                  onClick={() => setActiveStepIndex(i)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    i === activeStepIndex
                      ? 'bg-indigo-600 text-white font-semibold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] opacity-75">{st.stepIndex}.</span>
                    <span>{st.label}</span>
                  </div>
                  {i === activeStepIndex && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
