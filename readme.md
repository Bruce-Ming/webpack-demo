# webpack学习笔记

## 为什么需要用到webpack打包

    首先,现在的一般的前端开发都在向单页面应用,前后端分离,以及模块化靠拢.用到的技术栈也不止js,例如es6,ts,以及一些前端框架,vue,react,angular.而这些开发代码不能直接在浏览器中运行,需要编译打包成js,最后部署到服务器上运行.这就需要webpack打包技术.

    但是webpack本身只能打包js编译打包js代码,分析其中的依赖关系,但是前端页面不止有js代码(开发中使用es6,ts),还有css代码(开发时候还会有scss代码),以及图片资源,json数据等静态资源.所以就需要各种各样的loader去处理这些scss,图片,ts等,把他们打包进js中.同是,在打包过程中我们又想完成各种各样的功能(根据index.html页面自动生成插入打包后的js的html文件,每次打包清空dist,开发过程中搭建服务器,热更新等功能),这时就需要用webpack插件来实现(插件会影响打包速度).

    webpack主要学习任务:webpack配置,loader,插件,以及优化这几个要点.本demo主要配置

## 目录说明

webpack.config.js 是webpack打包配置文件,
package.json 是依赖文件
postcss.config.js 是postcss配置文件
,babelrc是babel的配置文件
server.js 是koa 结合 webpack 生成打包后的静态服务器代码,

## package.json中scripts命令的说明

使用方法:npm run + scripts 下的相关命令(在当前文件夹下运行,在其他文件夹运行找全局的根目录下的package.json)
debug:用node调试工具,做断点调试webpack,
build:根据webpack.config配置文件打包生成dist下的相关文件
dev: 用webpack-dev-server直接打包并且启动生成本地服务器,不会生成dist目录,直接生成在了内存里面
server:用node运行本地的server.js,根据server.js生成热更新服务器

## 遇到的问题

在build情况下,如果package中设置了"sideEffects": false,无法分离css到单独文件夹中.

## loader编写

编写一个函数,拿到源代码,做处理,返回新的代码.

## 插件的编写

插件是一个类,调用apply函数,传入compiler参数,调用webpack打包时的钩子函数,完成一些操作,同是注意钩子函数有同步和异步的区别.

## 简单打包工具的编写

bundler下是一个简单打包工具的实例.
