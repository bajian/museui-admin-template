<template>
<div class="content-wrapper">
    <panel>
        <span slot="title">操作</span>
        <div @keyup.enter="search()" slot="content">
            <mu-text-field v-model="phone" label="输入手机号搜索" labelFloat/>
            <mu-raised-button @click="search()" label="搜索" primary/>
        </div>
    </panel>
    <div class="merchant_tabs_container">
        <mu-tabs style="width: 50%;min-width: 300px;max-width: 800px;" :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="商户信息"/>
            <mu-tab value="tab2" title="商户流水"/>
            <mu-tab value="tab3"  title="商户设备"/>
        </mu-tabs>
        <div class="tab-content" v-if="activeTab === 'tab1'">
        <!--基本信息-->
            <div class="line">姓名：<span class="bold">{{merchant_name}}</span></div>
            <div class="line">openid：<span class="bold">{{merchant_openid}}</span></div>
            <div class="line">phone：<span class="bold">{{phone}}</span></div>
            <div class="line">余额：<span class="bold">{{merchant_balance}}</span></div>
            <div class="line">设备数：<span class="bold">{{device_count}}</span></div>
            <div class="line">微信关注：<span class="bold">{{merchant_wx_created_at}}</span></div>
            <div class="line">省：<span class="bold">{{merchant_province_name}}</span></div>
            <div class="line">市：<span class="bold">{{merchant_city_name}}</span></div>
            <div class="line">区：<span class="bold">{{merchant_county_name}}</span></div>

        </div>
        <div class="tab-content" v-show="activeTab === 'tab2'">
            <div>
                <vuetable ref="vuetable_charge_history"
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
        <div class="tab-content" v-show="activeTab === 'tab3'">
            <div>
                <vuetable ref="vuetable_merchant_device_list"
                          :api-url="api_url2"
                          pagination-path=""
                          @vuetable:pagination-data="onPaginationData2"
                          @vuetable:load-error="onLoadError2"
                          @vuetable:load-success="onLoadSuccess2"
                          :fields="fields2"
                ></vuetable>
                <div class="vuetable-pagination ui basic segment grid">
                    <vuetable-pagination-info ref="paginationInfo2"
                    ></vuetable-pagination-info>

                    <vuetable-pagination ref="pagination2"
                        @vuetable-pagination:change-page="onChangePage2"
                    ></vuetable-pagination>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import panel from '../../components/panel.vue'
    import {api_searchMerchant,api_merchantChargeHistory,api_merchantDeviceList} from '../../api.js'

    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

    import mixins from '../../mixins.js'
    export default {
        mixins:[mixins],
  data () {
    return {
        api_url:'aaa',
        api_url2:'aaa',
        activeTab: 'tab1',
        phone:'',
        merchant_info:null,
        merchant_name:'',
        merchant_openid:'',
        merchant_wx_created_at:'',
        merchant_balance:'',
        merchant_city_name:'',
        merchant_province_name:'',
        merchant_county_name:'',
        device_count:'',
        fields:[{
            name: 'id',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '序号',
        },{
            name: 'money',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '金额',
        },{
            name: 'created_at',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '时间',
        },{
            name: 'balance_before',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '余额前',
        },{
            name: 'balance_after',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '余额后',
        },{
            name: 'order_id',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '订单id',
        },{
            name: 'chargetype.type_description',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '类型',
        },{
            name: 'device_id',
            dataClass: 'center aligned',
            titleClass: 'center aligned',
            title: '设备id',
        },
        ],fields2:[
            'id', 'device_id','password',
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
            },'ticket'],
    }
  },
