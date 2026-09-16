import React, { useState } from 'react';
import { 
  Heart, 
  Layers, 
  Activity, 
  Search, 
  Sliders, 
  Network, 
  Pill, 
  Award, 
  Sparkles,
  Stethoscope,
  Maximize2
} from 'lucide-react';
import { NavigationView } from '../../types';

// Visual Sub-components
import { AnatomyCanvas } from '../anatomy/AnatomyCanvas';
import { CardiacCycleLab } from '../physiology/CardiacCycleLab';
import { AtherosclerosisSlider } from '../pathology/AtherosclerosisSlider';
import { HistologyLab } from '../histology/HistologyLab';
import { NormalVsAbnormalSlider } from '../comparison/NormalVsAbnormalSlider';
import { MedicalDiagramEngine } from '../diagrams/MedicalDiagramEngine';
import { SurgeryProcedureViewer } from '../surgery/SurgeryProcedureViewer';
import { DrugJourneyVisualizer } from '../pharmacology/DrugJourneyVisualizer';
import { RadiologyWorkstation } from '../radiology/RadiologyWorkstation';
import { EcgViewer } from '../investigation/EcgViewer';
import { XrayViewer } from '../investigation/XrayViewer';

interface VisualLabHubProps {
  initialSubTab?: VisualLabTab;
  onNavigateToCase?: (caseId: string) => void;
  onStartViva?: (structureId: string) => void;
}

export type VisualLabTab = 
  | '3d-anatomy'
  | 'radiology-dicom'
  | 'ecg-viewer'
  | 'cardiac-cycle'
  | 'histology'
  | 'pathology-slider'
  | 'normal-vs-abnormal'
  | 'diagrams'
  | 'pharmacology'
  | 'surgery';

const LAB_TABS: { id: VisualLabTab; label: string; icon: any; category: string; badge?: string }[] = [
  { id: '3d-anatomy', label: '3D Anatomy Studio', icon: Heart, category: 'Anatomy & Spatial', badge: 'Z-Anatomy' },
  { id: 'radiology-dicom', label: 'Radiology & DICOM', icon: Search, category: 'Diagnostics', badge: 'Cornerstone' },
  { id: 'ecg-viewer', label: '12-Lead ECG Calibrated', icon: Stethoscope, category: 'Diagnostics', badge: '25mm/s' },
  { id: 'cardiac-cycle', label: 'Living Physiology (Wiggers)', icon: Activity, category: 'Dynamic Simulation', badge: 'PV Loops' },
  { id: 'histology', label: 'Virtual Histology Lab', icon: Layers, category: 'Microscopy', badge: '100x' },
  { id: 'pathology-slider', label: 'Pathology Progression', icon: Layers, category: 'Microscopy' },
  { id: 'normal-vs-abnormal', label: 'Normal vs Abnormal', icon: Sliders, category: 'Comparison', badge: 'Split' },
  { id: 'pharmacology', label: 'Drug Journey Lab', icon: Pill, category: 'Pharmacology' },
  { id: 'diagrams', label: 'Interactive Diagrams', icon: Network, category: 'High-Yield Diagrams' },
  { id: 'surgery', label: 'Surgery Procedures', icon: Award, category: 'Clinical Practice' }
];

export const VisualLabHub: React.FC<VisualLabHubProps> = ({
  initialSubTab = '3d-anatomy',
  onNavigateToCase,
  onStartViva
}) => {
  const [activeTab, setActiveTab] = useState<VisualLabTab>(initialSubTab);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      {/* Visual Lab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              Integrated Visual Medicine & Simulation Center
            </span>
            <span className="text-xs text-purple-400 font-mono">10 Specialized Interactive Labs</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2">
            Visual Medicine & Diagnostics Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Explore verified 3D anatomy, DICOM radiology with window/level presets, Wiggers hemodynamic diagrams, and virtual microscopy.
          </p>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 scrollbar-thin">
        {LAB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-black shadow-glow-cyan'
                  : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  isActive ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Laboratory Container */}
      <div className="w-full min-h-[600px] rounded-3xl bg-slate-950 border border-slate-800/80 p-3 sm:p-6 shadow-glass">
        {activeTab === '3d-anatomy' && (
          <AnatomyCanvas
            onNavigateToCase={onNavigateToCase}
            onStartViva={onStartViva}
          />
        )}

        {activeTab === 'radiology-dicom' && (
          <RadiologyWorkstation />
        )}

        {activeTab === 'ecg-viewer' && (
          <EcgViewer />
        )}

        {activeTab === 'cardiac-cycle' && (
          <CardiacCycleLab />
        )}

        {activeTab === 'histology' && (
          <HistologyLab />
        )}

        {activeTab === 'pathology-slider' && (
          <AtherosclerosisSlider />
        )}

        {activeTab === 'normal-vs-abnormal' && (
          <NormalVsAbnormalSlider />
        )}

        {activeTab === 'pharmacology' && (
          <DrugJourneyVisualizer />
        )}

        {activeTab === 'diagrams' && (
          <MedicalDiagramEngine />
        )}

        {activeTab === 'surgery' && (
          <SurgeryProcedureViewer />
        )}
      </div>
    </div>
  );
};
