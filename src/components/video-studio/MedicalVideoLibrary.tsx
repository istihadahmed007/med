import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Search, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  SlidersHorizontal,
  Compass,
  GraduationCap
} from 'lucide-react';
import { 
  MEDICAL_VIDEO_LIBRARY, 
  MedicalVideoItem, 
  VideoCategory, 
  OrganSystem 
} from '../../data/medicalVideoLibraryData';
import { MedicalAnimationCanvas } from './MedicalAnimationCanvas';

export const MedicalVideoLibrary: React.FC = () => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'all'>('all');
  const [selectedSystem, setSelectedSystem] = useState<OrganSystem | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<MedicalVideoItem | null>(null);

  // Filtered list
  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MEDICAL_VIDEO_LIBRARY.filter(video => {
      // Category filter
      if (selectedCategory !== 'all' && video.category !== selectedCategory) {
        return false;
      }
      // Organ system filter
      if (selectedSystem !== 'all' && video.system !== selectedSystem) {
        return false;
      }
      // Search query
      if (!q) return true;
      return (
        video.title.toLowerCase().includes(q) ||
        video.titleBn.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.relatedAnatomy.some(a => a.toLowerCase().includes(q)) ||
        video.whatYouWillLearn.some(w => w.toLowerCase().includes(q)) ||
        video.systemName.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, selectedSystem, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: MEDICAL_VIDEO_LIBRARY.length,
      organ: MEDICAL_VIDEO_LIBRARY.filter(v => v.category === 'organ-function').length,
      surgical: MEDICAL_VIDEO_LIBRARY.filter(v => v.category === 'surgical-animations').length,
      pathology: MEDICAL_VIDEO_LIBRARY.filter(v => v.category === 'pathology-disease').length,
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-[#0a1532]/95 to-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Accredited Medical Video & 3D Animation Library
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Medical Animation & Surgery Video Library
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Curated, peer-reviewed 3D medical animations illustrating human organ physiology, 
              intricate surgical procedures, and cellular pathology. Powered by authentic biomedical visualizers and open educational resources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <div className="text-xl font-bold text-cyan-400">{counts.all}</div>
              <div className="text-[11px] text-slate-400 font-medium">Peer-Reviewed Modules</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <div className="text-xl font-bold text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">3D Simulated & Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Main 3 Categories */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedSystem('all'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Topics ({counts.all})
            </button>
            <button
              onClick={() => { setSelectedCategory('organ-function'); setSelectedSystem('all'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'organ-function'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-300" />
              Organ Function ({counts.organ})
            </button>
            <button
              onClick={() => { setSelectedCategory('surgical-animations'); setSelectedSystem('all'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'surgical-animations'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
              Surgical Animations ({counts.surgical})
            </button>
            <button
              onClick={() => { setSelectedCategory('pathology-disease'); setSelectedSystem('all'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'pathology-disease'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
              Pathology & Disease ({counts.pathology})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anatomy, procedure, disease..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Organ System Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
            System:
          </span>
          {[
            { id: 'all', name: 'All Systems' },
            { id: 'cardiovascular', name: 'Cardiovascular' },
            { id: 'respiratory', name: 'Respiratory' },
            { id: 'nervous', name: 'Nervous' },
            { id: 'renal', name: 'Renal' },
            { id: 'hepatobiliary', name: 'Hepatobiliary' },
            { id: 'gastrointestinal', name: 'Gastrointestinal' },
            { id: 'endocrine', name: 'Endocrine' },
            { id: 'surgical', name: 'Surgery & Skills' },
          ].map(sys => (
            <button
              key={sys.id}
              onClick={() => setSelectedSystem(sys.id as OrganSystem | 'all')}
              className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                selectedSystem === sys.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {sys.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No matching educational animations</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search terms or clearing filters to view all 33 medical modules.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSystem('all'); }}
            className="mt-4 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setActiveVideo(video)}
            />
          ))}
        </div>
      )}

      {/* Theater Modal Video Player */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};

// ==========================================
// Video Card Component
// ==========================================
interface VideoCardProps {
  video: MedicalVideoItem;
  onPlay: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColor = useMemo(() => {
    switch (video.category) {
      case 'organ-function':
        return {
          bg: 'bg-cyan-500/10',
          text: 'text-cyan-400',
          border: 'border-cyan-500/30',
          badgeBg: 'bg-cyan-500/20 text-cyan-300'
        };
      case 'surgical-animations':
        return {
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-400',
          border: 'border-indigo-500/30',
          badgeBg: 'bg-indigo-500/20 text-indigo-300'
        };
      case 'pathology-disease':
      default:
        return {
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          border: 'border-rose-500/30',
          badgeBg: 'bg-rose-500/20 text-rose-300'
        };
    }
  }, [video.category]);

  return (
    <div 
      className="group relative flex flex-col rounded-2xl border border-slate-800 bg-[#071126]/90 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-950/30 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Large Professional Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-950 overflow-hidden cursor-pointer" onClick={onPlay}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            // Graceful fallback to default asset
            (e.target as HTMLImageElement).src = '/anatomy/torso_hero.jpg';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* 3D Animation Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold backdrop-blur-md shadow-sm">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>3D Animation</span>
        </div>

        {/* 3D CGI Video Badge if YouTube source available */}
        {video.youtubeId && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-600/90 border border-red-500/40 text-white text-[10px] font-bold shadow-md backdrop-blur-md">
            <Play className="w-2.5 h-2.5 fill-white" />
            <span>3D CGI</span>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/90 text-slate-200 text-[11px] font-mono font-medium border border-slate-800">
          {video.duration}
        </div>

        {/* Central Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-glow transition-all duration-300 ${
            isHovered ? 'scale-110 bg-cyan-400' : 'scale-95 opacity-90'
          }`}>
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category Pill & System */}
          <div className="flex items-center justify-between gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${categoryColor.border} ${categoryColor.bg} ${categoryColor.text}`}>
              {video.categoryName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {video.systemName}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 
              onClick={onPlay}
              className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
            >
              {video.title}
            </h3>
            <div className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
              {video.titleBn}
            </div>
          </div>

          {/* Educational Description */}
          <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
            {video.description}
          </p>

          {/* What You Will Learn preview on card */}
          {video.whatYouWillLearn && video.whatYouWillLearn.length > 0 && (
            <div className="pt-0.5">
              <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>What you will learn:</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-1 italic">
                "{video.whatYouWillLearn[0]}"
              </p>
            </div>
          )}

          {/* Related Anatomy Tags */}
          <div className="pt-1">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Related Anatomy:
            </div>
            <div className="flex flex-wrap gap-1">
              {video.relatedAnatomy.slice(0, 3).map((anat, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[10px]"
                >
                  {anat}
                </span>
              ))}
              {video.relatedAnatomy.length > 3 && (
                <span className="px-1.5 py-0.5 text-slate-500 text-[10px]">
                  +{video.relatedAnatomy.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Attribution & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 truncate max-w-[190px]" title={video.attribution}>
            Source: <span className="text-slate-300 font-medium">{video.attribution.split('&')[0]}</span>
          </span>
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Watch</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Theater Modal Video Player Component
// ==========================================
interface VideoPlayerModalProps {
  video: MedicalVideoItem;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const hasAnimationVideo = Boolean(video.youtubeId || video.embedUrl);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d-animation' | '3d-sim' | 'video'>(
    hasAnimationVideo ? '3d-animation' : '3d-sim'
  );
  const [showBengaliSubtitles, setShowBengaliSubtitles] = useState<boolean>(false);
  const [videoStreamFailed, setVideoStreamFailed] = useState<boolean>(false);

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const duration = video.durationSeconds;

  // Clock interpolation for 3D simulation mode
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && viewMode === '3d-sim') {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1 * playbackSpeed;
          return next >= duration ? 0 : next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, duration, viewMode]);

  // Synchronize playback speed with HTML video element
  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Subtitle extraction
  const currentSubtitle = useMemo(() => {
    const sub = video.subtitles.find(s => currentTime >= s.startSeconds && currentTime <= s.endSeconds);
    if (!sub) return null;
    return showBengaliSubtitles ? sub.textBn : sub.textEn;
  }, [video.subtitles, currentTime, showBengaliSubtitles]);

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;
    if (!document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        ref={modalContainerRef}
        className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-[#071126] shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {video.categoryName}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {video.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-800/90 border border-slate-700/60 text-xs">
              {hasAnimationVideo && (
                <button
                  onClick={() => setViewMode('3d-animation')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === '3d-animation'
                      ? 'bg-red-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>3D Animation</span>
                </button>
              )}
              <button
                onClick={() => setViewMode('3d-sim')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewMode === '3d-sim'
                    ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3D Simulation
              </button>
              {Boolean(video.videoUrl) && (
                <button
                  onClick={() => setViewMode('video')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    viewMode === 'video'
                      ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Video Track
                </button>
              )}
            </div>

            {/* Direct YouTube Link if available */}
            {video.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition-colors"
                title="Watch on YouTube in Full HD"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>YouTube 4K</span>
              </a>
            )}

            {/* Subtitle Language Switcher */}
            <button
              onClick={() => setShowBengaliSubtitles(prev => !prev)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                showBengaliSubtitles
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {showBengaliSubtitles ? 'বাংলা Sub' : 'ENG Sub'}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player View Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden select-none">
          {viewMode === '3d-animation' && hasAnimationVideo ? (
            /* High-Definition 3D Medical Animation Video (YouTube/Responsive Embed) */
            <div className="relative w-full h-full bg-black">
              <iframe
                src={video.embedUrl || `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : viewMode === '3d-sim' ? (
            /* 60fps Real-Time Procedural Medical Simulation Canvas */
            <MedicalAnimationCanvas
              animationType={video.animationType}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              className="w-full h-full"
            />
          ) : (
            /* Video Track */
            videoStreamFailed || !video.videoUrl ? (
              <div className="p-8 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="text-white font-semibold text-sm">Video Stream Temporarily Unavailable</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  External streaming connection is currently restricted. We have enabled the interactive 3D simulation canvas for full educational fidelity.
                </p>
                <button
                  onClick={() => setViewMode('3d-sim')}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all"
                >
                  Switch to 3D Simulation
                </button>
              </div>
            ) : (
              <video
                ref={videoElementRef}
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                playsInline
                muted={isMuted}
                onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  console.warn('Video track failed, falling back to 3D simulation');
                  setVideoStreamFailed(true);
                  setViewMode('3d-sim');
                }}
                className="w-full h-full object-contain"
              />
            )
          )}

          {/* Dynamic Bilingual Subtitles Box (when in 3D-sim or video track) */}
          {viewMode !== '3d-animation' && currentSubtitle && (
            <div className="absolute bottom-16 inset-x-8 flex justify-center pointer-events-none">
              <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-xs sm:text-sm font-medium shadow-2xl text-center max-w-2xl backdrop-blur-md">
                {currentSubtitle}
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        {viewMode === '3d-animation' ? (
          /* Chapters & Quick Navigation for 3D Animation */
          <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto max-w-2xl scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Key Chapters:
              </span>
              {video.chapters.map((chap, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 whitespace-nowrap"
                >
                  {chap.title}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setViewMode('3d-sim')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>3D Simulation Mode</span>
              </button>
              {video.youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          /* Scrubber & Interactive Controls Bar for Canvas/Local Video */
          <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 space-y-2.5">
            {/* Progress Bar / Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 group">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCurrentTime(val);
                    if (videoElementRef.current && viewMode === 'video') {
                      videoElementRef.current.currentTime = val;
                    }
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={() => {
                    setIsPlaying(prev => !prev);
                    if (videoElementRef.current && viewMode === 'video') {
                      if (isPlaying) videoElementRef.current.pause();
                      else videoElementRef.current.play().catch(() => {});
                    }
                  }}
                  className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                {/* Reset / Loop */}
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    if (videoElementRef.current) videoElementRef.current.currentTime = 0;
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => setIsMuted(prev => !prev)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Chapters quick select */}
              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-sm scrollbar-none">
                {video.chapters.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentTime(chap.timestampSeconds);
                      if (videoElementRef.current) videoElementRef.current.currentTime = chap.timestampSeconds;
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-medium truncate max-w-[120px] transition-all ${
                      currentTime >= chap.timestampSeconds && (idx === video.chapters.length - 1 || currentTime < video.chapters[idx + 1].timestampSeconds)
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                    }`}
                    title={chap.title}
                  >
                    {chap.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Playback Speed Selector */}
                <div className="flex items-center gap-1">
                  {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                        playbackSpeed === speed
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Information & "What You Will Learn" Drawer */}
        <div className="p-5 bg-slate-950/90 border-t border-slate-800/80 space-y-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Objectives */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>What You Will Learn</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {video.whatYouWillLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Anatomy & Attribution */}
            <div className="space-y-3">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Key Anatomical Landmarks:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {video.relatedAnatomy.map((anat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                    >
                      {anat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Source: <span className="text-slate-200 font-medium">{video.attribution}</span>
                </span>
                {video.attributionUrl && (
                  <a
                    href={video.attributionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Reference</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
