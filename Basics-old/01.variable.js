"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello World");
// types
const name = "Darknightmon";
const pass = false;
const age = 32;
// but we dont need to declere type when we are direct assiging value , typescript is smart it auto recognize
const username = "king45";
const boy = true;
const payment = 45000;
// when we need to explicitly declere type, when we dont know when value is assigning ,but know its type 
let hero;
function getHero() {
    return "Iron Man";
}
;
hero = getHero();
console.log(name, pass, age, username, boy, payment, hero);
//# sourceMappingURL=01.variable.js.map