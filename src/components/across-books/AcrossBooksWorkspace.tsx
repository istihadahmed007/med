import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, Check, CheckCircle2, ChevronRight, Columns2, Copy, FileText, Globe, Lightbulb, RotateCcw, Search, Sparkles } from 'lucide-react';
import type { BmdcLesson, NavigationView } from '../../types';
import { CROSS_BOOK_TOPICS, CrossBookTopic, getLessonBooks, getRecallCards, getTopicBookCount, getTopicLessons, searchTopics } from '../../data/acrossBooksData';
import { AcrossBooksState, emptyTopicState, loadStudyState, saveTopicState, TopicStudyState } from '../../services/acrossBooksStorage';
import './acrossBooks.css';

interface Props { onNavigate: (view: NavigationView) => void }
type WorkspaceTab = 'learn' | 'compare' | 'practice' | 'notes';
const readTopicId = () => window.location.hash.startsWith('#across-books/') ? window.location.hash.slice('#across-books/'.length) : '';

export function AcrossBooksWorkspace({ onNavigate }: Props) {
  const [topicId, setTopicId] = useState(readTopicId);
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [loaded] = useState(loadStudyState);
  const [study, setStudy] = useState<AcrossBooksState>(loaded.state);
  const [storageError, setStorageError] = useState(loaded.error);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const syncRoute = () => setTopicId(readTopicId());
    const syncStorage = () => { const result = loadStudyState(); setStudy(result.state); setStorageError(result.error); };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('storage', syncStorage);
    return () => { window.removeEventListener('hashchange', syncRoute); window.removeEventListener('storage', syncStorage); };
  }, []);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [topicId]);

  const update = (id: string, next: TopicStudyState) => {
    const saved = saveTopicState(id, next);
    setStudy(previous => ({ ...previous, [id]: next }));
    setStorageError(!saved);
  };
  const topic = CROSS_BOOK_TOPICS.find(item => item.id === topicId);
  const filtered = searchTopics(query).filter(item => !savedOnly || study[item.id]?.saved);

  return <section className="across-books" aria-label="Study across books">
    {storageError && <p role="alert" className="ab-storage-error">Your browser could not load or save study data. Keep this page open and copy any notes you need before leaving.</p>}
    {topic ? <TopicWorkspace key={topic.id} topic={topic} state={study[topic.id] ?? emptyTopicState()} onUpdate={next => update(topic.id, next)} onNavigate={onNavigate} storageError={storageError} /> : <>
      <a href="#learn" className="ab-back"><ArrowLeft size={16} /> Back to Learn</a>
      <header className="ab-catalog-header">
        <span className="ab-eyebrow"><BookOpen size={15} /> STUDY ACROSS BOOKS</span>
        <h1 ref={heading} tabIndex={-1}>One topic.<br /><span>A connected understanding.</span></h1>
        <p>Bring your textbook references, study notes and revision together. Choose a topic. Follow the connections.</p>
        <div className="ab-how"><span><b>1</b> Choose a topic</span><ChevronRight size={14} /><span><b>2</b> Connect your reading</span><ChevronRight size={14} /><span><b>3</b> Check your recall</span></div>
      </header>
      {topicId && <p role="status" className="ab-notice">That topic is not available. Choose one of the study paths below.</p>}
      <div className="ab-catalog-toolbar">
        <label className="ab-search"><Search size={19} /><span className="ab-sr-only">Search topics, subjects or books</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a topic, subject or book…" type="search" /></label>
        <button className={`ab-button ${savedOnly ? 'is-selected' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}><Bookmark size={17} /> Saved topics</button>
      </div>
      <div className="ab-section-heading"><h2>{savedOnly ? 'Your saved topics' : 'Start with the cardiovascular system'}</h2><span role="status">{filtered.length} {filtered.length === 1 ? 'topic' : 'topics'}</span></div>
      <div className="ab-topic-grid">
        {filtered.map(item => {
          const connections = getTopicLessons(item);
          const read = connections.filter(({ lesson }) => study[item.id]?.readLessonIds.includes(lesson.id)).length;
          return <article className="ab-topic-card" key={item.id}>
            <div className="ab-card-top"><span className="ab-tag">{item.system}</span><button className="ab-icon-button" aria-label={`${study[item.id]?.saved ? 'Unsave' : 'Save'} ${item.title}`} aria-pressed={!!study[item.id]?.saved} onClick={() => update(item.id, { ...(study[item.id] ?? emptyTopicState()), saved: !study[item.id]?.saved })}><Bookmark size={18} fill={study[item.id]?.saved ? 'currentColor' : 'none'} /></button></div>
            <h3><a href={`#across-books/${item.id}`}>{item.title}</a></h3><p>{item.description}</p>
            <div className="ab-card-subjects">{connections.map(({ lesson }) => <span key={lesson.id}>{lesson.subjectName.split(' &')[0]}</span>)}</div>
            <div className="ab-card-footer"><span><BookOpen size={15} /> {getTopicBookCount(item)} book references</span><a className="ab-text-link" href={`#across-books/${item.id}`}>{read ? 'Continue' : 'Start studying'} <ArrowRight size={16} /></a></div>
            {read > 0 && <p className="ab-reading-count">{read} of {connections.length} perspectives marked as read</p>}
          </article>;
        })}
      </div>
      {!filtered.length && <div className="ab-empty"><Search size={28} /><h3>{savedOnly ? 'No saved topics match yet' : 'No matching topics yet'}</h3><p>{savedOnly ? 'Save a topic with the bookmark button, or view all topics.' : 'Try “heart”, “Guyton” or “anatomy”. More systems can be added as lessons become available.'}</p><button className="ab-button" onClick={() => { setQuery(''); setSavedOnly(false); }}>Show all topics</button></div>}
      <p className="ab-footnote">Built around existing MedX lessons. Notes and reading progress stay in this browser on this device.</p>
    </>}
  </section>;
}

