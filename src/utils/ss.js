
 const ss={}
/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
ss.val = function (key, value) {
    if (!window.sessionStorage) return ;
    if (arguments.length == 1) 
        return sessionStorage.getItem(key)
    else 
        return sessionStorage.setItem(key, value)
}

ss.jsonVal = function (key, value) {
    if (!window.sessionStorage) return ;
    if (arguments.length == 1) 
        return window.JSON?JSON.parse(sessionStorage.getItem(key)):sessionStorage.getItem(key)
    else 
        return window.JSON?sessionStorage.setItem(key, JSON.stringify(value)):sessionStorage.setItem(key, value)
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
ss.remove = function (key) {
    if (!window.sessionStorage) return ;
    if (key) 
        return sessionStorage.removeItem(key)
    return sessionStorage.removeItem()
}

export default ss