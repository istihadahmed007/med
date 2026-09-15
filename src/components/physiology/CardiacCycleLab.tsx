import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward, Info, HelpCircle } from 'lucide-react';
import { CardiacCyclePhase } from '../../types';
import { audioService } from '../../services/audioService';

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
    ventricularVolume: 120, // End-diastolic volume
    heartSound: 'S4',
    description: 'Atria contract, pushing the final 20–30% of blood into ventricles (the "atrial kick"). End-diastolic volume (EDV) reaches approx. 120 mL.',
    clinicalPearls: 'Loss of atrial kick in Atrial Fibrillation reduces cardiac output by up to 25%, precipitating pulmonary edema in mitral stenosis.'
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
    heartSound: 'S1 (LUB)',
    description: 'Ventricular pressure rises sharply above atrial pressure, causing immediate closure of AV valves (S1). All 4 valves closed; volume constant.',
    clinicalPearls: 'S1 is caused by closure of Mitral (M1) and Tricuspid (T1) valves. Loud S1 occurs in Mitral Stenosis; soft S1 in Mitral Regurgitation.'
  },
  {
    id: 3,
    name: 'Rapid Ventricular Ejection',
    shortCode: 'RE',
    durationMs: 150,
    ecgState: 'ST Segment (Plateau Phase)',
    mitralValve: 'closed',
    aorticValve: 'open',
    tricuspidValve: 'closed',
    pulmonaryValve: 'open',
    ventricularPressure: 120,
    aorticPressure: 120,
    atrialPressure: 5,
    ventricularVolume: 75,
    heartSound: 'None',
    description: 'Ventricular pressure exceeds aortic pressure (80 mmHg). Aortic and pulmonary valves burst open; rapid ejection of ~70% of stroke volume.',
    clinicalPearls: 'Peak systolic pressure reached (~120 mmHg). An ejection systolic murmur of Aortic Stenosis peaks during this phase.'
  },
  {
    id: 4,
    name: 'Reduced Ventricular Ejection',
    shortCode: 'RDE',
    durationMs: 150,
    ecgState: 'T Wave (Ventricular Repolarization)',
    mitralValve: 'closed',
    aorticValve: 'open',
    tricuspidValve: 'closed',
    pulmonaryValve: 'open',
    ventricularPressure: 95,
    aorticPressure: 98,
    atrialPressure: 7,
    ventricularVolume: 50, // End-systolic volume
    heartSound: 'None',
    description: 'Ventricular repolarization begins. Ventricular pressure begins to fall while aortic runoff continues.',
    clinicalPearls: 'At the end of this phase, ventricular volume reaches its minimum: End-Systolic Volume (ESV ~50 mL). Stroke Volume = EDV - ESV = 70 mL.'
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
    heartSound: 'S2 (DUB)',
    description: 'Ventricular pressure drops below aortic pressure. Backflow in aorta snaps semilunar valves shut, producing S2 and the dicrotic notch (incisura).',
    clinicalPearls: 'S2 has aortic (A2) and pulmonary (P2) components. Physiologic splitting of S2 widens on inspiration due to increased venous return delaying P2.'
  },
  {
    id: 6,
    name: 'Rapid Ventricular Filling',
    shortCode: 'RF',
    durationMs: 120,
    ecgState: 'TP Isoelectric Segment',
    mitralValve: 'open',
    aorticValve: 'closed',
    tricuspidValve: 'open',
    pulmonaryValve: 'closed',
    ventricularPressure: 5,
    aorticPressure: 84,
    atrialPressure: 3,
    ventricularVolume: 105,
    heartSound: 'S3',
    description: 'Ventricular pressure falls below atrial pressure. AV valves open, and blood rushes passively into relaxed ventricles (~70% of filling).',
    clinicalPearls: 'An abnormal S3 gallop occurs during rapid passive filling when ventricular compliance is reduced, as in dilated cardiomyopathy or severe heart failure.'
  }
];

