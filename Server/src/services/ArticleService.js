const BlogDB = require('../db/index')

const ArticleApi = require('../db/api/ArticleApi')
const AccountApi = require('../db/api/AccountApi')
const TagApi = require('../db/api/TagApi')

const config = require('../config/index')

const { asyncErrCatch } = require('../unit/asyncErrCatch')

const ArticleService = {
}




ArticleService.getPage = async (PageNum,Tra) => {
    const offset = (PageNum - 1) * 5
    const limit = config.select.blog.pageArticleLimit
    const [Err,Article] = await asyncErrCatch(ArticleApi.getArticles(PageNum,limit,offset,null,Tra))
    if (Err){
        throw Err
    }
    if (!Article.length){
        return false
    }
    return Article
}



module.exports = ArticleService