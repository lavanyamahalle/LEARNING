## SDE CheatSheet 

---

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

### 7. Character Occurrence Counter

```cpp
// Function to count occurrences of each character in a string
unordered_map<char, int> countCharOccurrences(const string &str) {
    unordered_map<char, int> charCount;
    for (char ch : str) {
        charCount[ch]++;
    }
    return charCount;
}

// Example usage:
// string str = "automation";
// auto counts = countCharOccurrences(str);
// for (auto &p : counts) {
//     cout << p.first << " = " << p.second << endl;
// }
```

**Explanation (interview note):**

* Uses `unordered_map` (hash map) to store frequencies.
* Efficient for lookup and insertion.
* Time Complexity: **O(n)**
* Space Complexity: **O(k)**, where `k` is the number of unique characters.

---

### 8. Fibonacci Series 
a. Initialize - Start with 0 and 1.
b. Calculate - Next number is sum of previous two.
c. Print - Output each Fibonacci number.
d. Continue - Repeat until reaching desired count.

```cpp
// Function to generate Fibonacci series up to n terms
vector<int> generateFibonacci(int n) {
    vector<int> fib;
    if (n <= 0) return fib;
    fib.push_back(0);
    if (n == 1) return fib;
    fib.push_back(1);

    for (int i = 2; i < n; i++) {
        fib.push_back(fib[i - 1] + fib[i - 2]);
    }
    return fib;
}

// Example usage:
// int n = 10;
// auto fib = generateFibonacci(n);
// for (int num : fib) cout << num << " ";
// Output: 0 1 1 2 3 5 8 13 21 34
```

**Explanation (interview note):**

* Iterative approach, efficient for generating sequence.
* Time Complexity: **O(n)**
* Space Complexity: **O(n)** (to store sequence).


---

### 9. Factorial Calculation

a. Loop Method : Use iteration to multiply numbers. 
b. Recursive Method : Function calls itself with decremented value. 
c.  Base Case: Factorial of 0 or 1 is 1.

```cpp
// Iterative method for factorial
int factorialIterative(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive method for factorial
int factorialRecursive(int n) {
    if (n == 0 || n == 1) return 1;
    return n * factorialRecursive(n - 1);
}

// Example usage:
// int num = 5;
// cout << "Factorial of " << num << " (loop): " << factorialIterative(num) << endl;
// cout << "Factorial of " << num << " (recursive): " << factorialRecursive(num) << endl;
// Output: 120
```

**Explanation (interview note):**

* **Iterative Method:** Simple loop multiplication.
* **Recursive Method:** Breaks problem into smaller subproblems with base case.
* Time Complexity: **O(n)** for both.
* Space Complexity: **O(1)** iterative, **O(n)** recursive (stack calls).

---


### 10. Prime Number Check

```cpp
// Function to check if a number is prime
bool isPrime(int num) {
    if (num <= 1) return false;
    if (num == 2) return true;        // 2 is the only even prime
    if (num % 2 == 0) return false;   // eliminate other even numbers
    
    for (int i = 3; i * i <= num; i += 2) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}

// Example usage:
// int num = 17;
// cout << num << " is prime: " << (isPrime(num) ? "true" : "false") << endl;
// Output: 17 is prime: true
```

**Explanation (interview note):**

* Handle edge cases: numbers ≤ 1 are not prime, `2` is prime.
* Only check divisors up to `sqrt(num)` for efficiency.
* Skip even numbers after checking `2`.
* Time Complexity: **O(√n)**
* Space Complexity: **O(1)**

---


### 11. Sum of Digits

```cpp
// Function to calculate sum of digits of a number
int sumOfDigits(int number) {
    int sum = 0;
    while (number > 0) {
        sum += number % 10;   // extract last digit
        number /= 10;         // remove last digit
    }
    return sum;
}

// Example usage:
// int number = 12345;
// cout << "Sum of digits: " << sumOfDigits(number) << endl;
// Output: 15
```

**Explanation (interview note):**

* Uses modulo (`% 10`) to get last digit.
* Uses integer division (`/ 10`) to remove last digit.
* Time Complexity: **O(d)**, where `d` is number of digits.
* Space Complexity: **O(1)**

---


### 12. Remove Duplicates from Array

