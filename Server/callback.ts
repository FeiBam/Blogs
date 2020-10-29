interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


interface NewConstructorInterface {
    new (firstName:string,lastName:string) : NewInterface
}
interface NewInterface {
    fullName:string
    kick(who:string);
    say(message:string)
}

interface FullNames {
    firstName:string,
    lastName:string
}
function createName(ctor: NewConstructorInterface, firstName: string, lastName: string) : NewInterface{
    return new ctor(firstName,lastName)
}

class Test implements NewInterface {
    public fullName:string
    constructor(firstName:string,lastName:string) {
        this.fullName = firstName + lastName
    }
    kick(who) {
        console.log(`${who}kicked${this.fullName}`)
    }
    say(message) {
        console.log(`${this.fullName}say:${message}`)
    }
}
const xiaoming = createName(Test,'小','明')
xiaoming.say('hello')
xiaoming.kick('teacher')
