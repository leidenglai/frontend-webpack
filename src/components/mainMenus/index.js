import 'css/components/mainMenus'
import 'css/guojia/select_gj'
import 'components/guojia/select_gj.min.js'

import {hendleCountrySelect} from 'components/guojia/select2_1.js'
import MainMenusTpl from 'tpl/components/mainMenus.tpl.html'

/**
 * 系统的主导航
 * 调用：
 * new MainMenus()
 *
 * @param  {Object} options  各种参数
 */
export default class MainMenus {
  constructor(options = {}) {
    this.hideModule = ['login'] // 需要隐藏菜单的模块

    // 对页面加载模板等
    this.mainMenusDom = $('#mainMenus')
    this.mainMenusDom.append(MainMenusTpl())

    this.init()

    this.initCeLiang()
    this.searchWindow()

    this.oHeight = $(window).height()
    // 控制显隐
    this.handleShow(location.pathname)
  }

  init() {
    const that = this
    // 初始化国家下拉框
    hendleCountrySelect()

    // 初始化search_window
    $('#search_window').window({
      title: '综合查询',
      right: 100,
      top: 80,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      resizable: false,
      shadow: false,
      modal: false,
      onClose: function() {
        $('.tree_btn').attr('isopen', '0')
      }
    })

    $('#search_window').window('close')
  }

  handleShow(routerName) {
    // 初始化时 检查当前模块是否在hideModule中
    if (_.find(this.hideModule, name => ~routerName.indexOf(name))) {
      this.mainMenusDom.hide()
    } else {
      this.mainMenusDom.show()
    }
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

  bindEvent() {
    const that = this
    // 事件绑定等
  }

  initCeLiang() {
    $('#celiang').bind('click', function() {
      var isopen = $(this).attr('isopen')
      if (isopen === '0') {
        $('#box').animate(
          {
            top: '75px'
          },
          100,
          'linear'
        )
        $(this).css('color', '#01b0dc')
        $(this).attr('isopen', '1')
      }
      if (isopen === '1') {
        $('#box').animate(
          {
            top: '-60px'
          },
          100,
          'linear'
        )
        $(this).css('color', '#333')
        $(this).attr('isopen', '0')
      }
    })

    $('#mubiao').bind('click', function() {
      var isopen = $(this).attr('isopen')
      if (isopen === '0') {
        $(this).css('color', '#01b0dc')
        $(this).attr('isopen', '1')
      }
      if (isopen === '1') {
        $(this).css('color', '#333')
        $(this).attr('isopen', '0')
      }
    })
  }

  //打开关闭综合查询窗口
  searchWindow() {
    $('#searchBtn').bind('click', function() {
      var isopen = $(this).attr('isopen')
      if (isopen === '0') {
        $('#bg').css('z-index', 0)
        $(this).css('color', '#01b0dc')
        $(this).attr('isopen', '1')
        $('#search_window').window('open')
      }
      if (isopen === '1') {
        $('#bg').css('z-index', 1)
        $(this).css('color', '#333')
        $(this).attr('isopen', '0')
        $('#search_window').window('close')
      }
    })
    $('#closeSearchWindow').bind('click', function() {
      $('#searchBtn').css('color', '#333')
      $('#searchBtn').attr('isopen', '0')
      $('#search_window').window('close')
    })
  }

  destructor() {
    // 解绑事件
    // todo..
  }
}
