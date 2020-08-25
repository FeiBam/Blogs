'use strict'
const { TokenCache } = require('../app')

module.exports = async (ctx,next) =>{
    if (ctx.get('Access-Token') !== ''){
        next()
    }
    else {
        ctx.status = 401
        throw new Error("You are not Login")
    }
}