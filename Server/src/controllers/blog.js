const config = require('../config/index')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const ArticleService = require('../services/ArticleService')
const BlogDB = require('../db/index')
const respondHandel = require('../unit/respondHandel')


const blogControllers = {}


blogControllers.getPage = async (ctx) => {
    if (ctx.params.id < 1){
        return respondHandel.AttributeError(ctx,-1,'pageNum not allow')
    }
    const PageNum = ctx.params.id - 1
    const Transaction = await BlogDB.transaction()
    try {
        const Articles = await ArticleService.getArticles(PageNum,Transaction,config.select.blog.pageArticleLimit)
        Transaction.commit()
        return respondHandel.success(ctx,Articles,`ok`,null)
    }
    catch (err) {
        Transaction.rollback()
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
        return respondHandel.success(ctx,ArticleTag,'ok','0')
    }
    catch (e) {
        Transaction.rollback()
        throw e
    }

}



module.exports = blogControllers