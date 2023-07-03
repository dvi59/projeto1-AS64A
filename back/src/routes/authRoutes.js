const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');



router.post('/Login', authController.login);
  
module.exports = router;