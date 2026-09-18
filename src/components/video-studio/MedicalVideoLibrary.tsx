import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Play,
  Search,
  ShieldCheck,
  Clock,
  Layers,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Tag,
  CheckCircle2,
} from "lucide-react";
import {
  CATEGORY_TOPICS,
  MEDICAL_VIDEO_LIBRARY,
  SelfHostedMedicalVideo,
  VIDEO_CATEGORIES,
  VideoCategory,
  VideoFilters,
  filterMedicalVideos,
  getRelatedVideos,
} from "../../data/medicalVideoLibraryData";
import { SelfHostedVideoPlayer } from "./SelfHostedVideoPlayer";
import { VideoStudioService } from "../../services/videoStudioService";
import "./videoAtlas.css";

interface ThumbnailProps {
  video: SelfHostedMedicalVideo;
}

function VideoThumbnail({ video }: ThumbnailProps) {
  const [failed, setFailed] = useState(false);

  return video.thumbnail_url && !failed ? (
    <div className="relative w-full h-full overflow-hidden group/thumb">
      <img
        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
        src={video.thumbnail_url}
        alt={video.title}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono text-slate-200 font-semibold backdrop-blur-sm flex items-center gap-1">
        <Clock size={11} className="text-cyan-400" />
        <span>{video.duration}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
        <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-glow-cyan transform scale-90 group-hover/thumb:scale-100 transition-transform">
          <Play size={22} className="fill-current ml-0.5" />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 text-slate-400">
      <Play size={28} className="text-cyan-400/80 mb-2" />
      <span className="text-xs font-semibold text-slate-300 text-center">{video.title}</span>
      <span className="text-[10px] text-slate-500 mt-1 font-mono">{video.duration}</span>
    </div>
  );
}

