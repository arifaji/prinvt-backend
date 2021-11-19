// The request succeeded. The result meaning of "success" depends on the HTTP method
exports.ok = function(res, values) {
  var data = {
    'success': true,
    'data': values
  };
  res.status(200).json(data);
  res.end();
};

// The request succeeded, and a new resource was created as a result. 
// This is typically the response sent after POST requests, or some PUT requests
exports.created = function(res, values) {
  var data = {
    'success': true,
    'data': values
  };
  res.status(201).json(data);
  res.end();
};

// The server could not understand the request due to invalid syntax.
exports.bad = function(res, message = 'Bad Request...') {
  var data = {
    'success': false,
    message
  };
  res.status(400).json(data);
  res.end();
};

// Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". 
// That is, the client must authenticate itself to get the requested response.
exports.unauthorized = function(res, message = 'Unauthorized...') {
  var data = {
    'success': false,
    message
  };
  res.status(401).json(data);
  res.end();
};

// The client does not have access rights to the content; 
// that is, it is unauthorized, so the server is refusing to give the requested resource. 
// Unlike 401 Unauthorized, the client's identity is known to the server.
exports.forbidden = function(res, message = 'Forbidden...') {
  var data = {
    'success': false,
    message
  };
  res.status(403).json(data);
  res.end();
};

// The server has encountered a situation it does not know how to handle.
exports.internalServerError = function(res, message = 'Internal Server Error...') {
  var data = {
    'success': false,
    message
  };
  res.status(500).json(data);
  res.end();
};