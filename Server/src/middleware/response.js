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
            status:ctx.status,
            code:err.code || -1,
            message: err.message || '',
            data:'',
            other:err.other
        }
        if (ctx.userErr){
            return Promise.resolve()
        }
        logger.error(err)
        return Promise.reject(err)
    })
}



module.exports = {
    responseHandler,
    errorHandler
}