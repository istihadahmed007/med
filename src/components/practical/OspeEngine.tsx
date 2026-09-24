import React, { useState, useEffect } from 'react';
import { OSPE_STATIONS } from '../../data/ospeOsceData';
import { Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const OspeEngine: React.FC = () => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const station = OSPE_STATIONS[currentStationIndex];

  const [timeLeft, setTimeLeft] = useState<number>(station.timeSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  // Timer countdown
  useEffect(() => {
    setTimeLeft(station.timeSeconds);
    setIsTimerRunning(true);
    setAnswers({});
    setSubmitted(false);
    setScores({});
  }, [currentStationIndex, station.timeSeconds]);

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, submitted]);

  const handleInputChange = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleAutoSubmit = () => {
    calculateScore();
    setSubmitted(true);
    setIsTimerRunning(false);
    audioService.playAlertBeep();
  };

  const calculateScore = () => {
    const newScores: Record<string, number> = {};
    station.questions.forEach((q) => {
      const studentAns = (answers[q.id] || '').trim().toLowerCase();
      const isMatch = q.acceptableAnswers.some((acceptable) =>
        studentAns.includes(acceptable.toLowerCase())
      );
      newScores[q.id] = isMatch ? q.marks : 0;
    });
    setScores(newScores);
  };

  const totalScore: number = Object.values(scores).reduce<number>((a, b) => a + Number(b), 0);
  const maxScore: number = station.questions.reduce<number>((a, b) => a + b.marks, 0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Station Header & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              OSPE Station 0{station.stationNumber} • {station.subject}
            </span>
            <span className="text-xs text-slate-400">{station.phase}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            {station.title}
          </h1>
        </div>

        {/* Countdown Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
          timeLeft < 30
            ? 'bg-rose-950/60 border-rose-500 text-rose-400 shadow-glow-rose animate-pulse'
            : 'bg-slate-900/90 border-cyan-500/30 text-cyan-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Station Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {OSPE_STATIONS.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => setCurrentStationIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              idx === currentStationIndex
                ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-glow-cyan'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Station {st.stationNumber}: {st.subject}
          </button>
        ))}
      </div>

      {/* Main OSPE Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Specimen Card (5 cols) */}
        <div className="lg:col-span-5 glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Practical Specimen / Station Pointer
          </span>

          {/* Visual representation */}
          <div className="w-full h-56 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden text-center">
            {station.specimenType === '3d-heart' ? (
              <div className="relative flex flex-col items-center w-full h-full justify-center">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-glass flex items-center justify-center">
                  <img
                    src="/anatomy/heart/organ.webp"
                    alt="Gross Human Cardiac Specimen"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                  <div className="absolute top-12 left-16 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 border border-white animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400 shadow-glow-cyan">
                      Pointer (A)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white mt-2">Gross Cardiac Specimen</span>
                <span className="text-[11px] text-slate-400">Pointer placed in anterior interventricular sulcus</span>
              </div>
            ) : station.specimenType === 'histology-slide' ? (
              <div className="relative flex flex-col items-center w-full h-full justify-center">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-700 bg-slate-950 shadow-glass flex items-center justify-center">
                  <img
                    src="/anatomy/heart/microscopic.webp"
                    alt="Histopathology Specimen"
                    className="w-full h-full object-cover"
                  />
                  <span className="text-[10px] text-amber-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-amber-400/50 absolute bottom-2">
                    40x High-Power
                  </span>
                </div>
                <span className="text-xs font-bold text-white mt-2">Histopathology Slide</span>
                <span className="text-[11px] text-slate-400">Striated myocardium with intercalated discs</span>
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-28 rounded-t-lg bg-amber-600/30 border border-amber-500 flex flex-col items-center justify-center p-1">
                  <span className="text-[9px] font-mono text-amber-300 rotate-90 whitespace-nowrap">FUROSEMIDE</span>
                </div>
                <span className="text-xs font-bold text-white mt-3">Emergency Drug Ampoule</span>
                <span className="text-[11px] text-slate-400">Identify clinical pharmacology</span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-300 text-center leading-relaxed">
            {station.instructions}
          </p>
        </div>

        {/* Right: Question & Answer Area (7 cols) */}
        <div className="lg:col-span-7 glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 space-y-5">
          <div className="space-y-4">
            {station.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                    {q.prompt}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
                    [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                  </span>
                </div>

                {/* Answer Input */}
                {!submitted ? (
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                ) : (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Your Answer: <strong className="text-white font-mono">{answers[q.id] || '(No answer provided)'}</strong></span>
                      <span className={`font-bold flex items-center gap-1 ${scores[q.id] > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {scores[q.id] > 0 ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {scores[q.id]} / {q.marks}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-[11px] text-cyan-200">
                      <strong className="text-cyan-300">Examiner Key: </strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Footer */}
          {!submitted ? (
            <button
              onClick={handleAutoSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Station Answers</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Station Score:</span>
                <span className="text-xl font-bold text-cyan-400 font-mono">
                  {totalScore} / {maxScore} ({Math.round((totalScore / maxScore) * 100)}%)
                </span>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTimeLeft(station.timeSeconds);
                  setIsTimerRunning(true);
                  setAnswers({});
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Station</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
