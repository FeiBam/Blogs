const { Article,Tag,Account } = require('../db/member')

const ArticleService = {
    async createArticle(data,Tra){
        return Article.create({
            name:data.name,
            introduction:data.introduction,
            subject:data.subject,
        },{ transaction:Tra })
    },
    async updateArticle(model,data,Tra){
        return model.update({
            name:data.name,
            introduction:data.introduction,
            subject:data.subject
        },{ transaction:Tra })
    },
    async getArticles(page,Tra,limit = 5,withTag = true,showDelete = false){
        const offset = Math.floor(page * limit)
        const queryOptions = {
        }
        if (typeof page === "number"){
            queryOptions['limit'] = limit
            queryOptions['offset'] = offset
        }
        if (withTag){
            queryOptions['include'] = [Tag,Account]
        }
        return Article.findAll(queryOptions, { transaction:Tra , paranoid:showDelete })
    },
    async getArticleById(id,Tra,showDelete = false){
        return Article.findByPk(id,{ transaction:Tra , paranoid:!showDelete })
    },
    async deleteArticle(model,Tra,force = false){
        return model.destroy({ transaction:Tra , force:force })
    },
    async restoreArticle(model,Tra){
        return model.restore({ transaction:Tra })
    },
    async addTag(Tag,Tra){
        return Article.addTag(Tag,{ transaction:Tra })
    },
    async removeTag(Tag,Tra){
        return await Article.removeTag(Tag,{ transaction:Tra })
    },
    async getTag(model,Tra){
        return await model.getTags({ transaction:Tra })
    }
}

module.exports = ArticleService