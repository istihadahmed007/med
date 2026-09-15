import React, { useState } from 'react';
import { Radio, Eye, Crosshair, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, CheckCircle, HelpCircle, Layers } from 'lucide-react';

interface RadiologyCase {
  id: string;
  modality: 'Chest X-Ray' | 'Non-Contrast Head CT' | 'Brain MRI' | 'FAST Ultrasound';
  title: string;
  clinicalHistory: string;
  technique: string;
  abnormalityTarget: {
    x: number; // percentage
    y: number; // percentage
    radius: number; // percentage radius of tolerance
  };
  pathologyName: string;
  radiologistReport: string;
  highYieldPoints: string[];
  references: string;
}

const RADIOLOGY_CASES: RadiologyCase[] = [
  {
    id: 'tension-pneumo',
    modality: 'Chest X-Ray',
    title: 'Post-Traumatic Acute Dyspnea (Erect PA)',
    clinicalHistory: '26-year-old male motorcyclist involved in road traffic accident; presents with severe respiratory distress, cyanosis, tracheal shift to left, and absent right-sided breath sounds.',
    technique: 'Erect Posteroanterior (PA) projection',
    abnormalityTarget: { x: 72, y: 40, radius: 18 },
    pathologyName: 'Right-Sided Tension Pneumothorax with Mediastinal Shift',
    radiologistReport: 'Complete collapse of the right lung with visceral pleural line visible. Hyperlucent right hemithorax devoid of bronchovascular markings. Markedly flattened/depressed right hemidiaphragm and substantial mediastinal and tracheal shift to the contralateral (left) side. Deep sulcus sign on right.',
    highYieldPoints: [
      'Tension pneumothorax is a clinical diagnosis; an X-ray should NOT delay emergency needle decompression.',
      'Air creates one-way "check valve" trapping intrathoracic air, building tension and kinking the inferior vena cava.',
      'Immediate action: 14G cannula in 2nd ICS midclavicular line (or 5th ICS anterior axillary line) followed by chest tube.'
    ],
    references: 'Grainger & Allison’s Diagnostic Radiology, 7th Ed; ATLS 10th Ed.'
  },
  {
    id: 'epidural-hematoma',
    modality: 'Non-Contrast Head CT',
    title: 'Acute Head Injury with Lucid Interval',
    clinicalHistory: '21-year-old male struck on the right pterion by a cricket ball; brief loss of consciousness followed by 2-hour lucid interval, then rapidly declining GCS and right pupillary dilatation.',
    technique: 'Non-contrast Axial Computed Tomography (Brain Window)',
    abnormalityTarget: { x: 26, y: 46, radius: 14 },
    pathologyName: 'Acute Epidural (Extradural) Hematoma (EDH)',
    radiologistReport: 'Classic high-attenuation (hyperdense, 50-70 HU) biconvex / lentiform extra-axial collection in the right temporoparietal region underlying the squamous temporal bone. The collection does NOT cross cranial suture lines (periosteum firmly adherent at sutures). Significant mass effect with compression of the right lateral ventricle and 6 mm midline shift to the left.',
    highYieldPoints: [
      'Rupture of the Middle Meningeal Artery (MMA) beneath the thin pterion is the classic culprit (~85% of cases).',
      'Lentiform shape arises because the expanding hematoma is bounded by cranial suture attachments of the endosteal dura.',
      'Ipsilateral uncal herniation compresses CN III (blown pupil) and contralateral cerebral peduncle (Kernohan notch phenomenon).'
    ],
    references: 'Osborn’s Brain: Imaging, Pathology, and Anatomy, 2nd Ed; Davidson Medicine 24th Ed.'
  },
  {
    id: 'lobar-consolidation',
    modality: 'Chest X-Ray',
    title: 'High Fever, Productive Rusty Sputum & Pleuritic Chest Pain',
    clinicalHistory: '54-year-old diabetic male with 4 days of shaking chills, high fever (39.5°C), tachypnea, and bronchial breath sounds with dullness at right mid-chest.',
    technique: 'Standard PA Chest Radiograph',
    abnormalityTarget: { x: 64, y: 55, radius: 14 },
    pathologyName: 'Right Middle Lobe (RML) Lobar Pneumonia with Silhouette Sign',
    radiologistReport: 'Homogeneous dense airspace consolidation confined to the right middle lobe, bounded superiorly by the horizontal fissure. Positive "silhouette sign" with complete loss of the distinct right heart border (density matches that of the cardiac border). Air bronchograms visible traversing the opacified segment. Right costophrenic angle is preserved.',
    highYieldPoints: [
      'The "Silhouette Sign" of Felson: when two structures of similar radiographic density are in contiguous contact, the intervening anatomical border disappears.',
      'Loss of the right cardiac border indicates pathology in the anteriorly situated Right Middle Lobe.',
      'Most common pathogen in community-acquired lobar pneumonia is Streptococcus pneumoniae.'
    ],
    references: 'Felson’s Principles of Chest Roentgenology, 3rd Ed; Davidson’s Medicine 24th Ed, Ch. 19.'
  }
];

