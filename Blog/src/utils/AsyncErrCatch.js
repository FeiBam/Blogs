function AsyncErrCatch(Promise){
    return Promise.then(res => { return [null,res] })
        .catch(err => { return [err] })
}

export {
    AsyncErrCatch
}