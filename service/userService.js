const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate: validateUser } = require('../models/user');
const { LoginActivity } = require('../models/loginActivity');
const Joi = require('joi');
const { ErrorHandler } = require('../util/errorHandler');
const { httpStatus, userStatus } = require('../util/enums');
const jwt = require('jsonwebtoken');
const config = require('config');
const emailNotificationService = require('./emailNotificationService');
const emailTemplate = require('../email/template');
const parser = require('ua-parser-js');

class UserService {
    static async login(req) {
      const payload = _.get(req, 'body');
      const { error } = UserService._loginValidate(payload);
      if (error) {
        throw new ErrorHandler(httpStatus.bad, error.details[0].message);
      }

      let user = await User.findOne({ email: payload.email });
      if (!user) {
        throw new ErrorHandler(httpStatus.bad, 'Invalid email or password.');
      }

      const validPassword = await bcrypt.compareSync(payload.password, user.password);
      if (!validPassword) {
        throw new ErrorHandler(httpStatus.bad, 'Invalid email or password.');
      }

      if (user.status === userStatus.NEWREG) {
        throw new ErrorHandler(
          httpStatus.unauthorized,
          'Please Verify Your Email.',
          { email: user.email }
        );
      }

      // const loginActivity = await UserService._loginActivity({ req, id: user._id })

      // return user.generateAuthToken(loginActivity._id);

      return user.generateAuthToken();
    }

    static _loginActivity ({ req, id}) {
      const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress
      const ua = parser(req.headers['user-agent']);

      const loginActivity = new LoginActivity({
        ip,
        userId: id,
        browser: _.get(ua, 'browser.name', null),
        os: _.get(ua, 'os.name', null),
        device: _.get(ua, 'device.model', null),
        cpu: _.get(ua, 'cpu.architecture', null),
        lastActive: Date.now()
      })
      return loginActivity.save();
    }

    static _loginValidate(payload) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(payload);
    }

    static async getAccount(id) {
      const user = await User.findById(id).select('-password');
      return user;
    }

    static async editAccount(req) {
      const { error } = UserService._editAccountValidate(req.body);
      if (error) {
        throw new ErrorHandler(httpStatus.bad, error.details[0].message);
      }

      const account = await User.findByIdAndUpdate(req.user._id, { 
        fullname: req.body.fullname,
        avatar: req.body.avatar
      },
      {
        new: true
      }).select('-password');

      if (!account) {
        throw new ErrorHandler(httpStatus.bad, 'Account not exist');
      };
      
      return account
    }

    static _editAccountValidate(payload) {
      const schema = Joi.object({
        fullname: Joi.string().min(5).max(255).required(),
        avatar: Joi.string().allow(null)
      });

      return schema.validate(payload);
    }

    static async me(id) {
        const user = await User.findById(id);
        return _.pick(user, ['_id', 'username', 'email', 'status', 'avatar']);
    }

    static async register(payload) {
        const { error } = validateUser(payload);
        const { fullname, username, email, password } = payload;
        if (error) throw new ErrorHandler(httpStatus.bad, error.details[0].message);
        let user = await User.findOne({ email: payload.email });
        if (user) throw new ErrorHandler(httpStatus.bad, 'Email already registered.');
        user = await User.findOne({ username: payload.username });
        if (user) throw new ErrorHandler(httpStatus.bad, 'Username already registered.');

        user = new User({
          fullname, username, email, password, status: userStatus.NEWREG
        });
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
        await user.save();
        const token = user.generateVerificationToken();
        const link = `${config.get('host')}/verification/${token}`
        let breaklink = ''
        link.match(/.{1,50}/g).forEach(link => {
            breaklink = breaklink + '<br />' + link
        })
        await emailNotificationService.sendEmailNotification({
            toOne: email,
            subject: 'Welcome to Prinvt!',
            html: emailTemplate.verification({
                link,
                breaklink
            })
        })
        return {
          link,
          breaklink,
          token,
          user: _.pick(user, ['_id', 'username', 'email', 'status'])
        };
    }

    static async verification(token) {
        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            const filter = { _id: decoded._id, status: decoded.status };
            const update = { status: userStatus.ACTIVE };
            const user = await User.findOneAndUpdate(filter, update, {
                new: true
            });
        
            if (!user) throw new ErrorHandler(httpStatus.bad, `Can't verify this user.`);
            
            return _.pick(user, ['_id', 'username', 'email', 'status']);
        } catch (error) {
            throw new ErrorHandler(httpStatus.bad, error.message);
        }
    }    
}

module.exports = UserService