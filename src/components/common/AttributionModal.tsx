import React from "react";
import { X, ExternalLink, ShieldCheck, Award, BookOpen, Layers } from "lucide-react";

interface AttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttributionModal: React.FC<AttributionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-med-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-med-accent-cyan/15 border border-med-accent-cyan/30 flex items-center justify-center text-med-accent-cyan">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Anatomy Model Sources & Attribution
              </h3>
              <p className="text-xs text-slate-400">
                Peer-reviewed anatomical 3D assets, clinical standards & open-source licenses
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1 py-4 space-y-4 text-xs text-slate-300 leading-relaxed scrollbar-thin">
          {/* Source 1: Anatomy Atelier */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-white">
                  Anatomy Atelier (thebuggeddev/anatomy)
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                MIT License
              </span>
            </div>
            <p className="text-slate-300">
              Interactive 3D organ specimens (Heart, Brain, Lungs, Liver, Kidneys, Eye, Intestine, Pancreas, Skin) including normalized bounding volume architectures, Meshopt-optimised geometries, and macroscopic/microscopic anatomical specimen imaging.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <a
                href="https://github.com/thebuggeddev/anatomy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-med-accent-cyan hover:underline flex items-center gap-1"
              >
                GitHub Repository
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>Author: @thebuggeddev</span>
            </div>
          </div>

          {/* Source 2: BodyParts3D / Z-Anatomy */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-med-accent-blue" />
                <h4 className="text-sm font-semibold text-white">
                  BodyParts3D (DBCLS) & Z-Anatomy
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30">
                CC-BY-SA 2.1 JP / GNU GPL
              </span>
            </div>
            <p className="text-slate-300">
              Full-body anatomical standard coordinate reference, skeletal frameworks, visceral topography, and vascular mappings based on the Database Center for Life Science (DBCLS) BodyParts3D project and Z-Anatomy open atlas standard.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <a
                href="https://lifesciencedb.jp/bp3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-med-accent-cyan hover:underline flex items-center gap-1"
              >
                BodyParts3D Project
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.z-anatomy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-med-accent-cyan hover:underline flex items-center gap-1"
              >
                Z-Anatomy Atlas
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Source 3: Terminologia Anatomica Standard */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-white">
                Terminologia Anatomica (TA2 Standard)
              </h4>
            </div>
            <p className="text-slate-300">
              All anatomical structures and landmark pins conform to the international standard for human anatomical terminology formulated by the Federative International Programme on Anatomical Terminologies (FIPAT) of the International Federation of Associations of Anatomists (IFAA).
            </p>
          </div>

          {/* Source 4: Three.js & Engine */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Three.js 3D Engine</h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-700 text-slate-300">
                MIT License
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              WebGL rendering engine by Ricardo Cabello (Mr.doob) and the Three.js open source contributors.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-med-accent-blue hover:bg-blue-600 text-white text-xs font-semibold shadow-glow-blue transition-colors"
          >
            Close Attribution
          </button>
        </div>
      </div>
    </div>
  );
};
