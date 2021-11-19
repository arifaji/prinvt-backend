const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const userService = require('../service/userService');
const response = require('../utill/response')

class UserController {
    static async login (req, res, next) {
        try {
            const token = await userService.login(req.body);
            res.send(token);
            res.end();
        } catch (error) {
            next(error);
        }
    }

    static async me(req, res) {
        try {
            const user = await userService.me(req.user._id);
            response.ok(res, user);
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res) {
        try {
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
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController