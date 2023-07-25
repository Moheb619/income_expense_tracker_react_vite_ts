import React, { useState, useEffect } from "react";

const ExpensePage: React.FC = () => {
  const [expenseTransactions, setExpenseTransactions] = useState<string[]>([]);
  const [newTransaction, setNewTransaction] = useState("");

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenseTransactions");
    if (storedExpenses) {
      setExpenseTransactions(JSON.parse(storedExpenses));
    }
  }, []);

  const addTransaction = () => {
    if (newTransaction !== "") {
      const updatedExpenseTransactions = [...expenseTransactions, newTransaction];
      setExpenseTransactions(updatedExpenseTransactions);
      setNewTransaction("");
      localStorage.setItem("expenseTransactions", JSON.stringify(updatedExpenseTransactions));
    }
  };

  const deleteTransaction = (index: number) => {
    const updatedExpenseTransactions = expenseTransactions.filter((_, i) => i !== index);
    setExpenseTransactions(updatedExpenseTransactions);
    localStorage.setItem("expenseTransactions", JSON.stringify(updatedExpenseTransactions));
  };

  const clearAllTransactions = () => {
    setExpenseTransactions([]);
    localStorage.removeItem("expenseTransactions");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-red-800 mb-4">Expense Transactions</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
          placeholder="Enter expense transaction"
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button onClick={addTransaction} className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition-all">
          Add Transaction
        </button>
      </div>
      {expenseTransactions.length === 0 ? (
        <p className="text-gray-600">No expense transactions yet.</p>
      ) : (
        <>
          <ul>
            {expenseTransactions.map((transaction, index) => (
              <li key={index} className="bg-red-100 text-red-800 px-4 py-2 mb-2 rounded-md flex items-center justify-between">
                <span>{transaction}</span>
                <button className="text-red-600 hover:text-red-800" onClick={() => deleteTransaction(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearAllTransactions} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all">
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default ExpensePage;
