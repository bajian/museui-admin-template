import Vue from 'vue'
import Router from 'vue-router'
import PageLogin from 'views/login'
import PageIndex from 'views/index'

import SubPageUserList from 'views/user/list'
import SubPageUserDetail from 'views/user/detail'
import SubPageDeviceList from 'views/device/list'
import SubPageDeviceDetail from 'views/device/detail'
import SubPageMerchantDetail from 'views/merchant/detail'
import SubPageMerchantList from 'views/merchant/list'

Vue.use(Router)

export const router_title={
  '/':'首页',
  '/user/list':'用户列表',
  '/user/detail':'用户详情',
  '/device/list':'设备列表',
  '/device/detail':'设备详情',
  '/merchant/list':'商户列表',
  '/merchant/detail/:phone':'商户详情',
}

const children_user=[
{
      path: '/merchant/list',
      name: 'SubPageMerchantList',
      component: SubPageMerchantList
    },
{
      path: '/merchant/detail',
      name: 'SubPageMerchantDetail',
      component: SubPageMerchantDetail
    },{
      path: '/user/list',
      name: 'SubPageUserList',
      component: SubPageUserList
    },
{
      path: '/user/detail/:id',
      name: 'SubPageUserDetail',
      component: SubPageUserDetail
    },
{
      path: '/device/list',
      name: 'SubPageDeviceList',
      component: SubPageDeviceList
    },
{
      path: '/device/detail',
      name: 'SubPageDeviceDetail',
      component: SubPageDeviceDetail
    },{
      path: '/device/detail/:device_id',
      name: 'SubPageDeviceDetail',
      component: SubPageDeviceDetail
    },
]

export default new Router({
  routes: [
    {
    meta: { requiresLogin: true },
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
