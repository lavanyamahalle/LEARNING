# DSA Basics Master Notes

# 1. What is Recursion?

## Definition

A function calling itself.

```cpp
void fun(){
    fun();
}
```

But recursion must always have:

* base case
* smaller subproblem

Otherwise infinite recursion occurs.

---

# 2. Structure of Recursion

```cpp
returnType func(parameters){

    // base case

    // work

    // recursive call
}
```

---

# 3. Base Case

Stops recursion.

Example:

```cpp
if(n==0)
    return 1;
```

Without base case:

```text
Stack Overflow
```

---

# 4. Recursive Faith

Most important concept.

Assume:

```text
Smaller recursive call already works correctly.
```

Example:

```text
5! = 5 × 4!
```

You trust recursion to calculate:

```text
4!
```

---

# 5. Call Stack

Every recursive call gets:

* its own memory
* its own variables
* its own execution state

Stored in stack.

Example:

```text
fun(3)
fun(2)
fun(1)
fun(0)
```

Returns upward after base case.

---

# 6. Return Flow

Recursive calls go DOWN.
Returns come UP.

Example:

```cpp
int fun(int n){

    if(n==0)
        return 0;

    return n + fun(n-1);
}
```

Flow:

```text
fun(3)
= 3 + fun(2)

fun(2)
= 2 + fun(1)

fun(1)
= 1 + fun(0)

fun(0)=0
```

Returns:

```text
fun(1)=1
fun(2)=3
fun(3)=6
```

---

# 7. Types of Recursion

## Linear Recursion

One recursive call.

Examples:

* factorial
* sum
* reverse string

---

## Binary Recursion

Two recursive calls.

Examples:

* fibonacci
* subsets

---

## Backtracking

```cpp
choose
recurse
undo
```

Examples:

* N Queens
* Sudoku
* permutations

---

# 8. Basic Linear Recursion Problems

## Factorial

```cpp
int fact(int n){

    if(n==0)
        return 1;

    return n * fact(n-1);
}
```

---

## Sum of N Numbers

```cpp
int sum(int n){

    if(n==0)
        return 0;

    return n + sum(n-1);
}
```

---

## Fibonacci

```cpp
int fib(int n){

    if(n<=1)
        return n;

    return fib(n-1) + fib(n-2);
}
```

---

## Reverse String

```cpp
void rev(string &s,int l,int r){

    if(l>=r)
        return;

    swap(s[l],s[r]);

    rev(s,l+1,r-1);
}
```

---

## Palindrome Check

```cpp
bool check(string s,int l,int r){

    if(l>=r)
        return true;

    if(s[l]!=s[r])
        return false;

    return check(s,l+1,r-1);
}
```

---

# Recursion, Backtracking & DP Master Notes

## 1. Binary Search using Recursion

### Code

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int st = 0;
        int end = nums.size() - 1;
        return ans(nums, target, st, end);
    }

    int ans(vector<int>& arr, int k, int st, int end) {
        if(st <= end) {
            int mid = st + (end - st) / 2;

            if(arr[mid] == k)
                return mid;

            else if(arr[mid] > k)
                return ans(arr, k, st, mid - 1);

            else
                return ans(arr, k, mid + 1, end);
        }

        return -1;
    }
};
```

## Important Concept

### Correct

```cpp
return ans(...);
```

### Wrong

```cpp
ans(...);
```

Without `return`, recursive result is lost.

---

# 2. Subsets using Include/Exclude

## Core Idea

For every element:

* Include
* Exclude

## Template

```cpp
void solve(i, state){

    if(basecase){
        process(state);
        return;
    }

    // include
    solve(i+1, updatedState);

    // exclude
    solve(i+1, state);
}
```

## Code

```cpp
class Solution {
public:

    vector<vector<int>> ansfun(vector<int>& nums,
                               vector<vector<int>>& ans,
                               vector<int>& subans,
                               int i) {

        if(i == nums.size()) {
            ans.push_back(subans);
            return ans;
        }

        // include
        subans.push_back(nums[i]);
        ansfun(nums, ans, subans, i + 1);

        // backtrack
        subans.pop_back();

        // exclude
        ansfun(nums, ans, subans, i + 1);

        return ans;
    }

    vector<vector<int>> subsets(vector<int>& nums) {

        vector<vector<int>> ans;
        vector<int> subans;

        return ansfun(nums, ans, subans, 0);
    }
};
```

## Important Backtracking Pattern

```cpp
push
recurse
pop
```

---

# 3. Recursion Return Flow

## Most Important Understanding

Recursive calls go DOWN.
Returns come UP.

Each recursive call returns to the exact line that called it.

---

# 4. Subsets II (Duplicates)

## Important Idea

Sort array first.
Skip duplicates while excluding.

## Duplicate Skip Logic

```cpp
while(idx < nums.size() && nums[idx] == nums[idx - 1])
    idx++;
```

---

# 5. First and Last Occurrence in Array

## First Occurrence

```cpp
int firstocc(vector<int>& nums, int target, int st) {

    if(st == nums.size())
        return -1;

    if(nums[st] == target)
        return st;

    return firstocc(nums, target, st + 1);
}
```

## Last Occurrence

```cpp
int last(vector<int>& nums, int target, int st) {

    if(st == nums.size())
        return -1;

    int idx = last(nums, target, st + 1);

    if(idx == -1 && nums[st] == target)
        return st;

    return idx;
}
```

## Key Difference

* First occurrence solved while going DOWN.
* Last occurrence solved while returning UP.

---

# 6. First Occurrence in String

## Code

```cpp
class Solution {
public:

    int strStr(string haystack, string needle) {

        return ans(haystack, needle, 0, needle.length());
    }

    int ans(string haystack,
            string needle,
            int st,
            int n) {

        if(st > haystack.length() - n)
            return -1;

        if(haystack.substr(st, n) == needle)
            return st;

        return ans(haystack, needle, st + 1, n);
    }
};
```

---

# 7. Power Function using Fast Exponentiation

## Core Formula

If:

```text
n is even:
x^n = (x^(n/2))²
```

If:

```text
n is odd:
x^n = x × (x^(n/2))²
```

## Code

```cpp
class Solution {
public:

    double myPow(double x, int n) {

        long long N = n;

        if(N < 0) {
            x = 1 / x;
            N = -N;
        }

        return fastPow(x, N);
    }

    double fastPow(double x, long long n) {

        if(n == 0)
            return 1.0;

        double half = fastPow(x, n / 2);
        double halfsq = half * half;

        if(n % 2 == 0)
            return halfsq;

        return x * halfsq;
    }
};
```

## Complexity

* Time: O(log n)
* Space: O(log n)

---

# 8. Tiling Problem

## Problem

Tile a 2×n board using 2×1 dominoes.

## Thinking

### Vertical Tile

Leaves:

```text
2 × (n-1)
```

### Horizontal Tiles

Leaves:

```text
2 × (n-2)
```

## Recurrence

```text
f(n) = f(n-1) + f(n-2)
```

## Recursive Code

```cpp
int tileWays(int n) {

    if(n == 0 || n == 1)
        return 1;

    return tileWays(n - 1) + tileWays(n - 2);
}
```

## Memoization

```cpp
int solve(int n, vector<int>& dp) {

    if(n == 0 || n == 1)
        return 1;

    if(dp[n] != -1)
        return dp[n];

    return dp[n] = solve(n - 1, dp)
                 + solve(n - 2, dp);
}
```

## DP Tabulation

```cpp
for(int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}
```

---

# 9. Remove Duplicates from String

## Core Idea

Keep first occurrence only.
Track visited characters.

## Code

```cpp
class Solution {
public:

    string removeDuplicates(string &s) {

        bool vis[256] = {false};

        return ans(s, vis, 0);
    }

    string ans(string &s,
               bool vis[],
               int i) {

        if(i == s.length())
            return "";

        char ch = s[i];

        if(!vis[ch]) {

            vis[ch] = true;

            return ch + ans(s, vis, i + 1);
        }

        return ans(s, vis, i + 1);
    }
};
```

## Pattern

```text
new character → keep
visited character → skip
```

---

# 10. N-Queens

## Problem

Place N queens so no queens attack each other.

## Rules

* Unique row
* Unique column
* Unique diagonal

## Backtracking Pattern

```cpp
place
recurse
remove
```

## Board Representation

```cpp
vector<string> board(n, string(n, '.'));
```

## Safe Checks

### Column

### Upper-left diagonal

### Upper-right diagonal

## Important Formula

### 3×3 Box Style Thinking

```cpp
3*(row/3) + i/3
3*(col/3) + i%3
```

---

# 11. Unique Paths

## Problem

Move from top-left to bottom-right.
Moves allowed:

* Right
* Down

## Recursive Formula

```cpp
return dfs(row+1,col)
     + dfs(row,col+1);
```

## Base Cases

```cpp
if(row == m-1 && col == n-1)
    return 1;

if(row >= m || col >= n)
    return 0;
```

## Memoization

```cpp
if(dp[row][col] != -1)
    return dp[row][col];
