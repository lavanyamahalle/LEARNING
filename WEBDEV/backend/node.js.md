 **important Node.js fundamentals**—commonly asked in placements. 

---

## ✅ 1. **What is Node.js?**

### 📘 Notes:

* Node.js is a **runtime environment** that lets you run JavaScript **outside the browser** (like in terminal/servers).
* It is **built on Google Chrome’s V8 engine**, which converts JS to machine code.
* Node uses an **event-driven, non-blocking I/O model**—ideal for **scalable server-side apps**.

### ✅ Key Points:

* Written in **C++**, **JavaScript**, and **libuv**.
* Mostly used to build **APIs**, **servers**, **real-time apps** (e.g., chat apps), etc.

### 🎯 Interview Answer:

> Node.js is an open-source JavaScript runtime environment that runs on the V8 engine, allowing us to execute JavaScript outside the browser. It's commonly used for backend development due to its event-driven and non-blocking architecture, which makes it highly scalable and efficient for I/O-heavy applications.

---

## ✅ 2. **What is Node REPL?**

### 📘 Notes:

* **REPL** = **Read-Eval-Print Loop**
* It's a **command-line interface** where you can **run JavaScript code line by line**.
* Used for **testing snippets**, **debugging**, or learning.

### 🔹 To open REPL:

```bash
node
```

### 🎯 Interview Answer:

> REPL in Node.js stands for Read-Eval-Print Loop. It is an interactive shell that processes Node.js expressions. It reads the input, evaluates it, prints the result, and loops until we exit. It’s useful for testing small code snippets or debugging.

---

## ✅ 3. **Running Node Files (e.g., `node file.js`)**

### 📘 Notes:

* Create a `.js` file, write JS code, and run it using:

```bash
node file.js
```

### Example:

```js
// hello.js
console.log("Hello, Node!");
```

```bash
node hello.js
```

### 🎯 Interview Tip:

They may ask: "How do you run a Node script?" → Answer: "`node filename.js` in terminal."

---

## ✅ 4. **Process in Node.js**

### 📘 Notes:

* `process` is a **global object** that gives info about the **current Node process**.
* Useful for:

  * Accessing command-line args
  * Getting environment variables
  * Exiting process, etc.

### Common usages:

```js
console.log(process.argv);     // args
console.log(process.env);      // environment vars
process.exit();                // end program
```

### 🎯 Interview Answer:

> The `process` object in Node.js provides information and control over the current Node.js process. It allows access to command-line arguments (`process.argv`), environment variables (`process.env`), and even control over the runtime with methods like `process.exit()`.

---

## ✅ 5. **Exporting in Node.js (Modules)**

### 📘 Notes:

In Node.js, every `.js` file is a **module**. To share functions or variables between files, use `module.exports`.

### Example:

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = add;
```

```js
// app.js
const add = require('./math');
console.log(add(2, 3)); // 5
```

### 🎯 Interview Answer:

> In Node.js, we use `module.exports` to export variables, functions, or objects from a file so they can be used in other files. This is part of the CommonJS module system used in Node.

---

## ✅ 6. **Exporting in Directories (Index.js pattern)**

### 📘 Notes:

If a folder has multiple files, use `index.js` to centralize exports.

### Example:

```js
// math/add.js
module.exports = (a, b) => a + b;

// math/index.js
const add = require('./add');
module.exports = { add };
```

```js
// app.js
const { add } = require('./math');
```

### 🎯 Interview Tip:

> To organize modules inside directories, we often use `index.js` to combine and export all submodules, simplifying imports.

---

## ✅ 7. **What is npm?**

### 📘 Notes:

* **npm** = **Node Package Manager**
* Used to **install packages/libraries** like Express, React, etc.
* Comes installed with Node.js.

### Commands:

```bash
npm init         # create package.json
npm install xyz  # install package
```

### 🎯 Interview Answer:

> npm stands for Node Package Manager. It is the default package manager for Node.js and is used to manage and install dependencies and libraries required for a project.

---

## ✅ 8. **What is package.json?**

### 📘 Notes:

* A JSON file created via `npm init`
* Keeps track of:

  * Project name, version
  * Dependencies
  * Scripts
  * Metadata

### Example:

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 🎯 Interview Answer:

> `package.json` is the metadata file for a Node.js project. It records important information such as the project name, version, scripts, and dependencies. It allows others to install exact packages using `npm install`.

---

## ✅ 9. **Local vs Global Installation**

### 📘 Notes:

* **Local**: Installs inside your project folder (used only for that project).

  ```bash
  npm install express
  ```
* **Global**: Installs system-wide (used in CLI tools).

  ```bash
  npm install -g nodemon
  ```

### 🎯 Interview Tip:

> Local installs are stored in `node_modules` of the current project. Global installs are available anywhere in the system and usually used for CLI tools.

---

## ✅ 10. **Importing Modules**

### 📘 Notes:

* Node uses **CommonJS modules**:

```js
const fs = require('fs'); // built-in module
const myFunc = require('./myfile'); // custom module
```

* In modern Node, you can also use **ES Modules**:

```js
import fs from 'fs';
```

(Only if you set `"type": "module"` in `package.json`)

### 🎯 Interview Answer:

> In Node.js, modules can be imported using `require()` (CommonJS) or `import` (ES Modules). `require()` is the default, while `import` needs additional configuration.

---
