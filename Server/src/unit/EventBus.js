class EventBus {
    constructor(Handel) {
        if (Handel){
            if (typeof Handel !== 'object'){
                throw new Error('Handel must be object')
            }
            this.Handel = Handel
        }
        else {
            this.Handel = {}
        }
    }
    EmitEvent(code,...args){
        if (!code){
            throw new Error('required ErrCode')
        }
        return this.Handel[code].call(this,...args)
    }
    OnEvent(code,callback){
        if (this.Handel[code]){
            throw new Error('is already have this error handling code')
        }
        this.Handel[code] = callback
    }
}


module.exports = EventBus