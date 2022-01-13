const KoaRouter = require('@koa/router') //导入Koa-Router 库
const { FileTree }= require('../unity/FileTree')  // 导入文件树库
const path = require('path')
const Origin_Router = new KoaRouter() // 实例化初始 Router
const Files = new FileTree(path.resolve(__dirname,'./')) // 实例化文件树

Files.getDirTree() // 获取文件树

function InjectRouter(Router,DirTree){ //  路由注入
    const router = new KoaRouter()
    for (let item of DirTree){
        if (item.hasOwnProperty('DirectoryName')){
            const ChildRouter = InjectRouter(router,item.DirectoryChild.DirTree)
            router.use(`/${item.DirectoryName}`,ChildRouter.routes())
        }
        if (item.hasOwnProperty('FileName') && item.FileName === 'index.js'){
            const ChildRouter = require(item.FilePath)
            if (ChildRouter instanceof KoaRouter){
                router.use(ChildRouter.routes())
            }else {
                console.log("Found RouterModel But It is Not KoaRouter ---- pass")
            }
        }
    }
    return router
}

const Router = InjectRouter(Origin_Router,Files.DirTree)

module.exports = { InjectRouter,Router }

