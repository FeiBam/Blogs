const { Account,Article } = require('../db/member')

const AccountService = {
    async createAccount(data, Tra) {
        return await Account.create({
            name: data.name,
            passWord: data.passWord,
            img: data.img,
        }, {transaction: Tra})
    },
    async getAllAccount(Tra,showDelete = false){
        return await Account.findAll({},{transaction: Tra , paranoid:showDelete })
    },
    async updateAccount(model,data,Tra){
        return model.update(data,{transaction:Tra})
    },
    async deleteAccount(model,Tra,force = false){

    }
}

module.exports = AccountService