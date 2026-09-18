import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  AlertOctagon,
  UserCheck,
  Layers,
  Scissors,
  ListOrdered,
  AlertTriangle,
  HeartPulse,
  AlignLeft,
  Award,
  ChevronRight
} from 'lucide-react';
import { SelfHostedMedicalVideo } from '../../types/videoStudio';
import { VideoAssessmentQuiz } from './VideoAssessmentQuiz';

interface SurgicalProcedureTabsProps {
  video: SelfHostedMedicalVideo;
  onSeekTo?: (seconds: number) => void;
}

type SurgicalTabKey =
  | 'overview'
  | 'indications'
  | 'contraindications'
  | 'preparation'
  | 'anatomy'
  | 'instruments'
  | 'steps'
  | 'complications'
  | 'postoperative'
  | 'transcript'
  | 'assessment';

const TABS: { key: SurgicalTabKey; label: string; icon: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
  { key: 'overview', label: 'Overview', icon: FileText },
  { key: 'indications', label: 'Indications', icon: CheckSquare },
  { key: 'contraindications', label: 'Contraindications', icon: AlertOctagon },
  { key: 'preparation', label: 'Patient Prep', icon: UserCheck },
  { key: 'anatomy', label: 'Relevant Anatomy', icon: Layers },
  { key: 'instruments', label: 'Instruments', icon: Scissors },
  { key: 'steps', label: 'Operative Steps', icon: ListOrdered },
  { key: 'complications', label: 'Complications', icon: AlertTriangle },
  { key: 'postoperative', label: 'Post-op Care', icon: HeartPulse },
  { key: 'transcript', label: 'Video Transcript', icon: AlignLeft },
  { key: 'assessment', label: 'Assessment', icon: Award }
];

export const SurgicalProcedureTabs: React.FC<SurgicalProcedureTabsProps> = ({ video, onSeekTo }) => {
  const [activeTab, setActiveTab] = useState<SurgicalTabKey>('overview');

  return (
    <div className="surgical-tabs-wrapper bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden mt-6">
      {/* Top Tab Bar */}
      <div className="surgical-tab-bar flex items-center gap-1 p-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto scrollbar-thin">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-600/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-cyan-400" />
              Surgical Procedure Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{video.description}</p>
            {video.summary && (
              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300">
                <span className="font-bold text-cyan-400 block mb-1">Clinical Summary:</span>
                <p className="leading-relaxed">{video.summary}</p>
              </div>
            )}
            {video.clinicalPearls && video.clinicalPearls.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Clinical Pearls:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {video.clinicalPearls.map((pearl, idx) => (
                    <li key={idx} className="text-xs p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                      ★ {pearl}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'indications' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckSquare size={18} className="text-emerald-400" />
              Clinical Indications
            </h3>
            {video.indications && video.indications.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {video.indications.map((item, idx) => (
                  <li key={idx} className="text-xs p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-200 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Consult operative guidelines and clinical faculty recommendations for specific indications.</p>
            )}
          </div>
        )}

        {activeTab === 'contraindications' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertOctagon size={18} className="text-rose-400" />
              Contraindications & Hazards
            </h3>
            {video.contraindications && video.contraindications.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {video.contraindications.map((item, idx) => (
                  <li key={idx} className="text-xs p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-200 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Standard surgical contraindications apply. Evaluate individual patient cardiopulmonary status.</p>
            )}
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck size={18} className="text-cyan-400" />
              Patient Preparation & Aseptic Protocol
            </h3>
            {video.patientPreparation && video.patientPreparation.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {video.patientPreparation.map((item, idx) => (
                  <li key={idx} className="text-xs p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Standard WHO surgical safety checklist, skin preparation, and prophylactic antibiotics apply.</p>
            )}
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              Key Surgical & Topographical Anatomy
            </h3>
            {video.relevantAnatomy && video.relevantAnatomy.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {video.relevantAnatomy.map((anat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-cyan-200 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span>{anat}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">{video.anatomy.join(', ')}</p>
            )}
          </div>
        )}

        {activeTab === 'instruments' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scissors size={18} className="text-cyan-400" />
              Required Surgical Instruments & Devices
            </h3>
            {video.instruments && video.instruments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {video.instruments.map((inst, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                    <Scissors size={14} className="text-slate-400 shrink-0" />
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Standard major operating set and sterile disposable consumables.</p>
            )}
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ListOrdered size={18} className="text-cyan-400" />
              Step-by-Step Operative Protocol
            </h3>
            {video.surgicalSteps && video.surgicalSteps.length > 0 ? (
              <div className="flex flex-col gap-3">
                {video.surgicalSteps.map((step) => (
                  <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        Step {step.stepNumber}: {step.stepTitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-slate-400">
                      <span><strong>Anatomy:</strong> {step.keyAnatomy.join(', ')}</span>
                      <span><strong>Instruments:</strong> {step.instruments.join(', ')}</span>
                    </div>
                    {step.warnings && step.warnings.length > 0 && (
                      <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200 mt-1">
                        ⚠️ <strong>Caution:</strong> {step.warnings.join(' ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Review video chapters and faculty commentary for sequential steps.</p>
            )}
          </div>
        )}

        {activeTab === 'complications' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              Potential Complications & Management
            </h3>
            {video.complications && video.complications.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {video.complications.map((comp, idx) => (
                  <li key={idx} className="text-xs p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">!</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Bleeding, wound infection, and injury to adjacent structures.</p>
            )}
          </div>
        )}

        {activeTab === 'postoperative' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartPulse size={18} className="text-cyan-400" />
              Postoperative Care & Monitoring
            </h3>
            {video.postoperativeCare && video.postoperativeCare.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {video.postoperativeCare.map((item, idx) => (
                  <li key={idx} className="text-xs p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-200 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Standard vital sign telemetry, analgesia, and wound assessment.</p>
            )}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlignLeft size={18} className="text-cyan-400" />
              Clinical Transcript & Narration
            </h3>
            {Array.isArray(video.transcript) ? (
              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                {video.transcript.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 mb-1">
                      <span className="font-bold">{item.speaker}</span>
                      <button
                        type="button"
                        onClick={() => onSeekTo?.(item.timestampSeconds)}
                        className="font-mono hover:underline text-slate-400 hover:text-cyan-300"
                      >
                        {Math.floor(item.timestampSeconds / 60)}:{(item.timestampSeconds % 60).toString().padStart(2, '0')}
                      </button>
                    </div>
                    <p className="text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            ) : typeof video.transcript === 'string' ? (
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                {video.transcript}
              </p>
            ) : (
              <p className="text-xs text-slate-400">Transcript synchronized with WebVTT closed captions.</p>
            )}
          </div>
        )}

        {activeTab === 'assessment' && (
          <VideoAssessmentQuiz videoId={video.id} questions={video.quiz} />
        )}
      </div>
    </div>
  );
};

export default SurgicalProcedureTabs;
