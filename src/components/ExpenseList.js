import React, { useState, useEffect } from 'react';

import ExpenseModal from './ExpenseModal';
import './ExpenseList.css'

function ExpenseList({ salary, expenses, onUpdateExpense, onDeleteExpense }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [totalBalance, setTotalBalance] = useState(salary);

  useEffect(() => {
    // Recalculate total balance whenever expenses change
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalBalance(salary - totalExpenses);
  }, [salary, expenses]);

  const handleOpenModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateExpense = (expense) => {
    handleOpenModal(expense);
  };

  const handleDeleteExpense = (expenseId) => {
    onDeleteExpense(expenseId);
  };

  return (
    <div>
      <h1 class="heading" style={{ textAlign: 'center' }}>Expenses</h1>

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
              <td style={{ border: '1px solid #ddd', padding: '8px' }} className='buttons'>
                <button onClick={() => handleUpdateExpense(expense)} class="update">Update</button> 
                <button onClick={() => handleDeleteExpense(expense.id)} class="delete" >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ExpenseModal className="balance"
          expense={selectedExpense}
          onCloseModal={handleCloseModal}
          onUpdateExpense={onUpdateExpense}
        />
      )}
      <div>
        <p class="total" style={{ textAlign: 'center', fontWeight: 'bold', display: 'flex' }}>Total Balance: ${totalBalance}</p>
      </div>
    </div>
  );
}

export default ExpenseList;
