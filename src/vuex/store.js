// import promise from 'es6-promise';
// promise.polyfill();
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	user: {
      isLogin:false,
      name:'未登录',
      pwd:'',
    }
  },
  mutations,
  actions,
  getters
})

// store.getters.doneTodos