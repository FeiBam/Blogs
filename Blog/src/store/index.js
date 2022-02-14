import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import BlogModel from './blog/index'

const store = new Vuex.Store({
    modules:{
        Blog:BlogModel,
    }
})

export default store