/**
 * 使用路由的方法进行链接跳转(内部实现html5的 History对象的pushState)
 * 使用这种方法跳转页面不会刷新浏览器，使页面状态能够保留下来
 *
 * @param  {element} aEvent a标签的事件对象
 * @return void
 */
export default function aEventH5handler(aEvent) {
  // 屏蔽默认处理
  aEvent.preventDefault()

  // 获取a标签的href属性
  const href = aEvent.target.getAttribute('href')

  // 使用html5的方式跳转
  RouterController.setRoute(href)
}
