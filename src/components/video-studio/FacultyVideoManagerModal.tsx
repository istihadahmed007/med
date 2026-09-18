import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { SelfHostedMedicalVideo } from '../../types/videoStudio';
import { VideoStudioService } from '../../services/videoStudioService';
import { ANATOMY_COLLECTIONS, SURGERY_COLLECTIONS, VIDEO_CATEGORIES } from '../../data/medicalVideoLibraryData';

interface FacultyVideoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoCreated?: (video: SelfHostedMedicalVideo) => void;
  existingVideo?: SelfHostedMedicalVideo | null;
  currentUserRole?: string;
  currentUserName?: string;
}

export const FacultyVideoManagerModal: React.FC<FacultyVideoManagerModalProps> = ({
  isOpen,
  onClose,
  onVideoCreated,
  existingVideo,
  currentUserRole = 'faculty',
  currentUserName = 'Prof. Dr. M. A. Jalil'
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
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

  const handleSubmit = async (targetStatus: 'draft' | 'approved' | 'published') => {
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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {existingVideo ? 'Edit Medical Video' : 'Faculty Video Submission & Review Workspace'}
              </h2>
              <p className="text-xs text-slate-400">
                Workflow: Draft → Licence Review → Medical Review → Approved → Published
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

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4 scrollbar-thin">
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
                  placeholder="/medical-videos/...jpg"
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
                  placeholder="e.g. Public Domain / CC-BY 4.0"
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

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/40 text-xs font-semibold transition-all"
            >
              Save as Draft
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit('published')}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center gap-1.5"
            >
              <Send size={14} />
              <span>Approve & Publish Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyVideoManagerModal;
