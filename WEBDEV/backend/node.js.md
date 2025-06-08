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





# Express.js - Detailed Placement Notes with Interview Answers

---

## 1. **Library vs Framework**

### Library:

* A collection of pre-written code that you **call in your code** to perform specific tasks.
* **You are in control**: you call functions/methods from a library.
* Example: jQuery, Lodash.

### Framework:

* A framework **calls your code** and defines a structure you must follow.
* **Framework is in control**, you fill in the logic.
* Example: Express, React, Angular.

### Interview Answer:

> A library is a set of tools you can call whenever needed, while a framework provides a structured way to build an app and calls your code as needed. In a framework, the control flow is managed by the framework, not the developer.

---

## 2. **What is Express.js?**

* Express.js is a **minimal and flexible Node.js web framework**.
* It provides features to:

  * Set up middleware
  * Define routing
  * Handle requests/responses
  * Use templates and static files

### Internal Flow:

1. **listen** – starts the server.
2. **parse** – parses the incoming data (req.body, req.params).
3. **match** – matches URL & method to routes.
4. **respond** – sends response using `res.send()`, `res.json()`, etc.

### Interview Answer:

> Express.js is a web application framework for Node.js that simplifies routing, middleware handling, and HTTP request-response management. It allows for easy server creation and provides methods to respond to various client requests.

---

## 3. **Getting Started with Express (Code + Explanation)**

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

### Key Parts:

* `express()` – creates an Express application.
* `app.get()` – defines a route handler for GET `/`.
* `res.send()` – sends response to the client.
* `app.listen()` – starts server on port 3000.

---

## 4. **Handling Requests - `app.use()`**

### `app.use()`:

* Mounts **middleware functions**.
* Runs **before route matching**.

```js
app.use(express.json()); // Parse JSON body
```

---

## 5. **Sending Responses**

* `res.send()` – send string/HTML/plain text.
* `res.json()` – send JSON data.
* `res.status()` – set status code.
* `res.sendFile()` – send file to browser.

```js
res.send("Welcome!");
res.status(404).send("Not found");
res.json({ name: "Lavany" });
```

---

## 6. **Routing in Express**

### Methods:

* `app.get(path, handler)` – for GET requests
* `app.post(path, handler)` – for POST requests
* `app.put(path, handler)` – for PUT
* `app.delete(path, handler)` – for DELETE
* `app.all('*')` – for all routes (wildcard)

### Example:

```js
app.get('/', (req, res) => res.send('Home'));
app.post('/submit', (req, res) => res.send('Posted'));
app.all('*', (req, res) => res.send('404 Page'));
```

---

## 7. **Nodemon**

### What is it?

* A utility that **automatically restarts Node.js server** when file changes are detected.

### Installation:

```bash
npm install -g nodemon
```

### Usage:

```bash
nodemon app.js
```

### Interview Answer:

> Nodemon is a development tool for Node.js that automatically restarts the server whenever code changes are detected, improving developer productivity.

---

## 8. **Path Parameters**

### Syntax:

```js
app.get('/user/:username', (req, res) => {
  res.send(`Hello ${req.params.username}`);
});
```

### Example:

* Request: `/user/lavany`
* Response: `Hello lavany`

### Instya Analogy:

* A user profile URL: `instya.com/user/12345` → `12345` is a path param used to fetch that specific user's data.

---

## 9. **Sending HTML Page in Response**

### Using `res.sendFile()`:

```js
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
```

* `__dirname` – gives current folder path.
* `path.join()` – builds correct path.

---

## 10. **Query Strings**

### What is it?

* Sent after `?` in a URL.
* Used for **filters, search, sort**, etc.

### Example URL:

```
/search?keyword=node&sort=asc
```

### Handling in Express:

```js
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const sort = req.query.sort;
  res.send(`You searched for ${keyword}, sort: ${sort}`);
});
```

---





# Node.js + EJS – Detailed Notes for Placements

---

## 📌 1. What is EJS? Why use it?

EJS stands for **Embedded JavaScript Templating**. It allows you to:

* Embed JavaScript directly inside HTML
* Reuse code (partials, layouts)
* Send dynamic data to HTML from the backend (Node.js)
* Maintain a clean separation between logic and presentation

EJS is a **templating engine** that works with **Express.js** to build dynamic front-end views using server-side logic.

---

## 🎯 2. Single Template Blueprint/Layout – Reusability

In large apps, we don’t want to repeat headers/footers for every page.
So we create **one common layout**, e.g., `layout.ejs`, and include child content.

This works using the **EJS Layout** pattern:

```html
<!-- views/layout.ejs -->
<html>
<head><title>My App</title></head>
<body>
  <%- body %>
</body>
</html>
```

All other pages like `home.ejs`, `about.ejs`, etc., inject their content into this layout. You can achieve this using middleware like `express-ejs-layouts`, or manually include common files (partials).

---

## 🔧 3. Starting with EJS Setup (with Code)

### Install EJS:

```bash
npm install ejs
```

### Folder Structure:

```
project/
├── views/
│   ├── home.ejs
│   ├── layout.ejs
├── index.js
```

### `index.js` file:

```js
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Hardcoded views path

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
```

### Explanation:

* `app.set('view engine', 'ejs')` tells Express to use EJS.
* `app.set('views', path.join(__dirname, '/views'))` sets the correct path to the views folder.

---

## ❗ Problem: EJS views not found from parent directory

If you start your server from a folder other than the one containing `views`, EJS will not find the template.

### Fix:

```js
app.set("views", path.join(__dirname, "/views"));
```

* `__dirname` gives the **absolute directory** of your current file.
* Prevents the issue of Express searching in the wrong folder.

