### 🔍 Adversarial Search / Game Tree Search

#### 1. Minimax Algorithm (Two Players)

* **Definition**: It is a recursive algorithm used for choosing the next move in two-player games.
* **Player Types**:

  * MAX player tries to get the maximum score.
  * MIN player tries to get the minimum score.
* **Working**:

  * Traverse the game tree.
  * At terminal nodes, calculate utility.
  * Backtrack and assign values to parent nodes depending on MIN or MAX.

##### Example Tree:

```
          A (MAX)
        /    |    \
      B      C      D (MIN)
     /\     /\     /\
    3 5   6 9   1 2
```

* A will choose max(B, C, D) = max(min(3,5), min(6,9), min(1,2)) = max(3,6,1) = 6

#### 2. Alpha-Beta Pruning

* **Purpose**: Optimize minimax by pruning unnecessary branches.
* **Alpha (α)**: Maximum lower bound of possible solutions.
* **Beta (β)**: Minimum upper bound.
* **Cutoff**: If α ≥ β, stop evaluating the branch.

##### Example:

```
      MAX
     /   \
   MIN   MIN
  / \    / \
 3  5   6  ?  => If left MIN returns 3, and right branch starts with 6 (worse for MIN), prune remaining
```

#### 3. Monte Carlo Tree Search (MCTS)

* **Used In**: Games with high complexity (Go, Chess)
* **Steps**:

  1. **Selection**: Traverse tree from root to leaf by selecting best child (UCT formula).
  2. **Expansion**: Add new child node.
  3. **Simulation**: Play random moves till end.
  4. **Backpropagation**: Update stats (win/loss) of visited nodes.

##### UCT Formula:

```
UCT = w_i/n_i + c * sqrt(ln(N_i)/n_i)
```

Where:

* w\_i = win score of node i
* n\_i = visits to node i
* N\_i = visits to parent of i
* c = exploration constant (√2)

---

### ♟️ Game Theory and Problem Solving Strategies

#### 1. Game Theory

* **Definition**: Study of strategic interaction among rational decision-makers.
* **Types of Games**:

  * Deterministic vs Stochastic
  * Perfect vs Imperfect Information
  * Zero-sum vs Non-zero sum

#### 2. Stochastic vs Partial Games

| Feature     | Stochastic          | Partial                  |
| ----------- | ------------------- | ------------------------ |
| Randomness  | Yes (e.g. dice)     | No                       |
| Information | Complete/Incomplete | Incomplete (hidden info) |
| Examples    | Ludo, Monopoly      | Poker, Chess with fog    |

#### 3. Problem Solving Strategies

* Brute Force
* Greedy
* Divide & Conquer
* Dynamic Programming
* **Backtracking**
* Constraint Satisfaction

##### Backtracking

* Systematically tries and backtracks when a path fails.
* Suitable for constraint-based problems.

##### N-Queens (Backtracking)

* Place queens row-wise.
* Check for no attack diagonally, row, and column.
* Use recursive method to place one queen per row.

---

### 👑 Constraint Satisfaction Problem (CSP)

#### Definition

* A problem where the goal is to find values for variables within domains satisfying constraints.

#### Types of Consistency

* **Node**: Unary constraints
* **Arc**: Binary constraints (X→Y)
* **Path**: Considers 3 or more variables

#### Techniques

* Backtracking
* Forward Checking
* Constraint Propagation

#### Example: N-Queens as CSP

* Variables: Q1, Q2, ..., Qn
* Domains: 1 to n (positions)
* Constraints:

  * No two queens in same row/col/diagonal

#### Example: Graph Coloring

* Nodes = Variables
* Colors = Domain
* Constraints: Adjacent nodes ≠ same color

#### Cryptarithmetic: SEND + MORE = MONEY

* Variables: S,E,N,D,M,O,R,Y
* Constraints:

  * All variables unique
  * First letters ≠ 0
  * Column-wise addition must hold
* Solved using Backtracking + Constraint Checking

---

### 🎮 AI in Games

#### Tic-Tac-Toe using AI

* Board: 3x3 grid
* Terminal States: Win / Lose / Draw
* AI Techniques:

  * Minimax
  * Heuristic Evaluation

##### Example:

* If 'X' is AI and 'O' is user, AI explores all possible outcomes and chooses the optimal move using Minimax.

---

### Sample Interview Questions

1. Explain alpha-beta pruning and give an example.
2. What is MCTS and how is it used in Go?
3. Solve N-Queens using CSP.
4. Solve SEND+MORE=MONEY using constraints.
5. Compare Backtracking and Branch & Bound.
6. Differentiate stochastic and partial games.
7. How does Tic-Tac-Toe AI make decisions?
8. How does UCT work in MCTS?
9. Types of consistency in CSP?
10. How does alpha-beta improve minimax?
### 🔍 Adversarial Search / Game Tree Search

