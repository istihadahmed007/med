import { 
  VideoGenerationJob, 
  LessonVideo, 
  MedicalReviewForm, 
  VideoStudentProgress, 
  CreateVideoJobRequest,
  SelfHostedMedicalVideo
} from '../types/videoStudio';
import { UserRole } from '../types';
import { StorageService } from './storageService';
import { safeFetchJson } from './videoStudioHttp';
import { MEDICAL_VIDEO_LIBRARY } from '../data/medicalVideoLibraryData';

const API_BASE = '/api/video-studio';

export class VideoStudioService {
  /**
   * Fetch verified self-hosted medical videos.
   * Verifies HTTP status, requires JSON content-type, rejects HTML responses,
   * and cleanly falls back to the embedded verified catalog.
   */
  static async getSelfHostedVideos(): Promise<SelfHostedMedicalVideo[]> {
    try {
      const res = await safeFetchJson<SelfHostedMedicalVideo[]>(`${API_BASE}/library`);
      if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // safe fallback
    }
    return MEDICAL_VIDEO_LIBRARY;
  }

  /**
   * Fetch comprehensive taxonomy for Anatomy and Surgery collections.
   */
  static async getTaxonomy(): Promise<{ taxonomy: Record<string, Record<string, string[]>>; counts?: Record<string, number>; totalVideos?: number }> {
    try {
      const res = await safeFetchJson<{ taxonomy: Record<string, Record<string, string[]>>; counts?: Record<string, number>; totalVideos?: number }>(`${API_BASE}/taxonomy`);
      if (res.ok && res.data && res.data.taxonomy) {
        return res.data;
      }
    } catch {
      // fallback
    }
    return {
      taxonomy: {
        anatomy: {},
        surgery: {}
      },
      totalVideos: MEDICAL_VIDEO_LIBRARY.length
    };
  }

  /**
   * Query videos with backend filter parameters.
   */
  static async getVideos(filters: Record<string, any> = {}): Promise<SelfHostedMedicalVideo[]> {
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'all') params.set('category', filters.category);
      if (filters.collection && filters.collection !== 'all') params.set('collection', filters.collection);
      if (filters.subtopic && filters.subtopic !== 'all') params.set('subtopic', filters.subtopic);
      if (filters.topic && filters.topic !== 'all') params.set('topic', filters.topic);
      if (filters.phase && filters.phase !== 'all') params.set('phase', filters.phase);
      if (filters.difficulty && filters.difficulty !== 'all') params.set('difficulty', filters.difficulty);
      if (filters.mediaType && filters.mediaType !== 'all') params.set('mediaType', filters.mediaType);
      if (filters.duration) params.set('duration', filters.duration);
      if (filters.query && filters.query.trim()) params.set('query', filters.query.trim());
      if (filters.status) params.set('status', filters.status);

