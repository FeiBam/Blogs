function asyncErrCatch(Promise){
    return Promise.then(res => { return [null,res] })
        .catch(err => { return [err] })
}

module.exports = {
    asyncErrCatch
}