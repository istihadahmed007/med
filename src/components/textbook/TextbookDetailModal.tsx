import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, Layers, Calendar, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { TextbookRecord, TextbookSection } from '../../types/textbook';

interface Props {
  book: TextbookRecord;
  onClose: () => void;
  onRead: (bookId: string, sectionId?: string) => void;
  onNavigateAcrossBooks: (topicId: string) => void;
}

export const TextbookDetailModal: React.FC<Props> = ({
  book,
  onClose,
  onRead,
  onNavigateAcrossBooks
}) => {
  return (
    <div className="tb-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="tb-modal-title">
      <div className="tb-modal-panel animate-fadeIn" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#08AFC1]/20 border border-[#08AFC1]/40 flex items-center justify-center text-[#38bdf8]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="tb-badge">{book.phase} · {book.subjectId}</span>
              <h2 id="tb-modal-title" className="text-xl font-bold text-white mt-1 leading-tight">
                {book.title}
              </h2>
              {book.titleBn && (
                <p className="text-sm text-cyan-300 font-medium">{book.titleBn}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-5 text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="text-xs text-slate-400 font-medium">Authors / Editors</span>
              <p className="font-semibold text-slate-200 mt-0.5">
                {book.authors.join(', ')}
                {book.editors && book.editors.length > 0 && ` (Eds: ${book.editors.join(', ')})`}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Verified Edition & Year</span>
              <p className="font-semibold text-slate-200 mt-0.5">
                {book.edition} ({book.publicationYear})
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Publisher</span>
              <p className="font-semibold text-slate-200 mt-0.5">{book.publisher}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">ISBN-13 (Verified)</span>
              <p className="font-mono text-xs font-bold text-emerald-400 mt-0.5">
                {book.isbn13 || 'Not issued / Institutional record'}
              </p>
            </div>
          </div>

          {/* Access Status Alert */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Access Status:</span>
                {book.accessType === 'read_in_medx' && (
                  <span className="tb-access-badge tb-access-read">Read in MEDX (Licensed/Open)</span>
                )}
                {book.accessType === 'preview_available' && (
                  <span className="tb-access-badge tb-access-preview">Authorized Preview Available</span>
                )}
                {book.accessType === 'external_access' && (
                  <span className="tb-access-badge tb-access-external">Verified Publisher Access</span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {book.accessType === 'read_in_medx'
                  ? 'This textbook is fully licensed or openly published under Creative Commons / Public Health terms for in-app reading in MEDX.'
                  : book.accessType === 'preview_available'
                  ? 'Authorized chapter previews and table of contents are available within MEDX. Full copy available via publisher.'
                  : 'Commercial copyright protected by publisher. To prevent copyright violation, MEDX provides verified citations, BM&DC syllabus alignment, and official publisher portal links.'}
              </p>
              <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-2">
                <span>License: <strong>{book.license.licenseType}</strong></span>
                <span>•</span>
                <span>Verified: <strong>{book.verificationDate}</strong></span>
              </div>
            </div>
          </div>

          {/* BM&DC Curriculum Relevance */}
          {book.bmdcCurriculumRelevance && (
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
              <span className="font-bold text-emerald-300">BM&DC Curriculum Note: </span>
              {book.bmdcCurriculumRelevance}
            </div>
          )}

          {/* Connected Across-Books Topics */}
          {book.connectedTopicIds && book.connectedTopicIds.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                <Layers className="w-4 h-4" /> Connected "Across Books" Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {book.connectedTopicIds.map(topicId => (
                  <button
                    key={topicId}
                    onClick={() => {
                      onClose();
                      onNavigateAcrossBooks(topicId);
                    }}
                    className="tb-btn-secondary text-xs !py-1.5 !px-3 hover:border-cyan-400"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="capitalize">{topicId.replace(/-/g, ' ')}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Table of Contents */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Table of Contents & Verified Sections ({book.tableOfContents.length})
              </span>
              <span className="text-[11px] text-slate-400">Page Index / Printed Label</span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {book.tableOfContents.map((section, idx) => (
                <div
                  key={section.id}
                  className="p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 flex items-center justify-between gap-3 text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-slate-500 text-[11px] shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200 truncate">
                      {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="tb-page-badge" title="Printed book page number">
                      p. {section.printedPageLabel}
                    </span>
                    {book.accessType === 'read_in_medx' && (
                      <button
                        onClick={() => {
                          onClose();
                          onRead(book.id, section.id);
                        }}
                        className="tb-btn-link text-xs"
                      >
                        Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {book.citationStandard && (
              <span className="italic truncate block max-w-sm" title={book.citationStandard}>
                {book.citationStandard}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {book.officialPublisherUrl && (
              <a
                href={book.officialPublisherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tb-btn-secondary"
              >
                <ExternalLink className="w-4 h-4" />
                Publisher Catalog
              </a>
            )}

            {book.accessType === 'read_in_medx' ? (
              <button
                onClick={() => {
                  onClose();
                  onRead(book.id);
                }}
                className="tb-btn-primary"
              >
                <BookOpen className="w-4 h-4" />
                Read in MEDX
              </button>
            ) : book.accessType === 'preview_available' ? (
              <button
                onClick={() => {
                  onClose();
                  onRead(book.id);
                }}
                className="tb-btn-primary"
              >
                <BookOpen className="w-4 h-4" />
                Open Preview
              </button>
            ) : (
              <a
                href={book.officialPublisherUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="tb-btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                Official Access
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
