// 应用级的状态集中放在 store 中。

// 改变状态的唯一方式是提交mutations，这是个同步的事务。

// 异步逻辑应该封装在action 中。
//观察者分发事件给订阅者
import * as types from './mutation-types'
import ls from '../utils/ls.js'
import ss from '../utils/ss.js'
// import sha1 from 'sha1'
import {lskey_username,lskey_password,lskey_user} from '../persistent.js'

import {api_login,api_register} from '../api.js'

export const setUserLogin = ({ commit },user) => {
  commit(types.SET_USER_LOGIN, user)
}

export const setUserLogout = ({ commit },user) => {
  commit(types.SET_USER_LOGOUT, user)
}

// export const actionAddSingleDevice=({commit},obj)=>{
//
// }



   /**
   * 用户登录
   * @author bajian
   * @param  
   * @return 
   */
   export const actionLogin=({commit},obj)=>{
    console.log('actionLogin',obj.name,obj.password);
    const name=obj.name
    let password=obj.password
    const autoLogin=obj.autoLogin
    // if (!name || name.length!==11)
    //   return !autoLogin && bridge.toast('手机号不是11位')
    if (password===undefined || !password|| !name)
      return !autoLogin && Toast.warn('账号/密码为空')
    myajax.cpost(api_login,{
      name:name,
      password:password
    },(data)=>{
      if (data && data.code!=0)
        return Toast.error(data.msg||'登录失败')
      var user=data.data
      commit(types.SET_USER_LOGIN, user)
        myajax.param_token=user.access_token
      router.push(window.redirect||'/')
      ls.val(lskey_username,name)
      // ls.val(lskey_password,password)
      ls.jsonVal(lskey_user,user)
      delete window.redirect
      delete window.notAutoLogin
    })
  }

  export const actionRegister=({commit})=>{
    console.log('actionRegister',registerInfo);
    if (registerInfo.password.length!=40) 
      registerInfo.password=sha1(registerInfo.password)
    myajax.cpost(api_register,registerInfo,(data)=>{
      if (data && data.errcode!=0) 
        return bridge.toast(data.errmsg)

      ls.val(lskey_username,registerInfo.username)
      ls.val(lskey_password,'')
      window.notAutoLogin=1
      router.replace('/login')
      delete window.registerInfo
      setTimeout(()=>{
        bridge.invoke('clearWebviewHistory')
      }, 10);
    })
  }

// let recursionArr=[];//递归后的数组
// let originalArr=[];//未递归数组
// //递归整理父子栏目的关系
// const recursion=(pId)=>{
//   originalArr.forEach(item=>{
//     if (item.pId==pId && pId==0) {
//       item['children']=[];
//       recursionArr.push(item)
//       recursion(item.id)
//     }else if(item.pId==pId){
//       if (!recursionArr[recursionArr.length-1]['children'])
//         recursionArr[recursionArr.length-1]['children']=[]
//       recursionArr[recursionArr.length-1].children.push(item)
//       recursion(item.id)
//     }
//   })
// }

// export const fetchLists = ({ commit }) => {
//   console.log('fetchLists');
//   let items=ls.jsonVal(lskey_item)
//   if (items) 
//     commit(types.SET_ITEM_ARR, items)

//   myajax.get(api_item,{},(data)=>{
//     if (data.errno===0) {
//       originalArr=data.data
//       recursion(0)
//       commit(types.SET_ITEM_ARR, recursionArr)
//       ls.jsonVal(lskey_item,recursionArr)
//     }
//   })
// }

// export const fetchArticleById = ({ commit },id) => {
//   console.log('fetchArticleById'+id);

//   myajax.get(api_idarticle,{id:id},(data)=>{
//     if (data.errno===0 && data.data.length) {
//       commit(types.SET_CURRENT_ARTICLE, data.data[0])
//       ls.jsonVal(lskey_curr_article,data.data[0])
//     }
//   })
// }



