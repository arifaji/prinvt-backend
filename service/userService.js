const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const Joi = require('joi');
const { ErrorHandler } = require('../utill/errorHandler');
const { httpStatus } = require('../utill/enums');

class UserService {
    static async login(payload) {
      const { error } = UserService._loginValidate(payload);
      if (error) throw new ErrorHandler(httpStatus.bad, error.details[0].message);

      let user = await User.findOne({ email: payload.email });
      if (!user) throw new ErrorHandler(httpStatus.bad, 'Invalid email or password.');

      const validPassword = await bcrypt.compareSync(payload.password, user.password);
      if (!validPassword) throw new ErrorHandler(httpStatus.bad, 'Invalid email or password.');

      return user.generateAuthToken();
    }

    static _loginValidate(payload) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(payload);
    }

    static async me(id) {
        const user = await User.findById(id).select('-password');
        return user;
    }

    static async register(req, res) {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
}

module.exports = UserService