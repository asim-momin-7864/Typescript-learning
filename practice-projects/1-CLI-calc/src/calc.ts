//* CLI Type Safe Calculator

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

calculator(5, 6, MathOp.ADD);
