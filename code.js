// Get the form, table, and expense list elements
const form = document.getElementById('expense-form');
const table = document.getElementById('expense-table');
const expenseList = document.getElementById('expense-list');

// Initialize an empty array to store expenses
let expenses = [];

// Load expenses from local storage
if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    displayExpenses();
}

// Add event listener to the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    addExpense(description, amount);
    form.reset();
});

// Add expense function
function addExpense(description, amount) {
    const expense = { description, amount };
    expenses.push(expense);
    saveExpensesToLocalStorage();
    displayExpenses();
}

// Display expenses function
function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

// Edit expense function
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        expense.description = document.getElementById('description').value;
        expense.amount = document.getElementById('amount').value;
        saveExpensesToLocalStorage();
        displayExpenses();
    });
}

// Delete expense function
function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpensesToLocalStorage();
    displayExpenses();
}

// Save expenses to local storage function
function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add event listeners to edit and delete buttons
expenseList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        editExpense(index);
    } else if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteExpense(index);
    }
});
