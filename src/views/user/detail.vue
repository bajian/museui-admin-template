<template>
    <div class="content-wrapper">
<!--        <panel>
            <span slot="title">操作</span>
            <div @keyup.enter="search()" slot="content">
                <mu-text-field v-model="phone" label="输入手机号搜索" labelFloat/>
                &lt;!&ndash;<mu-raised-button @click="search()" label="搜索" primary/>&ndash;&gt;
            </div>
        </panel>-->
        <div class="merchant_tabs_container">
            <mu-tabs style="width: 35%;min-width: 200px;max-width: 600px;" :value="activeTab" @change="handleTabChange">
                <mu-tab value="tab1" title="用户信息"/>
                <mu-tab value="tab2" title="用户流水"/>
            </mu-tabs>
            <div class="tab-content" v-if="activeTab === 'tab1'">
                <!--基本信息-->
                <div class="line">昵称：<span class="bold">{{user_name}}</span></div>
                <div class="line">性别：<span class="bold">{{sex}}</span></div>
                <div class="line">openid：<span class="bold">{{user_openid}}</span></div>
                <!--<div class="line">phone：<span class="bold">{{phone}}</span></div>-->
                <div class="line">余额：<span class="bold">{{user_balance}}</span></div>
                <div class="line">微信关注：<span class="bold">{{user_wx_created_at}}</span></div>
                <div class="line">省：<span class="bold">{{user_province_name}}</span></div>
                <div class="line">市：<span class="bold">{{user_city_name}}</span></div>
                <!--<div class="line">区：<span class="bold">{{user_county_name}}</span></div>-->

            </div>
            <div class="tab-content" v-show="activeTab === 'tab2'">
                <div>
                    <vuetable ref="vuetable_charge_history"
                              :load-on-start="false"
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
//    import panel from '../../components/panel.vue'
    import {api_userDetail,api_userChargeHistory} from '../../api.js'

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
                phone:'',
                sex:'',
                user_info:null,
                user_name:'',
                user_openid:'',
                user_wx_created_at:'',
                user_balance:'',
                user_city_name:'',
                user_province_name:'',
                user_county_name:'',
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
                ],
            }
        },
        beforeRouteEnter(to ,from ,next){
            console.log('user/detail beforeRouteEnter')
            next(vm => {
//                vm.loadArticle()
                console.log('user/detail ',vm.$route.params)
                if (!vm.$route.params.id)
                    return Toast.error('参数不全')
                vm.loadAllInfo(vm.$route.params.id)
            })
        },
            methods: {
            loadAllInfo(user_id){
                this.loadUserDetail(user_id)
            },
            loadUserDetail(user_id){
                console.log('loadUserDetail')
                myajax.cpost(api_userDetail,{
                    user_id:user_id
                },(data)=>{
                    if (data && data.code!==0)
                        return Toast.error(data.msg||'请求失败')
//                    {"code":0,"msg":"","data":{"id":22,"openid":"oZ44hv-I0gg8878pdyss54111447z","nickname":"bajianx",
// "created_at":"2017-03-14 23:13:09","deleted_at":null,"balance":"0.00","subscribe":null,"headimgurl":"12314654654url",
// "city":"深圳市","province":"广东省","merchant_id":null,"updated_at":"2017-03-14 23:13:09","lat":null,"lng":null,"location_updated_at":null,"sex":1}}
                    this.user_info=data.data
                    this.user_name=data.data.nickname
                    this.sex=data.data.sex?'男':'女'
                    this.user_openid=data.data.openid
                    this.user_wx_created_at=data.data.created_at
                    this.user_balance=data.data.balance
                    this.user_city_name=data.data.city
                    this.user_province_name=data.data.province
                    this.changeUrl ()
                })
            },
            changeUrl () {
                console.log('changeUrl b4',this.api_url);
                this.api_url=this.appendAccessToken((api_userChargeHistory+'?user_id='+this.user_info.id))
                console.log('changeUrl after',this.api_url);
                this.$nextTick(()=>{
                    this.$refs.vuetable_charge_history && this.$refs.vuetable_charge_history.refresh()
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

        },

        components: {
//            panel,
            Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
        }
    }


</script>

<style lang="less">

</style>
