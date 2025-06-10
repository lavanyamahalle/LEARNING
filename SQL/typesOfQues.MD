
---

## ✅ Basic MySQL Interview Questions

---

### **1. What is a database, and how is it different from a DBMS?**

* **Database**: A container that stores organized data for retrieval, update, and analysis.
  *Example:* Social media stores likes and comments in databases.

* **DBMS (Database Management System)**: Software that manages databases and provides interfaces for data operations.
  *Examples:* MySQL, PostgreSQL, MongoDB.

---

### **2. How does MySQL differ from other RDBMSs?**

* **MySQL** is open-source, fast, and widely used in web applications.
* **Differences**:

  * **Simplicity & Speed**: Great for quick development and deployment.
  * **Storage Engines**: Offers flexibility (e.g., InnoDB, MyISAM).
  * **Limitations**: Lacks some advanced features found in PostgreSQL (e.g., full ACID compliance, rich indexing).

---

### **3. What are the main data types in MySQL?**

* **Numeric**: `INT`, `DECIMAL`, `FLOAT`, `DOUBLE`
* **String**: `CHAR`, `VARCHAR`, `TEXT`, `BLOB`
* **Date/Time**: `DATE`, `DATETIME`, `TIMESTAMP`, `TIME`
* **JSON**: For storing structured JSON data

---

### **4. Difference between `INT` and `DECIMAL` data types?**

* `INT`: Stores whole numbers (e.g., 1, 250)
* `DECIMAL`: Stores precise decimal values — ideal for **financial data**
  *Example:* `DECIMAL(10,2)` stores `12345678.90`

---

### **5. Difference between `DATE` and `DATETIME`?**

* `DATE`: Format `YYYY-MM-DD` (e.g., `2025-06-09`)
* `DATETIME`: Includes time, `YYYY-MM-DD HH:MM:SS` (e.g., `2025-06-09 14:30:00`)

---

### **6. What is a foreign key?**

A **foreign key** links records between tables.
**Example**:

```sql
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

---

### **7. JOIN Types in MySQL**

| JOIN Type    | Description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `INNER JOIN` | Returns records with matches in both tables                                                        |
| `LEFT JOIN`  | All rows from left table + matching right rows                                                     |
| `RIGHT JOIN` | All rows from right table + matching left rows                                                     |
| `FULL JOIN`  | All rows from both tables (Note: not natively supported in MySQL but can be emulated with `UNION`) |

---

### **8. Difference: `DELETE` vs `TRUNCATE` vs `DROP`**

| Command    | Function                  | Rollback Possible | Keeps Structure? |
| ---------- | ------------------------- | ----------------- | ---------------- |
| `DELETE`   | Deletes specific rows     | ✅ Yes             | ✅ Yes            |
| `TRUNCATE` | Deletes all rows quickly  | ❌ No              | ✅ Yes            |
| `DROP`     | Deletes table & structure | ❌ No              | ❌ No             |

---

### **9. How to Create and Modify Tables**

**Create Table**:

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  department VARCHAR(50)
);
```

**Add a Column**:

```sql
ALTER TABLE employees ADD COLUMN salary DECIMAL(10, 2);
```

---

### **10. What is a Temporary Table?**

A **temporary table** exists only for the session that created it.
**Example**:

```sql
CREATE TEMPORARY TABLE temp_employees (
  id INT,
  name VARCHAR(50)
);
INSERT INTO temp_employees VALUES (1, 'John Doe');
SELECT * FROM temp_employees;
```

---

### **11. What is a Subquery?**

A **subquery** is a query inside another query.
**Example**:

```sql
SELECT first_name, salary 
FROM employees 
WHERE salary > (
  SELECT AVG(salary) 
  FROM employees
);
```

---

### **12. How to Use `INSERT` and Best Practices**

**Syntax**:

```sql
INSERT INTO table_name (col1, col2) VALUES ('val1', 'val2');
```

**Best Practices**:

* Always specify column names.
* Skip `AUTO_INCREMENT` columns.
* Use consistent quotes (`'value'`).
* Insert multiple rows together for efficiency.

---

### **13. What is `AUTO_INCREMENT`?**

