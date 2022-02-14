const KoaRouter = require('@koa/router') //导入Koa-Router 库
const Router = new KoaRouter()
const { ArticleModel, ArticlesControl} = require('../../unity/Article')

Router.get('/getPageInfo',async (ctx)=>{
    const Articles = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    const ArticleNum = await Articles.getAllArticleNum()
    const ArticleLimit = ctx.state.globalConfig.Page.ArticleLimit
    return ctx.body = {
        PageArticleLimit:ArticleLimit,
        ArticleNum
    }
})

Router.post('/Articles/',async (ctx)=>{
    let RequestData = ctx.request.body
    let ResponseObject = {
        Articles:[],
        index:0
    }
    const Articles = new ArticlesControl(ctx.state.globalConfig.Article.ArticlePath)
    const CN_Articles = await Articles.getArticleNumByLang('zh-CN')
    console.log(CN_Articles)
    if(CN_Articles.lenght === 0){
        return ctx.body = 'not Found'
    }
    for(let key of Object.keys(CN_Articles).filter(key => key !== 'index')){
        let temp = {
            id:Number(key),
            Account:{
                Name:'Fei_Bam'
            },
            ...CN_Articles[key]
        }
        ResponseObject.Articles.push(temp)
        ResponseObject.index += 1
    }
    return ctx.body = ResponseObject
})

Router.post('/Article',async(ctx)=>{

})

module.exports = Router