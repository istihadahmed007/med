import React from 'react';
import { 
  Play, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Calendar,
  Sparkles,
  Layers
} from 'lucide-react';
import { ContinueTopic } from '../../data/dashboardMockData';

interface ContinueLearningCardProps {
  topic: ContinueTopic;
  onContinue: () => void;
  onViewStudyPlan: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  topic,
  onContinue,
  onViewStudyPlan,
}) => {
  return (
    <section 
      aria-label="Current Lesson to Continue"
      className="relative rounded-[26px] bg-gradient-to-br from-[rgba(18,55,99,0.50)] via-[rgba(10,36,74,0.40)] to-[rgba(6,23,46,0.60)] border-2 border-[#08AFC1]/40 border-t-[#08AFC1]/70 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden transition-all"
    >
      {/* Dynamic ambient cyan glow for primary dominance */}
      <div 
        className="absolute -top-16 -left-16 w-80 h-80 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(8, 175, 193, 0.25) 0%, rgba(23, 72, 160, 0.12) 50%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Visual Media & Current Progress Indicator */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="relative w-full max-w-[240px] aspect-square rounded-2xl bg-[rgba(6,23,46,0.70)] border border-[rgba(190,225,255,0.25)] p-4 flex flex-col items-center justify-center group overflow-hidden shadow-inner">
            <img 
              src={topic.thumbnail} 
              alt={topic.title} 
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />

            {/* In-card pill badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-[rgba(10,36,74,0.90)] backdrop-blur-md rounded-xl py-1.5 px-2.5 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#8eaecf] font-mono text-[11px] font-medium">{topic.subject}</span>
              <span className="text-[#08AFC1] font-mono font-bold">{topic.progressPercent}% Done</span>
            </div>
          </div>
        </div>

        {/* Right Column: Next Best Step Information & Dominant CTA */}
        <div className="lg:col-span-8 space-y-4 text-left">
          
          {/* Section Kicker */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#08AFC1] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CURRENT RECOMMENDATION • {topic.system}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-xs text-[#8eaecf] font-medium">{topic.phaseLabel}</span>
          </div>

          {/* Lesson Title in Source Serif 4 */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#F5F9FF] leading-[1.2] tracking-tight">
              {topic.title}
            </h2>
            <p className="text-sm sm:text-base text-[#C4D4EA] font-sans font-normal mt-2 leading-relaxed max-w-2xl">
              {topic.summary}
            </p>
          </div>

          {/* Progress Bar & Time Metrics */}
          <div className="space-y-2 py-1 max-w-xl">
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#C4D4EA]">
              <span className="flex items-center gap-1.5 text-[#08AFC1] font-semibold">
                <Clock className="w-4 h-4" />
                <span>{topic.timeRemainingMinutes} minutes remaining</span>
              </span>
              <span className="font-mono text-slate-300">
                {topic.progressPercent}% of module completed
              </span>
            </div>

            {/* Custom high-contrast progress track */}
            <div className="w-full bg-slate-900/90 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-[#08AFC1] via-[#06b6d4] to-[#10b981] h-2.5 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(8,175,193,0.7)]"
                style={{ width: `${topic.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Primary Dominant CTA & Secondary CTA */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {/* Primary Filled CTA: Continue learning */}
            <button
              onClick={onContinue}
              className="min-h-[46px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#08AFC1] to-[#0694a2] hover:from-[#09c2d6] hover:to-[#08AFC1] text-[#040D21] font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(8,175,193,0.55)] hover:shadow-[0_0_40px_rgba(8,175,193,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#040D21]"
              aria-label={`Continue learning: ${topic.title}`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Continue learning</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Quieter Outlined CTA: View study plan */}
            <button
              onClick={onViewStudyPlan}
              className="min-h-[46px] px-6 py-3.5 rounded-xl bg-[rgba(18,55,99,0.30)] hover:bg-[rgba(18,55,99,0.55)] border border-[rgba(190,225,255,0.28)] hover:border-[rgba(190,225,255,0.50)] text-[#F5F9FF] font-semibold text-sm sm:text-base backdrop-blur-md flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <Calendar className="w-4 h-4 text-[#08AFC1]" />
              <span>View study plan</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