#### 1. Minimax Algorithm (Two Players)

* **Definition**: It is a recursive algorithm used for choosing the next move in two-player games.
* **Player Types**:

  * MAX player tries to get the maximum score.
  * MIN player tries to get the minimum score.
* **Working**:

  * Traverse the game tree.
  * At terminal nodes, calculate utility.
  * Backtrack and assign values to parent nodes depending on MIN or MAX.

##### Example Tree:

```
          A (MAX)
        /    |    \
      B      C      D (MIN)
     /\     /\     /\
    3 5   6 9   1 2
```

* A will choose max(B, C, D) = max(min(3,5), min(6,9), min(1,2)) = max(3,6,1) = 6

#### 2. Alpha-Beta Pruning

* **Purpose**: Optimize minimax by pruning unnecessary branches.
* **Alpha (α)**: Maximum lower bound of possible solutions.
* **Beta (β)**: Minimum upper bound.
* **Cutoff**: If α ≥ β, stop evaluating the branch.

##### Example:

```
      MAX
     /   \
   MIN   MIN
  / \    / \
 3  5   6  ?  => If left MIN returns 3, and right branch starts with 6 (worse for MIN), prune remaining
```

#### 3. Monte Carlo Tree Search (MCTS)

* **Used In**: Games with high complexity (Go, Chess)
* **Steps**:

  1. **Selection**: Traverse tree from root to leaf by selecting best child (UCT formula).
  2. **Expansion**: Add new child node.
  3. **Simulation**: Play random moves till end.
  4. **Backpropagation**: Update stats (win/loss) of visited nodes.

##### UCT Formula:

```
UCT = w_i/n_i + c * sqrt(ln(N_i)/n_i)
```

Where:

* w\_i = win score of node i
* n\_i = visits to node i
* N\_i = visits to parent of i
* c = exploration constant (√2)

---

### ♟️ Game Theory and Problem Solving Strategies

#### 1. Game Theory

* **Definition**: Study of strategic interaction among rational decision-makers.
* **Types of Games**:

  * Deterministic vs Stochastic
  * Perfect vs Imperfect Information
  * Zero-sum vs Non-zero sum

#### 2. Stochastic vs Partial Games

| Feature     | Stochastic          | Partial                  |
| ----------- | ------------------- | ------------------------ |
| Randomness  | Yes (e.g. dice)     | No                       |
| Information | Complete/Incomplete | Incomplete (hidden info) |
| Examples    | Ludo, Monopoly      | Poker, Chess with fog    |

#### 3. Problem Solving Strategies

* Brute Force
* Greedy
* Divide & Conquer
* Dynamic Programming
* **Backtracking**
* Constraint Satisfaction

##### Backtracking

* Systematically tries and backtracks when a path fails.
* Suitable for constraint-based problems.

##### N-Queens (Backtracking)

* Place queens row-wise.
* Check for no attack diagonally, row, and column.
* Use recursive method to place one queen per row.

---

### 👑 Constraint Satisfaction Problem (CSP)

#### Definition

* A problem where the goal is to find values for variables within domains satisfying constraints.

#### Types of Consistency

* **Node**: Unary constraints
* **Arc**: Binary constraints (X→Y)
* **Path**: Considers 3 or more variables

#### Techniques

* Backtracking
* Forward Checking
* Constraint Propagation

#### Example: N-Queens as CSP

* Variables: Q1, Q2, ..., Qn
* Domains: 1 to n (positions)
* Constraints:

  * No two queens in same row/col/diagonal

#### Example: Graph Coloring

* Nodes = Variables
* Colors = Domain
* Constraints: Adjacent nodes ≠ same color

#### Cryptarithmetic: SEND + MORE = MONEY

* Variables: S,E,N,D,M,O,R,Y
* Constraints:

  * All variables unique
  * First letters ≠ 0
  * Column-wise addition must hold
* Solved using Backtracking + Constraint Checking

---

### 🎮 AI in Games

#### Tic-Tac-Toe using AI

* Board: 3x3 grid
* Terminal States: Win / Lose / Draw
* AI Techniques:

  * Minimax
  * Heuristic Evaluation

##### Example:

* If 'X' is AI and 'O' is user, AI explores all possible outcomes and chooses the optimal move using Minimax.

---

### 🔁 Forward & Backward Chaining

#### Forward Chaining

