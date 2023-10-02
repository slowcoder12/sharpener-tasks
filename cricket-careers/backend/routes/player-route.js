const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.post('/addPlayer', playerController.addPlayer);

router.get('/searchPlayer/:name',playerController.searchPlayer);


router.put('/updatePlayer/:id',playerController.updatePlayer)

module.exports = router;