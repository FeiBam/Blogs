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
        JwsHead:''
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
                commit(MutationsMixin.setName, Jwt.GetPayLoad(AccessToken).Name)
                commit(MutationsMixin.setAvatar, Jwt.GetPayLoad(AccessToken).Avatar)
                commit(MutationsMixin.setLoginAt, Jwt.GetPayLoad(AccessToken).LoginAt)
                commit(MutationsMixin.setJwsHead, Jwt.GetHead(AccessToken))
            return res
        }
    }
}

export default AdminModel