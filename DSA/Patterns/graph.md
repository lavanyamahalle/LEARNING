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
