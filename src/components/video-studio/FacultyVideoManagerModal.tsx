import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  ShieldCheck,
  Video,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Archive,
  Eye,
  RefreshCw,
  Play,
  Check,
  ExternalLink,
  Sparkles,
  Trash2,
  Edit3,
  Layers,
  HelpCircle,
  Activity
} from 'lucide-react';
import { SelfHostedMedicalVideo, VokaCandidateVideo, VokaSyncReport } from '../../types/videoStudio';
import { VideoStudioService } from '../../services/videoStudioService';
import { ANATOMY_COLLECTIONS, SURGERY_COLLECTIONS, VIDEO_CATEGORIES } from '../../data/medicalVideoLibraryData';

export const MEDX_SECTIONS = [
  'Anatomy and Organ Function',
  'Physiology',
  'General Surgery',
  'Cardiothoracic Surgery',
  'Neurosurgery',
  'Orthopaedic Surgery',
  'Gastrointestinal Surgery',
  'Urology',
  'Obstetrics and Gynaecology',
  'ENT Surgery',
  'Ophthalmology',
  'Plastic and Reconstructive Surgery',
  'Anaesthesia and Critical Care',
  'Clinical Procedures',
  'Radiology and Medical Imaging',
  'Pathology and Disease Mechanisms',
  'Emergency Medicine',
  'Paediatrics',
  'Internal Medicine',
  'Community Medicine and Prevention'
];

interface FacultyVideoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoCreated?: (video: SelfHostedMedicalVideo) => void;
  existingVideo?: SelfHostedMedicalVideo | null;
  currentUserRole?: string;
  currentUserName?: string;
  initialTab?: 'voka_sync' | 'manual';
}

