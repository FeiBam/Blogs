const fs = require('fs')
const path = require('path')
const config = require('../config/index')
const KoaRouter = require('@koa/router')
const Router = new KoaRouter()


function RoutesInject(Router = null,Path = config.routerPath , configArr = config.installRouter) {
    this.router = Router //router实例
    const files = fs.readdirSync(Path).filter(file => file !== 'index.js' ).filter(files => files.endsWith('.js')) // 获取相应文件夹下的router并且过滤掉文件夹和index.js
    this.routes = {} //初始化引入对象
    files.forEach(item => {
        if (item.toLowerCase().endsWith('.js')){
            this.routes[`${item.replace(/\.js/,'')}`] = require(`${Path}/${item}`) //引入文件夹下面的router
        }
    })
    configArr.forEach(item=>{ //通过配置文件里面的数组来注入
        if (item.children) {//如果拥有子集 则调用本身
            new RoutesInject(this.routes[item.routerName].router, item.childrenPath, item.children) //  递归加载
        }
        this.router.use(item.url,this.routes[item.routerName])
    })
    return this.router
}


const router = new RoutesInject(Router)

module.exports = {
    router
}