
const fs = require('fs')

class ArticleModel{
    #Article_Json
    #need_update;
    constructor(title = '',Introduction = '',Tags = [],Subject = '') {
        this.title = title
        this.Introduction = Introduction
        this.Tags = Tags
        this.Subject = Subject
        this.create_At = new Date().getTime()
        this.#need_update = true
        this.#Article_Json = null
    }
    format_form_json(Json){
        const JsonObject = JSON.parse(Json)
        this.set_title(JsonObject.title)
        this.set_Introduction(JsonObject.Introduction)
        this.set_Tags(JsonObject.Tags)
        this.set_Subject(JsonObject.Subject)
        this.set_create_At(JsonObject.create_At)
        this.#Article_Json = Json
        this.#need_update = false
        return this
    }
    #format_to_json(){
        this.#Article_Json = JSON.stringify(this)
        return this
    }
    set_title(title){
        this.#need_update = true
        this.title = title
        return this
    }
    set_Introduction(Introduction){
        this.#need_update = true
        this.Introduction = Introduction
        return this
    }
    set_Tags(Tags){
        this.#need_update = true
        this.Tags = Tags
        return this
    }
    set_Subject(Subject){
        this.#need_update = true
        this.Subject = Subject
        return this
    }
    set_create_At(Time){
        this.#need_update = true
        this.create_At = Time
        return this
    }
    add_Tag(Name){
        this.#need_update = true
        this.Tags.push(Name)
        return this
    }
    remove_Tag(Name){
        if (!this.Tags.indexOf(Name)){
            return 'Not Have this Tag'
        }
        this.Tags.splice(this.Tags.indexOf(Name),1)
    }
    get_CreateAt(){
        return this.create_At
    }
    get_ArticleCreateDate(){
        return new Date(this.get_CreateAt()).toLocaleDateString().replaceAll('/','-') //格式化日期
    }
    get_ArticleJson(){
        if (!this.#Article_Json ||  this.#need_update){
            this.#format_to_json()
        }
        return this.#Article_Json
    }
    need_update(){
        return this.#need_update
    }
}

class ArticlesControl{
    #Articles_Path;
    #private_articles_tree
    #Article_Class
    constructor(path,ArticleClass) {
        this.#Article_Class = ArticleClass
        this.#Articles_Path = path
        this.#private_articles_tree = {}
        this.Need_Update = false
        if (!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
    }
    mixin(ArticleModel){

    }
    getArticles_Tree(){
        return this.#private_articles_tree
    }
    #onLang(lang) {
        this.#private_articles_tree[lang] = {
            index:0
        }
    }
    async #readArticle(lang,ArticleId){
        const ArticleJson = fs.readFileSync(`${this.#Articles_Path}/${lang}/${ArticleId}`) //读取文章本身
        return new this.#Article_Class().format_form_json(ArticleJson)          //获取文章Model
    }
    async #Update_Tree(Lang,ArticleID,Article){
        const ArticleCreateDate = Article.get_ArticleCreateDate()
        this.#private_articles_tree[Lang].index += 1
        this.#private_articles_tree[Lang][ArticleID] = {
            Article:Article,
            createDate:ArticleCreateDate,
        }
        return this
    }
    async save(){
        for (let lang of Object.keys(this.#private_articles_tree)){
            for (let ArticleId of Object.keys(this.#private_articles_tree[lang]).filter((item)=>{ if (item === 'index'){ return false} return item })){
                console.log(ArticleId,this.#private_articles_tree[lang][ArticleId].Article.need_update())
                if (this.#private_articles_tree[lang][ArticleId].Article.need_update()){
                    fs.writeFileSync(`${this.#Articles_Path}/${lang}/${ArticleId}`,this.#private_articles_tree[lang][ArticleId].Article.get_ArticleJson())
                }
            }
        }
        return true
    }
    async getAll(){
        const dirList = fs.readdirSync(this.#Articles_Path)
        for (let Lang of dirList){
            this.#onLang(Lang)
            const ArticleList = fs.readdirSync(`${this.#Articles_Path}/${Lang}`)
            for (let ArticleID of ArticleList){
                const Article = await this.#readArticle(Lang,ArticleID)
                await this.#Update_Tree(Lang,ArticleID,Article)
            }
        }
        return this
    }
    async getArticleByLangAndId(ArticleId,Lang){
        const Article =  await this.#readArticle(Lang,ArticleId)
        this.#onLang(Lang)
        await this.#Update_Tree(Lang,ArticleId,Article)
        return Article
    }
    async getArticlesByLang(Lang){
        this.#onLang(Lang)
        const dirList = fs.readdirSync(`${this.#Articles_Path}/${Lang}`)
        for (let ArticleId of dirList){
            const Article = await this.#readArticle(Lang,ArticleId)
            await this.#Update_Tree(Lang,ArticleId,Article)
        }
        return this
    }
    async createArticle(lang,...args){
        this.Need_Update = true
        await this.getAll()
        const ArticleID = this.#private_articles_tree[lang].index
        if (args.length === 1 && args[0] instanceof this.#Article_Class){
            console.log(1)
            await this.#Update_Tree(lang,ArticleID,args[0])
        }
        else {
            const Article = new this.#Article_Class(...args)
            await this.#Update_Tree(lang,ArticleID,Article)
        }
        return this
    }
    async getAllArticleNum(){
        await this.getAll()
        let ArticleNum = 0
        for (let lang of Object.keys(this.#private_articles_tree)){
            ArticleNum = ArticleNum + this.#private_articles_tree[lang].index
        }
        return ArticleNum
    }
    async getArticleNumByLang(lang){
        await this.getAll()
        return this.#private_articles_tree[lang].index
    }
}

module.exports = {
    ArticleModel,
    ArticlesControl
}