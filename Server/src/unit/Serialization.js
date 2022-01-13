const { Worker, MessageChannel, MessagePort, isMainThread, parentPort } = require('worker_threads');



class Serialization{
    constructor(Target,Maps,Reverse = false,father = null,NowHandelObjectKey = '') {
        if (typeof Target !== 'object' || typeof Maps !== 'object'){
            throw new Error('参数必须是对象')
        }
        this.father = father
        this.Reverse = Reverse
        if (!father){
            this.Target = JSON.parse(JSON.stringify(Target))
        }
        else {
            this.Target = Target
        }
        if (!isMainThread){
            const worker = new Worker(__filename)
        }
        this.Maps = Maps
        this.SaveObject = {}
        this.TargetKeys = Object.keys(Target)
        this.MapsKeys = Object.keys(Maps)
        this.DeleteKeys = []
        this.NowHandelObjectKey = NowHandelObjectKey
    }
    RemoveKey(Keys){
        Keys = Keys.toString()
        Reflect.deleteProperty(this.Target,Keys)
        this.DeleteKeys.push(Keys)
    }
    Remove(TargetKey,MapsKey){
        if (TargetKey === MapsKey){
            if (typeof this.Target[MapsKey] === 'object'){
                if (Array.isArray(this.Target[MapsKey])) this.RemoveKey(MapsKey)
                else {
                    let Child = new Serialization(this.Target[TargetKey],this.Maps[MapsKey],false,this)
                    Child.Main()
                    if (Child.TargetKeys.length === Child.DeleteKeys.length) this.RemoveKey(MapsKey)
                }
            }
            else this.RemoveKey(MapsKey)
        }
    }
    Save(TargetKey,MapsKey){
        if (TargetKey === MapsKey){
            if (this.father) this.SaveObject = this.father.SaveObject[this.NowHandelObjectKey] //映射父级
            if (typeof this.Target[MapsKey] === 'object'){
                if (Array.isArray(this.Target[MapsKey])) {
                    if (this.Target[MapsKey].length === 0) this.SaveObject[MapsKey] = this.Target[MapsKey]
                    else this.SaveObject[MapsKey] = this.Target[MapsKey].map(this.Maps[MapsKey])
                }
                else {
                    this.SaveObject[MapsKey] = {}
                    let Child = new Serialization(this.Target[TargetKey],this.Maps[MapsKey],true,this,MapsKey)
                    Child.Main()
                }
            }
            else this.SaveObject[MapsKey] = this.Target[MapsKey]
        }
    }
    Main(){
        for (let TargetKey of this.TargetKeys){
            for (let MapsKey of this.MapsKeys){
                if (!this.Reverse) this.Remove(TargetKey,MapsKey)
                else this.Save(TargetKey,MapsKey)
            }
        }
        if (this.Reverse) return this.SaveObject
        return this.Target
    }
}

//Object序列化器  参数 (目标对象,映射对象,保留模式,[父级],[当前处理对象Key])
//保留模式  true 即为开启 此时会根据映射对象的值来保留 目标对象内的值 也可以对数组进行操作
//  const foo = {
//      foo:'123',
//      bar:[1,3,4,5]
//  }
//
//  const bar = {
//      foo:'123',
//      bar:(item,index)=>{
//          return item+=1
//      }
//  }
//
//  const foobar = new Serialization(foo,bar,true)
//  foobar.Main()
//  { foo: '123', bar: [ 2, 4, 5, 6 ] }



module.exports = Serialization