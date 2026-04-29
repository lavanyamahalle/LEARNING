# ⚙️ Quantization of a Model

## 🧠 What is Quantization?

Quantization is the process of **reducing the precision of model parameters** to make the model:
- Smaller in size
- Faster to run
- More efficient

---

## 📊 Concept from Diagram

### Before Quantization

    updated-parameters.bin (400 GB)

- Uses **32-bit Floating Point (FP32)**
- Example value:

    0.123456789

#### Characteristics:
- ✅ High precision  
- ❌ High memory usage  
- ❌ Slower computation  

---

### After Quantization

    quantized-parameters.bin (200 GB)

- Uses **16-bit Floating Point (FP16)**

- Example value:

    0.1235

#### Characteristics:
- ❌ Lower precision  
- ✅ Less memory usage  
- ✅ Faster computation  

---

## 🔄 What Actually Happens?

- Numbers are stored with **fewer bits**
- Precision is slightly reduced
- Model size decreases significantly

---

## ⚖️ Trade-Off

| Aspect     | FP32 (Before) | FP16 (After) |
|------------|--------------|-------------|
| Precision  | High         | Lower       |
| Memory     | More         | Less        |
| Speed      | Slower       | Faster      |

---

## 🚀 Why Quantization is Important

- Enables running large models on:
  - Limited hardware (laptops, edge devices)
- Reduces:
  - Cost
  - Latency
- Improves:
  - Inference speed

---

## 🧠 Final Insight

> Quantization = Trade a little accuracy for a lot of efficiency
