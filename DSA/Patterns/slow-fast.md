Here is **4️⃣ Fast & Slow Pointer Pattern (Linked List)** with:

✔ Brute Force → Optimized
✔ Time Complexity (TC) calculation
✔ Space Complexity (SC)
✔ Detailed DRY RUN
✔ Interview explanation logic

---

# Fast & Slow Pointer Idea

Two pointers:

```
slow → moves 1 step
fast → moves 2 steps
```

Why useful?

* detect cycle
* find middle
* detect loop start
* reduce extra space

---

# 1️⃣ Linked List Cycle Detection

Check if loop exists in linked list.

Example:

```
1 → 2 → 3 → 4 → 5
          ↑     ↓
          ← ← ←
```

---

## 🔴 Brute Force (HashSet)

Store visited nodes

```cpp
bool hasCycle(ListNode *head)
{
    unordered_set<ListNode*> st;

    while(head != NULL)     // n
    {
        if(st.count(head))
            return true;

        st.insert(head);

        head = head->next;
    }

    return false;
}
```

### TC calculation

loop runs n times

TC = O(n)
SC = O(n)

Extra memory used ❌

---

## 🟢 Optimized Fast Slow Pointer

```cpp
bool hasCycle(ListNode *head)
{
    ListNode *slow = head;
    ListNode *fast = head;

    while(fast != NULL && fast->next != NULL)
    {
        slow = slow->next;          // 1 step

        fast = fast->next->next;    // 2 steps

        if(slow == fast)
            return true;
    }

    return false;
}
```

### TC calculation

each pointer moves max n steps

TC = O(n)
SC = O(1)

memory optimized ✔

---

## Dry Run

Linked list:

```
1 → 2 → 3 → 4 → 5
          ↑     ↓
```

| step | slow | fast |
| ---- | ---- | ---- |
| 1    | 1    | 1    |
| 2    | 2    | 3    |
| 3    | 3    | 5    |
| 4    | 4    | 4    |

slow == fast → cycle present

Answer:

```
true
```

---

# 2️⃣ Find Middle of Linked List

Example:

```
1 → 2 → 3 → 4 → 5
```

middle = 3

---

## 🔴 Brute Force

count nodes then traverse again

```cpp
ListNode* middleNode(ListNode* head)
{
    int count = 0;

    ListNode* temp = head;

    while(temp != NULL)    // n
    {
        count++;
        temp = temp->next;
    }

    int mid = count/2;

    temp = head;

    for(int i=0;i<mid;i++)   // n/2
        temp = temp->next;

    return temp;
}
```

TC:

```
n + n = 2n
```

TC = O(n)
SC = O(1)

---

## 🟢 Optimized Fast Slow Pointer

```cpp
ListNode* middleNode(ListNode* head)
{
    ListNode* slow = head;
    ListNode* fast = head;

    while(fast != NULL && fast->next != NULL)
    {
        slow = slow->next;

        fast = fast->next->next;
    }

    return slow;
}
```

TC:

```
loop runs n/2
remove constant
```

TC = O(n)
SC = O(1)

---

## Dry Run

```
1 → 2 → 3 → 4 → 5
```

| step | slow | fast |
| ---- | ---- | ---- |
| 1    | 1    | 1    |
| 2    | 2    | 3    |
| 3    | 3    | 5    |
| stop | 3    | null |

Answer:

```
3
```

---

# 3️⃣ Detect Start of Cycle

Find where loop begins.

Example:

```
1 → 2 → 3 → 4 → 5
      ↑         ↓
      ← ← ← ← ←
```

start = node 2

---

## Optimized Solution

```cpp
ListNode *detectCycle(ListNode *head)
{
    ListNode *slow = head;
    ListNode *fast = head;

    while(fast && fast->next)
    {
        slow = slow->next;

        fast = fast->next->next;

        if(slow == fast)
        {
            slow = head;

            while(slow != fast)
            {
                slow = slow->next;

                fast = fast->next;
            }

            return slow;
        }
    }

    return NULL;
}
```

TC = O(n)
SC = O(1)

---

## Dry Run Concept

distance:

```
head → cycle start = a
cycle length = b
meeting point = k
```

math proves both meet at start node.

---

# Fast Slow Pattern Recognition

Use when problem says:

| keyword            | meaning        |
| ------------------ | -------------- |
| cycle              | loop detection |
| middle             | center node    |
| circular           | loop           |
| repeated traversal | optimize       |
| linked list        | pointer logic  |

---

# Generic Template

```cpp
ListNode* slow = head;
ListNode* fast = head;

while(fast && fast->next)
{
    slow = slow->next;

    fast = fast->next->next;

    if(slow == fast)
    {
        // cycle detected
    }
}
```

TC = O(n)
SC = O(1)

---

Next pattern recommended:

6️⃣ Stack Pattern (Valid Parentheses, Next Greater Element)

Want same BF → optimized + dry run?








Here is **5️⃣ Linked List Manipulation Pattern (C++)** with:

✔ Brute Force → Optimized
✔ TC (Time Complexity) + SC (Space Complexity)
✔ Detailed **Dry Run**
✔ Pointer intuition (VERY IMPORTANT for interviews)

