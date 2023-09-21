const User = require('../models/user');
const fs = require('fs');

exports.getForm = (req,res)=>{
    fs.readFile('/Users/sreemanjuvvadi/repos/sharpener-tasks/full-book-app-18/views/index.html', 'utf8', (err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(data)

        }
    })
  
};

exports.postUser = (req,res)=>{
    // console.log(req.body.user,req.body.phone,req.body.email);
 const username = req.body.user;
 const phone = req.body.phone;
 const email = req.body.email
     User.create({
         username:username,
         phone:phone,
         email:email
     }).then(result=>{
         console.log("added user");
         res.redirect('/');
 
     }).catch(err=>{
         console.log(err);
     })
 };
 
exports.getAllUsers = (req, res) => {
    User.findAll()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  };

  exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.destroy({
      where: {
        id: userId
      }
    })
    .then(() => {
      res.status(204).send(); // Send a success response with status code 204 (No Content) for successful deletion
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
  };
