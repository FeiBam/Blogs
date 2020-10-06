import axios from 'axios'
import { AdminApi,BlogApi,Host } from './API'
import Store from '../store/index'



axios.defaults.baseURL = Host
axios.defaults.timeout = 3000

axios.interceptors.request.use(config => {
    config.headers['Access-Token'] = Store.state.Admin.AccessToken
    return config
})


const request = {}


request.Login = function (UserName,PassWord) {
    return axios.post(AdminApi.Login.PATH,{ UserName:UserName,PassWord:PassWord })
}


request.TokenTest = function () {
    return axios.get(AdminApi.TokenTest.PATH)
}


request.GetPage = function (PageNum) {
    const Url = `${BlogApi}/${PageNum}`
    return axios.get(Url)
}

request.createArticle = function (ArticleObject) {
    return axios.post(AdminApi.createArticle.PATH,ArticleObject)
}

request.getAllTag = function (ShowDelete) {
    const Url = AdminApi.getAllTag.PATH +'/' + ShowDelete
    return axios.request({
        url:Url,
        method:AdminApi.getAllTag.Method
    })
}

request.addTag = function (TagName) {
    return axios.post(AdminApi.addTag.PATH,{ TagName:TagName })
}

request.deleteTag = function (TagName,force) {
    return axios.request({
        method:AdminApi.deleteTag.Method,
        url:AdminApi.deleteTag.PATH,
        data:{
            TagName:TagName,
            force:force
        }
    })
}


export default request