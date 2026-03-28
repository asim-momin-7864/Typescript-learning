"use strict";
//* CLI Type Safe Calculator
Object.defineProperty(exports, "__esModule", { value: true });
// Operations Enum
var MathOp;
(function (MathOp) {
    MathOp[MathOp["ADD"] = 0] = "ADD";
    MathOp[MathOp["SUBSTRACT"] = 1] = "SUBSTRACT";
    MathOp[MathOp["MULTIPY"] = 2] = "MULTIPY";
    MathOp[MathOp["DIVIDE"] = 3] = "DIVIDE";
})(MathOp || (MathOp = {}));
// Seperate Operations Functions
// Add
function Add(value1, value2, operation) {
    return value1 + value2;
}
// Substract
function Substract(value1, value2, operation) {
    return value1 - value2;
}
// Multiplication
function Multiply(value1, value2, operation) {
    return value1 * value2;
}
// Divide
function Divide(value1, value2, operation) {
    return value1 / value2;
}
// Main function
function calculator(value1, value2, operation) {
    let result;
    switch (operation) {
        case MathOp.ADD:
            result = Add(value1, value2, operation);
            console.log(` Result : ${result} `);
            break;
        case MathOp.SUBSTRACT:
            result = Substract(value1, value2, operation);
            console.log(` Result : ${result} `);
            break;
        case MathOp.MULTIPY:
            result = Multiply(value1, value2, operation);
            console.log(` Result : ${result} `);
            break;
        case MathOp.DIVIDE:
            result = Divide(value1, value2, operation);
            console.log(` Result : ${result} `);
            break;
        default:
            console.log(` Operation is not in enum `);
            break;
    }
}
calculator(5, 6, MathOp.ADD);
//# sourceMappingURL=calc.js.map