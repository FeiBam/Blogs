import Router from "../router";
import Store from '../store/index'
import Request from '../api/index'




Router.beforeEach((to,from,next) =>{
    if (to.fullPath.split('/')[1] === 'admin'){
        console.log(to)
        if (Store.state.Admin.AccessToken === ''){
            Router.push('/login')
            next()
        }
    }
    if(to.name === 'login'){
        if (Store.state.Admin.AccessToken !== ''){
            Request.TokenTest().then( res => {
                console.log(res)
                if (res.status === 200){
                    Router.push('/admin')
                }
                else {
                    next()
                }
            }).catch(err=>{
                console.log(err)
                next()
            })
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})


