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
  FlaskConical,
  Clock,
  Play,
  Bookmark,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { NavigationView } from '../../types';
import { StorageService } from '../../services/storageService';
import { StudyService } from '../../services/studyService';
import { StudyReadingProgress } from '../../types/study';
import { getTopicById } from '../../data/studyMaterialsData';

interface DashboardViewProps {
  onNavigate: (view: NavigationView) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenLesson }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [torsoLoaded, setTorsoLoaded] = useState<boolean>(false);
  const [torsoError, setTorsoError] = useState<boolean>(false);

  // Real progress from StudyService (no fake data)
  const [continueReading, setContinueReading] = useState<StudyReadingProgress | null>(null);
  const [recentlyRead, setRecentlyRead] = useState<StudyReadingProgress[]>([]);

  useEffect(() => {
    try {
      const cont = StudyService.getContinueReading();
      setContinueReading(cont);
      const recent = StudyService.getRecentlyRead(3);
      setRecentlyRead(recent);
    } catch {
      setContinueReading(null);
      setRecentlyRead([]);
    }
  }, []);

  // Smooth continuous rotation loop when Rotate button is toggled
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  const phases = [
    { 
      id: 'phase-1', 
      label: 'Phase I', 
      full: 'Phase 1: 1st & 2nd Year (Pre-clinical)',
      years: '1st & 2nd Year MBBS',
      subjectsSummary: 'Anatomy, Physiology, Biochemistry',
      description: 'Pre-clinical foundation in gross anatomy, physiology mechanisms, and biochemistry for the 1st Professional MBBS Exam.'
    },
    { 
      id: 'phase-2', 
      label: 'Phase II', 
      full: 'Phase 2: 3rd Year (Para-clinical)',
      years: '3rd Year MBBS',
      subjectsSummary: 'Pharmacology & Forensic Medicine',
      description: 'Para-clinical diagnostics, drug therapeutics, toxicology, and legal medicine for the 2nd Professional MBBS Exam.'
    },
    { 
      id: 'phase-3', 
      label: 'Phase III', 
      full: 'Phase 3: 4th Year (Para-clinical)',
      years: '4th Year MBBS',
      subjectsSummary: 'Pathology, Microbiology, Community Medicine',
      description: 'Disease mechanisms, infectious pathogens, epidemiology, and public health in Bangladesh for the 3rd Professional MBBS Exam.'
    },
    { 
      id: 'phase-4', 
      label: 'Phase IV', 
      full: 'Phase 4: 5th Year (Clinical)',
      years: '5th Year MBBS (Final Year)',
      subjectsSummary: 'Medicine, Surgery, Obstetrics & Gynaecology',
      description: 'Bedside diagnosis, acute clinical management, and operative procedures for the Final Professional MBBS Examination.'
    },
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
  const currentPhase = phases[activePhaseIndex] || phases[0];

  const handleOpenSubject = (lessonId?: string) => {
    if (lessonId && onOpenLesson) {
      onOpenLesson(lessonId);
    } else {
      onNavigate('learn');
    }
  };

  const handleResumeReading = (item: StudyReadingProgress) => {
    const topicData = getTopicById(item.topicId);
    if (topicData) {
      window.location.hash = `#study-materials/${topicData.subject.slug}/${topicData.topic.slug}`;
    } else {
      window.location.hash = `#study-materials/${item.topicId}`;
    }
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto space-y-8 sm:space-y-10 px-3 sm:px-6 relative select-none">
      
      {/* Ambient Radial Lighting for Depth */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Radial ambient glow behind circular heart preview and torso */}
        <div 
          className="absolute top-0 right-[10%] w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(8, 175, 193, 0.22) 0%, rgba(23, 72, 160, 0.16) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Ambient deep royal blue glow behind hero copy */}
        <div 
          className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23, 72, 160, 0.20) 0%, rgba(10, 40, 84, 0.15) 50%, transparent 80%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Preserving Visual Identity, Real Resume CTA if active)  */}
      {/* ========================================================================= */}
      <section 
        aria-label="Medical Learning Overview"
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[460px] sm:min-h-[500px]"
      >
        
        {/* Left Hero Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left z-10">
          
          {/* Real Lesson Resume Banner (Displayed ONLY when real unfinished study exists) */}
          {continueReading && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(8,175,193,0.15)] border border-[#08AFC1]/40 text-xs text-[#F5F9FF] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#08AFC1] animate-pulse" />
              <span className="font-semibold text-[#08AFC1]">Resume study:</span>
              <span className="truncate max-w-[240px] text-[#C4D4EA] font-medium">{continueReading.title}</span>
              <span className="text-xs font-mono text-[#8EACCF]">({continueReading.scrollPercentage}%)</span>
            </div>
          )}

          {/* Kicker */}
          <div className="text-xs font-mono font-bold tracking-[0.16em] text-[#8EACCF] uppercase">
            YOUR MBBS LEARNING COMPANION
          </div>

          {/* Headline in Source Serif 4 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#F5F9FF] leading-[1.12] tracking-tight">
            Understand medicine.<br />
            One concept at a time.
          </h1>

          {/* Supporting Subtext (>= 16px body) */}
          <p className="text-base lg:text-[17px] text-[#C4D4EA] max-w-lg leading-relaxed font-sans font-normal">
            Explore concepts. Connect clinical cases. Practise with purpose.
          </p>

          {/* CTAs with clear primary hierarchy */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
            {continueReading ? (
              /* Real Resume Primary CTA */
              <button
                onClick={() => handleResumeReading(continueReading)}
                className="min-h-[46px] px-7 py-3 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(8,175,193,0.45)] hover:shadow-[0_0_35px_rgba(8,175,193,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Continue reading: ${continueReading.title}`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continue learning</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              /* Default Primary CTA: "Explore subjects →" */
              <button
                onClick={() => onNavigate('learn')}
                className="min-h-[46px] px-7 py-3 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(8,175,193,0.45)] hover:shadow-[0_0_35px_rgba(8,175,193,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Explore curriculum subjects"
              >
                <span>Explore subjects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            {/* Secondary CTA: "Open visual lab" */}
            <button
              onClick={() => onNavigate('visual-lab')}
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[rgba(18,55,99,0.35)] hover:bg-[rgba(18,55,99,0.55)] border border-[rgba(190,225,255,0.25)] hover:border-[rgba(190,225,255,0.45)] text-[#F5F9FF] font-semibold text-sm sm:text-base backdrop-blur-md flex items-center gap-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              aria-label="Open 3D Visual Lab"
            >
              <FlaskConical className="w-4 h-4 text-[#08AFC1]" />
              <span>Open visual lab</span>
            </button>
          </div>

          {/* Editorial Tagline */}
          <div className="pt-2 text-xs sm:text-sm text-[#8EACCF] font-sans tracking-wide space-y-0.5">
            <p>Build knowledge today.</p>
            <p>For the doctors of tomorrow.</p>
          </div>
        </div>

        {/* Right Hero Column: Medical Anatomical Visualization Stage */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[480px]">
          
          {/* Anatomical Torso Visual */}
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[470px] aspect-square flex items-center justify-center transition-transform duration-300"
            style={{
              transform: isIsolated 
                ? 'scale(1.12) translateY(10px)' 
                : `scale(1) rotateY(${rotationAngle}deg)`,
            }}
          >
            {/* Loading state before image renders */}
            {!torsoLoaded && !torsoError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#08AFC1] border-t-transparent animate-spin" />
              </div>
            )}

            <img
              src="/anatomy/torso_hero.png"
              alt="Anatomical Male Upper Torso with Musculoskeletal and Visceral Structures"
              onLoad={() => setTorsoLoaded(true)}
              onError={() => {
                setTorsoError(true);
                setTorsoLoaded(true);
              }}
              className={`w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] pointer-events-none transition-opacity duration-300 ${
                torsoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
            />
          </div>

          {/* Connected Floating Circular Anatomy Preview & Controls */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col items-center">
            {/* Circular Preview Ring */}
            <button 
              onClick={() => onNavigate('visual-lab')}
              aria-label="Inspect 3D Heart Anatomy in Visual Lab"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[rgba(6,23,46,0.60)] border-2 border-[#08AFC1] shadow-[0_0_28px_rgba(8,175,193,0.50)] backdrop-blur-xl p-1.5 flex items-center justify-center cursor-pointer hover:scale-105 transition-all group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <img
                src="/anatomy/heart_preview.png"
                alt="3D Heart Anatomy Preview"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform"
                loading="lazy"
              />
            </button>

            {/* Label: Anatomy preview */}
            <span className="mt-1.5 text-xs font-sans font-medium text-[#C4D4EA] tracking-wide">
              Anatomy preview
            </span>

            {/* Glass Control Pill: [Rotate] | [Isolate] | [Reset] with >=44px touch targets */}
            <div 
              role="toolbar"
              aria-label="3D Anatomical Controls"
              className="mt-2 bg-[rgba(10,36,74,0.85)] backdrop-blur-2xl border border-[rgba(190,225,255,0.25)] rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1.5 sm:gap-2 shadow-xl"
            >
              {/* Rotate button */}
              <button
                onClick={() => setIsRotating(!isRotating)}
                aria-label={isRotating ? 'Pause 3D rotation' : 'Rotate 3D anatomical view'}
                aria-pressed={isRotating}
                className={`min-h-[44px] px-3 rounded-full flex items-center gap-1 text-xs transition-colors font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                  isRotating ? 'text-[#08AFC1] font-bold' : 'text-[#C4D4EA] hover:text-white'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin text-[#08AFC1]' : ''}`} aria-hidden="true" />
                <span>Rotate</span>
              </button>

              <span className="w-px h-4 bg-white/20" aria-hidden="true" />

              {/* Isolate button */}
              <button
                onClick={() => setIsIsolated(!isIsolated)}
                aria-label={isIsolated ? 'Restore complete view' : 'Isolate cardiac view'}
                aria-pressed={isIsolated}
                className={`min-h-[44px] px-3 rounded-full flex items-center gap-1 text-xs transition-colors font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                  isIsolated ? 'text-[#08AFC1] font-bold' : 'text-[#C4D4EA] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Isolate</span>
              </button>

              <span className="w-px h-4 bg-white/20" aria-hidden="true" />

              {/* Reset button */}
              <button
                onClick={() => {
                  setIsRotating(false);
                  setIsIsolated(false);
                  setRotationAngle(0);
                }}
                aria-label="Reset 3D view"
                className="min-h-[44px] px-3 rounded-full flex items-center gap-1 text-xs text-[#C4D4EA] hover:text-white transition-colors font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Illustrative Concept Disclaimer in corner */}
          <div className="absolute bottom-1 right-3 sm:right-6 text-xs font-sans text-[#7fa3d1]/80 italic pointer-events-none">
            Illustrative concept
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CURRICULUM PHASE SWITCHER TABS (Phase I – Phase IV with explainer)     */}
      {/* ========================================================================= */}
      <section 
        aria-label="Curriculum Learning Pathway"
        className="space-y-4 pt-1"
      >
        <div className="text-center space-y-1.5">
          <div className="text-xs font-mono uppercase tracking-widest text-[#08AFC1] font-semibold">
            LEARNING PATHWAY
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F9FF]">
            Select your learning phase
          </h2>
        </div>

        {/* Phase Tabs */}
        <div className="flex items-center justify-center">
          <div 
            role="tablist"
            aria-label="Curriculum Phase Selection"
            className="inline-flex items-center bg-[rgba(10,36,74,0.60)] backdrop-blur-2xl border border-[rgba(190,225,255,0.22)] border-t-[rgba(255,255,255,0.30)] rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-w-full overflow-x-auto"
          >
            {phases.map((p, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <React.Fragment key={p.id}>
                  {idx > 0 && !isActive && activePhaseIndex !== idx - 1 && (
                    <span className="w-px h-4 bg-white/15 mx-0.5 hidden sm:inline" aria-hidden="true" />
                  )}
                  <button
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${p.id}`}
                    onClick={() => {
                      setActivePhaseIndex(idx);
                      StorageService.setActivePhase(p.full);
                    }}
                    className={`min-h-[44px] px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? 'bg-gradient-to-r from-[#08AFC1] to-[#0694a2] text-white font-bold shadow-[0_0_22px_rgba(8,175,193,0.50)]'
                        : 'text-[#C4D4EA] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="hidden md:inline text-xs opacity-80 font-normal ml-1.5">
                      ({p.years.split(' ')[0]})
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Phase Curriculum Detail Explainer Card */}
        <div 
          id={`panel-${currentPhase.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentPhase.id}`}
          className="rounded-2xl bg-[rgba(6,23,46,0.60)] border border-[rgba(190,225,255,0.15)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm"
        >
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#F5F9FF] text-base">
                {currentPhase.label}: {currentPhase.years}
              </span>
              <span className="text-[#08AFC1] font-mono font-medium text-xs sm:text-sm">
                • {currentPhase.subjectsSummary}
              </span>
            </div>
            <p className="text-[#C4D4EA] leading-relaxed max-w-2xl text-sm sm:text-base">
              {currentPhase.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate('learn')}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#08AFC1] hover:text-white border border-white/10 font-semibold text-xs sm:text-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] transition-colors"
          >
            <span>Curriculum Topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC SUBJECT CARDS ROW (Phase Tailored, Original Visuals)            */}
      {/* ========================================================================= */}
      <section 
        aria-label="Phase Core Subjects"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {subjectCards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleOpenSubject(card.lessonId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenSubject(card.lessonId);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Explore ${card.title}: ${card.subtitle}`}
              className="group relative rounded-[22px] bg-[rgba(18,55,99,0.32)] hover:bg-[rgba(18,55,99,0.48)] border border-[rgba(190,225,255,0.20)] hover:border-[#08AFC1]/60 border-t-[rgba(255,255,255,0.32)] backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-between gap-5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              {/* Left: 3D Illustration / Glowing ECG Wave */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-transparent flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                {card.isEcg ? (
                  /* Glowing Neon Coral/Red ECG Waveform matching concept */
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg className="w-full h-16" viewBox="0 0 110 44" fill="none" aria-hidden="true">
                      <path 
                        d="M 0 22 L 28 22 L 35 10 L 42 36 L 50 4 L 58 32 L 65 22 L 110 22" 
                        stroke="#f43f5e" 
                        strokeWidth="3.2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.95)) drop-shadow(0 0 18px rgba(244,63,94,0.60))'
                        }}
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] rounded-xl"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Middle: Subject Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F9FF] tracking-tight group-hover:text-[#08AFC1] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#C4D4EA] font-normal leading-relaxed mt-1">
                  {card.subtitle}
                </p>
                <div className="mt-2.5 text-xs font-semibold text-[#08AFC1] flex items-center gap-1">
                  <span>Explore subject</span>
                </div>
              </div>

              {/* Right: Circular Arrow Button matching concept (>=44px touch target) */}
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#08AFC1] group-hover:border-[#08AFC1] group-hover:text-[#06172E] transition-all shrink-0 shadow-sm">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 stroke-[2.5]" aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION BAR (4 PILLARS) Matching Original Conception             */}
      {/* ========================================================================= */}
      <section 
        aria-label="Learning Modes"
        className="rounded-2xl sm:rounded-3xl bg-[rgba(18,55,99,0.30)] border border-[rgba(190,225,255,0.20)] border-t-[rgba(255,255,255,0.30)] backdrop-blur-2xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(190,225,255,0.14)]">
          
          {/* Pillar 1: Learn a concept */}
          <button
            onClick={() => onNavigate('learn')}
            aria-label="Learn a concept: Build strong foundations"
            className="min-h-[48px] flex items-start gap-3.5 p-2 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <div className="w-9 h-9 flex items-center justify-center text-white shrink-0 group-hover:text-[#08AFC1] transition-colors">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors">
                Learn a concept
              </h4>
              <p className="text-xs sm:text-sm text-[#C4D4EA] mt-0.5 font-normal leading-snug">
                Build strong foundations
              </p>
            </div>
          </button>

          {/* Pillar 2: Explore a case */}
          <button
            onClick={() => onNavigate('cases')}
            aria-label="Explore a case: See knowledge in context"
            className="min-h-[48px] flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <div className="w-9 h-9 flex items-center justify-center text-white shrink-0 group-hover:text-[#08AFC1] transition-colors">
              <Stethoscope className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors">
                Explore a case
              </h4>
              <p className="text-xs sm:text-sm text-[#C4D4EA] mt-0.5 font-normal leading-snug">
                See knowledge in context
              </p>
            </div>
          </button>

          {/* Pillar 3: Test your understanding */}
          <button
            onClick={() => onNavigate('practice')}
            aria-label="Test your understanding: Practise with purpose"
            className="min-h-[48px] flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <div className="w-9 h-9 flex items-center justify-center text-white shrink-0 group-hover:text-[#08AFC1] transition-colors">
              <CheckSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors">
                Test your understanding
              </h4>
              <p className="text-xs sm:text-sm text-[#C4D4EA] mt-0.5 font-normal leading-snug">
                Practise with purpose
              </p>
            </div>
          </button>

          {/* Pillar 4: Revise with purpose */}
          <button
            onClick={() => onNavigate('revision')}
            aria-label="Revise with purpose: Make it stick"
            className="min-h-[48px] flex items-start gap-3.5 p-2 sm:pl-6 rounded-xl text-left hover:bg-white/5 transition-colors group cursor-pointer pt-3 sm:pt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          >
            <div className="w-9 h-9 flex items-center justify-center text-white shrink-0 group-hover:text-[#08AFC1] transition-colors">
              <BarChart3 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors">
                Revise with purpose
              </h4>
              <p className="text-xs sm:text-sm text-[#C4D4EA] mt-0.5 font-normal leading-snug">
                Make it stick
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RECENT STUDY ACTIVITY (Displayed only when real history exists)         */}
      {/* ========================================================================= */}
      {recentlyRead.length > 0 && (
        <section 
          aria-label="Recent Real Study Activity"
          className="rounded-2xl bg-[rgba(10,36,74,0.40)] border border-[rgba(190,225,255,0.15)] p-5 sm:p-6 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-bold font-heading text-[#F5F9FF]">
              <Clock className="w-4 h-4 text-[#08AFC1]" />
              <span>Recent Reading Activity</span>
            </div>
            <button
              onClick={() => onNavigate('study-materials')}
              className="text-xs sm:text-sm text-[#08AFC1] hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View all study materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {recentlyRead.map((item) => (
              <div
                key={item.topicId}
                onClick={() => handleResumeReading(item)}
                className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#08AFC1]/40 transition-all cursor-pointer group"
              >
                <div className="text-sm font-semibold text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors truncate">
                  {item.title}
                </div>
                <div className="flex items-center justify-between mt-1.5 text-xs text-[#8EACCF]">
                  <span>{item.scrollPercentage}% read</span>
                  <span className="text-xs text-[#08AFC1] font-medium">Resume →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. EDUCATIONAL CONTEXT & DISCLAIMER FOOTER                                */}
      {/* ========================================================================= */}
      <footer 
        aria-label="Educational Disclaimer and Information"
        className="mt-12 pt-6 pb-14 border-t border-[rgba(190,225,255,0.12)] text-xs text-[#8EACCF] space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#08AFC1] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Designed for <strong>Bangladesh MBBS students</strong> across 1st to 5th Year. Aligned with national medical curriculum guidelines and BMDC professional examination standards.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Educational simulation companion for medical students. Content is intended strictly for academic learning and does not constitute clinical patient treatment advice.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8EACCF]">
          <div className="flex items-center gap-3">
            <span>MEDX Bangladesh</span>
            <span>•</span>
            <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors cursor-pointer min-h-[32px] inline-flex items-center">Curriculum</button>
            <span>•</span>
            <button onClick={() => onNavigate('drug-reference')} className="hover:text-white transition-colors cursor-pointer min-h-[32px] inline-flex items-center">Drugs</button>
            <span>•</span>
            <button onClick={() => onNavigate('textbook-library')} className="hover:text-white transition-colors cursor-pointer min-h-[32px] inline-flex items-center">Textbooks</button>
          </div>
          <div>
            © {new Date().getFullYear()} MEDX • All rights reserved
          </div>
        </div>
      </footer>

    </div>
  );
};
