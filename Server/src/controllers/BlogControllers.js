const ErrCodeMixin = require('../unit/errorHandel/errorCodeMinxi')
const config = require('../config/index')
const { asyncErrCatch } = require('../unit/asyncErrCatch')
const {ArticleService,ArticleServices} = require('../services/ArticleService')
const FriendService = require('../services/FriednLinksService')
const BlogDB = require('../db/index')
const { respondHandel } = require('../unit/respondHandel')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const Serialization = require('../unit/Serialization')



const blogControllers = {}

blogControllers.getPage = async (ctx) => {
    if (ctx.params.id < 1){
        UserErrHandel(ctx,400, ErrCodeMixin.ATTRIBUTE_ERR )
    }
    const PageNum = ctx.params.id
    const Transaction = await BlogDB.transaction()
    try {
        let Articles = await ArticleService.getPage(ctx,Transaction,PageNum)
        if (Articles.lenght === 0){
            return respondHandel.notFound(ctx,0,'NotFound')
        }
        Articles.forEach((item,index) => {
            const Maps = {
                createdAt:'',
                id:'',
                Title:'',
                Introduction:'',
                Subject:'',
                Tags:(item,index)=>{
                    const Maps = {
                        id:'',
                        Name:''
                    }
                    return new Serialization(item, Maps, true).Main()
                },
                Account:{
                    Name:''
                }
            }
            const FixItem = new Serialization(JSON.parse(JSON.stringify(item)), Maps,true)
            Articles[index] = FixItem.Main()
        })
        await Transaction.commit()
        return respondHandel.success(ctx,Articles,'ok')
    }
    catch (err) {
        await Transaction.rollback()
        throw err
    }
}

blogControllers.getArticleTag = async (ctx) => {
    const ArticleId = ctx.params.id
    const Transaction = await BlogDB.transaction()
    try {
        const ArticleModel = await new ArticleServices(Transaction)
        await ArticleModel.getArticleById(ArticleId)
        const ArticleTag = await ArticleModel.getTags()
        await Transaction.commit()
        return respondHandel.success(ctx,ArticleTag,'ok',0)
    }
    catch (e) {
        await Transaction.rollback()
        throw e
    }
}

blogControllers.getArticle = async (ctx) => {
    const ArticleId = ctx.params.id
    const Transaction = await BlogDB.transaction()
    if (!ArticleId){
        return respondHandel.AttributeError(ctx,400,'ArticleID is null')
    }
    try {
        const Article = await ArticleService.getArticleById(ArticleId,Transaction)
        await Transaction.commit()
        return respondHandel.success(ctx,Article,'ok',0)
    }catch (e){
        await Transaction.rollback()
        throw e
    }
}

blogControllers.getFriendLinks = async (ctx) => {
    const Transaction = await BlogDB.transaction()
    const [Err,FriendLinks] = await asyncErrCatch(FriendService.getAllFriendLinks(Transaction))
    if (err){
        await Transaction.rollback()
        throw err
    }
    await Transaction.commit()
    return respondHandel.success(ctx,FriendLinks,'ok',0)
}

blogControllers.getPageInfo = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    const [Err,ArticleNum] = await asyncErrCatch(ArticleService.getAllArticleNum(ctx,Transaction))
    if(Err){
        throw Err
    }
    await Transaction.commit()
    let PageNum = 1
    if ((ArticleNum / config.select.blog.pageArticleLimit) > 1){
        PageNum = (ArticleNum % config) + 1
    }
    return respondHandel.success(ctx,{PageArticleLimit:config.select.blog.pageArticleLimit,PageNum:PageNum,ArticleNum:ArticleNum},'ok',0)
}

blogControllers.getArticleCreator = async (ctx) =>{
    const Transaction = await BlogDB.transaction()
    if (!ctx.params.id){
        return respondHandel.AttributeError(ctx,400,'ArticleID is null')
    }
    const ArticleId = ctx.params.id
    try {
        const Maps = {
            id:'',
            Name:'',
            Img:''
        }
        const ArticleModel = new ArticleServices(Transaction)
        await ArticleModel.getArticleById(ArticleId)
        if (ArticleModel.Model === null){
            return respondHandel.AttributeError(ctx,404,'Not Have This Article')
        }
        const ArticleCreatorInfo = await ArticleModel.getCreatorInfo()
        let ArticleCreatorData = new Serialization(JSON.parse(JSON.stringify(ArticleCreatorInfo)),Maps,true)
        console.log(ArticleCreatorData.Main())
        await Transaction.commit()
        return respondHandel.success(ctx,ArticleCreatorData,'ok')
    }catch (e) {
        console.log(e)
        await Transaction.rollback()
        throw e
    }
}




module.exports = blogControllers