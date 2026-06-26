# JavaScript String Methods — Cheat Sheet

> Quick reference for all common String methods with one-liner examples.
> Strings are **immutable** — every method returns a *new* string, never mutates the original.

---

## Search & Check

| Method | Example | Result |
|--------|---------|--------|
| `includes()` | `"playwright".includes("play")` | `true` |
| `startsWith()` | `"https://x".startsWith("https")` | `true` |
| `endsWith()` | `"file.js".endsWith(".js")` | `true` |
| `indexOf()` | `"banana".indexOf("a")` | `1` |
| `lastIndexOf()` | `"banana".lastIndexOf("a")` | `5` |
| `search()` | `"login?x=1".search(/login/)` | `0` |
| `match()` | `"a1b2".match(/\d/g)` | `["1","2"]` |
| `matchAll()` | `[..."a1b2".matchAll(/\d/g)]` | array of matches |
| `at()` | `"play".at(-1)` | `"y"` |
| `charAt()` | `"play".charAt(0)` | `"p"` |
| `charCodeAt()` | `"A".charCodeAt(0)` | `65` |
| `codePointAt()` | `"😀".codePointAt(0)` | `128512` |

---

## Extract / Slice

| Method | Example | Result |
|--------|---------|--------|
| `slice()` | `"playwright".slice(0,4)` | `"play"` |
| `substring()` | `"playwright".substring(0,4)` | `"play"` |
| `substr()` ⚠️ deprecated | `"playwright".substr(0,4)` | `"play"` |
| `split()` | `"a,b,c".split(",")` | `["a","b","c"]` |

---

## Transform Case

| Method | Example | Result |
|--------|---------|--------|
| `toUpperCase()` | `"play".toUpperCase()` | `"PLAY"` |
| `toLowerCase()` | `"PLAY".toLowerCase()` | `"play"` |
| `toLocaleUpperCase()` | `"i".toLocaleUpperCase("tr")` | `"İ"` |
| `toLocaleLowerCase()` | `"I".toLocaleLowerCase("tr")` | `"ı"` |

---

## Trim / Pad

| Method | Example | Result |
|--------|---------|--------|
| `trim()` | `"  hi  ".trim()` | `"hi"` |
| `trimStart()` | `"  hi".trimStart()` | `"hi"` |
| `trimEnd()` | `"hi  ".trimEnd()` | `"hi"` |
| `padStart()` | `"5".padStart(3,"0")` | `"005"` |
| `padEnd()` | `"5".padEnd(3,"0")` | `"500"` |

---

## Replace / Repeat / Concat

| Method | Example | Result |
|--------|---------|--------|
| `replace()` | `"a-a".replace("a","b")` | `"b-a"` |
| `replaceAll()` | `"a-a".replaceAll("a","b")` | `"b-b"` |
| `repeat()` | `"ab".repeat(2)` | `"abab"` |
| `concat()` | `"a".concat("b","c")` | `"abc"` |
| `+` operator | `"a" + "b"` | `"ab"` |

---

## Convert / Misc

| Method | Example | Result |
|--------|---------|--------|
| `toString()` | `(123).toString()` | `"123"` |
| `String()` | `String(true)` | `"true"` |
| `normalize()` | `"é".normalize()` | unicode-normalized |
| `localeCompare()` | `"a".localeCompare("b")` | `-1` |
| template literal | `` `Hi ${name}` `` | `"Hi Pramod"` |
| `String.raw` | `` String.raw`a\nb` `` | `"a\\nb"` |

---

## Property

| Item | Example | Result |
|------|---------|--------|
| `length` | `"play".length` | `4` |

---

## Key Gotchas

| Trap | Detail |
|------|--------|
| `slice` vs `substring` | `slice` supports negative index; `substring` swaps args if `start > end` and treats negatives as `0`. Prefer `slice`. |
| `search` vs `indexOf` | `search` takes a **regex**; `indexOf` takes a **literal string**. |
| `replace` vs `replaceAll` | `replace` with a string replaces only the **first** match; use `replaceAll` or `/g` regex for all. |
| `at()` vs `charAt()` | `at()` accepts negative index (`-1` = last char); `charAt()` does not. |
| Immutability | No method changes the original string — always returns a new one. |
