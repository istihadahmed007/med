/** Editorial catalog only. Never synthesize media, timings, transcripts or credentials.
 * Verification evidence is the official source page, not a working-looking URL.
 * null means not verified/published. Keep MedlinePlus/A.D.A.M. media on its source site.
 */
export const VIDEO_CATEGORIES = [
  "Anatomy & Organ Function",
  "Disease & Conditions",
  "Surgery",
  "Procedures",
] as const;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
export const CATEGORY_TOPICS: Record<VideoCategory, string[]> = {
  "Anatomy & Organ Function": [
    "Heart",
    "Brain",
    "Lungs",
    "Kidney",
    "Liver",
    "Digestive System",
    "Nervous System",
    "Cardiovascular System",
    "Musculoskeletal System",
    "Reproductive System",
  ],
  "Disease & Conditions": [
    "Heart Disease",
    "Stroke",
    "Cancer",
    "Diabetes",
    "Kidney Stones",
    "Hypertension",
    "Atherosclerosis",
    "Pneumonia",
    "Neurological Disorders",
  ],
  Surgery: [
    "Laparoscopic Surgery",
    "General Surgery",
    "Cardiac Surgery",
    "Neurosurgery",
    "Gynecology",
    "Obstetrics",
    "Robotic Surgery",
    "Transplant Surgery",
    "Surgical Techniques",
  ],
  Procedures: [
    "Appendectomy",
    "Cesarean Section",
    "Heart Bypass",
    "Angioplasty",
    "Cholecystectomy",
    "Hernia Repair",
    "Biopsy",
    "Endoscopy",
  ],
};
export interface MedicalVideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  anatomy: string[];
  specialty: string[];
  procedure: string[];
  topics: string[];
  thumbnail: string | null;
  duration: string | null;
  captions: string[] | null;
  source: string;
  sourceUrl: string;
  embedUrl: string | null;
  educationalInformation: string;
  verification: {
    status: "verified" | "pending" | "unavailable";
    checkedOn: string;
    evidenceUrl: string;
    playback: "source-only" | "official-youtube";
    notes: string;
  };
}
const medline = (
  id: string,
  title: string,
  page: string,
  category: VideoCategory,
  anatomy: string[],
  specialty: string[],
  procedure: string[],
  topics: string[],
  description: string,
): MedicalVideoItem => ({
  id,
  title,
  description,
  category,
  anatomy,
  specialty,
  procedure,
  topics,
  thumbnail: null,
  duration: null,
  captions: null,
  source: "MedlinePlus / A.D.A.M.",
  sourceUrl: `https://medlineplus.gov/ency/anatomyvideos/${page}.htm`,
  embedUrl: null,
  educationalInformation:
    "Watch the publisher’s educational video and read its accompanying overview and review information on MedlinePlus.",
  verification: {
    status: "verified",
    checkedOn: "2026-09-18",
    evidenceUrl: `https://medlineplus.gov/ency/anatomyvideos/${page}.htm`,
    playback: "source-only",
    notes:
      "Official page lists a health video. Copyrighted media, images, captions and transcripts are not copied or embedded. Duration unverified.",
  },
});
const catalog: MedicalVideoItem[] = [
  {
    id: "tvasurg-cbde",
    title: "Laparoscopic common bile duct exploration",
    description:
      "A surgical teaching case covering bile duct identification, stone removal and closure.",
    category: "Surgery",
    anatomy: ["Gallbladder & Bile Ducts", "Digestive System"],
    specialty: ["General Surgery", "Hepato-pancreato-biliary Surgery"],
    procedure: ["Common Bile Duct Exploration"],
    topics: ["Laparoscopic Surgery", "Surgical Techniques"],
    thumbnail:
      "https://pie.med.utoronto.ca/TVASurg/wp-content/uploads/2022/06/featuredImg_1000x500-800x500.png",
    duration: null,
    captions: null,
    source: "Toronto Video Atlas of Surgery",
    sourceUrl:
      "https://pie.med.utoronto.ca/TVASurg/project/lap-common-bile-duct-exploration/",
    embedUrl: null,
    educationalInformation:
      "The official case includes patient positioning, identification of the common bile duct, choledochotomy, stone removal and closure. Review the full case and its surgical context at the source.",
    verification: {
      status: "verified",
      checkedOn: "2026-09-18",
      evidenceUrl:
        "https://pie.med.utoronto.ca/TVASurg/project/lap-common-bile-duct-exploration/",
      playback: "source-only",
      notes:
        "Video confirmed on official case page; thumbnail confirmed on official laparoscopic category page. No direct media stream reused. Duration and caption availability unverified.",
    },
  },
  medline(
    "brain-components",
    "Brain components",
    "000016",
    "Anatomy & Organ Function",
    ["Brain", "Nervous System"],
    ["Neurology"],
    [],
    [],
    "An educational introduction to the major parts of the brain.",
  ),
  medline(
    "breathing",
    "Breathing",
    "000018",
    "Anatomy & Organ Function",
    ["Lungs"],
    ["Respiratory Medicine"],
    [],
    [],
    "An educational overview of inhalation and exhalation.",
  ),
  medline(
    "kidney-stones",
    "Kidney stones",
    "000075",
    "Disease & Conditions",
    ["Kidney"],
    ["Urology"],
    [],
    ["Kidney Stones"],
    "An educational overview of kidney stones and the urinary tract.",
  ),
  medline(
    "heart-bypass",
    "Heart bypass surgery",
    "000065",
    "Procedures",
    ["Heart", "Cardiovascular System"],
    ["Cardiac Surgery"],
    ["Heart Bypass"],
    ["Heart Disease"],
    "An educational introduction to coronary artery bypass surgery.",
  ),
  {
    id: "standard-lap-chole",
    title: "Standard laparoscopic cholecystectomy",
    description:
      "A surgical teaching video focused on identifying anatomy and the Critical View of Safety.",
    category: "Surgery",
    anatomy: ["Gallbladder & Bile Ducts", "Liver", "Digestive System"],
    specialty: ["General Surgery", "Hepato-pancreato-biliary Surgery"],
    procedure: ["Cholecystectomy"],
    topics: ["Laparoscopic Surgery", "Surgical Techniques"],
    thumbnail: null,
    duration: null,
    captions: null,
    source: "Toronto Video Atlas of Surgery",
    sourceUrl: "https://pie.med.utoronto.ca/TVASurg/project/standardlapchole/",
    embedUrl: null,
    educationalInformation:
      "The publisher discusses the Critical View of Safety and anatomical identification during a standard laparoscopic cholecystectomy. Read the complete case alongside the official video.",
    verification: {
      status: "verified",
      checkedOn: "2026-09-18",
      evidenceUrl:
        "https://pie.med.utoronto.ca/TVASurg/project/standardlapchole/",
      playback: "source-only",
      notes:
        "Official video and case verified. No approved embed or thumbnail confirmed; duration and captions unverified.",
    },
  },
];
export function isVerifiedVideo(video: MedicalVideoItem): boolean {
  try {
    const source = new URL(video.sourceUrl);
    const trusted = ["medlineplus.gov", "pie.med.utoronto.ca"];
    if (
      video.verification.status !== "verified" ||
      !video.title.trim() ||
      !video.description.trim() ||
      !video.source.trim() ||
      !trusted.includes(source.hostname) ||
      source.protocol !== "https:" ||
      video.verification.evidenceUrl !== video.sourceUrl
    )
      return false;
    if (video.embedUrl) {
      const embed = new URL(video.embedUrl);
      return (
        video.verification.playback === "official-youtube" &&
        embed.origin === "https://www.youtube-nocookie.com" &&
        /^\/embed\/[\w-]{11}$/.test(embed.pathname)
      );
    }
    return video.verification.playback === "source-only";
  } catch {
    return false;
  }
}
export const MEDICAL_VIDEO_LIBRARY = catalog.filter(isVerifiedVideo);
export interface VideoFilters {
  query?: string;
  category?: string;
  anatomy?: string;
  procedure?: string;
  specialty?: string;
  topic?: string;
}
export function filterMedicalVideos(
  videos: MedicalVideoItem[],
  filters: VideoFilters,
): MedicalVideoItem[] {
  const terms = (filters.query || "")
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return videos.filter((v) => {
    if (!isVerifiedVideo(v)) return false;
    if (filters.category && v.category !== filters.category) return false;
    if (filters.anatomy && !v.anatomy.includes(filters.anatomy)) return false;
    if (filters.procedure && !v.procedure.includes(filters.procedure))
      return false;
    if (filters.specialty && !v.specialty.includes(filters.specialty))
      return false;
    if (
      filters.topic &&
      ![...v.anatomy, ...v.procedure, ...v.specialty, ...v.topics].includes(
        filters.topic,
      )
    )
      return false;
    const text = [
      v.title,
      v.description,
      v.category,
      v.source,
      ...v.anatomy,
      ...v.procedure,
      ...v.specialty,
      ...v.topics,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
export function getRelatedVideos(video: MedicalVideoItem): MedicalVideoItem[] {
  return MEDICAL_VIDEO_LIBRARY.filter((v) => v.id !== video.id)
    .map((v) => ({
      video: v,
      score:
        v.anatomy.filter((a) => video.anatomy.includes(a)).length * 3 +
        v.specialty.filter((s) => video.specialty.includes(s)).length * 2 +
        Number(v.category === video.category),
    }))
    .filter((v) => v.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((v) => v.video);
}
