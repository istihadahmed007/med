import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Bookmark,
  Clock,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Search,
  StickyNote,
  GraduationCap,
  History,
  TrendingUp,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { StudyService } from '../../services/studyService';
import {
  StudyBookmark,
  StudyReadingProgress,
  StudyHistoryEntry,
  StudyNote,
} from '../../types/study';
import './studyMaterials.css';

interface MyStudyDashboardProps {
  onOpenTopic: (topicId: string, subjectSlug?: string, topicSlug?: string) => void;
  onNavigateToSubject?: (subjectSlug: string) => void;
}

export const MyStudyDashboard: React.FC<MyStudyDashboardProps> = ({
  onOpenTopic,
  onNavigateToSubject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'continue' | 'bookmarks' | 'notes' | 'history'>('overview');
  const [continueItem, setContinueItem] = useState<StudyReadingProgress | null>(null);
  const [recentlyRead, setRecentlyRead] = useState<StudyReadingProgress[]>([]);
  const [bookmarks, setBookmarks] = useState<StudyBookmark[]>([]);
  const [history, setHistory] = useState<StudyHistoryEntry[]>([]);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, percentage: 0 });
  const [bookmarkFilter, setBookmarkFilter] = useState<'all' | 'topic' | 'medicine' | 'condition' | 'document'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setContinueItem(StudyService.getContinueReading());
    setRecentlyRead(StudyService.getRecentlyRead(10));
    setBookmarks(StudyService.getBookmarks());
    setHistory(StudyService.getHistory(30));
    setNotes(StudyService.getNotes());
    setStats(StudyService.getCompletionStats());
  };

  const handleRemoveBookmark = (targetId: string, type: any) => {
    StudyService.toggleBookmark({ targetId, type, title: '' });
    setBookmarks(StudyService.getBookmarks());
  };

  const handleDeleteNote = (noteId: string) => {
    StudyService.deleteNote(noteId);
    setNotes(StudyService.getNotes());
  };

  const filteredBookmarks = bookmarks.filter(b => {
    if (bookmarkFilter === 'all') return true;
    return b.type === bookmarkFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f4a]/90 via-[#071330]/90 to-[#040d21]/90 border border-blue-500/20 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                Student Learning Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Study Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#C4D4EA] mt-1 max-w-xl leading-relaxed">
              Track your authentic reading progress, resume unfinished clinical topics, view bookmarked drugs, and review private notes.
            </p>
          </div>

          {/* Real Metrics Badges */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[96px] min-h-[80px] flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-[#08AFC1] block">{recentlyRead.length}</span>
              <span className="text-[11px] text-[#C4D4EA] font-medium">Topics Opened</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[96px] min-h-[80px] flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">{stats.completed}</span>
              <span className="text-[11px] text-[#C4D4EA] font-medium">Completed</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center min-w-[96px] min-h-[80px] flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-amber-400 block">{bookmarks.length}</span>
              <span className="text-[11px] text-[#C4D4EA] font-medium">Saved Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Reading Hero Card */}
      {continueItem && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900/60 border border-[rgba(8,175,193,0.3)] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#08AFC1] uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Continue Reading
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {continueItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C4D4EA] flex items-center gap-3">
                <span>Progress: <strong className="text-cyan-300">{Math.round(continueItem.scrollPercentage)}%</strong></span>
                <span>•</span>
                <span>Time spent: <strong>{Math.round(continueItem.timeSpentSeconds / 60)} mins</strong></span>
              </p>
              {/* Progress bar */}
              <div className="w-full sm:w-72 h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-[#08AFC1] to-blue-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(5, continueItem.scrollPercentage))}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => onOpenTopic(continueItem.topicId)}
              className="px-5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#08AFC1] to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            >
              <span>Resume Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Recently Read', icon: BookOpen, count: recentlyRead.length },
          { id: 'bookmarks', label: 'Bookmarks & Saved', icon: Bookmark, count: bookmarks.length },
          { id: 'notes', label: 'Private Notes', icon: StickyNote, count: notes.length },
          { id: 'history', label: 'Activity Timeline', icon: History, count: history.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-[#08AFC1] text-white border-[#08AFC1] shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Recently Read */}
      {activeTab === 'overview' && (
        <div className="space-y-3">
          {recentlyRead.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
              <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">No topics opened yet</p>
              <p className="text-xs text-slate-500 mt-1">Explore 25 MBBS subjects in Study Materials to start learning.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentlyRead.map(item => (
                <div
                  key={item.topicId}
                  onClick={() => onOpenTopic(item.topicId)}
                  className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Subject: <span className="capitalize">{item.subjectId}</span>
                      </p>
                    </div>
                    {item.completed && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-mono text-cyan-300">{Math.round(item.scrollPercentage)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${item.scrollPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {['all', 'topic', 'medicine', 'condition', 'document'].map(f => (
              <button
                key={f}
                onClick={() => setBookmarkFilter(f as any)}
                className={`px-3.5 py-2 min-h-[40px] rounded-xl capitalize font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
                  bookmarkFilter === f
                    ? 'bg-[#08AFC1]/20 text-cyan-300 border border-[#08AFC1]/50 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {f === 'all' ? 'All Saved Items' : f + 's'}
              </button>
            ))}
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="medx-empty-state">
              <Bookmark className="w-10 h-10 text-slate-600 mb-2" />
              <p className="font-semibold text-base text-white">No saved items yet</p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1">Click the bookmark icon on any topic, medicine, or condition page to save it here for fast retrieval.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredBookmarks.map(bm => (
                <div
                  key={bm.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div
                    onClick={() => {
                      if (bm.type === 'topic') onOpenTopic(bm.targetId);
                      else if (bm.type === 'medicine') window.location.hash = `#drug-reference?brand=${encodeURIComponent(bm.targetId)}`;
                    }}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer space-y-1 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-[#08AFC1] border border-slate-700">
                        {bm.type}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors">
                        {bm.title}
                      </h4>
                    </div>
                    {bm.subtitle && (
                      <p className="text-xs text-slate-400">{bm.subtitle}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveBookmark(bm.targetId, bm.type)}
                    className="p-2.5 min-w-[40px] min-h-[40px] rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors flex items-center justify-center"
                    title="Remove saved item"
                    aria-label={`Remove bookmark for ${bm.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="medx-empty-state">
              <StickyNote className="w-10 h-10 text-slate-600 mb-2" />
              <p className="font-semibold text-base text-white">No study notes recorded</p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1">Add personal study notes while studying any topic to keep high-yield revision facts organized.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {notes.map(note => (
                <div
                  key={note.id}
                  className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#08AFC1]">
                        {note.topicTitle || 'Clinical Note'}
                      </span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors"
                        title="Delete note"
                        aria-label="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 block pt-2 border-t border-slate-800 font-mono">
                    Saved {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="medx-empty-state">
              <History className="w-10 h-10 text-slate-600 mb-2" />
              <p className="font-semibold text-base text-white">No activity recorded</p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1">Your authentic reading history and searches will be logged here.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 min-h-[44px] rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#08AFC1] shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{h.title}</span>
                      {h.subtitle && <span className="text-slate-400 ml-2">({h.subtitle})</span>}
                    </div>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] shrink-0">
                    {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
