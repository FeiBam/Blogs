function UserErrHandel(ctx,StatusCode,ResCode = -1,ErrMessage,other) {
    const Err = new Error()
    Err.status = StatusCode
    ctx.userErr = true
    if (typeof arguments[2] !== 'number'){
        Err.message = arguments[2]
        Err.other = arguments[3]
    }
    else {
        Err.message = ErrMessage
        Err.code = ResCode
        Err.other = other
    }
    throw Err

}

module.exports = {
    UserErrHandel
}