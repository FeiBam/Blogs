const Joi = require('@hapi/joi')
const { asyncErrCatch } = require('./asyncErrCatch')

module.exports = async (schema,data,callback) =>{
    const [err,checkStatus] = await asyncErrCatch(schema.validateAsync(data))
    if (err){
        callback(err)
    }
    else {
        return checkStatus
    }
}