import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  AlertTriangle, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Trash2, 
  BookOpen,
  Filter,
  Layers,
  Zap
} from 'lucide-react';
import { SpacedRepetitionCard, MistakeEntry, LessonBookmark, NavigationView } from '../../types';
import { StorageService } from '../../services/storageService';

interface RevisionHubProps {
  onNavigateToLesson?: (lessonId: string) => void;
  onNavigateView?: (view: NavigationView) => void;
}

export const RevisionHub: React.FC<RevisionHubProps> = ({ onNavigateToLesson, onNavigateView }) => {
  const [activeTab, setActiveTab] = useState<'spaced' | 'mistakes' | 'bookmarks'>('spaced');
  const [spacedCards, setSpacedCards] = useState<SpacedRepetitionCard[]>([]);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [bookmarks, setBookmarks] = useState<LessonBookmark[]>([]);
  
  // Flashcard review mode state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [filterPhase, setFilterPhase] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setSpacedCards(StorageService.getSpacedCards());
    setMistakes(StorageService.getMistakes());
    setBookmarks(StorageService.getBookmarks());
  };

  const handleCardRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (spacedCards.length === 0) return;
    const card = spacedCards[currentCardIndex];
    if (card) {
      StorageService.recordCardReview(card.id, rating);
      loadData();
      setIsAnswerRevealed(false);
      if (currentCardIndex >= spacedCards.length - 1) {
        setCurrentCardIndex(0);
      } else {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
  };

  const handleResolveMistake = (id: string) => {
    StorageService.markMistakeResolved(id);
    loadData();
  };

  const dueCards = spacedCards.filter((c) => c.dueDate <= Date.now());
  const currentCard = dueCards[currentCardIndex] || spacedCards[0];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#08AFC1] uppercase tracking-widest bg-[rgba(8,175,193,0.12)] px-3 py-1 rounded-full border border-[rgba(8,175,193,0.3)]">
              Persistent Revision & Memory Hub
            </span>
            <span className="text-xs text-emerald-400 font-mono">SuperMemo-2 Spaced Recall</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Spaced Repetition & Mistake Notebook
          </h1>
          <p className="text-[#C4D4EA] text-sm sm:text-base max-w-3xl leading-relaxed">
            Maintain high long-term retention through scientifically scheduled flashcard reviews and direct remediation of past mistakes.
          </p>
        </div>
      </div>

      {/* Revision Sub-Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab('spaced')}
          className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
            activeTab === 'spaced'
              ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-glow-blue'
              : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span>Spaced Flashcards Queue</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 font-mono font-bold">
            {dueCards.length} Due
          </span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
            activeTab === 'mistakes'
              ? 'bg-amber-600 text-slate-950 border-amber-400 font-bold shadow-glow-cyan'
              : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Mistake Notebook</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 font-mono font-bold">
            {mistakes.filter(m => !m.reviewed).length} Active
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
            activeTab === 'bookmarks'
              ? 'bg-[#08AFC1] text-slate-950 border-[#08AFC1] font-bold shadow-glow-cyan'
              : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Bookmark className="w-4 h-4 shrink-0" />
          <span>Saved Bookmarks & Resume</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
            {bookmarks.length}
          </span>
        </button>
      </div>

      {/* 1. Spaced Repetition Flashcards Reviewer */}
      {activeTab === 'spaced' && (
        <div className="space-y-6">
          {currentCard ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Flashcard Header info */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-500/30 font-mono font-bold">
                    {currentCard.phase} • {currentCard.subject}
                  </span>
                  <span>{currentCard.title}</span>
                </div>
                <div className="font-mono">
                  Card {currentCardIndex + 1} of {dueCards.length || spacedCards.length}
                </div>
              </div>

              {/* Card Body */}
              <div
                onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-med-900 to-slate-950 border border-blue-500/30 min-h-[320px] flex flex-col justify-between cursor-pointer hover:border-blue-400/60 transition-all shadow-glass"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                    Prompt Question:
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {currentCard.front}
                  </h3>
                </div>

                {isAnswerRevealed ? (
                  <div className="pt-6 border-t border-slate-800 space-y-2 animate-fadeIn">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      Verified Answer:
                    </span>
                    <p className="text-base sm:text-lg font-bold text-emerald-300 leading-relaxed">
                      {currentCard.back}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-xs text-slate-500 font-mono">
                    Click anywhere on the card to reveal answer
                  </div>
                )}
              </div>

              {/* SM-2 Interval Response Buttons */}
              {isAnswerRevealed ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleCardRating('again')}
                    className="p-3.5 rounded-2xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all text-center space-y-1"
                  >
                    <div className="font-black text-white">Again (1d)</div>
                    <div className="text-[10px] text-rose-400/80">Forgot completely</div>
                  </button>

                  <button
                    onClick={() => handleCardRating('hard')}
                    className="p-3.5 rounded-2xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all text-center space-y-1"
                  >
                    <div className="font-black text-white">Hard (2d)</div>
                    <div className="text-[10px] text-amber-400/80">Recalled with effort</div>
                  </button>

                  <button
                    onClick={() => handleCardRating('good')}
                    className="p-3.5 rounded-2xl bg-blue-950/70 hover:bg-blue-900/80 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all text-center space-y-1"
                  >
                    <div className="font-black text-white">Good (4d)</div>
                    <div className="text-[10px] text-blue-400/80">Recalled correctly</div>
                  </button>

                  <button
                    onClick={() => handleCardRating('easy')}
                    className="p-3.5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center space-y-1"
                  >
                    <div className="font-black text-white">Easy (7d+)</div>
                    <div className="text-[10px] text-emerald-400/80">Instant mastery</div>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAnswerRevealed(true)}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-glow-blue"
                >
                  Show Answer
                </button>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Spaced Repetition Queue Clear!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You have completed all scheduled cards for today. New cards will activate automatically as their retention intervals mature.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. Mistake Notebook */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Logged Assessment Mistakes ({mistakes.length})
            </h2>
            <span className="text-xs text-slate-400">
              Auto-saved from question bank & clinical case attempts
            </span>
          </div>

          {mistakes.length > 0 ? (
            <div className="space-y-3">
              {mistakes.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    entry.reviewed
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-70'
                      : 'bg-slate-900/90 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-950 text-amber-400 border border-amber-500/30">
                        {entry.subject} • {entry.topic}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    {entry.reviewed ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolved & Mastered
                      </span>
                    ) : (
                      <button
                        onClick={() => handleResolveMistake(entry.id)}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-colors"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>

                  <p className="text-sm font-bold text-white">
                    {entry.questionStem}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-300">
                      <span className="font-bold text-[10px] uppercase block text-rose-400">Your Submitted Answer:</span>
                      {entry.selectedAnswer}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">
                      <span className="font-bold text-[10px] uppercase block text-emerald-400">Correct BM&DC Answer:</span>
                      {entry.correctAnswer}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-cyan-400 block mb-1">Textbook Explanation:</span>
                    {entry.explanation}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="medx-empty-state">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
              <h3 className="text-base font-bold text-white">Mistake Notebook Empty</h3>
              <p className="text-xs sm:text-sm text-[#C4D4EA] max-w-md mt-1">
                Any questions answered incorrectly during practice or exams will be recorded here for targeted review.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Bookmarks & Resume */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#08AFC1]" />
              Saved Lesson Positions ({bookmarks.length})
            </h2>
            <span className="text-xs text-[#C4D4EA]">
              Resume your exact reading step across devices
            </span>
          </div>

          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((bm, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#08AFC1]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-[#08AFC1] border border-[rgba(8,175,193,0.3)]">
                        {bm.phase} • {bm.subject}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Saved: {new Date(bm.savedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {bm.title}
                    </h3>

                    <div className="text-xs text-[#C4D4EA] flex items-center gap-1.5">
                      <span className="text-[#08AFC1] font-mono font-bold uppercase">Last step:</span>
                      <span className="capitalize">{bm.lastStep} stage</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
                    <button
                      onClick={() => {
                        if (onNavigateToLesson) onNavigateToLesson(bm.lessonId);
                        else if (onNavigateView) onNavigateView('learn');
                      }}
                      className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#08AFC1] hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                    >
                      <span>Resume Lesson</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="medx-empty-state">
              <Bookmark className="w-10 h-10 text-slate-600 mb-2" />
              <h3 className="text-base font-bold text-white">No saved items yet</h3>
              <p className="text-xs sm:text-sm text-[#C4D4EA] max-w-md mt-1">
                Click the bookmark icon while studying any lesson to pin your progress here for rapid access.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
