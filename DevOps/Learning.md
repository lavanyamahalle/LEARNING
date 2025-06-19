
### ✅ **What is DevOps?**

**DevOps** is a **set of practices** that combines **Software Development (Dev)** and **IT Operations (Ops)**.
Its goal is to **shorten the software development life cycle** and deliver **high-quality software quickly and reliably**.

---

DevOps is about **collaboration between development and operations teams** to automate and streamline the process of building, testing, and releasing software.

---

### 📌 **Why DevOps? (Easy Explanation)**

Before DevOps:

* Developers wrote code → threw it to Operations → who deployed it.
* Resulted in **delays, bugs, and miscommunication**.

With DevOps:

* Dev and Ops work **together**, with **automation** and **continuous feedback**.
* This leads to **faster, more reliable releases**.

---

### 🧱 **Basic Concepts in DevOps**

| Concept                          | Description                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| **CI/CD**                        | Continuous Integration & Continuous Deployment – Code is automatically tested and deployed. |
| **Automation**                   | Replaces manual tasks with scripts/tools (e.g., build, test, deploy).                       |
| **Version Control**              | Using tools like Git to track code changes.                                                 |
| **Infrastructure as Code (IaC)** | Managing servers & environments using code (e.g., Terraform, Ansible).                      |
| **Monitoring & Logging**         | Tools to observe systems, catch bugs early, and improve performance.                        |
| **Collaboration**                | Shared responsibility, better communication, faster issue resolution.                       |

---

### 🛠️ **Popular DevOps Tools**

| Area                    | Tools                             |
| ----------------------- | --------------------------------- |
| Version Control         | Git, GitHub, GitLab               |
| CI/CD                   | Jenkins, GitHub Actions, CircleCI |
| Containerization        | Docker                            |
| Container Orchestration | Kubernetes                        |
| IaC                     | Terraform, Ansible                |
| Monitoring              | Prometheus, Grafana, ELK Stack    |

---

### 💬 **Sample Interview Answer:**

> DevOps is a culture and set of practices that bring development and operations teams together. It helps automate and streamline the software delivery process through tools and practices like CI/CD, Infrastructure as Code, and continuous monitoring. The main goal is to deliver high-quality software faster and more reliably.

---
--- 

## 🧠 1. Basics of Operating Systems (for DevOps)

---

### 📌 Linux Commands

**Linux is the backbone of most DevOps environments.**
Linux is the most common OS used in DevOps, especially for deploying applications on servers.

Why it matters:
You’ll often use the command line to install packages, manage files, monitor services, and handle networking.
**Examples:**

* `ls` – List files
* `cd` – Change directory
* `pwd` – Print current path
* `mkdir`, `rm`, `cp`, `mv` – File management (Create, delete, move, copy files)
* `top`, `ps` , `kill` – View running processes (Process monitoring and management)
* `cat`,`less` – Read and search file content
* `grep`, `find` - 	Search within files or directories

---

### 📁 File System Hierarchy

Linux has a **standard folder structure** starting from `/` (root).


| Directory | Description                     |
| --------- | ------------------------------- |
| `/`       | Root directory                  |
| `/home`   | User home directories           |
| `/etc`    | System-wide configuration files |
| `/bin`    | Essential command binaries      |
| `/usr`    | User programs and libraries     |
| `/var`    | Logs, mail, spool files         |
| `/tmp`    | Temporary files                 |
| `/opt`    | Optional software packages      |


**Why it matters:**
Knowing where to find config files, logs, and installed software is crucial when debugging or deploying.

---

### 👥 User & Group Management

Managing users and groups ensures **secure access control** and **team collaboration** on Linux servers.
DevOps engineers often manage **user permissions and access**.

**Important Commands:**

| Command                   | Description                       |
| ------------------------- | --------------------------------- |
| `useradd`, `passwd`       | Add a new user and set password   |
| `groupadd`, `usermod -aG` | Create a group, add user to group |
| `id`, `groups`, `whoami`  | View user and group info          |
| `chmod`, `chown`, `chgrp` | Set permissions and ownership     |

💡 Helps manage **managing access rights (who can do what)** and **improving security** on the system.

---

### ⚙️ Systemd & Services

Modern Linux systems use **`systemd`** to manage background services (daemons).
**`systemd`** is the init system for many modern Linux distros(specific packaged version of the Linux operating system). 


