# MEDX Medical Video Atlas

Video Studio (`#video-studio`) now renders a curated TypeScript catalog, not generated video jobs or API results. Detail links use `#video-studio/<id>` and support browser navigation. Search intersects category, anatomy, procedure, specialty and topic filters. Unverified categories produce an explicit empty state.

## Content verification and playback

Six official video pages were checked on 2026-09-18. Evidence URLs and notes are stored with each record in `src/data/medicalVideoLibraryData.ts`. Titles identify the real source videos; brief descriptions and classifications are MEDX editorial summaries. No accreditation or peer-review claim is made about MEDX.

- MedlinePlus: Brain components, Breathing, Kidney stones, Heart bypass surgery.
- Toronto Video Atlas of Surgery: Laparoscopic common bile duct exploration, Standard laparoscopic cholecystectomy.

All six currently use official source links. No approved third-party embed was confirmed, so none is activated. Playback, volume, timeline, speed, fullscreen and captions are controlled by the source player and may vary by provider. The UI supports allowlisted official YouTube embeds for future records only after ownership and embedding permission are checked. A loaded iframe does not prove successful playback: source links remain visible, with delayed troubleshooting guidance.

MedlinePlus/A.D.A.M. media, thumbnails, transcripts and captions are not downloaded, copied, proxied, or embedded. Their duration and caption availability remain null. The Toronto bile duct thumbnail is the real image linked from its official laparoscopic category page; it is loaded from the owner, not copied into this repository. A failed image is replaced with a text-only unavailable-preview state, never substitute medical imagery. Missing durations are explicitly labeled, not estimated from chapter timestamps.

To add content: verify the exact official video page, title, provider, playback permissions, thumbnail association, and any claimed duration/captions. Set unknown fields to null. Preserve the evidence URL and verification date. Records marked pending/unavailable or with unsupported origins never render. Recheck source availability periodically; this catalog is not a live availability guarantee. Never add generated medical scenes or dummy media to fill a category.

## JSON failure investigation

Inspected baseline: cc13d80. The current baseline hub already renders a local library and does not fetch JSON. Its safe parser already catches HTML, so the user's exact historical visible crash could not be reproduced in that revision. Earlier service revisions requested GET `/api/video-studio/jobs` and GET `/api/video-studio/published`; the original helper exposed `err.message` in its catch. The remaining legacy lesson player uses GET/POST `/api/video-studio/progress`, with studentId/videoId query parameters for GET. Generation previously POSTed `/api/video-studio/jobs`.

Confirmed with Vite's production preview on the built app:

| Request | Status | Content-Type | Body prefix |
| --- | --- | --- | --- |
| GET /api/video-studio/jobs | 200 | text/html | `<!DOCTYPE html>` |
| GET /api/video-studio/published | 200 | text/html | `<!DOCTYPE html>` |
| GET /api/video-studio/progress?studentId=test&videoId=test | 200 | text/html | `<!DOCTYPE html>` |

`vite.config.js` contains a development-only API middleware. It does not ship as a production backend; a static SPA server falls back to index.html. Live-host API responses could not be inspected in this environment, so this is a production-preview reproduction, not a claim about a captured live browser request.

The atlas has no catalog fetch and imports no video-generation service, canvas, synthetic subtitles, timelines, or media fallback. The legacy service's fake timed job completion and fabricated generated-video output were removed; queueJob now explicitly rejects generation. Other lesson features, anatomy viewers, templates and existing stored data remain intact outside Video Studio.

The remaining shared legacy video-service requests use `videoStudioHttp.ts`: check HTTP status before parsing, require JSON Content-Type (including application/*+json), reject HTML even when mislabeled, sanitize all failures, and keep timeout active through body consumption. Browser network/CORS failures share a safe message because fetch cannot distinguish them. Caller cancellation is preserved. No raw server error body reaches the UI.

## Verification

- `npm run build` — passes (existing large-bundle warning remains).
- `node --test tests/video-atlas.test.mjs` — 5 tests pass: source admission, copyright boundaries, intersecting filters, JSON/HTML/404/500/CORS handling, slow-body timeout and cancellation.
- `npm run test:across-books` — 8 existing regression tests pass.
- No dependencies, global styles, application navigation, or data outside the video service/catalog changed.
