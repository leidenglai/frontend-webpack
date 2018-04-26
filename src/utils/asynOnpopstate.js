/**
 * onpopstate方法的垫片
 * 一些浏览器在加载时 没有onpopstate方法 会导致报错：
 * Uncaught TypeError: window.onpopstate is not a function
 *
 * @param {func} callback director的执行方法
 */
export default function(callback) {
  if (window.onpopstate !== null) {
    callback()
    return
  }
  const interval = setInterval(function() {
    if (window.onpopstate !== null) {
      callback()
      clearInterval(interval)
    }
  }, 100)
}
