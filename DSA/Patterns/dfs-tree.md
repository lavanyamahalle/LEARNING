Here is **7️⃣ Tree DFS Pattern (Depth First Search)** — one of the **MOST ASKED Amazon patterns** 🌳

We will cover:

✔ Idea
✔ Brute Force → Optimized recursion
✔ TC & SC calculation
✔ Detailed dry run
✔ Pattern recognition

---

# 7️⃣ Tree DFS Pattern

### DFS means

Go **deep first**, then backtrack.

Traversal types:

```text
Preorder  : root → left → right
Inorder   : left → root → right
Postorder : left → right → root
```

---

# Basic Tree Structure (C++)

```cpp
struct TreeNode
{
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x)
    {
        val = x;
        left = NULL;
        right = NULL;
    }
};
```

---

# 1️⃣ Maximum Depth of Binary Tree

Height of tree

Example:

```
        1
       / \
      2   3
     /
    4
```

depth = 3

---

## 🔴 Brute Force Idea

Traverse every path and count nodes.

Time consuming thinking.

---

## 🟢 Optimized DFS Recursion

```cpp
int maxDepth(TreeNode* root)
{
    if(root == NULL)
        return 0;

    int leftDepth =
        maxDepth(root->left);

    int rightDepth =
        maxDepth(root->right);

    return max(leftDepth, rightDepth) + 1;
}
```

---

## Dry Run

Tree:

```
        1
       / \
      2   3
     /
    4
```

Step calls:

```
maxDepth(1)

maxDepth(2)
maxDepth(4)
maxDepth(NULL) → 0
maxDepth(NULL) → 0

depth at 4 = 1

depth at 2 = 2

maxDepth(3) = 1

depth at 1 = 3
```

Answer:

```
3
```

---

## Complexity

Each node visited once

TC:

```
n nodes visited once → O(n)
```

SC:

```
recursion stack height = tree height

worst case skew tree → O(n)
balanced tree → O(log n)
```

---

# 2️⃣ Same Tree

Check if two trees identical.

---

## DFS Solution

```cpp
bool isSameTree(TreeNode* p,
                TreeNode* q)
{
    if(p==NULL && q==NULL)
        return true;

    if(p==NULL || q==NULL)
        return false;

    if(p->val != q->val)
        return false;

    return
    isSameTree(p->left,q->left)
    &&
    isSameTree(p->right,q->right);
}
```

---

## Dry Run

Tree1:

```
   1
  / \
 2   3
```

Tree2:

```
   1
  / \
 2   3
```

compare:

```
1 == 1
2 == 2
3 == 3
```

Answer:

```
true
```

---

## Complexity

visit each node once

TC = O(n)
SC = O(height)

---

# 3️⃣ Diameter of Binary Tree

Longest path between any 2 nodes.

Path may or may not pass root.

---

## Optimized DFS

```cpp
int diameter = 0;

int dfs(TreeNode* root)
{
    if(root==NULL)
        return 0;

    int left = dfs(root->left);

    int right = dfs(root->right);

    diameter =
    max(diameter, left + right);

    return
    max(left, right) + 1;
}
```

call:

```cpp
dfs(root);
return diameter;
```

---

## Dry Run

```
        1
       / \
      2   3
     / \
    4   5
```

diameter path:

```
4 → 2 → 1 → 3
```

length = 3 edges

---

## Complexity

DFS visits each node once

TC = O(n)
SC = O(height)

---

# 4️⃣ Path Sum

Check if root-to-leaf path sum exists.

target = 7

```
        1
       / \
      2   3
     /
    4
```

path:

```
1 + 2 + 4 = 7
```

---

## DFS Solution

```cpp
bool hasPathSum(TreeNode* root,
                int targetSum)
{
    if(root==NULL)
        return false;

    if(root->left==NULL &&
       root->right==NULL)
    {
        return targetSum == root->val;
    }

    targetSum -= root->val;

    return
    hasPathSum(root->left,targetSum)
    ||
    hasPathSum(root->right,targetSum);
}
```

---

## Dry Run

target = 7

```
7-1 = 6
6-2 = 4
4-4 = 0
```

Answer:

```
true
```

---

# DFS Visualization

Example:

```
        1
       / \
      2   3
     / \
    4   5
```

DFS order:

