<template>
<div class="content-wrapper">
<div class="handle-block">
    <mu-raised-button @click="setArg('open_dialog_single_add',true)" label="单个添加" primary/>
    <mu-raised-button @click="setArg('open_dialog_multi_add',true)" label="批量添加" backgroundColor="#a4c639"/>
    <mu-raised-button @click="deleteSelected()" label="批量删除" backgroundColor="#a42339"/>
    <mu-raised-button @click="setArg('open_dialog_export',true)" label="导出设备" backgroundColor="#ff4449"/>
</div>
<div>
    <vuetable ref="vuetable"
              :api-url="api_url"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
              @vuetable:load-error="onLoadError"
              @vuetable:load-success="onLoadSuccess"
              @itemclick="onItemClick"
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

    <!--dialog-->
    <mu-dialog :open="open_dialog_single_add" title="添加单个设备 【包含授权和生成二维码，速度可能比较慢】" scrollable>
        <div>
            <mu-text-field v-model="device_id" label="设备号" labelFloat/><br/>
            <mu-text-field v-model="device_mac" label="设备MAC地址 16进制,12字节" labelFloat/><br/>
        </div>

        <mu-raised-button secondary label="关闭"  @click="setArg('open_dialog_single_add',false)" slot="actions"/>
        <mu-raised-button primary label="提交"  @click="addSingle()" slot="actions"/>
    </mu-dialog>

    <!--dialog-->
    <mu-dialog :open="open_dialog_single_edit" title="修改单个设备" scrollable>
        <div>
            <mu-text-field v-model="edit_device_id" label="设备号" labelFloat/><br/>
            <mu-text-field v-model="edit_device_mac" label="设备MAC地址 16进制,12字节" labelFloat/><br/>
            <mu-text-field v-model="edit_device_password" label="设备密码，留空表示不修改" labelFloat/><br/>
        </div>

        <mu-raised-button secondary label="关闭"  @click="setArg('open_dialog_single_edit',false)" slot="actions"/>
        <mu-raised-button primary label="提交"  @click="editSingle()" slot="actions"/>
    </mu-dialog>

    <!--dialog-->
    <mu-dialog :open="open_dialog_multi_add" title="添加批量设备 【包含授权和生成二维码，速度可能比较慢】" scrollable>
        <br/>
        <a target="_blank" :href="url_multi_add_tp">下载批量导入设备模版.xlsx</a>
        <div>
            <div @click="uploadClick()" class="file_upload_container">
                <mu-icon value="cloud_upload" color="orange"/><span class="file_upload_tip">{{file_tip}}</span>
                <input accept=".xlsx" @change="handleFiles($event)" id="input_upload" class="file_upload" type="file">
            </div>

        </div>
        <div  style="text-align: center" v-if="multi_posting"><mu-circular-progress :size="60" :strokeWidth="5"/></div>
        <br/>
        <br/>
        <span style="color: red">此接口规则相当复杂，为了方便修改错误后不需要删减，所以设计成重复提交设备不会更新mac和密码，只会更新ticket，旧ticket不会失效</span>
        <mu-raised-button secondary label="关闭"  @click="setArg('open_dialog_multi_add',false)" slot="actions"/>
        <mu-raised-button primary label="提交"  @click="addMulti()" slot="actions"/>
    </mu-dialog>

    <!--dialog-->
    <mu-dialog :open="open_dialog_export" title="导出设备 【一次最多导出1w个设备】" scrollable>
        <div>
            <mu-text-field v-model="id_from" label="起始导出序号" labelFloat/><br/>
            <mu-text-field v-model="id_to" label="结束导出序号" labelFloat/><br/>
        </div>
        <mu-raised-button secondary label="关闭"  @click="setArg('open_dialog_export',false)" slot="actions"/>
        <mu-raised-button primary label="提交"  @click="exportFile()" slot="actions"/>
    </mu-dialog>

</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import DeviceListCustomActions from '../components/DeviceListCustomActions.vue'
import Vue from 'vue'
Vue.component('custom-actions', DeviceListCustomActions)

import {api_deviceList,api_addSingleDevice,api_exportDevice,api_deleteDevice,url_tp_multi_add_xls,api_uploadMultiDeviceFile,api_editSingleDevice} from '../../api.js'
import mixins from '../../mixins.js'

