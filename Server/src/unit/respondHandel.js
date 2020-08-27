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


module.exports = respondHandel