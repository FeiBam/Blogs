const BlogDB = require('../index')
const moment = require('moment')
const { DataTypes,Model } = require('sequelize')

class Tag extends Model{

}

Tag.init(
    {
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Target:{
            type:DataTypes.STRING,
            allowNull:true
        },
        Icon :{
            type:DataTypes.STRING,
            allowNull:true
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
        modelName:'Tag',
        paranoid:true,
        deletedAt:'onDelete'
    }
)

module.exports = Tag