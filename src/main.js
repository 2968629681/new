import Vue from 'vue'
import App from './App.vue'
 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入axios
import axios from 'axios';
// 挂载到vue原型链上
Vue.prototype.axios = axios;

// 引入router
import router from 'vue-router'


// 引入vuex
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
