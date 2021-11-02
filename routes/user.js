const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router.get('/me', auth, userController.me);
router.post('/register', userController.register);

module.exports = router; 
