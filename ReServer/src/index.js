const Koa = require('koa')
const KoaBody = require('koa-bodyparser')



const app  = new Koa()

function init(){

}

app.use(async (ctx,next)=>{
    if (ctx.method === 'OPTIONS'){
        ctx.set('Access-Control-Allow-Origin','*')
        ctx.set('Access-Control-Allow-Headers','access-token')
        ctx.status = 204
        if (ctx.get('Origin')) return await next()
    }
})

app.use(async (ctx)=>{
    console.log(1)
    ctx.set('Access-Control-Allow-Origin','*')
    ctx.body = 'ok'
    ctx.status = 302
})



app.listen('8000')

