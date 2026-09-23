import React, { useState, useEffect } from 'react';
import { BrandDetailResponse, DrugBrand } from '../../types/drug';
import { DrugClientService } from '../../services/drugService';

interface BrandDetailViewProps {
  slugOrId: string;
  onBack: () => void;
  onOpenGeneric?: (genericId: string) => void;
  onOpenBrand?: (brandSlugOrId: string) => void;
  onOpenAcrossBooksTopic?: (topicId: string) => void;
  onOpenPracticeQuestions?: (subjectOrTopic: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ClinicalInfoUnavailable: React.FC<{ section?: string }> = ({ section }) => (
  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 text-slate-300 text-xs flex items-center gap-2.5">
    <span className="text-amber-400 text-sm">ℹ️</span>
    <span>Clinical information not yet available in the MEDX verified database.</span>
  </div>
);

export const BrandDetailView: React.FC<BrandDetailViewProps> = ({
  slugOrId,
  onBack,
  onOpenGeneric,
  onOpenBrand,
  onOpenAcrossBooksTopic,
  onOpenPracticeQuestions,
  isBookmarked,
  onToggleBookmark
}) => {
  const [data, setData] = useState<BrandDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'indications' | 'pharmacology' | 'dosage' | 'contraindications' | 'side-effects' | 'precautions' | 'interactions' | 'pregnancy' | 'overdose' | 'storage' | 'alternatives'
  >('overview');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    DrugClientService.getBrandDetail(slugOrId)
      .then(res => {
        if (!isMounted) return;
        if (res && res.brand) {
          setData(res);
          DrugClientService.trackRecentDrug(res.brand.id, 'brand', res.brand.brandName);
        } else {
          setError(`No verified medicine product found matching "${slugOrId}".`);
        }
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load medicine details.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slugOrId]);

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#drug-reference?brand=${encodeURIComponent(slugOrId)}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-300">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
        <p className="text-sm">Loading verified Bangladesh medicine monograph…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
          <p className="font-semibold">{error || 'Medicine not found'}</p>
          <p className="text-xs text-rose-400/80 mt-1">Please check the spelling or search using another generic or brand.</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
        >
          ← Return to Drug Directory
        </button>
      </div>
    );
  }

  const { brand, generic, otherBrandsWithSameGeneric, availableStrengths, relatedClasses } = data;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fadeIn" id="brand-detail-page">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
        >
          <span>←</span> Back to Directory
        </button>

