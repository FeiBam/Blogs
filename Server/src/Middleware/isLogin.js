'use strict'
const { TokenCache } = require('../app')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const ErrTypeMixin = require('../unit/errorHandel/errorCodeMinxi')

module.exports = async (ctx,next) =>{
    if (!ctx.get('Access-Token')){
        UserErrHandel(ctx,401,ErrTypeMixin.NOT_LOGGED)
    }
    next()
}