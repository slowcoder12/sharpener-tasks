const Expense  = require('../models/expense');

const fs = require('fs');

exports.getExpenseform = (req,res) =>{
    fs.readFile("./views/index.html","utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
}

exports.postExpense = (req,res)=>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
        amount:amount,description:description,category:category
    }).then(result=>{
        console.log("expense added");
        res.send();
    }).catch(err=>{
        console.log(err);
    })

    



};

exports.getExpenses = (req,res)=>{
    Expense.findAll().then(expenses=>{
        res.json(expenses)
    }).catch(err=>{
        console.log("error in fetching",err);
    })
}



exports.deleteExpense = (req,res)=>{
    const expId = req.params.id;
    Expense.destroy({
        where: {
            id: expId
        }
    }).then(()=>{
        res.status(204).send();

    }).catch(err=>{
        console.log(err);
    })

}
exports.expenseByID = (req,res) =>{
    const expId = req.params.id;
    Expense.findByPk(expId).then((expense)=>{
        res.json(expense);
        console.log(expense);
    }).catch(err=>{
        console.log(err);
    })

}

exports.editExpense = (req,res)=>{
    const expId = req.params.id;
    const updatedExpense = {
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
      };
    
      Expense.update(updatedExpense, {
        where: {
          id: expId,
        },
      })
        .then(() => {
          res.status(204).send();
        })
        .catch((err) => {
          console.log(err);
        });
}