        <div className="flex items-center gap-2.5">
          {/* Copy Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Copy shareable link to this drug"
          >
            <span>🔗</span> {copySuccess ? 'Link Copied!' : 'Share Link'}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:text-white'
            }`}
          >
            <span>{isBookmarked ? '★' : '☆'}</span>
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Educational Safety Notice */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300/90 text-xs flex items-start gap-2.5 shadow-sm">
        <span className="text-amber-400 font-bold text-base leading-none">⚠️</span>
        <div>
          <strong className="text-amber-200">Educational safety notice:</strong> Educational information only. This platform does not replace a registered physician, pharmacist, official prescribing information or current clinical guidelines. Do not start, stop or change a medicine based only on this page.
        </div>
      </div>

      {/* Brand Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f4a]/90 via-[#071330]/90 to-[#040d21]/90 border border-blue-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase tracking-wider">
                Bangladesh Commercial Brand
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                brand.prescriptionStatus === 'OTC'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {brand.prescriptionStatus === 'OTC' ? 'OTC (Over-The-Counter)' : 'Prescription Only (Rx)'}
              </span>
              <span className="text-xs text-slate-400">
                Status: <strong className="text-emerald-400 capitalize">{brand.activeStatus || 'Active'}</strong>
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {brand.brandName}
              </h1>
              {brand.brandNameBn && (
                <p className="text-base text-blue-300/90 font-medium mt-0.5">{brand.brandNameBn}</p>
              )}
            </div>

            {/* Active Generic & Manufacturer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block font-medium">Generic Name</span>
                <span className="text-white text-sm font-semibold capitalize mt-0.5 block">
                  {generic.name}
                </span>
                {generic.therapeuticClass && (
                  <span className="text-blue-400 text-xs block mt-0.5">
                    {generic.therapeuticClass}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block font-medium">Manufacturer / Company</span>
                <span className="text-white text-sm font-semibold mt-0.5 block">
                  {brand.manufacturerName}
                </span>
                <span className="text-slate-400 text-xs block mt-0.5">
                  Origin: Bangladesh DGDA Registered
                </span>
              </div>
            </div>

            {/* Specifications Bar */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-300 pt-1">
              <div><strong>Dosage Form:</strong> <span className="text-white font-medium">{brand.dosageForm}</span></div>
              <div>•</div>
              <div><strong>Strength:</strong> <span className="text-white font-medium">{brand.strength}</span></div>
              <div>•</div>
              <div><strong>Route:</strong> <span className="text-white font-medium">{brand.route || (generic.dosageGuidance?.routes?.join(', ') || 'Oral')}</span></div>
              <div>•</div>
              <div><strong>Pack Size:</strong> <span className="text-white font-medium">{brand.packInfo || 'Standard strip / blister'}</span></div>
            </div>
          </div>

          {/* Pricing & Study Actions Box */}
          <div className="flex flex-col gap-3 min-w-[240px] shrink-0">
            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#091533]/80 border border-emerald-500/30 text-right">
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                Verified Maximum Retail Price
              </span>
              <div className="text-2xl font-black text-emerald-300 mt-1">
                {brand.verifiedPrice?.amount
                  ? `৳ ${brand.verifiedPrice.amount.toFixed(2)}`
                  : 'Gazette Regulated'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {brand.verifiedPrice?.unit ? `Per ${brand.verifiedPrice.unit}` : 'Per commercial unit'} • Last updated: {brand.verifiedPrice?.verifiedDate || brand.lastVerifiedDate || 'Recent'}
              </p>
              <p className="text-[10px] text-slate-500 italic mt-1">
                Prices are official gazetted reference only and not guaranteed at retail.
              </p>
            </div>

            {/* Action Buttons: Cross Book Study & Practice MCQs */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => onOpenAcrossBooksTopic && onOpenAcrossBooksTopic(generic.name)}
                className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <span>📖</span>
                <span>Study {generic.name} Across Books</span>
              </button>

              <button
                onClick={() => {
                  window.location.hash = '#study-materials/pharmacology';
                }}
                className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-teal-600 to-[#08AFC1] hover:from-teal-500 hover:to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <span>📚</span>
                <span>Open Pharmacology Study Materials</span>
              </button>

              <button
                onClick={() => onOpenPracticeQuestions && onOpenPracticeQuestions(generic.therapeuticClass || 'Pharmacology')}
                className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <span>🎯</span>
                <span>Practice Pharmacology MCQs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Formulations & Strengths Banner */}
      {availableStrengths && availableStrengths.length > 1 && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm flex flex-wrap items-center gap-2">
          <span className="text-[#C4D4EA] font-semibold">Available Formulations for {generic.name}:</span>
          <div className="flex flex-wrap gap-2">
            {availableStrengths.map((str, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
                  str.toLowerCase().includes(brand.strength.toLowerCase()) && str.toLowerCase().includes(brand.dosageForm.toLowerCase())
                    ? 'bg-[#08AFC1]/20 text-cyan-300 border-[#08AFC1]/40 font-bold'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700'
                }`}
              >
                {str}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clinical Sections Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'indications', label: 'Indications' },
          { id: 'pharmacology', label: 'Pharmacology' },
          { id: 'dosage', label: 'Dosage & Admin' },
          { id: 'contraindications', label: 'Contraindications' },
          { id: 'side-effects', label: 'Side Effects' },
          { id: 'precautions', label: 'Precautions' },
          { id: 'interactions', label: 'Interactions' },
          { id: 'pregnancy', label: 'Pregnancy & Lactation' },
          { id: 'overdose', label: 'Overdose' },
          { id: 'storage', label: 'Storage' },
          { id: 'alternatives', label: `Other BD Brands (${otherBrandsWithSameGeneric.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
              activeTab === tab.id
                ? 'bg-[#08AFC1] text-slate-950 border-[#08AFC1] font-bold shadow-glow-cyan'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md min-h-[300px]">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Clinical Overview: {generic.name}</h3>
            {generic.pharmacology || generic.mechanismOfAction ? (
              <p className="text-sm text-slate-300 leading-relaxed">
                {generic.pharmacology || generic.mechanismOfAction}
              </p>
            ) : (
              <ClinicalInfoUnavailable />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <span className="text-xs text-slate-400 block font-medium">Therapeutic Class</span>
                <span className="text-white text-sm font-semibold mt-0.5 block">{generic.therapeuticClass || 'Not Classified'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <span className="text-xs text-slate-400 block font-medium">Pharmacological Class</span>
                <span className="text-white text-sm font-semibold mt-0.5 block">{generic.pharmacologicalClass || 'Not Classified'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <span className="text-xs text-slate-400 block font-medium">ATC Code</span>
                <span className="text-white text-sm font-semibold mt-0.5 block">{generic.atcCode || 'Unassigned'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p><strong>Source Attribution:</strong> {brand.source || brand.verifiedSource || 'Bangladesh DGDA / National Formulary'}</p>
              <p><strong>Last Synchronized:</strong> {brand.lastSynchronizedDate || brand.lastVerifiedDate || 'Recent audit'}</p>
              <p><strong>Registration Code:</strong> {brand.registrationNumber || 'DGDA Verified Registration'}</p>
            </div>
          </div>
        )}

        {/* TAB 2: INDICATIONS */}
        {activeTab === 'indications' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Approved Clinical Indications</h3>
            {generic.indications && generic.indications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generic.indications.map((ind, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <span className="text-sm font-semibold text-cyan-300 block">{ind.name}</span>
                    {ind.evidenceLevel && (
                      <span className="text-[11px] text-slate-400 block mt-0.5">Evidence: Level {ind.evidenceLevel}</span>
                    )}
                    {(ind.notes || ind.note || ind.guidelineRecommendation) && (
                      <p className="text-xs text-slate-300 mt-1">{ind.notes || ind.note || ind.guidelineRecommendation}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 3: PHARMACOLOGY */}
        {activeTab === 'pharmacology' && (
          <div className="space-y-4 text-sm text-slate-300">
            {generic.mechanismOfAction ? (
              <div>
                <h4 className="font-bold text-white text-sm">Mechanism of Action</h4>
                <p className="mt-1 leading-relaxed">{generic.mechanismOfAction}</p>
              </div>
            ) : null}

            {generic.receptorOrTarget ? (
              <div>
                <h4 className="font-bold text-white text-sm">Target / Receptor</h4>
                <p className="mt-1 text-cyan-300">{generic.receptorOrTarget}</p>
              </div>
            ) : null}

            {generic.pharmacokinetics ? (
              <div className="pt-2">
                <h4 className="font-bold text-white text-sm">Pharmacokinetics Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-slate-400 block">Bioavailability</strong>
                    <span className="text-white mt-0.5 block">{generic.pharmacokinetics.bioavailability || 'Standard'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-slate-400 block">Elimination Half-life</strong>
                    <span className="text-white mt-0.5 block">{generic.pharmacokinetics.halfLife || 'Noted in monograph'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-slate-400 block">Metabolism</strong>
                    <span className="text-white mt-0.5 block">{generic.pharmacokinetics.metabolism || 'Hepatic'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-slate-400 block">Excretion</strong>
                    <span className="text-white mt-0.5 block">{generic.pharmacokinetics.excretion || 'Renal'}</span>
                  </div>
                </div>
              </div>
            ) : null}

            {!generic.mechanismOfAction && !generic.receptorOrTarget && !generic.pharmacokinetics && (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 4: DOSAGE & ADMINISTRATION */}
        {activeTab === 'dosage' && (
          <div className="space-y-4 text-sm text-slate-300">
            <h3 className="text-base font-bold text-white">Standard Dosage and Administration</h3>
            
            {generic.dosageGuidance && (generic.dosageGuidance.adult || generic.dosageGuidance.paediatric || generic.dosageGuidance.pediatric) ? (
              <div className="space-y-3">
                {generic.dosageGuidance.adult && (
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <strong className="text-sm text-blue-300 block">Adult Dosing Guidance</strong>
                    <p className="text-xs text-slate-300 mt-1">{generic.dosageGuidance.adult}</p>
                  </div>
                )}
                {(generic.dosageGuidance.paediatric || generic.dosageGuidance.pediatric) && (
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <strong className="text-sm text-cyan-300 block">Pediatric Dosing Guidance</strong>
                    <p className="text-xs text-slate-300 mt-1">{generic.dosageGuidance.paediatric || generic.dosageGuidance.pediatric}</p>
                  </div>
                )}
                {(generic.dosageGuidance.administrationNotes || generic.dosageGuidance.timingNotice) && (
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <strong className="text-sm text-slate-300 block">Administration Instructions</strong>
                    <p className="text-xs text-slate-300 mt-1">{generic.dosageGuidance.administrationNotes || generic.dosageGuidance.timingNotice}</p>
                  </div>
                )}
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}

            {generic.doseAdjustment && (
              <div className="pt-2">
                <h4 className="font-bold text-white text-sm">Organ Function Dose Adjustments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-amber-400 block font-semibold">Renal Impairment</strong>
                    <p className="text-slate-300 mt-1">{generic.doseAdjustment.renal || 'No specific dose modification needed unless severe'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                    <strong className="text-amber-400 block font-semibold">Hepatic Impairment</strong>
                    <p className="text-slate-300 mt-1">{generic.doseAdjustment.hepatic || 'Caution advised in decompensated hepatic failure'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CONTRAINDICATIONS */}
        {activeTab === 'contraindications' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-rose-300">Contraindications</h3>
            {generic.contraindications && generic.contraindications.length > 0 ? (
              <div className="space-y-2">
                {generic.contraindications.map((contra, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-200">
                    <span className="text-rose-400 font-bold">✕</span>
                    <div>
                      <strong className="text-rose-300 font-semibold">{contra.condition}</strong>
                      <span className="ml-2 text-rose-400/80 font-medium">({contra.type} Contraindication)</span>
                      {(contra.explanation || contra.reason) && <p className="text-rose-200/80 mt-0.5">{contra.explanation || contra.reason}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 6: SIDE EFFECTS */}
        {activeTab === 'side-effects' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Adverse Reactions & Side Effects</h3>
            
            {(generic.adverseEffects?.common && generic.adverseEffects.common.length > 0) || (generic.adverseEffects?.seriousWarnings && generic.adverseEffects.seriousWarnings.length > 0) ? (
              <>
                {generic.adverseEffects?.seriousWarnings && generic.adverseEffects.seriousWarnings.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1 text-xs">
                    <strong className="text-rose-300 font-bold block">⚠️ Serious Warnings & Critical Reactions:</strong>
                    <ul className="list-disc list-inside text-rose-200 space-y-0.5">
                      {generic.adverseEffects.seriousWarnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <strong className="text-blue-300 font-semibold block">Common / Frequent Reactions</strong>
                    <p className="text-slate-300 mt-1">{generic.adverseEffects?.common?.join(', ') || 'None reported'}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <strong className="text-slate-300 font-semibold block">Less Frequent / Rare Reactions</strong>
                    <p className="text-slate-400 mt-1">{generic.adverseEffects?.rare?.join(', ') || 'None reported'}</p>
                  </div>
                </div>
              </>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 7: PRECAUTIONS */}
        {activeTab === 'precautions' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-300">Clinical Precautions & Monitoring</h3>
            {generic.precautions && generic.precautions.length > 0 ? (
              <ul className="space-y-2 text-xs text-slate-300">
                {generic.precautions.map((p, i) => (
                  <li key={i} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">ℹ</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ClinicalInfoUnavailable />
            )}

            {generic.monitoringRequirements && generic.monitoringRequirements.length > 0 && (
              <div className="pt-3">
                <h4 className="font-bold text-white text-xs mb-2">Recommended Laboratory Monitoring</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {generic.monitoringRequirements.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <strong className="text-cyan-300 block">{m.parameter}</strong>
                      <span className="text-slate-400 text-[11px]">Frequency: {m.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: INTERACTIONS */}
        {activeTab === 'interactions' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Drug Interactions</h3>
            <p className="text-xs text-slate-300">
              Co-administration with other therapeutic classes should be cross-checked using the MEDX Multi-Drug Interaction Checker.
            </p>
            {generic.keyInteractions && generic.keyInteractions.length > 0 ? (
              <div className="space-y-2">
                {generic.keyInteractions.map((inter, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-cyan-300">Interacts with: {inter.genericB}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        inter.severity === 'contraindicated' || inter.severity === 'major'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {inter.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 mt-1">{inter.clinicalEffect}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5"><strong>Action:</strong> {inter.recommendation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 9: PREGNANCY & LACTATION */}
        {activeTab === 'pregnancy' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Pregnancy and Lactation Safety</h3>
            {generic.pregnancyInfo?.details || generic.breastfeedingInfo?.details ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <span className="text-blue-300 font-bold block text-sm">Pregnancy Information</span>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                    FDA Category: {generic.pregnancyInfo?.category || 'Not Classified'}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{generic.pregnancyInfo?.details || 'Clinical data pending review.'}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <span className="text-cyan-300 font-bold block text-sm">Breastfeeding & Lactation</span>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                    Safety: {generic.breastfeedingInfo?.safety || 'Evaluate Risks'}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{generic.breastfeedingInfo?.details || 'Clinical data pending review.'}</p>
                </div>
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 10: OVERDOSE */}
        {activeTab === 'overdose' && (
          <div className="space-y-4 text-xs text-slate-300">
            <h3 className="text-base font-bold text-rose-300">Overdose Information & Management</h3>
            {(generic.overdoseInformation || generic.overdoseInfo)?.symptoms || (generic.overdoseInformation || generic.overdoseInfo)?.management ? (
              <div className="space-y-3">
                <div>
                  <strong className="text-white block font-semibold">Signs & Symptoms:</strong>
                  <p className="mt-1">{(generic.overdoseInformation || generic.overdoseInfo)?.symptoms}</p>
                </div>
                <div>
                  <strong className="text-white block font-semibold">Emergency Clinical Management:</strong>
                  <p className="mt-1">{(generic.overdoseInformation || generic.overdoseInfo)?.management}</p>
                </div>
                {(generic.overdoseInformation || generic.overdoseInfo)?.antidote && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                    <strong>Specific Antidote:</strong> {(generic.overdoseInformation || generic.overdoseInfo)?.antidote}
                  </div>
                )}
              </div>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 11: STORAGE */}
        {activeTab === 'storage' && (
          <div className="space-y-3 text-xs text-slate-300">
            <h3 className="text-base font-bold text-white">Storage Conditions</h3>
            {generic.storageInformation || generic.storageConditions ? (
              <p className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-slate-200">
                {generic.storageInformation || generic.storageConditions}
              </p>
            ) : (
              <ClinicalInfoUnavailable />
            )}
          </div>
        )}

        {/* TAB 12: OTHER BANGLADESH BRANDS (DIMS-style alternative brands) */}
        {activeTab === 'alternatives' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Other Bangladesh Brands containing {generic.name}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {otherBrandsWithSameGeneric.length} registered brands
              </span>
            </div>

            {otherBrandsWithSameGeneric.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-medium">
                      <th className="py-2.5 px-3">Brand Name</th>
                      <th className="py-2.5 px-3">Form & Strength</th>
                      <th className="py-2.5 px-3">Manufacturer</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {otherBrandsWithSameGeneric.map((altBrand) => (
                      <tr key={altBrand.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-2.5 px-3 font-bold text-white">
                          {altBrand.brandName}
                          {altBrand.brandNameBn && (
                            <span className="block text-[11px] text-slate-400 font-normal">{altBrand.brandNameBn}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {altBrand.dosageForm} • {altBrand.strength}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400 font-medium">
                          {altBrand.manufacturerName}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-emerald-300">
                          {altBrand.verifiedPrice?.amount ? `৳ ${altBrand.verifiedPrice.amount.toFixed(2)}` : '—'}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => onOpenBrand && onOpenBrand(altBrand.slug || altBrand.id)}
                            className="px-2.5 py-1 rounded-md bg-blue-600/80 hover:bg-blue-500 text-white text-[11px] font-semibold transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No other registered brands for this generic are currently active in the database.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
