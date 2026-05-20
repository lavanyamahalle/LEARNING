# 🚀 TOP SQL INTERVIEW QUESTIONS — Complete Answers

> **Tables used:** `Employees`, `Departments`, `Customers`, `Orders`, `Users`

---

## 💥 Section 1: Duplicate / Data Cleaning

---

### Q1. Find duplicate records in a table

```sql
SELECT name, salary, dept_id, manager_id, COUNT(*) AS cnt
FROM Employees
GROUP BY name, salary, dept_id, manager_id
HAVING COUNT(*) > 1;
```

---

### Q2. Find duplicate emails

```sql
SELECT email, COUNT(*) AS cnt
FROM Users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### Q3. Delete duplicate rows but keep one

```sql
-- Keep the row with the lowest user_id
DELETE FROM Users
WHERE user_id NOT IN (
    SELECT MIN(user_id)
    FROM Users
    GROUP BY name, email
);
```

> **PostgreSQL / MySQL 8+ alternative using CTE:**
```sql
WITH cte AS (
    SELECT user_id,
           ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY user_id) AS rn
    FROM Users
)
DELETE FROM Users
WHERE user_id IN (SELECT user_id FROM cte WHERE rn > 1);
```

---

### Q4. Find records that appear only once

```sql
SELECT email
FROM Users
GROUP BY email
HAVING COUNT(*) = 1;
```

---

### Q5. Remove duplicates using window function

```sql
WITH cte AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY user_id) AS rn
    FROM Users
)
SELECT user_id, name, email
FROM cte
WHERE rn = 1;
```

---

## ⚡ Section 2: Joins

---

### Q6. Customers who never placed orders

```sql
SELECT c.cust_id, c.name
FROM Customers c
LEFT JOIN Orders o ON c.cust_id = o.cust_id
WHERE o.order_id IS NULL;
```

---

### Q7. Employees who don't have managers

```sql
SELECT emp_id, name
FROM Employees
WHERE manager_id IS NULL;
```

---

### Q8. Employees earning more than their managers

```sql
SELECT e.emp_id, e.name AS employee, e.salary AS emp_salary,
       m.name AS manager, m.salary AS mgr_salary
FROM Employees e
JOIN Employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
```

---

### Q9. Departments with no employees

```sql
SELECT d.dept_id, d.dept_name
FROM Departments d
LEFT JOIN Employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;
```

---

### Q10. Find all employees and their managers (self join)

```sql
SELECT e.emp_id, e.name AS employee,
       m.name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.emp_id;
```

---

## 🧠 Section 3: Salary / Ranking

---

### Q11. Second highest salary

```sql
SELECT MAX(salary) AS second_highest
FROM Employees
WHERE salary < (SELECT MAX(salary) FROM Employees);
```

> **Alternative using LIMIT/OFFSET:**
```sql
SELECT DISTINCT salary
FROM Employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

---

### Q12. Nth highest salary

```sql
-- Replace N with the desired rank (e.g., 3 for 3rd highest)
SELECT DISTINCT salary
FROM Employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;
```

> **Using Dense Rank (more reliable):**
```sql
WITH ranked AS (
    SELECT salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM Employees
)
SELECT salary
FROM ranked
WHERE rnk = N;  -- Replace N
```

---

### Q13. Top 3 salaries in each department

```sql
WITH ranked AS (
    SELECT emp_id, name, salary, dept_id,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
    FROM Employees
)
SELECT emp_id, name, salary, dept_id
FROM ranked
WHERE rnk <= 3;
```

---

### Q14. Highest salary in each department

```sql
SELECT dept_id, MAX(salary) AS max_salary
FROM Employees
GROUP BY dept_id;
```

> **With employee name:**
```sql
WITH ranked AS (
    SELECT emp_id, name, salary, dept_id,
           RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
    FROM Employees
)
SELECT emp_id, name, salary, dept_id
FROM ranked
WHERE rnk = 1;
```

---

### Q15. Employees whose salary is above department average

```sql
SELECT e.emp_id, e.name, e.salary, e.dept_id
FROM Employees e
JOIN (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM Employees
    GROUP BY dept_id
) dept_avg ON e.dept_id = dept_avg.dept_id
WHERE e.salary > dept_avg.avg_sal;
```

---

## 🪄 Section 4: Window Functions

---

### Q16. Assign row number to each employee

```sql
SELECT emp_id, name, salary,
       ROW_NUMBER() OVER (ORDER BY emp_id) AS row_num
FROM Employees;
```

---

### Q17. Rank employees by salary

```sql
SELECT emp_id, name, salary,
       RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM Employees;
```

---

### Q18. Dense rank employees

```sql
SELECT emp_id, name, salary,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM Employees;
```

