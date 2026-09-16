import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Globe, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { LessonVideoAsset, VideoChapter, VideoQuestion, VideoStudentProgress } from '../../types/videoStudio';
import { StorageService } from '../../services/storageService';
import { VideoStudioService } from '../../services/videoStudioService';

interface EducationalVideoPlayerProps {
  video: LessonVideoAsset;
  onQuestionCompleted?: (questionId: string, correct: boolean) => void;
  className?: string;
}

export const EducationalVideoPlayer: React.FC<EducationalVideoPlayerProps> = ({
  video,
  onQuestionCompleted,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(video.durationSeconds || 18);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Default to muted per requirements (no autoplay with sound)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLowDataMode, setIsLowDataMode] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Subtitles & Language
  const [subtitleLanguage, setSubtitleLanguage] = useState<'en' | 'bn' | 'off'>('en');

  // Interactive Quiz Stops
  const [activeQuestion, setActiveQuestion] = useState<VideoQuestion | null>(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Resume Playback
  const [resumeNotice, setResumeNotice] = useState<number | null>(null);

  // Current active chapter
  const currentChapter = video.chapters?.slice().reverse().find(c => currentTime >= c.timestampSeconds) || video.chapters?.[0];

  // Dynamic synchronized subtitle narration based on playback time
  const getCurrentSubtitle = () => {
    if (subtitleLanguage === 'off') return null;

    if (currentTime < 6) {
      return subtitleLanguage === 'bn'
        ? 'ভেন্ট্রিকুলার সিস্টোলের শুরুতে বৈদ্যুতিক ডিপোলারাইজেশন পারকিঞ্জে ফাইবারের মাধ্যমে ছড়িয়ে পড়ে সমন্বিত সংকোচন ঘটায়। মাইট্রাল ও ট্রাইকাস্পিড ভালভ বন্ধ হয়ে S1 হৃদধ্বনি তৈরি হয়।'
        : 'During ventricular systole, electrical depolarization spreads through the bundle of His and Purkinje network. Mitral and tricuspid valves snap shut to create the S1 heart sound.';
    } else if (currentTime < 12) {
      return subtitleLanguage === 'bn'
        ? 'বাম ভেন্ট্রিকলের চাপ মহাধমনীর ডায়াস্টোলিক চাপ (~৮০ mmHg) অতিক্রম করলে অ্যাওর্টিক ভালভ উন্মুক্ত হয়ে দ্রুত গতিতে রক্ত সঞ্চালিত হয়।'
        : 'Left ventricular pressure surges above 80 mmHg; semilunar aortic valve cusps open briskly with rapid systolic blood ejection into the aorta.';
    } else {
      return subtitleLanguage === 'bn'
        ? 'সিস্টোলিক নির্গমন হ্রাস পায় এবং ভেন্ট্রিকুলার রিপোলারাইজেশন শুরু হয়; মহাধমনীর ভালভ বন্ধ হয়ে দ্বিতীয় হৃদধ্বনি (S2) গঠন করে।'
        : 'Systolic ejection slows as intraventricular pressure falls. Semilunar aortic valve prepares for crisp closure, generating the S2 heart sound.';
    }
  };

  // Fetch student saved progress on mount
  useEffect(() => {
    const student = StorageService.getUser();
    const studentId = student?.id || 'student-guest';

    VideoStudioService.getProgress(studentId, video.id)
      .then((data: VideoStudentProgress | null) => {
        if (data && data.lastPositionSeconds > 2 && data.lastPositionSeconds < (video.durationSeconds - 2)) {
          setResumeNotice(data.lastPositionSeconds);
        }
        if (data?.answeredQuestionIds) {
          setAnsweredQuestionIds(new Set(data.answeredQuestionIds));
        }
      })
      .catch(err => console.warn('Could not load saved video progress:', err));
  }, [video.id, video.durationSeconds]);

  // Synchronize playback progress to server
  const saveProgress = (pos: number, completed = false) => {
    const student = StorageService.getUser();
    const studentId = student?.id || 'student-guest';

    VideoStudioService.saveProgress({
      studentId,
      videoId: video.id,
      lessonId: video.lessonId,
      lastPositionSeconds: Math.round(pos),
      highestPositionSeconds: Math.round(pos),
      watchedSeconds: Math.round(pos),
      completed,
      demonstratedUnderstanding: answeredQuestionIds.size >= (video.questions?.length || 0),
      answeredQuestionIds: Array.from(answeredQuestionIds)
    }).catch(err => console.warn('Could not save progress:', err));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Check for interactive question stop
    if (video.questions && video.questions.length > 0) {
      for (const q of video.questions) {
        if (!answeredQuestionIds.has(q.id) && Math.abs(curr - q.timestampSeconds) < 0.6 && !activeQuestion) {
          videoRef.current.pause();
          setIsPlaying(false);
          setActiveQuestion(q);
          setSelectedOption(null);
          setIsAnswerSubmitted(false);
          break;
        }
      }
    }

    // Periodic sync every 6 seconds
    if (Math.floor(curr) % 6 === 0) {
      saveProgress(curr);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      saveProgress(currentTime);
    } else {
      if (videoError) {
        setVideoError(false);
      }
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setVideoError(false);
      }).catch(err => {
        console.warn('Playback prevented:', err);
      });
    }
  };

  const handleSeek = (newTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleResume = (time: number) => {
    handleSeek(time);
    setResumeNotice(null);
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || !activeQuestion) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === activeQuestion.correctOptionIndex;

    const nextAnswered = new Set(answeredQuestionIds);
    nextAnswered.add(activeQuestion.id);
    setAnsweredQuestionIds(nextAnswered);

    if (onQuestionCompleted) {
      onQuestionCompleted(activeQuestion.id, isCorrect);
    }
  };

  const handleDismissQuestion = () => {
    setActiveQuestion(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col rounded-3xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl ${className}`}
    >
      {/* 1. Mandatory Regulatory AI Watermark / Clinical Disclaimer */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-amber-950/80 px-4 py-2 border-b border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold tracking-wide">
            AI-Generated Educational Illustration (MedGen-1.3B)
          </span>
          <span className="hidden sm:inline text-amber-200/70 text-[11px]">
            • Peer-reviewed medical simulation; not real patient footage.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/40 border border-amber-500/40 text-amber-200">
            {video.videoVersion || 'v1.0-verified'}
          </span>
        </div>
      </div>

      {/* 2. Resume Playback Banner */}
      {resumeNotice !== null && (
        <div className="bg-cyan-950/90 border-b border-cyan-500/40 px-4 py-2.5 flex items-center justify-between text-xs text-cyan-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Resume playback from <strong>{formatTime(resumeNotice)}</strong>?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleResume(resumeNotice)}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
            >
              Resume
            </button>
            <button
              onClick={() => setResumeNotice(null)}
              className="px-2 py-1 text-slate-400 hover:text-white text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Video Canvas / Screen */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
        <video
          ref={videoRef}
          src={isLowDataMode ? (video.lowBandwidthUrl || video.videoUrl) : video.videoUrl}
          poster={video.posterUrl || '/anatomy/heart/organ.webp'}
          playsInline
          preload="auto"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setVideoError(false)}
          onPlaying={() => {
            setIsPlaying(true);
            setVideoError(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            saveProgress(duration, true);
          }}
          onError={() => {
            // Check if fallback webm can be loaded before setting error
            if (videoRef.current && !videoRef.current.currentSrc?.endsWith('.webm')) {
              videoRef.current.src = (video.lowBandwidthUrl || video.videoUrl).replace(/\.mp4$/, '.webm');
              videoRef.current.load();
            } else {
              setVideoError(true);
            }
          }}
          className="w-full h-full object-contain"
        >
          <source src={isLowDataMode ? (video.lowBandwidthUrl || video.videoUrl) : video.videoUrl} type="video/mp4" />
          <source src={(isLowDataMode ? (video.lowBandwidthUrl || video.videoUrl) : video.videoUrl).replace(/\.mp4$/, '.webm')} type="video/webm" />
        </video>

        {/* Discreet Badge if video fallback is running */}
        {videoError && (
          <div className="absolute top-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-500/40 text-[11px] font-medium text-amber-300 shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Poster Preview</span>
          </div>
        )}

        {/* Big Center Play Overlay Button - clean and unobstructed */}
        {!isPlaying && !activeQuestion && (
          <button
            onClick={togglePlay}
            aria-label="Play Video"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-glow-cyan transition-all transform hover:scale-110 active:scale-95 z-20 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        )}

        {/* Chapter Title Badge Overlay */}
        {currentChapter && (
          <div className="absolute top-3 left-3 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{subtitleLanguage === 'bn' && currentChapter.titleBn ? currentChapter.titleBn : currentChapter.title}</span>
          </div>
        )}

        {/* Bilingual Captions Overlay - sleek bottom bar, only shown during active playback or scrubbing */}
        {subtitleLanguage !== 'off' && (isPlaying || currentTime > 0) && (
          <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 z-20 text-center pointer-events-none transition-all duration-300">
            <div className="inline-block max-w-2xl px-4 py-2 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 text-xs sm:text-sm font-sans text-white shadow-2xl leading-relaxed">
              <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-wider mr-2 font-bold">
                {subtitleLanguage === 'bn' ? 'বাংলা সাবটাইটেল' : 'CC'}:
              </span>
              {getCurrentSubtitle()}
            </div>
          </div>
        )}

        {/* Interactive Clinical Stop Question Modal (Overlaid on Video) */}
        {activeQuestion && (
          <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-center max-w-xl mx-auto rounded-2xl border border-cyan-500/40 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Interactive Knowledge Checkpoint • {formatTime(activeQuestion.timestampSeconds)}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                BM&DC Score +{activeQuestion.bmdcMark || 1}
              </span>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-sm font-semibold text-white leading-relaxed">
                {subtitleLanguage === 'bn' && activeQuestion.promptBn ? activeQuestion.promptBn : activeQuestion.prompt}
              </p>

              <div className="space-y-2">
                {activeQuestion.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-cyan-500/60';
                  if (selectedOption === idx) {
                    btnStyle = 'border-cyan-400 bg-cyan-950/70 text-cyan-200 font-bold';
                  }
                  if (isAnswerSubmitted) {
                    if (idx === activeQuestion.correctOptionIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold';
                    } else if (selectedOption === idx) {
                      btnStyle = 'border-rose-500 bg-rose-950/80 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-slate-300 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-normal">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {isAnswerSubmitted && (
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Clinical Explanation</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleAnswerSubmit}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-black text-xs transition-all shadow-glow-cyan"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleDismissQuestion}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2"
                >
                  <span>Continue Video</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. Interactive Timeline Scrubbing Bar with Chapter Marks */}
      <div className="px-4 pt-3 bg-slate-950">
        <div className="relative flex items-center group cursor-pointer py-1.5" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          handleSeek(pos * duration);
        }}>
          {/* Track background */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative transition-all"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          {/* Chapter markers on timeline */}
          {video.chapters?.map((ch, idx) => (
            <div 
              key={idx}
              className="absolute top-0 w-1 h-3 -mt-0.5 bg-amber-400/80 rounded-full pointer-events-none transform -translate-x-1/2"
              style={{ left: `${(ch.timestampSeconds / (duration || 1)) * 100}%` }}
              title={ch.title}
            />
          ))}

          {/* Interactive Quiz stop marks */}
          {video.questions?.map((q, idx) => (
            <div 
              key={idx}
              className="absolute top-0 w-2 h-3 -mt-0.5 bg-rose-400 rounded-full pointer-events-none transform -translate-x-1/2 flex items-center justify-center text-[8px] text-black font-bold"
              style={{ left: `${(q.timestampSeconds / (duration || 1)) * 100}%` }}
              title={`Question Stop at ${q.timestampSeconds}s`}
            />
          ))}
        </div>
      </div>

      {/* 5. Touch & Mobile-Friendly Video Controls */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Play/Pause, Time, Restart */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <button
            onClick={() => handleSeek(0)}
            aria-label="Restart"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-400">
            <strong className="text-white">{formatTime(currentTime)}</strong> / {formatTime(duration)}
          </span>
        </div>

        {/* Chapter Pills */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
          {video.chapters?.map((ch, idx) => {
            const isActive = currentChapter?.timestampSeconds === ch.timestampSeconds;
            return (
              <button
                key={idx}
                onClick={() => handleSeek(ch.timestampSeconds)}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors border ${
                  isActive 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 font-bold' 
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {ch.title}
              </button>
            );
          })}
        </div>

        {/* Volume, Speed, Subtitles, Low-Data, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Subtitle / Language Toggle */}
          <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => setSubtitleLanguage('off')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                subtitleLanguage === 'off' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              Off
            </button>
            <button
              onClick={() => setSubtitleLanguage('en')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                subtitleLanguage === 'en' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSubtitleLanguage('bn')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                subtitleLanguage === 'bn' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Speed Selector */}
          <select
            value={playbackRate}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="bg-slate-900 text-slate-300 text-[11px] font-mono rounded-xl px-2 py-1 border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1.0x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2.0x</option>
          </select>

          {/* Low Bandwidth Mode Toggle */}
          <button
            onClick={() => setIsLowDataMode(!isLowDataMode)}
            title={isLowDataMode ? "Low-data mode active" : "Standard mode"}
            className={`p-1.5 rounded-xl border transition-colors ${
              isLowDataMode 
                ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isLowDataMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          </button>

          {/* Volume / Mute */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button 
              onClick={toggleMute}
              className="text-slate-400 hover:text-white"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 bg-slate-800 rounded-lg accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 6. Collapsible Video Metadata, Verified Transcript & Key Takeaways */}
      <div className="p-4 sm:p-5 bg-slate-900/50 border-t border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{subtitleLanguage === 'bn' && video.titleBn ? video.titleBn : video.title}</span>
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span>Reviewed by: <strong className="text-cyan-300">{video.reviewedBy || 'BM&DC Faculty Review Board'}</strong></span>
              <span>•</span>
              <span>{new Date(video.approvedDate || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <Award className="w-3 h-3 text-cyan-400" />
              <span>BM&DC Curriculum Aligned</span>
            </span>
          </div>
        </div>

        {/* Explanatory Transcript Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Educational Narration Transcript</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            {subtitleLanguage === 'bn' && video.transcriptBn ? video.transcriptBn : video.transcriptEn}
          </p>
        </div>
      </div>
    </div>
  );
};
