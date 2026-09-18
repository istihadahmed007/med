import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { VideoQuizQuestion } from '../../types/videoStudio';
import { VideoStudioService } from '../../services/videoStudioService';

interface VideoAssessmentQuizProps {
  videoId: string;
  questions?: VideoQuizQuestion[];
  studentId?: string;
  onQuizCompleted?: (score: number, total: number) => void;
}

export const VideoAssessmentQuiz: React.FC<VideoAssessmentQuizProps> = ({
  videoId,
  questions = [],
  studentId = 'std-bmdc-2026-0891',
  onQuizCompleted
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
        <HelpCircle size={32} className="mx-auto text-slate-500 mb-2" />
        <p className="text-sm font-semibold">No assessment questions configured for this lesson yet.</p>
      </div>
    );
  }

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    onQuizCompleted?.(score, questions.length);

    VideoStudioService.saveProgress({
      videoId,
      studentId,
      demonstratedUnderstanding: score >= Math.ceil(questions.length * 0.6),
      answeredQuestionIds: Object.keys(selectedAnswers)
    }).catch(() => {});
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="video-quiz-container bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">BM&DC Formative Assessment</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Post-Video Clinical Quiz ({questions.length} Questions)</h3>
        </div>
        {submitted && (
          <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-bold text-sm ${
            percentage >= 70
              ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
              : 'bg-amber-950/80 border-amber-700 text-amber-300'
          }`}>
            <Award size={16} />
            <span>Score: {score} / {questions.length} ({percentage}%)</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctOptionIndex;

          return (
            <article
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-900/50'
                    : 'bg-rose-950/20 border-rose-900/50'
                  : 'bg-slate-950/40 border-slate-800/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-100 leading-snug">{q.question}</h4>
                  {q.questionBn && (
                    <p className="text-xs text-slate-400 mt-1">{q.questionBn}</p>
                  )}

                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userChoice === optIdx;
                      const isTargetCorrect = optIdx === q.correctOptionIndex;

                      let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white';
                      if (submitted) {
                        if (isTargetCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-medium';
                        } else if (isSelected && !isTargetCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-900/70 border-cyan-500 text-cyan-200 font-medium shadow-glow-blue';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`text-left px-3.5 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="flex-1">{opt}</span>
                          {submitted && isTargetCorrect && (
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0 ml-2" />
                          )}
                          {submitted && isSelected && !isTargetCorrect && (
                            <XCircle size={14} className="text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300">
                      <span className="font-bold text-cyan-400 block mb-1">Clinical Rationale:</span>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-glow-blue ${
              allAnswered
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Submit Assessment ({Object.keys(selectedAnswers).length}/{questions.length} answered)
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Retry Quiz
            </button>
            <span className="text-xs text-slate-400">
              {percentage >= 70 ? '✓ Demonstrated clinical competency.' : 'Review rationales and retry for mastery.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAssessmentQuiz;
