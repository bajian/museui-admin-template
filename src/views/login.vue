<template>
  <div class="login-body">

  <div>
  <label class="title">后台管理</label><br/>
    <mu-text-field label="用户名" v-model="account" labelFloat/><br/>
  <mu-text-field label="密码" hintText="请输入密码" v-model="pwd" type="password" labelFloat/><br/>
   <mu-raised-button @click="login()" label="登录" class="demo-raised-button" primary/>
  </div>

  </div>
</template>

<script>
  import ls from '../utils/ls.js'
  import {lskey_username,lskey_password} from '../persistent.js'

  export default {
   data(){
     return {
      account:'',
      pwd:'',
    }
  },  
  vuex: {
    getters: {
      // items:getItems/*树级栏目结构*/
    }
  },
  mounted(){

    this.$nextTick(function () {
      window.hasLoadedCenter=true
      const name=ls.val(lskey_username)
      if (config.notAutoLogin) {
        this.account=name||''
        return ;
      }
      const password=ls.val(lskey_password)
      if (password && name) {
        this.$store.dispatch('actionLogin',{
          name:name,
          password:password,
          autoLogin:true
        })
      }
    })
  },
  beforeRouteEnter(to ,from ,next){
    console.log('index beforeRouteEnter')
    next(vm => {
    // vm.loadSubItem(to,from)
  })
  },
  methods: {
    goTo(to,replace=false){
      if (replace) {
        this.$router.replace(to)
      }else{
        this.$router.push(to)
      }
    },
    login(){
//      this.$router.push('/')
        console.log('login',this.account,this.pwd)
       this.$store.dispatch('actionLogin',{
         name:this.account,
         password:this.pwd,
       })
    },

},
components: {
  // Slider,
}
}
</script>

<style scoped>
.list-item{
    cursor: pointer;
  }
.login-body{
  text-align: center;
  margin: 50px;
}

  .title{
    z-index: 1030;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
        font-size: 32px;
    margin-bottom: 50px;
  }


  input::-webkit-input-placeholder{
    color: #fff;
  }
</style>
