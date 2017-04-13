// https://github.com/shelljs/shelljs

var shell = require('shelljs')
var config_from_file_name='config.dev.js'
var config_to_file_name='config.js'
var change=function (isPro) {
    if (isPro){
        config_from_file_name='config.pro.js'
    }
    var path='src/config/'
    shell.cp( path+config_from_file_name, path+config_to_file_name)
    console.log('change config success',config_from_file_name)
}

module.exports=change
//usage: require('./change-config')()//dev
//usage: require('./change-config')(1)//pro