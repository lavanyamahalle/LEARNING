SOURCE :
https://www.youtube.com/watch?v=AK0hu0Zxua4&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT


## 🧠 1. What is System Design?

**System Design** is the process of **designing the architecture of a software system** by defining its **components, interactions, data flow, and scalability strategy**.

It answers:

* How will the system work?
* How do components communicate?
* How do we handle scale, reliability, performance, and cost?

---

### 🔧 System Design = Architecture + Infrastructure + Flow

Example:
📱 *Designing Instagram*

* What components do you need? (User service, post service, feed service, media storage)
* How to scale for 1 billion users?
* How to handle image uploads and feed updates efficiently?

---

## 🎯 2. Why System Design?

Without system design:

* Apps **crash under load** (no scalability)
* **Downtime** increases (no redundancy/failover)
* **Poor performance** (no caching/load balancing)
* **Inflexible systems** (tightly coupled code)

With system design:

* Handles **millions of users**
* Supports **real-time messaging**, **video streaming**, etc.
* Ensures **reliability, speed, maintainability**

> It’s the key difference between building a **toy project** and building a **real-world application**.

---

## ⚔️ 3. Engineer with DSA vs Engineer with DSA + System Design

| Feature     | DSA Only Engineer         | DSA + System Design Engineer                          |
| ----------- | ------------------------- | ----------------------------------------------------- |
| Focus       | Code logic, algorithms    | End-to-end systems                                    |
| Can solve   | Leetcode-style questions  | Real-world scalable systems                           |
| Limitation  | Can’t handle scale, infra | Knows architecture, infra, optimization               |
| Output      | “This sorts an array”     | “This handles 1M API requests/sec with 99.99% uptime” |
| Application | Coding round              | System design round + real production apps            |

### 💡 Example:

| Scenario        | DSA Only                        | DSA + SD                                                        |
| --------------- | ------------------------------- | --------------------------------------------------------------- |
| Build Instagram | Can build login, comment system | Can build full scalable backend with DB, image CDN, feed system |
| Build Chat App  | Can build basic send/receive    | Can handle 1M users with WebSockets, message queues, failover   |

---

## 🏗️ 4. HLD vs LLD in System Design

| Aspect   | HLD (High-Level Design)               | LLD (Low-Level Design)                    |
| -------- | ------------------------------------- | ----------------------------------------- |
| Focus    | Big picture architecture              | Internal component-level design           |
| Audience | Architects, senior engineers          | Developers, team leads                    |
| View     | System components, how they interact  | Internal class design, methods, DB schema |
| Diagrams | Block diagrams, flowcharts            | Class diagrams, ER diagrams               |
| Examples | Load balancer, API gateway, DB choice | API routes, class methods, SQL tables     |

---

### 📊 Diagram: HLD vs LLD

```
HLD (System-Level View)
 ┌────────────┐      ┌────────────┐      ┌────────────┐
 │  Frontend  │ <--> │  Backend   │ <--> │   Database  │
 └────────────┘      └────────────┘      └────────────┘

LLD (Component-Level View)
Backend:
class UserService:
    def login()
    def register()
    def follow_user()

Table: Users(id, name, email, password)
```

---

## 📌 Summary:

| Topic                  | Key Point                                       |
| ---------------------- | ----------------------------------------------- |
| What is System Design  | Design of software’s structure and data flow    |
| Why System Design      | Ensures scalability, performance, reliability   |
| DSA vs DSA+SD Engineer | DSA alone = logic; SD = real-world systems      |
| HLD vs LLD             | HLD = big picture; LLD = implementation details |
