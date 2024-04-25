import React, { useState, useEffect } from 'react';
import './App.css';


const ExpenseTracker = () => {
  const [salary, setSalary] = useState('');
  const [rent, setRent] = useState('');
  const [emi, setEmi] = useState('');
  const [shopping, setShopping] = useState('');
  const [food, setFood] = useState('');
  const [householdPurposes, setHouseholdPurposes] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [showCalculations, setShowCalculations] = useState(false);

  useEffect(() => {
    const storedSalary = localStorage.getItem('salary');
    const storedRent = localStorage.getItem('rent');
    const storedEmi = localStorage.getItem('emi');
    const storedShopping = localStorage.getItem('shopping');
    const storedFood = localStorage.getItem('food');
    const storedHouseholdPurposes = localStorage.getItem('householdPurposes');
    const storedOtherExpenses = localStorage.getItem('otherExpenses');

    if (storedSalary) setSalary(storedSalary);
    if (storedRent) setRent(storedRent);
    if (storedEmi) setEmi(storedEmi);
    if (storedShopping) setShopping(storedShopping);
    if (storedFood) setFood(storedFood);
    if (storedHouseholdPurposes) setHouseholdPurposes(storedHouseholdPurposes);
    if (storedOtherExpenses) setOtherExpenses(storedOtherExpenses);
  }, []);

  useEffect(() => {
    const totalExpenses = parseFloat(rent) + parseFloat(emi) + parseFloat(shopping) + parseFloat(food) + parseFloat(householdPurposes) + parseFloat(otherExpenses);
    setTotalExpenses(totalExpenses);
    setSavings(parseFloat(salary) - totalExpenses);
  }, [salary, rent, emi, shopping, food, householdPurposes, otherExpenses]);

  const handleSave = () => {
    setShowCalculations(true);
    localStorage.setItem('salary', salary);
    localStorage.setItem('rent', rent);
    localStorage.setItem('emi', emi);
    localStorage.setItem('shopping', shopping);
    localStorage.setItem('food', food);
    localStorage.setItem('householdPurposes', householdPurposes);
    localStorage.setItem('otherExpenses', otherExpenses);
  };

  const handleClear = () => {
    setSalary('');
    setRent('');
    setEmi('');
    setShopping('');
    setFood('');
    setHouseholdPurposes('');
    setOtherExpenses('');
    setShowCalculations(false);
    localStorage.clear();
  };

  return (
    <div className="expense-tracker-container" >
      <div className="expense-tracker">
        <div className="input-section">
          <div className="user-data-box">
          
            <label>
              Salary:
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </label>
            <h2>Enter Your Expenses</h2>
            <label>
              Rent:
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
            </label>
            <label>
              EMI:
              <input
                type="number"
                value={emi}
                onChange={(e) => setEmi(e.target.value)}
              />
            </label>
            <label>
              Shopping:
              <input
                type="number"
                value={shopping}
                onChange={(e) => setShopping(e.target.value)}
              />
            </label>
            <label>
              Food:
              <input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </label>
            <label>
              Household Purposes:
              <input
                type="number"
                value={householdPurposes}
                onChange={(e) => setHouseholdPurposes(e.target.value)}
              />
            </label>
            <label>
              Other Expenses:
              <input
                type="number"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
              />
            </label>
            <div className="button-container">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="clear-button" onClick={handleClear}>Clear</button>
            </div>
          </div>
        </div>
        <div className="calculations-section">
          <div className={`calculations-box ${showCalculations ? 'show' : 'hide'}`}>
            
            {showCalculations ? (
              <>
                <p>Total Salary: <span>{salary}</span></p>
                <p>Total Expenses: <span>{totalExpenses}</span></p>
                <p>Savings: <span>{savings}</span></p>
              </>
            ) : (
              <p>Click "Save" to see calculations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;