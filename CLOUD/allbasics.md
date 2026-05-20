# Junior SDE Interview Prep — 1 Hour Sprint
> **Target:** Fresher Backend + Cloud + DevOps Interviews
> **Your Stack:** Node.js · Express · MongoDB · REST APIs · JWT · SQL · JavaScript

---

## SECTION 1 — CLOUD BASICS

---

### What is Cloud Computing?

- Renting computing resources (servers, storage, databases) over the internet
- No need to buy/manage physical hardware
- Pay only for what you use
- Providers: AWS, Azure, GCP

**Types:**
| Type | Full Form | Example |
|------|-----------|---------|
| IaaS | Infrastructure as a Service | AWS EC2 |
| PaaS | Platform as a Service | Elastic Beanstalk |
| SaaS | Software as a Service | Gmail, Slack |

**Interview Questions:**

**Q: What is cloud computing?**
> A: Cloud computing means accessing servers, storage, and services over the internet on-demand. Instead of buying hardware, you rent it from providers like AWS and pay only for what you use.

**Q: On-premise vs cloud?**
> A: On-premise = you own and manage servers (expensive, slow to scale). Cloud = provider manages infrastructure, you scale in minutes, pay per use.

**Real-world example:** Your Node.js app runs on an AWS EC2 server instead of a laptop in your office.

**Fresher mistake:** Saying "cloud is just the internet." Cloud is managed infrastructure over the internet — different thing.

**Quick revision:** Cloud = scalable, flexible, cost-efficient. IaaS/PaaS/SaaS are three layers.

---

### Scalability & Availability

**Q: What is scalability?**
> A: Ability to handle more traffic. Vertical scaling = bigger server (more RAM/CPU). Horizontal scaling = more servers. Horizontal is preferred in cloud.

**Q: What is high availability?**
> A: System stays up even if one server fails. Achieved using multiple servers, load balancers, and multi-AZ deployments on AWS.

**Q: Vertical vs Horizontal Scaling?**
| | Vertical | Horizontal |
|--|---------|------------|
| Meaning | Bigger server | More servers |
| Limit | Hardware ceiling | Almost unlimited |
| Cost | Expensive | Cheaper at scale |
| Downtime | Yes | No (with LB) |

**Fresher mistake:** Confusing scalability with availability. Scalability = handle more load. Availability = stay online.

---

### Load Balancer

- Distributes incoming requests across multiple backend servers
- Prevents any single server from being overloaded
- AWS service: ALB (Application Load Balancer)

**Q: What is a load balancer?**
> A: A load balancer sits in front of servers and distributes traffic evenly. If one server goes down, traffic is routed to healthy servers automatically.

---

### CDN (Content Delivery Network)

- Caches static assets (images, CSS, JS) at edge servers near users
- Reduces latency — user gets content from nearest server
- AWS service: CloudFront

**Q: What is a CDN and why is it used?**
> A: CDN caches static content at edge locations near users globally. This reduces load time because content is served from a nearby server, not from a distant origin server.

**Quick revision:** Load Balancer → distributes traffic. CDN → delivers static content fast from nearby servers.

---

## SECTION 2 — AWS MOST ASKED SERVICES

---

### EC2 — Elastic Compute Cloud

- Virtual servers in the cloud
- Choose OS, CPU, RAM — deploy your app on it
- Like renting a computer in AWS's data center

**Q: What is EC2?**
> A: EC2 is AWS's virtual machine service. You pick the OS and hardware specs, then deploy your application. It's like renting a server from AWS.

**Q: What are EC2 instance types?**
> A: t2.micro (free tier, low traffic), c5 (compute-heavy), r5 (memory-heavy). For freshers: t2.micro = free tier, good for learning.

**Real-world example:** Deploy your Express.js backend on an EC2 t2.micro instance.

**Quick revision:** EC2 = virtual machine. Supports auto-scaling groups. Used with Elastic IP for fixed IP address.

---

### S3 — Simple Storage Service

- Object storage for files, images, videos, backups
- Unlimited storage, 99.999999999% (11 nines) durability
- Files stored in "buckets"

**Q: What is S3?**
> A: S3 is AWS's object storage service. You store files (objects) inside buckets. Common uses: profile pictures, app backups, static website hosting.

**Q: S3 vs EBS?**
> A: S3 = object storage, access via URL, for files and media. EBS = block storage attached to EC2, like a hard disk for your server.

**Real-world example:** Store user-uploaded profile images in S3. Give temporary access via pre-signed URLs.

