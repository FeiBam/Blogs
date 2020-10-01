import Vue from 'vue'
import VueRouter from "vue-router";



Vue.use(VueRouter)

//const RouteView = {
    //name: 'RouteView',
    //render: (h) => h('router-view')
//}

const routes = [
    {
        path: '',
        component: () => import('../view/blog/Main'),
        children: [
            {
                name:'index',
                path: '',
                component:() => import('../view/blog/Article/ArticlePreviewMain')
            },
            {
                name:'ViewArticle',
                path: '/Article/:page',
                component:() => import('../view/blog/Article/ArticleSubjectMain')
            }
        ]
    },
    {
        name:'admin',
        path:'/admin',
        component:() => import('../layout/AdminLayout')
    },
    {
        path: '/login',
        component:() => import('../layout/UserLayout'),
        children:[
            {
                name:'login',
                path:'',
                component:() => import('../view/admin/login/Login')
            }
        ]
    }
]


const router = new VueRouter({
    routes:routes,
    mode: 'history'
})

export default router