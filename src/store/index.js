import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const state = {
  pjtnews: 0,
  count: 1
}
//准备mutations——用于操作数据（state）
const mutations = {
  add(state) {
    state.count += 1;
  },
  reduce(state) {
    state.count -= 1;
  }
}

const actions = {
  
}
//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
});