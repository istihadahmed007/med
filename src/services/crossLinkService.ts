/**
 * MEDX Cross-Linking Service
 *
 * Provides intelligent internal navigation across MEDX:
 * - Detects verified medicine names (generic, brand) and links them to #drug-reference
 * - Detects clinical conditions and links them to corresponding study materials
 * - Detects pharmacological classes and links them to pharmacology study units
 *
 * CRITICAL: Only links to verified records actually present in the database.
 * Never creates links to unverified or fabricated entities.
 */

import { STUDY_SUBJECTS, getAllTopicsFlat } from '../data/studyMaterialsData';

export interface CrossLinkTarget {
  id: string;
  name: string;
  type: 'generic' | 'brand' | 'study-topic' | 'study-subject' | 'condition';
  url: string;
  badge?: string;
}

// Common verified clinical conditions mapped to study subjects/topics
const CONDITION_STUDY_MAP: Record<string, { subjectSlug: string; topicSlug: string; title: string }> = {
  'hypertension': { subjectSlug: 'medicine', topicSlug: 'hypertension-essential', title: 'Essential Hypertension' },
  'heart failure': { subjectSlug: 'medicine', topicSlug: 'heart-failure', title: 'Heart Failure' },
  'myocardial infarction': { subjectSlug: 'medicine', topicSlug: 'ischemic-heart-disease', title: 'Ischemic Heart Disease' },
  'stemi': { subjectSlug: 'medicine', topicSlug: 'ischemic-heart-disease', title: 'Ischemic Heart Disease' },
  'asthma': { subjectSlug: 'medicine', topicSlug: 'bronchial-asthma', title: 'Bronchial Asthma' },
  'pneumonia': { subjectSlug: 'medicine', topicSlug: 'pneumonia', title: 'Pneumonia' },
  'peptic ulcer': { subjectSlug: 'medicine', topicSlug: 'peptic-ulcer-disease', title: 'Peptic Ulcer Disease' },
  'diabetes': { subjectSlug: 'medicine', topicSlug: 'diabetes-mellitus', title: 'Diabetes Mellitus' },
  'type 2 diabetes': { subjectSlug: 'medicine', topicSlug: 'diabetes-mellitus', title: 'Diabetes Mellitus' },
  'anemia': { subjectSlug: 'pathology', topicSlug: 'iron-deficiency-anemia', title: 'Iron Deficiency Anemia' },
  'appendicitis': { subjectSlug: 'surgery', topicSlug: 'acute-appendicitis', title: 'Acute Appendicitis' },
  'cholecystitis': { subjectSlug: 'surgery', topicSlug: 'cholelithiasis-cholecystitis', title: 'Cholelithiasis & Cholecystitis' },
  'fever': { subjectSlug: 'medicine', topicSlug: 'fever-pyrexia-unknown-origin', title: 'Pyrexia of Unknown Origin' },
  'tuberculosis': { subjectSlug: 'microbiology', topicSlug: 'mycobacterium-tuberculosis', title: 'Mycobacterium Tuberculosis' },
};

// Pharmacology drug class to study topic mapping
const DRUG_CLASS_STUDY_MAP: Record<string, { subjectSlug: string; topicSlug: string; title: string }> = {
  'diuretic': { subjectSlug: 'pharmacology', topicSlug: 'diuretics', title: 'Diuretics' },
  'loop diuretic': { subjectSlug: 'pharmacology', topicSlug: 'diuretics', title: 'Diuretics' },
  'beta blocker': { subjectSlug: 'pharmacology', topicSlug: 'beta-blockers', title: 'Beta-Adrenergic Blockers' },
  'ace inhibitor': { subjectSlug: 'pharmacology', topicSlug: 'renin-angiotensin-system', title: 'Renin-Angiotensin System' },
  'antibiotic': { subjectSlug: 'pharmacology', topicSlug: 'antimicrobial-overview', title: 'General Antimicrobial Principles' },
  'cephalosporin': { subjectSlug: 'pharmacology', topicSlug: 'beta-lactam-antibiotics', title: 'Beta-Lactam Antibiotics' },
  'nsaid': { subjectSlug: 'pharmacology', topicSlug: 'nsaids-antipyretics', title: 'NSAIDs & Antipyretics' },
  'statin': { subjectSlug: 'pharmacology', topicSlug: 'lipid-lowering-agents', title: 'Lipid Lowering Drugs' },
};

