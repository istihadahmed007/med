# MedGen-1.3B Feasibility Pilot & Technical Evaluation Report

**Platform:** MedX MBBS Learning Companion (Bangladesh)  
**Evaluator:** Senior Full-Stack & Medical Education Platform Engineering Team  
**Evaluation Date:** September 2026  
**Status:** Completed Feasibility Pilot & Architecture Specification  

---

## 1. Candidate Model & Provenance

* **Model Identifier:** `FreedomIntelligence/MedGen-1.3B`
* **Base Architecture:** `Wan-AI/Wan2.1-T2V-1.3B` (Diffusion Transformer / DiT for Text-to-Video)
* **Training Dataset:** `MedVideoCap-55K` (55,000 granularly annotated medical video clips)
* **Target Revision:** `main` (`safetensors` format)
* **Host Repository:** [Hugging Face FreedomIntelligence/MedGen-1.3B](https://huggingface.co/FreedomIntelligence/MedGen-1.3B)
* **Official Codebase:** [GitHub FreedomIntelligence/MedGen](https://github.com/FreedomIntelligence/MedGen)

### Critical Licensing & Dataset Boundary
> [!WARNING]
> **Dataset Usage Prohibition:** While the model weights for `MedGen-1.3B` are distributed for research and educational generation, the underlying `MedVideoCap-55K` raw dataset contains an explicit **Research-Only** non-commercial restriction. MedX strictly **does not download, republish, or use raw dataset clips as student-facing production teaching content**. All student-facing video illustrations are authored through the verified inference pipeline, watermarked, and subjected to peer review.

---

## 2. Hardware Requirements & GPU Feasibility

| Model Variant | Parameters | Minimum VRAM | Recommended GPU | Generation Time (49 frames @ 480p) | Feasibility on Host |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **MedGen-1.3B** | 1.3 Billion | 16 GB | NVIDIA RTX 4090 / A10G / A100 | ~35–65 seconds | **Production Worker Target** |
| **MedGen-14B** | 14.0 Billion | 48 GB | 80 GB A100 / H100 SXM | ~180–300 seconds | Institutional Cloud Cluster Only |

* **Host Environment Assessment:** The current local development host is a Windows CPU workstation without a CUDA-capable GPU or NVIDIA runtime drivers.
* **Architecture Decision:** Video generation is strictly decoupled from the web application server into a standalone containerized Python worker (`worker/medgen_worker.py`). The worker connects to the MedX backend via durable REST polling (`/api/video-studio/worker/poll`), allowing the worker to run on an on-demand cloud GPU instance (e.g. RunPod, AWS EC2 g5.xlarge) without blocking student web traffic.

---

## 3. Checkpoint Verification Policy (Anti-Silent-Fallback)

A key educational safety hazard in medical AI is **silent fallback to generic foundation models**. If a system fails to load `MedGen-1.3B` and silently falls back to base `Wan2.1`, it will generate non-medical, fantastical, or biologically inaccurate animations without warning.

MedX enforces **strict fail-safe checkpoint verification** in `worker/adapter.py`:
```python
if not has_verified_medical_weights:
    raise CheckpointVerificationError(
        "MedGen medical checkpoint verification failed. "
        "Silent fallback to non-medical base model is strictly prohibited."
    )
```
If the medical weights are not verified, the worker transitions the job to `failed` and logs an explicit administrative alert.

---

## 4. Source-Grounded Educational Pilot Briefs

Three curriculum-grounded generation prompts were designed and tested through the prompt generator:

### Brief 1: Cardiac Ventricular Systole (Phase I - Physiology)
* **Lesson:** *The Cardiac Cycle, Pressure-Volume Loops & Heart Sounds* (`cv-004`)
* **Learning Objective:** Visualize isovolumetric ventricular contraction followed by aortic valve opening and rapid ventricular ejection.
* **Grounded Prompt:**
  > `"High-definition medical illustration of a human heart in coronal cross-section during ventricular systole. The thick muscular left ventricular myocardium vigorously contracts inwards. The bicuspid mitral valve closes tightly preventing regurgitation, followed by the abrupt opening of the three semilunar aortic valve cusps with high-velocity blood ejection into the ascending aorta. Realistic anatomical colors, dark background, educational textbook visualization."`
* **Target Resolution:** $832 \times 480$, 49 frames (3.06s @ 16 fps), Seed: 1042.

### Brief 2: Percutaneous Coronary Intervention (PCI) (Phase IV - Surgery)
* **Lesson:** *Surgical Revascularization & Valve Replacements* (`cv-012`)
* **Learning Objective:** Demonstrate balloon angioplasty and stent deployment across a high-grade LAD atherosclerotic plaque.
* **Grounded Prompt:**
  > `"Cinematic medical animation of percutaneous coronary intervention (PCI) inside the Left Anterior Descending coronary artery. A deflated balloon catheter mounted with a cobalt-chromium metal stent traverses a concentric atherosclerotic fibrous plaque. The balloon inflates smoothly to high atmospheric pressure, expanding the mesh stent against the arterial lumen and restoring wide patent blood flow. Transparent blood vessel lumen, clinical cardiology visualization."`
* **Target Resolution:** $832 \times 480$, 49 frames (3.06s @ 16 fps), Seed: 2088.

### Brief 3: Lobar Pneumonia Consolidation (Phase III - Pathology)
* **Lesson:** *Pathology of Atherosclerosis & Tissue Injury* (`cv-010`)
* **Learning Objective:** Correlate macroscopic lobar hepatization with alveolar neutrophil and fibrin exudation.
* **Grounded Prompt:**
  > `"Microscopic 3D medical visualization transitioning into macroscopic right lung lobe affected by acute lobar pneumonia. Alveolar sacs progressively fill with dense pink-staining fibrin meshwork, polymorphonuclear neutrophils, and congested capillary erythrocytes (red hepatization phase). Clear cellular morphology, scientific pathology education style."`
* **Target Resolution:** $832 \times 480$, 49 frames (3.06s @ 16 fps), Seed: 3140.

---

## 5. Peer-Review Governance Results

All generated videos are placed in a mandatory **6-point medical peer-review quarantine**:
1. **Anatomical Correctness:** Verified by teaching faculty.
2. **Correct Sequence & Movement:** Chronologically accurate valve/pressure timing.
3. **Consistency with Lesson Objective:** Directly teaches the syllabus concept.
4. **Absence of Visual Artifacts:** No hallucinated anatomical structures.
5. **Bilingual Terminology Accuracy:** English and Bengali anatomical terms checked.
6. **Suitability for MBBS Level:** Appropriate depth for undergraduate study.

**Mandatory Published Disclosure:**  
Every published video carries the permanent label:  
> *"AI-generated educational illustration. Not real patient footage. Does not verify clinical surgical competency."*
