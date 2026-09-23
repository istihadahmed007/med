import React from 'react';
import { ArrowRight, Clock, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { SubjectProgressItem } from '../../data/dashboardMockData';

interface SubjectProgressCardProps {
  card: SubjectProgressItem;
  onOpenSubject: (lessonId: string) => void;
}

export const SubjectProgressCard: React.FC<SubjectProgressCardProps> = ({
  card,
  onOpenSubject,
}) => {
  return (
    <div
      onClick={() => onOpenSubject(card.lessonId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenSubject(card.lessonId);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${card.title}: ${card.progressPercent}% complete. Next topic: ${card.nextTopic}, ${card.durationMinutes} minutes.`}
      className={`group relative rounded-[24px] backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040D21] ${
        card.isRecommended
          ? 'bg-gradient-to-br from-[rgba(18,55,99,0.50)] to-[rgba(10,36,74,0.40)] border-2 border-[#08AFC1] shadow-[0_12px_36px_rgba(8,175,193,0.30)]'
          : 'bg-[rgba(18,55,99,0.32)] hover:bg-[rgba(18,55,99,0.48)] border border-[rgba(190,225,255,0.20)] hover:border-[#08AFC1]/60 shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
      }`}
    >
      {/* Top Badge: If recommended, show RECOMMENDED NEXT */}
      {card.isRecommended && (
        <div className="absolute top-3.5 right-4 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#08AFC1]/20 border border-[#08AFC1] text-[#08AFC1] text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(8,175,193,0.4)]">
          <Sparkles className="w-3 h-3" />
          <span>Recommended Next</span>
        </div>
      )}

      {/* Top Row: Visual Media + Title */}
      <div className="flex items-start gap-4">
        {/* Left: 3D Illustration / Glowing ECG Wave */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[rgba(6,23,46,0.65)] border border-[rgba(190,225,255,0.15)] flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform p-1">
          {card.isEcg ? (
            /* Glowing Neon Coral/Red ECG Waveform */
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-full h-14" viewBox="0 0 110 44" fill="none" aria-hidden="true">
                <path 
                  d="M 0 22 L 28 22 L 35 10 L 42 36 L 50 4 L 58 32 L 65 22 L 110 22" 
                  stroke="#f43f5e" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.95)) drop-shadow(0 0 16px rgba(244,63,94,0.60))'
                  }}
                />
              </svg>
            </div>
          ) : card.image ? (
            <img
              src={card.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
              loading="lazy"
            />
          ) : (
            <BookOpen className="w-8 h-8 text-[#08AFC1]" />
          )}
        </div>

        {/* Title, Subtitle, Completed Count */}
        <div className="flex-1 min-w-0 pr-6 sm:pr-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[#F5F9FF] tracking-tight group-hover:text-[#08AFC1] transition-colors">
            {card.title}
          </h3>
          <p className="text-xs text-[#C4D4EA] font-normal leading-snug mt-0.5">
            {card.subtitle}
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#8eaecf] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#08AFC1]" />
            <span>{card.completedTopics} of {card.totalTopics} topics completed</span>
          </div>
        </div>
      </div>

      {/* Middle: Progress Bar with Percentage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-[#C4D4EA]">Subject Progress</span>
          <span className="text-[#08AFC1] font-mono font-bold">{card.progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-white/5">
          <div 
            className="bg-gradient-to-r from-[#08AFC1] to-[#10b981] h-2 rounded-full transition-all duration-300"
            style={{ width: `${card.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Bottom: Next Recommended Topic + Arrow Affordance */}
      <div className="pt-2 border-t border-[rgba(190,225,255,0.12)] flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#8eaecf] font-semibold">
            Next Lesson
          </div>
          <div className="text-xs sm:text-sm font-semibold text-[#F5F9FF] truncate group-hover:text-[#08AFC1] transition-colors mt-0.5">
            {card.nextTopic}
          </div>
          <div className="text-[11px] text-[#C4D4EA] flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-[#08AFC1]" />
            <span>{card.durationMinutes} mins lesson</span>
          </div>
        </div>

        {/* Circular Action Button Affordance */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${
          card.isRecommended
            ? 'bg-[#08AFC1] text-[#06172E] group-hover:bg-white group-hover:scale-105'
            : 'bg-white/10 border border-white/20 text-white group-hover:bg-[#08AFC1] group-hover:border-[#08AFC1] group-hover:text-[#06172E]'
        }`}>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
