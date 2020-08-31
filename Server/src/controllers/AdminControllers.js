const ArticleService  = require('../services/ArticleService')
const AccountService = require('../services/AccountService')
const BlogDB = require('../db/index')

//DB required
const config = require('../config/index')

//config required
const respondHandel = require('../unit/respondHandel')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const Joi = require('@hapi/joi')
const Jois = require('../unit/Jois')
const schemas = require('../config/schemas')
const { ErrHandler } = require('../app')
//model required

function AttributeError(err) {
    const Err = new Error(err)
    Err.status = 401
    throw Err
}

const adminControllers = {
}

adminControllers.createArticle = async (ctx,next) =>{
    const Transaction = await BlogDB.transaction()
    const data = await Jois(schemas.Article,ctx.request.body,AttributeError)
    try {
        const ArticleObject = await ArticleService.createArticle(data,Transaction)
        console.log(ArticleObject)
        Transaction.commit()
        respondHandel.success(ctx,ArticleObject,'ok')
    }
    catch (err) {
        Transaction.rollback()
        throw err
    }
}

adminControllers.getAllArticle = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    try {
        const ArticleObject = await ArticleService.getArticles(null,Transaction,true)
        Transaction.commit()
        respondHandel.success(ctx,ArticleObject,'ok')
    }
    catch (err) {
        Transaction.rollback()
        throw err
    }
}

adminControllers.adminLogin = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    const UserName = ctx.request.body.Name
    const PassWord = ctx.request.body.Password

    const [err,Admin] = await asyncErrCatch(AccountService.getAccount(UserName,Transaction))
    if (err){
        ErrorHandel.EmitEvent(EventMixin.NOT_FOUND)
    }
}




module.exports = {
    adminControllers,
}