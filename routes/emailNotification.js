const express = require('express');
const router = express.Router();
const emailNotification = require('../controller/emailNotificationController');
router.post('/send-email-notif', emailNotification.sendEmailNotification);

module.exports = router; 