// app.js

const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const dateInput = document.getElementById("expense-date");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-expense");
const filterDate = document.getElementById("filter-date");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render expenses
function renderExpenses(filter = null) {
  expenseList.innerHTML = "";
  let total = 0;

  const listToShow = filter
    ? expenses.filter((exp) => exp.date === filter)
    : expenses;

  listToShow.forEach((exp, index) => {
    total += parseFloat(exp.amount);

    const li = document.createElement("li");
    li.innerHTML = `
            <span>${exp.name} - ₦${exp.amount} (${exp.date})</span>
            <button onclick="removeExpense(${index})">Delete</button>
        `;
    expenseList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

// Add expense
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    name: nameInput.value,
    amount: amountInput.value,
    date: dateInput.value,
  };

  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  form.reset();
});

// Remove expense
function removeExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(filterDate.value);
}

// Filter by date
filterDate.addEventListener("input", () => {
  renderExpenses(filterDate.value);
});

// Initial render
renderExpenses();
