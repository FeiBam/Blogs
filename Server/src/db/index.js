const sequelize = require('sequelize')
const config = require('../config/index')
const { logger } = require('../middleware/logger')

const BlogDB = new sequelize(config.mysql.database,config.mysql.username,config.mysql.password,{
    host:config.mysql.host,
    port:config.mysql.port,
    dialect:'mysql',
    logging: (message, time) => {
        logger.info(`执行语句：${message} - 执行时间：${time}ms`)
        return false
    },
    //hooks: {
        //beforeConnect: () => {
            //logger.info(`数据库即将连接....`)
        //},
        //afterConnect: () => {
            //logger.info(`数据库连接成功！`)
        //},
        //beforeDisconnect: () => {
            //logger.warn(`数据库即将断开！`)
        //},
        //afterDisconnect: () => {
            //logger.error(`数据库已断开！`)
        //},
    //},
    benchmark: true,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
    logQueryParameters:true,
    timezone: '+08:00'
})

module.exports = BlogDB