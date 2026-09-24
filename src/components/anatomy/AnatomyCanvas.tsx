import React, { useState, useEffect } from "react";
import {
  ANATOMY_MODELS,
  AnatomyModel,
  Hotspot,
} from "../../lib/anatomy/anatomy-models";
import { queueIdlePrefetch } from "../../lib/anatomy/model-prefetch";
import { AnatomyViewer } from "./AnatomyViewer";
import { AnatomyLibrary } from "./AnatomyLibrary";
import { AttributionModal } from "../common/AttributionModal";
import {
  Layers,
  Sparkles,
  Stethoscope,
  Info,
  ChevronRight,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface AnatomyCanvasProps {
  initialOrgan?: string;
  onNavigateToCase?: (caseId: string) => void;
  onStartViva?: (structureId: string) => void;
}

type AnatomyTab = "3d" | "histology" | "pathology" | "clinical";

export const AnatomyCanvas: React.FC<AnatomyCanvasProps> = ({
  initialOrgan,
  onNavigateToCase,
  onStartViva,
}) => {
  const [selectedModel, setSelectedModel] = useState<AnatomyModel>(() => {
    if (initialOrgan) {
      const found = ANATOMY_MODELS.find(
        (m) => m.id.toLowerCase() === initialOrgan.toLowerCase()
      );
      if (found) return found;
    }
    return ANATOMY_MODELS[0]; // Heart default
  });

  const [activeTab, setActiveTab] = useState<AnatomyTab>("3d");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isAttributionOpen, setIsAttributionOpen] = useState(false);

  // Sync when initialOrgan changes from navigation
  useEffect(() => {
    if (initialOrgan) {
      const found = ANATOMY_MODELS.find(
        (m) => m.id.toLowerCase() === initialOrgan.toLowerCase()
      );
      if (found) {
        setSelectedModel(found);
        setSelectedHotspot(null);
        setActiveTab("3d");
      }
    }
  }, [initialOrgan]);

  // Queue idle prefetching of adjacent models after initial render
  useEffect(() => {
    const urlsToWarm = ANATOMY_MODELS.filter((m) => m.id !== selectedModel.id).map(
      (m) => m.model
    );
    queueIdlePrefetch(urlsToWarm);
  }, [selectedModel.id]);

  const handleSelectModel = (model: AnatomyModel) => {
    setSelectedModel(model);
    setSelectedHotspot(null);
    setActiveTab("3d");
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* 1. Header & Navigation Sub-Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              3D Anatomy Laboratory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              BM&DC Curated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real interactive Three.js anatomical reconstructions with Terminologia Anatomica (TA2) standard nomenclature.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-med-900/90 border border-slate-700/60 shadow-glass self-start lg:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("3d")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "3d"
                ? "bg-med-accent-cyan text-slate-950 shadow-glow-cyan"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            3D Specimen
          </button>

          {selectedModel.illustrations?.microscopic && (
            <button
              onClick={() => setActiveTab("histology")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "histology"
                  ? "bg-med-accent-blue text-white shadow-glow-blue"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Histology
            </button>
          )}

          {selectedModel.illustrations?.compare && (
            <button
              onClick={() => setActiveTab("pathology")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "pathology"
                  ? "bg-rose-600 text-white shadow-glow-rose"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Pathology Compare
            </button>
          )}

          <button
            onClick={() => setActiveTab("clinical")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "clinical"
                ? "bg-emerald-600 text-white shadow-glow-emerald"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Clinical Notes
          </button>
        </div>
      </div>

      {/* 2. Main Visual Canvas Section */}
      <div className="w-full">
        <div className={activeTab === "3d" ? "block" : "hidden"}>
          <AnatomyViewer
            model={selectedModel}
            onSelectHotspot={setSelectedHotspot}
            selectedHotspotId={selectedHotspot?.id}
            onOpenHistology={() => setActiveTab("histology")}
            onOpenPathology={() => setActiveTab("pathology")}
          />
        </div>

        {/* Histology Specimen Microscopy View */}
        {activeTab === "histology" && selectedModel.illustrations?.microscopic && (
          <div className="relative w-full rounded-2xl overflow-hidden bg-med-900/90 border border-slate-800 shadow-2xl p-6 lg:p-8 animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Microscopic Slide Container */}
              <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-glass flex items-center justify-center">
                <img
                  src={selectedModel.illustrations.microscopic}
                  alt={`${selectedModel.name} Histology`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-med-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-med-accent-cyan">
                  High-Power Microscopy Specimen
                </div>
              </div>

              {/* Histological Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-xs uppercase font-mono text-med-accent-cyan font-bold tracking-wider">
                    Histological Structure & Tissue
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    {selectedModel.tissue || `${selectedModel.name} Microscopic Architecture`}
                  </h3>
                  <p className="text-xs text-slate-400 font-serif italic mt-0.5">
                    Specimen: {selectedModel.scientificName}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Tissue Classification:</strong>{" "}
                    {selectedModel.tissue}
                  </p>
                  <p>
                    <strong className="text-white">Physiological Significance:</strong>{" "}
                    {selectedModel.function}
                  </p>
                  <p>
                    <strong className="text-white">Microscopic Hallmarks:</strong>{" "}
                    {selectedModel.medical}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("3d")}
                    className="px-4 py-2 rounded-xl bg-med-accent-cyan hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-1.5"
                  >
                    Return to 3D Model
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {onStartViva && (
                    <button
                      onClick={() => onStartViva(selectedModel.id)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                      Test on AI Viva
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pathology Comparison View */}
        {activeTab === "pathology" && selectedModel.illustrations?.compare && (
          <div className="relative w-full rounded-2xl overflow-hidden bg-med-900/90 border border-slate-800 shadow-2xl p-6 lg:p-8 animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Comparison Specimen Image */}
              <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-glass flex items-center justify-center">
                <img
                  src={selectedModel.illustrations.compare}
                  alt={`${selectedModel.name} Comparison`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-med-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-rose-400">
                  Normal vs. Pathological Contrast
                </div>
              </div>

              {/* Clinical Pathology Conditions */}
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-xs uppercase font-mono text-rose-400 font-bold tracking-wider">
                    Clinical Pathology & Disease States
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Pathological Correlates of the {selectedModel.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Differential diagnoses and organ failure states examined in BM&DC clinical viva:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedModel.conditions?.map((cond) => (
                    <div
                      key={cond}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("3d")}
                    className="px-4 py-2 rounded-xl bg-med-accent-cyan hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-1.5"
                  >
                    Inspect 3D Morphology
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {onNavigateToCase && (
                    <button
                      onClick={() => onNavigateToCase(selectedModel.id)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      Solve Clinical Case
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Notes & Key Facts Tab */}
        {activeTab === "clinical" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {/* Morphological Metrics */}
            <div className="p-6 rounded-2xl bg-med-900/80 border border-slate-800 shadow-glass space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-med-accent-cyan" />
                Morphological Dimensions
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                  <span>Physical Size:</span>
                  <span className="text-white font-medium">{selectedModel.size || "Standard"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                  <span>Normal Weight:</span>
                  <span className="text-white font-medium">{selectedModel.weight || "N/A"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                  <span>Anatomical Location:</span>
                  <span className="text-white font-medium text-right max-w-[180px]">{selectedModel.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                  <span>Arterial Supply:</span>
                  <span className="text-white font-medium text-right max-w-[180px]">{selectedModel.bloodSupply}</span>
                </div>
              </div>
            </div>

            {/* Physiological Functions */}
            <div className="p-6 rounded-2xl bg-med-900/80 border border-slate-800 shadow-glass space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Physiological Core
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <strong className="text-white block mb-1">Primary Role:</strong>
                  {selectedModel.function}
                </p>
                <p className="leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <strong className="text-white block mb-1">Daily Physiological Workload:</strong>
                  {selectedModel.dailyFact}
                </p>
              </div>
            </div>

            {/* High-Yield Medical Highpoints */}
            <div className="p-6 rounded-2xl bg-med-900/80 border border-slate-800 shadow-glass space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                BM&DC Viva High-Yield Note
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <strong className="text-white block mb-1">Clinical Significance:</strong>
                  {selectedModel.medical}
                </p>
                <p className="leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 text-slate-400 italic">
                  "{selectedModel.funFact}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Centralized Anatomical Specimen Library */}
      <div className="pt-6 border-t border-slate-800">
        <AnatomyLibrary
          activeModelId={selectedModel.id}
          onSelectModel={handleSelectModel}
          onOpenAttribution={() => setIsAttributionOpen(true)}
        />
      </div>

      {/* 4. Attribution and Open Source Licensing Modal */}
      <AttributionModal
        isOpen={isAttributionOpen}
        onClose={() => setIsAttributionOpen(false)}
      />
    </div>
  );
};
