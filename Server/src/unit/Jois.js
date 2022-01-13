const Joi = require('@hapi/joi')
const { asyncErrCatch } = require('./asyncErrCatch')

module.exports = async (schema,data) =>{
    return await asyncErrCatch(schema.validateAsync(data))
}