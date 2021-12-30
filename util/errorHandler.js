const { httpStatusDefaultMesage } = require('../util/enums');
const { internalServerError } = require('../util/response');
const loger = require('../util/logger');
const logger = require('../util/logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const _defaultMessage = (message, httpStatus) => {
  if (message) return message;
  if (httpStatusDefaultMesage[httpStatus]) return httpStatusDefaultMesage[httpStatus];
  return null;
}

const _pathName = (err) => {
  try {
    const stack = err.stack.split('\n');
    path = stack[1].replace('    at ', '');
    return path;
  } catch (error) {
    return '';
  }
}

const handleError = (err, res) => {
  try {
    if(!(err instanceof ErrorHandler)) throw new Error;
    const { statusCode, message } = err;
    res.status(statusCode).json({
      success: false,
      message: _defaultMessage(message, statusCode)
    }); 
  } catch (e) {
    const error = err ? err : e
    logger.error({ message: error.message, path: _pathName(error)})
    internalServerError(res, error.message, _pathName(error));
  }
};

module.exports = {
  ErrorHandler,
  handleError
};