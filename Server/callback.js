function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
function createName(ctor, firstName, lastName) {
    return new ctor(firstName, lastName);
}
var Test = /** @class */ (function () {
    function Test(firstName, lastName) {
        this.fullName = firstName + lastName;
    }
    Test.prototype.kick = function (who) {
        console.log(who + "kicked" + this.fullName);
    };
    Test.prototype.say = function (message) {
        console.log(this.fullName + "say:" + message);
    };
    return Test;
}());
var xiaoming = createName(Test, '小', '明');
xiaoming.say('hello');
xiaoming.kick('teacher');
