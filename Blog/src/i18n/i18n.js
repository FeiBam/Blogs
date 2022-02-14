



let docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
};


class I18n {
    constructor(defualutLang = null){
        this.lang = defualutLang
        this.langData = {}
        this.init()
    }
    changeLang(Lang){
        if(docCookies.getItem('language') === Lang) return false
        docCookies.setItem('language',Lang)
        location.reload()
    }
    $T(tag){
        return this.langData[this.lang][tag]
    }
    addLangData(lang,data){
        this.langData[lang] = data
    }
    init(){
        if(!docCookies.getItem('language')) docCookies.setItem("language",this.lang ? this.lang : navigator.language)
        this.lang = docCookies.getItem('language')
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


const i18n = new I18n('jp-JA')

i18n.addLangData('zh-CN',CN)
i18n.addLangData('en-US',EN)
i18n.addLangData('jp-JA',Jp)

export default i18n