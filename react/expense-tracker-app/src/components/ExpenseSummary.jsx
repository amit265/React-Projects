// src/components/ExpenseSummary.jsx
import React from 'react';

const ExpenseSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <p className="text-gray-700">Total Expenses: ${totalExpenses.toFixed(2)}</p>
    </div>
  );
};

export default ExpenseSummary;
