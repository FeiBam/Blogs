import Vue from 'vue'
import VueRouter from "vue-router";


Vue.use(VueRouter)


//const RouteView = {
   // name: 'RouteView',
   // render: (h) => h('router-view')
//}

const routes = [
    {
        path: '',
        component: () => import('../view/blog/index'),
        children: [
            {
                name:'index',
                path: '',
                component:() => import('../view/blog/Main/view/front/view/Articles/index')
            },
            {
                name:'Articles',
                path: '/Articles/:num',
                component:() => import('../view/blog/Main/view/front/view/Articles/index')
            },
            {
                name:'LikeArticle',
                path: '/Articles',
                redirect:{ path:'/Articles/1' }
            },
            {
                name:'ViewArticle',
                path: '/Article/:Id',
                component:() => import('../view/blog/Main/view/front/view/Article/index')
            },
            {
                path: '/FriendLinks',
                name:'FriendLinks',
                component: () => import('../view/blog/Main/view/front/view/FriendLink/index')
            },
            {
                path:'/Tag/:TagName',
                name:'ArticlesByTag',
                component:() => { return true }
            }
        ]
    },
    {
        path: '/index',
        redirect:{ name:'index' }
    },
    {
        path:"*",
        component:()=> import('../components/404')
    }
]


const router = new VueRouter({
    routes:routes,
})

export default router