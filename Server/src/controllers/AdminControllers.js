const ArticleService  = require('../services/ArticleService')
const AccountService = require('../services/AccountService')
const TagService = require('../services/TagService')
const BlogDB = require('../db/index')

//DB required
const config = require('../config/index')
const code  = require('../config/code')
//config required

const { respondHandel } = require('../unit/respondHandel')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')

const Jois = require('../unit/Jois')
const schemas = require('../config/schemas')

//model required

function AttributeError(err) {

}

const adminControllers = {
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */



adminControllers.createArticle = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const [Err,CheckedData] = await Jois(schemas.Article,ctx.request.body)
    if (Err){
        UserErrHandel(ctx,400,code.PARAMS_ERROR,`参数错误！${err}`)
    }
    try {
        let ArticleModel = await ArticleService.createArticle(ctx,Transaction,CheckedData)
        ArticleModel = await ArticleService.addTags(ctx,Transaction,ArticleModel,CheckedData.Tags)
        ArticleModel = await ArticleService.addAccount(ctx,Transaction,ArticleModel,CheckedData.Creator.Name)
        await Transaction.commit()
        respondHandel.success(ctx,ArticleModel,'成功！')
    }
    catch (err) {
        await Transaction.rollback()
        throw err
    }
}

adminControllers.createTag = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const [Err,CheckedData] = await Jois(schemas.Tag,ctx.request.body)
    if (Err){
        UserErrHandel(ctx,400 , code.PARAMS_ERROR,`参数错误！${Err}`)
    }
    try {
        const Tag = await TagService.createTag(ctx,Transaction,CheckedData.TagName)
        Transaction.commit()
        respondHandel.success(ctx,Tag,'成功！')
    }catch (e) {
        await Transaction.rollback()
        throw e
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

adminControllers.getAllTags = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const ShowDelete = JSON.parse(ctx.params.ShowDelete)
    const [Err,Tags] = await asyncErrCatch(TagService.getAllTag(ctx,Transaction,ShowDelete))
    if (Err){
        throw Err
    }
    Transaction.commit()
    respondHandel.success(ctx,Tags,'ok')
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

adminControllers.deleteTag = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const TagName = ctx.request.body.TagName
    if (!TagName || TagName === ''){
        await Transaction.rollback()
        UserErrHandel(ctx,400,code.PARAMS_ERROR,'没有传递标签名称！')
    }
    const Tag = await TagService.deleteTag(ctx,Transaction,TagName,true)
    await Transaction.commit()
    respondHandel.success(ctx,Tag,'ok!')
    try {
    }catch (e) {
        await Transaction.rollback()
        throw e
    }
}


module.exports = {
    adminControllers,
}