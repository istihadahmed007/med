import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  X, 
  Compass, 
  CheckCircle2, 
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { GuidedTour, GuidedTourStep } from '../../types/anatomy';
import { GUIDED_ANATOMY_TOURS } from '../../data/anatomyToursData';

interface LearnAnatomyTourProps {
  onStepChange: (step: GuidedTourStep) => void;
  onCloseTour: () => void;
}

export const LearnAnatomyTour: React.FC<LearnAnatomyTourProps> = ({
  onStepChange,
  onCloseTour
}) => {
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const tour: GuidedTour = GUIDED_ANATOMY_TOURS[selectedTourIndex] || GUIDED_ANATOMY_TOURS[0];
  const step: GuidedTourStep = tour.steps[currentStepIndex] || tour.steps[0];

  useEffect(() => {
    onStepChange(step);
  }, [selectedTourIndex, currentStepIndex]);

  const handleSelectTour = (idx: number) => {
    setSelectedTourIndex(idx);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < tour.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full md:w-[440px] glass-panel-elevated rounded-2xl border border-sky-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/95 flex flex-col max-h-[85vh] overflow-hidden pointer-events-auto transition-all animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 bg-sky-950/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
              Guided Learning Tour
            </div>
            <div className="text-[11px] text-slate-400">
              MBBS Step-by-Step Curriculum
            </div>
          </div>
        </div>

        <button
          onClick={onCloseTour}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tour Selector Dropdown */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Select Curriculum Module:
        </label>
        <select
          value={selectedTourIndex}
          onChange={(e) => handleSelectTour(parseInt(e.target.value))}
          className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-cyan-400 font-medium"
        >
          {GUIDED_ANATOMY_TOURS.map((t, idx) => (
            <option key={t.id} value={idx}>
              {t.title} ({t.estimatedMinutes} min)
            </option>
          ))}
        </select>
      </div>

      {/* Step Progress Bar */}
      <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {tour.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-6 bg-cyan-400'
                  : idx < currentStepIndex
                  ? 'w-3 bg-cyan-700'
                  : 'w-3 bg-slate-800'
              }`}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Step {currentStepIndex + 1} of {tour.steps.length}
        </span>
      </div>

      {/* Step Body */}
      <div className="p-4 overflow-y-auto space-y-3.5 flex-1 custom-scrollbar text-xs">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            Step {step.stepNumber}
          </span>
          <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
            {step.title}
          </h3>
        </div>

        <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
          {step.description}
        </div>

        {step.clinicalPearl && (
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-[11px] space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              MBBS High-Yield Clinical Pearl:
            </div>
            <p className="text-slate-200 leading-relaxed">
              {step.clinicalPearl}
            </p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <button
          disabled={currentStepIndex === 0}
          onClick={handlePrev}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border ${
            currentStepIndex > 0
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-900 text-slate-600 border-slate-850 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentStepIndex === tour.steps.length - 1}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
            currentStepIndex < tour.steps.length - 1
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-glow-cyan'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
