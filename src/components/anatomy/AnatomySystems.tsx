import React from 'react';
import { Layers, Globe, Compass } from 'lucide-react';
import { AnatomicalSystemId, AnatomicalRegion } from '../../types/anatomy';

interface AnatomySystemsProps {
  activeClassification: 'systemic' | 'regional';
  onChangeClassification: (cls: 'systemic' | 'regional') => void;
  selectedSystem: AnatomicalSystemId | 'all';
  onSelectSystem: (system: AnatomicalSystemId | 'all') => void;
  selectedRegion: AnatomicalRegion | 'all';
  onSelectRegion: (region: AnatomicalRegion | 'all') => void;
}

const REGIONS: { id: AnatomicalRegion; name: string }[] = [
  { id: 'head-neck', name: 'Head & Neck' },
  { id: 'thorax', name: 'Thorax' },
  { id: 'abdomen', name: 'Abdomen' },
  { id: 'pelvis-perineum', name: 'Pelvis & Perineum' },
  { id: 'upper-limb', name: 'Upper Limb' },
  { id: 'lower-limb', name: 'Lower Limb' },
  { id: 'neuroanatomy', name: 'Neuroanatomy' }
];

const SYSTEMS: { id: AnatomicalSystemId; name: string }[] = [
  { id: 'cardiovascular', name: 'Cardiovascular' },
  { id: 'respiratory', name: 'Respiratory' },
  { id: 'nervous', name: 'Nervous' },
  { id: 'digestive', name: 'Digestive' },
  { id: 'urinary', name: 'Urinary' },
  { id: 'skeletal', name: 'Skeletal' },
  { id: 'muscular', name: 'Muscular' },
  { id: 'lymphatic', name: 'Lymphatic' },
  { id: 'skin', name: 'Integument' },
  { id: 'reproductive', name: 'Reproductive' }
];

export const AnatomySystems: React.FC<AnatomySystemsProps> = ({
  activeClassification,
  onChangeClassification,
  selectedSystem,
  onSelectSystem,
  selectedRegion,
  onSelectRegion
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
      {/* Classification Mode Switcher */}
      <div className="glass-panel p-1 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-1 shadow-lg">
        <button
          onClick={() => onChangeClassification('systemic')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeClassification === 'systemic'
              ? 'bg-cyan-500 text-black shadow-glow-cyan font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Systemic
        </button>
        <button
          onClick={() => onChangeClassification('regional')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeClassification === 'regional'
              ? 'bg-cyan-500 text-black shadow-glow-cyan font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Regional
        </button>
      </div>

      {/* Dynamic Sub-Filter Pills */}
      <div className="glass-panel px-2 py-1 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md flex items-center gap-1.5 overflow-x-auto max-w-[50vw] custom-scrollbar shadow-lg">
        {activeClassification === 'systemic' ? (
          <>
            <button
              onClick={() => onSelectSystem('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedSystem === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Systems
            </button>
            {SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                onClick={() => onSelectSystem(sys.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedSystem === sys.id
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sys.name}
              </button>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={() => onSelectRegion('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedRegion === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Regions
            </button>
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => onSelectRegion(reg.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedRegion === reg.id
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
