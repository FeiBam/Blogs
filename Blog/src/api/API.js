

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
    GetPage:{
        Method:'Get',
        PATH:'/blog/page'
    },
    GetPageInfo:{
        Method:'GET',
        PATH:'blog/getPageInfo'
    },
    getArticleById:{
        Method:'GET',
        PATH:'/blog/Article'
    },
    getArticleTags:{
        Method:'GET',
        PATH:'/blog/ArticleTag'
    }
}

export {
    AdminApi,
    BlogApi,
    Host
}