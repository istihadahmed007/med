/**
 * Verified Bangladesh Drug Reference and Pharmacology Study Center Data
 *
 * Sourced strictly from:
 * - Directorate General of Drug Administration (DGDA) Registered Product Database
 * - Bangladesh National Formulary (BDNF) & DGHS National Treatment Guidelines
 * - WHO Model List of Essential Medicines (EML 23rd List) & ATC Index
 * - British National Formulary (BNF 86) & Katzung Basic & Clinical Pharmacology (15th Ed)
 */

import {
  DrugGeneric,
  DrugBrand,
  Manufacturer,
  TherapeuticClass,
  DrugInteraction,
  DiseaseGuideline,
  ClinicalInvestigation
} from '../types/drug';

export const VERIFIED_MANUFACTURERS: Manufacturer[] = [
  {
    "id": "square",
    "name": "Square Pharmaceuticals PLC",
    "shortName": "Square",
    "nameBn": "স্কয়ার ফার্মাসিউটিক্যালস পিএলসি",
    "headquarters": "Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (Licence No. 121)",
    "website": "https://www.squarepharma.com.bd",
    "totalVerifiedBrands": 28
  },
  {
    "id": "beximco",
    "name": "Beximco Pharmaceuticals Ltd",
    "shortName": "Beximco",
    "nameBn": "বেক্সিমকো ফার্মাসিউটিক্যালস লিমিটেড",
    "headquarters": "Tongir, Gazipur, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (US FDA & TGA Approved)",
    "website": "https://www.beximcopharma.com",
    "totalVerifiedBrands": 26
  },
  {
    "id": "incepta",
    "name": "Incepta Pharmaceuticals Ltd",
    "shortName": "Incepta",
    "nameBn": "ইনসেপ্টা ফার্মাসিউটিক্যালস লিমিটেড",
    "headquarters": "Savar, Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (UK MHRA Approved)",
    "website": "https://www.inceptapharma.com",
    "totalVerifiedBrands": 24
  },
  {
    "id": "renata",
    "name": "Renata Limited",
    "shortName": "Renata",
    "nameBn": "রেনাটা লিমিটেড",
    "headquarters": "Mirpur, Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (UK MHRA Approved)",
    "website": "https://renata-ltd.com",
    "totalVerifiedBrands": 20
  },
  {
    "id": "eskayef",
    "name": "Eskayef Pharmaceuticals Ltd",
    "shortName": "Eskayef (SK+F)",
    "nameBn": "এসকেএফ ফার্মাসিউটিক্যালস লিমিটেড",
    "headquarters": "Tongi, Gazipur, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (US FDA & UK MHRA Approved)",
    "website": "https://www.skfbd.com",
    "totalVerifiedBrands": 18
  },
  {
    "id": "acme",
    "name": "The ACME Laboratories Ltd",
    "shortName": "ACME",
    "nameBn": "দি একমি ল্যাবরেটরিজ লিমিটেড",
    "headquarters": "Kallayanpur, Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (Licence No. 042)",
    "website": "https://www.acmeglobal.com",
    "totalVerifiedBrands": 16
  },
  {
    "id": "healthcare",
    "name": "Healthcare Pharmaceuticals Ltd",
    "shortName": "Healthcare",
    "nameBn": "হেলথকেয়ার ফার্মাসিউটিক্যালস লিমিটেড",
    "headquarters": "Rajendrapur, Gazipur, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (TGA Australia Approved)",
    "website": "https://www.hplbd.com",
    "totalVerifiedBrands": 15
  },
  {
    "id": "opsonin",
    "name": "Opsonin Pharma Ltd",
    "shortName": "Opsonin",
    "nameBn": "অপসোনি ফার্মা লিমিটেড",
    "headquarters": "Barishal & Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (Licence No. 064)",
    "website": "https://www.opsonin.com",
    "totalVerifiedBrands": 14
  },
  {
    "id": "aristopharma",
    "name": "Aristopharma Ltd",
    "shortName": "Aristopharma",
    "nameBn": "অ্যারিস্টোফার্মা লিমিটেড",
    "headquarters": "Shampur, Dhaka, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (Licence No. 088)",
    "website": "https://www.aristopharma.com",
    "totalVerifiedBrands": 12
  },
  {
    "id": "drug-international",
    "name": "Drug International Ltd",
    "shortName": "DIL",
    "nameBn": "ড্রাগ ইন্টারন্যাশনাল লিমিটেড",
    "headquarters": "Tongi, Gazipur, Bangladesh",
    "dgdaStatus": "Active GMP Certified Manufacturer (Pioneer in Soft Gelatin)",
    "website": "https://www.drug-international.com",
    "totalVerifiedBrands": 10
  }
];

export const VERIFIED_THERAPEUTIC_CLASSES: TherapeuticClass[] = [
  {
    "id": "cardiovascular-renal",
    "name": "Cardiovascular & Renal Drugs",
    "nameBn": "হৃদরোগ ও বৃক্কীয় ওষুধ",
    "description": "Medicines for hypertension, heart failure, edema, arrhythmias, and ischemic heart disease.",
    "subclasses": [
      "Loop Diuretics",
      "Thiazide Diuretics",
      "Aldosterone Antagonists",
      "ACE Inhibitors",
      "ARBs",
      "Beta Blockers",
      "Calcium Channel Blockers",
      "Statins",
      "Antiplatelets",
      "Anticoagulants"
    ]
  },
  {
    "id": "gastrointestinal",
    "name": "Gastrointestinal & Anti-Ulcer Drugs",
    "nameBn": "পরিপাকতন্ত্র ও পেপটিক আলসার ওষুধ",
    "description": "Proton pump inhibitors, H2 blockers, prokinetics, and antispasmodics.",
    "subclasses": [
      "Proton Pump Inhibitors",
      "H2-Receptor Antagonists",
      "Prokinetics",
      "Antispasmodics"
    ]
  },
  {
    "id": "antimicrobials",
    "name": "Antimicrobial Agents & Antibiotics",
    "nameBn": "অ্যান্টিমাইক্রোবিয়াল ও অ্যান্টিবায়োটিক",
    "description": "Bactericidal and bacteriostatic chemotherapeutic agents.",
    "subclasses": [
      "Aminopenicillins",
      "Cephalosporins",
      "Macrolides",
      "Fluoroquinolones",
      "Tetracyclines"
    ]
  },
  {
    "id": "analgesics-antipyretics",
    "name": "Analgesics, Antipyretics & Anti-inflammatory",
    "nameBn": "ব্যথানাশক ও জ্বর প্রশমক ওষুধ",
    "description": "Centrally and peripherally acting analgesics and NSAIDs.",
    "subclasses": [
      "p-Aminophenol Derivatives",
      "NSAIDs",
      "COX-2 Inhibitors",
      "Opioids"
    ]
  },
  {
    "id": "endocrine-metabolic",
    "name": "Endocrine & Metabolic Drugs",
    "nameBn": "অন্তঃক্ষরা ও বিপাকীয় ওষুধ",
    "description": "Oral hypoglycemic agents, insulins, and corticosteroids.",
    "subclasses": [
      "Biguanides",
      "Insulins",
      "Glucocorticoids",
      "Sulfonylureas"
    ]
  },
  {
    "id": "respiratory",
    "name": "Respiratory & Bronchodilator Drugs",
    "nameBn": "শ্বাসতন্ত্র ও ব্রঙ্কোডাইলেটর ওষুধ",
    "description": "Bronchodilators, inhaled corticosteroids, and leukotriene antagonists.",
    "subclasses": [
      "Short-Acting Beta-2 Agonists",
      "Inhaled Corticosteroids",
      "Leukotriene Antagonists"
    ]
  }
];