```
1 → 2 → 4 → backtrack
1 → 2 → 5 → backtrack
1 → 3
```

---

# Generic DFS Template

```cpp
int dfs(TreeNode* root)
{
    if(root == NULL)
        return base_value;

    int left = dfs(root->left);

    int right = dfs(root->right);

    return combine(left,right);
}
```

---

# Pattern Recognition

Use DFS when:

| keyword      | meaning             |
| ------------ | ------------------- |
| tree depth   | height              |
| path sum     | root to leaf        |
| diameter     | longest path        |
| compare tree | structure check     |
| subtree      | recursive structure |

---

# Complexity Shortcut

DFS:

```
visit each node once → O(n)
```

Space:

```
recursion stack height → O(h)
```

---

Next important pattern:

8️⃣ Tree BFS (Level Order Traversal)

Want same detailed explanation + dry run? 🌳




# Path Sum (Tree DFS) — Complete Dry Run 🌳

## Problem

Check if **any root → leaf path** has sum = target.

---

## Example Tree

```
        5
       / \
      4   8
     /   / \
    11  13  4
   /  \       \
  7    2       1
```

### Target Sum

```
22
```

We check if any path adds up to **22**

---

# Optimized DFS Code (C++)

```cpp
bool hasPathSum(TreeNode* root, int targetSum)
{
    if(root == NULL)
        return false;

    // if leaf node
    if(root->left == NULL &&
       root->right == NULL)
    {
        return targetSum == root->val;
    }

    targetSum -= root->val;

    return hasPathSum(root->left, targetSum)
        ||
           hasPathSum(root->right, targetSum);
}
```

---

# Core Idea

At each node:

```
remaining sum = targetSum - current node value
```

Continue until **leaf node**

If remaining sum becomes **0** at leaf → TRUE

---

# Step-by-Step Dry Run 🔍

Initial call:

```
hasPathSum(root=5, target=22)
```

---

## Step 1: Visit Node 5

```
remaining = 22 - 5 = 17
```

Now check left and right subtree

```
hasPathSum(4, 17) OR hasPathSum(8, 17)
```

---

## Step 2: Go Left → Node 4

```
remaining = 17 - 4 = 13
```

call:

```
hasPathSum(11, 13)
```

---

## Step 3: Node 11

```
remaining = 13 - 11 = 2
```

call:

```
hasPathSum(7, 2)
OR
hasPathSum(2, 2)
```

---

## Step 4: Check Node 7

```
remaining = 2 - 7 = -5
```

Leaf node reached ❌

```
return false
```

---

## Step 5: Check Node 2

```
remaining = 2 - 2 = 0
```

Leaf node reached ✅

```
return true
```

---

## Path Found 🎯

```
5 → 4 → 11 → 2
```

Sum:

```
5 + 4 + 11 + 2 = 22
```

---

# Call Stack Visualization

```
hasPathSum(5,22)

  hasPathSum(4,17)

     hasPathSum(11,13)

         hasPathSum(7,2) → false

         hasPathSum(2,2) → true
```

Final Answer:

```
true
```

---

# Tree Traversal Order (DFS)

```
5
|
4
|
11
| \
7   2
```

DFS explores one full path before trying another.

---

# Why DFS works well here

We must explore:

```
root → leaf paths
```

DFS naturally follows complete path.

---

# Complexity

### Time Complexity

visit each node once

```
n nodes → O(n)
```

---

### Space Complexity

recursion stack depth = height of tree

Worst case:

```
skew tree → O(n)
```

Balanced tree:

```
O(log n)
```

---

# Important Condition (VERY IMPORTANT)

Check sum only when:

```
leaf node reached
```

Leaf node means:

```cpp
root->left == NULL &&
root->right == NULL
```

---

# Pattern Recognition

Use Path Sum logic when problem says:

| keyword        | meaning         |
| -------------- | --------------- |
| root to leaf   | full path       |
| target sum     | subtract values |
| path total     | accumulate sum  |
| tree traversal | DFS recursion   |

---

# Interview Explanation (simple)

Say:

1. recursively traverse tree
2. subtract node value from target
3. when leaf reached, check sum = 0
4. if any path satisfies → return true

---

If you want, I can also show:

• Path Sum II (return all paths)
• iterative stack version
• visual diagram steps
• BFS version
• Tree BFS pattern next
