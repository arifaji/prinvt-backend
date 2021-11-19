const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const logger = require('../utill/logger');
const { ErrorHandler } = require('../utill/errorHandler');
const { httpStatus } = require('../utill/enums');


class AuthController {
    static async login(req, res, next) {
        try {
            const { error } = AuthController.validate(req.body);
            if (error) throw new ErrorHandler(httpStatus.bad, error.details[0].message);

            let user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(400).send('Invalid email or password.');

            const validPassword = await bcrypt.compareSync(req.body.password, user.password);
            if (!validPassword) return res.status(400).send('Invalid email or password.');

            const token = user.generateAuthToken();
            res.send(token);
        } catch (error) {
            next(error);
        }
    }

    static validate(req) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(req);
    }
};

module.exports = AuthController;