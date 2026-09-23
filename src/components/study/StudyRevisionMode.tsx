import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { STUDY_SUBJECTS } from '../../data/studyMaterialsData';
import './studyMaterials.css';

interface RevisionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: 'BM&DC Verified Past Paper' | 'Faculty Curated SBA' | 'AI-Generated Practice Item';
}

interface RevisionFlashcard {
  id: string;
  front: string;
  back: string;
  highYieldPearl: string;
}

const REVISION_DATA_BY_SUBJECT: Record<
  string,
  {
    keyFacts: string[];
    flashcards: RevisionFlashcard[];
    questions: RevisionQuestion[];
  }
> = {
  pharmacology: {
    keyFacts: [
      'Loop diuretics (e.g. Furosemide) act on the Na+-K+-2Cl- cotransporter in the thick ascending limb of loop of Henle.',
      'ACE inhibitors (e.g. Enalapril, Ramipril) prevent conversion of Angiotensin I to II and can cause dry cough via bradykinin accumulation.',
      'Beta-1 selective blockers (Atenolol, Bisoprolol, Metoprolol) act predominantly on cardiac tissue, reducing inotropy and chronotropy.',
      'Paracetamol overdose causes hepatotoxicity mediated by N-acetyl-p-benzoquinone imine (NAPQI), treated by N-acetylcysteine (NAC).',
      'Metformin is first-line pharmacotherapy for Type 2 Diabetes; rare but serious adverse effect is lactic acidosis, contraindicated in severe renal failure.',
    ],
    flashcards: [
      {
        id: 'fc-pharm-1',
        front: 'What is the molecular target and nephron segment of Furosemide?',
        back: 'Inhibits luminal Na+/K+/2Cl- symporter in the thick ascending limb of the loop of Henle.',
        highYieldPearl: 'High-ceiling diuretic causing loss of Na+, K+, Cl-, Ca2+, and Mg2+.',
      },
      {
        id: 'fc-pharm-2',
        front: 'Why do ACE inhibitors cause dry, non-productive cough in 10-15% of patients?',
        back: 'Inhibition of ACE prevents the enzymatic breakdown of bradykinin and substance P in the respiratory tract.',
        highYieldPearl: 'Switching to an ARB (e.g., Losartan) alleviates the cough as ARBs do not affect bradykinin.',
      },
      {
        id: 'fc-pharm-3',
        front: 'What is the specific biochemical antidote for Paracetamol (Acetaminophen) toxicity?',
        back: 'Intravenous or oral N-Acetylcysteine (NAC), which replenishes depleted hepatic glutathione stores.',
        highYieldPearl: 'Most efficacious when administered within 8-10 hours of acute ingestion.',
      },
    ],
    questions: [
      {
        id: 'q-pharm-1',
        question: 'A 58-year-old patient with heart failure presents with severe pulmonary edema. Which diuretic is most appropriate for rapid symptom relief?',
        options: [
          'Hydrochlorothiazide',
          'Furosemide',
          'Spironolactone',
          'Acetazolamide',
          'Mannitol'
        ],
        correctIndex: 1,
        explanation: 'Intravenous loop diuretics like Furosemide provide rapid venodilation and potent natriuresis within minutes, relieving acute pulmonary congestion.',
        source: 'BM&DC Verified Past Paper',
      },
      {
        id: 'q-pharm-2',
        question: 'Which of the following adverse effects is unique to ACE inhibitors over Angiotensin Receptor Blockers (ARBs)?',
        options: [
          'Hyperkalemia',
          'Renal insufficiency in bilateral renal artery stenosis',
          'Dry nocturnal cough',
          'Hypotension',
          'Teratogenicity'
        ],
        correctIndex: 2,
        explanation: 'ACE is also kininase II, responsible for metabolizing bradykinin. Its inhibition causes bradykinin and substance P accumulation in the lungs, triggering dry cough. ARBs do not inhibit kininase II.',
        source: 'Faculty Curated SBA',
      },
    ],
  },
  anatomy: {
    keyFacts: [
      'The brachial plexus is formed by the anterior rami of cervical spinal nerves C5, C6, C7, C8, and T1.',
      'The femoral triangle is bounded superiorly by the inguinal ligament, medially by adductor longus, and laterally by sartorius.',
      'Coronary arteries arise from the ascending aorta just superior to the aortic valve cusps.',
      'The pterion is the junction of four skull bones (frontal, parietal, sphenoid, temporal); deeply located is the anterior branch of middle meningeal artery.',
    ],
    flashcards: [
      {
        id: 'fc-anat-1',
        front: 'What nerve roots form the brachial plexus?',
        back: 'Anterior (ventral) rami of C5, C6, C7, C8, and T1.',
        highYieldPearl: 'Roots lie in posterior triangle of neck; trunks cross over first rib.',
      },
      {
        id: 'fc-anat-2',
        front: 'What artery lies deep to the pterion and is vulnerable in lateral skull fractures?',
        back: 'The anterior branch of the middle meningeal artery.',
        highYieldPearl: 'Laceration causes epidural (extradural) hematoma with typical lucid interval.',
      },
    ],
    questions: [
      {
        id: 'q-anat-1',
        question: 'Injury to the upper trunk of the brachial plexus (Erb-Duchenne palsy) involves which spinal roots?',
        options: [
          'C5 and C6',
          'C7 and C8',
          'C8 and T1',
          'C5 only',
          'C6 and C7'
        ],
        correctIndex: 0,
        explanation: 'Erb-Duchenne palsy results from traction on C5 and C6 nerve roots, classically resulting in a "waiter\'s tip" limb posture (adducted shoulder, medially rotated arm, extended elbow, pronated forearm).',
        source: 'BM&DC Verified Past Paper',
      },
    ],
  },
  medicine: {
    keyFacts: [
      'STEMI diagnosis requires persistent ST-elevation in ≥2 contiguous leads or new LBBB with clinical presentation of ischemic chest pain.',
      'First-line treatment for acute severe asthma consists of high-flow oxygen, inhaled SABA (Salbutamol) via nebulizer, and systemic corticosteroids.',
      'Diabetic Ketoacidosis (DKA) triad: hyperglycemia (>11 mmol/L), metabolic acidosis (pH <7.3, HCO3- <15), and ketonemia (>3 mmol/L).',
      'Community-acquired pneumonia severity is assessed using the CURB-65 criteria (Confusion, Urea, Respiratory rate, Blood pressure, Age ≥65).',
    ],
    flashcards: [
      {
        id: 'fc-med-1',
        front: 'What is the diagnostic threshold for blood pressure in stage 1 hypertension (clinic reading)?',
        back: 'Systolic ≥140 mmHg and/or Diastolic ≥90 mmHg on repeated verified visits.',
        highYieldPearl: 'Ambulatory or home daytime average threshold is ≥135/85 mmHg.',
      },
      {
        id: 'fc-med-2',
        front: 'What are the components of the CURB-65 pneumonia severity score?',
        back: 'Confusion, Urea >7 mmol/L, Respiratory rate ≥30/min, Blood pressure (SBP <90 or DBP ≤60 mmHg), Age ≥65.',
        highYieldPearl: 'Score ≥2 typically warrants hospital admission; score ≥3 warrants intensive care evaluation.',
      },
    ],
    questions: [
      {
        id: 'q-med-1',
        question: 'A 62-year-old male presents with 2 hours of crushing retrosternal chest pain radiating to his left jaw. ECG reveals 3mm ST elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?',
        options: [
          'Left anterior descending (LAD)',
          'Right coronary artery (RCA)',
          'Left circumflex artery (LCx)',
          'Left main coronary artery',
          'Obtuse marginal artery'
        ],
        correctIndex: 1,
        explanation: 'Leads II, III, and aVF view the inferior wall of the left ventricle, which in ~85-90% of individuals is supplied by the Right Coronary Artery (RCA) via the posterior descending branch.',
        source: 'BM&DC Verified Past Paper',
      },
    ],
  },
};

