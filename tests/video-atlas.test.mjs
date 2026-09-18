import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
const scratch = mkdtempSync(join(tmpdir(), "medx-video-"));
after(() => rmSync(scratch, { recursive: true, force: true }));
const load = async (file) => {
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
};
const { safeFetchJson } = await load("services/videoStudioHttp");
const {
  MEDICAL_VIDEO_LIBRARY: videos,
  filterMedicalVideos,
  getRelatedVideos,
  isVerifiedVideo,
} = await load("data/medicalVideoLibraryData");
test("catalog rejects unverified, unsafe or inconsistent sources", () => {
  assert.ok(videos.length > 0);
  assert.equal(new Set(videos.map((v) => v.id)).size, videos.length);
  for (const v of videos) assert.ok(isVerifiedVideo(v));
  for (const patch of [
    { verification: { ...videos[0].verification, status: "pending" } },
    { sourceUrl: "javascript:alert(1)" },
    { sourceUrl: "https://fake.example/video" },
    { embedUrl: "https://fake.example/embed" },
  ]) {
    assert.equal(isVerifiedVideo({ ...videos[0], ...patch }), false);
    assert.deepEqual(filterMedicalVideos([{ ...videos[0], ...patch }], {}), []);
  }
});
test("MedlinePlus media is link-only with no fabricated metadata", () => {
  for (const v of videos.filter((v) =>
    v.sourceUrl.includes("medlineplus.gov"),
  )) {
    assert.equal(v.embedUrl, null);
    assert.equal(v.thumbnail, null);
    assert.equal(v.duration, null);
    assert.equal(v.captions, null);
  }
});
test("search and intersecting anatomy / procedure / specialty filters", () => {
  assert.ok(
    filterMedicalVideos(videos, { query: "  BRAIN components " }).some(
      (v) => v.id === "brain-components",
    ),
  );
  assert.deepEqual(
    filterMedicalVideos(videos, {
      anatomy: "Heart",
      procedure: "Heart Bypass",
      specialty: "Cardiac Surgery",
    }).map((v) => v.id),
    ["heart-bypass"],
  );
  assert.deepEqual(
    filterMedicalVideos(videos, { anatomy: "Heart", procedure: "Endoscopy" }),
    [],
  );
  assert.deepEqual(
    filterMedicalVideos(videos, { topic: "Robotic Surgery" }),
    [],
  );
  assert.ok(getRelatedVideos(videos[0]).every((v) => v.id !== videos[0].id));
});
test("JSON boundary handles HTTP failures, HTML, malformed JSON and CORS without leaking bodies", async (t) => {
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
    const result = await safeFetchJson("/api/video-studio/progress");
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
    (await safeFetchJson("/api/video-studio/progress")).kind,
    "network",
  );
  global.fetch = async () =>
    new Response('{"ok":true}', {
      headers: { "Content-Type": "application/problem+json; charset=utf-8" },
    });
  assert.deepEqual((await safeFetchJson("/api/video-studio/progress")).data, {
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
    (await safeFetchJson("/api/video-studio/progress", {}, 10)).kind,
    "timeout",
  );
  const controller = new AbortController();
  controller.abort();
  assert.equal(
    (
      await safeFetchJson("/api/video-studio/progress", {
        signal: controller.signal,
      })
    ).kind,
    "cancelled",
  );
});