> **RANK vs DENSE_RANK:** `RANK` skips numbers after ties; `DENSE_RANK` does not.

---

### Q19. Running total of salaries

```sql
SELECT emp_id, name, salary,
       SUM(salary) OVER (ORDER BY emp_id) AS running_total
FROM Employees;
```

---

### Q20. Find first record per group

```sql
WITH cte AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY emp_id) AS rn
    FROM Employees
)
SELECT emp_id, name, salary, dept_id
FROM cte
WHERE rn = 1;
```

---

### Q21. Find latest record per group

```sql
-- Latest order per customer
WITH cte AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY cust_id ORDER BY order_date DESC) AS rn
    FROM Orders
)
SELECT order_id, cust_id, amount, order_date
FROM cte
WHERE rn = 1;
```

---

### Q22. Find difference between consecutive rows (LAG)

```sql
SELECT emp_id, name, salary,
       LAG(salary) OVER (ORDER BY salary) AS prev_salary,
       salary - LAG(salary) OVER (ORDER BY salary) AS diff
FROM Employees;
```

---

### Q23. Find consecutive duplicate rows

```sql
WITH cte AS (
    SELECT *,
           LAG(name) OVER (ORDER BY emp_id) AS prev_name
    FROM Employees
)
SELECT *
FROM cte
WHERE name = prev_name;
```

---

## 🔥 Section 5: Real OA / Advanced Patterns

---

### Q24. Find customers with highest total purchase

```sql
SELECT c.name, SUM(o.amount) AS total_purchase
FROM Customers c
JOIN Orders o ON c.cust_id = o.cust_id
GROUP BY c.cust_id, c.name
ORDER BY total_purchase DESC
LIMIT 1;
```

---

### Q25. Find customers who made more than 1 order in a day

```sql
SELECT cust_id, order_date, COUNT(*) AS order_count
FROM Orders
GROUP BY cust_id, order_date
HAVING COUNT(*) > 1;
```

---

### Q26. Find percentage contribution of each row

```sql
SELECT emp_id, name, salary,
       ROUND(salary * 100.0 / SUM(salary) OVER (), 2) AS pct_contribution
FROM Employees;
```

---

### Q27. Find median salary

```sql
-- Works in MySQL 8+ / PostgreSQL
WITH ranked AS (
    SELECT salary,
           ROW_NUMBER() OVER (ORDER BY salary) AS rn,
           COUNT(*) OVER () AS total
    FROM Employees
)
SELECT AVG(salary) AS median_salary
FROM ranked
WHERE rn IN (FLOOR((total + 1) / 2), CEIL((total + 1) / 2));
```

---

### Q28. Find employees working in same department as 'Alice'

```sql
SELECT e.emp_id, e.name, e.dept_id
FROM Employees e
WHERE e.dept_id = (
    SELECT dept_id FROM Employees WHERE name = 'Alice'
)
AND e.name <> 'Alice';
```

---

### Q29. Find gaps in sequence (missing IDs)

```sql
-- Find missing order_ids between min and max
SELECT seq.id AS missing_id
FROM (
    SELECT generate_series(MIN(order_id), MAX(order_id)) AS id
    FROM Orders
) seq
LEFT JOIN Orders o ON seq.id = o.order_id
WHERE o.order_id IS NULL;
```

> **MySQL version:**
```sql
WITH RECURSIVE seq AS (
    SELECT MIN(order_id) AS id FROM Orders
    UNION ALL
    SELECT id + 1 FROM seq WHERE id < (SELECT MAX(order_id) FROM Orders)
)
SELECT seq.id AS missing_id
FROM seq
LEFT JOIN Orders o ON seq.id = o.order_id
WHERE o.order_id IS NULL;
```

---

### Q30. Find records with no matching entry in another table

```sql
-- Customers with no orders
SELECT c.cust_id, c.name
FROM Customers c
LEFT JOIN Orders o ON c.cust_id = o.cust_id
WHERE o.order_id IS NULL;
```

---

## 🔥 More Join Questions

---

### Q31. Customers who placed orders but never placed an order above 5000

```sql
SELECT DISTINCT c.cust_id, c.name
FROM Customers c
JOIN Orders o ON c.cust_id = o.cust_id
WHERE c.cust_id NOT IN (
    SELECT cust_id FROM Orders WHERE amount > 5000
);
```

---

### Q32. Employees working in departments with name 'IT'

```sql
SELECT e.emp_id, e.name, e.salary
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_name = 'IT';
```

---

### Q33. Find employees along with number of orders placed by their customers

> *(Assumes emp_id maps to cust_id for demonstration)*

