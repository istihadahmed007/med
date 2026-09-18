import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const load = async (file) => {
  try {
    return await import(new URL(`../src/${file}.ts`, import.meta.url).href);
  } catch {
    let ts;
    try {
      ts = (await import("typescript")).default;
    } catch {
      const { createRequire } = await import("node:module");
      const req = createRequire("C:/Users/Tonmoy/AppData/Roaming/npm/node_modules/");
      ts = req("typescript");
    }
    const scratch = mkdtempSync(join(tmpdir(), "medx-video-"));
    after(() => rmSync(scratch, { recursive: true, force: true }));
    const source = readFileSync(
      new URL(`../src/${file}.ts`, import.meta.url),
      "utf8",
    );
    const path = join(scratch, file.split("/").at(-1) + ".mjs");
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

const { safeFetchJson } = await load("services/videoStudioHttp");
const {
  MEDICAL_VIDEO_LIBRARY: videos,
  VIDEO_CATEGORIES,
  filterMedicalVideos,
  getRelatedVideos,
} = await load("data/medicalVideoLibraryData");

test("all video records contain required database fields and valid schema", () => {
  assert.ok(videos.length > 0, "Catalog must contain verified records");
  const REQUIRED_FIELDS = [
    "id",
    "title",
    "description",
    "category",
    "anatomy",
    "specialty",
    "procedure",
    "storage_path",
    "playback_url",
    "thumbnail_url",
    "duration",
    "source",
    "license",
    "attribution",
    "captions_url",
    "created_at",
  ];

  for (const video of videos) {
    for (const field of REQUIRED_FIELDS) {
      assert.ok(
        video[field] !== undefined && video[field] !== null && video[field] !== "",
        `Video ${video.id} must have non-empty field: ${field}`
      );
    }
    assert.ok(Array.isArray(video.anatomy), `${video.id}: anatomy must be an array`);
    assert.ok(Array.isArray(video.specialty), `${video.id}: specialty must be an array`);
    assert.ok(Array.isArray(video.procedure), `${video.id}: procedure must be an array`);
    assert.ok(Array.isArray(video.topics), `${video.id}: topics must be an array`);
  }
});

test("cloud storage paths and playback URLs follow self-hosted organization", () => {
  const ALLOWED_STORAGE_DIRS = [
    "medical-videos/anatomy/",
    "medical-videos/physiology/",
    "medical-videos/pathology/",
    "medical-videos/surgery/",
  ];

  for (const video of videos) {
    // Check storage_path matches medical-videos/{category}/...
    const matchesDir = ALLOWED_STORAGE_DIRS.some((dir) =>
      video.storage_path.startsWith(dir)
    );
    assert.ok(
      matchesDir,
      `Video ${video.id} storage_path (${video.storage_path}) must start with an allowed storage dir`
    );

    // Check playback_url is local/self-hosted (starts with /medical-videos/)
    assert.ok(
      video.playback_url.startsWith("/medical-videos/"),
      `Video ${video.id} playback_url must be self-hosted, got ${video.playback_url}`
    );
    assert.ok(
      !video.playback_url.startsWith("http://") && !video.playback_url.startsWith("https://"),
      `Video ${video.id} playback_url must not redirect to external domains`
    );

    // Check thumbnail_url is self-hosted
    assert.ok(
      video.thumbnail_url.startsWith("/medical-videos/"),
      `Video ${video.id} thumbnail_url must be self-hosted, got ${video.thumbnail_url}`
    );

    // Check captions_url is self-hosted WebVTT
    assert.ok(
      video.captions_url.startsWith("/medical-videos/") && video.captions_url.endsWith(".vtt"),
      `Video ${video.id} captions_url must be self-hosted .vtt, got ${video.captions_url}`
    );
  }
});

test("copyright filter and mandatory attribution compliance", () => {
  for (const video of videos) {
    // Attribution must strictly follow the required NLM format
    assert.equal(
      video.attribution,
      "Source: MedlinePlus, National Library of Medicine",
      `${video.id}: attribution must match required string`
    );

    // License must be public domain or explicit redistribution
    assert.ok(
      video.license.toLowerCase().includes("public domain"),
      `${video.id}: license must be public domain`
    );

    // Ensure no copyrighted ADAM or TVASurg records are stored
    assert.ok(
      !video.source.toLowerCase().includes("a.d.a.m"),
      `${video.id}: copyrighted ADAM material must not be re-hosted`
    );
    assert.ok(
      !video.source.toLowerCase().includes("tvasurg"),
      `${video.id}: TVASurg videos must not be re-hosted`
    );
  }
});

test("search, category filtering, and empty state when unverified", () => {
  // Query search
  const allergyResults = filterMedicalVideos(videos, { query: "histamine" });
  assert.ok(allergyResults.length > 0);
  assert.equal(allergyResults[0].id, "mp-path-histamine");

  const atheroResults = filterMedicalVideos(videos, { query: "atherosclerosis" });
  assert.ok(atheroResults.length > 0);
  assert.equal(atheroResults[0].id, "mp-path-cholesterol");

  // Category search
  const pathologyResults = filterMedicalVideos(videos, { category: "Pathology" });
  assert.ok(pathologyResults.length >= 2);

  const physiologyResults = filterMedicalVideos(videos, { category: "Physiology" });
  assert.ok(physiologyResults.length >= 2);

  // Unverified categories must return empty so UI displays "No verified video available yet"
  const surgeryResults = filterMedicalVideos(videos, { category: "Surgery" });
  assert.deepEqual(
    surgeryResults,
    [],
    "Surgery must return empty array rather than fake records"
  );

  const anatomyResults = filterMedicalVideos(videos, { category: "Anatomy" });
  assert.deepEqual(
    anatomyResults,
    [],
    "Anatomy must return empty array when no verified public-domain video is added"
  );

  // Related videos must never include the video itself
  for (const video of videos) {
    const related = getRelatedVideos(video, videos);
    assert.ok(related.every((r) => r.id !== video.id));
  }
});

test("JSON boundary handles HTTP failures, HTML responses, and CORS errors safely", async (t) => {
  const original = global.fetch;
  t.after(() => (global.fetch = original));

  for (const [status, type, body, expected] of [
    [200, "text/html", "<!DOCTYPE html>secret", "format"],
    [404, "text/html", "<!DOCTYPE html>secret", "http"],
    [500, "application/json", '{"error":"secret"}', "http"],
    [200, "application/json", "<!DOCTYPE html>secret", "format"],
    [200, "application/json", "{invalid secret", "format"],
  ]) {
    global.fetch = async () =>
      new Response(body, { status, headers: { "Content-Type": type } });
    const result = await safeFetchJson("/api/video-studio/library");
    assert.equal(result.ok, false);
    assert.equal(result.status, status);
    assert.equal(result.kind, expected);
    assert.equal(result.data, null);
    assert.ok(!JSON.stringify(result).includes("secret"));
  }

  global.fetch = async () => {
    throw new TypeError("Failed to fetch: secret");
  };
  assert.equal(
    (await safeFetchJson("/api/video-studio/library")).kind,
    "network"
  );

  global.fetch = async () =>
    new Response('{"ok":true}', {
      headers: { "Content-Type": "application/problem+json; charset=utf-8" },
    });
  assert.deepEqual((await safeFetchJson("/api/video-studio/library")).data, {
    ok: true,
  });
});

test("timeout covers slow body reads and caller cancellation", async (t) => {
  const original = global.fetch;
  t.after(() => (global.fetch = original));

  global.fetch = async (_url, { signal }) => ({
    ok: true,
    status: 200,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: () =>
      new Promise((_resolve, reject) => {
        if (signal.aborted) reject(new Error("aborted"));
        else
          signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
      }),
  });

  assert.equal(
    (await safeFetchJson("/api/video-studio/library", {}, 10)).kind,
    "timeout"
  );

  const controller = new AbortController();
  controller.abort();
  assert.equal(
    (
      await safeFetchJson("/api/video-studio/library", {
        signal: controller.signal,
      })
    ).kind,
    "cancelled"
  );
});
