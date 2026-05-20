Here is **9️⃣ BST Property Pattern (Binary Search Tree)** 🌳

Very important for Amazon because BST allows **faster search O(log n)** when balanced.

---

# BST Property

For every node:

```text
left subtree values  < root value
right subtree values > root value
```

Example BST:

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

---

# Pattern Recognition

Use BST logic when question says:

| keyword         | meaning       |
| --------------- | ------------- |
| sorted tree     | BST           |
| left smaller    | BST property  |
| search fast     | log n         |
| insert position | BST traversal |

---

# 1️⃣ Search in BST

---

## Idea

Compare value with root:

```text
if target < root → go left
if target > root → go right
```

---

## C++ Code

```cpp
TreeNode* searchBST(TreeNode* root, int val)
{
    if(root == NULL || root->val == val)
        return root;

    if(val < root->val)
        return searchBST(root->left, val);

    return searchBST(root->right, val);
}
```

---

## Dry Run

Search 6:

```
        8
       /
      3
       \
        6
```

steps:

```
6 < 8 → go left
6 > 3 → go right
found 6
```

---

## Complexity

Balanced tree height:

```
log n
```

TC = O(log n)
Worst case skew tree:

TC = O(n)

SC = O(h)

---

# 2️⃣ Insert into BST

---

## Idea

Find correct position maintaining BST rule.

---

## Code

```cpp
TreeNode* insertBST(TreeNode* root, int val)
{
    if(root == NULL)
        return new TreeNode(val);

    if(val < root->val)
        root->left =
        insertBST(root->left, val);

    else
        root->right =
        insertBST(root->right, val);

    return root;
}
```

---

## Dry Run

Insert 5:

```
        8
       /
      3
       \
        6
```

steps:

```
5 < 8 → left
5 > 3 → right
5 < 6 → left
insert here
```

Result:

```
        8
       /
      3
       \
        6
       /
      5
```

---

## Complexity

TC = O(log n) average
SC = O(h)

---

# 3️⃣ Validate BST

Check tree follows BST rules.

---

## Brute Force mistake

Check only immediate children ❌

BST rule applies to entire subtree.

---

## Optimized DFS Range Method

```cpp
bool validate(TreeNode* root,
              long min,
              long max)
{
    if(root == NULL)
        return true;

    if(root->val <= min ||
       root->val >= max)
        return false;

    return
    validate(root->left,
             min,
             root->val)
    &&
    validate(root->right,
             root->val,
             max);
}
```

Call:

```cpp
validate(root,
LONG_MIN,
LONG_MAX);
```

---

## Dry Run

Tree:

```
        5
       / \
      3   7
```

range:

```
5 must lie between (-∞, +∞)

3 must lie between (-∞, 5)

7 must lie between (5, +∞)
```

valid BST ✔

---

## Complexity

visit each node once

TC = O(n)
SC = O(h)

---

# 4️⃣ Lowest Common Ancestor in BST

Find common parent of 2 nodes.

---

## Key BST advantage

We can decide direction using values.

---

## Code

```cpp
TreeNode* lca(TreeNode* root,
              TreeNode* p,
              TreeNode* q)
{
    if(p->val < root->val &&
       q->val < root->val)
        return lca(root->left,p,q);

    if(p->val > root->val &&
       q->val > root->val)
        return lca(root->right,p,q);

    return root;
}
```

---

## Dry Run

```
        6
       / \
      2   8
```

Find LCA(2,8)

```
2 < 6
8 > 6

split happens here
```

Answer:

```
6
```

---

## Complexity

TC = O(log n) average
SC = O(h)

---

# BST Pattern Summary

| problem  | logic          |
| -------- | -------------- |
| search   | compare values |
| insert   | find position  |
| validate | maintain range |
| LCA      | split point    |

---

# Generic BST Template

```cpp
if(value < root->val)
    go left

else
    go right
```

---

