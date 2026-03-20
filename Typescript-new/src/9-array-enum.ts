//* Array, Tuple, Enum

//* Array Decalring : Method 1 
const chaiFlavours: string[] = ["Tea Powder", "Sugar", "Water"];

const orderQuantity: number[] = [1, 2, 3, 2, 4, 2];

//* Array Decalring : Method 2
const coffeeFlavours: Array<string> = ["Coffee beans", "water"];

//--------------------------------------------------------

//* Custome Type Array

type Tea = {
    name: string;
    size: number;
    country: string;
}

const teasArray: Tea[] = [
    {
        name: "Masala",
        size: 4,
        country: "Arabica",
    },
    {
        name: "Ginger",
        size: 5,
        country: "India",
    },
    {
        name: "Khullad",
        size: 4,
        country: "Arabica",
    }
]

//-------------------------------------------

//* readonly

const citites: readonly string[] = [
    "Pune",
    "Jaipure",
    "Dehli",
    "Bombay"
]

// no updates possible

// citites.push("London")
//! Property 'push' does not exist on type 'readonly string[]'.

//---------------------------------------------------------------------

//* Multi-Dimentional Array

const locations: number[][] = [
    [12.34, 11.11],
    [44.13, 45.165],
]

//----------------------------------

//* Tuple
// we have to follow order

let ticketTuple: [string, number, boolean];

ticketTuple = ["Sleeper Coach Express", 450, true];

//! ERROR: mis-match order is also not accepted
// ticketTuple = [450, true, "Sleeper Coach Express"]

//-----------------------------------------------------

//* Optional value ?

let trainTuple: [string, number?]

trainTuple = [" Rajdhani Express "] // also fine

trainTuple = [" Rajdhani Express A/C ", 5660]

//-----------------------------------------------------------------

//* readonly tuple

const location: readonly [number, number] = [22.45, 56.44]

//! ERROR: Cannot assign to '0' because it is a read-only property. 
// location[0] = 78.88;

//------------------------------------------------------------------

//* Named Tuple
// mostly used it

const AeroplanTicket: [destination: string, price: number] = ["Banglure", 6700];

//--------------------------------------------------------------

//* enum

enum CupSize {
    SMALL, // It is Recommended Practice - to declare value in CAPITALIZATION
    MEDIUM,
    LARGE,
}

const size = CupSize.SMALL;
console.log(` The coffee cup size is ${size}`);

//-----------------------------------------------------------------

//* Auto Increament Values
// if we declare value for one enum item, then it automatically declare/ assume next incremented values for other items in enum
enum BiryaniPlate {
    SMALL = 100,
    HALF,  // 101
    MEDIUM, // 102
    MEDIUMHALF, // 103
    LARGE, // 104
    EXTRALARGE // 105 ..
}

//------------------------------------------------

//* Values for Items
// As we use CAPITALE letters for declaring items in enum
// we declare values for items

enum SeatType {
    AC = " A/C Seat",
    NAC = "Non A/C Seat"
}

function seatBooking (seat: SeatType) {
    console.log(`The booking seat type is ${seat}`);
}

seatBooking(SeatType.AC);

// seatBooking("Non A/C Seat")
//! Using enum means , other direct value on enum item is also not acceptable, 
// only values can pass through enum

//--------------------------------------------

// Multi-data type items enum
//! Creating multiple different datatype enum is not falls in RECOMMENDED pratice
// we clear seperate enums for same data types items

enum User {
    name = "Apple_cute45", // string
    age = 56, // number
}

//-------------------------------------

//* const enum
// so we cannot change it later
// but in normal use also we keep enums consts / not update even without using const keyword 
const enum weather {
    HOT = "summer",
    COLD = "winter",
    RAIN = "rainy",
}

//------------------------------------------------------

//* Tuple problem - extra value push

let T: [string, number] = [ "Hero_Hamada", 450 ]

T.push("Luffy");
// according to Tuple nature it should not accept extra value
// but it is accepting extra value beacuse , at the end it is Array