---

# 🔑 Core Idea

Before changing pointer:

```cpp
ListNode* next = curr->next;
```

Otherwise you **lose the rest of the list** ❌

---

# 1️⃣ Reverse Linked List

---

## 🔴 Brute Force (using extra array)

```cpp
ListNode* reverseList(ListNode* head)
{
    vector<int> v;

    ListNode* temp = head;

    while(temp)   // n
    {
        v.push_back(temp->val);
        temp = temp->next;
    }

    temp = head;

    for(int i=v.size()-1;i>=0;i--)   // n
    {
        temp->val = v[i];
        temp = temp->next;
    }

    return head;
}
```

TC:

```
n + n = 2n → O(n)
```

SC = O(n)

---

## 🟢 Optimized (In-place Pointer Change)

```cpp
ListNode* reverseList(ListNode* head)
{
    ListNode* prev = NULL;
    ListNode* curr = head;

    while(curr != NULL)   // n
    {
        ListNode* next = curr->next;  // store

        curr->next = prev;            // reverse link

        prev = curr;
        curr = next;
    }

    return prev;
}
```

TC:

```
single loop → n
```

TC = O(n)
SC = O(1) ✅

---

## 🔍 Dry Run

```id="z21j7n"
1 → 2 → 3 → 4 → NULL
```

| step | prev | curr | next | list change |
| ---- | ---- | ---- | ---- | ----------- |
| 1    | NULL | 1    | 2    | 1 → NULL    |
| 2    | 1    | 2    | 3    | 2 → 1       |
| 3    | 2    | 3    | 4    | 3 → 2       |
| 4    | 3    | 4    | NULL | 4 → 3       |

Final:

```id="e4j1o8"
4 → 3 → 2 → 1
```

---

# 2️⃣ Merge Two Sorted Lists

---

## 🔴 Brute Force

Store in array + sort

TC:

```
(n + m) log(n + m)
```

---

## 🟢 Optimized Pointer Merge

```cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2)
{
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while(l1 && l2)   // n + m
    {
        if(l1->val < l2->val)
        {
            tail->next = l1;
            l1 = l1->next;
        }
        else
        {
            tail->next = l2;
            l2 = l2->next;
        }

        tail = tail->next;
    }

    if(l1) tail->next = l1;
    if(l2) tail->next = l2;

    return dummy.next;
}
```

TC:

```
n + m
```

TC = O(n + m)
SC = O(1)

---

## 🔍 Dry Run

```id="r67v92"
l1 = 1 → 3 → 5
l2 = 2 → 4 → 6
```

steps:

```id="xk3yb4"
1 < 2 → pick 1
2 < 3 → pick 2
3 < 4 → pick 3
4 < 5 → pick 4
...
```

Final:

```id="g5jfxp"
1 → 2 → 3 → 4 → 5 → 6
```

---

# 3️⃣ Remove Nth Node from End

---

## 🔴 Brute Force

Count length then remove

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n)
{
    int len = 0;

    ListNode* temp = head;

    while(temp)   // n
    {
        len++;
        temp = temp->next;
    }

    int pos = len - n;

    temp = head;

    for(int i=0;i<pos-1;i++)  // n
        temp = temp->next;

    temp->next = temp->next->next;

    return head;
}
```

TC:

```
n + n = 2n → O(n)
```

SC = O(1)

---

## 🟢 Optimized Two Pointer

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n)
{
    ListNode dummy(0);
    dummy.next = head;

    ListNode* fast = &dummy;
    ListNode* slow = &dummy;

    for(int i=0;i<n;i++)   // n
        fast = fast->next;

    while(fast->next)      // n
    {
        fast = fast->next;
        slow = slow->next;
    }

    slow->next = slow->next->next;

    return dummy.next;
}
```

TC:

```
n
```

TC = O(n)
SC = O(1)

---

## 🔍 Dry Run

```id="ep2xyi"
1 → 2 → 3 → 4 → 5, n = 2
```

step:

* fast moves 2 steps → at node 2
* move both:

| slow | fast |
| ---- | ---- |
| 1    | 3    |
| 2    | 4    |
| 3    | 5    |

slow stops at 3 → remove next (4)

Final:

```id="3xhw0o"
1 → 2 → 3 → 5
```

---

# 🔥 Pattern Recognition

Use this pattern when:

| keyword     | meaning          |
| ----------- | ---------------- |
| reverse     | pointer flip     |
| merge       | compare nodes    |
| remove      | skip node        |
| linked list | pointer handling |
| in-place    | no extra space   |

---

# ⚡ Interview Explanation Template

Say this:

1. Brute force → extra space / multiple traversal
2. Optimize → pointer manipulation
3. Maintain prev, curr, next
4. Avoid losing reference
5. Achieve O(1) space

---

# 🧠 Golden Rule

Always remember:

```cpp
ListNode* next = curr->next;
```

This line = **life saver in linked list** 🚀

---

Next recommended pattern:

6️⃣ Stack Pattern (Valid Parentheses, Next Greater Element)

Want same detailed explanation + dry run?