export const CardiacCycleLab: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(1); // default to Isovolumetric Contraction
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timerRef = useRef<number | null>(null);

  const phase = CARDIAC_PHASES[currentPhaseIndex];

  // Play audio for heart sound when entering phase
  useEffect(() => {
    if (!soundEnabled) return;
    if (phase.heartSound.includes('S1')) {
      audioService.playS1();
    } else if (phase.heartSound.includes('S2')) {
      audioService.playS2();
    }
  }, [currentPhaseIndex, soundEnabled, phase.heartSound]);

  // Animation cycle loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
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

  const handleNext = () => {
    setCurrentPhaseIndex((prev) => (prev + 1) % CARDIAC_PHASES.length);
  };

  const handlePrev = () => {
    setCurrentPhaseIndex((prev) => (prev - 1 + CARDIAC_PHASES.length) % CARDIAC_PHASES.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Living Physiology Simulation Lab
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            The Cardiac Cycle & Wiggers Diagram
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time synchronization of ventricular pressure, aortic pressure, volume, ECG, valves, and heart sounds.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle heart sounds"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-glow-cyan transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Hemodynamic Gauges & Valves (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Pressure & Volume Gauges */}
          <div className="glass-panel-elevated p-5 rounded-2xl border border-cyan-500/20 space-y-4">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center justify-between">
              <span>Hemodynamic Parameters</span>
              <span className="text-[10px] text-slate-400 font-mono">Phase {phase.id}/6: {phase.shortCode}</span>
            </h3>

            {/* Ventricular Pressure Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Left Ventricular Pressure:</span>
                <span className="text-rose-400 font-bold font-mono">{phase.ventricularPressure} mmHg</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(phase.ventricularPressure / 130) * 100}%` }}
                />
              </div>
            </div>

            {/* Aortic Pressure Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Aortic Pressure:</span>
                <span className="text-red-400 font-bold font-mono">{phase.aorticPressure} mmHg</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(phase.aorticPressure / 130) * 100}%` }}
                />
              </div>
            </div>

            {/* Ventricular Volume Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Left Ventricular Volume:</span>
                <span className="text-cyan-400 font-bold font-mono">{phase.ventricularVolume} mL</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(phase.ventricularVolume / 140) * 100}%` }}
                />
              </div>
            </div>

            {/* Valve Status Grid */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Cardiac Valve States:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                  phase.mitralValve === 'open'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}>
                  <span>Mitral (AV) Valve</span>
                  <span className="font-bold uppercase text-[10px]">{phase.mitralValve}</span>
                </div>
                <div className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                  phase.aorticValve === 'open'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}>
                  <span>Aortic Valve</span>
                  <span className="font-bold uppercase text-[10px]">{phase.aorticValve}</span>
                </div>
                <div className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                  phase.tricuspidValve === 'open'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}>
                  <span>Tricuspid Valve</span>
                  <span className="font-bold uppercase text-[10px]">{phase.tricuspidValve}</span>
                </div>
                <div className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                  phase.pulmonaryValve === 'open'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}>
                  <span>Pulmonary Valve</span>
                  <span className="font-bold uppercase text-[10px]">{phase.pulmonaryValve}</span>
                </div>
              </div>
            </div>

            {/* Synchronized Heart Sound Badge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-300">Heart Sound:</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                phase.heartSound !== 'None'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 text-glow-rose'
                  : 'text-slate-500'
              }`}>
                {phase.heartSound}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Phase Details & Wiggers Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Phase Card */}
          <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  Phase {phase.id} of 6
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {phase.name}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  Duration: {phase.durationMs} ms • ECG Correlation: {phase.ecgState}
                </span>
              </div>

              {/* Phase Switchers */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed">
              {phase.description}
            </p>

            {/* BM&DC Clinical Pearl */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                High-Yield Clinical & Exam Pearl
              </h4>
              <p className="text-xs text-cyan-100/90 leading-relaxed">
                {phase.clinicalPearls}
              </p>
            </div>
          </div>

          {/* Phase Timeline Scrubber */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Cardiac Cycle Phases
            </span>
            <div className="grid grid-cols-6 gap-1.5">
              {CARDIAC_PHASES.map((p, idx) => {
                const isActive = idx === currentPhaseIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrentPhaseIndex(idx)}
                    className={`py-2 px-1 rounded-xl text-center transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan scale-105'
                        : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] block font-mono">0{p.id}</span>
                    <span className="text-xs font-bold truncate block">{p.shortCode}</span>
                  </button>
                );
              })}
            </div>

            {/* Speed selection */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Simulation Speed:</span>
              <div className="flex items-center gap-1">
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      playbackSpeed === spd
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
