const DataMixin = {
    TagActive: state => state.ActiveTag,
    ViewArticleData:state => state.ViewArticleData,
    Articles:state => state.Articles
}

const MutationsMixin = {
    changePage:'changePage',
    addArticle:'addArticle',
    setTags:'setTags',
    setPageInfo:'setPageInfo',
    ViewArticle: 'ViewArticle',
    clearPage:'clearPage'
}

const GetterMixin = {
    GetPage:'GetPage'
}

const ActionsMixin = {
    ViewArticle:'ViewArticle',
    GetPage:'GetPage',
    PreviewArticle:'ViewArticle',
    GetPageInfo:'GetPageInfo',
    GetArticle:'GetArticle'
}

export {
    DataMixin,
    MutationsMixin,
    ActionsMixin,
    GetterMixin
}