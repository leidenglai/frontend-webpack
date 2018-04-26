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
    // 对页面加载模板等
    this.mainMenusDom = $('#mainMenus')

    this.mainMenusDom.append(MainMenusTpl())

    this.init()

    this.initCeLiang()
    this.searchWindow()

    this.oHeight = $(window).height()

    this.searchWindow = ''
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
