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

const ClinicalInfoPendingVerification: React.FC<{ message?: string; subtext?: string }> = ({
  message = 'Clinical information pending verification.',
  subtext = 'Official product label and clinical evidence verification in progress. Unverified clinical claims are withheld.'
}) => (
  <div className="drug-info-unavailable" role="status">
    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div className="flex flex-col">
      <span className="font-semibold text-slate-800">{message}</span>
      {subtext && <span className="text-[11px] text-slate-500 mt-0.5">{subtext}</span>}
    </div>
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
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Card expansion toggles for lengthy sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dosage: false,
    indications: false,
    interactions: false,
    brands: false
  });

  // Mobile accordion open states
  const [mobileOpenCards, setMobileOpenCards] = useState<Record<string, boolean>>({
    indications: true,
    dosage: true,
    sideEffects: true,
    interactions: true,
    contraindications: true,
    pharmacology: true,
    pharmacokinetics: false,
    pregnancy: false,
    impairment: false,
    brands: true,
    references: false
  });

  const toggleSectionExpand = (sectionKey: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const toggleMobileAccordion = (cardKey: string) => {
    setMobileOpenCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

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

  const scrollToSection = (sectionId: string) => {
    // Ensure section is opened on mobile
    if (sectionId in mobileOpenCards) {
      setMobileOpenCards(prev => ({ ...prev, [sectionId]: true }));
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Temporary subtle highlight
      elem.classList.add('ring-2', 'ring-[#08AFC1]');
      setTimeout(() => {
        elem.classList.remove('ring-2', 'ring-[#08AFC1]');
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 text-center max-w-xl mx-auto">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#08AFC1] border-t-transparent mb-4"></div>
        <h3 className="text-lg font-bold text-[#0F2C59]">Loading Medicine Monograph…</h3>
        <p className="text-sm text-slate-500 mt-1">Retrieving official clinical pharmacology and Bangladesh commercial records.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-16 px-4 max-w-xl mx-auto text-center space-y-4">
        <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">✕</div>
          <h3 className="text-lg font-bold text-rose-900">{error || 'Medicine not found'}</h3>
          <p className="text-sm text-slate-600 mt-2">
            The medicine or brand formulation you requested is not indexed in the verified dataset.
          </p>
          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-center">
            <button
              onClick={onBack}
              className="px-5 py-2.5 min-h-[44px] rounded-xl bg-[#0F2C59] hover:bg-[#0A1E3F] text-white text-sm font-semibold transition shadow-sm"
            >
              ← Return to Drug Directory
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { brand, generic, otherBrandsWithSameGeneric, availableStrengths } = data;

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-3 sm:px-6 py-6" id="brand-detail-page">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-sm font-semibold text-[#0F2C59] transition shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Copy Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 transition shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
            title="Copy shareable link to this drug"
          >
            <svg className="w-4 h-4 text-[#08AFC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>{copySuccess ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border text-xs sm:text-sm font-semibold transition shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] ${
              isBookmarked
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={isBookmarked ? 'text-amber-500 font-bold' : 'text-slate-400'}>
              {isBookmarked ? '★' : '☆'}
            </span>
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* 1. REFERENCE-STYLE OVERVIEW (TOP CARD) */}
      <div className="drug-white-card relative overflow-hidden bg-white/95">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F2C59] border border-blue-200 text-xs font-bold uppercase tracking-wider">
                Commercial Brand
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                brand.prescriptionStatus === 'OTC'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {brand.prescriptionStatus === 'OTC' ? 'OTC (Over-The-Counter)' : 'Prescription Only (Rx)'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Registration: <strong className="text-slate-800">{brand.registrationNumber || brand.registrationStatus || 'Verification Pending'}</strong>
              </span>
            </div>

            {/* Drug Titles */}
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-2.5xl sm:text-3xl font-extrabold text-[#0F2C59] tracking-tight">
                  {brand.brandName}
                </h1>
                {brand.brandNameBn && (
                  <span className="text-lg text-sky-700 font-medium font-bengali">
                    {brand.brandNameBn}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
                Active Generic:{' '}
                <button
                  onClick={() => onOpenGeneric && onOpenGeneric(generic.id)}
                  className="font-bold text-[#08AFC1] hover:underline hover:text-cyan-700 capitalize"
                >
                  {generic.name}
                </button>
                {generic.nameBn && (
                  <span className="font-bengali text-slate-500 ml-1.5">({generic.nameBn})</span>
                )}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block font-medium">Strength</span>
                <span className="text-slate-900 text-sm font-bold mt-0.5 block">{brand.strength || 'Standard'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block font-medium">Dosage Form</span>
                <span className="text-slate-900 text-sm font-bold mt-0.5 block">{brand.dosageForm || 'Dosage unit'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block font-medium">Route</span>
                <span className="text-slate-900 text-sm font-bold mt-0.5 block">
                  {brand.route || (brand.dosageForm && /injection|infusion|inj\b/i.test(brand.dosageForm) ? 'IV, IM' : /tablet|capsule|syrup|suspension|tab\b|cap\b/i.test(brand.dosageForm) ? 'Oral' : 'Specific to formulation')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block font-medium">Pack Info</span>
                <span className="text-slate-900 text-sm font-bold mt-0.5 block">{brand.packInfo || 'Standard commercial pack'}</span>
              </div>
            </div>

            {/* Manufacturer & Class metadata */}
            <div className="pt-1 text-xs text-slate-600 space-y-1">
              <p>
                <strong className="text-slate-800">Manufacturer:</strong> {brand.manufacturerName}
                <span className="text-slate-400 ml-1.5">(DGDA Licensed Pharma)</span>
              </p>
              {generic.therapeuticClass && (
                <p>
                  <strong className="text-slate-800">Therapeutic Class:</strong> {generic.therapeuticClass}
                </p>
              )}
              {generic.pharmacologicalClass && (
                <p>
                  <strong className="text-slate-800">Pharmacological Class:</strong> {generic.pharmacologicalClass}
                </p>
              )}
            </div>

            {/* Regulatory provenance & last reviewed date */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span><strong>Source:</strong> {brand.source || (brand.registrationNumber ? 'Bangladesh DGDA Registered Formulary' : 'Imported Catalog (DGDA Alignment Pending)')}</span>
              <span>•</span>
              <span><strong>Last Reviewed:</strong> {brand.lastVerifiedDate || 'Pending verification'}</span>
            </div>
          </div>

          {/* Pricing Box & Action CTAs */}
          <div className="flex flex-col gap-3 min-w-[220px] lg:w-64 shrink-0">
            {/* Price Box */}
            <div className={`p-4 rounded-xl text-right border ${
              brand.verifiedPrice?.amount
                ? 'bg-gradient-to-br from-emerald-50/80 to-teal-50/60 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider block ${
                brand.verifiedPrice?.amount ? 'text-emerald-800' : 'text-slate-500'
              }`}>
                {brand.verifiedPrice?.amount ? 'Verified Retail Price (MRP)' : 'Retail Price Information'}
              </span>
              {brand.verifiedPrice?.amount ? (
                <>
                  <div className="text-2xl font-black text-emerald-700 mt-1">
                    ৳ {brand.verifiedPrice.amount.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-emerald-800/80 mt-0.5">
                    {brand.verifiedPrice.unit ? `Per ${brand.verifiedPrice.unit}` : 'Per commercial unit'}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-base font-bold text-slate-500 mt-1">
                    Price unavailable
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    DGDA price gazette verification in progress
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons: Study Across Books & Practice Questions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onOpenAcrossBooksTopic && onOpenAcrossBooksTopic(generic.name)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-[#0F2C59] to-[#08AFC1] hover:from-[#0A1E3F] hover:to-cyan-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <span>📖</span>
                <span>Study Across Books</span>
              </button>

              <button
                onClick={() => onOpenPracticeQuestions && onOpenPracticeQuestions(generic.therapeuticClass || 'Pharmacology')}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 text-[#0F2C59] border border-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
              >
                <span>🎯</span>
                <span>Practice MCQs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Available Formulations Pills */}
        {availableStrengths && availableStrengths.length > 1 && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-600 font-semibold">Available Formulations:</span>
            <div className="flex flex-wrap gap-1.5">
              {Array.from(new Set(availableStrengths.map(s => s.trim()))).map((str, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-0.5 rounded-lg border text-xs font-mono font-medium ${
                    str.toLowerCase().includes(brand.strength.toLowerCase()) &&
                    str.toLowerCase().includes(brand.dosageForm.toLowerCase())
                      ? 'bg-[#08AFC1]/15 text-[#0F2C59] border-[#08AFC1]/40 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {str}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Small Educational Reference Note */}
        <div className="drug-ref-disclaimer-note">
          <span className="text-amber-600 font-bold text-sm">⚠️</span>
          <span>For educational reference. Verify prescribing information before clinical use.</span>
        </div>
      </div>

      {/* 2. SIX-ITEM ICON GRID (MATCHING REFERENCE VIDEO SPECIFICATION) */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Clinical Monograph Overview
        </h2>
        <div className="drug-six-grid">
          {/* Item 1: Indications */}
          <div
            onClick={() => scrollToSection('section-indications')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-indications')}
            aria-label="Scroll to Indications"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Indications</div>
              <div className="grid-preview">
                {generic.indications && generic.indications.length > 0
                  ? generic.indications.map(i => i.name).slice(0, 2).join(', ')
                  : 'Approved clinical conditions'}
              </div>
            </div>
          </div>

          {/* Item 2: Dosage & Administration */}
          <div
            onClick={() => scrollToSection('section-dosage')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-dosage')}
            aria-label="Scroll to Dosage & Administration"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Dosage & Admin</div>
              <div className="grid-preview">
                {generic.dosageGuidance?.adult
                  ? generic.dosageGuidance.adult
                  : 'Adult & pediatric dosing protocols'}
              </div>
            </div>
          </div>

          {/* Item 3: Side Effects */}
          <div
            onClick={() => scrollToSection('section-side-effects')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-side-effects')}
            aria-label="Scroll to Side Effects"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Side Effects</div>
              <div className="grid-preview">
                {generic.adverseEffects?.common && generic.adverseEffects.common.length > 0
                  ? generic.adverseEffects.common.slice(0, 3).join(', ')
                  : 'Adverse reactions & warnings'}
              </div>
            </div>
          </div>

          {/* Item 4: Interactions */}
          <div
            onClick={() => scrollToSection('section-interactions')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-interactions')}
            aria-label="Scroll to Interactions"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Interactions</div>
              <div className="grid-preview">
                {generic.keyInteractions && generic.keyInteractions.length > 0
                  ? `Interacts with ${generic.keyInteractions[0].genericB}`
                  : 'Multi-drug interactions checker'}
              </div>
            </div>
          </div>

          {/* Item 5: Mechanism of Action */}
          <div
            onClick={() => scrollToSection('section-pharmacology')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-pharmacology')}
            aria-label="Scroll to Mechanism of Action"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Mechanism (MOA)</div>
              <div className="grid-preview">
                {generic.mechanismOfAction
                  ? generic.mechanismOfAction
                  : 'Pharmacodynamics & targets'}
              </div>
            </div>
          </div>

          {/* Item 6: Contraindications */}
          <div
            onClick={() => scrollToSection('section-contraindications')}
            className="drug-six-grid-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollToSection('section-contraindications')}
            aria-label="Scroll to Contraindications"
          >
            <div className="navy-med-icon-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <div className="grid-label">Contraindications</div>
              <div className="grid-preview">
                {generic.contraindications && generic.contraindications.length > 0
                  ? generic.contraindications[0].condition
                  : 'Absolute & relative warnings'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THREE-COLUMN DASHBOARD GRID (DESKTOP: 3 COLS, TABLET: 2 COLS, MOBILE: 1 COL) */}
      <div className="drug-three-column-grid">
        {/* CARD 1: INDICATIONS */}
        <div id="section-indications" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Indications</h3>
            </div>
            {/* Mobile Accordion Toggle */}
            <button
              onClick={() => toggleMobileAccordion('indications')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Indications"
            >
              {mobileOpenCards.indications ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.indications ? 'block' : 'hidden md:block'}`}>
            {generic.indications && generic.indications.length > 0 ? (
              <div className="space-y-2.5">
                {(expandedSections.indications
                  ? generic.indications
                  : generic.indications.slice(0, 3)
                ).map((ind, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#0F2C59]">{ind.name}</span>
                      {ind.evidenceLevel && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                          Level {ind.evidenceLevel}
                        </span>
                      )}
                    </div>
                    {(ind.notes || ind.note || ind.guidelineRecommendation) && (
                      <p className="text-xs text-slate-600 mt-1">
                        {ind.notes || ind.note || ind.guidelineRecommendation}
                      </p>
                    )}
                  </div>
                ))}

                {generic.indications.length > 3 && (
                  <button
                    onClick={() => toggleSectionExpand('indications')}
                    className="text-xs font-semibold text-[#08AFC1] hover:underline pt-1 block"
                  >
                    {expandedSections.indications
                      ? 'Show Fewer Indications'
                      : `+ View ${generic.indications.length - 3} More Indications`}
                  </button>
                )}
              </div>
            ) : (
              <ClinicalInfoPendingVerification message="Approved clinical indications pending verification." />
            )}
          </div>
        </div>

        {/* CARD 2: DOSAGE & ADMINISTRATION */}
        <div id="section-dosage" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Dosage & Administration</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('dosage')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Dosage"
            >
              {mobileOpenCards.dosage ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.dosage ? 'block' : 'hidden md:block'}`}>
            {generic.dosageGuidance &&
            (generic.dosageGuidance.adult ||
              generic.dosageGuidance.paediatric ||
              generic.dosageGuidance.pediatric ||
              generic.dosageGuidance.administrationNotes) ? (
              <div className="space-y-2.5">
                {generic.dosageGuidance.adult && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-xs text-blue-900 uppercase tracking-wide block font-bold">
                      Adult Dosing
                    </strong>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {generic.dosageGuidance.adult}
                    </p>
                  </div>
                )}

                {(generic.dosageGuidance.paediatric || generic.dosageGuidance.pediatric) && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-xs text-sky-900 uppercase tracking-wide block font-bold">
                      Pediatric Dosing
                    </strong>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {generic.dosageGuidance.paediatric || generic.dosageGuidance.pediatric}
                    </p>
                  </div>
                )}

                {(generic.dosageGuidance.administrationNotes || generic.dosageGuidance.timingNotice) && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                    <strong className="text-slate-800 block font-semibold">Administration Instructions:</strong>
                    <p className="mt-0.5">{generic.dosageGuidance.administrationNotes || generic.dosageGuidance.timingNotice}</p>
                  </div>
                )}
              </div>
            ) : (
              <ClinicalInfoPendingVerification message="Formulation-specific dosage guidance pending verification." />
            )}
          </div>
        </div>

        {/* CARD 3: SIDE EFFECTS & ADVERSE REACTIONS */}
        <div id="section-side-effects" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Side Effects & Reactions</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('sideEffects')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Side Effects"
            >
              {mobileOpenCards.sideEffects ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.sideEffects ? 'block' : 'hidden md:block'}`}>
            {generic.adverseEffects?.seriousWarnings && generic.adverseEffects.seriousWarnings.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <strong className="text-rose-900 font-bold block mb-1">⚠️ Critical Warnings:</strong>
                <ul className="list-disc list-inside text-rose-800 space-y-0.5">
                  {generic.adverseEffects.seriousWarnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {(generic.adverseEffects?.common && generic.adverseEffects.common.length > 0) ||
            (generic.adverseEffects?.rare && generic.adverseEffects.rare.length > 0) ? (
              <div className="space-y-2 text-xs">
                {generic.adverseEffects?.common && generic.adverseEffects.common.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-800 font-semibold block">Common Reactions:</strong>
                    <p className="text-slate-600 mt-1">{generic.adverseEffects.common.join(', ')}</p>
                  </div>
                )}
                {generic.adverseEffects?.rare && generic.adverseEffects.rare.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-800 font-semibold block">Rare / Less Frequent:</strong>
                    <p className="text-slate-600 mt-1">{generic.adverseEffects.rare.join(', ')}</p>
                  </div>
                )}
              </div>
            ) : (
              <ClinicalInfoPendingVerification message="Adverse reactions profile undergoing clinical verification." />
            )}
          </div>
        </div>

        {/* CARD 4: DRUG INTERACTIONS */}
        <div id="section-interactions" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Drug Interactions</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('interactions')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Interactions"
            >
              {mobileOpenCards.interactions ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.interactions ? 'block' : 'hidden md:block'}`}>
            {generic.keyInteractions && generic.keyInteractions.length > 0 ? (
              <div className="space-y-2.5">
                {(expandedSections.interactions
                  ? generic.keyInteractions
                  : generic.keyInteractions.slice(0, 3)
                ).map((inter, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#0F2C59]">{inter.genericB}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        inter.severity === 'contraindicated' || inter.severity === 'major'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inter.severity}
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1">{inter.clinicalEffect}</p>
                    {inter.recommendation && (
                      <p className="text-slate-500 mt-0.5"><strong>Action:</strong> {inter.recommendation}</p>
                    )}
                  </div>
                ))}

                {generic.keyInteractions.length > 3 && (
                  <button
                    onClick={() => toggleSectionExpand('interactions')}
                    className="text-xs font-semibold text-[#08AFC1] hover:underline pt-1 block"
                  >
                    {expandedSections.interactions
                      ? 'Show Fewer Interactions'
                      : `+ View ${generic.keyInteractions.length - 3} More Interactions`}
                  </button>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <span className="text-amber-500">ℹ</span>
                  <span>Interaction Check Pending</span>
                </div>
                <p>
                  Interaction check pending verified clinical dataset. Specific compound interactions have not yet undergone clinical source verification for this entry.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CARD 5: CONTRAINDICATIONS & PRECAUTIONS */}
        <div id="section-contraindications" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Contraindications & Precautions</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('contraindications')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Contraindications"
            >
              {mobileOpenCards.contraindications ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.contraindications ? 'block' : 'hidden md:block'}`}>
            {generic.contraindications && generic.contraindications.length > 0 ? (
              <div className="space-y-2">
                {generic.contraindications.map((contra, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs">
                    <span className="font-bold text-rose-900 block">{contra.condition}</span>
                    <span className="text-[11px] text-rose-700">Type: {contra.type} Contraindication</span>
                    {(contra.explanation || contra.reason) && (
                      <p className="text-slate-600 mt-0.5">{contra.explanation || contra.reason}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <ClinicalInfoPendingVerification message="Contraindications profile undergoing clinical verification." />
            )}

            {generic.precautions && generic.precautions.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-xs text-slate-800 font-bold block mb-1">Clinical Precautions:</strong>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {generic.precautions.slice(0, 3).map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CARD 6: MECHANISM OF ACTION & PHARMACOLOGY */}
        <div id="section-pharmacology" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Mechanism & Pharmacology</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('pharmacology')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Pharmacology"
            >
              {mobileOpenCards.pharmacology ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.pharmacology ? 'block' : 'hidden md:block'}`}>
            {generic.mechanismOfAction ? (
              <p className="text-sm text-slate-700 leading-relaxed">
                {generic.mechanismOfAction}
              </p>
            ) : (
              <ClinicalInfoPendingVerification message="Mechanism of action undergoing clinical verification." />
            )}

            {generic.receptorOrTarget && (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <strong className="text-slate-800 block">Biological Target:</strong>
                <span className="text-[#08AFC1] font-semibold mt-0.5 block">{generic.receptorOrTarget}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
              <span>ATC Code: <strong className="text-slate-800">{generic.atcCode || 'Pending Assignment'}</strong></span>
            </div>
          </div>
        </div>

        {/* CARD 7: PHARMACOKINETICS */}
        <div id="section-pharmacokinetics" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Pharmacokinetics</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('pharmacokinetics')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Pharmacokinetics"
            >
              {mobileOpenCards.pharmacokinetics ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.pharmacokinetics ? 'block' : 'hidden md:block'}`}>
            {generic.pharmacokinetics ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-500 block">Bioavailability</strong>
                  <span className="text-slate-900 font-semibold mt-0.5 block">
                    {generic.pharmacokinetics.bioavailability || 'Pending verification'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-500 block">Half-life</strong>
                  <span className="text-slate-900 font-semibold mt-0.5 block">
                    {generic.pharmacokinetics.halfLife || 'Pending verification'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-500 block">Metabolism</strong>
                  <span className="text-slate-900 font-semibold mt-0.5 block">
                    {generic.pharmacokinetics.metabolism || 'Pending verification'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong className="text-slate-500 block">Excretion</strong>
                  <span className="text-slate-900 font-semibold mt-0.5 block">
                    {generic.pharmacokinetics.excretion || 'Pending verification'}
                  </span>
                </div>
              </div>
            ) : (
              <ClinicalInfoPendingVerification
                message="Pharmacokinetic parameters pending clinical verification."
                subtext="Bioavailability, half-life, metabolic pathways, and clearance values undergoing label verification."
              />
            )}
          </div>
        </div>

        {/* CARD 8: PREGNANCY & BREASTFEEDING */}
        <div id="section-pregnancy" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Pregnancy & Lactation</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('pregnancy')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Pregnancy"
            >
              {mobileOpenCards.pregnancy ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.pregnancy ? 'block' : 'hidden md:block'}`}>
            {generic.pregnancyInfo?.details || generic.breastfeedingInfo?.details ? (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-800">Pregnancy Category</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      FDA {generic.pregnancyInfo?.category || 'Unclassified'}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {generic.pregnancyInfo?.details || 'Clinical data under review.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-800 font-bold block">Lactation & Breastfeeding:</strong>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {generic.breastfeedingInfo?.details || generic.breastfeedingInfo?.safety || 'Evaluate risk vs benefit.'}
                  </p>
                </div>
              </div>
            ) : (
              <ClinicalInfoPendingVerification
                message="Pregnancy and lactation risk data pending verification."
                subtext="Specific teratogenicity and neonatal EPS/withdrawal risk data undergoing physician review against official product labels."
              />
            )}
          </div>
        </div>

        {/* CARD 9: RENAL & HEPATIC IMPAIRMENT */}
        <div id="section-impairment" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="drug-card-heading">Renal & Hepatic Impairment</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('impairment')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Impairment"
            >
              {mobileOpenCards.impairment ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-3 ${mobileOpenCards.impairment ? 'block' : 'hidden md:block'}`}>
            {generic.doseAdjustment ? (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-800 font-bold block">Renal Impairment:</strong>
                  <p className="text-slate-600 mt-1">
                    {generic.doseAdjustment.renal || 'Renal dosing guidance undergoing clinical verification against official product labels.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-800 font-bold block">Hepatic Impairment:</strong>
                  <p className="text-slate-600 mt-1">
                    {generic.doseAdjustment.hepatic || 'Hepatic dosing guidance undergoing clinical verification against official product labels.'}
                  </p>
                </div>
              </div>
            ) : (
              <ClinicalInfoPendingVerification message="Renal and hepatic impairment guidance pending verification." />
            )}
          </div>
        </div>

        {/* CARD 10: AVAILABLE BANGLADESH BRANDS (SPAN 2 COLS ON DESKTOP) */}
        <div id="section-brands" className="drug-dashboard-card lg:col-span-2 scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="drug-card-heading">Available Brands in Bangladesh</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {otherBrandsWithSameGeneric.length} formulations cataloged ({otherBrandsWithSameGeneric.filter(b => b.registrationNumber && !b.registrationStatus?.toLowerCase().includes('pending')).length} DGDA verified)
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleMobileAccordion('brands')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle Brands Table"
            >
              {mobileOpenCards.brands ? '▲' : '▼'}
            </button>
          </div>

          <div className={`${mobileOpenCards.brands ? 'block' : 'hidden md:block'}`}>
            {otherBrandsWithSameGeneric.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Brand Name</th>
                      <th className="py-2.5 px-3">Strength & Form</th>
                      <th className="py-2.5 px-3">Manufacturer</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(expandedSections.brands
                      ? otherBrandsWithSameGeneric
                      : otherBrandsWithSameGeneric.slice(0, 6)
                    ).map((altBrand) => (
                      <tr key={altBrand.id} className="hover:bg-blue-50/50 transition">
                        <td className="py-2.5 px-3 font-bold text-[#0F2C59]">
                          {altBrand.brandName}
                          {altBrand.brandNameBn && (
                            <span className="block text-[11px] text-sky-600 font-normal font-bengali">
                              {altBrand.brandNameBn}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">
                          {altBrand.strength} • {altBrand.dosageForm}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">
                          {altBrand.manufacturerName}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                          {altBrand.verifiedPrice?.amount ? `৳ ${altBrand.verifiedPrice.amount.toFixed(2)}` : <span className="text-slate-400 font-normal">Price unavailable</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => onOpenBrand && onOpenBrand(altBrand.slug || altBrand.id)}
                            className="px-2.5 py-1 min-h-[36px] rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0F2C59] font-bold text-[11px] transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {otherBrandsWithSameGeneric.length > 6 && (
                  <div className="pt-3 text-center">
                    <button
                      onClick={() => toggleSectionExpand('brands')}
                      className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition min-h-[38px]"
                    >
                      {expandedSections.brands
                        ? 'Show Fewer Brands'
                        : `View All ${otherBrandsWithSameGeneric.length} Registered Brands`}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">No other registered brands indexed for this generic.</p>
            )}
          </div>
        </div>

        {/* CARD 11: REFERENCES & GOVERNANCE */}
        <div id="section-references" className="drug-dashboard-card scroll-mt-24">
          <div className="drug-card-header-bar">
            <div className="drug-card-title-group">
              <div className="navy-med-icon-badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="drug-card-heading">References & Review</h3>
            </div>
            <button
              onClick={() => toggleMobileAccordion('references')}
              className="md:hidden text-slate-500 p-1 text-sm font-bold min-h-[44px] flex items-center"
              aria-label="Toggle References"
            >
              {mobileOpenCards.references ? '▲' : '▼'}
            </button>
          </div>

          <div className={`space-y-2.5 text-xs text-slate-600 ${mobileOpenCards.references ? 'block' : 'hidden md:block'}`}>
            <p><strong>Brand Registration Status:</strong> {brand.registrationNumber ? `DGDA #${brand.registrationNumber}` : (brand.registrationStatus || 'DGDA Verification Pending')}</p>
            <p><strong>Brand Catalog Source:</strong> {brand.source || 'Directorate General of Drug Administration (DGDA) Catalog'}</p>
            {generic.medicalReview && generic.medicalReview.reviewerName ? (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <p><strong>Clinical Review Status:</strong> <span className="font-semibold uppercase text-emerald-700">{generic.medicalReview.status}</span></p>
                <p><strong>Qualified Reviewer:</strong> {generic.medicalReview.reviewerName}</p>
                <p><strong>Credentials:</strong> {generic.medicalReview.reviewerCredentials}</p>
                {generic.medicalReview.reviewDate && <p><strong>Review Date:</strong> {generic.medicalReview.reviewDate}</p>}
                <p><strong>Content Version:</strong> v{generic.medicalReview.contentVersion || '1.0'}</p>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
                <p><strong>Clinical Review Status:</strong> Monograph claims pending qualification and sign-off by a registered pharmacist or physician.</p>
              </div>
            )}
            {generic.sources && generic.sources.length > 0 ? (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <strong className="text-slate-800 block">Traceable Compendium & Label Sources:</strong>
                {generic.sources.map((s, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px]">
                    <div className="font-semibold text-slate-800">{s.title}</div>
                    <div className="text-slate-500">{s.organization} ({s.jurisdiction}) • {s.publicationDate}</div>
                    {s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#08AFC1] hover:underline block truncate mt-0.5">
                        {s.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
