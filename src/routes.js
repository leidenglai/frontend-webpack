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
  },

  // 配准
  '/peizhun': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/peizhun/index').default

      // 加载模板
      const template = require('tpl/peizhun/index.tpl.html')
      cb(Controller, template)
    })
  },

  // 制图
  '/zhitu': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/zhitu/index').default

      // 加载模板
      const template = require('tpl/zhitu/index.tpl.html')
      cb(Controller, template)
    })
  },

  // 数据管理
  '/dataManager': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/dataManager/index').default

      // 加载模板
      const template = require('tpl/dataManager/index.tpl.html')
      cb(Controller, template)
    })
  },

  // 图像处理
  '/imageProces': cb => {
    require.ensure([], require => {
      // 加载控制器
      const Controller = require('containers/imageProces/index').default

      // 加载模板
      const template = require('tpl/imageProces/index.tpl.html')
      cb(Controller, template)
    })
  }
}

export default routesMap
