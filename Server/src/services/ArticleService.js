const BlogDB = require('../db/index')

const ErrCodeMixin = require('../unit/errorHandel/errorCodeMinxi')
const ArticleApi = require('../db/api/ArticleApi')
const AccountApi = require('../db/api/AccountApi')
const TagApi = require('../db/api/TagApi')

const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const config = require('../config/index')
const code = require('../config/code')
const { asyncErrCatch } = require('../unit/asyncErrCatch')

const ArticleService = {
}


ArticleService.createArticle = async (ctx,Tra,ArticleObject) => {
    try {
        const Article = {
            Title:ArticleObject.Title,
            Introduction:ArticleObject.Introduction,
            Subject:ArticleObject.Subject
        }
        return await ArticleApi.createArticle(Article, Tra)
    }
    catch (e) {
        throw e
    }
}

ArticleService.addTags = async (ctx,Tra,ArticleModel,Tags) => {
    try{
        let TagModelArr = []
        for (let item of Tags) {
            let TagModel = await TagApi.getTagByName(item.Name,Tra)
            if (!TagModel){
                UserErrHandel(ctx,400,code.PARAMS_ERROR,'错误！没有找到相关的Tag' )
            }
            TagModelArr.push(TagModel)
        }
        return  await ArticleApi.addTags(ArticleModel,TagModelArr,Tra)
    }catch (e) {
        throw e
    }
}


ArticleService.setAccount = async (ctx,Tra,ArticleModel,AccountName) => {
    try {
        const AccountModel =  await AccountApi.getAccountByName(AccountName,Tra)
        if (!AccountModel){
            UserErrHandel(ctx,400,code.USER_NOT_FOUND,'没有这个管理员！')
        }
        return await ArticleApi.setAccount(ArticleModel,AccountModel,Tra)
    }catch (e) {
        throw e
    }
}

module.exports = ArticleService