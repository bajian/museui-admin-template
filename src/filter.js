
/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return;
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {

        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}
/*
-1网络错误0未完成暂停1下载中2已完成
 */
export const calState = (state) => {
    let arr={
        '-1':'网络错误',
        '0':'已暂停',
        '1':'下载中',
        '2':'已完成',
    }

    return arr[state]||'错误状态';
}

export const calNum = (num) => {
    return num>10000?(num/10000).toFixed(1)+'万':num
}

/*
 byte
 */
export const bytesToSize = function(bytes) {
    if (!bytes) return '0B';

    var k = 1024,
    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
    let size=bytes / Math.pow(k, i);
    if (i<2) 
        size=Math.round(size)
    else
        size=size.toFixed(1)


    return  size+ sizes[i]; 
}