**Fresher mistake:** Thinking S3 is a database. It's a file/object store only.

**Quick revision:** S3 = cloud drive. Bucket = folder. Object = file. Pre-signed URLs for temporary access.

---

### IAM — Identity & Access Management

- Controls who can access what in AWS
- Create users, roles, and policies
- Principle of least privilege: give only permissions needed

**Q: What is IAM?**
> A: IAM lets you manage access to AWS services. You create roles and policies. Example: give an EC2 instance permission to read from S3 only — nothing more.

**Q: What is an IAM role vs IAM user?**
> A: IAM user = a person (has credentials). IAM role = assigned to AWS services (EC2, Lambda) so they can access other AWS services without hardcoding credentials.

**Fresher mistake:** Hardcoding AWS access keys in code. Always use IAM roles. This is a critical security issue interviewers will ask about.

---

### RDS — Relational Database Service

- Managed relational database on AWS
- Supports MySQL, PostgreSQL, MariaDB, Oracle
- AWS handles backups, patching, failover

**Q: What is RDS?**
> A: RDS is a managed database service. You don't manage the server — just connect and run queries. AWS handles backups, updates, and high availability.

**Real-world example:** Use RDS (PostgreSQL) for your e-commerce orders and user tables instead of self-hosting.

---

### Lambda — Serverless Compute

- Run code without managing servers
- Triggered by events: API call, S3 upload, DynamoDB change
- Pay per execution (very cost-efficient for low-traffic tasks)

**Q: What is AWS Lambda?**
> A: Lambda is serverless compute. You write a function, AWS runs it when triggered. No server to manage. You pay only when it runs.

**Q: When would you use Lambda vs EC2?**
> A: Lambda for event-driven, short tasks (image resize on upload, send email). EC2 for long-running apps (your Express.js backend that runs 24/7).

---

### VPC — Virtual Private Cloud

- Your own isolated network on AWS
- Resources inside VPC are private by default
- Control access using subnets, security groups, route tables

**Q: What is a VPC?**
> A: VPC is your private network inside AWS. You put your EC2, RDS inside a VPC so they're not exposed to the public internet. Security groups act as firewalls.

---

### CloudWatch

- AWS monitoring and observability service
- Collects logs, metrics, creates alarms

**Q: What is CloudWatch?**
> A: CloudWatch monitors AWS resources. You can view logs, track CPU/memory metrics, and set alarms (e.g., alert if EC2 CPU > 80%).

**Quick revision:** EC2=VM | S3=file storage | IAM=access control | RDS=managed SQL DB | Lambda=serverless | VPC=private network | CloudWatch=logs+metrics+alerts

---

## SECTION 3 — DOCKER BASICS

---

### What is Docker?

- Platform to build, ship, and run applications in containers
- Solves the "works on my machine" problem
- Packages app + all dependencies into one portable unit

**Q: What is Docker and why is it used?**
> A: Docker containerizes your application with all its dependencies so it runs the same way everywhere — developer laptop, staging server, or production. It eliminates environment mismatch issues.

---

### Container vs Virtual Machine

| | Container | Virtual Machine |
|--|-----------|----------------|
| OS | Shares host OS kernel | Full OS per VM |
| Size | MBs | GBs |
| Start time | Seconds | Minutes |
| Isolation | Process-level | Full OS |
| Use case | Microservices, apps | Legacy apps, full isolation |

**Q: Container vs VM — what's the difference?**
> A: VMs have a full OS per instance — heavy and slow. Containers share the host OS kernel, so they're lightweight and start in seconds. Docker uses containers.

---

### Docker Image vs Container

- **Image** = blueprint (read-only). Built from Dockerfile.
- **Container** = running instance of an image.
- Analogy: Image = class, Container = object

---

### Dockerfile Basics

```dockerfile
FROM node:18                  # Base image
WORKDIR /app                  # Set working directory
COPY package*.json ./         # Copy package files
RUN npm install               # Install dependencies
COPY . .                      # Copy source code
EXPOSE 3000                   # Expose port
CMD ["node", "app.js"]        # Start command
```

**Q: What is a Dockerfile?**
> A: A Dockerfile is a script with step-by-step instructions to build a Docker image. Each line creates a new layer. FROM sets the base, RUN runs commands, CMD starts the app.

**Key commands:**
```bash
docker build -t myapp .       # Build image
docker run -p 3000:3000 myapp # Run container
docker push myapp             # Push to registry
docker-compose up             # Run multi-container apps
```

