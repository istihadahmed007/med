import React, { useState, useEffect } from 'react';
import { OSCE_STATIONS } from '../../data/ospeOsceData';
import { Clock, User, CheckSquare, Square, Award, AlertCircle, ArrowRight, BookOpen, Volume2 } from 'lucide-react';
import { SpeechService } from '../../services/speechService';
import { audioService } from '../../services/audioService';

export const OsceEngine: React.FC = () => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const station = OSCE_STATIONS[currentStationIndex];

  const [timeLeft, setTimeLeft] = useState<number>(station.timeSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [checkedRubricItems, setCheckedRubricItems] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setTimeLeft(station.timeSeconds);
    setIsTimerRunning(true);
    setCheckedRubricItems({});
    setIsCompleted(false);
  }, [currentStationIndex, station.timeSeconds]);

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isCompleted]);

  const toggleRubric = (index: number) => {
    setCheckedRubricItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const currentScore = station.markingRubric.reduce(
    (acc, item, idx) => (checkedRubricItems[idx] ? acc + item.points : acc),
    0
  );
  const maxScore = station.markingRubric.reduce((acc, item) => acc + item.points, 0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSpeakScenario = () => {
    SpeechService.speak(`Candidate Instructions: ${station.candidateInstructions}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 px-3 py-1 rounded-full border border-blue-500/30">
              OSCE Station 0{station.stationNumber} • {station.domain}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            {station.title}
          </h1>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
          timeLeft < 60
            ? 'bg-rose-950/60 border-rose-500 text-rose-400 shadow-glow-rose animate-pulse'
            : 'bg-slate-900/90 border-blue-500/30 text-blue-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Station Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {OSCE_STATIONS.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => setCurrentStationIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              idx === currentStationIndex
                ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-glow-blue'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Station {st.stationNumber}: {st.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Two Columns: Instructions & Patient Brief vs Marking Rubric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Patient Scenario & Candidate Brief (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel-elevated p-6 rounded-2xl border border-blue-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Simulated Patient Brief
              </span>
              <button
                onClick={handleSpeakScenario}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                title="Read aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-slate-300 block mb-1">Clinical Scenario:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {station.patientScenario}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30">
              <span className="text-xs font-bold text-blue-300 block mb-1">Candidate Instructions:</span>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                {station.candidateInstructions}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30">
              <span className="text-xs font-bold text-purple-300 block mb-1">Standardized Patient Cue Script:</span>
              <p className="text-xs italic text-purple-200 leading-relaxed">
                "{station.patientScript}"
              </p>
            </div>
          </div>
        </div>

        {/* Right: Faculty Examiner Marking Rubric (7 cols) */}
        <div className="lg:col-span-7 glass-panel-elevated p-6 rounded-2xl border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Examiner Objective Marking Rubric
              </h3>
              <p className="text-[11px] text-slate-400">
                Check off competencies demonstrated during the station encounter.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current Score:</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {currentScore} / {maxScore}
              </span>
            </div>
          </div>

          {/* Rubric Checkpoints */}
          <div className="space-y-2.5">
            {station.markingRubric.map((item, idx) => {
              const isChecked = !!checkedRubricItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleRubric(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-blue-950/40 border-cyan-400 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <button className="mt-0.5 text-cyan-400 shrink-0">
                    {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                  </button>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-200">{item.item}</span>
                      <span className="font-mono font-semibold text-cyan-400 shrink-0">+{item.points} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {item.criteria}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete Station Evaluation */}
          <button
            onClick={() => {
              setIsCompleted(true);
              setIsTimerRunning(false);
              audioService.playSuccessTone();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Finalize Station Evaluation & Debrief</span>
          </button>

          {/* Summary Report on Completion */}
          {isCompleted && (
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2 animate-in fade-in duration-300">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Examiner Debrief & Model Performance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {station.modelPerformanceSummary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
