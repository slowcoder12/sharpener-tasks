const express = require('express');
const router = express.Router();

const usercontroller =  require('../controllers/usercontroller');

router.get('/',usercontroller.getForm );

router.post('/add',usercontroller.postUser);

router.get('/users', usercontroller.getAllUsers);

router.delete('/users/:id',usercontroller.deleteUser);



module.exports = router;