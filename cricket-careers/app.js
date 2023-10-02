const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./backend/util/database');
const playerRoute = require('./backend/routes/player-route');

app.use(express.json());
app.use(cors());
app.use(express.static('frontend'));


app.post('/addPlayer',playerRoute);

app.get('/searchPlayer/:name',playerRoute);

app.put('/updatePlayer/:id',playerRoute);


sequelize.sync().then(result=>{
    app.listen(3000);
   
})
.catch(err=>{
    console.log(err);
});



