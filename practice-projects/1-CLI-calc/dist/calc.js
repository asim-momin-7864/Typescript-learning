//* CLI Type Safe Calculator
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const dist = __require("@inquirer/prompts");
const console = __require("node:console");
import { input, select } from "@inquirer/prompts";
const test = __require("node:test");
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
// calculator(5, 6, MathOp.ADD);
// Function to run CLI
async function runCLI() {
    console.log(` Welcom! To Type-Safe Calculator \n `);
    // first value1
    const firstInput = await input({
        message: "Enter the first number:",
        validate: (value) => {
            // our validation logic
            // if value is NaN
            if (isNaN(Number(value)) || value.trim() === "") {
                return ` Please enter  valid number! `;
            }
            // if everything okey then send true to accept value
            return true;
        },
    });
    // store
    const num1 = Number(firstInput);
    //------------------------------------------------------------
    // second value 2
    const secondInput = await input({
        message: "Enter th second number",
        validate: (value) => {
            if (isNaN(Number(value)) || value.trim() === "") {
                return ` Please enter valid number `;
            }
            return true;
        },
    });
    // store
    const num2 = Number(secondInput);
    //------------------------------------------------------------
    // select operations enum
    const selectedOperation = await select({
        message: "Select an operation to perform:",
        choices: [
            // 'name' is what the user sees. 'value' is the Enum passed to your code
            { name: "Addition", value: MathOp.ADD },
            { name: "Subtract", value: MathOp.SUBSTRACT },
            { name: "Multiply", value: MathOp.MULTIPY },
            { name: "Divide", value: MathOp.DIVIDE },
        ],
    });
    // insert values and invoke main function
    console.log("\n--------------RESULT--------------------\n");
    // invoke main function
    calculator(num1, num2, selectedOperation);
    console.log("\n---------------------------------------------\n");
}
// run CLI
runCLI();
//# sourceMappingURL=calc.js.map