```

## Complexity

* Without DP: Exponential
* With DP: O(m × n)

---

# 12. Sudoku Solver

## Core Idea

Find empty cell.
Try digits 1–9.
If valid:

* place
* recurse
* backtrack

## Backtracking Pattern

```cpp
try
recurse
undo
```

## Sudoku Checks

* Row
* Column
* 3×3 Box

---

# 13. Recursion Patterns Summary

## Linear Recursion

One recursive call.

Examples:

* factorial
* sum
* reverse string

---

## Binary Recursion

Two recursive calls.

Examples:

* fibonacci
* subsets

---

## Backtracking

```cpp
choose
recurse
undo
```

Examples:

* N Queens
* Sudoku
* permutations

---

# 14. Include/Exclude Pattern

## Generic Template

```cpp
solve(i, state){

    if(basecase){
        process(state);
        return;
    }

    // include
    solve(i+1, updatedState);

    // exclude
    solve(i+1, state);
}
```

## Used In

* subsets
* subsequences
* subset sum
* target sum

---

# 15. Subsequence Generation

## Code

```cpp
void solve(string s,
           string temp,
           int i){

    if(i == s.length()){
        cout << temp << endl;
        return;
    }

    // include
    solve(s, temp + s[i], i+1);

    // exclude
    solve(s, temp, i+1);
}
```

---

# 16. Subset Sum

## Core Idea

Carry current sum instead of full subset.

## Code

```cpp
void solve(vector<int>& nums,
           int i,
           int sum){

    if(i == nums.size()){
        cout << sum << endl;
        return;
    }

    // include
    solve(nums,
          i+1,
          sum + nums[i]);

    // exclude
    solve(nums,
          i+1,
          sum);
}
```

---

# 17. Target Sum Exists

## Boolean Recursion

```cpp
return include || exclude;
```

## Meaning

If ANY path works:

```text
true
```

---

# 18. Count Subsets with Given Sum

## Counting Recursion

```cpp
return include + exclude;
```

## Meaning

Total valid ways.

---

# 19. Combination Sum

## Most Important Difference

Elements reusable.

## Important Recursive Call

```cpp
solve(nums,
      i,
      target - nums[i],
      sub);
```

NOT:

```cpp
i+1
```

because reuse allowed.

---

# 20. Permutations

## Core Idea

Order matters.

## Question

```text
Which unused element should I place next?
```

## Visited Array Pattern

```cpp
choose
mark visited
recurse
undo
```

## Swap Technique

```cpp
swap
recurse
swap back
```

---

# 21. Most Important Recursion Questions

Whenever solving recursion ask:

1. What changes?
2. What are choices?
3. What is base case?
4. What should function return?
5. Is overlapping happening?

---

# 22. Golden Observations

## Printing Problems

Use:

```cpp
void
```

## Existence Problems

Use:

```cpp
bool
```

with:

```cpp
||
```

## Counting Problems

Use:

```cpp
int
```

with:

```cpp
+
```

---

# 23. DP Understanding

## Recursion

Repeated subproblems.

## DP

Store answers.

## Memoization

```cpp
if(dp[state] != -1)
    return dp[state];
```

## Tabulation

Bottom-up iterative solution.

---

# 24. Most Important Backtracking Template

```cpp
for(all choices){

    if(invalid)
        continue;

    choose

    recurse

    undo
}
```

Used in:

* permutations
* N Queens
* Sudoku
* maze problems

---

# 25. Strong Basic Practice List

## Arrays

* sum array
* max element
* sorted check
* linear search

## Strings

* palindrome
* reverse string
* remove duplicates
* subsequences

## Include/Exclude

* subsets
* subset sum
* target exists
* count subsets

## Basic DP

* fibonacci
* climbing stairs
* tiling
* unique paths


class Solution {
public:
    int search(vector<int>& nums, int target) {
        int st=0;
        int end=nums.size()-1;
        return ans(nums,target,st,end);
    }
     int ans(vector<int> &arr, int k,int st,int end){
        if(st<=end){
           int mid=st+(end-st)/2;
        if(arr[mid]==k){return mid;}
        else if(arr[mid]>k){
            return ans(arr,k,st,mid-1);
        }
        else{
            return ans(arr,k,mid+1,end);
        } 
        }
        
        return -1;
    }
};

### ✅ **Working Version (Correct)**:

```cpp
if (arr[mid] > k) {
    return ans(arr, k, st, mid - 1);
}
```

### ❌ **Non-working Version (Wrong)**:

```cpp
if (arr[mid] > k) {
    ans(arr, k, st, mid - 1);  // missing return!
}
```

---

### 🔍 Difference Explained:

#### ❗ In the non-working version:

You're making the recursive call, but **not returning its result**.

So, even if `ans(...)` returns a correct index deeper in recursion, that value is **ignored**, and control continues to the next line — which eventually leads to:

```cpp
return -1;
```

#### ✅ In the working version:

You use `return` with each recursive call, so if the value is found deeper in recursion, that index is properly **propagated back up** the recursive call stack.

---

### 💡 Fix for Non-working Version:

Just add `return` before each recursive call:

```cpp
if (arr[mid] > k) {
    return ans(arr, k, st, mid - 1);
} else {
    return ans(arr, k, mid + 1, end);
}
```

---

### TL;DR:

Without `return`, recursive results are lost — you must `return` the recursive call if you expect its result to be used.

Let me know if you want an example step-by-step trace to visualize this.






class Solution {
public:
    vector<vector<int>> ansfun(vector<int>& nums,vector<vector<int>>&ans,vector<int>&subans,int i){
    
    if(i==nums.size()){
        ans.push_back(subans);
         return ans;   

    }
    //include
    subans.push_back(nums[i]);
    ansfun(nums,ans,subans,i+1);
    //exclude
    subans.pop_back();
    ansfun(nums,ans,subans,i+1);

    return ans;
    
    
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>>ans;
        int i=0;
        vector<int>subans;
        return  ansfun(nums,ans,subans,i);
        
    }
};

                         (i=0, [])
                     /               \
           include 1              exclude 1
           (i=1, [1])              (i=1, [])
          /        \              /        \
  inc 2 (i=2,[1,2]) exc 2(i=2,[1]) inc(i=2,[2]) exc(i=2,[])
     [1,2]             [1]             [2]         []



Call 0: i=0 | subans=[]
→ LINE 4: push 1 → subans=[1]
↓
Call 1: i=1 | subans=[1]
→ LINE 4: push 2 → subans=[1,2]
↓
Call 2: i=2 | subans=[1,2]
→ LINE 1 true → LINE 2: add [1,2] to ans ✅
→ LINE 3: return
↑
→ LINE 6: pop 2 → subans=[1]
→ LINE 7: exclude 2
↓
Call 3: i=2 | subans=[1]
→ LINE 1 true → LINE 2: add [1] to ans ✅
→ LINE 3: return
↑
→ LINE 6: pop 1 → subans=[]
→ LINE 7: exclude 1
↓
Call 4: i=1 | subans=[]
→ LINE 4: push 2 → subans=[2]
↓
Call 5: i=2 | subans=[2]
→ LINE 1 true → LINE 2: add [2] to ans ✅
→ LINE 3: return
↑
→ LINE 6: pop 2 → subans=[]
→ LINE 7: exclude 2
↓
Call 6: i=2 | subans=[]
→ LINE 1 true → LINE 2: add [] to ans ✅
→ LINE 3: return


Awesome! 🎉 Since you’ve **understood the most important part** — how return flows back to the calling line — now let’s walk through the **entire recursive process**:

---

## ✅ Full Call Chain (with lines, subans, i, and returns)

We'll trace:

* Function calls
* Which line executes
* What’s in `subans`
* Where return goes

---

### 🧮 Input: `nums = [1, 2]`

---

### ▶️ CALL 0: `i = 0`, `subans = []`

From `subsets(...)` → starts recursion

```cpp
LINE 4: push 1 → subans = [1]
LINE 5: call ansfun(nums, ans, subans, 1) → CALL 1
```

---

### ▶️ CALL 1: `i = 1`, `subans = [1]`

```cpp
LINE 4: push 2 → subans = [1, 2]
LINE 5: call ansfun(nums, ans, subans, 2) → CALL 2
```

---

### ▶️ CALL 2: `i = 2`, `subans = [1, 2]` ✅ BASE CASE

```cpp
LINE 1: i == nums.size() → true
LINE 2: add [1, 2] to ans
LINE 3: return → back to CALL 1 at LINE 5
```

⬅️ Back to CALL 1

```cpp
LINE 6: pop 2 → subans = [1]
LINE 7: call ansfun(nums, ans, subans, 2) → CALL 3
```

---

### ▶️ CALL 3: `i = 2`, `subans = [1]` ✅ BASE CASE

```cpp
LINE 1: i == nums.size() → true
LINE 2: add [1] to ans
LINE 3: return → back to CALL 1 at LINE 7
```

⬅️ Back to CALL 1
CALL 1 is now done (both include/exclude for `i = 1` finished)

```cpp
return → back to CALL 0 at LINE 5
```

---

### 📍Back in CALL 0

```cpp
LINE 6: pop 1 → subans = []
LINE 7: call ansfun(nums, ans, subans, 1) → CALL 4
```

---

### ▶️ CALL 4: `i = 1`, `subans = []`

```cpp
LINE 4: push 2 → subans = [2]
LINE 5: call ansfun(nums, ans, subans, 2) → CALL 5
```

---

### ▶️ CALL 5: `i = 2`, `subans = [2]` ✅ BASE CASE

```cpp
LINE 1: i == nums.size() → true
LINE 2: add [2] to ans
LINE 3: return → back to CALL 4 at LINE 5
```

⬅️ Back to CALL 4

```cpp
LINE 6: pop 2 → subans = []
LINE 7: call ansfun(nums, ans, subans, 2) → CALL 6
```

---

### ▶️ CALL 6: `i = 2`, `subans = []` ✅ BASE CASE

```cpp
LINE 1: i == nums.size() → true
LINE 2: add [] to ans
LINE 3: return → back to CALL 4 at LINE 7
```

⬅️ Back to CALL 4 → done

```cpp
return → back to CALL 0
```

---

### ✅ CALL 0 ends

All subsets have been generated:

```cpp
ans = [[1,2], [1], [2], []]
```

---

## 🔁 RECAP: Full Call Flow With Return Links

```txt
CALL 0
  ├── CALL 1 (include 1)
  │     ├── CALL 2 (include 2) → return to CALL 1 (LINE 5)
  │     └── CALL 3 (exclude 2) → return to CALL 1 (LINE 7)
  └── CALL 4 (exclude 1)
        ├── CALL 5 (include 2) → return to CALL 4 (LINE 5)
        └── CALL 6 (exclude 2) → return to CALL 4 (LINE 7)
