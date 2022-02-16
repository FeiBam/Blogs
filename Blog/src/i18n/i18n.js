import CookiesHelper from "../utils/Cookies";



class I18n {
    constructor(defualutLang = null){
        this.lang = defualutLang
        this.langData = {}
        this.init()
    }
    changeLang(Lang){
        if(CookiesHelper.getItem('language') === Lang) return false
        CookiesHelper.setItem('language',Lang)
        location.reload()
    }
    $T(tag){
        return this.langData[this.lang][tag]
    }
    addLangData(lang,data){
        this.langData[lang] = data
    }
    init(){
        if(!CookiesHelper.getItem('language')) CookiesHelper.setItem("language",this.lang ? this.lang : navigator.language)
        this.lang = CookiesHelper.getItem('language')
    }
}

const CN = {
    friendLink:"友链",
    friend:'朋友们',
    about:'关于',
    article:'文章'
}


const EN = {
    friendLink:'FriendLinks',
    friend:'The friend',
    about:'about',
    article:'article'
}

const Jp = {
    friendLink:'フレンズ',
    friend:'フレンズ',
    about:'私について',
    article:'文章'
}


const i18n = new I18n()

i18n.addLangData('zh-CN',CN)
i18n.addLangData('en-US',EN)
i18n.addLangData('jp-JA',Jp)

export default i18n