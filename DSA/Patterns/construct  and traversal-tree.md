Great 👍 this image shows the **standard recursive logic** for:

# Build Tree from Preorder + Inorder 🌳

Given:

```
preorder = [3,9,20,15,7]
inorder  = [9,3,15,20,7]
```

We reconstruct the tree.

---

# Core Idea (what image is showing)

### Step 1: preorder gives ROOT

Preorder format:

```
root → left → right
```

So first element is always root.

```
root = preorder[preIdx]
```

In image:

```
Node* root = preorder[preIdx];
preIdx++;
```

---

### Step 2: find root position in inorder

Inorder format:

```
left → root → right
```

We find root index:

```
index = search(inorder, left, right, preorder[preIdx])
```

In image:

```
index = search(inorder, left, right, preorder[preIdx])
```

This divides tree into:

```
left subtree
right subtree
```

---

# Recursion Logic (shown in image)

```cpp
root->left =
BT(preorder, inorder,
   preIdx,
   left,
   index-1)

root->right =
BT(preorder, inorder,
   preIdx,
   index+1,
   right)
```

Meaning:

build left subtree first
then right subtree

---

# Base Condition (important)

In image:

```
if(left > right)
return NULL;
```

means:

no nodes left → stop recursion

---

# Complete Clean Code (same logic as image)

```cpp
TreeNode* build(
vector<int>& preorder,
vector<int>& inorder,
int& preIdx,
int left,
int right,
unordered_map<int,int>& mp)
{
    if(left > right)
        return NULL;

    int rootVal =
    preorder[preIdx++];

    TreeNode* root =
    new TreeNode(rootVal);

    int index =
    mp[rootVal];

    root->left =
    build(preorder,
          inorder,
          preIdx,
          left,
          index-1,
          mp);

    root->right =
    build(preorder,
          inorder,
          preIdx,
          index+1,
          right,
          mp);

    return root;
}
```

---

# Full Dry Run from image example

```
pre = [3,9,20,15,7]
in  = [9,3,15,20,7]
```

---

## Step 1

```
root = 3
```

split inorder:

```
[9] 3 [15,20,7]
```

tree:

```
    3
```

---

## Step 2 LEFT subtree

preIdx now points to 9

```
root = 9
```

```
[9]
```

tree:

```
    3
   /
  9
```

---

## Step 3 RIGHT subtree

preIdx now points to 20

```
root = 20
```

split inorder:

```
[15] 20 [7]
```

tree:

```
    3
   / \
  9   20
```

---

## Step 4 build left of 20

```
root = 15
```

---

## Step 5 build right of 20

```
root = 7
```

---

# Final Tree

```
        3
       / \
      9   20
         /  \
        15   7
```

---

# What interviewer checks here

They check if you understand:

1. preorder gives root
2. inorder splits tree
3. recursion builds subtrees
4. index boundaries correctly handled

---

# Time Complexity

We visit each node once:

```
O(n)
```

Hashmap lookup:

```
O(1)
```

---

If you want, I can also show:

• visual recursion tree diagram
• iterative version
• common mistakes in this question
• trick to remember formula
• 5 similar Amazon recursion problems









Here are **Tree Traversals (Recursive + Iterative)** 🌳
Very important for **Amazon SDE-1** — almost always used inside bigger problems.

We’ll cover:

1️⃣ Inorder
2️⃣ Preorder
3️⃣ Postorder
4️⃣ Level Order (BFS)

For each:

* idea
* recursive code
* iterative code
* TC & SC

---

# Tree Example for Dry Run

```
        1
       / \
      2   3
     / \
    4   5
```

---

# 1️⃣ Inorder Traversal

### Order

```
Left → Root → Right
```

Result:

```
4 2 5 1 3
```

---

## Recursive

```cpp
void inorder(TreeNode* root)
{
    if(root == NULL)
        return;

    inorder(root->left);

    cout << root->val << " ";

    inorder(root->right);
}
```

TC:

```
visit each node once → O(n)
```

SC:

```
recursion stack → O(h)
```

---

## Iterative (using stack)

```cpp
vector<int> inorderTraversal(TreeNode* root)
{
    vector<int> ans;

    stack<TreeNode*> st;

    TreeNode* curr = root;

    while(curr || !st.empty())
    {
        while(curr)
        {
            st.push(curr);
            curr = curr->left;
        }

        curr = st.top();
        st.pop();

        ans.push_back(curr->val);

        curr = curr->right;
    }

    return ans;
}
```

SC:

```
stack → O(h)
```

---

# 2️⃣ Preorder Traversal

### Order

```
Root → Left → Right
```

Result:

```
1 2 4 5 3
```

---

## Recursive

```cpp
void preorder(TreeNode* root)
{
    if(root == NULL)
        return;

    cout << root->val << " ";

    preorder(root->left);

    preorder(root->right);
}
```

---

## Iterative

```cpp
vector<int> preorderTraversal(TreeNode* root)
{
    vector<int> ans;

    if(!root)
        return ans;

    stack<TreeNode*> st;

    st.push(root);

    while(!st.empty())
    {
        TreeNode* node = st.top();
        st.pop();

        ans.push_back(node->val);

        if(node->right)
            st.push(node->right);

        if(node->left)
            st.push(node->left);
    }

    return ans;
}
```

Why push right first?
because stack is LIFO.

---

# 3️⃣ Postorder Traversal

### Order

```
Left → Right → Root
```

Result:

```
4 5 2 3 1
```

---

## Recursive

```cpp
void postorder(TreeNode* root)
{
    if(root == NULL)
        return;

    postorder(root->left);

    postorder(root->right);

    cout << root->val << " ";
}
```

---

## Iterative (2 stack method)

```cpp
vector<int> postorderTraversal(TreeNode* root)
{
    vector<int> ans;

    if(!root)
        return ans;

    stack<TreeNode*> s1, s2;

    s1.push(root);

    while(!s1.empty())
    {
        TreeNode* node = s1.top();
        s1.pop();

        s2.push(node);

        if(node->left)
            s1.push(node->left);

        if(node->right)
            s1.push(node->right);
    }

    while(!s2.empty())
    {
        ans.push_back(s2.top()->val);
        s2.pop();
    }

    return ans;
}
```

---

# 4️⃣ Level Order Traversal (BFS)

### Order

level by level

```
1 2 3 4 5
```

---

## Iterative (queue)

```cpp
vector<vector<int>> levelOrder(TreeNode* root)
{
    vector<vector<int>> ans;

    if(!root)
        return ans;

    queue<TreeNode*> q;

    q.push(root);

    while(!q.empty())
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

# Traversal Summary Table

| traversal   | order      | data structure |
| ----------- | ---------- | -------------- |
| inorder     | L R R      | stack          |
| preorder    | R L R      | stack          |
| postorder   | L R R      | 2 stacks       |
| level order | level wise | queue          |

---

# Quick Memory Trick

```
Inorder   = Left Root Right
Preorder  = Root Left Right
Postorder = Left Right Root
```

---

# Complexity for all DFS traversals

TC:

```
O(n)
```

SC:

```
O(h)
```

---

If you want, I can also give:

• one page tree cheat sheet
• visual diagram for each traversal
• 10 most asked tree questions Amazon
• iterative postorder using 1 stack
• all patterns summary table