```

Each function:

* Makes two calls (include, exclude)
* Returns after both are done
* Pops to previous call at exactly the line where it was called

---

Would you like this call chain visualized in **stack diagram format** (showing call stack push and pop)?



Perfect! Let's answer your **exact question** clearly:

> For each line in the return flow — what is the value of `i` at that moment?

We'll walk through it in the exact order you wrote it 👇

---

## ✅ Setup Recap:

```cpp
nums = [1, 2]
```

---

## 📌 Breakdown with `i` Values

---

### 🔹 1.

```
LINE 1: i == nums.size() → true
```

✅ **This happens in Call 3**, where:

```cpp
i = 2
subans = [1]
```

So:
✅ **i = 2**

---

### 🔹 2.

```
LINE 2: add [1] to ans
```

Still in **Call 3**, so:
✅ **i = 2**

---

### 🔹 3.

```
LINE 3: return → back to CALL 1 at LINE 7
```

🔁 Call 3 ends and returns to **CALL 1**, which had:

```cpp
i = 1
subans = [1]
```

So now:
✅ **i = 1** (back in Call 1)

---

### 🔹 4.

```
CALL 1 is now done (both include/exclude for i = 1 finished)
return → back to CALL 0 at LINE 5
```

🔁 Call 1 ends and returns to **CALL 0**, where:

```cpp
i = 0
subans = []
```

So:
✅ **i = 0**

---

### 🔹 5.

```
LINE 6: pop 1 → subans = []
```

Still in **Call 0**, so:
✅ **i = 0**

---

### 🔹 6.

```
LINE 7: call ansfun(nums, ans, subans, 1) → CALL 4
```

You are in **Call 0**, making a new recursive call:

```cpp
ansfun(..., i + 1) → i = 1
```

So:
✅ **i = 0**, and you're calling **i = 1** in CALL 4

---

## ✅ Final Annotated Summary Table

| Step | Description                                     | `i` Value                 |
| ---- | ----------------------------------------------- | ------------------------- |
| 1    | In Call 3 → base case (`i == nums.size()`)      | `i = 2`                   |
| 2    | Add `[1]` to ans                                | `i = 2`                   |
| 3    | Return to Call 1 at LINE 7                      | `i = 1`                   |
| 4    | Call 1 returns to Call 0 at LINE 5              | `i = 0`                   |
| 5    | LINE 6: pop 1 from subans                       | `i = 0`                   |
| 6    | LINE 7: call ansfun(..., i + 1) → CALL 4 starts | `i = 0` (calling `i = 1`) |

---

Would you like this entire return/call flow **visualized as a real call stack table** like debuggers show (with `i`, `subans`, line #)?



Absolutely! ✅ You got stuck at the **core concept of recursion return flow** — especially **how control returns to the correct line** and **what happens to variables like `i` and `subans`** across recursive calls.

Here are your **Revision Notes for Recursion (Subset Generation)** — focused on the exact confusion you overcame.

---

# 📘 RECURSION REVISION NOTES (Subset Generation – Return Flow & `i` Clarity)

---

## 🧠 Core Idea of Recursion

* Recursion is a function calling itself to break down a problem into smaller sub-problems.
* Each call has **its own copy** of variables like `i`, `subans`, and its own position in the code.

---

## 🔁 Subset Generation Logic

At each index `i`, make two choices:

1. **Include** `nums[i]` in the subset.
2. **Exclude** `nums[i]` from the subset.

When you reach `i == nums.size()`, you've considered all elements → **save current subset**.

---

## 🧩 Function Logic

```cpp
vector<vector<int>> ansfun(vector<int>& nums, vector<vector<int>>& ans, vector<int>& subans, int i) {
    if(i == nums.size()) {                // LINE 1
        ans.push_back(subans);            // LINE 2
        return ans;                       // LINE 3
    }

    subans.push_back(nums[i]);            // LINE 4
    ansfun(nums, ans, subans, i + 1);     // LINE 5

    subans.pop_back();                    // LINE 6
    ansfun(nums, ans, subans, i + 1);     // LINE 7

    return ans;                           // LINE 8
}
```

---

## 📍 What's `i` Doing?

| `i` Value | Meaning                               |
| --------- | ------------------------------------- |
| 0         | Deciding about `nums[0]`              |
| 1         | Deciding about `nums[1]`              |
| 2         | Done with all decisions — base case ✅ |

`i` always moves **forward**, never goes backward — it's like a pointer for **current element to decide on**.

---

## 🔄 Return Flow Clarity

Each recursive call returns to **exactly the line that called it**.

* `LINE 5` calls → `LINE 3` return comes **back to after LINE 5**
* `LINE 7` calls → `LINE 3` return comes **back to after LINE 7**

**Never returns to LINE 6** (that’s before the call)

---

## 📊 Control Flow Recap (when `nums = [1, 2]`)

```
Call 0 (i=0) → include 1
  ↳ Call 1 (i=1) → include 2
     ↳ Call 2 (i=2) → base → add [1,2] → return to LINE 5 of Call 1
  ↳ LINE 6: pop 2, LINE 7 → Call 3 (i=2) → base → add [1] → return to LINE 7 of Call 1
