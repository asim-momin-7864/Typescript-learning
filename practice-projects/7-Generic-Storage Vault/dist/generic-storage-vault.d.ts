export interface Item {
    id: string;
    name: string;
    quantity: number;
}
export declare class DataStorage<T extends {
    id: string;
}> {
    private vault;
    vaultName: string;
    constructor(vaultName: string);
    addItem(newItem: T): void;
    getItem(id: string): T[] | " Item not exists ";
    getAll(): string | T[];
}
//# sourceMappingURL=generic-storage-vault.d.ts.map