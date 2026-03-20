//* Interface and "type" keyword

// use of "type" and "interface"
// where "type" brokes code - classes
// where we use "interface" insted of "type"

//------------------------------------------------------

// messy, repetable code

// func 1
function makeChai1(order:
    {
        type: string;
        sugar: number;
        strong: boolean
    }
) {
    console.log(`make chain`, order);
}

// func 2
function serveChai1(order:
    {
        type: string;
        sugar: number;
        strong: boolean
    }
) {
    console.log(`serve chain`, order);
}

//-----------------------------------------------------

//* use of type - avoid messy, repetable code

// declare type
type order = {
    type: string;
    sugar: number;
    strong: boolean;
};

// func 1
function makeChai2(order: order) {
    console.log(`make chain`, order);
}

// func 2
function serveChai2(order: order) {
    console.log(`serve chain`, order);
}

//-------------------------------------------------------------------

//* where "type" breaks and we use "interface"

// 1) "type" works example

type TeaRecipe = {
    water: number; // e.g. ml
    milk: number; // e.g. ml
};

// inherite type from class
class MasalaChai implements TeaRecipe {
    water = 100;
    milk = 40;
}

//----------------------------

//! 2) "type" breaks

type CupSize1 = "small" | "large";

/* 

class Chai implements CupSize1 {

}

*/

//! ERROR: A class can only implement an object type or intersection of object types with statically known members.

// Explanantion - class cannot inherite Custome data types

//-----------------------------------------------------

//* SOLUTION: we use "interface"

interface CupSize2 {
    size: "small" | "large";
}

class Chai implements CupSize2 {
    size: "small" | "large" = "large";
}

//----------------------------------------------------------

//! CASE: this type case also does not inherite by class

type Response1 = { ok: true } | { ok: false };

// class myRes implements Response1 {
//     ok: boolean = true ;
// }

//* SOLUTION: use interface

interface Response2 {
    ok: boolean;
}

class myRes implements Response2 {
    ok = true;
}

//--------------------------------------------------

//* Union ( | )

// formally this type know as "literla types" - beacusewe litterlly mentioned what will be values
type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
    console.log(t);
}

//---------------------------------------------------

//* And ( & ) - like we merge

type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type MasalaTea = BaseChai & Extra;

const cup: MasalaTea = {
    teaLeaves: 5,
    masala: 10,
};

//--------------------------------------

//* May be Missing ( ? )

type User = {
    username: string;
    bio?: string;
};

const u1: User = {
    username: "Luffy"
};

const u2: User = {
    username: "Hamada",
    bio: "Kind Tech Genius"
}

//---------------------------------------

//* Readonly

type config = {
    readonly appName: string
    version: number
}


const cfg: config = {
    appName: "MasterJi",  // it is readonly but we need to set it once
    version: 1.126
}


//! ERROR: Cannot assign to 'appName' because it is a read-only property.
// now we cannot set it again
// cfg.appName = "ChaiCode";