| Command                     | Action                         |
| --------------------------- | ------------------------------ |
| `systemctl start nginx`     | Start the nginx service        |
| `systemctl stop sshd`       | Stop SSH service               |
| `systemctl restart apache2` | Restart a service              |
| `systemctl status docker`   | Check service status           |
| `systemctl enable httpd`    | Enable service on boot         |
| `systemctl disable mysql`   | Disable service from autostart |

**Why it matters:**
In DevOps, you’ll **deploy apps, start/stop services**, and ensure they **run automatically on boot**.

👉 Important for managing **web servers, Docker, cron jobs**, etc.

---

### 🐚 Shell Scripting Basics (`.sh` files, loops, conditionals)

Shell scripting helps **automate repetitive tasks** using **CLI**.

**Example features:**

* `.sh` files: Scripts saved with `.sh` extension
* **Loops:** `for`, `while` – Repeat tasks
* **Conditionals:** `if`, `elif`, `else` – Logic-based execution
* **Shebang**: First line `#!/bin/bash` tells the system to use bash
* **Variables**: Store values — `name="Keziah"`

**Sample:**

```bash
#!/bin/bash
for i in 1 2 3
do
  echo "Welcome $i times"
done
```

🔧 Used to automate **backups, deployments, updates**, etc.

---
Here’s a **detailed and interview-ready explanation** for **Networking & Security** in **DevOps**, using simple language and clear formatting — perfect for revision and confidence building:

---

## 🔹 2. Networking & Security (DevOps Essentials)

---

### 🌐 **IP, TCP/UDP, DNS, Subnetting**

These are the building blocks of how systems communicate in a network.

#### ✅ IP (Internet Protocol)

* Each device/server has an **IP address** (like a postal address).
* Example: `192.168.1.1` (IPv4) or `2001:db8::1` (IPv6)

#### ✅ TCP vs UDP

| TCP (Transmission Control Protocol) | UDP (User Datagram Protocol)           |
| ----------------------------------- | -------------------------------------- |
| Reliable, connection-based          | Faster, connectionless                 |
| Data is checked and resent if lost  | No resending, may lose data            |
| Used for: HTTP, SSH, FTP            | Used for: DNS, video streaming, gaming |

#### ✅ DNS (Domain Name System)

* Converts **domain names** to **IP addresses**
* Example: `google.com` → `142.250.67.78`

#### ✅ Subnetting

* Divides a large network into **smaller subnetworks**
* Helps with **organization, performance, and security**
* Example: `/24` subnet = 256 IPs (usually 254 usable)

**Why it matters:**
Understanding these concepts is essential when **configuring servers, load balancers, and cloud networks**.

---

### 🌐 **HTTP Methods & Status Codes**

#### ✅ Common HTTP Methods:

| Method   | Purpose                 |
| -------- | ----------------------- |
| `GET`    | Retrieve data           |
| `POST`   | Send data (e.g., forms) |
| `PUT`    | Update data             |
| `DELETE` | Remove data             |
| `PATCH`  | Partial update          |

#### ✅ Important Status Codes:

| Code      | Meaning                      |
| --------- | ---------------------------- |
| `200`     | OK (Success)                 |
| `301`     | Moved Permanently (Redirect) |
| `400`     | Bad Request                  |
| `401/403` | Unauthorized / Forbidden     |
| `404`     | Not Found                    |
| `500`     | Internal Server Error        |

**Why it matters:**
Helps you **debug APIs, monitor traffic**, and **build CI/CD for web services**.

---

### 🔐 **SSH for Remote Access**

**SSH (Secure Shell)** is used to **securely connect to remote servers**.

**Example:**

```bash
ssh user@192.168.1.10
```

**Key Features:**

* Encrypted connection
* Uses **password or private key** for authentication
* Can run commands or transfer files (`scp` / `rsync`)

**Why it matters:**
Essential for **managing servers, deploying code, and running diagnostics** remotely.

---

### 🔥 **Firewalls (iptables, ufw)**

Firewalls control **incoming/outgoing network traffic**.

#### ✅ `iptables`:

* Low-level Linux firewall command
* Allows/blocks traffic based on rules

#### ✅ `ufw` (Uncomplicated Firewall):

* Simpler frontend to iptables
* Common on Ubuntu

**Example:**

```bash
sudo ufw allow 22/tcp    # Allow SSH
sudo ufw deny 80/tcp     # Block HTTP
sudo ufw status
```

