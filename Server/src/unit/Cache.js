// cache对象   初始化实例的时候请务必传递 是否允许自动删除超时元素 new Cache(bool,number)
//const base = new Cache(true)
function Cache(autoRemoveTimeOutEvent,timeout = 60) {
    this.CacheSpace = []
    this.select = async function (key) {
        let index = 0
        for (item of this.CacheSpace){
            if (item.key === key){
                return {
                    item:this.CacheSpace[index],
                    index:index
                }
            }
            index++
        }
        return false
    } //提供key名字查找对象 base.select(114514) 如果存在 索引值，返回索引对象，否则返回 false
    this.add = async function (key,value,timeout ) {
        if (typeof value !== 'object'){
            value = { value }
        }
        let object ={
            key,
            time:Date.now(),
            timeout,
            value:{
                ...value,
            },
        }
        this.CacheSpace.push(object)
        return object
    }     //添加元素 base.add(114513,{time:name,data:'野兽前辈！'},1000) 无返回值
    this.remove = async function (key) {
        const index = await this.select(key)
        const arr = this.CacheSpace.splice(index.index,1)
        return arr.length !== 0;
    }  //删除元素 base.remove(114514) 删除成功返回 true 否则返回false
    this.replace = async function (key,value,timeout = Infinity) {
        const object = await this.select(key)
        const replaceObject = {
            key,
            time:Date.now(),
            timeout,
            value:{
                ...value,
            },
        }
        if (object){
            return this.CacheSpace.splice(object.index,1,replaceObject).length !==0
        }
    } // 替换元素 base.replace(114514,{time:Date.Now(),data:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！'},2000)
    this.update = async function (key,Object) {
        const OriginObject = await this.select(key)
        const updateObject = {
            key,
            time:Object.time,
            updateTime:Date.now(),
            timeout:Object.timeout,
            value:Object.value
        }
        if (OriginObject){
            return this.CacheSpace.splice(OriginObject.index,1,updateObject).length !==0
        }

    }
    this.removeTimeoutData = function () {
        for (item of this.CacheSpace){
            if ((Date.now() - item.time) > item.timeout){
                this.remove(item.key)
            }
        }
    } //删除超时元素
    this.init = function () {
        if (typeof autoRemoveTimeOutEvent === 'undefined'){
            throw TypeError('You Must set autoRemoveTimeOutEvent state/ true or false')
        }
        else {
            if (autoRemoveTimeOutEvent){
                setInterval(()=>{this.removeTimeoutData()},timeout*1000)
            }
        }
    }
    this.init()//初始化
}
module.exports = Cache



