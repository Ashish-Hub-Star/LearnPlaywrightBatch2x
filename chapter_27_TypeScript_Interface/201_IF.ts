interface TestCase {
    id: number;
    name: string;
    status: string;
    duration: number;
}

let test1: TestCase = {
    id: 1,
    name: "Login with valid credentials",
    status: "PASS",
    duration: 1500
}

console.log("TC-" + test1.id + ": " + test1.name + " → " + test1.status);

let test2: TestCase = {
    id: 2,
    name: "Login with invalid password",
    status: "FAIL",
    duration: 3200
};
console.log("TC-" + test2.id + ": " + test2.name + " → " + test2.status);

// let test3: TestCase = {
//     id: 1,
//     name: "Login with valid credentials",
//     status: "PASS",
// };