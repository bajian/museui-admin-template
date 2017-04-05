// 约定：转发的api不带http前缀
import config from './config'
const API_HOST=config.API_HOST
// 登录
export const  api_login="/api/v1/admin/login"
export const  api_logout="/api/v1/admin/logout"

export const  api_userList=API_HOST+"/api/v1/admin/user/list"
export const  api_deviceList=API_HOST+"/api/v1/admin/device/list"
export const  api_exportDevice=API_HOST+"/api/v1/admin/device/export"
export const  api_merchantList=API_HOST+"/api/v1/admin/merchant/list"
export const  api_merchantChargeHistory=API_HOST+"/api/v1/admin/merchant/charge/history"
export const  api_userChargeHistory=API_HOST+"/api/v1/admin/user/charge/history"
export const  api_merchantDeviceList=API_HOST+"/api/v1/admin/merchant/device/list"
export const  api_deviceUsingHistory=API_HOST+"/api/v1/admin/device/using/history"

export const  url_tp_multi_add_xls=API_HOST+"/tp/批量导入设备模版.xlsx"

export const  api_addSingleDevice="/api/v1/admin/device/add"
export const  api_editSingleDevice="/api/v1/admin/device/edit"
export const  api_deleteDevice="/api/v1/admin/device/delete"
export const  api_uploadMultiDeviceFile="/api/v1/admin/device/file/multi_device"
export const  api_searchMerchant="/api/v1/admin/merchant/search"
export const  api_searchDevice="/api/v1/admin/device/search"
export const  api_userDetail="/api/v1/admin/user/detail"

export const  api_register="n/api/v1/user/register"




