const { Tag } = require('../member')


const TagApi = {
    /**
     *
     * @param data
     * @param Tra
     * @returns {Promise<Tag>}
     */

    async createTag(data,Tra){
        return Tag.create(data,{ transaction:Tra })
    },

    /**
     *
     * @param model
     * @param data
     * @param Tra
     * @returns {Promise<*>}
     */

    async updateTag(model,data,Tra){
        return model.update({
            name:data.name,
            target:data.target,
            icon:data.icon
        },{ transaction:Tra })
    },

    /**
     *
     * @param name
     * @param Tra
     * @param showDeleted
     * @returns {Promise<Promise<Tag> | Promise<Tag | null>>}
     */

    async getTagByName(name,Tra,showDeleted = false){
        return  Tag.findOne({
            where:{
                Name:name
            },
            paranoid: !showDeleted
        },{ transaction:Tra })
    },

    /**
     *
     * @param id
     * @param Tra
     * @param showDelete
     * @returns {Promise<Tag>}
     */


    async getTagByID(id,Tra,showDelete = false){
        return  Tag.findByPk(id,{ transaction:Tra , paranoid:!showDelete })
    },

    /**
     *
     * @param Tra
     * @param ShowDelete
     * @returns {Promise<Tag[]>}
     */

    async getAllTag(Tra,ShowDelete = false){
        return Tag.findAll({ paranoid: !ShowDelete },{ transaction:Tra  })
    },
    /**
     *
     * @param model
     * @param Tra
     * @param force
     * @returns {Promise<*>}
     */

    async deleteTag(model,Tra,force = false){
        return  model.destroy({ transaction:Tra , force:force })
    },

    /**
     *
     * @param model
     * @param Tra
     * @returns {Promise<{res}|void|*>}
     */

    async restoreTag(model,Tra){
        return model.restore({ transaction:Tra })
    },

    /**
     *
     * @param Article
     * @param Tra
     * @returns {Promise<*>}
     */

    async addArticle(Article,Tra){
        return  Tag.addArticle(Article,{ transaction:Tra })
    },

    /**
     *
     * @param Article
     * @param Tra
     * @returns {Promise<*>}
     */

    async removeArticle(Article,Tra){
        return  Tag.removeArticle(Article,{ transaction:Tra })
    }
}


module.exports = TagApi