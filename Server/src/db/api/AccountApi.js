const { Account,Article } = require('../member')

const AccountApi = {
    async createAccount(data, Tra) {
        return await Account.create({
            name: data.name,
            passWord: data.passWord,
            img: data.img,
        }, {transaction: Tra})
    },
    async getAccount(name,Tra){
        return await Account.findOne({
            where:{
                name:name
            }
        },{ transaction:Tra })
    },
    async getAllAccount(Tra,showDelete = false){
        return await Account.findAll({},{transaction: Tra , paranoid:showDelete })
    },
    async updateAccount(model,data,Tra){
        return model.update(data,{transaction:Tra})
    },
}

module.exports = AccountApi