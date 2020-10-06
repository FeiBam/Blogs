
const AccountApi = require('../db/api/AccountApi')
const AccountService = require('../services/AccountService')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const Config = require('../config/index')
const BlogDB = require('../db/index')
const { logger } = require('./logger')

module.exports = async function (ctx) {
    const Transaction = await BlogDB.transaction()
    const [err,data] = await asyncErrCatch(AccountApi.getAllAccount(Transaction))
    if (err){
        await Transaction.rollback()
        logger.error(`获取现有管理员失败！错误:${err}`)
        throw err
    }
    if (!data.length){
        logger.info(`没有发现任何管理员，创建默认管理员。`)
        const [err,data] = await asyncErrCatch(AccountService.CreateAccount(ctx,Transaction,Config.defaultAccount.Name,Config.defaultAccount.PassWord,null))
        if (err){
            await Transaction.rollback()
            logger.error(`初始化管理员失败！错误:${err}`)
            throw err
        }
        logger.info(`默认管理员创建成功！,账户名:${data.Name},密码:${Config.defaultAccount.PassWord}`)
        await Transaction.commit()
    }
}
