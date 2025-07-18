//
function addtwo(num: number) {
    return num + 2;
    // return "hellow" <= this is supported but we dont want 
};


//
function getUpper(val: string) {
    return val.toUpperCase();
};

// providing default value , when we not pass that argument
function signupUser(name: string, email: string, isPaid: boolean = false) { }



// we add type safety on our arguments ,
//? what about functions return value ?
// how to add typesafety of return value

function addThree(num: number): number {
    return num + 3;
}


// also lets see how to write arrow function with type safety 
const checkPassword = (password: number): boolean => {
    if (password === 123) {
        return true;
    } else {
        return false;
    }
}


//? if function return multiple types ??

const checkUsername = (username: string) => {
    if (username === "abcx") {
        return "password";
    } else {
        return false;
    }
}

// .map with type safety

let heros = ["thor", "vido", "aquaman"];

heros.map(
    (hero): string => {
        return `hero is ${hero}`;
    }
);


// function that return nothing : void
function consoleError(err: string): void {
    console.log(err);
};


// function that never return nothing : never | checkout document
function handleError(err: string): never {
    throw new Error(`Error at xyz controller => ${err}`);
};





addtwo(4);
getUpper("DaknightMOn");
signupUser("king", "king@k.ing", true);

// without agrument
signupUser("queen", "queen@qu.een");

addThree(5);

export { };