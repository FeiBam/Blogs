const DataMixin = {
    AccessToken: state => state.AccessToken,
    UserName: state => state.Name,
    Avatar: state => state.Avatar,
    MenuHidden: state => state.MenuHidden,
    Tags: state => state.Tags,
    EditArticleData:state => state.EditArticleData
}

const MutationsMixin = {
    setName: 'setName',
    setAvatar: 'setAvatar',
    setAccessToken:'setAccessToken',
    setLoginAt:'setLoginAt',
    setJwsHead:'setJwtHead',
    setUserMessageDefault:'setUserMessageDefault',
    setMenuHidden:'setMenuHidden',
    setTags:'setTags',
    setArticles:'setArticles',
    addTag:'addTag',
    forceDeleteTag:'forceDeleteTag',
    deleteTag:'deleteTag',
    restoreTag:'resStoreTag'
}

const ActionsMixin = {
    adminLogin:'adminLogin',
    addArticle:'addArticle',
    addTag:'addTag',
    getAllTag:'getAllTag',
    deleteTag:'deleteTag',
    forceDeleteTag:'forceDeleteTag',
    restoreTag:'resStoreTag',
}

export {
    MutationsMixin,
    ActionsMixin,
    DataMixin
}