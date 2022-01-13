

function ObjectRemove(ObjectA,ObjectB,Parthon) {
    const ObjectAKeyArr = Object.keys(ObjectA)
    const ObjectBKeyArr = Object.keys(ObjectB)
    for (aitem of ObjectAKeyArr){
        for (bitem of ObjectBKeyArr ){
            if (aitem === bitem){
                if (typeof ObjectB[bitem] === 'object'){
                    ObjectRemove(ObjectA[aitem],ObjectB[bitem])
                }
                else {
                    Reflect.deleteProperty(ObjectA,bitem)
                }
            }
        }
    }
}


module.exports = {
    ObjectRemove
}