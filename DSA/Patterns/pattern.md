

---

# 1️⃣ Two Pointer Pattern

Used when working with **sorted arrays / palindrome / pair finding**

### Pattern idea

Move 2 pointers from start/end to reduce complexity from O(n²) → O(n)

### Problems

* Two Sum (sorted version)
* Container With Most Water
* Longest Palindromic Substring (expand)
* Merge Sorted Array

### When to think of this pattern

* sorted array
* pair search
* palindrome
* reduce nested loops

---

# 2️⃣ Sliding Window Pattern

Used for **substring / subarray problems**

### Pattern idea

Maintain a window range and expand/shrink

### Problems

* Longest Substring Without Repeating Characters
* Maximum Subarray
* Best Time to Buy/Sell Stock

### Trigger keywords

* substring
* longest/shortest
* continuous subarray

---

# 3️⃣ HashMap / Frequency Count Pattern

Used when **counting occurrences** or checking duplicates

### Problems

* Two Sum
* Valid Anagram
* Group Anagrams
* Longest Substring Without Repeating Characters

### Trigger keywords

* frequency
* duplicates
* unique elements
* count

---

# 4️⃣ Fast & Slow Pointer Pattern (Linked List)

Used for cycle detection or middle element

### Problems

* Linked List Cycle
* Middle of Linked List
* Detect cycle

### Idea

slow moves 1 step
fast moves 2 steps

---

# 5️⃣ Linked List Manipulation Pattern

Focus on pointer changes

### Problems

* Reverse Linked List
* Merge Two Sorted Lists
* Remove Nth node

### Important idea

store next node before changing pointer

---

# 6️⃣ Monotonic Stack Pattern

Used when we need **next greater/smaller element**

### Problems

* Valid Parentheses
* Min Stack
* Next Greater Element
* Daily Temperatures

### Trigger keywords

* next greater
* nearest smaller
* temperature increase
* parentheses matching

---

# 7️⃣ Tree DFS Pattern (Recursion)

Used in most tree problems

### Problems

* Maximum Depth of Binary Tree
* Same Tree
* Diameter of Tree
* Path Sum

### Traversals

* inorder
* preorder
* postorder

---

# 8️⃣ Tree BFS Pattern (Level Order)

Uses queue

### Problems

* Binary Tree Level Order Traversal
* Minimum depth
* Zigzag traversal

### Trigger keywords

* level order
* minimum distance
* shortest path in tree

---

# 9️⃣ BST Property Pattern

Use when Binary Search Tree condition given

### Properties

left < root < right

### Problems

* Validate Binary Search Tree
* Lowest Common Ancestor (BST)
* Insert in BST
* Search in BST

---

# 🔟 Tree Construction Pattern

Build tree using traversal arrays

### Problems

* Construct Binary Tree from preorder + inorder
* construct tree from inorder + postorder

---

# 1️⃣1️⃣ Graph DFS/BFS Pattern

Graph traversal

### Problems

* Number of Islands
* Clone Graph
* Count connected components


### Use

DFS recursion OR BFS queue

---

# 1️⃣2️⃣ Cycle Detection Pattern (Graph)

Important for dependencies

### Problems

* Course Schedule
* detect cycle in graph

### Techniques

* DFS visited array
* topological sort

---

# 1️⃣3️⃣ Dynamic Programming Pattern (1D)

Solve overlapping subproblems

### Problems

* Climbing Stairs
* House Robber
* Fibonacci
* Coin Change

### Thinking method

choice → store result → reuse

---

# 1️⃣4️⃣ Subsequence Pattern (DP)

Compare sequence elements

### Problems

* Longest Increasing Subsequence
* Word Break

---

# Quick Pattern Revision Table

| Pattern           | Problems                    |
| ----------------- | --------------------------- |
| Two pointer       | container water, sorted sum |
| sliding window    | substring problems          |
| hashmap           | anagram, duplicates         |
| fast slow pointer | cycle detection             |
| stack             | parentheses, next greater   |
| DFS tree          | depth, path sum             |
| BFS tree          | level order                 |
| BST logic         | validate BST                |
| graph DFS/BFS     | islands                     |
| DP 1D             | climbing stairs             |
| subsequence DP    | LIS                         |

---

# How to Identify Pattern in Interview

Ask:

1. Is array sorted? → two pointer
2. substring? → sliding window
3. tree? → DFS/BFS
4. optimization? → DP
5. dependency? → graph cycle
6. frequency count? → hashmap

---

If you want I can give:
✔ pattern wise code templates
✔ 1 day revision sheet
✔ most repeated Amazon OA questions
✔ tree quick revision notes
✔ DP pattern cheat sheet













<br>


---

# Bit Difficult

<br>

# 1️⃣ Modified Binary Search Pattern

Used when array is **sorted but modified**

