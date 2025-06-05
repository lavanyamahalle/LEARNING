### ✅ UNIT 3 – RELATIONAL DESIGN & NORMALIZATION (Q1, Q2)

---

#### 🔶 1. Functional Dependency (FD)

**Definition**: A functional dependency (FD) exists when one attribute in a relation uniquely determines another attribute.

**Notation**: A → B (A functionally determines B)

**Example**:
Table: Student(RollNo, Name, Dept)
FDs: RollNo → Name, Dept

**Types of FD**:

* **Trivial FD**: B ⊆ A, e.g., {RollNo, Name} → Name
* **Non-Trivial FD**: B ⊈ A, e.g., RollNo → Dept
* **Full FD**: All attributes of A are needed to determine B
* **Partial FD**: Part of composite key determines B
* **Transitive FD**: A → B, B → C implies A → C

**Inference Rules (Armstrong's Axioms)**:

1. Reflexivity: If B ⊆ A, then A → B
2. Augmentation: If A → B, then AC → BC
3. Transitivity: If A → B and B → C, then A → C

**Closure of FD**: All FDs derivable from a set of FDs.

**Attribute Closure (A⁺)**: Set of attributes functionally determined by A.

---

#### 🔶 2. Normalization

**Goal**: Reduce redundancy and eliminate anomalies.

##### ➤ First Normal Form (1NF)

* Atomic values (no multivalued or composite attributes)

##### ➤ Second Normal Form (2NF)

* 1NF + No Partial Dependency

##### ➤ Third Normal Form (3NF)

* 2NF + No Transitive Dependency

##### ➤ Boyce-Codd Normal Form (BCNF)

* 3NF + Every determinant is a superkey

**Example**:
Table: Student(RollNo, Course, Instructor)
FDs:

* RollNo → Course
* Course → Instructor

Decompose:

* Student(RollNo, Course)
* CourseInfo(Course, Instructor)

---

#### 🔶 3. Decomposition

**Goals**:

* Eliminate redundancy
* Preserve dependencies
* Ensure lossless join

**Lossless Join Test**:
R → R1, R2 is lossless if:

* Common attribute is a key in at least one relation.

**Dependency Preservation**:

* Ensures we don’t lose any FDs.

---

#### 🔶 4. Codd’s 12 Rules

| Rule | Name                            | Description                                          |
| ---- | ------------------------------- | ---------------------------------------------------- |
| 1    | Information Rule                | All data should be stored in tables.                 |
| 2    | Guaranteed Access Rule          | Data is accessible by table-name + PK.               |
| 3    | Systematic Treatment of Nulls   | Nulls should be uniformly handled.                   |
| 4    | Dynamic Catalog                 | Metadata should be stored as tables.                 |
| 5    | Comprehensive Sub-language Rule | Use a single language for data access (like SQL).    |
| 6    | View Updating Rule              | Views should be updatable.                           |
| 7    | High-Level Insert/Update/Delete | These should be supported via high-level operations. |
| 8    | Physical Data Independence      | Storage-level changes shouldn’t affect application.  |
| 9    | Logical Data Independence       | Schema changes should not affect programs.           |
| 10   | Integrity Independence          | Constraints stored in catalog, not application.      |
| 11   | Distribution Independence       | Users should not be aware of data location.          |
| 12   | Non-subversion Rule             | Low-level access shouldn't bypass integrity rules.   |

---

#### 🔶 5. Anomalies

| Anomaly | Description                                              |
| ------- | -------------------------------------------------------- |
| Insert  | Can’t add data due to missing dependency.                |
| Update  | Multiple values must be changed to maintain consistency. |
| Delete  | Deletion of one record may remove essential info.        |

---

### ✅ UNIT 4 – TRANSACTIONS, CONCURRENCY, RECOVERY (Q3, Q4)

---

#### 🔶 1. Transactions and ACID Properties

**Transaction**: Logical unit of work consisting of one or more operations.

**ACID Properties**:

* **Atomicity**: Either all operations complete or none.
* **Consistency**: DB moves from one consistent state to another.
* **Isolation**: Concurrent transactions do not interfere.
* **Durability**: Committed changes are permanent.

---

#### 🔶 2. Transaction States

1. **Active**: Transaction starts
2. **Partially Committed**: After last statement
3. **Committed**: All operations done successfully
4. **Failed**: Error encountered
5. **Aborted**: Rolled back

---

#### 🔶 3. Serializability

**Conflict Serializability**:

* Swap non-conflicting operations
* Use Precedence Graph

**View Serializability**:

* Final state of DB is same

**Conflict Operations**:

* Read-Write
* Write-Read
* Write-Write

**Check**:

* Build Precedence Graph
* If acyclic → Serializable

---

#### 🔶 4. Concurrency Control Protocols

**Two Phase Locking (2PL)**:

* **Growing Phase**: Acquire locks
* **Shrinking Phase**: Release locks

**Strict 2PL**: Exclusive locks held till commit
**Rigorous 2PL**: All locks held till commit

**Deadlock**:

* Circular wait of resources
* Detection: Wait-For Graph
* Prevention: Time-stamp methods (Wait-die, Wound-wait)

---

#### 🔶 5. Timestamp Ordering Protocol

Each data item has:

* **Read Timestamp (RTS)**
* **Write Timestamp (WTS)**

**Rules**:

* For read(Q): TS(T) ≥ WTS(Q)
* For write(Q): TS(T) ≥ RTS(Q) and TS(T) ≥ WTS(Q)

---

#### 🔶 6. Recovery Techniques

**Log-Based Recovery**:

* **Deferred Update**: Write to DB after commit
* **Immediate Update**: Log before write

**Checkpoints**: Periodic saves

**Shadow Paging**:

* Shadow copy maintained
* Swap pages after commit

---

### ✅ UNIT 5 – NOSQL, CAP, DISTRIBUTED DATABASE (Q5, Q6)

---

#### 🔶 1. Structured vs Semi vs Unstructured Data

| Type            | Description                    | Examples             |
| --------------- | ------------------------------ | -------------------- |
| Structured      | Tabular, fixed schema          | RDBMS tables         |
| Semi-structured | Irregular, tag-based structure | XML, JSON            |
| Unstructured    | No pre-defined schema          | Images, PDFs, videos |

---

#### 🔶 2. NoSQL Databases

**Features**:

* Schema-less
* Distributed
* Horizontally scalable

| Type         | Description                 | Examples         |
| ------------ | --------------------------- | ---------------- |
| Key-Value    | Simple key-value pair       | Redis, DynamoDB  |
| Document     | Stores documents (JSON/XML) | MongoDB, CouchDB |
| Column Store | Column-oriented             | Cassandra, HBase |
| Graph        | Nodes + Edges               | Neo4j            |

---

#### 🔶 3. CAP Theorem

**States that you can only achieve 2 out of 3**:

1. **Consistency**: Same data everywhere
2. **Availability**: Every request gets a response
3. **Partition Tolerance**: Network faults tolerated

---

#### 🔶 4. BASE Properties (vs ACID)

| BASE Property        | Description                       |
| -------------------- | --------------------------------- |
| Basically Available  | System always available           |
| Soft State           | Data may change without input     |
| Eventual Consistency | Data becomes consistent over time |

**Used in NoSQL systems for scalability**

---

#### 🔶 5. Distributed DBMS

**Features**:

* Data across multiple nodes
* Local autonomy + global schema

**Architecture**:

* Client Layer
* Global Query Processor
* Local DB Processors

---

### ✅ UNIT 6 – ADVANCED DATABASES (Q7, Q8)

---

#### 🔶 1. XML Databases

**Structure**:

* Tree-based (Hierarchical)
* Elements and attributes

**Tools**: XPath, XQuery

**Use cases**: Configuration files, data exchange, documents

---

#### 🔶 2. JSON Databases

* Text-based format
* Lightweight data interchange
* Stored in MongoDB (BSON)

**Example**:

```json
{
  "name": "Lavanya",
  "skills": ["SQL", "Java"]
}
```

**In Java**:

```java
JSONObject obj = new JSONObject();
obj.put("name", "Lavanya");
String jsonStr = obj.toString();
```

---

#### 🔶 3. Object-Relational Databases

**Features**:

* Combine objects + tables
* Inheritance, polymorphism

**Table Inheritance**:
Base: Shape
Sub-tables: Circle, Square

**Benefits**:

* Real-world modeling
* Custom types

---

#### 🔶 4. Deductive Databases

* Rule-based
* Based on logic programming (Prolog)

**Example**:

```prolog
parent(X, Y) :- father(X, Y).
```

**Advantages**:

* Infer new data
* Strong query language

---

#### 🔶 5. Spatial Data

**Types**:

* **Geographic Data**: Earth location (lat-long)
* **Geometric Data**: Shape, boundary

**Use**: GIS, maps, autonomous driving

---

This completes the comprehensive notes for Units 3 to 6 of DBMS, suitable for interviews, exams, and advanced understanding.




