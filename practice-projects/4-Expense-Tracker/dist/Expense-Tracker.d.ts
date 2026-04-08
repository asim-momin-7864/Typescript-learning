export declare enum Categories {
    FOOD = "Food",
    TRANSPORT = "Transport",
    UTILITIES = "Utilities",
    ENTERTAINMENT = "Entertainment",
    OTHER = "Other"
}
interface Expense {
    id: string;
    amount: number;
    category: Categories;
    description: string;
    date: Date;
}
declare function addExpense(amount: number, category: Categories, description: string): void;
declare function viewTotalExpenseByCategory(category: Categories, minAmt: number): void | number;
interface SummaryByCategories {
    [category: string]: {
        expenses: Expense[];
        total: number;
    };
}
declare function summaryEachCategory(): SummaryByCategories;
export { addExpense, viewTotalExpenseByCategory, summaryEachCategory };
//# sourceMappingURL=Expense-Tracker.d.ts.map