```sql
SELECT e.emp_id, e.name AS employee,
       COUNT(o.order_id) AS total_orders
FROM Employees e
LEFT JOIN Orders o ON e.emp_id = o.cust_id
GROUP BY e.emp_id, e.name;
```

---

### Q34. Find customers who placed orders on consecutive days

```sql
WITH ordered AS (
    SELECT cust_id, order_date,
           LAG(order_date) OVER (PARTITION BY cust_id ORDER BY order_date) AS prev_date
    FROM Orders
)
SELECT DISTINCT cust_id
FROM ordered
WHERE DATEDIFF(order_date, prev_date) = 1;
```

> **PostgreSQL:**
```sql
WHERE order_date - prev_date = 1
```

---

### Q35. Find employees who share the same manager

```sql
SELECT e1.name AS emp1, e2.name AS emp2, e1.manager_id
FROM Employees e1
JOIN Employees e2
  ON e1.manager_id = e2.manager_id
 AND e1.emp_id < e2.emp_id;
```

---

## 🔥 More Salary / Ranking Questions

---

### Q36. Find employees with the same salary

```sql
SELECT e1.name AS emp1, e2.name AS emp2, e1.salary
FROM Employees e1
JOIN Employees e2
  ON e1.salary = e2.salary
 AND e1.emp_id < e2.emp_id;
```

---

### Q37. Find the 2nd lowest salary

```sql
SELECT MIN(salary) AS second_lowest
FROM Employees
WHERE salary > (SELECT MIN(salary) FROM Employees);
```

> **Alternative:**
```sql
SELECT DISTINCT salary
FROM Employees
ORDER BY salary ASC
LIMIT 1 OFFSET 1;
```

---

### Q38. Find employees whose salary is in top 10%

```sql
SELECT emp_id, name, salary
FROM Employees
WHERE salary >= (
    SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY salary)
    FROM Employees
);
```

> **MySQL alternative:**
```sql
WITH stats AS (
    SELECT salary,
           PERCENT_RANK() OVER (ORDER BY salary) AS pct
    FROM Employees
)
SELECT e.emp_id, e.name, e.salary
FROM Employees e
JOIN stats s ON e.salary = s.salary
WHERE s.pct >= 0.9;
```

---

### Q39. Find department-wise median salary

```sql
WITH ranked AS (
    SELECT dept_id, salary,
           ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary) AS rn,
           COUNT(*) OVER (PARTITION BY dept_id) AS total
    FROM Employees
)
SELECT dept_id, AVG(salary) AS median_salary
FROM ranked
WHERE rn IN (FLOOR((total + 1) / 2), CEIL((total + 1) / 2))
GROUP BY dept_id;
```

---

### Q40. Find employees whose salary is greater than at least 3 other employees

```sql
SELECT e1.emp_id, e1.name, e1.salary
FROM Employees e1
WHERE (
    SELECT COUNT(*)
    FROM Employees e2
    WHERE e2.salary < e1.salary
) >= 3;
```

---

## 🧱 Setup: Create Tables & Insert Data

```sql
-- Create Tables
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT,
    dept_id INT,
    manager_id INT
);

CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE Customers (
    cust_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    cust_id INT,
    amount INT,
    order_date DATE
);

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

-- Insert Data
INSERT INTO Employees VALUES
(1, 'Alice', 70000, 101, 3),
(2, 'Bob', 60000, 101, 3),
(3, 'Charlie', 90000, 101, NULL),
(4, 'David', 80000, 102, 6),
(5, 'Eva', 75000, 102, 6),
(6, 'Frank', 95000, 102, NULL),
(7, 'Grace', 50000, 103, NULL);

INSERT INTO Departments VALUES
(101, 'HR'),
(102, 'IT'),
(103, 'Finance'),
(104, 'Marketing');

INSERT INTO Customers VALUES
(1, 'Raj'),
(2, 'Simran'),
(3, 'Aman'),
(4, 'Priya'),
(5, 'Karan');

INSERT INTO Orders VALUES
(101, 1, 5000, '2024-01-10'),
(102, 1, 7000, '2024-02-15'),
(103, 2, 3000, '2024-03-12'),
(104, 3, 10000, '2024-01-05'),
(105, 3, 2000, '2024-04-20'),
(106, 4, 8000, '2024-02-25');

INSERT INTO Users VALUES
(1, 'A', 'a@gmail.com'),
(2, 'B', 'b@gmail.com'),
(3, 'C', 'c@gmail.com'),
(4, 'A', 'a@gmail.com'),
(5, 'D', 'd@gmail.com'),
(6, 'E', 'e@gmail.com'),
(7, 'B', 'b@gmail.com');
```

---

*All queries written for MySQL 8+ / PostgreSQL compatibility. Minor syntax differences noted inline.*
