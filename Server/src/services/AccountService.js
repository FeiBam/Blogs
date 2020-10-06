const AccountApi = require('../db/api/AccountApi')


const { asyncErrCatch } = require('../unit/asyncErrCatch')
const JWT = require('../unit/crypto/JWT')
const { HMACSHA256 } = require('../unit/crypto/HMACSHA256')

const ErrorTypeMixin = require('../unit/errorHandel/errorCodeMinxi')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')

const { TokenCache } = require('../app')

const config = require('../config/index')
const AccountService = {}

AccountService.Login = async (ctx,Tra,UserName,Password) => {
    try {
        if (ctx.get('Access-Token') !== '' || ctx.get('Access-Token')){
            UserErrHandel(ctx,401,ErrorTypeMixin.REPEAT_LOGIN)
        }
        const ShaPassWord = HMACSHA256(Password,UserName)
        const UserObject = await AccountApi.getAccountByName(UserName,Tra)
        if (!UserObject){
            UserErrHandel(ctx,404, ErrorTypeMixin.NOT_FOUND_ERR)
        }
        if (UserObject.PassWord !== ShaPassWord){
            UserErrHandel(ctx,400,ErrorTypeMixin.ACCOUNT_VERIFICATION_ERR)
        }
        const PayLoad = {
            id:UserObject.id,
            Name:UserObject.Name,
            Avatar:UserObject.Avatar,
            LoginAt:Date.now()
        }
        const AccessToken = await AccountService.GenAccessToken(PayLoad)
        if (await ctx.TokenCache.select(UserObject.id)){
            await ctx.TokenCache.replace(UserObject.id,{ AccessToken:AccessToken},3*60*60*1000)
        }
        else {
            await ctx.TokenCache.add(UserObject.id,{ AccessToken:AccessToken },3*60*60*1000)
        }
        return AccessToken
    }catch (e) {
        throw e
    }


}

AccountService.CreateAccount = async (ctx,Tra,UserName,Password,Avatar) => {
    const ShaPassword = HMACSHA256(Password,UserName)
    const [Err,Account] = await asyncErrCatch(AccountApi.createAccount({Name:UserName,PassWord:ShaPassword,Img:Avatar},Tra))
    if (Err){
        throw Err
    }
    return Account
}


AccountService.GenAccessToken = async (payload) =>{
    try{
        return JWT.encode(config.secret.JwtHead,payload,config.secret.Salt,'HS256')
    }catch (e) {
        throw e
    }
}


module.exports = AccountService