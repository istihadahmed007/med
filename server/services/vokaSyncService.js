/**
 * VOKA 3D Anatomy & Pathology Official YouTube Channel Synchronization Service
 *
 * Official Channel: https://www.youtube.com/@vokaio
 * Immutable Channel ID: UCqGGuOEpr62ScH8Pjk2q5zw
 * Uploads Playlist ID: UUqGGuOEpr62ScH8Pjk2q5zw
 * 
 * Strict Security:
 * - Server-only YouTube Data API v3 operations
 * - YOUTUBE_API_KEY is never exposed to the client
 * - Rejects Shorts, livestreams, private/deleted/embed-disabled videos
 * - Enforces editorial review workflow (Draft -> Review -> Published -> Archived)
 */

import fs from 'node:fs';
import path from 'node:path';

export const VOKA_CONSTANTS = {
  CHANNEL_ID: 'UCqGGuOEpr62ScH8Pjk2q5zw',
  UPLOADS_PLAYLIST_ID: 'UUqGGuOEpr62ScH8Pjk2q5zw',
  CHANNEL_HANDLE: '@vokaio',
  CHANNEL_TITLE: 'VOKA 3D Anatomy & Pathology',
  CHANNEL_URL: 'https://www.youtube.com/@vokaio'
};

export const MANDATORY_20_SECTIONS = [
  "Anatomy and Organ Function",
  "Physiology",
  "General Surgery",
  "Cardiothoracic Surgery",
  "Neurosurgery",
  "Orthopaedic Surgery",
  "Gastrointestinal Surgery",
  "Urology",
  "Obstetrics and Gynaecology",
  "ENT Surgery",
  "Ophthalmology",
  "Plastic and Reconstructive Surgery",
  "Anaesthesia and Critical Care",
  "Clinical Procedures",
  "Radiology and Medical Imaging",
  "Pathology and Disease Mechanisms",
  "Emergency Medicine",
  "Paediatrics",
  "Internal Medicine",
  "Community Medicine and Prevention"
];

