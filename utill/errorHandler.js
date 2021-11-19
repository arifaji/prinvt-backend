const { httpStatusDefaultMesage } = require('../utill/enums');
const { internalServerError } = require('../utill/response');


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
    internalServerError(res, `${e} | ${err}`, _pathName(error));
  }
};

module.exports = {
  ErrorHandler,
  handleError
};