<template>
<div class="content-wrapper">
<div>
    <vuetable ref="vuetable"
              :api-url="api_url"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
              @vuetable:load-error="onLoadError"
              @vuetable:load-success="onLoadSuccess"
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

import {api_userList} from '../../api.js'
import mixins from '../../mixins.js'

export default {
    mixins:[mixins],
  data () {
    return {
      title: '',
      api_url: '',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: ['id', 'openid', {
          name: 'nickname',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '昵称',
      }, 'created_at', 'balance', 'subscribe', 'city'],
    }
  },
  mounted () {
    this.$nextTick(()=>{
        this.changeUrl ()
    })
  },
  methods: {
      onPaginationData (paginationData) {
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
//          console.log('onPaginationData',paginationData);
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
