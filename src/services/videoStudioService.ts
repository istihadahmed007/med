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
   * Fetch all video generation jobs.
   * Uses local storage directly to prevent broken video endpoint errors.
   */
  static async getJobs(activeRole: UserRole = 'author'): Promise<VideoGenerationJob[]> {
    return StorageService.getVideoJobs();
  }

  /**
   * Fetch published videos.
   * Legacy lesson playback only; this storage is not the verified Video Studio catalog.
   */
  static async getPublishedVideos(lessonId?: string): Promise<LessonVideo[]> {
    return StorageService.getPublishedVideos(lessonId);
  }

  /**
   * Retired generation entry point. Never fabricate a completed video.
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
  static async saveProgress(progress: Partial<VideoStudentProgress> & { videoId: string; studentId: string }): Promise<void> {
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
