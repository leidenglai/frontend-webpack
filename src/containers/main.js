import routesMap from 'src/routes'

/**
 * 公共模块
 * 提供公共方法给其他控制器继承
 */
export default class Main {
  constructor() {
    this.pageData = {} //页面数据

    this.appViewDom = {} //缓存页面Dom
  }

  /**
   * 设置网页title
   * @param {String} title
   */
  setTitle(title) {
    document.title = title

    // 获取当前模块名
    const moduleName = RouterController.getRoute()[0]

    window.moduleInstanceStack[moduleName] &&
      (window.moduleInstanceStack[moduleName].titleContent = title)
  }

  /**
   * 页面跳转
   * @param  {String} moduleName [必选]  模块名
   * @param  {Object} query 跳转参数
   * @param  {enum} type 打开方式 'new'：打开新页面
   */
  goModule(moduleName, type = '', query = {}) {
    let url = moduleName

    //query参数有值，拼接在url后面
    if (!_.isEmpty(query)) {
      const queryString = _.map(query, (val, key) => `${key}=${encodeURIComponent(val)}`).join('&')
      url += '?' + queryString
    }
    if (type === 'new') {
      window.open(url)
    } else {
      // h5路由跳转
      RouterController.setRoute(url)
    }
  }
}
