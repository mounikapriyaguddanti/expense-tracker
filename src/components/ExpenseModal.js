// ExpenseModal.js
import React, { useState } from 'react';

function ExpenseModal({ expense, onCloseModal, onUpdateExpense }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);

  const handleUpdate = () => {
    const updatedExpense = {
      ...expense,
      title,
      amount: parseFloat(amount),
    };
    onUpdateExpense(updatedExpense);
    onCloseModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>&times;</span>
        <h2>Update Expense</h2>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;