**Fresher mistake:** Running `npm install` at runtime inside the container instead of in the Dockerfile during build time.

**Quick revision:** Dockerfile → build → Image → run → Container. Containers are portable and consistent.

---

## SECTION 4 — KUBERNETES BASICS

---

### What is Kubernetes?

- Container orchestration system
- Manages, scales, and maintains containerized applications at scale
- Docker runs one container. Kubernetes manages thousands.

**Q: What is Kubernetes and why is it used?**
> A: Kubernetes automates deployment, scaling, and management of containers. It restarts crashed containers, scales pods under load, and handles rolling deployments with zero downtime.

---

### Core Concepts

| Concept | What it is |
|---------|-----------|
| Pod | Smallest unit — one or more containers running together |
| Deployment | Manages pods, handles rolling updates & rollbacks |
| Service | Stable network endpoint to reach pods |
| Node | A physical/virtual machine in the K8s cluster |
| Cluster | Group of nodes managed by K8s |

**Q: What is a Pod?**
> A: A Pod is the smallest deployable unit in Kubernetes. It runs one or more containers and shares network/storage. Think of it as one running instance of your app.

**Q: What is a Deployment?**
> A: A Deployment manages pods. You tell it "run 3 replicas of this container" and it ensures 3 pods always run. It handles updates and rollbacks automatically.

**Q: What is a Service in K8s?**
> A: Pods get dynamic IPs which change when restarted. A Service gives a stable IP/DNS name to access pods. Types: ClusterIP (internal), NodePort (external on port), LoadBalancer (cloud LB).

**Q: What is autoscaling in K8s?**
> A: HPA (Horizontal Pod Autoscaler) automatically adds pods when CPU/memory is high, and removes them when load drops. No manual intervention needed.

**Quick revision:** Pod=instance | Deployment=manages pods | Service=network access | HPA=auto-scale | kubectl=CLI tool

---

## SECTION 5 — NETWORKING BASICS

---

### HTTP vs HTTPS

**Q: Difference between HTTP and HTTPS?**
> A: HTTP sends data as plain text — anyone can intercept it. HTTPS encrypts data using TLS (SSL). All modern APIs and websites must use HTTPS. It uses port 443 vs HTTP's port 80.

| | HTTP | HTTPS |
|-|------|-------|
| Port | 80 | 443 |
| Encryption | None | TLS/SSL |
| Use | Internal/legacy | All public-facing apps |
| SEO | Lower ranking | Higher ranking |

---

### TCP vs UDP

**Q: TCP vs UDP — when to use which?**
> A: TCP is reliable and ordered — guarantees delivery, used in HTTP/REST APIs, email. UDP is fast but no delivery guarantee — used in video streaming, gaming, DNS. Your Express REST API uses TCP.

| | TCP | UDP |
|-|-----|-----|
| Reliable | Yes | No |
| Speed | Slower | Faster |
| Use | REST APIs, email | Video, gaming, DNS |
| Connection | Yes (handshake) | No |

---

### DNS

**Q: What is DNS?**
> A: DNS (Domain Name System) translates human-readable domain names to IP addresses. Like a phone book for the internet. `google.com → 142.250.x.x`. Without DNS, you'd need to remember IPs.

---

### API Gateway

**Q: What is an API Gateway?**
> A: API Gateway is a single entry point for all client requests. It routes requests to correct microservices, handles authentication, rate limiting, and logging. AWS API Gateway is a managed service for this.

---

### Reverse Proxy

**Q: What is a reverse proxy?**
> A: A reverse proxy (like Nginx) sits in front of your backend servers. Clients talk to Nginx, which forwards to your Node.js app. It handles SSL termination, load balancing, and hides your internal servers.

**Real-world example:** Nginx listens on port 80/443, forwards to your Express app on port 3000.

**Quick revision:** DNS=name→IP | API Gateway=single entry for microservices | Reverse Proxy=Nginx in front of your app | Load Balancer=traffic distributor

---

## SECTION 6 — DATABASE & SCALING

---

### SQL vs NoSQL

**Q: SQL vs NoSQL — when to use which?**
> A: SQL (MySQL, PostgreSQL) is for structured data with relationships and ACID transactions — banking, orders. NoSQL (MongoDB) is for flexible schema, JSON documents, horizontal scaling — catalogs, user profiles, real-time apps.

| | SQL | NoSQL |
|-|-----|-------|
| Schema | Fixed | Flexible |
| Query | SQL | JSON/API |
| Scaling | Vertical (mostly) | Horizontal |
| ACID | Full | Partial |
| Examples | MySQL, PostgreSQL | MongoDB, Redis |
| Best for | Banking, orders | Profiles, catalogs |

