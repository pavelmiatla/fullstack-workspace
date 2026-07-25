**© 2025 Hamadi Sy. All Rights Reserved. Unauthorized distribution or reproduction is strictly prohibited.**

---

# 🚀 Javascript Essentials for web frontend interactivity

## Description
Javascript 80/20-Principle based Cheat Sheet: Solve 80% of your daily Web Frontend Interactivity needs. For Full-Stack Developers.

---

## 🎯 Purpose
Adds **interactivity and logic** to web pages (events, dynamic content, data handling). Build to run in browsers. 

---

## 🌱 Origin
Created in **1995** by **Brendan Eich** at Netscape.  
Initially called *Mocha*, renamed to *JavaScript* for marketing reasons (though unrelated to Java).

---

## 🧠 Essentials of Javascript
→ [JavaScript Documentation: developer.mozilla.org/en-US/docs/Web/JavaScript](developer.mozilla.org/en-US/docs/Web/JavaScript)

### Variables
```javascript
//let (reassignable)
let message = "Hello";
message = "World"; // Can be reassigned
console.log(message); // Output: World

// const (constant, cannot be reassigned)
const PI = 3.14;
// PI = 3.14159; // Error: Assignment to constant variable.
console.log(PI); // Output: 3.14
```

### Data Types
```javascript
let name = "Alice"; /*String: sequence of characters*/
let age = 30; let price = 19.99; /*Number: numerical values*/
let isActive = true; /*boolean: 2 possible values: true or false*/
let fruits = ["apple", "banana", "cherry"]; /*Array: indexed collection of elements of same type*/
let user = { /* object: real-world entity with related data */
    firstName: "John",
    lastName: "Doe",
    age: 25
};
```

### Functions
```javascript
// Declaration: block of reusable code, performing a specific task, callable by called by name
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Bob")); // Output: Hello, Bob!

// Arrow functions () => {} (compact syntax)
const multiply = (a, b) => a * b;
console.log(multiply(2, 3)); // Output: 6
const sayHi = () => console.log("Hi!");
sayHi(); // Output: Hi!
```

### Control Flow
```javascript
// if / else if / else: conditional statements 
let temperature = 20;
if (temperature > 30) {
    console.log("Hot day!");
} else if (temperature > 15) {
    console.log("Pleasant day.");
} else {
    console.log("Cool day.");
}

// for loop: repeat a specific number of times
for (let i = 0; i < 3; i++) {
    console.log("Count: " + i);
}
// Output: Count: 0 Count: 1 Count: 2

//while loop: repeat as long as condition is true
let count = 0;
while (count < 2) {
    console.log("Loop: " + count);
    count++;
}
// Output: Loop: 0 Loop: 1

//switch statement: execute the first match
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of week.");
        break;
    case "Friday":
        console.log("End of week.");
        break;
    default:
        console.log("Mid-week day.");
}
// Output: Start of week.
```

### DOM (Document Object Model) Manipulation: 
Tree-Representation of a web page, allowing programs to dynamically change its content, structure, and style.

```javascript
// document.querySelector() (selects an element)
// HTML: <p id="myPar">Hello</p>
const paragraph = document.querySelector("#myPar");
// const paragraph = document.getElementById('myPar');
console.log(paragraph.textContent); // Output: Hello

//element.innerHTML (gets/sets HTML content)
// HTML: <div id="myDiv"></div>
const myDiv = document.querySelector("#myDiv");
myDiv.innerHTML = "<strong>New Content!</strong>";
// myDiv now contains: <strong>New Content!</strong>

// element.addEventListener() (attaches event handler)
// HTML: <button id="myButton">Click Me</button>
const button = document.querySelector("#myButton");
button.addEventListener("click", () => {
    alert("Button clicked!");
});
```

### Events:
```javascript
//onclick (when an element is clicked)
<button onclick="console.log('Button was clicked!');">Click Me</button>

//onchange (when an input element's value changes)
<input type="text" onchange="console.log(this.value);"/>

//onsubmit (when a form is submitted)
<form onsubmit="event.preventDefault(); console.log('Form submitted!');">
    <button type="submit">Submit</button>
</form>
```

### Asynchronous execution (async, await, promise)
```javascript
// async: run function in Background and return a Promise (future result)
async function getData() {
  console.log("Starting fetch..."); // Runs instantly without wait  
  const response = await fetch('url'); // Pause here, get data
  const data = await response.json(); // Pause, process data  
  console.log("Data received:", data); // Then use data
  return data; // This async function implicitly returns a Promise
}

// promise: future result of the async operation.
const promise = getData();
promise // .then() for success, .catch() for error.
  .then(finalData => console.log("Promise resolved with:", finalData))
  .catch(error => console.error("Promise rejected:", error));

console.log("Async Function called, program continues immediately without waiting for getData's awaits.");
```

### Fetch API: `fetch(url).then().catch()` for HTTP requests
```javascript
//fetch(url).then().catch() (for HTTP requests)
fetch("https://api.example.com/data")
    .then(response => response.json()) // Parse JSON response
    .then(data => console.log(data)) // Use the data
    .catch(error => console.error("Error fetching:", error)); // Handle errors
```

### Modules: `export`, `import`
```javascript
//export (makes code available for other modules)
//utils.js
export const PI = 3.14;
export function sum(a, b) {
    return a + b;
}

//import (uses exported code from other modules)
//main.js
import { PI, sum } from './utils.js';
console.log(PI); // Output: 3.14
console.log(sum(5, 3)); // Output: 8
```

### Error Handling:
```javascript
try {
    // run the code inside this try-block. if anything goes wrong, break the code execution there and go to the catch-block 
} catch (error) {
    // run the code inside this catch-block when error occures inside the try-block to handle the error gracefully (e.g. show a user- friendly message
} finally {
    // run the code inside this finally-block in any case (success & error) bevor leaving the Code
}
```