### Key Idea

Binary search logic still applies but conditions change.

### Problems

* Search in Rotated Sorted Array
* Peak element
* Find minimum in rotated array

### Pattern trigger

sorted array but rotated / partially ordered

---

# 2️⃣ Bucket / Pigeonhole Pattern (Linear Sorting Logic)

Used when question demands **O(n)** instead of sorting.

### Problems

* Maximum Gap (O(n))
* sort numbers in range
* find missing number in range

### Core idea

distribute numbers into buckets instead of sorting fully

---

# 3️⃣ Advanced Stack Pattern (State Compression)

Used when we need to **remove duplicates / track state efficiently**

### Problems

* Remove All Adjacent Duplicates in String II
* Daily Temperatures variation
* Next greater element

### Core idea

stack helps maintain order + track previous state

---

# 4️⃣ Monotonic Stack Pattern

Maintain increasing or decreasing order

### Problems

* Daily Temperatures
* Next greater element
* Stock span

### Core idea

remove useless elements from stack

---

# 5️⃣ DAG + Topological Sort Pattern

Very important for Amazon system design style questions

### Real world mapping

service dependencies
build order
task scheduling
microservices execution order

### Problems

* Course Schedule
* Topological Sort
* service dependency execution order

### Core idea

use indegree array + queue (BFS)

Steps:

1. count indegree
2. start nodes with indegree 0
3. process in order

---

# 6️⃣ Longest Path in DAG Pattern

Advanced extension of topological sort

### Real interview scenario

microservices each take 1 sec → find total execution time

### Idea

after topological sort calculate longest path

Used when:
parallel tasks allowed

---

# 7️⃣ BFS / DFS Traversal Pattern (Graph & Grid)

Amazon frequently gives matrix problems

### Problems

* Number of Islands
* shortest path avoiding obstacles
* rainfall grid queries
* flood fill

### core idea

explore neighbours

DFS → recursion
BFS → queue

---

# 8️⃣ 2D Prefix Sum Pattern (IMPORTANT)

Used when multiple queries on fixed matrix

### Problems

* rainfall grid sum queries
* submatrix sum queries

### idea

precompute cumulative sums

Query complexity becomes O(1)

instead of O(n*m)

---

# 9️⃣ Tree DP Pattern

Combination of recursion + dynamic programming

### Problems

* House Robber III
* maximum path sum in tree
* diameter of binary tree

### core idea

each node returns multiple states

---

# 🔟 Greedy Optimization Pattern

choose best local solution

### Problems

* Minimum jumps to reach end
* Task Scheduler variation
* Circular Tour (gas station)

### idea

prove greedy choice works

---

# 1️⃣1️⃣ Priority Queue / Min Heap Pattern

Used when repeatedly extracting smallest/largest element

### Problems

* Merge K sorted linked lists
* Kth largest element
* top k frequent elements

### complexity

O(n log k)

---

# 1️⃣2️⃣ Graph Dependency Pattern

used in build systems

### problems

* course schedule
* dependency resolution
* package installation order

---

# 1️⃣3️⃣ Tree Serialization Pattern

Convert tree → string → tree

### problems

* serialize binary tree
* deserialize binary tree

### used in

data transfer
saving state

---

# UPDATED MASTER PATTERN TABLE

| Pattern                | Problems               |
| ---------------------- | ---------------------- |
| two pointer            | container water        |
| sliding window         | substring problems     |
| hashmap                | anagram                |
| fast slow pointer      | linked list cycle      |
| monotonic stack        | daily temperatures     |
| DFS tree               | max depth              |
| BFS tree               | level order            |
| BST logic              | validate BST           |
| tree construction      | preorder + inorder     |
| graph DFS/BFS          | number of islands      |
| topological sort       | course schedule        |
| longest path DAG       | service execution time |
| prefix sum 2D          | rainfall queries       |
| DP 1D                  | climbing stairs        |
| tree DP                | house robber III       |
| greedy                 | minimum jumps          |
| heap                   | merge k lists          |
| serialization          | tree encode decode     |
| bucket logic           | maximum gap            |
| modified binary search | rotated sorted array   |

---

# How Amazon Converts DSA into Real Problem

Example mapping:

| real problem            | actual pattern        |
| ----------------------- | --------------------- |
| microservice dependency | topological sort      |
| task scheduling         | greedy + heap         |
| network routing         | graph BFS             |
| recommendation system   | graph traversal       |
| cache system            | hashmap + linked list |
| file system tree        | tree traversal        |
| concurrent execution    | DAG longest path      |

---

# LAST 5 DAY FOCUS ORDER (updated)

1. sliding window
2. hashmap
3. tree DFS BFS
4. graph BFS DFS
5. topological sort
6. DP basics
7. heap
8. greedy
9. prefix sum
10. binary search variation

---

