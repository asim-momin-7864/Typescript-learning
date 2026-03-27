//* Forceful Type Assertion
// this is not types conversion
let response = "42";
// let numericLength: number = response.length
//! sometimes it does not recoginize its type and support
//* We have to do forceful type assertion
let numericLength = response.length;
let bookstring = '{ "name": "who move my cheez" }';
// we have to assert type otherwise, it is showing any, string types
let bookObject = JSON.parse(bookstring);
console.log(bookObject);
//--------------------------------------------------------------
//* DOM elements types
const inputElements = document.getElementById("username");
//----------------------------------------------------------------
//* Unknow VS Any
//* any
let val1;
val1 = "chai";
val1 = [12, 34, 55];
val1 = 56.78;
// when we try to apply differnt type of methods
// here val1 contain number ,
//! it is not showing any error when we apply .toUpperCase()
// that error we get in execution
//!  val1.toUpperCase();
//---------------------------------------------------------
//* unkown
let val2;
val2 = "king";
val2 = [1, 4, 5];
val2 = 25.34;
// val2.toUpperCase()
//! ERROR: 'val2' is of type 'unknown'.
// it show error - because we are changing its values and types - which is not acceptable
//* add check - to handle different types get it
if (typeof val2 == "string") {
    val2.toUpperCase();
}
//---------------------------------------------------------------
//* try-catch in TSC
//! Bad Practice to Handle Errors
try {
}
catch (error) {
    console.log(error.message);
}
//* Recommended way to Handle Error
try {
}
catch (error) {
    // add type guards
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log("Error", error);
}
//-------------------------------------------------------
// EXAMPLE: handling unknow data from API
// it automatically not recoginize , so we have to forcefully asset type
const data = "100rs is total expense of user";
const strData = data;
// void means not retruning any thing or dont care
function redirectBaseOnRole(role) {
    // type narrowing
    if (role == "admin") {
        console.log(` Redirect to admin dashboard `);
        return;
    }
    if (role == "user") {
        console.log(` Redirect to user dashboard `);
        return;
    }
    // when we handle all type cases
    // and want to check is anything left from - even it written in different Dir, Folder, File
    // we write this syntax at end
    role; //* --> (parameter) role: never
    //  CASE:  type Role = "admin" | "user"
    // if handle all types - we have only 2 --> then it must show never
    // CASE: type Role = "admin" | "user" | "superadmin"
    // it will show remaining type case
    //---> (parameter) role: "superadmin"
}
//-------------------------------------------------------------
//* Never ending and Never retruning any thing function
// e.g. web servers - continously run
function neverReturn() {
    while (true) { }
}
export {};
//# sourceMappingURL=5-more-types.js.map