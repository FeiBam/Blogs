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
        PageArticleLimit:0
    }),
    getters:{

    },
    mutations:{
        [MutationsMixin.changePage]( state, PageNum){
            console.log(state,PageNum)
        },
        [MutationsMixin.addArticle]( state , ArticleObject ){
            state.Article.push(ArticleObject)
        }
    },
    actions:{
        [ActionsMixin.ViewArticle]({ state , commit }, ArticleId){
            console.log(state,commit,ArticleId)
        },
        [ActionsMixin.PageChange]( { state , commit } , PageNum){
            console.log(state,commit,PageNum)
        },
        async [ActionsMixin.GetPage]( { state , commit } , PageNum){
            const deObject = {
                id:0,
                Title:'',
                Text:'',
                Creator:{
                    Name:'',
                    Date:''
                },
                Tags:[],
            }
            if (state.Article.length === 0 ){
                const [err,res] = await AsyncErrCatch(request.GetPage(PageNum))
                if (err){
                    throw err
                }
                res.data.forEach(item => {
                    deObject["id"] = item.id
                    deObject["Title"] = item.introduction
                    deObject[""]
                })
            }
        }
    }
}


export default BlogModel