↳ LINE 6: pop 1, LINE 7 → Call 4 (i=1) → include/exclude 2 → generate [2], [] 
```

---

## 🔙 Return Path Example

```text
Call 3: i=2 → return → goes to LINE 7 of Call 1 (i=1)
Call 1: return → goes to LINE 5 of Call 0 (i=0)
Call 0: continues from LINE 6
```

---

## 📚 Summary Tips

✅ Each call has its own **`i`**, `subans`, and code line pointer
✅ Recursive return always goes back to the **line that called it**
✅ `subans.pop_back()` is **not** undone by the return — it's executed **before** the next call
✅ Base case (`i == nums.size()`) means: you’ve built one subset — save it

---

## 🧠 Simple Analogy

Think of recursion like **opening new tabs** in a browser:

* Each tab is one function call
* When you're done with that tab, you close it and go back to the one that opened it
* Each tab remembers exactly **what it was doing** when it opened the next

---

## ✅ What You Overcame

🔓 You were stuck on:

* **Where exactly the return goes after LINE 3**
* Whether it returns to LINE 6 or LINE 7 (Answer: **LINE 7**)
* Whether `i` changes backward (Answer: **No**, each call has its own `i`)

---


Call 0 (i=0) → include 1  
  ↳ Call 1 (i=1) → include 2  
     ↳ Call 2 (i=2) → base → add [1,2] → return to LINE 5 of Call 1  
  ↳ LINE 6: pop 2, LINE 7 → Call 3 (i=2) → base → add [1] → return to LINE 7 of Call 1  
  (// as both include and exclude calls in Call 1 are now completed, Call 1 returns to Call 0 just after LINE 5)  
↳ LINE 6: pop 1, LINE 7 → Call 4 (i=1) → include/exclude 2 → generate [2], []



                     Call 0: i=0, subans=[]
                    /                         \
          include 1                           exclude 1
         /                                       \
Call 1: i=1, subans=[1]                    Call 4: i=1, subans=[]
       /               \                          /           \
include 2         exclude 2               include 2      exclude 2
   |                  |                        |              |
Call 2: i=2        Call 3: i=2            Call 5: i=2     Call 6: i=2
subans=[1,2]      subans=[1]             subans=[2]      subans=[]
add [1,2]         add [1]                add [2]         add []



Perfect! Let's answer your **exact question** clearly:

> For each line in the return flow — what is the value of `i` at that moment?

We'll walk through it in the exact order you wrote it 👇

---

## ✅ Setup Recap:

```cpp
nums = [1, 2]
```

---

## 📌 Breakdown with `i` Values

---

### 🔹 1.

```
LINE 1: i == nums.size() → true
```

✅ **This happens in Call 3**, where:

```cpp
i = 2
subans = [1]
```

So:
✅ **i = 2**

---

### 🔹 2.

```
LINE 2: add [1] to ans
```

Still in **Call 3**, so:
✅ **i = 2**

---

### 🔹 3.

```
LINE 3: return → back to CALL 1 at LINE 7
```

🔁 Call 3 ends and returns to **CALL 1**, which had:

```cpp
i = 1
subans = [1]
```

So now:
✅ **i = 1** (back in Call 1)

---

### 🔹 4.

```
CALL 1 is now done (both include/exclude for i = 1 finished)
return → back to CALL 0 at LINE 5
```

🔁 Call 1 ends and returns to **CALL 0**, where:

```cpp
i = 0
subans = []
```

So:
✅ **i = 0**

---

### 🔹 5.

```
LINE 6: pop 1 → subans = []
```

Still in **Call 0**, so:
✅ **i = 0**

---

### 🔹 6.

```
LINE 7: call ansfun(nums, ans, subans, 1) → CALL 4
```

You are in **Call 0**, making a new recursive call:

```cpp
ansfun(..., i + 1) → i = 1
```

So:
✅ **i = 0**, and you're calling **i = 1** in CALL 4

---

## ✅ Final Annotated Summary Table

| Step | Description                                     | `i` Value                 |
| ---- | ----------------------------------------------- | ------------------------- |
| 1    | In Call 3 → base case (`i == nums.size()`)      | `i = 2`                   |
| 2    | Add `[1]` to ans                                | `i = 2`                   |
| 3    | Return to Call 1 at LINE 7                      | `i = 1`                   |
| 4    | Call 1 returns to Call 0 at LINE 5              | `i = 0`                   |
| 5    | LINE 6: pop 1 from subans                       | `i = 0`                   |
| 6    | LINE 7: call ansfun(..., i + 1) → CALL 4 starts | `i = 0` (calling `i = 1`) |






Absolutely! You're solving **“Subsets II” (Leetcode 90)** — generating all **unique subsets** when the input array may have **duplicate elements**. You're using **backtracking with recursion** and skipping duplicates smartly. Let's fully break it down.

---

# ✅ Problem

> Given a list `nums` (may have duplicates), return **all possible unique subsets**.

---

## ✅ Your Code Logic

### 🔹 Function: `ansfun(nums, ans, subans, i)`

At each recursive call:

* `i` = current index in `nums`
* `subans` = current subset being formed
* `ans` = final result list of subsets

### 🔹 Base Case:

```cpp
if (i == nums.size())
```

➡️ You’ve considered all elements → **push `subans` to `ans`**

---

### 🔹 Recursive Cases:

#### 1. **Include `nums[i]` in the subset**

```cpp
subans.push_back(nums[i]);
ansfun(nums, ans, subans, i + 1);
```

#### 2. **Exclude `nums[i]` and skip duplicates**

```cpp
subans.pop_back(); // backtrack
int idx = i + 1;
while (idx < nums.size() && nums[idx] == nums[idx - 1]) idx++;
ansfun(nums, ans, subans, idx);
```

* This part **skips all duplicate values** after excluding the current one.

---

## ✅ Input Example:

```cpp
nums = [1, 2, 2]
```

You sort it first → `[1, 2, 2]` (already sorted)

---

## 🌳 Recursive Call Tree with `i` and `subans`

Let’s now walk through each function call and show how `i` is changing.

---

### 📍 `Call 0: i=0, subans=[]`

* include `1` → `subans=[1]`

---

#### ▶ `Call 1: i=1, subans=[1]`

* include `2` → `subans=[1,2]`

---

##### ▶▶ `Call 2: i=2, subans=[1,2]`

* include `2` again → `subans=[1,2,2]`

---

###### ▶▶▶ `Call 3: i=3, subans=[1,2,2]`

✅ Base case → add `[1,2,2]` to `ans`
⬅️ Backtrack (pop last `2`) → `subans=[1,2]`

---

##### ▶▶ Exclude duplicate 2s

```cpp
idx = 3 (skip 2 at index 2)
Call 4: i=3, subans=[1,2]
```

✅ Base → add `[1,2]`
⬅️ Backtrack → `subans=[1]`

---

#### ▶ Back at `Call 1`, exclude 2

* skip to `idx=3`
  → `Call 5: i=3, subans=[1]`
  ✅ Base → add `[1]`
  ⬅️ Backtrack → `subans=[]`

---

### Back at `Call 0`, exclude 1

* skip to `idx=1` → `Call 6: i=1, subans=[]`

---

#### ▶ `Call 6: i=1, subans=[]`

* include `2` → `subans=[2]`

---

##### ▶▶ `Call 7: i=2, subans=[2]`

* include `2` → `subans=[2,2]`

---

###### ▶▶▶ `Call 8: i=3, subans=[2,2]`

✅ Base → add `[2,2]`
⬅️ Backtrack → `subans=[2]`

---

##### ▶▶ Exclude duplicate 2s

* skip to `idx=3`
  → `Call 9: i=3, subans=[2]`
  ✅ Base → add `[2]`
  ⬅️ Backtrack → `subans=[]`

---

#### ▶ Back at `Call 6`, exclude 2

* skip to `idx=3`
  → `Call 10: i=3, subans=[]`
  ✅ Base → add `[]`

---

## ✅ Final `ans`:

```
[
  [1,2,2],
  [1,2],
  [1],
  [2,2],
  [2],
  []
]
```

---

## 🔄 i Changing Summary

| Call | i | subans   | Action    |
| ---- | - | -------- | --------- |
| 0    | 0 | \[]      | include 1 |
| 1    | 1 | \[1]     | include 2 |
| 2    | 2 | \[1,2]   | include 2 |
| 3    | 3 | \[1,2,2] | ✅ base    |
| 4    | 3 | \[1,2]   | ✅ base    |
| 5    | 3 | \[1]     | ✅ base    |
| 6    | 1 | \[]      | include 2 |
| 7    | 2 | \[2]     | include 2 |
| 8    | 3 | \[2,2]   | ✅ base    |
| 9    | 3 | \[2]     | ✅ base    |
| 10   | 3 | \[]      | ✅ base    |

---

## ✅ Final Notes:

* You correctly:

  * Used recursion and backtracking
  * Skipped duplicate elements by advancing `i`
* Your code avoids duplicate subsets thanks to:

  ```cpp
  while(idx < nums.size() && nums[idx] == nums[idx - 1]) idx++;
  ```


✅ Input: nums = [1, 2, 2] (sorted)



Call 0: i = 0, subans = []
│
├── include 1 → subans = [1]
│   └── Call 1: i = 1, subans = [1]
│       │
│       ├── include 2 → subans = [1,2]
│       │   └── Call 2: i = 2, subans = [1,2]
│       │       ├── include 2 → subans = [1,2,2]
│       │       │   └── Call 3: i = 3 → ✅ base → add [1,2,2]
│       │       └── exclude 2
│       │           └── skip duplicates → i = 3
│       │               └── Call 4: i = 3, subans = [1,2] → ✅ base → add [1,2]
│       │
│       └── exclude 2 (from i = 1)
│           └── skip duplicates → i = 3
│               └── Call 5: i = 3, subans = [1] → ✅ base → add [1]
│
└── exclude 1
    └── skip duplicates → i = 1
        └── Call 6: i = 1, subans = []
            │
            ├── include 2 → subans = [2]
            │   └── Call 7: i = 2, subans = [2]
            │       ├── include 2 → subans = [2,2]
            │       │   └── Call 8: i = 3 → ✅ base → add [2,2]
            │       └── exclude 2
            │           └── skip duplicates → i = 3
            │               └── Call 9: i = 3, subans = [2] → ✅ base → add [2]
            │
            └── exclude 2 (from i = 1)
                └── skip duplicates → i = 3
                    └── Call 10: i = 3, subans = [] → ✅ base → add []




<img src="ChatGPT Image Jul 15, 2025, 08_01_30 PM.png" width="1100" height="400">







# 🧾 Problem: Leetcode 34 — Find First and Last Position of Element in Sorted Array




class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int>ans;
        
        firstocc(nums,target,0,ans);
        int ansreturned=last(nums,target,0,ans);
        ans.push_back(ansreturned);
        return ans;
    }
    void firstocc(vector<int>& nums, int target,int st,vector<int>& ans){
        if(st==nums.size()){ans.push_back(-1);return;}
        if(nums[st]==target){
           ans.push_back(st);
           return;
        } 
        firstocc(nums,target,st+1,ans);
    }
    int last(vector<int>& nums, int target,int st,vector<int>& ans){
        if(st==nums.size()){return -1;}
        int idx=last(nums,target,st+1,ans);
        if(idx==-1){
            if(nums[st]==target){
                return st;
            }
        }
        return idx;
    }
};

### 🧾 **Your Code Summary**

```cpp
vector<int> searchRange(vector<int>& nums, int target) {
    vector<int> ans;
    firstocc(nums, target, 0, ans);
    int ansreturned = last(nums, target, 0, ans);
    ans.push_back(ansreturned);
    return ans;
}
```

#### `firstocc(...)` – finds the first occurrence (pushes to `ans`)

#### `last(...)` – recursively finds the last occurrence and returns it

---

### 🧪 Example Input

```cpp
nums = {5, 7, 7, 8, 8, 10}, target = 8
```

### ✅ Expected Output: `[3, 4]`

---

### 🔍 Step-by-Step Call Stack Trace

Let’s go step by step for both `firstocc` and `last`.

---

### 🔁 1. `firstocc(nums, 8, 0, ans)`

Initial `ans = {}`

```
st = 0 → nums[0] = 5 ≠ 8 → recurse
st = 1 → nums[1] = 7 ≠ 8 → recurse
st = 2 → nums[2] = 7 ≠ 8 → recurse
st = 3 → nums[3] = 8 == 8 → ans.push_back(3); return
```
Call 1: st = 0, nums[0] = 4 → no match → recursive call st = 1

Call 2: st = 1, nums[1] = 3 → no match → recursive call st = 2

Call 3: st = 2, nums[2] = 7 → match!
→ ans.push_back(2)
→ return — now backtracks to previous call (call 2), but nothing more is done there

Each prior call now finishes with no action after the recursive call.

#### 🔁 Call Stack at that point:

```
firstocc(0) → firstocc(1) → firstocc(2) → firstocc(3) → FOUND → push 3
```

Now: `ans = [3]`

---

### 🔁 2. `last(nums, 8, 0, ans)`

You call `last()` from `st = 0`, and it goes all the way to the end (right to left logic):

#### Recursive calls:

```
st = 0 → call last(1)
st = 1 → call last(2)
st = 2 → call last(3)
st = 3 → call last(4)
st = 4 → call last(5)
st = 5 → call last(6)
st = 6 → st == nums.size() → return -1
```

#### Then unwind:

```
st = 5 → nums[5] = 10 ≠ 8 → idx = -1 → return -1
st = 4 → nums[4] = 8 == target → idx = -1 → return 4 ✅
st = 3 → idx = 4 → return 4
st = 2 → idx = 4 → return 4
st = 1 → idx = 4 → return 4
st = 0 → idx = 4 → return 4
```

---

### ✅ Final `ans`

Initially:

```cpp
ans = [3]
```

Then:

```cpp
ansreturned = 4
ans.push_back(4)
```

---

### 🎯 Final Output:

```
ans = [3, 4]
```

---

### 📌 Summary of Call Stack Flow

#### `firstocc` (left to right):

```
firstocc(0)
 → firstocc(1)
   → firstocc(2)
     → firstocc(3)  ✅ FOUND → push 3
