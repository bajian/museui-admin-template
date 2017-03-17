// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config'
import store from './vuex/store'

import ls from './utils/ls.js'
import myajax from './utils/myajax.js'
import {lskey_user} from './persistent.js'

import './assets/css/global.css'
import './assets/css/normalize.css'
import './assets/css/md_iconfont.css'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import Toast from './components/toast'

Vue.use(MuseUI)
Vue.use(Toast)

router.beforeEach((to,from, next) => {
  console.log('to.path',to.path);
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user) {
    let user=ls.jsonVal(lskey_user)
    if (user && user.access_token ) {
      console.log('has user ls');
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

myajax.param_token_key='access_token'
myajax.prefix='http://swingcar.com/'
myajax.defaultFailCallback=(err)=>{
  alert(config.APP_DEBUG?JSON.stringify(err):'请求失败，请稍后重试')
  console.log(err)
}
myajax.defaultMiddleware=(data)=>{
  console.log('defaultMiddleware',data)
    if (data && data.code===config.NOT_LOGIN_CODE){
        window.redirect=router.currentRoute.path
        router.replace('/login')
    }
}
window.onerror=(err)=>{
  console.log(err)
  if (config.APP_DEBUG){
      return alert(JSON.stringify(err))
  }

}

window.myajax=myajax
window.router=router
window.config=config
window.Toast=Toast
// window.log=console.log
