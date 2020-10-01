const DataMixin = {
    TagActive: state => state.ActiveTag
}

const MutationsMixin = {
    changePage:'changePage',
    addArticle:'addArticle'
}

const ActionsMixin = {
    ViewArticle:'ViewArticle',
    GetPage:'GetPage'
}

export {
    DataMixin,
    MutationsMixin,
    ActionsMixin
}