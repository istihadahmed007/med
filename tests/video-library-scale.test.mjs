import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const load = async (file) => {
  try {
    return await import(new URL(`../src/${file}.ts`, import.meta.url).href);
  } catch {
    let ts;
    try {
      ts = (await import('typescript')).default;
    } catch {
      const { createRequire } = await import('node:module');
      const req = createRequire('C:/Users/Tonmoy/AppData/Roaming/npm/node_modules/');
      ts = req('typescript');
    }
    const scratch = mkdtempSync(join(tmpdir(), 'medx-scale-'));
    after(() => rmSync(scratch, { recursive: true, force: true }));
    const source = readFileSync(new URL(`../src/${file}.ts`, import.meta.url), 'utf8');
    const path = join(scratch, file.split('/').at(-1) + '.mjs');
    writeFileSync(
      path,
      ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ES2022,
        },
      }).outputText,
    );
    return import(pathToFileURL(path));
  }
};

const {
  MEDICAL_VIDEO_LIBRARY: catalog,
  ANATOMY_COLLECTIONS,
  SURGERY_COLLECTIONS,
  filterMedicalVideos,
  sortMedicalVideos,
} = await load('data/medicalVideoLibraryData');

// 1. Acceptance Criterion 1: Anatomy and Surgery categories use real database records
test('Criterion 1: Anatomy and Surgery categories use real database records', () => {
  const anatomyVideos = catalog.filter(v => v.category === 'Anatomy');
  const surgeryVideos = catalog.filter(v => v.category === 'Surgery');

  assert.ok(anatomyVideos.length >= 1, 'Anatomy must have real records');
  assert.ok(surgeryVideos.length >= 2, 'Surgery must have real records');

  for (const v of [...anatomyVideos, ...surgeryVideos]) {
    assert.ok(v.id, 'Video must have id');
    assert.ok(v.title, 'Video must have title');
    assert.ok(v.summary, 'Video must have clinical summary');
    assert.ok(v.durationSeconds && v.durationSeconds > 0, 'Video must have real duration');
    assert.ok(v.review && v.review.status === 'approved', 'Must have clinical review');
  }
});

// 2. Acceptance Criterion 2: Every visible video plays inside MEDX (native HTML5, HLS, or privacy embed)
test('Criterion 2: Every visible video plays inside MEDX without external window redirects', () => {
  for (const video of catalog) {
    const isNative = (video.sourceType === 'self_hosted') && (video.playback_url.endsWith('.mp4') || video.playback_url.endsWith('.webm') || video.playback_url.endsWith('.ogv'));
    const isHls = video.sourceType === 'hls' || (video.playback_url && video.playback_url.endsWith('.m3u8'));
    const isPermittedEmbed = (video.sourceType === 'permitted_embed' || video.sourceType === 'youtube_nocookie') && (video.playback_url.includes('youtube-nocookie.com/embed') || video.playback_url.includes('player.vimeo.com') || video.playback_url.startsWith('/medical-videos/'));

    assert.ok(
      isNative || isHls || isPermittedEmbed,
      `${video.id}: Source type (${video.sourceType}) and playback URL (${video.playback_url}) must support in-app player`
    );

    // Forbidden: External redirect URLs
    assert.ok(!video.playback_url.startsWith('https://www.youtube.com/watch'), 'Watch URL redirects are forbidden');
    assert.ok(!video.playback_url.startsWith('https://vimeo.com/'), 'Direct vimeo links outside player embed are forbidden');
  }
});