**Why it matters:**
Protects your infrastructure from **unauthorized access or attacks**.

---

### 🔒 **TLS/SSL Certificates**

TLS (formerly SSL) provides **secure communication** over the internet.

* Used in **HTTPS** (secure web browsing)
* Ensures **encryption, integrity, and trust**
* Requires **certificates** issued by trusted Certificate Authorities (CA)

**Why it matters:**
You’ll need to **install/manage SSL certs** for secure deployments (e.g., with NGINX, Apache, or Kubernetes Ingress).

---

### 🔐 **Basic Encryption & Hashing**

#### ✅ Encryption:

* Converts data into unreadable format to protect it.
* Can be decrypted back using a **key**.
* Used in **data transfer, database protection**, etc.

#### ✅ Hashing:

* Converts data into a **fixed-length string**.
* Cannot be reversed (one-way).
* Used for **password storage, file integrity**, etc.

**Examples:**

* Encryption: AES, RSA
* Hashing: SHA-256, MD5

**Why it matters:**
Helps protect **sensitive data, passwords, APIs**, and is vital for **secure DevOps practices**.

---

Here’s your **detailed and beginner-friendly explanation** of **Version Control System (VCS)** concepts using **Git** — tailored for **DevOps interview preparation**:

---

## 🔹 3. Version Control System (Git in DevOps)

---
### Git is an essential skill for DevOps. You need to know how to manage branches, push/pull code, resolve conflicts, and work with platforms like GitHub. Understanding workflows ensures smooth collaboration and reliable code delivery in CI/CD pipelines.

### 🔁 **Git init, add, commit, push, pull**

Git is a **version control system** that helps **track changes in code**, collaborate with teams, and roll back if needed.

| Command                   | What it Does                                   |
| ------------------------- | ---------------------------------------------- |
| `git init`                | Initializes a new Git repository               |
| `git add file.txt`        | Stages changes to a file                       |
| `git commit -m "message"` | Saves a snapshot with a message                |
| `git push`                | Uploads commits to a remote repo (e.g. GitHub) |
| `git pull`                | Fetches and merges latest changes from remote  |

🔧 Example:

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

---

### 🌿 **Branching, Merging, Rebasing**

Branching helps work on features **independently** without affecting main code.

* `git branch new-feature` – Create a branch
* `git checkout new-feature` – Switch to it

#### ✅ Merging:

Combines two branches.

```bash
git checkout main
git merge new-feature
```

#### ✅ Rebasing:

Rewrites history to apply changes on top of another branch.

```bash
git rebase main
```

🔸 Use **merge** when collaborating; **rebase** to keep a clean history.

---

### ⚔️ **Conflict Resolution**

Occurs when two people edit the **same part of a file** differently.

**Steps to resolve:**

1. Git shows the conflict area.
2. You **edit the file manually** to keep the correct version.
3. Stage and commit the resolved file.

```bash
<<<<<<< HEAD
  Your code
=======
  Their code
>>>>>>> branch-name
```

Then:

```bash
git add conflict_file.txt
git commit -m "Resolved conflict"
```

📌 Knowing how to resolve conflicts is key for teamwork.

---

### 🔄 **Git Workflows (Git Flow, Trunk-based)**

#### ✅ Git Flow:

* Structured and best for big teams.
* Uses multiple branches:

  * `main` (stable release)
  * `develop` (active dev)
  * `feature/`, `release/`, `hotfix/` branches

#### ✅ Trunk-Based:

* Simple and fast
* All developers push to `main` or a short-lived branch
* Ideal for **CI/CD and Agile DevOps**

**Why it matters:**
Workflows define **how code is written, tested, and merged** in teams.

---

### 🌐 **Web UI: GitHub/GitLab/Bitbucket (PRs, Issues)**

These platforms host Git repositories **online** and provide tools for collaboration.

#### Key Features:

| Feature             | Description                        |
| ------------------- | ---------------------------------- |
| Pull Requests (PRs) | Request to merge code, with review |
| Issues              | Bug reports or feature requests    |
| Actions/Pipelines   | Run CI/CD (build, test, deploy)    |
| Fork & Clone        | Copy projects to your account      |

🔧 Example flow:

1. Create branch → Code changes
2. Push to GitHub → Open PR
3. Review → Merge to main

**Why it matters:**
DevOps teams use platforms like GitHub to manage code, track bugs, and automate deployment.

---------------- 
Ci/CD - continous integration / continuous deployment
