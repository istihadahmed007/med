import { OspeStation } from '../types/anatomy';

export const OSPE_STATIONS_DATA: OspeStation[] = [
  {
    id: 'ospe-station-1',
    stationNumber: 1,
    targetStructureId: 'left-anterior-descending',
    targetStructureName: 'Left Anterior Descending (LAD) Coronary Artery',
    pinLabel: 'Pin A (Red)',
    pinColor: '#ef4444',
    pinPosition: [-0.25, 0.1, 0.45],
    system: 'cardiovascular',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Identify the tagged anatomical structure (Pin A):',
        options: [
          'Left Anterior Descending (Anterior Interventricular) Artery',
          'Circumflex Artery',
          'Right Marginal Artery',
          'Posterior Interventricular Artery'
        ],
        correctOptionIndex: 0,
        explanation: 'Pin A is placed on the anterior interventricular groove over the Left Anterior Descending (LAD) branch of the left coronary artery.',
        clinicalRelevance: 'Acute thrombotic occlusion of the LAD produces ST-elevation myocardial infarction (STEMI) in precordial leads V1–V4.',
        bmdcMarks: 2
      },
      {
        id: 'q1-2',
        prompt: 'Which anatomical region of the myocardium is predominantly supplied by this vessel?',
        options: [
          'Anterior 2/3 of interventricular septum and LV apex',
          'Posterior 1/3 of interventricular septum and SA node',
          'Right atrium and right border of heart',
          'Inferior wall of left ventricle and AV node'
        ],
        correctOptionIndex: 0,
        explanation: 'The LAD gives anterior septal perforators supplying the anterior two-thirds of the interventricular septum, including the bundle of His and bundle branches, as well as the cardiac apex and anterior LV wall.',
        clinicalRelevance: 'LAD occlusion often triggers severe bundle branch blocks or complete AV dissociation.',
        bmdcMarks: 3
      }
    ]
  },
  {
    id: 'ospe-station-2',
    stationNumber: 2,
    targetStructureId: 'vermiform-appendix',
    targetStructureName: 'Vermiform Appendix',
    pinLabel: 'Pin B (Amber)',
    pinColor: '#f59e0b',
    pinPosition: [0.5, -0.65, 0.25],
    system: 'digestive',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Identify the tagged organ and its most common anatomical position:',
        options: [
          'Vermiform Appendix (Retrocaecal position ~65%)',
          'Vermiform Appendix (Pelvic position ~30%)',
          'Meckel Diverticulum (Antimesenteric border)',
          'Terminal Ileum'
        ],
        correctOptionIndex: 0,
        explanation: 'Pin B marks the vermiform appendix arising from the posteromedial caecal wall. Its commonest position in humans is retrocaecal (approx 65%), followed by pelvic (approx 31%).',
        clinicalRelevance: 'Retrocaecal appendicitis may produce mild abdominal pain without anterior peritoneal signs; psoas test is typically positive.',
        bmdcMarks: 2
      },
      {
        id: 'q2-2',
        prompt: 'What is the arterial supply of this tagged organ and what type of artery is it?',
        options: [
          'Appendicular artery (branch of inferior division of ileocolic artery); anatomic end artery',
          'Right colic artery; anastomotic arcade',
          'Middle colic artery; terminal vessel',
          'Inferior mesenteric artery; plexiform vessel'
        ],
        correctOptionIndex: 0,
        explanation: 'The appendicular artery runs in the free margin of the mesoappendix and is an anatomical end artery. Its occlusion causes rapid ischemic necrosis.',
        clinicalRelevance: 'Lack of collateral blood supply explains why luminal obstruction leads rapidly to acute gangrenous appendicitis and perforation.',
        bmdcMarks: 3
      }
    ]
  },
  {
    id: 'ospe-station-3',
    stationNumber: 3,
    targetStructureId: 'circle-of-willis',
    targetStructureName: 'Anterior Communicating Artery (Circle of Willis)',
    pinLabel: 'Pin C (Purple)',
    pinColor: '#a855f7',
    pinPosition: [0, 0.45, 0.15],
    system: 'nervous',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Identify the tagged vascular structure uniting the right and left anterior cerebral arteries:',
        options: [
          'Anterior Communicating Artery (AComm)',
          'Basilar Artery',
          'Posterior Communicating Artery',
          'Middle Cerebral Artery'
        ],
        correctOptionIndex: 0,
        explanation: 'Pin C marks the anterior communicating artery, a short 2-3 mm bridge connecting both A1 segments of the anterior cerebral arteries anterior to the optic chiasma.',
        clinicalRelevance: 'The AComm is the single most common site (approx. 40%) of intracranial berry (saccular) aneurysms.',
        bmdcMarks: 2
      },
      {
        id: 'q3-2',
        prompt: 'Rupture of an aneurysm at this site causes bleeding into which intracranial compartment?',
        options: [
          'Subarachnoid space (Subarachnoid Hemorrhage - SAH)',
          'Epidural space',
          'Subdural space',
          'Subperiosteal space'
        ],
        correctOptionIndex: 0,
        explanation: 'Cerebral vessels of the Circle of Willis course in the subarachnoid space at the base of the brain. Aneurysm rupture causes catastrophic subarachnoid hemorrhage presenting with "worst headache of life" (thunderclap).',
        clinicalRelevance: 'Non-contrast CT head shows hyperattenuating blood in basal cisterns; xanthochromia on lumbar puncture.',
        bmdcMarks: 3
      }
    ]
  },
  {
    id: 'ospe-station-4',
    stationNumber: 4,
    targetStructureId: 'right-principal-bronchus',
    targetStructureName: 'Right Principal (Main) Bronchus',
    pinLabel: 'Pin D (Cyan)',
    pinColor: '#06b6d4',
    pinPosition: [0.35, 0.7, -0.05],
    system: 'respiratory',
    questions: [
      {
        id: 'q4-1',
        prompt: 'Identify the tagged airway structure and explain its clinical predisposition:',
        options: [
          'Right Principal Bronchus (wider, shorter, more vertical; prone to foreign body aspiration)',
          'Left Principal Bronchus (narrower, longer, more horizontal)',
          'Tracheal Carina',
          'Right Pulmonary Artery'
        ],
        correctOptionIndex: 0,
        explanation: 'Pin D marks the right main bronchus. Measuring approx 2.5 cm long and 14 mm wide, it forms an angle of only 25° with the vertical median plane.',
        clinicalRelevance: 'Peanuts, coins, and teeth aspirated in sitting/standing patients almost invariably pass down the right main bronchus.',
        bmdcMarks: 2
      }
    ]
  }
];
