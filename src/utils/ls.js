
 const ls={}
/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
ls.val = function (key, value) {
    if (!window.localStorage) return ;
    if (arguments.length == 1) 
        return localStorage.getItem(key)
    else 
        return localStorage.setItem(key, value)
}
ls.jsonVal = function (key, value) {
    if (!window.localStorage) return ;
    if (arguments.length == 1) 
        return window.JSON?JSON.parse(localStorage.getItem(key)):localStorage.getItem(key)
    else 
        return window.JSON?localStorage.setItem(key, JSON.stringify(value)):localStorage.setItem(key, value)
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
ls.remove = function (key) {
    if (!window.localStorage) return ;
    if (key) 
        return localStorage.removeItem(key)
    return localStorage.removeItem()
}

export default ls