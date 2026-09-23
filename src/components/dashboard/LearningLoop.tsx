import React from 'react';
import { 
  BookOpen, 
  Stethoscope, 
  CheckSquare, 
  BarChart3, 
  ArrowRight, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { NavigationView } from '../../types';

interface LearningLoopProps {
  onNavigate: (view: NavigationView) => void;
}

export const LearningLoop: React.FC<LearningLoopProps> = ({ onNavigate }) => {
  const steps = [
    {
      stepNumber: 1,
      verb: 'Learn',
      title: 'Learn a concept',
      subtitle: 'Build strong foundations',
      description: 'Master core anatomical structures, physiological rhythms, and cellular pathways.',
      duration: '15 mins',
      actionLabel: 'Study Concepts',
      icon: BookOpen,
      targetView: 'learn' as NavigationView,
      accentColor: '#08AFC1',
    },
    {
      stepNumber: 2,
      verb: 'Apply',
      title: 'Explore a clinical case',
      subtitle: 'See knowledge in context',
      description: 'Connect patient symptoms, diagnostic tests, and clinical bedside decision making.',
      duration: '20 mins',
      actionLabel: 'Solve Case',
      icon: Stethoscope,
      targetView: 'cases' as NavigationView,
      accentColor: '#10b981',
    },
    {
      stepNumber: 3,
      verb: 'Test',
      title: 'Test your understanding',
      subtitle: 'Practise with purpose',
      description: 'Simulate BMDC exam questions, OSPE stations, and clinical viva scenarios.',
      duration: '10 mins',
      actionLabel: 'Test Yourself',
      icon: CheckSquare,
      targetView: 'practice' as NavigationView,
      accentColor: '#f59e0b',
    },
    {
      stepNumber: 4,
      verb: 'Revise',
      title: 'Revise with purpose',
      subtitle: 'Make knowledge stick',
      description: 'Strengthen long-term recall with high-yield flashcards and mistake reviews.',
      duration: '8 mins',
      actionLabel: 'Spaced Review',
      icon: BarChart3,
      targetView: 'revision' as NavigationView,
      accentColor: '#a855f7',
    },
  ];

  return (
    <section 
      aria-label="MEDX Learning Loop Progression"
      className="space-y-4"
    >
      {/* Section Header with Step Flow Visualizer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#08AFC1]">
            THE CLINICAL MASTERY CYCLE
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F9FF] mt-0.5">
            Your daily 4-step learning loop
          </h2>
        </div>

        {/* Visual Pill: Learn → Apply → Test → Revise */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgba(10,36,74,0.60)] border border-[rgba(190,225,255,0.20)] text-xs font-mono font-bold text-[#C4D4EA] self-start sm:self-auto shadow-sm">
          <span className="text-[#08AFC1]">Learn</span>
          <span className="text-white/30">→</span>
          <span className="text-emerald-400">Apply</span>
          <span className="text-white/30">→</span>
          <span className="text-amber-400">Test</span>
          <span className="text-white/30">→</span>
          <span className="text-purple-400">Revise</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              onClick={() => onNavigate(step.targetView)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(step.targetView);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Step ${step.stepNumber}: ${step.title}. ${step.description} Estimated time: ${step.duration}.`}
              className="group relative rounded-2xl bg-[rgba(18,55,99,0.30)] hover:bg-[rgba(18,55,99,0.48)] border border-[rgba(190,225,255,0.18)] hover:border-[#08AFC1]/60 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040D21]"
            >
              {/* Top Row: Icon + Step Badge + Time */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  {/* Step Pill */}
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#C4D4EA]">
                    STEP {step.stepNumber} • {step.verb.toUpperCase()}
                  </span>

                  {/* Estimated Time Badge */}
                  <span className="text-[11px] text-[#8eaecf] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#08AFC1]" />
                    <span>{step.duration}</span>
                  </span>
                </div>

                {/* Main Step Icon & Title */}
                <div className="flex items-start gap-3 pt-1">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      background: `rgba(${step.stepNumber === 1 ? '8, 175, 193' : step.stepNumber === 2 ? '16, 185, 129' : step.stepNumber === 3 ? '245, 158, 11' : '168, 85, 247'}, 0.15)`,
                      border: `1px solid rgba(${step.stepNumber === 1 ? '8, 175, 193' : step.stepNumber === 2 ? '16, 185, 129' : step.stepNumber === 3 ? '245, 158, 11' : '168, 85, 247'}, 0.35)`,
                      color: step.accentColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#8eaecf] font-medium mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Explanation Subtext */}
                <p className="text-xs text-[#C4D4EA] font-normal leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

              {/* Bottom Action Affordance */}
              <div className="mt-5 pt-3 border-t border-[rgba(190,225,255,0.10)] flex items-center justify-between text-xs font-semibold text-[#08AFC1] group-hover:text-white transition-colors">
                <span>{step.actionLabel}</span>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#08AFC1] group-hover:text-[#06172E] flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
