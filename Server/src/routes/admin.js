const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const isLogged = require('../middleware/isLogin')
const TokenVerification = require('../middleware/TokenVerification')
const { adminControllers } = require('../controllers/AdminControllers')
const { respondHandel } = require('../unit/respondHandel')





router.post('/login',adminControllers.adminLogin)

router.use(TokenVerification)


router.get('/test',async (ctx,next)=>{
    respondHandel.success(ctx , '' , 'Ok!')
    next()
})

module.exports = {
    router
}