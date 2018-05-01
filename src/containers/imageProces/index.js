import Main from 'containers/main'

/**
 * 图像处理模块类
 *
 * @param {Object} appViewDom 容器内此模块的顶级 jQeury节点对象
 * @param {Object} queryData url中的参数
 */
class ImageProcesClass extends Main {
  // 初始化操作
  constructor(appViewDom, queryData) {
    //继承公共方法
    super()

    // 设置网页的title
    this.setTitle('图像处理')

    // 将dom缓存到对象中 减少jQuery的实例
    this.appViewDom = appViewDom // id为对应模板的ID

    this.init()

    // 绑定事件 统一放在此方法内
    this.bindEvent()
  }

  init() {
    const that = this
  }

  refresh() {
    // 第二次之后进入此页面会默认调用此方法
    // ..
  }

  bindEvent() {
    const that = this
  }

  //退出执行 析构函数
  destructor() {
    //解除绑定
    // this.appViewDom.off('submit', '#loginForm')
  }
}
export default ImageProcesClass
