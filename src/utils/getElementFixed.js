/**
 * 获取元素绝对位置
 * @param  {Object} element js dom元素
 * @return {Object}         绝对位置
 */
export default function getElementFixed(element) {
  var actualLeft = element.offsetLeft
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    var translate = getTranslate(current)
    actualLeft += current.offsetLeft + translate[0]
    actualTop += current.offsetTop + translate[1]
    current = current.offsetParent
  }
  return {
    currentX: actualLeft,
    currentY: actualTop
  }
}

/**
 * 获取元素的css3 Translate偏移量
 * 只做了对标准和webkit内核兼容
 * 获取css属性摘自Zepto.js，做修改后只获得transform属性
 * 只处理 translate，如果有旋转或者缩放等，结果会不准确
 *
 * @param  {Object} element dom元素
 * @return {Array}          偏移量[x,y]
 */
function getTranslate(element) {
  const transformMatrix =
    element.style['WebkitTransform'] ||
    getComputedStyle(element, '').getPropertyValue('-webkit-transform') ||
    element.style['transform'] ||
    getComputedStyle(element, '').getPropertyValue('transform')
  if (!transformMatrix || transformMatrix == 'none') return [0, 0]

  const matrix = transformMatrix.match(/\-?[0-9]+\.?[0-9]*/g)
  const x = parseInt(matrix[12] || matrix[4] || matrix[0] || 0) //translate x
  const y = parseInt(matrix[13] || matrix[5] || matrix[1] || 0) //translate y
  return [x, y]
}
