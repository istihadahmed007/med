import React, { useState, useEffect } from 'react';
import { MedicalAuditLog } from '../../types/drug';
import { DrugClientService } from '../../services/drugService';

interface DrugAdminGovernanceModalProps {
  initialDrugId?: string;
  onClose: () => void;
}

export const DrugAdminGovernanceModal: React.FC<DrugAdminGovernanceModalProps> = ({
  initialDrugId = '',
  onClose
}) => {
  const [activeView, setActiveView] = useState<'report' | 'audit'>('report');
  const [drugId, setDrugId] = useState(initialDrugId);
  const [drugType, setDrugType] = useState<'generic' | 'brand'>('generic');
  const [section, setSection] = useState('dosing');
  const [description, setDescription] = useState('');
  const [evidenceSource, setEvidenceSource] = useState('');
  const [proposedCorrection, setProposedCorrection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState<MedicalAuditLog[]>([]);

  useEffect(() => {
    fetch('/api/drugs/governance/audit-logs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAuditLogs(data);
      })
      .catch(() => {});
  }, []);

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

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="gov-title">
      <div className="monograph-content-card max-w-3xl">
        {/* Header Bar */}
        <div className="monograph-header-bar">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                Medical Editorial Governance
              </span>
              <span className="text-xs text-slate-400">Quality Assurance & Peer Review</span>
            </div>
            <h2 id="gov-title" className="mt-1 flex items-center gap-2">
              <span>🛡️</span> Medical Governance & Correction Reporting
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
        <div className="monograph-body-content">
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
                      placeholder="e.g. furosemide or Napa"
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
                      <option value="generic">Generic Monograph</option>
                      <option value="brand">Bangladesh Brand Product</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Clinical Section</label>
                  <select
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="dosing">Dosage & Administration</option>
                    <option value="contraindications">Contraindications / Black Box Warning</option>
                    <option value="interactions">Drug-Drug Interactions</option>
                    <option value="pregnancy">Pregnancy & Breastfeeding Safety</option>
                    <option value="renal_hepatic">Renal / Hepatic Considerations</option>
                    <option value="brand_formulation">Bangladesh Brand Pack / Strength</option>
                    <option value="other">Other Clinical Details</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Description of Issue / Discrepancy *</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the discrepancy with clinical precision..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Verified Evidence Source (DGDA, BDNF, WHO, BNF URL)</label>
                  <input
                    type="text"
                    value={evidenceSource}
                    onChange={e => setEvidenceSource(e.target.value)}
                    placeholder="https://dgda.gov.bd/... or publication title"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Proposed Corrected Text (Optional)</label>
                  <textarea
                    rows={2}
                    value={proposedCorrection}
                    onChange={e => setProposedCorrection(e.target.value)}
                    placeholder="Proposed wording..."
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
