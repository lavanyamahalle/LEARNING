Here is **1️⃣1️⃣ Graph DFS/BFS Pattern** (Very Important for Amazon) 🌐

Graph problems test:

* traversal logic
* recursion understanding
* BFS queue usage
* visited tracking

---

# Graph Representation

Graph is stored as:

### Adjacency List

```cpp
vector<vector<int>> graph;
```

Example:

```
0 → 1,2
1 → 0,3
2 → 0
3 → 1
```

---

# Core Idea

We visit nodes using:

### DFS

go deep first

### BFS

visit level by level

Always maintain:

```cpp
visited array
```

to avoid infinite loop.

---

# 1️⃣ DFS Template (Recursive)

```cpp
void dfs(int node,
         vector<vector<int>>& graph,
         vector<int>& visited)
{
    visited[node] = 1;

    for(int neighbour : graph[node])
    {
        if(!visited[neighbour])
        {
            dfs(neighbour,
                graph,
                visited);
        }
    }
}
```

---

# 2️⃣ BFS Template (Queue)

```cpp
void bfs(int start,
         vector<vector<int>>& graph,
         vector<int>& visited)
{
    queue<int> q;

    q.push(start);

    visited[start] = 1;

    while(!q.empty())
    {
        int node = q.front();
        q.pop();

        for(int neighbour : graph[node])
        {
            if(!visited[neighbour])
            {
                visited[neighbour] = 1;

                q.push(neighbour);
            }
        }
    }
}
```

---

# 1️⃣ Problem: Number of Islands ⭐

Grid problem treated as graph.

```
1 = land
0 = water
```

Count connected components.

---

## DFS Solution

```cpp
void dfs(int r,
         int c,
         vector<vector<char>>& grid)
{
    int n = grid.size();
    int m = grid[0].size();

    if(r<0 || c<0 ||
       r>=n || c>=m ||
       grid[r][c]=='0')
        return;

    grid[r][c] = '0';

    dfs(r+1,c,grid);
    dfs(r-1,c,grid);
    dfs(r,c+1,grid);
    dfs(r,c-1,grid);
}
```

Main function:

```cpp
int numIslands(
vector<vector<char>>& grid)
{
    int count = 0;

    for(int i=0;i<grid.size();i++)
    {
        for(int j=0;j<grid[0].size();j++)
        {
            if(grid[i][j]=='1')
            {
                dfs(i,j,grid);

                count++;
            }
        }
    }

    return count;
}
```

---

## Dry Run

```
1 1 0
1 0 0
0 0 1
```

Islands:

```
(0,0),(0,1),(1,0)
(2,2)
```

Answer:

```
2
```

---

## Complexity

visit each cell once:

```
TC = O(n*m)
SC = O(n*m)
```

---

# 2️⃣ Clone Graph

Create deep copy of graph.

---

## DFS Solution

```cpp
unordered_map<Node*,Node*> mp;

Node* cloneGraph(Node* node)
{
    if(!node)
        return NULL;

    if(mp[node])
        return mp[node];

    Node* copy =
    new Node(node->val);

    mp[node] = copy;

    for(Node* nei :
        node->neighbors)
    {
        copy->neighbors.push_back(
        cloneGraph(nei));
    }

    return copy;
}
```

---

## Complexity

visit each node once:

```
TC = O(V+E)
SC = O(V)
```

---

# 3️⃣ Count Connected Components

Count disconnected groups.

---

## DFS Solution

```cpp
void dfs(int node,
         vector<vector<int>>& graph,
         vector<int>& visited)
{
    visited[node] = 1;

    for(int nei : graph[node])
    {
        if(!visited[nei])
            dfs(nei,graph,visited);
    }
}
```

Main:

```cpp
int components(int n,
vector<vector<int>>& graph)
{
    vector<int> visited(n,0);

    int count = 0;

    for(int i=0;i<n;i++)
    {
        if(!visited[i])
        {
            dfs(i,graph,visited);

            count++;
        }
    }

    return count;
}
```

