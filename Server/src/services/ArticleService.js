const BlogDB = require('../db/index')

const ErrCodeMixin = require('../unit/errorHandel/errorCodeMinxi')
const ArticleApi = require('../db/api/ArticleApi')
const AccountApi = require('../db/api/AccountApi')
const TagApi = require('../db/api/TagApi')

const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const config = require('../config/index')

const { asyncErrCatch } = require('../unit/asyncErrCatch')

const ArticleService = {
}


ArticleService.getPage = async (ctx,Tra,PageNum) => {
    const offset = (PageNum - 1) * 5
    const limit = config.select.blog.pageArticleLimit
    const [Err,Articles] = await asyncErrCatch(ArticleApi.getArticleByLimitWithAll(Tra,limit,offset))
    if (Err){
        throw Err
    }
    if (Articles.length === 0){
        UserErrHandel(ctx,404 ,ErrCodeMixin.NOT_FOUND_ERR)
    }
    return Articles
}

ArticleService.getArticle = async (ctx,Tra,id,showDelete) => {
    const [Err,Article] = await asyncErrCatch(ArticleApi.getArticleById(id,Tra,showDelete))
}

module.exports = ArticleService