
//* RECOMMEDED PRACTICES 

//* Type Narrowing

function getOrder(order: string | number) {

   if (typeof order === 'string') {

      //* here your order variable, system detect its string so it treat as it string and show string methods 

      //  `Your order is ${order.toLocaleString()} ...`;
      //  `Your order is ${order.toLowerCase()} ...`;
      return `Your order is ${order} ...`;

   }

   //* here it knows its number so treat as it.

   //   ` your order quantity is ${order.toFixed()}`
   //   ` your order quantity is ${order.toPrecision()}`
   return ` your order quantity is ${order}`
}

//------------------------------------------------------------

//* Truthy value

// we use ? - if we are not sure about we get argument or not
function serveOrder(msg?: string) {

   // type narrowing
   if (msg) {
      return ` server message is ${msg}`;
   }

   return ` not get msg, so follow default message  `;
}

//---------------------------------------------------------------------

//* Exostive checks

function orderQuantity(size: "small" | "medium" | "large" | number) {

   if (size === "large") {
      return ` serve large`
   };

   if (size === "small" || size === "medium") {
      return ` serve in medium cup`
   }

   return ` server chai in quanty = ${size} `
}

//-----------------------------------------------

//* guard railes
// guard checking
// guard type checking

// classes
class googlePay {

   payment() {
      return `pay with google pay`
   }
}

class applePay {

   payment() {
      return `pay with apple pay`
   }
}

// we have multiple classes and have same name methods
// to call surely method from a specific class we can do checking like this 

function payment(payMethod: googlePay | applePay) {

   // guard rails checking
   if (payMethod instanceof googlePay) {
      payMethod.payment();
   };

   if (payMethod instanceof applePay) {
      payMethod.payment();
   };


}

//-------------------------------------------------

//* Custome Types
// we can make own types also

type payMode = {
   type: string,
   upiCode: number
}

//* CREATE isCheck function
//so, WE ARE SURE ABOUT RETURN VALUE

// we dont know about incoming object : any
// but the object we return its type is confirmed : payMode
function isPayMode(obj: any): obj is payMode {

   // more checking to make sure about it
   return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.type == "string" &&
      typeof obj.upiCode == "number"
   )
}

function shopping(pay: payMode | string) {

   if (isPayMode(pay)) {

      // we surelly direct access its properties beacuse this pass through strict checking: isPayMode
      return ` Payment ID is: ${pay.upiCode}, Mode: ${pay.type} `
   }

   // else case
   return ` Payment is from custome string mode`
}

//--------------------------------------------

//* VERY BETTER TYPE-SAFETY CODE 

//* we can add custome field named type with custome value as type

// this "type" is keyword
type tshirt = {

   // this "type" is field we use to define name for our custome type
   type: "tshirt",
   price: 1220,
};

type shirt = {
   type: "shirt",
   price: 1440,
};

type jeans = {
   type: "jeans",
   length: "40cm"
   price: 800,
};


//*  1 - we declare individual custome type (also add name for it)

// we have can define directly like this also

//? function buyCloths(item: tshirt | shirt | jeans ) {}

// BUT, what if there are 10 types 
// so to reduce it - and make more cleaner code
//* 2 -  we declare a type which can be have  

// assiging custome types to our item / variable - means what types our cloth variable should have
type cloths = tshirt | shirt | jeans;

//* more clearner version
function name(item: cloths) {
   switch (item.type) {
      case "tshirt":
         return `buy tshirt`;

      case "shirt":
         return `buy shirt`;

      case "jeans":
         return `buy jeans`;

      default:
         break;
   }
}

// one more function - example
function cutPantLength(item: cloths) {

   // checking length field - it only exsist in jeans
   if ("length" in item) {
      return ` Yes, length of jeans is customizable`
   };

   return ` this is item is not a jeans, so no lenght is customizable`;
}


//------------------------------------------------------

//* UNKOWN type
// RECOMMENDED more over any
// beacuse, when it arrive in fuction we are not sure, but later when it go our we are sure about it

//! WRONG way to implement TYPE GUARDS
// function isStringArray(arr: unknown): arr is string[] {

//    if (!Array.isArray(arr)) {
//       console.log(`not a array`);
//       return false;
//    }

//    arr = ['hi', 'hello'];
//    return arr;
// }

/*

*  TYPE GUARD 
 
The return type arr is string[] is a type predicate (also known as a custom type //* guard).

* When you use a type predicate, TypeScript expects the function to perform a check and return true or false:
  
If it returns true, TypeScript will treat arr as a string[] wherever you called this function.  
If it returns false, TypeScript knows it's not a string[].
  
Because you are returning ['hi', 'hello'] (an array) instead of true or false, TypeScript throws an error.

*/

function isStringArray(arr: unknown): arr is string[] {
   // Check if it's an array
   if (!Array.isArray(arr)) {
      return false;
   }

   // Check if every item in the array is a string
   return arr.every(item => typeof item === 'string');
}