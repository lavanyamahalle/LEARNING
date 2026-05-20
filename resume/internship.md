# Ekalipi Technologies — Software Developer Internship
### Apr 2025 – Jul 2025 | Complete Technical Document

---

## The Goal
Build and deploy a **Text-to-Speech (TTS) web app** using CDAC's ESPnet-based engine — supporting **17 Indian languages**, male and female voices, accessible via browser.

---

## Phase 1 — Getting the Engine Running + Building the Web App

**Problem:** Python version mismatch. The CDAC TTS engine wouldn't run out of the box — no compatible environment existed.

**Fix:** Manually cloned the CDAC engine, inspected all dependencies one by one, identified correct Python version, and resolved compatibility issues to get the engine running locally.

### Why Flask?
The CDAC engine was pure Python — a set of scripts centered around `inference.py`. It had no UI, no API, no way for a normal user to interact with it.

Flask was the natural choice because:

| Reason | Detail |
|---|---|
| **Python-native** | Flask is Python — plugs directly into inference.py with no glue code |
| **Lightweight** | No heavy framework needed — just a form, a button, an API endpoint |
| **Fast to build** | Single file `app.py` was enough to wrap the entire engine |
| **Inference.py stays untouched** | Flask just calls it — CDAC's core logic is never modified |

```python
# app.py — the entire web layer in its simplest form
from flask import Flask, request, send_file
from inference import synthesize   # CDAC's core engine

app = Flask(__name__)

@app.route('/synthesis', methods=['POST'])
def synthesis():
    text = request.form['text']
    lang = request.form['language']
    gender = request.form['gender']
    
    audio_path = synthesize(text, lang, gender)  # calls inference.py
    return send_file(audio_path)                 # returns audio to browser
```

Django would have been overkill. A simple script had no UI. Flask was exactly the right size.

---

## Phase 2 — Building the Web App + Deployment Journey

### Web App Built
- **Stack:** Flask + HTML
- User selects: text, language, voice gender
- API endpoint `/synthesis` → calls `inference.py` (core TTS pipeline by CDAC)

### Deployment Journey

| Option Tried | Problem |
|---|---|
| GoDaddy cPanel | Flask not supported |
| Render (default) | Org uses Dropbox, not GitHub |
| GitHub directly | Model files 143MB each — limit is 100MB |
| Digital Ocean Droplets | Too expensive (S3 buckets) |
| **Git LFS** | ✅ Final solution |

### Git LFS — How It Works
```
GitHub Repo          LFS Server
     |                    |
  pointer.pth  -------> actual 143MB file
  (few bytes)            stored here

Render sees pointer → fetches real file from LFS server automatically
```

### Git LFS Commands Used
```bash
# Install and initialize LFS
git lfs install

# Track large model files only
git lfs track "*.pth"          # 143MB model files - correct use of LFS

# Commit the tracking config
git add .gitattributes
git add model.pth
git commit -m "Add model via LFS"
git push origin main
```

### Bandwidth Problem
```bash
# Mistake: tracked small files in LFS unnecessarily
git lfs track "*.npz"          # only 770 bytes — wrong!
git lfs track "*.yaml"         # only 5KB — wrong!

# Correct: only track files that actually need LFS
git lfs track "*.pth"          # 143MB — this makes sense ✅
```

---

## Phase 3 — The Environmental Bugs

### Bug 1: File Permission Error

**Problem:** Model files, phone dict, and vocoder had read permissions locally but threw `Permission Denied` on Render's cloud.

**Understanding chmod:**
```
chmod 644  →  rw- r-- r--   (owner: read+write, others: read only)
chmod 744  →  rwx r-- r--   (owner: read+write+execute ✅)
```

**Commands used:**
```bash
# Check current permissions
ls -la model.pth

# Fix individual files
chmod 744 model.pth
chmod 744 phone_dict
chmod 744 vocoder

# Fix entire folder at once
chmod -R 744 Fastspeech2_HS/
```

---

### Bug 2: Hardcoded Absolute Paths → File Not Found

**Problem:** `config.yaml` and `inference.py` paths were hardcoded — worked on local machine, broke on cloud.

