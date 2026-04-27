import { v4 as uuidv4 } from "uuid";
//TODO Storage Value (array of items)
// class with generic
// private
class DataStorage {
    // properties (state)
    vault = []; //  array of T
    vaultName;
    constructor(vaultName) {
        this.vaultName = vaultName; // why only this property in constructor ,
        // because we want to store to keep it permanent and initial value from user
    }
    //TODO methods addItem
    addItem(newItem) {
        // push into array
        this.vault.push(newItem);
        console.log(`New Item added into ${this.vaultName}`);
    }
    //TODO methods getItem
    getItem(id) {
        let foundItem = this.vault.filter((item) => item.id === id);
        // conditions
        if (foundItem.length === 0) {
            console.log(`Item not exists in ${this.vaultName}`);
            return " Item not exists ";
        }
        return foundItem;
    }
    //TODO methods getAll
    getAll() {
        if (this.vault.length === 0) {
            console.log(` No Item in ${this.vaultName}`);
            return `No item in ${this.vaultName}`;
        }
        return this.vault;
    }
}
//TODO Master function
function MasterFunction() {
    // intance
    let vaultStorage = new DataStorage("Food Vault");
    //* TEST
    // lets add few items from here
    vaultStorage.addItem({
        id: uuidv4(),
        name: "Golden Bakers Bread",
        quantity: 25,
    });
    vaultStorage.addItem({
        id: uuidv4(),
        name: "Golden Bakers Bread",
        quantity: 25,
    });
    vaultStorage.addItem({
        id: uuidv4(),
        name: "Food Court Cheese Slice",
        quantity: 120,
    });
    vaultStorage.addItem({
        id: uuidv4(),
        name: "Cinema Butter Popcorn",
        quantity: 85,
    });
    // getAll
    console.log(vaultStorage.getAll());
}
MasterFunction();
//# sourceMappingURL=generic-storage-vault.js.map