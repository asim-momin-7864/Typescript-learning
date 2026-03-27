//* OOPS in TSC

//* Class

class Chai {
  flavour: string;
  price: number;

  constructor(flavour: string, price: number) {
    this.flavour = flavour;
    this.price = price;

    // "this" also same as in Normal JS
    console.log(this); // refere to new object
  }
}

//* need to pass argument - Good Practice
// const masalaChai = new Chai();
//! ERROR : Expected 2 arguments, but got 0.

// create instance as do in normal JS
const masalaChai = new Chai("Ginger", 20);
masalaChai.flavour = "Masala";

//------------------------------------------------------------

//* Access Modifiers
// public
// private

class User {
  //* public
  public username: string = "Luffy Monkey";

  //* private
  // only accessible within class
  private password: string = "1234luffy456";

  //If want to share private property - make method
  // method will define how to give that private property

  revealPassword() {
    // some processing if want
    return this.password; // this way access is good, no direct access
  }

  //* protected - we image as Staff Door in resturant
  // get access only within classs or inherited class (means instances does not have access)
  protected age: number = 23;
}

// let make inherited class from User

class AdultUser extends User {
  // let make method with uses that property /return
  getAge() {
    return ` User age is ${this.age} `;
  }
}

// use or access of getAge

new AdultUser().getAge();

//-----------------------------------------------------

//* Private (#) variable
//  Another Way for declaring it

// but using "private" keyword way is more preferable

class Wallet {
  // private variable
  #balance = 100;

  // via method access private variable
  getBalance() {
    return this.#balance;
  }
}

// instance
const w = new Wallet();

w.getBalance();

//--------------------------------------------------------

//* readonly properties
// once set after that cannot change

class Cup {
  readonly capacity: number = 200;

  constructor(capacity: number) {
    this.capacity = capacity;
  }
}

//-----------------------------------------------------------

//* Controlled Gate - getters, setters

class Item {
  // private value
  // we use underscore " _" to show its is private property - just a convention (not mandetory)
  private _price = 200;

  //getter
  get price() {
    // some process if needed
    return this._price;
  }

  //setter
  set price(value: number) {
    // some logic, process
    if (value > 5) {
      throw new Error(`too expensive`);
    }

    this._price = value;
  }
}

const tshirt = new Item();
tshirt.price = 500;

//-------------------------------------------------------------

//* static
// read from here about static : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#static_methods_and_fields

class Admin {
  // static
  static database = "MongoDB";

  // we can directly declare variable / properties in constuctor also
  constructor(public username: string) {
    //
  }
}

// only accessible directly by object
console.log(Admin.database);

//--------------------------------------------------

//* abstract classes - we dont want classes dont create object

abstract class Drink {
  abstract make(): void;
}

class MyChai extends Drink {
  make() {
    console.log(` Brewing chai `);
  }
}

//-----------------------------------------
//* Composition
// some uses inheritance , some uses this composition
// kind a alternative to inheritance

class Heater {
  // method
  heat() {
    console.log(` put it in oven `);
  }
}

class ChaiMaker {
  constructor(private heater: Heater) {}

  make() {
    // we have all access of Heater class's properties
    this.heater.heat;
  }
}
