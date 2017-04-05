<template>
  <div id="app">
    <mu-appbar :zDepth="0" :title="title" class="example-appbar" :class="{'nav-hide': !open}">
      <mu-icon-button @click="toggleNav" icon="menu" slot="left"/>
    </mu-appbar>
    <app-nav @iconitemclick="onIconItemClick" @change="handleMenuChange" @close="toggleNav" :open="open" :docked="docked" />
    <div class="example-content" :class="{'nav-hide':(!open)}">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AppNavDrawer from './components/AppNavDrawer'
import {router_title} from '../router'

export default {
  data () {
    const desktop = isDesktop()
    return {
      open: desktop,
      docked: desktop,
      desktop: desktop,
      title: ''
    }
  },
  mounted () {
    // console.log(router_title);
    this.routes = this.$router.options.routes
    this.setTitle()
    this.changeNav()
    this.handleResize = () => {
      this.changeNav()
    }
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('hashchange', () => {
      this.setTitle()
    })
  },
  methods: {
    toggleNav () {
      this.open = !this.open
    },
      onIconItemClick (item) {
        switch (item.value){
            case 'log_out':
                this.$store.dispatch('actionLogout')
                break;
        }
    },
    changeNav () {
      const desktop = isDesktop()
      this.docked = desktop
      if (desktop === this.desktop) return
      if (!desktop && this.desktop && this.open) {
        this.open = false
      }
      if (desktop && !this.desktop && !this.open) {
        this.open = true
      }
      this.desktop = desktop
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
    },
    setTitle () {
      let path = window.location.hash
      if (path && path.length > 1) 
        path = path.substring(1)
      console.log(path);
      this.title = router_title[path]  || ''
        if (!this.title){
          for (let i in router_title){
              if(i.length>2 && (new RegExp(i,'g')).test(path))
                  return this.title=router_title[i]
          }
        }
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    'app-nav': AppNavDrawer
  }
}

function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="less">
@import "../assets/styles/import.less";
.example-appbar{
  position: fixed;
  left: 256px;
  right: 0;
  top: 0;
  width: auto;
  transition: all .45s @easeOutFunction;
  &.nav-hide {
    left: 0;
  }
}

.example-content{
  padding-top: 56px;
  padding-left: 246px;
  transition: all .45s @easeOutFunction;
  &.nav-hide {
    padding-left: 0;
  }
}

.content-wrapper{
  padding: 18px 72px;
}

@media (min-width: 480px) {
  .example-content{
    padding-top: 64px;
  }
}

@media (max-width: 993px) {
  .example-appbar {
    left: 0;
  }
  .example-content{
    padding-left: 0;
  }
  .content-wrapper {
    padding: 24px 36px;
  }
}
</style>