```cpp
// Function to remove duplicates using unordered_set
vector<int> removeDuplicates(const vector<int> &numbers) {
    unordered_set<int> uniqueSet(numbers.begin(), numbers.end());
    vector<int> uniqueNumbers(uniqueSet.begin(), uniqueSet.end());
    return uniqueNumbers;
}

// Example usage:
// vector<int> numbers = {1, 2, 3, 2, 5, 1, 6, 3, 7};
// auto uniqueNumbers = removeDuplicates(numbers);
// cout << "Original: ";
// for (int n : numbers) cout << n << " ";
// cout << "\nWithout duplicates: ";
// for (int n : uniqueNumbers) cout << n << " ";
// Output (order may vary): 1 2 3 5 6 7
```
OR 
```cpp 
vector<int> removeDuplicates(const vector<int> &numbers) {
    unordered_set<int> seen;
    vector<int> uniqueNumbers;

    for (int num : numbers) {
        if (seen.find(num) == seen.end()) { // not seen before
            uniqueNumbers.push_back(num);
            seen.insert(num);
        }
    }
    return uniqueNumbers;
}
```
**Explanation (interview note):**

* `unordered_set` automatically removes duplicates.
* In C++, order is **not guaranteed** when using `unordered_set`.
* To preserve sorted unique elements, use `set` instead.

**optimal approach :** 
* Explanation (interview note):
* Uses unordered_set for O(1) average lookup.
* Preserves the original order in the result.
* Time Complexity: O(n)
* Space Complexity: O(n)

---


### 13. Reverse Words in String

```cpp
// Function to reverse each word in a sentence
string reverseWords(const string &sentence) {
    stringstream ss(sentence);
    string word, result;

    while (ss >> word) {
        reverse(word.begin(), word.end());   // reverse each word
        result += word + " ";
    }

    if (!result.empty()) result.pop_back(); // remove trailing space
    return result;
}

// Example usage:
// string sentence = "Java Coding Interview";
// cout << "Original: " << sentence << endl;
// cout << "Reversed words: " << reverseWords(sentence) << endl;
// Output:
// Original: Java Coding Interview
// Reversed words: avaJ gnidoC weivretni
```

**Explanation (interview note):**

* Uses `stringstream` to split by spaces.
* Reverses each word individually with `reverse()`.
* Time Complexity: **O(n)**
* Space Complexity: **O(n)**

---

### 14. Find Even and Odd Numbers


```cpp

int num = 7; // example number

if (num % 2 == 0) {
    cout << num << " is even" << endl;
} else {
    cout << num << " is odd" << endl;
}

// Output: 7 is odd
OR 
// Function to separate even and odd numbers from an array
pair<vector<int>, vector<int>> separateEvenOdd(const vector<int> &numbers) {
    vector<int> even, odd;
    for (int num : numbers) {
        if (num % 2 == 0)
            even.push_back(num);
        else
            odd.push_back(num);
    }
    return {even, odd};
}

// Example usage:
// vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9};
// auto [even, odd] = separateEvenOdd(numbers);
// cout << "Even numbers: ";
// for (int n : even) cout << n << " ";
// cout << "\nOdd numbers: ";
// for (int n : odd) cout << n << " ";
```

**Explanation (interview note):**

* Iterates once through the array, separating numbers based on `num % 2`.
* Time Complexity: **O(n)**
* Space Complexity: **O(n)**

---

### 15. String Length Without `length()`

```cpp
// Function to find string length manually
int stringLength(const string &str) {
    int length = 0;
    for (char ch : str) {
        length++; // increment for each character
    }
    return length;
}

// Example usage:
// string str = "automation";
// cout << "Length of string: " << stringLength(str) << endl;
// Output: 10
```

**Explanation (interview note):**

* Iterates through each character, counting manually.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**
* Avoids using built-in `length()` or `size()`.

---

### 16. String to Integer and Integer to String

```cpp
// String to Integer
string numStr = "12345";
int num = stoi(numStr);  // stoi converts string to int
cout << "String to Integer: " << num << endl;

// Integer to String
int number = 12345;
string str = to_string(number);  // to_string converts int to string
cout << "Integer to String: " << str << endl;

// Output:
// String to Integer: 12345
// Integer to String: 12345
```

**Explanation (interview note):**

* `stoi(str)` → converts string to integer
* `to_string(num)` → converts integer to string
* Time Complexity: **O(n)** where `n` is string length for `stoi`
* Space Complexity: **O(1)** for primitive conversion


### string->int (WITHOUT FUNCTION)

