# Study across books

Entry points: Learn → Study a topic across books, sidebar → Across books, and
the Ctrl/Cmd+K command palette. Shareable routes use
`#across-books/heart-and-cardiac-cycle`; the catalogue is `#across-books`.

## Implemented

- Five cardiovascular topic paths built from the existing published lesson set.
- Search by topic, Bangla topic title, subject or referenced textbook; saved filter.
- A guided reading order with English/Bangla notes, objectives, source references,
  optional full notes and links to relevant existing visual labs.
- Two-book comparison using the MedX lesson linked to each reference. Choosing
  two references for the same lesson explicitly explains why the notes match.
- Self-assessed recall using the existing lesson flashcards, reveal-before-rating,
  difficult-card review, and links back to the relevant reading perspective.
- Topic and perspective notes, copy actions, bookmarks and manual reading checks.
- Browser history support, direct topic links, mobile layout, keyboard focus
  styles and reduced-motion support. No additional runtime dependencies.

## Content boundaries

This feature does not ingest or reproduce licensed textbook chapters. It reuses
the repository's existing MedX lesson content and author-supplied references.
Those references and medical accuracy have not been independently validated by
this implementation. The UI does not claim a new medical review or endorsement.
The comparison shows linked MedX notes, not differences in textbook authors'
wording, and retains edition strings without inventing page numbers.

No AI retrieval service, publisher integration, new clinical recommendations,
secure examination engine, account authentication or server persistence is added.
Recall is explicitly self-assessed, with local lesson answers; it must not be
used as an answer-protected or high-stakes examination. Reading checks never
update the app's mastery/accuracy scores.

## Persistence

`src/services/acrossBooksStorage.ts` owns the separate `medx_across_books_v1`
localStorage key. It starts empty, validates stored values, merges topic writes,
and reports blocked/quota/corruption failures. Existing app progress is unchanged.
Notes are device/browser-specific, not account-specific. The UI says so and
offers copying. Malformed storage is preserved rather than silently overwritten.

## Extend the catalogue

1. Add or medically review the actual lesson in the existing content pipeline.
2. In `src/data/acrossBooksData.ts`, add a topic with a stable ID and explicit
   perspective → lesson ID connections. Only published lessons resolve.
3. Add any new textbook family matcher with its real title. Preserve the lesson's
   full citation including edition; do not invent chapter/page values.
4. Add visual links only when an existing tool matches the subject. Avoid mapping
   cardiac surgery to an unrelated appendectomy simulation, for example.
5. Run `npm run test:across-books` and `npm run build`.

For account syncing and licensed-text retrieval, replace this storage adapter
with authenticated endpoints and move approved source material behind access
controls. Do not expose ingestion, publishing, or licensing controls through the
current client-selectable role menu.

## Verification

The Node tests exercise actual topic resolution, publication filtering, search,
reference identity, flashcard relationships, empty initial state, persistence,
corruption handling and unavailable storage. The manual browser checklist is:
catalogue search, book comparison, note persistence, recall/revisit, deep links,
back navigation and layouts at desktop and mobile widths.

Implementation QA also exercised the compiled React workspace in a temporary
JSDOM environment: catalogue/search, topic hash changes, saved topics, reading
checks, comparison (including same-lesson references), notes after unmount/remount
and topic changes, answer reveal, difficult-card review, and unknown-topic
recovery all passed. This checks interactions, not pixel layout. Visual browser
QA was unavailable because the cloud browser could not reach the local preview.