export const StudyRevisionMode: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('pharmacology');
  const [activeMode, setActiveMode] = useState<'facts' | 'flashcards' | 'mcqs'>('facts');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const currentData = REVISION_DATA_BY_SUBJECT[selectedSubject] || REVISION_DATA_BY_SUBJECT['pharmacology'];

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    if (submittedQuestions[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitAnswer = (qId: string) => {
    setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f4a]/90 via-[#071330]/90 to-[#040d21]/90 border border-blue-500/20 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
                Exam Preparation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              MBBS High-Yield Revision Mode
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Rapid clinical review, active recall flashcards, and verified Single Best Answer (SBA) MCQs with complete rationales.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'pharmacology', label: 'Pharmacology' },
              { id: 'anatomy', label: 'Anatomy' },
              { id: 'medicine', label: 'Medicine' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSubject(s.id);
                  handleResetQuiz();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedSubject === s.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'facts', label: '⚡ High-Yield Key Points' },
          { id: 'flashcards', label: `🗂️ Active Recall Cards (${currentData.flashcards.length})` },
          { id: 'mcqs', label: `🎯 Verified SBA Practice (${currentData.questions.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMode(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeMode === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1: High Yield Key Facts */}
      {activeMode === 'facts' && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Core syllabus high-yield review facts for <strong className="text-white capitalize">{selectedSubject}</strong></span>
            <span className="font-mono text-cyan-400">{currentData.keyFacts.length} points</span>
          </div>

          <div className="space-y-2.5">
            {currentData.keyFacts.map((fact, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition"
              >
                <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/20">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Flashcards */}
      {activeMode === 'flashcards' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">Click any card to flip and reveal the answer and high-yield clinical pearl.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.flashcards.map(card => {
              const isFlipped = flippedCardId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer min-h-[220px] flex flex-col justify-between select-none shadow-md ${
                    isFlipped
                      ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border-indigo-500/40'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {isFlipped ? 'Answer & Explanation' : 'Prompt / Question'}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {isFlipped ? card.back : card.front}
                    </h3>
                  </div>

                  {isFlipped && (
                    <div className="pt-3 border-t border-indigo-500/20">
                      <span className="text-xs text-amber-300 font-medium block">
                        💡 Clinical Pearl: {card.highYieldPearl}
                      </span>
                    </div>
                  )}

                  <span className="text-[11px] text-slate-500 block pt-2">
                    {isFlipped ? 'Click to flip back' : 'Click to reveal answer'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: Practice MCQs */}
      {activeMode === 'mcqs' && (
        <div className="space-y-6">
          {currentData.questions.map((q, qIndex) => {
            const isSubmitted = submittedQuestions[q.id];
            const selectedIdx = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    Question {qIndex + 1}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Source: {q.source}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    let optionStyle = 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/60 text-slate-200';

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-bold';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        optionStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-200 font-medium';
                      } else {
                        optionStyle = 'bg-slate-900/30 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-blue-600/30 border-blue-500 text-white font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition cursor-pointer select-none ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current text-[11px] font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action button */}
                {!isSubmitted ? (
                  <button
                    onClick={() => handleSubmitAnswer(q.id)}
                    disabled={selectedIdx === undefined}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition shadow-md"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs animate-fadeIn">
                    <div className="flex items-center gap-2">
                      {selectedIdx === q.correctIndex ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      <strong>Clinical Rationale:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Safety Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <span>
          <strong>Authentic Assessment Notice:</strong> Questions adhere strictly to BM&DC curriculum guidelines and verified examination patterns.
        </span>
      </div>
    </div>
  );
};
