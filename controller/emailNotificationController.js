const response = require('../util/response');
const Joi = require('joi');
const emailNotificationService = require('../service/emailNotificationService');

class EmailNotification {
    static async sendEmailNotification (req, res, next) {
        try {
            const result = await emailNotificationService.sendEmailNotification(req.body);
            console.log('result : ', result)
            response.ok(res, result)
        } catch (error) {
            next(error);
        }

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

module.exports = EmailNotification