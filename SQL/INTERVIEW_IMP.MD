SOURCE LINK-
https://lemon-nigella-ca3.notion.site/Comprehensive-SQL-Guide-for-Freshers-and-Intermediate-Learners-177577249bdc8030a1c9decf324811fa?pvs=149

# **Comprehensive SQL Interview Preparation Notes**

---

## ✅ 1. Introduction to SQL

### 🔍 Explanation

SQL (Structured Query Language) is the standard language to interact with relational databases. It is used for querying, inserting, updating, deleting data, as well as creating and managing schema objects like tables, views, and indexes.

### 🔠 Syntax Example

```sql
SELECT column1, column2 FROM table_name WHERE condition;
```

### 📌 Use Case

```sql
SELECT Name, Age FROM Employees WHERE Age > 30;
```

### 🔥 Interview Q\&A

* **Q:** How to detect and fix SQL injection vulnerabilities?
  **A:** Test inputs like `' OR 1=1--`. Fix using prepared statements/parameterized queries and ORM frameworks.
* **Q:** How to get the 2nd highest salary without `TOP` or `LIMIT`?
  **A:**

  ```sql
  SELECT MAX(Salary) FROM Employees WHERE Salary < (SELECT MAX(Salary) FROM Employees);
  ```
* **Q:** What happens if you `SELECT *` on a BLOB column?
  **A:** Returns unreadable data or crashes client. Avoid fetching heavy binary columns unless needed.

---

## ✅ 2. SQL Data Types

### 🔍 Explanation

Columns have data types (INT, VARCHAR, DATE, BOOLEAN, etc.) defining the kind of data stored and its size.

### 🔠 Syntax Example

```sql
CREATE TABLE Employees (
    ID INT,
    Name VARCHAR(100),
    Salary DECIMAL(10,2),
    JoinDate DATE
);
```

### 📌 Use Case

```sql
INSERT INTO Employees (ID, Name, Salary, JoinDate) VALUES (1, 'Anu', 50000.00, '2023-01-01');
```

### 🔥 Interview Q\&A

* **Q:** How to store ₹10 crore with 4 decimals?
  **A:** Use `DECIMAL(14,4)`; avoid FLOAT for currency to prevent rounding errors.
* **Q:** What if you insert a string into an INT column?
  **A:** Depends on DBMS; MySQL converts `'123abc'` to `123`; some throw errors.
* **Q:** When use CHAR over VARCHAR?
  **A:** For fixed-length data like country codes (`'IN'`, `'US'`), CHAR is faster.

---

## ✅ 3. Data Definition Language (DDL)

### 🔍 Explanation

DDL commands create, alter, and drop database schema objects like tables, indexes, and constraints.

### 🔠 Syntax Example

```sql
CREATE TABLE Departments (ID INT PRIMARY KEY, Name VARCHAR(50));
ALTER TABLE Departments ADD Location VARCHAR(100);
DROP TABLE Departments;
```

### 📌 Use Case

```sql
ALTER TABLE Employees ADD CONSTRAINT chk_salary CHECK (Salary > 0);
```

### 🔥 Interview Q\&A

* **Q:** Difference between DROP, TRUNCATE, DELETE?
  **A:**

  * `DROP`: removes table and data permanently
  * `TRUNCATE`: deletes all rows, resets identity, faster but no WHERE clause
  * `DELETE`: deletes rows with WHERE, transactional
* **Q:** How to modify a column type safely?
  **A:** Use `ALTER TABLE MODIFY COLUMN`, ensure existing data compatibility first.
* **Q:** How to rename a table without data loss?
  **A:**

  ```sql
  ALTER TABLE old_name RENAME TO new_name;
  ```

---

## ✅ 4. Data Manipulation Language (DML)

### 🔍 Explanation

DML modifies data inside tables — includes INSERT, UPDATE, DELETE.

### 🔠 Syntax Example

```sql
INSERT INTO Employees VALUES (...);
UPDATE Employees SET Salary = 60000 WHERE ID = 2;
DELETE FROM Employees WHERE ID = 3;
```

### 📌 Use Case

```sql
INSERT INTO Employees (ID, Name, Salary) VALUES (5, 'Amit', 70000);
```

### 🔥 Interview Q\&A

* **Q:** How to insert data from one table to another with a condition?
  **A:**

  ```sql
  INSERT INTO HighEarners (ID, Name, Salary)
  SELECT ID, Name, Salary FROM Employees WHERE Salary > 100000;
  ```
* **Q:** Can you rollback a DELETE?
  **A:** Yes, if inside a transaction that’s not committed, use `ROLLBACK`.
* **Q:** What is MERGE?
  **A:** A command combining INSERT, UPDATE, DELETE, useful for upsert operations.

---

## ✅ 5. Data Query Language (DQL)

### 🔍 Explanation

DQL primarily includes the `SELECT` statement to read data.

### 🔠 Syntax Example

```sql
SELECT Name FROM Employees WHERE Department = 'Finance';
```

### 📌 Use Case

```sql
SELECT Department, COUNT(*) FROM Employees GROUP BY Department HAVING COUNT(*) > 5;
```

