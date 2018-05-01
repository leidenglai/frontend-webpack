import Main from 'containers/main'

import 'css/peizhun'

/**
 * 配准模块类
 *
 * @param {Object} appViewDom 容器内此模块的顶级 jQeury节点对象
 * @param {Object} queryData url中的参数
 */
class PeizhunClass extends Main {
  // 初始化操作
  constructor(appViewDom, queryData) {
    //继承公共方法
    super()

    // 设置网页的title
    this.setTitle('配准')

    // 将dom缓存到对象中 减少jQuery的实例
    this.appViewDom = appViewDom // id为对应模板的ID

    this.init()

    // 绑定事件 统一放在此方法内
    this.bindEvent()

    this.peizhunInitTable()
  }

  init() {
    const that = this
  }

  peizhunInitTable() {
    const that = this
    this.appViewDom.find('#p_datagrid').datagrid({
      height: 'auto',
      width: '100%',
      url: '',
      pagination: false,
      pageSize: 20,
      pageNumber: 1,
      rownumbers: false,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      columns: [
        [
          {
            field: 'type1',
            title: '控制点',
            width: 5,
            align: 'center'
          },
          {
            field: 'type2',
            title: '控制点',
            width: 5,
            align: 'center'
          },
          {
            field: 'type3',
            title: '控制点',
            width: 5,
            align: 'center'
          },
          {
            field: 'type4',
            title: '控制点',
            width: 5,
            align: 'center'
          },
          {
            field: 'type5',
            title: '控制点',
            width: 5,
            align: 'center'
          },
          {
            field: 'type6',
            title: '控制点',
            width: 5,
            align: 'center'
          }
        ]
      ]
    })

    setTimeout(function() {
      var obj = {
        total: 4,
        rows: [
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          },
          {
            type1: '1',
            type2: '2',
            type3: '3',
            type4: '4',
            type5: '5',
            type6: '6'
          }
        ]
      }
      that.appViewDom.find('#p_datagrid').datagrid('loadData', obj)
    }, 500)
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
export default PeizhunClass
