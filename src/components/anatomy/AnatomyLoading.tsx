import React from "react";
import { Loader2 } from "lucide-react";

interface AnatomyLoadingProps {
  modelName: string;
  systemName: string;
  progress: number; // 0 to 1
}

export const AnatomyLoading: React.FC<AnatomyLoadingProps> = ({
  modelName,
  systemName,
  progress,
}) => {
  const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-med-950/70 backdrop-blur-md transition-opacity duration-300 pointer-events-none">
      <div className="flex flex-col items-center max-w-xs w-full p-6 rounded-2xl bg-med-900/90 border border-slate-700/60 shadow-glass text-center">
        {/* Animated Progress Ring */}
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-med-accent-cyan transition-all duration-300 ease-out"
              strokeDasharray={`${percent}, 100`}
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <Loader2 className="absolute w-6 h-6 text-med-accent-cyan animate-spin" />
        </div>

        <h4 className="text-sm font-semibold text-white tracking-wide">
          Loading {modelName}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">{systemName}</p>

        {/* Progress Bar & percentage */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-med-accent-cyan to-med-accent-blue h-1.5 rounded-full transition-all duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-slate-400 mt-2">
          {percent}% parsed
        </span>
      </div>
    </div>
  );
};
