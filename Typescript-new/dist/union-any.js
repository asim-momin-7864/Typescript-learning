"use strict";
//* Union
Object.defineProperty(exports, "__esModule", { value: true });
// can declare mutiple types
let subs = 1000;
subs = "1M";
// can assign specific values as type
let apiResponseStatus = "pending";
// apiResponseStatus = "done"
//! Type '"done"' is not assignable to type '"pending" | "success" | "error"'.
apiResponseStatus = "success";
console.log(apiResponseStatus);
//-----------------------------------------
const orders = ['12', '44', '332', '54', '11'];
//! let currentOrder; --> bad practice
//? SHOWING: let currentOrder: any
// any we can explain like "i do0nt care which dataype you assign"
let currentOrder;
// let currentOrder: string ;
// IMP case
//! ERROR: Variable 'currentOrder' is used before being assigned.
//*  we anote type undefined for case :  
// if currentOrder not get through for loop then it get undefined value 
// so, it should be prepare for that case type --> undefined 
for (const order of orders) {
    if (order === '44') {
        currentOrder = order;
        break;
    }
    //* handling undefined case / else case
    currentOrder = "111";
}
console.log(currentOrder);
//? SHOWING:  let currentOrder: string | undefined
//! CONFUSION:  undefined it is showing -->  we need to handle "else" case also  
//# sourceMappingURL=union-any.js.map