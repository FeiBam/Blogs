const Koa = require('koa')
const KoaCors = require('@koa/cors')
const KoaBody = require('koa-bodyparser')
const { router } = require('./routes/index')
const Cache = require('./unit/Cache')
const { responseHandler, errorHandler } = require('./Middleware/response')
const { loggerMiddleware } = require('./Middleware/logger')
const { HttpRespondBase } = require('./unit/respondHandel')
const AccountInit = require('./Middleware/initAccount')

AccountInit()



const TokenCache = new Cache(true)
const app = new Koa()



app.use(KoaBody()) //插件原因 必须放在最上面才能正常获取传递的参数
app.use(KoaCors({
    origin:"*"
}))
app.use(loggerMiddleware) //日志中间件
app.use(errorHandler) //错误回复中间件
app.use(router.allowedMethods()) // 路由中间件
app.use(router.routes())// 路由实例对象，通过RouterInject 注入routes


app.listen(8000)

module.exports = {
    TokenCache //共享Token 储存空间
}