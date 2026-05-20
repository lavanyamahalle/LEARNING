Here is **6️⃣ Monotonic Stack Pattern (C++)** with:

✔ Brute Force → Optimized
✔ Proper **TC (Time Complexity)** & **SC (Space Complexity)**
✔ Detailed **Dry Run**
✔ When to identify this pattern

---

# 🔑 Monotonic Stack Idea

Stack maintains **increasing or decreasing order**

Why useful?
Because we often need:

```text
nearest greater
nearest smaller
previous greater
next greater
```

Stack helps reduce **O(n²) → O(n)**

---

# 1️⃣ Next Greater Element

Find next greater element for each number.

Example:

```
nums = [2,1,2,4,3]
answer = [4,2,4,-1,-1]
```

---

## 🔴 Brute Force

```cpp
vector<int> nextGreater(vector<int>& nums)
{
    vector<int> ans(nums.size(), -1);

    for(int i=0;i<nums.size();i++)        // n
    {
        for(int j=i+1;j<nums.size();j++)  // n
        {
            if(nums[j] > nums[i])
            {
                ans[i] = nums[j];
                break;
            }
        }
    }

    return ans;
}
```

TC calculation:

```
n × n = n²
```

TC = **O(n²)**
SC = **O(1)**

---

## 🟢 Optimized Monotonic Stack

```cpp
vector<int> nextGreater(vector<int>& nums)
{
    vector<int> ans(nums.size(), -1);

    stack<int> st;

    for(int i=0;i<nums.size();i++)   // n
    {
        while(!st.empty() &&
              nums[st.top()] < nums[i])
        {
            ans[st.top()] = nums[i];

            st.pop();
        }

        st.push(i);
    }

    return ans;
}
```

TC:

```
each element pushed once
each element popped once

n + n = 2n → O(n)
```

SC = O(n)

---

## 🔍 Dry Run

```
nums = [2,1,2,4,3]
```

| step | stack            | answer      |
| ---- | ---------------- | ----------- |
| 2    | [2]              | [-,-,-,-,-] |
| 1    | [2,1]            |             |
| 2    | pop 1 → ans[1]=2 |             |
|      | stack [2,2]      |             |
| 4    | pop 2 → ans[2]=4 |             |
|      | pop 2 → ans[0]=4 |             |
| 3    | stack [4,3]      |             |

final:

```
[4,2,4,-1,-1]
```

---

# 2️⃣ Daily Temperatures

Find how many days until warmer temperature.

```
temps = [73,74,75,71,69,72,76,73]
output = [1,1,4,2,1,1,0,0]
```

---

## 🔴 Brute Force

check next warmer day

TC:

```
n²
```

---

## 🟢 Optimized Monotonic Stack

```cpp
vector<int> dailyTemperatures(vector<int>& temp)
{
    vector<int> ans(temp.size());

    stack<int> st;

    for(int i=0;i<temp.size();i++)   // n
    {
        while(!st.empty() &&
              temp[st.top()] < temp[i])
        {
            int prev = st.top();

            st.pop();

            ans[prev] = i - prev;
        }

        st.push(i);
    }

    return ans;
}
```

TC = O(n)
SC = O(n)

---

## 🔍 Dry Run

```
73 74 75 71 69 72 76 73
```

when 76 comes:

all smaller values pop:

```
69 → 72 → 75
```

store distance

---

# 3️⃣ Valid Parentheses

Check balanced brackets

```
()[]{}
```

---

## 🔴 Brute Force idea

keep removing pairs repeatedly → inefficient

---

## 🟢 Optimized Stack

```cpp
bool isValid(string s)
{
    stack<char> st;

    for(char c:s)   // n
    {
        if(c=='(' || c=='{' || c=='[')
            st.push(c);

        else
        {
            if(st.empty())
                return false;

            if(c==')' && st.top()!='(')
                return false;

            if(c=='}' && st.top()!='{')
                return false;

            if(c==']' && st.top()!='[')
                return false;

            st.pop();
        }
    }

    return st.empty();
}
```

TC:

```
single loop → n
```

TC = O(n)
SC = O(n)

---

## 🔍 Dry Run

```
({[]})
```

| char | stack |
| ---- | ----- |
| (    | (     |
| {    | ( {   |
| [    | ( { [ |
| ]    | ( {   |
| }    | (     |
| )    | empty |

valid ✔

---

# 4️⃣ Min Stack

support:

* push
* pop
* get minimum

---

## Optimized idea

store min along with value

```cpp
class MinStack
{
public:

stack<pair<int,int>> st;

void push(int val)
{
    if(st.empty())
        st.push({val,val});

    else
    {
        int minVal =
        min(val, st.top().second);

        st.push({val,minVal});
    }
}

void pop()
{
    st.pop();
}

int top()
{
    return st.top().first;
}

int getMin()
{
    return st.top().second;
}
};
```

TC:

| operation | TC   |
| --------- | ---- |
| push      | O(1) |
| pop       | O(1) |
| getMin    | O(1) |

SC = O(n)

---

# 🔥 Pattern Recognition

Use monotonic stack when problem says:

| keyword              | meaning            |
| -------------------- | ------------------ |
| next greater         | stack decreasing   |
| next smaller         | stack increasing   |
| nearest greater      | compare neighbours |
| temperature increase | future comparison  |
| parentheses          | matching pairs     |

---

# Generic Monotonic Stack Template

```cpp
stack<int> st;

for(int i=0;i<n;i++)   // n
{
    while(!st.empty() &&
          arr[st.top()] < arr[i])
    {
        st.pop();
    }

    st.push(i);
}
```

TC:

```
each element pushed once
each element popped once

O(n)
```

---

# Interview Thinking

Brute force:
check right side every time → O(n²)

Optimized:
store useful candidates in stack → O(n)

---

