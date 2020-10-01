const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const BlogController = require('../controllers/BlogControllers')


router.get('/page/:id',BlogController.getPage)

router.get('/ArticleTag/:id',BlogController.getArticleTag)

router.get('/FriendLinks',BlogController.getFriendLinks)




module.exports = {
    router
}