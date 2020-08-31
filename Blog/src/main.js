import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueAxios from "vue-axios";
import Vuex from 'vuex'
import AntdV from 'ant-design-vue'
import router from "./router";
import store from "./store";


import './unit/Permission'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueAxios,Axios)
Vue.use(AntdV)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
