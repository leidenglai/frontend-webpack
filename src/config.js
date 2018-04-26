// 开发环境使用http协议
// export const SERVER_PROTOCOL = __DEV__ ? 'http://' : 'https://'
export const SERVER_PROTOCOL = __DEV__ ? 'http://' : '//'

// 后端的单独接口domain  如:api.demo.com 如果为空 直接就是当前的domain
export const API_URL = ''

// 不需要登录检查的模块
export const checkLoginExclude = ['login']

// 获取请求默认参数
export const DEF_REQUEST_CONFIG = {
  // version: '2'
  // ...
}

// 后端请求的默认超时时间 单位ms
export const apiTimeout = 30000
