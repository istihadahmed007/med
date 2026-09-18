import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Play, Search } from "lucide-react";
import {
  CATEGORY_TOPICS,
  MEDICAL_VIDEO_LIBRARY,
  MedicalVideoItem,
  VIDEO_CATEGORIES,
  VideoFilters,
  filterMedicalVideos,
  getRelatedVideos,
} from "../../data/medicalVideoLibraryData";
import "./videoAtlas.css";

const external = { target: "_blank", rel: "noopener noreferrer" };
function Thumbnail({ video }: { video: MedicalVideoItem }) {
  const [failed, setFailed] = useState(false);
  return video.thumbnail && !failed ? (
    <img
      className="atlas-thumbnail"
      src={video.thumbnail}
      alt={`Publisher preview: ${video.title}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="atlas-no-preview">
      <BookOpen size={26} aria-hidden="true" />
      <span>Watch on the official source</span>
      <small>Preview image not available</small>
    </div>
  );
}
function VideoCard({
  video,
  onSelect,
}: {
  video: MedicalVideoItem;
  onSelect: (id: string) => void;
}) {
  return (
    <article className="atlas-card">
      <button
        className="atlas-preview"
        onClick={() => onSelect(video.id)}
        aria-label={`View ${video.title}`}
      >
        <Thumbnail video={video} />
      </button>
      <div className="atlas-card-body">
        <span className="atlas-eyebrow">{video.category}</span>
        <h3>
          <button onClick={() => onSelect(video.id)}>{video.title}</button>
        </h3>
        <p>{video.description}</p>
        <div className="atlas-meta">
          {video.duration || "Duration not provided"} · Official source
        </div>
        <footer>
          <span>{video.source}</span>
          <button
            className="atlas-text-button"
            onClick={() => onSelect(video.id)}
          >
            <Play size={15} aria-hidden="true" /> View video
          </button>
        </footer>
      </div>
    </article>
  );
}
function OfficialPlayer({ video }: { video: MedicalVideoItem }) {
  const [started, setStarted] = useState(false);
  const [slow, setSlow] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!started) return;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [started]);
  return (
    <>
      <div className="atlas-player">
        {video.embedUrl && started && !failed ? (
          <iframe
            title={video.title}
            src={video.embedUrl}
            allow="fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="atlas-source-player">
            <BookOpen size={36} aria-hidden="true" />
            <h2>
              {video.embedUrl
                ? "Watch the official video"
                : "Watch with the original publisher"}
            </h2>
            <p>
              {video.embedUrl
                ? "Load the publisher’s player to begin."
                : "This video opens on its official source page, with the publisher’s player and educational material."}
            </p>
            {video.embedUrl && !failed ? (
              <button
                className="atlas-primary"
                onClick={() => setStarted(true)}
              >
                <Play size={18} /> Load official player
              </button>
            ) : (
              <a className="atlas-primary" href={video.sourceUrl} {...external}>
                <Play size={18} /> Watch on official source{" "}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        )}
      </div>
      {(slow || failed) && (
        <p role="status" className="atlas-notice">
          Having trouble playing? The provider may restrict embedding or be
          unavailable.{" "}
          <a href={video.sourceUrl} {...external}>
            Open the official source
          </a>{" "}
          or try again later.
        </p>
      )}
      <p className="atlas-meta">
        Playback, speed, fullscreen and available caption controls are provided
        by the publisher.{" "}
        <a href={video.sourceUrl} {...external}>
          Open source in a new tab ↗
        </a>
      </p>
    </>
  );
}
const readVideoId = () => {
  try {
    return decodeURIComponent(window.location.hash.split("/")[1] || "");
  } catch {
    return "";
  }
};
export const MedicalVideoLibrary: React.FC = () => {
  const [filters, setFilters] = useState<VideoFilters>({});
  const [activeId, setActiveId] = useState(readVideoId);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const sync = () => setActiveId(readVideoId());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [activeId]);
  const select = (id: string) => {
    window.location.hash = id
      ? `video-studio/${encodeURIComponent(id)}`
      : "video-studio";
    setActiveId(id);
    titleRef.current?.scrollIntoView({ block: "start" });
  };
  const active = MEDICAL_VIDEO_LIBRARY.find((v) => v.id === activeId);
  const results = filterMedicalVideos(MEDICAL_VIDEO_LIBRARY, filters);
  const setFilter = (key: keyof VideoFilters, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const options = (
    key: "anatomy" | "procedure" | "specialty",
    required: string[],
  ) =>
    [
      ...new Set([
        ...required,
        ...MEDICAL_VIDEO_LIBRARY.flatMap((v) => v[key]),
      ]),
    ].sort();
  return (
    <section className="video-atlas" aria-label="Medical video atlas">
      <header className="atlas-header">
        <span className="atlas-eyebrow">MEDX / VIDEO STUDIO</span>
        <h1 ref={titleRef} tabIndex={-1}>
          {active ? active.title : "Medical Videos"}
        </h1>
        <p>
          {active
            ? active.source
            : "Explore anatomy, understand disease and learn from surgical teaching videos."}
        </p>
      </header>
      {activeId ? (
        active ? (
          <div className="atlas-detail">
            <button className="atlas-text-button" onClick={() => select("")}>
              <ArrowLeft size={16} /> Back to medical videos
            </button>
            <OfficialPlayer key={active.id} video={active} />
            <div className="atlas-detail-grid">
              <article>
                <span className="atlas-eyebrow">{active.category}</span>
                <h2>About this video</h2>
                <p>{active.description}</p>
                <h2>Educational information</h2>
                <p>{active.educationalInformation}</p>
                <p className="atlas-meta">
                  Educational reference for study; clinical procedures require
                  supervised training.
                </p>
              </article>
              <aside className="atlas-facts">
                <dl>
                  {[
                    [
                      "Procedure",
                      active.procedure.join(", ") || "Not applicable",
                    ],
                    ["Anatomy", active.anatomy.join(", ")],
                    ["Specialty", active.specialty.join(", ")],
                    ["Duration", active.duration || "Not provided"],
                    [
                      "Captions",
                      active.captions?.join(", ") ||
                        "Availability not verified — check the source player",
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <a href={active.sourceUrl} {...external}>
                  Source: {active.source} ↗
                </a>
                <p className="atlas-meta">
                  Source checked {active.verification.checkedOn}. Availability
                  may change.
                </p>
              </aside>
            </div>
            <h2>Related videos</h2>
            {getRelatedVideos(active).length ? (
              <div className="atlas-grid">
                {getRelatedVideos(active).map((v) => (
                  <VideoCard key={v.id} video={v} onSelect={select} />
                ))}
              </div>
            ) : (
              <p>No related verified videos yet.</p>
            )}
          </div>
        ) : (
          <div className="atlas-empty">
            <h2>Video unavailable</h2>
            <p>This video is not in the verified catalog.</p>
            <button className="atlas-primary" onClick={() => select("")}>
              Browse medical videos
            </button>
          </div>
        )
      ) : (
        <>
          <div className="atlas-search">
            <Search size={22} aria-hidden="true" />
            <input
              aria-label="Search medical videos"
              placeholder="Search anatomy, disease, organ, surgery..."
              value={filters.query || ""}
              onChange={(e) => setFilter("query", e.target.value)}
            />
          </div>
          <div className="atlas-layout">
            <aside className="atlas-sidebar">
              <h2>Browse by Category</h2>
              <button
                className={!filters.category ? "is-active" : ""}
                aria-pressed={!filters.category}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: "", topic: "" }))
                }
              >
                All medical videos <span>{MEDICAL_VIDEO_LIBRARY.length}</span>
              </button>
              {VIDEO_CATEGORIES.map((category) => (
                <div key={category}>
                  <button
                    className={filters.category === category ? "is-active" : ""}
                    aria-pressed={filters.category === category}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category, topic: "" }))
                    }
                  >
                    {category}
                    <span>
                      {
                        filterMedicalVideos(MEDICAL_VIDEO_LIBRARY, { category })
                          .length
                      }
                    </span>
                  </button>
                  {filters.category === category && (
                    <div className="atlas-topics">
                      {CATEGORY_TOPICS[category].map((topic) => (
                        <button
                          key={topic}
                          className={filters.topic === topic ? "is-active" : ""}
                          aria-pressed={filters.topic === topic}
                          onClick={() =>
                            setFilter(
                              "topic",
                              filters.topic === topic ? "" : topic,
                            )
                          }
                        >
                          {topic}
                          <span>
                            {
                              filterMedicalVideos(MEDICAL_VIDEO_LIBRARY, {
                                category,
                                topic,
                              }).length
                            }
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="atlas-source-note">
                <BookOpen size={20} />
                <h3>From trusted publishers</h3>
                <p>Videos remain with their original owners.</p>
                <a
                  href="https://medlineplus.gov/anatomyvideos.html"
                  {...external}
                >
                  MedlinePlus Health Videos ↗
                </a>
                <a href="https://pie.med.utoronto.ca/TVASurg/" {...external}>
                  Toronto Video Atlas of Surgery ↗
                </a>
              </div>
            </aside>
            <div className="atlas-results">
              <div className="atlas-filters">
                {(
                  [
                    [
                      "anatomy",
                      "Browse by Anatomy",
                      CATEGORY_TOPICS["Anatomy & Organ Function"],
                    ],
                    [
                      "procedure",
                      "Browse by Procedure",
                      CATEGORY_TOPICS.Procedures,
                    ],
                    [
                      "specialty",
                      "Browse by Specialty",
                      CATEGORY_TOPICS.Surgery,
                    ],
                  ] as const
                ).map(([key, label, required]) => (
                  <label key={key}>
                    {label}
                    <select
                      value={filters[key] || ""}
                      onChange={(e) => setFilter(key, e.target.value)}
                    >
                      <option value="">
                        All{" "}
                        {key === "anatomy"
                          ? "anatomy"
                          : key === "procedure"
                            ? "procedures"
                            : "specialties"}
                      </option>
                      {options(key, [...required]).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <div className="atlas-results-heading">
                <h2 aria-live="polite">
                  {results.length} verified{" "}
                  {results.length === 1 ? "video" : "videos"}
                </h2>
                <button
                  className="atlas-text-button"
                  onClick={() => setFilters({})}
                >
                  Clear filters
                </button>
              </div>
              <p className="atlas-meta">
                A growing reference collection. Missing durations and previews
                are left unfilled.
              </p>
              {results.length ? (
                <div className="atlas-grid">
                  {results.map((video) => (
                    <VideoCard key={video.id} video={video} onSelect={select} />
                  ))}
                </div>
              ) : (
                <div className="atlas-empty">
                  <Search size={28} aria-hidden="true" />
                  <h3>No verified videos for this selection</h3>
                  <p>
                    Try another topic or clear your filters. New videos appear
                    only after their source is verified.
                  </p>
                  <button
                    className="atlas-primary"
                    onClick={() => setFilters({})}
                  >
                    Show all videos
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
