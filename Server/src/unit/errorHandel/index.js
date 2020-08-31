const { respondHandel } = require('../respondHandel')
const ErrorCodeMixin = require('./errorCodeMinxi')



const Handel = {
    [ErrorCodeMixin.NOT_FOUND]:function (ctx) {
        return respondHandel.notFound(ctx,ErrorCodeMixin.NOT_FOUND)
    }
}


module.exports = Handel