//* Interfaces keyword in deatiled

interface Chai {
  flavour: string;
  price: number;
  isMilk?: boolean;
}

const MasalaChai: Chai = {
  flavour: "Masala Chai",
  price: 450,
};

//----------------------------------------------------------

//* readonly

interface Shop {
  readonly id: number;
  name: string;
}

const s: Shop = { id: 1, name: "chaicode cafe" };

//! ERROR: Cannot assign to 'id' because it is a read-only property.
// s.id = 23;

//--------------------------------------------

//* Methods

// first we define interface : means like as argument type and return type
// we did not define whole structure :  means definition of function

interface DiscountCalculator {
  // nameless method
  (price: number): number;
}

const apply50: DiscountCalculator = (price) => price * 0.5;

//---------------------------------------------------------------------

// Another Example

interface TeaMachine {
  start(order: number): void;
  stop(): void;
}

const machine: TeaMachine = {
  start(order) {
    console.log(` order  = ${order} `);
  },

  stop() {
    console.log(` Stop machine `);
  },
};

//----------------------------

//* Index Signature

interface ChainRatings {
  [flavour: string]: number;
}

const ratings: ChainRatings = {
  MasalaTea: 4.5,
  GingerTea: 3.7,
  KhulladTea: 5,

  // MatkaTea: "4.5",
  //! ERROR: Type 'string' is not assignable to type 'number'.
};

//-------------------------------------------------

//* Merging Interfaces

// Methods1: automatically same name interfaces get merged

interface User {
  name: string;
}

interface User {
  age: number;
}

const U1: User = {
  name: "Luffy D Monkey",
  // if one property missing
  //! ERROR: Property 'age' is missing in type '{ name: string; }' but required in type 'User'.
  age: 34,
};

//---------------------------------------

// Method 2 : extends keyword

interface A {
  a: string;
}

interface B {
  b: string;
}

interface C extends A, B {}

const Book: C = {
  a: "English Literature",
  b: "Williams Shakespear",
};
