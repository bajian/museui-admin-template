// import { set } from 'vue' //array push : set(arr,key,value)
import * as types from './mutation-types'

export default {
  [types.SET_USER_LOGIN] (state, user) {
    state.user=user
  },

  [types.SET_ITEM_INDEX] (state, index) {
    state.itemIndex=index
  },

  [types.SET_CURRENT_ARTICLE] (state, currentArticle) {
    state.currentArticle=currentArticle
  },

  [types.SET_USER_LOGOUT] (state) {
    state.user=null
  }

}

