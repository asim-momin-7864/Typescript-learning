//* E Commerc Cart Engine

//* Product interface

// Product Category
type ProductCategory = "electronic" | "food" | "book" | "skincare";

interface Product {
    id: string;
    imageUrl: string;
    name: string;
    category: ProductCategory;
    price: number;
}

interface Book extends Product {
    author: string;
    totalPages: number;
}

// Billing Format
interface BillingSummary {
    subTotal: number,
    discountPercentage: number,
    discountAmount: number,
    taxAmount: number,
    finalTotal: number,
}

//* CartItem interface

//! interface CartItem extends Product | Book {}
/*

Option 1: The Generic Way (Recommended & Most Powerful)

Since we decided to make the Engine generic, 
we don't actually need to hardcode Product | Book into the CartItem. 
We just tell it to accept any type T (as long as it qualifies as a Product), 
and we use a type alias with an Intersection (&) instead of an interface.


*/

// we are making generic type
// so here T is declaring , No any data type will be accepted.
//* Explanation of LHS --- any data type which minimum satisficed Product properties can allowed
type CartItem<T extends Product> = T & {
    quantity: number;
};

//* Explanantion of RHS --- add another property in T by uisng "&" operator.

//TODO CartStatus interface
interface CartStatus<T extends Product> {
    //? why here we passing Product and Book ?
    // as common how we use generics , while using generic we need to pass T, type -- thats it we are pas T value we delcared about , Product or Book
    items: CartItem<T>[];
    discountApplied: number | null; // % percentage
}

//TODO  DB Array with data
// We use (Product | Book)[] so the array safely accepts both base products and extended books
const inventory: (Product | Book)[] = [
    {
        id: "bk_001",
        name: "Powerless",
        category: "book",
        price: 19.99,
        imageUrl: "../products-images/b1.jpg",
        author: "Lauren Roberts",
        totalPages: 416,
    },
    {
        id: "bk_002",
        name: "Dune",
        category: "book",
        price: 14.99,
        imageUrl: "../products-images/b2.jpg",
        author: "Frank Herbert",
        totalPages: 896,
    },
    {
        id: "bk_003",
        name: "Atomic Habits",
        category: "book",
        price: 16.0,
        imageUrl: "../products-images/b3.jpg",
        author: "James Clear",
        totalPages: 320,
    },
    {
        id: "bk_004",
        name: "Project Hail Mary",
        category: "book",
        price: 22.5,
        imageUrl: "../products-images/b4.jpg",
        author: "Andy Weir",
        totalPages: 496,
    },
    {
        id: "bk_005",
        name: "1984",
        category: "book",
        price: 10.99,
        imageUrl: "../products-images/b5.png",
        author: "George Orwell",
        totalPages: 328,
    },
    {
        id: "el_001",
        name: "Wireless ANC Headphones",
        category: "electronic",
        price: 299.99,
        imageUrl: "../products-images/e1.jpg",
    },
    {
        id: "el_002",
        name: "Smartphone 5G Pro",
        category: "electronic",
        price: 999.0,
        imageUrl: "../products-images/e2.jpg",
    },
    {
        id: "el_003",
        name: "Mechanical Keyboard",
        category: "electronic",
        price: 149.5,
        imageUrl: "../products-images/e3.jpg",
    },
    {
        id: "el_004",
        name: "4K OLED Monitor",
        category: "electronic",
        price: 599.99,
        imageUrl: "../products-images/e4.jpg",
    },
    {
        id: "el_005",
        name: "Wireless Ergonomic Mouse",
        category: "electronic",
        price: 79.99,
        imageUrl: "../products-images/e5.jpg",
    },
    {
        id: "fd_001",
        name: "Organic Coffee Beans",
        category: "food",
        price: 18.5,
        imageUrl: "../products-images/f1.jpg",
    },
    {
        id: "fd_002",
        name: "Matcha Green Tea Powder",
        category: "food",
        price: 24.99,
        imageUrl: "../products-images/f5.jpg",
    },
    {
        id: "fd_003",
        name: "Artisan Dark Chocolate",
        category: "food",
        price: 6.99,
        imageUrl: "../products-images/f2.jpg",
    },
    {
        id: "fd_004",
        name: "Raw Organic Honey",
        category: "food",
        price: 12.0,
        imageUrl: "../products-images/f3.jpg",
    },
    {
        id: "fd_005",
        name: "Extra Virgin Olive Oil",
        category: "food",
        price: 16.5,
        imageUrl: "../products-images/f4.jpg",
    },
    {
        id: "sk_001",
        name: "Hydrating Face Cleanser",
        category: "skincare",
        price: 15.0,
        imageUrl: "../products-images/s1.jpg",
    },
    {
        id: "sk_002",
        name: "Vitamin C Serum",
        category: "skincare",
        price: 35.0,
        imageUrl: "../products-images/s2.jpg",
    },
    {
        id: "sk_003",
        name: "Daily SPF 50 Sunscreen",
        category: "skincare",
        price: 22.5,
        imageUrl: "../products-images/s3.jpg",
    },
    {
        id: "sk_004",
        name: "Retinol Night Cream",
        category: "skincare",
        price: 45.0,
        imageUrl: "../products-images/s4.jpg",
    },
    {
        id: "sk_005",
        name: "Hyaluronic Acid Moisturizer",
        category: "skincare",
        price: 28.0,
        imageUrl: "../products-images/s5.jpg",
    },
];

