import { CARDIOVASCULAR_PILOT_LESSONS } from './cardiovascularPilotData';
import type { BmdcLesson, NavigationView } from '../types';

export interface StudyPerspective {
  lessonId: string;
  label: string;
  focus: string;
  visual?: { label: string; view: NavigationView };
}

export interface CrossBookTopic {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  system: string;
  perspectives: StudyPerspective[];
}

const anatomy: StudyPerspective = {
  lessonId: 'cvs-anat-heart-morphology', label: 'Start with the structure',
  focus: 'Locate the chambers, valves and coronary vessels before moving to function.',
  visual: { label: 'Open anatomy lab', view: '3d-anatomy' },
};
const physiology: StudyPerspective = {
  lessonId: 'cvs-physio-cardiac-cycle-wiggers', label: 'Understand the function',
  focus: 'Connect the cardiac cycle with pressure, volume and heart sounds.',
  visual: { label: 'Explore the cardiac cycle', view: 'physiology' },
};
const pathology: StudyPerspective = {
  lessonId: 'cvs-path-atherosclerosis-mi', label: 'Follow the disease process',
  focus: 'Study atherosclerosis and the sequence of myocardial injury.',
  visual: { label: 'Explore atherosclerosis', view: 'pathology' },
};
const pharmacology: StudyPerspective = {
  lessonId: 'cvs-pharm-antianginal-heartfailure', label: 'Connect the pharmacology',
  focus: 'Read the existing lesson on cardiovascular drug classes and mechanisms.',
};

// Explicit editorial connections, not keyword guesses. Add a topic only when its
// lessons exist. Book references remain those supplied by each lesson's author.
export const CROSS_BOOK_TOPICS: CrossBookTopic[] = [
  {
    id: 'heart-and-cardiac-cycle', title: 'Heart & cardiac cycle',
    titleBn: 'হৃদপিণ্ড ও কার্ডিয়াক চক্র', system: 'Cardiovascular',
    description: 'Connect what the heart looks like with how each heartbeat works.',
    perspectives: [anatomy, physiology],
  },
  {
    id: 'coronary-artery-disease', title: 'Coronary artery disease',
    titleBn: 'করোনারি ধমনীর রোগ', system: 'Cardiovascular',
    description: 'Build a connected picture, from coronary anatomy to clinical learning.',
    perspectives: [anatomy, pathology,
      { lessonId: 'cvs-biochem-cardiac-biomarkers', label: 'Connect the biochemistry', focus: 'Read about cardiac biomarkers and myocardial metabolism.' },
      pharmacology,
      { lessonId: 'cvs-med-acute-coronary-syndrome', label: 'Bring it into clinical context', focus: 'Connect the preceding subjects with the existing acute coronary syndrome lesson.' },
    ],
  },
  {
    id: 'heart-failure', title: 'Heart failure foundations',
    titleBn: 'হার্ট ফেইলিউরের ভিত্তি', system: 'Cardiovascular',
    description: 'Bring cardiac structure, pump function and pharmacology into one reading path.',
    perspectives: [anatomy, physiology, pharmacology],
  },
  {
    id: 'heart-valves-and-infection', title: 'Heart valves & infection',
    titleBn: 'হৃদপিণ্ডের ভালভ ও সংক্রমণ', system: 'Cardiovascular',
    description: 'Connect valve anatomy with microbiology and surgical learning.',
    perspectives: [anatomy,
      { lessonId: 'cvs-micro-infective-endocarditis', label: 'Explore the microbiology', focus: 'Study the organisms, blood cultures and diagnostic concepts in the endocarditis lesson.' },
      { lessonId: 'cvs-surg-cabg-valvular-surgery', label: 'Read the surgical perspective', focus: 'Use the valvular surgery section of the existing surgical lesson.' },
    ],
  },
  {
    id: 'congenital-heart-disease', title: 'Congenital heart disease',
    titleBn: 'জন্মগত হৃদরোগ', system: 'Cardiovascular',
    description: 'Start with normal structure and function, then connect them to paediatrics.',
    perspectives: [anatomy, physiology,
      { lessonId: 'cvs-paed-congenital-heart-diseases', label: 'Connect to paediatrics', focus: 'Read about congenital heart conditions in the existing paediatric lesson.' },
    ],
  },
];