### 🔥 Interview Q\&A

* **Q:** What is the logical processing order of a SQL SELECT?
  **A:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
* **Q:** Can GROUP BY be used without aggregates?
  **A:** Yes, but usually combined with aggregate functions.
* **Q:** Difference between DISTINCT and GROUP BY?
  **A:** DISTINCT removes duplicates; GROUP BY groups rows for aggregation.

---

## ✅ 6. Aggregate Functions

### 🔍 Explanation

Functions that return a single result from multiple rows: SUM, AVG, COUNT, MIN, MAX.

### 🔠 Syntax Example

```sql
SELECT AVG(Salary) FROM Employees;
```

### 📌 Use Case

```sql
SELECT Department, SUM(Salary) FROM Employees GROUP BY Department;
```

### 🔥 Interview Q\&A

* **Q:** Why might `AVG(Salary)` return NULL?
  **A:** If all values in Salary are NULL.
* **Q:** COUNT(*) vs COUNT(column)?
  **A:** COUNT(*) counts all rows; COUNT(column) ignores NULL values.
* **Q:** Can aggregates be used in WHERE?
  **A:** No, use HAVING instead.

---

## ✅ 7. Joins

### 🔍 Explanation

Joins combine data from two or more tables based on related columns.

### 🔠 Syntax Example

```sql
SELECT e.Name, d.DeptName
FROM Employees e
INNER JOIN Departments d ON e.DeptID = d.ID;
```

### 📌 Use Case

```sql
SELECT e.Name, d.Name FROM Employees e LEFT JOIN Departments d ON e.DeptID = d.ID;
```

### 🔥 Interview Q\&A

* **Q:** Explain SELF JOIN.
  **A:** Joining a table to itself, e.g., manager and employee:

  ```sql
  SELECT A.Name AS Manager, B.Name AS Employee
  FROM Employees A JOIN Employees B ON A.ID = B.ManagerID;
  ```
* **Q:** What does LEFT JOIN return if no match?
  **A:** NULLs for right table columns.
* **Q:** Can JOIN cause Cartesian product?
  **A:** Yes, if ON condition missing or CROSS JOIN used.

---

## ✅ 8. Subqueries

### 🔍 Explanation

Queries nested inside another query, in SELECT, FROM, or WHERE.

### 🔠 Syntax Example

```sql
SELECT Name FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);
```

### 🔥 Interview Q\&A

* **Q:** Correlated vs non-correlated subquery?
  **A:** Correlated depends on outer query row; non-correlated runs once independently.
* **Q:** Can subqueries return multiple values?
  **A:** Yes, with `IN`, `ANY`, or `ALL` operators.

---

## ✅ 9. Window Functions

### 🔍 Explanation

Perform calculations across a set (window) of rows related to current row.

### 🔠 Syntax Example

```sql
SELECT Name, Salary,
RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS Rank
FROM Employees;
```

### 🔥 Interview Q\&A

* **Q:** RANK vs DENSE\_RANK vs ROW\_NUMBER?
  **A:**

  * RANK: gaps in ranking on ties
  * DENSE\_RANK: no gaps
  * ROW\_NUMBER: unique sequential numbers
* **Q:** Purpose of LAG and LEAD?
  **A:** Access previous/next row’s values within partition.

---

## ✅ 10. Common Table Expressions (CTEs)

### 🔍 Explanation

Named temporary result sets for readability and reusability in complex queries.

### 🔠 Syntax Example

```sql
WITH HighSalary AS (
  SELECT * FROM Employees WHERE Salary > 100000
)
SELECT * FROM HighSalary;
```

### 🔥 Interview Q\&A

* **Q:** What is a recursive CTE?
  **A:** CTE calling itself, useful for hierarchical data.
* **Q:** Are CTEs better than subqueries?
  **A:** Yes, for readability and reuse.

---

## ✅ 11. Transactions

### 🔍 Explanation

Group multiple SQL commands into atomic units following ACID properties.

### 🔠 Syntax Example

```sql
BEGIN TRANSACTION;
UPDATE Employees SET Salary = 80000 WHERE ID = 1;
COMMIT;
```

### 📌 Use Case

Rollback on error:

```sql
BEGIN;
UPDATE Accounts SET Balance = Balance - 1000 WHERE ID = 1;
-- error occurs
ROLLBACK;
```

### 🔥 Interview Q\&A

* **Q:** How to ensure money transfer consistency?
  **A:** Use transaction wrapping all updates with COMMIT or ROLLBACK.
* **Q:** Explain isolation levels and trade-offs.
  **A:** READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE; more isolation = less concurrency.
* **Q:** When to use SAVEPOINT?
  **A:** Partial rollbacks inside large transactions.

---

## ✅ 12. Indexing

### 🔍 Explanation

Data structures speeding up data retrieval on columns.

### 🔠 Syntax Example

```sql
CREATE INDEX idx_emp_name ON Employees(Name);
```

### 📌 Use Case

```sql
CREATE INDEX idx_multi ON Employees(DeptID, Salary);
```

### 🔥 Interview Q\&A

* **Q:** When can indexes hurt?
  **A:** Slow down inserts/updates due to extra maintenance overhead.
