import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Search, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  Lock, 
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ImportJob, ImportJobType } from '../../types/textbook';
import { FrontendTextbookService } from '../../services/textbookService';

interface Props {
  onClose: () => void;
  onImportComplete?: () => void;
}

type ModalTab = 'fetch-metadata' | 'file-upload' | 'url-import' | 'jobs';

export const TextbookImportModal: React.FC<Props> = ({ onClose, onImportComplete }) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('fetch-metadata');

  // Metadata Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searchError, setSearchError] = useState('');

  // File Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState('');
  const [isPrivateUpload, setIsPrivateUpload] = useState(true);
  const [fileValidationErr, setFileValidationErr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL Import state
  const [sourceUrl, setSourceUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlError, setUrlError] = useState('');

  // Jobs state
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [retryingJobId, setRetryingJobId] = useState<string | null>(null);

  // Load jobs when switching to jobs tab
  useEffect(() => {
    if (activeTab === 'jobs') {
      loadJobs();
    }
  }, [activeTab]);

  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const data = await FrontendTextbookService.getImportJobs();
      setJobs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // 1. Search Online Metadata (Open Library / Authoritative)
  const handleSearchMetadata = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');
    try {
      const data = await FrontendTextbookService.fetchOnlineMetadata(searchQuery.trim());
      setSearchResults(data);
    } catch (err: any) {
      setSearchError(err.message || 'Failed to fetch online metadata.');
    } finally {
      setIsSearching(false);
    }
  };

  // 2. Submit File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileValidationErr('');
    if (!file) return;

    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      setFileValidationErr(`File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds 50MB maximum limit.`);
      setSelectedFile(null);
      return;
    }

    const validExts = ['.pdf', '.epub', '.txt', '.md'];
    const hasValidExt = validExts.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setFileValidationErr('Only PDF, EPUB, TXT, and Markdown files are supported.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    if (!fileTitle) {
      setFileTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  const handleSubmitFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    setFileValidationErr('');
    try {
      await FrontendTextbookService.submitImportJob({
        type: 'file_upload',
        targetTitle: fileTitle || selectedFile.name,
        fileName: selectedFile.name,
        fileSizeBytes: selectedFile.size,
        mimeType: selectedFile.type,
        isPrivateUpload
      });
      setActiveTab('jobs');
      if (onImportComplete) onImportComplete();
    } catch (err: any) {
      setFileValidationErr(err.message || 'Upload failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Submit URL Import
  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrl.trim()) return;

    // Client-side SSRF heuristic check
    const trimmed = sourceUrl.trim();
    if (
      trimmed.includes('localhost') ||
      trimmed.includes('127.0.0.1') ||
      trimmed.includes('169.254.') ||
      trimmed.includes('192.168.') ||
      trimmed.includes('10.') ||
      trimmed.startsWith('file:')
    ) {
      setUrlError('SSRF blocked: Requests to private networks, loopbacks, or cloud metadata IPs are strictly forbidden.');
      return;
    }

    setIsSubmitting(true);
    setUrlError('');
    try {
      await FrontendTextbookService.submitImportJob({
        type: 'url_import',
        targetTitle: urlTitle || 'Web Imported Reference Document',
        sourceUrl: trimmed,
        isPrivateUpload
      });
      setActiveTab('jobs');
      if (onImportComplete) onImportComplete();
    } catch (err: any) {
      setUrlError(err.message || 'URL import failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Retry Failed Job
  const handleRetryJob = async (jobId: string) => {
    setRetryingJobId(jobId);
    try {
      await FrontendTextbookService.retryImportJob(jobId);
      await loadJobs();
    } catch (err: any) {
      alert(err.message || 'Retry failed');
    } finally {
      setRetryingJobId(null);
    }
  };

  return (
    <div className="tb-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="tb-modal-panel max-w-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Textbook & Content Import Engine</h2>
              <p className="text-xs text-slate-400">Verified server pipeline for MBBS library & personal study materials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 pt-3 pb-4 border-b border-white/10 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('fetch-metadata')}
            className={`tb-pill-tab ${activeTab === 'fetch-metadata' ? 'active' : ''}`}
          >
            <Search className="w-3.5 h-3.5 inline mr-1" />
            Fetch Metadata
          </button>
          <button
            onClick={() => setActiveTab('file-upload')}
            className={`tb-pill-tab ${activeTab === 'file-upload' ? 'active' : ''}`}
          >
            <Upload className="w-3.5 h-3.5 inline mr-1" />
            Upload Document
          </button>
          <button
            onClick={() => setActiveTab('url-import')}
            className={`tb-pill-tab ${activeTab === 'url-import' ? 'active' : ''}`}
          >
            <Globe className="w-3.5 h-3.5 inline mr-1" />
            URL Import (SSRF Safe)
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`tb-pill-tab ${activeTab === 'jobs' ? 'active' : ''}`}
          >
            <Clock className="w-3.5 h-3.5 inline mr-1" />
            Import Jobs ({jobs.length})
          </button>
        </div>

        {/* Tab 1: Fetch Metadata */}
        {activeTab === 'fetch-metadata' && (
          <div className="py-3 space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-300 leading-relaxed">
              Search the Open Library and authoritative catalog by book title or ISBN-13. Verified records include real editions, authors, and publisher source links.
            </p>

            <form onSubmit={handleSearchMetadata} className="flex gap-2">
              <div className="tb-search-box flex-1">
                <Search className="w-4 h-4 tb-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g., Guyton and Hall, Snell Clinical Anatomy, 978-0323597128..."
                  className="tb-search-input text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="tb-btn-primary text-xs shrink-0 disabled:opacity-40"
              >
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
              </button>
            </form>

            {searchError && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {searchResults && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Source: <strong className="text-cyan-300">{searchResults.source}</strong></span>
                  <span>{searchResults.results?.length || 0} verified records found</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {searchResults.results?.map((res: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{res.title}</span>
                          {res.isCatalogued && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                              In MEDX
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400">
                          {res.authors?.join(', ')} • {res.edition} ({res.publicationYear})
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span>{res.publisher}</span>
                          {res.isbn13 && (
                            <>
                              <span>•</span>
                              <span className="font-mono text-cyan-400">ISBN: {res.isbn13}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {res.sourceUrl && (
                        <a
                          href={res.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tb-btn-secondary text-[11px] shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Safe File Upload */}
        {activeTab === 'file-upload' && (
          <form onSubmit={handleSubmitFile} className="py-3 space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Secure Document Validation
              </span>
              <p>Supported: <strong>PDF, EPUB, TXT, Markdown</strong> up to <strong>50MB</strong>. Scanned files undergo automated OCR with low-confidence flagging.</p>
            </div>

            {/* File Dropzone */}
            <div className="border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-xl p-6 text-center cursor-pointer transition-colors bg-white/[0.01]">
              <input
                type="file"
                id="tb-file-input"
                accept=".pdf,.epub,.txt,.md"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="tb-file-input" className="cursor-pointer block space-y-2">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                {selectedFile ? (
                  <div className="text-xs">
                    <p className="font-bold text-white">{selectedFile.name}</p>
                    <p className="text-slate-400 mt-0.5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200">Click to browse or drop file here</p>
                    <p className="text-slate-500 mt-0.5">PDF or EPUB (Max 50MB)</p>
                  </div>
                )}
              </label>
            </div>

            {fileValidationErr && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> {fileValidationErr}
              </p>
            )}

            {/* Document Title */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={fileTitle}
                onChange={e => setFileTitle(e.target.value)}
                placeholder="e.g., Clinical Surgery Notes — DMC Ward 12"
                className="tb-search-input text-xs !pl-3"
                required
              />
            </div>

            {/* Privacy Checkbox (Strict requirement: Personal uploads stay private!) */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <input
                type="checkbox"
                id="tb-private-check"
                checked={isPrivateUpload}
                onChange={e => setIsPrivateUpload(e.target.checked)}
                className="mt-0.5 rounded border-white/20 text-cyan-500 focus:ring-0"
              />
              <label htmlFor="tb-private-check" className="text-xs cursor-pointer">
                <span className="font-bold text-white flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-purple-400" /> Keep this upload strictly private to my account
                </span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Private files are visible only to you. They will never be shared into the public MBBS textbook catalog without faculty review and copyright clearance.
                </p>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedFile}
              className="tb-btn-primary w-full text-xs !py-2.5 disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Validating & Queueing Job...
                </>
              ) : (
                'Start Document Import'
              )}
            </button>
          </form>
        )}

        {/* Tab 3: SSRF-Protected URL Import */}
        {activeTab === 'url-import' && (
          <form onSubmit={handleSubmitUrl} className="py-3 space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> SSRF & Private Network Protection
              </span>
              <p>URL imports are strictly validated against private IP networks, loopbacks (127.0.0.1), and cloud metadata endpoints. Only public HTTPS/HTTP academic links are permitted.</p>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Document URL (Public HTTPS)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
                placeholder="https://example.org/medical-guidelines/clinical-protocol.pdf"
                className="tb-search-input text-xs !pl-3"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Display Title
              </label>
              <input
                type="text"
                value={urlTitle}
                onChange={e => setUrlTitle(e.target.value)}
                placeholder="e.g., National Rabies Prophylaxis Protocol"
                className="tb-search-input text-xs !pl-3"
                required
              />
            </div>

            {urlError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> {urlError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !sourceUrl.trim()}
              className="tb-btn-primary w-full text-xs !py-2.5 disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Network Safety...
                </>
              ) : (
                'Import from URL'
              )}
            </button>
          </form>
        )}

        {/* Tab 4: Live Jobs Queue */}
        {activeTab === 'jobs' && (
          <div className="py-3 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Server Import Queue Status</span>
              <button
                onClick={loadJobs}
                className="tb-btn-link text-xs flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingJobs ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No active or historical import jobs yet.
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {jobs.map(job => (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{job.targetTitle}</span>
                          {job.isPrivateUpload && (
                            <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                              Private
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Type: <strong>{job.type}</strong> • Created: {new Date(job.createdAt).toLocaleTimeString()}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        job.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        job.status === 'processing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' :
                        job.status === 'awaiting_review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        job.status === 'failed' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        'bg-slate-500/20 text-slate-300'
                      }`}>
                        {job.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Failure details & retry button */}
                    {job.status === 'failed' && (
                      <div className="p-2 rounded bg-rose-950/30 border border-rose-500/20 text-rose-300 text-[11px] flex items-center justify-between gap-2">
                        <span>{job.failureReason || 'Import failed during processing.'}</span>
                        {job.retryCount < job.maxRetries && (
                          <button
                            onClick={() => handleRetryJob(job.id)}
                            disabled={retryingJobId === job.id}
                            className="tb-btn-link text-cyan-300 font-bold shrink-0"
                          >
                            <RefreshCw className={`w-3 h-3 inline mr-1 ${retryingJobId === job.id ? 'animate-spin' : ''}`} />
                            Retry ({job.retryCount}/{job.maxRetries})
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