**Absolute vs Relative Path:**
```
Absolute Path (BROKEN on cloud):
/home/yourname/ekalipi/Fastspeech2_HS/marathi/config.yaml
^ starts from root — machine specific — doesn't exist on Render ❌

Relative Path (WORKS everywhere):
./Fastspeech2_HS/marathi/config.yaml
^ starts from wherever the app runs — always correct ✅
```

**Fix in inference.py:**
```python
# BEFORE — broken on cloud
config_path = "/home/yourname/ekalipi/config.yaml"

# AFTER — works everywhere
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(BASE_DIR, "config.yaml")
# os.path.abspath(__file__) = location of THIS file
# config.yaml sits next to inference.py — always found ✅
```

---

### Bug 3: Pickle Data Error (The Trickiest One)

**Problem:** The TTS engine needed three stats files:
- `feats_stats.npz` — acoustic feature statistics
- `energy_stats.npz` — energy/loudness statistics
- `pitch_stats.npz` — pitch statistics

These were saved using **Python pickling** (serializing Python objects to binary format). Modern NumPy enforces `allow_pickle=False` as a security rule. Render used modern NumPy — local machine had an older permissive version.

```
Before Fix:
Local (old NumPy)  →  allow_pickle=True by default  →  ✅ works
Render (new NumPy) →  allow_pickle=False by default  →  ❌ crash

After Fix:
Local (old NumPy)  →  plain numpy array  →  ✅ works
Render (new NumPy) →  plain numpy array  →  ✅ works
```

**Fix — fix_stats.py:**
```python
import numpy as np

files = ["feats_stats.npz", "energy_stats.npz", "pitch_stats.npz"]

for f in files:
    # Step 1: Load old pickled file — allow once
    data = np.load(f, allow_pickle=True)

    # Step 2: Re-save as plain numpy arrays — no pickling
    np.savez(f.replace(".npz", "_fixed.npz"), **data)

# Now safe to load anywhere:
# np.load("feats_stats_fixed.npz", allow_pickle=False) ✅
```

---

## Phase 4 — Docker for Environment Consistency

**Why Docker?** Guarantees identical environment on local machine, cloud, and every team member's system — eliminating "works on my machine" forever.

### Dockerfile (Annotated)
```dockerfile
FROM python:3.10
# Start with Python 3.10 — fixes version mismatch from Phase 1

RUN apt-get update && apt-get install -y git-lfs && git lfs install
# Install git-lfs inside container

WORKDIR /app
# All commands run from /app — equivalent to cd /app

COPY . .
# Copy local project files into /app inside container
# NOTE: .git folder is NOT copied

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# Install all Python dependencies — same versions every time

EXPOSE 8000
# App runs on port 8000

CMD ["gunicorn", "app:app", "--timeout", "120", "--workers", "1", "--threads", "4"]
# Start Flask app using gunicorn (production server)
```

### The git lfs pull Problem Inside Docker
```bash
# What failed inside Dockerfile:
RUN git lfs pull
# Error: Not in a Git repository
# .git folder was never copied by COPY . .

# Fix — pull before building:
git lfs pull          # run on local machine first
                      # real model files now in working directory
docker build .        # COPY . . picks up real files, not pointers ✅
```

### Final Fix — Untrack Small Files from LFS
```bash
# Root cause: tiny files were tracked in LFS for no reason
# feats_stats.npz  →  1.37 KB
# energy_stats.npz →  770 bytes
# These should NEVER have been in LFS

# Remove from LFS
git lfs untrack "*.npz"
git add .gitattributes

# Force add as regular git files
git add --force Fastspeech2_HS/marathi/male/model/feats_stats.npz
git add --force Fastspeech2_HS/marathi/male/model/energy_stats.npz
git add --force Fastspeech2_HS/marathi/male/model/pitch_stats.npz

git commit -m "Remove npz files from LFS, store as regular files"
git push origin main
# COPY . . now always picks them up correctly ✅
```

### Verification
```bash
# Check file hash matches between local and cloud
md5sum /app/Fastspeech2_HS/marathi/male/model/feats_stats.npz
# → f419c74c5557c45fc00cf46c0ad819b4 ✅

# Confirm numpy loads without pickling
python3 -c "import numpy as np; np.load('feats_stats.npz', allow_pickle=False)"
# Silence = success ✅

# Final proof — TTS working
# INFO - Audio saved to /app/static/audio/output_marathi_male_1750087517.wav ✅
```