//TODO Actions Type (action name & payload)
// we are kind a simulating our REST requests
// or easily detecting request action and take action according to it in Master function

type AddItem = {
    type: "ADD_ITEM";
    id: string;
};

type RemoveItem = {
    type: "REMOVE_ITEM";
    id: string;
};

type QuantityChange = {
    type: "QTY_CHANGE";
    id: string;
    qty: number;
};

//TODO Master function
function cartEngine<T extends Product>(
    action: AddItem | RemoveItem | QuantityChange,
    inventory: T[],
    userCart: CartStatus<T>,
): CartStatus<T> {
    switch (action.type) {
        //Add Item func
        case "ADD_ITEM":


            //find item from inventory
            let pickItem: T | undefined = inventory.find(
                (item) => item.id === action.id,
            );

            // undefined case
            if (typeof pickItem === "undefined") {
                console.log("Item not found, Something went wrong");
                return userCart;
            }

            // convert type into CartItem
            let addedItem: CartItem<T> = {
                ...pickItem,
                quantity: 1,
            };


            //* is item already exists into cart? --> then increase quantity by +1
            let isExists: boolean = userCart.items.includes(addedItem);
            if (isExists) {

                // create new updated copy
                let updatedCopyItems: CartItem<T>[] = userCart.items.map(
                    (item) => {
                        if (item.id === addedItem.id) {
                            return item;
                        }

                        return item;
                    }
                )

                // update whole userCart
                return {
                    ...userCart,
                    items: updatedCopyItems,
                }
            }

            // add to cart

            //! Mutation
            // userCart.items.push(addedItem);
            // return userCart;

            //? how , we are updating items field with new one right ?? 
            //* --> but you are using old whole userCart var, just changing one filed by assign = operation  , that is mutating  variable is still old and you are asssigning new value
            //* we have to return whole new data with new var (name is same but re-declaring in memory) and new values (giving new values while declaring) , even other fields e.g like discountApplied is not chnaged   


            return {
                ...userCart,
                items: [...userCart.items, addedItem],
            };

        // Remove Item func
        case "REMOVE_ITEM":

            //* remove operation
            //! Lengthyy Approch : The Fix: Even though toSpliced is immutable (it returns a new array), you still need to return a new top-level object.

            // let indexOfItem: number = inventory.findIndex(
            //     (element) => element.id === action.id,
            // );

            // let updatedCart: CartItem<T>[] = userCart.items.toSpliced(indexOfItem - 1, 1);

            //* Short Way: Use .filter() to remove an item by ID; it's cleaner and less prone to "off-by-one" index errors.
            let updatedCart: CartItem<T>[] = userCart.items.filter(
                (item) => item.id !== action.id,
            );

            // userCart.items = updatedCart;
            // return userCart;

            return {
                ...userCart,
                items: updatedCart,
            };

        //quantity change
        case "QTY_CHANGE":

            //* if  quantity is 0
            if (action.qty === 0) {

                let newUpdatedCart: CartItem<T>[] = userCart.items.filter((item) => item.id !== action.id)

                return {
                    ...userCart,
                    items: newUpdatedCart,
                }
            }

            let newUpdatedCart: CartItem<T>[] = userCart.items.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        quantity: action.qty,
                    };
                }

                return item;
            });

            //! Mutation
            // userCart.items = newUpdatedCart;
            // return userCart

            return {
                ...userCart,
                items: newUpdatedCart,
            };

        default:
            console.log("Undefined Action");
            return userCart;
    }
}

