import React from 'react';
import { 
  Flame, 
  Clock, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ArrowUpRight,
  UserCheck,
  LogOut
} from 'lucide-react';
import { StudentProfile } from '../../data/dashboardMockData';

interface ProgressPanelProps {
  profile: StudentProfile;
  onToggleAuthState: () => void;
  onViewStudyPlan: () => void;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  profile,
  onToggleAuthState,
  onViewStudyPlan,
}) => {
  // Determine dynamic time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = `${getGreeting()}, ${profile.greetingName}.`;

  return (
    <section 
      aria-label="Student Progress Summary"
      className="rounded-[24px] bg-[rgba(10,36,74,0.45)] border border-[rgba(190,225,255,0.22)] border-t-[rgba(255,255,255,0.32)] backdrop-blur-xl p-5 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.35)] relative overflow-hidden"
    >
      {/* Subtle radial ambient highlight behind greeting */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(8, 175, 193, 0.15) 0%, rgba(23, 72, 160, 0.08) 50%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Greeting, Student Credentials, Active Recommendation */}
        <div className="space-y-3.5 flex-1 min-w-0">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08AFC1]/15 border border-[#08AFC1]/35 text-[#08AFC1] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{profile.year} • {profile.institution.split(',')[0]}</span>
            </span>

            {/* Signed-in badge with interactive state switcher for evaluation */}
            <button
              onClick={onToggleAuthState}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:text-white hover:bg-emerald-500/25 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              title="Click to toggle between Signed-In and Guest (Signed-Out) dashboard states"
              aria-label="Toggle signed in status"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Signed In (Demo)</span>
              <span className="text-[11px] text-emerald-400/70 border-l border-emerald-400/30 pl-1.5 ml-0.5">Switch view</span>
            </button>
          </div>

          {/* Student Greeting in Source Serif 4 */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F5F9FF] tracking-tight leading-tight">
              {greeting}
            </h1>
            <p className="text-sm sm:text-base text-[#C4D4EA] font-sans font-medium mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#08AFC1] animate-pulse shrink-0" />
              <span>{profile.recommendationHeadline}</span>
            </p>
          </div>
        </div>

        {/* Right Column: Weekly Goal & Study Streak Summary */}
        <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-4 shrink-0">
          
          {/* 1. Weekly Study Goal Card */}
          <div className="flex-1 sm:flex-initial min-w-[200px] p-4 rounded-2xl bg-[rgba(6,23,46,0.65)] border border-[rgba(190,225,255,0.18)] flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#8eaecf]">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Target className="w-3.5 h-3.5 text-[#08AFC1]" />
                Weekly Goal
              </span>
              <span className="text-[#08AFC1] font-mono font-bold">{profile.weeklyGoal.percent}%</span>
            </div>

            {/* Goal Progress Bar */}
            <div className="my-2.5">
              <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-[#08AFC1] to-[#10b981] h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(8,175,193,0.5)]"
                  style={{ width: `${profile.weeklyGoal.percent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#C4D4EA]">
              <span>{profile.weeklyGoal.completedHours}h completed</span>
              <span className="text-slate-400">Target: {profile.weeklyGoal.targetHours}h</span>
            </div>
          </div>

          {/* 2. Study Streak & Weekly Active Days Card */}
          <div className="flex-1 sm:flex-initial min-w-[210px] p-4 rounded-2xl bg-[rgba(6,23,46,0.65)] border border-[rgba(190,225,255,0.18)] flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#8eaecf]">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Study Streak
              </span>
              <span className="text-amber-300 font-mono font-bold">{profile.streakDays} Days</span>
            </div>

            {/* 7-Day Activity Indicators */}
            <div className="my-2 flex items-center justify-between gap-1.5">
              {profile.weeklyGoal.weekDays.map((d, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-1"
                  title={`${d.day}: ${d.active ? `${d.minutes} mins active` : 'Rest day'}`}
                >
                  <div 
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                      d.active 
                        ? 'bg-gradient-to-tr from-[#08AFC1] to-[#10b981] text-[#06172E] shadow-[0_0_8px_rgba(8,175,193,0.4)]'
                        : 'bg-white/5 text-slate-400 border border-white/5'
                    }`}
                  >
                    {d.shortLabel}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#C4D4EA]">
              <span className="text-amber-300 font-medium">Keep it going!</span>
              <button
                onClick={onViewStudyPlan}
                className="text-[11px] text-[#08AFC1] hover:text-white underline underline-offset-2 flex items-center gap-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#08AFC1]"
              >
                <span>Study Plan</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
