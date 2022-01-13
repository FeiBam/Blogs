const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const isLogged = require('../middleware/isLogin')
const TokenVerification = require('../middleware/TokenVerification')
const AccountActiveVerification = require('../middleware/AccountActiveVerification')
const { adminControllers } = require('../controllers/AdminControllers')
const { respondHandel } = require('../unit/respondHandel')





router.post('/login',adminControllers.adminLogin)


//router.use(TokenVerification)

//

router.get('/test',async (ctx,next) =>{
    await respondHandel.success(ctx , '' , 'Ok!')
    next()
})

//router.use(AccountActiveVerification)

router.get('/getAllTags/:ShowDelete',adminControllers.getAllTags)

router.get('/ArticlePage/:PageNum',adminControllers.getAllArticle)

router.post('/createArticle' , adminControllers.createArticle)

router.post('/createTag',adminControllers.createTag)

router.post('/deleteTag',adminControllers.deleteTag)

router.post('/restoreTag',adminControllers.restoreTag)



module.exports = {
    router
}