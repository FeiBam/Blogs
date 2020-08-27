
const AccountService = require('../services/AccountService')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const Config = require('../config/index')
const BlogDB = require('../db/index')
const { logger } = require('../Middleware/logger')

module.exports = async function () {
    const Transaction = await BlogDB.transaction()
    const [err,data] = await asyncErrCatch(AccountService.getAllAccount(Transaction))
    if (err){
        Transaction.rollback()
        logger.error(`获取现有管理员失败！错误:${err}`)
        throw err
    }
    if (data.length === 0){
        logger.info(`没有发现任何管理员，创建默认管理员。`)
        const [err,data] = await asyncErrCatch(AccountService.createAccount(Config.defaultAccount,Transaction))
        if (err){
            Transaction.rollback()
            logger.error(`初始化管理员失败！错误:${err}`)
            throw err
        }
        logger.info(`默认管理员创建成功！,账户名:${data.name},密码:${data.passWord}`)
        Transaction.commit()
    }
}