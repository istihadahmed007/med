import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './drugReference.css';

import {
  DrugGeneric,
  DrugBrand,
  Manufacturer,
  TherapeuticClass,
  DiseaseGuideline,
  ClinicalInvestigation,
  DrugSearchResponse,
  OfflineMonograph,
  UserDrugBookmarks,
  DatabaseStatistics,
  DosageFormRecord,
  DrugImportJob,
  ImportAdapterType
} from '../../types/drug';

import { DrugClientService } from '../../services/drugService';
import { GenericMonographView } from './GenericMonographView';
import { BrandMonographView } from './BrandMonographView';
import { BrandDetailView } from './BrandDetailView';
import { InteractionCheckerModal } from './InteractionCheckerModal';
import { DrugComparisonModal } from './DrugComparisonModal';
import { PharmacologyStudyWorkspace } from './PharmacologyStudyWorkspace';
import { DrugAdminGovernanceModal } from './DrugAdminGovernanceModal';

interface DrugReferenceHubProps {
  onOpenAcrossBooksTopic?: (topicId: string) => void;
}

type BrowseCategory =
  | 'all'
  | 'generics'
  | 'brands'
  | 'classes'
  | 'indications'
  | 'manufacturers'
  | 'saved'
  | 'recent'
  | 'offline'
  | 'guidelines'
  | 'investigations'
  | 'admin-import';

