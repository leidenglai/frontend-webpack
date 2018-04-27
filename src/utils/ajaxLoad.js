import {API_URL, DEF_REQUEST_CONFIG, apiTimeout} from 'src/config'
import {deleteCookie} from 'utils/cookie'

/**
 * 获取数据
 * @function requestData
 *
 * @param  api {String} [必选] 接口名
 * @param  data {Object} [可选] [default: {}]往后端发送的数据对象
 * @param  options {Object} [可选] 请求参数
 * {
 *   type: 'get', // 请求类型
 *   timeout: 30000 // 请求超时时间 默认取配置文件
 * }
 *
 * @return requestData {Promise} Promise
 */
export default function requestData(api, data = {}, options = {}) {
  return new Promise(function(resolve, reject) {
    const requsetUrl = API_URL + api

    //合并默认参数
    const params = _.assign({}, DEF_REQUEST_CONFIG, data)

    // ajax 参数配置
    let ajaxConfig = {
      url: requsetUrl,
      type: options.type || 'post',
      data: params,
      timeout: options.timeout || apiTimeout,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: res => {
        //返回后端数据、 请求时的参数
        resolve(res)
      },
      error: (xhr, textStatus) => {
        if (textStatus == 'parsererror') {
          console.log('Server Error!')
        } else if (textStatus == 'timeout' || textStatus == 'abort') {
          //显示网络错误页面
          console.log('Timeout Error!')
        } else if (xhr.status === 401) {
          // 清除已登录标记 cookie
          deleteCookie('uid')

          reject({code: 401, msg: 'Token Error!'})
          window.location.href = '/login'
        } else {
          console.log('Internet Error!')
        }
        xhr = null
        return
      }
    }

    $.ajax(ajaxConfig)
  })
}