```
firstocc(nums, 7, 0, ans)
  ↳ firstocc(nums, 7, 1, ans)
     ↳ firstocc(nums, 7, 2, ans)
        ↳ nums[2] == 7 → ans.push_back(2); return
     ↳ return
  ↳ return


#### `last` (right to left):

```
last(0)
 → last(1)
   → ...
     → last(6) → return -1
     → last(5) → -1
     → last(4) ✅ FOUND → return 4
 ← unwind up with idx = 4
```

---



class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> ans;
        int firstIndex = firstocc(nums, target, 0);
        int lastIndex = last(nums, target, 0);
        ans.push_back(firstIndex);
        ans.push_back(lastIndex);
        return ans;
    }

    int firstocc(vector<int>& nums, int target, int st) {
        if (st == nums.size()) return -1;
        if (nums[st] == target) return st;
        return firstocc(nums, target, st + 1);
    }

    int last(vector<int>& nums, int target, int st) {
        if (st == nums.size()) return -1;
        int idx = last(nums, target, st + 1);
        if (idx == -1 && nums[st] == target) return st;
        return idx;
    }
};
Call: firstocc(nums, 8, 0)
 → nums[0] = 5 ≠ 8 → recurse
  → firstocc(nums, 8, 1)
    → nums[1] = 7 ≠ 8 → recurse
     → firstocc(nums, 8, 2)
       → nums[2] = 7 ≠ 8 → recurse
        → firstocc(nums, 8, 3)
          → nums[3] = 8 == 8 ✅ found → return 3
← return 3 to firstocc(2)
← return 3 to firstocc(1)
← return 3 to firstocc(0)


Call: last(nums, 8, 0)
 → call last(nums, 8, 1)
  → call last(nums, 8, 2)
   → call last(nums, 8, 3)
    → call last(nums, 8, 4)
     → call last(nums, 8, 5)
      → call last(nums, 8, 6)
        → st == nums.size() → return -1
st = 5 → nums[5] = 10 ≠ 8 → idx = -1 → return -1
st = 4 → nums[4] = 8 == target → idx == -1 → return 4 ✅
st = 3 → idx != -1 → return 4
st = 2 → idx != -1 → return 4
st = 1 → idx != -1 → return 4
st = 0 → idx != -1 → return 4



# 1st occurence in a string

class Solution {
public:
    int strStr(string haystack, string needle) {
        int st = 0;
        int n = needle.length();
        return ans(haystack, needle, st, n);
    }

    int ans(string haystack, string needle, int st, int n) {
        // base case: if remaining haystack is shorter than needle
        if (st > haystack.length() - n)
            return -1;

        // match found
        if (haystack.substr(st, n) == needle)
            return st;

        // recursive call
        return ans(haystack, needle, st + 1, n);
    }
};



class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;  // Handle INT_MIN
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return fastPow(x, N);
    }

    double fastPow(double x, long long n) {
        if (n == 0) return 1.0;

        double half = fastPow(x, n / 2);
        double halfsq = half * half;

        if (n % 2 == 0)
            return halfsq;
        else
            return x * halfsq;
    }
};
Sure! Let's go through your code **step by step** — it's a clean and efficient **recursive implementation of `pow(x, n)` using Fast Exponentiation (a.k.a. Exponentiation by Squaring)**.

---

### 🧠 Goal:

Implement `pow(x, n)` that returns $x^n$ for any `x` (double) and `n` (int), including negative exponents and large powers.

---

## 🔍 Code Explanation

```cpp
double myPow(double x, int n) {
    long long N = n;  // ✅ convert n to long long to handle edge cases like INT_MIN
```

* **Why long long?**

  * `n` can be `INT_MIN = -2,147,483,648`
  * `-n` overflows because `+2,147,483,648` can't fit in `int`
  * `long long` avoids overflow

---

```cpp
    if (N < 0) {
        x = 1 / x;      // Convert x^(-n) to (1/x)^n
        N = -N;
    }
```

* **Handling negative exponents:**

  * $x^{-n} = \frac{1}{x^n}$
  * So flip `x → 1/x`, and use positive exponent

---

```cpp
    return fastPow(x, N); // 🔁 Call helper function to compute x^N
```

* Calls the optimized recursive function that works in **O(log n)** time

---

## 🔁 fastPow(x, n) — Recursive Fast Exponentiation

```cpp
double fastPow(double x, long long n) {
    if (n == 0) return 1.0;
```

* **Base case:**

  * Anything to the power of 0 is 1

---

```cpp
    double half = fastPow(x, n / 2);
    double halfsq = half * half;
```

* **Recursive idea:**

  * Divide the problem:
    $x^n = x^{n/2} \times x^{n/2}$
    So compute it once → reuse

---

```cpp
    if (n % 2 == 0)
        return halfsq;
    else
        return x * halfsq;
```

* If `n` is even:
  $x^n = (x^{n/2})^2$
* If `n` is odd:
  $x^n = (x^{n/2})^2 \times x$

---

## 🧪 Example: `myPow(2.0, 5)`

Breaks down as:

```
myPow(2.0, 5)
→ fastPow(2.0, 5)
   → fastPow(2.0, 2)
      → fastPow(2.0, 1)
         → fastPow(2.0, 0) = 1
         → half = 1, halfsq = 1
         → odd → return 2 * 1 = 2
      → half = 2, halfsq = 4
      → even → return 4
   → half = 4, halfsq = 16
   → odd → return 2 * 16 = 32
```

✅ Final output: `32.0`

---

## 🕒 Time and Space Complexity

| Operation | Complexity                                    |
| --------- | --------------------------------------------- |
| Time      | **O(log n)** — divide exponent by 2 each time |
| Space     | **O(log n)** — due to recursive stack calls   |

---

## ✅ Handles All Cases:

| Case           | Handled? | Explanation                        |
| -------------- | -------- | ---------------------------------- |
| Positive `n`   | ✅        | Recursive divide                   |
| Negative `n`   | ✅        | Inverts `x` to `1/x`               |
| `n == 0`       | ✅        | Base case                          |
| `n == INT_MIN` | ✅        | Prevented overflow via `long long` |

---








# 🧩 Problem:
You are tiling a 2×n board using 2×1 dominoes.
Each tile can be placed:

Vertically (takes 1 column)

Horizontally (takes 2 columns)


int tileWays(int n) {
    if (n == 0 || n == 1)
        return 1;

    return tileWays(n - 1) + tileWays(n - 2);
}


tileWays(4)
├── tileWays(3)
│   ├── tileWays(2)
│   │   ├── tileWays(1) → returns 1
│   │   └── tileWays(0) → returns 1
│   │        → tileWays(2) = 1 + 1 = 2
│   └── tileWays(1) → returns 1
│        → tileWays(3) = 2 + 1 = 3
└── tileWays(2)
    ├── tileWays(1) → returns 1
    └── tileWays(0) → returns 1
         → tileWays(2) = 1 + 1 = 2
→ tileWays(4) = 3 + 2 = 5





That's an **excellent question** — dry run helps us confirm the output, but you're asking the **real key**:

> *How do I even think like this at the start?*

---

## 🧠 How to Think About a Tiling Problem Initially (Strategy)

When you first see a problem like:

> “Count the number of ways to tile a 2×n board using 2×1 tiles.”

Ask yourself these guiding questions:

---

### ✅ 1. **What are the tile options?**

* Only 2×1 tiles.
* Can be placed **vertically (takes 1 column)** or **horizontally (takes 2 columns)**.

---

### ✅ 2. **What happens after placing a tile?**

Think in **smaller subproblems**:

🔸 If I place **1 vertical tile** at the start:

* It takes **1 column**.
* I'm left with a **2×(n−1)** board.
  → So, this is just another tiling problem of size `(n-1)`

🔸 If I place **2 horizontal tiles** (stacked):

* It takes **2 columns**.
* I'm left with a **2×(n−2)** board.
  → Now solve for `(n-2)`

So,

```
f(n) = f(n−1) + f(n−2)
```

This is where your **recurrence** starts.

---

### ✅ 3. **What are the base cases?**

Start thinking with **smallest values of n**:

* `n = 0`: 1 way (do nothing) ✅
* `n = 1`: Only 1 vertical tile fits ⇒ 1 way ✅
* `n = 2`: Either two verticals or two horizontals ⇒ 2 ways ✅

---

### ✅ 4. **Is the problem self-similar?**

Yes! You’re solving **smaller versions of the same problem** after each tile placement.

So you can use **recursion**.

---

## 🔁 Mental Picture (without coding yet):

When `n = 4`, you can:

```
1️⃣ Place vertical → left with 2×3 → f(3)
2️⃣ Place 2 horizontal → left with 2×2 → f(2)
So: f(4) = f(3) + f(2)
```

Now to compute `f(3)`, do the same:

```
f(3) = f(2) + f(1)
```

and so on...

---

## 🎯 Final Thought: How to Recognize This Pattern?

### 🔹 Common clue: "**count number of ways**" + limited tiles

→ Think in **recursion** + **breaking into smaller boards**

### 🔹 When each decision reduces the problem size

→ This is a sign that a **recursive solution with recurrence** will work.

---

## 🧩 Summary

| Step | What to Ask Yourself                                     |
| ---- | -------------------------------------------------------- |
| 1️⃣  | What are the valid tile placements?                      |
| 2️⃣  | How does each placement reduce the board?                |
| 3️⃣  | What does the leftover board look like? (f(n-1), f(n-2)) |
| 4️⃣  | What are the base cases?                                 |
| 5️⃣  | Is this a pattern I can write as recurrence?             |

---

Perfect! Let's now convert the **recursive tiling solution** into a **Dynamic Programming (DP)** version.

---

## 🔁 Why Use DP?

Your recursive function:

```cpp
int tileWays(int n) {
    if (n == 0 || n == 1)
        return 1;
    return tileWays(n - 1) + tileWays(n - 2);
}
```

🔴 **Problem**: It recomputes the same subproblems again and again.
🔁 Example:

* `tileWays(4)` calls `tileWays(3)` and `tileWays(2)`
* `tileWays(3)` again calls `tileWays(2)` and `tileWays(1)`

This results in **exponential time** ⏱️

---

## ✅ Use Dynamic Programming

We use **bottom-up tabulation** to avoid repeated calls.

---

### 🔹 DP Approach (C++)

```cpp
#include <iostream>
using namespace std;

int tileWays(int n) {
    if (n == 0 || n == 1)
        return 1;

    // Create dp array
    int dp[n + 1];
    dp[0] = 1; // base case: empty board
    dp[1] = 1; // base case: one vertical tile

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]; // recurrence
    }

    return dp[n];
}

