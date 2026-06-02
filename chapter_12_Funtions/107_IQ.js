function runTest(name, status, duration) {
    return `${name}: ${status} (${duration}ms)`;
}
const r = runTest("Login", "pass", 320);
console.log(r);