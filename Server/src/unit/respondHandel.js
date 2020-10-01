

const respondHandel = {

}

respondHandel.success = (ctx,data,message,...other) =>{
    ctx.status = 200
    ctx.body = {
        status:200,
        code:1,
        message:message,
        data:data,
        other
    }
}

respondHandel.notFound = (ctx,code,message,...other) => {
    ctx.status = 404
    ctx.body = {
        status:404,
        code:code,
        message:message,
        other
    }
}

respondHandel.AttributeError = (ctx,code,message,...other) => {
    ctx.status = 400
    ctx.body = {
        status:ctx.status,
        code:code,
        message:message,
        other
    }
}

respondHandel.UnauthorizedError = (ctx,code,message,...other) => {
    ctx.status = 401
    ctx.body = {
        status:ctx.status,
        code:code,
        message:message,
        other
    }
}


module.exports = {
    respondHandel,
}