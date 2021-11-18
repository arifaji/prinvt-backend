const express = require('express');
const user = require('./user');
const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.use('/api', user);
  app.use(error);
}