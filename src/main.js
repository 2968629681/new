import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
