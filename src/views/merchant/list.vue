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

import {api_merchantList} from '../../api.js'
import mixins from '../../mixins.js'

export default {
    mixins:[mixins],
  data () {
    return {
      title: '',
      api_url: 'aa',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: ['id', 'openid',{
          name: 'nickname',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '昵称',
      },{
          name: 'merchant.real_name',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '姓名',
      },{
          name: 'merchant.phone',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '手机号',
      },{
          name: 'merchant.created_at',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '商户注册',
      }, {
          name: 'created_at',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '微信关注',
      }, {
          name: 'merchant.balance',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '商户余额',
      },{
          name: 'merchant.car_count',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '设备数',
      },{
              name: 'merchant.province.name',
              dataClass: 'center aligned',
              titleClass: 'center aligned',
              title: '省',
          },  {
              name: 'merchant.city.name',
              dataClass: 'center aligned',
              titleClass: 'center aligned',
              title: '市',
          },{
              name: 'merchant.county.name',
              dataClass: 'center aligned',
              titleClass: 'center aligned',
              title: '区',
          }, {
          name: 'subscribe',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '关注状态',
      } ],
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
      onChangePage (page) {
          this.$refs.vuetable.changePage(page)
//          console.log('onChangePage',page);
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
          this.api_url=this.appendAccessToken(api_merchantList)
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
