/**
 * 登录页demo
 */
// 加载此模块的CSS
import 'css/login.css'

import Main from 'containers/main'
import UserService from 'services/userService'
import {setCookie} from 'utils/cookie'

class LoginClass extends Main {
  // 初始化操作
  constructor(appViewDom, queryData) {
    //继承公共方法
    super()

    // 设置网页的title
    this.setTitle('登录')

    // 将dom缓存到对象中 减少jQuery的实例化
    this.appViewDom = appViewDom

    this.appViewDom.find('#txtName').focus()

    // 绑定事件 统一放在此方法内
    this.bindEvent()
  }

  refresh() {
    // 第二次之后进入此页面会默认调用此方法
    // ..
  }

  bindEvent() {
    const that = this

    // 提交登录
    this.appViewDom.on('submit', '#loginForm', function(e) {
      e.preventDefault()
      e.stopPropagation()

      // 获取表单数据
      var formData = $(this).serializeArray()

      // 请求后端数据
      UserService.userLogin(formData).then(data => {
        console.log('登录成功')
        // 登录成功
        if (null != data) {
          setCookie('uid', data)

          // 跳转回去
          if (document.referrer && window.location.href != document.referrer) {
            window.location.href = document.referrer
          } else {
            window.location.href = '/index'
          }
        }
      })
    })
  }

  //退出执行 析构函数
  destructor() {
    //解除绑定
    this.appViewDom.off('submit', '#loginForm')

    // 模板置空
    // 因为此页面是一次性的 所以跳出后可以将dom删除 下次在进入可以重新实例化
    this.appViewDom.remove()
  }
}
export default LoginClass
