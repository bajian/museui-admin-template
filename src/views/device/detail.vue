<template>
    <div class="content-wrapper">
        <panel>
            <span slot="title">操作</span>
            <div @keyup.enter="search()" slot="content">
                <mu-text-field v-model="search_value" label="输入设备号/MAC搜索" labelFloat/>
                <mu-raised-button @click="search()" label="搜索" primary/>
            </div>
        </panel>
        <div class="merchant_tabs_container">
            <mu-tabs style="width: 35%;min-width: 200px;max-width: 600px;" :value="activeTab" @change="handleTabChange">
                <mu-tab value="tab1" title="设备信息"/>
                <mu-tab value="tab2" title="使用历史"/>
            </mu-tabs>
            <div class="tab-content" v-if="activeTab === 'tab1'">
                <!--基本信息-->
                <div class="line">设备名：<span class="bold">{{name}}</span></div>
                <div class="line">设备号：<span class="bold">{{device_id}}</span></div>
                <div class="line">密码：<span class="bold">{{password}}</span></div>
                <div class="line">mac：<span class="bold">{{mac}}</span></div>
                <div class="line">ticket：<span class="bold">{{ticket}}</span></div>
                <div class="line">录入时间：<span class="bold">{{device_created_at}}</span></div>
                <div class="line"><span class="bold">---------------------------------------</span></div>
                <div class="line">绑定商户：<span class="bold">{{merchant_real_name}}</span></div>
                <div class="line">商户手机：<span class="bold">{{merchant_phone}}</span></div>
                <div class="line">绑定时间：<span class="bold">{{device_binding_time}}</span></div>
                <div class="line">商户余额：<span class="bold">{{merchant_balance}}</span></div>
                <div class="line">渠道：<span class="bold">{{device_admin}}</span></div>
                <div class="line">省：<span class="bold">{{device_province_name}}</span></div>
                <div class="line">市：<span class="bold">{{device_city_name}}</span></div>
                <div class="line">区：<span class="bold">{{device_county_name}}</span></div>
                <div class="line">地址：<span class="bold">{{device_addr}}</span></div>
            </div>
            <div class="tab-content" v-show="activeTab === 'tab2'">
                <div>
                    <vuetable ref="vuetable_using_history"
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

        </div>
    </div>
</template>

<script>
    import panel from '../../components/panel.vue'
    import {api_searchDevice,api_deviceUsingHistory} from '../../api.js'

    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

    import mixins from '../../mixins.js'
    export default {
        mixins:[mixins],
        data () {
            return {
                api_url:'aaa',
                activeTab: 'tab1',
                search_value:'',
                device_info:null,
                device_id:'',
                ticket:'',
                password:'',
                name:'',
                mac:'',
                device_city_name:'',
                device_province_name:'',
                device_county_name:'',
                device_addr:'',
                device_created_at:'',
                device_binding_time:'',
                device_admin:'',
                merchant_balance:'',
                merchant_real_name:'',
                merchant_phone:'',

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
                    name: 'user_id',
                    dataClass: 'center aligned',
                    titleClass: 'center aligned',
                    title: '用户',
                },{
                    name: 'device_id',
                    dataClass: 'center aligned',
                    titleClass: 'center aligned',
                    title: '设备id',
                }
                ]
            }
        },
        beforeRouteEnter(to ,from ,next){
            console.log('device/detail beforeRouteEnter')
            next(vm => {
                console.log('device/detail ',vm.$route.params)
                if (!vm.$route.params.device_id)//通过跳转进入
                    return;
                vm.search_value=vm.$route.params.device_id
                vm.search()
            })
        },

        mounted () {

        },

        methods: {
            changeUrl () {
                console.log('changeUrl b4',this.api_url);
                this.api_url=this.appendAccessToken((api_deviceUsingHistory+'?device_id='+this.device_info.device_id))
                console.log('changeUrl after',this.api_url);
                this.$nextTick(()=>{
                    this.$refs.vuetable_using_history && this.$refs.vuetable_using_history.refresh()
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

            handleTabChange (val) {
                this.activeTab = val
            },

            search(){
                if (!this.search_value.length)
                    return Toast.error('设备号/MAC不能为空')
                myajax.cpost(api_searchDevice,{
                    search_value:this.search_value
                },(data)=>{
                    if (data && data.code!==0)
                        return Toast.error(data.msg||'请求失败')
                    this.device_info=data.data
                    this.device_id=data.data.device_id
                    this.device_created_at=data.data.created_at
                    this.device_binding_time=data.data.binding_time
                    this.device_admin=data.data.admin?data.data.admin.name:''
                    if (data.data.merchant){
                        this.merchant_balance=data.data.merchant.balance
                        this.merchant_real_name=data.data.merchant.real_name
                        this.merchant_phone=data.data.merchant.phone
                        this.merchant_openid=data.data.merchant.openid
                    }else{
                        this.merchant_balance=''
                        this.merchant_real_name=''
                        this.merchant_phone=''
                        this.merchant_openid=''
                    }

                    this.device_city_name=data.data.city?data.data.city.name:''
                    this.device_province_name=data.data.province?data.data.province.name:''
                    this.device_county_name=data.data.county?data.data.county.name:''
                    this.device_addr=data.data.addr
                    this.password=data.data.password
                    this.mac=data.data.mac
                    this.ticket=data.data.ticket
                    this.name=data.data.name
                    Toast.info('搜索完成')
                    this.changeUrl ()

//                    {"code":0,"msg":"","data":{"id":3,"device_id":"20170308001","created_at":"2017-03-09 16:14:15",
// "merchant_id":5,"binding_time":"2017-03-09 16:14:15","province":{"id":110000,"name":"北京市","parent_id":0,"sort":1},
// "city":{"id":110100,"name":"北京市","parent_id":110000,"sort":1},"county":{"id":110101,"name":"东城区","parent_id":110100,"sort":1},
// "addr":"平湖街道","admin_id":1,"password":"123456","reference":null,"name":"20170308001","updated_at":"2017-03-09 16:14:15",
// "mac":null,"ticket":null,"admin":{"id":1,"name":"admin","admin_role_type":1},
// "merchant":{"id":5,"real_name":"黄XX","phone":"13714876874","openid":"oZA4hv-IWpNrT4spdyOKZdr_pjhM","balance":"12.00"}}}
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
