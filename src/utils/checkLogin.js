import {getCookie} from 'utils/cookie'

/**
 * 检查登录
 * @return {Promise}
 */
const checkLogin = function() {
  return new Promise(function(next) {
    // 检查cookie中的登录数据
    const isLogin = !_.isEmpty(getCookie('uid'))

    if (isLogin) {
      next()
    } else {
      // 未登录 转到登录页
      window.location.href = '/login'
    }
  })
}

export default checkLogin
