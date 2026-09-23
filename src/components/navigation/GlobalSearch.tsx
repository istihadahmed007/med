import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  BookOpen,
  Pill,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  Stethoscope,
  Layers,
  Bookmark,
  Plus,
  Trash2
} from 'lucide-react';
import { searchStudyMaterials } from '../../data/studyMaterialsData';
import { StudyService } from '../../services/studyService';
import { StaticDrugDbService } from '../../services/staticDrugDbService';
import { CLINICAL_CASES } from '../../data/clinicalCasesData';
import { ANATOMICAL_STRUCTURES } from '../../data/anatomyData';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'topic' | 'generic' | 'brand' | 'manufacturer' | 'case' | 'anatomy';
  slug?: string;
  genericId?: string;
  badge?: string;
}

interface GroupedResults {
  topics: SearchResult[];
  anatomy: SearchResult[];
  cases: SearchResult[];
  generics: SearchResult[];
  brands: SearchResult[];
  manufacturers: SearchResult[];
}

const CATEGORY_CONFIG = {
  topics: { label: 'Curriculum Topics', icon: BookOpen, color: '#08AFC1' },
  anatomy: { label: '3D Anatomy & Structures', icon: Layers, color: '#06b6d4' },
  cases: { label: 'Clinical Cases & Symptoms', icon: Stethoscope, color: '#ec4899' },
  generics: { label: 'Generics (INN)', icon: Pill, color: '#10b981' },
  brands: { label: 'Medicine Brands', icon: Pill, color: '#f59e0b' },
  manufacturers: { label: 'Pharmaceutical Companies', icon: Building2, color: '#8b5cf6' },
} as const;

