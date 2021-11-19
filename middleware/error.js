const { handleError } = require('../utill/errorHandler');

module.exports = function(err, req, res, next){
  handleError(err, res);
}