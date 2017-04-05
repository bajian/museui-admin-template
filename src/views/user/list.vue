<template>
<div class="content-wrapper">
<div>
    <vuetable ref="vuetable"
              :api-url="api_url"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
              @vuetable:load-error="onLoadError"
              @vuetable:load-success="onLoadSuccess"
              @itemclick="onItemClick"
              :load-on-start="false"
              :fields="fields"
    ></vuetable>
    <div class="vuetable-pagination ui basic segment grid">
        <vuetable-pagination-info ref="paginationInfo"
        ></vuetable-pagination-info>

        <vuetable-pagination ref="pagination"
           @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
    </div>
</div>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import UserListCustomActions from '../components/UserListCustomActions.vue'
import Vue from 'vue'
Vue.component('user-list-custom-actions', UserListCustomActions)

import {api_userList} from '../../api.js'
import mixins from '../../mixins.js'

export default {
    mixins:[mixins],
  data () {
    return {
      title: '',
      api_url: 'aa',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: ['id', 'openid', {
          name: 'nickname',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '昵称',
      }, 'created_at', {
          name: 'balance',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '余额',
      },{
          name: 'subscribe',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '关注',
          callback: 'subscribeCB'
      } , 'city',{
          name: '__component:user-list-custom-actions',
          title: '操作',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
      }],
    }
  },
  mounted () {
    this.$nextTick(()=>{
        setTimeout(()=>{
            this.changeUrl ()
        },50)
    })
  },
  methods: {
      onPaginationData (paginationData) {
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
//          console.log('onPaginationData',paginationData);
      },
      onItemClick (opt) {
          console.log('onItemClick',JSON.stringify(opt))
          switch (opt.action){
              case 'view-item':
                  this.goTo('/user/detail/'+opt.data.id)
                  break;
              case 'edit-item':
                  break;
              case 'delete-item':
                  break;
          }
      },
      onChangePage (page) {
          this.$refs.vuetable.changePage(page)
          console.log('onChangePage',page);
      },
      onLoadError (response) {
          console.log('onLoadError',response);
      },

      onLoadSuccess (response) {
          console.log('onLoadSuccess',response);
          if (response.body && response.body.code && response.body.code===config.NOT_LOGIN_CODE){
              window.redirect=this.$route.path
              this.goTo('/login')
          }
      },

      changeUrl () {
          console.log('changeUrl b4',this.api_url);
          this.api_url=this.appendAccessToken(api_userList)
          console.log('changeUrl after',this.api_url);
          this.$nextTick(()=>{
              this.$refs.vuetable.refresh()
          })
      },
      subscribeCB(value){
          return value===1?'关注':'取关'
      }


  },

  components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
  }
}


</script>

<style lang="less">
</style>