export const RadiologyWorkstation: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(RADIOLOGY_CASES[0].id);
  const [windowMode, setWindowMode] = useState<'standard' | 'high-contrast' | 'inverted'>('standard');
  const [quizModeActive, setQuizModeActive] = useState<boolean>(true);
  const [userGuess, setUserGuess] = useState<{ x: number; y: number } | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeCase = RADIOLOGY_CASES.find(c => c.id === activeCaseId) || RADIOLOGY_CASES[0];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!quizModeActive || hasEvaluated) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    setUserGuess({ x: clickX, y: clickY });

    // Calculate euclidean distance to target
    const dx = clickX - activeCase.abnormalityTarget.x;
    const dy = clickY - activeCase.abnormalityTarget.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const hit = dist <= activeCase.abnormalityTarget.radius;
    setIsCorrectGuess(hit);
    setHasEvaluated(true);
  };

  const resetChallenge = () => {
    setUserGuess(null);
    setHasEvaluated(false);
    setIsCorrectGuess(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 border border-sky-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5" />
              AUTHENTIC CLINICAL RADIOLOGY WORKSTATION
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Diagnostic Imaging & Abnormality Challenge
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Authentic diagnostic imaging interpretation. Engage in the "Find the Abnormality" challenge to test radiological localization before unveiling the expert consultant report.
            </p>
          </div>

          {/* Case Picker */}
          <div className="flex flex-wrap gap-2">
            {RADIOLOGY_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseId(c.id);
                  resetChallenge();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCaseId === c.id
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {c.modality}: {c.id === 'tension-pneumo' ? 'Pneumothorax' : c.id === 'epidural-hematoma' ? 'Extradural Hematoma' : 'Lobar Pneumonia'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Viewport & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Viewport (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Workstation Toolbar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">WINDOWING:</span>
              <button
                onClick={() => setWindowMode('standard')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  windowMode === 'standard' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setWindowMode('high-contrast')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  windowMode === 'high-contrast' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                High Contrast
              </button>
              <button
                onClick={() => setWindowMode('inverted')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  windowMode === 'inverted' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Inverted (Bone/Air)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1.0))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetChallenge}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Pin
              </button>
            </div>
          </div>

          {/* Imaging Canvas */}
          <div
            onClick={handleCanvasClick}
            className={`w-full aspect-[4/3] bg-black border-2 rounded-2xl relative overflow-hidden flex items-center justify-center select-none shadow-2xl cursor-crosshair ${
              hasEvaluated
                ? isCorrectGuess
                  ? 'border-emerald-500/80 shadow-emerald-500/20'
                  : 'border-rose-500/80 shadow-rose-500/20'
                : 'border-slate-800'
            }`}
            style={{
              filter:
                windowMode === 'high-contrast'
                  ? 'contrast(170%) brightness(110%)'
                  : windowMode === 'inverted'
                  ? 'invert(1) contrast(130%)'
                  : 'none'
            }}
          >
            {/* Simulated Radiographic Scans using Scaled Vector Graphics */}
            <div
              className="w-full h-full p-4 flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg className="w-full h-full max-h-[500px]" viewBox="0 0 100 100">
                {activeCase.id === 'tension-pneumo' ? (
                  <>
                    {/* Chest Radiograph Frame */}
                    {/* Thoracic cage ribs */}
                    <rect x="15" y="10" width="70" height="78" rx="20" fill="#111827" />
                    {/* Left Lung (Normal bronchovascular markings, pushed to left) */}
                    <path d="M 46,20 C 35,25 25,45 28,75 C 38,78 46,75 46,20 Z" fill="#1f2937" stroke="#374151" strokeWidth="0.8" />
                    {/* Vascular branching markings in left lung */}
                    <path d="M 40,40 Q 32,48 30,62 M 38,45 Q 32,32 30,28 M 42,55 Q 36,68 34,72" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="1 1" />
                    {/* Cardiac Silhouette (Shifted to Left) */}
                    <path d="M 46,38 C 42,45 32,58 35,74 C 44,76 46,65 46,38 Z" fill="#e5e7eb" opacity="0.85" />
                    {/* Trachea shifted to left */}
                    <line x1="48" y1="12" x2="44" y2="30" stroke="#000" strokeWidth="2.5" />
                    {/* Collapsed right lung at hilum */}
                    <ellipse cx="54" cy="45" rx="4" ry="10" fill="#d1d5db" opacity="0.9" />
                    {/* Right hemithorax (Hyperlucent, completely black, no markings) */}
                    <path d="M 52,20 C 65,22 75,40 76,82 C 65,84 52,78 52,20 Z" fill="#030712" stroke="#1f2937" strokeWidth="0.8" />
                    {/* Flattened right diaphragm pushed down */}
                    <path d="M 54,82 Q 68,88 78,84" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                  </>
                ) : activeCase.id === 'epidural-hematoma' ? (
                  <>
                    {/* Non-contrast Head CT Axial slice */}
                    {/* Calvarium skull bone (bright white) */}
                    <ellipse cx="50" cy="50" rx="38" ry="42" fill="#111827" stroke="#ffffff" strokeWidth="3" />
                    {/* Brain parenchyma */}
                    <ellipse cx="50" cy="50" rx="35" ry="39" fill="#374151" />
                    {/* Midline falx with shift to left */}
                    <path d="M 50,15 Q 55,50 50,85" stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="2 1" />
                    {/* Ventricular compression */}
                    <ellipse cx="45" cy="48" rx="3" ry="8" fill="#111827" />
                    <ellipse cx="56" cy="48" rx="1" ry="5" fill="#111827" opacity="0.3" />
                    {/* Biconvex Hyperdense Lentiform Epidural Hematoma in right temporal region */}
                    <path
                      d="M 18,34 C 28,38 28,58 18,64 C 15,55 15,42 18,34 Z"
                      fill="#f8fafc"
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                  </>
                ) : (
                  <>
                    {/* Right Middle Lobe Consolidation */}
                    <rect x="15" y="10" width="70" height="78" rx="20" fill="#111827" />
                    {/* Both lungs */}
                    <path d="M 48,20 C 35,22 25,40 25,75 C 38,78 48,72 48,20 Z" fill="#1f2937" />
                    <path d="M 52,20 C 65,22 75,40 75,75 C 62,78 52,72 52,20 Z" fill="#1f2937" />
                    {/* Left heart border distinct */}
                    <path d="M 48,40 C 44,50 36,65 40,75 C 48,76 48,65 48,40 Z" fill="#e5e7eb" opacity="0.9" />
                    {/* Right heart border - OBLITERATED by RML Consolidation (Silhouette sign) */}
                    <path
                      d="M 52,48 L 70,48 C 72,58 68,66 52,66 Z"
                      fill="#e5e7eb"
                      opacity="0.92"
                    />
                    {/* Air bronchograms */}
                    <line x1="56" y1="52" x2="65" y2="58" stroke="#111827" strokeWidth="1" />
                    <line x1="58" y1="56" x2="64" y2="62" stroke="#111827" strokeWidth="0.8" />
                  </>
                )}
              </svg>

              {/* Target Outline (Revealed after evaluation) */}
              {hasEvaluated && (
                <div
                  className="absolute rounded-full border-2 border-dashed border-emerald-400 pointer-events-none animate-pulse"
                  style={{
                    left: `${activeCase.abnormalityTarget.x}%`,
                    top: `${activeCase.abnormalityTarget.y}%`,
                    width: `${activeCase.abnormalityTarget.radius * 2}%`,
                    height: `${activeCase.abnormalityTarget.radius * 2}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)'
                  }}
                />
              )}

              {/* User Click Pin */}
              {userGuess && (
                <div
                  className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                    isCorrectGuess ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/50' : 'bg-rose-500 text-white ring-4 ring-rose-500/50'
                  }`}
                  style={{ left: `${userGuess.x}%`, top: `${userGuess.y}%` }}
                >
                  <Crosshair className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Hint Banner if not answered */}
            {!hasEvaluated && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-4 py-1.5 rounded-full text-xs text-slate-300 flex items-center gap-2 pointer-events-none">
                <Crosshair className="w-3.5 h-3.5 text-sky-400" />
                Click directly on the suspected pathology to submit your localization.
              </div>
            )}
          </div>
        </div>

        {/* Right: Clinical History & Radiologist Findings (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Patient Scenario */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-sky-400 uppercase">
                {activeCase.technique}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                {activeCase.modality}
              </span>
            </div>

            <h3 className="text-base font-bold text-white leading-tight">
              {activeCase.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {activeCase.clinicalHistory}
            </p>
          </div>

          {/* Challenge Result & Radiologist Report */}
          {hasEvaluated ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 animate-fadeIn">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                isCorrectGuess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {isCorrectGuess ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide">
                    {isCorrectGuess ? 'Correct Localization!' : 'Suboptimal Localization'}
                  </div>
                  <div className="text-[11px] opacity-90">
                    {isCorrectGuess ? 'Pathology pinned accurately within diagnostic margin.' : 'Consultant target region shown in green circle.'}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  OFFICIAL RADIOLOGY REPORT
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                  {activeCase.radiologistReport}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wide">
                  High-Yield BM&DC Exam Takeaways:
                </span>
                <ul className="space-y-1">
                  {activeCase.highYieldPoints.map((point, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-6 text-center text-slate-500 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto opacity-30 text-sky-400" />
              <div className="text-xs font-semibold text-slate-400">Radiology Report Locked</div>
              <div className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Click on the suspected pathology in the scan to unlock the diagnosis, anatomical mechanism, and high-yield BM&DC clinical points.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
