
function cafe(item, callWhenTableisReady) {
    console.log("Finding...1");
    console.log("Finding...2");
    console.log("Finding...3");
    console.log(item)
    callWhenTableisReady();
}

function callWhenTableisReady() {
    console.log("calling 9876543210");

}

cafe("Burger", callWhenTableisReady);

cafe("Pizza", function () {
    console.log("calling 8765432123");
})

cafe("Momos", () => {
    console.log("calling 3543543");
});

