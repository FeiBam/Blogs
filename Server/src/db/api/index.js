const BlogDB = require('../index')
const Account = require('../member').Account
const Article = require('../member').Article
const FriendLinks = require('../member').FriendLinks
const Tag = require('../member').Tag

class AccountApi{
    constructor() {
        this.account = []
    }
    async SelectAccount(name = null){
        if (name !== null){
            this.account = await Account.findOne({
                where:{
                    name:name
                }
            })
        }
        if (this.account){
            return this.account
        }
        return false
    }
    async CreateAccount(name,password,img){
    }
}

module.exports = {
    AccountApi
}