int main() {
    int n;
    cout << "Enter N: ";
    cin >> n;
    cout << "Number of ways to tile 2x" << n << " board: " << tileWays(n);
    return 0;
}
```
We use **Memoization** to avoid repeated calls.
class Solution {
  public:
    int numberOfWays(int n) {
        vector<int> dp(n + 1, -1);  // dp[0..n]
        return solve(n, dp);
    }

    int solve(int n, vector<int>& dp) {
        if (n == 0 || n == 1)
            return 1;

        if (dp[n] != -1)
            return dp[n];

        return dp[n] = solve(n - 1, dp) + solve(n - 2, dp);
    }
};

---

### 🔹 Dry Run for `n = 4`

| `i` | `dp[i] = dp[i-1] + dp[i-2]` | Value   |
| --- | --------------------------- | ------- |
| 0   | base case                   | 1       |
| 1   | base case                   | 1       |
| 2   | 1 + 1                       | 2       |
| 3   | 2 + 1                       | 3       |
| 4   | 3 + 2                       | 5       |

✅ Final answer: `dp[4] = 5`

---

## 🔹 Space Optimization (Fibonacci-style)

You only need the **last 2 values**, so instead of storing all `dp[i]`, use 2 variables:

```cpp
int tileWays(int n) {
    if (n == 0 || n == 1)
        return 1;

    int a = 1, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

🟢 Time: O(n)
🟢 Space: O(1)

---

## 🧩 Summary

| Method         | Time      | Space     | Notes                                   |
| -------------- | --------- | --------- | --------------------------------------- |
| Recursion      | O(2ⁿ)     | O(n)      | Repeats subproblems ⛔️                  |
| Rec + Memo     | O(n)      | O(n)      | Efficient, but more code                |
| DP Tabulation  | O(n)      | O(n)      | Iterative and fast ✅                    |
| Space Opt DP   | O(n)      | O(1)      | Fastest & simplest for Fibonacci-type ✅ |

---

Would you like me to show this in Python or apply this DP to a different tiling variation (e.g. M×N board with 1×M tiles)?









# remove duplicated from a string

// User function template for C++
class Solution {
  public:
    string removeDuplicates(string &s) {
        // code here
    //     int arrc[26]={0};
    //      int arrs[26]={0};
    //      string ans="";
    //     for(int i=0;i<s.length();i++){
    //         if(isupper(s[i])){
    //             if(arrc[s[i]-'A']==0){
    //                  ans+=s[i];
    //             }
               
    //             arrc[s[i]-'A']++;
                
    //         }
    //         else{
    //             if(arrs[s[i]-'a']==0){
    //                  ans+=s[i];
    //             }
    //             arrs[s[i]-'a']++;
    //         }
    //     }
    //     return ans;
    // }
    
    bool vis[256]={false};
    return ans(s,vis,0);
    }
    string ans(string &s,bool vis[],int i){
        if(i==s.length()){return "";}
        char ch=s[i];
        if(!vis[ch]){
            vis[ch]=true;
            return ch+ans(s,vis,i+1);
        }
        else{
            return ans(s,vis,i+1);
        }
    }
};

Let's do a **step-by-step call execution (dry run)** for your **corrected recursive function** to remove duplicates from a string.

---

## ✅ Function Recap (Corrected)

```cpp
class Solution {
public:
    string removeDuplicates(string &s) {
        bool visited[256] = {false}; // track visited chars by ASCII
        return helper(s, 0, visited);
    }

private:
    string helper(string &s, int idx, bool visited[]) {
        if (idx == s.length()) return "";

        char ch = s[idx];
        if (!visited[ch]) {
            visited[ch] = true;
            return ch + helper(s, idx + 1, visited);
        } else {
            return helper(s, idx + 1, visited);
        }
    }
};
```

---

## 🧪 Input: `"abac"`

Let's walk through the recursive calls:

---

### Initial State

* `s = "abac"`
* `visited[256]` = all false
* Initial call: `helper(s, 0, visited)`

---

### 🔁 Call Execution Tree

```
helper(s, 0)
  ch = 'a', visited['a'] = false
  → mark visited['a'] = true
  → return 'a' + helper(s, 1)

    helper(s, 1)
    ch = 'b', visited['b'] = false
    → mark visited['b'] = true
    → return 'b' + helper(s, 2)

      helper(s, 2)
      ch = 'a', visited['a'] = true (already visited)
      → return helper(s, 3)

        helper(s, 3)
        ch = 'c', visited['c'] = false
        → mark visited['c'] = true
        → return 'c' + helper(s, 4)

          helper(s, 4)
          → idx == s.length() → return ""
```

---

### 🔁 Return Stack Unwinds:

```
helper(4) → ""
helper(3) → 'c' + "" = "c"
helper(2) → "c"
helper(1) → 'b' + "c" = "bc"
helper(0) → 'a' + "bc" = "abc"
```

---

## ✅ Final Answer: `"abc"`

Duplicates (`'a'` repeated) are skipped on second appearance.

---

## 🧠 Summary Table

| Call         | Char  | Visited?  | Action                  | Returns   |
| ------------ | ----- | --------- | ----------------------- | --------- |
| helper(0)    | 'a'   | No        | Add + recurse           | 'a' + ... |
| helper(1)    | 'b'   | No        | Add + recurse           | 'b' + ... |
| helper(2)    | 'a'   | Yes       | Skip + recurse          | "c"       |
| helper(3)    | 'c'   | No        | Add + recurse           | 'c' + ""  |
| helper(4)    | —     | —         | End of string           | ""        |

---

Let me know if you want:
Great question! Let’s break down **how to think and approach a problem like “Remove Duplicates from String using Recursion.”**

---

## 🎯 Problem Statement

> Given a string `s`, return a new string with **only the first occurrence** of each character (keep the order), using **recursion**.

---

## 🧠 Step-by-Step Thinking Approach

### 🔹 1. **Understand the core idea**

* You need to **build a new string** character by character.
* Only include a character **if it hasn't appeared before**.
* You can track "already seen" characters using a `visited[]` array or a `set`.

---

### 🔹 2. **Break into subproblems**

Ask:

> “What’s the smallest version of this problem?”

* For an empty string → result is empty.
* For 1 character → either add it or skip it.

So we can think recursively:

```
removeDuplicates("abac")
= 'a' + removeDuplicates("bac")    (if 'a' not visited)
= skip + removeDuplicates("bac")   (if visited)
```

---

### 🔹 3. **Recursive Pattern**

* At each step, look at `s[idx]`:

  * If `s[idx]` is **not visited**, include it + recurse for rest
  * Else, just recurse for the rest

This matches the standard recursive pattern:

```
f(s, idx):
    if idx == s.length: return ""
    if s[idx] not visited:
        mark visited
        return s[idx] + f(s, idx+1)
    else:
        return f(s, idx+1)
```

---

### 🔹 4. **Why Recursion Works**

Recursion is good here because:

* You can **process one character at a time**
* You naturally move from left to right
* The recursion stack helps you **build the answer in order**

---

## ✅ Final Checklist (When You Think of Recursion)

| Question                       | Ask Yourself                                        |
| ------------------------------ | --------------------------------------------------- |
| What is the base case?         | When to stop recursion (e.g. end of string)         |
| What is the recursive call?    | What subproblem looks like (next character)         |
| What do I return?              | The correct value to pass back up (string building) |
| How to track progress?         | Use `visited[]` or `unordered_set<char>`            |

---

## ✨ Mnemonic to Remember

> "🎯 See one, ✅ Keep it. 👀 Seen again? ❌ Skip it."

---

## 🧩 Summary of Your Approach:

1. Understand: You need to keep first occurrence only.
2. Think: “Process left to right, 1 char at a time.”
3. Plan:

   * Base case: `idx == s.length()` → return `""`
   * Track visited characters
   * If current char is new → keep it and recurse
   * Else → skip and recurse
4. Code it recursively with return values.

---


Here's a complete, structured **handwritten-style notes guide** for the **N-Queens Problem**, including:

1. ✅ Problem statement
2. ✅ Backtracking approach
3. ✅ Your common mistakes
4. ✅ Correct algorithm
5. ✅ Diagram + dry run (optional on request)
6. ✅ Optimization idea

---

## 📘 **N-Queens Problem — Notes**

---

### 🧩 **Problem Statement**

> Place N queens on an **N×N chessboard** so that **no two queens attack each other**.
> Return **all distinct valid configurations**.

✔ Each queen must be placed:

* In a **unique row**
* In a **unique column**
* No two queens can be on the **same diagonal**

---

### 💡 **Approach: Backtracking**

We place 1 queen per row and **recursively try all columns**, while checking if the position is **safe**.

#### ✅ Steps:

1. Start from row `0`
2. Try placing queen in every column of that row
3. If safe → place it and recurse to next row
4. If you reach `row == n` → you found a valid configuration → store it
5. Backtrack (undo last queen and try next column)

---

### 🔁 **Backtracking Tree for N = 4**

```
Row 0: Try Q in col 0,1,2,3
 ↳ Row 1: Try valid cols based on where Q in row 0 is
   ↳ Continue till row == n
   ↳ If blocked → backtrack
```

---

### ✅ **Data Structures Used**

```cpp
vector<string> board(n, string(n, '.'));
vector<vector<string>> ans;
```

✔ `board[i][j] = 'Q'` for queen
✔ Use `vector<string>` as 2D board representation
✔ Store all valid boards in `ans`

---

## ⚠️ Mistakes You Made (Common for Beginners)

| ❌ Mistake                                                | ✅ Fix                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `vector<vector<string>> ans(n, vector<string>(n, "."));` | Should be `vector<vector<string>> ans;` — store boards, not initialized strings |
| `for(int j=0; j<n; i++)`                                 | Should be `j++`                                                                 |
| Not pushing board into `ans` when `row == n`             | Add `ans.push_back(board);` in base case                                        |
| Wrong diagonal checks in `isSafe()`                      | Use `i >= 0 && j >= 0` and check full diagonals                                 |
| Used `vector<vector<string>>` as board                   | Use `vector<string>` instead — cleaner and simpler                              |
| Column check had `for (i = 0; i < col)`                  | Should be `i < row` — we only check *above*, not current or below               |

---

## ✅ Final Correct Code Summary

```cpp
solve(row, n, board, ans) {
  if (row == n) → store board
  for (int col = 0; col < n; col++) {
    if (isSafe) {
      place Q
      solve(row + 1)
      remove Q (backtrack)
    }
  }
}
```

---

### 🔐 `isSafe(row, col)` Function

* Check ↑ column
* Check upper-left diagonal ↖️
* Check upper-right diagonal ↗️

```cpp
for(i=0; i<row) if(board[i][col] == 'Q') return false;
for(i=row-1, j=col-1; i>=0 && j>=0) if(board[i][j]=='Q') return false;
for(i=row-1, j=col+1; i>=0 && j<n) if(board[i][j]=='Q') return false;
```

---

### 🖼️ Output Format

Each solution = `vector<string>`
Each string = row with only 1 `'Q'`

For `n=4`, output example:

```cpp
[
 [".Q..",
  "...Q",
  "Q...",
  "..Q."],
 
 ["..Q.",
  "Q...",
  "...Q",
  ".Q.."]
]
```

---

### 🧠 Optional Optimization (Advanced)

To speed up `isSafe()` check:

Use 3 hash sets:

```cpp
unordered_set<int> cols, diag1, diag2;
```

* cols → used columns
* diag1 → row - col (↖ diagonal)
* diag2 → row + col (↗ diagonal)

Check in O(1) instead of scanning all diagonals.

---

### ✅ Conclusion

* Use **recursive backtracking** with 1 queen per row.
* Track safe columns and diagonals.
* Use `vector<string>` for clean 2D board representation.
* Backtrack if unsafe.
* Watch out for **indexing errors** and **skipping row 0**.

---

Would you like a **dry run with diagram** for `n = 4`?
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;                        // Stores all valid boards
        vector<string> board(n, string(n, '.'));           // n x n empty board
        solve(0, n, board, ans);
        return ans;
    }

    void solve(int row, int n, vector<string>& board, vector<vector<string>>& ans) {
        if (row == n) {
            ans.push_back(board);                          // Valid configuration
            return;
        }

        for (int col = 0; col < n; col++) {
            if (isSafe(row, col, board, n)) {
                board[row][col] = 'Q';                     // Place queen
                solve(row + 1, n, board, ans);             // Next row
                board[row][col] = '.';                     // Backtrack
            }
        }
    }

    bool isSafe(int row, int col, vector<string>& board, int n) {
        // Check column above
        for (int i = 0; i < row; i++)
            if (board[i][col] == 'Q') return false;

        // Check upper-left diagonal
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 'Q') return false;

        // Check upper-right diagonal
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
            if (board[i][j] == 'Q') return false;

        return true;
    }
};
Great question!