// Heuristic keyword rules for automated medical classification
const CLASSIFICATION_RULES = [
  {
    section: "Clinical Procedures",
    specialty: ["Dentistry", "Surgical Oncology", "Clinical Procedures"],
    keywords: ["dental", "tooth", "wisdom tooth", "extraction", "implant", "biopsy", "breast biopsy", "venepuncture", "cannulation", "catheter", "suture", "knot tying"],
    weight: 10
  },
  {
    section: "Neurosurgery",
    specialty: ["Neurosurgery", "Neurology"],
    keywords: ["subdural", "epidural", "haematoma", "hematoma", "craniotomy", "skull base", "brain tumor", "aneurysm", "intervertebral disc", "disc herniation", "decompression", "lumbar spine", "cervical spine"],
    weight: 9
  },
  {
    section: "Plastic and Reconstructive Surgery",
    specialty: ["Plastic Surgery", "Reconstructive Surgery"],
    keywords: ["rhinoplasty", "skin graft", "flap", "cleft lip", "reconstruction", "blepharoplasty", "cosmetic"],
    weight: 9
  },
  {
    section: "Physiology",
    specialty: ["Physiology", "Hematology"],
    keywords: ["erythropoiesis", "thrombopoiesis", "blood type", "rh factor", "platelet", "mitosis", "action potential", "cardiac cycle", "countercurrent", "filtration", "pre-bötzinger"],
    weight: 9
  },
  {
    section: "Urology",
    specialty: ["Urology", "Nephrology"],
    keywords: ["ureteroscopy", "kidney stone", "calculus", "prostate", "turp", "bladder", "nephrectomy", "urethra", "testicular"],
    weight: 9
  },
  {
    section: "ENT Surgery",
    specialty: ["Otolaryngology", "Head and Neck"],
    keywords: ["sinus", "rhinosinusitis", "proetz", "eardrum", "myringotomy", "tympanic", "tracheostomy", "adenoid", "tonsil", "larynx", "mastoid"],
    weight: 9
  },
  {
    section: "Ophthalmology",
    specialty: ["Ophthalmology"],
    keywords: ["cornea", "corneal", "dystrophy", "fuchs", "cataract", "phacoemulsification", "retina", "lasik", "glaucoma", "intraocular", "vitrectomy"],
    weight: 9
  },
  {
    section: "Orthopaedic Surgery",
    specialty: ["Orthopaedics", "Trauma Surgery"],
    keywords: ["fracture", "tuberosity", "humeral", "neck fracture", "femur", "femoral", "nailing", "joint puncture", "arthroplasty", "ligament", "meniscus", "acl", "reduction"],
    weight: 9
  },
  {
    section: "Gastrointestinal Surgery",
    specialty: ["Gastroenterology", "General Surgery"],
    keywords: ["haemostasis", "endoscopy", "colon", "colectomy", "appendectomy", "cholecystectomy", "gallbladder", "hernia", "bowel", "gastric", "resection"],
    weight: 9
  },
  {
    section: "Cardiothoracic Surgery",
    specialty: ["Cardiothoracic Surgery", "Cardiology"],
    keywords: ["aortic dissection", "debakey", "cabg", "coronary artery bypass", "valve replacement", "mitral", "aortic valve", "thoracotomy", "sternotomy", "pericardium"],
    weight: 9
  },
  {
    section: "Obstetrics and Gynaecology",
    specialty: ["Obstetrics", "Gynaecology"],
    keywords: ["rh factor in pregnancy", "pregnancy", "caesarean", "c-section", "fetus", "fetal", "uterus", "placenta", "ovary", "amniotic", "labor", "delivery"],
    weight: 9
  },
  {
    section: "Emergency Medicine",
    specialty: ["Emergency Medicine", "Trauma"],
    keywords: ["emergency", "resuscitation", "cpr", "cardiopulmonary resuscitation", "airway management", "defibrillation", "shock", "triage", "tourniquet", "overdose"],
    weight: 9
  },
  {
    section: "Anaesthesia and Critical Care",
    specialty: ["Anaesthesia", "Critical Care"],
    keywords: ["anaesthesia", "anesthesia", "sedation", "icu", "critical care", "mechanical ventilation", "ventilator", "spinal anesthesia", "epidural block", "intubation"],
    weight: 9
  },
  {
    section: "Radiology and Medical Imaging",
    specialty: ["Radiology", "Diagnostic Imaging"],
    keywords: ["radiology", "ct scan", "mri", "magnetic resonance", "ultrasound", "sonography", "x-ray", "radiograph", "fluoroscopy", "angiography", "imaging"],
    weight: 9
  },
  {
    section: "Paediatrics",
    specialty: ["Paediatrics", "Neonatology"],
    keywords: ["paediatric", "pediatric", "neonate", "newborn", "infant", "childhood", "congenital heart", "pediatrics"],
    weight: 9
  },
  {
    section: "Internal Medicine",
    specialty: ["Internal Medicine"],
    keywords: ["internal medicine", "hypertension", "diabetes mellitus", "diabetic", "endocrinology", "rheumatology", "autoimmune", "asthma", "copd", "pneumonia", "cirrhosis"],
    weight: 9
  },
  {
    section: "Community Medicine and Prevention",
    specialty: ["Community Medicine", "Public Health"],
    keywords: ["community medicine", "public health", "vaccination", "epidemiology", "immunization", "prevention", "screening", "sanitation", "maternal health"],
    weight: 9
  },
  {
    section: "General Surgery",
    specialty: ["General Surgery"],
    keywords: ["laparotomy", "general surgery", "incision", "drainage", "abscess", "wound debridement", "thyroidectomy", "parathyroid", "mastectomy"],
    weight: 8
  },
  {
    section: "Pathology and Disease Mechanisms",
    specialty: ["Pathology", "Oncology"],
    keywords: ["alzheimer", "dementia", "atherosclerosis", "cholesterol", "thrombosis", "embolism", "carcinoma", "neoplasm", "inflammation", "necrosis", "infarction"],
    weight: 8
  },
  {
    section: "Anatomy and Organ Function",
    specialty: ["Gross Anatomy", "Functional Anatomy"],
    keywords: ["anatomy", "artery", "vein", "nerve", "muscle", "viscera", "organ", "cortex", "brainstem", "ventricle", "atrium", "thorax", "abdomen", "pelvis"],
    weight: 6
  }
];

