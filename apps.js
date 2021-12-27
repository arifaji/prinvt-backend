const speakeasy = require("speakeasy");

// Generate a secret key.
var secret = speakeasy.generateSecret({length: 20});
// Access using secret.ascii, secret.hex, or secret.base32.

var token = speakeasy.totp({
    secret: secret.ascii,
    encoding: 'ascii'
});

var tokenValidates = speakeasy.totp.verify({
    secret: secret.ascii,
    encoding: 'ascii',
    token,
    window: 6
});
console.log({ token, secret })
console.log(tokenValidates);