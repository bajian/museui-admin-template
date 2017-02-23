//获取state的变量,不管多简单都要写成getter方法，而不是直接引用，方便项目后续统一改动！
 import ls from '../utils/ls.js'
//  import {lskey_item,lskey_item_idex,lskey_curr_article} from '../persistent.js'

// //所有栏目
// export function getItems (state) {
//   return state.items ||ls.jsonVal(lskey_item)||[]
// }

// //获取二级栏目
// export function getSubItemByPid (state,pId) {
// 	for (var len = state.items.length,i=0; i < len; i++) {
// 		if (items[i].id==pId) {
// 			return items[i].children
// 		}
// 	}
// 	return []
// }

// export function getCurrentSubItem(state) {
// 	return state.items[state.itemIndex]||[]
// }

// export function getCurrentArticle (state) {
// 	return state.currentArticle||ls.jsonVal(lskey_curr_article)
// }

// export function getItemIndex (state) {
// 	return state.itemIndex||ls.val(lskey_item_idex)
// }

// export function getUser (state,params) {
// 	console.log(arguments);
// 	return state.user
// }
