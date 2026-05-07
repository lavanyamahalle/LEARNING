Here's the full story of your pickled data bug battle:

---

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