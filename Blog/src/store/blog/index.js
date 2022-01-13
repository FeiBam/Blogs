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
        isLoad:true
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
            state.AllPage = infoData.PageNum
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
            const [err, Articles] = await AsyncErrCatch(request.GetPage(PageNum))
            if (err) {
                state.isLoad = false
                throw err
            }
            state.isLoad = false
            Articles.data.data.forEach(item=>{
                item['Creator'] = {
                    Name:item['Account'].Name,
                    Date:item['createdAt']
                }
                Reflect.deleteProperty(item,'Account')
                commit(MutationsMixin.addArticle,item)
            })
            return true
        },
        async [ActionsMixin.GetPageInfo]( { commit} ){
            const [err,PageInfo] = await AsyncErrCatch(request.getPageInfo())
            if(err) throw err
            commit(MutationsMixin.setPageInfo,PageInfo.data.data)
            return true
        },
    }
}


export default BlogModel