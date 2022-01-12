const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const parser = require('ua-parser-js');

router.post('/login', userController.login);
router.get('/me', authentication, userController.me);
router.post('/register', userController.register);
router.put('/verification/:token', userController.verification);
router.post('/nope', function (req, res) {
    const ua = parser(req.headers['user-agent']);
    setTimeout(() => {
        res.status(200).json(ua)
    }, 4000);
})
router.get('/nope', function (req, res) {
    const ua = parser(req.headers['user-agent']);
    setTimeout(() => {
        res.status(200).json(ua)
    }, 4000);
})

module.exports = router; 
