Below are **Two Pointer problems in C++** with:

✔ **Brute Force (BF)**
✔ **Optimized using pattern**
✔ **Further optimization (if possible)**
✔ **Proper Time Complexity (TC) & Space Complexity (SC)**
✔ **Short form complexity counting (for loop based)**

---

# 1️⃣ Two Sum (Sorted Array)

## 🔴 Brute Force

Check all pairs.

```cpp
vector<int> twoSum(vector<int>& nums, int target)
{
    for(int i = 0; i < nums.size(); i++)          // runs n times
    {
        for(int j = i+1; j < nums.size(); j++)    // runs n times
        {
            if(nums[i] + nums[j] == target)
                return {i,j};
        }
    }
    return {};
}
```

### TC calculation

outer loop → n
inner loop → n

Total:

```
n * n = n²
```

TC = **O(n²)**
SC = **O(1)**

---

## 🟢 Optimized Two Pointer

```cpp
vector<int> twoSum(vector<int>& nums, int target)
{
    int l = 0;
    int r = nums.size()-1;

    while(l < r)     // runs at most n times
    {
        int sum = nums[l] + nums[r];

        if(sum == target)
            return {l,r};

        else if(sum < target)
            l++;

        else
            r--;
    }

    return {};
}
```

### TC calculation

while loop runs at most n times

TC = **O(n)**
SC = **O(1)**

---

## 🔵 Further optimization (unsorted array)

```cpp
vector<int> twoSum(vector<int>& nums, int target)
{
    unordered_map<int,int> mp;

    for(int i=0;i<nums.size();i++)   // n
    {
        int x = target - nums[i];

        if(mp.count(x))
            return {mp[x], i};

        mp[nums[i]] = i;
    }

    return {};
}
```

TC:

```
single loop → n
hashmap lookup → O(1)
```

TC = **O(n)**
SC = **O(n)**

---

# 2️⃣ Container With Most Water

## 🔴 Brute Force

```cpp
int maxArea(vector<int>& h)
{
    int ans = 0;

    for(int i=0;i<h.size();i++)        // n
    {
        for(int j=i+1;j<h.size();j++)  // n
        {
            int area =
            min(h[i],h[j])*(j-i);

            ans=max(ans,area);
        }
    }

    return ans;
}
```

TC calculation:

```
n * n = n²
```

TC = **O(n²)**
SC = **O(1)**

---

## 🟢 Optimized Two Pointer

```cpp
int maxArea(vector<int>& h)
{
    int l=0;
    int r=h.size()-1;

    int ans=0;

    while(l<r)   // n
    {
        int ht=min(h[l],h[r]);

        ans=max(ans, ht*(r-l));

        if(h[l]<h[r])
            l++;
        else
            r--;
    }

    return ans;
}
```

TC:

```
single loop → n
```

TC = **O(n)**
SC = **O(1)**

---

# 3️⃣ Palindrome Check

## 🔴 Brute Force

```cpp
bool isPalindrome(string s)
{
    string rev=s;

    reverse(rev.begin(),rev.end()); // n

    return s==rev;  // n
}
```

TC calculation:

```
reverse → n
compare → n

n + n = 2n
remove constant → n
```

TC = **O(n)**
SC = **O(n)** (extra string)

---

## 🟢 Two Pointer Optimized

```cpp
bool isPalindrome(string s)
{
    int l=0;
    int r=s.size()-1;

    while(l<r)   // n/2
    {
        if(s[l]!=s[r])
            return false;

        l++;
        r--;
    }

    return true;
}
```

TC:

```
n/2 → remove constant
```

TC = **O(n)**
SC = **O(1)**

Better space optimization ✔

---

# 4️⃣ Merge Sorted Array

## 🔴 Brute Force

```cpp
void merge(vector<int>& a,int m,
           vector<int>& b,int n)
{
    for(int i=0;i<n;i++)   // n
        a[m+i]=b[i];

    sort(a.begin(),a.end());  // n log n
}
```

TC calculation:

```
copy → n
sort → n log n

total → n log n
```

TC = **O(n log n)**
SC = **O(1)**

---

## 🟢 Two Pointer Optimized

