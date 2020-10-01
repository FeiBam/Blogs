async function a(value) {
    const res = await b(value)
    console.log(res)
}

async function b(value) {
    const res = await c(value)
    return res
}

async function c(data) {
    console.log(111)
    return data
}

a(666)