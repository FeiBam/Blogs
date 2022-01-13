const crypto = require('crypto');

function HMACSHA256(Value,Salt) {
    return crypto.createHmac('sha256', Salt).update(Value).digest('base64')
}


module.exports = {
    HMACSHA256
}