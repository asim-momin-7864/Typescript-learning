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
interface BillingSummary {
    subTotal: number;
    discountPercentage: number;
    discountAmount: number;
    taxAmount: number;
    finalTotal: number;
}
type CartItem<T extends Product> = T & {
    quantity: number;
};
interface CartStatus<T extends Product> {
    items: CartItem<T>[];
    discountApplied: number | null;
}
export declare const inventory: (Product | Book)[];
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
export declare function cartEngine<T extends Product>(action: AddItem | RemoveItem | QuantityChange, inventory: T[], userCart: CartStatus<T>): CartStatus<T>;
export declare function billingFunction<T extends Product>(userCartStatus: CartStatus<T>, taxAmount: number): BillingSummary;
export {};
//# sourceMappingURL=e-commerc-cart-engine.d.ts.map