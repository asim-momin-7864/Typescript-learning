//* Generics - are templates
// how to make function more and more general
// make code more re-usable
//* mostly use when we design libraries/ framwork - because there we have to design very general code
// e.g. prisma, drissele ( typescript first )
// interfaces are also templates
// syntax
// T is some datatype (not fixed, not declared)
function wrapInArray(item) {
    return [item];
}
// here this functions reponsibility, to take item in one datatype and return array of that datatype
// different use
// string
wrapInArray("Shirt");
// number
wrapInArray(42);
// object
wrapInArray({
    flavour: "Ginger",
});
//--------------------------------------------------------------
// another example
// generics - also support Partial, Pick
function pair(a, b) {
    // return [ b, a ]
    //! ERROR: Type 'B' is not assignable to type 'A'. 'A' could be instantiated with an arbitrary type which could be unrelated to 'B'.
    // we have to follow proper order
    return [a, b];
}
// use
pair("masala", 20);
pair("masala", { flavor: "Ginger" });
// use: example 1
const numberBox = {
    // content: "12"
    //! ERROR: Type 'string' is not assignable to type 'number'.
    // same datatype value
    content: 10,
};
// use: example 2
const stringBox = {
    content: "ABS-34-KH",
};
// use
// T is datatype of API Response we get
// T is here object with flavour key-value
const res = {
    status: 200,
    data: {
        flavour: "masala",
    },
};
export {};
//-----------------------------
//* Some Point :
// - we mostly not define generics much
// - we get re-defined generics in React or in other libraries also
// - but above syntax we use while creating our own generics in our libraries or framworks
//# sourceMappingURL=12-generics.js.map