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

let tea: {
    name: string;
    price: number;
    isHot: boolean;
}

tea = {
    name: "Khullad chai",
    price: 340,
    isHot: true
}

//--------------------------------------------

//* Type Alias Objects

type Icecream = {

    name: string,
    flavour: string,
    isCold: boolean,
    ingrediants: string[]

}

const venilla: Icecream = {
    name: "Vanilla Double Cherry Ice Cream",
    flavour: "Vanilla",
    isCold: false,
    ingrediants: ["ice", "milk", "biscuits", "vanilla essencs"]
}

//--------------------------------

//* Duck Typing
// One Famous line in dev community: "If its look like a duck, if its walk like a duck then it might be a duck"

// tsc check for minimum required field, it does not throw error for extra field

type Cup = { size: string }

let smallCup: Cup = { size: "200ml" }

let bigCup = {
    size: "400ml",
    material: "steel"  // extra field

}

// assign value to Cup types var

smallCup = bigCup
// we assign extra fields to Cup type object but it does not throw error - bcz it only check for minimum required  fields
// it does not throw error for extra value
console.log(smallCup);


//------------------------------------------------------

//* Type seperation - Recommeded Practices, Clean Code
// seperatly declare types then use , Moduler way

// seperate types 
type Item = {
    name: string,
    cost: number,
    quantity: number
}

type Address = {
    street: string,
    landmark: string,
    pincode: number
}

// using in main type

type order = {
    username: string,
    items: Item[],
    address: Address,
}

//------------------------------------

//* Partial

// partically update or set values 
// we create Coffee type object but all fields is not necessory - we can add, remove, keep some fields means partially

type Coffee = {
    name: string,
    price: number,
    isHot: boolean,
}

// let create a function who create object from Coffee type and use it
const updateCoffeePartially = (updates: Partial<Coffee>) => {
    // some operation on object
    console.log(` some fields we add/update in our coffee is ${updates}`);
}

updateCoffeePartially({ name: "Dark Coffee" })
updateCoffeePartially({ name: "Dark Coffee", isHot: false })

//! One issue with Partial is it make all fields options -- means it can pass mepty {} object also
updateCoffeePartially({})

//-----------------------------------------------------------

//* Required

// we create type, in that we will keep fields value options - but still Required make it needed
type Curry = {
    name?: string,
    price?: number,
    isHot?: boolean,
}

// make func to make orders
const placeOrders = (order: Required<Curry>) => {
    console.log(" Coming Order :", order);
}

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

placeOrders(
    {
        name: "chicken curry",
        price: 200,
        isHot: false
    }
)

//-----------------------------------------

//* Pick

type RedCurry = {
    name: string,
    price: number,
    isHot: boolean,
    color: string,
    spice: string,
}

// create type with specific fields from main type

type BasicCurry = Pick<RedCurry, "name" | "price">;

const whiteCurry: BasicCurry = {
    name: "White Curry",
    price: 500,
}

//----------------------------------------
//* Omit

type Soup = Omit<RedCurry, "price" | "color">

const tomotoSoup: Soup = {
    name: "Tomato Soup",
    isHot: true,
    spice: "Tomato",
}

//-----------------------------------------------------------