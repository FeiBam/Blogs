import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from "./router";
import store from "./store";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '../public/fontawesome-free-5.14.0-web/css/all.min.css'
import '../src/assets/css/blog.css'
import '../src/assets/css/media.css'
//import './api/initData'
//import './Permission'
import { setTitle } from './utils/SetTitle'

Vue.config.productionTip = false

Vue.prototype.$throttle = function (func, timeFrame) {
  let lastTime = 0;
  return function () {
    const now = new Date();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}

Vue.prototype.$setTitle = setTitle

Vue.use(mavonEditor)
Vue.use(Vuex)




new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