---

# Graph Traversal Visualization

Example:

```
0 — 1 — 2

3 — 4
```

components:

```
{0,1,2}
{3,4}
```

Answer = 2

---

# DFS vs BFS

| DFS            | BFS             |
| -------------- | --------------- |
| recursion      | queue           |
| deep traversal | level traversal |
| stack memory   | queue memory    |

---

# Pattern Recognition

Use graph traversal when question says:

| keyword              | meaning     |
| -------------------- | ----------- |
| connected components | graph DFS   |
| islands              | grid DFS    |
| shortest path        | BFS         |
| clone graph          | visited map |
| traversal            | DFS/BFS     |

---

# Complexity Shortcut

DFS/BFS visits each node once:

```
O(V + E)
```

V = vertices
E = edges

---

Next important pattern:

1️⃣2️⃣ Cycle Detection in Graph (very frequently asked)





Here is **1️⃣2️⃣ Cycle Detection in Graph** 🔁
Very frequently asked in **Amazon SDE-1** interviews.

We will cover:

✔ Undirected Graph cycle detection
✔ Directed Graph cycle detection
✔ DFS approach
✔ BFS approach (Kahn’s Algorithm)
✔ TC & SC
✔ Dry run

---

# What is a Cycle?

A cycle exists if we can start at a node and come back to the same node.

Example:

```
0 → 1 → 2 → 0
```

cycle present ✔

---

# Types of Graphs

### Undirected graph

```
0 — 1 — 2
    |
    3
```

### Directed graph

```
0 → 1 → 2 → 0
```

---

# 1️⃣ Cycle Detection in UNDIRECTED Graph (DFS)

Idea:
Track parent node.

If we visit already visited node which is NOT parent → cycle.

---

## Code (DFS)

```cpp
bool dfs(int node,
         int parent,
         vector<vector<int>>& graph,
         vector<int>& visited)
{
    visited[node] = 1;

    for(int nei : graph[node])
    {
        if(!visited[nei])
        {
            if(dfs(nei,node,graph,visited))
                return true;
        }

        else if(nei != parent)
            return true;
    }

    return false;
}
```

Main:

```cpp
bool hasCycle(int n,
vector<vector<int>>& graph)
{
    vector<int> visited(n,0);

    for(int i=0;i<n;i++)
    {
        if(!visited[i])
        {
            if(dfs(i,-1,graph,visited))
                return true;
        }
    }

    return false;
}
```

---

## Dry Run

Graph:

```
0 — 1 — 2
    |   |
    4 — 3
```

Traversal:

```
0 → 1 → 2 → 3 → 4 → 1
```

1 already visited and not parent → cycle ✔

---

## Complexity

visit each node once:

```
TC = O(V + E)
SC = O(V)
```

---

# 2️⃣ Cycle Detection in UNDIRECTED Graph (BFS)

Use queue + parent tracking.

---

## Code

```cpp
bool bfs(int start,
         vector<vector<int>>& graph,
         vector<int>& visited)
{
    queue<pair<int,int>> q;

    q.push({start,-1});

    visited[start] = 1;

    while(!q.empty())
    {
        int node = q.front().first;
        int parent = q.front().second;

        q.pop();

        for(int nei : graph[node])
        {
            if(!visited[nei])
            {
                visited[nei] = 1;

                q.push({nei,node});
            }

            else if(nei != parent)
                return true;
        }
    }

    return false;
}
```

---

# 3️⃣ Cycle Detection in DIRECTED Graph (DFS)

Important for:

⭐ Course Schedule
⭐ dependency graphs

Idea:
Track recursion path using 2 arrays.

visited → node visited
pathVisited → node in current recursion path

---

## Code

