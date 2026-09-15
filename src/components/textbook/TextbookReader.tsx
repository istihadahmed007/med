import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, Highlighter, MessageSquare, ExternalLink, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { TEXTBOOK_CHAPTERS } from '../../data/textbookData';
import { TextbookChapter } from '../../types';

interface NoteItem {
  chapterId: string;
  sectionIndex: number;
  text: string;
  createdAt: string;
}

export const TextbookReader: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(TEXTBOOK_CHAPTERS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>([]);
  const [personalNotes, setPersonalNotes] = useState<NoteItem[]>([]);
  const [activeNoteSection, setActiveNoteSection] = useState<number | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');

  const chapter: TextbookChapter = TEXTBOOK_CHAPTERS.find(c => c.id === selectedChapterId) || TEXTBOOK_CHAPTERS[0];

  const toggleBookmark = (id: string) => {
    setBookmarkedChapters(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddNote = (sectionIndex: number) => {
    if (!newNoteText.trim()) return;
    const note: NoteItem = {
      chapterId: chapter.id,
      sectionIndex,
      text: newNoteText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPersonalNotes(prev => [...prev, note]);
    setNewNoteText('');
    setActiveNoteSection(null);
  };

  const filteredSections = chapter.sections.filter(
    sec =>
      sec.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              MBBS DIGITAL TEXTBOOK & REFERENCE SUITE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {chapter.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
              <span>Read time: ~{chapter.readTimeMinutes} mins</span>
              <span>•</span>
              <span className="text-blue-400 font-semibold uppercase">{chapter.subjectId}</span>
              <span>•</span>
              <span>Authentic Davidson 24th & Robbins 10th Ed</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(chapter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                bookmarkedChapters.includes(chapter.id)
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedChapters.includes(chapter.id) ? 'Bookmarked' : 'Bookmark Chapter'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading View with Chapter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (3 cols): Chapter Navigator & Search */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search in chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Chapters List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              CURATED CLINICAL CHAPTERS
            </span>
            {TEXTBOOK_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterId(ch.id);
                  setSearchQuery('');
                }}
                className={`w-full text-left p-3 rounded-xl transition-all text-xs flex items-center justify-between ${
                  selectedChapterId === ch.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="truncate pr-2">
                  <div>{ch.title.split(':')[0]}</div>
                  <div className="text-[10px] opacity-75 font-normal truncate">{ch.title.split(':')[1]}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
              </button>
            ))}
          </div>

          {/* Learning Objectives Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              LEARNING OBJECTIVES
            </div>
            <ul className="space-y-2">
              {chapter.learningObjectives.map((obj, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center / Right (9 cols): Textbook Reader Surface */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-8 backdrop-blur-md">
            {filteredSections.map((sec, idx) => {
              const notesForSection = personalNotes.filter(
                n => n.chapterId === chapter.id && n.sectionIndex === idx
              );

              return (
                <article key={idx} className="space-y-4 border-b border-slate-800/80 pb-8 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {sec.heading}
                    </h2>
                    <button
                      onClick={() => setActiveNoteSection(activeNoteSection === idx ? null : idx)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors"
                      title="Add Margin Note"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Note ({notesForSection.length})</span>
                    </button>
                  </div>

                  {/* Section Paragraph Content */}
                  <div className="text-sm md:text-base text-slate-300 leading-relaxed font-sans whitespace-pre-line space-y-3">
                    {sec.content}
                  </div>

                  {/* Clinical Pearl Box */}
                  {sec.clinicalBox && (
                    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border-l-4 border-amber-500 rounded-r-xl p-4 space-y-1 shadow-inner my-4">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                        {sec.clinicalBox.title}
                      </div>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                        {sec.clinicalBox.text}
                      </p>
                    </div>
                  )}

                  {/* Margin Notes List for Section */}
                  {notesForSection.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      {notesForSection.map((note, nIdx) => (
                        <div key={nIdx} className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-xs text-blue-200 flex items-start justify-between">
                          <span>{note.text}</span>
                          <span className="text-[10px] text-slate-500 ml-2">{note.createdAt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Note Input Drawer */}
                  {activeNoteSection === idx && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/30 space-y-2 animate-fadeIn">
                      <textarea
                        rows={2}
                        placeholder="Type personal clinical note or mnemonic..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setActiveNoteSection(null)}
                          className="px-3 py-1 rounded text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddNote(idx)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Textbook References & Citations */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              AUTHENTIC TEXTBOOK CITATIONS & REFERENCES:
            </span>
            <ul className="space-y-1.5">
              {chapter.references.map((ref, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
