//* Type inferencing

let drink = "chai";

// drink = 44
//! Type 'number' is not assignable to type 'string'.

//---------------------------------

let cups = Math.random() > 0.5 ? 10 : "5";
// let cups: string | number

//-------------------------------------
//-------------------------------------

//* Type Anotation

let username: string = "Luffy";
username = "hamda";

let score: number = 4;

let isLogin: boolean = true;
