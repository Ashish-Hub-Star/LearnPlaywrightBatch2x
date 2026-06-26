# Chapter 24 — Polymorphism

"Many forms." The same method name (`setup()`, `execute()`, `verify()`) behaves differently depending on the object's actual class. Calling code stays identical.

## Files

| File | Topic | What you'll learn |
|------|-------|-------------------|
| `192_Method_Overriding.js` | Method overriding | Same `setup()` name, subclass supplies its own body |

## Concept

A subclass redefines a method it inherited. At call time, the object's real class decides which body runs.

## Why

Loop over a mixed list of objects and call one method — each does the right thing. No `if (type === ...)` ladders.

## Q&A

- **Q: Overriding vs overloading?** A: JS does **overriding** (child redefines a parent method). It has no true overloading (same name, different signatures) — last definition wins.
- **Q: How is it "many forms"?** A: `test.execute()` runs unit, API, or E2E logic depending on which subclass `test` is (see Ch 23's `187_IQ2.js`).
- **Q: Where in frameworks?** A: A runner loops `pages.forEach(p => p.verify())`; each Page Object's `verify()` runs its own checks.

## Code

```js
// 192_Method_Overriding.js — same name, different body
class BaseTest {
  setup() { console.log("Base: open browser"); }
}
class APIPage extends BaseTest {
  setup() { console.log("APITest: open browser"); }  // overrides
}
new APIPage().setup();   // APITest: open browser
```

## Run

```bash
node 192_Method_Overriding.js
```
