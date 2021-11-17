const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

class UserController {
    static async me(req, res) {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
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

module.exports = UserController