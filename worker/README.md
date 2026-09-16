# MedGen 1.3B AI Video Worker Daemon

This module contains the decoupled Python worker responsible for generating medical education videos using the **MedGen-1.3B** model (`FreedomIntelligence/MedGen-1.3B`), built upon the **Wan2.1-T2V-1.3B** diffusion transformer architecture.

---

## Architecture & Security Decoupling

1. **Decoupled Asynchronous Processing:** The video generation pipeline is completely separated from the website frontend and main Node.js web server. Long-running GPU jobs never block HTTP client requests.
2. **Strict Medical Checkpoint Verification:** The inference adapter (`worker/adapter.py`) inspects model config and weight fingerprints before inference. If weights are missing, corrupt, or general-purpose vanilla Wan2.1 without medical fine-tuning, the worker halts immediately with `CheckpointVerificationError` rather than silently generating invalid visuals.
3. **Dataset Governance & License Boundaries:**
   - **Code / Architecture:** Apache-2.0
   - **Model Weights (`MedGen-1.3B`):** Open weights for medical illustration synthesis
   - **Dataset (`MedVideoCap-55K`):** **Research-Only Restriction**. The raw training dataset clips must **NOT** be downloaded, republished, or redistributed as production teaching videos on MedX without resolving third-party clinical rights.
4. **Mandatory Faculty Peer Review:** All generated outputs start in `draft` state (`publicationStatus: 'in_review'`) and remain isolated from student routes until signed off by faculty through the 6-point BM&DC review checklist.

---

## System Requirements

| Model Variant | Minimum VRAM | Recommended GPU | Output Resolution | Output Length |
| :--- | :--- | :--- | :--- | :--- |
| **MedGen-1.3B** (Selected) | **16 GB** | NVIDIA RTX 4090 / A5000 / A10G (EC2 g5.xlarge) | 832x480 / 720x480 | 49 frames @ 16 fps (~3.0s) |
| **MedGen-14B** | **48 GB** | NVIDIA A100 (80GB) / H100 | 1280x720 (720p) | 81 frames @ 16 fps (~5.0s) |

> **Host Note:** Running on a local Windows CPU machine is intended for integration testing and code validation. Actual inference requires a Linux GPU instance or container.

---

## Quickstart Setup

### Step 1: Environment Preparation

Ensure Python 3.10+ and CUDA 12.1+ are installed:

```bash
cd worker
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install PyTorch with CUDA support
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

# Install worker requirements
pip install -r requirements.txt
```

### Step 2: Download MedGen-1.3B Checkpoint

Authenticate with Hugging Face and download the model:

```bash
huggingface-cli login --token YOUR_HF_TOKEN

python -c "
from huggingface_hub import snapshot_download
snapshot_download(
    repo_id='FreedomIntelligence/MedGen-1.3B',
    local_dir='./checkpoints/MedGen-1.3B',
    revision='main'
)
"
```

### Step 3: Run Standalone Pilot Validation

Run the inference adapter test with sample curriculum briefs:

```bash
python adapter.py --checkpoint-dir ./checkpoints/MedGen-1.3B --output-dir ./outputs --device cuda
```

### Step 4: Run Continuous Worker Daemon

Start the polling worker daemon to continuously process jobs queued by instructors from the MedX Video Studio:

```bash
python medgen_worker.py \
  --backend http://localhost:3000 \
  --token your_secure_worker_auth_token_here \
  --checkpoint ./checkpoints/MedGen-1.3B \
  --device cuda
```

---

## Docker Deployment (RunPod / AWS ECS)

Build and run the containerized GPU worker:

```bash
# Build Docker image
docker build -t medx-medgen-worker:latest -f worker/Dockerfile .

# Run container with NVIDIA GPU access
docker run --gpus all \
  -e MEDX_BACKEND_URL="https://medx.vartualtutor.com" \
  -e MEDX_WORKER_TOKEN="your_secure_worker_auth_token_here" \
  -e MEDGEN_DEVICE="cuda" \
  -v /mnt/checkpoints/MedGen-1.3B:/workspace/checkpoints/MedGen-1.3B:ro \
  -v /mnt/media_storage:/workspace/media_output \
  medx-medgen-worker:latest
```

---

## API Worker Contract

- **Poll Jobs:** `POST /api/video-studio/worker/poll`
  - Header: `Authorization: Bearer <MEDX_WORKER_TOKEN>`
  - Response: `{ job: { id, prompt, resolution, seed, requiredStructures, ... } }` or `{ job: null }`
- **Report Completion:** `POST /api/video-studio/worker/complete`
  - Header: `Authorization: Bearer <MEDX_WORKER_TOKEN>`
  - Payload:
    ```json
    {
      "job_id": "vj-1234",
      "status": "succeeded",
      "video_url": "/media/vj-1234.mp4",
      "poster_url": "/media/vj-1234.webp",
      "duration_seconds": 18,
      "telemetry": {
        "model_identifier": "FreedomIntelligence/MedGen-1.3B",
        "model_revision": "main",
        "base_architecture": "Wan-AI/Wan2.1-T2V-1.3B",
        "is_verified_medical_weights": true,
        "seed": 1042,
        "duration_seconds": 42.6,
        "peak_vram_mb": 15420.0,
        "resolution": "832x480",
        "frame_count": 49
      }
    }
    ```