export default {
    mixins:[mixins],
  data () {
    return {
      title: '',
      file_tip: '上传xlsx文件',
        device_id: '',
        current_edit_id: 0,
        edit_device_id: '',
        edit_device_mac: '',
        edit_device_password: '',
        url_multi_add_tp: '',
        id_from: 1,
        id_to: 10000,
        device_mac: '',
        open_dialog_single_add: false,
        open_dialog_single_edit: false,
        open_dialog_multi_add: false,
        open_dialog_export: false,
        multi_posting: false,
      api_url: 'aaa',
//      api_url: 'http://swingcar.com/api/v1/admin/user/list',
      fields: [{
          name: '__checkbox',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
      },
          'id',
          {
          name: 'device_id',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '设备号',
      },
          {
          name: 'password',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '密码',
      },          {
          name: 'merchant',
          dataClass: 'center aligned',
          titleClass: 'center aligned',
          title: '商户',
          callback: 'merchantCB'
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
              name:'province.name',
              title: '省',
          },{
          name:'city.name',
              title: '市',
          },  {
          name:'county.name',
              title: '区',
          },'ticket',{
              name: '__component:custom-actions',
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
      this.url_multi_add_tp=url_tp_multi_add_xls
  },
  methods: {
      onItemClick (opt) {
          console.log('onItemClick',JSON.stringify(opt))
          switch (opt.action){
              case 'view-item':
                  this.goTo('/device/detail/'+opt.data.device_id)
                  break;
              case 'edit-item':
                  this.current_edit_id=opt.data.id
                  this.edit_device_id=opt.data.device_id
                  this.edit_device_mac=opt.data.mac
                  this.edit_device_password=opt.data.password
                  this.open_dialog_single_edit=true;

                  break;
              case 'delete-item':
                      if (opt.data.id)
                          if(confirm('确定删除序号：'+opt.data.id))
                            this.deleteAjax([opt.data.id])
                  break;
          }
      },
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
      exportFile () {
          let url=this.appendAccessToken(api_exportDevice+'?from='+(this.id_from||0)+'&to='+(this.id_to||10000))

          if (window.open)
              window.open(url)
          else
              window.location.href=url
      },
      addMulti () {
          if (this.multi_posting)
              return alert('我处理的比较慢，不要重复提交了。。QAQ')
          let f=document.getElementById('input_upload')
        if (f.files && f.files.length){
              this.multi_posting=true
            myajax.cfile(api_uploadMultiDeviceFile,{
                'file':input_upload.files[0]
            },(data)=>{
                this.multi_posting=false
                if (data && data.code!==0)
                    return alert(data.msg||'请求失败')

                if (data.data.length)
                    return alert("出现以下问题:\n"+JSON.stringify(data.data))

                Toast.info('提交成功')
                this.setArg('open_dialog_multi_add',false)
                this.$nextTick(()=>{
                    this.$refs.vuetable && this.$refs.vuetable.refresh()
                })

            },(e)=>{
                this.multi_posting=false
                return alert('请求失败，请稍后重试')
                console.error(e)
            })
//            api_uploadMultiDeviceFile
        }else{
            alert("请点击上面先上传文件")
        }
      },
      uploadClick() {
        console.log('upload_click..')
      },
      handleFiles(e) {
        console.log('handleFiles..',e)
          if(e.target.files && e.target.files.length){
            let file=e.target.files[0]
              this.file_tip=file.name
          }
      },

      deleteSelected () {
          let selectedArr=this.$refs.vuetable.selectedTo
          if (!selectedArr.length)
              return Toast.error('没选中任何行')
          if (window.confirm('确定删除序号：'+selectedArr)){
              this.deleteAjax (selectedArr)
          }
      },
      deleteAjax (selectedArr) {
              myajax.cpost(api_deleteDevice,{
                  ids:JSON.stringify(selectedArr)
              },(data)=>{
                  if (data && data.code!==0)
                      return Toast.error(data.msg||'请求失败')
                  Toast.info('提交成功')
                  this.$nextTick(()=>{
                      this.$refs.vuetable.reload()
                  })
              })
      },
      addSingle () {
          console.log('addSingle ',this.device_id,this.device_mac);
          if (this.device_id &&this.device_mac){
              myajax.cpost(api_addSingleDevice,{
                  device_id:this.device_id,
                  device_mac:this.device_mac,
              },(data)=>{
                  if (data && data.code!=0)
                      return alert(data.msg||'请求失败')
                  Toast.info('提交成功')
                  this.setArg('open_dialog_single_add',false)
                  this.$nextTick(()=>{
                      this.$refs.vuetable && this.$refs.vuetable.refresh()
                  })
              })

          }else{
              return alert('信息未填完整')
          }
      },
      editSingle () {
          console.log('editSingle ',this.edit_device_id,this.edit_device_mac);
          if (this.current_edit_id &&this.edit_device_id &&this.edit_device_mac){
              myajax.cpost(api_editSingleDevice,{
                  id:this.current_edit_id,
                  device_id:this.edit_device_id,
                  device_mac:this.edit_device_mac,
                  password:this.edit_device_password,
              },(data)=>{
                  if (data && data.code!=0)
                      return alert(data.msg||'请求失败')
                  Toast.info('提交成功')
                  this.current_edit_id=0
                  this.setArg('open_dialog_single_edit',false)
                  this.$nextTick(()=>{
                      this.$refs.vuetable && this.$refs.vuetable.refresh()
                  })
              })

          }else{
              return alert('信息未填完整')
          }
      },
      merchantCB(merchant){
          if (merchant && merchant['phone'])
              return '<a href="#/merchant/detail/'+merchant['phone']+'">'+(merchant['real_name']||merchant['phone'])+'</a>'
          return ''
      },


  },

  components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
  }
}


</script>

<style>
    .handle-block{
        margin-bottom: 10px;
    }

    .file_upload_container{
        margin: 24px;
        text-align: center;
        font-size: 20px;
    }

    .file_upload{
        width: 100%;
        position: absolute;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }

    .file_upload_tip{
        font-size: 20px;
        line-height: 20px;
        margin-left: 10px;
    }
</style>
