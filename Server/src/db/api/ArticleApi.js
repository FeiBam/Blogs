const { Article,Account,Tag } = require('../member')


const ArticleApi = {
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
        return  Article.removeTag(Tag,{ transaction:Tra })
    },
    async getTag(model,Tra){
        return model.getTags({ transaction:Tra })
    },
}


module.exports = ArticleApi