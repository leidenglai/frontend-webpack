/**
 * zhdemo
 */
// 加载此模块的CSS
import 'bootstrap-fileinput/css/fileinput'
import 'bootstrap-fileinput/css/fileinput'
import 'css/index'
import 'libs/jquery.qeditor/jquery.qeditor.css'

import 'libs/jquery-easyui/plugins/jquery.datagrid'
import 'libs/jquery.qeditor/jquery.qeditor.js'

// 顶部导航
import TopMenu from 'components/index/topMenu'

import Main from 'containers/main'

/**
 * 主页模块类
 *
 * @param {Object} appViewDom 容器内此模块的顶级 jQeury节点对象
 * @param {Object} queryData url中的参数
 */
class IndexClass extends Main {
  // 初始化操作
  constructor(appViewDom, queryData) {
    //继承公共方法
    super()

    // 设置网页的title
    this.setTitle('首页')

    // 将dom缓存到对象中 减少jQuery的实例
    this.appViewDom = appViewDom // id为对应模板的ID

    this.oHeight = $(window).height()
    this._w = $(window).width()
    this._h = $(window).height()

    this.init()

    // 绑定事件 统一放在此方法内
    this.bindEvent()

    // 加载顶部导航
    new TopMenu()
  }

  init() {
    const that = this

    $('#treeDemo1').css({
      height: that.oHeight - 530 + 'px',
      overflow: 'auto'
    })
    $(document).resize(function() {
      $('.window-shadow').hide()

      that.oHeight = $(window).height()
      $('#left_menu2')
        .parent()
        .css({
          top: that.oHeight - 240 + 'px'
        })
      $('#treeDemo1').css({
        height: that.oHeight - 530 + 'px',
        overflow: 'auto'
      })
    })

    $(document).resize(function() {
      that._w = $(window).width()
    })

    var wid = $(window).width()
    var wid1 = wid - 670
    $('#left_menu_ch').css({
      height: oHeight - 110 + 'px',
      width: wid1 + 'px'
    })
    $('#left_menu_ch_img').css({
      height: oHeight - 280 + 'px'
    })
    $(document).resize(function() {
      wid = $(window).width()
      wid1 = wid - 705
      $('#left_menu_ch').css({
        height: oHeight - 115 + 'px',
        width: wid1 + 'px'
      })
      $('#left_menu_ch')
        .parent()
        .css({
          height: oHeight - 80 + 'px',
          width: wid1 + 20 + 'px'
        })
      $('#left_menu_ch')
        .parent()
        .find('.panel-header')
        .css({
          width: '100%'
        })
      $('#left_menu_ch_img').css({
        height: oHeight - 280 + 'px'
      })
    })

    var oHeight = $(window).height()
    var oWidth2 = $(window).width()
    $('#right_menu').css({
      height: oHeight - 130 + 'px'
    })
    $('#oList_list').css({
      height: oHeight - 280 + 'px'
    })
    $(document).resize(function() {
      oHeight = $(window).height()
      oWidth2 = $(window).width()
      $('#right_menu').css({
        height: oHeight - 130 + 'px'
      })
      $('#right_menu')
        .parent('.panel')
        .css({
          left: oWidth2 - 285 + 'px'
        })
      $('#oList_list').css({
        height: oHeight - 280 + 'px'
      })
    })

    var oHeight = $(window).height()
    var oWidth = $(window).width()
    $('#index_right_menu_detail').css({
      height: oHeight - 110 + 'px',
      width: oWidth - 420 + 'px'
    })
    $('#index_right_menu_detail')
      .find('.detail_content_right')
      .css({
        width: oWidth - 610 + 'px'
      })
    $('#index_right_menu_detail')
      .find('.detail_content_right')
      .css({
        height: oHeight - 275 + 'px'
      })

    $('#left_menu2').window({
      title: '图层',
      inline: true,
      left: 90,
      top: that.h1 + 130,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      shadow: true,
      modal: false,
      onClose: function() {
        $('.attr_btn').css('background-color', '#01b0dc')
        $('.attr_btn').attr('isopen', '0')
      }
    })
    $('#left_menu_ch').window({
      title: '弹出框名称',
      inline: true,
      left: 380,
      top: 80,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      shadow: true,
      modal: false
    })

    $('#right_menu').window({
      title: '属性',
      inline: true,
      left: this._w - 292,
      top: 80,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      shadow: false,
      modal: false
    })
  }

  refresh() {
    // 第二次之后进入此页面会默认调用此方法
    // ..
  }

  bindEvent() {
    const that = this

    // test storage
    this.appViewDom.find('.storeage-btn').on('click', function() {
      localStorage.setItem('TestData', JSON.stringify({aa: 'bb'}))
    })
  }

  ziduanControl() {
    var ziduan = document.getElementById('ziduan')
    var z_a = document.getElementById('ziduan_a')
    ziduan.onmouseover = function() {
      var over = ziduan.style.overflow
      ziduan.style.overflow = 'visible'
      z_a.style.color = '#fff'
    }
    ziduan.onmouseleave = function() {
      var over = ziduan.style.overflow
      ziduan.style.overflow = 'hidden'
      z_a.style.color = '#000'
    }
  }

  //退出执行 析构函数
  destructor() {
    //解除绑定
    // this.appViewDom.off('submit', '#loginForm')
  }
}
export default IndexClass
