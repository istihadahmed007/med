import { HistologySlide } from '../types';

export const HISTOLOGY_SLIDES: HistologySlide[] = [
  {
    id: 'liver-cirrhosis',
    organ: 'Liver',
    stain: 'Hematoxylin & Eosin (H&E) + Masson Trichrome',
    normalTitle: 'Normal Hepatic Lobular Architecture',
    pathologicalTitle: 'Micronodular Hepatic Cirrhosis',
    clinicalContext: '48-year-old male with chronic hepatitis B and decompensated liver disease, presenting with ascites, splenomegaly, and palmar erythema.',
    magnificationAvailable: ['4x', '10x', '40x', '100x'],
    normalFeatures: [
      {
        name: 'Central Vein (Terminal Hepatic Venule)',
        description: 'Thin-walled venule lined by single endothelial layer, situated at center of the classic hepatic lobule.',
        coords: { x: 50, y: 50 }
      },
      {
        name: 'Portal Triad',
        description: 'Contains branch of Portal Vein (large lumen, thin wall), Hepatic Artery branch (thick muscular wall), and Bile Ductule (simple cuboidal epithelium).',
        coords: { x: 82, y: 22 }
      },
      {
        name: 'Hepatic Cords & Sinusoids',
        description: 'Single-cell thick plates of polyhedral hepatocytes radiating from central vein to portal triad, separated by fenestrated sinusoids with Kupffer cells.',
        coords: { x: 35, y: 65 }
      }
    ],
    pathologicalFeatures: [
      {
        name: 'Bridging Fibrous Septa',
        description: 'Dense bands of collagenous fibrous tissue connecting portal-to-portal and portal-to-central areas (stained blue on Masson Trichrome).',
        coords: { x: 45, y: 40 }
      },
      {
        name: 'Regenerative Hepatocyte Nodules',
        description: 'Islands of proliferating hepatocytes without normal lobular architecture; cords are 2-3 cells thick with absent central veins.',
        coords: { x: 70, y: 60 }
      },
      {
        name: 'Ductular Proliferation & Chronic Infiltrate',
        description: 'Proliferating reactive bile ductules with dense lymphocytic infiltration within the fibrous septa.',
        coords: { x: 28, y: 78 }
      }
    ],
    hallmarkMicroscopicFinding: 'Diffuse hepatic fibrosis dividing liver parenchyma into structurally abnormal regenerative parenchymal nodules with complete loss of normal lobular architecture.',
    bmdcExamPearls: 'Common 3rd/4th year OSPE spotting slide. Key questions: Name the special stain for collagen (Masson Trichrome - stains collagen blue), identify the triad of cirrhosis (diffuse fibrosis, regenerative nodules, parenchymal architectural distortion).',
    references: "Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 18; Wheater's Functional Histology, 6th Ed."
  },
  {
    id: 'glomerulonephritis',
    organ: 'Kidney (Renal Cortex)',
    stain: 'Periodic Acid-Schiff (PAS) + H&E',
    normalTitle: 'Normal Renal Glomerulus & Tubules',
    pathologicalTitle: 'Rapidly Progressive (Crescentic) Glomerulonephritis',
    clinicalContext: '32-year-old female with rapidly worsening renal failure, macroscopic hematuria (smoky urine), hypertension, and oliguria.',
    magnificationAvailable: ['4x', '10x', '40x', '100x'],
    normalFeatures: [
      {
        name: 'Bowman Capsule & Urinary Space',
        description: 'Parietal layer of simple squamous epithelium enclosing the clear urinary space (Bowman space) without cellular proliferation.',
        coords: { x: 50, y: 20 }
      },
      {
        name: 'Glomerular Capillary Tuft',
        description: 'Delicate capillary loops lined by fenestrated endothelium, supported by mesangial cells and covered by visceral epithelial cells (podocytes).',
        coords: { x: 50, y: 55 }
      },
      {
        name: 'Proximal Convoluted Tubules',
        description: 'Prominent brush border of microvilli with simple cuboidal cells having intense eosinophilic cytoplasm and round basal nuclei.',
        coords: { x: 80, y: 75 }
      }
    ],
    pathologicalFeatures: [
      {
        name: 'Cellular Crescent Formation',
        description: 'Proliferation of parietal epithelial cells and infiltrating monocytes/macrophages in Bowman space, compressed into a crescent shape.',
        coords: { x: 38, y: 35 }
      },
      {
        name: 'Fibrinoid Necrosis & Capillary Collapse',
        description: 'Severe necrosis of capillary loops with extravasation of plasma proteins and fibrin into the urinary space, stimulating crescent growth.',
        coords: { x: 58, y: 62 }
      },
      {
        name: 'Tubular Red Blood Cell Casts',
        description: 'Lumina of surrounding renal tubules packed with degraded red blood cells forming pathognomonic RBC casts of glomerular bleeding.',
        coords: { x: 82, y: 30 }
      }
    ],
    hallmarkMicroscopicFinding: 'Presence of crescents occupying Bowman space in >50% of glomeruli, composed of proliferating parietal cells, macrophages, and fibrin deposits.',
    bmdcExamPearls: 'High-yield pathology viva topic. Examiner asks: What triggers crescent formation? (Disruption of capillary wall allowing fibrin into Bowman space). Differentiate type 1 (Anti-GBM), type 2 (Immune complex), and type 3 (Pauci-immune / ANCA).',
    references: "Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 20; Heptinstall's Pathology of the Kidney, 7th Ed."
  },
  {
    id: 'acute-leukemia',
    organ: 'Peripheral Blood Film & Bone Marrow',
    stain: 'Leishman / Wright-Giemsa Stain',
    normalTitle: 'Normal Peripheral Blood Smear',
    pathologicalTitle: 'Acute Myeloid Leukemia (AML - M2/M3)',
    clinicalContext: '24-year-old male presenting with severe fatigue, pallor, petechial purpura on lower limbs, gum bleeding, and persistent fever.',
    magnificationAvailable: ['10x', '40x', '100x'],
    normalFeatures: [
      {
        name: 'Normocytic Normochromic Erythrocytes',
        description: 'Biconcave disc RBCs (7-8 µm diameter) with central pallor occupying approximately one-third of the cell diameter.',
        coords: { x: 30, y: 40 }
      },
      {
        name: 'Mature Segmented Neutrophil',
        description: '3 to 5 nuclear lobes connected by delicate chromatin strands with fine pink-purple secondary cytoplasmic granules.',
        coords: { x: 72, y: 45 }
      },
      {
        name: 'Platelet Clusters',
        description: 'Small anucleate discoid cytoplasmic fragments (2-3 µm) with central azurophilic granules (granulomere) and pale blue hyalomere.',
        coords: { x: 50, y: 78 }
      }
    ],
    pathologicalFeatures: [
      {
        name: 'Myeloblasts (>20% of Cells)',
        description: 'Large immature cells (15-20 µm) with high N:C ratio, open fine lace-like chromatin, and 2-4 prominent round nucleoli.',
        coords: { x: 48, y: 42 }
      },
      {
        name: 'Auer Rods (Pathognomonic)',
        description: 'Reddish-purple needle-like crystalline cytoplasmic inclusions composed of fused lysosomes containing myeloperoxidase (MPO).',
        coords: { x: 58, y: 38 }
      },
      {
        name: 'Marked Thrombocytopenia & Anemia',
        description: 'Severe paucity of platelets (<20,000/µL) and reduced RBC density due to leukemic bone marrow crowding out normal hematopoiesis.',
        coords: { x: 75, y: 70 }
      }
    ],
    hallmarkMicroscopicFinding: 'Bone marrow or peripheral blood showing >20% blasts with fine nuclear chromatin, distinct nucleoli, and pathognomonic crystalline Auer rods in the cytoplasm.',
    bmdcExamPearls: 'Classic hematology practical OSPE station. Question: What is the cytochemical stain of choice? (Myeloperoxidase / Sudan Black B - positive in AML, negative in ALL). Identify Auer rod under oil immersion (100x).',
    references: 'Dacie and Lewis Practical Haematology, 12th Ed; Robbins & Cotran Pathologic Basis of Disease, 10th Ed, Ch. 13.'
  }
];
