import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  FlaskConical, 
  ArrowRight,
  Eye,
  CheckCircle2,
  Info
} from 'lucide-react';
import { NavigationView } from '../../types';

interface AnatomyPreviewProps {
  onNavigate: (view: NavigationView) => void;
}

export const AnatomyPreview: React.FC<AnatomyPreviewProps> = ({ onNavigate }) => {
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Rotation animation loop
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <section 
      aria-label="Interactive 3D Anatomy Exploration Feature"
      className="rounded-[26px] bg-[rgba(10,36,74,0.40)] border border-[rgba(190,225,255,0.20)] border-t-[rgba(255,255,255,0.25)] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.38)] relative overflow-hidden"
    >
      {/* Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(8, 175, 193, 0.18) 0%, rgba(23, 72, 160, 0.12) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Purpose, Heading, Supporting text, CTAs */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#08AFC1] flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4" />
              INTERACTIVE 3D SIMULATION
            </span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F9FF] tracking-tight leading-tight">
              Explore anatomy in 3D
            </h2>
            <p className="text-base sm:text-lg text-[#C4D4EA] font-sans font-normal mt-2 leading-relaxed">
              Rotate, isolate, and identify structures. Examine organ relationships, neurovascular bundles, and cross-sectional planes before entering the dissection hall or clinical OSCE.
            </p>
          </div>

          {/* Key Feature Bullets */}
          <div className="space-y-2 pt-1 text-sm text-[#C4D4EA]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#08AFC1] shrink-0" />
              <span>Full thoracic, cardiovascular & abdominal anatomical models</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#08AFC1] shrink-0" />
              <span>Layered peeling: Musculoskeletal, Vascular, Nervous & Visceral systems</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#08AFC1] shrink-0" />
              <span>Tagged with BMDC viva examination pointers & clinical relations</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onNavigate('visual-lab')}
              className="min-h-[46px] px-6 py-3 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(8,175,193,0.45)] hover:shadow-[0_0_35px_rgba(8,175,193,0.65)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Open Full 3D Visual Lab"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Open full 3D visual lab</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Torso + Interactive Controls */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
          
          {/* 3D Visual Model Stage with Loading Skeleton Fallback */}
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
            
            {/* Loading skeleton placeholder */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse flex flex-col items-center justify-center text-slate-400 gap-3">
                <FlaskConical className="w-8 h-8 text-[#08AFC1] animate-spin" />
                <span className="text-xs font-mono">Loading anatomical structures...</span>
              </div>
            )}

            {/* Anatomical Torso Image */}
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
              style={{
                transform: isIsolated 
                  ? 'scale(1.15) translateY(8px)' 
                  : `scale(1) rotateY(${rotationAngle}deg)`,
              }}
            >
              <img
                src="/anatomy/torso_hero.png"
                alt="3D Anatomical Human Torso Model"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setHasError(true);
                  setIsLoaded(true);
                }}
                className={`w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition-opacity duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            </div>

            {/* Circular Cardiac Preview Lens */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col items-center">
              <button
                onClick={() => onNavigate('visual-lab')}
                aria-label="Inspect 3D Heart Anatomy in Visual Lab"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[rgba(6,23,46,0.75)] border-2 border-[#08AFC1] shadow-[0_0_24px_rgba(8,175,193,0.5)] backdrop-blur-xl p-1.5 flex items-center justify-center cursor-pointer hover:scale-105 transition-all group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <img
                  src="/anatomy/heart_preview.png"
                  alt="3D Cardiac Anatomy Preview"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform"
                  loading="lazy"
                />
              </button>
              <span className="mt-1 text-[11px] font-sans font-medium text-[#C4D4EA] tracking-wide">
                Heart cross-section
              </span>
            </div>

          </div>

          {/* Accessible Control Pill: Rotate, Isolate, Reset (each with >=44px target) */}
          <div 
            role="toolbar" 
            aria-label="3D Model Viewer Controls"
            className="mt-4 bg-[rgba(10,36,74,0.90)] backdrop-blur-2xl border border-[rgba(190,225,255,0.25)] rounded-full px-4 py-1.5 flex items-center gap-2 shadow-2xl z-20"
          >
            {/* Rotate Button */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              aria-label={isRotating ? 'Pause continuous 3D rotation' : 'Start continuous 3D rotation'}
              aria-pressed={isRotating}
              className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                isRotating 
                  ? 'bg-[#08AFC1] text-[#040D21] font-bold shadow-[0_0_12px_rgba(8,175,193,0.5)]' 
                  : 'text-[#C4D4EA] hover:text-white hover:bg-white/10'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Rotate</span>
            </button>

            <span className="w-px h-4 bg-white/20" aria-hidden="true" />

            {/* Isolate Button */}
            <button
              onClick={() => setIsIsolated(!isIsolated)}
              aria-label={isIsolated ? 'Restore complete torso anatomy' : 'Isolate cardiac and mediastinal structures'}
              aria-pressed={isIsolated}
              className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                isIsolated 
                  ? 'bg-[#08AFC1] text-[#040D21] font-bold shadow-[0_0_12px_rgba(8,175,193,0.5)]' 
                  : 'text-[#C4D4EA] hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Isolate</span>
            </button>

            <span className="w-px h-4 bg-white/20" aria-hidden="true" />

            {/* Reset Button */}
            <button
              onClick={() => {
                setIsRotating(false);
                setIsIsolated(false);
                setRotationAngle(0);
              }}
              aria-label="Reset 3D view to default angle and zoom"
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-full flex items-center gap-1.5 text-xs text-[#C4D4EA] hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
