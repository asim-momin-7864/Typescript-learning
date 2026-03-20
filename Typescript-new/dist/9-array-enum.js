"use strict";
//* Array, Tuple, Enum
Object.defineProperty(exports, "__esModule", { value: true });
//* Array Decalring : Method 1 
const chaiFlavours = ["Tea Powder", "Sugar", "Water"];
const orderQuantity = [1, 2, 3, 2, 4, 2];
//* Array Decalring : Method 2
const coffeeFlavours = ["Coffee beans", "water"];
const teasArray = [
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
];
//-------------------------------------------
//* readonly
const citites = [
    "Pune",
    "Jaipure",
    "Dehli",
    "Bombay"
];
// no updates possible
// citites.push("London")
//! Property 'push' does not exist on type 'readonly string[]'.
//---------------------------------------------------------------------
//* Multi-Dimentional Array
const locations = [
    [12.34, 11.11],
    [44.13, 45.165],
];
//----------------------------------
//* Tuple
// we have to follow order
let ticketTuple;
ticketTuple = ["Sleeper Coach Express", 450, true];
//! ERROR: mis-match order is also not accepted
// ticketTuple = [450, true, "Sleeper Coach Express"]
//-----------------------------------------------------
//* Optional value ?
let trainTuple;
trainTuple = [" Rajdhani Express "]; // also fine
trainTuple = [" Rajdhani Express A/C ", 5660];
//-----------------------------------------------------------------
//* readonly tuple
const location = [22.45, 56.44];
//! ERROR: Cannot assign to '0' because it is a read-only property. 
// location[0] = 78.88;
//------------------------------------------------------------------
//* Named Tuple
// mostly used it
const AeroplanTicket = ["Banglure", 6700];
//--------------------------------------------------------------
//* enum
var CupSize;
(function (CupSize) {
    CupSize[CupSize["SMALL"] = 0] = "SMALL";
    CupSize[CupSize["MEDIUM"] = 1] = "MEDIUM";
    CupSize[CupSize["LARGE"] = 2] = "LARGE";
})(CupSize || (CupSize = {}));
const size = CupSize.SMALL;
console.log(` The coffee cup size is ${size}`);
//-----------------------------------------------------------------
//* Auto Increament Values
// if we declare value for one enum item, then it automatically declare/ assume next incremented values for other items in enum
var BiryaniPlate;
(function (BiryaniPlate) {
    BiryaniPlate[BiryaniPlate["SMALL"] = 100] = "SMALL";
    BiryaniPlate[BiryaniPlate["HALF"] = 101] = "HALF";
    BiryaniPlate[BiryaniPlate["MEDIUM"] = 102] = "MEDIUM";
    BiryaniPlate[BiryaniPlate["MEDIUMHALF"] = 103] = "MEDIUMHALF";
    BiryaniPlate[BiryaniPlate["LARGE"] = 104] = "LARGE";
    BiryaniPlate[BiryaniPlate["EXTRALARGE"] = 105] = "EXTRALARGE"; // 105 ..
})(BiryaniPlate || (BiryaniPlate = {}));
//------------------------------------------------
//* Values for Items
// As we use CAPITALE letters for declaring items in enum
// we declare values for items
var SeatType;
(function (SeatType) {
    SeatType["AC"] = " A/C Seat";
    SeatType["NAC"] = "Non A/C Seat";
})(SeatType || (SeatType = {}));
function seatBooking(seat) {
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
var User;
(function (User) {
    User["name"] = "Apple_cute45";
    User[User["age"] = 56] = "age";
})(User || (User = {}));
//-------------------------------------
//* const enum
// so we cannot change it later
// but in normal use also we keep enums consts / not update even without using const keyword 
var weather;
(function (weather) {
    weather["HOT"] = "summer";
    weather["COLD"] = "winter";
    weather["RAIN"] = "rainy";
})(weather || (weather = {}));
//------------------------------------------------------
//* Tuple problem - extra value push
let T = ["Hero_Hamada", 450];
T.push("Luffy");
// according to Tuple nature it should not accept extra value
// but it is accepting extra value beacuse , at the end it is Array
//# sourceMappingURL=9-array-enum.js.map