---

## Phase 5 — Cost Optimization via Model Preloading

### The Problem
Git LFS gives **1GB free bandwidth per month**. Every time Render deployed or restarted, it fetched all model files fresh from LFS:

```
17 languages × 2 genders × 143MB = ~4.8GB per full fetch
                                     ^^^^
                                     exceeds 1GB free tier instantly
                                     $120/month in overage charges
```

### The Fix — Preloading Only Required Models
Instead of fetching all 34 model files on every deploy, only the models needed for **active testing** were preloaded into the repo directly.

**How preloading works:**
```bash
# Step 1: Pull only specific models locally (not all 34)
git lfs pull --include="Fastspeech2_HS/marathi/male/model/*"
git lfs pull --include="Fastspeech2_HS/hindi/female/model/*"
# Only pull what you actually need for current testing

# Step 2: Untrack from LFS — commit as regular files
git lfs untrack "Fastspeech2_HS/marathi/male/model/*.pth"
git add --force Fastspeech2_HS/marathi/male/model/model.pth
git commit -m "Preload marathi male model as regular file"
git push origin main
```

**What changes:**
```
Before Preloading:
Render deploy → fetches ALL models from LFS → 4.8GB bandwidth → $120/month

After Preloading:
Render deploy → COPY . . picks up preloaded models directly → 0 LFS fetch → $0
```

**Why this works with Docker:**
```dockerfile
COPY . .
# Since model files are now regular git files (not LFS pointers)
# Docker copies them directly into the image
# No LFS server contact needed at all ✅
```

### Result
- **Saved $120/month** in LFS bandwidth overage
- Faster deploys — no waiting for LFS downloads
- Combined with untracking small .npz files — LFS bandwidth usage dropped to near zero

---

## Resume Bullets (Amazon-Ready)

1. **Resolved Git LFS issues**, reducing infrastructure costs by **$120/month**, fixing path misconfigurations, and applying secure file permissions for smooth cloud integration.

2. Resolved a critical **pickle data bug** causing incorrect data rendering across environments, ensuring data integrity and improving system reliability.

3. **Refactored and validated over 1500 lines** of legacy code to standardize modal behavior and resolve UI/UX bugs, improving interface stability and user engagement.

4. Established structured logging, monitoring, and streamlined deployments using **Docker** and **GitHub**, reducing manual intervention and simplifying troubleshooting through documentation.

---

## Amazon Leadership Principles Mapping

| Phase | What You Did | LP |
|---|---|---|
| Phase 1 | Manually debugged version mismatch | Dive Deep |
| Phase 2 | Found cheapest viable deployment path | Frugality |
| Phase 3 | Hunted down 3 environmental bugs | Insist on Highest Standards |
| Phase 4 | Dockerized for consistency | Ownership |
| Phase 5 | Cut $120/month cloud cost | Frugality + Deliver Results |

---

## 3-Minute Interview Narrative

> "At Ekalipi, my goal was to build and deploy a multilingual TTS web app using a CDAC engine. I started by resolving a Python version mismatch manually to get the engine running. Then I built a Flask web app and hit a major deployment challenge — model files were 143MB each, exceeding GitHub's limit. I set up Git LFS so GitHub stored only pointers while actual files lived on LFS servers, and Render fetched them automatically.
>
> Then came three environmental bugs. File permissions were blocking model access on cloud — fixed with chmod 744. Hardcoded absolute paths were breaking on Render — fixed by switching to relative paths using os.path. The trickiest was a pickle data error — stats files were saved with old NumPy pickling that modern cloud NumPy rejected for security. I loaded them once with allow_pickle=True, re-saved as plain arrays, and the version gap disappeared.
>
> To prevent all this permanently, I Dockerized the app with Python 3.10, which locked the environment across local, cloud, and team machines. I also discovered the root cause of the LFS issue — tiny 770-byte files were being tracked in LFS unnecessarily. Untracked them, committed as regular files, and the deployment became clean.
>
> End result: fully deployed multilingual TTS app, $120/month saved in cloud costs, and a stable pipeline the whole team could work with."




