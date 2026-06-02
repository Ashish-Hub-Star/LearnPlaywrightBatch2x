# Chapter 10 — Loops

**for · while · do-while · continue · IQ traps**

---

## Files

| # | File | Topic | Runs |
|:-:|------|-------|:------:|
| 71 | `71_For_loop.js` | Why loops exist — replacing manual repetition | `node chapter_10_Loops/71_For_loop.js` |
| 72 | `72_For_loop.js` | For loop with `<=` — runs 6 times (0 through 5) | `node chapter_10_Loops/72_For_loop.js` |
| 73 | `73_For_Loop2.js` | Loop boundaries: `<` vs `<=` — 10 vs 11 iterations | `node chapter_10_Loops/73_For_Loop2.js` |
| 74 | `74_IQ.js` | For + if/else — conditional logic inside loop | `node chapter_10_Loops/74_IQ.js` |
| 75 | `75_For_OF_IN_EACH.js` | While loop — retry logic | `node chapter_10_Loops/75_For_OF_IN_EACH.js` |
| 76 | `76_While.js` | While loop — three parts: init, condition, update | `node chapter_10_Loops/76_While.js` |
| 77 | `77_Do_While.js` | do-while — guaranteed one execution | `node chapter_10_Loops/77_Do_While.js` |
| 78 | `78_Do_While.js` | do-while retry pattern | `node chapter_10_Loops/78_Do_While.js` |
| 79 | `79_IQ.js` | While countdown (`i--`) | `node chapter_10_Loops/79_IQ.js` |
| 80 | `80_IQ.js` | do-while off-by-one trap | `node chapter_10_Loops/80_IQ.js` |
| 81 | `81_IQ.js` | `continue` — skip current iteration | `node chapter_10_Loops/81_IQ.js` |
| 82 | `82_IQ.js` | do-while infinite-loop risk (no update) | `node chapter_10_Loops/82_IQ.js` |

---

## Key Concepts

### The Three Loop Types

| Loop | Condition check | Minimum executions | Use when |
|:--|:--|:--:|:--|
| `for` | Before each iteration | 0 | Known iteration count |
| `while` | Before each iteration | 0 | Unknown count, maybe zero |
| `do-while` | After each iteration | **1** | Must run at least once |

### For Loop Anatomy

```
for (initialization; condition; update) {
    // body
}
```

```js
// 72_For_loop.js
for (let i = 0; i <= 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4, 5 (6 iterations)
}
```

**Common traps:**
- `i < 5` → 5 iterations (0 to 4)
- `i <= 5` → 6 iterations (0 to 5)
- `i > 1` with `i = 0` → never runs (condition already false)

### While Loop Anatomy

```js
// 76_While.js
let attempt = 0;        // init
while (attempt < 3) {   // condition
    console.log(attempt);
    attempt++;          // update — DON'T FORGET THIS
}
```

**Without the update (`attempt++`) → infinite loop.**

### Do-While Loop Anatomy

```js
// 77_Do_While.js
let a = 10;
do {
    console.log(a);    // runs ONCE even though a < 10 is false
    a++;
} while (a < 10);
```

**Key: body always executes at least once.** Condition is checked *after*.

### Continue

```js
// 81_IQ.js
for (let i = 0; i < 3; i++) {
    if (i === 1) continue;  // skip this iteration
    console.log(i);          // 0, 2
}
```

`continue` skips the **rest** of the current iteration — next one still runs.

---

## IQ Traps

| File | Trap | What happens |
|:--|:--|:--|
| `79_IQ.js` | Decrementing while | Countdown works: `i--` instead of `i++` |
| `80_IQ.js` | do-while off-by-one | `let i = 0; do { console.log(i); i--; } while (i > 0);` → prints 0 once, then condition is false |
| `82_IQ.js` | Missing update | `do { console.log(n); } while (n < 3);` with no `n++` → infinite loop if condition stays true |

---

## Output Reference

```bash
$ node chapter_10_Loops/72_For_loop.js
0
1
2
3
4
5

$ node chapter_10_Loops/76_While.js
0
1
2
Modi will do 15+ years   # (printed 15 times)

$ node chapter_10_Loops/77_Do_While.js
10

$ node chapter_10_Loops/78_Do_While.js
Execute a code!
Retrying..... 0
Execute a code!
Retrying..... 1
Execute a code!
Retrying..... 2

$ node chapter_10_Loops/79_IQ.js
5
4
3
2
1

$ node chapter_10_Loops/80_IQ.js
0

$ node chapter_10_Loops/81_IQ.js
0
2

$ node chapter_10_Loops/82_IQ.js
1
```

---

**← [Back to parent README](../README.md)**
