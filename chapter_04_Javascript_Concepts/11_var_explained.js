var a = 10;// Global SCOPE

// var is function scoped


console.log(a);

function printHello() {
    console.log("Hello TheTestingAcademy!");
    var a = 20; // Local Scope
    console.log(a);
    if (true) {
        var a = 30;
        console.log(a); // 30
    }

}

printHello();

var a = 50;

// var == trump, flipper, dual faced, no trust worthy