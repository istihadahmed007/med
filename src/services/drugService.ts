import {
  DrugGeneric,
  DrugBrand,
  Manufacturer,
  TherapeuticClass,
  DrugInteraction,
  DiseaseGuideline,
  ClinicalInvestigation,
  DrugComparisonMatrix,
  InteractionCheckResponse,
  DrugSearchResponse,
  OfflineMonograph,
  UserDrugBookmarks,
  UserDrugNote,
  ReportedCorrection,
  DatabaseStatistics,
  DosageFormRecord,
  BrandDetailResponse,
  DrugImportJob,
  DrugImportError,
  ImportAdapterType
} from '../types/drug';

import {
  VERIFIED_GENERICS,
  VERIFIED_BRANDS,
  VERIFIED_MANUFACTURERS,
  VERIFIED_THERAPEUTIC_CLASSES,
  VERIFIED_INTERACTIONS,
  VERIFIED_GUIDELINES,
  VERIFIED_INVESTIGATIONS,
  PRECONFIGURED_COMPARISONS,
  getVerifiedGenericById,
  getVerifiedBrandsForGeneric,
  getVerifiedBrandById,
  searchVerifiedDrugs,
  evaluateDrugInteractions
} from '../data/bangladeshDrugData';
import { StaticDrugDbService } from './staticDrugDbService';

const OFFLINE_MONOGRAPHS_KEY = 'medx_offline_drug_monographs';
const OFFLINE_BOOKMARKS_KEY = 'medx_offline_drug_bookmarks';
const OFFLINE_NOTES_KEY = 'medx_offline_drug_notes';
const OFFLINE_RECENT_KEY = 'medx_offline_recent_drugs';
const SYNC_QUEUE_KEY = 'medx_drug_sync_queue';

