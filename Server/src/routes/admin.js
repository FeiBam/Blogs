const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const isLogin = require('../Middleware/isLogin')
const adminControllers = require('../controllers/AdminControllers')




router.get('/test',async (ctx)=>{
    ctx.body = 'admin test message'
})




module.exports = {
    router
}