export const FacultyVideoManagerModal: React.FC<FacultyVideoManagerModalProps> = ({
  isOpen,
  onClose,
  onVideoCreated,
  existingVideo,
  currentUserRole = 'faculty',
  currentUserName = 'Prof. Dr. M. A. Jalil',
  initialTab = 'voka_sync'
}) => {
  const [activeTab, setActiveTab] = useState<'voka_sync' | 'manual'>(
    existingVideo ? 'manual' : initialTab
  );

  // VOKA Sync State
  const [vokaCandidates, setVokaCandidates] = useState<VokaCandidateVideo[]>([]);
  const [syncReport, setSyncReport] = useState<VokaSyncReport | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isHealthChecking, setIsHealthChecking] = useState(false);
  const [healthCheckResult, setHealthCheckResult] = useState<any | null>(null);
  const [vokaLoading, setVokaLoading] = useState(false);
  const [vokaMessage, setVokaMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewCandidate, setPreviewCandidate] = useState<VokaCandidateVideo | null>(null);
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editedSection, setEditedSection] = useState<string>('');

  // Manual Form State
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState(existingVideo?.title || '');
  const [titleBn, setTitleBn] = useState(existingVideo?.titleBn || '');
  const [summary, setSummary] = useState(existingVideo?.summary || '');
  const [description, setDescription] = useState(existingVideo?.description || '');
  const [category, setCategory] = useState(existingVideo?.category || 'Anatomy');
  const [collection, setCollection] = useState(existingVideo?.collection || 'Gross Anatomy');
  const [subtopic, setSubtopic] = useState(existingVideo?.subtopic || 'Upper limb');
  const [procedureType, setProcedureType] = useState(existingVideo?.procedureType || 'Demonstration');
  const [mbbsPhase, setMbbsPhase] = useState(existingVideo?.mbbsPhase || 'Phase 1: 1st & 2nd Year (Pre-clinical)');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(existingVideo?.difficulty || 'Intermediate');
  const [duration, setDuration] = useState(existingVideo?.duration || '03:30');
  const [mediaType, setMediaType] = useState(existingVideo?.mediaType || 'animation');
  const [sourceType, setSourceType] = useState<'self_hosted' | 'hls' | 'permitted_embed' | 'youtube_nocookie'>(
    (existingVideo?.sourceType as any) || 'self_hosted'
  );
  const [playbackUrl, setPlaybackUrl] = useState(existingVideo?.playbackUrl || existingVideo?.playback_url || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(existingVideo?.thumbnailUrl || existingVideo?.thumbnail_url || '');
  const [captionsUrl, setCaptionsUrl] = useState(existingVideo?.captionsUrl || existingVideo?.captions_url || '');
  const [graphicContent, setGraphicContent] = useState(Boolean(existingVideo?.graphicContent));
  const [graphicWarningText, setGraphicWarningText] = useState(existingVideo?.graphicWarningText || 'Clinical operative footage. Viewer discretion advised.');
  const [source, setSource] = useState(existingVideo?.source || 'Faculty Institutional Submission');
  const [licenseType, setLicenseType] = useState(
    typeof existingVideo?.license === 'object' ? existingVideo.license.type : 'Public Domain / Open Access'
  );
  const [licenseEvidence, setLicenseEvidence] = useState(
    typeof existingVideo?.license === 'object' ? existingVideo.license.evidence : 'Verified academic redistribution clearance'
  );
  const [reviewerName, setReviewerName] = useState(existingVideo?.review?.reviewerName || 'Prof. M. A. Karim, FRCS');
  const [reviewerRole, setReviewerRole] = useState(existingVideo?.review?.reviewerRole || 'Professor of Surgery, DMC');
  const [publicationStatus, setPublicationStatus] = useState(existingVideo?.publicationStatus || 'draft');

  // Load VOKA candidates on modal open
  useEffect(() => {
    if (isOpen) {
      loadVokaCandidates();
    }
  }, [isOpen]);

  const loadVokaCandidates = async () => {
    setVokaLoading(true);
    try {
      const candidates = await VideoStudioService.getVokaCandidates(currentUserRole as any);
      setVokaCandidates(candidates || []);
    } catch (err: any) {
      console.warn('Failed to load VOKA candidates:', err.message);
    } finally {
      setVokaLoading(false);
    }
  };

  const handleSyncVoka = async () => {
    setIsSyncing(true);
    setVokaMessage(null);
    try {
      const res = await VideoStudioService.syncVokaChannel(currentUserRole as any);
      if (res.success) {
        setSyncReport(res.report);
        setVokaCandidates(res.candidates);
        const disc = res.report.discovered ?? res.report.videosDiscovered ?? 0;
        setVokaMessage({
          type: 'success',
          text: `VOKA sync complete! Discovered: ${disc}, Candidates: ${res.report.newCandidates}, Rejected Shorts: ${res.report.rejectedShorts}.`
        });
      }
    } catch (err: any) {
      setVokaMessage({
        type: 'error',
        text: err.message || 'Failed to sync VOKA channel.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRunHealthCheck = async () => {
    setIsHealthChecking(true);
    setVokaMessage(null);
    try {
      const res = await VideoStudioService.runVokaHealthCheck(currentUserRole as any);
      setHealthCheckResult(res);
      const verified = res.verifiedCount ?? Math.max(0, res.totalAudited - res.archivedCount);
      setVokaMessage({
        type: 'success',
        text: `Health audit completed: ${verified} verified active, ${res.archivedCount} archived/unavailable.`
      });
    } catch (err: any) {
      setVokaMessage({
        type: 'error',
        text: err.message || 'Health check failed.'
      });
    } finally {
      setIsHealthChecking(false);
    }
  };

  const handlePublishCandidate = async (candidate: VokaCandidateVideo, customSection?: string) => {
    setVokaLoading(true);
    try {
      const published = await VideoStudioService.publishVokaCandidate(
        {
          id: candidate.id,
          youtubeVideoId: candidate.youtubeVideoId,
          section: customSection || candidate.section,
          topic: candidate.topic,
          reviewerName: currentUserName,
          reviewerRole: currentUserRole as any,
          notes: `Clinically reviewed and verified from VOKA official channel @vokaio.`
        },
        currentUserRole as any
      );

      // Remove from candidate list
      setVokaCandidates(prev => prev.filter(c => c.youtubeVideoId !== candidate.youtubeVideoId));
      onVideoCreated?.(published);
      setVokaMessage({
        type: 'success',
        text: `Video "${candidate.title}" successfully approved and published to MEDX Video Studio!`
      });
    } catch (err: any) {
      setVokaMessage({
        type: 'error',
        text: err.message || 'Failed to publish candidate video.'
      });
    } finally {
      setVokaLoading(false);
    }
  };

  const handleRejectCandidate = async (candidate: VokaCandidateVideo) => {
    setVokaLoading(true);
    try {
      await VideoStudioService.rejectVokaCandidate(
        { id: candidate.id, youtubeVideoId: candidate.youtubeVideoId },
        currentUserRole as any
      );
      setVokaCandidates(prev => prev.filter(c => c.youtubeVideoId !== candidate.youtubeVideoId));
      setVokaMessage({
        type: 'success',
        text: `Candidate "${candidate.title}" rejected and removed from review queue.`
      });
    } catch (err: any) {
      setVokaMessage({
        type: 'error',
        text: err.message || 'Failed to reject candidate.'
      });
    } finally {
      setVokaLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (newCat === 'Anatomy') {
      setCollection('Gross Anatomy');
      setSubtopic('Upper limb');
    } else if (newCat === 'Surgery') {
      setCollection('General Surgery');
      setSubtopic('Suturing and knot tying');
    } else {
      setCollection(newCat);
      setSubtopic('General');
    }
  };

  const getSubtopicOptions = () => {
    if (category === 'Anatomy' && ANATOMY_COLLECTIONS[collection]) {
      return ANATOMY_COLLECTIONS[collection];
    }
    if (category === 'Surgery' && SURGERY_COLLECTIONS[collection]) {
      return SURGERY_COLLECTIONS[collection];
    }
    return ['General Overview'];
  };

  const handleSubmitManual = async (targetStatus: 'draft' | 'approved' | 'published') => {
    setLoading(true);
    setError(null);
    try {
      if (!title.trim()) throw new Error('Video Title is required');
      if (!playbackUrl.trim()) throw new Error('Playback media URL is required');

      const payload: Partial<SelfHostedMedicalVideo> = {
        title,
        titleBn,
        summary,
        description,
        category,
        collection,
        subtopic,
        procedureType,
        mbbsPhase,
        difficulty,
        duration,
        durationSeconds: 210,
        language: 'English',
        hasCaptions: Boolean(captionsUrl),
        mediaType: mediaType as any,
        instructor: currentUserName,
        institution: 'Dhaka Medical College',
        source,
        sourceType,
        playbackUrl,
        playback_url: playbackUrl,
        storage_path: playbackUrl,
        thumbnailUrl,
        thumbnail_url: thumbnailUrl,
        captionsUrl,
        captions_url: captionsUrl,
        graphicContent,
        graphicWarningText,
        license: {
          type: licenseType,
          permission: 'Redistribution and self-hosting permitted',
          evidence: licenseEvidence
        },
        attribution: `Contributed by ${currentUserName}`,
        publicationStatus: targetStatus,
        review: {
          status: targetStatus === 'published' || targetStatus === 'approved' ? 'approved' : 'pending',
          reviewerName,
          reviewerRole,
          reviewedAt: new Date().toISOString(),
          notes: 'Clinically reviewed and approved for BM&DC curriculum.'
        },
        learningObjectives: [
          'Understand key anatomical/surgical concepts.',
          'Demonstrate correct operative sequence.',
          'Identify common procedural complications and avoidance strategies.'
        ],
        chapters: [
          { timestampSeconds: 0, title: 'Introduction & Anatomy', description: 'Overview and patient positioning' },
          { timestampSeconds: 60, title: 'Procedural Technique', description: 'Core operative execution' },
          { timestampSeconds: 150, title: 'Completion & Inspection', description: 'Hemostasis and closure' }
        ],
        quiz: [
          {
            id: `q-rev-${Date.now()}-1`,
            question: `What is the primary clinical objective when performing ${subtopic}?`,
            options: [
              'Preservation of adjacent neurovascular structures',
              'Speed of operation regardless of tissue handling',
              'Immediate patient discharge within minutes',
              'Avoidance of sterile draping'
            ],
            correctOptionIndex: 0,
            explanation: 'Surgical accuracy and meticulous preservation of neighboring vital structures is the paramount clinical objective.'
          }
        ],
        anatomy: [subtopic],
        specialty: [category],
        procedure: [procedureType],
        topics: [subtopic, category],
        created_at: new Date().toISOString()
      };

      let result: SelfHostedMedicalVideo;
      if (existingVideo?.id) {
        result = await VideoStudioService.updateVideo(existingVideo.id, payload, currentUserRole as any);
      } else {
        result = await VideoStudioService.createVideo(payload, currentUserRole as any);
      }

      setSuccess(true);
      onVideoCreated?.(result);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to save video record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 shadow-glow-blue">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  Faculty Video Studio Workspace
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300">
                  {currentUserRole}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official YouTube Channel Synchronization & Faculty Peer-Review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('voka_sync')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'voka_sync'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={15} className="text-cyan-400" />
            <span>VOKA Channel Sync & Candidates</span>
            {vokaCandidates.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black">
                {vokaCandidates.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={15} />
            <span>Manual Video Submission</span>
          </button>
        </div>

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 scrollbar-thin">
          {/* Status Message Alert */}
          {vokaMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                vokaMessage.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-800/60 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {vokaMessage.type === 'success' ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-rose-400 shrink-0" />
                )}
                <span>{vokaMessage.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setVokaMessage(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {activeTab === 'voka_sync' ? (
            /* TAB 1: VOKA YOUTUBE CHANNEL SYNC & CANDIDATES */
            <div className="flex flex-col gap-5">
              {/* Channel Banner & Control Bar */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                    <Video size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">VOKA 3D Anatomy & Pathology</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 border border-rose-800 text-rose-300 font-semibold">
                        @vokaio
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Channel ID: <code className="text-cyan-400 font-mono text-[11px]">UCqGGuOEpr62ScH8Pjk2q5zw</code> • Official 3D Medical Animations
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Strict policy: Only genuine public-domain/embed-permitted videos from @vokaio. Zero downloads, zero re-hosting, zero YouTube branding removal.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={isSyncing || vokaLoading}
                    onClick={handleSyncVoka}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>{isSyncing ? 'Syncing Channel...' : 'Sync VOKA Channel'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isHealthChecking}
                    onClick={handleRunHealthCheck}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Audit published VOKA videos for availability"
                  >
                    <Activity size={14} className={isHealthChecking ? 'animate-spin text-cyan-400' : 'text-slate-400'} />
                    <span>{isHealthChecking ? 'Auditing...' : 'Health Check'}</span>
                  </button>
                </div>
              </div>

              {/* Sync Report Card (if sync performed) */}
              {syncReport && (
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Layers size={14} /> Synchronization Report ({syncReport.channelHandle || '@vokaio'})
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {syncReport.syncTimestamp ? new Date(syncReport.syncTimestamp).toLocaleTimeString() : 'Just now'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400">Discovered</div>
                      <div className="text-base font-bold text-white mt-0.5">{syncReport.discovered ?? syncReport.videosDiscovered ?? 0}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
                      <div className="text-xs text-cyan-300">New Candidates</div>
                      <div className="text-base font-bold text-cyan-400 mt-0.5">{syncReport.newCandidates}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400">Existing</div>
                      <div className="text-base font-bold text-slate-300 mt-0.5">{syncReport.existingVideos}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-amber-400">Rejected Shorts</div>
                      <div className="text-base font-bold text-amber-300 mt-0.5">{syncReport.rejectedShorts}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-rose-400">Embed Disabled</div>
                      <div className="text-base font-bold text-rose-300 mt-0.5">{syncReport.embeddingDisabled}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400">Irrelevant / Ad</div>
                      <div className="text-base font-bold text-slate-300 mt-0.5">{syncReport.irrelevantVideos}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-rose-400">API Errors</div>
                      <div className="text-base font-bold text-rose-400 mt-0.5">{(syncReport.errors || syncReport.apiErrors || []).length}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Before Publication Guidelines */}
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldCheck size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300">Medical Editorial Workflow:</strong> Fetched → Draft → Medical Review → Approved → Published. Videos are never automatically published to students. Please verify medical relevance, confirm or change the suggested MEDX section, and approve.
                </div>
              </div>

              {/* Candidate Queue */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    VOKA Candidate Queue ({vokaCandidates.length})
                  </span>
                  <button
                    type="button"
                    onClick={loadVokaCandidates}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> Refresh Queue
                  </button>
                </div>

                {vokaCandidates.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-950/40 border border-slate-800 text-center flex flex-col items-center">
                    <CheckCircle2 size={32} className="text-emerald-400 mb-2" />
                    <h4 className="text-sm font-bold text-white">No Pending Candidates</h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
                      All discovered VOKA medical animation videos have been reviewed or published. Click "Sync VOKA Channel" to poll for newly uploaded videos.
                    </p>
                    <button
                      type="button"
                      disabled={isSyncing}
                      onClick={handleSyncVoka}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1.5"
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>Sync VOKA Channel Now</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {vokaCandidates.map((candidate) => {
                      const isEditing = editingCandidateId === candidate.youtubeVideoId;
                      const activeSection = isEditing ? editedSection : candidate.section;

                      return (
                        <div
                          key={candidate.youtubeVideoId}
                          className="bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row gap-4 transition-all"
                        >
                          {/* Left: Thumbnail with Duration & Preview Button */}
                          <div className="relative w-full md:w-56 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0 group">
                            <img
                              src={candidate.thumbnailUrl}
                              alt={candidate.title}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${candidate.youtubeVideoId}/hqdefault.jpg`;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setPreviewCandidate(candidate)}
                                className="px-3 py-1.5 rounded-lg bg-cyan-600 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1.5"
                              >
                                <Play size={12} className="fill-current" /> Preview
                              </button>
                            </div>
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 text-white font-mono text-[10px] font-bold">
                              {candidate.duration}
                            </span>
                            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-blue-950/90 border border-blue-800 text-cyan-300 text-[10px] font-bold">
                              {candidate.contentType}
                            </span>
                          </div>

                          {/* Middle: Metadata & Review Fields */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
                                  Embed Allowed
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                                  ID: {candidate.youtubeVideoId}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Channel: <strong className="text-slate-200">@vokaio</strong>
                                </span>
                                {candidate.classificationConfidence && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                    {(candidate.classificationConfidence * 100).toFixed(0)}% Confidence
                                  </span>
                                )}
                              </div>

                              <h4 className="text-sm font-bold text-white leading-snug">
                                {candidate.title}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                {candidate.description}
                              </p>
                            </div>

                            {/* Section Assignment & Classification */}
                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <label className="text-xs text-slate-400 font-semibold whitespace-nowrap">
                                  Assigned Section:
                                </label>
                                <select
                                  value={activeSection}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditingCandidateId(candidate.youtubeVideoId);
                                    setEditedSection(val);
                                  }}
                                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 font-medium"
                                >
                                  {MEDX_SECTIONS.map((sec) => (
                                    <option key={sec} value={sec}>
                                      {sec}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setPreviewCandidate(candidate)}
                                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <Eye size={13} />
                                  <span>Preview</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleRejectCandidate(candidate)}
                                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                                  title="Reject and archive candidate"
                                >
                                  <Trash2 size={13} />
                                  <span>Reject</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handlePublishCandidate(candidate, activeSection)}
                                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center gap-1"
                                >
                                  <Check size={13} />
                                  <span>Approve & Publish</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* TAB 2: MANUAL VIDEO SUBMISSION FORM */
            <div className="flex flex-col gap-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Video successfully submitted to the medical repository!</span>
                </div>
              )}

              {/* Section 1: Classification & Taxonomy */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">1. Taxonomy & Curriculum</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      {VIDEO_CATEGORIES.filter(c => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Collection</label>
                    <select
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      {category === 'Anatomy'
                        ? Object.keys(ANATOMY_COLLECTIONS).map(col => <option key={col} value={col}>{col}</option>)
                        : category === 'Surgery'
                        ? Object.keys(SURGERY_COLLECTIONS).map(col => <option key={col} value={col}>{col}</option>)
                        : <option value={category}>{category}</option>}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subtopic / Anatomy</label>
                    <select
                      value={subtopic}
                      onChange={(e) => setSubtopic(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      {getSubtopicOptions().map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">MBBS Phase</label>
                    <select
                      value={mbbsPhase}
                      onChange={(e) => setMbbsPhase(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Phase 1: 1st & 2nd Year (Pre-clinical)">Phase 1: 1st & 2nd Year (Pre-clinical)</option>
                      <option value="Phase 2: 3rd Year (Para-clinical)">Phase 2: 3rd Year (Para-clinical)</option>
                      <option value="Phase 3: 4th Year (Clinical)">Phase 3: 4th Year (Clinical)</option>
                      <option value="Phase 4: 5th Year (Clinical)">Phase 4: 5th Year (Clinical)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Media Type</label>
                    <select
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="animation">Medical Animation</option>
                      <option value="cadaveric">Cadaveric Demonstration</option>
                      <option value="clinical_demonstration">Clinical Demonstration</option>
                      <option value="imaging">Medical Imaging</option>
                      <option value="real_surgery">Real Surgery</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Metadata & Titles */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">2. Title & Educational Description</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Verified Title (English)</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 3D Functional Anatomy of the Heart"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Title (বাংলা)</label>
                    <input
                      value={titleBn}
                      onChange={(e) => setTitleBn(e.target.value)}
                      placeholder="e.g. হৃদপিণ্ডের ত্রিমাত্রিক শারীরবৃত্তীয় গঠন"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Description & Clinical Objectives</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Comprehensive clinical and anatomical overview for MBBS curriculum..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Section 3: Media Source & Player Compatibility */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">3. Media Playback (In-App Only)</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Source Format</label>
                    <select
                      value={sourceType}
                      onChange={(e) => setSourceType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="self_hosted">Self-Hosted File (.mp4, .webm, .ogv)</option>
                      <option value="hls">HLS Adaptive Stream (.m3u8)</option>
                      <option value="permitted_embed">Approved Privacy Embed (nocookie / institutional)</option>
                      <option value="youtube_nocookie">YouTube Privacy Enhanced (nocookie)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Playback Media URL</label>
                    <input
                      value={playbackUrl}
                      onChange={(e) => setPlaybackUrl(e.target.value)}
                      placeholder="/medical-videos/anatomy/example.mp4 or https://..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Thumbnail / Poster URL</label>
                    <input
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      placeholder="/medical-videos/...jpg or https://i.ytimg.com/..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">WebVTT Captions URL</label>
                    <input
                      value={captionsUrl}
                      onChange={(e) => setCaptionsUrl(e.target.value)}
                      placeholder="/medical-videos/...vtt"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Duration (MM:SS)</label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="03:45"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-1 pt-2 border-t border-slate-800/80">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-300 font-semibold">
                    <input
                      type="checkbox"
                      checked={graphicContent}
                      onChange={(e) => setGraphicContent(e.target.checked)}
                      className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Graphic Surgical Content (Requires pre-playback consent overlay)</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Licence & Review Audit */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">4. Licence Evidence & Medical Review Audit</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Licence Type</label>
                    <input
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                      placeholder="e.g. Public Domain / CC-BY 4.0 / Verified Embed"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Licence Evidence / Source Link</label>
                    <input
                      value={licenseEvidence}
                      onChange={(e) => setLicenseEvidence(e.target.value)}
                      placeholder="Institutional authorization or public domain record link"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Medical Reviewer Name</label>
                    <input
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Reviewer Designation / Department</label>
                    <input
                      value={reviewerRole}
                      onChange={(e) => setReviewerRole(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Close
          </button>

          {activeTab === 'manual' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmitManual('draft')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/40 text-xs font-semibold transition-all"
              >
                Save as Draft
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmitManual('published')}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center gap-1.5"
              >
                <Send size={14} />
                <span>Approve & Publish Video</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* In-App Preview Modal with Privacy-Enhanced YouTube Embed */}
      {previewCandidate && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                  VOKA In-App Preview
                </span>
                <span className="text-xs text-slate-300 font-medium truncate max-w-md">
                  {previewCandidate.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCandidate(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${previewCandidate.youtubeVideoId}?rel=0&enablejsapi=1&autoplay=1`}
                title={previewCandidate.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950/80 flex items-center justify-between text-xs border-t border-slate-800">
              <span className="text-slate-400">
                Source: Official VOKA 3D Anatomy & Pathology (@vokaio) • In-app embed only
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewCandidate(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = previewCandidate;
                    setPreviewCandidate(null);
                    handlePublishCandidate(c);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-glow-blue flex items-center gap-1.5"
                >
                  <Check size={14} /> Approve & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyVideoManagerModal;
