const { Article,Account,Tag } = require('../member')


const ArticleApi = {
    async createArticle(data,Tra){
        return Article.create({
            Title:data.Title,
            Introduction:data.Introduction,
            Subject:data.Subject,
        },{ transaction:Tra })
    },
    async updateArticle(model,data,Tra){
        return model.update({
            name:data.name,
            introduction:data.introduction,
            subject:data.subject
        },{ transaction:Tra })
    },
    async getArticlesByLimit(Tra,limit,offset,showDelete = false){
        return Article.findAll({
            limit:limit,
            offset:offset
        },{ transaction:Tra , paranoid:!showDelete })
    },
    async getArticleByLimitWithTag(Tra,limit,offset,showDelete = false){
        return Article.findAll({
            limit:limit,
            offset:offset,
            include:Tag
        },{ transaction:Tra , paranoid:!showDelete})
    },
    async getArticleByLimitWithAll(Tra,limit,offset,showDelete = false){
        return Article.findAll({
            limit:limit,
            offset:offset,
            include:[Tag,Account],
        },{ transaction:Tra , paranoid:!showDelete })
    },
    async getAllArticleWithAll(Tra,showDelete = false){
        return Article.findAll({},{ transaction:Tra , paranoid:!showDelete })
    },
    async getArticleByName(name,Tra,ShowDelete){
        return Article.findOne({
            where:name
        }, { transaction:Tra })
    },
    async getArticleById(id,Tra,showDelete = false){
        return Article.findByPk(id,{ transaction:Tra , paranoid:!showDelete })
    },
    async deleteArticle(ArticleModel,Tra,force = false){
        return ArticleModel.destroy({ transaction:Tra , force:force })
    },
    async restoreArticle(ArticleModel,Tra){
        return ArticleModel.restore({ transaction:Tra })
    },
    async addTag(ArticleModel,TagModel,Tra){
        return ArticleModel.addTag(TagModel ,{ transaction:Tra })
    },
    async addTags(ArticleModel,TagsModel,Tra){
        return ArticleModel.addTags(TagsModel , { transaction:Tra })
    },
    async removeTag(ArticleModel,TagModel,Tra){
        return ArticleModel.removeTag(Tag,{ transaction:Tra })
    },
    async getTag(ArticleModel,Tra){
        return ArticleModel.getTags({ transaction:Tra })
    },
    async addAccount(ArticleModel,AccountModel,Tra){
        return ArticleModel.addAccount(AccountModel, { transaction:Tra })
    }
}


module.exports = ArticleApi