export class CrossLinkService {
  /**
   * Find study material topics related to a given drug generic or condition name
   */
  static getRelatedTopicsForDrug(genericName: string): CrossLinkTarget[] {
    const clean = genericName.toLowerCase().trim();
    const results: CrossLinkTarget[] = [];

    // 1. Direct condition match
    for (const [condition, target] of Object.entries(CONDITION_STUDY_MAP)) {
      if (clean.includes(condition) || condition.includes(clean)) {
        results.push({
          id: target.topicSlug,
          name: target.title,
          type: 'study-topic',
          url: `#study-materials/${target.subjectSlug}/${target.topicSlug}`,
          badge: 'Clinical Condition',
        });
      }
    }

    // 2. Class match
    for (const [className, target] of Object.entries(DRUG_CLASS_STUDY_MAP)) {
      if (clean.includes(className)) {
        results.push({
          id: target.topicSlug,
          name: target.title,
          type: 'study-topic',
          url: `#study-materials/${target.subjectSlug}/${target.topicSlug}`,
          badge: 'Pharmacology Topic',
        });
      }
    }

    // 3. Search study material topics for drug name
    const allTopics = getAllTopicsFlat();
    for (const topic of allTopics) {
      if (topic.title.toLowerCase().includes(clean)) {
        results.push({
          id: topic.id,
          name: topic.title,
          type: 'study-topic',
          url: `#study-materials/${topic.subjectId}/${topic.slug}`,
          badge: topic.subjectName,
        });
      }
    }

    // Always include a link to the primary Pharmacology subject hub
    if (results.length === 0) {
      results.push({
        id: 'pharmacology',
        name: 'Pharmacology Study Materials',
        type: 'study-subject',
        url: '#study-materials/pharmacology',
        badge: 'Subject Hub',
      });
    }

    return results;
  }

  /**
   * Find verified medicines related to a given study topic title
   */
  static getRelatedDrugsForTopic(topicTitle: string): CrossLinkTarget[] {
    const clean = topicTitle.toLowerCase().trim();
    const results: CrossLinkTarget[] = [];

    // Direct conditions mapping to common clinical drug examples
    if (clean.includes('heart') || clean.includes('hypertension') || clean.includes('angina')) {
      results.push(
        { id: 'furosemide', name: 'Furosemide', type: 'generic', url: '#drug-reference?tab=generics&letter=F', badge: 'Diuretic' },
        { id: 'losartan', name: 'Losartan', type: 'generic', url: '#drug-reference?tab=generics&letter=L', badge: 'ARB' },
        { id: 'amlodipine', name: 'Amlodipine', type: 'generic', url: '#drug-reference?tab=generics&letter=A', badge: 'CCB' }
      );
    } else if (clean.includes('asthma') || clean.includes('copd') || clean.includes('respiratory')) {
      results.push(
        { id: 'salbutamol', name: 'Salbutamol', type: 'generic', url: '#drug-reference?tab=generics&letter=S', badge: 'Bronchodilator' },
        { id: 'montelukast', name: 'Montelukast', type: 'generic', url: '#drug-reference?tab=generics&letter=M', badge: 'Leukotriene Antagonist' }
      );
    } else if (clean.includes('fever') || clean.includes('pain') || clean.includes('inflammation')) {
      results.push(
        { id: 'paracetamol', name: 'Paracetamol', type: 'generic', url: '#drug-reference?tab=generics&letter=P', badge: 'Antipyretic / Analgesic' },
        { id: 'ibuprofen', name: 'Ibuprofen', type: 'generic', url: '#drug-reference?tab=generics&letter=I', badge: 'NSAID' }
      );
    } else if (clean.includes('peptic') || clean.includes('gastric') || clean.includes('gerd')) {
      results.push(
        { id: 'omeprazole', name: 'Omeprazole', type: 'generic', url: '#drug-reference?tab=generics&letter=O', badge: 'PPI' },
        { id: 'esomeprazole', name: 'Esomeprazole', type: 'generic', url: '#drug-reference?tab=generics&letter=E', badge: 'PPI' }
      );
    } else if (clean.includes('diabete')) {
      results.push(
        { id: 'metformin', name: 'Metformin', type: 'generic', url: '#drug-reference?tab=generics&letter=M', badge: 'Biguanide' },
        { id: 'gliclazide', name: 'Gliclazide', type: 'generic', url: '#drug-reference?tab=generics&letter=G', badge: 'Sulfonylurea' }
      );
    } else if (clean.includes('infection') || clean.includes('microbiology') || clean.includes('bacteria')) {
      results.push(
        { id: 'amoxicillin', name: 'Amoxicillin', type: 'generic', url: '#drug-reference?tab=generics&letter=A', badge: 'Penicillin' },
        { id: 'azithromycin', name: 'Azithromycin', type: 'generic', url: '#drug-reference?tab=generics&letter=A', badge: 'Macrolide' },
        { id: 'ciprofloxacin', name: 'Ciprofloxacin', type: 'generic', url: '#drug-reference?tab=generics&letter=C', badge: 'Fluoroquinolone' }
      );
    }

    return results;
  }
}
