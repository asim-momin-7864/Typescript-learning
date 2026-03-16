"use strict";
//* Interface
Object.defineProperty(exports, "__esModule", { value: true });
// use of "type" and "interface"
// where "type" brokes code - classes
// where we use "interface" insted of "type"
//------------------------------------------------------
// messy, repetable code
// func 1
function makeChai1(order) {
    console.log(`make chain`, order);
}
// func 2
function serveChai1(order) {
    console.log(`serve chain`, order);
}
// func 1
function makeChai2(order) {
    console.log(`make chain`, order);
}
// func 2
function serveChai2(order) {
    console.log(`serve chain`, order);
}
// inherite type from class
class MasalaChai {
    water = 100;
    milk = 40;
}
class Chai {
    size = "large";
}
class myRes {
    ok = true;
}
function orderChai(t) {
    console.log(t);
}
const cup = {
    teaLeaves: 5,
    masala: 10,
};
const u1 = {
    username: "Luffy"
};
const u2 = {
    username: "Hamada",
    bio: "Kind Tech Genius"
};
const cfg = {
    appName: "MasterJi", // it is readonly but we need to set it once
    version: 1.126
};
//! ERROR: Cannot assign to 'appName' because it is a read-only property.
// now we cannot set it again
// cfg.appName = "ChaiCode";
//# sourceMappingURL=6-interface.js.map