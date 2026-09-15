import React, { useState } from 'react';
import { Microscope, ZoomIn, ZoomOut, CheckCircle2, SplitSquareVertical, Eye, BookOpen, Layers } from 'lucide-react';
import { HISTOLOGY_SLIDES } from '../../data/histologyData';
import { HistologySlide } from '../../types';

export const HistologyLab: React.FC = () => {
  const [selectedSlideId, setSelectedSlideId] = useState<string>(HISTOLOGY_SLIDES[0].id);
  const [magnification, setMagnification] = useState<'4x' | '10x' | '40x' | '100x'>('10x');
  const [activeTab, setActiveTab] = useState<'split' | 'normal' | 'pathology'>('split');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [focusLevel, setFocusLevel] = useState<number>(100);

  const slide = HISTOLOGY_SLIDES.find(s => s.id === selectedSlideId) || HISTOLOGY_SLIDES[0];

  const getZoomScale = () => {
    switch (magnification) {
      case '4x': return 0.85;
      case '10x': return 1.0;
      case '40x': return 1.45;
      case '100x': return 2.1;
      default: return 1.0;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Microscope className="w-3.5 h-3.5" />
              AUTHENTIC HISTOPATHOLOGY LABORATORY
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Virtual Microscope & Comparative Histology
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              High-resolution cellular cytology with 4x–100x objective turret, field-of-view diaphragm, and synchronized normal vs. pathological diagnostic split comparison.
            </p>
          </div>

          {/* Slide Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {HISTOLOGY_SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSlideId(s.id);
                  setSelectedFeature(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  selectedSlideId === s.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {s.organ}: {s.normalTitle.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Microscope Viewport (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Microscope Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                Normal vs Pathological
              </button>
              <button
                onClick={() => setActiveTab('normal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Normal Only
              </button>
              <button
                onClick={() => setActiveTab('pathology')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'pathology' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Pathology Only
              </button>
            </div>

            {/* Magnification Turret */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 px-2 font-mono">OBJECTIVE:</span>
              {slide.magnificationAvailable.map((mag) => (
                <button
                  key={mag}
                  onClick={() => setMagnification(mag)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    magnification === mag
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {mag}
                </button>
              ))}
            </div>

            {/* Condenser / Focus slider */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <span>FINE FOCUS:</span>
                <input
                  type="range"
                  min="85"
                  max="100"
                  value={focusLevel}
                  onChange={(e) => setFocusLevel(Number(e.target.value))}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Interactive Slide Viewer Canvas */}
          <div
            className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-center min-h-[480px] relative overflow-hidden shadow-inner select-none"
            style={{ filter: `blur(${100 - focusLevel}px) brightness(${brightness}%)` }}
          >
            {/* Circular Eyepiece Reticle Mask */}
            <div className="w-full h-full max-w-[700px] aspect-[4/3] rounded-full border-4 border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.9)_inset] relative overflow-hidden bg-slate-900 flex">
              
              {/* Field Grid / Reticle Lines */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
                <div className="w-full h-[1px] bg-cyan-400 absolute top-1/2 -translate-y-1/2"></div>
                <div className="h-full w-[1px] bg-cyan-400 absolute left-1/2 -translate-x-1/2"></div>
                <div className="w-32 h-32 rounded-full border border-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Normal Slide View */}
              {(activeTab === 'split' || activeTab === 'normal') && (
                <div
                  className={`relative transition-all duration-300 overflow-hidden ${
                    activeTab === 'split' ? 'w-1/2 border-r-2 border-cyan-500/50' : 'w-full'
                  }`}
                  style={{
                    background: slide.id === 'acute-leukemia'
                      ? 'radial-gradient(circle at center, #2e1a38 0%, #170d20 100%)'
                      : 'radial-gradient(circle at center, #422036 0%, #1f0f1b 100%)'
                  }}
                >
                  <div className="absolute top-3 left-4 z-20 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                    NORMAL
                  </div>

                  {/* Simulated Histological Cell Matrix */}
                  <div
                    className="w-full h-full p-4 relative transition-transform duration-300 origin-center"
                    style={{ transform: `scale(${getZoomScale()})` }}
                  >
                    {/* SVG Graphic Rendering representing verified histological features */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {slide.id === 'liver-cirrhosis' ? (
                        <>
                          {/* Normal Hepatic lobule: central vein in center, radiating plates */}
                          <circle cx="50" cy="50" r="12" fill="#581c87" opacity="0.6" stroke="#c084fc" strokeWidth="0.8" />
                          <circle cx="50" cy="50" r="4" fill="#0f172a" />
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                            <line
                              key={idx}
                              x1="50"
                              y1="50"
                              x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                              y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                              stroke="#ec4899"
                              strokeWidth="3.5"
                              strokeDasharray="4 2"
                              opacity="0.75"
                            />
                          ))}
                          {/* Portal triad */}
                          <g transform="translate(78, 18)">
                            <circle cx="0" cy="0" r="6" fill="#3b82f6" opacity="0.8" />
                            <circle cx="6" cy="4" r="3" fill="#ef4444" opacity="0.8" />
                            <circle cx="4" cy="-4" r="3.5" fill="#10b981" opacity="0.8" />
                          </g>
                        </>
                      ) : slide.id === 'glomerulonephritis' ? (
                        <>
                          {/* Normal Glomerulus with patent Bowman Space */}
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#f472b6" strokeWidth="1.5" />
                          <circle cx="50" cy="50" r="26" fill="#831843" opacity="0.5" stroke="#f43f5e" strokeWidth="1" />
                          {/* Delicate capillary loops */}
                          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <circle
                              key={n}
                              cx={50 + 12 * Math.cos(n)}
                              cy={50 + 12 * Math.sin(n)}
                              r="5"
                              fill="#9d174d"
                              stroke="#fb7185"
                              strokeWidth="0.8"
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Normal Blood smear: normocytic RBCs with central pallor */}
                          {[
                            [20, 30], [35, 25], [50, 20], [25, 60], [40, 70], [65, 35], [75, 60], [60, 75], [30, 45]
                          ].map(([x, y], idx) => (
                            <g key={idx} transform={`translate(${x}, ${y})`}>
                              <circle cx="0" cy="0" r="6" fill="#e11d48" opacity="0.85" />
                              <circle cx="0" cy="0" r="2.4" fill="#fecdd3" opacity="0.9" />
                            </g>
                          ))}
                          {/* Multi-lobed neutrophil */}
                          <g transform="translate(70, 40)">
                            <circle cx="0" cy="0" r="9" fill="#7c3aed" opacity="0.4" stroke="#a78bfa" strokeWidth="0.8" />
                            <circle cx="-3" cy="-2" r="3" fill="#4c1d95" />
                            <circle cx="3" cy="-2" r="2.8" fill="#4c1d95" />
                            <circle cx="0" cy="3" r="3.2" fill="#4c1d95" />
                          </g>
                        </>
                      )}
                    </svg>

                    {/* Interactive Landmark Hotspots (Normal) */}
                    {slide.normalFeatures.map((feat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedFeature(feat.name)}
                        className={`absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform hover:scale-125 z-20 ${
                          selectedFeature === feat.name
                            ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-400/40 scale-125'
                            : 'bg-emerald-600/80 text-white border border-emerald-300/80'
                        }`}
                        style={{ left: `${feat.coords.x}%`, top: `${feat.coords.y}%` }}
                        title={feat.name}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pathological Slide View */}
              {(activeTab === 'split' || activeTab === 'pathology') && (
                <div
                  className={`relative transition-all duration-300 overflow-hidden ${
                    activeTab === 'split' ? 'w-1/2' : 'w-full'
                  }`}
                  style={{
                    background: slide.id === 'acute-leukemia'
                      ? 'radial-gradient(circle at center, #351530 0%, #15091b 100%)'
                      : 'radial-gradient(circle at center, #3b1828 0%, #170811 100%)'
                  }}
                >
                  <div className="absolute top-3 right-4 z-20 bg-rose-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-rose-500/30 text-[11px] font-semibold text-rose-300">
                    PATHOLOGICAL
                  </div>

                  {/* Simulated Histopathological Matrix */}
                  <div
                    className="w-full h-full p-4 relative transition-transform duration-300 origin-center"
                    style={{ transform: `scale(${getZoomScale()})` }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {slide.id === 'liver-cirrhosis' ? (
                        <>
                          {/* Cirrhosis: Thick blue fibrous septa enclosing regenerative nodules */}
                          <path
                            d="M 10,20 Q 30,50 60,30 T 95,45 Q 80,75 50,85 T 15,75 Z"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="6"
                            opacity="0.75"
                          />
                          <path
                            d="M 20,40 Q 50,60 85,35"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="4"
                            opacity="0.75"
                          />
                          {/* Disorganized regenerative nodule */}
                          <ellipse cx="68" cy="62" rx="18" ry="14" fill="#9d174d" opacity="0.6" stroke="#f472b6" strokeWidth="1" />
                          <ellipse cx="32" cy="35" rx="14" ry="12" fill="#9d174d" opacity="0.6" stroke="#f472b6" strokeWidth="1" />
                        </>
                      ) : slide.id === 'glomerulonephritis' ? (
                        <>
                          {/* Crescentic GN: Crescent of parietal cells obliterating Bowman space */}
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#f472b6" strokeWidth="1.5" />
                          {/* Crescent shape occupying half Bowman capsule */}
                          <path
                            d="M 20,38 C 24,18 76,18 80,38 C 70,55 30,55 20,38 Z"
                            fill="#dc2626"
                            opacity="0.8"
                            stroke="#fca5a5"
                            strokeWidth="1"
                          />
                          {/* Collapsed capillary tuft */}
                          <ellipse cx="50" cy="64" rx="20" ry="12" fill="#7f1d1d" opacity="0.7" />
                        </>
                      ) : (
                        <>
                          {/* AML: Sheets of large blasts with prominent nucleoli and Auer rods */}
                          {[
                            [35, 30], [55, 35], [45, 60], [70, 50], [25, 65]
                          ].map(([x, y], idx) => (
                            <g key={idx} transform={`translate(${x}, ${y})`}>
                              <circle cx="0" cy="0" r="11" fill="#6b21a8" opacity="0.7" stroke="#c084fc" strokeWidth="0.8" />
                              <circle cx="-2" cy="-2" r="7.5" fill="#3b0764" />
                              <circle cx="-1" cy="-1" r="2" fill="#e9d5ff" />
                            </g>
                          ))}
                          {/* Auer rod: pathognomonic crystalline needle */}
                          <line x1="56" y1="36" x2="62" y2="40" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
                        </>
                      )}
                    </svg>

                    {/* Interactive Landmark Hotspots (Pathology) */}
                    {slide.pathologicalFeatures.map((feat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedFeature(feat.name)}
                        className={`absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform hover:scale-125 z-20 ${
                          selectedFeature === feat.name
                            ? 'bg-rose-400 text-slate-950 ring-4 ring-rose-400/40 scale-125'
                            : 'bg-rose-600/80 text-white border border-rose-300/80'
                        }`}
                        style={{ left: `${feat.coords.x}%`, top: `${feat.coords.y}%` }}
                        title={feat.name}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Guidance Strip */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Stain: <strong className="text-slate-200">{slide.stain}</strong></span>
            <span>Click any numbered circle to reveal cytological morphology & diagnostic pearls.</span>
          </div>
        </div>

        {/* Right Info Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Feature Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4" />
              CYTOLOGICAL IDENTIFICATION
            </div>

            {selectedFeature ? (
              (() => {
                const norm = slide.normalFeatures.find(f => f.name === selectedFeature);
                const path = slide.pathologicalFeatures.find(f => f.name === selectedFeature);
                const feat = norm || path;
                const isPath = !!path;

                return (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{feat?.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isPath ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isPath ? 'PATHOLOGY' : 'NORMAL'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      {feat?.description}
                    </p>
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                <Microscope className="w-8 h-8 mx-auto mb-2 opacity-30 text-indigo-400" />
                Select a marker on either slide to view cell description and diagnostic relevance.
              </div>
            )}
          </div>

          {/* Diagnostic Hallmark */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              HALLMARK MICROSCOPIC FINDING
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
              {slide.hallmarkMicroscopicFinding}
            </p>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-cyan-400 block mb-1">BM&DC OSPE & VIVA PEARL:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {slide.bmdcExamPearls}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{slide.references}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