* **Q:** What is a covering index?
  **A:** Index contains all queried columns, so no table lookup needed.
* **Q:** Clustered vs Non-clustered index?
  **A:** Clustered changes row order (one per table), non-clustered is separate structure.

---

## ✅ 13. Views & Materialized Views

### 🔍 Explanation

* View: Virtual table defined by a query.
* Materialized View: Physical stored query result, refreshed periodically.

### 🔠 Syntax Example

```sql
CREATE VIEW ActiveEmployees AS SELECT * FROM Employees WHERE IsActive = 1;
```

### 🔥 Interview Q\&A

* **Q:** Can views be updated?
  **A:** Yes, if simple and based on one table without aggregates.
* **Q:** Use of materialized views?
  **A:** For caching expensive queries, improving performance.

---

## ✅ 14. Query Optimization

### 🔍 Explanation

Improving query speed and resource usage.

### 💡 Tips

* Use EXPLAIN to analyze query plan.
* Add selective indexes.
* Avoid `SELECT *`.

### 🔥 Interview Q\&A

* **Q:** What to look for in EXPLAIN?
  **A:** Scan type, join order, filters, sorting cost.
* **Q:** How to optimize large table queries?
  **A:** Index WHERE columns, partition tables, break queries, cache static data.

---

## ✅ 15. SQL Constraints

### 🔍 Explanation

Rules on data: PRIMARY KEY, UNIQUE, NOT NULL, CHECK, FOREIGN KEY.

### 🔠 Syntax Example

```sql
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Salary DECIMAL(10,2) CHECK (Salary > 0)
);
```

### 🔥 Interview Q\&A

* **Q:** UNIQUE vs PRIMARY KEY?
  **A:** PRIMARY KEY = UNIQUE + NOT NULL, only one per table; UNIQUE allows multiple NULLs.
* **Q:** Can CHECK refer other tables?
  **A:** No, use triggers for cross-table validation.

---

## ✅ 16. Triggers

### 🔍 Explanation

Procedures run automatically on data changes (INSERT/UPDATE/DELETE).

### 🔠 Syntax Example

```sql
CREATE TRIGGER afterInsert
AFTER INSERT ON Employees
FOR EACH ROW
BEGIN
  INSERT INTO AuditLog(...) VALUES (...);
END;
```

### 🔥 Interview Q\&A

* **Q:** Can triggers impact performance?
  **A:** Yes, especially nested triggers or heavy logic.
* **Q:** BEFORE vs AFTER triggers?
  **A:** BEFORE for validation; AFTER for logging or syncing.

---

## ✅ 17. Stored Procedures

### 🔍 Explanation

Reusable, precompiled SQL code blocks with input/output params.

### 🔠 Syntax Example

```sql
CREATE PROCEDURE GetEmployeesByDept(IN deptID INT)
BEGIN
  SELECT * FROM Employees WHERE DeptID = deptID;
END;
```

### 🔥 Interview Q\&A

* **Q:** Why stored procedures over app code?
  **A:** Performance, central logic, less network overhead, security.
* **Q:** Can procedures return result sets and output params?
  **A:** Yes, using `OUT` params and `SELECT`.

---

## ✅ 18. Recursive Queries

### 🔍 Explanation

Queries on hierarchical data, using recursive CTEs.

### 🔠 Syntax Example

```sql
WITH RECURSIVE OrgChart AS (
  SELECT ID, Name, ManagerID FROM Employees WHERE ManagerID IS NULL
  UNION ALL
  SELECT e.ID, e.Name, e.ManagerID FROM Employees e JOIN OrgChart o ON e.ManagerID = o.ID
)
SELECT * FROM OrgChart;
```

### 🔥 Interview Q\&A

* **Q:** How to avoid infinite recursion?
  **A:** Limit recursion depth or add termination conditions.
* **Q:** Use cases?
  **A:** Org charts, file systems, bill of materials, threaded comments.

---

## ✅ 19. Partitioning

### 🔍 Explanation

Splitting table data into parts to optimize query performance.

### 🔠 Syntax Example

```sql
CREATE TABLE Sales (
  ID INT,
  SaleDate DATE
)
PARTITION BY RANGE (YEAR(SaleDate)) (
  PARTITION p1 VALUES LESS THAN (2023),
  PARTITION p2 VALUES LESS THAN (2024)
);
```

### 🔥 Interview Q\&A

* **Q:** When to partition?
  **A:** Very large tables queried on range columns (e.g., date).
* **Q:** Partition types?
  **A:** RANGE, LIST, HASH, COMPOSITE.

---

## ✅ 20. JSON Support in SQL

### 🔍 Explanation

Modern DBs support JSON for semi-structured data and querying within JSON fields.

### 🔠 Syntax Example

```sql
SELECT JSON_VALUE(Details, '$.price') FROM Products;
```

### 🔥 Interview Q\&A

* **Q:** When store data as JSON?
  **A:** When schema is flexible or attributes vary often.
* **Q:** Can JSON fields be indexed?
  **A:** Yes, e.g., Postgres GIN indexes, MySQL virtual columns.

