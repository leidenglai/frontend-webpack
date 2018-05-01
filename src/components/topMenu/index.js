import 'css/components/topMenu'

import topMenuTpl from 'tpl/components/topMenu.tpl.html'

/**
 * 主页顶部导航
 */
export default class TopMenu {
  constructor(options = {}) {
    this.hideModule = ['login', 'index'] // 需要隐藏菜单的模块

    // 对页面加载模板等
    this.topMenuDom = $('#topMenuWrap')
    this.topMenuDom.append(topMenuTpl())
    // 控制显隐
    this.handleShow(location.pathname)

    this.init()
    this.user()
  }

  init() {
    const that = this
    //...
  }

  user() {
    const that = this
    that.topMenuDom.hover(
      function() {
        that.topMenuDom.stop()
        that.topMenuDom.find('.left_user').stop()
        that.topMenuDom.animate({
          width: '200px'
        })
        that.topMenuDom.find('.left_user').animate({
          left: '10px'
        })
      },
      function() {
        that.topMenuDom.stop()
        that.topMenuDom.find('.left_user').stop()
        that.topMenuDom.animate({
          width: '50px'
        })
        that.topMenuDom.find('.left_user').animate({
          left: '150px'
        })
      }
    )
  }

  bindEvent() {}

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
    // 初始化时 检查当前模块是否在hideModule中
    if (_.find(this.hideModule, name => ~routerName.indexOf(name))) {
      this.topMenuDom.hide()
    } else {
      this.topMenuDom.show()
    }
  }

  destructor() {
    // 解绑事件
    // todo..
  }
}
