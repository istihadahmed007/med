# MEDX Self-Hosted Medical Video Library

Video Studio (`#video-studio`) is a **self-hosted medical video education platform**. Real, verified public-domain medical videos produced by the U.S. National Library of Medicine (NLM / MedlinePlus) are stored in the project's cloud/server storage and streamed directly into an advanced HTML5 player within MEDX with zero external redirects.

## Cloud & Server Storage Architecture

- **Storage Structure**:
  - `medical-videos/anatomy/`
  - `medical-videos/physiology/`
  - `medical-videos/pathology/`
  - `medical-videos/surgery/`
- **Asset Streaming**:
  - Server (`serve.js`) natively handles HTTP 206 Partial Content (Range requests) for MP4 video streaming, timeline scrubbing, and buffering.
  - Video files and WebVTT caption tracks (`.vtt`) are served locally with CORS and explicit MIME typing.
  - Playback flow: **Cloud Storage → MEDX HTML5 Player** (no external links, no iframes, no third-party tracking).

## Copyright Filter & Public Domain Verification

In compliance with medical copyright guidelines:
- **Prohibited & Filtered Out**:
  - A.D.A.M. Medical Encyclopedia videos (which are copyrighted by A.D.A.M., Inc. on MedlinePlus).
  - Toronto Video Atlas of Surgery (TVASurg), which requires sharing its original case pages.
  - Any unverified synthetic, AI-generated, or placeholder videos.
- **Allowed & Verified**:
  - Official **MedlinePlus Videos** created by the U.S. National Library of Medicine (NLM) / National Institutes of Health (NIH). Under U.S. copyright law and MedlinePlus official policy, these works are in the **Public Domain** and explicitly permit redistribution.
  - Mandatory Attribution: **Source: MedlinePlus, National Library of Medicine**

## Database Records

Stored in `server/data/medx_db.json` under `medicalVideos` and synchronized with the frontend catalog in `src/data/medicalVideoLibraryData.ts`. Each record contains:
- `id`: Unique identifier (e.g. `mp-path-histamine`)
- `title`: Clinical title
- `description`: Educational overview
- `category`: Category (`Pathology`, `Physiology`, `Anatomy`, `Surgery`)
- `anatomy`: Array of anatomical structures
- `specialty`: Medical specialties
- `procedure`: Clinical procedures / diagnostic tests
- `storage_path`: Internal storage path
- `playback_url`: Stable self-hosted playback URL (`/medical-videos/...`)
- `thumbnail_url`: Stable self-hosted poster image (`/medical-videos/...`)
- `duration`: Verified duration string
- `source`: `"MedlinePlus, National Library of Medicine"`
- `license`: `"Public Domain (U.S. Government Work - NLM/NIH)"`
- `attribution`: `"Source: MedlinePlus, National Library of Medicine"`
- `captions_url`: Self-hosted WebVTT captions track
- `created_at`: ISO timestamp

## Initial Verified Collection

1. **Histamine: The Stuff Allergies are Made of** (Pathology — Allergic reaction, Disease mechanisms; 03:34)
2. **Cholesterol: Good and Bad** (Pathology / Physiology — Atherosclerosis, Blood circulation, Heart function; 02:56)
3. **Gluten and Celiac Disease** (Physiology / Pathology — Digestion, Digestive system; 02:47)
4. **Antibiotics vs. Bacteria: Fighting the Resistance** (Pathology — Disease mechanisms, Antimicrobial resistance; 04:50)
5. **How Naloxone Saves Lives in Opioid Overdose** (Physiology — Breathing, Brain, Neuroreceptor antagonism; 04:55)

When a user filters to a category or topic without a verified video (such as Surgery or an unverified organ), the platform strictly shows:
**"No verified video available yet"**
Never creating fake or synthetic placeholder content.

## HTML5 Video Player

Located at `src/components/video-studio/SelfHostedVideoPlayer.tsx`:
- Native HTML5 `<video>` engine streaming from `/medical-videos/...`
- Full control set:
  - Play / Pause (keyboard shortcut: Space/K)
  - Interactive Scrub / Seek bar with buffered range and time tooltip
  - Volume slider and Mute toggle (shortcut: M)
  - Fullscreen toggle (shortcut: F)
  - Playback speed selector (`0.5x`, `0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`)
  - Subtitle / Captions (CC) toggle via native `<track>` element with WebVTT
  - High-resolution poster images
- Interactive timestamped chapter navigation
- Searchable full transcript reader
- Public-domain attribution banner

## Error Handling & Robust JSON Parsing

- The Video Studio no longer depends on broken generation APIs or worker daemons.
- All API requests verify HTTP status and check for `Content-Type: application/json` before parsing.
- HTML responses (e.g. `<!DOCTYPE html>`) are rejected safely without triggering JSON parse errors (`Unexpected token '<'`).
- In offline or disconnected states, the player gracefully falls back to the embedded verified catalog.

## Verification Checklist

- `npm run build`: Passes cleanly.
- `node --test tests/video-atlas.test.mjs`: 6 unit tests passing (database schema, storage paths, copyright filter, empty states, and JSON boundaries).
- `node --test tests/across-books.test.mjs`: 8 regression tests passing.
