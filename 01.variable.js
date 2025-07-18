"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello World");
// types
var name = "Darknightmon";
var pass = false;
var age = 32;
// but we dont need to declere type when we are direct assiging value , typescript is smart it auto recognize
var username = "king45";
var boy = true;
var payment = 45000;
// when we need to explicitly declere type, when we dont know when value is assigning ,but know its type 
var hero;
function getHero() {
    return "Iron Man";
}
;
hero = getHero();
console.log(name, pass, age, username, boy, payment, hero);