```cpp
void merge(vector<int>& a,int m,
           vector<int>& b,int n)
{
    int i=m-1;
    int j=n-1;
    int k=m+n-1;

    while(j>=0)   // n
    {
        if(i>=0 && a[i]>b[j])
        {
            a[k]=a[i];
            i--;
        }
        else
        {
            a[k]=b[j];
            j--;
        }

        k--;
    }
}
```

TC:

```
single loop → n
```

TC = **O(n)**
SC = **O(1)**

---

# Quick Complexity Pattern Recognition

| pattern        | loops   | TC          |
| -------------- | ------- | ----------- |
| nested loop    | n × n   | n²          |
| single loop    | n       | n           |
| half loop      | n/2     | n           |
| sorting        | n log n | n log n     |
| hashmap lookup | 1       | constant    |
| recursion tree | 2ⁿ      | exponential |

---

# Short Trick to Calculate TC in interview

### for loop

```
for(i=0;i<n;i++)
```

→ O(n)

### nested loop

```
for(i)
   for(j)
```

→ O(n²)

### while(l<r)

pointer moves once each iteration

→ O(n)

---


Below is **COMPLETE 3 SUM INTERVIEW GUIDE (Amazon SDE-1)** ⭐

Includes:

✔ Brute
✔ Better (set / unordered_set / map confusion solved)
✔ Optimal (two pointer)
✔ TC explained clearly
✔ Why set vs unordered_set vs map
✔ Follow-ups with code
✔ Interview doubts clarified

Language: **C++**

---

# Problem

Find all unique triplets:

```
nums[i] + nums[j] + nums[k] = 0
```

Example:

```
[-1,0,1,2,-1,-4]
```

Answer:

```
[-1,-1,2]
[-1,0,1]
```

---

# 1️⃣ BRUTE FORCE (3 LOOPS)

## Idea

Try all triplets.

Check every combination.

---

## Code

```cpp
vector<vector<int>> threeSum(vector<int>& nums)
{
    set<vector<int>> ans;

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            for(int k=j+1;k<n;k++)
            {
                if(nums[i]+nums[j]+nums[k]==0)
                {
                    vector<int> t =
                    {nums[i],nums[j],nums[k]};

                    sort(t.begin(),t.end());

                    ans.insert(t);
                }
            }
        }
    }

    return vector<vector<int>>
           (ans.begin(),ans.end());
}
```

---

## Time Complexity (TC)

3 loops:

```
n × n × n
```

Example:

n = 100

```
100 × 100 × 100
= 1,000,000 operations
```

TC:

```
O(n³)
```

---

## Space Complexity (SC)

set stores triplets:

```
O(no. of triplets)
```

---

# 2️⃣ BETTER APPROACH (2 LOOPS + HASHING)

Convert to 2Sum problem.

Equation:

```
a + b + c = 0
```

Fix a:

```
b + c = -a
```

---

## 2A Using SET in both loops

```cpp
vector<vector<int>> threeSum(vector<int>& nums)
{
    set<vector<int>> ans;

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        set<int> seen;

        for(int j=i+1;j<n;j++)
        {
            int third =
            -(nums[i]+nums[j]);

            if(seen.find(third)
               != seen.end())
            {
                vector<int> t=
                {nums[i],nums[j],third};

                sort(t.begin(),t.end());

                ans.insert(t);
            }

            seen.insert(nums[j]);
        }
    }

    return vector<vector<int>>
           (ans.begin(),ans.end());
}
```

---

## TC calculation

Outer loop:

```
n
```

Inner loop:

```
n
```

set operations:

```
insert → log n
find → log n
```

Total:

```
n × n × log n
```

TC:

```
O(n² log n)
```

---

## SC

```
O(n)
```

---

# Why log n ?

set is implemented using balanced tree.

Height:

```
log n
```

Search takes log n time.

---

# 2B Using unordered_set (faster)

```cpp
vector<vector<int>> threeSum(vector<int>& nums)
{
    set<vector<int>> ans;

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        unordered_set<int> seen;

        for(int j=i+1;j<n;j++)
        {
            int third =
            -(nums[i]+nums[j]);

            if(seen.count(third))
            {
                vector<int> t=
                {nums[i],nums[j],third};

                sort(t.begin(),t.end());

                ans.insert(t);
            }

            seen.insert(nums[j]);
        }
    }

    return vector<vector<int>>
           (ans.begin(),ans.end());
}
```

