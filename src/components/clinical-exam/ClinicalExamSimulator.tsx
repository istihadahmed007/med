import React, { useState } from 'react';
import { ClinicalExamStep } from '../../types';
import { Stethoscope, CheckCircle2, AlertTriangle, Play, Volume2, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { audioService } from '../../services/audioService';

const CVS_EXAM_STEPS: ClinicalExamStep[] = [
  {
    stepId: 'step-intro',
    stepNumber: 1,
    category: 'introduction',
    title: 'Introduction, Consent & Patient Exposure',
    description: 'Greet the patient, introduce yourself, explain the examination, and obtain verbal consent. Position the patient comfortably at 45 degrees with adequate exposure from waist up while maintaining privacy.',
    correctTechnique: 'Always examine from the patient\'s right-hand side. Ensure good ambient lighting and warm hands.',
    studentActionRequired: 'Introduce yourself & position patient at 45°',
    normalFinding: 'Patient is comfortable at rest, breathing unlabored, no cyanosis.',
    abnormalFinding: 'Dyspneic at rest, malar flush, respiratory distress.',
    examinerCritique: 'Essential bedside etiquette; starting without consent results in immediate penalty in BM&DC practical exams.'
  },
  {
    stepId: 'step-vitals',
    stepNumber: 2,
    category: 'inspection',
    title: 'Peripheral Signs & Radial Pulse',
    description: 'Inspect hands for splinter hemorrhages, Janeway lesions, Osler nodes, and finger clubbing. Palpate radial pulse for rate, rhythm, and radio-radial delay; check for water-hammer pulse (collapsing pulse).',
    correctTechnique: 'Palpate radial pulse with three fingers for at least 30 seconds; elevate forearm to test for collapsing pulse of aortic regurgitation.',
    studentActionRequired: 'Examine hands & palpate radial pulse',
    normalFinding: 'Pulse rate 72 bpm, regular rhythm, normal volume.',
    abnormalFinding: 'Irregularly irregular pulse (Atrial Fibrillation) or collapsing pulse (Aortic Regurgitation).',
    examinerCritique: 'Always synchronize precordial auscultation with the carotid or radial pulse.'
  },
  {
    stepId: 'step-jvp',
    stepNumber: 3,
    category: 'inspection',
    title: 'Jugular Venous Pressure (JVP)',
    description: 'Inspect internal jugular vein pulsations between the two heads of sternocleidomastoid muscle at 45 degrees. Measure vertical height above sternal angle of Louis.',
    correctTechnique: 'Use tangential light; distinguish from carotid pulse (JVP is non-palpable, double-peaked, and obliterated by light pressure).',
    studentActionRequired: 'Inspect internal jugular vein & measure JVP height',
    normalFinding: 'JVP not visible or vertical height < 3 cm above sternal angle of Louis.',
    abnormalFinding: 'Elevated JVP with prominent "a" wave (pulmonary hypertension) or absent "a" wave (atrial fibrillation).',
    examinerCritique: 'Very common viva question: distinguish internal jugular venous pulsation from carotid pulsation.'
  },
  {
    stepId: 'step-palpation-apex',
    stepNumber: 4,
    category: 'palpation',
    title: 'Palpation of Apex Beat & Parasternal Heave',
    description: 'Place the palm of your right hand flat over the precordium to localize the apex beat, then pinpoint with the fingertip. Palpate for left parasternal heave and thrills.',
    correctTechnique: 'Localize apex beat: normal is in the left 5th intercostal space within the midclavicular line (approx 9 cm from midsternal line).',
    studentActionRequired: 'Palpate apex beat & detect parasternal heave',
    normalFinding: 'Apex beat localized in left 5th ICS MCL, gentle tapping character, no heave or thrill.',
    abnormalFinding: 'Tapping apex beat (palpable S1 in Mitral Stenosis) or heaving/displaced apex (LV hypertrophy in Aortic Stenosis/HTN).',
    examinerCritique: 'Tapping apex beat is a classic sign of Mitral Stenosis; do not miss parasternal heave indicating right ventricular enlargement.'
  },
  {
    stepId: 'step-auscultation',
    stepNumber: 5,
    category: 'auscultation',
    title: 'Auscultation of the 4 Precordial Areas',
    description: 'Systematically auscultate with diaphragm and bell at: 1. Mitral area (apex); 2. Tricuspid area (left lower sternal border); 3. Pulmonary area (2nd left ICS); 4. Aortic area (2nd right ICS).',
    correctTechnique: 'Use the bell lightly for low-pitched murmurs (e.g. Mitral Stenosis mid-diastolic rumble); use the diaphragm firmly for high-pitched sounds (S1, S2, systolic murmurs). Turn patient to left lateral position to listen to apex in expiration.',
    studentActionRequired: 'Auscultate 4 valve areas with bell & diaphragm',
    normalFinding: 'Normal S1 and S2 heart sounds audible throughout; no murmurs, rubs, or gallops.',
    abnormalFinding: 'Loud S1, Opening Snap, and low-pitched rumbling mid-diastolic murmur localized to apex (Mitral Stenosis).',
    examinerCritique: 'Always perform the two dynamic maneuvers: left lateral decubitus for mitral area, and leaning forward in full held expiration for aortic regurgitation.'
  }
];

export const ClinicalExamSimulator: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAuscultationArea, setSelectedAuscultationArea] = useState<string | null>(null);

  const step = CVS_EXAM_STEPS[currentStepIndex];
  const isAllCompleted = completedSteps.length === CVS_EXAM_STEPS.length;

  const handleCompleteCurrentStep = () => {
    if (!completedSteps.includes(step.stepId)) {
      setCompletedSteps([...completedSteps, step.stepId]);
    }
    if (currentStepIndex < CVS_EXAM_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleResetExam = () => {
    setCompletedSteps([]);
    setCurrentStepIndex(0);
    setSelectedAuscultationArea(null);
  };

  const handleAuscultateArea = (area: 'mitral' | 'aortic' | 'pulmonary' | 'tricuspid') => {
    setSelectedAuscultationArea(area);
    if (area === 'mitral') {
      audioService.playMitralStenosisMurmur();
    } else {
      audioService.playS1();
      setTimeout(() => audioService.playS2(), 300);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Bedside Clinical Examination Simulator
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Cardiovascular System: Examination of the Precordium
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Standardized virtual patient encounter evaluating examination sequence, correct physical technique, and auscultatory interpretation.
          </p>
        </div>

        <button
          onClick={handleResetExam}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Exam</span>
        </button>
      </div>

      {/* Progress Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CVS_EXAM_STEPS.map((s, idx) => {
          const isDone = completedSteps.includes(s.stepId);
          const isCurrent = idx === currentStepIndex;
          return (
            <button
              key={s.stepId}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isCurrent
                  ? 'bg-blue-950/60 border-cyan-400 text-white shadow-glow-cyan'
                  : isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold">Step 0{s.stepNumber}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <span className="text-xs font-bold truncate block">{s.title.split('&')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Examination Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Virtual Patient Chest Auscultation Hotspots (5 cols) */}
        <div className="lg:col-span-5 glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              Precordial Auscultation Targets
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Patient at 45°</span>
          </div>

          {/* Interactive Chest Graphic with Auscultation Pins */}
          <div className="w-64 h-72 relative bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Chest Silhouette */}
            <svg viewBox="0 0 200 240" className="w-full h-full opacity-60">
              {/* Clavicles */}
              <line x1="30" y1="35" x2="90" y2="45" stroke="#475569" strokeWidth="4" />
              <line x1="170" y1="35" x2="110" y2="45" stroke="#475569" strokeWidth="4" />
              {/* Sternum */}
              <rect x="94" y="45" width="12" height="90" rx="3" fill="#334155" />
              {/* Rib outlines */}
              <path d="M 40 80 Q 94 65 94 65" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 160 80 Q 106 65 106 65" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 35 115 Q 94 95 94 95" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 165 115 Q 106 95 106 95" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 35 155 Q 94 125 94 125" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 165 155 Q 106 125 106 125" fill="none" stroke="#334155" strokeWidth="2" />
            </svg>

            {/* 1. Aortic Area (Right 2nd ICS parasternal) */}
            <button
              onClick={() => handleAuscultateArea('aortic')}
              className="absolute top-16 left-16 p-2 rounded-full bg-red-500/80 hover:bg-red-400 text-white font-bold text-[10px] shadow-glow-rose transition-transform hover:scale-110"
              title="Aortic Area (2nd RICS)"
            >
              A
            </button>

            {/* 2. Pulmonary Area (Left 2nd ICS parasternal) */}
            <button
              onClick={() => handleAuscultateArea('pulmonary')}
              className="absolute top-16 right-16 p-2 rounded-full bg-blue-500/80 hover:bg-blue-400 text-white font-bold text-[10px] shadow-glow-blue transition-transform hover:scale-110"
              title="Pulmonary Area (2nd LICS)"
            >
              P
            </button>

            {/* 3. Tricuspid Area (Left 4th ICS parasternal) */}
            <button
              onClick={() => handleAuscultateArea('tricuspid')}
              className="absolute top-36 right-20 p-2 rounded-full bg-amber-500/80 hover:bg-amber-400 text-black font-bold text-[10px] transition-transform hover:scale-110"
              title="Tricuspid Area (4th LICS)"
            >
              T
            </button>

            {/* 4. Mitral Area (Left 5th ICS Midclavicular Line - Apex) */}
            <button
              onClick={() => handleAuscultateArea('mitral')}
              className="absolute top-48 right-12 p-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-glow-cyan animate-bounce transition-transform hover:scale-110"
              title="Mitral Area (5th LICS MCL - Cardiac Apex)"
            >
              M
            </button>
          </div>

          {/* Auscultation feedback panel */}
          {selectedAuscultationArea && (
            <div className="w-full p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-cyan-300 uppercase">
                  Listening to: {selectedAuscultationArea} Area
                </span>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <p className="text-slate-300 text-[11px]">
                {selectedAuscultationArea === 'mitral'
                  ? 'Auscultatory Finding: Loud tapping S1, sharp Opening Snap, followed by a low-pitched rumbling Mid-Diastolic Murmur with presystolic accentuation (Mitral Stenosis).'
                  : 'Auscultatory Finding: Normal physiologic S1 and S2 heart sounds; no added gallops or pathological murmurs.'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Step Instructions & Examiner Critique (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Step 0{step.stepNumber}: {step.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {completedSteps.includes(step.stepId) ? 'Completed' : 'Pending Action'}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white">
              {step.title}
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {step.description}
            </p>

            {/* Technique Guidelines */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Correct Bedside Technique:
              </span>
              <p className="text-xs text-slate-300">
                {step.correctTechnique}
              </p>
            </div>

            {/* Normal vs Abnormal Findings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">Normal Finding:</span>
                <p className="text-slate-300 text-[11px]">{step.normalFinding}</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs">
                <span className="font-bold text-rose-400 block mb-1">Pathological Finding:</span>
                <p className="text-slate-300 text-[11px]">{step.abnormalFinding}</p>
              </div>
            </div>

            {/* Examiner Critique */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                BM&DC Examiner Feedback:
              </span>
              <p className="text-xs text-cyan-100/90 leading-relaxed">
                {step.examinerCritique}
              </p>
            </div>

            {/* Action button */}
            <button
              onClick={handleCompleteCurrentStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Perform Step & Record Bedside Finding</span>
            </button>
          </div>

          {/* All Completed Celebration Badge */}
          {isAllCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-center space-y-1 animate-in zoom-in-95 duration-300">
              <div className="inline-flex p-2 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Precordial Examination Completed Successfully!
              </h3>
              <p className="text-xs text-emerald-200">
                You followed the correct clinical sequence, accurately identified the tapping apex beat, and elicited the auscultatory findings of Mitral Stenosis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
