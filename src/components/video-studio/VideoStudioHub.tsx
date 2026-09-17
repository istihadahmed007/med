import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  XCircle, 
  Plus, 
  BookOpen, 
  ChevronRight, 
  Cpu, 
  Play, 
  Eye, 
  RefreshCw,
  FileText,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { 
  VideoGenerationJob, 
  CreateVideoJobRequest, 
  LessonVideoAsset, 
  VisualFormat, 
  TargetAudience 
} from '../../types/videoStudio';
import { UserRole } from '../../types';
import { StorageService } from '../../services/storageService';
import { VideoStudioService } from '../../services/videoStudioService';
import { CARDIOVASCULAR_PILOT_LESSONS } from '../../data/cardiovascularPilotData';
import { getLessonVideoTemplate } from '../../data/videoStudioTemplates';
import { EducationalVideoPlayer } from './EducationalVideoPlayer';
import { MedicalReviewModal } from './MedicalReviewModal';

export const VideoStudioHub: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(StorageService.getRole());
  const [activeTab, setActiveTab] = useState<'author' | 'queue' | 'review' | 'preview'>('author');

  // Job Queue & Videos State
  const [jobs, setJobs] = useState<VideoGenerationJob[]>([]);
  const [publishedVideos, setPublishedVideos] = useState<LessonVideoAsset[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(false);
  const [selectedJobForReview, setSelectedJobForReview] = useState<VideoGenerationJob | null>(null);
  const [selectedPreviewVideoId, setSelectedPreviewVideoId] = useState<string>('');

  // Form State for Authoring Studio
  const [selectedLessonId, setSelectedLessonId] = useState<string>(CARDIOVASCULAR_PILOT_LESSONS[1]?.id || 'cvs-physio-cardiac-cycle-wiggers');
  const [learningObjective, setLearningObjective] = useState<string>('');
  const [references, setReferences] = useState<string>('');
  const [promptDescription, setPromptDescription] = useState<string>('');
  const [visualFormat, setVisualFormat] = useState<VisualFormat>('3d-macro');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('undergraduate-mbbs');
  const [requiredStructures, setRequiredStructures] = useState<string>('Left Ventricle, Mitral Valve, Aortic Valve, Ascending Aorta');
  const [modelIdentifier, setModelIdentifier] = useState<string>('FreedomIntelligence/MedGen-1.3B');
  const [resolution, setResolution] = useState<'832x480' | '720x480'>('832x480');
  const [seed, setSeed] = useState<number>(1042);
  const [isSubmittingJob, setIsSubmittingJob] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto-activate author mode when entering Video Studio
  useEffect(() => {
    if (currentRole === 'student') {
      handleRoleChange('author');
    }
  }, []);

  // Synchronize form when lesson selection changes
  const loadLessonTemplate = (lessonId: string) => {
    const template = getLessonVideoTemplate(lessonId);
    const lesson = CARDIOVASCULAR_PILOT_LESSONS.find(l => l.id === lessonId);
    if (template) {
      setPromptDescription(template.defaultPrompt);
      setRequiredStructures(template.requiredStructures.join(', '));
      setVisualFormat(template.visualFormat);
      setTargetAudience(template.targetAudience);
      setSeed(template.seed);
      setLearningObjective(template.learningObjective || lesson?.learningObjectives?.[1] || lesson?.learningObjectives?.[0] || '');
      setReferences(template.references?.join('; ') || lesson?.references?.join('; ') || 'BM&DC Curriculum, Guyton & Hall 14th ed.');
    }
  };

  useEffect(() => {
    loadLessonTemplate(selectedLessonId);
  }, [selectedLessonId]);

  // Load jobs and published videos
  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const activeRole = currentRole === 'student' ? 'author' : currentRole;
      const jobList = await VideoStudioService.getJobs(activeRole);
      setJobs(jobList);
    } catch (err) {
      console.warn('Failed to load video jobs:', err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const fetchPublishedVideos = async () => {
    try {
      const vids = await VideoStudioService.getPublishedVideos();
      setPublishedVideos(vids);
    } catch (err) {
      console.warn('Failed to load published videos:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchPublishedVideos();
    // Fast polling every 4 seconds to observe real-time queue transitions
    const interval = setInterval(fetchJobs, 4000);
    return () => clearInterval(interval);
  }, [currentRole]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    StorageService.setRole(role);
  };

  // Submit Job
  const handleQueueJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback(null);

    // Ensure session has authoring privilege
    if (currentRole === 'student') {
      handleRoleChange('author');
    }

    const lesson = CARDIOVASCULAR_PILOT_LESSONS.find(l => l.id === selectedLessonId);
    if (!lesson) {
      setSubmissionFeedback({ type: 'error', message: 'Please choose a valid curriculum lesson.' });
      return;
    }

    if (!promptDescription.trim()) {
      setSubmissionFeedback({ type: 'error', message: 'Visual description prompt cannot be empty.' });
      return;
    }

    setIsSubmittingJob(true);
    try {
      const structures = requiredStructures.split(',').map(s => s.trim()).filter(Boolean);
      const refs = references.split(';').map(s => s.trim()).filter(Boolean);

      const payload: CreateVideoJobRequest = {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        phase: lesson.phase,
        subject: lesson.subjectName,
        learningObjective,
        references: refs,
        prompt: promptDescription,
        visualFormat,
        targetAudience,
        requiredStructures: structures,
        resolution,
        seed: Number(seed) || Math.floor(Math.random() * 10000)
      };

      const result = await VideoStudioService.queueJob(payload);

      setSubmissionFeedback({ 
        type: 'success', 
        message: `Job ${result.job?.id || 'vj-queued'} queued successfully! ${result.message || 'Dispatched to the MedGen worker queue.'}` 
      });
      fetchJobs();
      setActiveTab('queue');
    } catch (err: any) {
      setSubmissionFeedback({ type: 'error', message: err.message || 'Submission error.' });
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleRetryJob = async (jobId: string) => {
    try {
      await VideoStudioService.retryJob(jobId, currentRole);
      fetchJobs();
    } catch (err) {
      console.warn('Failed to retry job:', err);
    }
  };

  const handleCancelJob = async (jobId: string) => {
    try {
      await VideoStudioService.cancelJob(jobId, currentRole);
      fetchJobs();
    } catch (err) {
      console.warn('Failed to cancel job:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Top Header & Role Control */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              Instructor & Faculty Module
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-950 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>MedGen-1.3B Medical Diffusion</span>
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-cyan-400" />
            <span>AI Video Authoring Studio</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Curriculum-grounded medical animation synthesis for MBBS education. Decoupled GPU worker adapter, strict checkpoint validation, and 6-point BM&DC faculty peer-review governance.
          </p>
        </div>

        {/* Persona Switcher */}
        <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 self-start md:self-auto">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span>Governance Role</span>
            <span className="text-cyan-400 font-bold">{currentRole.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1">
            {(['author', 'reviewer', 'admin', 'student'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold capitalize transition-colors ${
                  currentRole === r
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-glow-cyan'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Studio Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('author')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'author'
              ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>1. Create Generation Brief</span>
        </button>

        <button
          onClick={() => setActiveTab('queue')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all relative ${
            activeTab === 'queue'
              ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>2. Queue & Telemetry Monitor</span>
          {jobs.filter(j => j.status === 'running' || j.status === 'queued').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'review'
              ? 'bg-indigo-600 text-white shadow-glow-cyan font-black'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. Faculty Peer-Review Board</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
            {jobs.filter(j => j.status === 'succeeded' && j.publicationStatus === 'in_review').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'preview'
              ? 'bg-emerald-600 text-white shadow-glow-cyan font-black'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>4. Curriculum Video Showcase</span>
        </button>
      </div>

      {/* TAB 1: AUTHORING STUDIO (CREATE GENERATION BRIEF) */}
      {activeTab === 'author' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Curriculum-Grounded Prompt Architect</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Formulate structured briefs tethered directly to BM&DC learning objectives.
                  </p>
                </div>
              </div>

              {/* Feedback Alert */}
              {submissionFeedback && (
                <div className={`p-4 rounded-2xl text-xs flex items-start gap-3 border ${
                  submissionFeedback.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                }`}>
                  {submissionFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <p className="leading-relaxed">{submissionFeedback.message}</p>
                </div>
              )}

              <form onSubmit={handleQueueJob} className="space-y-4">
                {/* Lesson Selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Target BM&DC Curriculum Lesson
                    </label>
                    <button
                      type="button"
                      onClick={() => loadLessonTemplate(selectedLessonId)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Reload tailored prompts, structures, and visual format for this lesson"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset to Template</span>
                    </button>
                  </div>
                  <select
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                  >
                    {CARDIOVASCULAR_PILOT_LESSONS.map((l) => (
                      <option key={l.id} value={l.id}>
                        [{l.phase}] {l.subjectName} — {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Objective (Grounding) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Curriculum Learning Objective</span>
                    <span className="text-[10px] font-mono text-cyan-400">Grounding Anchor</span>
                  </label>
                  <textarea
                    value={learningObjective}
                    onChange={(e) => setLearningObjective(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    required
                  />
                </div>

                {/* Supporting Literature References */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Supporting References & Textbooks
                  </label>
                  <input
                    type="text"
                    value={references}
                    onChange={(e) => setReferences(e.target.value)}
                    placeholder="e.g. Guyton & Hall 14th ed., Ganong 26th ed."
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Prompt Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Visual Description (Medical Prompt)</span>
                    <span className="text-[10px] text-slate-400">Avoid vague artistic terms</span>
                  </label>
                  <textarea
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe physiological movement, anatomical cross-section, valve dynamics, or cellular processes..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                    required
                  />
                </div>

                {/* Visual Format & Target Cohort */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Visual Format</label>
                    <select
                      value={visualFormat}
                      onChange={(e) => setVisualFormat(e.target.value as VisualFormat)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="3d-macro">3D Anatomical Animation (Macro)</option>
                      <option value="cellular-micro">Cellular & Biophysical Micro-Scale</option>
                      <option value="clinical-bedside">Clinical Bedside Orientation</option>
                      <option value="surgical-orientation">Surgical Planes Orientation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Target Cohort</label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="undergraduate-mbbs">Undergraduate MBBS (Pre-clinical & Para-clinical)</option>
                      <option value="clinical-intern">Clinical Clerkship / Intern</option>
                      <option value="postgraduate-fellow">Postgraduate / FCPS Exam Candidate</option>
                    </select>
                  </div>
                </div>

                {/* Required Structures */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Required Anatomical Structures / Key Events (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={requiredStructures}
                    onChange={(e) => setRequiredStructures(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Advanced Technical Settings */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Model Checkpoint</label>
                    <input
                      type="text"
                      value={modelIdentifier}
                      readOnly
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-cyan-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Resolution</label>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-200"
                    >
                      <option value="832x480">832x480 (16:9 Standard)</option>
                      <option value="720x480">720x480 (SD 3:2)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Inference Seed</label>
                    <input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(parseInt(e.target.value) || 1042)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fixed output: 49 frames @ 16 fps (~3.0s loop clip)</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingJob}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-slate-950 font-black text-xs transition-all shadow-glow-cyan disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmittingJob ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Queuing Job...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>Dispatch to MedGen Worker</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Architectural Guidance & Guardrails */}
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-slate-950 border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>MedGen Engineering Policies</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Fail-Safe Weights:</strong> Strict check ensures `MedGen-1.3B` medical weights are loaded. Silently falling back to general Wan2.1 is strictly blocked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>License Boundary:</strong> Raw `MedVideoCap-55K` dataset clips are restricted for research only and never published directly as production clips.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>No In-Browser Model:</strong> Heavy video diffusion runs purely in the containerized GPU worker daemon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Peer-Review Required:</strong> Every asset starts as a private draft. Faculty sign-off is mandatory prior to student exposure.</span>
                </li>
              </ul>
            </div>

            {/* Quick Pilot Sample Card */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Verified Pilot Checkpoint
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Published
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">
                Cardiac Ventricular Systole & Valvular Dynamics (cv-004)
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                49 frames @ 16fps generated with seed 1042. Contains interactive checkpoint question, verified Guyton references, and bilingual subtitles.
              </p>
              <button
                onClick={() => setActiveTab('preview')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-cyan-400 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-800"
              >
                <span>View in Curriculum Showcase</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUEUE & TELEMETRY MONITOR */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Asynchronous Worker Queue Telemetry</span>
              </h3>
              <p className="text-xs text-slate-400">
                Polls `/api/video-studio/worker/poll` for active GPU generation tasks.
              </p>
            </div>
            <button
              onClick={fetchJobs}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-800"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingJobs ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </button>
          </div>

          {/* Job Table / Cards */}
          <div className="grid grid-cols-1 gap-4">
            {jobs.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                No active or historical video generation jobs found in queue.
              </div>
            ) : (
              jobs.map((job) => {
                let statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300">
                    {job.status}
                  </span>
                );

                if (job.status === 'succeeded') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Succeeded</span>
                    </span>
                  );
                } else if (job.status === 'running') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Generating (GPU)</span>
                    </span>
                  );
                } else if (job.status === 'queued') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-950 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Queued</span>
                    </span>
                  );
                } else if (job.status === 'failed') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-950 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>Failed</span>
                    </span>
                  );
                }

                return (
                  <div key={job.id} className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-cyan-400">{job.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs font-bold text-white">{job.lessonTitle}</span>
                        <span className="text-[10px] font-mono text-slate-500">[{job.phase}]</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {statusBadge}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                          {job.publicationStatus}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {job.prompt}
                    </p>

                    {/* Telemetry Metrics Bar */}
                    {job.telemetry && (
                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-300">
                        <div>
                          <span className="text-slate-500">Model: </span>
                          <strong className="text-cyan-300">{job.telemetry.model_identifier}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Seed: </span>
                          <strong className="text-white">{job.telemetry.seed}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Duration: </span>
                          <strong className="text-white">{job.telemetry.duration_seconds.toFixed(1)}s</strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Peak VRAM: </span>
                          <strong className="text-purple-300">{job.telemetry.peak_vram_mb} MB</strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Weights: </span>
                          <strong className="text-emerald-400">Verified Medical</strong>
                        </div>
                      </div>
                    )}

                    {/* Failure Explanation */}
                    {job.failureReason && (
                      <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 space-y-1">
                        <strong className="font-bold flex items-center gap-1 text-rose-200">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Worker Failure Explanation</span>
                        </strong>
                        <p className="font-mono text-[11px]">{job.failureReason}</p>
                      </div>
                    )}

                    {/* Controls */}
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <span className="text-[11px] text-slate-500">
                        Created: {new Date(job.createdAt).toLocaleTimeString()}
                      </span>

                      <div className="flex items-center gap-2">
                        {job.status === 'failed' && (
                          <button
                            onClick={() => handleRetryJob(job.id)}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry Job</span>
                          </button>
                        )}

                        {(job.status === 'queued' || job.status === 'running') && (
                          <button
                            onClick={() => handleCancelJob(job.id)}
                            className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs"
                          >
                            Cancel
                          </button>
                        )}

                        {job.status === 'succeeded' && (
                          <button
                            onClick={() => setSelectedJobForReview(job)}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Faculty Peer Review</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FACULTY PEER-REVIEW BOARD */}
      {activeTab === 'review' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>Independent Medical Faculty Review Board</span>
            </h3>
            <p className="text-xs text-slate-400">
              Only approved and published video assets become visible to students in the BM&DC learning companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.filter(j => j.status === 'succeeded').map((job) => (
              <div key={job.id} className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {job.phase}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      job.publicationStatus === 'published'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : job.publicationStatus === 'in_review'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {job.publicationStatus}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{job.lessonTitle}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{job.prompt}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">Seed: {job.telemetry?.seed || 1042}</span>
                  <button
                    onClick={() => setSelectedJobForReview(job)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Audit & Sign-off</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CURRICULUM VIDEO SHOWCASE */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" />
                <span>Student Learning Companion Video Embed</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
                {publishedVideos.length} Published Clinical Modules
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live mobile-optimized video player rendering published, peer-reviewed medical assets. Select any curriculum topic below to watch its real-time 60fps simulation, synchronized bilingual subtitles, chapters, and clinical quiz stops.
            </p>
          </div>

          {/* Module Selector Pill Bar */}
          {publishedVideos.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {publishedVideos.map((vid: LessonVideoAsset) => {
                const isSelected = selectedPreviewVideoId ? selectedPreviewVideoId === vid.id : publishedVideos[0]?.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setSelectedPreviewVideoId(vid.id)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-glow-cyan'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{vid.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {publishedVideos.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              {(() => {
                const activeVideo = publishedVideos.find((v: LessonVideoAsset) => v.id === selectedPreviewVideoId) || publishedVideos[0];
                return (
                  <EducationalVideoPlayer
                    key={activeVideo.id}
                    video={activeVideo}
                    className="w-full"
                  />
                );
              })()}
            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
              No published videos available yet. Sign off on drafts in the Faculty Peer-Review Board tab.
            </div>
          )}
        </div>
      )}

      {/* Global Medical Peer Review Modal */}
      {selectedJobForReview && (
        <MedicalReviewModal
          job={selectedJobForReview}
          isOpen={true}
          onClose={() => setSelectedJobForReview(null)}
          onReviewSubmitted={() => {
            fetchJobs();
            fetchPublishedVideos();
          }}
        />
      )}
    </div>
  );
};
