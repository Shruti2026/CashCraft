import React, { useContext, useState } from "react";
import axios from 'axios';
import { INCOME_API, EXPENSE_API, SAVING_API } from '../api/apiEndpoints';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [error, setError] = useState(null);

  // Income
  const addIncome = async (income) => {
    try {
      await axios.post(INCOME_API.ADD, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding income');
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(INCOME_API.GET);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching incomes');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(INCOME_API.DELETE(id));
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting income');
    }
  };

  const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

  // Expense
  const addExpense = async (expense) => {
    try {
      await axios.post(EXPENSE_API.ADD, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding expense');
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(EXPENSE_API.GET);
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching expenses');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(EXPENSE_API.DELETE(id));
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting expense');
    }
  };

  const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

  const getSavings = async () => {
        try {
            const res = await axios.get(SAVING_API.GET);
            setSavings(res.data);
        } catch (error) {
            setError(error.response?.data?.message || '');
        }
    };

    const addSaving = async (saving) => {
        try {
            const res = await axios.post(SAVING_API.ADD_OR_UPDATE, saving);
            const returnedSaving = res.data.saving;

            setSavings(prevSavings => {
                const index = prevSavings.findIndex(s => s._id === returnedSaving._id);
                if (index !== -1) {
                    const updated = [...prevSavings];
                    updated[index] = returnedSaving; // replace updated saving
                    return updated;
                } else {
                    return [...prevSavings, returnedSaving]; // add new saving
                }
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Error adding saving');
        }
    };

    const deleteSaving = async (id) => {
        try {
            await axios.delete(SAVING_API.DELETE(id));
            setSavings(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting saving');
        }
    };

    const totalSavings = () => savings.reduce((acc, curr) => acc + curr.amount, 0);

  // Balance & History
  const totalBalance = () => totalIncome() - totalExpenses() - totalSavings();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 4);
  };

  return (
    <GlobalContext.Provider value={{
      // Income
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      totalIncome,

      // Expense
      addExpense,
      getExpenses,
      expenses,
      deleteExpense,
      totalExpenses,

      // Saving
      savings,
        getSavings,
        addSaving,
        deleteSaving,
        totalSavings,
        error,
        setError,

      // Others
      totalBalance,
      transactionHistory,
      error,
      setError
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