export const DrugReferenceHub: React.FC<DrugReferenceHubProps> = ({
  onOpenAcrossBooksTopic
}) => {
  // Read initial state from URL query/hash parameters
  const getUrlParams = (): {
    query: string;
    letter: string;
    brand: string;
    category: BrowseCategory;
    selectedClass: string;
    selectedManufacturer: string;
    selectedForm: string;
    prescriptionStatus: string;
  } => {
    if (typeof window === 'undefined') return { query: '', letter: '', brand: '', category: 'all', selectedClass: 'all', selectedManufacturer: 'all', selectedForm: 'all', prescriptionStatus: 'all' };
    const hash = window.location.hash;
    const queryPart = hash.includes('?') ? hash.split('?')[1] : window.location.search.replace(/^\?/, '');
    const searchParams = new URLSearchParams(queryPart);
    return {
      query: searchParams.get('q') || '',
      letter: searchParams.get('letter') || '',
      brand: searchParams.get('brand') || '',
      category: (searchParams.get('tab') as BrowseCategory) || 'all',
      selectedClass: searchParams.get('class') || 'all',
      selectedManufacturer: searchParams.get('mfg') || 'all',
      selectedForm: searchParams.get('form') || 'all',
      prescriptionStatus: searchParams.get('rx') || 'all'
    };
  };

  const initialParams = getUrlParams();

  // Search & Filter State
  const [query, setQuery] = useState(initialParams.query);
  const [selectedLetter, setSelectedLetter] = useState(initialParams.letter);
  const [activeCategory, setActiveCategory] = useState<BrowseCategory>(initialParams.category);
  const [selectedClass, setSelectedClass] = useState(initialParams.selectedClass);
  const [selectedManufacturer, setSelectedManufacturer] = useState(initialParams.selectedManufacturer);
  const [selectedDosageForm, setSelectedDosageForm] = useState(initialParams.selectedForm);
  const [selectedPrescriptionStatus, setSelectedPrescriptionStatus] = useState(initialParams.prescriptionStatus);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [languageMode, setLanguageMode] = useState<'both' | 'en' | 'bn'>('both');

  // Real Database Statistics (No hardcoded fake totals)
  const [dbStats, setDbStats] = useState<DatabaseStatistics | null>(null);
  const [dosageFormsList, setDosageFormsList] = useState<DosageFormRecord[]>([]);

  // Data states
  const [searchResponse, setSearchResponse] = useState<DrugSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [therapeuticClasses, setTherapeuticClasses] = useState<TherapeuticClass[]>([]);
  const [guidelines, setGuidelines] = useState<DiseaseGuideline[]>([]);
  const [investigations, setInvestigations] = useState<ClinicalInvestigation[]>([]);
  const [bookmarks, setBookmarks] = useState<UserDrugBookmarks>({ generics: [], brands: [] });
  const [recentDrugs, setRecentDrugs] = useState<Array<{ id: string; type: 'generic' | 'brand'; name: string; viewedAt: string }>>([]);
  const [offlineMonographs, setOfflineMonographs] = useState<OfflineMonograph[]>([]);
  const [outdatedOfflineCount, setOutdatedOfflineCount] = useState(0);

  // Active Brand Detail View (Stable /drugs/brand/:slug view)
  const [activeBrandSlug, setActiveBrandSlug] = useState<string | null>(initialParams.brand || null);

  // Modals state
  const [activeGeneric, setActiveGeneric] = useState<DrugGeneric | null>(null);
  const [genericBrands, setGenericBrands] = useState<DrugBrand[]>([]);
  const [activeBrandModal, setActiveBrandModal] = useState<DrugBrand | null>(null);
  const [studyGeneric, setStudyGeneric] = useState<DrugGeneric | null>(null);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareInitialIds, setCompareInitialIds] = useState<string[]>([]);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);
  const [governanceInitialDrugId, setGovernanceInitialDrugId] = useState('');

  // Admin Ingestion State
  const [importJobs, setImportJobs] = useState<DrugImportJob[]>([]);
  const [selectedAdapter, setSelectedAdapter] = useState<ImportAdapterType>('csv');
  const [sourceNameInput, setSourceNameInput] = useState('DGDA Bangladesh Pharmacopoeia Export');
  const [sourceLicenceInput, setSourceLicenceInput] = useState('Open Government License / Public Gazette');
  const [batchSizeInput, setBatchSizeInput] = useState(300);
  const [dryRunInput, setDryRunInput] = useState(false);
  const [importPayloadInput, setImportPayloadInput] = useState('');
  const [restEndpointInput, setRestEndpointInput] = useState('');
  const [restAuthTokenInput, setRestAuthTokenInput] = useState('');
  const [adminKeyInput, setAdminKeyInput] = useState('medx-admin-secret-2025');
  const [importStatusMessage, setImportStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isImportRunning, setIsImportRunning] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  // Live Auto-Suggestions across complete connected database
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    slug?: string;
    type: 'brand' | 'generic';
    brandName: string;
    brandNameBn?: string;
    genericName: string;
    strength?: string;
    dosageForm?: string;
    manufacturerName?: string;
    price?: number;
    prescriptionStatus?: string;
  }>>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const suggestionRequestId = React.useRef(0);
  const searchWrapperRef = React.useRef<HTMLDivElement>(null);

  // Sync state to URL hash
  const syncToUrl = useCallback(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedLetter) params.set('letter', selectedLetter);
    if (activeBrandSlug) params.set('brand', activeBrandSlug);
    if (activeCategory !== 'all') params.set('tab', activeCategory);
    if (selectedClass !== 'all') params.set('class', selectedClass);
    if (selectedManufacturer !== 'all') params.set('mfg', selectedManufacturer);
    if (selectedDosageForm !== 'all') params.set('form', selectedDosageForm);
    if (selectedPrescriptionStatus !== 'all') params.set('rx', selectedPrescriptionStatus);

    const queryString = params.toString();
    const newHash = queryString ? `#drug-reference?${queryString}` : '#drug-reference';
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [
    query,
    selectedLetter,
    activeBrandSlug,
    activeCategory,
    selectedClass,
    selectedManufacturer,
    selectedDosageForm,
    selectedPrescriptionStatus
  ]);

  useEffect(() => {
    syncToUrl();
  }, [syncToUrl]);

  // Initial load
  useEffect(() => {
    loadAuxiliaryData();
    refreshUserData();
    loadDatabaseStats();
    loadDosageForms();
    loadImportJobs();
  }, []);

  const loadDatabaseStats = async () => {
    try {
      const stats = await DrugClientService.getDatabaseStats();
      setDbStats(stats);
    } catch (e) {
      console.warn('Could not load database statistics', e);
    }
  };

  const loadDosageForms = async () => {
    try {
      const forms = await DrugClientService.getDosageForms();
      setDosageFormsList(forms);
    } catch (e) {
      console.warn('Could not load dosage forms', e);
    }
  };

  const loadImportJobs = async () => {
    try {
      const jobs = await DrugClientService.getImportJobs();
      setImportJobs(jobs);
    } catch (e) {
      console.warn('Could not load import jobs', e);
    }
  };

  // Search effect with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      executeSearch();
    }, 250);
    return () => clearTimeout(timer);
  }, [
    query,
    selectedLetter,
    activeCategory,
    selectedClass,
    selectedManufacturer,
    selectedDosageForm,
    selectedPrescriptionStatus,
    currentPage
  ]);

  // Fetch live suggestions across complete connected database (brands, generics, forms, manufacturers)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    const currentReqId = ++suggestionRequestId.current;
    setIsSuggesting(true);

    const timer = setTimeout(async () => {
      try {
        const resp = await DrugClientService.searchDrugs({
          query: trimmed,
          limit: 12
        });

        if (currentReqId !== suggestionRequestId.current) return;

        const items: Array<{
          id: string;
          slug?: string;
          type: 'brand' | 'generic';
          brandName: string;
          brandNameBn?: string;
          genericName: string;
          strength?: string;
          dosageForm?: string;
          manufacturerName?: string;
          price?: number;
          prescriptionStatus?: string;
        }> = [];

        // Brands suggestions
        if (resp.results.brands) {
          resp.results.brands.slice(0, 8).forEach(b => {
            items.push({
              id: b.id,
              slug: b.slug,
              type: 'brand',
              brandName: b.brandName,
              brandNameBn: b.brandNameBn,
              genericName: b.genericId.replace(/-/g, ' '),
              strength: b.strength,
              dosageForm: b.dosageForm,
              manufacturerName: b.manufacturerName,
              price: b.verifiedPrice?.amount,
              prescriptionStatus: b.prescriptionStatus
            });
          });
        }

        // Generics suggestions
        if (resp.results.generics) {
          resp.results.generics.slice(0, 4).forEach(g => {
            items.push({
              id: g.id,
              type: 'generic',
              brandName: g.name,
              brandNameBn: g.nameBn,
              genericName: g.pharmacologicalClass || g.therapeuticClass || 'Generic Molecule',
              dosageForm: 'Active Generic',
              prescriptionStatus: g.prescriptionStatus
            });
          });
        }

        setSuggestions(items);
        setIsSuggestionsOpen(items.length > 0);
        setActiveSuggestionIndex(-1);
      } catch (err) {
        console.warn('Failed to fetch suggestions', err);
      } finally {
        if (currentReqId === suggestionRequestId.current) {
          setIsSuggesting(false);
        }
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to dismiss suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSuggestionsOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        setIsSuggestionsOpen(false);
        executeSearch();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      } else {
        setIsSuggestionsOpen(false);
        executeSearch();
      }
    } else if (e.key === 'Escape') {
      setIsSuggestionsOpen(false);
    }
  };

  const handleSelectSuggestion = (sug: typeof suggestions[0]) => {
    setIsSuggestionsOpen(false);
    if (sug.type === 'brand') {
      handleOpenBrandDetail(sug.slug || sug.id);
    } else {
      handleOpenGeneric(sug.id);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setSelectedLetter('');
    setCurrentPage(1);
    setSuggestions([]);
    setIsSuggestionsOpen(false);
  };

  const loadAuxiliaryData = async () => {
    try {
      const [cls, gds, invs] = await Promise.all([
        DrugClientService.getTherapeuticClasses(),
        DrugClientService.getGuidelines(),
        DrugClientService.getInvestigations()
      ]);
      setTherapeuticClasses(cls);
      setGuidelines(gds);
      setInvestigations(invs);

      const check = await DrugClientService.checkForOfflineUpdates();
      setOutdatedOfflineCount(check.updatedCount);
      setOfflineMonographs(DrugClientService.getOfflineMonographs());
    } catch (e) {
      console.warn('Failed to load auxiliary drug data', e);
    }
  };

  const refreshUserData = async () => {
    try {
      const [bm, rec] = await Promise.all([
        DrugClientService.getBookmarks(),
        DrugClientService.getRecentDrugs()
      ]);
      setBookmarks(bm);
      setRecentDrugs(rec);
      setOfflineMonographs(DrugClientService.getOfflineMonographs());
    } catch (e) {
      console.warn('Failed to refresh user data', e);
    }
  };

  const executeSearch = async () => {
    setLoading(true);
    let filterType = 'all';
    if (activeCategory === 'generics') filterType = 'generic';
    if (activeCategory === 'brands') filterType = 'brand';
    if (activeCategory === 'classes') filterType = 'class';
    if (activeCategory === 'manufacturers') filterType = 'manufacturer';

    try {
      const resp = await DrugClientService.searchDrugs({
        query,
        filterType,
        letter: selectedLetter || undefined,
        therapeuticClass: selectedClass !== 'all' ? selectedClass : undefined,
        manufacturerId: selectedManufacturer !== 'all' ? selectedManufacturer : undefined,
        dosageForm: selectedDosageForm !== 'all' ? selectedDosageForm : undefined,
        prescriptionStatus: selectedPrescriptionStatus !== 'all' ? selectedPrescriptionStatus : undefined,
        page: currentPage,
        limit: 20
      });
      setSearchResponse(resp);
    } catch (e) {
      console.error('Search error', e);
    } finally {
      setLoading(false);
    }
  };

  // Open Generic Monograph
  const handleOpenGeneric = async (genericId: string) => {
    try {
      const gen = await DrugClientService.getGeneric(genericId);
      if (gen) {
        const brs = await DrugClientService.getBrandsForGeneric(gen.id);
        setActiveGeneric(gen);
        setGenericBrands(brs);
        DrugClientService.trackRecentDrug(gen.id, 'generic', gen.name);
        refreshUserData();
      }
    } catch (e) {
      console.error('Failed to open generic', e);
    }
  };

  // Open Brand Detail View
  const handleOpenBrandDetail = (brandSlugOrId: string) => {
    setActiveBrandSlug(brandSlugOrId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark
  const handleToggleBookmark = async (type: 'generic' | 'brand', id: string) => {
    await DrugClientService.toggleBookmark(type, id);
    refreshUserData();
  };

  // Toggle Offline Save
  const handleToggleOffline = (generic: DrugGeneric, brands: DrugBrand[]) => {
    if (DrugClientService.isMonographSavedOffline(generic.id)) {
      DrugClientService.removeOfflineMonograph(generic.id);
    } else {
      DrugClientService.saveMonographOffline(generic, brands);
    }
    setOfflineMonographs(DrugClientService.getOfflineMonographs());
  };

  // Comparison launcher
  const handleOpenCompare = (ids: string[] = ['enalapril', 'losartan']) => {
    setCompareInitialIds(ids);
    setIsCompareModalOpen(true);
  };

  // Admin Ingestion Launch Handler
  const handleStartImport = async () => {
    setIsImportRunning(true);
    setImportStatusMessage(null);

    try {
      let parsedData: any = undefined;
      if (selectedAdapter === 'json' && importPayloadInput.trim()) {
        try {
          parsedData = JSON.parse(importPayloadInput);
        } catch (e) {
          throw new Error('Invalid JSON format in payload input');
        }
      } else if (selectedAdapter === 'csv') {
        parsedData = importPayloadInput;
      }

      const res = await DrugClientService.startImportJob({
        adapterType: selectedAdapter,
        sourceName: sourceNameInput,
        sourceLicence: sourceLicenceInput,
        batchSize: Number(batchSizeInput),
        dryRun: dryRunInput,
        data: parsedData,
        restConfig: selectedAdapter === 'rest' ? {
          endpoint: restEndpointInput,
          authHeader: restAuthTokenInput ? `Bearer ${restAuthTokenInput}` : undefined
        } : undefined,
        adminKey: adminKeyInput
      });

      setActiveJobId(res.jobId);
      setImportStatusMessage({
        text: `Job started: ${res.message}. Job ID: ${res.jobId}`,
        isError: false
      });

      // Reload jobs & stats after import
      setTimeout(() => {
        loadImportJobs();
        loadDatabaseStats();
        executeSearch();
      }, 1500);
    } catch (err: any) {
      setImportStatusMessage({
        text: err.message || 'Import job failed to start',
        isError: true
      });
    } finally {
      setIsImportRunning(false);
    }
  };

  // Download Job Error Report
  const handleDownloadErrorReport = async (jobId: string, format: 'json' | 'csv') => {
    try {
      const data = await DrugClientService.getJobErrors(jobId, format);
      const blob = new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], {
        type: format === 'csv' ? 'text/csv' : 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `drug_import_errors_${jobId}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(`Could not download error report: ${e.message}`);
    }
  };

  // Retry Failed Rows
  const handleRetryJob = async (jobId: string) => {
    try {
      const res = await DrugClientService.retryJobErrors(jobId, undefined, adminKeyInput);
      alert(`Retry started: ${res.message}`);
      loadImportJobs();
    } catch (e: any) {
      alert(`Retry failed: ${e.message}`);
    }
  };

  // Alphabet A-Z Bar
  const alphabet = useMemo(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), []);

  const allGenericsList = searchResponse?.results.generics || [];

  return (
    <div className="drug-reference-page min-h-screen">
      {/* 1. DARK NAVY TOP BAR WITH MEDX BRANDING, MENU & CONTROLS */}
      <div className="drug-navy-topbar">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.location.hash = '#dashboard';
            }}
            className="flex items-center gap-2.5 text-white hover:text-cyan-300 transition group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1] rounded-lg p-1"
            aria-label="MEDX Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#08AFC1] to-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
              M
            </div>
            <span className="font-extrabold tracking-tight text-white text-base">
              MEDX <span className="text-[#08AFC1] font-semibold text-xs ml-1">REFERENCE</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setIsInteractionModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-cyan-300 border border-cyan-500/30 font-semibold transition"
          >
            <span>⚡</span> Interaction Checker
          </button>

          <button
            onClick={() => handleOpenCompare(['enalapril', 'losartan'])}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-slate-200 border border-slate-700 font-medium transition"
          >
            <span>⚖️</span> Compare
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 min-h-[38px] rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">MBBS Student</span>
          </div>
        </div>
      </div>

      {/* 2. BLUE-TO-CYAN CURVED HEADER WITH PROMINENT SEARCH */}
      <div className="drug-curved-header">
        <div className="drug-curved-header-content text-center">
          <div className="drug-header-badge">
            <span>DGDA Bangladesh Registered</span>
            <span>•</span>
            <span>Clinical Pharmacology</span>
          </div>

          <h1 className="drug-header-title">Drug Reference</h1>
          <p className="drug-header-subtitle">
            Search Bangladesh Medicines, Generic Formulations & Official Clinical Guidelines
            <span className="bangla-text">• ওষুধ নির্দেশিকা ও ফার্মাকোলজি</span>
          </p>

          {/* PROMINENT SEARCH INPUT WITH SUGGESTIONS DROPDOWN */}
          <div className="drug-header-search-wrapper" ref={searchWrapperRef}>
            <div className="drug-header-search-box">
              <span className="drug-header-search-icon">🔍</span>
              <input
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) setIsSuggestionsOpen(true);
                }}
                placeholder="Search brand, generic, or manufacturer…"
                className="drug-header-search-input"
                aria-label="Search brand, generic, or manufacturer"
                aria-autocomplete="list"
                aria-expanded={isSuggestionsOpen}
              />
              {isSuggesting && (
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-[#08AFC1] border-t-transparent mr-2 shrink-0"></div>
              )}
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="drug-search-clear"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* AUTO-SUGGESTIONS DROPDOWN */}
            {isSuggestionsOpen && suggestions.length > 0 && (
              <div className="drug-suggestions-dropdown" role="listbox">
                {suggestions.map((sug, idx) => (
                  <div
                    key={`${sug.type}-${sug.id}`}
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`drug-suggestion-item ${idx === activeSuggestionIndex ? 'active' : ''}`}
                    role="option"
                    aria-selected={idx === activeSuggestionIndex}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0F2C59] flex items-center justify-center font-bold text-xs shrink-0">
                        {sug.type === 'brand' ? '💊' : '🧬'}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#0F2C59] text-sm">{sug.brandName}</span>
                          {sug.strength && (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-semibold">
                              {sug.strength}
                            </span>
                          )}
                          {sug.dosageForm && (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                              {sug.dosageForm}
                            </span>
                          )}
                          {sug.brandNameBn && (
                            <span className="font-bengali text-xs text-sky-700 font-medium">
                              {sug.brandNameBn}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {sug.type === 'brand' ? (
                            <span>
                              Generic: <strong className="text-slate-700 capitalize">{sug.genericName}</strong> • {sug.manufacturerName}
                            </span>
                          ) : (
                            <span>
                              Class: <strong className="text-slate-700">{sug.genericName}</strong>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {sug.price && (
                      <span className="text-emerald-700 font-bold text-xs shrink-0">
                        ৳ {sug.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick In-Header Filters: Brand/Generic, Manufacturer, Dosage Form */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <div className="flex items-center rounded-lg bg-white/15 backdrop-blur-md p-0.5 border border-white/20">
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-md font-semibold transition ${
                  activeCategory === 'all' ? 'bg-white text-[#0F2C59] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => { setActiveCategory('brands'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-md font-semibold transition ${
                  activeCategory === 'brands' ? 'bg-white text-[#0F2C59] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Brands
              </button>
              <button
                type="button"
                onClick={() => { setActiveCategory('generics'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-md font-semibold transition ${
                  activeCategory === 'generics' ? 'bg-white text-[#0F2C59] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Generics
              </button>
            </div>

            {/* Quick Manufacturer Filter */}
            <select
              value={selectedManufacturer}
              onChange={e => { setSelectedManufacturer(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/20 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300 [&>option]:text-slate-900"
              aria-label="Filter by manufacturer"
            >
              <option value="all">All Manufacturers</option>
              <option value="square">Square Pharma</option>
              <option value="beximco">Beximco Pharma</option>
              <option value="incepta">Incepta Pharma</option>
              <option value="renata">Renata Ltd</option>
              <option value="eskayef">Eskayef Pharma</option>
              <option value="acme">The ACME Labs</option>
              <option value="healthcare">Healthcare Pharma</option>
              <option value="opsonin">Opsonin Pharma</option>
              <option value="aristopharma">Aristopharma</option>
              <option value="drug-international">Drug International</option>
            </select>

            {/* Quick Dosage Form Filter */}
            <select
              value={selectedDosageForm}
              onChange={e => { setSelectedDosageForm(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/20 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300 [&>option]:text-slate-900"
              aria-label="Filter by dosage form"
            >
              <option value="all">All Dosage Forms</option>
              {dosageFormsList.slice(0, 15).map(df => {
                const fName = df.form || df.name || '';
                return (
                  <option key={fName} value={fName}>
                    {fName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* 3. MAIN PAGE CONTENT (PALE BLUE-WHITE BACKGROUND) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        {activeBrandSlug ? (
          <BrandDetailView
            slugOrId={activeBrandSlug}
            onBack={() => {
              setActiveBrandSlug(null);
              // Clear brand parameter from hash
              const url = new URL(window.location.href);
              const hash = url.hash.replace(/brand=[^&]+&?/, '').replace(/\?$/, '');
              window.history.replaceState(null, '', hash || '#drug-reference');
            }}
            onOpenGeneric={handleOpenGeneric}
            onOpenBrand={handleOpenBrandDetail}
            onOpenAcrossBooksTopic={onOpenAcrossBooksTopic}
            onOpenPracticeQuestions={() => {
              window.location.hash = 'practice';
            }}
            isBookmarked={bookmarks.brands.includes(activeBrandSlug)}
            onToggleBookmark={() => handleToggleBookmark('brand', activeBrandSlug)}
          />
        ) : (
          <div className="space-y-6">
            {/* Regulatory Safety Notice */}
            <div className="drug-disclaimer-banner" role="alert">
              <span className="disclaimer-icon">⚠️</span>
              <div>
                <strong>Educational reference:</strong> Verify prescribing information before clinical use. This platform is designed for medical students and does not replace official DGDA gazettes, product monographs, or certified physician prescribing.
              </div>
            </div>

            {/* Real Database Summary Counters */}
            <div className="drug-summary-cards">
              <div className="drug-stat-card">
                <span className="drug-stat-number">
                  {dbStats ? dbStats.totalBrands.toLocaleString() : '—'}
                </span>
                <span className="drug-stat-label">Total Brands</span>
                <span className="drug-stat-subtext">Commercial formulations</span>
              </div>

              <div className="drug-stat-card">
                <span className="drug-stat-number">
                  {dbStats ? dbStats.totalGenerics.toLocaleString() : '—'}
                </span>
                <span className="drug-stat-label">Total Generics</span>
                <span className="drug-stat-subtext">Active pharmaceutical entities</span>
              </div>

              <div className="drug-stat-card">
                <span className="drug-stat-number">
                  {dbStats ? dbStats.totalManufacturers.toLocaleString() : '—'}
                </span>
                <span className="drug-stat-label">Manufacturers</span>
                <span className="drug-stat-subtext">DGDA licensed pharma</span>
              </div>

              <div className="drug-stat-card">
                <span className="drug-stat-number">
                  {dbStats ? (dbStats.totalTherapeuticClasses ?? dbStats.totalClasses ?? 0).toLocaleString() : '—'}
                </span>
                <span className="drug-stat-label">Therapeutic Classes</span>
                <span className="drug-stat-subtext">Clinical categories</span>
              </div>

              <div className="drug-stat-card">
                <span className="drug-stat-number">
                  {dbStats ? (dbStats.recordsUpdatedThisMonth ?? dbStats.updatedThisMonth ?? 0).toLocaleString() : '—'}
                </span>
                <span className="drug-stat-label">Updated This Month</span>
                <span className="drug-stat-subtext">Verified audits & gazette</span>
              </div>
            </div>

            {/* Action Tool Launchers */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setIsInteractionModalOpen(true)}
                className="btn-primary-action"
              >
                <span>⚡</span> Multi-Drug Interaction Checker
              </button>
              <button
                onClick={() => handleOpenCompare(['enalapril', 'losartan'])}
                className="btn-secondary-action"
              >
                <span>⚖️</span> Drug-Class Comparisons
              </button>
              <button
                onClick={() => {
                  if (allGenericsList.length > 0) {
                    setStudyGeneric(allGenericsList[0]);
                  }
                }}
                className="btn-secondary-action"
              >
                <span>🎓</span> Pharmacology Study Mode
              </button>
              <button
                onClick={() => {
                  setActiveCategory('admin-import');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="btn-secondary-action text-xs text-amber-300 border-amber-500/30 hover:border-amber-400"
              >
                <span>⚙️</span> Ingestion & Admin Portal
              </button>
            </div>

            {/* Quick Hub Navigation Tabs */}
            <div className="drug-quick-hubs">
              <button
                className={`drug-hub-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
              >
                All Medicines
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'brands' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('brands'); setCurrentPage(1); }}
              >
                By Brand ({dbStats ? dbStats.totalBrands : '…'})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'generics' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('generics'); setCurrentPage(1); }}
              >
                By Generic ({dbStats ? dbStats.totalGenerics : '…'})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'classes' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('classes'); setCurrentPage(1); }}
              >
                Therapeutic Classes ({therapeuticClasses.length})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'guidelines' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('guidelines'); setCurrentPage(1); }}
              >
                DGHS Guidelines ({guidelines.length})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'investigations' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('investigations'); setCurrentPage(1); }}
              >
                Lab Investigations ({investigations.length})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'saved' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('saved'); setCurrentPage(1); }}
              >
                ★ Saved ({bookmarks.generics.length + bookmarks.brands.length})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'recent' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('recent'); setCurrentPage(1); }}
              >
                🕒 Recent ({recentDrugs.length})
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'offline' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('offline'); setCurrentPage(1); }}
              >
                📥 Offline ({offlineMonographs.length})
                {outdatedOfflineCount > 0 && (
                  <span className="tab-badge bg-rose-600 text-white font-bold ml-1">
                    {outdatedOfflineCount}
                  </span>
                )}
              </button>
              <button
                className={`drug-hub-tab ${activeCategory === 'admin-import' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('admin-import'); }}
              >
                ⚡ Ingestion Engine
              </button>
            </div>

            {/* A-Z Alphabetical Bar */}
            <div className="drug-az-bar">
              <button
                onClick={() => {
                  setSelectedLetter('');
                  setCurrentPage(1);
                }}
                className={`drug-az-pill ${!selectedLetter ? 'active' : ''}`}
                title="Show all letters"
              >
                All
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter);
                    setCurrentPage(1);
                  }}
                  className={`drug-az-pill ${selectedLetter === letter ? 'active' : ''}`}
                  title={`Browse drugs starting with ${letter}`}
                >
                  {letter}
                </button>
              ))}
            </div>

      {/* 8. FILTER CONTROLS & VIEW TOGGLE BAR */}
      {activeCategory !== 'admin-import' && (
        <div className="drug-filter-row">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Therapeutic Class Filter */}
            <select
              value={selectedClass}
              onChange={e => { setSelectedClass(e.target.value); setCurrentPage(1); }}
              className="drug-filter-select"
              aria-label="Filter by therapeutic class"
            >
              <option value="all">All Therapeutic Classes</option>
              {therapeuticClasses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Manufacturer Filter */}
            <select
              value={selectedManufacturer}
              onChange={e => { setSelectedManufacturer(e.target.value); setCurrentPage(1); }}
              className="drug-filter-select"
              aria-label="Filter by manufacturer"
            >
              <option value="all">All Bangladesh Companies</option>
              <option value="square">Square Pharmaceuticals PLC</option>
              <option value="beximco">Beximco Pharmaceuticals Ltd</option>
              <option value="incepta">Incepta Pharmaceuticals Ltd</option>
              <option value="renata">Renata Limited</option>
              <option value="eskayef">Eskayef Pharmaceuticals Ltd</option>
              <option value="acme">The ACME Laboratories Ltd</option>
              <option value="healthcare">Healthcare Pharmaceuticals Ltd</option>
              <option value="opsonin">Opsonin Pharma Ltd</option>
              <option value="aristopharma">Aristopharma Ltd</option>
              <option value="drug-international">Drug International Ltd</option>
            </select>

            {/* Dosage Form Filter */}
            <select
              value={selectedDosageForm}
              onChange={e => { setSelectedDosageForm(e.target.value); setCurrentPage(1); }}
              className="drug-filter-select"
              aria-label="Filter by dosage form"
            >
              <option value="all">All Dosage Forms</option>
              {dosageFormsList.map(df => {
                const fName = df.form || df.name || '';
                return (
                  <option key={fName} value={fName}>
                    {fName} ({df.count})
                  </option>
                );
              })}
            </select>

            {/* Prescription Status Filter */}
            <select
              value={selectedPrescriptionStatus}
              onChange={e => { setSelectedPrescriptionStatus(e.target.value); setCurrentPage(1); }}
              className="drug-filter-select"
              aria-label="Filter by prescription status"
            >
              <option value="all">All Prescription Statuses</option>
              <option value="OTC">OTC (Over-The-Counter)</option>
              <option value="POM">Prescription Only (Rx / POM)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              {searchResponse?.pagination ? (
                <span>
                  {searchResponse.pagination.totalResults} records (Page {searchResponse.pagination.page} of {searchResponse.pagination.totalPages})
                </span>
              ) : null}
            </span>

            {/* View Mode Toggle: Compact List vs Cards */}
            <div className="drug-view-toggle">
              <button
                onClick={() => setViewMode('list')}
                className={`drug-view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                title="DIMS-style compact table list view"
              >
                <span>☰</span>
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`drug-view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
                title="Card grid view"
              >
                <span>▦</span>
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. MAIN CONTENT SECTION */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-sm">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
          <p>Searching verified Bangladesh drug database…</p>
        </div>
      ) : activeCategory === 'admin-import' ? (
        /* ADMIN INGESTION HUB */
        <div className="admin-ingestion-box space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Faculty & Admin Only
                </span>
                <span className="text-xs text-slate-400">Atomic Ingestion Pipeline</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Drug Database Ingestion & Audit Management</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Import drug records using RFC-compliant CSV, chunked JSON, Excel, or authenticated REST APIs. 250–500 record transactions with automatic deduplication.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadImportJobs}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                ↻ Refresh Jobs
              </button>
            </div>
          </div>

          {/* Import Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Adapter & Configuration */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>1.</span> Select Ingestion Source
              </h3>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Source Format / Adapter:</label>
                <select
                  value={selectedAdapter}
                  onChange={e => setSelectedAdapter(e.target.value as ImportAdapterType)}
                  className="w-full drug-filter-select text-xs"
                >
                  <option value="csv">CSV (Comma-Separated Values)</option>
                  <option value="json">JSON (Structured Records)</option>
                  <option value="excel">Excel (Tabular Export)</option>
                  <option value="rest">Authorized REST API (Bearer/Key)</option>
                  <option value="manual">Admin Manual Verification Entry</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Source Name / Attribution:</label>
                <input
                  type="text"
                  value={sourceNameInput}
                  onChange={e => setSourceNameInput(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  placeholder="e.g. DGDA Licensed Export 2025"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Licence / Provenance:</label>
                <input
                  type="text"
                  value={sourceLicenceInput}
                  onChange={e => setSourceLicenceInput(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  placeholder="e.g. Open Government License / DGDA Gazette"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Batch Size:</label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={batchSizeInput}
                    onChange={e => setBatchSizeInput(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dryRunInput}
                      onChange={e => setDryRunInput(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-blue-600"
                    />
                    <span>Dry-run mode</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Admin Passkey (Header):</label>
                <input
                  type="password"
                  value={adminKeyInput}
                  onChange={e => setAdminKeyInput(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  placeholder="x-admin-key secret"
                />
              </div>
            </div>

            {/* Column 2: Data Payload or REST Config */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-2">
                  <span>2.</span> Provide Data Payload or Endpoint
                </h3>

                {selectedAdapter === 'rest' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Authorized REST Endpoint URL:</label>
                      <input
                        type="url"
                        value={restEndpointInput}
                        onChange={e => setRestEndpointInput(e.target.value)}
                        placeholder="https://api.dghs.gov.bd/v1/drugs/authorized-export"
                        className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Authorization Token / API Key:</label>
                      <input
                        type="password"
                        value={restAuthTokenInput}
                        onChange={e => setRestAuthTokenInput(e.target.value)}
                        placeholder="Bearer token (kept strictly server-side)"
                        className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                      <strong>Server-Side Security Guarantee:</strong> REST credentials are sent directly to the Node.js backend ingestion daemon and never logged or exposed in client bundles.
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Paste {selectedAdapter.toUpperCase()} Data (or sample records):
                    </label>
                    <textarea
                      rows={8}
                      value={importPayloadInput}
                      onChange={e => setImportPayloadInput(e.target.value)}
                      placeholder={
                        selectedAdapter === 'csv'
                          ? 'brandName,genericName,strength,dosageForm,manufacturerName,unitPrice,prescriptionStatus\nNapa Extra,Paracetamol + Caffeine,500mg+65mg,Tablet,Beximco Pharmaceuticals Ltd,2.50,OTC'
                          : '[\n  {\n    "brandName": "Ace Plus",\n    "genericName": "Paracetamol + Caffeine",\n    "strength": "500 mg + 65 mg",\n    "dosageForm": "Tablet",\n    "manufacturerName": "Square Pharmaceuticals PLC",\n    "unitPrice": 2.50,\n    "prescriptionStatus": "OTC"\n  }\n]'
                      }
                      className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Launch & Status Area */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {importStatusMessage && (
                  <div className={`text-xs ${importStatusMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {importStatusMessage.text}
                  </div>
                )}

                <button
                  onClick={handleStartImport}
                  disabled={isImportRunning || (!importPayloadInput && !restEndpointInput)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs disabled:opacity-50 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 ml-auto"
                >
                  {isImportRunning ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Batch Pipeline…</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>Execute Ingestion Job</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Import Job History & Live Audit Queue */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📋</span> Ingestion Job History & Error Diagnostics ({importJobs.length})
            </h3>

            {importJobs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                No ingestion jobs have been run yet. Run a job above to test batch processing and atomic upserts.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-medium">
                      <th className="py-2 px-3">Job ID</th>
                      <th className="py-2 px-3">Source & Adapter</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-center">Added</th>
                      <th className="py-2 px-3 text-center">Updated</th>
                      <th className="py-2 px-3 text-center">Skipped</th>
                      <th className="py-2 px-3 text-center">Failed</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {importJobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-mono text-slate-300">
                          {job.id.substring(0, 16)}…
                        </td>
                        <td className="py-2 px-3">
                          <span className="font-semibold text-white capitalize">{job.adapterType}</span>
                          <span className="block text-[11px] text-slate-400">{job.sourceName}</span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            job.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : job.status === 'failed'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-emerald-400">{job.recordsInserted ?? job.inserted ?? 0}</td>
                        <td className="py-2 px-3 text-center font-bold text-blue-400">{job.recordsUpdated ?? job.updated ?? 0}</td>
                        <td className="py-2 px-3 text-center font-bold text-slate-400">{job.recordsSkipped ?? job.skipped ?? 0}</td>
                        <td className="py-2 px-3 text-center font-bold text-rose-400">{job.recordsFailed ?? job.failed ?? 0}</td>
                        <td className="py-2 px-3 text-right space-x-2">
                          {(job.recordsFailed ?? job.failed ?? 0) > 0 && (
                            <>
                              <button
                                onClick={() => handleDownloadErrorReport(job.id, 'csv')}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                                title="Download CSV Error Log"
                              >
                                Errors (CSV)
                              </button>
                              <button
                                onClick={() => handleRetryJob(job.id)}
                                className="px-2 py-1 rounded bg-amber-600/80 hover:bg-amber-500 text-white text-[11px] font-semibold"
                                title="Retry failed records"
                              >
                                Retry
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : activeCategory === 'guidelines' ? (
        /* Clinical Guidelines List */
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            National treatment guidelines published by the Directorate General of Health Services (DGHS) and international health authorities.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guidelines.map(gd => (
              <div key={gd.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base">{gd.title}</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Official Guideline
                  </span>
                </div>
                {gd.titleBn && <div className="text-xs text-sky-400 font-medium">{gd.titleBn}</div>}
                <div className="text-xs text-slate-300 leading-relaxed">{gd.summary}</div>
                <div className="p-2.5 rounded bg-slate-950/70 text-xs space-y-1">
                  <p><strong className="text-emerald-400">First-Line Generics:</strong> {gd.firstLineGenerics.join(', ')}</p>
                  {gd.contraindicatedGenerics?.length > 0 && (
                    <p><strong className="text-rose-400">Strictly Contraindicated:</strong> {gd.contraindicatedGenerics.join(', ')}</p>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
                  <span>Authority: {gd.issuingOrganization} ({gd.jurisdiction})</span>
                  <span>Date: {gd.publicationDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeCategory === 'investigations' ? (
        /* Clinical Investigations List */
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Clinical lab test directory connecting diagnostic reference ranges to pharmacological agents.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investigations.map(inv => (
              <div key={inv.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-base">{inv.name}</h3>
                  <span className="text-xs text-slate-400">{inv.specimen}</span>
                </div>
                {inv.nameBn && <div className="text-xs text-sky-400">{inv.nameBn}</div>}
                <div className="text-xs text-slate-300">{inv.purpose}</div>
                <div className="p-2.5 rounded bg-blue-950/30 border border-blue-500/20 text-xs">
                  <strong className="text-sky-300">Normal Reference:</strong> {inv.normalReference}
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Drugs Causing Elevation:</strong> {inv.drugsCausingElevation.join(', ') || 'None indexed'}
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Drugs Causing Reduction:</strong> {inv.drugsCausingReduction.join(', ') || 'None indexed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeCategory === 'saved' ? (
        /* Saved Bookmarks */
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Your saved generic monographs and Bangladesh brand products.
          </div>
          {bookmarks.generics.length === 0 && bookmarks.brands.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm bg-slate-900/40 rounded-xl border border-slate-800">
              No saved medicines yet. Click the "Bookmark" button on any generic or brand to save it here for quick revision.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {bookmarks.generics.map(id => {
                const gen = allGenericsList.find(g => g.id === id);
                return (
                  <div
                    key={id}
                    onClick={() => handleOpenGeneric(id)}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-wide">Generic Record</div>
                      <div className="font-bold text-white text-base capitalize">{gen ? gen.name : id}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark('generic', id);
                      }}
                      className="text-amber-400 text-lg hover:text-rose-400"
                    >
                      ★
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : activeCategory === 'offline' ? (
        /* Offline Saved Monographs */
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Medically reviewed generic monographs saved to your device for offline study without an active internet connection.
          </div>
          {offlineMonographs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm bg-slate-900/40 rounded-xl border border-slate-800">
              No offline copies downloaded yet. Click "Download" inside any generic monograph to make it available offline.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offlineMonographs.map(off => (
                <div key={off.genericId} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-white text-base">{off.genericName}</h3>
                    <span className="text-[11px] font-mono text-slate-400">v{off.contentVersion}</span>
                  </div>
                  {off.isOutdated && (
                    <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-semibold flex justify-between items-center">
                      <span>Newer version available (v{off.latestVersionAvailable})</span>
                      <button
                        onClick={() => handleOpenGeneric(off.genericId)}
                        className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-[10px]"
                      >
                        Update
                      </button>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>Downloaded: {new Date(off.downloadedAt).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenGeneric(off.genericId)}
                        className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold"
                      >
                        Read Monograph
                      </button>
                      <button
                        onClick={() => {
                          DrugClientService.removeOfflineMonograph(off.genericId);
                          setOfflineMonographs(DrugClientService.getOfflineMonographs());
                        }}
                        className="px-2 py-1 rounded bg-rose-950 text-rose-300 text-xs hover:bg-rose-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD MEDICINE SEARCH RESULTS (DIMS LIST VIEW OR CARD VIEW) */
        <div className="space-y-6">
          {/* BRANDS SECTION (Bangladesh Formulations) */}
          {searchResponse?.results.brands && searchResponse.results.brands.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🏷️</span> Bangladesh Brand Formulations ({searchResponse.results.brands.length})
                </h2>
                <span className="text-xs text-slate-400">
                  Click any brand to view complete DIMS-style clinical details & price
                </span>
              </div>

              {viewMode === 'list' ? (
                /* DIMS-INSPIRED CLEAN COMPACT TABLE LIST VIEW */
                <div className="drug-table-container">
                  <div className="overflow-x-auto">
                    <table className="drug-list-table">
                      <thead>
                        <tr>
                          <th>Brand Name</th>
                          <th>Generic Ingredient</th>
                          <th>Strength & Form</th>
                          <th>Manufacturer</th>
                          <th className="text-right">Price</th>
                          <th className="text-center">Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResponse.results.brands.map(brand => (
                          <tr
                            key={brand.id}
                            onClick={() => handleOpenBrandDetail(brand.slug || brand.id)}
                            className="hover:bg-blue-950/20"
                          >
                            <td>
                              <div className="font-bold text-white text-sm">
                                {brand.brandName}
                              </div>
                              {languageMode !== 'en' && brand.brandNameBn && (
                                <div className="text-[11px] text-sky-400 font-medium">{brand.brandNameBn}</div>
                              )}
                            </td>
                            <td>
                              <span className="capitalize text-slate-200 font-medium">
                                {brand.genericId.replace(/-/g, ' ')}
                              </span>
                            </td>
                            <td>
                              <span className="text-slate-300">{brand.strength}</span>
                              <span className="text-slate-400 text-xs block">{brand.dosageForm}</span>
                            </td>
                            <td>
                              <span className="text-slate-300 font-medium">{brand.manufacturerName}</span>
                            </td>
                            <td className="text-right font-bold text-emerald-400">
                              {brand.verifiedPrice?.amount ? `৳ ${brand.verifiedPrice.amount.toFixed(2)}` : '—'}
                            </td>
                            <td className="text-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                brand.prescriptionStatus === 'OTC' ? 'badge-otc' : 'badge-pom'
                              }`}>
                                {brand.prescriptionStatus || 'Rx'}
                              </span>
                            </td>
                            <td className="text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenBrandDetail(brand.slug || brand.id);
                                }}
                                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition"
                              >
                                View Details →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* CARD GRID VIEW */
                <div className="drug-grid-layout">
                  {searchResponse.results.brands.map(brand => (
                    <div
                      key={brand.id}
                      onClick={() => handleOpenBrandDetail(brand.slug || brand.id)}
                      className="brand-card-item"
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && handleOpenBrandDetail(brand.slug || brand.id)}
                    >
                      <div>
                        <div className="flex justify-between items-baseline">
                          <div className="brand-card-name">{brand.brandName}</div>
                          <div className="brand-card-strength">{brand.strength}</div>
                        </div>
                        {languageMode !== 'en' && brand.brandNameBn && (
                          <div className="text-xs text-sky-400">{brand.brandNameBn}</div>
                        )}
                        <div className="text-xs text-slate-400 mt-1">Form: {brand.dosageForm}</div>
                        <div className="brand-card-manufacturer">🏢 {brand.manufacturerName}</div>
                      </div>

                      <div className="brand-card-generic-link justify-between">
                        <div>
                          <span>Generic:</span>
                          <strong className="text-white capitalize ml-1">{brand.genericId.replace(/-/g, ' ')}</strong>
                        </div>
                        {brand.verifiedPrice?.amount && (
                          <span className="text-emerald-400 font-bold text-xs">
                            ৳ {brand.verifiedPrice.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GENERICS SECTION */}
          {searchResponse?.results.generics && searchResponse.results.generics.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>💊</span> Generic Clinical Monographs ({searchResponse.results.generics.length})
              </h2>
              <div className="drug-grid-layout">
                {searchResponse.results.generics.map(gen => (
                  <div
                    key={gen.id}
                    onClick={() => handleOpenGeneric(gen.id)}
                    className="generic-card-item"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && handleOpenGeneric(gen.id)}
                  >
                    <div>
                      <div className="generic-card-header">
                        <div>
                          <div className="generic-card-name">{gen.name}</div>
                          {languageMode !== 'en' && gen.nameBn && (
                            <div className="generic-card-name-bn">{gen.nameBn}</div>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                            gen.prescriptionStatus === 'POM'
                              ? 'badge-pom'
                              : gen.prescriptionStatus === 'OTC'
                              ? 'badge-otc'
                              : 'badge-schedule-g'
                          }`}
                        >
                          {gen.prescriptionStatus}
                        </span>
                      </div>

                      <div className="generic-card-class">{gen.pharmacologicalClass}</div>

                      <div className="generic-card-indications">
                        <strong>Indications:</strong> {gen.indications.map(i => i.name).join(', ')}
                      </div>
                    </div>

                    <div className="generic-card-footer">
                      <span>ATC: {gen.atcCode || 'N/A'}</span>
                      <span className="text-sky-400 font-semibold flex items-center gap-1">
                        Read Monograph →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {searchResponse &&
            searchResponse.results.generics.length === 0 &&
            searchResponse.results.brands.length === 0 && (
              <div className="p-16 text-center text-slate-400 text-sm bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-3xl mb-2">🔍</div>
                <div className="text-base font-bold text-white mb-1">No matching medicine found</div>
                <p className="text-xs max-w-md mx-auto leading-relaxed">
                  No verified Bangladesh generic or brand matched "{query}". Try checking for spelling variations, choosing a letter from the A–Z bar, or searching by pharmacological class (e.g., "diuretic", "beta blocker", "macrolide").
                </p>
              </div>
            )}
        </div>
      )}

      {/* 10. PAGINATION CONTROLS */}
      {searchResponse?.pagination && searchResponse.pagination.totalPages > 1 && activeCategory !== 'admin-import' && (
        <div className="drug-pagination-bar">
          <button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(prev => Math.max(1, prev - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="pagination-btn"
          >
            ← Previous
          </button>
          <span className="text-xs text-slate-400 font-medium">
            Page {currentPage} of {searchResponse.pagination.totalPages}
          </span>
          <button
            disabled={currentPage >= searchResponse.pagination.totalPages}
            onClick={() => {
              setCurrentPage(prev => Math.min(searchResponse.pagination.totalPages, prev + 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

          </div>
        )}
      </div>

      {/* 11. MODALS */}
      {/* Generic Monograph Modal */}
      {activeGeneric && (
        <GenericMonographView
          generic={activeGeneric}
          brands={genericBrands}
          onClose={() => setActiveGeneric(null)}
          onOpenBrand={(b) => {
            setActiveGeneric(null);
            handleOpenBrandDetail(b.slug || b.id);
          }}
          onOpenStudyMode={(g) => {
            setActiveGeneric(null);
            setStudyGeneric(g);
          }}
          onOpenCompareWith={(gId) => {
            setActiveGeneric(null);
            handleOpenCompare([gId, 'enalapril']);
          }}
          onOpenAcrossBooksTopic={onOpenAcrossBooksTopic}
          onReportCorrection={(gId) => {
            setGovernanceInitialDrugId(gId);
            setIsGovernanceModalOpen(true);
          }}
          isBookmarked={bookmarks.generics.includes(activeGeneric.id)}
          onToggleBookmark={() => handleToggleBookmark('generic', activeGeneric.id)}
          isOfflineSaved={DrugClientService.isMonographSavedOffline(activeGeneric.id)}
          onToggleOffline={() => handleToggleOffline(activeGeneric, genericBrands)}
        />
      )}

      {/* Brand Monograph Modal (legacy popup if triggered) */}
      {activeBrandModal && (
        <BrandMonographView
          brand={activeBrandModal}
          onOpenGeneric={(gId) => {
            setActiveBrandModal(null);
            handleOpenGeneric(gId);
          }}
          onClose={() => setActiveBrandModal(null)}
          isBookmarked={bookmarks.brands.includes(activeBrandModal.id)}
          onToggleBookmark={() => handleToggleBookmark('brand', activeBrandModal.id)}
        />
      )}

      {/* Multi-Drug Interaction Checker Modal */}
      {isInteractionModalOpen && (
        <InteractionCheckerModal
          allGenerics={searchResponse?.results.generics || []}
          onClose={() => setIsInteractionModalOpen(false)}
          onOpenGeneric={handleOpenGeneric}
        />
      )}

      {/* Drug Comparison Modal */}
      {isCompareModalOpen && (
        <DrugComparisonModal
          initialGenericIds={compareInitialIds}
          allGenerics={searchResponse?.results.generics || []}
          onClose={() => setIsCompareModalOpen(false)}
          onOpenGeneric={handleOpenGeneric}
        />
      )}

      {/* Pharmacology Study Workspace Modal */}
      {studyGeneric && (
        <PharmacologyStudyWorkspace
          generic={studyGeneric}
          onClose={() => setStudyGeneric(null)}
          onOpenAcrossBooksTopic={onOpenAcrossBooksTopic}
        />
      )}

      {/* Medical Governance & Correction Reporting Modal */}
      {isGovernanceModalOpen && (
        <DrugAdminGovernanceModal
          initialDrugId={governanceInitialDrugId}
          onClose={() => setIsGovernanceModalOpen(false)}
        />
      )}
    </div>
  );
};