---

## TC

unordered_set operations:

```
O(1)
```

Total:

```
O(n²)
```

---

# Why still using set for result?

Because:

```
unordered_set<vector<int>>
```

needs custom hash.

Complex to implement.

So we use:

```
set<vector<int>>
```

simple duplicate removal.

---

# SET vs UNORDERED_SET vs MAP doubt

| structure     | TC    | reason         |
| ------------- | ----- | -------------- |
| set           | log n | tree structure |
| unordered_set | 1     | hash table     |
| map           | log n | key-value      |
| unordered_map | 1     | hash table     |

---

# Why not map in 3Sum?

map stores:

```
key → value
```

We only need existence check.

So:

```
set enough
```

---

# 3️⃣ OPTIMAL APPROACH (SORT + TWO POINTER) ⭐ most asked

---

## Idea

Sort array.

Fix first number.

Use 2 pointers for remaining.

---

## Code

```cpp
vector<vector<int>> threeSum(vector<int>& nums)
{
    vector<vector<int>> ans;

    sort(nums.begin(),nums.end());

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        if(i>0 && nums[i]==nums[i-1])
            continue;

        int left=i+1;
        int right=n-1;

        while(left<right)
        {
            int sum =
            nums[i]+nums[left]+nums[right];

            if(sum==0)
            {
                ans.push_back(
                {nums[i],
                 nums[left],
                 nums[right]});

                while(left<right &&
                nums[left]==nums[left+1])
                    left++;

                while(left<right &&
                nums[right]==nums[right-1])
                    right--;

                left++;
                right--;
            }

            else if(sum<0)
                left++;

            else
                right--;
        }
    }

    return ans;
}
```

---

## TC detailed

Sorting:

```
O(n log n)
```

Outer loop:

```
n
```

Two pointer loop:

Each pointer moves only forward once.

Total moves:

```
n
```

So:

```
n × n
```

Final:

```
O(n²)
```

---

## SC

```
O(1)
```

(no extra DS)

---

# Why two pointer is O(n) not O(n²)?

Because pointer only moves in one direction.

Example:

```
left → moves forward only
right → moves backward only
```

Max moves:

```
n
```

---

# Comparison

| approach             | TC       | SC |
| -------------------- | -------- | -- |
| brute                | n³       | 1  |
| better set           | n² log n | n  |
| better unordered_set | n²       | n  |
| optimal two pointer  | n²       | 1  |

---

# FOLLOW UPS (Amazon asks frequently)

---

# 4️⃣ 3Sum Closest

Return sum closest to target.

```cpp
int threeSumClosest(vector<int>& nums,
                    int target)
{
    sort(nums.begin(),nums.end());

    int closest =
    nums[0]+nums[1]+nums[2];

    for(int i=0;i<nums.size();i++)
    {
        int l=i+1;
        int r=nums.size()-1;

        while(l<r)
        {
            int sum =
            nums[i]+nums[l]+nums[r];

            if(abs(sum-target)
               <
               abs(closest-target))
                closest=sum;

            if(sum<target)
                l++;

            else
                r--;
        }
    }

    return closest;
}
```

TC:

```
O(n²)
```

---

# 5️⃣ Count number of triplets

```cpp
int countTriplets(vector<int>& nums)
{
    sort(nums.begin(),nums.end());

    int count=0;

    for(int i=0;i<nums.size();i++)
    {
        int l=i+1;
        int r=nums.size()-1;

        while(l<r)
        {
            int sum=
            nums[i]+nums[l]+nums[r];

            if(sum==0)
            {
                count++;
                l++;
                r--;
            }

            else if(sum<0)
                l++;

            else
                r--;
        }
    }

    return count;
}
```

---

# 6️⃣ Triplets smaller than target

