# # webpack 架构 SPA

单页面应用的前端简单架构

# 环境

安装 nodejs 最新版本即可初始化 安装依赖包

```sh
npm install
```

# 开始开发

调试模式

```sh
npm start
```

# 构建线上环境文件

```sh
npm run build
```

# 架构详细文档

## 概述

随着 webpack 的流行，单页面的方式的前端工程的难度变得简单很多。前后端分离、模块分拆、热更新开发、语法解析、打包上线等等。本项目基于 webpack3 搭建，js 可以直接使用 ES6 乃至 ES7 的语法，同时向下兼容，CSS 可以使用 LESS，html 模板语法基于 underscore 的 template 插件。

一般的 SPA(Single page application)需要考虑很多方面：

1.  初始化
2.  路由监控
3.  开发调试
4.  性能优化
5.  打包上线

## 技术栈

1.  Nodejs 、npm // 各插件基础、依赖包管理
2.  Webpack // 前端资源模块化管理、开发、打包工具
3.  jQuery
4.  Less // 一门向后兼容的 CSS 扩展语言
5.  Director.js // 简单的路由插件
6.  Lodash.js // JS 工具库，强大的辅助函数

### 资源

* npm 包：https://www.npmjs.com
* package 解释 [package.json 文件 — JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
* Webpack 中文文档：http://www.css88.com/doc/webpack2
* Webpack 官网： [webpack](https://webpack.js.org/)
* Director.js git： https://github.com/flatiron/director
* Lodash.js 中文文档： http://www.css88.com/doc/lodash/
* Less: [{less}](http://less.bootcss.com/)http://less.bootcss.com/
* flexible: [GitHub - amfe/lib-flexible: 可伸缩布局方案](https://github.com/amfe/lib-flexible)

## 目录结构

```
— build/  			// 架构启动、构建配置，webpack 配置
— dist/ 				// 构建输出目录
— node_modules/   	// 所以依赖安装包文件
— src/                        	// 项目文件
    assets/ 			// 所有静态资源
      css/			// css、less文件位置
      images/			// 图片文件目录
    components/		// 组件目录
    constants/		// 常量配置、前端存放的一些不变的json数据等
    containers/ 		// 项目主要逻辑 模块控制器
    libs/				// 自己引用的一些库
    services/			// 与后端交互的接口请求文件
    tpl/ 				// 项目模板文件
    utils/			// 自己写的一些中间件、插件方法等
    config.js			// 项目的配置
    index.js			// 项目入口
    routes.js			// 路由配置
— .babelre			// babel插件的配置文件
— package.json  		// 项目描述文件
— README.md 			// 项目文档
```

通过配置了 webpack 的 alias 参数，可以在包引用时简写路径如 src/assets/css/index.less 可以简写为 css/index.less
再通过 extensions 配置可以省略后缀名 css/index

具体配置请看 /build/webpack.config.base.js 中的 resolve 字段

## 项目开始

本项目使用了 npm 作为包管理工具，所以入口配置在根目录下的 package.json。

Windows 下使用 cmd，mac 启动 terminal。cd 到项目目录，然后执行`npm install`安装项目下的所有的依赖包，执行此命令 安装 package.json 中 devDependencies（开发环境）和 dependencies（生产环境和测试环境）中的所有依赖包。

安装完成所有依赖包之后执行命令`npm start` 此命令执行 package.json 下的 scripts.start 的值：使用 node 执行 build/dev.js 启动项目。
**注意 ** ：npm 除了执行 start、test、stop 等几个可以简写，其他的自定义命令都需要在执行时写全 `npm run xxx` [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

npm start 执行 build/dev.js，启动 webpack 构建开发环境等等，通过 webpack config 中 entry 字段配置的项目入口：src/index.js 开始运行，通过终端输出的地址在浏览器中打开。具体 webpack 使用和配置另说。

## 入口文件

入口文件在 webpack 的 build/webpack.config.dev.js 中配置，js 入口 src/index.js ，以及通过 HtmlWebpackPlugin 配置项目入口模板 src/tpl/main.tpl.html。

### src/index.js

index.js 主要按顺序完成以下几件事：

1.  加载公共插件，如 Bootstrap、easyui、director（jQuery 和 Lodash 通过 webpack 暴露为全局方法，每个地方都能直接使用，而不需要 import）
2.  **重点** 路由监控，加载路由配置文件`src/js/routes.js`，使用 html5 的 [HIstory API](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 控制历史记录。
3.  加载 loadModule 方法 处理页面各模块的层级关系。本项目模块逻辑设计为将各个业务模块放在各自的 div 中，然后异步的放在主容器 container 中，通过 disable 属性控制显示。也就是说，只要点击过的界面，实例一直保存在 moduleInstanceStack 对象中，dom 节点也保留在 document 中，除非刷新浏览器或者主动优化（内存占用太大、模块参数发生变化）这样做的好处是能一直保存历史记录中的页面状态、快速翻页；缺点是可能内存占用太大、各页面的实例和事件的隔离需要注意。对应文件 /src/utils/loadModule.js

### src/tpl/main.tpl.html

本文件是项目的根模板，html 结构的基础文件，控制器的容器，或者公共组件的根节点都写在里面。

注意的地方：

1.  界面的主要容器

```html
  <!-- 主容器 -->
  <div id="container"></div>
  <!-- 主容器 end -->

  <!-- 顶部导航 -->
  <!--工作公共组件根节点都声明在这儿 方便挂载  -->
  <!-- <div id="topNavbar"></div> -->
  <!-- 顶部导航 end -->
```

这是整个应用的大概底层模块，所有的具体业务模块之后通过 js 添加到主容器 container 中。

## 业务模块

路由文件/src/routes.js 通过监听到 url，异步加载具体的业务模块

```javascript
  "/index": cb => {
    require.ensure([], (require) => {
      // 加载控制器
      const Controller = require('containers/index/index').default

      // 加载主模板
      const template = require('tpl/index/index.tpl.html')
      cb(Controller, template)
    })
  },
```

[require.ensure](http://www.css88.com/doc/webpack2/guides/code-splitting-require/) ： webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk （也就是一个单独的文件）当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

然后是加载 js 逻辑代码和模板代码，实现简单的 mvc 结构；回调中执行具体的业务逻辑。

业务模块规范：

```javascript
import Main from 'utils/main'

/**
 * 主页模块类
 */
class IndexClass extends Main {
  /**
   * 构造函数，初始化工作 参数为模块加载时加上的参数 每个通过路由加载的模块都有
   * @param {Object} appViewDom 容器内此模块的顶级 jQeury节点对象
   * @param {Object} queryData url中的参数
   */
  constructor(appViewDom, queryData) {
    // 继承公共方法
    super()
    // 将appViewDom赋值的this上
    this.appViewDom = appViewDom
    // ...
  }

  // ....
  // 各种具体逻辑
  // 如init、事件绑定(bindEvent)等

  refresh() {
    // 第二次之后进入此页面会默认调用此方法(url参数也没变的情况下)
    // ..
  }

  destructor() {
    // 析构函数，销毁实例时执行
    // 垃圾处理，事件解绑等
    // ...
  }
}
export default IndexClass
```

### 模块间跳转

模块跳转加入了 html5 的跳转方式，跳转页面不刷新浏览器，利用的是 html5 History 对象的新 API。架构已做了中间函数来处理这种方式，在 html 中使用 a 标签加上 `push-state`属性，链接跳转就处理为无刷新的方式。

```html
  <a href="/index?test=1" push-state>无刷新跳转方式</a>
```

在 js 逻辑中跳转页面时可使用继承自`src/containers/main.js`中的 goModule 方法达到无刷新效果。
_传统的跳转方式不受影响_

## CSS 模块

使用了 [Less](http://less.bootcss.com/) 方式编写 css 代码，Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。

### 布局 Flex

[flex 介绍](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
因为只在 Chrome 中使用此项目，所以用 Flex 布局模式，完全不用担心兼容问题:-D；如果需要兼容其他现代浏览器，则可以在 webpack 中的 css 过滤器配置一个 postcss 插件。

### 动画 css3

[CSS3 -w3school](http://www.w3school.com.cn/css3/)
所有动画用更推荐使用 css3 开发，灵活使用 transition 和 animation。尽量不用 js 写动画，可以使用 js 控制 Classname 来触发和改变动画效果。

## 模板文件

在路由模块中，通过 require 加载控制器的之后，还加载模板文件：

```
  ...
      // 加载模板
      const template = require('tpl/index/index.tpl.html')
  ...
```

模板加载返回一个可执行的函数到 template，可以给 template 的添加参数传入到模板中解析，参考[GitHub - emaphp/underscore-template-loader: A Underscore and Lodash template loader for Webpack](https://github.com/emaphp/underscore-template-loader)。

注意：项目底层已将主模板代码解析过（解析逻辑位于`/src/utils/loadModule.js`），将 `tpl/index/index.tpl.html`直接放入到了主模板的控制器标签中，模板参数可在 url 的 query 字段传入。如 url：demo.com/index?aa=bb
index 模板中就可以直接使用 aa 变量

一般模块随便写，主容器有一定的规范

* 顶级标签类名必须有 pageContainer
* 顶级标签 id 必须为 模块名+Content 如 indexContent
  一个容器例子：

```html
  <div id="indexContent" class="pageContainer">
    <!-- 具体模块代码 -->
    <!-- 变量写在“<%- 变量 %>”中，比如 -->
    <div><%- test %></div>
  </div>
```

js 中加载模板时：

```javascript
const templateFunc = require('tpl/index/index.tpl.html')
var html = templateFunc({test: '这是一个例子'})

console.log(html)
// 输出：
// <div id="indexContent" class="pageContainer">
//    <!-- 具体模块代码 -->
//    <!-- 变量写在“<%- 变量 %>”中，比如 -->
//    <div>这是一个例子</div>
//  </div>
```

再通过 jQuery 的文档操作方法将其添加到具体节点。

## 数据请求

将项目模块化后，与后端交互的所以接口都提到了`src/services/`中，将接口方法全部集中的一起，方便管理和阅读，同时只暴露简单的方法名和具体的业务请求参数， 返回 promise 对象。

示例：`src/services/userServie.js`

```javascript
import requestData from 'utils/ajaxLoad'

/**
 * 对应后端涉及到用户的 API
 */
class UserService {
  /**
   * 登录
   * @param {Object} params {name: 账号, password: 密码}
   */
  userLogin(params) {
    return requestData('/api/user/login', params)
  }
}

// 实例化后再导出
export default new UserService()
```

调用：

```javascript
import UserService from 'services/userService'

// ...
// 请求后端数据
UserService.userLogin(userFormData).then(
  data => {
    console.log('登录成功')
    // ...
  },
  () => {
    console.log('登录失败')
    // ...
  }
)
// ...
```

这是一个完整的接口请求实例，业务逻辑中只用关心返回值。

ajax 的请求逻辑封装在`src/utils/ajaxLoad.js`中，使用的是 jquery 的 ajax 方法，可以自行对 ajax 参数进行调整，但是尽量写成可配置参数，提取到`src/config.js`中。这里面的 then 为 Promise 对象的方法，具体使用请参考 Promise 文档
