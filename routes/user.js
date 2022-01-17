const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.get('/me', authentication, userController.me);
router.post('/register', userController.register);
router.put('/verification/:token', userController.verification);
router.post('/event', authentication, userController.insertEvent);
router.get('/events', authentication, userController.getEvents);

module.exports = router; 
