"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


// object
var newUser = {
    name: "hitesh",
    email: "abc@xyz.in",
    isActive: true,
};


// normal function with obj as argument
function createUser(_a) {
    var string = _a.username,
        boolean = _a.isActive;
}

createUser({ username: "King", isActive: true });


// function with return value type safety
function createCourse() {
    return { cname: "DSA", price: 3400 };
}
createCourse();


// Odd Behaviour

//* [1]
//! createUser({username: "queen", isActive: false, email: "queen@mxm.com"})
// it throw error , we cannot pass extra argument


//* [2]
var newUser2 = {
    username: "joker",
    email: "abc@xyz.com",
    isActive: false,
};
createUser(newUser2);
