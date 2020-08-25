const { Article,Tag,Account } = require('../db/member')
const config = require('../config/index')

const ArticleService = {
    async createArticle(data,Tra){
        return await Article.create({
            name:data.name,
            introduction:data.introduction,
            subject:data.subject,
        },{ transaction:Tra })
    },
    async updateArticle(model,data,Tra){
        return await model.update({
            name:data.name,
            introduction:data.introduction,
            subject:data.subject
        },{ transaction:Tra })
    },
    async getArticles(page,Tra,limit = 5,withTag = true,showDelete = false){
        const offset = Math.floor(page * limit)
        const queryOptions = {
            limit:limit,
            offset:offset,
        }
        if (withTag){
            queryOptions['include'] = [Tag,Account]
        }
        return await Article.findAll(queryOptions, { transaction:Tra })
    },
    async getArticleById(id,Tra,showDelete = false){
        return await Article.findByPk(id,{ transaction:Tra , paranoid:!showDelete })
    },
    async deleteArticle(model,Tra,force = false){
        return await model.destroy({ transaction:Tra , force:force })
    },
    async restoreArticle(model,Tra){
        return await model.restore({ transaction:Tra })
    },
    async addTag(Tag,Tra){
        return await Article.addTag(Tag,{ transaction:Tra })
    },
    async removeTag(Tag,Tra){
        return await Article.removeTag(Tag,{ transaction:Tra })
    },
    async getTag(model,Tra){
        return await model.getTags({ transaction:Tra })
    }
}

module.exports = ArticleService