import './register-service-worker'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/main.scss'
import '@/assets/scss/fonts.scss'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
