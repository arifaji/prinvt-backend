const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');

router.post('/event', authentication, eventController.insertEvent);
router.get('/events', authentication, eventController.getEvents);
router.get('/event/:id', authentication, eventController.getEvent);

module.exports = router; 
