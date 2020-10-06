
const AccountApi = require('../db/api/AccountApi')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const code = require('../config/code')
const BlogDB = require('../db/index')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')

module.exports = async (ctx,next) =>{
    try {
        const Transaction = await BlogDB.transaction()
        const AccountModel = await AccountApi.getAccountByName(ctx.state.AccountName,Transaction)
        if (AccountModel.Active === false){
            UserErrHandel(ctx,403,code.ACCOUNT_UN_ACTIVE,'你的账户没有激活！请修改密码再次尝试操作')
        }
        else {
            next()
        }
    }catch (e) {
        throw e
    }
}