---

## 🧪 EJS Interpolation Syntax and Tags

| Tag      | Purpose                              |
| -------- | ------------------------------------ |
| `<%= %>` | Outputs the value with HTML escaping |
| `<%- %>` | Outputs raw HTML without escaping    |
| `<% %>`  | Executes JavaScript without printing |
| `<%# %>` | Comments – won’t appear in output    |
| `<%% %>` | Prints a literal `<%`                |

### Example:

```html
<h1>Hello <%= username %></h1>
<p><%- htmlSnippet %></p>
<% if (loggedIn) { %>
  <p>Welcome!</p>
<% } %>
```

---

## 🔁 Passing Data from Backend to EJS Template

### `index.js`:

```js
app.get('/rolldice', (req, res) => {
  const diceval = Math.floor(Math.random() * 6) + 1;
  res.render('rolldice', { diceval });
});
```

### `views/rolldice.ejs`:

```html
<h1>You rolled: <%= diceval %></h1>
```

---

## 📷 Basic Instagram-like EJS Template

### `views/user.ejs`:

```html
<h1>@<%= username %>'s Profile</h1>
<p>Followers: <%= followers %></p>
<img src="<%= profilePic %>" alt="Profile Picture">
```

### `index.js`:

```js
app.get('/user', (req, res) => {
  res.render('user', {
    username: 'lavany',
    followers: 2000,
    profilePic: 'https://imageurl.com/profile.jpg'
  });
});
```

---

## 📌 Conditional Statements in EJS

```html
<% if (followers >= 1000) { %>
  <p>You’re a star! 🌟</p>
<% } else { %>
  <p>Keep going 💪</p>
<% } %>
```

---

## 🔁 Loops in EJS

### For Array Data:

```html
<ul>
<% posts.forEach(post => { %>
  <li><%= post.title %></li>
<% }); %>
</ul>
```

### `index.js`:

```js
app.get('/posts', (req, res) => {
  const posts = [
    { title: 'Node is great' },
    { title: 'Learning EJS' }
  ];
  res.render('posts', { posts });
});
```

---








# Miscellaneous – Node.js & JavaScript Deep Concepts (Interview Ready Notes)

---

## 🔀 HTTP GET vs POST Requests

### 🔹 GET Request:

* Used to **request data** from a server.
* Data is sent via URL query string (visible in browser).
* Mostly used for **read-only** operations (no changes on backend).
* Example:

```html
<!-- index.html -->
<form method="GET" action="/register">
  <input name="username" />
  <input name="password" type="password" />
  <button type="submit">Register</button>
</form>
```

```js
// server.js
app.get('/register', (req, res) => {
  const { username, password } = req.query;
  res.send(`Username: ${username}, Password: ${password}`);
});
```

### 🔹 POST Request:

* Used to **send data** to a server (e.g., form submission, file uploads).
* Data is sent in the **request body** (not visible in URL).
* Ideal for **creating or updating** resources.

```html
<form method="POST" action="/register">
  <input name="username" />
  <input name="password" type="password" />
  <button type="submit">Submit</button>
</form>
```

```js
// server.js
app.use(express.urlencoded({ extended: true })); // Middleware to parse POST body

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.send(`Received POST: ${username}`);
});
```

---

## 🛠 Middleware in GET & POST Handling

### Why Use Middleware?

* To **preprocess incoming requests** (e.g., parse data, check authentication, handle errors).
* Common middleware: `express.urlencoded`, `express.json`

### Code:

```js
// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());
```

Middleware ensures that data sent in POST body is **available in `req.body`**.

---

## ⚙️ OOP (Object-Oriented Programming) in JavaScript

JavaScript supports OOP using:

* **Objects**
* **Prototypes**
* **Constructor functions / Classes**
* **Inheritance**

### Key Concepts:

* **Encapsulation**: Bundling data + behavior (methods)
* **Inheritance**: Share behavior using prototypes
* **Abstraction**: Hiding complex logic behind methods
* **Polymorphism**: Overriding shared behavior

---

## 🧬 Prototypes in JS

Every JavaScript object has an internal link to another object called its **prototype**.

* If a property/method isn’t found on the object, JS looks up the chain to its prototype.

### Example:

```js
let user = {
  name: "Lavanya"
};

console.log(user.toString()); // inherited from Object.prototype
```

### Custom Prototype Example:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I am ${this.name}`;
};

const p1 = new Person("Slavanya");
console.log(p1.greet());
```

---

## 🏭 Factory Functions

A factory function is a **function that returns an object**.
No use of `new` keyword.

### Example:

```js
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      return `Hi, I'm ${name}`;
    }
  };
}

const user1 = createUser("Lavanya", 21);
console.log(user1.greet());
```

### Benefits:

* More flexible than constructors
* No `this`, `new`, or prototypes (unless added manually)
* Great for encapsulating private data via closures

---

## 🆕 The `new` Operator

The `new` keyword in JavaScript is used to:

1. Create a new empty object: `{}`
2. Set `this` to point to that new object
3. Run the constructor function
4. Link the new object to the constructor’s `.prototype`
5. Return the object

### Constructor Function Example:

```js
function Car(model) {
  this.model = model;
  this.drive = function() {
    return `Driving ${this.model}`;
  };
}

const myCar = new Car("BMW");
console.log(myCar.drive()); // Driving BMW
```

### Without `new`:

```js
const brokenCar = Car("Ford"); // undefined because `this` is not bound correctly
```

---

## 🔄 Interview Tip:

**When to use:**

* `Factory` → More control, functional approach
* `new` (Constructor Functions or Classes) → When you want shared behavior using prototypes


