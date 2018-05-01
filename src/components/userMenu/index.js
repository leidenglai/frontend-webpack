import 'css/components/userMenu'

import userMenuTpl from 'tpl/components/userMenu.tpl.html'

/**
 * 主页顶部导航
 */
export default class UserMenu {
  constructor(options = {}) {
    this.showModule = ['index'] // 需要隐藏菜单的模块

    // 对页面加载模板等
    this.userMenuDom = $('#userMenuWrap')
    this.userMenuDom.append(userMenuTpl())
    // 控制显隐
    this.handleShow(location.pathname)

    this.init()
    this.bindEvent()
  }

  init() {
    const that = this
    //...
  }

  bindEvent() {
    // 绑定退出登录等等事件
  }

  /**
   * listenRoute 路由改变时的回调 路由变化时 会调用此方法
   * @param  {Array} route 路由包含的数据
   * @return undefind
   */
  listenRoute(route) {
    // route[0] 模块名称 其他是相应参数
    this.handleShow(route[0])
  }

  handleShow(routerName) {
    // 初始化时 检查当前模块是否在showModule中
    if (!_.find(this.showModule, name => ~routerName.indexOf(name))) {
      this.userMenuDom.hide()
    } else {
      this.userMenuDom.show()
    }
  }

  destructor() {
    // 解绑事件
    // todo..
  }
}
