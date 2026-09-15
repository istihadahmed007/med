import React, { useState } from 'react';
import { TOPIC_UNIVERSES, TopicUniverseNode } from '../../data/medicalKnowledgeGraph';
import { 
  Heart, 
  Activity, 
  Layers, 
  Stethoscope, 
  Search, 
  Pill, 
  HelpCircle, 
  FileText, 
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface TopicUniverseViewProps {
  onNavigateToView?: (view: string) => void;
}

export const TopicUniverseView: React.FC<TopicUniverseViewProps> = ({ onNavigateToView }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('mitral-stenosis');
  const topic = TOPIC_UNIVERSES.find((t) => t.id === selectedTopicId) || TOPIC_UNIVERSES[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Universe Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            One Topic = One Learning Universe
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            {topic.title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Connected medical nexus linking Anatomy, Physiology, Pathology, Bedside Signs, Auscultation, Radiology, Pharmacology, and Exams.
          </p>
        </div>

        {/* Topic Switcher */}
        <div className="flex items-center gap-2">
          {TOPIC_UNIVERSES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopicId(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedTopicId === t.id
                  ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-glow-cyan'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {t.title.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Card */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-2">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          Topic Overview & Clinical Core
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed">
          {topic.overview}
        </p>
      </div>

      {/* The Connected Hexagonal / Multi-card Universe Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Anatomy Link */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              1. Gross Anatomy
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('3d-anatomy')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              3D View <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white">
            {topic.anatomyLink.structureName}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.anatomyLink.description}
          </p>
        </div>

        {/* 2. Physiology Link */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              2. Living Physiology
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('physiology')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              Lab <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white">
            {topic.physiologyLink.mechanismName}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.physiologyLink.parameterChanges}
          </p>
        </div>

        {/* 3. Pathology Link */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              3. Pathology & Morphometry
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('pathology')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              Slider <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white">
            {topic.pathologyLink.stageTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.pathologyLink.grossAndMicro}
          </p>
        </div>

        {/* 4. Bedside Signs & Auscultation */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              4. Bedside Signs & Murmurs
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('clinical-exam')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              Exam <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong className="text-slate-400 block mb-1">Auscultatory Finding:</strong>
            {topic.clinicalFeatures.auscultationOrPalpation}
          </p>
        </div>

        {/* 5. Diagnostic Investigations */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-400" />
              5. Diagnostic Investigations
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('investigations')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              ECG/CXR <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-300">
            <p><strong className="text-slate-400">Gold Standard:</strong> {topic.investigations.goldStandard}</p>
            {topic.investigations.ecgChanges && (
              <p><strong className="text-slate-400">ECG:</strong> {topic.investigations.ecgChanges}</p>
            )}
            {topic.investigations.radiologyFindings && (
              <p><strong className="text-slate-400">Radiology:</strong> {topic.investigations.radiologyFindings}</p>
            )}
          </div>
        </div>

        {/* 6. Pharmacology & Therapeutics */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-purple-400" />
              6. Pharmacology & Management
            </span>
            <button
              onClick={() => onNavigateToView && onNavigateToView('treatment')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              Algorithm <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white">
            {topic.pharmacology.firstLineDrug}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.pharmacology.mechanism}
          </p>
        </div>
      </div>

      {/* Viva & Exam Hub Footer */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          High-Yield BM&DC Viva Questions for this Universe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.highYieldVivaQuestions.map((q, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
              <span className="text-amber-400 font-bold mr-1.5">Viva Q{idx + 1}:</span>
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
