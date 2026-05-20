Below is **Sliding Window pattern in C++** with:

✔ Brute Force → Optimized → Further optimization
✔ Proper **TC (Time Complexity)** calculation
✔ Proper **SC (Space Complexity)**
✔ Short loop counting method

---

# 2️⃣ Sliding Window Pattern

### Idea

Instead of checking all subarrays (nested loops),
maintain a **window [left … right]** and expand/shrink.

Reduces **O(n²) → O(n)**

---

# Problem 1: Longest Substring Without Repeating Characters

---

## 🔴 Brute Force

Check all substrings and verify unique characters.

```cpp
int lengthOfLongestSubstring(string s)
{
    int maxLen = 0;

    for(int i=0;i<s.size();i++)              // n
    {
        unordered_set<char> st;

        for(int j=i;j<s.size();j++)          // n
        {
            if(st.count(s[j]))
                break;

            st.insert(s[j]);

            maxLen=max(maxLen, j-i+1);
        }
    }

    return maxLen;
}
```

### TC calculation

outer loop → n
inner loop → n

```
n × n = n²
```

TC = **O(n²)**
SC = **O(n)** (set)

---

## 🟢 Optimized Sliding Window

```cpp
int lengthOfLongestSubstring(string s)
{
    unordered_set<char> st;

    int left = 0;
    int maxLen = 0;

    for(int right=0; right<s.size(); right++)    // n
    {
        while(st.count(s[right]))                // n total
        {
            st.erase(s[left]);
            left++;
        }

        st.insert(s[right]);

        maxLen=max(maxLen, right-left+1);
    }

    return maxLen;
}
```

### TC calculation

right pointer → n
left pointer → n

```
n + n = 2n
remove constant → n
```

TC = **O(n)**
SC = **O(n)**

---

## 🔵 Further Optimization (using HashMap index jump)

```cpp
int lengthOfLongestSubstring(string s)
{
    unordered_map<char,int> mp;

    int left = 0;
    int maxLen = 0;

    for(int right=0; right<s.size(); right++)    // n
    {
        if(mp.count(s[right]))
            left = max(left, mp[s[right]]+1);

        mp[s[right]] = right;

        maxLen=max(maxLen, right-left+1);
    }

    return maxLen;
}
```

TC = **O(n)**
SC = **O(n)**
More efficient shrinking ✔

---

# Problem 2: Maximum Subarray (Kadane)

---

## 🔴 Brute Force

Check all subarrays

```cpp
int maxSubArray(vector<int>& nums)
{
    int maxSum = INT_MIN;

    for(int i=0;i<nums.size();i++)        // n
    {
        int sum = 0;

        for(int j=i;j<nums.size();j++)    // n
        {
            sum += nums[j];

            maxSum=max(maxSum,sum);
        }
    }

    return maxSum;
}
```

TC:

```
n × n = n²
```

TC = **O(n²)**
SC = **O(1)**

---

## 🟢 Optimized Sliding Window (Kadane)

```cpp
int maxSubArray(vector<int>& nums)
{
    int sum = 0;
    int maxSum = INT_MIN;

    for(int i=0;i<nums.size();i++)    // n
    {
        sum += nums[i];

        maxSum=max(maxSum,sum);

        if(sum < 0)
            sum = 0;
    }

    return maxSum;
}
```

TC:

```
single loop → n
```

TC = **O(n)**
SC = **O(1)**

---

# Problem 3: Best Time to Buy and Sell Stock

---

## 🔴 Brute Force

```cpp
int maxProfit(vector<int>& prices)
{
    int maxProfit = 0;

    for(int i=0;i<prices.size();i++)        // n
    {
        for(int j=i+1;j<prices.size();j++)  // n
        {
            maxProfit=max(maxProfit,
            prices[j]-prices[i]);
        }
    }

    return maxProfit;
}
```

TC:

```
n × n = n²
```

TC = **O(n²)**
SC = **O(1)**

---

## 🟢 Optimized Sliding Window

```cpp
int maxProfit(vector<int>& prices)
{
    int minPrice = INT_MAX;
    int maxProfit = 0;

    for(int i=0;i<prices.size();i++)   // n
    {
        minPrice=min(minPrice,prices[i]);

        int profit = prices[i]-minPrice;

        maxProfit=max(maxProfit,profit);
    }

    return maxProfit;
}
```

TC:

```
single loop → n
```

TC = **O(n)**
SC = **O(1)**

---

# Sliding Window Identification Trick

Use sliding window when problem says:

| keyword    | meaning           |
| ---------- | ----------------- |
| substring  | string window     |
| subarray   | continuous range  |
| longest    | maximize window   |
| shortest   | minimize window   |
| continuous | window constraint |
| at most k  | shrink condition  |

---

# Sliding Window General Template

```cpp
int left = 0;

for(int right = 0; right < n; right++)   // n
{

    // include element

    while(window invalid)
    {
        left++;
    }

    update answer
}
```

