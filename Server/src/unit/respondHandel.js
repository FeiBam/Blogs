

const respondHandel = {

}

respondHandel.success = (ctx,data,message,other) =>{
    ctx.status = 200
    ctx.body = {
        status:200,
        message:message,
        data:data,
        ...other
    }
}

respondHandel.notFound = (ctx,message,other) => {
    ctx.status = 404
    ctx.body = {
        status:404,
        message:message,
        ...other
    }
}

respondHandel.AttributeError = (ctx,code,message,other) => {
    ctx.status = 400
    ctx.body = {
        status:code,
        message:message,
        ...other
    }
}

module.exports = {
    respondHandel,
}