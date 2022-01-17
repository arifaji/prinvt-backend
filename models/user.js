const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  status: {
    type: String,
    required: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(activity) { 
  const token = jwt.sign({ _id: this._id, status: this.status, activity }, config.get('jwtPrivateKey'));
  return token;
}

userSchema.methods.generateVerificationToken = function() { 
  const token = jwt.sign({ _id: this._id, status: this.status }, config.get('jwtPrivateKey'), { expiresIn: '15m' });
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;