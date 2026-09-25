import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
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
  AlertTriangle,
  PictureInPicture,
  Tv,
  RefreshCw,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { SelfHostedMedicalVideo } from '../../types/videoStudio';
import { VideoStudioService } from '../../services/videoStudioService';
import { AuthService } from '../../services/authService';

interface SelfHostedVideoPlayerProps {
  video: SelfHostedMedicalVideo;
  studentId?: string;
  onTimeUpdate?: (seconds: number) => void;
  onCompleted?: () => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const SelfHostedVideoPlayer: React.FC<SelfHostedVideoPlayerProps> = ({
  video,
  studentId,
  onTimeUpdate,
  onCompleted
}) => {
  const effectiveStudentId = studentId || AuthService.getCurrentUser()?.id;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hlsInstanceRef = useRef<Hls | null>(null);

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
  const [isLoading, setIsLoading] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [resumePromptSeconds, setResumePromptSeconds] = useState<number | null>(null);
  const [graphicConsentGiven, setGraphicConsentGiven] = useState<boolean>(
    () => !video.graphicContent || (typeof localStorage !== 'undefined' && localStorage.getItem('medx_graphic_consent') === 'true')
  );
  const [pipSupported, setPipSupported] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript' | 'info'>('chapters');
  const [transcriptFilter, setTranscriptFilter] = useState('');

  const hideControlsTimerRef = useRef<number | null>(null);

  // Check Picture-in-Picture capability
  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setPipSupported(document.pictureInPictureEnabled);
    }
  }, []);

  // Determine media source type accurately
  const mediaUrl = video.playbackUrl || video.playback_url || '';
  const hasYtEmbed = !!video.youtubeVideoId || video.sourceType === 'youtube_nocookie' || (!!video.embedUrl && video.embedUrl.includes('youtube'));

  const isEmbed = hasYtEmbed || (
    video.sourceType === 'permitted_embed' || 
    !!video.embedUrl || 
    mediaUrl.includes('youtube') || 
    mediaUrl.includes('vimeo')
  );

  const isHls = !isEmbed && (video.sourceType === 'hls' || mediaUrl.endsWith('.m3u8'));

  const isNativeFile = !isEmbed && !isHls && (
    video.sourceType === 'self_hosted' ||
    mediaUrl.endsWith('.webm') ||
    mediaUrl.endsWith('.mp4') ||
    mediaUrl.endsWith('.ogv') ||
    mediaUrl.startsWith('/medical-videos/')
  );

  const getEmbedUrl = () => {
    const ytId = video.youtubeVideoId || (video.embedUrl?.includes('embed/') ? video.embedUrl.split('embed/')[1]?.split('?')[0] : '');
    if (ytId) {
      return `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }
    if (video.embedUrl) return video.embedUrl;
    if (mediaUrl.includes('youtube.com/watch?v=')) {
      const vidId = mediaUrl.split('v=')[1]?.split('&')[0];
      if (vidId) return `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }
    return mediaUrl;
  };

  // Initialize playback state and check stored progress
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setBuffered(0);
    setPlaybackError(null);
    setGraphicConsentGiven(!video.graphicContent);
    setResumePromptSeconds(null);

    // Load stored watch progress
    if (effectiveStudentId) {
      VideoStudioService.getProgress(effectiveStudentId, video.id).then((prog) => {
        if (prog?.lastPositionSeconds && prog.lastPositionSeconds > 5 && !prog.completed) {
          setResumePromptSeconds(prog.lastPositionSeconds);
        }
      });
    }
  }, [video.id, video.graphicContent, effectiveStudentId]);

  // Attach media or HLS streaming engine
  useEffect(() => {
    if (isEmbed || !videoRef.current) return;

    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }

    if (isHls) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        hlsInstanceRef.current = hls;
        hls.loadSource(mediaUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            setPlaybackError('HLS streaming error: Unable to load adaptive stream.');
          }
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = mediaUrl;
      }
    } else {
      videoRef.current.src = mediaUrl;
    }

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
    };
  }, [mediaUrl, isHls, isEmbed]);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in search inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'c':
          e.preventDefault();
          setCaptionsEnabled(prev => !prev);
          break;
        case 'arrowleft':
          e.preventDefault();
          seekDelta(-5);
          break;
        case 'arrowright':
          e.preventDefault();
          seekDelta(5);
          break;
        case 'arrowup':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'arrowdown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update media playback time
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    onTimeUpdate?.(curr);

    // Calculate buffer bar
    if (videoRef.current.buffered.length > 0) {
      try {
        const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        const dur = videoRef.current.duration || 1;
        setBuffered(Math.min(100, (end / dur) * 100));
      } catch {}
    }
  }, [onTimeUpdate]);

  // Periodic watch progress persistence
  useEffect(() => {
    if (!isPlaying || !effectiveStudentId) return;
    const interval = window.setInterval(() => {
      if (videoRef.current && currentTime > 0) {
        const isDone = duration > 0 && currentTime >= duration - 5;
        VideoStudioService.saveProgress({
          videoId: video.id,
          studentId: effectiveStudentId,
          lastPositionSeconds: Math.floor(currentTime),
          watchedSeconds: 5,
          completed: isDone
        });
        if (isDone) onCompleted?.();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, video.id, effectiveStudentId, onCompleted]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setResumePromptSeconds(null);
        })
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    if (isEmbed) {
      const iframe = containerRef.current?.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [seconds, true]
        }), '*');
      }
      setCurrentTime(seconds);
      return;
    }
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(seconds, videoRef.current.duration || 0));
    videoRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  }, [isEmbed]);

  const seekDelta = useCallback((delta: number) => {
    if (!videoRef.current) return;
    seekTo(videoRef.current.currentTime + delta);
  }, [seekTo]);

  const adjustVolume = useCallback((delta: number) => {
    if (!videoRef.current) return;
    const newVol = Math.max(0, Math.min(1, videoRef.current.volume + delta));
    videoRef.current.volume = newVol;
    setVolume(newVol);
    setIsMuted(newVol === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  }, [isMuted]);

  const setSpeed = (spd: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
    setPlaybackSpeed(spd);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch {}
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(pos * (videoRef.current.duration || 0));
  };

  const triggerControlsHover = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) window.clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Primary Video Container */}
      <div
        ref={containerRef}
        onMouseMove={triggerControlsHover}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group select-none"
      >
        {/* Graphic Content Warning Overlay */}
        {video.graphicContent && !graphicConsentGiven && (
          <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-600/60 text-amber-400 flex items-center justify-center mb-4 shadow-glow-amber">
              <AlertOctagon size={36} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              BM&DC Clinical Guidance: Graphic Operative Content
            </span>
            <h2 className="text-xl font-bold text-white max-w-lg mb-2">
              Surgical Intra-Operative Visualization
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-lg leading-relaxed mb-6">
              {video.graphicWarningText ||
                'This video depicts genuine intra-operative surgical procedures, open incisions, and anatomical exposure. It is intended strictly for accredited MBBS clinical training.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setGraphicConsentGiven(true);
                togglePlay();
              }}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-amber flex items-center gap-2 cursor-pointer"
            >
              <Play size={16} className="fill-current" />
              <span>I Understand & Consent — Begin Playback</span>
            </button>
          </div>
        )}

        {/* Resume Position Toast Banner */}
        {resumePromptSeconds && graphicConsentGiven && (
          <div className="absolute top-4 left-4 right-4 z-30 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md flex items-center justify-between shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <Clock size={16} className="text-cyan-400" />
              <span>Resume playback from <strong>{formatTime(resumePromptSeconds)}</strong>?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  seekTo(resumePromptSeconds);
                  togglePlay();
                  setResumePromptSeconds(null);
                }}
                className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={() => setResumePromptSeconds(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
              >
                Start from 0:00
              </button>
            </div>
          </div>
        )}

        {/* Playback Error State */}
        {playbackError && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle size={36} className="text-rose-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Playback Error</h3>
            <p className="text-xs text-slate-300 max-w-md mb-4">{playbackError}</p>
            <button
              type="button"
              onClick={() => {
                setPlaybackError(null);
                if (videoRef.current) {
                  videoRef.current.load();
                  togglePlay();
                }
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Retry Playback
            </button>
          </div>
        )}

        {/* Media Presentation Layer */}
        {isEmbed ? (
          /* Privacy-Enhanced Internal Embed with Zero Redirects */
          <div className="w-full h-full relative">
            <iframe
              src={getEmbedUrl()}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          /* Native HTML5 / HLS Media Element */
          <>
            <video
              ref={videoRef}
              playsInline
              autoPlay
              preload="auto"
              poster={video.thumbnailUrl || video.thumbnail_url}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
                setIsLoading(false);
              }}
              onCanPlay={() => {
                setIsLoading(false);
                if (videoRef.current && videoRef.current.paused) {
                  videoRef.current.play().catch(() => {});
                }
              }}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => {
                setIsLoading(false);
                setIsPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                onCompleted?.();
              }}
              onError={() => setPlaybackError('Unable to stream video. Verify media path.')}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            >
              {(video.captionsUrl || video.captions_url) && captionsEnabled && (
                <track
                  kind="subtitles"
                  src={video.captionsUrl || video.captions_url}
                  srcLang="en"
                  label="English Captions"
                  default
                />
              )}
            </video>

            {/* Click-to-Play Center Overlay */}
            {!isPlaying && graphicConsentGiven && !playbackError && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-glow-cyan transform hover:scale-110 transition-transform">
                  <Play size={28} className="fill-current ml-1" />
                </div>
              </div>
            )}

            {/* In-App Custom Controls Overlay */}
            <div
              className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-4 flex flex-col gap-2.5 transition-opacity duration-300 z-20 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Scrub / Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeekClick}
                className="relative h-2 bg-slate-800/80 rounded-full cursor-pointer overflow-hidden group/bar"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-slate-700/60 transition-all"
                  style={{ width: `${buffered}%` }}
                />
                <div
                  className="absolute left-0 top-0 bottom-0 bg-cyan-500 transition-all group-hover/bar:bg-cyan-400 shadow-glow-cyan"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              {/* Bottom Controls Row */}
              <div className="flex items-center justify-between text-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1.5 rounded-lg hover:bg-slate-800/80 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => seekDelta(-5)}
                    aria-label="Rewind 5 seconds"
                    className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => seekDelta(5)}
                    aria-label="Forward 5 seconds"
                    className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
                  >
                    <RotateCw size={16} />
                  </button>

                  <div className="flex items-center gap-1.5 group/vol">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white"
                    >
                      {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (videoRef.current) {
                          videoRef.current.volume = val;
                          videoRef.current.muted = val === 0;
                        }
                        setVolume(val);
                        setIsMuted(val === 0);
                      }}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <span className="font-mono text-[11px] text-slate-400 ml-1">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Closed Captions Button */}
                  {(video.captionsUrl || video.captions_url) && (
                    <button
                      type="button"
                      onClick={() => setCaptionsEnabled(prev => !prev)}
                      title="Toggle closed captions (C)"
                      className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors ${
                        captionsEnabled
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      CC
                    </button>
                  )}

                  {/* Playback Speed Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSpeedMenu(prev => !prev)}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white"
                    >
                      {playbackSpeed}x
                    </button>
                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col gap-1 z-30 min-w-[70px]">
                        {SPEED_OPTIONS.map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => setSpeed(spd)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-semibold text-left transition-colors ${
                              playbackSpeed === spd
                                ? 'bg-cyan-950 text-cyan-300 font-bold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Picture-in-Picture */}
                  {pipSupported && (
                    <button
                      type="button"
                      onClick={togglePiP}
                      title="Picture-in-Picture"
                      className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white"
                    >
                      <PictureInPicture size={16} />
                    </button>
                  )}

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    title="Toggle Fullscreen (F)"
                    className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white"
                  >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chapters & Clinical Transcript Accordion Below Player */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'chapters'
                ? 'bg-blue-950/80 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List size={14} /> Chapters ({video.chapters?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transcript')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'transcript'
                ? 'bg-blue-950/80 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={14} /> Searchable Transcript
          </button>
        </div>

        {/* 1. Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {video.chapters && video.chapters.length > 0 ? (
              video.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => seekTo(ch.timestampSeconds)}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-left hover:border-cyan-500/60 hover:bg-slate-900 transition-all flex items-center justify-between group/ch"
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-xs font-semibold text-slate-200 group-hover/ch:text-cyan-300">
                      {ch.title}
                    </span>
                    {ch.description && (
                      <span className="text-[11px] text-slate-500 line-clamp-1">{ch.description}</span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-cyan-400 font-bold shrink-0">
                    {formatTime(ch.timestampSeconds)}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-500">No chapters configured for this video.</p>
            )}
          </div>
        )}

        {/* 2. Interactive Searchable Transcript Tab */}
        {activeTab === 'transcript' && (
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search transcript keywords (e.g. nerve, artery, incision, hemostasis)..."
                value={transcriptFilter}
                onChange={(e) => setTranscriptFilter(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 max-h-64 overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans scrollbar-thin">
              {Array.isArray(video.transcript) ? (
                <div className="flex flex-col gap-2">
                  {video.transcript
                    .filter(t => !transcriptFilter || t.text.toLowerCase().includes(transcriptFilter.toLowerCase()))
                    .map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => seekTo(item.timestampSeconds)}
                          className="font-mono text-cyan-400 hover:underline shrink-0 text-[11px]"
                        >
                          {formatTime(item.timestampSeconds)}
                        </button>
                        <p>
                          <strong>{item.speaker}:</strong> {item.text}
                        </p>
                      </div>
                    ))}
                </div>
              ) : typeof video.transcript === 'string' ? (
                <p>{video.transcript}</p>
              ) : (
                <p className="text-slate-500">Closed captions available via WebVTT subtitle track.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfHostedVideoPlayer;
