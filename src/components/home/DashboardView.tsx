import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  RotateCw,
  RotateCcw,
  Layers, 
  Stethoscope, 
  CheckSquare,
  BarChart3,
  FlaskConical
} from 'lucide-react';
import { NavigationView } from '../../types';
import { StorageService } from '../../services/storageService';

interface DashboardViewProps {
  onNavigate: (view: NavigationView) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenLesson }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Smooth continuous rotation loop when Rotate button is toggled
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  const phases = [
    { id: 'phase-1', label: 'Phase I', full: 'Phase 1: 1st & 2nd Year (Pre-clinical)' },
    { id: 'phase-2', label: 'Phase II', full: 'Phase 2: 3rd Year (Para-clinical)' },
    { id: 'phase-3', label: 'Phase III', full: 'Phase 3: 4th Year (Para-clinical)' },
    { id: 'phase-4', label: 'Phase IV', full: 'Phase 4: 5th Year (Clinical)' },
  ];

  const getSubjectCards = () => {
    if (activePhaseIndex === 0) {
      return [
        {
          id: 'anatomy',
          title: 'Anatomy',
          subtitle: 'Structure & relationships',
          image: '/anatomy/heart_preview.png',
          lessonId: 'cvs-anat-heart-morphology',
        },
        {
          id: 'physiology',
          title: 'Physiology',
          subtitle: 'Functions & mechanisms',
          isEcg: true,
          lessonId: 'cvs-physio-cardiac-cycle-wiggers',
        },
        {
          id: 'biochemistry',
          title: 'Biochemistry',
          subtitle: 'Molecules & pathways',
          image: '/anatomy/biochem_molecule.png',
          lessonId: 'cvs-biochem-cardiac-biomarkers',
        }
      ];
    } else if (activePhaseIndex === 1) {
      return [
        {
          id: 'pharmacology',
          title: 'Pharmacology',
          subtitle: 'Mechanisms & therapeutics',
          image: '/anatomy/biochem_molecule.png',
          lessonId: 'pharm-autonomic-drugs',
        },
        {
          id: 'forensic',
          title: 'Forensic Medicine',
          subtitle: 'Legal & toxicological aspects',
          image: '/anatomy/heart_preview.png',
          lessonId: 'forensic-asphyxia',
        }
      ];
    } else if (activePhaseIndex === 2) {
      return [
        {
          id: 'pathology',
          title: 'Pathology',
          subtitle: 'Disease processes & morphologic changes',
          image: '/anatomy/heart_preview.png',
          lessonId: 'path-myocardial-infarction',
        },
        {
          id: 'microbiology',
          title: 'Microbiology',
          subtitle: 'Pathogens & antimicrobial therapy',
          image: '/anatomy/biochem_molecule.png',
          lessonId: 'micro-bacterial-infections',
        },
        {
          id: 'community-medicine',
          title: 'Community Medicine',
          subtitle: 'Epidemiology & public health',
          image: '/anatomy/torso_hero.png',
          lessonId: 'com-epidemiology-bd',
        }
      ];
    } else {
      return [
        {
          id: 'medicine',
          title: 'Medicine & Allied',
          subtitle: 'Clinical diagnosis & management',
          image: '/anatomy/heart_preview.png',
          lessonId: 'med-heart-failure',
        },
        {
          id: 'surgery',
          title: 'Surgery & Allied',
          subtitle: 'Operative techniques & surgical pathology',
          image: '/anatomy/torso_hero.png',
          lessonId: 'surg-acute-abdomen',
        },
        {
          id: 'gynae',
          title: 'Obstetrics & Gynaecology',
          subtitle: 'Maternal-fetal & reproductive health',
          image: '/anatomy/biochem_molecule.png',
          lessonId: 'gynae-antenatal-care',
        }
      ];
    }
  };

  const subjectCards = getSubjectCards();

  const handleOpenSubject = (lessonId?: string) => {
    if (lessonId && onOpenLesson) {
      onOpenLesson(lessonId);
    } else {
      onNavigate('learn');
    }
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto space-y-6 sm:space-y-8 px-2 sm:px-6 relative select-none">
      
      {/* Dynamic Background Luminous Silk Waves matching concept image 1:1 */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Luminous cyan glow pool behind circular heart preview and torso */}
        <div 
          className="absolute top-2 right-[12%] w-[580px] h-[580px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, rgba(26, 110, 235, 0.28) 40%, transparent 75%)',
            filter: 'blur(65px)',
          }}
        />

        {/* Ambient royal blue glow pool behind hero headline */}
        <div 
          className="absolute top-[8%] left-[-2%] w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(26, 94, 204, 0.32) 0%, rgba(10, 40, 84, 0.25) 50%, transparent 80%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Fluid luminous silk wave ribbons */}
        <svg className="w-full h-full opacity-85 mix-blend-screen" viewBox="0 0 1440 900" fill="none">
          {/* Sweeping radiant turquoise/cyan ribbon */}
          <path 
            d="M -80 420 C 220 180, 520 540, 940 240 C 1140 100, 1340 320, 1580 180" 
            stroke="url(#silkCyanGlow)" 
            strokeWidth="160" 
            strokeLinecap="round" 
            filter="blur(50px)"
          />
          {/* Deep royal velvet blue wave */}
          <path 
            d="M 50 640 C 380 340, 700 700, 1100 360 C 1300 200, 1480 480, 1650 320" 
            stroke="url(#silkBlueGlow)" 
            strokeWidth="130" 
            strokeLinecap="round" 
            filter="blur(45px)"
          />
          {/* Ambient luminous wash under subject cards */}
          <path 
            d="M -50 820 C 350 720, 850 860, 1500 740" 
            stroke="url(#silkCyanBottom)" 
            strokeWidth="100" 
            strokeLinecap="round" 
            filter="blur(60px)"
          />
          <defs>
            <linearGradient id="silkCyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1046A0" stopOpacity="0.95"/>
              <stop offset="35%" stopColor="#1A6EEB" stopOpacity="0.9"/>
              <stop offset="75%" stopColor="#00E5FF" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#06172E" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="silkBlueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A5ECC" stopOpacity="0.85"/>
              <stop offset="50%" stopColor="#00D2EA" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#0A2854" stopOpacity="0.4"/>
            </linearGradient>
            <linearGradient id="silkCyanBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.45"/>
              <stop offset="50%" stopColor="#1748A0" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#06172E" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION Matching Concept Composition                             */}
      {/* ========================================================================= */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[440px] sm:min-h-[480px]">
        
        {/* Left Hero Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left z-10">
          {/* Kicker */}
          <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.20em] text-[#8eaecf] uppercase">
            YOUR MBBS LEARNING COMPANION
          </div>

          {/* Headline in Source Serif 4 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#F5F9FF] leading-[1.12] tracking-tight">
            Understand medicine.<br />
            One concept at a time.
          </h1>

          {/* Supporting Subtext */}
          <p className="text-sm sm:text-base lg:text-[16px] text-[#C4D4EA] max-w-lg leading-relaxed font-sans font-normal">
            Explore concepts. Connect clinical cases. Practise with purpose.
          </p>

          {/* CTAs matching concept */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
            {/* Primary CTA: "Explore subjects →" */}
            <button
              onClick={() => onNavigate('learn')}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#00c2db] to-[#08AFC1] hover:from-[#00e5ff] hover:to-[#00c2db] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_28px_rgba(0,229,255,0.50)] hover:shadow-[0_0_38px_rgba(0,229,255,0.70)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore subjects</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </button>

            {/* Secondary CTA: "Open visual lab" */}
            <button
              onClick={() => onNavigate('visual-lab')}
              className="px-6 py-3 rounded-xl bg-[rgba(18,55,99,0.35)] hover:bg-[rgba(18,55,99,0.55)] border border-[rgba(190,225,255,0.25)] hover:border-[rgba(190,225,255,0.45)] text-[#F5F9FF] font-semibold text-sm sm:text-base backdrop-blur-md flex items-center gap-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-[#00E5FF]" />
              <span>Open visual lab</span>
            </button>
          </div>

          {/* Editorial Tagline */}
          <div className="pt-2 text-xs text-[#7e9ec8] font-sans tracking-wide space-y-0.5">
            <p>Build knowledge today.</p>
            <p>For the doctors of tomorrow.</p>
          </div>
        </div>

        {/* Right Hero Column: Medical Anatomical Visualization Stage */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[390px] sm:min-h-[460px]">
          
          {/* Anatomical Torso Visual standing seamlessly in hero backdrop (NO black box!) */}
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center transition-transform duration-300"
            style={{
              transform: isIsolated 
                ? 'scale(1.12) translateY(10px)' 
                : `scale(1) rotateY(${rotationAngle}deg)`,
            }}
          >
            <img
              src="/anatomy/torso_hero.png"
              alt="Anatomical Male Upper Torso"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] pointer-events-none"
              loading="eager"
            />
          </div>

          {/* Connected Floating Circular Anatomy Preview & Controls matching concept */}
          <div className="absolute top-1 right-1 sm:top-3 sm:right-3 z-20 flex flex-col items-center">
            {/* Circular Preview Ring */}
            <div 
              onClick={() => onNavigate('visual-lab')}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[rgba(6,23,46,0.65)] border-2 border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.60)] backdrop-blur-xl p-1.5 flex items-center justify-center cursor-pointer hover:scale-105 transition-all group overflow-hidden"
              title="Inspect 3D Heart Anatomy"
            >
              <img
                src="/anatomy/heart_preview.png"
                alt="3D Heart Anatomy Preview"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform"
              />
            </div>

            {/* Label: Anatomy preview */}
            <span className="mt-1.5 text-[11px] font-sans font-medium text-[#C4D4EA] tracking-wide">
              Anatomy preview
            </span>

            {/* Glass Control Pill: [Rotate] | [Isolate] | [Reset] */}
            <div className="mt-2 bg-[rgba(10,36,74,0.85)] backdrop-blur-2xl border border-[rgba(190,225,255,0.25)] rounded-full px-3.5 py-1.5 flex items-center gap-3 shadow-xl">
              {/* Rotate button */}
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`flex items-center gap-1 text-[11px] transition-colors font-medium cursor-pointer ${
                  isRotating ? 'text-[#00E5FF] font-bold' : 'text-[#C4D4EA] hover:text-white'
                }`}
                title="Toggle 3D rotation"
              >
                <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin text-[#00E5FF]' : ''}`} />
                <span>Rotate</span>
              </button>

              <span className="w-px h-3 bg-white/20" />

              {/* Isolate button */}
              <button
                onClick={() => setIsIsolated(!isIsolated)}
                className={`flex items-center gap-1 text-[11px] transition-colors font-medium cursor-pointer ${
                  isIsolated ? 'text-[#00E5FF] font-bold' : 'text-[#C4D4EA] hover:text-white'
                }`}
                title="Isolate cardiac view"
              >
                <Layers className="w-3 h-3" />
                <span>Isolate</span>
              </button>

              <span className="w-px h-3 bg-white/20" />

              {/* Reset button */}
              <button
                onClick={() => {
                  setIsRotating(false);
                  setIsIsolated(false);
                  setRotationAngle(0);
                }}
                className="flex items-center gap-1 text-[11px] text-[#C4D4EA] hover:text-white transition-colors font-medium cursor-pointer"
                title="Reset view"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Illustrative Concept Disclaimer in corner */}
          <div className="absolute bottom-1 right-2 sm:right-5 text-[10px] font-sans text-[#7fa3d1]/70 italic pointer-events-none">
            Illustrative concept
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CURRICULUM PHASE SWITCHER TABS (Phase I – Phase IV)                    */}
      {/* ========================================================================= */}
      <section className="flex items-center justify-center pt-1">
        <div className="inline-flex items-center bg-[rgba(10,36,74,0.60)] backdrop-blur-2xl border border-[rgba(190,225,255,0.22)] border-t-[rgba(255,255,255,0.30)] rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-w-full overflow-x-auto">
          {phases.map((p, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <React.Fragment key={p.id}>
                {idx > 0 && !isActive && activePhaseIndex !== idx - 1 && (
                  <span className="w-px h-4 bg-white/20 mx-0.5 hidden sm:inline" />
                )}
                <button
                  onClick={() => {
                    setActivePhaseIndex(idx);
                    StorageService.setActivePhase(p.full);
                  }}
                  className={`px-6 sm:px-9 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00c2db] to-[#08AFC1] text-white font-bold shadow-[0_0_24px_rgba(0,229,255,0.55)]'
                      : 'text-[#C4D4EA] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC SUBJECT CARDS ROW (Phase Tailored) Matching Concept Cards       */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {subjectCards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleOpenSubject(card.lessonId)}
              className="group relative rounded-[22px] bg-[rgba(18,55,99,0.30)] hover:bg-[rgba(18,55,99,0.48)] border border-[rgba(190,225,255,0.20)] hover:border-[#00E5FF]/60 border-t-[rgba(255,255,255,0.32)] backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-between gap-5 overflow-hidden"
            >
              {/* Left: 3D Illustration / Glowing ECG Wave */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-transparent flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                {card.isEcg ? (
                  /* Glowing Neon Coral/Red ECG Waveform matching concept */
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg className="w-full h-16" viewBox="0 0 110 44" fill="none">
                      <path 
                        d="M 0 22 L 28 22 L 35 10 L 42 36 L 50 4 L 58 32 L 65 22 L 110 22" 
                        stroke="#f43f5e" 
                        strokeWidth="3.4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.95)) drop-shadow(0 0 18px rgba(244,63,94,0.65))'
                        }}
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] rounded-xl"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Middle: Subject Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F9FF] tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C4D4EA] font-normal leading-snug mt-1">
                  {card.subtitle}
                </p>
              </div>

              {/* Right: Circular Arrow Button matching concept */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00E5FF] group-hover:border-[#00E5FF] group-hover:text-[#06172E] transition-all shrink-0 shadow-sm">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION BAR (4 PILLARS) Matching Concept Bar                     */}
      {/* ========================================================================= */}
      <section className="rounded-2xl sm:rounded-3xl bg-[rgba(18,55,99,0.30)] border border-[rgba(190,225,255,0.20)] border-t-[rgba(255,255,255,0.30)] backdrop-blur-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(190,225,255,0.14)]">
          
          {/* Pillar 1: Learn a concept */}
          <button
            onClick={() => onNavigate('learn')}
            className="flex items-start gap-3.5 p-2 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center text-white shrink-0 group-hover:text-[#00E5FF] transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F9FF] group-hover:text-[#00E5FF] transition-colors">
                Learn a concept
              </h4>
              <p className="text-xs text-[#C4D4EA]/80 mt-0.5 font-normal">
                Build strong foundations
              </p>
            </div>
          </button>

          {/* Pillar 2: Explore a case */}
          <button
            onClick={() => onNavigate('cases')}
            className="flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2"
          >
            <div className="w-8 h-8 flex items-center justify-center text-white shrink-0 group-hover:text-[#00E5FF] transition-colors">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F9FF] group-hover:text-[#00E5FF] transition-colors">
                Explore a case
              </h4>
              <p className="text-xs text-[#C4D4EA]/80 mt-0.5 font-normal">
                See knowledge in context
              </p>
            </div>
          </button>

          {/* Pillar 3: Test your understanding */}
          <button
            onClick={() => onNavigate('practice')}
            className="flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2"
          >
            <div className="w-8 h-8 flex items-center justify-center text-white shrink-0 group-hover:text-[#00E5FF] transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F9FF] group-hover:text-[#00E5FF] transition-colors">
                Test your understanding
              </h4>
              <p className="text-xs text-[#C4D4EA]/80 mt-0.5 font-normal">
                Practise with purpose
              </p>
            </div>
          </button>

          {/* Pillar 4: Revise with purpose */}
          <button
            onClick={() => onNavigate('revision')}
            className="flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2"
          >
            <div className="w-8 h-8 flex items-center justify-center text-white shrink-0 group-hover:text-[#00E5FF] transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F9FF] group-hover:text-[#00E5FF] transition-colors">
                Revise with purpose
              </h4>
              <p className="text-xs text-[#C4D4EA]/80 mt-0.5 font-normal">
                Make it stick
              </p>
            </div>
          </button>
        </div>
      </section>

    </div>
  );
};