The core TTS (Text-to-Speech) pipeline converts written text into natural human-like speech using multiple stages. In your project, the pipeline is based on **FastSpeech2 + HiFi-GAN + Flask Web Interface**.  

---

# Core TTS Pipeline Explained

```text
User Text
   ↓
Text Preprocessing
   ↓
Phoneme Conversion
   ↓
FastSpeech2 Acoustic Model
   ↓
Mel Spectrogram Generation
   ↓
HiFi-GAN Vocoder
   ↓
Waveform Audio (.wav)
```

---

# 1. User Input Stage

The user enters:

* Text
* Language
* Gender
* Speech speed (alpha)

Example:

```text
Input: "नमस्कार"
Language: Marathi
Gender: Male
Speed: 1.0
```

The frontend sends this data to Flask using a POST request. 

---

# 2. Backend Receives Request

Inside `app.py`:

```python
@app.route('/synthesize', methods=['POST'])
def synthesize():
```

Flask:

* Validates input
* Selects correct language model
* Builds inference command
* Calls `inference.py`

Example:

```python
cmd = [
    'python',
    'inference.py',
    '--sample_text', text,
    '--language', language,
    '--gender', gender
]
```

This launches the actual speech synthesis engine. 

---

# 3. Text Preprocessing

This is one of the most important stages.

Raw text cannot directly go into AI models.

So preprocessing performs:

* Cleaning text
* Removing unwanted symbols
* Handling punctuation
* Expanding numbers
* Language normalization

Example:

```text
"₹500" → "five hundred rupees"
```

Then the system converts words into **phonemes**.

---

# 4. Phoneme Conversion

Humans speak sounds, not letters.

So text becomes phonemes using language-specific phone dictionaries.

Example:

```text
"Hello"
→ HH AH L OW
```

For Marathi/Hindi:

* Uses Indic phoneme mappings
* Handles pronunciation rules

Files used:

```text
Fastspeech2_HS/phone_dict/
```

This stage improves pronunciation accuracy. 

---

# 5. FastSpeech2 Acoustic Model

Now the phoneme sequence enters the **FastSpeech2** model.

FastSpeech2 predicts:

* Duration
* Pitch
* Energy
* Speech rhythm

Then generates a:

# → Mel Spectrogram

A mel spectrogram is a visual representation of sound frequencies over time.

Think of it as:

```text
Text → Sound Blueprint
```

Code:

```python
out = model(text, decode_conf={"alpha": alpha})
```

Where:

* `alpha < 1` → Faster speech
* `alpha > 1` → Slower speech

FastSpeech2 is:

* Non-autoregressive
* Faster than Tacotron
* Stable during inference



---

# 6. Mel Spectrogram Generation

Output from FastSpeech2:

```python
out["feat_gen_denorm"]
```

This is NOT actual audio yet.

It is:

```text
Frequency + Time + Energy information
```

Like this conceptually:

```text
Time →
Freq ↓
██████
██░░██
████░░
```

Machines understand this representation better than raw waveforms.

---

# 7. HiFi-GAN Vocoder

Now comes the vocoder stage.

The system uses:

# HiFi-GAN

Purpose:

```text
Mel Spectrogram → Real Audio Waveform
```

Code:

```python
y_g_hat = vocoder(x)
```

HiFi-GAN generates:

* Natural voice
* High-quality speech
* Realistic tone
* Fast inference

This stage creates the final `.wav` audio.



---

# 8. Audio Postprocessing

The generated waveform is:

* Normalized
* Converted to int16
* Saved as WAV

Code:

```python
audio = audio.cpu().numpy().astype('int16')
```

Output example:

```text
static/audio/output_marathi_male.wav
```

---

# 9. Frontend Playback

Flask returns:

```json
{
  "status": "success",
  "audio_path": "/static/audio/output.wav"
}
```

Frontend updates:

```javascript
audioPlayer.src = data.audio_path;
```

Now the user hears synthesized speech.

---

# Full End-to-End Flow

```text
User Text
   ↓
Flask API
   ↓
Text Cleaning
   ↓
Phoneme Mapping
   ↓
FastSpeech2
   ↓
Mel Spectrogram
   ↓
HiFi-GAN
   ↓
Waveform Audio
   ↓
WAV File
   ↓
Browser Playback
```

---

# Key Components in Your Project

