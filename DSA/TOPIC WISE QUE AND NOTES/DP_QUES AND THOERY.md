

# 📘 **Dynamic Programming: In-Depth Notes**

---

### 🔷 1. What is Dynamic Programming?

**Definition:**

> Dynamic Programming (DP) is a method of solving problems by breaking them down into simpler subproblems, solving each subproblem only once, and storing the result for future reference (memoization or tabulation).

**Used When:**

* The problem has **overlapping subproblems** (same subproblem repeated).
* It has **optimal substructure** (optimal solution can be constructed from optimal solutions of subproblems).

---

### 🔷 2. Difference Between Recursion and Dynamic Programming

| Feature          | Recursion                             | Dynamic Programming                             |
| ---------------- | ------------------------------------- | ----------------------------------------------- |
| Approach         | Top-down                              | Top-down (Memoization) / Bottom-up (Tabulation) |
| Recalculation    | Solves same subproblem multiple times | Solves once, stores result (memoization)        |
| Time Complexity  | Exponential (e.g., O(2^n))            | Polynomial (e.g., O(n))                         |
| Space Complexity | Depends on call stack                 | Uses arrays or hash maps                        |
| Storage          | No reuse of previous calls            | Stores and reuses solutions                     |

---

### 🔷 3. Fibonacci Example – Recursion vs DP

#### ❗ Problem:

> Find the Nth Fibonacci number where:
> `Fib(0) = 0, Fib(1) = 1`
> `Fib(n) = Fib(n-1) + Fib(n-2)`

---

### 🔸 A. Recursion (Brute Force)

```cpp
int fib(int n) {
    if(n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
```

#### ⚠️ Drawbacks:

* **Repeated calls:** fib(5) → fib(4) + fib(3), fib(4) → fib(3) + fib(2) ...
* **Time Complexity:** O(2ⁿ) – exponential growth

---

### 🔸 B. DP using Memoization (Top-Down)

```cpp
int fib(int n, vector<int> &dp) {
    if(n <= 1) return n;
    if(dp[n] != -1) return dp[n]; // already computed
    return dp[n] = fib(n-1, dp) + fib(n-2, dp);
}
```

**Usage:**

```cpp
int n = 6;
vector<int> dp(n+1, -1);
cout << fib(n, dp);  // Output: 8
```

**Time Complexity:** O(n)
**Space Complexity:** O(n) for array + recursion stack

---

### 🔸 C. DP using Tabulation (Bottom-Up)

```cpp
int fib(int n) {
    if(n <= 1) return n;
    vector<int> dp(n+1);
    dp[0] = 0; dp[1] = 1;
    for(int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)
✅ No recursion

---

### 🔷 4. Visualization: Recursion Tree vs DP Table

#### 📌 Recursion Tree (for `fib(5)`)

```
                fib(5)
               /     \
           fib(4)   fib(3)
          /     \     /   \
      fib(3)  fib(2) fib(2) fib(1)
     /    \     /          \
fib(2) fib(1) fib(1)      fib(0)
 /   \
