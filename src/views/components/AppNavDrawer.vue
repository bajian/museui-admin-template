<template>
<mu-drawer @hide="handleHide" @close="handleClose" :open="open" :docked="docked" class="app-drawer" :zDepth="1">
  <mu-appbar class="exmaples-nav-appbar" :zDepth="0">
  <mu-icon value="home" :size="32"/>
    <a class="exmaples-appbar-title" @click="handleMenuChange('#/')" href="#/" style="display:inline-block;">摇摇车</a>
    
  </mu-appbar>
  <mu-divider/>

  <mu-list @change="handleMenuChange" :value="menuVal">
    <mu-list-item title="用户管理" toggleNested>
      <mu-list-item value="#/user/list" slot="nested" title="列表"/>
      <!--<mu-list-item value="#/user/detail" slot="nested" title="详情"/>-->
    </mu-list-item>
    <mu-list-item title="设备管理" toggleNested>
      <mu-list-item slot="nested" value="#/device/list" title="列表"/>
      <mu-list-item slot="nested" value="#/device/detail" title="详情"/>
    </mu-list-item>
    <mu-list-item title="商户管理" toggleNested>
      <mu-list-item slot="nested" value="#/merchant/list" title="列表"/>
      <mu-list-item slot="nested" value="#/merchant/detail" title="详情"/>
    </mu-list-item>

  </mu-list>
  <mu-divider/>

</mu-drawer>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
    docked: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menuVal: '#/',
    }
  },
  computed: {

  },
  methods: {

    handleClose () {
      this.$emit('close')
    },
    handleMenuChange (val) {
      this.menuVal = val
      if (this.docked) {
        window.location.hash = this.menuVal
      } else {
        this.changeHref = true
      }
      this.$emit('change', val)
    },
    handleHide () {
      if (!this.changeHref) return
      window.location.hash = this.menuVal
      this.changeHref = false
    },

  },
  mounted () {
    
  }

}
</script>

<style lang="less">
@import "../../assets/styles/import.less";
.exmaples-drawer{
  box-shadow: none;
  border-right: 1px solid @borderColor;
}

.exmaples-nav-appbar.mu-appbar{
  background-color: @dialogBackgroundColor;
  color: @secondaryTextColor;
}
.exmaples-appbar-title{
  color: @secondaryTextColor;
}

.exmaples-version {
  margin-left: 10px;
  vertical-align: text-top;
}

.exmaples-nav-sub-header {
  padding-left: 34px;
}

.mu-version-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
}
.mu-version-text {
  font-size: 16px;
  margin-top: 8px;
  width: 60px;
}

.mu-lang-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 40px;
  font-size: 16px;
}

.mu-lang {
  color: inherit;
  margin-left: 2px;
  margin-right: 2px;
  &:last-child {
    margin-right: 0;
  }
  &:hover,
  &.active {
    color: @accentColor;
  }
}
</style>
