## SDE CheatSheet 

---

// commenting to test

### 1. Reverse a String

```cpp
// Function to reverse a string
string reverseString(const string &s) {
    string reversed = s;
    reverse(reversed.begin(), reversed.end());
    return reversed;
}
```

**Explanation (interview note):**

* Uses STL `reverse()` for clean and efficient reversal.
* Time Complexity: **O(n)**
* Space Complexity: **O(n)** (for the returned string).

---

### 2. Palindrome Checker

```cpp
// Function to check if a string is a palindrome
bool isPalindrome(const string &s) {
    int n = s.length();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - i - 1]) {
            return false;
        }
    }
    return true;
}

// Example usage:
// string str = "madam";
// cout << str << " is palindrome: " << (isPalindrome(str) ? "true" : "false") << endl;
```

**Explanation (interview note):**

* Compares characters from both ends until the middle.
* Convert string to all lower/upper case if case-insensitive comparison is needed.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---


### 3. Swap Two Numbers

```cpp
// Swap two numbers using arithmetic operations
void swapNumbers(int &a, int &b) {
    a = a + b;
    b = a - b;
    a = a - b;

    // Alternative method using XOR
    // a = a ^ b;
    // b = a ^ b;
    // a = a ^ b;
}

// Example usage:
// int a = 10, b = 20;
// cout << "Before: a=" << a << ", b=" << b << endl;
// swapNumbers(a, b);
// cout << "After: a=" << a << ", b=" << b << endl;
```

**Explanation (interview note):**

* **Arithmetic method** swaps without extra memory.
* **XOR method** is an alternative bitwise technique.
* Time Complexity: **O(1)**
* Space Complexity: **O(1)**

---


### 4. Finding the Largest Number

```cpp
// Function to find the largest number in an array
int findLargest(const vector<int> &numbers) {
    int maxVal = numbers[0];
    for (int i = 1; i < numbers.size(); i++) {
        if (numbers[i] > maxVal) {
            maxVal = numbers[i];
        }
    }
    return maxVal;
}

// Example usage:
// vector<int> numbers = {10, 5, 25, 8, 15, 3};
// cout << "Largest number: " << findLargest(numbers) << endl;
```

**Explanation (interview note):**

* Initialize with the first element and traverse the array, updating the max as needed.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---
Here’s the **C++ version** for finding the smallest number, formatted for your **SDE DSA Cheatsheet**:

---

### 5. Finding the Smallest Number

```cpp
// Function to find the smallest number in an array
int findSmallest(const vector<int> &numbers) {
    int minVal = numbers[0];
    for (int i = 1; i < numbers.size(); i++) {
        if (numbers[i] < minVal) {
            minVal = numbers[i];
        }
    }
    return minVal;
}

// Example usage:
// vector<int> numbers = {10, 5, 25, 8, 15, 3};
// cout << "Smallest number: " << findSmallest(numbers) << endl;
```

**Explanation (interview note):**

* Initialize with the first element, traverse the array, and update min if a smaller value is found.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---

### 5. Finding the Smallest Number

```cpp
// Function to find the smallest number in an array
int findSmallest(const vector<int> &numbers) {
    int minVal = numbers[0];
    for (int i = 1; i < numbers.size(); i++) {
        if (numbers[i] < minVal) {
            minVal = numbers[i];
        }
    }
    return minVal;
}

// Example usage:
// vector<int> numbers = {10, 5, 25, 8, 15, 3};
// cout << "Smallest number: " << findSmallest(numbers) << endl;
```

**Explanation (interview note):**

* Initialize with the first element, traverse the array, and update min if a smaller value is found.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---

### 6. Counting Vowels and Consonants

```cpp
// Function to count vowels and consonants in a string
pair<int, int> countVowelsConsonants(const string &str) {
    int vowels = 0, consonants = 0;
    for (char ch : str) {
        char lowerCh = tolower(ch);
        if (lowerCh >= 'a' && lowerCh <= 'z') {
            if (lowerCh == 'a' || lowerCh == 'e' || lowerCh == 'i' || lowerCh == 'o' || lowerCh == 'u')
                vowels++;
            else
                consonants++;
        }
    }
    return {vowels, consonants};
}

// Example usage:
// string str = "Automation World";
// auto [v, c] = countVowelsConsonants(str);
// cout << "Vowels: " << v << ", Consonants: " << c << endl;
```

**Explanation (interview note):**

* Convert to lowercase for uniformity.
* Only letters `a-z` are counted; spaces, numbers, and symbols are ignored.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---
