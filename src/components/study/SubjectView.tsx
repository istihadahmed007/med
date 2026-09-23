import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  Star,
  Search,
  GraduationCap,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { StudySubject } from '../../types/study';
import { StudyService } from '../../services/studyService';
import './studyMaterials.css';

interface SubjectViewProps {
  subject: StudySubject;
  completedTopicIds: string[];
  onBack: () => void;
  onSelectTopic: (topicId: string, topicSlug: string) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  subject,
  completedTopicIds,
  onBack,
  onSelectTopic,
}) => {
  const [expandedUnit, setExpandedUnit] = useState<string | null>(
    subject.units.length > 0 ? subject.units[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return subject.units;
    const q = searchQuery.toLowerCase();
    return subject.units
      .map(unit => ({
        ...unit,
        topics: unit.topics.filter(t => t.title.toLowerCase().includes(q)),
      }))
      .filter(u => u.topics.length > 0 || u.title.toLowerCase().includes(q));
  }, [subject.units, searchQuery]);

  const totalCompleted = subject.units
    .flatMap(u => u.topics)
    .filter(t => completedTopicIds.includes(t.id)).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumbs */}
      <div className="study-breadcrumbs">
        <button onClick={onBack}>Study Materials</button>
        <span className="sep">›</span>
        <span className="current">{subject.name}</span>
      </div>

      {/* Subject Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#08AFC1] transition-colors mb-4 font-sans min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Subjects</span>
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold shrink-0"
            style={{ background: `${subject.color}18`, color: subject.color }}
          >
            {subject.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F9FF] tracking-tight font-sans">
              {subject.name}
            </h1>
            {subject.nameBn && (
              <p className="text-sm text-[#C4D4EA] mt-0.5 font-sans">{subject.nameBn}</p>
            )}
            <p className="text-sm text-[#C4D4EA] mt-1 font-sans max-w-xl leading-relaxed">
              {subject.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#C4D4EA] font-sans mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5">
            <GraduationCap className="w-3.5 h-3.5 text-[#08AFC1]" />
            {subject.units.length} units
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5">
            <BookOpen className="w-3.5 h-3.5 text-[#08AFC1]" />
            {subject.totalTopics} topics
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5">
            <span className="text-[10px] font-mono font-bold uppercase text-[#8EACCF]">{subject.phase}</span>
          </span>
          {totalCompleted > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981]/10 text-[#10b981] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {totalCompleted}/{subject.totalTopics} completed
            </span>
          )}
        </div>

        {/* Search within subject */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8EACCF]" />
          <input
            type="text"
            placeholder={`Search topics in ${subject.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.18)] text-[#e2e8f0] placeholder-[#8EACCF] font-sans text-sm focus:outline-none focus:border-[#08AFC1] focus:ring-1 focus:ring-[#08AFC1] transition-all"
          />
        </div>
      </div>

      {/* Units & Topics */}
      <div className="space-y-3">
        {filteredUnits.length === 0 ? (
          <div className="medx-empty-state">
            <Search className="w-8 h-8 text-[#8EACCF] mb-2" />
            <p className="font-semibold text-white">No topics match your search in {subject.name}.</p>
          </div>
        ) : (
          filteredUnits.map(unit => {
            const isExpanded = expandedUnit === unit.id;
            const unitCompleted = unit.topics.filter(t => completedTopicIds.includes(t.id)).length;

            return (
              <div
                key={unit.id}
                className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[rgba(15,23,42,0.4)] overflow-hidden"
              >
                {/* Unit Header */}
                <button
                  onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                  className="w-full flex items-center justify-between p-4 min-h-[52px] hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight
                      className={`w-4 h-4 text-[#8EACCF] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-[#F5F9FF] font-sans">{unit.title}</h3>
                      <p className="text-xs text-[#8EACCF] font-sans mt-0.5">
                        {unit.topics.length} topic{unit.topics.length !== 1 ? 's' : ''}
                        {unitCompleted > 0 && (
                          <span className="text-[#10b981] ml-2 font-medium">· {unitCompleted} completed</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {unitCompleted > 0 && (
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#10b981]"
                        style={{ width: `${Math.round((unitCompleted / unit.topics.length) * 100)}%` }}
                      />
                    </div>
                  )}
                </button>

                {/* Topic List */}
                {isExpanded && (
                  <div className="border-t border-[rgba(148,163,184,0.08)] px-2 pb-2">
                    {unit.topics.map(topic => {
                      const isCompleted = completedTopicIds.includes(topic.id);
                      const isBookmarked = StudyService.isBookmarked(topic.id);

                      return (
                        <button
                          key={topic.id}
                          onClick={() => onSelectTopic(topic.id, topic.slug)}
                          className="study-topic-item w-full text-left group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-[rgba(148,163,184,0.25)] shrink-0" />
                            )}
                            <div className="min-w-0">
                              <span className="text-sm text-[#e2e8f0] font-sans font-medium group-hover:text-[#38bdf8] transition-colors block truncate">
                                {topic.title}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {topic.isHighYield && (
                              <span className="study-high-yield">HY</span>
                            )}
                            <span className={`study-difficulty ${topic.difficulty.toLowerCase()}`}>
                              {topic.difficulty}
                            </span>
                            <span className="text-xs text-[#64748b] font-sans flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {topic.estimatedReadingMinutes}m
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#38bdf8] transition-colors" />
                          </div>
                        </button>
                      );
                    })}
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
