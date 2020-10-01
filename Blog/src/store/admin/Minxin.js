const DataMixin = {
    AccessToken: state => state.AccessToken,
    UserName: state => state.Name,
    Avatar: state => state.Avatar
}

const MutationsMixin = {
    setName: 'setName',
    setAvatar: 'setAvatar',
    setAccessToken:'setAccessToken',
    setLoginAt:'setLoginAt',
    setJwsHead:'setJwtHead',
    setUserMessageDefault:'setUserMessageDefault'
}

const ActionsMixin = {
    adminLogin:'adminLogin'
}

export {
    MutationsMixin,
    ActionsMixin,
    DataMixin
}