| Component           | Purpose               |
| ------------------- | --------------------- |
| Flask               | Backend API           |
| FastSpeech2         | Acoustic Model        |
| HiFi-GAN            | Vocoder               |
| Phone Dictionary    | Pronunciation mapping |
| React/HTML Frontend | User interaction      |
| WAV Output          | Final speech          |

---

# Why FastSpeech2 is Important

Advantages:

* Faster inference
* Better stability
* Parallel generation
* Natural prosody
* Adjustable speed

Compared to older Tacotron models:

* Less alignment failure
* More production-ready

---

# Core AI Concept

The actual "speech generation" happens in two AI stages:

## Stage 1 — Acoustic Modeling

```text
Text → Mel Spectrogram
```

Done by:

# FastSpeech2

---

## Stage 2 — Vocoding

```text
Mel Spectrogram → Audio Waveform
```

Done by:

# HiFi-GAN

Together they create realistic speech.

---

# Simplified Analogy

Imagine speech creation like music production:

| Step               | Real World Analogy            |
| ------------------ | ----------------------------- |
| Text preprocessing | Writing lyrics                |
| Phoneme conversion | Pronunciation guide           |
| FastSpeech2        | Composer creating music notes |
| Mel spectrogram    | Sheet music                   |
| HiFi-GAN           | Singer performing audio       |
| WAV file           | Final recording               |

---

# One-Line Summary

Your TTS system works by converting text into phonemes, generating a mel spectrogram using FastSpeech2, and transforming that spectrogram into natural speech using the HiFi-GAN vocoder.  


---------------------------------------------------------------

# The Bug That Wouldn't Die
### A True Story from the Ekalipi TTS Internship

---

## Chapter 1: Everything Works… Until It Doesn't

It was a regular day. The multilingual Text-to-Speech app was running beautifully on the local Mac mini. Marathi, Hindi, Gujarati — all speaking clearly. The Flask backend was responding, the audio files were generating, and everything felt ready for the world.

Then came the moment every developer dreads.

**Time to deploy.**

The code got pushed to GitHub. Render was set up. The deployment ran. And then…

```
ValueError: Cannot load file containing pickled data when allow_pickle=False
```

The app crashed before it even started talking.

---

## Chapter 2: What Even Is This Error?

The first question was simple — *what does this mean?*

After digging in, the answer became clear. The TTS engine (ESPnet) needed three stats files to work:

- `feats_stats.npz` — stores acoustic feature statistics
- `energy_stats.npz` — stores energy/loudness statistics
- `pitch_stats.npz` — stores pitch statistics

These files had been saved using Python's **pickling** — a way of serializing complex Python objects into a binary format. Think of it like packing your belongings in a box that only *you* know how to unpack.

The problem? Modern NumPy and ESPnet **refuse to open that kind of box** by default. They call `np.load()` with `allow_pickle=False` — a security rule to prevent malicious code from sneaking in through untrusted files.

So the conversation between ESPnet and the stats files went something like:

> ESPnet: "Hey, I need your stats."
> Stats file: "Sure, here's my pickled data!"
> ESPnet: "I don't accept pickled data. Goodbye."
> 💥 Crash.

But *locally* it worked fine — because the local machine had an older, more permissive NumPy version that quietly allowed pickled data without complaining. Render's cloud environment was stricter. It followed the modern rules.

**Same files. Two different environments. Two completely different outcomes.**

---

## Chapter 3: The First Clue — Figuring Out the Command

The next step was figuring out *how to even check* if a file was pickled or not.

The diagnostic command was:

```sh
python3 -c "import numpy as np; np.load('/opt/render/project/src/Fastspeech2_HS/marathi/male/model/feats_stats.npz', allow_pickle=False)"
```

If it threw the `ValueError` — the file was pickled.
If it ran silently with no output — the file was clean.

This became the **truth detector** throughout the entire debugging journey. Every fix, every redeployment — this command was run to confirm whether the problem was truly solved or just hiding.

---

## Chapter 4: Enter fix_stats.py — The First Hero

Once the problem was understood, the fix seemed straightforward. Write a script to reload the files with pickling allowed, then re-save them the *right* way — as plain NumPy arrays.

That script was `fix_stats.py`, run inside the model directory:

