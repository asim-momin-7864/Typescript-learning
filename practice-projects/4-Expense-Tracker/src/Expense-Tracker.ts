//* Expense Tracker

import { v4 as uuidv4 } from "uuid";

//Catgeory Enum
export enum Categories {
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
    // data.date !== "" &&
    /*
    Second, your newExpense object creates a date using new Date(), 
    which creates a Date object, not a string. 
    Comparing a Date object to "" will cause unexpected behavior.
    */

    //--------------------------

    //! Manully checking
    // If you ever add a new category,
    // you'll have to update this long string of checks.
    // Instead, you can let JavaScript dynamically check the Enum for you:

    // (data.category === "Food" ||
    //   data.category === "Transport" ||
    //   data.category === "Utilities" ||
    //   data.category === "Entertainment" ||
    //   data.category === "Other")

    Object.values(Categories).includes(data.category)
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
    return;
  }
}

//-----------------------------------

//  View All Expense
function viewTotalExpenseByCategory(
  category: Categories,
  minAmt: number,
): void | number {
  // verify
  if (
    minAmt < 0 ||
    typeof minAmt === "number" ||
    category.trim() === "" ||
    (category !== Categories.FOOD &&
      category !== Categories.ENTERTAINMENT &&
      category !== Categories.OTHER &&
      category !== Categories.TRANSPORT &&
      category !== Categories.UTILITIES)
  ) {
    console.log(` Invalid Input `);
    return;
  }

  //* Maybe we not need sorter func here
  // get sorted data
  // const sortedData: Expense[][] | void = sortByCategory();

  //* Directy filter data with conditions
  const customeFilteredExpensesArray: Expense[] = database.filter((exp) => {
    return category === exp.category && exp.amount >= minAmt;
  });

  // case handling
  if (customeFilteredExpensesArray.length === 0) {
    console.log(`\nYou do not have Expense in "${category}" category\n`);
    return 0;
  }

  //  calculate total
  let totalInCategory: number = customeFilteredExpensesArray.reduce(
    (acc, curr) => {
      return acc + curr.amount;
    },
    0,
  );

  //result
  console.log(`
    \nTOTAL EXPENSE 
    \nCategory: ${category}
    \nTotal: ${totalInCategory}
    `);

  return totalInCategory;
}

//---------------------------------------------------------------------

// // TODO I need to create custome datatype for storing total expenses by each category
// interface SummaryByCategories {
//   [categ: string]: number;
// }

// // All Expense Summary
// function expenseSummary(): void {

//     const sortedData: Expense[][] | void = sortByCategory();

//     if (!sortedData) {

//       console.log(`\nNo Expense record!\n `);
//       return
//     }

//     // Total expenses accoridng to category
//     let totalsByEachCategory: SummaryByCategories;

//     sortedData.forEach(categoryArray => {

//       // On each category array
//       categoryArray.reduce(
//         (acc, curr) => {
//                  acc + curr, 0
//         },
//       )
//     });

// }

// // Sort by Category
// function sortByCategory(): [ {Array:Expense[], Total: Number} ] | void {
//   // make copies by categories

//   // FOOD
//   const FoodArray: Expense[] = database.filter((exp) => {
//     return exp.category === Categories.FOOD;
//   });

//   // TRANSPORT
//   const TransportArray: Expense[] = database.filter((exp) => {
//     return exp.category === Categories.TRANSPORT;
//   });

//   // UTILITIES
//   const UtilitiesArray: Expense[] = database.filter((exp) => {
//     return exp.category === Categories.UTILITIES;
//   });

//   // ENTERTAINMENT
//   const EntertaimentArray: Expense[] = database.filter((exp) => {
//     return exp.category === Categories.ENTERTAINMENT;
//   });

//   // OTHER
//   const OtherArray: Expense[] = database.filter((exp) => {
//     return exp.category === Categories.OTHER;
//   });

//   return [
//     FoodArray,
//     TransportArray,
//     UtilitiesArray,
//     EntertaimentArray,
//     OtherArray,
//   ];
// }

