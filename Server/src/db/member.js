const Account = require('./model/account')
const Article = require('./model/article')
const Tag = require('./model/tag')
const FriendLinks = require('./model/friendLinks')
const BlogDB = require('./index')

Account.hasMany(Article)
Article.belongsTo(Account)

Article.belongsToMany(Tag,{ through: 'Article_Tags_Member' })
Tag.belongsToMany(Article,{ through: 'Article_Tags_Member' })

module.exports = {
    Account,
    Article,
    Tag,
    FriendLinks
}
