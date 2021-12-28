const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const userService = require('../service/userService');
const response = require('../utill/response');

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

    static async register(req, res, next) {
        try {
            const { token, user} = await userService.register(req.body);
            res.header('x-auth-token', token).send(user);
        } catch (error) {
            next(error);
        }
    }

    static async verification(req, res, next) {
        try {
            const user = await userService.verification(req.params.token);
            response.ok(res, user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController