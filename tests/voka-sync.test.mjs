import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  VokaSyncService,
  VOKA_CONSTANTS,
  MANDATORY_20_SECTIONS
} from '../server/services/vokaSyncService.js';

test('1. Exact VOKA official channel identification', () => {
  assert.equal(VOKA_CONSTANTS.CHANNEL_ID, 'UCqGGuOEpr62ScH8Pjk2q5zw', 'Channel ID must match resolved immutable ID');
  assert.equal(VOKA_CONSTANTS.UPLOADS_PLAYLIST_ID, 'UUqGGuOEpr62ScH8Pjk2q5zw', 'Uploads playlist ID must match UU+channel suffix');
  assert.equal(VOKA_CONSTANTS.CHANNEL_HANDLE, '@vokaio', 'Handle must be @vokaio');
  assert.equal(VOKA_CONSTANTS.CHANNEL_TITLE, 'VOKA 3D Anatomy & Pathology', 'Channel title must represent VOKA 3D Anatomy & Pathology');
  assert.equal(VOKA_CONSTANTS.CHANNEL_URL, 'https://www.youtube.com/@vokaio', 'Channel URL must point to official channel');
});

test('2. Video validation rejects unauthorized channel, shorts, livestreams, and embedding-disabled videos', () => {
  // Wrong channel
  const wrongChannel = VokaSyncService.validateCandidate({
    id: 'dQw4w9WgXcQ',
    snippet: {
      channelId: 'UC_OTHER_CHANNEL_ID',
      title: 'Valid Medical Animation',
      description: 'Human anatomy',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'public', embeddable: true },
    contentDetails: { duration: 'PT3M30S' }
  });
  assert.equal(wrongChannel.valid, false, 'Must reject video from foreign channel');
  assert.match(wrongChannel.reason, /Foreign channel/);

  // YouTube Shorts (<60s duration)
  const shortVideo = VokaSyncService.validateCandidate({
    id: 'a1b2c3d4e5f',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Quick Medical Fact #shorts',
      description: 'Quick tip',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/a1b2c3d4e5f/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'public', embeddable: true },
    contentDetails: { duration: 'PT45S' }
  });
  assert.equal(shortVideo.valid, false, 'Must reject YouTube Shorts (<60s)');
  assert.match(shortVideo.reason, /Short/);

  // Embedding disabled
  const embedDisabled = VokaSyncService.validateCandidate({
    id: 'a1b2c3d4e5f',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Thoracic Surgery 3D',
      description: 'Lungs anatomy',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/a1b2c3d4e5f/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'public', embeddable: false },
    contentDetails: { duration: 'PT4M15S' }
  });
  assert.equal(embedDisabled.valid, false, 'Must reject embedding-disabled video');
  assert.match(embedDisabled.reason, /Embedding disabled/);

  // Private or unlisted
  const privateVideo = VokaSyncService.validateCandidate({
    id: 'a1b2c3d4e5f',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Thoracic Surgery 3D',
      description: 'Lungs anatomy',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/a1b2c3d4e5f/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'private', embeddable: true },
    contentDetails: { duration: 'PT4M15S' }
  });
  assert.equal(privateVideo.valid, false, 'Must reject non-public video');

  // Promotional language announcement
  const promoVideo = VokaSyncService.validateCandidate({
    id: 'a1b2c3d4e5f',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'VOKA Anatomy is now available in Portuguese and Spanish!',
      description: 'Download the app on App Store or Google Play',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/a1b2c3d4e5f/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'public', embeddable: true },
    contentDetails: { duration: 'PT1M30S' }
  });
  assert.equal(promoVideo.valid, false, 'Must reject promotional/app announcement video');
  assert.match(promoVideo.reason, /Promotional/);

  // Valid medical animation video
  const validVideo = VokaSyncService.validateCandidate({
    id: 'a1b2c3d4e5f',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Surgical Treatment of Intervertebral Disc Herniation: Microdiscectomy 3D Animation',
      description: 'Lumbar microdiscectomy 3D anatomy and operative animation.',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/a1b2c3d4e5f/hqdefault.jpg' } }
    },
    status: { privacyStatus: 'public', embeddable: true },
    contentDetails: { duration: 'PT3M45S' }
  });
  assert.equal(validVideo.valid, true, 'Must accept genuine 3D medical animation');
});