```sh
cd Fastspeech2_HS/english/male/model && python3 fix_stats.py
```

The script did this:

```python
import numpy as np

files = [
    'feats_stats.npz',
    'energy_stats.npz',
    'pitch_stats.npz'
]

for f in files:
    data = np.load(f, allow_pickle=True)   # open the old pickled box
    np.savez(f.replace('.npz', ''), **data) # repack it the clean way
    print(f"Fixed: {f}")
```

The idea was clean:
- Load the old pickled file with `allow_pickle=True` — just this once
- Immediately re-save it using `np.savez` — plain NumPy arrays, no pickling
- Now the file is safe for ESPnet to load anywhere

Locally, the diagnostic command confirmed it:

```
✅ No error. Files are clean.
```

Victory... or so it seemed.

---

## Chapter 5: The Bug Comes Back — Git LFS Betrayal

The fixed files were pushed to GitHub. Render was redeployed. The diagnostic command was run again inside the Render shell.

```
ValueError: Cannot load file containing pickled data when allow_pickle=False
```

**It was back.**

How? The files were fixed locally. The fix was confirmed. They were pushed to GitHub. What went wrong?

The answer came from checking the file hashes:

```sh
# On local machine
md5sum Fastspeech2_HS/marathi/male/model/feats_stats.npz
→ f419c74c5557c45fc00cf46c0ad819b4

# Inside Render container
md5sum /app/Fastspeech2_HS/marathi/male/model/feats_stats.npz
→ 655a70576b37fc584419716662d229ed
```

**Different hashes. Completely different files.**

Render was not using the fixed file at all. It was using an **old cached version** — the original pickled one.

The culprit? **Git LFS.**

The `.npz` files were being tracked by Git Large File Storage. But Render's environment didn't have Git LFS installed:

```
git: 'lfs' is not a git command.
```

So when Render pulled the repo, it got the LFS *pointer* — a tiny text file saying "the real file is somewhere else" — but never actually downloaded the real binary. It was deploying a ghost.

---

## Chapter 6: The Docker Battle

The next idea was to switch from Render's standard Python environment to **Docker**, where full control over the environment was possible.

A Dockerfile was written:

```dockerfile
FROM python:3.10
RUN apt-get update && apt-get install -y git-lfs && git lfs install
WORKDIR /app
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN git lfs pull
EXPOSE 8000
CMD ["gunicorn", "app:app", "--config", "gunicorn_config.py", "--timeout", "120", "--workers", "1", "--threads", "4"]
```

Deployed. Build ran. Then:

```
#12 [7/7] RUN git lfs pull
#12 0.775 Not in a Git repository.
ERROR: exit code 128
```

Of course. Docker's `COPY . .` copies the project files — but **not the `.git` folder**. Without `.git`, there is no Git repository inside the container. Without a Git repository, `git lfs pull` has nothing to work with.

The `RUN git lfs pull` line was removed from the Dockerfile.

The new strategy: **run `git lfs pull` locally first**, so the actual files are present in the working directory. Then `COPY . .` would carry them into the Docker image naturally.

But after redeploying — the hashes still didn't match. Render's build cache was still serving the old image.

The service was deleted. A completely new Docker service was created on Render to force a fresh build with no cache.

Still the same old hash.

---

## Chapter 7: The Real Solution — Ditch LFS for Small Files

At this point, a key question was asked:

*How big are these files actually?*

```
feats_stats.npz   →  1.37 KB
energy_stats.npz  →  770 bytes
pitch_stats.npz   →  small
config.yaml       →  5.03 KB
```

**Under 10 KB. All of them.**

These files had no business being in Git LFS at all. LFS is designed for files that are too large for regular Git — hundreds of megabytes, model weights, audio datasets. Not 770-byte stats files.

The fix was simple and final:

```sh
git lfs untrack "*.npz"
git add .gitattributes
git add --force Fastspeech2_HS/marathi/male/model/feats_stats.npz
git add --force Fastspeech2_HS/marathi/male/model/energy_stats.npz
git add --force Fastspeech2_HS/marathi/male/model/pitch_stats.npz
git commit -m "Remove npz files from LFS, store as regular files"
git push origin main
```

Now these files lived in regular Git — no LFS pointers, no download tricks, no environment dependencies. Just plain files that `COPY . .` would always pick up correctly.

