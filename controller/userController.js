const userService = require('../service/userService');
const response = require('../util/response');

class UserController {
    static async insertEvent(req, res, next) {
        try {
            const event = await userService.insertEvents(req);
            response.ok(res, event);
        } catch (error) {
            next(error);
        }
    }

    static async getEvents(req, res, next) {
        try {
            const events = await userService.getAllEventByUserId(req);
            const result = JSON.parse(JSON.stringify(events))
            result.forEach((data) => {
                data.eventImage = 'https://source.unsplash.com/h-ACUrBngrw/1280x720'
                data.eventAvatar = 'https://avatars.dicebear.com/api/initials/john%20doe.svg'
            })
            response.ok(res, result);
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