//    {"code":0,"msg":"","data":[{"id":3,"merchant_id":5,"money":"1.00","created_at":"2017-03-09 23:47:26","updated_at":null,
// "balance_before":"10.00","balance_after":"11.00","type":5,"order_id":"aaawwxx","device_id":"20170308001",
// "chargetype":{"id":5,"type_description":"用户消费收入"}},{"id":4,"merchant_id":5,"money":"1.00","created_at":"2017-03-09 23:47:59","updated_at":null,"balance_before":"11.00","balance_after":"12.00","type":5,"order_id":"aarawwxx","device_id":"20170308001","chargetype":{"id":5,"type_description":"用户消费收入"}}]}

    mounted () {

  },
    watch: {
        phone:  function(val, oldVal) {
            if (val.length===11)
                Toast.info('搜索中...') && this.search()
            else if(val.length>11){
                Toast.info('手机号超过11位了')
            }
        }
    },
  methods: {
      changeUrl () {
          console.log('changeUrl b4',this.api_url);
          this.api_url=this.appendAccessToken((api_merchantChargeHistory+'?merchant_id='+this.merchant_info.id))
          console.log('changeUrl after',this.api_url);
          this.$nextTick(()=>{
              this.$refs.vuetable_charge_history && this.$refs.vuetable_charge_history.refresh()
          })
      },
      changeUrl2 () {
          console.log('changeUrl2 b4',this.api_url2);
          this.api_url2=this.appendAccessToken((api_merchantDeviceList+'?merchant_id='+this.merchant_info.id))
          console.log('changeUrl2 after',this.api_url2);
          this.$nextTick(()=>{
              this.$refs.vuetable_merchant_device_list && this.$refs.vuetable_merchant_device_list.refresh()
          })
      },
      onPaginationData (paginationData) {
          console.log('paginationData',paginationData)
          window.t=this.$refs
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
          this.$refs.vuetable_charge_history.changePage(page)
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
      onPaginationData2 (paginationData) {
          console.log('paginationData2',paginationData)
          window.t=this.$refs
          this.$refs.pagination2.setPaginationData(paginationData)
          this.$refs.paginationInfo2.setPaginationData(paginationData)
      },
      onChangePage2 (page) {
          this.$refs.vuetable_merchant_device_list.changePage(page)
      },
      onLoadError2 (response) {
          console.log('onLoadError2',response);
      },

      onLoadSuccess2 (response) {
          console.log('onLoadSuccess2',response);
          if (response.body && response.body.code && response.body.code===config.NOT_LOGIN_CODE){
              window.redirect=this.$route.path
              this.goTo('/login')
          }
      },
      handleTabChange (val) {
          this.activeTab = val
      },

      search(){
          if (this.phone.length!==11)
              return Toast.error('手机号长度不对')
          myajax.cpost(api_searchMerchant,{
              phone:this.phone
          },(data)=>{
              if (data && data.code!==0)
                  return Toast.error(data.msg||'请求失败')
              this.merchant_info=data.data
              this.merchant_name=data.data.real_name
              this.merchant_openid=data.data.openid
                  this.merchant_wx_created_at=data.data.user.created_at
                  this.merchant_balance=data.data.balance
                  this.merchant_city_name=data.data.city?data.data.city.name:''
                  this.merchant_province_name=data.data.province?data.data.province.name:''
                  this.merchant_county_name=data.data.county?data.data.county.name:''
                  this.device_count=data.data.car_count
              Toast.info('搜索完成')
              this.changeUrl ()
              this.changeUrl2 ()
//              {"code":0,"msg":"","data":{"id":5,"openid":"oZA4hv-IWpNrT4spdyOKZdr_pjhM","created_at":"2017-03-08 09:53:24",
// "updated_at":"2017-03-08 09:53:24","balance":"12.00","city":{"id":110100,"name":"北京市","parent_id":110000,"sort":1},
// "province":{"id":110000,"name":"北京市","parent_id":0,"sort":1},"county":{"id":110101,"name":"东城区","parent_id":110100,"sort":1},
// "addr":"哈哈哈哈","real_name":"黄XX","phone":"13714876874","car_count":1,"user":{"id":1,"openid":"oZA4hv-IWpNrT4spdyOKZdr_pjhM","nickname":"bajianx",
// "created_at":"2017-03-08 13:23:24","deleted_at":null,"balance":"6.00","subscribe":1,"headimgurl":"12314654654url","city":"深圳市","province":"广东省",
// "merchant_id":5,"updated_at":"2017-03-13 15:37:03","lat":null,"lng":null,"location_updated_at":null,"sex":0}}}
          })
      }

  },

  components: {
      panel,
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
  }
}


</script>

<style lang="less">

</style>
