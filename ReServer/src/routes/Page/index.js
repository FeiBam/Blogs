const KoaRouter = require('@koa/router') //导入Koa-Router 库
const Router = new KoaRouter()
const { ArticleModel, ArticlesControl} = require('../../unity/Article')
const { respondHandel } = require('../../unity/respondHandel')


Router.post('/getPageInfo',async (ctx)=>{
    let RequestData = ctx.request.body
    const Articles = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    let ArticleNum = await Articles.getAllArticleNum()
    let ArticleNumofLang = await Articles.getArticleNumByLang(RequestData.language)
    if(!ArticleNumofLang) ArticleNumofLang = 0
    const ArticleLimit = ctx.state.globalConfig.Page.ArticleLimit
    return ctx.body = {
        PageArticleLimit:ArticleLimit,
        ArticleNum:ArticleNum,
        ArticleNumofLang
    }
})

Router.post('/Articles',async (ctx)=>{
    let RequestData = ctx.request.body
    let ResponseObject = {
        Articles:[],
        index:0
    }
    const articlesControl = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    const articles = await articlesControl.getArticlesByLang(RequestData.language)
    if(!articles){
        return ctx.body = {
            code:4004,
            data:{},
            msg:'Not Found'
        }
    }
    for(let key of Object.keys(articles).filter(key => key !== 'index')){
        let temp = {
            id:Number(key),
            Account:{
                Name:'Fei_Bam'
            },
            ...articles[key]
        }
        ResponseObject.Articles.push(temp)
        ResponseObject.index += 1
    }
    return respondHandel.success(ctx,ResponseObject,'ok')
})

Router.post('/Article',async (ctx)=>{
    let RequestData = ctx.request.body
    let ResponseObject = {}
    const articlesControl = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    let article = await articlesControl.getArticleByLangAndId(RequestData.id,RequestData.language)
    console.log(article)
    ResponseObject['id'] = Number(article.id)
    ResponseObject['Account'] = {
        Name:'Fei_Bam'
    }
    ResponseObject['Article'] = article
    return respondHandel.success(ctx,ResponseObject,'ok')
})

module.exports = Router