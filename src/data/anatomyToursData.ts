import { GuidedTour } from '../types/anatomy';

export const GUIDED_ANATOMY_TOURS: GuidedTour[] = [
  {
    id: 'cardiac-circulation-tour',
    title: 'Heart: Internal Chambers, Valves & Coronary Anatomy',
    system: 'cardiovascular',
    region: 'thorax',
    estimatedMinutes: 8,
    description: 'Master the gross morphology, internal chambers, fibrous skeleton, valvular mechanisms, and coronary arterial distribution high-yield for MBBS 1st Prof Viva.',
    steps: [
      {
        stepNumber: 1,
        title: 'Cardiac Topography & Pericardial Attachments',
        structureId: 'left-ventricle',
        cameraPosition: [0, 1.2, 3.5],
        cameraTarget: [0, 0, 0],
        description: 'The heart lies obliquely within the middle mediastinum, two-thirds to the left of the median plane. The apex is formed entirely by the left ventricle and lies in the left 5th intercostal space, 9 cm from the midsternal line.',
        clinicalPearl: 'Apex beat displacement laterally and downward indicates left ventricular dilation or cardiomegaly.'
      },
      {
        stepNumber: 2,
        title: 'Right Ventricle & Inflow vs Outflow Tracts',
        structureId: 'right-ventricle',
        cameraPosition: [1.8, -0.4, 2.8],
        cameraTarget: [0.3, -0.2, 0.3],
        description: 'The right ventricle forms the largest part of the sternocostal surface. Internally, the inflow tract is trabeculated (trabeculae carneae and moderator band), while the outflow tract (infundibulum/conus arteriosus) is smooth-walled.',
        clinicalPearl: 'The moderator band carries the right bundle branch of the AV conduction system, coordinating anterior papillary muscle contraction.'
      },
      {
        stepNumber: 3,
        title: 'Left Ventricle & Systemic Outflow Tract (LVOT)',
        structureId: 'left-ventricle',
        cameraPosition: [-1.8, -0.6, 2.5],
        cameraTarget: [-0.4, -0.3, 0.2],
        description: 'The left ventricle wall is 3 times thicker than the right ventricle (8-12 mm vs 3-5 mm) to overcome high systemic vascular resistance. It contains anterior and posterior papillary muscles attaching to chordae tendineae of the bicuspid mitral valve.',
        clinicalPearl: 'Concentric hypertrophy without chamber dilation signifies chronic pressure overload (e.g. systemic essential hypertension or aortic stenosis).'
      },
      {
        stepNumber: 4,
        title: 'Aortic Root, Sinuses of Valsalva & Coronary Ostia',
        structureId: 'ascending-aorta',
        cameraPosition: [0.2, 1.8, 2.2],
        cameraTarget: [0, 0.6, 0],
        description: 'The ascending aorta arises from the base of the left ventricle. Behind the three aortic semilunar cusps lie the aortic sinuses (of Valsalva): the right coronary artery arises from the anterior aortic sinus, and the left coronary artery from the left posterior aortic sinus.',
        clinicalPearl: 'During ventricular systole, aortic valve cusps shield coronary ostia; coronary perfusion occurs predominantly during ventricular diastole.'
      },
      {
        stepNumber: 5,
        title: 'Left Anterior Descending (LAD) & Coronary Vasculature',
        structureId: 'coronary-arteries',
        cameraPosition: [-0.6, 0.4, 2.0],
        cameraTarget: [-0.2, 0, 0.4],
        description: 'The left main coronary artery divides into the LAD (arteria coronaria anterior descendens) and circumflex branch. The LAD travels down the anterior interventricular groove to supply the anterior 2/3 of the interventricular septum, apex, and anterior LV wall.',
        clinicalPearl: 'LAD occlusion causes anterior wall STEMI and carries the highest mortality among single-vessel occlusions ("the widow-maker").'
      }
    ]
  },
  {
    id: 'respiratory-tracheobronchial-tour',
    title: 'Respiratory: Tracheobronchial Tree & Pulmonary Lobes',
    system: 'respiratory',
    region: 'thorax',
    estimatedMinutes: 6,
    description: 'Systematic tour of airway conducting zones, carina bifurcation, right vs left bronchus anatomy, pulmonary fissures, and bronchopulmonary segments.',
    steps: [
      {
        stepNumber: 1,
        title: 'Trachea & Carina Bifurcation',
        structureId: 'trachea-carina',
        cameraPosition: [0, 2.2, 3.0],
        cameraTarget: [0, 1.2, 0],
        description: 'The trachea begins at the lower border of cricoid cartilage (C6) and bifurcates at the sternal angle of Louis (T4/T5 disc) into right and left main bronchi. The keel-like cartilaginous ridge internally is the carina.',
        clinicalPearl: 'The carina is richly innervated by vagus sensory fibers; mechanical irritation triggers a violent cough reflex.'
      },
      {
        stepNumber: 2,
        title: 'Right Main Bronchus vs Left Main Bronchus',
        structureId: 'right-lung',
        cameraPosition: [1.8, 1.0, 2.6],
        cameraTarget: [0.6, 0.4, 0],
        description: 'The right main bronchus is wider (14 mm vs 10 mm), shorter (2.5 cm vs 5 cm), and more vertical (25° vs 45° off vertical) than the left. Foreign bodies aspirated in sitting/standing posture almost always enter the right bronchial tree.',
        clinicalPearl: 'Aspirated foreign bodies preferentially lodge in the right middle or right lower lobe bronchi.'
      },
      {
        stepNumber: 3,
        title: 'Right Lung Lobes & Fissures',
        structureId: 'right-lung',
        cameraPosition: [2.5, 0.2, 2.2],
        cameraTarget: [0.8, 0.2, 0],
        description: 'The right lung has 3 lobes (Superior, Middle, Inferior) demarcated by the Oblique fissure (spans T3/T4 spine to 6th costochondral junction) and Horizontal fissure (follows 4th costal cartilage).',
        clinicalPearl: 'Auscultation of the middle lobe is performed anteriorly on the right chest between the 4th and 6th ribs.'
      },
      {
        stepNumber: 4,
        title: 'Left Lung Cardiac Notch & Lingula',
        structureId: 'left-lung',
        cameraPosition: [-2.5, 0.2, 2.2],
        cameraTarget: [-0.8, 0.2, 0],
        description: 'The left lung has 2 lobes (Superior and Inferior) separated by a single oblique fissure. The anterior border of the superior lobe features a prominent cardiac notch, terminating inferiorly in the tongue-like lingula (homologue of right middle lobe).',
        clinicalPearl: 'Lingular pneumonia presents with auscultatory crackles beneath the left nipple and can mimic pericarditis.'
      }
    ]
  },
  {
    id: 'neuro-circle-of-willis-tour',
    title: 'Neuroanatomy: Circle of Willis & Cranial Innervation',
    system: 'nervous',
    region: 'neuroanatomy',
    estimatedMinutes: 7,
    description: 'Detailed anatomical walkthrough of the arterial polygon of Willis at the base of the brain, cranial nerve exit points, and stroke syndromes.',
    steps: [
      {
        stepNumber: 1,
        title: 'Circle of Willis (Circulus Arteriosus Cerebri)',
        structureId: 'circle-of-willis',
        cameraPosition: [0, 0.5, 2.0],
        cameraTarget: [0, 0.3, 0],
        description: 'Formed at the interpeduncular fossa around the optic chiasma and infundibulum. An anastomosis between internal carotid arteries anteriorly and vertebrobasilar circulation posteriorly via posterior communicating arteries.',
        clinicalPearl: 'Saccular (berry) aneurysms most commonly arise at the junction of the anterior communicating artery and ACA (40%), followed by PComm-ICA junction (30%).'
      },
      {
        stepNumber: 2,
        title: 'Vagus Nerve (CN X) & Brainstem Emergence',
        structureId: 'vagus-nerve',
        cameraPosition: [0.8, 0.8, 2.2],
        cameraTarget: [0.2, 0.4, 0],
        description: 'Emerges from the post-olivary sulcus of the medulla oblongata as 8-10 rootlets, exits through the intermediate compartment of jugular foramen, and descends in the carotid sheath between ICA/CCA and internal jugular vein.',
        clinicalPearl: 'Recurrent laryngeal nerve is a branch of vagus. Left hooks under aortic arch; right hooks under right subclavian artery. Injury causes hoarseness or bilateral stridor.'
      }
    ]
  },
  {
    id: 'digestive-appendix-biliary-tour',
    title: 'Gastrointestinal: Stomach, Duodenum & Vermiform Appendix',
    system: 'digestive',
    region: 'abdomen',
    estimatedMinutes: 8,
    description: 'Anatomical review of peritoneal relations, appendicular artery, McBurney point, and hepatobiliary triangle of Calot.',
    steps: [
      {
        stepNumber: 1,
        title: 'Vermiform Appendix & Mesoappendix',
        structureId: 'vermiform-appendix',
        cameraPosition: [1.2, -1.0, 2.5],
        cameraTarget: [0.5, -0.6, 0.3],
        description: 'Blind intestinal diverticulum arising from the posteromedial wall of the caecum, 2 cm below the ileocaecal valve where the three taeniae coli converge. Blood supply is the appendicular artery (branch of ileocolic from SMA).',
        clinicalPearl: 'Appendicular artery is an anatomic end artery running in the free border of the mesoappendix; thrombosis results in gangrene and perforation.'
      },
      {
        stepNumber: 2,
        title: 'McBurney’s Point & Surface Anatomy',
        structureId: 'vermiform-appendix',
        cameraPosition: [1.5, -0.8, 2.0],
        cameraTarget: [0.5, -0.6, 0.3],
        description: 'McBurney’s point corresponds to the base of the appendix: situated at the junction of the lateral 1/3 and medial 2/3 of a line joining the right anterior superior iliac spine (ASIS) to the umbilicus.',
        clinicalPearl: 'Maximal tenderness at McBurney’s point with rebound tenderness (Blumberg sign) is the hallmark of acute appendicitis.'
      },
      {
        stepNumber: 3,
        title: 'Porta Hepatis & Biliary Apparatus',
        structureId: 'liver-porta-hepatis',
        cameraPosition: [0.4, -0.2, 2.5],
        cameraTarget: [0.2, -0.2, 0.1],
        description: 'Deep transverse fissure on the postero-inferior surface of the right lobe of the liver. From anterior to posterior, the structures in the free edge of the lesser omentum are: Common Bile Duct (right anterior), Hepatic Artery Proper (left anterior), and Portal Vein (posterior).',
        clinicalPearl: 'The Pringle maneuver compresses the free edge of the lesser omentum (containing portal triad) to control hepatic hemorrhage during emergency trauma surgery.'
      }
    ]
  }
];
