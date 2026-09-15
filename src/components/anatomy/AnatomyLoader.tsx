import React from 'react';
import { Loader2, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { AnatomicalSystemId } from '../../types/anatomy';

interface AnatomyLoaderProps {
  progress: number; // 0 to 100
  loadedSystemsCount: number;
  totalSystemsCount: number;
  currentSystemName?: string;
  isStreaming?: boolean;
}

export const AnatomyLoader: React.FC<AnatomyLoaderProps> = ({
  progress,
  loadedSystemsCount,
  totalSystemsCount,
  currentSystemName,
  isStreaming = false
}) => {
  if (progress >= 100 && !isStreaming) return null;

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300">
      <div className="glass-panel px-4 py-2.5 rounded-full border border-sky-500/30 bg-slate-950/85 backdrop-blur-xl shadow-2xl flex items-center gap-3">
        {progress < 100 ? (
          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}

        <div className="flex flex-col min-w-[140px]">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {currentSystemName ? `Streaming ${currentSystemName}...` : 'Loading Authentic Anatomy...'}
            </span>
            <span className="text-cyan-400 font-mono text-[10px]">{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-1 mt-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-500 to-cyan-400 h-1 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
            />
          </div>
        </div>

        <div className="text-[10px] text-slate-400 font-mono pl-1 border-l border-slate-800/80 hidden sm:block">
          {loadedSystemsCount}/{totalSystemsCount} Systems
        </div>
      </div>
    </div>
  );
};
