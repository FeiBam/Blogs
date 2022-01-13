const { FriendLinks } = require('../member')

const FriendLinksApi = {
    async getFriendLinks(Name,Tra){
        return FriendLinks.findAll({
            where:{
                name:Name
            }
        },{ transaction:Tra })
    },
    async getAllFriendLinks(Tra){
        return FriendLinks.findAll({},{transaction: Tra})
    }
}

module.exports = FriendLinksApi