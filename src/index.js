// 加载公共css
import 'css/base.less'
import 'css/head.less'
//fontawesome
import 'libs/fontawesome/css/font-awesome.min.css'

// bootstrap
import 'bootstrap/less/bootstrap'

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-fileinput/js/fileinput'
import 'bootstrap-fileinput/js/locales/zh'

// 加载jquery插件
// esayUI
import 'libs/jquery-easyui/jquery.easyui.min.js'
import 'libs/jquery-easyui/locale/easyui-lang-zh_CN.js'
import 'libs/jquery-easyui/themes/bootstrap/easyui.css'
import 'libs/jquery-easyui/themes/bootstrap/datagrid.css'
import 'libs/jquery-easyui/themes/icon.css'

import 'libs/jquery.color.js'
import 'libs/jquery.ba-resize.min.js'

import {Router} from 'director/build/director' // 路由插件

import loadModule from 'utils/loadModule' // 模块加载的主要逻辑

import {DEF_REQUEST_CONFIG, checkLoginExclude} from 'src/config' // 项目配置文件
import routesMap from 'src/routes' // 路由配置
import checkLogin from 'utils/checkLogin' // 检查登录
import processUrl from 'utils/processUrl' // 解析url
import asynOnpopstate from 'utils/asynOnpopstate' // 兼容popstate

import aEventH5handler from 'utils/aEventH5handler' // 链接跳转处理

import MainMenus from 'components/mainMenus' // 主菜单

// 主容器 用于各个模块控制视图变化
window.appView = $('#container')

// 将主菜单的操作方法暴露到全局
window.mainMenusControl = new MainMenus()

// ================================= //
// 路由处理
window.moduleInstanceStack = {}
const regexpName = /\/(\w+)\/?/

/**
 * 路由的处理核心
 * 使用html5的history api实现路由
 *
 * 保存每一个已出现过的界面实例 同时页面dom保留
 * display的方式(更优的解决方案)
 * 保留每一个模块的dom 最简单的实现保存页面状态的功能
 *
 * @param  {function} router  每个页面的路由
 * @param  {string} key   模块名
 * @return {function}         路由处理的回调函数
 */
const routeHandler = (router, key) => (...query) => {
  // 格式请求参数 将query转为键值对
  const captures = key.match(/:([^\/]+)/gi)
  let length = 0,
    queryObj = {},
    capture = ''

  if (captures) {
    length = captures.length
    for (var i = 0; i < length; i++) {
      capture = captures[i]
      queryObj[capture.slice(1)] = query[i]
    }
  }

  // 将url中search字段解析到模板中 合并到模板参数中 此对象可在主模板中调用
  _.assign(queryObj, processUrl(location.href))

  // 提取模块名称
  const moduleName = regexpName.exec(key)[1]

  if (moduleInstanceStack[moduleName] === undefined) {
    moduleInstanceStack[moduleName] = {
      moduleName: moduleName,
      show: true
    }
  } else {
    moduleInstanceStack[moduleName].show = true
  }

  _.forEach(moduleInstanceStack, (item, name) => {
    if (moduleName === name) {
    } else {
      item.show = false
      appView.find(`.pageContainer#${moduleName}Content`).attr('style', 'display:none')
    }
  })

  // 检查模块是否需要登录
  if (!~checkLoginExclude.indexOf(moduleName)) {
    // 检查登录
    checkLogin().then(() => {
      // 路由插件加载模块
      router(loadModule(moduleName, queryObj))
    })
  } else {
    // 路由插件直接加载模块
    router(loadModule(moduleName, queryObj))
  }
}

const routes = _.mapValues(routesMap, routeHandler)

window.RouterController = new Router(routes).configure({
  html5history: true,
  notfound: () => {
    asynOnpopstate(() => {
      // 如果路由没匹配到 去到主页
      RouterController.setRoute('/index')
    })
  }
})

RouterController.init()
// ================================= //

// 监听使用了pushState的a标签跳转事件
$('body').on('click', 'a[push-state]', aEventH5handler)
