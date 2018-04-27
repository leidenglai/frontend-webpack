const routesMap = {
  // 主页
  '/index': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/index/index').default

      // 加载模板
      const template = require('tpl/index/index.tpl.html')
      cb(Controller, template)
    })
  },

  '/login': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/login/index').default

      // 加载模板
      const template = require('tpl/login/index.tpl.html')
      cb(Controller, template)
    })
  },

  // 识别
  '/shibie': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/shibie/index').default

      // 加载模板
      const template = require('tpl/shibie/index.tpl.html')
      cb(Controller, template)
    })
  }
}

export default routesMap
