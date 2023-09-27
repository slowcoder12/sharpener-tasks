const express = require('express');
const router = express.Router();

const expensecontroller = require('../controllers/expensecontroller');

router.get('/',expensecontroller.getExpenseform);

router.post('/add',expensecontroller.postExpense);

router.get('/expenses',expensecontroller.getExpenses);

router.delete('/expenses/:id',expensecontroller.deleteExpense);

router.get('/expenses/:id',expensecontroller.expenseByID);

router.put('/expenses/:id',expensecontroller.editExpense);






module.exports = router;