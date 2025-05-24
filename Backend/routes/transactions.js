const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addOrUpdateSaving, getSavings, deleteSaving } = require('../controllers/saving');

const router = require('express').Router();

// Income routes
router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome);

// Expense routes
router.post('/add-expense', addExpense)
      .get('/get-expenses', getExpense)
      .delete('/delete-expense/:id', deleteExpense);

// Saving routes
router.post('/add-saving', addOrUpdateSaving)
      .get('/get-savings', getSavings)
      .delete('/delete-saving/:id', deleteSaving);

module.exports = router;
