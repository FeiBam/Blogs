const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const controller = require('../controllers/blog')

router.get('/page/:id',controller.getPage)

router.get('/getArticleTag/:id',controller.getArticleTag)


module.exports = {
    router
}