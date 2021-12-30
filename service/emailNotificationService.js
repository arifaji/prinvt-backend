const nodemailer = require('nodemailer');
const config = require('config');
const { ErrorHandler } = require('../util/errorHandler');
const { httpStatus } = require('../util/enums');
const Joi = require('joi');

class EmailNotificationService {
    static async sendEmailNotification (payload) {
        //Using AOL smtp transport
        const { error } = EmailNotificationService._emailNotificationValidate(payload);
        const { toMany, toOne, subject, html } = payload;
        if (error) throw new ErrorHandler(httpStatus.bad, error.details[0].message);
        
        let to = null;
        if (toMany) {
            to = toMany.join();
        } else {
            to = toOne;
        }
        
        const transporter = nodemailer.createTransport({
            service: 'aol',
            auth: {
                user: config.get('emailService'),
                pass: config.get('passwordEmailService')
            }
        });
        // setup email data with unicode symbols
        const mailOptions = {
            from: `"Prinvt App" <${config.get('emailService')}>`, // sender address
            to,
            subject,
            html
        };
        // Code to send mail
        let info = await transporter.sendMail(mailOptions);
        return info;
    }

    static _emailNotificationValidate(payload) {
        const schema = Joi.object({
            toOne: Joi.string().default(null).email(),
            toMany: Joi.array().items(Joi.string().email()).default(null)
                .when('toOne', {
                    is: null,
                    then: Joi.array().items(Joi.required()),
                    otherwise: Joi.forbidden()
                }),
            subject: Joi.string().required(),
            html: Joi.string().required()
        });

        return schema.validate(payload);
    }
}

module.exports = EmailNotificationService