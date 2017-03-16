<template>
<div class="content-wrapper">
<div>
    <vuetable ref="vuetable"
              :api-url="api_url"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
              @vuetable:load-error="onLoadError"
              :fields="fields"
    ></vuetable>
    <div class="vuetable-pagination ui basic segment grid">
        <vuetable-pagination-info ref="paginationInfo"
        ></vuetable-pagination-info>

        <vuetable-pagination ref="pagination"
           @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
    </div>
    <button @click="changeUrl">refresh</button>
</div>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import {api_userList} from '../../api.js'

export default {
  data () {
    return {
      title: '',
      api_url: '',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: ['id', 'openid', 'nickname', 'created_at', 'balance', 'subscribe', 'city'],
    }
  },
  mounted () {
    this.$nextTick(()=>{
        this.changeUrl ()
//        console.log('mounted->',this.name)
    })
  },
  methods: {
      onPaginationData (paginationData) {
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
          console.log('onPaginationData',paginationData);
      },
      onChangePage (page) {
          this.$refs.vuetable.changePage(page)
          console.log('onChangePage',page);
      },
      onLoadError (response) {
          console.log('onLoadError',response);
      },

      changeUrl () {
          console.log('changeUrl b4',this.api_url);
          this.api_url=api_userList
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
