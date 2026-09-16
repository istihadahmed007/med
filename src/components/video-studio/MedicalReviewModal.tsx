import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  User, 
  Sparkles, 
  Layers, 
  Info,
  Archive,
  BookOpen
} from 'lucide-react';
import { VideoGenerationJob, MedicalReviewForm } from '../../types/videoStudio';
import { StorageService } from '../../services/storageService';
import { VideoStudioService } from '../../services/videoStudioService';

interface MedicalReviewModalProps {
  job: VideoGenerationJob;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export const MedicalReviewModal: React.FC<MedicalReviewModalProps> = ({
  job,
  isOpen,
  onClose,
  onReviewSubmitted
}) => {
  const currentRole = StorageService.getRole();
  const currentUser = StorageService.getUser();

  // Review Form State
  const [anatomicalCorrectness, setAnatomicalCorrectness] = useState<boolean>(true);
  const [correctSequenceAndMovement, setCorrectSequenceAndMovement] = useState<boolean>(true);
  const [consistencyWithObjective, setConsistencyWithObjective] = useState<boolean>(true);
  const [absenceOfMisleadingArtifacts, setAbsenceOfMisleadingArtifacts] = useState<boolean>(true);
  const [captionAndAnnotationAccuracy, setCaptionAndAnnotationAccuracy] = useState<boolean>(true);
  const [suitabilityForMbbsLevel, setSuitabilityForMbbsLevel] = useState<boolean>(true);

  const [decision, setDecision] = useState<'approved' | 'rejected' | 'archived'>('approved');
  const [comments, setComments] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>(
    currentUser?.name ? `${currentUser.name} (Faculty Reviewer)` : 'Prof. Dr. M. A. Jalil (Faculty Reviewer, DMC)'
  );
  const [reviewerDesignation, setReviewerDesignation] = useState<string>('Associate Professor of Medical Education');
  const [reviewerInstitution, setReviewerInstitution] = useState<string>('Dhaka Medical College & Hospital');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Check if role is authorized (author cannot self-approve or act as reviewer)
  const isAuthorized = ['reviewer', 'admin', 'faculty'].includes(currentRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!reviewerName.trim() || !comments.trim()) {
      setErrorMsg('Please specify reviewer credentials and comprehensive peer-review comments.');
      return;
    }

    if (decision === 'approved' && (!anatomicalCorrectness || !correctSequenceAndMovement || !consistencyWithObjective)) {
      setErrorMsg('Cannot approve an asset with critical anatomical or sequence defects.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: MedicalReviewForm = {
        jobId: job.id,
        reviewerId: currentUser?.id || 'rev-prof-jalil',
        reviewerName,
        reviewerDesignation,
        reviewerInstitution,
        decision,
        checklist: {
          anatomicalCorrectness,
          correctSequenceAndMovement,
          consistencyWithObjective,
          absenceOfMisleadingArtifacts,
          captionAndAnnotationAccuracy,
          suitabilityForMbbsLevel
        },
        comments,
        exactVideoVersion: job.telemetry ? `${job.telemetry.model_identifier}@${job.telemetry.seed}` : 'v1.0-medgen'
      };

      await VideoStudioService.submitReview(payload);

      onReviewSubmitted();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error occurred during review submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Faculty Peer-Review Board
              </h3>
              <p className="text-xs text-indigo-200/70">
                BM&DC Medical Accuracy & Educational Governance Protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Authorization Check Alert */}
          {!isAuthorized && (
            <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 flex items-start gap-3 text-xs text-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-rose-100">Review Authorization Restricted</div>
                <p>
                  Your current active profile role is <strong>{currentRole}</strong>. Only verified Medical Faculty, Independent Reviewers, and Department Administrators may sign off on educational video publications.
                </p>
              </div>
            </div>
          )}

          {/* Asset Brief Under Review */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                {job.phase} • {job.subject}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Job ID: {job.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">
              {job.lessonTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-400">Curriculum Objective:</strong> {job.learningObjective}
            </p>
            {job.references && job.references.length > 0 && (
              <div className="text-[11px] text-slate-400">
                <strong>Cited Literature:</strong> {job.references.join('; ')}
              </div>
            )}
          </div>

          {/* Video Preview Player */}
          {job.videoUrl ? (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
              <video 
                src={job.videoUrl} 
                poster={job.posterUrl || '/anatomy/heart/organ.webp'} 
                controls 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
              Video media file is currently rendering or queued.
            </div>
          )}

          {/* Review Checklist Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>6-Point BM&DC Medical Verification Checklist</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 1 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={anatomicalCorrectness}
                    onChange={(e) => setAnatomicalCorrectness(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">1. Anatomical Correctness</strong>
                    <span className="text-slate-400 text-[11px]">Surfaces, chambers, valves, coronary course align with standard human anatomy.</span>
                  </div>
                </label>

                {/* 2 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={correctSequenceAndMovement}
                    onChange={(e) => setCorrectSequenceAndMovement(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">2. Chronological Sequence & Motion</strong>
                    <span className="text-slate-400 text-[11px]">Systole, valve closure, and ejection follow physiological pressure gradients.</span>
                  </div>
                </label>

                {/* 3 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={consistencyWithObjective}
                    onChange={(e) => setConsistencyWithObjective(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">3. Grounded in Cited References</strong>
                    <span className="text-slate-400 text-[11px]">Directly illustrates cited curriculum sources (Guyton & Hall, Ganong).</span>
                  </div>
                </label>

                {/* 4 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={absenceOfMisleadingArtifacts}
                    onChange={(e) => setAbsenceOfMisleadingArtifacts(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">4. No Hallucinatory Artifacts</strong>
                    <span className="text-slate-400 text-[11px]">Free of bizarre morphing, phantom vessels, or inaccurate valve geometries.</span>
                  </div>
                </label>

                {/* 5 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={captionAndAnnotationAccuracy}
                    onChange={(e) => setCaptionAndAnnotationAccuracy(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">5. Bilingual Caption Precision</strong>
                    <span className="text-slate-400 text-[11px]">English and Bengali terminology adhere to accepted medical nomenclature.</span>
                  </div>
                </label>

                {/* 6 */}
                <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={suitabilityForMbbsLevel}
                    onChange={(e) => setSuitabilityForMbbsLevel(e.target.checked)}
                    className="mt-0.5 rounded accent-cyan-500"
                  />
                  <div>
                    <strong className="text-white block">6. Appropriate for MBBS Cohort</strong>
                    <span className="text-slate-400 text-[11px]">Calibrated for targeted phase (Phase 1 pre-clinical or Phase 4 bedside).</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Review Decision */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Review Decision
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDecision('approved')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    decision === 'approved'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-glow-cyan'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve for Publication</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('rejected')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    decision === 'rejected'
                      ? 'bg-rose-950 text-rose-300 border-rose-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Request Revisions / Reject</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('archived')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    decision === 'archived'
                      ? 'bg-amber-950 text-amber-300 border-amber-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  <span>Archive Asset</span>
                </button>
              </div>
            </div>

            {/* Reviewer Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Reviewer Full Name</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Academic Designation</label>
                <input
                  type="text"
                  value={reviewerDesignation}
                  onChange={(e) => setReviewerDesignation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Medical College / Institution</label>
                <input
                  type="text"
                  value={reviewerInstitution}
                  onChange={(e) => setReviewerInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            {/* Formal Comments */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold">
                Peer-Review Findings & Clinical Remarks (Mandatory Audit Trail)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Detail anatomical accuracy, motion timing, or changes required before curriculum deployment..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                required
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isAuthorized}
                className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-glow-cyan"
              >
                {isSubmitting ? 'Recording Audit Trail...' : 'Submit Faculty Review Decision'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
