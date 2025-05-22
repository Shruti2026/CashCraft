const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addOrUpdateSaving, getSavings } = require('../controllers/saving');

const router = require('express').Router();

// end points created below

// Income routes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);

// Expense routes
router.post('/add-expense', addExpense);
router.get('/get-expense', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);

// Saving routes
router.post('/add-saving', addOrUpdateSaving);
router.get('/get-savings', getSavings);

module.exports = router