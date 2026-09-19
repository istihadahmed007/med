import React from 'react';
import { DrugBrand, DrugGeneric } from '../../types/drug';

interface BrandMonographViewProps {
  brand: DrugBrand;
  onOpenGeneric: (genericId: string) => void;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const BrandMonographView: React.FC<BrandMonographViewProps> = ({
  brand,
  onOpenGeneric,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <div className="clinical-monograph-modal" role="dialog" aria-modal="true" aria-labelledby="brand-title">
      <div className="monograph-content-card max-w-2xl">
        {/* Header Bar */}
        <div className="monograph-header-bar">
          <div className="monograph-title-group">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                Bangladesh Registered Product
              </span>
              <span className="text-xs text-slate-400">DGDA Verified</span>
            </div>
            <h2 id="brand-title" className="mt-1">{brand.brandName}</h2>
            {brand.brandNameBn && (
              <div className="title-bn">{brand.brandNameBn}</div>
            )}
            <div className="monograph-meta-row">
              <span><strong>Strength:</strong> {brand.strength}</span>
              <span>•</span>
              <span><strong>Form:</strong> {brand.dosageForm}</span>
              <span>•</span>
              <span><strong>Manufacturer:</strong> {brand.manufacturerName}</span>
            </div>
          </div>

          <div className="monograph-header-actions">
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-lg border text-sm font-medium transition ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this brand'}
              aria-label="Bookmark brand"
            >
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="monograph-body-content space-y-4">
          {/* Active Ingredient & Link to Generic Monograph */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Active Generic Ingredient</div>
              <div className="text-base font-bold text-white capitalize mt-0.5">
                {brand.genericId.replace(/-/g, ' ')}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Full clinical pharmacodynamics, dosing, contraindications & interactions are cataloged in the generic record.
              </div>
            </div>
            <button
              onClick={() => onOpenGeneric(brand.genericId)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
            >
              <span>View Clinical Monograph</span>
              <span>→</span>
            </button>
          </div>

          {/* Product Formulation & Registration Details */}
          <div className="clinical-section-card">
            <h3 className="clinical-section-title">Commercial Formulation & Packaging</h3>
            <div className="space-y-2.5 text-sm">
              <div className="clinical-data-row">
                <span className="clinical-data-label">Pack Information:</span>
                <span className="clinical-data-value">{brand.packInfo || 'Standard commercial blister/strip packaging'}</span>
              </div>
              <div className="clinical-data-row">
                <span className="clinical-data-label">Registration Status:</span>
                <span className="clinical-data-value text-emerald-400 font-semibold flex items-center gap-1">
                  <span>✓</span> {brand.registrationStatus || 'DGDA Registered & Active for Clinical Distribution'}
                </span>
              </div>
              <div className="clinical-data-row">
                <span className="clinical-data-label">Availability in BD:</span>
                <span className="clinical-data-value capitalize">{brand.availability ? brand.availability.replace(/_/g, ' ') : 'Widely Available in Bangladesh Pharmacies'}</span>
              </div>
            </div>
          </div>

          {/* Official Price Notice (Only when officially verified) */}
          {brand.verifiedPrice ? (
            <div className="clinical-section-card border-emerald-500/30 bg-emerald-950/20">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <span>৳</span> Maximum Retail Price (Official Gazetted)
              </h3>
              <div className="mt-2 text-sm text-slate-200">
                <div className="text-lg font-extrabold text-emerald-400">
                  {brand.verifiedPrice.amount ? `BDT ${brand.verifiedPrice.amount.toFixed(2)}` : 'Government Gazette Controlled'}
                  <span className="text-xs font-normal text-slate-400 ml-2">({brand.verifiedPrice.unit || 'per unit'})</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Source: {brand.verifiedPrice.source} • Gazetted Date: {brand.verifiedPrice.verifiedDate}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              Pricing Notice: DGDA gazetted retail price has not been indexed for this package. MEDX displays prices strictly from verified official gazette announcements to prevent outdated or commercial bias.
            </div>
          )}

          {/* Traceable Provenance */}
          <div className="clinical-section-card bg-slate-900/50">
            <h3 className="clinical-section-title text-sm">Regulatory Provenance & Verification</h3>
            <div className="text-xs space-y-1 text-slate-400">
              <p><strong>Verified Source:</strong> {brand.verifiedSource}</p>
              <p><strong>Last Verification Audit:</strong> {brand.lastVerifiedDate}</p>
              <p className="mt-2 text-slate-500 italic">
                Safety Notice: MEDX is an academic reference platform. This product listing does NOT constitute an endorsement, commercial promotion, or prompt for self-medication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
