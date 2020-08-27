const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const BlogController = require('../controllers/BlogControllers')

router.get('/page/:id',BlogController.getPage)

router.get('/getArticleTag/:id',BlogController.getArticleTag)

router.get('/getFriendLinks',BlogController.getFriendLinks)


module.exports = {
    router
}