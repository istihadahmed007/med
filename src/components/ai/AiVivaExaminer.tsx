import React, { useState } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, Award, ArrowRight, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { SpeechService } from '../../services/speechService';
import { audioService } from '../../services/audioService';

interface VivaQuestion {
  level: 'Basic Foundation' | 'Pathophysiology' | 'Clinical & ECG' | 'Emergency Management';
  questionText: string;
  expectedKeywords: string[];
  modelAnswer: string;
  examinerInsight: string;
}

const SAMPLE_VIVA_SESSION: VivaQuestion[] = [
  {
    level: 'Basic Foundation',
    questionText: 'Candidate, tell me: What is the arterial blood supply of the interventricular septum and cardiac apex?',
    expectedKeywords: ['LAD', 'left anterior descending', 'anterior interventricular', 'posterior descending', 'RCA'],
    modelAnswer: 'Sir, the anterior two-thirds of the interventricular septum and cardiac apex are supplied by the Left Anterior Descending (LAD) artery, a branch of the Left Coronary Artery. The posterior one-third of the septum is supplied by the Posterior Descending Artery (PDA), usually arising from the Right Coronary Artery (RCA).',
    examinerInsight: 'Clear, concise anatomical orientation. High score for distinguishing anterior 2/3 from posterior 1/3.'
  },
  {
    level: 'Pathophysiology',
    questionText: 'What cellular events occur in the myocardium within the first 6 to 12 hours following acute coronary occlusion?',
    expectedKeywords: ['ischemia', 'ATP depletion', 'glycolysis', 'coagulative necrosis', 'edema', 'wavy fibers'],
    modelAnswer: 'Sir, within 60 seconds of occlusion, aerobic glycolysis ceases and ATP depletes. Between 4 to 12 hours, early coagulative necrosis begins with edema, hemorrhage, and microscopic wavy myofibers at the periphery. Contraction band necrosis may be observed if reperfusion occurs.',
    examinerInsight: 'Excellent knowledge of Robbins pathology timeframes. Mentions ATP depletion within seconds and coagulative necrosis by 4-12 hours.'
  },
  {
    level: 'Clinical & ECG',
    questionText: 'How do you distinguish acute STEMI from acute pericarditis on a 12-lead electrocardiogram?',
    expectedKeywords: ['reciprocal', 'PR depression', 'widespread', 'concave', 'convex'],
    modelAnswer: 'Sir, in acute STEMI, ST elevation is localized to an anatomical coronary territory (e.g. V1-V4 for anterior) with reciprocal ST depression in opposite leads, and the ST segment is typically convex upward (tombstone). In acute pericarditis, ST elevation is widespread/diffuse across almost all leads, concave upward, accompanied by pathognomonic PR segment depression, with NO reciprocal ST depression (except in aVR).',
    examinerInsight: 'Crucial clinical differentiator: presence of reciprocal changes and localized territory versus diffuse concave elevation and PR depression.'
  },
  {
    level: 'Emergency Management',
    questionText: 'A 50-year-old patient presents with anterior STEMI within 2 hours of pain onset. Outline your immediate emergency bundle and reperfusion choice.',
    expectedKeywords: ['aspirin', 'clopidogrel', 'ticagrelor', 'PCI', 'thrombolysis', 'statin', 'oxygen'],
    modelAnswer: 'Sir, the immediate bundle is Dual Antiplatelet loading (Aspirin 300 mg chewed + Ticagrelor 180 mg or Clopidogrel 300-600 mg), high-intensity statin (Atorvastatin 80 mg), and sublingual GTN for pain relief. Oxygen is given only if SpO2 < 90%. Primary PCI (door-to-balloon < 90 min) is the gold standard reperfusion. If PCI transfer time exceeds 120 min, emergency thrombolysis with IV Streptokinase is administered within 30 min of arrival.',
    examinerInsight: 'Flawless emergency protocol adhering to ESC/ACC guidelines. Correctly reserves oxygen only for hypoxia.'
  }
];