Automatically generates unique values (usually for primary keys).
**Example**:

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);
```

---

### **14. What is a View in MySQL?**

A **view** is a saved SQL query that acts like a virtual table.

**Example**:

```sql
CREATE VIEW employee_details AS
SELECT e.id, e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
```

Use it like a table:

```sql
SELECT * FROM employee_details;
```

📝 *Note: Most views are read-only.*

---

## 🧠 Intermediate MySQL Interview Questions

---

### **15. What are System-Versioned Tables?**

Used to **track changes** over time.

They use:

* `StartTime`: When the row became valid
* `EndTime`: When the row was replaced/removed

**Operations**:

* **Insert**: Adds new row with current timestamp.
* **Update**: Old row gets `EndTime`, new row inserted.
* **Delete**: Updates `EndTime` to mark row as expired.

**Query Example**:

```sql
SELECT * FROM employees 
FOR SYSTEM_TIME AS OF '2024-01-01';
```

---

### **16. What are MySQL Transactions?**

A **transaction** is a group of SQL operations treated as a single unit.

**Syntax**:

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

COMMIT;   -- Save changes
-- or
ROLLBACK; -- Undo if error
```

📌 *Transactions ensure consistency and data integrity.*

---

## ✅ **17. What is a Default Constraint in MySQL? How to Set a Default Value?**

A **default constraint** assigns a pre-defined value to a column if no value is provided during an `INSERT`.

### 🔹 Example:

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    status VARCHAR(10) DEFAULT 'active'
);
```

### 🔹 Insert Without Specifying `status`:

```sql
INSERT INTO employees (name) VALUES ('John Doe');
```

### ✅ Benefits:

* Reduces chances of `NULL` or invalid entries.
* Simplifies queries by eliminating checks for missing values.

---

## ✅ **19. How Do You Use String Functions in SQL to Manage Text?**

### 🔹 Common String Functions:

| Function              | Description                      |
| --------------------- | -------------------------------- |
| `LENGTH()`            | Returns number of characters.    |
| `UPPER()` / `LOWER()` | Converts to uppercase/lowercase. |
| `CONCAT()`            | Joins multiple strings.          |
| `SUBSTRING()`         | Extracts part of the string.     |
| `TRIM()`              | Removes extra spaces.            |
| `REPLACE()`           | Substitutes characters.          |

### 🔹 Example Query:

```sql
SELECT 
    UPPER(first_name) AS upper_name,
    CONCAT(first_name, ' ', last_name) AS full_name,
    SUBSTRING(birthdate, 6, 2) AS birth_month,
    TRIM(last_name) AS trimmed_last_name,
    REPLACE(first_name, 'a', '@') AS replaced_name
FROM employees;
```

---

## ✅ **20. How to Update a Specific Row in SQL?**

Use the `UPDATE` statement with a `WHERE` clause.

### 🔹 Example:

```sql
UPDATE movies
SET genre = 'Sci-Fi'
WHERE movie_title = 'Inception' AND year = 2010;
```

---

## ✅ **21. What is a Trigger in MySQL? How Do You Implement One?**

A **trigger** is a stored operation that runs **before or after** an event like `INSERT`, `UPDATE`, or `DELETE`.

### 🔹 Example:

```sql
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    INSERT INTO order_history (order_id, action, timestamp)
    VALUES (NEW.order_id, 'inserted', NOW());
END;
```

---

## ✅ **22. Why Does Adding an Index Make Queries Faster?**

Indexes allow **fast lookup** of rows using data structures like B-Trees.

### 🔹 Example:

```sql
CREATE INDEX idx_last_name ON employees(last_name);
```

### ⚠️ Drawbacks:

* Slower `INSERT`/`UPDATE` operations.
* Increased storage use.

---

## ✅ **23. Which Data Types are Used for Weight and Price?**

| Attribute | Data Type         | Reason                                        |
| --------- | ----------------- | --------------------------------------------- |
| Weight    | `FLOAT` or `REAL` | Allows approximate decimal values.            |
| Price     | `DECIMAL(10,2)`   | Ensures precision and avoids rounding errors. |

---

## ✅ **24. How to Find Duplicate Rows Using a Window Function?**

### 🔹 Example:

```sql
WITH DuplicateCheck AS (
    SELECT 
        product_name,
        category,
        ROW_NUMBER() OVER (
            PARTITION BY product_name, category 
            ORDER BY id
        ) AS row_num
    FROM sales
)
SELECT *
FROM DuplicateCheck
WHERE row_num > 1;
```

Duplicates have `row_num > 1`.

---

## ✅ **25. How to Create and Use a Stored Procedure With Parameters?**

### 🔹 1. Procedure with Input Parameter:

```sql
CREATE PROCEDURE get_student_info(IN age INT)
BEGIN
    SELECT * FROM student WHERE student.age = age;
