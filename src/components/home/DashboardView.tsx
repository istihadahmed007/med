import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FlaskConical, 
  Sparkles, 
  Bookmark, 
  History, 
  Calendar,
  Layers,
  ChevronRight,
  UserCheck,
  LogIn,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { NavigationView } from '../../types';
import { StorageService } from '../../services/storageService';
import { 
  StudentProfile, 
  getStoredStudentProfile, 
  saveStoredStudentProfile,
  MOCK_CONTINUE_TOPIC,
  MOCK_RECOMMENDED_ACTIVITY,
  MOCK_SUBJECT_PROGRESS,
  MOCK_RECENT_ACTIVITY,
  MOCK_SAVED_ITEMS,
  MOCK_PHASE_EXPLANATIONS,
} from '../../data/dashboardMockData';

import { ProgressPanel } from '../dashboard/ProgressPanel';
import { ContinueLearningCard } from '../dashboard/ContinueLearningCard';
import { RecommendedActivity } from '../dashboard/RecommendedActivity';
import { SubjectProgressCard } from '../dashboard/SubjectProgressCard';
import { LearningLoop } from '../dashboard/LearningLoop';
import { AnatomyPreview } from '../dashboard/AnatomyPreview';
import { TrustFooter } from '../dashboard/TrustFooter';

