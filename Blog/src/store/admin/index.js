import Request from '../../api/index'
import { AsyncErrCatch } from "../../utils/AsyncErrCatch";
import { MutationsMixin,ActionsMixin } from './Minxin'
import Jwt from "../../utils/JWT";

const AdminModel = {
    namespaced: true,
    state:() => ({
        AccessToken:'',
        Name:'',
        LoginAt: '',
        Avatar:'',
        JwsHead:'',
        MenuHidden:false,
        Tags:[],
        Articles:[]
    }),
    getters:{

    },
    mutations:{
        [MutationsMixin.setAccessToken](state, AccessToken){
            state.AccessToken = AccessToken
        },
        [MutationsMixin.setName](state, Name){
            state.Name = Name
        },
        [MutationsMixin.setAvatar](state, AvatarUrl){
            state.Avatar = AvatarUrl
        },
        [MutationsMixin.setLoginAt](state, Time){
            state.LoginAt = Time
        },
        [MutationsMixin.setJwsHead](state, JwsHead){
            state.JwsHead = JwsHead
        },
        [MutationsMixin.setUserMessageDefault](state){
            state.Name = ''
            state.Avatar = ''
            state.LoginAt = ''
            state.JwsHead = ''
            state.AccessToken = ''
        },
        [MutationsMixin.setMenuHidden](state){
            state.MenuHidden = !state.MenuHidden
        },
        [MutationsMixin.setTags](state, Tags){
            state.Tags = Tags
        },
        [MutationsMixin.addTag]( state , Tag){
            const PushObject = {
                id:Tag.id,
                key:Tag.id,
                name:Tag.Name,
                createAt:Tag.createdAt,
            }
            PushObject['isDelete'] = !!Tag.onDelete;
            state.Tags.push(PushObject)
        },
        [MutationsMixin.forceDeleteTag](state , TagName){
            for (let item of state.Tags){
                if (item.name === TagName){
                    state.Tags.splice(state.Tags.indexOf(item),1)
                    return
                }
            }
        },
        [MutationsMixin.deleteTag]( state , TagName){
            for (let item of state.Tags){
                if (item.name === TagName){
                    state.Tags[state.Tags.indexOf(item)].isDelete = true
                }
            }
        },
        [MutationsMixin.restoreTag](state , TagName){
            for (let item of state.Tags){
                if (item.name === TagName){
                    state.Tags[state.Tags.indexOf(item)].isDelete = false
                }
            }
        }
    },
    actions:{
        async [ActionsMixin.adminLogin]({ commit }, LoginForm ){
            const [err,res] = await AsyncErrCatch(Request.Login(LoginForm.UserName,LoginForm.PassWord))
            if (err){
                commit(MutationsMixin.setUserMessageDefault)
                throw err
            }
            const AccessToken = res.headers['access-token']
                commit(MutationsMixin.setAccessToken, res.headers['access-token'])
            console.log(Jwt.GetPayLoad(AccessToken))
                commit(MutationsMixin.setName, Jwt.GetPayLoad(AccessToken).Name)
                commit(MutationsMixin.setAvatar, Jwt.GetPayLoad(AccessToken).Avatar)
                commit(MutationsMixin.setLoginAt, Jwt.GetPayLoad(AccessToken).LoginAt)
                commit(MutationsMixin.setJwsHead, Jwt.GetHead(AccessToken))
            return res
        },
        async [ActionsMixin.addArticle]( { commit } ,ArticleObject ){
            const  [err,res] = await AsyncErrCatch(Request.createArticle( ArticleObject ))
            if (err){
                throw err
            }
            await commit('Blog/addArticle',ArticleObject)
            return res
        },
        async [ActionsMixin.getAllTag]({ commit,state }, Params ){
            if (state.Tags.length && Params.force !== true){
                return
            }
            const [err,res] = await AsyncErrCatch(Request.getAllTag(Params.ShowDelete))
            if (err){
                throw err
            }
            state.Tags = []
            for (let item of res.data.data){
                await commit(MutationsMixin.addTag,item)
            }
            return res.data
        },
        async [ActionsMixin.addTag]( { commit } ,TagName ){
            const [Err,Tag] = await AsyncErrCatch(Request.addTag(TagName))
            if (Err){
                throw Err
            }
            await commit(MutationsMixin.addTag,Tag.data.data)
            return Tag
        },
        async [ActionsMixin.deleteTag]( { commit } , Params){
            const [Err,Res] = await AsyncErrCatch(Request.deleteTag(Params.TagName,Params.force))
            if (Err){
                throw Err
            }
            if(Params.force){
                await commit(MutationsMixin.forceDeleteTag,Res.data.data.Name)
                return Res
            }
            await commit(MutationsMixin.deleteTag,Res.data.data.Name)
            return Res
        },
        async [ActionsMixin.restoreTag]( { commit } ,TagName ){
                const [Err,Tag] = await AsyncErrCatch(Request.restoreTag(TagName))
            if (Err){
                throw Err
            }
            await commit(MutationsMixin.restoreTag,Tag.data.data.Name)
            return Tag
        }
    }
}

export default AdminModel