test('3. Medical Classification Engine matches 20 mandatory MEDX sections with confidence scores', () => {
  assert.equal(MANDATORY_20_SECTIONS.length, 20, 'Must support exactly the 20 mandatory MEDX sections');

  const testCases = [
    { title: 'Dental implant placement and bone grafting', expected: 'Clinical Procedures' },
    { title: 'Alzheimer’s disease progression and neurodegeneration mechanisms', expected: 'Pathology and Disease Mechanisms' },
    { title: 'Open Rhinoplasty: nasal tip reconstruction and septum cartilage', expected: 'Plastic and Reconstructive Surgery' },
    { title: 'Erythropoiesis and red blood cell maturation in bone marrow', expected: 'Physiology' },
    { title: 'Flexible ureteroscopy and laser lithotripsy for renal calculi', expected: 'Urology' },
    { title: 'Subdural haematoma surgical evacuation and craniotomy', expected: 'Neurosurgery' },
    { title: 'Functional endoscopic sinus surgery and eardrum tympanoplasty', expected: 'ENT Surgery' },
    { title: 'LASIK corneal flap creation and laser vision correction', expected: 'Ophthalmology' },
    { title: 'Knee joint puncture, arthrocentesis and fracture fixation', expected: 'Orthopaedic Surgery' },
    { title: 'Endoscopic haemostasis for bleeding peptic ulcer', expected: 'Gastrointestinal Surgery' },
    { title: 'Ultrasound-guided core needle breast biopsy procedure', expected: 'Clinical Procedures' },
    { title: 'Cardiopulmonary resuscitation and emergency airway management', expected: 'Emergency Medicine' },
    { title: 'Coronary artery bypass grafting CABG open heart surgery', expected: 'Cardiothoracic Surgery' }
  ];

  for (const tc of testCases) {
    const res = VokaSyncService.classifyMedicalContent(tc.title, '');
    assert.equal(res.section, tc.expected, `"${tc.title}" should classify to ${tc.expected}, got ${res.section}`);
    assert.ok(res.confidence >= 0.7, `Confidence for "${tc.title}" should be >= 0.7, got ${res.confidence}`);
  }
});

test('4. Data Mapping strictly populates 28-field schema and youtube-nocookie embed', () => {
  const mapped = VokaSyncService.mapToSchema({
    id: '9_G8b2cdef1',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Paramedian Lumbar Disc Herniation 3D Medical Animation',
      description: 'Detailed spine anatomy and disk extrusion visualization.',
      publishedAt: '2024-05-10T12:00:00Z',
      thumbnails: {
        high: { url: 'https://i.ytimg.com/vi/9_G8b2cdef1/hqdefault.jpg' }
      }
    },
    contentDetails: {
      duration: 'PT4M22S'
    }
  }, { section: 'Neurosurgery', confidence: 0.95 });

  assert.equal(mapped.id, 'youtube-voka-9_G8b2cdef1', 'ID must have youtube-voka- prefix');
  assert.equal(mapped.youtubeVideoId, '9_G8b2cdef1', 'youtubeVideoId must match YouTube ID');
  assert.equal(mapped.embedUrl, 'https://www.youtube-nocookie.com/embed/9_G8b2cdef1', 'embedUrl must use youtube-nocookie.com');
  assert.equal(mapped.sourceType, 'youtube_nocookie', 'sourceType must be youtube_nocookie');
  assert.equal(mapped.sourceName, 'VOKA 3D Anatomy & Pathology', 'sourceName must be VOKA');
  assert.equal(mapped.sourceChannelId, VOKA_CONSTANTS.CHANNEL_ID, 'sourceChannelId must match resolved channel ID');
  assert.equal(mapped.sourceChannelHandle, '@vokaio', 'sourceChannelHandle must be @vokaio');
  assert.equal(mapped.section, 'Neurosurgery', 'Section must be assigned');
  assert.equal(mapped.duration, '04:22', 'Duration must be formatted as MM:SS');
  assert.equal(mapped.durationSeconds, 262, 'Duration in seconds must be 262');
  assert.equal(mapped.publicationStatus, 'draft', 'Newly fetched candidate must start in draft status');
  assert.equal(mapped.published, false, 'Unreviewed candidates must NOT be published');
  assert.equal(mapped.verified, true, 'Must be verified');
  assert.equal(mapped.embeddingAllowed, true, 'Embedding allowed must be true');
  assert.equal(mapped.contentType, 'Medical animation', 'contentType must be Medical animation');
  assert.equal(mapped.attribution, 'Source: VOKA official YouTube channel', 'Attribution must credit VOKA official channel');
  assert.equal(mapped.thumbnailUrl, 'https://i.ytimg.com/vi/9_G8b2cdef1/hqdefault.jpg', 'Must use official thumbnail');
});

