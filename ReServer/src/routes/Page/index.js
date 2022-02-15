const KoaRouter = require('@koa/router') //导入Koa-Router 库
const Router = new KoaRouter()
const { ArticleModel, ArticlesControl} = require('../../unity/Article')

Router.post('/getPageInfo',async (ctx)=>{
    let RequestData = ctx.request.body
    const Articles = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    const ArticleNum = await Articles.getArticleNumByLang(RequestData.language)
    const ArticleLimit = ctx.state.globalConfig.Page.ArticleLimit
    return ctx.body = {
        PageArticleLimit:ArticleLimit,
        ArticleNum
    }
})

Router.post('/Articles',async (ctx)=>{
    let RequestData = ctx.request.body
    let ResponseObject = {
        Articles:[],
        index:0
    }
    const articlesControl = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    const articles = await articlesControl.getArticleNumByLang(RequestData.language)
    if(!articles){
        return ctx.body = 'not Found'
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
    return ctx.body = ResponseObject
})

Router.post('/Article',async(ctx)=>{

})

module.exports = Router