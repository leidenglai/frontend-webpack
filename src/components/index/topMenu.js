import 'css/index/topMenu'
import 'libs/ztree3/css/awesomeStyle/awesome'
import 'css/components/leftMenu'

import 'libs/ztree3/js/jquery.ztree.all.js'
import getElementFixed from 'utils/getElementFixed'

import topMenuTpl from 'tpl/index/topMenu.tpl.html'

import Main from 'containers/main'

/**
 * 主页顶部导航
 */
export default class TopMenu extends Main {
  constructor(options = {}) {
    super()

    // 对页面加载模板等
    this.topMenuDom = $('#indexTopMenu')
    this.topMenuDom.append(topMenuTpl())

    this.oHeight = $(window).height()

    // 获取按钮组的相对浏览器的绝对位置
    // 因为是inline的方式，所以window定位是相对于按钮组的，先算出按钮组位置 就可以定位window相对于浏览器位置的
    const {currentX, currentY} = getElementFixed(this.topMenuDom.find('.index-top-btn-group')[0])
    this.currentX = currentX
    this.currentY = currentY

    this.init()

    this.initIndexTree()
    this.initIndexCreate()
    // 其他的类似就不写了

    this.bindEvent()
  }

  init() {}

  initIndexTree() {
    const that = this

    // 初始化树宽高
    this.topMenuDom.find('#indexLeftMenu').css({
      height: this.oHeight - 370 + 'px',
      minWidth: '280px'
    })

    this.topMenuDom.find('#indexLeftMenu').window({
      title: 'XX树',
      inline: true,
      left: -that.currentX + 90,
      top: -that.currentY + 100,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      shadow: true,
      modal: false,
      onClose: function() {
        that.topMenuDom.find('#indexTreeBtn').removeClass('isopen')
      }
    })
  }

  initIndexCreate() {
    const that = this

    // 初始化树宽高
    this.topMenuDom.find('#indexCreate').css({
      height: '500px',
      width: '1000px'
    })

    const left = this.positionCenterLeft(this.topMenuDom.find('#indexCreate'), that.currentX)

    this.topMenuDom.find('#indexCreate').window({
      title: '新增',
      inline: true,
      left: left,
      top: -that.currentY + 100,
      minimizable: false,
      maximizable: false,
      collapsible: false,
      shadow: true,
      modal: false,
      onClose: function() {
        that.topMenuDom.find('#indexCreateBtn').removeClass('isopen')
      }
    })
  }

  bindEvent() {
    const that = this

    // 制图 页面跳转
    this.topMenuDom.find('#indexMappingBtn').on('click', function() {
      that.goModule('zhitu')
    })

    // 配准 页面跳转
    this.topMenuDom.find('#indexMatchBtn').on('click', function() {
      that.goModule('peizhun')
    })

    // 左边树
    this.topMenuDom.find('#indexTreeBtn').on('click', function() {
      var isopen = $(this).hasClass('isopen')

      if (!isopen) {
        that.topMenuDom.find('#indexLeftMenu').window('open')
        $(this).addClass('isopen')
      } else {
        that.topMenuDom.find('#indexLeftMenu').window('close')
        $(this).removeClass('isopen')
      }
    })

    // 中间新增
    this.topMenuDom.find('#indexCreateBtn').on('click', function() {
      var isopen = $(this).hasClass('isopen')

      if (!isopen) {
        that.topMenuDom.find('#indexCreate').window('open')
        $(this).addClass('isopen')
      } else {
        that.topMenuDom.find('#indexCreate').window('close')
        $(this).removeClass('isopen')
      }
    })

    // 量测
    this.topMenuDom.find('#indexMeasureBtn').bind('click', function() {
      var isopen = $(this).hasClass('isopen')

      if (!isopen) {
        // 用css3动画代替jquery动画
        that.topMenuDom.find('#indexMeasureBox').addClass('box-open')
        $(this).addClass('isopen')
      } else {
        that.topMenuDom.find('#indexMeasureBox').removeClass('box-open')
        $(this).removeClass('isopen')
      }
    })
  }

  /**
   * 计算window居中时的left
   * @param {Object} element 窗口的jQuery节点
   * @param {Number} offset 偏移量
   *
   * @returns {Number} left
   */
  positionCenterLeft(element, offset) {
    const elWidth = element.width() // 目标元素的宽度
    const winWidth = window.innerWidth // 窗口宽度

    return winWidth / 2 - elWidth / 2 - offset
  }

  destructor() {
    // 解绑事件
    // todo..
  }
}
