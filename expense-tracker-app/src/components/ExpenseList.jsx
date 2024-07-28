// src/components/ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Expenses</h2>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <div key={expense.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p className="text-gray-700">{expense.category}</p>
              <p className="text-gray-500 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700">${expense.amount.toFixed(2)}</p>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No expenses recorded</p>
      )}
    </div>
  );
};

export default ExpenseList;
