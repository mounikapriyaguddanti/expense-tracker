// ExpenseForm.js

import React, { useState } from 'react';
import './ExpenseForm.css'; // Import the CSS file for styling

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !amount.trim()) return; // Prevent adding empty expenses

    const newExpense = {
      id: Math.random().toString(),
      title: title.trim(),
      amount: +amount.trim()
    };

    onAddExpense(newExpense);

    // Reset input fields after adding expense
    setTitle('');
    setAmount('');
  };

  return (
    <div className="form-container">
      <h2>Enter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter expense title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter expense amount"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Add Expense" />
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
