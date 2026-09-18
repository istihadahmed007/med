import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Subtitles,
  Clock,
  ShieldCheck,
  List,
  FileText,
  Search,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { SelfHostedMedicalVideo } from "../../data/medicalVideoLibraryData";
import { VideoStudioService } from "../../services/videoStudioService";

interface SelfHostedVideoPlayerProps {
  video: SelfHostedMedicalVideo;
  studentId?: string;
  onTimeUpdate?: (seconds: number) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export const SelfHostedVideoPlayer: React.FC<SelfHostedVideoPlayerProps> = ({
  video,
  studentId = "std-bmdc-2026-0891",
  onTimeUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeTab, setActiveTab] = useState<"chapters" | "transcript" | "info">("chapters");
  const [transcriptFilter, setTranscriptFilter] = useState("");

  const hideControlsTimerRef = useRef<number | null>(null);

  // Initialize playback state when video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setBuffered(0);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }

    // Load stored progress
    VideoStudioService.getProgress(studentId, video.id).then((prog) => {
      if (prog?.lastPositionSeconds && videoRef.current && prog.lastPositionSeconds > 2) {
        // Optional: restore position
      }
    });
  }, [video.id, studentId, playbackSpeed]);

  // Handle media time update & auto-save progress
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    onTimeUpdate?.(curr);

    // Calculate buffer progress
    if (videoRef.current.buffered.length > 0) {
      try {
        const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        const dur = videoRef.current.duration || 1;
        setBuffered(Math.min(100, (end / dur) * 100));
      } catch {
        // Safe buffer query
      }
    }
  }, [onTimeUpdate]);

  // Periodic progress saving
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      if (videoRef.current && currentTime > 0) {
        VideoStudioService.saveProgress({
          videoId: video.id,
          studentId,
          lastPositionSeconds: Math.floor(currentTime),
          watchedSeconds: 5,
          completed: duration > 0 && currentTime >= duration - 5,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, video.id, studentId]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Jump to specific time (e.g., chapters or scrub)
  const seekTo = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(seconds, videoRef.current.duration || 0));
    videoRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  // Seek bar scrub click / drag
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * (videoRef.current.duration || 0);
    seekTo(targetTime);
  };

  // Volume & Mute
  const handleVolumeChange = (newVol: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(1, newVol));
    videoRef.current.volume = clamped;
    setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      handleVolumeChange(0.75);
    }
  };

  // Speed selection
  const handleSpeedSelect = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  // Captions toggle
  const toggleCaptions = () => {
    if (!videoRef.current) return;
    const textTracks = videoRef.current.textTracks;
    const nextState = !captionsEnabled;
    setCaptionsEnabled(nextState);
    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = nextState ? "showing" : "disabled";
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Track fullscreen change event
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekTo(currentTime - 5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekTo(currentTime + 5);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleVolumeChange(volume + 0.1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleVolumeChange(volume - 0.1);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        toggleCaptions();
      }
    },
    [togglePlay, seekTo, currentTime, volume, handleVolumeChange, toggleMute, toggleFullscreen, toggleCaptions]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Autohide controls on inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying) {
      hideControlsTimerRef.current = window.setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 3500);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Video Frame & Controls */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative group w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 aspect-video flex items-center justify-center select-none"
      >
        <video
          ref={videoRef}
          src={video.playback_url}
          poster={video.thumbnail_url}
          preload="metadata"
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
        >
          {video.captions_url && (
            <track
              kind="subtitles"
              src={video.captions_url}
              srcLang="en"
              label="English CC"
              default={captionsEnabled}
            />
          )}
        </video>

        {/* Big Center Play Overlay (when paused) */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-blue-600/90 hover:bg-blue-500 hover:scale-105 text-white flex items-center justify-center shadow-glow-blue transition-all backdrop-blur-sm border border-blue-400/40 z-10"
          >
            <Play size={36} className="ml-1 fill-white" />
          </button>
        )}

        {/* Video Header Overlay: Title & Source Badge */}
        <div
          className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none flex items-center justify-between ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-0.5 pointer-events-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {video.category} • {video.specialty.join(", ")}
            </span>
            <h2 className="text-white text-base md:text-lg font-bold drop-shadow-md truncate max-w-xl">
              {video.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-1.5 backdrop-blur-md pointer-events-auto">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-xs text-slate-200 font-medium hidden sm:inline">
              Self-Hosted • Public Domain
            </span>
          </div>
        </div>

        {/* Bottom Floating Control Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 flex flex-col gap-2 ${
            showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress / Seek Timeline Bar */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="relative w-full h-2.5 bg-slate-700/60 hover:h-3.5 rounded-full cursor-pointer transition-all flex items-center group/seek"
          >
            {/* Buffered progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-slate-500/50 rounded-full transition-all duration-200"
              style={{ width: `${buffered}%` }}
            />
            {/* Current playback progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-glow-cyan"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Scrubber thumb */}
            <div
              className="absolute w-3.5 h-3.5 bg-white rounded-full shadow-lg border-2 border-cyan-400 -ml-1.5 opacity-0 group-hover/seek:opacity-100 transition-opacity"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between gap-2 pt-1 text-slate-200">
            {/* Left Controls: Play/Pause, Replay 5s, Forward 5s, Time */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-1.5 hover:text-cyan-400 transition-colors focus:outline-none"
              >
                {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
              </button>

              <button
                onClick={() => seekTo(currentTime - 5)}
                aria-label="Seek backward 5 seconds"
                className="p-1.5 hover:text-cyan-400 transition-colors focus:outline-none text-slate-400"
                title="Rewind 5s (←)"
              >
                <RotateCcw size={17} />
              </button>

              <button
                onClick={() => seekTo(currentTime + 5)}
                aria-label="Seek forward 5 seconds"
                className="p-1.5 hover:text-cyan-400 transition-colors focus:outline-none text-slate-400"
                title="Forward 5s (→)"
              >
                <RotateCw size={17} />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 group/vol pl-1">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1 hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={19} className="text-rose-400" />
                  ) : (
                    <Volume2 size={19} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-14 md:w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  aria-label="Volume slider"
                />
              </div>

              {/* Time Display */}
              <div className="text-xs font-mono text-slate-300 pl-2">
                <span className="text-cyan-400 font-semibold">{formatTime(currentTime)}</span>
                <span className="text-slate-500"> / </span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>

            {/* Right Controls: Speed, Captions, Fullscreen */}
            <div className="flex items-center gap-2 md:gap-3 relative">
              {/* Playback Speed Button & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  aria-label="Playback speed"
                  className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center gap-1"
                >
                  <Sliders size={13} className="text-cyan-400" />
                  <span>{playbackSpeed}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 py-1 w-24 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md flex flex-col z-30">
                    <span className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                      Speed
                    </span>
                    {SPEED_OPTIONS.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedSelect(speed)}
                        className={`px-3 py-1.5 text-xs text-left hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center justify-between transition-colors ${
                          playbackSpeed === speed ? "text-cyan-400 font-bold bg-cyan-950/40" : "text-slate-300"
                        }`}
                      >
                        <span>{speed}x</span>
                        {playbackSpeed === speed && <CheckCircle2 size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Captions Toggle */}
              {video.captions_url && (
                <button
                  onClick={toggleCaptions}
                  aria-label="Toggle closed captions"
                  className={`p-1.5 rounded transition-all ${
                    captionsEnabled
                      ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Captions (C)"
                >
                  <Subtitles size={18} />
                </button>
              )}

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="p-1.5 hover:text-cyan-400 transition-colors focus:outline-none"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize size={19} /> : <Maximize size={19} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Attribution & Metadata Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Legal Redistribution Permission
            </span>
            <span className="text-sm font-bold text-slate-200">
              {video.attribution}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-medium">
            {video.license}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {video.duration}
          </span>
        </div>
      </div>

      {/* Interactive Tabs: Chapters Outline / Full Transcript / Clinical Info */}
      <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl overflow-hidden">
        {/* Tab Navigation Headers */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-3">
          <button
            onClick={() => setActiveTab("chapters")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "chapters"
                ? "border-cyan-400 text-cyan-300 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <List size={16} />
            <span>Key Chapters ({video.chapters?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("transcript")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "transcript"
                ? "border-cyan-400 text-cyan-300 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText size={16} />
            <span>Interactive Transcript</span>
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "info"
                ? "border-cyan-400 text-cyan-300 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Clock size={16} />
            <span>Clinical Overview</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-4 md:p-5">
          {/* 1. Chapters Tab */}
          {activeTab === "chapters" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {video.chapters && video.chapters.length > 0 ? (
                video.chapters.map((ch, idx) => {
                  const isCurrent =
                    currentTime >= ch.timestampSeconds &&
                    (idx === video.chapters!.length - 1 ||
                      currentTime < video.chapters![idx + 1].timestampSeconds);

                  return (
                    <button
                      key={ch.timestampSeconds}
                      onClick={() => seekTo(ch.timestampSeconds)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all group ${
                        isCurrent
                          ? "bg-cyan-950/50 border-cyan-500/60 shadow-glow-cyan/20"
                          : "bg-slate-900/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isCurrent
                              ? "bg-cyan-500 text-slate-950"
                              : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 text-slate-300"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            isCurrent ? "text-cyan-200 font-semibold" : "text-slate-200"
                          }`}
                        >
                          {ch.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-cyan-400/90 shrink-0 ml-2">
                        {formatTime(ch.timestampSeconds)}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="text-sm text-slate-400">No chapters specified for this video.</p>
              )}
            </div>
          )}

          {/* 2. Interactive Transcript Tab */}
          {activeTab === "transcript" && (
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transcript keywords..."
                  value={transcriptFilter}
                  onChange={(e) => setTranscriptFilter(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-4 max-h-64 overflow-y-auto text-sm text-slate-300 leading-relaxed font-sans">
                {video.transcript ? (
                  transcriptFilter ? (
                    <p>
                      {video.transcript.split(new RegExp(`(${transcriptFilter})`, "gi")).map((part, i) =>
                        part.toLowerCase() === transcriptFilter.toLowerCase() ? (
                          <mark key={i} className="bg-cyan-400/30 text-cyan-200 rounded px-1">
                            {part}
                          </mark>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  ) : (
                    <p>{video.transcript}</p>
                  )
                ) : (
                  <p className="text-slate-400">Transcript is available via closed captions.</p>
                )}
              </div>
            </div>
          )}

          {/* 3. Clinical Overview Tab */}
          {activeTab === "info" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-300 leading-relaxed">{video.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Anatomical Structures
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {video.anatomy.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Medical Specialties
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {video.specialty.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Procedures & Tests
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {video.procedure.map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfHostedVideoPlayer;
