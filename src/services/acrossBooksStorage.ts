export const ACROSS_BOOKS_STORAGE_KEY = 'medx_across_books_v1';
export interface TopicStudyState {
  saved: boolean;
  readLessonIds: string[];
  notes: Record<string, string>;
  recall: Record<string, 'again' | 'confident'>;
  lastLessonId?: string;
}
export type AcrossBooksState = Record<string, TopicStudyState>;
export const emptyTopicState = (): TopicStudyState => ({ saved: false, readLessonIds: [], notes: {}, recall: {} });
type StoragePort = Pick<Storage, 'getItem' | 'setItem'>;
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

export function parseStudyState(raw: string | null): AcrossBooksState {
  if (!raw) return {};
  const parsed: unknown = JSON.parse(raw);
  if (!isObject(parsed)) throw new Error('Invalid study data');
  const result: AcrossBooksState = {};
  for (const [id, value] of Object.entries(parsed)) {
    if (!/^[a-z0-9-]+$/.test(id) || !isObject(value)) continue;
    const item = emptyTopicState();
    item.saved = value.saved === true;
    item.readLessonIds = Array.isArray(value.readLessonIds) ? [...new Set(value.readLessonIds.filter((v): v is string => typeof v === 'string'))] : [];
    if (typeof value.lastLessonId === 'string') item.lastLessonId = value.lastLessonId;
    if (isObject(value.notes)) item.notes = Object.fromEntries(Object.entries(value.notes).filter(([, v]) => typeof v === 'string').map(([k, v]) => [k, (v as string).slice(0, 12000)]));
    if (isObject(value.recall)) item.recall = Object.fromEntries(Object.entries(value.recall).filter(([, v]) => v === 'again' || v === 'confident')) as TopicStudyState['recall'];
    result[id] = item;
  }
  return result;
}

export function loadStudyState(storage?: StoragePort): { state: AcrossBooksState; error: boolean } {
  try { return { state: parseStudyState((storage ?? window.localStorage).getItem(ACROSS_BOOKS_STORAGE_KEY)), error: false }; }
  catch { return { state: {}, error: true }; }
}

export function saveTopicState(topicId: string, state: TopicStudyState, storage?: StoragePort): boolean {
  try {
    const target = storage ?? window.localStorage;
    // Merge at write time so another topic or browser tab is not overwritten.
    const current = parseStudyState(target.getItem(ACROSS_BOOKS_STORAGE_KEY));
    target.setItem(ACROSS_BOOKS_STORAGE_KEY, JSON.stringify({ ...current, [topicId]: state }));
    return true;
  } catch { return false; }
}
