import React, { useState, useEffect } from "react";

const IncomePage: React.FC = () => {
  const [incomeTransactions, setIncomeTransactions] = useState<string[]>([]);
  const [newTransaction, setNewTransaction] = useState("");

  useEffect(() => {
    const storedIncome = localStorage.getItem("incomeTransactions");
    if (storedIncome) {
      setIncomeTransactions(JSON.parse(storedIncome));
    }
  }, []);

  const addTransaction = () => {
    if (newTransaction !== "") {
      const updatedIncomeTransactions = [...incomeTransactions, newTransaction];
      setIncomeTransactions(updatedIncomeTransactions);
      setNewTransaction("");
      localStorage.setItem("incomeTransactions", JSON.stringify(updatedIncomeTransactions));
    }
  };

  const deleteTransaction = (index: number) => {
    const updatedIncomeTransactions = incomeTransactions.filter((_, i) => i !== index);
    setIncomeTransactions(updatedIncomeTransactions);
    localStorage.setItem("incomeTransactions", JSON.stringify(updatedIncomeTransactions));
  };

  const clearAllTransactions = () => {
    setIncomeTransactions([]);
    localStorage.removeItem("incomeTransactions");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Income Transactions</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
          placeholder="Enter income transaction"
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button onClick={addTransaction} className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 transition-all">
          Add Transaction
        </button>
      </div>
      {incomeTransactions.length === 0 ? (
        <p className="text-gray-600">No income transactions yet.</p>
      ) : (
        <>
          <ul>
            {incomeTransactions.map((transaction, index) => (
              <li key={index} className="bg-green-100 text-green-800 px-4 py-2 mb-2 rounded-md flex items-center justify-between">
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

export default IncomePage;
