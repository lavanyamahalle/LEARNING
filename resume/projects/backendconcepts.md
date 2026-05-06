# TicketWise Backend Concepts — Interview Preparation Guide

**Website:** https://reliable-babka-9cbcbc.netlify.app/

---

## 📚 How to Use This Resource for Interviews

### **1. Study Method**
Read each concept in this order:
1. **Definition** — Understand WHAT it is
2. **Why It Matters** — Understand WHY you need it
3. **Diagram** — Visualize HOW it works
4. **Code Example** — See actual implementation
5. **TicketWise Example** — Apply it to a real project context
6. **Interview Q&A** — Practice explaining it to an interviewer

### **2. Interview Preparation Strategy**

#### **Phase 1: Deep Understanding (2-3 days)**
- Read all 50 concepts slowly
- Focus on understanding the "why" not just the "how"
- Take notes on concepts you struggle with
- Draw your own diagrams from memory

#### **Phase 2: Rapid Recall (1-2 days)**
- Read only the definition and interview Q&A sections
- Set a timer for 2-3 minutes per concept
- Practice explaining each concept in your own words verbally
- Record yourself and listen back

#### **Phase 3: Real Interview Simulation (1 day)**
- Have someone ask you random concepts
- Explain for 2-3 minutes without looking at notes
- If stuck, use the diagrams as hints
- Focus on being conversational, not robotic

---

## 🎯 What Interviewers Are Looking For

### **✅ DO This**
- Explain the concept from first principles (don't memorize)
- Use the TicketWise example to show you've applied it
- Mention trade-offs (pros and cons)
- Connect concepts to each other
- Ask clarifying questions if confused

### **❌ DON'T Do This**
- Don't memorize definitions word-for-word
- Don't just recite code without explaining it
- Don't claim expertise you don't have
- Don't rush through the diagram explanation

---

## 📖 How to Answer Interview Questions

### **Example Question:** "How would you design a rate limiter?"

**WRONG Approach:**
> "Rate limiting restricts requests per time window using sliding window or token bucket algorithm."

**RIGHT Approach:**
> "Rate limiting is needed to prevent abuse. The idea is: count requests from a user in a fixed time window (say 1 minute), and if they exceed a threshold (like 5), return 429 Too Many Requests. The sliding window algorithm tracks request timestamps and removes old ones as time moves forward. In TicketWise, we use express-rate-limit with Redis to enforce different limits: 5 login attempts/minute (strict) vs 100 API calls/15 minutes (lenient). Trade-off: sliding window is more accurate but uses more memory than fixed window."

---

## 🔄 Core Concept Connections

Understand how concepts relate:
- **Event-Driven → Background Jobs** (both handle async work)
- **Rate Limiting → Authentication** (security controls)
- **Caching → Database Optimization** (performance)
- **Load Balancing → Scalability** (handle more users)

---

## ⏱️ Time Management During Interview

- **First 30 seconds:** Define the concept simply
- **Next 60 seconds:** Explain the why and use case
- **Next 60 seconds:** Show a simple diagram or code snippet
- **Final 30 seconds:** Mention TicketWise or ask clarifying questions

---

## 💡 Quick Reference: Concept Categories

Visit the website and look for concepts grouped by:
- **Architecture** (Event-Driven, Microservices, etc.)
- **Security** (Authentication, Rate Limiting, etc.)
- **Performance** (Caching, Database Indexing, etc.)
- **Reliability** (Error Handling, Retry Logic, etc.)

---

## 🚀 Before Your Interview

1. **Day Before:** Read through all 50 concepts (2-3 hours)
2. **Morning Of:** Review only interview Q&A sections (30 mins)
3. **30 Mins Before:** Pick 3-4 random concepts and explain them aloud
4. **During Interview:** Use TicketWise examples to showcase real experience

---

**Remember:** You're not expected to know everything perfectly. Show that you:
- Understand fundamentals
- Can apply concepts to real projects (TicketWise)
- Can think through trade-offs
- Are curious and ask good questions