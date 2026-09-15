import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Heart, 
  Activity, 
  Layers, 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Award, 
  Search,
  Microscope,
  Radio,
  Scissors,
  Network,
  SplitSquareVertical
} from 'lucide-react';
import { NavigationView } from '../../types';

interface HeroCinematicProps {
  onNavigate: (view: NavigationView) => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onNavigate }) => {
  const [activeCycleIndex, setActiveCycleIndex] = useState<number>(0);

  const cycleSteps = [
    {
      label: 'ANATOMY',
      title: 'Authentic 3D Structural Anatomy',
      desc: 'Medically validated coronary vasculature, myocardial chambers, and cranial innervation.',
      accent: 'from-blue-500 to-indigo-600',
      tag: 'ORGAN LAYER'
    },
    {
      label: 'DISEASE',
      title: 'Pathology & Cellular Transformation',
      desc: 'Macroscopic to molecular progression: Aschoff bodies, atherosclerotic plaque, and emphysema.',
      accent: 'from-rose-500 to-red-600',
      tag: 'TISSUE TRANSFORMATION'
    },
    {
      label: 'DIAGNOSIS',
      title: 'Bedside Signs & Diagnostic Imaging',
      desc: 'Precordial auscultation, 12-lead ECG vector analysis, and emergency radiological windowing.',
      accent: 'from-cyan-500 to-sky-600',
      tag: 'CLINICAL EVALUATION'
    },
    {
      label: 'TREATMENT',
      title: 'Pharmacology & Operative Procedures',
      desc: 'Molecular drug receptor targeting, evidence-based algorithms, and step-by-step surgical techniques.',
      accent: 'from-emerald-500 to-teal-600',
      tag: 'THERAPEUTIC RESOLUTION'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % cycleSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cycleSteps.length]);

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden medical-grid-bg px-4 sm:px-6">
        {/* Background atmospheric ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 shadow-glow-cyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              INTERACTIVE MBBS MEDICAL VISUALIZATION PLATFORM
            </span>
          </div>

          {/* Hero Headings */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              See Medicine. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Understand Medicine.
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              An interactive MBBS learning platform where anatomy, pathology, physiology, pharmacology, investigations, treatment and clinical procedures come alive.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('learn')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore MBBS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('3d-anatomy')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel-elevated hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-cyan-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Enter Anatomy Lab</span>
            </button>
          </div>

          {/* Dynamic Scientific Visualization Cycle: ANATOMY → DISEASE → DIAGNOSIS → TREATMENT */}
          <div className="pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cycleSteps.map((step, idx) => {
                const isActive = idx === activeCycleIndex;
                return (
                  <button
                    key={step.label}
                    onClick={() => setActiveCycleIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-900 border-cyan-400/60 shadow-lg shadow-cyan-500/10 scale-105'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">
                        0{idx + 1}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                    </div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      {step.label}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {step.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Active Step Deep-Dive Card */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-indigo-950/40 to-slate-900/95 border border-slate-800/90 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  CURRENT FOCUS: {cycleSteps[activeCycleIndex].label}
                </span>
                <h3 className="text-base font-bold text-white">
                  {cycleSteps[activeCycleIndex].title}
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {cycleSteps[activeCycleIndex].desc}
                </p>
              </div>

              <button
                onClick={() => {
                  if (activeCycleIndex === 0) onNavigate('3d-anatomy');
                  else if (activeCycleIndex === 1) onNavigate('pathology');
                  else if (activeCycleIndex === 2) onNavigate('clinical-exam');
                  else onNavigate('treatment');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/20 whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <span>Launch View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Medicine Engine Showcase Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                THE BIG DIFFERENCE
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                The Visual Medicine Engine
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Experience connected non-fragmented medical education. Search any disease to unlock the uninterrupted 12-stage scientific continuum:
                Normal Anatomy → Physiology → Pathology → Mechanism → Clinical Signs → Investigations → Diagnosis → Treatment → Procedures → Complications → OSPE → MCQs.
              </p>
            </div>

            <button
              onClick={() => onNavigate('visual-engine')}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 whitespace-nowrap transition-all"
            >
              <span>Launch Visual Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Specialized Medical Visualization Modules Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            ACADEMIC SPECIALTIES & LABS
          </span>
          <h2 className="text-3xl font-bold text-white">
            Specialized Simulation Workstations
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Interact with authentic scientific modules designed around the BM&DC national curriculum and validated medical textbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Virtual Histology Lab',
              desc: 'Microscope with 4x–100x zoom, field-of-view reticle, and normal vs pathological split comparisons (Cirrhosis, Crescentic GN, AML).',
              icon: Microscope,
              color: 'text-indigo-400',
              border: 'hover:border-indigo-500/50',
              view: 'histology' as NavigationView
            },
            {
              title: 'Clinical Radiology Workstation',
              desc: 'High-contrast imaging viewer for CXR & CT with "Find the Abnormality" diagnostic challenge before consultant report reveal.',
              icon: Radio,
              color: 'text-sky-400',
              border: 'hover:border-sky-500/50',
              view: 'investigations' as NavigationView
            },
            {
              title: 'Surgery & Procedure Mode',
              desc: 'Step-by-step Laparoscopic Appendectomy (9 steps) and Chest Tube Thoracostomy with instruments and risk prevention.',
              icon: Scissors,
              color: 'text-teal-400',
              border: 'hover:border-teal-500/50',
              view: 'surgery' as NavigationView
            },
            {
              title: 'Interactive Diagram Engine',
              desc: 'Vector anatomical diagrams (Cardiac Conduction, Circle of Willis, Nephron) with Quiz Mode to test yourself.',
              icon: Network,
              color: 'text-purple-400',
              border: 'hover:border-purple-500/50',
              view: 'diagrams' as NavigationView
            },
            {
              title: 'Digital Textbook & Citations',
              desc: 'Clean distraction-free MBBS reading suite with clinical pearls, margin notes, and verified Davidson 24th & Robbins 10th citations.',
              icon: BookOpen,
              color: 'text-blue-400',
              border: 'hover:border-blue-500/50',
              view: 'textbook' as NavigationView
            },
            {
              title: 'Normal vs Abnormal Slider',
              desc: 'Interactive split-curtain comparison for Cardiomyopathy, Emphysema, and Diabetic Kimmelstiel-Wilson glomerulosclerosis.',
              icon: SplitSquareVertical,
              color: 'text-rose-400',
              border: 'hover:border-rose-500/50',
              view: 'comparison' as NavigationView
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(item.view)}
                className={`glass-panel p-6 rounded-2xl border border-slate-800 ${item.border} cursor-pointer transition-all duration-200 hover:-translate-y-1 group flex flex-col justify-between`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Enter Workstation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Examination & Clinical Simulation Suite */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel-elevated p-6 rounded-3xl border border-rose-500/20 space-y-4 hover:border-rose-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Virtual Patient Cases</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Step into hospital emergency rooms. Take focused histories, examine dynamic vitals, order 12-lead ECGs, and manage acute STEMI and severe asthma.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cases')}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
          >
            <span>Launch Case Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="glass-panel-elevated p-6 rounded-3xl border border-indigo-500/20 space-y-4 hover:border-indigo-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">OSPE & OSCE Practical Lab</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Timed station bell exams with specimen spotting, station timers, official BM&DC marking rubrics, and model performance debriefs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('ospe')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <span>Start OSPE Exam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="glass-panel-elevated p-6 rounded-3xl border border-cyan-500/20 space-y-4 hover:border-cyan-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Viva Voice Examiner</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Experience authentic viva boards with voice-driven questioning, BM&DC syllabus alignment, cross-examination, and structured feedback.
            </p>
          </div>
          <button
            onClick={() => onNavigate('ai-viva')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>Face Viva Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
