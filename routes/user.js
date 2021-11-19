const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController')

router.post('/login', authController.login);
router.get('/me', auth, userController.me);
router.post('/register', userController.register);

module.exports = router; 
