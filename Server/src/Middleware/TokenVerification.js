
const Jwt = require('../unit/crypto/JWT')
const config = require('../config/index')
const ErrTypeMixin = require('../unit/errorHandel/errorCodeMinxi')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')

module.exports = async (ctx,next) => {
    if (!ctx.get('Access-Token') || ctx.get('Access-Token') === ''){
        UserErrHandel(ctx,401,ErrTypeMixin.NOT_LOGGED)
    }
    const CacheToken = await ctx.TokenCache.select(Jwt.GetPayLoad(ctx.get('Access-Token')).id)
    if (!CacheToken){
        UserErrHandel(ctx,403,ErrTypeMixin.TOKEN_NOT_FOUND)
    }
    if (Jwt.verify(ctx.get('Access-Token'),config.secret.Salt,config.secret.JwtHead.alg)){
        const PayLoad = Jwt.GetPayLoad(ctx.get('Access-Token'))
        console.log('测试！',PayLoad)
        ctx.state.AccountName = PayLoad.Name
        ctx.state.AccountId = PayLoad.id
        await next()
    }
}