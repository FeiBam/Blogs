const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const BlogController = require('../controllers/BlogControllers')
const fs = require('fs')

router.get('/page/:id',BlogController.getPage)

router.get('/ArticleTag/:id',BlogController.getArticleTag)

router.get('/FriendLinks',BlogController.getFriendLinks)

router.get('/getPageInfo',BlogController.getPageInfo)

router.get('/Article/:id',BlogController.getArticle)

router.get('/ArticleCreator/:id',BlogController.getArticleCreator)

module.exports = {
    router
}