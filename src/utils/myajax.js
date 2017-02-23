     /**
     * 此库劲量少用es6语法，方便其他地方使用
     * @author bajian
     * @param  
     * @return 
     */

import request from 'superagent'
window.request=request
const myajax = {}

myajax.prefix='';//前缀，如域名等
myajax.timeout=6e4
myajax.defaultFailCallback=function(){};
myajax.defaultMiddleware=function(){};

/**
 * get 请求获取数据
 * 
 * @param {String} url 请求的地址,可相对路径,带上http前缀的不加prefix
 * @param Object {A:B} 或者 String：A=1&N=SSS
 * @param {Function} [success=() => { }] 请求成功执行回调
 * @param {Function} [error=defaultFailCallback] 请求失败执行回调
 * @param {Function} [middleware=defaultMiddleware] 请求成功中间件，每次调用，默认全局中间件，可执行一些公用逻辑，如登录超时校验等
 * @param {String} [type='json'] 返回值类型
 */
 myajax.get = (url,params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
    url=url.indexOf('http')===0?url:myajax.prefix + url;
    request('GET', url).query(params).timeout(myajax.timeout).end((err, res = {}) => {
        if (err) 
            error(err)
        else{
            middleware(res.body||res.text)
            success&&success(res.body||res.text)
        }
    })
}

     /**
     * 带cookie 跨域
     * @author bajian
     * @param  
     * @return 
     */
     myajax.cget = (url,params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
        url=url.indexOf('http')===0?url:myajax.prefix + url;
        request('GET', url).withCredentials().query(params).timeout(myajax.timeout).end((err, res = {}) => {
            if (err) 
                error(err)
            else{
                middleware(res.body||res.text)
                success&&success(res.body||res.text)
            }
        })
    }

     /**
     * 带cookie 跨域
     * @author bajian
     * @param  
     * @return 
     */
     myajax.cpost = (url, params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
        url=url.indexOf('http')===0?url:myajax.prefix + url;
        params=typeof params =='object'?toQueryString(params):params
    //.type(type)千万别加这个了，，不然会改变content-type类型，导致跨域是非简单请求，需要options
    request('POST', url).withCredentials().send(params).timeout(myajax.timeout).end((err, res = {}) => {
        if (err) 
            error(err)
        else{
            middleware(res.body||res.text)
            success&&success(res.body||res.text)
        }
    })
}

myajax.post = (url, params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
    url=url.indexOf('http')===0?url:myajax.prefix + url;
    params=typeof params =='object'?toQueryString(params):params
    request('POST', url).send(params).timeout(myajax.timeout).end((err, res = {}) => {
        if (err) 
            error(err)
        else{
            middleware(res.body||res.text)
            success&&success(res.body||res.text)
        }
    })
}

     /**
     * arr['fff']=f.files[0]
     * myajax.file('http://www.bajian2.com/api/v1/t',arr)
     * @author bajian
     * @param 非空  params [name=>file,name2=>file2] 如 params['photo']=f.files[0]
     * @return 
     */
     myajax.file = (url, params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
        url=url.indexOf('http')===0?url:myajax.prefix + url;
        let formData = new FormData();
        for(var i in params){
            formData.append(i, params[i]);
        }
        request('POST', url).send(formData).timeout(myajax.timeout).end((err, res = {}) => {
            if (err) 
                error(err)
            else{
                middleware(res.body||res.text)
                success&&success(res.body||res.text)
            }
        })
    }


     /**
     * 
     * @author bajian
     * @param 非空  params [name=>file,name2=>file2] 如 params['photo']=f.files[0]
     * @return 
     */
     myajax.cfile = (url, params = {},success, error = myajax.defaultFailCallback,middleware=myajax.defaultMiddleware,type='json') => {
        url=url.indexOf('http')===0?url:myajax.prefix + url;
        let formData = new FormData();
        for(var i in params){
            formData.append(i, params[i]);
        }
        request('POST', url).withCredentials().send(formData).timeout(myajax.timeout).end((err, res = {}) => {
            if (err) 
                error(err)
            else{
                middleware(res.body||res.text)
                success&&success(res.body||res.text)
            }
        })
    }

    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    export default myajax