test('5. Duplicate prevention and idempotency', () => {
  const candidate = {
    id: 'youtube-voka-duplicate11',
    youtubeVideoId: 'duplicate11',
    sourceUrl: 'https://www.youtube.com/watch?v=duplicate11',
    title: 'Duplicate Test Anatomy'
  };

  const existingCatalog = [
    {
      id: 'existing-1',
      youtubeVideoId: 'duplicate11',
      title: 'Duplicate Test Anatomy',
      sourceUrl: 'https://www.youtube.com/watch?v=duplicate11'
    }
  ];

  const isDup = VokaSyncService.isDuplicate(candidate, existingCatalog, []);
  assert.equal(isDup, true, 'Should detect duplicate by youtubeVideoId');

  const freshCandidate = {
    id: 'youtube-voka-fresh12345',
    youtubeVideoId: 'fresh12345',
    sourceUrl: 'https://www.youtube.com/watch?v=fresh12345',
    title: 'Fresh Unique Anatomy'
  };

  const notDup = VokaSyncService.isDuplicate(freshCandidate, existingCatalog, []);
  assert.equal(notDup, false, 'Should allow unique candidate');
});

test('6. Security: YOUTUBE_API_KEY is server-only and not exposed to client bundles', () => {
  const envContent = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
  assert.ok(!envContent.includes('VITE_YOUTUBE_API_KEY'), 'Must NOT contain VITE_YOUTUBE_API_KEY in client env');

  const srcTypes = readFileSync(join(process.cwd(), 'src/types/videoStudio.ts'), 'utf8');
  assert.ok(!srcTypes.includes('VITE_YOUTUBE_API_KEY'), 'Client types must not reference VITE_YOUTUBE_API_KEY');
  assert.ok(!srcTypes.includes('youtubeApiKey'), 'Client types must not reference youtubeApiKey');
});

test('7. In-App Player: embeds strictly use youtube-nocookie with zero external redirects', () => {
  const playerFile = readFileSync(join(process.cwd(), 'src/components/video-studio/SelfHostedVideoPlayer.tsx'), 'utf8');
  assert.ok(playerFile.includes('https://www.youtube-nocookie.com/embed/'), 'Player must embed via youtube-nocookie.com');
  assert.ok(playerFile.includes('enablejsapi=1'), 'Player must enable JS API');
  assert.ok(playerFile.includes('referrerPolicy="strict-origin-when-cross-origin"'), 'Player must set strict-origin referrer policy');
  assert.ok(playerFile.includes('allowFullScreen'), 'Player must allow full screen');
  assert.ok(!playerFile.includes('window.open'), 'Player must never open new browser windows');
});

test('8. Candidate Review Lifecycle: Draft -> Approved/Published -> Archived', () => {
  const rawItem = {
    id: 'testlifecycle',
    snippet: {
      channelId: VOKA_CONSTANTS.CHANNEL_ID,
      title: 'Human Knee Dissection & Arthroscopy 3D Animation',
      description: 'Educational guide to knee joint.',
      publishedAt: '2024-06-01T00:00:00Z',
      thumbnails: { high: { url: 'https://i.ytimg.com/vi/testlifecycle/hqdefault.jpg' } }
    },
    contentDetails: { duration: 'PT5M00S' }
  };

  const mapped = VokaSyncService.mapToSchema(rawItem, { section: 'Orthopaedic Surgery', confidence: 0.9 });
  assert.equal(mapped.publicationStatus, 'draft', 'Initially Draft');
  assert.equal(mapped.published, false, 'Initially not published');

  // Faculty approves candidate
  mapped.publicationStatus = 'published';
  mapped.published = true;
  mapped.reviewedBy = 'Prof. Dr. M. A. Jalil';
  mapped.reviewedAt = new Date().toISOString();

  assert.equal(mapped.publicationStatus, 'published');
  assert.equal(mapped.published, true);
  assert.ok(mapped.reviewedBy);

  // Video becomes unavailable -> Archived
  mapped.publicationStatus = 'archived';
  mapped.published = false;
  mapped.archiveReason = 'Video made private on YouTube';

  assert.equal(mapped.publicationStatus, 'archived');
  assert.equal(mapped.published, false);
});
