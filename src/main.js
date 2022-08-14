import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://trader.niuwx.cn';
 
// 引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
// 引入vuex
import store from './store/index';

// 将时间戳转换为时间
import moment from 'moment';
Vue.prototype.$moment = moment;


Vue.use(VueRouter)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
