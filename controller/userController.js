const userService = require('../service/userService');
const response = require('../util/response');

class UserController {
    static async getAccount(req, res, next) {
        try {
            const user = await userService.getAccount(req.user._id);
            response.ok(res, user);
        } catch (error) {
            next(error);
        }
    }

    static async editAccount(req, res, next) {
        try {
            const user = await userService.editAccount(req);
            response.ok(res, user);
        } catch (error) {
            next(error);
        }
    }

    static async login (req, res, next) {
        try {
            const token = await userService.login(req);
            res.send(token);
            res.end();
        } catch (error) {
            next(error);
        }
    }

    static async me(req, res, next) {
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