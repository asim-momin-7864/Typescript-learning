//* Interfaces keyword in deatiled
const MasalaChai = {
    flavour: "Masala Chai",
    price: 450,
};
const s = { id: 1, name: "chaicode cafe" };
const apply50 = (price) => price * 0.5;
const machine = {
    start(order) {
        console.log(` order  = ${order} `);
    },
    stop() {
        console.log(` Stop machine `);
    },
};
const ratings = {
    MasalaTea: 4.5,
    GingerTea: 3.7,
    KhulladTea: 5,
    // MatkaTea: "4.5",
    //! ERROR: Type 'string' is not assignable to type 'number'.
};
const U1 = {
    name: "Luffy D Monkey",
    // if one property missing
    //! ERROR: Property 'age' is missing in type '{ name: string; }' but required in type 'User'.
    age: 34,
};
const Book = {
    a: "English Literature",
    b: "Williams Shakespear",
};
export {};
//# sourceMappingURL=10-interface.js.map