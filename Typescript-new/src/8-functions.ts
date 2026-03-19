//* Functions

//* type for parameters
function chai(order: string, quantity: number) {

    // some processing
    console.log(` order is ${order} and quantity is ${quantity} `);

}

chai("Ginger Chai", 5);

//----------------------------------------------------------

//* function return value type
function makeChai(size: string): number {

    // some processing
    // if (size === "200ml") {


    return 5;
}

makeChai("500ml");

//---------------------------------------------

//* some cases: multiple data type value returns

// function addSugar(quantity: string): boolean {

//     // returning null
//     if (!quantity) {
//         return null;
//     }

//     //! ERROR: Type 'null' is not assignable to type 'boolean'.

//     // some processing
//     // return boolean
//     return true;

// }


function addSugar(quantity: string) {

    // returning null
    if (!quantity) {
        return null;
    }

    // some processing
    // return boolean
    return true;

}

//----------------------------------

//* void
// functions not returning any value .e.g logger functions

function loggerMe(): void {
    console.log(` 500 request call to server `);

}

//------------------------------------------------

//* ?
// parameteres maybe provided or not provided

function coffeeOrder(quantity?: string) {

    // some processing
}

//----------------------------------
//* Predeclared value

function coffeeMaker(quantity: string = " 500 ml ") {
    console.log(` quantity for coffee is : ${quantity} `);

}

//-----------------------

// * Complex 
// Recommended Practice is we pre-declare type 
// "type" 

function createChai(
    recepi: {
        name: string;
        sugar_Qnt: number;
        size: "small" | "medium";
    }
): boolean {

    // some operations
    // chai is ready

    return true;
}
