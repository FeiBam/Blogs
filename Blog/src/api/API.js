

const Host = process.env.NODE_ENV !== 'development' ? 'https://blog.feibam.club:8000/' : 'http://127.0.0.1:8000';


const AdminApi = {
    Login:{
        Method:'POST',
        PATH:'/admin/login'
    },   //Method:POST
    TokenTest:{
        Method: 'GET',
        PATH:'/admin/test'
    },
    createArticle:{
        Method:'POST',
        PATH:'/admin/createArticle'
    },
    getAllTag:{
        Method:'GET',
        PATH:'/admin/getAllTags'
    },
    addTag:{
        Method:'POST',
        PATH:'/admin/createTag'
    },
    deleteTag:{
        Method:'POST',
        PATH:'/admin/deleteTag'
    },
    restoreTag:{
        Method:'POST',
        PATH:'/admin/restoreTag'
    },
}


const BlogApi  = {
    GetPageInfo:{
        Method:'GET',
        PATH:'/page/getPageInfo'
    },
    getArticleById:{
        Method:'GET',
        PATH:'/page/Article'
    },
    getArticleTags:{
        Method:'GET',
        PATH:'/page/ArticleTag'
    },
    GetPage:{
        Method:'GET',
        PATH:'/page/Aritcles'
    }
}

export {
    AdminApi,
    BlogApi,
    Host
}