/*

! BAD PRACTICES

1. The "Iteration Tax" (Time Complexity)
Right now, your code uses .filter() five separate times. .filter() looks at every single item in your database.
If you have 1,000 expenses, your program is running 5,000 checks. 
It reads the whole database to find Food, starts back at the beginning to find Transport, 
starts back at the beginning to find Utilities, etc.

2. The "Maintenance Trap" (Hardcoding)
Imagine next month you decide to add 'CLOTHING' and 'HEALTH' to your Categories enum. 
With your current logic, you have to remember to come into this function, 
write two more .filter() blocks, and manually update the return array. 
If you forget, your app breaks. 
Good architecture should automatically adapt to new data.

*/

//-----------------------------------------------------------------

//* Summary of Each Category

// custome interface
interface SummaryByCategories {
  [category: string]: {
    expenses: Expense[];
    total: number;
  };
}

function summaryEachCategory(): SummaryByCategories {
  //* why use reduce and how it works

  // we can use reduce to sort and filter , summarize data and return also if sorting is multiple and complex type of , like multiple properties check and multiple properties have
  // beacuse here we get "acc" which we can assign our custome collecting bucket type datatype e.g. SummartByCategories
  //  which can store our each sorted result into its proper bucket
  // this feature we didnot get in filter / sort .... like other functions
  //* here reduce means not in single items, here reduce to your custom data type

  return database.reduce((acc, curr) => {
    // first check acc have this category or not in acc
    //if not then check

    if (!acc[curr.category]) {
      // initialize new filed in acc
      acc[curr.category] = { expenses: [], total: 0 };
    }

    // inserting curr expense record into expenses array [ ] field
    acc[curr.category]!.expenses.push(curr);

    // calculating total for each category and stroing into total field
    acc[curr.category]!.total += curr.amount;

    /*

The Problem: 
TypeScript is being overly cautious. 
It thinks acc[curr.category] might be undefined, 
even though you just wrote the code to create it on the line right above.

The Solution (!): 
By placing ! after the variable, 
you are overriding the compiler. 
You are telling TypeScript: "I promise you, I know for a fact this value exists right now. 
Stop worrying and let me use .push()."

The Risk: It turns off TypeScript's safety net for that specific line. 
If you are wrong and the value is undefined, 
your app will crash at runtime. 
But in your code, you are 100% right, so it's safe to use!
    
    */

    return acc;
  }, {} as SummaryByCategories);
}

//---------------------------------------------------
// TEST

// addExpense(205, Categories.TRANSPORT, "Uber ride to the airport");
// addExpense(205, Categories.TRANSPORT, "Uber ride to the airport");
// addExpense(14.5, Categories.FOOD, "Lunch at local cafe");
// addExpense(165, Categories.FOOD, "Lunch at local cafe");
// addExpense(105, Categories.FOOD, "Lunch at local cafe");
// addExpense(115, Categories.FOOD, "Lunch at local cafe");
// addExpense(145, Categories.FOOD, "Lunch at local cafe");
// addExpense(51, Categories.FOOD, "Lunch at local cafe");
// addExpense(133, Categories.FOOD, "Lunch at local cafe");
// addExpense(665, Categories.ENTERTAINMENT, "Movie tickets and snacks");
// addExpense(665, Categories.ENTERTAINMENT, "Movie tickets and snacks");
// addExpense(14.5, Categories.OTHER, "Uber ride to the airport");
// addExpense(14.5, Categories.OTHER, "Uber ride to the airport");
// addExpense(55, Categories.UTILITIES, "Buy medicine");
// addExpense(55, Categories.UTILITIES, "Buy medicine");
// console.log("Database:", database);
// // console.log(sortByCategory());

// viewTotalExpenseByCategory(Categories.FOOD, 50);
// console.log(summaryEachCategory());

export { addExpense, viewTotalExpenseByCategory, summaryEachCategory };
