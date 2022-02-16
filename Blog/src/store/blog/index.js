import { MutationsMixin,ActionsMixin } from './Mixin'
import { AsyncErrCatch } from '../../utils/AsyncErrCatch'

import request from '../../api/index'

const BlogModel = {
    namespaced: true,
    state:() =>({
        ViewArticleData:{},
        ViewPage:{},
        ViewTag:'',
        Articles:[],
        Tags:[],
        ArticleLimit:0,
        AllPage:0,
        NowPage:0,
        ArticleNum:0,
        isLoad:true,
        Lang:''
    }),
    getters:{
    },
    mutations:{
        [MutationsMixin.addArticle]( state , ArticleObject ){
            state.Articles.push(ArticleObject)
        },
        [MutationsMixin.setTags]( state , Tags){
            state.Tags = Tags
        },
        [MutationsMixin.setPageInfo](state , infoData){
            if(infoData.ArticleNum < infoData.PageArticleLimit) state.AllPage = 1
            if((infoData.ArticleNum % infoData.PageArticleLimit) !== 0) state.AllPage = Number((infoData.ArticleNum / infoData.PageArticleLimit).toFixed()) + 1
            if((infoData.ArticleNum % infoData.PageArticleLimit) === 0) state.AllPage = infoData.ArticleNum / infoData.PageArticleLimit
            state.ArticleLimit = infoData.PageArticleLimit
            state.ArticleNum = infoData.ArticleNum
        },
        [MutationsMixin.ViewArticle](state , ArticleId){
            state.ViewArticleData = state.Articles[ArticleId]
        },
        [MutationsMixin.clearPage](state){
            state.Articles = []
        }
    },
    actions:{
        [ActionsMixin.ViewArticle]({ commit  }, ArticleId){
            commit(MutationsMixin.ViewArticle,(ArticleId - 1))
            return true
        },
        async [ActionsMixin.GetPage]( { state , commit } , PageNum) {
            state.isLoad = true
            await commit(MutationsMixin.clearPage)
            if (PageNum > state.AllPage) throw new Error('PageNumErr')
            const [err, res] = await AsyncErrCatch(request.GetPage(PageNum))
            if (err) {
                throw err
            }
            state.isLoad = false
            res.data.data.Articles.forEach(item=>{
                item['Creator'] = {
                    Name:item['Account'].Name,
                    Date:item.createDate
                }
                item = {...item,...item.Article}
                item.id = Number(item.id)
                item.id += 1
                commit(MutationsMixin.addArticle,item)
            })
            return true
        },
        async [ActionsMixin.GetPageInfo]( { state, commit} ){
            const [err,PageInfo] = await AsyncErrCatch(request.getPageInfo())
            if(err) throw err
            if(PageInfo.data.ArticleNum === 0){
                state.isLoad = false
                return false
            }
            commit(MutationsMixin.setPageInfo,PageInfo.data)
            return true
        },
        async [ActionsMixin.GetArticle] ( { commit }, id){
            const [err,res] = await AsyncErrCatch(request.getArticleById(id))
            if(err) throw err
            if(res.data.code !== 1) throw Error('Not Found')
            let ArticleData = res.data.data
            let ArticleObject = {
                Creator:{
                    Name:ArticleData.Account.Name,
                    Date:ArticleData.Article.createDate
                },
                ...ArticleData.Article,
                id:Number(ArticleData.id) + 1
            }
            commit(MutationsMixin.addArticle,ArticleObject)
            return true
        }
    }
}


export default BlogModel