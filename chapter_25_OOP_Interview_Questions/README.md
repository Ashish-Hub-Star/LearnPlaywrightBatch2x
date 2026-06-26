# Chapter 25 — OOP Interview Questions

Four warm-up drills tying together classes, constructors, `this`, and chaining.

## Files

| File | Topic | What you'll learn |
|------|-------|-------------------|
| `EX1.js` | Class basics | `Bug` class — fields + a `display()` method |
| `EX2.js` | Default params | Constructor with default values (`name = "staging"`) |
| `EX3.js` | `this` per object | Each instance carries its own `this.name` |
| `EX4.js` | Method chaining | `return this` lets you chain `.increment().display()` |

## Q&A

- **Q: How do default constructor values work?** A: `constructor(name = "staging", port = 3000)` — omitted args fall back to the defaults. `new Environment()` → `staging:3000`.
- **Q: Why `return this`?** A: Handing back the same object lets the next call continue on it — fluent chaining like Playwright's builder APIs.
- **Q: Does each object share `this`?** A: No. Every `new` gets its own `this`; `u1.name` and `u2.name` are independent.

## Code

```js
// EX4.js — return this enables chaining
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; return this; }   // hand back the object
  display() { console.log("Count:", this.count); return this; }
}
new Counter().increment().increment().increment().display();  // Count: 3

// EX2.js — constructor default values
class Environment {
  constructor(name = "staging", port = 3000) {
    this.name = name;
    this.port = port;
  }
  getURL() { return "http://" + this.name + ":" + this.port; }
}
console.log(new Environment().getURL());                 // http://staging:3000
console.log(new Environment("production", 8080).getURL()); // http://production:8080
```

## Run

```bash
node EX1.js
node EX2.js
node EX3.js
node EX4.js
```
