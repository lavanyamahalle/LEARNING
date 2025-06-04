### 📊 Data Science & Big Data Analytics (DSBDA) PYQ-Based Notes

---

## 🔷 Q1 & Q2: Foundations of Data Science

### 📌 Data Analytics Lifecycle

1. **Discovery**
2. **Data Preparation** (ETLT)
3. **Model Planning**
4. **Model Building**
5. **Deployment**
6. **Feedback/Iteration**

```
[Discovery] → [Data Prep] → [Model Planning] → [Model Building] → [Deploy] → [Iterate]
```

### 📌 Discovery Phase

* Identify business goal
* Understand data sources
* Define problem statement
* Stakeholder interviews

### 📌 Data Preparation Phase (ETLT, Sandbox)

* **ETLT**: Extract, Transform, Load, Transform
* Create data sandbox for experimentation
* Remove noise, handle missing values

### 📌 Model Planning vs Model Building

| Feature | Model Planning           | Model Building        |
| ------- | ------------------------ | --------------------- |
| Goal    | Select algorithm         | Train model with data |
| Output  | Blueprint/model strategy | Working model         |

### 📌 BI vs Data Science

| Aspect | BI                  | Data Science            |
| ------ | ------------------- | ----------------------- |
| Goal   | Past data insights  | Predict future outcomes |
| Tool   | Dashboards, Reports | ML algorithms           |

### 📌 Linear vs Logistic Regression

* **Linear**: Predicts continuous output (y = mx + c)
* **Logistic**: Classifies categories using sigmoid function

---

## 🔷 Q3 & Q4: Preprocessing & Classification

### 📌 Handling Data Issues

* **Missing values**: Imputation, deletion
* **Transformation**: Normalization, scaling
* **Duplicates**: Removal

### 📌 Types of Analytics

* **Descriptive**: What happened?
* **Predictive**: What might happen?
* **Diagnostic**: Why did it happen?

### 📌 Naive Bayes Classifier

* Based on Bayes Theorem
* Assumes feature independence
* Used in spam detection, sentiment analysis

### 📌 Logistic Regression (Sigmoid Function)

* Predicts probability between 0 and 1
* Uses sigmoid: `1 / (1 + e^-x)`

### 📌 Decision Trees

* Tree-like model
* Nodes: attributes, branches: outcomes
* Used for both classification & regression

### 📌 Apriori Algorithm

* Finds frequent itemsets
* Generates association rules
* Support, confidence, lift metrics

---

## 🔷 Q5 & Q6: Text & Cluster Analysis, Evaluation

### 📌 K-Means Clustering

1. Choose K cluster centers
2. Assign points to nearest center
3. Recalculate centers
4. Repeat until convergence

**Euclidean Distance**: `sqrt((x2 - x1)^2 + (y2 - y1)^2)`

### 📌 Text Processing

* **TF-IDF**: Highlights important words
* **Lemmatization**: Root word conversion
* **POS Tagging**: Grammatical tagging

### 📌 Confusion Matrix Metrics

* **Accuracy**: (TP+TN)/(All)
* **Precision**: TP/(TP+FP)
* **Recall**: TP/(TP+FN)
* **AUC-ROC**: Measures separability

### 📌 Validation Techniques

* **Holdout**: Split into train/test
* **K-Fold**: Data split into k subsets
* **Random Subsampling**: Random selection

---

## 🔷 Q7 & Q8: Visualization & Big Data Tools

### 📌 Data Visualization Tools

* Tableau, Power BI, matplotlib, seaborn

### 📌 Plots with Example

* **Box Plot**: Shows median, quartiles
* **Histogram**: Frequency distribution
* **Density Plot**: Smooth curve of distribution

### 📌 Challenges

* Too much data
* Misleading visuals
* Tool limitations

### 📌 Hadoop Ecosystem

* **HDFS**: Storage
* **MapReduce**: Batch processing model
* **Pig**: Script-based data flow
* **Hive**: SQL-like interface
* **Spark**: Fast in-memory processing

---
