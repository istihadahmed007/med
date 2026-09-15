import React, { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, HelpCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { MEDICAL_DIAGRAMS } from '../../data/diagramsData';
import { MedicalDiagram, DiagramLabel } from '../../types';

export const MedicalDiagramEngine: React.FC = () => {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(MEDICAL_DIAGRAMS[0].id);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);
  const [revealedQuizIds, setRevealedQuizIds] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const diagram = MEDICAL_DIAGRAMS.find(d => d.id === selectedDiagramId) || MEDICAL_DIAGRAMS[0];
  const activeLabel = diagram.labels.find(l => l.id === selectedLabelId);

  const handleDiagramChange = (id: string) => {
    setSelectedDiagramId(id);
    setSelectedLabelId(null);
    setRevealedQuizIds([]);
  };

  const handleLabelClick = (label: DiagramLabel) => {
    setSelectedLabelId(label.id);
    if (quizMode && !revealedQuizIds.includes(label.id)) {
      setRevealedQuizIds(prev => [...prev, label.id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border border-purple-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
              <Network className="w-3.5 h-3.5" />
              INTERACTIVE MEDICAL DIAGRAM ENGINE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {diagram.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Precision anatomical and physiological diagrams with interactive hot-zones, high-yield clinical pearls, and self-assessment Quiz Mode.
            </p>
          </div>

          {/* Diagram Selector */}
          <div className="flex flex-wrap gap-2">
            {MEDICAL_DIAGRAMS.map((d) => (
              <button
                key={d.id}
                onClick={() => handleDiagramChange(d.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedDiagramId === d.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {d.title.split(' ')[0]} {d.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Diagram Canvas & Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  showLabels ? 'bg-slate-800 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </button>

              <button
                onClick={() => {
                  setQuizMode(!quizMode);
                  setRevealedQuizIds([]);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  quizMode
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {quizMode ? 'Exit Quiz Mode' : 'Quiz Mode (Hide Names)'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.9))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Diagram Canvas */}
          <div className="w-full aspect-[4/3] bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center select-none shadow-2xl p-6">
            <div
              className="w-full h-full max-w-[650px] relative transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Scaled Vector Illustration */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {diagram.id === 'cardiac-conduction' ? (
                  <>
                    {/* Heart Outline */}
                    <path
                      d="M 50,20 C 35,5 15,20 20,48 C 25,72 50,90 50,90 C 50,90 75,72 80,48 C 85,20 65,5 50,20 Z"
                      fill="#1e1b4b"
                      stroke="#4338ca"
                      strokeWidth="1.5"
                    />
                    {/* Interventricular Septum */}
                    <path d="M 50,45 L 50,85" stroke="#312e81" strokeWidth="4" />
                    {/* Internodal tracts */}
                    <path d="M 38,24 Q 45,35 52,48" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="2 1" />
                    {/* Bundle of His & Branches */}
                    <line x1="52" y1="48" x2="52" y2="58" stroke="#ec4899" strokeWidth="2.5" />
                    <path d="M 52,58 Q 42,65 42,75 Q 38,82 30,78" stroke="#ec4899" strokeWidth="2" fill="none" />
                    <path d="M 52,58 Q 62,65 62,75 Q 66,82 72,78" stroke="#ec4899" strokeWidth="2" fill="none" />
                  </>
                ) : diagram.id === 'circle-of-willis' ? (
                  <>
                    {/* Circle of Willis Hexagonal Ring */}
                    {/* Anterior Communicating */}
                    <line x1="42" y1="28" x2="58" y2="28" stroke="#ef4444" strokeWidth="2.5" />
                    {/* Bilateral ACAs */}
                    <path d="M 42,28 L 35,42" stroke="#ef4444" strokeWidth="3" />
                    <path d="M 58,28 L 65,42" stroke="#ef4444" strokeWidth="3" />
                    {/* MCAs radiating laterally */}
                    <path d="M 35,42 L 15,45" stroke="#f87171" strokeWidth="3.5" />
                    <path d="M 65,42 L 85,45" stroke="#f87171" strokeWidth="3.5" />
                    {/* Posterior Communicating */}
                    <path d="M 35,42 L 40,54" stroke="#ef4444" strokeWidth="2" />
                    <path d="M 65,42 L 60,54" stroke="#ef4444" strokeWidth="2" />
                    {/* PCAs */}
                    <path d="M 40,54 L 50,64 L 60,54" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                    {/* Basilar Artery */}
                    <line x1="50" y1="64" x2="50" y2="78" stroke="#ef4444" strokeWidth="4" />
                    {/* Vertebral Arteries */}
                    <path d="M 50,78 L 42,90" stroke="#dc2626" strokeWidth="3" />
                    <path d="M 50,78 L 58,90" stroke="#dc2626" strokeWidth="3" />
                  </>
                ) : (
                  <>
                    {/* Nephron Schematic */}
                    {/* Bowman's Capsule */}
                    <circle cx="25" cy="20" r="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    {/* Glomerular capillary tuft */}
                    <circle cx="25" cy="20" r="4.5" fill="#ef4444" />
                    {/* PCT */}
                    <path d="M 30,22 Q 35,16 40,26 Q 42,35 42,48" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    {/* Loop of Henle: Descending & Ascending */}
                    <path d="M 42,48 L 42,75 Q 50,82 58,75 L 58,45" stroke="#60a5fa" strokeWidth="3" fill="none" />
                    {/* Thick Ascending Limb (TAL) */}
                    <line x1="58" y1="65" x2="58" y2="45" stroke="#3b82f6" strokeWidth="5" />
                    {/* Distal Convoluted Tubule (DCT) */}
                    <path d="M 58,45 Q 68,30 72,35 Q 76,40 85,60" stroke="#a855f7" strokeWidth="3" fill="none" />
                    {/* Collecting Duct */}
                    <line x1="85" y1="20" x2="85" y2="85" stroke="#10b981" strokeWidth="4.5" />
                  </>
                )}
              </svg>

              {/* Interactive Label Pins */}
              {diagram.labels.map((label, index) => {
                const isRevealed = revealedQuizIds.includes(label.id);
                const isSelected = selectedLabelId === label.id;

                return (
                  <div
                    key={label.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                    style={{ left: `${label.x}%`, top: `${label.y}%` }}
                    onClick={() => handleLabelClick(label)}
                  >
                    {/* Pin Marker */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 scale-125 shadow-lg'
                          : quizMode
                          ? isRevealed
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-amber-500/90 text-slate-950 hover:scale-110'
                          : 'bg-purple-600 text-white hover:scale-110 border border-purple-300'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Label Callout Text */}
                    {showLabels && !quizMode && (
                      <div className="absolute left-7 top-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-md px-2 py-0.5 rounded border border-slate-700 text-[11px] font-medium text-slate-200 whitespace-nowrap pointer-events-none shadow-md">
                        {label.name}
                      </div>
                    )}

                    {/* Revealed Name in Quiz Mode */}
                    {quizMode && isRevealed && (
                      <div className="absolute left-7 top-1/2 -translate-y-1/2 bg-emerald-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 whitespace-nowrap pointer-events-none shadow-md animate-fadeIn">
                        {label.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right (4 cols): Detailed Structure Breakdown */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {activeLabel ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  STRUCTURE PIN
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {diagram.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-tight">
                {activeLabel.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {activeLabel.description}
              </p>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block mb-1">
                  Clinical Significance:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                  {activeLabel.clinicalPearl}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 space-y-2">
              <Network className="w-8 h-8 mx-auto opacity-30 text-purple-400" />
              <div className="text-xs font-semibold text-slate-300">Select any anatomical pin</div>
              <div className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Click a numbered marker on the diagram to display its physiological function, vascular supply, and exam pearls.
              </div>
            </div>
          )}

          {/* High-Yield Exam Viva Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              HIGH-YIELD BM&DC VIVA QUESTION
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {diagram.highYieldViva}
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{diagram.references}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
