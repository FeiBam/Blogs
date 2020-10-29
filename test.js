const fs = require('fs')

const Path = 'D:\\Steam\\steamapps\\common'
const files = fs.readdirSync(Path)

const reg = /7z.+\d$/

console.log(files)


files.forEach((item,index)=>{
    let itemPath = Path+'\\'+item
    if (item.match(reg)){
        fs.unlinkSync(itemPath)
        console.log(`已经删除${item}`)
        console.log(`一共拥有${files.length},个文件,已经删除${index},剩余${files.length-index}`)
    }
})