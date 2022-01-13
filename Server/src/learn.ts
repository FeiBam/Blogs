interface LearnGetData {
    name:string,
    age:number,
    info:string
}


class Learn{
    public name: string;
    public age:number;
    constructor(name:string,age:number) {
        this.name = name
        this.age = age
    }
    get():LearnGetData{
        return {
            name: this.name,
            age: this.age,
            info: `iamxxx`
        }
    }
}
const User = new Learn('feibam',23)

console.log(JSON.stringify(User.get()))