Redeployed. Checked the hash:

```sh
md5sum /app/Fastspeech2_HS/marathi/male/model/feats_stats.npz
→ f419c74c5557c45fc00cf46c0ad819b4  ✅
```

**Matched.**

Ran the truth detector:

```sh
python3 -c "import numpy as np; np.load('/app/Fastspeech2_HS/marathi/male/model/feats_stats.npz', allow_pickle=False)"
```

**Silence. No error. Clean.**

And then the most satisfying log line appeared:

```
INFO - Audio saved to /app/static/audio/output_marathi_male_1750087517.wav
```

---

## Chapter 8: One More Surprise — The YAML Bug

While repeating the same process for the English model, a new error appeared:

```
TypeError: string indices must be integers
stats_file = config_data[key]["stats_file"]
```

This one was sneaky. The `config.yaml` file had a missing space after a colon:

```yaml
# Wrong — YAML reads this as a plain string
energy_normalize_conf:
  stats_file:energy_stats.npz

# Correct — YAML reads this as a dictionary
energy_normalize_conf:
  stats_file: energy_stats.npz
```

One missing space. YAML couldn't parse the value as a dictionary, so the code crashed trying to index into a string. Fixed, committed, redeployed — and English TTS worked too.

---

## The Final Scoreboard

| Problem | Cause | Fix |
|--------|-------|-----|
| `ValueError: allow_pickle=False` | Stats files saved with pickling | Re-saved using `np.savez` via `fix_stats.py` |
| Fix didn't reach Render | Git LFS not installed on Render | Switched to Docker deployment |
| `git lfs pull` failed in Docker | No `.git` folder in Docker context | Removed that line from Dockerfile |
| Hash mismatch despite Docker | Build cache serving old image | Deleted and recreated Render service |
| Files still wrong on Render | Files too small to need LFS at all | Untracked from LFS, stored as regular Git files |
| `TypeError` on English model | Missing space in YAML config | Added space after colon in `config.yaml` |

---

## The Lesson

A bug that looked like a simple NumPy loading error turned out to be a chain of three separate problems tangled together — a pickle format issue, a Git LFS environment gap, and a Docker context limitation. Each fix revealed the next layer hiding underneath.

The real solution wasn't a clever hack. It was stepping back and asking the simplest question:

**"Why are 770-byte files even in Git LFS to begin with?"**

They weren't. And removing them from LFS solved everything in one clean move.

---

*The TTS app now speaks. Loudly. In 16 languages.*


Based on your actual experience from the document, here are the interview questions an interviewer can ask you — split into what you **can answer confidently** from your real work, and what you should also prepare:

---

# Interview Questions on Docker
## Based on Your Real Ekalipi Experience

---

## 🟢 Questions You Can Answer From Your Own Experience

These are directly backed by what you actually did:

---

### 1. What is a Dockerfile and why did you use it?

**Your answer from experience:**
> "A Dockerfile is a recipe for building a Docker image. At Ekalipi, I switched from Render's standard Python environment to a Docker service because the standard environment didn't support Git LFS, which was causing our model files to not deploy correctly."

---

### 2. What does `COPY . .` do in a Dockerfile?

**Your answer from experience:**
> "It copies everything from your local project directory into the Docker image. In our case, this was how the model files, stats files, and application code all got bundled into the container. We learned that running `git lfs pull` locally before building was essential so `COPY . .` picked up the actual files, not LFS pointers."

---

### 3. Why did `RUN git lfs pull` fail inside your Dockerfile?

**Your answer from experience:**
> "Because `COPY . .` does not copy the `.git` folder into the Docker image. Without the `.git` directory, there is no Git repository inside the container, so `git lfs pull` has nothing to work with and throws `Not in a Git repository` with exit code 128."

---

### 4. What is the difference between a Docker image and a Docker container?

**Your answer from experience:**
> "A Docker image is the built package — like a snapshot of the environment and code. A container is a running instance of that image. On Render, we pushed our Dockerfile and Render built the image and ran the container automatically — we didn't manage containers manually."

---

### 5. How did you handle environment consistency between local and cloud using Docker?

