class HumanBase {
    constructor(sex,date,name) {
        this.sex = sex
        this.date = date
        this.name = name
    }
    Say(){
        console.log(`i am a ${this.name},sex is:${this.sex}`)
    }
}

class Man extends HumanBase{
    constructor(size,date,name) {
        super('man',props);
        this.dictSize = size
    }
}

class WoMan extends HumanBase{
    constructor(size,props) {
        super(props);
        this.size = size
    }

}

const boy = new Man(4,2002,'小米')

boy.Say()