END;
```

Call:

```sql
CALL get_student_info(21);
```

---

### 🔹 2. Procedure with Output Parameter:

```sql
CREATE PROCEDURE count_students_by_age(IN age INT, OUT student_count INT)
BEGIN
    SELECT COUNT(*) INTO student_count FROM students WHERE students.age = age;
END;
```

Usage:

```sql
SET @count = 0;
CALL count_students_by_age(21, @count);
SELECT @count AS total_students;
```

---

## ✅ **26. Why is Referential Integrity Important?**

It ensures data consistency between related tables via **foreign key constraints**.

### 🔹 Example:

```sql
ALTER TABLE Orders
ADD FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID);
```

### 🔹 Benefits:

* Prevents orphan records.
* Ensures valid relationships.
* Helps maintain clean, reliable data.

---

## ✅ **27. Why Use Database Sharding? What Are the Challenges?**

**Sharding** distributes large databases across multiple servers.

### 🔹 Benefits:

* Improved scalability & performance.
* Reduced hardware dependency.

### ⚠️ Challenges:

* Joins and transactions are more complex.
* Uneven data growth can lead to **hotspots**.
* Rebalancing shards is difficult.

---

## ✅ **28. What Are Redo Logs and Their Role in Crash Recovery?**

**Redo logs** record changes before they're written to disk.

### 🔹 Flow:

1. Log change →
2. Confirm commit →
3. Apply to disk later.

During a crash, MySQL replays the **redo log** to complete transactions.

---

## ✅ **29. MySQL Storage Engines: Differences and Use Cases**

| Engine  | Features                        | Best For            |
| ------- | ------------------------------- | ------------------- |
| InnoDB  | ACID, row-locking, foreign keys | High-integrity apps |
| MyISAM  | Fast reads, no transactions     | Read-heavy apps     |
| Memory  | RAM-only, volatile              | Caching, temp data  |
| CSV     | Simple, no indexes              | Data exchange       |
| Archive | Compressed, insert-only         | Historical logs     |
| NDB     | Clustered, real-time            | Distributed systems |

---

## ✅ **30. How to Set a Default Storage Engine in MySQL?**

### 🔹 Temporary (Session):

```sql
SET default_storage_engine = 'InnoDB';
```

### 🔹 Permanent (MySQL config file):

```ini
[mysqld]
default-storage-engine = InnoDB
```

---

## ✅ **31. How to Repair Corrupted Tables?**

### 🔹 Check All Tables:

```bash
mysqlcheck --check --all-databases -u root -p
```

### 🔹 Repair Specific Table:

```bash
mysqlcheck --repair database_name table_name -u root -p
```

⚠️ Always **back up** before repairing to avoid data loss.

---

## ✅ **32. Scenario: Using Subqueries**

💡 **Use case:** Identify products with **above-average sales**.

### 🔹 SQL:

```sql
SELECT 
    p.product_id,
    p.product_name,
    s.sales_amount
FROM products p
JOIN sales s ON p.product_id = s.product_id
WHERE s.sales_amount > (
    SELECT AVG(sales_amount)
    FROM sales
)
ORDER BY s.sales_amount DESC;
```

---

## ✅ **33. Scenario: Using SQL Joins**

💡 **Goal:** Combine sales and product info into a report.

### 🔹 SQL:

```sql
SELECT 
    s.sales_date,
    p.product_name,
    p.category,
    s.quantity_sold,
    p.price
FROM sales s
INNER JOIN products p
ON s.product_id = p.product_id;
```

---

## ✅ **34. Scenario: Using Triggers**

💡 **Use case:** Audit product price changes.

### 🔹 Trigger:

```sql
CREATE TRIGGER tr_AuditPriceChanges
ON Products
AFTER UPDATE AS
BEGIN
    IF UPDATE(UnitPrice)
    BEGIN
        INSERT INTO PriceAudit (
            ProductID,
            OldPrice,
            NewPrice,
            ChangedBy,
            ChangeDate,
            PercentageChange
        )
        SELECT 
            i.ProductID,
            d.UnitPrice,
            i.UnitPrice,
            SYSTEM_USER,
            GETDATE(),
            ROUND(((i.UnitPrice - d.UnitPrice) / d.UnitPrice * 100), 2)
        FROM INSERTED i
        JOIN DELETED d ON i.ProductID = d.ProductID
        WHERE i.UnitPrice <> d.UnitPrice;
    END
END;
```

✅ This approach:

* Tracks price changes.
* Logs user and time.
* Calculates percentage difference.

---
