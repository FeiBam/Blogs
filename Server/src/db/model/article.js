const BlogDB = require('../index')
const moment = require('moment')
const { DataTypes,Model } = require('sequelize')

class Article extends Model{

}

Article.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        introduction:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        subject:{
            type:DataTypes.TEXT,
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
        modelName:'Article',
        paranoid:true,
        deletedAt:'onDelete'
    }
)

module.exports = Article