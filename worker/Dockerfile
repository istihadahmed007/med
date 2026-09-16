# MedGen-1.3B Dedicated GPU Worker Container
FROM nvidia/cuda:12.1.1-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.10 \
    python3-pip \
    python3.10-dev \
    ffmpeg \
    git \
    libgl1-mesa-glx \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt

COPY adapter.py medgen_worker.py ./

# Environment defaults
ENV MEDX_API_URL="http://localhost:3000"
ENV MEDX_WORKER_TOKEN="medx_gpu_worker_secret_key_2026"
ENV POLL_INTERVAL_SECONDS=5

CMD ["python3", "medgen_worker.py"]
