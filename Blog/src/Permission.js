import Router from "./router";
import Store from './store'
import Request from './api'
import { MutationsMixin as AdminMutationsMixin } from './store/admin/Minxin'
import { setTitle } from '@/utils/SetTitle'





const Time = new Date()

const AuthTimeliest = 60 * 60 * 1000
const loginReg = /login/i

Router.beforeEach((to,from,next) =>{
    if (localStorage.getItem('AuthFail')){
        const AuthFailTime = localStorage.getItem('AuthFail')
        if (Time.getTime() - AuthFailTime < AuthTimeliest){
            window.location.href="about:blank";
            return;
        }
        localStorage.removeItem('AuthFail')
        Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,0)
        Router.push('/login')
        return;
    }
    if (Store.state.Admin.loginTryTwice >= 5){
        localStorage.setItem('AuthFail',Time.getTime().toString())
        window.location.href="about:blank";
    }
    if (to.fullPath.split('/')[1] === 'admin'){
        setTitle('飞竹的小站 | 管理处')
        if (Store.state.Admin.AccessToken === ''){
            Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,Store.state.Admin.loginTryTwice + 1)
            Router.push('/login')
            return
        }
        next()
    }
    if (to.fullPath.split('/')[1].match(loginReg)){
        setTitle('飞竹的小站 | 管理处')
        if (Store.state.Admin.AccessToken !== ''){
            Request.TokenTest().then(res =>{
                if (res.status === 200){
                    Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,0)
                    Router.push('/admin')
                }
            })
        }
        next()
    }
    next()
})