TC:

```
right moves n times
left moves n times

n + n = n
```

TC = **O(n)**

---





---------------------------------------------







Below is **Sliding Window pattern (C++) with detailed DRY RUN** so you clearly see **how window moves** step-by-step.

We’ll dry run all 3 problems.

---

# 1️⃣ Longest Substring Without Repeating Characters

### Example

```
s = "abcabcbb"
```

---

## Optimized Code (Sliding Window)

```cpp
int lengthOfLongestSubstring(string s)
{
    unordered_set<char> st;

    int left = 0;
    int maxLen = 0;

    for(int right=0; right<s.size(); right++)
    {
        while(st.count(s[right]))
        {
            st.erase(s[left]);
            left++;
        }

        st.insert(s[right]);

        maxLen=max(maxLen, right-left+1);
    }

    return maxLen;
}
```

---

## Dry Run Table

| step | right | char | set                      | left | window | length |
| ---- | ----- | ---- | ------------------------ | ---- | ------ | ------ |
| 1    | 0     | a    | {a}                      | 0    | a      | 1      |
| 2    | 1     | b    | {a,b}                    | 0    | ab     | 2      |
| 3    | 2     | c    | {a,b,c}                  | 0    | abc    | 3      |
| 4    | 3     | a    | duplicate → remove a     | 1    | bca    | 3      |
| 5    | 4     | b    | duplicate → remove b     | 2    | cab    | 3      |
| 6    | 5     | c    | duplicate → remove c     | 3    | abc    | 3      |
| 7    | 6     | b    | duplicate → remove a,c,b | 5    | cb     | 2      |
| 8    | 7     | b    | duplicate → remove c,b   | 7    | b      | 1      |

Final answer = **3**

Longest substring:

```
abc
```

---

## Complexity

right pointer moves → n
left pointer moves → n

TC = O(n)
SC = O(n)

---

# 2️⃣ Maximum Subarray (Kadane)

### Example

```
nums = [-2,1,-3,4,-1,2,1,-5,4]
```

---

## Optimized Code

```cpp
int maxSubArray(vector<int>& nums)
{
    int sum = 0;
    int maxSum = INT_MIN;

    for(int i=0;i<nums.size();i++)
    {
        sum += nums[i];

        maxSum=max(maxSum,sum);

        if(sum < 0)
            sum = 0;
    }

    return maxSum;
}
```

---

## Dry Run

| i         | num | sum | maxSum |
| --------- | --- | --- | ------ |
| 0         | -2  | -2  | -2     |
| reset sum |     | 0   |        |
| 1         | 1   | 1   | 1      |
| 2         | -3  | -2  | 1      |
| reset sum |     | 0   |        |
| 3         | 4   | 4   | 4      |
| 4         | -1  | 3   | 4      |
| 5         | 2   | 5   | 5      |
| 6         | 1   | 6   | 6      |
| 7         | -5  | 1   | 6      |
| 8         | 4   | 5   | 6      |

Final answer:

```
6
```

subarray:

```
4 + (-1) + 2 + 1
```

---

## Complexity

single loop → n

TC = O(n)
SC = O(1)

---

# 3️⃣ Best Time to Buy and Sell Stock

### Example

```
prices = [7,1,5,3,6,4]
```

---

## Optimized Code

```cpp
int maxProfit(vector<int>& prices)
{
    int minPrice = INT_MAX;
    int maxProfit = 0;

    for(int i=0;i<prices.size();i++)
    {
        minPrice=min(minPrice,prices[i]);

        int profit = prices[i]-minPrice;

        maxProfit=max(maxProfit,profit);
    }

    return maxProfit;
}
```

---

## Dry Run

| day | price | minPrice | profit | maxProfit |
| --- | ----- | -------- | ------ | --------- |
| 0   | 7     | 7        | 0      | 0         |
| 1   | 1     | 1        | 0      | 0         |
| 2   | 5     | 1        | 4      | 4         |
| 3   | 3     | 1        | 2      | 4         |
| 4   | 6     | 1        | 5      | 5         |
| 5   | 4     | 1        | 3      | 5         |

Final answer:

```
5
```

buy at:

```
1
```

sell at:

```
6
```

---

# Sliding Window Visualization

Example:

```
abcabcbb
```

window movement:

```
[a]
[a b]
[a b c]
  [b c a]
    [c a b]
```

window expands →

```
right++
```

window shrinks →

```
left++
```

---

# Pattern Recognition Summary

| problem           | window logic       |
| ----------------- | ------------------ |
| longest substring | remove duplicates  |
| max subarray      | reset when sum < 0 |
| stock profit      | track minimum      |

---

If you want, next we can do:

3️⃣ HashMap pattern (very important)
4️⃣ Tree DFS dry run
5️⃣ Graph BFS dry run
6️⃣ DP pattern dry run
