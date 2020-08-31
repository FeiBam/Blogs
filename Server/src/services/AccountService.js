const AccountApi = require('../db/api/AccountApi')

const EventBus = require('../unit/EventBus')
const ErrorHandel = require('../unit/errorHandel/index')

const { Sha256 } = require('../unit/Sha256')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const crypto = require('crypto');
const { respondHandel } = require('../unit/respondHandel')
const EventMixin = require('../unit/errorHandel/errorCodeMinxi')

const config = require('../config/index')
const AccountService = {}

AccountService.login = async (UserName,Password,Tra) => {
    const Salt = UserName
    const ShaPassWord = Sha256(UserName,Password)
    const [Err,User] = await asyncErrCatch(AccountApi.getAccount(UserName,Tra))
    if (Err){
        throw Err
    }
    if (!User.length){
        return EventMixin.NOT_FOUND
    }
    if (User.passWord !== ShaPassWord){
        return EventMixin.NOT_FOUND
    }

    console.log(ShaPassWord)
}