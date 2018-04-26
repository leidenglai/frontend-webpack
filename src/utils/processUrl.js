/**
 * 处理url中参数的纯函数
 * @param  {String} url 要处理的Url
 * @return {Object}     处理好的键值对
 */
export default function processUrl(url) {
  let urlSearchData = {}
  const n = url.indexOf('?')
  const m = url.substring(n + 1, url.length)
  const arr = m.split('&')

  arr.forEach(item => {
    let valuearr = item.split('=')
    if (valuearr[0] && valuearr[1]) {
      urlSearchData[valuearr[0]] = decodeURIComponent(valuearr[1])
    }
  })
  return urlSearchData
}
