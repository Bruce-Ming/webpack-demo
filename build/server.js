// koa2 自建服务器结合webpack打包
const Koa = require('koa')
const serve = require('koa-static')
const webpack = require('webpack')
const config = require('./webpack.prod.config.js')
const koaWebpack = require('koa-webpack')
const {
  resolve
} = require('path')

const app = new Koa()
const port = process.env.PORT || 3000

async function start() {
    // 在node中使用webpack
  const compiler = webpack(config);
  try {
    const middleware = await koaWebpack({
      compiler
    });
    app.use(middleware);
    app.use(serve(resolve(__dirname, '../dist')));
    app.listen(port);
    console.log('服务器在localhost:'+port);
  } catch (e) {
    console.log(e)
  }
}
start();



// const Koa = require('koa');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js')
// const compiler = webpack(config);
// const serve = require('koa-static');
// const { resolve } = require('path')

// const app = new Koa();

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
// }))
// app.use(serve(resolve(__dirname, './dist')));
// app.listen(3000, () => {
//     console.log('服务器已经运行起来了');

// });
