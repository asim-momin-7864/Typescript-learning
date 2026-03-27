//* Object in tsc
// Basic rule use const to declare object
const chai = {
    name: "Masala Chai",
    price: 230,
    isHot: true,
};
// in background tsc automatically infer types like this
/*

- while infering types we use ";" for fields

{
    name: String;
    price: number;
    isHot: boolean;
}

*/
//----------------------------------------------
//* how we create our type inferences objects
let tea;
tea = {
    name: "Khullad chai",
    price: 340,
    isHot: true,
};
const venilla = {
    name: "Vanilla Double Cherry Ice Cream",
    flavour: "Vanilla",
    isCold: false,
    ingrediants: ["ice", "milk", "biscuits", "vanilla essencs"],
};
let smallCup = { size: "200ml" };
let bigCup = {
    size: "400ml",
    material: "steel", // extra field
};
// assign value to Cup types var
smallCup = bigCup;
// we assign extra fields to Cup type object but it does not throw error - bcz it only check for minimum required  fields
// it does not throw error for extra value
console.log(smallCup);
// let create a function who create object from Coffee type and use it
const updateCoffeePartially = (updates) => {
    // some operation on object
    console.log(` some fields we add/update in our coffee is ${updates}`);
};
updateCoffeePartially({ name: "Dark Coffee" });
updateCoffeePartially({ name: "Dark Coffee", isHot: false });
//! One issue with Partial is it make all fields options -- means it can pass mepty {} object also
updateCoffeePartially({});
// make func to make orders
const placeOrders = (order) => {
    console.log(" Coming Order :", order);
};
// placeOrders(
//     {
//         name: "chicken curry",
//         price: 200,
//     }
// )
//! ERROR
/*
Argument of type '{ name: string; price: number; }' is not assignable to parameter of type 'Required<Curry>'.
  Property 'isHot' is missing in type '{ name: string; price: number; }' but required in type 'Required<Curry>'.

*/
placeOrders({
    name: "chicken curry",
    price: 200,
    isHot: false,
});
const whiteCurry = {
    name: "White Curry",
    price: 500,
};
const tomotoSoup = {
    name: "Tomato Soup",
    isHot: true,
    spice: "Tomato",
};
export {};
//-----------------------------------------------------------
//# sourceMappingURL=7-object.js.map