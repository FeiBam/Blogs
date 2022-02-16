import axios from 'axios'
import { AdminApi,BlogApi,Host } from './API'
import CookiesHelper from '../utils/Cookies'

axios.defaults.baseURL = Host
axios.defaults.timeout = 3000


const request = {}


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.method === 'post'){
        if(!config.data) config.data = {}
        config.data['language'] = CookiesHelper.getItem('language') ? CookiesHelper.getItem('language') : navigator.language
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



request.Login = function (UserName,PassWord) {
    return axios.post(AdminApi.Login.PATH,{ UserName:UserName,PassWord:PassWord })
}


request.TokenTest = function () {
    return axios.get(AdminApi.TokenTest.PATH)
}


request.GetPage = function (PageNum,Lang) {
    return axios.request({
        method:BlogApi.GetPage.Method,
        url:`${BlogApi.GetPage.PATH}`,
        data:{
            PageNum,
            Lang
        }
    })
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

request.restoreTag = function (TagName) {
    return axios.request({
        method:AdminApi.restoreTag.Method,
        url:AdminApi.restoreTag.PATH,
        data:{
            TagName:TagName
        }
    })
}


request.getPageInfo = function (){
    return axios.request({
        method:BlogApi.GetPageInfo.Method,
        url:BlogApi.GetPageInfo.PATH
    })
}

request.getArticleById = function (id){
    return axios.request({
        method:BlogApi.getArticleById.Method,
        url:BlogApi.getArticleById.PATH,
        data:{
            id:id - 1
        }
    })
}

request.getArticleTag = function (id){
    return axios.request({
        method:BlogApi.getArticleTags.Method,
        url:`${BlogApi.getArticleTags.PATH}/${id}`
    })
}


export default request