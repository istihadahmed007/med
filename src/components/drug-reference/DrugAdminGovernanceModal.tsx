import React, { useState, useEffect } from 'react';
import { MedicalAuditLog, ClinicalCoverageReport, MedicalReviewStatus } from '../../types/drug';
import { DrugClientService } from '../../services/drugService';

interface DrugAdminGovernanceModalProps {
  initialDrugId?: string;
  onClose: () => void;
}

export const DrugAdminGovernanceModal: React.FC<DrugAdminGovernanceModalProps> = ({
  initialDrugId = '',
  onClose
}) => {
  const [activeView, setActiveView] = useState<'report' | 'audit' | 'coverage'>('report');
  const [drugId, setDrugId] = useState(initialDrugId);
  const [drugType, setDrugType] = useState<'generic' | 'brand'>('generic');
  const [section, setSection] = useState('dosing');
  const [description, setDescription] = useState('');
  const [evidenceSource, setEvidenceSource] = useState('');
  const [proposedCorrection, setProposedCorrection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState<MedicalAuditLog[]>([]);

  // Coverage & Review State
  const [coverageReport, setCoverageReport] = useState<ClinicalCoverageReport | null>(null);
  const [coverageLoading, setCoverageLoading] = useState(false);
  const [reviewGenericId, setReviewGenericId] = useState('');
  const [reviewStatus, setReviewStatus] = useState<MedicalReviewStatus>('source_matched');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCredentials, setReviewerCredentials] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewMsg, setReviewMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/drugs/governance/audit-logs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAuditLogs(data);
      })
      .catch(() => {});
  }, []);

  const loadCoverage = async () => {
    setCoverageLoading(true);
    try {
      const rep = await DrugClientService.getCoverageReport();
      setCoverageReport(rep);
    } catch (err) {
      console.error('Failed to load coverage report', err);
    } finally {
      setCoverageLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'coverage' && !coverageReport) {
      loadCoverage();
    }
  }, [activeView]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    try {
      await DrugClientService.reportCorrection({
        drugId: drugId || 'general',
        drugType,
        section,
        description,
        evidenceSource,
        proposedCorrection
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit correction', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewGenericId.trim()) return;
    setLoading(true);
    setReviewMsg(null);
    try {
      const res = await DrugClientService.updateClinicalReviewStatus({
        genericId: reviewGenericId.trim(),
        status: reviewStatus,
        reviewerName: reviewerName.trim(),
        reviewerCredentials: reviewerCredentials.trim(),
        reviewNotes: reviewNotes.trim()
      });
      if (res.success) {
        setReviewMsg({ text: `Status for ${reviewGenericId} successfully updated to ${reviewStatus}` });
        loadCoverage();
      } else {
        setReviewMsg({ text: res.error || 'Failed to update review status', isError: true });
      }
    } catch (err: any) {
      setReviewMsg({ text: err.message || 'Submission error', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="gov-title">
      <div className="monograph-content-card max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="monograph-header-bar shrink-0">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                Medical Editorial Governance
              </span>
              <span className="text-xs text-slate-400">Quality Assurance & Clinical Lifecycle</span>
            </div>
            <h2 id="gov-title" className="mt-1 flex items-center gap-2">
              <span>🛡️</span> Medical Governance, Coverage & Review
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setActiveView('report')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  activeView === 'report' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Report Correction
              </button>
              <button
                onClick={() => setActiveView('coverage')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  activeView === 'coverage' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Coverage & Review
              </button>
              <button
                onClick={() => setActiveView('audit')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  activeView === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Audit Trail ({auditLogs.length})
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="monograph-body-content overflow-y-auto flex-1 p-5">
          {activeView === 'report' ? (
            submitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="text-4xl text-emerald-400">✓</div>
                <h3 className="text-lg font-bold text-white">Correction Report Submitted Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for contributing to clinical data accuracy. Your report has been submitted to our faculty review queue and logged to the medical governance audit trail.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setDescription('');
                    setProposedCorrection('');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 leading-relaxed">
                  <strong>Peer Review Policy:</strong> MEDX maintains strict academic and clinical data integrity. Reported updates are verified against DGDA gazettes, Bangladesh National Formulary (BDNF), and international treatment guidelines before publication.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Target Medicine ID / Name</label>
                    <input
                      type="text"
                      value={drugId}
                      onChange={e => setDrugId(e.target.value)}
                      placeholder="e.g. olanzapine or Napa"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Entity Type</label>
                    <select
                      value={drugType}
                      onChange={e => setDrugType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="generic">Generic Ingredient Monograph</option>
                      <option value="brand">Commercial Brand Product</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Affected Clinical Section</label>
                  <select
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="dosing">Dosage & Administration</option>
                    <option value="indications">Indications & Clinical Use</option>
                    <option value="contraindications">Contraindications & Warnings</option>
                    <option value="interactions">Drug Interactions</option>
                    <option value="adverseEffects">Side Effects & Adverse Reactions</option>
                    <option value="pharmacokinetics">Pharmacokinetics</option>
                    <option value="pregnancy">Pregnancy & Lactation</option>
                    <option value="renal_hepatic">Renal & Hepatic Impairment</option>
                    <option value="pricing">Bangladesh Retail Price (MRP)</option>
                    <option value="brands">Brand Registration / Manufacturer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Discrepancy Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the clinical discrepancy or outdated claim found in the monograph..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Traceable Evidence Source</label>
                  <input
                    type="text"
                    value={evidenceSource}
                    onChange={e => setEvidenceSource(e.target.value)}
                    placeholder="e.g. DGDA Gazette Notification #... or DailyMed FDA SetID..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Proposed Clinical Text</label>
                  <textarea
                    rows={2}
                    value={proposedCorrection}
                    onChange={e => setProposedCorrection(e.target.value)}
                    placeholder="Enter the proposed verified wording..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !description.trim()}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 disabled:opacity-40"
                  >
                    {loading ? 'Submitting...' : 'Submit to Editorial Board'}
                  </button>
                </div>
              </form>
            )
          ) : activeView === 'coverage' ? (
            <div className="space-y-5">
              {/* Review Lifecycle Flow Banner */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Clinical Monograph Editorial Lifecycle
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                    1. imported (Raw Catalog)
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 text-blue-300 font-semibold border border-blue-500/30">
                    2. source_matched (Labels Linked)
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 font-semibold border border-amber-500/30">
                    3. clinical_review (Pharmacist/MD)
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-500/40">
                    4. published (Verified)
                  </span>
                </div>
              </div>

              {coverageLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Loading clinical coverage data...
                </div>
              ) : coverageReport ? (
                <>
                  {/* Metric Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block">Total Generics</span>
                      <span className="text-xl font-black text-white mt-1 block">
                        {coverageReport.totalGenerics.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">Cataloged ingredients</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <span className="text-emerald-400 font-medium block">Published / Verified</span>
                      <span className="text-xl font-black text-emerald-400 mt-1 block">
                        {coverageReport.byStatus.published}
                      </span>
                      <span className="text-[11px] text-emerald-300/70 mt-0.5 block">Full clinical sign-off</span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <span className="text-amber-400 font-medium block">In Review / Sourced</span>
                      <span className="text-xl font-black text-amber-400 mt-1 block">
                        {coverageReport.byStatus.clinical_review + coverageReport.byStatus.source_matched}
                      </span>
                      <span className="text-[11px] text-amber-300/70 mt-0.5 block">Editorial in progress</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block">Imported (Draft)</span>
                      <span className="text-xl font-black text-slate-300 mt-1 block">
                        {coverageReport.byStatus.imported}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">Awaiting label match</span>
                    </div>
                  </div>

                  {/* Brands Metrics */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Total Commercial Brands:</span>{' '}
                      <strong className="text-white font-bold">{coverageReport.totalBrands.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Verified DGDA Registration:</span>{' '}
                      <strong className="text-emerald-400 font-bold">{coverageReport.verifiedBrands.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Pending Verification:</span>{' '}
                      <strong className="text-amber-400 font-bold">{coverageReport.pendingBrands.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Missing Fields Breakdown */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Generics Completeness by Clinical Field ({coverageReport.incompleteGenericsCount} incomplete)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {Object.entries(coverageReport.fieldCompleteness).map(([fKey, count]) => (
                        <div key={fKey} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400 capitalize">{fKey.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-mono font-bold text-amber-400">{Number(count)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Review Action Panel */}
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>✍️</span> Clinician Review Sign-Off
                      </h4>
                      <span className="text-[11px] text-slate-400">Requires qualified pharmacist or physician</span>
                    </div>

                    <form onSubmit={handleReviewTransition} className="space-y-3 text-xs">
                      {reviewMsg && (
                        <div className={`p-2.5 rounded-lg text-xs font-medium ${
                          reviewMsg.isError ? 'bg-rose-950/60 border border-rose-500/40 text-rose-300' : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                        }`}>
                          {reviewMsg.text}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 block mb-1 font-semibold">Generic ID</label>
                          <input
                            type="text"
                            value={reviewGenericId}
                            onChange={e => setReviewGenericId(e.target.value)}
                            placeholder="e.g. olanzapine, furosemide"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-slate-300 block mb-1 font-semibold">Target Lifecycle Status</label>
                          <select
                            value={reviewStatus}
                            onChange={e => setReviewStatus(e.target.value as MedicalReviewStatus)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                          >
                            <option value="source_matched">source_matched (Official Labels Attached)</option>
                            <option value="clinical_review">clinical_review (Under MD/PharmD Evaluation)</option>
                            <option value="approved">approved (Clinical Sign-off Completed)</option>
                            <option value="published">published (Live Verified Public Monograph)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 block mb-1 font-semibold">Reviewer Name</label>
                          <input
                            type="text"
                            value={reviewerName}
                            onChange={e => setReviewerName(e.target.value)}
                            placeholder="e.g. Dr. K. M. Rahman, MBBS, MD"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-slate-300 block mb-1 font-semibold">Reviewer Credentials</label>
                          <input
                            type="text"
                            value={reviewerCredentials}
                            onChange={e => setReviewerCredentials(e.target.value)}
                            placeholder="e.g. Clinical Pharmacologist, BMDC #A-10294"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-300 block mb-1 font-semibold">Review Notes & Traceable Source Citation</label>
                        <input
                          type="text"
                          value={reviewNotes}
                          onChange={e => setReviewNotes(e.target.value)}
                          placeholder="e.g. Cross-checked with DailyMed Zyprexa label SetID 96165590 and DGDA gazette."
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={loading || !reviewGenericId.trim() || !reviewerName.trim()}
                          className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg shadow-emerald-600/30 disabled:opacity-40"
                        >
                          {loading ? 'Processing...' : 'Update Review Lifecycle'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Sample Incomplete Records */}
                  {coverageReport.incompleteGenerics && coverageReport.incompleteGenerics.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <h4 className="font-bold text-slate-300 uppercase tracking-wider">
                          Incomplete Medicines Queue (Sample of {coverageReport.incompleteGenerics.length})
                        </h4>
                        <span className="text-slate-500">Click name to prepopulate review</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                        {coverageReport.incompleteGenerics.map(item => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setReviewGenericId(item.id);
                              if (item.status === 'imported') setReviewStatus('source_matched');
                              else if (item.status === 'source_matched') setReviewStatus('clinical_review');
                              else if (item.status === 'clinical_review') setReviewStatus('published');
                            }}
                            className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-wrap items-center justify-between gap-2 text-xs"
                          >
                            <div>
                              <span className="font-bold text-white">{item.name}</span>
                              <span className="text-[11px] text-slate-500 ml-2 font-mono">({item.id})</span>
                              <span className={`ml-2 px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold ${
                                item.status === 'clinical_review' ? 'bg-amber-950/70 text-amber-300' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.missingFields.slice(0, 4).map(f => (
                                <span key={f} className="px-1.5 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-500/20 text-[10px]">
                                  {f}
                                </span>
                              ))}
                              {item.missingFields.length > 4 && (
                                <span className="text-[10px] text-slate-500">
                                  +{item.missingFields.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Historical audit trail of verified database publications and medical reviewer sign-offs.
              </div>

              {auditLogs.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs bg-slate-900/60 rounded-xl border border-slate-800">
                  No governance logs recorded yet.
                </div>
              ) : (
                auditLogs.map((log, i) => (
                  <div key={log.id || i} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-white font-bold">
                      <span>{log.editorName} ({log.editorRole})</span>
                      <span className="text-[11px] font-mono text-sky-400 capitalize px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">
                        {log.action}
                      </span>
                    </div>
                    <div className="text-slate-300">{log.reason}</div>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Timestamp: {log.timestamp} • Target: {log.entityType} ({log.entityId})
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
