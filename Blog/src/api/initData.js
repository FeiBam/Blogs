import Store from "@/store/index"
import Router from "@/router";
import { ActionsMixin as BlogActionsMixin } from '@/store/blog/Mixin'


Router.beforeEach(((to, from, next) => {
    console.log(to.name)
    if (to.name === 'index'){
        Store.dispatch(`Blog/${BlogActionsMixin.GetPageInfo}`).then(()=>{
            Store.dispatch(`Blog/${BlogActionsMixin.GetPage}`,1).then(res=>{
                console.log(res)
                next()
            })
        })
    }
    else {
        next()
    }
}))