const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const checkToken = require('../middlewares/checkToken')

router.get('/Cars', checkToken, carController.searchCars)
router.post('/CarsAdd', checkToken, carController.addCar)

module.exports = router;