```cpp
// String to Integer manually
string numStr = "12345";
int num = 0;
for (char ch : numStr) {
    num = num * 10 + (ch - '0');  // convert char to digit and build number
}
cout << "String to Integer: " << num << endl;

// Integer to String manually
int number = 12345;
string str = "";
int temp = number;
if (temp == 0) str = "0";
while (temp > 0) {
    char digit = (temp % 10) + '0';  // convert digit to char
    str = digit + str;                // prepend to string
    temp /= 10;
}
cout << "Integer to String: " << str << endl;

// Output:
// String to Integer: 12345
// Integer to String: 12345
```

**Explanation (interview note):**

* **String → Integer:** Multiply accumulator by 10 and add digit value.
* **Integer → String:** Extract digits using `% 10`, convert to char, and prepend.
* Time Complexity: **O(n)**, Space Complexity: **O(n)** for integer → string conversion.

---


### 17. Print Elements at Even/Odd Indexes

```cpp
// Example array
vector<string> elements = {"Java", "Selenium", "TestNG", "Maven", "Jenkins", "Docker"};

// Print elements at even indexes
cout << "Even index elements: ";
for (int i = 0; i < elements.size(); i += 2) {
    cout << elements[i] << " ";
}
cout << endl;

// Print elements at odd indexes
cout << "Odd index elements: ";
for (int i = 1; i < elements.size(); i += 2) {
    cout << elements[i] << " ";
}
cout << endl;

// Output:
// Even index elements: Java TestNG Jenkins
// Odd index elements: Selenium Maven Docker
```

**Explanation (interview note):**

* Array indexes start at 0 → even index is `i % 2 == 0`.
* Loop with step 2 avoids extra `if` checks.
* Time Complexity: **O(n)**, Space Complexity: **O(1)**

---

### 18. Array Reversal

```cpp
// Example array
vector<int> array = {1, 2, 3, 4, 5};

// Print original array
cout << "Original: ";
for (int num : array) cout << num << " ";
cout << endl;

// Reverse array in-place using two pointers
int start = 0, end = array.size() - 1;
while (start < end) {
    swap(array[start], array[end]);  // swap elements
    start++;
    end--;
}

// Print reversed array
cout << "Reversed: ";
for (int num : array) cout << num << " ";
cout << endl;

// Output:
// Original: 1 2 3 4 5
// Reversed: 5 4 3 2 1
```

**Explanation (interview note):**

* Uses **two-pointer technique** for in-place reversal.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**
* Avoids creating a new array for better space efficiency.

---
### 19. Check if Array is Sorted

```cpp
// Function to check if array is sorted in ascending order
bool isSorted(const vector<int> &array) {
    for (int i = 0; i < array.size() - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}

// Example usage:
// vector<int> array1 = {1, 2, 4, 7, 9};    // Sorted
// vector<int> array2 = {11, 5, 3, 7, 9};   // Unsorted
// cout << "Array1 is sorted: " << (isSorted(array1) ? "true" : "false") << endl;
// cout << "Array2 is sorted: " << (isSorted(array2) ? "true" : "false") << endl;

// Output:
// Array1 is sorted: true
// Array2 is sorted: false
```

**Explanation (interview note):**

* Traverse the array once, compare each element with the next.
* Return false immediately if any element violates ascending order.
* Time Complexity: **O(n)**
* Space Complexity: **O(1)**

---
### 20. Case Conversion

```cpp
// Function to convert uppercase to lowercase and vice versa
string convertCase(const string &input) {
    string result = "";
    for (char c : input) {
        if (c >= 'A' && c <= 'Z') {
            result += c + 32;   // Uppercase → Lowercase
        } else if (c >= 'a' && c <= 'z') {
            result += c - 32;   // Lowercase → Uppercase
        } else {
            result += c;        // Non-alphabetic characters remain unchanged
        }
    }
    return result;
}

// Example usage:
// string input = "Java Programming";
// cout << "Original: " << input << endl;
// cout << "Case converted: " << convertCase(input) << endl;

// Output:
// Original: Java Programming
// Case converted: jAVA pROGRAMMING
```

**Explanation (interview note):**

* Uses ASCII difference `32` between uppercase (`A-Z`) and lowercase (`a-z`).
* Non-alphabet characters remain unchanged.
* Time Complexity: **O(n)**, Space Complexity: **O(n)**

---
