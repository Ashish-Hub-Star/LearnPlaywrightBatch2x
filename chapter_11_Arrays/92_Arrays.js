let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits);

let number = [3, 1, 4];
number.sort()
console.log(number);

let nums = [10, 1, 21, 2];
nums.sort();
console.log(nums);
// Natural Sorting, lexicographic Sorting)
nums.sort((a, b) => a - b); // Ascending
console.log(nums);
nums.sort((a, b) => b - a);
console.log(nums);