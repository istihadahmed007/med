import React from 'react';
import { 
  CheckSquare, 
  ArrowRight, 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { RecommendedActivityItem } from '../../data/dashboardMockData';

interface RecommendedActivityProps {
  activity: RecommendedActivityItem;
  onStartActivity: () => void;
}

export const RecommendedActivity: React.FC<RecommendedActivityProps> = ({
  activity,
  onStartActivity,
}) => {
  return (
    <div 
      className="rounded-2xl bg-[rgba(18,55,99,0.30)] border border-[rgba(190,225,255,0.20)] hover:border-[#08AFC1]/50 backdrop-blur-xl p-4 sm:p-5 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Left: Icon and Activity Info */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#08AFC1]/25 to-[#10b981]/20 border border-[#08AFC1]/40 flex items-center justify-center shrink-0 text-[#08AFC1]">
          {activity.type === 'case' ? (
            <Stethoscope className="w-5 h-5" />
          ) : (
            <CheckSquare className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-md">
              {activity.badge}
            </span>
            <span className="text-xs text-[#8eaecf] font-medium">• {activity.subject}</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#F5F9FF]">
            {activity.title}
          </h3>

          <p className="text-xs text-[#C4D4EA] line-clamp-1 max-w-xl">
            {activity.description}
          </p>
        </div>
      </div>

      {/* Right: Duration, Question Count, and Action */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
        <div className="flex items-center gap-3 text-xs text-[#8eaecf] font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#08AFC1]" />
            <span>{activity.durationMinutes} mins</span>
          </span>
          {activity.questionCount && (
            <span className="hidden sm:inline-flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#08AFC1]" />
              <span>{activity.questionCount} Questions</span>
            </span>
          )}
        </div>

        <button
          onClick={onStartActivity}
          className="min-h-[40px] px-4 py-2 rounded-xl bg-[#08AFC1]/15 hover:bg-[#08AFC1] text-[#08AFC1] hover:text-[#06172E] border border-[#08AFC1]/40 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
          aria-label={`Start ${activity.title}`}
        >
          <span>Practice Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
