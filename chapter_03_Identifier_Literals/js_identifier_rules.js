// ============================================
// JavaScript Identifier Rules - Single Example
// ============================================

// 1. Must begin with a letter, underscore, or dollar sign
let validName = "starts with letter";
let _private = "starts with underscore";
let $jquery = "starts with dollar sign";

// 2. Subsequent characters may include digits
let item1 = "letter then digit";
let _temp2 = "underscore then digit";
let $var123 = "dollar then digits";
let a1_b2 = "mixed letters digits underscore";

// 3. CANNOT start with a digit (these would throw SyntaxError if uncommented)
// let 1stPlace = "invalid";     // SyntaxError: Invalid or unexpected token
// let 2ndItem = "invalid";      // SyntaxError

// 4. CANNOT be a reserved keyword (these would throw SyntaxError if uncommented)
// let class = "invalid";        // SyntaxError: Unexpected token 'class'
// let const = "invalid";        // SyntaxError
// let function = "invalid";     // SyntaxError

// 5. Identifiers are CASE-SENSITIVE
let myVar = "lowercase v";
let myvar = "lowercase v"; // Different identifier!
let MyVar = "uppercase M"; // Another different identifier!
console.log(myVar !== myvar); // true
console.log(myVar !== MyVar); // true

// 6. Unicode letters and Unicode escape sequences are allowed
let café = "Unicode letter é";
let 变量 = "Chinese characters";
let \u0041 = "Unicode escape for A"; // Equivalent to: let A = ...
let \u005f = "Unicode escape for _"; // Equivalent to: let _ = ...

// 7. CANNOT contain spaces, hyphens, or special characters (except _ and $)
// let my-name = "invalid";      // SyntaxError: Unexpected token '-'
// let my name = "invalid";      // SyntaxError: Unexpected identifier
// let my@name = "invalid";      // SyntaxError: Unexpected token '@'
// let my#name = "invalid";      // SyntaxError: Unexpected token '#'
// let my!name = "invalid";      // SyntaxError: Unexpected token '!'

// ============================================
// Naming Conventions (Cases)
// ============================================

// 1. camelCase (standard for JS variables and functions)
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;
function getUserInfo() { return "function camelCase"; }

// 2. PascalCase (standard for JS classes and constructors)
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";
function Person() { return "constructor"; }

// 3. snake_case (underscore separated)
let user_name = "snake_case";
let total_price = 49.99;
let is_logged_in = false;

// 4. SCREAMING_SNAKE_CASE (constants)
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";

// 5. Hungarian Notation (prefix with type - older style)
let strName = "string prefix";
let bActive = true;       // boolean
let nCount = 5;           // number
let arrItems = [];        // array

// ============================================
// Console Output Summary
// ============================================
console.log("=== Valid Identifiers ===");
console.log(validName);
console.log(_private);
console.log($jquery);
console.log(item1);
console.log($var123);
console.log(a1_b2);

console.log("\n=== Case Sensitivity Demo ===");
console.log("myVar:", myVar);
console.log("myvar:", myvar);
console.log("MyVar:", MyVar);

console.log("\n=== Unicode Identifiers ===");
console.log("café:", café);
console.log("变量:", 变量);
console.log("\\u0041:", \u0041);

console.log("\n=== Naming Conventions ===");
console.log("camelCase:", userName, totalPrice, isLoggedIn, getUserInfo());
console.log("PascalCase:", UserProfile, ShoppingCart, Person());
console.log("snake_case:", user_name, total_price, is_logged_in);
console.log("SCREAMING_SNAKE_CASE:", MAX_SIZE, API_KEY, DATABASE_URL);
console.log("Hungarian Notation:", strName, bActive, nCount, arrItems);