function TopicWorkspace({ topic, state, onUpdate, onNavigate, storageError }: {
  topic: CrossBookTopic; state: TopicStudyState; onUpdate: (next: TopicStudyState) => void;
  onNavigate: Props['onNavigate']; storageError: boolean;
}) {
  const connections = getTopicLessons(topic);
  const [tab, setTab] = useState<WorkspaceTab>('learn');
  const [lessonId, setLessonId] = useState(() => connections.some(item => item.lesson.id === state.lastLessonId) ? state.lastLessonId! : connections[0]?.lesson.id);
  const [bangla, setBangla] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  const selected = connections.find(item => item.lesson.id === lessonId) ?? connections[0];
  if (!selected) return <div className="ab-empty"><h1>No published lessons yet</h1><a href="#across-books">Browse other topics</a></div>;
  const { lesson, perspective } = selected;
  const readCount = connections.filter(item => state.readLessonIds.includes(item.lesson.id)).length;
  const selectLesson = (id: string) => { setLessonId(id); onUpdate({ ...state, lastLessonId: id }); };
  const toggleRead = () => onUpdate({ ...state, readLessonIds: state.readLessonIds.includes(lesson.id) ? state.readLessonIds.filter(id => id !== lesson.id) : [...state.readLessonIds, lesson.id] });
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopyStatus('Link copied'); }
    catch { setCopyStatus('Copy the link from your address bar.'); }
  };
  const tabs: { id: WorkspaceTab; label: string; icon: typeof BookOpen }[] = [
    { id: 'learn', label: 'Learn', icon: BookOpen }, { id: 'compare', label: 'Compare books', icon: Columns2 },
    { id: 'practice', label: 'Practise', icon: RotateCcw }, { id: 'notes', label: 'My notes', icon: FileText },
  ];
  return <>
    <div className="ab-topbar"><a href="#across-books" className="ab-back"><ArrowLeft size={16} /> All topics</a><div className="ab-actions"><button className="ab-icon-button" aria-label="Copy topic link" onClick={copyLink}><Copy size={17} /></button><button className="ab-button" aria-pressed={state.saved} onClick={() => onUpdate({ ...state, saved: !state.saved })}><Bookmark size={16} fill={state.saved ? 'currentColor' : 'none'} />{state.saved ? 'Saved' : 'Save topic'}</button></div></div>
    {copyStatus && <p className="ab-footnote" role="status">{copyStatus}</p>}
    <header className="ab-topic-header"><span className="ab-eyebrow">{topic.system} · ACROSS BOOKS</span><h1 ref={heading} tabIndex={-1}>{topic.title}</h1><p>{topic.description}</p><div className="ab-topic-meta"><span><BookOpen size={16} /> {getTopicBookCount(topic)} book references</span><span>{connections.length} connected perspectives</span><span>{readCount}/{connections.length} marked as read</span></div></header>
    <nav className="ab-tabs" aria-label="Topic sections">{tabs.map(item => <button key={item.id} className={tab === item.id ? 'is-active' : ''} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}><item.icon size={17} />{item.label}</button>)}</nav>

    {tab === 'learn' && <div className="ab-learning-layout">
      <aside className="ab-reading-path" aria-label="Reading path"><span className="ab-eyebrow">YOUR READING PATH</span><p>Start with the basics, or jump to a subject.</p><div className="ab-path-list">{connections.map(({ lesson: item, perspective: step }, index) => <button key={item.id} aria-current={lesson.id === item.id ? 'step' : undefined} onClick={() => selectLesson(item.id)} className={lesson.id === item.id ? 'is-active' : ''}><span className="ab-step-number">{state.readLessonIds.includes(item.id) ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span><strong>{item.subjectName.split(' &')[0]}</strong><small>{step.label}</small></span></button>)}</div><p className="ab-path-hint">Reading progress is your checklist, not a mastery score.</p></aside>
      <article className="ab-reader" key={lesson.id}>
        <div className="ab-reader-top"><span className="ab-tag">{lesson.phase} · {lesson.subjectName.split(' &')[0]}</span><button className="ab-button ab-language" aria-pressed={bangla} onClick={() => setBangla(!bangla)}><Globe size={15} />{bangla ? 'English' : 'বাংলা সহ'}</button></div>
        <h2>{perspective.label}</h2><p className="ab-focus">{perspective.focus}</p>
        <SourceReferences lesson={lesson} />
        <div className="ab-study-content"><h3>{lesson.title}</h3><p>{lesson.stages.learn.overviewEn}</p>{bangla && <p className="ab-bangla" lang="bn">{lesson.stages.learn.overviewBn || 'এই অংশের বাংলা ব্যাখ্যা এখনো যুক্ত করা হয়নি।'}</p>}
          <h4>What to focus on</h4><ul>{lesson.learningObjectives.map(objective => <li key={objective}>{objective}</li>)}</ul>
          <details className="ab-details"><summary>Read the full MedX study notes</summary><StudyText text={lesson.stages.learn.detailedContentEn} />{bangla && lesson.stages.learn.detailedContentBn && <div lang="bn" className="ab-bangla"><StudyText text={lesson.stages.learn.detailedContentBn} /></div>}</details>
          <div className="ab-takeaways"><h4><Lightbulb size={17} /> Keep these connections in mind</h4><ul>{lesson.stages.learn.keyTakeaways.map(point => <li key={point}>{point}</li>)}</ul></div>
        </div>
        <div className="ab-reader-actions"><button className={`ab-button ${state.readLessonIds.includes(lesson.id) ? 'is-selected' : ''}`} aria-pressed={state.readLessonIds.includes(lesson.id)} onClick={toggleRead}><CheckCircle2 size={17} />{state.readLessonIds.includes(lesson.id) ? 'Marked as read' : 'Mark as read'}</button>{perspective.visual && <button className="ab-button" onClick={() => onNavigate(perspective.visual!.view)}><Sparkles size={16} />{perspective.visual.label}</button>}<button className="ab-text-link" onClick={() => setTab('notes')}><FileText size={16} /> Add a note</button></div>
        <div className="ab-reader-next"><span>{connections.findIndex(item => item.lesson.id === lesson.id) + 1} of {connections.length} perspectives</span>{connections.findIndex(item => item.lesson.id === lesson.id) < connections.length - 1 ? <button className="ab-primary" onClick={() => { selectLesson(connections[connections.findIndex(item => item.lesson.id === lesson.id) + 1].lesson.id); window.scrollTo({ top: 0, behavior: 'auto' }); }}>Next perspective <ArrowRight size={16} /></button> : <button className="ab-primary" onClick={() => setTab('practice')}>Check your recall <ArrowRight size={16} /></button>}</div>
      </article>
    </div>}
    {tab === 'compare' && <CompareBooks topic={topic} bangla={bangla} onRead={id => { selectLesson(id); setTab('learn'); }} />}
    {tab === 'practice' && <RecallPractice topic={topic} state={state} onUpdate={onUpdate} onRead={id => { selectLesson(id); setTab('learn'); }} />}
    {tab === 'notes' && <Notes topic={topic} selectedLessonId={lesson.id} state={state} onUpdate={onUpdate} storageError={storageError} />}
    <p className="ab-footnote">MedX study notes connect the listed reading references; they are not extracts from those books. Use your own or institution-licensed copies for the original text. Edition and chapter references need checking against your copy.</p>
  </>;
}