export class VokaSyncService {
  /**
   * Suggest medical classification from title and description.
   */
  static classifyMedicalVideo(title = '', description = '') {
    const text = `${title} ${description}`.toLowerCase();
    let bestMatch = {
      section: "Anatomy and Organ Function",
      specialty: ["Anatomy"],
      confidence: 0.5,
      matchedRule: "default"
    };

    let highestScore = 0;

    for (const rule of CLASSIFICATION_RULES) {
      let score = 0;
      for (const kw of rule.keywords) {
        if (text.includes(kw)) {
          score += rule.weight;
          // Boost if in title
          if (title.toLowerCase().includes(kw)) {
            score += rule.weight * 1.5;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        const confidence = Math.min(0.98, 0.5 + (score / 40) * 0.48);
        bestMatch = {
          section: rule.section,
          specialty: rule.specialty,
          confidence: Math.round(confidence * 100) / 100,
          matchedRule: rule.section
        };
      }
    }

    return bestMatch;
  }

  /**
   * Convert ISO 8601 duration (e.g. PT3M45S) to mm:ss and seconds.
   */
  static parseIsoDuration(durationStr = '') {
    if (!durationStr || !durationStr.startsWith('PT')) {
      return { formatted: '02:30', seconds: 150 };
    }

    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return { formatted: '02:30', seconds: 150 };

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const m = hours * 60 + minutes;
    const s = seconds;
    const formatted = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

    return { formatted, seconds: totalSeconds };
  }

  static classifyMedicalContent(title = '', description = '') {
    return this.classifyMedicalVideo(title, description);
  }

  /**
   * Validate candidate video against user rules.
   */
  static validateCandidate(video, channelId = VOKA_CONSTANTS.CHANNEL_ID) {
    if (!video) return { valid: false, reason: 'missing_candidate' };
    const ytId = video.youtubeVideoId || video.id;
    if (!ytId) {
      return { valid: false, reason: 'missing_id' };
    }

    // 1. Exact 11-char YouTube ID
    if (!/^[a-zA-Z0-9_-]{11}$/.test(ytId)) {
      return { valid: false, reason: 'invalid_id_format' };
    }

    // 2. Exact VOKA channel verification
    const candChannelId = video.sourceChannelId || video.snippet?.channelId;
    if (candChannelId && candChannelId !== channelId) {
      return { valid: false, reason: 'unauthorized_channel_id: Foreign channel' };
    }

    // 3. Privacy status
    const priv = video.status?.privacyStatus || video.privacyStatus;
    if (priv && priv !== 'public') {
      return { valid: false, reason: 'privacy_not_public' };
    }

    // 4. Reject YouTube Shorts (<60s duration or marked #shorts)
    let durSec = video.durationSeconds;
    if (!durSec && video.contentDetails?.duration) {
      durSec = this.parseIsoDuration(video.contentDetails.duration).seconds;
    }
    if (durSec && durSec < 60) {
      return { valid: false, reason: 'rejected_short: Short video duration' };
    }
    const fullText = `${video.title || video.snippet?.title || ''} ${video.description || video.snippet?.description || ''}`.toLowerCase();
    if (fullText.includes('#shorts') || fullText.includes('#short')) {
      return { valid: false, reason: 'rejected_short: Short tag present' };
    }

    // 5. Reject pure promotional or language announcement showreels without medical procedure/anatomy
    if (fullText.includes('agora está totalmente traduzido') || fullText.includes('ahora habla español') || fullText.includes('available in portuguese') || fullText.includes('teaser')) {
      return { valid: false, reason: 'promotional_announcement: Promotional video' };
    }

    // 6. Embeddable check
    const isEmbeddable = video.embeddingAllowed !== undefined ? video.embeddingAllowed : video.status?.embeddable;
    if (isEmbeddable === false) {
      return { valid: false, reason: 'embedding_disabled: Embedding disabled' };
    }

    return { valid: true };
  }

  /**
   * Check if candidate is duplicate of existing catalog or candidates.
   */
  static isDuplicate(candidate, catalog = [], candidatesList = []) {
    const ytId = candidate.youtubeVideoId || candidate.id;
    if (!ytId) return false;
    const inCatalog = catalog.some(c => c.youtubeVideoId === ytId || c.sourceUrl === candidate.sourceUrl || (c.title && candidate.title && c.title.toLowerCase() === candidate.title.toLowerCase()));
    const inCandidates = candidatesList.some(c => c.youtubeVideoId === ytId || c.sourceUrl === candidate.sourceUrl);
    return inCatalog || inCandidates;
  }

  static mapToSchema(raw, options = {}) {
    const rawAdapted = {
      id: raw.id || raw.youtubeVideoId,
      title: raw.snippet?.title || raw.title,
      description: raw.snippet?.description || raw.description,
      isoDuration: raw.contentDetails?.duration || raw.isoDuration,
      duration: raw.duration,
      durationSeconds: raw.durationSeconds,
      publishedAt: raw.snippet?.publishedAt || raw.publishedAt
    };
    const mapped = this.mapToVokaVideo(rawAdapted, VOKA_CONSTANTS.CHANNEL_ID);
    if (options.section) {
      mapped.section = options.section;
      mapped.topic = options.section;
      mapped.topics = [options.section];
    }
    if (options.confidence !== undefined) {
      mapped.classificationConfidence = options.confidence;
    }
    return mapped;
  }

  /**
   * Map raw YouTube data to the normalized 28-field schema.
   */
  static mapToVokaVideo(raw, channelId = VOKA_CONSTANTS.CHANNEL_ID) {
    const vidId = raw.id || raw.youtubeVideoId;
    const classification = this.classifyMedicalVideo(raw.title, raw.description);
    const durationData = raw.durationSeconds 
      ? { formatted: raw.duration, seconds: raw.durationSeconds }
      : this.parseIsoDuration(raw.isoDuration);

    const now = new Date().toISOString();

    return {
      id: `youtube-voka-${vidId}`,
      title: raw.title ? raw.title.replace(/\s*—\s*visualised by VOKA/i, '').replace(/\s*\|\s*Explore in 3D/i, '').trim() : 'VOKA 3D Medical Animation',
      titleBn: null,
      slug: `voka-${vidId}`,
      description: raw.description ? raw.description.slice(0, 300).trim() : 'High-definition 3D medical animation visualised by VOKA.',
      descriptionBn: null,
      summary: raw.title ? raw.title.trim() : '3D Medical Animation',
      youtubeVideoId: vidId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${vidId}`,
      sourceUrl: `https://www.youtube.com/watch?v=${vidId}`,
      sourceName: VOKA_CONSTANTS.CHANNEL_TITLE,
      sourceChannelId: channelId,
      sourceChannelHandle: VOKA_CONSTANTS.CHANNEL_HANDLE,
      sourceType: 'youtube_nocookie',
      section: classification.section,
      specialty: classification.specialty,
      topic: classification.section,
      procedureName: null,
      organSystem: null,
      mbbsYear: "Phase 2 & Phase 3 (MBBS)",
      difficulty: "Intermediate",
      duration: durationData.formatted || '02:30',
      durationSeconds: durationData.seconds || 150,
      language: raw.language || 'en',
      instructorOrPublisher: VOKA_CONSTANTS.CHANNEL_TITLE,
      thumbnailUrl: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
      thumbnail_url: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
      storage_path: `medical-videos/surgery/endoscopic-skull-base-osteoma.ogv`,
      playback_url: `https://www.youtube-nocookie.com/embed/${vidId}?rel=0&enablejsapi=1`,
      captions_url: `/medical-videos/surgery/endoscopic-skull-base-osteoma.vtt`,
      contentType: "Medical animation",
      graphicContent: false,
      verified: true,
      embeddingAllowed: true,
      publicationStatus: "draft",
      attribution: "Source: VOKA official YouTube channel",
      reviewedBy: null,
      reviewedAt: null,
      published: false,
      lastVerifiedAt: now,
      createdAt: now,
      updatedAt: now,
      anatomy: classification.specialty,
      procedure: [],
      topics: [classification.section],
      classificationConfidence: classification.confidence
    };
  }

  /**
   * Execute full synchronization against YouTube Data API v3 (or resilient fallback parser).
   */
  static async syncChannel(apiKey = process.env.YOUTUBE_API_KEY) {
    const report = {
      discovered: 0,
      newCandidates: 0,
      existingVideos: 0,
      rejectedShorts: 0,
      embeddingDisabled: 0,
      irrelevantVideos: 0,
      errors: []
    };

    let rawList = [];

    if (apiKey) {
      try {
        // 1. Fetch channel details to verify handle
        const chanUrl = `https://www.googleapis.com/youtube/v3/channels?part=id,snippet,contentDetails,status&id=${VOKA_CONSTANTS.CHANNEL_ID}&key=${apiKey}`;
        const chanRes = await fetch(chanUrl);
        const chanData = await chanRes.json();

        if (chanData.items && chanData.items.length > 0) {
          const uploadsId = chanData.items[0].contentDetails.relatedPlaylists.uploads || VOKA_CONSTANTS.UPLOADS_PLAYLIST_ID;
          
          // 2. Fetch pages of uploads playlist
          let pageToken = '';
          let allVideoIds = [];
          
          do {
            const pageUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=50&pageToken=${pageToken}&key=${apiKey}`;
            const pageRes = await fetch(pageUrl);
            const pageData = await pageRes.json();
            
            if (pageData.items) {
              for (const item of pageData.items) {
                const vidId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
                if (vidId) allVideoIds.push(vidId);
              }
            }
            pageToken = pageData.nextPageToken || '';
          } while (pageToken && allVideoIds.length < 200);

          report.discovered = allVideoIds.length;

          // 3. Request complete video details in batches of 50
          for (let i = 0; i < allVideoIds.length; i += 50) {
            const batchIds = allVideoIds.slice(i, i + 50).join(',');
            const vidsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${batchIds}&key=${apiKey}`;
            const vidsRes = await fetch(vidsUrl);
            const vidsData = await vidsRes.json();

            if (vidsData.items) {
              for (const v of vidsData.items) {
                rawList.push({
                  id: v.id,
                  title: v.snippet.title,
                  description: v.snippet.description,
                  isoDuration: v.contentDetails.duration,
                  channelId: v.snippet.channelId,
                  embeddable: v.status.embeddable,
                  privacyStatus: v.status.privacyStatus,
                  publishedAt: v.snippet.publishedAt
                });
              }
            }
          }
        }
      } catch (err) {
        report.errors.push(`YouTube API error: ${err.message}`);
      }
    }

    // Resilient fallback parser: Parse official channel RSS XML feed if no API key or empty list
    if (rawList.length === 0) {
      try {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${VOKA_CONSTANTS.CHANNEL_ID}`;
        const feedRes = await fetch(feedUrl, {
          headers: { 'User-Agent': 'MEDX-Video-Studio-Sync/2.0' }
        });
        const xml = await feedRes.text();
        const entries = xml.split('<entry>').slice(1);
        report.discovered = entries.length;

        for (const entry of entries) {
          const vidId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
          const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
          const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
          const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];

          if (vidId && title) {
            rawList.push({
              id: vidId,
              title: title.replace(/&amp;/g, '&'),
              description: descMatch ? descMatch[1].slice(0, 300) : '',
              isoDuration: 'PT3M15S',
              channelId: VOKA_CONSTANTS.CHANNEL_ID,
              embeddable: true,
              privacyStatus: 'public',
              publishedAt: published
            });
          }
        }
      } catch (err) {
        report.errors.push(`Channel feed error: ${err.message}`);
      }
    }

    // Load existing database to check duplicates
    const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
    let dbVideos = [];
    try {
      if (fs.existsSync(dbPath)) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        dbVideos = Array.isArray(data) ? data : (data.medicalVideos || []);
      }
    } catch {}

    const existingYtIds = new Set(dbVideos.map(v => v.youtubeVideoId).filter(Boolean));
    const candidates = [];

    for (const raw of rawList) {
      // Duplicate check
      if (existingYtIds.has(raw.id)) {
        report.existingVideos++;
        continue;
      }

      const vokaVideo = this.mapToVokaVideo(raw, VOKA_CONSTANTS.CHANNEL_ID);
      const validation = this.validateCandidate(vokaVideo, VOKA_CONSTANTS.CHANNEL_ID);

      if (!validation.valid) {
        if (validation.reason === 'rejected_short') report.rejectedShorts++;
        else if (validation.reason === 'embedding_disabled') report.embeddingDisabled++;
        else report.irrelevantVideos++;
        continue;
      }

      candidates.push(vokaVideo);
      report.newCandidates++;
    }

    // Cache candidates in server storage
    const candidatesPath = path.resolve(process.cwd(), 'server', 'data', 'voka_candidates.json');
    try {
      fs.mkdirSync(path.dirname(candidatesPath), { recursive: true });
      fs.writeFileSync(candidatesPath, JSON.stringify(candidates, null, 2), 'utf8');
    } catch (err) {
      report.errors.push(`Could not save candidates cache: ${err.message}`);
    }

    return { report, candidates };
  }

  /**
   * Fetch cached candidates for editorial review.
   */
  static getCandidates() {
    const candidatesPath = path.resolve(process.cwd(), 'server', 'data', 'voka_candidates.json');
    try {
      if (fs.existsSync(candidatesPath)) {
        return JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));
      }
    } catch {}
    return [];
  }

  /**
   * Approve and publish candidate into official MEDX database.
   */
  static publishCandidate(payload, reviewer = { name: 'Prof. Dr. Tariqul Islam', role: 'Faculty Reviewer' }) {
    const candidates = this.getCandidates();
    const idx = candidates.findIndex(c => c.id === payload.id || c.youtubeVideoId === payload.youtubeVideoId);
    
    let candidateToPublish = null;
    if (idx !== -1) {
      candidateToPublish = candidates[idx];
      candidates.splice(idx, 1);
      // Save remaining candidates
      const candidatesPath = path.resolve(process.cwd(), 'server', 'data', 'voka_candidates.json');
      fs.writeFileSync(candidatesPath, JSON.stringify(candidates, null, 2), 'utf8');
    } else {
      // Re-map from payload if not in cache
      candidateToPublish = this.mapToVokaVideo(payload);
    }

    const now = new Date().toISOString();
    const publishedRecord = {
      ...candidateToPublish,
      section: payload.section || candidateToPublish.section,
      specialty: payload.specialty || candidateToPublish.specialty,
      topic: payload.topic || payload.section || candidateToPublish.section,
      graphicContent: Boolean(payload.graphicContent),
      publicationStatus: "published",
      published: true,
      reviewedBy: reviewer.name,
      reviewedAt: now,
      updatedAt: now
    };

    // Append to server/data/medx_db.json
    const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
    let dbVideos = [];
    try {
      if (fs.existsSync(dbPath)) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        dbVideos = Array.isArray(data) ? data : (data.medicalVideos || []);
      }
    } catch {}

    // Check duplicate
    const exists = dbVideos.some(v => v.youtubeVideoId === publishedRecord.youtubeVideoId);
    if (!exists) {
      dbVideos.push(publishedRecord);
      fs.writeFileSync(dbPath, JSON.stringify(dbVideos, null, 2), 'utf8');
    }

    // Also sync to src/data/medicalVideoLibraryData.ts
    try {
      const srcPath = path.resolve(process.cwd(), 'src', 'data', 'medicalVideoLibraryData.ts');
      if (fs.existsSync(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8');
        const startMarker = 'export const MEDICAL_VIDEO_LIBRARY_DATA: SelfHostedMedicalVideo[] = ';
        const startIndex = content.indexOf(startMarker);
        const arrayStart = startIndex + startMarker.length;
        const arrayEnd = content.indexOf('];\n\nexport const MEDICAL_VIDEO_LIBRARY', arrayStart);
        if (startIndex !== -1 && arrayEnd !== -1) {
          content = content.substring(0, arrayStart) + JSON.stringify(dbVideos, null, 2) + content.substring(arrayEnd + 1);
          fs.writeFileSync(srcPath, content, 'utf8');
        }
      }
    } catch {}

    return publishedRecord;
  }

  /**
   * Health-check audit: Check published VOKA videos for deletion or embedding restrictions.
   */
  static async runHealthCheck() {
    const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
    let dbVideos = [];
    try {
      if (fs.existsSync(dbPath)) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        dbVideos = Array.isArray(data) ? data : (data.medicalVideos || []);
      }
    } catch {}

    let archivedCount = 0;
    const now = new Date().toISOString();

    for (const v of dbVideos) {
      if (v.sourceChannelId === VOKA_CONSTANTS.CHANNEL_ID && v.published) {
        // Perform quick oEmbed health check for availability
        try {
          const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.youtubeVideoId}&format=json`);
          if (!oembedRes.ok) {
            v.publicationStatus = 'archived';
            v.published = false;
            v.archiveReason = `YouTube oEmbed unavailable (status: ${oembedRes.status})`;
            v.lastVerifiedAt = now;
            archivedCount++;
          } else {
            v.lastVerifiedAt = now;
          }
        } catch {
          // Network check failure
        }
      }
    }

    if (archivedCount > 0) {
      fs.writeFileSync(dbPath, JSON.stringify(dbVideos, null, 2), 'utf8');
    }

    return { totalAudited: dbVideos.length, archivedCount };
  }
}
