import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Activity, 
  HelpCircle, 
  RotateCcw, 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Bookmark, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  ExternalLink,
  Video
} from 'lucide-react';
import { BmdcLesson } from '../../types';
import { StorageService } from '../../services/storageService';
import { VideoStudioService } from '../../services/videoStudioService';
import { CARDIOVASCULAR_PILOT_QUESTIONS } from '../../data/cardiovascularPilotData';
import { EducationalVideoPlayer } from '../video-studio/EducationalVideoPlayer';
import { LessonVideoAsset } from '../../types/videoStudio';

interface LessonViewerModalProps {
  lesson: BmdcLesson;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVisualLab?: (toolId: string) => void;
}

type LessonStep = 'learn' | 'explore' | 'apply' | 'practice' | 'revise';

export const LessonViewerModal: React.FC<LessonViewerModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onNavigateToVisualLab
}) => {
  const [currentStep, setCurrentStep] = useState<LessonStep>('learn');
  const [showBangla, setShowBangla] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => StorageService.isBookmarked(lesson.id));
  const [lessonVideo, setLessonVideo] = useState<LessonVideoAsset | null>(null);

  useEffect(() => {
    if (!lesson.id) return;
    VideoStudioService.getPublishedVideos(lesson.id)
      .then((videos: LessonVideoAsset[]) => {
        if (videos && videos.length > 0) {
          setLessonVideo(videos[0]);
        } else {
          setLessonVideo(null);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch published video for lesson:', err);
        setLessonVideo(null);
      });
  }, [lesson.id]);

  if (!isOpen) return null;

  const handleToggleBookmark = () => {
    const saved = StorageService.toggleBookmark(lesson, currentStep);
    setIsBookmarked(saved);
  };

  const lessonQuestions = CARDIOVASCULAR_PILOT_QUESTIONS.filter((q) =>
    lesson.stages.practice.mcqIds.includes(q.id)
  );

  const handleSelectOption = (questionId: string, optionIndex: number, correctIndex: number, questionStem: string, options: string[], explanation: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));

    // Record quiz attempt & mistake if wrong
    if (optionIndex !== correctIndex) {
      StorageService.recordMistake({
        questionId,
        subject: lesson.subjectName,
        phase: lesson.phase,
        topic: lesson.title,
        questionStem,
        selectedAnswer: options[optionIndex],
        correctAnswer: options[correctIndex],
        explanation
      });
    } else {
      StorageService.recordQuizCompletion(lesson.subjectName, 100, 1, 1);
    }
  };

  const handleFinishLesson = () => {
    StorageService.markLessonCompleted(lesson.id);
    onClose();
  };

  const STEPS: { id: LessonStep; label: string; icon: any; stepNumber: number }[] = [
    { id: 'learn', label: '1. Learn Concept', icon: BookOpen, stepNumber: 1 },
    { id: 'explore', label: '2. Explore Visuals', icon: Sparkles, stepNumber: 2 },
    { id: 'apply', label: '3. Clinical Correlation', icon: Activity, stepNumber: 3 },
    { id: 'practice', label: '4. Practice & Quiz', icon: HelpCircle, stepNumber: 4 },
    { id: 'revise', label: '5. High-Yield Flashcards', icon: RotateCcw, stepNumber: 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-med-900 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {lesson.phase} • {lesson.subjectName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                v{lesson.version} • {lesson.status}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.estimatedMinutes} mins
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white">
              {lesson.title}
            </h2>

            {lesson.titleBn && (
              <p className="text-xs text-cyan-400/90 font-serif">
                {lesson.titleBn}
              </p>
            )}
          </div>

          {/* Action Bar (Language Toggle, Bookmark, Close) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Bangla / English Toggle */}
            <button
              onClick={() => setShowBangla(!showBangla)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                showBangla
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-glow-cyan'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {showBangla ? 'বাংলা (Bangla)' : 'English (EN)'}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Stage Stepper Navigation */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Step Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* STEP 1: LEARN */}
          {currentStep === 'learn' && (
            <div className="space-y-6">
              {/* Learning Objectives Callout */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  BM&DC Core Learning Objectives
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {lesson.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bilingual Overview */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-300">
                  {showBangla ? 'সারসংক্ষেপ (Overview)' : 'Executive Summary'}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {showBangla ? lesson.stages.learn.overviewBn : lesson.stages.learn.overviewEn}
                </p>
              </div>

              {/* Main Detailed Content with calm reading surface */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(6,23,46,0.85)] border border-[rgba(190,225,255,0.18)] shadow-xl max-w-4xl mx-auto space-y-4 text-[#F5F9FF] text-[17px] leading-[1.75] font-sans">
                <div className="whitespace-pre-line leading-relaxed font-sans select-text">
                  {showBangla ? lesson.stages.learn.detailedContentBn : lesson.stages.learn.detailedContentEn}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Key Takeaways
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {lesson.stages.learn.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: EXPLORE */}
          {currentStep === 'explore' && (
            <div className="space-y-6">
              {/* Published Educational Video Player (if available) */}
              {lessonVideo && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Curriculum-Integrated Educational Video
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Peer-reviewed illustration with timestamped chapters & knowledge checkpoints
                        </p>
                      </div>
                    </div>
                  </div>

                  <EducationalVideoPlayer
                    video={lessonVideo}
                    onQuestionCompleted={(qId, correct) => {
                      if (correct) {
                        StorageService.recordQuizCompletion(lesson.subjectName, 100, 1, 1);
                      }
                    }}
                  />
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-white">
                      Interactive Visual Exploration ({lesson.stages.explore.visualType.toUpperCase()})
                    </h3>
                  </div>
                  {onNavigateToVisualLab && (
                    <button
                      onClick={() => onNavigateToVisualLab(lesson.stages.explore.visualTargetId || '3d-anatomy')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5"
                    >
                      Open in Full Visual Lab
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300">
                  {lesson.stages.explore.description}
                </p>
              </div>

              {/* Checkpoints Grid */}
              {lesson.stages.explore.interactiveCheckpoints && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Key Anatomical & Functional Landmark Pins
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.stages.explore.interactiveCheckpoints.map((cp, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-xs font-bold text-cyan-300">
                          {showBangla && cp.nameBn ? cp.nameBn : cp.name}
                        </div>
                        <p className="text-xs text-slate-400">{cp.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: APPLY */}
          {currentStep === 'apply' && (
            <div className="space-y-6">
              {/* Clinical Correlations */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white">
                    Bedside Clinical Correlations
                  </h3>
                </div>
                <div className="space-y-3 text-xs text-slate-300">
                  {lesson.stages.apply.clinicalCorrelations.map((corr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: corr.replace(/\*\*(.*?)\*\*/g, '<strong class="text-rose-300 font-bold">$1</strong>') }} />
                  ))}
                </div>
              </div>

              {/* Linked Investigations */}
              {lesson.stages.apply.linkedInvestigations && lesson.stages.apply.linkedInvestigations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                    Diagnostic Investigations & Findings
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.stages.apply.linkedInvestigations.map((inv, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-sky-500/20 space-y-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30">
                          {inv.type}
                        </span>
                        <div className="text-xs font-bold text-white pt-1">{inv.finding}</div>
                        <p className="text-xs text-slate-400">{inv.significance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Red Flags */}
              {lesson.stages.apply.emergencyRedFlags && (
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Emergency Ward Red Flags
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {lesson.stages.apply.emergencyRedFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PRACTICE */}
          {currentStep === 'practice' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                    BM&DC Practice Assessment Questions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Answer these high-yield questions to reinforce lesson concepts and feed your Mistake Notebook.
                  </p>
                </div>
              </div>

              {lessonQuestions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isRevealed = showExplanation[q.id];
                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        Question {idx + 1} of {lessonQuestions.length}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {q.bmdcReference}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white">
                      {showBangla && q.questionStemBn ? q.questionStemBn : q.questionStem}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white';
                        if (isRevealed) {
                          if (optIdx === q.correctOptionIndex) {
                            btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                          } else if (selected === optIdx) {
                            btnClass = 'bg-rose-950/80 border-rose-500 text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx, q.correctOptionIndex, q.questionStem, q.options, q.explanation)}
                            disabled={isRevealed}
                            className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {isRevealed && optIdx === q.correctOptionIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isRevealed && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <div className="font-bold text-cyan-400">Explanation & Textbook Reference:</div>
                        <p className="text-slate-300">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 5: REVISE */}
          {currentStep === 'revise' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    High-Yield Revision & Flashcards
                  </h3>
                </div>
                <p className="text-xs text-slate-300">
                  Quick-review bullet points and interactive question-answer flashcards for rapid spaced recall.
                </p>
              </div>

              {/* Flashcards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.stages.revise.flashcards.map((fc, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 space-y-3">
                    <div className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                      Flashcard #{idx + 1}
                    </div>
                    <div className="text-xs font-bold text-white">
                      {fc.front}
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-medium">
                      Answer: {fc.back}
                    </div>
                  </div>
                ))}
              </div>

              {/* References and Attribution Footer */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                  Accredited Curricular References & Academic Sign-off
                </div>
                <ul className="text-[11px] text-slate-400 space-y-0.5">
                  {lesson.references.map((ref, idx) => (
                    <li key={idx}>• {ref}</li>
                  ))}
                </ul>
                <div className="pt-2 text-[10px] text-slate-500 font-mono">
                  Author: {lesson.author.name} ({lesson.author.designation}) • Reviewer: {lesson.reviewer?.name} • Updated: {lesson.lastUpdated}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              const idx = STEPS.findIndex((s) => s.id === currentStep);
              if (idx > 0) setCurrentStep(STEPS[idx - 1].id);
            }}
            disabled={currentStep === 'learn'}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Step
          </button>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Step {STEPS.findIndex((s) => s.id === currentStep) + 1} of 5
          </div>

          {currentStep !== 'revise' ? (
            <button
              onClick={() => {
                const idx = STEPS.findIndex((s) => s.id === currentStep);
                if (idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1].id);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-glow-cyan"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishLesson}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-glow-cyan"
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete & Save Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