const STORAGE_KEY_SAVED_SEARCHES = 'medx_saved_searches';

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResults>({
    topics: [],
    anatomy: [],
    cases: [],
    generics: [],
    brands: [],
    manufacturers: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load recent & saved searches on open
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(StudyService.getRecentSearches());
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SAVED_SEARCHES);
        if (saved) setSavedSearches(JSON.parse(saved));
        else setSavedSearches([]);
      } catch {
        setSavedSearches([]);
      }
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setResults({
        topics: [],
        anatomy: [],
        cases: [],
        generics: [],
        brands: [],
        manufacturers: [],
      });
    }
  }, [isOpen]);

  // Keyboard shortcut listener (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSaveSearch = (textToSave: string) => {
    if (!textToSave.trim() || savedSearches.includes(textToSave)) return;
    const updated = [textToSave, ...savedSearches].slice(0, 10);
    setSavedSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_SEARCHES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save search:', err);
    }
  };

  const handleRemoveSavedSearch = (textToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedSearches.filter(s => s !== textToRemove);
    setSavedSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_SEARCHES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not remove saved search:', err);
    }
  };

  const performSearch = useCallback(async (q: string) => {
    const lowerQ = q.trim().toLowerCase();
    if (lowerQ.length < 2) {
      setResults({
        topics: [],
        anatomy: [],
        cases: [],
        generics: [],
        brands: [],
        manufacturers: [],
      });
      return;
    }

    setIsLoading(true);

    // 1. Search study materials & curriculum topics
    const studyResults = searchStudyMaterials(lowerQ, 6);
    const topics: SearchResult[] = studyResults.map(r => ({
      id: r.id,
      title: r.title,
      subtitle: r.subtitle,
      type: 'topic',
      slug: r.slug,
    }));

    // 2. Search Anatomical Structures & Symptoms
    const matchedAnatomy = ANATOMICAL_STRUCTURES.filter(a => {
      const matchName = a.name.toLowerCase().includes(lowerQ) || (a.latinName && a.latinName.toLowerCase().includes(lowerQ));
      const matchSystem = a.system.toLowerCase().includes(lowerQ) || a.category.toLowerCase().includes(lowerQ);
      const matchSymptoms = a.clinicalConnections?.symptoms?.some(s => s.toLowerCase().includes(lowerQ));
      const matchConditions = a.commonConditions?.some(c => c.toLowerCase().includes(lowerQ));
      return matchName || matchSystem || matchSymptoms || matchConditions;
    }).slice(0, 5).map(a => ({
      id: a.id,
      title: a.name,
      subtitle: `${a.latinName || a.category} • ${a.system.toUpperCase()}`,
      type: 'anatomy' as const,
      badge: a.clinicalImportance ? 'Clinical High-Yield' : undefined,
    }));

    // 3. Search Clinical Cases
    const matchedCases = CLINICAL_CASES.filter(c => {
      const matchTitle = c.title.toLowerCase().includes(lowerQ);
      const matchComplaint = c.chiefComplaint.toLowerCase().includes(lowerQ);
      const matchSystem = c.system.toLowerCase().includes(lowerQ);
      return matchTitle || matchComplaint || matchSystem;
    }).slice(0, 5).map(c => ({
      id: c.id,
      title: c.title,
      subtitle: `Chief Complaint: ${c.chiefComplaint.slice(0, 80)}...`,
      type: 'case' as const,
      badge: c.difficulty,
    }));

    // 4. Search Drug Database (API call with static fallback)
    let apiResults = { generics: [] as SearchResult[], brands: [] as SearchResult[], manufacturers: [] as SearchResult[] };
    try {
      const res = await fetch(`/api/search/global?q=${encodeURIComponent(lowerQ)}&limit=6`);
      if (res.ok) {
        const data = await res.json();
        apiResults = data.results || apiResults;
      } else {
        const staticResults = await StaticDrugDbService.globalSearch(lowerQ, 6);
        apiResults = { generics: staticResults.generics as any, brands: staticResults.brands as any, manufacturers: staticResults.manufacturers as any };
      }
    } catch {
      const staticResults = await StaticDrugDbService.globalSearch(lowerQ, 6);
      apiResults = { generics: staticResults.generics as any, brands: staticResults.brands as any, manufacturers: staticResults.manufacturers as any };
    }

    setResults({
      topics,
      anatomy: matchedAnatomy,
      cases: matchedCases,
      generics: apiResults.generics || [],
      brands: apiResults.brands || [],
      manufacturers: apiResults.manufacturers || [],
    });

    setIsLoading(false);
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(val), 250);
  };

  const handleResultClick = (result: SearchResult) => {
    StudyService.addRecentSearch(query);

    switch (result.type) {
      case 'topic':
        if (result.slug) {
          window.location.hash = `study-materials/${result.slug}`;
        } else {
          window.location.hash = 'learn';
        }
        break;
      case 'anatomy':
        window.location.hash = 'visual-lab';
        break;
      case 'case':
        window.location.hash = 'cases';
        break;
      case 'generic':
        window.location.hash = `drug-reference?q=${encodeURIComponent(result.title)}&tab=generics`;
        break;
      case 'brand':
        window.location.hash = `drug-reference?brand=${encodeURIComponent(result.id)}`;
        break;
      case 'manufacturer':
        window.location.hash = `drug-reference?tab=manufacturers&mfg=${encodeURIComponent(result.id)}`;
        break;
    }

    onClose();
  };

  const handleSelectPredefined = (text: string) => {
    setQuery(text);
    performSearch(text);
  };

  const totalResults = results.topics.length + results.anatomy.length + results.cases.length +
    results.generics.length + results.brands.length + results.manufacturers.length;

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Global Medical Search"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] sm:pt-[10vh] px-3 pointer-events-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#040D21]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#07172E] border border-[rgba(190,225,255,0.22)] rounded-[24px] shadow-[0_24px_64px_rgba(0,0,0,0.65)] overflow-hidden animate-fadeIn z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(190,225,255,0.14)] bg-[rgba(10,36,74,0.40)]">
          <Search className="w-5 h-5 text-[#08AFC1] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Search topics, medicines, cases, or anatomy"
            placeholder="Search topics, medicines, cases, or anatomy…"
            value={query}
            onChange={handleQueryChange}
            className="flex-1 bg-transparent text-[#F5F9FF] placeholder-[#8eaecf] text-sm sm:text-base font-sans outline-none focus:ring-0"
          />

          {query && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSaveSearch(query)}
                title="Save this search"
                aria-label="Save this search query"
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#8eaecf] hover:text-[#08AFC1] transition-colors"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => { 
                  setQuery(''); 
                  setResults({ topics: [], anatomy: [], cases: [], generics: [], brands: [], manufacturers: [] }); 
                }}
                aria-label="Clear search input"
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#8eaecf] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <kbd className="hidden sm:inline-flex text-[10px] font-mono text-[#8eaecf] bg-white/5 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results / Suggestions Scrollable Container */}
        <div className="flex-1 overflow-y-auto py-2">
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="px-5 py-8 text-center text-[#8eaecf] text-sm font-sans flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#08AFC1]" />
              <span>Searching across medical taxonomy...</span>
            </div>
          )}

          {/* Empty Query State: Recent Searches & Saved Searches */}
          {!isLoading && query.length < 2 && (
            <div className="px-5 py-4 space-y-6">
              
              {/* Saved Searches */}
              {savedSearches.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#08AFC1] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" />
                      Saved Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {savedSearches.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectPredefined(s)}
                        role="button"
                        tabIndex={0}
                        className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-[rgba(8,175,193,0.15)] border border-[rgba(8,175,193,0.35)] text-xs text-[#F5F9FF] hover:bg-[#08AFC1]/25 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                      >
                        <span className="font-medium">{s}</span>
                        <button
                          onClick={(e) => handleRemoveSavedSearch(s, e)}
                          title="Remove saved search"
                          aria-label={`Remove saved search ${s}`}
                          className="text-[#8eaecf] hover:text-rose-400 p-1 rounded-md min-w-[28px] min-h-[28px] flex items-center justify-center transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#8eaecf] font-bold">
                    Recent Searches
                  </p>
                  <div className="space-y-1">
                    {recentSearches.slice(0, 5).map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectPredefined(s)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl hover:bg-white/5 text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                      >
                        <span className="flex items-center gap-3 text-sm text-[#C4D4EA] group-hover:text-white font-medium">
                          <Clock className="w-4 h-4 text-[#08AFC1] shrink-0" />
                          <span>{s}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick suggestion categories */}
              <div className="pt-3 border-t border-white/5">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#8eaecf] font-bold mb-2.5">
                  Suggested Medical Categories
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Left Ventricle', icon: Layers, query: 'left ventricle' },
                    { label: 'Acute STEMI', icon: Stethoscope, query: 'stemi' },
                    { label: 'Wiggers Diagram', icon: BookOpen, query: 'cardiac cycle' },
                    { label: 'Atorvastatin', icon: Pill, query: 'atorvastatin' },
                    { label: 'Paracetamol', icon: Pill, query: 'paracetamol' },
                    { label: 'Coronary Arteries', icon: Layers, query: 'coronary' },
                  ].map((sug, idx) => {
                    const SugIcon = sug.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectPredefined(sug.query)}
                        className="flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-[#C4D4EA] hover:text-[#F5F9FF] border border-white/5 transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                      >
                        <SugIcon className="w-4 h-4 text-[#08AFC1] shrink-0" />
                        <span className="font-medium truncate">{sug.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* No Results Found */}
          {!isLoading && query.length >= 2 && totalResults === 0 && (
            <div className="px-5 py-12 text-center space-y-2">
              <p className="text-base font-semibold text-[#F5F9FF]">
                No medical results found for "<span className="text-[#08AFC1]">{query}</span>"
              </p>
              <p className="text-sm text-[#8eaecf] max-w-md mx-auto">
                Try searching for organ names, generic medicines, clinical symptoms, or BMDC exam topics.
              </p>
            </div>
          )}

          {/* Grouped Results Display */}
          {!isLoading && totalResults > 0 && (
            <div className="divide-y divide-white/5">
              {(Object.entries(CATEGORY_CONFIG) as [keyof GroupedResults, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, config]) => {
                const items = results[key];
                if (!items || items.length === 0) return null;
                const Icon = config.icon;

                return (
                  <div key={key} className="py-2.5">
                    <div className="px-5 py-1.5 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: config.color }}>
                        {config.label}
                      </span>
                      <span className="text-[10px] text-[#8eaecf] font-mono">({items.length})</span>
                    </div>

                    <div className="space-y-0.5 mt-1">
                      {items.map(item => (
                        <button
                          key={`${key}-${item.id}`}
                          onClick={() => handleResultClick(item)}
                          className="w-full flex items-center justify-between px-5 py-3 min-h-[48px] hover:bg-white/10 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08AFC1]"
                        >
                          <div className="text-left min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm sm:text-base text-[#F5F9FF] group-hover:text-[#08AFC1] transition-colors truncate font-sans font-semibold">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-amber-300">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-xs text-[#8eaecf] truncate mt-0.5">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#08AFC1] shrink-0 ml-2 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Keyboard Accessible Footer */}
        <div className="px-5 py-2.5 border-t border-[rgba(190,225,255,0.10)] bg-[rgba(6,23,46,0.60)] flex items-center justify-between text-[11px] text-[#8eaecf] font-mono">
          <span>{totalResults > 0 ? `${totalResults} medical entries found` : 'Indexed 21,000+ records'}</span>
          <div className="flex items-center gap-3">
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>

      </div>
    </div>
  );
};
