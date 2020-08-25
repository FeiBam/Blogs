const responseHandel = {
    success:(ctx,data,message,code,other) => {
        ctx.status = 200
        ctx.body = {
            code:code || 1 ,
            status:200,
            message:message || '',
            data:data,
            ...other
        }
        return Promise.resolve()
    },
    AttributeError:(ctx,code,error,other) => {
        ctx.status = 401
        ctx.body = {
            code:code || 401,
            status:401,
            message:error,
            data:'',
            ...other
        }
         return Promise.resolve()
    }
}


module.exports = responseHandel