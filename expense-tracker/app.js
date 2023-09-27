const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
const cors = require('cors');
const Expense = require('./models/expense');
const sequelize = require('./util/database');
const expRoute = require('./routes/expense-route');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static("views"));


app.get('/',expRoute);

app.post('/add', expRoute);

app.get('/expenses',expRoute);

app.delete('/expenses/:id',expRoute);

app.get('/expenses/:id',expRoute);

app.put('/expenses/:id',expRoute);







sequelize.sync().then(result=>{
    app.listen(3000);
   
})
.catch(err=>{
    console.log(err);
});