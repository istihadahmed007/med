import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Play,
  Search,
  ShieldCheck,
  Clock,
  Layers,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Tag,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Filter,
  X,
  Plus,
  SlidersHorizontal,
  FileEdit,
  Award,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import {
  ANATOMY_COLLECTIONS,
  SURGERY_COLLECTIONS,
  CATEGORY_TOPICS,
  MEDICAL_VIDEO_LIBRARY,
  VIDEO_CATEGORIES,
  VideoCategory,
  VideoFilters,
  filterMedicalVideos,
  sortMedicalVideos,
  getRelatedVideos
} from '../../data/medicalVideoLibraryData';
import { SelfHostedMedicalVideo } from '../../types/videoStudio';
import { SelfHostedVideoPlayer } from './SelfHostedVideoPlayer';
import { SurgicalProcedureTabs } from './SurgicalProcedureTabs';
import { VideoAssessmentQuiz } from './VideoAssessmentQuiz';
import { FacultyVideoManagerModal } from './FacultyVideoManagerModal';
import { VideoStudioService } from '../../services/videoStudioService';
import { StorageService } from '../../services/storageService';
import './videoAtlas.css';

interface ThumbnailProps {
  video: SelfHostedMedicalVideo;
}

function VideoThumbnail({ video }: ThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const poster = video.thumbnailUrl || video.thumbnail_url;

  return poster && !failed ? (
    <div className="relative w-full h-full overflow-hidden group/thumb">
      <img
        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
        src={poster}
        alt={video.title}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
      
      {/* Duration Badge */}
      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono text-slate-200 font-semibold backdrop-blur-sm flex items-center gap-1">
        <Clock size={11} className="text-cyan-400" />
        <span>{video.duration}</span>
      </div>

      {/* Graphic Warning Badge on Thumbnail */}
      {video.graphicContent && (
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-600/70 text-[10px] font-bold text-amber-300 backdrop-blur-sm flex items-center gap-1">
          <AlertTriangle size={11} />
          <span>Graphic Content</span>
        </div>
      )}

      {/* Play Hover Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
        <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-glow-cyan transform scale-90 group-hover/thumb:scale-100 transition-transform">
          <Play size={22} className="fill-current ml-0.5" />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 text-slate-400">
      <Play size={28} className="text-cyan-400/80 mb-2" />
      <span className="text-xs font-semibold text-slate-300 text-center">{video.title}</span>
      <span className="text-[10px] text-slate-500 mt-1 font-mono">{video.duration}</span>
    </div>
  );
}

function VideoBadges({ video }: { video: SelfHostedMedicalVideo }) {
  const getMediaTypeBadge = () => {
    switch (video.mediaType) {
      case 'real_surgery':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/80 text-rose-300 border border-red-800/60">Real Surgery</span>;
      case 'cadaveric':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60">Cadaveric</span>;
      case 'clinical_demonstration':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">Clinical Skills</span>;
      case 'imaging':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/60">Imaging</span>;
      case 'animation':
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/80 text-cyan-300 border border-blue-800/60">Medical Animation</span>;
    }
  };

  const getLicenseBadge = () => {
    const lic = typeof video.license === 'object' ? video.license.type : video.license;
    if (lic?.includes('Public Domain') || lic?.includes('U.S. Federal Government')) {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">Public Domain</span>;
    }
    if (lic?.includes('CC')) {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">{lic}</span>;
    }
    return null;
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {getMediaTypeBadge()}
      {video.review?.status === 'approved' && (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 flex items-center gap-1">
          <ShieldCheck size={10} /> Faculty Reviewed
        </span>
      )}
      {getLicenseBadge()}
    </div>
  );
}

function VideoCard({
  video,
  onSelect,
  isBookmarked,
  onToggleBookmark
}: {
  video: SelfHostedMedicalVideo;
  onSelect: (id: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}) {
  return (
    <article className="atlas-card group flex flex-col justify-between bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-950/20">
      <div className="relative aspect-video w-full">
        <button
          className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onClick={() => onSelect(video.id)}
          aria-label={`Watch ${video.title}`}
        >
          <VideoThumbnail video={video} />
        </button>

        {onToggleBookmark && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(video.id);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors backdrop-blur-sm"
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Video'}
          >
            {isBookmarked ? <BookmarkCheck size={14} className="text-cyan-400" /> : <Bookmark size={14} />}
          </button>
        )}
      </div>

      <div className="atlas-card-body flex-1 flex flex-col justify-between p-4">
        <div>
          <div className="mb-2">
            <VideoBadges video={video} />
          </div>

          <h3 className="text-sm md:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
            <button
              onClick={() => onSelect(video.id)}
              className="text-left focus:outline-none"
            >
              {video.title}
            </button>
          </h3>
          {video.titleBn && (
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{video.titleBn}</p>
          )}

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {video.summary || video.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-semibold border border-slate-700/60">
              {video.collection || video.category}
            </span>
            {video.subtopic && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                {video.subtopic}
              </span>
            )}
            {video.difficulty && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                {video.difficulty}
              </span>
            )}
          </div>
        </div>

        <footer className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[160px] text-[11px]" title={video.source}>
            {video.source}
          </span>
          <button
            className="atlas-text-button text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 focus:outline-none text-xs"
            onClick={() => onSelect(video.id)}
          >
            <Play size={13} className="fill-current" /> Watch Video
          </button>
        </footer>
      </div>
    </article>
  );
}

const readVideoId = (): string => {
  try {
    return decodeURIComponent(window.location.hash.split('/')[1] || '');
  } catch {
    return '';
  }
};

export const MedicalVideoLibrary: React.FC = () => {
  const [videos, setVideos] = useState<SelfHostedMedicalVideo[]>(MEDICAL_VIDEO_LIBRARY);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<VideoFilters>({ category: 'All' });
  const [activeId, setActiveId] = useState<string>(readVideoId);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentUser = StorageService.getUser();
  const currentRole = StorageService.getRole();
  const isFacultyOrAdmin = currentRole === 'faculty' || currentRole === 'admin' || currentRole === 'reviewer';

  // Load videos from backend API
  useEffect(() => {
    let active = true;
    setLoading(true);

    VideoStudioService.getVideos(filters)
      .then((data) => {
        if (active) {
          if (Array.isArray(data)) {
            setVideos(data);
          } else {
            setVideos(MEDICAL_VIDEO_LIBRARY);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setVideos(MEDICAL_VIDEO_LIBRARY);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [filters.category, filters.collection, filters.subtopic]);

  // Hash-based navigation (#video-studio/<id>)
  useEffect(() => {
    const sync = () => setActiveId(readVideoId());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    // Load student notes & progress for active video
    if (activeId && currentUser?.id) {
      VideoStudioService.getProgress(currentUser.id, activeId).then((prog) => {
        if (prog) {
          if (prog.bookmarked && !bookmarkedIds.includes(activeId)) {
            setBookmarkedIds(prev => [...prev, activeId]);
          }
          if (prog.completed && !completedIds.includes(activeId)) {
            setCompletedIds(prev => [...prev, activeId]);
          }
        }
      });
      const savedNote = localStorage.getItem(`medx_video_note_${activeId}`) || '';
      setStudentNotes(savedNote);
    }
  }, [activeId, currentUser?.id]);

  const selectVideo = (id: string) => {
    window.location.hash = id ? `video-studio/${encodeURIComponent(id)}` : 'video-studio';
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeVideo = videos.find((v) => v.id === activeId);
  const filteredResults = sortMedicalVideos(
    filterMedicalVideos(videos, filters),
    filters.sortBy || 'recent'
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id);
      const next = isBookmarked ? prev.filter((item) => item !== id) : [...prev, id];
      if (currentUser?.id) {
        VideoStudioService.saveProgress({
          videoId: id,
          studentId: currentUser.id,
          bookmarked: !isBookmarked
        });
      }
      return next;
    });
  };

  const markCompleted = (id: string) => {
    setCompletedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (currentUser?.id) {
        VideoStudioService.saveProgress({
          videoId: id,
          studentId: currentUser.id,
          completed: true
        });
      }
      return next;
    });
  };

  const savePersonalNotes = () => {
    if (!activeId) return;
    localStorage.setItem(`medx_video_note_${activeId}`, studentNotes);
    if (currentUser?.id) {
      VideoStudioService.saveProgress({
        videoId: activeId,
        studentId: currentUser.id,
        notes: studentNotes
      });
    }
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const clearFilters = () => {
    setFilters({ category: 'All' });
  };

  return (
    <section className="video-atlas max-w-7xl mx-auto px-4 py-6" aria-label="MEDX Medical Video Library">
      {/* Top Header Banner */}
      <header className="atlas-header mb-6">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="atlas-eyebrow text-cyan-400 font-bold tracking-wider">
              MEDX MEDICAL VIDEOS
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 font-semibold flex items-center gap-1">
              <ShieldCheck size={12} />
              MBBS Anatomy & Surgery Atlas
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFacultyOrAdmin && (
              <button
                type="button"
                onClick={() => setFacultyModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Faculty Add Video</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <Filter size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <h1
          ref={titleRef}
          tabIndex={-1}
          className="text-2xl md:text-3xl font-extrabold text-white tracking-tight focus:outline-none"
        >
          {activeVideo ? activeVideo.title : 'MBBS Anatomy & Surgery Video Library'}
        </h1>

        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {activeVideo
            ? activeVideo.summary || activeVideo.description
            : 'Comprehensive MBBS clinical video library. Real surgical procedures, cadaveric dissections, and high-definition 3D medical animations streamed natively inside MEDX with zero external redirects.'}
        </p>
      </header>

      {/* DETAIL VIEW (Video Lesson Page) or CATALOG VIEW */}
      {activeId ? (
        activeVideo ? (
          <div className="atlas-detail flex flex-col gap-6">
            <button
              className="atlas-text-button text-slate-300 hover:text-cyan-300 flex items-center gap-2 self-start text-sm font-semibold focus:outline-none transition-colors"
              onClick={() => selectVideo('')}
            >
              <ArrowLeft size={16} /> Back to Video Library
            </button>

            {/* TWO-COLUMN DETAIL VIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Player + Structured Clinical Tabs */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Internal Video Player (HTML5 / HLS / Approved Embed) */}
                <SelfHostedVideoPlayer
                  video={activeVideo}
                  studentId={currentUser?.id}
                  onCompleted={() => markCompleted(activeVideo.id)}
                />

                {/* Surgical 11-Tabs Guide or Anatomy Structured Overview */}
                {activeVideo.category === 'Surgery' ? (
                  <SurgicalProcedureTabs video={activeVideo} />
                ) : (
                  <div className="flex flex-col gap-6 mt-4">
                    {/* Educational & Clinical Objectives */}
                    <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <VideoBadges video={activeVideo} />
                        <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                          {activeVideo.duration}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-white">Curricular Learning Objectives</h2>
                      {activeVideo.learningObjectives && activeVideo.learningObjectives.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {activeVideo.learningObjectives.map((obj, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-300 leading-relaxed">{activeVideo.description}</p>
                      )}

                      {/* Clinical Pearls */}
                      {activeVideo.clinicalPearls && activeVideo.clinicalPearls.length > 0 && (
                        <div className="border-t border-slate-800/80 pt-4 mt-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                            Clinical Pearls & Exam High-Yields
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {activeVideo.clinicalPearls.map((pearl, i) => (
                              <li key={i} className="text-xs p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                                ★ {pearl}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>

                    {/* Formative 5-Question Quiz */}
                    <VideoAssessmentQuiz
                      videoId={activeVideo.id}
                      questions={activeVideo.quiz}
                      studentId={currentUser?.id}
                      onQuizCompleted={(score, total) => {
                        if (score >= Math.ceil(total * 0.6)) markCompleted(activeVideo.id);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Metadata, Curriculum Links, Notes & Related */}
              <aside className="lg:col-span-1 flex flex-col gap-5">
                {/* 1. Completion & Bookmark Actions */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lesson Progress</span>
                    {completedIds.includes(activeVideo.id) ? (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                        In Progress
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => markCompleted(activeVideo.id)}
                      disabled={completedIds.includes(activeVideo.id)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        completedIds.includes(activeVideo.id)
                          ? 'bg-slate-800 text-slate-500 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-glow-emerald cursor-pointer'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{completedIds.includes(activeVideo.id) ? 'Completed' : 'Mark as Completed'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(activeVideo.id)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                      title={bookmarkedIds.includes(activeVideo.id) ? 'Bookmarked' : 'Bookmark'}
                    >
                      {bookmarkedIds.includes(activeVideo.id) ? (
                        <BookmarkCheck size={16} className="text-cyan-400" />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. "Study this topic across books" Curriculum Connection */}
                <div className="bg-gradient-to-br from-blue-950/60 to-slate-900/80 border border-blue-800/60 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                    <BookOpen size={16} />
                    <span>CURRICULUM INTEGRATION</span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    Study this topic across books
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Connect this video with anatomy, pathology, clinical textbooks, and related clinical cases.
                  </p>
                  <a
                    href={
                      activeVideo.curriculumLinks?.acrossBooksTopicId
                        ? `#across-books/${activeVideo.curriculumLinks.acrossBooksTopicId}`
                        : '#across-books'
                    }
                    className="mt-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center transition-all shadow-glow-blue flex items-center justify-center gap-1.5"
                  >
                    <span>Open Across Books Workspace</span>
                  </a>
                </div>

                {/* 3. Curricular Metadata & Attribution Box */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 text-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
                    BM&DC Curricular Metadata
                  </h3>
                  <dl className="flex flex-col gap-2.5">
                    <div>
                      <dt className="text-slate-400 font-semibold">MBBS Curriculum Phase</dt>
                      <dd className="text-slate-200 mt-0.5">{activeVideo.mbbsPhase || 'Phase 1: Pre-clinical'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Specialty & Collection</dt>
                      <dd className="text-slate-200 mt-0.5">{activeVideo.category} • {activeVideo.collection || 'General'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Media Type</dt>
                      <dd className="text-slate-200 mt-0.5 capitalize">{activeVideo.mediaType?.replace('_', ' ') || 'Animation'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Attribution & Source</dt>
                      <dd className="text-slate-200 mt-0.5 break-words">{activeVideo.attribution || activeVideo.source}</dd>
                    </div>
                    {activeVideo.review && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <dt className="text-cyan-400 font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>Medical Peer Review</span>
                        </dt>
                        <dd className="text-slate-300 mt-0.5">
                          {activeVideo.review.reviewerName} ({activeVideo.review.reviewerRole})
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* 4. Personal Student Notes */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Personal Notes</span>
                    {notesSaved && <span className="text-[11px] text-emerald-400 font-bold">Saved!</span>}
                  </div>
                  <textarea
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    rows={3}
                    placeholder="Add personal notes, high-yield points, or revision markers..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
                  />
                  <button
                    type="button"
                    onClick={savePersonalNotes}
                    className="self-end px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition-colors"
                  >
                    Save Notes
                  </button>
                </div>

                {/* 5. Related Educational Videos */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-white">Related Medical Videos</h3>
                  {getRelatedVideos(activeVideo, videos).length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {getRelatedVideos(activeVideo, videos).slice(0, 3).map((v) => (
                        <div
                          key={v.id}
                          onClick={() => selectVideo(v.id)}
                          className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center gap-3 group"
                        >
                          <div className="w-20 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0">
                            <img
                              src={v.thumbnailUrl || v.thumbnail_url}
                              alt={v.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                              {v.title}
                            </h4>
                            <span className="text-[11px] text-slate-500 block mt-0.5">{v.duration} • {v.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No other videos in this immediate category.</p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        ) : (
          /* Not Found Empty State */
          <div className="atlas-empty bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center">
            <AlertCircle size={36} className="text-amber-400 mb-3" />
            <h2 className="text-xl font-bold text-white">Video not found</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-md">
              The requested video record does not exist in the verified self-hosted repository.
            </p>
            <button
              className="atlas-primary mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-glow-blue"
              onClick={() => selectVideo('')}
            >
              Browse All Videos
            </button>
          </div>
        )
      ) : (
        /* CATALOG VIEW */
        <div className="flex flex-col gap-6">
          {/* Search Bar with Debounce & Category Quick Tabs */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                aria-label="Search verified medical videos"
                placeholder="Search anatomy, disease, organ, procedure or surgery..."
                value={filters.searchQuery || filters.query || ''}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value, query: e.target.value }))}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
              {(filters.searchQuery || filters.query) && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '', query: '' }))}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-white text-xs"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Top Category Horizontal Scroll Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {VIDEO_CATEGORIES.map((cat) => {
                const isSelected = (!filters.category && cat === 'All') || filters.category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat, collection: undefined, subtopic: undefined }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-600/50 shadow-glow-cyan'
                        : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TWO-COLUMN CATALOG LAYOUT: Left Filter Sidebar + Right Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Left Filter Sidebar */}
            <aside className="hidden lg:flex lg:col-span-1 flex-col gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 self-start sticky top-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-200 text-xs font-bold uppercase tracking-wider">
                  <SlidersHorizontal size={14} className="text-cyan-400" />
                  <span>Curriculum Filters</span>
                </div>
                {(filters.category !== 'All' || filters.collection || filters.subtopic || filters.difficulty || filters.phase) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Collections & Subtopics based on active category */}
              {filters.category === 'Anatomy' && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Anatomy Collections</span>
                  <div className="flex flex-col gap-1">
                    {Object.keys(ANATOMY_COLLECTIONS).map((col) => {
                      const isColSelected = filters.collection === col;
                      return (
                        <div key={col} className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => setFilters((prev) => ({
                              ...prev,
                              collection: isColSelected ? undefined : col,
                              subtopic: undefined
                            }))}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                              isColSelected
                                ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-700/50'
                                : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span>{col}</span>
                          </button>

                          {isColSelected && (
                            <div className="pl-3 py-1 flex flex-col gap-1">
                              {ANATOMY_COLLECTIONS[col].map((sub) => (
                                <button
                                  key={sub}
                                  type="button"
                                  onClick={() => setFilters((prev) => ({
                                    ...prev,
                                    subtopic: prev.subtopic === sub ? undefined : sub
                                  }))}
                                  className={`text-[11px] text-left px-2.5 py-1 rounded transition-colors ${
                                    filters.subtopic === sub
                                      ? 'bg-blue-900/60 text-cyan-200 font-bold'
                                      : 'text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  • {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {filters.category === 'Surgery' && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Surgical Specialties</span>
                  <div className="flex flex-col gap-1">
                    {Object.keys(SURGERY_COLLECTIONS).map((col) => {
                      const isColSelected = filters.collection === col;
                      return (
                        <div key={col} className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => setFilters((prev) => ({
                              ...prev,
                              collection: isColSelected ? undefined : col,
                              subtopic: undefined
                            }))}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                              isColSelected
                                ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-700/50'
                                : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span>{col}</span>
                          </button>

                          {isColSelected && (
                            <div className="pl-3 py-1 flex flex-col gap-1">
                              {SURGERY_COLLECTIONS[col].map((sub) => (
                                <button
                                  key={sub}
                                  type="button"
                                  onClick={() => setFilters((prev) => ({
                                    ...prev,
                                    subtopic: prev.subtopic === sub ? undefined : sub
                                  }))}
                                  className={`text-[11px] text-left px-2.5 py-1 rounded transition-colors ${
                                    filters.subtopic === sub
                                      ? 'bg-blue-900/60 text-cyan-200 font-bold'
                                      : 'text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  • {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MBBS Phase Filter */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
                <label className="text-[11px] font-bold uppercase text-slate-400">MBBS Phase</label>
                <select
                  value={filters.phase || 'all'}
                  onChange={(e) => setFilters((prev) => ({ ...prev, phase: e.target.value === 'all' ? undefined : e.target.value }))}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Phases</option>
                  <option value="Phase 1">Phase 1: 1st & 2nd Year</option>
                  <option value="Phase 2">Phase 2: 3rd Year</option>
                  <option value="Phase 3">Phase 3: 4th Year</option>
                  <option value="Phase 4">Phase 4: 5th Year</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
                <label className="text-[11px] font-bold uppercase text-slate-400">Difficulty</label>
                <select
                  value={filters.difficulty || 'all'}
                  onChange={(e) => setFilters((prev) => ({ ...prev, difficulty: e.target.value === 'all' ? undefined : e.target.value }))}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Media Type Filter */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
                <label className="text-[11px] font-bold uppercase text-slate-400">Media Type</label>
                <select
                  value={filters.mediaType || 'all'}
                  onChange={(e) => setFilters((prev) => ({ ...prev, mediaType: e.target.value === 'all' ? undefined : e.target.value }))}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Media</option>
                  <option value="animation">Medical Animation</option>
                  <option value="cadaveric">Cadaveric Demonstration</option>
                  <option value="clinical_demonstration">Clinical Skills</option>
                  <option value="real_surgery">Real Surgery</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
                <label className="text-[11px] font-bold uppercase text-slate-400">Duration</label>
                <div className="grid grid-cols-3 gap-1">
                  {['<3m', '3-5m', '>5m'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, duration: prev.duration === d ? undefined : d }))}
                      className={`px-2 py-1 rounded text-[11px] font-semibold border transition-colors ${
                        filters.duration === d
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results Column */}
            <main className="lg:col-span-3 flex flex-col gap-4">
              {/* Results count & active filter pills */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-white">
                    {filteredResults.length} Verified Video{filteredResults.length === 1 ? '' : 's'}
                  </h2>
                  {filters.category && filters.category !== 'All' && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {filters.category}
                    </span>
                  )}
                  {filters.collection && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                      {filters.collection}
                    </span>
                  )}
                  {filters.subtopic && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {filters.subtopic}
                    </span>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400">Sort by:</label>
                  <select
                    value={filters.sortBy || 'recent'}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="shortest">Shortest Duration</option>
                    <option value="longest">Longest Duration</option>
                    <option value="title">Title (A–Z)</option>
                    <option value="curriculum">Curriculum Order</option>
                  </select>
                </div>
              </div>

              {/* Video Cards Grid or Empty State */}
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredResults.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onSelect={selectVideo}
                      isBookmarked={bookmarkedIds.includes(video.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                /* Explicit Required Meaningful Empty State */
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center my-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
                    <Search size={30} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No verified video available yet
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                    {filters.subtopic
                      ? `We only self-host verified public-domain and open-access medical videos. No verified video has been curated for ${filters.subtopic} yet.`
                      : filters.collection
                      ? `We only self-host verified public-domain and open-access medical videos. No verified video has been curated for ${filters.collection} yet.`
                      : 'No verified medical video matches your search filters. MEDX never fabricates or presents synthetic placeholder videos.'}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-glow-cyan text-xs"
                    >
                      Show All Verified Videos ({videos.length})
                    </button>
                    {isFacultyOrAdmin && (
                      <button
                        type="button"
                        onClick={() => setFacultyModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-slate-700"
                      >
                        Submit Video in Faculty Workspace
                      </button>
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Faculty Add Video Modal */}
      {facultyModalOpen && (
        <FacultyVideoManagerModal
          isOpen={facultyModalOpen}
          onClose={() => setFacultyModalOpen(false)}
          currentUserRole={currentRole}
          currentUserName={currentUser?.name || 'Prof. Dr. M. A. Jalil'}
          onVideoCreated={(newVid) => {
            setVideos((prev) => [newVid, ...prev]);
          }}
        />
      )}
    </section>
  );
};

export default MedicalVideoLibrary;