* **Data-driven** approach.
* Start from known facts, apply rules to infer conclusions.
* Stops when goal is reached or no rules apply.
* **Example**:

  * Rule: If A and B, then C
  * Facts: A, B → infer C

#### Backward Chaining

* **Goal-driven** approach.
* Start from goal, work backward to see if it can be satisfied by known facts.
* **Example**:

  * Goal: C
  * Rule: If A and B → C, prove A and B first

#### Properties:

| Feature   | Forward Chaining          | Backward Chaining     |
| --------- | ------------------------- | --------------------- |
| Direction | Data → Goal               | Goal → Data           |
| Control   | Breadth-first             | Depth-first           |
| Usage     | Diagnosis, expert systems | Query systems, Prolog |

---

### 🧩 Unification & Resolution

#### Unification in FOL

* Process of making two predicates identical by finding a substitution.
* **Example**:

  * `p(x, g(x)) =? p(y, g(y))` → Unifiable: {x/y}

#### Algorithm Steps:

1. Check predicates and their arity.
2. Match arguments left to right.
3. Replace variables with constants/expressions.

##### Solve: `p(x, g(x)) =? f(prime, f(prime))`

* Not unifiable as predicates and structure mismatch.

#### Resolution in Propositional Logic

* Proof technique to derive a conclusion using contradiction.
* Convert statements into CNF (Conjunctive Normal Form).
* Apply resolution rule to eliminate clauses.

##### Example:

1. A ∨ B
2. ¬B ∨ C
3. Resolve 1 & 2 ⇒ A ∨ C

---

### 📐 Knowledge Representation

#### Structures:

* **Semantic Networks**: Graph-based
* **Frames**: Slot-filler structures
* **Rules**: IF-THEN logic
* **Logic**: Propositional / Predicate

#### Comparison:

| Method        | Advantages                      | Limitations            |
| ------------- | ------------------------------- | ---------------------- |
| Propositional | Simple, easy to implement       | Limited expressiveness |
| Predicate     | More expressive (relations, ∀∃) | More complex           |
| Frames        | Object-like structuring         | Rigid structure        |

---

### 👨‍🔬 Agents & Wumpus World

#### Agent

* An entity that perceives environment and acts.

##### 5 Examples:

* Google Maps
* Thermostat
* Chatbot
* Robotic Vacuum
* Self-driving Car

#### PEAS Framework:

* Performance, Environment, Actuators, Sensors

#### Knowledge-Based Agent (Wumpus World)

* Uses logic-based rules to infer safe moves
* Example Rules:

  * Breeze → Adjacent pit
  * Stench → Adjacent Wumpus

#### Predicate Logic Example:

* If triangle is equilateral → isosceles:

  * ∀x Triangle(x) ∧ Equilateral(x) → Isosceles(x)

---

### 🧠 Planning in AI

#### Types of Planning

* **Classical**: Fully observable, deterministic
* **Conditional**: Includes IF-THEN branching
* **Hierarchical**: Goals decomposed into subgoals
* **Temporal**: Involves time and constraints
* **Non-Deterministic**: Multiple possible outcomes

#### Importance of Planning

* Efficient decision-making
* Goal achievement
* Automation and robotics

#### Classical Planning Algorithm

* Define initial & goal state
* Define operators
* Search (DFS, BFS, A\*)

---

### 🧱 STRIPS & Goal Stack Planning

#### STRIPS Representation

* **States**: Set of facts
* **Operators**: Preconditions, Add-list, Delete-list

#### Goal Stack Planning

1. Push goal onto stack
2. If not satisfied, push operator
3. Push operator's preconditions
4. Continue until all goals met

---

### 🧠 Components of AI System

#### 1. Perception

* Sensors, input processing

#### 2. Knowledge Base

* Facts and rules

#### 3. Inference Engine

* Applies logic and rules

#### 4. Learning Component

* Updates knowledge

#### 5. Planning & Execution

* Determines and carries out actions

---

### Sample Interview Questions

1. Explain alpha-beta pruning and give an example.
2. What is MCTS and how is it used in Go?
3. Solve N-Queens using CSP.
4. Solve SEND+MORE=MONEY using constraints.
5. Compare Backtracking and Branch & Bound.
6. Differentiate stochastic and partial games.
7. How does Tic-Tac-Toe AI make decisions?
8. How does UCT work in MCTS?
9. Types of consistency in CSP?
10. How does alpha-beta improve minimax?
11. What is unification in FOL with example?
12. Forward vs Backward Chaining?
13. STRIPS and goal stack planning?
14. Ontological Engineering and situation calculus?
15. Resolution and default reasoning?