### 👇 Let's break it down:

```cpp
vector<string> board(n, string(n, '.'));
```

This line is **not 2D in the raw data type**, but it **represents a 2D board** visually.

---

### ✅ What it really means:

* `string(n, '.')` creates a string like `"...."` (length `n`, filled with `'.'`)
* `vector<string>(n, ...)` creates a vector of `n` such strings

So for `n = 4`, this gives:

```cpp
board = {
    "....",
    "....",
    "....",
    "...."
};
```

Each string = 1 **row**, and each character in the string = 1 **column cell**.

So even though the type is `vector<string>` (1D vector), the structure behaves like a 2D grid:

* Accessing `board[row][col]` gives the cell at that position.
* Easy to print and understand as a chess board.

---

### 🔁 Equivalent 2D Representation:

This:

```cpp
vector<string> board(n, string(n, '.'));
```

Behaves like this:

```cpp
vector<vector<char>> board(n, vector<char>(n, '.'));
```

But using `vector<string>` is more **compact and convenient** in problems like N-Queens, especially when storing results like:

```cpp
vector<vector<string>> ans;
```

---

### ✅ Summary:

* `vector<string>` = 1D vector of strings
* But each string = 1 row → so **visually and logically it's a 2D board**
* You can still use `board[row][col]` syntax ✅



Absolutely! Here's your **final handwritten-style notes** for the **Unique Paths problem**, including:

---

## 📘 **Unique Paths – Final Notes (Leetcode 62)**

---

### 🧩 **Problem Statement**

> You are given a `m x n` grid.
> Starting from top-left `(0,0)` to bottom-right `(m-1,n-1)`,
> Count the number of **unique paths** to reach the destination.
> You can **only move**:

* ➡️ Right
* ⬇️ Down

---

### ✅ **Example**

For `m = 3`, `n = 2`:

```
Start: (0,0)       End: (2,1)

Grid:
[0,0] [0,1]
[1,0] [1,1]
[2,0] [2,1]

Paths: 3
→→↓↓
→↓→↓
↓→→
```

---

### 💡 **Approach 1: Recursive (Brute Force)**

#### 🔁 Recursive Logic

From (row, col), move:

* ⬇️ `dfs(row+1, col)`
* ➡️ `dfs(row, col+1)`

```cpp
int dfs(int row, int col, int m, int n) {
    if(row == m-1 && col == n-1) return 1; // Reached destination
    if(row >= m || col >= n) return 0;     // Out of bounds

    return dfs(row+1, col, m, n) + dfs(row, col+1, m, n);
}
```

#### ⛔ Time: `O(2^(m+n))` — exponential

No memoization = lots of repeated calls

---

### 🚫 **Your Mistakes** (Common Errors)

| ❌ Wrong Code               | ✅ Correct Code                                  |            |               |   |             |
| -------------------------- | ----------------------------------------------- | ---------- | ------------- | - | ----------- |
| `if(row == m && col == n)` | `if(row == m-1 && col == n-1)`                  |            |               |   |             |
| \`if(row > m               |                                                 | col > m)\` | \`if(row >= m |   | col >= n)\` |
| Uninitialized `dp`         | `vector<vector<int>> dp(m, vector<int>(n, -1))` |            |               |   |             |

---

### ✅ **Approach 2: Top-down DP (Memoization)**

Store results to avoid recomputation.

```cpp
int dfs(int row, int col, int m, int n, vector<vector<int>>& dp) {
    if(row == m-1 && col == n-1) return 1;
    if(row >= m || col >= n) return 0;

    if(dp[row][col] != -1) return dp[row][col];

    return dp[row][col] = dfs(row+1, col, m, n, dp) + dfs(row, col+1, m, n, dp);
}
```

#### ✅ Full Driver Code:

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return dfs(0, 0, m, n, dp);
    }
};
```

#### 📈 Time: `O(m * n)`

#### 📦 Space: `O(m * n)` (dp table + recursion stack)

---

### 📐 Call Stack Dry Run (`m=2, n=2`):

```
dfs(0,0)
 ├── dfs(1,0)
 │     ├── dfs(2,0) → 0
 │     └── dfs(1,1) → 1
 │     → 1
 └── dfs(0,1)
       ├── dfs(1,1) → 1
       └── dfs(0,2) → 0
       → 1

Total = 1 + 1 = 2
```

---

### ⚡ **Approach 3: Combinatorics (Most Efficient)**

Number of steps = `m-1` downs + `n-1` rights = `m+n−2` total steps
You choose `m-1` down moves:

> `C(m+n−2, m−1) = (m+n−2)! / ((m−1)! * (n−1)!)`

```cpp
int uniquePaths(int m, int n) {
    return comb(m+n-2, m-1); // OR comb(m+n-2, n-1)
}
```

#### 🧠 Time: `O(min(m, n))`

#### 🧮 Space: `O(1)` using iterative factorial

---

### ✅ Final Summary Table

| Method        | Time        | Space    | Suitable For        |
| ------------- | ----------- | -------- | ------------------- |
| Recursion     | Exponential | O(m+n)   | Understanding logic |
| DP (Memo)     | O(m × n)    | O(m × n) | Medium grids        |
| Tabulation    | O(m × n)    | O(m × n) | Efficient & easy    |
| Combinatorics | O(min(m,n)) | O(1)     | Very large grids    |

---

Let’s **break down clearly** how we calculate the **Time Complexity** of this function step by step:

---

### ✅ Function Recap:

```cpp
int dfs(int row, int col, int m, int n, vector<vector<int>>& dp) {
    if(row == m-1 && col == n-1) return 1;
    if(row >= m || col >= n) return 0;

    if(dp[row][col] != -1) return dp[row][col];

    return dp[row][col] = dfs(row+1, col, m, n, dp) + dfs(row, col+1, m, n, dp);
}
```

