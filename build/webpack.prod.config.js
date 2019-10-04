// 生产环境打包配置
const Webpack = require('webpack'); //访问内置的插件
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
//分离css,线上打包使用,不要在开发中使用,无法热更新
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 删除无用css
const PurifyCSS = require('purifycss-webpack'); 
// 自定义插件
const CopyRight = require('../plugins/copyright-webpack-plugin');
const glob = require('glob-all');

const prodConfig = {
    mode: 'production', // mode: 'production',development或者cli传递参数webpack --mode=production
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                        //loader: "style-loader" // 将 JS 字符串生成为 style 节点 // "style-loader", // b不再需要style-loader要已经分离处理
                        loader :MiniCssExtractPlugin.loader,
                    }, {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            importLoaders: 2,
                            modules: true // 模块化css
                        }
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    },
                    {
                        loader: "postcss-loader" // 添加厂商前缀
                    }
                ]
            }
    ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //分离css插件
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, '../src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, '../src/*.js')
            ])
        }),
        new CopyRight()
        
    ],
    optimization: {
        usedExports:true,
        splitChunks: {
          chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
      },
};

module.exports = merge(baseConfig, prodConfig);