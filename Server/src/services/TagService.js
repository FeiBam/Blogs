const { Tag } = require('../db/member')


const TagService = {
    async createTag(data,Tra){
        return  Tag.create({
            name:data.name,
            target:data.target,
            icon:data.icon
        },{ transaction:Tra })
    },
    async updateTag(model,data,Tra){
        return model.update({
            name:data.name,
            target:data.target,
            icon:data.icon
        },{ transaction:Tra })
    },
    async getTag(names,Tra,showDeleted = false){
        return  Tag.findAll({
            where:{
                name:names
            }
        },{ transaction:Tra, paranoid: !showDeleted })
    },
    async getTagByID(id,Tra,showDelete = false){
        return  Tag.findByPk(id,{ transaction:Tra , paranoid:!showDelete})
    },
    async deleteTag(model,Tra,force = false){
        return  model.destroy({ transaction:Tra , force:force })
    },
    async restoreTag(model,Tra){
        return  model.restore({ transaction:Tra })
    },
    async addArticle(Article,Tra){
        return  Tag.addArticle(Article,{ transaction:Tra })
    },
    async removeArticle(Article,Tra){
        return  Tag.removeArticle(Article,{ transaction:Tra })
    }
}


module.exports = TagService