const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.get('/me', authentication, userController.me);
router.post('/register', userController.register);

module.exports = router; 