```cpp
bool dfs(int node,
         vector<vector<int>>& graph,
         vector<int>& visited,
         vector<int>& pathVisited)
{
    visited[node] = 1;

    pathVisited[node] = 1;

    for(int nei : graph[node])
    {
        if(!visited[nei])
        {
            if(dfs(nei,
                   graph,
                   visited,
                   pathVisited))
                return true;
        }

        else if(pathVisited[nei])
            return true;
    }

    pathVisited[node] = 0;

    return false;
}
```

---

## Dry Run

Graph:

```
0 → 1 → 2 → 0
```

pathVisited array:

```
0 → 1 → 2 → 0 already in path
cycle detected
```

---

# 4️⃣ Cycle Detection using BFS (Topological Sort)

Used in:

Course Schedule problem.

If topo sort doesn't include all nodes → cycle exists.

---

## Code (Kahn's Algorithm)

```cpp
bool hasCycle(int n,
vector<vector<int>>& graph)
{
    vector<int> indegree(n,0);

    for(int i=0;i<n;i++)
    {
        for(int nei : graph[i])
            indegree[nei]++;
    }

    queue<int> q;

    for(int i=0;i<n;i++)
    {
        if(indegree[i]==0)
            q.push(i);
    }

    int count = 0;

    while(!q.empty())
    {
        int node = q.front();

        q.pop();

        count++;

        for(int nei : graph[node])
        {
            indegree[nei]--;

            if(indegree[nei]==0)
                q.push(nei);
        }
    }

    return count != n;
}
```

---

# Pattern Recognition

Use cycle detection when question says:

| keyword         | meaning          |
| --------------- | ---------------- |
| dependency      | directed graph   |
| prerequisite    | directed cycle   |
| infinite loop   | cycle            |
| connected loop  | cycle detection  |
| course schedule | topological sort |

---

# Complexity Shortcut

DFS/BFS graph:

```
O(V + E)
```

V = vertices
E = edges

---

# Most Asked Problems Based on Cycle Detection

⭐ Course Schedule
⭐ Detect cycle in graph
⭐ Number of provinces
⭐ Redundant connection

---

If you want, I can also provide:

• graph cheat sheet combined
• top 10 graph questions Amazon
• DP patterns explained
• full DSA patterns summary 🚀




 Here are **Course Schedule I and Course Schedule II** together ⭐
(using **DFS recursion for cycle detection** + **stack for topo sort**)

Very important Amazon pattern.

---

# Course Schedule I (CS1)

### Problem

Check if it is possible to complete all courses.

Return:

```
true / false
```

We only check if **cycle exists**.

If cycle → cannot complete.

---

# Approach

Detect cycle in directed graph using DFS.

---

# CS1 Code (DFS cycle detection)

```cpp
bool dfs(int node,
         vector<vector<int>>& graph,
         vector<int>& visited,
         vector<int>& pathVisited)
{
    visited[node] = 1;

    pathVisited[node] = 1;

    for(int nei : graph[node])
    {
        if(!visited[nei])
        {
            if(dfs(nei,
                   graph,
                   visited,
                   pathVisited))
                return true;
        }

        else if(pathVisited[nei])
            return true;
    }

    pathVisited[node] = 0;

    return false;
}
```

Main:

```cpp
bool canFinish(
int numCourses,
vector<vector<int>>& pre)
{
    vector<vector<int>> graph(numCourses);

    for(auto p : pre)
    {
        graph[p[1]].push_back(p[0]);
    }

    vector<int> visited(numCourses,0);
    vector<int> pathVisited(numCourses,0);

    for(int i=0;i<numCourses;i++)
    {
        if(!visited[i])
        {
            if(dfs(i,
                   graph,
                   visited,
                   pathVisited))
                return false;
        }
    }

    return true;
}
```

---

# Course Schedule II (CS2)

### Problem

Return valid order of courses.

Return:

```
vector<int> order
```

If cycle → return empty vector.

---

# Approach

1. detect cycle using DFS recursion
2. store nodes in stack
3. stack gives topological order

---

# CS2 Code (DFS + stack topo sort)

