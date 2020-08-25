const BlogDB = require('../index')
const moment = require('moment')
const { DataTypes,Model } = require('sequelize')


class Account extends Model {
}


Account.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        passWord:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        img:{
            type:DataTypes.STRING,
            allowNull:true
        },
        active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
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
        modelName:'Account',
        paranoid:true,
        deletedAt:'onDelete'
    }
)


module.exports = Account