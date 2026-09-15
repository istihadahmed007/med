import React, { useState } from 'react';
import { ECG_TEST_CASES } from '../../data/investigationsData';
import { Activity, Search, Ruler, HelpCircle, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

export const EcgViewer: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('ecg-anterior-stemi');
  const [selectedLead, setSelectedLead] = useState<string>('II');
  const [paperSpeed, setPaperSpeed] = useState<25 | 50>(25);
  const [caliperActive, setCaliperActive] = useState<boolean>(false);
  const [showInterpretation, setShowInterpretation] = useState<boolean>(true);

  const ecgCase = ECG_TEST_CASES.find((c) => c.id === selectedCaseId) || ECG_TEST_CASES[0];

  const leads = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">
            Medical Investigation Lab
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            12-Lead Electrocardiogram (ECG) Simulator
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Diagnostic ECG grid with paper speed calibration, lead selector, interval calipers, and systematic interpretation.
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {ECG_TEST_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedCaseId === c.id
                  ? 'bg-rose-600 text-white border-rose-400 font-bold shadow-glow-rose'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {c.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* ECG Canvas & Grid Viewport */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-rose-500/20 space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Lead Selector */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-slate-400 mr-1 font-semibold">Lead:</span>
            {leads.map((lead) => (
              <button
                key={lead}
                onClick={() => setSelectedLead(lead)}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                  selectedLead === lead
                    ? 'bg-rose-500 text-white shadow-glow-rose'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {lead}
              </button>
            ))}
          </div>

          {/* Paper Speed & Caliper */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 px-1">Speed:</span>
              <button
                onClick={() => setPaperSpeed(25)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  paperSpeed === 25 ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                25 mm/s
              </button>
              <button
                onClick={() => setPaperSpeed(50)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  paperSpeed === 50 ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                50 mm/s
              </button>
            </div>

            <button
              onClick={() => setCaliperActive(!caliperActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                caliperActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Caliper ({caliperActive ? 'Active' : 'Off'})</span>
            </button>
          </div>
        </div>

        {/* ECG Grid Paper Display */}
        <div className="w-full h-64 rounded-xl border border-rose-500/40 relative overflow-hidden bg-[#0c1220] flex items-center justify-center">
          {/* Authentic Millimeter Grid SVG Backdrop */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* 1mm small grid */}
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f43f5e" strokeWidth="0.4" opacity="0.4" />
              </pattern>
              {/* 5mm large grid */}
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="url(#smallGrid)" />
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f43f5e" strokeWidth="1.2" opacity="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Animated ECG Wave Trace */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 1000 200" preserveAspectRatio="none">
            {/* Calibration Pulse at Start */}
            <path
              d="M 20 100 L 40 100 L 40 40 L 80 40 L 80 100 L 100 100"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Simulated Pathological Tracing based on selected Case */}
            {selectedCaseId === 'ecg-anterior-stemi' ? (
              /* Severe Tombstone ST Elevation */
              <path
                d="M 100 100 L 140 100 Q 155 80 170 100 L 190 100 L 200 115 L 210 20 L 220 125 L 230 40 Q 280 30 330 100 L 370 100 L 380 115 L 390 20 L 400 125 L 410 40 Q 460 30 510 100 L 550 100 L 560 115 L 570 20 L 580 125 L 590 40 Q 640 30 690 100 L 730 100 L 740 115 L 750 20 L 760 125 L 770 40 Q 820 30 870 100 L 1000 100"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : selectedCaseId === 'ecg-afib' ? (
              /* Chaotic fibrillatory wave with irregular RR intervals */
              <path
                d="M 100 100 Q 110 95 120 103 Q 130 96 140 102 L 145 110 L 152 30 L 160 115 L 170 100 Q 180 97 190 103 L 205 110 L 212 30 L 220 115 L 230 100 Q 260 96 290 103 L 305 110 L 312 30 L 320 115 L 330 100 Q 370 96 410 103 L 425 110 L 432 30 L 440 115 L 450 100 Q 490 96 530 103 L 545 110 L 552 30 L 560 115 L 1000 100"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : selectedCaseId === 'ecg-hyperkalemia' ? (
              /* Peaked Tented T-waves and wide QRS */
              <path
                d="M 100 100 L 160 100 L 175 120 L 200 30 L 225 130 Q 260 10 295 100 L 360 100 L 375 120 L 400 30 L 425 130 Q 460 10 495 100 L 560 100 L 575 120 L 600 30 L 625 130 Q 660 10 695 100 L 1000 100"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ) : (
              /* Normal Sinus Rhythm */
              <path
                d="M 100 100 L 140 100 Q 155 85 170 100 L 190 100 L 198 108 L 205 25 L 214 115 L 225 100 Q 250 70 275 100 L 340 100 Q 355 85 370 100 L 390 100 L 398 108 L 405 25 L 414 115 L 425 100 Q 450 70 475 100 L 540 100 Q 555 85 570 100 L 590 100 L 598 108 L 605 25 L 614 115 L 625 100 Q 650 70 675 100 L 1000 100"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Lead label badge */}
          <div className="absolute top-3 left-4 z-20 bg-slate-950/80 px-2.5 py-1 rounded border border-rose-500/40 text-xs font-mono font-bold text-rose-300">
            Lead {selectedLead} • 25mm/s • 10mm/mV
          </div>
        </div>
      </div>

      {/* Systematic 9-Step Interpretation Guide */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-rose-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Systematic ECG Interpretation sequence
            </h3>
            <span className="text-xs text-rose-400 font-bold font-mono">
              Diagnostic Conclusion: {ecgCase.diagnosis}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-bold text-slate-400 block mb-0.5">1. Rate & Rhythm:</span>
            <span className="text-white font-mono font-bold">{ecgCase.heartRate} bpm</span>
            <p className="text-[11px] text-slate-300 mt-1">{ecgCase.rhythm}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-bold text-slate-400 block mb-0.5">2. Axis & P Wave:</span>
            <span className="text-cyan-400 font-bold">{ecgCase.axis}</span>
            <p className="text-[11px] text-slate-300 mt-1">{ecgCase.pWave}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-bold text-slate-400 block mb-0.5">3. PR & QRS Intervals:</span>
            <span className="text-white font-mono">PR: {ecgCase.prInterval} | QRS: {ecgCase.qrsDuration}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-bold text-rose-400 block mb-0.5">4. ST Segment & T Wave:</span>
            <p className="text-[11px] text-rose-200 font-semibold">{ecgCase.stSegment}</p>
          </div>
        </div>

        {/* High Yield Pearl */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
            BM&DC Exam Pearl:
          </span>
          <p className="text-xs text-cyan-100/90 leading-relaxed">
            {ecgCase.highYieldPearl}
          </p>
        </div>
      </div>
    </div>
  );
};
