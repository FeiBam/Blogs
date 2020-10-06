const ErrCodeMixin = require('../unit/errorHandel/errorCodeMinxi')
const config = require('../config/index')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const ArticleService = require('../services/ArticleService')
const FriendService = require('../services/FriednLinksService')
const BlogDB = require('../db/index')
const { respondHandel } = require('../unit/respondHandel')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const { ObjectRemove } = require('../unit/SameObjectRemove')
import BlogForm from '../form/Blog'



const blogControllers = {}

blogControllers.getPage = async (ctx) => {
    if (ctx.params.id < 1){
        UserErrHandel(ctx,400, ErrCodeMixin.ATTRIBUTE_ERR )
    }
    const PageNum = ctx.params.id
    const BlogForm = new BlogForm()
    const {Articles,errCode} = await BlogForm.getPage(PageNum)
    if (errCode) {
        return respondHandel.AttributeError(ctx,errCode,'error')
    }
    return respondHandel.success(ctx,Articles,'ok')
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