**Fresher mistake:** Saying "NoSQL is better." The correct answer is "depends on use case."

---

### Caching & Redis

**Q: What is caching?**
> A: Caching stores frequently accessed data in fast memory (RAM) so you don't hit the database on every request. Reduces latency from 100ms to <1ms.

**Q: What is Redis?**
> A: Redis is an in-memory key-value store used for caching, session storage, rate limiting, and pub/sub messaging. It's extremely fast because data lives in RAM.

**Real-world example:** Cache the result of a heavy MongoDB aggregation in Redis for 5 minutes. All requests in those 5 minutes get instant response.

```javascript
// Example pattern (Node.js + Redis)
const cached = await redis.get('top_products');
if (cached) return JSON.parse(cached);
const data = await db.query(...);
await redis.setex('top_products', 300, JSON.stringify(data)); // cache 5 min
```

**Fresher mistake:** Caching everything. Only cache data that is read-heavy and doesn't change frequently.

---

### Database Indexing

**Q: What is database indexing?**
> A: An index is a data structure that speeds up queries. Without index, DB scans every row (full table scan). With index, it jumps directly to matching rows. Trade-off: faster reads, slightly slower writes, more storage.

**Q: When would you add an index?**
> A: Add indexes on columns used in WHERE, JOIN, ORDER BY. Example: `CREATE INDEX ON users(email)` — makes login queries instant.

---

### Horizontal vs Vertical Scaling

| | Vertical | Horizontal |
|-|---------|------------|
| What | Bigger server | More servers |
| Limit | Hardware max | Nearly unlimited |
| Downtime | Yes (usually) | No |
| Cost | Expensive | Cheaper at scale |
| Cloud fit | Less preferred | Preferred |

---

## SECTION 7 — DEVOPS & DEPLOYMENT

---

### CI/CD Basics

**Q: What is CI/CD?**
> A: CI (Continuous Integration) = automatically test and build code when developers push changes. CD (Continuous Delivery/Deployment) = automatically deploy tested code to staging or production. Goal: ship features faster with fewer bugs.

| Stage | What happens |
|-------|-------------|
| Developer pushes code | GitHub/GitLab receives commit |
| CI kicks in | Run tests, lint, build |
| CD kicks in | Deploy to staging or production |

---

### GitHub Actions

- CI/CD tool built into GitHub
- Define workflows in `.github/workflows/*.yml`
- Triggers on push, PR, schedule