function VideoCard({
  video,
  onSelect,
}: {
  video: SelfHostedMedicalVideo;
  onSelect: (id: string) => void;
}) {
  return (
    <article className="atlas-card group flex flex-col justify-between">
      <button
        className="atlas-preview focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
        onClick={() => onSelect(video.id)}
        aria-label={`Watch ${video.title}`}
      >
        <VideoThumbnail video={video} />
      </button>

      <div className="atlas-card-body flex-1 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="atlas-eyebrow text-cyan-400 font-semibold">{video.category}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-medium">
              Public Domain
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
            <button
              onClick={() => onSelect(video.id)}
              className="text-left focus:outline-none"
            >
              {video.title}
            </button>
          </h3>

          <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {video.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {video.topics.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <footer className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[170px]" title={video.source}>
            {video.source}
          </span>
          <button
            className="atlas-text-button text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 focus:outline-none"
            onClick={() => onSelect(video.id)}
          >
            <Play size={14} className="fill-current" /> Watch Video
          </button>
        </footer>
      </div>
    </article>
  );
}

const readVideoId = (): string => {
  try {
    return decodeURIComponent(window.location.hash.split("/")[1] || "");
  } catch {
    return "";
  }
};

export const MedicalVideoLibrary: React.FC = () => {
  const [videos, setVideos] = useState<SelfHostedMedicalVideo[]>(MEDICAL_VIDEO_LIBRARY);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VideoFilters>({});
  const [activeId, setActiveId] = useState(readVideoId);

  const titleRef = useRef<HTMLHeadingElement>(null);

  // Load verified medical videos from self-hosted database API
  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);

    VideoStudioService.getSelfHostedVideos()
      .then((data) => {
        if (active) {
          if (Array.isArray(data) && data.length > 0) {
            setVideos(data);
          } else {
            setVideos(MEDICAL_VIDEO_LIBRARY);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.warn("Medical video library fallback:", err);
          // Clean error recovery to local verified data
          setVideos(MEDICAL_VIDEO_LIBRARY);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Hash-based navigation (#video-studio/<id>)
  useEffect(() => {
    const sync = () => setActiveId(readVideoId());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [activeId]);

  const selectVideo = (id: string) => {
    window.location.hash = id ? `video-studio/${encodeURIComponent(id)}` : "video-studio";
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeVideo = videos.find((v) => v.id === activeId);
  const filteredResults = filterMedicalVideos(videos, filters);

  const setFilter = (key: keyof VideoFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <section className="video-atlas max-w-7xl mx-auto px-4 py-6" aria-label="Self-Hosted Medical Video Library">
      {/* Top Header Banner */}
      <header className="atlas-header mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="atlas-eyebrow text-cyan-400 font-bold tracking-wider">
            MEDX VIDEO STUDIO
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-300 font-semibold flex items-center gap-1">
            <ShieldCheck size={12} />
            Self-Hosted Medical Library
          </span>
        </div>

        <h1
          ref={titleRef}
          tabIndex={-1}
          className="text-2xl md:text-3xl font-extrabold text-white tracking-tight focus:outline-none"
        >
          {activeVideo ? activeVideo.title : "Self-Hosted Medical Video Library"}
        </h1>

        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {activeVideo
            ? activeVideo.description
            : "Direct cloud-stored educational medical videos. High-definition clinical footage and medical animations streamed natively with zero external redirects."}
        </p>
      </header>

      {/* Detail View (Video Player) or Catalog View */}
      {activeId ? (
        activeVideo ? (
          <div className="atlas-detail flex flex-col gap-6">
            <button
              className="atlas-text-button text-slate-300 hover:text-cyan-300 flex items-center gap-2 self-start text-sm font-semibold focus:outline-none transition-colors"
              onClick={() => selectVideo("")}
            >
              <ArrowLeft size={16} /> Back to Video Library
            </button>

            {/* Direct HTML5 Player (No external redirects, no iframe) */}
            <SelfHostedVideoPlayer video={activeVideo} />

            {/* Detailed Clinical Information */}
            <div className="atlas-detail-grid grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              <article className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/40">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Verified Public Domain
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white">Educational & Clinical Information</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{activeVideo.description}</p>

                <div className="border-t border-slate-800/80 pt-4 mt-2">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Learning Focus & Objectives
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-200 border border-slate-700/60 font-medium"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-400 border-t border-slate-800/60 pt-3 mt-1">
                  BM&DC MBBS Curricular Resource. All medical animations and educational media are distributed legally in the public domain courtesy of the National Library of Medicine.
                </p>
              </article>

              <aside className="atlas-facts bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    Curricular Metadata
                  </h3>
                  <dl className="flex flex-col gap-3 text-xs">
                    <div>
                      <dt className="text-slate-400 font-semibold">Duration</dt>
                      <dd className="text-slate-200 font-mono font-bold mt-0.5">{activeVideo.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Anatomical Structures</dt>
                      <dd className="text-slate-200 mt-0.5">{activeVideo.anatomy.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Medical Specialty</dt>
                      <dd className="text-slate-200 mt-0.5">{activeVideo.specialty.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Diagnostic / Clinical Procedures</dt>
                      <dd className="text-slate-200 mt-0.5">{activeVideo.procedure.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-semibold">Storage Path</dt>
                      <dd className="text-cyan-400 font-mono mt-0.5 break-all">{activeVideo.storage_path}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 size={16} />
                    <span>Hosted on MEDX Cloud Storage</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Direct streaming • No third-party cookies or redirects
                  </span>
                </div>
              </aside>
            </div>

            {/* Related Educational Videos */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-white mb-4">Related Educational Videos</h2>
              {getRelatedVideos(activeVideo, videos).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {getRelatedVideos(activeVideo, videos).map((v) => (
                    <VideoCard key={v.id} video={v} onSelect={selectVideo} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No other videos in this immediate specialty category yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="atlas-empty bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center">
            <AlertCircle size={36} className="text-amber-400 mb-3" />
            <h2 className="text-xl font-bold text-white">Video not found</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-md">
              The requested video record does not exist in the verified self-hosted repository.
            </p>
            <button
              className="atlas-primary mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-glow-blue"
              onClick={() => selectVideo("")}
            >
              Browse All Videos
            </button>
          </div>
        )
      ) : (
        /* Catalog View */
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              aria-label="Search verified medical videos"
              placeholder="Search topics (e.g., Breathing, Atherosclerosis, Allergic reaction, Digestion, Heart, Lungs)..."
              value={filters.query || ""}
              onChange={(e) => setFilter("query", e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Categories & Topic Filters */}
            <aside className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 self-start">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Medical Categories
              </h2>

              <div className="flex flex-col gap-1.5">
                <button
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                    !filters.category || filters.category === "all"
                      ? "bg-cyan-950/60 text-cyan-300 border border-cyan-600/40"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                  onClick={() => setFilters((prev) => ({ ...prev, category: "all", topic: "" }))}
                >
                  <span>All Videos</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {videos.length}
                  </span>
                </button>

                {VIDEO_CATEGORIES.map((cat) => {
                  const count = filterMedicalVideos(videos, { category: cat }).length;
                  const isSelected = filters.category === cat;

                  return (
                    <div key={cat} className="flex flex-col gap-1">
                      <button
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-cyan-950/60 text-cyan-300 border border-cyan-600/40"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                        }`}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            category: isSelected ? "all" : cat,
                            topic: "",
                          }))
                        }
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                            count > 0 ? "bg-slate-800 text-slate-300" : "bg-slate-950 text-slate-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>

                      {/* Expandable Topic Pills when category is selected */}
                      {isSelected && CATEGORY_TOPICS[cat] && (
                        <div className="pl-3 py-1 flex flex-col gap-1">
                          {CATEGORY_TOPICS[cat].map((topic) => {
                            const isTopicSelected = filters.topic === topic;
                            const topicCount = filterMedicalVideos(videos, {
                              category: cat,
                              topic,
                            }).length;

                            return (
                              <button
                                key={topic}
                                onClick={() =>
                                  setFilter("topic", isTopicSelected ? "" : topic)
                                }
                                className={`text-xs text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                                  isTopicSelected
                                    ? "bg-blue-900/60 text-cyan-200 font-bold border border-cyan-500/40"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                              >
                                <span>{topic}</span>
                                {topicCount > 0 && (
                                  <span className="text-[10px] font-mono text-cyan-400">
                                    {topicCount}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Attribution Callout in Sidebar */}
              <div className="mt-4 p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/50 text-xs text-slate-300 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <ShieldCheck size={16} />
                  <span>Licensed Redistribution</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Source: MedlinePlus, National Library of Medicine. Verified public domain videos hosted directly without external redirects.
                </p>
              </div>
            </aside>

            {/* Results Grid & Empty States */}
            <main className="lg:col-span-3 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">
                    {filteredResults.length} Verified Video
                    {filteredResults.length === 1 ? "" : "s"}
                  </h2>
                  {filters.category && filters.category !== "all" && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {filters.category}
                    </span>
                  )}
                  {filters.topic && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                      Topic: {filters.topic}
                    </span>
                  )}
                </div>

                {(filters.category || filters.topic || filters.query) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold focus:outline-none"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredResults.map((video) => (
                    <VideoCard key={video.id} video={video} onSelect={selectVideo} />
                  ))}
                </div>
              ) : (
                /* Explicit required empty state */
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center my-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
                    <Search size={30} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No verified video available yet
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                    {filters.category && filters.category !== "all"
                      ? `We only self-host verified public-domain medical videos. No verified public domain video has been curated for ${filters.category} yet.`
                      : "No verified medical video matches your current search criteria. MEDX never fabricates or presents synthetic placeholder videos."}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-glow-cyan text-sm"
                  >
                    Show All Verified Videos ({videos.length})
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </section>
  );
};

export default MedicalVideoLibrary;
