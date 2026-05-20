Here is **3️⃣ HashMap / Frequency Pattern in C++** with:

✔ Brute Force → Optimized → Further optimization
✔ TC (Time Complexity) calculation
✔ SC (Space Complexity)
✔ Detailed dry run
✔ Pattern recognition

---

# HashMap Pattern Idea

Store **frequency / index / occurrence** in map

```
value → count OR index
```

Reduces search time from **O(n)** → **O(1)** lookup

---

# 1️⃣ Two Sum (Unsorted Array)

---

## 🔴 Brute Force

Check all pairs

```cpp
vector<int> twoSum(vector<int>& nums, int target)
{
    for(int i=0;i<nums.size();i++)        // n
    {
        for(int j=i+1;j<nums.size();j++)  // n
        {
            if(nums[i]+nums[j]==target)
                return {i,j};
        }
    }

    return {};
}
```

TC:

```
n × n = n²
```

TC = O(n²)
SC = O(1)

---

## 🟢 Optimized HashMap

```cpp
vector<int> twoSum(vector<int>& nums, int target)
{
    unordered_map<int,int> mp;

    for(int i=0;i<nums.size();i++)   // n
    {
        int complement = target - nums[i];

        if(mp.count(complement))
            return {mp[complement], i};

        mp[nums[i]] = i;
    }

    return {};
}
```

TC:

```
single loop → n
map lookup → O(1)
```

TC = O(n)
SC = O(n)

---

## Dry Run

```
nums = [2,7,11,15]
target = 9
```

| i | num | complement | map     | answer |
| - | --- | ---------- | ------- | ------ |
| 0 | 2   | 7          | {2:0}   |        |
| 1 | 7   | 2          | found 2 | [0,1]  |

Answer:

```
[0,1]
```

---

# 2️⃣ Valid Anagram

Check if 2 strings have same frequency

---

## 🔴 Brute Force

sort both strings

```cpp
bool isAnagram(string s, string t)
{
    sort(s.begin(),s.end());   // n log n
    sort(t.begin(),t.end());   // n log n

    return s==t;
}
```

TC:

```
sorting → n log n
```

TC = O(n log n)
SC = O(1)

---

## 🟢 Optimized HashMap frequency

```cpp
bool isAnagram(string s, string t)
{
    if(s.size()!=t.size())
        return false;

    unordered_map<char,int> mp;

    for(char c:s)    // n
        mp[c]++;

    for(char c:t)    // n
    {
        mp[c]--;

        if(mp[c]<0)
            return false;
    }

    return true;
}
```

TC:

```
n + n = 2n → n
```

TC = O(n)
SC = O(1) (26 chars)

---

## Dry Run

```
s = "anagram"
t = "nagaram"
```

frequency map:

| char | count |
| ---- | ----- |
| a    | 3     |
| n    | 1     |
| g    | 1     |
| r    | 1     |
| m    | 1     |

after checking second string → all zero → valid

Answer:

```
true
```

---

# 3️⃣ Group Anagrams

group words with same characters

---

## 🔴 Brute Force

compare every string with every string

TC:

```
n × n × k
```

very slow ❌

---

## 🟢 Optimized HashMap

key = sorted word

```cpp
vector<vector<string>> groupAnagrams(vector<string>& strs)
{
    unordered_map<string,vector<string>> mp;

    for(string s:strs)      // n
    {
        string key=s;

        sort(key.begin(),key.end());   // k log k

        mp[key].push_back(s);
    }

    vector<vector<string>> ans;

    for(auto x:mp)
        ans.push_back(x.second);

    return ans;
}
```

TC:

```
n × k log k
```

SC = O(n)

---

## Dry Run

```
["eat","tea","tan","ate","nat","bat"]
```

map:

| sorted | words       |
| ------ | ----------- |
| aet    | eat,tea,ate |
| ant    | tan,nat     |
| abt    | bat         |

Output:

```
[["eat","tea","ate"],
 ["tan","nat"],
 ["bat"]]
```

---

# 4️⃣ Longest Substring Without Repeating Characters

(HashMap optimization version)

```cpp
int lengthOfLongestSubstring(string s)
{
    unordered_map<char,int> mp;

    int left=0;
    int maxLen=0;

    for(int right=0;right<s.size();right++)   // n
    {
        if(mp.count(s[right]))
            left=max(left, mp[s[right]]+1);

        mp[s[right]]=right;

        maxLen=max(maxLen, right-left+1);
    }

    return maxLen;
}
```

TC:

```
n
```

SC = O(n)

---

## Dry Run

```
abcabcbb
```

| right | char | left | length |
| ----- | ---- | ---- | ------ |
| 0     | a    | 0    | 1      |
| 1     | b    | 0    | 2      |
| 2     | c    | 0    | 3      |
| 3     | a    | 1    | 3      |
| 4     | b    | 2    | 3      |
| 5     | c    | 3    | 3      |

Answer:

```
3
```

---

# HashMap Pattern Recognition Trick

Use HashMap when problem says:

| keyword   | pattern             |
| --------- | ------------------- |
| frequency | count chars         |
| duplicate | store seen elements |
| unique    | track visited       |
| pair sum  | complement search   |
| group     | same property       |

---

# Generic HashMap Template

```cpp
unordered_map<int,int> mp;

for(int i=0;i<n;i++)   // n
{
    if(mp.count(value))
    {
        // duplicate found
    }

    mp[value]++;
}
```

TC:

```
n
```

SC = O(n)

---

# Interview Thinking Steps

1. brute force nested loop → O(n²)
2. repeated search? → use hashmap
3. reduce lookup time → O(1)

---

Next recommended pattern:

7️⃣ Tree DFS pattern (very high probability in Amazon)

Want same detailed dry run? 🌳