export function getTopicLessons(topic: CrossBookTopic, lessons = CARDIOVASCULAR_PILOT_LESSONS) {
  return topic.perspectives.flatMap(perspective => {
    const lesson = lessons.find(item => item.id === perspective.lessonId && item.status === 'published');
    return lesson ? [{ perspective, lesson }] : [];
  });
}

// Match only known textbook families. Guidelines and curriculum references remain
// in the full lesson reference list and are never counted as books.
const BOOK_FAMILIES = [
  { id: 'gray', name: "Gray's Anatomy for Students", match: /gray.*anatomy/i },
  { id: 'datta', name: 'Essentials of Human Anatomy · A. K. Datta', match: /datta/i },
  { id: 'guyton', name: 'Guyton and Hall Textbook of Medical Physiology', match: /guyton/i },
  { id: 'ganong', name: "Ganong's Review of Medical Physiology", match: /ganong/i },
  { id: 'harper', name: "Harper's Illustrated Biochemistry", match: /harper/i },
  { id: 'lippincott', name: 'Lippincott Illustrated Reviews: Biochemistry', match: /lippincott.*biochem/i },
  { id: 'katzung', name: 'Katzung Basic & Clinical Pharmacology', match: /katzung/i },
  { id: 'robbins', name: 'Robbins & Cotran Pathologic Basis of Disease', match: /robbins/i },
  { id: 'underwood', name: "Underwood's Pathology", match: /underwood/i },
  { id: 'davidson', name: "Davidson's Principles and Practice of Medicine", match: /davidson/i },
  { id: 'kumar-clark', name: "Kumar & Clark's Clinical Medicine", match: /kumar.*clark/i },
  { id: 'jawetz', name: "Jawetz, Melnick & Adelberg's Medical Microbiology", match: /jawetz/i },
  { id: 'levinson', name: 'Review of Medical Microbiology and Immunology', match: /levinson/i },
  { id: 'bailey', name: "Bailey & Love's Short Practice of Surgery", match: /bailey/i },
  { id: 'sabiston', name: 'Sabiston Textbook of Surgery', match: /sabiston/i },
  { id: 'kirklin', name: 'Kirklin/Barratt-Boyes Cardiac Surgery', match: /kirklin/i },
  { id: 'nelson', name: 'Nelson Textbook of Pediatrics', match: /nelson/i },
  { id: 'ghai', name: 'Ghai Essential Pediatrics', match: /ghai/i },
];

export function getLessonBooks(lesson: BmdcLesson) {
  return lesson.references.flatMap(reference => {
    const book = BOOK_FAMILIES.find(item => item.match.test(reference));
    return book ? [{ id: book.id, name: book.name, reference }] : [];
  });
}

export function getTopicBookCount(topic: CrossBookTopic) {
  return new Set(getTopicLessons(topic).flatMap(({ lesson }) => getLessonBooks(lesson).map(book => book.id))).size;
}

export function searchTopics(query: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return CROSS_BOOK_TOPICS.filter(topic => {
    const haystack = [topic.title, topic.titleBn, topic.description, topic.system,
      ...getTopicLessons(topic).flatMap(({ lesson }) => [lesson.subjectName, ...lesson.references])
    ].join(' ').toLocaleLowerCase();
    return words.every(word => haystack.includes(word));
  });
}

export function getRecallCards(topic: CrossBookTopic) {
  return getTopicLessons(topic).flatMap(({ lesson }) => lesson.stages.revise.flashcards.map((card, index) => ({
    ...card, id: `${lesson.id}:${index}`, lessonId: lesson.id, subject: lesson.subjectName,
  })));
}