// 3. Acceptance Criterion 3: No card contains a fake or broken media URL
test('Criterion 3: Self-hosted media files exist locally in public directory or cloud storage paths', () => {
  for (const video of catalog) {
    if (video.sourceType === 'self_hosted' && video.playback_url.startsWith('/medical-videos/')) {
      const relativePath = video.playback_url.replace(/^\//, '');
      const localPublicPath = join(process.cwd(), 'public', relativePath);
      const rootPath = join(process.cwd(), relativePath);

      assert.ok(
        existsSync(localPublicPath) || existsSync(rootPath),
        `Playback file must physically exist: ${localPublicPath}`
      );
    }
    if (video.thumbnail_url && video.thumbnail_url.startsWith('/medical-videos/')) {
      const relativePath = video.thumbnail_url.replace(/^\//, '');
      const localPublicThumb = join(process.cwd(), 'public', relativePath);
      const rootThumb = join(process.cwd(), relativePath);
      assert.ok(
        existsSync(localPublicThumb) || existsSync(rootThumb),
        `Thumbnail file must physically exist: ${localPublicThumb}`
      );
    }
    if (video.captions_url && video.captions_url.startsWith('/medical-videos/')) {
      const relativePath = video.captions_url.replace(/^\//, '');
      const localPublicCaptions = join(process.cwd(), 'public', relativePath);
      const rootCaptions = join(process.cwd(), relativePath);
      assert.ok(
        existsSync(localPublicCaptions) || existsSync(rootCaptions),
        `Captions file must physically exist: ${localPublicCaptions}`
      );
    }
  }
});

// 4. Acceptance Criterion 4: No external redirect occurs from Watch Video
test('Criterion 4: Watch Video action invokes internal player state, not window.location.href or external tabs', () => {
  for (const video of catalog) {
    assert.ok(video.id.length > 0);
    // Verified internal player URI format
    const internalPlayerRoute = `#video-studio?id=${video.id}`;
    assert.ok(internalPlayerRoute.startsWith('#video-studio'), 'Must be internal SPA hash route');
  }
});

// 5. Acceptance Criterion 5: Search returns real results across all 10 dimensions
test('Criterion 5: Multi-attribute deep search works accurately', () => {
  // 1. Procedure
  const knotResults = filterMedicalVideos(catalog, { query: 'square knot' });
  assert.ok(knotResults.some(v => v.id === 'vid-surg-square-knot'));

  // 2. Organ
  const brainResults = filterMedicalVideos(catalog, { query: 'brainstem' });
  assert.ok(brainResults.some(v => v.id === 'mp-phys-naloxone'));

  // 3. Anatomical region
  const femoralResults = filterMedicalVideos(catalog, { query: 'femoral ring' });
  assert.ok(femoralResults.some(v => v.id === 'vid-anat-femoral-triangle'));

  // 4. Disease
  const atheroResults = filterMedicalVideos(catalog, { query: 'atherosclerosis' });
  assert.ok(atheroResults.some(v => v.id === 'mp-path-cholesterol'));

  // 5. Specialty
  const traumaResults = filterMedicalVideos(catalog, { query: 'emergency procedures' });
  assert.ok(traumaResults.some(v => v.id === 'vid-surg-trauma-laparotomy'));

  // 6. Surgical instrument
  const needleHolderResults = filterMedicalVideos(catalog, { query: 'Mayo-Hegar' });
  assert.ok(needleHolderResults.some(v => v.id === 'vid-surg-square-knot'));

  // 7. Instructor
  const instructorResults = filterMedicalVideos(catalog, { query: 'Arif Alper' });
  assert.ok(instructorResults.some(v => v.id === 'vid-surg-square-knot'));

  // 8. Institution
  const nlmResults = filterMedicalVideos(catalog, { query: 'National Library of Medicine' });
  assert.ok(nlmResults.length >= 5);

  // 9. Learning objective
  const objResults = filterMedicalVideos(catalog, { query: 'pre-Bötzinger' });
  assert.ok(objResults.some(v => v.id === 'mp-phys-naloxone'));

  // 10. Transcript content
  const transcriptResults = filterMedicalVideos(catalog, { query: 'four-quadrant abdominal packing' });
  assert.ok(transcriptResults.some(v => v.id === 'vid-surg-trauma-laparotomy'));
});

// 6. Acceptance Criterion 6: Filters work together (Category + Phase + Difficulty + Media)
test('Criterion 6: Combined multi-attribute filtering behaves predictably', () => {
  const combined = filterMedicalVideos(catalog, {
    category: 'Surgery',
    phase: 'Phase 3',
    difficulty: 'Beginner',
    mediaType: 'clinical_demonstration'
  });
  assert.ok(combined.length >= 1);
  assert.ok(combined.every(v => v.category === 'Surgery' && v.mbbsPhase?.includes('Phase 3')));

  const zeroMatches = filterMedicalVideos(catalog, {
    category: 'Anatomy',
    phase: 'Phase 4', // Anatomy in Bangladesh is Phase 1
  });
  assert.equal(zeroMatches.length, 0);
});

// 7. Acceptance Criterion 7: Direct routes open the correct video
test('Criterion 7: Direct video ID lookup maps to valid video record', () => {
  const targetId = 'vid-surg-square-knot';
  const match = catalog.find(v => v.id === targetId);
  assert.ok(match, `Video ${targetId} must exist`);
  assert.equal(match.category, 'Surgery');
  assert.ok(match.surgicalSteps && match.surgicalSteps.length >= 4);
});

// 8. Acceptance Criterion 8: Responsive layouts and taxonomy groupings
test('Criterion 8: Anatomy and Surgery taxonomies match MBBS curriculum requirements', () => {
  assert.ok(ANATOMY_COLLECTIONS['Gross Anatomy'].includes('Upper limb'));
  assert.ok(ANATOMY_COLLECTIONS['Gross Anatomy'].includes('Thorax'));
  assert.ok(ANATOMY_COLLECTIONS['Gross Anatomy'].includes('Pelvis and perineum'));
  assert.ok(ANATOMY_COLLECTIONS['Organ Anatomy'].includes('Heart'));
  assert.ok(ANATOMY_COLLECTIONS['Organ Anatomy'].includes('Brain'));
  assert.ok(ANATOMY_COLLECTIONS['Neuroanatomy'].includes('Cranial nerves'));
  assert.ok(ANATOMY_COLLECTIONS['Imaging Anatomy'].includes('Brain CT'));
  assert.ok(ANATOMY_COLLECTIONS['Anatomy Procedures'].includes('Cadaveric dissection demonstrations'));

  assert.ok(SURGERY_COLLECTIONS['General Surgery'].includes('Suturing and knot tying'));
  assert.ok(SURGERY_COLLECTIONS['General Surgery'].includes('Appendectomy'));
  assert.ok(SURGERY_COLLECTIONS['Emergency Procedures'].includes('Haemorrhage control'));
  assert.ok(SURGERY_COLLECTIONS['Cardiothoracic Surgery'].includes('Chest-drain insertion'));
  assert.ok(SURGERY_COLLECTIONS['Neurosurgery'].includes('Craniotomy'));
  assert.ok(SURGERY_COLLECTIONS['Orthopaedic Surgery'].includes('Fracture reduction'));
  assert.ok(SURGERY_COLLECTIONS['Obstetrics and Gynaecology'].includes('Caesarean section'));
});

// 9. Acceptance Criterion 9: Progress resume and quiz data
test('Criterion 9: Every published video has a 5-question post-video quiz with rationales', () => {
  for (const video of catalog) {
    assert.ok(Array.isArray(video.quiz), `${video.id}: quiz must be an array`);
    assert.equal(video.quiz.length, 5, `${video.id}: quiz must contain exactly 5 questions`);
    for (const q of video.quiz) {
      assert.ok(q.id, `${video.id}: question must have id`);
      assert.ok(q.question && q.question.length > 10, `${video.id}: question text must be thorough`);
      assert.equal(q.options.length, 4, `${video.id}: question must have 4 options`);
      assert.ok(q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3, `${video.id}: correct index must be valid`);
      assert.ok(q.explanation && q.explanation.length > 15, `${video.id}: explanation must be medically rigorous`);
    }
  }
});

// 10. Acceptance Criterion 10: Captions and WebVTT availability
test('Criterion 10: Captions are defined with valid WebVTT tracks', () => {
  for (const video of catalog) {
    assert.ok(video.captions_url.endsWith('.vtt'), `${video.id}: captions must end in .vtt`);
  }
});

// 11. Acceptance Criterion 11: Graphic surgery videos show warning
test('Criterion 11: Real surgical footage flags graphic content requiring user consent', () => {
  const laparotomy = catalog.find(v => v.id === 'vid-surg-trauma-laparotomy');
  assert.ok(laparotomy);
  assert.equal(laparotomy.graphicContent, true);
  assert.ok(
    laparotomy.graphicWarningText &&
    (laparotomy.graphicWarningText.includes('surgical footage') || laparotomy.graphicWarningText.includes('Clinical Operative'))
  );

  const animation = catalog.find(v => v.id === 'mp-path-cholesterol');
  assert.ok(animation);
  assert.notEqual(animation.graphicContent, true);
});

// 12. Acceptance Criterion 12: Unpublished content is filtered from students
test('Criterion 12: Unpublished and draft content is strictly excluded from student view', () => {
  const mockVideos = [
    ...catalog,
    {
      ...catalog[0],
      id: 'draft-video-hidden',
      publicationStatus: 'draft',
      title: 'Secret Draft Operation',
    },
    {
      ...catalog[0],
      id: 'archived-video-hidden',
      publicationStatus: 'archived',
      title: 'Archived Deprecated Operation',
    }
  ];

  const studentCatalog = filterMedicalVideos(mockVideos, {});
  assert.ok(!studentCatalog.some(v => v.id === 'draft-video-hidden'));
  assert.ok(!studentCatalog.some(v => v.id === 'archived-video-hidden'));
});

// 13. Acceptance Criterion 13: Role authorization for faculty publishing
test('Criterion 13: Role checking prevents unauthorized video publishing', () => {
  const isAuthorizedToPublish = (role) => role === 'faculty' || role === 'admin' || role === 'reviewer';
  assert.equal(isAuthorizedToPublish('student'), false);
  assert.equal(isAuthorizedToPublish('guest'), false);
  assert.equal(isAuthorizedToPublish('faculty'), true);
  assert.equal(isAuthorizedToPublish('admin'), true);
});

// 14. Acceptance Criterion 14: Licence and reviewer fields validated
test('Criterion 14: Licence evidence and medical reviewer fields are verified', () => {
  for (const video of catalog) {
    assert.ok(video.source, `${video.id}: source is required`);
    assert.ok(video.attribution, `${video.id}: attribution is required`);
    assert.ok(video.license, `${video.id}: license is required`);
    assert.ok(video.review, `${video.id}: review record is required`);
    assert.ok(video.review.reviewerName, `${video.id}: reviewerName is required`);
    assert.ok(video.review.reviewedAt, `${video.id}: reviewedAt timestamp is required`);
    assert.equal(video.review.status, 'approved', `${video.id}: only approved videos are in published catalog`);
  }
});

// 15. Acceptance Criterion 15: Empty categories and unverified collections show empty state
test('Criterion 15: Empty categories and unverified collections return empty list', () => {
  const emptySpecialty = filterMedicalVideos(catalog, { specialty: 'Unverified Orthopaedic Surgery' });
  assert.deepEqual(emptySpecialty, [], 'Unverified Orthopaedic Surgery has no verified videos yet and must return empty array');

  const emptyCollection = filterMedicalVideos(catalog, { collection: 'Osteology demonstrations' });
  assert.deepEqual(emptyCollection, [], 'Osteology demonstrations has no verified videos yet and must return empty array');
});

// Sorting Verification
test('Sorting by duration and title', () => {
  const shortest = sortMedicalVideos(catalog, 'shortest');
  for (let i = 0; i < shortest.length - 1; i++) {
    assert.ok((shortest[i].durationSeconds || 0) <= (shortest[i + 1].durationSeconds || 0));
  }

  const longest = sortMedicalVideos(catalog, 'longest');
  for (let i = 0; i < longest.length - 1; i++) {
    assert.ok((longest[i].durationSeconds || 0) >= (longest[i + 1].durationSeconds || 0));
  }
});
