const { Account,Article } = require('../member')

const AccountApi = {
    async createAccount(data, Tra) {
        return await Account.create({
            Name: data.Name,
            PassWord: data.PassWord,
            Img: data.Img,
        }, {transaction: Tra})
    },
    async getAccount(name,Tra){
        return await Account.findOne({
            where:{
                Name:name
            }
        },{ transaction:Tra })
    },
    async getAllAccount(Tra,showDelete = false){
        return await Account.findAll({},{transaction: Tra , paranoid:!showDelete })
    },
    async updateAccount(model,data,Tra){
        return model.update(data,{transaction:Tra})
    },
}

module.exports = AccountApi