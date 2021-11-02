const winston = require('winston');

const timezoned = () => {
    return new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta'
    });
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console, ({
        timestamp: true,
        format: winston.format.simple(),
    }));
};

module.exports = logger;