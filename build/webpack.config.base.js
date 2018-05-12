var path = require('path'),
  webpack = require('webpack'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  LodashModuleReplacementPlugin = require('lodash-webpack-plugin'),
  rucksack = require('rucksack-css'),
  autoprefixer = require('autoprefixer')

// 静态资源目录
const CDN_PATH = '/static/'

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'), // 开发源码目录
  env = process.env.NODE_ENV.trim() // 当前环境

var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'tpl/main.tpl.html') // 入口基页
}

module.exports = {
  commonPath: commonPath,
  // webpack主要公共配置
  config: {
    entry: {
      vendor: [
        'jquery',
        'lodash',
        'bootstrap/dist/js/bootstrap.js',
        'libs/jquery-easyui/jquery.easyui.min.js',
        'libs/jquery-easyui/locale/easyui-lang-zh_CN.js',
        'libs/jquery.color.js',
        'libs/jquery.ba-resize.min.js',
        'director/build/director'
      ],
      app: path.join(src, 'index.js')
    },
    output: {
      path: path.join(commonPath.dist, 'static'),
      publicPath: CDN_PATH
    },
    resolve: {
      extensions: ['.js', '.json', '.css', '.less'],

      alias: {
        /* ================================
        * 自定义路径别名
        * 包引用时可以省略路径
        * ================================
        */
        src: src,
        tpl: path.join(src, 'tpl'),
        libs: path.join(src, 'libs'),
        containers: path.join(src, 'containers'),
        components: path.join(src, 'components'),
        utils: path.join(src, 'utils'),
        services: path.join(src, 'services'),
        constants: path.join(src, 'constants'),
        css: path.join(src, 'assets/css'),
        images: path.join(src, 'assets/images')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['transform-runtime', 'transform-decorators-legacy', 'lodash'],
              presets: [['env', {modules: false}], 'stage-2']
            }
          },
          exclude: /node_modules/
        },
        {
          /**
           * 解析jQuery的引用
           */
          test: require.resolve('jquery'),
          loader: 'exports-loader?window.$!exports-loader?window.jQuery!script-loader'
        },
        {
          test: /\.tpl\.html$/,
          use: [
            {
              loader: 'underscore-template-loader',
              options: {
                attributes: ['img:src'],
                engine: 'underscore'
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 1024, // 1KB 以下使用 base64
            name: 'images/[name]-[hash:6].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(), // 进度条
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash'
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            rucksack(),
            autoprefixer({
              browsers: ['last 2 versions', '> 5%']
            })
          ]
        }
      }),

      new webpack.optimize.CommonsChunkPlugin({
        // 公共代码分离打包
        // names: ['vendor']

        names: ['vendor', 'manifest'],
        minChunks: 'Infinity'
      }),

      /**
       * https://github.com/lodash/lodash-webpack-plugin
       * 按需打包Lodash.js
       */
      new LodashModuleReplacementPlugin({
        shorthands: true,
        collections: true,
        caching: true
      }),

      new webpack.DefinePlugin({
        // ================================
        // 配置开发全局常量
        // ================================
        __DEV__: env === 'development',
        __PROD__: env === 'production'
      })
    ]
  }
}
