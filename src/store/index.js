import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import news from './news'
import layout from './layout'

export default new Vuex.Store({
  modules: {
    news, layout
  }
})
