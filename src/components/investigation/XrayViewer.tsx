import React, { useState } from 'react';
import { XRAY_CASES } from '../../data/investigationsData';
import { Eye, ZoomIn, ZoomOut, RotateCcw, Sliders, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

export const XrayViewer: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('cxr-tension-pneumothorax');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [isInverted, setIsInverted] = useState<boolean>(false);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [revealed, setRevealed] = useState<boolean>(false);

  const xray = XRAY_CASES.find((c) => c.id === selectedCaseId) || XRAY_CASES[0];

  const handleResetFilters = () => {
    setZoomLevel(1);
    setBrightness(100);
    setContrast(100);
    setIsInverted(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Radiology & Diagnostic Imaging
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Digital Chest Radiograph (CXR) Viewer
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Clinical imaging workstation with contrast/brightness adjustments, anatomical landmark overlays, and systematic reading.
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {XRAY_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setRevealed(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedCaseId === c.id
                  ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-glow-cyan'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {c.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Radiology Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Image Viewport (7 cols) */}
        <div className="lg:col-span-7 glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-4">
          {/* Workstation Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.25, 2.5))}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.25, 0.75))}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetFilters}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                title="Reset adjustments"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Bri:</span>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-16 h-1 bg-slate-700 rounded appearance-none accent-cyan-400"
                />
              </label>

              <label className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Con:</span>
                <input
                  type="range"
                  min="50"
                  max="180"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-16 h-1 bg-slate-700 rounded appearance-none accent-cyan-400"
                />
              </label>

              <button
                onClick={() => setIsInverted(!isInverted)}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  isInverted
                    ? 'bg-cyan-500/30 text-cyan-300 border-cyan-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Invert
              </button>

              <button
                onClick={() => setShowLandmarks(!showLandmarks)}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  showLandmarks
                    ? 'bg-blue-500/30 text-blue-300 border-blue-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Pins ({showLandmarks ? 'ON' : 'OFF'})
              </button>
            </div>
          </div>

          {/* Radiograph Display Viewport */}
          <div className="w-full h-80 rounded-xl bg-black border border-slate-800 relative overflow-hidden flex items-center justify-center">
            {/* Simulated Digital X-Ray SVG */}
            <div
              className="w-full h-full relative transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) ${isInverted ? 'invert(1)' : ''}`,
              }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Thoracic ribcage and spine shadows */}
                <rect x="0" y="0" width="400" height="400" fill="#050505" />
                {/* Spine */}
                <rect x="195" y="40" width="10" height="320" fill="#333" opacity="0.6" />
                {/* Clavicles */}
                <path d="M 80 80 Q 200 95 320 80" stroke="#555" strokeWidth="12" fill="none" opacity="0.7" />
                {/* Ribs bilaterally */}
                {[110, 145, 180, 215, 250, 285, 320].map((y, i) => (
                  <g key={i}>
                    <path d={`M 70 ${y} Q 195 ${y - 20} 195 ${y - 20}`} stroke="#444" strokeWidth="8" fill="none" opacity="0.5" />
                    <path d={`M 330 ${y} Q 205 ${y - 20} 205 ${y - 20}`} stroke="#444" strokeWidth="8" fill="none" opacity="0.5" />
                  </g>
                ))}

                {/* Pathological Feature representation */}
                {selectedCaseId === 'cxr-tension-pneumothorax' ? (
                  /* Right hyperlucent hemithorax with collapsed lung and tracheal shift */
                  <>
                    {/* Collapsed right lung stump at hilum */}
                    <ellipse cx="230" cy="200" rx="35" ry="55" fill="#555" opacity="0.7" />
                    {/* Shifted trachea to left */}
                    <line x1="200" y1="50" x2="175" y2="120" stroke="#888" strokeWidth="10" strokeLinecap="round" />
                    {/* Left lung vascular markings */}
                    <ellipse cx="130" cy="210" rx="55" ry="90" fill="#222" opacity="0.8" />
                  </>
                ) : (
                  /* Lobar Pneumonia right middle lobe consolidation */
                  <>
                    <ellipse cx="270" cy="220" rx="60" ry="45" fill="#888" opacity="0.85" />
                    {/* Horizontal sharp border */}
                    <line x1="210" y1="175" x2="330" y2="175" stroke="#fff" strokeWidth="2" opacity="0.7" />
                    <ellipse cx="130" cy="210" rx="55" ry="90" fill="#222" opacity="0.8" />
                  </>
                )}

                {/* Diaphragmatic Domes */}
                <path d="M 60 350 Q 130 310 200 350" fill="#2a2a2a" opacity="0.8" />
                <path d="M 200 350 Q 280 320 340 350" fill="#2a2a2a" opacity="0.8" />
              </svg>

              {/* Landmark Pins */}
              {showLandmarks &&
                xray.anatomicalLandmarks.map((pin, i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${pin.position.x}%`, top: `${pin.position.y}%` }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-white shadow-glow-cyan animate-pulse" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-white whitespace-nowrap border border-cyan-500/50">
                      {pin.name}
                    </span>
                  </div>
                ))}
            </div>

            <div className="absolute top-2 left-3 bg-slate-950/80 px-2.5 py-0.5 rounded border border-slate-700 text-[10px] font-mono text-slate-300">
              {xray.projection} • Patient ID: #CXR-2026-99
            </div>
          </div>
        </div>

        {/* Right: Systematic Analysis & Reveal (5 cols) */}
        <div className="lg:col-span-5 glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Radiological Findings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Systematic evaluation of Airways, Breathing, Cardiac silhouette, Diaphragm, and Everything else (ABCDE).
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block">
              Cardinal Radiological Signs:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {xray.radiologicalSigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reveal Button */}
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Reveal Definitive Diagnosis & Next Step</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2 animate-in fade-in duration-300">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Definitive Radiological Diagnosis
                </span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  {xray.diagnosis}
                </span>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {xray.pathologyExplanation}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  Immediate Emergency Action:
                </span>
                <p className="text-xs text-rose-100 leading-relaxed font-medium">
                  {xray.clinicalNextStep}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