---

### 🧠 What Is Happening?

This is a **top-down recursive function with memoization** that calculates the number of unique paths from the top-left to bottom-right of an `m x n` grid, moving only **right** or **down**.

---

### 🔁 Without Memoization

If memoization (`dp`) was not used:

* Every call makes **2 more calls** (down and right), forming a **binary recursion tree**.
* Number of total calls = exponential (worst case: $2^{(m + n)}$) — **TLE**!

---

### ✅ With Memoization

Because of memoization:

* Every **(row, col)** pair is computed **only once**.
* We **store** the result of each subproblem in `dp[row][col]` after first computation.
* So next time we need the same value → we return **in constant time**.

---

### 🎯 Total Unique Calls = Number of Unique (row, col) States

Since the grid is `m x n`, and we start at `(0, 0)` and move either:

* **Down (row+1)** OR
* **Right (col+1)**

The **maximum number of unique (row, col)** pairs that we will ever compute is:

$$
\boxed{m \times n}
$$

---

### 📌 Final Time Complexity:

* Each of the $m \times n$ subproblems is computed only once.
* Each call does **O(1)** work (some checks + 2 calls or memo return).

So:

$$
\boxed{\text{Time Complexity} = \mathcal{O}(m \times n)}
$$

---

### 📌 Final Space Complexity:

* **DP Table**: `dp[m][n]` → $O(m \times n)$
* **Call stack**: Depth up to $m + n$ → $O(m + n)$

So total space:

$$
\boxed{\text{Space Complexity} = \mathcal{O}(m \times n)}
$$

---

### ✅ Key Concept:

* If a DP (memoized) recursion solves only **unique states once**, then **Time Complexity = number of unique states**.

---



Here's a complete guide to solving **Sudoku using Backtracking in C++**, including:

1. ✅ **Approach**
2. 🧠 **Code**
3. 🔄 **Call Stack Execution**
4. 💡 **Mistakes to Avoid**
5. ⏱️ **Time & Space Complexity**
6. 📌 **Key Notes**

---

## ✅ 1. Sudoku Solver – Backtracking Approach

### 🔹 Problem:

You are given a partially filled 9×9 Sudoku board. Fill it completely such that:

* Each **row**, **column**, and **3x3 box** has digits from **1 to 9**, **without repetition**.

---

## 🧠 2. Approach:

1. Traverse the board **cell by cell**.
2. When an **empty cell `'.'`** is found:

   * Try placing digits `'1'` to `'9'`.
   * For each digit, check if placing it is **valid** (no clash in row/col/box).
   * If valid, place it and **recurse** for the next cell.
   * If it fails later, **backtrack** by removing the digit and trying the next one.
3. Continue until the entire board is filled.

---

## 🔢 3. C++ Code:

```cpp
class Solution {
public:
    bool isValid(vector<vector<char>>& board, int row, int col, char ch) {
        for(int i = 0; i < 9; ++i) {
            if(board[row][i] == ch) return false; // Row
            if(board[i][col] == ch) return false; // Column
            if(board[3*(row/3) + i/3][3*(col/3) + i%3] == ch) return false; // 3x3 box
        }
        return true;
    }

    bool solve(vector<vector<char>>& board) {
        for(int row = 0; row < 9; ++row) {
            for(int col = 0; col < 9; ++col) {
                if(board[row][col] == '.') {
                    for(char ch = '1'; ch <= '9'; ++ch) {
                        if(isValid(board, row, col, ch)) {
                            board[row][col] = ch;

                            if(solve(board)) return true;

                            board[row][col] = '.'; // backtrack
                        }
                    }
                    return false; // No valid digit found
                }
            }
        }
        return true; // No empty cell left
    }

    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};
```

---

## 🔄 4. Call Stack Execution (Example):

Suppose we are at `board[0][2] = '.'`.

1. Try placing `'1'`
2. It’s valid → place and go deeper into recursion
3. At some point, we reach a cell where no digit is valid → backtrack
4. Undo `'1'` → try `'2'`
5. Repeat until the whole board is filled or no solution exists

### 🔁 Backtracking means:

```txt
Try → Go Deep → Fail? → Undo → Try Next → Repeat
```

---

## ⚠️ 5. Common Mistakes You Might Do:

| ❌ Mistake                                       | ✅ Correct                                  |
| ----------------------------------------------- | ------------------------------------------ |
| Not validating **3x3 box**                      | Use: `3*(row/3) + i/3, 3*(col/3) + i%3`    |
| Missing **return false** after all digits tried | Ensure backtracking exits if no digit fits |
| Using int instead of char `'1'` to `'9'`        | Use char type for board values             |
| Returning from inside loop early                | Only return if placement successful        |

---

## ⏱️ 6. Time & Space Complexity

### 🧮 Time Complexity (Worst Case):

Each empty cell can try 9 digits.

For **81 cells**:

$$
\boxed{O(9^{\text{empty cells}})}
$$

But thanks to pruning (via `isValid()`), it’s much faster in practice.

### 🧠 Space Complexity:

* **Recursive stack depth**: Up to 81 → `O(81)`
* **No extra space used apart from board**.

$$
\boxed{O(1)} \quad \text{(board modified in-place)}
$$

---

## 📌 Final Notes:

* Use **backtracking** for any “fill the board/sequence” problem.
* Always write a **validity check** before placing elements.
* Understand and visualize the **call stack** and **backtrack path**.
* Sudoku uses:

  * Row checks
  * Column checks
  * 3x3 subgrid checks
* Use `3*(row/3) + i/3` and `3*(col/3) + i%3` to access 3x3 boxes.

---







Perfect — this is the exact recursion confusion most people face initially.

You are asking:

After excluding `1`, how did recursion generate:

```text id="rbjlwm"
Include 2 → Store 2
Exclude 2 → Store 0
```

Let's go VERY slowly.

---

# Problem

```text id="z7b9f1"
nums = [1,2]
```

Code:

```cpp id="mjlwmv"
solve(nums, i, sum)
```

---

# Function

```cpp id="zvb9jd"
void solve(vector<int>& nums,
           int i,
           int sum){

    if(i == nums.size()){
        cout << sum << endl;
        return;
    }

    // include
    solve(nums, i+1, sum + nums[i]);

    // exclude
    solve(nums, i+1, sum);
}
```

---

# Initial Call

```text id="x9b9r2"
solve(i=0, sum=0)
```

We are deciding about:

```text id="o3bjlwm"
nums[0] = 1
```

---

# TREE VISUALIZATION

```text id="st4b6w"
                    (i=0,sum=0)
                     /       \
            include 1      exclude 1
              /                \
        (i=1,sum=1)       (i=1,sum=0)
```

---

# LEFT SIDE FIRST

---

# Include 1

Call:

```text id="jlwmkh"
solve(i=1,sum=1)
```

Now deciding about:

```text id="q77qku"
nums[1]=2
```

---

## Include 2

Call:

```text id="7ljlwm"
solve(i=2,sum=3)
```

Base case:

```text id="76wljw"
store 3
```

Return upward.

---

## Exclude 2

Now recursion returns to:

```text id="cwnjv6"
solve(i=1,sum=1)
```

Then executes second call:

```cpp id="xarjlwm"
solve(i+1,sum)
```

Meaning:

```text id="pd5w0q"
solve(i=2,sum=1)
```

Base case:

```text id="o2u6sl"
store 1
```

LEFT SIDE DONE.

---

# NOW IMPORTANT PART

Recursion returns ALL THE WAY BACK to:

```text id="3q3h0u"
solve(i=0,sum=0)
```

Now first include branch finished.

So function continues to second call:

```cpp id="qjlwmz"
solve(i+1,sum)
```

Meaning:

```text id="3hh8bl"
solve(i=1,sum=0)
```

THIS is:

```text id="aqnjlwm"
exclude 1
```

---

# IMPORTANT UNDERSTANDING

We excluded `1`.

So sum remains:

```text id="vjlwm8"
0
```

Now we are STILL deciding about `2`.

---

# Current State

```text id="yjlwmn"
i=1
sum=0
```

Decision about:

```text id="xwv0wv"
nums[1]=2
```

---

# Include 2

Call:

```text id="rjlwm9"
solve(i=2,sum=2)
```

Base case:

```text id="zhwwv0"
store 2
```

---

# Exclude 2

Return to:

```text id="jlwm52"
solve(i=1,sum=0)
```

Now second branch executes:

```text id="jlwmw9"
solve(i=2,sum=0)
```

Base case:

```text id="aqxjlwm"
store 0
```

---

# FINAL TREE

```text id="khjjlwm"
                    (0,0)
                  /       \
             include1    exclude1
               /             \
           (1,1)           (1,0)
           /   \           /    \
      inc2    exc2     inc2    exc2
      (2,3)   (2,1)    (2,2)   (2,0)

       3        1         2        0
```

---

# MOST IMPORTANT REALIZATION

Even after excluding `1`,
we STILL must decide about `2`.

Because recursion processes EVERY element.

---

# Mental Model

At every index:

```text id="buwjlwm"
Should I take this element?
```

Every element gets:

* YES branch
* NO branch

---

# For [1,2]

---

## About 1

```text id="jlwmpp"
take 1
skip 1
```

---

## About 2

For BOTH branches:

```text id="jlwmn1"
take 2
skip 2
```

That creates:

```text id="jlwmfd"
2 × 2 = 4 subsets
```

---

# Why Store 0?

Path was:

```text id="jlwmh7"
skip 1
skip 2
```

Subset becomes:

```text id="jlwm0n"
[]
```

Sum:

```text id="jlwmog"
0
```

---

# Ultimate Understanding

Recursion explores ALL POSSIBLE DECISION PATHS.