      const qs = params.toString();
      const url = qs ? `${API_BASE}/videos?${qs}` : `${API_BASE}/videos`;
      const res = await safeFetchJson<SelfHostedMedicalVideo[]>(url);
      if (res.ok && Array.isArray(res.data)) {
        return res.data;
      }
    } catch {
      // fallback
    }
    return MEDICAL_VIDEO_LIBRARY;
  }

  /**
   * Get single video by ID.
   */
  static async getVideoById(id: string): Promise<SelfHostedMedicalVideo | null> {
    try {
      const res = await safeFetchJson<SelfHostedMedicalVideo>(`${API_BASE}/videos/${encodeURIComponent(id)}`);
      if (res.ok && res.data) {
        return res.data;
      }
    } catch {
      // fallback
    }
    return MEDICAL_VIDEO_LIBRARY.find(v => v.id === id) || null;
  }

  /**
   * Submit new draft video (Faculty / Admin only).
   */
  static async createVideo(payload: Partial<SelfHostedMedicalVideo>, role: UserRole = 'faculty'): Promise<SelfHostedMedicalVideo> {
    const res = await safeFetchJson<{ success: boolean; video: SelfHostedMedicalVideo }>(`${API_BASE}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-medx-role': role
      },
      body: JSON.stringify(payload)
    });

    if (res.ok && res.data?.video) {
      return res.data.video;
    }
    throw new Error('Failed to create video record. Ensure all required fields are provided.');
  }

  /**
   * Update video metadata.
   */
  static async updateVideo(id: string, payload: Partial<SelfHostedMedicalVideo>, role: UserRole = 'faculty'): Promise<SelfHostedMedicalVideo> {
    const res = await safeFetchJson<{ success: boolean; video: SelfHostedMedicalVideo }>(`${API_BASE}/videos/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-medx-role': role
      },
      body: JSON.stringify(payload)
    });

    if (res.ok && res.data?.video) {
      return res.data.video;
    }
    throw new Error('Failed to update video record.');
  }

  /**
   * Submit medical peer review.
   */
  static async submitVideoReview(
    id: string,
    review: { decision: 'approved' | 'revision_requested' | 'rejected'; comments?: string; checklist?: any },
    role: UserRole = 'faculty'
  ): Promise<any> {
    const res = await safeFetchJson(`${API_BASE}/videos/${encodeURIComponent(id)}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-medx-role': role
      },
      body: JSON.stringify(review)
    });

    if (!res.ok) {
      throw new Error('Failed to submit formal peer review.');
    }
    return res.data;
  }

  /**
   * Publish an approved video.
   */
  static async publishVideo(id: string, role: UserRole = 'faculty'): Promise<void> {
    const res = await safeFetchJson(`${API_BASE}/videos/${encodeURIComponent(id)}/publish`, {
      method: 'POST',
      headers: {
        'x-medx-role': role
      }
    });

    if (!res.ok) {
      throw new Error('Failed to publish video.');
    }
  }

  /**
   * Archive a video.
   */
  static async archiveVideo(id: string, role: UserRole = 'admin'): Promise<void> {
    const res = await safeFetchJson(`${API_BASE}/videos/${encodeURIComponent(id)}/archive`, {
      method: 'POST',
      headers: {
        'x-medx-role': role
      }
    });

    if (!res.ok) {
      throw new Error('Failed to archive video.');
    }
  }

  /**
   * Fetch all video generation jobs.
   */
  static async getJobs(activeRole: UserRole = 'author'): Promise<VideoGenerationJob[]> {
    return StorageService.getVideoJobs();
  }

  /**
   * Fetch published videos.
   */
  static async getPublishedVideos(lessonId?: string): Promise<LessonVideo[]> {
    return StorageService.getPublishedVideos(lessonId);
  }

  /**
   * Retired generation entry point.
   */
  static async queueJob(payload: CreateVideoJobRequest): Promise<{ success: boolean; job: VideoGenerationJob; message?: string }> {
    throw new Error('Video generation is retired. Browse official educational videos in Medical Videos.');
  }

  /**
   * Retry a failed video job.
   */
  static async retryJob(jobId: string, role: UserRole = 'author'): Promise<void> {
    const res = await safeFetchJson(`${API_BASE}/jobs/${jobId}/retry`, {
      method: 'POST',
      headers: { 'x-medx-role': role === 'student' ? 'author' : role }
    });

    if (!res.ok) {
      const job = StorageService.getVideoJobs().find(j => j.id === jobId);
      if (job && job.retryCount < job.maxRetries) {
        StorageService.updateVideoJob(jobId, {
          status: 'queued',
          retryCount: job.retryCount + 1,
          error: undefined
        });
      }
    }
  }

  /**
   * Cancel an in-flight or queued job.
   */
  static async cancelJob(jobId: string, role: UserRole = 'author'): Promise<void> {
    const res = await safeFetchJson(`${API_BASE}/jobs/${jobId}/cancel`, {
      method: 'POST',
      headers: { 'x-medx-role': role === 'student' ? 'author' : role }
    });

    if (!res.ok) {
      StorageService.updateVideoJob(jobId, { status: 'cancelled' });
    }
  }

  /**
   * Submit medical peer review.
   */
  static async submitReview(payload: MedicalReviewForm): Promise<void> {
    const res = await safeFetchJson<{ success: boolean; error?: string }>(`${API_BASE}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok && res.data?.error) {
      throw new Error('The review could not be saved. Please try again.');
    }

    // Persist locally in storage as well
    StorageService.saveVideoReview(payload);
  }

  /**
   * Get student video progress.
   */
  static async getProgress(studentId: string, videoId: string): Promise<VideoStudentProgress | null> {
    const res = await safeFetchJson<VideoStudentProgress>(
      `${API_BASE}/progress?studentId=${encodeURIComponent(studentId)}&videoId=${encodeURIComponent(videoId)}`
    );

    if (res.ok && res.data) {
      return res.data;
    }

    return StorageService.getVideoProgress(studentId, videoId);
  }

  /**
   * Save student video progress.
   */
  static async saveProgress(progress: Partial<VideoStudentProgress> & { videoId: string; studentId: string; notes?: string }): Promise<void> {
    // Always save to localStorage immediately
    StorageService.saveVideoProgress(progress);

    // Sync to backend if available
    await safeFetchJson(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    });
  }
}
