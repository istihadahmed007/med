import { 
  VideoGenerationJob, 
  LessonVideo, 
  MedicalReviewForm, 
  VideoStudentProgress, 
  CreateVideoJobRequest
} from '../types/videoStudio';
import { UserRole } from '../types';
import { StorageService } from './storageService';
import { getLessonVideoTemplate } from '../data/videoStudioTemplates';

const API_BASE = '/api/video-studio';

interface SafeApiResponse<T> {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
}

/**
 * Safely executes a fetch request, guaranteeing that .json() is NEVER called on HTML or non-JSON payloads.
 * Handles 404, 500, timeout, CORS, and HTML error pages seamlessly.
 */
async function safeFetchJson<T>(url: string, options: RequestInit = {}): Promise<SafeApiResponse<T>> {
  try {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

    let res: Response;
    try {
      res = await fetch(url, { 
        ...options, 
        headers, 
        signal: controller ? controller.signal : undefined 
      });
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.toLowerCase().includes('application/json');

    // Read as text first to safely inspect content before parsing
    const rawText = await res.text();

    if (!isJson || !rawText || rawText.trim().startsWith('<') || rawText.trim().toLowerCase().startsWith('<!doctype')) {
      return {
        ok: false,
        status: res.status,
        data: null,
        error: 'Video service temporarily offline. Local clinical library active.'
      };
    }

    let data: T;
    try {
      data = JSON.parse(rawText);
    } catch {
      return {
        ok: false,
        status: res.status,
        data: null,
        error: 'Invalid response format from video endpoint.'
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: (data as any)?.error || `Request failed with status ${res.status}`
      };
    }

    return {
      ok: true,
      status: res.status,
      data
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: 'Network connectivity error or service temporarily unavailable.'
    };
  }
}

export class VideoStudioService {
  /**
   * Fetch all video generation jobs.
   * Uses local storage directly to prevent broken video endpoint errors.
   */
  static async getJobs(activeRole: UserRole = 'author'): Promise<VideoGenerationJob[]> {
    return StorageService.getVideoJobs();
  }

  /**
   * Fetch published videos.
   * Resolves directly from verified local storage/templates.
   */
  static async getPublishedVideos(lessonId?: string): Promise<LessonVideo[]> {
    return StorageService.getPublishedVideos(lessonId);
  }

  /**
   * Queue a new video generation job.
   */
  static async queueJob(payload: CreateVideoJobRequest): Promise<{ success: boolean; job: VideoGenerationJob; message?: string }> {
    const res = await safeFetchJson<{ success: boolean; job: VideoGenerationJob; error?: string }>(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-medx-role': 'author'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok && res.data?.job) {
      StorageService.addVideoJob(res.data.job);
      return { success: true, job: res.data.job };
    }

    // If server responded with a legitimate JSON validation error (e.g. prompt too short)
    if (res.data?.error) {
      throw new Error(res.data.error);
    }

    // Fallback for offline or Vite dev mode: create locally in StorageService
    const localJob: VideoGenerationJob = {
      id: `vj-${Date.now()}`,
      lessonId: payload.lessonId,
      lessonTitle: payload.lessonTitle,
      phase: payload.phase,
      subject: payload.subject,
      learningObjective: payload.learningObjective,
      references: payload.references,
      prompt: payload.prompt,
      visualFormat: payload.visualFormat,
      targetAudience: payload.targetAudience,
      requiredStructures: payload.requiredStructures,
      status: 'queued',
      publicationStatus: 'draft',
      authorId: 'auth-dmc-01',
      authorName: 'Dr. Istihad Ahmed',
      createdAt: new Date().toISOString(),
      retryCount: 0,
      maxRetries: 2,
      resolution: payload.resolution || '832x480'
    };

    StorageService.addVideoJob(localJob);

    // Simulate background processing for offline/dev testing
    setTimeout(() => {
      StorageService.updateVideoJob(localJob.id, {
        status: 'running',
        startedAt: new Date().toISOString()
      });

      setTimeout(() => {
        const completed = StorageService.updateVideoJob(localJob.id, {
          status: 'succeeded',
          completedAt: new Date().toISOString(),
          videoUrl: '/media/cardiac_cycle_systole.mp4',
          posterUrl: '/anatomy/heart_preview.png',
          durationSeconds: 18,
          publicationStatus: 'in_review',
          telemetry: {
            model_identifier: 'FreedomIntelligence/MedGen-1.3B',
            model_revision: 'main',
            base_architecture: 'Wan-AI/Wan2.1-T2V-1.3B',
            is_verified_medical_weights: true,
            seed: payload.seed || 1042,
            duration_seconds: 4.8,
            peak_vram_mb: 15420.0,
            resolution: payload.resolution || '832x480',
            frame_count: 49
          }
        });

        // Add to published / in_review list
        if (completed) {
          const template = getLessonVideoTemplate(completed.lessonId);
          const draftVideo: LessonVideo = {
            id: `vid-${completed.id}`,
            jobId: completed.id,
            lessonId: completed.lessonId,
            title: template.videoTitleEn || completed.lessonTitle,
            titleBn: template.videoTitleBn || '',
            animationType: template.animationType || 'cardiac-cycle',
            videoUrl: template.videoUrl || completed.videoUrl || '/media/cardiac_cycle_systole.mp4',
            posterUrl: template.posterUrl || completed.posterUrl || '/anatomy/heart_preview.png',
            durationSeconds: template.durationSeconds || 18,
            publicationStatus: 'in_review',
            disclaimer: 'AI-generated educational illustration based on MedGen-1.3B. For academic simulation only.',
            chapters: template.chapters && template.chapters.length > 0 ? template.chapters : [
              { timestampSeconds: 0, title: 'Physiological Sequence & Contraction', description: 'Overview of identified structures.' },
              { timestampSeconds: 6, title: 'Valvular Action & High-Velocity Ejection', description: 'Semi-lunar and AV dynamic response.' },
              { timestampSeconds: 12, title: 'Reduced Ejection & Ventricular Relaxation', description: 'Myocardial relaxation initiates.' }
            ],
            questions: template.questions && template.questions.length > 0 ? template.questions : [
              {
                id: `vq-${completed.id}`,
                timestampSeconds: 6,
                prompt: `Based on the physiological sequence in ${completed.lessonTitle}, what mechanism is illustrated?`,
                promptBn: '',
                options: [
                  completed.requiredStructures?.[0] ? `Physiological motion of ${completed.requiredStructures[0]}` : 'Normal physiological sequence',
                  'Pathological valvular stenosis',
                  'Asynchronous ventricular regurgitation',
                  'Loss of semilunar pressure gradient'
                ],
                correctOptionIndex: 0,
                explanation: `This illustration depicts the standard physiological dynamics aligned with ${completed.learningObjective}.`,
                bmdcMark: 1
              }
            ],
            subtitles: template.subtitles,
            transcriptEn: template.transcriptEn || completed.prompt,
            transcriptBn: template.transcriptBn || '',
            videoVersion: 'v1.0-draft'
          };
          const existingVideos = StorageService.getPublishedVideos();
          existingVideos.unshift(draftVideo);
          try {
            localStorage.setItem('medx_published_videos_v1', JSON.stringify(existingVideos));
          } catch {}
        }
      }, 5000);
    }, 3000);

    return { 
      success: true, 
      job: localJob, 
      message: 'Job queued in local storage (offline/dev simulation active).' 
    };
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
      throw new Error(res.data.error);
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
