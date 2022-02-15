const Koa = require('koa')
const fs = require('fs')
const KoaBody = require('koa-bodyparser')
const repl = require('repl');

const { Router } = require('./Routes/main.js')

const app  = new Koa()

let config = getConfig()

function getConfig(){
    let configJson = fs.readFileSync('./config.json')
    return JSON.parse(configJson)
}


app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin','*')
    ctx.set('Access-Control-Allow-Method','GET,POST')
    ctx.set('Access-Control-Allow-Headers','*')
    if(ctx.request.method === 'OPTIONS'){
        return ctx.status = 204
    }
    await next()
})

app.use(async (ctx,next)=>{
    if(ctx.originalUrl === '/commond/reload'){
        config = getConfig()
        return ctx.body = 'success'
    }
    ctx.state.globalConfig = config
    await next()
})

app.use(KoaBody())

app.use(Router.allowedMethods())
app.use(Router.routes())

app.listen('8000')

