//* E Commerc Cart Engine
//TODO  DB Array with data
// We use (Product | Book)[] so the array safely accepts both base products and extended books
const inventory = [
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
//TODO Master function
function cartEngine(action, inventory, userCart) {
    switch (action.type) {
        //Add Item func
        case "ADD_ITEM":
            //find item
            let pickItem = inventory.find((item) => item.id === action.id);
            // undefined case
            if (typeof pickItem === "undefined") {
                console.log("Item not found, Something went wrong");
                return userCart;
            }
            // convert type into CartItem
            let addedItem = {
                ...pickItem,
                quantity: 1,
            };
            // add to cart
            //! Mutation
            // userCart.items.push(addedItem);
            // return userCart;
            return {
                ...userCart,
                items: [...userCart.items, addedItem],
            };
        // Remove Item func
        case "REMOVE_ITEM":
            let indexOfItem = inventory.findIndex((element) => element.id === action.id);
            // remove
            //! Lengthyy Approch : The Fix: Even though toSpliced is immutable (it returns a new array), you still need to return a new top-level object.
            // let updatedCart: CartItem<T>[] = userCart.items.toSpliced(indexOfItem - 1, 1);
            //* Short Way: Use .filter() to remove an item by ID; it's cleaner and less prone to "off-by-one" index errors.
            let updatedCart = userCart.items.filter((item) => item.id !== action.id);
            // userCart.items = updatedCart;
            // return userCart;
            return {
                ...userCart,
                items: updatedCart,
            };
        //quantity change
        case "QTY_CHANGE":
            // if  quantity is 0
            // if (action.qty === 0) {
            // }
            let newUpdatedCart = userCart.items.map((item) => {
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
//* TEST
let addBook1 = {
    type: "ADD_ITEM",
    id: "bk_001",
};
let addBook2 = {
    type: "ADD_ITEM",
    id: "bk_002",
};
let item1 = {
    type: "ADD_ITEM",
    id: "el_002",
};
let item2 = {
    type: "ADD_ITEM",
    id: "el_002",
};
let removeItem = {
    type: "REMOVE_ITEM",
    id: "el_002",
};
let quantityItem = {
    type: "QTY_CHANGE",
    id: "bk_001",
    qty: 5,
};
let userCart = {
    items: [],
    discountApplied: 0,
};
userCart = cartEngine(addBook1, inventory, userCart);
console.log("\n");
console.log(userCart);
userCart = cartEngine(addBook2, inventory, userCart);
console.log("\n");
console.log(userCart);
userCart = cartEngine(item1, inventory, userCart);
console.log("\n");
console.log(userCart);
userCart = cartEngine(item2, inventory, userCart);
console.log("\n");
console.log(userCart);
userCart = cartEngine(removeItem, inventory, userCart);
console.log("\n");
console.log(userCart);
userCart = cartEngine(quantityItem, inventory, userCart);
console.log("\n");
console.log(userCart);
export {};
//# sourceMappingURL=e-commerc-cart-engine.js.map