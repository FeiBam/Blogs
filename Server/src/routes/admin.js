const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const isLogin = require('../Middleware/isLogin')
const adminControllers = require('../controllers/admin')


router.get('/login',async(ctx,next)=>{
    ctx.body = 'ok'
})


router.get('/test',async (ctx)=>{
    ctx.body = 'admin test message'
})

//router.post('/createFriendLinks',adminControllers.createFriendLinks)

//router.post('/createTag',adminControllers.createTag)

router.post('/createArticle',adminControllers.createArticle)

router.get('/getAllArticle',adminControllers.getAllArticle)
module.exports = {
    router
}