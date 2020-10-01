const BlogDB = require('../index')
const moment = require('moment')
const { DataTypes,Model } = require('sequelize')

class FriendLink extends Model{

}
FriendLink.init(
    {
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Img:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    },
    {
        sequelize:BlogDB,
        modelName:'FriendLinks',
        paranoid:true,
        deletedAt:'onDelete'
    }
)

module.exports = FriendLink