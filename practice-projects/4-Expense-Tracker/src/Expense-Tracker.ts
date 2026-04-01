//* Expense Tracker

import { v4 as uuidv4 } from "uuid";

//Catgeory Enum
enum Categories {
  FOOD = "Food",
  TRANSPORT = "Transport",
  UTILITIES = "Utilities",
  ENTERTAINMENT = "Entertainment",
  OTHER = "Other",
}

// expense interface
interface Expense {
  id: string;
  amount: number;
  category: Categories;
  description: string;
  date: Date;
}

// Database
const database: Expense[] = [];

// Add Expense

// user input - Custome type Guard
function isExpense(data: any): data is Expense {
  return (
    typeof data.amount === "number" &&
    typeof data.description === "string" &&
    !isNaN(Number(data.amount)) &&
    data.amount !== 0 &&
    data.description !== "" &&
    data.data !== "" &&
    (data.category === "Food" ||
      data.category === "Transport" ||
      data.category === "Utilities" ||
      data.category === "Entertaiment" ||
      data.category === "Other")
  );
}

// Add Expense
function addExpense(
  amount: number,
  category: Categories,
  description: string,
): void {
  // new Expense
  let newExpense: Expense = {
    id: uuidv4(),
    amount: amount,
    category: category,
    description: description,
    date: new Date(),
  };

  // verify
  if (isExpense(newExpense)) {
    console.log(`\nNew Expense Added\n`);
    database.push(newExpense);
  } else {
    console.log(`\nInvalid Entry!\n`);
    return
  }
}


addExpense(14.50, Categories.TRANSPORT, "Uber ride to the airport")
console.log("Database:", database);
