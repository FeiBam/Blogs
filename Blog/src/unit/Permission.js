import Router from "../router";



const whiteList = ['blog']

Router.beforeEach((to,from,next) =>{
    if (whiteList.includes(to.name)){
        next()
    }
    console.log('you dont have permission')
})


