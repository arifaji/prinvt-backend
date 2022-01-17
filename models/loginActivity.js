const Joi = require('joi');
const mongoose = require('mongoose');

const LoginActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  browser: {
    type: String
  },
  os: {
    type: String
  },
  device: {
    type: String
  },
  cpu: {
    type: String
  },
  lastActive: {
    type: Date,
    required: true
  }
});

const LoginActivity = mongoose.model('LoginActivity', LoginActivitySchema);

function validateLoginActivity(user) {
  const schema = Joi.object({
    userId: Joi.objectId.required(),
    ip: Joi.string().required(),
    lastActive: Joi.date().required()
    
  });

  return schema.validate(user);
}

exports.LoginActivity = LoginActivity; 
exports.validate = validateLoginActivity;