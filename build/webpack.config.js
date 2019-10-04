// 原配置文件
const Webpack = require('webpack'); //访问内置的插件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css
const PurifyCSS = require('purifycss-webpack'); // 删除无用css
const glob = require('glob-all');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'], //入口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/', // cdn路径,在编译时不知道最终输出文件的publicPath 的情况下，
        // publicPath 可以留空，并且在入口起点文件运行时动态设置。在入口起点设置 __webpack_public_path__。__webpack_public_path__ = myRuntimePublicPath
        filename: 'bundle.[hash].js'
    },
    mode: 'development', // mode: 'production',development或者cli传递参数webpack --mode=production
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // es6转化se5语法
                // options: {
                //     "presets": ["@babel/preset-env",
                //         {
                //             useBuiltIns: 'usage' // 只打包用到的部分
                //         }
                //     ]
                // }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ //分离css插件
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
              // new Webpack.HotModuleReplacementPlugin()
          new PurifyCSS({
            paths: glob.sync([
              // 要做 CSS Tree Shaking 的路径文件
              path.resolve(__dirname, '../src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
              path.resolve(__dirname, '../src/*.js')
            ])
          })
    
    ],
    optimization: {
        splitChunks: {
          chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
      },
    //用webpack-devserver建服务器
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8000,
        hot: true,
        hotOnly: true
    },
};