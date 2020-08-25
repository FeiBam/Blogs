'use strict'

const { logger } = require('./logger')

const responseHandler = async (ctx) =>{
    if (ctx.result !== undefined){
        ctx.type = 'json'
        ctx.body = {
            status:200,
            message:ctx.msg || '',
            data:ctx.result
        }
    }
}

const errorHandler = async (ctx,next) => {
    return next().catch(err => {
        ctx.status = err.status || 500
        ctx.body = {
            status:err.status,
            code: err.code || -1,
            message: err.message.trim(),
            data: null
        }
        return Promise.resolve()
    })
}



module.exports = {
    responseHandler,
    errorHandler
}