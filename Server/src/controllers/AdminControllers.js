const ArticleService  = require('../services/ArticleService')
const AccountService = require('../services/AccountService')
const BlogDB = require('../db/index')

//DB required
const config = require('../config/index')

//config required

const { TokenCache } = require('../app')
const { respondHandel } = require('../unit/respondHandel')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const Jois = require('../unit/Jois')
const schemas = require('../config/schemas')

//model required

function AttributeError(err) {

}

const adminControllers = {
}

adminControllers.createArticle = async (ctx,next) =>{
    const Transaction = await BlogDB.transaction()
    const [Err,CheckedData] = await Jois(schemas.Article,ctx.request.body)
    if (Err){
        ctx.throw(400,'参数错误!',Err)
    }
    try {
        const ArticleObject = await ArticleService.createArticle(data,Transaction)
        console.log(ArticleObject)
        Transaction.commit()
        respondHandel.success(ctx,ArticleObject,'ok')
    }
    catch (err) {
        await Transaction.rollback()
        throw err
    }
}

adminControllers.getAllArticle = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    try {
        const ArticleObject = await ArticleService.getArticles(null,Transaction,true)
        await Transaction.commit()
        respondHandel.success(ctx,ArticleObject,'ok')
    }
    catch (err) {
        await Transaction.rollback()
        throw err
    }
}

adminControllers.adminLogin = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    const [Err,CheckedData] = await Jois(schemas.Login,ctx.request.body)
    if (Err){
        ctx.throw(400,'参数错误!',Err)
    }
    try{
        const AccessToken = await AccountService.Login(ctx,Transaction,CheckedData.UserName,CheckedData.PassWord)
        await Transaction.commit()
        ctx.set('Access-Token',AccessToken)
        ctx.set('Access-Control-Expose-Headers','Access-Token')
        respondHandel.success(ctx,'','ok')
    }
    catch (e) {
        await Transaction.rollback()
        throw e
    }
}




module.exports = {
    adminControllers,
}