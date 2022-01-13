const BlogDB = require('../db/index')

const ErrCodeMixin = require('../unit/errorHandel/errorCodeMinxi')
const ArticleApi = require('../db/api/ArticleApi')
const Article = require('../db/model/article')
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
        return await ArticleApi.addTags(ArticleModel,TagModelArr,Tra)
    }catch (e) {
        throw e
    }
}

ArticleService.setAccount = async (ctx,Tra,ArticleModel,AccountName) => {
    try {
        const AccountModel =  await AccountApi.getAccountByName(AccountName,Tra)
        if (!AccountModel){
            return UserErrHandel(ctx,400,code.USER_NOT_FOUND,'没有这个管理员！')
        }
        return await ArticleApi.setAccount(ArticleModel,AccountModel,Tra)
    }catch (e) {
        throw e
    }
}

ArticleService.getAllArticleNum = async (ctx,Tra) => {
    try {
        return await ArticleApi.getAllArticleNum(Tra)
    }catch (e){
        throw e
    }
}

ArticleService.getPage = async (ctx,Tar,PageNum,showDelete = false ) => {
    try {
        const limit = config.select.blog.pageArticleLimit
        const offset = (PageNum - 1) * limit
        return await ArticleApi.getArticleByLimitWithAll(Tar, limit, offset,showDelete)
    }catch (e){
        throw e
    }
}

ArticleService.getArticleById = async (ArticleId,Tra,ShowDelete = false) => {
    try {
        return await ArticleApi.getArticleById(ArticleId,Tra,ShowDelete)
    }catch (e) {
        throw e
    }
}


class ArticleServices {
    constructor(Tra,Model) {
        if (!Tra){
            throw new Error('Transaction params is required')
        }
        if (!Model){
            this.Model = undefined
        }
        else this.Model = Model
        this.Tra = Tra
    }
    async getArticleById(id,showDelete,Tra){
        this.Model = await Article.findByPk(id,{ transaction:this.Tra , paranoid:!showDelete })
    }
    getArticleData(){
        return this.Model.toJSON()
    }
    async getTags(){
        return await this.Model.getTags({transaction: this.Tra})
    }
    async addTag(TagModel){
        await this.Model.addTags(TagModel, {transaction: this.Tra})
    }
    async getCreatorInfo(){
        return await this.Model.getAccount({transaction: this.Tra})
    }
}

module.exports = {
    ArticleService,
    ArticleServices
}