function SourceReferences({ lesson }: { lesson: BmdcLesson }) {
  const books = getLessonBooks(lesson);
  return <div className="ab-sources"><span className="ab-eyebrow"><BookOpen size={13} /> CONNECTED READING</span>{books.length ? books.map(book => <div key={book.reference} className="ab-source"><strong>{book.name}</strong><span>{book.reference}</span></div>) : <p>See the reading references attached to this lesson.</p>}<details><summary>Source details</summary><p>References supplied with the existing MedX lesson. Mapping and cited editions have not been independently verified by this feature.</p><ul>{lesson.references.map(reference => <li key={reference}>{reference}</li>)}</ul><p>Lesson version {lesson.version} · Updated {lesson.lastUpdated}</p></details></div>;
}

// Render the limited formatting used by local lessons as React text nodes.
// No HTML from notes or lesson content is executed.
function StudyText({ text }: { text: string }) {
  const inline = (value: string) => value.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
  return <div className="ab-study-text">{text.split('\n').filter(line => line.trim()).map((line, index) => {
    if (/^#{1,4} /.test(line)) return <h4 key={index}>{inline(line.replace(/^#{1,4} /, ''))}</h4>;
    if (/^\s*[-*] /.test(line)) return <p className="ab-study-bullet" key={index}>• {inline(line.replace(/^\s*[-*] /, ''))}</p>;
    return <p key={index}>{inline(line)}</p>;
  })}</div>;
}

function CompareBooks({ topic, bangla, onRead }: { topic: CrossBookTopic; bangla: boolean; onRead: (id: string) => void }) {
  const connections = getTopicLessons(topic);
  const options = connections.flatMap(({ lesson }) => getLessonBooks(lesson).map(book => ({ key: `${lesson.id}/${book.id}`, lesson, book })));
  const [left, setLeft] = useState(options[0]?.key ?? '');
  const [right, setRight] = useState(options.find(option => option.lesson.id !== options[0]?.lesson.id)?.key ?? options[1]?.key ?? '');
  if (options.length < 2) return <div className="ab-empty"><h2>More reading connections are needed</h2><p>This topic needs at least two book references for comparison.</p></div>;
  const sameLesson = options.find(option => option.key === left)?.lesson.id === options.find(option => option.key === right)?.lesson.id;
  return <div className="ab-panel"><div className="ab-section-intro"><span className="ab-eyebrow">MAKE THE CONNECTION</span><h2>Two reading perspectives, side by side.</h2><p>Choose the books you are studying. Compare the MedX lesson linked to each reference.</p></div>
    {sameLesson && <p className="ab-notice">These books support the same MedX lesson, so the study notes match. Select another subject to compare different perspectives.</p>}
    <div className="ab-compare-grid">{[{ value: left, set: setLeft, other: right, label: 'First book' }, { value: right, set: setRight, other: left, label: 'Second book' }].map(side => {
      const item = options.find(option => option.key === side.value)!;
      return <article key={side.label} className="ab-compare-column"><label className="ab-field">{side.label}<select value={side.value} onChange={event => side.set(event.target.value)}>{options.map(option => <option key={option.key} value={option.key} disabled={option.key === side.other}>{option.book.name} · {option.lesson.subjectName.split(' &')[0]}</option>)}</select></label><span className="ab-tag">{item.lesson.subjectName}</span><h3>{item.book.name}</h3><p className="ab-citation">{item.book.reference}</p><h4>Connected MedX explanation</h4><p>{item.lesson.stages.learn.overviewEn}</p>{bangla && <p lang="bn" className="ab-bangla">{item.lesson.stages.learn.overviewBn}</p>}<h4>Key learning points</h4><ul>{item.lesson.stages.learn.keyTakeaways.map(point => <li key={point}>{point}</li>)}</ul><button className="ab-text-link" onClick={() => onRead(item.lesson.id)}>Read this perspective <ArrowRight size={16} /></button></article>;
    })}</div><p className="ab-footnote">This compares linked study notes, not the wording or opinions of the textbook authors.</p></div>;
}

function RecallPractice({ topic, state, onUpdate, onRead }: { topic: CrossBookTopic; state: TopicStudyState; onUpdate: (next: TopicStudyState) => void; onRead: (id: string) => void }) {
  const allCards = getRecallCards(topic);
  const [onlyAgain, setOnlyAgain] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState('');
  const [rated, setRated] = useState(false);
  // Freeze the current review queue while ratings change; otherwise a newly
  // confident card disappears before the student can read its feedback.
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const cards = onlyAgain ? allCards.filter(card => reviewIds.includes(card.id)) : allCards;
  const card = cards[index];
  const againCount = allCards.filter(item => state.recall[item.id] === 'again').length;
  const resetCard = () => { setRevealed(false); setAnswer(''); setRated(false); };
  const setMode = () => { setReviewIds(allCards.filter(item => state.recall[item.id] === 'again').map(item => item.id)); setOnlyAgain(!onlyAgain); setIndex(0); resetCard(); };
  const rate = (rating: 'again' | 'confident') => { onUpdate({ ...state, recall: { ...state.recall, [card.id]: rating } }); setRated(true); };
  return <div className="ab-panel ab-practice"><div className="ab-section-intro"><span className="ab-eyebrow">RECALL, THEN REVEAL</span><h2>Check what you remember.</h2><p>Explain it in your own words before revealing the answer. This is self-assessed revision, not a scored examination.</p></div><div className="ab-practice-toolbar"><span>{allCards.length} recall cards across this topic</span><button className={`ab-button ${onlyAgain ? 'is-selected' : ''}`} aria-pressed={onlyAgain} onClick={setMode}>{onlyAgain ? 'Show all cards' : `Revisit difficult cards (${againCount})`}</button></div>
    {card ? <article className="ab-recall-card"><div className="ab-card-top"><span className="ab-tag">{card.subject}</span><span>{index + 1} / {cards.length}</span></div><h3>{card.front}</h3><label className="ab-field">Your answer <span className="ab-muted">(optional · not saved)</span><textarea rows={3} maxLength={3000} value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Try explaining it without looking…" /></label>{!revealed ? <button className="ab-primary" onClick={() => setRevealed(true)}>Reveal answer <ArrowRight size={16} /></button> : <div className="ab-recall-answer"><h4>Compare with the lesson answer</h4><p>{card.back}</p><button className="ab-text-link" onClick={() => onRead(card.lessonId)}>Review the source lesson <BookOpen size={15} /></button><div className="ab-rating"><button className="ab-button" aria-pressed={rated && state.recall[card.id] === 'again'} onClick={() => rate('again')}><RotateCcw size={16} /> Need to revisit</button><button className="ab-button" aria-pressed={rated && state.recall[card.id] === 'confident'} onClick={() => rate('confident')}><Check size={16} /> I remembered</button></div>{rated && <p role="status" className="ab-footnote">{state.recall[card.id] === 'again' ? 'Added to your difficult cards.' : 'Recorded as remembered for your revision.'}</p>}</div>}<div className="ab-reader-next"><button className="ab-button" disabled={index === 0} onClick={() => { setIndex(index - 1); resetCard(); }}><ArrowLeft size={16} /> Previous</button><button className="ab-button" onClick={() => { setIndex(index + 1); resetCard(); }}>{index === cards.length - 1 ? 'Finish session' : 'Next card'}<ArrowRight size={16} /></button></div></article> : <div className="ab-empty"><CheckCircle2 size={32} /><h3>{cards.length ? 'You reached the end of this set' : 'No difficult cards to revisit'}</h3><p>{againCount ? `${againCount} cards are marked for another look.` : 'You can practise the full set whenever you want.'}</p><button className="ab-primary" onClick={() => { setOnlyAgain(false); setIndex(0); resetCard(); }}>Practise all cards</button></div>}
  </div>;
}

function Notes({ topic, selectedLessonId, state, onUpdate, storageError }: { topic: CrossBookTopic; selectedLessonId: string; state: TopicStudyState; onUpdate: (next: TopicStudyState) => void; storageError: boolean }) {
  const [scope, setScope] = useState('topic');
  const [copyStatus, setCopyStatus] = useState('');
  const connections = getTopicLessons(topic);
  const copy = async () => {
    const content = [topic.title, ...Object.entries(state.notes).filter(([, note]) => note.trim()).map(([key, note]) => `\n${key === 'topic' ? 'Topic notes' : connections.find(item => item.lesson.id === key)?.lesson.title ?? key}\n${note}`)].join('\n');
    try { await navigator.clipboard.writeText(content); setCopyStatus('Notes copied'); }
    catch { setCopyStatus('Could not copy automatically. Select the notes and copy them manually.'); }
  };
  return <div className="ab-panel ab-notes"><div className="ab-section-intro"><span className="ab-eyebrow">YOUR OWN CONNECTIONS</span><h2>Make the topic yours.</h2><p>Write what helped you understand it, questions for your teacher, or differences you found in your books.</p></div><div className="ab-notes-toolbar"><label className="ab-field">Attach this note to<select value={scope} onChange={event => setScope(event.target.value)}><option value="topic">Whole topic</option>{connections.map(({ lesson }) => <option key={lesson.id} value={lesson.id}>{lesson.subjectName}</option>)}</select></label><button className="ab-button" onClick={() => setScope(selectedLessonId)}><BookOpen size={16} /> Current perspective</button></div><label className="ab-field" htmlFor="ab-note">{scope === 'topic' ? 'Topic notes' : `${connections.find(item => item.lesson.id === scope)?.lesson.subjectName} notes`}</label><textarea id="ab-note" rows={12} maxLength={12000} value={state.notes[scope] ?? ''} onChange={event => onUpdate({ ...state, notes: { ...state.notes, [scope]: event.target.value } })} placeholder="The connection I want to remember is…" /><div className="ab-notes-footer"><span role="status">{storageError ? 'Not saved — copy your notes before leaving' : 'Saved automatically in this browser'} · {(state.notes[scope] ?? '').length}/12,000</span><button className="ab-button" onClick={copy}><Copy size={16} /> Copy all notes</button></div>{copyStatus && <p role="status" className="ab-footnote">{copyStatus}</p>}<p className="ab-footnote">Notes do not sync between devices or user accounts. Clearing browser data removes them. Copy anything you want to keep elsewhere.</p></div>;
}
