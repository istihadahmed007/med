"""
MedGen Background GPU Worker Daemon
Polls the MedX Video Studio API for queued jobs and executes inference.
Runs outside the web application process to safeguard web server responsiveness.
"""

import os
import sys
import time
import json
import logging
import argparse
import urllib.request
import urllib.error
from typing import Optional, Dict, Any

from adapter import MedGenInferenceAdapter, GenerationConfig, CheckpointVerificationError

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] [Worker] %(message)s")
logger = logging.getLogger("MedGenWorker")

API_BASE_URL = os.environ.get("MEDX_API_URL", "http://localhost:3000")
WORKER_TOKEN = os.environ.get("MEDX_WORKER_TOKEN", "medx_gpu_worker_secret_key_2026")
POLL_INTERVAL_SECONDS = int(os.environ.get("POLL_INTERVAL_SECONDS", "5"))

def api_request(endpoint: str, data: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
    """Helper to perform JSON HTTP requests to MedX server."""
    url = f"{API_BASE_URL}{endpoint}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {WORKER_TOKEN}"
    }
    body = json.dumps(data).encode("utf-8") if data else None

    req = urllib.request.Request(url, data=body, headers=headers, method="POST" if data else "GET")
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        logger.error(f"HTTP Error {e.code} on {endpoint}: {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        logger.error(f"Connection error to {url}: {e}")
        return None

def poll_for_job() -> Optional[Dict[str, Any]]:
    """Polls server for the next queued video generation job."""
    res = api_request("/api/video-studio/worker/poll", {"worker_id": "gpu-worker-node-01"})
    if res and res.get("job"):
        return res["job"]
    return None

def complete_job(job_id: str, success: bool, output_data: Dict[str, Any], error_msg: Optional[str] = None):
    """Notifies server of job completion or failure."""
    payload = {
        "job_id": job_id,
        "success": success,
        "output": output_data,
        "error": error_msg,
        "completed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    api_request("/api/video-studio/worker/complete", payload)

def run_worker_loop(checkpoint_dir: Optional[str] = None, once: bool = False):
    """Main worker daemon loop."""
    logger.info(f"Initializing MedGen Worker Daemon connecting to: {API_BASE_URL}")
    adapter = MedGenInferenceAdapter(checkpoint_dir=checkpoint_dir)

    try:
        checkpoint_status = adapter.verify_medical_checkpoint()
        logger.info(f"Medical checkpoint verified: {checkpoint_status}")
    except CheckpointVerificationError as e:
        logger.critical(f"FATAL: Medical checkpoint verification failed: {e}")
        logger.critical("Worker will not run without verified medical model weights. Exiting.")
        sys.exit(1)

    logger.info("Worker daemon ready. Polling for instructor video authoring jobs...")

    while True:
        try:
            job = poll_for_job()
            if job:
                job_id = job["id"]
                prompt = job["prompt"]
                lesson_id = job.get("lesson_id", "unlinked")
                logger.info(f"Picked up Job #{job_id} for Lesson [{lesson_id}]")
                logger.info(f"Prompt: {prompt}")

                output_dir = os.path.join("output", job_id)
                os.makedirs(output_dir, exist_ok=True)
                output_video_path = os.path.join(output_dir, "lesson_illustration.mp4")

                config = GenerationConfig(
                    prompt=prompt,
                    width=job.get("width", 832),
                    height=job.get("height", 480),
                    num_frames=job.get("num_frames", 49),
                    seed=job.get("seed", 42),
                    output_path=output_video_path
                )

                try:
                    telemetry = adapter.generate_video(config)
                    output_data = {
                        "video_url": f"/media/generated/{job_id}/lesson_illustration.mp4",
                        "poster_url": f"/media/generated/{job_id}/poster.webp",
                        "telemetry": telemetry.__dict__,
                        "status": "draft",
                        "review_status": "in_review"
                    }
                    complete_job(job_id, success=True, output_data=output_data)
                    logger.info(f"Successfully processed Job #{job_id}. Saved as private draft for review.")
                except Exception as ex:
                    logger.error(f"Inference error on Job #{job_id}: {ex}")
                    complete_job(job_id, success=False, output_data={}, error_msg=str(ex))

            if once:
                break

            time.sleep(POLL_INTERVAL_SECONDS)
        except KeyboardInterrupt:
            logger.info("Worker stopped by operator. Exiting.")
            break
        except Exception as e:
            logger.error(f"Unexpected error in worker loop: {e}")
            time.sleep(POLL_INTERVAL_SECONDS)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MedGen GPU Worker for MedX")
    parser.add_argument("--checkpoint-dir", type=str, default="", help="Path to local MedGen weights directory")
    parser.add_argument("--once", action="store_true", help="Run once and exit (for CI/automated test verification)")
    args = parser.parse_args()

    run_worker_loop(checkpoint_dir=args.checkpoint_dir, once=args.once)
