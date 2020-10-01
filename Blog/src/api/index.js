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





export default request