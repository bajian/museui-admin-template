let toast=window.alert
const bridge={}

//TODO document.addEventListener("WebViewJavascriptBridgeReady",function(){
// callback(WebViewJavascriptBridge)
// },false)
// android bridge：

//同步函数名
//AppExist 退出app
//clearWebviewHistory 清空浏览器history
//headImgAndCrop 获取头像url
     /**
     * common sync invoke android native func
     * @author bajian
     * @param  param 统一规定为json字符串通信
     * @return 
     */
bridge.invoke=(funcName,param='')=>{
    try{
       param && window.jsBridge[funcName](param)
       param || window.jsBridge[funcName]() 
     }catch(e){
       console.error(e)
     }
}

// 异步函数名
// getNativeContacts=(cb)
// headImgAndCrop=(cb)

     /**
     * common async invoke android native func
     * 原理参考至jsonp
     * @author bajian
     * @param  
     * @return 
     */
bridge.asyncInvoke=(funcName,cb,param)=>{
    try{
      const callbackName='ai_'+Math.round(Math.random()*100000000)
       param && window.jsBridge[funcName](callbackName,param)
       param || window.jsBridge[funcName](callbackName)
       window[callbackName]=(json)=>{
        cb(json)
        delete window[callbackName]
       }
     }catch(e){
       console.error(e)
     }
}


bridge.toast=(str)=>{
    try{
      toast=window.jsBridge.toast || window.alert
       window.jsBridge.toast(str)
     }catch(e){
      window.alert(str)
       console.error(e)
     }
 }

//js bridge
//
window.callByJava=function(){
  alert('im am called by android')
}
export default bridge