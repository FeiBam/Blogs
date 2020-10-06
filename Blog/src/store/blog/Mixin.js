const DataMixin = {
    TagActive: state => state.ActiveTag,
    ViewArticleData:state => state.ViewArticleData,

}

const MutationsMixin = {
    changePage:'changePage',
    addArticle:'addArticle',
    setTags:'setTags'
}

const GetterMixin = {
    GetPage:'GetPage'
}

const ActionsMixin = {
    ViewArticle:'ViewArticle',
    GetPage:'GetPage',
    PreviewArticle:'ViewArticle'
}

export {
    DataMixin,
    MutationsMixin,
    ActionsMixin,
    GetterMixin
}