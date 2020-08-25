function Random() {
    let defaultStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.RandomString = function (length,str = defaultStr) { //长度:num  取值字符串:str
        let result = ''
        for (let i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
        return result;
    }
    this.RandomNumber = function (small,big,floor=true) {//开始数字:num 结束数字:num 是否为整数:boolean/默认true
        let number = Math.random()
        if (floor){
            return Math.floor(number*( big - small) + small)
        }
        return (number*(big - small) + small)
    }
}

module.exports = Random