# Key Advantage of BST

Reduces search complexity:

```
O(n) → O(log n)
```

similar to binary search.

---

# Interview Tip

Always mention:

BST behaves like sorted array.

Search becomes faster.

---

If you want, I can provide:

• BST full cheat sheet
• 10 most asked tree questions Amazon
• Tree pattern summary (all 3 patterns combined)
• Graph pattern next (very important)















Yes 👍 interviewers **DO ask questions based on the idea**:

> **BST behaves like a sorted array**

because **BST traversal (inorder)** gives **sorted output**.

This concept is frequently used in Amazon interviews.

---

# Why BST behaves like sorted array

If we do **inorder traversal**:

```text
left → root → right
```

values come in **ascending order**.

Example BST:

```
        5
       / \
      3   8
     / \   \
    1   4   9
```

Inorder traversal:

```
1 3 4 5 8 9
```

Sorted ✔

---

# Questions interviewer can ask from this concept

---

# 1️⃣ Kth Smallest Element in BST ⭐ VERY COMMON

Find kth smallest element.

Because inorder gives sorted order.

---

## Idea

Inorder traversal → sorted sequence → pick kth element.

---

## Code (C++)

```cpp
int kthSmallest(TreeNode* root, int k)
{
    stack<TreeNode*> st;

    while(true)
    {
        while(root)
        {
            st.push(root);
            root = root->left;
        }

        root = st.top();
        st.pop();

        k--;

        if(k==0)
            return root->val;

        root = root->right;
    }
}
```

---

## TC

visit k nodes:

```
O(h + k)
```

worst:

```
O(n)
```

---

# 2️⃣ Convert BST to Sorted Array

Simply inorder traversal.

---

## Code

```cpp
void inorder(TreeNode* root,
             vector<int>& ans)
{
    if(!root)
        return;

    inorder(root->left, ans);

    ans.push_back(root->val);

    inorder(root->right, ans);
}
```

Output:

sorted array.

---

# 3️⃣ Validate BST using Sorted Property

Inorder traversal must be strictly increasing.

---

## Code

```cpp
TreeNode* prev = NULL;

bool isValidBST(TreeNode* root)
{
    if(!root)
        return true;

    if(!isValidBST(root->left))
        return false;

    if(prev && prev->val >= root->val)
        return false;

    prev = root;

    return isValidBST(root->right);
}
```

---

# 4️⃣ Two Sum in BST

Check if two nodes sum to target.

Convert BST → sorted array → two pointer.

---

## Idea

```text
inorder → sorted array
apply two pointer
```

TC:

```
O(n)
```

---

# 5️⃣ Range Sum of BST

Find sum of nodes within range.

Use BST property to skip nodes.

---

## Code

```cpp
int rangeSumBST(TreeNode* root,
                int low,
                int high)
{
    if(!root)
        return 0;

    if(root->val < low)
        return rangeSumBST(root->right,
                           low,high);

    if(root->val > high)
        return rangeSumBST(root->left,
                           low,high);

    return root->val
         + rangeSumBST(root->left,
                       low,high)
         + rangeSumBST(root->right,
                       low,high);
}
```

---

# How interviewer frames question

They may say:

> Given BST, find kth smallest element efficiently.

Hidden hint:
use sorted nature of BST.

---

# Important Insight

BST traversal:

| traversal   | result         |
| ----------- | -------------- |
| inorder     | sorted         |
| preorder    | root first     |
| postorder   | children first |
| level order | BFS            |

---

# Shortcut memory trick

```text
BST + inorder = sorted array
```

---

# Most common Amazon questions from this idea

⭐ kth smallest element
⭐ validate BST
⭐ range sum BST
⭐ two sum BST
⭐ iterator for BST

---

If you want, I can provide:

• graph patterns (very important)
• DP patterns summary
• full revision cheat sheet
• 1 day revision list
• most repeated Amazon questions list
