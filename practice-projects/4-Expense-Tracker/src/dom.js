// Import all 3 functions from the COMPILED JavaScript engine file!
import { addExpense, summaryEachCategory, viewTotalExpenseByCategory, Categories } from '../dist/Expense-Tracker.js';

// --- DOM Elements ---
const form = document.getElementById('expense-form');
const systemMessage = document.getElementById('system-message');
const btnViewSummary = document.getElementById('btn-view-summary');
const summaryDisplay = document.getElementById('summary-display');

// New DOM Elements for Feature 3
const btnViewCategory = document.getElementById('btn-view-category');
const filterCategory = document.getElementById('filter-category');
const filterMinAmount = document.getElementById('filter-min-amount');
const filterDisplay = document.getElementById('filter-display');

// --- Feature 1: Handle Form Submission ---
form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const amountStr = document.getElementById('amount').value;
  const categoryValue = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  const amountNumber = parseFloat(amountStr);
  const categoryEnum = Categories[categoryValue.toUpperCase()];

  addExpense(amountNumber, categoryEnum, description);

  systemMessage.innerText = "Expense Added Successfully!";
  form.reset(); 

  setTimeout(() => { systemMessage.innerText = ""; }, 3000);
});

// --- Feature 2: Display the Rich Summary ---
btnViewSummary.addEventListener('click', () => {
  const dataObject = summaryEachCategory();
  summaryDisplay.innerHTML = "";
  const entries = Object.entries(dataObject);

  if (entries.length === 0) {
    summaryDisplay.innerHTML = "<p>No expenses recorded yet.</p>";
    return;
  }

  for (const [categoryName, categoryData] of entries) {
    const block = document.createElement('div');
    block.className = 'category-block';

    let htmlContent = `
      <h3 class="category-title">
        <span>[${categoryName}]</span>
        <span>$${categoryData.total.toFixed(2)}</span>
      </h3>
    `;

    categoryData.expenses.forEach(exp => {
      htmlContent += `
        <div class="expense-item">
          - ${exp.description}: $${exp.amount.toFixed(2)}
        </div>
      `;
    });

    block.innerHTML = htmlContent;
    summaryDisplay.appendChild(block);
  }
});

// --- Feature 3: View Total By Specific Category ---
btnViewCategory.addEventListener('click', () => {
  // 1. Grab the values from the new HTML inputs
  const categoryValue = filterCategory.value;
  const minAmountStr = filterMinAmount.value;

  console.log("categoryValue", categoryValue);
  console.log("categoryValue", typeof categoryValue);
  console.log("minAmountStr", minAmountStr);
  console.log("minAmountStr",typeof minAmountStr);
  
  

  // 2. Convert types
  const categoryEnum = Categories[categoryValue.toUpperCase()];

  console.log("categoryEnum", categoryEnum);
  

  const minAmountNumber = parseFloat(minAmountStr) || 0; // Default to 0 if left blank

  console.log("minAmountNumber", minAmountNumber);
  console.log("minAmountNumber", typeof minAmountNumber);
  

  // 3. Call the engine logic
  // (Assuming you updated your TS function to return a number instead of void)
  const categoryTotal = viewTotalExpenseByCategory(categoryEnum, minAmountNumber);

  // 4. Update the UI
  if (categoryTotal !== undefined) {
    filterDisplay.innerHTML = `Total for <strong>${categoryEnum}</strong> (Min $${minAmountNumber}): <strong>$${categoryTotal.toFixed(2)}</strong>`;
  } else {
    filterDisplay.innerHTML = `Check browser console (Update TS to return a number to see it here!)`;
  }
});