//TODO Billing function

function billingFunction<T extends Product>(userCartStatus: CartStatus<T>, taxAmount: number): BillingSummary {

    // subtotal
    let subTotal: number = userCartStatus.items.reduce(
        (acc, curr) => acc + (curr.price * curr.quantity),
        0,
    );

    //* 2. The "Financial" Way (Rounding Half Up)

    /* Standard toFixed() can sometimes round inconsistently due to how computers handle binary decimals. For more accurate financial rounding, use Math.round() with a multiplier */

    // Rounds to 2 decimal places accurately
    const roundMoney = (num: number) => Math.round(num * 100) / 100;

    /*
     
    ? how roundMoney works?
     Math.round -The Math.round() static method returns the value of a number rounded to the nearest integer.

     0.9 -> 1
     5.95 -> 6
     5.5 -> 6
     5.05 -> 6
     -5.05 -> -5

     so lets shift decimal point, and make our number bigger ,so when we round up we dont messup with main number (before decimal .)
       
     to make number shift 
     245.6753 --> 24567.23434  (multiply by * 100)
     Math.round() --> 24568 (remove extra decimal values)
     then --> get back how many decimals you want .. here we want 2
     ---> 245.68 (divide by 100)

     */

    subTotal = roundMoney(subTotal);

    //! over complex ways
    // let finalTotal: number;
    // // if no discount applied , discount === 0 / null
    // if (userCartStatus.discountApplied === null) {
    //     finalTotal = subTotal + taxAmount;
    // };
    // // if discount applied
    // finalTotal = subTotal - userCartStatus.discountApplied


    // discount
    let discountPercentage: number = userCartStatus.discountApplied ?? 0;
    let discountAmount: number = (subTotal * discountPercentage) / 100;
    discountAmount = roundMoney(discountAmount);

    // final
    let taxableAmount: number = subTotal - discountAmount

    let finalTotal: number = taxableAmount + taxAmount;
    finalTotal = roundMoney(finalTotal);

    // billing summary
    let billingSummary: BillingSummary = {
        subTotal: subTotal,
        discountPercentage: discountPercentage,
        discountAmount: discountAmount,
        taxAmount: taxAmount,
        finalTotal: finalTotal,
    };

    // return
    return billingSummary;

};

//=========================================================

//* TEST

let addBook1: AddItem = {
    type: "ADD_ITEM",
    id: "bk_001",
};
let addBook2: AddItem = {
    type: "ADD_ITEM",
    id: "bk_002",
};
let item1: AddItem = {
    type: "ADD_ITEM",
    id: "el_003",
};
let item2: AddItem = {
    type: "ADD_ITEM",
    id: "el_005",
};

let removeItem: RemoveItem = {
    type: "REMOVE_ITEM",
    id: "el_002",
};

let quantityItem: QuantityChange = {
    type: "QTY_CHANGE",
    id: "bk_001",
    qty: 5,
};

let userCart: CartStatus<Product | Book> = {
    items: [],
    discountApplied: 40,
};

//* Actions

// as many time we perform some action backend will update global userCart var (state); 
//  thats how we can get new updated cart state each time
// without direclty mutating global variable 

userCart = cartEngine<Product | Book>(addBook1, inventory, userCart);
console.log("\n");
console.log(userCart);

userCart = cartEngine<Product | Book>(addBook2, inventory, userCart);
console.log("\n");
console.log(userCart);

userCart = cartEngine<Product | Book>(item1, inventory, userCart);
console.log("\n");
console.log(userCart);

userCart = cartEngine<Product | Book>(item2, inventory, userCart);
console.log("\n");
console.log(userCart);

// userCart = cartEngine<Product | Book>(removeItem, inventory, userCart);
// console.log("\n");
// console.log(userCart);

userCart = cartEngine<Product | Book>(quantityItem, inventory, userCart);

console.log("\n");
console.log(userCart);

console.log("\n");
// Billing
console.log(billingFunction<Product | Book>(userCart, 118));