```cpp
bool dfs(int node,
         vector<vector<int>>& graph,
         vector<int>& visited,
         vector<int>& pathVisited,
         stack<int>& st)
{
    visited[node] = 1;

    pathVisited[node] = 1;

    for(int nei : graph[node])
    {
        if(!visited[nei])
        {
            if(dfs(nei,
                   graph,
                   visited,
                   pathVisited,
                   st))
                return true;
        }

        else if(pathVisited[nei])
            return true;
    }

    pathVisited[node] = 0;

    st.push(node);

    return false;
}
```

Main:

```cpp
vector<int> findOrder(
int numCourses,
vector<vector<int>>& pre)
{
    vector<vector<int>> graph(numCourses);

    for(auto p : pre)
    {
        graph[p[1]].push_back(p[0]);
    }

    vector<int> visited(numCourses,0);
    vector<int> pathVisited(numCourses,0);

    stack<int> st;

    for(int i=0;i<numCourses;i++)
    {
        if(!visited[i])
        {
            if(dfs(i,
                   graph,
                   visited,
                   pathVisited,
                   st))
                return {};
        }
    }

    vector<int> order;

    while(!st.empty())
    {
        order.push_back(st.top());
        st.pop();
    }

    return order;
}
```

---

# Example

```
numCourses = 4

pre =
[
 [1,0],
 [2,0],
 [3,1],
 [3,2]
]
```

Graph:

```
0 → 1
0 → 2
1 → 3
2 → 3
```

Output:

```
[0,2,1,3]
```

OR

```
[0,1,2,3]
```

---

# Complexity

DFS traversal:

```
O(V + E)
```

Space:

```
O(V)
```

---

# Difference between CS1 and CS2

| feature         | CS1        | CS2   |
| --------------- | ---------- | ----- |
| output          | true/false | order |
| stack needed    | no         | yes   |
| topo sort       | no         | yes   |
| cycle detection | yes        | yes   |

---

# Interview Tip

Explain like:

Courses = nodes
Prerequisites = edges
Cycle = impossible to finish

CS1 → detect cycle
CS2 → return order

---

# Which Orange to Remove so Safety Increases 🍊

Goal:

> Remove **one fresh orange (1)** so that **maximum number of oranges remain safe** (not infected).

We use **DFS infection simulation**.

---

# Idea

Infection spreads from rotten oranges (2).

We try removing each fresh orange:

```text
temporarily change 1 → 0
```

Then simulate spread using DFS.

Count how many oranges remain **uninfected (1)**.

Pick removal giving **maximum safe oranges**.

---

# Example

```text
grid =
2 1 1
1 1 0
0 1 1
```

Infection spreads everywhere.

Safe oranges:

```
0
```

Try removing (0,1):

```text
2 0 1
1 1 0
0 1 1
```

Spread stops early.

Safe oranges increase ✔

---

# DFS Infection Function

We store infection time in grid.

```cpp
void dfs(int r,int c,
         vector<vector<int>>& grid,
         int time)
{
    int n = grid.size();
    int m = grid[0].size();

    if(r<0 || c<0 ||
       r>=n || c>=m)
        return;

    if(grid[r][c]==0)
        return;

    if(grid[r][c]>1 &&
       grid[r][c]<time)
        return;

    grid[r][c]=time;

    dfs(r+1,c,grid,time+1);
    dfs(r-1,c,grid,time+1);
    dfs(r,c+1,grid,time+1);
    dfs(r,c-1,grid,time+1);
}
```

---

# Count safe oranges after spread

```cpp
int countSafe(
vector<vector<int>> grid)
{
    int n = grid.size();
    int m = grid[0].size();

    // spread infection
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            if(grid[i][j]==2)
                dfs(i,j,grid,2);
        }
    }

    int safe=0;

    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            if(grid[i][j]==1)
                safe++;
        }
    }

    return safe;
}
```

---

# MAIN LOGIC

Try removing each orange

Choose removal giving maximum safety.

