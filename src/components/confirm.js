/**
 * 加强版confrim
 * @param  {Boolean} isSingle   是否只显示确定按钮  默认为两个操作按钮都显示
 *
 * 调用：
 * SuperConfirm({
    title: '确认手机号码',
    content: `<span>我们将发送验证码短信到这个号码:</span><br /><span class="blod">+${areaCode} ${telNum}</span>`,
    okHandler: () => {
      // ...
    }
  })
 *
 */

class SuperConfirm {
  constructor({isSingle}) {
    // 对页面加载模板等
    // todo
  }

  bindEvent() {
    const that = this
    // 事件绑定等
  }

  destructor() {
    // 解绑事件
    // todo..
  }
}

// 直接导出实例
export default function(parmas) {
  new SuperConfirm(parmas)
}
