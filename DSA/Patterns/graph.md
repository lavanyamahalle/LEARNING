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

Want same structured explanation? 🔥
