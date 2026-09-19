import React, { useState } from 'react';
import { DrugGeneric } from '../../types/drug';

interface PharmacologyStudyWorkspaceProps {
  generic: DrugGeneric;
  onClose: () => void;
  onOpenAcrossBooksTopic?: (topicId: string) => void;
}

export const PharmacologyStudyWorkspace: React.FC<PharmacologyStudyWorkspaceProps> = ({
  generic,
  onClose,
  onOpenAcrossBooksTopic
}) => {
  const learning = generic.pharmacologyLearning;
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [revealedFlashcards, setRevealedFlashcards] = useState<Record<string, boolean>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [showCaseDiscussion, setShowCaseDiscussion] = useState(false);

  const toggleAnswer = (index: number) => {
    setRevealedAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleFlashcard = (id: string) => {
    setRevealedFlashcards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (sbaId: string, optIndex: number) => {
    setSelectedOptions(prev => ({ ...prev, [sbaId]: optIndex }));
  };

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="study-title">
      <div className="monograph-content-card max-w-4xl">
        {/* Header Bar */}
        <div className="monograph-header-bar bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-slate-900">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                MBBS Pharmacology Study Centre
              </span>
              <span className="text-xs text-slate-400">BM&DC Curriculum Aligned</span>
            </div>
            <h2 id="study-title" className="mt-1 text-2xl font-extrabold text-white flex items-center gap-2">
              <span>🎓</span> {generic.name} — Pharmacology Masterclass
            </h2>
            <div className="monograph-meta-row">
              <span className="text-sky-300 font-semibold">{generic.pharmacologicalClass}</span>
              <span>•</span>
              <span className="text-indigo-300">{generic.bmdcCurriculumPhase || 'Phase 2 Pharmacology'}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            aria-label="Close study workspace"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="monograph-body-content space-y-6">
          {/* Section 1: Molecular Receptor & Step-by-Step Mechanism */}
          <div className="clinical-section-card bg-slate-900/80">
            <h3 className="clinical-section-title text-sky-400 flex items-center gap-2">
              <span>🧬</span> 1. Molecular Receptor & Physiological Pathway
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Receptor / Target:</span>
                <div className="text-white font-bold text-base mt-0.5">{generic.receptorOrTarget}</div>
              </div>

              {learning?.pathwaySummary && (
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 font-mono text-xs text-indigo-200 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                    Signaling Sequence / Mechanism Flow:
                  </span>
                  {learning.pathwaySummary}
                </div>
              )}

              <p className="text-sm text-slate-300 leading-relaxed">
                {generic.mechanismOfAction}
              </p>
            </div>
          </div>

          {/* Section 2: Viva Voce High-Yield Questions & Model Answers */}
          {learning?.vivaQuestions && learning.vivaQuestions.length > 0 && (
            <div className="clinical-section-card">
              <h3 className="clinical-section-title text-amber-300 flex items-center gap-2">
                <span>🗣️</span> 2. High-Yield Viva Questions & Examiner Expectations
              </h3>
              <div className="space-y-3">
                {learning.vivaQuestions.map((viva, idx) => (
                  <div key={idx} className="viva-question-card">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="viva-q-title">Q{idx + 1}: {viva.question}</div>
                        {viva.questionBn && <div className="viva-q-bn">{viva.questionBn}</div>}
                      </div>
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 text-xs font-semibold shrink-0 transition"
                      >
                        {revealedAnswers[idx] ? 'Hide Answer' : 'Show Answer 👁️'}
                      </button>
                    </div>

                    {revealedAnswers[idx] && (
                      <div className="viva-model-answer">
                        <span className="text-xs font-bold text-sky-400 uppercase block mb-1">
                          Examiner Model Answer:
                        </span>
                        {viva.modelAnswer}
                      </div>
                    )}

                    {viva.highYieldPearl && (
                      <div className="viva-highyield-pearl">
                        <span>💡</span>
                        <span>Gold Pearl: {viva.highYieldPearl}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Rapid Recall Flashcards */}
          {learning?.recallFlashcards && learning.recallFlashcards.length > 0 && (
            <div className="clinical-section-card">
              <h3 className="clinical-section-title text-indigo-300 flex items-center gap-2">
                <span>🎴</span> 3. Rapid Recall Active Flashcards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learning.recallFlashcards.map(fc => (
                  <div
                    key={fc.id}
                    onClick={() => toggleFlashcard(fc.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer select-none flex flex-col justify-between min-h-[110px] ${
                      revealedFlashcards[fc.id]
                        ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-950/40'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        <span>{fc.topic}</span>
                        {fc.highYield && <span className="text-amber-400">★ High Yield</span>}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {revealedFlashcards[fc.id] ? fc.back : fc.front}
                      </div>
                    </div>
                    <div className="text-[11px] text-sky-400 font-medium text-right mt-2">
                      {revealedFlashcards[fc.id] ? '✓ Click to flip back' : 'Tap to reveal answer 🔄'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Single Best Answer (SBA / MCQ) Practice */}
          {learning?.practiceSba && learning.practiceSba.length > 0 && (
            <div className="clinical-section-card">
              <h3 className="clinical-section-title text-emerald-300 flex items-center gap-2">
                <span>📝</span> 4. BM&DC Single Best Answer (SBA) Practice
              </h3>
              <div className="space-y-4">
                {learning.practiceSba.map((sba, sbaIdx) => {
                  const selected = selectedOptions[sba.id];
                  const hasAnswered = typeof selected === 'number';

                  return (
                    <div key={sba.id} className="sba-quiz-card">
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        Question {sbaIdx + 1} • {sba.bmdcFocus || 'Phase 2 Pharmacology'}
                      </div>
                      <div className="text-sm font-bold text-white mb-3 leading-relaxed">
                        {sba.question}
                      </div>

                      <div className="space-y-1.5">
                        {sba.options.map((opt, optIdx) => {
                          let optClass = 'sba-option-btn';
                          if (hasAnswered) {
                            if (optIdx === sba.correctIndex) {
                              optClass += ' correct';
                            } else if (optIdx === selected) {
                              optClass += ' incorrect';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(sba.id, optIdx)}
                              className={optClass}
                            >
                              <span className="font-bold mr-2">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
                          <strong className={selected === sba.correctIndex ? 'text-emerald-400' : 'text-rose-400'}>
                            {selected === sba.correctIndex ? '✓ Correct Answer!' : '✗ Incorrect!'}
                          </strong>
                          <div className="mt-1 leading-relaxed">{sba.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 5: Clinical Case Scenario */}
          {learning?.clinicalCaseScenario && (
            <div className="clinical-section-card bg-slate-900/90 border-slate-800">
              <h3 className="clinical-section-title text-sky-400 flex items-center gap-2">
                <span>🩺</span> 5. Integrated Clinical Case Scenario
              </h3>
              <div className="space-y-3 text-sm">
                <div className="font-bold text-white text-base">
                  {learning.clinicalCaseScenario.title}
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <p><strong>Patient:</strong> {learning.clinicalCaseScenario.patientProfile}</p>
                  <p><strong>Presentation:</strong> {learning.clinicalCaseScenario.presentation}</p>
                  <p className="text-amber-300 font-semibold">
                    <strong>Clinical Problem:</strong> {learning.clinicalCaseScenario.clinicalQuestion}
                  </p>
                </div>

                <button
                  onClick={() => setShowCaseDiscussion(!showCaseDiscussion)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 text-xs font-semibold transition"
                >
                  {showCaseDiscussion ? 'Hide Discussion' : 'Reveal Pharmacological Discussion 💡'}
                </button>

                {showCaseDiscussion && (
                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-sky-400 block mb-1">Clinical Pharmacologist Assessment:</strong>
                    {learning.clinicalCaseScenario.discussion}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 6: Verified Textbook References */}
          {learning?.textbookReferences && learning.textbookReferences.length > 0 && (
            <div className="clinical-section-card">
              <h3 className="clinical-section-title text-indigo-300 flex items-center gap-2">
                <span>📚</span> 6. Verified Textbook Reading References
              </h3>
              <div className="space-y-2 text-xs">
                {learning.textbookReferences.map((ref, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-sm">{ref.bookTitle} ({ref.edition})</div>
                      <div className="text-slate-400 mt-0.5">{ref.chapterOrSection}</div>
                    </div>
                    {ref.verifiedTextbookId && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                        Indexed in Library
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 7: Across Books Connection */}
          {learning?.acrossBooksTopicIds && learning.acrossBooksTopicIds.length > 0 && onOpenAcrossBooksTopic && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">Study Across Books Multi-Subject Connection</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Seamlessly bridge this drug with Anatomy, Physiology, Pathology, and Medicine perspectives.
                </p>
              </div>
              <div className="flex gap-2">
                {learning.acrossBooksTopicIds.map(topicId => (
                  <button
                    key={topicId}
                    onClick={() => onOpenAcrossBooksTopic(topicId)}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30"
                  >
                    Open Topic: {topicId.replace(/-/g, ' ')} →
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
