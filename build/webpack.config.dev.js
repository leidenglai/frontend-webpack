var path = require('path'),
  webpack = require('webpack'),
  baseConfig = require('./webpack.config.base')

// webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var config = baseConfig.config, // 公共配置
  SOURCE_MAP = true,
  rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'), // 开发源码目录
  env = process.env.NODE_ENV.trim() // 当前环境

config.output.publicPath = '/'
config.output.filename = '[name].js'
config.output.chunkFilename = '[id].js'

config.devtool = SOURCE_MAP ? 'cheap-module-eval-source-map' : false

// add hot-reload related code to entry chunk
config.entry.app = [
  'webpack-hot-middleware/client?reload=true',
  // 为热替换（HMR）打包好运行代码
  // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
  'webpack/hot/only-dev-server',
  config.entry.app
]

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push(
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
  }
)

config.plugins.push(
  // 开启全局的模块热替换（HMR）
  new webpack.HotModuleReplacementPlugin(),

  // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: baseConfig.commonPath.indexHTML,
    chunksSortMode: 'dependency'
  }),
  new BrowserSyncPlugin(
    {
      host: '127.0.0.1',
      open: true,
      port: 3000,
      proxy: 'http://127.0.0.1:3000',
      logConnections: false,
      browser: 'google chrome'
    },
    {
      reload: false
    }
  )
)

module.exports = config
