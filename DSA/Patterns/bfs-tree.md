Here is **8️⃣ Tree BFS Pattern (Level Order Traversal)** 🌳

We will cover:

✔ Idea
✔ Brute Force vs Optimized
✔ Queue logic
✔ TC & SC calculation
✔ Complete DRY RUN
✔ Pattern recognition

---

# 🔑 BFS Idea

BFS = **Breadth First Search**

Visit nodes **level by level**

Uses **Queue (FIFO)**

Structure:

```
Level 0 → root
Level 1 → children
Level 2 → grandchildren
```

Traversal order:

```
1 → 2 → 3 → 4 → 5 → 6
```

---

# Queue Flow

```
push root
process node
push children
repeat
```

---

# 1️⃣ Binary Tree Level Order Traversal

Return nodes level-wise.

Example:

```
        3
       / \
      9   20
         /  \
        15   7
```

Output:

```
[
 [3],
 [9,20],
 [15,7]
]
```

---

## 🟢 Optimized BFS Code (C++)

```cpp
vector<vector<int>> levelOrder(TreeNode* root)
{
    vector<vector<int>> ans;

    if(root==NULL)
        return ans;

    queue<TreeNode*> q;

    q.push(root);

    while(!q.empty())        // n
    {
        int size = q.size();

        vector<int> level;

        for(int i=0;i<size;i++)
        {
            TreeNode* node = q.front();
            q.pop();

            level.push_back(node->val);

            if(node->left)
                q.push(node->left);

            if(node->right)
                q.push(node->right);
        }

        ans.push_back(level);
    }

    return ans;
}
```

---

# 🔍 Dry Run

Tree:

```
        3
       / \
      9   20
         /  \
        15   7
```

---

## Step 1

queue:

```
[3]
```

process 3

add children:

```
[9,20]
```

result:

```
[[3]]
```

---

## Step 2

queue:

```
[9,20]
```

process level:

result:

```
[[3],[9,20]]
```

add children:

```
[15,7]
```

---

## Step 3

queue:

```
[15,7]
```

result:

```
[[3],[9,20],[15,7]]
```

---

# Complexity

Each node visited once.

TC:

```
O(n)
```

SC:

```
queue stores max nodes in level

worst case = n
```

---

# 2️⃣ Minimum Depth of Binary Tree

Shortest path from root → leaf.

---

## BFS advantage

First leaf reached = minimum depth ✔

---

## Code

```cpp
int minDepth(TreeNode* root)
{
    if(!root)
        return 0;

    queue<pair<TreeNode*,int>> q;

    q.push({root,1});

    while(!q.empty())
    {
        auto front = q.front();
        q.pop();

        TreeNode* node = front.first;
        int depth = front.second;

        if(!node->left && !node->right)
            return depth;

        if(node->left)
            q.push({node->left,depth+1});

        if(node->right)
            q.push({node->right,depth+1});
    }

    return 0;
}
```

---

## Dry Run

```
    1
   /
  2
 /
3
```

queue:

```
(1,1)
(2,2)
(3,3)
```

leaf reached at 3

answer:

```
3
```

---

# 3️⃣ Zigzag Level Order Traversal

Alternate direction each level.

Example:

```
[
 [3],
 [20,9],
 [15,7]
]
```

---

## Code

```cpp
vector<vector<int>> zigzagLevelOrder(TreeNode* root)
{
    vector<vector<int>> ans;

    if(!root)
        return ans;

    queue<TreeNode*> q;

    q.push(root);

    bool leftToRight = true;

    while(!q.empty())
    {
        int size = q.size();

        vector<int> level(size);

        for(int i=0;i<size;i++)
        {
            TreeNode* node=q.front();
            q.pop();

            int index =
            leftToRight ? i : size-1-i;

            level[index]=node->val;

            if(node->left)
                q.push(node->left);

            if(node->right)
                q.push(node->right);
        }

        leftToRight=!leftToRight;

        ans.push_back(level);
    }

    return ans;
}
```

---

## Dry Run Direction

level 1:

```
→ left to right
```

level 2:

```
← right to left
```

level 3:

