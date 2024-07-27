// src/App.jsx
import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    try {
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(storedExpenses);
    } catch (error) {
      console.error('Error parsing stored expenses:', error);
      setExpenses([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
    </div>
  );
};

export default App;
