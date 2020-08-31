import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        name:'blog',
        path:'/blog',
        component:()=>import('../components/HelloWorld')
    },
    {
        name:'admin',
        path:'/admin',
    }
]


const router = new VueRouter({
    routes:routes,
    mode: 'history'
})

export default router