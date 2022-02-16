



class assert { 
    constructor(){
        this.caller = {}
    }
    addCaller(Name,Call){
        if(!this.caller[Name]) this.caller[Name] = []
        this.caller[Name].push(Call)
    }
    Call(Name,...args){
        
    }
}