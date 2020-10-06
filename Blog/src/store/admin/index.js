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
            if (Tag.onDelete){
                PushObject['isDelete'] = true
            }
            else {
                PushObject['isDelete'] = false
            }
            state.Tags.push(PushObject)
        },
        [MutationsMixin.forceDeleteTag](state , TagName){
            for (let item of state.Tags){
                if (item.Name === TagName){
                    state.Tags.splice(state.Tags.indexOf(item),0)
                    return
                }
            }
        },
        [MutationsMixin.deleteTag]( state , TagName){
            for (let item of state.Tags){
                if (item.Name === TagName){
                    state.Tags[state.Tags.indexOf(item)].isDelete = true
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
        async [ActionsMixin.addArticle]( ArticleObject ){
            const  [err,res] = await AsyncErrCatch(Request.createArticle( ArticleObject ))
            if (err){
                throw err
            }
            return res
        },
        async [ActionsMixin.getAllTag]({ commit,state }, ShowDelete ){
            const [err,res] = await AsyncErrCatch(Request.getAllTag(ShowDelete))
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
            const [Err,Tag] = await AsyncErrCatch(Request.deleteTag(Params.TagName,Params.force))
            if (Err){
                throw Err
            }
            await commit(MutationsMixin.forceDeleteTag,Tag.data.data.Name)
            return Tag
        }
    }
}

export default AdminModel