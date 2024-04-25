
// ExpenseList.js
import React, { useState, useEffect } from 'react';
import './ExpenseList.css';
import ExpenseModal from './ExpenseModal';

function ExpenseList({ salary, expenses, onUpdateExpense, onDeleteExpense }) {
  const [totalBalance, setTotalBalance] = useState(salary);
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  useEffect(() => {
    // Recalculate total balance whenever expenses change
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalBalance(salary - totalExpenses);
  }, [salary, expenses]);

  const handleUpdateExpense = (expense) => {
    setExpenseToUpdate(expense);
    setModalOpen(true);
  };

  const handleUpdateExpenseModal = (updatedExpense) => {
    onUpdateExpense(updatedExpense);
    setModalOpen(false);
  };

  const handleDeleteExpense = (expenseId) => {
    onDeleteExpense(expenseId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1 className="heading" style={{ textAlign: 'center' }}>
        Expenses {expenses[0]?.month || ':'}
      </h1>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
      <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Serial Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${expense.amount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }} className="buttons">
                <button onClick={() => handleUpdateExpense(expense)} className="update">
                  Update
                </button>
                <button onClick={() => handleDeleteExpense(expense.id)} className="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="total" style={{ textAlign: 'center', fontWeight: 'bold', display: 'flex' }}>
          Total Balance: ${totalBalance}
        </p>
      </div>
      {modalOpen && (
        <ExpenseModal
          expense={expenseToUpdate}
          onCloseModal={handleCloseModal}
          onUpdateExpense={handleUpdateExpenseModal}
        />
      )}
    </div>
  );
}

export default ExpenseList;
