import React, { useState } from 'react';
import { QUESTION_BANK } from '../../data/questionsData';
import { HelpCircle, CheckCircle2, XCircle, Award, BookOpen, Clock, RotateCcw } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

export const QuestionBankView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'MCQ' | 'SAQ' | 'VIVA'>('MCQ');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const filteredQuestions = QUESTION_BANK.filter((q) => {
    const matchType = q.type === selectedType;
    const matchSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    return matchType && matchSubject;
  });

  const handleSelectOption = (questionId: string, optionIndex: number, correctIndex?: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));

    if (optionIndex === correctIndex) {
      audioService.playSuccessTone();
      StorageService.recordQuizCompletion(questionId, 100, 1, 1);
    } else {
      audioService.playAlertBeep();
      StorageService.recordQuizCompletion(questionId, 0, 0, 1);
      const qItem = QUESTION_BANK.find((q) => q.id === questionId);
      if (qItem && qItem.options && typeof correctIndex === 'number') {
        StorageService.recordMistake({
          questionId,
          subject: qItem.subject,
          phase: qItem.phase,
          topic: qItem.topic,
          questionStem: qItem.questionStem,
          selectedAnswer: qItem.options[optionIndex],
          correctAnswer: qItem.options[correctIndex],
          explanation: qItem.explanation
        });
      }
    }
  };

  const subjects = ['All', 'Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Medicine'];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            BM&DC Question Bank
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Professional Examination Question Bank
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Authentic Single Best Answer (SBA) MCQs, structured SAQs, and viva scenarios with referenced explanations.
          </p>
        </div>

        {/* Question Type Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-slate-800">
          {(['MCQ', 'SAQ', 'VIVA'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedType === t
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedSubject === sub
                ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="medx-empty-state p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-cyan-500/50 mx-auto" />
            <h4 className="text-base font-semibold text-slate-200">No questions found</h4>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              No questions match the current filter criteria for "{selectedSubject}". Try selecting "All" or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedType('MCQ');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const userOption = selectedAnswers[q.id];
            const isCorrect = userOption === q.correctOptionIndex;

            return (
              <div key={q.id} className="glass-panel-elevated p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  {q.subject} • {q.phase}
                </span>
                <span className="text-xs text-slate-400 font-mono">Q{qIndex + 1}</span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {q.questionStem}
              </h3>

              {/* Multiple Choice Options */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userOption === optIdx;
                    const isTheCorrectOption = q.correctOptionIndex === optIdx;

                    let btnStyle = 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isAnswered) {
                      if (isTheCorrectOption) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctOptionIndex)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold uppercase text-slate-400 shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isAnswered && isTheCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isAnswered && isSelected && !isTheCorrectOption && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* SAQ / Viva Explanation Reveal */}
              {q.type !== 'MCQ' && (
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setShowExplanations((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-semibold border border-cyan-500/30"
                  >
                    {showExplanations[q.id] ? 'Hide Model Explanation' : 'Reveal Model Answer'}
                  </button>
                </div>
              )}

              {/* Explanation & Reference Card */}
              {showExplanations[q.id] && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2 animate-in fade-in duration-200 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold uppercase">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>BM&DC Model Explanation</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {q.explanation}
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    <strong>Reference: </strong>{q.bmdcReference}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
      </div>
    </div>
  );
};