export const AiVivaExaminer: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);
  const [feedback, setFeedback] = useState<{
    scorePercent: number;
    grade: string;
    matchedKeywords: string[];
    missingKeywords: string[];
    critique: string;
  } | null>(null);

  const q = SAMPLE_VIVA_SESSION[currentQIndex];

  const handleSpeakQuestion = () => {
    SpeechService.speak(q.questionText);
  };

  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (stopListeningFn) stopListeningFn();
      setIsListening(false);
      setStopListeningFn(null);
    } else {
      setIsListening(true);
      const stop = SpeechService.startListening(
        (transcript) => {
          setStudentAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        (error) => {
          console.warn('Speech error:', error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
      setStopListeningFn(() => stop);
    }
  };

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;

    const lowerAns = studentAnswer.toLowerCase();
    const matched = q.expectedKeywords.filter((kw) => lowerAns.includes(kw.toLowerCase()));
    const missing = q.expectedKeywords.filter((kw) => !lowerAns.includes(kw.toLowerCase()));

    const scorePercent = Math.min(100, Math.round((matched.length / q.expectedKeywords.length) * 100));

    let grade = 'Needs Revision';
    let critique = 'Your answer missed essential core concepts. Review the model answer below.';

    if (scorePercent >= 75) {
      grade = 'Honours / Distinction';
      critique = 'Outstanding answer! Precise medical terminology, logical clinical reasoning, and thorough grasp of concepts.';
      audioService.playSuccessTone();
    } else if (scorePercent >= 50) {
      grade = 'Clear Pass';
      critique = 'Good foundational answer. You mentioned key landmarks, but elaboration on pathophysiology or clinical criteria will secure higher marks.';
    } else {
      audioService.playAlertBeep();
    }

    setFeedback({
      scorePercent,
      grade,
      matchedKeywords: matched,
      missingKeywords: missing,
      critique,
    });
  };

  const handleNextQuestion = () => {
    if (currentQIndex < SAMPLE_VIVA_SESSION.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setStudentAnswer('');
      setFeedback(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              AI Viva Voce Examiner • BM&DC Pattern
            </span>
            <span className="text-xs text-slate-400">Cardiovascular Medicine</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-2">
            Oral Examination & Medical Reasoning Simulator
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Progressive questioning from basic anatomical foundations to acute bedside management with real-time speech and rubric evaluation.
          </p>
        </div>

        {/* Question Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
          Question {currentQIndex + 1} of {SAMPLE_VIVA_SESSION.length}
        </div>
      </div>

      {/* Examiner Prompt Card */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-amber-500/30 shadow-glow-rose space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Viva Level: {q.level}
          </span>
          <button
            onClick={handleSpeakQuestion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Speak Question</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            "{q.questionText}"
          </p>
        </div>

        {/* Student Response Area (Voice or Text) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">Your Viva Response:</span>
            <button
              onClick={handleToggleVoiceInput}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{isListening ? 'Listening (Speak now)...' : 'Use Voice Input'}</span>
            </button>
          </div>

          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            rows={4}
            placeholder="Speak into microphone or type your formal medical viva response here..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />

          <button
            onClick={handleEvaluateAnswer}
            disabled={!studentAnswer.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Submit Viva Answer for Examiner Critique</span>
          </button>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Examiner Verdict:</span>
                <span className="text-lg font-bold text-white">
                  {feedback.grade} ({feedback.scorePercent}%)
                </span>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                feedback.scorePercent >= 75
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : feedback.scorePercent >= 50
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
              }`}>
                {feedback.grade}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {feedback.critique}
            </p>

            {/* Model Viva Answer */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                Gold-Standard Model Viva Answer:
              </span>
              <p className="text-xs text-cyan-100/90 leading-relaxed italic">
                {q.modelAnswer}
              </p>
            </div>

            {/* Next Question Button */}
            {currentQIndex < SAMPLE_VIVA_SESSION.length - 1 && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Next Question ({SAMPLE_VIVA_SESSION[currentQIndex + 1].level})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
