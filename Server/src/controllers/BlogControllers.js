
const config = require('../config/index')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const ArticleService = require('../services/ArticleService')
const FriendService = require('../services/FriednLinksService')
const BlogDB = require('../db/index')
const { respondHandel } = require('../unit/respondHandel')




const blogControllers = {}
console.log(global.ErrorHandel)

blogControllers.getPage = async (ctx) => {
    if (ctx.params.id < 1){
        return respondHandel.AttributeError(ctx,-1,'Not Allow PageNum')
    }
    const PageNum = ctx.params.id
    const Transaction = await BlogDB.transaction()
    try {
        const Articles = await ArticleService.getPage(PageNum,Transaction)
        console.log(ErrHandler)
    }
    catch (err) {
        await Transaction.rollback()
        throw err
    }
}

blogControllers.getArticleTag = async (ctx) => {
    const ArticleId = ctx.params.id
    const Transaction = await BlogDB.transaction()
    try {
        const Article = await ArticleService.getArticleById(ArticleId,Transaction)
        const ArticleTag = await ArticleService.getTag(Article,Transaction)
        Transaction.commit()
        return respondHandel.success(ctx,ArticleTag,'ok',0)
    }
    catch (e) {
        Transaction.rollback()
        throw e
    }
}

blogControllers.getFriendLinks = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const [Err,FriendLinks] = await asyncErrCatch(FriendService.getAllFriendLinks(Transaction))
    if (err){
        Transaction.rollback()
        throw err
    }
    Transaction.commit()
    return respondHandel.success(ctx,FriendLinks,'ok',0)
}




module.exports = blogControllers