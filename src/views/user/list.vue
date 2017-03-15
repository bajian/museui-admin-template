<template>
<div class="content-wrapper">
<div>
    <vuetable ref="vuetable"
              api-url="http://swingcar.com/api/v1/admin/user/list"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
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

//import {api_userList} from '../../api.js'

export default {
  data () {
    return {
      title: '',
      fields: ['id', 'openid', 'nickname', 'created_at', 'balance', 'subscribe', 'city'],
    }
  },
  mounted () {
    this.$nextTick(()=>{
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
