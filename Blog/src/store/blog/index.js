import { MutationsMixin,ActionsMixin } from './Mixin'
import { AsyncErrCatch } from '../../utils/AsyncErrCatch'

import request from '../../api/index'

const BlogModel = {
    namespaced: true,
    state:() =>({
        ViewArticleData:{},
        ViewPage:{},
        ViewTag:'',
        Article:[],
        Tags:[],
        PageArticleLimit:0,
    }),
    getters:{

    },
    mutations:{
        [MutationsMixin.changePage]( state, PageNum){
            console.log(state,PageNum)
        },
        [MutationsMixin.addArticle]( state , ArticleObject ){
            state.Article.push(ArticleObject)
        },
        [MutationsMixin.setTags]( state , Tags){
            state.Tags = Tags
        }
    },
    actions:{
        [ActionsMixin.ViewArticle]({ state , commit }, ArticleId){
            console.log(state,commit,ArticleId)
        },
        [ActionsMixin.PreviewArticle]( { state }, ArticleObject){
            state.ViewArticleData = ArticleObject
        },
        async [ActionsMixin.GetPage]( { state , commit } , PageNum){
            const EnObject = {}
            if (state.Article.length === 0 ){
                const [err,res] = await AsyncErrCatch(request.GetPage(PageNum))
                if (err){
                    throw err
                }
            console.log(res)
            }
            return {...EnObject,...commit,}
        }
    }
}


export default BlogModel