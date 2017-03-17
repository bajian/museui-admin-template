<template>
<div class="content-wrapper">
<div class="handle-block">
    <mu-raised-button label="添加" class="demo-raised-button" primary/>
    <mu-raised-button label="批量添加" class="demo-raised-button" primary/>
</div>
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

import {api_deviceList} from '../../api.js'
import mixins from '../../mixins.js'

export default {
    mixins:[mixins],
  data () {
    return {
      title: '',
      api_url: '',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: ['id', 'device_id','password',
          {
          name: 'merchant.real_name',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '商户',
      },
          {
          name: 'binding_time',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '商户绑定',
      },
          {
          name: 'reference',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '推广',
      },
          {
          name: 'admin.name',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '渠道',
      },
          'created_at', {
          name:'city.name',
              title: '市',
          }, {
          name:'county.name',
              title: '区',
          }],
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
          this.api_url=this.appendAccessToken(api_deviceList)
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
    .handle-block{
        margin-bottom: 10px;
    }
</style>
