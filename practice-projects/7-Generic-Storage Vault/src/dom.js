// dom.js

// 1. Import your class (Make sure you point to the compiled .js file)
import { DataStorage } from '../dist/generic-storage-vault.js';

// 2. Initialize the Vault
const myVault = new DataStorage("Mall Food Vault");

// 3. Grab DOM Elements
const titleEl = document.getElementById("vault-title");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-qty");
const addBtn = document.getElementById("add-btn");
const outputList = document.getElementById("output-list");

// 1. Grab the new DOM Elements
const searchIdInput = document.getElementById("search-id");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

// Set the title on the screen
titleEl.innerText = myVault.vaultName;

// 4. Function to update the screen
function renderVault() {
    const items = myVault.getAll();

    // If getAll() returns a string (the empty message)
    if (typeof items === "string") {
        outputList.innerHTML = `<p class="empty-msg">${items}</p>`;
        return;
    }

    // If it returns an array, loop through and create HTML
    outputList.innerHTML = ""; // Clear current list
    
    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item-card";
        itemDiv.innerHTML = `
            <strong>${item.name}</strong> 
            <span>Qty: ${item.quantity}</span>
            <br>
            <small>ID: ${item.id}</small>
        `;
        outputList.appendChild(itemDiv);
    });
}

// 5. Button Click Event
addBtn.addEventListener("click", () => {
    const nameVal = nameInput.value;
    const qtyVal = Number(qtyInput.value);

    // Simple validation so we don't add empty items
    if (nameVal === "" || qtyVal <= 0) {
        alert("Please enter a valid name and quantity!");
        return;
    }

    // Create the item object. 
    // crypto.randomUUID() is built right into the browser!
    const newItem = {
        id: crypto.randomUUID(),
        name: nameVal,
        quantity: qtyVal
    };

    // Use your class method
    myVault.addItem(newItem);

    // Clear inputs and update screen
    nameInput.value = "";
    qtyInput.value = "";
    renderVault();
});

// 2. Add click event for the search button
searchBtn.addEventListener("click", () => {
    // Get the ID the user typed in
    const idToSearch = searchIdInput.value.trim();

    if (idToSearch === "") {
        alert("Please enter an ID to search for.");
        return;
    }

    // 3. Call your generic class method!
    const result = myVault.getItem(idToSearch);

    // 4. Handle the result
    // Remember: your method returns a string ("Item not exists") if it fails
    if (typeof result === "string") {
        searchResult.innerHTML = `<p class="empty-msg">${result}</p>`;
    } else {
        // If it succeeds, your filter() method returns an array of matches. 
        // We just grab the first one (index 0) since IDs are unique.
        const foundItem = result[0];
        
        // Display the found item in a green card
        searchResult.innerHTML = `
            <div class="item-card" style="border-left: 4px solid #28a745; background-color: #eafaf1;">
                <strong>✅ FOUND: ${foundItem.name}</strong> 
                <span>Qty: ${foundItem.quantity}</span>
                <br>
                <small>ID: ${foundItem.id}</small>
            </div>
        `;
    }

    // Clear the search input
    searchIdInput.value = "";
});

// Initial render to show the "empty" message
renderVault();