```yaml
# Example: Auto-test Node.js app on every push
name: CI Pipeline
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

**Q: What is GitHub Actions?**
> A: GitHub Actions is a CI/CD platform integrated into GitHub. You write YAML workflow files that define what to do on events like push or pull request — run tests, build Docker images, deploy to AWS.

---

### Basic Deployment Flow

```
Developer → git push → GitHub → GitHub Actions (tests) → Docker Build → Push to ECR → Deploy to EC2/ECS/K8s
```

---

### Monitoring & Logging

**Q: What is the difference between monitoring and logging?**
> A: Logging = recording events (errors, requests) as text. Monitoring = tracking metrics (CPU, response time, error rate) and alerting on thresholds.

| Tool | Purpose |
|------|---------|
| CloudWatch | AWS logs + metrics |
| Datadog | Full observability (popular in companies) |
| Prometheus + Grafana | Open-source monitoring |
| ELK Stack | Log aggregation (Elasticsearch, Logstash, Kibana) |
| Winston / Morgan | Node.js logging libraries |

**Real-world example:** Use Morgan middleware in Express to log every HTTP request, send logs to CloudWatch, set alarm if error rate > 5%.

---

---

# TOP 50 MOST ASKED FRESHER INTERVIEW QUESTIONS

> Legend: 🟢 Easy | 🟡 Medium | 🔴 Important

---

## Cloud & AWS

| # | Question | Difficulty |
|---|----------|------------|
| 1 | What is cloud computing? | 🟢 |
| 2 | What is the difference between on-premise and cloud? | 🟢 |
| 3 | What is AWS EC2 and what is it used for? | 🟢 |
| 4 | What is S3 and give a real use case? | 🟢 |
| 5 | What is IAM and why is it important? | 🟡 |
| 6 | What is AWS Lambda? When would you use it over EC2? | 🟡 🔴 |
| 7 | What is VPC? Why is it important for security? | 🟡 |
| 8 | What is horizontal vs vertical scaling? | 🟢 🔴 |
| 9 | What is a load balancer and how does it work? | 🟢 🔴 |
| 10 | What is a CDN? How does it improve performance? | 🟢 |

**Answers:**

**1. What is cloud computing?**
> Cloud computing is on-demand access to computing resources (servers, storage, databases) over the internet. You pay for what you use. No upfront hardware costs. AWS, Azure, GCP are major providers.

**6. Lambda vs EC2?**
> Lambda = serverless, event-triggered, short-lived tasks, pay per execution. EC2 = persistent server, long-running apps. Use Lambda for image resizing on S3 upload. Use EC2 for your Express.js backend.

**8. Horizontal vs vertical scaling?**
> Vertical = bigger server (more RAM/CPU). Horizontal = more servers. Horizontal preferred in cloud for unlimited scale and no single point of failure.

---

## Docker & Kubernetes

| # | Question | Difficulty |
|---|----------|------------|
| 11 | What is Docker and why is it used? | 🟢 🔴 |
| 12 | Container vs Virtual Machine — differences? | 🟡 🔴 |
| 13 | What is a Docker image vs container? | 🟢 |
| 14 | What is a Dockerfile? Explain key instructions. | 🟡 |
| 15 | What is docker-compose? | 🟡 |
| 16 | What is Kubernetes? | 🟢 |
| 17 | What is a Pod in Kubernetes? | 🟢 |
| 18 | What is a Kubernetes Deployment? | 🟡 |
| 19 | What is HPA (Horizontal Pod Autoscaler)? | 🟡 |
| 20 | Docker vs Kubernetes — how do they work together? | 🔴 |

**Answers:**

**11. What is Docker?**
> Docker is a containerization platform. It packages your app and all its dependencies into a container that runs consistently on any machine. Solves "works on my machine" problem.

**12. Container vs VM?**
> VM has a full OS per instance — heavy (GBs), slow to start (minutes). Container shares host OS kernel — lightweight (MBs), starts in seconds. Docker uses containers.

**20. Docker vs Kubernetes?**
> Docker creates and runs individual containers. Kubernetes manages many containers across multiple servers — handles scaling, restarts, rolling updates. They work together: Docker builds the container, K8s orchestrates it.

---

## Networking

| # | Question | Difficulty |
|---|----------|------------|
| 21 | HTTP vs HTTPS — what's the difference? | 🟢 🔴 |
| 22 | What is TCP vs UDP? When to use each? | 🟡 |
| 23 | What is DNS and how does it work? | 🟢 |
| 24 | What is a reverse proxy? Give an example. | 🟡 |
| 25 | What is an API Gateway? | 🟡 🔴 |
| 26 | What are HTTP status codes? | 🟢 🔴 |
| 27 | What is REST API? | 🟢 🔴 |
| 28 | What is CORS and how do you fix it? | 🟡 🔴 |

**Answers:**

**26. HTTP status codes:**
> 200 = OK, 201 = Created, 400 = Bad Request, 401 = Unauthorized, 403 = Forbidden, 404 = Not Found, 500 = Internal Server Error. Know these cold.

**28. What is CORS?**
> CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from different origins. Fix in Express: use the `cors` npm package. In AWS: enable CORS in API Gateway settings.

---

## Database & Caching

| # | Question | Difficulty |
|---|----------|------------|
| 29 | SQL vs NoSQL — when to use which? | 🟢 🔴 |
| 30 | What is database indexing? Why is it used? | 🟡 🔴 |
| 31 | What is Redis? Give a real use case. | 🟡 🔴 |
| 32 | What is caching? What are cache invalidation strategies? | 🟡 |
| 33 | What is ACID in databases? | 🟡 |
| 34 | What is a JOIN in SQL? Types? | 🟢 🔴 |
| 35 | What is MongoDB aggregation? | 🟡 |

**Answers:**

**33. ACID?**
> Atomicity (all or nothing), Consistency (valid state always), Isolation (transactions don't interfere), Durability (committed data persists). ACID = data integrity guarantee in SQL databases.

**34. SQL JOIN types?**
> INNER JOIN = matching rows in both tables. LEFT JOIN = all from left + matches from right. RIGHT JOIN = opposite. FULL JOIN = all rows from both. INNER JOIN is most common.

---

## DevOps & Backend

| # | Question | Difficulty |
|---|----------|------------|
| 36 | What is CI/CD? Why is it important? | 🟢 🔴 |
| 37 | What is GitHub Actions? | 🟡 |
| 38 | What is the difference between monitoring and logging? | 🟡 |
| 39 | What is JWT and how does it work? | 🟢 🔴 |
| 40 | What is middleware in Express.js? | 🟢 🔴 |
| 41 | What is the event loop in Node.js? | 🟡 🔴 |
| 42 | What is async/await in JavaScript? | 🟢 🔴 |

**Answers:**

**39. What is JWT?**
> JSON Web Token. Used for authentication. After login, server returns a signed JWT token. Client sends it in every request header. Server verifies signature — no need to hit DB for every request. Format: header.payload.signature.

**40. Express middleware?**
> Functions that run between request and response. Used for logging, auth checks, parsing JSON, error handling. Example: `app.use(express.json())` parses incoming JSON bodies before your route handlers.

**41. Node.js event loop?**
> Node.js is single-threaded but non-blocking. Event loop processes async tasks (I/O, timers) without blocking. This is why Node handles thousands of concurrent connections with one thread.

---

## Scenario-Based Questions

| # | Question | Difficulty |
|---|----------|------------|
| 43 | Your app is slow — how do you debug it? | 🔴 |
| 44 | How would you store user images securely? | 🔴 |
| 45 | Your API is getting 10x more traffic — what do you do? | 🔴 |
| 46 | How do you secure your REST API? | 🔴 |

**Answers:**

**43. App is slow — debugging:**
> 1. Check server CPU/memory (CloudWatch). 2. Check slow DB queries (add indexes). 3. Check if caching is needed (Redis). 4. Check for N+1 query problems. 5. Add logging/APM tool to trace bottleneck.

**44. Storing user images:**
> Upload to AWS S3, not your server. Use pre-signed URLs for temporary access. Never store images in MongoDB. Set proper S3 bucket policies, block public access.

**45. 10x more traffic:**
> Horizontal scaling — add more EC2 instances with Auto Scaling Group. Put a Load Balancer in front. Add Redis caching to reduce DB load. Use CDN for static assets. Scale DB with read replicas.

**46. Securing REST API:**
> HTTPS always. JWT/OAuth for auth. Input validation. Rate limiting (express-rate-limit). CORS properly configured. No sensitive data in URLs. Store secrets in env variables, not code.

---

## HR + Resume-Based Questions

| # | Question | Tips |
|---|----------|------|
| 47 | Tell me about your project. | Use: Problem → Solution → Tech Stack → Impact |
| 48 | What was the biggest challenge in your project? | Be specific, explain how you solved it |
| 49 | Why do you want to work here? | Research the company, mention their tech stack |
| 50 | Where do you see yourself in 3 years? | Backend/cloud specialization, team lead aspirations |

**Project explanation template:**
> "I built [project name] to solve [problem]. I used [Node.js/Express/MongoDB] for the backend, [JWT] for authentication, and deployed it on [AWS EC2 / Vercel]. The main challenge was [X] which I solved by [Y]. This project handles [Z users / requests]."

---

## Quick Cheat Sheet — Must Remember

```
Cloud        → Rent infra over internet. IaaS/PaaS/SaaS.
EC2          → Virtual machine on AWS.
S3           → File/object storage. Buckets + objects.
IAM          → Access control. Never hardcode keys.
Lambda       → Serverless. Event-triggered. Pay per call.
VPC          → Private network on AWS. Security groups = firewall.
CloudWatch   → Logs + metrics + alerts.
Docker       → Containerize apps. Image=blueprint, Container=running instance.
Dockerfile   → FROM → COPY → RUN → CMD.
Kubernetes   → Orchestrate containers. Pod → Deployment → Service → HPA.
HTTP/HTTPS   → HTTP plain text. HTTPS = HTTP + TLS. Always use HTTPS.
TCP/UDP      → TCP reliable. UDP fast. REST API uses TCP.
DNS          → domain → IP.
Redis        → In-memory cache. Fast reads. Key-value store.
Indexing     → Speed up DB queries. Add on WHERE/JOIN columns.
CI/CD        → Auto test + deploy on code push.
JWT          → Stateless auth token. header.payload.signature.
Event loop   → Node.js handles async I/O non-blockingly on single thread.
```

---

## Mock Interview — Start When Ready

> Say: **"Start my mock interview"** and I'll ask you questions one-by-one like a real interviewer, evaluate your answers, and give you the ideal response + follow-up questions.

---

*Prepared for: Junior/Fresher SDE · Backend · Cloud Interviews*
*Target time to complete: ~60 minutes*
