// dom.js
import {
  cartEngine,
  billingFunction,
  inventory,
} from "../dist/e-commerc-cart-engine.js";

let currentCartState = {
  items: [],
  discountApplied: null,
};

const viewProducts = document.getElementById("view-products");
const viewBooks = document.getElementById("view-books");
const viewCheckout = document.getElementById("view-checkout");
const allProductsGrid = document.getElementById("all-products-grid");

function renderProducts() {
  allProductsGrid.innerHTML = "";

  inventory.forEach((product) => {
    const cartItem = currentCartState.items.find((i) => i.id === product.id);

    const btnText = cartItem
      ? `In Bag (${cartItem.quantity}) - Add More`
      : "Add to Cart";
    const btnClass = cartItem ? "btn-add added" : "btn-add";

    const cardHTML = `
            <div class="card">
                <img src="${product.imageUrl}" class="card-img" alt="${product.name}">
                <div class="card-body">
                    <span class="category-tag">${product.category}</span>
                    <h3 class="card-title" style="margin-top: 0.75rem;">${product.name}</h3>
                    <div class="card-price">$${product.price}</div>
                    <!-- Use our dynamic variables here -->
                    <button class="${btnClass}" onclick="handleAdd('${product.id}')">${btnText}</button>
                </div>
            </div>
        `;
    allProductsGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

window.handleAdd = (productId) => {
  const action = { type: "ADD_ITEM", id: productId };

  currentCartState = cartEngine(action, inventory, currentCartState);

  document.getElementById("cart-count").innerText =
    currentCartState.items.length;
  console.log("Cart Updated!", currentCartState);
};

renderProducts();

const navHome = document.getElementById("nav-home");
const navBooks = document.getElementById("nav-books");
const navCart = document.getElementById("nav-cart");

function switchView(viewName) {
  viewProducts.classList.add("hidden");
  viewBooks.classList.add("hidden");
  viewCheckout.classList.add("hidden");

  if (viewName === "products") viewProducts.classList.remove("hidden");
  if (viewName === "books") viewBooks.classList.remove("hidden");
  if (viewName === "checkout") {
    viewCheckout.classList.remove("hidden");
    renderCart();
  }
}

navHome.addEventListener("click", () => switchView("products"));
navBooks.addEventListener("click", () => switchView("books"));
navCart.addEventListener("click", () => switchView("checkout"));

const booksGrid = document.getElementById("books-grid");

function renderBooks() {
  const booksGrid = document.getElementById("books-grid");
  booksGrid.innerHTML = "";
  const justBooks = inventory.filter((item) => item.category === "book");

  justBooks.forEach((book) => {
    const cartItem = currentCartState.items.find((i) => i.id === book.id);
    const btnText = cartItem
      ? `In Bag (${cartItem.quantity}) - Add More`
      : "Add to Cart";
    const btnClass = cartItem ? "btn-add added" : "btn-add";

    const cardHTML = `
            <div class="card">
                <img src="${book.imageUrl}" class="card-img" alt="${book.name}">
                <div class="card-body">
                    <!-- Added Author and Total Pages here -->
                    <span class="category-tag">${book.author} • ${book.totalPages} pages</span>
                    <h3 class="card-title" style="margin-top: 0.75rem;">${book.name}</h3>
                    <div class="card-price">$${book.price}</div>
                    <button class="${btnClass}" onclick="handleAdd('${book.id}')">${btnText}</button>
                </div>
            </div>
        `;
    booksGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

renderBooks();

const checkoutList = document.getElementById("checkout-items-list");
const billSubtotal = document.getElementById("bill-subtotal");
const billTotal = document.getElementById("bill-total");
const inputTax = document.getElementById("input-tax");
const inputDiscount = document.getElementById("input-discount");

function renderCart() {
  checkoutList.innerHTML = "";

  if (currentCartState.items.length === 0) {
    checkoutList.innerHTML =
      '<p style="color: #6C757D;">Your bag is empty.</p>';
    updateBilling();
    return;
  }

  currentCartState.items.forEach((item) => {
    const itemRow = `
            <div style="display: flex; align-items: center; gap: 1.5rem; background: #fff; padding: 1rem; border-radius: 12px; border: 1px solid #E9ECEF; margin-bottom: 1rem;">
                <img src="${item.imageUrl}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.25rem;">${item.name}</h4>
                    <div style="color: #6C757D; font-size: 0.9rem;">$${item.price} each</div>
                </div>

                <!-- Quantity Controls -->
                <div style="display: flex; align-items: center; gap: 0.5rem; border: 1px solid #E9ECEF; border-radius: 6px; padding: 0.25rem;">
                    <button onclick="handleQtyChange('${item.id}', ${item.quantity - 1})" style="border: none; background: none; padding: 0.5rem; cursor: pointer;">-</button>
                    <span style="width: 20px; text-align: center; font-weight: 500;">${item.quantity}</span>
                    <button onclick="handleQtyChange('${item.id}', ${item.quantity + 1})" style="border: none; background: none; padding: 0.5rem; cursor: pointer;">+</button>
                </div>

                <div style="font-weight: bold; width: 80px; text-align: right;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>

                <button onclick="handleRemove('${item.id}')" style="border: none; background: none; color: #dc3545; cursor: pointer; padding: 0.5rem; font-size: 1.2rem;">&times;</button>
            </div>
        `;
    checkoutList.insertAdjacentHTML("beforeend", itemRow);
  });

  updateBilling();
}

window.handleAdd = (productId) => {
  const action = { type: "ADD_ITEM", id: productId };
  currentCartState = cartEngine(action, inventory, currentCartState);

  document.getElementById("cart-count").innerText =
    currentCartState.items.length;

  renderProducts();
  renderBooks();
  renderCart();
};

// Do the same for Remove and QtyChange
window.handleRemove = (productId) => {
  const action = { type: "REMOVE_ITEM", id: productId };
  currentCartState = cartEngine(action, inventory, currentCartState);

  document.getElementById("cart-count").innerText =
    currentCartState.items.length;
  renderCart();
  renderProducts();
  renderBooks();
};

window.handleQtyChange = (productId, newQty) => {
  const action = { type: "QTY_CHANGE", id: productId, qty: newQty };
  currentCartState = cartEngine(action, inventory, currentCartState);

  renderCart();
  renderProducts();
  renderBooks();
};

function updateBilling() {
  const currentTax = Number(inputTax.value) || 0;
  currentCartState.discountApplied = Number(inputDiscount.value) || null;

  const receipt = billingFunction(currentCartState, currentTax);

  billSubtotal.innerText = `$${receipt.subTotal.toFixed(2)}`;
  billTotal.innerText = `$${receipt.finalTotal.toFixed(2)}`;
}

inputTax.addEventListener("input", updateBilling);
inputDiscount.addEventListener("input", updateBilling);
