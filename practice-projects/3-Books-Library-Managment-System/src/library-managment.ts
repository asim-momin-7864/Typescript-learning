//* Books Library Management System

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

    //! not correct

    // data.title.trim() !== "" &&
    //   data.id.trim() !== "" &&
    //   data.author.trim() !== "" &&
    //   typeof data.title == "string" &&
    //   typeof data.author == "string" &&
    //   typeof data.id == "string" ||
    // data.status === "Available" ||
    // data.status === "Checked Out" ||
    // data.status === "Lost"

/*
! wrong conditions

  Because of how JavaScript reads && (AND) and || (OR), your logic currently says:
  "Return TRUE if the strings are all valid... OR if the status is 'Available'."

  This means if a user passes an object with completely blank or missing titles and authors, 
  but the status happens to be "Available", the function immediately hits that ||, 
  evaluates to true, and lets the bad data into your database!
    
*/

// Group 1: All string checks must pass
    (
      typeof data.title === "string" && data.title.trim() !== "" &&
      typeof data.id === "string" && data.id.trim() !== "" &&
      typeof data.author === "string" && data.author.trim() !== ""
    ) 
    && 
    // Group 2: Status must be exactly one of these
    (
      data.status === "Available" ||
      data.status === "Checked Out" ||
      data.status === "Lost"
    )

  );
}

//-------------------------------------------------------------------

// Add Book
function addBook(title: string, author: string): void {
  // data checkers
  if (title.trim() === "" || author.trim() === "") {
    console.log(`\n---------------------------------------------`);
    console.log(` Empty input! Please enter valid input`);
    console.log(`---------------------------------------------\n`);
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

    console.log(`\n--- New Book is Added: "${title}" ---`);
  } else {
    console.log(`\n--- Something went wrong! Please enter valid data ---`);
  }
}

//--------------------------------------------------------------

// book finder function
function findBook(title: string): [Book, number] | void {
  // verify
  if (title.trim() === "" || typeof title !== "string") {
    console.log(`\n--- Title is invalid! Please enter again ---`);
    return;
  }

  // find on array
  let foundBook: Book | undefined = database.find(
    (book) => book.title === title,
  );

  // find or not
  if (foundBook) {
    // console.log(`\n[ System: Found Book ]`);

    // find index of book, Beacuse here we are using array as database
    let findBookIndex: number = database.findIndex(
      (book) => book === foundBook,
    );
    return [foundBook, findBookIndex];
  } else {
    console.log(`\n--- "${title}" names title book not exists ---`);
    return;
  }
}

//--------------------------------------------------------------

// Get book (read)
function getBook(title: string): void {
  // find book
  let foundBook: [Book, number] | void = findBook(title);

  // Type Narrowing - handle every case

  // void
  if (!foundBook) {
    // console.log(`\n--- No book found ---`);
    return;
  }

  // if found book

  //* No need to check here our book - beacuse we already handled void case, then only book case remain and we already follow type safe approch
  // if (
  //   typeof foundBook[0] === "object" ||
  //   typeof foundBook[1] === "number" ||
  //   !isNaN(foundBook[1])
  // ) {  }

  // directly disply result operation
  console.log(`
---------------------------------------------
 Book Details
---------------------------------------------
 Book ID:     ${foundBook[0].id}
 Book Title:  ${foundBook[0].title} 
 Book Author: ${foundBook[0].author} 
 Book Status: ${foundBook[0].status} 
---------------------------------------------`);
}
//--------------------------------------------------------------------

//! No needed this function wont do anything
// Partial Book update func
// const partialUpdateBook = (updates: Partial<Book>) => {};

// Update Status (edit)
function updateStatus(
  title: string,
  // newStatus: "Available" | "Checked Out" | "Lost", -- no need

  updatedData: Partial<Book>, // this is just type - saying data is something related to Book interface
  // enter status value in updateStatus argument
): void {
  // find book
  let foundBookArray: [Book, number] | void = findBook(title);

  // Type Narrowing - handle every case

  // void
  if (!foundBookArray) {
    // console.log(`\n--- No book found ---`);
    return;
  }

  // if found book

  //* No need to check here our book - beacuse we already handled void case, then only book case remain and we already follow type safe approch

  // if (
  //   typeof foundBookArray[0] === "object" ||
  //   typeof foundBookArray[1] === "number" ||
  //   !isNaN(foundBookArray[1])
  // ) {};

  let oldBook: Book = foundBookArray[0];

  // automatic way to merge object - to update - using spread operator
  let newBook: Book = {
    ...oldBook,
    ...updatedData,
  };

  // assigning updated value for element at index
  database[foundBookArray[1]] = newBook;

  console.log(`\n--- "${newBook.title}" Book Status is updated ---`);
}

//-------------------------------------------------------

// All Book Summary
function allBookSummary(): void {
  // new type for book summary
  //! forEach Issue
  // array for storing new summary books
  // const summaryBooksArray: Pick<Book, "title" | "author"> [ ] | void  = database.forEach(
  //   (book) => {
  //     return {
  //       title: book.title,
  //       author: book.author,
  //     };
  //   },
  // );
  //! ERROR: Type 'void' is not assignable to type 'Pick<Book, "title" | "author">[]'.
  // type narrowing
  // void
  // if (typeof summaryBooksArray === "undefined") {
  //   return
  // }
  // if length is zero - No books
  //! ERROR: Property 'length' does not exist on type 'never'. (if add void return in forEach)
  // if (summaryBooksArray.length === 0 ) {
  //   console.log(`NO BOOKS in library`);
  //   return
  // }
  //! all issue is happing due to use of forEach

  //TODO add this error summary

  // iterating array with .map method\
  //* array for storing new summary books
  const summaryBooksArray: Pick<Book, "title" | "author">[] = database.map(
    (book) => {
      return {
        title: book.title,
        author: book.author,
      };
    },
  );

  // case handling
  if (summaryBooksArray.length === 0) {
    console.log(`\n--- No books found ---`);
    return;
  }

  console.log(`
=============================================
               ALL BOOKS LIST
=============================================`);

  // print result
  //* for not returning any thing or making new array - forEach is echnically good to use
  summaryBooksArray.forEach((book) => {
    console.log(` Title:  ${book.title}\n Author: ${book.author}\n---------------------------------------------`);
  });
}

//------------------------------------------------------
// Test

//TEST: add books
addBook("The Hobbit", "J.R.R. Tolkien");
addBook("1984", "George Orwell");
addBook("To Kill a Mockingbird", "Harper Lee");


// TEST: see database (Array)
console.log(`\n=============================================`);
console.log(` Database State:`);
console.log(`=============================================`);
console.log(database);


// TEST: get book details
getBook("1984");


// TEST: get book that not exist in our database
getBook("The Great Gatsby");


//TEST: Update status and then get book to see details
updateStatus("To Kill a Mockingbird", { status: "Checked Out" });
getBook("To Kill a Mockingbird");


//TEST: see all books summary after entries
allBookSummary();

