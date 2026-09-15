import React, { useState, useEffect } from 'react';
import { Scissors, Play, Pause, SkipForward, SkipBack, ShieldAlert, MapPin, Wrench, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import { SURGICAL_PROCEDURES } from '../../data/surgeryProceduresData';
import { SurgicalProcedure, SurgicalStep } from '../../types';

export const SurgeryProcedureViewer: React.FC = () => {
  const [selectedProcId, setSelectedProcId] = useState<string>(SURGICAL_PROCEDURES[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'exposure' | 'instruments' | 'landmarks' | 'risks'>('exposure');

  const proc = SURGICAL_PROCEDURES.find(p => p.id === selectedProcId) || SURGICAL_PROCEDURES[0];
  const step: SurgicalStep = proc.steps[currentStepIndex] || proc.steps[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= proc.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, proc.steps.length]);

  const handleProcChange = (id: string) => {
    setSelectedProcId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/60 to-slate-900 border border-teal-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
              <Scissors className="w-3.5 h-3.5" />
              OPERATIVE SURGICAL PROCEDURE SIMULATOR
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {proc.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Authentic step-by-step procedural curriculum. Master operative exposure, critical anatomical landmarks, instrument selection, and prevention of surgical complications.
            </p>
          </div>

          {/* Procedure Switcher */}
          <div className="flex flex-wrap gap-2">
            {SURGICAL_PROCEDURES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProcChange(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedProcId === p.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border border-teal-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {p.title.split(' ')[0]} {p.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Procedural Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Surgical Stage Visualizer & Player Controls */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Step Progression Scrubber Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                  STEP {step.stepNumber} OF {proc.steps.length}:
                </span>
                <span className="text-sm font-bold text-white">{step.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Auto-Advance: {isPlaying ? 'ON' : 'OFF'}</span>
              </div>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="grid grid-cols-6 md:grid-cols-9 gap-1.5">
              {proc.steps.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    idx === currentStepIndex
                      ? 'bg-teal-400 shadow-lg shadow-teal-400/50 scale-105 ring-2 ring-teal-400/30'
                      : idx < currentStepIndex
                      ? 'bg-teal-700 hover:bg-teal-600'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Step ${s.stepNumber}: ${s.title}`}
                />
              ))}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-800/80">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => {
                  setCurrentStepIndex(prev => Math.max(prev - 1, 0));
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous Step"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-teal-600/30 transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY STEP SEQUENCE'}</span>
              </button>

              <button
                disabled={currentStepIndex === proc.steps.length - 1}
                onClick={() => {
                  setCurrentStepIndex(prev => Math.min(prev + 1, proc.steps.length - 1));
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next Step"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Step Simulation Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[380px] relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Step Stage Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
                PHASE {step.stepNumber}: {step.title.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {proc.specialty}
              </span>
            </div>

            {/* Central Illustrated Architectural Diagram */}
            <div className="my-6 flex items-center justify-center relative">
              <div className="w-full max-w-[500px] h-[240px] rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
                {/* Visual SVG schematic representing current operative stage */}
                <svg className="w-40 h-40 opacity-75 mb-2" viewBox="0 0 100 100">
                  {selectedProcId === 'laparoscopic-appendectomy' ? (
                    <>
                      {/* Cecum and Appendix schematic */}
                      <path d="M 20,10 C 20,60 40,75 70,75 C 80,75 85,60 85,10" fill="none" stroke="#64748b" strokeWidth="4" />
                      {/* Appendix emerging from posteromedial cecal wall */}
                      <path
                        d="M 68,74 C 75,85 85,82 82,92"
                        fill="none"
                        stroke={step.stepNumber >= 6 ? '#22c55e' : '#ef4444'}
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      {/* Port triangulation markings */}
                      {step.stepNumber >= 2 && (
                        <>
                          <circle cx="50" cy="20" r="3" fill="#14b8a6" />
                          <circle cx="25" cy="45" r="2.5" fill="#14b8a6" />
                          <circle cx="75" cy="45" r="2.5" fill="#14b8a6" />
                          <line x1="50" y1="20" x2="68" y2="74" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                        </>
                      )}
                      {/* Ligation Endoloop */}
                      {step.stepNumber >= 6 && (
                        <ellipse cx="72" cy="80" rx="4" ry="2" fill="none" stroke="#eab308" strokeWidth="2" />
                      )}
                    </>
                  ) : (
                    <>
                      {/* Chest tube safe triangle */}
                      <path d="M 30,20 L 70,20 L 50,85 Z" fill="#0f766e" opacity="0.2" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                      {/* Ribs 5 and 6 */}
                      <line x1="20" y1="45" x2="80" y2="45" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                      <line x1="20" y1="65" x2="80" y2="65" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                      {/* Tube entering above 6th rib */}
                      {step.stepNumber >= 4 && (
                        <path d="M 50,90 L 50,55 L 65,30" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                      )}
                    </>
                  )}
                </svg>

                <p className="text-xs text-teal-200 font-medium px-4 leading-relaxed">
                  {step.actionSummary}
                </p>
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('exposure')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'exposure' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Anatomical Exposure
                </button>
                <button
                  onClick={() => setActiveTab('instruments')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'instruments' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Instruments
                </button>
                <button
                  onClick={() => setActiveTab('risks')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'risks' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Critical Risks
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 min-h-[90px]">
                {activeTab === 'exposure' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.anatomicalExplanation}
                  </p>
                )}
                {activeTab === 'instruments' && (
                  <div className="flex flex-wrap gap-2">
                    {step.instrumentsRequired.map((inst, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-teal-300 text-xs border border-teal-500/20">
                        {inst}
                      </span>
                    ))}
                  </div>
                )}
                {activeTab === 'risks' && (
                  <div className="flex items-start gap-2 text-xs text-rose-300">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{step.surgicalRiskToAvoid}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Clinical Checklist & Post-Op Protocol */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Key Landmark Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              KEY ANATOMICAL LANDMARK
            </div>
            <p className="text-xs text-white font-medium bg-teal-500/10 border border-teal-500/20 p-3 rounded-xl">
              {step.keyAnatomicalLandmark}
            </p>
          </div>

          {/* Consultant Clinical Pearl */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              SURGICAL PEARL (BAILEY & LOVE)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {step.clinicalPearls}
            </p>
          </div>

          {/* Post-Operative Care Protocol */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2.5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wide block">
              POST-OPERATIVE RECOVERY PROTOCOL:
            </span>
            <ul className="space-y-1.5">
              {proc.postOperativeCare.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{proc.references}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
