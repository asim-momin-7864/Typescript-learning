//* Books Library Management System

import { title } from "node:process";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

// Book interface
type Book = {
  id: string;
  title: string;
  author: string;
  status: "Available" | "Checked Out" | "Lost";
};

// Database
const database: Book[] = [];

// Custome Type Guard for Book
function isBook(data: Book): data is Book {
  return (
    data.title.trim() !== "" ||
    data.id.trim() !== "" ||
    data.author.trim() !== "" ||
    typeof data.title == "string" ||
    typeof data.author == "string" ||
    typeof data.id == "string" ||
    data.status === "Available" ||
    data.status === "Checked Out" ||
    data.status === "Lost"
  );
}

// Add Book
function addBook(title: string, author: string): void {
  // data checkers
  if (title.trim() === "" || author.trim() === "") {
    console.log(` Empty input! Please enter valid input  `);
    return;
  }

  // extra - duplicate book preventing

  // make object
  let newBook: Book = {
    id: uuidv4(),
    title,
    author,
    status: "Available",
  };

  // Make it Book Type
  if (isBook(newBook)) {
    // push into array
    database.push(newBook);

    console.log(`New Book is Added`);
  } else {
    console.log(`Something went wrong! Please enter valid data`);
  }
}

addBook("The Hobbit", "J.R.R. Tolkien");

console.log("Database : ", database);
