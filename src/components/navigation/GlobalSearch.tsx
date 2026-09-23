import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  Pill,
  Building2,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import { searchStudyMaterials } from '../../data/studyMaterialsData';
import { StudyService } from '../../services/studyService';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'topic' | 'generic' | 'brand' | 'manufacturer' | 'subject';
  slug?: string;
  genericId?: string;
}

interface GroupedResults {
  topics: SearchResult[];
  generics: SearchResult[];
  brands: SearchResult[];
  manufacturers: SearchResult[];
}

const CATEGORY_CONFIG = {
  topics: { label: 'Study Materials', icon: BookOpen, color: '#08AFC1' },
  generics: { label: 'Generics (INN)', icon: Pill, color: '#10b981' },
  brands: { label: 'Brands', icon: Stethoscope, color: '#f59e0b' },
  manufacturers: { label: 'Companies', icon: Building2, color: '#8b5cf6' },
} as const;

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResults>({ topics: [], generics: [], brands: [], manufacturers: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(StudyService.getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults({ topics: [], generics: [], brands: [], manufacturers: [] });
    }
  }, [isOpen]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const performSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults({ topics: [], generics: [], brands: [], manufacturers: [] });
      return;
    }

    setIsLoading(true);

    // Search study materials (client-side, instant)
    const studyResults = searchStudyMaterials(q, 10);
    const topics: SearchResult[] = studyResults.map(r => ({
      id: r.id,
      title: r.title,
      subtitle: r.subtitle,
      type: r.type === 'subject' ? 'subject' as const : 'topic' as const,
      slug: r.slug,
    }));

    // Search drug database (API call)
    let apiResults: GroupedResults = { topics: [], generics: [], brands: [], manufacturers: [] };
    try {
      const res = await fetch(`/api/search/global?q=${encodeURIComponent(q)}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        apiResults = data.results || apiResults;
      }
    } catch {
      // API not available, continue with client-side results only
    }

    setResults({
      topics,
      generics: (apiResults.generics || []),
      brands: (apiResults.brands || []),
      manufacturers: (apiResults.manufacturers || []),
    });

    setIsLoading(false);
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(val), 300);
  };

  const handleResultClick = (result: SearchResult) => {
    StudyService.addRecentSearch(query);

    switch (result.type) {
      case 'topic':
      case 'subject':
        if (result.slug) {
          window.location.hash = `study-materials/${result.slug}`;
        }
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

  const handleRecentClick = (search: string) => {
    setQuery(search);
    performSearch(search);
  };

  const totalResults = results.topics.length + results.generics.length +
    results.brands.length + results.manufacturers.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#0f172a] border border-[rgba(148,163,184,0.15)] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(148,163,184,0.1)]">
          <Search className="w-5 h-5 text-[#64748b] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search medicines, topics, subjects..."
            value={query}
            onChange={handleQueryChange}
            className="flex-1 bg-transparent text-[#e2e8f0] placeholder-[#64748b] text-base font-sans outline-none"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults({ topics: [], generics: [], brands: [], manufacturers: [] }); }}
              className="p-1 rounded-lg hover:bg-white/5 text-[#64748b] hover:text-[#e2e8f0] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex text-[10px] font-mono text-[#475569] bg-white/5 px-1.5 py-0.5 rounded border border-[rgba(148,163,184,0.1)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {/* Loading */}
          {isLoading && (
            <div className="px-5 py-6 text-center text-[#64748b] text-sm font-sans">
              <Sparkles className="w-4 h-4 animate-spin inline-block mr-2" />
              Searching...
            </div>
          )}

          {/* Empty state with recent searches */}
          {!isLoading && query.length < 2 && (
            <div className="px-5 py-4">
              {recentSearches.length > 0 && (
                <>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] font-bold mb-2">
                    Recent Searches
                  </p>
                  <div className="space-y-0.5">
                    {recentSearches.slice(0, 5).map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentClick(s)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 text-left transition-colors group"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#475569]" />
                        <span className="text-sm text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors">{s}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {recentSearches.length === 0 && (
                <p className="text-sm text-[#64748b] text-center py-4 font-sans">
                  Search across {' '}
                  <span className="text-[#38bdf8]">study materials</span>,{' '}
                  <span className="text-[#10b981]">medicines</span>,{' '}
                  <span className="text-[#f59e0b]">brands</span>, and{' '}
                  <span className="text-[#8b5cf6]">companies</span>
                </p>
              )}
            </div>
          )}

          {/* No results */}
          {!isLoading && query.length >= 2 && totalResults === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-[#64748b] font-sans">
                No results found for "<span className="text-[#e2e8f0]">{query}</span>"
              </p>
              <p className="text-xs text-[#475569] mt-1">
                Try different keywords or check the spelling
              </p>
            </div>
          )}

          {/* Grouped Results */}
          {!isLoading && totalResults > 0 && (
            <div>
              {(Object.entries(CATEGORY_CONFIG) as [keyof GroupedResults, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, config]) => {
                const items = results[key];
                if (!items || items.length === 0) return null;
                const Icon = config.icon;

                return (
                  <div key={key} className="mb-1">
                    <div className="px-5 py-1.5 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: config.color }}>
                        {config.label}
                      </span>
                      <span className="text-[10px] text-[#475569] font-mono">({items.length})</span>
                    </div>
                    {items.map(item => (
                      <button
                        key={`${key}-${item.id}`}
                        onClick={() => handleResultClick(item)}
                        className="w-full flex items-center justify-between px-5 py-2.5 hover:bg-white/[0.04] transition-colors group"
                      >
                        <div className="text-left min-w-0">
                          <p className="text-sm text-[#e2e8f0] group-hover:text-[#38bdf8] transition-colors truncate font-sans font-medium">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-xs text-[#64748b] truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#38bdf8] shrink-0 ml-2 transition-colors" />
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[rgba(148,163,184,0.08)] flex items-center justify-between">
          <span className="text-[10px] text-[#475569] font-mono">
            {totalResults > 0 ? `${totalResults} results` : 'Type to search'}
          </span>
          <div className="flex items-center gap-3 text-[10px] text-[#475569] font-mono">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
