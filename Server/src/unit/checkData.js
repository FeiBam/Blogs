
function checkData (data,rule) {
    this.Rule = rule
    if (!rule.length === data.length){
        return false
    }
    let index = 0
    this.checkRequire = function (requireType,requireName) {
        if (requireType){
            if (!data[requireName]){
                return false
            }
        }
        return true
    }
    this.checkType = function (type,checkName) {
        return typeof data[checkName] === type.name.toLowerCase();

    }
    for (let item of rule){
        if (!this.checkRequire(item.require,item.name)){
            throw new Error(`Data require ${item.name}`)
        }
        else {
            if (!this.checkType(item.type,item.name)){
                throw new Error(`The data property ${item.name} must be ${item.type.name}, but it is ${typeof data[item.name]}`)
            }
        }
    }
    return data
}

const Data = JSON.parse('{"img":"https://blw.moe/index.gif","url":"https://blw.moe/"}')


console.log(checkData(Data,[
    {
        name:'img',
        type:String,
        require:true
    },
    {
        name:'url',
        type:String,
        require:true
    }
]))