```cpp
pair<int,int> bestOrangeToRemove(
vector<vector<int>> grid)
{
    int n = grid.size();
    int m = grid[0].size();

    int maxSafe = 0;

    pair<int,int> best =
    {-1,-1};

    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            if(grid[i][j]==1)
            {
                vector<vector<int>>
                temp = grid;

                // remove orange
                temp[i][j]=0;

                int safe =
                countSafe(temp);

                if(safe > maxSafe)
                {
                    maxSafe = safe;

                    best = {i,j};
                }
            }
        }
    }

    return best;
}
```

---

# Output

Returns position:

```text
(row, col)
```

orange to remove.

---

# Dry Run

Grid:

```text
2 1 1
1 1 0
0 1 1
```

Try removing:

### remove (0,1)

```text
2 0 1
1 1 0
0 1 1
```

spread stops early.

safe oranges:

```
3
```

better result ✔

---

# Complexity

Try each cell:

```
n*m
```

DFS each time:

```
n*m
```

Total:

```
O((n*m)²)
```

---

# Why this works

Removing orange blocks infection path.

Graph connectivity breaks.

Safe region increases.

---

# Interview Explanation

We simulate infection spread using DFS.

We try removing each fresh orange.

We choose removal that maximizes number of safe oranges.

---

If you want, I can also provide:

• visual diagram explanation
• optimized version idea
• similar Amazon grid problems
• grid DFS cheat sheet 🚀
Great observation 👍
Actually, **removing (0,1) does NOT save 3 oranges** in this grid. Let's carefully **dry run** to see the truth.

Grid:

```
2 1 1
1 1 0
0 1 1
```

Coordinates (row,col):

```
(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)
```

Rotten orange:

```
(0,0)
```

---

# Case: remove (0,1)

Remove means convert 1 → 0.

New grid:

```
2 0 1
1 1 0
0 1 1
```

---

# DFS spread from (0,0)

Step 1:

infect neighbours of (0,0)

possible directions:

```
down → (1,0)
right → (0,1) blocked (0)
```

grid:

```
2 0 1
2 1 0
0 1 1
```

---

Step 2:

from (1,0)

spread:

```
right → (1,1)
```

grid:

```
2 0 1
2 2 0
0 1 1
```

---

Step 3:

from (1,1)

spread:

```
down → (2,1)
```

grid:

```
2 0 1
2 2 0
0 2 1
```

---

Step 4:

from (2,1)

spread:

```
right → (2,2)
```

grid:

```
2 0 1
2 2 0
0 2 2
```

---

Step 5:

from (2,2)

spread:

```
up blocked
right blocked
down blocked
left already infected
```

---

# Final grid

```
2 0 1
2 2 0
0 2 2
```

Remaining fresh oranges:

```
(0,2)
```

Safe oranges = **1**

NOT 3 ❌

---

# Why only 1 safe?

Because infection found another path:

```
(0,0)
 ↓
(1,0)
 →
(1,1)
 ↓
(2,1)
 →
(2,2)
```

Grid still connected.

---

# Try removing (1,1) instead

Remove center orange:

```
2 1 1
1 0 0
0 1 1
```

Spread:

from (0,0)

```
2 2 2
2 0 0
0 1 1
```

Remaining safe:

```
(2,1)
(2,2)
```

Safe oranges = 2 ✔ better result

---

# Best removal for this grid

Remove:

```
(1,1)
```

because it breaks major connection path.

---

# Key Insight

We want to remove node that breaks connectivity most.

Middle nodes often control spread.

Graph intuition:

center node acts like bridge.

---

# Correct Output for this grid

Best cell to remove:

```
(1,1)
```

Safe oranges:

```
2
```

---

# Interview Tip

Think of grid as graph.

Remove node that disconnects graph most.

Usually:

center cells important.

---

If you want, I can also show:

• visual graph diagram
• optimized approach intuition
• similar grid problems asked by Amazon
• articulation point intuition (very useful)
