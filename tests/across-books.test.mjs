import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Transpile just the data/service boundary so Node's built-in runner can test
// real production functions without a browser, bundler, or new dependency.
const scratch = mkdtempSync(join(tmpdir(), 'medx-across-books-'));
after(() => rmSync(scratch, { recursive: true, force: true }));
writeFileSync(join(scratch, 'package.json'), '{"type":"module"}');
for (const file of ['data/cardiovascularPilotData', 'data/verifiedTextbooksData', 'data/acrossBooksData', 'services/acrossBooksStorage']) {
  const source = readFileSync(new URL(`../src/${file}.ts`, import.meta.url), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
    .replace(/from '(\.[^']+)'/g, "from '$1.js'");
  const path = join(scratch, `${file}.js`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, output);
}
const data = await import(pathToFileURL(join(scratch, 'data/acrossBooksData.js')));
const storage = await import(pathToFileURL(join(scratch, 'services/acrossBooksStorage.js')));
const { CARDIOVASCULAR_PILOT_LESSONS } = await import(pathToFileURL(join(scratch, 'data/cardiovascularPilotData.js')));
const makeStorage = (initial = null) => {
  let value = initial;
  return { getItem: () => value, setItem: (_key, next) => { value = next; } };
};

test('every topic resolves to published lessons, multiple books and real recall cards', () => {
  assert.equal(new Set(data.CROSS_BOOK_TOPICS.map(topic => topic.id)).size, data.CROSS_BOOK_TOPICS.length);
  for (const topic of data.CROSS_BOOK_TOPICS) {
    const connections = data.getTopicLessons(topic);
    assert.equal(connections.length, topic.perspectives.length, `${topic.id}: dangling lesson`);
    assert.ok(data.getTopicBookCount(topic) >= 2);
    const cards = data.getRecallCards(topic);
    assert.ok(cards.length > 0);
    assert.equal(new Set(cards.map(card => card.id)).size, cards.length);
    for (const card of cards) assert.ok(connections.some(item => item.lesson.id === card.lessonId));
  }
});

test('draft, archived and missing lessons are never exposed as connected reading', () => {
  const topic = data.CROSS_BOOK_TOPICS[0];
  const changed = CARDIOVASCULAR_PILOT_LESSONS.map(lesson => ({ ...lesson, status: 'draft' }));
  assert.deepEqual(data.getTopicLessons(topic, changed), []);
  assert.deepEqual(data.getTopicLessons(topic, []), []);
});

test('search supports textbook names, multiple terms, Bangla, and empty results', () => {
  assert.ok(data.searchTopics('  GUYTON heart ').some(topic => topic.id === 'heart-and-cardiac-cycle'));
  assert.ok(data.searchTopics('জন্মগত').some(topic => topic.id === 'congenital-heart-disease'));
  assert.deepEqual(data.searchTopics('no-such-book-xyz'), []);
  assert.equal(data.searchTopics(' ').length, data.CROSS_BOOK_TOPICS.length);
});

test('book count excludes guidelines and preserves original edition references', () => {
  const lesson = CARDIOVASCULAR_PILOT_LESSONS[0];
  const books = data.getLessonBooks(lesson);
  assert.equal(books.length, 2);
  assert.ok(books.every(book => lesson.references.includes(book.reference)));
  assert.ok(books.every(book => !book.reference.includes('BM&DC')));
});

test('fresh users have no fabricated reading, bookmarks or recall results', () => {
  assert.deepEqual(storage.loadStudyState(makeStorage()).state, {});
  assert.deepEqual(storage.emptyTopicState(), { saved: false, readLessonIds: [], notes: {}, recall: {} });
});

test('topic saves retain other topics and notes survive a reload', () => {
  const port = makeStorage();
  const first = { ...storage.emptyTopicState(), saved: true, notes: { topic: 'My connection\nবাংলা' }, readLessonIds: ['anatomy'] };
  assert.equal(storage.saveTopicState('heart-and-cardiac-cycle', first, port), true);
  assert.equal(storage.saveTopicState('heart-failure', { ...storage.emptyTopicState(), notes: { physiology: 'Different note' } }, port), true);
  const result = storage.loadStudyState(port);
  assert.equal(result.error, false);
  assert.equal(result.state['heart-and-cardiac-cycle'].notes.topic, 'My connection\nবাংলা');
  assert.equal(result.state['heart-failure'].notes.physiology, 'Different note');
});

test('malformed or unavailable storage fails visibly without deleting original data', () => {
  const port = makeStorage('{broken');
  assert.equal(storage.loadStudyState(port).error, true);
  assert.equal(storage.saveTopicState('heart-failure', storage.emptyTopicState(), port), false);
  assert.equal(port.getItem(), '{broken');
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); } };
  assert.equal(storage.loadStudyState(blocked).error, true);
  assert.equal(storage.saveTopicState('heart-failure', storage.emptyTopicState(), blocked), false);
});

test('invalid stored fields cannot inject false recall values or break note rendering', () => {
  const parsed = storage.parseStudyState(JSON.stringify({ 'heart-failure': { saved: 'yes', readLessonIds: ['x', 'x', 3], notes: { topic: ['bad'], anatomy: 'valid' }, recall: { q1: 'mastered', q2: 'again' } } }));
  assert.equal(parsed['heart-failure'].saved, false);
  assert.deepEqual(parsed['heart-failure'].readLessonIds, ['x']);
  assert.deepEqual(parsed['heart-failure'].notes, { anatomy: 'valid' });
  assert.deepEqual(parsed['heart-failure'].recall, { q2: 'again' });
});