fib(1) fib(0)
```

🟥 Repeats: `fib(3)`, `fib(2)`, `fib(1)` called many times!

---

#### 📌 DP Table (Tabulation)

```
Index:    0  1  2  3  4  5
Value:    0  1  1  2  3  5  ← building step by step
```

✅ No repeated work, values stored in order!

---

### 🔷 5. Dry Run of DP Solution (Tabulation) for `fib(5)`

| i | dp\[i-2] | dp\[i-1] | dp\[i] = dp\[i-1]+dp\[i-2] |
| - | -------- | -------- | -------------------------- |
| 2 | 0        | 1        | 1                          |
| 3 | 1        | 1        | 2                          |
| 4 | 1        | 2        | 3                          |
| 5 | 2        | 3        | 5                          |

🟩 Final Answer: `dp[5] = 5`

---

### 🔷 6. Space Optimization (Best DP)

```cpp
int fib(int n) {
    if(n <= 1) return n;
    int prev2 = 0, prev1 = 1, curr;
    for(int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return curr;
}
```

**Time:** O(n)
**Space:** O(1) ✅

---

### 🧠 Summary

| Method          | Time   | Space | Description        |
| --------------- | ------ | ----- | ------------------ |
| Recursion       | O(2^n) | O(n)  | Brute-force        |
| Memoization     | O(n)   | O(n)  | Top-down + caching |
| Tabulation      | O(n)   | O(n)  | Bottom-up          |
| Space-Optimized | O(n)   | O(1)  | Only 2 vars needed |




Exactly right! ✅
**Dynamic Programming (DP)** can be applied to problems that satisfy **both** of these conditions:

---

## 🔷 Conditions for Using DP

| Condition                      | Description                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------ |
| 1. **Overlapping Subproblems** | The same subproblems are solved multiple times (can be cached and reused)      |
| 2. **Optimal Substructure**    | The solution to the problem can be built from optimal solutions of subproblems |

---

## 🔷 Let's Understand with Examples:

---

### 🔹 1. **Fibonacci Numbers**

* **Overlapping Subproblems:**
  `fib(n)` calls `fib(n-1)` and `fib(n-2)` repeatedly
* **Optimal Substructure:**
  `fib(n) = fib(n-1) + fib(n-2)`

✅ Can use DP

---

### 🔹 2. **Climbing Stairs**

> You can take 1 or 2 steps. How many distinct ways to reach the top of `n` stairs?

* **Overlapping Subproblems:**
  `ways(n) = ways(n-1) + ways(n-2)` → repeats
* **Optimal Substructure:**
  Current step depends only on optimal steps before it

✅ Can use DP

---

### 🔹 3. **0/1 Knapsack Problem**

> Maximize value in a bag of capacity `W` with items of weight and value.

* **Overlapping Subproblems:**
  Subsets of items & capacities repeat
* **Optimal Substructure:**
  Best choice at each step depends on smaller subproblems

✅ Can use DP

---

### 🔹 4. **Longest Common Subsequence (LCS)**

> Find the length of longest subsequence common to two strings

* **Overlapping Subproblems:**
  Same (i, j) pairs repeated
* **Optimal Substructure:**
  If characters match, add 1 + LCS of rest

✅ Can use DP

---

### 🔹 5. **Matrix Chain Multiplication**

> Find best order to multiply matrices to minimize operations.

* **Overlapping Subproblems:**
  Same matrix subranges considered again and again
* **Optimal Substructure:**
  Divide at all `k`, choose min from all splits

✅ Can use DP

---

### 🔹 6. **Edit Distance**

> Convert one string to another using insert, delete, replace

* **Overlapping Subproblems:**
  Same (i, j) states considered repeatedly
* **Optimal Substructure:**
  Optimal move depends on prior optimal state

✅ Can use DP

---

Great question! Understanding **when *not* to use Dynamic Programming (DP)** is just as important as knowing when to apply it.

---

## ❌ **When NOT to Use Dynamic Programming**

DP **should not be used** when:

* There are **no overlapping subproblems**
* There’s **no optimal substructure**
* The problem has a **direct formula**
* The solution doesn’t benefit from reusing sub-results
* Using DP would actually make the solution slower or unnecessarily complex

---

## 📌 **Example: Sum of First N Natural Numbers**

### 🔷 Problem:

> Find the sum of first `n` natural numbers
> i.e., `1 + 2 + 3 + ... + n`

---

### ✅ Best Approach:

```cpp
int sum = n * (n + 1) / 2;
```

* **Time Complexity:** O(1)
* **Space Complexity:** O(1)
* **Reason:** It has a direct formula (arithmetic progression sum)

---

### ❌ DP Not Needed:

If you try to use recursion or DP:

```cpp
int sum(int n) {
    if (n == 0) return 0;
    return sum(n - 1) + n;
}
```

or DP with memoization:

```cpp
int sum(int n, vector<int> &dp) {
    if (n == 0) return 0;
    if (dp[n] != -1) return dp[n];
    return dp[n] = sum(n - 1, dp) + n;
}
```

* **Time:** O(n)
* **Space:** O(n)
* **But:** This is **slower and wasteful** for such a simple task

---

## ✅ Summary Table

| Problem                  | Use DP? | Why / Why Not?                                      |
| ------------------------ | ------- | --------------------------------------------------- |
| Fibonacci Numbers        | Yes     | Overlapping subproblems, recursive structure        |
| 0/1 Knapsack             | Yes     | Choices + overlapping states                        |
| Climbing Stairs          | Yes     | Similar to Fibonacci                                |
| LCS / Edit Distance      | Yes     | Repeats same sub-states often                       |
| Sum of `n` Numbers       | ❌ No    | Has a direct O(1) formula                           |
| Checking Even/Odd Number | ❌ No    | No subproblem, constant time                        |
| Maximum of Array         | ❌ No    | Single linear pass is enough                        |
| Sorting an Array         | ❌ No    | No overlapping subproblems — use sorting algorithms |









 **classic Climbing Stairs problem** 
 
> 🔸 **Problem Statement:**
> You are climbing a staircase with `n` steps. Each time, you can either climb 1 step or 2 steps.
> How many distinct ways can you reach the top?

---

# 🧗 **1. Recursion (Brute Force)**

### 🔹 Code:

```cpp
int climbStairs(int n) {
    if (n == 0 || n == 1) return 1; // base case
    return climbStairs(n - 1) + climbStairs(n - 2);
}
```

### 🔹 Explanation:

* This is a **top-down recursive solution**.
* Base Cases:

  * `climbStairs(0) = 1`: 1 way to stay at step 0.
  * `climbStairs(1) = 1`: only 1 way to climb 1 step.
* Recursive Case:

  * To reach step `n`, you could come from:

    * `n-1` with a 1-step move
    * `n-2` with a 2-step move
  * So total ways = `ways(n-1) + ways(n-2)`

### 🔹 Dry Run for `n = 3`

```
climbStairs(3)
= climbStairs(2) + climbStairs(1)
= (climbStairs(1) + climbStairs(0)) + 1
= (1 + 1) + 1 = 3
```

### ❌ Drawback:

* **Time Complexity:** `O(2^n)` – repeated calls!
* **Space Complexity:** `O(n)` – recursion stack

---

# 🧠 **2. DP with Memoization (Top-Down)**

### 🔹 Code:

```cpp
int climbStairsMemo(int n, vector<int> &dp) {
    if (n == 0 || n == 1) return 1;
    if (dp[n] != -1) return dp[n]; // already solved
    return dp[n] = climbStairsMemo(n - 1, dp) + climbStairsMemo(n - 2, dp);
}

// Usage:
int main() {
    int n = 5;
    vector<int> dp(n + 1, -1);
    cout << climbStairsMemo(n, dp);  // Output: 8
}
```

### 🔹 Explanation:

* Adds a cache (`dp[]`) to **store results** of subproblems.
* `dp[n] != -1`: means we already solved for `n`.
* Saves **repeated calls**, improving performance.

### ✅ Advantage:

* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(n)` (array + stack)

---

# 📊 **3. DP with Tabulation (Bottom-Up)**

### 🔹 Code:

```cpp
int climbStairsTabu(int n) {
    if (n == 0 || n == 1) return 1;
    vector<int> dp(n + 1);
    dp[0] = dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

### 🔹 Explanation:

* Builds the solution **iteratively from bottom**.
* `dp[0] = 1`, `dp[1] = 1`: base cases
* Each `dp[i]` = total ways to reach `i` using `dp[i-1]` and `dp[i-2]`
* No recursion involved

### 🟩 Dry Run for `n = 5`

| i | dp\[i-2] | dp\[i-1] | dp\[i] = dp\[i-1] + dp\[i-2] |
| - | -------- | -------- | ---------------------------- |
| 2 | 1        | 1        | 2                            |
| 3 | 1        | 2        | 3                            |
| 4 | 2        | 3        | 5                            |
| 5 | 3        | 5        | 8                            |

Final result: `dp[5] = 8`

### ✅ Advantage:

* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(n)` (only array, no stack)

---

# 🧮 **Space Optimized DP (Best Version)**

```cpp
int climbStairsOpt(int n) {
    if (n == 0 || n == 1) return 1;
    int prev2 = 1, prev1 = 1, curr;
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

* Uses just **two variables** instead of a full array
* ✅ **Time:** O(n)
* ✅ **Space:** O(1)

---

# ✅ Summary Table

| Method          | Time   | Space | Notes                       |
| --------------- | ------ | ----- | --------------------------- |
| Recursion       | O(2^n) | O(n)  | Simple but slow             |
| Memoization     | O(n)   | O(n)  | Recursion + cache           |
| Tabulation      | O(n)   | O(n)  | Bottom-up iterative         |
| Space Optimized | O(n)   | O(1)  | Best for Fibonacci-style DP |

---





# 🧗‍♀️ **Climbing Stairs – Variations**

Each variation builds on the basic idea: “How many ways to reach the top of `n` stairs?”

---

## 🔹 1. **Basic Climbing Stairs (1 or 2 steps at a time)**

**Problem:**
You can take either 1 or 2 steps. How many distinct ways can you reach the top?

**Recurrence Relation:**
`ways(n) = ways(n-1) + ways(n-2)`

**Code (C++):**

```cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev1 = 2, prev2 = 1, curr;
    for (int i = 3; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return curr;
}
```

---

## 🔹 2. **Climbing Stairs with K Possible Steps**

**Problem:**
You can take steps from a given set `S = {1, 3, 5}`. Find the number of ways to climb `n` stairs.

**Recurrence:**
`ways(n) = ways(n - s1) + ways(n - s2) + ... for all s in S`

**Code (C++):**

```cpp
int countWays(int n, vector<int>& steps) {
    vector<int> dp(n+1, 0);
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int step : steps) {
            if (i - step >= 0)
                dp[i] += dp[i - step];
        }
    }
    return dp[n];
}
```

---

## 🔹 3. **Minimum Cost Climbing Stairs**

**Problem:**
Each stair has a cost `cost[i]`. You can start from step 0 or 1 and pay cost when stepping on it. Find min cost to reach top (after `n-1` or `n`).

**Recurrence:**
`minCost(i) = cost[i] + min(minCost(i-1), minCost(i-2))`

**Code (C++):**

```cpp
int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    vector<int> dp(n);
    dp[0] = cost[0]; dp[1] = cost[1];
    for (int i = 2; i < n; i++)
        dp[i] = cost[i] + min(dp[i-1], dp[i-2]);
    return min(dp[n-1], dp[n-2]);
}
```

---

## 🔹 4. **Count Ways to Reach Top (With Restrictions)**

**Variation Examples:**

* Can’t step on broken stairs (blocked indices)
* Can only take exactly `k` steps
* Can only take odd/even steps

You adjust the `dp[i]` recurrence by:

* **Skipping broken stairs**
* **Using modular conditions**
* **Adding flags (even/odd)**

Example: **Skipping broken stairs**

```cpp
unordered_set<int> broken = {3};
if (broken.count(i)) continue; // skip if i is broken
```

---

## 🔹 5. **Climbing with Jump (Max jump allowed from each stair)**

**Problem:**
Given `arr[i]` = max steps you can jump from `i`, find if you can reach the end.

Similar to Jump Game, this is **Greedy or DP**.

---

## 🔹 6. **Count Paths with Variable Step Costs**

Each step can have:

* **Cost** for landing
* **Reward** for choosing a path
* Combine path count + cost optimization

This combines **counting + DP with min/max**

---

### 🔚 Summary Table

| Variation           | Keywords               | Technique          |
| ------------------- | ---------------------- | ------------------ |
| 1 or 2 Steps        | Fibonacci-style        | DP (O(n))          |
| K Steps             | Steps from Set S       | DP (Nested Loop)   |
| Minimum Cost        | Cost per stair         | DP with min()      |
| Skipping Steps      | Broken stairs          | Condition in loop  |
| Climbing with Jumps | arr\[i] = max jump     | Greedy/DP          |
| Exact k Steps       | Path length constraint | Combinatorics + DP |

---

