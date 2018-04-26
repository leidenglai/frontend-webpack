import requestData from 'utils/ajaxLoad'

/**
 * 对应后端涉及到用户的 API
 */
class UserService {
  /**
   * 登录
   * @param {Object} params {name: 账号, password: 密码}
   */
  userLogin(params) {
    // return requestData('/api/user/login', params)

    // 模拟请求成功
    return Promise.resolve('1233665')
  }
}

// 实例化后再导出
export default new UserService()