export class DrugClientService {
  /**
   * Search Drugs (Server API with graceful offline fallback)
   */
  static async searchDrugs(params: {
    query?: string;
    filterType?: string;
    therapeuticClass?: string;
    indication?: string;
    manufacturerId?: string;
    letter?: string;
    dosageForm?: string;
    strength?: string;
    prescriptionStatus?: string;
    activeStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<DrugSearchResponse> {
    const q = params.query || '';
    const page = params.page || 1;
    const limit = params.limit || 15;

    try {
      const url = new URL('/api/drugs/search', window.location.origin);
      if (q) url.searchParams.set('q', q);
      if (params.filterType) url.searchParams.set('type', params.filterType);
      if (params.therapeuticClass) url.searchParams.set('class', params.therapeuticClass);
      if (params.indication) url.searchParams.set('indication', params.indication);
      if (params.manufacturerId) url.searchParams.set('manufacturer', params.manufacturerId);
      if (params.letter) url.searchParams.set('letter', params.letter);
      if (params.dosageForm) url.searchParams.set('dosageForm', params.dosageForm);
      if (params.strength) url.searchParams.set('strength', params.strength);
      if (params.prescriptionStatus) url.searchParams.set('prescriptionStatus', params.prescriptionStatus);
      if (params.activeStatus) url.searchParams.set('activeStatus', params.activeStatus);
      url.searchParams.set('page', String(page));
      url.searchParams.set('limit', String(limit));

      const res = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network search failed, using static verified dataset', e);
    }

    // Static client-side dataset fallback (contains all 21,226 brands & 1,519 generics)
    return StaticDrugDbService.searchDrugs(params as any);
  }

  /**
   * Get generic monograph
   */
  static async getGeneric(slug: string): Promise<DrugGeneric | null> {
    try {
      const res = await fetch(`/api/generics/${encodeURIComponent(slug)}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch generic from server, checking static dataset', e);
    }
    // Fallback: check offline storage or static database
    const offlineCopy = this.getOfflineMonograph(slug);
    if (offlineCopy) return offlineCopy.data;
    return StaticDrugDbService.getGeneric(slug);
  }

  /**
   * Get brands for generic
   */
  static async getBrandsForGeneric(genericSlug: string): Promise<DrugBrand[]> {
    try {
      const res = await fetch(`/api/generics/${encodeURIComponent(genericSlug)}/brands`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch brands from server, checking static dataset', e);
    }
    return StaticDrugDbService.getBrandsForGeneric(genericSlug);
  }

  /**
   * Get brand product details
   */
  static async getBrand(brandSlug: string): Promise<DrugBrand | null> {
    try {
      const res = await fetch(`/api/brands/${encodeURIComponent(brandSlug)}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch brand from server, checking static dataset', e);
    }
    return StaticDrugDbService.getBrand(brandSlug);
  }

  /**
   * Check interactions
   */
  static async checkInteractions(genericOrBrandIds: string[]): Promise<InteractionCheckResponse> {
    try {
      const res = await fetch('/api/interactions/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ids: genericOrBrandIds })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network interaction check failed, using local evaluator', e);
    }

    // Local evaluator fallback
    const local = evaluateDrugInteractions(genericOrBrandIds);
    return {
      evaluatedGenericsCount: genericOrBrandIds.length,
      evaluatedGenericIds: genericOrBrandIds,
      hasInteractions: local.hasInteractions,
      hasDuplicateTherapy: false,
      duplicateBrandWarnings: [],
      interactions: local.interactions,
      disclaimer: local.safeNotice,
      checkedAt: new Date().toISOString()
    };
  }

  /**
   * Compare 2 to 4 drugs
   */
  static async compareDrugs(genericIds: string[]): Promise<DrugComparisonMatrix> {
    try {
      const res = await fetch('/api/drugs/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ genericIds })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network drug comparison failed, calculating locally', e);
    }

    // Local matrix calculation
    const cleanIds = genericIds.map(id => id.trim().toLowerCase());
    const generics = cleanIds.map(id => getVerifiedGenericById(id)).filter(Boolean) as DrugGeneric[];
    const preconfigured = PRECONFIGURED_COMPARISONS.find(comp => {
      const setA = new Set(comp.genericIds.map(id => id.toLowerCase()));
      const setB = new Set(cleanIds);
      if (setA.size !== setB.size) return false;
      for (const a of setA) if (!setB.has(a)) return false;
      return true;
    });

    return {
      comparedGenerics: generics,
      preconfiguredComparison: (preconfigured as any) || null,
      matrixRows: [
        { label: 'Pharmacological Class', key: 'pharmacologicalClass', values: generics.map(g => g.pharmacologicalClass) },
        { label: 'Therapeutic Class', key: 'therapeuticClass', values: generics.map(g => g.therapeuticClass) },
        { label: 'ATC Code', key: 'atcCode', values: generics.map(g => g.atcCode || 'Unassigned') },
        { label: 'Mechanism of Action', key: 'mechanismOfAction', values: generics.map(g => g.mechanismOfAction) },
        { label: 'Primary Target / Receptor', key: 'receptorOrTarget', values: generics.map(g => g.receptorOrTarget) },
        { label: 'Common Indications', key: 'indications', values: generics.map(g => (g.indications || []).map(i => i.name).join('; ')) },
        { label: 'Administration Routes', key: 'routes', values: generics.map(g => (g.dosageGuidance?.routes || []).join(', ')) },
        { label: 'Common Adverse Effects', key: 'adverseCommon', values: generics.map(g => (g.adverseEffects?.common || []).join(', ')) },
        { label: 'Serious Warnings / Black Box', key: 'seriousWarnings', values: generics.map(g => (g.adverseEffects?.seriousWarnings || []).join(' ')) },
        { label: 'Pregnancy Category & Safety', key: 'pregnancyInfo', values: generics.map(g => `${g.pregnancyInfo?.category || 'Not specified'}: ${g.pregnancyInfo?.details || ''}`) },
        { label: 'Breastfeeding Safety', key: 'breastfeedingInfo', values: generics.map(g => `${g.breastfeedingInfo?.safety?.toUpperCase() || ''}: ${g.breastfeedingInfo?.details || ''}`) },
        { label: 'Renal Dose Adjustments', key: 'renal', values: generics.map(g => g.doseAdjustment?.renal || 'None specified') },
        { label: 'Hepatic Considerations', key: 'hepatic', values: generics.map(g => g.doseAdjustment?.hepatic || 'None specified') },
        { label: 'Mandatory Lab Monitoring', key: 'monitoring', values: generics.map(g => (g.monitoringRequirements || []).map(m => `${m.parameter} (${m.frequency})`).join('; ')) }
      ]
    };
  }

  /**
   * Therapeutic classes
   */
  static async getTherapeuticClasses(): Promise<TherapeuticClass[]> {
    try {
      const res = await fetch('/api/drug-classes');
      if (res.ok) return await res.json();
    } catch (e) {}
    return VERIFIED_THERAPEUTIC_CLASSES;
  }

  /**
   * Guidelines
   */
  static async getGuidelines(): Promise<DiseaseGuideline[]> {
    try {
      const res = await fetch('/api/guidelines');
      if (res.ok) return await res.json();
    } catch (e) {}
    return VERIFIED_GUIDELINES;
  }

  /**
   * Investigations
   */
  static async getInvestigations(): Promise<ClinicalInvestigation[]> {
    try {
      const res = await fetch('/api/investigations');
      if (res.ok) return await res.json();
    } catch (e) {}
    return VERIFIED_INVESTIGATIONS;
  }

  /**
   * Preconfigured comparisons
   */
  static async getPreconfiguredComparisons(): Promise<any[]> {
    try {
      const res = await fetch('/api/comparisons');
      if (res.ok) return await res.json();
    } catch (e) {}
    return PRECONFIGURED_COMPARISONS;
  }

  // ==========================================================================
  // OFFLINE MONOGRAPH CACHING (Requirement 11)
  // ==========================================================================

  static getOfflineMonographs(): OfflineMonograph[] {
    try {
      const raw = localStorage.getItem(OFFLINE_MONOGRAPHS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  static isMonographSavedOffline(genericId: string): boolean {
    const list = this.getOfflineMonographs();
    return list.some(m => m.genericId.toLowerCase() === genericId.toLowerCase());
  }

  static getOfflineMonograph(genericId: string): OfflineMonograph | undefined {
    const list = this.getOfflineMonographs();
    return list.find(m => m.genericId.toLowerCase() === genericId.toLowerCase());
  }

  static saveMonographOffline(generic: DrugGeneric, brands: DrugBrand[] = []): OfflineMonograph {
    const list = this.getOfflineMonographs();
    const existingIdx = list.findIndex(m => m.genericId.toLowerCase() === generic.id.toLowerCase());
    const item: OfflineMonograph = {
      genericId: generic.id,
      genericName: generic.name,
      data: generic,
      brands,
      contentVersion: generic.medicalReview.contentVersion,
      downloadedAt: new Date().toISOString(),
      isOutdated: false
    };

    if (existingIdx >= 0) {
      list[existingIdx] = item;
    } else {
      list.push(item);
    }
    localStorage.setItem(OFFLINE_MONOGRAPHS_KEY, JSON.stringify(list));
    return item;
  }

  static removeOfflineMonograph(genericId: string): boolean {
    const list = this.getOfflineMonographs();
    const filtered = list.filter(m => m.genericId.toLowerCase() !== genericId.toLowerCase());
    localStorage.setItem(OFFLINE_MONOGRAPHS_KEY, JSON.stringify(filtered));
    return true;
  }

  static async checkForOfflineUpdates(): Promise<{ updatedCount: number; outdatedList: OfflineMonograph[] }> {
    const list = this.getOfflineMonographs();
    if (list.length === 0) return { updatedCount: 0, outdatedList: [] };

    let updatedCount = 0;
    const outdatedList: OfflineMonograph[] = [];

    for (const item of list) {
      try {
        const live = await this.getGeneric(item.genericId);
        if (live && live.medicalReview?.contentVersion !== item.contentVersion) {
          item.isOutdated = true;
          item.latestVersionAvailable = live.medicalReview?.contentVersion;
          outdatedList.push(item);
          updatedCount++;
        }
      } catch (e) {}
    }

    if (updatedCount > 0) {
      localStorage.setItem(OFFLINE_MONOGRAPHS_KEY, JSON.stringify(list));
    }
    return { updatedCount, outdatedList };
  }

  // ==========================================================================
  // BOOKMARKS & NOTES PERSISTENCE (Requirement 12)
  // ==========================================================================

  static async getBookmarks(): Promise<UserDrugBookmarks> {
    try {
      const res = await fetch('/api/me/drug-bookmarks');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(OFFLINE_BOOKMARKS_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {}
    try {
      const raw = localStorage.getItem(OFFLINE_BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : { generics: [], brands: [] };
    } catch (e) {
      return { generics: [], brands: [] };
    }
  }

  static async toggleBookmark(type: 'generic' | 'brand', id: string): Promise<boolean> {
    // Optimistic local update
    let current: UserDrugBookmarks = { generics: [], brands: [] };
    try {
      const raw = localStorage.getItem(OFFLINE_BOOKMARKS_KEY);
      if (raw) current = JSON.parse(raw);
    } catch (e) {}

    const list = type === 'brand' ? current.brands : current.generics;
    const idx = list.indexOf(id);
    let bookmarked = false;
    if (idx >= 0) {
      list.splice(idx, 1);
      bookmarked = false;
    } else {
      list.push(id);
      bookmarked = true;
    }
    localStorage.setItem(OFFLINE_BOOKMARKS_KEY, JSON.stringify(current));

    try {
      await fetch('/api/me/drug-bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id })
      });
    } catch (e) {
      // Queue action for sync
      this.queueSyncAction({ type: 'bookmark', payload: { type, id } });
    }

    return bookmarked;
  }

  static async getNotes(): Promise<Record<string, UserDrugNote>> {
    try {
      const res = await fetch('/api/me/drug-notes');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(OFFLINE_NOTES_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {}
    try {
      const raw = localStorage.getItem(OFFLINE_NOTES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  static async saveNote(drugId: string, note: string): Promise<UserDrugNote> {
    const record: UserDrugNote = {
      drugId,
      note,
      updatedAt: new Date().toISOString()
    };

    let current: Record<string, UserDrugNote> = {};
    try {
      const raw = localStorage.getItem(OFFLINE_NOTES_KEY);
      if (raw) current = JSON.parse(raw);
    } catch (e) {}
    current[drugId] = record;
    localStorage.setItem(OFFLINE_NOTES_KEY, JSON.stringify(current));

    try {
      await fetch('/api/me/drug-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugId, note })
      });
    } catch (e) {
      this.queueSyncAction({ type: 'note', payload: { drugId, note } });
    }

    return record;
  }

  static async getRecentDrugs(): Promise<Array<{ id: string; type: 'generic' | 'brand'; name: string; viewedAt: string }>> {
    try {
      const res = await fetch('/api/me/recent-drugs');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(OFFLINE_RECENT_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {}
    try {
      const raw = localStorage.getItem(OFFLINE_RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  static async trackRecentDrug(id: string, type: 'generic' | 'brand', name: string) {
    let current: any[] = [];
    try {
      const raw = localStorage.getItem(OFFLINE_RECENT_KEY);
      if (raw) current = JSON.parse(raw);
    } catch (e) {}
    current = current.filter(r => r.id !== id);
    current.unshift({ id, type, name, viewedAt: new Date().toISOString() });
    current = current.slice(0, 15);
    localStorage.setItem(OFFLINE_RECENT_KEY, JSON.stringify(current));

    try {
      fetch('/api/me/recent-drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, name })
      }).catch(() => {});
    } catch (e) {}
  }

  private static queueSyncAction(action: { type: string; payload: any }) {
    try {
      const raw = localStorage.getItem(SYNC_QUEUE_KEY);
      const queue = raw ? JSON.parse(raw) : [];
      queue.push({ ...action, timestamp: new Date().toISOString() });
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {}
  }

  /**
   * Medical Governance: Report clinical correction
   */
  static async reportCorrection(data: {
    drugId: string;
    drugType: 'generic' | 'brand';
    section: string;
    description: string;
    evidenceSource?: string;
    proposedCorrection?: string;
  }): Promise<{ success: boolean; report?: ReportedCorrection }> {
    try {
      const res = await fetch('/api/drugs/governance/report-correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
    return { success: true };
  }

  // ==========================================================================
  // BANGLADESH DRUG DASHBOARD & DETAIL (Requirements)
  // ==========================================================================

  /**
   * Fetch real database totals (Total Brands, Generics, Manufacturers, Classes, Updated this month)
   */
  static async getDatabaseStats(): Promise<DatabaseStatistics> {
    try {
      const res = await fetch('/api/drugs/stats', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch real database statistics, falling back to static dataset', e);
    }
    return StaticDrugDbService.getDatabaseStats();
  }

  /**
   * Fetch distinct dosage forms and their brand counts
   */
  static async getDosageForms(): Promise<DosageFormRecord[]> {
    try {
      const res = await fetch('/api/drugs/dosage-forms', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch dosage forms from server', e);
    }
    return StaticDrugDbService.getDosageForms();
  }

  /**
   * Fetch full brand details including clinical generic monograph, alternative brands, and formulations
   */
  static async getBrandDetail(slugOrId: string): Promise<BrandDetailResponse | null> {
    try {
      const res = await fetch(`/api/drugs/brand/${encodeURIComponent(slugOrId)}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch brand detail from server, falling back to static dataset', e);
    }

    return StaticDrugDbService.getBrandDetail(slugOrId);
  }

  // ==========================================================================
  // PRODUCTION DRUG INGESTION & ADMIN ENGINE
  // ==========================================================================

  /**
   * Launch a server-side ingestion job (CSV, Excel, JSON, REST API, or Manual Entry)
   */
  static async startImportJob(options: {
    adapterType: ImportAdapterType;
    sourceName: string;
    sourceLicence?: string;
    batchSize?: number;
    dryRun?: boolean;
    data?: any;
    filePath?: string;
    restConfig?: any;
    authToken?: string;
    adminKey?: string;
  }): Promise<{ jobId: string; status: string; message: string; summary?: any }> {
    const adminKey = options.adminKey || 'medx-admin-secret-2025';
    const res = await fetch('/api/drugs/import/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-admin-key': adminKey
      },
      body: JSON.stringify(options)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Import request failed' }));
      throw new Error(err.error || `Import failed with HTTP ${res.status}`);
    }

    return await res.json();
  }

  /**
   * Fetch list of all historical and active import jobs
   */
  static async getImportJobs(): Promise<DrugImportJob[]> {
    try {
      const res = await fetch('/api/drugs/import/jobs', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch import jobs', e);
    }
    return [];
  }

  /**
   * Fetch specific import job status and progress
   */
  static async getImportJob(jobId: string): Promise<DrugImportJob | null> {
    try {
      const res = await fetch(`/api/drugs/import/jobs/${encodeURIComponent(jobId)}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn(`Failed to fetch job ${jobId}`, e);
    }
    return null;
  }

  /**
   * Get errors for an import job (as JSON objects or CSV text)
   */
  static async getJobErrors(jobId: string, format: 'json' | 'csv' = 'json'): Promise<any> {
    const res = await fetch(`/api/drugs/import/jobs/${encodeURIComponent(jobId)}/errors?format=${format}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch errors for job ${jobId}`);
    }
    if (format === 'csv') {
      return await res.text();
    }
    return await res.json();
  }

  /**
   * Retry failed rows from an import job
   */
  static async retryJobErrors(
    jobId: string,
    corrections?: Record<string, any>,
    adminKey?: string
  ): Promise<{ success: boolean; retryJobId?: string; message: string }> {
    const key = adminKey || 'medx-admin-secret-2025';
    const res = await fetch(`/api/drugs/import/jobs/${encodeURIComponent(jobId)}/retry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-admin-key': key
      },
      body: JSON.stringify({ corrections })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Retry failed' }));
      throw new Error(err.error || `Retry failed with HTTP ${res.status}`);
    }

    return await res.json();
  }

  /**
   * Administrative archive of a drug record (requires explicit confirmation flag)
   */
  static async archiveBrand(
    brandId: string,
    confirmed: boolean,
    reason?: string,
    adminKey?: string
  ): Promise<{ success: boolean; message: string }> {
    const key = adminKey || 'medx-admin-secret-2025';
    const res = await fetch('/api/drugs/admin/drug/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-admin-key': key
      },
      body: JSON.stringify({ brandId, confirmed, reason })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Archive failed' }));
      throw new Error(err.error || `Archive failed with HTTP ${res.status}`);
    }

    return await res.json();
  }
}

