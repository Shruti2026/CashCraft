const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addOrUpdateSaving, getSavings } = require('../controllers/saving');

const router = require('express').Router();

// end points created below

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    // param is id and to get it we do :id
    .delete('/delete-income/:id', deleteIncome)

    // for expense
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

    // for saving
    router.post('/add-saving', addOrUpdateSaving);
    router.get('/get-savings', getSavings);


module.exports = router