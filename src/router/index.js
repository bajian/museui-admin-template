import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import PageLogin from 'views/login'
import PageIndex from 'views/index'

import SubPageUserList from 'views/user/list'
import SubPageUserDetail from 'views/user/detail'

Vue.use(Router)

export const router_title={
  '/':'首页',
  '/user/list':'用户列表',
  '/user/detail':'用户详情',
}

const children_user=[
{
      path: '/user/list',
      name: 'SubPageUserList',
      component: SubPageUserList
    },
{
      path: '/user/detail',
      name: 'SubPageUserDetail',
      component: SubPageUserDetail
    },
]

export default new Router({
  routes: [
    {
    // meta: { requiresAuth: true },
      path: '/',
      name: 'PageIndex',
      component: PageIndex,
      children:children_user
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin
    },
  ]
})