```cpp
int threeSumSmaller(vector<int>& nums,
                    int target)
{
    sort(nums.begin(),nums.end());

    int count=0;

    for(int i=0;i<nums.size();i++)
    {
        int l=i+1;
        int r=nums.size()-1;

        while(l<r)
        {
            int sum=
            nums[i]+nums[l]+nums[r];

            if(sum<target)
            {
                count += (r-l);
                l++;
            }

            else
                r--;
        }
    }

    return count;
}
```

---

# 7️⃣ 4 Sum

```cpp
vector<vector<int>> fourSum(
vector<int>& nums,
int target)
{
    vector<vector<int>> ans;

    sort(nums.begin(),nums.end());

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            int l=j+1;
            int r=n-1;

            while(l<r)
            {
                long sum=
                nums[i]+nums[j]
                +nums[l]+nums[r];

                if(sum==target)
                {
                    ans.push_back(
                    {nums[i],
                     nums[j],
                     nums[l],
                     nums[r]});

                    l++;
                    r--;
                }

                else if(sum<target)
                    l++;

                else
                    r--;
            }
        }
    }

    return ans;
}
```

TC:

```
O(n³)
```

---

# Interview Doubts Summary

### Why multiply TC?

Because operation happens inside loops.

```
inside loop → multiply
outside loop → add
```

---

### Why set log n?

Tree height:

```
log n
```

---

### Why unordered_set faster?

Hash lookup:

```
O(1)
```

---

### Why two pointer best?

Avoids hashing overhead.

Uses sorted property.

---

If you want, I can now give:

• Sliding Window full pattern
• 2Sum vs 3Sum vs 4Sum comparison sheet
• Top 30 Amazon array questions
• Cheat sheet PDF style notes 🚀
Here is how to **count frequency of triplets in 3Sum** (interviewer follow-up) ⭐

Instead of returning only unique triplets, we return:

```text
triplet → how many times it occurs
```

---

# Problem

Count how many times each triplet appears whose sum = 0.

Example:

```text
nums = [-1,0,1,2,-1,-4,0,1]
```

Triplets:

```text
[-1,0,1] occurs multiple times
[-1,-1,2]
```

Output:

```text
[-1,0,1] → 3 times
[-1,-1,2] → 1 time
```

---

# Idea

We use:

```cpp
map<vector<int>, int>
```

Key = triplet
Value = frequency

Steps:

1. generate triplets
2. sort each triplet
3. store in map
4. increment count

---

# Code (C++)

```cpp
map<vector<int>, int>
threeSumFrequency(
vector<int>& nums)
{
    map<vector<int>, int> freq;

    int n = nums.size();

    for(int i=0;i<n;i++)
    {
        unordered_set<int> s;

        for(int j=i+1;j<n;j++)
        {
            int third =
            -(nums[i] + nums[j]);

            if(s.find(third)
               != s.end())
            {
                vector<int> triplet =
                {nums[i],
                 nums[j],
                 third};

                sort(triplet.begin(),
                     triplet.end());

                freq[triplet]++;
            }

            s.insert(nums[j]);
        }
    }

    return freq;
}
```

---

# Dry Run

```text
nums =
[-1,0,1,2,-1,-4,0,1]
```

Possible triplets found:

```text
[-1,0,1]
[-1,0,1]
[-1,0,1]
[-1,-1,2]
```

Map stores:

```text
[-1,0,1] → 3
[-1,-1,2] → 1
```

---

# Printing result

```cpp
auto ans =
threeSumFrequency(nums);

for(auto it : ans)
{
    cout << "[ ";

    for(int x : it.first)
        cout << x << " ";

    cout << "] -> "
         << it.second
         << endl;
}
```

---

# Complexity

Outer loop:

```text
n
```

Inner loop:

```text
n
```

Sorting triplet:

```text
log 3 ≈ constant
```

Total:

```text
O(n²)
```

Space:

```text
O(n)
```

---

# When interviewer asks this variation

They want to test:

understanding of duplicates.

Example wording:

* how many unique triplets exist
* frequency of combinations
* count occurrence of each triplet
* report duplicate triplets

---

# Difference

| problem         | structure |
| --------------- | --------- |
| unique triplets | set       |
| frequency count | map       |

---

If you want, I can also give:

• 3Sum closest code
• 4Sum pattern
• most asked two pointer problems Amazon
• full array patterns cheat sheet 🚀
