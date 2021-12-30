const { handleError } = require('../util/errorHandler');

module.exports = function(err, req, res, next){
  handleError(err, res);
}