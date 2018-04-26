/**
 * 加载模块 主模块控制器实例化、缓存
 * 使用偏函数的方式给路由处理方法添加参数
 * @param  {String} moduleName 模块名
 * @param  {object} params     模块参数
 * @param  {object} Controller 模块控制器类
 * @param  {String} template   模板字符串
 *
 * @return {Function} 返回处理此路由的匿名方法
 */
export default function loadModule(moduleName, params) {
  return function(Controller, templateFun) {
    const selector = `#${moduleName}Content`
    if (!moduleInstanceStack[moduleName].instance) {
      // 装载主模板
      appView.append(templateFun(params))

      const nodes = appView.find(selector)

      moduleInstanceStack[moduleName] = {}

      Object.assign(moduleInstanceStack[moduleName], {
        moduleName: moduleName,
        instance: new Controller(nodes, params), //初始化
        queryData: params,
        show: true,
        selector,
        nodes
      })
    } else if (!_.isEqual(params, moduleInstanceStack[moduleName].queryData)) {
      // 已存在界面的模块，但是参数不一样，重新载入

      try {
        // 重载界面
        moduleInstanceStack[moduleName] && moduleInstanceStack[moduleName].instance.destructor()
      } catch (err) {
        /**
         * 将单词大写首字母
         * @param {String} str 转换的字符串
         * @return {String} 转换结果
         */
        function firstUpperCase(str) {
          return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
        }

        console.error(`模块 '${firstUpperCase(moduleName)}Class' 未定义 destructor 方法`)
      }

      // 替换原模板
      const selectorDom = appView.find(selector)
      if (selectorDom.length >= 1) {
        selectorDom.replaceWith(templateFun(params))
      } else {
        appView.append(templateFun(params))
      }

      // 重新缓存节点
      const jqNodes = appView.find(selector)

      Object.assign(moduleInstanceStack[moduleName], {
        moduleName: moduleName,
        instance: new Controller(jqNodes, params), //初始化
        queryData: params,
        show: true,
        selector,
        jqNodes
      })
    } else {
      // 设置title
      document.title = moduleInstanceStack[moduleName].titleContent || ''

      // 刷新界面
      moduleInstanceStack[moduleName] &&
        moduleInstanceStack[moduleName].instance.refresh &&
        moduleInstanceStack[moduleName].instance.refresh()
    }

    appView.find(moduleInstanceStack[moduleName].selector).attr('style', 'display:block')
  }
}