**Your answer from experience:**
> "Before Docker, the app worked locally but failed on Render because of different NumPy versions and missing Git LFS support. Docker solved this by packaging the exact Python version, dependencies, and files together. What ran in the container on Render was identical to what we tested locally."

---

### 6. What was your Dockerfile and what does each line do?

**Your answer from experience:**
```dockerfile
FROM python:3.10          # Use Python 3.10 as base image
RUN apt-get update && apt-get install -y git-lfs && git lfs install  
                          # Install Git LFS inside image
WORKDIR /app              # Set working directory
COPY . .                  # Copy all project files into image
RUN pip install --upgrade pip
RUN pip install -r requirements.txt  # Install dependencies
EXPOSE 8000               # Open port 8000
CMD ["gunicorn", "app:app", "--config", "gunicorn_config.py", 
     "--timeout", "120", "--workers", "1", "--threads", "4"]
                          # Start the app with Gunicorn
```

---

### 7. Why did you use Gunicorn instead of Flask's built-in server?

**Your answer from experience:**
> "Flask's built-in server is not suitable for production — it handles one request at a time. Gunicorn is a production-grade WSGI server. We configured it with 1 worker, 4 threads, and a 120-second timeout because TTS inference is slow and needs more time than the default timeout allows."

---

### 8. How did you debug issues inside a running Docker container?

**Your answer from experience:**
> "On Render, we used the Shell or Console feature in the dashboard to get a terminal inside the running container. We ran commands like `md5sum` to check file hashes, `python3 -c` to test numpy loading, and `ls -l` to check file permissions — all directly inside the live container."

---

### 9. What is Docker build cache and how did it cause problems for you?

**Your answer from experience:**
> "Docker caches each build step. When we fixed our stats files and redeployed, Render's build cache served the old cached image instead of rebuilding with the new files. We had to delete the entire Render service and create a new one to force a completely fresh build with no cache."

---

### 10. How did you manage environment variables in Docker?

**Your answer from experience:**
> "We set `TTS_MODEL_ROOT` as an environment variable in `render.yaml` pointing to `/opt/render/project/src/Fastspeech2_HS`. At runtime, `inference.py` used this variable to patch `config.yaml` with the correct absolute paths to the stats files, since paths differ between local and cloud environments."

---

## 🟡 General Docker Questions You Should Also Prepare

These are common interview questions not directly from your project but expected at your level:

---

### 11. What is the difference between `CMD` and `ENTRYPOINT`?
- `CMD` provides default arguments that can be overridden
- `ENTRYPOINT` sets the main command that always runs
- You used `CMD` for your Gunicorn startup

### 12. What is a Docker volume and why would you use it?
- A volume persists data outside the container lifecycle
- Useful for storing generated audio files or logs that should survive container restarts

### 13. What is `docker-compose` and when would you use it?
- Used to define and run multi-container applications
- For example, running your Flask app and a Redis cache together

### 14. What is the difference between `RUN`, `CMD`, and `ENTRYPOINT`?
- `RUN` — executes during image build
- `CMD` — executes when container starts, can be overridden
- `ENTRYPOINT` — executes when container starts, cannot be easily overridden

### 15. How do you reduce Docker image size?
- Use slim base images (`python:3.10-slim`)
- Combine `RUN` commands to reduce layers
- Use `.dockerignore` to exclude unnecessary files

---

## 🔴 Tricky Follow-up Questions to Watch Out For

| Question | Tip |
|----------|-----|
| "Why not use `allow_pickle=True` as a quick fix?" | Security risk — malicious code can execute through pickled files |
| "Why not just use S3 for model files?" | Valid alternative — document mentions it as an option |
| "What happens if two requests come in at the same time?" | Mention the model preloading issue — models were loaded per request, causing timeouts |
| "How would you scale this?" | More Gunicorn workers, async inference, background job queue |
| "What is the difference between Render's Python env and Docker env?" | Python env has no `sudo`/`apt-get`, no Git LFS support — Docker gives full control |

---

## One Liner Summary You Can Say in Any Interview

> *"At Ekalipi, I used Docker to solve an environment consistency problem where our TTS app worked locally but failed on Render due to missing Git LFS support and NumPy version differences. Docker let us package the exact environment, dependencies, and model files together, giving us identical behaviour locally and on the cloud."*

---

Would you like mock interview practice on any of these questions?