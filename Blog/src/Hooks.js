import Router from "./router";
import Store from './store'
import Request from './api'
import { MutationsMixin as AdminMutationsMixin } from './store/admin/Minxin'
import { setTitle } from '@/utils/SetTitle'



const Time = new Date()

const AuthTimeliest = 60 * 60 * 1000
const loginReg = /login/i


let docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
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
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
};

Router.beforeEach((to,from,next) =>{
    if (localStorage.getItem('AuthFail')){
        const AuthFailTime = localStorage.getItem('AuthFail')
        if (Time.getTime() - AuthFailTime < AuthTimeliest){
            window.location.href="about:blank";
            return;
        }
        localStorage.removeItem('AuthFail')
        Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,0)
        Router.push('/login')
        return;
    }
    if (Store.state.Admin.loginTryTwice >= 5){
        localStorage.setItem('AuthFail',Time.getTime().toString())
        window.location.href="about:blank";
    }
    if (to.fullPath.split('/')[1] === 'admin'){
        setTitle('飞竹的小站 | 管理处')
        if (Store.state.Admin.AccessToken === ''){
            Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,Store.state.Admin.loginTryTwice + 1)
            Router.push('/login')
            return
        }
        next()
    }
    if (to.fullPath.split('/')[1].match(loginReg)){
        setTitle('飞竹的小站 | 管理处')
        if (Store.state.Admin.AccessToken !== ''){
            Request.TokenTest().then(res =>{
                if (res.status === 200){
                    Store.commit(`Admin/${AdminMutationsMixin.setTryTwice}`,0)
                    Router.push('/admin')
                }
            })
        }
        next()
    }
    next()
})


