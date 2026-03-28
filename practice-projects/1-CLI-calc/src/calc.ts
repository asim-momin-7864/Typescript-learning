//* CLI Type Safe Calculator

import dist = require("@inquirer/prompts");
import console = require("node:console");

import { input, select } from "@inquirer/prompts";
import test = require("node:test");

// Operations Enum
const enum MathOp {
  ADD,
  SUBSTRACT,
  MULTIPY,
  DIVIDE,
}

// Seperate Operations Functions

// Add
function Add(value1: number, value2: number, operation: MathOp): number {
  return value1 + value2;
}

// Substract
function Substract(value1: number, value2: number, operation: MathOp): number {
  return value1 - value2;
}

// Multiplication
function Multiply(value1: number, value2: number, operation: MathOp): number {
  return value1 * value2;
}

// Divide
function Divide(value1: number, value2: number, operation: MathOp): number {
  return value1 / value2;
}

// Main function
function calculator(value1: number, value2: number, operation: MathOp): void {
  let result: number;

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
  const num1: number = Number(firstInput);

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
  const num2: number = Number(secondInput);

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
