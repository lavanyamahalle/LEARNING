
## Tokenization and Mapping Text to Numbers (LLMs)

### 1. Tokenization
Tokenization is the process of breaking input text into smaller units called **tokens** so that a model can process it.

**Example:**
Text:
"I love AI"

Possible tokens:
["I", " love", " AI"]

Tokens are not always full words — they can be:
- Words → "cat"
- Subwords → "un", "happy"
- Characters → "!"

---

### 2. Mapping Tokens to Numbers (Encoding)
After tokenization, each token is converted into a **unique numerical ID** using a vocabulary.

**Example:**
Tokens:
["I", " love", " AI"]

Mapped IDs:
[101, 205, 678]

This mapping is done using a predefined **vocabulary (token → ID dictionary)**.

---

### 3. Why Convert to Numbers?
Neural networks (LLMs) can only process numbers, not text. So:

Text → Tokens → Token IDs → Model Processing

---

### 4. Full Flow
"I love AI"
   ↓
Tokenization
   ↓
["I", " love", " AI"]
   ↓
Mapping (Encoding)
   ↓
[101, 205, 678]
   ↓
Input to LLM

---

### 5. Important Note
- Same word can have different tokens depending on context.
- Different models use different tokenization methods (BPE, WordPiece, SentencePiece).
- Token count affects:
  - Cost (API usage)
  - Input/output limits

---

### 6. Simple Analogy
Think of tokenization like splitting a sentence into Lego blocks,  
and mapping is assigning a number to each block so the machine can understand it.

## Embeddings in LLMs

### 1. What are Embeddings?
Embeddings are **numerical vector representations of tokens (or words)** that capture their **meaning and context**.

Instead of just giving a token an ID (like 101, 205), embeddings convert it into a **list of real numbers**.

---

### 2. From Token → Embedding

After tokenization and mapping:

Tokens:
["I", " love", " AI"]

Token IDs:
[101, 205, 678]

Embeddings (example):
[
  [0.12, -0.45, 0.88, ...],
  [0.67, 0.11, -0.23, ...],
  [0.91, -0.02, 0.44, ...]
]

Each token becomes a **vector (e.g., 768 or 1024 dimensions)**.

---

### 3. Why Embeddings are Important
Token IDs are just labels (no meaning), but embeddings:
- Capture **semantic meaning**
- Represent **relationships between words**
- Help model understand **context**

---

### 4. Key Idea
Words with similar meanings have **similar embeddings**.

Example:
- "king" and "queen" → close in vector space
- "dog" and "cat" → close
- "dog" and "car" → far

---

### 5. Vector Space Intuition
Embeddings place words in a **high-dimensional space**.

Distance between vectors:
- Small distance → similar meaning
- Large distance → different meaning

---

### 6. Famous Example
"king - man + woman ≈ queen"

This works because embeddings capture relationships mathematically.

---

### 7. Full Pipeline
Text
  ↓
Tokenization
  ↓
Tokens
  ↓
Token IDs
  ↓
Embeddings (vectors)
  ↓
Model processes meaning

---

### 8. Simple Analogy
Token ID = Roll number  
Embedding = Personality of the student  

Roll number identifies, but personality tells who they are.

---

### 9. Important Notes
- Embeddings are learned during training
- Same word can have different embeddings based on context (in modern LLMs)
- Used in:
  - Search (semantic search)
  - Recommendations
  - Chatbots
  - Clustering text

---
## Vectors in LLMs

### 1. What is a Vector?
A vector is simply a **list (array) of numbers**.

Example:
[0.12, -0.45, 0.88, 0.33]

In LLMs, vectors are used to represent **words, tokens, or even full sentences**.

---

### 2. Role of Vectors in LLMs
LLMs cannot understand text directly, so everything is converted into vectors.

Text → Tokens → Token IDs → **Vectors (Embeddings)**

These vectors are what the model actually processes.

---

### 3. Why Vectors?
Vectors allow the model to:
- Capture **meaning**
- Compare **similarity**
- Perform **mathematical operations**
- Understand **context**

---

### 4. High-Dimensional Vectors
Vectors in LLMs are not small like 3–4 numbers.

They are large:
- 128 dimensions
- 768 dimensions
- 1024+ dimensions

Example (shortened):
[0.21, -0.67, 0.11, ..., 0.98]

Each dimension captures some feature of meaning.

---

### 5. Similarity Between Vectors
LLMs compare vectors using distance or angle.

- Similar vectors → similar meaning  
- Different vectors → different meaning  

Example:
- "dog" ≈ "puppy"
- "car" ≠ "banana"

---

### 6. Types of Vectors in LLMs
- Token embeddings → for individual tokens
- Sentence embeddings → for full sentences
- Hidden state vectors → internal representations inside the model

---

### 7. How Model Uses Vectors
The model performs operations like:
- Addition
- Multiplication
- Dot products

to learn patterns and relationships.

---

### 8. Simple Analogy
Vector = Coordinates of a point in space  

Each word is placed somewhere in a huge invisible space:
- Close → similar meaning
- Far → different meaning

---

### 9. Key Insight
Vectors are the **core language of LLMs** — everything (words, sentences, context) is ultimately represented as numbers in vector form.

---
[ Input Text ]
   "He is a good"

          ↓

[ Tokenization ]
   Split into tokens
   ["He", " is", " a", " good"]

          ↓

[ Token → ID Mapping ]
   Convert tokens to numbers
   [12, 7, 5, 42]

          ↓

[ Embedding Layer ]
   Convert IDs → Vectors
   [
     [0.25, 0.10, -0.40],
     [0.05, -0.20, 0.30],
     [0.12, 0.05, 0.02],
     [0.60, -0.10, 0.80]
   ]

          ↓

[ Transformer Model (Core LLM) ]
   - Attention mechanism
   - Context understanding
   - Pattern learning

          ↓

[ Output Vector ]
   [0.45, -0.15, 0.20]

          ↓

[ Vector → Token ID ]
   55

          ↓

[ Token → Word ]
   "boy"

          ↓

[ Final Output ]
   "He is a good boy"