interface DashboardViewProps {
  onNavigate: (view: NavigationView) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenLesson }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => getStoredStudentProfile());
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Sync profile changes to localStorage
  const handleToggleAuth = () => {
    const updated = { ...profile, isLoggedIn: !profile.isLoggedIn };
    setProfile(updated);
    saveStoredStudentProfile(updated);
  };

  const handleOpenSubject = (lessonId?: string) => {
    if (lessonId && onOpenLesson) {
      onOpenLesson(lessonId);
    } else {
      onNavigate('learn');
    }
  };

  const activePhase = MOCK_PHASE_EXPLANATIONS[activePhaseIndex] || MOCK_PHASE_EXPLANATIONS[0];
  const filteredSubjectCards = MOCK_SUBJECT_PROGRESS.filter(c => c.phaseIndex === activePhaseIndex);

  return (
    <div className="w-full max-w-[1360px] mx-auto space-y-8 sm:space-y-10 px-2 sm:px-6 relative select-none">
      
      {/* Ambient Lighting Depth */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute top-0 right-[10%] w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(8, 175, 193, 0.20) 0%, rgba(23, 72, 160, 0.14) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23, 72, 160, 0.18) 0%, rgba(10, 40, 84, 0.12) 50%, transparent 80%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HERO / PROGRESS SECTION: SIGNED-IN vs SIGNED-OUT                   */}
      {/* ========================================================================= */}
      {profile.isLoggedIn ? (
        /* ---------------- SIGNED-IN STATE ---------------- */
        <div className="space-y-6 animate-fadeIn">
          {/* 1a. Personalized Welcome & Goal Panel */}
          <ProgressPanel 
            profile={profile}
            onToggleAuthState={handleToggleAuth}
            onViewStudyPlan={() => onNavigate('learn')}
          />

          {/* 1b. Dominant Primary Call-to-Action Card */}
          <ContinueLearningCard
            topic={MOCK_CONTINUE_TOPIC}
            onContinue={() => handleOpenSubject(MOCK_CONTINUE_TOPIC.lessonId)}
            onViewStudyPlan={() => onNavigate('learn')}
          />

          {/* 1c. Recommended Next Activity Callout */}
          <RecommendedActivity 
            activity={MOCK_RECOMMENDED_ACTIVITY}
            onStartActivity={() => {
              if (MOCK_RECOMMENDED_ACTIVITY.targetLessonId && onOpenLesson) {
                onOpenLesson(MOCK_RECOMMENDED_ACTIVITY.targetLessonId);
              } else {
                onNavigate(MOCK_RECOMMENDED_ACTIVITY.targetView);
              }
            }}
          />
        </div>
      ) : (
        /* ---------------- SIGNED-OUT STATE ---------------- */
        <div className="space-y-6 animate-fadeIn">
          {/* Sign in Prompt Banner */}
          <div className="rounded-2xl bg-[rgba(10,36,74,0.60)] border border-[#08AFC1]/40 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#08AFC1]/20 border border-[#08AFC1]/40 flex items-center justify-center text-[#08AFC1] shrink-0">
                <LogIn className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#F5F9FF]">
                  Sign in to track your MBBS progress & study streak
                </h2>
                <p className="text-xs text-[#C4D4EA]">
                  Save completed lessons, track weekly hours, and receive personalized cardiovascular recommendations.
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleAuth}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,175,193,0.4)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              aria-label="Sign in as student"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign in as Dr. Ayesha</span>
            </button>
          </div>

          {/* Refined Marketing Hero for Signed-out Users */}
          <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[460px]">
            <div className="lg:col-span-6 space-y-5 text-left z-10">
              <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.18em] text-[#8eaecf] uppercase">
                YOUR MBBS LEARNING COMPANION
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#F5F9FF] leading-[1.12] tracking-tight">
                Understand medicine.<br />
                One concept at a time.
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-[#C4D4EA] max-w-lg leading-relaxed font-sans font-normal">
                Explore interactive concepts. Connect clinical cases. Practise with purpose for Bangladesh MBBS examinations.
              </p>

              {/* Dominant Signed-Out CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {/* Primary CTA: "Start learning" (filled) */}
                <button
                  onClick={() => onNavigate('learn')}
                  className="min-h-[46px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-white font-bold text-base flex items-center gap-2.5 shadow-[0_0_28px_rgba(8,175,193,0.5)] hover:shadow-[0_0_38px_rgba(8,175,193,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Start learning"
                >
                  <span>Start learning</span>
                  <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                </button>

                {/* Secondary CTA: "Explore visual lab" (outlined) */}
                <button
                  onClick={() => onNavigate('visual-lab')}
                  className="min-h-[46px] px-6 py-3.5 rounded-xl bg-[rgba(18,55,99,0.30)] hover:bg-[rgba(18,55,99,0.55)] border border-[rgba(190,225,255,0.25)] hover:border-[rgba(190,225,255,0.45)] text-[#F5F9FF] font-semibold text-sm sm:text-base backdrop-blur-md flex items-center gap-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                >
                  <FlaskConical className="w-4 h-4 text-[#08AFC1]" />
                  <span>Explore visual lab</span>
                </button>
              </div>

              <div className="pt-2 text-xs text-[#7e9ec8] font-sans tracking-wide space-y-0.5">
                <p>Build knowledge today.</p>
                <p>For the doctors of tomorrow.</p>
              </div>
            </div>

            {/* Right: Anatomical Hero Display */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px]">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                <img
                  src="/anatomy/torso_hero.png"
                  alt="Anatomical Upper Torso"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
                  loading="eager"
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CURRICULUM PHASE SELECTOR & EXPLANATION                                */}
      {/* ========================================================================= */}
      <section 
        aria-label="Curriculum Learning Pathway"
        className="space-y-4 pt-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <div className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#08AFC1] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              LEARNING PATHWAY
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F9FF] mt-0.5">
              Select your learning phase
            </h2>
          </div>

          <span className="text-xs text-[#8eaecf] font-sans">
            Aligned with Bangladesh Medical & Dental Council (BMDC) Syllabus
          </span>
        </div>

        {/* Phase Tabs with Accessible Pill Group */}
        <div className="flex items-center justify-center">
          <div 
            role="tablist" 
            aria-label="Curriculum Phases"
            className="inline-flex items-center bg-[rgba(10,36,74,0.60)] backdrop-blur-2xl border border-[rgba(190,225,255,0.22)] border-t-[rgba(255,255,255,0.30)] rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-w-full overflow-x-auto"
          >
            {MOCK_PHASE_EXPLANATIONS.map((p, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${p.id}`}
                  onClick={() => {
                    setActivePhaseIndex(idx);
                    StorageService.setActivePhase(p.curriculumYear);
                  }}
                  className={`min-h-[44px] px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive
                      ? 'bg-gradient-to-r from-[#08AFC1] to-[#0694a2] text-white font-bold shadow-[0_0_22px_rgba(8,175,193,0.50)]'
                      : 'text-[#C4D4EA] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{p.label}</span>
                  <span className="hidden md:inline text-[11px] opacity-80 font-normal ml-1.5">
                    ({p.curriculumYear.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Phase Context Explainer Card */}
        <div 
          id={`panel-${activePhase.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activePhase.id}`}
          className="rounded-2xl bg-[rgba(6,23,46,0.60)] border border-[rgba(190,225,255,0.15)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#F5F9FF] text-sm">
                {activePhase.label}: {activePhase.curriculumYear}
              </span>
              <span className="text-[#08AFC1] font-mono font-medium">
                • {activePhase.category}
              </span>
            </div>
            <p className="text-[#C4D4EA] leading-relaxed max-w-3xl">
              {activePhase.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {activePhase.subjects.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#8eaecf] font-mono text-[11px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC SUBJECT PROGRESS CARDS ROW                                     */}
      {/* ========================================================================= */}
      <section 
        aria-label="Subjects with Progress"
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-serif font-bold text-[#F5F9FF]">
            {activePhase.label} Core Subjects
          </h3>
          <button 
            onClick={() => onNavigate('learn')}
            className="text-xs text-[#08AFC1] hover:text-white flex items-center gap-1 font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#08AFC1]"
          >
            <span>View curriculum catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredSubjectCards.map((card) => (
            <SubjectProgressCard
              key={card.id}
              card={card}
              onOpenSubject={handleOpenSubject}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LEARNING LOOP: Learn -> Apply -> Test -> Revise                        */}
      {/* ========================================================================= */}
      <LearningLoop onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 5. 3D VISUAL ANATOMY FEATURE                                              */}
      {/* ========================================================================= */}
      <AnatomyPreview onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 6. RECENT ACTIVITY & SAVED REVISION ITEMS                                 */}
      {/* ========================================================================= */}
      <section 
        aria-label="Recent Study Activity and Saved Notes"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2"
      >
        {/* Left Column: Recent Activity */}
        <div className="lg:col-span-7 rounded-[24px] bg-[rgba(10,36,74,0.40)] border border-[rgba(190,225,255,0.18)] backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#08AFC1]" />
              <h3 className="text-base font-bold text-[#F5F9FF]">
                Recent Study Activity
              </h3>
            </div>
            <button 
              onClick={() => onNavigate('progress')}
              className="text-xs text-[#08AFC1] hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>Activity log</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-white/5 space-y-2">
            {MOCK_RECENT_ACTIVITY.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  if (item.lessonId && onOpenLesson) {
                    onOpenLesson(item.lessonId);
                  } else {
                    onNavigate(item.targetView);
                  }
                }}
                className="pt-2.5 pb-1 flex items-center justify-between gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#8eaecf] flex items-center gap-2">
                    <span>{item.subject}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">{item.scoreOrStatus}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Saved Items / Quick Reference */}
        <div className="lg:col-span-5 rounded-[24px] bg-[rgba(10,36,74,0.40)] border border-[rgba(190,225,255,0.18)] backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#08AFC1]" />
              <h3 className="text-base font-bold text-[#F5F9FF]">
                Saved Items & High Yield Cards
              </h3>
            </div>
            <button 
              onClick={() => onNavigate('revision')}
              className="text-xs text-[#08AFC1] hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>View all</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_SAVED_ITEMS.map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigate(item.view)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#08AFC1]/40 flex items-center justify-between gap-3 transition-all cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-[#8eaecf] mt-0.5">
                    {item.subject}
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-[#08AFC1]/15 text-[#08AFC1] text-[10px] font-mono shrink-0">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRUST AND EDUCATIONAL CONTEXT FOOTER                                   */}
      {/* ========================================================================= */}
      <TrustFooter onNavigate={onNavigate} />

    </div>
  );
};
