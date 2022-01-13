import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import BlogModel from './blog/index'
import AdminModel from './admin/index'

const store = new Vuex.Store({
    modules:{
        Blog:BlogModel,
        Admin:AdminModel
    }
})

export default store