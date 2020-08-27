const { FriendLinks } = require('../db/member')

const FriendLinksService = {
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

module.exports = FriendLinksService