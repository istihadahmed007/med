import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  ClipboardList, 
  Timer,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { OspeStation } from '../../types/anatomy';
import { OSPE_STATIONS_DATA } from '../../data/anatomyOspeData';
import { audioService } from '../../services/audioService';

interface AnatomyOSPEProps {
  onSelectStation: (station: OspeStation) => void;
  onCloseOSPE: () => void;
}

export const AnatomyOSPE: React.FC<AnatomyOSPEProps> = ({
  onSelectStation,
  onCloseOSPE
}) => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  const station = OSPE_STATIONS_DATA[currentStationIndex] || OSPE_STATIONS_DATA[0];
  const question = station.questions[currentQuestionIndex] || station.questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setTotalAttempted((prev) => prev + 1);

    const isCorrect = selectedOption === question.correctOptionIndex;
    if (isCorrect) {
      setScore((prev) => prev + question.bmdcMarks);
      audioService.playSuccessTone();
    } else {
      audioService.playAlertBeep();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < station.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentStationIndex < OSPE_STATIONS_DATA.length - 1) {
      const nextStation = OSPE_STATIONS_DATA[currentStationIndex + 1];
      setCurrentStationIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      onSelectStation(nextStation);
    } else {
      // Completed all stations
      alert(`OSPE Examination Completed! Final Score: ${score} marks.`);
      onCloseOSPE();
    }
  };

  return (
    <div className="w-full md:w-[420px] glass-panel-elevated rounded-2xl border border-rose-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/95 flex flex-col max-h-[85vh] overflow-hidden pointer-events-auto transition-all animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 bg-rose-950/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              OSPE Practical Station {station.stationNumber} of {OSPE_STATIONS_DATA.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Score: <span className="text-rose-400 font-bold">{score}</span> marks
            </div>
          </div>
        </div>

        <button
          onClick={onCloseOSPE}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
        >
          Exit OSPE
        </button>
      </div>

      {/* Pin Information Banner */}
      <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full inline-block animate-ping"
            style={{ backgroundColor: station.pinColor }}
          />
          <span className="font-bold text-slate-200">{station.pinLabel}</span>
        </div>
        <span className="text-[11px] text-slate-400">BMDC Spotting Station</span>
      </div>

      {/* Question Body */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Question {currentQuestionIndex + 1} ({question.bmdcMarks} Marks)
          </div>
          <p className="text-sm font-semibold text-white leading-relaxed">
            {question.prompt}
          </p>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = isAnswerSubmitted && idx === question.correctOptionIndex;
            const isWrong = isAnswerSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : isWrong
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isWrong ? (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-black font-bold' : 'border-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                  )}
                </div>
                <span className="text-xs leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Card (Shown after submit) */}
        {isAnswerSubmitted && (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs animate-in fade-in">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              OSPE Examination Rationale:
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {question.explanation}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300/90">
              <span className="font-bold">Clinical Significance: </span>
              {question.clinicalRelevance}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="text-[11px] text-slate-400 font-mono">
          Question {currentQuestionIndex + 1}/{station.questions.length}
        </div>

        {!isAnswerSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-glow-rose'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            Next Question
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
