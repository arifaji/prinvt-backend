const express = require('express');
const user = require('./user');
const error = require('../middleware/error');
const emailNotification = require('./emailNotification')


module.exports = function(app) {
  app.use(express.json());
  app.use('/api', user);
  app.use('/api', emailNotification);
  app.use(error);
}