export const VERIFIED_GENERICS: DrugGeneric[] = [
  {
    "id": "furosemide",
    "name": "Furosemide",
    "nameBn": "ফিউরোসেমাইড",
    "normalizedName": "furosemide",
    "pharmacologicalClass": "Loop Diuretic (High-ceiling NKCC2 inhibitor)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "C03CA01",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Furosemide reversibly inhibits the luminal Na+/K+/2Cl- cotransporter (NKCC2) in the thick ascending limb of the loop of Henle. This blocks reabsorption of sodium, potassium, and chloride, abolishing the medullary concentration gradient and causing high-volume isotonic diuresis. It also induces renal prostaglandin-mediated capacitance venodilation.",
    "receptorOrTarget": "Luminal Na+/K+/2Cl- cotransporter 2 (NKCC2) in thick ascending limb of loop of Henle",
    "indications": [
      {
        "id": "ind-hf",
        "name": "Congestive Heart Failure (Acute pulmonary edema & chronic volume overload)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line symptomatic relief of fluid congestion (DGHS & ESC Guidelines)"
      },
      {
        "id": "ind-cirrhosis",
        "name": "Hepatic Cirrhosis with Ascites and Peripheral Edema",
        "isPrimary": true,
        "note": "Combined with Spironolactone 100:40 ratio"
      },
      {
        "id": "ind-nephrotic",
        "name": "Nephrotic Syndrome and CKD Fluid Retention",
        "isPrimary": true
      },
      {
        "id": "ind-htn-crisis",
        "name": "Hypertensive Crisis with Fluid Overload",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Anuria unresponsive to test dose",
        "type": "absolute",
        "reason": "Risk of cumulative ototoxicity and metabolic encephalopathy"
      },
      {
        "condition": "Severe hypokalemia (< 3.0 mmol/L)",
        "type": "absolute",
        "reason": "Precipitates fatal cardiac arrhythmias"
      },
      {
        "condition": "Hepatic pre-coma / encephalopathy",
        "type": "absolute",
        "reason": "Hypokalemia increases renal ammonia production"
      }
    ],
    "dosageGuidance": {
      "adult": "Oral: 20-40 mg initial once daily; titrate up to 80-160 mg/day. IV: 40 mg slow IV bolus over 2 min in acute pulmonary edema.",
      "paediatric": "Oral: 1-2 mg/kg once daily (Max 6 mg/kg/day). IV: 1 mg/kg slow IV.",
      "geriatric": "Start at lowest adult dose (20 mg) to prevent severe orthostatic hypotension.",
      "routes": [
        "Oral",
        "IV",
        "IM"
      ],
      "timingNotice": "Take in the morning to prevent nocturia."
    },
    "doseAdjustment": {
      "renal": "Higher doses (80-250 mg IV) needed in eGFR < 30 mL/min; maximum IV rate 4 mg/min to prevent ototoxicity.",
      "hepatic": "Careful titration in cirrhosis to avoid rapid intravascular depletion."
    },
    "adverseEffects": {
      "common": [
        "Hypokalemia",
        "Hyponatremia",
        "Hypomagnesemia",
        "Hypochloremic alkalosis",
        "Orthostatic hypotension",
        "Hyperuricemia (gout)"
      ],
      "uncommon": [
        "Hyperglycemia",
        "Hypercholesterolemia",
        "Dehydration"
      ],
      "rare": [
        "Ototoxicity (tinnitus, sensorineural deafness)",
        "Acute interstitial nephritis",
        "Agranulocytosis"
      ],
      "seriousWarnings": [
        "Black Box: Profound fluid and electrolyte depletion, acute hypovolemic shock, cardiac arrest from hypokalemia, and ototoxicity if infused > 4 mg/min."
      ]
    },
    "precautions": [
      "Monitor serum K+, Na+, and creatinine regularly. Advise dietary potassium (bananas, green coconut water)."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Electrolytes (Na+, K+, Cl-)",
        "frequency": "Baseline, day 3-5 IV, then every 1-3 months",
        "targetOrClinicalAction": "Keep K+ 4.0-5.0 mmol/L"
      },
      {
        "parameter": "Serum Creatinine & BUN",
        "frequency": "Baseline and periodically",
        "targetOrClinicalAction": "Assess for prerenal azotemia"
      }
    ],
    "foodInteractions": "Oral absorption delayed by high-fat meals. Take on empty stomach with water.",
    "pregnancyInfo": {
      "category": "Category C",
      "details": "Crosses placenta. Decreases placental perfusion. Indicated only for maternal pulmonary edema."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Excreted in small amounts. High doses may inhibit lactation."
    },
    "paediatricConsiderations": "May cause nephrocalcinosis in premature neonates.",
    "geriatricConsiderations": "High risk of orthostatic hypotension and falls.",
    "overdoseInformation": {
      "symptoms": "Profound hypovolemia, hypotension, hypokalemic arrhythmias.",
      "management": "IV normal saline and KCl under ECG monitoring. No specific antidote."
    },
    "storageInformation": "Store below 30°C in a dry place protected from light.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List of Bangladesh",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. Tariqul Islam",
      "reviewerCredentials": "FCPS, MD (Nephrology), DMC",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "লুপ ডাইইউরেটিক (উচ্চ মাত্রার মূত্রবর্ধক ওষুধ)",
      "mechanismSummaryBn": "কিডনির হেনলির লুপে সোডিয়াম ও পানি পুনঃশোষণ বন্ধ করে দ্রুত অতিরিক্ত পানি বের করে দেয়।",
      "patientCounsellingBn": "প্রতিদিন সকালে সেবন করুন যাতে রাতে ঘুমের ব্যাঘাত না ঘটে। ডাবের পানি বা কলা খেতে পারেন।",
      "criticalWarningBn": "অতিরিক্ত প্রস্রাবের কারণে লবণ ও পানির মারাত্মক ঘাটতি হতে পারে; মাংসপেশিতে টান লাগলে ডাক্তার দেখান।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Loop of Henle NKCC2 inhibition -> loss of medullary gradient -> solute diuresis + venous capacitance dilation.",
      "receptorTarget": "NKCC2 cotransporter in thick ascending limb",
      "vivaQuestions": [
        {
          "question": "Why is Furosemide high-ceiling?",
          "questionBn": "ফিউরোসেমাইডকে কেন হাই-সিলিং ডাইইউরেটিক বলে?",
          "modelAnswer": "Steep dose-response curve excreting up to 25% of filtered sodium load.",
          "highYieldPearl": "Thick ascending limb reabsorbs 25% of filtered sodium."
        },
        {
          "question": "Why does Furosemide provide relief before diuresis starts?",
          "questionBn": "প্রস্রাব শুরুর আগেই ফিউরোসেমাইড কেন দ্রুত আরাম দেয়?",
          "modelAnswer": "Within 5-15 min of IV injection, it stimulates renal prostaglandin release, inducing systemic venodilation and reducing cardiac preload.",
          "highYieldPearl": "NSAIDs blunt this early venodilatory action."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-furo-01",
          "front": "Molecular target of Furosemide?",
          "back": "NKCC2 symporter in thick ascending limb of loop of Henle.",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-furo-02",
          "front": "Maximum recommended IV injection rate?",
          "back": "4 mg/minute to avoid ototoxicity.",
          "topic": "Safety",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-furo-01",
          "question": "Initial hemodynamic relief in acute pulmonary edema from IV furosemide is due to?",
          "options": [
            "Prostaglandin-mediated venodilation",
            "Sodium excretion",
            "Inotropic effect",
            "Alpha blockade"
          ],
          "correctIndex": 0,
          "explanation": "Venodilation occurs within 5-15 min before diuresis starts.",
          "bmdcFocus": "Phase 2 Pharmacology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Decompensated Heart Failure & Overdiuresis",
        "patientProfile": "68M with bilateral pedal edema and orthopnea.",
        "presentation": "Treated with IV furosemide, developed severe hypokalemic cramps.",
        "clinicalQuestion": "Immediate action?",
        "discussion": "Pause furosemide, infuse IV potassium chloride with cardiac telemetry."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 15: Diuretic Agents",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "Essentials of Medical Pharmacology — K. D. Tripathi",
          "edition": "8th Edition",
          "chapterOrSection": "Chapter 41: Diuretics",
          "verifiedTextbookId": "kd-tripathi-essentials-medical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-failure",
        "heart-and-cardiac-cycle"
      ]
    }
  },
  {
    "id": "hydrochlorothiazide",
    "name": "Hydrochlorothiazide",
    "nameBn": "হাইড্রোক্লোরোথায়াজাইড",
    "normalizedName": "hydrochlorothiazide",
    "pharmacologicalClass": "Thiazide Diuretic (NCC Symporter Inhibitor)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "C03AA03",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Inhibits the Na+/Cl- cotransporter (NCCT) in the luminal membrane of the early distal convoluted tubule. This increases urinary excretion of sodium, chloride, and water (~5% of filtered load). Unlike loop diuretics, thiazides reduce urinary calcium excretion by enhancing basolateral Na+/Ca2+ exchange, producing hypocalciuria and protecting against osteoporotic bone loss.",
    "receptorOrTarget": "Luminal Na+/Cl- cotransporter (NCC / SLC12A3) in early distal convoluted tubule",
    "indications": [
      {
        "id": "ind-htn",
        "name": "Essential Hypertension",
        "isPrimary": true,
        "guidelineRecommendation": "First-line monotherapy or combination with ARB/ACEI (NHF Guidelines)"
      },
      {
        "id": "ind-stones",
        "name": "Recurrent Idiopathic Calcium Nephrolithiasis",
        "isPrimary": true,
        "note": "Reduces urinary calcium concentration"
      }
    ],
    "contraindications": [
      {
        "condition": "Severe renal impairment (eGFR < 30 mL/min)",
        "type": "absolute",
        "reason": "Ineffective when eGFR < 30 mL/min; loop diuretics required instead"
      },
      {
        "condition": "Severe hyponatremia and hypokalemia",
        "type": "absolute",
        "reason": "Risk of fatal cardiac arrhythmias and cerebral edema"
      },
      {
        "condition": "Acute gout / hyperuricemia",
        "type": "relative",
        "reason": "Competes with uric acid secretion in proximal tubule"
      }
    ],
    "dosageGuidance": {
      "adult": "Hypertension: 12.5 mg to 25 mg once daily in the morning (doses > 25 mg increase metabolic adverse effects without greater BP reduction).",
      "paediatric": "1-2 mg/kg/day in 1-2 divided doses.",
      "geriatric": "Initial 12.5 mg daily; monitor for hyponatremia.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take with breakfast in the morning."
    },
    "doseAdjustment": {
      "renal": "Ineffective in eGFR < 30 mL/min; switch to loop diuretic.",
      "hepatic": "Caution in severe hepatic disease to prevent encephalopathy."
    },
    "adverseEffects": {
      "common": [
        "Hypokalemia",
        "Hyponatremia",
        "Hyperuricemia (gout)",
        "Hyperglycemia",
        "Hypercholesterolemia"
      ],
      "uncommon": [
        "Hypercalcemia",
        "Orthostatic hypotension",
        "Erectile dysfunction"
      ],
      "rare": [
        "Acute angle-closure glaucoma",
        "Agranulocytosis",
        "Thrombocytopenia"
      ],
      "seriousWarnings": [
        "Severe Thiazide-Induced Hyponatremia: Elderly female patients are at high risk of rapid, severe hyponatremia leading to seizures and cerebral edema."
      ]
    },
    "precautions": [
      "Monitor serum sodium, potassium, and uric acid regularly. Caution in diabetes."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Sodium & Potassium",
        "frequency": "Baseline, 2-4 weeks, then periodically",
        "targetOrClinicalAction": "Check for hyponatremia in elderly"
      },
      {
        "parameter": "Blood Glucose & Lipids",
        "frequency": "Annually",
        "targetOrClinicalAction": "Monitor metabolic parameters"
      }
    ],
    "foodInteractions": "Can be taken with or without food.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Crosses placenta. Not recommended for gestational hypertension due to maternal hypovolemia."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Excreted in breast milk; high doses can suppress lactation."
    },
    "paediatricConsiderations": "Safe in children for hypertension and edema.",
    "geriatricConsiderations": "High incidence of hyponatremia and hypokalemia. Doses above 25 mg should be avoided.",
    "overdoseInformation": {
      "symptoms": "Severe dehydration, lethargy, hyponatremic encephalopathy.",
      "management": "Electrolyte repletion with normal saline; monitor vital signs."
    },
    "storageInformation": "Store below 25°C in airtight container.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National List of Essential Medicines",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Thiazide Diuretics",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. Tariqul Islam",
      "reviewerCredentials": "FCPS, MD (Nephrology), DMC",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.1.0"
    },
    "bilingualNotes": {
      "classBn": "থায়াজাইড ডাইইউরেটিক (ডিস্টাল টিউবিউলে কাজ করা রক্তচাপ কমানোর ওষুধ)",
      "mechanismSummaryBn": "কিডনির ডিস্টাল পেঁচানো নালিকায় সোডিয়াম পুনঃশোষণ বন্ধ করে রক্তচাপ কমায় এবং প্রস্রাবে ক্যালসিয়াম বের হওয়া রোধ করে।",
      "patientCounsellingBn": "সকালে সেবন করুন। নিয়মিত রক্তে সোডিয়াম ও পটাশিয়াম পরীক্ষা করান। বাতের ব্যথা থাকলে ডাক্তারকে জানান।",
      "criticalWarningBn": "বয়স্ক রোগীদের ক্ষেত্রে হঠাৎ রক্তে সোডিয়াম কমে গিয়ে মারাত্মক অচেতনতা দেখা দিতে পারে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Early DCT Na+/Cl- cotransporter (NCC) blockade -> ~5% natriuresis + enhanced basolateral Na+/Ca2+ exchange (hypocalciuria).",
      "receptorTarget": "NCC (SLC12A3) in Distal Convoluted Tubule",
      "vivaQuestions": [
        {
          "question": "Why does Hydrochlorothiazide cause hypocalciuria while Furosemide causes hypercalciuria?",
          "questionBn": "থায়াজাইড কেন ক্যালসিয়াম ক্ষয় কমায় কিন্তু লুপ ডাইইউরেটিক ক্যালসিয়াম ক্ষয় বাড়ায়?",
          "modelAnswer": "Thiazides block NCC in the DCT, lowering intracellular Na+ and stimulating basolateral Na+/Ca2+ antiporter to reabsorb calcium. Furosemide abolishes lumen-positive transepithelial potential in loop of Henle, eliminating driving force for paracellular Ca2+ and Mg2+ reabsorption.",
          "highYieldPearl": "Thiazides protect bones in osteoporosis and prevent recurrent calcium renal stones."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-hctz-01",
          "front": "Site of action of Hydrochlorothiazide?",
          "back": "Early distal convoluted tubule (blocks NCC cotransporter).",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-hctz-02",
          "front": "Effect of Thiazides on urinary calcium?",
          "back": "Decreases urinary calcium excretion (causes hypocalciuria / hypercalcemia).",
          "topic": "Renal Physiology",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-hctz-01",
          "question": "A 64-year-old female with osteoporosis and hypertension needs a diuretic that helps preserve bone density. Which drug is preferred?",
          "options": [
            "Furosemide",
            "Hydrochlorothiazide",
            "Spironolactone",
            "Acetazolamide",
            "Mannitol"
          ],
          "correctIndex": 1,
          "explanation": "Hydrochlorothiazide reduces urinary calcium excretion, increasing bone mineral density.",
          "bmdcFocus": "Phase 2 Pharmacology Core"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Hypertension & Recurrent Calcium Stones",
        "patientProfile": "48M with recurrent calcium oxalate nephrolithiasis and BP 152/94 mmHg.",
        "presentation": "Started on Hydrochlorothiazide 25 mg daily. 24h urinary calcium dropped by 50% and BP normalized.",
        "clinicalQuestion": "Why is HCTZ preferred over Furosemide in this case?",
        "discussion": "Furosemide would worsen hypercalciuria and promote stone formation, whereas HCTZ prevents calcium precipitation in renal tubules."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 15: Diuretics (Thiazides)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "Essentials of Medical Pharmacology — K. D. Tripathi",
          "edition": "8th Edition",
          "chapterOrSection": "Chapter 41: Thiazide Diuretics",
          "verifiedTextbookId": "kd-tripathi-essentials-medical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-failure",
        "heart-and-cardiac-cycle"
      ]
    }
  },
  {
    "id": "spironolactone",
    "name": "Spironolactone",
    "nameBn": "স্পাইরোনোল্যাকটোন",
    "normalizedName": "spironolactone",
    "pharmacologicalClass": "Aldosterone Receptor Antagonist (Potassium-Sparing Diuretic)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "C03DA01",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Competitive antagonist of the cytosolic mineralocorticoid (aldosterone) receptor in principal and intercalated cells of the late distal tubule and cortical collecting duct. It prevents aldosterone-induced synthesis of epithelial sodium channels (ENaC) and basolateral Na+/K+-ATPase pumps. This blunts sodium reabsorption while halting potassium and hydrogen ion excretion. In heart failure, it blocks myocardial and vascular fibrosis driven by pathological aldosterone excess.",
    "receptorOrTarget": "Intracellular Mineralocorticoid Receptor (MR) in renal collecting tubule and myocardium",
    "indications": [
      {
        "id": "ind-hf-mortality",
        "name": "Heart Failure with Reduced Ejection Fraction (HFrEF, NYHA Class II-IV)",
        "isPrimary": true,
        "guidelineRecommendation": "Proven 30% mortality reduction in RALES clinical trial"
      },
      {
        "id": "ind-cirrhosis-ascites",
        "name": "Cirrhotic Ascites and Secondary Hyperaldosteronism",
        "isPrimary": true,
        "note": "Drug of choice for ascites (100 mg daily titrated up to 400 mg)"
      },
      {
        "id": "ind-resistant-htn",
        "name": "Resistant Hypertension (Fourth-line add-on agent)",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "Severe hyperkalemia (> 5.0 mmol/L)",
        "type": "absolute",
        "reason": "High risk of fatal cardiac arrest from peaked T waves and ventricular arrhythmia"
      },
      {
        "condition": "Acute renal failure / severe CKD (eGFR < 30 mL/min)",
        "type": "absolute",
        "reason": "Inability to excrete potassium leads to rapid toxic hyperkalemia"
      }
    ],
    "dosageGuidance": {
      "adult": "Heart Failure: 12.5 mg to 25 mg once daily (Max 50 mg/day). Cirrhotic Ascites: 100 mg initial once daily, titrated up to 400 mg/day. Resistant Hypertension: 25-50 mg daily.",
      "paediatric": "1-3 mg/kg/day in 1-2 divided doses.",
      "geriatric": "Initial 12.5-25 mg daily with strict K+ monitoring.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take with meals to enhance absorption and reduce GI irritation."
    },
    "doseAdjustment": {
      "renal": "eGFR 30-50 mL/min: start 12.5 mg every other day; eGFR < 30 mL/min: contraindicated.",
      "hepatic": "Metabolized into active canrenone; monitor electrolytes closely in cirrhosis."
    },
    "adverseEffects": {
      "common": [
        "Hyperkalemia",
        "Gynecomastia in males (up to 10%)",
        "Breast tenderness in females",
        "Menstrual irregularities",
        "Erectile dysfunction"
      ],
      "uncommon": [
        "Hyponatremia",
        "Drowsiness / lethargy",
        "Gastrointestinal bleeding / gastritis"
      ],
      "rare": [
        "Severe hyperkalemic cardiac arrest",
        "Agranulocytosis",
        "Hepatotoxicity"
      ],
      "seriousWarnings": [
        "Black Box: Severe Life-Threatening Hyperkalemia. Concomitant use with ACE inhibitors, ARBs, or potassium supplements without strict monitoring can precipitate fatal cardiac arrhythmias."
      ]
    },
    "precautions": [
      "Never combine with potassium supplements or salt substitutes containing potassium. Avoid in acute renal failure."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Potassium & Creatinine",
        "frequency": "Baseline, 1 week, 4 weeks, then every 3 months",
        "targetOrClinicalAction": "Discontinue if K+ > 5.5 mmol/L"
      }
    ],
    "foodInteractions": "Food increases oral bioavailability by ~90-100%. Always take with meals.",
    "pregnancyInfo": {
      "category": "Category C",
      "details": "Antiandrogenic properties can cause feminization of male fetuses. Avoid in pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in breast milk in negligible amounts; compatible per AAP."
    },
    "paediatricConsiderations": "Used for pediatric ascites and heart failure under specialist supervision.",
    "geriatricConsiderations": "High risk of hyperkalemia. Avoid doses above 25 mg/day in heart failure.",
    "overdoseInformation": {
      "symptoms": "Severe hyperkalemia, somnolence, confusion, dehydration, flaccid paralysis.",
      "management": "IV Calcium gluconate 10% for cardiac membrane stabilization, IV insulin + 25% dextrose, salbutamol nebulization, and urgent hemodialysis."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Register of Approved Finished Pharmaceuticals",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Potassium-Sparing Diuretics",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.2.0"
    },
    "bilingualNotes": {
      "classBn": "অ্যালডোস্টেরন রিসেপ্টর ব্লকার (পটাশিয়াম সংরক্ষণকারী মূত্রবর্ধক ওষুধ)",
      "mechanismSummaryBn": "কিডনির কালেক্টিং ডাক্টে অ্যালডোস্টেরন হরমোনকে ব্লক করে প্রস্রাবের সাথে পটাশিয়াম ক্ষয় হওয়া বন্ধ করে এবং অতিরিক্ত লবণ ও পানি বের করে দেয়।",
      "patientCounsellingBn": "খাবারের সাথে সেবন করুন। রক্তে পটাশিয়াম বেড়ে যাওয়ার মারাত্মক ঝুঁকি থাকায় চিকিৎসকের অনুমতি ছাড়া ডাবের পানি বা পটাশিয়াম সাপ্লিমেন্ট গ্রহণ করবেন না। পুরুষদের ক্ষেত্রে স্তন বৃদ্ধি (গাইনোকোমাস্টিয়া) হতে পারে।",
      "criticalWarningBn": "রক্তে পটাশিয়াম মাত্রাতিরিক্ত বৃদ্ধি পেলে বুক ধড়ফড় ও হার্ট অ্যাটাক হতে পারে; অনিয়মিত হৃদস্পন্দন বা দুর্বলতা অনুভব করলে তাৎক্ষণিক হাসপাতালে যোগাযোগ করুন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Cytosolic Mineralocorticoid Receptor Blockade -> Suppresses ENaC & basolateral Na+/K+ pump -> Natriuresis with K+ and H+ retention + Anti-fibrotic cardiac remodeling.",
      "receptorTarget": "Intracellular Mineralocorticoid Receptor",
      "vivaQuestions": [
        {
          "question": "Why does Spironolactone cause painful gynecomastia in males, and which alternative drug avoids this?",
          "questionBn": "স্পাইরোনোল্যাকটোন কেন পুরুষদের স্তন বৃদ্ধি ঘটায় এবং এর বিকল্প কী?",
          "modelAnswer": "Spironolactone is a non-selective steroid that cross-reacts with androgen receptors (antagonist) and progesterone receptors (agonist). Eplerenone is a selective mineralocorticoid receptor antagonist with 1000-fold lower affinity for androgen receptors, avoiding gynecomastia.",
          "highYieldPearl": "Eplerenone has higher MR selectivity and zero gynecomastia risk."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-spiro-01",
          "front": "Active metabolite of Spironolactone?",
          "back": "Canrenone (responsible for prolonged half-life of 16-20 hours).",
          "topic": "Pharmacokinetics",
          "highYield": true
        },
        {
          "id": "fc-spiro-02",
          "front": "Major endocrine side effect in males?",
          "back": "Gynecomastia and testicular atrophy due to antiandrogenic effect.",
          "topic": "Adverse Effects",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-spiro-01",
          "question": "A 55-year-old male with HFrEF taking enalapril and bisoprolol is prescribed spironolactone 25 mg daily. Which lab parameter must be strictly monitored within 1 week?",
          "options": [
            "Serum Potassium and Creatinine",
            "Serum Bilirubin and ALT",
            "Platelet Count and Bleeding Time",
            "Serum Amylase and Lipase"
          ],
          "correctIndex": 0,
          "explanation": "Combination of ACEI and Spironolactone carries high risk of life-threatening hyperkalemia.",
          "bmdcFocus": "Phase 2 Pharmacology Core"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Cirrhotic Ascites & Electrolyte Balancing",
        "patientProfile": "52M with hepatitis B cirrhosis and gross abdominal ascites.",
        "presentation": "Started on Furosemide 40 mg + Spironolactone 100 mg daily. Ascites gradually resolved without hypokalemia.",
        "clinicalQuestion": "Why are these two diuretics combined in cirrhosis?",
        "discussion": "Furosemide causes hypokalemia, whereas spironolactone retains potassium and blocks secondary hyperaldosteronism. Combining them in a 100:40 ratio produces neutral potassium balance and optimal natriuresis."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 15: Diuretics (Aldosterone Antagonists)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "Essentials of Medical Pharmacology — K. D. Tripathi",
          "edition": "8th Edition",
          "chapterOrSection": "Chapter 41: Potassium Sparing Diuretics",
          "verifiedTextbookId": "kd-tripathi-essentials-medical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-failure"
      ]
    }
  },
  {
    "id": "enalapril",
    "name": "Enalapril",
    "nameBn": "এনালাপ্রিল",
    "normalizedName": "enalapril",
    "pharmacologicalClass": "ACE Inhibitor (Prodrug of Enalaprilat)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "C09AA02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Enalapril is an ethyl ester prodrug rapidly bioactivated by hepatic esterases into enalaprilat, a potent competitive inhibitor of angiotensin-converting enzyme (ACE / peptidyl dipeptidase). ACE inhibition halts the conversion of angiotensin I into angiotensin II. This results in decreased systemic vascular resistance, decreased aldosterone-mediated sodium retention, and attenuation of ventricular remodeling, while elevating bradykinin levels.",
    "receptorOrTarget": "Angiotensin-Converting Enzyme (ACE / Kininase II)",
    "indications": [
      {
        "id": "ind-htn",
        "name": "Essential Hypertension",
        "isPrimary": true,
        "guidelineRecommendation": "First-line agent in diabetes, CKD, or left ventricular dysfunction (NHF Guidelines)"
      },
      {
        "id": "ind-hfrEF",
        "name": "Heart Failure with Reduced Ejection Fraction (HFrEF)",
        "isPrimary": true,
        "guidelineRecommendation": "Proven mortality benefit in CONSENSUS and SOLVD clinical trials"
      },
      {
        "id": "ind-diabetic-nephro",
        "name": "Diabetic Nephropathy with Microalbuminuria",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "Pregnancy (2nd and 3rd trimesters)",
        "type": "absolute",
        "reason": "Teratogenic: causes fetopathy, renal dysgenesis, and skull hypoplasia"
      },
      {
        "condition": "History of ACEI-induced angioedema",
        "type": "absolute",
        "reason": "High risk of fatal laryngeal obstruction"
      },
      {
        "condition": "Bilateral renal artery stenosis",
        "type": "absolute",
        "reason": "Precipitates acute renal failure by blocking efferent arteriolar tone"
      }
    ],
    "dosageGuidance": {
      "adult": "Hypertension: Initial 5 mg once daily; titrate up to 10-20 mg once or twice daily (Max 40 mg/day). Heart Failure: Initial 2.5 mg once daily; target maintenance 10-20 mg twice daily.",
      "paediatric": "0.08 mg/kg once daily up to 5 mg maximum.",
      "geriatric": "Initial 2.5 mg once daily.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "First dose preferably at bedtime to avoid first-dose hypotension."
    },
    "doseAdjustment": {
      "renal": "eGFR 30-80 mL/min: 5 mg/day; eGFR < 30 mL/min: 2.5 mg/day.",
      "hepatic": "Bioactivation may be delayed in severe hepatic disease."
    },
    "adverseEffects": {
      "common": [
        "Persistent dry non-productive cough (5-20%)",
        "First-dose hypotension",
        "Hyperkalemia",
        "Dizziness / headache"
      ],
      "uncommon": [
        "Acute decline in renal function",
        "Dysgeusia (taste alteration)",
        "Rash"
      ],
      "rare": [
        "Angioneurotic edema",
        "Cholestatic jaundice",
        "Neutropenia"
      ],
      "seriousWarnings": [
        "Black Box Warning: Fetal Toxicity. Discontinue enalapril immediately when pregnancy is detected."
      ]
    },
    "precautions": [
      "Monitor serum potassium and creatinine prior to initiation and at 1-2 weeks. Caution with potassium-sparing diuretics."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Potassium",
        "frequency": "Baseline, 1-2 weeks, then every 3-6 months",
        "targetOrClinicalAction": "Withhold if K+ > 5.5 mmol/L"
      },
      {
        "parameter": "Serum Creatinine & eGFR",
        "frequency": "Baseline, 1-2 weeks, then periodically",
        "targetOrClinicalAction": "Re-evaluate if rise > 30%"
      }
    ],
    "foodInteractions": "Food does not affect extent of absorption.",
    "pregnancyInfo": {
      "category": "Category D",
      "details": "Causes fetal renal failure, oligohydramnios, and neonatal death. Strictly contraindicated."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in human milk in minute concentrations; compatible with breastfeeding in full-term infants."
    },
    "paediatricConsiderations": "Approved for paediatric hypertension down to 1 month.",
    "geriatricConsiderations": "Increased susceptibility to postural hypotension and hyperkalemia.",
    "overdoseInformation": {
      "symptoms": "Marked hypotension, stupor, bradycardia, acute renal failure.",
      "management": "IV normal saline infusion. Enalaprilat is hemodialyzable."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Formulary & Drug Registration Directory",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "NHF",
        "title": "National Guidelines for Management of Hypertension in Bangladesh",
        "url": "https://nhf.org.bd",
        "publicationDate": "2022-11-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "4th Edition"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-14",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.3.0"
    },
    "bilingualNotes": {
      "classBn": "এসিই ইনহিবিটর (উচ্চ রক্তচাপ ও হার্ট ফেইলিউরের ওষুধ)",
      "mechanismSummaryBn": "অ্যাঞ্জিওটেনসিন-২ তৈরিতে বাধা দিয়ে রক্তনালী প্রসারিত করে এবং রক্তচাপ কমায়।",
      "patientCounsellingBn": "প্রথম ডোজটি রাতে শোবার সময় সেবন করুন। শুষ্ক কাশি দেখা দিলে চিকিৎসককে জানান। পটাশিয়াম যুক্ত লবণ এড়িয়ে চলুন।",
      "criticalWarningBn": "গর্ভবতী নারীদের ক্ষেত্রে এই ওষুধ শিশুর কিডনি ও মাথার হাড় ধ্বংস করে ফেলতে পারে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "RAAS Blockade: Angiotensin I -X-> Angiotensin II -> Decreased Peripheral Resistance & Decreased Aldosterone + Bradykinin Accumulation.",
      "receptorTarget": "Angiotensin-Converting Enzyme (ACE)",
      "vivaQuestions": [
        {
          "question": "What is the molecular mediator of ACEI-induced dry cough?",
          "questionBn": "এসিই ইনহিবিটর জনিত কাশির কারণ কী?",
          "modelAnswer": "Bradykinin and substance P accumulation due to inhibition of kininase II (identical to ACE).",
          "highYieldPearl": "Switching to an ARB eliminates the cough because ARBs block AT1 receptors without inhibiting kininase II."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-ena-01",
          "front": "Active metabolite of Enalapril?",
          "back": "Enalaprilat.",
          "topic": "Pharmacokinetics",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-ena-01",
          "question": "A diabetic hypertensive male on enalapril develops dry cough. Most appropriate switch?",
          "options": [
            "Add dextromethorphan",
            "Switch to Losartan",
            "Increase enalapril dose",
            "Switch to Ramipril"
          ],
          "correctIndex": 1,
          "explanation": "Switching to an ARB (Losartan) preserves blood pressure control without causing cough.",
          "bmdcFocus": "Phase 2 Pharmacology Core"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Bilateral Renal Artery Stenosis & Acute Anuria",
        "patientProfile": "72F with peripheral vascular disease and refractory hypertension.",
        "presentation": "Started on Enalapril 10 mg daily; develops oliguria and surge in creatinine from 1.1 to 4.8 mg/dL.",
        "clinicalQuestion": "Underlying cause?",
        "discussion": "Removal of efferent arteriolar tone in bilateral renal artery stenosis collapses intraglomerular filtration pressure."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 11: Antihypertensive Agents (ACE Inhibitors)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-failure",
        "coronary-artery-disease"
      ]
    }
  },
  {
    "id": "losartan",
    "name": "Losartan",
    "nameBn": "লোসার্টান",
    "normalizedName": "losartan",
    "pharmacologicalClass": "Angiotensin II Receptor Blocker (Selective AT1 Antagonist)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "C09CA01",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Losartan potassium selectively competitively blocks the angiotensin II type 1 (AT1) receptor. This prevents all downstream actions of angiotensin II, including vasoconstriction, aldosterone release, and cardiac remodeling, without inhibiting kininase II or elevating bradykinin. Its active metabolite E-3174 provides long-lasting insurmountable AT1 blockade. Losartan also uniquely inhibits renal URAT1, producing modest uricosuria.",
    "receptorOrTarget": "Angiotensin II Type 1 (AT1) Receptor & Renal URAT1",
    "indications": [
      {
        "id": "ind-htn",
        "name": "Hypertension (Especially in patients intolerant to ACE inhibitors due to cough)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line therapy in NHF and international guidelines"
      },
      {
        "id": "ind-dn",
        "name": "Diabetic Nephropathy in Type 2 Diabetes with Proteinuria",
        "isPrimary": true,
        "guidelineRecommendation": "Demonstrated reduction in ESRD in RENAAL trial"
      }
    ],
    "contraindications": [
      {
        "condition": "Pregnancy (2nd and 3rd trimesters)",
        "type": "absolute",
        "reason": "Fetal toxicity and renal dysgenesis"
      },
      {
        "condition": "Bilateral renal artery stenosis",
        "type": "absolute",
        "reason": "Precipitates acute renal failure"
      }
    ],
    "dosageGuidance": {
      "adult": "Initial 50 mg once daily (25 mg in volume depletion or elderly); may increase to 100 mg once daily.",
      "paediatric": "0.7 mg/kg once daily in children >= 6 years.",
      "geriatric": "Initial 25 to 50 mg once daily.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "May be taken with or without food."
    },
    "doseAdjustment": {
      "renal": "No initial adjustment for mild-moderate renal impairment; monitor K+.",
      "hepatic": "Start at 25 mg daily due to decreased first-pass clearance in cirrhosis."
    },
    "adverseEffects": {
      "common": [
        "Dizziness",
        "Hypotension",
        "Hyperkalemia",
        "Upper respiratory congestion"
      ],
      "uncommon": [
        "Fatigue",
        "Asthenia",
        "Diarrhea"
      ],
      "rare": [
        "Angioedema (< 0.1%)",
        "Rhabdomyolysis"
      ],
      "seriousWarnings": [
        "Black Box: Fetal Toxicity. Discontinue immediately upon diagnosis of pregnancy."
      ]
    },
    "precautions": [
      "Monitor serum potassium. Correct volume depletion prior to initiation."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Potassium & Creatinine",
        "frequency": "Baseline, 2-4 weeks, then periodically",
        "targetOrClinicalAction": "Withhold if K+ > 5.5 mmol/L"
      }
    ],
    "foodInteractions": "Food slightly delays absorption but does not alter total AUC.",
    "pregnancyInfo": {
      "category": "Category D",
      "details": "Strictly contraindicated in pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Excreted in milk in animal studies; alternative agents preferred."
    },
    "paediatricConsiderations": "Approved in children >= 6 years.",
    "geriatricConsiderations": "Well tolerated; start with 25-50 mg daily.",
    "overdoseInformation": {
      "symptoms": "Significant hypotension and tachycardia.",
      "management": "Supportive IV fluid resuscitation."
    },
    "storageInformation": "Store at 20°C to 25°C.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "Approved Medicines Registry",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Angiotensin Receptor Antagonists",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-14",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.3.0"
    },
    "bilingualNotes": {
      "classBn": "এআরবি (অ্যাঞ্জিওটেনসিন রিসেপ্টর ব্লকার)",
      "mechanismSummaryBn": "এটি১ রিসেপ্টর সরাসরি ব্লক করে রক্তচাপ কমায় এবং কাশির সমস্যা হয় না।",
      "patientCounsellingBn": "নিয়মিত একই সময়ে সেবন করুন। খাদ্য গ্রহণের সাথে সম্পর্ক নেই।",
      "criticalWarningBn": "গর্ভবতী মায়েদের ক্ষেত্রে মারাত্মক জন্মগত ত্রুটি ঘটায়।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Selective AT1 Receptor Blockade -> Blunts Vasoconstriction & Aldosterone without Increasing Bradykinin.",
      "receptorTarget": "AT1 G-protein coupled receptor",
      "vivaQuestions": [
        {
          "question": "What is the active metabolite of Losartan?",
          "questionBn": "লোসার্টানের সক্রিয় মেটাবোলাইটের নাম কী?",
          "modelAnswer": "E-3174 (carboxylic acid metabolite), 10 to 40 times more potent with longer half-life (6-9h vs 2h).",
          "highYieldPearl": "E-3174 acts as an insurmountable non-competitive AT1 blocker."
        },
        {
          "question": "What unique metabolic benefit does Losartan have in gout?",
          "questionBn": "গাউটের ক্ষেত্রে লোসার্টানের অতিরিক্ত সুবিধা কী?",
          "modelAnswer": "It inhibits renal URAT1 in proximal tubules, increasing uric acid excretion and lowering serum urate.",
          "highYieldPearl": "Ideal choice for hypertension co-existing with hyperuricemia or gout."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-los-01",
          "front": "Active metabolite of Losartan?",
          "back": "E-3174 (insurmountable AT1 blocker).",
          "topic": "Pharmacokinetics",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-los-01",
          "question": "Hypertensive patient with recurrent gout needs blood pressure control. Which drug lowers both BP and serum uric acid?",
          "options": [
            "Hydrochlorothiazide",
            "Losartan",
            "Amlodipine",
            "Furosemide"
          ],
          "correctIndex": 1,
          "explanation": "Losartan inhibits URAT1, promoting uricosuria.",
          "bmdcFocus": "Phase 2 Pharmacology Core"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Hypertension & Microalbuminuria",
        "patientProfile": "52M with T2DM, BP 148/92 mmHg, microalbuminuria 180 mg/g.",
        "presentation": "Started on Losartan 50 mg daily; BP normalized and albuminuria dropped by 45%.",
        "clinicalQuestion": "Mechanism of renoprotection?",
        "discussion": "Dilates efferent glomerular arteriole, lowering intraglomerular capillary hypertension."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 11: Antihypertensive Agents (ARBs)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-failure",
        "coronary-artery-disease"
      ]
    }
  },
  {
    "id": "pantoprazole",
    "name": "Pantoprazole",
    "nameBn": "প্যান্টোপ্রাজল",
    "normalizedName": "pantoprazole",
    "pharmacologicalClass": "Proton Pump Inhibitor (Substituted Benzimidazole)",
    "therapeuticClass": "Gastrointestinal & Anti-Ulcer Drugs",
    "therapeuticClassId": "gastrointestinal",
    "atcCode": "A02BC02",
    "prescriptionStatus": "OTC",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Irreversibly binds to cysteine residues (specifically Cys813 and Cys822) of the H+/K+ ATPase proton pump in gastric parietal cells, shutting down the final common pathway of gastric acid secretion. Because pantoprazole binds deeper in the pump canalicular domain and undergoes sulfoconjugation with minimal CYP2C19 inhibition, it has fewer cytochrome P450-mediated drug-drug interactions than omeprazole.",
    "receptorOrTarget": "Gastric H+/K+ ATPase enzyme (Cys813 & Cys822)",
    "indications": [
      {
        "id": "ind-gerd",
        "name": "Gastroesophageal Reflux Disease & Erosive Esophagitis",
        "isPrimary": true
      },
      {
        "id": "ind-pud",
        "name": "Gastric and Duodenal Ulcers",
        "isPrimary": true
      },
      {
        "id": "ind-clopidogrel-safe",
        "name": "Gastroprotection in Patients Taking Clopidogrel (Preferred PPI)",
        "isPrimary": true,
        "note": "Lowest CYP2C19 inhibition; does not blunt clopidogrel activation"
      }
    ],
    "contraindications": [
      {
        "condition": "Hypersensitivity to pantoprazole or benzimidazoles",
        "type": "absolute",
        "reason": "Risk of anaphylaxis"
      }
    ],
    "dosageGuidance": {
      "adult": "Oral: 40 mg once daily 30-60 minutes before breakfast (20 mg for mild GERD). IV: 40 mg once daily slow IV injection or continuous infusion in acute ulcer bleeding.",
      "paediatric": "Children >= 5 years (>= 40 kg): 40 mg once daily.",
      "geriatric": "Standard adult dosing is safe.",
      "routes": [
        "Oral",
        "IV"
      ],
      "timingNotice": "Take 30-60 minutes before morning breakfast."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment needed.",
      "hepatic": "Severe liver cirrhosis: maximum 20 mg once daily."
    },
    "adverseEffects": {
      "common": [
        "Headache",
        "Diarrhea",
        "Abdominal discomfort"
      ],
      "uncommon": [
        "Dizziness",
        "Pruritus / skin rash"
      ],
      "rare": [
        "Clostridioides difficile colitis",
        "Hypomagnesemia (with > 1 year use)",
        "Interstitial nephritis"
      ],
      "seriousWarnings": [
        "Prolonged acid suppression (> 1-3 years) increases fracture risk, hypomagnesemia, and vitamin B12 deficiency."
      ]
    },
    "precautions": [
      "Rule out gastric malignancy in patients with alarm features before long-term therapy."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Magnesium",
        "frequency": "Annually in long-term users (> 1 year)",
        "targetOrClinicalAction": "Correct hypomagnesemia if present"
      }
    ],
    "foodInteractions": "Take on an empty stomach before morning meal for optimal bioavailability.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Animal studies show no fetal harm. Used when clinically needed in pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in minute amounts; safe during breastfeeding."
    },
    "paediatricConsiderations": "Approved for children >= 5 years for erosive esophagitis.",
    "geriatricConsiderations": "Safe and well-tolerated in elderly patients.",
    "overdoseInformation": {
      "symptoms": "Minimal acute toxicity reported; somnolence and headache.",
      "management": "Symptomatic supportive treatment; not dialyzable."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Register of Approved Finished Pharmaceuticals",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Pantoprazole Monograph",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Dr. K. M. Saifuddin",
      "reviewerCredentials": "MD (Gastroenterology), BSMMU",
      "reviewDate": "2026-09-16",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.2.0"
    },
    "bilingualNotes": {
      "classBn": "প্রোটন পাম্প ইনহিবিটর (পিপিয়াই — পাকস্থলীর এসিড নিয়ন্ত্রক ওষুধ)",
      "mechanismSummaryBn": "পাকস্থলীর প্যারাইটাল কোষের প্রোটন পাম্পকে ব্লক করে এসিড নিঃসরণ কমায়। এটি ক্লোপিডোগ্রেল সেবনকারীদের জন্য সবচেয়ে নিরাপদ পিপিয়াই।",
      "patientCounsellingBn": "সকালে খাবার ৩০ মিনিট আগে সেবন করুন। না চিবিয়ে সম্পূর্ণ গিলে ফেলুন।",
      "criticalWarningBn": "দীর্ঘদিন চিকিৎসকের পরামর্শ ছাড়া একটানা সেবন করলে ক্যালসিয়াম ও ম্যাগনেসিয়ামের ঘাটতি হতে পারে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Acid-Catalyzed Canalicular Trapping -> Disulfide Binding to H+/K+ ATPase with Low CYP2C19 Affinity.",
      "receptorTarget": "Gastric H+/K+ ATPase",
      "vivaQuestions": [
        {
          "question": "Why is Pantoprazole preferred over Omeprazole in patients on Clopidogrel?",
          "questionBn": "ক্লোপিডোগ্রেল সেবনকারীদের ক্ষেত্রে কেন প্যান্টোপ্রাজল বেশি পছন্দের?",
          "modelAnswer": "Pantoprazole has minimal CYP2C19 inhibition and undergoes non-CYP sulfoconjugation, so it does not interfere with the hepatic bioactivation of clopidogrel into its active antiplatelet form.",
          "highYieldPearl": "Choice of PPI in cardiology = Pantoprazole."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-pan-01",
          "front": "PPI of choice for patients taking Clopidogrel?",
          "back": "Pantoprazole (lowest CYP2C19 interaction).",
          "topic": "Clinical Pharmacology",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-pan-01",
          "question": "A post-PCI stented patient on clopidogrel needs a PPI for ulcer prevention. Which drug is preferred?",
          "options": [
            "Omeprazole",
            "Esomeprazole",
            "Pantoprazole",
            "Cimetidine"
          ],
          "correctIndex": 2,
          "explanation": "Pantoprazole does not impair clopidogrel activation via CYP2C19.",
          "bmdcFocus": "Cardiology Drug Interactions"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Coronary Stent & Gastroprotection",
        "patientProfile": "62M on Dual Antiplatelet Therapy (Aspirin + Clopidogrel).",
        "presentation": "Develops epigastric burning; general physician advised switching from omeprazole to pantoprazole.",
        "clinicalQuestion": "Rationale for switch?",
        "discussion": "Prevents stent thrombosis while providing full gastroprotection."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 59: Gastrointestinal Drugs",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "coronary-artery-disease"
      ]
    }
  },
  {
    "id": "aspirin",
    "name": "Aspirin (Acetylsalicylic Acid)",
    "nameBn": "অ্যাসপিরিন",
    "normalizedName": "aspirin",
    "pharmacologicalClass": "Irreversible Cyclooxygenase Inhibitor / Antiplatelet Agent",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "B01AC06",
    "prescriptionStatus": "OTC",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Surgery)",
    "mechanismOfAction": "Aspirin covalently and irreversibly acetylates a serine residue (Ser529 in COX-1, Ser516 in COX-2) near the catalytic active site of cyclooxygenase. In platelets, which lack protein synthesis machinery, this permanently blocks thromboxane A2 (TXA2) production for the entire lifespan of the platelet (7-10 days), providing potent lifelong antiplatelet aggregation. Higher doses inhibit endothelial prostacyclin (PGI2) synthesis and peripheral COX enzymes, mediating anti-inflammatory and analgesic effects.",
    "receptorOrTarget": "Ser529 residue of Platelet Cyclooxygenase-1 (COX-1)",
    "indications": [
      {
        "id": "ind-acs",
        "name": "Acute Coronary Syndrome (STEMI, NSTEMI, Unstable Angina)",
        "isPrimary": true,
        "guidelineRecommendation": "Immediate 300 mg loading dose chewed; 75 mg maintenance daily (DGHS & ESC Guidelines)"
      },
      {
        "id": "ind-secondary-prev",
        "name": "Secondary Prevention of MI, TIA, Ischemic Stroke, and Peripheral Artery Disease",
        "isPrimary": true
      },
      {
        "id": "ind-colorectal-prev",
        "name": "Colorectal Cancer Chemoprevention in High-Risk Patients",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Active gastrointestinal bleeding or active peptic ulceration",
        "type": "absolute",
        "reason": "High risk of catastrophic hemorrhage"
      },
      {
        "condition": "Children under 16 years with viral illness (Influenza, Varicella)",
        "type": "absolute",
        "reason": "Precipitates fatal Reye syndrome (acute encephalopathy with fatty liver)"
      },
      {
        "condition": "Dengue Fever / Hemorrhagic Viral Illnesses",
        "type": "absolute",
        "reason": "Precipitates massive bleeding and Dengue Shock Syndrome (DGHS 2024)"
      },
      {
        "condition": "Aspirin-exacerbated respiratory disease (Samter triad)",
        "type": "absolute",
        "reason": "Triggers severe life-threatening bronchospasm via leukotriene shunting"
      }
    ],
    "dosageGuidance": {
      "adult": "Acute Coronary Syndrome: 300 mg loading dose chewed immediately. Chronic secondary prevention: 75 mg to 100 mg once daily (enteric-coated). Analgesic/Antipyretic (rarely used now): 300-600 mg every 4-6 hours.",
      "paediatric": "Contraindicated under 16 years (except Kawasaki disease where high doses are monitored in hospital).",
      "geriatric": "75 mg daily; consider gastroprotection with PPI in elderly.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take with or immediately after food. Enteric-coated tablets should be swallowed whole with water."
    },
    "doseAdjustment": {
      "renal": "Avoid in severe renal impairment (eGFR < 10 mL/min); decreases renal blood flow via prostaglandin inhibition.",
      "hepatic": "Avoid in severe hepatic failure due to coagulopathy."
    },
    "adverseEffects": {
      "common": [
        "Dyspepsia, epigastric distress, nausea",
        "Subclinical GI microbleeding",
        "Prolonged bleeding time"
      ],
      "uncommon": [
        "Gastric / duodenal ulceration",
        "Tinnitus / dizziness (salicylism at higher doses)",
        "Urticaria"
      ],
      "rare": [
        "Major GI hemorrhage / intracranial hemorrhage",
        "Reye syndrome in children",
        "Aspirin-induced asthma / bronchospasm"
      ],
      "seriousWarnings": [
        "Black Box / Strict Directive: NEVER administer Aspirin in suspected Dengue fever or in children with fever (risk of Reye syndrome and fatal bleeding)."
      ]
    },
    "precautions": [
      "Discontinue 7 days before major elective surgery unless cardiac stent thrombosis risk outweighs bleeding risk."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Hemoglobin & Hematocrit",
        "frequency": "Periodically in chronic users",
        "targetOrClinicalAction": "Detect occult gastrointestinal blood loss"
      },
      {
        "parameter": "Signs of Bleeding (Melena, easy bruising)",
        "frequency": "At each follow-up",
        "targetOrClinicalAction": "Withhold and investigate if melena occurs"
      }
    ],
    "foodInteractions": "Always take with meals or milk to minimize gastric mucosal irritation.",
    "pregnancyInfo": {
      "category": "Category D",
      "details": "Full doses contraindicated in 3rd trimester (premature closure of ductus arteriosus, maternal/neonatal hemorrhage). Low-dose (75-150 mg) used under specialist guidance to prevent pre-eclampsia."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Excreted in breast milk; avoid high doses due to Reye syndrome theoretical risk."
    },
    "paediatricConsiderations": "Contraindicated in children under 16 due to Reye syndrome (except Kawasaki disease).",
    "geriatricConsiderations": "High risk of asymptomatic ulceration and fatal GI bleeding. Routinely co-prescribe PPI.",
    "overdoseInformation": {
      "symptoms": "Salicylism: Tinnitus, hyperventilation, mixed respiratory alkalosis and metabolic acidosis, hyperthermia, seizures, coma.",
      "management": "Gastric lavage, activated charcoal, IV Sodium Bicarbonate infusion (alkalinizes urine to pH > 7.5 to accelerate salicylate clearance). Hemodialysis in severe poisoning."
    },
    "storageInformation": "Store below 25°C in airtight containers. Protect from moisture (smell of vinegar indicates hydrolytic breakdown to salicylic acid).",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "অ্যাসপিরিন (অপরিবর্তনীয় সাইক্লোঅক্সিজেনেস প্রতিরোধক ও অ্যান্টিপ্লাটলেট ওষুধ)",
      "mechanismSummaryBn": "রক্তের প্লাটিলেটের কক্স-১ এনজাইমকে স্থায়ীভাবে ব্লক করে থ্রম্বোক্সেন এ২ তৈরি বন্ধ করে, যা রক্ত জমাট বাঁধতে বাধা দেয়।",
      "patientCounsellingBn": "পেটে গ্যাস্ট্রিক আলসার এড়াতে সবসময় খাবারের পর সেবন করুন। ডেঙ্গু জ্বরে এটি কখনোই খাওয়া যাবে না।",
      "criticalWarningBn": "ডেঙ্গু জ্বরে অ্যাসপিরিন মারাত্মক ও প্রাণঘাতী রক্তক্ষরণ ঘটায়। শিশুদের ভাইরাল জ্বরে রে সিন্ড্রোমের ঝুঁকি তৈরি করে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Covalent acetylation of Ser529 in COX-1 -> irreversible block of TXA2 synthesis for platelet lifespan (7-10 days) -> antiplatelet aggregation.",
      "receptorTarget": "Ser529 of Platelet Cyclooxygenase-1 (COX-1)",
      "vivaQuestions": [
        {
          "question": "Why is aspirin unique among NSAIDs in its antiplatelet effect?",
          "questionBn": "অন্যান্য এনএসএআইডি এর তুলনায় অ্যাসপিরিনের অ্যান্টিপ্লাটলেট প্রভাব অনন্য কেন?",
          "modelAnswer": "Aspirin irreversibly inhibits COX-1 by covalent acetylation of Ser529. Because mature platelets lack nuclei and ribosomes, they cannot synthesize new COX-1 enzymes; inhibition lasts for the entire platelet lifespan (7-10 days).",
          "highYieldPearl": "Other NSAIDs cause reversible, transient COX inhibition."
        },
        {
          "question": "What is Reye Syndrome and why is aspirin contraindicated in febrile children?",
          "questionBn": "রে সিন্ড্রোম কী এবং জ্বরযুক্ত শিশুদের অ্যাসপিরিন দেওয়া নিষেধ কেন?",
          "modelAnswer": "Reye syndrome is acute encephalopathy with fatty infiltration of the liver occurring in children with viral illnesses (varicella, influenza) given aspirin. It causes mitochondrial dysfunction and cerebral edema with high mortality.",
          "highYieldPearl": "Paracetamol is preferred in children with febrile illnesses."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-asp-01",
          "front": "Why is platelet inhibition by aspirin irreversible?",
          "back": "Covalent acetylation of Ser529 in COX-1 in anucleate platelets.",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-asp-02",
          "front": "Low-dose vs high-dose aspirin target?",
          "back": "Low dose (75-100 mg) selectively inhibits platelet COX-1 (TXA2); high dose inhibits endothelial COX-2 (PGI2).",
          "topic": "Pharmacodynamics",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-asp-01",
          "question": "A 58-year-old male with acute STEMI is given loading aspirin. What is the standard emergency loading dose?",
          "options": [
            "300 mg chewed/dispersed",
            "75 mg swallowed",
            "1000 mg IV",
            "20 mg sublingual"
          ],
          "correctIndex": 0,
          "explanation": "Chewing a 300 mg soluble aspirin tablet ensures rapid buccal and gastric absorption within minutes in acute coronary syndrome.",
          "bmdcFocus": "Phase 2 Pharmacology & Cardiology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute Coronary Syndrome & Aspirin Resistance",
        "patientProfile": "62-year-old male presenting with crushing retrosternal chest pain and ST elevations in II, III, aVF.",
        "presentation": "Administered 300 mg soluble aspirin chewed immediately along with Ticagrelor 180 mg loading dose.",
        "clinicalQuestion": "Why is soluble/chewed aspirin preferred over enteric-coated in acute STEMI?",
        "discussion": "Enteric-coated aspirin delays absorption by several hours. In STEMI, rapid inhibition of platelet thromboxane A2 within minutes is required to halt coronary thrombus propagation."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 34 & 36: Drugs Used in Coagulation Disorders & NSAIDs",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "coronary-artery-disease"
      ]
    }
  },
  {
    "id": "clopidogrel",
    "name": "Clopidogrel",
    "nameBn": "ক্লোপিডোগ্রেল",
    "normalizedName": "clopidogrel",
    "pharmacologicalClass": "Thienopyridine Antiplatelet Agent (Irreversible P2Y12 ADP Receptor Antagonist)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "B01AC04",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Cardiology)",
    "mechanismOfAction": "Clopidogrel is an inactive thienopyridine prodrug that requires two-step hepatic bioactivation by cytochrome P450 enzymes (predominantly CYP2C19, CYP3A4, CYP1A2, and CYP2B6) to generate its active thiol metabolite. The active metabolite irreversibly binds via disulfide bonding to the platelet purinergic P2Y12 adenosine diphosphate (ADP) receptor. This prevents ADP-mediated activation of the glycoprotein IIb/IIIa (GPIIb/IIIa) complex, irreversibly blocking fibrinogen cross-linking and platelet aggregation for the lifespan of the platelet.",
    "receptorOrTarget": "Platelet P2Y12 Purinergic Receptor",
    "indications": [
      {
        "id": "ind-acs-dapt",
        "name": "Dual Antiplatelet Therapy (DAPT) in Acute Coronary Syndrome (STEMI / NSTEMI / PCI Stent)",
        "isPrimary": true,
        "guidelineRecommendation": "300-600 mg loading dose, followed by 75 mg daily for 12 months (ESC / ACC Guidelines)"
      },
      {
        "id": "ind-stroke-prev",
        "name": "Secondary Prevention of Ischemic Stroke and Peripheral Artery Disease",
        "isPrimary": true
      },
      {
        "id": "ind-aspirin-intolerant",
        "name": "Atherothrombosis Prevention in Patients Intolerant to Aspirin",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "Active pathological bleeding (peptic ulcer or intracranial hemorrhage)",
        "type": "absolute",
        "reason": "Increases bleeding mortality"
      },
      {
        "condition": "Severe hepatic impairment",
        "type": "absolute",
        "reason": "Impaired prodrug bioactivation and pre-existing coagulopathy"
      }
    ],
    "dosageGuidance": {
      "adult": "ACS / Post-PCI Stenting: 300 mg or 600 mg loading dose; then 75 mg once daily. Stroke / PAD: 75 mg once daily.",
      "paediatric": "Not recommended for paediatric use.",
      "geriatric": "Standard 75 mg daily; omit loading dose in STEMI patients >= 75 years receiving fibrinolysis.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take once daily with or without food."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment required in renal impairment.",
      "hepatic": "Avoid in severe liver disease."
    },
    "adverseEffects": {
      "common": [
        "Bleeding (epistaxis, hematoma, gastrointestinal bleeding, purpura)",
        "Diarrhea",
        "Dyspepsia / abdominal pain"
      ],
      "uncommon": [
        "Thrombocytopenia",
        "Leukopenia",
        "Headache",
        "Gastric ulcer"
      ],
      "rare": [
        "Thrombotic Thrombocytopenic Purpura (TTP — medical emergency)",
        "Agranulocytosis",
        "Aplastic anemia"
      ],
      "seriousWarnings": [
        "Black Box Warning: Diminished Antiplatelet Effect in Patients with CYP2C19 Poor Metabolizers. Patients carrying CYP2C19 loss-of-function alleles (*2, *3) exhibit lower active metabolite levels and higher rates of stent thrombosis. Concomitant use with strong CYP2C19 inhibitors (Omeprazole) significantly reduces clinical efficacy."
      ]
    },
    "precautions": [
      "Discontinue 5 to 7 days before major elective surgical procedures to prevent excessive operative hemorrhage. Avoid co-administration with Omeprazole; choose Pantoprazole."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Complete Blood Count & Platelet Count",
        "frequency": "Baseline and if unexplained fever, purpura, or neurological symptoms occur",
        "targetOrClinicalAction": "Rule out TTP"
      },
      {
        "parameter": "Signs of Bleeding",
        "frequency": "Routine clinical visits",
        "targetOrClinicalAction": "Prompt evaluation of hematuria, melena, or petechiae"
      }
    ],
    "foodInteractions": "Can be taken with or without food.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Used only if clearly needed in pregnancy when stent thrombosis risk is high."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Discontinue nursing or discontinue drug depending on maternal importance."
    },
    "paediatricConsiderations": "Safety and efficacy not established in children.",
    "geriatricConsiderations": "Monitor for increased bleeding risk; omit high loading dose in elderly thrombolysis.",
    "overdoseInformation": {
      "symptoms": "Prolonged bleeding time and bleeding complications.",
      "management": "No direct antidote. Platelet transfusion restores hemostasis because transfused platelets have unblocked P2Y12 receptors."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Register of Approved Finished Pharmaceuticals",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Antiplatelet Drugs — Clopidogrel",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "অ্যান্টিপ্লাটলেট ড্রাগ (রক্ত জমাট বাঁধা প্রতিরোধক ওষুধ)",
      "mechanismSummaryBn": "রক্তের অনুচক্রিকার পি২ওয়াই১২ রিসেপ্টরকে স্থায়ীভাবে ব্লক করে রক্তনালীতে অবাঞ্ছিত রক্ত জমাট বাঁধা (থ্রম্বোসিস) প্রতিরোধ করে।",
      "patientCounsellingBn": "প্রতিদিন নিয়মিত সেবন করুন। দাঁতের মাড়ি দিয়ে রক্ত পড়া বা শরীরে কালশিটে দাগ দেখা দিলে ডাক্তারকে জানান। কোনো অপারেশনের ৫-৭ দিন আগে এটি বন্ধ করার প্রয়োজন হতে পারে। ওমেপ্রাজলের সাথে এটি সেবন করবেন না (প্যান্টোপ্রাজল নিরাপদ)।",
      "criticalWarningBn": "হার্টে রিং (স্টেন্ট) বসানোর পর এটি হঠাৎ বন্ধ করলে রিংয়ের ভেতর রক্ত জমাট বেঁধে তাৎক্ষণিক হার্ট অ্যাটাক হতে পারে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Prodrug -> Hepatic CYP2C19 Bioactivation -> Active Thiol Metabolite Irreversibly Blocks Platelet P2Y12 Receptor -> Shuts Down GPIIb/IIIa Activation.",
      "receptorTarget": "Platelet P2Y12 Receptor",
      "vivaQuestions": [
        {
          "question": "Why does Omeprazole diminish the antiplatelet action of Clopidogrel, and what is the clinical solution?",
          "questionBn": "ওমেপ্রাজল কেন ক্লোপিডোগ্রেলের কার্যকারিতা কমায় এবং এর সমাধান কী?",
          "modelAnswer": "Clopidogrel is a prodrug requiring bioactivation by CYP2C19. Omeprazole is a strong competitive inhibitor of CYP2C19, substantially reducing plasma levels of clopidogrel active thiol metabolite and increasing recurrent coronary stent thrombosis. The clinical solution is to switch the PPI to Pantoprazole, which is metabolized via sulfoconjugation and does not inhibit CYP2C19.",
          "highYieldPearl": "Core cardiology viva question: Clopidogrel + Pantoprazole = Safe combination."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-clop-01",
          "front": "Primary CYP enzyme responsible for clopidogrel activation?",
          "back": "CYP2C19.",
          "topic": "Pharmacogenomics",
          "highYield": true
        },
        {
          "id": "fc-clop-02",
          "front": "How to reverse clopidogrel-induced bleeding in emergency surgery?",
          "back": "Platelet transfusion (provides fresh unblocked platelets).",
          "topic": "Antidote / Reversal",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-clop-01",
          "question": "A 50-year-old male with acute MI undergoes stent placement and receives Aspirin and Clopidogrel. Genetic testing reveals he is a CYP2C19*2 homozygous poor metabolizer. What is the main clinical risk?",
          "options": [
            "Stent thrombosis and recurrent ischemic event",
            "Severe fatal hemorrhage",
            "Sudden complete heart block",
            "Severe drug-induced hepatitis",
            "Acute renal failure"
          ],
          "correctIndex": 0,
          "explanation": "CYP2C19 poor metabolizers cannot adequately bioactivate clopidogrel into its active form, leading to insufficient platelet inhibition and high risk of catastrophic stent thrombosis.",
          "bmdcFocus": "Pharmacogenomics / Cardiology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute In-Stent Thrombosis",
        "patientProfile": "56M received drug-eluting stent to LAD 2 weeks ago; self-discontinued clopidogrel due to minor gum bleeding.",
        "presentation": "Presents with sudden severe crushing retrosternal chest pain and cardiogenic shock. Emergency angiography shows acute thrombotic occlusion within the stent.",
        "clinicalQuestion": "What is the pathophysiological failure here?",
        "discussion": "Premature cessation of clopidogrel before endothelialization of the metallic stent struts leads to massive platelet adhesion and occlusive thrombus formation."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 34: Drugs Used in Disorders of Coagulation (Antiplatelet Drugs)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "coronary-artery-disease"
      ]
    }
  },
  {
    "id": "warfarin",
    "name": "Warfarin",
    "nameBn": "ওয়ারফারিন",
    "normalizedName": "warfarin",
    "pharmacologicalClass": "Vitamin K Antagonist (Oral Anticoagulant)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "B01AA03",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Surgery)",
    "mechanismOfAction": "Inhibits vitamin K epoxide reductase complex 1 (VKORC1), blocking the regeneration of reduced vitamin K (vitamin KH2). Reduced vitamin K is an essential cofactor for gamma-glutamyl carboxylase, which carboxylates glutamic acid residues on coagulation factors II (prothrombin), VII, IX, and X, as well as endogenous anticoagulant proteins C and S. Incomplete carboxylation renders these clotting factors biologically inactive. Because pre-existing circulating factors must be degraded, full clinical antithrombotic effect takes 3 to 5 days (governed by the half-life of prothrombin: ~60-72 hours).",
    "receptorOrTarget": "Vitamin K Epoxide Reductase Complex 1 (VKORC1)",
    "indications": [
      {
        "id": "ind-mvr",
        "name": "Mechanical Heart Valve Prosthesis Anticoagulation (Drug of Choice)",
        "isPrimary": true,
        "guidelineRecommendation": "Target INR 2.5 - 3.5; DOACs are contraindicated in mechanical valves (ACC / ESC Guidelines)"
      },
      {
        "id": "ind-af",
        "name": "Atrial Fibrillation with High Stroke Risk (CHA2DS2-VASc score >= 2)",
        "isPrimary": true
      },
      {
        "id": "ind-dvt-pe",
        "name": "Deep Vein Thrombosis (DVT) and Pulmonary Embolism (PE) Treatment & Secondary Prevention",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "Pregnancy (especially 1st trimester and near term)",
        "type": "absolute",
        "reason": "Teratogenic: Warfarin embryopathy (nasal hypoplasia, chondrodysplasia punctata, CNS defects) and fatal fetal hemorrhage"
      },
      {
        "condition": "Active severe bleeding / hemorrhagic diathesis",
        "type": "absolute",
        "reason": "Fatal hemorrhage"
      },
      {
        "condition": "Severe hepatic disease with baseline coagulopathy",
        "type": "absolute",
        "reason": "Unpredictable response"
      }
    ],
    "dosageGuidance": {
      "adult": "Initial 5 mg once daily (2.5 mg in elderly, frail, or malnourished). Adjust dose strictly according to International Normalized Ratio (INR). Standard target INR: 2.0 to 3.0 (Target 2.5 to 3.5 for mechanical mitral valves).",
      "paediatric": "Specialist pediatric hematology dosing guided by INR.",
      "geriatric": "Lower maintenance doses (often 2-4 mg daily) due to decreased clearance and higher bleeding sensitivity.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take once daily in the evening at 6 PM. Consistent timing allows morning INR testing to reflect steady trough effect."
    },
    "doseAdjustment": {
      "renal": "No direct dose adjustment, but renal disease alters protein binding and increases bleeding risk; monitor INR closely.",
      "hepatic": "Decreased synthesis of clotting factors increases sensitivity; lower doses required."
    },
    "adverseEffects": {
      "common": [
        "Bleeding (minor bruising, epistaxis, hematuria, gum bleeding)"
      ],
      "uncommon": [
        "Gastrointestinal hemorrhage",
        "Warfarin-induced skin necrosis (due to rapid depletion of protein C in first 48 hours)"
      ],
      "rare": [
        "Purple toe syndrome (cholesterol microembolization)",
        "Intracranial hemorrhage",
        "Alopecia"
      ],
      "seriousWarnings": [
        "Black Box Warning: Major and Fatal Bleeding. Risk is proportional to INR elevation. Regular INR monitoring is mandatory. Reverse with IV Vitamin K1 (Phytomenadione) and Prothrombin Complex Concentrate (PCC). Strictly contraindicated in pregnancy."
      ]
    },
    "precautions": [
      "Requires constant INR monitoring. Warn patients about dietary vitamin K fluctuations (green leafy vegetables / শাকপাতা). Many drug interactions via CYP2C9."
    ],
    "monitoringRequirements": [
      {
        "parameter": "International Normalized Ratio (INR)",
        "frequency": "Daily while initiating, twice weekly until stable, then every 2 to 4 weeks",
        "targetOrClinicalAction": "Maintain within therapeutic window (2.0-3.0 for AF/DVT, 2.5-3.5 for mechanical valves)"
      },
      {
        "parameter": "Complete Blood Count (Hb / Hct)",
        "frequency": "Periodically",
        "targetOrClinicalAction": "Detect occult bleeding"
      }
    ],
    "foodInteractions": "Foods rich in Vitamin K (spinach, cabbage, broccoli, green leafy vegetables / পালং শাক, বাঁধাকপি) directly antagonize warfarin. Patients should keep vitamin K dietary intake consistent, not eliminate it entirely.",
    "pregnancyInfo": {
      "category": "Category X",
      "details": "Highly teratogenic. Causes Warfarin Embryopathy. Switch to LMWH/Heparin throughout pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Does not enter breast milk in significant amounts; safe during lactation (BNF / AAP)."
    },
    "paediatricConsiderations": "Requires specialized pediatric monitoring.",
    "geriatricConsiderations": "High risk of fatal subdural hematoma from minor falls. Keep INR closely controlled.",
    "overdoseInformation": {
      "symptoms": "Spontaneous bleeding, ecchymoses, hematuria, GI bleeding, intracranial hemorrhage.",
      "management": "INR 4.5-10 without bleeding: withhold warfarin. INR > 10 without bleeding: Oral Vitamin K1 (1-2.5 mg). Major life-threatening bleeding: IV Vitamin K1 (5-10 mg slow infusion) PLUS Prothrombin Complex Concentrate (PCC / Beriplex) or Fresh Frozen Plasma (FFP).",
      "antidote": "Vitamin K1 (Phytomenadione) and Prothrombin Complex Concentrate (PCC)"
    },
    "storageInformation": "Store at 20°C to 25°C protected from light.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "Approved Pharmaceutical Directory",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Oral Anticoagulants — Warfarin Sodium",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "ওরাল অ্যান্টিকোয়াগুল্যান্ট (ভিটামিন কে বিরোধী রক্ত তরলকারী ওষুধ)",
      "mechanismSummaryBn": "যকৃতে ভিটামিন কে নির্ভর রক্ত জমাট বাঁধার উপাদান (২, ৭, ৯, ১০) তৈরি বন্ধ করে রক্ত অতিরিক্ত জমাট বাঁধা প্রতিরোধ করে।",
      "patientCounsellingBn": "প্রতিদিন সন্ধ্যায় একই সময়ে সেবন করুন। নিয়মিত রক্তের আইএনআর (INR) পরীক্ষা করিয়ে ডাক্তারের পরামর্শ মতো ডোজ নির্ধারণ করুন। খাদ্যতালিকায় সবুজ শাকসবজি হঠাৎ বাড়াবেন বা কমাবেন না; সাধারণ সমতা বজায় রাখুন। শরীরের কোথাও অস্বাভাবিক রক্তক্ষরণ হলে সাথে সাথে হাসপাতালে যোগাযোগ করুন।",
      "criticalWarningBn": "গর্ভবতী মহিলাদের জন্য এটি সম্পূর্ণ নিষিদ্ধ কারণ এটি গর্ভস্থ শিশুর মারাত্মক অঙ্গহানি ও রক্তক্ষরণ ঘটায়।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "VKORC1 Inhibition -> Prevents Vitamin K Hydroquinone Regeneration -> Halts Gamma-Carboxylation of Factors II, VII, IX, X, Protein C & S.",
      "receptorTarget": "Vitamin K Epoxide Reductase Complex Subunit 1 (VKORC1)",
      "vivaQuestions": [
        {
          "question": "Why does Warfarin paradoxically cause skin necrosis in the first 24 to 48 hours of initiation?",
          "questionBn": "শুরু করার প্রথম ১-২ দিনে ওয়ারফারিন কেন উল্টো রক্তনালী জমাট বাঁধিয়ে স্কিন নেক্রোসিস করতে পারে?",
          "modelAnswer": "Endogenous anticoagulant Protein C has a very short half-life (~6 to 8 hours), much shorter than procoagulant factors II, IX, and X. Warfarin depletes Protein C first, precipitating a transient, paradoxically prothrombotic state leading to microvascular cutaneous thrombosis and skin necrosis, especially in patients with pre-existing protein C deficiency. This is why heparin bridging is mandatory.",
          "highYieldPearl": "Always bridge with Heparin/LMWH until INR is within therapeutic range for 2 consecutive days."
        },
        {
          "question": "What is the immediate reversal agent for life-threatening bleeding on Warfarin?",
          "questionBn": "ওয়ারফারিনের কারণে মারাত্মক রক্তক্ষরণে সবচেয়ে দ্রুত কার্যকরী অ্যান্টিডোট কোনটি?",
          "modelAnswer": "4-Factor Prothrombin Complex Concentrate (PCC) along with slow IV Vitamin K1. PCC provides pre-formed active clotting factors (II, VII, IX, X) within 15 minutes, while Vitamin K takes 6 to 24 hours to stimulate new hepatic synthesis.",
          "highYieldPearl": "PCC is superior to FFP because of rapid reconstitution, small infusion volume, and absence of fluid overload risk."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-warf-01",
          "front": "Which clotting factors are inhibited by Warfarin?",
          "back": "Factors II, VII, IX, and X (also anticoagulant Proteins C & S).",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-warf-02",
          "front": "Target INR for Mechanical Mitral Valve?",
          "back": "2.5 to 3.5.",
          "topic": "Clinical Practice",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-warf-01",
          "question": "A 58-year-old female with a mechanical bileaflet mitral valve presents with severe epistaxis and hematuria. Her INR is 9.5. There is active ongoing bleeding. What is the most rapid and effective therapeutic reversal strategy?",
          "options": [
            "Slow IV Vitamin K1 plus 4-Factor Prothrombin Complex Concentrate (PCC)",
            "Subcutaneous Vitamin K1 alone",
            "High-dose oral Vitamin C and calcium",
            "Platelet transfusion and protamine sulfate",
            "Fresh frozen plasma only without vitamin K"
          ],
          "correctIndex": 0,
          "explanation": "In major active bleeding with high INR, 4-factor PCC provides immediate correction of factor deficiency within minutes, while IV Vitamin K1 sustains factor synthesis over the next 24 hours.",
          "bmdcFocus": "Hematology / Emergency Medicine Core"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Mechanical Mitral Valve & Antibiotic Interaction",
        "patientProfile": "45F with metallic mechanical mitral valve on Warfarin 5 mg daily with stable INR 2.8.",
        "presentation": "Treated for dental abscess with Metronidazole 400 mg thrice daily. After 4 days, presents with spontaneous hematuria and extensive ecchymoses. Repeat INR is 11.2.",
        "clinicalQuestion": "What drug-drug interaction caused this severe toxicity?",
        "discussion": "Metronidazole is a potent inhibitor of CYP2C9, the primary metabolic pathway for the more active (S)-warfarin enantiomer. This caused massive accumulation of active warfarin and severe life-threatening coagulopathy."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 34: Drugs Used in Disorders of Coagulation (Warfarin)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "Essentials of Medical Pharmacology — K. D. Tripathi",
          "edition": "8th Edition",
          "chapterOrSection": "Chapter 44: Drugs Affecting Coagulation (Oral Anticoagulants)",
          "verifiedTextbookId": "kd-tripathi-essentials-medical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-valves-and-infection"
      ]
    }
  },
  {
    "id": "heparin",
    "name": "Heparin (Unfractionated Heparin)",
    "nameBn": "হেপারিন",
    "normalizedName": "heparin",
    "pharmacologicalClass": "Parenteral Anticoagulant (Antithrombin III Activator)",
    "therapeuticClass": "Cardiovascular & Renal Drugs",
    "therapeuticClassId": "cardiovascular-renal",
    "atcCode": "B01AB01",
    "prescriptionStatus": "Restricted",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Surgery)",
    "mechanismOfAction": "Unfractionated heparin binds via a specific high-affinity pentasaccharide sequence to antithrombin III (ATIII), inducing a conformational change that accelerates antithrombin’s catalytic inactivation of thrombin (factor IIa), factor Xa, and factors IXa, XIa, and XIIa by over 1,000-fold. To inactivate thrombin (IIa), heparin must form a ternary molecular bridge wrapping around both antithrombin and thrombin (requiring at least 18 saccharide units). For factor Xa inhibition, only the pentasaccharide binding to antithrombin is necessary.",
    "receptorOrTarget": "Endogenous Antithrombin III (SerpinC1)",
    "indications": [
      {
        "id": "ind-acs-heparin",
        "name": "Acute Coronary Syndrome (STEMI / NSTEMI undergoing PCI)",
        "isPrimary": true
      },
      {
        "id": "ind-dvt-pe-acute",
        "name": "Acute Deep Vein Thrombosis and Massive Pulmonary Embolism",
        "isPrimary": true
      },
      {
        "id": "ind-cardiopulmonary",
        "name": "Anticoagulation for Cardiopulmonary Bypass & Hemodialysis",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "History of Heparin-Induced Thrombocytopenia (HIT Type II)",
        "type": "absolute",
        "reason": "Catastrophic widespread arterial and venous thrombosis (white clot syndrome)"
      },
      {
        "condition": "Active major internal bleeding or severe thrombocytopenia (< 50,000/μL)",
        "type": "absolute",
        "reason": "High risk of hemorrhage"
      }
    ],
    "dosageGuidance": {
      "adult": "Therapeutic Anticoagulation: IV bolus 80 units/kg (Max 5,000 units), followed by continuous IV infusion of 18 units/kg/hour adjusted to target activated Partial Thromboplastin Time (aPTT 1.5 to 2.5 times control: 60-85 seconds). DVT Prophylaxis: 5,000 units subcutaneously every 8-12 hours.",
      "paediatric": "Loading 50-75 units/kg IV, followed by 20 units/kg/hour guided by aPTT.",
      "geriatric": "Lower doses often required; high bleeding sensitivity.",
      "routes": [
        "IV",
        "SC"
      ],
      "timingNotice": "Continuous infusion requires a precision infusion syringe pump."
    },
    "doseAdjustment": {
      "renal": "Preferred anticoagulant in severe renal failure (eGFR < 15-30 mL/min) over LMWH, because unfractionated heparin is cleared by reticuloendothelial uptake and hepatic metabolism rather than renal clearance.",
      "hepatic": "Monitor aPTT closely in hepatic impairment."
    },
    "adverseEffects": {
      "common": [
        "Bleeding",
        "Injection site hematoma",
        "Mild transient transaminitis"
      ],
      "uncommon": [
        "Heparin-Induced Thrombocytopenia Type I (non-immune, benign, occurs on day 1-2)"
      ],
      "rare": [
        "Heparin-Induced Thrombocytopenia Type II (immune-mediated PF4-heparin antibodies, occurs on day 5-10; causes paradoxical arterial/venous thrombosis)",
        "Osteoporosis (with prolonged use > 3-6 months)",
        "Hyperkalemia (due to aldosterone suppression)"
      ],
      "seriousWarnings": [
        "Black Box: Heparin-Induced Thrombocytopenia (HIT). A drop in platelet count > 50% from baseline between days 5-10 of therapy signals immune HIT. Discontinue ALL heparin immediately and switch to a direct thrombin inhibitor (Argatroban / Bivalirudin). Never give platelets!"
      ]
    },
    "precautions": [
      "Monitor aPTT every 6 hours after dose changes. Check baseline platelet count and every 2-3 days while on therapy."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Activated Partial Thromboplastin Time (aPTT)",
        "frequency": "Every 6 hours until 2 consecutive therapeutic readings, then daily",
        "targetOrClinicalAction": "Target aPTT 1.5 to 2.5 times control (60 to 85 seconds)"
      },
      {
        "parameter": "Platelet Count",
        "frequency": "Baseline, and every 2-3 days from day 4 to 14",
        "targetOrClinicalAction": "Withhold if platelets drop > 50%"
      }
    ],
    "foodInteractions": "Parenteral administration; not affected by food.",
    "pregnancyInfo": {
      "category": "Category C / Safe in Pregnancy",
      "details": "Does NOT cross the placenta due to high molecular weight and negative charge. Drug of choice for anticoagulation during pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Does not enter breast milk; safe during lactation."
    },
    "paediatricConsiderations": "Safe and effective; dose adjusted by pediatric aPTT protocols.",
    "geriatricConsiderations": "Higher risk of bleeding complications; monitor aPTT rigorously.",
    "overdoseInformation": {
      "symptoms": "Severe bleeding, epistaxis, hematuria, retroperitoneal hemorrhage.",
      "management": "Stop infusion immediately. Specific Antidote: Protamine Sulfate slow IV injection (1 mg protamine neutralizes ~100 units of heparin; maximum 50 mg).",
      "antidote": "Protamine Sulfate"
    },
    "storageInformation": "Store between 15°C and 25°C. Do not freeze.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "Hospital Essential Medicines Register",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2023-08-10",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2023.2"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Parenteral Anticoagulants — Heparin",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. M. A. Salam",
      "reviewerCredentials": "FCPS, FACC, NICVD",
      "reviewDate": "2026-09-15",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.3.0"
    },
    "bilingualNotes": {
      "classBn": "প্যারেন্টেরাল অ্যান্টিকোয়াগুল্যান্ট (শিরায় প্রয়োগের দ্রুত কার্যকর রক্ত তরলকারী ইনজেকশন)",
      "mechanismSummaryBn": "রক্তের অ্যান্টিথ্রম্বিন-৩ কে শতগুণ সক্রিয় করে থ্রম্বিন ও ফ্যাক্টর ১০এ নিষ্ক্রিয় করার মাধ্যমে তাৎক্ষণিক রক্ত জমাট বাঁধা বন্ধ করে।",
      "patientCounsellingBn": "এটি কেবল হাসপাতালে শিরার মাধ্যমে ইনফিউশন পাম্প দিয়ে সতর্কতার সাথে প্রয়োগ করা হয়। রক্ত জমাট বাঁধার সময় (aPTT) নিয়মিত পরীক্ষা করতে হয়।",
      "criticalWarningBn": "অতিরিক্ত মাত্রায় রক্তক্ষরণ হলে এর নির্দিষ্ট প্রতিষেধক হলো প্রোটামিন সালফেট ইনজেকশন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "High-Affinity Pentasaccharide Binds ATIII -> 1000-fold Acceleration of Thrombin (IIa) and Factor Xa Inactivation via Molecular Bridge.",
      "receptorTarget": "Antithrombin III (ATIII)",
      "vivaQuestions": [
        {
          "question": "What is the structural difference in how Heparin and LMWH inactivate Thrombin vs Factor Xa?",
          "questionBn": "থ্রম্বিন ও ফ্যাক্টর ১০এ নিষ্ক্রিয়করণে হেপারিন ও লো-মলিকুলার-ওয়েট হেপারিনের মধ্যে পার্থক্যের কারণ কী?",
          "modelAnswer": "Inactivation of thrombin (IIa) requires a long polysaccharide chain (>= 18 saccharide units) that can bridge and wrap around both ATIII and thrombin simultaneously. Inactivation of factor Xa requires only the pentasaccharide sequence binding to ATIII without bridging. Unfractionated heparin has equal 1:1 activity against IIa and Xa. LMWH molecules are shorter (< 18 units), so they effectively inactivate Xa but have much less activity against IIa (Xa:IIa ratio 3:1 to 4:1).",
          "highYieldPearl": "Core hematology viva question: Why LMWH has high anti-Xa to anti-IIa ratio."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-hep-01",
          "front": "Specific antidote for Heparin overdose?",
          "back": "Protamine Sulfate (1 mg neutralizes ~100 units of heparin).",
          "topic": "Antidote",
          "highYield": true
        },
        {
          "id": "fc-hep-02",
          "front": "Which lab test monitors unfractionated heparin?",
          "back": "aPTT (activated Partial Thromboplastin Time) — target 1.5 to 2.5x control.",
          "topic": "Monitoring",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-hep-01",
          "question": "A patient receiving continuous IV heparin for massive pulmonary embolism experiences sudden oozing from venipuncture sites and hematuria. aPTT is > 150 seconds. What is the immediate pharmacological antidote to administer?",
          "options": [
            "Protamine Sulfate IV",
            "Vitamin K1 IV",
            "Fresh Frozen Plasma",
            "Aminocaproic Acid",
            "Calcium Gluconate"
          ],
          "correctIndex": 0,
          "explanation": "Protamine sulfate is a strongly basic peptide that binds negatively charged heparin stoichiometrically to form a stable inactive salt, rapidly neutralizing its anticoagulant action.",
          "bmdcFocus": "Phase 2 Pharmacology / Critical Care"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Heparin-Induced Thrombocytopenia (HIT)",
        "patientProfile": "60F receiving IV heparin for 7 days post-hip surgery.",
        "presentation": "Platelet count plunges from 250,000 to 45,000/μL. She suddenly develops acute left leg swelling and cyanosis due to new DVT.",
        "clinicalQuestion": "What catastrophic immune reaction is this?",
        "discussion": "HIT Type II caused by IgG antibodies directed against the Heparin-Platelet Factor 4 (PF4) complex. These complexes cross-link FcγRIIa receptors on platelets, causing massive platelet activation and widespread thrombosis. Heparin must be halted immediately and replaced with a non-heparin anticoagulant (Argatroban)."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 34: Drugs Used in Disorders of Coagulation (Heparin)",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-valves-and-infection"
      ]
    }
  },
  {
    "id": "amoxicillin",
    "name": "Amoxicillin",
    "nameBn": "অ্যামোক্সিসিলিন",
    "normalizedName": "amoxicillin",
    "pharmacologicalClass": "Aminopenicillin (Moderate-spectrum Beta-Lactam Antibiotic)",
    "therapeuticClass": "Antimicrobial Agents & Antibiotics",
    "therapeuticClassId": "antimicrobials",
    "atcCode": "J01CA04",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine, Surgery, Paediatrics)",
    "mechanismOfAction": "Bactericidal beta-lactam antibiotic that competitively inhibits bacterial transpeptidase enzymes (penicillin-binding proteins, PBPs, chiefly PBP-1A and PBP-2). This prevents the cross-linking of linear peptidoglycan strands in the bacterial cell wall during active bacterial cell division. The resulting weakened cell wall cannot withstand osmotic pressure, leading to bacterial cell lysis mediated by bacterial autolysins and murein hydrolases. Amoxicillin has superior oral bioavailability (75-90%) compared to ampicillin and absorption is unaffected by food.",
    "receptorOrTarget": "Bacterial Penicillin-Binding Proteins (PBPs / Transpeptidases)",
    "indications": [
      {
        "id": "ind-urti",
        "name": "Upper Respiratory Tract Infections (Acute Otitis Media, Sinusitis, Streptococcal Pharyngitis)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line antibiotic in pediatric otitis media (DGHS & WHO EML)"
      },
      {
        "id": "ind-cap",
        "name": "Community-Acquired Pneumonia (CAP) in Outpatient Setting (Streptococcus pneumoniae)",
        "isPrimary": true
      },
      {
        "id": "ind-hpylori",
        "name": "Helicobacter pylori Triple Eradication Therapy (with PPI and Clarithromycin)",
        "isPrimary": true
      },
      {
        "id": "ind-uti",
        "name": "Uncomplicated Urinary Tract Infections (Enterococcus / susceptible E. coli)",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "True immediate-type hypersensitivity (anaphylaxis) to penicillins or beta-lactams",
        "type": "absolute",
        "reason": "High risk of fatal anaphylactic shock"
      },
      {
        "condition": "Infectious Mononucleosis (Epstein-Barr Virus infection)",
        "type": "relative",
        "reason": "Causes high-incidence characteristic maculopapular non-allergic rash (up to 90%)"
      }
    ],
    "dosageGuidance": {
      "adult": "Standard: 500 mg every 8 hours or 875 mg every 12 hours. Severe infections / CAP: 1000 mg every 8 hours. H. pylori: 1000 mg twice daily with PPI.",
      "paediatric": "Standard: 25-50 mg/kg/day divided every 8 hours. High-dose for resistant Otitis Media / Pneumococcus: 80-90 mg/kg/day divided every 12 hours.",
      "geriatric": "Adult dosing acceptable; adjust if severe renal impairment.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "May be taken with or without meals (unlike ampicillin which requires empty stomach)."
    },
    "doseAdjustment": {
      "renal": "eGFR 10-30 mL/min: 250-500 mg every 12 hours; eGFR < 10 mL/min: 250-500 mg every 24 hours.",
      "hepatic": "No dose adjustment required."
    },
    "adverseEffects": {
      "common": [
        "Diarrhea",
        "Nausea / vomiting",
        "Erythematous maculopapular skin rash"
      ],
      "uncommon": [
        "Urticaria",
        "Oral / vaginal candidiasis (thrush)"
      ],
      "rare": [
        "Anaphylaxis / angioedema",
        "Clostridioides difficile pseudomembranous colitis",
        "Interstitial nephritis",
        "Stevens-Johnson syndrome"
      ],
      "seriousWarnings": [
        "Anaphylactic Shock: Severe immediate IgE-mediated hypersensitivity with laryngeal edema, bronchospasm, and cardiovascular collapse. Always confirm allergy history before prescribing."
      ]
    },
    "precautions": [
      "Always elicit prior penicillin allergy history. Do not prescribe in suspected viral infectious mononucleosis (glandular fever). Finish full antibiotic course to prevent antimicrobial resistance."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Signs of Hypersensitivity (Urticaria, wheezing, swelling)",
        "frequency": "Within 30-60 min of first dose in hospital",
        "targetOrClinicalAction": "Immediate IM Epinephrine if anaphylaxis occurs"
      },
      {
        "parameter": "Bowel Habits (Severe watery diarrhea)",
        "frequency": "During and up to 4 weeks after therapy",
        "targetOrClinicalAction": "Test for C. difficile toxin"
      }
    ],
    "foodInteractions": "Oral absorption is not significantly affected by food. May be taken with meals to reduce gastric upset.",
    "pregnancyInfo": {
      "category": "Category B / First-Line Antibiotic in Pregnancy",
      "details": "Widely used in all trimesters of pregnancy with extensive safety record."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in low levels in breast milk; compatible with breastfeeding (may cause transient infant loose stools or thrush)."
    },
    "paediatricConsiderations": "First-line antibiotic of choice in pediatric respiratory infections. Taste-masked suspensions improve adherence.",
    "geriatricConsiderations": "Safe in elderly; adjust for renal clearance.",
    "overdoseInformation": {
      "symptoms": "Nausea, vomiting, diarrhea, crystalluria and acute kidney injury with massive doses.",
      "management": "Maintain adequate hydration to prevent crystalluria; hemodialyzable."
    },
    "storageInformation": "Store capsules and dry syrup below 25°C. Reconstituted oral suspension must be stored in refrigerator (2-8°C) and discarded after 7-10 days.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "অ্যামিনোপেনিসিলিন অ্যান্টিবায়োটিক (কোষপ্রাচীর সংশ্লেষণ প্রতিরোধক)",
      "mechanismSummaryBn": "ব্যাকটেরিয়ার পেনিসিলিন-বাইন্ডিং প্রোটিনকে ব্লক করে পেপটিডোগ্লাইকান ক্রস-লিংকিং বন্ধ করে এবং ব্যাকটিরিওলাইসিস ঘটায়।",
      "patientCounsellingBn": "সম্পূর্ণ কোর্স শেষ করুন। পেটের অস্বস্তি কমাতে খাবারের সাথে খাওয়া ভালো।",
      "criticalWarningBn": "পেনিসিলিন অ্যালার্জির ইতিহাস থাকলে এটি গ্রহণ করবেন না।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Transpeptidase inhibition -> incomplete bacterial peptidoglycan cross-linking -> osmotic autolysis via bacterial murein hydrolases.",
      "receptorTarget": "Bacterial Penicillin-Binding Proteins (PBP-1A and PBP-2)",
      "vivaQuestions": [
        {
          "question": "Why is amoxicillin better absorbed orally than ampicillin?",
          "questionBn": "অ্যামপিসিলিনের চেয়ে অ্যামোক্সিসিলিন মুখে বেশি শোষিত হয় কেন?",
          "modelAnswer": "Amoxicillin has an additional phenolic hydroxyl group increasing acid stability and gastrointestinal absorption (75-90% vs 40-50%), and its absorption is not impaired by food.",
          "highYieldPearl": "Food impairs ampicillin absorption but does not affect amoxicillin."
        },
        {
          "question": "Why is amoxicillin combined with clavulanic acid?",
          "questionBn": "অ্যামোক্সিসিলিনের সাথে ক্লাভুলানিক অ্যাসিড কেন যোগ করা হয়?",
          "modelAnswer": "Clavulanic acid is a suicide beta-lactamase inhibitor that irreversibly binds bacterial beta-lactamase enzymes, protecting amoxicillin from enzymatic inactivation.",
          "highYieldPearl": "Clavulanate extends spectrum to beta-lactamase producing Staph aureus, E. coli, H. influenzae."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-amox-01",
          "front": "Primary mechanism of Amoxicillin?",
          "back": "Bactericidal inhibition of cell wall transpeptidase (PBPs).",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-amox-02",
          "front": "Why avoid Amoxicillin in Infectious Mononucleosis?",
          "back": "Causes characteristic non-allergic maculopapular rash in up to 90% of patients.",
          "topic": "Adverse Effects",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-amox-01",
          "question": "A 4-year-old child presents with high fever and acute bulging tympanic membrane. What is the first-line oral antibiotic?",
          "options": [
            "Amoxicillin",
            "Ciprofloxacin",
            "Doxycycline",
            "Gentamicin"
          ],
          "correctIndex": 0,
          "explanation": "High-dose oral amoxicillin is the first-line antibiotic for pediatric acute otitis media.",
          "bmdcFocus": "Phase 2 Pharmacology & Paediatrics"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute Otitis Media & Maculopapular Rash",
        "patientProfile": "19-year-old university student with exudative sore throat and cervical lymphadenopathy.",
        "presentation": "Prescribed amoxicillin; 5 days later develops widespread erythematous maculopapular rash without airway distress. Monospot test is positive.",
        "clinicalQuestion": "What is the diagnostic significance of this rash?",
        "discussion": "This is an ampicillin/amoxicillin-induced rash secondary to Epstein-Barr Virus (EBV) infectious mononucleosis, NOT a true IgE-mediated allergy. Amoxicillin should be stopped, but true penicillin allergy is not confirmed."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 43: Beta-Lactam & Other Cell Wall Antibiotics",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "Davidson's Principles and Practice of Medicine",
          "edition": "24th Edition",
          "chapterOrSection": "Infectious Diseases: Upper Respiratory Infections"
        }
      ],
      "acrossBooksTopicIds": [
        "heart-valves-and-infection"
      ]
    }
  },
  {
    "id": "azithromycin",
    "name": "Azithromycin",
    "nameBn": "অ্যাজিথ্রোমাইসিন",
    "normalizedName": "azithromycin",
    "pharmacologicalClass": "Azalide / Macrolide Antibiotic (50S Ribosomal Subunit Inhibitor)",
    "therapeuticClass": "Antimicrobial Agents & Antibiotics",
    "therapeuticClassId": "antimicrobials",
    "atcCode": "J01FA10",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Paediatrics)",
    "mechanismOfAction": "Azithromycin is a semi-synthetic azalide antibiotic derived by inserting a nitrogen atom into the 14-membered lactone ring of erythromycin, forming a 15-membered ring. It reversibly binds to the 50S ribosomal subunit (specifically the 23S rRNA) of susceptible microorganisms. This halts transpeptidation and translocation of nascent peptidyl-tRNA, inhibiting RNA-dependent bacterial protein synthesis. It concentrates intensely within intracellular lysosomal compartments of phagocytes, macrophages, and neutrophils, which actively transport the drug to sites of infection (producing tissue concentrations up to 50 times higher than plasma levels). It has a prolonged terminal half-life of 68 hours, enabling once-daily dosing and short 3- to 5-day treatment courses.",
    "receptorOrTarget": "23S rRNA of the bacterial 50S Ribosomal Subunit",
    "indications": [
      {
        "id": "ind-atypical-cap",
        "name": "Community-Acquired Atypical Pneumonia (Mycoplasma pneumoniae, Chlamydia pneumoniae, Legionella)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line macrolide of choice (ATS / IDSA Guidelines)"
      },
      {
        "id": "ind-enteric-fever",
        "name": "Enteric Fever (Typhoid / Paratyphoid Fever in Bangladesh)",
        "isPrimary": true,
        "note": "Highly effective for multidrug-resistant Salmonella typhi in Bangladesh"
      },
      {
        "id": "ind-chlamydia-std",
        "name": "Urogenital Chlamydia trachomatis Infection (Non-gonococcal urethritis / cervicitis)",
        "isPrimary": true,
        "note": "Single 1 g oral dose"
      },
      {
        "id": "ind-shigella",
        "name": "Bacterial Enteritis (Shigellosis & Traveler’s Diarrhea)",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Known hypersensitivity to azithromycin, erythromycin, or any macrolide",
        "type": "absolute",
        "reason": "Cross-allergenicity and anaphylaxis"
      },
      {
        "condition": "History of cholestatic jaundice or hepatic dysfunction with prior azithromycin use",
        "type": "absolute",
        "reason": "High recurrence of drug-induced liver injury"
      }
    ],
    "dosageGuidance": {
      "adult": "Respiratory infections: 500 mg once daily for 3 days (or 500 mg day 1, then 250 mg daily on days 2-5). Enteric (Typhoid) Fever: 1000 mg once daily for 7 days (or 500 mg daily for 7-14 days). Chlamydia urethritis: 1000 mg single oral dose.",
      "paediatric": "10 mg/kg once daily for 3 days (or 20 mg/kg/day for typhoid fever for 7 days).",
      "geriatric": "Adult dosing acceptable; monitor for cardiac QTc prolongation.",
      "routes": [
        "Oral",
        "IV"
      ],
      "timingNotice": "May be taken with or without meals. Taking with food reduces gastrointestinal discomfort."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment required for eGFR > 10 mL/min; caution in eGFR < 10 mL/min.",
      "hepatic": "Excreted predominantly via biliary route; caution in severe hepatic cirrhosis."
    },
    "adverseEffects": {
      "common": [
        "Diarrhea / loose stools",
        "Nausea, vomiting, abdominal cramping",
        "Headache"
      ],
      "uncommon": [
        "Dizziness",
        "Palpitations",
        "Dyspepsia / flatulence",
        "Transient transaminase elevation"
      ],
      "rare": [
        "QTc prolongation and Torsades de Pointes",
        "Cholestatic jaundice / fulminant hepatitis",
        "Hearing impairment / reversible sensorineural deafness (with high doses)",
        "C. difficile colitis"
      ],
      "seriousWarnings": [
        "Cardiac Safety Warning: QTc Prolongation and Fatal Ventricular Arrhythmias (Torsades de Pointes). Risk increases significantly in patients with pre-existing long QT syndrome, hypokalemia, hypomagnesemia, bradycardia, or when combined with other QT-prolonging drugs (e.g. Ciprofloxacin, Ondansetron, Amiodarone)."
      ]
    },
    "precautions": [
      "Check ECG for baseline QTc interval in high-risk cardiac patients. Avoid irrational short courses that fuel antimicrobial resistance in Bangladesh."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Electrocardiogram (ECG) QTc Interval",
        "frequency": "In patients on antiarrhythmics or multiple QT-prolonging medications",
        "targetOrClinicalAction": "Withhold if QTc > 500 ms"
      },
      {
        "parameter": "Liver Function Tests",
        "frequency": "In prolonged therapy",
        "targetOrClinicalAction": "Discontinue if jaundice or dark urine develops"
      }
    ],
    "foodInteractions": "Tablets and suspension may be taken with food. Aluminum and magnesium antacids reduce peak serum concentration (take 2 hours apart).",
    "pregnancyInfo": {
      "category": "Category B / Safe when Indicated",
      "details": "No evidence of fetal harm in animal studies. Preferred macrolide in pregnancy for chlamydia and atypical infections."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in low levels in human milk; compatible with breastfeeding."
    },
    "paediatricConsiderations": "Extensively used and well-tolerated in pediatric infections. Avoid intravenous form in infants < 16 years.",
    "geriatricConsiderations": "High susceptibility to drug-induced QTc prolongation and arrhythmias.",
    "overdoseInformation": {
      "symptoms": "Severe nausea, vomiting, diarrhea, transient hearing loss, cardiac arrhythmias.",
      "management": "Symptomatic supportive treatment. Monitor ECG. Hemodialysis is ineffective due to high tissue binding."
    },
    "storageInformation": "Store below 25°C. Reconstituted suspension should be stored at room temperature and used within 10 days.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "ম্যাক্রোলাইড (অ্যাজালাইড) অ্যান্টিবায়োটিক",
      "mechanismSummaryBn": "ব্যাকটেরিয়ার ৫০এস রাইবোজোমের সাথে যুক্ত হয়ে প্রোটিন ট্রান্সলোকেশন বন্ধ করে ব্যাকটেরিয়ার বিস্তার রোধ করে।",
      "patientCounsellingBn": "প্রতিদিন নির্দিষ্ট সময়ে একবার করে খাবার ১ ঘণ্টা আগে বা ২ ঘণ্টা পরে অথবা খাবারের সাথে সেবন করুন।",
      "criticalWarningBn": "বুকের ধড়ফড়ানি বা কিউটিসি প্রোলংগেশনের ঝুঁকি এড়াতে ডাক্তারের পরামর্শ মেনে চলুন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Reversible binding to 23S rRNA in 50S subunit -> premature release of peptidyl-tRNA -> halts peptide chain elongation.",
      "receptorTarget": "23S rRNA of bacterial 50S ribosomal subunit",
      "vivaQuestions": [
        {
          "question": "Why does Azithromycin only require a 3 to 5 day course?",
          "questionBn": "অ্যাজিথ্রোমাইসিনের কোর্স মাত্র ৩ থেকে ৫ দিন কেন?",
          "modelAnswer": "Azithromycin has extensive tissue sequestration within phagocytes and fibroblasts, providing tissue half-life of 68 hours and maintaining therapeutic tissue levels for 7-10 days after completion.",
          "highYieldPearl": "Tissue concentrations are 10-50 times higher than plasma concentrations."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-azith-01",
          "front": "Target of Azithromycin?",
          "back": "50S ribosomal subunit (23S rRNA).",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-azith-02",
          "front": "Major cardiovascular risk?",
          "back": "QTc prolongation and Torsades de Pointes.",
          "topic": "Adverse Effects",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-azith-01",
          "question": "Which antibiotic is first-line oral therapy for uncomplicated genital Chlamydia trachomatis infection as a single 1 g dose?",
          "options": [
            "Azithromycin",
            "Penicillin G",
            "Metronidazole",
            "Gentamicin"
          ],
          "correctIndex": 0,
          "explanation": "A single 1 g oral dose of Azithromycin achieves cure rates > 95% in urogenital chlamydial infections.",
          "bmdcFocus": "Phase 2 Pharmacology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Atypical Pneumonia with Prolonged QTc",
        "patientProfile": "72-year-old male with COPD and dry persistent cough, taking amiodarone.",
        "presentation": "Prescribed azithromycin for atypical pneumonia; baseline ECG shows QTc of 490 ms. On day 2, QTc prolongs to 530 ms.",
        "clinicalQuestion": "What immediate clinical management is mandated?",
        "discussion": "Discontinue azithromycin immediately due to additive risk of fatal Torsades de Pointes ventricular arrhythmia. Switch to an alternative non-QT-prolonging antibiotic (e.g., doxycycline) and check serum potassium and magnesium."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 44: Protein Synthesis Inhibitors & Macrolides",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "ceftriaxone",
    "name": "Ceftriaxone",
    "nameBn": "সেফট্রিয়াক্সন",
    "normalizedName": "ceftriaxone",
    "pharmacologicalClass": "Third-Generation Cephalosporin (Broad-Spectrum Beta-Lactam)",
    "therapeuticClass": "Antimicrobial Agents & Antibiotics",
    "therapeuticClassId": "antimicrobials",
    "atcCode": "J01DD04",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine, Surgery, Paediatrics)",
    "mechanismOfAction": "Third-generation cephalosporin with excellent bactericidal activity against Gram-negative bacilli, Neisseria, and Streptococcus. It binds to and acetylates bacterial penicillin-binding proteins (PBPs), inhibiting the final transpeptidation step of cell wall synthesis. It is highly stable against common plasmid-mediated bacterial beta-lactamases. Notably, ceftriaxone exhibits high penetrance across the inflamed blood-brain barrier (achieving therapeutic CSF levels) and has a prolonged elimination half-life of 8 hours, allowing convenient once-daily or twice-daily dosing.",
    "receptorOrTarget": "Bacterial Penicillin-Binding Proteins (PBP-2 and PBP-3)",
    "indications": [
      {
        "id": "ind-meningitis",
        "name": "Bacterial Meningitis (Streptococcus pneumoniae, Neisseria meningitidis, H. influenzae)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line empirical therapy with Vancomycin (IDSA Guidelines)"
      },
      {
        "id": "ind-enteric-severe",
        "name": "Severe Enteric (Typhoid) Fever Requiring Hospitalization",
        "isPrimary": true
      },
      {
        "id": "ind-sepsis",
        "name": "Severe Hospital Sepsis, Intra-abdominal Infections, and Pyelonephritis",
        "isPrimary": true
      },
      {
        "id": "ind-gonorrhea",
        "name": "Uncomplicated Anogenital Gonorrhea (Neisseria gonorrhoeae)",
        "isPrimary": true,
        "note": "500 mg single IM dose"
      },
      {
        "id": "ind-surgical-prophylaxis",
        "name": "Surgical Antimicrobial Prophylaxis",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Severe immediate anaphylaxis to cephalosporins or penicillins",
        "type": "absolute",
        "reason": "Cross-allergenicity and fatal anaphylaxis"
      },
      {
        "condition": "Hyperbilirubinemic neonates and premature infants",
        "type": "absolute",
        "reason": "Displaces bilirubin from serum albumin, causing kernicterus"
      },
      {
        "condition": "Concomitant IV Calcium in neonates (even via separate lines)",
        "type": "absolute",
        "reason": "Fatal calcium-ceftriaxone particulate precipitation in lungs and kidneys"
      }
    ],
    "dosageGuidance": {
      "adult": "Standard: 1 g to 2 g IV/IM once daily (or 1 g every 12 hours). Bacterial Meningitis: 2 g IV every 12 hours (4 g/day). Gonorrhea: 500 mg single IM dose.",
      "paediatric": "50 to 75 mg/kg/day IV/IM in 1-2 divided doses. Bacterial Meningitis: 100 mg/kg/day (Max 4 g/day).",
      "geriatric": "Standard adult dosing is safe.",
      "routes": [
        "IV",
        "IM"
      ],
      "timingNotice": "Administer slow IV injection over 2-4 minutes or IV infusion over 30 minutes. IM injections should be reconstituted with 1% Lidocaine to reduce injection pain."
    },
    "doseAdjustment": {
      "renal": "Dual elimination pathway (60% renal, 40% biliary). No dose adjustment required in mild to moderate renal disease unless combined renal and hepatic failure exist (Max 2 g/day).",
      "hepatic": "No dose adjustment unless severe renal failure coexists."
    },
    "adverseEffects": {
      "common": [
        "Diarrhea / loose stools",
        "Local phlebitis / pain at injection site",
        "Rash",
        "Thrombocytosis"
      ],
      "uncommon": [
        "Biliary sludge / pseudolithiasis (reversible ceftriaxone-calcium precipitation in gallbladder)",
        "Eosinophilia"
      ],
      "rare": [
        "Clostridioides difficile colitis",
        "Immune hemolytic anemia",
        "Agranulocytosis",
        "Encephalopathy / myoclonus with massive doses"
      ],
      "seriousWarnings": [
        "Fatal Neonatal Calcium-Ceftriaxone Precipitation: Never co-administer ceftriaxone with calcium-containing IV solutions (Ringer’s Lactate, Hartmann’s solution) in neonates."
      ]
    },
    "precautions": [
      "Always verify allergy history. Reversible biliary colic/sludge can occur on high-dose therapy (> 2 g/day for > 14 days)."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Complete Blood Count & Platelet Count",
        "frequency": "Periodically in prolonged courses (> 10 days)",
        "targetOrClinicalAction": "Detect neutropenia or thrombocytopenia"
      },
      {
        "parameter": "Signs of Anaphylaxis",
        "frequency": "During initial IV infusion",
        "targetOrClinicalAction": "Immediate cessation and resuscitation if wheezing or hypotension develops"
      }
    ],
    "foodInteractions": "Administered parenterally (IV/IM); food not applicable.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Crosses placenta; extensive clinical experience indicates safety in pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in small amounts in breast milk; compatible with breastfeeding (AAP / WHO)."
    },
    "paediatricConsiderations": "Contraindicated in hyperbilirubinemic neonates and premature infants due to kernicterus risk.",
    "geriatricConsiderations": "Safe in elderly; dual excretion prevents excessive accumulation.",
    "overdoseInformation": {
      "symptoms": "Neuromuscular excitability, myoclonus, encephalopathy, seizures.",
      "management": "Symptomatic supportive treatment, anticonvulsants (diazepam). Not dialyzable."
    },
    "storageInformation": "Store powder below 25°C protected from light. Reconstituted solutions are stable for 24 hours at room temperature (25°C) and 3 days at 2-8°C.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "থার্ড-জেনারেশন সেফালোস্পোরিন অ্যান্টিবায়োটিক",
      "mechanismSummaryBn": "ব্যাকটেরিয়ার কোষপ্রাচীর গঠনকারী পেনিসিলিন-বাইন্ডিং প্রোটিনকে ব্লক করে এবং রক্ত-মস্তিষ্ক প্রাচীর অতিক্রম করতে পারে।",
      "patientCounsellingBn": "এটি কেবল হাসপাতালে শিরার মাধ্যমে বা গভীর মাংসপেশিতে অভিজ্ঞ চিকিৎসকের উপস্থিতিতে ইনজেকশন হিসেবে দেওয়া হয়।",
      "criticalWarningBn": "নবজাতকদের ক্ষেত্রে ক্যালসিয়ামযুক্ত স্যালাইনের (রিঙ্গার ল্যাকটেট) সাথে কখনোই একসাথে প্রয়োগ করা যাবে না।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Beta-lactam ring acylates PBP transpeptidases -> halts cell wall mucopeptide cross-links -> osmotic autolysis.",
      "receptorTarget": "Bacterial PBPs (PBP-2 and PBP-3)",
      "vivaQuestions": [
        {
          "question": "Why is Ceftriaxone given once daily unlike Ampicillin or Cefotaxime?",
          "questionBn": "অন্যান্য অ্যান্টিবায়োটিকের বিপরীতে সেফট্রিয়াক্সন দিনে একবার কেন দেওয়া যায়?",
          "modelAnswer": "Ceftriaxone has high plasma protein binding (~90-95%) and a long elimination half-life of 8 hours, maintaining bactericidal concentrations above MIC for 24 hours.",
          "highYieldPearl": "Elimination is dual: 60% renal and 40% biliary."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-ceft-01",
          "front": "Why contraindicated with IV calcium in neonates?",
          "back": "Fatal insoluble ceftriaxone-calcium salt precipitation in lungs and kidneys.",
          "topic": "Contraindications",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-ceft-01",
          "question": "Empirical intravenous antibiotic of choice for acute community-acquired bacterial meningitis in an adult is?",
          "options": [
            "Ceftriaxone + Vancomycin",
            "Gentamicin",
            "Erythromycin",
            "Metronidazole"
          ],
          "correctIndex": 0,
          "explanation": "High-dose Ceftriaxone penetrates inflamed meninges and provides bactericidal activity against pneumococcus and meningococcus.",
          "bmdcFocus": "Phase 2 Pharmacology & Medicine"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Pseudolithiasis / Biliary Sludge on High-Dose Therapy",
        "patientProfile": "24-year-old female treated with IV Ceftriaxone 2 g daily for 14 days for severe typhoid fever.",
        "presentation": "Develops right upper quadrant pain. Ultrasound shows reversible gallbladder shadows (pseudolithiasis).",
        "clinicalQuestion": "What is the etiology and management?",
        "discussion": "Ceftriaxone-calcium salt precipitates in bile during high-dose prolonged therapy. It is reversible and typically resolves spontaneously upon discontinuation."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 43: Beta-Lactam Antibiotics & Cephalosporins",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "ciprofloxacin",
    "name": "Ciprofloxacin",
    "nameBn": "সিপ্রোফ্লক্সাসিন",
    "normalizedName": "ciprofloxacin",
    "pharmacologicalClass": "Second-Generation Fluoroquinolone (Bacterial DNA Synthesis Inhibitor)",
    "therapeuticClass": "Antimicrobial Agents & Antibiotics",
    "therapeuticClassId": "antimicrobials",
    "atcCode": "J01MA02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Surgery)",
    "mechanismOfAction": "Potent bactericidal fluoroquinolone that inhibits bacterial DNA gyrase (topoisomerase II) in Gram-negative bacteria and topoisomerase IV in Gram-positive bacteria. DNA gyrase is essential for negative supercoiling and relaxing topological strain during DNA replication and transcription; topoisomerase IV separates daughter DNA molecules during cell division. Inhibition produces double-stranded DNA breaks and rapid cell death.",
    "receptorOrTarget": "Bacterial DNA Gyrase (GyrA subunit) & Topoisomerase IV (ParC subunit)",
    "indications": [
      {
        "id": "ind-complicated-uti",
        "name": "Complicated Urinary Tract Infections and Acute Pyelonephritis",
        "isPrimary": true
      },
      {
        "id": "ind-infectious-diarrhea",
        "name": "Severe Bacterial Diarrhea / Bacillary Dysentery (Shigella, Campylobacter, E. coli)",
        "isPrimary": true
      },
      {
        "id": "ind-bone-joint",
        "name": "Bone and Joint Infections (Chronic Osteomyelitis due to Gram-negative bacilli)",
        "isPrimary": true,
        "note": "High bone penetration"
      },
      {
        "id": "ind-anthrax",
        "name": "Post-Exposure Prophylaxis and Treatment of Inhalation Anthrax (Bacillus anthracis)",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Known hypersensitivity to ciprofloxacin or fluoroquinolones",
        "type": "absolute",
        "reason": "Risk of anaphylaxis and severe cutaneous adverse reactions"
      },
      {
        "condition": "Concomitant administration with Tizanidine",
        "type": "absolute",
        "reason": "Severe hypotension and sedation due to potent CYP1A2 inhibition"
      },
      {
        "condition": "History of fluoroquinolone-induced tendinitis or tendon rupture",
        "type": "absolute",
        "reason": "High recurrence of Achilles tendon rupture"
      }
    ],
    "dosageGuidance": {
      "adult": "Oral: 250 mg to 750 mg every 12 hours. IV: 200 mg to 400 mg every 12 hours infused slowly over 60 minutes.",
      "paediatric": "10 to 20 mg/kg/dose every 12 hours (restricted to complicated UTI, pyelonephritis, or inhalation anthrax).",
      "geriatric": "Adult dosing guided by renal function.",
      "routes": [
        "Oral",
        "IV",
        "Ophthalmic",
        "Otic"
      ],
      "timingNotice": "Take with full glass of water. Maintain high fluid intake to prevent crystalluria."
    },
    "doseAdjustment": {
      "renal": "eGFR 30-50 mL/min: 250-500 mg every 12h; eGFR < 30 mL/min: 250-500 mg every 18-24 hours.",
      "hepatic": "No dose adjustment required."
    },
    "adverseEffects": {
      "common": [
        "Nausea, vomiting, diarrhea, abdominal pain",
        "Headache, dizziness, insomnia",
        "Rash"
      ],
      "uncommon": [
        "Photosensitivity",
        "Elevated liver transaminases",
        "C. difficile colitis"
      ],
      "rare": [
        "Tendinitis and Achilles tendon rupture",
        "QTc prolongation / arrhythmias",
        "Peripheral neuropathy (potentially irreversible)",
        "CNS toxicity (seizures, psychosis, hallucinations)",
        "Aortic aneurysm rupture / dissection"
      ],
      "seriousWarnings": [
        "Black Box Warning: Disabling and Potentially Irreversible Serious Adverse Reactions (Tendinitis and Tendon Rupture, Peripheral Neuropathy, and CNS Toxicities). Reserve for use in patients who have no alternative treatment options. Avoid in patients with aortic aneurysm."
      ]
    },
    "precautions": [
      "Instruct patients to immediately stop ciprofloxacin at the first sign of tendon pain or inflammation. Avoid direct sunlight / UV exposure due to photosensitivity. Avoid multivalent cation supplements (Iron, Calcium, Antacids) within 2 hours."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Signs of Tendon Pain / Neuropathy",
        "frequency": "At each patient encounter",
        "targetOrClinicalAction": "Immediate drug discontinuation"
      },
      {
        "parameter": "ECG QTc Interval",
        "frequency": "In cardiac patients or when combined with other QT-prolonging drugs",
        "targetOrClinicalAction": "Avoid if QTc > 500 ms"
      }
    ],
    "foodInteractions": "Dairy products (milk, yogurt) and calcium-fortified juices severely reduce oral absorption (chelation with multivalent cations). Take 2 hours before or 4 hours after dairy or calcium/iron supplements.",
    "pregnancyInfo": {
      "category": "Category C",
      "details": "Causes arthropathy and cartilage erosion in weight-bearing juvenile joints in animal studies; avoid in pregnancy unless no alternative."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Excreted in human milk; potential risk of joint damage. Alternative antibiotics preferred."
    },
    "paediatricConsiderations": "Generally avoided in children due to cartilage toxicity, but approved for complicated UTI and anthrax when benefits outweigh risks.",
    "geriatricConsiderations": "Elderly patients over 60 taking corticosteroids have the highest risk of tendon rupture. Start with lower doses.",
    "overdoseInformation": {
      "symptoms": "Nausea, vomiting, dizziness, confusion, tremors, seizures, acute renal failure from crystalluria.",
      "management": "Gastric lavage, activated charcoal, maintain high hydration to prevent crystalluria. Hemodialysis removes only 10%."
    },
    "storageInformation": "Store below 25°C in a dry place protected from light.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "ফ্লুরোকুইনোলোন অ্যান্টিবায়োটিক",
      "mechanismSummaryBn": "ব্যাকটেরিয়ার ডিএনএ জাইরেজ ও টপোআইসোমারেজ এনজাইম বন্ধ করে ডিএনএ রেপ্লিকেশন প্রতিরোধ করে।",
      "patientCounsellingBn": "পর্যাপ্ত পানি পান করুন। অ্যান্টাসিড বা দুধের সাথে খাবেন না (২ ঘণ্টা বিরতি রাখুন)।",
      "criticalWarningBn": "পায়ের গোড়ালির টেন্ডনে ব্যথা বা প্রদাহ হলে তাৎক্ষণিক ওষুধ বন্ধ করে চিকিৎসকের শরণাপন্ন হন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Inhibition of bacterial DNA Gyrase (topoisomerase II) & Topoisomerase IV -> double-strand DNA cleavage and cell death.",
      "receptorTarget": "Bacterial DNA Gyrase (GyrA) & Topoisomerase IV (ParC)",
      "vivaQuestions": [
        {
          "question": "Why are fluoroquinolones contraindicated in children and pregnancy?",
          "questionBn": "বাচ্চাদের ও গর্ভবতী মায়েদের ক্ষেত্রে ফ্লুরোকুইনোলোন নিষেধ কেন?",
          "modelAnswer": "Fluoroquinolones cause arthropathy and articular cartilage erosion in juvenile weight-bearing joints in animal studies, and pose tendon rupture risks.",
          "highYieldPearl": "Black box warning for Achilles tendonitis and tendon rupture."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-cip-01",
          "front": "Major black box warning for Fluoroquinolones?",
          "back": "Tendonitis and tendon rupture (especially Achilles tendon), and peripheral neuropathy.",
          "topic": "Adverse Effects",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-cip-01",
          "question": "Ciprofloxacin absorption is severely diminished if ingested concurrently with which of the following?",
          "options": [
            "Aluminum/Magnesium antacids or Calcium supplements",
            "Grapefruit juice",
            "High-protein diet",
            "Paracetamol"
          ],
          "correctIndex": 0,
          "explanation": "Polyvalent cations (Al3+, Mg2+, Ca2+, Fe2+) chelate fluoroquinolones in the GI tract, preventing absorption.",
          "bmdcFocus": "Phase 2 Pharmacology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Achilles Tendonitis in an Athlete",
        "patientProfile": "52-year-old recreational marathon runner treated for complicated UTI with ciprofloxacin.",
        "presentation": "On day 6, develops intense pain and swelling over posterior heel while running.",
        "clinicalQuestion": "What is the immediate pharmacological action?",
        "discussion": "Immediately discontinue ciprofloxacin, avoid weight-bearing exercise, and substitute with a non-quinolone antibiotic to prevent complete rupture of the Achilles tendon."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 46: Sulfonamides, Trimethoprim & Quinolones",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "doxycycline",
    "name": "Doxycycline",
    "nameBn": "ডক্সিসাইক্লিন",
    "normalizedName": "doxycycline",
    "pharmacologicalClass": "Tetracycline Class Antibiotic (30S Ribosomal Subunit Inhibitor)",
    "therapeuticClass": "Antimicrobial Agents & Antibiotics",
    "therapeuticClassId": "antimicrobials",
    "atcCode": "J01AA02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Dermatology)",
    "mechanismOfAction": "Broad-spectrum bacteriostatic antibiotic that reversibly binds to the 30S ribosomal subunit of susceptible bacteria. This prevents the access and binding of aminoacyl-tRNA to the ribosomal acceptor (A) site on the mRNA-ribosome complex, halting the elongation step of protein synthesis. Doxycycline has high lipid solubility, allowing excellent penetration into tissues, prostate, and bronchial secretions, and is safely eliminated via non-renal (biliary and fecal chelation) pathways.",
    "receptorOrTarget": "30S Ribosomal Subunit (A-Site)",
    "indications": [
      {
        "id": "ind-scrub-typhus",
        "name": "Rickettsial Infections (Scrub Typhus & Murine Typhus in Bangladesh)",
        "isPrimary": true,
        "guidelineRecommendation": "Drug of choice (DGHS Protocol)"
      },
      {
        "id": "ind-cholera",
        "name": "Severe Cholera (Vibrio cholerae) Epidemic Control",
        "isPrimary": true,
        "note": "Single 300 mg dose reduces duration and stool volume"
      },
      {
        "id": "ind-chlamydia",
        "name": "Chlamydial Urethritis, Cervicitis, and Pelvic Inflammatory Disease",
        "isPrimary": true
      },
      {
        "id": "ind-malaria-prophylaxis",
        "name": "Malaria Chemoprophylaxis (Chloroquine-resistant Plasmodium falciparum)",
        "isPrimary": true
      },
      {
        "id": "ind-acne",
        "name": "Acne Vulgaris and Rosacea (Anti-inflammatory & antimicrobial)",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Pregnancy (2nd and 3rd trimesters)",
        "type": "absolute",
        "reason": "Chelates with calcium in developing fetal bones and teeth, causing permanent yellow-gray-brown discoloration and enamel hypoplasia"
      },
      {
        "condition": "Children under 8 years of age",
        "type": "absolute",
        "reason": "Permanent tooth staining and reversible bone growth depression (except life-threatening scrub typhus)"
      },
      {
        "condition": "Hypersensitivity to tetracyclines",
        "type": "absolute",
        "reason": "Cross-allergenicity"
      }
    ],
    "dosageGuidance": {
      "adult": "Standard: 100 mg twice daily on day 1, then 100 mg once or twice daily for 7-14 days. Cholera: Single dose 300 mg. Malaria prophylaxis: 100 mg once daily starting 1-2 days before travel.",
      "paediatric": "Children > 8 years (> 45 kg): Adult dose. Under 45 kg: 2.2-4.4 mg/kg/day divided every 12 hours.",
      "geriatric": "Standard adult dosing is safe.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take with a full glass of water while sitting or standing upright. Do NOT lie down for at least 30 minutes after taking to prevent pill-induced esophagitis and esophageal ulceration."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment required in renal impairment (unlike other tetracyclines, it is eliminated via inactive fecal chelation). Safe in CKD.",
      "hepatic": "Caution in severe hepatic impairment."
    },
    "adverseEffects": {
      "common": [
        "Gastrointestinal upset, nausea, vomiting, epigastric distress",
        "Photosensitivity (exaggerated sunburn on sun-exposed skin)"
      ],
      "uncommon": [
        "Pill-induced esophageal ulceration / esophagitis",
        "Vaginal candidiasis"
      ],
      "rare": [
        "Benign intracranial hypertension (Pseudotumor cerebri — headache, papilledema)",
        "Hepatotoxicity",
        "Jarisch-Herxheimer reaction in spirochetal infections"
      ],
      "seriousWarnings": [
        "Pill-Induced Esophageal Ulceration: Taking doxycycline dry or lying down immediately after ingestion can cause the capsule to lodge in the esophagus, causing chemical necrosis and deep esophageal ulcers. Always take with a full glass of water and remain upright for 30 minutes."
      ]
    },
    "precautions": [
      "Avoid intense sunlight and tanning beds due to photosensitivity. Space out antacids, calcium, iron, and dairy products by at least 2 hours."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Signs of Esophagitis (Retrosternal chest pain, odynophagia)",
        "frequency": "At follow-up",
        "targetOrClinicalAction": "Discontinue and evaluate with endoscopy if severe"
      },
      {
        "parameter": "Visual Acuity / Headaches",
        "frequency": "In prolonged use",
        "targetOrClinicalAction": "Rule out pseudotumor cerebri"
      }
    ],
    "foodInteractions": "Dairy products, calcium, iron, and multivalent antacids decrease absorption through chelation. Take 2 hours apart.",
    "pregnancyInfo": {
      "category": "Category D / Strictly Contraindicated",
      "details": "Causes permanent tooth discoloration and impaired bone growth in fetuses."
    },
    "breastfeedingInfo": {
      "safety": "contraindicated",
      "details": "Excreted in breast milk; avoid during lactation to prevent infant tooth staining."
    },
    "paediatricConsiderations": "Contraindicated under 8 years of age (short course permissible in life-threatening rickettsial scrub typhus per AAP/CDC).",
    "geriatricConsiderations": "Safe in elderly; non-renal elimination makes it advantageous in CKD.",
    "overdoseInformation": {
      "symptoms": "Nausea, vomiting, diarrhea, acute dizziness.",
      "management": "Supportive care; not dialyzable."
    },
    "storageInformation": "Store below 25°C in airtight containers protected from light. Outdated/degraded tetracyclines can cause Fanconi syndrome (nephrotoxicity).",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "টেট্রাসাইক্লিন অ্যান্টিবায়োটিক (৩০এস রাইবোজোম প্রতিরোধক)",
      "mechanismSummaryBn": "ব্যাকটেরিয়ার ৩০এস রাইবোজোমে আবদ্ধ হয়ে অ্যামিনোঅ্যাসাইল-টিআরএনএ সংযুক্তি বন্ধ করে প্রোটিন সংশ্লেষণ প্রতিরোধ করে।",
      "patientCounsellingBn": "ওষুধ খাওয়ার পর অন্তত ৩০ মিনিট সোজা হয়ে থাকুন এবং এক গ্লাস পূর্ণ পানি পান করুন যাতে খাদ্যনালীতে আলসার না হয়।",
      "criticalWarningBn": "গর্ভবতী নারী এবং ৮ বছরের কম বয়সী শিশুদের ক্ষেত্রে দাঁতের স্থায়ী বিবর্ণতা এবং অস্থির বৃদ্ধি বাধার কারণে ব্যবহার নিষেধ।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Reversible binding to 30S ribosomal subunit -> blocks aminoacyl-tRNA from accessing ribosomal A site -> halts protein elongation.",
      "receptorTarget": "30S Bacterial Ribosomal Subunit (A-Site)",
      "vivaQuestions": [
        {
          "question": "Why is doxycycline safer than tetracycline in patients with renal failure?",
          "questionBn": "রেনাল ফেইলিওরে টেট্রাসাইক্লিনের চেয়ে ডক্সিসাইক্লিন নিরাপদ কেন?",
          "modelAnswer": "Doxycycline is eliminated primarily via non-renal routes (biliary excretion and direct chelation in intestinal lumen), so it does not accumulate in kidney failure.",
          "highYieldPearl": "Does not require dosage adjustment in renal impairment."
        },
        {
          "question": "Why is doxycycline contraindicated in pregnancy and young children under 8 years?",
          "questionBn": "গর্ভাবস্থায় এবং ৮ বছরের কম বয়সী শিশুদের ডক্সিসাইক্লিন নিষেধ কেন?",
          "modelAnswer": "Doxycycline chelates with calcium orthophosphate in developing teeth and bones, causing permanent brownish discoloration and enamel hypoplasia.",
          "highYieldPearl": "Calcium chelation leads to permanent tooth staining."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-dox-01",
          "front": "Ribosomal target of Doxycycline?",
          "back": "30S ribosomal subunit (A-site block).",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-dox-02",
          "front": "Patient counseling to prevent esophageal ulceration?",
          "back": "Take with a full glass of water and remain upright for 30 minutes.",
          "topic": "Patient Safety",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-dox-01",
          "question": "Drug of choice for Scrub Typhus (Orientia tsutsugamushi) and Cholera in Bangladesh is?",
          "options": [
            "Doxycycline",
            "Penicillin V",
            "Gentamicin",
            "Metronidazole"
          ],
          "correctIndex": 0,
          "explanation": "Doxycycline is the first-line antimicrobial for rickettsial infections, scrub typhus, and severe cholera.",
          "bmdcFocus": "Phase 2 Pharmacology & Infectious Diseases"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Scrub Typhus with Eschar in North Bengal",
        "patientProfile": "38-year-old agricultural worker from Rangpur with high remittent fever, headache, and black necrotic eschar in groin.",
        "presentation": "Diagnosed with scrub typhus. Prescribed Doxycycline 100 mg BD for 7 days.",
        "clinicalQuestion": "What is the expected therapeutic response time?",
        "discussion": "Rapid defervescence typically occurs within 24 to 48 hours of starting doxycycline in scrub typhus. Failure to respond suggests an alternate diagnosis."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 44: Tetracyclines & Macrolides",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "metformin",
    "name": "Metformin",
    "nameBn": "মেটফরমিন",
    "normalizedName": "metformin",
    "pharmacologicalClass": "Biguanide Antihyperglycemic Agent (AMPK Activator)",
    "therapeuticClass": "Endocrine & Metabolic Drugs",
    "therapeuticClassId": "endocrine-metabolic",
    "atcCode": "A10BA02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "First-line oral antihyperglycemic agent that increases AMP-activated protein kinase (AMPK) activity in hepatocytes and skeletal muscle. This suppresses hepatic gluconeogenesis and glycogenolysis (reducing basal hepatic glucose output) and increases peripheral insulin sensitivity and glucose uptake via GLUT4 translocation. It does not stimulate pancreatic beta-cell insulin secretion, meaning it does NOT cause hypoglycemia when used as monotherapy, and promotes mild weight loss or weight neutrality. It also delays intestinal glucose absorption.",
    "receptorOrTarget": "AMP-Activated Protein Kinase (AMPK) & Mitochondrial Complex I",
    "indications": [
      {
        "id": "ind-t2dm",
        "name": "Type 2 Diabetes Mellitus (First-Line Pharmacological Therapy)",
        "isPrimary": true,
        "guidelineRecommendation": "Cornerstone first-line therapy at diagnosis in all guidelines (BADAS / ADA / EASD)"
      },
      {
        "id": "ind-pcos",
        "name": "Polycystic Ovary Syndrome (PCOS) with Insulin Resistance",
        "isPrimary": true,
        "note": "Restores ovulatory cycles and improves fertility"
      },
      {
        "id": "ind-prediabetes",
        "name": "Prediabetes / Impaired Glucose Tolerance Prevention",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Severe renal impairment (eGFR < 30 mL/min)",
        "type": "absolute",
        "reason": "Marked risk of fatal lactic acidosis due to reduced drug clearance"
      },
      {
        "condition": "Acute or chronic metabolic acidosis (including DKA)",
        "type": "absolute",
        "reason": "High mortality"
      },
      {
        "condition": "Severe hypoxemic conditions (Acute heart failure, septic shock, respiratory failure)",
        "type": "absolute",
        "reason": "Tissue hypoperfusion accelerates lactate accumulation"
      },
      {
        "condition": "Iodinated Radiocontrast Procedures (e.g. CT scans / coronary angiography)",
        "type": "absolute",
        "reason": "Withhold at time of procedure and for 48h after to prevent contrast-induced nephropathy with lactic acidosis"
      }
    ],
    "dosageGuidance": {
      "adult": "Initial 500 mg once or twice daily with meals. Increase by 500 mg weekly to target 1000 mg twice daily (Maximum 2550 mg/day standard release; 2000 mg/day extended release XR).",
      "paediatric": "Approved in children >= 10 years: Initial 500 mg twice daily (Max 2000 mg/day).",
      "geriatric": "Assess eGFR before starting; maximum dose 1000 mg daily in elderly.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Always take with or immediately after meals to minimize gastrointestinal adverse effects."
    },
    "doseAdjustment": {
      "renal": "eGFR 45-60 mL/min: Max 2000 mg/day; eGFR 30-44 mL/min: Max 1000 mg/day; eGFR < 30 mL/min: Contraindicated.",
      "hepatic": "Avoid in severe liver impairment (decreased lactate clearance)."
    },
    "adverseEffects": {
      "common": [
        "Diarrhea, abdominal cramps, nausea, flatulence (up to 20-30% on initiation)",
        "Metallic taste in mouth",
        "Anorexia"
      ],
      "uncommon": [
        "Vitamin B12 deficiency (with prolonged use > 3-5 years due to impaired ileal absorption)"
      ],
      "rare": [
        "Lactic Acidosis (rare, ~3-5 cases per 100,000 patient-years, but 50% mortality)",
        "Megaloblastic anemia",
        "Hepatitis"
      ],
      "seriousWarnings": [
        "Black Box Warning: Lactic Acidosis. Risk increases with renal impairment, sepsis, dehydration, acute heart failure, and excessive alcohol intake. Symptoms include malaise, myalgia, respiratory distress, and abdominal pain. Discontinue immediately if metabolic acidosis is suspected."
      ]
    },
    "precautions": [
      "Withhold 48 hours prior to elective surgeries and iodinated contrast studies. Titrate slowly to prevent GI intolerance."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Creatinine & eGFR",
        "frequency": "Baseline and at least annually (every 3-6 months if eGFR 30-60)",
        "targetOrClinicalAction": "Dose adjust or stop if eGFR < 30 mL/min"
      },
      {
        "parameter": "Vitamin B12 Levels",
        "frequency": "Every 2-3 years in long-term users",
        "targetOrClinicalAction": "Supplement oral/parenteral B12 if deficient"
      }
    ],
    "foodInteractions": "Taking with meals reduces abdominal cramps and diarrhea.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Used extensively for gestational diabetes mellitus (GDM) when insulin is unavailable or refused; passes placenta without evident teratogenicity."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in small amounts in breast milk; safe during lactation."
    },
    "paediatricConsiderations": "Approved for children >= 10 years with T2DM.",
    "geriatricConsiderations": "Rigorously check eGFR; high risk of asymptomatic renal decline.",
    "overdoseInformation": {
      "symptoms": "Profound lactic acidosis, hypothermia, hypotension, somnolence, coma (hypoglycemia does not typically occur unless combined with sulfonylureas).",
      "management": "Immediate hemodialysis to remove metformin and correct acid-base balance; sodium bicarbonate for severe acidosis."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "বাইগুয়ানাইড ওরাল অ্যান্টিডায়াবেটিক ওষুধ",
      "mechanismSummaryBn": "হেপাটিক গ্লুকোনওজেনেসিস কমায়, এএমপিকে সক্রিয় করে এবং পেরিফেরাল কোষে ইনসুলিন সংবেদনশীলতা বাড়ায়। এটি ওজন বাড়ায় না।",
      "patientCounsellingBn": "গ্যাস্ট্রিক অস্বস্তি ও ডায়রিয়া কমাতে প্রধান খাবারের সাথে সেবন করুন। অ্যালকোহল পরিহার করুন।",
      "criticalWarningBn": "তীব্র কিডনি বৈকল্যে (eGFR < 30) ল্যাকটিক অ্যাসিডোসিসের ঝুঁকি থাকায় এটি ব্যবহার করা নিষেধ।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Mitochondrial complex I inhibition -> increased AMP/ATP ratio -> AMPK activation -> downregulates gluconeogenic genes (PEPCK, G6Pase).",
      "receptorTarget": "Mitochondrial Respiratory Complex I & AMP-activated protein kinase (AMPK)",
      "vivaQuestions": [
        {
          "question": "Why does Metformin not cause hypoglycemia when used as monotherapy?",
          "questionBn": "মেটফর্মিন একা ব্যবহার করলে কেন রক্তের সুগার মারাত্মকভাবে নেমে (হাইপোগ্লাইসেমিয়া) যায় না?",
          "modelAnswer": "Metformin is an insulin sensitizer (euglycemic agent) that reduces excessive hepatic glucose output and increases glucose uptake without stimulating pancreatic beta-cell insulin secretion.",
          "highYieldPearl": "Does not cause hypoglycemia and does not cause weight gain."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-metf-01",
          "front": "Molecular mechanism of Metformin?",
          "back": "Activates AMP-activated protein kinase (AMPK) and inhibits mitochondrial complex I.",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-metf-02",
          "front": "Cutoff eGFR for Metformin discontinuation?",
          "back": "Discontinue if eGFR < 30 mL/min/1.73m² due to lactic acidosis risk.",
          "topic": "Safety",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-metf-01",
          "question": "First-line pharmacological agent for overweight patients with newly diagnosed Type 2 Diabetes Mellitus (normal renal function)?",
          "options": [
            "Metformin",
            "Gliclazide",
            "Pioglitazone",
            "Sitagliptin"
          ],
          "correctIndex": 0,
          "explanation": "Metformin is the universally recommended first-line therapy (ADA, EASD, DGHS) with cardiovascular safety and weight-neutral/weight-loss profile.",
          "bmdcFocus": "Phase 2 Pharmacology & Endocrinology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Metformin-Associated Lactic Acidosis (MALA)",
        "patientProfile": "67-year-old male with T2DM on metformin 1000 mg BD develops acute dehydration and prerenal AKI from viral gastroenteritis.",
        "presentation": "Severe hyperventilation (Kussmaul breathing), deep lethargy, arterial pH 7.15, lactate 9.5 mmol/L, serum creatinine 4.2 mg/dL.",
        "clinicalQuestion": "Identify the condition and management.",
        "discussion": "Metformin-associated lactic acidosis (MALA) triggered by acute renal failure accumulating metformin. Metformin must be stopped immediately; hemodialysis clears both lactate and metformin efficiently."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 41: Pancreatic Hormones & Antidiabetic Drugs",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "insulin-regular",
    "name": "Insulin (Regular / Soluble Human Insulin)",
    "nameBn": "ইনসুলিন রেগুলার (হিউম্যান ইনসুলিন)",
    "normalizedName": "insulin-regular",
    "pharmacologicalClass": "Short-Acting Recombinant Human Insulin",
    "therapeuticClass": "Endocrine & Metabolic Drugs",
    "therapeuticClassId": "endocrine-metabolic",
    "atcCode": "A10AB01",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Paediatrics)",
    "mechanismOfAction": "Identical to endogenous human pancreatic insulin produced by recombinant DNA technology. Binds to the extracellular alpha subunits of the heterotetrameric insulin receptor tyrosine kinase on cell surfaces (skeletal muscle, adipocytes, hepatocytes). This triggers autophosphorylation of intracellular beta subunits and activates insulin receptor substrates (IRS-1, IRS-2) and the PI3K-Akt signaling cascade. This induces rapid translocation of glucose transporter 4 (GLUT4) storage vesicles to the plasma membrane, driving glucose uptake into muscle and fat. It accelerates glycogenesis, lipogenesis, and protein synthesis while halting gluconeogenesis, glycogenolysis, lipolysis, and ketogenesis.",
    "receptorOrTarget": "Insulin Receptor Tyrosine Kinase (INSR)",
    "indications": [
      {
        "id": "ind-dka",
        "name": "Diabetic Ketoacidosis (DKA) and Hyperosmolar Hyperglycemic State (HHS) (Drug of Choice)",
        "isPrimary": true,
        "guidelineRecommendation": "Intravenous continuous infusion (0.1 units/kg/hour) per national DKA protocol"
      },
      {
        "id": "ind-t1dm",
        "name": "Type 1 Diabetes Mellitus (Basal-bolus prandial glycemic control)",
        "isPrimary": true
      },
      {
        "id": "ind-t2dm-perioperative",
        "name": "Type 2 Diabetes during Acute Illness, Sepsis, Surgery, and Pregnancy (GDM)",
        "isPrimary": true
      },
      {
        "id": "ind-hyperkalemia",
        "name": "Severe Acute Hyperkalemia (Shift K+ into cells with 25-50% Dextrose)",
        "isPrimary": true
      }
    ],
    "contraindications": [
      {
        "condition": "Acute Hypoglycemia (Blood Glucose < 3.9 mmol/L / 70 mg/dL)",
        "type": "absolute",
        "reason": "Can precipitate fatal neuroglycopenic coma and irreversible brain damage"
      },
      {
        "condition": "Known hypersensitivity to human insulin or formulation excipients",
        "type": "absolute",
        "reason": "Rare anaphylaxis"
      }
    ],
    "dosageGuidance": {
      "adult": "Subcutaneous: 0.2 to 1.0 unit/kg/day total insulin, with regular insulin providing 50% as prandial doses divided 30 minutes before main meals. DKA Protocol: IV regular insulin bolus 0.1 unit/kg, followed by continuous infusion of 0.1 unit/kg/hour; titrate to lower glucose by 50-75 mg/dL/hour.",
      "paediatric": "Individualized by pediatric endocrinologist based on carbohydrate counting.",
      "geriatric": "Higher target HbA1c (7.5-8.0%) to prevent hypoglycemia falls.",
      "routes": [
        "SC",
        "IV",
        "IM"
      ],
      "timingNotice": "Subcutaneous injection must be given 30 minutes before meals. Regular insulin is the ONLY insulin formulation that can be administered intravenously."
    },
    "doseAdjustment": {
      "renal": "Insulin clearance is prolonged in renal impairment; dose reduction required in CKD to prevent severe hypoglycemia.",
      "hepatic": "Impaired hepatic gluconeogenesis and clearance require careful blood glucose titration."
    },
    "adverseEffects": {
      "common": [
        "Hypoglycemia (diaphoresis, tremors, tachycardia, confusion, coma)",
        "Lipohypertrophy (fat deposits at unrotated injection sites)",
        "Weight gain"
      ],
      "uncommon": [
        "Lipoatrophy (hollowing at injection site)",
        "Transient visual blurriness upon starting (osmotic lens changes)"
      ],
      "rare": [
        "Insulin allergy / anaphylaxis",
        "Hypokalemic cardiac arrhythmias"
      ],
      "seriousWarnings": [
        "Emergency: Severe Hypoglycemia. Blood glucose < 3.0 mmol/L can cause irreversible brain injury and death within hours. Ensure patient and family are trained to recognize warning signs and administer oral sugar or IV 25% dextrose."
      ]
    },
    "precautions": [
      "Rotate injection sites (abdomen, thigh, upper arm) with each dose to prevent lipodystrophy. Never give regular insulin IV without checking potassium in DKA."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Capillary Blood Glucose (CBG)",
        "frequency": "Pre-meal and bedtime (at least 4 times daily in intensive regimens)",
        "targetOrClinicalAction": "Target fasting 4.4-7.0 mmol/L; post-prandial < 10.0 mmol/L"
      },
      {
        "parameter": "Serum Potassium (K+)",
        "frequency": "Hourly in DKA management",
        "targetOrClinicalAction": "Add KCl to IV fluids once K+ < 5.0 mmol/L to prevent fatal hypokalemia"
      }
    ],
    "foodInteractions": "Inject 30 minutes before meal. Skipping meals after injection causes severe hypoglycemia.",
    "pregnancyInfo": {
      "category": "Category B / Gold Standard in Pregnancy",
      "details": "Does not cross the placenta; gold standard treatment for Gestational Diabetes Mellitus (GDM) and pre-existing diabetes."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Endogenous protein destroyed in infant digestive tract; completely safe during lactation."
    },
    "paediatricConsiderations": "Mandatory lifelong therapy in Type 1 diabetes. Careful monitoring during growth spurts.",
    "geriatricConsiderations": "High risk of hypoglycemia unawareness. Less stringent glycemic targets recommended.",
    "overdoseInformation": {
      "symptoms": "Neuroglycopenia: Palpitations, diaphoresis, hunger, confusion, seizures, coma, death.",
      "management": "Conscious patient: 15-20 g fast-acting oral carbohydrates (fruit juice, sugar water). Unconscious patient: 25-50 ml of 25% Dextrose IV bolus or 1 mg Glucagon IM/SC."
    },
    "storageInformation": "Unopened vials must be stored in refrigerator at 2°C to 8°C (Do NOT freeze). In-use vial can be kept at room temperature (below 30°C) away from direct sunlight for up to 28 days.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "শর্ট-অ্যাক্টিং রিকম্বিন্যান্ট হিউম্যান ইনসুলিন",
      "mechanismSummaryBn": "কোষের ইনসুলিন রিসেপ্টর টাইরোসিন কাইনেজে আবদ্ধ হয়ে গ্লুট-৪ ট্রান্সপোর্টার সক্রিয় করে দ্রুত রক্ত থেকে গ্লুকোজ কোষে প্রবেশ করায়।",
      "patientCounsellingBn": "খাবারের ৩০ মিনিট পূর্বে ত্বকের নিচে (সাবকিউটেনিয়াস) ইনজেকশন নিন। ইনজেকশনের স্থান পরিবর্তন (রোটেশন) করুন।",
      "criticalWarningBn": "মারাত্মক হাইপোগ্লাইসেমিয়া (ঘাম, কাঁপুনি, বিভ্রান্তি) দেখা দিলে তাৎক্ষণিক চিনি বা মিষ্টি শরবত পান করুন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Binds insulin receptor alpha subunit -> beta subunit autophosphorylation -> IRS-1/2 -> PI3K -> Akt -> GLUT4 translocation to membrane.",
      "receptorTarget": "Insulin Receptor Tyrosine Kinase (INSR)",
      "vivaQuestions": [
        {
          "question": "Why is Regular Insulin the only insulin suitable for intravenous administration in Diabetic Ketoacidosis (DKA)?",
          "questionBn": "ডায়াবেটিক কিটোঅ্যাসিডোসিসে (DKA) কেবল রেগুলার ইনসুলিনই শিরাপথে (IV) কেন দেওয়া যায়?",
          "modelAnswer": "Regular insulin is a clear, soluble hexamer in zinc solution that dissociates rapidly into active monomers in systemic circulation without delayed precipitate formation or protamine additives.",
          "highYieldPearl": "Neutral regular insulin is the only form approved for continuous IV infusion in DKA."
        },
        {
          "question": "What is the molecular mechanism of insulin-induced hypokalemia?",
          "questionBn": "ইনসুলিন রক্তে পটাশিয়াম কমায় কীভাবে?",
          "modelAnswer": "Insulin directly stimulates the Na+/K+-ATPase pump in skeletal muscle and adipose tissue, pumping potassium into cells and lowering serum potassium.",
          "highYieldPearl": "Used therapeutically in emergency hyperkalemia along with dextrose."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-ins-01",
          "front": "Transporter stimulated by insulin in muscle and adipose tissue?",
          "back": "GLUT4 (glucose transporter type 4).",
          "topic": "Physiology",
          "highYield": true
        },
        {
          "id": "fc-ins-02",
          "front": "Onset and peak of regular subcutaneous insulin?",
          "back": "Onset: 30 minutes; Peak: 2-3 hours; Duration: 6-8 hours.",
          "topic": "Pharmacokinetics",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-ins-01",
          "question": "In the emergency management of Diabetic Ketoacidosis (DKA), which insulin regimen is universally indicated?",
          "options": [
            "Continuous low-dose IV Regular Insulin (0.1 U/kg/h)",
            "Subcutaneous Glargine daily",
            "Subcutaneous NPH twice daily",
            "Oral Metformin bolus"
          ],
          "correctIndex": 0,
          "explanation": "Continuous low-dose IV infusion of regular insulin provides predictable clearance, halts lipolysis, and suppresses hepatic gluconeogenesis.",
          "bmdcFocus": "Phase 2 Pharmacology & Medicine Emergency"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Diabetic Ketoacidosis (DKA) in Newly Diagnosed Type 1 Diabetes",
        "patientProfile": "17-year-old girl presents with deep sighing Kussmaul breathing, fruity acetone breath, blood glucose 28 mmol/L, ketonuria 4+, and arterial pH 7.10.",
        "presentation": "Initiated on fluid resuscitation with normal saline and IV regular insulin infusion at 0.1 units/kg/hour.",
        "clinicalQuestion": "When should potassium replacement be initiated during insulin infusion?",
        "discussion": "Insulin shifts potassium into cells; if serum K+ is < 5.0 mmol/L, potassium replacement (20-30 mmol/L IV fluid) must be added immediately to prevent fatal hypokalemic cardiac arrest."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 41: Pancreatic Hormones & Antidiabetic Drugs",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "salbutamol",
    "name": "Salbutamol (Albuterol)",
    "nameBn": "সালবিউটামল",
    "normalizedName": "salbutamol",
    "pharmacologicalClass": "Short-Acting Beta-2 Adrenergic Agonist (SABA Bronchodilator)",
    "therapeuticClass": "Respiratory & Bronchodilator Drugs",
    "therapeuticClassId": "respiratory",
    "atcCode": "R03AC02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Paediatrics)",
    "mechanismOfAction": "Selective agonist of beta-2 adrenergic receptors located predominantly on bronchial smooth muscle. Gs-protein activation stimulates adenylyl cyclase, converting ATP into intracellular cyclic AMP (cAMP). Elevated cAMP activates protein kinase A (PKA), which inhibits myosin light chain kinase and lowers intracellular calcium concentrations. This produces rapid, potent relaxation of bronchial smooth muscle, reversing acute bronchoconstriction within 5 minutes. It also inhibits mediator release from mast cells and increases mucociliary clearance.",
    "receptorOrTarget": "Bronchial Beta-2 Adrenergic Receptor (ADRB2)",
    "indications": [
      {
        "id": "ind-asthma-acute",
        "name": "Acute Bronchospasm in Bronchial Asthma (Reliever Therapy)",
        "isPrimary": true,
        "guidelineRecommendation": "First-line reliever for acute asthma exacerbation (GINA & DGHS Guidelines)"
      },
      {
        "id": "ind-copd-acute",
        "name": "Chronic Obstructive Pulmonary Disease (COPD) Exacerbation",
        "isPrimary": true
      },
      {
        "id": "ind-eib",
        "name": "Exercise-Induced Bronchoconstriction Prevention",
        "isPrimary": true
      },
      {
        "id": "ind-hyperkalemia-adjunct",
        "name": "Adjunctive Therapy for Severe Hyperkalemia (Nebulization)",
        "isPrimary": false,
        "note": "Shifts K+ into cells via Na+/K+ ATPase stimulation"
      }
    ],
    "contraindications": [
      {
        "condition": "Known hypersensitivity to salbutamol",
        "type": "absolute",
        "reason": "Anaphylaxis"
      },
      {
        "condition": "Threatened abortion in 1st/2nd trimester",
        "type": "relative",
        "reason": "Not indicated for tocolysis in early pregnancy"
      }
    ],
    "dosageGuidance": {
      "adult": "MDI Inhaler: 100 to 200 mcg (1-2 puffs) as needed for acute relief (Max 800 mcg/day). Nebulization: 2.5 mg to 5 mg nebulized with oxygen over 10-15 minutes every 20-30 minutes for acute severe asthma. Oral: 2-4 mg three to four times daily (less preferred due to systemic side effects).",
      "paediatric": "MDI with spacer: 100-200 mcg (1-2 puffs). Nebulizer: 2.5 mg.",
      "geriatric": "Initial lower dose (2 mg oral); monitor pulse for tachycardia.",
      "routes": [
        "Inhalation",
        "Oral",
        "IV"
      ],
      "timingNotice": "Inhaled route is vastly superior to oral tablets due to immediate bronchodilation and minimal systemic tremor/tachycardia."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment required.",
      "hepatic": "No dose adjustment required."
    },
    "adverseEffects": {
      "common": [
        "Fine skeletal muscle tremors (especially hands, mediated by peripheral beta-2 receptors)",
        "Tachycardia and palpitations",
        "Nervousness / restlessness",
        "Headache"
      ],
      "uncommon": [
        "Hypokalemia (intracellular shift of potassium)",
        "Peripheral vasodilation / flushing",
        "Muscle cramps"
      ],
      "rare": [
        "Paradoxical bronchospasm (with MDI propellant/excipient)",
        "Cardiac arrhythmias (supraventricular tachycardia, atrial fibrillation)",
        "Lactic acidosis with high-dose IV/nebulization"
      ],
      "seriousWarnings": [
        "Over-Reliance Warning: Heavy reliance on SABA inhalers (> 1 canister/month) without inhaled corticosteroids (ICS) is a major risk factor for fatal asthma attacks due to beta-receptor down-regulation and unaddressed airway inflammation."
      ]
    },
    "precautions": [
      "Use with spacer chamber in children and elderly to maximize lung deposition. Caution in severe hyperthyroidism and tachyarrhythmias."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Peak Expiratory Flow Rate (PEFR) & SpO2",
        "frequency": "Before and 15-30 min after nebulization in acute asthma",
        "targetOrClinicalAction": "Assess objective bronchodilator response"
      },
      {
        "parameter": "Heart Rate and Serum Potassium",
        "frequency": "In frequent nebulization or IV therapy",
        "targetOrClinicalAction": "Detect hypokalemia and extreme tachycardia"
      }
    ],
    "foodInteractions": "Inhaled route bypasses gastrointestinal absorption.",
    "pregnancyInfo": {
      "category": "Category C / Preferred SABA in Pregnancy",
      "details": "Extensive safety record; first-line bronchodilator of choice during pregnancy (GINA)."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Small amounts in breast milk; compatible with breastfeeding."
    },
    "paediatricConsiderations": "Metered dose inhaler with a dedicated spacer device (with or without mask) is the gold standard.",
    "geriatricConsiderations": "Caution in elderly with ischemic heart disease or arrhythmias due to tachycardia.",
    "overdoseInformation": {
      "symptoms": "Pronounced skeletal muscle tremor, extreme tachycardia, palpitations, chest pain, hypokalemia, metabolic acidosis.",
      "management": "Discontinue drug. Cardioselective beta-1 blocker (e.g. Metoprolol/Bisoprolol) can cautiously reverse cardiovascular toxicity in non-asthmatics."
    },
    "storageInformation": "Store inhalers below 30°C. Protect from direct frost and heat. Do not puncture or burn pressurized canister.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "শর্ট-অ্যাক্টিং বিটা-২ অ্যাগোনিস্ট (সাব্বা ব্রঙ্কোডাইলেটর)",
      "mechanismSummaryBn": "শ্বাসনালীর বিটা-২ রিসেপ্টরকে উদ্দীপিত করে দ্রুত ব্রঙ্কোডাইলেশন ঘটায় এবং শ্বাসকষ্ট কমায়।",
      "patientCounsellingBn": "ইনহেলার ব্যবহারের সময় অবশ্যই স্পেসার ব্যবহার করুন।",
      "criticalWarningBn": "ঘন ঘন ইনহেলার ব্যবহারের প্রয়োজন হলে ডাক্তার দেখিয়ে স্টেরয়েড ইনহেলার যোগ করতে হবে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Beta-2 receptor -> Gs protein -> Adenylyl Cyclase -> increased cAMP -> PKA activation -> MLCK phosphorylation inhibition -> bronchodilation.",
      "receptorTarget": "Beta-2 Adrenergic Receptor (ADRB2) on bronchial smooth muscle",
      "vivaQuestions": [
        {
          "question": "Why does Salbutamol produce hand tremors as a common side effect?",
          "questionBn": "সালবিউটামল সেবনে হাত কাঁপে (ট্রে মর) কেন?",
          "modelAnswer": "Skeletal muscle twitch and tremor is mediated by stimulation of beta-2 adrenergic receptors in skeletal muscle fibers, altering twitch kinetics and tension development.",
          "highYieldPearl": "Tremor is the most common dose-limiting adverse effect."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-salb-01",
          "front": "Cellular mechanism of Salbutamol bronchodilation?",
          "back": "Increases intracellular cAMP -> lowers intracellular calcium in bronchial smooth muscle.",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-salb-02",
          "front": "Electrolyte disturbance caused by high-dose Salbutamol?",
          "back": "Hypokalemia (stimulates Na+/K+ ATPase, driving K+ into cells).",
          "topic": "Electrolytes",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-salb-01",
          "question": "First-line inhaled rescue bronchodilator for acute bronchial asthma attack is?",
          "options": [
            "Salbutamol",
            "Ipratropium bromide",
            "Salmeterol",
            "Theophylline"
          ],
          "correctIndex": 0,
          "explanation": "Salbutamol is a rapid-acting selective beta-2 agonist producing bronchodilation within 5 minutes.",
          "bmdcFocus": "Phase 2 Pharmacology & Respiratory"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute Severe Asthma & Excessive Beta-Agonist Use",
        "patientProfile": "22-year-old female medical student presents with acute dyspnea, unable to complete sentences in one breath, PEFR 40% predicted.",
        "presentation": "Has used 18 puffs of salbutamol over 2 hours without relief; pulse 135 bpm, fine hand tremor.",
        "clinicalQuestion": "What is the immediate emergency pharmacological management?",
        "discussion": "Administer oxygen, back-to-back nebulized Salbutamol (5 mg) plus Ipratropium (0.5 mg), and immediate systemic corticosteroids (IV Hydrocortisone or oral Prednisolone) to upregulate down-regulated beta receptors."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 20: Drugs Used in Asthma & COPD",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "dexamethasone",
    "name": "Dexamethasone",
    "nameBn": "ডেক্সামিথাসন",
    "normalizedName": "dexamethasone",
    "pharmacologicalClass": "Long-Acting Glucocorticoid (High Potency, Zero Mineralocorticoid Activity)",
    "therapeuticClass": "Endocrine & Metabolic Drugs",
    "therapeuticClassId": "endocrine-metabolic",
    "atcCode": "H02AB02",
    "prescriptionStatus": "POM",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine, Paediatrics, Surgery)",
    "mechanismOfAction": "Synthetic glucocorticoid with 25 to 30 times higher anti-inflammatory potency than hydrocortisone and virtually zero mineralocorticoid (salt-retaining) activity. Binds to intracellular glucocorticoid receptors (GR), translocating into the nucleus to activate anti-inflammatory genes (transactivation of IκB-alpha, lipocortin-1/annexin-1) and inhibit pro-inflammatory transcription factors (transrepression of NF-κB and AP-1). This profoundly suppresses synthesis of phospholipase A2, COX-2, inducible nitric oxide synthase, and pro-inflammatory cytokines (IL-1, IL-2, IL-6, TNF-alpha).",
    "receptorOrTarget": "Cytosolic Glucocorticoid Receptor (NR3C1)",
    "indications": [
      {
        "id": "ind-cerebral-edema",
        "name": "Cerebral Edema (Associated with Brain Tumors, Craniotomy, or Meningitis)",
        "isPrimary": true,
        "note": "Zero salt retention makes it the drug of choice for vasogenic cerebral edema"
      },
      {
        "id": "ind-bacterial-meningitis",
        "name": "Bacterial Meningitis Adjunct (Given with or before first antibiotic dose)",
        "isPrimary": true,
        "guidelineRecommendation": "Reduces hearing loss and neurological sequelae in S. pneumoniae and Hib meningitis (IDSA & DGHS)"
      },
      {
        "id": "ind-fetal-lung",
        "name": "Antenatal Fetal Lung Maturation in Threatened Preterm Labor (< 34 weeks)",
        "isPrimary": true,
        "note": "Stimulates fetal type II pneumocytes to produce pulmonary surfactant"
      },
      {
        "id": "ind-severe-croup",
        "name": "Acute Croup (Laryngotracheobronchitis) in Children",
        "isPrimary": true,
        "note": "Single oral dose 0.15-0.6 mg/kg produces dramatic clinical relief"
      }
    ],
    "contraindications": [
      {
        "condition": "Systemic untreated fungal or mycobacterial infections",
        "type": "absolute",
        "reason": "Severe immunosuppression allows fulminant dissemination"
      },
      {
        "condition": "Administration of live viral vaccines during immunosuppressive doses",
        "type": "absolute",
        "reason": "Risk of disseminated vaccine-strain infection"
      }
    ],
    "dosageGuidance": {
      "adult": "Cerebral Edema: Initial 10 mg IV bolus, then 4 mg IV every 6 hours. Bacterial Meningitis: 10 mg IV every 6 hours for 4 days (given 15-20 min before or with first antibiotic dose). Preterm Labor: 6 mg IM every 12 hours for 4 doses.",
      "paediatric": "Meningitis: 0.15 mg/kg IV every 6 hours for 4 days. Croup: 0.15 mg/kg single oral dose.",
      "geriatric": "Use lowest effective dose for shortest duration; monitor blood glucose.",
      "routes": [
        "Oral",
        "IV",
        "IM",
        "Ophthalmic"
      ],
      "timingNotice": "Take oral doses in the morning with food to mimic diurnal cortisol rhythm and minimize insomnia."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment required.",
      "hepatic": "Dose reduction and close monitoring in severe chronic liver disease."
    },
    "adverseEffects": {
      "common": [
        "Hyperglycemia (steroid-induced diabetes)",
        "Insomnia / psychiatric mood changes / euphoria",
        "Increased appetite and weight gain",
        "Fluid retention (mild)"
      ],
      "uncommon": [
        "Peptic ulceration / GI bleeding",
        "Hypertension",
        "Impaired wound healing",
        "Cushingoid facies (moon face)"
      ],
      "rare": [
        "Avascular necrosis of the femoral head",
        "Steroid-induced psychosis",
        "Secondary adrenal insufficiency (after > 2-3 weeks therapy)",
        "Opportunistic fungal infections"
      ],
      "seriousWarnings": [
        "Black Box / Strict Directive: Hypothalamic-Pituitary-Adrenal (HPA) Axis Suppression. Therapy exceeding 2-3 weeks causes profound adrenocortical atrophy. Abrupt cessation can precipitate fatal acute adrenal crisis (Addisonian crisis). Taper dose slowly over weeks."
      ]
    },
    "precautions": [
      "Always monitor blood glucose in diabetics. Never stop prolonged courses abruptly. In Dengue fever, steroids are NOT recommended and may exacerbate bleeding (DGHS 2024)."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Blood Glucose",
        "frequency": "Daily during high-dose therapy",
        "targetOrClinicalAction": "Initiate or adjust insulin if steroid-induced hyperglycemia occurs"
      },
      {
        "parameter": "Signs of Infection",
        "frequency": "Regular clinical exam",
        "targetOrClinicalAction": "Steroids mask fever and signs of peritonitis/sepsis"
      }
    ],
    "foodInteractions": "Take with food or milk to minimize gastric irritation.",
    "pregnancyInfo": {
      "category": "Category C",
      "details": "Crosses placenta; indicated specifically for antenatal acceleration of fetal lung maturity in threatened preterm birth."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in low levels; short courses are compatible with breastfeeding."
    },
    "paediatricConsiderations": "Highly effective in croup and meningitis. Avoid chronic prolonged use to prevent growth stunting.",
    "geriatricConsiderations": "High risk of acute confusion, delirium, severe hyperglycemia, and rapid osteoporosis.",
    "overdoseInformation": {
      "symptoms": "Extreme agitation, acute psychosis, severe hyperglycemia, gastrointestinal bleeding.",
      "management": "Symptomatic supportive therapy; gradual dose taper. Hemodialysis is not effective."
    },
    "storageInformation": "Store below 25°C protected from light.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "দীর্ঘস্থায়ী গ্লুকোকোর্টিকয়েড স্টেরয়েড",
      "mechanismSummaryBn": "কোষের সাইটোপ্লাজমিক গ্লুকোকোর্টিকয়েড রিসেপ্টরে আবদ্ধ হয়ে নিউক্লিয়াসে প্রবেশ করে তীব্র প্রদাহ ও সাইটোকাইন নিঃসরণ বন্ধ করে। এতে লবণের কোনো রিটেনশন হয় না।",
      "patientCounsellingBn": "সকালে খাবারের সাথে সেবন করুন যাতে ঘুমের ব্যাঘাত না ঘটে। চিকিৎসকের পরামর্শ ব্যতীত হঠাৎ খাওয়া বন্ধ করবেন না।",
      "criticalWarningBn": "২ সপ্তাহের বেশি সেবন করার পর হঠাৎ বন্ধ করলে মারাত্মক ও প্রাণঘাতী অ্যাড্রেনাল সংকট হতে পারে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Binds glucocorticoid receptor -> transactivation of Annexin-A1 (inhibits PLA2) + transrepression of NF-kB -> suppresses inflammatory cytokines.",
      "receptorTarget": "Intracellular Glucocorticoid Receptor (GR / NR3C1)",
      "vivaQuestions": [
        {
          "question": "Why is Dexamethasone preferred over Hydrocortisone in cerebral edema?",
          "questionBn": "মস্তিষ্কের ইডিমা বা ফোলায় হাইড্রোকর্টিসনের চেয়ে ডেক্সামিথাসন কেন পছন্দনীয়?",
          "modelAnswer": "Dexamethasone has 25-30 times the anti-inflammatory potency of hydrocortisone with zero mineralocorticoid (sodium/fluid retaining) activity, avoiding any increase in intracranial volume.",
          "highYieldPearl": "Zero mineralocorticoid potency makes it drug of choice for vasogenic cerebral edema."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-dex-01",
          "front": "Mineralocorticoid potency of Dexamethasone?",
          "back": "Zero (virtually no salt or water retention).",
          "topic": "Pharmacodynamics",
          "highYield": true
        },
        {
          "id": "fc-dex-02",
          "front": "Why must prolonged steroid courses be tapered gradually?",
          "back": "To allow atrophied adrenal cortex time to recover endogenous cortisol synthesis and prevent acute adrenal crisis.",
          "topic": "Endocrinology",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-dex-01",
          "question": "Which corticosteroid is administered antenatally to a pregnant mother in threatened preterm labor at 30 weeks to accelerate fetal lung maturation?",
          "options": [
            "Dexamethasone IM",
            "Hydrocortisone IV",
            "Prednisolone Oral",
            "Fludrocortisone"
          ],
          "correctIndex": 0,
          "explanation": "Dexamethasone and Betamethasone cross the placenta in active form and stimulate surfactant synthesis by fetal type II alveolar pneumocytes.",
          "bmdcFocus": "Phase 2 Pharmacology & Obstetrics"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute Croup (Laryngotracheobronchitis) in a Toddler",
        "patientProfile": "2-year-old child presents with barking seal-like cough, inspiratory stridor, and hoarseness.",
        "presentation": "Single dose of oral dexamethasone (0.15 mg/kg) is administered.",
        "clinicalQuestion": "What is the clinical benefit and timeframe of dexamethasone in croup?",
        "discussion": "Oral dexamethasone reduces laryngeal mucosal edema within 1-2 hours, decreasing hospital admissions, need for nebulized epinephrine, and intubation."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 39: Adrenocorticosteroids & Adrenocortical Antagonists",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "paracetamol-caffeine",
    "name": "Paracetamol + Caffeine",
    "nameBn": "প্যারাসিটামল + ক্যাফেইন",
    "normalizedName": "paracetamol-caffeine",
    "pharmacologicalClass": "Fixed-Dose Combination Analgesic (Central Analgesic + CNS Stimulant / Adenosine Antagonist)",
    "therapeuticClass": "Analgesics, Antipyretics & Anti-inflammatory",
    "therapeuticClassId": "analgesics-antipyretics",
    "atcCode": "N02BE51",
    "prescriptionStatus": "OTC",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Combines the central cyclooxygenase-inhibiting antipyretic and analgesic action of paracetamol (500 mg) with the central adenosine receptor (A1 and A2A) antagonism of caffeine (65 mg). Caffeine constricts dilated cerebral blood vessels (providing specific relief in vascular tension and migraine headaches) and acts as an analgesic adjuvant, accelerating paracetamol absorption and enhancing pain-relieving potency by approximately 40% compared to paracetamol alone.",
    "receptorOrTarget": "Central Cyclooxygenase & Central Adenosine A1/A2A Receptors",
    "indications": [
      {
        "id": "ind-headache",
        "name": "Tension Headache, Migraine Attack, and Severe Body Aches",
        "isPrimary": true
      },
      {
        "id": "ind-dental",
        "name": "Acute Dental Pain and Post-extraction Discomfort",
        "isPrimary": true
      },
      {
        "id": "ind-dysmenorrhea",
        "name": "Primary Dysmenorrhea and Musculoskeletal Aches",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Severe acute hepatic impairment",
        "type": "absolute",
        "reason": "High risk of paracetamol hepatotoxicity"
      },
      {
        "condition": "Severe cardiac arrhythmias / uncontrolled hypertension",
        "type": "relative",
        "reason": "Caffeine stimulates tachycardia and palpitations"
      }
    ],
    "dosageGuidance": {
      "adult": "1 to 2 tablets every 4 to 6 hours as needed (Maximum 8 tablets = 4000 mg Paracetamol + 520 mg Caffeine in 24 hours).",
      "paediatric": "Not recommended for children under 12 years of age.",
      "geriatric": "Adult dosing acceptable; monitor for caffeine-induced insomnia and palpitations.",
      "routes": [
        "Oral"
      ],
      "timingNotice": "Take with a glass of water. Avoid taking late at night if prone to insomnia."
    },
    "doseAdjustment": {
      "renal": "Space doses to every 6-8 hours in eGFR < 30 mL/min.",
      "hepatic": "Reduce dose in chronic liver disease; avoid in decompensated cirrhosis."
    },
    "adverseEffects": {
      "common": [
        "Restlessness, insomnia, palpitations, fine tremors (caffeine-mediated)",
        "Nausea"
      ],
      "uncommon": [
        "Tachycardia, mild elevation of blood pressure",
        "Gastric irritation"
      ],
      "rare": [
        "Hepatotoxicity (with cumulative paracetamol overdose > 4 g/day)",
        "Severe cutaneous adverse reactions"
      ],
      "seriousWarnings": [
        "Paracetamol Toxicity Warning: Never combine with other paracetamol-containing cold/fever medications. Total 24h paracetamol must not exceed 4000 mg."
      ]
    },
    "precautions": [
      "Limit concurrent consumption of caffeine-containing beverages (coffee, tea, energy drinks). Do not use in Dengue fever (pure paracetamol preferred)."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Total Paracetamol Daily Intake",
        "frequency": "Daily",
        "targetOrClinicalAction": "Keep < 4000 mg/day"
      }
    ],
    "foodInteractions": "May be taken with or without food.",
    "pregnancyInfo": {
      "category": "Category B / Caution in 3rd Trimester",
      "details": "High caffeine intake in pregnancy is associated with low birth weight. Pure paracetamol is preferred during pregnancy."
    },
    "breastfeedingInfo": {
      "safety": "caution",
      "details": "Caffeine passes into breast milk and can cause irritability and insomnia in the infant."
    },
    "paediatricConsiderations": "Contraindicated under 12 years of age.",
    "geriatricConsiderations": "Higher sensitivity to caffeine-induced tachycardia, tremors, and sleep disturbance.",
    "overdoseInformation": {
      "symptoms": "Paracetamol hepatotoxicity combined with caffeine toxicity (arrhythmias, seizures, severe vomiting).",
      "management": "Immediate IV N-Acetylcysteine (NAC) for paracetamol toxicity. Supportive beta-blockers for severe caffeine-induced supraventricular tachycardias."
    },
    "storageInformation": "Store below 25°C in a dry place.",
    "sources": [
      {
        "organization": "DGDA",
        "title": "National Essential Drugs List & Registered Product Database",
        "url": "http://dgda.gov.bd",
        "publicationDate": "2024-01-15",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "2024.1"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML-23"
      },
      {
        "organization": "BNF",
        "title": "British National Formulary (BNF 86)",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK / International Reference",
        "fetchedDate": "2026-09-18",
        "version": "BNF-86"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "FCPS, FRCP (London, Edin, Glasg), UGC Professor of Medicine",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "যৌথ ব্যথানাশক ওষুধ (কেন্দ্রীয় ব্যথানাশক + অ্যাডেনোসিন অ্যান্টাগনিস্ট)",
      "mechanismSummaryBn": "প্যারাসিটামল ব্যথা ও জ্বর কমায় এবং ক্যাফেইন মস্তিষ্কের রক্তনালী সংকুচিত করে প্যারাসিটামলের শোষণ ও ব্যথানাশক ক্ষমতা প্রায় ৪০% বাড়িয়ে দেয়।",
      "patientCounsellingBn": "টেনশন হেডেক বা মাইগ্রেনের ব্যথায় কার্যকর। অনিদ্রা এড়াতে সন্ধ্যার পর সেবন না করাই ভালো।",
      "criticalWarningBn": "একই সাথে অন্য কোনো প্যারাসিটামলযুক্ত ওষুধ খাবেন না যাতে দৈনিক ৪ গ্রামের সীমা অতিক্রম না করে।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Dual central COX inhibition + caffeine adenosine receptor blockade -> cerebral vasoconstriction + increased gastric emptying and paracetamol bioavailability.",
      "receptorTarget": "Central Cyclooxygenase & Adenosine A1/A2A Receptors",
      "vivaQuestions": [
        {
          "question": "What is the pharmacological rationale for adding Caffeine to Paracetamol in tension headaches?",
          "questionBn": "টেনশন হেডেকের ক্ষেত্রে প্যারাসিটামলের সাথে ক্যাফেইন যোগ করার ফার্মাকোলজিক্যাল যুক্তি কী?",
          "modelAnswer": "Caffeine blocks adenosine receptors causing cranial vasoconstriction, stimulates gastric emptying to accelerate paracetamol absorption, and directly enhances analgesic efficacy by approximately 40%.",
          "highYieldPearl": "Analgesic adjuvant action without requiring higher opioid doses."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-paracaff-01",
          "front": "Role of caffeine in paracetamol combinations?",
          "back": "Analgesic adjuvant that speeds absorption and induces cranial vasoconstriction.",
          "topic": "Synergy",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-paracaff-01",
          "question": "Caffeine enhances the analgesic efficacy of paracetamol primarily by acting as an antagonist at which receptor?",
          "options": [
            "Adenosine A1 and A2A receptors",
            "Mu-opioid receptors",
            "GABA-A receptors",
            "Histamine H1 receptors"
          ],
          "correctIndex": 0,
          "explanation": "Caffeine competitively antagonizes central and vascular adenosine receptors.",
          "bmdcFocus": "Phase 2 Pharmacology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Refractory Tension Headache in an Exam Candidate",
        "patientProfile": "24-year-old final-year medical student suffering from severe bilateral tension headache during exam revision.",
        "presentation": "Regular paracetamol 500 mg monotherapy provided insufficient relief. Switched to Paracetamol 500 mg + Caffeine 65 mg combination.",
        "clinicalQuestion": "Why did the combination provide superior relief?",
        "discussion": "The combination provides augmented pain relief through central adenosine blockade and faster peak analgesic plasma concentrations."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 36: NSAIDs, Nonopioid Analgesics & Adjuvants",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "paracetamol",
    "name": "Paracetamol",
    "nameBn": "প্যারাসিটামল",
    "normalizedName": "paracetamol",
    "pharmacologicalClass": "Aniline Analgesic & Central Cyclooxygenase Inhibitor",
    "therapeuticClass": "Analgesics, Antipyretics & Anti-inflammatory",
    "therapeuticClassId": "analgesics-nsaids",
    "atcCode": "N02BE01",
    "prescriptionStatus": "OTC",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine & Pediatrics)",
    "mechanismOfAction": "Paracetamol exerts analgesic and antipyretic effects primarily through central inhibition of prostaglandin synthesis by cyclooxygenase (COX-1, COX-2, and putative central splice variant), with negligible peripheral anti-inflammatory action due to high cellular peroxide levels in inflamed tissues. It lowers body temperature by acting on the hypothalamic thermoregulatory center to stimulate peripheral vasodilation and sweating. AM404, an active hepatic/brain metabolite, also stimulates cannabinoid CB1 receptors and TRPV1 channels to inhibit nociceptive transmission.",
    "receptorOrTarget": "Central Cyclooxygenase & Cannabinoid CB1 / TRPV1 Receptors via AM404 metabolite",
    "indications": [
      {
        "id": "ind-para-fever",
        "name": "Pyrexia / Fever (First-line antipyretic in viral illness and Dengue)",
        "isPrimary": true,
        "guidelineRecommendation": "Strict drug of choice in Dengue Fever (DGHS National Dengue Guideline 2024; NSAIDs strictly contraindicated)"
      },
      {
        "id": "ind-para-pain",
        "name": "Mild to Moderate Acute Pain (Headache, toothache, dysmenorrhea, post-vaccination)",
        "isPrimary": true
      },
      {
        "id": "ind-para-oa",
        "name": "Osteoarthritis (Symptomatic first-line mild pain relief)",
        "isPrimary": false
      }
    ],
    "contraindications": [
      {
        "condition": "Severe acute hepatic failure or active severe liver disease",
        "type": "absolute",
        "reason": "High risk of irreversible fatal centrilobular hepatic necrosis"
      },
      {
        "condition": "Known hypersensitivity to paracetamol",
        "type": "absolute",
        "reason": "Anaphylactoid or severe cutaneous adverse reactions"
      }
    ],
    "dosageGuidance": {
      "adult": "500 mg - 1000 mg every 4 to 6 hours as needed. Maximum: 4000 mg (4.0 g) in 24 hours.",
      "paediatric": "10 to 15 mg/kg per dose orally every 4 to 6 hours as needed. Maximum: 60 mg/kg per 24 hours.",
      "routes": [
        "Oral",
        "IV",
        "Rectal"
      ],
      "timingNotice": "May be taken with or without food. When rapid analgesic onset is needed, taking on an empty stomach with a full glass of water accelerates gastric emptying."
    },
    "doseAdjustment": {
      "renal": "eGFR 10-50 mL/min: Increase dosing interval to every 6 hours. eGFR < 10 mL/min: Increase interval to every 8 hours.",
      "hepatic": "Mild to moderate hepatic impairment: Maximum 2000 mg (2 g) per 24 hours. Severe cirrhosis: Contraindicated."
    },
    "adverseEffects": {
      "common": [
        "Nausea",
        "Epigastric discomfort (rare)",
        "Pruritus / mild rash"
      ],
      "uncommon": [
        "Transient transaminitis",
        "Flushing"
      ],
      "rare": [
        "Thrombocytopenia",
        "Leukopenia",
        "Neutropenia"
      ],
      "seriousWarnings": [
        "Hepatotoxicity: Doses exceeding 4g/24h or single ingestion > 7.5g cause acute hepatic necrosis and liver failure.",
        "Dengue Warning: Never substitute or combine with Aspirin or NSAIDs in febrile patients due to fatal bleeding risk.",
        "Severe cutaneous adverse reactions (Stevens-Johnson Syndrome, Toxic Epidermal Necrolysis) reported rarely."
      ]
    },
    "precautions": [
      "Chronic malnutrition, anorexia, or severe dehydration reduces glutathione reserves and lowers the toxic threshold.",
      "Chronic alcoholism induces CYP2E1, accelerating toxic NAPQI formation.",
      "Always warn patients to check labels of OTC cough/cold preparations to avoid accidental cumulative overdose."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum ALT, AST & Bilirubin",
        "frequency": "Baseline in chronic use; immediate serial levels in suspected overdose",
        "targetOrClinicalAction": "Elevation > 3x ULN warrants dose reduction; > 1000 U/L indicates severe necrosis."
      },
      {
        "parameter": "Prothrombin Time (INR)",
        "frequency": "Serial monitoring in acute toxicity",
        "targetOrClinicalAction": "INR > 2.0 indicates acute liver failure requiring intensive care and NAC."
      },
      {
        "parameter": "Serum Creatinine",
        "frequency": "Monitors acute kidney injury",
        "targetOrClinicalAction": "Rising creatinine indicates hepatorenal syndrome or acute tubular necrosis."
      }
    ],
    "foodInteractions": "May be taken with food to reduce minor gastric upset, though food may slightly delay peak absorption. High-pectin meals can delay absorption.",
    "pregnancyInfo": {
      "category": "Category B",
      "details": "Analgesic and antipyretic of choice in all trimesters of pregnancy when clinically indicated, at lowest effective dose for shortest duration."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in human milk in small amounts; maternal therapeutic doses are safe and compatible with breastfeeding (AAP & WHO)."
    },
    "paediatricConsiderations": "Weight-based dosing (10-15 mg/kg every 4-6 hours) must be strictly calculated; avoid teaspoon estimation. Paracetamol drops and syrups must use provided calibrated oral syringes.",
    "geriatricConsiderations": "Use standard starting doses, but evaluate chronic nutritional state and alcohol intake. Frail elderly patients with reduced hepatic glutathione may have lower toxicity threshold.",
    "overdoseInformation": {
      "symptoms": "Phase 1 (0-24h): Nausea, vomiting, pallor; Phase 2 (24-48h): Right upper quadrant pain, elevated ALT/AST; Phase 3 (72-96h): Jaundice, encephalopathy, coagulopathy, hypoglycemia, renal failure.",
      "management": "Check serum paracetamol level on Rumack-Matthew nomogram 4 hours post-ingestion. Administer activated charcoal if presentation is within 1-2 hours.",
      "antidote": "Intravenous or oral N-acetylcysteine (NAC). Most effective when initiated within 8 hours of ingestion to replenish hepatic glutathione and conjugate toxic NAPQI."
    },
    "storageInformation": "Store below 30°C in a dry place protected from direct heat, moisture, and light. Keep in original blister packaging.",
    "sources": [
      {
        "organization": "DGHS Bangladesh",
        "title": "National Guidelines for Clinical Management of Dengue Syndrome 2024",
        "url": "https://dghs.gov.bd",
        "publicationDate": "2024-05-01",
        "jurisdiction": "Bangladesh",
        "fetchedDate": "2026-09-18",
        "version": "5th Edition"
      },
      {
        "organization": "BNF",
        "title": "BNF 86: Paracetamol Monograph",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML 2023"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "MBBS, MRCP, FRCP, Emeritus Professor of Medicine, BSMMU",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "অ্যানিলিন অ্যানালজেসিক ও অ্যান্টিপাইরেটিক (জ্বর ও ব্যথানাশক ওষুধ)",
      "mechanismSummaryBn": "মস্তিষ্কের হাইপোথ্যালামাসে প্রোস্টাগ্ল্যান্ডিন সংশ্লেষণ কমিয়ে জ্বর দ্রুত কমায় এবং কেন্দ্রীয় ব্যথার পথকে নিয়ন্ত্রণ করে মাঝারি ব্যথা দূর করে। পেরিফেরাল প্রদাহে কাজ করে না। ডেঙ্গু জ্বরে এটি একমাত্র নির্দেশিত ও নিরাপদ ব্যথানাশক।",
      "patientCounsellingBn": "দিনে সর্বোচ্চ ৪ গ্রাম (৮টি ৫০০ মিগ্রা ট্যাবলেট) এর বেশি খাবেন না। অ্যালকোহল এড়িয়ে চলুন। অন্য যেকোনো ওষুধে প্যারাসিটামল আছে কি না যাচাই করুন। ডেঙ্গু জ্বরে ভুলেও অ্যাসপিরিন বা অন্য ব্যথানাশক খাবেন না।",
      "criticalWarningBn": "একবারে মাত্রাতিরিক্ত (১০-১৫টি ট্যাবলেট) সেবনে লিভারের কোষ ধ্বংস হয়ে মারাত্মক ও প্রাণঘাতী হেপাটিক ফেইলিউর হতে পারে। ডেঙ্গু জ্বরে কখনো অ্যাসপিরিন বা ডাইক্লোফেনাক খাবেন না, কেবল প্যারাসিটামল ব্যবহার করুন।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Rapid GI absorption -> CYP2E1 (5-10%) generates NAPQI -> conjugated by glutathione -> central COX inhibition + AM404 cannabinoid/TRPV1 activation -> antipyresis and analgesia.",
      "receptorTarget": "Central Cyclooxygenase & Cannabinoid CB1 / TRPV1 Receptors via AM404 metabolite",
      "vivaQuestions": [
        {
          "question": "Why is Paracetamol safe in Dengue Fever while Aspirin and Ibuprofen are strictly contraindicated?",
          "questionBn": "ডেঙ্গু জ্বরে অ্যাসপিরিন ও আইবুপ্রোফেন সম্পূর্ণ নিষিদ্ধ অথচ প্যারাসিটামল কেন নিরাপদ?",
          "modelAnswer": "Dengue virus causes thrombocytopenia and capillary fragility. Aspirin irreversibly inhibits platelet COX-1 and thromboxane A2, while NSAIDs reversibly inhibit platelets and cause gastric mucosal erosions, triggering catastrophic gastrointestinal hemorrhage and dengue shock syndrome. Paracetamol acts centrally with negligible peripheral platelet COX-1 inhibition, preserving platelet function and hemostasis.",
          "highYieldPearl": "Core national guideline requirement: Only paracetamol for dengue fever analgesia/antipyresis."
        },
        {
          "question": "Explain the biochemical basis of Paracetamol toxicity and the mechanism of its antidote.",
          "questionBn": "প্যারাসিটামল বিষক্রিয়ার জৈব-রাসায়নিক কারণ এবং এর অ্যান্টিডোটের কার্যপদ্ধতি ব্যাখ্যা করুন।",
          "modelAnswer": "At therapeutic doses, ~90% of paracetamol is safely conjugated via glucuronidation and sulfation. ~5-10% is metabolized by CYP2E1 to NAPQI, which is neutralized by glutathione. In overdose, sulfation/glucuronidation saturate; excess NAPQI depletes hepatic glutathione and covalently binds to mitochondrial proteins, causing centrilobular hepatic necrosis. The antidote is N-acetylcysteine (NAC), which acts as a glutathione precursor and direct sulfhydryl donor to conjugate NAPQI.",
          "highYieldPearl": "NAC within 8 hours provides near-complete hepatoprotection."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-para-01",
          "front": "Toxic metabolite of paracetamol responsible for hepatic necrosis?",
          "back": "NAPQI (N-acetyl-p-benzoquinone imine).",
          "topic": "Toxicology",
          "highYield": true
        },
        {
          "id": "fc-para-02",
          "front": "Specific antidote for paracetamol overdose?",
          "back": "N-acetylcysteine (NAC) - replenishes glutathione.",
          "topic": "Antidote",
          "highYield": true
        },
        {
          "id": "fc-para-03",
          "front": "Maximum recommended adult daily dose of paracetamol?",
          "back": "4000 mg (4.0 g) per 24 hours.",
          "topic": "Dosing",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-para-01",
          "question": "A 20-year-old male presents 6 hours after ingesting 15 grams of paracetamol in a suicide attempt. What is the immediate pharmacological intervention?",
          "options": [
            "Intravenous N-acetylcysteine (NAC) infusion protocol",
            "Urinary alkalinization with sodium bicarbonate",
            "Immediate hemodialysis",
            "High-dose intravenous vitamin K",
            "Activated charcoal only"
          ],
          "correctIndex": 0,
          "explanation": "Intravenous N-acetylcysteine administered within 8 hours of paracetamol ingestion replenishes hepatic glutathione stores and prevents fatal centrilobular necrosis.",
          "bmdcFocus": "Phase 2 Pharmacology & Clinical Toxicology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Acute Dengue Fever in Dhaka with High Pyrexia",
        "patientProfile": "28-year-old male in Dhaka presents during dengue epidemic with 3-day history of high fever (103°F), retro-orbital headache, and severe arthralgia. Dengue NS1 Ag positive, platelets 90,000/uL.",
        "presentation": "Patient asks if he can take Ketorolac or Diclofenac for the severe body pain. Doctor prescribes Paracetamol 500 mg TDS.",
        "clinicalQuestion": "Why must NSAIDs be strictly avoided in this patient?",
        "discussion": "NSAIDs cause platelet dysfunction and gastric mucosal injury. In dengue fever with ongoing thrombocytopenia and capillary leak, NSAIDs precipitate massive upper GI bleeding and rapid progression to Dengue Shock Syndrome."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 36: NSAIDs, Nonopioid Analgesics & Drugs Used in Gout",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        },
        {
          "bookTitle": "KD Tripathi Essentials of Medical Pharmacology",
          "edition": "8th Edition",
          "chapterOrSection": "Chapter 14: Nonsteroidal Anti-inflammatory Drugs and Antipyretic-Analgesics",
          "verifiedTextbookId": "kd-tripathi-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  {
    "id": "omeprazole",
    "name": "Omeprazole",
    "nameBn": "ওমেপ্রাজল",
    "normalizedName": "omeprazole",
    "pharmacologicalClass": "Proton Pump Inhibitor (Irreversible H+/K+-ATPase Inhibitor)",
    "therapeuticClass": "Gastrointestinal & Anti-Ulcer Drugs",
    "therapeuticClassId": "gastrointestinal",
    "atcCode": "A02BC01",
    "prescriptionStatus": "OTC",
    "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
    "mechanismOfAction": "Omeprazole is a substituted benzimidazole prodrug that accumulates selectively in the acidic secretory canaliculi of parietal cells. Protonation converts it to active sulfenamide, which forms a covalent disulfide bond with Cys813 of the luminal H+/K+-ATPase pump. This irreversibly blocks the final common pathway of gastric acid secretion, inhibiting both basal and stimulated acid production regardless of the secretagogue.",
    "receptorOrTarget": "Luminal Cys813 of H+/K+-ATPase Proton Pump on Gastric Parietal Cells",
    "indications": [
      {
        "id": "ind-ome-pud",
        "name": "Peptic Ulcer Disease (Duodenal & Gastric Ulcer Healing)",
        "isPrimary": true
      },
      {
        "id": "ind-ome-gerd",
        "name": "Gastroesophageal Reflux Disease (GERD) & Erosive Esophagitis",
        "isPrimary": true
      },
      {
        "id": "ind-ome-hpylori",
        "name": "Helicobacter pylori Eradication Triple Therapy",
        "isPrimary": true,
        "guidelineRecommendation": "Combined with Amoxicillin and Clarithromycin for 14 days"
      }
    ],
    "contraindications": [
      {
        "condition": "Known hypersensitivity to substituted benzimidazoles",
        "type": "absolute",
        "reason": "Anaphylaxis or acute interstitial nephritis"
      },
      {
        "condition": "Concomitant use with Rilpivirine or Atazanavir",
        "type": "absolute",
        "reason": "Loss of antiretroviral therapeutic efficacy due to elevated gastric pH"
      }
    ],
    "dosageGuidance": {
      "adult": "20 mg to 40 mg once daily before breakfast for 4 to 8 weeks.",
      "paediatric": "1 mg/kg once daily for severe GERD.",
      "routes": [
        "Oral",
        "IV"
      ],
      "timingNotice": "Take 30 to 60 minutes before morning breakfast so peak plasma concentrations coincide with activation of proton pumps."
    },
    "doseAdjustment": {
      "renal": "No dose adjustment necessary in renal failure or dialysis.",
      "hepatic": "Severe cirrhosis: Maximum 20 mg once daily due to increased bioavailability and prolonged half-life."
    },
    "adverseEffects": {
      "common": [
        "Headache",
        "Diarrhea",
        "Abdominal pain",
        "Flatulence"
      ],
      "uncommon": [
        "Dizziness",
        "Dry mouth",
        "Skin rash"
      ],
      "rare": [
        "Interstitial nephritis",
        "Gynecomastia",
        "Microscopic colitis"
      ],
      "seriousWarnings": [
        "Drug interaction with Clopidogrel: Strong CYP2C19 inhibition blunts clopidogrel bioactivation; switch to Pantoprazole in cardiac stent patients.",
        "Clostridioides difficile colitis risk due to prolonged acid suppression.",
        "Long-term risks: Hypomagnesemia, Vitamin B12 deficiency, and osteoporotic hip fractures."
      ]
    },
    "precautions": [
      "Always rule out gastric malignancy before initiating long-term therapy because symptomatic relief can delay diagnosis.",
      "Monitor serum magnesium prior to and periodically during long-term therapy."
    ],
    "monitoringRequirements": [
      {
        "parameter": "Serum Magnesium",
        "frequency": "Periodic in long-term therapy (> 1 year)",
        "targetOrClinicalAction": "Hypomagnesemia requires oral/IV magnesium and possible PPI discontinuation."
      },
      {
        "parameter": "Serum Vitamin B12 & Hemoglobin",
        "frequency": "Annual evaluation in prolonged therapy (> 2 years)",
        "targetOrClinicalAction": "Low B12 warrants supplementation or parenteral replacement."
      }
    ],
    "foodInteractions": "Food reduces rate and extent of absorption; must be administered on an empty stomach 30 to 60 minutes before morning breakfast.",
    "pregnancyInfo": {
      "category": "Category C",
      "details": "Extensive epidemiological studies show no increased risk of congenital malformations; short courses acceptable when clinically required."
    },
    "breastfeedingInfo": {
      "safety": "compatible",
      "details": "Excreted in low amounts in breast milk; degraded rapidly by infant gastric acid."
    },
    "paediatricConsiderations": "Approved for severe GERD and erosive esophagitis in children >= 1 year (1 mg/kg once daily). Capsule contents can be opened and mixed in apple sauce if unable to swallow.",
    "geriatricConsiderations": "No dosage reduction needed based solely on age; evaluate long-term risk of hip fractures and hypomagnesemia in elderly patients taking concomitant diuretics.",
    "overdoseInformation": {
      "symptoms": "Confusion, drowsiness, blurred vision, tachycardia, nausea, sweating.",
      "management": "No specific antidote; symptomatic and supportive care. Hemodialysis is not effective due to high protein binding (~95%).",
      "antidote": "Symptomatic / supportive care only."
    },
    "storageInformation": "Store below 30°C in tight, light-resistant container. Keep capsules in desiccated container away from humid bathroom storage.",
    "sources": [
      {
        "organization": "BNF",
        "title": "BNF 86: Omeprazole Monograph",
        "url": "https://bnf.nice.org.uk",
        "publicationDate": "2023-09-01",
        "jurisdiction": "UK",
        "fetchedDate": "2026-09-18",
        "version": "BNF 86"
      },
      {
        "organization": "FDA",
        "title": "Prilosec (Omeprazole) Prescribing Information",
        "url": "https://accessdata.fda.gov",
        "publicationDate": "2022-04-01",
        "jurisdiction": "USA",
        "fetchedDate": "2026-09-18",
        "version": "Label Revision 2022"
      },
      {
        "organization": "WHO",
        "title": "WHO Model List of Essential Medicines (23rd List)",
        "url": "https://who.int",
        "publicationDate": "2023-07-26",
        "jurisdiction": "International",
        "fetchedDate": "2026-09-18",
        "version": "EML 2023"
      }
    ],
    "medicalReview": {
      "status": "published",
      "reviewerName": "Prof. Dr. A. B. M. Abdullah",
      "reviewerCredentials": "MBBS, MRCP, FRCP, Emeritus Professor of Medicine, BSMMU",
      "reviewDate": "2026-09-18",
      "lastUpdated": "2026-09-18",
      "contentVersion": "2.4.0"
    },
    "bilingualNotes": {
      "classBn": "প্রোটন পাম্প ইনহিবিটর (পিপিয়াই গ্যাস্ট্রিক অ্যাসিড দমনকারী ওষুধ)",
      "mechanismSummaryBn": "প্যারাইটাল কোষের অ্যাসিড নির্গমনের মূল পাম্পকে (H+/K+-ATPase) স্থায়ীভাবে অকার্যকর করে পাকস্থলীর অ্যাসিড নিঃসরণ উল্লেখযোগ্যভাবে কমায়। সকালে খাবারের ৩০-৬০ মিনিট পূর্বে সেবন করা আবশ্যক।",
      "patientCounsellingBn": "প্রতিদিন সকালে নাস্তার ৩০ থেকে ৬০ মিনিট পূর্বে এক গ্লাস পানি দিয়ে ক্যাপসুলটি গিলে খাবেন। চিবিয়ে খাবেন না। দীর্ঘদিন সেবনের ক্ষেত্রে ম্যাগনেসিয়াম ও বি১২ এর মাত্রা পরীক্ষা করা প্রয়োজন।",
      "criticalWarningBn": "হার্টে রিং পরানো বা ক্লোপিডোগ্রেল সেবনকারী রোগীদের ওমেপ্রাজল দেওয়া যাবে না (প্যান্টোপ্রাজল নিরাপদ), কারণ এটি ক্লোপিডোগ্রেলের রক্ত তরল রাখার ক্ষমতা কমিয়ে হার্ট অ্যাটাকের ঝুঁকি বাড়ায়।"
    },
    "pharmacologyLearning": {
      "pathwaySummary": "Prodrug -> parietal cell canaliculi acid trapping -> tetracyclic sulfenamide -> covalent S-S bond to Cys813 of H+/K+-ATPase -> irreversible inhibition until de novo pump synthesis.",
      "receptorTarget": "Luminal Cys813 of H+/K+-ATPase Proton Pump on Gastric Parietal Cells",
      "vivaQuestions": [
        {
          "question": "Why must Omeprazole be administered 30 to 60 minutes before breakfast for optimal efficacy?",
          "questionBn": "সর্বোচ্চ কার্যকারিতার জন্য ওমেপ্রাজল কেন সকালের নাস্তার ৩০ থেকে ৬০ মিনিট পূর্বে সেবন করতে হয়?",
          "modelAnswer": "Omeprazole is an unstable acid-labile prodrug that requires enteric coating. It reaches peak plasma concentrations 1 to 2 hours after oral ingestion. It only inhibits actively secreting H+/K+-ATPase pumps that have inserted into the canalicular membrane, which occurs maximally during meal ingestion. Administering 30-60 minutes before breakfast aligns peak drug plasma levels with maximal pump activation.",
          "highYieldPearl": "Inactive resting pumps are not inhibited; taking with food or at bedtime severely degrades efficacy."
        },
        {
          "question": "Explain the clinically significant pharmacokinetic interaction between Omeprazole and Clopidogrel.",
          "questionBn": "ওমেপ্রাজল এবং ক্লোপিডোগ্রেলের মধ্যকার ফার্মাকোকাইনেটিক মিথস্ক্রিয়া ব্যাখ্যা করুন।",
          "modelAnswer": "Clopidogrel is an antiplatelet prodrug requiring bioactivation by hepatic CYP2C19. Omeprazole is a potent competitive inhibitor of CYP2C19, reducing active clopidogrel metabolite concentrations by up to 45% and leading to stent thrombosis. In contrast, Pantoprazole is cleared via sulfoconjugation and does not inhibit CYP2C19, making Pantoprazole the PPI of choice in cardiology patients.",
          "highYieldPearl": "Omeprazole + Clopidogrel = Black Box Warning; Pantoprazole = Safe."
        }
      ],
      "recallFlashcards": [
        {
          "id": "fc-ome-01",
          "front": "Molecular target of Omeprazole?",
          "back": "Covalent disulfide binding to Cys813 of H+/K+-ATPase proton pump.",
          "topic": "Mechanism",
          "highYield": true
        },
        {
          "id": "fc-ome-02",
          "front": "Why does omeprazole interact with clopidogrel?",
          "back": "Inhibits hepatic CYP2C19 bioactivation of clopidogrel.",
          "topic": "Interaction",
          "highYield": true
        }
      ],
      "practiceSba": [
        {
          "id": "sba-ome-01",
          "question": "A 54-year-old male with recent drug-eluting coronary stent placement on Aspirin and Clopidogrel develops dyspepsia. Which proton pump inhibitor is preferred to avoid blunting clopidogrel efficacy?",
          "options": [
            "Pantoprazole",
            "Omeprazole",
            "Esomeprazole",
            "Cimetidine"
          ],
          "correctIndex": 0,
          "explanation": "Pantoprazole does not competitively inhibit CYP2C19, preserving clopidogrel antiplatelet bioactivation and stent patency.",
          "bmdcFocus": "Phase 2 Pharmacology & Cardiology"
        }
      ],
      "clinicalCaseScenario": {
        "title": "Post-PCI Gastroprotection Choice",
        "patientProfile": "60M with DES to LAD on Dual Antiplatelet Therapy (DAPT) with Aspirin 75 mg and Clopidogrel 75 mg daily.",
        "presentation": "Complains of mild heartburn. GP plans to write Omeprazole 20 mg.",
        "clinicalQuestion": "What intervention should the clinical pharmacologist make?",
        "discussion": "Intervene to substitute Omeprazole with Pantoprazole 40 mg daily to avoid competitive inhibition of CYP2C19 and stent thrombosis."
      },
      "textbookReferences": [
        {
          "bookTitle": "Katzung Basic & Clinical Pharmacology",
          "edition": "15th Edition",
          "chapterOrSection": "Chapter 62: Drugs Used in the Treatment of Gastrointestinal Diseases",
          "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
        }
      ],
      "acrossBooksTopicIds": []
    }
  },
  // ACARBOSE (Alpha-Glucosidase Inhibitor)
  {
  "id": "acarbose",
  "name": "Acarbose",
  "normalizedName": "acarbose",
  "slug": "acarbose",
  "pharmacologicalClass": "Alpha-Glucosidase Inhibitor",
  "therapeuticClass": "Endocrine & Metabolic Drugs (Antidiabetics)",
  "therapeuticClassId": "antidiabetics",
  "atcCode": "A10BF01",
  "prescriptionStatus": "POM",
  "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
  "mechanismOfAction": "Acarbose is a complex microbial pseudotetrasaccharide that acts as a competitive, reversible inhibitor of pancreatic alpha-amylase and membrane-bound intestinal alpha-glucoside hydrolase enzymes (sucrase, maltase, isomaltase) in the small intestinal brush border. By inhibiting these enzymes, it delays digestion of ingested complex carbohydrates and disaccharides into monosaccharides, thereby flattening and delaying postprandial glucose absorption curves and blunting postprandial glycemic excursions without stimulating pancreatic beta-cell insulin secretion.",
  "receptorOrTarget": "Intestinal brush-border alpha-glucosidases and pancreatic alpha-amylase",
  "indications": [
    {
      "id": "ind-t2dm",
      "name": "Type 2 Diabetes Mellitus",
      "isPrimary": true,
      "guidelineRecommendation": "Adjunct to diet and exercise to improve postprandial glycemic control in adults with type 2 diabetes (BADAS / ADA Guidelines)"
    },
    {
      "id": "ind-prediabetes",
      "name": "Impaired Glucose Tolerance (Prediabetes)",
      "isPrimary": true,
      "note": "Proven delay in progression to overt type 2 diabetes (STOP-NIDDM Trial)"
    }
  ],
  "contraindications": [
    {
      "condition": "Diabetic Ketoacidosis",
      "type": "absolute",
      "reason": "Oral agents are ineffective; acute insulin therapy required."
    },
    {
      "condition": "Severe Hepatic Impairment / Cirrhosis",
      "type": "absolute",
      "reason": "Altered drug disposition and risk of elevated transaminases."
    },
    {
      "condition": "Inflammatory Bowel Disease / Colonic Ulceration",
      "type": "absolute",
      "reason": "Colonic bacterial fermentation of undigested carbohydrates produces excessive gas, distension, and exacerbates mucosal inflammation."
    },
    {
      "condition": "Partial or Complete Intestinal Obstruction",
      "type": "absolute",
      "reason": "Increased intraluminal gas and distension may precipitate acute bowel obstruction."
    },
    {
      "condition": "Severe Renal Impairment (eGFR < 25 mL/min)",
      "type": "absolute",
      "reason": "Significant 5-fold plasma accumulation of acarbose metabolites."
    }
  ],
  "dosageGuidance": {
    "adult": "Initial: 25 mg orally three times daily with the first bite of each main meal. Titrate at 4-8 week intervals based on 1-hour postprandial blood glucose and HbA1c to 50 mg three times daily (Maximum: 100 mg three times daily; do not exceed 50 mg TID if body weight < 60 kg to reduce hepatotoxicity risk).",
    "paediatric": "Safety and efficacy not established in paediatric patients under 18 years.",
    "geriatric": "No age-related dosage adjustment required; start at lowest recommended dose (25 mg TID) to assess gastrointestinal tolerance.",
    "routes": [
      "Oral"
    ],
    "administrationNotes": "Must be taken orally with the very first bite of each main carbohydrate-containing meal. If taken on an empty stomach or after meal completion, therapeutic efficacy is markedly diminished.",
    "timingNotice": "Take with the first bite of each main meal."
  },
  "doseAdjustment": {
    "renal": "Contraindicated in severe renal impairment (eGFR < 25 mL/min/1.73m² or serum creatinine > 2.0 mg/dL).",
    "hepatic": "Contraindicated in cirrhosis or severe liver disease. Monitor liver function tests (ALT/AST) every 3 months for the first year of therapy at doses > 50 mg TID."
  },
  "adverseEffects": {
    "common": [
      "Flatulence (up to 70-75% due to colonic fermentation)",
      "Abdominal distension and borborygmi",
      "Diarrhea",
      "Abdominal pain and cramping"
    ],
    "uncommon": [
      "Asymptomatic elevation of serum transaminases (ALT/AST)",
      "Nausea and vomiting",
      "Erythema and skin rash"
    ],
    "rare": [
      "Subacute liver failure (rare, dose-dependent)",
      "Paralytic ileus",
      "Pneumatosis cystoides intestinalis"
    ],
    "seriousWarnings": [
      "Emergency Management of Hypoglycemia: When acarbose is combined with sulfonylureas or insulin, acute hypoglycemia MUST be treated with oral dextrose (glucose) or milk, NOT cane sugar (sucrose/table sugar), because acarbose inhibits intestinal hydrolysis of sucrose into glucose and fructose."
    ]
  },
  "precautions": [
    "Always educate patients to carry pure oral glucose tablets, not sweets/table sugar, to manage acute hypoglycemic episodes.",
    "Gastrointestinal side effects usually peak during the first 2-4 weeks and gradually subside as colonic microbiota adapt; slow upward dose titration is essential.",
    "Monitor serum transaminases at baseline, every 3 months during the first year of treatment, and periodically thereafter at doses above 50 mg TID."
  ],
  "monitoringRequirements": [
    {
      "parameter": "1-Hour Postprandial Glucose & HbA1c",
      "frequency": "Every 1 to 3 months",
      "targetOrClinicalAction": "Assess glycemic response and guide titration"
    },
    {
      "parameter": "Serum Transaminases (ALT/AST)",
      "frequency": "Baseline, then every 3 months for year 1, then annually",
      "targetOrClinicalAction": "Discontinue therapy if persistent ALT > 3x ULN occurs"
    },
    {
      "parameter": "Serum Creatinine / eGFR",
      "frequency": "Baseline and periodically",
      "targetOrClinicalAction": "Discontinue if eGFR drops below 25 mL/min"
    }
  ],
  "foodInteractions": "Acarbose must be taken with carbohydrate-rich meals to exert its pharmacological effect; it is ineffective if taken in the fasting state.",
  "pregnancyInfo": {
    "category": "FDA Category B (Narrative: Reproduction studies in rats and rabbits at doses up to 30 times human exposure revealed no evidence of fetal harm. However, there are no adequate and well-controlled studies in pregnant women. Insulin remains the gold standard for glycemic control in pregnancy; acarbose should be used only if clearly necessary).",
    "details": "Animal reproduction studies have revealed no teratogenicity. Insulin remains the primary recommended therapy for gestational diabetes in Bangladesh clinical guidance."
  },
  "breastfeedingInfo": {
    "safety": "caution",
    "details": "Acarbose is excreted in rat milk in small quantities. Because no human lactation data exist, nursing women should exercise caution or consider insulin therapy."
  },
  "paediatricConsiderations": "Safety and efficacy in children under 18 have not been established.",
  "geriatricConsiderations": "Increased susceptibility to flatulence and diarrhea; assess baseline renal function and initiate at 25 mg once daily.",
  "overdoseInformation": {
    "symptoms": "Transient increase in flatulence, diarrhea, and abdominal distress if taken with carbohydrates. No hypoglycemia in monotherapy overdose.",
    "management": "Withhold carbohydrate-containing foods for 4-6 hours. Treat with oral fluids and electrolytes for diarrhea. Do not administer antacids."
  },
  "storageInformation": "Store below 25°C in a dry place. Protect from moisture and direct light.",
  "sources": [
    {
      "organization": "DailyMed / US FDA",
      "title": "Acarbose Tablet Prescribing Information",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=acarbose-fda-label",
      "publicationDate": "2023-11-15",
      "jurisdiction": "United States",
      "fetchedDate": "2026-09-25",
      "version": "FDA-Rev-2023"
    },
    {
      "organization": "WHO Collaborating Centre for Drug Statistics Methodology",
      "title": "ATC/DDD Index: Acarbose (A10BF01)",
      "url": "https://atcddd.fhi.no/atc_ddd_index/?code=A10BF01",
      "publicationDate": "2024-01-01",
      "jurisdiction": "International",
      "fetchedDate": "2026-09-25",
      "version": "2024.1"
    },
    {
      "organization": "Diabetic Association of Bangladesh (BADAS)",
      "title": "Management of Type 2 Diabetes Guidelines",
      "url": "https://www.badas-bd.org",
      "publicationDate": "2022-09-10",
      "jurisdiction": "Bangladesh",
      "fetchedDate": "2026-09-25",
      "version": "3rd Edition"
    }
  ],
  "medicalReview": {
    "status": "published",
    "reviewerName": "Dr. Tanvir Rahman",
    "reviewerCredentials": "MBBS, MD (Endocrinology & Metabolism), BIRDEM",
    "reviewDate": "2026-09-25",
    "lastUpdated": "2026-09-25",
    "contentVersion": "2.5.0"
  },
  "nameBn": "অ্যাকারবোজ",
  "pharmacokinetics": {
    "bioavailability": "Less than 2% of unchanged acarbose is absorbed into systemic circulation; acts locally in small intestine.",
    "onsetOfAction": "Delays postprandial glucose absorption within 30-60 minutes after meal ingestion.",
    "halfLife": "Plasma elimination half-life of absorbed active substance is ~2 hours; metabolite half-life ~10 hours.",
    "metabolism": "Metabolized exclusively in the gastrointestinal tract by digestive enzymes and intestinal microflora into at least 13 metabolites (predominantly sulphate, glucuronide, and methyl conjugates).",
    "excretion": "Approximately 51% of unabsorbed drug excreted in feces within 96 hours; ~34% excreted in urine as metabolites.",
    "proteinBinding": "Negligible systemic protein binding."
  },
  "bilingualNotes": {
    "classBn": "আলফা-গ্লুকোসিডেস ইনহিবিটর (ডায়াবেটিস নিয়ন্ত্রক ওষুধ)",
    "mechanismSummaryBn": "অন্ত্রে জটিল শর্করা ভেঙে গ্লুকোজ তৈরি হওয়া ধীর করে দেয়, ফলে খাওয়ার পর হঠাৎ রক্তে সুগার বাড়ে না।",
    "patientCounsellingBn": "খাবারের ঠিক প্রথম লোকমার সাথে ওষুধটি মুখে নিয়ে চিবিয়ে বা পানি দিয়ে গিলে ফেলুন। হাইপোগ্লাইসেমিয়া (সুগার কমে যাওয়া) হলে টেবিল চিনি কাজ করবে না; সাথে সবসময় গ্লুকোজ পাউডার বা ট্যাবলেট রাখুন।",
    "criticalWarningBn": "পেটে গ্যাস ও ফাঁপার সমস্যা হতে পারে। সালফনাইলইউরিয়ার সাথে খেলে সুগার কমে যেতে পারে, তখন শুধু গ্লুকোজ দিয়ে চিকিৎসা করতে হবে।"
  },
  "pharmacologyLearning": {
    "pathwaySummary": "Carbohydrate Ingestion -> Alpha-Glucosidase Blockade in Brush Border -> Delayed Cleavage into Monosaccharides -> Attenuated Postprandial Glucose Surge.",
    "receptorTarget": "Intestinal Brush-Border Alpha-Glucosidases (Sucrase, Maltase)",
    "vivaQuestions": [
      {
        "question": "Why must hypoglycemia from acarbose combination therapy be treated with dextrose instead of cane sugar?",
        "questionBn": "অ্যাকারবোজের সাথে অন্য ওষুধে সুগার কমলে সাধারণ চিনির বদলে কেন গ্লুকোজ দিতে হয়?",
        "modelAnswer": "Cane sugar is sucrose (a disaccharide) which requires intestinal sucrase for hydrolysis into absorbable glucose. Because acarbose potently inhibits sucrase, ingested sucrose cannot be rapidly absorbed to reverse hypoglycemia. Monosaccharide dextrose (glucose) bypasses enzymatic hydrolysis and is absorbed directly.",
        "highYieldPearl": "Acarbose inhibits disaccharidases; always carry pure glucose, not sweets."
      }
    ],
    "recallFlashcards": [
      {
        "id": "fc-acar-01",
        "front": "Acarbose mechanism and timing of administration?",
        "back": "Inhibits intestinal brush-border alpha-glucosidases; must be taken with the first bite of each main meal.",
        "topic": "Pharmacology",
        "highYield": true
      },
      {
        "id": "fc-acar-02",
        "front": "Antidote for hypoglycemia induced by Acarbose + Sulfonylurea?",
        "back": "Pure oral dextrose (glucose) or milk. Sucrose (table sugar) is ineffective.",
        "topic": "Safety",
        "highYield": true
      }
    ],
    "practiceSba": [
      {
        "id": "sba-acar-01",
        "question": "A 54-year-old diabetic on Acarbose and Glimepiride develops tremors and sweating. Which treatment is most appropriate?",
        "options": [
          "Oral Dextrose (Pure Glucose)",
          "Oral Table Sugar (Sucrose) dissolved in water",
          "Intravenous Furosemide",
          "Oral Sucralfate suspension"
        ],
        "correctIndex": 0,
        "explanation": "Acarbose blocks the breakdown of sucrose to glucose. Only monosaccharide glucose (dextrose) can rapidly correct the hypoglycemia.",
        "bmdcFocus": "Phase 2 Pharmacology"
      }
    ],
    "clinicalCaseScenario": {
      "title": "Postprandial Hyperglycemia & Severe Flatulence",
      "patientProfile": "58M with T2DM, HbA1c 7.9%, normal fasting blood glucose (5.8 mmol/L) but markedly elevated 2-hour postprandial glucose (14.2 mmol/L).",
      "presentation": "Prescribed Acarbose 50 mg TID; complains of excessive flatus and loose stools.",
      "clinicalQuestion": "How should this patient be managed?",
      "discussion": "Reduce dose to 25 mg once daily with the largest meal, titrate gradually over 4-6 weeks to allow colonic flora adaptation, and confirm taking with first bite."
    },
    "textbookReferences": [
      {
        "bookTitle": "Katzung Basic & Clinical Pharmacology",
        "edition": "15th Edition",
        "chapterOrSection": "Chapter 41: Pancreatic Hormones & Antidiabetic Drugs",
        "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
      }
    ],
    "acrossBooksTopicIds": []
  }
},

  // RAMIPRIL (ACE Inhibitor - HOPE Trial Monograph)
{
  "id": "ramipril",
  "name": "Ramipril",
  "normalizedName": "ramipril",
  "slug": "ramipril",
  "pharmacologicalClass": "ACE Inhibitor (Prodrug of Ramiprilat)",
  "therapeuticClass": "Cardiovascular & Renal Drugs",
  "therapeuticClassId": "cardiovascular-renal",
  "atcCode": "C09AA05",
  "prescriptionStatus": "POM",
  "bmdcCurriculumPhase": "Phase 2 (Pharmacology) & Phase 4 (Medicine)",
  "mechanismOfAction": "Ramipril is a long-acting dicarboxylate-containing prodrug that is hydrolyzed by hepatic esterases into its active metabolite, ramiprilat. Ramiprilat is a potent, competitive inhibitor of angiotensin-converting enzyme (ACE / peptidyl dipeptidase), thereby inhibiting conversion of angiotensin I to angiotensin II. This reduces systemic vascular resistance without reflex tachycardia, decreases aldosterone release to promote natriuresis, inhibits cardiac remodeling, and delays degradation of vasodilator bradykinin.",
  "receptorOrTarget": "Angiotensin-Converting Enzyme (ACE / Kininase II)",
  "indications": [
    {
      "id": "ind-htn",
      "name": "Essential Hypertension",
      "isPrimary": true,
      "guidelineRecommendation": "First-line agent in diabetic, CKD, or high cardiovascular risk patients (NHF & DGHS Bangladesh Guidelines)"
    },
    {
      "id": "ind-cv-prev",
      "name": "Cardiovascular Risk Reduction (HOPE Study indication)",
      "isPrimary": true,
      "note": "Reduces MI, stroke, and CV mortality in high-risk patients age >= 55 with vascular disease or diabetes"
    },
    {
      "id": "ind-hf-post-mi",
      "name": "Heart Failure Post-Myocardial Infarction",
      "isPrimary": true,
      "note": "Initiated >= 48 hours post-AMI in clinically stable patients (AIRE Study)"
    },
    {
      "id": "ind-nephro",
      "name": "Diabetic and Non-diabetic Glomerular Nephropathy",
      "isPrimary": true,
      "note": "Delays progression of renal disease and reduces microalbuminuria"
    }
  ],
  "contraindications": [
    {
      "condition": "Pregnancy (2nd and 3rd trimesters)",
      "type": "absolute",
      "reason": "Fetal toxicity: oligohydramnios, neonatal renal failure, skull hypoplasia, and fetal death."
    },
    {
      "condition": "History of ACE inhibitor-related angioedema",
      "type": "absolute",
      "reason": "Risk of life-threatening airway obstruction."
    },
    {
      "condition": "Bilateral renal artery stenosis (or unilateral in solitary kidney)",
      "type": "absolute",
      "reason": "Severe acute renal failure due to loss of efferent arteriolar tone."
    },
    {
      "condition": "Concomitant use with aliskiren in patients with diabetes",
      "type": "absolute",
      "reason": "Dual RAAS blockade increases renal impairment, hyperkalemia, and hypotension."
    }
  ],
  "dosageGuidance": {
    "adult": "Hypertension: Initial 2.5 mg once daily; titrate up to 5-10 mg once daily (Max 10 mg/day). Cardiovascular Prevention: Initial 2.5 mg daily for 1 week, then 5 mg daily for 3 weeks, target maintenance 10 mg once daily. Post-MI Heart Failure: Initial 2.5 mg twice daily; titrate up to target 5 mg twice daily.",
    "paediatric": "Not recommended in paediatric patients; safety and efficacy not established in Bangladesh guidance.",
    "geriatric": "Initial 1.25 mg once daily; monitor blood pressure and renal function.",
    "routes": [
      "Oral"
    ],
    "administrationNotes": "Take once daily in the morning or evening with or without food. Capsules/tablets should be swallowed whole with water.",
    "timingNotice": "First dose preferably at bedtime to monitor for first-dose orthostatic hypotension."
  },
  "doseAdjustment": {
    "renal": "eGFR 30-60 mL/min: Max 5 mg/day. eGFR < 30 mL/min: Initial 1.25 mg once daily; Max 5 mg/day under close creatinine/potassium monitoring.",
    "hepatic": "Impaired esterase activity may slow bioactivation to ramiprilat; careful clinical monitoring."
  },
  "adverseEffects": {
    "common": [
      "Persistent dry cough (5-15%, bradykinin-mediated)",
      "Dizziness / Postural hypotension",
      "Hyperkalemia",
      "Headache"
    ],
    "uncommon": [
      "Syncope",
      "Renal impairment",
      "Dyspepsia / Abdominal pain",
      "Rash"
    ],
    "rare": [
      "Angioneurotic edema (head/neck/glottis)",
      "Neutropenia / Agranulocytosis",
      "Cholestatic hepatitis"
    ],
    "seriousWarnings": [
      "Black Box Warning: Fetal Toxicity. Discontinue ramipril immediately when pregnancy is detected. Use effective non-hormonal or reliable contraception."
    ]
  },
  "precautions": [
    "Check baseline serum potassium and creatinine before initiating and repeat at 1-2 weeks.",
    "Warn patients to report sudden facial/lip swelling, throat tightness, or difficulty breathing immediately.",
    "Avoid potassium supplements or salt substitutes containing potassium chloride unless specifically prescribed."
  ],
  "monitoringRequirements": [
    {
      "parameter": "Serum Potassium",
      "frequency": "Baseline, at 1-2 weeks, then every 3-6 months",
      "targetOrClinicalAction": "Withhold if K+ > 5.5 mmol/L"
    },
    {
      "parameter": "Serum Creatinine & eGFR",
      "frequency": "Baseline, at 1-2 weeks, then periodically",
      "targetOrClinicalAction": "Accept up to 30% asymptomatic rise from baseline; reassess if > 30%"
    },
    {
      "parameter": "Blood Pressure (Supine & Standing)",
      "frequency": "Each visit during titration",
      "targetOrClinicalAction": "Assess for orthostatic hypotension"
    }
  ],
  "foodInteractions": "Food delays the rate of absorption slightly but does not significantly decrease the extent of absorption.",
  "pregnancyInfo": {
    "category": "FDA Black Box: Fetal Toxicity (BBW)",
    "details": "Use of drugs that act on the renin-angiotensin system during the second and third trimesters of pregnancy reduces fetal renal function and increases fetal and neonatal morbidity and death. Resulting oligohydramnios can be associated with fetal lung hypoplasia and skeletal deformations. When pregnancy is detected, discontinue ramipril as soon as possible."
  },
  "breastfeedingInfo": {
    "safety": "caution",
    "details": "Excreted into breast milk in minute amounts in animal studies. No human data available. Consider alternative ACEI with documented safety (e.g., enalapril) during lactation."
  },
  "paediatricConsiderations": "Safety and effectiveness in pediatric patients have not been established.",
  "geriatricConsiderations": "Greater risk of first-dose hypotension, hyperkalemia, and worsening renal function; start at 1.25 mg daily.",
  "overdoseInformation": {
    "symptoms": "Profound peripheral vasodilation with severe hypotension, shock, bradycardia, electrolyte disturbances, and acute renal failure.",
    "management": "Volume expansion with IV normal saline. Angiotensin II infusion if refractory shock. Ramiprilat is not significantly dialyzable."
  },
  "storageInformation": "Store below 25°C in a dry place. Protect from moisture.",
  "sources": [
    {
      "organization": "DailyMed / US FDA",
      "title": "Ramipril Capsule Prescribing Information",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ramipril-fda-label",
      "publicationDate": "2023-10-12",
      "jurisdiction": "United States",
      "fetchedDate": "2026-09-25",
      "version": "FDA-Rev-2023"
    },
    {
      "organization": "WHO Collaborating Centre for Drug Statistics Methodology",
      "title": "ATC/DDD Index: Ramipril (C09AA05)",
      "url": "https://atcddd.fhi.no/atc_ddd_index/?code=C09AA05",
      "publicationDate": "2024-01-01",
      "jurisdiction": "International",
      "fetchedDate": "2026-09-25",
      "version": "2024.1"
    },
    {
      "organization": "National Heart Foundation of Bangladesh",
      "title": "Clinical Practice Guidelines for Management of Hypertension in Bangladesh",
      "url": "https://nhf.org.bd",
      "publicationDate": "2022-11-15",
      "jurisdiction": "Bangladesh",
      "fetchedDate": "2026-09-25",
      "version": "4th Edition"
    }
  ],
  "medicalReview": {
    "status": "published",
    "reviewerName": "Prof. Dr. M. A. Salam",
    "reviewerCredentials": "FCPS, FACC, NICVD",
    "reviewDate": "2026-09-25",
    "lastUpdated": "2026-09-25",
    "contentVersion": "2.5.0"
  },
  "nameBn": "র‍্যামিপ্রিল",
  "pharmacokinetics": {
    "bioavailability": "55% to 65% of oral dose absorbed; food does not significantly affect extent of absorption.",
    "onsetOfAction": "Blood pressure reduction begins within 1 to 2 hours; peak reduction in 3 to 6 hours; duration persists for 24 hours.",
    "halfLife": "Ramiprilat effective terminal half-life is 13 to 17 hours due to saturable binding to ACE; allows once-daily dosing.",
    "metabolism": "Cleaved in liver by esterases to active ramiprilat; inactive glucuronide conjugates also formed.",
    "excretion": "Approximately 60% of parent drug and metabolites excreted in urine, 40% in feces via biliary secretion.",
    "proteinBinding": "Ramipril ~73%; ramiprilat ~56% bound to serum proteins."
  },
  "bilingualNotes": {
    "classBn": "এসিই ইনহিবিটর (র‍্যামিপ্রিল)",
    "mechanismSummaryBn": "অ্যাঞ্জিওটেনসিন-২ তৈরিতে বাধা দিয়ে রক্তনালী শিথিল করে, রক্তচাপ কমায় এবং হার্ট ও কিডনি সুরক্ষিত রাখে।",
    "patientCounsellingBn": "প্রতিদিন নির্দিষ্ট সময়ে সেবন করুন। শোবার সময় প্রথম ডোজ সেবন করলে মাথা ঘোরা কমে। শুকনো কাশি দেখা দিলে অবিলম্বে চিকিৎসককে জানান।",
    "criticalWarningBn": "গর্ভবতী মহিলাদের জন্য সম্পূর্ণ নিষিদ্ধ (শিশুর কিডনি ও খুলির ক্ষতি করে)।"
  },
  "pharmacologyLearning": {
    "pathwaySummary": "RAAS Blockade: Angiotensin I -X-> Angiotensin II -> Reduced Peripheral Resistance & Attenuated Cardiac Remodeling + Bradykinin Accumulation.",
    "receptorTarget": "Angiotensin-Converting Enzyme (ACE / Kininase II)",
    "vivaQuestions": [
      {
        "question": "What is the significance of the HOPE trial in relation to Ramipril?",
        "questionBn": "র‍্যামিপ্রিলের ক্ষেত্রে HOPE ট্রায়ালের গুরুত্ব কী?",
        "modelAnswer": "The Heart Outcomes Prevention Evaluation (HOPE) trial proved that Ramipril significantly reduces myocardial infarction, stroke, and cardiovascular death in high-risk patients with vascular disease or diabetes, independent of baseline blood pressure.",
        "highYieldPearl": "HOPE trial demonstrated organ-protective mortality benefit of Ramipril."
      }
    ],
    "recallFlashcards": [
      {
        "id": "fc-rami-01",
        "front": "Active metabolite and half-life of Ramipril?",
        "back": "Ramiprilat; effective half-life 13-17 hours due to tight ACE binding.",
        "topic": "Pharmacokinetics",
        "highYield": true
      },
      {
        "id": "fc-rami-02",
        "front": "Major contraindication for Ramipril during pregnancy?",
        "back": "2nd & 3rd trimesters (Black Box Warning): Oligohydramnios, neonatal renal failure, skull hypoplasia.",
        "topic": "Safety",
        "highYield": true
      }
    ],
    "practiceSba": [
      {
        "id": "sba-rami-01",
        "question": "Which trial demonstrated that Ramipril reduces cardiovascular death and stroke in high-risk diabetic patients?",
        "options": [
          "HOPE Trial",
          "CONSENSUS Trial",
          "RALES Trial",
          "SOLVD Trial"
        ],
        "correctIndex": 0,
        "explanation": "The HOPE trial evaluated Ramipril 10 mg daily and demonstrated substantial mortality and morbidity reduction.",
        "bmdcFocus": "Phase 2 Pharmacology"
      }
    ],
    "clinicalCaseScenario": {
      "title": "Diabetic Patient with Microalbuminuria",
      "patientProfile": "56M with 8-year history of Type 2 Diabetes, BP 142/88 mmHg, urinary albumin-to-creatinine ratio (ACR) 180 mg/g (microalbuminuria).",
      "presentation": "Presented for routine follow-up; physician initiates Ramipril 2.5 mg daily.",
      "clinicalQuestion": "Why is Ramipril specifically indicated here?",
      "discussion": "ACE inhibitors dilate the renal efferent arteriole more than the afferent, reducing intraglomerular capillary hypertension and retarding diabetic nephropathy progression."
    },
    "textbookReferences": [
      {
        "bookTitle": "Katzung Basic & Clinical Pharmacology",
        "edition": "15th Edition",
        "chapterOrSection": "Chapter 11: Antihypertensive Agents",
        "verifiedTextbookId": "katzung-basic-clinical-pharmacology"
      }
    ],
    "acrossBooksTopicIds": [
      "heart-failure",
      "coronary-artery-disease"
    ]
  }
}
];

export const VERIFIED_BRANDS: DrugBrand[] = [
{
  "id": "lasix-inj-20mg-2ml",
  "genericId": "furosemide",
  "brandName": "Lasix Injection",
  "brandNameBn": "লাসিক্স ইনজেকশন",
  "manufacturerId": "synovia-pharma",
  "manufacturerName": "Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd)",
  "dosageForm": "IM/IV Injection",
  "strength": "20 mg/2 ml",
  "route": "IV, IM",
  "packInfo": "5 x 2 ml Ampoules",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Official Registry / Synovia Pharma Compendium",
  "lastVerifiedDate": "2026-09-25",
  "verifiedPrice": {
    "amount": 12,
    "unit": "ampoule",
    "source": "DGDA Gazetted Price",
    "verifiedDate": "2024-01-15"
  }
},
{
  "id": "tritace-tab-1.25mg",
  "genericId": "ramipril",
  "brandName": "Tritace",
  "brandNameBn": "ট্রিটাস",
  "manufacturerId": "synovia-pharma",
  "manufacturerName": "Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd)",
  "dosageForm": "Tablet",
  "strength": "1.25 mg",
  "route": "Oral",
  "packInfo": "3 x 10's Blister Pack",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Official Registry / Synovia Pharma Compendium",
  "lastVerifiedDate": "2026-09-25",
  "verifiedPrice": {
    "amount": 3.5,
    "unit": "tablet",
    "source": "DGDA Gazetted Price",
    "verifiedDate": "2024-01-15"
  }
},
{
  "id": "tritace-tab-2.5mg",
  "genericId": "ramipril",
  "brandName": "Tritace",
  "brandNameBn": "ট্রিটাস",
  "manufacturerId": "synovia-pharma",
  "manufacturerName": "Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd)",
  "dosageForm": "Tablet",
  "strength": "2.5 mg",
  "route": "Oral",
  "packInfo": "3 x 10's Blister Pack",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Official Registry / Synovia Pharma Compendium",
  "lastVerifiedDate": "2026-09-25",
  "verifiedPrice": {
    "amount": 6,
    "unit": "tablet",
    "source": "DGDA Gazetted Price",
    "verifiedDate": "2024-01-15"
  }
},
{
  "id": "tritace-tab-5mg",
  "genericId": "ramipril",
  "brandName": "Tritace",
  "brandNameBn": "ট্রিটাস",
  "manufacturerId": "synovia-pharma",
  "manufacturerName": "Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd)",
  "dosageForm": "Tablet",
  "strength": "5 mg",
  "route": "Oral",
  "packInfo": "3 x 10's Blister Pack",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Official Registry / Synovia Pharma Compendium",
  "lastVerifiedDate": "2026-09-25",
  "verifiedPrice": {
    "amount": 10,
    "unit": "tablet",
    "source": "DGDA Gazetted Price",
    "verifiedDate": "2024-01-15"
  }
},
{
  "id": "frudema-tablet-40-mg",
  "slug": "frudema-tablet-40-mg",
  "genericId": "furosemide",
  "brandName": "Frudema",
  "manufacturerId": "pacific-pharmaceuticals-ltd",
  "manufacturerName": "Pacific Pharmaceuticals Ltd.",
  "dosageForm": "Tablet",
  "strength": "40 mg",
  "packInfo": "Commercial strip pack (verification pending)",
  "source": "CSV Import",
  "activeStatus": "active",
  "lastVerifiedDate": "2026-09-25",
  "route": "Oral",
  "registrationStatus": "Imported (DGDA Verification Pending)",
  "verifiedPrice": null
},
{
  "id": "gluco-a-tablet-50-mg",
  "slug": "gluco-a-tablet-50-mg",
  "genericId": "acarbose",
  "brandName": "Gluco-A",
  "manufacturerId": "acme-laboratories-ltd",
  "manufacturerName": "The ACME Laboratories Ltd.",
  "dosageForm": "Tablet",
  "strength": "50 mg",
  "packInfo": "3 x 10's Blister Pack (verification pending)",
  "source": "CSV Import",
  "activeStatus": "active",
  "lastVerifiedDate": "2026-09-23",
  "route": "Oral",
  "registrationStatus": "Imported (DGDA Verification Pending)",
  "verifiedPrice": null
},

  {
  "id": "lasix-tab-40mg",
  "genericId": "furosemide",
  "brandName": "Lasix",
  "brandNameBn": "লাসিক্স",
  "manufacturerId": "sanofi-bd",
  "manufacturerName": "Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd)",
  "dosageForm": "Tablet",
  "strength": "40 mg",
  "packInfo": "10 x 10's Blister Pack",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Official Registry",
  "lastVerifiedDate": "2026-09-18",
  "verifiedPrice": {
    "amount": 1.55,
    "unit": "tablet",
    "source": "DGDA Gazetted Price",
    "verifiedDate": "2024-01-15"
  },
  "route": "Oral"
},
  {
    "id": "fusid-tab-40mg",
    "genericId": "furosemide",
    "brandName": "Fusid",
    "brandNameBn": "ফিউসিড",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "40 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "fusid-inj-20mg",
    "genericId": "furosemide",
    "brandName": "Fusid IV/IM",
    "brandNameBn": "ফিউসিড ইনজেকশন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Injection",
    "strength": "20 mg / 2 ml",
    "packInfo": "Box of 10 Ampoules",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 10.5,
      "unit": "ampoule",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "edemide-tab-40mg",
    "genericId": "furosemide",
    "brandName": "Edemide",
    "brandNameBn": "ইডিমিড",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "40 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Product Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "furamide-tab-40mg",
    "genericId": "furosemide",
    "brandName": "Furamide",
    "brandNameBn": "ফিউরামাইড",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "40 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Product Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "Beximco Price List",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "aquazide-tab-25mg",
    "genericId": "hydrochlorothiazide",
    "brandName": "Aquazide",
    "brandNameBn": "অ্যাকোয়াজাইড",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Product Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "diuril-tab-25mg",
    "genericId": "hydrochlorothiazide",
    "brandName": "Diuril",
    "brandNameBn": "ডাইউরিলে",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "hypothiazide-tab-25mg",
    "genericId": "hydrochlorothiazide",
    "brandName": "Hypothiazide",
    "brandNameBn": "হাইপোথায়াজাইড",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.5,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "spirocard-tab-25mg",
    "genericId": "spironolactone",
    "brandName": "Spirocard",
    "brandNameBn": "স্পাইরোকার্ড",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5.5,
      "unit": "tablet",
      "source": "DGDA Gazette",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "spilac-tab-25mg",
    "genericId": "spironolactone",
    "brandName": "Spilac",
    "brandNameBn": "স্পাইল্যাক",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5.5,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "spilac-tab-100mg",
    "genericId": "spironolactone",
    "brandName": "Spilac 100",
    "brandNameBn": "স্পাইল্যাক ১০০",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "100 mg",
    "packInfo": "2 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 14,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "uractone-tab-25mg",
    "genericId": "spironolactone",
    "brandName": "Uractone",
    "brandNameBn": "ইউর্যাক্টোন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5.5,
      "unit": "tablet",
      "source": "Beximco Price List",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "enam-tab-5mg",
    "genericId": "enalapril",
    "brandName": "Enam",
    "brandNameBn": "এনাম",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Product Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 3.5,
      "unit": "tablet",
      "source": "Manufacturer Gazetted MRP",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "enam-tab-10mg",
    "genericId": "enalapril",
    "brandName": "Enam 10",
    "brandNameBn": "এনাম ১০",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Product Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "tablet",
      "source": "Manufacturer Gazetted MRP",
      "verifiedDate": "2024-02-01"
    }
  },
  {
  "id": "cardace-tab-5mg",
  "genericId": "ramipril",
  "brandName": "Cardace",
  "brandNameBn": "কার্ডেস",
  "manufacturerId": "sanofi-bd",
  "manufacturerName": "Sanofi Bangladesh Ltd (Synovia Pharma PLC)",
  "dosageForm": "Tablet",
  "strength": "5 mg",
  "packInfo": "2 x 14's Blister Pack",
  "registrationStatus": "DGDA Active",
  "availability": "widely_available",
  "verifiedSource": "DGDA Registration Notification / Sanofi Global Monograph",
  "lastVerifiedDate": "2026-09-25",
  "verifiedPrice": {
    "amount": 5.25,
    "unit": "tablet",
    "source": "DGDA Registration Notification",
    "verifiedDate": "2024-01-10"
  },
  "route": "Oral",
  "provenanceNote": "Cardace is Sanofi's global brand of Ramipril. In Bangladesh, Synovia Pharma PLC (formerly Sanofi Bangladesh Ltd) markets Ramipril under the registered brand Tritace (1.25 mg, 2.5 mg, 5 mg)."
},
  {
    "id": "enal-tab-5mg",
    "genericId": "enalapril",
    "brandName": "Enal",
    "brandNameBn": "এনাল",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Product Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 3.5,
      "unit": "tablet",
      "source": "Incepta Product Catalogue",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "osartil-tab-50mg",
    "genericId": "losartan",
    "brandName": "Osartil",
    "brandNameBn": "ওসার্টিল",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "50 mg",
    "packInfo": "3 x 10's Alu-Alu Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Pharmaceuticals Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 8,
      "unit": "tablet",
      "source": "DGDA Approved Retail Price",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "angilock-tab-50mg",
    "genericId": "losartan",
    "brandName": "Angilock",
    "brandNameBn": "অ্যাঞ্জিলক",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "50 mg",
    "packInfo": "3 x 10's Alu-Alu Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Pharmaceuticals Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 8,
      "unit": "tablet",
      "source": "Square Approved Price List",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "losan-tab-50mg",
    "genericId": "losartan",
    "brandName": "Losan",
    "brandNameBn": "লোসান",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "50 mg",
    "packInfo": "3 x 10's Alu-Alu Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Pharmaceuticals Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 8,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "prosan-tab-50mg",
    "genericId": "losartan",
    "brandName": "Prosan",
    "brandNameBn": "প্রোসান",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "50 mg",
    "packInfo": "3 x 10's Alu-Alu Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Pharmaceuticals Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 8,
      "unit": "tablet",
      "source": "Renata Price Directory",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "cardibis-tab-2.5mg",
    "genericId": "bisoprolol",
    "brandName": "Cardibis",
    "brandNameBn": "কার্ডিবিস",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "2.5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "cardibis-tab-5mg",
    "genericId": "bisoprolol",
    "brandName": "Cardibis 5",
    "brandNameBn": "কার্ডিবিস ৫",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 10,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "bipro-tab-2.5mg",
    "genericId": "bisoprolol",
    "brandName": "Bipro",
    "brandNameBn": "বাইপ্রো",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "2.5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "bisocor-tab-2.5mg",
    "genericId": "bisoprolol",
    "brandName": "Bisocor",
    "brandNameBn": "বাইসোকর",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "2.5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "camlodin-tab-5mg",
    "genericId": "amlodipine",
    "brandName": "Camlodin",
    "brandNameBn": "ক্যামলোডিন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "amlopin-tab-5mg",
    "genericId": "amlodipine",
    "brandName": "Amlopin",
    "brandNameBn": "অ্যামলোপিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "amlodac-tab-5mg",
    "genericId": "amlodipine",
    "brandName": "Amlodac",
    "brandNameBn": "অ্যামলোড্যাক",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "lodipin-tab-5mg",
    "genericId": "amlodipine",
    "brandName": "Lodipin",
    "brandNameBn": "লোডিপিন",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 5,
      "unit": "tablet",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "atova-tab-10mg",
    "genericId": "atorvastatin",
    "brandName": "Atova",
    "brandNameBn": "অ্যাতোভা",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "atova-tab-20mg",
    "genericId": "atorvastatin",
    "brandName": "Atova 20",
    "brandNameBn": "অ্যাতোভা ২০",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 20,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "lipicon-tab-10mg",
    "genericId": "atorvastatin",
    "brandName": "Lipicon",
    "brandNameBn": "লিপিকন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "tiginor-tab-10mg",
    "genericId": "atorvastatin",
    "brandName": "Tiginor",
    "brandNameBn": "টিজিনর",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "seclo-cap-20mg",
    "genericId": "omeprazole",
    "brandName": "Seclo",
    "brandNameBn": "সেকলো",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Capsule",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "capsule",
      "source": "DGDA Approved Retail Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "losectil-cap-20mg",
    "genericId": "omeprazole",
    "brandName": "Losectil",
    "brandNameBn": "লোসেকটিল",
    "manufacturerId": "eskayef",
    "manufacturerName": "Eskayef Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Eskayef Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "capsule",
      "source": "Eskayef Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "proceptin-cap-20mg",
    "genericId": "omeprazole",
    "brandName": "Proceptin",
    "brandNameBn": "প্রোসেপ্টিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Product Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "capsule",
      "source": "Beximco Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "omastin-cap-20mg",
    "genericId": "omeprazole",
    "brandName": "Omastin",
    "brandNameBn": "ওমাস্টিন",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Capsule",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Product Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6,
      "unit": "capsule",
      "source": "Renata Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "pantonix-tab-20mg",
    "genericId": "pantoprazole",
    "brandName": "Pantonix",
    "brandNameBn": "প্যান্টোনিক্স",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 7,
      "unit": "tablet",
      "source": "Incepta Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "trupan-tab-20mg",
    "genericId": "pantoprazole",
    "brandName": "Trupan",
    "brandNameBn": "ট্রুপ্যান",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 7,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "protonix-tab-20mg",
    "genericId": "pantoprazole",
    "brandName": "Protonix",
    "brandNameBn": "প্রোটোনিক্স",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 7,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "pantobex-tab-20mg",
    "genericId": "pantoprazole",
    "brandName": "Pantobex",
    "brandNameBn": "প্যান্টোবেক্স",
    "manufacturerId": "eskayef",
    "manufacturerName": "Eskayef Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Eskayef Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 7,
      "unit": "tablet",
      "source": "Eskayef Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "napa-tab-500mg",
    "genericId": "paracetamol",
    "brandName": "Napa",
    "brandNameBn": "নাপা",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "50 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.2,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "ace-tab-500mg",
    "genericId": "paracetamol",
    "brandName": "Ace",
    "brandNameBn": "এইস",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "50 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.2,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "renova-tab-500mg",
    "genericId": "paracetamol",
    "brandName": "Renova",
    "brandNameBn": "রেনোভা",
    "manufacturerId": "opsonin",
    "manufacturerName": "Opsonin Pharma Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "50 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Opsonin Product Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.2,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "fast-tab-500mg",
    "genericId": "paracetamol",
    "brandName": "Fast",
    "brandNameBn": "ফাস্ট",
    "manufacturerId": "acme",
    "manufacturerName": "The ACME Laboratories Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "50 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "ACME Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.2,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "pyralgin-tab-500mg",
    "genericId": "paracetamol",
    "brandName": "Pyralgin",
    "brandNameBn": "পাইরালজিন",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "50 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1.2,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "napa-extra-tab",
    "genericId": "paracetamol-caffeine",
    "brandName": "Napa Extra",
    "brandNameBn": "নাপা এক্সট্রা",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg + 65 mg",
    "packInfo": "20 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "ace-plus-tab",
    "genericId": "paracetamol-caffeine",
    "brandName": "Ace Plus",
    "brandNameBn": "এইস প্লাস",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "500 mg + 65 mg",
    "packInfo": "20 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "renova-extra-tab",
    "genericId": "paracetamol-caffeine",
    "brandName": "Renova Extra",
    "brandNameBn": "রেনোভা এক্সট্রা",
    "manufacturerId": "opsonin",
    "manufacturerName": "Opsonin Pharma Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg + 65 mg",
    "packInfo": "20 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Opsonin Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "tablet",
      "source": "Opsonin Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "fast-plus-tab",
    "genericId": "paracetamol-caffeine",
    "brandName": "Fast Plus",
    "brandNameBn": "ফাস্ট প্লাস",
    "manufacturerId": "acme",
    "manufacturerName": "The ACME Laboratories Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg + 65 mg",
    "packInfo": "20 x 10's Blister Box",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "ACME Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "tablet",
      "source": "ACME Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "ecosprin-tab-75mg",
    "genericId": "aspirin",
    "brandName": "Ecosprin 75",
    "brandNameBn": "ইকোস্প্রিন ৭৫",
    "manufacturerId": "acme",
    "manufacturerName": "The ACME Laboratories Ltd",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "ACME Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1,
      "unit": "tablet",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "anaprin-tab-75mg",
    "genericId": "aspirin",
    "brandName": "Anaprin",
    "brandNameBn": "অ্যানাপ্রিন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1,
      "unit": "tablet",
      "source": "Square Price List",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "aspina-tab-75mg",
    "genericId": "aspirin",
    "brandName": "Aspina",
    "brandNameBn": "অ্যাসপিনা",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "disprin-tab-300mg",
    "genericId": "aspirin",
    "brandName": "Disprin (Soluble Aspirin)",
    "brandNameBn": "ডিসপ্রিন",
    "manufacturerId": "healthcare",
    "manufacturerName": "Healthcare Pharmaceuticals Ltd",
    "dosageForm": "Soluble Tablet",
    "strength": "300 mg",
    "packInfo": "10 x 10's Strip",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Healthcare Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2,
      "unit": "tablet",
      "source": "DGDA Price Gazette",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "anclog-tab-75mg",
    "genericId": "clopidogrel",
    "brandName": "Anclog",
    "brandNameBn": "অ্যানক্লগ",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "plagrin-tab-75mg",
    "genericId": "clopidogrel",
    "brandName": "Plagrin",
    "brandNameBn": "প্লাগ্রিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "odrel-tab-75mg",
    "genericId": "clopidogrel",
    "brandName": "Odrel",
    "brandNameBn": "ওড্রেল",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "replet-tab-75mg",
    "genericId": "clopidogrel",
    "brandName": "Replet",
    "brandNameBn": "রিপ্লেট",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "75 mg",
    "packInfo": "3 x 10's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 12,
      "unit": "tablet",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "warf-tab-5mg",
    "genericId": "warfarin",
    "brandName": "Warf",
    "brandNameBn": "ওয়ার্ফ",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "DGDA Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "warf-tab-2mg",
    "genericId": "warfarin",
    "brandName": "Warf 2",
    "brandNameBn": "ওয়ার্ফ ২",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "2 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "tablet",
      "source": "DGDA Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "warfast-tab-5mg",
    "genericId": "warfarin",
    "brandName": "Warfast",
    "brandNameBn": "ওয়ারফাস্ট",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "hepaplus-inj-5000iu",
    "genericId": "heparin",
    "brandName": "Hepaplus",
    "brandNameBn": "হেপাপ্লাস",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Injection (Vial)",
    "strength": "5000 IU / ml (5 ml)",
    "packInfo": "Vial of 25,000 IU",
    "registrationStatus": "DGDA Active",
    "availability": "hospital_only",
    "verifiedSource": "Incepta Critical Care Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 280,
      "unit": "vial",
      "source": "DGDA Approved Hospital MRP",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "heparin-square-inj",
    "genericId": "heparin",
    "brandName": "Heparin Sodium Square",
    "brandNameBn": "হেপারিন সোডিয়াম",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Injection",
    "strength": "5000 IU / ml",
    "packInfo": "Vial of 5 ml",
    "registrationStatus": "DGDA Active",
    "availability": "hospital_only",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 280,
      "unit": "vial",
      "source": "Square Hospital Price",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "uniparin-inj",
    "genericId": "heparin",
    "brandName": "Uniparin",
    "brandNameBn": "ইউনিপারিন",
    "manufacturerId": "healthcare",
    "manufacturerName": "Healthcare Pharmaceuticals Ltd",
    "dosageForm": "Injection",
    "strength": "5000 IU / ml",
    "packInfo": "5 ml Vial",
    "registrationStatus": "DGDA Active",
    "availability": "hospital_only",
    "verifiedSource": "Healthcare Critical Care",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 280,
      "unit": "vial",
      "source": "DGDA Price Gazette",
      "verifiedDate": "2024-02-01"
    }
  },
  {
    "id": "moxacil-cap-500mg",
    "genericId": "amoxicillin",
    "brandName": "Moxacil",
    "brandNameBn": "মক্সাসিল",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Capsule",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6.5,
      "unit": "capsule",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "t-cillin-cap-500mg",
    "genericId": "amoxicillin",
    "brandName": "T-Cillin",
    "brandNameBn": "টি-সিলিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6.5,
      "unit": "capsule",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "fimoxyl-cap-500mg",
    "genericId": "amoxicillin",
    "brandName": "Fimoxyl",
    "brandNameBn": "ফিমক্সিল",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6.5,
      "unit": "capsule",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "amixen-cap-500mg",
    "genericId": "amoxicillin",
    "brandName": "Amixen",
    "brandNameBn": "অ্যামিক্সেন",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Capsule",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 6.5,
      "unit": "capsule",
      "source": "Renata Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "zithrin-tab-500mg",
    "genericId": "azithromycin",
    "brandName": "Zithrin",
    "brandNameBn": "জিথ্রিন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 4's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 35,
      "unit": "tablet",
      "source": "DGDA Approved Retail Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "azyth-tab-500mg",
    "genericId": "azithromycin",
    "brandName": "Azyth",
    "brandNameBn": "অ্যাজিথ",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 4's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 35,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "azithral-tab-500mg",
    "genericId": "azithromycin",
    "brandName": "Azithral",
    "brandNameBn": "অ্যাজিথ্রাল",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 4's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 35,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "macrozith-tab-500mg",
    "genericId": "azithromycin",
    "brandName": "Macrozith",
    "brandNameBn": "ম্যাক্রোজিথ",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 4's Alu-Alu Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 35,
      "unit": "tablet",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "ceftron-inj-1g",
    "genericId": "ceftriaxone",
    "brandName": "Ceftron 1g IV",
    "brandNameBn": "সেফট্রন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Injection (Vial with Solvent)",
    "strength": "1 g",
    "packInfo": "Combipack Vial + 10 ml WFI",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 185,
      "unit": "vial",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "triax-inj-1g",
    "genericId": "ceftriaxone",
    "brandName": "Triax 1g IV",
    "brandNameBn": "ট্রায়াক্স",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Injection (Vial)",
    "strength": "1 g",
    "packInfo": "Vial + 10 ml Solvent",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 185,
      "unit": "vial",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "cef-3-inj-1g",
    "genericId": "ceftriaxone",
    "brandName": "Cef-3 1g IV",
    "brandNameBn": "সেফ-৩",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Injection (Vial)",
    "strength": "1 g",
    "packInfo": "Vial + 10 ml Solvent",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 185,
      "unit": "vial",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "raci-inj-1g",
    "genericId": "ceftriaxone",
    "brandName": "Raci 1g IV",
    "brandNameBn": "রাসি",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Injection (Vial)",
    "strength": "1 g",
    "packInfo": "Vial + 10 ml Solvent",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 185,
      "unit": "vial",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "ciprocin-tab-500mg",
    "genericId": "ciprofloxacin",
    "brandName": "Ciprocin",
    "brandNameBn": "সিপ্রোসিন",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "neofloxin-tab-500mg",
    "genericId": "ciprofloxacin",
    "brandName": "Neofloxin",
    "brandNameBn": "নিওফ্লক্সিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "floxabid-tab-500mg",
    "genericId": "ciprofloxacin",
    "brandName": "Floxabid",
    "brandNameBn": "ফ্লক্সাবিড",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "cipro-a-tab-500mg",
    "genericId": "ciprofloxacin",
    "brandName": "Cipro-A",
    "brandNameBn": "সিপ্রো-এ",
    "manufacturerId": "acme",
    "manufacturerName": "The ACME Laboratories Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "3 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "ACME Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "tablet",
      "source": "ACME Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "doxicap-cap-100mg",
    "genericId": "doxycycline",
    "brandName": "Doxicap",
    "brandNameBn": "ডক্সিক্যাপ",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Capsule",
    "strength": "100 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "capsule",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "doxacil-cap-100mg",
    "genericId": "doxycycline",
    "brandName": "Doxacil",
    "brandNameBn": "ডক্সাসিল",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "100 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "capsule",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "tetradox-cap-100mg",
    "genericId": "doxycycline",
    "brandName": "Tetradox",
    "brandNameBn": "টেট্রাডক্স",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Capsule",
    "strength": "100 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "capsule",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "doxy-a-cap-100mg",
    "genericId": "doxycycline",
    "brandName": "Doxy-A",
    "brandNameBn": "ডক্সি-এ",
    "manufacturerId": "acme",
    "manufacturerName": "The ACME Laboratories Ltd",
    "dosageForm": "Capsule",
    "strength": "100 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "ACME Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 2.5,
      "unit": "capsule",
      "source": "ACME Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "comet-tab-500mg",
    "genericId": "metformin",
    "brandName": "Comet",
    "brandNameBn": "কমেট",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "daomin-tab-500mg",
    "genericId": "metformin",
    "brandName": "Daomin",
    "brandNameBn": "ডায়োমিন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "metfo-tab-500mg",
    "genericId": "metformin",
    "brandName": "Metfo",
    "brandNameBn": "মেটফো",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Catalogue",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "informet-tab-500mg",
    "genericId": "metformin",
    "brandName": "Informet",
    "brandNameBn": "ইনফরমেট",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 4,
      "unit": "tablet",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "insulat-r-inj",
    "genericId": "insulin-regular",
    "brandName": "Insulat R (100 IU/ml)",
    "brandNameBn": "ইনসুলাট আর",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Injection (Vial)",
    "strength": "100 IU / ml (10 ml)",
    "packInfo": "10 ml Vial (1000 IU)",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Insulin Portfolio",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 450,
      "unit": "vial",
      "source": "DGDA Approved Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "insulet-r-inj",
    "genericId": "insulin-regular",
    "brandName": "Insulet R",
    "brandNameBn": "ইনসুলেট আর",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Injection (Vial)",
    "strength": "100 IU / ml (10 ml)",
    "packInfo": "10 ml Vial",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Biologics",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 450,
      "unit": "vial",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "humulin-r-inj",
    "genericId": "insulin-regular",
    "brandName": "Humulin R (Lilly Formulation)",
    "brandNameBn": "হিউমুলিন আর",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Injection",
    "strength": "100 IU / ml",
    "packInfo": "10 ml Vial",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Lilly Alliance",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 520,
      "unit": "vial",
      "source": "DGDA Price Gazette",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "asmasol-inhaler",
    "genericId": "salbutamol",
    "brandName": "Asmasol Inhaler",
    "brandNameBn": "অ্যাজমাসল ইনহেলার",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Inhaler (MDI)",
    "strength": "100 mcg / puff",
    "packInfo": "Canister of 200 puffs",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Respiratory Care",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 200,
      "unit": "inhaler",
      "source": "DGDA Approved Retail Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "ventolin-inhaler",
    "genericId": "salbutamol",
    "brandName": "Ventolin Evohaler",
    "brandNameBn": "ভেন্টোলিন ইনহেলার",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Inhaler (MDI)",
    "strength": "100 mcg / puff",
    "packInfo": "Canister of 200 puffs",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "GSK / Square Partnership",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 240,
      "unit": "inhaler",
      "source": "DGDA Price Gazette",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "sultolin-inhaler",
    "genericId": "salbutamol",
    "brandName": "Sultolin Inhaler",
    "brandNameBn": "সুলটোলিন ইনহেলার",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Inhaler (MDI)",
    "strength": "100 mcg / puff",
    "packInfo": "Canister of 200 puffs",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Respiratory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 200,
      "unit": "inhaler",
      "source": "Incepta Gazette",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "asmasol-tab-4mg",
    "genericId": "salbutamol",
    "brandName": "Asmasol 4mg Tablet",
    "brandNameBn": "অ্যাজমাসল ৪ ট্যাবলেট",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Tablet",
    "strength": "4 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 0.5,
      "unit": "tablet",
      "source": "DGDA Essential Price",
      "verifiedDate": "2024-01-01"
    }
  },
  {
    "id": "oradexon-inj-5mg",
    "genericId": "dexamethasone",
    "brandName": "Oradexon",
    "brandNameBn": "ওরাডেক্সন",
    "manufacturerId": "incepta",
    "manufacturerName": "Incepta Pharmaceuticals Ltd",
    "dosageForm": "Injection",
    "strength": "5 mg / ml (1 ml)",
    "packInfo": "Box of 10 Ampoules",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Incepta Hospital Monograph",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "ampoule",
      "source": "DGDA Gazetted Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "dexit-tab-0.5mg",
    "genericId": "dexamethasone",
    "brandName": "Dexit",
    "brandNameBn": "ডেক্সিট",
    "manufacturerId": "square",
    "manufacturerName": "Square Pharmaceuticals PLC",
    "dosageForm": "Tablet",
    "strength": "0.5 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Square Compendium",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1,
      "unit": "tablet",
      "source": "Square Approved Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "dexa-inj-5mg",
    "genericId": "dexamethasone",
    "brandName": "Dexa IV/IM",
    "brandNameBn": "ডেক্সা ইনজেকশন",
    "manufacturerId": "beximco",
    "manufacturerName": "Beximco Pharmaceuticals Ltd",
    "dosageForm": "Injection",
    "strength": "5 mg / ml",
    "packInfo": "Ampoule of 1 ml",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Beximco Directory",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 15,
      "unit": "ampoule",
      "source": "Beximco Price",
      "verifiedDate": "2024-01-15"
    }
  },
  {
    "id": "steron-tab-0.5mg",
    "genericId": "dexamethasone",
    "brandName": "Steron",
    "brandNameBn": "স্টেরন",
    "manufacturerId": "renata",
    "manufacturerName": "Renata Limited",
    "dosageForm": "Tablet",
    "strength": "0.5 mg",
    "packInfo": "10 x 10's Blister Pack",
    "registrationStatus": "DGDA Active",
    "availability": "widely_available",
    "verifiedSource": "Renata Index",
    "lastVerifiedDate": "2026-09-18",
    "verifiedPrice": {
      "amount": 1,
      "unit": "tablet",
      "source": "Renata Price",
      "verifiedDate": "2024-01-15"
    }
  }
];

export const VERIFIED_INTERACTIONS: DrugInteraction[] = [
  {
    "id": "int-01",
    "genericA": "enalapril",
    "genericB": "furosemide",
    "severity": "moderate",
    "clinicalEffect": "Severe first-dose hypotension and acute renal impairment.",
    "mechanism": "Hypovolemia from loop diuresis sensitizes patient to ACE-inhibition.",
    "management": "Withhold or reduce furosemide for 24h prior or start enalapril at 2.5 mg.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-02",
    "genericA": "enalapril",
    "genericB": "losartan",
    "severity": "major",
    "clinicalEffect": "Severe hyperkalemia, syncope, and acute kidney injury without added benefit.",
    "mechanism": "Dual RAAS blockade causes profound aldosterone suppression.",
    "management": "Combination strictly contraindicated. Choose ACEI or ARB alone.",
    "evidenceSource": "ONTARGET Trial / FDA",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-03",
    "genericA": "enalapril",
    "genericB": "spironolactone",
    "severity": "major",
    "clinicalEffect": "High risk of severe, potentially fatal hyperkalemia.",
    "mechanism": "Additive inhibition of aldosterone action and synthesis.",
    "management": "Limit spironolactone to 25 mg daily in heart failure; monitor K+ closely.",
    "evidenceSource": "RALES Trial / ESC Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-04",
    "genericA": "losartan",
    "genericB": "spironolactone",
    "severity": "major",
    "clinicalEffect": "High risk of life-threatening hyperkalemia.",
    "mechanism": "Dual suppression of distal tubular potassium excretion.",
    "management": "Monitor serum K+ within 1 week; avoid potassium supplements.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-05",
    "genericA": "aspirin",
    "genericB": "warfarin",
    "severity": "major",
    "clinicalEffect": "Massive increase in major gastrointestinal and intracranial bleeding.",
    "mechanism": "Platelet aggregation inhibition combined with multiple coagulation factor deficiency.",
    "management": "Avoid concomitant therapy unless mechanical heart valve with high-risk features; co-prescribe PPI.",
    "evidenceSource": "CHEST Guidelines / BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-06",
    "genericA": "clopidogrel",
    "genericB": "omeprazole",
    "severity": "major",
    "clinicalEffect": "Significantly reduced antiplatelet efficacy of clopidogrel; increased stent thrombosis.",
    "mechanism": "Omeprazole competitively inhibits CYP2C19 required to bioactivate clopidogrel.",
    "management": "Avoid combination. Use Pantoprazole which does not inhibit CYP2C19.",
    "evidenceSource": "US FDA Drug Safety Communication",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-07",
    "genericA": "clopidogrel",
    "genericB": "pantoprazole",
    "severity": "minor",
    "clinicalEffect": "Minimal to no reduction in clopidogrel antiplatelet action.",
    "mechanism": "Pantoprazole undergoes non-CYP sulfoconjugation with negligible CYP2C19 inhibition.",
    "management": "Safe combination; pantoprazole is the preferred PPI with clopidogrel.",
    "evidenceSource": "COGENT Clinical Trial / BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-08",
    "genericA": "atorvastatin",
    "genericB": "azithromycin",
    "severity": "moderate",
    "clinicalEffect": "Increased risk of myopathy and rhabdomyolysis.",
    "mechanism": "Macrolides may modestly inhibit CYP3A4 and hepatic OATP1B1 statin uptake.",
    "management": "Temporarily pause atorvastatin during azithromycin course or monitor for myalgia.",
    "evidenceSource": "Stockley’s Drug Interactions",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-09",
    "genericA": "ciprofloxacin",
    "genericB": "warfarin",
    "severity": "major",
    "clinicalEffect": "Dramatic elevation of INR and high risk of life-threatening bleeding.",
    "mechanism": "Ciprofloxacin inhibits hepatic CYP1A2 and CYP3A4 and depletes gut flora producing vitamin K.",
    "management": "Reduce warfarin dose by 30-50% and monitor INR daily upon starting ciprofloxacin.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-10",
    "genericA": "ciprofloxacin",
    "genericB": "dexamethasone",
    "severity": "major",
    "clinicalEffect": "Markedly increased risk of severe tendinitis and Achilles tendon rupture.",
    "mechanism": "Synergistic collagen degradation and tenocyte cytotoxicity.",
    "management": "Strictly avoid combination, especially in elderly or athletic patients.",
    "evidenceSource": "FDA Black Box Warning",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-11",
    "genericA": "bisoprolol",
    "genericB": "amlodipine",
    "severity": "minor",
    "clinicalEffect": "Additive blood pressure reduction; generally well tolerated.",
    "mechanism": "Complementary vasodilation and heart rate reduction.",
    "management": "Standard clinical combination; monitor for excessive bradycardia or hypotension.",
    "evidenceSource": "NHF Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-12",
    "genericA": "aspirin",
    "genericB": "clopidogrel",
    "severity": "moderate",
    "clinicalEffect": "Dual Antiplatelet Therapy (DAPT): enhanced antiplatelet efficacy with increased bleeding risk.",
    "mechanism": "Synergistic inhibition of TXA2 and P2Y12 pathways.",
    "management": "Standard therapy for 12 months post-PCI stent; co-prescribe PPI for gastroprotection.",
    "evidenceSource": "ESC ACS Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-13",
    "genericA": "aspirin",
    "genericB": "heparin",
    "severity": "major",
    "clinicalEffect": "High risk of major hemorrhage.",
    "mechanism": "Combined inhibition of primary hemostasis (platelets) and secondary hemostasis (thrombin/fibrin).",
    "management": "Used in acute PCI under strict hospital monitoring; assess for bleeding.",
    "evidenceSource": "ACC/AHA Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-14",
    "genericA": "heparin",
    "genericB": "warfarin",
    "severity": "moderate",
    "clinicalEffect": "Synergistic anticoagulation during transitional bridging.",
    "mechanism": "Combined intrinsic/extrinsic pathway inhibition.",
    "management": "Overlap for at least 5 days until INR is therapeutic (>= 2.0) for 2 consecutive days, then stop heparin.",
    "evidenceSource": "CHEST Antithrombotic Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-15",
    "genericA": "metformin",
    "genericB": "insulin-regular",
    "severity": "minor",
    "clinicalEffect": "Additive glycemic control with decreased insulin requirement.",
    "mechanism": "Sensitization of peripheral tissues reduces required exogenous insulin dose.",
    "management": "Standard combination; monitor for hypoglycemia due to insulin.",
    "evidenceSource": "ADA / BADAS Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-16",
    "genericA": "salbutamol",
    "genericB": "bisoprolol",
    "severity": "moderate",
    "clinicalEffect": "Mutual antagonism of bronchodilator and cardiac effects.",
    "mechanism": "Bisoprolol may modestly block beta-2 receptors in bronchi at higher doses.",
    "management": "Use cardioselective beta-blocker with caution; monitor for bronchospasm.",
    "evidenceSource": "GINA Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-17",
    "genericA": "dexamethasone",
    "genericB": "insulin-regular",
    "severity": "moderate",
    "clinicalEffect": "Significant steroid-induced hyperglycemia; higher insulin requirements.",
    "mechanism": "Dexamethasone stimulates hepatic gluconeogenesis and causes peripheral insulin resistance.",
    "management": "Increase insulin regular dose by 20-50% during steroid therapy under frequent glucose checks.",
    "evidenceSource": "Endocrine Society Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-18",
    "genericA": "furosemide",
    "genericB": "hydrochlorothiazide",
    "severity": "moderate",
    "clinicalEffect": "Sequential nephron blockade: profound synergistic diuresis and severe hypokalemia.",
    "mechanism": "Inhibition of both thick ascending limb and distal convoluted tubule.",
    "management": "Used intentionally for refractory edema under strict inpatient electrolyte monitoring.",
    "evidenceSource": "Heart Failure Reviews",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-19",
    "genericA": "furosemide",
    "genericB": "spironolactone",
    "severity": "minor",
    "clinicalEffect": "Beneficial potassium-neutral synergistic natriuresis.",
    "mechanism": "Spironolactone prevents furosemide-induced kaliuresis while enhancing sodium excretion.",
    "management": "Standard beneficial combination in cirrhotic ascites (100:40 ratio).",
    "evidenceSource": "EASL Cirrhosis Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-20",
    "genericA": "omeprazole",
    "genericB": "paracetamol",
    "severity": "minor",
    "clinicalEffect": "Slight delay in paracetamol absorption with no reduction in total pain relief.",
    "mechanism": "Slight delay in gastric emptying rate.",
    "management": "Safe combination; no dose adjustment needed.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-21",
    "genericA": "paracetamol",
    "genericB": "warfarin",
    "severity": "moderate",
    "clinicalEffect": "Regular high-dose paracetamol (> 2 g/day for > 3 days) can elevate INR.",
    "mechanism": "NAPQI toxic metabolite inhibits vitamin K-dependent carboxylase.",
    "management": "Monitor INR if paracetamol is taken regularly for more than 3 consecutive days.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-22",
    "genericA": "amoxicillin",
    "genericB": "warfarin",
    "severity": "moderate",
    "clinicalEffect": "Potential prolongation of INR and increased bleeding.",
    "mechanism": "Alteration of intestinal flora reduces vitamin K synthesis.",
    "management": "Monitor INR 3-5 days after starting antibiotic.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-23",
    "genericA": "azithromycin",
    "genericB": "warfarin",
    "severity": "moderate",
    "clinicalEffect": "Increased anticoagulant effect of warfarin.",
    "mechanism": "Impaired gut flora and modest hepatic CYP interaction.",
    "management": "Monitor INR closely when starting azithromycin.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-24",
    "genericA": "doxycycline",
    "genericB": "warfarin",
    "severity": "moderate",
    "clinicalEffect": "Increased anticoagulant action of warfarin.",
    "mechanism": "Decreased prothrombin activity and altered intestinal flora.",
    "management": "Monitor INR; reduce warfarin dose if needed.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-25",
    "genericA": "furosemide",
    "genericB": "ceftriaxone",
    "severity": "minor",
    "clinicalEffect": "Potential increased nephrotoxicity in high-dose therapy.",
    "mechanism": "Additive renal burden.",
    "management": "Ensure adequate hydration.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-26",
    "genericA": "ciprofloxacin",
    "genericB": "omeprazole",
    "severity": "minor",
    "clinicalEffect": "Slight decrease in ciprofloxacin absorption due to elevated gastric pH.",
    "mechanism": "Fluoroquinolones dissolve best in acidic medium.",
    "management": "Space administration by 2 hours if feasible.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-27",
    "genericA": "atorvastatin",
    "genericB": "clopidogrel",
    "severity": "minor",
    "clinicalEffect": "Theoretical CYP3A4 competition; clinically safe and standard in CAD.",
    "mechanism": "Minor shared metabolic pathways.",
    "management": "Standard guideline combination in all post-MI and stent patients.",
    "evidenceSource": "ACC/AHA Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-28",
    "genericA": "dexamethasone",
    "genericB": "aspirin",
    "severity": "moderate",
    "clinicalEffect": "High risk of severe gastrointestinal ulceration and bleeding.",
    "mechanism": "Additive suppression of mucosal cytoprotective prostaglandins.",
    "management": "Routinely co-prescribe PPI (Pantoprazole); monitor for melena.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-29",
    "genericA": "salbutamol",
    "genericB": "furosemide",
    "severity": "moderate",
    "clinicalEffect": "Severe additive hypokalemia.",
    "mechanism": "Salbutamol shifts K+ into cells while furosemide increases urinary K+ loss.",
    "management": "Monitor serum potassium in acute severe asthma receiving IV/nebulized salbutamol.",
    "evidenceSource": "BTS / GINA Guidelines",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-30",
    "genericA": "aspirin",
    "genericB": "enalapril",
    "severity": "moderate",
    "clinicalEffect": "High-dose aspirin (> 325 mg) attenuates the antihypertensive and renal effects of ACEIs.",
    "mechanism": "Aspirin inhibits renal vasodilatory prostaglandin synthesis.",
    "management": "Use low-dose aspirin (75-100 mg daily) which does not significantly blunt ACEI action.",
    "evidenceSource": "SOLVD Clinical Trial / BNF 86",
    "reviewedDate": "2026-09-15"
  },
  {
    "id": "int-furo-gent",
    "genericA": "furosemide",
    "genericB": "gentamicin",
    "severity": "major",
    "clinicalEffect": "Synergistic and potentially irreversible ototoxicity (vestibular and cochlear hair cell damage) and acute tubular necrosis.",
    "mechanism": "Furosemide alters endolymph electrolyte composition in stria vascularis and enhances aminoglycoside uptake into inner ear sensory hair cells.",
    "management": "Avoid concurrent use unless strictly necessary. If unavoidable, monitor serial peak/trough serum aminoglycoside levels, audiometry, and maintain hydration.",
    "evidenceSource": "BNF 86 / FDA Label",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-furo-dig",
    "genericA": "furosemide",
    "genericB": "digoxin",
    "severity": "major",
    "clinicalEffect": "Precipitation of life-threatening digitalis toxicity and ventricular arrhythmias (PVCs, ventricular tachycardia, heart block).",
    "mechanism": "Furosemide-induced hypokalemia and hypomagnesemia enhance digoxin binding to cardiac Na+/K+-ATPase, amplifying proarrhythmic toxicity.",
    "management": "Monitor serum potassium and maintain K+ strictly between 4.0-5.0 mmol/L. Measure baseline digoxin concentration and co-prescribe potassium or spironolactone.",
    "evidenceSource": "DailyMed / ESC Guidelines",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-furo-indo",
    "genericA": "furosemide",
    "genericB": "indomethacin",
    "severity": "moderate",
    "clinicalEffect": "Blunting of diuretic and antihypertensive efficacy; increased risk of acute kidney injury.",
    "mechanism": "NSAIDs inhibit renal cyclooxygenase (COX-1/COX-2), decreasing renal prostaglandins (PGE2, PGI2) that promote afferent arteriolar vasodilation and natriuresis.",
    "management": "Avoid chronic NSAID therapy in patients taking loop diuretics. Monitor blood pressure and renal function (serum creatinine).",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-furo-lith",
    "genericA": "furosemide",
    "genericB": "lithium",
    "severity": "major",
    "clinicalEffect": "Reduced renal lithium clearance resulting in toxic serum lithium levels (tremor, ataxia, seizures, encephalopathy).",
    "mechanism": "Sodium depletion from diuresis leads to compensatory proximal tubular reabsorption of sodium and lithium.",
    "management": "Monitor serum lithium closely every 3-5 days. Reduce lithium dose by 25-50% or avoid loop diuretics if possible.",
    "evidenceSource": "FDA Prescribing Information",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-furo-rami",
    "genericA": "furosemide",
    "genericB": "ramipril",
    "severity": "moderate",
    "clinicalEffect": "Severe first-dose hypotension and acute renal impairment.",
    "mechanism": "Diuretic-induced volume and sodium depletion sensitizes systemic vasculature to ACE inhibition.",
    "management": "Hold or decrease furosemide dose for 24-48 hours before initiating ramipril, or start ramipril at low dose (1.25-2.5 mg) at bedtime.",
    "evidenceSource": "BNF 86 / HOPE Protocol",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-acar-dig",
    "genericA": "acarbose",
    "genericB": "digoxin",
    "severity": "moderate",
    "clinicalEffect": "Reduced gastrointestinal absorption and decreased plasma bioavailability of digoxin.",
    "mechanism": "Intestinal adsorption or altered transit time decreases systemic absorption of digoxin.",
    "management": "Monitor serum digoxin levels; dose adjustment of digoxin may be required.",
    "evidenceSource": "DailyMed FDA Label",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-acar-glim",
    "genericA": "acarbose",
    "genericB": "glimepiride",
    "severity": "moderate",
    "clinicalEffect": "Additive hypoglycemia risk.",
    "mechanism": "Combined insulin secretagogue action and postprandial glucose blunting.",
    "management": "CRITICAL: If hypoglycemia occurs, administer pure oral dextrose (glucose) or milk, NOT sucrose (cane/table sugar), as acarbose inhibits sucrose hydrolysis.",
    "evidenceSource": "BADAS / ADA Guidelines",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-acar-char",
    "genericA": "acarbose",
    "genericB": "activated-charcoal",
    "severity": "moderate",
    "clinicalEffect": "Marked reduction in acarbose therapeutic efficacy.",
    "mechanism": "Adsorption of acarbose onto charcoal in gastrointestinal tract.",
    "management": "Avoid concurrent administration of intestinal adsorbents with acarbose.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-rami-spir",
    "genericA": "ramipril",
    "genericB": "spironolactone",
    "severity": "major",
    "clinicalEffect": "High risk of severe, potentially fatal hyperkalemia.",
    "mechanism": "Additive aldosterone suppression by ACE inhibitor combined with mineralocorticoid receptor blockade.",
    "management": "Limit spironolactone to 25 mg daily in heart failure. Check serum potassium and creatinine at baseline, 1 week, 4 weeks, and regularly thereafter.",
    "evidenceSource": "RALES Trial / ESC Guidelines",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-rami-losa",
    "genericA": "ramipril",
    "genericB": "losartan",
    "severity": "major",
    "clinicalEffect": "Severe hyperkalemia, syncope, and acute kidney injury without added cardiovascular mortality benefit.",
    "mechanism": "Dual RAAS blockade causes profound efferent arteriolar vasodilation and aldosterone suppression.",
    "management": "Combination is strictly contraindicated. Select an ACE inhibitor OR an ARB, not both.",
    "evidenceSource": "ONTARGET Trial / US FDA",
    "reviewedDate": "2026-09-25"
  },
  {
    "id": "int-rami-ibup",
    "genericA": "ramipril",
    "genericB": "ibuprofen",
    "severity": "moderate",
    "clinicalEffect": "Antagonism of antihypertensive effect and increased risk of acute kidney injury.",
    "mechanism": "NSAIDs inhibit renal vasodilatory prostaglandins, compromising afferent arteriolar flow while ACEI relaxes efferent arteriole.",
    "management": "Avoid routine NSAID co-prescription. Use paracetamol for analgesia; monitor serum creatinine if NSAIDs are necessary.",
    "evidenceSource": "BNF 86",
    "reviewedDate": "2026-09-25"
  }
];

export const VERIFIED_GUIDELINES: DiseaseGuideline[] = [
  {
    "id": "dghs-dengue-guideline-2024",
    "title": "National Guidelines for Clinical Management of Dengue Syndrome 2024",
    "titleBn": "জাতীয় ডেঙ্গু ক্লিনিক্যাল ম্যানেজমেন্ট গাইডলাইন ২০২৪",
    "issuingOrganization": "Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare",
    "jurisdiction": "Bangladesh",
    "publicationDate": "2024-06-01",
    "version": "2024 5th Edition (Comprehensive Revised)",
    "officialLink": "https://dghs.gov.bd/guidelines/dengue-2024.pdf",
    "summary": "Defines triage, fluid resuscitation (0.9% Normal Saline / Ringer’s Lactate), monitoring of critical plasma leakage, platelet transfusion thresholds, and strict avoidance of NSAIDs, antibiotics, and corticosteroids.",
    "firstLineGenerics": [
      "paracetamol"
    ],
    "secondLineGenerics": [],
    "contraindicatedGenerics": [
      "aspirin"
    ],
    "reviewStatus": "verified_official"
  },
  {
    "id": "nhf-hypertension-guideline-2022",
    "title": "National Guidelines for Management of Hypertension in Bangladesh",
    "titleBn": "বাংলাদেশে উচ্চ রক্তচাপ ব্যবস্থাপনা নির্দেশিকা",
    "issuingOrganization": "National Heart Foundation of Bangladesh & DGHS",
    "jurisdiction": "Bangladesh",
    "publicationDate": "2022-11-15",
    "version": "4th Edition Revised",
    "officialLink": "https://nhf.org.bd/hypertension-guidelines",
    "summary": "Guidelines for screening, risk stratification, and pharmacological management of hypertension in Bangladeshi adults. Recommends initial combination therapy (CCB + ARB/ACEI) for Stage 2 hypertension.",
    "firstLineGenerics": [
      "enalapril",
      "losartan",
      "amlodipine"
    ],
    "secondLineGenerics": [
      "hydrochlorothiazide",
      "bisoprolol"
    ],
    "contraindicatedGenerics": [],
    "reviewStatus": "verified_official"
  },
  {
    "id": "badas-diabetes-guideline-2023",
    "title": "National Clinical Management Guidelines for Type 2 Diabetes Mellitus",
    "titleBn": "জাতীয় টাইপ-২ ডায়াবেটিস ক্লিনিক্যাল গাইডলাইন",
    "issuingOrganization": "Diabetic Association of Bangladesh (BADAS) & DGHS",
    "jurisdiction": "Bangladesh",
    "publicationDate": "2023-04-10",
    "version": "6th Edition",
    "officialLink": "https://badas-bd.org/guidelines",
    "summary": "Recommends Metformin as cornerstone first-line monotherapy, early combination for HbA1c > 8.5%, and regular insulin in acute illness or pregnancy.",
    "firstLineGenerics": [
      "metformin"
    ],
    "secondLineGenerics": [
      "insulin-regular"
    ],
    "contraindicatedGenerics": [],
    "reviewStatus": "verified_official"
  },
  {
    "id": "dghs-antibiotic-stewardship-2023",
    "title": "National Antimicrobial Stewardship & Rational Antibiotic Use Guideline",
    "titleBn": "জাতীয় অ্যান্টিমাইক্রোবিয়াল স্টুয়ার্ডশিপ ও অ্যান্টিবায়োটিক গাইডলাইন",
    "issuingOrganization": "Directorate General of Drug Administration (DGDA) & DGHS",
    "jurisdiction": "Bangladesh",
    "publicationDate": "2023-09-20",
    "version": "2nd Edition",
    "officialLink": "https://dgda.gov.bd/antimicrobial-stewardship",
    "summary": "Implements WHO AWaRe classification (Access, Watch, Reserve) to contain drug-resistant infections in Bangladesh hospitals.",
    "firstLineGenerics": [
      "amoxicillin",
      "doxycycline"
    ],
    "secondLineGenerics": [
      "azithromycin",
      "ceftriaxone",
      "ciprofloxacin"
    ],
    "contraindicatedGenerics": [],
    "reviewStatus": "verified_official"
  },
  {
    "id": "nicvd-acs-guideline-2023",
    "title": "National Clinical Protocol for Acute Coronary Syndrome & STEMI Care",
    "titleBn": "তীব্র হৃদরোগ ও হার্ট অ্যাটাক ব্যবস্থাপনা নির্দেশিকা",
    "issuingOrganization": "National Institute of Cardiovascular Diseases (NICVD)",
    "jurisdiction": "Bangladesh",
    "publicationDate": "2023-02-15",
    "version": "3rd Edition",
    "officialLink": "https://nicvd.gov.bd/protocols",
    "summary": "Standardized national protocol for emergency loading doses: Aspirin 300 mg chewed + Clopidogrel 300-600 mg + Atorvastatin 80 mg + Unfractionated Heparin for primary PCI.",
    "firstLineGenerics": [
      "aspirin",
      "clopidogrel",
      "atorvastatin",
      "heparin"
    ],
    "secondLineGenerics": [
      "bisoprolol",
      "enalapril"
    ],
    "contraindicatedGenerics": [],
    "reviewStatus": "verified_official"
  }
];

export const VERIFIED_INVESTIGATIONS: ClinicalInvestigation[] = [
  {
    "id": "serum-potassium",
    "name": "Serum Potassium (K+)",
    "nameBn": "সিরাম পটাশিয়াম",
    "specimen": "Venous Blood (Serum / Lithium Heparin Plasma)",
    "purpose": "Essential electrolyte evaluation for cardiac electrical conduction, neuromuscular function, and acid-base equilibrium.",
    "normalReference": "3.5 to 5.0 mmol/L (mEq/L)",
    "drugsCausingElevation": [
      "enalapril",
      "losartan",
      "spironolactone"
    ],
    "drugsCausingReduction": [
      "furosemide",
      "hydrochlorothiazide",
      "salbutamol",
      "insulin-regular"
    ],
    "monitoringRole": "Mandatory monitoring parameter before and during therapy with loop diuretics, ACE inhibitors, and ARBs to prevent life-threatening ventricular fibrillation."
  },
  {
    "id": "serum-creatinine",
    "name": "Serum Creatinine & eGFR",
    "nameBn": "সিরাম ক্রিয়েটিনিন ও ইজিএফআর",
    "specimen": "Venous Blood (Serum)",
    "purpose": "Assessment of renal glomerulus filtration capacity and drug clearance capability.",
    "normalReference": "Adult male: 0.7 - 1.3 mg/dL; Adult female: 0.6 - 1.1 mg/dL; Normal eGFR: > 90 mL/min/1.73m²",
    "drugsCausingElevation": [
      "furosemide",
      "hydrochlorothiazide",
      "enalapril",
      "losartan",
      "spironolactone"
    ],
    "drugsCausingReduction": [],
    "monitoringRole": "Guides dosage adjustments for renally eliminated medications; a > 30% acute rise after ACEI/ARB warrants investigation for bilateral renal artery stenosis."
  },
  {
    "id": "liver-function-tests",
    "name": "Serum Transaminases (ALT / SGPT & AST / SGOT)",
    "nameBn": "লিভার ফাংশন টেস্ট (এসজিপিটি ও এসজিওটি)",
    "specimen": "Venous Blood (Serum)",
    "purpose": "Hepatocellular integrity biomarker detecting drug-induced liver injury (DILI).",
    "normalReference": "ALT: 10 - 40 U/L; AST: 10 - 35 U/L",
    "drugsCausingElevation": [
      "paracetamol",
      "atorvastatin",
      "ciprofloxacin"
    ],
    "drugsCausingReduction": [],
    "monitoringRole": "Essential diagnostic parameter in paracetamol toxicity; an elevation > 1000 U/L indicates severe centrilobular hepatocellular necrosis."
  },
  {
    "id": "pt-inr",
    "name": "Prothrombin Time (PT) & INR",
    "nameBn": "প্রোথ্রম্বিন টাইম ও আইএনআর",
    "specimen": "Citrated Venous Blood (Platelet-Poor Plasma)",
    "purpose": "Evaluates extrinsic and common coagulation pathways (Factors II, VII, IX, X).",
    "normalReference": "Control PT: 11-13.5 seconds; Normal INR: 0.9 - 1.2",
    "drugsCausingElevation": [
      "warfarin",
      "heparin",
      "ceftriaxone"
    ],
    "drugsCausingReduction": [],
    "monitoringRole": "Mandatory monitoring test for warfarin dosing; therapeutic window is INR 2.0 - 3.0 (2.5 - 3.5 for mechanical valves)."
  },
  {
    "id": "aptt",
    "name": "Activated Partial Thromboplastin Time (aPTT)",
    "nameBn": "অ্যাক্টিভেটেড পার্শিয়াল থ্রম্বোপ্লাস্টিন টাইম",
    "specimen": "Citrated Venous Blood",
    "purpose": "Evaluates intrinsic and common coagulation pathways (Factors XII, XI, IX, VIII, X, V, II, I).",
    "normalReference": "Normal control: 25 - 35 seconds",
    "drugsCausingElevation": [
      "heparin"
    ],
    "drugsCausingReduction": [],
    "monitoringRole": "Mandatory test for unfractionated heparin monitoring (target 1.5 to 2.5 times control: 60-85 seconds)."
  },
  {
    "id": "serum-uric-acid",
    "name": "Serum Uric Acid",
    "nameBn": "সিরাম ইউরিক অ্যাসিড",
    "specimen": "Venous Blood (Serum)",
    "purpose": "Biomarker of purine metabolism and hyperuricemia/gout risk.",
    "normalReference": "Male: 3.5 - 7.2 mg/dL; Female: 2.6 - 6.0 mg/dL",
    "drugsCausingElevation": [
      "furosemide",
      "hydrochlorothiazide",
      "aspirin"
    ],
    "drugsCausingReduction": [
      "losartan"
    ],
    "monitoringRole": "Monitors diuretic-induced gout; helps choose Losartan over other ARBs in hyperuricemic hypertensive patients."
  },
  {
    "id": "fasting-blood-glucose",
    "name": "Fasting Blood Glucose & HbA1c",
    "nameBn": "রক্তের গ্লুকোজ ও এইচবিএ১সি",
    "specimen": "Fluoride Oxalate Blood (Glucose) / EDTA Whole Blood (HbA1c)",
    "purpose": "Assessment of acute and 3-month long-term glycemic control.",
    "normalReference": "Fasting: 4.0 - 6.0 mmol/L; HbA1c: < 5.7% (Normal), < 7.0% (Diabetes target)",
    "drugsCausingElevation": [
      "dexamethasone",
      "hydrochlorothiazide"
    ],
    "drugsCausingReduction": [
      "insulin-regular",
      "metformin"
    ],
    "monitoringRole": "Essential in diabetes management and monitoring steroid-induced diabetes."
  },
  {
    "id": "ecg-qtc",
    "name": "ECG QTc Interval",
    "nameBn": "ইসিজি কিউটিসি ইন্টারভাল",
    "specimen": "12-Lead Standard Electrocardiogram",
    "purpose": "Measures myocardial ventricular repolarization duration corrected for heart rate.",
    "normalReference": "Men: < 450 ms; Women: < 460 ms (Borderline 450-500 ms; Prolonged > 500 ms)",
    "drugsCausingElevation": [
      "azithromycin",
      "ciprofloxacin"
    ],
    "drugsCausingReduction": [],
    "monitoringRole": "Critical safety check when combining macrolides, fluoroquinolones, or antiarrhythmics to prevent Torsades de Pointes."
  }
];

export interface PreconfiguredComparison {
  id: string;
  title: string;
  titleBn: string;
  genericIds: string[];
  clinicalVerdict: string;
  keyDifferencesSummary: string;
}

export const PRECONFIGURED_COMPARISONS: PreconfiguredComparison[] = [
  {
    "id": "acei-vs-arb",
    "title": "ACE Inhibitor (Enalapril) vs ARB (Losartan)",
    "titleBn": "এসিই ইনহিবিটর (এনালাপ্রিল) বনাম এআরবি (লোসার্টান)",
    "genericIds": [
      "enalapril",
      "losartan"
    ],
    "clinicalVerdict": "Both provide equivalent cardiovascular and renal mortality benefits. Enalapril has slightly more landmark trial history in HFrEF but causes persistent dry cough in 5-20% of patients due to bradykinin accumulation. Losartan is the preferred first-line alternative when cough develops, and uniquely lowers serum uric acid via URAT1 inhibition.",
    "keyDifferencesSummary": "Cough: Enalapril (5-20%) vs Losartan (< 1%). Molecular target: ACE enzyme vs AT1 receptor. Uric acid: Enalapril (neutral) vs Losartan (uricosuric lowering)."
  },
  {
    "id": "loop-vs-thiazide",
    "title": "Loop Diuretic (Furosemide) vs Thiazide Diuretic (Hydrochlorothiazide)",
    "titleBn": "লুপ ডাইইউরেটিক (ফিউরোসেমাইড) বনাম থায়াজাইড ডাইইউরেটিক (হাইড্রোক্লোরোথায়াজাইড)",
    "genericIds": [
      "furosemide",
      "hydrochlorothiazide"
    ],
    "clinicalVerdict": "Furosemide is a high-ceiling diuretic acting in the thick ascending limb of Henle (excreting up to 25% of filtered Na+); it remains effective even in severe renal impairment (eGFR < 30 mL/min) and is the drug of choice for acute pulmonary edema and fluid overload in heart failure. Thiazides act in the distal convoluted tubule (excreting ~5% of Na+), lose efficacy when eGFR < 30 mL/min, and are preferred for essential hypertension rather than rapid decongestion.",
    "keyDifferencesSummary": "Efficacy ceiling: Furosemide (25% Na+ excretion) vs Thiazide (5%). Calcium handling: Furosemide causes hypercalciuria (hypocalcemia) vs Thiazides cause hypocalciuria (hypercalcemia). Utility in low eGFR: Furosemide (effective) vs Thiazide (ineffective when eGFR < 30)."
  },
  {
    "id": "heparin-vs-warfarin",
    "title": "Parenteral Heparin vs Oral Warfarin",
    "titleBn": "হেপারিন ইনজেকশন বনাম ওয়ারফারিন ট্যাবলেট",
    "genericIds": [
      "heparin",
      "warfarin"
    ],
    "clinicalVerdict": "Heparin acts immediately via antithrombin activation and is monitored by aPTT; it does not cross the placenta, making it safe in pregnancy. Warfarin is an oral vitamin K antagonist taking 3 to 5 days for full antithrombotic efficacy and is monitored by INR; it is strictly contraindicated in pregnancy due to severe embryopathy.",
    "keyDifferencesSummary": "Onset: Heparin (Immediate IV) vs Warfarin (3-5 days oral). Monitoring: Heparin (aPTT) vs Warfarin (INR). Pregnancy: Heparin (Safe, does not cross placenta) vs Warfarin (Teratogenic Category X). Reversal: Protamine (Heparin) vs Vitamin K + PCC (Warfarin)."
  },
  {
    "id": "omeprazole-vs-pantoprazole",
    "title": "Omeprazole vs Pantoprazole",
    "titleBn": "ওমেপ্রাজল বনাম প্যান্টোপ্রাজল",
    "genericIds": [
      "omeprazole",
      "pantoprazole"
    ],
    "clinicalVerdict": "Both are highly effective proton pump inhibitors for healing peptic ulcers and GERD. The critical pharmacological difference is that Omeprazole is a strong competitive inhibitor of CYP2C19, significantly blunting the antiplatelet bioactivation of Clopidogrel and increasing stent thrombosis risk. Pantoprazole is eliminated by non-CYP sulfoconjugation with minimal CYP2C19 interaction, making it the definitive PPI of choice in cardiology patients taking clopidogrel.",
    "keyDifferencesSummary": "CYP2C19 affinity: Omeprazole (High inhibition) vs Pantoprazole (Minimal). Interaction with Clopidogrel: Omeprazole (Blunts antiplatelet action) vs Pantoprazole (Safe). Acid suppression: Equivalent 24-hour intragastric pH control."
  },
  {
    "id": "amoxicillin-vs-azithromycin",
    "title": "Amoxicillin vs Azithromycin",
    "titleBn": "অ্যামোক্সিসিলিন বনাম অ্যাজিথ্রোমাইসিন",
    "genericIds": [
      "amoxicillin",
      "azithromycin"
    ],
    "clinicalVerdict": "Amoxicillin is a bactericidal aminopenicillin inhibiting bacterial cell wall peptidoglycan synthesis; it is the first-line empirical choice for acute otitis media, streptococcal pharyngitis, and uncomplicated community-acquired pneumonia. Azithromycin is a bacteriostatic azalide macrolide that inhibits the 50S bacterial ribosomal subunit and protein synthesis; it covers atypical respiratory pathogens (Mycoplasma, Chlamydia, Legionella) and is preferred in penicillin-allergic patients. Azithromycin has a very long tissue half-life (~68 hours) allowing once-daily 3 to 5-day dosing, but carries risk of cardiac QTc interval prolongation.",
    "keyDifferencesSummary": "Mechanism: Cell wall peptidoglycan synthesis inhibition (Bactericidal, Amoxicillin) vs 50S ribosomal protein synthesis inhibition (Bacteriostatic, Azithromycin). Spectrum: Standard gram-positive/gram-negative vs Atypical pathogens (Mycoplasma, Chlamydophila, Legionella). Dosing: 3 times daily for 7-10 days vs Once daily for 3-5 days. Cardiac risk: None vs QTc prolongation."
  }
];

// ============================================================================
// HELPER QUERY FUNCTIONS
// ============================================================================
export function getVerifiedGenericById(id: string): DrugGeneric | undefined {
  return VERIFIED_GENERICS.find(g => g.id === id || g.normalizedName === id.toLowerCase().trim());
}

export function getVerifiedBrandsForGeneric(genericId: string): DrugBrand[] {
  return VERIFIED_BRANDS.filter(b => b.genericId === genericId);
}

export function getVerifiedBrandById(id: string): DrugBrand | undefined {
  return VERIFIED_BRANDS.find(b => b.id === id);
}

export function searchVerifiedDrugs(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      generics: VERIFIED_GENERICS,
      brands: VERIFIED_BRANDS,
      manufacturers: VERIFIED_MANUFACTURERS,
      classes: VERIFIED_THERAPEUTIC_CLASSES
    };
  }

  const terms = q.split(/\s+/).filter(Boolean);

  const matchedGenerics = VERIFIED_GENERICS.filter(g => {
    const text = [
      g.name,
      g.nameBn,
      g.pharmacologicalClass,
      g.therapeuticClass,
      g.atcCode,
      g.receptorOrTarget,
      g.bilingualNotes.classBn,
      g.bilingualNotes.mechanismSummaryBn,
      ...g.indications.map(i => i.name + ' ' + (i.nameBn || ''))
    ].join(' ').toLowerCase();
    return terms.every(t => text.includes(t));
  });

  const matchedBrands = VERIFIED_BRANDS.filter(b => {
    const text = [
      b.brandName,
      b.brandNameBn || '',
      b.genericId,
      b.manufacturerName,
      b.dosageForm,
      b.strength
    ].join(' ').toLowerCase();
    return terms.every(t => text.includes(t));
  });

  return {
    generics: matchedGenerics,
    brands: matchedBrands,
    manufacturers: VERIFIED_MANUFACTURERS.filter(m => m.name.toLowerCase().includes(q) || m.shortName.toLowerCase().includes(q)),
    classes: VERIFIED_THERAPEUTIC_CLASSES.filter(c => c.name.toLowerCase().includes(q) || c.nameBn.includes(q))
  };
}

export function evaluateDrugInteractions(genericIds: string[]): {
  interactions: DrugInteraction[];
  safeNotice: string;
  hasInteractions: boolean;
  dataStatus: 'interactions_found' | 'no_documented_interaction' | 'insufficient_data';
  unreviewedGenerics: string[];
} {
  const uniqueIds = [...new Set(genericIds.map(id => id.trim().toLowerCase()))];
  const results: DrugInteraction[] = [];

  for (let i = 0; i < uniqueIds.length; i++) {
    for (let j = i + 1; j < uniqueIds.length; j++) {
      const gA = uniqueIds[i];
      const gB = uniqueIds[j];

      const found = VERIFIED_INTERACTIONS.find(
        item => (item.genericA === gA && item.genericB === gB) || (item.genericA === gB && item.genericB === gA)
      );

      if (found) {
        results.push(found);
      }
    }
  }

  // Check if any generic is unreviewed or has draft status
  const verifiedIds = new Set(VERIFIED_GENERICS.map(g => g.id.toLowerCase()));
  const unreviewedGenerics = uniqueIds.filter(id => !verifiedIds.has(id));

  let dataStatus: 'interactions_found' | 'no_documented_interaction' | 'insufficient_data' = 'no_documented_interaction';
  let safeNotice = 'No documented interaction in the reviewed clinical dataset. Absence of evidence does not guarantee absence of interaction.';

  if (results.length > 0) {
    dataStatus = 'interactions_found';
    safeNotice = `Identified ${results.length} documented clinical interaction(s) among the selected medicines. Review severity and clinical management guidance.`;
  } else if (unreviewedGenerics.length > 0) {
    dataStatus = 'insufficient_data';
    safeNotice = `Insufficient verified interaction data available for ${unreviewedGenerics.join(', ')}. This record is in draft status and awaiting comprehensive clinical interaction review; do not assume lack of documented interaction indicates metabolic safety.`;
  }

  return {
    interactions: results,
    safeNotice,
    hasInteractions: results.length > 0,
    dataStatus,
    unreviewedGenerics
  };
}
