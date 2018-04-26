/**
 * 读取cookie
 * @param {String} name cookie_name
 */
export function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return decodeURI(arr[2])
  else return null
}

/**
 * 前端写入cookie
 * @param {String} name cookie_name
 * @param {String} value cookie_value
 */
export function setCookie(name, value) {
  var exp = new Date()
  exp.setTime(exp.getTime() + 60 * 60 * 1000)
  document.cookie = name + '=' + decodeURI(value) + ';expires=' + exp.toGMTString()
}

/**
 * 删除cookie
 * @param {String} name cookie_name
 */
export function deleteCookie(name) {
  setCookie(name, '', -1)
}
