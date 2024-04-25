import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseModal from './components/ExpenseModal';
import './App.css';
import './components/ExpenseList.css';
import './components/ExpenseForm.css';
import './components/ExpenseModal.css';

function App() {
  const [salary, setSalary] = useState(() => {
    return localStorage.getItem('salary') || 0;
  });
  const [month, setMonth] = useState('');
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem(month);
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [savedMonths, setSavedMonths] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    localStorage.setItem('salary', salary);
  }, [salary]);

  useEffect(() => {
    localStorage.setItem(month, JSON.stringify(expenses));
  }, [month, expenses]);

  useEffect(() => {
    // Get all months from local storage
    const months = Object.keys(localStorage).filter(key => key !== 'salary' && key !== 'expenses');
    // Sort the saved months in ascending order
    const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));
    setSavedMonths(sortedMonths);
  }, []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const updateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === updatedExpense.id) {
        return updatedExpense;
      }
      return expense;
    });
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (expenseId) => {
    let ans=prompt('Are you sure(y/n)?')
    if (ans==='y'){
      const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
      setExpenses(updatedExpenses);
    }
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    // Retrieve expenses for the selected month from local storage
    const storedExpenses = localStorage.getItem(event.target.value);
    setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
  };

  const handleMonthlySavings = () => {
    fetchDataFromLocalStorage();
  };

  const handleRefresh = () => {
    alert("Saved sucessfully")
    fetchDataFromLocalStorage();
  };

  const fetchDataFromLocalStorage = () => {
    // Get all months from local storage
    const months = Object.keys(localStorage).filter(key => key !== 'salary' && key !== 'expenses');
    // Sort the saved months in ascending order
    const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

    // Calculate and display monthly savings for keys representing months
    const savings = sortedMonths.map(savedMonth => {
      if (isValidMonth(savedMonth)) {
        const savedExpenses = JSON.parse(localStorage.getItem(savedMonth)) || [];
        const totalExpenses = savedExpenses.reduce((total, expense) => total + expense.amount, 0);
        const monthlySaving = salary - totalExpenses;
        return { month: savedMonth, totalExpenses, saving: monthlySaving };
      }
      return null;
    }).filter(saving => saving !== null);
    setMonthlySavings(savings);

    // Calculate and set total savings
    const total = savings.reduce((acc, curr) => acc + curr.saving, 0);
    setTotalSavings(total);
  };

  const isValidMonth = (month) => {
    // Regular expression to match month names
    const monthRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)$/i;
    return monthRegex.test(month);
  };

  return (
    <div className='App'>
      <h1 className='main-heading'>Expense Tracker</h1>
      <div className="container">
        <div className="left-column">
          <div className="input-wrapper">
            <label>
              Select Month:
              <select className='input' value={month} onChange={handleMonthChange}>
                <option value="" disabled>Select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </label>
            <label>
              Enter Salary:
              <input type="number" value={salary} onChange={handleSalaryChange} />
            </label>
          </div>
          <ExpenseForm onAddExpense={addExpense} />
        </div>
        <div className="right-column">
          <ExpenseList
            salary={salary}
            expenses={expenses}
            onUpdateExpense={updateExpense}
            onDeleteExpense={deleteExpense}
          />
          <div className='month-wise-savings'>
            <h2>Monthly Savings</h2>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Expenses</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                {monthlySavings.map((saving, index) => (
                  <tr key={index}>
                    <td>{saving.month}</td>
                    <td>{saving.totalExpenses}</td>
                    <td>{saving.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`total-savings ${totalSavings < 10000 ? 'blink-red' : ''}`}>
              <h3>Total Savings: ${totalSavings}</h3>
              <p></p>
            </div>

            <button onClick={handleRefresh}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
