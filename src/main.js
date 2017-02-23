// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import ss from './utils/ss.js'
import {sskey_user} from './persistent.js'

import './assets/css/global.css'
import './assets/css/normalize.css'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

router.beforeEach((to,from, next) => {
  console.log('to.path',to.path);
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user.isLogin) {
    var user=ss.jsonVal(sskey_user)
    if (user && typeof user =='object') {
      console.log('has sesssionStorge');
      store.dispatch('setUserLogin',user)
      next()
    }else{
      window.redirect=to.path
      console.log('need login from ',to.path);
      next({
        path:'/login'
      })
    }
  }
  else 
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
