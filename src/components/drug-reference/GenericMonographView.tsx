import React, { useState } from 'react';
import { DrugGeneric, DrugBrand } from '../../types/drug';

interface GenericMonographViewProps {
  generic: DrugGeneric;
  brands: DrugBrand[];
  onClose: () => void;
  onOpenBrand: (brand: DrugBrand) => void;
  onOpenStudyMode: (generic: DrugGeneric) => void;
  onOpenCompareWith: (genericId: string) => void;
  onOpenAcrossBooksTopic?: (topicId: string) => void;
  onReportCorrection: (genericId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isOfflineSaved: boolean;
  onToggleOffline: () => void;
}

type TabType =
  | 'overview'
  | 'mechanism'
  | 'indications'
  | 'dosage'
  | 'contraindications'
  | 'adverse'
  | 'precautions'
  | 'pregnancy'
  | 'renal_hepatic'
  | 'brands'
  | 'study'
  | 'sources';

export const GenericMonographView: React.FC<GenericMonographViewProps> = ({
  generic,
  brands,
  onClose,
  onOpenBrand,
  onOpenStudyMode,
  onOpenCompareWith,
  onOpenAcrossBooksTopic,
  onReportCorrection,
  isBookmarked,
  onToggleBookmark,
  isOfflineSaved,
  onToggleOffline
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'mechanism', label: 'Mechanism' },
    { id: 'indications', label: 'Indications', count: generic.indications?.length },
    { id: 'dosage', label: 'Dosage & Admin' },
    { id: 'contraindications', label: 'Contraindications', count: generic.contraindications?.length },
    { id: 'adverse', label: 'Adverse Effects' },
    { id: 'precautions', label: 'Precautions & Monitoring' },
    { id: 'pregnancy', label: 'Pregnancy & Lactation' },
    { id: 'renal_hepatic', label: 'Renal & Hepatic' },
    { id: 'brands', label: 'Bangladesh Brands', count: brands.length },
    { id: 'study', label: 'Study & Viva (MBBS)' },
    { id: 'sources', label: 'Sources & Governance' }
  ];

  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="monograph-title">
      <div className="monograph-content-card">
        {/* Header Bar */}
        <div className="monograph-header-bar">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  generic.prescriptionStatus === 'POM'
                    ? 'badge-pom'
                    : generic.prescriptionStatus === 'OTC'
                    ? 'badge-otc'
                    : 'badge-schedule-g'
                }`}
              >
                {generic.prescriptionStatus === 'POM'
                  ? 'POM • Prescription Only'
                  : generic.prescriptionStatus === 'OTC'
                  ? 'OTC • Over the Counter'
                  : 'Prescription Status Under Review'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {generic.atcCode ? `ATC: ${generic.atcCode}` : 'ATC: Pending Assignment'}
              </span>
              {generic.bmdcCurriculumPhase && (
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-700/40">
                  BM&DC: {generic.bmdcCurriculumPhase}
                </span>
              )}
            </div>

            <h2 id="monograph-title" className="mt-2 text-2xl font-extrabold text-white flex items-baseline gap-3 flex-wrap">
              <span>{generic.name}</span>
              {generic.nameBn && (
                <span className="text-base text-sky-400 font-semibold">{generic.nameBn}</span>
              )}
            </h2>

            <div className="monograph-meta-row">
              <span className="text-sky-300 font-medium">{generic.pharmacologicalClass || 'Pharmacological entity'}</span>
              <span>•</span>
              <span>{generic.therapeuticClass || 'Therapeutic category'}</span>
              <span>•</span>
              <span className="text-xs text-slate-400">
                {generic.medicalReview?.reviewerName
                  ? `Reviewed: ${generic.medicalReview.reviewDate} (v${generic.medicalReview.contentVersion || '1.0'})`
                  : 'Status: Draft Record (Clinical Review Pending)'}
              </span>
            </div>
          </div>

          <div className="monograph-header-actions flex flex-wrap gap-2">
            <button
              onClick={() => onOpenStudyMode(generic)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition"
              title="Open MBBS Pharmacology Study Workspace"
            >
              <span>🎓</span> Study This Drug
            </button>

            <button
              onClick={() => onOpenCompareWith(generic.id)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition"
              title="Compare with another generic"
            >
              <span>⚖️</span> Compare
            </button>

            <button
              onClick={onToggleBookmark}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1 ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Bookmark for quick recall"
            >
              <span>{isBookmarked ? '★' : '☆'}</span> {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={onToggleOffline}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1 ${
                isOfflineSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={isOfflineSaved ? 'Remove offline download' : 'Download for offline MBBS study'}
            >
              <span>{isOfflineSaved ? '✓' : '📥'}</span> {isOfflineSaved ? 'Offline Ready' : 'Download'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Close monograph"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Accessible Scrollable Tabs */}
        <div className="monograph-tabs-scroll" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`monograph-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {typeof tab.count === 'number' && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Monograph Body */}
        <div className="monograph-body-content">
          {/* Persistent Black Box / Critical Warnings (Always visible if present) */}
          {generic.adverseEffects?.seriousWarnings && generic.adverseEffects.seriousWarnings.length > 0 && (
            <div className="clinical-warning-box">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">⚠️</span>
                <strong className="tracking-wide uppercase text-xs">Critical Safety Warning & Black Box Advisory</strong>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {generic.adverseEffects.seriousWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
              {generic.bilingualNotes?.criticalWarningBn && (
                <p className="mt-2 pt-2 border-t border-rose-500/20 text-xs text-rose-300 font-medium">
                  <strong>সতর্কতা (বাংলা):</strong> {generic.bilingualNotes.criticalWarningBn}
                </p>
              )}
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Clinical Profile Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Pharmacological Class:</span>
                    <span className="clinical-data-value font-medium text-white">{generic.pharmacologicalClass}</span>
                  </div>
                  {generic.bilingualNotes?.classBn && (
                    <div className="clinical-data-row">
                      <span className="clinical-data-label">বাংলা শ্রেণি:</span>
                      <span className="clinical-data-value text-sky-400 font-medium">{generic.bilingualNotes.classBn}</span>
                    </div>
                  )}
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Molecular Target:</span>
                    <span className="clinical-data-value text-sky-300">{generic.receptorOrTarget || 'Target monograph under clinical review'}</span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Primary Indications:</span>
                    <span className="clinical-data-value">
                      {generic.indications && generic.indications.length > 0
                        ? (generic.indications.filter(i => i.isPrimary).map(i => i.name).join(', ') || generic.indications.map(i => i.name).join(', '))
                        : 'Approved indications awaiting clinical verification'}
                    </span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Adult Dosing Summary:</span>
                    <span className="clinical-data-value">{generic.dosageGuidance?.adult || 'Standard adult dosage monograph pending clinical validation'}</span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Available BD Brands:</span>
                    <span className="clinical-data-value font-semibold text-emerald-400">
                      {brands.length} Registered Formulation{brands.length === 1 ? '' : 's'} in Bangladesh
                    </span>
                  </div>
                </div>
              </div>

              {/* Patient Counselling Concept (Bilingual) */}
              {generic.bilingualNotes?.patientCounsellingBn && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>🗣️</span> Patient Counselling Instructions (রোগীর পরামর্শ)
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {generic.bilingualNotes.patientCounsellingBn}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MECHANISM */}
          {activeTab === 'mechanism' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Mechanism of Action</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">
                  {generic.mechanismOfAction}
                </p>
                {generic.bilingualNotes?.mechanismSummaryBn && (
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs text-sky-300 mb-4">
                    <strong>কার্যপদ্ধতি সারসংক্ষেপ:</strong> {generic.bilingualNotes.mechanismSummaryBn}
                  </div>
                )}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Target Receptor / Enzyme:</span>
                  <div className="text-white font-bold mt-0.5">{generic.receptorOrTarget}</div>
                </div>
              </div>

              {generic.pharmacologyLearning && (
                <div className="clinical-section-card bg-indigo-950/20 border-indigo-500/30">
                  <h3 className="clinical-section-title text-indigo-300">Physiological Pathway Sequence</h3>
                  <div className="p-3 rounded-lg bg-slate-900/80 font-mono text-xs text-indigo-200 leading-relaxed">
                    {generic.pharmacologyLearning.pathwaySummary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INDICATIONS */}
          {activeTab === 'indications' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Indications categorized according to Bangladesh National Formulary (BDNF) & WHO Treatment Guidelines.
              </div>
              {generic.indications && generic.indications.length > 0 ? (
                generic.indications.map((ind, idx) => (
                  <div
                    key={ind.id || idx}
                    className={`p-3.5 rounded-xl border ${
                      ind.isPrimary
                        ? 'bg-blue-950/20 border-blue-500/30'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white text-sm">{ind.name}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          ind.isPrimary
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ind.isPrimary ? 'Primary Indication' : 'Secondary / Adjunctive'}
                      </span>
                    </div>
                    {ind.guidelineRecommendation && (
                      <div className="mt-1.5 text-xs text-emerald-300 flex items-center gap-1 font-medium">
                        <span>✓</span> Guideline: {ind.guidelineRecommendation}
                      </div>
                    )}
                    {ind.note && (
                      <div className="mt-1 text-xs text-slate-400">
                        Clinical Note: {ind.note}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                  Clinical indications for this draft imported generic are undergoing formal editorial verification. Consult official DGDA / BDNF gazette.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DOSAGE & ADMINISTRATION */}
          {activeTab === 'dosage' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Dosage Guidance</h3>
                {generic.dosageGuidance?.adult ? (
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-wide">Adult Dosage</div>
                      <div className="text-white mt-1 leading-relaxed">{generic.dosageGuidance.adult}</div>
                    </div>
                    {generic.dosageGuidance.paediatric && (
                      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Paediatric Dosage</div>
                        <div className="text-white mt-1 leading-relaxed">{generic.dosageGuidance.paediatric}</div>
                      </div>
                    )}
                    {generic.dosageGuidance.geriatric && (
                      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Geriatric Considerations</div>
                        <div className="text-white mt-1 leading-relaxed">{generic.dosageGuidance.geriatric}</div>
                      </div>
                    )}
                    <div className="clinical-data-row">
                      <span className="clinical-data-label">Permitted Routes:</span>
                      <span className="clinical-data-value font-semibold text-emerald-300">
                        {generic.dosageGuidance.routes && generic.dosageGuidance.routes.length > 0
                          ? generic.dosageGuidance.routes.join(', ')
                          : 'Not specified'}
                      </span>
                    </div>
                    {generic.dosageGuidance.timingNotice && (
                      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
                        <strong>Timing & Administration Notice:</strong> {generic.dosageGuidance.timingNotice}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                    Dosage and administration guidance for this draft record is undergoing clinical review and verification. Always confirm dosing with official prescribing information.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CONTRAINDICATIONS */}
          {activeTab === 'contraindications' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Absolute contraindications pose fatal or irreversible risk; relative contraindications require risk-benefit evaluation.
              </div>
              {generic.contraindications && generic.contraindications.length > 0 ? (
                generic.contraindications.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border ${
                      c.type === 'absolute'
                        ? 'bg-rose-950/20 border-rose-500/40'
                        : 'bg-amber-950/20 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white text-sm">{c.condition}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          c.type === 'absolute'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {c.type === 'absolute' ? 'Strictly Absolute' : 'Relative Caution'}
                      </span>
                    </div>
                    {c.reason && (
                      <div className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                        Pathophysiological Rationale: {c.reason}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                  Contraindication profile undergoing editorial review. Check product literature for specific patient safety warnings.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ADVERSE EFFECTS */}
          {activeTab === 'adverse' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>●</span> Common (&gt; 1/100)
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {generic.adverseEffects.common.map((eff, i) => (
                      <li key={i}>{eff}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>●</span> Uncommon (1/1000 - 1/100)
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {generic.adverseEffects.uncommon?.map((eff, i) => (
                      <li key={i}>{eff}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>●</span> Rare / Serious (&lt; 1/1000)
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {generic.adverseEffects.rare?.map((eff, i) => (
                      <li key={i}>{eff}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {generic.overdoseInformation && (
                <div className="clinical-section-card bg-rose-950/15 border-rose-500/30">
                  <h3 className="clinical-section-title text-rose-300">Overdose & Toxicological Management</h3>
                  <div className="text-xs space-y-2 text-slate-200">
                    <p><strong>Clinical Signs:</strong> {generic.overdoseInformation.symptoms}</p>
                    <p><strong>Emergency Protocol:</strong> {generic.overdoseInformation.management}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: PRECAUTIONS & MONITORING */}
          {activeTab === 'precautions' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Clinical Precautions</h3>
                <ul className="list-disc list-inside text-sm text-slate-200 space-y-1.5">
                  {generic.precautions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {generic.monitoringRequirements && (
                <div className="clinical-section-card">
                  <h3 className="clinical-section-title">Mandatory Laboratory & Vital Monitoring</h3>
                  <div className="space-y-2.5">
                    {generic.monitoringRequirements.map((m, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                        <div className="flex justify-between font-bold text-white mb-1">
                          <span>{m.parameter}</span>
                          <span className="text-sky-400 font-normal">Freq: {m.frequency}</span>
                        </div>
                        <div className="text-slate-300">Target / Clinical Action: {m.targetOrClinicalAction}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: PREGNANCY & LACTATION */}
          {activeTab === 'pregnancy' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Pregnancy Safety</h3>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Category / Rating:</span>
                  <div className="text-base font-bold text-white mt-0.5">{generic.pregnancyInfo.category}</div>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{generic.pregnancyInfo.details}</p>
              </div>

              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Breastfeeding Compatibility</h3>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 mb-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">Safety Level:</span>
                  <div className="text-base font-bold text-white capitalize mt-0.5">
                    {generic.breastfeedingInfo.safety}
                  </div>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{generic.breastfeedingInfo.details}</p>
              </div>
            </div>
          )}

          {/* TAB 9: RENAL & HEPATIC */}
          {activeTab === 'renal_hepatic' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Renal Impairment Dosing (eGFR cutoffs)</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {generic.doseAdjustment.renal || 'No specific renal adjustment cataloged. Refer to full monograph.'}
                </p>
              </div>

              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Hepatic Impairment / Cirrhosis</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {generic.doseAdjustment.hepatic || 'Use caution in advanced hepatic impairment.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 10: BANGLADESH BRANDS */}
          {activeTab === 'brands' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Showing verified commercial formulations registered with Bangladesh DGDA. Click any brand to view pack sizes and manufacturer certifications.
              </div>
              {brands.length === 0 ? (
                <div className="p-6 text-center text-slate-400 rounded-xl bg-slate-900/50 border border-slate-800 text-sm">
                  Bangladesh brand data not yet verified for this generic.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {brands.map(b => (
                    <div
                      key={b.id}
                      onClick={() => onOpenBrand(b)}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-base flex items-baseline justify-between">
                          <span>{b.brandName}</span>
                          <span className="text-xs text-sky-400 font-semibold">{b.strength}</span>
                        </div>
                        {b.brandNameBn && (
                          <div className="text-xs text-sky-400 mt-0.5">{b.brandNameBn}</div>
                        )}
                        <div className="text-xs text-slate-400 mt-1">Form: {b.dosageForm}</div>
                        <div className="text-xs text-slate-300 font-medium mt-1">
                          🏢 {b.manufacturerName}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                        <span>{b.packInfo || 'Blister Pack'}</span>
                        <span className="text-sky-400 font-semibold hover:underline">Details →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 11: STUDY & PRACTICE (MBBS Pharmacology Hub) */}
          {activeTab === 'study' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/40 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="text-base font-bold text-white">Full MBBS Pharmacology Study Workspace</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Practice high-yield Viva questions, model answers, recall flashcards, and clinical case scenarios.
                  </p>
                </div>
                <button
                  onClick={() => onOpenStudyMode(generic)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30"
                >
                  Launch Study Workspace 🎓
                </button>
              </div>

              {/* High-Yield Viva Questions Preview */}
              {generic.pharmacologyLearning?.vivaQuestions && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Viva High-Yield Questions</h4>
                  {generic.pharmacologyLearning.vivaQuestions.map((v, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">
                      <div className="font-bold text-white">Q{i + 1}: {v.question}</div>
                      {v.questionBn && <div className="text-xs text-sky-400 mt-0.5">{v.questionBn}</div>}
                      <div className="mt-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border-l-2 border-sky-400">
                        <strong>Model Answer:</strong> {v.modelAnswer}
                      </div>
                      {v.highYieldPearl && (
                        <div className="mt-1.5 text-xs text-amber-300 font-semibold">
                          💡 Exam Pearl: {v.highYieldPearl}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Textbook & Across Books Connections */}
              {generic.pharmacologyLearning?.acrossBooksTopicIds && generic.pharmacologyLearning.acrossBooksTopicIds.length > 0 && onOpenAcrossBooksTopic && (
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                    Across Books Multi-Perspective Study Link
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {generic.pharmacologyLearning.acrossBooksTopicIds.map(topicId => (
                      <button
                        key={topicId}
                        onClick={() => onOpenAcrossBooksTopic(topicId)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <span>📖</span> Topic: {topicId.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 12: SOURCES & GOVERNANCE */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Medical Governance & Review Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Review Status:</span>
                    <span className={`clinical-data-value font-bold uppercase tracking-wider ${
                      generic.medicalReview?.status === 'published' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      ● {generic.medicalReview?.status || 'Draft (Pending Editorial Review)'}
                    </span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Lead Reviewer:</span>
                    <span className="clinical-data-value font-semibold text-white">
                      {generic.medicalReview?.reviewerName || 'Awaiting Clinical Editorial Assignment'}
                    </span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Credentials:</span>
                    <span className="clinical-data-value text-slate-300">
                      {generic.medicalReview?.reviewerCredentials || 'Faculty Editorial Board'}
                    </span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Review Date:</span>
                    <span className="clinical-data-value text-slate-300">
                      {generic.medicalReview?.reviewDate || 'Pending Final Verification'}
                    </span>
                  </div>
                  <div className="clinical-data-row">
                    <span className="clinical-data-label">Content Version:</span>
                    <span className="clinical-data-value font-mono text-sky-400">
                      {generic.medicalReview?.contentVersion ? `v${generic.medicalReview.contentVersion}` : 'Draft 0.1'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="clinical-section-card">
                <h3 className="clinical-section-title">Traceable Evidence Citations</h3>
                {generic.sources && generic.sources.length > 0 ? (
                  <div className="space-y-2.5 text-xs">
                    {generic.sources.map((src, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                        <div className="font-bold text-white text-sm">{src.title}</div>
                        <div className="text-slate-400 mt-0.5">
                          Issuing Organization: {src.organization} • Jurisdiction: {src.jurisdiction} • Date: {src.publicationDate}
                        </div>
                        {src.url && (
                          <div className="text-slate-500 mt-1 truncate">
                            URL / DOI: <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">{src.url}</a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                    Official primary compendium citations and DGDA gazette notices under verification for this draft record.
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Discrepancy or Clinical Correction?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Report inaccuracies or new Bangladesh regulatory updates for peer review.
                  </p>
                </div>
                <button
                  onClick={() => onReportCorrection(generic.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition"
                >
                  Report Correction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