```
→ left to right
```

---

# BFS Template

```cpp
queue<TreeNode*> q;

q.push(root);

while(!q.empty())
{
    int size = q.size();

    for(int i=0;i<size;i++)
    {
        TreeNode* node = q.front();
        q.pop();

        if(node->left)
            q.push(node->left);

        if(node->right)
            q.push(node->right);
    }
}
```

---

# BFS vs DFS Difference

| BFS           | DFS             |
| ------------- | --------------- |
| level wise    | depth wise      |
| queue         | recursion/stack |
| shortest path | full traversal  |
| min depth     | path sum        |

---

# Pattern Recognition

Use BFS when question says:

| keyword       | meaning       |
| ------------- | ------------- |
| level order   | BFS           |
| minimum depth | shortest path |
| nearest node  | BFS           |
| distance      | BFS           |
| zigzag        | level pattern |

---

# Complexity Shortcut

BFS visits each node once:

```
TC = O(n)
SC = O(n)
```

---

Next important pattern:

9️⃣ BST Pattern (Validate BST, LCA in BST)



















Here is **Zigzag Level Order Traversal using STACK** 🌳

Stack approach is commonly asked because it tests **LIFO understanding**.

---

# Idea

Instead of queue, use **2 stacks**:

```text
stack1 → current level
stack2 → next level
```

Alternate order:

```text
Left → Right
Right → Left
```

This creates zigzag pattern.

---

# Example Tree

```
        3
       / \
      9   20
         /  \
        15   7
```

Output:

```
[
 [3],
 [20,9],
 [15,7]
]
```

---

# C++ Code (Using Stack)

```cpp
vector<vector<int>> zigzagLevelOrder(TreeNode* root)
{
    vector<vector<int>> ans;

    if(!root)
        return ans;

    stack<TreeNode*> s1;
    stack<TreeNode*> s2;

    s1.push(root);

    while(!s1.empty() || !s2.empty())
    {
        vector<int> level;

        // left → right
        while(!s1.empty())
        {
            TreeNode* node = s1.top();
            s1.pop();

            level.push_back(node->val);

            if(node->left)
                s2.push(node->left);

            if(node->right)
                s2.push(node->right);
        }

        if(!level.empty())
            ans.push_back(level);

        level.clear();

        // right → left
        while(!s2.empty())
        {
            TreeNode* node = s2.top();
            s2.pop();

            level.push_back(node->val);

            if(node->right)
                s1.push(node->right);

            if(node->left)
                s1.push(node->left);
        }

        if(!level.empty())
            ans.push_back(level);
    }

    return ans;
}
```

---

# Dry Run Step-by-Step 🔍

Tree:

```
        3
       / \
      9   20
         /  \
        15   7
```

---

## Step 1

```
s1 = [3]
s2 = []
```

process s1:

```
pop 3
push children to s2
```

```
s2 = [9,20]
level = [3]
```

result:

```
[[3]]
```

---

## Step 2 (reverse order)

process s2:

```
pop 20
pop 9
```

push children in reverse order:

```
s1 = [7,15]
level = [20,9]
```

result:

```
[[3],[20,9]]
```

---

## Step 3

process s1:

```
pop 15
pop 7
```

```
level = [15,7]
```

result:

```
[[3],[20,9],[15,7]]
```

---

# Stack Visualization

```
level 1:
3

level 2:
20 9

level 3:
15 7
```

---

# Complexity

Each node processed once.

TC:

```
O(n)
```

SC:

```
O(n)
```

---

# Why 2 stacks work?

Stack = LIFO

reverse order automatically.

---

# Pattern Recognition

Use stack zigzag when question says:

| keyword       | meaning         |
| ------------- | --------------- |
| zigzag        | alternate order |
| spiral order  | same as zigzag  |
| reverse level | stack helpful   |

---

# Queue vs Stack Zigzag

Queue approach:
store index reverse

Stack approach:
reverse traversal naturally

---

If you want, I can give:

• zigzag visualization diagram
• BFS vs DFS vs Stack comparison table
• remaining BST pattern
• full tree cheat sheet 🌳
