const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const checkToken = require('../middlewares/checkToken')

router.get('/search', checkToken, carController.searchCars)
router.post('/register', checkToken, carController.addCar)

module.exports = router;
