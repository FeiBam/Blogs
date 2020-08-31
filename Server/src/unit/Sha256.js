const crypto = require('crypto');

function Sha256(Salt,Value) {
    return crypto.createHmac('sha256', Salt).update(Value).digest('hex')
}


module.exports = {
    Sha256
}